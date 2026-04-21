# CLAUDE.md — Zelect Power Technology

Ориентир для любой будущей сессии Claude в этом репозитории.

## 🇷🇺 Язык общения

**Владелец проекта (allidevelop@gmail.com) общается на русском языке.** Всегда
отвечай ему по-русски, независимо от языка кода, комментариев или UI-текстов
сайта (которые украинские — это нормально). Это правило применяется ко всем
сессиям Claude в этом репозитории.

## 🐙 Git

Репозиторий: **https://github.com/allidevelop/zelect**
Все значимые итерации коммитим и пушим в `main`.

## 📋 Linear

Задачи проекта: **https://linear.app/kdpbot/project/zelect-1c3bca96288e/overview**

- Team: `ICECAT`
- 5 milestones по этапам из `TZ.md` §8
- Задачи на начало работы (ICECAT-320 … ICECAT-364) — детальные описания со ссылками на файлы прототипа и поля коллекций Payload
- При старте задачи — перевод в `In Progress`, при завершении — `Done`
- Ветки Git называть как предложено Linear: `allidevelop/icecat-NNN-...` — это связывает PR с issue автоматически

## Что это за проект

Корпоративный сайт-каталог **Zelect Power Technology** (производитель силовых
трансформаторов и электрооборудования). Домен: `zelect.com.ua`. Техническое
задание — `TZ.md` (Next.js 15 + Payload CMS 3 + PostgreSQL, бюджет 500 USD).

Инструкция разработчику-агенту — `AGENT.md` (обязательная к чтению).

## Текущее состояние

Деплоен **дизайн-прототип** (React + Babel standalone из handoff-архива
claude.ai/design) на этом VPS:

- **URL:** `http://127.0.0.1:3777/` (bind loopback; наружу выставляется
  через nginx при необходимости)
- **PM2 process:** `zelect-site` (id 45)
- **Serve root:** `/home/developer/projects/zelect/public/`
- **Entry:** `public/index.html` (копия `Zelect Power Site.html`)
- **Tech:** Node.js 22 + `serve-handler` (статика), без сборки

Продакшн-стек (Next.js + Payload + PostgreSQL) из `TZ.md` ещё **не начат**.
Прототип — временное превью для демонстрации дизайна заказчику, пока идёт
полная реализация.

## Обязательные файлы (см. AGENT.md §1)

- `TZ.md` — техническое задание (не менять без согласования)
- `AGENT.md` — регламент работы агента
- `PROGRESS.md` — журнал прогресса (обновлять после каждой значимой итерации)
- `TODO.md` — задачник по этапам из TZ
- `DECISIONS.md` — ADR-журнал архитектурных решений
- `README.md` — точка входа (как запустить)

## Запуск / управление

```bash
# Локальный запуск
cd /home/developer/projects/zelect
npm install
npm start                      # http://127.0.0.1:3777

# PM2
pm2 restart zelect-site
pm2 logs zelect-site --lines 50
pm2 stop zelect-site
```

## Структура

```
zelect/
├── TZ.md  AGENT.md  CLAUDE.md  README.md
├── PROGRESS.md  TODO.md  DECISIONS.md
├── package.json  server.js  ecosystem.config.js
├── zelect-handoff.zip          # бэкап исходного дизайн-архива
└── public/                     # сервится по :3777
    ├── index.html              # основная точка входа (копия Zelect Power Site.html)
    ├── Zelect Power Site.html
    ├── Zelect Power - Standalone.html
    ├── src/                    # React/JSX компоненты прототипа
    │   ├── app.jsx             # корневой роутер + тема
    │   ├── tokens.jsx          # дизайн-токены, темы, i18n
    │   ├── icons.jsx           # stroke-only SVG иконки
    │   ├── ui.jsx              # Section, Eyebrow, H2, Lead, Counter, GradText
    │   ├── nav.jsx             # ZPLogo, Topbar, Footer, CtaButton
    │   ├── home.jsx            # все блоки главной
    │   └── pages.jsx           # Products/Services/Support/News/Contacts
    ├── assets/                 # официальные логотипы (SVG)
    └── uploads/                # сырые варианты логотипа + JPG
```

## Что делать в следующих сессиях

1. **Этап 1 из TZ** — инициализировать Next.js 15 (App Router + TypeScript +
   Tailwind) в отдельной директории (напр. `apps/web/`), установить Payload
   CMS 3 + PostgreSQL, описать коллекции (`Categories`, `Products`, `Services`,
   `News`, `Pages`, `Media`, `Users`, `Settings`, `Submissions`). Переносить
   визуальные решения из `public/src/*.jsx` в компоненты Next.js, сохраняя
   токены и темы из `tokens.jsx`.
2. Когда Next.js готов к превью — перенаправить PM2 `zelect-site` на новый
   сервер (поменять `script` и `cwd` в `ecosystem.config.js`), сохраняя порт
   **3777**. Прототип при необходимости оставить в `public/legacy/` для
   сверки пиксель-в-пиксель.
3. Соблюдать регламент `AGENT.md`: каждую итерацию фиксировать в
   `PROGRESS.md`, архитектурные решения — в `DECISIONS.md`.

## Важные ограничения из TZ

- Язык v1 — **только украинский** (`uk`), но поля Payload должны быть
  `localized: true` для ru/en/pl в будущем.
- Скрытые поля `price`/`currency`/`stock`/`minOrderQty` в `Products` — admin
  only, готовность к корзине заложена на уровне данных.
- Защита форм — honeypot + rate limiting, **без reCAPTCHA**.
- PageSpeed: mobile ≥ 80, desktop ≥ 90.

## Контакты/ссылки

- Референс дизайна: ajax.systems/ua
- Референс контента: ua.goodtransformer.com/products
- Заказчик предоставит: логотипы (SVG в исходниках), тексты о компании,
  описания услуг, email для приёма заявок, данные для офисов/контактов.
