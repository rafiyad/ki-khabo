import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button, ButtonLink } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Mascot } from "@/components/Mascot";
import { Sticker } from "@/components/Sticker";
import { bn } from "@/content/bn";
import { catalog, getFood } from "@/data";
import { horoscopeFor } from "@/lib/horoscope";
import { isSafeFor } from "@/lib/recommend";
import { seasonFor } from "@/lib/season";
import { useAppState } from "@/state/store";

export function Landing() {
  const { suggest, clearHistory, prefs, answers, showPick } = useAppState();
  const navigate = useNavigate();
  const [cleared, setCleared] = useState(false);
  const [today] = useState(() => new Date());
  const t = bn.landing;

  // Featured dishes must still respect the user's diet and allergies:
  // this visit's answers if given, else the ones saved from last time.
  const rules = answers.budget || !prefs ? answers : prefs;
  const season = seasonFor(today);
  const seasonFood = season
    ? catalog.seasons[season].map((id) => getFood(id)).find((f) => f !== undefined && isSafeFor(f, rules))
    : undefined;

  return (
    <section>
      <div className="flex flex-wrap items-center gap-4.5">
        <div className="flex-[1_1_280px]">
          <Sticker>{t.sticker}</Sticker>
          <Heading title="মুড বুঝে খাবার সাজেশন" className="mt-3.5 mb-2 text-[30px] leading-tight">
            {t.titleBefore}
            <span className="rounded-lg bg-haldi px-1.5">{t.titleHighlight}</span>
            {t.titleAfter}
          </Heading>
          <p className="mb-4 text-[17px] text-muted">{t.subtitle}</p>
          <div className="flex flex-wrap gap-2.5">
            <ButtonLink to="/step/gender" variant="primary">
              {t.start}
            </ButtonLink>
            <ButtonLink to="/roulette" variant="fun">
              {t.lucky}
            </ButtonLink>
            {prefs && (
              <ButtonLink to="/quick" variant="accept">
                {t.quick}
              </ButtonLink>
            )}
          </div>
          <p className="mt-3 text-[13px] font-semibold text-morich-dark">{t.warning}</p>
        </div>
        <div className="relative mx-auto flex-[0_1_200px] text-center">
          <Sticker tilt={3} className="absolute top-0 right-0">
            {t.mascotBubble}
          </Sticker>
          <Mascot expression="confused" className="mx-auto mt-8 w-44" />
        </div>
      </div>

      {season && seasonFood && (
        <div className="ink-outline mt-5 flex flex-wrap items-center gap-2.5 rounded-option bg-peach px-3.5 py-3">
          <p className="flex-[1_1_220px] text-[15px] font-semibold">{bn.season[season].banner}</p>
          <Button
            variant="fun"
            onClick={() => {
              showPick(seasonFood.id, "season");
              navigate("/result");
            }}
          >
            {bn.season[season].button}
          </Button>
        </div>
      )}

      <HoroscopeCard date={today} safe={(id) => isSafeFor(getFood(id)!, rules)} onDetails={(id) => {
        showPick(id, "horoscope");
        navigate("/result");
      }} />

      <nav aria-label="আরো মজা" className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2.5">
        {t.extras.map((e) => (
          <Link
            key={e.to}
            to={e.to}
            className="ink-outline flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-option bg-white px-2 py-2.5 text-center text-sm font-semibold transition-transform duration-150 hover:-translate-y-[3px] hover:-rotate-1 motion-reduce:hover:transform-none"
          >
            <span aria-hidden className="text-[26px] leading-tight">
              {e.emoji}
            </span>
            {e.label}
            <small className="text-[11px] font-medium text-muted">{e.sub}</small>
          </Link>
        ))}
      </nav>

      <Button
        variant="emergency"
        className="mt-4 w-full py-4 text-[19px] motion-safe:animate-pulse-soft"
        onClick={() => {
          suggest("emergency");
          navigate("/result");
        }}
      >
        {t.emergency}
      </Button>

      <div className="mt-5 text-center">
        <button
          type="button"
          className="min-h-12 cursor-pointer px-3 text-[13px] font-semibold text-muted underline underline-offset-4"
          onClick={() => {
            if (window.confirm(t.clearConfirm)) {
              clearHistory();
              setCleared(true);
            }
          }}
        >
          {t.clearHistory}
        </button>
        <p aria-live="polite" className="text-[13px] font-semibold text-dhonepata-dark">
          {cleared ? t.cleared : ""}
        </p>
      </div>
    </section>
  );
}

function HoroscopeCard({ date, safe, onDetails }: { date: Date; safe: (id: string) => boolean; onDetails: (id: string) => void }) {
  const [h] = useState(() => horoscopeFor(date, catalog.foods));
  const t = bn.horoscope;
  const ok = safe(h.food.id);
  return (
    <section aria-labelledby="horoscope-title" className="ink-outline mt-5 rounded-option bg-white px-3.5 py-3">
      <h2 id="horoscope-title" className="font-bold">
        {t.title}
      </h2>
      <div className="mt-1.5 flex items-center gap-3">
        <span aria-hidden className="text-[40px] leading-none">
          {h.food.emoji}
        </span>
        <div className="text-sm">
          <p className="font-semibold">{h.line}</p>
          <p className="text-muted">
            {h.luckyTime} · {h.buddy}
          </p>
        </div>
      </div>
      {!ok && <p className="mt-1.5 text-[13px] font-semibold">{t.notForYou}</p>}
      <div className="mt-2.5 flex flex-wrap gap-2">
        {ok && <Button onClick={() => onDetails(h.food.id)}>{t.details}</Button>}
        <ButtonLink to={`/share?food=${h.food.id}&mode=horoscope`} variant="fun">
          {t.share}
        </ButtonLink>
      </div>
      <p className="mt-1.5 text-xs text-muted">{t.note}</p>
    </section>
  );
}
