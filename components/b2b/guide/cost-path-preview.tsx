import { Badge, Card } from "@/components/b2b/ui/card";
import { BlobbedVisual } from "@/components/b2b/ui/blob";
import { cn } from "@/lib/utils";

const COLS = "grid grid-cols-[minmax(0,1.5fr)_minmax(0,0.8fr)_minmax(0,0.8fr)] gap-x-3";

const ROWS = [
  { stage: "Завод в США", step: "Закупка", price: "$4.20" },
  { stage: "Трейдер в ЕС", step: "+25%", price: "$5.25" },
  { stage: "Трейдер в регионе", step: "+30%", price: "$6.80" },
  { stage: "Полка аптеки", step: "+45%", price: "$9.90" },
];

/** Превью страницы гайда: путь одной банки, нижняя половина под blur. */
export function CostPathPreview() {
  return (
    <BlobbedVisual className="mx-auto w-full max-w-[520px]">
      <Card variant="product">
        <div className="border-b border-[var(--color-hairline)] px-5 py-4">
          <div className="text-[12px] font-medium leading-[1.5] text-[var(--color-slate-gray)]">
            Пример: витамин D3, 240 капсул
          </div>
          <div className="text-[16px] font-semibold leading-[1.4]">Путь одной банки</div>
          <div className="mt-1 text-[14px] leading-[1.4] text-[var(--color-slate-gray)]">
            Завод → трейдер → трейдер → полка
          </div>
        </div>
        <div
          className={cn(
            COLS,
            "bg-[var(--color-pebble)] px-5 py-2.5 text-[12px] font-medium leading-[1.5] text-[var(--color-slate-gray)]",
          )}
        >
          <span>Этап</span>
          <span>Наценка</span>
          <span className="text-right">Цена за банку</span>
        </div>
        <ul className="divide-y divide-[var(--color-hairline)]">
          {ROWS.slice(0, 2).map((r) => (
            <Row key={r.stage} {...r} />
          ))}
        </ul>
        <div className="relative">
          <ul aria-hidden className="select-none divide-y divide-[var(--color-hairline)] border-t border-[var(--color-hairline)] blur-[4px]">
            {ROWS.slice(2).map((r) => (
              <Row key={r.stage} {...r} />
            ))}
          </ul>
          <div className="absolute inset-0 grid place-items-center">
            <Badge size="md" className="b2b-shadow-card">Полный разбор — в гайде</Badge>
          </div>
        </div>
      </Card>
    </BlobbedVisual>
  );
}

function Row({ stage, step, price }: { stage: string; step: string; price: string }) {
  return (
    <li className={cn(COLS, "items-center px-5 py-3.5 text-[14px] leading-[1.4]")}>
      <span className="font-semibold">{stage}</span>
      <span className="text-[var(--color-slate-gray)]">{step}</span>
      <span className="text-right font-semibold">{price}</span>
    </li>
  );
}
