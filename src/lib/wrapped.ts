import type { Food } from "@/data/foods";
import type { Health } from "@/data/health";
import type { CategoryId } from "@/data/options";
import { dayKey } from "@/lib/quota";
import type { AcceptedEntry } from "@/lib/nudges";

// Weekly "food wrapped": a fun summary of the last 7 days of accepted dishes,
// built from on-device history only.

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export type Wrapped = {
  count: number;
  days: number;
  topFood: Food;
  topFoodCount: number;
  topCategory: CategoryId;
  /** Average oil level, 1–3. */
  oil: number;
  /** 0 = low, 1 = medium, 2 = high. */
  oilBand: 0 | 1 | 2;
  sweets: number;
};

function topOf<T>(items: readonly T[]): [T, number] {
  const counts = new Map<T, number>();
  for (const item of items) counts.set(item, (counts.get(item) ?? 0) + 1);
  // Ties go to the most recent, since items are newest first.
  let best = items[0];
  for (const item of items) if (counts.get(item)! > counts.get(best)!) best = item;
  return [best, counts.get(best)!];
}

export function weeklyWrap(
  accepted: readonly AcceptedEntry[],
  now: Date,
  getFood: (id: string) => Food | undefined,
  getHealth: (id: string) => Health,
): Wrapped | null {
  const since = now.getTime() - WEEK_MS;
  const week = accepted
    .filter((a) => a.at >= since && a.at <= now.getTime())
    .map((a) => ({ at: a.at, food: getFood(a.foodId) }))
    .filter((a): a is { at: number; food: Food } => a.food !== undefined);
  if (week.length === 0) return null;

  const [topFood, topFoodCount] = topOf(week.map((w) => w.food));
  const [topCategory] = topOf(week.map((w) => w.food.category));
  const oil = week.reduce((sum, w) => sum + getHealth(w.food.id).oil, 0) / week.length;

  return {
    count: week.length,
    days: new Set(week.map((w) => dayKey(new Date(w.at)))).size,
    topFood,
    topFoodCount,
    topCategory,
    oil,
    oilBand: oil < 1.7 ? 0 : oil < 2.4 ? 1 : 2,
    sweets: week.filter((w) => w.food.category === "sweet").length,
  };
}
