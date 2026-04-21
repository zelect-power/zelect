'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

// Анимированный counter — считает от 0 до `to` когда элемент появляется в viewport.
export function Counter({ to, suffix = '', duration = 1400, className = '' }: Props) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf: number | null = null;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(eased * to));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span
      ref={ref}
      className={`text-foreground leading-none font-bold tracking-[-0.04em] tabular-nums ${className}`}
      style={{ fontSize: 72, fontFamily: 'var(--font-heading)' }}
    >
      {val.toLocaleString('uk-UA')}
      {suffix}
    </span>
  );
}
