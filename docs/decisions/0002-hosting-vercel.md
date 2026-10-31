# 0002: Host on Vercel, deploy from GitHub

**Date:** 2026-10-31
**Status:** Accepted

## Context

The site needs free, low-maintenance hosting for a static single-page app (originally Next.js, now Vite; see [0004](0004-vite-react-pwa.md)).

## Options considered

1. **Vercel**: free Hobby plan, zero-config Vite builds, automatic HTTPS, and a preview deploy for every push.
2. **Netlify / Cloudflare Pages**: also good for static sites; Vercel was already chosen and works the same.

## Decision

- **Vercel Hobby plan** (free)
- Connect the GitHub repo to Vercel through the Git integration, with no CI config of our own:
  - every push to a branch or PR gets a **preview deployment**
  - every push to `main` deploys to **production**
- Default `*.vercel.app` domain for now; a custom domain can be added later in project settings.
- `vercel.json` rewrites every path to `index.html`, so deep links in the single-page app work.
- Analytics are not added yet. The brief asks for privacy-friendly analytics with no mood data; decide before launch.

## Consequences

- Deploying is just `git push`.
- The Hobby plan is for non-commercial use. If the site starts making money, it has to move to Pro.
- Environment variables, if any are ever needed, live in Vercel project settings, not in the repo.
