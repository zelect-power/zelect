import type { Metadata } from 'next';
import { Inter_Tight, JetBrains_Mono, Science_Gothic } from 'next/font/google';
import type { ReactNode } from 'react';

import { Analytics } from '@/components/analytics';
import { CookieBanner } from '@/components/cookie-banner';
import { ThemeProvider } from '@/components/theme-provider';
import { Footer } from '@/components/layout/footer';
import { Topbar } from '@/components/layout/topbar';
import { THEME_STORAGE_KEY } from '@/lib/theme';
import '../globals.css';

// ICECAT-322 — шрифты из public/src/tokens.jsx, заведены через next/font.
// subsets latin + cyrillic: основной язык сайта — uk (кириллица).
const interTight = Inter_Tight({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter-tight',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

// ICECAT-365 — Science Gothic на всех заголовках.
const scienceGothic = Science_Gothic({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-science-gothic',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zelect.com.ua';
const SITE_NAME = 'Zelect Power Technology';
const SITE_DESCRIPTION =
  'Силові та розподільчі трансформатори, КТП, розподільчі пристрої і кабельна продукція для промисловості та державного сектору України.';

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — енергетичне обладнання`,
    template: '%s · Zelect Power',
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  keywords: [
    'трансформатори',
    'силовий трансформатор',
    'КТП',
    'розподільчі пристрої',
    'Zelect',
    'енергетичне обладнання',
    'Укренерго',
  ],
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — енергетичне обладнання`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

// JSON-LD Organization — показывается на всех страницах (inline <script>).
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  sameAs: [],
  description: SITE_DESCRIPTION,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Київ',
    addressCountry: 'UA',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'info@zelect.com.ua',
      telephone: '+380800300500',
      areaServed: 'UA',
      availableLanguage: ['uk'],
    },
  ],
};

// Anti-FOUC: ставим data-theme ДО гидратации, исходя из localStorage /
// prefers-color-scheme. Ключ синхронизирован с THEME_STORAGE_KEY.
const themeInitScript = `
  (function(){
    try {
      var stored = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
      var pref = stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
      var resolved = pref === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : pref;
      document.documentElement.setAttribute('data-theme', resolved);
    } catch (_) {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  })();
`;

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="uk"
      data-theme="light"
      suppressHydrationWarning
      className={`${interTight.variable} ${scienceGothic.variable} ${jetBrainsMono.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground flex min-h-full flex-col antialiased">
        <ThemeProvider>
          <Topbar />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
          <CookieBanner />
          <Analytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        </ThemeProvider>
      </body>
    </html>
  );
}
