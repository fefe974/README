import { CHAPTERS } from '@/lib/course'
import { SIMS, replay } from '@/lib/sims'
import { exampleFor } from '@/lib/examples'

let fail = 0
const bad = (m: string) => { console.log('  FALLA ' + m); fail++ }
const money = (n: number) => n.toLocaleString('es-MX')

for (const ch of CHAPTERS) {
  console.log(`\n=== Capítulo ${ch.num} · ${ch.name}`)

  // article quizzes
  for (const a of ch.articles) {
    a.quiz.forEach((q, i) => {
      if (q.a < 0 || q.a >= q.o.length) bad(`${a.id} quiz ${i}: índice ${q.a} fuera de ${q.o.length} opciones`)
      if (new Set(q.o).size !== q.o.length) bad(`${a.id} quiz ${i}: opciones duplicadas`)
    })
    // every step has an example, and its probe answers are in range
    a.steps.forEach((_, si) => {
      const ex = exampleFor(a.id, si)
      if (!ex) return bad(`${a.id} paso ${si}: sin ejemplo`)
      const p = ex.probe
      if (p.p === 'choice' && (p.answer < 0 || p.answer >= p.options.length))
        bad(`${a.id}-${si}: choice fuera de rango`)
      if (p.p === 'classify')
        p.items.forEach((it, k) => {
          if (it.answer < 0 || it.answer >= p.options.length) bad(`${a.id}-${si} item ${k}: classify fuera de rango`)
        })
      if (ex.steps.length === 0) bad(`${a.id}-${si}: sin razonamiento`)
    })
  }

  for (const t of ch.tasks) {
    if (t.kind === 'quiz')
      t.questions.forEach((q, i) => {
        if (q.a < 0 || q.a >= q.o.length) bad(`capstone quiz ${i}: índice fuera de rango`)
      })

    if (t.kind === 'entries') {
      console.log(`  problema guiado · ${t.entries.length} asientos`)
      t.entries.forEach((e) => {
        if (e.answer < 0 || e.answer >= e.options.length) bad(`asiento ${e.ref}: answer fuera de rango`)
        e.options.forEach((lines, oi) => {
          const d = lines.filter((l) => l.side === 'D').reduce((a, l) => a + l.amount, 0)
          const h = lines.filter((l) => l.side === 'H').reduce((a, l) => a + l.amount, 0)
          const mark = oi === e.answer ? '←' : ' '
          // A correct option MUST balance. A distractor that balances is fine
          // (many real mistakes do); one that doesn't is flagged so it is a
          // deliberate choice rather than a typo.
          if (oi === e.answer && d !== h) bad(`asiento ${e.ref} correcta: D ${money(d)} ≠ H ${money(h)}`)
          console.log(`    ${e.ref}${String.fromCharCode(97 + oi)} ${mark} D ${money(d).padStart(12)}  H ${money(h).padStart(12)} ${d === h ? '' : ' (no cuadra)'}`)
        })
      })
    }
  }

  if (ch.entries) {
    console.log(`  hoja de asientos · ${ch.entries.length}`)
    const ids = new Set<string>()
    ch.entries.forEach((e) => {
      if (ids.has(e.id)) bad(`hoja: id repetido ${e.id}`)
      ids.add(e.id)
      const d = e.lines.filter((l) => l.side === 'D').reduce((a, l) => a + l.amount, 0)
      const h = e.lines.filter((l) => l.side === 'H').reduce((a, l) => a + l.amount, 0)
      if (d !== h) bad(`hoja ${e.id} (${e.when}): D ${money(d)} ≠ H ${money(h)}`)
    })
  }
}

console.log('\n=== Simuladores')
for (const [id, sim] of Object.entries(SIMS)) {
  sim.steps.forEach((st, i) => {
    const d = st.entry.filter((l) => l.side === 'D').reduce((a, l) => a + l.amount, 0)
    const h = st.entry.filter((l) => l.side === 'H').reduce((a, l) => a + l.amount, 0)
    if (d !== h) bad(`${id} paso ${i}: D ${money(d)} ≠ H ${money(h)}`)
    const rows = replay(sim, i)
    const g = (n: string) => rows.find((r) => r.acc.name === n)!.balance
    const avail = sim.budget - g(sim.meter.spent) - g(sim.meter.committed)
    console.log(`  ${st.tab.padEnd(10)} gastado ${money(g(sim.meter.spent)).padStart(8)}  comprometido ${money(g(sim.meter.committed)).padStart(8)}  disponible ${money(avail).padStart(8)}`)
    if (avail < 0) bad(`${id} paso ${i}: saldo disponible negativo`)
  })
  // every account must end with a balance its normal side can carry
  replay(sim, sim.steps.length - 1).forEach((r) => {
    if (r.balance < 0) bad(`${id}: ${r.acc.name} termina con saldo contrario (${money(r.balance)})`)
  })
}

console.log(fail === 0 ? '\nTODO CUADRA' : `\n${fail} PROBLEMAS`)
if (fail) process.exit(1)
