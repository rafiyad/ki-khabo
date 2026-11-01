import { describe, expect, it } from "vitest";
import { dhakaDay as serverDay } from "../../api/_lib/stats-core";
import { bnCount, dhakaDay, parseMarks, parseStats } from "@/lib/stats";

describe("live stats helpers", () => {
  it("uses the same Dhaka day as the server", () => {
    for (const t of [Date.UTC(2026, 10, 1, 17, 59), Date.UTC(2026, 10, 1, 18, 0), Date.UTC(2026, 11, 31, 20, 0)]) {
      expect(dhakaDay(new Date(t))).toBe(serverDay(new Date(t)));
    }
    expect(dhakaDay(new Date(Date.UTC(2026, 10, 1, 18, 0)))).toBe("2026-11-02");
  });

  it("formats counts in Bengali with lakh grouping", () => {
    expect(bnCount(0)).toBe("০");
    expect(bnCount(1234)).toBe("১,২৩৪");
    expect(bnCount(1234567)).toBe("১২,৩৪,৫৬৭");
  });

  it("accepts only a valid API response", () => {
    expect(parseStats({ day: "2026-11-01", visits: 3, chosen: 1 })).toEqual({ day: "2026-11-01", visits: 3, chosen: 1 });
    expect(parseStats(null)).toBeNull();
    expect(parseStats("<!doctype html>")).toBeNull();
    expect(parseStats({ day: "2026-11-01", visits: -1, chosen: 0 })).toBeNull();
    expect(parseStats({ day: "2026-11-01", visits: 1.5, chosen: 0 })).toBeNull();
  });

  it("reads saved marks safely", () => {
    expect(parseMarks(null)).toEqual({ visitDay: null, chosenDay: null });
    expect(parseMarks({ visitDay: "2026-11-01", chosenDay: 5 })).toEqual({ visitDay: "2026-11-01", chosenDay: null });
  });
});
