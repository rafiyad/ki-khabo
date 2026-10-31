import type { ReactNode } from "react";
import { Sticker } from "@/components/Sticker";
import type { Food } from "@/data/foods";
import { cn } from "@/lib/cn";

/**
 * The dish's picture: a real photo when `food.image` is set, otherwise the emoji.
 * Add photos later by filling `image` in src/data/foods.ts; nothing else changes.
 */
export function FoodVisual({ food, className, wobble = false }: { food: Food; className?: string; wobble?: boolean }) {
  if (food.image) {
    return <img src={food.image.src} alt={food.image.alt} loading="lazy" className={cn("h-full w-full object-cover", className)} />;
  }
  return (
    <span role="img" aria-label={food.name} className={cn("inline-block leading-none", wobble && "motion-safe:animate-wobble-slow", className)}>
      {food.emoji}
    </span>
  );
}

type Props = {
  food: Food;
  badge?: string;
  children: ReactNode;
  className?: string;
};

/** Result card: picture on top, details below. */
export function FoodCard({ food, badge, children, className }: Props) {
  return (
    <article className={cn("ink-outline overflow-hidden rounded-result bg-white", className)}>
      <div className="relative flex h-40 items-center justify-center border-b-2 border-ink bg-haldi">
        <FoodVisual food={food} wobble className={food.image ? undefined : "text-[86px]"} />
        {badge && (
          <Sticker tone="white" className="absolute top-3 left-3">
            {badge}
          </Sticker>
        )}
      </div>
      <div className="p-4">{children}</div>
    </article>
  );
}
