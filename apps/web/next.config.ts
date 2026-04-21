import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { NextConfig } from 'next';
// Payload обёртка — см. @payloadcms/next/withPayload
// (default export — CJS-совместимый с ESM через default interop).
import { withPayload } from '@payloadcms/next/withPayload';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Явно фиксируем рабочую директорию Turbopack, чтобы он не подхватывал
  // корневой package-lock.json (там живёт serve-handler для прототипа).
  turbopack: {
    root: dirname,
  },
};

export default withPayload(nextConfig);
