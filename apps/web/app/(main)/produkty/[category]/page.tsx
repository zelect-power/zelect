import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { IcArrowUR } from '@/components/icons';
import { CATEGORIES_FALLBACK, PRODUCTS_FALLBACK } from '@/lib/fallback';
import { ROUTES } from '@/lib/routes';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES_FALLBACK.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES_FALLBACK.find((c) => c.slug === category);
  if (!cat) return { title: 'Категорія не знайдена' };
  return {
    title: cat.title,
    description: `${cat.title} — каталог Zelect Power. Виготовлення та постачання в Україні.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES_FALLBACK.find((c) => c.slug === category);
  if (!cat) notFound();

  const items = PRODUCTS_FALLBACK.filter((p) => p.categorySlug === category);

  return (
    <>
      <PageHeader eyebrow="Продукти · категорія" title={cat.title} />
      <Section padding="compact">
        <Breadcrumbs
          items={[
            { label: 'Головна', href: ROUTES.home },
            { label: 'Продукти', href: ROUTES.products },
            { label: cat.title },
          ]}
        />
      </Section>
      <Section padding="compact" className="!pt-5 !pb-[120px]">
        {items.length === 0 ? (
          <p className="text-muted-foreground">Каталог цієї категорії ще наповнюється.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <Link
                key={p.slug}
                href={`${ROUTES.products}/${p.categorySlug}/${p.slug}`}
                className="bg-surface border-border-theme hover:border-border-strong group rounded-[20px] border p-7 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
              >
                <div
                  className="text-faint-foreground mt-8 text-xs tracking-[0.06em]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {p.desc}
                </div>
                <div
                  className="text-foreground mt-1.5 text-[24px] font-bold tracking-[-0.02em]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {p.title}
                </div>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.specs.map((s) => (
                    <span
                      key={s}
                      className="bg-background-soft border-border-theme text-muted-foreground rounded-md border px-2.5 py-1 text-[11px]"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="border-border-theme mt-6 flex items-center justify-between border-t pt-5">
                  <span className="text-foreground text-[13px] font-medium">Технічні дані</span>
                  <IcArrowUR size={18} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
