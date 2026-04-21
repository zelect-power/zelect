# Zelect Power Technology

Корпоративный сайт-каталог поставщика силовых трансформаторов и
электрооборудования. Домен: `zelect.com.ua`.

На этом этапе в репозитории развёрнут **дизайн-прототип** (handoff из
claude.ai/design) как превью. Полная реализация на Next.js 15 + Payload CMS 3
+ PostgreSQL — в работе по `TZ.md`.

## Быстрый старт

```bash
npm install
npm start          # http://127.0.0.1:3777
```

Прототип раздаётся статикой из `public/`.

## На проде (VPS)

Запущен через PM2:

```bash
pm2 status zelect-site
pm2 logs  zelect-site --lines 50
pm2 restart zelect-site
```

Конфиг: `ecosystem.config.js` (PORT 3777, HOST 127.0.0.1).

## Документация проекта

- [`TZ.md`](./TZ.md) — техническое задание
- [`AGENT.md`](./AGENT.md) — регламент агента-разработчика
- [`CLAUDE.md`](./CLAUDE.md) — справка для AI-ассистента
- [`PROGRESS.md`](./PROGRESS.md) — журнал прогресса
- [`TODO.md`](./TODO.md) — задачник
- [`DECISIONS.md`](./DECISIONS.md) — архитектурные решения

## Структура

```
zelect/
├── server.js            # статический сервер на :3777
├── ecosystem.config.js  # PM2
├── public/              # дизайн-прототип (Zelect Power Site.html + src/)
└── zelect-handoff.zip   # исходный архив handoff (бэкап)
```
