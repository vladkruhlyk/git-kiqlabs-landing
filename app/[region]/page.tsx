import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RegionLanding } from "@/components/region/region-landing";
import { getRegion, regionSlugs } from "@/lib/regions";

// Валидны только заранее заданные страны; остальное — 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return regionSlugs.map((region) => ({ region }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const r = getRegion(region);
  if (!r) return {};
  return {
    title: r.content.metaTitle,
    description: r.content.metaDescription,
    alternates: { canonical: `/${r.slug}` },
    openGraph: {
      title: r.content.metaTitle,
      description: r.content.metaDescription,
      type: "website",
    },
  };
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;
  const r = getRegion(region);
  if (!r) notFound();
  return <RegionLanding region={r} />;
}
