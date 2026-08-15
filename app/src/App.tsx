import { useEffect, useMemo, useState } from 'react'
import { CHAPTERS } from '@/lib/course'
import type { Chapter } from '@/lib/types'
import { Article } from '@/components/Article'
import { Capstone, type CapState } from '@/components/Capstone'
import { Dashboard } from '@/components/Dashboard'
import type { Verdict } from '@/components/Tutor'
import { Stamp } from '@/components/Stamp'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

type Screen = 'course' | 'case' | 'articles' | 'close' | 'glossary'
type Solves = Record<string, Record<number, Verdict>>
type ChapterSave = { quiz: Record<string, Record<number, number>>; cap: CapState; solves: Solves }
type Saved = Record<string, ChapterSave>

const KEY = 'cuentas-publicas'
const blank = (): ChapterSave => ({ quiz: {}, cap: {}, solves: {} })

function load(): Saved {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Saved
      // Older saves predate the exercises; fill the field in.
      for (const k of Object.keys(parsed)) parsed[k] = { ...blank(), ...parsed[k] }
      return parsed
    }
  } catch {
    /* storage may be unavailable in a sandboxed frame */
  }
  return {}
}

/* How many of a chapter's articles are certified. */
function certifiedIn(ch: Chapter, save: ChapterSave) {
  return ch.articles.filter((a) => a.quiz.every((_, i) => save.quiz[a.id]?.[i] != null)).length
}
function capDoneIn(ch: Chapter, save: ChapterSave) {
  return ch.tasks.every((t, i) => {
    const st = save.cap[i] ?? {}
    if (t.kind === 'sort') return Object.keys(st.sort ?? {}).length === t.items.length
    if (t.kind === 'grid') return !!st.checked
    if (t.kind === 'major') return !!st.checked
    return t.questions.every((_, qi) => (st.quiz ?? {})[qi] != null)
  })
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('course')
  const [chId, setChId] = useState<string>(CHAPTERS[0].id)
  const [open, setOpen] = useState<string | null>(null)
  const [jump, setJump] = useState<number | undefined>(undefined)
  const [saved, setSaved] = useState<Saved>(load)
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null)
  const [q, setQ] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(saved))
    } catch {
      /* ignore */
    }
  }, [saved])

  useEffect(() => {
    if (theme) document.documentElement.setAttribute('data-theme', theme)
    else document.documentElement.removeAttribute('data-theme')
  }, [theme])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [screen, open, chId])

  const chapter = CHAPTERS.find((c) => c.id === chId)!
  const save = saved[chId] ?? blank()

  const certified = useMemo(
    () => chapter.articles.filter((a) => a.quiz.every((_, i) => save.quiz[a.id]?.[i] != null)),
    [chapter, save.quiz],
  )
  const doneCount = certified.length
  const capDone = capDoneIn(chapter, save)
  const steps = chapter.articles.length + 1
  const overall = Math.round(((doneCount + (capDone ? 1 : 0)) / steps) * 100)

  const patch = (fn: (s: ChapterSave) => ChapterSave) =>
    setSaved((s) => ({ ...s, [chId]: fn(s[chId] ?? blank()) }))

  const answer = (aid: string, qi: number, oi: number) =>
    patch((s) => ({ ...s, quiz: { ...s.quiz, [aid]: { ...(s.quiz[aid] ?? {}), [qi]: oi } } }))

  const article = chapter.articles.find((a) => a.id === open) ?? null
  const idx = article ? chapter.articles.indexOf(article) : -1

  const gloss = chapter.glossary.filter(
    (g) => !q.trim() || (g[0] + ' ' + g[1] + ' ' + g[2]).toLowerCase().includes(q.trim().toLowerCase()),
  )

  const go = (s: Screen) => {
    setOpen(null)
    setJump(undefined)
    setScreen(s)
  }
  /* Straight from the dashboard to one exercise. */
  const resume = (cid: string, aid: string, step: number) => {
    setChId(cid)
    setOpen(aid)
    setJump(step)
    setScreen('articles')
  }
  const openChapter = (id: string) => {
    setChId(id)
    setOpen(null)
    setScreen('case')
  }

  return (
    <div className="mx-auto min-h-screen max-w-[680px] px-5 pb-[calc(92px+env(safe-area-inset-bottom))]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-seal focus:px-4 focus:py-2 focus:text-sheet"
      >
        Saltar al contenido
      </a>

      <header className="sticky top-0 z-30 -mx-5 mb-6 flex items-center gap-3 border-b border-rule bg-ground/90 px-5 pb-2.5 pt-[calc(10px+env(safe-area-inset-top))] backdrop-blur">
        <button
          onClick={() => go('course')}
          className="grid h-9 w-9 flex-none place-items-center rounded-full border-[1.5px] border-seal font-display text-[15px] font-semibold text-seal"
          aria-label="Ir a la lista de capítulos"
        >
          CP
        </button>
        <div className="min-w-0">
          <b className="block font-display text-[15px] leading-tight">Cuentas Públicas</b>
          <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
            {screen === 'course' ? 'Panel' : `Capítulo ${chapter.num}`}
          </span>
        </div>
        <button
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : t === 'light' ? null : 'dark'))}
          className="ml-auto rounded-lg border border-rule bg-sheet px-2.5 py-2 text-[13px] text-muted"
          aria-label={`Tema: ${theme ?? 'del sistema'}. Cambiar.`}
        >
          {theme === 'dark' ? '☾' : theme === 'light' ? '☀' : '◐'}
        </button>
      </header>

      <main id="main">
        {/* ----------------------------------------------- el panel */}
        {screen === 'course' && (
          <>
            <Dashboard
              chapters={CHAPTERS}
              saved={saved}
              onOpenChapter={openChapter}
              onResume={resume}
            />
            <p className="mx-auto mt-7 max-w-read text-center text-[12.5px] leading-relaxed text-muted">
              Basado en Reck, Lowensohn y Neely, <em>Accounting for Governmental &amp; Nonprofit Entities</em>, 18.ª ed.
              Las cifras de los estados son ilustrativas.
            </p>
            <button
              onClick={() => { setSaved({}); setQ('') }}
              className="mt-4 w-full rounded-xl border border-rule2 bg-sheet px-4 py-3 text-[15px] font-bold"
            >
              Reiniciar todo el progreso
            </button>
          </>
        )}

        {/* ------------------------------------------------ el caso */}
        {screen === 'case' && (
          <div>
            <div className="overflow-hidden rounded-xl border border-rule bg-sheet shadow-[var(--shadow)]">
              <div className="bg-seal px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-sheet">
                {chapter.caseTab}
              </div>
              <div className="p-5">
                <h1 className="text-balance font-display text-[31px] leading-[1.08] tracking-tight">
                  {chapter.caseTitle}
                </h1>
                {chapter.caseLede.map((t, i) => (
                  <p
                    key={i}
                    className={cn('text-[16.5px] leading-relaxed text-ink2', i === 0 ? 'mt-3.5' : 'mt-3')}
                    dangerouslySetInnerHTML={{ __html: t }}
                  />
                ))}
              </div>
              <ol className="border-t border-rule">
                {chapter.articles.map((a, i) => (
                  <li key={a.id} className={cn('flex items-baseline gap-3 px-5 py-3', i && 'border-t border-rule')}>
                    <span className="w-6 flex-none font-display text-[17px] leading-none text-seal">{a.roman}</span>
                    <span className="text-[15px] leading-snug text-ink2">{a.concept}</span>
                  </li>
                ))}
              </ol>
            </div>

            <Card className="mt-4">
              <CardContent className="p-4">
                <div className="mb-2 flex items-baseline justify-between text-[13px] text-muted">
                  <span>Avance del capítulo</span>
                  <span className="font-mono text-ink">{doneCount + (capDone ? 1 : 0)} / {steps}</span>
                </div>
                <Progress value={overall} />
              </CardContent>
            </Card>

            <button
              onClick={() => go('articles')}
              className="mt-4 w-full rounded-xl bg-seal px-4 py-3.5 text-[15.5px] font-bold text-sheet shadow-[var(--shadow-sm)]"
            >
              {doneCount ? 'Continuar' : 'Abrir el artículo I'}
            </button>
          </div>
        )}

        {/* -------------------------------------------- los artículos */}
        {screen === 'articles' && !article && (
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-muted">Capítulo {chapter.num}</p>
            <h2 className="mt-1.5 font-display text-[26px] leading-tight">
              Los {chapter.articles.length} artículos
            </h2>
            <p className="mb-6 mt-2 text-[15px] leading-relaxed text-muted">
              Van en orden: cada uno usa el anterior. Al responder sus preguntas, el artículo queda certificado.
            </p>
            <div className="flex flex-col gap-2.5">
              {chapter.articles.map((a) => {
                const done = certified.includes(a)
                return (
                  <button
                    key={a.id}
                    onClick={() => { setOpen(a.id); setJump(undefined) }}
                    className={cn(
                      'flex w-full items-center gap-3.5 rounded-xl border bg-sheet px-4 py-3.5 text-left shadow-[var(--shadow-sm)]',
                      done ? 'border-seal' : 'border-rule',
                    )}
                  >
                    <span
                      className={cn(
                        'grid h-9 w-9 flex-none place-items-center rounded-lg font-display text-[17px]',
                        done ? 'bg-sealsoft text-seal' : 'bg-sunk text-muted',
                      )}
                    >
                      {a.roman}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[16.5px] leading-tight">{a.concept}</span>
                      <span className="mt-0.5 block font-mono text-[10.5px] tracking-wide text-muted">
                        {a.steps.length} pasos · {Object.keys(save.solves[a.id] ?? {}).length}/{a.steps.length} resueltos
                      </span>
                    </span>
                    {done ? <Stamp roman={a.roman} size="sm" /> : <span className="text-[19px] text-rule2">›</span>}
                  </button>
                )
              })}
            </div>

            <hr className="my-8 border-rule" />
            <Card>
              <CardContent className="p-4">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-muted">
                  Al certificar los {chapter.articles.length}
                </p>
                <h3 className="mt-1.5 font-display text-[18px] leading-tight">Se abre el cierre del caso</h3>
                <p className="mt-1.5 text-[14px] leading-snug text-muted">
                  {chapter.tasks.length} tareas con guía mínima. Es la parte que se parece al examen.
                </p>
                <button
                  onClick={() => go('close')}
                  className="mt-3.5 w-full rounded-xl border border-rule2 bg-sheet px-4 py-3 text-[15px] font-bold"
                >
                  Ir al cierre
                </button>
              </CardContent>
            </Card>
          </div>
        )}

        {screen === 'articles' && article && (
          <Article
            article={article}
            index={idx}
            total={chapter.articles.length}
            answers={save.quiz[article.id] ?? {}}
            onAnswer={(qi, oi) => answer(article.id, qi, oi)}
            solves={save.solves[article.id] ?? {}}
            onSolve={(st, v) =>
              patch((s) => ({
                ...s,
                solves: { ...s.solves, [article.id]: { ...(s.solves[article.id] ?? {}), [st]: v } },
              }))
            }
            initialStep={jump}
            onBack={() => { setOpen(null); setJump(undefined) }}
            onNext={
              idx < chapter.articles.length - 1
                ? () => { setOpen(chapter.articles[idx + 1].id); setJump(undefined) }
                : null
            }
          />
        )}

        {/* ------------------------------------------------- cierre */}
        {screen === 'close' && (
          <Capstone
            chapter={chapter}
            state={save.cap}
            set={(fn) => patch((s) => ({ ...s, cap: fn(s.cap) }))}
            locked={doneCount < chapter.articles.length}
            doneCount={doneCount}
            onGoArticles={() => go('articles')}
          />
        )}

        {/* ----------------------------------------------- glosario */}
        {screen === 'glossary' && (
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-muted">
              Referencia · capítulo {chapter.num}
            </p>
            <h2 className="mt-1.5 font-display text-[26px] leading-tight">Glosario bilingüe</h2>
            <p className="mb-5 mt-2 text-[15px] leading-relaxed text-muted">
              Los términos de este capítulo, en inglés y en español.
            </p>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar: accrual, fondo, mayor…"
              aria-label="Buscar en el glosario"
              className="w-full rounded-xl border border-rule bg-sheet px-4 py-3 text-[15.5px] text-ink placeholder:text-muted"
            />
            <dl className="mt-4">
              {gloss.map((g) => (
                <div key={g[0]} className="border-b border-rule py-3.5">
                  <dt className="font-mono text-[14px] tracking-tight text-seal">{g[0]}</dt>
                  <p className="mt-0.5 font-display text-[16px] leading-tight">{g[1]}</p>
                  <dd className="mt-1 text-[14.5px] leading-relaxed text-ink2">{g[2]}</dd>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">Artículo {g[3]}</p>
                </div>
              ))}
              {gloss.length === 0 && <p className="py-6 text-[15px] text-muted">Sin coincidencias para «{q}».</p>}
            </dl>
          </div>
        )}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-ground/95 pb-[calc(7px+env(safe-area-inset-bottom))] pt-2 backdrop-blur">
        <div className="mx-auto grid max-w-[680px] grid-cols-5">
          {([
            ['course', 'Panel', '◱'],
            ['case', 'Caso', '❑'],
            ['articles', 'Artículos', '§'],
            ['close', 'Cierre', '✦'],
            ['glossary', 'Glosario', '≡'],
          ] as [Screen, string, string][]).map(([s, label, icon]) => (
            <button
              key={s}
              onClick={() => go(s)}
              aria-current={screen === s}
              className={cn(
                'flex min-h-[44px] flex-col items-center gap-0.5 px-1 py-1.5',
                screen === s ? 'text-seal' : 'text-muted',
              )}
            >
              <span className="text-[18px] leading-none">{icon}</span>
              <small className="font-mono text-[9px] uppercase tracking-wider">{label}</small>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
