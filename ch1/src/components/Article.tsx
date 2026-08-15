import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { Article as ArticleT } from '@/lib/content'
import { Figure } from '@/lib/figures'
import { Quiz } from './Quiz'
import { Stamp } from './Stamp'
import { Card, CardContent } from './ui/card'

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
  const head = useRef<HTMLDivElement>(null)
  const answered = article.quiz.every((_, i) => answers[i] != null)
  const right = article.quiz.filter((q, i) => answers[i] === q.a).length

  // A short entrance on the article head only — one orchestrated moment
  // rather than effects scattered down the page.
  useEffect(() => {
    if (!head.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('[data-anim]', {
        opacity: 0,
        y: 12,
        duration: 0.4,
        stagger: 0.06,
        ease: 'power2.out',
      })
    }, head)
    return () => ctx.revert()
  }, [article.id])

  return (
    <div>
      <button onClick={onBack} className="mb-4 font-mono text-[13px] tracking-wide text-muted hover:text-ink">
        ‹ Los cuatro artículos
      </button>

      <div ref={head}>
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

      <div className="prose-ch mt-7 text-[16px] leading-relaxed text-ink2">
        {article.blocks.map((b, i) => {
          if (b.k === 'p') return <p key={i} dangerouslySetInnerHTML={{ __html: b.t }} />
          if (b.k === 'fig') return <Figure key={i} id={b.id} cap={b.cap} />
          return (
            <aside
              key={i}
              className={
                'mt-5 rounded-r-xl border-l-[3px] py-3.5 pl-4 pr-4 ' +
                (b.tone === 'warn' ? 'border-no bg-nosoft' : 'border-seal bg-sealsoft')
              }
            >
              <b className={'mb-1 block font-display text-[16px] ' + (b.tone === 'warn' ? 'text-no' : 'text-seal')}>
                {b.head}
              </b>
              <span className="text-[15px] leading-relaxed" dangerouslySetInnerHTML={{ __html: b.t }} />
            </aside>
          )
        })}
      </div>

      <hr className="my-8 border-rule" />

      <p className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-muted">Términos de este artículo</p>
      <div className="mt-3 overflow-hidden rounded-xl border border-rule">
        {article.terms.map(([en, es], i) => (
          <div key={en} className={'bg-sheet p-3.5 ' + (i ? 'border-t border-rule' : '')}>
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
      )}

      {answered && (
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
      )}
    </div>
  )
}
