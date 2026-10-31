import type { Food } from "@/data/foods";
import type { BudgetId, CategoryId, DietId, IngredientId, MealChoice } from "@/data/options";
import { budgetMax, EMPTY_ANSWERS, recommend, type Answers, type Recommendation } from "@/lib/recommend";
import type { Rng } from "@/lib/rng";

// Group ("আড্ডা") mode: the phone goes round, everyone vetoes one category and
// names a budget, and the engine picks the dish that annoys everyone least.
// Shared restrictions and allergies stay hard rules; vetoes are only a soft
// preference, so the group always gets an answer if anything is safe.

export const GROUP_MIN = 2;
export const GROUP_MAX = 6;

export type GroupMember = { name: string; veto: CategoryId | null; budget: BudgetId | null };

export type GroupSetup = {
  diet: DietId;
  avoid: IngredientId[];
  members: GroupMember[];
};

export type GroupVerdict = {
  rec: Recommendation;
  vetoed: CategoryId[];
  /** Every safe dish was vetoed, so the vetoes had to be ignored. */
  vetoesIgnored: boolean;
  budget: BudgetId;
};

/** The tightest budget anyone named (the group eats where everyone can pay). */
export function groupBudget(members: readonly GroupMember[]): BudgetId {
  const budgets = members.map((m) => m.budget).filter((b): b is BudgetId => b !== null);
  if (budgets.length === 0) return "nolimit";
  return budgets.reduce((low, b) => (budgetMax(b) < budgetMax(low) ? b : low));
}

export function groupAnswers(setup: GroupSetup, meal: MealChoice): Answers {
  return { ...EMPTY_ANSWERS, diet: setup.diet, avoid: setup.avoid, meal, budget: groupBudget(setup.members) };
}

export function groupPick(
  foods: readonly Food[],
  setup: GroupSetup,
  meal: MealChoice,
  rng: Rng,
  exclude: readonly string[] = [],
): GroupVerdict | null {
  const vetoed = [...new Set(setup.members.map((m) => m.veto).filter((v): v is CategoryId => v !== null))];
  const answers = groupAnswers(setup, meal);
  const rec = recommend(foods, answers, { rng, exclude, prefer: (f) => !vetoed.includes(f.category) });
  if (!rec) return null;
  return { rec, vetoed, vetoesIgnored: vetoed.includes(rec.food.category), budget: answers.budget! };
}
