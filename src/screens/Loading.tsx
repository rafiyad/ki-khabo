import { useEffect, useEffectEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Heading } from "@/components/Heading";
import { ProgressBar } from "@/components/ProgressBar";
import { bn } from "@/content/bn";
import { useAppState } from "@/state/store";
import { isComplete } from "@/screens/steps";

const STEP_MS = 650;

export function Loading() {
  const { answers, suggest } = useAppState();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const complete = isComplete(answers);
  const messages = bn.loading;

  const finish = useEffectEvent(() => {
    suggest("quiz");
    navigate("/result", { replace: true });
  });

  // Show each message in turn, then pick a dish and open the result.
  useEffect(() => {
    if (!complete) return;
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      if (i < messages.length) {
        setIndex(i);
      } else {
        window.clearInterval(timer);
        finish();
      }
    }, STEP_MS);
    return () => window.clearInterval(timer);
  }, [complete, messages.length]);

  if (!complete) return <Navigate to="/step/gender" replace />;

  return (
    <section className="py-10 text-center">
      <div aria-hidden className="inline-block text-[64px] motion-safe:animate-wobble-fast">
        🍽️
      </div>
      <Heading title="খুঁজছি..." className="mt-4 text-[19px]">
        <span aria-live="polite">{messages[Math.min(index, messages.length - 1)]}</span>
      </Heading>
      <ProgressBar
        value={Math.min(100, ((index + 1) / messages.length) * 100)}
        label="খাবার খোঁজার অগ্রগতি"
        className="mx-auto mt-4 max-w-64"
      />
    </section>
  );
}
