# 0006: Live counters with a Vercel Function and Redis

**Date:** 2026-11-01
**Status:** Accepted (changes part of [0005](0005-no-backend.md))

## Context

The product owner wants visit and food-chosen counts in the top right of every screen. First they were per day; on 2026-11-02 they changed to **all-time totals**. A per-device count isn't a total, so something on a server has to count.

## Options considered

1. **Vercel Function + Upstash Redis** (Vercel Marketplace): the backend [0005](0005-no-backend.md) already named as first choice. Free plan: 256 MB and 500,000 commands a month, no credit card.
2. **Public third-party counter API:** no setup, but a service we don't control, anyone can inflate it, and visitor IPs go to a third party.
3. **This device only:** free and private, but not a total.

## Decision

**Option 1.** One function, `api/stats.ts`, keeps two all-time counters in Redis (`ki-khabo:stats:total:visits` and `…:chosen`, no expiry).

- Each device sends `visit` once per Bangladesh day, and `chosen` once per dish it accepts. Only the event name is sent: no mood, answers, dish or id. The server stores no IPs.
- It works with either Marketplace Redis:
  - **Upstash for Redis** (`KV_REST_API_*` variables): over HTTPS with `fetch`. Preferred: 256 MB free, data is kept.
  - **Redis / Redis Cloud** (`REDIS_URL`): over a normal connection with the `redis` npm package. Free plan: 30 MB, RAM only, 100 ops/sec.
  If both are set, Upstash is used.
- **Update 2026-11-01:** the project's database was the Redis Cloud one (`redis-fuchsia-paddle`, Mumbai), so `REDIS_URL` support was added.
- **Update 2026-11-02:** all-time totals must survive restarts, so the project moves to **Upstash** (data kept on disk). `REDIS_URL` support stays as a fallback.
- If the function or Redis isn't available, the badge is hidden and the app works as before.

## Consequences

- The app is no longer 100% static: one tiny function. Catalog data and user state stay as in 0005.
- Upstash free plan (500,000 commands a month): a counted visit is 2 commands, a plain read 1, so roughly 5,000+ visits a day fit.
- Without a credit card neither provider charges; at a limit the counter just stops updating and the badge hides.
- Redis Cloud's free plan is RAM only: a restart would reset the all-time totals to zero. That's why Upstash is the database to use.
- Numbers can be inflated by someone calling the API directly. Fine for a fun counter; add rate limiting if it matters later.
- Vercel's free Hobby plan is for non-commercial use. A commercial launch needs Pro.
- Locally (`npm run dev` / `preview`) there's no function, so the badge stays hidden; use `vercel dev` to try it.
