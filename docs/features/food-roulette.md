# Feature: Food roulette

**Status:** Done
**Sprint:** [Sprint 2](../sprints/sprint-02.md)

## What it does

A wheel of 8 random dishes that are safe for the user's allergies and diet (if answered). "ঘুরাও!" spins 5 full turns in 3.6s with the design system's easing, then announces the winner with confetti. "এইটার বিস্তারিত দেখি" opens it on the result screen. 3 spins per day.

## How it works

- `screens/Roulette.tsx`, drawn in SVG (sharp, Bengali text renders properly), rotated with Motion.
- Segment colours are masala, haldi, dhonepata and peach, all readable with ink text.
- With reduced motion, the wheel lands instantly.
- The result is announced in an `aria-live` region; the wheel has a text label listing every dish.

## Acceptance criteria

- [x] The winner is the segment under the pointer
- [x] 3 spins per day
- [x] Reduced motion: lands in under 1s
- [x] Details don't use a suggestion

## Changelog

- 2026-10-31: built
