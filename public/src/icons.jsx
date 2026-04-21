// Stroke-only line icons, 24x24, currentColor. Minimal, engineering feel.
const Ic = ({ children, size = 24, stroke = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const IcArrow = (p) => <Ic {...p}><path d="M5 12h14M13 6l6 6-6 6"/></Ic>;
const IcArrowUR = (p) => <Ic {...p}><path d="M7 17L17 7M8 7h9v9"/></Ic>;
const IcBolt = (p) => <Ic {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></Ic>;
const IcTransformer = (p) => <Ic {...p}>
  <rect x="4" y="6" width="16" height="12" rx="1"/>
  <path d="M8 6V3M16 6V3M8 21v-3M16 21v-3M4 10h2M4 14h2M18 10h2M18 14h2"/>
  <path d="M10 10l2 2 2-2M10 14l2-2 2 2"/>
</Ic>;
const IcCabinet = (p) => <Ic {...p}>
  <rect x="5" y="3" width="14" height="18" rx="1"/>
  <path d="M9 7h6M9 11h6M9 15h3"/>
  <circle cx="16" cy="15" r="1"/>
</Ic>;
const IcGrid = (p) => <Ic {...p}>
  <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"/>
</Ic>;
const IcCable = (p) => <Ic {...p}>
  <path d="M4 20c4 0 4-8 8-8s4 8 8 8"/>
  <circle cx="4" cy="20" r="1.5"/>
  <circle cx="20" cy="20" r="1.5"/>
</Ic>;
const IcSub = (p) => <Ic {...p}>
  <path d="M3 21h18M6 21V10m12 11V10M9 10V6l3-3 3 3v4"/>
  <path d="M3 14h18"/>
</Ic>;
const IcShield = (p) => <Ic {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/></Ic>;
const IcCog = (p) => <Ic {...p}>
  <circle cx="12" cy="12" r="3"/>
  <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>
</Ic>;
const IcWrench = (p) => <Ic {...p}><path d="M14.7 6.3a4 4 0 015.6 5.6l-11 11a2.8 2.8 0 01-4-4l11-11a4 4 0 01-1.6-1.6z"/></Ic>;
const IcHard = (p) => <Ic {...p}>
  <path d="M3 18h18v2H3zM5 18V12a7 7 0 0114 0v6M9 12V7M15 12V7"/>
</Ic>;
const IcPhone = (p) => <Ic {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></Ic>;
const IcMail = (p) => <Ic {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></Ic>;
const IcPin = (p) => <Ic {...p}><path d="M12 22s7-7 7-12a7 7 0 00-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></Ic>;
const IcSun = (p) => <Ic {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></Ic>;
const IcMoon = (p) => <Ic {...p}><path d="M20 14A8 8 0 0110 4a8 8 0 1010 10z"/></Ic>;
const IcGlobe = (p) => <Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/></Ic>;
const IcCheck = (p) => <Ic {...p}><path d="M4 12l5 5L20 6"/></Ic>;
const IcMenu = (p) => <Ic {...p}><path d="M3 6h18M3 12h18M3 18h18"/></Ic>;
const IcClose = (p) => <Ic {...p}><path d="M5 5l14 14M19 5L5 19"/></Ic>;
const IcPlus = (p) => <Ic {...p}><path d="M12 5v14M5 12h14"/></Ic>;
const IcMinus = (p) => <Ic {...p}><path d="M5 12h14"/></Ic>;
const IcClock = (p) => <Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Ic>;
const IcDoc = (p) => <Ic {...p}><path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h6M9 17h6M9 9h2"/></Ic>;
const IcSpark = (p) => <Ic {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></Ic>;
const IcFactory = (p) => <Ic {...p}>
  <path d="M3 21h18M4 21V10l5 3V10l5 3V7l6 3v11"/>
  <path d="M8 17h1M13 17h1M18 17h1"/>
</Ic>;
const IcBuild = (p) => <Ic {...p}>
  <path d="M4 21V7l8-4 8 4v14"/>
  <path d="M9 21v-6h6v6M9 10h2M13 10h2M9 14h2M13 14h2"/>
</Ic>;

Object.assign(window, {
  IcArrow, IcArrowUR, IcBolt, IcTransformer, IcCabinet, IcGrid, IcCable, IcSub,
  IcShield, IcCog, IcWrench, IcHard, IcPhone, IcMail, IcPin, IcSun, IcMoon,
  IcGlobe, IcCheck, IcMenu, IcClose, IcPlus, IcMinus, IcClock, IcDoc, IcSpark,
  IcFactory, IcBuild,
});
