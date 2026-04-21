'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';

const KEY = 'zp-cookie-consent';
type Consent = 'accepted' | 'declined' | null;

const listeners = new Set<() => void>();
function subscribe(l: () => void) {
  listeners.add(l);
  if (typeof window !== 'undefined') {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) l();
    };
    window.addEventListener('storage', onStorage);
    return () => {
      listeners.delete(l);
      window.removeEventListener('storage', onStorage);
    };
  }
  return () => listeners.delete(l);
}

function getSnapshot(): Consent {
  if (typeof window === 'undefined') return 'accepted';
  try {
    const v = window.localStorage.getItem(KEY);
    if (v === 'accepted' || v === 'declined') return v;
  } catch {
    // ignore
  }
  return null;
}

// Server snapshot: имитируем «уже принято», чтобы SSR не рендерил баннер.
// На клиенте hydration пересчитает реальное значение из localStorage.
// Мы свидомо принимаем небольшой post-hydration flash для пользователей,
// которые ещё не решили — в обмен на отсутствие mismatch.
function getServerSnapshot(): Consent {
  return 'accepted';
}

function setConsent(value: 'accepted' | 'declined') {
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    // ignore
  }
  listeners.forEach((l) => l());
}

export function CookieBanner() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="bg-surface border-border-theme fixed right-4 bottom-4 z-[60] flex max-w-[420px] flex-col gap-3 rounded-[16px] border p-5 shadow-[var(--shadow-card-lg)]"
    >
      <div
        className="text-foreground text-[15px] font-bold"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Cookies
      </div>
      <p className="text-muted-foreground text-[13px] leading-[1.5]">
        Сайт використовує cookies для аналітики. Деталі —{' '}
        <Link href="/polityka-konfidencijnosti" className="text-brand-theme underline">
          політика
        </Link>
        .
      </p>
      <div className="mt-1 flex gap-2">
        <button
          type="button"
          onClick={() => setConsent('accepted')}
          className="inline-flex h-9 items-center justify-center rounded-full px-4 text-[13px] font-semibold text-white"
          style={{ background: 'var(--gradient-brand)' }}
        >
          Прийняти
        </button>
        <button
          type="button"
          onClick={() => setConsent('declined')}
          className="border-border-theme text-foreground hover:bg-background-soft inline-flex h-9 items-center justify-center rounded-full border px-4 text-[13px] font-semibold"
        >
          Відхилити
        </button>
      </div>
    </div>
  );
}
