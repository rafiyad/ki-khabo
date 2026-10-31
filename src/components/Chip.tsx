import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "haldi" | "peach" | "white" | "dhonepata";

const TONES: Record<Tone, string> = {
  haldi: "bg-haldi",
  peach: "bg-peach",
  white: "bg-white",
  dhonepata: "bg-dhonepata",
};

/** Small outlined label: price, mood, chances left. */
export function Chip({ tone = "haldi", className, children }: { tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        "ink-outline inline-block rounded-chip px-2.5 py-0.5 text-[13px] font-bold text-ink",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
