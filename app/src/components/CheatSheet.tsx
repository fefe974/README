import { useMemo, useState } from 'react'
import type { EntryRef } from '@/lib/types'
import { Entry } from './Journal'
import { cn } from '@/lib/utils'

/* The reference the student actually wants open during an exam: every
   required entry of the chapter, in the order the year runs, filterable
   in one hand. Budgetary entries are marked, because the single most
   common mistake is posting one of them into the actual accounts. */

export function CheatSheet({ entries }: { entries: EntryRef[] }) {
  const [q, setQ] = useState('')
  const [only, setOnly] = useState<'todo' | 'presup' | 'real'>('todo')

  const groups = useMemo(() => {
    const needle = q.trim().toLowerCase()
    const hit = (e: EntryRef) =>
      (only === 'todo' || (only === 'presup') === !!e.budgetary) &&
      (!needle ||
        (e.when + ' ' + e.note + ' ' + e.group + ' ' + e.lines.map((l) => l.account + ' ' + (l.gloss ?? '')).join(' '))
          .toLowerCase()
          .includes(needle))

    const out: [string, EntryRef[]][] = []
    for (const e of entries.filter(hit)) {
      const last = out[out.length - 1]
      if (last && last[0] === e.group) last[1].push(e)
      else out.push([e.group, [e]])
    }
    return out
  }, [entries, q, only])

  const shown = groups.reduce((a, g) => a + g[1].length, 0)

  return (
    <div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar: encumbrance, nómina, cierre…"
        aria-label="Buscar en los asientos"
        className="w-full rounded-xl border border-rule bg-sheet px-4 py-3 text-[15.5px] text-ink placeholder:text-muted"
      />

      <div role="radiogroup" aria-label="Filtrar por tipo de cuenta" className="mt-2.5 flex gap-2">
        {(
          [
            ['todo', 'Todos'],
            ['presup', 'Presupuestarias'],
            ['real', 'Reales'],
          ] as const
        ).map(([v, label]) => (
          <button
            key={v}
            role="radio"
            aria-checked={only === v}
            onClick={() => setOnly(v)}
            className={cn(
              'min-h-[44px] flex-1 rounded-lg border px-3 py-2 text-[13px] font-bold',
              only === v ? 'border-seal bg-sealsoft text-seal' : 'border-rule bg-sheet text-muted',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
        {shown} {shown === 1 ? 'asiento' : 'asientos'}
      </p>

      {groups.map(([group, list]) => (
        <section key={group} className="mt-5">
          <h3 className="mb-2.5 border-b border-rule pb-1.5 font-display text-[18px] leading-tight">{group}</h3>
          <div className="flex flex-col gap-3">
            {list.map((e) => (
              <article key={e.id} className="overflow-hidden rounded-xl border border-rule bg-sheet shadow-[var(--shadow-sm)]">
                <div className="flex items-start gap-2 border-b border-rule bg-sunk px-3.5 py-2">
                  <p className="min-w-0 flex-1 text-[13.5px] font-bold leading-snug text-ink">{e.when}</p>
                  {e.budgetary && (
                    <span className="mt-px flex-none rounded border border-rule2 px-1.5 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-muted">
                      presupuestaria
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <Entry lines={e.lines} compact head />
                  <p
                    className="mt-2.5 text-[13.5px] leading-relaxed text-ink2"
                    dangerouslySetInnerHTML={{ __html: e.note }}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      {shown === 0 && <p className="py-6 text-[15px] text-muted">Sin coincidencias para «{q}».</p>}
    </div>
  )
}
