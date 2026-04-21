import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { ROUTES } from '@/lib/routes';

export const metadata = {
  title: 'Умови використання',
  description: 'Умови користування сайтом zelect.com.ua та обмеження відповідальності.',
};

export default function TermsOfUse() {
  return (
    <>
      <PageHeader eyebrow="Правова інформація" title="Умови використання" />
      <Section padding="compact">
        <Breadcrumbs
          items={[{ label: 'Головна', href: ROUTES.home }, { label: 'Умови використання' }]}
        />
      </Section>
      <Section padding="compact" className="!pt-8 !pb-[120px]">
        <article className="text-muted-foreground mx-auto max-w-[780px] text-[16px] leading-[1.7]">
          <p>
            Користуючись сайтом zelect.com.ua, ви погоджуєтесь з умовами, викладеними нижче. Якщо ви
            не погоджуєтесь — припиніть використання сайту.
          </p>
          <h2
            className="text-foreground mt-10 text-[24px] font-bold"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Інтелектуальна власність
          </h2>
          <p className="mt-4">
            Весь контент сайту — тексти, зображення, технічні характеристики обладнання — належить
            ТОВ «Zelect Power Technology» або ліцензовано. Копіювання та поширення без письмового
            дозволу заборонено.
          </p>
          <h2
            className="text-foreground mt-10 text-[24px] font-bold"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Обмеження відповідальності
          </h2>
          <p className="mt-4">
            Інформація про технічні характеристики носить довідковий характер і може змінюватися.
            Для точних параметрів звертайтеся до менеджерів компанії.
          </p>
          <p className="text-faint-foreground mt-10 text-[13px]">
            Повна редакція документа — на етапі юридичного узгодження (ICECAT-354).
          </p>
        </article>
      </Section>
    </>
  );
}
