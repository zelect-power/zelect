# NOTES — Zelect

## Runtime (VPS 144.91.95.134)

| PM2 процесс     | Порт  | Что      |
| --------------- | ----- | -------- |
| `zelect-site`   | 3777  | Легасі-прототип (static `public/`) |
| `zelect-next`   | 3778  | Next.js 16 + Payload 3 (dev-режим) |
| `zelect-reports`| 3779  | HTML test-report viewer (`test-reports/`) |

**URL для владельца:**

- http://144.91.95.134:3778/ — актуальный сайт
- http://144.91.95.134:3778/admin — Payload CMS (login: `allidevelop@gmail.com`)
- http://144.91.95.134:3777/ — прототип дизайна (легаси, чтобы можно было
  сверять пиксели)
- http://144.91.95.134:3779/ — test-report со скринами каждой итерации

## Workflow

```bash
# Быстрые проверки после любой правки (≤10 сек)
npm run check                    # prettier + eslint + tsc
npm run check:full               # + next build sanity (только перед мержем)

# Запись итерации в test-report
npm run record -- "описание" ICECAT-NNN       # +28 скринов
NO_SHOTS=1 npm run record -- "desc" ICECAT-N  # без скринов (бэкенд-правки)

# Responsive audit (4 viewport × 10 URL)
npm run audit:responsive

# Наполнить CMS fallback-данными (idempotent)
cd apps/web && npm run seed
```

## PostgreSQL

- База: `zelect_prod`, юзер `zelect`, host `127.0.0.1:5432`
- DSN: `DATABASE_URL` в `/home/developer/projects/zelect/.env.local`
  и `apps/web/.env.local` (дубликат для тулчейна Payload CLI)
- Ежедневный дамп: `scripts/zelect-backup.sh`, cron `5 3 * * *` UTC
  → `/home/developer/backups/zelect/`
- Ретеншн: 7 daily + 4 weekly (воскресные снимки с суффиксом `.weekly`)

**Восстановление из дампа:**
```bash
gunzip -c /home/developer/backups/zelect/zelect_<ts>.sql.gz | \
  PGPASSWORD=... psql -h 127.0.0.1 -U zelect -d zelect_prod
```

## Payload CMS

- Config: `apps/web/payload.config.ts`
- Коллекции: `Users`, `Categories`, `Products`, `Services`, `News`,
  `Pages`, `Media`, `Submissions`
- Global: `Settings`
- ImportMap: `app/(payload)/admin/importMap.js` (автогенерация
  `npx payload generate:importmap`)
- Types: `payload-types.ts` (автогенерация `npx payload generate:types`)

Первая миграция происходит автоматически при первом запросе к админке
(Payload push schema). 32 таблицы (данные + `_locales` sidecar).

## Что ждём от владельца

- **Реальные логотипы** в SVG (исходники). Сейчас используем inline
  ZPMark из прототипа.
- **SMTP credentials** для отправки заявок (ICECAT-346). Варианты: свой
  SMTP сервер, Gmail App Password, Resend. Пока форма сохраняет в
  `Submissions` без email-уведомлений.
- **DNS + SSL** для `zelect.com.ua` → 144.91.95.134 (ICECAT-362).
- **GA4 Measurement ID** (`NEXT_PUBLIC_GA_ID`) — подключится через
  cookie-consent (ICECAT-357 уже готов, нужен только ID).
- **Юридические реквизиты** (ЄДРПОУ, полное наименование, адрес) для
  футера и политики конфиденциальности.

## Финальный чек-лист (ICECAT-364)

- [x] Все страницы из TZ реализованы (13 Next-роутов + /admin)
- [x] Обе темы (светлая / тёмная) корректно на всех страницах
- [x] Переключатель темы без FOUC (inline-скрипт в `<head>`)
- [x] Форма «Запит КП» → `Submissions` в БД + honeypot + rate-limit
- [ ] Форма → email админу (ждём SMTP credentials)
- [x] `sitemap.xml` + `robots.txt` генерируются (40 URL)
- [x] Мета-теги (title, description, OG, Twitter) настроены
- [x] JSON-LD Organization + Product + NewsArticle schemas
- [x] GA4 wrapper (gated по cookie consent)
- [x] Cookie-баннер работает (localStorage `zp-cookie-consent`)
- [x] Адаптивность mobile-first (40/40 audit checks)
- [x] Payload админка защищена (password policy ≥12, lockout 5/10min)
- [x] Резервное копирование БД (cron + pg_dump)
- [ ] HTTPS + security headers (nginx vhost + Let's Encrypt) — ICECAT-359/362
- [ ] PageSpeed mobile ≥ 80, desktop ≥ 90 — проверка после nginx/prod
- [ ] Smoke-тест формы (email + Submission)— после SMTP
- [ ] Переключение PM2 на прод-слот :3777 — ICECAT-363

**Итого:** 12/16 пунктов готовы. Оставшиеся 4 требуют внешних
credentials/доступа от владельца.
