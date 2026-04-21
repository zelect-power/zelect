import { Eyebrow, GradText, Section } from '@/components/common/section';
import { CtaButton } from '@/components/ui/cta-button';
import { ROUTES } from '@/lib/routes';

export function HomeContact() {
  return (
    <Section alt padding="hero-bottom" className="!py-[120px] lg:!pt-[120px] lg:!pb-40">
      <div className="relative mx-auto max-w-[900px] text-center">
        <Eyebrow>Співпраця</Eyebrow>
        <h2
          className="text-foreground m-0 mt-6 font-bold"
          style={{
            fontSize: 'clamp(44px, 5.5vw, 80px)',
            lineHeight: 1.0,
            letterSpacing: '-0.035em',
            textWrap: 'balance',
          }}
        >
          Обговорімо ваш <GradText>енергооб&apos;єкт</GradText>
        </h2>
        <p className="text-muted-foreground mx-auto mt-6 max-w-[600px] text-[20px] leading-[1.5]">
          Розрахунок, комерційна пропозиція та технічна консультація — безкоштовно протягом 48
          годин.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <CtaButton href={ROUTES.contacts} size="lg">
            Залишити запит
          </CtaButton>
          <CtaButton href="mailto:info@zelect.com.ua" variant="ghost" size="lg" icon={false}>
            info@zelect.com.ua
          </CtaButton>
        </div>
      </div>
    </Section>
  );
}
