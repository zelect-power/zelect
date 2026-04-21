import type { Field } from 'payload';

// Общая SEO field-group. Подключается к Products, Categories, Services,
// News, Pages. `ogImage` — relationship на Media (добавляется при монтаже
// коллекции, см. ниже).
export const seoGroup: Field = {
  name: 'seo',
  label: 'SEO',
  type: 'group',
  admin: {
    position: 'sidebar',
    description:
      'Мета-дані для пошукових систем і соцмереж. Порожні поля — fallback на title/description сутності.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      maxLength: 70,
      admin: { description: 'Рекомендовано ≤60 символів.' },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      maxLength: 200,
      admin: { description: 'Рекомендовано ≤160 символів.' },
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'OpenGraph preview, 1200×630.' },
    },
  ],
};
