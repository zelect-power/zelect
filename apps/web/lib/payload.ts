import { getPayload } from 'payload';
import config from '@/payload.config';

let cached: Awaited<ReturnType<typeof getPayload>> | undefined;

/**
 * Singleton access к Payload в RSC / Route Handlers.
 * Подход из официальных Next.js-примеров Payload 3.
 */
export async function payload() {
  if (!cached) cached = await getPayload({ config });
  return cached;
}
