import Image from 'next/image';

import { CtaButton } from '@/components/ui/cta-button';
import type { CategoryBlock, ImageRef } from '@/lib/products/types';

// Универсальный рендерер блоков контента категории. Тип определяется
// дискриминатором `kind`. См. lib/products/types.ts.
export function CategoryBlockRenderer({ block }: { block: CategoryBlock }) {
  switch (block.kind) {
    case 'heading':
      return <Heading level={block.level} text={block.text} />;
    case 'paragraphs':
      return <Paragraphs items={block.items} />;
    case 'list':
      return <BulletList items={block.items} ordered={block.ordered} />;
    case 'specs':
      return <SpecsTable rows={block.rows} />;
    case 'gallery':
      return <Gallery cols={block.cols} images={block.images} />;
    case 'subsection':
      return <Subsection {...block} />;
    case 'download':
      return <DownloadButton label={block.label} href={block.href} note={block.note} />;
    case 'cta':
      return (
        <CtaCard
          heading={block.heading}
          body={block.body}
          primaryLabel={block.primaryLabel}
          primaryHref={block.primaryHref}
          phone={block.phone}
        />
      );
  }
}

function Heading({ level, text }: { level: 2 | 3 | 4; text: string }) {
  const cls =
    level === 2
      ? 'text-foreground mt-10 text-[26px] font-bold tracking-[-0.02em] leading-[1.2] md:text-[32px]'
      : level === 3
        ? 'text-foreground mt-8 text-[20px] font-bold tracking-[-0.015em] leading-[1.25] md:text-[24px]'
        : 'text-foreground mt-6 text-[16px] font-semibold tracking-[-0.01em] md:text-[18px]';
  const Tag = `h${level}` as 'h2' | 'h3' | 'h4';
  return (
    <Tag className={cls} style={{ fontFamily: 'var(--font-heading)' }}>
      {text}
    </Tag>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="text-muted-foreground mt-4 flex flex-col gap-3 text-[15px] leading-[1.65] md:text-[16px]">
      {items.map((p, i) => (
        <p key={i} className="m-0">
          {p}
        </p>
      ))}
    </div>
  );
}

function BulletList({ items, ordered }: { items: string[]; ordered?: boolean }) {
  const ListTag = ordered ? 'ol' : 'ul';
  return (
    <ListTag
      className={`text-muted-foreground mt-4 flex flex-col gap-2 pl-5 text-[15px] leading-[1.6] md:text-[16px] ${
        ordered ? 'list-decimal' : 'list-disc'
      }`}
    >
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ListTag>
  );
}

function SpecsTable({ rows }: { rows: Array<{ label: string; value: string }> }) {
  return (
    <dl className="border-border-theme mt-5 grid grid-cols-1 overflow-hidden rounded-[12px] border md:grid-cols-[1fr_2fr]">
      {rows.map((r, i) => (
        <div key={i} className="border-border-theme contents border-b last:border-b-0 md:border-b">
          <dt className="bg-background-soft text-faint-foreground border-border-theme border-b px-4 py-3 text-[12px] font-semibold tracking-[0.04em] uppercase md:border-r md:border-b-0">
            {r.label}
          </dt>
          <dd
            className="text-foreground border-border-theme border-b px-4 py-3 text-[14px] last:border-b-0 md:border-b-0"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {r.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Gallery({ cols, images }: { cols: 1 | 2 | 3; images: ImageRef[] }) {
  // 1: одна колонка; 2: 1-col mobile, 2-col md+; 3: 1-col mobile, 2-col sm, 3-col md+
  const gridCls =
    cols === 1
      ? 'grid-cols-1'
      : cols === 2
        ? 'grid-cols-1 md:grid-cols-2'
        : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
  return (
    <div className={`mt-6 grid ${gridCls} gap-4`}>
      {images.map((img) => (
        <div
          key={img.src}
          className="bg-background-soft relative aspect-[3/4] overflow-hidden rounded-[14px]"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain"
            style={{ padding: '12%' }}
          />
        </div>
      ))}
    </div>
  );
}

function Subsection({
  title,
  paragraphs,
  list,
  gallery,
  download,
}: {
  title: string;
  paragraphs?: string[];
  list?: string[];
  gallery?: { cols: 1 | 2 | 3; images: ImageRef[] };
  download?: { label: string; href?: string };
}) {
  return (
    <div className="border-border-theme mt-10 border-t pt-8">
      <Heading level={3} text={title} />
      {paragraphs && <Paragraphs items={paragraphs} />}
      {list && <BulletList items={list} />}
      {gallery && <Gallery cols={gallery.cols} images={gallery.images} />}
      {download && (
        <div className="mt-5">
          <DownloadButton label={download.label} href={download.href} />
        </div>
      )}
    </div>
  );
}

function DownloadButton({ label, href, note }: { label: string; href?: string; note?: string }) {
  const isReady = !!href;
  const className =
    'inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-semibold transition-all ' +
    (isReady
      ? 'border-border-theme text-foreground hover:border-border-strong hover:bg-background-soft'
      : 'border-border-theme/60 text-faint-foreground cursor-not-allowed');
  return (
    <div className="mt-5 flex flex-wrap items-center gap-3">
      {isReady ? (
        <a href={href} className={className} download>
          <DownloadIcon />
          {label}
        </a>
      ) : (
        <span className={className} aria-disabled="true" title="Файл буде доданий найближчим часом">
          <DownloadIcon />
          {label}
        </span>
      )}
      <span className="text-faint-foreground text-[12px]">
        {note ?? (isReady ? null : 'незабаром')}
      </span>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function CtaCard({
  heading,
  body,
  primaryLabel,
  primaryHref,
  phone,
}: {
  heading: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  phone?: string;
}) {
  return (
    <div className="bg-surface border-border-theme mt-12 rounded-[20px] border p-6 md:p-8">
      <h3
        className="text-foreground m-0 text-[22px] font-bold tracking-[-0.015em] md:text-[26px]"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {heading}
      </h3>
      <p className="text-muted-foreground mt-3 text-[15px] leading-[1.6] md:text-[16px]">{body}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <CtaButton href={primaryHref} size="lg">
          {primaryLabel}
        </CtaButton>
        {phone && (
          <CtaButton
            href={`tel:${phone.replace(/\s+/g, '')}`}
            variant="ghost"
            size="lg"
            icon={false}
          >
            {phone}
          </CtaButton>
        )}
      </div>
    </div>
  );
}
