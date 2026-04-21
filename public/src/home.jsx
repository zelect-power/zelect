// Home page — all blocks
const { useState: useHS, useEffect: useHE } = React;

function HomeHero({ theme, setPage }) {
  const t = window.ZP_THEMES[theme];
  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      background: t.bg, padding: '40px 40px 120px',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: t.heroOverlay, pointerEvents: 'none' }}/>
      <TechGrid theme={theme} opacity={0.6}/>
      <div style={{
        maxWidth: 1440, margin: '0 auto', position: 'relative',
        display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 64,
        alignItems: 'center', minHeight: 'calc(100vh - 180px)',
      }} className="zp-hero-grid">
        <div style={{
          animation: 'zp-hero-in .6s cubic-bezier(.2,.7,.2,1) both',
        }}>
          <Eyebrow theme={theme}>Енергетичне обладнання · виробництво в Україні</Eyebrow>
          <h1 style={{
            fontFamily: window.ZP_TOKENS.fontHeading,
            fontSize: 'clamp(48px, 6vw, 88px)', fontWeight: 700,
            lineHeight: 0.98, letterSpacing: '-0.035em',
            color: t.text, margin: '24px 0 0', textWrap: 'balance',
          }}>
            Енергія, що <GradText>тримає</GradText><br/>критичну інфраструктуру
          </h1>
          <p style={{
            fontFamily: window.ZP_TOKENS.fontSans, fontSize: 20, lineHeight: 1.5,
            color: t.textSub, margin: '32px 0 0', maxWidth: 560, textWrap: 'pretty',
          }}>
            Силові та розподільчі трансформатори, КТП, розподільчі пристрої і кабельна продукція для промисловості та державного сектору України.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap' }}>
            <CtaButton label="Каталог продукції" theme={theme} size="lg" onClick={() => setPage('products')}/>
            <CtaButton label="Отримати пропозицію" variant="ghost" theme={theme} size="lg" onClick={() => setPage('contacts')}/>
          </div>
          <div style={{
            marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32,
            paddingTop: 32, borderTop: `1px solid ${t.border}`, maxWidth: 560,
          }}>
            {[
              { v: 'ДСТУ', l: 'IEC 60076' },
              { v: '24/7', l: 'Сервіс та підтримка' },
              { v: 'UA', l: 'Виробництво' },
            ].map(x => (
              <div key={x.l}>
                <div style={{ fontFamily: window.ZP_TOKENS.fontSans, fontWeight: 700, fontSize: 22, color: t.text, letterSpacing: '-0.02em' }}>{x.v}</div>
                <div style={{ fontSize: 12, color: t.textDim, marginTop: 4, letterSpacing: '0.04em' }}>{x.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{
          position: 'relative',
          animation: 'zp-hero-visual-in .8s cubic-bezier(.2,.7,.2,1) .1s both',
        }} className="zp-hero-visual">
          <div style={{ position: 'absolute', inset: '-10% -10% -10% 0', background: window.ZP_TOKENS.gradientGlow, pointerEvents: 'none' }}/>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <TransformerVisual theme={theme} size={560}/>
          </div>
          {/* spec chips floating */}
          <div style={{
            position: 'absolute', top: '18%', right: '2%',
            background: t.surface, border: `1px solid ${t.border}`,
            borderRadius: 14, padding: '14px 18px',
            boxShadow: t.shadow,
            fontFamily: window.ZP_TOKENS.fontSans,
            animation: 'zp-float 6s ease-in-out infinite',
          }}>
            <div style={{ fontSize: 11, color: t.textDim, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Потужність</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: '-0.02em' }}>2500 кВА</div>
          </div>
          <div style={{
            position: 'absolute', bottom: '14%', left: '-2%',
            background: t.surface, border: `1px solid ${t.border}`,
            borderRadius: 14, padding: '14px 18px',
            boxShadow: t.shadow,
            fontFamily: window.ZP_TOKENS.fontSans,
            animation: 'zp-float 7s ease-in-out infinite .5s',
          }}>
            <div style={{ fontSize: 11, color: t.textDim, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Напруга</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: '-0.02em' }}>35 / 10,5 кВ</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeTicker({ theme }) {
  const t = window.ZP_THEMES[theme];
  const items = ['ДТЕК', 'Укренерго', 'Укрзалізниця', 'Нафтогаз', 'Енергоатом', 'Метінвест', 'АрселорМіттал', 'Київстар', 'USAID', 'Міненерго'];
  return (
    <div style={{
      borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`,
      background: t.bgAlt, padding: '28px 0', overflow: 'hidden',
      display: 'flex', alignItems: 'center', gap: 40,
    }}>
      <div style={{
        flex: '0 0 auto', padding: '0 40px',
        fontSize: 11, fontWeight: 600, letterSpacing: '0.14em',
        color: t.textDim, textTransform: 'uppercase',
        borderRight: `1px solid ${t.border}`, marginRight: 20,
      }}>
        Нам довіряють
      </div>
      <div style={{ display: 'flex', gap: 64, animation: 'zp-ticker 40s linear infinite', whiteSpace: 'nowrap' }}>
        {[...items, ...items].map((x, i) => (
          <span key={i} style={{
            fontFamily: window.ZP_TOKENS.fontSans, fontWeight: 600, fontSize: 20,
            color: t.textSub, letterSpacing: '-0.01em',
          }}>{x}</span>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ theme, icon, title, desc, specs, featured, onClick }) {
  const t = window.ZP_THEMES[theme];
  const [hover, setHover] = useHS(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        background: featured ? t.surface2 : t.surface,
        border: `1px solid ${hover ? t.borderStr : t.border}`,
        borderRadius: 20, padding: 28, cursor: 'pointer',
        transition: 'border-color .2s, transform .3s cubic-bezier(.2,.7,.2,1), box-shadow .3s',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hover ? t.shadowLg : 'none',
        overflow: 'hidden',
        gridColumn: featured ? 'span 2' : 'span 1',
      }}>
      {featured && (
        <div style={{
          position: 'absolute', inset: 0, background: window.ZP_TOKENS.gradientGlow, opacity: 0.8,
          pointerEvents: 'none',
        }}/>
      )}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: featured ? window.ZP_TOKENS.gradient : t.bgSoft,
          color: featured ? '#fff' : t.brand,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>{icon}</div>
        <div style={{
          opacity: hover ? 1 : 0.4,
          transform: hover ? 'translate(0,0)' : 'translate(-4px,4px)',
          transition: 'all .25s',
          color: t.text,
        }}>
          <IcArrowUR size={22}/>
        </div>
      </div>
      <div style={{ position: 'relative', marginTop: 40 }}>
        <div style={{
          fontFamily: window.ZP_TOKENS.fontSans, fontWeight: 700,
          fontSize: featured ? 32 : 22, color: t.text, letterSpacing: '-0.02em',
          lineHeight: 1.15, textWrap: 'balance',
        }}>{title}</div>
        <div style={{
          fontSize: 14, color: t.textSub, marginTop: 12, lineHeight: 1.55, textWrap: 'pretty',
          maxWidth: featured ? 560 : 'none',
        }}>{desc}</div>
        {specs && (
          <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {specs.map(s => (
              <span key={s} style={{
                padding: '6px 10px', borderRadius: 8,
                background: t.bgSoft, border: `1px solid ${t.border}`,
                color: t.textSub, fontSize: 12, fontWeight: 500,
                fontVariantNumeric: 'tabular-nums',
              }}>{s}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function HomeProducts({ theme, setPage }) {
  const t = window.ZP_THEMES[theme];
  const products = [
    { icon: <IcTransformer size={24}/>, title: 'Силові трансформатори', desc: 'Масляні та сухі трансформатори потужністю від 25 кВА до 63 МВА для магістральних та розподільчих мереж.',
      specs: ['25 кВА – 63 МВА', '6 / 10 / 35 / 110 кВ', 'ДСТУ IEC 60076'], featured: true },
    { icon: <IcCabinet size={24}/>, title: 'Розподільчі трансформатори', desc: 'Герметичні масляні та сухі трансформатори для комунальних мереж і промислових підприємств.',
      specs: ['до 2500 кВА', '10 / 0,4 кВ'] },
    { icon: <IcGrid size={24}/>, title: 'КТП', desc: 'Комплектні трансформаторні підстанції блочно-модульного типу, у тому числі кіоскові та щоглові.',
      specs: ['КТП, КТПБ, МТП'] },
    { icon: <IcSub size={24}/>, title: 'Розподільчі пристрої', desc: 'Комірки КРП та КРПЕ середньої напруги, вакуумні вимикачі, схеми з елегазовою ізоляцією.',
      specs: ['6, 10, 35 кВ'] },
    { icon: <IcBolt size={24}/>, title: 'Ввідно-розподільчі пристрої', desc: 'ВРП та ГРЩ низької напруги для промислових і цивільних об\u2019єктів.',
      specs: ['0,4 кВ', 'до 6300 А'] },
    { icon: <IcCable size={24}/>, title: 'Кабельна продукція', desc: 'Силові та контрольні кабелі з ізоляцією з ПВХ, XLPE та мідними жилами.',
      specs: ['0,6 / 35 кВ'] },
  ];
  return (
    <Section theme={theme} id="products">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40, marginBottom: 56 }} className="zp-sec-head">
        <div>
          <Eyebrow theme={theme}>Продукція</Eyebrow>
          <H2 theme={theme}>Повний цикл<br/>енергетичного обладнання</H2>
        </div>
        <Lead theme={theme} maxW={420}>
          Шість категорій продукції — від силових трансформаторів 110 кВ до кабельної продукції. Усе сертифіковано за українськими та міжнародними стандартами.
        </Lead>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
      }} className="zp-product-grid">
        {products.map((p, i) => (
          <Reveal key={i} delay={i * 60}>
            <ProductCard theme={theme} {...p} onClick={() => setPage('products')}/>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function HomeStats({ theme }) {
  const t = window.ZP_THEMES[theme];
  const stats = [
    { v: 18, suf: '', l: 'Років на ринку енергетики України' },
    { v: 2400, suf: '+', l: 'Виконаних проєктів по всій країні' },
    { v: 8500, suf: ' МВА', l: 'Сумарна встановлена потужність' },
    { v: 24, suf: '/7', l: 'Сервісна підтримка обладнання' },
  ];
  return (
    <Section theme={theme} bg={t.bgAlt}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
      }} className="zp-stats-grid">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 80}>
            <div style={{
              padding: '8px 24px 8px 0',
              borderLeft: i === 0 ? 'none' : `1px solid ${t.border}`,
              paddingLeft: i === 0 ? 0 : 24,
            }}>
              <Counter to={s.v} suffix={s.suf} theme={theme}/>
              <div style={{
                marginTop: 16, fontSize: 14, color: t.textSub,
                maxWidth: 240, lineHeight: 1.5,
              }}>{s.l}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function HomeServices({ theme, setPage }) {
  const t = window.ZP_THEMES[theme];
  const items = [
    { n: '01', t: 'Проєктування', d: 'Розробка технічних рішень, проєктна документація, погодження з Укренерго та обленерго.', ic: <IcDoc size={20}/> },
    { n: '02', t: 'Виробництво', d: 'Власне виробництво на заводі в Україні з повним циклом контролю якості.', ic: <IcFactory size={20}/> },
    { n: '03', t: 'Монтаж', d: 'Доставка, такелажні роботи, монтаж на об\u2019єкті силами сертифікованих бригад.', ic: <IcBuild size={20}/> },
    { n: '04', t: 'Пусконалагодження', d: 'Високовольтні випробування, налаштування релейного захисту, введення в експлуатацію.', ic: <IcSpark size={20}/> },
    { n: '05', t: 'Сервіс', d: 'Планові огляди, діагностика, регламентні роботи з виїздом по всій Україні.', ic: <IcWrench size={20}/> },
    { n: '06', t: 'Модернізація', d: 'Капітальний ремонт та модернізація обладнання радянського виробництва.', ic: <IcCog size={20}/> },
  ];
  return (
    <Section theme={theme}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'flex-start',
      }} className="zp-services-grid">
        <div style={{ position: 'sticky', top: 120 }}>
          <Eyebrow theme={theme}>Послуги</Eyebrow>
          <H2 theme={theme}>Повний цикл:<br/>від ТЗ до сервісу</H2>
          <Lead theme={theme} maxW={420}>
            Ми беремо на себе весь життєвий цикл енергооб\u2019єкта — від проєктних рішень до багаторічного сервісного обслуговування.
          </Lead>
          <div style={{ marginTop: 32 }}>
            <CtaButton label="Усі послуги" theme={theme} onClick={() => setPage('services')}/>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: t.border, border: `1px solid ${t.border}`, borderRadius: 20, overflow: 'hidden' }}>
          {items.map((x, i) => (
            <div key={i} style={{
              background: t.surface, padding: 28,
              display: 'flex', flexDirection: 'column', gap: 10,
              transition: 'background .2s',
              cursor: 'pointer',
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = t.surface2}
              onMouseLeave={(e) => e.currentTarget.style.background = t.surface}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: t.brand }}>
                {x.ic}
                <span style={{ fontFamily: window.ZP_TOKENS.fontMono, fontSize: 12, color: t.textDim, letterSpacing: '0.08em' }}>{x.n}</span>
              </div>
              <div style={{ marginTop: 16, fontFamily: window.ZP_TOKENS.fontSans, fontWeight: 600, fontSize: 19, color: t.text, letterSpacing: '-0.01em' }}>{x.t}</div>
              <div style={{ fontSize: 13, color: t.textSub, lineHeight: 1.55 }}>{x.d}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function HomeWhy({ theme }) {
  const t = window.ZP_THEMES[theme];
  const items = [
    { t: 'Локальне виробництво', d: 'Власні потужності в Україні. Контроль кожного етапу — від сталевого листа до фінальних випробувань.', ic: <IcFactory size={22}/> },
    { t: 'Сертифіковано', d: 'ДСТУ IEC 60076, ISO 9001, сертифікати відповідності для держзакупівель Prozorro.', ic: <IcShield size={22}/> },
    { t: 'Інженерна експертиза', d: 'Команда з 40+ інженерів, досвід роботи з Укренерго, обленерго та промисловими гігантами.', ic: <IcHard size={22}/> },
    { t: 'Швидкість реакції', d: 'Проєктування за 2-4 тижні. Аварійна поставка зі складу за 24 години.', ic: <IcClock size={22}/> },
  ];
  return (
    <Section theme={theme} bg={t.bgAlt}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'flex-start' }} className="zp-why-grid">
        <div>
          <Eyebrow theme={theme}>Чому Zelect Power</Eyebrow>
          <H2 theme={theme} size={48}>Стратегічний партнер для критичної інфраструктури</H2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
          {items.map((x, i) => (
            <Reveal key={i} delay={i * 80}>
              <div>
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: t.surface, border: `1px solid ${t.border}`,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: t.brand,
                }}>{x.ic}</div>
                <div style={{ marginTop: 20, fontFamily: window.ZP_TOKENS.fontSans, fontWeight: 700, fontSize: 22, color: t.text, letterSpacing: '-0.015em' }}>{x.t}</div>
                <div style={{ marginTop: 8, fontSize: 14, color: t.textSub, lineHeight: 1.6, maxWidth: 360 }}>{x.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function HomeCases({ theme }) {
  const t = window.ZP_THEMES[theme];
  const cases = [
    { cat: 'Енергетика', t: 'Відновлення підстанції 110/35/10 кВ', loc: 'Харківська обл.', y: '2025', mw: '63 МВА', ic: <IcSub size={22}/> },
    { cat: 'Промисловість', t: 'Електропостачання металургійного цеху', loc: 'Кривий Ріг', y: '2024', mw: '40 МВА', ic: <IcFactory size={22}/> },
    { cat: 'Державний сектор', t: 'Резервне живлення лікарняного комплексу', loc: 'Київ', y: '2024', mw: '4,2 МВА', ic: <IcBuild size={22}/> },
  ];
  return (
    <Section theme={theme}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, gap: 40 }}>
        <div>
          <Eyebrow theme={theme}>Реалізовані проєкти</Eyebrow>
          <H2 theme={theme}>Інфраструктура,<br/>яка вже працює</H2>
        </div>
        <a href="#" style={{
          fontFamily: window.ZP_TOKENS.fontSans, fontWeight: 600, fontSize: 14,
          color: t.text, textDecoration: 'none',
          display: 'inline-flex', alignItems: 'center', gap: 8,
          borderBottom: `1px solid ${t.borderStr}`, paddingBottom: 6,
        }}>Усі кейси <IcArrow size={14}/></a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="zp-cases-grid">
        {cases.map((c, i) => (
          <Reveal key={i} delay={i * 80}>
            <div style={{
              background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20,
              overflow: 'hidden', cursor: 'pointer',
              transition: 'transform .3s, border-color .2s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = t.borderStr; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = t.border; }}
            >
              <div style={{
                aspectRatio: '16 / 10', position: 'relative',
                background: theme === 'dark'
                  ? `linear-gradient(135deg, #0e141c 0%, #141c26 100%)`
                  : `linear-gradient(135deg, #f2f3f4 0%, #e6e7e9 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', inset: 0, background: window.ZP_TOKENS.gradientGlow, opacity: 0.5 }}/>
                <div style={{ position: 'relative', color: t.brand, opacity: 0.8 }}>
                  <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    {c.ic.props.children}
                  </svg>
                </div>
                <div style={{
                  position: 'absolute', top: 20, left: 20,
                  padding: '6px 12px', borderRadius: 100,
                  background: t.surface, border: `1px solid ${t.border}`,
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: t.textSub,
                }}>{c.cat}</div>
              </div>
              <div style={{ padding: 24 }}>
                <div style={{ fontFamily: window.ZP_TOKENS.fontSans, fontWeight: 700, fontSize: 20, color: t.text, letterSpacing: '-0.015em', lineHeight: 1.2 }}>{c.t}</div>
                <div style={{
                  marginTop: 20, paddingTop: 20, borderTop: `1px solid ${t.border}`,
                  display: 'flex', justifyContent: 'space-between', gap: 12,
                  fontSize: 12, color: t.textDim,
                }}>
                  <span>{c.loc}</span>
                  <span style={{ fontFamily: window.ZP_TOKENS.fontMono }}>{c.mw}</span>
                  <span style={{ fontFamily: window.ZP_TOKENS.fontMono }}>{c.y}</span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function HomeSupport({ theme, setPage }) {
  const t = window.ZP_THEMES[theme];
  return (
    <Section theme={theme} bg={t.bgAlt}>
      <div style={{
        background: theme === 'dark' ? '#0c1117' : '#fff',
        border: `1px solid ${t.border}`, borderRadius: 24,
        padding: 56, position: 'relative', overflow: 'hidden',
        display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 60, alignItems: 'center',
      }} className="zp-support-card">
        <div style={{ position: 'absolute', inset: 0, background: window.ZP_TOKENS.gradientGlow, opacity: 0.7, pointerEvents: 'none' }}/>
        <div style={{ position: 'relative' }}>
          <Eyebrow theme={theme}>24/7 підтримка</Eyebrow>
          <H2 theme={theme} size={44}>Сервіс, який працює, поки працює ваше обладнання</H2>
          <Lead theme={theme}>
            Цілодобовий гарячий зв\u2019язок, виїзна бригада з діагностичним комплексом, склад критичних запчастин, віддалений моніторинг стану.
          </Lead>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <CtaButton label="Service-контракт" theme={theme} onClick={() => setPage('support')}/>
            <CtaButton label="0 800 300 500" variant="ghost" theme={theme} icon={false} onClick={() => {}}/>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{
            fontFamily: window.ZP_TOKENS.fontMono, fontSize: 12, color: t.textDim,
            borderLeft: `2px solid ${t.brand}`, paddingLeft: 14, marginBottom: 12,
          }}>SLA STATUS</div>
          {[
            { t: 'Реакція на звернення', v: '≤ 15 хв' },
            { t: 'Діагностика віддалена', v: '≤ 2 год' },
            { t: 'Виїзд бригади', v: '≤ 24 год' },
            { t: 'Наявність запчастин', v: '98,4%' },
          ].map((x, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 0', borderBottom: `1px solid ${t.border}`,
            }}>
              <span style={{ color: t.textSub, fontSize: 14 }}>{x.t}</span>
              <span style={{ fontFamily: window.ZP_TOKENS.fontMono, fontSize: 14, color: t.text, fontWeight: 600 }}>{x.v}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function HomeCerts({ theme }) {
  const t = window.ZP_THEMES[theme];
  const certs = [
    { n: 'ДСТУ IEC 60076', d: 'Силові трансформатори' },
    { n: 'ISO 9001:2015', d: 'Система управління якістю' },
    { n: 'ISO 14001', d: 'Екологічне управління' },
    { n: 'ISO 45001', d: 'Охорона праці' },
    { n: 'Prozorro', d: 'Держзакупівлі' },
    { n: 'CE / EAC', d: 'Експорт' },
  ];
  return (
    <Section theme={theme} pad="80px 40px">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'center' }} className="zp-certs-grid">
        <div>
          <Eyebrow theme={theme}>Сертифікати</Eyebrow>
          <H2 theme={theme} size={40}>Відповідність стандартам</H2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: t.border, border: `1px solid ${t.border}`, borderRadius: 16, overflow: 'hidden' }}>
          {certs.map(c => (
            <div key={c.n} style={{ background: t.bg, padding: 24, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <IcShield size={20}/>
              <div style={{ marginTop: 16, fontFamily: window.ZP_TOKENS.fontSans, fontWeight: 700, fontSize: 16, color: t.text, letterSpacing: '-0.01em' }}>{c.n}</div>
              <div style={{ fontSize: 12, color: t.textDim }}>{c.d}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function HomeNews({ theme, setPage }) {
  const t = window.ZP_THEMES[theme];
  const news = [
    { d: '14 квіт 2026', t: 'Zelect Power постачає 12 трансформаторів для відновлення ПС «Харків-4»', cat: 'Проєкти' },
    { d: '02 квіт 2026', t: 'Відкрили другу виробничу лінію сухих трансформаторів', cat: 'Компанія' },
    { d: '21 бер 2026', t: 'Сертифікація за стандартом IEC 60076-11 для сухих трансформаторів', cat: 'Якість' },
  ];
  return (
    <Section theme={theme}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
        <div>
          <Eyebrow theme={theme}>Новини</Eyebrow>
          <H2 theme={theme}>Що відбувається<br/>у компанії</H2>
        </div>
        <CtaButton label="Усі новини" variant="ghost" theme={theme} onClick={() => setPage('news')}/>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: t.border, border: `1px solid ${t.border}`, borderRadius: 20, overflow: 'hidden' }}>
        {news.map((n, i) => (
          <div key={i} style={{ background: t.surface, padding: 32, display: 'flex', flexDirection: 'column', gap: 24, minHeight: 280, cursor: 'pointer', transition: 'background .2s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = t.surface2}
            onMouseLeave={(e) => e.currentTarget.style.background = t.surface}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: t.textDim, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              <span>{n.cat}</span>
              <span>{n.d}</span>
            </div>
            <div style={{ flex: 1, fontFamily: window.ZP_TOKENS.fontSans, fontWeight: 600, fontSize: 22, color: t.text, letterSpacing: '-0.015em', lineHeight: 1.25, textWrap: 'balance' }}>{n.t}</div>
            <div style={{ color: t.text, display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500 }}>
              Читати <IcArrow size={14}/>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function HomeContact({ theme, setPage }) {
  const t = window.ZP_THEMES[theme];
  return (
    <Section theme={theme} bg={t.bgAlt} pad="120px 40px 160px">
      <div style={{
        position: 'relative', textAlign: 'center', maxWidth: 900, margin: '0 auto',
      }}>
        <Eyebrow theme={theme}>Співпраця</Eyebrow>
        <h2 style={{
          fontFamily: window.ZP_TOKENS.fontHeading,
          fontSize: 'clamp(44px, 5.5vw, 80px)', fontWeight: 700,
          lineHeight: 1.0, letterSpacing: '-0.035em',
          color: t.text, margin: '24px 0 0', textWrap: 'balance',
        }}>
          Обговорімо ваш <GradText>енергооб'єкт</GradText>
        </h2>
        <p style={{
          fontFamily: window.ZP_TOKENS.fontSans, fontSize: 20, lineHeight: 1.5,
          color: t.textSub, margin: '24px auto 0', maxWidth: 600,
        }}>
          Розрахунок, комерційна пропозиція та технічна консультація — безкоштовно протягом 48 годин.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 40, flexWrap: 'wrap' }}>
          <CtaButton label="Залишити запит" theme={theme} size="lg" onClick={() => setPage('contacts')}/>
          <CtaButton label="info@zelect.com.ua" variant="ghost" theme={theme} size="lg" icon={false}/>
        </div>
      </div>
    </Section>
  );
}

function HomePage({ theme, setPage }) {
  return (
    <>
      <HomeHero theme={theme} setPage={setPage}/>
      <HomeTicker theme={theme}/>
      <HomeProducts theme={theme} setPage={setPage}/>
      <HomeStats theme={theme}/>
      <HomeServices theme={theme} setPage={setPage}/>
      <HomeWhy theme={theme}/>
      <HomeCases theme={theme}/>
      <HomeSupport theme={theme} setPage={setPage}/>
      <HomeCerts theme={theme}/>
      <HomeNews theme={theme} setPage={setPage}/>
      <HomeContact theme={theme} setPage={setPage}/>
    </>
  );
}

Object.assign(window, { HomePage });
