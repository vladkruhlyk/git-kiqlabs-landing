import type { Metadata } from "next";
import { QuizFlow } from "@/components/b2b/quiz/quiz-flow";
import { parseCountry } from "@/lib/b2b/countries";

export const metadata: Metadata = {
  title: "Расчёт закупки и звонок с менеджером — KIQ Labs Global B2B",
  description:
    "4 вопроса о вашем бизнесе и удобное время звонка — менеджер подготовит расчёт закупки витаминов и спортпита из США и ЕС. Только для юридических лиц, минимальный заказ от $5 000.",
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

// Тот же квиз, что /b2b/quiz, но в финале клиент сам бронирует время звонка.
// ?country=kz|uz|… читается на сервере, как и в /b2b/quiz.
export default async function B2BCallPage({ searchParams }: Props) {
  const raw = (await searchParams).country;
  const country = parseCountry(Array.isArray(raw) ? raw[0] : raw);
  return <QuizFlow presetCountry={country?.code} booking />;
}
