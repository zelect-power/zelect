import { useId } from 'react';

interface Props {
  size?: number;
  className?: string;
}

// Перенесено из public/src/nav.jsx → ZPMark. Градиент бренда, та же геометрия.
export function ZPMark({ size = 32, className }: Props) {
  const id = useId();
  return (
    <svg
      width={size}
      height={size * 0.82}
      viewBox="0 0 120 100"
      fill="none"
      aria-label="Zelect Power"
      className={className}
    >
      <defs>
        <linearGradient
          id={`zpg-${id}`}
          x1="0"
          y1="0"
          x2="0"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#52b884" />
          <stop offset="0.5" stopColor="#0f7a52" />
          <stop offset="1" stopColor="#06563c" />
        </linearGradient>
      </defs>
      <path
        d="M8 10 L98 10 L112 22 L112 36 L42 36 L68 48 L112 48 L112 62 L98 62 L98 88 L8 88 L-4 76 L-4 62 L70 62 L44 50 L8 50 Z"
        fill={`url(#zpg-${id})`}
        opacity="0.95"
      />
      <path
        d="M14 16 L94 16 L106 26 L36 26 L72 46 L106 46 L106 56 L94 56 L94 82 L14 82 L2 72 L72 72 L38 54 L14 54 Z"
        fill="none"
        stroke="#2f9f74"
        strokeWidth="1"
        opacity="0.4"
      />
    </svg>
  );
}
