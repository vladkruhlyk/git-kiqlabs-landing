import { NextResponse, after } from "next/server";
import { notify } from "@/lib/notify";

export const runtime = "nodejs";
// Заявки нельзя кэшировать / пре-рендерить.
export const dynamic = "force-dynamic";

type LeadBody = Record<string, unknown>;

const KEYCRM_URL =
  process.env.KEYCRM_API_URL ?? "https://openapi.keycrm.app/v1/pipelines/cards";

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

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

  const card = buildKeyCrmData(data);
  const lead = {
    ...data,
    keycrm_data: card, // на случай, если webhook сам форвардит в KeyCRM
    submittedAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent") ?? "",
    ip:
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "",
  };

  // Бэкап: всегда пишем заявку в лог сервера.
  console.log("[lead]", JSON.stringify(lead));

  // Уведомление о конверсии (Telegram / Sheets / webhook) — после ответа,
  // не блокируя и не ломая сабмит. Срабатывает всегда, даже если CRM/вебхук
  // не настроены.
  after(() => notifyNewLead(data));

  // Шлём во все настроенные получатели параллельно.
  const tasks: { name: string; run: () => Promise<boolean> }[] = [];
  if (process.env.LEAD_WEBHOOK_URL) {
    tasks.push({ name: "webhook", run: () => sendToWebhook(lead) });
  }
  if (process.env.KEYCRM_API_TOKEN) {
    tasks.push({ name: "keycrm", run: () => sendToKeyCrm(card) });
  }

  if (tasks.length === 0) {
    console.warn("[lead] нет настроенных получателей (webhook/KeyCRM).");
    return NextResponse.json({ ok: true, delivered: {} });
  }

  const settled = await Promise.allSettled(tasks.map((t) => t.run()));
  const delivered: Record<string, boolean> = {};
  settled.forEach((r, i) => {
    delivered[tasks[i].name] = r.status === "fulfilled" && r.value === true;
  });

  const anyOk = Object.values(delivered).some(Boolean);
  return NextResponse.json(
    { ok: anyOk, delivered },
    { status: anyOk ? 200 : 502 },
  );
}

/** Человекочитаемый источник заявки для уведомления. */
function sourceLabel(source: unknown): string {
  const s = str(source);
  if (s === "quiz") return "Квиз";
  if (s === "contact") return "Форма контактов";
  if (s.startsWith("region-")) {
    return `Гео-лендинг (${s.replace("region-", "").toUpperCase()})`;
  }
  return s || "Сайт";
}

/** Рассылает уведомление о новой заявке (Telegram / Sheets / webhook). */
function notifyNewLead(data: LeadBody): Promise<void> {
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
    },
    {
      // Дедуп: повторный POST с теми же контактами не задублирует уведомление.
      eventId: `lead:${str(data.source)}:${str(data.email)}:${str(data.phone)}:${str(data.name)}`,
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
  if (str(data.role)) comment.push(`Тип бизнеса: ${str(data.role)}`);
  if (str(data.categories)) comment.push(`Категории: ${str(data.categories)}`);
  if (str(data.volume)) comment.push(`Объём: ${str(data.volume)}`);
  if (str(data.country)) comment.push(`Страна: ${str(data.country)}`);
  if (str(data.inquiry)) comment.push(`Тип запроса: ${str(data.inquiry)}`);
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
