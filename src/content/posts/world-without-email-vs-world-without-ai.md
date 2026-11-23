---
title: A world without email vs. a world without AI
date: 2026-11-23
description: If you had to delete one from working life, which would cost us more? A thought experiment, with the data we actually have.
tldr: Losing email would hurt more tomorrow, because it's infrastructure. But the evidence that AI makes us more productive is far patchier than the hype, and AI is quietly becoming a machine for producing more email.
tags: [ai, productivity, work]
mood: 📬
spice: 3
---

In 2021 Cal Newport published *A World Without Email*. The title was a provocation: his real target wasn't email itself but what he called the **hyperactive hive mind**, the habit of running work through a constant stream of unscheduled messages.

Five years later, there's a new candidate for "the thing that will transform how we work". So here's a thought experiment. If you had to remove one from working life for good, **email or AI**, which would cost us more?

## What email actually costs

The most-quoted estimate is old but still striking. In 2012 the McKinsey Global Institute estimated that the average knowledge worker spends more than a quarter of the week on email.

```chart
type: bar
title: Where a knowledge worker's week goes
unit: "%"
sort: desc
highlight: Reading and answering email
data:
  - { label: Role-specific work, value: 39, note: "The job you were actually hired to do" }
  - { label: Reading and answering email, value: 28 }
  - { label: Searching for information and colleagues, value: 19 }
  - { label: Communicating and collaborating internally, value: 14 }
caption: "Source: McKinsey Global Institute, The Social Economy (2012). Estimates for “interaction workers”."
```

It hasn't got better. Microsoft's 2025 Work Trend Index found the average employee receives **117 emails a day**, on top of 153 Teams messages, and that 40% of people check their inbox before 6 a.m.

Yet email is also infrastructure. More than 4.4 billion people use it. It's how you reset a password, receive an invoice, reach a stranger or leave a paper trail. Here's Radicati's count of how many emails are sent and received every day. The last three years are forecasts. **Before you look, sketch where you think it's heading.**

```chart
type: guess
title: Emails sent and received worldwide per day
prompt: You can see 2023–2025. Draw your guess for 2026–2028, then reveal Radicati's forecast.
unit: bn
x: ["2023", "2024", "2025", "2026", "2027", "2028"]
values: [347.3, 361.6, 376.4, 392.5, 408.2, 424.2]
reveal_from: 3
min: 300
max: 460
caption: "Source: Radicati Group, Email Statistics Reports 2023–2027 and 2024–2028. 2025 onwards are forecasts."
```

So a world without email isn't a world without messages. It's a world where all of that coordination has to find another route: the phone, the memo, the meeting, the shared doc. Some of it would get slower. Some of it, Newport would argue, would finally get *designed*.

## What AI actually delivers

AI's case rests on productivity. The evidence so far is real, but it's much more uneven than the headlines suggest. Hover over each bar to see what was measured.

```chart
type: bar
title: Five studies, five very different answers
unit: "%"
sort: desc
data:
  - { label: "Professional writing tasks", value: 40, note: "Finished ~40% faster, quality rated ~18% higher (Noy & Zhang, Science, 2023)" }
  - { label: "Consultants, tasks AI is good at", value: 25, note: "25% faster and 12% more tasks done, but worse on tasks outside AI's strengths (Dell'Acqua et al., 2023)" }
  - { label: "Customer support agents", value: 14, note: "14% more issues resolved per hour, biggest gains for newer agents (Brynjolfsson, Li & Raymond)" }
  - { label: "Danish workers, self-reported", value: 2.8, note: "Average share of work hours saved, across 25,000 workers (Humlum & Vestergaard, 2025)" }
  - { label: "Experienced software developers", value: -19, note: "Took 19% longer with AI, while believing it made them ~20% faster (METR, 2025)" }
caption: "Positive = faster or more output. The studies measure different things, so compare the direction more than the size."
```

The pattern is consistent across the research. AI gives big gains on **well-defined tasks, for less experienced people, inside the zone where the model is reliable**. At the scale of a whole job or a whole economy, the gains shrink to a few percent. And in at least one careful trial, experts got slower while feeling faster.

> The most interesting number on that chart might be the developers' own estimate: slower by 19%, convinced they were faster by 20%.

## The twist: AI runs on email

Here's what makes the comparison stranger than it looks. Much of the AI now built into workplace software is aimed squarely at *email work*: drafting replies, summarising threads, smoothing tone, triaging the inbox.

If AI makes writing a message nearly free, we shouldn't expect fewer messages. We should expect more. That's the hyperactive hive mind with a new engine. Remove email, and a lot of AI's everyday usefulness goes with it. Remove AI, and email carries on much as it did in 2021.

Not every task sits in the same place, though. Here's my rough map of where each one benefits most. **Drag anything you'd place differently.**

```chart
type: quadrant
title: Which tasks need which tool?
x: [Email makes it harder, Email makes it easier]
y: [AI doesn't help, AI helps a lot]
points:
  Reaching a stranger: [9, 2]
  Asking a colleague a quick question: [5, -3]
  Summarising a long thread: [-5, 8]
  Writing a first draft: [1, 7]
  Coordinating a project: [-5, 3]
  Deep, focused work: [-8, -1]
  Making a hard decision: [1, -6]
```

## So which world would I choose?

If I had to delete one tomorrow, I'd keep email. It's the plumbing, and too much of life still runs through it. But I suspect the *more productive* world is neither. It's the one Newport was describing all along: fewer unstructured messages, clearer processes, and AI pointed at the work itself rather than at producing more inbox.

Your turn.

```chart
type: meter
question: If you had to give one up for a year, which would it be?
labels: [Give up email, Give up AI]
mine: 70
why: "I'd give up AI. I'd miss it, but I can't run my life without email. Ask me again in five years."
```

---

### Sources

- Cal Newport, [*A World Without Email*](https://www.penguinrandomhouse.com/books/575655/a-world-without-email-by-cal-newport/) (Portfolio, 2021)
- McKinsey Global Institute, [*The Social Economy*](https://www.mckinsey.com/industries/high-tech/our-insights/the-social-economy) (2012)
- Microsoft, [*Breaking down the infinite workday*](https://www.microsoft.com/en-us/worklab/work-trend-index/breaking-down-infinite-workday), Work Trend Index special report (2025)
- The Radicati Group, [*Email Statistics Report, 2024–2028*](https://radicati.com/wp/wp-content/uploads/2024/10/Email-Statistics-Report-2024-2028-Executive-Summary.pdf) and the 2023–2027 edition
- Noy & Zhang, [*Experimental evidence on the productivity effects of generative AI*](https://economics.mit.edu/news/study-finds-chatgpt-boosts-worker-productivity-some-writing-tasks), Science (2023)
- Dell'Acqua et al., [*Navigating the Jagged Technological Frontier*](https://mitsloan.mit.edu/sites/default/files/2023-10/SSRN-id4573321.pdf) (2023)
- Brynjolfsson, Li & Raymond, [*Generative AI at Work*](https://www.nber.org/papers/w31161) (NBER)
- Humlum & Vestergaard, [*Large Language Models, Small Labor Market Effects*](https://bfi.uchicago.edu/wp-content/uploads/2025/04/BFI_WP_2025-56-3.pdf) (2025)
- METR, [*Measuring the impact of early-2025 AI on experienced open-source developer productivity*](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) (2025)
