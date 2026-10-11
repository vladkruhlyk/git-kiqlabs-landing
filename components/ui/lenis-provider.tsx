"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  // На рекламных страницах /b2b/* — нативный скролл: легче для PageSpeed,
  // якоря к форме и sticky-бар работают без перехвата прокрутки.
  const disabled = usePathname()?.startsWith("/b2b") ?? false;

  useEffect(() => {
    if (disabled) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [disabled]);

  return <>{children}</>;
}
