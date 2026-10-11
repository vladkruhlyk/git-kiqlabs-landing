/**
 * Атрибуция рекламного трафика для заявок с /b2b/*: UTM-метки, fbclid и куки
 * Meta (_fbp/_fbc). Метки сохраняются в sessionStorage, чтобы не потеряться
 * при переходе внутри ветки (например, гайд → квиз).
 */

const KEY = "kiq_b2b_attribution";

export const ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;

export type Attribution = Partial<
  Record<(typeof ATTRIBUTION_PARAMS)[number], string>
>;

function fromUrl(): Attribution {
  const out: Attribution = {};
  if (typeof window === "undefined") return out;
  const q = new URLSearchParams(window.location.search);
  for (const p of ATTRIBUTION_PARAMS) {
    const v = q.get(p);
    if (v) out[p] = v.slice(0, 200);
  }
  return out;
}

/** Запоминает метки из URL текущей страницы (если они есть). */
export function captureAttribution(): void {
  const fresh = fromUrl();
  if (Object.keys(fresh).length === 0) return;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(fresh));
  } catch {
    // Хранилище недоступно (приватный режим) — метки возьмём прямо из URL.
  }
}

/** Метки визита: из URL, иначе сохранённые ранее в этой сессии. */
export function getAttribution(): Attribution {
  const current = fromUrl();
  if (Object.keys(current).length > 0) return current;
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : undefined;
}

/** Куки Meta для сопоставления событий в Conversions API. */
export function getMetaCookies(): { fbp?: string; fbc?: string } {
  const fbp = readCookie("_fbp");
  let fbc = readCookie("_fbc");
  if (!fbc) {
    const fbclid = getAttribution().fbclid;
    if (fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
  }
  return { fbp, fbc };
}
