import { Building2, MapPin, Warehouse } from "lucide-react";
import { Card } from "@/components/b2b/ui/card";
import { BlobbedVisual } from "@/components/b2b/ui/blob";

/**
 * Фото склада, когда появится: положите файл в public/media/warehouse.webp и
 * впишите путь сюда — карточка покажет фото вместо схемы.
 */
const WAREHOUSE_PHOTO: string | null = null;

const POINTS = [
  { icon: Building2, place: "Чикаго, США", role: "Офис" },
  { icon: Building2, place: "Варшава, Польша", role: "Офис" },
  { icon: Building2, place: "Дубай, ОАЭ", role: "Офис" },
  { icon: Warehouse, place: "США и ЕС", role: "Склады" },
];

export function OfficesCard() {
  return (
    <BlobbedVisual className="mx-auto w-full max-w-[520px]">
      <Card variant="product">
        {WAREHOUSE_PHOTO ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={WAREHOUSE_PHOTO}
            alt="Склад KIQ Labs Global"
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
        ) : (
          <>
            <div className="border-b border-[var(--color-hairline)] px-5 py-4">
              <div className="text-[12px] font-medium leading-[1.5] text-[var(--color-slate-gray)]">
                Логистика KIQ Labs
              </div>
              <div className="text-[16px] font-semibold leading-[1.4]">Офисы и склады</div>
            </div>
            <ul className="divide-y divide-[var(--color-hairline)]">
              {POINTS.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.place} className="flex items-center gap-3 px-5 py-3.5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-[8px] bg-[var(--color-pebble)] text-[var(--color-signal-blue)]">
                      <Icon aria-hidden className="size-[18px]" strokeWidth={1.75} />
                    </span>
                    <div className="flex-1">
                      <div className="text-[14px] font-semibold leading-[1.4]">{p.place}</div>
                      <div className="text-[12px] leading-[1.5] text-[var(--color-slate-gray)]">{p.role}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-2 border-t border-[var(--color-hairline)] bg-[var(--color-pebble)] px-5 py-3.5 text-[14px] font-medium leading-[1.4]">
              <MapPin aria-hidden className="size-4 shrink-0 text-[var(--color-signal-blue)]" strokeWidth={2} />
              Склад → ваш склад: 14–28 дней
            </div>
          </>
        )}
      </Card>
    </BlobbedVisual>
  );
}
