# Progress — Zelect

## Текущий статус

- **Этап:** Pre-stage завершён → переход к Этапу 1
- **Прогресс Этапа 1:** 0% (в работе ICECAT-320 — Next.js scaffold)
- **Следующий шаг:** Начать инициализацию Next.js 15 (App Router + TS +
  Tailwind) в `apps/web/` с прицелом на интеграцию Payload CMS 3
  (ICECAT-320 → ICECAT-325).

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
