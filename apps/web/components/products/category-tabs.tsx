'use client';

import { useState } from 'react';

import { CategoryBlockRenderer } from '@/components/products/category-block';
import type { CategoryTab } from '@/lib/products/types';

interface Props {
  tabs: CategoryTab[];
}

export function CategoryTabs({ tabs }: Props) {
  const [active, setActive] = useState(tabs[0]?.slug ?? '');
  if (tabs.length === 0) return null;
  const current = tabs.find((t) => t.slug === active) ?? tabs[0]!;

  // ICECAT-381 — при единственном табе скрываем tab-bar: для категорий с
  // одним блоком контента (например, 110–330 кВ) переключатель выглядит лишним.
  const showTabBar = tabs.length > 1;

  return (
    <div>
      {showTabBar && (
        <div
          role="tablist"
          aria-label="Розділи каталогу"
          className="border-border-theme flex flex-wrap gap-2 border-b pb-3"
        >
          {tabs.map((t) => {
            const isActive = t.slug === active;
            return (
              <button
                key={t.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(t.slug)}
                className={
                  'inline-flex rounded-full px-4 py-2 text-[13px] font-semibold transition-all md:px-5 md:text-sm ' +
                  (isActive
                    ? 'bg-foreground text-background'
                    : 'border-border-theme text-muted-foreground hover:border-border-strong hover:text-foreground border')
                }
              >
                {t.label}
              </button>
            );
          })}
        </div>
      )}
      <div role="tabpanel" key={current.slug} className={showTabBar ? 'mt-2' : ''}>
        {current.blocks.map((block, i) => (
          <CategoryBlockRenderer key={i} block={block} />
        ))}
      </div>
    </div>
  );
}
