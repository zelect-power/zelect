import Link from 'next/link';

import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { CtaButton } from '@/components/ui/cta-button';
import { CATEGORIES_FALLBACK } from '@/lib/fallback';
import { ROUTES } from '@/lib/routes';

type SearchParams = Promise<{ cat?: string }>;

export const metadata = {
  title: 'Продукти · каталог',
  description:
    'Силові трансформатори 6(10) кВ — масляні ТМ, герметичні ТМГ, сухі ТС, а також розподільчі трансформатори, КТП та розподільчі пристрої.',
};

interface Props {
  searchParams: SearchParams;
}

// ICECAT-369 — по умолчанию активна первая категория (Силові трансформатори).
// Кнопка «Усі категорії» убрана. Для каждой категории показывается описание,
// карточки товаров не рендерятся, пока номенклатура не заведена в CMS.
export default async function ProductsPage({ searchParams }: Props) {
  const { cat } = await searchParams;
  const active = CATEGORIES_FALLBACK.find((c) => c.slug === cat) ?? CATEGORIES_FALLBACK[0];

  return (
    <>
      <PageHeader
        eyebrow="Продукти · каталог"
        title="Енергетичне обладнання від 0,4 до 110 кВ"
        sub="Постачання під технічне завдання з дотриманням українських та міжнародних стандартів."
      />
      <Section padding="compact">
        <Breadcrumbs items={[{ label: 'Головна', href: ROUTES.home }, { label: 'Продукти' }]} />
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES_FALLBACK.map((c) => {
            const isActive = c.slug === active.slug;
            return (
              <Link
                key={c.slug}
                href={`${ROUTES.products}?cat=${c.slug}`}
                className={
                  'rounded-full border px-4 py-2.5 text-[13px] font-medium transition-all ' +
                  (isActive
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
      <Section padding="compact" className="!pt-6 !pb-[120px]">
        <article className="bg-surface border-border-theme max-w-[900px] rounded-[20px] border p-8">
          <h2
            className="text-foreground m-0 text-[32px] font-bold tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {active.title}
          </h2>
          {active.subtitle && (
            <div className="text-brand-theme mt-3 text-[15px] font-semibold">{active.subtitle}</div>
          )}
          <div className="text-muted-foreground mt-6 flex flex-col gap-3 text-[16px] leading-[1.65]">
            {active.description.map((line, i) => (
              <p key={i} className="m-0">
                {line}
              </p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaButton href={ROUTES.contacts} size="lg">
              Отримати пропозицію
            </CtaButton>
            <CtaButton href="tel:+380800300500" variant="ghost" size="lg" icon={false}>
              0 800 300 500
            </CtaButton>
          </div>
        </article>
      </Section>
    </>
  );
}
