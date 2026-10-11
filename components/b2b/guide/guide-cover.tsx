import { Badge, Card } from "@/components/b2b/ui/card";
import { BlobbedVisual } from "@/components/b2b/ui/blob";
import { Logo } from "@/components/b2b/ui/chrome";

/**
 * Обложка гайда, свёрстанная компонентом (картинки обложки нет):
 * белый лист с лёгким наклоном и пятнами позади.
 */
export function GuideCover({ where }: { where: string }) {
  return (
    <BlobbedVisual className="mx-auto w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[420px]">
      <div className="-rotate-3">
        <Card variant="product" className="flex aspect-[3/4] flex-col p-7 sm:p-9">
          <div className="flex items-center justify-between gap-3">
            <Logo className="h-8" />
            <Badge>KIQ Labs · Гайд</Badge>
          </div>
          <div className="mt-auto">
            <div className="text-[12px] font-semibold uppercase leading-[1.5] text-[var(--color-slate-gray)]">
              Гайд 2026 · 14 страниц
            </div>
            <div className="mt-3 text-[28px] font-bold leading-[1.21] text-balance">
              Как завезти витамины из США в {where}
            </div>
            <div className="mt-6 border-t border-[var(--color-hairline)] pt-4 text-[14px] font-medium leading-[1.4] text-[var(--color-slate-gray)]">
              Документы · Сроки · Себестоимость
            </div>
          </div>
        </Card>
      </div>
    </BlobbedVisual>
  );
}
