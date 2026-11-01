import { bn } from "@/content/bn";
import { bnCount } from "@/lib/stats";
import { useLiveStats } from "@/state/live-stats";

/** Today's visitors and people who chose a dish, top right. Hidden until the numbers load. */
export function LiveStatsBadge() {
  const stats = useLiveStats();
  if (!stats) return null;
  const t = bn.stats;
  return (
    <p className="ink-outline rounded-chip bg-white px-2.5 py-1 text-right text-[12px] leading-snug font-bold text-ink">
      <span className="sr-only">{t.label}: </span>
      <span className="block">
        <span aria-hidden className="mr-1 inline-block h-2 w-2 rounded-full bg-morich motion-safe:animate-pulse-soft" />
        <span aria-hidden>👀 </span>
        {t.visits(bnCount(stats.visits))}
      </span>
      <span className="block">
        <span aria-hidden>😋 </span>
        {t.chosen(bnCount(stats.chosen))}
      </span>
    </p>
  );
}
