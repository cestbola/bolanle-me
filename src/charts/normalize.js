// Validates a parsed chart spec and turns friendly shorthand into one canonical
// shape. Runs at build time (so a typo fails loudly) and in the Chart Lab.

export const TYPES = ['bar', 'line', 'donut', 'meter', 'quadrant', 'guess', 'tier'];

const fail = (msg) => {
  throw new Error(msg);
};

const num = (v, what) => {
  const n = typeof v === 'string' ? Number(v.replace(/[,%$£€]/g, '')) : v;
  if (typeof n !== 'number' || Number.isNaN(n)) fail(`${what} should be a number (got ${JSON.stringify(v)})`);
  return n;
};

// `data` may be a map ({Mango: 10}) or a list ([{label, value, note, emoji}]).
const toItems = (data, what = 'data') => {
  if (!data) fail(`missing "${what}"`);
  if (Array.isArray(data)) {
    return data.map((d, i) => {
      if (typeof d !== 'object' || d === null) fail(`${what}[${i}] should look like {label: ..., value: ...}`);
      return {
        label: String(d.label ?? d.name ?? `Item ${i + 1}`),
        value: num(d.value, `${what}[${i}].value`),
        ...(d.note ? { note: String(d.note) } : {}),
        ...(d.emoji ? { emoji: String(d.emoji) } : {}),
      };
    });
  }
  if (typeof data === 'object') {
    return Object.entries(data).map(([label, value]) => ({ label, value: num(value, `"${label}"`) }));
  }
  fail(`"${what}" should be a list or a map of label: value`);
};

const pair = (v, what, fallback) => {
  if (v == null) return fallback;
  if (Array.isArray(v) && v.length === 2) return v.map(String);
  fail(`"${what}" should be two labels, like [low, high]`);
};

// `source` is written like Markdown: "[Title](https://…), extra text; [Another](https://…)".
// It becomes a list of segments so the chart can render real links.
export function parseSource(src) {
  if (src == null) return null;
  const text = Array.isArray(src) ? src.map(String).join('; ') : String(src);
  const segs = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) segs.push({ text: text.slice(last, m.index) });
    if (!/^https?:\/\//.test(m[2])) fail(`source link "${m[2]}" should start with http:// or https://`);
    segs.push({ text: m[1], url: m[2] });
    last = re.lastIndex;
  }
  if (last < text.length) segs.push({ text: text.slice(last) });
  return segs;
}

export function normalize(raw) {
  if (!raw || typeof raw !== 'object') fail('a chart needs at least a "type"');
  const type = String(raw.type || '').toLowerCase();
  if (!TYPES.includes(type)) fail(`unknown type "${raw.type}". Try one of: ${TYPES.join(', ')}`);
  const base = {
    type,
    ...(raw.title ? { title: String(raw.title) } : {}),
    ...(raw.caption ? { caption: String(raw.caption) } : {}),
    ...(raw.source ? { source: parseSource(raw.source) } : {}),
  };
  const unit = raw.unit != null ? String(raw.unit) : '';

  switch (type) {
    case 'bar': {
      const items = toItems(raw.data);
      return {
        ...base,
        unit,
        items,
        vertical: raw.orientation === 'vertical' || raw.vertical === true,
        ...(raw.highlight ? { highlight: [].concat(raw.highlight).map(String) } : {}),
        ...(raw.sort ? { sort: raw.sort === 'asc' ? 'asc' : 'desc' } : {}),
      };
    }
    case 'donut': {
      let items = toItems(raw.data);
      if (items.some((d) => d.value < 0)) fail('donut slices cannot be negative');
      items.sort((a, b) => b.value - a.value);
      if (items.length > 8) {
        const rest = items.slice(7).reduce((s, d) => s + d.value, 0);
        items = [...items.slice(0, 7), { label: 'Other', value: rest }];
      }
      return { ...base, unit, items, ...(raw.center ? { center: String(raw.center) } : {}) };
    }
    case 'line': {
      const x = raw.x;
      if (!Array.isArray(x) || x.length < 2) fail('"x" should be a list of at least two labels');
      let series = raw.series ?? (raw.values ? { [raw.title || 'Value']: raw.values } : null);
      if (!series || typeof series !== 'object' || Array.isArray(series)) fail('"series" should be a map of name: [values]');
      const entries = Object.entries(series);
      if (entries.length > 8) fail('8 lines max — more than that turns into spaghetti 🍝');
      const out = entries.map(([name, vals]) => {
        if (!Array.isArray(vals) || vals.length !== x.length) fail(`series "${name}" needs ${x.length} values (one per x label)`);
        return { name, values: vals.map((v, i) => (v == null ? null : num(v, `${name}[${i}]`))) };
      });
      const markers = Array.isArray(raw.markers) ? raw.markers.map((m) => (m == null ? '' : String(m))) : null;
      const annotations = (raw.annotations || []).map((a, i) => {
        const at = String(a.at ?? a.x ?? '');
        if (!x.map(String).includes(at)) fail(`annotations[${i}].at "${at}" is not one of the x labels`);
        return { at, text: String(a.text ?? '') };
      });
      return {
        ...base,
        unit,
        x: x.map(String),
        series: out,
        ...(markers ? { markers } : {}),
        ...(annotations.length ? { annotations } : {}),
        ...(raw.min != null ? { min: num(raw.min, 'min') } : {}),
        ...(raw.max != null ? { max: num(raw.max, 'max') } : {}),
        area: raw.area === true,
      };
    }
    case 'meter': {
      if (!raw.question) fail('a meter needs a "question"');
      const min = raw.min != null ? num(raw.min, 'min') : 0;
      const max = raw.max != null ? num(raw.max, 'max') : 100;
      const mine = raw.mine != null ? num(raw.mine, 'mine') : fail('a meter needs "mine" — your own answer');
      if (mine < min || mine > max) fail(`"mine" should sit between ${min} and ${max}`);
      const [left, right] = pair(raw.labels, 'labels', ['Nope', 'Absolutely']);
      // quiz: true means `mine` is the correct answer rather than an opinion
      return { ...base, question: String(raw.question), min, max, mine, left, right, quiz: raw.quiz === true, ...(raw.why ? { why: String(raw.why) } : {}) };
    }
    case 'quadrant': {
      const range = raw.range != null ? num(raw.range, 'range') : 10;
      const [xLow, xHigh] = pair(raw.x, 'x', ['Low', 'High']);
      const [yLow, yHigh] = pair(raw.y, 'y', ['Low', 'High']);
      if (!raw.points || typeof raw.points !== 'object') fail('"points" should be a map of name: [x, y]');
      const points = Object.entries(raw.points).map(([name, p]) => {
        if (!Array.isArray(p) || p.length !== 2) fail(`point "${name}" should be [x, y]`);
        const [px, py] = p.map((v) => num(v, `point "${name}"`));
        if (Math.abs(px) > range || Math.abs(py) > range) fail(`point "${name}" is outside ±${range}`);
        return { name, x: px, y: py };
      });
      return { ...base, range, xLow, xHigh, yLow, yHigh, points, draggable: raw.draggable !== false };
    }
    case 'guess': {
      const x = raw.x;
      if (!Array.isArray(x) || x.length < 3) fail('"x" should be a list of at least three labels');
      if (!Array.isArray(raw.values) || raw.values.length !== x.length) fail(`"values" needs ${x.length} numbers (one per x label)`);
      const values = raw.values.map((v, i) => num(v, `values[${i}]`));
      const from = raw.reveal_from != null ? num(raw.reveal_from, 'reveal_from') : Math.ceil(x.length / 2);
      if (from < 1 || from > x.length - 1) fail(`"reveal_from" should be between 1 and ${x.length - 1}`);
      return {
        ...base,
        unit,
        x: x.map(String),
        values,
        from,
        ...(raw.min != null ? { min: num(raw.min, 'min') } : {}),
        ...(raw.max != null ? { max: num(raw.max, 'max') } : {}),
        ...(raw.prompt ? { prompt: String(raw.prompt) } : {}),
      };
    }
    case 'tier': {
      if (!raw.tiers || typeof raw.tiers !== 'object' || Array.isArray(raw.tiers)) fail('"tiers" should be a map like S: [thing, thing]');
      const tiers = Object.entries(raw.tiers).map(([name, items]) => ({
        name,
        items: (items == null ? [] : [].concat(items)).map(String),
      }));
      if (tiers.length < 2) fail('a tier list needs at least two tiers');
      return { ...base, tiers };
    }
  }
}
