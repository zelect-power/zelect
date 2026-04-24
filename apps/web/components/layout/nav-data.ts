import { ROUTES } from '@/lib/routes';

export const NAV_CTA_LABEL = 'Отримати пропозицію';

// ICECAT-368 — добавлен пункт «Про компанію».
// ICECAT-369 — «Продукти» теперь без dropdown (только линк).
export const TOP_NAV = [
  { label: 'Продукти', href: ROUTES.products, hasDropdown: false },
  { label: 'Послуги', href: ROUTES.services, hasDropdown: false },
  { label: 'Про компанію', href: ROUTES.about, hasDropdown: false },
  { label: 'Підтримка', href: ROUTES.support, hasDropdown: false },
  { label: 'Новини', href: ROUTES.news, hasDropdown: false },
  { label: 'Контакти', href: ROUTES.contacts, hasDropdown: false },
] as const;

// ICECAT-369 — в футере убраны «Ввідно-розподільчі» и «Кабельна продукція»
// (эти категории больше не предлагаются).
// ICECAT-367 — «24/7 Сервіс» заменено на просто «Сервіс», «Про нас» теперь
// ведёт в раздел «Про компанію».
export const FOOTER_COLUMNS = [
  {
    title: 'Продукти',
    href: ROUTES.products,
    items: ['Силові трансформатори', 'Розподільчі трансформатори', 'КТП', 'Розподільчі пристрої'],
  },
  {
    title: 'Послуги',
    href: ROUTES.services,
    items: ['Проєктування', 'Виробництво', 'Монтаж', 'Пусконалагодження', 'Сервіс', 'Модернізація'],
  },
  {
    title: 'Компанія',
    href: ROUTES.about,
    items: ['Про нас', 'Сертифікати', 'Реалізовані проєкти', 'Партнери', 'Новини'],
  },
  {
    title: 'Підтримка',
    href: ROUTES.support,
    items: ['База знань', 'Документація', 'Запчастини', 'Гарантія', 'Сервіс', 'Контакти'],
  },
] as const;

export const FOOTER_SOCIAL = ['LI', 'FB', 'YT', 'TG'] as const;
