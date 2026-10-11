import { Check, Mail, Pill, ShoppingCart, Tags, Truck, X } from "lucide-react";
import { ButtonLink } from "@/components/b2b/ui/button";
import { Badge, Card } from "@/components/b2b/ui/card";
import { Accordion } from "@/components/b2b/ui/accordion";
import { LogoStrip } from "@/components/b2b/ui/logo-strip";
import {
  Container,
  Footer,
  Header,
  PhoneLink,
  Section,
  SectionHeader,
  TopStrip,
} from "@/components/b2b/ui/chrome";
import { StickyBar } from "@/components/b2b/ui/sticky-bar";
import { BottleGroup, ProductShelf } from "@/components/b2b/ui/bottles";
import { Blob } from "@/components/b2b/ui/blob";
import { EMAIL, FACTS } from "@/lib/b2b/constants";
import { PriceListMockup } from "./price-list-mockup";
import { DossierMockup } from "./dossier-mockup";
import { OfficesCard } from "./offices-card";
import { Comparison } from "./comparison";
import { LeadForm } from "./lead-form";

const CTA = "Получить B2B-прайс";

const STATS = [
  { value: FACTS.discount, label: "к закупке через трейдеров" },
  { value: FACTS.shipping, label: "отгрузка" },
  { value: FACTS.countries, label: "поставок" },
  { value: `от ${FACTS.minOrder}`, label: "минимальный заказ" },
];

const AUDIENCE = [
  { icon: Truck, title: "Дистрибьюторы", body: "Регулярные поставки под ваш регион и каналы сбыта" },
  { icon: Pill, title: "Аптечные сети", body: "Ассортимент с документами под полку аптеки" },
  {
    icon: ShoppingCart,
    title: "Интернет-магазины и селлеры маркетплейсов",
    body: "Документы и штрихкоды для карточек товара",
  },
  { icon: Tags, title: "Private Label", body: "Производство под вашим брендом на фабриках США и ЕС" },
];

const DOCS = [
  "Сертификаты анализа (CoA)",
  "Регистрационное досье",
  "Декларации ЕАЭС",
  "Таможенное сопровождение",
];

const STEPS = [
  { title: "Заявка", body: "Тип бизнеса, объём и страна поставки" },
  { title: "Прайс под ваш SKU-лист за 1 день", body: "Цены по вашим позициям и расчёт логистики" },
  { title: "Контракт", body: "Фиксируем цены, объём и сроки" },
  { title: `Отгрузка ${FACTS.shipping}`, body: "Документы под ваш рынок в комплекте" },
];

const FAQ = [
  { q: "Какой минимальный заказ?", a: "От $5 000 за заказ." },
  { q: "В какой валюте оплата?", a: "USD, а также KZT и UZS по договорённости." },
  { q: "Есть ли документы для моего рынка?", a: "Да, готовим досье под каждую страну из списка." },
  { q: "Какие сроки?", a: "14–28 дней с момента оплаты." },
];

export function B2BLanding() {
  return (
    <>
      <TopStrip>Только B2B · Минимальный заказ от $5 000 · Розница не обслуживается</TopStrip>
      <Header right={<PhoneLink />} />

      <main>
        {/* ─── Hero ─── */}
        <section id="hero" className="pb-12 pt-10 lg:pb-16 lg:pt-16">
          <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Badge size="md">Для дистрибьюторов и аптечных сетей</Badge>
              <h1 className="b2b-display mt-5 text-balance">
                Оптовые поставки витаминов и спортпита из США и ЕС
              </h1>
              <p className="b2b-lead mt-5 max-w-[560px]">
                Прямые контракты с фабриками. До −35% к закупке через трейдеров. Готовые
                документы под ваш рынок.
              </p>
              <ButtonLink href="#form" size="lg" className="mt-8 w-full sm:w-auto">
                {CTA}
              </ButtonLink>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-medium leading-[1.4] text-[var(--color-slate-gray)]">
                <li className="flex items-center gap-2">
                  <Check aria-hidden className="size-4 text-[var(--color-signal-blue)]" strokeWidth={2.5} />
                  Прайс за {FACTS.priceIn}
                </li>
                <li className="flex items-center gap-2">
                  <Check aria-hidden className="size-4 text-[var(--color-signal-blue)]" strokeWidth={2.5} />
                  Отгрузка {FACTS.shipping}
                </li>
              </ul>
            </div>
            {/* Коллаж: прайс-лист и банки поверх его нижнего правого угла. */}
            <div className="relative pb-32 sm:pb-16 lg:pb-20">
              <PriceListMockup />
              <BottleGroup
                eager
                ids={["omega-3", "triple-zinc", "biotin-plus"]}
                className="absolute bottom-0 right-1 w-[64%] sm:-bottom-2 sm:right-0 sm:w-[54%] lg:-right-10 lg:w-[60%]"
              />
            </div>
          </Container>
        </section>

        {/* ─── Бренды и полка ─── */}
        <Section className="py-8 lg:py-10">
          <LogoStrip caption={`${FACTS.brands} брендов с прямыми контрактами`} />
          <div className="relative mt-12 lg:mt-16">
            <Blob color="cyan" className="-top-6 left-[8%] size-40 lg:size-56" />
            <Blob color="magenta" className="right-[10%] top-2 size-36 lg:size-52" />
            <ProductShelf
              ids={[
                "creatine",
                "vitamin-d3",
                "omega-3",
                "triple-zinc",
                "marine-collagen",
                "magnesium-glycinate",
                "biotin-plus",
                "wpc80",
              ]}
              mobile={["creatine", "vitamin-d3", "triple-zinc", "marine-collagen"]}
            />
          </div>
        </Section>

        {/* ─── Цифры ─── */}
        <Section className="pt-4 lg:pt-6">
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map((s) => (
              <li key={s.label}>
                <Card className="h-full p-5 lg:p-6">
                  <div className="text-[24px] font-bold leading-[1.21] lg:text-[38px]">{s.value}</div>
                  <div className="mt-2 text-[14px] leading-[1.4] text-[var(--color-slate-gray)]">
                    {s.label}
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </Section>

        {/* ─── Для кого ─── */}
        <Section>
          <SectionHeader title="Для кого работаем" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCE.map((a) => {
              const Icon = a.icon;
              return (
                <li key={a.title}>
                  <Card className="h-full">
                    <span className="grid size-12 place-items-center rounded-[12px] bg-[var(--color-pebble)] text-[var(--color-signal-blue)]">
                      <Icon aria-hidden className="size-6" strokeWidth={1.75} />
                    </span>
                    <div className="mt-5 text-[20px] font-semibold leading-[1.4]">{a.title}</div>
                    <p className="mt-2 text-[16px] leading-[1.5] text-[var(--color-slate-gray)]">{a.body}</p>
                  </Card>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 flex items-center justify-center gap-2 text-center text-[14px] leading-[1.4] text-[var(--color-slate-gray)]">
            <X aria-hidden className="size-4 shrink-0" strokeWidth={2.5} />
            Не работаем с физлицами и розничными заказами
          </p>
        </Section>

        {/* ─── Трейдер или напрямую ─── */}
        <Section>
          <SectionHeader title="Трейдер или напрямую с завода" />
          <div className="mx-auto mt-10 max-w-[960px]">
            <Comparison />
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="#form" size="lg" className="w-full sm:w-auto">
              {CTA}
            </ButtonLink>
          </div>
        </Section>

        {/* ─── Документы ─── */}
        <Section>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="lg:order-2">
              <h2 className="b2b-h2 text-balance">Документы под ваш рынок</h2>
              <p className="mt-4 max-w-[520px] text-[16px] leading-[1.5] text-[var(--color-slate-gray)]">
                Готовим досье под требования каждой страны из списка поставок.
              </p>
              <ul className="mt-6 space-y-3">
                {DOCS.map((d) => (
                  <li key={d} className="flex items-center gap-3 text-[18px] font-medium leading-[1.4]">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[var(--color-badge-fill)] text-[var(--color-signal-blue)]">
                      <Check aria-hidden className="size-3.5" strokeWidth={3} />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative pb-16 lg:order-1 lg:pb-24">
              <DossierMockup />
              {/* Банки перед нижними (размытыми) строками досье. */}
              <BottleGroup
                ids={["magnesium-glycinate", "vitamin-d3"]}
                className="absolute bottom-0 right-2 w-[44%] sm:w-[34%] lg:-right-8 lg:w-[34%]"
              />
            </div>
          </div>
        </Section>

        {/* ─── Как работаем ─── */}
        <Section>
          <SectionHeader title="Как работаем" />
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="grid size-10 place-items-center rounded-full bg-[var(--color-badge-fill)] text-[16px] font-bold text-[var(--color-deep-cobalt)]">
                  {i + 1}
                </span>
                <div className="mt-4 text-[20px] font-semibold leading-[1.4]">{s.title}</div>
                <p className="mt-2 text-[16px] leading-[1.5] text-[var(--color-slate-gray)]">{s.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* ─── Откуда отгружаем ─── */}
        <Section>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="b2b-h2 text-balance">Откуда отгружаем</h2>
              <p className="b2b-lead mt-4 max-w-[520px]">
                Офисы в Чикаго, Варшаве и Дубае. Склады в США и ЕС.
              </p>
              <div className="mt-6 flex flex-col items-start gap-3">
                <PhoneLink />
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 text-[16px] font-semibold text-[var(--color-ink-navy)] hover:text-[var(--color-signal-blue)]"
                >
                  <Mail aria-hidden className="size-4" strokeWidth={2} />
                  {EMAIL}
                </a>
              </div>
            </div>
            <div className="relative">
              <OfficesCard />
              {/* Пакеты и банка — в правой (пустой) части строк, над подвалом карточки. */}
              <BottleGroup
                ids={["creatine", "wpc80", "marine-collagen"]}
                sizes={["z-10 w-[36%] -mr-[8%]", "z-20 w-[40%]", "z-10 w-[34%] -ml-[8%]"]}
                className="absolute bottom-[64px] right-1 w-[50%] sm:w-[44%] lg:-right-10 lg:w-[50%]"
              />
            </div>
          </div>
        </Section>

        {/* ─── Форма ─── */}
        <Section id="form" className="scroll-mt-16">
          <SectionHeader
            title="Получите B2B-прайс за 1 рабочий день"
            subtitle="Пришлём цены по вашим SKU, рассчитаем логистику и документы под ваш рынок"
          />
          <div className="mx-auto mt-10 max-w-[760px]">
            <LeadForm />
          </div>
        </Section>

        {/* ─── FAQ ─── */}
        <Section>
          <SectionHeader title="Частые вопросы" />
          <div className="mx-auto mt-10 max-w-[800px]">
            <Accordion items={FAQ} />
          </div>
        </Section>
      </main>

      <Footer className="pb-28 lg:pb-10" />
      <StickyBar label="Получить прайс" />
    </>
  );
}
