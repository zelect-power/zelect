// ICECAT-350..353 — seed Payload с fallback-данными.
// Запуск: cd apps/web && npm run seed
// Idempotent: использует upsert через поиск по slug; перезапись полей.
// TS-check выключен: Payload генерит очень строгие literal unions на rich-text
// и relationship-поля, что неуместно для одноразового seed-скрипта.

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config as dotenv } from 'dotenv';

const dirname = path.dirname(fileURLToPath(import.meta.url));
// dotenv ДО dynamic-import payload.config: ES-module top-level imports
// hoisted, поэтому payload.config и его DATABASE_URL читаем только после
// того как env вылили.
dotenv({ path: path.resolve(dirname, '..', '.env.local') });

const { getPayload } = await import('payload');
const { default: config } = await import('../payload.config');
const { CATEGORIES_FALLBACK, NEWS_FALLBACK, PRODUCTS_FALLBACK, SERVICES_FALLBACK } =
  await import('../lib/fallback');

// Lexical literal unions Payload не совпадают со свободными строками.
// В seed-скрипте возвращаем any — тайпчек не критичен, выполняется один раз.
/* eslint-disable @typescript-eslint/no-explicit-any */
function para(text: string): any {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr' as const,
          textStyle: '',
          textFormat: 0,
          children: [
            {
              type: 'text',
              text,
              format: 0,
              version: 1,
              detail: 0,
              mode: 'normal',
              style: '',
            },
          ],
        },
      ],
    },
  };
}

function bulletList(items: string[]): any {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: [
        {
          type: 'list',
          listType: 'bullet',
          tag: 'ul',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr' as const,
          start: 1,
          children: items.map((t, i) => ({
            type: 'listitem',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr' as const,
            value: i + 1,
            children: [
              {
                type: 'text',
                text: t,
                format: 0,
                version: 1,
                detail: 0,
                mode: 'normal',
                style: '',
              },
            ],
          })),
        },
      ],
    },
  };
}

async function upsert<Doc extends { id: string | number }>(args: {
  name: string;
  slug: string;
  find: () => Promise<{ docs: Doc[] }>;
  create: () => Promise<Doc>;
  update: (id: string | number) => Promise<Doc>;
}): Promise<Doc> {
  const existing = await args.find();
  if (existing.docs.length > 0) {
    const id = existing.docs[0].id;
    const updated = await args.update(id);
    process.stdout.write(`  · [${args.name}] ${args.slug} updated\n`);
    return updated;
  }
  const created = await args.create();
  process.stdout.write(`  + [${args.name}] ${args.slug} created\n`);
  return created;
}

async function main() {
  const pl = await getPayload({ config });
  const CAT_IDS: Record<string, number | string> = {};

  // ── Categories ────────────────────────────────────────────────
  process.stdout.write('Categories\n');
  for (let i = 0; i < CATEGORIES_FALLBACK.length; i++) {
    const c = CATEGORIES_FALLBACK[i];
    const data = {
      slug: c.slug,
      title: c.title,
      order: i,
      description: para(`Категорія: ${c.title}. Продукція Zelect Power.`),
    };
    const doc = await upsert({
      name: 'categories',
      slug: c.slug,
      find: () =>
        pl.find({
          collection: 'categories',
          where: { slug: { equals: c.slug } },
          limit: 1,
          depth: 0,
        }) as Promise<{ docs: { id: string | number }[] }>,
      create: () =>
        pl.create({ collection: 'categories', data }) as Promise<{ id: string | number }>,
      update: (id) =>
        pl.update({ collection: 'categories', id, data }) as Promise<{ id: string | number }>,
    });
    CAT_IDS[c.slug] = doc.id;
  }

  // ── Products ──────────────────────────────────────────────────
  process.stdout.write('Products\n');
  for (const p of PRODUCTS_FALLBACK) {
    const categoryId = CAT_IDS[p.categorySlug];
    if (!categoryId) continue;
    const data = {
      slug: p.slug,
      title: p.title,
      article: p.article,
      category: categoryId,
      description: para(
        `${p.desc}. Виробник — Zelect Power Technology. Виконано за ДСТУ IEC 60076.`,
      ),
      specs: p.specs.map((s, i) => ({ label: `Параметр ${i + 1}`, value: s })),
      featured: p.categorySlug === 'power' && p.slug === 'tmn-6300-110',
    };
    await upsert({
      name: 'products',
      slug: p.slug,
      find: () =>
        pl.find({
          collection: 'products',
          where: { slug: { equals: p.slug } },
          limit: 1,
          depth: 0,
        }) as Promise<{ docs: { id: string | number }[] }>,
      create: () => pl.create({ collection: 'products', data }) as Promise<{ id: string | number }>,
      update: (id) =>
        pl.update({ collection: 'products', id, data }) as Promise<{ id: string | number }>,
    });
  }

  // ── Services ──────────────────────────────────────────────────
  process.stdout.write('Services\n');
  for (const s of SERVICES_FALLBACK) {
    const data = {
      slug: s.slug,
      title: s.title,
      icon: s.icon,
      summary: s.summary,
      description: para(`${s.title}. ${s.summary}`),
      bullets: s.bullets.map((text) => ({ text })),
      order: Number(s.n),
    };
    await upsert({
      name: 'services',
      slug: s.slug,
      find: () =>
        pl.find({
          collection: 'services',
          where: { slug: { equals: s.slug } },
          limit: 1,
          depth: 0,
        }) as Promise<{ docs: { id: string | number }[] }>,
      create: () => pl.create({ collection: 'services', data }) as Promise<{ id: string | number }>,
      update: (id) =>
        pl.update({ collection: 'services', id, data }) as Promise<{ id: string | number }>,
    });
  }

  // ── News ──────────────────────────────────────────────────────
  process.stdout.write('News\n');
  for (const n of NEWS_FALLBACK) {
    const data = {
      slug: n.slug,
      title: n.title,
      category: n.category as 'projects' | 'company' | 'quality' | 'partnership' | 'industry',
      publishedAt: new Date(n.publishedAt).toISOString(),
      excerpt: n.excerpt,
      body: para(`${n.excerpt} Повний матеріал готується до публікації — перевірте ще раз згодом.`),
      status: 'published' as const,
    };
    await upsert({
      name: 'news',
      slug: n.slug,
      find: () =>
        pl.find({
          collection: 'news',
          where: { slug: { equals: n.slug } },
          limit: 1,
          depth: 0,
        }) as Promise<{ docs: { id: string | number }[] }>,
      create: () => pl.create({ collection: 'news', data }) as Promise<{ id: string | number }>,
      update: (id) =>
        pl.update({ collection: 'news', id, data }) as Promise<{ id: string | number }>,
    });
  }

  // ── Pages ─────────────────────────────────────────────────────
  process.stdout.write('Pages\n');
  const PAGES: Array<{ slug: string; title: string; bullets: string[] }> = [
    {
      slug: 'pro-kompaniyu',
      title: 'Про компанію',
      bullets: [
        '18 років досвіду на ринку енергетики України.',
        'Виробництво силових трансформаторів потужністю до 63 МВА.',
        '40+ інженерів із сертифікатами Держенергонагляду.',
        'Сервіс 24/7 у 5 регіонах країни.',
      ],
    },
    {
      slug: 'polityka-konfidencijnosti',
      title: 'Політика конфіденційності',
      bullets: [
        'Обробляємо персональні дані за законом України «Про захист персональних даних».',
        'Зберігаємо лише те, що необхідно для обробки запиту.',
        'Cookies завантажуємо тільки після явної згоди.',
        'Ви маєте право вимагати доступ, виправлення та видалення даних.',
      ],
    },
    {
      slug: 'umovy-vykorystannya',
      title: 'Умови використання',
      bullets: [
        'Весь контент сайту захищено авторським правом.',
        'Технічні характеристики носять довідковий характер.',
        'Для точних параметрів обладнання — зверніться до менеджерів.',
      ],
    },
  ];

  for (const pg of PAGES) {
    const data = {
      slug: pg.slug,
      title: pg.title,
      body: bulletList(pg.bullets),
      status: 'published' as const,
    };
    await upsert({
      name: 'pages',
      slug: pg.slug,
      find: () =>
        pl.find({
          collection: 'pages',
          where: { slug: { equals: pg.slug } },
          limit: 1,
          depth: 0,
        }) as Promise<{ docs: { id: string | number }[] }>,
      create: () => pl.create({ collection: 'pages', data }) as Promise<{ id: string | number }>,
      update: (id) =>
        pl.update({ collection: 'pages', id, data }) as Promise<{ id: string | number }>,
    });
  }

  // ── Settings (global) ─────────────────────────────────────────
  process.stdout.write('Settings (global)\n');
  await pl.updateGlobal({
    slug: 'settings',
    data: {
      companyName: 'Zelect Power Technology',
      legalName: 'ТОВ «Зелект Пауер Технолоджі»',
      hotline: '0 800 300 500',
      contacts: {
        phone: '+380 44 300 50 00',
        email: 'info@zelect.com.ua',
        emailTender: 'tender@zelect.com.ua',
        emailService: 'service@zelect.com.ua',
      },
      offices: [
        {
          city: 'Київ',
          role: 'Головний офіс',
          address: 'вул. Електриків, 29А, 04176',
          phone: '+380 44 300 50 00',
        },
        {
          city: 'Харків',
          role: 'Виробництво',
          address: 'просп. Московський, 247, 61037',
          phone: '+380 57 700 11 20',
        },
        {
          city: 'Дніпро',
          role: 'Сервісний хаб',
          address: 'вул. Січеславська Набережна, 15А, 49000',
          phone: '+380 56 300 40 10',
        },
        {
          city: 'Львів',
          role: 'Регіональне представництво',
          address: 'вул. Городоцька, 172, 79022',
          phone: '+380 32 255 10 00',
        },
      ],
      social: {
        linkedin: 'https://linkedin.com/company/zelect-power',
        facebook: 'https://facebook.com/zelectpower',
      },
      defaultSeo: {
        title: 'Zelect Power Technology — енергетичне обладнання',
        description:
          'Силові та розподільчі трансформатори, КТП, розподільчі пристрої і кабельна продукція для промисловості та державного сектору України.',
      },
    },
  });
  process.stdout.write('  · settings updated\n');

  process.stdout.write('\nDone.\n');
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
