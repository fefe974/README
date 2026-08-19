import { useRef, useState } from 'react'
import { FULL, gsap, useGSAP } from '@/lib/gsap'
import { SIMS, replay } from '@/lib/sims'
import { Entry, money } from './Journal'
import { cn } from '@/lib/utils'

/* The encumbrance cycle is a sequence, and a sequence is the one thing
   prose teaches badly: the student has to hold four states in their
   head at once. So they step through it instead, and the ledger moves
   under their thumb — every balance replayed from the entries above,
   never a second copy of the numbers. */

export function EncumbranceSim({ id }: { id: string }) {
  const sim = SIMS[id]
  const [step, setStep] = useState(-1)
  const pane = useRef<HTMLDivElement>(null)
  if (!sim) return null

  const rows = replay(sim, step)
  const bal = (name: string) => rows.find((r) => r.acc.name === name)?.balance ?? 0
  const spent = bal(sim.meter.spent)
  const committed = bal(sim.meter.committed)
  const available = sim.budget - spent - committed
  const started = step >= 0
  const done = step === sim.steps.length - 1
  const current = started ? sim.steps[step] : null

  /* Amounts posted by the step just taken get a brief highlight —
     the point of the whole component is seeing *what moved*. */
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(FULL, () => {
        gsap.from('[data-fresh]', { opacity: 0, x: -6, duration: 0.3, stagger: 0.04, ease: 'power2.out' })
        gsap.from('[data-bar]', { scaleX: 0.001, transformOrigin: 'left center', duration: 0.45, ease: 'power2.out' })
      })
      return () => mm.revert()
    },
    { dependencies: [step], scope: pane, revertOnUpdate: true },
  )

  return (
    <section
      ref={pane}
      className="mt-6 overflow-hidden rounded-xl border border-rule bg-sheet shadow-[var(--shadow-sm)]"
    >
      <div className="border-b border-rule bg-sunk px-4 py-2.5">
        <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">Simulador · el ciclo completo</p>
        <h4 className="mt-0.5 text-balance font-display text-[17px] leading-tight">{sim.title}</h4>
      </div>

      <div className="p-4">
        <p className="text-[14.5px] leading-relaxed text-ink2" dangerouslySetInnerHTML={{ __html: sim.lede }} />

        {/* ------------------------- the appropriation ------------------------- */}
        <div className="mt-4 rounded-lg border border-rule2 bg-ground p-3.5">
          <div className="flex items-baseline gap-2">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.13em] text-muted">{sim.budgetLabel}</p>
            <p className="ml-auto font-mono text-[12px] tabular-nums text-ink">{money(sim.budget)}</p>
          </div>

          <div className="mt-2.5 flex h-3 overflow-hidden rounded-full bg-sunk" role="img" aria-label={`De ${money(sim.budget)} apropiados: ${money(spent)} gastados, ${money(committed)} comprometidos, ${money(available)} disponibles.`}>
            <span data-bar className="block bg-seal" style={{ width: `${(spent / sim.budget) * 100}%` }} />
            <span
              data-bar
              className="block bg-seal/40 bg-[repeating-linear-gradient(45deg,rgb(var(--seal)/0.55)_0_4px,transparent_4px_8px)]"
              style={{ width: `${(committed / sim.budget) * 100}%` }}
            />
          </div>

          <dl className="mt-2.5 grid grid-cols-3 gap-2">
            {[
              ['Gastado', spent, 'text-seal'],
              ['Comprometido', committed, 'text-muted'],
              ['Disponible', available, 'text-ok'],
            ].map(([label, value, tone]) => (
              <div key={label as string}>
                <dt className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">{label as string}</dt>
                <dd className={cn('font-mono text-[13px] tabular-nums', tone as string)}>{money(value as number)}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ------------------------------ the rail ---------------------------- */}
        <ol className="mt-4 flex gap-1.5">
          {sim.steps.map((s, i) => (
            <li key={s.tab} className="flex-1">
              <button
                onClick={() => setStep(i)}
                aria-current={i === step}
                className={cn(
                  'flex min-h-[44px] w-full flex-col items-center justify-center gap-1 rounded-lg border px-1 py-1.5',
                  i === step
                    ? 'border-seal bg-sealsoft text-seal'
                    : i < step
                      ? 'border-rule2 bg-sheet text-ink2'
                      : 'border-rule bg-sheet text-muted',
                )}
              >
                <span className="font-mono text-[10px] font-bold tabular-nums">{i + 1}</span>
                <span className="text-[9.5px] leading-none">{s.tab}</span>
              </button>
            </li>
          ))}
        </ol>

        {/* --------------------------- the current step ------------------------ */}
        {current ? (
          <div className="mt-4">
            <h5 className="font-display text-[17px] leading-tight">{current.head}</h5>
            <p
              className="mt-1.5 text-[14.5px] leading-relaxed text-ink2"
              dangerouslySetInnerHTML={{ __html: current.narrative }}
            />
            <div className="mt-3.5">
              <Entry lines={current.entry} tone="seal" head />
            </div>
            <p className="mt-3 border-l-[3px] border-seal pl-3 text-[13.5px] leading-relaxed text-ink2">
              {current.takeaway}
            </p>
          </div>
        ) : (
          <p className="mt-4 text-[14.5px] leading-relaxed text-muted">
            Nada se ha registrado todavía. Avanza un paso para ver qué cuenta se mueve y por qué.
          </p>
        )}

        {/* ------------------------------ the ledger --------------------------- */}
        <p className="mt-6 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">El mayor, en vivo</p>
        <div className="mt-2 flex flex-col gap-2.5">
          {rows.map((r) => (
            <TAccount key={r.acc.name} row={r} step={step} />
          ))}
        </div>

        {done && (
          <p className="mt-5 rounded-lg border border-ok bg-oksoft p-3.5 text-[14px] leading-relaxed text-ink2">
            {sim.close}
          </p>
        )}

        {/* ------------------------------ the controls ------------------------- */}
        <div className="mt-5 flex gap-2.5">
          <button
            onClick={() => setStep((s) => s - 1)}
            disabled={!started}
            className={cn(
              'flex-none rounded-lg border border-rule2 bg-sheet px-4 py-2.5 text-[14px] font-bold',
              !started && 'opacity-40',
            )}
          >
            ‹ Atrás
          </button>
          {done ? (
            <button
              onClick={() => setStep(-1)}
              className="flex-1 rounded-lg border border-rule2 bg-sheet px-4 py-2.5 text-[14px] font-bold"
            >
              Empezar de nuevo
            </button>
          ) : (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="flex-1 rounded-lg bg-seal px-4 py-2.5 text-[14px] font-bold text-sheet"
            >
              {started ? 'Siguiente paso ›' : 'Emitir la orden de compra ›'}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

/* A T-account, drawn as one. Debits left of the rule, credits right,
   and the balance called out in the account's normal side. */
function TAccount({ row, step }: { row: ReturnType<typeof replay>[number]; step: number }) {
  const { acc, posts, balance } = row
  const open = acc.opening ?? 0
  const debits = posts.filter((p) => p.side === 'D')
  const credits = posts.filter((p) => p.side === 'H')
  const rowsN = Math.max(debits.length, credits.length, 1)

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border',
        acc.budgetary ? 'border-dashed border-rule2 bg-ground' : 'border-rule bg-sheet',
      )}
    >
      <div className="flex items-baseline gap-2 border-b border-rule px-3 py-1.5">
        <span className="font-mono text-[11px] tracking-tight text-ink">{acc.name}</span>
        <span className="text-[10.5px] text-muted">{acc.gloss}</span>
        {acc.budgetary && (
          <span className="ml-auto flex-none font-mono text-[8.5px] uppercase tracking-[0.12em] text-muted">
            presupuestaria
          </span>
        )}
      </div>

      {open > 0 && (
        <p className="border-b border-rule px-3 py-1 font-mono text-[10px] tabular-nums text-muted">
          saldo inicial {money(open)}
        </p>
      )}

      <div className="grid grid-cols-2 divide-x divide-rule2">
        {[debits, credits].map((side, si) => (
          <div key={si} className="px-3 py-1.5">
            <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-muted">
              {si === 0 ? 'Debe' : 'Haber'}
            </p>
            {Array.from({ length: rowsN }).map((_, i) => {
              const p = side[i]
              return (
                <p
                  key={i}
                  {...(p && p.step === step ? { 'data-fresh': true } : {})}
                  className={cn(
                    'font-mono text-[12px] tabular-nums leading-[1.5]',
                    !p ? 'text-transparent' : p.step === step ? 'font-bold text-seal' : 'text-ink2',
                  )}
                >
                  {p ? money(p.amount) : '·'}
                </p>
              )
            })}
          </div>
        ))}
      </div>

      <div className="flex items-baseline gap-2 border-t border-rule2 px-3 py-1.5">
        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">Saldo</span>
        <span
          className={cn(
            'ml-auto font-mono text-[12.5px] font-bold tabular-nums',
            balance === 0 ? 'text-muted' : 'text-ink',
          )}
        >
          {money(balance)}
        </span>
      </div>
    </div>
  )
}
