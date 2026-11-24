---
title: When the planets shine brightest, 2026 to 2036
date: 2026-11-23
description: A ten-year calendar of the nights when Venus, Mars, Jupiter and Saturn are at their brightest, and why 2033 and 2035 are the years for Mars.
tldr: Venus is the brightest of all and peaks again on 27 November 2026. Mars has a quiet start in 2027 but comes spectacularly close in 2033 and 2035. Jupiter is at its best around 2034, and Saturn's rings open widest around 2031–32.
tags: [space, science]
mood: 🪐
spice: 1
---

Some nights, a "star" outshines everything else in the sky and doesn't twinkle. That's usually a planet, and each one has its own best nights. Here's when they fall over the next ten years.

Two ideas explain almost everything below:

- **Opposition** is when Earth passes between the Sun and an outer planet such as Mars, Jupiter or Saturn. The planet rises at sunset, stays up all night and is about as close and bright as it gets that year.
- **Greatest brightness** for Venus happens a few weeks before or after it swings between us and the Sun, when it's a fat crescent and close to Earth.

Astronomers measure brightness in **magnitudes**, where *lower* numbers mean brighter. That's confusing, so the charts here use something simpler: how many times brighter each planet looks than **Vega**, one of the brightest stars in the night sky.[^vega] All dates and figures were calculated with the open-source Astronomy Engine library[^engine] and checked against published almanacs.

## See it from above

Here's the solar system from above, with the real positions of the planets from now to 2036. Press play, drag the slider, or jump to one of the big moments. Pick a planet to watch and the dashed line shows the view from Earth. When Earth swings between the Sun and an outer planet, the line lights up: that's an opposition.

```chart
type: orbit
title: The planets, from above
start: 2026-11-24
end: 2036-12-31
planets: [Mercury, Venus, Earth, Mars, Jupiter, Saturn]
focus: Mars
events:
  - { date: 2026-11-27, label: Venus at its brightest, planet: Venus }
  - { date: 2027-02-19, label: Mars opposition, planet: Mars }
  - { date: 2031-12-11, label: Saturn rings widest, planet: Saturn }
  - { date: 2033-06-28, label: Mars opposition, planet: Mars }
  - { date: 2034-10-02, label: Jupiter at its best, planet: Jupiter }
  - { date: 2035-09-15, label: Mars very close, planet: Mars }
caption: "Distances from the Sun are squeezed (square-rooted) so Mercury and Saturn fit on one screen, so the gaps between orbits are not to scale. Positions are accurate to a fraction of a degree."
source: "Orbits from [JPL approximate positions](https://ssd.jpl.nasa.gov/planets/approx_pos.html)"
```

## How bright does each planet get?

```chart
type: bar
title: Brightest each planet gets, 2026–2036
unit: "× Vega"
sort: desc
highlight: Venus
data:
  - { label: Venus, value: 92, note: "Magnitude −4.9 at its peak on 5 December 2029. Bright enough to cast faint shadows" }
  - { label: Jupiter, value: 15.4, note: "Magnitude −2.9 at opposition on 2 October 2034" }
  - { label: Mars, value: 14.1, note: "Magnitude −2.8 at opposition on 15 September 2035" }
  - { label: Saturn, value: 1.8, note: "Magnitude −0.6 at opposition in December 2031 and December 2032" }
caption: "Peak brightness over the decade, as a multiple of Vega's brightness."
source: "Calculated with [Astronomy Engine](https://github.com/cosinekitty/astronomy)"
```

## Venus: the brightest of all

Venus is so bright that people regularly mistake it for an aircraft's landing lights. Its next peak is on **27 November 2026**, before sunrise.[^inthesky] After that it repeats a roughly 19-month cycle, with one peak in the evening sky (after sunset, in the west) and another in the morning sky (before dawn, in the east), usually about ten weeks apart.

## Mars: a quiet start, then a spectacular finish

Mars is the most dramatic. Its distance at opposition varies enormously, because its orbit is quite stretched. The February 2027 opposition is a distant one, but each opposition after that gets closer, until Mars comes within about 57 million km in September 2035.[^seds]

```chart
type: bar
title: How close Mars comes at each opposition
unit: million km
highlight: September 2035
data:
  - { label: February 2027, value: 101.4, note: "Opposition 19 February. Magnitude −1.2, about 3 × Vega" }
  - { label: March 2029, value: 96.8, note: "Opposition 25 March. Magnitude −1.3, about 3.5 × Vega" }
  - { label: May 2031, value: 82.8, note: "Opposition 4 May. Magnitude −1.8, about 5 × Vega" }
  - { label: July 2033, value: 63.3, note: "Opposition 28 June (UTC). Magnitude −2.5, about 10 × Vega" }
  - { label: September 2035, value: 56.9, note: "Opposition 15 September. Magnitude −2.8, about 14 × Vega" }
caption: "Shortest Earth–Mars distance during each opposition season. Closest approach can fall a few days before or after opposition."
source: "Calculated with [Astronomy Engine](https://github.com/cosinekitty/astronomy); matches the [SEDS table of Mars oppositions](https://spider.seds.org/spider/Mars/marsopps.html)"
```

In 2033 and 2035 Mars reaches opposition near the closest point of its orbit to the Sun. Astronomers call these **perihelic oppositions**, and they're the best views of Mars in years.[^seds] By 2035, Mars will look about four and a half times brighter than it does in 2027.

Watch Earth catch up with Mars. Because Earth moves faster on its inner track, it overtakes Mars about every 26 months, and each overtaking is an opposition:

```chart
type: orbit
title: Earth overtakes Mars
start: 2033-01-01
end: 2035-12-31
planets: [Earth, Mars]
focus: Mars
speed: 20
events:
  - { date: 2033-06-28, label: Opposition, planet: Mars }
  - { date: 2035-09-15, label: Closest in a decade, planet: Mars }
caption: "Oppositions in 2033 and 2035. The 2035 one is closer because Mars is nearer the Sun, and so nearer Earth, at that point in its orbit."
source: "Orbits from [JPL approximate positions](https://ssd.jpl.nasa.gov/planets/approx_pos.html)"
```

```chart
type: meter
title: Quick quiz
question: At its closest in September 2035, how far away will Mars be, in millions of kilometres?
quiz: true
min: 0
max: 200
labels: ["0", "200 million km"]
mine: 57
why: "About 57 million km, on 11 September 2035. That's roughly 150 times the distance to the Moon, and among the closest approaches of this century."
source: "Calculated with [Astronomy Engine](https://github.com/cosinekitty/astronomy); [SEDS](https://spider.seds.org/spider/Mars/marsopps.html)"
```

## Jupiter: brighter every year until 2034

Jupiter reaches opposition about once every 13 months, so it's well placed at some point almost every year. It also slowly gets closer at opposition through the early 2030s, peaking in 2034.[^earthsky]

```chart
type: bar
title: Jupiter at each opposition
unit: "× Vega"
vertical: true
highlight: "2034"
data:
  - { label: "2027", value: 10.9, note: "11 February, in Leo. Magnitude −2.6" }
  - { label: "2028", value: 10.2, note: "12 March, in Leo. Magnitude −2.5" }
  - { label: "2029", value: 10.0, note: "12 April, in Virgo. Magnitude −2.5" }
  - { label: "2030", value: 10.6, note: "13 May, in Libra. Magnitude −2.5" }
  - { label: "2031", value: 11.7, note: "15 June, in Ophiuchus. Magnitude −2.6" }
  - { label: "2032", value: 13.2, note: "19 July, in Sagittarius. Magnitude −2.8" }
  - { label: "2033", value: 14.7, note: "25 August, in Aquarius. Magnitude −2.9" }
  - { label: "2034", value: 15.4, note: "2 October, in Cetus. Magnitude −2.9" }
  - { label: "2035", value: 14.9, note: "8 November, in Aries. Magnitude −2.9" }
  - { label: "2036", value: 13.6, note: "12 December, in Taurus. Magnitude −2.8" }
caption: "Brightness at opposition, as a multiple of Vega's brightness."
source: "Calculated with [Astronomy Engine](https://github.com/cosinekitty/astronomy); 2027 date matches [EarthSky](https://earthsky.org/astronomy-essentials/jupiter-at-opposition-closest-brightest-best/)"
```

## Saturn: watch the rings open

Saturn's brightness depends less on its distance than on its **rings**. They were edge-on to us in 2025, nearly invisible in small telescopes. Over the next few years they tilt open again, reflecting more sunlight. That makes Saturn noticeably brighter, until the rings are widest open in 2031–32.[^sterngucker]

```chart
type: line
title: How open Saturn's rings look at each opposition
unit: "°"
x: ["Oct 2027", "Oct 2028", "Nov 2029", "Nov 2030", "Dec 2031", "Dec 2032", "Jan 2034", "Jan 2035", "Feb 2036"]
series:
  Ring tilt: [12.9, 17.9, 22.0, 25.0, 26.5, 26.2, 24.3, 20.9, 16.3]
min: 0
max: 30
area: true
annotations:
  - { at: "Dec 2031", text: "Widest open" }
caption: "The rings' tilt towards Earth, in degrees. As they open, Saturn brightens from about 1.1 to 1.8 times Vega's brightness."
source: "Calculated with [Astronomy Engine](https://github.com/cosinekitty/astronomy); matches [Sterngucker](https://www.sterngucker.de/en/planets/saturn/saturn-rings/) and the [Lyncean almanac](https://lyncean.education/almanac/oppositions/)"
```

## The calendar

Here's every peak for the four brightest planets until the end of 2036. Dates are in UTC, so where you live a date may be a day earlier or later.

| Year | Venus at its brightest | Mars at opposition | Jupiter at opposition | Saturn at opposition |
|---|---|---|---|---|
| 2026 | 27 Nov (morning) | | | |
| 2027 | | 19 Feb | 11 Feb | 18 Oct |
| 2028 | 27 Apr (evening), 5 Jul (morning) | | 12 Mar | 30 Oct |
| 2029 | 5 Dec (evening) | 25 Mar | 12 Apr | 13 Nov |
| 2030 | 7 Feb (morning) | | 13 May | 27 Nov |
| 2031 | 8 Jul (evening), 14 Sep (morning) | 4 May | 15 Jun | 11 Dec |
| 2032 | | | 19 Jul | 24 Dec |
| 2033 | 15 Feb (evening), 21 Apr (morning) | 28 Jun[^mars2033] | 25 Aug | |
| 2034 | 20 Sep (evening), 24 Nov (morning) | | 2 Oct | 8 Jan |
| 2035 | | 15 Sep | 8 Nov | 22 Jan |
| 2036 | 25 Apr (evening), 2 Jul (morning) | | 12 Dec | 5 Feb |

Calculated with Astronomy Engine[^engine] and checked against SEDS,[^seds] In-The-Sky.org[^inthesky] and the Lyncean almanac.[^lyncean]

You don't need a telescope for any of these. Find a clear night near one of these dates, look for the brightest "star" that isn't twinkling, and you've found it.

[^vega]: Vega shines at about magnitude 0. One magnitude step is a brightness ratio of about 2.5, so “× Vega” is calculated as 10^(−0.4 × (magnitude − 0.03)). See [Vega](https://en.wikipedia.org/wiki/Vega), Wikipedia.
[^engine]: Don Cross, [Astronomy Engine](https://github.com/cosinekitty/astronomy), an open-source astronomy calculation library. Oppositions were found as the moment a planet is 180° from the Sun as seen from Earth; Venus's peaks are its moments of greatest brightness.
[^seds]: SEDS, [Mars Oppositions](https://spider.seds.org/spider/Mars/marsopps.html), with opposition dates, closest-approach dates and distances.
[^inthesky]: In-The-Sky.org, Venus at greatest brightness, for example on [5 December 2029](https://in-the-sky.org/news.php?id=20291205_11_100) and [27 November 2026](https://in-the-sky.org/news.php?id=20261127_11_100).
[^earthsky]: EarthSky, [Jupiter at opposition](https://earthsky.org/astronomy-essentials/jupiter-at-opposition-closest-brightest-best/), on the 11 February 2027 opposition.
[^sterngucker]: Sterngucker, [Saturn's rings: what they are and how to see them](https://www.sterngucker.de/en/planets/saturn/saturn-rings/), with ring tilt and brightness by year.
[^lyncean]: Lyncean Group, [Planetary oppositions 2020–2040](https://lyncean.education/almanac/oppositions/).
[^mars2033]: Some tables list 27 June 2033. The opposition falls at about 01:20 UTC on 28 June, which is still 27 June in the Americas. See the [Dutch almanac entry](https://hemel.waarnemen.com/mars/opposities/marsoppositie_20330628.html).
