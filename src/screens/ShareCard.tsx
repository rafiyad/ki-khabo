import { useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { Button } from "@/components/Button";
import { buttonClass } from "@/components/button-class";
import { FoodVisual } from "@/components/FoodCard";
import { Heading } from "@/components/Heading";
import { Sticker } from "@/components/Sticker";
import { bn } from "@/content/bn";
import { getFood, getHealth } from "@/data";
import { MOODS } from "@/data/options";
import { cn } from "@/lib/cn";
import { cardToPng, copyText, downloadBlob, facebookUrl, shareImage, whatsappUrl } from "@/lib/share";
import { useAppState } from "@/state/store";

const DEFAULT_FOOD = "kacchi";

type Mode = "pick" | "group" | "horoscope";

export function ShareCard() {
  const { current, lastAccepted, answers } = useAppState();
  const [params] = useSearchParams();
  // Group verdicts and the horoscope open this screen with ?food=<id>&mode=<mode>.
  const mode: Mode = params.get("mode") === "group" ? "group" : params.get("mode") === "horoscope" ? "horoscope" : "pick";
  const food = [params.get("food"), current?.foodId, lastAccepted, DEFAULT_FOOD]
    .map((id) => (id ? getFood(id) : undefined))
    .find((f) => f !== undefined)!;
  const mood = mode === "pick" ? MOODS.find((m) => m.id === answers.mood) : undefined;
  const t = bn.share;
  const captions = mode === "group" ? t.groupCaptions : mode === "horoscope" ? t.horoscopeCaptions : t.captions;

  const [captionIndex, setCaptionIndex] = useState(0);
  // Mood is personal, so it's off the card unless the user turns it on.
  const [showMood, setShowMood] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const caption = captions[captionIndex % captions.length](food.name);
  const sticker =
    mode === "group"
      ? t.groupSticker
      : mode === "horoscope"
        ? t.horoscopeSticker
        : showMood && mood
          ? t.moodSticker(`${mood.emoji} ${mood.label}`)
          : t.todayFood;
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
        <Sticker className="relative self-start">{sticker}</Sticker>
        <div className="relative text-center">
          <FoodVisual
            food={food}
            className={food.image ? "mx-auto h-20 w-20 rounded-option" : showWarning ? "text-[56px]" : "text-[72px]"}
          />
          <p className="mt-1 text-2xl leading-tight font-bold">{food.name}</p>
        </div>
        <p className="ink-outline relative rounded-btn bg-white px-3 py-2 text-base leading-snug font-semibold">{caption}</p>
        {showWarning && (
          <p className="relative rounded-chip border-2 border-dashed border-ink bg-white/85 px-2 py-1 text-[11px] leading-snug font-semibold">
            {bn.health.warningTitle}: {getHealth(food.id).warning}
          </p>
        )}
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
      <label className={cn("mx-auto flex min-h-12 max-w-[340px] cursor-pointer items-center gap-2 font-semibold", !mood && "mt-3")}>
        <input
          type="checkbox"
          className="h-5 w-5 accent-masala"
          checked={showWarning}
          onChange={(e) => setShowWarning(e.target.checked)}
        />
        {t.showWarning}
      </label>

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
