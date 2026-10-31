import { useCallback, useEffect, useRef, useState } from "react";

const COLORS = ["#FF7A1A", "#FFC93C", "#E8443A", "#2FA36B", "#2B1B0E"];
const COUNT = 50;

export type Piece = { id: number; left: number; color: string; duration: number; delay: number };

/** 50 pieces, 1.4–2.4s, only for accept and roulette wins. Skipped when reduced motion is on. */
export function useConfetti() {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const fire = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const base = Date.now();
    setPieces(
      Array.from({ length: COUNT }, (_, i) => ({
        id: base + i,
        left: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        duration: 1.4 + Math.random(),
        delay: Math.random() * 0.4,
      })),
    );
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setPieces([]), 2900);
  }, []);

  return { pieces, fire };
}
