import type { GlobalConfig } from 'payload';

import { isAdmin, isAuthed } from '@/access/roles';

// ICECAT-330 — глобальные настройки сайта.
// Access: admin r/w, editor — только read (так требует ADR-005).
export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Налаштування',
  access: {
    read: isAuthed,
    update: isAdmin,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Компанія',
          fields: [
            { name: 'companyName', type: 'text', required: true },
            { name: 'legalName', type: 'text', admin: { description: 'Повна юридична назва' } },
            { name: 'vatNumber', type: 'text', admin: { description: 'ЄДРПОУ / IBAN / ПДВ-код' } },
            {
              name: 'hotline',
              type: 'text',
              admin: { description: 'Гаряча лінія 24/7 — показується у футері та на /pidtrymka.' },
            },
          ],
        },
        {
          label: 'Контакти',
          fields: [
            {
              name: 'contacts',
              type: 'group',
              fields: [
                { name: 'phone', type: 'text' },
                { name: 'email', type: 'email' },
                { name: 'emailTender', type: 'email', label: 'Email (тендери)' },
                { name: 'emailService', type: 'email', label: 'Email (сервіс)' },
                { name: 'address', type: 'textarea', localized: true },
              ],
            },
            {
              name: 'offices',
              type: 'array',
              labels: { singular: 'Офіс', plural: 'Офіси' },
              fields: [
                { name: 'city', type: 'text', required: true, localized: true },
                { name: 'role', type: 'text', required: true, localized: true },
                { name: 'address', type: 'textarea', required: true, localized: true },
                { name: 'phone', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Соцмережі',
          fields: [
            {
              name: 'social',
              type: 'group',
              fields: [
                { name: 'linkedin', type: 'text' },
                { name: 'facebook', type: 'text' },
                { name: 'youtube', type: 'text' },
                { name: 'telegram', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'SEO за замовчуванням',
          fields: [
            {
              name: 'defaultSeo',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', localized: true },
                { name: 'description', type: 'textarea', localized: true, maxLength: 200 },
                { name: 'ogImage', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
      ],
    },
  ],
};
