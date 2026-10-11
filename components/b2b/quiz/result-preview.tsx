import { Calculator } from "lucide-react";
import { Badge, Card } from "@/components/b2b/ui/card";
import { BlobbedVisual } from "@/components/b2b/ui/blob";
import { FACTS } from "@/lib/b2b/constants";

const ROWS = [
  { label: "Закупочная цена", value: "$18 420" },
  { label: "Логистика до склада", value: "$1 260" },
  { label: "Ваша маржа на полке", value: "41%" },
];

/**
 * Превью итогового расчёта на стартовом экране квиза (цифры размыты).
 * Без страны — общий вариант; страна подставляется только из ?country=.
 */
export function ResultPreview({ countryName }: { countryName?: string }) {
  return (
    <BlobbedVisual className="mx-auto w-full max-w-[480px]">
      <Card variant="product">
        <div className="flex items-center gap-3 border-b border-[var(--color-hairline)] px-5 py-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-[8px] bg-[var(--color-pebble)] text-[var(--color-signal-blue)]">
            <Calculator aria-hidden className="size-5" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <div className="text-[12px] font-medium leading-[1.5] text-[var(--color-slate-gray)]">
              Ваш расчёт
            </div>
            <div className="truncate text-[16px] font-semibold leading-[1.4]">
              Закупка · {countryName ?? "Опт · USD"}
            </div>
          </div>
        </div>
        <dl className="divide-y divide-[var(--color-hairline)] text-[14px] leading-[1.4]">
          <div className="flex items-center justify-between gap-3 px-5 py-3.5">
            <dt className="text-[var(--color-slate-gray)]">Категории</dt>
            <dd className="text-right font-semibold">Спортпит, витамины</dd>
          </div>
          <div className="flex items-center justify-between gap-3 px-5 py-3.5">
            <dt className="text-[var(--color-slate-gray)]">{countryName ? "Страна" : "Поставка"}</dt>
            <dd className="font-semibold">{countryName ?? FACTS.shipping}</dd>
          </div>
          <div className="flex items-center justify-between gap-3 bg-[var(--color-badge-fill)]/40 px-5 py-3.5">
            <dt className="text-[var(--color-slate-gray)]">Экономия к рынку</dt>
            <dd>
              <Badge>до −35%</Badge>
            </dd>
          </div>
          {ROWS.map((r) => (
            <div key={r.label} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <dt className="text-[var(--color-slate-gray)]">{r.label}</dt>
              <dd className="font-semibold">
                <span aria-hidden className="select-none blur-[5px]">
                  {r.value}
                </span>
                <span className="sr-only">в расчёте</span>
              </dd>
            </div>
          ))}
        </dl>
      </Card>
    </BlobbedVisual>
  );
}
