# Feature: On-device memory

**Status:** Done (rebuilt for the Vite app)
**Sprint:** [Sprint 2](../sprints/sprint-02.md)

## What it does

The app remembers a little on the device, with no account:

- **Recent dishes** (last 10): the engine avoids the last 5 across visits.
- **Accepted dishes** (last 30): the share card can use the latest.
- **Daily limits:** see [daily-limits.md](daily-limits.md).

Quiz answers (gender, age, mood, budget, restrictions) are kept for the **current visit only** (`sessionStorage`).

**"🧹 আমার ইতিহাস মুছুন"** on the landing page clears recent and accepted dishes and the current answers. Daily limits stay.

## How it works

- `state/store.ts`: session state goes to `ki-khabo:session:v1` (sessionStorage); device state to `ki-khabo:device:v1` (localStorage).
- `lib/storage.ts` wraps every read and write in `try/catch`. If storage is blocked, the app works for the visit without saving.
- Nothing is sent to any server.

## Acceptance criteria

- [x] Clear history empties history but keeps limits (browser test)
- [x] The app works with both storages blocked (browser test)

## Changelog

- 2026-10-31: created for the Next.js version
- 2026-10-31: rebuilt for the Vite app (history + limits; answers per visit)
