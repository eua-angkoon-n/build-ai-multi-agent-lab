# Open Loops

> งานค้างที่ยังไม่ปิด · ลบแถวเมื่อเสร็จ
> Owner = `Claude` | `OpenCode` | `human`

Last updated: 2026-09-25 09:15 +07:00
Updated by: Claude

| ID | Task | Owner | Priority | Trigger / due | Notes |
|---|---|---|---|---|---|
| L1 | Review diff ที่ stage ไว้ แล้ว `git commit` เอง (Lab 00 deliverables: `.claude/settings.json`, `opencode.json`, `docs/STATUS.md`, `docs/OPEN_LOOPS.md`, และ `docs/PROFILE.md` ของ Lab 01 ที่ยังไม่เคย commit) | human | P0 | ก่อนเริ่ม Lab 01/02 ต่อ | ดู `docs/STATUS.md` Next actions ข้อ 1 |
| L2 | ทำ OpenCode `/init` merge เข้า `AGENTS.md` (C1) และ resume-session memory test (C5) ผ่าน `opencode` TUI จริงด้วยมือ | human | P1 | ก่อนถือว่า Lab 00 ผ่านสมบูรณ์ | ต้องเปิด TUI เอง — ไม่มีหลักฐานว่าทำบนเครื่องนี้แล้ว แม้ `AGENTS.md` จะมี seed ครบอยู่แล้วก็ตาม |
| L3 | ตัดสินใจรัน `node scripts/create-course-issues.mjs` หรือยัง | human | P2 | เมื่อพร้อมสร้าง course issues บน GitHub จริง | สร้าง issue จริงบน repo — ต้องขอผู้เรียนก่อนรันเสมอ |
| L4 | ยืนยัน GitHub MCP (`claude mcp list` / `opencode mcp list`) จาก shell ใหม่ที่โหลด `.env` แล้ว (`.mcp.json` เพิ่งถูกสร้างวันนี้) | human | P2 | ก่อนใช้ GitHub MCP tools รอบถัดไป | session ปัจจุบันเปิดก่อนมี `.mcp.json` จึงยังไม่โหลด MCP config นี้ |

## ปิดแล้ว (ย่อ — ย้ายหรือลบได้เมื่อรก)

| ID | Task | Closed |
|---|---|---|
| — | Reconcile STATUS.md/OPEN_LOOPS.md เดิมที่อ้าง commit `e54962d` ซึ่งไม่มีจริงในเครื่องนี้ — เขียนใหม่ให้ตรงสภาพจริง (fresh clone, ยังไม่ผ่าน Lab 00) | 2026-09-25 |
| — | อัปเกรด OpenCode จาก v1 (`opencode-ai@1.18.32`) เป็น v2 (`@opencode/cli@2.0.16`) | 2026-09-25 |
| — | `npm install` + `npm test` เขียว, ติดตั้ง superpowers plugin (project scope), ทดสอบ Claude persistent agent-memory (B7) ผ่าน | 2026-09-25 |

## กฎสั้น

- อย่าเก็บงานที่ปิดแล้วจำนวนมากในตารางบน
- เปลี่ยน owner เมื่อ handoff ข้าม harness (ดู `docs/handoffs/`)
- สอง agent ห้ามเป็น writer พร้อมกันบนไฟล์นี้ — single-writer ตาม `AGENTS.md`
