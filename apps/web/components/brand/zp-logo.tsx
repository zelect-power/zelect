'use client';

import Image from 'next/image';

import { useTheme } from '@/components/theme-provider';

interface Props {
  compact?: boolean;
}

// ICECAT-372 — используем реальный горизонтальный лого клиента из
// /home/developer/projects/zelect/logo ZP.zip (SVG с эмблемой и wordmark
// «Zelect Power Technology» внутри). Тема переключает светлый / тёмный
// вариант, чтобы лого читался и на светлом, и на тёмном фоне.
export function ZPLogo({ compact = false }: Props) {
  const { resolved } = useTheme();
  const src =
    resolved === 'dark'
      ? '/brand/zp-logo-horizontal-dark.svg'
      : '/brand/zp-logo-horizontal-light.svg';
  const h = compact ? 28 : 36;
  // Исходный viewBox 1920×1080 → aspect 16:9.
  const w = Math.round(h * (1920 / 1080));
  return (
    <Image
      src={src}
      alt="Zelect Power Technology"
      width={w}
      height={h}
      priority
      className="h-auto w-auto"
      style={{ height: h, width: w }}
    />
  );
}
