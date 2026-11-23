import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkCharts from './src/charts/remark-charts.mjs';

export default defineConfig({
  site: 'https://bolanle.me',
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
