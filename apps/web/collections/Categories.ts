import type { CollectionConfig, RelationshipFieldSingleValidation } from 'payload';

import { contentAccess } from '@/access/roles';
import { seoGroup } from '@/fields/seo';
import { slugField } from '@/fields/slug';

// ICECAT-327 — иерархические категории (до 2 уровней).
// Валидация: parent не может сам иметь parent (иначе глубина > 2).
const parentMaxDepth: RelationshipFieldSingleValidation = async (value, { req, id }) => {
  if (!value) return true;
  if (id && (value === id || String(value) === String(id))) {
    return 'Категорія не може бути власним батьком.';
  }
  try {
    const parent = await req.payload.findByID({
      collection: 'categories',
      id: value as string,
      depth: 0,
    });
    if (parent && (parent as { parent?: unknown }).parent) {
      return 'Максимальна вкладеність — 2 рівні.';
    }
  } catch {
    return 'Батьківську категорію не знайдено.';
  }
  return true;
};

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Категорія', plural: 'Категорії' },
  access: contentAccess,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'parent', 'order', 'updatedAt'],
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField,
    { name: 'description', type: 'richText', localized: true },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      admin: { description: 'Батьківська категорія (не більше 2 рівнів).' },
      validate: parentMaxDepth,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Чим менше число, тим вище у списку.',
      },
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    seoGroup,
  ],
};
