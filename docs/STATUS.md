# Project Status

> อ่านทุก session · **สั้น** · single-writer ต่อรอบ
> ดู [`COURSE.md`](../COURSE.md) ชั้น State (Hot)

Last updated: 2026-09-25 09:40 +07:00
Updated by: Claude

## Current goal

- Lab 00 (Claude side) เสร็จและ commit แล้ว (`7ff2df0`) · เหลือ OpenCode `/init`+resume test ด้วยมือ (L2) ก่อนถือว่า Lab 00 ผ่านสมบูรณ์ทั้งสองฝั่ง · หลังจากนั้นพร้อมต่อ Lab 02 (Debate) เพราะ Lab 01 (PROFILE.md) มีอยู่แล้ว

## Done (วันนี้ 2026-09-25 บนเครื่องนี้)

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

- รอผู้เรียนทำ OpenCode `/init` + resume-session test ด้วยมือ (L2)

## Blocked

- —

## Next actions

1. เปิด `opencode` TUI จริง ทำ `/init` merge เข้า `AGENTS.md` (C1) และ resume-session memory test (C5) — ดู `labs/lab-00-project-init/README.md` ส่วน C1/C5
2. ตัดสินใจว่าจะรัน `node scripts/create-course-issues.mjs` หรือยัง (สร้าง GitHub issues จริงบน repo — ต้องขอผู้เรียนก่อนรันเสมอ)
3. (ทางเลือก) `git push` commit `7ff2df0` ขึ้น `origin/main` เมื่อพร้อม
4. ยืนยัน GitHub MCP (`claude mcp list` / `opencode mcp list`) จาก shell ใหม่ที่โหลด `.env` แล้ว
5. เมื่อ Lab 00 ผ่านสมบูรณ์ทั้งสองฝั่ง → เริ่ม Lab 02 (Debate) จาก `docs/PROFILE.md` ที่มีอยู่แล้ว

## Files changed in latest session

- `docs/STATUS.md`, `docs/OPEN_LOOPS.md` — เขียนใหม่ทั้งคู่ (ดู Notes)
- `.claude/settings.json` — สร้างใหม่ (project scope, superpowers enabled)
- `opencode.json`, `.mcp.json` — copy จาก `.example`
- `.claude/agent-memory/frontend/*` — memory ใหม่จากการทดสอบ B7

## Notes

- **สำคัญ — เหตุผลที่เขียนไฟล์นี้ใหม่ทั้งหมด:** เนื้อหาเดิมของ `docs/STATUS.md`/`docs/OPEN_LOOPS.md` (ก่อนวันนี้) เล่าว่า Lab 00 ทั้งฝั่ง Claude และ OpenCode เสร็จแล้ว รวมถึงอ้างถึง commit `e54962d` — แต่ `git log --all` ของเครื่องนี้มีแค่ commit เดียว (`aa2a52c Initial commit`) และไม่มี `e54962d` อยู่จริง ก่อนวันนี้เครื่องนี้ก็ไม่มี `node_modules`, `.claude/settings.json`, `opencode.json` เลย ข้อสรุป: ไฟล์ STATUS/OPEN_LOOPS เวอร์ชันก่อนหน้าถูกคัดลอกมาจากเครื่อง/เซสชันอื่นโดยไม่มีการ commit/push จริงรองรับ — **ให้ถือว่าเนื้อหาก่อนวันที่ 2026-09-25 เป็น unverified/stale จนกว่าจะพิสูจน์ซ้ำ** ข้อยกเว้นคือ `docs/PROFILE.md` ซึ่งตรวจสอบแล้วว่ามีเนื้อหาสัมภาษณ์จริง (ไม่ใช่ stub) อยู่ในเครื่องนี้จริง จึงเชื่อว่า Lab 01 (การสัมภาษณ์) เกิดขึ้นจริงแม้จะยังไม่ได้ commit
- ประเด็น GitHub MCP `HTTP 400` และ root cause (env ต้องโหลดก่อนเปิด `claude`/`opencode`) ที่เคยบันทึกไว้ — ยังไม่ได้ตรวจซ้ำบนเครื่องนี้ในวันนี้ (session นี้เปิดก่อนจะมี `.mcp.json`) ควรรัน `claude mcp list` / `opencode mcp list` จาก shell ใหม่ที่โหลด `.env` แล้วเพื่อยืนยันอีกครั้ง
- Proposed vs Approved: brainstorm อยู่ใน `DEBATE.md` — สิ่งที่ปิดแล้วอยู่ใน `DECISIONS.md`
- Writer รอบนี้ = Claude · ยังไม่มี handoff ไฟล์ — ถ้าสลับ harness ให้เขียน `docs/handoffs/` จาก TEMPLATE
