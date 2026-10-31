import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { OptionCard } from "@/components/OptionCard";
import { OptionGroup } from "@/components/OptionGroup";
import { StepLayout } from "@/components/StepLayout";
import { bn } from "@/content/bn";
import { MEAL_NAMES, MEALS } from "@/data/options";
import { bnTime } from "@/lib/bn-number";
import { mealForHour } from "@/lib/meal-time";
import { useAppState } from "@/state/store";
import { missingBefore } from "@/screens/steps";

export function StepMeal() {
  const { answers, setAnswers } = useAppState();
  const navigate = useNavigate();
  const [now] = useState(() => new Date());
  const t = bn.steps.meal;

  const missing = missingBefore(answers, 3);
  if (missing) return <Navigate to={missing} replace />;

  // Until the user taps a meal, pre-select one from the clock.
  const autoMeal = mealForHour(now.getHours());
  const selected = answers.meal ?? autoMeal;

  return (
    <StepLayout
      step={4}
      title={t.title}
      subtitle={t.subtitle}
      error={null}
      backTo="/step/mood"
      onNext={() => {
        if (answers.meal === null) setAnswers({ meal: autoMeal });
        navigate("/step/budget");
      }}
    >
      <OptionGroup min={120}>
        {MEALS.map((m) => (
          <OptionCard
            key={m.id}
            emoji={m.emoji}
            label={m.label}
            sub={m.sub}
            selected={selected === m.id}
            onClick={() => {
              setAnswers({ meal: m.id });
            }}
          />
        ))}
      </OptionGroup>
      <p aria-live="polite" className="mt-2.5 min-h-6 text-sm font-semibold text-dhonepata-dark">
        {answers.meal === null ? t.auto(bnTime(now), MEAL_NAMES[autoMeal]) : null}
      </p>
    </StepLayout>
  );
}
