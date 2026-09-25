import type { APIRoute } from 'astro';
import { insertGuestbook, listGuestbook, ValidationError } from '../../lib/db';

export const prerender = false;

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

export const GET: APIRoute = async () => {
  try {
    const rows = listGuestbook();
    return json({ entries: rows }, 200);
  } catch (err) {
    console.error('GET /api/guestbook failed:', err);
    return json({ error: 'internal error' }, 500);
  }
};

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid JSON body' }, 400);
  }
  try {
    const row = insertGuestbook(body as { name: string; message: string });
    return json(row, 201);
  } catch (err) {
    if (err instanceof ValidationError) {
      return json({ error: err.message }, 400);
    }
    console.error('POST /api/guestbook failed:', err);
    return json({ error: 'internal error' }, 500);
  }
};
