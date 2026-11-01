import { sample, type Rng } from "@/lib/rng";

// Friend challenge: "guess what I'll eat today". Everything lives in the link
// (/c?d=<code>), so there's no server. The code is base64url JSON: it only hides
// the answer from a quick glance, it isn't a secret.

export const CHALLENGE_OPTIONS = 4;
export const NAME_MAX = 20;

export type Challenge = {
  /** Optional nickname the sender typed. Empty means "your friend". */
  name: string;
  /** Dish ids in display order; one of them is the answer. */
  options: string[];
  answer: string;
};

/** Trims, drops control characters, and caps the length (by characters, not bytes). */
export function cleanName(name: string): string {
  const cleaned = name.replace(/[\p{Cc}\p{Cf}]/gu, "").replace(/\s+/g, " ").trim();
  return Array.from(cleaned).slice(0, NAME_MAX).join("");
}

export function makeChallenge(answer: string, allIds: readonly string[], name: string, rng: Rng): Challenge {
  const decoys = sample(
    allIds.filter((id) => id !== answer),
    CHALLENGE_OPTIONS - 1,
    rng,
  );
  return { name: cleanName(name), options: sample([answer, ...decoys], CHALLENGE_OPTIONS, rng), answer };
}

function toBase64Url(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(code: string): string {
  const b64 = code.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4));
  return new TextDecoder().decode(Uint8Array.from(binary, (c) => c.charCodeAt(0)));
}

export function encodeChallenge(c: Challenge): string {
  return toBase64Url(JSON.stringify({ v: 1, n: c.name, o: c.options, a: c.options.indexOf(c.answer) }));
}

/** Reads a code from a link. Returns null for anything broken, old or pointing at unknown dishes. */
export function decodeChallenge(code: string, isKnown: (id: string) => boolean): Challenge | null {
  try {
    const raw = JSON.parse(fromBase64Url(code)) as { v?: unknown; n?: unknown; o?: unknown; a?: unknown };
    if (raw.v !== 1 || !Array.isArray(raw.o) || typeof raw.a !== "number") return null;
    const options = raw.o.filter((id): id is string => typeof id === "string" && isKnown(id));
    if (options.length !== raw.o.length || options.length < 2 || new Set(options).size !== options.length) return null;
    const answer = options[raw.a];
    if (!answer) return null;
    return { name: typeof raw.n === "string" ? cleanName(raw.n) : "", options, answer };
  } catch {
    return null;
  }
}

export const challengeUrl = (origin: string, c: Challenge) => `${origin}/c?d=${encodeChallenge(c)}`;
