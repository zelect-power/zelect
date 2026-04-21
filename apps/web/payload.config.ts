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
  // Глобальный rate-limit на публичное API сделаем middleware-ом в ICECAT-346
  // (там же honeypot для форм).
  cookiePrefix: 'zp',
  csrf: ['http://144.91.95.134:3778', 'https://zelect.com.ua', 'https://www.zelect.com.ua'],
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
