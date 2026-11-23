---
title: All the ways AI is moving science and maths
date: 2026-11-23
description: Proteins, Olympiad gold, weather forecasts, new materials and a 56-year-old maths record. A tour of what AI has actually done for science so far.
tldr: AI has predicted a thousand times more protein structures than experiments ever solved, scored gold at the International Mathematical Olympiad, out-forecast the world's best weather model and was at the heart of two 2024 Nobel Prizes. Most of these results still need humans to check them.
tags: [ai, science, maths]
mood: 🔬
spice: 2
---

In October 2024, work on artificial intelligence won the Nobel Prize in Physics and half of the Nobel Prize in Chemistry. The **Physics** prize went to John Hopfield and Geoffrey Hinton for the foundations of neural networks.[^nobelphys] Half of the **Chemistry** prize went to Demis Hassabis and John Jumper of Google DeepMind for AlphaFold, which predicts the shapes of proteins. (The other half went to David Baker, for designing new proteins with computers.)[^nobelchem]

That was the moment AI stopped being a tool *for* science and became part of its story. Here's what it has done so far, in numbers.

## Biology: the protein explosion

Proteins do almost everything in living things, and their shape decides what they do. Working out a single shape by experiment can take months or years. Since 1971, scientists have deposited around a quarter of a million structures in the Protein Data Bank.[^pdb] AlphaFold's database now holds predictions for **more than 241 million**.[^afdb]

```chart
type: bar
title: Protein structures in public databases
unit: million
highlight: Predicted by AlphaFold
data:
  - { label: Solved by experiment (PDB entries), value: 0.25, note: "247,287 entries in the Protein Data Bank at the end of 2025, built up since 1971. Some are repeat structures of the same protein" }
  - { label: Predicted by AlphaFold, value: 241, note: "241 million predictions in the AlphaFold Database (version 6), free for anyone to use" }
caption: "The experimental bar is there; it's just about a thousand times shorter."
source: "[RCSB PDB newsletter, Q1 2026](https://cdn.rcsb.org/rcsb-pdb/general_information/news_publications/newsletters/2026q1/deposit.html); [EMBL-EBI AlphaFold Database release notes](https://www.ebi.ac.uk/pdbe/news/alphafold-database-release-notes)"
```

Predictions aren't the same as measurements, and some are much more confident than others. But for many biologists, the first step on a new protein went from "spend a year in the lab" to "look it up".

## Maths: from silver to gold

The International Mathematical Olympiad is the world's hardest maths competition for school students: six problems over two days, each worth 7 points. In 2024, two DeepMind systems scored **28 out of 42**, a silver medal, though people first had to translate the problems into a formal language the systems could read.[^imo2024]

A year later, two AI systems from Google DeepMind and OpenAI read the problems in plain English and wrote their proofs in plain English too, within the time limit.[^imo2025] How many problems do you think they solved?

```chart
type: meter
title: Quick quiz
question: How many of the six 2025 Olympiad problems did the best AI systems solve?
quiz: true
min: 0
max: 6
labels: ["0", "All 6"]
mine: 5
why: "Five. Both scored 35 out of 42, exactly the gold-medal cut-off. Neither solved problem 6, the hardest. DeepMind's result was officially certified by the Olympiad; OpenAI's was graded by former medallists."
source: "[Google DeepMind (2025)](https://deepmind.google/discover/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/)"
```

AI is also starting to move real research maths, not just competition problems. In 2025 DeepMind's AlphaEvolve found a faster way to multiply two 4×4 matrices (grids of numbers) made of complex numbers. The best known method for this case, Volker Strassen's famous 1969 trick applied twice, had stood for 56 years.[^alphaevolve]

```chart
type: bar
title: Multiplications needed to multiply two 4×4 matrices
unit: multiplications
highlight: AlphaEvolve (2025)
data:
  - { label: The schoolbook method, value: 64 }
  - { label: Strassen's method (1969), value: 49, note: "Strassen's 2×2 trick applied twice. The best known for this case for 56 years" }
  - { label: AlphaEvolve (2025), value: 48, note: "Works for complex numbers. Each complex multiplication can cost several ordinary ones, so the practical gain is debated. Weeks later, other mathematicians found a 48-step method without complex numbers" }
caption: "Fewer multiplications means faster computation, and matrix multiplication runs inside almost everything a computer does, AI included."
source: "[Google DeepMind, AlphaEvolve (2025)](https://deepmind.google/discover/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/); [Ernest Davis, NYU](https://cs.nyu.edu/~davise/papers/AlphaEvolveNotes.pdf)"
```

The same system nudged up the "kissing number" in 11 dimensions, the number of equal spheres that can touch one central sphere, from at least 592 to at least 593.[^alphaevolve][^ieee] A one-sphere improvement sounds tiny. In this corner of maths, it's news.

## Weather: better forecasts, faster

Weather forecasting has run on physics simulations and supercomputers for decades. The gold standard is the European Centre for Medium-Range Weather Forecasts (ECMWF). DeepMind tested two AI models against ECMWF's best systems across more than a thousand combinations of weather variable and forecast length.[^graphcast][^gencast]

```chart
type: bar
title: How often AI beat the leading forecasting system
unit: "%"
data:
  - { label: "GraphCast vs. ECMWF's main forecast (2023)", value: 90, note: "More accurate on 90% of 1,380 test targets (Science, 2023)" }
  - { label: "GenCast vs. ECMWF's ensemble forecast (2024)", value: 97.2, note: "More skilful on 97.2% of 1,320 targets, and 99.8% beyond 36 hours (Nature, 2024)" }
caption: "A “target” is one combination of weather variable, such as wind or temperature, and forecast lead time."
source: "[Lam et al., Science (2023)](https://doi.org/10.1126/science.adi2336); [Price et al., Nature (2024)](https://doi.org/10.1038/s41586-024-08252-9)"
```

Each 15-day GenCast forecast takes about 8 minutes on a single AI chip, and the dozens of forecasts in an ensemble run side by side.[^gencastblog] Since 2025, ECMWF has run its own AI forecasting models alongside its physics-based ones.[^ecmwf]

## Materials: millions of new crystals

New materials give us better batteries, solar panels and computer chips. In 2023 DeepMind's GNoME predicted **2.2 million** new crystal structures, which DeepMind called about 800 years' worth of knowledge.[^gnomeblog] But a crystal that looks stable on its own might break down into a mix of other new ones. Guess what share stayed stable even against all the others.

```chart
type: meter
title: Quick quiz
question: Of GNoME's 2.2 million new crystals, what share stayed stable even when compared against all the other new ones?
quiz: true
labels: ["0%", "100%"]
mine: 17
why: "About 17%: roughly 380,000 crystals. That's almost ten times as many stable materials as earlier computer searches had found. By the time the paper came out, labs around the world had already made 736 of them."
source: "[Merchant et al., Nature (2023)](https://www.nature.com/articles/s41586-023-06735-9); [Google DeepMind](https://deepmind.google/discover/blog/millions-of-new-materials-discovered-with-deep-learning/)"
```

## What AI isn't doing (yet)

It's easy to read all this as "AI is doing science now". It isn't, quite.

- **Humans still check the work.** Predicted proteins and crystals are hypotheses until someone confirms them in a lab.
- **Olympiad problems aren't research.** They're hard, but they have known answers and fit on a page.
- **The wins are uneven.** The biggest successes come where there's lots of clean data and a clear way to score an answer: protein shapes, weather records, maths proofs.

> The pattern so far: AI is best at searching huge spaces of possibilities and suggesting where to look. Deciding what it all means is still our job.

[^nobelphys]: The Nobel Prize, [The Nobel Prize in Physics 2024](https://www.nobelprize.org/prizes/physics/2024/summary/): “for foundational discoveries and inventions that enable machine learning with artificial neural networks”.
[^nobelchem]: The Nobel Prize, [The Nobel Prize in Chemistry 2024](https://www.nobelprize.org/prizes/chemistry/2024/summary/): half to David Baker “for computational protein design”, half to Demis Hassabis and John Jumper “for protein structure prediction”.
[^pdb]: RCSB Protein Data Bank, [data deposition newsletter, Q1 2026](https://cdn.rcsb.org/rcsb-pdb/general_information/news_publications/newsletters/2026q1/deposit.html): 247,287 entries at the end of 2025.
[^afdb]: EMBL-EBI, [AlphaFold Database release notes](https://www.ebi.ac.uk/pdbe/news/alphafold-database-release-notes), version 6.
[^imo2024]: Google DeepMind, [“AI achieves silver-medal standard solving International Mathematical Olympiad problems”](https://deepmind.google/discover/blog/ai-solves-imo-problems-at-silver-medal-level/), July 2024.
[^imo2025]: Google DeepMind, [“Advanced version of Gemini with Deep Think officially achieves gold-medal standard at the International Mathematical Olympiad”](https://deepmind.google/discover/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/), July 2025. OpenAI announced the same score for its experimental model the same week.
[^alphaevolve]: Google DeepMind, [“AlphaEvolve: A Gemini-powered coding agent for designing advanced algorithms”](https://deepmind.google/discover/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/), May 2025. For a critical view, see Ernest Davis's [notes on AlphaEvolve](https://cs.nyu.edu/~davise/papers/AlphaEvolveNotes.pdf).
[^ieee]: *IEEE Spectrum*, [coverage of AlphaEvolve](https://spectrum.ieee.org/deepmind-alphaevolve), 2025. The upper bound for the 11-dimensional kissing number is 868.
[^graphcast]: Remi Lam et al., [“Learning skillful medium-range global weather forecasting”](https://doi.org/10.1126/science.adi2336), *Science*, 2023.
[^gencast]: Ilan Price et al., [“Probabilistic weather forecasting with machine learning”](https://doi.org/10.1038/s41586-024-08252-9), *Nature*, 2024.
[^gencastblog]: Google DeepMind, [“GenCast predicts weather and the risks of extreme conditions with state-of-the-art accuracy”](https://deepmind.google/discover/blog/gencast-predicts-weather-and-the-risks-of-extreme-conditions-with-sota-accuracy/), December 2024.
[^ecmwf]: ECMWF, [“ECMWF's ensemble AI forecasts become operational”](https://www.ecmwf.int/en/about/media-centre/news/2025/ecmwfs-ensemble-ai-forecasts-become-operational), July 2025.
[^gnomeblog]: Google DeepMind, [“Millions of new materials discovered with deep learning”](https://deepmind.google/discover/blog/millions-of-new-materials-discovered-with-deep-learning/), November 2023; and Amil Merchant et al., [“Scaling deep learning for materials discovery”](https://www.nature.com/articles/s41586-023-06735-9), *Nature*, 2023.
