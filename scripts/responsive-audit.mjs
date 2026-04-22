#!/usr/bin/env node
// Проверка адаптивности: обходит все Next.js страницы в 4 viewport и
// проверяет:
//   - нет горизонтального overflow (scrollWidth <= viewport)
//   - ключевые элементы видны (header, footer, main content)
//   - нет перекрытий мобильного меню при wide viewport
// Печатает отчёт в stdout, exit 1 при явных проблемах.

import { chromium } from 'playwright';

const BASE = process.env.NEXT_URL ?? 'http://127.0.0.1:3778';
const PATHS = [
  '/',
  '/produkty',
  '/produkty/power',
  '/produkty/power/tmn-6300-110',
  '/poslugy',
  '/poslugy/design',
  '/pidtrymka',
  '/novyny',
  '/kontakty',
  '/polityka-konfidencijnosti',
];
const VIEWPORTS = [
  { key: 'desktop', width: 1440, height: 900 },
  { key: 'laptop', width: 1024, height: 768 },
  { key: 'tablet', width: 768, height: 1024 },
  { key: 'mobile', width: 375, height: 812 },
];

const results = [];

async function main() {
  const browser = await chromium.launch();
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await ctx.newPage();
    for (const p of PATHS) {
      const url = `${BASE}${p}`;
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
        await page.waitForTimeout(400);
        const data = await page.evaluate(() => {
          const root = document.documentElement;
          const canScrollX = root.scrollWidth > root.clientWidth;
          const overflow = root.scrollWidth - root.clientWidth;
          const hasHeader = !!document.querySelector('header');
          const hasFooter = !!document.querySelector('footer');
          const overlay = document.querySelector('[role="dialog"][aria-modal="true"]');
          const h1 = document.querySelector('h1');
          return {
            viewportW: window.innerWidth,
            canScrollX,
            overflow,
            hasHeader,
            hasFooter,
            overlayOpen: !!overlay,
            h1Text: h1 ? h1.textContent?.slice(0, 80) : null,
          };
        });
        const issues = [];
        // Реальная горизонтальная прокрутка = плохо; body.scrollWidth > vw
        // при overflow-x:clip на html — это марки marquee и т.п.,
        // они clipped визуально и не дают прокрутки.
        if (data.canScrollX) issues.push(`horizontal scroll +${data.overflow}px`);
        if (!data.hasHeader) issues.push('no header');
        if (!data.hasFooter) issues.push('no footer');
        if (!data.h1Text) issues.push('no h1');
        if (data.overlayOpen && vp.width > 720) {
          issues.push('mobile overlay open at desktop width');
        }
        results.push({ vp: vp.key, path: p, issues, ...data });
      } catch (err) {
        results.push({ vp: vp.key, path: p, issues: [`nav-error: ${err.message}`] });
      }
    }
    await ctx.close();
  }
  await browser.close();

  // report
  let fails = 0;
  for (const r of results) {
    if (r.issues.length === 0) {
      process.stdout.write(`✓ ${r.vp.padEnd(8)} ${r.path}\n`);
    } else {
      fails += 1;
      process.stdout.write(
        `✗ ${r.vp.padEnd(8)} ${r.path}  — ${r.issues.join('; ')}\n`,
      );
    }
  }
  process.stdout.write(
    `\n${fails === 0 ? 'All clean' : `${fails} issues`} across ${results.length} checks\n`,
  );
  process.exit(fails === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
