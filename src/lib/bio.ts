import { ME } from '../site';

export const escape = (t: string) =>
  t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

/** Escapes text and turns business names (ME.ventures) into links to their websites. */
export const withLinks = (text: string) =>
  ME.ventures.reduce(
    (out, v) =>
      v.href ? out.split(escape(v.name)).join(`<a href="${escape(v.href)}" rel="noopener" target="_blank">${escape(v.name)}</a>`) : out,
    escape(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'),
  );
