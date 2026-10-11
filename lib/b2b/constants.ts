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
  minOrder: "$5 000",
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

/** Бренды для ленты логотипов (файлов логотипов нет — выводятся названиями). */
export const BRANDS = [
  "NOW Foods",
  "Solgar",
  "Optimum Nutrition",
  "Life Extension",
  "Pure Encapsulations",
  "Swanson",
  "BSN",
  "Dymatize",
  "MyProtein",
  "OstroVit",
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
