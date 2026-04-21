import { createHash } from 'node:crypto';
import { type NextRequest, NextResponse } from 'next/server';

import { payload } from '@/lib/payload';

// ICECAT-346 — public API для форм.
// Защиты: honeypot поле + in-memory rate-limit по ipHash.
// Глобальный Redis появится позже, сейчас достаточно Next.js instance state
// (в dev один процесс, в prod PM2 однопроцессный).

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 час
const RATE_LIMIT_MAX = 5; // 5 отправок в час с одного IP
const hits = new Map<string, number[]>();

function rateLimited(ipHash: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ipHash) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  arr.push(now);
  hits.set(ipHash, arr);
  return arr.length > RATE_LIMIT_MAX;
}

function getIp(req: NextRequest): string {
  const h = req.headers;
  return h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? h.get('x-real-ip') ?? 'unknown';
}

function hashIp(ip: string): string {
  return createHash('sha256').update(ip).digest('hex').slice(0, 32);
}

interface Body {
  type?: 'quote' | 'contact' | 'product_inquiry';
  fullName?: string;
  company?: string;
  phone?: string;
  email?: string;
  message?: string;
  productRef?: string;
  source?: string;
  honeypot?: string;
}

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  // Honeypot: бот обычно заполняет все поля, человек — нет.
  if (body.honeypot && body.honeypot.length > 0) {
    // Pretend success без записи — боты не должны понимать что они отсеяны.
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  // Минимальная валидация.
  const email = body.email?.trim();
  const fullName = body.fullName?.trim();
  if (!email || !fullName) {
    return NextResponse.json({ error: 'email and fullName are required' }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'invalid email' }, { status: 400 });
  }

  const ipHash = hashIp(getIp(req));
  if (rateLimited(ipHash)) {
    return NextResponse.json({ error: 'rate limited' }, { status: 429 });
  }

  try {
    const pl = await payload();
    // productRef пытаемся резолвить по article к документу.
    let productRefId: number | undefined;
    if (body.productRef) {
      try {
        const res = await pl.find({
          collection: 'products',
          where: { article: { equals: body.productRef } },
          limit: 1,
          depth: 0,
        });
        if (res.docs.length > 0) productRefId = res.docs[0].id as number;
      } catch {
        // игнор — оставляем productRef как метаинформацию в message
      }
    }

    await pl.create({
      collection: 'submissions',
      data: {
        type: body.type ?? 'contact',
        fullName,
        email,
        company: body.company?.trim() || undefined,
        phone: body.phone?.trim() || undefined,
        message: body.message?.trim() || undefined,
        productRef: productRefId,
        source: body.source,
        ipHash,
        status: 'new',
      },
    });

    // TODO(ICECAT-346): отправка email через SMTP/Resend, когда владелец даст credentials.
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error('submission error', err);
    return NextResponse.json({ error: 'internal' }, { status: 500 });
  }
}
