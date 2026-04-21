# Progress — Zelect

## Текущий статус

- **Этап:** Этап 1 — Подготовка завершён → переход к Этапу 2
- **Прогресс Этапа 1:** 100% (6/6 задач закрыто)
- **Следующий шаг:** Этап 2 — установить Payload CMS 3 (ICECAT-333),
  подключить созданную БД `zelect_prod` (ICECAT-326), реализовать
  9 коллекций по схеме ADR-005 (ICECAT-335, 327, 328, 334, 336, 337, 329,
  330, 331), защита админки (ICECAT-332).

## Сделано

- [2026-04-21] Распакован handoff-архив `zelect-handoff.zip` (из claude.ai/design)
  в `public/`. Прочитан `README.md` архива и `Zelect Power Site.html` с
  импортами `src/tokens.jsx`, `icons.jsx`, `ui.jsx`, `nav.jsx`, `home.jsx`,
  `pages.jsx`, `app.jsx`.
- [2026-04-21] Создан статический сервер `server.js` (Node 22 + `serve-handler`),
  конфиг PM2 `ecosystem.config.js`, `package.json` с зависимостью
  `serve-handler@^6.1.6`.
- [2026-04-21] Прототип поднят под PM2 как `zelect-site` на `http://127.0.0.1:3777/`,
  затем переключён на `0.0.0.0:3777` для доступа по http://144.91.95.134:3777/.
  Smoke-тесты прошли.
- [2026-04-21] Созданы обязательные файлы проекта по `AGENT.md`:
  `CLAUDE.md`, `README.md`, `PROGRESS.md`, `TODO.md`, `DECISIONS.md`.
- [2026-04-21] Инициализирован git-репозиторий, настроен remote на
  https://github.com/allidevelop/zelect. Default branch — `main`.
- [2026-04-21] Заселён Linear-проект (team ICECAT): 5 milestones + 35 задач
  (ICECAT-320 … ICECAT-364) по этапам TZ §8.
- [2026-04-21] Добавлен SPA-роутинг по URL в прототипе (History API):
  `/`, `/produkty`, `/poslugy`, `/pidtrymka`, `/novyny`, `/kontakty` — URL
  меняется при навигации, кнопка «Назад» браузера работает корректно. На
  сервере SPA-фоллбэк через `serve-handler rewrites`. Решение — ADR-003.
- [2026-04-21] Создан локальный PostgreSQL: пользователь `zelect`, БД
  `zelect_prod` на 127.0.0.1:5432. DSN лежит в `.env.local` (gitignored),
  плейсхолдер — в `.env.example`. Решение — ADR-002.
- [2026-04-21] **Этап 1 — Подготовка**: закрыты все 6 задач.
  - ICECAT-320 — Next.js 16.2.4 + React 19 + TS strict + Tailwind 4 в
    `apps/web/`, Prettier, Turbopack (`turbopack.root` зафиксирован).
  - ICECAT-322 — дизайн-токены Zelect (emerald/ink, градиент, шрифты,
    радиусы, шадоу) перенесены в `globals.css` (@theme + @custom-variant dark)
    + семантические CSS vars для переключения light/dark.
  - ICECAT-321 — `ThemeProvider` + `ThemeToggle` (light/dark/system),
    anti-FOUC inline-скрипт в `<head>` читает localStorage +
    prefers-color-scheme ДО гидратации. Решение отложить shadcn/ui до
    первой реальной потребности (формы — ICECAT-346).
  - ICECAT-323 — глобальный `(main)/layout.tsx` с `Topbar` (sticky +
    backdrop-blur + мобильное меню) и `Footer` (4 колонки + соцсети).
    Компоненты логотипа `ZPMark`/`ZPLogo` перенесены как React-компоненты.
  - ICECAT-325 — i18n (ADR-004): отложили установку `next-intl` до
    реальной активации второго языка; сейчас все UI-строки живут
    структурированно в `components/layout/nav-data.ts` (готовы к
    механической замене на `t('key')`).
  - ICECAT-324 — схема коллекций Payload (ADR-005): детальные поля всех
    9 коллекций + правила доступа `admin`/`editor` + rules публичного API.
  - Next.js развёрнут под PM2 как `zelect-next` на порту 3778 (прототип
    держит 3777 до ICECAT-363). Доступен: http://144.91.95.134:3778/

## В работе

Ничего активного. Ожидание старта Этапа 1.

## Блокеры / вопросы к владельцу

- **Контент:** нужны реальные логотипы Zelect в SVG с исходниками (сейчас в
  `public/uploads/` лежат предоставленные варианты, но часть с поломанной
  кириллицей в названиях файлов).
- **Email для приёма заявок с форм** (SMTP хост/логин или Resend API key) —
  нужен к Этапу 3 (ICECAT-346).
- **Домен/DNS/nginx:** когда готов вывод на `zelect.com.ua` — нужен доступ
  к DNS-записям и согласование vhost (ICECAT-362).
- **Юридические реквизиты компании** для футера и политики конфиденциальности.
- **Тексты «О компании»**, тексты описаний услуг — TZ §6 говорит, что
  предоставляются заказчиком.

## Метрики

- Коллекций Payload: 0 из 9 (Categories, Products, Services, News, Pages,
  Media, Users, Settings, Submissions — создание на Этапе 2).
- Страниц Next.js реализовано: 0 из 8.
- Превью-прототип: **развёрнут на :3777**.
