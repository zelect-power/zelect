import { payload } from '@/lib/payload';

// Дефолты для homepage-кастомайзера (ICECAT-367) — на случай когда Settings
// ещё не сохранены или недоступны. Совпадают с defaultValue в globals/Settings.
export const HOMEPAGE_DEFAULTS = {
  showTicker: false,
  showProducts: false,
  showStats: false,
  showServices: false,
  showWhy: true,
  showCases: false,
  showSupport: true,
  showCerts: false,
  showNews: true,
};

export type HomepageVisibility = typeof HOMEPAGE_DEFAULTS;

export async function getHomepageVisibility(): Promise<HomepageVisibility> {
  try {
    const pl = await payload();
    const settings = await pl.findGlobal({ slug: 'settings', depth: 0 });
    const hp = (settings as { homepage?: Partial<HomepageVisibility> } | undefined)?.homepage;
    if (!hp) return HOMEPAGE_DEFAULTS;
    return {
      showTicker: hp.showTicker ?? HOMEPAGE_DEFAULTS.showTicker,
      showProducts: hp.showProducts ?? HOMEPAGE_DEFAULTS.showProducts,
      showStats: hp.showStats ?? HOMEPAGE_DEFAULTS.showStats,
      showServices: hp.showServices ?? HOMEPAGE_DEFAULTS.showServices,
      showWhy: hp.showWhy ?? HOMEPAGE_DEFAULTS.showWhy,
      showCases: hp.showCases ?? HOMEPAGE_DEFAULTS.showCases,
      showSupport: hp.showSupport ?? HOMEPAGE_DEFAULTS.showSupport,
      showCerts: hp.showCerts ?? HOMEPAGE_DEFAULTS.showCerts,
      showNews: hp.showNews ?? HOMEPAGE_DEFAULTS.showNews,
    };
  } catch {
    return HOMEPAGE_DEFAULTS;
  }
}
