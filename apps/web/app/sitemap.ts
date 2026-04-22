import type { MetadataRoute } from 'next';

import {
  CATEGORIES_FALLBACK,
  NEWS_FALLBACK,
  PRODUCTS_FALLBACK,
  SERVICES_FALLBACK,
} from '@/lib/fallback';
import { payload } from '@/lib/payload';
import { ROUTES } from '@/lib/routes';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zelect.com.ua';

type Entry = MetadataRoute.Sitemap[number];

async function fromPayload(): Promise<Entry[]> {
  try {
    const pl = await payload();
    const [cats, prods, services, news, pages] = await Promise.all([
      pl.find({ collection: 'categories', limit: 0, depth: 0 }).catch(() => ({ docs: [] })),
      pl.find({ collection: 'products', limit: 0, depth: 0 }).catch(() => ({ docs: [] })),
      pl.find({ collection: 'services', limit: 0, depth: 0 }).catch(() => ({ docs: [] })),
      pl
        .find({
          collection: 'news',
          limit: 0,
          depth: 0,
          where: { status: { equals: 'published' } },
        })
        .catch(() => ({ docs: [] })),
      pl
        .find({
          collection: 'pages',
          limit: 0,
          depth: 0,
          where: { status: { equals: 'published' } },
        })
        .catch(() => ({ docs: [] })),
    ]);

    const out: Entry[] = [];
    for (const c of cats.docs) {
      const slug = (c as { slug?: string }).slug;
      if (!slug) continue;
      out.push({
        url: `${BASE}${ROUTES.products}/${slug}`,
        lastModified: (c as { updatedAt?: string }).updatedAt,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
    for (const p of prods.docs) {
      const rec = p as { slug?: string; category?: { slug?: string } | string; updatedAt?: string };
      const catSlug =
        typeof rec.category === 'object' && rec.category ? rec.category.slug : undefined;
      if (!rec.slug || !catSlug) continue;
      out.push({
        url: `${BASE}${ROUTES.products}/${catSlug}/${rec.slug}`,
        lastModified: rec.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
    for (const s of services.docs) {
      const rec = s as { slug?: string; updatedAt?: string };
      if (!rec.slug) continue;
      out.push({
        url: `${BASE}${ROUTES.services}/${rec.slug}`,
        lastModified: rec.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
    for (const n of news.docs) {
      const rec = n as { slug?: string; publishedAt?: string; updatedAt?: string };
      if (!rec.slug) continue;
      out.push({
        url: `${BASE}${ROUTES.news}/${rec.slug}`,
        lastModified: rec.updatedAt ?? rec.publishedAt,
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    }
    for (const pg of pages.docs) {
      const rec = pg as { slug?: string; updatedAt?: string };
      if (!rec.slug) continue;
      out.push({
        url: `${BASE}/${rec.slug}`,
        lastModified: rec.updatedAt,
        changeFrequency: 'yearly',
        priority: 0.3,
      });
    }
    return out;
  } catch {
    return [];
  }
}

function fromFallback(): Entry[] {
  const out: Entry[] = [];
  for (const c of CATEGORIES_FALLBACK) {
    out.push({
      url: `${BASE}${ROUTES.products}/${c.slug}`,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }
  for (const p of PRODUCTS_FALLBACK) {
    out.push({
      url: `${BASE}${ROUTES.products}/${p.categorySlug}/${p.slug}`,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }
  for (const s of SERVICES_FALLBACK) {
    out.push({
      url: `${BASE}${ROUTES.services}/${s.slug}`,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }
  for (const n of NEWS_FALLBACK) {
    out.push({
      url: `${BASE}${ROUTES.news}/${n.slug}`,
      lastModified: n.publishedAt,
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  }
  return out;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUrls: Entry[] = [
    { url: `${BASE}/`, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE}${ROUTES.products}`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}${ROUTES.services}`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}${ROUTES.support}`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}${ROUTES.news}`, changeFrequency: 'daily', priority: 0.7 },
    { url: `${BASE}${ROUTES.contacts}`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/polityka-konfidencijnosti`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/umovy-vykorystannya`, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const dynamic = await fromPayload();
  const entries = dynamic.length > 0 ? dynamic : fromFallback();
  return [...staticUrls, ...entries];
}
