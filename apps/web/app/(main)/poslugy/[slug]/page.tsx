import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { IcCheck } from '@/components/icons';
import { CtaButton } from '@/components/ui/cta-button';
import { SERVICES_FALLBACK } from '@/lib/fallback';
import { ROUTES } from '@/lib/routes';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES_FALLBACK.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const s = SERVICES_FALLBACK.find((x) => x.slug === slug);
  if (!s) return { title: 'Послуга не знайдена' };
  return { title: s.title, description: s.summary };
}

export default async function ServiceDetail({ params }: Props) {
  const { slug } = await params;
  const s = SERVICES_FALLBACK.find((x) => x.slug === slug);
  if (!s) notFound();

  return (
    <>
      <PageHeader eyebrow={`Послуга · ${s.n}`} title={s.title} sub={s.summary} />
      <Section padding="compact">
        <Breadcrumbs
          items={[
            { label: 'Головна', href: ROUTES.home },
            { label: 'Послуги', href: ROUTES.services },
            { label: s.title },
          ]}
        />
      </Section>
      <Section padding="compact" className="!pt-8 !pb-[120px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="prose max-w-none">
            <h3
              className="text-foreground m-0 text-[24px] font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Що входить у послугу
            </h3>
            <ul className="mt-5 flex flex-col gap-3 p-0">
              {s.bullets.map((b) => (
                <li key={b} className="text-muted-foreground flex gap-3 text-[15px] leading-[1.55]">
                  <span className="text-brand-theme mt-0.5 flex-shrink-0">
                    <IcCheck size={16} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-8 text-[15px] leading-[1.6]">
              Усі роботи виконують наші інженерні бригади з сертифікатами Держенергонагляду.
              Гарантія 12 місяців на пусконалагоджувальні роботи та до 36 місяців на обладнання.
            </p>
          </div>
          <div className="bg-surface border-border-theme rounded-[20px] border p-6 md:p-8">
            <div
              className="text-foreground text-[18px] font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Обговорити проєкт
            </div>
            <p className="text-muted-foreground mt-3 text-sm leading-[1.55]">
              Надішлемо попередній розрахунок за 24 години та узгодимо графік робіт.
            </p>
            <div className="mt-6">
              <CtaButton href={ROUTES.contacts} size="lg">
                Залишити запит
              </CtaButton>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
