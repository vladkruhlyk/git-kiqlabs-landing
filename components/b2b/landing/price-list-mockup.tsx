import { FileText } from "lucide-react";
import { Badge, Card } from "@/components/b2b/ui/card";
import { BlobbedVisual } from "@/components/b2b/ui/blob";
import { cn } from "@/lib/utils";

const ROWS = [
  { brand: "NOW Foods", item: "Vitamin D3 5000 IU", sku: "NOW-0373", moq: "144", price: "$4.90" },
  { brand: "Solgar", item: "Magnesium Citrate", sku: "SOL-1716", moq: "96", price: "$7.40" },
  {
    brand: "Optimum Nutrition",
    item: "Gold Standard Whey",
    sku: "ON-1149",
    moq: "60",
    price: "$31.20",
    deal: "−32% к рынку",
  },
  { brand: "Life Extension", item: "Super Omega-3", sku: "LE-1982", moq: "120", price: "$9.80" },
  { brand: "Dymatize", item: "ISO100 Hydrolyzed", sku: "DYM-7052", moq: "48", price: "$28.60" },
];

const COLS = "grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,0.6fr)_minmax(0,0.9fr)] gap-x-3";

/** Ключевой визуал hero: прайс-лист как продуктовый интерфейс, цены размыты. */
export function PriceListMockup() {
  return (
    <BlobbedVisual className="mx-auto w-full max-w-[540px]">
      <Card variant="product">
        <div className="flex items-center gap-3 border-b border-[var(--color-hairline)] px-4 py-4 sm:px-5">
          <span className="grid size-10 shrink-0 place-items-center rounded-[8px] bg-[var(--color-pebble)] text-[var(--color-signal-blue)]">
            <FileText aria-hidden className="size-5" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <div className="text-[12px] font-medium leading-[1.5] text-[var(--color-slate-gray)]">
              KIQ Labs Global · B2B
            </div>
            <div className="truncate text-[16px] font-semibold leading-[1.4]">
              Прайс-лист · Казахстан · USD
            </div>
          </div>
        </div>

        <div
          className={cn(
            COLS,
            "bg-[var(--color-pebble)] px-4 py-2.5 text-[12px] font-medium leading-[1.5] text-[var(--color-slate-gray)] sm:px-5",
          )}
        >
          <span>Бренд</span>
          <span>SKU</span>
          <span>MOQ</span>
          <span className="text-right">Цена за ед.</span>
        </div>

        <ul className="divide-y divide-[var(--color-hairline)]">
          {ROWS.map((r) => (
            <li
              key={r.sku}
              className={cn(
                COLS,
                "items-center px-4 py-3 sm:px-5",
                r.deal && "bg-[var(--color-badge-fill)]/40",
              )}
            >
              <div className="min-w-0">
                <div className="text-[13px] font-semibold leading-[1.4] sm:text-[14px]">{r.brand}</div>
                {r.deal ? (
                  <Badge className="mt-1">{r.deal}</Badge>
                ) : (
                  <div className="truncate text-[12px] leading-[1.5] text-[var(--color-slate-gray)]">
                    {r.item}
                  </div>
                )}
              </div>
              <span className="truncate text-[12px] leading-[1.5] text-[var(--color-slate-gray)] sm:text-[13px]">
                {r.sku}
              </span>
              <span className="text-[13px] leading-[1.5] sm:text-[14px]">{r.moq}</span>
              <span className="text-right text-[13px] font-semibold sm:text-[14px]">
                <span aria-hidden className="select-none blur-[5px]">
                  {r.price}
                </span>
                <span className="sr-only">цена в прайсе по запросу</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-3 border-t border-[var(--color-hairline)] px-4 py-4 sm:px-5">
          <span className="text-[14px] font-semibold leading-[1.4]">Минимальный заказ: $5 000</span>
          <span className="text-[12px] leading-[1.5] text-[var(--color-slate-gray)]">MOQ — шт.</span>
        </div>
      </Card>
    </BlobbedVisual>
  );
}
