import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { CollectionConfig } from 'payload';

import { contentAccess } from '@/access/roles';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// ICECAT-329 — upload-коллекция с тремя image sizes + OG + локальным хранилищем.
// MIME: изображения и PDF (прикреплённые документы к Products).
export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Медіа', plural: 'Медіа' },
  access: contentAccess,
  upload: {
    // Хранилище — локально на VPS (TZ §7), с возможностью миграции на S3.
    staticDir: path.resolve(dirname, '..', 'media'),
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: undefined,
        position: 'centre',
        formatOptions: { format: 'webp', options: { quality: 80 } },
      },
      {
        name: 'card',
        width: 800,
        height: undefined,
        position: 'centre',
        formatOptions: { format: 'webp', options: { quality: 82 } },
      },
      {
        name: 'hero',
        width: 1600,
        height: undefined,
        position: 'centre',
        formatOptions: { format: 'webp', options: { quality: 84 } },
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        position: 'centre',
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
    ],
  },
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'mimeType', 'updatedAt'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: "Обов'язково для accessibility і SEO." },
    },
    { name: 'caption', type: 'text', localized: true },
  ],
};
