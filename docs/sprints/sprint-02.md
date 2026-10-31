# Sprint 2: কি খাবো? MVP (Vite rebuild)

**Dates:** 2026-10-31 → TBD
**Status:** In progress (deploy and desktop layout left)

## Goal

Build the কি খাবো? MVP from the [brief](../brief.md), [prototype](../ajke_ki_khabo_interactive_prototype.html) and [design system](../ajke_ki_khabo_design_system.html) as an installable web app on free Vercel.

## Planned tasks

- [x] Write the product brief and settle open decisions (gender/age, limits, battle poll, contrast, no Spring Boot)
- [x] Scaffold Vite + React + TypeScript + Tailwind v4, with design tokens in `@theme`
- [x] Data: 47 dishes, moods by gender, options, battle pairs
- [x] [Recommendation engine](../features/recommendation-engine.md) with unit tests
- [x] Components: Button, OptionCard, Chip, ProgressBar, Sticker, Mascot, FoodCard, Confetti
- [x] Screens: landing, 5 quiz steps, loading, result, roulette, battle, share card, 404
- [x] [Daily limits](../features/daily-limits.md) (3 suggestions, 3 spins, final decision + roast)
- [x] [Share card](../features/share-card.md) PNG export + share sheet + WhatsApp/Facebook
- [x] [Installable app](../features/installable-app.md) (PWA, icons)
- [x] Accessibility: Lighthouse 100, axe-core clean on every screen, 48px targets
- [x] Commit and push to `origin/main` (commits `ad2fc8a`, `9c0642a`)
- [ ] First Vercel deploy
- [ ] Check on real phones (Android Chrome, iPhone Safari)

## Added mid-sprint

- [x] Lazy-load screens and use `LazyMotion` (main bundle 146 → 105 kB gzipped)
- [x] Remove the screen exit animation (the old screen stayed clickable while fading)
- [x] Layout check at 5 screen sizes: phones and tablet good; desktop works but needs optimizing
- [ ] Desktop layout improvements (see [next-steps.md](../next-steps.md))

## Outcome

Built and verified locally:

- **Tests:** 47 unit tests pass; the headless-browser run passes 41 of 42 checks (the one failure is a flaw in the test itself).
- **Lighthouse (mobile):** accessibility 100, best practices 100, SEO 100, performance 84–92.
- **Pushed** to GitHub on `main`.
- **Not done yet:** Vercel deploy, a check on real phones, and the desktop layout.

## Retro

- **Went well:** settling decisions before coding; the pure engine made the allergy rules easy to test. The data test caught a dish wrongly marked veg.
- **Didn't go well:** the stack changed after the first build (Next.js → Vite), and that version was never committed.
- **Change next sprint:** commit early (on a branch for bigger changes) so earlier work is never lost.
