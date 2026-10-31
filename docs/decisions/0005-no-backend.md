# 0005: No backend for the MVP (no Spring Boot)

**Date:** 2026-10-31
**Status:** Accepted

## Context

A product discussion suggested a Spring Boot + PostgreSQL + Docker + VPS stack. The product owner wants free hosting on Vercel, and every MVP feature can run in the browser.

## Options considered

1. **Spring Boot + PostgreSQL:** familiar to the team, but Vercel can't run Java, and a VPS costs money and needs maintenance.
2. **Vercel Functions (TypeScript) + Postgres from the Vercel Marketplace:** stays on Vercel, with free tiers available.
3. **No backend:** catalog data in the repo, and user state on the device.

## Decision

**No backend** for the MVP, and **no Spring Boot**.

- Food, mood and battle data live in `src/data/` as typed files, read only through `src/data/index.ts`.
- User state lives on the device: answers in `sessionStorage` (this visit only); daily limits and history in `localStorage`.
- The recommendation engine (`src/lib/recommend.ts`) is pure and data-source independent.

## Consequences

- Hosting is free, and there's no personal data on any server.
- Battle polls can't be real votes, so they show fixed numbers clearly labelled as a fun poll.
- Daily limits are per device and can be reset by clearing browser data. That's acceptable for a fun limit.
- If a backend is needed later (real votes, friend challenges, analytics), the first choice is option 2. The engine can move into a function unchanged.
