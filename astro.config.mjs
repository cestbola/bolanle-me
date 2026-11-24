import { defineConfig, envField } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkCharts from './src/charts/remark-charts.mjs';

export default defineConfig({
  site: 'https://bolanle.me',
  env: {
    schema: {
      // Server-only secret; import with `import { MONGODB_URI } from 'astro:env/server'`
      MONGODB_URI: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
  markdown: {
    // ```chart blocks in posts become interactive charts (see src/charts/)
    processor: unified({
      remarkPlugins: [remarkCharts],
      // footnotes ([^1]) become numbered citations with a visible "Sources" list
      remarkRehype: {
        footnoteLabel: 'Sources',
        footnoteLabelTagName: 'h2',
        footnoteLabelProperties: { className: ['sources-label'] },
        footnoteBackLabel: (i) => `Back to citation ${i + 1}`,
      },
    }),
    shikiConfig: { theme: 'github-dark-dimmed' },
  },
});
