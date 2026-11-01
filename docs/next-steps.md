# What to do next

## Up next (highest priority first)

1. Import `rafiyad/ki-khabo` in Vercel (it detects Vite; no settings to change) and check the first deploy, including deep links like `/roulette`
2. Try it on real phones: install to home screen, offline use, the share sheet with the image
3. **Desktop layout.** Phone layout stays exactly as it is:
   - widen the frame on large screens (about 1000px)
   - show the result in two columns (food card | mascot, chances and buttons) so the buttons fit without scrolling
   - bigger landing headline and mascot; more cards per row
   - optional food-sticker pattern on the empty background
4. Define the male mood list (brief)
5. Have someone check dish prices and ingredients, especially `contains` for allergies (now 117 dishes; the 70 new ones are typical Dhaka values, unchecked)

## Roadmap

From the [brief](brief.md) (P0 is done; P1 is mostly done):

| Phase | Goal | Status |
| --- | --- | --- |
| 1. Foundation (P0) | Quiz, engine, budget, funny result, try again/reject | Done |
| 2. Entertainment (P1) | Roulette, roast, battle, share card | Done |
| 2b. P1 remaining | Food personality test, favorite foods, history screen | Not started |
| 3. Viral | Friend challenge, daily food challenge, privacy-friendly analytics (no mood data) | Mostly done in [sprint 3](sprints/sprint-03.md) (challenge, group mode, horoscope, weekly report); analytics not started |
| 4. Scale | Real photos, SEO/Open Graph image, more dishes, performance | Not started |

## After sprint 3

- In Vercel, connect the Redis database `redis-fuchsia-paddle` to the ki-khabo project, set the function region to Mumbai (bom1), then redeploy so the live counters show ([live-stats.md](features/live-stats.md))
- Review the new copy (warnings, nudges, group and challenge lines) with the product owner, then merge `feature/funny-health-social`
- Re-run axe-core and Lighthouse on the new screens
- Landing page is getting long on phones: decide what comes first, maybe collapse the feature tiles
- Open Graph image per dish so challenge and share links preview well
- Add a verified mental-health helpline to the care note

## Backlog / ideas

> Ideas only, not committed. Run each through the brief's 5-question idea filter first.

- Open Graph image so shared links show a preview
- Food personality test ("আপনি কোন বিরিয়ানি?")
- Real food photos via `image` in `src/data/foods.ts`
- Sound effects (off by default)
- Use age for tone (তুমি/আপনি)? Decide with the product owner
- Self-host only the font weights actually used, to cut load time
