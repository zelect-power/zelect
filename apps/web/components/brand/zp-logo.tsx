import { ZPMark } from '@/components/brand/zp-mark';

interface Props {
  compact?: boolean;
}

export function ZPLogo({ compact = false }: Props) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <ZPMark size={compact ? 26 : 32} />
      {!compact && (
        <span className="flex flex-col gap-0.5 leading-none">
          <span className="text-foreground text-[15px] font-extrabold tracking-[0.04em] uppercase">
            Zelect Power
          </span>
          <span className="text-muted-foreground text-[10px] font-medium tracking-[0.22em] uppercase">
            Technology
          </span>
        </span>
      )}
    </span>
  );
}
