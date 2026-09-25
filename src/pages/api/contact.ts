import type { APIRoute } from 'astro';
import { insertContact, ValidationError } from '../../lib/db';

export const prerender = false;

/**
 * POST /api/contact
 * หมายเหตุ: endpoint นี้เป็น orphan หลัง D2 (ไม่มีฟอร์มเรียกใช้) —
 * ชะตากรรมก่อน ship อยู่ที่ L11 ใน docs/OPEN_LOOPS.md
 */
export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid JSON body' }, 400);
  }
  try {
    const row = insertContact(body as { name: string; email: string; message: string });
    return json(row, 201);
  } catch (err) {
    if (err instanceof ValidationError) {
      return json({ error: err.message }, 400);
    }
    console.error('POST /api/contact failed:', err);
    return json({ error: 'internal error' }, 500);
  }
};

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
