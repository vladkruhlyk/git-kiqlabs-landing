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

/** Стандартное событие Meta (например, "Lead", "Contact"). */
export function track(name: string, options: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.fbq?.("track", name, options);
}
