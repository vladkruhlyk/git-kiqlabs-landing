import { FileCheck2 } from "lucide-react";
import { Badge, Card } from "@/components/b2b/ui/card";
import { BlobbedVisual } from "@/components/b2b/ui/blob";
import { cn } from "@/lib/utils";

const DOCS = [
  { title: "Сертификат анализа (CoA)", meta: "NOW Foods · партия 24117 · PDF" },
  { title: "Регистрационное досье", meta: "6 документов · PDF" },
  { title: "Декларация о соответствии ЕАЭС", meta: "ТР ТС · PDF", blur: true },
  { title: "Таможенное сопровождение", meta: "Инвойс, упаковочный лист", blur: true },
];

/** Визуал досье: часть документов размыта — полный пакет готовится под страну. */
export function DossierMockup() {
  return (
    <BlobbedVisual className="mx-auto w-full max-w-[520px]">
      <Card variant="product">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--color-hairline)] px-5 py-4">
          <div className="min-w-0">
            <div className="text-[12px] font-medium leading-[1.5] text-[var(--color-slate-gray)]">
              Досье поставки
            </div>
            <div className="truncate text-[16px] font-semibold leading-[1.4]">Казахстан · ЕАЭС</div>
          </div>
          <Badge>4 из 4 готово</Badge>
        </div>
        <ul className="divide-y divide-[var(--color-hairline)]">
          {DOCS.map((d) => (
            <li
              key={d.title}
              aria-hidden={d.blur || undefined}
              className={cn("flex items-center gap-3 px-5 py-3.5", d.blur && "select-none blur-[3px]")}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-[8px] bg-[var(--color-pebble)] text-[var(--color-signal-blue)]">
                <FileCheck2 aria-hidden className="size-[18px]" strokeWidth={1.75} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[14px] font-semibold leading-[1.4]">{d.title}</div>
                <div className="truncate text-[12px] leading-[1.5] text-[var(--color-slate-gray)]">
                  {d.meta}
                </div>
              </div>
              <Badge>Готово</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </BlobbedVisual>
  );
}
