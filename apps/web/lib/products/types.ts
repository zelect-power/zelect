// Универсальные типы блоков для контента карточки категории.
// Структура спроектирована так, чтобы 1-в-1 переехать в Payload `blocks` field
// в Фазе 2 (миграция в CMS). Сейчас рендерятся из хардкод-данных.

export type ImageRef = {
  src: string;
  alt: string;
};

export type CategoryBlock =
  | { kind: 'heading'; level: 2 | 3 | 4; text: string }
  | { kind: 'paragraphs'; items: string[] }
  | { kind: 'list'; ordered?: boolean; items: string[] }
  | { kind: 'specs'; rows: Array<{ label: string; value: string }> }
  | { kind: 'gallery'; cols: 1 | 2 | 3; images: ImageRef[] }
  | {
      kind: 'subsection';
      title: string;
      paragraphs?: string[];
      list?: string[];
      gallery?: { cols: 1 | 2 | 3; images: ImageRef[] };
      download?: { label: string; href?: string };
    }
  | { kind: 'download'; label: string; href?: string; note?: string }
  | {
      kind: 'cta';
      heading: string;
      body: string;
      primaryLabel: string;
      primaryHref: string;
      phone?: string;
    };

export type CategoryTab = {
  slug: string;
  label: string;
  blocks: CategoryBlock[];
};
