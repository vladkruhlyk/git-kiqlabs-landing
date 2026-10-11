import type { Metadata } from "next";
import { QuizFlow } from "@/components/b2b/quiz/quiz-flow";
import { parseCountry } from "@/lib/b2b/countries";

export const metadata: Metadata = {
  title: "Расчёт закупочной цены на витамины из США и ЕС — KIQ Labs Global B2B",
  description:
    "4 вопроса — и персональный расчёт закупки витаминов и спортпита из США и ЕС для вашего бизнеса. Только для юридических лиц, минимальный заказ от $5 000.",
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

// ?country=kz|uz|… читается на сервере: страна сразу в HTML, без мигания текста.
export default async function B2BQuizPage({ searchParams }: Props) {
  const raw = (await searchParams).country;
  const country = parseCountry(Array.isArray(raw) ? raw[0] : raw);
  return <QuizFlow presetCountry={country?.code} />;
}
