import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "fun" | "accept" | "emergency" | "neutral";

// Text colours chosen for WCAG AA contrast: ink on masala/haldi/dhonepata,
// white only on the darker morich (docs/brief.md#accessibility).
const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-masala text-ink",
  fun: "bg-haldi text-ink",
  accept: "bg-dhonepata text-ink",
  emergency: "bg-morich-dark text-white",
  neutral: "bg-white text-ink",
};

export function buttonClass(variant: ButtonVariant = "neutral", className?: string) {
  return cn(
    "chunky inline-flex min-h-12 items-center justify-center gap-1 rounded-btn px-4 py-2.5 text-center text-base font-bold",
    "cursor-pointer disabled:cursor-not-allowed disabled:opacity-60",
    VARIANTS[variant],
    className,
  );
}
