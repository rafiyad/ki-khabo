import { useState } from "react";
import { Button, ButtonLink } from "@/components/Button";
import { buttonClass } from "@/components/button-class";
import { FoodVisual } from "@/components/FoodCard";
import { Heading } from "@/components/Heading";
import { bn } from "@/content/bn";
import { catalog, getFood } from "@/data";
import { challengeUrl, cleanName, makeChallenge, NAME_MAX } from "@/lib/challenge";
import { copyText, whatsappUrl } from "@/lib/share";
import { useAppState } from "@/state/store";

/** Sender side: turns today's dish into a "guess what I'll eat" link. */
export function Challenge() {
  const { current, lastAccepted, prefs } = useAppState();
  const food = getFood(current?.foodId ?? lastAccepted ?? "");
  const t = bn.challenge;

  if (!food) {
    return (
      <section className="py-6 text-center">
        <Heading title={t.title} className="text-[22px]">
          {t.title}
        </Heading>
        <p className="mt-2 mb-4 text-muted">{t.needPick}</p>
        <ButtonLink to={prefs ? "/quick" : "/step/gender"} variant="primary">
          {t.findFood}
        </ButtonLink>
      </section>
    );
  }
  return <ChallengeForm key={food.id} foodId={food.id} />;
}

function ChallengeForm({ foodId }: { foodId: string }) {
  const food = getFood(foodId)!;
  const t = bn.challenge;
  // Decoys and order are chosen once, so the link stays the same while typing a name.
  const [base] = useState(() => makeChallenge(foodId, catalog.foods.map((f) => f.id), "", Math.random));
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const challenge = { ...base, name: cleanName(name) };
  const url = challengeUrl(window.location.origin, challenge);
  const text = t.shareText(challenge.name || t.me);

  async function onShare() {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ text, url });
        setStatus("");
        return;
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
      }
    }
    await onCopy();
  }

  async function onCopy() {
    setStatus((await copyText(`${text}\n${url}`)) ? t.copied : url);
  }

  return (
    <section>
      <Heading title={t.title} className="text-center text-[22px]">
        {t.title}
      </Heading>
      <p className="mt-0.5 mb-3 text-center text-muted">{t.subtitle}</p>

      <div className="ink-outline mb-3 flex items-center gap-3 rounded-result bg-white p-3">
        <FoodVisual food={food} className={food.image ? "h-14 w-14 rounded-option" : "text-[44px]"} />
        <div>
          <p className="text-[13px] font-semibold text-muted">{t.yourPick}</p>
          <p className="text-lg font-bold">{food.name}</p>
        </div>
      </div>

      <label htmlFor="challenge-name" className="mb-1 block font-bold">
        {t.nameLabel}
      </label>
      <input
        id="challenge-name"
        className="ink-outline min-h-12 w-full rounded-btn bg-white px-3 text-base"
        placeholder={t.namePlaceholder}
        maxLength={NAME_MAX}
        autoComplete="nickname"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p className="mt-1 text-xs text-muted">{t.nameHint}</p>

      <div className="mt-4 flex flex-wrap justify-center gap-2.5">
        <Button variant="primary" onClick={onShare}>
          {t.share}
        </Button>
        <Button onClick={onCopy}>{t.copy}</Button>
        <a className={buttonClass("accept")} href={whatsappUrl(text, url)} target="_blank" rel="noopener noreferrer">
          {bn.share.whatsapp}
        </a>
      </div>
      <p aria-live="polite" className="mt-2 min-h-5 text-center text-[13px] font-semibold break-all text-dhonepata-dark">
        {status}
      </p>
    </section>
  );
}
