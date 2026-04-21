import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-8 py-24">
      <div className="w-full max-w-3xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <span className="text-faint-foreground inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: 'var(--gradient-brand)' }}
            />
            Next.js 16 · Tailwind 4 · дизайн-токени Zelect
          </span>
          <ThemeToggle />
        </div>
        <h1 className="text-foreground text-5xl leading-none font-bold tracking-tight md:text-7xl">
          Енергія, що{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'var(--gradient-brand)' }}
          >
            тримає
          </span>{' '}
          критичну інфраструктуру
        </h1>
        <p className="text-muted-foreground mt-6 max-w-xl text-lg">
          Фундамент перенесений — шрифти (Inter&nbsp;Tight, Science&nbsp;Gothic,
          JetBrains&nbsp;Mono), палітра (brand emerald, ink), семантичні токени
          світлої та тёмної теми. Наступні завдання — переключатель теми
          (ICECAT-321) і глобальний layout (ICECAT-323).
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="/admin"
            className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white transition-transform hover:-translate-y-px"
            style={{
              background: 'var(--gradient-brand)',
              boxShadow: '0 6px 16px rgb(15 122 82 / 0.22)',
            }}
          >
            Placeholder admin →
          </a>
          <a
            href="http://144.91.95.134:3777/"
            className="border-border-strong hover:bg-background-soft text-foreground inline-flex h-12 items-center gap-2 rounded-full border px-6 text-sm font-semibold transition-colors"
          >
            Прототип на :3777
          </a>
        </div>
        <dl className="border-border-theme mt-14 grid max-w-xl grid-cols-3 gap-6 border-t pt-8">
          <div>
            <dt className="text-faint-foreground text-xs tracking-widest uppercase">
              Тема
            </dt>
            <dd className="text-foreground mt-1 font-mono text-sm">
              data-theme
            </dd>
          </div>
          <div>
            <dt className="text-faint-foreground text-xs tracking-widest uppercase">
              Палітра
            </dt>
            <dd className="text-foreground mt-1 font-mono text-sm">
              brand-300..700
            </dd>
          </div>
          <div>
            <dt className="text-faint-foreground text-xs tracking-widest uppercase">
              Шрифти
            </dt>
            <dd className="text-foreground mt-1 font-mono text-sm">
              next/font
            </dd>
          </div>
        </dl>
      </div>
    </main>
  );
}
