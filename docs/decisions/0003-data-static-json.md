# 0003: Keep catalog data in typed files in the repo (no database)

**Date:** 2026-10-31
**Status:** Accepted (updated for the Vite rebuild)

## Context

The app needs a list of dishes, moods and battle pairs. They change rarely and are the same for every user. The brief asks that data stay separate from engine code, so adding a mood or dish doesn't change the engine.

## Options considered

1. **Typed TypeScript files in the repo:** free, versioned in git, and checked at build time.
2. **Hosted database:** only needed for user-generated or shared data.

## Decision

- `src/data/foods.ts`: dishes with price, meals, category, veg, restricted ingredients (`contains`) and mood weights (0–100).
- `src/data/options.ts`: genders, ages, moods (and the mood list per gender), meals, budgets, diets, categories, restrictions.
- `src/data/battles.ts`: battle pairs with fixed poll numbers.
- `src/data/index.ts`: the only module screens use to read data.

**Allergy rule.** Every dish must declare `contains`; an empty list means "checked, none". When recipes vary, the ingredient is listed (safe side). `src/data/data.test.ts` fails the build if a dish is missing data, uses unknown ids, or is marked veg while containing egg, fish, shrimp or beef.

## Consequences

- Adding a dish means adding one entry to `foods.ts`; the tests check it.
- Changing an existing `id` breaks saved history and final picks for that dish, so avoid renaming ids.
- Moving to a database later means changing `src/data/index.ts` only.
