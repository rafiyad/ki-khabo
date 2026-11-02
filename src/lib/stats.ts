// Helpers for the all-time live counters (server: api/_lib/stats-core.ts).

export type LiveStats = { visits: number; chosen: number };

/** Bangladesh date (YYYY-MM-DD): a phone sends at most one visit per Dhaka day. */
export function dhakaDay(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka" }).format(date);
}

/** Validates the API response. Anything else (offline, local dev serving index.html) gives null. */
export function parseStats(value: unknown): LiveStats | null {
  const s = value as Partial<LiveStats> | null;
  if (!s || !Number.isInteger(s.visits) || !Number.isInteger(s.chosen)) return null;
  if (s.visits! < 0 || s.chosen! < 0) return null;
  return { visits: s.visits!, chosen: s.chosen! };
}

const BN_COUNT = new Intl.NumberFormat("bn-BD");

/** 1234567 → "১২,৩৪,৫৬৭" (Bengali digits, lakh grouping). */
export const bnCount = (n: number) => BN_COUNT.format(n);

/** What this device has already counted: the Dhaka day of its last visit, and the last chosen pick. */
export type StatsMarks = { visitDay: string | null; chosenPick: number | null };

export function parseMarks(value: unknown): StatsMarks {
  const m = value as Partial<StatsMarks> | null;
  return {
    visitDay: typeof m?.visitDay === "string" ? m.visitDay : null,
    chosenPick: typeof m?.chosenPick === "number" ? m.chosenPick : null,
  };
}
