import { bn } from "@/content/bn";
import type { Food } from "@/data/foods";
import type { Health } from "@/data/health";
import type { MoodId } from "@/data/options";
import { isSafeFor, type Answers } from "@/lib/recommend";
import { pickOne, type Rng } from "@/lib/rng";

// Funny health and social nudges for a dish that's already been picked.
// Pure: data, time and randomness are passed in, like the engine.

export type AcceptedEntry = { foodId: string; at: number };

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
/** Shown on the 3rd (or later) dish of the same category in a week. */
export const STREAK_MIN = 3;

/** 11pm to 4am: when heavy food gets a gentle warning and lighter food is preferred. */
export function isLateNight(now: Date): boolean {
  const h = now.getHours();
  return h >= 23 || h < 4;
}

type HealthContext = {
  food: Food;
  now: Date;
  accepted: readonly AcceptedEntry[];
  foods: readonly Food[];
  answers: Pick<Answers, "diet" | "avoid">;
  getFood: (id: string) => Food | undefined;
  getHealth: (id: string) => Health;
  rng: Rng;
};

/** At most one habit-based health line: late-night heaviness, then a same-category streak. */
export function healthNudge(ctx: HealthContext): string | null {
  const { food, now, rng } = ctx;
  const health = ctx.getHealth(food.id);

  if (isLateNight(now)) {
    return health.heavy === 3 ? bn.health.lateHeavy(food.name) : bn.health.lateLight;
  }

  const since = now.getTime() - WEEK_MS;
  const sameCategory = ctx.accepted.filter(
    (a) => a.at >= since && a.foodId !== food.id && ctx.getFood(a.foodId)?.category === food.category,
  ).length;
  const count = sameCategory + 1;
  // Daily rice and curry (or a drink) is just life, not a streak worth a warning.
  if (count < STREAK_MIN || food.category === "home" || food.category === "drinks") return null;

  const light = ctx.foods.filter((f) => {
    const h = ctx.getHealth(f.id);
    return f.category !== food.category && h.heavy === 1 && h.oil === 1 && isSafeFor(f, ctx.answers);
  });
  if (light.length === 0) return null;
  return bn.health.streak(count, bn.health.categoryNames[food.category], pickOne(light, rng).name);
}

const HOME_MOODS: MoodId[] = ["lonely", "sad", "heartbroken", "lowenergy"];
const TEA_DISHES = ["cha-singara", "cha-biscuit", "malai-cha"];
/** Chance that a social line is shown at all, so it stays a surprise rather than a lecture. */
export const SOCIAL_CHANCE = 0.5;

/** Sometimes one small social line: calling home, a cup of tea for someone, leftovers... */
export function socialNudge(food: Food, health: Health, mood: MoodId | null, rng: Rng): string | null {
  if (rng() >= SOCIAL_CHANCE) return null;
  const s = bn.social;
  const lines: string[] = [s.cleanPlate, s.thankCook];
  if (mood && HOME_MOODS.includes(mood)) lines.push(s.callHome, s.callHome);
  if (TEA_DISHES.includes(food.id)) lines.push(s.tea, s.tea);
  if (health.heavy === 3) lines.push(s.leftovers, s.share);
  return pickOne(lines, rng);
}

/** Street food always earns the local-hero badge. */
export const isLocalHero = (food: Food) => food.category === "street";
