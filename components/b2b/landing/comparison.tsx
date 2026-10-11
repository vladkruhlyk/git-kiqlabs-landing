import { Check, X } from "lucide-react";
import { Card } from "@/components/b2b/ui/card";

const ROWS = [
  { param: "Закупочная цена", trader: "Розница + наценка", kiq: "Прямой контракт, до −35%" },
  { param: "Минимальная партия", trader: "От контейнера", kiq: "От $5 000" },
  { param: "Срок", trader: "60–90 дней", kiq: "14–28 дней" },
  { param: "Документы", trader: "Делаете сами", kiq: "Готовое досье под рынок" },
];

/** Таблица «трейдер vs KIQ»: на десктопе таблица, на мобиле — стек карточек. */
export function Comparison() {
  return (
    <>
      {/* Десктоп / планшет */}
      <Card className="hidden overflow-hidden p-0 md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--color-hairline)] text-[14px] font-medium leading-[1.4] text-[var(--color-slate-gray)]">
              <th scope="col" className="w-[28%] px-6 py-4 font-medium">Параметр</th>
              <th scope="col" className="w-[34%] px-6 py-4 font-medium">Через трейдера</th>
              <th
                scope="col"
                className="bg-[var(--color-pebble)] px-6 py-4 font-semibold text-[var(--color-signal-blue)]"
              >
                С KIQ Labs
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-hairline)]">
            {ROWS.map((r) => (
              <tr key={r.param}>
                <th scope="row" className="px-6 py-5 text-[16px] font-semibold leading-[1.4]">
                  {r.param}
                </th>
                <td className="px-6 py-5">
                  <span className="flex items-center gap-2.5 text-[16px] leading-[1.4] text-[var(--color-slate-gray)]">
                    <X aria-hidden className="size-4 shrink-0 text-[var(--color-mist-gray)]" strokeWidth={2.5} />
                    {r.trader}
                  </span>
                </td>
                <td className="bg-[var(--color-pebble)] px-6 py-5">
                  <span className="flex items-center gap-2.5 text-[16px] font-semibold leading-[1.4]">
                    <Check aria-hidden className="size-4 shrink-0 text-[var(--color-signal-blue)]" strokeWidth={2.5} />
                    {r.kiq}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Мобила: без горизонтального скролла */}
      <ul className="space-y-4 md:hidden">
        {ROWS.map((r) => (
          <li key={r.param}>
            <Card className="p-5">
              <div className="text-[12px] font-semibold uppercase leading-[1.5] text-[var(--color-slate-gray)]">
                {r.param}
              </div>
              <div className="mt-3 flex items-start gap-2.5">
                <X aria-hidden className="mt-1 size-4 shrink-0 text-[var(--color-mist-gray)]" strokeWidth={2.5} />
                <div>
                  <div className="text-[12px] leading-[1.5] text-[var(--color-slate-gray)]">Через трейдера</div>
                  <div className="text-[16px] leading-[1.4] text-[var(--color-slate-gray)]">{r.trader}</div>
                </div>
              </div>
              <div className="mt-3 flex items-start gap-2.5 rounded-[8px] bg-[var(--color-pebble)] p-3">
                <Check aria-hidden className="mt-1 size-4 shrink-0 text-[var(--color-signal-blue)]" strokeWidth={2.5} />
                <div>
                  <div className="text-[12px] font-medium leading-[1.5] text-[var(--color-signal-blue)]">С KIQ Labs</div>
                  <div className="text-[16px] font-semibold leading-[1.4]">{r.kiq}</div>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
