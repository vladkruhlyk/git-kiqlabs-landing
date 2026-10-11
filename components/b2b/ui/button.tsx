import { cn } from "@/lib/utils";

type Variant = "primary" | "dark";
type Size = "md" | "lg";

type Style = {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  className?: string;
};

// DESIGN.md: Signal Blue — только primary CTA, Ink Navy — вторичная тёмная кнопка.
// Текст 18/600, радиус 8px, без рамки.
const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-[var(--color-signal-blue)] text-[var(--color-paper)] b2b-shadow-button hover:brightness-95",
  dark: "bg-[var(--color-ink-navy)] text-[var(--color-paper)] hover:brightness-125",
};

const SIZES: Record<Size, string> = {
  md: "px-4 py-2.5",
  lg: "px-6 py-3",
};

export function buttonClass({ variant = "primary", size = "md", full, className }: Style) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-[8px] text-[18px] font-semibold leading-[1.6] transition-[filter] duration-150",
    "disabled:cursor-not-allowed disabled:opacity-60",
    VARIANTS[variant],
    SIZES[size],
    full && "w-full",
    className,
  );
}

export function Button({
  variant,
  size,
  full,
  className,
  type = "button",
  ...rest
}: Style & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={buttonClass({ variant, size, full, className })}
      {...rest}
    />
  );
}

export function ButtonLink({
  variant,
  size,
  full,
  className,
  ...rest
}: Style & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return <a className={buttonClass({ variant, size, full, className })} {...rest} />;
}
