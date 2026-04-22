import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';

import { Categories } from './collections/Categories';
import { Media } from './collections/Media';
import { News } from './collections/News';
import { Pages } from './collections/Pages';
import { Products } from './collections/Products';
import { Services } from './collections/Services';
import { Submissions } from './collections/Submissions';
import { Users } from './collections/Users';
import { Settings } from './globals/Settings';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, 'app', '(payload)', 'admin'),
    },
    meta: {
      title: 'Zelect Power Admin',
      titleSuffix: ' · Zelect Admin',
    },
  },
  collections: [Users, Categories, Products, Services, News, Pages, Media, Submissions],
  globals: [Settings],
  // ICECAT-332: политики безопасности.
  // Rate-limit на логин — через maxLoginAttempts в Users (см. collections/Users).
  // Глобальный rate-limit на публичное API сделаем middleware-ом в ICECAT-346.
  //
  // serverURL намеренно не задаём — Payload resolve'ит origin из request.
  // csrf: [] (default) — extractJWT в Payload 3.83 при НЕпустом списке
  // без Origin header отклоняет cookie, что ломает Server Component
  // top-level GET /admin (браузер не шлёт Origin для GET-navigations).
  // Security: Payload всё равно проверяет Sec-Fetch-Site при пустом
  // списке для same-origin; CSRF на уровне форм уже через honeypot +
  // rate-limit (ICECAT-346).
  // v1 активен только uk. Архитектурная готовность к ru/en/pl — см. ADR-004.
  localization: {
    locales: [
      { label: 'Українська', code: 'uk' },
      { label: 'Русский', code: 'ru' },
      { label: 'English', code: 'en' },
      { label: 'Polski', code: 'pl' },
    ],
    defaultLocale: 'uk',
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET ?? 'dev-insecure-secret-replace-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URL ?? 'postgres://zelect:dev@127.0.0.1:5432/zelect_prod',
    },
  }),
});
