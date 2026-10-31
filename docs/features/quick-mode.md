# Feature: Quick mode (ঝটপট মোড)

**Status:** Done
**Sprint:** [Sprint 3](../sprints/sprint-03.md)

## What it does

For returning users, the landing page shows **"⚡ আগের মতোই, শুধু Mood বলি"**. `/quick` shows the saved budget, diet, categories and restrictions as chips, plus every mood. **One tap on a mood goes straight to the result.** Meal time comes from the clock. Gender and age are skipped, since the engine never uses them.

## How it works

- After a full quiz suggestion, the store saves `prefs = { budget, diet, categories, avoid }` in device state (`ki-khabo:device:v1`).
- `quickStart(mood)` sets those answers plus mood and meal; `Loading` now checks `isReady` (mood, meal, budget) instead of all 5 steps.
- "🧹 আমার ইতিহাস মুছুন" also clears the saved preferences.
- Gender, age and mood are still never stored beyond the visit.

## Acceptance criteria

- [x] No quick button on a first visit; shown after a quiz; one tap to a result (browser test)

## Changelog

- 2026-10-31: created
