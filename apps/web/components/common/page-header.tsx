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
    <section className="bg-background border-border-theme relative overflow-hidden border-b px-5 pt-[60px] pb-14 md:px-10 md:pb-20">
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
            fontSize: 'clamp(30px, 6.5vw, 80px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            textWrap: 'balance',
            wordBreak: 'break-word',
            hyphens: 'auto',
          }}
        >
          {title}
        </h1>
        {sub && (
          <p className="text-muted-foreground mt-5 max-w-[720px] text-[16px] leading-[1.5] md:mt-6 md:text-[20px]">
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}
