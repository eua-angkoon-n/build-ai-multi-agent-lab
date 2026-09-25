# Handoff: OpenCode → Claude

Timestamp: 2026-09-25 09:43 +07:00
Task: ปิด L2 (Lab 00 ฝั่ง OpenCode: `/init` merge (C1) + resume-session memory test (C5)) → ส่งต่อให้เริ่ม Lab 02 (Debate)
Status: IMPLEMENTED

## What changed

- **C1 — `/init` merge เข้า `AGENTS.md`:** เพิ่มส่วน "โครงสร้างโปรเจกต์" (folder map จริงของ repo) และปรับ "คำสั่งหลัก" ให้ตรง `package.json` (เติม `preview` / `test:watch` / `test:e2e` / `create-issues`) — กฎเดิมคงครบ: Ownership / สี่เสา / Native harness only / ห้ามทั้งหมด · **ไม่แตะ `src/`**
- **C5 — persistent memory test ผ่านทั้ง 3 steps:**
  1. ยืนยันในเซสชันว่า guestbook ใช้ SQLite ตาม `DATA_DIR` (ไม่แก้โค้ด)
  2. resume เซสชันเดิม → ตอบ "guestbook เก็บที่ไหน" จากบริบทเดิมได้ (SQLite `site.sqlite` ตาม `DATA_DIR` ผ่าน `src/lib/db.ts`)
  3. เซสชันใหม่ → ยังเคารพ `AGENTS.md`/`backend` โดยไม่ต้อง recall ปากเปล่า (ตอบชี้ไปโค้ด/docs = ผ่านตามเกณฑ์)
  - ไม่ได้ติดตั้ง memory plugin เพิ่ม (ตามกติกา C5 ข้อ 4)
- commit `da83261` = hot state รอบ Claude (แยกก่อนตาม single-writer) · commit นี้ = รอบ OpenCode

## Files

- `AGENTS.md` — merge จาก `/init` (+25/−6)
- `docs/handoffs/00-opencode-to-claude.md` — ไฟล์นี้
- `docs/STATUS.md` · `docs/OPEN_LOOPS.md` — อัปเดตปิด L2 (writer = OpenCode)

## Verification

- Unit / smoke: PASS — `npm test` เขียว (2 files, 3 tests) จาก session ก่อนหน้า · รอบนี้ไม่ได้แก้โค้ดจึงไม่รันซ้ำ
- Labs (`npm run test:labs`): N/A
- Manual / localhost: จุดเช็ก C1 ผ่าน (`git diff AGENTS.md` เห็นจริง · ตาราง Ownership/Native harness ยังอยู่ครบ) · C5 ผ่านทั้ง resume-session และ new-session ตามที่ผู้เรียนยืนยัน

## Assumptions to challenge

1. ผู้เรียนเป็นคน confirm ผล C5 step 2–3 (resume + เซสชันใหม่) ด้วยมือ — ถ้ามี step ไหนยังไม่ได้ทำจริง ให้เปิด L2 ซ้ำ
2. `AGENTS.md` ที่ merge แล้วไม่มี `docs/DECISIONS.md` / `DEBATE.md` ในตารางชั้นความรู้เพราะไฟล์ยังไม่ถูกสร้าง (จะมาตอน Lab 02) — ถ้า Lab 02 สร้างแล้วค่อยพิจารณาเติม

## Request to next agent

เริ่ม **Lab 02 (Debate)** ฝั่ง Claude จาก `docs/PROFILE.md` ที่มีเนื้อหาสัมภาษณ์จริงแล้ว (commit `7ff2df0`) — ดู `labs/lab-02-debate/README.md` + `prompts/01–05`

ขอบเขต: Profile / debate docs เป็นของ Claude (subagents: brand strategist / UX critic / devil's advocate) · **อย่าแตะ** `src/` · `src/lib/db.ts` + `src/pages/api/*` ยังเป็นของ OpenCode `backend` · swarm ต้องหยุดไม่เกิน 20 turns

งานค้างที่ยังเป็นของมนุษย์ (อย่ารันแทน): **L3** `node scripts/create-course-issues.mjs` (สร้าง GitHub issues จริง — ต้องขอผู้เรียนก่อนเสมอ) · **L4** ยืนยัน GitHub/Playwright MCP จาก shell ใหม่ที่โหลด `.env` แล้ว · **L5** `git push` (commit `da83261` + commit นี้)

## Canonical state updated

- [x] `docs/STATUS.md`
- [x] `docs/OPEN_LOOPS.md`
- [ ] `docs/DECISIONS.md` (ถ้ามี decision ใหม่ที่อนุมัติแล้ว) — ยังไม่มี
- [x] อื่น ๆ: `docs/handoffs/00-opencode-to-claude.md`

## Single-writer note

Writer รอบถัดไปของ STATUS/OPEN_LOOPS = Claude (จนกว่าจะ commit หรือเขียน handoff กลับ)
