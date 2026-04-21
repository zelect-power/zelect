import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { NEWS_CATEGORIES, NEWS_FALLBACK } from '@/lib/fallback';
import { ROUTES } from '@/lib/routes';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return NEWS_FALLBACK.map((n) => ({ slug: n.slug }));
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const n = NEWS_FALLBACK.find((x) => x.slug === slug);
  if (!n) return { title: 'Новину не знайдено' };
  return {
    title: n.title,
    description: n.excerpt,
    openGraph: {
      title: n.title,
      description: n.excerpt,
      type: 'article',
      publishedTime: n.publishedAt,
    },
  };
}

export default async function NewsDetail({ params }: Props) {
  const { slug } = await params;
  const n = NEWS_FALLBACK.find((x) => x.slug === slug);
  if (!n) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: n.title,
    datePublished: n.publishedAt,
    articleSection: NEWS_CATEGORIES[n.category] ?? n.category,
    publisher: {
      '@type': 'Organization',
      name: 'Zelect Power Technology',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        eyebrow={`${NEWS_CATEGORIES[n.category] ?? n.category} · ${formatDate(n.publishedAt)}`}
        title={n.title}
      />
      <Section padding="compact">
        <Breadcrumbs
          items={[
            { label: 'Головна', href: ROUTES.home },
            { label: 'Новини', href: ROUTES.news },
            { label: n.title },
          ]}
        />
      </Section>
      <Section padding="compact" className="!pt-8 !pb-[120px]">
        <article className="text-muted-foreground mx-auto max-w-[780px] text-[17px] leading-[1.7]">
          <p className="text-foreground text-[19px] leading-[1.6]">{n.excerpt}</p>
          <p className="mt-6">
            Детальний матеріал готується до публікації. Слідкуйте за оновленнями або зв&apos;яжіться
            з прес-службою для отримання додаткової інформації.
          </p>
        </article>
      </Section>
    </>
  );
}
