'use client';

import { useTheme } from '@/components/theme-provider';
import type { ThemePreference } from '@/lib/theme';

const OPTIONS: Array<{ value: ThemePreference; label: string; icon: string }> = [
  { value: 'light', label: 'Світла', icon: '☀' },
  { value: 'system', label: 'Системна', icon: '◑' },
  { value: 'dark', label: 'Тёмна', icon: '☾' },
];

export function ThemeToggle() {
  const { preference, setPreference } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Тема інтерфейсу"
      className="border-border-theme inline-flex items-center gap-0 rounded-full border p-0.5 text-xs"
    >
      {OPTIONS.map((opt) => {
        const active = preference === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={opt.label}
            title={opt.label}
            onClick={() => setPreference(opt.value)}
            className={
              'inline-flex h-7 w-8 items-center justify-center rounded-full font-medium transition-colors ' +
              (active
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:text-foreground')
            }
          >
            <span aria-hidden className="text-sm leading-none">
              {opt.icon}
            </span>
          </button>
        );
      })}
    </div>
  );
}
