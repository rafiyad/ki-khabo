import type { Food } from "@/data/foods";
import {
  BUDGETS,
  type AgeId,
  type BudgetId,
  type CategoryId,
  type DietId,
  type GenderId,
  type IngredientId,
  type MealChoice,
  type MoodId,
} from "@/data/options";
import { pickOne, type Rng } from "@/lib/rng";

// Rule-based recommendation engine (docs/brief.md#recommendation-engine).
// Pure: no React, no browser APIs, no data imports. Foods and randomness are passed in.
//
//   1. Hard rules: diet, restrictions/allergies, rejected dishes. Never relaxed.
//   2. Soft eligibility: meal time and budget. Relaxed only if too few dishes remain.
//   3. Diversity: skip recently shown dishes while others remain.
//   4. Score: 0.35·Mood + 0.25·Budget + 0.20·Time + 0.20·Preference (each 0–100).
//   5. Weighted random pick among the top results.

export type Answers = {
  gender: GenderId | null;
  age: AgeId | null; // collected for the experience only; never used here
  mood: MoodId | null;
  meal: MealChoice | null;
  budget: BudgetId | null;
  diet: DietId;
  categories: CategoryId[];
  avoid: IngredientId[];
};

export const EMPTY_ANSWERS: Answers = {
  gender: null,
  age: null,
  mood: null,
  meal: null,
  budget: null,
  diet: "any",
  categories: [],
  avoid: [],
};

export const WEIGHTS = { mood: 0.35, budget: 0.25, time: 0.2, preference: 0.2 } as const;
export const TOP_N = 5;
/** Meal-time filtering is dropped if fewer dishes than this would remain. */
export const MIN_MEAL_POOL = 3;
/** When nothing fits the budget, fall back to this many of the cheapest dishes. */
export const BUDGET_FALLBACK = 3;
export const EMERGENCY_MAX_PRICE = 100;

export type Scores = { mood: number; budget: number; time: number; preference: number; total: number };

export type Recommendation = {
  food: Food;
  scores: Scores;
  withinBudget: boolean;
  mealMatch: boolean;
  moodMatch: boolean;
};

export type RecommendOptions = {
  rng: Rng;
  /** Recently shown dish ids to avoid while other options remain. */
  exclude?: readonly string[];
  /** Dish ids the user rejected. A hard rule. */
  rejected?: readonly string[];
};

export function budgetMax(budget: BudgetId | null): number {
  return BUDGETS.find((b) => b.id === budget)?.max ?? Number.POSITIVE_INFINITY;
}

/** Hard rules only: diet and restrictions/allergies. Use this to check any dish shown to the user. */
export function isSafeFor(food: Food, answers: Pick<Answers, "diet" | "avoid">): boolean {
  if (answers.diet === "veg" && !food.veg) return false;
  if (answers.diet === "nonveg" && food.veg) return false;
  return !answers.avoid.some((a) => food.contains.includes(a));
}

function mealMatches(food: Food, meal: MealChoice | null): boolean {
  return !meal || meal === "any" || food.meals.includes(meal);
}

export function scoreFood(food: Food, answers: Answers): Scores {
  const max = budgetMax(answers.budget);
  const mood = answers.mood ? (food.moods[answers.mood] ?? 0) : 0;
  const budget = food.price <= max ? 100 : Math.round((100 * max) / food.price);
  const time = mealMatches(food, answers.meal) ? 100 : 0;
  const preference =
    answers.categories.length === 0 || answers.categories.includes(food.category) ? 100 : 0;
  const total =
    WEIGHTS.mood * mood + WEIGHTS.budget * budget + WEIGHTS.time * time + WEIGHTS.preference * preference;
  return { mood, budget, time, preference, total: Math.round(total * 10) / 10 };
}

/** Dishes allowed for these answers, after hard rules and (relaxable) meal and budget filters. */
export function candidates(foods: readonly Food[], answers: Answers, rejected: readonly string[] = []): Food[] {
  const rejectedSet = new Set(rejected);
  const safe = foods.filter((f) => isSafeFor(f, answers) && !rejectedSet.has(f.id));
  if (safe.length === 0) return [];

  const forMeal = safe.filter((f) => mealMatches(f, answers.meal));
  const pool = forMeal.length >= MIN_MEAL_POOL ? forMeal : safe;

  const max = budgetMax(answers.budget);
  const affordable = pool.filter((f) => f.price <= max);
  if (affordable.length > 0) return affordable;
  return [...pool].sort((a, b) => a.price - b.price).slice(0, BUDGET_FALLBACK);
}

function toRecommendation(food: Food, answers: Answers): Recommendation {
  const scores = scoreFood(food, answers);
  return {
    food,
    scores,
    withinBudget: scores.budget === 100,
    mealMatch: scores.time === 100,
    moodMatch: scores.mood > 0,
  };
}

/** Picks one dish, or null if the hard rules leave nothing. */
export function recommend(foods: readonly Food[], answers: Answers, options: RecommendOptions): Recommendation | null {
  let pool = candidates(foods, answers, options.rejected);
  if (pool.length === 0) return null;

  const exclude = new Set(options.exclude ?? []);
  const fresh = pool.filter((f) => !exclude.has(f.id));
  if (fresh.length > 0) pool = fresh;

  const top = pool
    .map((food) => ({ food, total: scoreFood(food, answers).total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, TOP_N);

  // Weighted random: higher scores are more likely, not guaranteed (the surprise rule).
  const weights = top.map((t) => t.total + 1);
  let r = options.rng() * weights.reduce((a, b) => a + b, 0);
  for (let i = 0; i < top.length; i++) {
    r -= weights[i];
    if (r < 0) return toRecommendation(top[i].food, answers);
  }
  return toRecommendation(top[top.length - 1].food, answers);
}

/** "I can't wait!" button: any safe dish up to ৳100, else the regular engine. */
export function emergencyPick(foods: readonly Food[], answers: Answers, options: RecommendOptions): Recommendation | null {
  const exclude = new Set(options.exclude ?? []);
  const quick = foods.filter((f) => f.price <= EMERGENCY_MAX_PRICE && isSafeFor(f, answers));
  const fresh = quick.filter((f) => !exclude.has(f.id));
  const pool = fresh.length > 0 ? fresh : quick;
  if (pool.length > 0) return toRecommendation(pickOne(pool, options.rng), answers);
  return recommend(foods, answers, options);
}

/** Recomputes scores for a dish chosen elsewhere (wheel, saved final pick). */
export function describe(food: Food, answers: Answers): Recommendation {
  return toRecommendation(food, answers);
}
