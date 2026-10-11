/**
 * Единые данные ветки /b2b. Цифры в текстах берутся только отсюда, чтобы на
 * лендинге, в квизе и гайде они не расходились.
 */

export const FACTS = {
  discount: "до −35%",
  shipping: "14–28 дней",
  priceIn: "1 рабочий день",
  brands: "29+",
  countries: "9 стран",
  minOrder: "$5 000",
} as const;

export const PHONE = "+1 (312) 681-7103";
export const PHONE_HREF = "tel:+13126817103";
export const EMAIL = "info@kiqlabs.global";

/** Объём закупки в месяц. Первый вариант — ниже минимального заказа. */
export const VOLUMES = ["до $5 000", "$5 000–20 000", "$20 000–50 000", "$50 000+"] as const;
export const LOW_VOLUME = VOLUMES[0];

export const BUSINESS_TYPES = [
  "Дистрибьютор",
  "Аптечная сеть",
  "Интернет-магазин или маркетплейс",
  "Private Label",
  "Другое B2B",
] as const;

/** Тип бизнеса в гайде: «Планирую запуск» — не квалифицированный лид. */
export const PLANNING_LAUNCH = "Планирую запуск";
export const GUIDE_BUSINESS_TYPES = [
  "Дистрибьютор",
  "Аптечная сеть",
  "Интернет-магазин или маркетплейс",
  "Private Label",
  PLANNING_LAUNCH,
] as const;

/**
 * Бренды для ленты логотипов. logo — SVG в public/media/brands (с официальных
 * сайтов брендов), ratio — ширина/высота его viewBox. Без logo бренд выводится
 * названием: чтобы подключить логотип, положите SVG и впишите путь и ratio.
 */
export type Brand = { name: string; logo?: string; ratio?: number };

export const BRANDS: Brand[] = [
  { name: "NOW Foods", logo: "/media/brands/now-foods.svg", ratio: 3.31 },
  { name: "Solgar", logo: "/media/brands/solgar.svg", ratio: 1.35 },
  { name: "Optimum Nutrition", logo: "/media/brands/optimum-nutrition.svg", ratio: 3.56 },
  { name: "Life Extension", logo: "/media/brands/life-extension.svg", ratio: 2.63 },
  { name: "Pure Encapsulations", logo: "/media/brands/pure-encapsulations.svg", ratio: 3.33 },
  { name: "Swanson", logo: "/media/brands/swanson.svg", ratio: 4.6 },
  { name: "BSN", logo: "/media/brands/bsn.svg", ratio: 1.81 },
  { name: "Dymatize", logo: "/media/brands/dymatize.svg", ratio: 5.58 },
  { name: "MyProtein", logo: "/media/brands/myprotein.svg", ratio: 7.87 },
  { name: "OstroVit", logo: "/media/brands/ostrovit.svg", ratio: 3.38 },
];

/** Фото банок (WebP с прозрачностью, public/media/bottles). */
export const BOTTLES = [
  { src: "/media/bottles/ostrovit-omega-3.webp", alt: "OstroVit Omega 3", w: 334, h: 640 },
  { src: "/media/bottles/ostrovit-triple-zinc.webp", alt: "OstroVit Triple Zinc", w: 334, h: 640 },
  { src: "/media/bottles/ostrovit-biotin-plus.webp", alt: "OstroVit Biotin Plus", w: 216, h: 416 },
] as const;

/** Тег заявки с объёмом ниже минимального заказа. */
export const TAG_LOW_VOLUME = "low_volume";

/* ─────────── Квиз /b2b/quiz ─────────── */

/** «Кто вы?» — последний вариант уводит на экран отсева розницы. */
export const QUIZ_RETAIL = "Покупаю для себя";
export const QUIZ_ROLES = [
  "Дистрибьютор",
  "Аптечная сеть",
  "Интернет-магазин или селлер маркетплейса",
  "Private Label",
  QUIZ_RETAIL,
] as const;

/** Категории с формами для заголовка «маржу по [категориям]». */
export const QUIZ_CATEGORIES = [
  { label: "Спортивное питание", dative: "спортивному питанию", short: "спортпиту" },
  { label: "Витамины и минералы", dative: "витаминам и минералам", short: "витаминам" },
  { label: "Клинические БАДы", dative: "клиническим БАДам", short: "клиническим БАДам" },
  { label: "Private Label", dative: "Private Label", short: "Private Label" },
] as const;

/** Для вывода: неразрывный пробел внутри сумм («$5 000» не рвётся на две строки). */
export const keepAmounts = (s: string) => s.replace(/(\d) (\d{3})/g, "$1\u00A0$2");
