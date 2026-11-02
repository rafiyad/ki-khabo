import { beforeAll, describe, expect, it } from "vitest";
import { createClient } from "redis";
import { redisRunner } from "./redis-runner.js";
import { handleStats, KEYS } from "./stats-core.js";

// Runs against a real Redis only when REDIS_TEST_URL is set, e.g.
//   docker run --rm -p 6390:6379 redis:7-alpine
//   REDIS_TEST_URL=redis://localhost:6390 npm test
const url = process.env.REDIS_TEST_URL;
const post = (event: string) => new Request("https://site/api/stats", { method: "POST", body: JSON.stringify({ event }) });

describe.skipIf(!url)("live stats on a real Redis (REDIS_URL)", () => {
  // Use a throwaway Redis: this resets the counters.
  beforeAll(async () => {
    const c = await createClient({ url }).connect();
    await c.del([KEYS.visit, KEYS.chosen]);
    await c.quit();
  });

  it("keeps all-time totals with no expiry", async () => {
    const run = redisRunner(url!);
    await handleStats(post("visit"), run);
    await handleStats(post("visit"), run);
    const res = await handleStats(post("chosen"), run);
    expect(await res.json()).toEqual({ visits: 2, chosen: 1 });

    const c = await createClient({ url }).connect();
    expect(await c.ttl(KEYS.visit)).toBe(-1); // -1 = no expiry
    await c.quit();
  });

  it("answers 502 when Redis can't be reached", async () => {
    const res = await handleStats(new Request("https://site/api/stats"), redisRunner("redis://localhost:1"));
    expect(res.status).toBe(502);
  });
});
