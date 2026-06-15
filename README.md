# KIQ Labs Global — Landing

Modern landing for KIQ Labs Global, an international B2B distributor of vitamins and dietary supplements.

## Stack

- **Next.js 15** (App Router, React 19)
- **TypeScript**
- **Tailwind CSS v4** (CSS-first config via `@theme`)
- **Motion** (formerly Framer Motion) — animations
- **Lenis** — smooth scroll
- **Lucide React** — icons
- **Fraunces** (variable serif) · **Geist** · **JetBrains Mono** — typography

## Run

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Заявки (webhook) и Meta Pixel

Формы (контакты + квиз) шлют заявку на серверный роут `app/api/lead/route.ts`,
который **параллельно** доставляет её во все настроенные получатели:
1. напрямую в **KeyCRM** (создаёт карточку в воронке) — если задан `KEYCRM_API_TOKEN`;
2. на **webhook** (Make / Zapier / n8n → Google Sheets) — если задан `LEAD_WEBHOOK_URL`.

Доставки независимы. Meta Pixel отслеживает `PageView` и событие `Lead` (только
после успешной доставки хотя бы в один получатель). Токен KeyCRM — только на
сервере (без `NEXT_PUBLIC_`), в браузер не попадает.

Настраивается через `.env.local` (на проде — переменные окружения хостинга):

```bash
# KeyCRM — прямое создание карточек. Токен СЕКРЕТНЫЙ (без NEXT_PUBLIC_).
KEYCRM_API_TOKEN=xxxxxxxx
KEYCRM_PIPELINE_ID=1     # опц.: id воронки (по умолчанию — первая)
KEYCRM_SOURCE_ID=3       # опц.: id источника
# KEYCRM_API_URL=...     # опц.: переопределить эндпоинт (для тестов)

# Webhook для Google Sheets (опц.)
LEAD_WEBHOOK_URL=https://hook.eu2.make.com/xxxxxxxx

# Meta Pixel ID из Events Manager
NEXT_PUBLIC_FB_PIXEL_ID=1234567890123456
```

Если ничего не задано — заявка принимается и пишется в лог сервера
(`[lead] {...}`), но никуда не отправляется. Поле `keycrm_data` всё равно есть
в payload вебхука — на случай, если KeyCRM настраивается через Make.

**Что уходит на webhook (JSON):**

```jsonc
{
  "source": "contact",      // или "quiz"
  "name": "...",
  "company": "...",
  "email": "...",
  "phone": "...",           // в квизе — мессенджер-контакт
  "country": "🇰🇿 Казахстан",
  "inquiry": "...",         // только форма контактов
  "message": "...",         // только форма контактов
  "role": "Дистрибьютор / оптовик", // только квиз
  "categories": "Спортивное питание", // только квиз
  "volume": "...",          // только квиз
  "locale": "ru",
  "page": "https://kiqlabs.global/quiz",
  // Готовая карточка для KeyCRM (Make форвардит её в /v1/pipelines/cards):
  "keycrm_data": {
    "title": "Заявка от Иван",
    "source_id": 3,                 // если задан KEYCRM_SOURCE_ID
    "manager_comment": "Компания: …\nTelegram/Телефон: …\nТип бизнеса: …\n…",
    "contact": { "full_name": "Иван", "email": "...", "phone": "..." }
  },
  "submittedAt": "2026-06-15T10:00:00.000Z",
  "userAgent": "...",
  "ip": "..."
}
```

Плоские поля (name, email, country …) удобно класть в Google Таблицу, а
`keycrm_data` — целиком в тело HTTP-запроса к KeyCRM в Make.

## Project structure

```
app/
  layout.tsx        # fonts, metadata, Lenis provider
  page.tsx          # section composition
  globals.css       # Tailwind v4 theme + design tokens
components/
  ui/
    media-placeholder.tsx
    lenis-provider.tsx
  sections/
    navigation.tsx
    hero.tsx
    about.tsx
    services.tsx
    brands.tsx
    markets.tsx
    advantages.tsx
    contact.tsx
    footer.tsx
lib/
  utils.ts
public/
  media/            # drop replacement media here
```

## Media placeholders

Visual slots use `<MediaPlaceholder />`. Replace any of them with `<Image />` from `next/image` once final assets are dropped into `public/media/`.

Example replacement:

```tsx
import Image from "next/image";

<Image
  src="/media/hero-a.jpg"
  alt="Lab scene"
  fill
  className="object-cover"
/>
```

## Design tokens

All colors and font tokens live in `app/globals.css` under `@theme`. Edit values there and they propagate site-wide.
