import { Eyebrow, H2, Lead, Section } from '@/components/common/section';
import { CtaButton } from '@/components/ui/cta-button';
import { ROUTES } from '@/lib/routes';

const SLA = [
  { t: 'Реакція на звернення', v: '≤ 15 хв' },
  { t: 'Діагностика віддалена', v: '≤ 2 год' },
  { t: 'Виїзд бригади', v: '≤ 24 год' },
  { t: 'Наявність запчастин', v: '98,4%' },
];

export function HomeSupport() {
  return (
    <Section alt>
      <div className="bg-surface border-border-theme relative grid grid-cols-1 items-center gap-14 overflow-hidden rounded-[24px] border p-14 lg:grid-cols-[1.3fr_1fr]">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{ background: 'var(--gradient-glow)' }}
        />
        <div className="relative">
          <Eyebrow>Підтримка</Eyebrow>
          <H2 size={44} className="mt-5">
            Сервіс, який працює, поки працює ваше обладнання
          </H2>
          <div className="mt-6">
            <Lead>
              Гарячий зв&apos;язок у робочі години, виїзна бригада з діагностичним комплексом, склад
              критичних запчастин, віддалений моніторинг стану.
            </Lead>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaButton href={ROUTES.support}>Service-контракт</CtaButton>
            <CtaButton href="tel:+380800300500" variant="ghost" icon={false}>
              0 800 300 500
            </CtaButton>
          </div>
        </div>
        <div className="relative">
          <div
            className="text-faint-foreground mb-3 border-l-2 pl-3.5 text-xs"
            style={{
              borderColor: 'var(--color-brand)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            SLA STATUS
          </div>
          {SLA.map((x) => (
            <div
              key={x.t}
              className="border-border-theme flex items-center justify-between border-b py-4"
            >
              <span className="text-muted-foreground text-sm">{x.t}</span>
              <span
                className="text-foreground text-sm font-semibold"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {x.v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
