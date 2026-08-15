import type { Chapter } from './types'
import type { Verdict } from '@/components/Tutor'

/* Everything the dashboard reads. Derived from the save on render —
   nothing here is stored twice. */

export type ChapterSave = {
  quiz: Record<string, Record<number, number>>
  cap: Record<number, unknown>
  solves: Record<string, Record<number, Verdict>>
}

export type ConceptStat = {
  chapterId: string
  chapterNum: number
  articleId: string
  roman: string
  concept: string
  steps: number
  solved: number
  got: number
  of: number
  /* null until at least one exercise is answered. */
  pct: number | null
  certified: boolean
}

export type Weak = {
  chapterId: string
  articleId: string
  roman: string
  concept: string
  step: number
  head: string
  got: number
  of: number
}

export type NextUp = {
  chapterId: string
  chapterNum: number
  articleId: string
  roman: string
  concept: string
  step: number
  head: string
  /* True when the remaining work is the article's questions, not a step. */
  isCheck: boolean
} | null

export function chapterStats(ch: Chapter, s: ChapterSave): ConceptStat[] {
  return ch.articles.map((a) => {
    const solves = s.solves[a.id] ?? {}
    const vals = Object.values(solves)
    const got = vals.reduce((x, v) => x + v.got, 0)
    const of = vals.reduce((x, v) => x + v.of, 0)
    return {
      chapterId: ch.id,
      chapterNum: ch.num,
      articleId: a.id,
      roman: a.roman,
      concept: a.concept,
      steps: a.steps.length,
      solved: vals.length,
      got,
      of,
      pct: of ? Math.round((got / of) * 100) : null,
      certified: a.quiz.every((_, i) => s.quiz[a.id]?.[i] != null),
    }
  })
}

/* Exercises the student got less than perfect, most-wrong first. */
export function weakSpots(ch: Chapter, s: ChapterSave): Weak[] {
  const out: Weak[] = []
  for (const a of ch.articles) {
    const solves = s.solves[a.id] ?? {}
    a.steps.forEach((st, i) => {
      const v = solves[i]
      if (v && v.got < v.of) {
        out.push({
          chapterId: ch.id,
          articleId: a.id,
          roman: a.roman,
          concept: a.concept,
          step: i,
          head: st.head,
          got: v.got,
          of: v.of,
        })
      }
    })
  }
  return out.sort((x, y) => x.got / x.of - y.got / y.of)
}

/* The single most useful button on the dashboard: where to resume. */
export function nextUp(chapters: Chapter[], saved: Record<string, ChapterSave>): NextUp {
  for (const ch of chapters) {
    const s = saved[ch.id]
    for (const a of ch.articles) {
      const solves = s?.solves[a.id] ?? {}
      const unsolved = a.steps.findIndex((_, i) => !solves[i])
      if (unsolved >= 0) {
        return {
          chapterId: ch.id, chapterNum: ch.num, articleId: a.id, roman: a.roman,
          concept: a.concept, step: unsolved, head: a.steps[unsolved].head, isCheck: false,
        }
      }
      const certified = a.quiz.every((_, i) => s?.quiz[a.id]?.[i] != null)
      if (!certified) {
        return {
          chapterId: ch.id, chapterNum: ch.num, articleId: a.id, roman: a.roman,
          concept: a.concept, step: a.steps.length, head: 'Comprobación', isCheck: true,
        }
      }
    }
  }
  return null
}

export type Totals = {
  solved: number
  steps: number
  got: number
  of: number
  mastery: number | null
  certified: number
  articles: number
}

export function totals(chapters: Chapter[], saved: Record<string, ChapterSave>): Totals {
  let solved = 0, steps = 0, got = 0, of = 0, certified = 0, articles = 0
  for (const ch of chapters) {
    const s = saved[ch.id]
    for (const a of ch.articles) {
      articles++
      steps += a.steps.length
      const solves = s?.solves[a.id] ?? {}
      const vals = Object.values(solves)
      solved += vals.length
      got += vals.reduce((x, v) => x + v.got, 0)
      of += vals.reduce((x, v) => x + v.of, 0)
      if (a.quiz.every((_, i) => s?.quiz[a.id]?.[i] != null)) certified++
    }
  }
  return { solved, steps, got, of, mastery: of ? Math.round((got / of) * 100) : null, certified, articles }
}
