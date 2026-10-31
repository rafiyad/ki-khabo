import { describe, expect, it } from "vitest";
import { BATTLES } from "@/data/battles";
import { FOODS } from "@/data/foods";
import { CATEGORIES, MOOD_LIST_BY_GENDER, MOODS, RESTRICTIONS } from "@/data/options";

describe("food data", () => {
  it("has at least 40 dishes with unique ids", () => {
    expect(FOODS.length).toBeGreaterThanOrEqual(40);
    expect(new Set(FOODS.map((f) => f.id)).size).toBe(FOODS.length);
  });

  it("declares restricted ingredients on every dish, using known ids", () => {
    const known = new Set(RESTRICTIONS.map((r) => r.id));
    for (const f of FOODS) {
      expect(Array.isArray(f.contains), f.id).toBe(true);
      for (const c of f.contains) expect(known.has(c), `${f.id}: ${c}`).toBe(true);
    }
  });

  it("never marks a dish with egg, fish, shrimp or beef as veg", () => {
    for (const f of FOODS.filter((f) => f.veg)) {
      expect(f.contains.filter((c) => ["egg", "fish", "shrimp", "beef"].includes(c)), f.id).toEqual([]);
    }
  });

  it("uses known moods, categories and sensible values", () => {
    const moods = new Set(MOODS.map((m) => m.id));
    const categories = new Set(CATEGORIES.map((c) => c.id));
    for (const f of FOODS) {
      expect(categories.has(f.category), f.id).toBe(true);
      expect(f.meals.length, f.id).toBeGreaterThan(0);
      expect(f.price, f.id).toBeGreaterThan(0);
      for (const [mood, weight] of Object.entries(f.moods)) {
        expect(moods.has(mood as never), `${f.id}: ${mood}`).toBe(true);
        expect(weight, `${f.id}: ${mood}`).toBeGreaterThanOrEqual(0);
        expect(weight, `${f.id}: ${mood}`).toBeLessThanOrEqual(100);
      }
    }
  });

  it("has at least 3 good matches (weight ≥ 60) for every mood", () => {
    for (const m of MOODS) {
      const good = FOODS.filter((f) => (f.moods[m.id] ?? 0) >= 60);
      expect(good.length, m.id).toBeGreaterThanOrEqual(3);
    }
  });

  it("has something under ৳100 for the emergency button, including veg", () => {
    expect(FOODS.some((f) => f.price <= 100 && f.veg)).toBe(true);
  });
});

describe("mood lists", () => {
  it("female list matches the brief (23 moods, no Normal)", () => {
    expect(MOOD_LIST_BY_GENDER.female).toHaveLength(23);
    expect(MOOD_LIST_BY_GENDER.female).not.toContain("normal");
  });

  it("male list falls back to every mood until it's defined", () => {
    expect(MOOD_LIST_BY_GENDER.male).toHaveLength(MOODS.length);
  });
});

describe("battles", () => {
  it("only reference real dishes, with poll numbers in range", () => {
    const ids = new Set(FOODS.map((f) => f.id));
    for (const b of BATTLES) {
      expect(ids.has(b.a), b.a).toBe(true);
      expect(ids.has(b.b), b.b).toBe(true);
      expect(b.pollA).toBeGreaterThan(0);
      expect(b.pollA).toBeLessThan(100);
    }
  });
});
