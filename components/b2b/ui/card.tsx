import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * panel — feature-панель: белая, радиус 24px, hairline-рамка, мягкая тень.
 * product — карточка продукта/мокапа: радиус 16px, трёхслойная голубоватая тень.
 */
export function Card({
  variant = "panel",
  className,
  ...rest
}: { variant?: "panel" | "product" } & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-[var(--color-paper)]",
        variant === "panel"
          ? "rounded-[24px] border border-[var(--color-hairline)] b2b-shadow-card p-6"
          : "rounded-[16px] b2b-shadow-product overflow-hidden",
        className,
      )}
      {...rest}
    />
  );
}

/** Pill Badge: заливка #e6f0ff, текст Deep Cobalt 12/500, радиус pill. */
export function Badge({
  size = "sm",
  className,
  ...rest
}: { size?: "sm" | "md" } & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-[var(--color-badge-fill)] font-medium text-[var(--color-deep-cobalt)]",
        size === "sm" ? "px-2 py-1 text-[12px] leading-[1.5]" : "px-3 py-1.5 text-[14px] leading-[1.4]",
        className,
      )}
      {...rest}
    />
  );
}

/** Информационное сообщение в стиле бейджа (не действие, а подсказка). */
export function InfoNote({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      role="note"
      className={cn(
        "flex gap-3 rounded-[12px] bg-[var(--color-badge-fill)] px-4 py-3 text-[14px] leading-[1.5] text-[var(--color-deep-cobalt)]",
        className,
      )}
    >
      <Info aria-hidden className="mt-0.5 size-4 shrink-0" strokeWidth={2} />
      <div>{children}</div>
    </div>
  );
}
