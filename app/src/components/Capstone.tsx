import { useState } from 'react'
import type { Chapter, Task } from '@/lib/types'
import { Quiz } from './Quiz'
import { Card, CardContent } from './ui/card'
import { Progress } from './ui/progress'
import { cn } from '@/lib/utils'

/* Capstone state is keyed by task index, so a chapter can mix task
   kinds in any order without the shape changing. */
export type TaskState = {
  sort?: Record<number, number>
  grid?: Record<string, 'Y' | 'N'>
  quiz?: Record<number, number>
  major?: Record<number, boolean>
  checked?: boolean
}
export type CapState = Record<number, TaskState>

const btn = 'w-full rounded-xl border border-rule2 bg-sheet px-4 py-3 text-[15px] font-bold'
const money = (n: number) => '$' + n.toLocaleString('es-MX')

/* --- per-task completion and score, so the shell stays generic --- */
function tally(task: Task, st: TaskState): { done: boolean; got: number; of: number } {
  switch (task.kind) {
    case 'sort': {
      const s = st.sort ?? {}
      return {
        done: Object.keys(s).length === task.items.length,
        got: task.items.filter((it, i) => s[i] === it[1]).length,
        of: task.items.length,
      }
    }
    case 'grid': {
      const g = st.grid ?? {}
      const of = task.rows.length * task.cols.length
      return {
        done: !!st.checked,
        got: task.rows.reduce((a, r, ri) => a + r[1].filter((ans, ci) => g[`${ri}-${ci}`] === ans).length, 0),
        of,
      }
    }
    case 'quiz': {
      const q = st.quiz ?? {}
      return {
        done: task.questions.every((_, i) => q[i] != null),
        got: task.questions.filter((x, i) => q[i] === x.a).length,
        of: task.questions.length,
      }
    }
    case 'major': {
      const m = st.major ?? {}
      return {
        done: !!st.checked,
        got: task.funds.filter((f, i) => m[i] === f.major).length,
        of: task.funds.length,
      }
    }
  }
}

export function Capstone({
  chapter,
  state,
  set,
  locked,
  doneCount,
  onGoArticles,
}: {
  chapter: Chapter
  state: CapState
  set: (fn: (s: CapState) => CapState) => void
  locked: boolean
  doneCount: number
  onGoArticles: () => void
}) {
  const [sel, setSel] = useState<{ task: number; item: number } | null>(null)
  const total = chapter.articles.length

  if (locked) {
    return (
      <div>
        <p className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-muted">Cierre del caso</p>
        <h2 className="mt-1.5 font-display text-[26px] leading-tight">Todavía sin abrir</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">
          Certifica los {total} artículos para abrir el expediente. Llevas {doneCount} de {total}.
        </p>
        <Card className="mt-5">
          <CardContent className="p-4">
            <div className="mb-2 flex items-baseline justify-between text-[13px] text-muted">
              <span>Artículos certificados</span>
              <span className="font-mono text-ink">{doneCount} / {total}</span>
            </div>
            <Progress value={(doneCount / total) * 100} />
          </CardContent>
        </Card>
        <button onClick={onGoArticles} className="mt-4 w-full rounded-xl bg-seal px-4 py-3.5 text-[15.5px] font-bold text-sheet">
          Continuar
        </button>
      </div>
    )
  }

  const per = chapter.tasks.map((t, i) => tally(t, state[i] ?? {}))
  const tasksDone = per.filter((p) => p.done).length
  const score = per.reduce((a, p) => a + p.got, 0)
  const scoreOf = per.reduce((a, p) => a + p.of, 0)
  const allDone = tasksDone === chapter.tasks.length

  const patch = (ti: number, fn: (s: TaskState) => TaskState) =>
    set((s) => ({ ...s, [ti]: fn(s[ti] ?? {}) }))

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-rule bg-sheet shadow-[var(--shadow)]">
        <div className="bg-seal px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-sheet">
          Cierre · capítulo {chapter.num}
        </div>
        <div className="p-5">
          <h2 className="font-display text-[26px] leading-tight">Ahora resuélvelo tú</h2>
          <p className="mt-2 text-[15.5px] leading-relaxed text-ink2">{chapter.capstoneLede}</p>
        </div>
      </div>

      {chapter.tasks.map((task, ti) => {
        const st = state[ti] ?? {}
        const p = per[ti]
        return (
          <section key={ti} className="mt-9 border-t border-rule pt-7">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-muted">
              Tarea {ti + 1} · {task.src}
            </p>
            <h3 className="mt-1.5 font-display text-[21px] leading-tight">{task.title}</h3>
            <p className="mb-4 mt-1 text-[14px] leading-snug text-muted">{task.hint}</p>

            {task.kind === 'sort' && (
              <SortTask
                task={task}
                picked={st.sort ?? {}}
                sel={sel?.task === ti ? sel.item : null}
                onPick={(i) => setSel(sel?.task === ti && sel.item === i ? null : { task: ti, item: i })}
                onDrop={(bin) => {
                  if (sel?.task !== ti) return
                  const item = sel.item
                  patch(ti, (s) => ({ ...s, sort: { ...(s.sort ?? {}), [item]: bin } }))
                  setSel(null)
                }}
              />
            )}

            {task.kind === 'grid' && (
              <GridTask
                task={task}
                cells={st.grid ?? {}}
                checked={!!st.checked}
                onToggle={(k) =>
                  patch(ti, (s) => {
                    const g = { ...(s.grid ?? {}) }
                    if (g[k] === 'Y') g[k] = 'N'
                    else if (g[k] === 'N') delete g[k]
                    else g[k] = 'Y'
                    return { ...s, grid: g }
                  })
                }
                onCheck={() => patch(ti, (s) => ({ ...s, checked: true }))}
              />
            )}

            {task.kind === 'major' && (
              <MajorTask
                task={task}
                picks={st.major ?? {}}
                checked={!!st.checked}
                onPick={(i, v) => patch(ti, (s) => ({ ...s, major: { ...(s.major ?? {}), [i]: v } }))}
                onCheck={() => patch(ti, (s) => ({ ...s, checked: true }))}
              />
            )}

            {task.kind === 'quiz' && (
              <Quiz
                idPrefix={`${chapter.id}-cap${ti}`}
                questions={task.questions}
                answers={st.quiz ?? {}}
                onAnswer={(qi, oi) => patch(ti, (s) => ({ ...s, quiz: { ...(s.quiz ?? {}), [qi]: oi } }))}
              />
            )}

            {p.done && task.kind !== 'quiz' && (
              <Card className="mt-4">
                <CardContent className="p-4 text-center">
                  <p className="font-display text-[18px] leading-tight">
                    {p.got} de {p.of} correctas
                  </p>
                  <p className="mx-auto mt-1.5 max-w-read text-[14px] leading-snug text-muted">{task.note}</p>
                  <button
                    onClick={() => { set((s) => ({ ...s, [ti]: {} })); setSel(null) }}
                    className={cn(btn, 'mt-4')}
                  >
                    Intentar de nuevo
                  </button>
                </CardContent>
              </Card>
            )}
          </section>
        )
      })}

      <div className="mt-8">
        {!allDone ? (
          <Card>
            <CardContent className="p-4">
              <div className="mb-2 flex items-baseline justify-between text-[13px] text-muted">
                <span>Tareas del cierre</span>
                <span className="font-mono text-ink">{tasksDone} / {chapter.tasks.length}</span>
              </div>
              <Progress value={(tasksDone / chapter.tasks.length) * 100} />
            </CardContent>
          </Card>
        ) : (
          <div className="overflow-hidden rounded-xl border border-rule bg-sheet shadow-[var(--shadow)]">
            <div className="bg-seal px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-sheet">
              Expediente cerrado
            </div>
            <div className="px-5 py-7 text-center">
              <p className="font-display text-[52px] leading-none text-seal">
                {Math.round((score / scoreOf) * 100)}%
              </p>
              <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.13em] text-muted">
                {score} de {scoreOf} respuestas correctas
              </p>
              <p className="mx-auto mt-5 max-w-read text-[15px] leading-relaxed text-ink2">{chapter.closing}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------ sort */
function SortTask({
  task, picked, sel, onPick, onDrop,
}: {
  task: Extract<Task, { kind: 'sort' }>
  picked: Record<number, number>
  sel: number | null
  onPick: (i: number) => void
  onDrop: (bin: number) => void
}) {
  const left = task.items.map((it, i) => [it, i] as const).filter(([, i]) => picked[i] == null)
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {left.map(([it, i]) => (
          <button
            key={i}
            onClick={() => onPick(i)}
            aria-pressed={sel === i}
            className={cn(
              'rounded-full border px-3.5 py-2 text-left text-[14px] leading-tight transition-colors',
              sel === i ? 'border-seal bg-sealsoft font-bold text-seal' : 'border-rule2 bg-sheet',
            )}
          >
            {it[0]}
          </button>
        ))}
        {left.length === 0 && <p className="text-[14px] text-muted">Todo clasificado.</p>}
      </div>
      <div className="mt-4 flex flex-col gap-2.5">
        {task.bins.map((bin, bi) => {
          const held = task.items.map((it, i) => [it, i] as const).filter(([, i]) => picked[i] === bi)
          return (
            <button
              key={bin.code}
              onClick={() => onDrop(bi)}
              aria-label={`Colocar en ${bin.label}`}
              className={cn(
                'w-full rounded-xl border-[1.5px] bg-sunk px-3.5 py-3 text-left transition-colors',
                sel != null ? 'border-solid border-seal' : 'border-dashed border-rule2',
              )}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{bin.eyebrow}</span>
              <b className="block font-display text-[16px] leading-tight">{bin.label}</b>
              {held.length > 0 && (
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {held.map(([it, i]) => (
                    <em
                      key={i}
                      className={cn(
                        'rounded-md border bg-sheet px-2 py-1 text-[12.5px] not-italic',
                        it[1] === bi ? 'border-ok text-ok' : 'border-no text-no line-through',
                      )}
                    >
                      {it[0]}
                    </em>
                  ))}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </>
  )
}

/* ------------------------------------------------------------ grid */
function GridTask({
  task, cells, checked, onToggle, onCheck,
}: {
  task: Extract<Task, { kind: 'grid' }>
  cells: Record<string, 'Y' | 'N'>
  checked: boolean
  onToggle: (k: string) => void
  onCheck: () => void
}) {
  const need = task.rows.length * task.cols.length
  const filled = Object.keys(cells).length
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[330px] border-collapse text-[14px]">
          <thead>
            <tr>
              <th className="w-1/2 pb-2.5 pr-2 text-left font-mono text-[10px] font-normal uppercase tracking-wider text-muted">
                Característica
              </th>
              {task.cols.map((c) => (
                <th key={c} className="px-1 pb-2.5 align-bottom font-mono text-[10px] font-normal uppercase tracking-wider text-muted">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {task.rows.map((r, ri) => (
              <tr key={ri}>
                <td className="border-t border-rule py-2 pr-2 leading-snug text-ink2">{r[0]}</td>
                {r[1].map((ans, ci) => {
                  const k = `${ri}-${ci}`
                  const v = cells[k]
                  const wrong = checked && v !== ans
                  return (
                    <td key={ci} className="border-t border-rule px-1 py-2 text-center">
                      <button
                        aria-label={`${r[0]} — ${task.cols[ci]}: ${v ?? 'sin marcar'}`}
                        disabled={checked}
                        onClick={() => onToggle(k)}
                        className={cn(
                          'h-8 w-9 rounded-lg border font-mono text-[13px] font-bold',
                          !v && 'border-rule2 bg-sheet text-muted',
                          v === 'Y' && 'border-seal bg-sealsoft text-seal',
                          v === 'N' && 'border-rule2 bg-sunk text-ink2',
                          wrong && 'border-no bg-nosoft text-no',
                        )}
                      >
                        {v ?? '·'}
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!checked && (
        <button disabled={filled < need} onClick={onCheck} className={cn(btn, 'mt-4', filled < need && 'opacity-45')}>
          {filled < need ? `Faltan ${need - filled} casillas` : 'Comprobar la rejilla'}
        </button>
      )}
    </>
  )
}

/* ----------------------------------------------------------- major */
function MajorTask({
  task, picks, checked, onPick, onCheck,
}: {
  task: Extract<Task, { kind: 'major' }>
  picks: Record<number, boolean>
  checked: boolean
  onPick: (i: number, v: boolean) => void
  onCheck: () => void
}) {
  const els = [
    ['assets', 'Activos'],
    ['liabilities', 'Pasivos'],
    ['revenues', 'Ingresos'],
    ['expenditures', 'Egresos'],
  ] as const
  const filled = Object.keys(picks).length
  return (
    <>
      {/* The thresholds, computed once so the student checks against them. */}
      <div className="overflow-hidden rounded-xl border border-rule">
        <div className="bg-sunk px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
          Las dos vallas
        </div>
        <table className="w-full border-collapse text-[13px]">
          <tbody>
            {els.map(([k, label]) => (
              <tr key={k}>
                <td className="border-t border-rule bg-sheet py-2 pl-3.5 pr-2 text-ink2">{label}</td>
                <td className="border-t border-rule bg-sheet py-2 pr-2 text-right font-mono text-[12px] tabular-nums text-seal">
                  10 % {money(Math.round(task.totalCategory[k] * 0.1))}
                </td>
                <td className="border-t border-rule bg-sheet py-2 pr-3.5 text-right font-mono text-[12px] tabular-nums text-seal">
                  5 % {money(Math.round(task.totalCombined[k] * 0.05))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-col gap-2.5">
        {task.funds.map((f, i) => {
          const v = picks[i]
          const wrong = checked && v !== f.major
          return (
            <div
              key={f.name}
              className={cn(
                'rounded-xl border bg-sheet p-3.5',
                checked ? (wrong ? 'border-no' : 'border-ok') : 'border-rule',
              )}
            >
              <b className="block font-display text-[16px] leading-tight">{f.name}</b>
              <div className="mt-2 overflow-x-auto">
                <table className="w-full min-w-[280px] border-collapse text-[12.5px]">
                  <tbody>
                    <tr>
                      {els.map(([k, label]) => (
                        <td key={k} className="pr-2 font-mono text-[9.5px] uppercase tracking-wider text-muted">
                          {label}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      {els.map(([k]) => (
                        <td key={k} className="pr-2 font-mono tabular-nums text-ink2">
                          {money(f[k])}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-3 flex gap-2">
                {[true, false].map((opt) => (
                  <button
                    key={String(opt)}
                    disabled={checked}
                    onClick={() => onPick(i, opt)}
                    aria-pressed={v === opt}
                    className={cn(
                      'flex-1 rounded-lg border px-3 py-2 text-[14px] font-bold',
                      v === opt ? 'border-seal bg-sealsoft text-seal' : 'border-rule2 bg-sheet text-muted',
                      checked && v === opt && (wrong ? 'border-no bg-nosoft text-no' : 'border-ok bg-oksoft text-ok'),
                    )}
                  >
                    {opt ? 'Mayor' : 'No mayor'}
                  </button>
                ))}
              </div>
              {checked && <p className="mt-2.5 text-[13.5px] leading-snug text-muted">{f.why}</p>}
            </div>
          )
        })}
      </div>

      {!checked && (
        <button
          disabled={filled < task.funds.length}
          onClick={onCheck}
          className={cn(btn, 'mt-4', filled < task.funds.length && 'opacity-45')}
        >
          {filled < task.funds.length ? `Faltan ${task.funds.length - filled} fondos` : 'Comprobar'}
        </button>
      )}
    </>
  )
}
