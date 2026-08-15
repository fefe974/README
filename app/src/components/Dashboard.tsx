import type { Chapter } from '@/lib/types'
import {
  chapterStats, nextUp, totals, weakSpots,
  type ChapterSave, type ConceptStat, type Weak,
} from '@/lib/progress'
import { Progress } from './ui/progress'
import { cn } from '@/lib/utils'

/* A dashboard is scanned, not read: the summary comes before the
   detail, and anything needing attention reads at a glance. Status is
   never colour alone — every good/bad signal carries a glyph and a
   word, because the correct/incorrect pair sits at ΔE 5.9 under
   deuteranopia. */

export function Dashboard({
  chapters,
  saved,
  onOpenChapter,
  onResume,
}: {
  chapters: Chapter[]
  saved: Record<string, ChapterSave>
  onOpenChapter: (chapterId: string) => void
  onResume: (chapterId: string, articleId: string, step: number) => void
}) {
  const t = totals(chapters, saved)
  const next = nextUp(chapters, saved)
  /* Only concepts with at least one answer: a wall of "sin datos" rows
     is inventory, not information. */
  const byChapter = chapters
    .map((c) => ({ ch: c, rows: chapterStats(c, saved[c.id] ?? empty()).filter((x) => x.pct !== null) }))
    .filter((g) => g.rows.length > 0)
  const untouched =
    chapters.reduce((a, c) => a + c.articles.length, 0) -
    byChapter.reduce((a, g) => a + g.rows.length, 0)
  const weak = chapters.flatMap((c) => weakSpots(c, saved[c.id] ?? empty())).slice(0, 5)
  const started = t.solved > 0

  return (
    <div className="flex flex-col gap-5">
      <header>
        <p className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-muted">
          Contabilidad gubernamental y NFP
        </p>
        <h1 className="mt-1 font-display text-[27px] leading-tight tracking-tight">Tu panel</h1>
      </header>

      {/* ---------------- hero + the one action that matters ---------------- */}
      <section className="overflow-hidden rounded-xl border border-rule bg-sheet shadow-[var(--shadow)]">
        <div className="flex items-end gap-4 p-5 pb-4">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">
              {started ? 'Dominio' : 'Aún sin empezar'}
            </p>
            {started ? (
              <>
                <p className="font-display text-[52px] leading-none tracking-tight text-seal">{t.mastery}%</p>
                <p className="mt-1.5 text-[13.5px] leading-snug text-muted">
                  {t.got} de {t.of} decisiones correctas
                </p>
              </>
            ) : (
              <p className="mt-1 text-[15px] leading-relaxed text-ink2">
                El curso se aprende decidiendo. Empieza por el primer ejercicio.
              </p>
            )}
          </div>
          {started && <Ring pct={t.mastery ?? 0} />}
        </div>

        {next ? (
          <button
            onClick={() => onResume(next.chapterId, next.articleId, next.step)}
            className="flex w-full items-center gap-3 border-t border-rule bg-seal px-5 py-4 text-left text-sheet"
          >
            <span className="min-w-0 flex-1">
              <span className="block font-mono text-[9.5px] uppercase tracking-[0.14em] opacity-80">
                {started ? 'Continuar' : 'Empezar'} · cap. {next.chapterNum} · artículo {next.roman}
              </span>
              <span className="mt-0.5 block truncate font-display text-[17px] leading-tight">
                {next.isCheck ? 'Responder las preguntas' : next.head}
              </span>
            </span>
            <span aria-hidden="true" className="flex-none text-[20px]">›</span>
          </button>
        ) : (
          <div className="flex items-center gap-2.5 border-t border-rule bg-oksoft px-5 py-4">
            <span aria-hidden="true" className="text-[15px] text-ok">✓</span>
            <span className="text-[14.5px] font-bold text-ok">Curso completo</span>
          </div>
        )}
      </section>

      {/* ---------------------------- KPI row ---------------------------- */}
      <section aria-label="Resumen" className="grid grid-cols-3 gap-2.5">
        <Stat label="Ejercicios" value={`${t.solved}`} of={`de ${t.steps}`} />
        <Stat label="Artículos" value={`${t.certified}`} of={`de ${t.articles}`} />
        <Stat label="Por repasar" value={`${weakTotal(chapters, saved)}`} of="ejercicios" tone={weakTotal(chapters, saved) ? 'no' : 'ok'} />
      </section>

      {/* ---------------------------- chapters --------------------------- */}
      <section>
        <h2 className="mb-2.5 font-mono text-[10.5px] uppercase tracking-[0.13em] text-muted">Capítulos</h2>
        <div className="flex flex-col gap-2.5">
          {chapters.map((c) => {
            const s = saved[c.id] ?? empty()
            const st = chapterStats(c, s)
            const done = st.filter((x) => x.certified).length
            const solved = st.reduce((a, x) => a + x.solved, 0)
            const steps = st.reduce((a, x) => a + x.steps, 0)
            return (
              <button
                key={c.id}
                onClick={() => onOpenChapter(c.id)}
                className="w-full rounded-xl border border-rule bg-sheet p-4 text-left shadow-[var(--shadow-sm)]"
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-seal">
                    Capítulo {c.num}
                  </span>
                  {done === c.articles.length && (
                    <span className="flex items-baseline gap-1 font-mono text-[10px] uppercase tracking-wider text-ok">
                      <span aria-hidden="true">✓</span> completo
                    </span>
                  )}
                </div>
                <b className="mt-1 block text-balance font-display text-[18px] leading-tight">{c.name}</b>
                <div className="mt-3 flex items-center gap-3">
                  <Progress value={steps ? (solved / steps) * 100 : 0} className="flex-1" />
                  <span className="flex-none font-mono text-[11px] tabular-nums text-muted">
                    {solved}/{steps}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* ------------------------ mastery by concept --------------------- */}
      {started && (
        <section>
          <h2 className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.13em] text-muted">Dominio por concepto</h2>
          <p className="mb-3 text-[13px] leading-snug text-muted">
            Porcentaje de decisiones correctas en los artículos que ya trabajaste.
          </p>
          <div className="flex flex-col gap-3">
            {byChapter.map((g) => (
              <div key={g.ch.id} className="overflow-hidden rounded-xl border border-rule">
                <p className="border-b border-rule bg-sunk px-4 py-2 font-mono text-[9.5px] uppercase tracking-[0.13em] text-muted">
                  Capítulo {g.ch.num}
                </p>
                <ol>
                  {g.rows.map((c) => (
                    <ConceptRow key={c.articleId} c={c} onOpen={() => onResume(c.chapterId, c.articleId, 0)} />
                  ))}
                </ol>
              </div>
            ))}
          </div>
          {untouched > 0 && (
            <p className="mt-2.5 text-[12.5px] leading-snug text-muted">
              {untouched} {untouched === 1 ? 'artículo aún sin empezar' : 'artículos aún sin empezar'}.
            </p>
          )}
        </section>
      )}

      {/* ---------------------------- review list ------------------------ */}
      {weak.length > 0 && (
        <section>
          <h2 className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.13em] text-muted">Para repasar</h2>
          <p className="mb-3 text-[13px] leading-snug text-muted">
            Los ejercicios que fallaste, empezando por el peor. Toca para volver a ese paso.
          </p>
          <ol className="flex flex-col gap-2">
            {weak.map((w) => (
              <li key={`${w.articleId}-${w.step}`}>
                <button
                  onClick={() => onResume(w.chapterId, w.articleId, w.step)}
                  className="flex w-full items-center gap-3 rounded-xl border border-no/40 bg-sheet px-4 py-3 text-left"
                >
                  <span
                    aria-hidden="true"
                    className="grid h-[26px] w-[26px] flex-none place-items-center rounded-full bg-nosoft font-mono text-[12px] font-bold text-no"
                  >
                    !
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14.5px] font-bold leading-tight">{w.head}</span>
                    <span className="mt-0.5 block truncate font-mono text-[10.5px] text-muted">
                      Artículo {w.roman} · {w.concept}
                    </span>
                  </span>
                  <span className="flex-none font-mono text-[11.5px] tabular-nums text-no">
                    {w.got}/{w.of}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  )
}

/* ------------------------------------------------------------ pieces */

const empty = (): ChapterSave => ({ quiz: {}, cap: {}, solves: {} })

function weakTotal(chapters: Chapter[], saved: Record<string, ChapterSave>) {
  return chapters.reduce((a, c) => a + weakSpots(c, saved[c.id] ?? empty()).length, 0)
}

function Stat({
  label, value, of, tone = 'plain',
}: { label: string; value: string; of: string; tone?: 'plain' | 'ok' | 'no' }) {
  return (
    <div className="rounded-xl border border-rule bg-sheet p-3 shadow-[var(--shadow-sm)]">
      <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">{label}</p>
      <p
        className={cn(
          'mt-1 font-display text-[26px] leading-none tabular-nums',
          tone === 'no' ? 'text-no' : tone === 'ok' ? 'text-ok' : 'text-ink',
        )}
      >
        {value}
      </p>
      <p className="mt-0.5 font-mono text-[10px] leading-tight text-muted">{of}</p>
    </div>
  )
}

/* One ratio against a limit reads as a meter, not a two-slice pie. */
function Ring({ pct }: { pct: number }) {
  const r = 26
  const c = 2 * Math.PI * r
  return (
    <svg width="68" height="68" viewBox="0 0 68 68" role="img" aria-label={`${pct} por ciento de dominio`} className="flex-none">
      <circle cx="34" cy="34" r={r} fill="none" stroke="rgb(var(--sunk))" strokeWidth="7" />
      <circle
        cx="34" cy="34" r={r} fill="none"
        stroke="rgb(var(--seal))" strokeWidth="7" strokeLinecap="round"
        strokeDasharray={`${(c * pct) / 100} ${c}`}
        transform="rotate(-90 34 34)"
      />
    </svg>
  )
}

function ConceptRow({ c, onOpen }: { c: ConceptStat; onOpen: () => void }) {
  const needsWork = c.pct !== null && c.pct < 70
  return (
    <li className="border-t border-rule first:border-t-0">
      <button onClick={onOpen} className="flex w-full items-center gap-3 bg-sheet px-4 py-3 text-left">
        <span className="w-6 flex-none font-display text-[15px] text-seal">{c.roman}</span>
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline gap-2">
            <span className="min-w-0 flex-1 truncate text-[14px] leading-tight text-ink">{c.concept}</span>
            {needsWork && (
              <span className="flex flex-none items-baseline gap-1 rounded border border-no/50 bg-nosoft px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-no">
                <span aria-hidden="true">!</span> repasar
              </span>
            )}
          </span>
          {/* Thin mark, rounded end, anchored to the track. */}
          <span className="mt-1.5 flex items-center gap-2">
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-sunk">
              <span
                className={cn('block h-full rounded-full', needsWork ? 'bg-no' : 'bg-seal')}
                style={{ width: `${c.pct ?? 0}%` }}
              />
            </span>
            <span className="w-10 flex-none text-right font-mono text-[11px] tabular-nums text-muted">
              {c.pct}%
            </span>
          </span>
        </span>
      </button>
    </li>
  )
}
