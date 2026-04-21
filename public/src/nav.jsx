// Shared shell: topbar, footer, theme switch
const { useState, useEffect, useRef } = React;

// Logo mark SVG inline (simplified, from zp logo-03/04)
function ZPMark({ size = 32, theme = 'light' }) {
  const g = theme === 'dark'
    ? ['#8fe0b8', '#52b884', '#2f9f74', '#0a6845']
    : ['#52b884', '#2f9f74', '#0f7a52', '#06563c'];
  const id = React.useId();
  return (
    <svg width={size} height={size * 0.82} viewBox="0 0 120 100" fill="none" aria-label="Zelect Power">
      <defs>
        <linearGradient id={`zpg-${id}`} x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={g[0]}/>
          <stop offset="0.5" stopColor={g[2]}/>
          <stop offset="1" stopColor={g[3]}/>
        </linearGradient>
      </defs>
      {/* Outer Z-shape with isometric depth */}
      <path d="M8 10 L98 10 L112 22 L112 36 L42 36 L68 48 L112 48 L112 62 L98 62 L98 88 L8 88 L-4 76 L-4 62 L70 62 L44 50 L8 50 Z"
            fill={`url(#zpg-${id})`} opacity="0.95"/>
      {/* Inner cutout lines to mimic 3D groove */}
      <path d="M14 16 L94 16 L106 26 L36 26 L72 46 L106 46 L106 56 L94 56 L94 82 L14 82 L2 72 L72 72 L38 54 L14 54 Z"
            fill="none" stroke={g[1]} strokeWidth="1" opacity="0.4"/>
    </svg>
  );
}

function ZPLogo({ theme = 'light', compact = false }) {
  const t = window.ZP_THEMES[theme];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <ZPMark size={compact ? 26 : 32} theme={theme} />
      {!compact && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, gap: 2 }}>
          <span style={{
            fontFamily: window.ZP_TOKENS.fontSans,
            fontWeight: 800, fontSize: 15, letterSpacing: '0.04em',
            color: t.text, textTransform: 'uppercase',
          }}>Zelect Power</span>
          <span style={{
            fontFamily: window.ZP_TOKENS.fontSans,
            fontWeight: 500, fontSize: 10, letterSpacing: '0.22em',
            color: t.textSub, textTransform: 'uppercase',
          }}>Technology</span>
        </div>
      )}
    </div>
  );
}

function NavLink({ label, active, onClick, theme, hasDropdown }) {
  const t = window.ZP_THEMES[theme];
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        background: 'none', border: 'none', padding: '22px 2px',
        fontFamily: window.ZP_TOKENS.fontSans,
        fontSize: 14, fontWeight: 500, letterSpacing: '-0.005em',
        color: active ? t.text : (hover ? t.text : t.textSub),
        cursor: 'pointer',
        transition: 'color .18s ease',
        display: 'inline-flex', alignItems: 'center', gap: 4,
      }}>
      {label}
      {hasDropdown && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>}
      <span style={{
        position: 'absolute', left: 0, right: 0, bottom: 14, height: 2,
        background: window.ZP_TOKENS.gradient,
        transform: active ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left center',
        transition: 'transform .25s cubic-bezier(.2,.7,.2,1)',
      }}/>
    </button>
  );
}

function ThemeToggle({ theme, setTheme }) {
  const t = window.ZP_THEMES[theme];
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      title={theme === 'light' ? 'Темна тема' : 'Світла тема'}
      style={{
        width: 36, height: 36, borderRadius: 10,
        background: 'transparent', border: `1px solid ${t.border}`,
        color: t.text, cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background .2s, border-color .2s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = t.bgSoft; e.currentTarget.style.borderColor = t.borderStr; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = t.border; }}
    >
      {theme === 'light' ? <IcMoon size={16}/> : <IcSun size={16}/>}
    </button>
  );
}

function LangPill({ theme }) {
  const t = window.ZP_THEMES[theme];
  return (
    <button style={{
      height: 36, padding: '0 12px', borderRadius: 10,
      background: 'transparent', border: `1px solid ${t.border}`,
      color: t.text, cursor: 'pointer',
      fontFamily: window.ZP_TOKENS.fontSans, fontWeight: 600, fontSize: 12, letterSpacing: '0.04em',
      display: 'inline-flex', alignItems: 'center', gap: 6,
    }}>
      <IcGlobe size={14}/>
      UA
    </button>
  );
}

function CtaButton({ label, variant = 'primary', theme, onClick, size = 'md', icon = true }) {
  const t = window.ZP_THEMES[theme];
  const [hover, setHover] = useState(false);
  const styles = {
    primary: {
      background: window.ZP_TOKENS.gradient,
      color: '#fff',
      border: 'none',
      boxShadow: hover ? '0 12px 30px rgba(15,122,82,0.35)' : '0 6px 16px rgba(15,122,82,0.22)',
    },
    ghost: {
      background: 'transparent',
      color: t.text,
      border: `1px solid ${t.borderStr}`,
    },
    solid: {
      background: t.text,
      color: t.bg,
      border: 'none',
    },
  }[variant];
  const h = size === 'lg' ? 52 : size === 'sm' ? 34 : 44;
  const px = size === 'lg' ? 26 : size === 'sm' ? 14 : 20;
  const fs = size === 'lg' ? 15 : size === 'sm' ? 13 : 14;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        height: h, padding: `0 ${px}px`,
        borderRadius: h / 2,
        fontFamily: window.ZP_TOKENS.fontSans, fontWeight: 600, fontSize: fs, letterSpacing: '-0.01em',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        cursor: 'pointer',
        transition: 'transform .18s ease, box-shadow .25s ease, background .2s',
        transform: hover ? 'translateY(-1px)' : 'translateY(0)',
        ...styles,
      }}>
      {label}
      {icon && <IcArrow size={16}/>}
    </button>
  );
}

function Topbar({ page, setPage, theme, setTheme }) {
  const t = window.ZP_THEMES[theme];
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = window.ZP_I18N.uk.nav;
  const items = [
    { k: 'products', l: nav.products, dd: true },
    { k: 'services', l: nav.services },
    { k: 'support',  l: nav.support },
    { k: 'news',     l: nav.news },
    { k: 'contacts', l: nav.contacts },
  ];

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? (theme === 'dark' ? 'rgba(7,10,15,0.82)' : 'rgba(255,255,255,0.82)') : 'transparent',
      backdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
      borderBottom: scrolled ? `1px solid ${t.border}` : '1px solid transparent',
      transition: 'background .25s, border-color .25s, backdrop-filter .25s',
    }}>
      <div style={{
        maxWidth: 1440, margin: '0 auto', padding: '0 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32,
      }}>
        <a href="#" onClick={(e) => { e.preventDefault(); setPage('home'); }}
           style={{ textDecoration: 'none', display: 'block' }}>
          <ZPLogo theme={theme} />
        </a>
        <nav style={{ display: 'flex', gap: 28, flex: 1, justifyContent: 'center' }} className="zp-nav-desktop">
          {items.map(i => (
            <NavLink key={i.k} label={i.l} active={page === i.k}
                     onClick={() => setPage(i.k)} theme={theme} hasDropdown={i.dd}/>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <LangPill theme={theme}/>
          <ThemeToggle theme={theme} setTheme={setTheme}/>
          <div className="zp-nav-desktop" style={{ display: 'inline-flex' }}>
            <CtaButton label={nav.cta} theme={theme} size="sm"
                       onClick={() => setPage('contacts')} />
          </div>
          <button className="zp-nav-mobile"
                  onClick={() => setMobileOpen(true)}
                  style={{
                    display: 'none', width: 36, height: 36, borderRadius: 10,
                    background: 'transparent', border: `1px solid ${t.border}`,
                    color: t.text, cursor: 'pointer',
                    alignItems: 'center', justifyContent: 'center',
                  }}>
            <IcMenu size={16}/>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: t.bg, padding: '24px 28px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <ZPLogo theme={theme}/>
            <button onClick={() => setMobileOpen(false)}
                    style={{ width: 36, height: 36, borderRadius: 10, background: 'transparent',
                             border: `1px solid ${t.border}`, color: t.text, cursor: 'pointer' }}>
              <IcClose size={16}/>
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 40 }}>
            {items.map(i => (
              <button key={i.k}
                      onClick={() => { setPage(i.k); setMobileOpen(false); }}
                      style={{
                        textAlign: 'left', padding: '18px 0',
                        background: 'none', border: 'none',
                        borderBottom: `1px solid ${t.border}`,
                        fontFamily: window.ZP_TOKENS.fontSans, fontWeight: 600, fontSize: 22,
                        color: t.text, cursor: 'pointer',
                      }}>
                {i.l}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Footer({ theme, setPage }) {
  const t = window.ZP_THEMES[theme];
  return (
    <footer style={{
      background: theme === 'dark' ? t.bgAlt : t.bgAlt,
      borderTop: `1px solid ${t.border}`,
      padding: '80px 40px 32px',
      fontFamily: window.ZP_TOKENS.fontSans,
      color: t.text,
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gap: 48,
          gridTemplateColumns: 'minmax(260px, 1.2fr) repeat(4, 1fr)',
        }} className="zp-footer-grid">
          <div>
            <ZPLogo theme={theme}/>
            <p style={{
              color: t.textSub, fontSize: 14, lineHeight: 1.6, marginTop: 20, maxWidth: 320,
            }}>
              Виробник силових трансформаторів та енергетичного обладнання для промисловості й державного сектору України.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
              {['LI', 'FB', 'YT', 'TG'].map(s => (
                <a key={s} href="#" style={{
                  width: 36, height: 36, borderRadius: 10,
                  border: `1px solid ${t.border}`, color: t.textSub,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 600, textDecoration: 'none',
                }}>{s}</a>
              ))}
            </div>
          </div>

          {[
            { title: 'Продукти', items: ['Силові трансформатори', 'Розподільчі трансформатори', 'КТП', 'Розподільчі пристрої', 'Ввідно-розподільчі', 'Кабельна продукція'], page: 'products' },
            { title: 'Послуги',  items: ['Проєктування', 'Виробництво', 'Монтаж', 'Пусконалагодження', 'Сервіс', 'Модернізація'], page: 'services' },
            { title: 'Компанія', items: ['Про нас', 'Сертифікати', 'Реалізовані проєкти', 'Новини', 'Вакансії', 'Партнерам'], page: 'news' },
            { title: 'Підтримка',items: ['База знань', 'Документація', 'Запчастини', 'Гарантія', '24/7 Сервіс', 'Контакти'], page: 'support' },
          ].map(col => (
            <div key={col.title}>
              <div style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.14em',
                color: t.textDim, textTransform: 'uppercase', marginBottom: 20,
              }}>{col.title}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.items.map(i => (
                  <li key={i}>
                    <a href="#" onClick={(e) => { e.preventDefault(); setPage(col.page); }}
                       style={{ color: t.textSub, fontSize: 14, textDecoration: 'none',
                                transition: 'color .18s' }}
                       onMouseEnter={(e) => e.currentTarget.style.color = t.text}
                       onMouseLeave={(e) => e.currentTarget.style.color = t.textSub}
                    >{i}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 72, paddingTop: 24, borderTop: `1px solid ${t.border}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ color: t.textDim, fontSize: 12 }}>
            © 2026 Zelect Power Technology. Усі права захищено.
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" style={{ color: t.textDim, fontSize: 12, textDecoration: 'none' }}>Політика конфіденційності</a>
            <a href="#" style={{ color: t.textDim, fontSize: 12, textDecoration: 'none' }}>Умови використання</a>
            <a href="#" style={{ color: t.textDim, fontSize: 12, textDecoration: 'none' }}>zelect.com.ua</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  ZPMark, ZPLogo, Topbar, Footer, CtaButton, ThemeToggle, LangPill, NavLink,
});
