'use client';

import Image from 'next/image';

import { useTheme } from '@/components/theme-provider';

interface Props {
  size?: number;
  className?: string;
}

// Знак "Z" — реальные логотипы из /home/developer/projects/zelect/logo ZP.zip
// (ICECAT-comment). Два SVG: mark-light для светлой темы, mark-dark для тёмной.
export function ZPMark({ size = 32, className }: Props) {
  const { resolved } = useTheme();
  const src =
    resolved === 'dark' ? '/brand/zp-logo-mark-dark.svg' : '/brand/zp-logo-mark-light.svg';
  return (
    <Image src={src} alt="Zelect Power" width={size} height={size} priority className={className} />
  );
}
