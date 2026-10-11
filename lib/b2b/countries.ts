/**
 * Страны поставки для ветки /b2b: падежи для подстановки в тексты, телефонные
 * коды и маски, часовые пояса для слотов звонка, рынок и тексты досье.
 * Параметр ?country=kz|uz|… на квизе и гайде берёт данные отсюда.
 */

export const COUNTRY_CODES = ["kz", "uz", "tj", "kg", "az", "ge", "am", "mn", "ae"] as const;
export type CountryCode = (typeof COUNTRY_CODES)[number];

export type B2BCountry = {
  code: CountryCode;
  /** Именительный: «Казахстан». */
  name: string;
  /** Винительный для «в …»: «в Казахстан». */
  acc: string;
  /** Родительный для «для …»: «для Казахстана». */
  gen: string;
  dial: string;
  /** Маска национального номера, X — цифра. */
  mask: string;
  tz: string;
  /** Союз/таможенная зона, если есть. */
  union?: string;
  /** Маркетплейс для текстов гайда («селлеров Kaspi»). */
  marketplace?: string;
  /** Пункты экрана «досье уже готово» в квизе. Без них — общий список. */
  dossier?: string[];
};

export const COUNTRIES: Record<CountryCode, B2BCountry> = {
  kz: {
    code: "kz", name: "Казахстан", acc: "Казахстан", gen: "Казахстана",
    dial: "+7", mask: "XXX XXX XX XX", tz: "Asia/Almaty",
    union: "ЕАЭС", marketplace: "Kaspi",
    dossier: [
      "Сертификация ЕАЭС",
      "Таможенное сопровождение",
      "Оплата в тенге",
      "Отгрузка 14–28 дней",
    ],
  },
  uz: {
    code: "uz", name: "Узбекистан", acc: "Узбекистан", gen: "Узбекистана",
    dial: "+998", mask: "XX XXX XX XX", tz: "Asia/Tashkent",
    marketplace: "Uzum",
    dossier: [
      "Регистрационное досье под требования Узбекистана",
      "Таможенное сопровождение",
      "Оплата в сумах",
      "Отгрузка 14–28 дней",
    ],
  },
  tj: {
    code: "tj", name: "Таджикистан", acc: "Таджикистан", gen: "Таджикистана",
    dial: "+992", mask: "XX XXX XXXX", tz: "Asia/Dushanbe",
  },
  kg: {
    code: "kg", name: "Кыргызстан", acc: "Кыргызстан", gen: "Кыргызстана",
    dial: "+996", mask: "XXX XXX XXX", tz: "Asia/Bishkek",
    union: "ЕАЭС",
    dossier: [
      "Сертификация ЕАЭС",
      "Таможенное сопровождение",
      "Отгрузка 14–28 дней",
    ],
  },
  az: {
    code: "az", name: "Азербайджан", acc: "Азербайджан", gen: "Азербайджана",
    dial: "+994", mask: "XX XXX XX XX", tz: "Asia/Baku",
  },
  ge: {
    code: "ge", name: "Грузия", acc: "Грузию", gen: "Грузии",
    dial: "+995", mask: "XXX XX XX XX", tz: "Asia/Tbilisi",
  },
  am: {
    code: "am", name: "Армения", acc: "Армению", gen: "Армении",
    dial: "+374", mask: "XX XXX XXX", tz: "Asia/Yerevan",
    union: "ЕАЭС",
    dossier: [
      "Сертификация ЕАЭС",
      "Таможенное сопровождение",
      "Отгрузка 14–28 дней",
    ],
  },
  mn: {
    code: "mn", name: "Монголия", acc: "Монголию", gen: "Монголии",
    dial: "+976", mask: "XXXX XXXX", tz: "Asia/Ulaanbaatar",
  },
  ae: {
    code: "ae", name: "ОАЭ", acc: "ОАЭ", gen: "ОАЭ",
    dial: "+971", mask: "XX XXX XXXX", tz: "Asia/Dubai",
    marketplace: "Noon и Amazon",
  },
};

export const COUNTRY_LIST: B2BCountry[] = COUNTRY_CODES.map((c) => COUNTRIES[c]);

/** Общий список досье для стран без своего текста. */
export const GENERAL_DOSSIER = [
  "Сертификаты анализа (CoA) на каждую партию",
  "Регистрационное досье под требования рынка",
  "Таможенное сопровождение",
  "Отгрузка 14–28 дней",
];

/** Страна из ?country=…; неизвестный код — undefined. */
export function parseCountry(value: string | null | undefined): B2BCountry | undefined {
  if (!value) return undefined;
  const code = value.trim().toLowerCase();
  return (COUNTRY_CODES as readonly string[]).includes(code)
    ? COUNTRIES[code as CountryCode]
    : undefined;
}

/** Сколько цифр в национальном номере по маске. */
export function phoneLength(country: B2BCountry): number {
  return country.mask.replace(/[^X]/g, "").length;
}
