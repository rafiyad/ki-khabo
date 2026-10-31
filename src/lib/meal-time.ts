import type { MealId } from "@/data/options";

/** Meal for a local hour: 5–10 breakfast, 11–15 lunch, 16–19 snacks, otherwise dinner. */
export function mealForHour(hour: number): MealId {
  if (hour >= 5 && hour < 11) return "breakfast";
  if (hour >= 11 && hour < 16) return "lunch";
  if (hour >= 16 && hour < 20) return "snacks";
  return "dinner";
}
