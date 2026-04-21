import type { ReactNode } from 'react';

import { Eyebrow } from '@/components/common/section';
import { TechGrid } from '@/components/common/tech-grid';

interface Props {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
}

export function PageHeader({ eyebrow, title, sub }: Props) {
  return (
    <section className="bg-background border-border-theme relative overflow-hidden border-b px-10 pt-[60px] pb-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'var(--color-hero-overlay)' }}
      />
      <TechGrid opacity={0.5} />
      <div className="relative mx-auto max-w-[1440px]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1
          className="text-foreground m-0 mt-5 max-w-[1000px] font-bold"
          style={{
            fontSize: 'clamp(44px, 5.5vw, 80px)',
            lineHeight: 1.0,
            letterSpacing: '-0.035em',
            textWrap: 'balance',
          }}
        >
          {title}
        </h1>
        {sub && (
          <p className="text-muted-foreground mt-6 max-w-[720px] text-[20px] leading-[1.5]">
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}
