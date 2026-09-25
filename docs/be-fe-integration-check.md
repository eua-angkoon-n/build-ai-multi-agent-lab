# BE→FE Integration Check — Lab 05

> ตรวจโดย Claude (frontend) หลัง OpenCode implement `src/lib/db.ts` + `src/pages/api/*.ts` จริงแล้ว (แทนที่ stub) — เทียบกับฟอร์ม/fetch ที่มีอยู่ใน `src/pages/*.astro`

## Match

- **Guestbook GET** (`src/pages/guestbook.astro` → `fetch('/api/guestbook')`) คาดหวัง `{entries: [...]}` — ตรงกับ implementation จริงเป๊ะ (`listGuestbook()` คืน array, route wrap เป็น `{entries: rows}`)
- **Guestbook POST** ส่ง JSON `{name, message}` — ตรงกับ `insertGuestbook({name, message})` ที่ implement แล้ว · error shape `{error: "..."}` ตรงกับที่ฟอร์มอ่าน (`data.error || res.status`)
- **Contact** — ไม่มีฟอร์มแล้วตาม D2 (mailto + GitHub link เท่านั้น) จึงไม่มี fetch ให้ตรวจ · `POST /api/contact` ยังทำงานถูกต้องถ้ามีคนยิงตรง (ยืนยันด้วย curl manual test) แต่เป็น orphan endpoint จริงตามที่ `docs/fe-be-contract-check.md`/L11 ระบุไว้แล้ว — ไม่ใช่เรื่องใหม่

## Mismatch / ช่องว่างที่ยังไม่ปิด (ทราบอยู่แล้ว ไม่ใช่การค้นพบใหม่)

- **L12 (ยังไม่แก้ในรอบนี้ — ตั้งใจ, owner = Claude/frontend):** ฟอร์ม guestbook ไม่เช็ค `res.ok` ก่อน `form.reset()` → POST ที่ตอบ 400 (validation error จริงจาก backend ใหม่ เช่น message ยาวเกิน 500) จะดูเหมือนสำเร็จในสายตาผู้ใช้ทั้งที่ backend ปฏิเสธไปแล้ว
- **L12 (เดียวกัน):** `entries.innerHTML` แทรก `e.name`/`e.message` แบบไม่ escape — ตอนนี้ backend persist ข้อมูลจริงแล้ว (ก่อนหน้านี้ยังไม่มีความเสี่ยงเพราะ list เป็น throw) ช่องโหว่ stored XSS จึง **live แล้วจริง ๆ** ตั้งแต่ PR นี้ merge — ยืนยันช่องโหว่จริงด้วยการทดสอบ manual (POST ชื่อ `<b>test</b>` แล้วดู response — backend เก็บ raw string ตามที่ควร ฝั่ง client ต้องเป็นคน escape ตอน render)

## สรุป

Contract ตรงกันหมด (ไม่มี mismatch เชิง API shape/method/field) — ช่องว่างที่เหลือทั้งหมดเป็น **ฝั่ง UI** (L12) ที่รู้อยู่แล้วตั้งแต่ `docs/fe-be-contract-check.md` และมอบหมายให้ Claude/frontend แล้วใน `docs/OPEN_LOOPS.md` — ไม่ต้องแก้อะไรฝั่ง backend เพิ่มก่อน merge PR นี้ แต่ **L12 ควรทำก่อน deploy จริง** เพราะ XSS live แล้ว
