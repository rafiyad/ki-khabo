# 0004: Vite + React installable web app (replaces Next.js)

**Date:** 2026-10-31
**Status:** Accepted

## Context

The product became "কি খাবো?": an app-like, one-question-per-screen experience built from the [prototype](../ajke_ki_khabo_interactive_prototype.html) and [brief](../brief.md). Everything runs in the browser, with no server rendering or backend. The product owner asked for Vite + React and an app-first experience, hosted free on Vercel.

## Options considered

1. **Keep Next.js:** works on Vercel, but its server features go unused in a fully client-side app, and it adds framework rules (Cache Components, prerender restrictions) we don't need.
2. **Vite + React (SPA):** a fast dev server and a static build; Vercel hosts it free with one rewrite rule.
3. **Native app (React Native):** a real store app, but more work, paid iOS publishing, and no Vercel.

## Decision

- **Vite 8 + React 19 + TypeScript**, a single-page app with **React Router** (component routes).
- **Tailwind CSS v4.** Design tokens live in `src/index.css` under `@theme`, which is v4's replacement for `tailwind.config.js`.
- **Motion** (the current name of Framer Motion), loaded through `LazyMotion` to keep the bundle small. `MotionConfig reducedMotion="user"` honors prefers-reduced-motion.
- **Installable web app (PWA)** via `vite-plugin-pwa`: manifest, home-screen icon, and offline support after the first load.
- **Fonts self-hosted** with `@fontsource` (Hind Siliguri, with Noto Sans Bengali as fallback) instead of the Google Fonts link. That's faster, and `html-to-image` can embed same-origin fonts in the share PNG, which it usually can't do with Google's cross-origin stylesheet.
- **oxlint** (the Vite template default) for linting, and **Vitest** for tests.
- Every screen except the landing page is **loaded on demand**, so the first load stays small.

## Consequences

- `vercel.json` rewrites every path to `index.html` so deep links work.
- No server: daily limits, history and answers live on the device. Anything shared between users (real battle votes, leaderboards) would need a backend later; see [0005](0005-no-backend.md).
- The earlier Next.js version is not in git history. It was replaced before the first commit.
