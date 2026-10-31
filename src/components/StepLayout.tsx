import type { ReactNode } from "react";
import { Button, ButtonLink } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { ProgressBar } from "@/components/ProgressBar";
import { bn } from "@/content/bn";
import { bnDigits } from "@/lib/bn-number";

export const STEP_COUNT = 5;

type Props = {
  step: number; // 1-based
  title: string;
  subtitle: string;
  error: string | null;
  backTo: string;
  onNext: () => void;
  nextLabel?: string;
  children: ReactNode;
};

/** One question per screen: progress, question, answers, error, back/next. */
export function StepLayout({ step, title, subtitle, error, backTo, onNext, nextLabel = bn.steps.next, children }: Props) {
  const label = bn.steps.of(bnDigits(step), bnDigits(STEP_COUNT));
  return (
    <section aria-labelledby="step-title">
      <div className="mb-1 flex justify-between text-[13px] font-bold">
        <span>{label}</span>
        <span className="text-muted">{bn.steps.cheers[step - 1]}</span>
      </div>
      <ProgressBar value={(step / STEP_COUNT) * 100} label={label} className="mb-4" />
      <div id="step-title">
        <Heading title={title} className="text-[22px] leading-snug">
          {title}
        </Heading>
      </div>
      <p className="mt-0.5 mb-3 text-muted">{subtitle}</p>
      {children}
      <p role="alert" className="mt-1.5 min-h-5 text-[13px] font-semibold text-morich-dark">
        {error}
      </p>
      <div className="mt-3 flex gap-2.5">
        <ButtonLink to={backTo}>{bn.steps.back}</ButtonLink>
        <Button variant="primary" className="flex-1" onClick={onNext}>
          {nextLabel}
        </Button>
      </div>
    </section>
  );
}
