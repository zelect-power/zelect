import type { Field, FieldHook } from 'payload';

// Лёгкий slugify для uk-русско-английского контента (без внешних зависимостей).
// - кириллица → транслитерация по ГОСТ-подобной таблице
// - всё остальное → lowercase + [a-z0-9-]
const UA_MAP: Record<string, string> = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'h',
  ґ: 'g',
  д: 'd',
  е: 'e',
  є: 'ie',
  ж: 'zh',
  з: 'z',
  и: 'y',
  і: 'i',
  ї: 'i',
  й: 'i',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'kh',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ь: '',
  ю: 'iu',
  я: 'ia',
  ё: 'e',
  ы: 'y',
  э: 'e',
  ъ: '',
};

export function slugify(input: string): string {
  if (!input) return '';
  const lower = input.toLowerCase();
  let out = '';
  for (const ch of lower) {
    out += UA_MAP[ch] ?? ch;
  }
  return out
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);
}

const fillSlugFromTitle: FieldHook = ({ value, data }) => {
  if (value && typeof value === 'string' && value.length > 0) return slugify(value);
  const title = (data as { title?: string } | undefined)?.title;
  if (typeof title === 'string' && title.length > 0) return slugify(title);
  return value ?? '';
};

/**
 * Общий slug field. Уникальный в пределах коллекции, автогенерируется из `title`.
 * Поле остаётся редактируемым (editors могут вручную переопределить).
 */
export const slugField: Field = {
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: 'URL-ідентифікатор. Автоматично генерується з назви; можна змінити.',
  },
  hooks: {
    beforeValidate: [fillSlugFromTitle],
  },
};
