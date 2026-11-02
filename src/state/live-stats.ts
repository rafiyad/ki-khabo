import { useSyncExternalStore } from "react";
import { dhakaDay, parseMarks, parseStats, type LiveStats, type StatsMarks } from "@/lib/stats";
import { local, readJSON, writeJSON } from "@/lib/storage";

// All-time live counters for the header. Each device adds one visit per Dhaka day,
// and one "chosen" per dish it accepts ("এইটাই খাবো"; the same pick only once, even
// after a reload). Only the event name is sent: no mood, answers or dish ids.
// If the API isn't reachable the badge stays hidden.

const MARKS_KEY = "ki-khabo:stats:v1";
const REFRESH_MS = 60_000;

let snapshot: LiveStats | null = null;
let lastFetch = 0;
// One request per event at a time, so StrictMode's double effect or fast taps can't count twice.
const pending = new Set<"visit" | "chosen">();
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function marks(): StatsMarks {
  return parseMarks(readJSON(local, MARKS_KEY));
}

/** Sends an event unless `mark` already holds `value`; saves the mark only after the server has it. */
function countOnce<K extends keyof StatsMarks>(event: "visit" | "chosen", mark: K, value: NonNullable<StatsMarks[K]>) {
  if (marks()[mark] === value || pending.has(event)) return;
  pending.add(event);
  void request(event).then((ok) => {
    pending.delete(event);
    if (ok) writeJSON(local, MARKS_KEY, { ...marks(), [mark]: value });
  });
}

async function request(event: "visit" | "chosen" | null): Promise<boolean> {
  lastFetch = Date.now();
  try {
    const res = await fetch("/api/stats", {
      method: event ? "POST" : "GET",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: event ? JSON.stringify({ event }) : undefined,
    });
    if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) return false;
    const stats = parseStats(await res.json());
    if (!stats) return false;
    snapshot = stats;
    emit();
    return true;
  } catch {
    return false;
  }
}

/** Counts this device's visit (once per Dhaka day) and loads the totals. Call once on app start. */
export function startLiveStats(): () => void {
  const today = dhakaDay(new Date());
  if (marks().visitDay === today) {
    if (!snapshot) void request(null);
  } else {
    countOnce("visit", "visitDay", today);
  }

  const refresh = () => {
    if (document.visibilityState === "visible" && Date.now() - lastFetch > REFRESH_MS) void request(null);
  };
  document.addEventListener("visibilitychange", refresh);
  return () => document.removeEventListener("visibilitychange", refresh);
}

/** Adds one dish chosen. `pickSeed` identifies the pick, so accepting it again after a reload doesn't count twice. */
export function trackChosen(pickSeed: number): void {
  countOnce("chosen", "chosenPick", pickSeed);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useLiveStats(): LiveStats | null {
  return useSyncExternalStore(subscribe, () => snapshot);
}
