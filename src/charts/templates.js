// Starter specs for the Chart Lab. Each is exactly what you'd paste inside a ```chart block.
export const TEMPLATES = {
  bar: {
    blurb: 'Compare amounts. Add a `note` to show on hover, and `highlight` to pick out one bar.',
    yaml: `type: bar
title: How wide is each planet?
unit: km
sort: desc
highlight: Earth
data:
  - { label: Jupiter, value: 142984, note: "Wide enough to line up 11 Earths" }
  - { label: Saturn, value: 120536 }
  - { label: Uranus, value: 51118 }
  - { label: Neptune, value: 49528 }
  - { label: Earth, value: 12756, note: "You are here" }
  - { label: Venus, value: 12104 }
  - { label: Mars, value: 6792 }
  - { label: Mercury, value: 4879 }
caption: "Equatorial diameter. Source: NASA Planetary Fact Sheet."
`,
  },
  line: {
    blurb: 'Change over time. Add `annotations` to mark the moments that matter.',
    yaml: `type: line
title: Carbon dioxide in the air above Mauna Loa
unit: ppm
x: ["1960", "1970", "1980", "1990", "2000", "2010", "2020"]
series:
  CO₂: [316.9, 325.7, 338.8, 354.5, 369.7, 389.9, 414.2]
annotations:
  - { at: "1990", text: "Passes 350" }
caption: "Annual mean concentration. Source: NOAA Global Monitoring Laboratory."
`,
  },
  donut: {
    blurb: 'Parts of a whole. Hover a slice or the legend. Anything past 7 slices folds into "Other".',
    yaml: `type: donut
title: What is the air made of?
unit: "%"
data:
  Nitrogen: 78.08
  Oxygen: 20.95
  Argon: 0.93
  Everything else: 0.04
caption: "Dry air, by volume."
`,
  },
  meter: {
    blurb: 'Ask readers a question. They answer on a slider, then see how close they are to you.',
    yaml: `type: meter
question: Should Pluto be a planet again?
labels: [Dwarf planet is fine, Bring it back]
mine: 35
why: The rules make sense, but it'll always be the ninth planet in my head.
`,
  },
  quadrant: {
    blurb: 'A 2×2 for placing things on two scales. Points go from -10 to 10 on each axis. Readers can drag them.',
    yaml: `type: quadrant
title: Ways to see the night sky
x: [Low effort, High effort]
y: [Nice, Jaw-dropping]
points:
  Look up from the garden: [-9, -4]
  Watch a meteor shower: [-3, 5]
  Visit a planetarium: [1, 2]
  Drive to a dark-sky park: [5, 8]
  Buy a telescope: [7, 4]
  Photograph the Milky Way: [9, 9]
`,
  },
  guess: {
    blurb: 'Readers sketch how they think the line continues, then reveal the real data and get a score.',
    yaml: `type: guess
title: How many people live on Earth?
prompt: You can see 1950 to 1980. Draw your guess up to 2020.
unit: bn
x: ["1950", "1960", "1970", "1980", "1990", "2000", "2010", "2020"]
values: [2.49, 3.02, 3.69, 4.44, 5.31, 6.15, 6.99, 7.86]
reveal_from: 4
min: 0
max: 10
caption: "Source: UN World Population Prospects."
`,
  },
  tier: {
    blurb: 'A ranking readers can rearrange (drag, or tap then tap on phones) and compare with yours.',
    yaml: `type: tier
title: Planets, ranked by how good they look
tiers:
  S: [Saturn, Jupiter]
  A: [Earth, Neptune]
  B: [Mars, Uranus]
  C: [Venus]
  D: [Mercury]
`,
  },
};
