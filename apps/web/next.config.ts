import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { NextConfig } from 'next';
// Payload обёртка — см. @payloadcms/next/withPayload
// (default export — CJS-совместимый с ESM через default interop).
import { withPayload } from '@payloadcms/next/withPayload';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// ICECAT-359 — Security headers на уровне Next.js.
// HSTS и принудительный https выставит nginx (ICECAT-362), здесь — те
// заголовки, которые имеет смысл отдавать из приложения независимо от
// reverse-proxy.
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

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
  experimental: {
    // Next.js 16 блокирует Server Actions при несовпадении Origin/Host.
    // Payload admin использует server actions после логина — без этого
    // списка юзер сразу выбрасывается обратно на /admin/login с валидной
    // cookie (симптом: POST /api/users/login 200 → GET /admin → GET
    // /admin/login loop).
    serverActions: {
      allowedOrigins: [
        '144.91.95.134:3778',
        '127.0.0.1:3778',
        'localhost:3778',
        'zelect.com.ua',
        'www.zelect.com.ua',
      ],
    },
  },
  async headers() {
    return [
      {
        // Публичные роуты и статика. Админку Payload не ограничиваем
        // X-Frame-Options (он сам нуждается в iframe для preview).
        source: '/((?!admin|api).*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default withPayload(nextConfig);
