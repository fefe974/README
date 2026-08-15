# Cuentas Públicas — Capítulo 1

Mobile-first bilingual course app for chapter 1 of *Accounting for Governmental & Nonprofit Entities* (Reck, Lowensohn & Neely, 18e).

Built with **React 18 + TypeScript + Tailwind + Radix (shadcn pattern) + GSAP**, bundled by Vite into a single self-contained `dist/index.html` — no CDN, no external fonts, no network at runtime.

```bash
npm install
npm run build     # -> dist/index.html
npm run dev       # local dev server
```

## Scope

Four key concepts, taught as four articles in dependency order:

| Article | Concept |
|---|---|
| I | Distinctions between governmental and commercial accounting |
| II | Legal authority and public accountability |
| III | GASB vs. FASB jurisdiction |
| IV | Basic CAFR / ACFR structure |

Each article runs as **steps — one idea per screen** — then a check: terms plus questions drawn from the chapter's own end-of-chapter set, with an explanation on every answer. Completing one stamps it certified. Reopening a certified article lands on its check rather than back at step 1.

All four unlock the capstone: problems 1–17, 1–18, 1–21 and a cross-article question set, with minimum guidance.

Length is a design constraint, not an accident: no paragraph runs past ~40 words and no screen past ~110, so an article is roughly 1.4 phone screens instead of 5.5.

Note on currency: the 18e says **CAFR**; GASB Statement No. 98 (2021) renamed it **ACFR**. The app teaches both and explains the rename, since students will meet both terms depending on the age of the source.

## Design

Built with the `frontend-design` and `ui-ux-pro-max` skills in `.claude/skills/`.

- **Palette** — the materials of a certified public document: bond-paper ground, iron-gall ink, and one accent, the blue of a certification stamp. Correct/incorrect are semantic and sit outside the accent.
- **Type** — EB Garamond for display (the register of statute), Atkinson Hyperlegible for body (a Braille Institute face for low vision — the chapter's accessibility thesis made material), IBM Plex Mono for citations and data.
- **Signature** — completing an article stamps it *certificado*, animated with GSAP (`back.out`, ~420ms, skipped under `prefers-reduced-motion`).
- **Themes** — light and dark defined token-level in `src/styles/tokens.css`, covering all three viewer states (explicit light, explicit dark, unstamped system default).

Seven hand-authored inline SVG figures carry the mechanisms: the resource-flow contrast, the missing net-income figure, the layers of legal authority, fiscal vs. operational accountability, the jurisdiction map, ACFR anatomy, and the dual-statement split.

## Structure

```
src/
  lib/content.ts     all chapter copy, questions and capstone data
  lib/figures.tsx    the seven SVG figures
  components/ui/     shadcn-pattern primitives on Radix
  components/        Article, Quiz, Capstone, Stamp
  styles/            tokens.css, fonts.css (base64 woff2, latin subset)
```

To add a chapter, extend `ARTICLES` in `content.ts`, add figures to `figures.tsx`, and define the capstone tasks. Progress persists in `localStorage` under `cuentas-publicas-ch1`.
