#!/usr/bin/env node
// Снимает скриншоты указанных страниц в light/dark и desktop/mobile viewport.
// Usage: node scripts/capture.mjs <record-id>
// Вывод: PNG в test-reports/screenshots/<record-id>/<target>-<theme>-<viewport>.png
// Возвращает stdout JSON-массив [{ target, label, theme, viewport, path, url }].

import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(import.meta.url), '../..');
const recordId = process.argv[2];
if (!recordId) {
  console.error('Usage: capture.mjs <record-id>');
  process.exit(1);
}

const PROTOTYPE = process.env.PROTOTYPE_URL ?? 'http://127.0.0.1:3777';
const NEXTAPP = process.env.NEXT_URL ?? 'http://127.0.0.1:3778';

const TARGETS = [
  { key: 'next-home', label: 'Next · Головна', url: `${NEXTAPP}/` },
  { key: 'next-products', label: 'Next · Продукти', url: `${NEXTAPP}/produkty` },
  { key: 'next-services', label: 'Next · Послуги', url: `${NEXTAPP}/poslugy` },
  { key: 'next-support', label: 'Next · Підтримка', url: `${NEXTAPP}/pidtrymka` },
  { key: 'next-news', label: 'Next · Новини', url: `${NEXTAPP}/novyny` },
  { key: 'next-contacts', label: 'Next · Контакти', url: `${NEXTAPP}/kontakty` },
  { key: 'next-admin', label: 'Next · Payload Admin', url: `${NEXTAPP}/admin` },
  { key: 'proto-home', label: 'Прототип · Головна', url: `${PROTOTYPE}/` },
  {
    key: 'proto-products',
    label: 'Прототип · Продукти',
    url: `${PROTOTYPE}/produkty`,
  },
  {
    key: 'proto-services',
    label: 'Прототип · Послуги',
    url: `${PROTOTYPE}/poslugy`,
  },
  {
    key: 'proto-support',
    label: 'Прототип · Підтримка',
    url: `${PROTOTYPE}/pidtrymka`,
  },
  {
    key: 'proto-news',
    label: 'Прототип · Новини',
    url: `${PROTOTYPE}/novyny`,
  },
  {
    key: 'proto-contacts',
    label: 'Прототип · Контакти',
    url: `${PROTOTYPE}/kontakty`,
  },
];

const VIEWPORTS = [
  { key: 'desktop', width: 1440, height: 900 },
  { key: 'laptop', width: 1024, height: 768 },
  { key: 'tablet', width: 768, height: 1024 },
  { key: 'mobile', width: 375, height: 812 }, // iPhone SE/13 mini
];

const THEMES = ['light', 'dark'];

async function ensureDir(p) {
  if (!existsSync(p)) await mkdir(p, { recursive: true });
}

async function main() {
  const outDir = resolve(ROOT, 'test-reports/screenshots', recordId);
  await ensureDir(outDir);

  const browser = await chromium.launch();
  const manifest = [];

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    for (const theme of THEMES) {
      // pre-set theme preference in localStorage BEFORE any navigation,
      // so the inline anti-FOUC script in Next.js picks it up on first paint.
      await context.addInitScript((t) => {
        try {
          localStorage.setItem('zp-theme', t);
        } catch {}
      }, theme);

      for (const target of TARGETS) {
        const fileName = `${target.key}-${theme}-${vp.key}.png`;
        const filePath = resolve(outDir, fileName);
        try {
          // /admin первая компиляция в dev — до 2 минут. Прочие страницы ≤10 с.
          const isAdmin = target.key.startsWith('next-admin');
          const timeout = isAdmin ? 120000 : 30000;
          await page.goto(target.url, {
            waitUntil: 'networkidle',
            timeout,
          });
          if (isAdmin) {
            // Payload dev-режим делает client-side редирект на
            // /admin/login или /admin/create-first-user после гидратации.
            // Ждём пока форма или хедер админки появятся, иначе снимем пустой RSC-шелл.
            await page
              .waitForSelector('form, h1, .template-default, .template-minimal', {
                timeout: 60000,
              })
              .catch(() => {});
            await page.waitForTimeout(1500);
          } else {
            await page.waitForTimeout(500);
          }
          await page.screenshot({
            path: filePath,
            fullPage: true,
          });
          manifest.push({
            target: target.key,
            label: target.label,
            url: target.url,
            theme,
            viewport: vp.key,
            path: `screenshots/${recordId}/${fileName}`,
            ok: true,
          });
          process.stderr.write(`✓ ${fileName}\n`);
        } catch (err) {
          manifest.push({
            target: target.key,
            label: target.label,
            url: target.url,
            theme,
            viewport: vp.key,
            path: null,
            ok: false,
            error: String(err?.message ?? err),
          });
          process.stderr.write(`✗ ${fileName}: ${err.message}\n`);
        }
      }
    }
    await context.close();
  }

  await browser.close();
  const indexPath = resolve(outDir, 'shots.json');
  await writeFile(indexPath, JSON.stringify(manifest, null, 2));
  process.stdout.write(JSON.stringify(manifest));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
