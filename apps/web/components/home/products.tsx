import Link from 'next/link';

import { Eyebrow, H2, Lead, Section } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import {
  IcArrowUR,
  IcBolt,
  IcCable,
  IcCabinet,
  IcGrid,
  IcSub,
  IcTransformer,
} from '@/components/icons';
import { ROUTES } from '@/lib/routes';
import type { ReactNode } from 'react';

interface Card {
  icon: ReactNode;
  title: string;
  desc: string;
  specs?: string[];
  featured?: boolean;
}

const CARDS: Card[] = [
  {
    icon: <IcTransformer size={24} />,
    title: 'Силові трансформатори',
    desc: 'Масляні та сухі трансформатори потужністю від 25 кВА до 63 МВА для магістральних та розподільчих мереж.',
    specs: ['25 кВА – 63 МВА', '6 / 10 / 35 / 110 кВ', 'ДСТУ IEC 60076'],
    featured: true,
  },
  {
    icon: <IcCabinet size={24} />,
    title: 'Розподільчі трансформатори',
    desc: 'Герметичні масляні та сухі трансформатори для комунальних мереж і промислових підприємств.',
    specs: ['до 2500 кВА', '10 / 0,4 кВ'],
  },
  {
    icon: <IcGrid size={24} />,
    title: 'КТП',
    desc: 'Комплектні трансформаторні підстанції блочно-модульного типу, у тому числі кіоскові та щоглові.',
    specs: ['КТП, КТПБ, МТП'],
  },
  {
    icon: <IcSub size={24} />,
    title: 'Розподільчі пристрої',
    desc: 'Комірки КРП та КРПЕ середньої напруги, вакуумні вимикачі, схеми з елегазовою ізоляцією.',
    specs: ['6, 10, 35 кВ'],
  },
  {
    icon: <IcBolt size={24} />,
    title: 'Ввідно-розподільчі пристрої',
    desc: 'ВРП та ГРЩ низької напруги для промислових і цивільних об\u2019єктів.',
    specs: ['0,4 кВ', 'до 6300 А'],
  },
  {
    icon: <IcCable size={24} />,
    title: 'Кабельна продукція',
    desc: 'Силові та контрольні кабелі з ізоляцією з ПВХ, XLPE та мідними жилами.',
    specs: ['0,6 / 35 кВ'],
  },
];

function ProductCard({ card }: { card: Card }) {
  const featured = Boolean(card.featured);
  return (
    <Link
      href={ROUTES.products}
      className={`bg-surface border-border-theme hover:border-border-strong group relative overflow-hidden rounded-[20px] border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-lg)] ${
        featured ? 'sm:col-span-2' : ''
      }`}
      style={featured ? { background: 'var(--color-surface-2)' } : undefined}
    >
      {featured && (
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{ background: 'var(--gradient-glow)' }}
        />
      )}
      <div className="relative flex items-start justify-between">
        <div
          className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${
            featured ? 'text-white' : 'bg-background-soft text-brand-theme'
          }`}
          style={featured ? { background: 'var(--gradient-brand)' } : undefined}
        >
          {card.icon}
        </div>
        <div className="text-foreground translate-x-[-4px] translate-y-1 opacity-40 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
          <IcArrowUR size={22} />
        </div>
      </div>
      <div className="relative mt-10">
        <div
          className="text-foreground font-bold tracking-[-0.02em]"
          style={{
            fontSize: featured ? 32 : 22,
            lineHeight: 1.15,
            textWrap: 'balance',
            fontFamily: 'var(--font-heading)',
          }}
        >
          {card.title}
        </div>
        <div
          className={`text-muted-foreground mt-3 text-sm leading-[1.55] ${featured ? 'max-w-[560px]' : ''}`}
          style={{ textWrap: 'pretty' }}
        >
          {card.desc}
        </div>
        {card.specs && (
          <div className="mt-6 flex flex-wrap gap-2">
            {card.specs.map((s) => (
              <span
                key={s}
                className="bg-background-soft border-border-theme text-muted-foreground rounded-lg border px-2.5 py-1.5 text-xs font-medium tabular-nums"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

export function HomeProducts() {
  return (
    <Section id="products">
      <div className="zp-sec-head mb-14 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
        <div>
          <Eyebrow>Продукція</Eyebrow>
          <H2 className="mt-5">
            Повний цикл
            <br />
            енергетичного обладнання
          </H2>
        </div>
        <Lead maxW={420}>
          Шість категорій продукції — від силових трансформаторів 110 кВ до кабельної продукції. Усе
          сертифіковано за українськими та міжнародними стандартами.
        </Lead>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card, i) => (
          <Reveal key={card.title} delay={i * 60}>
            <ProductCard card={card} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
