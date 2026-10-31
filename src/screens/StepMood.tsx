import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Button } from "@/components/Button";
import { OptionCard } from "@/components/OptionCard";
import { OptionGroup } from "@/components/OptionGroup";
import { StepLayout } from "@/components/StepLayout";
import { bn } from "@/content/bn";
import { MOOD_LIST_BY_GENDER, MOODS } from "@/data/options";
import { useAppState } from "@/state/store";
import { missingBefore } from "@/screens/steps";

export function StepMood() {
  const { answers, setAnswers } = useAppState();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const shortList = answers.gender ? MOOD_LIST_BY_GENDER[answers.gender] : MOODS.map((m) => m.id);
  // Start with the full list if the saved mood isn't in the short one.
  const [showAll, setShowAll] = useState(() => answers.mood !== null && !shortList.includes(answers.mood));
  const t = bn.steps.mood;

  const missing = missingBefore(answers, 2);
  if (missing) return <Navigate to={missing} replace />;

  const moods = showAll ? MOODS : MOODS.filter((m) => shortList.includes(m.id));
  const canToggle = shortList.length < MOODS.length;

  return (
    <StepLayout
      step={3}
      title={t.title}
      subtitle={t.subtitle}
      error={error}
      backTo="/step/age"
      onNext={() => (answers.mood ? navigate("/step/meal") : setError(t.error))}
    >
      <OptionGroup min={98}>
        {moods.map((m) => (
          <OptionCard
            key={m.id}
            emoji={m.emoji}
            label={m.label}
            sub={m.sub}
            selected={answers.mood === m.id}
            onClick={() => {
              setAnswers({ mood: m.id });
              setError(null);
            }}
          />
        ))}
      </OptionGroup>
      {canToggle && (
        <Button className="mt-3 w-full" aria-expanded={showAll} onClick={() => setShowAll((v) => !v)}>
          {showAll ? t.showLess : t.showAll}
        </Button>
      )}
    </StepLayout>
  );
}
