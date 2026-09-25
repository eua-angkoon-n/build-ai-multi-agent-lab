# Project Status

> อ่านทุก session · **สั้น** · single-writer ต่อรอบ
> ดู [`COURSE.md`](../COURSE.md) ชั้น State (Hot)

Last updated: 2026-09-25 09:15 +07:00
Updated by: Claude

## Current goal

- Lab 00 (project init) กำลังทำให้เครื่องนี้ตรงกับ checklist ของ `labs/lab-00-project-init/README.md` — เครื่องนี้เป็น fresh clone เดี่ยว (commit เดียว) ที่ยังไม่เคยผ่าน Lab 00 จริงมาก่อน

## Done (วันนี้ 2026-09-25 บนเครื่องนี้)

- ตรวจเครื่องมือ: พบ `opencode --version` เป็น **v1 (1.18.32, package `opencode-ai`)** ทั้งที่ควรเป็น v2 — ถอน `opencode-ai` แล้วติดตั้ง `@opencode/cli@2.0.16` ใหม่ (ต้อง `--allow-scripts` เพราะ npm ใหม่บล็อก postinstall โดย default) → ตอนนี้ `opencode --version` = `2.0.16` ✔
- `gh auth login` — ผู้เรียนล็อกอินเองสำเร็จ (`eua-angkoon-n`) · ตั้ง `gh repo set-default eua-angkoon-n/build-ai-multi-agent-lab` แล้ว
- `npm install` → มี `node_modules` (232 packages) · `npm test` เขียว (2 files, 3 tests)
- Claude: `claude plugin install superpowers@claude-plugins-official --scope project` สำเร็จ → สร้าง `.claude/settings.json` อัตโนมัติพร้อม `enabledPlugins` ตรงกับ `.claude/settings.json.example`
- Claude B7 (persistent agent-memory): ให้ `@frontend` บันทึกโทนสี/ดีไซน์จาก `docs/PROFILE.md` ลง memory แล้วเรียก instance ใหม่แยกต่างหากให้ recall โดยไม่อ่าน PROFILE.md ซ้ำ — **recall ถูกต้อง** (minimal / soft earth tones / modern 2025+) ไฟล์อยู่ที่ `.claude/agent-memory/frontend/` ✔
- OpenCode: copy `opencode.json.example` → `opencode.json` (MCP stubs github+playwright, ไม่มี oh-my-openagent เพราะ v2 ยังไม่รองรับ) · smoke test `opencode run` ยืนยัน native agents (`@backend`) ใช้งานได้
- copy `.mcp.json.example` → `.mcp.json` · ยืนยันทั้ง `.env`, `node_modules`, `.mcp.json` ถูก gitignore ครบ
- เขียน `docs/STATUS.md` / `docs/OPEN_LOOPS.md` ใหม่ให้ตรงสภาพจริง (ดู Notes)

## In progress

- รีวิว diff ที่ stage ไว้ (ยังไม่ commit ตามที่ผู้เรียนขอ) แล้ว commit เอง

## Blocked

- —

## Next actions

1. รีวิว `git status`/diff ของ `.claude/settings.json`, `opencode.json`, `docs/STATUS.md`, `docs/OPEN_LOOPS.md` ที่ stage ไว้ แล้ว `git commit` เอง (Claude ไม่ commit ให้ตามคำขอ)
2. ทำ OpenCode ส่วน C1 (`/init` merge เข้า `AGENTS.md` ผ่าน TUI จริง) และ C5 (resume-session memory test) ด้วยมือ — ต้องเปิด `opencode` TUI ทำเอง ไม่มีหลักฐานยืนยันว่าทำบนเครื่องนี้แล้ว (ดู Notes)
3. ตัดสินใจว่าจะรัน `node scripts/create-course-issues.mjs` หรือยัง (สร้าง GitHub issues จริงบน repo — ยังไม่รันเพราะเป็น action ที่มองเห็นได้บน GitHub ต้องขอผู้เรียนก่อน)
4. หลัง Lab 00 ครบ → ต่อ Lab 01 (Interview) — หมายเหตุ: `docs/PROFILE.md` มีเนื้อหาสัมภาษณ์จริงอยู่แล้วในเครื่องนี้ (ไม่ใช่ stub) แต่ **ยังไม่ได้ commit** เข้า git เลย ต้องรวม commit นี้ไปกับ Lab 00 หรือแยก commit ก็ได้ แล้วแต่ผู้เรียน

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
