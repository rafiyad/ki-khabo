import type { CSSProperties } from "react";
import type { Piece } from "@/components/use-confetti";

export function Confetti({ pieces }: { pieces: Piece[] }) {
  if (pieces.length === 0) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute -top-4 block h-3.5 w-2.5 animate-fall rounded-[2px]"
          style={
            {
              left: `${p.left}%`,
              background: p.color,
              "--fall-duration": `${p.duration}s`,
              "--fall-delay": `${p.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
