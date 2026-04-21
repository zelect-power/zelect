import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { ROUTES } from '@/lib/routes';

export const metadata = {
  title: 'Політика конфіденційності',
  description: 'Правила обробки персональних даних відвідувачів сайту zelect.com.ua.',
};

export default function PrivacyPolicy() {
  return (
    <>
      <PageHeader eyebrow="Правова інформація" title="Політика конфіденційності" />
      <Section padding="compact">
        <Breadcrumbs
          items={[{ label: 'Головна', href: ROUTES.home }, { label: 'Політика конфіденційності' }]}
        />
      </Section>
      <Section padding="compact" className="!pt-8 !pb-[120px]">
        <article className="text-muted-foreground mx-auto max-w-[780px] text-[16px] leading-[1.7]">
          <p>
            ТОВ «Zelect Power Technology» (далі — «Компанія») поважає конфіденційність відвідувачів
            сайту <strong className="text-foreground">zelect.com.ua</strong> і обробляє персональні
            дані відповідно до Закону України «Про захист персональних даних» та GDPR.
          </p>
          <h2
            className="text-foreground mt-10 text-[24px] font-bold"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Які дані збираємо
          </h2>
          <ul className="mt-4 flex list-disc flex-col gap-2 pl-5">
            <li>Email, телефон, ПІБ — коли ви заповнюєте форму запиту КП.</li>
            <li>Назву компанії та зміст звернення — добровільно.</li>
            <li>Технічні дані: IP-адреса (у хешованому вигляді), cookies.</li>
          </ul>
          <h2
            className="text-foreground mt-10 text-[24px] font-bold"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Мета обробки
          </h2>
          <ul className="mt-4 flex list-disc flex-col gap-2 pl-5">
            <li>Відповідь на ваше звернення та підготовка комерційної пропозиції.</li>
            <li>Запобігання зловживанням (rate-limit на формах).</li>
            <li>Аналітика відвідуваності (лише після згоди у cookie-банері).</li>
          </ul>
          <h2
            className="text-foreground mt-10 text-[24px] font-bold"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ваші права
          </h2>
          <p className="mt-4">
            Ви маєте право вимагати доступ до своїх даних, їх виправлення або видалення. Звернення
            надсилайте на{' '}
            <a href="mailto:info@zelect.com.ua" className="text-brand-theme">
              info@zelect.com.ua
            </a>
            .
          </p>
          <p className="text-faint-foreground mt-10 text-[13px]">
            Документ є шаблонним. Повний текст буде узгоджено з юридичною службою компанії — див.
            ICECAT-354.
          </p>
        </article>
      </Section>
    </>
  );
}
