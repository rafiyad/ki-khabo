import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

let firstScreen = true;

/**
 * Screen title. After navigating, focus moves here so screen-reader and keyboard
 * users start at the new screen. The first screen of a visit isn't focused.
 */
export function Heading({ children, className, title }: { children: ReactNode; className?: string; title?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (title) document.title = `${title} · কি খাবো?`;
    if (firstScreen) {
      firstScreen = false;
      return;
    }
    ref.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  }, [title]);

  return (
    <h1 ref={ref} tabIndex={-1} className={cn("font-bold text-ink outline-none", className)}>
      {children}
    </h1>
  );
}
