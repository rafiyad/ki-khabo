import { describe, expect, it } from "vitest";
import { getFood, getHealth } from "@/data";
import { FOODS, type Food } from "@/data/foods";
import { DEFAULT_HEALTH, HEALTH } from "@/data/health";
import { CATEGORIES } from "@/data/options";
import { SEASON_FOODS } from "@/data/seasons";
import { cleanName, decodeChallenge, encodeChallenge, makeChallenge, NAME_MAX } from "@/lib/challenge";
import { groupBudget, groupPick, type GroupMember, type GroupSetup } from "@/lib/group";
import { horoscopeFor } from "@/lib/horoscope";
import { healthNudge, isLateNight, isLocalHero, socialNudge, STREAK_MIN } from "@/lib/nudges";
import { EMPTY_ANSWERS, recommend } from "@/lib/recommend";
import { seeded } from "@/lib/rng";
import { isRamadan, seasonFor } from "@/lib/season";
import { weeklyWrap } from "@/lib/wrapped";

const DAY = 24 * 60 * 60 * 1000;
const at = (y: number, m: number, d: number, h = 13) => new Date(y, m - 1, d, h);
const isKnown = (id: string) => getFood(id) !== undefined;

describe("health data", () => {
  it("has a warning and 1–3 meter levels for every dish", () => {
    for (const f of FOODS) {
      const h = HEALTH[f.id];
      expect(h, f.id).toBeDefined();
      expect(h.warning.length, f.id).toBeGreaterThan(10);
      for (const level of [h.oil, h.spice, h.heavy]) expect([1, 2, 3], f.id).toContain(level);
    }
  });

  it("only describes real dishes", () => {
    for (const id of Object.keys(HEALTH)) expect(isKnown(id), id).toBe(true);
  });

  it("never jokes about bodies or weight (humor rule)", () => {
    const banned = ["মোটা", "ভুঁড়ি", "ওজন", "চিকন", "শুকনা হয়ে"];
    for (const [id, h] of Object.entries(HEALTH)) {
      for (const word of banned) expect(h.warning.includes(word), `${id}: ${word}`).toBe(false);
    }
  });

  it("falls back for unknown dishes", () => {
    expect(getHealth("nope")).toBe(DEFAULT_HEALTH);
  });

  it("seasonal lists only use real dishes", () => {
    for (const ids of Object.values(SEASON_FOODS)) for (const id of ids) expect(isKnown(id), id).toBe(true);
  });
});

describe("recommend prefer option", () => {
  it("keeps preferred dishes while any remain", () => {
    const answers = { ...EMPTY_ANSWERS, mood: "happy" as const, meal: "any" as const, budget: "nolimit" as const };
    for (let seed = 0; seed < 30; seed++) {
      const rec = recommend(FOODS, answers, { rng: seeded(seed), prefer: (f) => f.category === "sweet" });
      expect(rec?.food.category).toBe("sweet");
    }
  });

  it("is ignored when nothing is preferred", () => {
    const answers = { ...EMPTY_ANSWERS, mood: "happy" as const, meal: "any" as const, budget: "nolimit" as const };
    expect(recommend(FOODS, answers, { rng: seeded(1), prefer: () => false })).not.toBeNull();
  });
});

describe("health nudges", () => {
  const ctx = (food: Food, now: Date, accepted: { foodId: string; at: number }[] = []) => ({
    food,
    now,
    accepted,
    foods: FOODS,
    answers: EMPTY_ANSWERS,
    getFood,
    getHealth,
    rng: seeded(3),
  });
  const kacchi = getFood("kacchi")!;

  it("knows late night (11pm–4am)", () => {
    expect(isLateNight(at(2026, 1, 1, 23))).toBe(true);
    expect(isLateNight(at(2026, 1, 1, 2))).toBe(true);
    expect(isLateNight(at(2026, 1, 1, 4))).toBe(false);
    expect(isLateNight(at(2026, 1, 1, 22))).toBe(false);
  });

  it("warns about heavy food late at night and praises light food", () => {
    expect(healthNudge(ctx(kacchi, at(2026, 1, 1, 1)))).toContain(kacchi.name);
    const light = healthNudge(ctx(getFood("ruti-shobji")!, at(2026, 1, 1, 1)));
    expect(light).not.toBeNull();
    expect(light).not.toContain("পাকস্থলী");
  });

  it("shows a streak line on the 3rd dish of a category in a week, with a lighter, different idea", () => {
    const now = at(2026, 3, 10);
    const two = [
      { foodId: "chicken-tehari", at: now.getTime() - DAY },
      { foodId: "beef-tehari", at: now.getTime() - 2 * DAY },
    ];
    expect(STREAK_MIN).toBe(3);
    expect(healthNudge(ctx(kacchi, now, two.slice(0, 1)))).toBeNull();
    const line = healthNudge(ctx(kacchi, now, two));
    expect(line).toContain("হ্যাটট্রিক");
    expect(line).toContain("বিরিয়ানি");
  });

  it("ignores old history and everyday home food", () => {
    const now = at(2026, 3, 10);
    const old = [
      { foodId: "chicken-tehari", at: now.getTime() - 8 * DAY },
      { foodId: "beef-tehari", at: now.getTime() - 9 * DAY },
    ];
    expect(healthNudge(ctx(kacchi, now, old))).toBeNull();
    const home = [
      { foodId: "bhaat-maach", at: now.getTime() - DAY },
      { foodId: "murgir-jhol", at: now.getTime() - DAY },
    ];
    expect(healthNudge(ctx(getFood("daal-bhaat-dim")!, now, home))).toBeNull();
  });
});

describe("social nudges", () => {
  it("is sometimes silent", () => {
    expect(socialNudge(getFood("kacchi")!, getHealth("kacchi"), null, () => 0.99)).toBeNull();
  });

  it("can suggest calling home on a lonely day", () => {
    const lines = new Set<string | null>();
    for (let seed = 0; seed < 200; seed++) lines.add(socialNudge(getFood("pitha")!, getHealth("pitha"), "lonely", seeded(seed)));
    expect([...lines].some((l) => l?.includes("ফোন"))).toBe(true);
  });

  it("gives street food the local-hero badge", () => {
    expect(isLocalHero(getFood("fuchka")!)).toBe(true);
    expect(isLocalHero(getFood("pizza")!)).toBe(false);
  });
});

describe("friend challenge", () => {
  const ids = FOODS.map((f) => f.id);

  it("round-trips through a link, with a Bengali name", () => {
    const c = makeChallenge("kacchi", ids, "  রাফি  ", seeded(7));
    expect(c.options).toHaveLength(4);
    expect(new Set(c.options).size).toBe(4);
    expect(c.options).toContain("kacchi");
    const code = encodeChallenge(c);
    expect(code).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(code).not.toContain("kacchi");
    expect(decodeChallenge(code, isKnown)).toEqual({ name: "রাফি", options: c.options, answer: "kacchi" });
  });

  it("rejects broken links and unknown dishes", () => {
    expect(decodeChallenge("", isKnown)).toBeNull();
    expect(decodeChallenge("not-base64!!", isKnown)).toBeNull();
    const fake = encodeChallenge({ name: "", options: ["kacchi", "made-up"], answer: "kacchi" });
    expect(decodeChallenge(fake, isKnown)).toBeNull();
    const badIndex = btoa(JSON.stringify({ v: 1, n: "", o: ["kacchi", "pizza"], a: 5 }));
    expect(decodeChallenge(badIndex, isKnown)).toBeNull();
  });

  it("cleans names", () => {
    expect(cleanName("a\u0000b​  c")).toBe("ab c");
    expect(Array.from(cleanName("ক".repeat(50)))).toHaveLength(NAME_MAX);
  });
});

describe("group mode", () => {
  const member = (veto: GroupMember["veto"], budget: GroupMember["budget"]): GroupMember => ({ name: "", veto, budget });
  const setup = (members: GroupMember[], over: Partial<GroupSetup> = {}): GroupSetup => ({
    diet: "any",
    avoid: [],
    members,
    ...over,
  });

  it("uses the tightest budget", () => {
    expect(groupBudget([member(null, "b1000"), member(null, "b200"), member(null, "nolimit")])).toBe("b200");
    expect(groupBudget([member(null, null)])).toBe("nolimit");
  });

  it("respects vetoes when it can", () => {
    const s = setup([member("biryani", "nolimit"), member("fast", "nolimit"), member("sweet", "nolimit")]);
    for (let seed = 0; seed < 30; seed++) {
      const v = groupPick(FOODS, s, "lunch", seeded(seed))!;
      expect(["biryani", "fast", "sweet"]).not.toContain(v.rec.food.category);
      expect(v.vetoesIgnored).toBe(false);
    }
  });

  it("still answers when everything is vetoed, and says so", () => {
    const s = setup(CATEGORIES.map((c) => member(c.id, "nolimit")));
    const v = groupPick(FOODS, s, "lunch", seeded(1))!;
    expect(v.vetoesIgnored).toBe(true);
  });

  it("never breaks shared restrictions", () => {
    const s = setup([member(null, "nolimit"), member(null, "nolimit")], { diet: "veg", avoid: ["milk", "nuts"] });
    for (let seed = 0; seed < 30; seed++) {
      const { food } = groupPick(FOODS, s, "snacks", seeded(seed))!.rec;
      expect(food.veg).toBe(true);
      expect(food.contains.filter((c) => c === "milk" || c === "nuts")).toEqual([]);
    }
  });
});

describe("daily horoscope", () => {
  it("is the same all day and changes between days", () => {
    const morning = horoscopeFor(at(2026, 5, 1, 7), FOODS);
    expect(horoscopeFor(at(2026, 5, 1, 22), FOODS)).toEqual(morning);
    const foods = new Set(Array.from({ length: 14 }, (_, i) => horoscopeFor(at(2026, 5, 1 + i), FOODS).food.id));
    expect(foods.size).toBeGreaterThan(3);
    expect(morning.line).toContain(morning.food.name);
  });
});

describe("weekly wrapped", () => {
  const now = at(2026, 3, 10);
  it("is empty without recent history", () => {
    expect(weeklyWrap([], now, getFood, getHealth)).toBeNull();
    expect(weeklyWrap([{ foodId: "kacchi", at: now.getTime() - 8 * DAY }], now, getFood, getHealth)).toBeNull();
  });

  it("summarises the week", () => {
    const w = weeklyWrap(
      [
        { foodId: "kacchi", at: now.getTime() - 1000 },
        { foodId: "kacchi", at: now.getTime() - DAY },
        { foodId: "roshogolla", at: now.getTime() - 2 * DAY },
        { foodId: "unknown-dish", at: now.getTime() - DAY },
      ],
      now,
      getFood,
      getHealth,
    )!;
    expect(w.count).toBe(3);
    expect(w.days).toBe(3);
    expect(w.topFood.id).toBe("kacchi");
    expect(w.topFoodCount).toBe(2);
    expect(w.topCategory).toBe("biryani");
    expect(w.sweets).toBe(1);
    expect(w.oilBand).toBe(1); // (3 + 3 + 1) / 3 ≈ 2.3
  });
});

describe("seasons", () => {
  it("detects Ramadan from the Islamic calendar", () => {
    expect(isRamadan(at(2027, 2, 7))).toBe(false);
    expect(isRamadan(at(2027, 2, 20))).toBe(true);
    expect(seasonFor(at(2027, 2, 20))).toBe("ramadan");
  });

  it("knows winter and the rainy season", () => {
    expect(seasonFor(at(2026, 12, 15))).toBe("winter");
    expect(seasonFor(at(2027, 1, 5))).toBe("winter");
    expect(seasonFor(at(2026, 7, 1))).toBe("monsoon");
    expect(seasonFor(at(2026, 10, 31))).toBe("monsoon");
    expect(seasonFor(at(2026, 4, 1))).toBeNull();
  });
});
