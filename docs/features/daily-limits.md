# Feature: Daily limits (3 chances)

**Status:** Done
**Sprint:** [Sprint 2](../sprints/sprint-02.md)

## What it does

Part of the joke: stop overthinking and decide.

- **Suggestions:** 3 dishes per day. The first result counts.
- **Food wheel:** 3 spins per day, counted separately.
- A chip shows chances left ("আজ আর ২ বার সুযোগ", "আজ আর ২টা স্পিন বাকি").
- After the 3rd suggestion, that dish is today's **final decision**. Restarting the quiz shows the same dish until midnight.
- **Safety exception:** if the user then adds an allergy or diet the final dish breaks, they get a safe dish, still final, without using a chance.
- Opening a wheel result's details doesn't use a suggestion.
- Limits reset at **local midnight**. They're also checked when the app regains focus, in case it stayed open overnight.

## How it works

- `lib/quota.ts` (pure): `dayKey`, `rollover`, `remaining`, `consume`, `parseQuota`.
- State is saved in `localStorage` under `ki-khabo:device:v1`.
- "আমার ইতিহাস মুছুন" (clear my history) clears history but keeps the limits, so it isn't a way around them.

## Acceptance criteria

- [x] 3 suggestions, then final (browser test)
- [x] 3 spins, then the spin button is disabled, also after reopening (browser test)
- [x] The final dish survives a quiz restart
- [x] An unsafe final dish is swapped without using a chance
- [x] A new day restores chances (unit + browser test)

## Limitations

Limits are per device and browser; clearing site data resets them. That's fine for a fun limit.

## Changelog

- 2026-10-31: built
