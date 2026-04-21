import type { CollectionConfig } from 'payload';

import { contentAccess } from '@/access/roles';
import { seoGroup } from '@/fields/seo';
import { slugField } from '@/fields/slug';
import { statusField } from '@/fields/status';

// ICECAT-337 — статические страницы (О компании, Политика, Условия, 404).
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Сторінка', plural: 'Сторінки' },
  access: contentAccess,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField,
    { name: 'body', type: 'richText', localized: true, required: true },
    statusField,
    seoGroup,
  ],
};
