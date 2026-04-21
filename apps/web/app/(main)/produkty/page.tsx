import Link from 'next/link';

import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { IcArrowUR } from '@/components/icons';
import { CATEGORIES_FALLBACK, PRODUCTS_FALLBACK } from '@/lib/fallback';
import { ROUTES } from '@/lib/routes';

type SearchParams = Promise<{ cat?: string }>;

export const metadata = {
  title: 'Продукти · каталог',
  description:
    'Енергетичне обладнання від 0,4 до 110 кВ. Виготовлення за індивідуальним технічним завданням, сертифіковане для держзакупівель Prozorro.',
};

interface Props {
  searchParams: SearchParams;
}

export default async function ProductsPage({ searchParams }: Props) {
  const { cat } = await searchParams;
  const activeCat = cat ?? 'all';

  const cats = [{ slug: 'all', title: 'Усі категорії' }, ...CATEGORIES_FALLBACK];
  const items =
    activeCat === 'all'
      ? PRODUCTS_FALLBACK
      : PRODUCTS_FALLBACK.filter((p) => p.categorySlug === activeCat);

  return (
    <>
      <PageHeader
        eyebrow="Продукти · каталог"
        title="Енергетичне обладнання від 0,4 до 110 кВ"
        sub="Виготовлення за індивідуальним технічним завданням, сертифіковане для держзакупівель Prozorro та міжнародного експорту."
      />
      <Section padding="compact">
        <Breadcrumbs items={[{ label: 'Головна', href: ROUTES.home }, { label: 'Продукти' }]} />
        <div className="mt-6 flex flex-wrap gap-2">
          {cats.map((c) => {
            const active = c.slug === activeCat;
            const href = c.slug === 'all' ? ROUTES.products : `${ROUTES.products}?cat=${c.slug}`;
            return (
              <Link
                key={c.slug}
                href={href}
                className={
                  'rounded-full border px-4 py-2.5 text-[13px] font-medium transition-all ' +
                  (active
                    ? 'bg-foreground border-foreground text-background'
                    : 'border-border-theme text-foreground hover:border-border-strong')
                }
              >
                {c.title}
              </Link>
            );
          })}
        </div>
      </Section>
      <Section padding="compact" className="!pt-5 !pb-[120px]">
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
      </Section>
    </>
  );
}
