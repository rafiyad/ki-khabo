import { describe, expect, it } from "vitest";
import { DAILY_LIMIT, consume, dayKey, freshQuota, parseQuota, remaining, rollover } from "@/lib/quota";

const day1 = new Date(2026, 9, 31, 23, 59);
const day2 = new Date(2026, 10, 1, 0, 1);

describe("daily quota", () => {
  it("allows 3 of each, counted separately", () => {
    let q = freshQuota(day1);
    expect(DAILY_LIMIT).toBe(3);
    q = consume(consume(q, "suggestions"), "suggestions");
    expect(remaining(q, "suggestions")).toBe(1);
    expect(remaining(q, "spins")).toBe(3);
    q = consume(consume(q, "suggestions"), "suggestions");
    expect(remaining(q, "suggestions")).toBe(0);
    expect(q.suggestions).toBe(3);
  });

  it("resets after local midnight", () => {
    const q = { ...consume(freshQuota(day1), "spins"), finalFoodId: "kacchi" };
    expect(rollover(q, day1)).toBe(q);
    expect(rollover(q, day2)).toEqual({ day: dayKey(day2), suggestions: 0, spins: 0, finalFoodId: null });
  });

  it("uses the local date", () => {
    expect(dayKey(new Date(2026, 0, 5))).toBe("2026-01-05");
  });

  it("parses saved data safely", () => {
    expect(parseQuota(null, day1)).toEqual(freshQuota(day1));
    expect(parseQuota({ day: 5 }, day1)).toEqual(freshQuota(day1));
    expect(parseQuota({ day: dayKey(day1), suggestions: 99, spins: -2, finalFoodId: "x" }, day1)).toEqual({
      day: dayKey(day1),
      suggestions: 3,
      spins: 0,
      finalFoodId: "x",
    });
    expect(parseQuota({ day: dayKey(day1), suggestions: 3, spins: 3, finalFoodId: "x" }, day2)).toEqual(freshQuota(day2));
  });
});
