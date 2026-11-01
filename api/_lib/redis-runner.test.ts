import { afterAll, describe, expect, it } from "vitest";
import { createClient } from "redis";
import { redisRunner } from "./redis-runner.js";
import { handleStats, statsKey } from "./stats-core.js";

// Runs against a real Redis only when REDIS_TEST_URL is set, e.g.
//   docker run --rm -p 6390:6379 redis:7-alpine
//   REDIS_TEST_URL=redis://localhost:6390 npm test
const url = process.env.REDIS_TEST_URL;
const DAY = new Date(Date.UTC(2030, 0, 1, 12));
const post = (event: string) => new Request("https://site/api/stats", { method: "POST", body: JSON.stringify({ event }) });

describe.skipIf(!url)("live stats on a real Redis (REDIS_URL)", () => {
  afterAll(async () => {
    const c = await createClient({ url }).connect();
    await c.del([statsKey("2030-01-01", "visits"), statsKey("2030-01-01", "chosen")]);
    await c.quit();
  });

  it("counts and expires keys", async () => {
    const run = redisRunner(url!);
    await handleStats(post("visit"), run, DAY);
    await handleStats(post("visit"), run, DAY);
    const res = await handleStats(post("chosen"), run, DAY);
    expect(await res.json()).toEqual({ day: "2030-01-01", visits: 2, chosen: 1 });

    const c = await createClient({ url }).connect();
    expect(await c.ttl(statsKey("2030-01-01", "visits"))).toBeGreaterThan(0);
    await c.quit();
  });

  it("answers 502 when Redis can't be reached", async () => {
    const res = await handleStats(new Request("https://site/api/stats"), redisRunner("redis://localhost:1"), DAY);
    expect(res.status).toBe(502);
  });
});
