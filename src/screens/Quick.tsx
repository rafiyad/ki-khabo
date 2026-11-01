import { useNavigate } from "react-router";
import { ButtonLink } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { Heading } from "@/components/Heading";
import { OptionCard } from "@/components/OptionCard";
import { OptionGroup } from "@/components/OptionGroup";
import { bn } from "@/content/bn";
import { BUDGETS, CATEGORIES, DIETS, MOODS, RESTRICTIONS } from "@/data/options";
import { useAppState } from "@/state/store";

/** Quick mode: one tap on a mood, everything else from last time. */
export function Quick() {
  const { prefs, quickStart } = useAppState();
  const navigate = useNavigate();
  const t = bn.quick;

  if (!prefs) {
    return (
      <section className="py-6 text-center">
        <Heading title={t.title} className="text-[22px]">
          {t.title}
        </Heading>
        <p className="mt-2 mb-4 text-muted">{t.none}</p>
        <ButtonLink to="/step/gender" variant="primary">
          {t.start}
        </ButtonLink>
      </section>
    );
  }

  const saved = [
    BUDGETS.find((b) => b.id === prefs.budget),
    DIETS.find((d) => d.id === prefs.diet && d.id !== "any"),
    ...CATEGORIES.filter((c) => prefs.categories.includes(c.id)),
    ...RESTRICTIONS.filter((r) => prefs.avoid.includes(r.id)),
  ].filter((o) => o !== undefined);

  return (
    <section>
      <Heading title={t.title} className="text-[22px] leading-snug">
        {t.title}
      </Heading>
      <p className="mt-0.5 mb-2 text-muted">{t.subtitle}</p>
      <div className="mb-3 flex flex-wrap items-center gap-1.5 text-[13px] font-semibold">
        <span>{t.saved}</span>
        {saved.map((o) => (
          <Chip key={o.id} tone="white">
            {o.emoji} {o.label}
          </Chip>
        ))}
      </div>

      <OptionGroup min={98}>
        {MOODS.map((m) => (
          <OptionCard
            key={m.id}
            emoji={m.emoji}
            label={m.label}
            sub={m.sub}
            onClick={() => {
              if (quickStart(m.id)) navigate("/loading");
            }}
          />
        ))}
      </OptionGroup>

      <div className="mt-4 text-center">
        <ButtonLink to="/step/gender">{t.edit}</ButtonLink>
      </div>
    </section>
  );
}
