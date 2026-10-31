import { useState } from "react";
import { Button, ButtonLink } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { Confetti } from "@/components/Confetti";
import { useConfetti } from "@/components/use-confetti";
import { FoodCard } from "@/components/FoodCard";
import { Heading } from "@/components/Heading";
import { Mascot, type MascotExpression } from "@/components/Mascot";
import { ProgressBar } from "@/components/ProgressBar";
import { bn } from "@/content/bn";
import { getFood } from "@/data";
import { CARE_MOODS, MOODS } from "@/data/options";
import { bnDigits } from "@/lib/bn-number";
import { resultCopy, roastLine } from "@/lib/humor";
import { describe } from "@/lib/recommend";
import { pickOne, seeded } from "@/lib/rng";
import { useAppState, type CurrentPick } from "@/state/store";

export function Result() {
  const { current } = useAppState();
  const food = current ? getFood(current.foodId) : undefined;
  if (!current || !food) return <NoResult />;
  // Re-mount per pick so "accepted" and animations reset for each new dish.
  return <ResultView key={current.seed} current={current} />;
}

function NoResult() {
  return (
    <section className="py-8 text-center">
      <Mascot expression="sad" className="mx-auto w-28" />
      <Heading title="খাবার পাওয়া যায়নি" className="mt-3 text-xl leading-snug">
        {bn.result.noResult}
      </Heading>
      <div className="mt-5 flex flex-wrap justify-center gap-2.5">
        <ButtonLink to="/step/budget" variant="primary">
          {bn.result.editAnswers}
        </ButtonLink>
        <ButtonLink to="/">{bn.notFound.home}</ButtonLink>
      </div>
    </section>
  );
}

function ResultView({ current }: { current: CurrentPick }) {
  const { answers, next, accept, suggestionsLeft } = useAppState();
  const [accepted, setAccepted] = useState(false);
  const { pieces, fire } = useConfetti();

  const food = getFood(current.foodId)!;
  const rec = describe(food, answers);
  const rng = seeded(current.seed);
  const copy = resultCopy(rec, answers, rng);
  const mood = MOODS.find((m) => m.id === answers.mood);
  const t = bn.result;

  const headline = current.source === "emergency" ? t.emergencyHeadline(food.name) : copy.headline;
  const badge = current.source === "wheel" ? t.fromWheel : copy.badge;

  let expression: MascotExpression = "surprised";
  let bubble = current.source === "emergency" ? t.emergencyBubble : copy.bubble;
  if (accepted) [expression, bubble] = ["happy", t.bubbleAccept];
  else if (current.final) [expression, bubble] = ["happy", t.bubbleFinal];
  else if (current.source === "reject") [expression, bubble] = ["sad", t.bubbleReject];
  else if (current.source === "more") [expression, bubble] = ["confused", t.bubbleMore];

  return (
    <section>
      <Confetti pieces={pieces} />

      <div className="mb-3 flex items-end gap-2.5">
        <Mascot expression={expression} className="w-20 flex-none" />
        <p
          aria-live="polite"
          className="ink-outline flex-1 rounded-[18px_18px_18px_4px] bg-white px-3.5 py-2.5 text-[15px] font-semibold"
        >
          {bubble}
        </p>
      </div>

      {current.final && (
        <div className="ink-outline mb-3 rounded-btn bg-morich-dark px-3.5 py-2.5 font-bold text-white">
          <p className="text-lg">{t.finalTitle}</p>
          <p>{roastLine(rng)}</p>
          <p className="mt-1 font-semibold">{pickOne(t.finalLines, rng)}</p>
          <p className="mt-1 text-sm font-medium">{t.finalUntil}</p>
        </div>
      )}

      <FoodCard food={food} badge={badge}>
        <Heading title={food.name} className="text-[22px] leading-snug">
          {headline}
        </Heading>
        <p className="mt-1.5 mb-3 text-[15px] text-muted">{copy.explanation}</p>
        <div className="mb-3 flex flex-wrap gap-2">
          <Chip>{t.price(bnDigits(food.price))}</Chip>
          <Chip tone="peach">{mood ? `${mood.emoji} ${mood.label}` : t.luck}</Chip>
          {!current.final && current.source !== "wheel" && (
            <Chip tone="white">{t.chancesLeft(bnDigits(suggestionsLeft))}</Chip>
          )}
        </div>

        <h2 className="mb-1 font-bold">{t.whyTitle}</h2>
        <ul className="mb-3 list-disc pl-5 text-sm">
          {copy.reasons.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>

        <div className="grid grid-cols-[96px_1fr_44px] items-center gap-2 text-[13px] font-semibold">
          <span>{t.moodBar}</span>
          <ProgressBar value={rec.scores.mood} label={t.moodBar} color="dhonepata" />
          <span>{bnDigits(rec.scores.mood)}%</span>
          <span>{t.timeBar}</span>
          <ProgressBar value={rec.scores.time} label={t.timeBar} />
          <span>{bnDigits(rec.scores.time)}%</span>
        </div>

        {answers.mood && CARE_MOODS.includes(answers.mood) && (
          <p className="mt-3 rounded-chip bg-peach px-2.5 py-2 text-[13px]">{t.care}</p>
        )}
        <p className="mt-3 text-xs text-muted">{t.allergyNote}</p>
      </FoodCard>

      <div className="mt-3.5 grid grid-cols-2 gap-2.5">
        {!current.final && (
          <>
            <Button onClick={() => next("more")}>{t.more}</Button>
            <Button onClick={() => next("reject")}>{t.reject}</Button>
          </>
        )}
        <Button
          variant="accept"
          aria-pressed={accepted}
          onClick={() => {
            if (!accepted) {
              accept();
              fire();
            }
            setAccepted(true);
          }}
        >
          {t.accept}
        </Button>
        <ButtonLink to="/share" variant="fun">
          {t.send}
        </ButtonLink>
      </div>
    </section>
  );
}
