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
который пересылает её на ваш **webhook** (Make / Zapier / n8n). Внутри payload
есть готовый объект `keycrm_data` — Make форвардит его в KeyCRM (создать карточку
в воронке), а остальные поля кладёт в Google Таблицу. Токен KeyCRM остаётся в
Make, на сайте его нет.

Meta Pixel отслеживает `PageView` и событие `Lead` (только после успешной
отправки заявки).

Настраивается через `.env.local` (на проде — переменные окружения хостинга):

```bash
# Webhook для заявок (Make / Zapier / n8n → Google Sheets + KeyCRM)
LEAD_WEBHOOK_URL=https://hook.eu2.make.com/xxxxxxxx

# id источника в KeyCRM — опц., попадёт в keycrm_data.source_id
KEYCRM_SOURCE_ID=3

# Meta Pixel ID из Events Manager
NEXT_PUBLIC_FB_PIXEL_ID=1234567890123456
```

Если `LEAD_WEBHOOK_URL` пуст — заявка принимается и пишется в лог сервера
(`[lead] {...}`), но не пересылается.

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
