import { describe, expect, it } from "vitest";
import { FOODS, type Food } from "@/data/foods";
import {
  BUDGET_FALLBACK,
  EMPTY_ANSWERS,
  TOP_N,
  candidates,
  describe as describeFood,
  emergencyPick,
  isSafeFor,
  recommend,
  scoreFood,
  type Answers,
} from "@/lib/recommend";
import { seeded } from "@/lib/rng";

const food = (id: string, over: Partial<Food> = {}): Food => ({
  id,
  name: id,
  nameEn: id,
  emoji: "🍽️",
  price: 100,
  meals: ["lunch"],
  category: "home",
  veg: true,
  contains: [],
  moods: {},
  ...over,
});

const answers = (over: Partial<Answers> = {}): Answers => ({
  ...EMPTY_ANSWERS,
  gender: "female",
  age: "18-25",
  mood: "sad",
  meal: "lunch",
  budget: "b200",
  ...over,
});

const ids = (fs: Food[]) => fs.map((f) => f.id).sort();

describe("hard rules", () => {
  const foods = [
    food("veg"),
    food("chicken", { veg: false }),
    food("beef", { veg: false, contains: ["beef"] }),
    food("prawn", { veg: false, contains: ["shrimp", "milk"] }),
  ];

  it("filters by diet", () => {
    expect(ids(candidates(foods, answers({ diet: "veg" })))).toEqual(["veg"]);
    expect(ids(candidates(foods, answers({ diet: "nonveg" })))).toEqual(["beef", "chicken", "prawn"]);
  });

  it("removes any dish containing an avoided ingredient", () => {
    expect(ids(candidates(foods, answers({ avoid: ["beef", "milk"] })))).toEqual(["chicken", "veg"]);
  });

  it("removes rejected dishes", () => {
    expect(ids(candidates(foods, answers(), ["veg", "beef"]))).toEqual(["chicken", "prawn"]);
  });

  it("returns null when hard rules leave nothing", () => {
    expect(recommend(foods, answers({ diet: "veg", avoid: [] }), { rng: seeded(1), rejected: ["veg"] })).toBeNull();
  });

  it("never breaks allergy or diet rules on the real data (property check)", () => {
    const rng = seeded(42);
    const allergenSets: Answers["avoid"][] = [["egg"], ["milk", "nuts"], ["beef", "fish", "shrimp"], ["egg", "milk"]];
    for (let i = 0; i < 400; i++) {
      const a = answers({
        avoid: allergenSets[i % allergenSets.length],
        diet: (["any", "veg", "nonveg"] as const)[i % 3],
        budget: (["b100", "b200", "b500", "b1000", "nolimit"] as const)[i % 5],
        meal: (["breakfast", "lunch", "snacks", "dinner", "any"] as const)[i % 5],
      });
      const rec = recommend(FOODS, a, { rng });
      if (rec) expect(isSafeFor(rec.food, a)).toBe(true);
    }
  });
});

describe("soft eligibility", () => {
  it("keeps only dishes for the chosen meal when enough exist", () => {
    const foods = [food("a"), food("b"), food("c"), food("night", { meals: ["dinner"] })];
    expect(ids(candidates(foods, answers({ meal: "lunch" })))).toEqual(["a", "b", "c"]);
  });

  it("ignores meal time if too few dishes match it", () => {
    const foods = [food("a"), food("night1", { meals: ["dinner"] }), food("night2", { meals: ["dinner"] })];
    expect(candidates(foods, answers({ meal: "lunch" }))).toHaveLength(3);
  });

  it("keeps dishes within budget", () => {
    const foods = [food("cheap", { price: 80 }), food("ok", { price: 200 }), food("pricey", { price: 201 })];
    expect(ids(candidates(foods, answers({ budget: "b200", meal: "any" })))).toEqual(["cheap", "ok"]);
  });

  it("falls back to the cheapest dishes when nothing fits the budget", () => {
    const foods = [150, 300, 120, 500, 200].map((price) => food(`p${price}`, { price }));
    const pool = candidates(foods, answers({ budget: "b100", meal: "any" }));
    expect(pool).toHaveLength(BUDGET_FALLBACK);
    expect(ids(pool)).toEqual(["p120", "p150", "p200"]);
  });
});

describe("scoring", () => {
  it("applies 0.35·Mood + 0.25·Budget + 0.20·Time + 0.20·Preference", () => {
    const f = food("x", { moods: { sad: 80 }, price: 150, category: "street" });
    const s = scoreFood(f, answers({ categories: ["street"] }));
    expect(s).toMatchObject({ mood: 80, budget: 100, time: 100, preference: 100 });
    expect(s.total).toBe(93);
  });

  it("gives zero for an unmatched mood, meal or category", () => {
    const f = food("x", { moods: { happy: 90 }, meals: ["dinner"], category: "sweet" });
    const s = scoreFood(f, answers({ categories: ["street"] }));
    expect(s).toMatchObject({ mood: 0, time: 0, preference: 0, budget: 100 });
  });

  it("scales the budget score down for over-budget dishes", () => {
    expect(scoreFood(food("x", { price: 400 }), answers({ budget: "b200" })).budget).toBe(50);
  });

  it("treats no favorite categories as matching everything", () => {
    expect(scoreFood(food("x"), answers({ categories: [] })).preference).toBe(100);
  });

  it("never uses gender or age", () => {
    const f = FOODS[0];
    const a = answers({ gender: "male", age: "u18" });
    const b = answers({ gender: "female", age: "50+" });
    expect(scoreFood(f, a)).toEqual(scoreFood(f, b));
    expect(recommend(FOODS, a, { rng: seeded(7) })?.food.id).toBe(recommend(FOODS, b, { rng: seeded(7) })?.food.id);
  });
});

describe("selection", () => {
  const foods = Array.from({ length: 8 }, (_, i) => food(`f${i}`, { moods: { sad: 100 - i * 10 } }));

  it("only picks from the top results", () => {
    const top = new Set(["f0", "f1", "f2", "f3", "f4"].slice(0, TOP_N));
    const rng = seeded(3);
    for (let i = 0; i < 200; i++) expect(top.has(recommend(foods, answers(), { rng })!.food.id)).toBe(true);
  });

  it("gives variety for the same inputs (surprise rule)", () => {
    const rng = seeded(9);
    const seen = new Set(Array.from({ length: 50 }, () => recommend(foods, answers(), { rng })!.food.id));
    expect(seen.size).toBeGreaterThan(2);
  });

  it("prefers higher scores", () => {
    const rng = seeded(11);
    const counts: Record<string, number> = {};
    for (let i = 0; i < 2000; i++) {
      const id = recommend(foods, answers(), { rng })!.food.id;
      counts[id] = (counts[id] ?? 0) + 1;
    }
    expect(counts.f0).toBeGreaterThan(counts.f4);
  });

  it("skips recently shown dishes while others remain", () => {
    const rng = seeded(5);
    const exclude = ["f0", "f1", "f2", "f3", "f4", "f5"];
    for (let i = 0; i < 50; i++) {
      expect(["f6", "f7"]).toContain(recommend(foods, answers(), { rng, exclude })!.food.id);
    }
  });

  it("allows shown dishes again once everything has been shown", () => {
    const exclude = foods.map((f) => f.id);
    expect(recommend(foods, answers(), { rng: seeded(1), exclude })).not.toBeNull();
  });

  it("is repeatable with the same seed", () => {
    expect(recommend(FOODS, answers(), { rng: seeded(99) })?.food.id).toBe(
      recommend(FOODS, answers(), { rng: seeded(99) })?.food.id,
    );
  });

  it("reports why a dish matched", () => {
    const rec = describeFood(food("x", { moods: { sad: 70 }, price: 300 }), answers({ budget: "b200" }));
    expect(rec).toMatchObject({ moodMatch: true, mealMatch: true, withinBudget: false });
  });
});

describe("emergencyPick", () => {
  it("picks a safe dish up to ৳100", () => {
    const rng = seeded(2);
    const a = answers({ avoid: ["milk"], diet: "veg" });
    for (let i = 0; i < 100; i++) {
      const rec = emergencyPick(FOODS, a, { rng })!;
      expect(rec.food.price).toBeLessThanOrEqual(100);
      expect(isSafeFor(rec.food, a)).toBe(true);
    }
  });

  it("works before any quiz answers", () => {
    expect(emergencyPick(FOODS, EMPTY_ANSWERS, { rng: seeded(4) })).not.toBeNull();
  });
});

describe("জানি না mood", () => {
  it("still gives a dish, chosen by budget, time and preference", () => {
    const pick = recommend(FOODS, answers({ mood: "unsure" }), { rng: seeded(5) });
    expect(pick).not.toBeNull();
    expect(pick!.scores.mood).toBe(0);
    expect(pick!.withinBudget).toBe(true);
  });
});
