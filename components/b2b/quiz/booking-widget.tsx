"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Globe, User } from "lucide-react";
import { Card } from "@/components/b2b/ui/card";
import { cn } from "@/lib/utils";
import { buildSlotDays, utcLabel, type Slot, type SlotDay } from "@/lib/b2b/slots";

export type PickedSlot = { day: SlotDay; slot: Slot };

const WEEKDAYS = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
const monthFmt = new Intl.DateTimeFormat("ru-RU", { timeZone: "UTC", month: "long" });
const fullDateFmt = new Intl.DateTimeFormat("ru-RU", {
  timeZone: "UTC",
  weekday: "long",
  day: "numeric",
  month: "long",
});

const pad = (n: number) => String(n).padStart(2, "0");
const monthKey = (dayKey: string) => dayKey.slice(0, 7);

/**
 * Booking Widget по DESIGN.md: менеджер, календарь месяца (доступные дни —
 * Signal Blue, выбранный — заливка), слоты-пилюли. Время — в поясе страны клиента.
 */
export function BookingWidget({
  tz,
  regionLabel,
  value,
  onChange,
  invalid,
}: {
  tz: string;
  /** Страна клиента; без неё — «По вашему региону». */
  regionLabel?: string;
  value: PickedSlot | null;
  onChange: (v: PickedSlot | null) => void;
  invalid?: boolean;
}) {
  const days = useMemo(() => buildSlotDays(tz), [tz]);
  const byKey = useMemo(() => new Map(days.map((d) => [d.key, d])), [days]);
  // Месяцы, в которые попадают доступные дни (обычно один-два).
  const months = useMemo(() => [...new Set(days.map((d) => monthKey(d.key)))], [days]);

  const [dayKey, setDayKey] = useState(value?.day.key ?? days[0]?.key);
  const day = byKey.get(dayKey ?? "") ?? days[0];
  const [month, setMonth] = useState(monthKey(day?.key ?? "") || months[0]);
  const mi = Math.max(0, months.indexOf(month));
  const offset = useMemo(() => utcLabel(tz), [tz]);

  const pickDay = (key: string) => {
    setDayKey(key);
    // Время выбирается внутри дня: при смене дня прежний выбор сбрасываем.
    if (value && value.day.key !== key) onChange(null);
  };

  // Сетка месяца с понедельника: пустые клетки до 1-го числа, затем дни.
  const [y, m] = (months[mi] ?? "").split("-").map(Number);
  const cells = useMemo(() => {
    if (!y || !m) return [];
    const lead = (new Date(Date.UTC(y, m - 1, 1)).getUTCDay() + 6) % 7;
    const total = new Date(Date.UTC(y, m, 0)).getUTCDate();
    return [
      ...Array.from({ length: lead }, () => null),
      ...Array.from({ length: total }, (_, i) => i + 1),
    ];
  }, [y, m]);
  const monthName = y ? monthFmt.format(new Date(Date.UTC(y, m - 1, 1))) : "";

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
        <div className="text-[18px] font-semibold leading-[1.4]">
          {regionLabel ? `Регион: ${regionLabel}` : "По вашему региону"}
        </div>
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
        {/* Календарь */}
        <div className="text-[14px] font-medium leading-[1.4]">Выберите день</div>
        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            aria-label="Предыдущий месяц"
            disabled={mi === 0}
            onClick={() => setMonth(months[mi - 1])}
            className="grid size-9 place-items-center rounded-full text-[var(--color-signal-blue)] transition-colors hover:bg-[var(--color-badge-fill)] disabled:pointer-events-none disabled:text-[var(--color-mist-gray)]"
          >
            <ChevronLeft aria-hidden className="size-5" strokeWidth={2} />
          </button>
          <div className="text-[16px] font-semibold capitalize leading-[1.4]">
            {monthName} {y}
          </div>
          <button
            type="button"
            aria-label="Следующий месяц"
            disabled={mi >= months.length - 1}
            onClick={() => setMonth(months[mi + 1])}
            className="grid size-9 place-items-center rounded-full text-[var(--color-signal-blue)] transition-colors hover:bg-[var(--color-badge-fill)] disabled:pointer-events-none disabled:text-[var(--color-mist-gray)]"
          >
            <ChevronRight aria-hidden className="size-5" strokeWidth={2} />
          </button>
        </div>

        <div className="mt-2 grid grid-cols-7 text-center text-[12px] font-medium uppercase leading-[1.5] text-[var(--color-slate-gray)]">
          {WEEKDAYS.map((w) => (
            <div key={w} className="py-1">
              {w}
            </div>
          ))}
        </div>
        <div role="group" aria-label="День" className="grid grid-cols-7 gap-y-1">
          {cells.map((d, i) => {
            if (d === null) return <div key={`e${i}`} />;
            const key = `${y}-${pad(m)}-${pad(d)}`;
            const slotDay = byKey.get(key);
            const active = key === day?.key;
            return (
              <div key={key} className="grid place-items-center">
                {slotDay ? (
                  <button
                    type="button"
                    aria-pressed={active}
                    aria-label={fullDateFmt.format(new Date(Date.UTC(y, m - 1, d)))}
                    onClick={() => pickDay(key)}
                    className={cn(
                      "grid size-10 place-items-center rounded-full text-[15px] font-semibold transition-colors sm:size-11",
                      active
                        ? "bg-[var(--color-signal-blue)] text-[var(--color-paper)]"
                        : "bg-[var(--color-badge-fill)] text-[var(--color-signal-blue)] hover:bg-[#d3e4ff]",
                    )}
                  >
                    {d}
                  </button>
                ) : (
                  <span className="grid size-10 place-items-center text-[15px] text-[var(--color-mist-gray)] sm:size-11">
                    {d}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Слоты выбранного дня */}
        {day && (
          <>
            <div className="mt-5 text-[14px] font-medium leading-[1.4]">
              Время · {day.weekday}, {day.label}
            </div>
            <div role="group" aria-label="Время" className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {day.slots.map((s) => {
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
          </>
        )}
      </div>
    </Card>
  );
}
