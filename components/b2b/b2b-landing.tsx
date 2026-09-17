import {
  ArrowRight,
  Check,
  X,
  ShieldCheck,
  Factory,
  Repeat,
  Headset,
  Tags,
  Boxes,
  Pill,
  Dumbbell,
  Atom,
  Droplets,
  ShieldPlus,
  Sparkles,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { B2BForm } from "./b2b-form";
import { B2BBottles } from "./b2b-bottles";

const H = "font-sans font-bold tracking-[-0.02em]";
const CARD =
  "rounded-2xl border border-[var(--color-line)] bg-[var(--color-bone)] shadow-[0_1px_3px_rgba(18,23,42,0.05)]";
const CARD_HOVER =
  "hover:shadow-[0_8px_24px_rgba(18,23,42,0.08)] hover:-translate-y-0.5 transition-[transform,box-shadow] duration-200";

const HERO_CHECKS = [
  "Прямые контракты US & EU",
  "Документы под рынок (EAC · СГР)",
  "Отгрузка от 14 дней",
  "Ответ с прайсом за 1 рабочий день",
];

const STATS = [
  { v: "20+", k: "Брендов US & EU", d: "OstroVit и другие в активной матрице" },
  { v: "300+", k: "SKU в портфеле", d: "витамины, спортпит, БАДы, красота" },
  { v: "6", k: "Товарных категорий", d: "от мультивитаминов до предтреников" },
  { v: "15+", k: "Стран отгрузки", d: "СНГ · Кавказ · Центр. Азия · MENA" },
  { v: "от $5 000", k: "Минимальный заказ", d: "по актуальному B2B-прайсу" },
  { v: "от 14 дней", k: "Первая отгрузка", d: "далее регулярно по графику" },
];

const WORK_WITH = [
  { t: "Дистрибьюторы и оптовики", d: "региональные и федеральные закупки" },
  { t: "Аптечные сети и магазины", d: "стабильный ассортимент под полку" },
  { t: "Маркетплейсы: WB, Ozon, Kaspi, Uzum", d: "документы и штрихкоды под карточку" },
  { t: "Private label под ваш бренд", d: "ваш дизайн на производстве США / ЕС" },
  { t: "Фитнес-клубы и спортивные сети", d: "спортпит под свой канал продаж" },
];

const NOT_WORK = [
  { t: "Розница и частные лица", d: "продаём только бизнесу" },
  { t: "Заказы меньше $5 000", d: "ниже оптового порога" },
  { t: "Штучные покупки «для себя»", d: "не наш формат" },
  { t: "Дропшиппинг и разовые перепродажи", d: "работаем на регулярный объём" },
];

const CATS = [
  {
    icon: Pill,
    title: "Витамины и минералы",
    body: "Мультивитамины, D3+K2, магний, цинк, железо, комплексы под возраст.",
    sku: "80+ SKU",
  },
  {
    icon: Dumbbell,
    title: "Спортивное питание",
    body: "Сывороточный протеин и изолят, гейнеры, креатин, предтреники.",
    sku: "70+ SKU",
  },
  {
    icon: Atom,
    title: "Аминокислоты и BCAA",
    body: "BCAA, EAA, L-карнитин, глютамин, бета-аланин.",
    sku: "40+ SKU",
  },
  {
    icon: Droplets,
    title: "Омега и жирные кислоты",
    body: "Omega-3 (EPA/DHA), рыбий жир, льняное масло, витамин D.",
    sku: "25+ SKU",
  },
  {
    icon: ShieldPlus,
    title: "Иммунитет и адаптогены",
    body: "Витамин C, цинк, эхинацея, ашваганда, куркумин.",
    sku: "45+ SKU",
  },
  {
    icon: Sparkles,
    title: "Красота и здоровье",
    body: "Коллаген, биотин, гиалуроновая кислота, пробиотики.",
    sku: "40+ SKU",
  },
];

const VALUE = [
  {
    icon: Factory,
    title: "Прямые контракты US & EU",
    body: "Закупаем напрямую на заводах Америки и Европы — без прослойки посредников и лишних наценок.",
  },
  {
    icon: ShieldCheck,
    title: "Контроль качества и оригинал",
    body: "Только заводские партии с действующими сроками годности и заводскими сертификатами на каждую поставку.",
  },
  {
    icon: Repeat,
    title: "Стабильные поставки",
    body: "Держим приоритетные позиции на складе и планируем закупку под ваш оборот — без срывов графика.",
  },
  {
    icon: Headset,
    title: "Персональный менеджер",
    body: "Один контакт на всё: прайс, документы, логистика, рекламации. Ответ в рабочее время.",
  },
  {
    icon: Tags,
    title: "Private label под ваш бренд",
    body: "Рецептура, дизайн упаковки и документы на проверенных производствах США / ЕС.",
  },
  {
    icon: Boxes,
    title: "Гибкие объёмы",
    body: "От первого пробного заказа до контейнеров; эксклюзив по региону — при регулярном объёме.",
  },
];

const DOCS = [
  "Сертификат происхождения (Certificate of Origin)",
  "Инвойс и упаковочный лист",
  "Декларации и сертификаты ТР ТС / EAC, СГР под рынок",
  "Сертификаты GMP заводов-производителей (США / ЕС)",
  "Лабораторные протоколы и составы (CoA)",
  "Штрихкоды и карточки для WB / Ozon / Kaspi",
  "Маркировка «Честный ЗНАК» — при необходимости",
  "Договор поставки и спецификация",
];

const STEPS = [
  { n: "01", title: "Заявка", body: "Оставляете заявку с типом бизнеса и объёмом.", when: "5 минут" },
  { n: "02", title: "B2B-прайс", body: "В течение дня присылаем прайс и условия.", when: "1 рабочий день" },
  { n: "03", title: "Образцы и документы", body: "Согласуем ассортимент, готовим досье.", when: "3–5 дней" },
  { n: "04", title: "Отгрузка", body: "Отгружаем от 14 дней, дальше — регулярно.", when: "от 14 дней" },
];

const REGIONS = [
  { region: "Центральная Азия", countries: ["Казахстан", "Узбекистан", "Кыргызстан", "Таджикистан", "Туркменистан"] },
  { region: "Кавказ", countries: ["Азербайджан", "Грузия", "Армения"] },
  { region: "СНГ / Вост. Европа", countries: ["Россия", "Беларусь", "Молдова"] },
  { region: "MENA", countries: ["ОАЭ", "Саудовская Аравия", "Египет", "Турция"] },
];

const TERMS = [
  { k: "Условия поставки", v: "EXW · FOB · CIF · DDP" },
  { k: "Форматы", v: "контейнер FCL · сборный LCL · авиа" },
  { k: "Минимальный заказ", v: "от $5 000" },
  { k: "Оплата", v: "договор · безнал USD/EUR · SWIFT" },
];

const FAQ = [
  {
    q: "Какой минимальный заказ?",
    a: "От $5 000 по сумме. Меньше не отгружаем — работаем только оптом.",
  },
  {
    q: "Работаете ли с розницей и частными лицами?",
    a: "Нет. Только с юрлицами и ИП: дистрибьюторы, сети, маркетплейсы, private label.",
  },
  {
    q: "Как быстро пришлёте прайс?",
    a: "В течение 1 рабочего дня после заявки: актуальный прайс, остатки и расчёт логистики под ваш рынок.",
  },
  {
    q: "Кто занимается сертификацией и растаможкой?",
    a: "Берём на себя: готовим документы под ваш рынок и сопровождаем таможенное оформление.",
  },
  {
    q: "Можно выпускать под своим брендом?",
    a: "Да, private label: ваша этикетка и бренд на проверенном производстве США / ЕС. Тиражи обсуждаются.",
  },
  {
    q: "Как происходит оплата и какие сроки?",
    a: "По договору поставки, безналичный расчёт USD / EUR (SWIFT). Первая отгрузка — от 14 дней, далее регулярно по графику.",
  },
];

const NEXT = [
  "Пришлём актуальный B2B-прайс и остатки.",
  "Рассчитаем логистику и условия под ваш рынок.",
  "Согласуем образцы и документы под отгрузку.",
];

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
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-bone-deep)] px-3 py-1 text-[13px] font-medium text-[var(--color-stone)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-grass)]" />
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
        <div className="h-0.5 w-full bg-gradient-to-r from-[var(--color-grass)] to-[var(--color-lime)]" />
      </header>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden px-6 lg:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(120% 90% at 15% 0%, rgba(19,72,194,0.06) 0%, transparent 55%)",
          }}
        />
        <div className="relative mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-8 py-12 lg:grid-cols-2 lg:gap-12 lg:py-16">
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
              {HERO_CHECKS.map((c) => (
                <span key={c} className="inline-flex items-center gap-2">
                  <Check size={15} className="text-[var(--color-grass)]" /> {c}
                </span>
              ))}
            </div>
          </div>

          {/* Photo panel */}
          <div className="relative">
            <div
              className="relative overflow-hidden rounded-3xl border border-[var(--color-line)]"
              style={{
                background:
                  "linear-gradient(160deg, #eaf0fb 0%, #f5f7fa 55%, #ffffff 100%)",
              }}
            >
              <B2BBottles />
              <div className="absolute inset-x-4 bottom-4 rounded-lg bg-[var(--color-ink)]/85 px-4 py-2.5 text-center text-[12px] font-medium text-[var(--color-bone)] backdrop-blur-sm">
                Витамины · Спортпит · БАДы · Красота
              </div>
            </div>
            <div className="absolute -top-3 left-5 rounded-xl bg-[var(--color-ink)] px-4 py-2.5 text-[var(--color-bone)] shadow-[0_12px_30px_rgba(18,23,42,0.25)]">
              <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-stone-soft)]">
                Бренды US &amp; EU
              </div>
              <div className="text-[14px] font-semibold">OstroVit · и другие</div>
              <div className="mt-0.5 text-[11px] text-[var(--color-stone-soft)]">
                20+ брендов в матрице
              </div>
            </div>
            <div className="absolute -top-3 right-5 inline-flex items-center gap-1.5 rounded-xl border border-[var(--color-line)] bg-[var(--color-bone)]/85 px-3 py-2 text-[12px] font-semibold shadow-[0_12px_30px_rgba(18,23,42,0.12)] backdrop-blur">
              <ShieldCheck size={15} className="text-[var(--color-grass)]" />
              GMP · США и ЕС
            </div>
          </div>
        </div>
      </section>

      {/* ─── Полоса цифр ─── */}
      <section className="relative overflow-hidden border-y border-[var(--color-line)] bg-[var(--color-bone-deep)] px-6 lg:px-8">
        <DotTexture />
        <div className="relative mx-auto max-w-[1120px] py-12 lg:py-14">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-grass)]">
            Масштаб
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
            {STATS.map((s) => (
              <div key={s.k}>
                <div className={`${H} text-[26px] lg:text-[30px] text-[var(--color-grass)]`}>
                  {s.v}
                </div>
                <div className="mt-1 text-[14px] font-semibold text-[var(--color-ink)]">
                  {s.k}
                </div>
                <div className="text-[12px] leading-snug text-[var(--color-stone)]">
                  {s.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Работаем только с бизнесом ─── */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-bone)] px-6 lg:px-8">
        <div className="mx-auto max-w-[1120px] py-12 lg:py-16">
          <SectionHead
            eyebrow="Кому подходит"
            title="Работаем только с бизнесом"
            subhead="Отсекаем розницу на входе — так держим оптовые цены и сроки для бизнеса."
          />
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className={`${CARD} p-7`}>
              <div className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--color-grass)]">
                Работаем с
              </div>
              <ul className="mt-3 divide-y divide-[var(--color-line)]">
                {WORK_WITH.map((item) => (
                  <li key={item.t} className="flex items-start gap-3 py-3">
                    <Check size={18} strokeWidth={2.5} className="mt-0.5 shrink-0 text-[var(--color-grass)]" />
                    <div>
                      <div className="text-[15px] font-medium leading-snug">{item.t}</div>
                      <div className="mt-0.5 text-[13px] text-[var(--color-stone)]">{item.d}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${CARD} p-7`}>
              <div className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--color-stone)]">
                Не обслуживаем
              </div>
              <ul className="mt-3 divide-y divide-[var(--color-line)]">
                {NOT_WORK.map((item) => (
                  <li key={item.t} className="flex items-start gap-3 py-3">
                    <X size={18} strokeWidth={2.5} className="mt-0.5 shrink-0 text-[var(--color-stone-soft)]" />
                    <div>
                      <div className="text-[15px] font-medium leading-snug text-[var(--color-ink-soft)]">{item.t}</div>
                      <div className="mt-0.5 text-[13px] text-[var(--color-stone)]">{item.d}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Ассортимент ─── */}
      <section className="relative overflow-hidden border-t border-[var(--color-line)] bg-[var(--color-bone-deep)] px-6 lg:px-8">
        <DotTexture />
        <div className="relative mx-auto max-w-[1120px] py-12 lg:py-16">
          <SectionHead
            eyebrow="Ассортимент"
            title="Что возим — 6 категорий, 300+ SKU в портфеле"
            subhead="Витамины, спортивное питание и нутрицевтика брендов США и ЕС. Ходовые позиции держим на складе, редкие — привозим под заказ к отгрузке."
          />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATS.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className={`group ${CARD} ${CARD_HOVER} p-6`}>
                  <div className="flex items-center">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--color-grass)]/10 text-[var(--color-grass)]">
                      <Icon size={20} strokeWidth={2} />
                    </span>
                    <span className="ml-auto rounded-full bg-[var(--color-grass)]/10 px-2.5 py-1 text-[12px] font-semibold text-[var(--color-grass)]">
                      {c.sku}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[17px] font-semibold leading-tight">{c.title}</h3>
                  <p className="mt-1.5 text-[14px] text-[var(--color-ink-soft)] leading-relaxed">
                    {c.body}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-[13px] text-[var(--color-stone)]">
            Полный каталог с остатками пришлём вместе с B2B-прайсом под ваш рынок.
          </p>
        </div>
      </section>

      {/* ─── Что вы получаете ─── */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-bone)] px-6 lg:px-8">
        <div className="mx-auto max-w-[1120px] py-12 lg:py-16">
          <SectionHead
            eyebrow="Почему мы"
            title="Что вы получаете как партнёр"
            subhead="Не разовая продажа, а канал поставок с предсказуемым качеством, сроками и одним ответственным контактом."
          />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUE.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className={`group ${CARD} ${CARD_HOVER} p-6`}>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--color-grass)]/10 text-[var(--color-grass)]">
                    <Icon size={22} strokeWidth={2} />
                  </span>
                  <h3 className="mt-5 text-[18px] font-semibold leading-tight">{v.title}</h3>
                  <p className="mt-2.5 text-[15px] text-[var(--color-ink-soft)] leading-relaxed">
                    {v.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Документы и соответствие ─── */}
      <section className="relative overflow-hidden border-t border-[var(--color-line)] bg-[var(--color-bone-deep)] px-6 lg:px-8">
        <DotTexture />
        <div className="relative mx-auto grid max-w-[1120px] grid-cols-1 gap-8 py-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 lg:py-16">
          <div>
            <SectionHead
              eyebrow="Документы и соответствие"
              title="Полный пакет документов под ваш рынок и маркетплейсы"
              subhead="Готовим досье под требования вашей страны — от таможни до карточки товара на Wildberries и Ozon."
            />
            <p className="mt-4 text-[14px] text-[var(--color-ink-soft)] leading-relaxed">
              Сертификация и оформление — на нашей стороне. Вы получаете товар,
              готовый к легальной продаже и заводке на маркетплейсы.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:pt-2">
            {DOCS.map((d) => (
              <div key={d} className="flex items-start gap-2.5 text-[14px] leading-snug">
                <Check size={17} className="mt-0.5 shrink-0 text-[var(--color-grass)]" />
                <span>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Как это работает ─── */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-bone)] px-6 lg:px-8">
        <div className="mx-auto max-w-[1120px] py-12 lg:py-16">
          <SectionHead
            eyebrow="Процесс"
            title="Как это работает"
            subhead="От заявки до первой отгрузки — четыре шага и один рабочий день на прайс."
          />
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                className={`group relative overflow-hidden ${CARD} ${CARD_HOVER} p-6`}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-1 right-3 select-none text-[64px] font-bold leading-none text-[var(--color-line)]"
                >
                  {s.n}
                </span>
                <div className="relative flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--color-ink)] text-[14px] font-bold text-[var(--color-bone)]">
                    {i + 1}
                  </span>
                  <span className="ml-auto rounded-full bg-[var(--color-grass)]/10 px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-grass)]">
                    {s.when}
                  </span>
                </div>
                <h3 className="relative mt-4 text-[17px] font-semibold leading-tight">{s.title}</h3>
                <p className="relative mt-2 text-[14px] text-[var(--color-ink-soft)] leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── География, логистика и условия ─── */}
      <section className="relative overflow-hidden bg-[var(--color-ink)] px-6 text-[var(--color-bone)] lg:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            opacity: 0.05,
          }}
        />
        <div className="relative mx-auto max-w-[1120px] py-14 lg:py-16">
          <div className="h-0.5 w-8 bg-[var(--color-lime)] mb-4" />
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-stone-soft)]">
            География и логистика
          </div>
          <h2 className={`${H} mt-3 text-[26px] lg:text-[32px] leading-tight`}>
            Отгружаем в СНГ, на Кавказ, в Центральную Азию и MENA
          </h2>
          <p className="mt-3 max-w-[620px] text-[15px] leading-relaxed text-[var(--color-stone-soft)]">
            Подбираем маршрут и условия под ваш рынок — от растаможки до доставки на ваш склад.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {REGIONS.map((r) => (
              <div key={r.region} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em]">
                  <MapPin size={15} className="text-[var(--color-lime)]" />
                  {r.region}
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {r.countries.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center rounded-full bg-white/8 px-2.5 py-1 text-[12px]"
                    >
                      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-lime)]" />
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-[13px] md:grid-cols-4 md:p-6">
            {TERMS.map((t) => (
              <div key={t.k}>
                <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--color-stone-soft)]">
                  {t.k}
                </div>
                <div className="mt-1.5 font-semibold text-[var(--color-bone)]">{t.v}</div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <a
              href="#form"
              className="group inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--color-lime)] hover:text-[var(--color-bone)]"
            >
              Запросить B2B-прайс
              <ArrowRight size={16} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── Частые вопросы ─── */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-bone)] px-6 lg:px-8">
        <div className="mx-auto max-w-[1120px] py-12 lg:py-16">
          <SectionHead eyebrow="Вопросы" title="Частые вопросы B2B-покупателей" />
          <div className="mt-8 max-w-[860px] space-y-3">
            {FAQ.map((f, i) => (
              <details
                key={f.q}
                open={i === 0}
                className="group rounded-xl border border-[var(--color-line)] bg-[var(--color-bone-deep)] p-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-semibold leading-snug">
                  {f.q}
                  <ChevronDown
                    size={18}
                    className="shrink-0 text-[var(--color-stone)] transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 text-[15px] text-[var(--color-ink-soft)] leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Форма ─── */}
      <section
        id="form"
        className="scroll-mt-16 border-t border-[var(--color-line)] bg-[var(--color-bone-deep)] px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-start gap-10 py-12 lg:grid-cols-2 lg:py-16">
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
            <div className="mt-8 border-t border-[var(--color-line)] pt-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-grass)]">
                Что дальше
              </div>
              <ul className="mt-4 space-y-3">
                {NEXT.map((n, i) => (
                  <li key={n} className="flex items-start gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--color-ink)] text-[12px] font-bold text-[var(--color-bone)]">
                      {i + 1}
                    </span>
                    <span className="text-[14px] text-[var(--color-ink-soft)]">{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <B2BForm />
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-[var(--color-ink)] px-6 py-12 text-[var(--color-bone)] lg:px-8">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/logo-light.webp"
                alt="KIQ Labs Global"
                className="h-8 w-auto select-none"
                draggable={false}
              />
              <p className="mt-4 text-[13px] leading-relaxed text-[var(--color-stone-soft)]">
                KIQ Labs Global — B2B-дистрибуция витаминов и спортпита США и ЕС.
                Только опт от $5 000.
              </p>
            </div>
            <div>
              <div className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-stone-soft)]">
                Контакты
              </div>
              <div className="mt-3 space-y-1.5 text-[14px]">
                <a href="tel:+13126817103" className="block hover:text-[var(--color-lime)]">
                  +1 (312) 681‑7103
                </a>
                <a href="mailto:info@kiqlabs.global" className="block hover:text-[var(--color-lime)]">
                  info@kiqlabs.global
                </a>
                <div className="text-[var(--color-stone-soft)]">Chicago, IL · USA</div>
              </div>
            </div>
            <div>
              <div className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-stone-soft)]">
                Направления
              </div>
              <div className="mt-3 space-y-1.5 text-[14px] text-[var(--color-stone-soft)]">
                <div>Дистрибуция</div>
                <div>Маркетплейсы</div>
                <div>Private label</div>
                <div>Контейнерные поставки</div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-[13px] text-[var(--color-stone-soft)]">
            <span>KIQ Labs Global · B2B · только опт</span>
            <span>Chicago, IL · USA</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function SectionHead({
  eyebrow,
  title,
  subhead,
}: {
  eyebrow: string;
  title: string;
  subhead?: string;
}) {
  return (
    <div>
      <div className="mb-4 h-0.5 w-8 bg-[var(--color-grass)]" />
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-grass)]">
        {eyebrow}
      </div>
      <h2 className={`${H} mt-3 text-[26px] lg:text-[32px] leading-tight`}>{title}</h2>
      {subhead && (
        <p className="mt-3 max-w-[620px] text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
          {subhead}
        </p>
      )}
    </div>
  );
}

function DotTexture() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: "radial-gradient(var(--color-line) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        opacity: 0.5,
      }}
    />
  );
}
