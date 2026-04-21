# DECISIONS — архитектурный журнал Zelect

## [ADR-001] Сервировать дизайн-прототип как статическое превью до старта Next.js

**Дата:** 2026-04-21
**Статус:** принято

**Контекст:**
Заказчик попросил «развернуть проект на порту 3777». В корне лежит
`zelect-handoff.zip` из claude.ai/design — это React/Babel-прототип, который,
согласно `zelect/README.md` внутри архива, НЕ предназначен для прод-использования,
а служит источником пиксель-перфект референса для будущей реализации на
Next.js + Payload (по `TZ.md`).

Полная реализация (Этапы 1–5 из TZ) — многонедельная работа. До её завершения
заказчик хочет видеть дизайн живьём в браузере.

**Варианты:**

1. Сразу стартовать Next.js-реализацию, на :3777 поднять `next dev` или
   временный ssr-заглушку. Минус: пустая страница / лишняя работа, прототип
   игнорируется.
2. Развернуть прототип статикой на :3777 через Node + `serve-handler` под
   PM2, параллельно вести разработку Next.js, потом переключить PM2.
3. Использовать nginx `root` + готовый статический vhost, без Node-сервера.
   Минус: отличается от паттернов других сервисов на этом VPS (все под PM2
   с Node-апп).

**Решение:**
Вариант 2. Прототип раздаётся как есть (React + Babel standalone из CDN —
именно так его сделали в claude.ai/design). Это даёт немедленный результат
на :3777 с нулевым риском, а PM2-слот `zelect-site` позже переиспользуется
для Next.js-сборки (достаточно обновить `script`/`cwd`).

**Последствия:**
- Прототип требует интернет-соединения у посетителя (React/Babel с unpkg),
  но это приемлемо для внутреннего превью.
- Серверный рендеринг, SEO-теги, формы — не работают в прототипе; это
  осознанный trade-off, ожидаемый для handoff.
- Имя PM2 `zelect-site` и порт 3777 зафиксированы — не меняем при переходе
  на Next.js, чтобы не трогать потенциальный nginx-vhost.

---

## [ADR-002] Хостинг БД: локальный PostgreSQL на VPS 144.91.95.134

**Дата:** 2026-04-21
**Статус:** принято (v1)

**Контекст:**
TZ §7 допускает любой PostgreSQL. На VPS уже работает `postgresql-16` под
управлением systemd с несколькими БД других проектов (automycka, icecatstudio,
medusa_clmerch и др.) — инфраструктура проверена, бэкапы будем добавлять
по аналогии.

**Варианты:**
1. Локальный PostgreSQL на том же VPS (сейчас) — 0 USD/мес, минимальная
   латентность, admin-контроль.
2. Neon (serverless Postgres, MCP уже подключён) — masked for scale, free tier
   до 0.5 GB, но дополнительная сетевая латентность.
3. Supabase / Railway — managed, похоже на Neon, ~10–25 USD/мес на старте.

**Решение:**
Вариант 1 — локальный PostgreSQL. Бюджет проекта 500 USD, нет причин вводить
внешнюю зависимость для начального этапа. При росте нагрузки всегда можно
мигрировать на Neon через `pg_dump/pg_restore` (DSN в `.env`, больше ничего
менять не надо).

**Действия (выполнено):**
- `CREATE USER zelect WITH PASSWORD <generated>;`
- `CREATE DATABASE zelect_prod OWNER zelect;`
- DSN в `.env.local` (в `.gitignore`).
- `.env.example` с плейсхолдером закоммичен.

**Последствия:**
- Бэкапы (ICECAT-361) — через `pg_dump` + cron, по той же схеме, что и
  соседние БД на этом VPS.
- При переезде на другой хостинг — менять только `DATABASE_URL` и перегонять
  dump. Payload не знает о физическом расположении.

---

## [ADR-003] SPA-роутинг в прототипе через History API

**Дата:** 2026-04-21
**Статус:** принято (временно, на период до Next.js)

**Контекст:**
В исходном прототипе из handoff-архива навигация между страницами хранилась
только в React-state + `localStorage`. URL в адресной строке не менялся при
переключении между разделами, что:
- мешает тестировать («поделиться ссылкой на страницу каталога» невозможно),
- даёт плохой UX на реальных устройствах (кнопка «Назад» работает неочевидно),
- усложнит последующую миграцию в Next.js (все ссылки надо переписывать).

**Решение:**
Добавить в `public/src/app.jsx` тонкий слой роутинга через `history.pushState`
и `popstate`. Карта URL ↔ page зафиксирована сразу в том виде, в котором она
пойдёт в Next.js App Router (TZ.md §3):

| Page key | Path        |
|----------|-------------|
| home     | `/`         |
| products | `/produkty` |
| services | `/poslugy`  |
| support  | `/pidtrymka`|
| news     | `/novyny`   |
| contacts | `/kontakty` |

На сервере (`server.js`) для всех этих путей и их дочерних (`/produkty/:slug`)
добавлен SPA-фоллбэк — `serve-handler rewrites` возвращают `index.html`.

**Последствия:**
- При переходе в Next.js App Router файловая структура роутинга **уже
  согласована** с текущими URL — не нужно редиректы и 301 на
  старые пути.
- Пока живёт прототип, SSR SEO всё равно нет (React рендерится на клиенте),
  но URL-структура корректна и стабильна.

---

## [ADR-004] i18n: отложить next-intl, держать архитектурную готовность

**Дата:** 2026-04-21
**Статус:** принято (v1)

**Контекст:**
TZ §4.4 требует архитектурной готовности к мультиязычности (uk обязательно
в v1, ru/en/pl — потенциально потом). При этом v1 активирует **только uk** —
устанавливать полноценную i18n-библиотеку прямо сейчас значит тащить зависимость
без пользователей.

**Варианты:**
1. Установить `next-intl` сразу, подготовить ICU-словари, использовать везде.
2. Отложить установку, но держать все UI-строки структурированно (константы в
   `components/*/nav-data.ts` и т.п.), чтобы при подключении `next-intl`
   можно было механически вытащить их в словари.
3. Пользоваться встроенной i18n Payload (`localized: true` на полях) и
   ничего не ставить на фронте.

**Решение:**
Вариант 2. Фронт пишем на жёстком украинском, но **все UI-строки живут в
константах** (`nav-data.ts`, `lib/*`), а не захардкожены в JSX — это делает
будущее подключение `next-intl` механическим (замена константы на `t('key')`).

Когда владелец активирует второй язык — выберем `next-intl` (App Router-first,
активно поддерживается), добавим префикс локали в URL (`/uk/produkty`,
`/ru/produkty`), плюс Payload по-прежнему отдаёт локализованный контент
через `localized: true`.

**Последствия:**
- Сейчас на странице нет полей `lang`-переключателя; `LangPill` из прототипа
  в Next.js-layout пока не переносим.
- Экономия ~50 KB JS + один меньше источник ошибок при деплое.
- URL-структура v1: без префикса локали, `/` = uk. При добавлении `ru` —
  переводим все маршруты под `/uk/*` и `/ru/*` редиректами.

---

## [ADR-005] Детальная схема коллекций Payload

**Дата:** 2026-04-21
**Статус:** принято (проект, до установки Payload — ICECAT-333)

**Контекст:**
TZ §4.2 перечисляет 9 коллекций/global'ов. Перед тем как писать `payload.config.ts`
и миграции, фиксируем ключевые поля и правила доступа. Это минимизирует переделку
схемы после первых загрузок контента.

**Принципы:**
- **Все контентные тексты с `localized: true`** — uk-только в v1, но готовность к ru/en/pl
  (см. ADR-004).
- **Roles**: `admin` (полный доступ) vs `editor` (контент r/w, Settings read-only,
  Submissions r/w — чтобы ответить клиенту).
- **Slug**: auto-generate из `title`, но редактируемый. Unique в пределах коллекции.
- **SEO-поля** выносим в общий field-group `seo`:
  `seoTitle` (optional, fallback на `title`), `seoDescription`, `ogImage` (rel → Media).

### Collections

| Коллекция | Ключевые поля | Особенности |
|---|---|---|
| **Users** | email, name, role (`admin`\|`editor`), auth | Auth-коллекция, email-unique |
| **Categories** | title, slug, description, parent (rel self, ≤1 глубина), order, image (rel Media), seo | Валидация: parent.parent === null (max 2 уровня) |
| **Products** | title, slug, article (unique), category (rel, required), gallery (array→Media), description (richText), specs (array `{label, value}`), documents (array→Media PDF), featured (bool), seo **+ hidden admin-only:** `price`, `currency` (UAH\|USD\|EUR), `stock` (in_stock\|to_order\|out_of_stock), `minOrderQty` | TZ §4.5 — задел под корзину |
| **Services** | title, slug, icon (select), summary, description, bullets (array localized), order, image, seo | icon-select ограничен набором из прототипа |
| **News** | title, slug, category (select), publishedAt, excerpt, body, coverImage, author (rel Users), status (draft\|published), seo | Публичный API: `status=published && publishedAt ≤ now` |
| **Pages** | title, slug, body, status, seo | Для «О компании», «Політика», «404» и пр. |
| **Media** | alt (localized required), caption, file | image/*, application/pdf. Resize: thumb 400 / card 800 / hero 1600 / og 1200×630. Output WebP |
| **Submissions** | type (quote\|contact\|product_inquiry), fullName, company, phone, email, message, productRef (rel Products), source (url), ipHash, status (new\|contacted\|closed), createdAt | UI read-only (создаётся только через public API). Hook → email admin |

### Globals

| Global | Поля |
|---|---|
| **Settings** | companyName, legalName, vatNumber, contacts { phone, email, emailTender, emailService, address }, offices (array), social { linkedin, facebook, youtube, telegram }, defaultSeo, hotline |

### Access (черновик)

- `admin` — `create/read/update/delete` на всё.
- `editor` — `create/read/update` на Products, Categories, Services, News, Pages,
  Media; `read/update` на Submissions; `read` на Settings, Users.
- Публичный API (`depth=2`, без авторизации) — только published-контент, Settings,
  Media; **POST /api/submissions** — создание заявок (с honeypot + rate-limit).

**Последствия:**
- В `ICECAT-327..337` реализация идёт строго по этой таблице.
- Когда понадобится корзина — достаточно "показать" hidden-поля Products в UI
  и на фронте; схема уже готова.
- Переименование полей после первых загрузок контента будет дороже — поэтому
  фиксируем сейчас.

---

*Следующие ADR: стратегия миграции дизайн-токенов в Tailwind (ADR-006, если
потребуется), хостинг media (локально vs S3, ADR-007), выбор SMTP/Resend
для Submissions (ADR-008).*
