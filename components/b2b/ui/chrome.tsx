import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { PHONE, PHONE_HREF } from "@/lib/b2b/constants";

/** Контейнер страницы: максимум 1200px по DESIGN.md. */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

/** Секция с вертикальным ритмом 48–64px (section gap системы). */
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-12 lg:py-16", className)}>
      <Container>{children}</Container>
    </section>
  );
}

/** Section Header Block: H2 + подзаголовок по центру. */
export function SectionHeader({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-[760px] text-center", className)}>
      <h2 className="b2b-h2 text-balance">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-[640px] text-[16px] leading-[1.5] text-[var(--color-slate-gray)]">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/** Тёмная полоса над шапкой. */
export function TopStrip({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--color-ink-navy)] px-4 py-2 text-center text-[12px] font-medium leading-[1.5] text-[var(--color-paper)] sm:text-[14px]">
      {children}
    </div>
  );
}

export function PhoneLink({ className }: { className?: string }) {
  return (
    <a
      href={PHONE_HREF}
      className={cn(
        "inline-flex items-center gap-2 whitespace-nowrap text-[16px] font-semibold text-[var(--color-ink-navy)] hover:text-[var(--color-signal-blue)]",
        className,
      )}
    >
      <Phone aria-hidden className="size-4" strokeWidth={2} />
      {PHONE}
    </a>
  );
}

/** Логотип без ссылки: со страниц под рекламу трафик не уводим. */
export function Logo({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/media/logo-dark.webp"
      alt="KIQ Labs Global"
      width={835}
      height={562}
      className={cn("h-9 w-auto select-none", className)}
      draggable={false}
    />
  );
}

/** Шапка 64px: логотип слева, справа — телефон или бейдж. */
export function Header({ right }: { right: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-hairline)] bg-[var(--color-paper)]/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />
        {right}
      </Container>
    </header>
  );
}

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "border-t border-[var(--color-hairline)] bg-[var(--color-cloud)] py-10",
        className,
      )}
    >
      <Container className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <Logo className="h-8" />
        <p className="text-[14px] font-medium leading-[1.4] text-[var(--color-slate-gray)]">
          © 2026 KIQ Labs Global · Только B2B
        </p>
      </Container>
    </footer>
  );
}
