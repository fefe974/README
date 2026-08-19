import { useRef, useState } from 'react'
import { FULL, gsap, useGSAP } from '@/lib/gsap'
import type { Task } from '@/lib/types'
import { Entry } from './Journal'
import { cn } from '@/lib/utils'

type T = Extract<Task, { kind: 'entries' }>

/* The comprehensive problem, one transaction at a time. The student
   picks a whole journal entry rather than filling blank lines: on an
   exam the decision that costs marks is expenditure-versus-encumbrance
   or expenditure-versus-expense, not remembering how to spell Vouchers
   Payable. Each answer is final and explained on the spot — including
   what the entry they rejected would have said. */

export function EntriesTask({
  task,
  picks,
  onPick,
}: {
  task: T
  picks: Record<number, number>
  onPick: (i: number, opt: number) => void
}) {
  /* A set, not an index. Answering opens the next entry WITHOUT closing
     the one just answered: the explanation is the whole point of the
     exercise, and collapsing it out from under the student a second
     after it appears is worse than not advancing at all. */
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]))
  const toggle = (i: number) =>
    setOpen((s) => {
      const n = new Set(s)
      if (n.has(i)) n.delete(i)
      else n.add(i)
      return n
    })
  const answered = Object.keys(picks).length
  const right = task.entries.filter((e, i) => picks[i] === e.answer).length

  return (
    <div>
      {/* ------------------------- the givens, always to hand ------------------ */}
      <details className="mb-4 overflow-hidden rounded-xl border border-rule bg-sheet">
        <summary className="cursor-pointer list-none px-4 py-3 marker:hidden">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-muted">
            Datos del ejercicio · {task.fund}
          </span>
          <span className="mt-0.5 block text-[14px] leading-snug text-ink2">
            Toca para ver las cifras del problema mientras resuelves.
          </span>
        </summary>
        <dl className="border-t border-rule">
          {task.facts.map(([k, v], i) => (
            <div key={k} className={cn('flex items-baseline gap-3 px-4 py-2.5', i && 'border-t border-rule')}>
              <dt className="min-w-0 flex-1 text-[13.5px] leading-snug text-ink2">{k}</dt>
              <dd className="flex-none font-mono text-[12.5px] tabular-nums text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </details>

      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex flex-1 gap-1" role="img" aria-label={`${right} de ${task.entries.length} asientos correctos`}>
          {task.entries.map((e, i) => (
            <span
              key={e.ref}
              className={cn(
                'h-[3px] flex-1 rounded-full',
                picks[i] == null ? 'bg-sunk' : picks[i] === e.answer ? 'bg-ok' : 'bg-no',
              )}
            />
          ))}
        </div>
        <span className="flex-none font-mono text-[11px] tabular-nums text-muted">
          {answered}/{task.entries.length}
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {task.entries.map((e, i) => (
          <EntryCard
            key={e.ref}
            e={e}
            n={i + 1}
            of={task.entries.length}
            open={open.has(i)}
            pick={picks[i]}
            onOpen={() => toggle(i)}
            onPick={(opt) => {
              onPick(i, opt)
              if (i + 1 < task.entries.length) setOpen((s) => new Set(s).add(i + 1))
            }}
          />
        ))}
      </div>

      {answered === task.entries.length && (
        <p className="mt-5 rounded-xl border border-rule2 bg-sheet p-4 text-[14.5px] leading-relaxed text-ink2">
          <b className="font-display text-[15.5px]">
            {right} de {task.entries.length} asientos correctos.
          </b>{' '}
          {task.note}
        </p>
      )}
    </div>
  )
}

function EntryCard({
  e,
  n,
  of,
  open,
  pick,
  onOpen,
  onPick,
}: {
  e: T['entries'][number]
  n: number
  of: number
  open: boolean
  pick: number | undefined
  onOpen: () => void
  onPick: (opt: number) => void
}) {
  const done = pick != null
  const ok = pick === e.answer
  const body = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!open) return
      const mm = gsap.matchMedia()
      mm.add(FULL, () => {
        gsap.from('[data-why]', { opacity: 0, y: 8, duration: 0.3, ease: 'power2.out' })
      })
      return () => mm.revert()
    },
    { dependencies: [open, done], scope: body },
  )

  return (
    <section
      className={cn(
        'overflow-hidden rounded-xl border bg-sheet shadow-[var(--shadow-sm)]',
        done ? (ok ? 'border-ok' : 'border-no') : 'border-rule',
      )}
    >
      <button
        onClick={onOpen}
        aria-expanded={open}
        className="flex w-full items-start gap-3 px-4 py-3 text-left"
      >
        <span
          className={cn(
            'mt-px grid h-[26px] w-[26px] flex-none place-items-center rounded-full font-mono text-[11px] font-bold',
            !done ? 'bg-sunk text-muted' : ok ? 'bg-oksoft text-ok' : 'bg-nosoft text-no',
          )}
        >
          {!done ? n : ok ? '✓' : '!'}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">
            Asiento {e.ref} · {n} de {of}
          </span>
          <span
            className="mt-0.5 block text-[14.5px] leading-snug text-ink2"
            dangerouslySetInnerHTML={{ __html: e.narrative }}
          />
        </span>
        <span aria-hidden="true" className={cn('flex-none text-[15px] text-muted', open && 'rotate-90')}>
          ›
        </span>
      </button>

      {open && (
        <div ref={body} className="border-t border-rule p-4">
          <p className="mb-2.5 text-[13.5px] font-bold leading-snug text-seal">
            {done ? 'El asiento correcto:' : '¿Cuál es el asiento?'}
          </p>

          <div className="flex flex-col gap-2.5">
            {e.options.map((lines, oi) => {
              const isAnswer = oi === e.answer
              const chosen = pick === oi
              const tone = !done ? 'plain' : isAnswer ? 'ok' : chosen ? 'no' : 'plain'
              return (
                <div key={oi} className={cn(done && !isAnswer && !chosen && 'opacity-45')}>
                  {done ? (
                    <>
                      <Entry lines={lines} tone={tone} compact head={oi === 0} />
                      {(isAnswer || chosen) && (
                        <p
                          className={cn(
                            'mt-1 font-mono text-[9.5px] uppercase tracking-[0.12em]',
                            isAnswer ? 'text-ok' : 'text-no',
                          )}
                        >
                          {isAnswer ? '✓ correcto' : '✗ lo que elegiste'}
                        </p>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => onPick(oi)}
                      aria-label={`Elegir el asiento ${String.fromCharCode(65 + oi)}`}
                      className="block w-full rounded-lg text-left focus:outline-none focus-visible:ring-[3px] focus-visible:ring-seal"
                    >
                      <span className="mb-1 block font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted">
                        Opción {String.fromCharCode(65 + oi)}
                      </span>
                      <Entry lines={lines} compact head />
                    </button>
                  )}
                </div>
              )
            })}
          </div>


          {done && (
            <div data-why className="mt-4">
              <p className="text-[14.5px] leading-relaxed text-ink2" dangerouslySetInnerHTML={{ __html: e.why }} />
              <p className="mt-3 rounded-lg border-l-[3px] border-no bg-nosoft px-3.5 py-2.5 text-[13.5px] leading-relaxed text-ink2">
                <b className="text-no">La trampa. </b>
                <span dangerouslySetInnerHTML={{ __html: e.trap }} />
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
