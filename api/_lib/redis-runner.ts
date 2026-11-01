import { createClient } from "redis";
import type { RedisRunner } from "./stats-core.js";

// Redis over a normal connection (REDIS_URL), e.g. the "Redis" database from the
// Vercel Marketplace. The client is kept between calls while the function stays warm.

const CONNECT_TIMEOUT_MS = 3000;

function newClient(url: string) {
  const client = createClient({ url, socket: { connectTimeout: CONNECT_TIMEOUT_MS, reconnectStrategy: false } });
  // Without a listener, a dropped connection would crash the function.
  client.on("error", () => {
    if (current?.client === client) current = null;
  });
  return client;
}

let current: { url: string; client: ReturnType<typeof newClient>; ready: Promise<unknown> } | null = null;

async function connected(url: string) {
  if (current?.url !== url) {
    const client = newClient(url);
    current = { url, client, ready: client.connect() };
  }
  const { client, ready } = current;
  try {
    await ready;
  } catch (e) {
    if (current?.client === client) current = null;
    throw e;
  }
  return client;
}

export function redisRunner(url: string): RedisRunner {
  return async (commands) => {
    const multi = (await connected(url)).multi();
    for (const command of commands) multi.addCommand(command.map(String));
    return (await multi.exec()) as unknown[];
  };
}
