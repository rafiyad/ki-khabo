# Feature: Weekly food report

**Status:** Done
**Sprint:** [Sprint 3](../sprints/sprint-03.md)

## What it does

`/wrapped` turns the last 7 days of "এইটাই খাবো" into a shareable square card:

- a title from the top category (*"🏅 বিরিয়ানি-বিশেষজ্ঞ"*, *"🛺 স্ট্রিট-ফুড সম্রাট"*, …)
- favourite dish, number of decisions, active days
- **তেল-মিটার** (average oil: 🟢 / 🟡 *"ডাক্তার আঙ্কেল এখনো খুশি"* / 🔴) and a sweets count

Empty state when there's nothing this week. The PNG is shared like the meme card.

## How it works

`src/lib/wrapped.ts` → `weeklyWrap(accepted, now, getFood, getHealth)`, from on-device history only (last 30 accepted dishes).

## Acceptance criteria

- [x] Empty, old history ignored, counts/top/oil band (unit tests)
- [x] Card and PNG export (browser test)

## Changelog

- 2026-10-31: created
