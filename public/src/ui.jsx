// Reusable UI primitives + shared home building blocks
const { useState: useS, useEffect: useE, useRef: useR } = React;

function Section({ theme, bg, children, pad = '120px 40px', id }) {
  const t = window.ZP_THEMES[theme];
  return (
    <section id={id} style={{
      background: bg || t.bg, padding: pad,
      borderTop: bg ? `1px solid ${t.border}` : 'none',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative' }}>
        {children}
      </div>
    </section>
  );
}

function Eyebrow({ children, theme, dot = true }) {
  const t = window.ZP_THEMES[theme];
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      fontFamily: window.ZP_TOKENS.fontSans, fontSize: 12, fontWeight: 600,
      letterSpacing: '0.14em', textTransform: 'uppercase',
      color: t.textSub,
    }}>
      {dot && <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: window.ZP_TOKENS.gradient,
      }}/>}
      {children}
    </div>
  );
}

function H2({ children, theme, size = 56 }) {
  const t = window.ZP_THEMES[theme];
  return (
    <h2 style={{
      fontFamily: window.ZP_TOKENS.fontHeading,
      fontSize: size, fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.03em',
      color: t.text, margin: 0, textWrap: 'balance',
    }}>{children}</h2>
  );
}

function Lead({ children, theme, maxW = 620 }) {
  const t = window.ZP_THEMES[theme];
  return (
    <p style={{
      fontFamily: window.ZP_TOKENS.fontSans, fontSize: 18, lineHeight: 1.55,
      color: t.textSub, margin: 0, maxWidth: maxW, textWrap: 'pretty',
    }}>{children}</p>
  );
}

// Fade/slide-in on scroll
function Reveal({ children, delay = 0, y = 24 }) {
  const [visible, setVisible] = useS(false);
  const ref = useR();
  useE(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity .7s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .7s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
    }}>{children}</div>
  );
}

// Technical grid background
function TechGrid({ theme, opacity = 1 }) {
  const t = window.ZP_THEMES[theme];
  return (
    <svg aria-hidden style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      opacity, pointerEvents: 'none',
    }}>
      <defs>
        <pattern id={`tg-${theme}`} x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M64 0H0V64" fill="none" stroke={t.gridStroke} strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#tg-${theme})`}/>
    </svg>
  );
}

// Animated counter
function Counter({ to, suffix = '', duration = 1400, theme }) {
  const t = window.ZP_THEMES[theme];
  const [val, setVal] = useS(0);
  const ref = useR();
  useE(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const tick = (n) => {
          const p = Math.min(1, (n - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(eased * to));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <span ref={ref} style={{
      fontFamily: window.ZP_TOKENS.fontHeading, fontWeight: 700,
      fontSize: 72, lineHeight: 1, letterSpacing: '-0.04em',
      color: t.text,
      fontVariantNumeric: 'tabular-nums',
    }}>
      {val.toLocaleString('uk-UA')}{suffix}
    </span>
  );
}

// Gradient-text helper
function GradText({ children }) {
  return (
    <span style={{
      background: window.ZP_TOKENS.gradient,
      WebkitBackgroundClip: 'text', backgroundClip: 'text',
      color: 'transparent',
    }}>{children}</span>
  );
}

// Product placeholder (isometric transformer illustration)
function TransformerVisual({ theme, size = 520 }) {
  const t = window.ZP_THEMES[theme];
  const dark = theme === 'dark';
  const id = React.useId();
  return (
    <svg width={size} height={size} viewBox="0 0 520 520" fill="none">
      <defs>
        <linearGradient id={`tv-${id}`} x1="0" y1="0" x2="0" y2="520">
          <stop offset="0" stopColor="#52b884"/>
          <stop offset="0.5" stopColor="#0f7a52"/>
          <stop offset="1" stopColor="#06563c"/>
        </linearGradient>
        <radialGradient id={`tvg-${id}`} cx="0.7" cy="0.3" r="0.7">
          <stop offset="0" stopColor="#52b884" stopOpacity="0.35"/>
          <stop offset="1" stopColor="#52b884" stopOpacity="0"/>
        </radialGradient>
      </defs>
      {/* glow */}
      <circle cx="340" cy="180" r="240" fill={`url(#tvg-${id})`}/>
      {/* base platform */}
      <path d="M60 400 L260 490 L460 400 L260 310 Z" fill={dark ? '#141c26' : '#f2f3f4'} stroke={t.borderStr} strokeWidth="1"/>
      <path d="M60 400 L260 490 L460 400 L260 310 Z" fill="none" stroke={t.border}/>
      {/* tank body isometric */}
      <path d="M150 180 L150 380 L260 440 L370 380 L370 180 L260 120 Z"
            fill={dark ? '#1a2330' : '#e6e7e9'} stroke={t.borderStr} strokeWidth="1.5"/>
      <path d="M260 120 L260 440" stroke={t.border} strokeWidth="1"/>
      <path d="M150 180 L260 240 L370 180" stroke={t.borderStr} strokeWidth="1.5" fill="none"/>
      <path d="M260 240 L260 440" stroke={t.borderStr} strokeWidth="1"/>
      {/* radiator fins left */}
      {[0,1,2,3,4].map(i => (
        <path key={i} d={`M150 ${210+i*30} L110 ${200+i*30} L110 ${220+i*30} L150 ${230+i*30} Z`}
              fill={dark ? '#0e141c' : '#d8dadd'} stroke={t.border}/>
      ))}
      {[0,1,2,3,4].map(i => (
        <path key={i} d={`M370 ${210+i*30} L410 ${200+i*30} L410 ${220+i*30} L370 ${230+i*30} Z`}
              fill={dark ? '#0e141c' : '#d8dadd'} stroke={t.border}/>
      ))}
      {/* HV bushings top */}
      {[180, 230, 280].map((x, i) => (
        <g key={i}>
          <path d={`M${x} 120 L${x-14} 100 L${x-14} 60 L${x+14} 50 L${x+14} 90 Z`}
                fill={`url(#tv-${id})`} opacity="0.9"/>
          <circle cx={x} cy={55} r="8" fill="#52b884"/>
        </g>
      ))}
      {/* nameplate */}
      <rect x="200" y="290" width="80" height="48" rx="2" fill={dark ? '#070a0f' : '#fff'} stroke={t.borderStr}/>
      <rect x="208" y="298" width="40" height="3" fill="#52b884"/>
      <rect x="208" y="306" width="64" height="2" fill={t.textDim}/>
      <rect x="208" y="312" width="58" height="2" fill={t.textDim}/>
      <rect x="208" y="318" width="50" height="2" fill={t.textDim}/>
      <rect x="208" y="324" width="44" height="2" fill={t.textDim}/>
      {/* accent corner gradient bar */}
      <rect x="150" y="175" width="220" height="4" fill={`url(#tv-${id})`}/>
    </svg>
  );
}

Object.assign(window, {
  Section, Eyebrow, H2, Lead, Reveal, TechGrid, Counter, GradText, TransformerVisual,
});
