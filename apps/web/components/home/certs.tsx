import { Eyebrow, H2, Section } from '@/components/common/section';
import { IcShield } from '@/components/icons';

const CERTS = [
  { n: 'ДСТУ IEC 60076', d: 'Силові трансформатори' },
  { n: 'ISO 9001:2015', d: 'Система управління якістю' },
  { n: 'ISO 14001', d: 'Екологічне управління' },
  { n: 'ISO 45001', d: 'Охорона праці' },
  { n: 'Prozorro', d: 'Держзакупівлі' },
  { n: 'CE / EAC', d: 'Експорт' },
];

export function HomeCerts() {
  return (
    <Section padding="compact">
      <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-[1fr_2fr]">
        <div>
          <Eyebrow>Сертифікати</Eyebrow>
          <H2 size={40} className="mt-5">
            Відповідність стандартам
          </H2>
        </div>
        <div className="bg-border-theme border-border-theme grid grid-cols-1 gap-px overflow-hidden rounded-[16px] border sm:grid-cols-3">
          {CERTS.map((c) => (
            <div key={c.n} className="bg-background flex flex-col gap-1.5 p-6">
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
      </div>
    </Section>
  );
}
