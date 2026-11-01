import { useState } from "react";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { HealthWarning } from "@/components/HealthNote";
import { OptionCard } from "@/components/OptionCard";
import { ProgressBar } from "@/components/ProgressBar";
import { bn } from "@/content/bn";
import { catalog, getFood, getHealth } from "@/data";
import { bnDigits } from "@/lib/bn-number";

const short = (name: string) => name.split(" ")[0];

export function Battle() {
  const [index, setIndex] = useState(0);
  const [vote, setVote] = useState<"a" | "b" | null>(null);
  const t = bn.battle;

  const battle = catalog.battles[index % catalog.battles.length];
  const a = getFood(battle.a)!;
  const b = getFood(battle.b)!;
  const crowd = battle.pollA >= 50 ? a : b;
  const mine = vote === "a" ? a : b;

  return (
    <section>
      <Heading title="ফুড ব্যাটল" className="text-center text-[22px]">
        {t.title(short(a.name), short(b.name))}
      </Heading>
      <p className="mt-0.5 mb-3.5 text-center text-muted">{t.subtitle}</p>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2.5">
        {[
          { side: "a" as const, food: a },
          { side: "b" as const, food: b },
        ].map(({ side, food }, i) => (
          <div key={side} className={i === 0 ? "order-1" : "order-3"}>
            <OptionCard
              className="w-full"
              large
              emoji={food.emoji}
              label={food.name}
              sub={`৳${bnDigits(food.price)}`}
              selected={vote === side}
              onClick={() => setVote(side)}
            />
          </div>
        ))}
        <span aria-hidden className="order-2 text-[26px] font-bold text-morich-dark">
          {t.vs}
        </span>
      </div>

      <div aria-live="polite">
        {vote && (
          <div className="ink-outline mt-3.5 rounded-result bg-white p-4">
            <div className="flex justify-between text-sm font-bold">
              <span>
                {a.emoji} {bnDigits(battle.pollA)}%
              </span>
              <span>
                {bnDigits(100 - battle.pollA)}% {b.emoji}
              </span>
            </div>
            <ProgressBar value={battle.pollA} label={`${a.name} ${bnDigits(battle.pollA)}%`} track="haldi" className="my-1.5" />
            <p className="text-xs font-semibold text-muted">{t.pollNote}</p>
            <p className="mt-2 font-semibold">{mine === crowd ? t.agree(mine.name) : t.disagree(crowd.name)}</p>
            <HealthWarning health={getHealth(mine.id)} className="mt-2.5" />
          </div>
        )}
      </div>

      <div className="mt-3.5 text-center">
        <Button
          variant="fun"
          onClick={() => {
            setIndex((i) => i + 1);
            setVote(null);
          }}
        >
          {t.next}
        </Button>
      </div>
    </section>
  );
}
