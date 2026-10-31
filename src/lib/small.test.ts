import { describe, expect, it } from "vitest";
import { bnDigits, bnTime } from "@/lib/bn-number";
import { mealForHour } from "@/lib/meal-time";

describe("bnDigits", () => {
  it("converts digits and leaves other text alone", () => {
    expect(bnDigits(1230)).toBe("১২৩০");
    expect(bnDigits("৳180 / 5")).toBe("৳১৮০ / ৫");
  });

  it("formats clock time", () => {
    expect(bnTime(new Date(2026, 0, 1, 9, 5))).toBe("৯:০৫");
  });
});

describe("mealForHour", () => {
  it.each([
    [4, "dinner"],
    [5, "breakfast"],
    [10, "breakfast"],
    [11, "lunch"],
    [15, "lunch"],
    [16, "snacks"],
    [19, "snacks"],
    [20, "dinner"],
    [0, "dinner"],
  ])("hour %i → %s", (hour, meal) => {
    expect(mealForHour(hour)).toBe(meal);
  });
});
