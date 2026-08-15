# Cuentas Públicas

Mobile-first app that teaches *Accounting for Governmental & Nonprofit Entities* (Reck, Lowensohn & Neely, 18e), one chapter at a time.

Single self-contained `index.html` — no build step, no dependencies, no network calls. Open it in a browser or serve the folder.

## Teaching model

Every chapter is anchored on a real end-of-chapter case or problem, then taught backwards:

1. **El Caso** — the anchor problem, stated up front as an unsolved case file.
2. **Ruta** — the case broken into mini-lectures, one per learning objective. Each ends in a check drawn from the chapter's own questions, with an explanation on every answer.
3. **Cierre** — the case again, with minimum guidance. This is the part that looks like the exam.
4. **Glosario** — the chapter's key terms, bilingual and searchable.

## Language

Spanish narration with the English technical term shown inline beside it, since the terminology is what gets tested:

> …la <b>rendición de cuentas</b> `accountability` es la piedra angular…

## Chapter 1 — Introduction to Accounting and Financial Reporting

Anchored on problems **1–17** (Examine the CAFR) and **1–18** (Compare gov vs NFP statements).

| Unit | LO | Topic |
|---|---|---|
| 1 | LO 1-1 | What distinguishes government and NFP entities |
| 2 | LO 1-2 | GASB / FASB / FASAB — who sets which standards |
| 3 | LO 1-3 | Accountability, interperiod equity, federal objectives |
| 4 | LO 1-4 | Minimum requirements vs. the CAFR; the dual-statement model |
| 5 | LO 1-5 | Federal reporting and the PAR |
| 6 | LO 1-6 | NFP statements, donor restrictions, functional expenses |

Capstone tasks: CAFR section sort (1–17), Denver vs. Promote Health comparison grid (1–18, 1–20), standard-setter matching (1–21), and six cross-LO questions (1–19).

Seven hand-authored inline SVG figures carry the processes and timelines: the resource-flow contrast, the standard-setter map, the interperiod-equity timeline, the CAFR nesting diagram, the dual-accountability split, the four PAR sections, and the NFP net-asset/expense split. All theme-aware via `currentColor`.

## Adding a chapter

Append to `UNITS` in `index.html` (one object per learning objective: `blocks`, `terms`, `quiz`), add any figures to `FIG`, extend `GLOSS`, and define the chapter's capstone tasks. Progress is kept in `localStorage` under `cp-ch1-v1`.

## Note on figures and data

Financial statements shown in the app are simplified and illustrative, not reproductions of Denver's CAFR or of any real organization's statements.
