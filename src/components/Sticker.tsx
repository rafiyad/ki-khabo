import type { ReactNode } from "react";
import { Chip } from "@/components/Chip";
import { cn } from "@/lib/cn";

/** Tilted haldi label with the hand-stuck look from the design system. */
export function Sticker({
  tone = "haldi",
  tilt = -2,
  className,
  children,
}: {
  tone?: "haldi" | "peach" | "white" | "dhonepata";
  tilt?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Chip tone={tone} className={cn("origin-center", className)}>
      <span className="inline-block" style={{ transform: `rotate(${tilt}deg)` }}>
        {children}
      </span>
    </Chip>
  );
}
