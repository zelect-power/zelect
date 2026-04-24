import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { PageHeader } from '@/components/common/page-header';
import { Eyebrow, H2, Section } from '@/components/common/section';
import { AboutNav } from '@/components/about/about-nav';
import { IcShield } from '@/components/icons';
import { ROUTES } from '@/lib/routes';

export const metadata = {
  title: 'Про компанію',
  description:
    'ТОВ «Зелект Пауер Технолоджі» — українська компанія у сфері трансформаторного обладнання: постачання, підключення, сервіс.',
};

const INTRO_TEXT = [
  'ТОВ «ЗЕЛЕКТ ПАУЕР ТЕХНОЛОДЖІ» — українська компанія у сфері трансформаторного обладнання.',
  'Основний напрям — постачання трансформаторів, їх підключення та технічне обслуговування. Забезпечуємо повний цикл робіт: підбір обладнання, монтаж, введення в експлуатацію та сервісну підтримку.',
  'Гарантуємо якісне виконання робіт, дотримання технічних вимог і стабільну роботу обладнання. Сервіс включає діагностику, профілактику та оперативне усунення несправностей для мінімізації простоїв.',
];

const CERTIFICATES = [
  { n: 'ДСТУ IEC 60076', d: 'Силові трансформатори' },
  { n: 'ISO 9001:2015', d: 'Система управління якістю' },
  { n: 'Prozorro', d: 'Держзакупівлі' },
];

const CASES = [
  {
    cat: 'Енергетика',
    t: 'Відновлення підстанції 110/35/10 кВ',
    loc: 'Харківська обл.',
    y: '2025',
  },
  {
    cat: 'Промисловість',
    t: 'Електропостачання металургійного цеху',
    loc: 'Кривий Ріг',
    y: '2024',
  },
  { cat: 'Державний сектор', t: 'Резервне живлення лікарняного комплексу', loc: 'Київ', y: '2024' },
];

// Моки партнёров — логотипы добавятся позже, сейчас показываем placeholder
// с названием и стилем brand-chip.
const PARTNERS = ['Укренерго', 'ДТЕК', 'Укрзалізниця', 'Нафтогаз', 'Енергоатом', 'Метінвест'];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Про компанію"
        title="Трансформаторне обладнання — постачання, монтаж, сервіс"
      />
      <Section padding="compact">
        <Breadcrumbs items={[{ label: 'Головна', href: ROUTES.home }, { label: 'Про компанію' }]} />
      </Section>

      <Section padding="compact" className="!pt-4 !pb-12">
        <article className="text-muted-foreground max-w-[900px] text-[17px] leading-[1.7]">
          {INTRO_TEXT.map((p, i) => (
            <p key={i} className={i === 0 ? 'text-foreground text-[19px] leading-[1.55]' : 'mt-5'}>
              {p}
            </p>
          ))}
        </article>
      </Section>

      <AboutNav />

      <Section id="certificates" padding="compact" className="!pt-16 !pb-12">
        <Eyebrow>Сертифікати</Eyebrow>
        <H2 size={40} className="mt-5">
          Відповідність стандартам
        </H2>
        <div className="bg-border-theme border-border-theme mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[16px] border sm:grid-cols-3">
          {CERTIFICATES.map((c) => (
            <div key={c.n} className="bg-background flex flex-col gap-2 p-6">
              <IcShield size={20} />
              <div
                className="text-foreground mt-4 text-[16px] font-bold tracking-[-0.01em]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {c.n}
              </div>
              <div className="text-faint-foreground text-xs">{c.d}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="cases" padding="compact" alt className="!pt-16 !pb-12">
        <Eyebrow>Реалізовані проєкти</Eyebrow>
        <H2 size={40} className="mt-5">
          Інфраструктура, яка вже працює
        </H2>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {CASES.map((c) => (
            <div key={c.t} className="bg-surface border-border-theme rounded-[20px] border p-6">
              <div
                className="text-faint-foreground text-xs tracking-[0.08em] uppercase"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {c.cat}
              </div>
              <div
                className="text-foreground mt-3 text-[20px] leading-[1.2] font-bold tracking-[-0.015em]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {c.t}
              </div>
              <div className="border-border-theme text-faint-foreground mt-5 flex justify-between border-t pt-4 text-xs">
                <span>{c.loc}</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{c.y}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="partners" padding="compact" className="!pt-16 !pb-[120px]">
        <Eyebrow>Партнери</Eyebrow>
        <H2 size={40} className="mt-5">
          З ким ми працюємо
        </H2>
        <p className="text-muted-foreground mt-5 max-w-[620px] text-[16px] leading-[1.55]">
          Постачання обладнання під проєкти державних та приватних замовників енергетичного сектору
          України. Логотипи партнерів — заглушки; реальні зображення додамо після отримання прав на
          використання.
        </p>
        <div className="bg-border-theme border-border-theme mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[16px] border sm:grid-cols-3 lg:grid-cols-6">
          {PARTNERS.map((name) => (
            <div
              key={name}
              className="bg-surface flex aspect-[3/2] items-center justify-center p-6"
            >
              <span className="text-muted-foreground text-[15px] font-semibold tracking-[-0.01em]">
                {name}
              </span>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
