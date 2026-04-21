import Link from 'next/link';
import type { ReactNode } from 'react';

import { Eyebrow, H2, Section } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { IcArrow, IcBuild, IcFactory, IcSub } from '@/components/icons';

interface Case {
  cat: string;
  t: string;
  loc: string;
  y: string;
  mw: string;
  ic: ReactNode;
}

const CASES: Case[] = [
  {
    cat: 'Енергетика',
    t: 'Відновлення підстанції 110/35/10 кВ',
    loc: 'Харківська обл.',
    y: '2025',
    mw: '63 МВА',
    ic: <IcSub size={100} />,
  },
  {
    cat: 'Промисловість',
    t: 'Електропостачання металургійного цеху',
    loc: 'Кривий Ріг',
    y: '2024',
    mw: '40 МВА',
    ic: <IcFactory size={100} />,
  },
  {
    cat: 'Державний сектор',
    t: 'Резервне живлення лікарняного комплексу',
    loc: 'Київ',
    y: '2024',
    mw: '4,2 МВА',
    ic: <IcBuild size={100} />,
  },
];

export function HomeCases() {
  return (
    <Section>
      <div className="mb-12 flex flex-wrap items-end justify-between gap-10">
        <div>
          <Eyebrow>Реалізовані проєкти</Eyebrow>
          <H2 className="mt-5">
            Інфраструктура,
            <br />
            яка вже працює
          </H2>
        </div>
        <Link
          href="#"
          className="text-foreground border-border-strong inline-flex items-center gap-2 border-b pb-1.5 text-sm font-semibold"
        >
          Усі кейси <IcArrow size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CASES.map((c, i) => (
          <Reveal key={c.t} delay={i * 80}>
            <div className="bg-surface border-border-theme hover:border-border-strong cursor-pointer overflow-hidden rounded-[20px] border transition-all hover:-translate-y-1">
              <div
                className="relative flex items-center justify-center overflow-hidden"
                style={{
                  aspectRatio: '16 / 10',
                  background:
                    'linear-gradient(135deg, var(--color-background-soft) 0%, var(--color-bg-soft) 100%)',
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-50"
                  style={{ background: 'var(--gradient-glow)' }}
                />
                <div className="text-brand-theme relative opacity-80">{c.ic}</div>
                <div className="bg-surface border-border-theme text-muted-foreground absolute top-5 left-5 rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase">
                  {c.cat}
                </div>
              </div>
              <div className="p-6">
                <div
                  className="text-foreground text-[20px] leading-[1.2] font-bold tracking-[-0.015em]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {c.t}
                </div>
                <div className="border-border-theme text-faint-foreground mt-5 flex justify-between gap-3 border-t pt-5 text-xs">
                  <span>{c.loc}</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{c.mw}</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{c.y}</span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
