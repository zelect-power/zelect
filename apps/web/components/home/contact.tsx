import { Eyebrow, GradText, Section } from '@/components/common/section';
import { CtaButton } from '@/components/ui/cta-button';
import { ROUTES } from '@/lib/routes';

export function HomeContact() {
  return (
    <Section alt padding="hero-bottom" className="!py-[120px] lg:!pt-[120px] lg:!pb-40">
      <div className="relative mx-auto max-w-[900px] text-center">
        <Eyebrow>Співпраця</Eyebrow>
        <h2
          className="text-foreground m-0 mt-5 font-bold md:mt-6"
          style={{
            fontSize: 'clamp(30px, 6.5vw, 80px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            textWrap: 'balance',
            wordBreak: 'break-word',
          }}
        >
          Обговорімо ваш <GradText>енергооб&apos;єкт</GradText>
        </h2>
        <p className="text-muted-foreground mx-auto mt-5 max-w-[600px] text-[16px] leading-[1.5] md:mt-6 md:text-[20px]">
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
