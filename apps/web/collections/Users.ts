import type { CollectionConfig } from 'payload';

import { isAdmin, isAdminFieldLevel, isAdminOrSelf } from '@/access/roles';

// ICECAT-335 — auth-коллекция с ролями admin / editor.
// Access rules согласованы с ADR-005:
//   - admin может всё
//   - editor видит/меняет только свою запись (профиль), новых создавать не может
export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000, // 10 минут, см. ICECAT-332
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'role'],
  },
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
    admin: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: false,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      access: {
        // Только admin может менять роль (иначе editor мог бы поднять себя).
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
    },
  ],
};
