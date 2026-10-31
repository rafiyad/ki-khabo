# What to do next

## Up next (highest priority first)

1. Commit on a branch and push to GitHub
2. Import the repo in Vercel (it detects Vite; no settings to change) and check the first deploy, including deep links like `/roulette`
3. Try it on real phones: install to home screen, offline use, the share sheet with the image
4. Define the male mood list (brief)
5. Have someone check dish prices and ingredients, especially `contains` for allergies

## Roadmap

From the [brief](brief.md) (P0 is done; P1 is mostly done):

| Phase | Goal | Status |
| --- | --- | --- |
| 1. Foundation (P0) | Quiz, engine, budget, funny result, try again/reject | Done |
| 2. Entertainment (P1) | Roulette, roast, battle, share card | Done |
| 2b. P1 remaining | Food personality test, favorite foods, history screen | Not started |
| 3. Viral | Friend challenge, daily food challenge, privacy-friendly analytics (no mood data) | Not started |
| 4. Scale | Real photos, SEO/Open Graph image, more dishes, performance | Not started |

## Backlog / ideas

> Ideas only, not committed. Run each through the brief's 5-question idea filter first.

- Open Graph image so shared links show a preview
- "Today's lucky food": the same dish for everyone each day, as a daily hook
- Food personality test ("আপনি কোন বিরিয়ানি?")
- Real food photos via `image` in `src/data/foods.ts`
- Sound effects (off by default)
- Use age for tone (তুমি/আপনি)? Decide with the product owner
- Self-host only the font weights actually used, to cut load time
