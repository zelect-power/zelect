import Image from 'next/image';

interface Props {
  size?: number;
  className?: string;
}

// ICECAT-374 — Z-монограмма из архива клиента `/logo ZP.zip`, с обрезанным
// viewBox (aspect 1.21:1). Используется там, где нет места под полный wordmark.
export function ZPMark({ size = 32, className }: Props) {
  return (
    <Image
      src="/brand/zp-logo-mark.svg"
      alt="Zelect Power"
      width={size}
      height={size}
      priority
      className={className}
    />
  );
}
