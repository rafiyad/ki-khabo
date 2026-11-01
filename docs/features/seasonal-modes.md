# Feature: Seasonal modes

**Status:** Done
**Sprint:** [Sprint 3](../sprints/sprint-03.md)

## What it does

A banner on the landing page with a one-tap seasonal dish (opens as a result; no chance used):

| Mode | When | Banner |
| --- | --- | --- |
| 🌙 Ramadan | Islamic month 9 | *ইফতারে একটু ভাজাপোড়া চলে, কিন্তু পানি আর খেজুর ভুলবেন না!* |
| 🥶 Winter | Dec–Feb | *পিঠা না খেলে শীত মন খারাপ করবে।* |
| 🌧️ Monsoon | Jun–Oct | *বৃষ্টি + খিচুড়ি = জাতীয় আইন।* |

The first dish from the season's list that's safe for the user is used. If none is safe, the banner is hidden.

## How it works

- `src/lib/season.ts`: Ramadan via `Intl.DateTimeFormat("en-u-ca-islamic-umalqura")` (off if the browser lacks it); Ramadan wins over other seasons.
- `src/data/seasons.ts`: dish lists per season.
- No location or weather API, so nothing to ask permission for.

## Acceptance criteria

- [x] Ramadan 2027 detected; winter, monsoon and off-season (unit tests; Ramadan and monsoon banners in the browser test)

## Open questions

- Ramadan dates can differ by a day in Bangladesh (moon sighting). Fine for a banner.

## Changelog

- 2026-10-31: created
