import { useId } from 'react';

interface Props {
  opacity?: number;
  className?: string;
}

// Технический grid-фон из прототипа. Использует CSS-переменную --color-grid-stroke
// (меняется при смене темы).
export function TechGrid({ opacity = 1, className = '' }: Props) {
  const id = useId();
  const patternId = `tg-${id.replace(/[^a-z0-9]/gi, '')}`;
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
    >
      <defs>
        <pattern id={patternId} x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M64 0H0V64" fill="none" stroke="var(--color-grid-stroke)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
