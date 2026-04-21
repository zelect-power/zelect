import { Eyebrow, H2, Section } from '@/components/common/section';
import { CtaButton } from '@/components/ui/cta-button';
import { IcArrow } from '@/components/icons';
import { payload } from '@/lib/payload';
import { ROUTES } from '@/lib/routes';

// Fallback если в CMS пока нет новостей.
const FALLBACK = [
  {
    publishedAt: '2026-04-14',
    category: 'projects',
    title: 'Zelect Power постачає 12 трансформаторів для відновлення ПС «Харків-4»',
  },
  {
    publishedAt: '2026-04-02',
    category: 'company',
    title: 'Відкрили другу виробничу лінію сухих трансформаторів',
  },
  {
    publishedAt: '2026-03-21',
    category: 'quality',
    title: 'Сертифікація за стандартом IEC 60076-11 для сухих трансформаторів',
  },
];

const CATEGORY_LABEL: Record<string, string> = {
  projects: 'Проєкти',
  company: 'Компанія',
  quality: 'Якість',
  partnership: 'Партнерство',
  industry: 'Галузь',
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('uk-UA', { day: '2-digit', month: 'short', year: 'numeric' });
}

async function loadNews() {
  try {
    const pl = await payload();
    const res = await pl.find({
      collection: 'news',
      limit: 3,
      sort: '-publishedAt',
      where: { status: { equals: 'published' } },
      depth: 0,
    });
    return res.docs.length
      ? res.docs.map((d) => ({
          publishedAt: String(d.publishedAt ?? ''),
          category: String(d.category ?? 'company'),
          title: String(d.title ?? ''),
        }))
      : FALLBACK;
  } catch {
    return FALLBACK;
  }
}

export async function HomeNews() {
  const news = await loadNews();
  return (
    <Section>
      <div className="mb-12 flex flex-wrap items-end justify-between gap-10">
        <div>
          <Eyebrow>Новини</Eyebrow>
          <H2 className="mt-5">
            Що відбувається
            <br />у компанії
          </H2>
        </div>
        <CtaButton href={ROUTES.news} variant="ghost">
          Усі новини
        </CtaButton>
      </div>
      <div className="bg-border-theme border-border-theme grid grid-cols-1 gap-px overflow-hidden rounded-[20px] border md:grid-cols-3">
        {news.map((n, i) => (
          <div
            key={i}
            className="bg-surface hover:bg-surface-2 flex min-h-[280px] cursor-pointer flex-col gap-6 p-8 transition-colors"
          >
            <div className="text-faint-foreground flex justify-between text-[11px] tracking-[0.08em] uppercase">
              <span>{CATEGORY_LABEL[n.category] ?? n.category}</span>
              <span>{formatDate(n.publishedAt)}</span>
            </div>
            <div
              className="text-foreground flex-1 text-[22px] leading-[1.25] font-semibold tracking-[-0.015em]"
              style={{ fontFamily: 'var(--font-heading)', textWrap: 'balance' }}
            >
              {n.title}
            </div>
            <div className="text-foreground inline-flex items-center gap-2 text-sm font-medium">
              Читати <IcArrow size={14} />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
