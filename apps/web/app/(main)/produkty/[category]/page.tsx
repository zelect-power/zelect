import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { CtaButton } from '@/components/ui/cta-button';
import { CATEGORIES_FALLBACK } from '@/lib/fallback';
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
    description: cat.description[0] ?? `${cat.title} — каталог Zelect Power.`,
  };
}

// ICECAT-369 — страница категории: описание вместо карточек товаров.
export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES_FALLBACK.find((c) => c.slug === category);
  if (!cat) notFound();

  return (
    <>
      <PageHeader eyebrow="Продукти · категорія" title={cat.title} sub={cat.subtitle} />
      <Section padding="compact">
        <Breadcrumbs
          items={[
            { label: 'Головна', href: ROUTES.home },
            { label: 'Продукти', href: ROUTES.products },
            { label: cat.title },
          ]}
        />
      </Section>
      <Section padding="compact" className="!pt-6 !pb-[120px]">
        <article className="bg-surface border-border-theme max-w-[900px] rounded-[20px] border p-8">
          <div className="text-muted-foreground flex flex-col gap-3 text-[16px] leading-[1.65]">
            {cat.description.map((line, i) => (
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
