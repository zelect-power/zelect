'use client';

import { useState } from 'react';

interface Item {
  q: string;
  a: string;
}

export function FAQ({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="bg-surface border-border-theme overflow-hidden rounded-[20px] border">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={i < items.length - 1 ? 'border-border-theme border-b' : ''}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="text-foreground flex w-full items-center justify-between gap-5 px-7 py-6 text-left text-[17px] font-semibold tracking-[-0.01em]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span>{f.q}</span>
              <span aria-hidden className="text-muted-foreground flex-shrink-0">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && (
              <div className="text-muted-foreground max-w-[720px] px-7 pb-6 text-[15px] leading-[1.6]">
                {f.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
