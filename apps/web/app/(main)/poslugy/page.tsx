import Link from 'next/link';

import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { IcBuild, IcCheck, IcCog, IcDoc, IcFactory, IcSpark, IcWrench } from '@/components/icons';
import { SERVICES_FALLBACK } from '@/lib/fallback';
import { ROUTES } from '@/lib/routes';

const ICON: Record<string, (p: { size?: number }) => React.ReactElement> = {
  doc: (p) => <IcDoc {...p} />,
  factory: (p) => <IcFactory {...p} />,
  build: (p) => <IcBuild {...p} />,
  spark: (p) => <IcSpark {...p} />,
  wrench: (p) => <IcWrench {...p} />,
  cog: (p) => <IcCog {...p} />,
};

export const metadata = {
  title: 'Послуги',
  description:
    "Життєвий цикл енергооб'єкта під одним контрактом: проєктування, виробництво, монтаж, пусконалагодження, сервіс, модернізація.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Послуги"
        title="Життєвий цикл енергооб'єкта — під одним контрактом"
        sub="Від технічного завдання до багаторічного сервісу. Усе реалізують наші інженерні команди, а не підрядники."
      />
      <Section padding="compact">
        <Breadcrumbs items={[{ label: 'Головна', href: ROUTES.home }, { label: 'Послуги' }]} />
      </Section>
      <Section padding="compact" className="!pt-8 !pb-[120px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {SERVICES_FALLBACK.map((s) => {
            const Icon = ICON[s.icon] ?? IcCog;
            return (
              <Link
                key={s.slug}
                href={`${ROUTES.services}/${s.slug}`}
                className="bg-surface border-border-theme hover:border-border-strong group flex flex-col gap-6 rounded-[20px] border p-9 transition-all hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="inline-flex h-14 w-14 items-center justify-center rounded-[14px] text-white"
                    style={{ background: 'var(--gradient-brand)' }}
                  >
                    <Icon size={24} />
                  </div>
                  <span
                    className="text-faint-foreground text-[13px]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {s.n}
                  </span>
                </div>
                <div
                  className="text-foreground text-[28px] font-bold tracking-[-0.02em]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {s.title}
                </div>
                <ul className="flex flex-col gap-2.5">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="text-muted-foreground flex gap-2.5 text-sm leading-[1.5]"
                    >
                      <span className="text-brand-theme mt-0.5 flex-shrink-0">
                        <IcCheck size={14} />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Link>
            );
          })}
        </div>
      </Section>
    </>
  );
}
