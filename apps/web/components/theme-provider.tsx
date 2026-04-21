'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

import {
  THEME_STORAGE_KEY,
  resolveSystemTheme,
  resolveTheme,
  type ResolvedTheme,
  type ThemePreference,
} from '@/lib/theme';

interface ThemeContextValue {
  preference: ThemePreference;
  resolved: ResolvedTheme;
  setPreference: (next: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ── External store: user preference from localStorage ──────────────────────

type Listener = () => void;
const prefListeners = new Set<Listener>();

function notifyPrefListeners() {
  for (const l of prefListeners) l();
}

function subscribePref(listener: Listener) {
  prefListeners.add(listener);
  if (typeof window !== 'undefined') {
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY) notifyPrefListeners();
    };
    window.addEventListener('storage', onStorage);
    return () => {
      prefListeners.delete(listener);
      window.removeEventListener('storage', onStorage);
    };
  }
  return () => prefListeners.delete(listener);
}

function readPreferenceSnapshot(): ThemePreference {
  if (typeof window === 'undefined') return 'system';
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (raw === 'light' || raw === 'dark' || raw === 'system') return raw;
  } catch {
    // localStorage недоступен (приват-режим, CSP).
  }
  return 'system';
}

const PREF_SERVER_SNAPSHOT: ThemePreference = 'system';

// ── External store: prefers-color-scheme ───────────────────────────────────

function subscribeSystemTheme(listener: Listener) {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', listener);
  return () => mq.removeEventListener('change', listener);
}

function readSystemSnapshot(): ResolvedTheme {
  return resolveSystemTheme();
}

const SYSTEM_SERVER_SNAPSHOT: ResolvedTheme = 'light';

// ── Provider ───────────────────────────────────────────────────────────────

export function ThemeProvider({ children }: { children: ReactNode }) {
  const preference = useSyncExternalStore(
    subscribePref,
    readPreferenceSnapshot,
    () => PREF_SERVER_SNAPSHOT,
  );
  const systemTheme = useSyncExternalStore(
    subscribeSystemTheme,
    readSystemSnapshot,
    () => SYSTEM_SERVER_SNAPSHOT,
  );
  const resolved: ResolvedTheme = preference === 'system' ? systemTheme : resolveTheme(preference);

  // Синхронизация data-theme с DOM после каждого рендера — external system update.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolved);
  }, [resolved]);

  const setPreference = useCallback((next: ThemePreference) => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // ignore
    }
    notifyPrefListeners();
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ preference, resolved, setPreference }),
    [preference, resolved, setPreference],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside <ThemeProvider>');
  }
  return ctx;
}
