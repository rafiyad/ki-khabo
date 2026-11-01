import { useState } from "react";
import { useSearchParams } from "react-router";
import { ButtonLink } from "@/components/Button";
import { Confetti } from "@/components/Confetti";
import { useConfetti } from "@/components/use-confetti";
import { Heading } from "@/components/Heading";
import { HealthWarning } from "@/components/HealthNote";
import { Mascot } from "@/components/Mascot";
import { OptionCard } from "@/components/OptionCard";
import { OptionGroup } from "@/components/OptionGroup";
import { bn } from "@/content/bn";
import { getFood, getHealth } from "@/data";
import { bnDigits } from "@/lib/bn-number";
import { decodeChallenge } from "@/lib/challenge";
import { pickOne } from "@/lib/rng";

/** Friend side: guess the sender's dish. One guess only. Uses no daily chances. */
export function ChallengePlay() {
  const [params] = useSearchParams();
  const [challenge] = useState(() => decodeChallenge(params.get("d") ?? "", (id) => getFood(id) !== undefined));
  const [guess, setGuess] = useState<string | null>(null);
  const [line] = useState(() => Math.random());
  const { pieces, fire } = useConfetti();
  const t = bn.challenge;

  if (!challenge) {
    return (
      <section className="py-6 text-center">
        <Mascot expression="sad" className="mx-auto w-24" />
        <Heading title={t.title} className="mt-2 text-xl">
          {t.broken}
        </Heading>
        <div className="mt-4">
          <ButtonLink to="/" variant="primary">
            {bn.notFound.home}
          </ButtonLink>
        </div>
      </section>
    );
  }

  const who = challenge.name || t.someone;
  const answer = getFood(challenge.answer)!;
  const right = guess === challenge.answer;

  return (
    <section>
      <Confetti pieces={pieces} />
      <Heading title={t.title} className="text-center text-[22px] leading-snug">
        {t.playTitle(who)}
      </Heading>
      <p className="mt-0.5 mb-3 text-center text-muted">{t.playSubtitle}</p>

      <OptionGroup min={130}>
        {challenge.options.map((id) => {
          const f = getFood(id)!;
          return (
            <OptionCard
              key={id}
              large
              emoji={f.emoji}
              label={f.name}
              sub={`৳${bnDigits(f.price)}`}
              selected={guess === id || (guess !== null && id === challenge.answer)}
              disabled={guess !== null}
              onClick={() => {
                if (guess) return;
                setGuess(id);
                if (id === challenge.answer) fire();
              }}
            />
          );
        })}
      </OptionGroup>

      <div aria-live="polite">
        {guess && (
          <div className="ink-outline mt-3.5 rounded-result bg-white p-4 text-center">
            <Mascot expression={right ? "happy" : "surprised"} className="mx-auto w-20" />
            <p className="mt-1 text-lg font-bold">{right ? t.right : t.wrong(answer.name)}</p>
            <p className="mt-1 text-muted">{pickOne(right ? t.rightLines : t.wrongLines, () => line)}</p>
            <HealthWarning health={getHealth(answer.id)} className="mt-3 text-left" />
          </div>
        )}
      </div>

      {guess && (
        <div className="mt-3.5 grid gap-2.5">
          <ButtonLink to="/" variant="primary">
            {t.yourTurn}
          </ButtonLink>
          <ButtonLink to="/challenge" variant="fun">
            {t.makeOwn}
          </ButtonLink>
        </div>
      )}
    </section>
  );
}
