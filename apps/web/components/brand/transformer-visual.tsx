import { useId } from 'react';

interface Props {
  size?: number;
}

// Изометрическая иллюстрация трансформатора для hero. Переведена из прототипа.
// Цвета контура/фона привязаны к CSS-переменным темы.
export function TransformerVisual({ size = 520 }: Props) {
  const rawId = useId();
  const id = rawId.replace(/[^a-z0-9]/gi, '');
  const gradientId = `tv-${id}`;
  const glowId = `tvg-${id}`;
  return (
    <svg width={size} height={size} viewBox="0 0 520 520" fill="none" aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="520">
          <stop offset="0" stopColor="#52b884" />
          <stop offset="0.5" stopColor="#0f7a52" />
          <stop offset="1" stopColor="#06563c" />
        </linearGradient>
        <radialGradient id={glowId} cx="0.7" cy="0.3" r="0.7">
          <stop offset="0" stopColor="#52b884" stopOpacity="0.35" />
          <stop offset="1" stopColor="#52b884" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* glow */}
      <circle cx="340" cy="180" r="240" fill={`url(#${glowId})`} />
      {/* base platform */}
      <path
        d="M60 400 L260 490 L460 400 L260 310 Z"
        fill="var(--color-surface-2)"
        stroke="var(--color-border-strong)"
        strokeWidth="1"
      />
      <path d="M60 400 L260 490 L460 400 L260 310 Z" fill="none" stroke="var(--color-border)" />
      {/* tank body */}
      <path
        d="M150 180 L150 380 L260 440 L370 380 L370 180 L260 120 Z"
        fill="var(--color-background-soft)"
        stroke="var(--color-border-strong)"
        strokeWidth="1.5"
      />
      <path d="M260 120 L260 440" stroke="var(--color-border)" strokeWidth="1" />
      <path
        d="M150 180 L260 240 L370 180"
        stroke="var(--color-border-strong)"
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M260 240 L260 440" stroke="var(--color-border-strong)" strokeWidth="1" />
      {/* radiator fins */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={`L${i}`}
          d={`M150 ${210 + i * 30} L110 ${200 + i * 30} L110 ${220 + i * 30} L150 ${230 + i * 30} Z`}
          fill="var(--color-bg-soft)"
          stroke="var(--color-border)"
        />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={`R${i}`}
          d={`M370 ${210 + i * 30} L410 ${200 + i * 30} L410 ${220 + i * 30} L370 ${230 + i * 30} Z`}
          fill="var(--color-bg-soft)"
          stroke="var(--color-border)"
        />
      ))}
      {/* HV bushings */}
      {[180, 230, 280].map((x) => (
        <g key={x}>
          <path
            d={`M${x} 120 L${x - 14} 100 L${x - 14} 60 L${x + 14} 50 L${x + 14} 90 Z`}
            fill={`url(#${gradientId})`}
            opacity="0.9"
          />
          <circle cx={x} cy={55} r="8" fill="#52b884" />
        </g>
      ))}
      {/* nameplate */}
      <rect
        x="200"
        y="290"
        width="80"
        height="48"
        rx="2"
        fill="var(--color-background)"
        stroke="var(--color-border-strong)"
      />
      <rect x="208" y="298" width="40" height="3" fill="#52b884" />
      <rect x="208" y="306" width="64" height="2" fill="var(--color-text-dim)" />
      <rect x="208" y="312" width="58" height="2" fill="var(--color-text-dim)" />
      <rect x="208" y="318" width="50" height="2" fill="var(--color-text-dim)" />
      <rect x="208" y="324" width="44" height="2" fill="var(--color-text-dim)" />
      {/* accent */}
      <rect x="150" y="175" width="220" height="4" fill={`url(#${gradientId})`} />
    </svg>
  );
}
