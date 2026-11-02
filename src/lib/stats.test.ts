import { describe, expect, it } from "vitest";
import { bnCount, dhakaDay, parseMarks, parseStats } from "@/lib/stats";

describe("live stats helpers", () => {
  it("uses the Dhaka date (UTC+6)", () => {
    expect(dhakaDay(new Date(Date.UTC(2026, 10, 1, 17, 59)))).toBe("2026-11-01");
    expect(dhakaDay(new Date(Date.UTC(2026, 10, 1, 18, 0)))).toBe("2026-11-02");
  });

  it("formats counts in Bengali with lakh grouping", () => {
    expect(bnCount(0)).toBe("০");
    expect(bnCount(1234)).toBe("১,২৩৪");
    expect(bnCount(1234567)).toBe("১২,৩৪,৫৬৭");
  });

  it("accepts only a valid API response", () => {
    expect(parseStats({ visits: 3, chosen: 1 })).toEqual({ visits: 3, chosen: 1 });
    expect(parseStats(null)).toBeNull();
    expect(parseStats("<!doctype html>")).toBeNull();
    expect(parseStats({ visits: -1, chosen: 0 })).toBeNull();
    expect(parseStats({ visits: 1.5, chosen: 0 })).toBeNull();
  });

  it("reads saved marks safely", () => {
    expect(parseMarks(null)).toEqual({ visitDay: null, chosenPick: null });
    expect(parseMarks({ visitDay: "2026-11-01", chosenPick: 42 })).toEqual({ visitDay: "2026-11-01", chosenPick: 42 });
    expect(parseMarks({ visitDay: 5, chosenPick: "x" })).toEqual({ visitDay: null, chosenPick: null });
  });
});
