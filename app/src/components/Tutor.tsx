import { useEffect, useMemo, useRef, useState } from 'react'
import { FULL, gsap, useGSAP } from '@/lib/gsap'
import type { Example, Probe, Tone, Viz } from '@/lib/types'
import { cn } from '@/lib/utils'

/* The app teaches instead of narrating: every example asks the student
   to commit to an answer before any reasoning appears. Getting it wrong
   is fine — the point is that they have taken a position, so the
   explanation lands on a prediction instead of on a blank page. */

const toneRing: Record<Tone, string> = {
  plain: 'border-rule2 bg-sheet',
  seal: 'border-seal bg-sealsoft',
  ok: 'border-ok bg-oksoft',
  no: 'border-no bg-nosoft',
}
const toneText: Record<Tone, string> = {
  plain: 'text-ink',
  seal: 'text-seal',
  ok: 'text-ok',
  no: 'text-no',
}

export type Verdict = { got: number; of: number }

export function Tutor({
  ex,
  solved,
  onSolved,
}: {
  ex: Example
  solved: Verdict | null
  onSolved: (v: Verdict) => void
}) {
  const [answers, setAnswers] = useState<Record<number, number | boolean>>({})
  const [checked, setChecked] = useState(false)
  const [shown, setShown] = useState(0)
  const list = useRef<HTMLOListElement>(null)

  // A new step means a new exercise.
  useEffect(() => {
    setAnswers({})
    setChecked(!!solved)
    setShown(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ex.title])

  /* Reveals the step just added. Killing a from() tween would leave the
     row at whatever opacity it had reached; useGSAP reverts instead, so
     an interrupted reveal never strands a step invisible. */
  useGSAP(
    () => {
      if (shown === 0) return
      const el = list.current?.children[shown - 1] as HTMLElement | undefined
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add(FULL, () => {
        gsap.from(el, { opacity: 0, y: 8, duration: 0.28, ease: 'power2.out' })
      })
      return () => mm.revert()
    },
    { dependencies: [shown], scope: list },
  )

  const need = probeCount(ex.probe)
  const answered = Object.keys(answers).length
  const ready = answered >= need

  const score = useMemo(() => grade(ex.probe, answers), [ex.probe, answers])
  const doneSteps = shown >= ex.steps.length

  const check = () => {
    setChecked(true)
    onSolved(score)
  }

  return (
    <section className="mt-6 overflow-hidden rounded-xl border border-rule bg-sheet shadow-[var(--shadow-sm)]">
      <div className="flex items-start gap-3 border-b border-rule bg-sunk px-4 py-2.5">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">Tu turno</p>
          <h4 className="mt-0.5 text-balance font-display text-[16.5px] leading-tight">{ex.title}</h4>
        </div>
        {checked && (
          <span
            className={cn(
              'mt-0.5 flex-none rounded-md border px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider',
              score.got === score.of ? 'border-ok bg-oksoft text-ok' : 'border-no bg-nosoft text-no',
            )}
          >
            {score.got}/{score.of}
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-[15px] leading-relaxed text-ink2" dangerouslySetInnerHTML={{ __html: ex.setup }} />

        <div className="mt-4">
          <VizView viz={ex.viz} reveal={checked} />
        </div>

        {/* ---- the decision ---- */}
        <div className="mt-4 rounded-lg border border-seal bg-sealsoft p-3.5">
          <p className="mb-3 text-[14.5px] font-bold leading-snug text-seal">{ex.probe.ask}</p>
          <ProbeView
            probe={ex.probe}
            answers={answers}
            checked={checked}
            onAnswer={(i, v) => !checked && setAnswers((a) => ({ ...a, [i]: v }))}
          />
          {!checked && (
            <button
              disabled={!ready}
              onClick={check}
              className={cn(
                'mt-3 w-full rounded-lg bg-seal px-4 py-2.5 text-[14.5px] font-bold text-sheet',
                !ready && 'opacity-45',
              )}
            >
              {ready ? 'Comprobar mi respuesta' : `Faltan ${need - answered}`}
            </button>
          )}
        </div>

        {/* ---- the reasoning, only after committing ---- */}
        {checked && (
          <>
            <p className="mt-4 text-[13.5px] leading-snug text-muted">
              {score.got === score.of
                ? 'Bien. Ahora mira el razonamiento completo:'
                : 'Revisa dónde se rompió el razonamiento:'}
            </p>

            {shown > 0 && (
              <ol ref={list} className="mt-3 flex flex-col gap-2.5">
                {ex.steps.slice(0, shown).map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-px grid h-[22px] w-[22px] flex-none place-items-center rounded-full bg-sealsoft font-mono text-[11px] font-bold text-seal">
                      {i + 1}
                    </span>
                    <span className="text-[14.5px] leading-relaxed text-ink2" dangerouslySetInnerHTML={{ __html: s }} />
                  </li>
                ))}
              </ol>
            )}

            {!doneSteps ? (
              <button
                onClick={() => setShown((n) => n + 1)}
                className="mt-3 w-full rounded-lg border border-seal bg-sealsoft px-4 py-2.5 text-[14.5px] font-bold text-seal"
              >
                {shown === 0 ? 'Ver el razonamiento' : `Siguiente paso · ${shown + 1} de ${ex.steps.length}`}
              </button>
            ) : (
              <div className="mt-3 rounded-lg border border-ok bg-oksoft px-4 py-3">
                <p className="mb-0.5 font-mono text-[9.5px] uppercase tracking-[0.13em] text-ok">La regla</p>
                <p className="text-[14.5px] leading-relaxed text-ink" dangerouslySetInnerHTML={{ __html: ex.answer }} />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

/* --------------------------------------------------------- scoring */

export function probeCount(p: Probe): number {
  if (p.p === 'choice') return 1
  return p.items.length
}

export function grade(p: Probe, answers: Record<number, number | boolean>): Verdict {
  if (p.p === 'choice') return { got: answers[0] === p.answer ? 1 : 0, of: 1 }
  const got = p.items.filter((it, i) => answers[i] === (p.p === 'yesno' ? it.answer : (it as { answer: number }).answer)).length
  return { got, of: p.items.length }
}

/* ---------------------------------------------------------- probes */

function ProbeView({
  probe, answers, checked, onAnswer,
}: {
  probe: Probe
  answers: Record<number, number | boolean>
  checked: boolean
  onAnswer: (i: number, v: number | boolean) => void
}) {
  if (probe.p === 'choice') {
    return (
      <div role="radiogroup" aria-label={probe.ask} className="flex flex-col gap-1.5">
        {probe.options.map((o, oi) => {
          const picked = answers[0] === oi
          const state = !checked ? null : oi === probe.answer ? 'ok' : picked ? 'no' : null
          return (
            <button
              key={oi}
              role="radio"
              aria-checked={picked}
              disabled={checked}
              onClick={() => onAnswer(0, oi)}
              className={cn(
                'flex items-start gap-2.5 rounded-lg border bg-sheet px-3 py-2.5 text-left text-[14px] leading-snug',
                picked && !checked && 'border-seal bg-sealsoft font-bold text-seal',
                !picked && !checked && 'border-rule2',
                state === 'ok' && 'border-ok bg-oksoft text-ok',
                state === 'no' && 'border-no bg-nosoft text-no line-through',
                checked && !state && 'border-rule2 opacity-55',
              )}
            >
              <span className="mt-px font-mono text-[11px] opacity-70">{'ABCD'[oi]}</span>
              <span dangerouslySetInnerHTML={{ __html: o }} />
            </button>
          )
        })}
      </div>
    )
  }

  if (probe.p === 'yesno') {
    return (
      <div className="flex flex-col gap-2">
        {probe.items.map((it, i) => {
          const v = answers[i] as boolean | undefined
          const right = checked && v === it.answer
          const wrong = checked && v !== undefined && v !== it.answer
          return (
            <div key={i} className={cn('rounded-lg border bg-sheet p-2.5', right && 'border-ok', wrong && 'border-no', !checked && 'border-rule2')}>
              <p id={`yn-${i}`} className="mb-2 text-[13.5px] leading-snug text-ink2">{it.label}</p>
              <div role="radiogroup" aria-labelledby={`yn-${i}`} className="flex gap-2">
                {[true, false].map((opt) => (
                  <button
                    key={String(opt)}
                    role="radio"
                    aria-checked={v === opt}
                    disabled={checked}
                    onClick={() => onAnswer(i, opt)}
                    className={cn(
                      'flex-1 rounded-md border px-3 py-1.5 text-[13.5px] font-bold',
                      v === opt && !checked && 'border-seal bg-sealsoft text-seal',
                      v !== opt && !checked && 'border-rule2 bg-sheet text-muted',
                      checked && opt === it.answer && 'border-ok bg-oksoft text-ok',
                      checked && opt !== it.answer && v === opt && 'border-no bg-nosoft text-no',
                      checked && opt !== it.answer && v !== opt && 'border-rule2 bg-sheet text-muted opacity-55',
                    )}
                  >
                    {opt ? probe.yes : probe.no}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // classify — one row per item, options as chips
  return (
    <div className="flex flex-col gap-2">
      {probe.items.map((it, i) => {
        const v = answers[i] as number | undefined
        const right = checked && v === it.answer
        const wrong = checked && v !== undefined && v !== it.answer
        return (
          <div key={i} className={cn('rounded-lg border bg-sheet p-2.5', right && 'border-ok', wrong && 'border-no', !checked && 'border-rule2')}>
            <p id={`cl-${i}`} className="mb-2 text-[13.5px] font-bold leading-snug text-ink">{it.label}</p>
            <div role="radiogroup" aria-labelledby={`cl-${i}`} className="flex flex-wrap gap-1.5">
              {probe.options.map((o, oi) => (
                <button
                  key={oi}
                  role="radio"
                  aria-checked={v === oi}
                  disabled={checked}
                  onClick={() => onAnswer(i, oi)}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-[12.5px] leading-tight',
                    v === oi && !checked && 'border-seal bg-sealsoft font-bold text-seal',
                    v !== oi && !checked && 'border-rule2 bg-sheet text-ink2',
                    checked && oi === it.answer && 'border-ok bg-oksoft font-bold text-ok',
                    checked && oi !== it.answer && v === oi && 'border-no bg-nosoft text-no line-through',
                    checked && oi !== it.answer && v !== oi && 'border-rule2 bg-sheet text-muted opacity-50',
                  )}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------- viz */

function VizView({ viz, reveal }: { viz: Viz; reveal: boolean }) {
  /* Before the student commits, the illustration shows the evidence but
     hides the colour coding that would give the answer away. */
  const t = (x?: Tone): Tone => (reveal ? (x ?? 'plain') : 'plain')

  if (viz.v === 'ledger') {
    const numeric = (s: string) => /^[<(]?\s*[-−(]?\s*[$0-9]/.test(s.replace(/<[^>]+>/g, ''))
    const colNumeric = viz.cols.map((_, ci) => ci > 0 && viz.rows.every((r) => numeric(r.cells[ci] ?? '')))
    return (
      <div className="overflow-x-auto rounded-lg border border-rule">
        <table className="w-full min-w-[280px] border-collapse text-[13.5px]">
          <thead>
            <tr>
              {viz.cols.map((c, i) => (
                <th
                  key={c}
                  className={cn(
                    'bg-sunk px-3 py-2 font-mono text-[9.5px] font-normal uppercase tracking-wider text-muted',
                    colNumeric[i] ? 'text-right' : 'text-left',
                  )}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {viz.rows.map((r, ri) => {
              const tone = t(r.tone)
              return (
                <tr key={ri} className={cn(tone !== 'plain' && toneRing[tone])}>
                  {r.cells.map((c, ci) => (
                    <td
                      key={ci}
                      className={cn(
                        'border-t border-rule px-3 py-2 align-top leading-snug',
                        colNumeric[ci] ? 'whitespace-nowrap text-right font-mono text-[12.5px] tabular-nums' : 'text-left',
                        tone !== 'plain' ? toneText[tone] : 'text-ink2',
                      )}
                    >
                      <span dangerouslySetInnerHTML={{ __html: c }} />
                      {ci === 0 && r.note && reveal && (
                        <span className="mt-0.5 block font-mono text-[10px] text-muted">{r.note}</span>
                      )}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  if (viz.v === 'flow') {
    return (
      <ol className="flex flex-col gap-0">
        {viz.nodes.map((n, i) => {
          const tone = t(n.tone)
          return (
            <li key={i}>
              <div className={cn('rounded-lg border px-3.5 py-2.5', toneRing[tone])}>
                <b className={cn('block text-[14px] font-bold leading-tight', toneText[tone])}>{n.label}</b>
                {n.sub && <span className="mt-0.5 block text-[12.5px] leading-snug text-muted">{n.sub}</span>}
              </div>
              {i < viz.nodes.length - 1 && (
                <div className="flex h-4 items-center justify-center" aria-hidden="true">
                  <span className="text-[13px] leading-none text-rule2">▼</span>
                </div>
              )}
            </li>
          )
        })}
      </ol>
    )
  }

  if (viz.v === 'split') {
    return (
      <div>
        <div className="flex items-baseline justify-between rounded-lg border border-rule2 bg-sunk px-3.5 py-2.5">
          <b className="text-[14px]">{viz.whole.label}</b>
          <span className="ml-3 flex-none whitespace-nowrap font-mono text-[13px] tabular-nums text-ink">
            {viz.whole.amount}
          </span>
        </div>
        <div className="flex h-4 items-center justify-center" aria-hidden="true">
          <span className="text-[13px] leading-none text-rule2">▼</span>
        </div>
        <div className="flex flex-col gap-1.5">
          {viz.parts.map((p, i) => {
            const tone = t(p.tone)
            return (
              <div key={i} className={cn('flex items-baseline justify-between rounded-lg border px-3.5 py-2.5', toneRing[tone])}>
                <b className={cn('text-[13.5px] font-bold leading-tight', toneText[tone])}>{p.label}</b>
                <span className={cn('ml-3 flex-none whitespace-nowrap font-mono text-[12.5px] tabular-nums', toneText[tone])}>
                  {p.amount}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-rule">
      <div className="flex items-baseline justify-between border-b border-rule bg-sunk px-3.5 py-2.5">
        <b className="text-[13.5px]">{viz.label}</b>
        <span className="ml-3 flex-none whitespace-nowrap font-mono text-[14px] font-bold tabular-nums text-ink">
          {viz.value}
        </span>
      </div>
      <ul>
        {viz.marks.map((m, i) => (
          <li
            key={i}
            className={cn(
              'flex items-baseline justify-between px-3.5 py-2.5',
              i && 'border-t border-rule',
              reveal ? (m.pass ? 'bg-oksoft' : 'bg-nosoft') : 'bg-sheet',
            )}
          >
            <span className="flex items-baseline gap-2">
              {reveal && (
                <span className={cn('font-mono text-[11px] font-bold', m.pass ? 'text-ok' : 'text-no')}>
                  {m.pass ? '✓' : '✕'}
                </span>
              )}
              <span className="text-[13px] leading-snug text-ink2">{m.label}</span>
            </span>
            <span
              className={cn(
                'ml-3 flex-none whitespace-nowrap font-mono text-[12.5px] tabular-nums',
                reveal ? (m.pass ? 'text-ok' : 'text-no') : 'text-ink2',
              )}
            >
              {m.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
