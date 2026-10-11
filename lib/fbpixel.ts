/**
 * Meta (Facebook) Pixel — браузерные хелперы.
 * ID берётся из NEXT_PUBLIC_FB_PIXEL_ID. Если не задан — пиксель просто не грузится.
 */

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

/** Стандартное событие просмотра страницы (нужно при SPA-переходах). */
export function pageview() {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "PageView");
}

/**
 * Стандартное событие Meta (например, "Lead", "Contact").
 * eventId — для дедупликации с тем же событием из Conversions API.
 */
export function track(
  name: string,
  options: Record<string, unknown> = {},
  eventId?: string,
) {
  if (typeof window === "undefined") return;
  if (eventId) window.fbq?.("track", name, options, { eventID: eventId });
  else window.fbq?.("track", name, options);
}

/** Кастомное событие Meta (например, "QualifiedLead", "RetailExit"). */
export function trackCustom(
  name: string,
  options: Record<string, unknown> = {},
  eventId?: string,
) {
  if (typeof window === "undefined") return;
  if (eventId) window.fbq?.("trackCustom", name, options, { eventID: eventId });
  else window.fbq?.("trackCustom", name, options);
}
