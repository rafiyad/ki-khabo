// Daily limits: 3 suggestions and 3 wheel spins per day (docs/brief.md#daily-limits-3-chances).
// Pure functions over a small state object; the app saves it in localStorage.

export const DAILY_LIMIT = 3;

export type QuotaKind = "suggestions" | "spins";

export type Quota = {
  day: string; // local date, YYYY-MM-DD
  suggestions: number;
  spins: number;
  /** The dish locked in as "final decision" once suggestions run out. */
  finalFoodId: string | null;
};

export function dayKey(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${m}-${d}`;
}

export function freshQuota(now: Date): Quota {
  return { day: dayKey(now), suggestions: 0, spins: 0, finalFoodId: null };
}

/** Starts a new day's quota after local midnight; otherwise returns the same object. */
export function rollover(quota: Quota, now: Date): Quota {
  return quota.day === dayKey(now) ? quota : freshQuota(now);
}

export function remaining(quota: Quota, kind: QuotaKind): number {
  return Math.max(0, DAILY_LIMIT - quota[kind]);
}

export function consume(quota: Quota, kind: QuotaKind): Quota {
  return { ...quota, [kind]: Math.min(DAILY_LIMIT, quota[kind] + 1) };
}

export function parseQuota(value: unknown, now: Date): Quota {
  const q = value as Partial<Quota> | null;
  if (
    !q ||
    typeof q.day !== "string" ||
    typeof q.suggestions !== "number" ||
    typeof q.spins !== "number"
  ) {
    return freshQuota(now);
  }
  return rollover(
    {
      day: q.day,
      suggestions: Math.min(DAILY_LIMIT, Math.max(0, q.suggestions)),
      spins: Math.min(DAILY_LIMIT, Math.max(0, q.spins)),
      finalFoodId: typeof q.finalFoodId === "string" ? q.finalFoodId : null,
    },
    now,
  );
}
