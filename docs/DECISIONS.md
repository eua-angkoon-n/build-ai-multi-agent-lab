# Decisions — Personal Site

## สรุปการโต้วาที

Brand Strategist เสนอให้ headline เปลี่ยนจาก "บอกความสนใจ" เป็น "บอก value ที่ทำให้คนอ่าน" ด้วยโทน active learning ส่วน UX Critic ชี้ว่าข้อมูล Interests/Contact ยังบางเกินไปสำหรับ IA 4 หน้า และเสนอโครงสร้าง+microcopy ที่ชัดเจนขึ้น ทั้งสองมุมนี้ไปด้วยกันได้ดี แต่ Devil's Advocate ท้วงว่าโทน "active" เสี่ยง overclaim ถ้าไม่มีของจริงรองรับ (การ์ดโปรเจกต์ยังเป็นแค่ Nice) และเตือนความเสี่ยงที่ไม่มีใครพูดถึงมาก่อน 3 เรื่อง คือ email plaintext เสี่ยง scraping, guestbook ยังไม่มีเจ้าของ moderation, และการเอ่ยชื่อนายจ้าง "จงสถิตย์" ที่ยังไม่ได้รับการยืนยันว่าเผยแพร่ได้ ข้อสรุปคือ**รับแนวทาง Brand+UX ส่วนโทน/โครงสร้าง แต่ตัดสิ่งที่ Devil ชี้ว่ายังไม่มีหลักฐานหรือยังไม่ได้รับอนุญาตออกจาก v1** เพื่อคุมความเสี่ยงและ scope ให้ตรงกับสิ่งที่มีจริงตอนนี้

## การตัดสินใจ (ตาราง)

| ID | หัวข้อ | ตัดสินใจ | เหตุผลสั้น | ใครเสนอ (Brand/UX/Devil) |
|----|--------|----------|------------|---------------------------|
| D1 | Headline/Tagline | เปลี่ยนเป็น problem-first + โทน active แต่ใช้กาลปัจจุบันต่อเนื่อง ("กำลังลงมือปรับใช้") ไม่ใช้คำเชิงเชี่ยวชาญ/สำเร็จรูป | ตรงกับ Bio จริงที่กำลังลงมือทำอยู่แล้ว ไม่ใช่แค่ "สนใจ" แต่ก็ไม่ over-claim เพราะยังไม่มีเคสโชว์ | Brand (เสนอ) + Devil (คุมโทน) |
| D2 | Contact v1 | ใช้แค่ mailto + GitHub link พร้อม microcopy สั้นบอกว่าเรื่องแบบไหนทักมาได้ — **ไม่ทำฟอร์มเก็บข้อมูลฝั่ง server ใน v1** | ตัดความเสี่ยง data-retention/privacy ที่ยังไม่มี policy รองรับ ในขณะที่ยังได้ประโยชน์เรื่อง framing จาก UX | UX (framing) + Devil (ตัด data collection) |
| D3 | Interests (ข้อมูลเพิ่ม) | เพิ่มคำอธิบาย 1–2 บรรทัดต่อด้าน (AI Agentic / Web Dev / Data Analysis) ใน PROFILE.md ก่อนเข้า Lab 04 | ข้อมูลเดิมมีแค่ label ลอยๆ ไม่พอสำหรับหน้า Interests เต็มหน้าตาม IA 4 หน้า | UX |
| D4 | IA เว็บไซต์ | ใช้โครงสร้าง 4 หน้า Home (Hero+preview) / About (Bio เต็ม) / Interests (การ์ดขยาย) / Contact ตามที่ UX เสนอ | แก้ปัญหา Interests กับ About ทับซ้อนกัน และให้แต่ละหน้ามีหน้าที่ชัดเจน | UX |
| D5 | Guestbook | **ยังไม่ตัดสินใจสร้างใน v1** — เก็บเป็นหัวข้อที่ต้องตัดสินใจแยกตอน Lab 05 (backend) พร้อม moderation/rate-limit ก่อน ship เท่านั้น ห้ามเริ่มออกแบบ schema ล่วงหน้าจากที่ Brainstorm พูดถึงเฉยๆ | Brainstorm ผูก guestbook กับ Lab 05 ไปแล้วราวกับเป็นข้อสรุป ทั้งที่ยังไม่มี decision จริง และยังไม่มีคนตอบเรื่อง moderation | Devil |
| D6 | การ์ดโปรเจกต์ | คงไว้เป็น **Nice** (ไม่เลื่อนขึ้น Must) จนกว่าจะมีเคสจริงอย่างน้อย 1 ชิ้นพร้อมโชว์ | ถ้าไม่มีของจริงรองรับ frame "ปัญหา→ลงมือ→ผลลัพธ์" จะกลายเป็น overclaim | Devil (ค้าน) แม้ Brand จะเสนอเรื่องนี้ |
| D7 | ชื่อนายจ้าง "จงสถิตย์" | **ค้างไว้ ต้องให้เจ้าของโปรไฟล์ (Tae) ยืนยันชัดเจนก่อน** ว่าเอ่ยชื่อบริษัทบนเว็บสาธารณะได้หรือไม่ — ถ้ายังไม่ยืนยัน Lab 04 ให้ใช้คำเลี่ยงทั่วไป (เช่น "บริษัทที่ทำงานอยู่ปัจจุบัน") แทนชื่อจริง | PROFILE.md ปัจจุบันเอ่ยชื่อบริษัทตรงๆ ใน Bio แต่ไม่มีที่ไหนยืนยันว่านายจ้างอนุญาต — เสี่ยงปัญหาความสัมพันธ์ในที่ทำงานถ้าเผยแพร่โดยไม่ถาม | Devil |
| D8 | Must list (scope) | ตัดคำว่า "ตามตัวอย่างอ้างอิง" ออกจากนิยาม Must ของ Layout — ให้เหลือแค่ "แนวทางคร่าวๆ" ตามที่ PROFILE กำกับไว้แล้ว | กันไม่ให้ Must กลายเป็นภาระ design ที่ตีความเกินจริง | Devil |

## สิ่งที่เลื่อนออก (Out of scope v1)

- Contact form ที่เก็บข้อมูลฝั่ง server (ใช้ mailto/ลิงก์ธรรมดาแทน — ดู D2)
- Guestbook แบบสร้างเต็มรูปแบบ — รอ decision ที่ Lab 05 พร้อม moderation (ดู D5)
- การ์ดโปรเจกต์/เคสที่เคยใช้ AI agents — รอจนกว่าจะมีเคสจริงพร้อมโชว์ (ดู D6)
- Dark/Light mode และ Newsletter/RSS (ตาม Brainstorm เดิม อยู่ใน Later อยู่แล้ว)
- Data-retention/deletion policy แบบเป็นทางการ — ไม่จำเป็นใน v1 เพราะไม่มีฟอร์มเก็บข้อมูลแล้ว (ผลจาก D2)

## เกณฑ์พร้อม Frontend (Lab 04)

- Headline/Tagline ใหม่ตาม D1 พร้อมใช้ใน Hero (อัปเดตใน `docs/PROFILE.md` แล้ว)
- Interests มีคำอธิบาย 1–2 บรรทัดต่อด้านตาม D3 (อัปเดตใน `docs/PROFILE.md` แล้ว) พร้อมสำหรับหน้า Interests แยกเดี่ยว
- หน้า Contact ออกแบบเป็น mailto + GitHub link พร้อม microcopy เท่านั้น — **ห้าม**สร้างฟอร์มที่ส่งข้อมูลไป backend ใน v1 (ตาม D2)
- **ต้องได้รับการยืนยันจากเจ้าของโปรไฟล์ก่อนเริ่ม Lab 04** ว่าเอ่ยชื่อ "จงสถิตย์" บนเว็บสาธารณะได้หรือไม่ (D7) — ถ้ายังไม่ยืนยัน ให้ implement ด้วยคำเลี่ยงทั่วไปไปก่อน
- ไม่เพิ่ม Guestbook หรือการ์ดโปรเจกต์เข้า scope Lab 04 (ยังอยู่ Nice/รอ decision ตาม D5–D6)

## บันทึกการแก้ไข docs/PROFILE.md

หลังสรุป decisions ข้างต้น แก้ไข `docs/PROFILE.md` 2 จุดตาม D1 และ D3:

- **Headline**: จาก "Programmer ที่สนใจ AI agents" → "โปรแกรมเมอร์ที่กำลังลงมือปรับใช้ AI agents กับงานจริง" (ตาม D1 — problem-first, active แต่ไม่ over-claim)
- **Interests**: เพิ่มคำอธิบาย 1 บรรทัดต่อรายการ (เดิมมีแค่ label ลอยๆ) ตาม D3

ไม่ได้แก้ Bio, Audience, Contact, Tone, Not-to-show-publicly — เนื้อหาส่วนนี้ยังตรงกับ decisions ข้างต้น (Contact ฝั่ง UI จะ implement ตาม D2 ตอน Lab 04 โดยไม่ต้องแก้ PROFILE.md เพิ่ม)

## Lab 03 — Issues created via GitHub MCP

| Issue # | Title | มาจาก Decision |
|---|---|---|
| [#12](https://github.com/eua-angkoon-n/build-ai-multi-agent-lab/issues/12) | [D1] Align Home hero headline/tagline with PROFILE.md | D1 |
| [#13](https://github.com/eua-angkoon-n/build-ai-multi-agent-lab/issues/13) | [D2] Contact page: mailto + GitHub link only, no server-side form (v1) | D2 |
| [#14](https://github.com/eua-angkoon-n/build-ai-multi-agent-lab/issues/14) | [D3/D4] Build 4-page IA with expanded Interests content | D3, D4 |
| [#15](https://github.com/eua-angkoon-n/build-ai-multi-agent-lab/issues/15) | [D5] Decide & scope Guestbook (moderation/rate-limit) before implementation | D5 |
| [#16](https://github.com/eua-angkoon-n/build-ai-multi-agent-lab/issues/16) | [D7] Confirm employer name usage before Lab 04 ships public copy | D7 |

ทั้ง 5 อันสร้างผ่าน GitHub MCP (`mcp__github__issue_write`) ทั้งหมด — ไม่ได้ใช้ `gh` สร้างอันไหนเลย (`gh` ใช้แค่เปรียบเทียบด้านล่าง)

## Lab 03 — MCP vs gh

- **ความเร็ว**: MCP เร็วกว่าในเซสชันเดียวกัน — สร้าง อ่านผล อัปเดต state (comment/close) ต่อเนื่องได้โดยไม่ต้องสลับหน้าต่าง/authenticate ใหม่ ส่วน `gh` ต้องเปิด terminal แยกและพิมพ์คำสั่งเอง แต่เร็วกว่าถ้าทำแค่ 1 คำสั่งเดียวแบบไม่ต้องผ่าน AI
- **สิทธิ์ (permissions)**: MCP ใช้ fine-grained PAT ที่ผูกกับ scope เฉพาะที่ตั้งไว้ (ตอนแรกไม่มี Issues: Read/write ทำให้ 403 จนกว่าจะแก้ — ดู L7 ที่ปิดแล้ว) ส่วน `gh auth login` ใช้ token คนละตัว (`scope: repo` แบบกว้างกว่า) ที่ auth แยกจาก MCP โดยสิ้นเชิง — สอง path นี้ debug แยกกันได้เมื่อฝั่งใดฝั่งหนึ่งพัง
- **Audit trail**: การเรียกผ่าน MCP ไม่ต่างจาก `gh` ในผลลัพธ์บน GitHub (commit/actor เดียวกันคือบัญชี `eua-angkoon-n`) — แต่ MCP ทำให้ Claude เป็นคน "ตัดสินใจ" เนื้อหา title/body/label เองในเซสชันเดียว ในขณะที่ `gh` บังคับให้มนุษย์ copy-paste คำสั่งเอง จึงมี checkpoint ให้ตรวจสอบก่อน publish อีกชั้นหนึ่งตามธรรมชาติ
- **ข้อผิดพลาดที่เจอ**: รอบแรก MCP `issue_write`/`add_issue_comment` โดน `403 Resource not accessible by personal access token` เพราะ PAT scope ไม่พอ (บันทึกไว้เป็น L7 ใน `docs/OPEN_LOOPS.md`) ต้องใช้ `gh issue close`/`gh issue comment` fallback ชั่วคราวสำหรับ issue #1–#2 ก่อนจะแก้ PAT scope ให้ MCP ใช้งานได้เต็มที่ในรอบนี้ (ปิด/comment issue #3 ผ่าน MCP สำเร็จ)
- **เมื่อไหร่ใช้อะไร**: ใช้ **MCP** เมื่อให้ Claude อ่าน `docs/DECISIONS.md` แล้วร่าง+สร้าง issue จากบริบทเดิมทันทีในเซสชันเดียว (งานที่ต้องแปลงเอกสารเป็น structured content) · ใช้ **`gh`** เมื่อมนุษย์อยากพิมพ์/ตรวจเองก่อน publish, ทำงาน scripted/CI, หรือกรณี MCP token ยังไม่พร้อม (fallback เสมอ)
