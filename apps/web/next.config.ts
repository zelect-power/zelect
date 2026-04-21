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
  // Next.js 16 в dev-режиме блокирует cross-origin запросы к внутренним
  // ресурсам (/_next/*) если домен отличается от localhost. На VPS мы ходим
  // по IP 144.91.95.134 — без этого Payload /admin не может подгрузить RSC
  // чанки и падает с пустым body.
  allowedDevOrigins: ['144.91.95.134', '127.0.0.1', 'localhost'],
};

export default withPayload(nextConfig);
