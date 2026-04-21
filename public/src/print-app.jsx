// Print variant — stacks all pages in light theme, no animations
function PrintApp() {
  const theme = 'light';
  const noop = () => {};
  const pages = [
    { el: <HomePage theme={theme} setPage={noop}/>, label: 'Головна' },
    { el: <ProductsPage theme={theme} setPage={noop}/>, label: 'Продукти' },
    { el: <ServicesPage theme={theme} setPage={noop}/>, label: 'Послуги' },
    { el: <SupportPage theme={theme} setPage={noop}/>, label: 'Підтримка' },
    { el: <NewsPage theme={theme}/>, label: 'Новини' },
    { el: <ContactsPage theme={theme}/>, label: 'Контакти' },
  ];
  const t = window.ZP_THEMES[theme];
  return (
    <div style={{ background: t.bg, color: t.text, fontFamily: window.ZP_TOKENS.fontSans }}>
      <div className="print-topbar-wrap">
        <Topbar page="home" setPage={noop} theme={theme} setTheme={noop}/>
      </div>
      {pages.map((p, i) => (
        <section key={i} className="print-page" data-label={p.label}>
          {p.el}
        </section>
      ))}
      <Footer theme={theme} setPage={noop}/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PrintApp/>);

// Auto-print after fonts + a small delay
(async () => {
  try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch {}
  setTimeout(() => { window.print(); }, 900);
})();
