import { track, trackCustom } from "@/lib/fbpixel";

export type LeadPayload = {
  /** Источник заявки: какая форма её отправила ("contact", "quiz", "region-kz", "b2b-landing" …). */
  source: string;
  name?: string;
  company?: string;
  email?: string;
  /** Телефон или мессенджер-контакт. */
  phone?: string;
  country?: string;
  /** Тип запроса (форма контактов). */
  inquiry?: string;
  message?: string;
  /** Роль клиента / тип бизнеса. */
  role?: string;
  /** Категории интереса (квиз). */
  categories?: string;
  /** Планируемый объём (квиз). */
  volume?: string;
  /** Язык интерфейса на момент отправки. */
  locale?: string;
  /** Код страны поставки (kz, uz…) — для Conversions API. */
  countryCode?: string;
  /** БИН / ИНН / регистрационный номер компании. */
  bin?: string;
  /** Теги через запятую, например "low_volume". */
  tags?: string;
  /** Выбранный слот звонка (квиз со звонком /b2b/call). */
  slot?: string;
  /** UTM-метки и fbclid визита. */
  utm?: Record<string, string>;
  /** Куки Meta для сопоставления в Conversions API. */
  fbp?: string;
  fbc?: string;
};

export type LeadResult = {
  /** Сервер принял заявку. */
  ok: boolean;
  /** Сервер признал лид квалифицированным (отправлен QualifiedLead). */
  qualified: boolean;
};

function newEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Отправляет заявку на /api/lead и только ПОСЛЕ успешной доставки
 * триггерит Meta Pixel "Lead" — чтобы не считать конверсии, которые не дошли.
 * Если сервер признал лид квалифицированным, дополнительно отправляет
 * "QualifiedLead" с тем же event_id, что и серверный дубль в Conversions API.
 * Никогда не бросает исключение — UX формы не должен ломаться из-за сети.
 */
export async function submitLead(
  payload: LeadPayload,
  opts: { contentName?: string } = {},
): Promise<LeadResult> {
  const eventId = newEventId();
  const contentName = opts.contentName ?? payload.source;
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        ...payload,
        eventId,
        page: typeof window !== "undefined" ? window.location.href : "",
        referrer: typeof document !== "undefined" ? document.referrer : "",
      }),
    });

    if (!res.ok) {
      console.error("[lead] заявка не отправлена, статус", res.status);
      return { ok: false, qualified: false };
    }

    const data = (await res.json().catch(() => ({}))) as { qualified?: boolean };
    const qualified = data.qualified === true;

    // Заявка принята сервером → отдаём стандартное событие Meta Pixel.
    track("Lead", { content_name: contentName });
    if (qualified) {
      trackCustom("QualifiedLead", { content_name: contentName }, eventId);
    }
    return { ok: true, qualified };
  } catch (err) {
    // Сеть упала — заявка не ушла, Lead не отправляем.
    console.error("[lead] submit failed", err);
    return { ok: false, qualified: false };
  }
}
