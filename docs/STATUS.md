# Project Status

> อ่านทุก session · **สั้น** · single-writer ต่อรอบ
> ดู [`COURSE.md`](../COURSE.md) ชั้น State (Hot)

Last updated: 2026-09-25 09:43 +07:00
Updated by: OpenCode

## Current goal

- **Lab 00 ผ่านสมบูรณ์ทั้งสองฝั่งแล้ว** (C1 `/init` merge + C5 resume-session test ปิดโดย OpenCode) · พร้อมต่อ **Lab 02 (Debate)** ฝั่ง Claude จาก `docs/PROFILE.md` — ดู handoff `docs/handoffs/00-opencode-to-claude.md`

## Done (วันนี้ 2026-09-25 บนเครื่องนี้)

- **L2 ปิด (OpenCode `/init` + memory test):** C1 merge `/init` เข้า `AGENTS.md` (+25/−6 — เพิ่มโครงสร้างโปรเจกต์ + คำสั่ง npm ครบ, กฎ Ownership/Native harness คงครบ ไม่แตะ `src/`) · C5 resume-session test ผ่านทั้ง 3 steps (resume จำได้ว่า guestbook = SQLite ตาม `DATA_DIR` · เซสชันใหม่ยังเคารพ `AGENTS.md` โดยไม่ต้อง recall ปากเปล่า) · ไม่ติด memory plugin เพิ่ม
- **Commit `da83261`**: hot state รอบ Claude (แยก commit ก่อนตาม single-writer)

- **Commit `7ff2df0`** (ยังไม่ push): `.claude/settings.json`, `opencode.json`, `docs/STATUS.md`, `docs/OPEN_LOOPS.md`, `scripts/preflight.ps1` (encoding fix), `docs/PROFILE.md` (Lab 01 จริง), `.claude/agent-memory/frontend/*` (หลักฐาน B7)

- ตรวจเครื่องมือ: พบ `opencode --version` เป็น **v1 (1.18.32, package `opencode-ai`)** ทั้งที่ควรเป็น v2 — ถอน `opencode-ai` แล้วติดตั้ง `@opencode/cli@2.0.16` ใหม่ (ต้อง `--allow-scripts` เพราะ npm ใหม่บล็อก postinstall โดย default) → ตอนนี้ `opencode --version` = `2.0.16` ✔
- `gh auth login` — ผู้เรียนล็อกอินเองสำเร็จ (`eua-angkoon-n`) · ตั้ง `gh repo set-default eua-angkoon-n/build-ai-multi-agent-lab` แล้ว
- `npm install` → มี `node_modules` (232 packages) · `npm test` เขียว (2 files, 3 tests)
- Claude: `claude plugin install superpowers@claude-plugins-official --scope project` สำเร็จ → สร้าง `.claude/settings.json` อัตโนมัติพร้อม `enabledPlugins` ตรงกับ `.claude/settings.json.example`
- Claude B7 (persistent agent-memory): ให้ `@frontend` บันทึกโทนสี/ดีไซน์จาก `docs/PROFILE.md` ลง memory แล้วเรียก instance ใหม่แยกต่างหากให้ recall โดยไม่อ่าน PROFILE.md ซ้ำ — **recall ถูกต้อง** (minimal / soft earth tones / modern 2025+) ไฟล์อยู่ที่ `.claude/agent-memory/frontend/` ✔
- OpenCode: copy `opencode.json.example` → `opencode.json` (MCP stubs github+playwright, ไม่มี oh-my-openagent เพราะ v2 ยังไม่รองรับ) · smoke test `opencode run` ยืนยัน native agents (`@backend`) ใช้งานได้
- copy `.mcp.json.example` → `.mcp.json` · ยืนยันทั้ง `.env`, `node_modules`, `.mcp.json` ถูก gitignore ครบ
- เขียน `docs/STATUS.md` / `docs/OPEN_LOOPS.md` ใหม่ให้ตรงสภาพจริง (ดู Notes)

## In progress

- — (L2 ปิดแล้ว · รอผู้เรียนสลับไปทำ Lab 02 ฝั่ง Claude ตาม handoff)

## Blocked

- —

## Next actions

1. (Claude · ตาม handoff) เริ่ม **Lab 02 (Debate)** จาก `docs/PROFILE.md` — `labs/lab-02-debate/README.md` + `prompts/01–05`
2. (human) ตัดสินใจรัน `node scripts/create-course-issues.mjs` (L3) — สร้าง GitHub issues จริง ต้องขอผู้เรียนก่อนเสมอ
3. (human) ยืนยัน GitHub MCP (`claude mcp list` / `opencode mcp list`) จาก shell ใหม่ที่โหลด `.env` แล้ว (L4)
4. (human · ทางเลือก) `git push` commit `da83261` + commit รอบนี้ ขึ้น `origin/main` (L5)

## Files changed in latest session

- `AGENTS.md` — merge จาก `/init` (โครงสร้างโปรเจกต์ + คำสั่ง npm ครบ)
- `docs/handoffs/00-opencode-to-claude.md` — handoff ใหม่ส่งต่อ Claude ไป Lab 02
- `docs/STATUS.md`, `docs/OPEN_LOOPS.md` — ปิด L2 (writer รอบนี้ = OpenCode)
- (รอบก่อน) `docs/STATUS.md`, `docs/OPEN_LOOPS.md`, `.claude/settings.json`, `opencode.json`, `.mcp.json`, `.claude/agent-memory/frontend/*`

## Notes

- **สำคัญ — เหตุผลที่เขียนไฟล์นี้ใหม่ทั้งหมด:** เนื้อหาเดิมของ `docs/STATUS.md`/`docs/OPEN_LOOPS.md` (ก่อนวันนี้) เล่าว่า Lab 00 ทั้งฝั่ง Claude และ OpenCode เสร็จแล้ว รวมถึงอ้างถึง commit `e54962d` — แต่ `git log --all` ของเครื่องนี้มีแค่ commit เดียว (`aa2a52c Initial commit`) และไม่มี `e54962d` อยู่จริง ก่อนวันนี้เครื่องนี้ก็ไม่มี `node_modules`, `.claude/settings.json`, `opencode.json` เลย ข้อสรุป: ไฟล์ STATUS/OPEN_LOOPS เวอร์ชันก่อนหน้าถูกคัดลอกมาจากเครื่อง/เซสชันอื่นโดยไม่มีการ commit/push จริงรองรับ — **ให้ถือว่าเนื้อหาก่อนวันที่ 2026-09-25 เป็น unverified/stale จนกว่าจะพิสูจน์ซ้ำ** ข้อยกเว้นคือ `docs/PROFILE.md` ซึ่งตรวจสอบแล้วว่ามีเนื้อหาสัมภาษณ์จริง (ไม่ใช่ stub) อยู่ในเครื่องนี้จริง จึงเชื่อว่า Lab 01 (การสัมภาษณ์) เกิดขึ้นจริงแม้จะยังไม่ได้ commit
- ประเด็น GitHub MCP `HTTP 400` และ root cause (env ต้องโหลดก่อนเปิด `claude`/`opencode`) ที่เคยบันทึกไว้ — ยังไม่ได้ตรวจซ้ำบนเครื่องนี้ในวันนี้ (session นี้เปิดก่อนจะมี `.mcp.json`) ควรรัน `claude mcp list` / `opencode mcp list` จาก shell ใหม่ที่โหลด `.env` แล้วเพื่อยืนยันอีกครั้ง
- Proposed vs Approved: brainstorm อยู่ใน `DEBATE.md` — สิ่งที่ปิดแล้วอยู่ใน `DECISIONS.md`
- Writer รอบนี้ = **OpenCode** (สลับจาก Claude หลัง commit `da83261`) · handoff อยู่ที่ `docs/handoffs/00-opencode-to-claude.md` — writer รอบถัดไปของ STATUS/OPEN_LOOPS = Claude
