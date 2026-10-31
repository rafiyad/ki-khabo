const DIGITS = "০১২৩৪৫৬৭৮৯";

/** Replaces Latin digits with Bengali ones: 180 → "১৮০". */
export function bnDigits(value: number | string): string {
  return String(value).replace(/\d/g, (d) => DIGITS[Number(d)]);
}

/** "13:05" style clock time in Bengali digits. */
export function bnTime(date: Date): string {
  return `${bnDigits(date.getHours())}:${bnDigits(String(date.getMinutes()).padStart(2, "0"))}`;
}
