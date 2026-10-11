import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Карточка-вариант ответа. Выбранное состояние — Signal Blue (по DESIGN.md
 * это цвет selected/active). multi — квадратный индикатор (мультивыбор).
 * quiet — визуально тише (например, «Покупаю для себя» в квизе).
 */
export function OptionCard({
  selected,
  multi,
  quiet,
  className,
  children,
  ...rest
}: {
  selected: boolean;
  multi?: boolean;
  quiet?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "flex w-full min-h-[56px] items-center gap-3 rounded-[16px] border bg-[var(--color-paper)] px-4 py-3.5 text-left transition-[border-color,box-shadow] duration-150",
        selected
          ? "border-[var(--color-signal-blue)] ring-1 ring-[var(--color-signal-blue)]"
          : "border-[var(--color-hairline)] hover:border-[var(--color-mist-gray)]",
        className,
      )}
      {...rest}
    >
      <span
        className={cn(
          "flex-1 text-[16px] leading-[1.4]",
          quiet
            ? "font-medium text-[var(--color-slate-gray)]"
            : "font-semibold text-[var(--color-ink-navy)]",
        )}
      >
        {children}
      </span>
      <span
        aria-hidden
        className={cn(
          "grid size-5 shrink-0 place-items-center border transition-colors",
          multi ? "rounded-[4px]" : "rounded-full",
          selected
            ? "border-[var(--color-signal-blue)] bg-[var(--color-signal-blue)] text-[var(--color-paper)]"
            : "border-[var(--color-hairline)] bg-[var(--color-paper)]",
        )}
      >
        {selected && <Check className="size-3.5" strokeWidth={3} />}
      </span>
    </button>
  );
}
