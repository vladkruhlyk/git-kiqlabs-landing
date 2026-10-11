import type { Metadata } from "next";
import { GuideLanding } from "@/components/b2b/guide/guide-landing";
import { parseCountry } from "@/lib/b2b/countries";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

async function countryFrom(searchParams: Props["searchParams"]) {
  const raw = (await searchParams).country;
  return parseCountry(Array.isArray(raw) ? raw[0] : raw);
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const country = await countryFrom(searchParams);
  const where = country?.acc ?? "Центральную Азию";
  return {
    title: `Как завезти витамины из США в ${where} — гайд KIQ Labs Global`,
    description:
      "Бесплатный гайд для бизнеса: документы для ввоза, сроки и реальная себестоимость одного SKU от завода до полки. Для аптечных сетей, дистрибьюторов и селлеров маркетплейсов.",
  };
}

// ?country=kz|uz|… читается на сервере: страна сразу в H1 и обложке, без мигания.
export default async function B2BGuidePage({ searchParams }: Props) {
  return <GuideLanding country={await countryFrom(searchParams)} />;
}
