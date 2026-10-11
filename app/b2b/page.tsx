import type { Metadata } from "next";
import { B2BLanding } from "@/components/b2b/landing/b2b-landing";

export const metadata: Metadata = {
  title: "Оптовые поставки витаминов из США и ЕС — KIQ Labs Global B2B",
  description:
    "Опт витаминов, БАДов и спортпита из США и ЕС для юридических лиц: прямые контракты с фабриками, минимальный заказ от $5 000, отгрузка 14–28 дней в 9 стран.",
};

export default function B2BPage() {
  return <B2BLanding />;
}
