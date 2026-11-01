# Feature: Live counters

**Status:** Done (shows once the Redis database is connected in Vercel)
**Sprint:** [Sprint 3](../sprints/sprint-03.md)

## What it does

Top right of every screen, above "রেজিস্ট্রেশন লাগবে না":

> 🔴 👀 আজ ১,২০৪ জন এসেছে
> 😋 ৪৫৭ জন খাবার ঠিক করেছে

- **Visits:** devices that opened the app today (each counted once a day).
- **Chose food:** devices that tapped "এইটাই খাবো" at least once today.
- "Today" is the Bangladesh date for everyone. Bengali digits with lakh grouping (১২,৩৪,৫৬৭).
- Refreshes when you come back to the tab (at most once a minute) and right after choosing a dish.
- Hidden until numbers load, and whenever the API isn't reachable.

## Why

Social proof ("other people are using this right now") helps sharing, as long as the numbers are real.

## How it works

- **Server:** `api/stats.ts` → `api/_lib/stats-core.ts`. `GET` returns `{ day, visits, chosen }`; `POST {"event":"visit"|"chosen"}` adds one and returns the same. All commands for a request go in one round trip. Two stores are supported (see [0006](../decisions/0006-live-counters.md)):
  - **Upstash** over HTTPS: `KV_REST_API_URL`/`KV_REST_API_TOKEN` or `UPSTASH_REDIS_REST_*` (`upstashRunner`)
  - **Redis Cloud** or any Redis: `REDIS_URL`, via the `redis` package (`api/_lib/redis-runner.ts`, connection reused while the function is warm)
- **Client:** `src/state/live-stats.ts` sends each event once per device per Dhaka day. It marks the event in `localStorage` (`ki-khabo:stats:v1`) only after the server has it, so a failed call retries next time, and in-flight guards stop double counts. `src/components/LiveStatsBadge.tsx` shows the numbers.
- **Routing:** `vercel.json` skips `/api/` in the SPA rewrite; the service worker never serves `/api/` from cache.

## Setup (one time, in Vercel)

1. Vercel → **Storage** → open the Redis database (`redis-fuchsia-paddle`) → **Connect Project** → **ki-khabo**, all environments. This adds `REDIS_URL`. (An Upstash database works too and adds `KV_REST_API_*`.)
2. Project → **Settings → Functions → Function Region** → **Mumbai (bom1)**, next to the database.
3. Redeploy. The badge appears after the first visit.

## Acceptance criteria

- [x] API counts per Dhaka day, rejects bad events, says when not set up or down (unit tests with a fake Upstash)
- [x] Same on a real Redis over `REDIS_URL` (`REDIS_TEST_URL=redis://… npm test`, checked with Redis 7 in Docker)
- [x] Visit counted once per device per day; choosing counted once; nothing personal sent; badge in the top right; hidden without the API; 320px fits (browser test with a mocked API)
- [ ] Check on the real Vercel deploy with Upstash connected

## Changelog

- 2026-11-01: created
- 2026-11-01: `REDIS_URL` support for the Redis Cloud database
