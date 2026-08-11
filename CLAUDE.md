# Accountant I Training App — project guide

This repo hosts the **Accountant I training program** for a county finance department:
an application-first, textbook-driven, mobile-delivered, agent-coached curriculum.
Key documents:

- `docs/accountant-i-curriculum.pdf` (+ extracted `docs/accountant-i-curriculum.txt`) — the build document. Unit IDs: `W3.L2` = Week 3 Lesson 2; formats L/P/C/V/D/M; ★ graded milestone; ⚑ currency patch.
- `docs/coach-agent-behavior-spec.md` — Coach agent spec (state machine, hint ladder, error taxonomy).
- `.claude/skills/application-first-curriculum/` — the methodology skill and its references (rubric, agent roster, mobile delivery, textbook mining).

## Design skills — use for ALL UI work in this repo

Always apply these vendored project skills when designing or reviewing any screen:

- `ui-ux-pro-max` — query its local database (`python3 .claude/skills/ui-ux-pro-max/scripts/search.py`) for style/palette/typography/UX decisions before styling.
- `minimalist-ui` — clean editorial minimalism: warm monochrome, typographic contrast, flat surfaces, no gradients or heavy shadows.
- `impeccable` — design vocabulary and references (typography, color, motion, spatial, interaction, responsive, UX writing); use to polish/audit/critique.
- `mobile-app-ui-design` — mobile-first patterns (navigation, thumb zones, touch targets, motion).
- `web-design-guidelines` — Vercel Web Interface Guidelines compliance review before shipping any UI change.

## App conventions

- Delivery is **mobile-first, offline-first, single-file HTML** per app module (see `portfolio-lab/index.html` for the established pattern): inline CSS/JS, no external requests, localStorage persistence, safe-area insets, bottom thumb-zone primary actions, ≥48px touch targets, no horizontal-scroll tables (stack as cards), numeric keypad + format masks on quantity fields, screens ≤ ~1.5 viewports.
- Training app modules live in `accountant-i/`.
- Deterministic checks before AI: graders/validators are rule-based wherever a rule is correct (JE balance checks, acceptance gates). Facts live in versioned tables, never hardcoded in prose.
- Learner-facing tone (from the Coach spec): direct, adult-to-adult, no praise inflation, no emoji, ≤1 exclamation point per session.

## Lessons must be illustrated

Every lesson (format `L`) carries at least one **inline SVG diagram** that does explanatory work. This is a requirement, not a garnish — governmental accounting's hard concepts are structural (two parallel sets of books, resources fenced into pools, a 60-day window straddling year end), and prose alone makes learners assemble the picture in their heads.

- **Draw the mechanism, not its name.** A box labeled "fund" teaches nothing; five walled pools that money cannot move between teaches the concept. Comparing two things (fund vs. government-wide, accrual vs. modified accrual) means drawing the *difference*, side by side.
- **Inline SVG only.** No external images, no icon fonts, no emoji — offline-first forbids network requests, and raster data URIs bloat the file. Hand-author `<svg>` with native shapes; theme via the palette CSS variables so diagrams match the app.
- **One figure, one claim.** Wrap in `<figure>` + `<figcaption>` stating what the picture shows; give the `<svg>` `role="img"` and an `aria-label` carrying the same claim. Labels ~11–13px, arrows labeled with verbs (`transfers to`, `not available within 60 days`).
- Diagrams live in a shared `FIG` map per module so the same concept is drawn the same way every time it recurs across 16 weeks.
