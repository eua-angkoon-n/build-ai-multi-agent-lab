# Handoff: Claude → OpenCode

Timestamp: 2026-09-25 12:25 +07:00
Task: Lab 04 — Frontend pages (Home/About/Interests/Contact + PR)
Status: NEEDS_REVIEW

## What changed

- 4 หน้า (Home/About/Interests/Contact) + Guestbook แสดงเนื้อหาจริงจาก `docs/PROFILE.md` ผ่าน `loadProfile()` เดิม (ไม่ได้เขียน parser ใหม่)
- Contact page แก้ตาม D2: เอาฟอร์ม + `fetch('/api/contact')` ออก เหลือแค่ mailto + GitHub link (เพิ่ม field `contact` ใน `Profile` type/`profile.ts` เพื่อรองรับ)
- `BaseLayout.astro`: ปรับ palette เป็นโทนเอิร์ทอ่อน (ตาม Tone ใน PROFILE.md) + แก้ default `description` ที่หลุดคำว่า "multi-agent course" ออกจาก meta tag (เดิมหลุดเพราะ `tests/public-site.test.ts` strip frontmatter ก่อนสแกน เลยจับไม่เจอ — ดู Assumptions ข้อ 1)
- About/Interests: เอา placeholder filler ("จะอัปเดตเร็ว ๆ นี้") ออก แทนด้วยเนื้อหาอิงจาก brainstorm ใน PROFILE.md (problem-first framing) — ไม่ได้เติมข้อเท็จจริงใหม่ที่ไม่มีใน PROFILE
- เรียก OpenCode headless หนึ่งครั้ง (`opencode run` ตาม README ขั้นที่ 4) ให้เขียน `docs/fe-be-contract-check.md` ตรวจสัญญา Contact/Guestbook form ↔ `src/pages/api/*.ts` — ไม่ได้แตะ `src/`
- เปิด PR #17: https://github.com/eua-angkoon-n/build-ai-multi-agent-lab/pull/17 (branch `lab-04-frontend` → `main` ใน repo ของผู้เรียนเอง ไม่ใช่ upstream)

## Files

- `src/layouts/BaseLayout.astro`
- `src/lib/profile.ts`
- `src/pages/about.astro`
- `src/pages/contact.astro`
- `src/pages/guestbook.astro`
- `src/pages/interests.astro`
- `docs/fe-be-contract-check.md` (ใหม่ — เขียนโดย OpenCode)
- `docs/handoffs/04-claude-to-opencode.md` (ไฟล์นี้)

## Verification

- Unit / smoke: PASS — `npm test` เขียว (2 files, 3 tests) ทั้งก่อนและหลังแก้
- Labs (`npm run test:labs`): N/A — ไม่บังคับใน Lab 04 ตาม README
- Manual / localhost: PASS — `npm run build` ผ่าน, `npm run dev` แล้ว fetch `/`, `/about`, `/interests`, `/contact`, `/guestbook` ได้ 200 ทั้งหมด, grep หา "course"/"multi-agent course"/"Lab 0" ในหน้าที่ render ไม่เจอ (0 matches)

## Assumptions to challenge

1. `tests/public-site.test.ts` strip astro frontmatter ทั้งก้อนก่อนสแกนหาคำหลุด course/lab (สมมุติว่า frontmatter ไม่ render) — แต่ค่า default ของ prop (เช่น `description`) ที่ประกาศใน frontmatter สามารถไหลไป render จริงใน `<meta>` ได้ ทำให้เคสนี้หลุดผ่าน test มาก่อน (แก้เนื้อหาแล้ว แต่ตัว test เองยังมี blind spot นี้อยู่ — ยังไม่ได้แก้ regex/สโคปการ strip)
2. OpenCode's contract check พบว่า D5 (guestbook v1 scope) ยังไม่ปิดอย่างเป็นทางการ แต่หน้า `/guestbook` มีฟอร์ม + link ใน nav + `src/lib/db.ts` มี schema scaffold ล่วงหน้าแล้ว — สมมุติว่านี่คือ scaffold ที่ตั้งใจเตรียมไว้สำหรับ Lab 05 ไม่ใช่ scope creep ที่ต้อง revert (ควรยืนยันกับผู้เรียนก่อนพัฒนาต่อ)

## Request to next agent

**Scope: implement guestbook API ตาม `docs/DECISIONS.md` + `docs/fe-be-contract-check.md` + ทำให้ `npm run test:labs` เขียว**

จาก `docs/fe-be-contract-check.md` (OpenCode เขียนเอง) มีข้อเสนอแนะ 5 ข้อที่ควรทำก่อนหรือระหว่าง Lab 05:
1. ปิด D5 ก่อน ship จริง (ตัดสินใจว่า guestbook v1 จะ persist จริงหรือยัง)
2. ตัดสินใจชะตากรรมของ `/api/contact` (orphan endpoint — ไม่มีฟอร์มเรียกใช้แล้วหลัง D2)
3. ให้ฟอร์ม guestbook แสดง error เมื่อ POST ไม่ผ่าน (ตอนนี้กลืนเงียบ)
4. เปลี่ยน `entries.innerHTML` เป็น `textContent` ใน `guestbook.astro` (กัน stored XSS เมื่อ persist ข้อมูลจริง)
5. นิยาม response contract + server-side validation (mirror maxlength 80/500) ให้ตรงกับที่ `db.ts`/stub วางไว้

**อย่าแตะ UI นอกจำเป็น** — ไฟล์ `src/pages/*.astro` (ยกเว้นจุดที่ผูกกับ error handling ของฟอร์ม guestbook ตามข้อ 3–4 ด้านบน) และ `src/layouts/` เป็นของ Claude/`frontend` อยู่

## Canonical state updated

- [x] `docs/STATUS.md`
- [x] `docs/OPEN_LOOPS.md`
- [ ] `docs/DECISIONS.md` (ถ้ามี decision ใหม่ที่อนุมัติแล้ว) — ยังไม่มี decision ใหม่รอบนี้ (D5 ยังเปิดอยู่ตามเดิม)
- [ ] อื่น ๆ:

## Single-writer note

Writer รอบถัดไปของ STATUS/OPEN_LOOPS = **OpenCode**
