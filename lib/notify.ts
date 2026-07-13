/**
 * Универсальные уведомления о событии-конверсии — НАПРЯМУЮ, без промежуточных
 * сервисов (Make/Zapier/n8n).
 *
 * notify(eventTitle, fields, opts?) рассылает одно событие сразу в несколько
 * адресатов независимо (Promise.allSettled):
 *   - Telegram   (TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID) — официальный Bot API;
 *   - Google Sheets через Apps Script Web App (GOOGLE_SHEETS_WEBHOOK_URL);
 *   - любой доп. вебхук (GENERIC_WEBHOOK_URL).
 * Каждый адресат включается только если задана его переменная окружения.
 *
 * Свойства: fire-and-forget, НИКОГДА не бросает исключение, таймаут ~5с на
 * запрос (AbortController). Недоступность адресата не влияет на остальных и
 * не ломает вызывающий код. Пустые поля пропускаются.
 *
 * fields — произвольный набор «человекочитаемая подпись → значение». Коды в
 * человеческие подписи переводит ВЫЗЫВАЮЩИЙ код (модуль ничего не знает о домене).
 */

export type FieldValue = string | number | null | undefined;
export type NotifyFields = Record<string, FieldValue>;

export type NotifyOptions = {
  /** Ключ идемпотентности: одно событие = одно сообщение при повторных вызовах. */
  eventId?: string;
  /** Часовой пояс метки времени. По умолчанию NOTIFY_TIMEZONE или Europe/Kyiv. */
  timezone?: string;
  /** Явный порядок колонок для массива row (Apps Script → appendRow(data.row)). */
  columns?: string[];
};

const TIMEOUT_MS = 5000;

/* ─────────── Дедуп (in-memory, в пределах «тёплого» инстанса) ─────────── */
const seen = new Map<string, number>();
const DEDUP_TTL_MS = 10 * 60 * 1000;

function isDuplicate(eventId?: string): boolean {
  if (!eventId) return false;
  const now = Date.now();
  for (const [k, t] of seen) if (now - t > DEDUP_TTL_MS) seen.delete(k);
  if (seen.has(eventId)) return true;
  seen.set(eventId, now);
  return false;
}

/* ─────────── Форматирование ─────────── */
function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Оставляет только непустые поля в порядке их объявления. */
function cleanFields(fields: NotifyFields): [string, string][] {
  const out: [string, string][] = [];
  for (const [label, value] of Object.entries(fields)) {
    if (value === null || value === undefined) continue;
    const v = String(value).trim();
    if (v === "" || v === "-") continue;
    out.push([label, v]);
  }
  return out;
}

function formatTime(tz: string): string {
  try {
    const stamp = new Intl.DateTimeFormat("ru-RU", {
      timeZone: tz,
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date());
    return `${stamp} (${tz})`;
  } catch {
    return new Date().toISOString();
  }
}

/** Текст сообщения Telegram (parse_mode: HTML). */
export function buildTelegramText(
  eventTitle: string,
  fields: NotifyFields,
  tz: string,
): string {
  const lines: string[] = [`<b>${escapeHtml(eventTitle)}</b>`, ""];
  for (const [label, value] of cleanFields(fields)) {
    lines.push(`<b>${escapeHtml(label)}:</b> ${escapeHtml(value)}`);
  }
  lines.push("", `<i>${escapeHtml(formatTime(tz))}</i>`);
  return lines.join("\n");
}

/**
 * JSON для Sheets/webhook: именованные поля + массив row в порядке колонок.
 * Для таблицы важна СТАБИЛЬНАЯ ширина строки — пустые поля не выкидываем,
 * оставляем "", чтобы колонки не съезжали между заявками. Порядок берётся из
 * opts.columns, иначе из порядка ключей fields.
 */
export function buildPayload(
  eventTitle: string,
  fields: NotifyFields,
  tz: string,
  columns?: string[],
) {
  const val = (v: FieldValue) =>
    v === null || v === undefined ? "" : String(v).trim();
  const order = columns ?? Object.keys(fields);
  const named: Record<string, string> = {};
  for (const label of order) named[label] = val(fields[label]);
  const time = formatTime(tz);
  const row = [time, eventTitle, ...order.map((label) => named[label] ?? "")];
  return { event: eventTitle, time, fields: named, row };
}

/* ─────────── Транспорт ─────────── */
async function postJson(url: string, body: unknown): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

async function sendTelegram(
  eventTitle: string,
  fields: NotifyFields,
  tz: string,
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return; // no-op, если не настроено

  const text = buildTelegramText(eventTitle, fields, tz);
  const res = await postJson(`https://api.telegram.org/bot${token}/sendMessage`, {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
  if (!res.ok) {
    const b = await res.text().catch(() => "");
    console.error("[notify] telegram", res.status, b.slice(0, 300));
  } else {
    console.log("[notify] telegram ok");
  }
}

async function sendSheets(
  eventTitle: string,
  fields: NotifyFields,
  tz: string,
  columns?: string[],
): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return;
  const res = await postJson(url, buildPayload(eventTitle, fields, tz, columns));
  if (!res.ok) console.error("[notify] sheets", res.status);
  else console.log("[notify] sheets ok");
}

async function sendGeneric(
  eventTitle: string,
  fields: NotifyFields,
  tz: string,
  columns?: string[],
): Promise<void> {
  const url = process.env.GENERIC_WEBHOOK_URL;
  if (!url) return;
  const res = await postJson(url, buildPayload(eventTitle, fields, tz, columns));
  if (!res.ok) console.error("[notify] webhook", res.status);
  else console.log("[notify] webhook ok");
}

/**
 * Разослать событие. Fire-and-forget: не бросает исключений и не ждёт «идеала».
 * Вызывать на СЕРВЕРЕ в момент, когда событие реально состоялось.
 */
export async function notify(
  eventTitle: string,
  fields: NotifyFields,
  opts: NotifyOptions = {},
): Promise<void> {
  try {
    if (isDuplicate(opts.eventId)) {
      console.log("[notify] дубль пропущен:", opts.eventId);
      return;
    }
    const tz =
      opts.timezone ?? process.env.NOTIFY_TIMEZONE ?? "Europe/Kyiv";

    const results = await Promise.allSettled([
      sendTelegram(eventTitle, fields, tz),
      sendSheets(eventTitle, fields, tz, opts.columns),
      sendGeneric(eventTitle, fields, tz, opts.columns),
    ]);
    results.forEach((r) => {
      if (r.status === "rejected") {
        console.error("[notify] адресат упал:", r.reason);
      }
    });
  } catch (err) {
    // notify НИКОГДА не бросает
    console.error("[notify] непредвиденная ошибка", err);
  }
}
