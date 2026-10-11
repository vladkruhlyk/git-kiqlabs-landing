import { NextResponse, after } from "next/server";
import { notify } from "@/lib/notify";
import { sendCapiEvent } from "@/lib/meta-capi";
import { isQualifiedLead } from "@/lib/b2b/qualify";

export const runtime = "nodejs";
// Заявки нельзя кэшировать / пре-рендерить.
export const dynamic = "force-dynamic";

type LeadBody = Record<string, unknown>;

const KEYCRM_URL =
  process.env.KEYCRM_API_URL ?? "https://openapi.keycrm.app/v1/pipelines/cards";

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

/** UTM-метки из тела заявки (объект utm), только известные ключи. */
function utmOf(data: LeadBody): Record<(typeof UTM_KEYS)[number], string> {
  const raw =
    data.utm && typeof data.utm === "object" ? (data.utm as Record<string, unknown>) : {};
  return Object.fromEntries(UTM_KEYS.map((k) => [k, str(raw[k])])) as Record<
    (typeof UTM_KEYS)[number],
    string
  >;
}

export async function POST(req: Request) {
  let data: LeadBody;
  try {
    data = (await req.json()) as LeadBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  // Минимальная валидация: должен быть хоть какой-то способ связи.
  const hasContact = !!str(data.email) || !!str(data.phone);
  if (!hasContact) {
    return NextResponse.json(
      { ok: false, error: "missing_contact" },
      { status: 400 },
    );
  }

  const source = str(data.source);
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "";
  const userAgent = req.headers.get("user-agent") ?? "";

  // Квалификация решается только на сервере (правило — lib/b2b/qualify.ts).
  const qualifiedByRules = isQualifiedLead(source, {
    volume: str(data.volume),
    bin: str(data.bin),
    tags: str(data.tags),
    role: str(data.role),
  });

  const card = buildKeyCrmData(data);
  const lead = {
    ...data,
    qualified: qualifiedByRules,
    keycrm_data: card, // на случай, если webhook сам форвардит в KeyCRM
    submittedAt: new Date().toISOString(),
    userAgent,
    ip,
  };

  // Бэкап: всегда пишем заявку в лог сервера.
  console.log("[lead]", JSON.stringify(lead));

  // Уведомление о конверсии (Telegram / Sheets / webhook) — после ответа,
  // не блокируя и не ломая сабмит. Срабатывает всегда, даже если CRM/вебхук
  // не настроены.
  after(() => notifyNewLead(data, qualifiedByRules));

  // Шлём во все настроенные получатели параллельно.
  const tasks: { name: string; run: () => Promise<boolean> }[] = [];
  if (process.env.LEAD_WEBHOOK_URL) {
    tasks.push({ name: "webhook", run: () => sendToWebhook(lead) });
  }
  if (process.env.KEYCRM_API_TOKEN) {
    tasks.push({ name: "keycrm", run: () => sendToKeyCrm(card) });
  }

  const delivered: Record<string, boolean> = {};
  let anyOk = true;
  if (tasks.length === 0) {
    console.warn("[lead] нет настроенных получателей (webhook/KeyCRM).");
  } else {
    const settled = await Promise.allSettled(tasks.map((t) => t.run()));
    settled.forEach((r, i) => {
      delivered[tasks[i].name] = r.status === "fulfilled" && r.value === true;
    });
    anyOk = Object.values(delivered).some(Boolean);
  }

  // QualifiedLead считаем только по реально принятой заявке — так же, как
  // браузер шлёт пиксель только при успешном ответе.
  const qualified = anyOk && qualifiedByRules;
  const eventId = str(data.eventId);
  if (qualified && eventId) {
    after(() =>
      sendCapiEvent({
        eventName: "QualifiedLead",
        eventId,
        eventSourceUrl: str(data.page) || undefined,
        email: str(data.email),
        phone: str(data.phone),
        countryCode: str(data.countryCode),
        ip,
        userAgent,
        fbp: str(data.fbp) || undefined,
        fbc: str(data.fbc) || undefined,
        customData: {
          content_name: source,
          ...(str(data.volume) ? { volume: str(data.volume) } : {}),
          ...(str(data.role) ? { business_type: str(data.role) } : {}),
        },
      }),
    );
  }

  return NextResponse.json(
    { ok: anyOk, delivered, qualified },
    { status: anyOk ? 200 : 502 },
  );
}

/** Человекочитаемый источник заявки для уведомления. */
function sourceLabel(source: unknown): string {
  const s = str(source);
  if (s === "quiz") return "Квиз";
  if (s === "b2b") return "B2B-лендинг";
  if (s === "b2b-landing") return "B2B-лендинг";
  if (s === "b2b-quiz") return "B2B-квиз";
  if (s === "b2b-guide") return "B2B-гайд";
  if (s === "contact") return "Форма контактов";
  if (s.startsWith("region-")) {
    return `Гео-лендинг (${s.replace("region-", "").toUpperCase()})`;
  }
  return s || "Сайт";
}

/** Рассылает уведомление о новой заявке (Telegram / Sheets / webhook). */
function notifyNewLead(data: LeadBody, qualified: boolean): Promise<void> {
  const source = str(data.source);
  const utm = utmOf(data);
  return notify(
    "🆕 Новая заявка с сайта",
    {
      Источник: sourceLabel(data.source),
      Имя: str(data.name),
      Компания: str(data.company),
      Email: str(data.email),
      "Телефон/Telegram": str(data.phone),
      Страна: str(data.country),
      "Тип бизнеса": str(data.role),
      Категории: str(data.categories),
      Объём: str(data.volume),
      "Тип запроса": str(data.inquiry),
      Сообщение: str(data.message),
      // Новые поля — строго В КОНЦЕ: колонки таблицы идут в порядке ключей,
      // так старые столбцы не сдвигаются.
      "БИН/ИНН": str(data.bin),
      Теги: str(data.tags),
      "Слот звонка": str(data.slot),
      Квалифицирован: source.startsWith("b2b-") ? (qualified ? "Да" : "Нет") : "",
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      utm_content: utm.utm_content,
      utm_term: utm.utm_term,
    },
    {
      // Дедуп: повторный POST с теми же контактами не задублирует уведомление.
      eventId: `lead:${source}:${str(data.email)}:${str(data.phone)}:${str(data.name)}`,
    },
  );
}

/** Пересылает заявку как есть на внешний webhook (Make → Google Sheets). */
async function sendToWebhook(lead: LeadBody): Promise<boolean> {
  try {
    const res = await fetch(process.env.LEAD_WEBHOOK_URL as string, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) {
      console.error("[lead] webhook ответил статусом", res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[lead] ошибка отправки на webhook", err);
    return false;
  }
}

/** Создаёт карточку лида напрямую в воронке KeyCRM. */
async function sendToKeyCrm(card: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch(KEYCRM_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.KEYCRM_API_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(card),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("[lead] KeyCRM ошибка", res.status, body.slice(0, 500));
      return false;
    }
    return true;
  } catch (err) {
    console.error("[lead] ошибка запроса к KeyCRM", err);
    return false;
  }
}

/** Готовое тело карточки KeyCRM (POST /v1/pipelines/cards). */
function buildKeyCrmData(data: LeadBody) {
  const name = str(data.name);
  const company = str(data.company);
  const phone = str(data.phone);

  const comment = [
    `Компания: ${company || "-"}`,
    `Telegram/Телефон: ${phone || "-"}`,
  ];
  if (str(data.bin)) comment.push(`БИН/ИНН: ${str(data.bin)}`);
  if (str(data.role)) comment.push(`Тип бизнеса: ${str(data.role)}`);
  if (str(data.categories)) comment.push(`Категории: ${str(data.categories)}`);
  if (str(data.volume)) comment.push(`Объём: ${str(data.volume)}`);
  if (str(data.country)) comment.push(`Страна: ${str(data.country)}`);
  if (str(data.inquiry)) comment.push(`Тип запроса: ${str(data.inquiry)}`);
  if (str(data.slot)) comment.push(`Слот звонка: ${str(data.slot)}`);
  if (str(data.tags)) comment.push(`Теги: ${str(data.tags)}`);
  if (str(data.source)) comment.push(`Источник: ${sourceLabel(data.source)}`);
  const utm = Object.entries(utmOf(data))
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}=${v}`)
    .join(", ");
  if (utm) comment.push(`UTM: ${utm}`);
  comment.push(`Комментарий: ${str(data.message) || "-"}`);

  const card: Record<string, unknown> = {
    title: name ? `Заявка от ${name}` : "Заявка с сайта",
    manager_comment: comment.join("\n"),
    contact: {
      full_name: name || undefined,
      email: str(data.email) || undefined,
      phone: phone || undefined,
    },
  };
  if (process.env.KEYCRM_PIPELINE_ID) {
    card.pipeline_id = Number(process.env.KEYCRM_PIPELINE_ID);
  }
  if (process.env.KEYCRM_SOURCE_ID) {
    card.source_id = Number(process.env.KEYCRM_SOURCE_ID);
  }
  return card;
}
