#!/usr/bin/env bash
# Sanity-проверки Next.js-приложения перед коммитом / сменой статуса в Linear.
# Usage: ./scripts/check.sh [--skip-build]
set -euo pipefail

cd "$(dirname "$0")/.."

SKIP_BUILD=0
for arg in "$@"; do
  case "$arg" in
    --skip-build) SKIP_BUILD=1 ;;
  esac
done

WEB=apps/web
section() { printf '\n──── %s ────\n' "$1"; }

section 'Prettier'
(cd "$WEB" && npm run --silent format:check)

section 'ESLint'
(cd "$WEB" && npm run --silent lint)

section 'TypeScript'
(cd "$WEB" && npx --no-install tsc --noEmit)

if [ "$SKIP_BUILD" -eq 0 ]; then
  section 'Next build (sanity)'
  (cd "$WEB" && npm run --silent build)
else
  section 'Next build — skipped (--skip-build)'
fi

section 'OK'
echo 'All checks passed.'
