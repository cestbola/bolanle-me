// Turns ```chart fenced blocks into <figure class="viz"> placeholders that the
// browser-side engine (src/charts/engine.js) brings to life.
import { parse } from 'yaml';
import { visit } from 'unist-util-visit';
import { normalize } from './normalize.js';

const escapeAttr = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export default function remarkCharts() {
  return (tree, file) => {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang !== 'chart' || !parent) return;
      let spec;
      try {
        spec = normalize(parse(node.value));
      } catch (err) {
        const where = file?.path ? ` in ${file.path}` : '';
        throw new Error(`Chart block${where} (line ${node.position?.start.line}) is invalid: ${err.message}`);
      }
      const title = spec.title ? `<figcaption class="viz-title">${escapeAttr(spec.title)}</figcaption>` : '';
      parent.children[index] = {
        type: 'html',
        value: `<figure class="viz viz-${spec.type}" data-spec="${escapeAttr(JSON.stringify(spec))}">${title}<div class="viz-body"><p class="viz-loading">Loading chart…</p></div></figure>`,
      };
    });
  };
}
