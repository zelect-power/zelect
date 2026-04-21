import { Counter } from '@/components/common/counter';
import { Reveal } from '@/components/common/reveal';
import { Section } from '@/components/common/section';

const STATS = [
  { v: 18, suf: '', l: 'Років на ринку енергетики України' },
  { v: 2400, suf: '+', l: 'Виконаних проєктів по всій країні' },
  { v: 8500, suf: ' МВА', l: 'Сумарна встановлена потужність' },
  { v: 24, suf: '/7', l: 'Сервісна підтримка обладнання' },
];

export function HomeStats() {
  return (
    <Section alt>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {STATS.map((s, i) => (
          <Reveal key={s.l} delay={i * 80}>
            <div
              className={`py-2 pr-6 ${i === 0 ? '' : 'lg:border-border-theme lg:border-l lg:pl-6'}`}
            >
              <Counter to={s.v} suffix={s.suf} />
              <div className="text-muted-foreground mt-4 max-w-[240px] text-sm leading-[1.5]">
                {s.l}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
