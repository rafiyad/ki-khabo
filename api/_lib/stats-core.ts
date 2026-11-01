// Today's live counters: visits and people who chose a dish, kept in Redis (added
// from the Vercel Marketplace). Only two numbers per day are stored: no personal
// data, no IPs, no mood. See docs/decisions/0006-live-counters.md.
//
// Files under api/_lib aren't deployed as functions (leading underscore).

export type StatsEvent = "visit" | "chosen";
export type Stats = { day: string; visits: number; chosen: number };
export type Env = Record<string, string | undefined>;
export type Command = (string | number)[];
/** Runs Redis commands in one round trip and returns each reply. Throws if the store is unavailable. */
export type RedisRunner = (commands: Command[]) => Promise<unknown[]>;
type Fetch = (input: string, init: RequestInit) => Promise<Response>;

/** Keys expire after 3 days, so the database never grows. */
export const TTL_SECONDS = 3 * 24 * 60 * 60;
const EVENTS: Record<StatsEvent, string> = { visit: "visits", chosen: "chosen" };

/** Bangladesh date (YYYY-MM-DD): "today" resets at midnight in Dhaka for everyone. */
export function dhakaDay(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka" }).format(date);
}

export const statsKey = (day: string, counter: string) => `ki-khabo:stats:${day}:${counter}`;

/**
 * Upstash over HTTPS. The Vercel Marketplace integration sets KV_REST_API_*; a direct
 * Upstash setup uses UPSTASH_REDIS_REST_*. Returns null if neither is set.
 */
export function upstashRunner(env: Env, fetchImpl: Fetch): RedisRunner | null {
  const url = (env.KV_REST_API_URL ?? env.UPSTASH_REDIS_REST_URL)?.replace(/\/$/, "");
  const token = env.KV_REST_API_TOKEN ?? env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return async (commands) => {
    const res = await fetchImpl(`${url}/pipeline`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify(commands),
    });
    if (!res.ok) throw new Error(`Upstash ${res.status}`);
    const replies = (await res.json()) as { result?: unknown; error?: string }[];
    return replies.map((r) => {
      if (r.error) throw new Error(r.error);
      return r.result;
    });
  };
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const toCount = (value: unknown) => {
  const n = Number(value ?? 0);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
};

/**
 * GET: today's numbers. POST {"event":"visit"|"chosen"}: add one, then return today's numbers.
 * Clients only send each event once per device per day; the server can't enforce that
 * without storing something about the visitor, which we don't.
 */
export async function handleStats(request: Request, run: RedisRunner | null, now: Date): Promise<Response> {
  if (!run) return json({ error: "not configured" }, 503);

  const day = dhakaDay(now);
  const visitsKey = statsKey(day, EVENTS.visit);
  const chosenKey = statsKey(day, EVENTS.chosen);
  const commands: Command[] = [];

  if (request.method === "POST") {
    let event: unknown;
    try {
      event = ((await request.json()) as { event?: unknown } | null)?.event;
    } catch {
      return json({ error: "bad request" }, 400);
    }
    if (event !== "visit" && event !== "chosen") return json({ error: "bad event" }, 400);
    const key = statsKey(day, EVENTS[event]);
    commands.push(["INCR", key], ["EXPIRE", key, TTL_SECONDS]);
  } else if (request.method !== "GET") {
    return json({ error: "method not allowed" }, 405);
  }
  commands.push(["MGET", visitsKey, chosenKey]);

  try {
    const counts = (await run(commands)).at(-1);
    if (!Array.isArray(counts)) return json({ error: "store unavailable" }, 502);
    const [visits, chosen] = counts;
    return json({ day, visits: toCount(visits), chosen: toCount(chosen) } satisfies Stats);
  } catch {
    return json({ error: "store unavailable" }, 502);
  }
}
