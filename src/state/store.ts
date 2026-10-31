import { createContext, use, useEffect, useState } from "react";
import { catalog, getFood } from "@/data";
import { emergencyPick, EMPTY_ANSWERS, isSafeFor, recommend, type Answers, type Recommendation } from "@/lib/recommend";
import { consume, parseQuota, remaining, rollover, type Quota } from "@/lib/quota";
import { local, readJSON, session as sessionStore, writeJSON } from "@/lib/storage";

// Session state (this visit only, sessionStorage): answers and the current pick.
// Device state (localStorage): daily limits and history. Gender and age never leave the session.

const SESSION_KEY = "ki-khabo:session:v1";
const DEVICE_KEY = "ki-khabo:device:v1";
const RECENT_LIMIT = 10;
const RECENT_AVOID = 5;

export type PickSource = "quiz" | "more" | "reject" | "emergency" | "wheel";

export type CurrentPick = {
  foodId: string;
  source: PickSource;
  /** Seed for the funny copy, so it stays the same on re-render and refresh. */
  seed: number;
  /** Locked in as today's final decision. */
  final: boolean;
};

type Session = {
  answers: Answers;
  shown: string[];
  rejected: string[];
  current: CurrentPick | null;
};

type Device = {
  quota: Quota;
  recent: string[];
  accepted: { foodId: string; at: number }[];
};

const EMPTY_SESSION: Session = { answers: EMPTY_ANSWERS, shown: [], rejected: [], current: null };

function loadSession(): Session {
  const s = readJSON(sessionStore, SESSION_KEY) as Partial<Session> | null;
  if (!s || typeof s.answers !== "object" || s.answers === null) return EMPTY_SESSION;
  return {
    answers: { ...EMPTY_ANSWERS, ...s.answers },
    shown: Array.isArray(s.shown) ? s.shown : [],
    rejected: Array.isArray(s.rejected) ? s.rejected : [],
    current: s.current && getFood(s.current.foodId) ? s.current : null,
  };
}

function loadDevice(): Device {
  const d = readJSON(local, DEVICE_KEY) as Partial<Device> | null;
  return {
    quota: parseQuota(d?.quota, new Date()),
    recent: Array.isArray(d?.recent) ? d.recent.filter((id) => typeof id === "string") : [],
    accepted: Array.isArray(d?.accepted) ? d.accepted : [],
  };
}

const newSeed = () => Math.floor(Math.random() * 2 ** 31);

export function useAppStateValue() {
  const [sessionState, setSession] = useState(loadSession);
  const [device, setDevice] = useState(loadDevice);

  useEffect(() => writeJSON(sessionStore, SESSION_KEY, sessionState), [sessionState]);
  useEffect(() => writeJSON(local, DEVICE_KEY, device), [device]);

  // Start a new day's chances if the app stays open past midnight.
  useEffect(() => {
    const check = () => setDevice((d) => ({ ...d, quota: rollover(d.quota, new Date()) }));
    document.addEventListener("visibilitychange", check);
    window.addEventListener("focus", check);
    return () => {
      document.removeEventListener("visibilitychange", check);
      window.removeEventListener("focus", check);
    };
  }, []);

  const { answers } = sessionState;

  function setAnswers(update: Partial<Answers>) {
    // New answers start a fresh round of picks (but never new daily chances).
    setSession((s) => ({ ...s, answers: { ...s.answers, ...update }, shown: [], rejected: [], current: null }));
  }

  function remember(foodId: string) {
    setDevice((d) => ({ ...d, recent: [foodId, ...d.recent.filter((id) => id !== foodId)].slice(0, RECENT_LIMIT) }));
  }

  /** Uses one suggestion chance to pick a dish. Returns false if nothing fits. */
  function suggest(source: Exclude<PickSource, "wheel">, extra: { shown?: string[]; rejected?: string[] } = {}): boolean {
    const quota = rollover(device.quota, new Date());
    const shown = extra.shown ?? sessionState.shown;
    const rejected = extra.rejected ?? sessionState.rejected;

    // Out of chances: show today's final dish, swapping it only if it's no longer safe.
    if (remaining(quota, "suggestions") === 0) {
      let food = quota.finalFoodId ? getFood(quota.finalFoodId) : undefined;
      if (!food || !isSafeFor(food, answers)) {
        food = recommend(catalog.foods, answers, { rng: Math.random })?.food;
      }
      if (!food) {
        setSession((s) => ({ ...s, current: null }));
        return false;
      }
      const finalId = food.id;
      setDevice((d) => ({ ...d, quota: { ...quota, finalFoodId: finalId } }));
      setSession((s) => ({ ...s, current: { foodId: finalId, source, seed: newSeed(), final: true } }));
      return true;
    }

    const options = {
      rng: Math.random,
      exclude: [...shown, ...device.recent.slice(0, RECENT_AVOID)],
      rejected,
    };
    const rec: Recommendation | null =
      source === "emergency" ? emergencyPick(catalog.foods, answers, options) : recommend(catalog.foods, answers, options);
    if (!rec) {
      setSession((s) => ({ ...s, shown, rejected, current: null }));
      return false;
    }

    const used = consume(quota, "suggestions");
    const final = remaining(used, "suggestions") === 0;
    setDevice((d) => ({ ...d, quota: { ...used, finalFoodId: final ? rec.food.id : used.finalFoodId } }));
    setSession((s) => ({
      ...s,
      shown: [...shown, rec.food.id],
      rejected,
      current: { foodId: rec.food.id, source, seed: newSeed(), final },
    }));
    remember(rec.food.id);
    return true;
  }

  function next(kind: "more" | "reject"): boolean {
    const current = sessionState.current;
    if (!current || current.final) return true;
    return kind === "reject"
      ? suggest("reject", { rejected: [...sessionState.rejected, current.foodId] })
      : suggest("more", { shown: [...sessionState.shown, current.foodId] });
  }

  function showWheelPick(foodId: string) {
    setSession((s) => ({ ...s, current: { foodId, source: "wheel", seed: newSeed(), final: false } }));
  }

  /** Uses one wheel spin. Returns false when today's spins are used up. */
  function spendSpin(): boolean {
    const quota = rollover(device.quota, new Date());
    if (remaining(quota, "spins") === 0) return false;
    setDevice((d) => ({ ...d, quota: consume(quota, "spins") }));
    return true;
  }

  function accept() {
    const current = sessionState.current;
    if (!current) return;
    setDevice((d) => ({ ...d, accepted: [{ foodId: current.foodId, at: Date.now() }, ...d.accepted].slice(0, 30) }));
  }

  /** Clears history and answers. Daily chances stay, so this isn't a way around the limit. */
  function clearHistory() {
    setDevice((d) => ({ ...d, recent: [], accepted: [] }));
    setSession(EMPTY_SESSION);
  }

  return {
    answers,
    current: sessionState.current,
    lastAccepted: device.accepted[0]?.foodId ?? null,
    suggestionsLeft: remaining(device.quota, "suggestions"),
    spinsLeft: remaining(device.quota, "spins"),
    setAnswers,
    suggest,
    next,
    showWheelPick,
    spendSpin,
    accept,
    clearHistory,
  };
}

export type AppState = ReturnType<typeof useAppStateValue>;

export const AppStateContext = createContext<AppState | null>(null);

export function useAppState(): AppState {
  const value = use(AppStateContext);
  if (!value) throw new Error("useAppState must be used inside AppStateProvider");
  return value;
}
