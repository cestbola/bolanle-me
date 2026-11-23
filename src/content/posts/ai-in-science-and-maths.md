---
title: All the ways AI is moving science and maths
date: 2026-11-23
description: Proteins, Olympiad gold, weather forecasts, new materials and a 56-year-old maths record. A tour of what AI has actually done for science so far.
tldr: AI has predicted a thousand times more protein structures than experiments ever solved, scored gold at the International Mathematical Olympiad, out-forecast the world's best weather model and helped win two Nobel Prizes. Most of these results still need humans to check them.
tags: [ai, science, maths]
mood: 🔬
spice: 2
---

In October 2024, two of the five Nobel Prizes went to work on artificial intelligence. The **Physics** prize went to John Hopfield and Geoffrey Hinton for the foundations of neural networks. Half of the **Chemistry** prize went to Demis Hassabis and John Jumper of Google DeepMind for AlphaFold, which predicts the shapes of proteins. (The other half went to David Baker, for designing new proteins with computers.)

That was the moment AI stopped being a tool *for* science and became part of its story. Here's what it has done so far, in numbers.

## Biology: the protein explosion

Proteins do almost everything in living things, and their shape decides what they do. Working out a single shape by experiment can take months or years. Since 1971, scientists have deposited around a quarter of a million structures in the Protein Data Bank. AlphaFold's database now holds predictions for **more than 241 million**.

```chart
type: bar
title: Protein structures available to scientists
unit: million
highlight: Predicted by AlphaFold
data:
  - { label: Solved by experiment, value: 0.25, note: "247,287 entries in the Protein Data Bank at the end of 2025, built up since 1971" }
  - { label: Predicted by AlphaFold, value: 241, note: "241 million predictions in the AlphaFold Database (version 6), free for anyone to use" }
caption: "The experimental bar is there; it's just about a thousand times shorter. Sources: RCSB PDB, EMBL-EBI AlphaFold Database."
```

Predictions aren't the same as measurements, and some are much more confident than others. But for many biologists, the first step on a new protein went from "spend a year in the lab" to "look it up".

## Maths: from silver to gold

The International Mathematical Olympiad is the world's hardest maths competition for school students: six problems over two days, each worth 7 points. In 2024, two DeepMind systems scored **28 out of 42**, a silver medal, though people first had to translate the problems into a formal language the systems could read.

A year later, two AI systems from Google DeepMind and OpenAI read the problems in plain English and wrote their proofs in plain English too, within the time limit. How many problems do you think they solved?

```chart
type: meter
title: Quick quiz
question: How many of the six 2025 Olympiad problems did the best AI systems solve?
quiz: true
min: 0
max: 6
labels: ["0", "All 6"]
mine: 5
why: "Five. Both scored 35 out of 42, exactly the gold-medal cut-off. Neither solved problem 6, the hardest."
```

AI is also starting to move real research maths, not just competition problems. In 2025 DeepMind's AlphaEvolve found a faster way to multiply two 4×4 matrices (grids of numbers) made of complex numbers. The previous record had stood since Volker Strassen's famous method in 1969.

```chart
type: bar
title: Multiplications needed to multiply two 4×4 matrices
unit: multiplications
highlight: AlphaEvolve (2025)
data:
  - { label: The schoolbook method, value: 64 }
  - { label: Strassen's method (1969), value: 49, note: "Held the record for 56 years" }
  - { label: AlphaEvolve (2025), value: 48, note: "Works for complex numbers. Each complex multiplication can cost several ordinary ones, so the practical gain is debated" }
caption: "Fewer multiplications means faster computation, and matrix multiplication runs inside almost everything a computer does, AI included. Sources: Google DeepMind; Ernest Davis (NYU)."
```

The same system nudged up the "kissing number" in 11 dimensions, the number of equal spheres that can touch one central sphere, from at least 592 to at least 593. A one-sphere improvement sounds tiny. In this corner of maths, it's news.

## Weather: better forecasts, faster

Weather forecasting has run on physics simulations and supercomputers for decades. The gold standard is the European Centre for Medium-Range Weather Forecasts (ECMWF). DeepMind tested two AI models against ECMWF's best systems across hundreds of combinations of weather variable and forecast length.

```chart
type: bar
title: How often AI beat the leading forecasting system
unit: "%"
data:
  - { label: "GraphCast vs. ECMWF's main forecast (2023)", value: 90, note: "More accurate on 90% of 1,380 test targets (Science, 2023)" }
  - { label: "GenCast vs. ECMWF's ensemble forecast (2024)", value: 97.2, note: "More skilful on 97.2% of 1,320 targets, and 99.8% beyond 36 hours (Nature, 2024)" }
caption: "A “target” is one combination of weather variable, such as wind or temperature, and forecast lead time."
```

GenCast produces a 15-day forecast on a single AI chip in about 8 minutes. ECMWF now runs its own AI forecasting model alongside its physics-based one.

## Materials: millions of new crystals

New materials give us better batteries, solar panels and computer chips. In 2023 DeepMind's GNoME predicted **2.2 million** new crystal structures, which DeepMind called the equivalent of nearly 800 years of discovery. Not all of them would hold together in the real world, though. Guess what share were predicted to be stable.

```chart
type: meter
title: Quick quiz
question: What share of GNoME's 2.2 million new crystals were predicted to be stable?
quiz: true
labels: ["0%", "100%"]
mine: 17
why: "About 17%: roughly 380,000 crystals. That's still about ten times as many stable materials as science knew before. By the time the paper came out, labs around the world had already made 736 of them."
```

## What AI isn't doing (yet)

It's easy to read all this as "AI is doing science now". It isn't, quite.

- **Humans still check the work.** Predicted proteins and crystals are hypotheses until someone confirms them in a lab.
- **Olympiad problems aren't research.** They're hard, but they have known answers and fit on a page.
- **The wins are uneven.** The biggest successes come where there's lots of clean data and a clear way to score an answer: protein shapes, weather records, maths proofs.

> The pattern so far: AI is best at searching huge spaces of possibilities and suggesting where to look. Deciding what it all means is still our job.

---

### Sources

- The Nobel Prize, [Physics 2024](https://www.nobelprize.org/prizes/physics/2024/summary/) and [all 2024 prizes](https://www.nobelprize.org/all-nobel-prizes-2024/)
- EMBL-EBI, [AlphaFold Database release notes](https://www.ebi.ac.uk/pdbe/news/alphafold-database-release-notes) (v6: 241,070,489 predictions)
- RCSB PDB, [Data deposition newsletter, Q1 2026](https://cdn.rcsb.org/rcsb-pdb/general_information/news_publications/newsletters/2026q1/deposit.html) (year-end 2025 holdings)
- Google DeepMind, [Gemini Deep Think achieves gold-medal standard at the IMO](https://deepmind.google/discover/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/) (2025)
- Google DeepMind, [AlphaEvolve](https://deepmind.google/discover/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/) (2025); Ernest Davis, [notes on AlphaEvolve](https://cs.nyu.edu/~davise/papers/AlphaEvolveNotes.pdf); [IEEE Spectrum](https://spectrum.ieee.org/deepmind-alphaevolve)
- Lam et al., [GraphCast](https://arxiv.org/abs/2212.12794), Science (2023)
- Price et al., [GenCast](https://deepmind.google/discover/blog/gencast-predicts-weather-and-the-risks-of-extreme-conditions-with-sota-accuracy/), Nature (2024)
- Merchant et al., [Scaling deep learning for materials discovery](https://www.nature.com/articles/s41586-023-06735-9), Nature (2023), and the [GNoME announcement](https://deepmind.google/discover/blog/millions-of-new-materials-discovered-with-deep-learning/)
