import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = Omit<ComponentProps<"button">, "children"> & {
  emoji?: string;
  label: ReactNode;
  sub?: ReactNode;
  selected?: boolean;
  /** Bigger emoji, for battle cards. */
  large?: boolean;
};

/** Selectable card used for every quiz answer. `aria-pressed` carries the selected state. */
export function OptionCard({ emoji, label, sub, selected = false, large = false, className, ...props }: Props) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "ink-outline flex min-h-12 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-option bg-white px-2 py-2.5 text-center text-sm font-semibold text-ink",
        "transition-transform duration-150 hover:-translate-y-[3px] hover:-rotate-1 motion-reduce:hover:transform-none",
        selected && "border-masala bg-peach shadow-[0_0_0_3px_var(--color-masala)]",
        large && "py-5",
        className,
      )}
      {...props}
    >
      {emoji && (
        <span aria-hidden className={cn("leading-tight", large ? "text-5xl" : "text-[26px]")}>
          {emoji}
        </span>
      )}
      <span>{label}</span>
      {sub && <small className="text-[11px] font-medium text-muted">{sub}</small>}
    </button>
  );
}
