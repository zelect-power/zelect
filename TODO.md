# TODO — Zelect

> **Канонический трекер задач — Linear:**
> https://linear.app/kdpbot/project/zelect-1c3bca96288e/overview
>
> Этот файл — краткая синхронная копия для быстрого обзора. Статусы и детали
> смотреть в Linear (team ICECAT, issues ICECAT-320 … ICECAT-364).

Статусы: ⬜ todo · 🟡 in-progress · ✅ done · ❌ cancelled · 🔴 blocked

## Этап 0: Превью дизайн-прототипа (pre-stage)

- ✅ Прочитать `AGENT.md` и `TZ.md` целиком
- ✅ Распаковать `zelect-handoff.zip`, прочитать handoff README и `Zelect Power Site.html`
- ✅ Поднять статический сервер на порту 3777
- ✅ Запустить под PM2 (`zelect-site`)
- ✅ Создать `CLAUDE.md`, `README.md`, `PROGRESS.md`, `TODO.md`, `DECISIONS.md`

## Этап 1: Подготовка

- ⬜ Инициализировать Next.js 15 (App Router, TypeScript, Tailwind) в `apps/web/`
- ⬜ Настроить shadcn/ui, базовую тему (light/dark/system) с переключателем
- ⬜ Перенести дизайн-токены из `public/src/tokens.jsx` в Tailwind config / CSS vars
- ⬜ Собрать layout (header + footer) на основе `public/src/nav.jsx`
- ⬜ Спроектировать структуру коллекций Payload (схема полей, связи)
- ⬜ Выбрать i18n-библиотеку (фиксация в `DECISIONS.md` как ADR-002)

## Этап 2: CMS и инфраструктура

- ⬜ Установить Payload CMS 3
- ⬜ Подключить PostgreSQL (локально + credentials в `.env.example`)
- ⬜ Создать коллекции с `localized: true` там, где нужен мультиязычный контент:
  - ⬜ `Categories` (иерархия до 2 уровней)
  - ⬜ `Products` (+ скрытые admin-only поля `price`, `currency`, `stock`, `minOrderQty`)
  - ⬜ `Services`
  - ⬜ `News`
  - ⬜ `Pages` (статичные)
  - ⬜ `Media` (изображения + PDF-документы)
  - ⬜ `Users` (+ роли admin/editor)
  - ⬜ `Settings` (global)
  - ⬜ `Submissions` (заявки с форм)
- ⬜ Настроить Lexical rich-text editor для описаний
- ⬜ SEO-поля (`title`, `description`, `og:image`) на каждой сущности
- ⬜ Защита админки (сильный пароль, rate limiting)

## Этап 3: Фронтенд

- ⬜ Главная `/` (hero, продукты, статы, услуги, преимущества, кейсы, поддержка, сертификаты, новости, CTA)
- ⬜ Каталог `/produkty`
- ⬜ Категория `/produkty/[category]`
- ⬜ Товар `/produkty/[category]/[product]` — галерея, характеристики, PDF, кнопка «Запит ціни»
- ⬜ Услуги `/poslugy` + `/poslugy/[slug]`
- ⬜ Поддержка `/pidtrymka` (документация, FAQ, гарантия)
- ⬜ Новости `/novyny` + `/novyny/[slug]`
- ⬜ Контакты `/kontakty` (+ карта + форма)
- ⬜ 404 / политика конфиденциальности
- ⬜ Cookie-баннер
- ⬜ Переключатель темы без FOUC (через CSS `color-scheme` + `data-theme` атрибут + inline-skript)
- ⬜ Адаптивность (mobile-first), проверка на реальных устройствах
- ⬜ Формы «Запит КП» и контактная: honeypot + rate limiting, сохранение в `Submissions` + email

## Этап 4: Наполнение контентом

- ⬜ Импорт 10–15 категорий (с референса goodtransformer)
- ⬜ Наполнить 50–80 товаров (название, артикул, характеристики, заглушки изображений)
- ⬜ 5–8 услуг
- ⬜ 3–5 стартовых новостей
- ⬜ Статичные страницы (О компании, Контакты, Политика)

## Этап 5: Тестирование и запуск

- ⬜ Динамические meta-теги (title/description/OG) на всех страницах
- ⬜ Автогенерация `sitemap.xml`, `robots.txt`
- ⬜ GA4 — установка + базовые события
- ⬜ HTTPS (Let's Encrypt) + security headers (CSP, X-Frame-Options, HSTS)
- ⬜ PageSpeed Insights: mobile ≥ 80, desktop ≥ 90
- ⬜ Smoke-тест формы → email приходит, заявка в `Submissions`
- ⬜ Резервное копирование PostgreSQL (cron + pg_dump)
- ⬜ Переключить PM2 `zelect-site` с прототипа на Next.js-сборку, оставив порт 3777
- ⬜ Настроить nginx vhost для `zelect.com.ua` (reverse proxy на :3777)
- ⬜ Финальный проход по чек-листу из `AGENT.md` перед деплоем
