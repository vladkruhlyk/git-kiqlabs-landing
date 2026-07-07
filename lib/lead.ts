import { track } from "@/lib/fbpixel";

export type LeadPayload = {
  /** Источник заявки: какая форма её отправила ("contact", "quiz", "region-kz" …). */
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
  /** Роль клиента (квиз). */
  role?: string;
  /** Категории интереса (квиз). */
  categories?: string;
  /** Планируемый объём (квиз). */
  volume?: string;
  /** Язык интерфейса на момент отправки. */
  locale?: string;
};

/**
 * Отправляет заявку на /api/lead и только ПОСЛЕ успешной доставки
 * триггерит Meta Pixel "Lead" — чтобы не считать конверсии, которые не дошли.
 * Никогда не бросает исключение — UX формы не должен ломаться из-за сети.
 */
export async function submitLead(payload: LeadPayload): Promise<void> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        ...payload,
        page: typeof window !== "undefined" ? window.location.href : "",
        referrer: typeof document !== "undefined" ? document.referrer : "",
      }),
    });

    if (res.ok) {
      // Заявка принята сервером → отдаём стандартное событие Meta Pixel.
      track("Lead", { content_name: payload.source });
    } else {
      console.error("[lead] заявка не отправлена, статус", res.status);
    }
  } catch (err) {
    // Сеть упала — заявка не ушла, Lead не отправляем.
    console.error("[lead] submit failed", err);
  }
}
