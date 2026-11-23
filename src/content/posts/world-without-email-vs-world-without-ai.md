---
title: A world without email vs. a world without AI
date: 2026-11-23
description: If you had to delete one from working life, which would cost us more? A thought experiment, with the data we actually have.
tldr: Losing email would hurt more tomorrow, because it's infrastructure. But the evidence that AI makes us more productive is far patchier than the hype, and AI is quietly becoming a machine for producing more email.
tags: [ai, productivity, work]
mood: 📬
spice: 3
---

In 2021 Cal Newport published *A World Without Email*.[^newport] The title was a provocation: his real target wasn't email itself but what he called the **hyperactive hive mind**, the habit of running work through a constant stream of unscheduled messages.

Five years later, there's a new candidate for "the thing that will transform how we work". So here's a thought experiment. If you had to remove one from working life for good, **email or AI**, which would cost us more?

## What email actually costs

The most-quoted estimate is old but still striking. In 2012 the McKinsey Global Institute, drawing on survey data from 2009, estimated that managers and professionals spend about 28% of their working week on email.[^mckinsey]

```chart
type: bar
title: Where a knowledge worker's week goes
unit: "%"
sort: desc
highlight: Reading and answering email
data:
  - { label: Role-specific tasks, value: 39, note: "The job you were actually hired to do" }
  - { label: Reading and answering email, value: 28 }
  - { label: Searching and gathering information, value: 19, note: "Including tracking down colleagues who can help" }
  - { label: Communicating and collaborating internally, value: 14 }
caption: "Estimates for “interaction workers”: managers and professionals, based on 2009 survey data."
source: "[McKinsey Global Institute, The Social Economy (2012)](https://www.mckinsey.com/industries/high-tech/our-insights/the-social-economy), using IDC survey data"
```

It hasn't got better. A 2025 Microsoft Work Trend Index report found the average worker receives **117 emails a day**, on top of 153 Teams messages each weekday. And 40% of people who are online at 6 a.m. are already going through their email.[^microsoft]

Yet email is also infrastructure. Radicati estimates there are around 4.7 billion email users in 2026.[^radicati] It's how you reset a password, receive an invoice, reach a stranger or leave a paper trail. Here's Radicati's estimate of how many emails are sent and received every day. Everything from 2025 on is a forecast. **Before you look, sketch where you think it's heading.**

```chart
type: guess
title: Emails sent and received worldwide per day
prompt: You can see 2023–2024. Draw your guess for 2025–2028, then reveal Radicati's forecast.
unit: bn
x: ["2023", "2024", "2025", "2026", "2027", "2028"]
values: [347.3, 361.6, 376.4, 392.5, 408.2, 424.2]
reveal_from: 2
min: 300
max: 460
caption: "Billions of emails per day. 2025 onwards are forecasts."
source: "The Radicati Group, [Email Statistics Report 2024–2028](https://radicati.com/wp/wp-content/uploads/2024/10/Email-Statistics-Report-2024-2028-Executive-Summary.pdf) and [2023–2027](https://radicati.com/wp/wp-content/uploads/2023/04/Email-Statistics-Report-2023-2027-Executive-Summary.pdf) executive summaries"
```

So a world without email isn't a world without messages. It's a world where all of that coordination has to find another route: the phone, the memo, the meeting, the shared doc. Some of it would get slower. Some of it, Newport would argue, would finally get *designed*.[^newport]

## What AI actually delivers

AI's case rests on productivity. The evidence so far is real, but it's much more uneven than the headlines suggest. Here are five well-known studies.[^noy][^dellacqua][^brynjolfsson][^humlum][^metr] Hover over each bar to see what was measured.

```chart
type: bar
title: Five studies, five very different answers
unit: "%"
sort: desc
data:
  - { label: "Short professional writing tasks", value: 40, note: "Finished ~40% faster, quality rated ~18% higher, in short simulated tasks (Noy & Zhang, Science, 2023)", source: "[Noy & Zhang, Science (2023)](https://doi.org/10.1126/science.adh2586)" }
  - { label: "Consultants, tasks AI is good at", value: 25, note: "25% faster and 12% more tasks done, but 19 percentage points less likely to be correct on tasks outside AI's strengths (Dell'Acqua et al., 2023)", source: "[Dell'Acqua et al. (2023)](https://mitsloan.mit.edu/sites/default/files/2023-10/SSRN-id4573321.pdf)" }
  - { label: "Customer support agents", value: 14, note: "14% more issues resolved per hour, and 34% for newer, less-skilled agents (Brynjolfsson, Li & Raymond, QJE 2025)", source: "[Brynjolfsson, Li & Raymond (2025)](https://www.nber.org/papers/w31161)" }
  - { label: "Danish workers, self-reported", value: 2.8, note: "Average time saved, as reported by chatbot users, in a survey of 25,000 Danish workers. No measurable effect on earnings or hours (Humlum & Vestergaard, 2025)", source: "[Humlum & Vestergaard (2025)](https://bfi.uchicago.edu/wp-content/uploads/2025/04/BFI_WP_2025-56-3.pdf)" }
  - { label: "Experienced software developers", value: -19, note: "Took 19% longer with AI, while estimating afterwards that AI had cut their time by about 20%. METR has since said this may not reflect AI's effect today (METR, 2025)", source: "[METR (2025)](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)" }
caption: "Positive = faster or more output. The studies measure different things, so compare the direction more than the size."
```

The pattern across these studies is clear. AI gives big gains on **well-defined tasks, for less experienced people, inside the zone where the model is reliable**.[^dellacqua][^brynjolfsson] At the scale of a whole job or a whole economy, the gains shrink to a few percent.[^humlum] And in at least one careful trial, experts got slower while feeling faster.[^metr]

> The most interesting number on that chart might be the developers' own estimate: 19% slower, yet convinced AI had cut their time by 20%.

## The twist: AI runs on email

Here's what makes the comparison stranger than it looks. Much of the AI now built into workplace software is aimed squarely at *email work*: drafting replies, summarising threads, smoothing tone, triaging the inbox.

If AI makes writing a message nearly free, we shouldn't expect fewer messages. We should expect more. That's the hyperactive hive mind with a new engine. Remove email, and a lot of AI's everyday usefulness goes with it. Remove AI, and email carries on much as it did in 2021.

Not every task sits in the same place, though. Here's my rough map of where each one benefits most. **Drag anything you'd place differently.**

```chart
type: quadrant
title: Which tasks need which tool?
caption: "My own rough placement, not data. Drag the points to disagree."
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

[^newport]: Cal Newport, [*A World Without Email: Reimagining Work in an Age of Communication Overload*](https://www.penguinrandomhouse.com/books/575655/a-world-without-email-by-cal-newport/), Portfolio, 2021.
[^mckinsey]: McKinsey Global Institute, [*The social economy: Unlocking value and productivity through social technologies*](https://www.mckinsey.com/industries/high-tech/our-insights/the-social-economy), July 2012. Based on 2009 IDC survey data for “interaction workers”.
[^microsoft]: Microsoft, [*Breaking down the infinite workday*](https://www.microsoft.com/en-us/worklab/work-trend-index/breaking-down-infinite-workday), Work Trend Index special report, June 2025. Email counts are from Microsoft 365 data.
[^radicati]: The Radicati Group, [*Email Statistics Report, 2024–2028*, executive summary](https://radicati.com/wp/wp-content/uploads/2024/10/Email-Statistics-Report-2024-2028-Executive-Summary.pdf), 2024. Figures for 2025 onwards are forecasts.
[^noy]: Shakked Noy & Whitney Zhang, [“Experimental evidence on the productivity effects of generative artificial intelligence”](https://doi.org/10.1126/science.adh2586), *Science* 381, 2023. 453 professionals doing short, simulated writing tasks.
[^dellacqua]: Fabrizio Dell'Acqua et al., [“Navigating the Jagged Technological Frontier”](https://mitsloan.mit.edu/sites/default/files/2023-10/SSRN-id4573321.pdf), Harvard Business School working paper, 2023. 758 BCG consultants.
[^brynjolfsson]: Erik Brynjolfsson, Danielle Li & Lindsey Raymond, [“Generative AI at Work”](https://www.nber.org/papers/w31161), *Quarterly Journal of Economics*, 2025 (NBER working paper 2023).
[^humlum]: Anders Humlum & Emilie Vestergaard, [“Large Language Models, Small Labor Market Effects”](https://bfi.uchicago.edu/wp-content/uploads/2025/04/BFI_WP_2025-56-3.pdf), Becker Friedman Institute working paper, 2025. Time savings are self-reported by chatbot users.
[^metr]: METR, [“Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity”](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), July 2025. A randomised trial with 16 developers and 246 tasks.
