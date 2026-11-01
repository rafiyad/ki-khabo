import { bn } from "@/content/bn";
import type { Food } from "@/data/foods";
import { bnDigits } from "@/lib/bn-number";
import { dayKey } from "@/lib/quota";
import { pickOne, seeded } from "@/lib/rng";

// "আজকের খাবার-রাশিফল": one dish per day, the same for everyone, so friends see
// the same thing and talk about it. Seeded by the local date, so no server.

export type Horoscope = { food: Food; line: string; luckyTime: string; buddy: string };

/** Small string hash (FNV-1a) used as the day's seed. */
export function hashString(text: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

const PERIODS = [
  { from: 8, label: "সকাল" },
  { from: 12, label: "দুপুর" },
  { from: 16, label: "বিকেল" },
  { from: 18, label: "সন্ধ্যা" },
  { from: 20, label: "রাত" },
];

export function horoscopeFor(date: Date, foods: readonly Food[]): Horoscope {
  const rng = seeded(hashString(`horoscope:${dayKey(date)}`));
  const food = pickOne(foods, rng);
  const hour = 8 + Math.floor(rng() * 14); // 8am–9pm
  const minute = Math.floor(rng() * 60);
  const period = [...PERIODS].reverse().find((p) => hour >= p.from)!.label;
  const clock = `${bnDigits(hour > 12 ? hour - 12 : hour)}টা ${bnDigits(String(minute).padStart(2, "0"))}`;
  return {
    food,
    line: pickOne(bn.horoscope.lines, rng)(food.name),
    luckyTime: bn.horoscope.luckyTime(`${period} ${clock}`),
    buddy: bn.horoscope.buddy(pickOne(bn.horoscope.buddies, rng)),
  };
}
