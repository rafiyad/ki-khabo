import { useRef, useState } from "react";
import { Button, ButtonLink } from "@/components/Button";
import { FoodVisual } from "@/components/FoodCard";
import { Heading } from "@/components/Heading";
import { Mascot } from "@/components/Mascot";
import { Sticker } from "@/components/Sticker";
import { bn } from "@/content/bn";
import { getFood, getHealth } from "@/data";
import { bnDigits } from "@/lib/bn-number";
import { cardToPng, shareImage } from "@/lib/share";
import { weeklyWrap } from "@/lib/wrapped";
import { useAppState } from "@/state/store";

/** Weekly "food wrapped" from on-device history, as a shareable card. */
export function Wrapped() {
  const { accepted, prefs } = useAppState();
  const [wrap] = useState(() => weeklyWrap(accepted, new Date(), getFood, getHealth));
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const t = bn.wrapped;

  if (!wrap) {
    return (
      <section className="py-6 text-center">
        <Mascot expression="confused" className="mx-auto w-24" />
        <Heading title={t.title} className="mt-2 text-[22px]">
          {t.title}
        </Heading>
        <p className="mt-2 mb-4 text-muted">{t.empty}</p>
        <ButtonLink to={prefs ? "/quick" : "/step/gender"} variant="primary">
          {t.findFood}
        </ButtonLink>
      </section>
    );
  }

  async function onShare() {
    if (!cardRef.current || busy) return;
    setBusy(true);
    setStatus(bn.share.making);
    try {
      const png = await cardToPng(cardRef.current);
      const outcome = await shareImage(png, "ki-khabo-weekly.png", `${t.title} ${bn.hashtag}\n${window.location.origin}`);
      setStatus(outcome === "downloaded" ? bn.share.downloaded : "");
    } catch {
      setStatus(bn.share.failed);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section>
      <Heading title={t.title} className="text-center text-[22px]">
        {t.title}
      </Heading>
      <p className="mt-0.5 mb-3 text-center text-muted">{t.subtitle}</p>

      <div
        ref={cardRef}
        role="img"
        aria-label={`${t.cardAlt}: ${t.titles[wrap.topCategory]}, ${t.count(bnDigits(wrap.count))}`}
        className="relative mx-auto box-border flex aspect-square max-w-[340px] flex-col justify-between overflow-hidden rounded-meme border-[3px] border-ink bg-haldi p-5 text-ink"
      >
        <div aria-hidden className="absolute -right-6 -bottom-6 h-32 w-32 rounded-full border-[3px] border-ink bg-masala" />
        <Sticker tone="white" className="relative self-start">
          {t.titleLabel}
        </Sticker>
        <p className="relative text-[26px] leading-tight font-bold">{t.titles[wrap.topCategory]}</p>
        <div className="relative flex items-center gap-3">
          <FoodVisual food={wrap.topFood} className={wrap.topFood.image ? "h-14 w-14 rounded-option" : "text-[48px]"} />
          <div className="text-sm font-semibold">
            <p>{t.topFood(wrap.topFood.name, bnDigits(wrap.topFoodCount))}</p>
            <p>
              {t.count(bnDigits(wrap.count))} · {t.days(bnDigits(wrap.days))}
            </p>
          </div>
        </div>
        <div className="ink-outline relative rounded-btn bg-white px-3 py-2 text-[13px] font-semibold">
          <p>
            <span className="font-bold">{t.oilTitle}:</span> {t.oil[wrap.oilBand]}
          </p>
          {wrap.sweets > 0 && <p>{t.sweet(bnDigits(wrap.sweets))}</p>}
        </div>
        <div className="relative flex justify-between text-xs font-bold">
          <span>{bn.brandWithEmoji}</span>
          <span>{bn.hashtag}</span>
        </div>
      </div>

      <div className="mt-3 flex justify-center">
        <Button variant="primary" onClick={onShare} disabled={busy}>
          {t.share}
        </Button>
      </div>
      <p aria-live="polite" className="mt-2 min-h-5 text-center text-[13px] font-semibold text-dhonepata-dark">
        {status}
      </p>
    </section>
  );
}
