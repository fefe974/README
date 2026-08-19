import type { Posting } from './types'

/* Data for the interactive simulators. A step carries only its
   journal entry; every balance the simulator shows is replayed from
   those entries at render time. Nothing is written down twice, so a
   T-account can never disagree with the entry that produced it. */

export type SimAccount = {
  name: string
  gloss: string
  normal: 'D' | 'H'
  /* Balance carried in before the simulation starts. Cash is not born
     at zero on the day a purchase order is signed — showing it that
     way would make the payment look like an overdraft. */
  opening?: number
  /* Budgetary accounts are drawn apart from the actual ones: the two
     systems run side by side and never mix. */
  budgetary?: boolean
}

export type SimStep = {
  tab: string
  head: string
  narrative: string
  entry: Posting[]
  takeaway: string
}

export type Sim = {
  title: string
  lede: string
  /* The appropriation the spending is measured against. */
  budgetLabel: string
  budget: number
  accounts: SimAccount[]
  steps: SimStep[]
  /* Which accounts consume the appropriation, so the meter is derived
     rather than hand-maintained. */
  meter: { spent: string; committed: string }
  close: string
}

const ENCUMBRANCE: Sim = {
  title: 'Doce laptops para el sheriff',
  lede:
    'El presupuesto de Valle Verde aprobó <b>$60 000</b> para equipo del sheriff. Sigue el dinero desde que se firma la orden hasta que se paga la factura.',
  budgetLabel: 'Appropriations · equipo del sheriff',
  budget: 60_000,
  meter: { spent: 'Expenditures', committed: 'Encumbrances' },
  accounts: [
    { name: 'Encumbrances', gloss: 'compromisos', normal: 'D', budgetary: true },
    { name: 'Encumbrances Outstanding', gloss: 'compromisos por surtir', normal: 'H', budgetary: true },
    { name: 'Expenditures', gloss: 'gastos del periodo', normal: 'D' },
    { name: 'Vouchers Payable', gloss: 'cuentas por pagar', normal: 'H' },
    { name: 'Cash', gloss: 'efectivo', normal: 'D', opening: 2_400_000 },
  ],
  steps: [
    {
      tab: 'Orden',
      head: 'Se firma la orden de compra',
      narrative:
        'El condado ordena 12 laptops a $4 000 cada una. Todavía no llega ninguna y no se debe un peso, pero el dinero ya <b>no está disponible</b> para nada más.',
      entry: [
        { account: 'Encumbrances', side: 'D', amount: 48_000, gloss: 'compromisos' },
        { account: 'Encumbrances Outstanding', side: 'H', amount: 48_000 },
      ],
      takeaway:
        'Un encumbrance no es un gasto: es una reserva. Reconoce que la apropiación ya está comprometida antes de que exista obligación legal de pagar.',
    },
    {
      tab: '8 llegan',
      head: 'Llegan 8 laptops, y la factura no cuadra',
      narrative:
        'Llegan 8 de las 12. La factura dice <b>$32 400</b>, no los $32 000 que se estimaron. Se revierte el compromiso al precio <em>estimado</em> y se registra el gasto al precio <em>real</em>.',
      entry: [
        { account: 'Encumbrances Outstanding', side: 'D', amount: 32_000 },
        { account: 'Encumbrances', side: 'H', amount: 32_000 },
        { account: 'Expenditures', side: 'D', amount: 32_400, gloss: 'gastos' },
        { account: 'Vouchers Payable', side: 'H', amount: 32_400 },
      ],
      takeaway:
        'Aquí está el error clásico: la reversa va al estimado ($32 000) y el gasto al real ($32 400). Nunca se revierte por el importe de la factura.',
    },
    {
      tab: '4 llegan',
      head: 'Llegan las 4 restantes',
      narrative:
        'Se surte el resto de la orden. La factura es de <b>$16 300</b> contra un estimado de $16 000. Queda cerrado el compromiso: Encumbrances vuelve a cero.',
      entry: [
        { account: 'Encumbrances Outstanding', side: 'D', amount: 16_000 },
        { account: 'Encumbrances', side: 'H', amount: 16_000 },
        { account: 'Expenditures', side: 'D', amount: 16_300 },
        { account: 'Vouchers Payable', side: 'H', amount: 16_300 },
      ],
      takeaway:
        'Con la orden surtida por completo, las dos cuentas presupuestarias quedan en cero. Solo sobrevive el gasto real acumulado.',
    },
    {
      tab: 'Pago',
      head: 'Se pagan las facturas',
      narrative:
        'Tesorería paga los <b>$48 700</b> facturados. Fíjate en lo que <em>no</em> cambia: el gasto ya estaba registrado desde que llegó la mercancía.',
      entry: [
        { account: 'Vouchers Payable', side: 'D', amount: 48_700 },
        { account: 'Cash', side: 'H', amount: 48_700 },
      ],
      takeaway:
        'El pago no crea el gasto. Bajo base modificada, el gasto nació cuando se incurrió la obligación del fondo — al recibir los bienes, no al firmar el cheque.',
    },
  ],
  close:
    'De los $60 000 apropiados se gastaron $48 700 y no quedó nada comprometido. Los $11 300 restantes son el saldo disponible que el sheriff todavía podría ejercer antes del cierre.',
}

export const SIMS: Record<string, Sim> = { encumbrance: ENCUMBRANCE }

/* Replays every entry up to and including `through`, and returns each
   account's postings with its running balance in its normal side. */
export function replay(sim: Sim, through: number) {
  return sim.accounts.map((acc) => {
    const posts: { step: number; side: 'D' | 'H'; amount: number }[] = []
    sim.steps.slice(0, through + 1).forEach((st, si) => {
      st.entry
        .filter((l) => l.account === acc.name)
        .forEach((l) => posts.push({ step: si, side: l.side, amount: l.amount }))
    })
    const open = acc.opening ?? 0
    const d = posts.filter((p) => p.side === 'D').reduce((a, p) => a + p.amount, 0)
    const h = posts.filter((p) => p.side === 'H').reduce((a, p) => a + p.amount, 0)
    const moved = acc.normal === 'D' ? d - h : h - d
    return { acc, posts, debit: d, credit: h, balance: open + moved }
  })
}
