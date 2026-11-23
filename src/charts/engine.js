// The chart engine: zero dependencies, hand-rolled SVG + HTML.
// Each chart type is a `mount(fig, body, spec)` function. Static charts redraw on
// resize; interactive ones keep their state in a closure and persist the
// reader's answers in localStorage so they survive a refresh.

const SVGNS = 'http://www.w3.org/2000/svg';

/* ---------------------------------------------------------------- helpers */

function s(tag, attrs = {}, parent) {
  const e = document.createElementNS(SVGNS, tag);
  for (const [k, v] of Object.entries(attrs)) if (v != null) e.setAttribute(k, v);
  if (parent) parent.appendChild(e);
  return e;
}

function h(tag, attrs = {}, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'text') e.textContent = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v === true ? '' : v);
  }
  for (const k of kids.flat()) if (k != null) e.append(k);
  return e;
}

const color = (i) => `var(--s${i + 1})`;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

const CURRENCY = ['$', '£', '€', '₦', '¥'];
export function fmt(v, unit = '') {
  if (v == null || Number.isNaN(v)) return '–';
  const n = Math.abs(v) >= 1e6
    ? `${+(v / 1e6).toFixed(1)}M`
    : Math.abs(v) >= 1e4
      ? `${+(v / 1e3).toFixed(1)}k`
      : v.toLocaleString(undefined, { maximumFractionDigits: 2 });
  if (CURRENCY.includes(unit)) return v < 0 ? `-${unit}${n.replace('-', '')}` : `${unit}${n}`;
  return unit ? `${n}${/^[%/]/.test(unit) ? '' : ' '}${unit}`.replace(/ {2,}/g, ' ') : n;
}

function niceTicks(min, max, count = 5) {
  if (min === max) { min -= 1; max += 1; }
  const step0 = (max - min) / count;
  const mag = 10 ** Math.floor(Math.log10(step0));
  const err = step0 / mag;
  const step = (err >= 7.5 ? 10 : err >= 3.5 ? 5 : err >= 1.5 ? 2 : 1) * mag;
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks = [];
  for (let v = lo; v <= hi + step / 2; v += step) ticks.push(+v.toFixed(10));
  return { lo, hi, ticks };
}

const hash = (str) => {
  let x = 5381;
  for (let i = 0; i < str.length; i++) x = ((x << 5) + x + str.charCodeAt(i)) | 0;
  return (x >>> 0).toString(36);
};

const store = {
  get(key) {
    try { return JSON.parse(localStorage.getItem(`bolanle:${key}`)); } catch { return null; }
  },
  set(key, val) {
    try {
      if (val == null) localStorage.removeItem(`bolanle:${key}`);
      else localStorage.setItem(`bolanle:${key}`, JSON.stringify(val));
    } catch { /* private mode etc. — fine, it just won't remember */ }
  },
};

/* --------------------------------------------------------------- tooltip */

let tipEl;
function showTip(html, ev) {
  if (!tipEl) {
    tipEl = h('div', { class: 'viz-tip', role: 'status' });
    document.body.append(tipEl);
  }
  tipEl.innerHTML = html;
  tipEl.style.opacity = '1';
  const { innerWidth: vw } = window;
  const r = tipEl.getBoundingClientRect();
  let x = ev.clientX + 14;
  let y = ev.clientY - r.height - 12;
  if (x + r.width > vw - 8) x = ev.clientX - r.width - 14;
  if (y < 8) y = ev.clientY + 18;
  tipEl.style.transform = `translate(${Math.max(8, x)}px, ${y}px)`;
}
function hideTip() {
  if (tipEl) tipEl.style.opacity = '0';
}
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

/** Calls draw(width) now and whenever the container width changes. */
function responsive(body, draw) {
  let w = 0;
  const run = () => {
    const nw = Math.round(body.clientWidth);
    if (nw && nw !== w) { w = nw; draw(w); }
  };
  new ResizeObserver(run).observe(body);
  run();
}

function svgRoot(parent, w, hgt, label) {
  let svg = parent.querySelector(':scope > svg.viz-svg');
  if (!svg) {
    svg = s('svg', { class: 'viz-svg', role: 'img' });
    parent.prepend(svg);
  }
  svg.replaceChildren();
  svg.setAttribute('viewBox', `0 0 ${w} ${hgt}`);
  svg.setAttribute('width', w);
  svg.setAttribute('height', hgt);
  if (label) svg.setAttribute('aria-label', label);
  return svg;
}

function toSvgPoint(svg, ev) {
  const pt = svg.createSVGPoint();
  pt.x = ev.clientX;
  pt.y = ev.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

function legend(names) {
  return h('ul', { class: 'viz-legend' },
    names.map((n, i) => h('li', {}, h('span', { class: 'swatch', style: `background:${color(i)}` }), n)));
}

function dataTable(head, rows) {
  return h('details', { class: 'viz-table' },
    h('summary', { text: 'Show the numbers' }),
    h('div', { class: 'viz-table-scroll' },
      h('table', {},
        h('thead', {}, h('tr', {}, head.map((c) => h('th', { text: c })))),
        h('tbody', {}, rows.map((r) => h('tr', {}, r.map((c) => h('td', { text: c }))))))));
}

function yAxis(svg, ticks, y, left, right, unit) {
  const g = s('g', { class: 'axis' }, svg);
  for (const t of ticks) {
    s('line', { x1: left, x2: right, y1: y(t), y2: y(t), class: t === 0 ? 'baseline' : 'grid' }, g);
    const lbl = s('text', { x: left - 8, y: y(t) + 4, 'text-anchor': 'end' }, g);
    lbl.textContent = fmt(t, CURRENCY.includes(unit) || unit === '%' ? unit : '');
  }
}

function xLabels(svg, labels, x, yPos, plotW) {
  const g = s('g', { class: 'axis' }, svg);
  const longest = Math.max(...labels.map((l) => l.length));
  const every = Math.max(1, Math.ceil((labels.length * Math.min(longest * 7 + 12, 90)) / plotW));
  labels.forEach((l, i) => {
    if (i % every && i !== labels.length - 1) return;
    const anchor = i === 0 ? 'start' : i === labels.length - 1 ? 'end' : 'middle';
    const t = s('text', { x: x(i), y: yPos, 'text-anchor': anchor }, g);
    t.textContent = l;
  });
}

function linePath(points) {
  let d = '';
  let pen = false;
  for (const p of points) {
    if (p == null) { pen = false; continue; }
    d += `${pen ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`;
    pen = true;
  }
  return d;
}

/* ------------------------------------------------------------------- bar */

function bar(fig, body, spec) {
  let items = [...spec.items];
  if (spec.sort) items.sort((a, b) => (spec.sort === 'asc' ? a.value - b.value : b.value - a.value));
  const hi = new Set(spec.highlight || []);
  // highlighted bars keep the lead colour; everything else steps back to neutral
  const fill = (d) => (hi.size && !hi.has(d.label) ? 'var(--bar-muted)' : color(0));
  const vals = items.map((d) => d.value);
  const tipFor = (d) => `<strong>${esc(d.emoji ? `${d.emoji} ` : '')}${esc(d.label)}</strong><br>${esc(fmt(d.value, spec.unit))}${d.note ? `<br><em>${esc(d.note)}</em>` : ''}`;

  const holder = h('div');
  body.replaceChildren(holder, dataTable(['', spec.unit ? `Value (${spec.unit})` : 'Value'], items.map((d) => [d.label, fmt(d.value)])));

  responsive(holder, (w) => {
    if (spec.vertical) return drawVertical(w);
    const rowH = 48;
    const valW = Math.min(90, Math.max(48, Math.max(...items.map((d) => fmt(d.value, spec.unit).length)) * 8));
    const plotW = w - valW;
    const lo = Math.min(0, ...vals);
    const top = Math.max(0, ...vals);
    const x = (v) => ((v - lo) / (top - lo || 1)) * plotW;
    const svg = svgRoot(holder, w, items.length * rowH, spec.title);
    items.forEach((d, i) => {
      const y = i * rowH;
      const g = s('g', { class: 'bar-row' }, svg);
      const lbl = s('text', { x: 0, y: y + 15, class: 'bar-label' }, g);
      lbl.textContent = `${d.emoji ? `${d.emoji} ` : ''}${d.label}`;
      const x0 = Math.min(x(0), x(d.value));
      const bw = Math.max(2, Math.abs(x(d.value) - x(0)));
      s('rect', { x: x0, y: y + 22, width: bw, height: 18, rx: 4, fill: fill(d), class: 'bar', style: `--d:${i * 60}ms` }, g);
      const vt = s('text', { x: d.value < 0 ? x(0) + 6 : x0 + bw + 6, y: y + 36, class: 'bar-value' }, g);
      vt.textContent = fmt(d.value, spec.unit);
      const hit = s('rect', { x: 0, y, width: w, height: rowH, class: 'hit' }, g);
      if (lo < 0) s('line', { x1: x(0), x2: x(0), y1: y + 18, y2: y + rowH - 4, class: 'baseline' }, g);
      hit.addEventListener('pointermove', (ev) => showTip(tipFor(d), ev));
      hit.addEventListener('pointerleave', hideTip);
    });
  });

  function drawVertical(w) {
    const H = clamp(w * 0.55, 220, 360);
    const m = { t: 24, r: 8, b: 44, l: 48 };
    const plotW = w - m.l - m.r;
    const { lo, hi: top, ticks } = niceTicks(Math.min(0, ...vals), Math.max(0, ...vals));
    const y = (v) => m.t + (1 - (v - lo) / (top - lo)) * (H - m.t - m.b);
    const band = plotW / items.length;
    const bw = Math.min(56, band * 0.7);
    const svg = svgRoot(holder, w, H, spec.title);
    yAxis(svg, ticks, y, m.l, w - m.r, spec.unit);
    const rotate = items.some((d) => d.label.length * 7 > band);
    items.forEach((d, i) => {
      const cx = m.l + band * (i + 0.5);
      const g = s('g', { class: 'bar-col' }, svg);
      const y0 = Math.min(y(0), y(d.value));
      s('rect', { x: cx - bw / 2, y: y0, width: bw, height: Math.max(2, Math.abs(y(d.value) - y(0))), rx: 4, fill: fill(d), class: 'bar v', style: `--d:${i * 60}ms` }, g);
      const t = s('text', {
        x: cx, y: H - m.b + 18, class: 'bar-label small',
        'text-anchor': rotate ? 'end' : 'middle',
        transform: rotate ? `rotate(-30 ${cx} ${H - m.b + 18})` : null,
      }, g);
      t.textContent = rotate && d.label.length > 14 ? `${d.label.slice(0, 13)}…` : d.label;
      if (d.emoji) {
        const e = s('text', { x: cx, y: y0 - 6, 'text-anchor': 'middle', class: 'emoji' }, g);
        e.textContent = d.emoji;
      }
      const hit = s('rect', { x: cx - band / 2, y: m.t, width: band, height: H - m.t - m.b, class: 'hit' }, g);
      hit.addEventListener('pointermove', (ev) => showTip(tipFor(d), ev));
      hit.addEventListener('pointerleave', hideTip);
    });
  }
}

/* ------------------------------------------------------------------ line */

function line(fig, body, spec) {
  const { x: labels, series } = spec;
  const n = labels.length;
  const all = series.flatMap((sr) => sr.values).filter((v) => v != null);
  const holder = h('div');
  const parts = [];
  if (series.length > 1) parts.push(legend(series.map((sr) => sr.name)));
  parts.push(holder, dataTable(['', ...series.map((sr) => sr.name)], labels.map((l, i) => [l, ...series.map((sr) => fmt(sr.values[i]))])));
  body.replaceChildren(...parts);

  responsive(holder, (w) => {
    const direct = series.length > 1 && series.length <= 4 && w > 520;
    const H = clamp(w * 0.55, 230, 380);
    const m = { t: spec.markers || spec.annotations ? 40 : 18, r: direct ? 96 : 18, b: 30, l: 48 };
    const plotW = w - m.l - m.r;
    const { lo, hi: top, ticks } = niceTicks(spec.min ?? Math.min(...all, spec.area ? 0 : Infinity), spec.max ?? Math.max(...all));
    const x = (i) => m.l + (i / (n - 1)) * plotW;
    const y = (v) => m.t + (1 - (v - lo) / (top - lo)) * (H - m.t - m.b);
    const svg = svgRoot(holder, w, H, spec.title);
    yAxis(svg, ticks, y, m.l, w - m.r, spec.unit);
    xLabels(svg, labels, x, H - 8, plotW);

    for (const a of spec.annotations || []) {
      const i = labels.indexOf(a.at);
      const g = s('g', { class: 'annotation' }, svg);
      s('line', { x1: x(i), x2: x(i), y1: m.t - 6, y2: H - m.b, class: 'anno-line' }, g);
      const t = s('text', { x: x(i), y: m.t - 12, 'text-anchor': i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle', class: 'anno-text' }, g);
      t.textContent = a.text;
    }

    series.forEach((sr, si) => {
      const pts = sr.values.map((v, i) => (v == null ? null : [x(i), y(v)]));
      if (spec.area && series.length === 1) {
        const first = pts.findIndex(Boolean);
        const last = pts.length - 1 - [...pts].reverse().findIndex(Boolean);
        s('path', { d: `${linePath(pts)}L${pts[last][0]},${y(Math.max(lo, 0))}L${pts[first][0]},${y(Math.max(lo, 0))}Z`, class: 'area', fill: color(si) }, svg);
      }
      s('path', { d: linePath(pts), class: 'line', stroke: color(si), pathLength: 1 }, svg);
      if (direct) {
        const li = sr.values.findLastIndex((v) => v != null);
        const t = s('text', { x: x(li) + 8, y: y(sr.values[li]) + 4, class: 'direct-label' }, svg);
        t.textContent = sr.name.length > 12 ? `${sr.name.slice(0, 11)}…` : sr.name;
      }
    });

    if (spec.markers) {
      spec.markers.forEach((mk, i) => {
        const v = series[0].values[i];
        if (!mk || v == null) return;
        const t = s('text', { x: x(i), y: y(v) - 10, 'text-anchor': 'middle', class: 'emoji pop', style: `--d:${400 + i * 70}ms` }, svg);
        t.textContent = mk;
      });
    }

    // crosshair + tooltip
    const cross = s('g', { class: 'cross', opacity: 0 }, svg);
    s('line', { y1: m.t, y2: H - m.b, class: 'cross-line' }, cross);
    const dots = series.map((_, si) => s('circle', { r: 5, fill: color(si), class: 'cross-dot' }, cross));
    const hit = s('rect', { x: m.l, y: 0, width: plotW, height: H, class: 'hit' }, svg);
    hit.addEventListener('pointermove', (ev) => {
      const p = toSvgPoint(svg, ev);
      const i = clamp(Math.round(((p.x - m.l) / plotW) * (n - 1)), 0, n - 1);
      cross.setAttribute('opacity', 1);
      cross.firstChild.setAttribute('x1', x(i));
      cross.firstChild.setAttribute('x2', x(i));
      series.forEach((sr, si) => {
        const v = sr.values[i];
        dots[si].setAttribute('cx', x(i));
        dots[si].setAttribute('cy', v == null ? -99 : y(v));
      });
      const mk = spec.markers?.[i] ? ` ${esc(spec.markers[i])}` : '';
      showTip(`<strong>${esc(labels[i])}${mk}</strong>${series.map((sr, si) => `<div class="tip-row"><span class="swatch" style="background:${color(si)}"></span>${series.length > 1 ? `${esc(sr.name)}: ` : ''}<b>${esc(fmt(sr.values[i], spec.unit))}</b></div>`).join('')}`, ev);
    });
    hit.addEventListener('pointerleave', () => { cross.setAttribute('opacity', 0); hideTip(); });
  });
}

/* ----------------------------------------------------------------- donut */

function donut(fig, body, spec) {
  const items = spec.items;
  const total = items.reduce((a, d) => a + d.value, 0) || 1;
  const holder = h('div', { class: 'donut-wrap' });
  const leg = h('ul', { class: 'viz-legend donut-legend' },
    items.map((d, i) => h('li', { 'data-i': i },
      h('span', { class: 'swatch', style: `background:${color(i)}` }),
      h('span', { text: d.label }),
      h('b', { text: `${Math.round((d.value / total) * 100)}%` }))));
  body.replaceChildren(h('div', { class: 'donut-layout' }, holder, leg),
    dataTable(['', 'Value', 'Share'], items.map((d) => [d.label, fmt(d.value, spec.unit), `${((d.value / total) * 100).toFixed(1)}%`])));

  responsive(holder, (w) => {
    const size = Math.min(w, 300);
    const R = size / 2 - 10;
    const r = R * 0.6;
    const c = size / 2;
    const svg = svgRoot(holder, size, size, spec.title);
    const slices = [];
    let a0 = -Math.PI / 2;
    const center = s('g', { class: 'donut-center' }, svg);
    const big = s('text', { x: c, y: c + 2, 'text-anchor': 'middle', class: 'donut-big' }, center);
    const small = s('text', { x: c, y: c + 22, 'text-anchor': 'middle', class: 'donut-small' }, center);
    const reset = () => {
      big.textContent = spec.center ?? fmt(total, spec.unit);
      small.textContent = spec.center ? '' : 'total';
      slices.forEach((p) => p.removeAttribute('transform'));
      leg.querySelectorAll('li').forEach((li) => li.classList.remove('on'));
    };
    const focus = (i) => {
      const d = items[i];
      big.textContent = `${Math.round((d.value / total) * 100)}%`;
      small.textContent = d.label.length > 18 ? `${d.label.slice(0, 17)}…` : d.label;
      slices.forEach((p, j) => (j === i ? p.setAttribute('transform', p.dataset.pop) : p.removeAttribute('transform')));
      leg.querySelectorAll('li').forEach((li, j) => li.classList.toggle('on', j === i));
    };
    items.forEach((d, i) => {
      const a1 = a0 + (d.value / total) * Math.PI * 2;
      const large = a1 - a0 > Math.PI ? 1 : 0;
      const p = (rad, a) => `${c + rad * Math.cos(a)},${c + rad * Math.sin(a)}`;
      const full = a1 - a0 >= Math.PI * 2 - 1e-6;
      const dPath = full
        ? `M${p(R, 0)}A${R},${R} 0 1 1 ${p(R, Math.PI)}A${R},${R} 0 1 1 ${p(R, 0)}M${p(r, 0)}A${r},${r} 0 1 0 ${p(r, Math.PI)}A${r},${r} 0 1 0 ${p(r, 0)}Z`
        : `M${p(R, a0)}A${R},${R} 0 ${large} 1 ${p(R, a1)}L${p(r, a1)}A${r},${r} 0 ${large} 0 ${p(r, a0)}Z`;
      const mid = (a0 + a1) / 2;
      const path = s('path', { d: dPath, fill: color(i), class: 'slice', style: `--d:${i * 80}ms` }, svg);
      path.dataset.pop = `translate(${(Math.cos(mid) * 7).toFixed(1)} ${(Math.sin(mid) * 7).toFixed(1)})`;
      path.addEventListener('pointerenter', () => focus(i));
      path.addEventListener('pointermove', (ev) => showTip(`<strong>${esc(d.label)}</strong><br>${esc(fmt(d.value, spec.unit))} · ${((d.value / total) * 100).toFixed(1)}%`, ev));
      path.addEventListener('pointerleave', () => { reset(); hideTip(); });
      slices.push(path);
      a0 = a1;
    });
    leg.querySelectorAll('li').forEach((li, i) => {
      li.onpointerenter = () => focus(i);
      li.onpointerleave = reset;
    });
    reset();
  });
}

/* ----------------------------------------------------------------- meter */

function verdict(gap) {
  if (gap < 0.06) return 'We’re in near-perfect agreement.';
  if (gap < 0.18) return 'We broadly agree.';
  if (gap < 0.35) return 'We see this a little differently.';
  if (gap < 0.6) return 'We see this quite differently.';
  return 'We’re at opposite ends on this one.';
}

function meter(fig, body, spec) {
  const key = `meter:${hash(JSON.stringify(spec))}`;
  const span = spec.max - spec.min;
  const pct = (v) => ((v - spec.min) / span) * 100;
  const readout = (v) => `${Math.round(pct(v))}`;

  const render = () => {
    const saved = store.get(key);
    if (saved != null) return reveal(saved);
    const mid = spec.min + span / 2;
    const face = h('output', { class: 'meter-face', text: readout(mid) });
    const input = h('input', {
      type: 'range', min: spec.min, max: spec.max, step: span / 100, value: mid,
      'aria-label': spec.question,
      oninput: (e) => {
        face.textContent = readout(+e.target.value);
        input.style.setProperty('--p', `${pct(+e.target.value)}%`);
      },
    });
    input.style.setProperty('--p', '50%');
    body.replaceChildren(
      h('p', { class: 'meter-q', text: spec.question }),
      h('div', { class: 'meter-row' }, input, face),
      h('div', { class: 'meter-ends' }, h('span', { text: spec.left }), h('span', { text: spec.right })),
      h('button', { class: 'btn', type: 'button', text: 'Submit my answer', onclick: () => { store.set(key, +input.value); render(); } }),
    );
  };

  const reveal = (yours) => {
    const gap = Math.abs(yours - spec.mine) / span;
    const line1 = verdict(gap);
    const pin = (who, v, cls) => h('div', { class: `meter-pin ${cls}`, style: `left:${pct(v)}%` }, h('span', { text: who }));
    body.replaceChildren(
      h('p', { class: 'meter-q', text: spec.question }),
      h('div', { class: 'meter-track revealed' },
        h('div', { class: 'meter-gap', style: `left:${Math.min(pct(yours), pct(spec.mine))}%;width:${Math.abs(pct(yours) - pct(spec.mine))}%` }),
        pin('you', yours, 'you'), pin('me', spec.mine, 'me')),
      h('div', { class: 'meter-ends' }, h('span', { text: spec.left }), h('span', { text: spec.right })),
      h('div', { class: 'meter-verdict' }, h('strong', { text: `${line1} You: ${readout(yours)} · Me: ${readout(spec.mine)}` }), spec.why ? h('p', { text: spec.why }) : null),
      h('button', { class: 'btn ghost', type: 'button', text: 'Change answer', onclick: () => { store.set(key, null); render(); } }),
    );
  };
  render();
}

/* -------------------------------------------------------------- quadrant */

function quadrant(fig, body, spec) {
  const key = `quad:${hash(JSON.stringify(spec))}`;
  const saved = store.get(key) || {};
  const state = spec.points.map((p) => ({ ...p, ux: saved[p.name]?.[0] ?? p.x, uy: saved[p.name]?.[1] ?? p.y }));
  const moved = (p) => Math.abs(p.ux - p.x) > 0.01 || Math.abs(p.uy - p.y) > 0.01;
  const holder = h('div', { class: spec.draggable ? 'draggable' : '' });
  const hint = h('p', { class: 'viz-hint' });
  const resetBtn = h('button', { class: 'btn ghost small', type: 'button', text: 'Reset', onclick: () => { state.forEach((p) => { p.ux = p.x; p.uy = p.y; }); persist(); draw(); } });
  body.replaceChildren(holder, h('div', { class: 'viz-foot' }, hint, resetBtn));
  const persist = () => store.set(key, Object.fromEntries(state.filter(moved).map((p) => [p.name, [p.ux, p.uy]])));

  let W = 0;
  let svg;
  let dragging = null;
  const R = spec.range;
  const m = 16; // side margin
  const mt = 30; // room for the top label
  const narrow = () => W < 520;
  const geo = () => {
    const mb = narrow() ? 68 : 50; // room for the bottom labels
    const H = clamp(W * 0.85, 320, 520);
    const ph = H - mt - mb;
    return {
      H, mt, mb,
      px: (v) => m + ((v + R) / (2 * R)) * (W - 2 * m),
      py: (v) => mt + ((R - v) / (2 * R)) * ph,
      vx: (p) => clamp(((p - m) / (W - 2 * m)) * 2 * R - R, -R, R),
      vy: (p) => clamp(R - ((p - mt) / ph) * 2 * R, -R, R),
    };
  };

  function draw() {
    const { H, px, py } = geo();
    svg = svgRoot(holder, W, H, spec.title);
    const g = s('g', { class: 'quad-bg' }, svg);
    const top = py(R);
    const bottom = py(-R);
    s('rect', { x: px(0), y: top, width: px(R) - px(0), height: py(0) - top, class: 'q q1' }, g);
    s('rect', { x: m, y: py(0), width: px(0) - m, height: bottom - py(0), class: 'q q3' }, g);
    s('line', { x1: m, x2: W - m, y1: py(0), y2: py(0), class: 'quad-axis' }, g);
    s('line', { x1: px(0), x2: px(0), y1: top, y2: bottom, class: 'quad-axis' }, g);
    s('rect', { x: m, y: top, width: W - 2 * m, height: bottom - top, class: 'quad-frame' }, g);
    const lab = (txt, x, y, anchor) => { const t = s('text', { x, y, 'text-anchor': anchor, class: 'quad-label' }, g); t.textContent = txt; };
    lab(`↑ ${spec.yHigh}`, px(0), top - 10, 'middle');
    lab(`↓ ${spec.yLow}`, px(0), bottom + 20, 'middle');
    lab(`← ${spec.xLow}`, m, bottom + 42, 'start');
    lab(`${spec.xHigh} →`, W - m, bottom + (narrow() ? 60 : 42), 'end');

    for (const p of state) {
      if (!moved(p)) continue;
      s('line', { x1: px(p.x), y1: py(p.y), x2: px(p.ux), y2: py(p.uy), class: 'quad-trail' }, svg);
      s('circle', { cx: px(p.x), cy: py(p.y), r: 7, class: 'quad-ghost' }, svg);
    }
    state.forEach((p, i) => {
      const gp = s('g', { class: `quad-pt${moved(p) ? ' moved' : ''}${dragging === i ? ' active' : ''}`, 'data-i': i, tabindex: spec.draggable ? 0 : null }, svg);
      const cx = px(p.ux);
      const cy = py(p.uy);
      s('circle', { cx, cy, r: 18, class: 'hit' }, gp);
      s('circle', { cx, cy, r: narrow() ? 10 : 8, fill: moved(p) ? color(1) : color(0), class: 'dot' }, gp);
      const right = cx + 13 + p.name.length * 7 < W - 4; // flip the label left if it would overflow
      if (narrow()) {
        // phones: number the dots and list the names in a key below
        const num = s('text', { x: cx, y: cy + 3.5, 'text-anchor': 'middle', class: 'quad-num' }, gp);
        num.textContent = i + 1;
      } else {
        const t = s('text', { x: right ? cx + 13 : cx - 13, y: cy + 4, 'text-anchor': right ? 'start' : 'end', class: 'quad-name' }, gp);
        t.textContent = p.name;
      }
      gp.addEventListener('pointermove', (ev) => { if (dragging == null) showTip(`<strong>${esc(p.name)}</strong>${moved(p) ? '<br>moved by you' : ''}`, ev); });
      gp.addEventListener('pointerleave', hideTip);
      if (spec.draggable) {
        gp.addEventListener('pointerdown', (ev) => {
          dragging = i;
          hideTip();
          svg.setPointerCapture(ev.pointerId);
          ev.preventDefault();
        });
        gp.addEventListener('keydown', (ev) => {
          const step = R / 10;
          const dirs = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, step], ArrowDown: [0, -step] };
          if (!dirs[ev.key]) return;
          ev.preventDefault();
          p.ux = clamp(p.ux + dirs[ev.key][0], -R, R);
          p.uy = clamp(p.uy + dirs[ev.key][1], -R, R);
          persist();
          draw();
          svg.querySelector(`[data-i="${i}"]`)?.focus();
        });
      }
    });
    svg.onpointermove = (ev) => {
      if (dragging == null) return;
      const pt = toSvgPoint(svg, ev);
      const { vx, vy } = geo();
      state[dragging].ux = vx(pt.x);
      state[dragging].uy = vy(pt.y);
      draw();
    };
    svg.onpointerup = svg.onpointercancel = () => {
      if (dragging == null) return;
      dragging = null;
      persist();
      draw();
    };
    holder.querySelector('.quad-key')?.remove();
    if (narrow()) {
      holder.append(h('ol', { class: 'quad-key' }, state.map((p) => h('li', { class: moved(p) ? 'moved' : null, text: p.name }))));
    }
    const n = state.filter(moved).length;
    hint.textContent = !spec.draggable ? '' : n
      ? `You repositioned ${n} of ${state.length}. Outlined circles mark my original placement.`
      : 'Disagree? Drag any point to where you’d place it.';
    resetBtn.hidden = !n;
  }
  responsive(holder, (w) => { W = w; draw(); });
}

/* ----------------------------------------------------------------- guess */

function guess(fig, body, spec) {
  const { x: labels, values, from } = spec;
  const n = labels.length;
  const key = `guess:${hash(JSON.stringify(spec))}`;
  const saved = store.get(key);
  const guesses = saved?.guesses || values.map((v, i) => (i < from ? v : null));
  let revealed = !!saved?.revealed;
  const vmin = Math.min(...values);
  const vmax = Math.max(...values);
  const pad = (vmax - vmin || Math.abs(vmax) || 1) * 0.5;
  const { lo, hi: top, ticks } = niceTicks(spec.min ?? Math.min(vmin - pad, vmin >= 0 ? 0 : vmin - pad), spec.max ?? vmax + pad);

  const holder = h('div', { class: 'draggable' });
  const btn = h('button', { class: 'btn', type: 'button', text: 'Reveal the data', onclick: () => { revealed = true; persist(); draw(); } });
  const again = h('button', { class: 'btn ghost small', type: 'button', text: 'Try again', onclick: () => { revealed = false; for (let i = from; i < n; i++) guesses[i] = null; persist(); draw(); } });
  const msg = h('p', { class: 'viz-hint' });
  body.replaceChildren(
    h('p', { class: 'meter-q', text: spec.prompt || 'How do you think the rest of this goes? Draw your estimate.' }),
    holder,
    h('div', { class: 'viz-foot' }, msg, btn, again),
  );
  const persist = () => store.set(key, { guesses, revealed });

  let W = 0;
  let drawingFrom = null;
  const geo = () => {
    const H = clamp(W * 0.55, 240, 360);
    const m = { t: 24, r: 20, b: 30, l: 48 };
    const plotW = W - m.l - m.r;
    return {
      H, m, plotW,
      x: (i) => m.l + (i / (n - 1)) * plotW,
      y: (v) => m.t + (1 - (v - lo) / (top - lo)) * (H - m.t - m.b),
      vy: (py) => clamp(lo + (1 - (py - m.t) / (H - m.t - m.b)) * (top - lo), lo, top),
      ix: (px) => clamp(Math.round(((px - m.l) / plotW) * (n - 1)), from, n - 1),
    };
  };

  function draw() {
    const { H, m, plotW, x, y, vy, ix } = geo();
    const svg = svgRoot(holder, W, H, spec.title);
    yAxis(svg, ticks, y, m.l, W - m.r, spec.unit);
    xLabels(svg, labels, x, H - 8, plotW);
    const done = guesses.every((g) => g != null);
    if (!revealed) {
      s('rect', { x: x(from - 1), y: m.t, width: x(n - 1) - x(from - 1), height: H - m.t - m.b, class: 'draw-zone' }, svg);
      if (guesses[from] == null) {
        const t = s('text', { x: (x(from - 1) + x(n - 1)) / 2, y: (m.t + H - m.b) / 2, 'text-anchor': 'middle', class: 'draw-hint' }, svg);
        t.textContent = 'Draw your estimate here';
      }
    }
    s('path', { d: linePath(values.slice(0, from).map((v, i) => [x(i), y(v)])), class: 'line still', stroke: color(0) }, svg);
    const userPts = guesses.map((g, i) => (i >= from - 1 && g != null ? [x(i), y(g)] : null));
    s('path', { d: linePath(userPts), class: 'line still user', stroke: color(1) }, svg);
    userPts.forEach((p, i) => { if (p && i >= from) s('circle', { cx: p[0], cy: p[1], r: 4, fill: color(1), class: 'cross-dot' }, svg); });
    if (revealed) {
      s('path', { d: linePath(values.map((v, i) => (i >= from - 1 ? [x(i), y(v)] : null))), class: 'line reveal', stroke: color(0), pathLength: 1 }, svg);
      const last = s('text', { x: x(n - 1) - 4, y: y(values[n - 1]) - 10, 'text-anchor': 'end', class: 'direct-label' }, svg);
      last.textContent = `actual: ${fmt(values[n - 1], spec.unit)}`;
      const yl = s('text', { x: x(n - 1) - 4, y: y(guesses[n - 1]) + (guesses[n - 1] > values[n - 1] ? -10 : 18), 'text-anchor': 'end', class: 'direct-label you' }, svg);
      yl.textContent = `you: ${fmt(guesses[n - 1], spec.unit)}`;
    }
    const hit = s('rect', { x: m.l, y: 0, width: plotW, height: H, class: 'hit' }, svg);
    const paint = (ev) => {
      const p = toSvgPoint(svg, ev);
      const i = ix(p.x);
      const v = vy(p.y);
      // a fast swipe skips indexes: interpolate between the last painted point and this one
      if (drawingFrom != null && drawingFrom !== i) {
        const a = drawingFrom;
        const va = guesses[a];
        const dir = i > a ? 1 : -1;
        for (let k = a + dir; k !== i; k += dir) guesses[k] = va + ((v - va) * (k - a)) / (i - a);
      }
      guesses[i] = v;
      for (let k = from; k < i; k++) if (guesses[k] == null) guesses[k] = v; // nothing left of the pen stays empty
      drawingFrom = i;
      draw();
    };
    if (!revealed) {
      hit.addEventListener('pointerdown', (ev) => { svg.setPointerCapture(ev.pointerId); drawingFrom = null; paint(ev); ev.preventDefault(); });
      svg.onpointermove = (ev) => { if (drawingFrom != null) paint(ev); };
      svg.onpointerup = svg.onpointercancel = () => { if (drawingFrom != null) { drawingFrom = null; persist(); } };
    }

    btn.hidden = revealed;
    btn.disabled = !done;
    again.hidden = !revealed;
    if (revealed) {
      const errs = values.slice(from).map((v, i) => Math.abs(v - guesses[from + i]) / (top - lo));
      const avg = errs.reduce((a, b) => a + b, 0) / errs.length;
      const score = Math.round(clamp(100 - avg * 200, 0, 100));
      msg.textContent = `Accuracy: ${score}/100. ${score > 85 ? 'Remarkably close.' : score > 60 ? 'Good instincts.' : score > 35 ? 'Partly right.' : 'The data went another way.'}`;
    } else {
      msg.textContent = done ? 'When you’re ready, reveal the data.' : `Draw from ${labels[from]} to ${labels[n - 1]}.`;
    }
  }
  responsive(holder, (w) => { W = w; draw(); });
}

/* ------------------------------------------------------------------ tier */


function tier(fig, body, spec) {
  const key = `tier:${hash(JSON.stringify(spec))}`;
  const mine = Object.fromEntries(spec.tiers.flatMap((t) => t.items.map((it) => [it, t.name])));
  const order = spec.tiers.flatMap((t) => t.items);
  let yours = { ...mine, ...(store.get(key) || {}) };
  let compare = false;
  let selected = null;

  const board = h('div', { class: 'tier-board' });
  const msg = h('p', { class: 'viz-hint' });
  const cmpBtn = h('button', { class: 'btn small', type: 'button', onclick: () => { compare = !compare; render(); } });
  const resetBtn = h('button', { class: 'btn ghost small', type: 'button', text: 'Reset to mine', onclick: () => { yours = { ...mine }; store.set(key, null); compare = false; render(); } });
  body.replaceChildren(board, h('div', { class: 'viz-foot' }, msg, cmpBtn, resetBtn));

  const move = (item, tierName) => {
    yours[item] = tierName;
    selected = null;
    store.set(key, yours);
    render();
  };

  function render() {
    const changed = order.filter((it) => yours[it] !== mine[it]);
    board.replaceChildren(...spec.tiers.map((t, ti) => {
      const row = h('div', {
        class: 'tier-row', 'data-tier': t.name,
        onclick: (e) => { if (selected && !e.target.closest('.chip')) move(selected, t.name); },
      },
      h('div', { class: `tier-name${ti / Math.max(1, spec.tiers.length - 1) >= 0.5 ? ' faded' : ''}`, style: `--t:${ti / Math.max(1, spec.tiers.length - 1)}`, text: t.name }),
      h('div', { class: 'tier-items' }, order.filter((it) => yours[it] === t.name).map((it) => {
        const diff = compare && yours[it] !== mine[it];
        const chip = h('button', {
          type: 'button',
          class: `chip${selected === it ? ' selected' : ''}${compare ? (diff ? ' diff' : ' same') : ''}`,
          'aria-pressed': selected === it ? 'true' : 'false',
        }, it, diff ? h('small', { text: ` (me: ${mine[it]})` }) : null);
        dragChip(chip, it);
        return chip;
      })));
      return row;
    }));
    cmpBtn.textContent = compare ? 'Hide comparison' : 'Compare with mine';
    cmpBtn.hidden = !changed.length;
    resetBtn.hidden = !changed.length;
    msg.textContent = selected
      ? `Now tap a tier to drop “${selected}” in.`
      : changed.length
        ? `We agree on ${order.length - changed.length} of ${order.length} placements.`
        : 'This is my ranking. Drag items (or tap, then tap a tier) to make your own.';
  }

  function dragChip(chip, item) {
    let start = null;
    let ghost = null;
    chip.addEventListener('pointerdown', (ev) => {
      start = { x: ev.clientX, y: ev.clientY };
      chip.setPointerCapture(ev.pointerId);
    });
    chip.addEventListener('pointermove', (ev) => {
      if (!start) return;
      if (!ghost && Math.hypot(ev.clientX - start.x, ev.clientY - start.y) > 6) {
        ghost = chip.cloneNode(true);
        ghost.classList.add('ghost-chip');
        document.body.append(ghost);
        chip.classList.add('lifting');
      }
      if (ghost) {
        ghost.style.transform = `translate(${ev.clientX - 20}px, ${ev.clientY - 18}px) rotate(-4deg)`;
        board.querySelectorAll('.tier-row').forEach((r) => r.classList.remove('over'));
        document.elementFromPoint(ev.clientX, ev.clientY)?.closest('.tier-row')?.classList.add('over');
      }
    });
    const end = (ev) => {
      if (!start) return;
      start = null;
      if (ghost) {
        ghost.remove();
        ghost = null;
        const row = document.elementFromPoint(ev.clientX, ev.clientY)?.closest('.tier-row');
        if (row && board.contains(row)) move(item, row.dataset.tier);
        else render();
      } else {
        selected = selected === item ? null : item; // a tap selects; tapping a tier drops it
        render();
      }
    };
    chip.addEventListener('pointerup', end);
    chip.addEventListener('pointercancel', () => { start = null; ghost?.remove(); ghost = null; render(); });
  }
  render();
}

/* ------------------------------------------------------------------ mount */

const MOUNTS = { bar, line, donut, meter, quadrant, guess, tier };

export function mountChart(fig, spec) {
  const body = fig.querySelector('.viz-body') || fig.appendChild(h('div', { class: 'viz-body' }));
  try {
    MOUNTS[spec.type](fig, body, spec);
    if (spec.caption && !fig.querySelector('.viz-caption')) fig.append(h('p', { class: 'viz-caption', text: spec.caption }));
  } catch (err) {
    body.replaceChildren(h('p', { class: 'viz-error', text: `This chart couldn’t be drawn: ${err.message}` }));
    console.error(err);
  }
}

let io;
export function animateIn(fig) {
  io ??= new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('viz-in');
      io.unobserve(e.target);
      setTimeout(() => e.target.classList.add('viz-done'), 2200);
    }
  }, { threshold: 0.25 });
  io.observe(fig);
}

export function renderAll(root = document) {
  root.querySelectorAll('figure.viz[data-spec]:not([data-ready])').forEach((fig) => {
    fig.dataset.ready = '1';
    let spec;
    try { spec = JSON.parse(fig.dataset.spec); } catch { return; }
    mountChart(fig, spec);
    animateIn(fig);
  });
}
