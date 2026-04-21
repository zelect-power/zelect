import { ROUTES } from '@/lib/routes';

export const NAV_CTA_LABEL = 'Отримати пропозицію';

export const TOP_NAV = [
  { label: 'Продукти', href: ROUTES.products, hasDropdown: true },
  { label: 'Послуги', href: ROUTES.services, hasDropdown: false },
  { label: 'Підтримка', href: ROUTES.support, hasDropdown: false },
  { label: 'Новини', href: ROUTES.news, hasDropdown: false },
  { label: 'Контакти', href: ROUTES.contacts, hasDropdown: false },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: 'Продукти',
    href: ROUTES.products,
    items: [
      'Силові трансформатори',
      'Розподільчі трансформатори',
      'КТП',
      'Розподільчі пристрої',
      'Ввідно-розподільчі',
      'Кабельна продукція',
    ],
  },
  {
    title: 'Послуги',
    href: ROUTES.services,
    items: [
      'Проєктування',
      'Виробництво',
      'Монтаж',
      'Пусконалагодження',
      'Сервіс',
      'Модернізація',
    ],
  },
  {
    title: 'Компанія',
    href: ROUTES.news,
    items: [
      'Про нас',
      'Сертифікати',
      'Реалізовані проєкти',
      'Новини',
      'Вакансії',
      'Партнерам',
    ],
  },
  {
    title: 'Підтримка',
    href: ROUTES.support,
    items: [
      'База знань',
      'Документація',
      'Запчастини',
      'Гарантія',
      '24/7 Сервіс',
      'Контакти',
    ],
  },
] as const;

export const FOOTER_SOCIAL = ['LI', 'FB', 'YT', 'TG'] as const;
