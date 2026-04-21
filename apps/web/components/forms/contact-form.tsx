'use client';

import { useState, type FormEvent } from 'react';

import { IcArrow } from '@/components/icons';

interface Props {
  productRef?: string;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm({ productRef }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [errMsg, setErrMsg] = useState<string>('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrMsg('');
    const fd = new FormData(e.currentTarget);
    const payload = {
      type: productRef ? 'product_inquiry' : (fd.get('type') as string) || 'contact',
      fullName: String(fd.get('fullName') ?? ''),
      company: String(fd.get('company') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      email: String(fd.get('email') ?? ''),
      message: String(fd.get('message') ?? ''),
      productRef: productRef ?? undefined,
      source: typeof window !== 'undefined' ? window.location.href : undefined,
      honeypot: String(fd.get('zp_hp') ?? ''),
    };

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? `HTTP ${res.status}`);
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrMsg(err instanceof Error ? err.message : 'Сталася помилка.');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-surface border-border-theme rounded-[16px] border p-8 text-center">
        <div
          className="text-foreground text-[22px] font-bold"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Дякуємо! Заявку отримано.
        </div>
        <p className="text-muted-foreground mt-3 text-sm">
          Менеджер зв&apos;яжеться з вами протягом 2 робочих годин.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
      {/* Honeypot — hidden от users, bots его часто заполняют */}
      <input
        type="text"
        name="zp_hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[10000px] h-0 w-0 opacity-0"
      />
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
        <Input label="Компанія" name="company" required />
        <Input label="ПІБ контактної особи" name="fullName" required />
      </div>
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
        <Input label="Email" type="email" name="email" required />
        <Input label="Телефон" type="tel" name="phone" />
      </div>
      {!productRef && (
        <Select
          label="Тип проєкту"
          name="type"
          options={[
            { value: 'quote', label: 'Запит КП' },
            { value: 'contact', label: 'Загальне питання' },
          ]}
        />
      )}
      <Textarea
        label={
          productRef ? `Опис задачі (артикул: ${productRef})` : 'Опис задачі або технічні параметри'
        }
        name="message"
      />
      <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
        <label className="text-muted-foreground flex cursor-pointer items-center gap-2.5 text-[13px]">
          <input
            type="checkbox"
            defaultChecked
            required
            name="consent"
            className="h-4 w-4"
            style={{ accentColor: 'var(--color-brand)' }}
          />
          Погоджуюся на обробку персональних даних
        </label>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold tracking-tight text-white transition-transform hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            background: 'var(--gradient-brand)',
            boxShadow: '0 6px 16px rgb(15 122 82 / 0.22)',
          }}
        >
          {status === 'sending' ? 'Надсилаємо…' : 'Надіслати запит'}
          <IcArrow size={16} />
        </button>
      </div>
      {status === 'error' && (
        <div className="text-[13px]" style={{ color: '#dc2626' }}>
          {errMsg || 'Не вдалося відправити. Спробуйте пізніше.'}
        </div>
      )}
    </form>
  );
}

function Input({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span
        className="text-faint-foreground text-xs font-semibold tracking-[0.06em] uppercase"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {label}
        {required && <span className="text-brand-theme"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="bg-background border-border-theme focus:border-brand-theme text-foreground h-[46px] rounded-[10px] border px-3.5 text-[15px] transition-colors outline-none"
      />
    </label>
  );
}

function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span
        className="text-faint-foreground text-xs font-semibold tracking-[0.06em] uppercase"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {label}
      </span>
      <select
        name={name}
        className="bg-background border-border-theme text-foreground h-[46px] rounded-[10px] border px-3.5 text-[15px] outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Textarea({ label, name }: { label: string; name: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span
        className="text-faint-foreground text-xs font-semibold tracking-[0.06em] uppercase"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {label}
      </span>
      <textarea
        name={name}
        rows={5}
        className="bg-background border-border-theme focus:border-brand-theme text-foreground resize-y rounded-[10px] border p-3.5 text-[15px] transition-colors outline-none"
      />
    </label>
  );
}
