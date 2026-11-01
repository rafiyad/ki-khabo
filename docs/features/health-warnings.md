# Feature: Funny health warnings

**Status:** Done
**Sprint:** [Sprint 3](../sprints/sprint-03.md)

## What it does

Every dish carries a light-hearted health note, so the app is funny *and* a little bit caring:

- **"⚠️ বিধিবদ্ধ সতর্কীকরণ"**: a boxed warning in the style of the one on Bangladeshi cigarette packs, e.g. কাচ্চি: *"খাওয়ার পর ২ ঘণ্টা ঘুম অনিবার্য। বিকেলে মিটিং থাকলে বস-কে আগেই জানিয়ে রাখুন।"* Shown on the result, after a battle vote, in group verdicts, in challenge answers, and on the meme card (on by default, can be turned off).
- **"পেট-শান্তি মিটার"**: oil 🛢️, spice 🌶️ and "ভাতঘুম" 😴, each 1–3, on the result and group verdict.
- **"📢 পেটের নোটিশ"** (habit nudges), at most one per result:
  - **Late night (11pm–4am):** heavy dish → *"এতো রাতে কাচ্চি? আপনার পাকস্থলী মানবাধিকার কমিশনে অভিযোগ করবে 😅"*; light dish → praise.
  - **Streak:** the 3rd accepted dish of the same category in 7 days → *"এই সপ্তাহে হ্যাটট্রিক বিরিয়ানি! 🎩 মাঝে একদিন <light dish> দিলে…"*. The suggested dish is light, from another category, and safe for the user. Home-style food never triggers it.
- **Late night, the engine prefers lighter dishes** (heaviness < 3) while any fit.
- **After "এইটাই খাবো"** the mascot says one of several lines, including *"এক গ্লাস পানি খেয়ে নিন। এটার কোনো কোটা নাই"*.

## Why

Adds a social value (eat a bit more mindfully) without lecturing, and gives the meme card something extra to laugh about.

## How it works

- Data: `src/data/health.ts` (`HEALTH[id] = { warning, oil, spice, heavy }`), read via `getHealth(id)` in `src/data/index.ts`.
- Logic: `src/lib/nudges.ts` (`healthNudge`, `isLateNight`). Pure; time, history and randomness are passed in.
- Engine: `recommend(..., { prefer })` keeps preferred dishes while any remain (soft, like diversity). The store passes `heavy < 3` late at night.
- UI: `src/components/HealthNote.tsx` (`HealthWarning`, `HealthMeter`).

**Humor rule:** warnings joke about the food and the situation (sleep, oil, sugar, hygiene, water, bones in fish), never about bodies, weight, age, gender or money. A data test blocks common body words.

## Acceptance criteria

- [x] Every dish has a warning and 1–3 levels (data test)
- [x] Late-night and streak nudges (unit tests; late night also in the browser test)
- [x] Warning on the meme card, toggleable, card stays square (browser test)

## Open questions

- Have someone review the warnings for tone, the same way as dish prices and ingredients.

## Changelog

- 2026-10-31: created
