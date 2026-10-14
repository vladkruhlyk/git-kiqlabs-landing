/**
 * Слоты звонка для квиза со звонком (/b2b/call): рабочие дни (пн–пт) на три
 * недели вперёд, по 30 минут с 10:00 до 18:00 по времени страны клиента. Сегодня — только слоты,
 * до которых осталось не меньше 2 часов. Без библиотек — через Intl.
 */

const DAY_START = 10 * 60;
const DAY_END = 18 * 60;
const STEP = 30;
const LEAD_MINUTES = 120;

export type Slot = {
  /** Локальные дата и время в часовом поясе клиента: 2026-10-14T11:30. */
  key: string;
  time: string;
  /** Тот же момент в UTC — менеджеру удобно сверить со своим временем. */
  utc: string;
};

export type SlotDay = {
  key: string;
  weekday: string;
  label: string;
  slots: Slot[];
};

const pad = (n: number) => String(n).padStart(2, "0");
const hhmm = (minutes: number) => `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;

function partsIn(date: Date, tz: string) {
  const f = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  });
  const p = Object.fromEntries(f.formatToParts(date).map((x) => [x.type, x.value]));
  return { y: +p.year, m: +p.month, d: +p.day, h: +p.hour, min: +p.minute };
}

/** Смещение пояса от UTC в минутах в момент `at`. */
export function offsetMinutes(tz: string, at: Date): number {
  const t = new Date(Math.floor(at.getTime() / 60000) * 60000);
  const p = partsIn(t, tz);
  return Math.round((Date.UTC(p.y, p.m - 1, p.d, p.h, p.min) - t.getTime()) / 60000);
}

/** «UTC+5», «UTC+5:30», «UTC−3». */
export function utcLabel(tz: string, at = new Date()): string {
  const off = offsetMinutes(tz, at);
  const sign = off >= 0 ? "+" : "−";
  const abs = Math.abs(off);
  return `UTC${sign}${Math.floor(abs / 60)}${abs % 60 ? `:${pad(abs % 60)}` : ""}`;
}

const dayFmt = new Intl.DateTimeFormat("ru-RU", { timeZone: "UTC", day: "numeric", month: "short" });
const weekdayFmt = new Intl.DateTimeFormat("ru-RU", { timeZone: "UTC", weekday: "short" });

export function buildSlotDays(tz: string, now = new Date(), count = 15): SlotDay[] {
  const today = partsIn(now, tz);
  const nowMinutes = today.h * 60 + today.min;
  const days: SlotDay[] = [];

  for (let i = 0; days.length < count && i < count * 2 + 7; i++) {
    // Календарная дата в поясе клиента, записанная как полночь UTC.
    const date = new Date(Date.UTC(today.y, today.m - 1, today.d + i));
    const wd = date.getUTCDay();
    if (wd === 0 || wd === 6) continue;

    const y = date.getUTCFullYear();
    const m = date.getUTCMonth() + 1;
    const d = date.getUTCDate();
    const dayKey = `${y}-${pad(m)}-${pad(d)}`;

    const slots: Slot[] = [];
    for (let t = DAY_START; t < DAY_END; t += STEP) {
      if (i === 0 && t < nowMinutes + LEAD_MINUTES) continue;
      const localAsUtc = Date.UTC(y, m - 1, d, Math.floor(t / 60), t % 60);
      const instant = new Date(localAsUtc - offsetMinutes(tz, new Date(localAsUtc)) * 60000);
      slots.push({
        key: `${dayKey}T${hhmm(t)}`,
        time: hhmm(t),
        utc: `${pad(instant.getUTCHours())}:${pad(instant.getUTCMinutes())} UTC`,
      });
    }
    // Сегодня с 1–2 последними слотами день не показываем: одинокая кнопка выглядит как сбой.
    if (slots.length < (i === 0 ? 3 : 1)) continue;

    days.push({
      key: dayKey,
      weekday: weekdayFmt.format(date),
      label: dayFmt.format(date),
      slots,
    });
  }
  return days;
}
