import { BATTLES } from "@/data/battles";
import { FOODS, type Food } from "@/data/foods";
import { DEFAULT_HEALTH, HEALTH, type Health } from "@/data/health";
import { SEASON_FOODS } from "@/data/seasons";

// The one place the app reads catalog data from. Moving the data to an API or
// database later means changing this file, not the engine or the screens.

const BY_ID = new Map(FOODS.map((f) => [f.id, f]));

export const catalog = {
  foods: FOODS,
  battles: BATTLES,
  seasons: SEASON_FOODS,
};

export function getFood(id: string): Food | undefined {
  return BY_ID.get(id);
}

export function getHealth(id: string): Health {
  return HEALTH[id] ?? DEFAULT_HEALTH;
}
