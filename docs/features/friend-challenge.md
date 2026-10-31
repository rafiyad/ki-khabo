# Feature: Friend challenge

**Status:** Done
**Sprint:** [Sprint 3](../sprints/sprint-03.md)

## What it does

"আমি আজ কী খাবো, গেস করো!" After picking a dish, the user taps **"বন্ধুদের চ্যালেঞ্জ দাও 🎯"**, optionally types a nickname, and sends a link. The friend sees *"রাফি আজ কী খাবে? 🤔"* with 4 dishes and gets **one guess**:

- right → confetti, *"তুমি সত্যিকারের খাদ্য-বন্ধু 🤝🏆"*
- wrong → *"ভুল! আসলে ছিল … বন্ধুত্ব রিভিউ করা দরকার।"*

Then: **"এবার তোমার পালা"** (start the quiz) or **"তুমিও চ্যালেঞ্জ বানাও"**. This closes the viral loop: visit → pick → challenge → friend plays → friend picks.

## How it works

- `src/lib/challenge.ts`: `makeChallenge` (answer + 3 random decoys, shuffled), `encodeChallenge` / `decodeChallenge`.
- The link is `/c?d=<code>`: base64url JSON `{ v, n, o, a }`. No server. The code only hides the answer from a glance; it isn't a secret.
- Decoding rejects broken codes, unknown dishes, duplicates and bad indexes, so an old or edited link shows a friendly error.
- The nickname is cleaned (control characters removed, 20 characters max) and lives only in the link.
- Screens: `Challenge.tsx` (sender, `/challenge`), `ChallengePlay.tsx` (friend, `/c`). Playing uses no daily chances.

## Acceptance criteria

- [x] Round trip with a Bengali name; broken links rejected (unit tests)
- [x] Friend flow, one guess, CTA, broken link screen (browser test)

## Open questions

- A per-dish Open Graph image would make the link preview much better in Messenger/WhatsApp (needs build-time image generation).

## Changelog

- 2026-10-31: created
