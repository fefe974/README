import * as RadioGroup from '@radix-ui/react-radio-group'
import type { Question } from '@/lib/content'
import { cn } from '@/lib/utils'

/* A radio group rather than a row of buttons: one answer per question,
   so the native role gives arrow-key navigation and a correct
   accessible name and state for free. */

export function Quiz({
  questions,
  answers,
  onAnswer,
  idPrefix,
  labelPrefix = 'Pregunta',
}: {
  questions: Question[]
  answers: Record<number, number>
  onAnswer: (qi: number, oi: number) => void
  /* Namespaces the React keys. Without it, two different question sets
     rendered at the same position reuse the same Radix groups and the
     previous set's selection bleeds through. */
  idPrefix: string
  labelPrefix?: string
}) {
  return (
    <div className="flex flex-col gap-6">
      {questions.map((q, qi) => {
        const pick = answers[qi]
        const done = pick != null
        return (
          <div key={`${idPrefix}-${qi}`}>
            <p className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted">
              {labelPrefix} {qi + 1} · {q.src}
            </p>
            <p className="mb-3 text-[15.5px] leading-snug" dangerouslySetInnerHTML={{ __html: q.q }} />
            <RadioGroup.Root
              key={`${idPrefix}-${qi}`}
              value={done ? String(pick) : undefined}
              onValueChange={(v) => !done && onAnswer(qi, Number(v))}
              disabled={done}
              className="flex flex-col gap-1.5"
              aria-label={q.q.replace(/<[^>]+>/g, '')}
            >
              {q.o.map((o, oi) => {
                const state = !done ? null : oi === q.a ? 'ok' : oi === pick ? 'no' : null
                return (
                  <RadioGroup.Item
                    key={`${idPrefix}-${qi}-${oi}`}
                    value={String(oi)}
                    className={cn(
                      'flex items-start gap-3 rounded-lg border px-3.5 py-3 text-left text-[15px] leading-snug transition-colors',
                      'border-rule bg-sheet',
                      !done && 'hover:border-rule2',
                      state === 'ok' && 'border-ok bg-oksoft',
                      state === 'no' && 'border-no bg-nosoft',
                    )}
                  >
                    <span
                      className={cn(
                        'mt-px font-mono text-[12px] font-medium',
                        state === 'ok' ? 'text-ok' : state === 'no' ? 'text-no' : 'text-muted',
                      )}
                    >
                      {'ABCD'[oi]}
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: o }} />
                  </RadioGroup.Item>
                )
              })}
            </RadioGroup.Root>
            {done && (
              <div
                role="status"
                className={cn(
                  'mt-2 rounded-lg border px-3.5 py-3 text-[14.5px] leading-relaxed',
                  pick === q.a ? 'border-ok/40 bg-oksoft text-ink' : 'border-no/40 bg-nosoft text-ink',
                )}
              >
                <span
                  className={cn(
                    'mb-1 block font-mono text-[10.5px] uppercase tracking-[0.1em]',
                    pick === q.a ? 'text-ok' : 'text-no',
                  )}
                >
                  {pick === q.a ? 'Correcto' : 'Revisa esto'}
                </span>
                <span dangerouslySetInnerHTML={{ __html: q.w }} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
