import type { Posting } from '@/lib/types'
import { cn } from '@/lib/utils'

/* One way of drawing a journal entry, used by the simulator, the
   guided problem and the cheat sheet alike. Debits sit flush left and
   credits are indented — the convention a grader looks for, and the
   only visual cue that survives being read aloud, so the side is also
   spelled out for a screen reader.

   Auto table layout, not fixed: the amounts are set `nowrap` so their
   columns size to the widest figure, and the account name is given
   `width: 100%` so it absorbs every remaining pixel. Fixed layout
   ignored the width utilities, split the table into equal thirds, and
   wrapped "Allowance for Uncollectible Current Taxes" over seven
   lines on a phone. */

/* Grouped with a non-breaking space, the way the prose writes numbers.
   A ledger reading $26,400,000 under a sentence reading $26 400 000
   looks like two different figures. */
export const money = (n: number) => '$' + n.toLocaleString('es-MX').replace(/,/g, ' ')

export function Entry({
  lines,
  tone = 'plain',
  compact,
  head,
}: {
  lines: Posting[]
  tone?: 'plain' | 'seal' | 'ok' | 'no'
  compact?: boolean
  /* Draws the Debe / Haber column heads inside this table, where they
     can actually line up with the columns they name. */
  head?: boolean
}) {
  const ring = {
    plain: 'border-rule bg-sheet',
    seal: 'border-seal bg-sealsoft',
    ok: 'border-ok bg-oksoft',
    no: 'border-no bg-nosoft',
  }[tone]
  const amount = cn(
    'whitespace-nowrap py-2 text-right align-top font-mono tabular-nums',
    compact ? 'text-[10.5px]' : 'text-[12px]',
  )

  return (
    <table className={cn('w-full border-collapse overflow-hidden rounded-lg border', ring)}>
      <caption className="sr-only">Asiento de diario</caption>
      {head && (
        <thead>
          <tr className="border-b border-rule">
            <th className="w-full py-1 pl-3" />
            <th scope="col" className="whitespace-nowrap py-1 pr-2 text-right font-mono text-[9px] font-normal uppercase tracking-[0.13em] text-muted">
              Debe
            </th>
            <th scope="col" className="whitespace-nowrap py-1 pr-3 text-right font-mono text-[9px] font-normal uppercase tracking-[0.13em] text-muted">
              Haber
            </th>
          </tr>
        </thead>
      )}
      <tbody>
        {lines.map((l, i) => (
          <tr key={i} className={cn(i && 'border-t border-rule')}>
            <th
              scope="row"
              className={cn(
                /* 100% is the standard trick for "take whatever the
                   other columns do not need". */
                'w-full py-2 pr-2 text-left align-top font-normal leading-snug',
                compact ? 'text-[12.5px]' : 'text-[13.5px]',
                l.side === 'D' ? 'pl-3' : 'pl-6',
              )}
            >
              <span className="sr-only">{l.side === 'D' ? 'Debe: ' : 'Haber: '}</span>
              {l.account}
              {l.gloss && <i className="ml-1 font-mono text-[10.5px] not-italic text-muted">{l.gloss}</i>}
            </th>
            <td className={cn(amount, 'pr-2', l.side === 'D' ? 'text-ink' : 'text-transparent')}>
              {l.side === 'D' ? money(l.amount) : '·'}
            </td>
            <td className={cn(amount, 'pr-3', l.side === 'H' ? 'text-ink' : 'text-transparent')}>
              {l.side === 'H' ? money(l.amount) : '·'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
