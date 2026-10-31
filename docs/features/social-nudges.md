# Feature: Social nudges

**Status:** Done
**Sprint:** [Sprint 3](../sprints/sprint-03.md)

## What it does

Now and then (about half the results) the result card shows one small, warm line:

| When | Line (short) |
| --- | --- |
| Lonely, sad, heartbroken or low-energy mood | 📞 *বাসায় একটা ফোন দিন… রেসিপিও পাবেন, দোয়াও পাবেন* |
| Tea dishes | ☕ *গেটের মামা বা রিকশাওয়ালা ভাইয়ের জন্যও এক কাপ চা?* |
| Heavy dishes | 🥡 leftovers = tomorrow's breakfast; 🤝 share it |
| Any dish | 🍽️ clean-plate challenge; 👩‍🍳 thank the cook |

Street food always gets the **"🛺 লোকাল হিরো"** chip.

## How it works

`socialNudge(food, health, mood, rng)` in `src/lib/nudges.ts`, seeded from the pick so it doesn't change on re-render. Context lines are listed twice so they're more likely than the generic ones. Copy lives in `bn.social`.

## Acceptance criteria

- [x] Silent about half the time; call-home line reachable for lonely mood (unit tests)

## Open questions

- Add a verified Bangladesh mental-health helpline to the existing care note for Depressed/Anxiety. Not added yet: the number must be confirmed with the organisation first.

## Changelog

- 2026-10-31: created
