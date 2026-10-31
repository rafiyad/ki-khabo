import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { OptionCard } from "@/components/OptionCard";
import { OptionGroup } from "@/components/OptionGroup";
import { StepLayout } from "@/components/StepLayout";
import { bn } from "@/content/bn";
import { AGES } from "@/data/options";
import { useAppState } from "@/state/store";
import { missingBefore } from "@/screens/steps";

export function StepAge() {
  const { answers, setAnswers } = useAppState();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const t = bn.steps.age;

  const missing = missingBefore(answers, 1);
  if (missing) return <Navigate to={missing} replace />;

  return (
    <StepLayout
      step={2}
      title={t.title}
      subtitle={t.subtitle}
      error={error}
      backTo="/step/gender"
      onNext={() => (answers.age ? navigate("/step/mood") : setError(t.error))}
    >
      <OptionGroup min={100}>
        {AGES.map((a) => (
          <OptionCard
            key={a.id}
            emoji={a.emoji}
            label={a.label}
            selected={answers.age === a.id}
            onClick={() => {
              setAnswers({ age: a.id });
              setError(null);
            }}
          />
        ))}
      </OptionGroup>
    </StepLayout>
  );
}
