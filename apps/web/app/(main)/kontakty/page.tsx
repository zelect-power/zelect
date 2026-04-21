import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { PageHeader } from '@/components/common/page-header';
import { H2, Lead, Section } from '@/components/common/section';
import { ContactForm } from '@/components/forms/contact-form';
import { CONTACT_EMAILS, OFFICES_FALLBACK } from '@/lib/fallback';
import { ROUTES } from '@/lib/routes';

export const metadata = {
  title: 'Контакти',
  description:
    'Менеджер проєкту зв\u2019яжеться з вами протягом 2 робочих годин. Комерційна пропозиція — за 48 годин.',
};

interface Props {
  searchParams: Promise<{ product?: string }>;
}

export default async function ContactsPage({ searchParams }: Props) {
  const { product } = await searchParams;

  return (
    <>
      <PageHeader
        eyebrow="Контакти"
        title="Говоримо однією мовою з енергетиками"
        sub="Менеджер проєкту зв'яжеться з вами протягом 2 робочих годин. Комерційна пропозиція — за 48 годин."
      />
      <Section padding="compact">
        <Breadcrumbs items={[{ label: 'Головна', href: ROUTES.home }, { label: 'Контакти' }]} />
      </Section>
      <Section padding="compact" className="!pt-8 !pb-[120px]">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <H2 size={36}>Залишити запит</H2>
            <div className="mt-5">
              <Lead>
                {product
                  ? `Запит ціни для артикулу ${product}. Опишіть необхідні характеристики й обсяг.`
                  : 'Опишіть ваш проєкт — ми відповімо з пропозицією та ТЗ.'}
              </Lead>
            </div>
            <div className="mt-8">
              <ContactForm productRef={product} />
            </div>
          </div>
          <div>
            <H2 size={36}>Офіси</H2>
            <div className="mt-5">
              <Lead>Представлені у 4 регіонах України з виробництвом у Харкові.</Lead>
            </div>
            <div className="bg-border-theme border-border-theme mt-8 flex flex-col gap-px overflow-hidden rounded-[16px] border">
              {OFFICES_FALLBACK.map((o) => (
                <div
                  key={o.city}
                  className="bg-surface grid grid-cols-1 items-center gap-4 p-6 sm:grid-cols-2"
                >
                  <div>
                    <div
                      className="text-foreground text-[20px] font-bold tracking-[-0.01em]"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {o.city}
                    </div>
                    <div className="text-brand-theme mt-1 text-xs font-semibold tracking-[0.06em] uppercase">
                      {o.role}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-[13px] leading-[1.5]">
                      {o.address}
                    </div>
                    <div
                      className="text-foreground mt-1 text-[13px]"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {o.phone}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-6">
              {CONTACT_EMAILS.map((c) => (
                <div key={c.value}>
                  <div className="text-faint-foreground text-xs tracking-[0.1em] uppercase">
                    {c.label}
                  </div>
                  <a
                    href={`mailto:${c.value}`}
                    className="text-foreground hover:text-brand-theme mt-1.5 block text-[16px] transition-colors"
                  >
                    {c.value}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
