import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'solid';
type Size = 'sm' | 'md' | 'lg';

interface Base {
  variant?: Variant;
  size?: Size;
  icon?: boolean;
  children: ReactNode;
}

type AnchorProps = Base & Omit<ComponentProps<typeof Link>, 'children'>;

const sizeClass: Record<Size, string> = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-5 text-sm',
  lg: 'h-[52px] px-[26px] text-[15px]',
};

const variantClass: Record<Variant, string> = {
  primary:
    'text-white shadow-[0_6px_16px_rgb(15_122_82/0.22)] hover:shadow-[0_12px_30px_rgb(15_122_82/0.35)]',
  ghost: 'border border-border-strong text-foreground hover:bg-background-soft',
  solid: 'bg-foreground text-background',
};

// Unified CTA button. Rendered as a Next.js Link — href is required.
export function CtaButton({
  variant = 'primary',
  size = 'md',
  icon = true,
  children,
  className = '',
  ...rest
}: AnchorProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-transform hover:-translate-y-px';
  const style = variant === 'primary' ? { background: 'var(--gradient-brand)' } : undefined;

  return (
    <Link
      className={`${base} ${sizeClass[size]} ${variantClass[variant]} ${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
      {icon && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      )}
    </Link>
  );
}
