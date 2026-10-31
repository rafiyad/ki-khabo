import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { OptionCard } from "@/components/OptionCard";
import { OptionGroup } from "@/components/OptionGroup";
import { StepLayout } from "@/components/StepLayout";
import { bn } from "@/content/bn";
import { BUDGETS, CATEGORIES, DIETS, RESTRICTIONS } from "@/data/options";
import { useAppState } from "@/state/store";
import { missingBefore } from "@/screens/steps";

const toggle = <T,>(list: T[], item: T) => (list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);

export function StepBudget() {
  const { answers, setAnswers } = useAppState();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const t = bn.steps.budget;

  const missing = missingBefore(answers, 4);
  if (missing) return <Navigate to={missing} replace />;

  return (
    <StepLayout
      step={5}
      title={t.title}
      subtitle={t.subtitle}
      error={error}
      backTo="/step/meal"
      nextLabel={bn.steps.find}
      onNext={() => (answers.budget ? navigate("/loading") : setError(t.error))}
    >
      <OptionGroup min={110}>
        {BUDGETS.map((b) => (
          <OptionCard
            key={b.id}
            emoji={b.emoji}
            label={b.label}
            sub={b.sub}
            selected={answers.budget === b.id}
            onClick={() => {
              setAnswers({ budget: b.id });
              setError(null);
            }}
          />
        ))}
      </OptionGroup>

      <OptionGroup label={t.diet} columns={3}>
        {DIETS.map((d) => (
          <OptionCard
            key={d.id}
            emoji={d.emoji}
            label={d.label}
            selected={answers.diet === d.id}
            onClick={() => setAnswers({ diet: d.id })}
          />
        ))}
      </OptionGroup>

      <OptionGroup label={t.categories} hint={t.multiple} min={110}>
        {CATEGORIES.map((c) => (
          <OptionCard
            key={c.id}
            emoji={c.emoji}
            label={c.label}
            selected={answers.categories.includes(c.id)}
            onClick={() => setAnswers({ categories: toggle(answers.categories, c.id) })}
          />
        ))}
      </OptionGroup>

      <OptionGroup label={t.restrictions} hint={t.multiple} min={110}>
        {RESTRICTIONS.map((r) => (
          <OptionCard
            key={r.id}
            emoji={r.emoji}
            label={r.label}
            selected={answers.avoid.includes(r.id)}
            onClick={() => setAnswers({ avoid: toggle(answers.avoid, r.id) })}
          />
        ))}
      </OptionGroup>
    </StepLayout>
  );
}
