import { NextResponse } from "next/server";

export const runtime = "nodejs";
// Заявки нельзя кэшировать / пре-рендерить.
export const dynamic = "force-dynamic";

type LeadBody = Record<string, unknown>;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(req: Request) {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

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

  const payload = {
    ...data,
    // Готовое тело карточки для KeyCRM — Make форвардит его в openapi.keycrm.app.
    keycrm_data: buildKeyCrmData(data),
    submittedAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent") ?? "",
    ip:
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "",
  };

  // Бэкап: всегда пишем заявку в лог сервера, даже если webhook упадёт.
  console.log("[lead]", JSON.stringify(payload));

  if (!webhookUrl) {
    console.warn(
      "[lead] LEAD_WEBHOOK_URL не задан — заявка получена, но никуда не переслана.",
    );
    return NextResponse.json({ ok: true, forwarded: false });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("[lead] webhook ответил статусом", res.status);
      return NextResponse.json(
        { ok: false, error: "webhook_failed", status: res.status },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[lead] ошибка отправки на webhook", err);
    return NextResponse.json(
      { ok: false, error: "webhook_error" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, forwarded: true });
}

/**
 * Собирает готовое тело карточки KeyCRM (POST /v1/pipelines/cards).
 * Make берёт его из поля keycrm_data и форвардит в KeyCRM как есть.
 */
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

  const keycrm: Record<string, unknown> = {
    title: name ? `Заявка от ${name}` : "Заявка с сайта",
    manager_comment: comment.join("\n"),
    contact: {
      full_name: name || undefined,
      email: str(data.email) || undefined,
      phone: phone || undefined,
    },
  };
  // source_id (id источника в KeyCRM) — опционально, через env.
  if (process.env.KEYCRM_SOURCE_ID) {
    keycrm.source_id = Number(process.env.KEYCRM_SOURCE_ID);
  }
  return keycrm;
}
