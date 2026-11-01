import { m } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { Confetti } from "@/components/Confetti";
import { useConfetti } from "@/components/use-confetti";
import { Heading } from "@/components/Heading";
import { bn } from "@/content/bn";
import { catalog } from "@/data";
import type { Food } from "@/data/foods";
import { bnDigits } from "@/lib/bn-number";
import { isSafeFor } from "@/lib/recommend";
import { sample } from "@/lib/rng";
import { shortName } from "@/lib/short-name";
import { useAppState } from "@/state/store";

const SEGMENTS = 8;
// Light fills only, so the ink labels stay readable on every segment.
const FILLS = ["#FF7A1A", "#FFC93C", "#2FA36B", "#FFE7C7"];
const R = 130;

/** Point on the wheel, `deg` clockwise from 12 o'clock. */
function point(deg: number, r: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [r * Math.cos(rad), r * Math.sin(rad)] as const;
}

function Wheel({ foods }: { foods: Food[] }) {
  const seg = 360 / foods.length;
  return (
    <svg viewBox="-135 -135 270 270" className="h-full w-full">
      {foods.map((f, i) => {
        const [x1, y1] = point(i * seg, R);
        const [x2, y2] = point((i + 1) * seg, R);
        const mid = (i + 0.5) * seg;
        return (
          <g key={f.id}>
            <path d={`M0 0 L${x1} ${y1} A${R} ${R} 0 0 1 ${x2} ${y2} Z`} fill={FILLS[i % FILLS.length]} stroke="#2B1B0E" strokeWidth="2" />
            <g transform={`rotate(${mid - 90})`}>
              <text x="112" y="5" textAnchor="end" fontSize="13" fontWeight="700" fill="#2B1B0E" fontFamily="inherit">
                {shortName(f.name)}
              </text>
              <text x="48" y="7" textAnchor="middle" fontSize="20">
                {f.emoji}
              </text>
            </g>
          </g>
        );
      })}
      <circle r="16" fill="#FFF8EC" stroke="#2B1B0E" strokeWidth="2" />
    </svg>
  );
}

export function Roulette() {
  const { answers, spinsLeft, spendSpin, showPick } = useAppState();
  const navigate = useNavigate();
  const { pieces, fire } = useConfetti();
  // Dishes on the wheel respect the user's allergies and diet, if they've answered.
  const [foods] = useState(() => sample(catalog.foods.filter((f) => isSafeFor(f, answers)), SEGMENTS, Math.random));
  const [rotation, setRotation] = useState(0);
  const [target, setTarget] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<Food | null>(null);
  const t = bn.roulette;

  function spin() {
    if (spinning || !spendSpin()) return;
    const seg = 360 / foods.length;
    const index = Math.floor(Math.random() * foods.length);
    // 5 full turns, then stop with the chosen segment under the pointer.
    const stopAt = 360 - (index * seg + seg / 2);
    setRotation((r) => r + 1800 + ((((stopAt - (r % 360)) % 360) + 360) % 360));
    setTarget(index);
    setWinner(null);
    setSpinning(true);
  }

  function landed() {
    if (!spinning || target === null) return;
    setSpinning(false);
    setWinner(foods[target]);
    fire();
  }

  const status = spinning ? t.spinning : winner ? t.win(winner.name) : spinsLeft === 0 ? t.out : "";

  return (
    <section className="text-center">
      <Confetti pieces={pieces} />
      <Heading title={t.title} className="text-[22px]">
        {t.title}
      </Heading>
      <p className="mt-0.5 mb-2.5 text-muted">{t.subtitle}</p>
      <Chip tone="white">{t.spinsLeft(bnDigits(spinsLeft))}</Chip>

      <div className="relative mx-auto mt-3 h-[290px] w-[270px]">
        <div
          aria-hidden
          className="absolute top-0 left-1/2 z-10 h-0 w-0 -translate-x-1/2 border-x-[14px] border-t-[26px] border-x-transparent border-t-ink"
        />
        <m.div
          role="img"
          aria-label={`${t.wheelLabel}: ${foods.map((f) => f.name).join(", ")}`}
          className="absolute top-4 left-0 h-[270px] w-[270px] rounded-full border-[3px] border-ink"
          animate={{ rotate: rotation }}
          transition={{ duration: 3.6, ease: [0.17, 0.67, 0.2, 1] }}
          onAnimationComplete={landed}
        >
          <Wheel foods={foods} />
        </m.div>
      </div>

      <p aria-live="polite" className="my-2 min-h-7 text-lg font-bold">
        {status}
      </p>
      <div className="flex flex-wrap justify-center gap-2.5">
        <Button variant="primary" onClick={spin} disabled={spinning || spinsLeft === 0 || foods.length < 2}>
          {t.spin}
        </Button>
        {winner && !spinning && (
          <Button
            onClick={() => {
              showPick(winner.id, "wheel");
              navigate("/result");
            }}
          >
            {t.details}
          </Button>
        )}
      </div>
    </section>
  );
}
