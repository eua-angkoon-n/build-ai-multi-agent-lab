# Project Status

> อ่านทุก session · **สั้น** · single-writer ต่อรอบ
> ดู [`COURSE.md`](../COURSE.md) ชั้น State (Hot)

Last updated: 2026-09-25 13:00 +07:00
Updated by: Claude

## Current goal

- **Lab 02 และ Lab 03 ปิดแล้ว** — Lab 02: `docs/DEBATE.md` + `docs/DECISIONS.md` (D1–D8) · Lab 03: L7 (PAT scope) ผู้เรียนแก้เองแล้ว → สร้าง GitHub issue #12–#16 จริงผ่าน GitHub MCP (map กับ D1/D2/D3+D4/D5/D7) + เพิ่ม `## Lab 03 — MCP vs gh` ใน DECISIONS.md · ปิด issue #3 (Lab 02 tracking) ตามงานจริง · **ค้าง 1 จุดที่ต้องมนุษย์ยืนยันก่อน Lab 04**: เอ่ยชื่อนายจ้าง "จงสถิตย์" บนเว็บสาธารณะได้หรือไม่ (D7/issue #16/L8) · พร้อมต่อ **Lab 04 (Frontend)** เมื่อ L8 ยืนยันแล้ว

## Done (วันนี้ 2026-09-25 บนเครื่องนี้)

- **Lab 03 (Plan + GitHub issues) เสร็จ:** ยืนยัน PAT scope แก้แล้ว (`mcp__github__get_me`/`add_issue_comment`/`issue_write` ทำงานได้ไม่ 403 อีกต่อไป) → สร้าง issue #12–#16 ผ่าน GitHub MCP จาก `docs/DECISIONS.md` (D1, D2, D3+D4, D5, D7) พร้อม acceptance checklist ทุกอัน · ปิด issue #3 (Lab 02 tracking) พร้อม comment หลักฐาน · เพิ่มตาราง issue + หัวข้อ `## Lab 03 — MCP vs gh` (5 bullet) ท้าย `docs/DECISIONS.md` · ให้คำสั่ง PowerShell สำหรับสร้าง draft issue ด้วย `gh` แก่ผู้เรียนไปรันเอง (ยังไม่ได้รัน — เป็นทางเลือกเสริมเพื่อประสบการณ์ ไม่จำเป็นต่อเกณฑ์ผ่าน Lab)

- **Lab 02 (Debate) เสร็จ:** รัน 3 sub-agent แยกกันตามลำดับ (Brand Strategist → UX Critic → Devil's Advocate) แต่ละตัว append เข้า `docs/DEBATE.md` คนละหัวข้อ ไม่ปนกัน (ตรวจแล้วว่าเป็นเสียงต่างกันจริง ไม่ใช่คนเดียวเขียนคลอ) · synthesize `docs/DECISIONS.md` เอง (facilitator) เป็น D1–D8 ครบ + Out of scope + เกณฑ์พร้อม Lab 04 · แก้ `docs/PROFILE.md` 2 จุด (headline ตาม D1, คำอธิบาย Interests ตาม D3) บันทึกไว้ใน DECISIONS.md ว่าแก้อะไร
- **เจอ conflict ระหว่าง session:** ระหว่างทำ Lab 02 พบว่ามี Claude Code session อื่นของผู้เรียนเองกำลัง idle อยู่พร้อมกัน (ชื่อ "brand strategy personal site", "ux-critic-debate-doc", "lab-debate-missing-brand-section") — ถามผู้เรียนแล้วยืนยันว่าเป็นของตัวเอง ให้ session นี้ทำต่อได้ ไม่มี conflict เกิดขึ้นจริงบน `docs/DEBATE.md` (ตรวจ `git status` ตลอดทาง)
- **เพิ่ม permission rule:** auto-mode classifier บล็อก sub-agent แก้ `docs/DEBATE.md` ด้วยเหตุผล "Modify Shared Resources" (เพราะเจอ session อื่นแตะไฟล์เดียวกัน) → ผู้เรียนสั่งเพิ่ม `permissions.allow: ["Edit(docs/**)", "Write(docs/**)"]` ใน `.claude/settings.local.json` (ไฟล์ personal, gitignored) แก้ได้แล้ว

- **ปิด GitHub issue ตามงานที่เสร็จจริง:** issue #1 (Lab 00) และ #2 (Lab 01) — comment สรุปหลักฐาน + `state_reason: completed` แล้วปิด · #3–#10 ปล่อยเปิดไว้เพราะยังไม่เริ่มทำจริง — **พบปัญหาใหม่:** `mcp__github__add_issue_comment` ให้ `403 Resource not accessible by personal access token` (fine-grained PAT ใน `.env`/`.mcp.json` ยังไม่มีสิทธิ์เขียน issue แม้จะอ่าน/list ได้) ต้อง fallback ไปใช้ `gh issue comment` / `gh issue close` แทนซึ่งใช้ token คนละตัว (จาก `gh auth login`, scope `repo`) — สำคัญเพราะ **Lab 03 ชื่อ "Plan + GitHub issues via MCP" ตรงๆ** จะพังถ้า PAT ไม่มีสิทธิ์เขียน ต้องแก้ scope ของ fine-grained PAT ก่อนถึง Lab 03 (ดู Notes)

- **L4 ปิดครบทั้งสองฝั่ง:** ผู้เรียนเปิด `claude` interactive เองแล้วกด approve MCP servers ที่ค้างอยู่ → `claude mcp list` ไม่ขึ้น "Pending approval" แล้ว (`playwright` ✔ Connected, `github` ขึ้น timeout ชั่วคราวตอน fetch tools list ผ่าน subprocess check แต่ยืนยันแยกด้วย `mcp__github__get_me` ในเซสชันจริงว่าเชื่อมต่อและ auth ได้ปกติ — บัญชี `eua-angkoon-n`) · `opencode mcp list` → `github` ✔ connected, `playwright` ✔ connected (ปิด L4 ฝั่ง OpenCode ไปก่อนหน้านี้แล้ว)
- **L3 — เสร็จแล้ว:** ผู้เรียนสั่งซ้ำแบบชัดเจน (หลังรอบแรกโดน permission classifier บล็อก) → `node scripts/create-course-issues.mjs` รันสำเร็จ สร้าง GitHub issue #1–#10 ครบทั้ง 10 lab (ยืนยันด้วย `gh issue list`) — ไม่มี label ติดมาเพราะ label เช่น `course`/`lab-00` ยังไม่มีในโปรเจกต์ (สคริปต์ fallback สร้างแบบไม่มี label อัตโนมัติ ไม่ error) → เปิด L6 เป็นงานเสริมถ้าต้องการใส่ label ทีหลัง
- **L5 — push:** push commit `7ff2df0`, `da83261`, `9cdfe82` (และ commit ปิดงานรอบนี้) ขึ้น `origin/main` แล้ว
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

- —

## Blocked

- —

## Next actions

1. **(human) ยืนยันก่อน Lab 04:** เอ่ยชื่อนายจ้าง "จงสถิตย์" บนเว็บสาธารณะได้หรือไม่ (D7 ใน `docs/DECISIONS.md` / issue #16) — ถ้ายังไม่ยืนยัน ให้ implement ด้วยคำเลี่ยงทั่วไปแทน (L8)
2. (human · ทางเลือก) รันคำสั่ง `gh issue create` ที่ Claude ให้ไว้ เพื่อประสบการณ์เปรียบเทียบ MCP vs gh ให้ครบ (ไม่บังคับ — เกณฑ์ผ่าน Lab 03 ครบแล้วโดยไม่ต้องทำข้อนี้)
3. (human · ทางเลือก) สร้าง label (`course`, `lab-00` ฯลฯ) แล้วติด label ให้ issue #1–#10 ทีหลังถ้าต้องการ (L6)
4. (Claude · frontend) เริ่ม **Lab 04 (Frontend)** จาก issue #12–#14 เมื่อ L8 ยืนยันแล้ว — ดู `labs/lab-04-frontend/README.md`

## Files changed in latest session

- `docs/DEBATE.md` (ใหม่) — 3 มุม Brand Strategist / UX Critic / Devil's Advocate ผ่าน sub-agent แยกกัน
- `docs/DECISIONS.md` — D1–D8 + Out of scope + เกณฑ์พร้อม Lab 04 + ตาราง issue #12–#16 + `## Lab 03 — MCP vs gh`
- `docs/PROFILE.md` — แก้ headline (D1) + เพิ่มคำอธิบาย Interests (D3)
- `.claude/settings.local.json` — เพิ่ม `permissions.allow` สำหรับ `docs/**` (แก้ auto-mode block ระหว่าง sub-agent เขียน DEBATE.md)
- GitHub: issue #12–#16 สร้างใหม่ผ่าน MCP, ปิด issue #3 (Lab 02 tracking)
- `docs/STATUS.md`, `docs/OPEN_LOOPS.md` — ปิด Lab 02 + Lab 03, เปิด L8 (ยืนยันชื่อนายจ้าง), writer รอบนี้ = Claude
- (รอบก่อน) `AGENTS.md` — merge จาก `/init` (โครงสร้างโปรเจกต์ + คำสั่ง npm ครบ)
- (รอบก่อน) `docs/handoffs/00-opencode-to-claude.md` — handoff ส่งต่อ Claude ไป Lab 02
- (รอบก่อน) `.claude/settings.json`, `opencode.json`, `.mcp.json`, `.claude/agent-memory/frontend/*`

## Notes

- **สำคัญ — เหตุผลที่เขียนไฟล์นี้ใหม่ทั้งหมด:** เนื้อหาเดิมของ `docs/STATUS.md`/`docs/OPEN_LOOPS.md` (ก่อนวันนี้) เล่าว่า Lab 00 ทั้งฝั่ง Claude และ OpenCode เสร็จแล้ว รวมถึงอ้างถึง commit `e54962d` — แต่ `git log --all` ของเครื่องนี้มีแค่ commit เดียว (`aa2a52c Initial commit`) และไม่มี `e54962d` อยู่จริง ก่อนวันนี้เครื่องนี้ก็ไม่มี `node_modules`, `.claude/settings.json`, `opencode.json` เลย ข้อสรุป: ไฟล์ STATUS/OPEN_LOOPS เวอร์ชันก่อนหน้าถูกคัดลอกมาจากเครื่อง/เซสชันอื่นโดยไม่มีการ commit/push จริงรองรับ — **ให้ถือว่าเนื้อหาก่อนวันที่ 2026-09-25 เป็น unverified/stale จนกว่าจะพิสูจน์ซ้ำ** ข้อยกเว้นคือ `docs/PROFILE.md` ซึ่งตรวจสอบแล้วว่ามีเนื้อหาสัมภาษณ์จริง (ไม่ใช่ stub) อยู่ในเครื่องนี้จริง จึงเชื่อว่า Lab 01 (การสัมภาษณ์) เกิดขึ้นจริงแม้จะยังไม่ได้ commit
- ประเด็น GitHub MCP `HTTP 400` และ root cause (env ต้องโหลดก่อนเปิด `claude`/`opencode`) ที่เคยบันทึกไว้ — ยังไม่ได้ตรวจซ้ำบนเครื่องนี้ในวันนี้ (session นี้เปิดก่อนจะมี `.mcp.json`) ควรรัน `claude mcp list` / `opencode mcp list` จาก shell ใหม่ที่โหลด `.env` แล้วเพื่อยืนยันอีกครั้ง
- Proposed vs Approved: brainstorm อยู่ใน `DEBATE.md` — สิ่งที่ปิดแล้วอยู่ใน `DECISIONS.md`
- **Permission classifier vs. แชท consent เป็นคนละชั้น:** ผู้เรียนบอก "ทำส่วนต่อไปทั้งหมดให้เสร็จ" ในแชทแล้ว แต่ Claude Code ยังมี auto-mode permission classifier แยกที่บล็อก `node scripts/create-course-issues.mjs` เองโดยอัตโนมัติ (มองว่า sensitive เพราะเขียนขึ้น GitHub จริง) — การ authorize ในแชทไม่ผ่านชั้นนี้ ต้องให้ผู้เรียนรันคำสั่งเองในเทอร์มินัล หรือเพิ่ม permission rule ให้ Claude Code ก่อน
- Writer รอบนี้ = **Claude** (สลับจาก OpenCode หลัง commit `9cdfe82`) · handoff เดิมอยู่ที่ `docs/handoffs/00-opencode-to-claude.md`
