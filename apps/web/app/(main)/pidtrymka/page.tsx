import type { ReactNode } from 'react';

import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { FAQ } from '@/components/common/faq';
import { PageHeader } from '@/components/common/page-header';
import { Eyebrow, H2, Section } from '@/components/common/section';
import { IcDoc, IcMail, IcPhone } from '@/components/icons';
import { FAQ_FALLBACK, SUPPORT_CHANNELS } from '@/lib/fallback';
import { ROUTES } from '@/lib/routes';

const CHANNEL_ICON: Record<string, ReactNode> = {
  phone: <IcPhone size={22} />,
  mail: <IcMail size={22} />,
  doc: <IcDoc size={22} />,
};

export const metadata = {
  title: 'Підтримка 24/7',
  description:
    'Сервіс без вихідних. Власна служба з бригадами у 5 регіонах, склад критичних запчастин, віддалений моніторинг і SLA у контракті.',
};

export default function SupportPage() {
  return (
    <>
      <PageHeader
        eyebrow="Підтримка · 24/7"
        title="Сервіс, який працює без вихідних"
        sub="Власна сервісна служба з бригадами у 5 регіонах, склад критичних запчастин, віддалений моніторинг і SLA у контракті."
      />
      <Section padding="compact">
        <Breadcrumbs items={[{ label: 'Головна', href: ROUTES.home }, { label: 'Підтримка' }]} />
      </Section>
      <Section padding="compact" className="!pt-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {SUPPORT_CHANNELS.map((c) => (
            <div key={c.t} className="bg-surface border-border-theme rounded-[20px] border p-7">
              <div className="text-brand-theme">{CHANNEL_ICON[c.icon]}</div>
              <div
                className="text-faint-foreground mt-6 text-xs tracking-[0.1em] uppercase"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {c.t}
              </div>
              <div
                className="text-foreground mt-1.5 text-[28px] font-bold tracking-[-0.02em]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {c.v}
              </div>
              <div className="text-muted-foreground mt-2 text-[13px]">{c.d}</div>
            </div>
          ))}
        </div>
      </Section>
      <Section padding="compact" className="!pt-10 !pb-[120px]">
        <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-[1fr_2fr]">
          <div>
            <Eyebrow>Часті запитання</Eyebrow>
            <H2 size={44} className="mt-5">
              Відповіді за 30 секунд
            </H2>
          </div>
          <FAQ items={FAQ_FALLBACK} />
        </div>
      </Section>
    </>
  );
}
