# Feature: Result and roast

**Status:** Done
**Sprint:** [Sprint 2](../sprints/sprint-02.md)

## What it does

Shows **one dish at a time** in a big food card:

- a badge, a funny headline and an explanation from mood + budget
- price and mood chips
- "কেন এই খাবার?" (why this dish?) reasons
- Mood মিল / সময়ের মিল bars, taken from the real score
- a care note for self-reported "বিষণ্ণ"/"দুশ্চিন্তা" moods
- an allergy reminder

The mascot reacts: surprised at first, confused after "আরেকটা দেখাও", sad after "না ভাই", and happy on accept or the final pick.

**Buttons:** আরেকটা দেখাও (show another) · না ভাই, এটা হবে না (reject, never shown again this visit) · এইটাই খাবো (confetti, saved to history) · বন্ধুকে পাঠাও (share card).

**Roast:** on the third dish of the day (the last chance), a red banner shows "🛑 শেষ সিদ্ধান্ত!" with a roast line and a final line. Only accept and share remain. See [daily-limits.md](daily-limits.md).

## How it works

- `screens/Result.tsx`; copy comes from `lib/humor.ts` + `content/bn.ts`.
- Each pick stores a random seed, so its copy stays the same on re-render and refresh.
- Copy follows the humor rule: prototype lines that joked about money or the person were rewritten.

## Acceptance criteria

- [x] More and reject show a different dish and use a chance
- [x] The third dish is final, with the roast banner and no more/reject buttons
- [x] Accept fires 50 confetti pieces (none with reduced motion) and saves to history
- [x] Wheel and emergency picks have their own badge or headline

## Changelog

- 2026-10-31: built
