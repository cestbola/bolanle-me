// Starter specs for the Chart Lab. Each is exactly what you'd paste inside a ```chart block.
export const TEMPLATES = {
  bar: {
    blurb: 'Rank things. Add emoji & notes; hover a bar to see the note. `highlight` makes your favourite pop.',
    yaml: `type: bar
title: Snacks, ranked by how fast they disappear
unit: "/10"
sort: desc
highlight: Plantain chips
data:
  - { label: Plantain chips, value: 10, emoji: 🍌, note: "Gone before the film starts" }
  - { label: Chin chin, value: 9, emoji: 🍪 }
  - { label: Popcorn, value: 7, emoji: 🍿 }
  - { label: Rice cakes, value: 2, emoji: 🍘, note: "Why do I even buy these" }
`,
  },
  line: {
    blurb: 'Things over time. Add emoji `markers` per point and `annotations` for the plot twists.',
    yaml: `type: line
title: My energy across a typical week
unit: "%"
x: [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
series:
  Energy: [40, 55, 60, 50, 85, 95, 30]
  Motivation: [70, 60, 45, 35, 50, 20, 60]
markers: [😩, 🙂, 💪, 😐, 🎉, 🥳, 😴]
annotations:
  - { at: Fri, text: "payday ✨" }
`,
  },
  donut: {
    blurb: 'Parts of a whole. Hover a slice (or the legend). Anything past 7 slices folds into "Other".',
    yaml: `type: donut
title: Where my brain goes in the shower
unit: "%"
center: 🚿
data:
  Arguments I've already lost: 35
  Business ideas: 25
  Song lyrics (wrong): 20
  Actual hygiene: 20
`,
  },
  meter: {
    blurb: 'A hot-take meter. Readers slide to their answer, lock it in, and see how far they are from you.',
    yaml: `type: meter
title: The great debate
question: Is a hot dog a sandwich?
labels: [Absolutely not, Obviously yes]
mine: 82
why: Bread + filling = sandwich. I don't make the rules. (I do, it's my blog.)
`,
  },
  quadrant: {
    blurb: 'A 2×2 for plotting opinions. Points go from -10 to 10 on each axis. Readers can drag them around.',
    yaml: `type: quadrant
title: Every cuisine, mapped scientifically
x: [Mild, Spicy]
y: [Comfort food, Fancy]
points:
  Jollof rice: [6, -3]
  Sushi: [-5, 7]
  Mac & cheese: [-8, -8]
  Thai green curry: [7, 3]
  Ramen: [2, -5]
  Tasting menu: [-2, 9]
`,
  },
  guess: {
    blurb: 'You-draw-it! Readers sketch how they think the line continues, then reveal the real data and get scored.',
    yaml: `type: guess
title: How many books I read each year
prompt: I started reading more in 2021. Guess what happened next ✏️
unit: books
x: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"]
values: [4, 6, 14, 22, 19, 31, 27]
reveal_from: 3
`,
  },
  tier: {
    blurb: 'A tier list readers can rearrange (drag, or tap-then-tap on phones) and compare with yours.',
    yaml: `type: tier
title: Breakfast foods, definitively
tiers:
  S: [Pancakes, Akara]
  A: [Full English, Waffles]
  B: [Granola, Toast]
  C: [Cereal]
  D: [Plain oatmeal]
`,
  },
};
