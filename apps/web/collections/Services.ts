import type { CollectionConfig } from 'payload';

import { contentAccess } from '@/access/roles';
import { seoGroup } from '@/fields/seo';
import { slugField } from '@/fields/slug';

// ICECAT-334 — услуги Zelect.
// Набор иконок ограничен теми, что уже есть в прототипе (public/src/icons.jsx).
export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Послуга', plural: 'Послуги' },
  access: contentAccess,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'updatedAt'],
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField,
    {
      name: 'icon',
      type: 'select',
      required: true,
      defaultValue: 'wrench',
      options: [
        { label: 'Document', value: 'doc' },
        { label: 'Factory', value: 'factory' },
        { label: 'Build', value: 'build' },
        { label: 'Spark', value: 'spark' },
        { label: 'Wrench', value: 'wrench' },
        { label: 'Cog', value: 'cog' },
        { label: 'Shield', value: 'shield' },
        { label: 'Clock', value: 'clock' },
      ],
    },
    { name: 'summary', type: 'text', localized: true, maxLength: 240 },
    { name: 'description', type: 'richText', localized: true },
    {
      name: 'bullets',
      type: 'array',
      labels: { singular: 'Пункт', plural: 'Пункти списку' },
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    seoGroup,
  ],
};
