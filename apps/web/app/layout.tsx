import type { Metadata } from 'next';
import { Inter_Tight, JetBrains_Mono, Science_Gothic } from 'next/font/google';

import { ThemeProvider } from '@/components/theme-provider';
import { THEME_STORAGE_KEY } from '@/lib/theme';
import './globals.css';

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

export const metadata: Metadata = {
  title: {
    default: 'Zelect Power Technology — енергетичне обладнання',
    template: '%s · Zelect Power',
  },
  description:
    'Силові та розподільчі трансформатори, КТП, розподільчі пристрої і кабельна продукція для промисловості та державного сектору України.',
  metadataBase: new URL('https://zelect.com.ua'),
  alternates: { canonical: '/' },
};

// Anti-FOUC: ставим data-theme ДО гидратации, исходя из localStorage / prefers-color-scheme.
// Без этого при загрузке мелькает противоположная тема.
// Ключ localStorage синхронизирован с THEME_STORAGE_KEY из lib/theme.ts.
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      data-theme="light"
      suppressHydrationWarning
      className={`${interTight.variable} ${scienceGothic.variable} ${jetBrainsMono.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
