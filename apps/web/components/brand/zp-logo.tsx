import Image from 'next/image';

interface Props {
  compact?: boolean;
}

// ICECAT-374 — реальный горизонтальный лого Zelect Power Technology из архива
// клиента `/logo ZP.zip`. SVG с обрезанным viewBox по bbox контента (aspect
// 3.46:1), чтобы при h≈32px Z-mark + wordmark занимали всю высоту без пустот.
// Один SVG на обе темы — зелёный градиент читается и на светлом, и на тёмном.
// Серверный компонент — `useTheme()` больше не нужен.
const ASPECT = 1812 / 524; // viewBox cropped = "54 278 1812 524"

export function ZPLogo({ compact = false }: Props) {
  const h = compact ? 28 : 32;
  const w = Math.round(h * ASPECT);
  return (
    <Image
      src="/brand/zp-logo-horizontal.svg"
      alt="Zelect Power Technology"
      width={w}
      height={h}
      priority
      style={{ height: h, width: w }}
    />
  );
}
