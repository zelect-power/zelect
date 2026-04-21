// App root — router, theme, layout
const { useState: uAS, useEffect: uAE, useCallback: uAC } = React;

// URL ↔ page key. Пути синхронизированы с TZ.md §3 (будут использоваться и в Next.js).
const ZP_PAGE_TO_PATH = {
  home:     '/',
  products: '/produkty',
  services: '/poslugy',
  support:  '/pidtrymka',
  news:     '/novyny',
  contacts: '/kontakty',
};
const ZP_PATH_TO_PAGE = Object.fromEntries(
  Object.entries(ZP_PAGE_TO_PATH).map(([k, v]) => [v, k])
);

function zpResolvePage(pathname) {
  if (ZP_PATH_TO_PAGE[pathname]) return ZP_PATH_TO_PAGE[pathname];
  // /produkty/anything → products (будущие вложенные роуты)
  for (const [path, page] of Object.entries(ZP_PATH_TO_PAGE)) {
    if (path !== '/' && pathname.startsWith(path + '/')) return page;
  }
  return 'home';
}

function App() {
  const [theme, setTheme] = uAS(() => {
    try { return localStorage.getItem('zp-theme') || 'light'; } catch { return 'light'; }
  });
  const [page, setPageState] = uAS(() => zpResolvePage(window.location.pathname));

  const navigate = uAC((next) => {
    const path = ZP_PAGE_TO_PATH[next] || '/';
    if (window.location.pathname !== path) {
      window.history.pushState({ page: next }, '', path);
    }
    setPageState(next);
  }, []);

  uAE(() => {
    try { localStorage.setItem('zp-theme', theme); } catch {}
    document.documentElement.style.background = window.ZP_THEMES[theme].bg;
    document.body.style.background = window.ZP_THEMES[theme].bg;
    document.body.style.color = window.ZP_THEMES[theme].text;
    document.body.style.colorScheme = theme;
  }, [theme]);

  uAE(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page]);

  // Back/forward — синхронизация state с URL
  uAE(() => {
    const onPop = () => setPageState(zpResolvePage(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

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
    case 'products': pageEl = <ProductsPage theme={theme} setPage={navigate}/>; break;
    case 'services': pageEl = <ServicesPage theme={theme} setPage={navigate}/>; break;
    case 'support':  pageEl = <SupportPage theme={theme} setPage={navigate}/>; break;
    case 'news':     pageEl = <NewsPage theme={theme}/>; break;
    case 'contacts': pageEl = <ContactsPage theme={theme}/>; break;
    default:         pageEl = <HomePage theme={theme} setPage={navigate}/>;
  }

  return (
    <div data-screen-label={page} style={{ background: t.bg, color: t.text, minHeight: '100vh', fontFamily: window.ZP_TOKENS.fontSans }}>
      <Topbar page={page} setPage={navigate} theme={theme} setTheme={setTheme}/>
      <main key={page} style={{ animation: 'zp-page-in .5s cubic-bezier(.2,.7,.2,1)' }}>
        {pageEl}
      </main>
      <Footer theme={theme} setPage={navigate}/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
