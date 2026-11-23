# bolanle.me 💭

A playful blog for thinking out loud — and charting it. Every post is a Markdown file; drop a ```` ```chart ```` block in and it becomes an interactive chart.

## Quick start

```bash
npm install
npm run dev              # http://localhost:4321 (drafts are visible here)
npm run new "My take"    # creates src/content/posts/my-take.md as a draft
npm run build            # static site in dist/
```

## Writing a post

Posts live in `src/content/posts/`. Front matter:

```yaml
---
title: Food takes that might end friendships
date: 2026-11-02
description: Shows on cards and in link previews.
tldr: Optional yellow sticky-note summary at the top.
tags: [food, hot-takes]
mood: 🌶️        # the emoji for this post (cards, thought map)
spice: 5        # 0–5: how hot is this take? (y-axis of the home page thought map)
draft: false    # true = only visible in `npm run dev`
---
```

Personal bits are in `src/site.ts`: your name, bio, fact chips and links (`ME`), plus the site tagline and homepage sticker (`SITE`). Put your photo at `public/me.jpg`; until it exists, a doodle avatar with your initial shows instead.

## Charts

The easiest way: open **/chart-lab/**, pick a type, edit the example, hit **Copy for my post**, paste. Typos fail the build with a friendly message pointing at the line, so a broken chart never goes live.

| type | what it does | readers can… |
|---|---|---|
| `bar` | ranked bars with emoji + hover notes, `highlight` a favourite | hover for notes |
| `line` | things over time, emoji `markers`, `annotations` | crosshair hover |
| `donut` | parts of a whole | hover slices/legend |
| `meter` | hot-take slider | vote, then see how far they are from you |
| `quadrant` | 2×2 opinion map (−10…10) | drag dots; your original stays as a ghost |
| `guess` | you-draw-it line | draw their guess, reveal, get scored |
| `tier` | S/A/B/C/D tier list | drag (or tap-tap) to re-rank and compare |

```chart
type: meter
question: Is a hot dog a sandwich?
labels: [Absolutely not, Obviously yes]
mine: 82
why: Bread + filling = sandwich.
```

Every type also accepts `title` and `caption`. Full examples for each type are in `src/charts/templates.js` (the same ones the Chart Lab loads). Readers' answers are kept in their own browser only (localStorage) — there's no server or tracking.

## How it's built

- [Astro](https://astro.build) static site, zero client framework.
- `src/charts/remark-charts.mjs` turns chart blocks into placeholders at build time (validated by `normalize.js`).
- `src/charts/engine.js` is a dependency-free SVG/HTML chart engine that renders them in the browser.
- Light/dark mode follows the system, with a toggle.
- Chart colours (`--s1`…`--s8` in `src/styles/global.css`) are a yellow-led palette validated for colour-blind separation in both modes: marigold, blue, vermilion, teal, violet, green, rose, sky. The brighter brand yellow (`--brand`) is for UI accents only.

## Deploying

`.github/workflows/deploy.yml` builds and publishes to **GitHub Pages** on every push to `main`. One-time setup: repo **Settings → Pages → Source: GitHub Actions**. For the custom domain, add `bolanle.me` under Settings → Pages and point your DNS at GitHub Pages.
(Netlify/Vercel/Cloudflare Pages also work out of the box: build command `npm run build`, output `dist`.)
