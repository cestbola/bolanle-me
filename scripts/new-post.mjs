#!/usr/bin/env node
// Usage: npm run new "My spicy take about soup"
import { writeFileSync, existsSync } from 'node:fs';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Give your post a title:  npm run new "My spicy take about soup"');
  process.exit(1);
}
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const file = `src/content/posts/${slug}.md`;
if (existsSync(file)) {
  console.error(`${file} already exists — pick another title.`);
  process.exit(1);
}
const today = new Date().toISOString().slice(0, 10);
writeFileSync(file, `---
title: ${JSON.stringify(title)}
date: ${today}
description: One line that makes people click.
tldr: The whole thought in a sentence (optional — delete if you like).
tags: [thoughts]
mood: 💭
spice: 2
draft: true
---

Start writing here. Build a chart at /chart-lab/ and paste it in, like this:

\`\`\`chart
type: meter
question: Is this post going to be good?
labels: [Nah, Absolutely]
mine: 90
\`\`\`
`);
console.log(`✨ Created ${file}  (it's a draft — set draft: false to publish)`);
