import { ArrowRight, Check, X } from "lucide-react";
import { B2BForm } from "./b2b-form";

const WORK_WITH = [
  "Дистрибьюторы и оптовики",
  "Аптечные сети и магазины",
  "Маркетплейсы: Wildberries, Ozon, Kaspi, Uzum",
  "Private label под ваш бренд",
];

const NOT_WORK = [
  "Розница и частные лица",
  "Заказы меньше $5 000",
  "Штучные покупки «для себя»",
];

const VALUE = [
  {
    title: "Прямые контракты US & EU",
    body: "Закупаем напрямую на заводах Америки и Европы — без прослойки посредников и лишних наценок.",
  },
  {
    title: "Документы под ваш рынок",
    body: "Готовое досье, сертификация и таможенное сопровождение под требования вашей страны.",
  },
  {
    title: "Логистика и сроки",
    body: "Отгрузка от 14 дней, регулярные поставки и контейнерные объёмы FCL / LCL под план продаж.",
  },
];

const TERMS = [
  { k: "Минимальный заказ", v: "от $5 000" },
  { k: "Отгрузка", v: "от 14 дней" },
  { k: "Форматы", v: "опт · контейнер · private label" },
  { k: "Рынки", v: "СНГ · Кавказ · Центральная Азия · MENA" },
];

export function B2BLanding() {
  return (
    <main className="relative bg-[var(--color-bone)] text-[var(--color-ink)]">
      {/* ─── Header ─── */}
      <header className="border-b border-[var(--color-line)]">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <a href="/" className="flex items-center" aria-label="KIQ Labs Global">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/logo-dark.webp"
              alt="KIQ Labs Global"
              className="h-8 lg:h-9 w-auto select-none"
              draggable={false}
            />
          </a>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-stone)]">
              Только B2B · опт от $5 000
            </span>
            <a
              href="#form"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-4 py-2 text-[12px] font-semibold text-[var(--color-bone)] transition-colors hover:bg-[var(--color-grass)]"
            >
              Оставить заявку
            </a>
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="px-6 lg:px-8">
        <div className="mx-auto max-w-[1120px] py-16 lg:py-24">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-grass)]">
            B2B-дистрибуция · США &amp; ЕС
          </div>
          <h1 className="mt-6 max-w-[18ch] font-display text-[34px] sm:text-[46px] lg:text-[60px] leading-[1.05] tracking-[-0.03em] text-balance">
            Оптовые поставки витаминов и спортпита напрямую с заводов США и Европы.
          </h1>
          <p className="mt-7 max-w-[58ch] text-[16px] lg:text-[18px] text-[var(--color-ink-soft)] leading-relaxed">
            Работаем только с бизнесом: дистрибьюторы, аптечные сети, маркетплейсы,
            private label. Минимальный заказ — от $5 000. Розницу и частные заказы
            не обслуживаем.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a
              href="#form"
              className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-ink)] pl-6 pr-2 py-3 text-[15px] font-semibold text-[var(--color-bone)] transition-colors hover:bg-[var(--color-grass)]"
            >
              Запросить B2B-прайс
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-lime)] text-[var(--color-bone)] transition-transform group-hover:translate-x-0.5">
                <ArrowRight size={16} strokeWidth={2.5} />
              </span>
            </a>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-stone)]">
              Прямые контракты · Документы под рынок · Отгрузка от 14 дней
            </span>
          </div>
        </div>
      </section>

      {/* ─── Для кого / Не для кого ─── */}
      <section className="border-t border-[var(--color-line)] px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-px overflow-hidden md:grid-cols-2">
          <div className="bg-[var(--color-bone)] py-12 lg:py-16 md:pr-10">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-grass)]">
              Работаем с
            </div>
            <ul className="mt-6 space-y-4">
              {WORK_WITH.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--color-grass)]/10">
                    <Check size={13} strokeWidth={2.5} className="text-[var(--color-grass)]" />
                  </span>
                  <span className="text-[16px] leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-[var(--color-line)] py-12 lg:py-16 md:border-l md:border-t-0 md:pl-10">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-stone)]">
              Не обслуживаем
            </div>
            <ul className="mt-6 space-y-4">
              {NOT_WORK.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--color-line)]">
                    <X size={13} strokeWidth={2.5} className="text-[var(--color-stone)]" />
                  </span>
                  <span className="text-[16px] leading-snug text-[var(--color-ink-soft)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Что получаете ─── */}
      <section className="border-t border-[var(--color-line)] px-6 lg:px-8">
        <div className="mx-auto max-w-[1120px] py-16 lg:py-20">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-stone)]">
            Что вы получаете
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
            {VALUE.map((v, i) => (
              <div key={v.title}>
                <div className="font-mono text-[12px] text-[var(--color-grass)]">
                  0{i + 1}
                </div>
                <h3 className="mt-3 font-display text-[20px] lg:text-[22px] leading-tight">
                  {v.title}
                </h3>
                <p className="mt-3 text-[15px] text-[var(--color-ink-soft)] leading-relaxed">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Условия ─── */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-ink)] px-6 text-[var(--color-bone)] lg:px-8">
        <div className="mx-auto max-w-[1120px] py-14 lg:py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {TERMS.map((t) => (
              <div key={t.k}>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-stone-soft)]">
                  {t.k}
                </div>
                <div className="mt-2 font-display text-[18px] lg:text-[20px] leading-tight">
                  {t.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Форма ─── */}
      <section id="form" className="scroll-mt-6 border-t border-[var(--color-line)] px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-start gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <h2 className="font-display text-[30px] sm:text-[40px] lg:text-[46px] leading-[1.06] tracking-[-0.025em] text-balance">
              Оставьте заявку — пришлём B2B-прайс за 1 рабочий день.
            </h2>
            <p className="mt-5 max-w-md text-[16px] text-[var(--color-ink-soft)] leading-relaxed">
              Пара вопросов о вашем канале и объёме — вышлем актуальный оптовый
              прайс и рассчитаем логистику под ваш рынок.
            </p>
            <div className="mt-8 space-y-3 border-t border-[var(--color-line)] pt-6">
              <a
                href="tel:+13126817103"
                className="flex items-center justify-between font-mono text-[13px] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
              >
                <span className="uppercase tracking-[0.16em] text-[var(--color-stone)]">
                  Телефон
                </span>
                +1 (312) 681‑7103
              </a>
              <a
                href="mailto:info@kiqlabs.global"
                className="flex items-center justify-between font-mono text-[13px] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
              >
                <span className="uppercase tracking-[0.16em] text-[var(--color-stone)]">
                  Email
                </span>
                info@kiqlabs.global
              </a>
            </div>
          </div>
          <B2BForm />
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-[var(--color-line)] px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-4 font-mono text-[12px] text-[var(--color-ink-soft)]">
          <span className="uppercase tracking-[0.16em]">
            KIQ Labs Global · B2B · только опт
          </span>
          <span className="text-[var(--color-stone)]">Chicago, IL · USA</span>
        </div>
      </footer>
    </main>
  );
}
