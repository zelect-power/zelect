import type { ReactNode } from 'react';

interface Props {
  id?: string;
  children: ReactNode;
  alt?: boolean; // alt-фон (bgAlt) + верхняя граница
  className?: string;
  padding?: 'regular' | 'compact' | 'hero-bottom';
}

const padClass: Record<NonNullable<Props['padding']>, string> = {
  regular: 'py-16 px-5 md:py-[120px] md:px-10',
  compact: 'py-12 px-5 md:py-20 md:px-10',
  'hero-bottom': 'pt-8 pb-16 px-5 md:pt-10 md:pb-[120px] md:px-10',
};

export function Section({ id, children, alt = false, className = '', padding = 'regular' }: Props) {
  const bg = alt ? 'bg-background-alt border-t border-border-theme' : 'bg-background';
  return (
    <section id={id} className={`relative overflow-hidden ${bg} ${padClass[padding]} ${className}`}>
      <div className="relative mx-auto max-w-[1440px]">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, dot = true }: { children: ReactNode; dot?: boolean }) {
  return (
    <div className="text-muted-foreground inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase">
      {dot && (
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: 'var(--gradient-brand)' }}
        />
      )}
      {children}
    </div>
  );
}

export function H2({
  children,
  size = 56,
  className = '',
}: {
  children: ReactNode;
  size?: number;
  className?: string;
}) {
  // Mobile → desktop: на 375px шрифт не превышает 30-32px (не даёт overflow),
  // на десктопе — значение `size` как было.
  return (
    <h2
      className={`text-foreground m-0 leading-[1.08] font-bold tracking-[-0.03em] ${className}`}
      style={{
        fontSize: `clamp(28px, 6vw, ${size}px)`,
        textWrap: 'balance',
        wordBreak: 'break-word',
      }}
    >
      {children}
    </h2>
  );
}

export function Lead({
  children,
  maxW = 620,
  className = '',
}: {
  children: ReactNode;
  maxW?: number;
  className?: string;
}) {
  return (
    <p
      className={`text-muted-foreground m-0 text-[18px] leading-[1.55] ${className}`}
      style={{ maxWidth: maxW, textWrap: 'pretty' }}
    >
      {children}
    </p>
  );
}

export function GradText({ children }: { children: ReactNode }) {
  return (
    <span
      className="bg-clip-text text-transparent"
      style={{ backgroundImage: 'var(--gradient-brand)' }}
    >
      {children}
    </span>
  );
}
