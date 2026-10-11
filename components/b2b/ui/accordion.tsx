import { ChevronDown, CircleHelp } from "lucide-react";

/**
 * Аккордеон на нативных <details> — без JS. По DESIGN.md (Feature Accordion
 * Item): иконка слева, шеврон справа, hairline-разделитель; открытый пункт —
 * Ink Navy с синей иконкой. Закрытые вопросы — Slate Gray, а не Mist Gray:
 * Mist на белом не проходит по контрасту, а вопросы — это контент.
 */
export function Accordion({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-[var(--color-hairline)] border-y border-[var(--color-hairline)]">
      {items.map((it) => (
        <details key={it.q} className="group">
          <summary className="flex cursor-pointer list-none items-center gap-4 py-5">
            <CircleHelp
              aria-hidden
              strokeWidth={1.75}
              className="size-5 shrink-0 text-[var(--color-mist-gray)] transition-colors group-open:text-[var(--color-signal-blue)]"
            />
            <span className="flex-1 text-[18px] font-semibold leading-[1.4] text-[var(--color-slate-gray)] transition-colors group-open:text-[var(--color-ink-navy)]">
              {it.q}
            </span>
            <ChevronDown
              aria-hidden
              className="size-5 shrink-0 text-[var(--color-slate-gray)] transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <p className="pb-5 pl-9 text-[16px] leading-[1.5] text-[var(--color-slate-gray)]">
            {it.a}
          </p>
        </details>
      ))}
    </div>
  );
}
