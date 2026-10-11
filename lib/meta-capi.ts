import { createHash } from "node:crypto";

/**
 * Meta Conversions API — серверный дубль событий пикселя.
 * Браузер шлёт то же событие с тем же event_id, Meta склеивает их в одно.
 *
 * Env: META_CAPI_TOKEN, META_PIXEL_ID (по умолчанию NEXT_PUBLIC_FB_PIXEL_ID),
 * опционально META_GRAPH_VERSION и META_TEST_EVENT_CODE (проверка в Events Manager).
 * Без токена — тихо пропускает. Никогда не бросает, таймаут 5 секунд.
 */

const TIMEOUT_MS = 5000;

type CapiEvent = {
  eventName: string;
  eventId: string;
  eventSourceUrl?: string;
  email?: string;
  phone?: string;
  /** Двухбуквенный код страны (kz, uz…). */
  countryCode?: string;
  ip?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
  customData?: Record<string, string | number>;
};

const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");

export async function sendCapiEvent(e: CapiEvent): Promise<void> {
  const token = process.env.META_CAPI_TOKEN;
  const pixelId = process.env.META_PIXEL_ID ?? process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  if (!token || !pixelId) {
    console.log("[capi] не настроен (META_CAPI_TOKEN / META_PIXEL_ID) — пропуск", e.eventName);
    return;
  }

  // Нормализация по требованиям Meta: email — trim + lowercase,
  // телефон — только цифры с кодом страны, страна — 2 буквы в нижнем регистре.
  const email = e.email?.trim().toLowerCase();
  const phone = e.phone?.replace(/\D/g, "").replace(/^0+/, "");
  const country = e.countryCode?.trim().toLowerCase();

  const userData: Record<string, unknown> = {};
  if (email) userData.em = [sha256(email)];
  if (phone) userData.ph = [sha256(phone)];
  if (country && country.length === 2) userData.country = [sha256(country)];
  if (e.ip) userData.client_ip_address = e.ip;
  if (e.userAgent) userData.client_user_agent = e.userAgent;
  if (e.fbp) userData.fbp = e.fbp;
  if (e.fbc) userData.fbc = e.fbc;

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: e.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: e.eventId,
        action_source: "website",
        event_source_url: e.eventSourceUrl,
        user_data: userData,
        custom_data: e.customData,
      },
    ],
  };
  if (process.env.META_TEST_EVENT_CODE) {
    body.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  const version = process.env.META_GRAPH_VERSION ?? "v23.0";
  const url = `https://graph.facebook.com/${version}/${pixelId}/events?access_token=${encodeURIComponent(token)}`;

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[capi]", e.eventName, res.status, text.slice(0, 300));
    } else {
      console.log("[capi] ok", e.eventName, e.eventId);
    }
  } catch (err) {
    console.error("[capi] ошибка запроса", err);
  } finally {
    clearTimeout(timer);
  }
}
