# Feature: Share card

**Status:** Done
**Sprint:** [Sprint 2](../sprints/sprint-02.md)

## What it does

A 1:1 meme card with the dish, a funny caption, the brand and `#কিখাবো`.

- **শেয়ার করো:** on phones, opens the native share sheet with the PNG. Elsewhere, downloads the PNG and copies the caption.
- **ছবি ডাউনলোড:** downloads the PNG and copies the caption.
- **ক্যাপশন কপি / অন্য ক্যাপশন:** copy the caption, or cycle to another one.
- **WhatsApp:** opens `wa.me` with the caption and site link.
- **Facebook:** opens the sharer with the site link (Facebook doesn't accept images or text this way).
- **Mood is hidden by default.** A checkbox adds it (brief: no personal info on the card by default).

## How it works

- `screens/ShareCard.tsx` and `lib/share.ts`.
- `html-to-image` renders the card at 3× size and is loaded only on this screen. Fonts are self-hosted, so the PNG keeps Hind Siliguri.
- The card shows the current dish, else the last accepted one, else কাচ্চি.
- The card uses ink text on masala for contrast.

## Acceptance criteria

- [x] Downloads a PNG with correct Bengali text (browser test, checked visually)
- [x] Mood is off by default
- [x] The WhatsApp link includes the caption and URL

## Open questions

- Add an Open Graph image so shared links show a preview.

## Changelog

- 2026-10-31: built
