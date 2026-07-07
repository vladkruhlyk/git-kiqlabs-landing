/**
 * Гео-лендинги под рекламу: одна страна = один лендинг.
 * Базовые данные + шаблонный текст. Bespoke-копирайт кладётся в CONTENT_OVERRIDES.
 */

export type RegionContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroAccent: string; // выделенная (цветом) часть заголовка
  heroSubtitle: string;
  ctaPrimary: string;
  triage: string[];
  valueProps: { title: string; body: string }[];
  formTitle: string;
  formSubtitle: string;
  metaTitle: string;
  metaDescription: string;
};

export type RegionBase = {
  slug: string;
  code: string;
  lang: "ru" | "en";
  name: string; // именительный
  nameAcc: string; // винительный: «поставки в …»
  namePrep: string; // предложный: «работаем в …»
  flag: string;
  capital: string;
};

export type Region = RegionBase & { content: RegionContent };

const MIN_RU = "$5 000";
const MIN_EN = "$5,000";

const BASE: RegionBase[] = [
  { slug: "kz", code: "KZ", lang: "ru", name: "Казахстан", nameAcc: "Казахстан", namePrep: "Казахстане", flag: "🇰🇿", capital: "Астаны" },
  { slug: "uz", code: "UZ", lang: "ru", name: "Узбекистан", nameAcc: "Узбекистан", namePrep: "Узбекистане", flag: "🇺🇿", capital: "Ташкента" },
  { slug: "tj", code: "TJ", lang: "ru", name: "Таджикистан", nameAcc: "Таджикистан", namePrep: "Таджикистане", flag: "🇹🇯", capital: "Душанбе" },
  { slug: "kg", code: "KG", lang: "ru", name: "Кыргызстан", nameAcc: "Кыргызстан", namePrep: "Кыргызстане", flag: "🇰🇬", capital: "Бишкека" },
  { slug: "az", code: "AZ", lang: "ru", name: "Азербайджан", nameAcc: "Азербайджан", namePrep: "Азербайджане", flag: "🇦🇿", capital: "Баку" },
  { slug: "ge", code: "GE", lang: "ru", name: "Грузия", nameAcc: "Грузию", namePrep: "Грузии", flag: "🇬🇪", capital: "Тбилиси" },
  { slug: "am", code: "AM", lang: "ru", name: "Армения", nameAcc: "Армению", namePrep: "Армении", flag: "🇦🇲", capital: "Еревана" },
  { slug: "mn", code: "MN", lang: "ru", name: "Монголия", nameAcc: "Монголию", namePrep: "Монголии", flag: "🇲🇳", capital: "Улан-Батора" },
  { slug: "ae", code: "AE", lang: "en", name: "UAE", nameAcc: "UAE", namePrep: "UAE", flag: "🇦🇪", capital: "Dubai" },
];

function defaultContent(r: RegionBase): RegionContent {
  if (r.lang === "en") {
    return {
      heroEyebrow: `B2B · Wholesale only · from ${MIN_EN}`,
      heroTitle: "Vitamins & sports nutrition wholesale —",
      heroAccent: `supply to the ${r.name}`,
      heroSubtitle: `Direct from US & EU factories to the ${r.name}. Direct contracts, ready documents, dispatch from 14 days. Wholesale only, from ${MIN_EN}.`,
      ctaPrimary: "Get a B2B price list",
      triage: ["B2B only", `Wholesale from ${MIN_EN}`, "No retail"],
      valueProps: [
        { title: "Direct US & EU contracts", body: "We buy directly from American and European factories — no middlemen. Prices up to −35% below market." },
        { title: `Documents for the ${r.name}`, body: `Ready dossier, certification and customs support tuned to ${r.name} market requirements.` },
        { title: `Wholesale from ${MIN_EN}`, body: "We work with real B2B volumes: distributors, pharmacies, marketplaces, private label. No retail." },
        { title: "Dispatch from 14 days", body: `Logistics to ${r.capital} and across the country. Regular supply and FCL/LCL container volumes.` },
      ],
      formTitle: `Get a price list for the ${r.name} in 1 business day`,
      formSubtitle: "Answer a few questions — we'll send a current B2B price list and calculate logistics.",
      metaTitle: `Wholesale vitamins & sports nutrition supply to the ${r.name} — KIQ Labs`,
      metaDescription: `B2B distribution of vitamins, supplements and sports nutrition from US & EU to the ${r.name}. Wholesale only from ${MIN_EN}.`,
    };
  }
  return {
    heroEyebrow: `B2B · Только опт · от ${MIN_RU}`,
    heroTitle: "Витамины и спортпит оптом —",
    heroAccent: `поставки в ${r.nameAcc}`,
    heroSubtitle: `Напрямую с заводов США и ЕС в ${r.nameAcc}. Прямые контракты, готовые документы, отгрузка от 14 дней. Работаем только с оптом от ${MIN_RU}.`,
    ctaPrimary: "Получить B2B-прайс",
    triage: ["Только B2B", `Опт от ${MIN_RU}`, "Розницу не обслуживаем"],
    valueProps: [
      { title: "Прямые контракты US & EU", body: "Закупаем напрямую на заводах Америки и Европы — без посредников и наценок. Цена ниже рынка до −35%." },
      { title: `Документы под рынок ${r.namePrep}`, body: `Готовое досье, сертификация и таможенное сопровождение под требования рынка в ${r.namePrep}.` },
      { title: `Опт от ${MIN_RU}`, body: "Работаем с реальными B2B-объёмами: дистрибьюторы, аптеки, маркетплейсы, private label. Розницу не обслуживаем." },
      { title: "Отгрузка от 14 дней", body: `Логистика до ${r.capital} и по стране. Регулярные поставки и контейнерные объёмы FCL/LCL.` },
    ],
    formTitle: `Получите прайс под ${r.nameAcc} за 1 рабочий день`,
    formSubtitle: "Ответьте на пару вопросов — пришлём актуальный B2B-прайс и рассчитаем логистику.",
    metaTitle: `Оптовые поставки витаминов и спортпита в ${r.nameAcc} — KIQ Labs`,
    metaDescription: `B2B-дистрибуция витаминов, БАДов и спортпита из США и ЕС в ${r.nameAcc}. Только опт от ${MIN_RU}. Прямые контракты, документы, логистика.`,
  };
}

/** Bespoke-копирайт под конкретную страну (перекрывает шаблон). Сгенерирован агентами. */
const CONTENT_OVERRIDES: Partial<Record<string, Partial<RegionContent>>> = {
  kz: {
    heroEyebrow: "B2B · Только опт · от $5 000",
    heroTitle: "Витамины и спортпит оптом —",
    heroAccent: "поставки в Казахстан",
    heroSubtitle:
      "Напрямую с заводов США и ЕС в Казахстан, без посредников и лишних наценок. Цена ниже рынка до −35%, готовое досье под ЕАЭС, отгрузка от 14 дней. Работаем только с оптом от $5 000 — розницу не обслуживаем.",
    ctaPrimary: "Получить B2B-прайс",
    triage: ["Только B2B", "Опт от $5 000", "Розницу не обслуживаем"],
    valueProps: [
      { title: "Прямые контракты US & EU", body: "Закупаем напрямую на заводах Америки и Европы — без прослойки трейдеров и наценок. Цена ниже рынка до −35% на каждой партии." },
      { title: "Документы под рынок в Казахстане", body: "Готовое досье, декларации и сертификаты ЕАЭС под требования РК. Полное таможенное сопровождение — товар заходит легально и без простоев." },
      { title: "Каналы сбыта в Казахстане", body: "Поставляем дистрибьюторам, аптечным сетям и продавцам на Kaspi, Wildberries и Ozon. Растущий рынок БАДов и спортпита — забираем маржу посредников себе. Есть private label." },
      { title: "Отгрузка от 14 дней", body: "Логистика до Астаны, Алматы и по всему Казахстану. Регулярные поставки и контейнерные объёмы FCL/LCL под план продаж." },
    ],
    formTitle: "Получите прайс под Казахстан за 1 рабочий день",
    formSubtitle: "Ответьте на пару вопросов — пришлём актуальный B2B-прайс с ценами ниже рынка и рассчитаем логистику до вашего города.",
    metaTitle: "Витамины и спортпит оптом в Казахстан — KIQ Labs",
    metaDescription: "B2B-дистрибуция витаминов, БАДов и спортпита из США и ЕС в Казахстан. Прямые контракты, цена до −35%, досье ЕАЭС, отгрузка от 14 дней. Только опт от $5 000.",
  },
  uz: {
    heroEyebrow: "B2B · Только опт · от $5 000",
    heroTitle: "Витамины и спортпит оптом —",
    heroAccent: "поставки в Узбекистан",
    heroSubtitle:
      "Напрямую с заводов США и ЕС в Узбекистан, без посредников — цены до −35% ниже рынка. Готовое досье под сертификацию Узбекистана, отгрузка от 14 дней, логистика до Ташкента. Работаем только с оптом от $5 000 — розницу не обслуживаем.",
    ctaPrimary: "Получить B2B-прайс",
    triage: ["Только B2B", "Опт от $5 000", "Розницу не обслуживаем"],
    valueProps: [
      { title: "Прямые контракты с заводами", body: "Закупаем напрямую на фабриках США и ЕС, без цепочки посредников. За счёт этого прайс до −35% ниже рынка при стабильном качестве и объёмах." },
      { title: "Документы под Узбекистан", body: "Готовое досье и сертификация под требования рынка Узбекистана: GMP, инвойсы и сопроводительные документы для растаможки и регистрации БАД. Ввозите без задержек на таможне." },
      { title: "Отгрузка от 14 дней", body: "Со склада до Ташкента — прогнозируемые сроки от 14 дней. Рассчитываем логистику и партию под ваш оборот, чтобы полки и склады не простаивали." },
      { title: "Дистрибьюторам и маркетплейсам", body: "Работаем с оптовыми дистрибьюторами, аптечными сетями и продавцами на Uzum Market и других маркетплейсах Узбекистана. Соберём линейку и запустим private label под ваш бренд." },
    ],
    formTitle: "Получите прайс под Узбекистан за 1 рабочий день",
    formSubtitle: "Ответьте на пару вопросов — пришлём актуальный B2B-прайс с ценами до −35% ниже рынка и рассчитаем логистику до Ташкента.",
    metaTitle: "Витамины и спортпит оптом в Узбекистан — KIQ Labs",
    metaDescription: "B2B-поставки витаминов, БАДов и спортпита из США и ЕС в Узбекистан. Прямые контракты, цены до −35%, досье под сертификацию, отгрузка от 14 дней. Опт от $5 000.",
  },
  tj: {
    heroEyebrow: "B2B · Только опт · от $5 000",
    heroTitle: "Витамины и спортпит оптом —",
    heroAccent: "поставки в Таджикистан",
    heroSubtitle:
      "Напрямую с заводов США и ЕС в Таджикистан, без посредников и лишних наценок. Готовое досье под сертификацию, отгрузка от 14 дней, логистика до Душанбе. Работаем только с оптом от $5 000 — розницу не обслуживаем.",
    ctaPrimary: "Получить B2B-прайс",
    triage: ["Только B2B", "Опт от $5 000", "Розницу не обслуживаем"],
    valueProps: [
      { title: "Прямые контракты US & EU", body: "Закупаем напрямую на заводах Америки и Европы — без цепочки посредников. Цена ниже рынка до −35%, что даёт вам реальную маржу на полке." },
      { title: "Документы под Таджикистан", body: "Готовое досье и сертификаты соответствия под требования Таджикстандарта и правила ввоза БАДов. Проходим таможню в Душанбе без простоев на партии." },
      { title: "Опт от $5 000", body: "Работаем с дистрибьюторами, аптечными сетями, маркетплейсами и private label. Реальные B2B-объёмы, а не розничные заказы." },
      { title: "Отгрузка от 14 дней", body: "Логистика до Душанбе и по регионам Таджикистана. Регулярные поставки и контейнерные объёмы FCL/LCL под растущий спрос на витамины и спортпит." },
    ],
    formTitle: "Получите прайс под Таджикистан за 1 рабочий день",
    formSubtitle: "Ответьте на пару вопросов о вашем канале и объёме — пришлём актуальный B2B-прайс и рассчитаем логистику до Душанбе.",
    metaTitle: "Витамины и спортпит оптом в Таджикистан — KIQ Labs",
    metaDescription: "B2B-дистрибуция витаминов, БАДов и спортпита из США и ЕС в Таджикистан. Прямые контракты, цена до −35%, документы под Таджикстандарт. Только опт от $5 000.",
  },
  kg: {
    heroEyebrow: "B2B · Только опт · от $5 000",
    heroTitle: "Витамины и спортпит оптом —",
    heroAccent: "поставки в Кыргызстан",
    heroSubtitle:
      "Напрямую с заводов США и ЕС в Кыргызстан — без посредников и наценок. Прямые контракты, готовое досье под ЕАЭС, отгрузка от 14 дней. Работаем только с оптом от $5 000. Розницу не обслуживаем.",
    ctaPrimary: "Получить B2B-прайс",
    triage: ["Только B2B", "Опт от $5 000", "Розницу не обслуживаем"],
    valueProps: [
      { title: "Прямые контракты US & EU", body: "Закупаем напрямую на заводах Америки и Европы — без цепочки перекупщиков. Цена ниже рынка Кыргызстана до −35%, маржа остаётся у вас." },
      { title: "Документы под ЕАЭС", body: "Кыргызстан в ЕАЭС — работаем по декларациям ТР ТС и готовому досье, которое проходит таможню в Бишкеке без сюрпризов. Один сертификат открывает и весь рынок Союза." },
      { title: "Под дистрибьюторов и аптеки", body: "Поставляем аптечным сетям, дистрибьюторам БАДов, фитнес-каналу и маркетплейсам Кыргызстана. Есть private label под ваш бренд. Только реальные B2B-объёмы." },
      { title: "Отгрузка от 14 дней", body: "Логистика до Бишкека и по стране, включая контейнерные объёмы FCL/LCL. Регулярные поставки под ваш складской оборот, а не разовая партия." },
    ],
    formTitle: "Получите прайс под Кыргызстан за 1 рабочий день",
    formSubtitle: "Ответьте на пару вопросов — пришлём актуальный B2B-прайс с ценами ниже рынка и рассчитаем логистику до Бишкека.",
    metaTitle: "Витамины и спортпит оптом в Кыргызстан — KIQ Labs",
    metaDescription: "B2B-дистрибуция витаминов, БАДов и спортпита из США и ЕС в Кыргызстан. Прямые контракты, документы под ЕАЭС, отгрузка от 14 дней. Только опт от $5 000.",
  },
  az: {
    heroEyebrow: "B2B · Только опт · от $5 000",
    heroTitle: "Витамины и спортпит оптом —",
    heroAccent: "поставки в Азербайджан",
    heroSubtitle:
      "Напрямую с заводов США и ЕС в Азербайджан, без посредников и лишних наценок. Готовое досье под регистрацию БАД, гигиенический сертификат и таможня в Баку, отгрузка от 14 дней. Работаем только с оптом от $5 000 — розницу не обслуживаем.",
    ctaPrimary: "Получить B2B-прайс",
    triage: ["Только B2B", "Опт от $5 000", "Розницу не обслуживаем"],
    valueProps: [
      { title: "Прямые контракты US & EU", body: "Закупаем напрямую на заводах Америки и Европы — без посредников и наценок дистрибьюторов. Цена ниже рынка до −35%." },
      { title: "Документы под рынок в Азербайджане", body: "Готовое досье под регистрацию БАД, гигиенический сертификат и полное таможенное сопровождение под требования рынка в Азербайджане. Ввозите легально и без простоя груза." },
      { title: "Опт от $5 000", body: "Работаем с реальными B2B-объёмами: дистрибьюторы, аптечные сети, маркетплейсы (Umico, Trendyol) и private label. Розницу не обслуживаем." },
      { title: "Логистика до Баку от 14 дней", body: "Отгрузка от 14 дней и доставка до Баку и по всему Азербайджану. Регулярные поставки и контейнерные объёмы FCL/LCL под растущий рынок спортпита и БАД." },
    ],
    formTitle: "Получите прайс под Азербайджан за 1 рабочий день",
    formSubtitle: "Ответьте на пару вопросов — пришлём актуальный B2B-прайс и рассчитаем логистику до Баку.",
    metaTitle: "Витамины и спортпит оптом в Азербайджан — KIQ Labs",
    metaDescription: "B2B-дистрибуция витаминов, БАДов и спортпита из США и ЕС в Азербайджан. Только опт от $5 000: прямые контракты, документы под регистрацию, логистика до Баку.",
  },
  ge: {
    heroEyebrow: "B2B · Только опт · от $5 000",
    heroTitle: "Витамины и спортпит оптом —",
    heroAccent: "поставки в Грузию",
    heroSubtitle:
      "Напрямую с заводов США и ЕС в Грузию, без посредников и наценок. Прямые контракты, готовое досье под нотификацию Национального агентства продовольствия, отгрузка от 14 дней. Работаем только с оптом от $5 000 — розницу не обслуживаем.",
    ctaPrimary: "Получить B2B-прайс",
    triage: ["Только B2B", "Опт от $5 000", "Розницу не обслуживаем"],
    valueProps: [
      { title: "Прямые контракты US & EU", body: "Закупаем напрямую на заводах Америки и Европы — без посредников. Цена ниже рынка до −35%, и на товары из ЕС работает режим DCFTA." },
      { title: "Документы под рынок Грузии", body: "Готовое досье и нотификация БАДов под требования Национального агентства продовольствия (MEPA), плюс таможенное сопровождение на ввоз." },
      { title: "Опт от $5 000", body: "Работаем с реальными B2B-объёмами: дистрибьюторы, аптечные сети (Aversi, PSP, GPC), маркетплейсы и private label. Розницу не обслуживаем." },
      { title: "Отгрузка от 14 дней", body: "Логистика через Поти, Батуми и Верхний Ларс до складов в Тбилиси и по всей стране. Регулярные поставки и контейнерные объёмы FCL/LCL." },
    ],
    formTitle: "Получите прайс под Грузию за 1 рабочий день",
    formSubtitle: "Ответьте на пару вопросов — пришлём актуальный B2B-прайс под рынок Грузии и рассчитаем логистику до Тбилиси.",
    metaTitle: "Витамины и спортпит оптом в Грузию — KIQ Labs",
    metaDescription: "B2B-дистрибуция витаминов, БАДов и спортпита из США и ЕС в Грузию. Только опт от $5 000. Прямые контракты, нотификация, логистика до Тбилиси.",
  },
  am: {
    heroEyebrow: "Оптом от $5 000 — розницу не обслуживаем",
    heroTitle: "Витамины и спортпит оптом —",
    heroAccent: "поставки в Армению",
    heroSubtitle:
      "Прямые контракты с заводами США и ЕС — без посредников, цены до −35% ниже рынка. Готовое досье и сертификация ЕАЭС под рынок Армении, отгрузка от 14 дней. Работаем оптом от $5 000; в розницу не продаём.",
    ctaPrimary: "Запросить оптовый прайс",
    triage: ["Опт от $5 000", "Заводы США и ЕС напрямую", "Розницу не обслуживаем"],
    valueProps: [
      { title: "Завод напрямую", body: "Контракты с производителями США и ЕС без цепочки посредников. Закупочная цена до −35% ниже рынка — маржа остаётся у вас, а не у трейдеров." },
      { title: "Сертификация под ЕАЭС", body: "Готовое досье и декларации соответствия ЕАЭС под ввоз в Армению. Проходите таможню в Ереване без задержек — самое узкое место для импортёров мы закрываем сами." },
      { title: "Отгрузка от 14 дней", body: "Складские позиции комплектуем и отправляем в Армению от 14 дней. Логистика до Еревана и распределительных центров — под ключ." },
      { title: "Ваш канал сбыта", body: "Поставляем дистрибьюторам, аптечным сетям и продавцам маркетплейсов. Запускаем private label под ваш бренд для растущего рынка витаминов и спортпита в Армении." },
    ],
    formTitle: "Получите оптовый прайс с поставкой в Армению",
    formSubtitle: "Оставьте заявку — пришлём прайс, ассортимент и условия под ваш объём. Работаем с заказами от $5 000; розничные обращения не обрабатываем.",
    metaTitle: "Витамины и спортпит оптом — поставки в Армению",
    metaDescription: "Опт витаминов, БАД и спортпита в Армению от $5 000. Заводы США и ЕС напрямую, цены до −35%, досье ЕАЭС, отгрузка от 14 дней. Розницу не обслуживаем.",
  },
  mn: {
    heroEyebrow: "B2B · Только опт · от $5 000",
    heroTitle: "Витамины и спортпит оптом —",
    heroAccent: "поставки в Монголию",
    heroSubtitle:
      "Напрямую с заводов США и ЕС в Монголию, без посредников. Готовое досье под регистрацию БАД, отгрузка от 14 дней, логистика до Улан-Батора. Работаем только с оптом от $5 000 — розницу не обслуживаем.",
    ctaPrimary: "Получить B2B-прайс",
    triage: ["Только B2B", "Опт от $5 000", "Розницу не обслуживаем"],
    valueProps: [
      { title: "Прямые контракты US & EU", body: "Закупаем напрямую на заводах Америки и Европы, без посредников и наценок. Цена ниже рынка до −35%." },
      { title: "Регистрация под Монголию", body: "Готовое досье, GMP и сертификаты под требования Минздрава Монголии к БАД. Проведём регистрацию и растаможку — на рынок, где 70% фармы это импорт." },
      { title: "Дистрибьюторам и аптекам", body: "Работаем с сетями и импортёрами уровня Monos, Mongolimpex, Monopharma, с маркетплейсами Emonos и Shoppy, а также под private label." },
      { title: "Отгрузка от 14 дней", body: "Логистика до Улан-Батора и по стране. Регулярные поставки и контейнерные объёмы FCL/LCL под растущий спрос на витамины и спортпит." },
    ],
    formTitle: "Получите прайс под Монголию за 1 рабочий день",
    formSubtitle: "Ответьте на пару вопросов — пришлём актуальный B2B-прайс и рассчитаем логистику до Улан-Батора.",
    metaTitle: "Витамины и спортпит оптом в Монголию — KIQ Labs",
    metaDescription: "B2B-дистрибуция витаминов, БАДов и спортпита из США и ЕС в Монголию. Только опт от $5 000. Прямые контракты, регистрация БАД, логистика до Улан-Батора.",
  },
  ae: {
    heroEyebrow: "Wholesale only — minimum order from $5,000. Retail not served.",
    heroTitle: "Vitamins, supplements and sports nutrition wholesale —",
    heroAccent: "direct supply to the UAE",
    heroSubtitle:
      "We contract US and EU factories directly and ship wholesale into Dubai — no middlemen, prices up to 35% below market. Minimum order from $5,000. For distributors, pharmacy chains, marketplaces and private label only. We do not sell retail.",
    ctaPrimary: "Request wholesale price list",
    triage: ["Wholesale from $5,000", "US & EU factory-direct", "No retail"],
    valueProps: [
      { title: "Factory-direct pricing", body: "Direct contracts with vitamin, supplement and sports-nutrition plants in the USA and EU. You buy at the source and land in the UAE up to 35% below current market." },
      { title: "UAE-ready dossier", body: "Full documentation tuned for the UAE: free sale and GMP certificates, halal marks and label compliance ready for MOHAP and the Dubai Municipality Montaji portal. Registration made simple." },
      { title: "Dispatch from 14 days", body: "Stocked SKUs and factory contracts mean we ship in as little as 14 days, with logistics routed straight into Dubai and clean customs paperwork." },
      { title: "Built for your channel", body: "We supply distributors, pharmacy chains and marketplaces, and run private label on the UAE's fastest-growing supplement and sports-nutrition segments — from Vitamin D to whey and amino acids." },
    ],
    formTitle: "Get your UAE wholesale quote",
    formSubtitle: "Tell us your channel and volume. We reply with a factory-direct price list, lead times and the certification path for the UAE. Wholesale orders from $5,000 only.",
    metaTitle: "Supplements Wholesale UAE — US & EU Factory Direct",
    metaDescription: "Vitamins, supplements and sports nutrition wholesale to the UAE. US & EU factory-direct, up to 35% below market, UAE-ready dossier, dispatch from 14 days. From $5,000.",
  },
};

export const regions: Region[] = BASE.map((r) => ({
  ...r,
  content: { ...defaultContent(r), ...(CONTENT_OVERRIDES[r.slug] ?? {}) },
}));

export const regionSlugs = regions.map((r) => r.slug);

export function getRegion(slug: string): Region | undefined {
  return regions.find((r) => r.slug === slug);
}
