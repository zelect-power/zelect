#!/usr/bin/env bash
# ICECAT-361 — Резервное копирование zelect_prod.
# Запускается по cron: `0 3 * * *  bash /home/developer/projects/zelect/scripts/zelect-backup.sh`
# Хранит 7 ежедневных + 4 недельных (по воскресеньям).

set -euo pipefail

BACKUP_DIR="${BACKUP_DIR:-/home/developer/backups/zelect}"
DB_URL_FILE="/home/developer/projects/zelect/.env.local"
DB_NAME="zelect_prod"
DB_USER="zelect"
PG_HOST="${PG_HOST:-127.0.0.1}"
PG_PORT="${PG_PORT:-5432}"

mkdir -p "$BACKUP_DIR"

# Извлекаем пароль из .env.local (DATABASE_URL=postgres://user:PASS@host:port/db)
if [ ! -f "$DB_URL_FILE" ]; then
  echo "FATAL: $DB_URL_FILE не найден" >&2
  exit 1
fi
DB_PASS="$(grep -E '^DATABASE_URL=' "$DB_URL_FILE" | sed -E 's|.*://[^:]+:([^@]+)@.*|\1|')"
if [ -z "$DB_PASS" ]; then
  echo "FATAL: не удалось извлечь DATABASE_URL password" >&2
  exit 1
fi

TS="$(date -u +%Y-%m-%d_%H-%M)"
DAILY="$BACKUP_DIR/zelect_${TS}.sql.gz"

echo "[$(date -u +%FT%TZ)] zelect backup → $DAILY"
PGPASSWORD="$DB_PASS" pg_dump \
  -h "$PG_HOST" -p "$PG_PORT" -U "$DB_USER" "$DB_NAME" \
  --no-owner --no-privileges \
  | gzip -9 > "$DAILY"

# Ретеншн:
#   daily: 7 последних
#   weekly: 4 самых свежих воскресных (помечены .weekly.sql.gz)
DOW="$(date -u +%u)" # 1..7, где 7 = воскресенье
if [ "$DOW" = "7" ]; then
  WEEKLY="$BACKUP_DIR/zelect_${TS}.weekly.sql.gz"
  cp -a "$DAILY" "$WEEKLY"
fi

# Удаляем старые daily (кроме weekly)
ls -1t "$BACKUP_DIR"/zelect_*.sql.gz 2>/dev/null \
  | grep -v '\.weekly\.sql\.gz$' \
  | tail -n +8 \
  | xargs -r rm -v

# Удаляем старые weekly (оставляем 4)
ls -1t "$BACKUP_DIR"/zelect_*.weekly.sql.gz 2>/dev/null \
  | tail -n +5 \
  | xargs -r rm -v

echo "[$(date -u +%FT%TZ)] backup completed, size=$(du -h "$DAILY" | awk '{print $1}')"
