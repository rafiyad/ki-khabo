// Dishes featured by each seasonal mode (src/lib/season.ts decides which mode is on).
// The first dish that's safe for the user is shown; any can be added or reordered.

export type SeasonId = "ramadan" | "winter" | "monsoon";

export const SEASON_FOODS: Record<SeasonId, string[]> = {
  ramadan: ["beguni-piyaju", "alur-chop", "ghugni", "haleem", "jilapi", "lebu-shorbot", "chotpoti", "lassi"],
  winter: ["pitha", "chitoi-pitha", "patishapta", "hasher-mangsho", "khashir-paya", "nihari", "khichuri-dim", "cha-singara"],
  monsoon: ["khichuri-ilish", "bhuna-khichuri", "khichuri-dim", "shobji-khichuri", "beguni-piyaju", "cha-singara"],
};
