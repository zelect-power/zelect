import type { ReactNode } from 'react';

import { Eyebrow, H2, Lead, Section } from '@/components/common/section';
import { CtaButton } from '@/components/ui/cta-button';
import { IcBuild, IcCog, IcDoc, IcSpark, IcWrench } from '@/components/icons';
import { ROUTES } from '@/lib/routes';

interface Item {
  n: string;
  t: string;
  d: string;
  ic: ReactNode;
}

const ITEMS: Item[] = [
  {
    n: '01',
    t: 'Проєктування',
    d: 'Розробка технічних рішень, проєктна документація, погодження з Укренерго та обленерго.',
    ic: <IcDoc size={20} />,
  },
  // ICECAT-373 — «Виробництво» убрано: компания — поставщик, не производитель.
  {
    n: '02',
    t: 'Монтаж',
    d: 'Доставка, такелажні роботи, монтаж на об\u2019єкті силами сертифікованих бригад.',
    ic: <IcBuild size={20} />,
  },
  {
    n: '03',
    t: 'Пусконалагодження',
    d: 'Високовольтні випробування, налаштування релейного захисту, введення в експлуатацію.',
    ic: <IcSpark size={20} />,
  },
  {
    n: '04',
    t: 'Сервіс',
    d: 'Планові огляди, діагностика, регламентні роботи з виїздом по всій Україні.',
    ic: <IcWrench size={20} />,
  },
  {
    n: '05',
    t: 'Модернізація',
    d: 'Капітальний ремонт та модернізація обладнання радянського виробництва.',
    ic: <IcCog size={20} />,
  },
];

export function HomeServices() {
  return (
    <Section>
      <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-[120px]">
          <Eyebrow>Послуги</Eyebrow>
          <H2 className="mt-5">
            Повний цикл:
            <br />
            від ТЗ до сервісу
          </H2>
          <div className="mt-6">
            <Lead maxW={420}>
              Ми беремо на себе весь життєвий цикл енергооб&apos;єкта — від проєктних рішень до
              багаторічного сервісного обслуговування.
            </Lead>
          </div>
          <div className="mt-8">
            <CtaButton href={ROUTES.services}>Усі послуги</CtaButton>
          </div>
        </div>
        <div className="border-border-theme bg-border-theme grid grid-cols-1 gap-px overflow-hidden rounded-[20px] border sm:grid-cols-2">
          {ITEMS.map((x) => (
            <div
              key={x.n}
              className="bg-surface hover:bg-surface-2 group flex cursor-pointer flex-col gap-2.5 p-7 transition-colors"
            >
              <div className="text-brand-theme flex items-center justify-between">
                {x.ic}
                <span
                  className="text-faint-foreground text-xs tracking-[0.08em]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {x.n}
                </span>
              </div>
              <div
                className="text-foreground mt-4 text-[19px] font-semibold tracking-[-0.01em]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {x.t}
              </div>
              <div className="text-muted-foreground text-[13px] leading-[1.55]">{x.d}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
