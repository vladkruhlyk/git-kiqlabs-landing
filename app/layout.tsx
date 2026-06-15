import type { Metadata } from "next";
import { Unbounded, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/ui/lenis-provider";
import { LangProvider } from "@/components/ui/lang-provider";
import { FacebookPixel } from "@/components/analytics/fb-pixel";

const unbounded = Unbounded({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  variable: "--font-display",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KIQ Labs Global — B2B-дистрибуция витаминов и спортпита из США и ЕС",
  description:
    "Международный B2B-дистрибьютор витаминов, БАДов и спортивного питания из США и Европы. Поставки в Европу, MENA и СНГ. Только опт.",
  metadataBase: new URL("https://kiqlabs.global"),
  openGraph: {
    title: "KIQ Labs Global",
    description:
      "B2B-дистрибуция витаминов и спортпита из США и ЕС. Только опт.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`${unbounded.variable} ${geist.variable} ${jetbrains.variable}`}
    >
      <body className="antialiased">
        <FacebookPixel />
        <LangProvider>
          <LenisProvider>{children}</LenisProvider>
        </LangProvider>
      </body>
    </html>
  );
}
