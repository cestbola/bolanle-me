---
title: Is AI showing up in the economic data yet?
date: 2026-11-24
description: More than half of US businesses on Ramp now pay for AI. Productivity is healthy, but the official data can't yet say how much of that is AI. A look at the Ramp AI Index next to BLS and Federal Reserve numbers.
tldr: Paid AI adoption on Ramp hit 56.8% in October 2026, up 13.3 points in a year, and it's far higher in finance and tech than in restaurants or government. Meanwhile the Fed finds no sign yet of AI cutting job postings, and BLS productivity is solid but can't be pinned on AI.
tags: [economics, ai]
mood: 🤖
spice: 2
---

Everyone has a story about how AI is changing work. The harder question is whether it has shown up in the numbers economists use to track the real economy: output, productivity, jobs and pay. To find out, you need two kinds of data. One tells you **who is using AI**. The other tells you **what happened to the economy**. Then you ask whether the two move together.

Here is what the latest data from Ramp, the Bureau of Labor Statistics (BLS) and the Federal Reserve can and can't say.

## Step one: who is paying for AI?

The **Ramp AI Index** counts the share of US businesses on the Ramp spending platform with an observed payment for an AI product or service in a given month. It's built from card, invoice and bank-transfer data covering more than 85,000 businesses, so it measures what firms actually pay for, not what they say in a survey.[^ramp] The St. Louis Fed's FRED database added 14 Ramp series in October 2026, which says something about how seriously economists now take it.[^fred]

In October 2026, **56.8%** of businesses on Ramp paid for AI. That's up 1.0 point from September and 13.3 points from a year earlier.[^ramp]

```chart
type: bar
title: Share of businesses paying for AI, by industry (October 2026)
unit: "%"
sort: desc
highlight: Information
data:
  - { label: Information, value: 80.1 }
  - { label: Finance & insurance, value: 74.3 }
  - { label: Professional & technical services, value: 70.8 }
  - { label: Utilities, value: 66.8 }
  - { label: Management of companies, value: 63.5 }
  - { label: Manufacturing, value: 62.8 }
  - { label: Mining & oil and gas, value: 57.4 }
  - { label: Educational services, value: 56.5 }
  - { label: Admin & support services, value: 56.3 }
  - { label: Wholesale trade, value: 55.3 }
  - { label: Retail trade, value: 49.9 }
  - { label: Real estate & rental, value: 49.8 }
  - { label: Transportation & warehousing, value: 47.6 }
  - { label: Construction, value: 45.0 }
  - { label: Healthcare, value: 43.7 }
  - { label: Agriculture, value: 42.9 }
  - { label: Arts & entertainment, value: 42.7 }
  - { label: Other services, value: 42.5 }
  - { label: Public administration, value: 36.4 }
  - { label: Accommodation & food, value: 35.0 }
caption: "Share of Ramp businesses in each industry with a paid AI product in the month."
source: "[Ramp AI Index](https://ramp.com/data/ai-index)"
```

The gap between industries is large. Four in five information businesses pay for AI, against about one in three hotels and restaurants. That matters later, because it means any economy-wide effect of AI is the sum of very uneven pieces.

Size matters too, but not in a straight line. Mid-sized firms lead, and the very smallest and the very largest sit lower:

```chart
type: bar
title: Share of businesses paying for AI, by company size (October 2026)
unit: "%"
sort: desc
highlight: Mid-market
data:
  - { label: Mid-market, value: 66.7 }
  - { label: SMB, value: 63.2 }
  - { label: Enterprise, value: 59.0 }
  - { label: Micro-SMB, value: 51.2 }
caption: "Ramp's size segments are assigned by its models using revenue and headcount data."
source: "[Ramp AI Index](https://ramp.com/data/ai-index)"
```

### The model race

Ramp also tracks which provider businesses pay for. In October 2026, 44.8% of businesses paid Anthropic and 40.6% paid OpenAI. Spending on actual usage (tokens) tells a stronger version of the same story: in the week ending 15 November, Anthropic took 58.7% of token spend on Ramp and OpenAI 37.2%.[^ramp]

```chart
type: bar
title: Share of US businesses paying each AI provider (October 2026)
unit: "%"
sort: desc
highlight: Anthropic
data:
  - { label: Anthropic, value: 44.8 }
  - { label: OpenAI, value: 40.6 }
  - { label: xAI, value: 6.3 }
  - { label: DeepSeek, value: 0.2 }
  - { label: Mistral AI, value: 0.2 }
caption: "A business can pay more than one provider, so these don't add up to the overall adoption rate."
source: "[Ramp AI Index](https://ramp.com/data/ai-index)"
```

### What Ramp can't tell you

Ramp's own caveats are worth reading. It likely **understates** adoption, because free tools and personal accounts used for work leave no paid transaction.[^ramp] In the other direction, Ramp's customers are a particular slice of American business, so its level shouldn't be read as the whole economy. Paying for an AI subscription also doesn't tell you whether anyone gets value from it. Treat it as a fast, high-frequency signal of *intent to adopt*, not a measure of impact.

## Step two: what happened to the economy?

The usual headline measure is **labour productivity**: output per hour worked. If AI makes workers more effective, it should eventually lift this number.

The BLS preliminary estimate for the third quarter of 2026 has nonfarm business productivity up 3.6% at an annual rate, and up 2.1% on a year earlier. The second quarter was revised up from 1.4% to 2.1%.[^bls]

```chart
type: bar
title: US nonfarm business labour productivity growth, annual average
unit: "%"
highlight: "2024"
data:
  - { label: "2023", value: 2.0 }
  - { label: "2024", value: 3.2 }
  - { label: "2025", value: 2.3 }
caption: "Annual average percent change in output per hour. Revised figures from the BLS release of 5 November 2026."
source: "[BLS Productivity and Costs](https://www.bls.gov/news.release/prod2.nr0.htm)"
```

For context, productivity has grown 2.2% a year since the end of 2019, against 1.5% a year in the previous business cycle (2007 to 2019) and 2.2% a year over the very long run since 1947.[^bls] So recent growth is better than the weak 2010s, but it is only in line with the long-run average. It is not a break from history.

This is the heart of the problem. Productivity is up, and AI adoption is up, but **a correlation between two rising lines proves very little**. Productivity also reflects the business cycle, investment, the 2020s churn in who works where, and data revisions. The BLS release doesn't mention AI at all.[^bls]

## What about jobs?

This is the question most people care about, and a Federal Reserve Board study speaks to it directly. Researchers linked industry and firm AI adoption (from the Census Bureau's survey of about 1.2 million businesses) to job postings from September 2023 to November 2025. Their conclusion, in their words: "we find no evidence of negative impacts thus far on firms' job-posting behavior." The only significant results were small and positive, which they say is "not likely a causal connection."[^fed]

Two cautions from the same note:

- It looks at **job postings**, not employment, wages or who gets hired. A firm can post fewer entry-level roles without that showing up as a big change in total postings.
- It is "explicitly backward-looking" and stops in November 2025, when the survey's AI question changed.[^fed]

One more number is worth sitting with. In the BLS data, the **labour share** of income in the nonfarm business sector was 53.0% in the third quarter of 2026, which BLS describes as the lowest in the series.[^bls] It's tempting to blame AI. But a low labour share has many possible causes, and nothing in the BLS release ties it to AI. It is a number to watch, not a conclusion.

## A proxy: follow the IT sector

If AI's effect can't be seen in the whole-economy numbers, a natural move is to look where AI is concentrated: the information and IT sectors. Ramp shows information businesses are the heaviest AI payers (80.1%, in the chart above), and Michael Cembalest of J.P. Morgan has been tracking this in his *Eye on the Market* notes.

**Productivity.** In May 2026 he noted that US productivity "has picked up since the launch of GPT in the fall of 2022 with even larger gains in the information sector and in the IT data processing subset", while adding that "it's impossible to know the precise reasons for it."[^eotm-may] His table, built from BLS data, compares the years before COVID with the years after ChatGPT:

```chart
type: bar
title: Productivity growth, before COVID vs after ChatGPT (annualised)
unit: "%"
highlight: Data processing, Q4 2022 to Q4 2025
data:
  - { label: "Non-financial corporate, Q1 2016 to Q1 2020", value: 1.1 }
  - { label: "Non-financial corporate, Q4 2022 to Q4 2025", value: 2.9 }
  - { label: "Information sector, Q1 2016 to Q1 2020", value: 5.0 }
  - { label: "Information sector, Q4 2022 to Q4 2025", value: 9.9 }
  - { label: "Data processing, Q1 2016 to Q1 2020", value: 8.0 }
  - { label: "Data processing, Q4 2022 to Q4 2025", value: 15.3 }
caption: "Real GDP method, annualised. The information sector and its data-processing subset roughly doubled their productivity growth, and the non-financial corporate total rose from 1.1% to 2.9%."
source: "[J.P. Morgan Eye on the Market, 26 May 2026](https://cdn.jpmorganfunds.com/content/dam/jpm-am-aem/global/en/insights/eye-on-the-market/home-alone-amv.pdf), using BLS data"
```

**Growth.** In October 2026 he estimated that technology's share of US real GDP growth has risen from almost zero in 2022 to about 33%.[^eotm-oct] That is a big number, but his November AI Tracker adds a limit: AI's contribution to GDP is "material but is constrained by large import content". By his estimate, 76% to 82% of AI capital spending goes on imported goods, mostly chips and computing equipment, which are 90% imported.[^eotm-tracker] Imports are subtracted from GDP, so a lot of the spending boosts other countries' output more than ours.

**Adopters versus suppliers.** The same tracker splits S&P 500 earnings into three groups: the AI supply chain (55 companies) and firms ranked by how much they use AI, using an MIT FutureTech rubric. Its verdict: the earnings windfall for AI suppliers "still dwarfs" the benefit for adopters, although signs of adopter benefits are emerging.[^eotm-tracker]

### Can we read this as "with AI versus without AI"?

Only partly, and this is where the proxy gets weaker:

- **The IT sector is both seller and buyer.** Its productivity gains could come from building AI (chips, data centres, software) or from using it. Those are different stories for the rest of the economy.
- **It was already fast.** Information-sector productivity growth was 5.0% *before* ChatGPT. Part of the 9.9% is the same trend continuing.
- **There's no clean "without".** Neither the BLS data nor the Cembalest notes give productivity with the information sector stripped out, so I can't say how much of the 2.9% is IT. A real counterfactual needs sector weights and a model of what would have happened anyway.
- **Past gains were recognised late.** Fed researchers re-estimated 1990s ICT prices and found roughly double the deflation in official statistics for software and equipment, which means real growth and productivity were understated at the time.[^eotm-may] The first reading of an IT boom may be too low, which cuts the other way.

So the IT sector is a reasonable early-warning proxy for AI, not proof of AI's effect. It tells us where to look first.

## So is AI in the data?

```chart
type: meter
title: How much of recent US productivity growth do you think is due to AI?
question: Your gut feeling, with the evidence above in mind
min: 0
max: 100
labels: ["None of it", "All of it"]
mine: 15
why: "Adoption is real and fast, but the official data can't separate AI from everything else yet. I'd guess a small share."
```

My read, with the evidence above:

1. **Adoption is real and fast.** More than half of Ramp businesses pay for AI, and the number is still climbing.
2. **The proxy points the same way, with caveats.** Productivity in information and data processing has roughly doubled since ChatGPT, and tech is about a third of GDP growth. But that sector is both AI's supplier and its heaviest user, and most of the spending is imported.
3. **The macro data is healthy but unattributed.** Productivity is decent and employment signals haven't flashed red, but nothing in the official data can credit or blame AI yet.
4. **Averages hide the action.** An 80% adoption rate in information and 35% in food service means any effect will land unevenly, and economy-wide numbers will be slow to show it.
5. **Measurement is the bottleneck.** Spending data like Ramp's is timely, but it tells us about purchases. Proving an effect needs the slower work of linking adoption to outcomes, the way the Fed note does, as more data arrives.

The honest answer is: **not clearly yet, and we don't yet have the tools to be sure.** I'll revisit this when the next BLS release and Ramp update land.

[^ramp]: [Ramp AI Index](https://ramp.com/data/ai-index), data through October 2026. Definition, sample size and caveats are on the same page.
[^fred]: [FRED Adds Data from Ramp.com](https://fred.stlouisfed.org/news/2026/10/fred-adds-data-from-ramp-com), St. Louis Fed, 5 October 2026.
[^bls]: [BLS Productivity and Costs, Third Quarter 2026 (preliminary)](https://www.bls.gov/news.release/prod2.nr0.htm), released 5 November 2026. The figures reflect the 2026 annual NIPA update.
[^fed]: Liu and Webber, [AI Adoption and Firms' Job-Posting Behavior](https://www.federalreserve.gov/econres/notes/feds-notes/ai-adoption-and-firms-job-posting-behavior-20260327.html), FEDS Notes, Federal Reserve Board, 27 March 2026.
[^eotm-may]: Michael Cembalest, [Home Alone](https://cdn.jpmorganfunds.com/content/dam/jpm-am-aem/global/en/insights/eye-on-the-market/home-alone-amv.pdf), J.P. Morgan Eye on the Market, 26 May 2026, "Act VII: the US productivity story". It cites Byrne and Corrado (2019, 2020) on ICT price revisions.
[^eotm-oct]: Michael Cembalest, [Califoreboding](https://cdn.jpmorganfunds.com/content/dam/jpm-am-aem/global/en/insights/eye-on-the-market/califoreboding-amv.pdf), J.P. Morgan Eye on the Market, 8 October 2026.
[^eotm-tracker]: Michael Cembalest, [AI Tracker](https://am.jpmorgan.com/content/dam/jpm-am-aem/global/en/insights/eye-on-the-market/ai-tracker-amv.pdf), J.P. Morgan Asset & Wealth Management, November 2026. Import shares draw on McKinsey, the Federal Reserve and Department of Commerce data, per the report.
