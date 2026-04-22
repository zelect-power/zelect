'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import { useSyncExternalStore } from 'react';

const KEY = 'zp-cookie-consent';

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

function getSnapshot(): 'accepted' | 'declined' | null {
  if (typeof window === 'undefined') return null;
  try {
    const v = window.localStorage.getItem(KEY);
    if (v === 'accepted' || v === 'declined') return v;
  } catch {
    // ignore
  }
  return null;
}

function getServerSnapshot(): null {
  return null;
}

interface Props {
  gaId?: string;
}

// GA4 подключается только если пользователь явно принял cookies (ICECAT-357).
// Это единственный подход, совместимый с GDPR и TZ §5.
export function Analytics({ gaId }: Props) {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (!gaId || consent !== 'accepted') return null;
  return <GoogleAnalytics gaId={gaId} />;
}
