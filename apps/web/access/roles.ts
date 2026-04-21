import type { Access, FieldAccess, User } from 'payload';

import type { Role } from '@/access/types';

type ZpUser = User & { role?: Role };

export const isAuthed: Access = ({ req }) => Boolean(req.user);

export const isAdmin: Access = ({ req }) => (req.user as ZpUser | null)?.role === 'admin';

export const isAdminOrSelf: Access = ({ req }) => {
  const user = req.user as ZpUser | null;
  if (!user) return false;
  if (user.role === 'admin') return true;
  // Editor видит только собственную запись.
  return { id: { equals: user.id } };
};

export const isAdminFieldLevel: FieldAccess = ({ req }) =>
  (req.user as ZpUser | null)?.role === 'admin';

/**
 * Read-only для editor, r/w для admin.
 * Используем для коллекции Settings (editor смотрит, но не трогает).
 */
export const adminWriteEditorRead: {
  read: Access;
  create: Access;
  update: Access;
  delete: Access;
} = {
  read: isAuthed,
  create: isAdmin,
  update: isAdmin,
  delete: isAdmin,
};

/** Стандартный набор для контентных коллекций: editor и admin — равнозначно. */
export const contentAccess: {
  read: Access;
  create: Access;
  update: Access;
  delete: Access;
} = {
  read: () => true, // публичное API (список товаров, страница и т.п.)
  create: isAuthed,
  update: isAuthed,
  delete: isAuthed,
};
