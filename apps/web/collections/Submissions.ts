import type { CollectionConfig } from 'payload';

import { isAdmin, isAuthed } from '@/access/roles';

// ICECAT-331 — заявки с форм («Запит КП», контакт, «Запит ціни»).
// Публично создаются через POST /api/submissions (с honeypot + rate-limit
// на уровне app/(main)/api/submissions/route.ts — делается в ICECAT-346).
// В админке поля read-only для всех — менять можно только `status`.
export const Submissions: CollectionConfig = {
  slug: 'submissions',
  labels: { singular: 'Заявка', plural: 'Заявки' },
  access: {
    // POST создаётся через наш API-роут (он вручную вызывает req.payload.create).
    create: () => true,
    read: isAuthed,
    update: isAuthed,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['type', 'fullName', 'email', 'status', 'createdAt'],
    listSearchableFields: ['fullName', 'email', 'company', 'message'],
  },
  fields: [
    // Virtual «subject» — собирается из type + fullName для useAsTitle.
    {
      name: 'subject',
      type: 'text',
      admin: { hidden: true },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            const s = siblingData as Record<string, string | undefined>;
            const parts = [s.type ?? '—', s.fullName ?? '', s.company ?? ''].filter(Boolean);
            return parts.join(' · ');
          },
        ],
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'contact',
      options: [
        { label: 'Запит КП', value: 'quote' },
        { label: 'Контактна форма', value: 'contact' },
        { label: 'Запит ціни (товар)', value: 'product_inquiry' },
      ],
    },
    { name: 'fullName', type: 'text', required: true },
    { name: 'company', type: 'text' },
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'email', required: true },
    { name: 'message', type: 'textarea' },
    {
      name: 'productRef',
      type: 'relationship',
      relationTo: 'products',
      admin: { description: 'Заповнюється автоматично, якщо заявка з картки товару.' },
    },
    {
      name: 'source',
      type: 'text',
      admin: { description: 'URL сторінки, з якої відправлено.' },
    },
    {
      name: 'ipHash',
      type: 'text',
      access: { read: () => true, update: () => false },
      admin: {
        readOnly: true,
        description: 'sha256 від IP — використовується для rate-limit.',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Новий', value: 'new' },
        { label: 'Звʼязалися', value: 'contacted' },
        { label: 'Закрито', value: 'closed' },
      ],
    },
  ],
};
