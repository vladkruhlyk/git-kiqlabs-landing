import { ButtonLink } from "@/components/b2b/ui/button";
import { Badge, Card } from "@/components/b2b/ui/card";
import { LogoStrip } from "@/components/b2b/ui/logo-strip";
import { Container, Footer, Header, Section, SectionHeader } from "@/components/b2b/ui/chrome";
import { FACTS } from "@/lib/b2b/constants";
import type { B2BCountry } from "@/lib/b2b/countries";
import { guidePdf } from "@/lib/b2b/guides";
import { CostPathPreview } from "./cost-path-preview";
import { GuideCover } from "./guide-cover";
import { GuideForm } from "./guide-form";

const CTA = "Получить гайд";

/** Лендинг лид-магнита. Подача — как у отраслевого издания: воздух, спокойный тон. */
export function GuideLanding({ country }: { country?: B2BCountry }) {
  // Без ?country — общий вариант для региона.
  const where = country?.acc ?? "Центральную Азию";
  const market = country?.marketplace ?? "маркетплейсов";
  const title = `Как завезти витамины из США в ${where}`;

  const contents = [
    `Какие документы нужны для ввоза${country?.union ? ` в ${country.union}` : ""} и сколько их ждать`,
    "Разбор себестоимости одного SKU от завода до полки",
    "Топ-20 позиций с лучшей маржой в регионе",
    "5 ошибок, на которых теряют первую партию",
    "Чек-лист перед первой закупкой",
  ];

  return (
    <>
      <Header right={<Badge size="md">Бесплатно для бизнеса</Badge>} />

      <main>
        {/* ─── Hero ─── */}
        <section className="pb-14 pt-10 lg:pb-24 lg:pt-20">
          <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div>
              <Badge size="md">Гайд 2026 · 14 страниц</Badge>
              <h1 className="b2b-display mt-5 text-balance">{title}</h1>
              <p className="b2b-lead mt-5 max-w-[560px]">
                Документы, сроки и реальная себестоимость — для аптечных сетей, дистрибьюторов
                и селлеров {market}
              </p>
              <ButtonLink href="#form" size="lg" className="mt-8 w-full sm:w-auto">
                {CTA}
              </ButtonLink>
              <p className="mt-3 text-[14px] leading-[1.4] text-[var(--color-slate-gray)]">
                PDF доступен сразу после отправки формы
              </p>
            </div>
            <GuideCover where={where} />
          </Container>
        </section>

        {/* ─── Что внутри ─── */}
        <Section className="lg:py-20">
          <SectionHeader title="Что внутри" />
          <ol className="mx-auto mt-10 grid max-w-[1000px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {contents.map((t, i) => (
              <li key={t}>
                <Card className="h-full">
                  <span className="text-[38px] font-bold leading-[1.21] text-[var(--color-mist-gray)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-[20px] font-semibold leading-[1.4]">{t}</p>
                </Card>
              </li>
            ))}
          </ol>
        </Section>

        {/* ─── Превью страницы ─── */}
        <Section className="lg:py-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="lg:order-2">
              <h2 className="b2b-h2 text-balance">Где теряется маржа на импорте</h2>
              <p className="b2b-lead mt-5 max-w-[520px]">
                Путь одного SKU разобран по шагам — закупка, логистика, растаможка, документы.
                На каждом этапе видно, сколько добавляет посредник и что из этого можно убрать
                при прямом контракте.
              </p>
            </div>
            <div className="lg:order-1">
              <CostPathPreview />
            </div>
          </div>
        </Section>

        {/* ─── Для кого ─── */}
        <Section className="lg:py-20">
          <div className="mx-auto max-w-[760px] text-center">
            <h2 className="b2b-h2">Для кого</h2>
            <p className="mt-5 text-[20px] leading-[1.4]">
              Для компаний, которые уже импортируют или планируют закупать витамины и БАДы
              оптом от $5 000.
            </p>
            <p className="mt-4 text-[14px] leading-[1.4] text-[var(--color-slate-gray)]">
              Гайд не предназначен для частных покупателей.
            </p>
          </div>
        </Section>

        {/* ─── Кто составил ─── */}
        <Section className="lg:py-20">
          <Card className="mx-auto max-w-[1000px] p-6 sm:p-10">
            <div className="text-center">
              <h2 className="b2b-h2">Кто составил</h2>
              <p className="mx-auto mt-5 max-w-[640px] text-[18px] leading-[1.5] text-[var(--color-slate-gray)]">
                KIQ Labs Global: прямые контракты с {FACTS.brands} фабриками США и ЕС, поставки
                в {FACTS.countries}, офисы в Чикаго, Варшаве и Дубае.
              </p>
            </div>
            <div className="mt-10 border-t border-[var(--color-hairline)] pt-8">
              <LogoStrip caption="Бренды с прямыми контрактами" />
            </div>
          </Card>
          <div className="mt-12 text-center">
            <ButtonLink href="#form" size="lg" className="w-full sm:w-auto">
              {CTA}
            </ButtonLink>
          </div>
        </Section>

        {/* ─── Форма ─── */}
        <Section id="form" className="scroll-mt-16 lg:py-20">
          <SectionHeader title="Получите гайд бесплатно" subtitle={title} />
          <div className="mx-auto mt-10 max-w-[760px]">
            <GuideForm
              countryCode={country?.code}
              countryName={country?.name ?? ""}
              pdfUrl={guidePdf(country?.code)}
              guideTitle={`Гайд «${title}»`}
            />
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
