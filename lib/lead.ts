import { track } from "@/lib/fbpixel";

export type LeadPayload = {
  /** Источник заявки: какая форма её отправила. */
  source: "contact" | "quiz";
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
 * Отправляет заявку: триггерит Meta Pixel "Lead" и шлёт данные на /api/lead.
 * Никогда не бросает исключение — UX формы не должен ломаться из-за сети.
 */
export async function submitLead(payload: LeadPayload): Promise<void> {
  // 1. Meta Pixel — стандартное событие Lead.
  track("Lead", { content_name: payload.source });

  // 2. Отправка на серверный роут (он уже пересылает на webhook).
  try {
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        ...payload,
        page: typeof window !== "undefined" ? window.location.href : "",
        referrer: typeof document !== "undefined" ? document.referrer : "",
      }),
    });
  } catch (err) {
    // Лог в консоль — заявка не должна теряться молча для разработчика.
    console.error("[lead] submit failed", err);
  }
}
