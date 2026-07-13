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

Формы (контакты + квиз + гео-лендинги) шлют заявку на серверный роут
`app/api/lead/route.ts`, который **параллельно** доставляет её во все настроенные
получатели (каждый включается только своей env-переменной):
1. напрямую в **KeyCRM** — создаёт карточку в воронке (`KEYCRM_API_TOKEN`);
2. **уведомление о событии** через `lib/notify` — напрямую в **Telegram**
   (`TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`), в **Google Sheets** через Apps
   Script (`GOOGLE_SHEETS_WEBHOOK_URL`) и в любой **доп. вебхук**
   (`GENERIC_WEBHOOK_URL`);
3. legacy **Make-вебхук** (`LEAD_WEBHOOK_URL`) — форвардит всю заявку + `keycrm_data`.

Доставки независимы (`Promise.allSettled`), падение одной не влияет на другие и
не ломает ответ. Meta Pixel шлёт `PageView` и `Lead` (после успешной доставки).
Секреты — только на сервере (без `NEXT_PUBLIC_`).

Настраивается через `.env.local` (на проде — переменные окружения хостинга):

```bash
# KeyCRM — прямое создание карточек. Токен СЕКРЕТНЫЙ.
KEYCRM_API_TOKEN=xxxxxxxx
KEYCRM_PIPELINE_ID=1     # опц.: id воронки (по умолчанию — первая)
KEYCRM_SOURCE_ID=3       # опц.: id источника

# Уведомления в Telegram (напрямую, официальный Bot API)
TELEGRAM_BOT_TOKEN=123456:AA...
TELEGRAM_CHAT_ID=-1001234567890    # супергруппа/канал: формат -100…
NOTIFY_TIMEZONE=Europe/Kyiv        # часовой пояс метки времени

GOOGLE_SHEETS_WEBHOOK_URL=         # опц.: Apps Script Web App → Sheets
GENERIC_WEBHOOK_URL=               # опц.: любой доп. вебхук
LEAD_WEBHOOK_URL=                  # опц.: legacy Make-вебхук

# Meta Pixel ID из Events Manager
NEXT_PUBLIC_FB_PIXEL_ID=1234567890123456
```

### Уведомления `lib/notify`

Универсальный модуль: `notify(eventTitle, fields, opts?)` — `fields` это
произвольные пары «подпись → значение». Fire-and-forget, никогда не бросает
исключений, таймаут 5с на запрос, дедуп по `opts.eventId`. Вызывается на сервере
в момент реального события (`after()` в роуте — после ответа). Для новых событий
(заказ, оплата) — просто вызвать `notify()` с другими `eventTitle`/`fields`.

**Как получить `TELEGRAM_CHAT_ID`:** создайте бота у `@BotFather`, добавьте его
в группу (для канала — сделайте админом). Затем либо напишите боту/в группу и
откройте `https://api.telegram.org/bot<TOKEN>/getUpdates` — в ответе будет
`chat.id`; либо добавьте в чат `@getidsbot`. У супергрупп/каналов id
отрицательный, формата `-100…`. Бот обязан быть участником группы (или админом
канала), иначе Telegram вернёт 403.

**Google Sheets через Apps Script** (без Make): в таблице *Расширения → Apps
Script* вставьте и опубликуйте как Web App («Все, у кого есть ссылка»), URL →
`GOOGLE_SHEETS_WEBHOOK_URL`. Заголовки листа: `Время | Событие | …поля`.

```js
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  SpreadsheetApp.getActiveSheet().appendRow(data.row);
  return ContentService.createTextOutput("ok");
}
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
