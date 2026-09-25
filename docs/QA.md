# QA — Personal Site

> Lab 06

## E2E Playwright

Dev server: `npm run dev` on `http://localhost:4321` (per `.env` PORT=4321). Tested with Playwright MCP (`@playwright/mcp@0.0.82`).

| Step | Result |
|------|--------|
| Home (`/`) — headline/name from PROFILE, nav has all 5 links | Pass — "Tae", headline "โปรแกรมเมอร์ที่กำลังลงมือปรับใช้ AI agents กับงานจริง" render correctly; nav includes Home/About/Interests/Contact/Guestbook |
| About (`/about`) — no 404, Bio content | Pass — full 2-paragraph Bio from PROFILE.md renders (confirms the profile.ts multi-line parsing fix from PR #17's review holds), plus the problem-first framing paragraph from Lab 04 |
| Interests (`/interests`) — no 404, all 3 items with descriptions | Pass — all 3 interests (AI Agentic, Web Development, Data Analysis) render with their full descriptions |
| Contact (`/contact`) — no 404, mailto + GitHub links per D2 | Pass — `mailto:euaangkoon.n@gmail.com` link and GitHub link both present, no form (matches D2) |
| Guestbook (`/guestbook`) — submit demo entry | Pass — filled Name="QA Demo", Message="Lab 06 Playwright E2E demo entry", clicked Sign → status "Signed. Thank you!", entry appeared in the list immediately (real SQLite persistence via Lab 05 backend), no console errors |
| Guestbook — server-side validation error surfaces (regression check for L12 fix) | Pass — submitted a 501-character message (bypassing the client `maxlength` via DOM to reach the server check) → status correctly showed "Error: message must be 500 characters or fewer" instead of silently succeeding; invalid entry was **not** added to the list. Confirms the PR #20 fix (`res.ok` check before `form.reset()`) works end-to-end against the real Lab 05 backend |

Screenshots (`docs/screenshots/`):
1. `01-home.png` — Home page, full page
2. `02-contact.png` — Contact page, full page
3. `03-guestbook-submit.png` — Guestbook after a successful demo submission
4. `04-guestbook-validation-error.png` — Guestbook showing a surfaced validation error (bonus evidence beyond the ≥2 required)

No console errors or warnings observed during the successful-path testing; the one console error logged (`400` on the intentionally-invalid POST) is expected — it's the browser's own network-log entry for the request the validation test deliberately sent.

## a11y Debate

Based on the actual rendered pages above plus a direct read of `src/layouts/BaseLayout.astro`, `src/pages/guestbook.astro`, and computed WCAG contrast ratios for the earth-tone palette (not assumptions).

### Advocate

- **Contrast is actually fine** — checked the numbers rather than assuming: `--muted` (#6b5c4d) on `--bg` (#f6f1e7) = 5.72:1, `--accent` (#9c4221) on `--bg` = 5.80:1, main text = 11.09:1. All comfortably pass WCAG AA (4.5:1) for normal text. No violation here despite the earth-tone repaint — good, but worth stating explicitly so it isn't re-litigated later.
- **No skip-to-content link.** Every page repeats the same 5-link nav before `<main>`. A keyboard or screen-reader user has to tab through it on every single page load — small site, but still a real, common WCAG 2.4.1 (Bypass Blocks) gap.
- **Guestbook entries aren't a semantic list.** `renderEntries()` in `guestbook.astro` appends bare `<p>` elements into `#entries`. Screen readers won't announce "list of N items" or let a user jump entry-to-entry — should be `<ul>`/`<li>`.
- **Focus is not customized** — not removed either (`outline` is never reset anywhere in `BaseLayout.astro`), so the browser default focus ring still works. On the light earth-tone background it should still be visible, but a theme-matched `:focus-visible` style would be more robust and confidence-inspiring than relying on browser defaults.
- Labels (`for`/`id` on the guestbook form), `aria-live="polite"` on the status region, `lang="th"`, and heading order (single `h1` per page, no skipped levels) are all already correct — no action needed there.

### Pragmatist

- None of these are ship-blockers. The site is fully keyboard-operable, labels are correctly wired, contrast passes AA, and there's no broken or inaccessible interactive element. This is a 5-page personal site, not a public form-heavy application — the bar is "usable and honest," not a full WCAG AAA audit.
- Skip-link and semantic list are both genuinely quick (≤15 min each) and have real payoff for screen-reader users specifically — worth doing now since they're cheap, not because anything is broken.
- Custom `:focus-visible` styling is pure polish — defer it. The default outline already works; don't spend time re-skinning it before there's evidence real users need it.
- Agreed frame: fix the two P1 items now (cheap, real value), defer the P2 polish item, and treat this as done for Lab 06 — no P0 exists to justify blocking anything.

## a11y Action items

- **P1** — Add a "skip to main content" link (visually hidden until focused) at the top of `src/layouts/BaseLayout.astro`, before the `<nav>`, targeting `<main>`. ~10–15 min.
- **P1** — Change `renderEntries()` in `src/pages/guestbook.astro` to build a `<ul>`/`<li>` structure instead of bare `<p>` elements, so screen readers announce entry count/position. ~10 min.
- **P2** — Add a theme-matched `:focus-visible` outline style in `BaseLayout.astro`'s global CSS (e.g. using `--accent`) instead of relying solely on the browser default. Not urgent — current default focus is present and functional.
- **P2** — Reconsider the Home page's card pattern (`<a><h2>...</h2><p>...</p></a>`) — functions correctly in major screen readers today, but wrapping a heading inside a link is worth a second look if the IA grows beyond 4 cards.

**Status:** Both P1 items applied (confirmed by the human before editing, per this lab's own rule) — `src/layouts/BaseLayout.astro` now has a skip-link + `#main-content` target, and `src/pages/guestbook.astro` renders entries as `<ul>`/`<li>`. Verified in-browser via Playwright MCP snapshot (list/listitem roles present, skip-link focusable) — see `docs/screenshots/05-a11y-fixes.png`. `npm test` and `npm run build` both green after the change. The two P2 items remain deferred, as agreed by the Pragmatist above.
