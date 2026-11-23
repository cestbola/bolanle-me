---
title: Hello, world (now with charts)
date: 2026-11-23
description: Welcome to the blog where every thought gets a chart, whether it needs one or not.
tldr: I made a blog. The charts are interactive. Please poke them.
tags: [meta, charts]
mood: 👋
spice: 1
---

Welcome! This is the first post on my new blog, and — as promised in the URL bar of my heart — it is **full of charts**.

The idea is simple: when I have a thought, I write it down. When I have a *strong* thought, I chart it. Here's what that looks like.

## Some charts just sit there looking pretty

Hover (or tap) the bars to see my notes.

```chart
type: bar
title: Reasons I started this blog
unit: "%"
sort: desc
highlight: To chart things
data:
  - { label: To chart things, value: 45, emoji: 📊, note: "Obviously" }
  - { label: Too many opinions, value: 30, emoji: 🗣️ }
  - { label: Group chat needed a break, value: 15, emoji: 💬, note: "They asked nicely" }
  - { label: Personal growth, value: 10, emoji: 🌱 }
```

```chart
type: donut
title: How I'll spend my blogging time (projected)
center: ⏳
data:
  Writing: 30
  Fiddling with chart colours: 45
  Re-reading my own posts: 15
  Fixing typos after publishing: 10
```

## Some charts want your opinion

This one's a **hot-take meter**. Slide to your answer, lock it in, and find out whether we can still be friends.

```chart
type: meter
question: Pineapple on pizza?
labels: [Crime against food, Culinary genius]
mine: 71
why: Sweet + salty is a whole food group. I stand by this.
```

And this is a **tier list**. It's mine, so it's correct — but you're welcome to drag things around (on a phone: tap an item, then tap a tier).

```chart
type: tier
title: Ways to spend a Sunday
tiers:
  S: [Long brunch, Nap with the window open]
  A: [Farmers market, Cooking something ambitious]
  B: [Errands but with a podcast]
  C: [Laundry]
  D: [Sunday scaries]
```

---

That's the tour. More thoughts soon. Probably with more charts. Definitely with more charts.
