import { useRef, useState } from "react";
import { Button } from "@/components/Button";
import { buttonClass } from "@/components/button-class";
import { FoodVisual } from "@/components/FoodCard";
import { Heading } from "@/components/Heading";
import { Sticker } from "@/components/Sticker";
import { bn } from "@/content/bn";
import { getFood } from "@/data";
import { MOODS } from "@/data/options";
import { cardToPng, copyText, downloadBlob, facebookUrl, shareImage, whatsappUrl } from "@/lib/share";
import { useAppState } from "@/state/store";

const DEFAULT_FOOD = "kacchi";

export function ShareCard() {
  const { current, lastAccepted, answers } = useAppState();
  const food = getFood(current?.foodId ?? lastAccepted ?? DEFAULT_FOOD) ?? getFood(DEFAULT_FOOD)!;
  const mood = MOODS.find((m) => m.id === answers.mood);
  const t = bn.share;

  const [captionIndex, setCaptionIndex] = useState(0);
  // Mood is personal, so it's off the card unless the user turns it on.
  const [showMood, setShowMood] = useState(false);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const caption = t.captions[captionIndex % t.captions.length](food.name);
  const fullCaption = `${caption} ${bn.hashtag}`;
  const siteUrl = window.location.origin;
  const fileName = `ki-khabo-${food.id}.png`;

  async function withImage(action: (png: Blob) => Promise<void>) {
    if (!cardRef.current || busy) return;
    setBusy(true);
    setStatus(t.making);
    try {
      await action(await cardToPng(cardRef.current));
    } catch {
      setStatus(t.failed);
    } finally {
      setBusy(false);
    }
  }

  const onShare = () =>
    withImage(async (png) => {
      const outcome = await shareImage(png, fileName, `${fullCaption}\n${siteUrl}`);
      if (outcome === "downloaded") {
        await copyText(fullCaption);
        setStatus(t.downloaded);
      } else {
        setStatus("");
      }
    });

  const onDownload = () =>
    withImage(async (png) => {
      downloadBlob(png, fileName);
      await copyText(fullCaption);
      setStatus(t.downloaded);
    });

  const onCopy = async () => setStatus((await copyText(fullCaption)) ? t.copied : fullCaption);

  return (
    <section>
      <Heading title={t.title} className="text-center text-[22px]">
        {t.title}
      </Heading>
      <p className="mt-0.5 mb-3 text-center text-muted">{t.subtitle}</p>

      <div
        ref={cardRef}
        role="img"
        aria-label={`${t.cardAlt(food.name)}: ${caption}`}
        className="relative mx-auto box-border flex aspect-square max-w-[340px] flex-col justify-between overflow-hidden rounded-meme border-[3px] border-ink bg-masala p-5 text-ink"
      >
        <div aria-hidden className="absolute -top-5 -right-5 h-30 w-30 rounded-full border-[3px] border-ink bg-haldi" />
        <Sticker className="relative self-start">
          {showMood && mood ? t.moodSticker(`${mood.emoji} ${mood.label}`) : t.todayFood}
        </Sticker>
        <div className="relative text-center">
          <FoodVisual food={food} className={food.image ? "mx-auto h-24 w-24 rounded-option" : "text-[72px]"} />
          <p className="mt-1.5 text-2xl font-bold">{food.name}</p>
        </div>
        <p className="ink-outline relative rounded-btn bg-white px-3 py-2 text-base font-semibold">{caption}</p>
        <div className="relative flex justify-between text-xs font-bold">
          <span>{bn.brandWithEmoji}</span>
          <span>{bn.hashtag}</span>
        </div>
      </div>

      {mood && (
        <label className="mx-auto mt-3 flex min-h-12 max-w-[340px] cursor-pointer items-center gap-2 font-semibold">
          <input
            type="checkbox"
            className="h-5 w-5 accent-masala"
            checked={showMood}
            onChange={(e) => setShowMood(e.target.checked)}
          />
          {t.showMood}
        </label>
      )}

      <div className="mt-3 flex flex-wrap justify-center gap-2.5">
        <Button variant="primary" onClick={onShare} disabled={busy}>
          {t.share}
        </Button>
        <Button onClick={onDownload} disabled={busy}>
          {t.download}
        </Button>
        <Button onClick={onCopy}>{t.copy}</Button>
        <Button variant="fun" onClick={() => setCaptionIndex((i) => i + 1)}>
          {t.otherCaption}
        </Button>
      </div>
      <div className="mt-2.5 flex flex-wrap justify-center gap-2.5">
        <a className={buttonClass("accept")} href={whatsappUrl(fullCaption, siteUrl)} target="_blank" rel="noopener noreferrer">
          {t.whatsapp}
        </a>
        <a className={buttonClass("neutral")} href={facebookUrl(siteUrl)} target="_blank" rel="noopener noreferrer">
          {t.facebook}
        </a>
      </div>
      <p aria-live="polite" className="mt-2 min-h-5 text-center text-[13px] font-semibold text-dhonepata-dark">
        {status}
      </p>
    </section>
  );
}
