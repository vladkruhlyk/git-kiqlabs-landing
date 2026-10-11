"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./button";

/**
 * Нижний sticky-бар с CTA (только мобила): появляется, когда hero ушёл
 * за верх экрана, и прячется, пока форма в зоне видимости.
 */
export function StickyBar({
  label,
  href = "#form",
  afterId = "hero",
  hideOnId = "form",
}: {
  label: string;
  href?: string;
  afterId?: string;
  hideOnId?: string;
}) {
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(afterId);
    const form = document.getElementById(hideOnId);
    const observers: IntersectionObserver[] = [];

    if (hero) {
      const o = new IntersectionObserver(([e]) => {
        setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0);
      });
      o.observe(hero);
      observers.push(o);
    }
    if (form) {
      const o = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting));
      o.observe(form);
      observers.push(o);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, [afterId, hideOnId]);

  const visible = pastHero && !formVisible;

  return (
    <div
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-hairline)] bg-[var(--color-paper)]/95 px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-200 lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <ButtonLink href={href} full>
        {label}
      </ButtonLink>
    </div>
  );
}
