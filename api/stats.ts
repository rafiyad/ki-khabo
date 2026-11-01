// Vercel Function at /api/stats (Web Request/Response handlers). Logic lives in _lib/stats-core.ts.
// Uses Upstash's HTTPS API when its variables are set, otherwise REDIS_URL.
import { redisRunner } from "./_lib/redis-runner.js";
import { handleStats, upstashRunner } from "./_lib/stats-core.js";

const run = upstashRunner(process.env, fetch) ?? (process.env.REDIS_URL ? redisRunner(process.env.REDIS_URL) : null);

export function GET(request: Request): Promise<Response> {
  return handleStats(request, run, new Date());
}

export function POST(request: Request): Promise<Response> {
  return handleStats(request, run, new Date());
}
