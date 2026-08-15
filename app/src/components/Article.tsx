import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import type { Article as ArticleT } from '@/lib/types'
import { Figure } from '@/lib/figures/index'
import { Quiz } from './Quiz'
import { Stamp } from './Stamp'
import { Card, CardContent } from './ui/card'
import { cn } from '@/lib/utils'

/* An article runs as steps: one idea per screen, then a final check.
   Index `steps.length` is the check step. */

export function Article({
  article,
  index,
  total,
  answers,
  onAnswer,
  onBack,
  onNext,
}: {
  article: ArticleT
  index: number
  total: number
  answers: Record<number, number>
  onAnswer: (qi: number, oi: number) => void
  onBack: () => void
  onNext: (() => void) | null
}) {
  const answered = article.quiz.every((_, i) => answers[i] != null)
  const last = article.steps.length
  // Reopening a finished article lands on the check, not back at step 1.
  const [step, setStep] = useState(answered ? last : 0)
  const pane = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setStep(answered ? last : 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article.id])

  useEffect(() => {
    if (!pane.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('[data-anim]', { opacity: 0, y: 10, duration: 0.32, stagger: 0.05, ease: 'power2.out' })
    }, pane)
    return () => ctx.revert()
  }, [step, article.id])

  const goto = (n: number) => {
    setStep(n)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const onCheck = step === last
  const current = onCheck ? null : article.steps[step]
  const right = article.quiz.filter((q, i) => answers[i] === q.a).length

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <button
          onClick={() => (step === 0 ? onBack() : goto(step - 1))}
          className="font-mono text-[13px] tracking-wide text-muted hover:text-ink"
        >
          {step === 0 ? '‹ Los cuatro artículos' : '‹ Atrás'}
        </button>
        <span className="ml-auto font-mono text-[11px] tracking-wide text-muted">
          {article.roman} · {onCheck ? 'comprobación' : `${step + 1} de ${last}`}
        </span>
      </div>

      {/* Step rail — how much of this article is left, at a glance. */}
      <div className="mb-6 flex gap-1" aria-hidden="true">
        {Array.from({ length: last + 1 }).map((_, i) => (
          <span
            key={i}
            className={cn('h-[3px] flex-1 rounded-full', i <= step ? 'bg-seal' : 'bg-sunk')}
          />
        ))}
      </div>

      <div ref={pane}>
        {step === 0 && (
          <div className="mb-7">
            <div data-anim className="flex items-baseline gap-2.5">
              <span className="font-display text-[34px] leading-none text-seal">{article.roman}</span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-muted">
                Artículo {index + 1} de {total}
              </span>
            </div>
            <h2 data-anim className="mt-2 text-balance font-display text-[27px] leading-[1.14] tracking-tight">
              {article.title}
            </h2>
            <p data-anim className="mt-1.5 font-mono text-[12px] leading-snug text-muted">{article.en}</p>
            <p data-anim className="mt-4 border-l-[3px] border-seal pl-4 text-[16px] leading-relaxed text-ink2">
              {article.standfirst}
            </p>
          </div>
        )}

        {current && (
          <>
            <h3 data-anim className="text-balance font-display text-[22px] leading-tight">
              {current.head}
            </h3>
            <div data-anim className="prose-ch mt-3.5 text-[16px] leading-relaxed text-ink2">
              {current.blocks.map((b, i) => {
                if (b.k === 'p') return <p key={i} dangerouslySetInnerHTML={{ __html: b.t }} />
                if (b.k === 'fig') return <Figure key={i} id={b.id} cap={b.cap} />
                return (
                  <aside
                    key={i}
                    className={cn(
                      'mt-5 rounded-r-xl border-l-[3px] px-4 py-3.5',
                      b.tone === 'warn' ? 'border-no bg-nosoft' : 'border-seal bg-sealsoft',
                    )}
                  >
                    <b className={cn('mb-1 block font-display text-[16px]', b.tone === 'warn' ? 'text-no' : 'text-seal')}>
                      {b.head}
                    </b>
                    <span className="text-[15px] leading-relaxed" dangerouslySetInnerHTML={{ __html: b.t }} />
                  </aside>
                )
              })}
            </div>

            <button
              onClick={() => goto(step + 1)}
              className="mt-8 w-full rounded-xl bg-seal px-4 py-3.5 text-[15.5px] font-bold text-sheet shadow-[var(--shadow-sm)]"
            >
              {step + 1 === last ? 'Comprobar lo aprendido' : 'Continuar'}
            </button>
          </>
        )}

        {onCheck && (
          <>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-muted">Términos de este artículo</p>
            <div className="mt-3 overflow-hidden rounded-xl border border-rule">
              {article.terms.map(([en, es], i) => (
                <div key={en} className={cn('bg-sheet p-3.5', i && 'border-t border-rule')}>
                  <dt className="font-mono text-[12.5px] tracking-tight text-seal">{en}</dt>
                  <dd className="mt-0.5 text-[14.5px] leading-snug text-ink2">{es}</dd>
                </div>
              ))}
            </div>

            <hr className="my-8 border-rule" />

            <p className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-muted">Comprueba antes de seguir</p>
            <h3 className="mb-5 mt-1.5 font-display text-[20px] leading-tight">
              {article.quiz.length} preguntas del final del capítulo
            </h3>
            <Quiz key={article.id} idPrefix={article.id} questions={article.quiz} answers={answers} onAnswer={onAnswer} />

            {answered && (
              <>
                <Card className="mt-7 overflow-hidden">
                  <CardContent className="flex items-center gap-4 p-5">
                    <Stamp roman={article.roman} animate />
                    <div className="min-w-0">
                      <p className="font-display text-[19px] leading-tight">
                        {right} de {article.quiz.length} correctas
                      </p>
                      <p className="mt-0.5 text-[14px] leading-snug text-muted">
                        {right === article.quiz.length
                          ? 'Sin fallos. El artículo queda certificado.'
                          : 'Queda certificado, pero relee lo que fallaste antes de seguir.'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-3 flex flex-col gap-2">
                  {onNext && (
                    <button
                      onClick={onNext}
                      className="w-full rounded-xl bg-seal px-4 py-3.5 text-[15.5px] font-bold text-sheet shadow-[var(--shadow-sm)]"
                    >
                      Siguiente artículo
                    </button>
                  )}
                  <button
                    onClick={onBack}
                    className="w-full rounded-xl border border-rule2 bg-sheet px-4 py-3.5 text-[15.5px] font-bold"
                  >
                    Volver a los artículos
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
