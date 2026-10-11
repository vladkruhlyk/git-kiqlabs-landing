"use client";

import { useMemo, useState } from "react";
import { Clock, Globe, User } from "lucide-react";
import { Card } from "@/components/b2b/ui/card";
import { cn } from "@/lib/utils";
import { buildSlotDays, utcLabel, type Slot, type SlotDay } from "@/lib/b2b/slots";

export type PickedSlot = { day: SlotDay; slot: Slot };

/**
 * Booking Widget по DESIGN.md: менеджер, дни (выбранный — Signal Blue),
 * слоты-пилюли (активный — Signal Blue). Время — в поясе страны клиента.
 */
export function BookingWidget({
  tz,
  regionLabel,
  value,
  onChange,
  invalid,
}: {
  tz: string;
  /** «Казахстан» или «ваш регион». */
  regionLabel: string;
  value: PickedSlot | null;
  onChange: (v: PickedSlot) => void;
  invalid?: boolean;
}) {
  const days = useMemo(() => buildSlotDays(tz), [tz]);
  const [dayKey, setDayKey] = useState(value?.day.key ?? days[0]?.key);
  const day = days.find((d) => d.key === dayKey) ?? days[0];
  const offset = useMemo(() => utcLabel(tz), [tz]);

  return (
    <Card
      variant="product"
      className={cn(
        "grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)]",
        invalid && "ring-1 ring-[var(--color-error)]",
      )}
    >
      {/* Менеджер */}
      <div className="border-b border-[var(--color-hairline)] p-5 lg:border-b-0 lg:border-r">
        <span className="grid size-12 place-items-center rounded-full bg-[var(--color-pebble)] text-[var(--color-ink-navy)]">
          <User aria-hidden className="size-6" strokeWidth={1.75} />
        </span>
        <div className="mt-3 text-[14px] font-medium leading-[1.4] text-[var(--color-slate-gray)]">
          Менеджер KIQ Labs
        </div>
        <div className="text-[18px] font-semibold leading-[1.4]">Регион: {regionLabel}</div>
        <ul className="mt-3 space-y-1.5 text-[14px] leading-[1.4] text-[var(--color-slate-gray)]">
          <li className="flex items-center gap-2">
            <Clock aria-hidden className="size-4 shrink-0" strokeWidth={2} />
            15 минут
          </li>
          <li className="flex items-center gap-2">
            <Globe aria-hidden className="size-4 shrink-0" strokeWidth={2} />
            Время: {offset}
          </li>
        </ul>
      </div>

      <div className="p-5">
        {/* Дни */}
        <div className="text-[14px] font-medium leading-[1.4]">Выберите день</div>
        <div role="group" aria-label="День" className="mt-3 grid grid-cols-3 gap-2">
          {days.map((d) => {
            const active = d.key === day?.key;
            return (
              <button
                key={d.key}
                type="button"
                aria-pressed={active}
                onClick={() => setDayKey(d.key)}
                className={cn(
                  "rounded-[8px] px-2 py-2.5 text-center transition-colors",
                  active
                    ? "bg-[var(--color-signal-blue)] text-[var(--color-paper)]"
                    : "bg-[var(--color-pebble)] text-[var(--color-ink-navy)] hover:bg-[var(--color-badge-fill)]",
                )}
              >
                <div className="text-[12px] font-medium uppercase leading-[1.5] opacity-80">{d.weekday}</div>
                <div className="text-[16px] font-semibold leading-[1.4]">{d.label}</div>
              </button>
            );
          })}
        </div>

        {/* Слоты */}
        <div className="mt-5 text-[14px] font-medium leading-[1.4]">Время</div>
        <div role="group" aria-label="Время" className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {day?.slots.map((s) => {
            const active = value?.slot.key === s.key;
            return (
              <button
                key={s.key}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ day, slot: s })}
                className={cn(
                  "rounded-full border px-3 py-2 text-[14px] font-semibold leading-[1.4] transition-colors",
                  active
                    ? "border-[var(--color-signal-blue)] bg-[var(--color-signal-blue)] text-[var(--color-paper)]"
                    : "border-[var(--color-hairline)] text-[var(--color-signal-blue)] hover:border-[var(--color-signal-blue)]",
                )}
              >
                {s.time}
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
