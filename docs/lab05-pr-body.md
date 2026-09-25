# Lab 05 — Backend: guestbook/contact persistence ด้วย SQLite (better-sqlite3)

> **Ownership:** Backend / OpenCode — แตะเฉพาะ `src/lib/db.ts` + `src/pages/api/*.ts` ตามตาราง ownership ใน `AGENTS.md` · ไม่ได้แตะ UI (`src/pages/*.astro`, `src/layouts/`) ซึ่งเป็นของ Claude/frontend
>
> Refs: `docs/handoffs/04-claude-to-opencode.md` · `docs/fe-be-contract-check.md` (ข้อ 5) · `docs/DECISIONS.md` (D2, D5) · issue #15 (D5 ยังเปิด — ดู Notes)

## สิ่งที่ implement

- **`src/lib/db.ts`** — เปลี่ยน stub `NOT_IMPLEMENTED` เป็น persistence จริง:
  - `insertContact({name, email, message})` → insert ลงตาราง `contact_messages` แล้วคืน row ที่ persist แล้ว (`id`, `created_at` จาก SQLite)
  - `insertGuestbook({name, message})` → insert ลงตาราง `guestbook` แล้วคืน row
  - `listGuestbook()` → คืน entries เรียงใหม่สุดก่อน (`ORDER BY id DESC`), จำกัด 100 แถว
  - เพิ่ม `ValidationError` — error ที่ message ปลอดภัย ส่งกลับให้ client ได้โดยตรง
- **`src/pages/api/guestbook.ts`** — GET คืน `{entries: [...]}` (200) · POST รับ JSON `{name, message}` → 201 + row · validation ไม่ผ่าน → 400 + `{error}` · JSON พัง → 400 · error อื่น → 500 + `{error: 'internal error'}` (generic)
- **`src/pages/api/contact.ts`** — POST JSON `{name, email, message}` → 201 + row · error mapping เหมือน guestbook · ยังเป็น orphan endpoint หลัง D2 (ชะตากรรมก่อน ship = L11 ใน `docs/OPEN_LOOPS.md`)

## Response contract (ตาม `docs/fe-be-contract-check.md` ข้อ 5)

| กรณี | Status | Body |
|---|---|---|
| POST สำเร็จ | 201 | row ที่ persist แล้ว |
| input ไม่ผ่าน validation | 400 | `{error: "<ข้อความปลอดภัย>"}` |
| body ไม่ใช่ JSON | 400 | `{error: "invalid JSON body"}` |
| error ภายใน (DB ฯลฯ) | 500 | `{error: "internal error"}` |

## Security notes

- **Server-side validation** mirror ฝั่ง client: trim, ปฏิเสธค่าว่าง, `name ≤ 80`, `message ≤ 500` (ตรง `maxlength` ในฟอร์ม), `email ≤ 254` + format check ด้วย regex แบบง่าย
- **Prepared statements + bound parameters** ทุก query — ไม่มี string interpolation ลง SQL
- **ไม่ leak stack/SQL:** เฉพาะ `ValidationError` เท่านั้นที่ message ถึง client; error อื่นถูก log ฝั่ง server (`console.error`) แล้วตอบ `internal error` แบบ generic
- **ไม่ log secret:** ไม่มี secret ใน code path นี้เลย; log มีแค่ error object ฝั่ง server
- **ยังไม่มี moderation/rate-limit** — เป็นเงื่อนไขก่อน ship ตาม D5 (issue #15 ยังเปิด) → ห้าม deploy endpoint เหล่านี้ขึ้น public จนกว่า D5 จะปิด

## วิธีรัน test

```powershell
npm install          # ถ้ายังไม่มี node_modules
npm run test:labs    # vitest run --config vitest.labs.config.ts → tests/labs/lab05-api.test.ts (2 tests)
npm test             # unit เดิม (smoke + public-site) ต้องยังเขียว
```

ผลลัพธ์บนเครื่องนี้ (2026-09-25): `test:labs` 2/2 ผ่าน · `npm test` 3/3 ผ่าน

## สิ่งที่จงใจไม่ทำ (out of scope)

- **ไม่แตะ `src/pages/guestbook.astro`** — POST error surfacing + `innerHTML`→`textContent` (กัน stored XSS) เป็นงาน UI ของ Claude/frontend ตาม ownership (เปิดเป็น L12 ใน `docs/OPEN_LOOPS.md`) — **หมายเหตุ:** หลัง PR นี้ backend persist จริง ช่องโหว่ stored XSS ผ่าน `innerHTML` จะ live ทันทีที่ deploy จึงควรแก้ก่อน ship
- ไม่ตัดสินใจ D5 (guestbook v1 scope / moderation) และ L11 (ชะตากรรม `/api/contact`) — เป็น decision ของ human/facilitator
- ไม่แก้ไฟล์ test — implement จริงเท่านั้น
