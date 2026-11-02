# Sprint 3: Funny, healthy, social and viral

**Dates:** 2026-10-31 → 2026-11-01
**Status:** Done on branch `feature/funny-health-social` (features in `37d28f4`; live counters not committed yet)

## Goal

Make the app more viral and give people reasons to come back, while adding social value and health warnings in a funny way.

## Planned tasks

- [x] [Funny health warnings](../features/health-warnings.md): warning per dish, পেট-শান্তি মিটার, late-night and streak nudges, lighter food late at night
- [x] [Social nudges](../features/social-nudges.md): call home, tea for someone, leftovers, local hero
- [x] [Friend challenge](../features/friend-challenge.md): guess-my-dish link, no server
- [x] [Group mode](../features/group-mode.md): pass the phone, vetoes, verdict, one appeal
- [x] [Quick mode](../features/quick-mode.md): saved preferences, one tap on a mood
- [x] [Daily horoscope](../features/daily-horoscope.md)
- [x] [Weekly food report](../features/weekly-wrapped.md)
- [x] [Seasonal modes](../features/seasonal-modes.md): Ramadan, winter, monsoon

## Added mid-sprint

- [x] [Live counters](../features/live-stats.md): today's visits and people who chose food, via a Vercel Function + Redis (Upstash or `REDIS_URL`) ([0006](../decisions/0006-live-counters.md))
- [ ] Connect the Redis database in Vercel and check the counters on the real deploy
- [x] 70 more dishes (47 → 117): Old Dhaka and meat specials (নলি নিহারি, খাসির নলি, খাসির/গরুর পায়া, মগজ ভুনা, বিফ/খাসির চাপ, সুতি/বটি/শামি কাবাব, টিক্কা, তন্দুরি, গ্রিল), regional dishes (চুই ঝাল, মেজবানি, সাতকরা, কালাই রুটি, হাঁসের মাংস), more street food (ভেলপুরি, ঘুগনি, আলুর চপ, সমুচা, ডালপুরি, মোগলাই, চিতই, বাকরখানি, ভুট্টা পোড়া…), fish, pitha, sweets and drinks
- [x] Two new categories: 🍖 মাংসের স্পেশাল (5 existing meat dishes moved there) and 🥤 পানীয়; 7 new battle pairs; more seasonal picks (iftar, winter pitha and duck, rainy-day khichuri)
- [x] Live counters changed to all-time totals (visits per phone per day, every dish chosen); moving to Upstash so totals survive restarts
- [x] "🤷 জানি না" as the first mood option: surprise pick, its own result copy, no mood-match bar
- [x] Wheel and battle labels use two words when the first is generic ("খাসির পায়া", not "খাসির")

## Outcome

- **Tests:** 84 unit tests pass (37 new, including the stats API against a fake Upstash); typecheck, lint and build clean.
- **Browser test** (headless Chromium, 390px and 320px): 48 of 48 feature checks and 13 of 13 live-counter checks (mocked API) pass. The only console errors are the expected 404s for `/api/stats` in local preview. Covers every new screen, PNG export of the weekly and group cards, late night and Ramadan via a fake clock, and no sideways scrolling.
- **Bundle:** main chunk 105 → 108 kB gzipped (new copy on the landing page); new screens are lazy-loaded.
- **Not done:** axe-core and Lighthouse re-run on the new screens; per-dish Open Graph images; helpline number (needs verification).

## Retro

- **Went well:** the engine's new soft `prefer` option served both late-night food and group vetoes without touching the scoring.
- **Didn't go well:** the landing page is getting long on phones.
- **Change next sprint:** decide what the landing page shows first (maybe collapse the tiles) before adding more there.
