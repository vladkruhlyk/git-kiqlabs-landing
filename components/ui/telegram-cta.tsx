import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const CHANNEL_URL = "https://t.me/kiqlabsglobal";

const COPY = {
  ru: {
    eyebrow: "Наш Telegram-канал",
    title: "Лучшие оптовые цены — первыми",
    body: "Подпишитесь на @kiqlabsglobal: спецпредложения на опт, новинки брендов США и ЕС, закрытые акции и прайсы раньше всех.",
    cta: "Подписаться на канал",
  },
  en: {
    eyebrow: "Our Telegram channel",
    title: "Best wholesale prices, first",
    body: "Join @kiqlabsglobal: wholesale specials, new US & EU brands, closed promos and price drops before anyone else.",
    cta: "Join the channel",
  },
} as const;

/** Пост-заявочный CTA: приглашение в Telegram-канал (для тёмных экранов «Спасибо»). */
export function TelegramChannelCTA({
  lang = "ru",
  className,
}: {
  lang?: "ru" | "en";
  className?: string;
}) {
  const t = COPY[lang] ?? COPY.ru;
  return (
    <a
      href={CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative block overflow-hidden rounded-2xl border border-[var(--color-lime)]/30 bg-[var(--color-lime)]/[0.08] p-5 lg:p-6 text-left transition-colors hover:bg-[var(--color-lime)]/[0.14]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[var(--color-lime)]/25 blur-2xl"
      />
      <div className="relative flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--color-lime)] text-[var(--color-bone)] shadow-[0_8px_20px_rgba(59,130,246,0.4)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
          </svg>
        </span>
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-lime)]">
            {t.eyebrow}
          </div>
          <div className="mt-1 font-display text-[17px] lg:text-[19px] leading-tight text-[var(--color-bone)]">
            {t.title}
          </div>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--color-stone-soft)]">
            {t.body}
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-lime)]">
            {t.cta}
            <ArrowRight
              size={15}
              strokeWidth={2.5}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </a>
  );
}
