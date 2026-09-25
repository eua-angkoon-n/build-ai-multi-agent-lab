# FE↔BE Contract Check — Contact / Guestbook / Interests

> ตรวจสัญญาที่ฟอร์มฝั่งหน้าเว็บคาดหวัง เทียบกับ API stub ใน `src/pages/api/*.ts` และ `src/lib/db.ts`
> เทียบกับ decisions ใน `docs/DECISIONS.md` (D2, D5) ด้วย
> วันที่ตรวจ: 2026-09-25 · ผู้ตรวจ: OpenCode · **ไม่ได้แก้ไฟล์ใดใน `src/`** (อ่านอย่างเดียว)

## สรุปสั้น (TL;DR)

- **Guestbook:** สัญญา field/response ระหว่างฟอร์มกับ stub **ตรงกัน** (`{name, message}` / `{entries:[...]}` / `{error}`) แต่ฟอร์มไม่จัดการ error ของ POST และ render ด้วย `innerHTML` ดิบ (เสี่ยง stored XSS เมื่อ persist จริง) · ที่สำคัญกว่าคือ **ขัด D5** — หน้า `/guestbook` มีฟอร์มพร้อมใช้และลิงก์อยู่ใน nav หลักแล้ว ทั้งที่ D5 ยังไม่ตัดสินใจสร้างใน v1
- **Contact:** หน้า Contact **ตรง D2 เป๊ะ** (mailto + GitHub เท่านั้น ไม่มีฟอร์ม) แต่ `/api/contact` กลายเป็น **orphan write endpoint** — มี stub รับ POST แต่ไม่มีผู้เรียกฝั่ง UI
- **Interests:** หน้า render จาก profile โดยตรง ไม่เรียก `/api/interests` — endpoint เป็น read-only orphan ไม่มีความเสี่ยง แต่ไม่มีผู้ใช้เช่นกัน

## ขอบเขตที่อ่าน

| ฝั่ง | ไฟล์ |
|---|---|
| Decisions | `docs/DECISIONS.md` (D2 Contact, D5 Guestbook) |
| หน้าเว็บ | `src/pages/contact.astro`, `src/pages/guestbook.astro`, `src/pages/interests.astro`, `src/layouts/BaseLayout.astro` (nav) |
| API stub | `src/pages/api/contact.ts`, `src/pages/api/guestbook.ts`, `src/pages/api/interests.ts` |
| DB layer | `src/lib/db.ts` (types + schema + stub ที่ throw `NOT_IMPLEMENTED`) |

## 1. Guestbook — `guestbook.astro` ↔ `POST/GET /api/guestbook`

### ✅ Match (สัญญาตรงกัน)

| จุด | ฟอร์มคาดหวัง | Stub ให้ | ตรง? |
|---|---|---|---|
| POST body | JSON `{name, message}` + header `content-type: application/json` | `request.json()` แล้วส่งต่อให้ `insertGuestbook({name, message})` | ✅ ชื่อ field ตรง |
| GET response | อ่าน `data.entries` แล้ว render `e.name`, `e.message`, `e.created_at` | คืน `{entries: rows}` โดย row คือ `GuestbookEntry {id, name, message, created_at}` | ✅ |
| Error shape (GET) | ถ้า `!res.ok` แสดง `data.error` | คืน `{error: message}` พร้อม 500/501 | ✅ |
| Input limits | `name` required, maxlength 80 · `message` required, maxlength 500 | (ยังไม่ enforce — stub) | ⚠️ ฝั่ง client กำหนดไว้แล้ว ฝั่ง server ต้อง enforce ซ้ำตอน Lab 05 |

### ❌ Mismatch / ช่องว่าง

1. **ฟอร์มไม่เช็คผล POST** — `await fetch(...POST...)` แล้ว `form.reset()` + `load()` ทันที ไม่ดู `res.ok` เลย ถ้า stub ตอบ 501 (`NOT_IMPLEMENTED`) หรือ 400 ผู้ใช้จะเห็นฟอร์มถูกล้างเงียบ ๆ ราวกับส่งสำเร็จ (error จะไปโผล่ทีหลังในกล่อง entries ตอน GET เท่านั้น)
2. **Stored XSS** — `entries.innerHTML` แทรก `e.name`/`e.message` ดิบลง HTML เมื่อ backend persist จริง ใครก็ได้ฝัง script ผ่าน guestbook ได้ (ตอนนี้ยังไม่ระเบิดเพราะ stub throw ตลอด)
3. **ไม่มี validation ฝั่ง server** — stub ยัง throw `NOT_IMPLEMENTED` สัญญาเรื่อง trim / ค่าว่าง / ความยาวสูงสุดยังไม่ถูก enforce ฝั่งรับ
4. **ไม่มี moderation / rate-limit ทั้งสองฝั่ง** — ซึ่ง D5 กำหนดว่าเป็นเงื่อนไขก่อน ship

### ⚠️ ขัด Decision (สำคัญกว่าสัญญา)

- **D5: "ยังไม่ตัดสินใจสร้าง Guestbook ใน v1"** และต้องมี moderation/rate-limit ก่อน ship เท่านั้น — แต่ปัจจุบัน:
  - หน้า `/guestbook` มีฟอร์มพร้อมใช้งานแล้ว
  - ลิงก์ **Guestbook อยู่ใน nav หลัก** (`BaseLayout.astro`) → เข้าถึงได้สาธารณะ
  - `db.ts` มี `CREATE TABLE guestbook` อยู่แล้ว ทั้งที่ D5 ระบุ "ห้ามเริ่มออกแบบ schema ล่วงหน้า" (ของเดิมจาก seed scaffold — อย่าถือว่าเป็น decision)
- สรุป: scaffold ล้ำหน้า decision อยู่ ต้องปิด issue #15 (D5) ก่อน ship

## 2. Contact — `contact.astro` ↔ `POST /api/contact`

### ✅ Match

- หน้า Contact ตรง **D2** เป๊ะ: มีแค่ `mailto:` + ลิงก์ GitHub พร้อม microcopy ไม่มี `<form>` ไม่มี `fetch` ไป `/api/contact` เลย

### ❌ Mismatch / ช่องว่าง

1. **`/api/contact` เป็น orphan endpoint** — stub รับ POST JSON `{name, email, message}` → 201 + row (หรือ 400/501) แต่ **ไม่มีผู้เรียกฝั่ง UI ใด ๆ** ถ้า deploy ทั้งที่ D2 บอก "ไม่ทำฟอร์มเก็บข้อมูลฝั่ง server ใน v1" endpoint นี้จะกลายเป็น write endpoint เปลือย (ไม่มี auth, ไม่มี rate-limit) ที่ใครก็ยิงได้
2. **ไม่มีฝั่ง client ให้เทียบสัญญา** — ถ้าวันหลัง reopen D2 แล้วทำฟอร์ม สัญญาที่ stub คาดคือ `{name, email, message}` → 201 + row; error = `{error}` + 400 — ต้องจดไว้ให้ frontend ทำตาม (รวมถึง email format check ที่ยังไม่มีใน stub)

## 3. Interests — `interests.astro` ↔ `GET /api/interests`

- หน้า render `profile.interests` โดยตรง ไม่เรียก API → `/api/interests` เป็น **read-only orphan** เช่นกัน
- ไม่มีความเสี่ยงฝั่งเขียน และ shape `{interests, source: 'profile'}` สอดคล้องกับข้อมูลที่หน้าใช้อยู่ — ปล่อยไว้เป็น scaffold ได้โดยไม่ต้องตัดสินใจเพิ่ม

## ข้อเสนอแนะ (Suggestion)

| # | เรื่อง | เจ้าของงาน | เมื่อไหร่ |
|---|---|---|---|
| 1 | **ปิด decision D5 (issue #15) ก่อน ship** — ถ้าตัดสินใจ "ไม่สร้าง v1": ถอดลิงก์ Guestbook ออกจาก nav + ทำหน้า/endpoint เป็น 404 · ถ้า "สร้าง": บังคับมี moderation + rate-limit ก่อน | ร่วม (decision) → OpenCode/backend  implement | ก่อน Lab 08 (ship) |
| 2 | **ตัดสินใจ `/api/contact`:** ปิด endpoint (404/410) หรือคง 501 ไว้จนกว่า D2 จะถูก reopen — อย่าปล่อย write endpoint เปลือยตอน deploy | OpenCode/backend | ก่อน ship |
| 3 | **ฟอร์ม guestbook ต้องจัดการ error ของ POST** — เช็ค `res.ok` แล้วแสดง `data.error` ให้ผู้ใช้ อย่า reset ฟอร์มเงียบ ๆ | Claude/frontend | Lab 04/06 |
| 4 | **แก้ `innerHTML` → `textContent`/DOM API** ตอน render entries กัน stored XSS | Claude/frontend | ก่อน backend persist จริง (Lab 05/06) |
| 5 | **นิยาม response contract ให้ชัดใน Lab 05:** POST สำเร็จ = 201 + row · ล้มเหลว = `{error}` + 4xx · enforce `name ≤80`, `message ≤500`, trim, ปฏิเสธค่าว่างฝั่ง server ให้ mirror ฝั่ง client (และเพิ่ม email format check ถ้า reopen contact) | OpenCode/backend | Lab 05 |

## หมายเหตุ

- งานนี้อ่านอย่างเดียว ไม่ได้แก้ไฟล์ใน `src/` ตามที่สั่ง
- `docs/STATUS.md` / `docs/OPEN_LOOPS.md` รอบนี้ writer คือ Claude — จึงไม่แตะ; ถ้าต้องการให้บันทึกผลตรวจนี้เข้า hot state ให้ฝั่ง Claude เป็นคนเขียน หรือสลับ writer ตามกติกา single-writer
