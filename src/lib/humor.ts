import { bn } from "@/content/bn";
import { MEAL_NAMES, MOODS, UNSURE_MOOD, type BudgetId } from "@/data/options";
import { bnDigits } from "@/lib/bn-number";
import type { Answers, Recommendation } from "@/lib/recommend";
import { pickOne, type Rng } from "@/lib/rng";

// Chooses the funny copy for a dish after the engine has picked it.
// Kept separate so copy can change (or come from elsewhere) without touching the engine.

export type ResultCopy = {
  badge: string;
  headline: string;
  explanation: string;
  reasons: string[];
  bubble: string;
};

export function resultCopy(rec: Recommendation, answers: Answers, rng: Rng): ResultCopy {
  const { food } = rec;
  const mood = MOODS.find((m) => m.id === answers.mood);
  const meal = answers.meal ? MEAL_NAMES[answers.meal] : MEAL_NAMES.any;
  const budget: BudgetId = answers.budget ?? "b200";
  const unsure = answers.mood === UNSURE_MOOD;

  return {
    badge: pickOne(bn.result.badges, rng),
    headline: pickOne(bn.result.headlines, rng)(food.name),
    explanation: unsure
      ? bn.result.explainUnsure
      : mood
        ? bn.result.explain(mood.label, bn.result.budgetLines[budget])
        : bn.result.explainNoMood,
    reasons: [
      unsure ? bn.result.whyUnsure : rec.moodMatch && mood ? bn.result.whyMood(mood.label, food.name) : bn.result.whyNoMood,
      bn.result.whyPrice(bnDigits(food.price), rec.withinBudget),
      rec.mealMatch ? bn.result.whyMeal(meal) : bn.result.whyNoMeal,
    ],
    bubble: pickOne(bn.result.bubbles, rng),
  };
}

export function roastLine(rng: Rng): string {
  return bn.roast.prefix + pickOne(bn.roast.lines, rng);
}
