import { GradText } from '@/components/common/section';
import { CtaButton } from '@/components/ui/cta-button';
import { ROUTES } from '@/lib/routes';

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center justify-center px-8 py-24">
      <div className="max-w-[640px] text-center">
        <div
          className="text-foreground text-[96px] leading-none font-bold tracking-[-0.04em]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          <GradText>404</GradText>
        </div>
        <h1
          className="text-foreground m-0 mt-6 text-[40px] font-bold tracking-[-0.02em]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Сторінку не знайдено
        </h1>
        <p className="text-muted-foreground mt-4 text-[17px] leading-[1.5]">
          Можливо, сторінка була переміщена або URL містить помилку.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <CtaButton href={ROUTES.home} size="lg">
            На головну
          </CtaButton>
          <CtaButton href={ROUTES.products} variant="ghost" size="lg">
            До каталогу
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
