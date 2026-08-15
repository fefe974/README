# Cuentas Públicas

Mobile-first bilingual course app for *Accounting for Governmental & Nonprofit Entities* (Reck, Lowensohn & Neely, 18e).

Built with **React 18 + TypeScript + Tailwind + Radix (shadcn pattern) + GSAP**, bundled by Vite into a single self-contained `dist/index.html` — no CDN, no external fonts, no network at runtime.

```bash
npm install
npm run build     # -> dist/index.html
npm run dev
```

## Teaching model

Every chapter is anchored on a real end-of-chapter case, then taught backwards:

1. **Caso** — the case stated up front, unsolved.
2. **Artículos** — one article per key concept, each a sequence of **steps (one idea per screen)**. Every step ends in an **exercise, not a passage**: a concrete case in the same fictional county, an illustration, and a decision the student must commit to. Only after they answer does the reasoning unlock, a step at a time. Then a check with terms and questions from the chapter's own end-of-chapter set. Completing one stamps it *certificado*.
3. **Cierre** — the case again, with minimum guidance.
4. **Glosario** — the chapter's terms, bilingual and searchable.

The app trains rather than narrates. Nothing explains itself until the student has taken a position, so the explanation lands on a prediction instead of a blank page. Before they answer, the illustration deliberately withholds its colour coding — otherwise the picture would give the answer away.

Three exercise kinds cover all 38 steps:

| Kind | The student… |
|---|---|
| `classify` | sorts each item into a category (fund types, fund balance classes, standard setters) |
| `yesno` | judges each statement (does it pass the 10 % hurdle? is it in the minimum?) |
| `choice` | picks one answer from four |

Each is a proper `radiogroup`, so keyboard and screen-reader users get the right semantics.

Verdicts persist per step and drive the **lesson map**: the rail at the top of each article turns green where the student was right and red where they weren't, and the check step lists every exercise with its score.

Length is a design constraint: no paragraph past ~40 words, and the reasoning stays behind a tap.

Illustrations are data-driven — four shapes (`ledger`, `flow`, `split`, `scale`) cover all 38, so they stay visually consistent and reflow on a phone instead of being 38 hand-drawn SVGs. A static check asserts every step has an exercise.

## Chapters

| # | Chapter | Anchor | Articles |
|---|---|---|---|
| 1 | Introduction to Accounting and Financial Reporting | Problems 1–17 / 1–18 | 4 |
| 2 | Principles of Accounting and Financial Reporting for State and Local Governments | Case 2–12 | 5 |

**Chapter 1** — governmental vs. commercial accounting; legal authority and public accountability; GASB vs. FASB jurisdiction; CAFR/ACFR structure. Teaches the GASB 98 (2021) CAFR→ACFR rename, which postdates the 18e.

**Chapter 2** — the GASB integrated reporting model; the three fund categories and eleven fund types; measurement focus and basis of accounting; the five fund balance classifications; major fund determination. The capstone audits a county MD&A against GASB standards (case 2–12) and runs the 10%/5% major-fund test on real numbers.

## Language

Spanish narration with the English term of art inline, since the terminology is what gets tested:

> …la <b>rendición de cuentas</b> `accountability` es la piedra angular…

## Design

Built with the `frontend-design` and `ui-ux-pro-max` skills in `.claude/skills/`.

- **Palette** — the materials of a certified public document: bond-paper ground, iron-gall ink, one accent (the blue of a certification stamp). Correct/incorrect are semantic, outside the accent.
- **Type** — EB Garamond (display), Atkinson Hyperlegible (body — a Braille Institute face for low vision, the accessibility thesis made material), IBM Plex Mono (citations and data).
- **Signature** — completing an article stamps it *certificado*, GSAP `back.out` ~420ms, skipped under `prefers-reduced-motion`.
- **Themes** — light and dark defined token-level, covering all three viewer states.

Thirteen hand-authored inline SVG figures carry the mechanisms.

## Structure

```
src/
  lib/types.ts         shared shapes: Article, Step, Task, Chapter
  lib/course.ts        the chapter registry
  lib/chapters/        ch1.ts, ch2.ts — all copy, questions, capstone data
                       ch1-examples.ts, ch2-examples.ts — one exercise per step
  lib/examples.ts      example registry, keyed `${articleId}-${stepIndex}`
  lib/figures/         kit.tsx (shared drawing kit), ch1.tsx, ch2.tsx, index.tsx
  components/ui/       shadcn-pattern primitives on Radix
  components/          Article, Tutor, Quiz, Capstone, Stamp
  styles/              tokens.css, fonts.css (base64 woff2, latin subset)
```

### Adding a chapter

Write `src/lib/chapters/chN.ts` exporting a `Chapter`, add its figures to `src/lib/figures/chN.tsx` and the figure registry, write one example per step in `chN-examples.ts`, then append it to `CHAPTERS` in `course.ts`. Nothing in the shell needs to change.

Capstone tasks are a discriminated union, so a chapter mixes kinds freely:

- `sort` — drop items into bins (ACFR sections, fund categories, fund balance classes)
- `grid` — a Y/N matrix across entity types
- `major` — the 10%/5% major-fund worksheet, with thresholds computed from the totals
- `quiz` — multiple choice with an explanation on every answer

Progress persists in `localStorage` under `cuentas-publicas`, keyed by chapter.
