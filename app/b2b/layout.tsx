import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./b2b.css";
import { AttributionCapture } from "@/components/b2b/attribution-capture";

// Gilroy в проекте нет — замена из DESIGN.md. Шрифт грузится только на /b2b/*.
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

// Ветка /b2b — страницы под рекламу: не индексируются и не связаны с навигацией сайта.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function B2BLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${manrope.variable} b2b`}>
      <AttributionCapture />
      {children}
    </div>
  );
}
