import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import type { Example, Tone, Viz } from '@/lib/types'
import { cn } from '@/lib/utils'

/* A worked example, revealed a step at a time. Keeping the reasoning
   behind a tap is what lets every step carry one without the screen
   turning back into a wall of text. */

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

export function ExampleCard({ ex }: { ex: Example }) {
  const [shown, setShown] = useState(0)
  const list = useRef<HTMLOListElement>(null)

  // Reset when the step changes under us.
  useEffect(() => setShown(0), [ex.title])

  useEffect(() => {
    if (!list.current || shown === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = list.current.children[shown - 1] as HTMLElement | undefined
    if (!el) return
    const tween = gsap.from(el, { opacity: 0, y: 8, duration: 0.28, ease: 'power2.out' })
    return () => {
      tween.kill()
    }
  }, [shown])

  const done = shown >= ex.steps.length

  return (
    <section className="mt-6 overflow-hidden rounded-xl border border-rule bg-sheet shadow-[var(--shadow-sm)]">
      <div className="border-b border-rule bg-sunk px-4 py-2.5">
        <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">Ejemplo</p>
        <h4 className="mt-0.5 text-balance font-display text-[16.5px] leading-tight">{ex.title}</h4>
      </div>

      <div className="p-4">
        <p className="text-[15px] leading-relaxed text-ink2" dangerouslySetInnerHTML={{ __html: ex.setup }} />

        <div className="mt-4">
          <VizView viz={ex.viz} />
        </div>

        {shown > 0 && (
          <ol ref={list} className="mt-4 flex flex-col gap-2.5">
            {ex.steps.slice(0, shown).map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-px grid h-[22px] w-[22px] flex-none place-items-center rounded-full bg-sealsoft font-mono text-[11px] font-bold text-seal">
                  {i + 1}
                </span>
                <span
                  className="text-[14.5px] leading-relaxed text-ink2"
                  dangerouslySetInnerHTML={{ __html: s }}
                />
              </li>
            ))}
          </ol>
        )}

        {!done ? (
          <button
            onClick={() => setShown((n) => n + 1)}
            className="mt-4 w-full rounded-lg border border-seal bg-sealsoft px-4 py-2.5 text-[14.5px] font-bold text-seal"
          >
            {shown === 0 ? 'Resolverlo paso a paso' : `Siguiente paso · ${shown + 1} de ${ex.steps.length}`}
          </button>
        ) : (
          <div className="mt-4 rounded-lg border border-ok bg-oksoft px-4 py-3">
            <p className="mb-0.5 font-mono text-[9.5px] uppercase tracking-[0.13em] text-ok">Respuesta</p>
            <p className="text-[14.5px] leading-relaxed text-ink" dangerouslySetInnerHTML={{ __html: ex.answer }} />
          </div>
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- viz */

function VizView({ viz }: { viz: Viz }) {
  if (viz.v === 'ledger') {
    /* Numbers align right and never break; words align left. Deciding
       per cell keeps a mixed table (amount + description) readable. */
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
            {viz.rows.map((r, ri) => (
              <tr key={ri} className={cn(r.tone && r.tone !== 'plain' && toneRing[r.tone])}>
                {r.cells.map((c, ci) => (
                  <td
                    key={ci}
                    className={cn(
                      'border-t border-rule px-3 py-2 align-top leading-snug',
                      colNumeric[ci]
                        ? 'whitespace-nowrap text-right font-mono text-[12.5px] tabular-nums'
                        : 'text-left',
                      r.tone && r.tone !== 'plain' ? toneText[r.tone] : 'text-ink2',
                    )}
                  >
                    <span dangerouslySetInnerHTML={{ __html: c }} />
                    {ci === 0 && r.note && (
                      <span className="mt-0.5 block font-mono text-[10px] text-muted">{r.note}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (viz.v === 'flow') {
    return (
      <ol className="flex flex-col gap-0">
        {viz.nodes.map((n, i) => (
          <li key={i}>
            <div className={cn('rounded-lg border px-3.5 py-2.5', toneRing[n.tone ?? 'plain'])}>
              <b className={cn('block text-[14px] font-bold leading-tight', toneText[n.tone ?? 'plain'])}>
                {n.label}
              </b>
              {n.sub && <span className="mt-0.5 block text-[12.5px] leading-snug text-muted">{n.sub}</span>}
            </div>
            {i < viz.nodes.length - 1 && (
              <div className="flex h-4 items-center justify-center" aria-hidden="true">
                <span className="text-[13px] leading-none text-rule2">▼</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    )
  }

  if (viz.v === 'split') {
    return (
      <div>
        <div className="flex items-baseline justify-between rounded-lg border border-rule2 bg-sunk px-3.5 py-2.5">
          <b className="text-[14px]">{viz.whole.label}</b>
          <span className="font-mono text-[13px] tabular-nums text-ink">{viz.whole.amount}</span>
        </div>
        <div className="flex h-4 items-center justify-center" aria-hidden="true">
          <span className="text-[13px] leading-none text-rule2">▼</span>
        </div>
        <div className="flex flex-col gap-1.5">
          {viz.parts.map((p, i) => (
            <div
              key={i}
              className={cn('flex items-baseline justify-between rounded-lg border px-3.5 py-2.5', toneRing[p.tone ?? 'plain'])}
            >
              <b className={cn('text-[13.5px] font-bold leading-tight', toneText[p.tone ?? 'plain'])}>{p.label}</b>
              <span className={cn('ml-3 flex-none font-mono text-[12.5px] tabular-nums', toneText[p.tone ?? 'plain'])}>
                {p.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // scale — a measured value checked against one or more thresholds
  return (
    <div className="rounded-lg border border-rule">
      <div className="flex items-baseline justify-between border-b border-rule bg-sunk px-3.5 py-2.5">
        <b className="text-[13.5px]">{viz.label}</b>
        <span className="font-mono text-[14px] font-bold tabular-nums text-ink">{viz.value}</span>
      </div>
      <ul>
        {viz.marks.map((m, i) => (
          <li
            key={i}
            className={cn(
              'flex items-baseline justify-between px-3.5 py-2.5',
              i && 'border-t border-rule',
              m.pass ? 'bg-oksoft' : 'bg-nosoft',
            )}
          >
            <span className="flex items-baseline gap-2">
              <span className={cn('font-mono text-[11px] font-bold', m.pass ? 'text-ok' : 'text-no')}>
                {m.pass ? '✓' : '✕'}
              </span>
              <span className="text-[13px] leading-snug text-ink2">{m.label}</span>
            </span>
            <span
              className={cn('ml-3 flex-none font-mono text-[12.5px] tabular-nums', m.pass ? 'text-ok' : 'text-no')}
            >
              {m.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
