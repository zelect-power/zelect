// Inner pages: products, services, support, news, contacts
const { useState: uPS } = React;

function PageHeader({ theme, eyebrow, title, sub }) {
  const t = window.ZP_THEMES[theme];
  return (
    <section style={{
      padding: '60px 40px 80px', background: t.bg, position: 'relative', overflow: 'hidden',
      borderBottom: `1px solid ${t.border}`,
    }}>
      <div style={{ position: 'absolute', inset: 0, background: t.heroOverlay, pointerEvents: 'none' }}/>
      <TechGrid theme={theme} opacity={0.5}/>
      <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative' }}>
        <Eyebrow theme={theme}>{eyebrow}</Eyebrow>
        <h1 style={{
          fontFamily: window.ZP_TOKENS.fontHeading,
          fontSize: 'clamp(44px, 5.5vw, 80px)', fontWeight: 700,
          lineHeight: 1.0, letterSpacing: '-0.035em', color: t.text,
          margin: '20px 0 0', maxWidth: 1000, textWrap: 'balance',
        }}>{title}</h1>
        {sub && <p style={{
          fontFamily: window.ZP_TOKENS.fontSans, fontSize: 20, lineHeight: 1.5,
          color: t.textSub, maxWidth: 720, margin: '24px 0 0',
        }}>{sub}</p>}
      </div>
    </section>
  );
}

function ProductsPage({ theme, setPage }) {
  const t = window.ZP_THEMES[theme];
  const [cat, setCat] = uPS('all');
  const cats = [
    { k: 'all',  l: 'Усі категорії' },
    { k: 'pow',  l: 'Силові трансформатори' },
    { k: 'dist', l: 'Розподільчі трансформатори' },
    { k: 'ktp',  l: 'КТП' },
    { k: 'ru',   l: 'Розподільчі пристрої' },
    { k: 'vrp',  l: 'ВРП' },
    { k: 'cab',  l: 'Кабельна продукція' },
  ];
  const items = [
    { c: 'pow', t: 'ТМН-6300/110', d: 'Силовий масляний трансформатор', p: ['6300 кВА', '110 / 10 кВ', 'ONAN'], ic: <IcTransformer size={28}/> },
    { c: 'pow', t: 'ТДТН-25000/110', d: 'Трьохобмотковий масляний', p: ['25 МВА', '110 / 35 / 10 кВ', 'ONAF'], ic: <IcTransformer size={28}/> },
    { c: 'pow', t: 'ТРДН-40000/110', d: 'Силовий з розщепленою обмоткою', p: ['40 МВА', '110 / 10-10 кВ'], ic: <IcTransformer size={28}/> },
    { c: 'dist', t: 'ТМГ-1000/10', d: 'Герметичний масляний', p: ['1000 кВА', '10 / 0,4 кВ'], ic: <IcCabinet size={28}/> },
    { c: 'dist', t: 'ТСЛ-1600/10', d: 'Сухий з литою ізоляцією', p: ['1600 кВА', '10 / 0,4 кВ', 'F1/C2/E2'], ic: <IcCabinet size={28}/> },
    { c: 'dist', t: 'ТМГ-2500/35', d: 'Масляний розподільчий', p: ['2500 кВА', '35 / 0,4 кВ'], ic: <IcCabinet size={28}/> },
    { c: 'ktp', t: 'КТПБ-2×1000/10', d: 'Блочно-модульна підстанція', p: ['2×1000 кВА', 'Зовнішнє встановлення'], ic: <IcGrid size={28}/> },
    { c: 'ktp', t: 'КТП-250', d: 'Щоглова трансформаторна', p: ['до 250 кВА', '10 / 0,4 кВ'], ic: <IcGrid size={28}/> },
    { c: 'ru',  t: 'КРП-10', d: 'Комірка РП 10 кВ', p: ['10 кВ', 'Вакуумний вимикач'], ic: <IcSub size={28}/> },
    { c: 'ru',  t: 'КРПЕ-35', d: 'Комірка з елегазовою ізоляцією', p: ['35 кВ', 'SF6'], ic: <IcSub size={28}/> },
    { c: 'vrp', t: 'ВРП-0,4 / 4000А', d: 'Ввідно-розподільчий пристрій', p: ['0,4 кВ', 'до 4000 А'], ic: <IcBolt size={28}/> },
    { c: 'vrp', t: 'ГРЩ-1', d: 'Головний розподільчий щит', p: ['0,4 кВ', 'Модульний'], ic: <IcBolt size={28}/> },
    { c: 'cab', t: 'АПвЕгаПу 1×240', d: 'Кабель з ізоляцією зшитого ПЕ', p: ['35 кВ', '240 мм²'], ic: <IcCable size={28}/> },
    { c: 'cab', t: 'ВВГнг-LS 4×35', d: 'Силовий кабель мідний', p: ['0,66 / 1 кВ', 'Низька димність'], ic: <IcCable size={28}/> },
  ];
  const filtered = cat === 'all' ? items : items.filter(i => i.c === cat);
  return (
    <>
      <PageHeader theme={theme}
        eyebrow="Продукти · каталог"
        title="Енергетичне обладнання від 0,4 до 110 кВ"
        sub="Виготовлення за індивідуальним технічним завданням, сертифіковане для держзакупівель Prozorro та міжнародного експорту." />
      <Section theme={theme} pad="40px 40px 40px">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {cats.map(c => (
            <button key={c.k} onClick={() => setCat(c.k)} style={{
              padding: '10px 16px', borderRadius: 100,
              background: cat === c.k ? t.text : 'transparent',
              color: cat === c.k ? t.bg : t.text,
              border: `1px solid ${cat === c.k ? t.text : t.border}`,
              fontFamily: window.ZP_TOKENS.fontSans, fontWeight: 500, fontSize: 13,
              cursor: 'pointer', transition: 'all .2s',
            }}>{c.l}</button>
          ))}
        </div>
      </Section>
      <Section theme={theme} pad="20px 40px 120px">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="zp-product-grid">
          {filtered.map((p, i) => (
            <div key={i} style={{
              background: t.surface, border: `1px solid ${t.border}`,
              borderRadius: 20, padding: 28, transition: 'transform .25s, border-color .2s, box-shadow .25s',
              cursor: 'pointer',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = t.borderStr; e.currentTarget.style.boxShadow = t.shadow; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = t.border; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ color: t.brand }}>{p.ic}</div>
              <div style={{ marginTop: 32, fontFamily: window.ZP_TOKENS.fontMono, fontSize: 12, color: t.textDim, letterSpacing: '0.06em' }}>{p.d}</div>
              <div style={{ marginTop: 6, fontFamily: window.ZP_TOKENS.fontSans, fontWeight: 700, fontSize: 24, color: t.text, letterSpacing: '-0.02em' }}>{p.t}</div>
              <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {p.p.map(x => (
                  <span key={x} style={{ padding: '5px 10px', borderRadius: 6, background: t.bgSoft, border: `1px solid ${t.border}`, fontSize: 11, color: t.textSub, fontFamily: window.ZP_TOKENS.fontMono }}>{x}</span>
                ))}
              </div>
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: t.text, fontWeight: 500 }}>Технічні дані</span>
                <IcArrowUR size={18}/>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function ServicesPage({ theme, setPage }) {
  const t = window.ZP_THEMES[theme];
  const services = [
    { n: '01', t: 'Проєктування та ТЕО', ic: <IcDoc size={24}/>,
      b: ['Розрахунок навантажень та схем живлення', 'Робоча документація та кошториси', 'Погодження з Укренерго й обленерго', 'Експертиза проєкту'] },
    { n: '02', t: 'Виробництво', ic: <IcFactory size={24}/>,
      b: ['Власні виробничі потужності', 'Випробувальна лабораторія до 110 кВ', 'Вхідний контроль компонентів', 'Повний цикл ВТК'] },
    { n: '03', t: 'Монтаж та такелаж', ic: <IcBuild size={24}/>,
      b: ['Доставка спецтранспортом', 'Такелажні роботи до 80 тонн', 'Монтаж обладнання під ключ', 'Укладання кабельних ліній'] },
    { n: '04', t: 'Пусконалагодження', ic: <IcSpark size={24}/>,
      b: ['Високовольтні випробування', 'Налаштування релейного захисту', 'Введення в експлуатацію', 'Акт-допуск з Держенергонагляду'] },
    { n: '05', t: 'Сервіс та діагностика', ic: <IcWrench size={24}/>,
      b: ['Планові ТО за графіком', 'Хроматографія мастила', 'Тепловізійна діагностика', 'Аварійний виїзд 24/7'] },
    { n: '06', t: 'Модернізація', ic: <IcCog size={24}/>,
      b: ['Капітальний ремонт обладнання', 'Заміна активної частини', 'Переведення на вищий клас напруги', 'Продовження ресурсу'] },
  ];
  return (
    <>
      <PageHeader theme={theme}
        eyebrow="Послуги"
        title="Життєвий цикл енергооб'єкта — під одним контрактом"
        sub="Від технічного завдання до багаторічного сервісу. Усе реалізують наші інженерні команди, а не підрядники."/>
      <Section theme={theme} pad="60px 40px 120px">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }} className="zp-svc-grid">
          {services.map(s => (
            <div key={s.n} style={{
              background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20,
              padding: 36, display: 'flex', flexDirection: 'column', gap: 24,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: window.ZP_TOKENS.gradient, color: '#fff',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>{s.ic}</div>
                <span style={{ fontFamily: window.ZP_TOKENS.fontMono, fontSize: 13, color: t.textDim }}>{s.n}</span>
              </div>
              <div style={{ fontFamily: window.ZP_TOKENS.fontSans, fontWeight: 700, fontSize: 28, color: t.text, letterSpacing: '-0.02em' }}>{s.t}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {s.b.map(x => (
                  <li key={x} style={{ display: 'flex', gap: 10, color: t.textSub, fontSize: 14, lineHeight: 1.5 }}>
                    <span style={{ color: t.brand, flexShrink: 0, marginTop: 3 }}><IcCheck size={14}/></span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function SupportPage({ theme, setPage }) {
  const t = window.ZP_THEMES[theme];
  const channels = [
    { t: 'Гаряча лінія', v: '0 800 300 500', d: 'Цілодобово, безкоштовно з України', ic: <IcPhone size={22}/> },
    { t: 'Сервісна пошта', v: 'service@zelect.com.ua', d: 'Відповідь протягом 15 хв', ic: <IcMail size={22}/> },
    { t: 'Особистий кабінет', v: 'my.zelect.com.ua', d: 'Заявки, документи, історія', ic: <IcDoc size={22}/> },
  ];
  const faq = [
    { q: 'Яка гарантія на силові трансформатори?', a: 'Базова гарантія — 36 місяців з моменту введення в експлуатацію, але не більше 42 місяців з дати відвантаження. Для проєктів держсектору можлива продовжена гарантія 60 місяців.' },
    { q: 'Як швидко ви реагуєте на аварію?', a: 'Реакція на звернення — до 15 хвилин. Віддалена діагностика через M2M-канал — до 2 годин. Виїзд бригади з запчастинами — до 24 годин по всій території України.' },
    { q: 'Чи працюєте в прифронтових регіонах?', a: 'Так, маємо досвід роботи у Харківській, Донецькій, Дніпропетровській та Запорізькій областях. Усі виїзди координуємо з військовою адміністрацією.' },
    { q: 'Що входить у service-контракт?', a: 'Регулярні ТО за графіком, хроматографія мастила 2 рази/рік, тепловізійна діагностика, необмежені аварійні виїзди, пріоритетне отримання запчастин зі складу.' },
    { q: 'Чи надаєте технічні консультації до покупки?', a: 'Так, безкоштовно. Наші інженери допоможуть скласти технічне завдання, підібрати потужність та схему, порахувати TCO.' },
  ];
  const [open, setOpen] = uPS(0);
  return (
    <>
      <PageHeader theme={theme}
        eyebrow="Підтримка · 24/7"
        title="Сервіс, який працює без вихідних"
        sub="Власна сервісна служба з бригадами у 5 регіонах, склад критичних запчастин, віддалений моніторинг і SLA у контракті."/>

      <Section theme={theme} pad="60px 40px 40px">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="zp-sup-grid">
          {channels.map(c => (
            <div key={c.t} style={{
              background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20, padding: 28,
            }}>
              <div style={{ color: t.brand }}>{c.ic}</div>
              <div style={{ marginTop: 24, fontSize: 12, color: t.textDim, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{c.t}</div>
              <div style={{ marginTop: 6, fontFamily: window.ZP_TOKENS.fontSans, fontWeight: 700, fontSize: 28, color: t.text, letterSpacing: '-0.02em' }}>{c.v}</div>
              <div style={{ marginTop: 8, fontSize: 13, color: t.textSub }}>{c.d}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section theme={theme} pad="40px 40px 120px">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'flex-start' }} className="zp-faq-grid">
          <div>
            <Eyebrow theme={theme}>Часті запитання</Eyebrow>
            <H2 theme={theme} size={44}>Відповіді за 30 секунд</H2>
          </div>
          <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20, overflow: 'hidden' }}>
            {faq.map((f, i) => (
              <div key={i} style={{ borderBottom: i < faq.length - 1 ? `1px solid ${t.border}` : 'none' }}>
                <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                  width: '100%', textAlign: 'left', background: 'none', border: 'none',
                  padding: '24px 28px', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20,
                  fontFamily: window.ZP_TOKENS.fontSans, fontWeight: 600, fontSize: 17,
                  color: t.text, letterSpacing: '-0.01em',
                }}>
                  <span>{f.q}</span>
                  <span style={{ color: t.textSub, flexShrink: 0 }}>
                    {open === i ? <IcMinus size={18}/> : <IcPlus size={18}/>}
                  </span>
                </button>
                {open === i && (
                  <div style={{ padding: '0 28px 24px', fontSize: 15, color: t.textSub, lineHeight: 1.6, maxWidth: 720 }}>
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

function NewsPage({ theme }) {
  const t = window.ZP_THEMES[theme];
  const news = [
    { d: '14 квіт 2026', cat: 'Проєкти', t: 'Zelect Power постачає 12 трансформаторів для відновлення ПС «Харків-4»', e: 'У співпраці з НЕК «Укренерго» — масляні трансформатори на 40 МВА для критичної інфраструктури Харківського вузла.' },
    { d: '02 квіт 2026', cat: 'Компанія', t: 'Відкрили другу виробничу лінію сухих трансформаторів', e: 'Нові потужності збільшать річний випуск сухих трансформаторів з литою ізоляцією у 2,5 рази.' },
    { d: '21 бер 2026', cat: 'Якість', t: 'Сертифікація за IEC 60076-11 для сухих трансформаторів', e: 'Протоколи випробувань підтверджено німецькою сертифікаційною лабораторією DEKRA.' },
    { d: '05 бер 2026', cat: 'Проєкти', t: 'Резервне живлення для онкоцентру в Дніпрі', e: 'Постачання та монтаж КТП-1000 з автоматичним вводом резерву для безперебійного живлення критичних систем.' },
    { d: '12 лют 2026', cat: 'Партнерство', t: 'Рамковий договір з Укрзалізницею на 2026–2028', e: 'Zelect Power визначено постачальником розподільчих трансформаторів для тягових підстанцій.' },
    { d: '18 січ 2026', cat: 'Галузь', t: 'Виступ CEO на Energy Tech Forum 2026', e: 'Наш CEO Олег Коваленко презентував стратегію відновлення енергосистеми України до 2030 року.' },
  ];
  return (
    <>
      <PageHeader theme={theme}
        eyebrow="Новини"
        title="Що відбувається у компанії та галузі"
        sub="Офіційні релізи, реалізовані проєкти, аналітика ринку енергообладнання України."/>
      <Section theme={theme} pad="60px 40px 120px">
        <div style={{
          display: 'grid', gap: 1, background: t.border,
          border: `1px solid ${t.border}`, borderRadius: 20, overflow: 'hidden',
          gridTemplateColumns: 'repeat(2, 1fr)',
        }} className="zp-news-grid">
          {news.map((n, i) => (
            <article key={i} style={{
              background: t.surface, padding: 36, display: 'flex', flexDirection: 'column', gap: 16,
              cursor: 'pointer', transition: 'background .2s', minHeight: 240,
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = t.surface2}
              onMouseLeave={(e) => e.currentTarget.style.background = t.surface}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <span style={{ color: t.brand, fontWeight: 600 }}>{n.cat}</span>
                <span style={{ color: t.textDim, fontFamily: window.ZP_TOKENS.fontMono }}>{n.d}</span>
              </div>
              <h3 style={{
                margin: 0, fontFamily: window.ZP_TOKENS.fontHeading, fontWeight: 700,
                fontSize: 26, lineHeight: 1.2, color: t.text, letterSpacing: '-0.02em', textWrap: 'balance',
              }}>{n.t}</h3>
              <p style={{ margin: 0, color: t.textSub, fontSize: 15, lineHeight: 1.55, flex: 1 }}>{n.e}</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: t.text }}>
                Читати статтю <IcArrow size={14}/>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}

function ContactsPage({ theme }) {
  const t = window.ZP_THEMES[theme];
  const offices = [
    { c: 'Київ', r: 'Головний офіс', a: 'вул. Електриків, 29А, БЦ «Енергія», 04176', p: '+380 44 300 50 00' },
    { c: 'Харків', r: 'Виробництво', a: 'просп. Московський, 247, 61037', p: '+380 57 700 11 20' },
    { c: 'Дніпро', r: 'Сервісний хаб', a: 'вул. Січеславська Набережна, 15А, 49000', p: '+380 56 300 40 10' },
    { c: 'Львів', r: 'Регіональне представництво', a: 'вул. Городоцька, 172, 79022', p: '+380 32 255 10 00' },
  ];
  const [sent, setSent] = uPS(false);
  return (
    <>
      <PageHeader theme={theme}
        eyebrow="Контакти"
        title="Говоримо однією мовою з енергетиками"
        sub="Менеджер проєкту зв'яжеться з вами протягом 2 робочих годин. Комерційна пропозиція — за 48 годин."/>

      <Section theme={theme} pad="60px 40px 120px">
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 80 }} className="zp-contact-grid">
          <div>
            <H2 theme={theme} size={36}>Залишити запит</H2>
            <Lead theme={theme}>Опишіть ваш проєкт — ми відповімо з пропозицією та ТЗ.</Lead>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Input theme={theme} label="Компанія" required/>
                <Input theme={theme} label="ПІБ контактної особи" required/>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Input theme={theme} label="Email" type="email" required/>
                <Input theme={theme} label="Телефон" type="tel"/>
              </div>
              <Select theme={theme} label="Тип проєкту" options={['Силові трансформатори', 'Розподільчі трансформатори', 'КТП', 'Розподільчі пристрої', 'Сервіс / модернізація', 'Інше']}/>
              <Textarea theme={theme} label="Опис задачі або технічні параметри"/>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginTop: 8 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: t.textSub, cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: t.brand, width: 16, height: 16 }}/>
                  Погоджуюся на обробку персональних даних
                </label>
                <CtaButton label={sent ? 'Дякуємо! Менеджер зв\'яжеться' : 'Надіслати запит'} theme={theme} size="md"/>
              </div>
            </form>
          </div>
          <div>
            <H2 theme={theme} size={36}>Офіси</H2>
            <Lead theme={theme}>Представлені у 4 регіонах України з виробництвом у Харкові.</Lead>
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 1, background: t.border, border: `1px solid ${t.border}`, borderRadius: 16, overflow: 'hidden' }}>
              {offices.map(o => (
                <div key={o.c} style={{ background: t.surface, padding: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: window.ZP_TOKENS.fontSans, fontWeight: 700, fontSize: 20, color: t.text, letterSpacing: '-0.01em' }}>{o.c}</div>
                    <div style={{ fontSize: 12, color: t.brand, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 4 }}>{o.r}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, color: t.textSub, lineHeight: 1.5 }}>{o.a}</div>
                    <div style={{ fontFamily: window.ZP_TOKENS.fontMono, fontSize: 13, color: t.text, marginTop: 4 }}>{o.p}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 32, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.textDim }}>Загальні</div>
                <div style={{ fontFamily: window.ZP_TOKENS.fontSans, fontSize: 16, color: t.text, marginTop: 6 }}>info@zelect.com.ua</div>
              </div>
              <div>
                <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.textDim }}>Тендери</div>
                <div style={{ fontFamily: window.ZP_TOKENS.fontSans, fontSize: 16, color: t.text, marginTop: 6 }}>tender@zelect.com.ua</div>
              </div>
              <div>
                <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.textDim }}>Сервіс</div>
                <div style={{ fontFamily: window.ZP_TOKENS.fontSans, fontSize: 16, color: t.text, marginTop: 6 }}>service@zelect.com.ua</div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function Input({ theme, label, type = 'text', required }) {
  const t = window.ZP_THEMES[theme];
  const [focus, setFocus] = uPS(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 12, color: t.textDim, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>{label}{required && <span style={{ color: t.brand }}> *</span>}</span>
      <input type={type} required={required}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          height: 46, padding: '0 14px', borderRadius: 10,
          background: t.bg, border: `1px solid ${focus ? t.brand : t.border}`,
          fontFamily: window.ZP_TOKENS.fontSans, fontSize: 15, color: t.text,
          outline: 'none', transition: 'border-color .2s',
        }}/>
    </label>
  );
}

function Select({ theme, label, options }) {
  const t = window.ZP_THEMES[theme];
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 12, color: t.textDim, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>{label}</span>
      <select style={{
        height: 46, padding: '0 14px', borderRadius: 10,
        background: t.bg, border: `1px solid ${t.border}`,
        fontFamily: window.ZP_TOKENS.fontSans, fontSize: 15, color: t.text, outline: 'none',
      }}>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}

function Textarea({ theme, label }) {
  const t = window.ZP_THEMES[theme];
  const [focus, setFocus] = uPS(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 12, color: t.textDim, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>{label}</span>
      <textarea rows={5}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          padding: 14, borderRadius: 10,
          background: t.bg, border: `1px solid ${focus ? t.brand : t.border}`,
          fontFamily: window.ZP_TOKENS.fontSans, fontSize: 15, color: t.text,
          outline: 'none', resize: 'vertical', transition: 'border-color .2s',
        }}/>
    </label>
  );
}

Object.assign(window, { ProductsPage, ServicesPage, SupportPage, NewsPage, ContactsPage });
