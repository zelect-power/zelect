import type { CollectionConfig } from 'payload';

import { contentAccess } from '@/access/roles';
import { seoGroup } from '@/fields/seo';
import { slugField } from '@/fields/slug';
import { statusField } from '@/fields/status';

// ICECAT-336 — новости.
// Публичный API фильтрует draft-контент (см. apps/web/lib/payload.ts когда напишем).
export const News: CollectionConfig = {
  slug: 'news',
  labels: { singular: 'Новина', plural: 'Новини' },
  access: contentAccess,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'status', 'updatedAt'],
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField,
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'company',
      options: [
        { label: 'Проєкти', value: 'projects' },
        { label: 'Компанія', value: 'company' },
        { label: 'Якість', value: 'quality' },
        { label: 'Партнерство', value: 'partnership' },
        { label: 'Галузь', value: 'industry' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    { name: 'excerpt', type: 'textarea', localized: true, maxLength: 400 },
    { name: 'body', type: 'richText', localized: true, required: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar' },
    },
    statusField,
    seoGroup,
  ],
};
