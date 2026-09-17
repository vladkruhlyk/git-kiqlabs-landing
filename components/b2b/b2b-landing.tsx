import { ArrowRight, Check, X, Factory, FileCheck2, Truck } from "lucide-react";
import { B2BForm } from "./b2b-form";

const BOTTLES = [
  { src: "/media/photo1.png", alt: "OstroVit Omega 3" },
  { src: "/media/photo2.png", alt: "OstroVit Biotin Plus" },
  { src: "/media/photo3.png", alt: "OstroVit Triple Zinc" },
];

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
    icon: Factory,
    title: "Прямые контракты US & EU",
    body: "Закупаем напрямую на заводах Америки и Европы — без прослойки посредников и лишних наценок.",
  },
  {
    icon: FileCheck2,
    title: "Документы под ваш рынок",
    body: "Готовое досье, сертификация и таможенное сопровождение под требования вашей страны.",
  },
  {
    icon: Truck,
    title: "Логистика и сроки",
    body: "Отгрузка от 14 дней, регулярные поставки и контейнерные объёмы FCL / LCL под план продаж.",
  },
];

const STEPS = [
  { n: "01", title: "Заявка", body: "Оставляете заявку с типом бизнеса и объёмом." },
  { n: "02", title: "B2B-прайс", body: "В течение дня присылаем прайс и условия." },
  { n: "03", title: "Образцы и документы", body: "Согласуем ассортимент, готовим досье." },
  { n: "04", title: "Отгрузка", body: "Отгружаем от 14 дней, дальше — регулярно." },
];

const TERMS = [
  { k: "Минимальный заказ", v: "от $5 000" },
  { k: "Отгрузка", v: "от 14 дней" },
  { k: "Форматы", v: "опт · контейнер · private label" },
  { k: "Рынки", v: "СНГ · Кавказ · Центр. Азия · MENA" },
];

const H = "font-sans font-bold tracking-[-0.02em]";

export function B2BLanding() {
  return (
    <main className="relative bg-[var(--color-bone)] text-[var(--color-ink)]">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-bone)]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-6 py-3.5 lg:px-8">
          <a href="/" className="flex items-center" aria-label="KIQ Labs Global">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/logo-dark.webp"
              alt="KIQ Labs Global"
              className="h-8 w-auto select-none"
              draggable={false}
            />
          </a>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-[13px] font-medium text-[var(--color-stone)]">
              Только опт · от $5 000
            </span>
            <a
              href="#form"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-ink)] px-4 py-2 text-[13px] font-semibold text-[var(--color-bone)] transition-colors hover:bg-[var(--color-grass)]"
            >
              Оставить заявку
            </a>
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-bone-deep)] px-3 py-1.5 text-[13px] font-medium text-[var(--color-grass)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-grass)]" />
              B2B-дистрибуция · США и ЕС
            </div>
            <h1 className={`${H} mt-6 text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.08] text-balance`}>
              Витамины и спортпит оптом — напрямую с заводов США и Европы
            </h1>
            <p className="mt-6 max-w-[52ch] text-[16px] lg:text-[18px] text-[var(--color-ink-soft)] leading-relaxed">
              Работаем только с бизнесом: дистрибьюторы, аптечные сети, маркетплейсы,
              private label. Минимальный заказ — от $5 000. Розницу не обслуживаем.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#form"
                className="group inline-flex items-center gap-2.5 rounded-lg bg-[var(--color-ink)] px-6 py-3.5 text-[15px] font-semibold text-[var(--color-bone)] transition-colors hover:bg-[var(--color-grass)]"
              >
                Запросить B2B-прайс
                <ArrowRight size={17} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="tel:+13126817103"
                className="text-[15px] font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
              >
                +1 (312) 681‑7103
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-[var(--color-stone)]">
              <span className="inline-flex items-center gap-2">
                <Check size={15} className="text-[var(--color-grass)]" /> Прямые контракты
              </span>
              <span className="inline-flex items-center gap-2">
                <Check size={15} className="text-[var(--color-grass)]" /> Документы под рынок
              </span>
              <span className="inline-flex items-center gap-2">
                <Check size={15} className="text-[var(--color-grass)]" /> Отгрузка от 14 дней
              </span>
            </div>
          </div>

          {/* Photo panel */}
          <div className="relative">
            <div
              className="relative flex items-end justify-center gap-2 overflow-hidden rounded-3xl border border-[var(--color-line)] px-4 pt-10 sm:gap-4 sm:px-8"
              style={{
                background:
                  "linear-gradient(160deg, #eef2fb 0%, #f7f8fa 60%, #ffffff 100%)",
              }}
            >
              {BOTTLES.map((b, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={b.src}
                  src={b.src}
                  alt={b.alt}
                  className={`h-auto w-1/3 object-contain drop-shadow-[0_18px_28px_rgba(18,23,42,0.16)] ${
                    i === 1 ? "-mb-2 w-[38%]" : "mb-4"
                  }`}
                  draggable={false}
                />
              ))}
            </div>
            <div className="absolute left-4 top-4 rounded-lg bg-[var(--color-ink)] px-3 py-2 text-[var(--color-bone)] shadow-lg sm:left-6 sm:top-6">
              <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-stone-soft)]">
                Бренды US & EU
              </div>
              <div className="text-[14px] font-semibold">OstroVit · и другие</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Работаем только с B2B ─── */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-bone-deep)] px-6 lg:px-8">
        <div className="mx-auto max-w-[1120px] py-14 lg:py-20">
          <h2 className={`${H} text-[26px] lg:text-[32px] leading-tight`}>
            Работаем только с бизнесом
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-bone)] p-7">
              <div className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--color-grass)]">
                Работаем с
              </div>
              <ul className="mt-5 space-y-3.5">
                {WORK_WITH.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check size={18} strokeWidth={2.5} className="mt-0.5 shrink-0 text-[var(--color-grass)]" />
                    <span className="text-[15px] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-bone)] p-7">
              <div className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--color-stone)]">
                Не обслуживаем
              </div>
              <ul className="mt-5 space-y-3.5">
                {NOT_WORK.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X size={18} strokeWidth={2.5} className="mt-0.5 shrink-0 text-[var(--color-stone-soft)]" />
                    <span className="text-[15px] leading-snug text-[var(--color-ink-soft)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Что вы получаете ─── */}
      <section className="border-t border-[var(--color-line)] px-6 lg:px-8">
        <div className="mx-auto max-w-[1120px] py-14 lg:py-20">
          <h2 className={`${H} text-[26px] lg:text-[32px] leading-tight`}>
            Что вы получаете
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {VALUE.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-bone)] p-7"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--color-grass)]/10 text-[var(--color-grass)]">
                    <Icon size={22} strokeWidth={2} />
                  </span>
                  <h3 className="mt-5 text-[18px] font-semibold leading-tight">
                    {v.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] text-[var(--color-ink-soft)] leading-relaxed">
                    {v.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Как это работает ─── */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-bone-deep)] px-6 lg:px-8">
        <div className="mx-auto max-w-[1120px] py-14 lg:py-20">
          <h2 className={`${H} text-[26px] lg:text-[32px] leading-tight`}>
            Как это работает
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n}>
                <div className="text-[13px] font-bold text-[var(--color-grass)]">
                  {s.n}
                </div>
                <h3 className="mt-2 text-[17px] font-semibold leading-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-[14px] text-[var(--color-ink-soft)] leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Условия ─── */}
      <section className="bg-[var(--color-ink)] px-6 text-[var(--color-bone)] lg:px-8">
        <div className="mx-auto max-w-[1120px] py-12 lg:py-14">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {TERMS.map((t) => (
              <div key={t.k}>
                <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--color-stone-soft)]">
                  {t.k}
                </div>
                <div className="mt-2 text-[18px] font-bold leading-tight tracking-[-0.01em]">
                  {t.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Форма ─── */}
      <section id="form" className="scroll-mt-16 border-t border-[var(--color-line)] px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-start gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <h2 className={`${H} text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.1] text-balance`}>
              Оставьте заявку — пришлём B2B-прайс за 1 рабочий день
            </h2>
            <p className="mt-5 max-w-md text-[16px] text-[var(--color-ink-soft)] leading-relaxed">
              Пара вопросов о вашем канале и объёме — вышлем актуальный оптовый
              прайс и рассчитаем логистику под ваш рынок.
            </p>
            <div className="mt-8 space-y-2.5 border-t border-[var(--color-line)] pt-6 text-[14px]">
              <a href="tel:+13126817103" className="flex items-center justify-between text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]">
                <span className="text-[var(--color-stone)]">Телефон</span>
                <span className="font-medium">+1 (312) 681‑7103</span>
              </a>
              <a href="mailto:info@kiqlabs.global" className="flex items-center justify-between text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]">
                <span className="text-[var(--color-stone)]">Email</span>
                <span className="font-medium">info@kiqlabs.global</span>
              </a>
            </div>
          </div>
          <B2BForm />
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-[var(--color-line)] px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3 text-[13px] text-[var(--color-ink-soft)]">
          <span className="font-medium">KIQ Labs Global · B2B · только опт</span>
          <span className="text-[var(--color-stone)]">Chicago, IL · USA</span>
        </div>
      </footer>
    </main>
  );
}
