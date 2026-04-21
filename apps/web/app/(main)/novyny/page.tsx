import Link from 'next/link';

import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { IcArrow } from '@/components/icons';
import { NEWS_CATEGORIES, NEWS_FALLBACK } from '@/lib/fallback';
import { payload } from '@/lib/payload';
import { ROUTES } from '@/lib/routes';

export const metadata = {
  title: 'Новини',
  description:
    'Що відбувається у Zelect Power та галузі: офіційні релізи, проєкти, аналітика ринку енергообладнання України.',
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

async function loadNews() {
  try {
    const pl = await payload();
    const res = await pl.find({
      collection: 'news',
      limit: 50,
      sort: '-publishedAt',
      where: { status: { equals: 'published' } },
      depth: 0,
    });
    if (res.docs.length) {
      return res.docs.map((d) => ({
        slug: String(d.slug ?? ''),
        publishedAt: String(d.publishedAt ?? ''),
        category: String(d.category ?? 'company'),
        title: String(d.title ?? ''),
        excerpt: String((d as { excerpt?: string }).excerpt ?? ''),
      }));
    }
  } catch {
    // fall through to fallback
  }
  return NEWS_FALLBACK;
}

export default async function NewsPage() {
  const news = await loadNews();
  return (
    <>
      <PageHeader
        eyebrow="Новини"
        title="Що відбувається у компанії та галузі"
        sub="Офіційні релізи, реалізовані проєкти, аналітика ринку енергообладнання України."
      />
      <Section padding="compact">
        <Breadcrumbs items={[{ label: 'Головна', href: ROUTES.home }, { label: 'Новини' }]} />
      </Section>
      <Section padding="compact" className="!pt-8 !pb-[120px]">
        <div className="bg-border-theme border-border-theme grid grid-cols-1 gap-px overflow-hidden rounded-[20px] border md:grid-cols-2">
          {news.map((n) => (
            <Link
              key={n.slug}
              href={`${ROUTES.news}/${n.slug}`}
              className="bg-surface hover:bg-surface-2 flex min-h-[240px] flex-col gap-4 p-9 transition-colors"
            >
              <div className="flex justify-between text-[11px] tracking-[0.1em] uppercase">
                <span className="text-brand-theme font-semibold">
                  {NEWS_CATEGORIES[n.category] ?? n.category}
                </span>
                <span className="text-faint-foreground" style={{ fontFamily: 'var(--font-mono)' }}>
                  {formatDate(n.publishedAt)}
                </span>
              </div>
              <h3
                className="text-foreground m-0 text-[26px] leading-[1.2] font-bold tracking-[-0.02em]"
                style={{ fontFamily: 'var(--font-heading)', textWrap: 'balance' }}
              >
                {n.title}
              </h3>
              <p className="text-muted-foreground m-0 flex-1 text-[15px] leading-[1.55]">
                {n.excerpt}
              </p>
              <div className="text-foreground inline-flex items-center gap-2 text-[13px] font-semibold">
                Читати статтю <IcArrow size={14} />
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
