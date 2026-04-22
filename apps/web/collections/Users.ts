import type { CollectionConfig } from 'payload';

import { isAdmin, isAdminFieldLevel, isAdminOrSelf } from '@/access/roles';

// ICECAT-335 — auth-коллекция с ролями admin / editor.
// Access rules согласованы с ADR-005:
//   - admin может всё
//   - editor видит/меняет только свою запись (профиль), новых создавать не может
export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    // ICECAT-332 — защита админки.
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000, // 10 минут lock после 5 неудач
    tokenExpiration: 60 * 60 * 8, // 8 часов сессия
    // Отключаем sessions-based auth: в связке Payload 3.83 + Next.js 16
    // server-side чтение cookie `payload-token` возвращает user:null,
    // что ломает /admin (редиректит обратно на /login). С pure-JWT без
    // sessions — cookie работает корректно, admin грузится.
    useSessions: false,
  },
  // Политика пароля (ICECAT-332): hook на операции create/update.
  // Payload auth-поле `password` виртуальное — нельзя его декларировать как
  // обычный field. Поэтому валидируем через коллекционный хук.
  hooks: {
    beforeValidate: [
      ({ data }) => {
        const record = data as { password?: unknown } | undefined;
        const pass = record?.password;
        if (typeof pass !== 'string' || pass.length === 0) return data;
        if (pass.length < 12) {
          throw new Error('Пароль має містити не менше 12 символів.');
        }
        if (!/[a-zA-Z]/.test(pass) || !/[0-9]/.test(pass)) {
          throw new Error('Пароль повинен містити літери та цифри.');
        }
        return data;
      },
    ],
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
    // Password policy (ICECAT-332) применяется через Payload `auth.validate`
    // на самой коллекции выше — объявлять кастомное поле `password` нельзя,
    // иначе ломается server-side чтение auth-cookie (payload 3.83 trip'ает
    // `/api/users/me` как `user: null` когда cookie передан вместо Authorization
    // header). См. https://github.com/payloadcms/payload issue tracker.
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
