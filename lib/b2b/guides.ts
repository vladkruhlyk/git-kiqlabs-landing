import type { CountryCode } from "./countries";

/**
 * PDF гайда по странам. Чтобы подключить гайд под страну: положите файл в
 * public/guides/<код>.pdf и добавьте строку сюда, например
 *   kz: "/guides/kz.pdf",
 * Если для страны файла нет — отдаётся общий гайд.
 */
const GUIDE_PDFS: Partial<Record<CountryCode, string>> = {};

export const GENERAL_GUIDE_PDF = "/guides/general.pdf";

export function guidePdf(code?: CountryCode): string {
  return (code && GUIDE_PDFS[code]) || GENERAL_GUIDE_PDF;
}
