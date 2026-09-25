# Open Loops

> งานค้างที่ยังไม่ปิด · ลบแถวเมื่อเสร็จ
> Owner = `Claude` | `OpenCode` | `human`

Last updated: 2026-09-25 13:20 +07:00
Updated by: Claude

| ID | Task | Owner | Priority | Trigger / due | Notes |
|---|---|---|---|---|---|
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
| L2b (Lab 02) | Debate — 3 sub-agent แยกกัน (Brand Strategist / UX Critic / Devil's Advocate) เขียน `docs/DEBATE.md` ครบ 3 มุม + synthesize `docs/DECISIONS.md` (D1–D8) + แก้ `docs/PROFILE.md` ตาม D1/D3 | 2026-09-25 |
| L7 | แก้ fine-grained PAT ให้มีสิทธิ์ **Issues: Read and write** — ผู้เรียนแก้เองที่ GitHub settings แล้ว ยืนยันด้วย `mcp__github__issue_write`/`add_issue_comment` สร้าง+comment+close ได้จริงไม่ 403 | 2026-09-25 |
| L3b (Lab 03) | สร้าง GitHub issue #12–#16 ผ่าน MCP จาก `docs/DECISIONS.md` (D1/D2/D3+D4/D5/D7) + ปิด issue #3 (Lab 02) + เพิ่ม `## Lab 03 — MCP vs gh` ใน DECISIONS.md | 2026-09-25 |
| L8 | เจ้าของโปรไฟล์ยืนยันแล้วว่าเอ่ยชื่อนายจ้าง "จงสถิตย์" บนเว็บสาธารณะได้ — อัปเดต D7 ใน `docs/DECISIONS.md` + ปิด issue #16 | 2026-09-25 |

## กฎสั้น

- อย่าเก็บงานที่ปิดแล้วจำนวนมากในตารางบน
- เปลี่ยน owner เมื่อ handoff ข้าม harness (ดู `docs/handoffs/`)
- สอง agent ห้ามเป็น writer พร้อมกันบนไฟล์นี้ — single-writer ตาม `AGENTS.md`
