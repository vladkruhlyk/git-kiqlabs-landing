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
который пересылает её на ваш webhook. Meta Pixel отслеживает `PageView` и
событие `Lead` при отправке любой формы.

Настраивается через `.env.local`:

```bash
# Webhook для заявок (Make / Zapier / n8n / Google Apps Script → Google Sheets)
LEAD_WEBHOOK_URL=https://hook.eu2.make.com/xxxxxxxx

# Meta Pixel ID из Events Manager
NEXT_PUBLIC_FB_PIXEL_ID=1234567890123456
```

Если переменные пустые — сайт работает как раньше: пиксель не грузится,
заявка принимается и пишется в лог сервера (`[lead] {...}`), но не пересылается.

**На что приходит заявка (JSON):**

```jsonc
{
  "source": "contact",      // или "quiz"
  "name": "...",
  "company": "...",
  "email": "...",
  "phone": "...",           // в квизе — мессенджер-контакт
  "country": "AE",
  "inquiry": "...",         // только форма контактов
  "message": "...",         // только форма контактов
  "role": "distributor",    // только квиз
  "categories": "sports, vitamins", // только квиз
  "volume": "...",          // только квиз
  "locale": "ru",
  "page": "https://kiqlabs.global/quiz",
  "referrer": "...",
  "submittedAt": "2026-06-15T10:00:00.000Z",
  "userAgent": "...",
  "ip": "..."
}
```

Эти ключи можно один-в-один маппить на колонки Google Таблицы.

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
