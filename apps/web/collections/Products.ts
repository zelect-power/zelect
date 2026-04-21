import type { CollectionConfig } from 'payload';

import { contentAccess } from '@/access/roles';
import { seoGroup } from '@/fields/seo';
import { slugField } from '@/fields/slug';

// ICECAT-328 — каталожные товары.
// Скрытые admin-only поля (`price`, `currency`, `stock`, `minOrderQty`)
// зарезервированы под будущий модуль корзины (см. ADR-005, TZ §4.5).
export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Товар', plural: 'Товари' },
  access: contentAccess,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['article', 'title', 'category', 'featured', 'updatedAt'],
    listSearchableFields: ['title', 'article'],
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'article',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Артикул (SKU), унікальний.' },
    },
    slugField,
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      labels: { singular: 'Зображення', plural: 'Галерея' },
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    { name: 'description', type: 'richText', localized: true },
    {
      name: 'specs',
      type: 'array',
      labels: { singular: 'Характеристика', plural: 'Характеристики' },
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'value', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'documents',
      type: 'array',
      labels: { singular: 'Документ', plural: 'Документи (PDF)' },
      fields: [
        { name: 'file', type: 'upload', relationTo: 'media', required: true },
        { name: 'label', type: 'text', localized: true },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Показувати на головній як ключовий.' },
    },
    seoGroup,

    // ── Hidden admin-only «cart readiness» ─────────────────────────
    {
      type: 'collapsible',
      label: 'Корзина (не відображається на сайті v1)',
      admin: {
        initCollapsed: true,
        description: 'Задел під ICECAT-363. На фронті зараз приховано.',
      },
      fields: [
        { name: 'price', type: 'number', min: 0 },
        {
          name: 'currency',
          type: 'select',
          defaultValue: 'UAH',
          options: [
            { label: 'UAH', value: 'UAH' },
            { label: 'USD', value: 'USD' },
            { label: 'EUR', value: 'EUR' },
          ],
        },
        {
          name: 'stock',
          type: 'select',
          defaultValue: 'to_order',
          options: [
            { label: 'В наявності', value: 'in_stock' },
            { label: 'Під замовлення', value: 'to_order' },
            { label: 'Немає в наявності', value: 'out_of_stock' },
          ],
        },
        { name: 'minOrderQty', type: 'number', min: 1 },
      ],
    },
  ],
};
