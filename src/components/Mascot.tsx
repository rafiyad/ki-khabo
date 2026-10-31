import type { ReactNode } from "react";
import { bn } from "@/content/bn";
import { cn } from "@/lib/cn";

export type MascotExpression = "happy" | "sad" | "confused" | "surprised";

// Mouths per expression; the rest of the biryani pot is shared.
const FACES: Record<MascotExpression, ReactNode> = {
  happy: <path d="M-10 24 Q0 36 10 24" fill="none" stroke="#2B1B0E" strokeWidth="3" strokeLinecap="round" />,
  sad: <path d="M-9 33 Q0 24 9 33" fill="none" stroke="#2B1B0E" strokeWidth="3" strokeLinecap="round" />,
  confused: (
    <>
      <path d="M-10 29 Q-5 24 0 29 T10 29" fill="none" stroke="#2B1B0E" strokeWidth="3" strokeLinecap="round" />
      <text x="26" y="-22" fontSize="26" fontWeight="700" fill="#C0312A">
        ?
      </text>
    </>
  ),
  surprised: <ellipse cx="0" cy="29" rx="5" ry="6" fill="#2B1B0E" />,
};

type Props = {
  expression?: MascotExpression;
  wobble?: boolean;
  className?: string;
  /** Set when the mascot is purely decorative next to text that says the same. */
  decorative?: boolean;
};

export function Mascot({ expression = "confused", wobble = true, className, decorative = false }: Props) {
  return (
    <div className={cn(wobble && "origin-[50%_80%] motion-safe:animate-wobble", className)}>
      <svg
        viewBox="-50 -50 100 100"
        width="100%"
        role={decorative ? undefined : "img"}
        aria-hidden={decorative || undefined}
        aria-label={decorative ? undefined : `${bn.mascot.label} (${bn.mascot[expression]})`}
      >
        <path
          d="M-14 -34 q-6 -8 0 -14 M0 -36 q-6 -8 0 -14 M14 -34 q-6 -8 0 -14"
          fill="none"
          stroke="#B4B2A9"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path d="M-32 -4 Q0 -40 32 -4Z" fill="#FFF8EC" stroke="#2B1B0E" strokeWidth="3" />
        <circle cx="-10" cy="-14" r="2.5" fill="#FFC93C" />
        <circle cx="8" cy="-18" r="2.5" fill="#E8443A" />
        <circle cx="14" cy="-9" r="2.5" fill="#2FA36B" />
        <ellipse cx="0" cy="20" rx="38" ry="26" fill="#FF7A1A" stroke="#2B1B0E" strokeWidth="3" />
        <rect x="-42" y="-8" width="84" height="12" rx="6" fill="#FFC93C" stroke="#2B1B0E" strokeWidth="3" />
        <circle cx="-12" cy="14" r="5" fill="#2B1B0E" />
        <circle cx="12" cy="14" r="5" fill="#2B1B0E" />
        <circle cx="-10.5" cy="12.5" r="1.6" fill="#fff" />
        <circle cx="13.5" cy="12.5" r="1.6" fill="#fff" />
        <circle cx="-24" cy="24" r="4" fill="#F4C0D1" />
        <circle cx="24" cy="24" r="4" fill="#F4C0D1" />
        {FACES[expression]}
      </svg>
    </div>
  );
}
