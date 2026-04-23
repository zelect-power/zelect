import type { ReactNode } from 'react';

import { Eyebrow, H2, Section } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { IcClock, IcFactory, IcHard, IcShield } from '@/components/icons';

interface Item {
  t: string;
  d: string;
  ic: ReactNode;
}

const ITEMS: Item[] = [
  {
    // ICECAT-367 — компанія є постачальником, а не виробником.
    t: 'Постачання',
    d: 'Прямі контракти з виробниками. Контроль якості на кожному етапі — від вхідного приймання до монтажу на об’єкті.',
    ic: <IcFactory size={22} />,
  },
  {
    t: 'Сертифіковано',
    d: 'ДСТУ IEC 60076, ISO 9001, сертифікати відповідності для держзакупівель Prozorro.',
    ic: <IcShield size={22} />,
  },
  {
    t: 'Інженерна експертиза',
    d: 'Команда інженерів із досвідом роботи з Укренерго, обленерго та промисловими підприємствами.',
    ic: <IcHard size={22} />,
  },
  {
    t: 'Швидкість реакції',
    d: 'Проєктування за 2-4 тижні. Аварійна поставка зі складу за 24 години.',
    ic: <IcClock size={22} />,
  },
];

export function HomeWhy() {
  return (
    <Section alt>
      <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-[1fr_2fr]">
        <div>
          <Eyebrow>Чому Zelect Power</Eyebrow>
          <H2 size={48} className="mt-5">
            Стратегічний партнер для критичної інфраструктури
          </H2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {ITEMS.map((x, i) => (
            <Reveal key={x.t} delay={i * 80}>
              <div>
                <div className="bg-surface border-border-theme text-brand-theme inline-flex h-14 w-14 items-center justify-center rounded-[14px] border">
                  {x.ic}
                </div>
                <div
                  className="text-foreground mt-5 text-[22px] font-bold tracking-[-0.015em]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {x.t}
                </div>
                <div className="text-muted-foreground mt-2 max-w-[360px] text-sm leading-[1.6]">
                  {x.d}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
