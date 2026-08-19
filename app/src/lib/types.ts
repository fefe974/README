/* Shared shapes for every chapter of the course. A chapter is a set of
   articles (each a sequence of one-idea steps), a capstone made of
   tasks, and a glossary. */

export type Block =
  | { k: 'p'; t: string }
  | { k: 'fig'; id: string; cap: string }
  | { k: 'note'; head: string; t: string; tone?: 'seal' | 'warn' }
  /* Drops an interactive simulator into a step. `id` keys SIMS. */
  | { k: 'sim'; id: string }

export type Tone = 'plain' | 'seal' | 'ok' | 'no'

/* Illustrations for worked examples are data-driven: four shapes cover
   every example in the course, so they stay visually consistent and
   reflow on a phone instead of being 38 hand-drawn SVGs. */
export type Viz =
  | { v: 'ledger'; cols: string[]; rows: { cells: string[]; tone?: Tone; note?: string }[] }
  | { v: 'flow'; nodes: { label: string; sub?: string; tone?: Tone }[] }
  | { v: 'split'; whole: { label: string; amount: string }; parts: { label: string; amount: string; tone?: Tone }[] }
  | { v: 'scale'; label: string; value: string; marks: { label: string; value: string; pass: boolean }[] }

/* The decision the student makes before being told anything. The app
   teaches by asking first: the reasoning only unlocks once they have
   committed to an answer. */
export type Probe =
  | { p: 'classify'; ask: string; options: string[]; items: { label: string; answer: number }[] }
  | { p: 'choice'; ask: string; options: string[]; answer: number }
  | { p: 'yesno'; ask: string; yes: string; no: string; items: { label: string; answer: boolean }[] }

/* One worked example per step: a concrete case, an illustration, a
   decision to make, and the reasoning revealed a step at a time. */
export type Example = {
  title: string
  setup: string
  viz: Viz
  probe: Probe
  steps: string[]
  answer: string
}

export type Step = { head: string; blocks: Block[] }

export type Question = {
  q: string
  src: string
  o: string[]
  a: number
  w: string
}

export type Article = {
  id: string
  roman: string
  concept: string
  title: string
  en: string
  standfirst: string
  steps: Step[]
  terms: [string, string][]
  quiz: Question[]
}

/* ---------------------------------------------------------------
   Journal entries. One shape serves the simulator, the guided
   problem and the cheat sheet, so an entry written once reads the
   same everywhere in the app.
   --------------------------------------------------------------- */

/* 'D' debit / 'H' credit — debe y haber. */
/* `account` is the ledger name as it appears in a chart of accounts —
   English, because that is what the county's system says. `gloss` is
   the Spanish reading, shown where the term is still new. */
export type Posting = { account: string; side: 'D' | 'H'; amount: number; gloss?: string }

/* One line of the chapter's journal-entry reference. */
export type EntryRef = {
  id: string
  group: string
  when: string
  lines: Posting[]
  note: string
  /* Budgetary entries never touch the actual accounts; the sheet
     marks them so the two systems stay visibly separate. */
  budgetary?: boolean
}

export type Bin = { code: string; label: string; eyebrow: string }

/* One row of a major-fund worksheet. `major` is the answer. */
export type FundRow = {
  name: string
  assets: number
  liabilities: number
  revenues: number
  expenditures: number
  major: boolean
  why: string
}

export type Task =
  | {
      kind: 'sort'
      title: string
      src: string
      hint: string
      bins: Bin[]
      /* [label, index into bins] */
      items: [string, number][]
      note: string
    }
  | {
      kind: 'grid'
      title: string
      src: string
      hint: string
      cols: string[]
      rows: [string, ('Y' | 'N')[]][]
      note: string
    }
  | { kind: 'quiz'; title: string; src: string; hint: string; questions: Question[] }
  | {
      /* The comprehensive operating problem, one entry at a time.
         Each entry offers whole candidate journal entries rather than
         blank lines: the exam-relevant skill is telling a correct
         entry from the classic wrong one, not typing account names. */
      kind: 'entries'
      title: string
      src: string
      hint: string
      fund: string
      facts: [string, string][]
      entries: {
        ref: string
        narrative: string
        options: Posting[][]
        answer: number
        why: string
        trap: string
      }[]
      note: string
    }
  | {
      kind: 'major'
      title: string
      src: string
      hint: string
      funds: FundRow[]
      /* Totals used for the 10% and 5% thresholds. */
      totalCategory: { assets: number; liabilities: number; revenues: number; expenditures: number }
      totalCombined: { assets: number; liabilities: number; revenues: number; expenditures: number }
      note: string
    }

export type Chapter = {
  id: string
  num: number
  /* Short name for the chapter list. */
  name: string
  en: string
  /* The end-of-chapter case the whole chapter is built on. */
  caseTab: string
  caseTitle: string
  caseLede: string[]
  articles: Article[]
  capstoneLede: string
  tasks: Task[]
  closing: string
  glossary: [string, string, string, string][]
  /* The chapter's journal-entry cheat sheet, if it has one. */
  entries?: EntryRef[]
}
