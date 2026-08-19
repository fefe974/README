import type { ReactElement } from 'react'
import { Box, Defs, INK, MUT, NO, NOS, OK, OKS, RULE, SEAL, SEALS, SHEET, SUNK, svgProps } from './kit'

/* Figuras del capítulo 3. Las tres primeras dibujan analogías: el
   permiso, la reservación y los dos relojes. Una analogía sirve solo
   si la figura muestra la correspondencia término a término, así que
   cada una pone el mundo cotidiano arriba y la cuenta contable
   directamente debajo. */

/* ------------------------------------------------------------- I.a
   El presupuesto como permiso: la ley autoriza un tope, no un plan. */
function Permit() {
  return (
    <svg {...svgProps('El presupuesto de una empresa es un plan interno que la dirección puede cambiar cuando quiera. El de un gobierno es una ley aprobada por el cabildo: fija un tope que no se puede rebasar sin volver al cabildo.', 214)}>
      <Defs />
      <text x="4" y="12" fontSize="9.5" fontWeight="700" fill={MUT} letterSpacing="1">EMPRESA</text>
      <rect x="4" y="20" width="164" height="70" rx="7" fill={SHEET} stroke={RULE} strokeWidth="1.2" strokeDasharray="5 3" />
      <text x="86" y="42" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK}>Plan de gastos</text>
      <text x="86" y="58" textAnchor="middle" fontSize="9.5" fill={MUT}>lo aprueba la dirección</text>
      <text x="86" y="74" textAnchor="middle" fontSize="9.5" fill={MUT}>se cambia cuando conviene</text>
      <text x="86" y="106" textAnchor="middle" fontSize="10" fontWeight="700" fill={MUT}>vive en una hoja de cálculo</text>

      <text x="192" y="12" fontSize="9.5" fontWeight="700" fill={SEAL} letterSpacing="1">GOBIERNO</text>
      <rect x="192" y="20" width="164" height="70" rx="7" fill={SEALS} stroke={SEAL} strokeWidth="1.4" />
      <text x="274" y="42" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SEAL}>Appropriation</text>
      <text x="274" y="58" textAnchor="middle" fontSize="9.5" fill={MUT}>la aprueba el cabildo</text>
      <text x="274" y="74" textAnchor="middle" fontSize="9.5" fill={MUT}>rebasarla es ilegal</text>
      <text x="274" y="106" textAnchor="middle" fontSize="10" fontWeight="700" fill={SEAL}>vive en el mayor</text>

      <line x1="4" y1="124" x2="356" y2="124" stroke={RULE} strokeWidth="1" />
      <text x="4" y="146" fontSize="10.5" fill={MUT}>Por eso el asiento existe. Si la autorización es una ley, el</text>
      <text x="4" y="160" fontSize="10.5" fill={MUT}>sistema contable tiene que poder demostrar, en cualquier</text>
      <text x="4" y="174" fontSize="10.5" fill={MUT}>momento del año, cuánto queda de ella sin ejercer — y eso</text>
      <text x="4" y="188" fontSize="10.5" fill={MUT}>solo se puede si la ley está registrada como saldo.</text>
      <text x="4" y="208" fontSize="10.5" fontWeight="700" fill={SEAL}>El presupuesto se asienta; no se archiva.</text>
    </svg>
  )
}

/* ------------------------------------------------------------- I.b
   Las cuatro cuentas presupuestarias y de dónde sale el cuadre. */
function BudgetEntry() {
  return (
    <svg {...svgProps('El asiento de adopción del presupuesto: Estimated Revenues al debe, Appropriations y Estimated Other Financing Uses al haber, y Budgetary Fund Balance como la diferencia que cuadra el asiento.', 226)}>
      <Defs />
      <Box x={4} y={4} w={160} h={44} a="Estimated Revenues" b="lo que se espera recibir" fill={SEALS} stroke={SEAL} text={SEAL} />
      <text x="84" y="64" textAnchor="middle" fontSize="10" fontWeight="700" fill={SEAL}>AL DEBE</text>

      <Box x={196} y={4} w={160} h={30} a="Appropriations" fill={SHEET} stroke={RULE} />
      <Box x={196} y={38} w={160} h={30} a="Est. Other Financing Uses" fill={SHEET} stroke={RULE} />
      <Box x={196} y={72} w={160} h={30} a="Budgetary Fund Balance" fill={SUNK} stroke={RULE} />
      <text x="276" y="118" textAnchor="middle" fontSize="10" fontWeight="700" fill={MUT}>AL HABER</text>

      <path d="M168 26 L192 26" fill="none" stroke={RULE} strokeWidth="1.2" markerEnd="url(#ar)" />

      <line x1="4" y1="136" x2="356" y2="136" stroke={RULE} strokeWidth="1" />
      <text x="4" y="156" fontSize="10.5" fill={MUT}>Las tres del haber son la autorización para salir: gastar,</text>
      <text x="4" y="170" fontSize="10.5" fill={MUT}>transferir, y lo que sobra. La del debe es la expectativa de</text>
      <text x="4" y="184" fontSize="10.5" fill={MUT}>entrar. El asiento es el espejo del estado de operación</text>
      <text x="4" y="198" fontSize="10.5" fill={MUT}>que se publicará doce meses después.</text>
      <rect x="4" y="206" width="352" height="20" rx="5" fill={OKS} stroke={OK} strokeWidth="1.1" />
      <text x="12" y="220" fontSize="10.5" fontWeight="700" fill={OK}>Budgetary Fund Balance nunca se calcula: es lo que falta para cuadrar.</text>
    </svg>
  )
}

/* ------------------------------------------------------------- I.c
   El saldo disponible: la resta que se hace todos los días. */
function Available() {
  const W = 352
  const appro = 60_000
  const bar = (v: number) => (v / appro) * W
  return (
    <svg {...svgProps('El saldo disponible de una apropiación es la apropiación menos lo ya gastado y menos lo comprometido por órdenes de compra pendientes.', 200)}>
      <Defs />
      <text x="4" y="12" fontSize="10" fontWeight="700" fill={MUT}>Appropriation · equipo del sheriff</text>
      <text x="356" y="12" textAnchor="end" fontSize="10" fontWeight="700" fill={INK}>$60 000</text>

      <rect x="4" y="20" width={W} height="26" rx="5" fill={SUNK} stroke={RULE} strokeWidth="1" />
      <rect x="4" y="20" width={bar(32_400)} height="26" rx="5" fill={SEAL} />
      <rect x={4 + bar(32_400)} y="20" width={bar(16_000)} height="26" fill={SEALS} stroke={SEAL} strokeWidth="1" strokeDasharray="3 2" />

      <text x={4 + bar(32_400) / 2} y="38" textAnchor="middle" fontSize="10" fontWeight="700" fill={SHEET}>gastado</text>
      <text x={4 + bar(32_400) + bar(16_000) / 2} y="38" textAnchor="middle" fontSize="9" fontWeight="700" fill={SEAL}>comprom.</text>
      <text x={4 + bar(48_400) + (W - bar(48_400)) / 2} y="38" textAnchor="middle" fontSize="10" fontWeight="700" fill={OK}>libre</text>

      <text x="4" y="66" fontSize="10.5" fill={MUT}>Expenditures</text>
      <text x="140" y="66" textAnchor="end" fontSize="10.5" fontWeight="700" fill={SEAL}>$32 400</text>
      <text x="4" y="82" fontSize="10.5" fill={MUT}>Encumbrances abiertos</text>
      <text x="140" y="82" textAnchor="end" fontSize="10.5" fontWeight="700" fill={SEAL}>$16 000</text>
      <line x1="4" y1="88" x2="140" y2="88" stroke={RULE} strokeWidth="1" />
      <text x="4" y="102" fontSize="10.5" fontWeight="700" fill={OK}>Disponible</text>
      <text x="140" y="102" textAnchor="end" fontSize="10.5" fontWeight="700" fill={OK}>$11 600</text>

      <rect x="164" y="54" width="192" height="52" rx="6" fill={SHEET} stroke={RULE} strokeWidth="1.2" />
      <text x="260" y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill={INK}>Apropiación</text>
      <text x="260" y="86" textAnchor="middle" fontSize="10" fill={MUT}>− gastado − comprometido</text>
      <text x="260" y="100" textAnchor="middle" fontSize="10" fontWeight="700" fill={OK}>= lo que todavía puede firmar</text>

      <line x1="4" y1="124" x2="356" y2="124" stroke={RULE} strokeWidth="1" />
      <text x="4" y="144" fontSize="10.5" fill={MUT}>Un encumbrance resta aunque no sea un gasto. Esa es toda</text>
      <text x="4" y="158" fontSize="10.5" fill={MUT}>su razón de ser: impedir que dos departamentos gasten el</text>
      <text x="4" y="172" fontSize="10.5" fill={MUT}>mismo peso porque la factura del primero todavía no llega.</text>
      <text x="4" y="192" fontSize="10.5" fontWeight="700" fill={SEAL}>Sin encumbrances, el sobregiro se descubre en enero.</text>
    </svg>
  )
}

/* ------------------------------------------------------------ II.a
   La ventana de disponibilidad: medible no basta. */
function Available60() {
  return (
    <svg {...svgProps('Bajo base modificada un ingreso se reconoce solo si es medible y además disponible: cobrable a tiempo para pagar las obligaciones del propio periodo. Para el impuesto predial el plazo son 60 días después del cierre.', 208)}>
      <Defs />
      <line x1="4" y1="56" x2="356" y2="56" stroke={RULE} strokeWidth="1.4" />
      <line x1="230" y1="40" x2="230" y2="72" stroke={INK} strokeWidth="1.6" />
      <text x="230" y="34" textAnchor="middle" fontSize="10" fontWeight="700" fill={INK}>31 dic · cierre</text>
      <line x1="300" y1="44" x2="300" y2="68" stroke={SEAL} strokeWidth="1.4" strokeDasharray="4 3" />
      <text x="300" y="34" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={SEAL}>+60 días</text>

      <rect x="4" y="46" width="226" height="20" rx="4" fill={OKS} stroke={OK} strokeWidth="1.1" />
      <text x="117" y="60" textAnchor="middle" fontSize="10" fontWeight="700" fill={OK}>cobrado dentro del año</text>
      <rect x="230" y="46" width="70" height="20" fill={SEALS} stroke={SEAL} strokeWidth="1.1" />
      <rect x="300" y="46" width="56" height="20" rx="4" fill={NOS} stroke={NO} strokeWidth="1.1" />
      <text x="328" y="60" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={NO}>tarde</text>

      <text x="4" y="94" fontSize="10.5" fontWeight="700" fill={OK}>Ingreso del año</text>
      <text x="4" y="108" fontSize="10" fill={MUT}>medible y disponible</text>
      <text x="238" y="94" fontSize="10.5" fontWeight="700" fill={SEAL}>Todavía cuenta</text>
      <text x="238" y="108" fontSize="10" fill={MUT}>paga deudas del año</text>
      <text x="306" y="94" fontSize="10.5" fontWeight="700" fill={NO}>Deferred</text>
      <text x="306" y="108" fontSize="10" fill={MUT}>inflow</text>

      <line x1="4" y1="126" x2="356" y2="126" stroke={RULE} strokeWidth="1" />
      <text x="4" y="146" fontSize="10.5" fill={MUT}>Medible es una pregunta de cuánto. Disponible es una</text>
      <text x="4" y="160" fontSize="10.5" fill={MUT}>pregunta de cuándo, y es la que separa la base modificada</text>
      <text x="4" y="174" fontSize="10.5" fill={MUT}>de la acumulación completa: no basta con tener derecho al</text>
      <text x="4" y="188" fontSize="10.5" fill={MUT}>dinero si no llega a tiempo para pagar lo de este año.</text>
      <text x="4" y="204" fontSize="10.5" fontWeight="700" fill={SEAL}>Cada gobierno fija su plazo; el predial tiene 60 días por norma.</text>
    </svg>
  )
}

/* ----------------------------------------------------------- III.a
   La reservación: tres momentos que la contabilidad separa. */
function Reservation() {
  const steps: [string, string, string, string][] = [
    ['Reservas', 'la mesa queda apartada', 'Encumbrance', SEAL],
    ['Cenas', 'ya consumiste', 'Expenditure', INK],
    ['Pagas', 'sale el efectivo', 'Cash', OK],
  ]
  return (
    <svg {...svgProps('El ciclo del encumbrance funciona como una reservación de restaurante: reservar aparta la mesa sin gastar nada, cenar es cuando se incurre el gasto, y pagar solo mueve el efectivo.', 224)}>
      <Defs />
      {steps.map(([t, sub, acct, c], i) => (
        <g key={t}>
          <rect x={4 + i * 120} y={4} width={112} height={54} rx="7"
            fill={c === SEAL ? SEALS : c === OK ? OKS : SHEET} stroke={c} strokeWidth="1.3" />
          <text x={60 + i * 120} y={26} textAnchor="middle" fontSize="12" fontWeight="700" fill={c}>{t}</text>
          <text x={60 + i * 120} y={42} textAnchor="middle" fontSize="9" fill={MUT}>{sub}</text>
          <line x1={60 + i * 120} y1="60" x2={60 + i * 120} y2="76" stroke={c} strokeWidth="1.3" markerEnd={c === SEAL ? 'url(#ars)' : 'url(#ar)'} />
          <text x={60 + i * 120} y={92} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={c}>{acct}</text>
          {i < 2 && (
            <path d={`M${116 + i * 120} 31 L${124 + i * 120} 31`} fill="none" stroke={RULE} strokeWidth="1.2" markerEnd="url(#ar)" />
          )}
        </g>
      ))}

      <line x1="4" y1="110" x2="356" y2="110" stroke={RULE} strokeWidth="1" />
      <text x="4" y="130" fontSize="10.5" fill={MUT}>Nadie diría que cenó al reservar, ni que reservó al pagar.</text>
      <text x="4" y="144" fontSize="10.5" fill={MUT}>La contabilidad gubernamental hace exactamente esa</text>
      <text x="4" y="158" fontSize="10.5" fill={MUT}>distinción, y le pone un asiento a cada momento.</text>

      <rect x="4" y="168" width="352" height="22" rx="5" fill={NOS} stroke={NO} strokeWidth="1.1" />
      <text x="12" y="183" fontSize="10.5" fontWeight="700" fill={NO}>El error clásico: registrar el gasto al emitir la orden de compra.</text>
      <text x="4" y="208" fontSize="10.5" fill={MUT}>La orden no obliga a nada todavía: el proveedor puede no</text>
      <text x="4" y="222" fontSize="10.5" fill={MUT}>entregar, y entonces no hubo gasto que registrar.</text>
    </svg>
  )
}

/* ------------------------------------------------------------ IV.a
   Dos sistemas en paralelo, y por eso dos cierres. */
function DualClose() {
  return (
    <svg {...svgProps('Un fondo gubernamental lleva dos juegos de cuentas todo el año: las presupuestarias, que registran el plan aprobado, y las reales, que registran lo ocurrido. Al cierre se cancelan por separado.', 236)}>
      <Defs />
      <rect x="4" y="4" width="168" height="96" rx="7" fill={SUNK} stroke={RULE} strokeWidth="1.2" strokeDasharray="5 3" />
      <text x="88" y="22" textAnchor="middle" fontSize="10" fontWeight="700" fill={MUT} letterSpacing="0.8">PRESUPUESTARIAS</text>
      <text x="88" y="42" textAnchor="middle" fontSize="10.5" fill={INK}>Estimated Revenues</text>
      <text x="88" y="58" textAnchor="middle" fontSize="10.5" fill={INK}>Appropriations</text>
      <text x="88" y="74" textAnchor="middle" fontSize="10.5" fill={INK}>Budgetary Fund Balance</text>
      <text x="88" y="92" textAnchor="middle" fontSize="9.5" fill={MUT}>el plan aprobado</text>

      <rect x="188" y="4" width="168" height="96" rx="7" fill={SHEET} stroke={SEAL} strokeWidth="1.3" />
      <text x="272" y="22" textAnchor="middle" fontSize="10" fontWeight="700" fill={SEAL} letterSpacing="0.8">REALES</text>
      <text x="272" y="42" textAnchor="middle" fontSize="10.5" fill={INK}>Revenues</text>
      <text x="272" y="58" textAnchor="middle" fontSize="10.5" fill={INK}>Expenditures</text>
      <text x="272" y="74" textAnchor="middle" fontSize="10.5" fill={INK}>Other Financing Uses</text>
      <text x="272" y="92" textAnchor="middle" fontSize="9.5" fill={MUT}>lo que de verdad pasó</text>

      <line x1="88" y1="102" x2="88" y2="124" stroke={MUT} strokeWidth="1.3" markerEnd="url(#ar)" />
      <line x1="272" y1="102" x2="272" y2="124" stroke={SEAL} strokeWidth="1.3" markerEnd="url(#ars)" />

      <rect x="4" y="128" width="168" height="40" rx="6" fill={SHEET} stroke={RULE} strokeWidth="1.2" />
      <text x="88" y="146" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={INK}>Se revierte el asiento</text>
      <text x="88" y="160" textAnchor="middle" fontSize="9.5" fill={MUT}>a los importes originales</text>

      <rect x="188" y="128" width="168" height="40" rx="6" fill={SEALS} stroke={SEAL} strokeWidth="1.2" />
      <text x="272" y="146" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={SEAL}>Se cierra a Fund Balance</text>
      <text x="272" y="160" textAnchor="middle" fontSize="9.5" fill={MUT}>la diferencia queda de saldo</text>

      <line x1="4" y1="182" x2="356" y2="182" stroke={RULE} strokeWidth="1" />
      <text x="4" y="202" fontSize="10.5" fill={MUT}>Los dos juegos nunca se tocan durante el año y tampoco se</text>
      <text x="4" y="216" fontSize="10.5" fill={MUT}>mezclan al cerrar. Son dos asientos separados, y el orden</text>
      <text x="4" y="230" fontSize="10.5" fill={MUT}>entre ellos da igual: no comparten una sola cuenta.</text>
    </svg>
  )
}

export const CH3_FIGURES: Record<string, () => ReactElement> = {
  'c3-permit': Permit,
  'c3-budget-entry': BudgetEntry,
  'c3-available': Available,
  'c3-available60': Available60,
  'c3-reservation': Reservation,
  'c3-dual': DualClose,
}
