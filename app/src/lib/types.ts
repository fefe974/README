/* Shared shapes for every chapter of the course. A chapter is a set of
   articles (each a sequence of one-idea steps), a capstone made of
   tasks, and a glossary. */

export type Block =
  | { k: 'p'; t: string }
  | { k: 'fig'; id: string; cap: string }
  | { k: 'note'; head: string; t: string; tone?: 'seal' | 'warn' }

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
}
