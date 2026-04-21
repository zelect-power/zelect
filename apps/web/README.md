# Zelect Power — Next.js Web App

Next.js 16 + React 19 + TypeScript (strict) + Tailwind CSS 4. App Router.

> **Важно для агентов**: Next.js 16 — свежий релиз с breaking-изменениями
> относительно версий из тренировочных данных. Перед написанием новых роутов
> читай актуальные доки в `node_modules/next/dist/docs/`.
> Файл `AGENTS.md` (автосгенерирован create-next-app) дублирует это
> напоминание.

Фронтенд для сайта Zelect Power Technology. Детали — см. корневой
[`../../TZ.md`](../../TZ.md) и [`../../CLAUDE.md`](../../CLAUDE.md).

## Запуск

```bash
cp .env.example .env.local        # подставить реальные значения
npm install                        # (уже выполнено при scaffold)
npm run dev                        # http://127.0.0.1:3001 (hot reload)
npm run build                      # production build
npm start                          # http://0.0.0.0:3777 (прод)
```

## Скрипты

| Скрипт | Что делает |
|---|---|
| `npm run dev` | Dev server на :3001 (пока прототип живёт на :3777) |
| `npm run build` | Production build |
| `npm start` | Production-сервер на :3777 (после переключения с прототипа) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier (форматирование) |
| `npm run format:check` | Prettier (только проверка) |

## Структура (App Router)

```
apps/web/
├── app/
│   ├── layout.tsx           # глобальный layout (header + footer)
│   ├── page.tsx             # главная (/)
│   └── globals.css          # Tailwind + CSS vars из дизайн-токенов
├── public/                  # статика
├── .env.example
├── next.config.ts
└── tsconfig.json
```

## Что дальше

См. Linear: https://linear.app/kdpbot/project/zelect-1c3bca96288e/overview

- ICECAT-322 — перенести дизайн-токены из `../../public/src/tokens.jsx`
- ICECAT-321 — shadcn/ui + переключатель темы без FOUC
- ICECAT-323 — собрать layout (header + footer) из прототипа
- ICECAT-333 — установить Payload CMS 3
- и далее по milestones
