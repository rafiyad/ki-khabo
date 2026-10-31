import { m } from "motion/react";
import { cn } from "@/lib/cn";

type Props = {
  value: number; // 0–100
  label: string;
  color?: "masala" | "dhonepata" | "haldi";
  track?: "white" | "haldi";
  className?: string;
};

const FILL = { masala: "bg-masala", dhonepata: "bg-dhonepata", haldi: "bg-haldi" };

export function ProgressBar({ value, label, color = "masala", track = "white", className }: Props) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={v}
      className={cn("ink-outline h-3 overflow-hidden rounded-full", track === "haldi" ? "bg-haldi" : "bg-white", className)}
    >
      <m.div
        className={cn("h-full", FILL[color])}
        initial={{ width: 0 }}
        animate={{ width: `${v}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}
