# Feature: Group mode (আড্ডা মোড)

**Status:** Done
**Sprint:** [Sprint 3](../sprints/sprint-03.md)

## What it does

Ends the "কী খাবি?" / "যা ইচ্ছা" loop for friend groups and couples. At `/group`:

1. **Setup:** how many (2–6; with 2 the title becomes "দুইজনের যুদ্ধ 💑"), plus shared diet and allergies.
2. **Pass the phone:** each person adds an optional name, **vetoes one category** (or "যা ইচ্ছা 🤷"), and picks a budget.
3. **Verdict:** *"৩ জনের গণতন্ত্রে বিজয়ী: … আপিল চলবে না 🧑‍⚖️"*, listing who vetoed what, the budget used, the warning and the meter.
4. **One appeal:** the first gives a new verdict; the second is *"আপিল খারিজ!"*.
5. **Share:** a meme card with the "আড্ডার রায় ⚖️" sticker and group captions.

## How it works

`src/lib/group.ts` → `groupPick` reuses the engine:

- shared diet and allergies are **hard rules**
- budget = the **lowest** anyone named
- meal from the clock
- vetoes are a **soft** `prefer`: if everything safe is vetoed, the group still gets a dish and is told the court decided

Doesn't use the daily chances (it's a group decision, not one person's overthinking). Screen: `src/screens/Group.tsx`.

## Acceptance criteria

- [x] Lowest budget, vetoes respected, vetoes ignored only when needed, allergies never broken (unit tests)
- [x] Full flow with names, required budget, appeal granted then denied, share sticker (browser test)

## Changelog

- 2026-10-31: created
