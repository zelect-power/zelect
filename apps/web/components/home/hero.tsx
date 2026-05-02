import { TransformerVisual } from '@/components/brand/transformer-visual';
import { Eyebrow, GradText } from '@/components/common/section';
import { TechGrid } from '@/components/common/tech-grid';
import { CtaButton } from '@/components/ui/cta-button';
import { ROUTES } from '@/lib/routes';

// ICECAT-367 — клиент попросил оставить только один бейдж ДСТУ (IEC 60076 + ISO),
// убрать 24/7 и «UA / Виробництво» (компания — поставщик, не производитель).
const HERO_BADGES = [{ v: 'ДСТУ', l: 'IEC 60076 + ISO' }];

export function HomeHero() {
  return (
    <section
      className="bg-background relative overflow-hidden px-5 pt-8 pb-20 md:px-10 md:pt-10 md:pb-[120px]"
      style={{ animation: 'zp-page-in .5s cubic-bezier(.2,.7,.2,1)' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'var(--color-hero-overlay)' }}
      />
      <TechGrid opacity={0.6} />
      <div className="relative mx-auto grid min-h-[calc(100vh-180px)] max-w-[1440px] items-center gap-10 md:gap-16 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <Eyebrow>Енергетичне обладнання</Eyebrow>
          <h1
            className="text-foreground mt-5 font-bold md:mt-6"
            style={{
              // ICECAT-382 — снизил верхнюю границу clamp с 88→72px и vw c 7→5.5,
              // чтобы «інфраструктуру» (14 знаков) помещалась в левой колонке
              // на laptop (~1024px). Убрал wordBreak: break-word — он рвал слово
              // посредине, когда font не помещался; теперь шрифт fit-by-design.
              fontSize: 'clamp(32px, 5.5vw, 72px)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              textWrap: 'balance',
            }}
          >
            Енергія, що <GradText>тримає</GradText>
            <br />
            критичну інфраструктуру
          </h1>
          <p
            className="text-muted-foreground mt-6 max-w-[560px] text-[16px] leading-[1.5] md:mt-8 md:text-[20px]"
            style={{ textWrap: 'pretty' }}
          >
            Силові та розподільчі трансформатори, КТП, розподільчі пристрої і кабельна продукція для
            промисловості та державного сектору України.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
            <CtaButton href={ROUTES.products} size="lg">
              Каталог продукції
            </CtaButton>
            <CtaButton href={ROUTES.contacts} variant="ghost" size="lg">
              Отримати пропозицію
            </CtaButton>
          </div>
          <dl className="border-border-theme mt-10 flex max-w-[560px] gap-10 border-t pt-6 md:mt-14 md:pt-8">
            {HERO_BADGES.map((b) => (
              <div key={b.l}>
                <dt
                  className="text-foreground text-[22px] font-bold tracking-[-0.02em]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {b.v}
                </dt>
                <dd className="text-faint-foreground mt-1 text-xs tracking-[0.04em]">{b.l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative hidden lg:block">
          <div
            className="pointer-events-none absolute inset-[-10%]"
            style={{ background: 'var(--gradient-glow)' }}
          />
          <div className="relative flex justify-center">
            <TransformerVisual size={560} />
          </div>
          {/* spec chips */}
          <div
            className="bg-surface border-border-theme absolute top-[18%] right-[2%] rounded-[14px] border px-[18px] py-[14px]"
            style={{
              boxShadow: 'var(--shadow-card)',
              animation: 'zp-float 6s ease-in-out infinite',
            }}
          >
            <div className="text-faint-foreground text-[11px] tracking-[0.1em] uppercase">
              Потужність
            </div>
            <div
              className="text-foreground text-[22px] font-bold tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              2500 кВА
            </div>
          </div>
          <div
            className="bg-surface border-border-theme absolute bottom-[14%] left-[-2%] rounded-[14px] border px-[18px] py-[14px]"
            style={{
              boxShadow: 'var(--shadow-card)',
              animation: 'zp-float 7s ease-in-out infinite .5s',
            }}
          >
            <div className="text-faint-foreground text-[11px] tracking-[0.1em] uppercase">
              Напруга
            </div>
            <div
              className="text-foreground text-[22px] font-bold tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              35 / 10,5 кВ
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
