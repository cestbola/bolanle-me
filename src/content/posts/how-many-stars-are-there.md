---
title: How many stars are there? Start counting the zeros
date: 2026-11-23
description: From the few thousand you can see tonight to the tens of sextillions out there, a tour of a very large number.
tldr: About 9,100 stars are bright enough to see with the naked eye, across the whole sky. The observable universe holds roughly 70,000,000,000,000,000,000,000, which is more than every grain of sand on Earth.
tags: [space, science]
mood: ✨
spice: 1
---

Look up on a clear, dark night and it feels like the sky is *full*. It isn't, quite. The Yale Bright Star Catalogue lists about **9,100 stars** bright enough to see without a telescope, and that's across the whole sky.[^skytel] Since half of it is always below the horizon, you'll see somewhere between 2,600 and 4,500 at once, from somewhere truly dark.[^lovenight]

That's the first number. The rest get big very quickly, so let's count digits instead of stars.

```chart
type: bar
title: How many digits does it take to write the number?
unit: digits
highlight: Stars in the observable universe
data:
  - { label: Stars you can see with the naked eye, value: 4, note: "About 9,100 across the whole sky (Yale Bright Star Catalogue)" }
  - { label: People on Earth, value: 10, note: "About 8.3 billion (UN projection for 2026)" }
  - { label: Stars in the Milky Way, value: 12, note: "Somewhere between 100 billion and 400 billion" }
  - { label: Grains of sand on Earth, value: 19, note: "One estimate: roughly 7.5 × 10¹⁸, counting every beach and desert" }
  - { label: Stars in the observable universe, value: 23, note: "Roughly 7 × 10²², a 7 followed by 22 zeros (a 2003 estimate by Simon Driver's team at the Australian National University). Estimates vary, and some newer ones are lower" }
caption: "Each extra digit means ten times bigger. The last bar is nearly ten thousand times the one above it."
source: "[Sky & Telescope](https://skyandtelescope.org/astronomy-resources/how-many-stars-night-sky-09172014/); [UN World Population Prospects 2024](https://population.un.org/wpp/); [Space.com](https://www.space.com/25959-how-many-stars-are-in-the-milky-way.html); [NPR](https://www.npr.org/sections/krulwich/2012/09/17/161096233/which-is-greater-the-number-of-sand-grains-on-earth-or-stars-in-the-sky) (sand, and the 2003 star estimate)"
```

## Sand or stars?

There's an old line that there are more stars in the sky than grains of sand on all the world's beaches.[^npr] Before reading on, what do you think?

```chart
type: meter
question: Which is the bigger number?
quiz: true
labels: [Grains of sand on Earth, Stars in the universe]
mine: 100
why: "Stars win, comfortably: about 7 × 10²² stars against about 7.5 × 10¹⁸ grains of sand. That's roughly 9,000 stars for every grain."
source: "[NPR](https://www.npr.org/sections/krulwich/2012/09/17/161096233/which-is-greater-the-number-of-sand-grains-on-earth-or-stars-in-the-sky), citing a University of Hawaii estimate and Simon Driver's 2003 star count"
```

Here's one more way to hold a number that size. Science writer David Blatner points out that ten drops of water contain about as many molecules as there are stars in the observable universe.[^npr]

> Every star in every galaxy we can see, and ten drops of water from your glass, come out to roughly the same number.

## Most stars are ones you'll never see

You might picture a typical star as something like the Sun. It isn't. Most stars near us are **red dwarfs**: small, cool and far too faint to see with the naked eye, even when they're close.[^mamajek] Our Sun is a G-type star: brighter and heavier than about nine in ten of its neighbours, in a sky dominated by small ones.

```chart
type: donut
title: What kinds of stars live near us?
unit: "%"
center: "3 in 4"
data:
  Red dwarfs (M): 76.5
  Orange dwarfs (K): 13.6
  Sun-like stars (G): 6.2
  Yellow-white stars (F): 3.0
  Hot, bright stars (A, B and O): 0.7
caption: "Share of main-sequence stars in the solar neighbourhood, calculated from published star densities. The middle shows the red dwarfs: about 3 in every 4 stars."
source: "Eric Mamajek, [Fraction of stars by spectral type in the solar vicinity](https://figshare.com/articles/figure/Fraction_of_Stars_by_Spectral_Type_in_the_Solar_Vicinity/3206527)"
```

## The stars we're losing

Here's the twist. Even as we learn how many stars exist, we can see fewer of them. In 2023, a study built on more than 51,000 sightings by citizen scientists found that the night sky was getting brighter by **about 9.6% a year**, because of artificial light.[^kyba]

The researchers put it this way: a child born where 250 stars are visible would see only about 100 by their eighteenth birthday.[^eos] You can see the first few years below. **Draw how you think the rest goes.**

```chart
type: guess
title: Stars visible from one place, as a child grows up
prompt: At birth, 250 stars are visible. Sketch how many are left by age 18.
unit: stars
x: [Birth, Age 3, Age 6, Age 9, Age 12, Age 15, Age 18]
values: [250, 215, 184, 158, 136, 116, 100]
reveal_from: 3
min: 0
max: 300
caption: "An illustration, not measurements: sky brightening of ~9.6% per year turns 250 visible stars into about 100 over 18 years."
source: "Kyba et al., Science (2023), as reported by [Eos](https://eos.org/articles/starry-nights-are-disappearing) and [Scientific American](https://www.scientificamerican.com/article/light-pollution-is-dimming-our-view-of-the-sky-and-its-getting-worse/)"
```

So the universe holds something like seventy sextillion stars,[^npr][^bigthink] and the number you can see from your doorstep is shrinking every year. Next clear night, go and count yours.

[^skytel]: Bob King, [“Ten thousand stars bedazzle the eye on a dark night. Wait, how many stars in the sky?”](https://skyandtelescope.org/astronomy-resources/how-many-stars-night-sky-09172014/), *Sky & Telescope*. 9,096 stars to magnitude 6.5, from the Yale Bright Star Catalogue.
[^lovenight]: Love the Night Sky, [“How many stars can I see?”](https://lovethenightsky.com/how-many-stars-can-i-see/)
[^npr]: Robert Krulwich, [“Which Is Greater, The Number Of Sand Grains On Earth Or Stars In The Sky?”](https://www.npr.org/sections/krulwich/2012/09/17/161096233/which-is-greater-the-number-of-sand-grains-on-earth-or-stars-in-the-sky), NPR, 2012. Covers the University of Hawaii sand estimate, the 2003 star estimate by Simon Driver's team at the Australian National University, and David Blatner's water-drop comparison from his book *Spectrums*.
[^bigthink]: Ethan Siegel, [“We've overestimated the number of stars in the Universe”](https://bigthink.com/starts-with-a-bang/overestimated-stars-in-universe/), *Big Think*. Argues that simple “galaxies × stars per galaxy” estimates overcount.
[^mamajek]: Eric Mamajek, [“Fraction of stars by spectral type in the solar vicinity”](https://figshare.com/articles/figure/Fraction_of_Stars_by_Spectral_Type_in_the_Solar_Vicinity/3206527), figshare, and his [star-density notes](https://www.pas.rochester.edu/~emamajek/memo_star_dens.html). Shares in the chart are calculated from these densities.
[^kyba]: Christopher Kyba et al., “Citizen scientists report global rapid reductions in the visibility of stars from 2011 to 2022”, [*Science* 379, 2023](https://doi.org/10.1126/science.abq7781). Based on 51,351 Globe at Night observations.
[^eos]: [“Starry nights are disappearing”](https://eos.org/articles/starry-nights-are-disappearing), *Eos*, 2023, quoting the study's authors.
