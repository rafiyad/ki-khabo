import { useSyncExternalStore } from "react";
import { dhakaDay, parseMarks, parseStats, type LiveStats, type StatsMarks } from "@/lib/stats";
import { local, readJSON, writeJSON } from "@/lib/storage";

// Today's live counters for the header. Each device counts once a day as a visit,
// and once a day as "chose a dish" (first "এইটাই খাবো"). Only the event name is
// sent: no mood, answers or ids. If the API isn't reachable the badge stays hidden.

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

/** Sends an event once per device per Dhaka day; marks it only after the server has it. */
function countOnce(event: "visit" | "chosen", mark: keyof StatsMarks) {
  const today = dhakaDay(new Date());
  if (marks()[mark] === today || pending.has(event)) return;
  pending.add(event);
  void request(event).then((ok) => {
    pending.delete(event);
    if (ok) writeJSON(local, MARKS_KEY, { ...marks(), [mark]: today });
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

/** Counts this device's visit (once a day) and loads today's numbers. Call once on app start. */
export function startLiveStats(): () => void {
  if (marks().visitDay === dhakaDay(new Date())) {
    if (!snapshot) void request(null);
  } else {
    countOnce("visit", "visitDay");
  }

  const refresh = () => {
    if (document.visibilityState === "visible" && Date.now() - lastFetch > REFRESH_MS) void request(null);
  };
  document.addEventListener("visibilitychange", refresh);
  return () => document.removeEventListener("visibilitychange", refresh);
}

/** Counts this device as "chose a dish today" the first time it accepts one. */
export function trackChosen(): void {
  countOnce("chosen", "chosenDay");
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useLiveStats(): LiveStats | null {
  return useSyncExternalStore(subscribe, () => snapshot);
}
