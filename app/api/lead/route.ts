import { NextResponse } from "next/server";

export const runtime = "nodejs";
// Заявки нельзя кэшировать / пре-рендерить.
export const dynamic = "force-dynamic";

type LeadBody = Record<string, unknown>;

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
  const hasContact =
    typeof data.email === "string" && data.email.trim().length > 0
      ? true
      : typeof data.phone === "string" && data.phone.trim().length > 0;
  if (!hasContact) {
    return NextResponse.json(
      { ok: false, error: "missing_contact" },
      { status: 400 },
    );
  }

  const payload = {
    ...data,
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
