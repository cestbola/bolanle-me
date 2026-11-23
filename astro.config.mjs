import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkCharts from './src/charts/remark-charts.mjs';

export default defineConfig({
  site: 'https://bolanle.me',
  markdown: {
    // ```chart blocks in posts become interactive charts (see src/charts/)
    processor: unified({ remarkPlugins: [remarkCharts] }),
    shikiConfig: { theme: 'github-dark-dimmed' },
  },
});
