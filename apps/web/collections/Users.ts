import type { CollectionConfig } from 'payload';

import { isAdmin, isAdminFieldLevel, isAdminOrSelf } from '@/access/roles';

// ICECAT-335 — auth-коллекция с ролями admin / editor.
// Access rules согласованы с ADR-005:
//   - admin может всё
//   - editor видит/меняет только свою запись (профиль), новых создавать не может
export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    // ICECAT-332 — защита админки:
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000, // 10 минут lock после 5 неудач
    tokenExpiration: 60 * 60 * 8, // 8 часов сессия
    cookies: {
      // secure ставим только в production (http на 3778 в dev).
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
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
    // ICECAT-332: политика пароля (минимум 12 символов, буквы+цифры).
    // Применяется при регистрации / смене пароля — Payload vaлидирует
    // `password` поле при its presence in data.
    {
      name: 'password',
      type: 'text',
      admin: { hidden: true },
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (typeof value !== 'string' || value.length === 0) return value;
            if (value.length < 12) {
              throw new Error('Пароль має містити не менше 12 символів.');
            }
            if (!/[a-zA-Z]/.test(value) || !/[0-9]/.test(value)) {
              throw new Error('Пароль повинен містити літери та цифри.');
            }
            return value;
          },
        ],
      },
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
