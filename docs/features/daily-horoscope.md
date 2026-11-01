# Feature: Daily food horoscope (খাবার-রাশিফল)

**Status:** Done
**Sprint:** [Sprint 3](../sprints/sprint-03.md)

## What it does

A card on the landing page: one dish per day, **the same for everyone**, with a funny horoscope line (*"শনি আজ পেটের ঘরে বসে আছে। প্রতিকার: হালিম।"*), a lucky time and a lucky companion (*"এক গ্লাস পানি 💧"*). It's labelled as a fun horoscope: *"বিজ্ঞান না, শুধু ক্ষুধা"*.

- **বিস্তারিত দেখি →** opens it as a result (no chance used), only if it's safe for the user's diet and allergies; otherwise the card says it doesn't apply today.
- **রাশিফল শেয়ার** opens the meme card with the horoscope sticker and caption.

## How it works

`src/lib/horoscope.ts`: `horoscopeFor(date, foods)` seeds the RNG with an FNV hash of the local date. No server; everyone's phone gets the same answer.

## Acceptance criteria

- [x] Same all day, varies across days (unit test)

## Changelog

- 2026-10-31: created
