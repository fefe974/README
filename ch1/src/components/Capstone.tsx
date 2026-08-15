import { useState } from 'react'
import {
  FINAL, GRID_COLS, GRID_ROWS, MATCH_BINS, MATCH_ITEMS, SORT_BINS, SORT_ITEMS,
} from '@/lib/content'
import { Quiz } from './Quiz'
import { Card, CardContent } from './ui/card'
import { Progress } from './ui/progress'
import { cn } from '@/lib/utils'

export type CapState = {
  sort: Record<number, number>
  match: Record<number, string>
  grid: Record<string, 'Y' | 'N'>
  gridChecked: boolean
  final: Record<number, number>
}

export const emptyCap = (): CapState => ({ sort: {}, match: {}, grid: {}, gridChecked: false, final: {} })

const btn = 'w-full rounded-xl border border-rule2 bg-sheet px-4 py-3 text-[15px] font-bold'

export function Capstone({
  state,
  set,
  locked,
  doneCount,
  onGoArticles,
}: {
  state: CapState
  set: (fn: (s: CapState) => CapState) => void
  locked: boolean
  doneCount: number
  onGoArticles: () => void
}) {
  const [sortSel, setSortSel] = useState<number | null>(null)
  const [matchSel, setMatchSel] = useState<number | null>(null)

  if (locked) {
    return (
      <div>
        <p className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-muted">Cierre del caso</p>
        <h2 className="mt-1.5 font-display text-[26px] leading-tight">Todavía sin abrir</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">
          Certifica los cuatro artículos para abrir el expediente. Llevas {doneCount} de 4.
        </p>
        <Card className="mt-5">
          <CardContent className="p-4">
            <div className="mb-2 flex items-baseline justify-between text-[13px] text-muted">
              <span>Artículos certificados</span>
              <span className="font-mono text-ink">{doneCount} / 4</span>
            </div>
            <Progress value={(doneCount / 4) * 100} />
          </CardContent>
        </Card>
        <button onClick={onGoArticles} className="mt-4 w-full rounded-xl bg-seal px-4 py-3.5 text-[15.5px] font-bold text-sheet">
          Continuar
        </button>
      </div>
    )
  }

  const sortLeft = SORT_ITEMS.map((it, i) => [it, i] as const).filter(([, i]) => state.sort[i] == null)
  const matchLeft = MATCH_ITEMS.map((it, i) => [it, i] as const).filter(([, i]) => state.match[i] == null)
  const gridFilled = Object.keys(state.grid).length
  const gridTotal = GRID_ROWS.length * GRID_COLS.length

  const t1 = sortLeft.length === 0
  const t2 = state.gridChecked
  const t3 = matchLeft.length === 0
  const t4 = FINAL.every((_, i) => state.final[i] != null)
  const tasksDone = [t1, t2, t3, t4].filter(Boolean).length

  const score =
    SORT_ITEMS.filter((it, i) => state.sort[i] === it[1]).length +
    GRID_ROWS.reduce((a, r, ri) => a + r[1].filter((ans, ci) => state.grid[`${ri}-${ci}`] === ans).length, 0) +
    MATCH_ITEMS.filter((it, i) => state.match[i] === it[1]).length +
    FINAL.filter((q, i) => state.final[i] === q.a).length
  const total = SORT_ITEMS.length + gridTotal + MATCH_ITEMS.length + FINAL.length

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-rule bg-sheet shadow-[var(--shadow)]">
        <div className="bg-seal px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-sheet">
          Cierre · problemas 1–17 y 1–18
        </div>
        <div className="p-5">
          <h2 className="font-display text-[26px] leading-tight">Ahora resuélvelo tú</h2>
          <p className="mt-2 text-[15.5px] leading-relaxed text-ink2">
            Cuatro tareas, sin mini-clases y sin pistas antes de responder. Si te trabas, el glosario sigue ahí.
          </p>
        </div>
      </div>

      {/* -------- 1 · clasificar el ACFR -------- */}
      <Section n="1" src="Problema 1–17" title="Arma el ACFR de la ciudad" hint="Toca un elemento, luego la sección donde va.">
        <div className="flex flex-wrap gap-2">
          {sortLeft.map(([it, i]) => (
            <Chip key={i} on={sortSel === i} onClick={() => setSortSel(sortSel === i ? null : i)}>
              {it[0]}
            </Chip>
          ))}
          {sortLeft.length === 0 && <p className="text-[14px] text-muted">Todos clasificados.</p>}
        </div>
        <div className="mt-4 flex flex-col gap-2.5">
          {SORT_BINS.map((b, bi) => (
            <Bin
              key={b}
              armed={sortSel != null}
              label={b}
              eyebrow={`Sección ${bi + 1}`}
              onClick={() => {
                if (sortSel == null) return
                const s = sortSel
                set((st) => ({ ...st, sort: { ...st.sort, [s]: bi } }))
                setSortSel(null)
              }}
              held={SORT_ITEMS.map((it, i) => [it, i] as const)
                .filter(([, i]) => state.sort[i] === bi)
                .map(([it, i]) => ({ key: i, label: it[0], ok: it[1] === bi }))}
            />
          ))}
        </div>
        {t1 && (
          <Result
            text={`${SORT_ITEMS.filter((it, i) => state.sort[i] === it[1]).length} de ${SORT_ITEMS.length} bien colocados`}
            note="La carta de transmisión es introductoria; el informe del auditor es financiero. Esos dos son los que más se cambian de lugar."
            onRetry={() => { set((st) => ({ ...st, sort: {} })); setSortSel(null) }}
          />
        )}
      </Section>

      {/* -------- 2 · rejilla comparativa -------- */}
      <Section
        n="2"
        src="Problema 1–18"
        title="Gobierno, NFP privada y empresa"
        hint="Marca Y si la característica aplica a ese tipo de entidad, N si no. Toca de nuevo para alternar."
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[330px] border-collapse text-[14px]">
            <thead>
              <tr>
                <th className="w-1/2 pb-2.5 pr-2 text-left font-mono text-[10px] font-normal uppercase tracking-wider text-muted">
                  Característica
                </th>
                {GRID_COLS.map((c) => (
                  <th key={c} className="px-1 pb-2.5 align-bottom font-mono text-[10px] font-normal uppercase tracking-wider text-muted">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GRID_ROWS.map((r, ri) => (
                <tr key={ri}>
                  <td className="border-t border-rule py-2 pr-2 leading-snug text-ink2">{r[0]}</td>
                  {r[1].map((ans, ci) => {
                    const k = `${ri}-${ci}`
                    const v = state.grid[k]
                    const wrong = state.gridChecked && v !== ans
                    return (
                      <td key={ci} className="border-t border-rule px-1 py-2 text-center">
                        <button
                          aria-label={`${r[0]} — ${GRID_COLS[ci]}: ${v ?? 'sin marcar'}`}
                          disabled={state.gridChecked}
                          onClick={() =>
                            set((st) => {
                              const g = { ...st.grid }
                              if (g[k] === 'Y') g[k] = 'N'
                              else if (g[k] === 'N') delete g[k]
                              else g[k] = 'Y'
                              return { ...st, grid: g }
                            })
                          }
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
        {!state.gridChecked ? (
          <button
            disabled={gridFilled < gridTotal}
            onClick={() => set((st) => ({ ...st, gridChecked: true }))}
            className={cn(btn, 'mt-4', gridFilled < gridTotal && 'opacity-45')}
          >
            {gridFilled < gridTotal ? `Faltan ${gridTotal - gridFilled} casillas` : 'Comprobar la rejilla'}
          </button>
        ) : (
          <Result
            text={`${GRID_ROWS.reduce((a, r, ri) => a + r[1].filter((ans, ci) => state.grid[`${ri}-${ci}`] === ans).length, 0)} de ${gridTotal} correctas`}
            note="Mira la fila del statement of activities: lo preparan tanto el gobierno como la NFP. Ahí está el corazón del problema 1–18."
            onRetry={() => set((st) => ({ ...st, grid: {}, gridChecked: false }))}
          />
        )}
      </Section>

      {/* -------- 3 · jurisdicción -------- */}
      <Section n="3" src="Problema 1–21" title="¿Quién le fija las normas a quién?" hint="Toca la entidad, luego su cuerpo normativo.">
        <div className="flex flex-wrap gap-2">
          {matchLeft.map(([it, i]) => (
            <Chip key={i} on={matchSel === i} onClick={() => setMatchSel(matchSel === i ? null : i)}>
              {it[0]}
            </Chip>
          ))}
          {matchLeft.length === 0 && <p className="text-[14px] text-muted">Todas asignadas.</p>}
        </div>
        <div className="mt-4 flex flex-col gap-2.5">
          {MATCH_BINS.map(([code, name]) => (
            <Bin
              key={code}
              armed={matchSel != null}
              label={name}
              eyebrow={code}
              onClick={() => {
                if (matchSel == null) return
                const s = matchSel
                set((st) => ({ ...st, match: { ...st.match, [s]: code } }))
                setMatchSel(null)
              }}
              held={MATCH_ITEMS.map((it, i) => [it, i] as const)
                .filter(([, i]) => state.match[i] === code)
                .map(([it, i]) => ({ key: i, label: it[0], ok: it[1] === code }))}
            />
          ))}
        </div>
        {t3 && (
          <Result
            text={`${MATCH_ITEMS.filter((it, i) => state.match[i] === it[1]).length} de ${MATCH_ITEMS.length} correctas`}
            note="La Metropolitan Washington Airports Authority es un cuerpo público creado por pacto interestatal → GASB. El AICPA y el Met son NFP privadas → FASB."
            onRetry={() => { set((st) => ({ ...st, match: {} })); setMatchSel(null) }}
          />
        )}
      </Section>

      {/* -------- 4 · preguntas cruzadas -------- */}
      <Section n="4" src="Cruza los cuatro artículos" title="El caso completo" hint="Seis preguntas que mezclan los cuatro conceptos.">
        <Quiz
          idPrefix="final"
          questions={FINAL}
          answers={state.final}
          onAnswer={(qi, oi) => set((st) => ({ ...st, final: { ...st.final, [qi]: oi } }))}
        />
      </Section>

      <div className="mt-8">
        {tasksDone < 4 ? (
          <Card>
            <CardContent className="p-4">
              <div className="mb-2 flex items-baseline justify-between text-[13px] text-muted">
                <span>Tareas del cierre</span>
                <span className="font-mono text-ink">{tasksDone} / 4</span>
              </div>
              <Progress value={(tasksDone / 4) * 100} />
            </CardContent>
          </Card>
        ) : (
          <div className="overflow-hidden rounded-xl border border-rule bg-sheet shadow-[var(--shadow)]">
            <div className="bg-seal px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-sheet">
              Expediente cerrado
            </div>
            <div className="px-5 py-7 text-center">
              <p className="font-display text-[52px] leading-none text-seal">{Math.round((score / total) * 100)}%</p>
              <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.13em] text-muted">
                {score} de {total} respuestas correctas
              </p>
              <p className="mx-auto mt-5 max-w-read text-[15px] leading-relaxed text-ink2">
                Ya puedes responder las cuatro preguntas del capítulo: por qué un gobierno no se mide con utilidad neta,
                de dónde viene su obligación de rendir cuentas, qué tablero normativo le toca a cada entidad, y qué
                contiene realmente un ACFR.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------ bits */

function Section({
  n, src, title, hint, children,
}: { n: string; src: string; title: string; hint: string; children: React.ReactNode }) {
  return (
    <section className="mt-9 border-t border-rule pt-7">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-muted">
        Tarea {n} · {src}
      </p>
      <h3 className="mt-1.5 font-display text-[21px] leading-tight">{title}</h3>
      <p className="mb-4 mt-1 text-[14px] leading-snug text-muted">{hint}</p>
      {children}
    </section>
  )
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={cn(
        'rounded-full border px-3.5 py-2 text-[14px] leading-tight transition-colors',
        on ? 'border-seal bg-sealsoft font-bold text-seal' : 'border-rule2 bg-sheet',
      )}
    >
      {children}
    </button>
  )
}

function Bin({
  armed, label, eyebrow, onClick, held,
}: {
  armed: boolean
  label: string
  eyebrow: string
  onClick: () => void
  held: { key: number; label: string; ok: boolean }[]
}) {
  return (
    <button
      onClick={onClick}
      /* Without this the accessible name is the eyebrow, the label and
         every item already dropped in, read as one run-on string. */
      aria-label={`Colocar en ${label}`}
      className={cn(
        'w-full rounded-xl border-[1.5px] bg-sunk px-3.5 py-3 text-left transition-colors',
        armed ? 'border-solid border-seal' : 'border-dashed border-rule2',
      )}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{eyebrow}</span>
      <b className="block font-display text-[16px] leading-tight">{label}</b>
      {held.length > 0 && (
        <span className="mt-2 flex flex-wrap gap-1.5">
          {held.map((h) => (
            <em
              key={h.key}
              className={cn(
                'rounded-md border bg-sheet px-2 py-1 text-[12.5px] not-italic',
                h.ok ? 'border-ok text-ok' : 'border-no text-no line-through',
              )}
            >
              {h.label}
            </em>
          ))}
        </span>
      )}
    </button>
  )
}

function Result({ text, note, onRetry }: { text: string; note: string; onRetry: () => void }) {
  return (
    <Card className="mt-4">
      <CardContent className="p-4 text-center">
        <p className="font-display text-[18px] leading-tight">{text}</p>
        <p className="mx-auto mt-1.5 max-w-read text-[14px] leading-snug text-muted">{note}</p>
        <button onClick={onRetry} className={cn(btn, 'mt-4')}>
          Intentar de nuevo
        </button>
      </CardContent>
    </Card>
  )
}
