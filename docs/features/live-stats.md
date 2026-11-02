# Feature: Live counters

**Status:** Done (needs Upstash for Redis connected in Vercel)
**Sprint:** [Sprint 3](../sprints/sprint-03.md)

## What it does

Top right of every screen, above "রেজিস্ট্রেশন লাগবে না", **all-time totals**:

> 🔴 👀 মোট ১,২০৪ বার ভিজিট
> 😋 ৪৫৭ বার খাবার ঠিক হয়েছে

- **Total visits:** each phone adds 1 per Bangladesh day it opens the app, added up over all days. Reloads the same day don't add more.
- **Total dishes chosen:** every new dish someone taps "এইটাই খাবো" on adds 1. The same pick counts once, even after a reload.
- Bengali digits with lakh grouping (১২,৩৪,৫৬৭).
- Refreshes when you come back to the tab (at most once a minute) and right after choosing a dish.
- Hidden until numbers load, and whenever the API isn't reachable.

## Why

Social proof ("lots of people use this") helps sharing, as long as the numbers are real.

## How it works

- **Server:** `api/stats.ts` → `api/_lib/stats-core.ts`. Two Redis keys that never expire: `ki-khabo:stats:total:visits` and `ki-khabo:stats:total:chosen`. `GET` returns `{ visits, chosen }`; `POST {"event":"visit"|"chosen"}` adds one and returns the same, in one round trip. See [0006](../decisions/0006-live-counters.md).
  - **Upstash** over HTTPS: `KV_REST_API_URL`/`KV_REST_API_TOKEN` or `UPSTASH_REDIS_REST_*`. Preferred, and used first if set.
  - **Any Redis** over `REDIS_URL` (`api/_lib/redis-runner.ts`), as a fallback.
- **Client:** `src/state/live-stats.ts` keeps what this phone already counted in `localStorage` (`ki-khabo:stats:v1`: the Dhaka day of its last visit and the last chosen pick). A mark is saved only after the server has the event, so a failed call is retried. Only the event name is sent. `src/components/LiveStatsBadge.tsx` shows the numbers.
- **Routing:** `vercel.json` skips `/api/` in the SPA rewrite; the service worker never serves `/api/` from cache.

## Setup (one time, in Vercel)

1. **Disconnect the old database:** Storage → `redis-fuchsia-paddle` → Projects → disconnect **aj-ki-khabo**. This removes its `REDIS_URL`, so it doesn't clash with Upstash's variables. (You can delete that database afterwards.)
2. **Create Upstash:** Storage → Create Database → **Upstash for Redis** → Free plan, primary region **Mumbai (ap-south-1)** (or Singapore), no read regions, eviction off.
3. **Connect it** to **aj-ki-khabo**, all environments. This adds `KV_REST_API_URL` and `KV_REST_API_TOKEN`.
4. **Redeploy.** The totals start at 0. To carry over earlier numbers, open the database's **Data Browser / CLI** in Upstash and run `SET ki-khabo:stats:total:visits <number>` (same for `…:chosen`).

## Acceptance criteria

- [x] Totals never expire; bad events rejected; says when not set up or down (unit tests with a fake Upstash)
- [x] Same on a real Redis over `REDIS_URL` (`REDIS_TEST_URL=redis://… npm test`, checked with Redis 7 in Docker)
- [x] One visit per phone per day; every new dish counts; the same pick doesn't count twice after a reload; badge in the top right; hidden without the API; 320px fits (browser test with a mocked API)
- [ ] Check on the real deploy with Upstash connected

## Changelog

- 2026-11-01: created (today's counts, once per phone per day)
- 2026-11-01: `REDIS_URL` support for the Redis Cloud database
- 2026-11-02: changed to all-time totals (visits per phone per day, every dish chosen); recommend Upstash because the free Redis Cloud plan is RAM only
