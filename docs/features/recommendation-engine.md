# Feature: Recommendation engine

**Status:** Done
**Sprint:** [Sprint 2](../sprints/sprint-02.md)

## What it does

Picks one dish from the user's answers. Matches are good, but the same answers don't always give the same dish.

## How it works

`src/lib/recommend.ts` is a pure function. It takes foods, answers and a random source, and never imports data, React or browser APIs.

1. **Hard rules (never relaxed):**
   - diet (`veg` = no meat, fish or egg)
   - any ingredient in the user's restrictions
   - dishes the user rejected this visit
2. **Meal time:** keep dishes for the chosen meal, unless fewer than 3 remain.
3. **Budget:** keep dishes at or under the budget. If none, use the 3 cheapest.
4. **Diversity:** skip dishes shown this visit and the last 5 on this device, while others remain.
   **Soft preference** (optional `prefer`): keep preferred dishes while any remain. Used for lighter food late at night and for group vetoes.
5. **Score** (each part 0–100): `0.35·Mood + 0.25·Budget + 0.20·Time + 0.20·Preference`
   - Mood: the dish's weight for that mood (0 if not listed)
   - Budget: 100 within budget; otherwise scaled down (budget ÷ price)
   - Time: 100 if the meal matches (or "any"), else 0
   - Preference: 100 if no favorite categories were picked or the category matches, else 0
6. **Select:** weighted random among the top 5 (weight = score + 1).

`emergencyPick` (the "আমি আর অপেক্ষা করতে পারছি না!" button) picks any safe dish up to ৳100.

**Never inputs:** gender, age.

## Acceptance criteria

All covered by `src/lib/recommend.test.ts` and `src/data/data.test.ts`:

- [x] Allergy and diet rules hold across 400 random answer sets on the real data
- [x] Rejected dishes never return
- [x] Meal and budget fallbacks behave as described
- [x] The scoring formula matches the brief
- [x] Picks come only from the top 5, favor higher scores, and vary for the same inputs
- [x] Gender and age don't change the result
- [x] Every mood has at least 3 dishes with weight ≥ 60

## Changelog

- 2026-10-31: built
