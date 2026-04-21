import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';

import { Users } from './collections/Users';

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
  collections: [Users],
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
  // i18n для админки (по умолчанию en, uk добавим позже если владелец попросит).
});
