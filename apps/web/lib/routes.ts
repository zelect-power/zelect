// single source of truth for URL paths; used by Next.js app AND the legacy prototype.
// Keep in sync with public/src/app.jsx (ZP_PAGE_TO_PATH).

export const ROUTES = {
  home: '/',
  products: '/produkty',
  services: '/poslugy',
  support: '/pidtrymka',
  news: '/novyny',
  contacts: '/kontakty',
} as const;

export type RouteKey = keyof typeof ROUTES;
