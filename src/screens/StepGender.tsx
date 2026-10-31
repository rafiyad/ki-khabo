import { useState } from "react";
import { useNavigate } from "react-router";
import { OptionCard } from "@/components/OptionCard";
import { OptionGroup } from "@/components/OptionGroup";
import { StepLayout } from "@/components/StepLayout";
import { bn } from "@/content/bn";
import { GENDERS } from "@/data/options";
import { useAppState } from "@/state/store";

export function StepGender() {
  const { answers, setAnswers } = useAppState();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const t = bn.steps.gender;

  return (
    <StepLayout
      step={1}
      title={t.title}
      subtitle={t.subtitle}
      error={error}
      backTo="/"
      onNext={() => (answers.gender ? navigate("/step/age") : setError(t.error))}
    >
      <OptionGroup min={130}>
        {GENDERS.map((g) => (
          <OptionCard
            key={g.id}
            emoji={g.emoji}
            label={g.label}
            large
            selected={answers.gender === g.id}
            onClick={() => {
              setAnswers({ gender: g.id });
              setError(null);
            }}
          />
        ))}
      </OptionGroup>
    </StepLayout>
  );
}
