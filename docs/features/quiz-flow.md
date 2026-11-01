# Feature: Quiz flow

**Status:** Done
**Sprint:** [Sprint 2](../sprints/sprint-02.md)

## What it does

One question per screen, with a progress bar ("ধাপ ১/৫") and a cheer line:

1. **Gender:** পুরুষ / নারী
2. **Age:** ১৮-এর কম, ১৮–২৫, ২৬–৩৫, ৩৬–৫০, ৫০+
3. **Mood:** "🤷 জানি না" comes first for everyone. Then women see 23 moods (no "স্বাভাবিক"); men see all 24 until their list is defined. "সব Mood দেখুন" shows every mood to anyone.
4. **Meal time:** pre-selected from the clock, with a note ("🕒 এখন ১:৩০ — তাই দুপুরের খাবার ধরলাম!"); tap to change.
5. **Budget and restrictions:** budget (required), veg/non-veg, favorite categories (7: biryani/polao, home style, meat specials, street, fast food, sweets, drinks), allergies.

Then the loading messages, then the result.

## Why

The 5-second rule and the one-question-per-screen principle from the [brief](../brief.md).

## How it works

- Screens: `src/screens/Step*.tsx`, sharing `components/StepLayout.tsx`.
- Answers are stored in `sessionStorage` and only last for this visit.
- `screens/steps.ts` sets the order. Opening a step with an earlier answer missing redirects to that step.
- Meal time: `lib/meal-time.ts` (5–10 breakfast, 11–15 lunch, 16–19 snacks, else dinner). It's shown as selected and saved when the user taps next.
- Changing any answer starts a fresh round of picks, but never gives new daily chances.

## Acceptance criteria

- [x] Next without an answer shows a Bengali error (`role="alert"`)
- [x] Female sees 23 moods; "সব Mood দেখুন" shows 24
- [x] Meal is auto-selected from the clock and saved on next
- [x] Deep links to later steps redirect to the first missing answer
- [x] Keyboard: Tab to an option, Enter selects
- [x] Gender and age never affect which dish is picked (unit test)

## Open questions

- The male mood list (brief: "to be defined later").
- Age is collected but unused. Use it for tone of voice later, or keep it as is?

## Changelog

- 2026-10-31: built
