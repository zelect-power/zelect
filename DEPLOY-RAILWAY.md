# Деплой Zelect Power на Railway

Пошаговая инструкция миграции с VPS (144.91.95.134) на Railway.

## Архитектура на Railway

- **Service `zelect-web`** — Next.js 16 + Payload CMS (моно-сервис, веб + админка)
- **Plugin `Postgres`** — managed PostgreSQL (заменяет локальный)
- **Volume `media`** — persistent disk для `apps/web/media/` (uploads Payload)
- **Domain** — `zelect.com.ua` через Railway custom domain (TLS auto)

VPS 144.91.95.134 остаётся как backup (PM2 `zelect-site` :3777, `zelect-next` :3778, локальный Postgres).

---

## Шаг 1. Railway-проект и сервис

```bash
# Из корня монорепо
cd /home/developer/projects/zelect

# Логин (откроет браузер)
railway login

# Создать новый проект
railway init
# → введите имя: zelect-power-prod
# → если спросит про текущую папку — да, привязать

# Привязать к нашему GitHub-репо (zelect-power/zelect)
railway link
```

В Railway Dashboard сервиса `web`:

1. **Settings → Source**: GitHub repo `zelect-power/zelect`, branch `main`
2. **Settings → Build & Deploy → Root Directory**: `apps/web`
   - Это критично: без него Railway попробует собрать root (статический прототип), деплой провалится.
3. **Settings → Networking**: включить **Public Networking** (Railway выдаст временный `*.up.railway.app`).

---

## Шаг 2. PostgreSQL plugin + миграция данных

В Railway Dashboard:

1. **+ New → Database → Add PostgreSQL** в текущий проект.
2. После создания: `Postgres → Connect → копировать DATABASE_URL` (включает credentials).
3. Привязать к веб-сервису: в `zelect-web` → Variables → **Reference `Postgres.DATABASE_URL`** (или вручную скопировать).

### Импорт данных с VPS

Dump уже подготовлен: `/home/developer/backups/zelect/migration/zelect_prod_20260512_193652.dump` (126 KB).

```bash
# На локальной машине (где есть railway CLI и pg_dump)
# Получить connection string Railway-Postgres
railway run -s postgres -- bash -c 'echo $DATABASE_URL'
# или через UI

# Restore (custom format)
pg_restore \
  --no-owner --no-acl --clean --if-exists \
  -d "<RAILWAY_DATABASE_URL>" \
  /home/developer/backups/zelect/migration/zelect_prod_20260512_193652.dump

# Проверка
psql "<RAILWAY_DATABASE_URL>" -c "\dt"
psql "<RAILWAY_DATABASE_URL>" -c "SELECT count(*) FROM users;"
```

Альтернатива (если pg_dump-версия Railway ≠ локальной): можно прогнать `npm run seed` после деплоя — он создаст структуру и наполнит из CMS-фикстур. Но текущий admin-пользователь пропадёт — нужно создать заново на `/admin/create-first-user`.

---

## Шаг 3. Volume для media uploads

Payload пишет файлы в `apps/web/media/` (см. `apps/web/collections/Media.ts:18`). После Root Directory = `apps/web`, в контейнере это путь `/app/media/`.

В Railway Dashboard сервиса `zelect-web`:

1. **Settings → Volumes → Mount Volume**
2. Mount Path: `/app/media`
3. Size: `1 GB` (для начала, легко увеличить)
4. Применить → Railway пересоздаст контейнер.

Сейчас Media collection в БД пустая, переносить нечего.

---

## Шаг 4. Environment Variables

В `zelect-web → Variables`:

| Variable | Value | Источник |
|---|---|---|
| `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` | Reference на Postgres plugin |
| `PAYLOAD_SECRET` | `<секрет из /home/developer/backups/zelect/migration/prod-secrets.env>` | сгенерировано `openssl rand -base64 48` |
| `NEXT_PUBLIC_SITE_URL` | `https://zelect.com.ua` | финальный домен |
| `PAYLOAD_PUBLIC_SERVER_URL` | `https://zelect.com.ua` | тот же домен |
| `NODE_ENV` | `production` | Railway ставит автоматически |
| `PORT` | — | Railway ставит автоматически |
| `NEXT_PUBLIC_GA_ID` | пусто пока | от клиента |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `SUBMISSION_TO_EMAIL` | пусто пока | от клиента |

⚠️ **До привязки домена** — поставьте `NEXT_PUBLIC_SITE_URL` и `PAYLOAD_PUBLIC_SERVER_URL` равными временному Railway URL (`https://zelect-web-production.up.railway.app` или какой выдадут). Потом замените на `https://zelect.com.ua`.

---

## Шаг 5. Deploy

```bash
# Из корня монорепо
railway up
```

Или через GitHub Actions / Railway auto-deploy от push в `main`:

1. Settings → Source → enable auto-deploy on push.
2. `git push origin main` → Railway собирает.

### Smoke-тесты

```bash
RAILWAY_URL=https://zelect-web-production.up.railway.app   # ваш URL
curl -sI $RAILWAY_URL/                              # 200
curl -sI $RAILWAY_URL/produkty                       # 200
curl -sI $RAILWAY_URL/admin                          # 200 (или redirect)
curl -sI $RAILWAY_URL/_next/static/chunks/*.css      # 200 (CSS грузится)
```

Открыть `<RAILWAY_URL>/admin` → если не было миграции данных, создать admin-аккаунт.

---

## Шаг 6. Custom Domain `zelect.com.ua`

В Railway Dashboard сервиса `zelect-web`:

1. **Settings → Networking → Custom Domain → Add Domain**
2. Ввести: `zelect.com.ua` (и отдельно `www.zelect.com.ua` если нужно).
3. Railway покажет CNAME-таргет вида `<id>.up.railway.app`.

В DNS-панели регистратора (zelect.com.ua):

```
Тип    Имя       Значение                              TTL
─────────────────────────────────────────────────────────────
CNAME  @         <id>.up.railway.app                   300
CNAME  www       <id>.up.railway.app                   300
```

⚠️ Если регистратор не позволяет CNAME на корень (`@`): используйте ALIAS/ANAME или сначала смотрите чтоб DNS поддерживал. Альтернатива — A-запись на IP, который выдаст Railway (но IP плавающий, CNAME предпочтительнее).

После DNS propagation (5-60 минут): Railway автоматически выпустит TLS-сертификат через Let's Encrypt. В Dashboard статус: `Active` (зелёный).

После активации домена — обновить env vars:
- `NEXT_PUBLIC_SITE_URL` = `https://zelect.com.ua`
- `PAYLOAD_PUBLIC_SERVER_URL` = `https://zelect.com.ua`
- Triggerнуть redeploy: `railway up` или push в main.

---

## Шаг 7. После запуска

- ✅ VPS оставляем работать как backup (PM2 `zelect-next` :3778, `zelect-site` :3777).
- ✅ После 1 недели стабильной работы Railway — можно остановить `zelect-next` (`pm2 stop zelect-next`). Прототип `zelect-site` оставляем для сверки пиксель-в-пиксель.
- ⏸ Локальный Postgres (`zelect_prod`) на VPS — оставить, backup-скрипт `scripts/zelect-backup.sh` в cron'е продолжает работать как доп. защита.

---

## Откат на VPS (rollback)

Если Railway падает или критичная проблема:

1. Снять DNS-записи (или переключить на VPS IP `144.91.95.134`).
2. `pm2 start zelect-next` если был остановлен.
3. Сервис работает с VPS, как раньше.

DNS откат: 5-60 мин propagation. Поэтому **на этап тестирования Railway domain держим без production DNS** — клиент видит и подтверждает на временном URL, потом переключаем.

---

## Полезные команды

```bash
# Логи деплоя
railway logs -s zelect-web

# Открыть в браузере
railway open

# SSH в контейнер
railway shell -s zelect-web

# Список переменных
railway variables -s zelect-web

# Триггер deploy
railway redeploy
```
