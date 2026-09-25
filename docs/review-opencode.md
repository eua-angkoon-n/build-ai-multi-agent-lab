# Review: PR #17 (Lab 04 — Frontend) โดย OpenCode

> รีวิวจาก `docs/_pr-diff.txt` (branch `lab-04-frontend` → `main`, commit `5fd5708`) เทียบกับ `docs/DECISIONS.md` (D1–D9)
> วันที่รีวิว: 2026-09-25 · ผู้รีวิว: OpenCode · **อ่านอย่างเดียว ไม่ได้แก้ไฟล์ใดใน `src/`** ตามที่สั่ง
> หมายเหตุบริบท: PR นี้ merge ไปแล้ว และมี PR ตามมา (#18, #20) — รายการที่แก้แล้วจะระบุสถานะกำกับไว้

## Verdict

**อนุมัติ** — diff ตรง D1–D4, D7 ครบ ไม่มี secret หลุด ไม่มี deploy claim เท็จ ไม่ละเมิด ownership · Must ที่ค้างจริงมี 1 ข้อ (D5) ซึ่งเป็นเงื่อนไข **ก่อน ship** ไม่ใช่บล็อกเกอร์ของ PR นี้ และถูกติดตามอยู่แล้วใน L10

---

## Must (ต้องแก้/ต้องปิด)

### M1 — ปิด D5 ก่อน ship: guestbook live ทั้งที่ decision ยังไม่ปิด

- **D5** ระบุชัด: "ยังไม่ตัดสินใจสร้าง Guestbook ใน v1" และ "ห้ามเริ่มออกแบบ schema ล่วงหน้า" — แต่ ณ จุดที่ PR นี้ merge: หน้า `/guestbook` มีฟอร์มพร้อมใช้, ลิงก์อยู่ใน nav หลัก (`BaseLayout.astro`), และ `db.ts` มี `CREATE TABLE guestbook` อยู่แล้ว
- PR นี้ **ไม่ได้ก่อปัญหา** (scaffold มีมาจาก seed ก่อนหน้า) และรายงานปัญหาไว้ครบใน `docs/fe-be-contract-check.md` + เปิด L10 แล้ว — ถือว่าจัดการตรรกะถูก
- แต่ตามกติกา DECISIONS: **ห้าม ship/deploy จริงก่อนปิด issue #15** พร้อมเงื่อนไข moderation/rate-limit · สถานะปัจจุบัน: ยังเปิดอยู่ (L10, P2) — เก็บเป็น Must ไว้เพื่อไม่ให้หลุดตอน Lab 08

### M2 — Stored XSS + POST error เงียบใน `guestbook.astro` (ณ เวอร์ชันใน diff — **แก้แล้วใน PR #20**)

- ใน diff นี้ `guestbook.astro` ยัง render entries ด้วย `entries.innerHTML` ดิบ (stored XSS ทันทีที่ backend persist จริง) และ POST ไม่เช็ค `res.ok` (ฟอร์ม reset เงียบราวกับสำเร็จ) — ทั้งคู่ถูกรายงานไว้ใน contract-check ข้อ 3–4 และแยกเป็น L12 ตาม ownership ของ Claude/frontend
- **ยืนยันสถานะปัจจุบัน:** ตรวจ `src/pages/guestbook.astro` เวอร์ชันล่าสุดแล้ว — ใช้ `createElement`/`textContent` แทน `innerHTML` และ surface error ผ่าน `#gb-status` ครบ (PR #20, L12 ปิดแล้ว) · บันทึกไว้เพื่อความครบของรีวิว ไม่ใช่งานค้าง

---

## Should (ควรแก้)

### S1 — blind spot ของ `tests/public-site.test.ts` ยังอยู่ และลึกกว่าที่ handoff ระบุ

- Handoff (Assumptions ข้อ 1) ระบุว่า `stripNonRendered()` ตัด frontmatter ทิ้งก่อนสแกน ทำให้ default `description` ที่ประกาศใน frontmatter ของ `BaseLayout.astro` หลุดการตรวจทั้งที่ render จริงใน `<meta>` — **ข้อนี้ถูก แต่ไม่ครบ**
- ตรวจไฟล์เทสต์จริงพบอีกชั้น: `COURSE_LEAK_PATTERN` = `/\blabs?\b\s*[-–—]?\s*0?\d+\b|แล็บ/i` จับเฉพาะรูปแบบ "lab 0X"/"แล็บ" — **ไม่ได้จับคำว่า "course"/"multi-agent course" เลย** ดังนั้นแม้ไม่ strip frontmatter เทสต์นี้ก็จับการรั่วครั้งนี้ไม่ได้อยู่ดี (การยืนยันของ PR ใช้ manual grep ไม่ใช่เทสต์)
- PR แก้เฉพาะเนื้อหา ไม่ได้แก้ตัวเทสต์ → regression กลับมาได้เงียบ ๆ · แนะนำ: (a) ขยาย pattern ให้ครอบคลุม `course`/`multi-agent` (b) พิจารณาสแกน frontmatter ของไฟล์ layout ด้วย หรืออย่างน้อยเขียนเทสต์ที่อ้างค่า default ของ `BaseLayout` ตรง ๆ

### S2 — FALLBACK contact เป็นค่าว่าง (มี follow-up แล้วใน PR #18 — ควรยืนยัน)

- `profile.ts` ให้ `FALLBACK.contact = { email: '', github: '' }` และ `contact.astro` ใช้เงื่อนไข `{profile.contact.email && ...}` — ถ้า `docs/PROFILE.md` หายหรือไม่มี `## Contact` หน้า Contact จะเหลือแค่ microcopy โดย**ไม่มีช่องทางติดต่อใด ๆ render ออกมาเลย** และไม่มีข้อความบอกสถานะ
- ตาม `docs/STATUS.md` มี PR #18 "Contact fallback follow-up" merge แล้ว — บันทึกเป็น Should เพื่อให้ re-review รวมยืนยันว่า fallback path มีเนื้อหาที่ใช้งานได้จริง ไม่ใช่แค่เงียบ

### S3 — `profile.contact.github` ถือว่าเป็น URL เต็มเสมอโดยไม่ validate

- วันนี้ `docs/PROFILE.md` เขียน `github: https://github.com/eua-angkoon-n` เป็น URL เต็ม จึงใช้ได้ แต่ parser ใน `profile.ts` ไม่ normalize/validate — ถ้าใครแก้ PROFILE เป็น username ลอย ๆ ลิงก์จะพังเงียบ ๆ (`href="eua-angkoon-n"` กลายเป็น relative link)
- แนะนำ: ตอน parse ถ้าไม่มี scheme ให้เติม `https://github.com/` หรือ validate แล้ว fallback เป็นค่าว่างพร้อม log

---

## Nit (เล็กน้อย ไม่บล็อก)

- **N1 — `(?![\s\S])` ใน `profile.ts` อ่านยาก:** เป็น idiom "end of input" (ใช้ `$` ตรง ๆ ไม่ได้เพราะ regex มี flag `m`) — ตัวแก้ multi-line parsing ถูกต้อง แต่ควรมี comment สั้น ๆ กำกับ ไม่อย่างนั้นคนอ่านหลังจะงง
- **N2 — `export const prerender = false` ใน `contact.astro` ไม่จำเป็นแล้ว:** หลังเอาฟอร์ม/สคริปต์ออกตาม D2 หน้านี้ไม่มี per-request logic นอกจาก `loadProfile()` — เก็บไว้ก็ไม่เสียหาย (แก้ PROFILE แล้วเห็นผลโดยไม่ rebuild) แต่ถ้าอยาก prerender ลดงาน server ทำได้
- **N3 — timestamp ใน STATUS/OPEN_LOOPS เดินถอยหลัง (13:20 → 12:43/12:25):** มีคำอธิบายใน Notes และอ้าง `git log` จึงรับได้ แต่ครั้งหน้าแก้ timestamp ผิดพร้อมเนื้อหาใน commit เดียวกัน diff จะอ่านง่ายกว่า
- **N4 — การแก้ `playwright/smoke.spec.ts` ถูกต้องตามกติกา:** ทวนไว้เฉย ๆ ว่าไฟล์นี้เป็น E2E ของโปรเจกต์ ไม่ใช่ `tests/labs/` ที่กติกาคอร์สห้ามแก้ (ต่างจากเคส D9) — การเปลี่ยน assertion จาก form fields เป็น mailto/GitHub จึงเป็นสิ่งที่*ต้อง*ทำเพื่อให้เทสต์ตรง D2 ไม่ใช่การแก้เทสต์ให้เขียว

---

## สิ่งที่ทำถูก (ยืนยันเทียบ DECISIONS)

| Decision | หลักฐานใน diff | ผล |
|---|---|---|
| D2 (Contact = mailto+GitHub เท่านั้น) | `contact.astro` ลบ `<form>` + สคริปต์ `fetch('/api/contact')` ออกหมด เหลือ mailto/GitHub + microcopy · `smoke.spec.ts` อัปเดตตาม | ✅ ตรงเป๊ะ |
| D1 (headline problem-first ไม่ overclaim) | copy About ใหม่ใช้กรอบ problem-first อิง brainstorm ใน PROFILE ไม่เติมข้อเท็จจริง | ✅ |
| D3 (Interests มีคำอธิบาย) | `interests.astro` เอา placeholder ออก ใส่คำอธิบายตาม PROFILE ที่อัปเดตตาม D3 | ✅ |
| D4 (IA 4 หน้า) | ทุกหน้าใส่ `description` เอง ไม่พึ่ง default | ✅ |
| D7 (ชื่อนายจ้าง) | ใช้ชื่อ "จงสถิตย์" ผ่าน Bio ใน PROFILE **หลัง**เจ้าของโปรไฟล์ยืนยันแล้วเท่านั้น | ✅ ลำดับถูก |
| D5/D6 (ไม่ขยาย scope) | ไม่เพิ่มฟีเจอร์ guestbook/การ์ดโปรเจกต์ใน PR นี้ แค่รายงานช่องว่าง | ✅ |

## Guardrails (public-site-safe)

- **Course-leak:** เอา "multi-agent course" ออกจาก default `description` ของทุกหน้าแล้ว (root cause fix ฝั่งเนื้อหา — ฝั่งเทสต์ดู S1) ✅
- **Secrets:** ไม่มี secret/PAT/webhook ใน diff ✅
- **Deploy claims:** ไม่มีการเคลม deploy · PR #17/commit `5fd5708` มีจริงตาม STATUS ✅
- **Ownership:** Claude แตะเฉพาะ UI (`src/pages/`, `src/layouts/`, `src/lib/profile.ts`) + docs · ไม่แตะ `src/lib/db.ts`/`src/pages/api/*` ของ OpenCode · ไฟล์ `docs/fe-be-contract-check.md` เขียนโดย OpenCode ผ่าน cross-harness call ตามกติกา (เฉพาะไฟล์รายงานที่ prompt ระบุ) ✅
- **Single-writer:** STATUS/OPEN_LOOPS ใน diff นี้ writer = Claude รอบเดียว ✅

## สรุปการติดตาม

| รายการ | สถานะ |
|---|---|
| M1 (D5 ก่อน ship) | เปิดอยู่ → L10 / issue #15 (P2, ก่อน Lab 08) |
| M2 (XSS/POST error) | ปิดแล้ว → PR #20 (L12) |
| S1 (test blind spot) | เปิดอยู่ — เสนอเพิ่มเป็น loop ใหม่หรือรวม L13 |
| S2 (contact fallback) | น่าจะปิดแล้ว → PR #18 · ยืนยันตอน re-review รวม |
| S3 (github URL validate) | เปิดอยู่ — เล็ก รวมกับ L13 ได้ |

---

## Round 2 — close

> ตัดสิน Must ทุกข้อหลังอ่าน `docs/review-claude-rebuttal.md` · ผู้ตัดสิน: OpenCode · วันที่: 2026-09-25
> ไม่ได้แก้ไฟล์ใดใน `src/` — ตรวจยืนยันแบบอ่านอย่างเดียว

### M1 — ปิด D5 ก่อน ship → **accept (valid rebuttal)**

- เหตุผล: Claude ไม่ได้อ้างว่าปิดแล้ว แต่ยอมรับตรง ๆ ว่ายังเปิดอยู่และชี้ถูกว่า D5 เป็น **human/facilitator decision** (ขอบเขต moderation/rate-limit) ไม่ใช่สิ่งที่ agent ฝ่ายใดตัดสินใจแทนได้ — การตอบนี้ไม่ใช่การปัดตก แต่เป็นการยืนยันสถานะที่ถูกต้อง
- เงื่อนไขเดิมยังคงอยู่และไม่ลดละ: **ห้าม ship/deploy จริงก่อนปิด issue #15** · ติดตามต่อที่ L10 (P2, ก่อน Lab 08) — Must ข้อนี้จึง "ปิดในเชิงรีวิวรอบนี้" แต่ "ยังเปิดในเชิงกติกา ship" ตามเดิม

### M2 — Stored XSS + POST error เงียบใน `guestbook.astro` → **accept (fixed)**

- เหตุผล: ตรวจยืนยัน `src/pages/guestbook.astro` เวอร์ชันปัจจุบันด้วยตนเองอีกครั้ง — render entries ด้วย `createElement`/`textContent` ทั้งหมด ไม่มี `innerHTML` ดิบเหลืออยู่, POST เช็ค `res.ok` และ surface error ผ่าน `#gb-status` ครบ (ทั้งกรณี HTTP error และ network error) — ตรงกับที่ rebuttal ยืนยัน (PR #20, L12 ปิดแล้ว)
- ไม่มีงานค้าง — ข้อนี้ปิดสมบูรณ์
