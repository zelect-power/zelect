import Link from 'next/link';

import { ZPLogo } from '@/components/brand/zp-logo';
import { FOOTER_COLUMNS, FOOTER_SOCIAL } from '@/components/layout/nav-data';

export function Footer() {
  return (
    <footer className="bg-background-alt border-border-theme border-t px-10 pt-20 pb-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-1">
            <ZPLogo />
            <p className="text-muted-foreground mt-5 max-w-xs text-sm leading-relaxed">
              Виробник силових трансформаторів та енергетичного обладнання для промисловості й
              державного сектору України.
            </p>
            <div className="mt-6 flex gap-2">
              {FOOTER_SOCIAL.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="border-border-theme text-muted-foreground hover:text-foreground inline-flex h-9 w-9 items-center justify-center rounded-[10px] border text-[11px] font-semibold"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="text-faint-foreground mb-5 text-[11px] font-semibold tracking-[0.14em] uppercase">
                {col.title}
              </div>
              <ul className="flex flex-col gap-3">
                {col.items.map((item) => (
                  <li key={item}>
                    <Link
                      href={col.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-border-theme mt-18 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
          <div className="text-faint-foreground text-xs">
            © 2026 Zelect Power Technology. Усі права захищено.
          </div>
          <div className="flex gap-6">
            <Link
              href="/polityka-konfidencijnosti"
              className="text-faint-foreground hover:text-foreground text-xs transition-colors"
            >
              Політика конфіденційності
            </Link>
            <Link
              href="/umovy-vykorystannya"
              className="text-faint-foreground hover:text-foreground text-xs transition-colors"
            >
              Умови використання
            </Link>
            <span className="text-faint-foreground text-xs">zelect.com.ua</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
