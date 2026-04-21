// App root — router, theme, layout
const { useState: uAS, useEffect: uAE } = React;

function App() {
  const [theme, setTheme] = uAS(() => {
    try { return localStorage.getItem('zp-theme') || 'light'; } catch { return 'light'; }
  });
  const [page, setPage] = uAS(() => {
    try { return localStorage.getItem('zp-page') || 'home'; } catch { return 'home'; }
  });

  uAE(() => {
    try { localStorage.setItem('zp-theme', theme); } catch {}
    document.documentElement.style.background = window.ZP_THEMES[theme].bg;
    document.body.style.background = window.ZP_THEMES[theme].bg;
    document.body.style.color = window.ZP_THEMES[theme].text;
    document.body.style.colorScheme = theme;
  }, [theme]);

  uAE(() => {
    try { localStorage.setItem('zp-page', page); } catch {}
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page]);

  // Tweaks: expose theme toggle
  uAE(() => {
    const onMsg = (ev) => {
      const d = ev.data || {};
      if (d.type === '__activate_edit_mode') window.__zpTweaksActive = true;
      if (d.type === '__deactivate_edit_mode') window.__zpTweaksActive = false;
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const t = window.ZP_THEMES[theme];

  let pageEl;
  switch (page) {
    case 'products': pageEl = <ProductsPage theme={theme} setPage={setPage}/>; break;
    case 'services': pageEl = <ServicesPage theme={theme} setPage={setPage}/>; break;
    case 'support':  pageEl = <SupportPage theme={theme} setPage={setPage}/>; break;
    case 'news':     pageEl = <NewsPage theme={theme}/>; break;
    case 'contacts': pageEl = <ContactsPage theme={theme}/>; break;
    default:         pageEl = <HomePage theme={theme} setPage={setPage}/>;
  }

  return (
    <div data-screen-label={page} style={{ background: t.bg, color: t.text, minHeight: '100vh', fontFamily: window.ZP_TOKENS.fontSans }}>
      <Topbar page={page} setPage={setPage} theme={theme} setTheme={setTheme}/>
      <main key={page} style={{ animation: 'zp-page-in .5s cubic-bezier(.2,.7,.2,1)' }}>
        {pageEl}
      </main>
      <Footer theme={theme} setPage={setPage}/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
