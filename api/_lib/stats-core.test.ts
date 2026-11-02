import { describe, expect, it } from "vitest";
import { handleStats, KEYS, upstashRunner, type Env } from "./stats-core.js";

const ENV = { KV_REST_API_URL: "https://redis.example/", KV_REST_API_TOKEN: "secret" };

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
const call = (request: Request, env: Env, fetchImpl: FetchLike) => handleStats(request, upstashRunner(env, fetchImpl));

describe("live stats API", () => {
  it("returns zeros before anything is counted", async () => {
    const { fetchImpl } = fakeUpstash();
    const res = await call(get(), ENV, fetchImpl);
    expect(res.status).toBe(200);
    expect(res.headers.get("cache-control")).toBe("no-store");
    expect(await res.json()).toEqual({ visits: 0, chosen: 0 });
  });

  it("adds to all-time totals that never expire", async () => {
    const { fetchImpl, calls, store } = fakeUpstash(new Map([[KEYS.visit, 1203]]));
    await call(post({ event: "visit" }), ENV, fetchImpl);
    await call(post({ event: "chosen" }), ENV, fetchImpl);
    const res = await call(post({ event: "chosen" }), ENV, fetchImpl);
    expect(await res.json()).toEqual({ visits: 1204, chosen: 2 });
    expect(store.get(KEYS.visit)).toBe(1204);

    const last = calls.at(-1)!;
    expect(last.url).toBe("https://redis.example/pipeline");
    expect(last.auth).toBe("Bearer secret");
    expect(last.commands).toEqual([
      ["INCR", KEYS.chosen],
      ["MGET", KEYS.visit, KEYS.chosen],
    ]);
    expect(calls.flatMap((c) => c.commands).some(([cmd]) => cmd === "EXPIRE")).toBe(false);
  });

  it("rejects bad requests without touching the store", async () => {
    const { fetchImpl, calls } = fakeUpstash();
    expect((await call(post({ event: "mood" }), ENV, fetchImpl)).status).toBe(400);
    expect((await call(post("{not json"), ENV, fetchImpl)).status).toBe(400);
    expect((await call(new Request("https://site/api/stats", { method: "DELETE" }), ENV, fetchImpl)).status).toBe(405);
    expect(calls).toHaveLength(0);
  });

  it("supports the direct Upstash variable names", async () => {
    const { fetchImpl, calls } = fakeUpstash();
    const env = { UPSTASH_REDIS_REST_URL: "https://direct.example", UPSTASH_REDIS_REST_TOKEN: "t" };
    expect((await call(get(), env, fetchImpl)).status).toBe(200);
    expect(calls[0].url).toBe("https://direct.example/pipeline");
  });

  it("says when it isn't set up or the store is down", async () => {
    const { fetchImpl } = fakeUpstash();
    expect((await call(get(), {}, fetchImpl)).status).toBe(503);
    const down = async () => new Response("oops", { status: 500 });
    expect((await call(get(), ENV, down)).status).toBe(502);
    const offline = async () => {
      throw new Error("network");
    };
    expect((await call(get(), ENV, offline)).status).toBe(502);
    const commandError = async () => new Response(JSON.stringify([{ error: "WRONGTYPE" }]), { status: 200 });
    expect((await call(get(), ENV, commandError)).status).toBe(502);
  });
});
