import { BATTLES } from "@/data/battles";
import { FOODS, type Food } from "@/data/foods";

// The one place the app reads catalog data from. Moving the data to an API or
// database later means changing this file, not the engine or the screens.

const BY_ID = new Map(FOODS.map((f) => [f.id, f]));

export const catalog = {
  foods: FOODS,
  battles: BATTLES,
};

export function getFood(id: string): Food | undefined {
  return BY_ID.get(id);
}
