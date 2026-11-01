// Dishes featured by each seasonal mode (src/lib/season.ts decides which mode is on).
// The first dish that's safe for the user is shown; any can be added or reordered.

export type SeasonId = "ramadan" | "winter" | "monsoon";

export const SEASON_FOODS: Record<SeasonId, string[]> = {
  ramadan: ["beguni-piyaju", "haleem", "jilapi", "chotpoti", "lassi"],
  winter: ["pitha", "nihari", "khichuri-dim", "cha-singara"],
  monsoon: ["khichuri-dim", "shobji-khichuri", "beguni-piyaju", "cha-singara"],
};
