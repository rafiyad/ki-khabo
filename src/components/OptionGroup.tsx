import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Labelled group of OptionCards on a responsive grid. */
export function OptionGroup({
  label,
  hint,
  min = 110,
  columns,
  children,
  className,
}: {
  label?: string;
  hint?: string;
  /** Minimum card width in px for the auto-fit grid. */
  min?: number;
  /** Fixed column count instead of auto-fit. */
  columns?: number;
  children: ReactNode;
  className?: string;
}) {
  const id = label ? `group-${label.replace(/\s+/g, "-")}` : undefined;
  return (
    <div className={className}>
      {label && (
        <p id={id} className="mt-3.5 mb-1.5 font-bold">
          {label} {hint && <span className="text-[13px] font-medium text-muted">{hint}</span>}
        </p>
      )}
      <div
        role="group"
        aria-labelledby={id}
        className={cn("grid gap-2.5")}
        style={{
          gridTemplateColumns: columns
            ? `repeat(${columns}, minmax(0, 1fr))`
            : `repeat(auto-fit, minmax(min(${min}px, 100%), 1fr))`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
