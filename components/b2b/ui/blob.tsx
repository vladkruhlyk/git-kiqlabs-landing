import { cn } from "@/lib/utils";

/**
 * Декоративное пятно (Coral Magenta / Sky Cyan) — только атмосфера,
 * никогда не заливка UI-элементов (Don'ts в DESIGN.md).
 */
export function Blob({ color, className }: { color: "magenta" | "cyan"; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full opacity-40 blur-[48px]",
        color === "magenta"
          ? "bg-[var(--color-coral-magenta)]"
          : "bg-[var(--color-sky-cyan)]",
        className,
      )}
    />
  );
}

/**
 * Обёртка для визуала: карточка-мокап с пятнами позади, смещёнными на 20–40px.
 * Каждый продуктовый визуал на /b2b ставится в такую обёртку.
 */
export function BlobbedVisual({
  className,
  desktopOnly,
  children,
}: {
  className?: string;
  /** Пятна только на десктопе (например, вокруг карточки квиза). */
  desktopOnly?: boolean;
  children: React.ReactNode;
}) {
  const vis = desktopOnly ? "hidden lg:block" : "";
  return (
    <div className={cn("relative", className)}>
      <Blob color="magenta" className={cn("-right-6 -top-8 size-40 lg:-right-10 lg:size-56", vis)} />
      <Blob color="cyan" className={cn("-bottom-8 -left-6 size-44 lg:-left-10 lg:size-64", vis)} />
      <div className="relative">{children}</div>
    </div>
  );
}
