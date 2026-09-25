# Open Loops

> งานค้างที่ยังไม่ปิด · ลบแถวเมื่อเสร็จ
> Owner = `Claude` | `OpenCode` | `human`

Last updated: 2026-09-25 10:30 +07:00
Updated by: Claude

| ID | Task | Owner | Priority | Trigger / due | Notes |
|---|---|---|---|---|---|
| L7 | แก้ fine-grained PAT ให้มีสิทธิ์ **Issues: Read and write** (ปัจจุบัน `mcp__github__add_issue_comment`/`issue_write` โดน 403) | human | P1 | ก่อน Lab 03 (ชื่อ Lab ต้องใช้ "GitHub issues via MCP" ตรงๆ) | ตอนนี้ fallback ผ่าน `gh` CLI ได้ (token คนละตัว, scope `repo`) แต่ MCP เองยังเขียนไม่ได้ |
| L6 | ใส่ label ให้ issue #1–#10 (สร้างไปแบบไม่มี label เพราะ label เช่น `course`, `lab-00` ยังไม่มีในโปรเจกต์) | human | P3 | ทางเลือก ไม่บล็อกงานถัดไป | ดู `docs/OPEN_LOOPS.md` ปิดแล้ว L3 — สร้าง label ก่อนแล้วค่อย label ทีหลังได้ |

## ปิดแล้ว (ย่อ — ย้ายหรือลบได้เมื่อรก)

| ID | Task | Closed |
|---|---|---|
| — | Reconcile STATUS.md/OPEN_LOOPS.md เดิมที่อ้าง commit `e54962d` ซึ่งไม่มีจริงในเครื่องนี้ — เขียนใหม่ให้ตรงสภาพจริง (fresh clone, ยังไม่ผ่าน Lab 00) | 2026-09-25 |
| — | อัปเกรด OpenCode จาก v1 (`opencode-ai@1.18.32`) เป็น v2 (`@opencode/cli@2.0.16`) | 2026-09-25 |
| — | `npm install` + `npm test` เขียว, ติดตั้ง superpowers plugin (project scope), ทดสอบ Claude persistent agent-memory (B7) ผ่าน | 2026-09-25 |
| L1 | Review diff + `git commit` (Lab 00 deliverables + `docs/PROFILE.md` ของ Lab 01 + `.claude/agent-memory/`) — commit `7ff2df0` | 2026-09-25 |
| L2 | OpenCode `/init` merge เข้า `AGENTS.md` (C1 · diff จริง +25/−6 กฎเดิมครบ) + resume-session memory test (C5 · ผ่านทั้ง 3 steps โดยไม่ติด memory plugin) | 2026-09-25 |
| L4 (OpenCode) | `opencode mcp list` → `github` ✔ connected, `playwright` ✔ connected (โหลด `.env` เข้า process env ก่อนเรียก) | 2026-09-25 |
| L5 | `git push` commit `7ff2df0`, `da83261`, `9cdfe82` + commit ปิดงานรอบนี้ ขึ้น `origin/main` แล้ว | 2026-09-25 |
| L3 | รัน `node scripts/create-course-issues.mjs` สำเร็จ (ผู้เรียนสั่งซ้ำแบบชัดเจนหลัง permission classifier บล็อกรอบแรก) — สร้าง issue #1–#10 ครบ (ไม่มี label เพราะ label ยังไม่มีในโปรเจกต์ → ดู L6) | 2026-09-25 |
| L4b | ผู้เรียนเปิด `claude` interactive แล้วกด approve MCP servers เอง — `claude mcp list` ไม่ขึ้น pending แล้ว, ยืนยัน `github` MCP ทำงานจริงด้วย `mcp__github__get_me` ในเซสชัน (`playwright` ✔ Connected ด้วย) | 2026-09-25 |
| — | ปิด GitHub issue #1 (Lab 00) และ #2 (Lab 01) ตามงานจริงที่เสร็จแล้ว พร้อม comment สรุปหลักฐาน (ผ่าน `gh` CLI เพราะ MCP write โดน 403 → เปิด L7) | 2026-09-25 |

## กฎสั้น

- อย่าเก็บงานที่ปิดแล้วจำนวนมากในตารางบน
- เปลี่ยน owner เมื่อ handoff ข้าม harness (ดู `docs/handoffs/`)
- สอง agent ห้ามเป็น writer พร้อมกันบนไฟล์นี้ — single-writer ตาม `AGENTS.md`
