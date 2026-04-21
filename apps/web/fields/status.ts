import type { Field } from 'payload';

// Общий статус публикации для News / Pages.
export const statusField: Field = {
  name: 'status',
  type: 'select',
  required: true,
  defaultValue: 'draft',
  index: true,
  admin: {
    position: 'sidebar',
  },
  options: [
    { label: 'Чернетка', value: 'draft' },
    { label: 'Опубліковано', value: 'published' },
  ],
};
