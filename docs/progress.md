# Current progress

_Last updated: 2026-10-31_

## Summary

The MVP is built and works locally: a fun food picker with filters, a Bangla/English toggle and on-device memory. It is **not deployed yet** and **not committed yet**.

## Done

- [x] Repository and `docs/` structure
- [x] Tech stack, hosting and data approach decided ([decisions/](decisions/))
- [x] Next.js 16.4 app scaffolded (TypeScript, Tailwind, ESLint, Node 24)
- [x] Food list: 33 foods with Bangla names and tags (`data/foods.ts`)
- [x] Picker: roll animation (skipped if the user prefers reduced motion), filters, "nothing matches" state
- [x] [On-device personal memory](features/on-device-memory.md)
- [x] Bangla / English toggle (saved in memory)
- [x] Vercel Analytics component added (only active once deployed on Vercel)
- [x] Unit tests: 14 passing (`npm test`)
- [x] `npm run lint` and `npm run build` clean; `/` builds as a fully static page

## In progress

- [ ] First commit and push to GitHub
- [ ] First deploy to Vercel

## Known issues

- Saved filters and language show defaults for a split second after the page loads (see the hydration trade-off in [on-device-memory.md](features/on-device-memory.md#how-it-works)).
- Locally, `/_vercel/insights/script.js` returns 404. That's expected: Vercel only serves it on deployed sites.
- Local builds warn about a stray `~/package-lock.json` outside the repo. This doesn't affect Vercel. Delete that file, or set `turbopack.root` in `next.config.ts`, to silence it.

## Current sprint

[Sprint 1](sprints/sprint-01.md)
