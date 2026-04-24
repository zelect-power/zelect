'use client';

import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'certificates', label: 'Сертифікати' },
  { id: 'cases', label: 'Реалізовані проєкти' },
  { id: 'partners', label: 'Партнери' },
];

// Sticky sub-nav для страницы «Про компанію» (ICECAT-368).
// Подсвечивает текущую секцию при скролле через IntersectionObserver.
export function AboutNav() {
  const [active, setActive] = useState<string>(SECTIONS[0]!.id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([e]) => {
          if (e?.isIntersecting) setActive(id);
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      aria-label="Розділи «Про компанію»"
      className="bg-background/80 border-border-theme sticky top-[72px] z-30 -mx-10 overflow-x-auto border-b px-10 py-3 backdrop-blur-md"
    >
      <ul className="mx-auto flex max-w-[1440px] gap-2">
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={
                  'inline-flex rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ' +
                  (isActive
                    ? 'bg-foreground text-background'
                    : 'border-border-theme text-muted-foreground hover:border-border-strong hover:text-foreground border')
                }
              >
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
