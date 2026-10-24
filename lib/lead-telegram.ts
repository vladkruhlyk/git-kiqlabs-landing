/**
 * Красивое сообщение о заявке для Telegram (parse_mode: HTML).
 *
 * Только «витрина» для менеджеров: в Google Sheets и вебхуки по-прежнему уходят
 * плоские поля из notifyNewLead, их формат не меняется.
 */
import { escapeHtml } from "@/lib/notify";
import { COUNTRY_LIST, OTHER_FLAG } from "@/lib/b2b/countries";
import { TAG_LOW_VOLUME } from "@/lib/b2b/constants";

const LINE = "━━━━━━━━━━━━━━━━";
/** Лимит Telegram — 4096 символов; длинный комментарий обрезаем заранее. */
const MAX_COMMENT = 1200;

const SOURCE_ICONS: Record<string, string> = {
  "b2b-landing": "🌐",
  "b2b-quiz": "🧩",
  "b2b-call": "📞",
  "b2b-guide": "📘",
  quiz: "🧩",
  contact: "✉️",
};

export type LeadTelegramInput = {
  source: string;
  sourceLabel: string;
  qualified: boolean;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  role: string;
  categories: string;
  volume: string;
  inquiry: string;
  message: string;
  bin: string;
  tags: string;
  slot: string;
  utm: Record<string, string>;
};

const h = escapeHtml;

function sourceIcon(source: string): string {
  if (SOURCE_ICONS[source]) return SOURCE_ICONS[source];
  return source.startsWith("region-") ? "📍" : "📝";
}

/** Флаг к стране B2B-форм; гео-лендинги присылают страну уже с флагом. */
function withFlag(country: string): string {
  if (country === "Другая") return `${OTHER_FLAG} Другая страна`;
  const c = COUNTRY_LIST.find((x) => x.name === country);
  return c ? `${c.flag} ${country}` : country;
}

/** Формы основного сайта принимают «телефон или Telegram» — ник узнаём по виду. */
const TG_NICK = /^@?([a-zA-Z][\w]{3,31})$/;

/** Ссылки «написать»: WhatsApp и Telegram по номеру, либо Telegram по @нику. */
function contactLinks(phone: string): string {
  const nick = phone.match(TG_NICK);
  if (nick) return `<a href="https://t.me/${nick[1]}">Telegram</a>`;
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) return "";
  return [
    `<a href="https://wa.me/${digits}">WhatsApp</a>`,
    `<a href="https://t.me/+${digits}">Telegram</a>`,
  ].join(" · ");
}

function stamp(tz: string): string {
  try {
    return new Intl.DateTimeFormat("ru-RU", {
      timeZone: tz,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());
  } catch {
    return new Date().toISOString().slice(0, 16).replace("T", " ");
  }
}

/** Строка поля: «эмодзи <b>Подпись:</b> значение»; пустые поля не выводятся. */
function row(icon: string, label: string, value: string, raw = false): string[] {
  if (!value) return [];
  return [`${icon} <b>${label}:</b> ${raw ? value : h(value)}`];
}

/** Группы строк разделяем пустой строкой, пустые группы пропускаем. */
function blocks(...groups: string[][]): string {
  return groups
    .filter((g) => g.length > 0)
    .map((g) => g.join("\n"))
    .join("\n\n");
}

export function buildLeadTelegramText(d: LeadTelegramInput, tz: string): string {
  const b2b = d.source.startsWith("b2b-");
  const low = d.tags.split(",").map((t) => t.trim()).includes(TAG_LOW_VOLUME);

  // Шапка: по эмодзи сразу видно, горячий ли лид.
  const head = b2b
    ? d.qualified
      ? ["🔥 <b>НОВАЯ B2B-ЗАЯВКА</b>", "✅ <b>Квалифицирован</b> · объём от $5 000"]
      : [
          "📩 <b>НОВАЯ B2B-ЗАЯВКА</b>",
          low ? "⚠️ <b>Объём до $5 000</b> · мелкий опт" : "⚪ Не квалифицирован",
        ]
    : ["📩 <b>НОВАЯ ЗАЯВКА С САЙТА</b>"];

  const phone = d.phone ? `<code>${h(d.phone)}</code>` : "";
  const links = d.phone ? contactLinks(d.phone) : "";

  const contacts = [
    ...row("🏢", "Компания", d.company),
    ...row("👤", "Имя", d.name),
    ...row("📞", TG_NICK.test(d.phone) ? "Telegram" : "Телефон", phone, true),
    ...row("✉️", "Email", d.email),
    ...(links ? [`💬 Написать: ${links}`] : []),
  ];

  const business = [
    ...row("🌍", "Страна", d.country ? withFlag(d.country) : ""),
    ...row("💼", "Тип бизнеса", d.role),
    ...row("📦", "Объём", d.volume),
    ...row("🛒", "Категории", d.categories),
    ...row("🧾", "БИН/ИНН", d.bin),
    ...row("📌", "Тип запроса", d.inquiry),
  ];

  // Слот: «пт, 16 окт. · 11:30 (время Казахстана, UTC+5) · 06:30 UTC» —
  // время клиента крупно, UTC отдельной строкой для сверки.
  const [slotMain, slotUtc] = (() => {
    const parts = d.slot.split(" · ");
    if (parts.length < 3) return [d.slot, ""];
    return [parts.slice(0, 2).join(" · "), parts.slice(2).join(" · ")];
  })();
  const call = d.slot
    ? [`📅 <b>Звонок:</b> ${h(slotMain)}`, ...(slotUtc ? [`      ↳ <i>${h(slotUtc)}</i>`] : [])]
    : [];

  const message = d.message
    ? [
        "📝 <b>Комментарий:</b>",
        `<blockquote>${h(
          d.message.length > MAX_COMMENT ? `${d.message.slice(0, MAX_COMMENT)}…` : d.message,
        )}</blockquote>`,
      ]
    : [];

  const utm = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
    .map((k) => d.utm[k])
    .filter(Boolean);

  const footer = [
    `<i>🕒 ${h(stamp(tz))} · ${sourceIcon(d.source)} ${h(d.sourceLabel)}</i>`,
    ...(utm.length ? [`<i>📣 ${h(utm.join(" · "))}</i>`] : []),
  ];

  return [
    head.join("\n"),
    LINE,
    blocks(contacts, business, call, message),
    LINE,
    footer.join("\n"),
  ].join("\n");
}
