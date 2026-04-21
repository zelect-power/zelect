import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { TransformerVisual } from '@/components/brand/transformer-visual';
import { CtaButton } from '@/components/ui/cta-button';
import { CATEGORIES_FALLBACK, PRODUCTS_FALLBACK } from '@/lib/fallback';
import { ROUTES } from '@/lib/routes';

interface Props {
  params: Promise<{ category: string; product: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS_FALLBACK.map((p) => ({
    category: p.categorySlug,
    product: p.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { product } = await params;
  const p = PRODUCTS_FALLBACK.find((x) => x.slug === product);
  if (!p) return { title: 'Товар не знайдено' };
  return {
    title: `${p.title} — ${p.desc}`,
    description: `${p.title}. ${p.desc}. Технічні характеристики: ${p.specs.join(', ')}.`,
    openGraph: {
      title: `${p.title} — Zelect Power`,
      description: p.desc,
    },
  };
}

export default async function ProductDetail({ params }: Props) {
  const { category, product } = await params;
  const p = PRODUCTS_FALLBACK.find((x) => x.slug === product && x.categorySlug === category);
  if (!p) notFound();

  const cat = CATEGORIES_FALLBACK.find((c) => c.slug === p.categorySlug);

  // JSON-LD Product schema.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.title,
    sku: p.article,
    description: p.desc,
    brand: { '@type': 'Brand', name: 'Zelect Power Technology' },
    category: cat?.title,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader eyebrow={`Продукт · ${cat?.title ?? 'каталог'}`} title={p.title} sub={p.desc} />
      <Section padding="compact">
        <Breadcrumbs
          items={[
            { label: 'Головна', href: ROUTES.home },
            { label: 'Продукти', href: ROUTES.products },
            ...(cat ? [{ label: cat.title, href: `${ROUTES.products}/${cat.slug}` }] : []),
            { label: p.title },
          ]}
        />
      </Section>
      <Section padding="compact" className="!pb-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="bg-background-soft border-border-theme flex items-center justify-center overflow-hidden rounded-[24px] border p-6">
            <TransformerVisual size={520} />
          </div>
          <div>
            <div
              className="text-faint-foreground text-xs tracking-[0.1em] uppercase"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Артикул: {p.article}
            </div>
            <h2
              className="text-foreground m-0 mt-3 text-[40px] font-bold tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {p.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-[17px] leading-[1.55]">
              {p.desc}. Виконується за індивідуальним технічним завданням, сертифіковано за ДСТУ IEC
              60076 та ISO 9001.
            </p>

            <div className="mt-8">
              <div
                className="text-foreground text-sm font-semibold"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Технічні характеристики
              </div>
              <dl className="border-border-theme mt-4 overflow-hidden rounded-[12px] border">
                {p.specs.map((s, i) => (
                  <div
                    key={s}
                    className={
                      'flex justify-between gap-4 p-4 ' +
                      (i !== p.specs.length - 1 ? 'border-border-theme border-b' : '')
                    }
                  >
                    <dt className="text-muted-foreground text-sm">Параметр #{i + 1}</dt>
                    <dd
                      className="text-foreground text-sm font-medium tabular-nums"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {s}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <CtaButton
                href={`${ROUTES.contacts}?product=${encodeURIComponent(p.article)}`}
                size="lg"
              >
                Запит ціни
              </CtaButton>
              <CtaButton href={ROUTES.contacts} variant="ghost" size="lg" icon={false}>
                Технічна консультація
              </CtaButton>
            </div>
          </div>
        </div>
      </Section>
      <Section padding="compact" alt className="!pb-[120px]">
        <h3
          className="text-foreground m-0 text-[28px] font-bold"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Схожі товари
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS_FALLBACK.filter((x) => x.categorySlug === p.categorySlug && x.slug !== p.slug)
            .slice(0, 3)
            .map((r) => (
              <Link
                key={r.slug}
                href={`${ROUTES.products}/${r.categorySlug}/${r.slug}`}
                className="bg-surface border-border-theme hover:border-border-strong rounded-[20px] border p-6 transition-all hover:-translate-y-1"
              >
                <div
                  className="text-faint-foreground text-xs"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {r.desc}
                </div>
                <div
                  className="text-foreground mt-1 text-[20px] font-bold tracking-[-0.02em]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {r.title}
                </div>
              </Link>
            ))}
        </div>
      </Section>
    </>
  );
}
