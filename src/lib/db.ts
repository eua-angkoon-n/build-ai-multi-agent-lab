/**
 * SQLite helpers for contact + guestbook.
 * Lab 05 (OpenCode/backend): real persistence with server-side validation.
 *
 * Contract (docs/fe-be-contract-check.md #5):
 * - insert* คืน row ที่ persist แล้ว (201 ฝั่ง API)
 * - input ไม่ผ่าน → throw ValidationError (message ปลอดภัย แสดงให้ client ได้)
 * - error อื่น (เช่น DB) → API route ตอบ 500 แบบ generic ไม่ leak SQL/stack
 */
import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export type GuestbookEntry = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

/** Input ไม่ผ่าน validation — message ของ error นี้ปลอดภัย ส่งกลับให้ client ได้ */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// ขีดจำกัด mirror ฝั่ง client (guestbook.astro: maxlength 80/500)
const NAME_MAX = 80;
const MESSAGE_MAX = 500;
const EMAIL_MAX = 254;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GUESTBOOK_LIST_LIMIT = 100;

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;
  const dir = process.env.DATA_DIR || join(process.cwd(), 'data');
  mkdirSync(dir, { recursive: true });
  db = new Database(join(dir, 'site.sqlite'));
  db.exec(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS guestbook (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  return db;
}

function cleanText(value: unknown, field: string, max: number): string {
  if (typeof value !== 'string') throw new ValidationError(`${field} is required`);
  const trimmed = value.trim();
  if (trimmed.length === 0) throw new ValidationError(`${field} is required`);
  if (trimmed.length > max) {
    throw new ValidationError(`${field} must be ${max} characters or fewer`);
  }
  return trimmed;
}

function cleanEmail(value: unknown): string {
  const email = cleanText(value, 'email', EMAIL_MAX);
  if (!EMAIL_RE.test(email)) throw new ValidationError('email is not valid');
  return email;
}

export function insertContact(input: {
  name: string;
  email: string;
  message: string;
}): ContactMessage {
  const name = cleanText(input?.name, 'name', NAME_MAX);
  const email = cleanEmail(input?.email);
  const message = cleanText(input?.message, 'message', MESSAGE_MAX);
  const d = getDb();
  const info = d
    .prepare('INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)')
    .run(name, email, message);
  return d
    .prepare('SELECT id, name, email, message, created_at FROM contact_messages WHERE id = ?')
    .get(info.lastInsertRowid) as ContactMessage;
}

export function listGuestbook(): GuestbookEntry[] {
  return getDb()
    .prepare('SELECT id, name, message, created_at FROM guestbook ORDER BY id DESC LIMIT ?')
    .all(GUESTBOOK_LIST_LIMIT) as GuestbookEntry[];
}

export function insertGuestbook(input: {
  name: string;
  message: string;
}): GuestbookEntry {
  const name = cleanText(input?.name, 'name', NAME_MAX);
  const message = cleanText(input?.message, 'message', MESSAGE_MAX);
  const d = getDb();
  const info = d
    .prepare('INSERT INTO guestbook (name, message) VALUES (?, ?)')
    .run(name, message);
  return d
    .prepare('SELECT id, name, message, created_at FROM guestbook WHERE id = ?')
    .get(info.lastInsertRowid) as GuestbookEntry;
}
