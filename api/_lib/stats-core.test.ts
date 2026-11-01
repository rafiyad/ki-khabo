import { describe, expect, it } from "vitest";
import { dhakaDay, handleStats, statsKey, TTL_SECONDS, upstashRunner, type Env } from "./stats-core.js";

const ENV = { KV_REST_API_URL: "https://redis.example/", KV_REST_API_TOKEN: "secret" };
// 1 Nov 2026, 20:00 UTC = 2 Nov 02:00 in Dhaka (UTC+6).
const NOW = new Date(Date.UTC(2026, 10, 1, 20, 0));

/** In-memory stand-in for the Upstash REST pipeline endpoint. */
function fakeUpstash(store = new Map<string, number>()) {
  const calls: { url: string; auth: string | null; commands: (string | number)[][] }[] = [];
  const fetchImpl = async (url: string, init: RequestInit) => {
    const commands = JSON.parse(String(init.body)) as (string | number)[][];
    calls.push({ url, auth: new Headers(init.headers).get("authorization"), commands });
    const results = commands.map(([cmd, ...args]) => {
      if (cmd === "INCR") {
        const n = (store.get(String(args[0])) ?? 0) + 1;
        store.set(String(args[0]), n);
        return { result: n };
      }
      if (cmd === "EXPIRE") return { result: 1 };
      if (cmd === "MGET") return { result: args.map((k) => (store.has(String(k)) ? String(store.get(String(k))) : null)) };
      return { error: "unknown" };
    });
    return new Response(JSON.stringify(results), { status: 200 });
  };
  return { fetchImpl, calls, store };
}

const post = (body: unknown) =>
  new Request("https://site/api/stats", { method: "POST", body: typeof body === "string" ? body : JSON.stringify(body) });
const get = () => new Request("https://site/api/stats");
type FetchLike = Parameters<typeof upstashRunner>[1];
/** handleStats with the Upstash runner, the way api/stats.ts wires it. */
const call = (request: Request, env: Env, fetchImpl: FetchLike, now: Date) =>
  handleStats(request, upstashRunner(env, fetchImpl), now);

describe("live stats API", () => {
  it("uses the Bangladesh date", () => {
    expect(dhakaDay(NOW)).toBe("2026-11-02");
  });

  it("returns zeros on a fresh day", async () => {
    const { fetchImpl } = fakeUpstash();
    const res = await call(get(), ENV, fetchImpl, NOW);
    expect(res.status).toBe(200);
    expect(res.headers.get("cache-control")).toBe("no-store");
    expect(await res.json()).toEqual({ day: "2026-11-02", visits: 0, chosen: 0 });
  });

  it("counts visits and choices separately, with expiry", async () => {
    const { fetchImpl, calls } = fakeUpstash();
    await call(post({ event: "visit" }), ENV, fetchImpl, NOW);
    await call(post({ event: "visit" }), ENV, fetchImpl, NOW);
    const res = await call(post({ event: "chosen" }), ENV, fetchImpl, NOW);
    expect(await res.json()).toEqual({ day: "2026-11-02", visits: 2, chosen: 1 });

    const last = calls.at(-1)!;
    expect(last.url).toBe("https://redis.example/pipeline");
    expect(last.auth).toBe("Bearer secret");
    expect(last.commands[1]).toEqual(["EXPIRE", statsKey("2026-11-02", "chosen"), TTL_SECONDS]);
  });

  it("starts again the next Dhaka day", async () => {
    const { fetchImpl } = fakeUpstash();
    await call(post({ event: "visit" }), ENV, fetchImpl, NOW);
    const nextDay = new Date(NOW.getTime() + 24 * 60 * 60 * 1000);
    expect(await (await call(get(), ENV, fetchImpl, nextDay)).json()).toMatchObject({ visits: 0 });
  });

  it("rejects bad requests without touching the store", async () => {
    const { fetchImpl, calls } = fakeUpstash();
    expect((await call(post({ event: "mood" }), ENV, fetchImpl, NOW)).status).toBe(400);
    expect((await call(post("{not json"), ENV, fetchImpl, NOW)).status).toBe(400);
    expect((await call(new Request("https://site/api/stats", { method: "DELETE" }), ENV, fetchImpl, NOW)).status).toBe(405);
    expect(calls).toHaveLength(0);
  });

  it("supports the direct Upstash variable names", async () => {
    const { fetchImpl, calls } = fakeUpstash();
    const env = { UPSTASH_REDIS_REST_URL: "https://direct.example", UPSTASH_REDIS_REST_TOKEN: "t" };
    expect((await call(get(), env, fetchImpl, NOW)).status).toBe(200);
    expect(calls[0].url).toBe("https://direct.example/pipeline");
  });

  it("says when it isn't set up or the store is down", async () => {
    const { fetchImpl } = fakeUpstash();
    expect((await call(get(), {}, fetchImpl, NOW)).status).toBe(503);
    const down = async () => new Response("oops", { status: 500 });
    expect((await call(get(), ENV, down, NOW)).status).toBe(502);
    const offline = async () => {
      throw new Error("network");
    };
    expect((await call(get(), ENV, offline, NOW)).status).toBe(502);
    const commandError = async () => new Response(JSON.stringify([{ error: "WRONGTYPE" }]), { status: 200 });
    expect((await call(get(), ENV, commandError, NOW)).status).toBe(502);
  });
});
