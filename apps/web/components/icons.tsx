import type { ReactNode } from 'react';

interface IconProps {
  size?: number;
  stroke?: number;
  className?: string;
}

function Ic({
  children,
  size = 24,
  stroke = 1.5,
  className = '',
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

export const IcArrow = (p: IconProps) => (
  <Ic {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Ic>
);

export const IcArrowUR = (p: IconProps) => (
  <Ic {...p}>
    <path d="M7 17L17 7M8 7h9v9" />
  </Ic>
);

export const IcBolt = (p: IconProps) => (
  <Ic {...p}>
    <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
  </Ic>
);

export const IcTransformer = (p: IconProps) => (
  <Ic {...p}>
    <rect x="4" y="6" width="16" height="12" rx="1" />
    <path d="M8 6V3M16 6V3M8 21v-3M16 21v-3M4 10h2M4 14h2M18 10h2M18 14h2" />
    <path d="M10 10l2 2 2-2M10 14l2-2 2 2" />
  </Ic>
);

export const IcCabinet = (p: IconProps) => (
  <Ic {...p}>
    <rect x="5" y="3" width="14" height="18" rx="1" />
    <path d="M9 7h6M9 11h6M9 15h3" />
    <circle cx="16" cy="15" r="1" />
  </Ic>
);

export const IcGrid = (p: IconProps) => (
  <Ic {...p}>
    <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />
  </Ic>
);

export const IcCable = (p: IconProps) => (
  <Ic {...p}>
    <path d="M4 20c4 0 4-8 8-8s4 8 8 8" />
    <circle cx="4" cy="20" r="1.5" />
    <circle cx="20" cy="20" r="1.5" />
  </Ic>
);

export const IcSub = (p: IconProps) => (
  <Ic {...p}>
    <path d="M3 21h18M6 21V10m12 11V10M9 10V6l3-3 3 3v4" />
    <path d="M3 14h18" />
  </Ic>
);

export const IcShield = (p: IconProps) => (
  <Ic {...p}>
    <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
  </Ic>
);

export const IcCog = (p: IconProps) => (
  <Ic {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
  </Ic>
);

export const IcWrench = (p: IconProps) => (
  <Ic {...p}>
    <path d="M14.7 6.3a4 4 0 015.6 5.6l-11 11a2.8 2.8 0 01-4-4l11-11a4 4 0 01-1.6-1.6z" />
  </Ic>
);

export const IcHard = (p: IconProps) => (
  <Ic {...p}>
    <path d="M3 18h18v2H3zM5 18V12a7 7 0 0114 0v6M9 12V7M15 12V7" />
  </Ic>
);

export const IcClock = (p: IconProps) => (
  <Ic {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Ic>
);

export const IcDoc = (p: IconProps) => (
  <Ic {...p}>
    <path d="M6 2h9l5 5v15H6z" />
    <path d="M14 2v6h6M9 13h6M9 17h6M9 9h2" />
  </Ic>
);

export const IcSpark = (p: IconProps) => (
  <Ic {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
  </Ic>
);

export const IcFactory = (p: IconProps) => (
  <Ic {...p}>
    <path d="M3 21h18M4 21V10l5 3V10l5 3V7l6 3v11" />
    <path d="M8 17h1M13 17h1M18 17h1" />
  </Ic>
);

export const IcBuild = (p: IconProps) => (
  <Ic {...p}>
    <path d="M4 21V7l8-4 8 4v14" />
    <path d="M9 21v-6h6v6M9 10h2M13 10h2M9 14h2M13 14h2" />
  </Ic>
);

export const IcCheck = (p: IconProps) => (
  <Ic {...p}>
    <path d="M4 12l5 5L20 6" />
  </Ic>
);
