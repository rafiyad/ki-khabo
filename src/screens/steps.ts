import type { Answers } from "@/lib/recommend";

// Quiz order. A step can only be opened once every earlier answer exists.
export const STEPS = [
  { path: "/step/gender", key: "gender" },
  { path: "/step/age", key: "age" },
  { path: "/step/mood", key: "mood" },
  { path: "/step/meal", key: "meal" },
  { path: "/step/budget", key: "budget" },
] as const satisfies readonly { path: string; key: keyof Answers }[];

/** Path of the first unanswered step before `stepIndex`, or null if all are answered. */
export function missingBefore(answers: Answers, stepIndex: number): string | null {
  const missing = STEPS.slice(0, stepIndex).find((s) => answers[s.key] === null);
  return missing ? missing.path : null;
}

/** Enough to pick a dish: the engine never uses gender or age, so quick mode can skip them. */
export const isReady = (answers: Answers) => answers.mood !== null && answers.meal !== null && answers.budget !== null;
