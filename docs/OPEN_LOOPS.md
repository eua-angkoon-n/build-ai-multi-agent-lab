# Open Loops

> งานค้างที่ยังไม่ปิด · ลบแถวเมื่อเสร็จ
> Owner = `Claude` | `OpenCode` | `human`

Last updated: 2026-09-25 10:05 +07:00
Updated by: Claude

| ID | Task | Owner | Priority | Trigger / due | Notes |
|---|---|---|---|---|---|
| L3 | รัน `node scripts/create-course-issues.mjs` เอง (สร้าง issue 10 อันจาก `.github/course-issues/*.md`) | human | P1 | ก่อน Lab 03 (plan-issues) | Claude Code auto-mode permission classifier บล็อกไม่ให้ Claude รันเองได้ — ต้องรันจากเทอร์มินัลของผู้เรียนโดยตรง หรือเพิ่ม permission rule ก่อน · **ห้ามรันซ้ำ** (ไม่ idempotent → issue ซ้ำ) |
| L4b | เปิด `claude` (interactive TUI) ครั้งเดียว แล้วกด approve MCP servers `github`/`playwright` ที่ขึ้น "Pending approval" | human | P2 | ก่อนใช้ GitHub MCP tools ฝั่ง Claude | `opencode mcp list` ผ่านแล้ว (ดูปิดแล้วด้านล่าง) — เหลือแค่ Claude ฝั่งเดียวที่ต้องกด approve เอง เป็น one-time trust prompt ทำ headless ไม่ได้ |

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

## กฎสั้น

- อย่าเก็บงานที่ปิดแล้วจำนวนมากในตารางบน
- เปลี่ยน owner เมื่อ handoff ข้าม harness (ดู `docs/handoffs/`)
- สอง agent ห้ามเป็น writer พร้อมกันบนไฟล์นี้ — single-writer ตาม `AGENTS.md`
