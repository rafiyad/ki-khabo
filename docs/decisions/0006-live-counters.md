# 0006: Live counters with a Vercel Function and Redis

**Date:** 2026-11-01
**Status:** Accepted (changes part of [0005](0005-no-backend.md))

## Context

The product owner wants today's total visits, and the number of people who chose a dish, shown in the top right of every screen. A per-device count isn't a total, so something on a server has to count.

## Options considered

1. **Vercel Function + Upstash Redis** (Vercel Marketplace): the backend [0005](0005-no-backend.md) already named as first choice. Free plan: 256 MB and 500,000 commands a month, no credit card.
2. **Public third-party counter API:** no setup, but a service we don't control, anyone can inflate it, and visitor IPs go to a third party.
3. **This device only:** free and private, but not a total.

## Decision

**Option 1.** One function, `api/stats.ts`, stores two numbers per Bangladesh day in Redis (`ki-khabo:stats:<day>:visits` and `…:chosen`, expiring after 3 days).

- Each device sends `visit` once a day and `chosen` once a day (first "এইটাই খাবো"). Only the event name is sent: no mood, answers, dish or id. The server stores no IPs.
- It works with either Marketplace Redis:
  - **Upstash for Redis** (`KV_REST_API_*` variables): over HTTPS with `fetch`. Preferred: 256 MB free, data is kept.
  - **Redis / Redis Cloud** (`REDIS_URL`): over a normal connection with the `redis` npm package. Free plan: 30 MB, RAM only, 100 ops/sec.
  If both are set, Upstash is used.
- **Update 2026-11-01:** the project's database is the Redis Cloud one (`redis-fuchsia-paddle`, Mumbai), so `REDIS_URL` support was added.
- If the function or Redis isn't available, the badge is hidden and the app works as before.

## Consequences

- The app is no longer 100% static: one tiny function. Catalog data and user state stay as in 0005.
- Upstash free plan: about 2–3 commands per visit, so roughly 4,000–5,000 visits a day. Redis Cloud free plan: up to 100 operations a second, far more than we need.
- Without a credit card neither provider charges; at a limit the counter just stops updating and the badge hides.
- Redis Cloud's free plan is RAM only: if the database restarts, today's counts start again from zero. Acceptable for daily counters.
- Numbers can be inflated by someone calling the API directly. Fine for a fun counter; add rate limiting if it matters later.
- Vercel's free Hobby plan is for non-commercial use. A commercial launch needs Pro.
- Locally (`npm run dev` / `preview`) there's no function, so the badge stays hidden; use `vercel dev` to try it.
