# Open Loops

> งานค้างที่ยังไม่ปิด · ลบแถวเมื่อเสร็จ
> Owner = `Claude` | `OpenCode` | `human`

Last updated: 2026-09-25 14:48 +07:00
Updated by: Claude

| ID | Task | Owner | Priority | Trigger / due | Notes |
|---|---|---|---|---|---|
| L6 | ใส่ label ให้ issue #1–#10 (สร้างไปแบบไม่มี label เพราะ label เช่น `course`, `lab-00` ยังไม่มีในโปรเจกต์) | human | P3 | ทางเลือก ไม่บล็อกงานถัดไป | ดู `docs/OPEN_LOOPS.md` ปิดแล้ว L3 — สร้าง label ก่อนแล้วค่อย label ทีหลังได้ |
| L10 | ปิด D5 (guestbook v1 scope) อย่างเป็นทางการใน `docs/DECISIONS.md` ก่อน ship จริง — หน้า `/guestbook` + nav link + `db.ts` schema scaffold มีอยู่แล้วแต่ decision ยังไม่ปิด | human + facilitator | P2 | ก่อน ship/deploy จริง | พบระหว่างตรวจสัญญา cross-harness (OpenCode), ไม่ใช่ blocker ของ Lab 04/05 เอง · ยืนยันซ้ำใน Lab 07 cross-model review (M1, accept-as-rebuttal) |
| L13 | Code-quality nits จาก re-review ของ PR #19 (merged แล้ว ไม่ใช่ blocker): (1) `EMAIL_RE` ใน `db.ts` ยอมรับอีเมลรูปแบบแปลก (trailing/consecutive dots) (2) `NAME_MAX`/`MESSAGE_MAX` เป็น magic number ซ้ำกับ `maxlength` ใน `guestbook.astro` คนละไฟล์คนละ ownership ไม่มี single source of truth (3) `json()` helper ซ้ำกันใน `contact.ts`/`guestbook.ts` สองที่ (4) `request.json()` parse-error catch ปนกันระหว่าง client 400 กับ server-side error จริง | OpenCode/backend | P3 | เมื่อมีเวลาว่าง ไม่บล็อก Lab ถัดไป | พบหลัง PR #19 merge แล้วจากรอบ code-review — ไม่กระทบความปลอดภัย/ฟังก์ชันปัจจุบัน |
| L14 | a11y P2 (จาก `docs/QA.md` Lab 06 debate): (1) custom `:focus-visible` outline ตามธีมเอิร์ท แทนการพึ่ง browser default (2) ทบทวน pattern การ์ด Home ที่ห่อ `<h2>` ด้วย `<a>` ถ้า IA ขยายเกิน 4 การ์ด | Claude/frontend | P3 | ไม่บล็อก ทำเมื่อมีเวลา | P1 สองข้อ (skip-link, semantic list) แก้แล้วใน PR นี้ — ดู `docs/QA.md` |
| L15 | `tests/public-site.test.ts` ยัง strip frontmatter ทั้งก้อนก่อนสแกนหาคำหลุด course/lab — แม้ขยาย regex ให้จับคำว่า "course" แล้ว (Lab 07 review) แต่ค่า default ของ prop ที่ประกาศใน frontmatter (เช่นใน `BaseLayout.astro`) ที่ยัง render จริงจะหลุดสแกนเสมออยู่ดี เพราะ frontmatter ถูกตัดทิ้งก่อนถึง regex | Claude/frontend | P3 | ไม่บล็อก ทำเมื่อมีเวลา — ต้องคิดเรื่อง false-positive จากโค้ดในบล็อก frontmatter ก่อนแก้ | พบระหว่าง Lab 07 cross-model review (S1b) — ดู `docs/review-opencode.md` |

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
| — | Lab 04 (Frontend UI) เสร็จ — 4 หน้า + Guestbook link ตาม PROFILE/DECISIONS, แก้ course-leak/D2-violation/palette/placeholder-copy, `npm test`+`npm run build` เขียว, cross-harness contract check (`docs/fe-be-contract-check.md`) เขียนแล้ว, commit `5fd5708` + PR #17 เปิดแล้ว | 2026-09-25 |
| L9 (ส่วน backend) | Implement persistence จริงใน `src/lib/db.ts` (`insertContact`/`insertGuestbook`/`listGuestbook` + `ValidationError`) + เชื่อม `src/pages/api/{guestbook,contact}.ts` (response contract 201/400/500, ไม่ leak stack/SQL) — `npm run test:labs` เขียว 2/2, `npm test` เขียว 3/3 · ส่วน UI ที่ L9 เดิมรวมไว้แยกเป็น L12 (owner Claude/frontend) · PR body ร่างไว้ที่ `docs/lab05-pr-body.md` รอผู้เรียน review diff แล้วเปิด PR เอง | 2026-09-25 |
| L12 | แก้ `src/pages/guestbook.astro` — POST error surfacing + `entries.innerHTML` → `createElement`/`textContent` (กัน stored XSS) | 2026-09-25 (PR #20 merged) |
| L11 | ตัดสินใจชะตากรรมของ `/api/contact` — **ลบ `src/pages/api/contact.ts`** ทิ้ง (คง `insertContact`/`ContactMessage` ใน `db.ts` ไว้เพราะ `test:labs` เรียกใช้ตรง) → D9 ใน `docs/DECISIONS.md` · ยืนยัน `npm run test:labs` เขียว 2/2 หลังลบ | 2026-09-25 (Lab 05b swarm, turn 3/20) |

## กฎสั้น

- อย่าเก็บงานที่ปิดแล้วจำนวนมากในตารางบน
- เปลี่ยน owner เมื่อ handoff ข้าม harness (ดู `docs/handoffs/`)
- สอง agent ห้ามเป็น writer พร้อมกันบนไฟล์นี้ — single-writer ตาม `AGENTS.md`
