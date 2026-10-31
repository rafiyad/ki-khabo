# Current progress

_Last updated: 2026-10-31_

## Summary

The **কি খাবো?** MVP is built and verified locally: a Vite + React installable web app with the full quiz, recommendation engine, result with roast, daily limits, food wheel, food battle and share card. It is **committed and pushed** to GitHub (`rafiyad/ki-khabo`, branch `main`) but **not deployed to Vercel yet**.

## Done

- [x] Product brief with all MVP decisions ([brief.md](brief.md))
- [x] Stack: Vite + React + TypeScript + Tailwind v4 + Motion; no backend ([0004](decisions/0004-vite-react-pwa.md), [0005](decisions/0005-no-backend.md))
- [x] All MVP features: see [features/](features/README.md)
- [x] 47 dishes with prices, meals, moods, categories, veg and restricted ingredients
- [x] All Bengali copy in `src/content/bn.ts`, reviewed against the humor rule
- [x] Unit tests: 47 passing (`npm test`)
- [x] Browser test (headless, phone size): quiz, limits, final + safety exception, midnight reset, wheel, battle, share PNG, keyboard, reduced motion, blocked storage
- [x] Lighthouse (mobile): accessibility 100 · best practices 100 · SEO 100 · performance 84–92
- [x] axe-core: no violations on any screen; every tap target ≥ 48px
- [x] Layout checked at 320, 390, 768, 1366 and 1920px wide: no sideways scrolling at any size
- [x] Committed and pushed to `origin/main`
- [x] Sprint 3 (on branch `feature/funny-health-social`, not committed yet): health warnings, social nudges, friend challenge, group mode, quick mode, daily horoscope, weekly report, seasonal modes. 73 unit tests; 48/48 browser checks

## In progress

- [ ] First deploy to Vercel
- [ ] Check on real phones
- [ ] Desktop layout improvements (see known issues)
- [ ] Review and commit sprint 3; re-run axe-core and Lighthouse on the new screens

## Known issues

- **Desktop isn't optimized yet.** Phones and tablets are fine, but on laptops and desktops the app stays a 640px-wide centered column:
  - most of a 1920px screen is empty background
  - on a 1366×768 laptop, the result screen's action buttons are below the fold
- `npm audit` reports 10 moderate/low issues in **build-time** dependencies of `vite-plugin-pwa` (`workbox-build` → `ejs`/`jake`). Nothing ships to users. Re-check when the plugin updates.
- Performance on Lighthouse's simulated slow 4G is 84 on the landing page (LCP 4.0s), mostly fonts and the React/Router/Motion bundle.
- The male mood list isn't defined yet; men see all moods.
- Food prices and ingredients are typical Dhaka values, not checked with restaurants.

## Current sprint

[Sprint 2](sprints/sprint-02.md) (deploy left) · [Sprint 3](sprints/sprint-03.md) (done, not committed)
