'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { ZPLogo } from '@/components/brand/zp-logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { CtaButton } from '@/components/ui/cta-button';
import { NAV_CTA_LABEL, TOP_NAV } from '@/components/layout/nav-data';
import { ROUTES } from '@/lib/routes';

function IconMenu({ className = '' }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

function IconClose({ className = '' }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

function NavLink({
  label,
  href,
  active,
  onClick,
}: {
  label: string;
  href: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={
        'group relative inline-flex items-center py-5 text-sm font-medium transition-colors ' +
        (active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground')
      }
    >
      {label}
      <span
        aria-hidden
        className={
          'absolute right-0 bottom-3.5 left-0 h-0.5 origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100 ' +
          (active ? 'scale-x-100' : '')
        }
        style={{ background: 'var(--gradient-brand)' }}
      />
    </Link>
  );
}

export function Topbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Закрытие мобильного меню при переходе по ссылке — через onClick handler,
  // без useEffect+setState на изменение pathname (anti-pattern в React 19).
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const isActive = (href: string) =>
    href === ROUTES.home ? pathname === href : pathname.startsWith(href);

  const headerBg = scrolled
    ? 'bg-background/80 backdrop-blur-lg saturate-[140%] border-border-theme'
    : 'bg-transparent border-transparent';

  // ICECAT-377 — блокируем скролл body, пока открыто мобильное меню,
  // чтобы пользователь не прокручивал подложку сквозь dialog.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b transition-colors duration-250 ${headerBg}`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-5 md:px-10">
          <Link href={ROUTES.home} className="block py-4">
            <ZPLogo />
          </Link>

          <nav className="hidden flex-1 justify-center gap-7 md:flex">
            {TOP_NAV.map((item) => (
              <NavLink
                key={item.href}
                label={item.label}
                href={item.href}
                active={isActive(item.href)}
                onClick={closeMobile}
              />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <span className="hidden md:inline-flex">
              <CtaButton href={ROUTES.contacts} size="sm">
                {NAV_CTA_LABEL}
              </CtaButton>
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Відкрити меню"
              className="border-border-theme text-foreground hover:bg-background-soft inline-flex h-9 w-9 items-center justify-center rounded-[10px] border md:hidden"
            >
              <IconMenu />
            </button>
          </div>
        </div>
      </header>

      {/* ICECAT-377 — dialog выносится за пределы <header>: у header'а
          `backdrop-blur-lg` создаёт containing block, из-за чего `fixed
          inset-0` ведёт себя как `absolute` относительно header-box.
          ICECAT-379 — fade+slide-in анимация контейнера и stagger пунктов. */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="bg-background fixed inset-0 z-[100] flex flex-col px-7 py-6"
          style={{ animation: 'zp-mobile-menu-in 220ms cubic-bezier(.2,.7,.2,1) both' }}
        >
          <div className="flex items-center justify-between">
            <ZPLogo />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Закрити меню"
              className="border-border-theme text-foreground inline-flex h-9 w-9 items-center justify-center rounded-[10px] border"
            >
              <IconClose />
            </button>
          </div>
          <nav className="mt-10 flex flex-col">
            {TOP_NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-border-theme text-foreground border-b py-4 text-[22px] font-semibold"
                style={{
                  animation: `zp-mobile-item-in 280ms cubic-bezier(.2,.7,.2,1) ${80 + i * 40}ms both`,
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div
            className="mt-10"
            style={{
              animation: `zp-mobile-item-in 280ms cubic-bezier(.2,.7,.2,1) ${80 + TOP_NAV.length * 40}ms both`,
            }}
          >
            <CtaButton href={ROUTES.contacts} size="lg" onClick={() => setMobileOpen(false)}>
              {NAV_CTA_LABEL}
            </CtaButton>
          </div>
        </div>
      )}
    </>
  );
}
