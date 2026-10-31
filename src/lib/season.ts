import type { SeasonId } from "@/data/seasons";

// Seasonal modes: Ramadan (from the Islamic calendar), winter and monsoon.
// Ramadan wins when seasons overlap.

const RAMADAN_MONTH = 9;

/** True during Ramadan, using the browser's Islamic (Umm al-Qura) calendar. Off if unsupported. */
export function isRamadan(date: Date): boolean {
  try {
    const month = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", { month: "numeric" })
      .formatToParts(date)
      .find((p) => p.type === "month")?.value;
    return Number(month) === RAMADAN_MONTH;
  } catch {
    return false;
  }
}

export function seasonFor(date: Date): SeasonId | null {
  if (isRamadan(date)) return "ramadan";
  const month = date.getMonth() + 1;
  if (month === 12 || month <= 2) return "winter";
  // Bangladesh's rainy season, stretched to October for the late rains.
  if (month >= 6 && month <= 10) return "monsoon";
  return null;
}
