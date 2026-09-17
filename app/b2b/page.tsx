import type { Metadata } from "next";
import { B2BLanding } from "@/components/b2b/b2b-landing";

export const metadata: Metadata = {
  title: "Оптовые поставки витаминов и спортпита из США и ЕС — B2B | KIQ Labs",
  description:
    "B2B-дистрибуция витаминов, БАДов и спортпита напрямую с заводов США и Европы. Только опт от $5 000: дистрибьюторы, аптечные сети, маркетплейсы, private label. Розницу не обслуживаем.",
  alternates: { canonical: "/b2b" },
  openGraph: {
    title: "KIQ Labs — оптовая B2B-дистрибуция из США и ЕС",
    description:
      "Витамины и спортпит оптом напрямую с заводов США и Европы. Только опт от $5 000, розницу не обслуживаем.",
    type: "website",
  },
};

export default function B2BPage() {
  return <B2BLanding />;
}
