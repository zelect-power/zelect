import type { ReactNode } from 'react';

interface Props {
  id?: string;
  children: ReactNode;
  alt?: boolean; // alt-фон (bgAlt) + верхняя граница
  className?: string;
  padding?: 'regular' | 'compact' | 'hero-bottom';
}

const padClass: Record<NonNullable<Props['padding']>, string> = {
  regular: 'py-[120px] px-10',
  compact: 'py-20 px-10',
  'hero-bottom': 'pt-10 pb-[120px] px-10',
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
  return (
    <h2
      className={`text-foreground m-0 leading-[1.02] font-bold tracking-[-0.03em] ${className}`}
      style={{ fontSize: size, textWrap: 'balance' }}
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
