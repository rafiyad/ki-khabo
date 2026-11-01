import { bn } from "@/content/bn";
import type { Health, Level } from "@/data/health";
import { cn } from "@/lib/cn";

const METERS = ["oil", "spice", "heavy"] as const;

/** "পেট-শান্তি মিটার": oil, spice and heaviness as 1–3 icons, with the level in words for screen readers. */
export function HealthMeter({ health, className }: { health: Health; className?: string }) {
  const t = bn.health;
  return (
    <div className={className}>
      <h2 className="mb-1 font-bold">{t.meterTitle}</h2>
      <ul className="grid grid-cols-3 gap-2 text-center text-[13px] font-semibold">
        {METERS.map((key) => {
          const level: Level = health[key];
          return (
            <li key={key} className="rounded-chip bg-cream px-1.5 py-1.5">
              <span aria-hidden className="block text-base leading-tight tracking-tight">
                {t.icons[key].repeat(level)}
                <span className="opacity-25">{t.icons[key].repeat(3 - level)}</span>
              </span>
              {t.meters[key]}: {t.levels[level - 1]}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** The dish's funny warning, in the style of the boxed warning on cigarette packs. */
export function HealthWarning({ health, className }: { health: Health; className?: string }) {
  return (
    <div className={cn("rounded-chip border-2 border-dashed border-ink bg-haldi/40 px-2.5 py-2 text-[13px]", className)}>
      <p className="font-bold">{bn.health.warningTitle}</p>
      <p className="font-medium">{health.warning}</p>
    </div>
  );
}
