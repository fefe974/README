import type { ReactElement } from 'react'
import { Box, Defs, INK, MUT, NO, NOS, OK, OKS, RULE, SEAL, SEALS, SHEET, SUNK, svgProps } from './kit'

/* Figuras del capítulo 2. */

/* ------------------------------------------------------------- I.a */
function Activities() {
  const cols: [string, string, string, string][] = [
    ['Gubernamentales', 'policía · bomberos · calles', 'parques · educación', SEAL],
    ['Tipo negocio', 'agua · transporte', 'estacionamientos · albercas', INK],
    ['Fiduciarias', 'pensiones · custodia', 'de recursos ajenos', NO],
  ]
  return (
    <svg {...svgProps('Los gobiernos hacen tres tipos de actividad: gubernamentales, tipo negocio y fiduciarias. Solo las dos primeras aparecen en los estados de todo el gobierno.', 224)}>
      <Defs />
      <Box x={90} y={4} w={180} h={32} a="Gobierno de propósito general" />
      <path d="M180 38 L180 50 L62 50 L62 62" fill="none" stroke={SEAL} strokeWidth="1.3" markerEnd="url(#ars)" />
      <path d="M180 38 L180 50 L180 62" fill="none" stroke={RULE} strokeWidth="1.3" markerEnd="url(#ar)" />
      <path d="M180 38 L180 50 L298 50 L298 62" fill="none" stroke={NO} strokeWidth="1.3" markerEnd="url(#arn)" />
      {cols.map(([t, a, b, c], i) => (
        <g key={t}>
          <rect x={4 + i * 118} y={64} width={112} height={62} rx="7"
            fill={c === SEAL ? SEALS : c === NO ? NOS : SHEET} stroke={c} strokeWidth="1.3" />
          <text x={60 + i * 118} y={84} textAnchor="middle" fontSize="11" fontWeight="700" fill={c}>{t}</text>
          <text x={60 + i * 118} y={100} textAnchor="middle" fontSize="9" fill={MUT}>{a}</text>
          <text x={60 + i * 118} y={112} textAnchor="middle" fontSize="9" fill={MUT}>{b}</text>
        </g>
      ))}
      <line x1="4" y1="142" x2="238" y2="142" stroke={SEAL} strokeWidth="1.4" />
      <line x1="4" y1="142" x2="4" y2="152" stroke={SEAL} strokeWidth="1.4" />
      <line x1="238" y1="142" x2="238" y2="152" stroke={SEAL} strokeWidth="1.4" />
      <text x="121" y="166" textAnchor="middle" fontSize="10" fontWeight="700" fill={SEAL}>van en los estados de todo el gobierno</text>
      <line x1="298" y1="132" x2="298" y2="152" stroke={NO} strokeWidth="1.4" strokeDasharray="4 3" markerEnd="url(#arn)" />
      <text x="298" y="166" textAnchor="middle" fontSize="10" fontWeight="700" fill={NO}>solo por fondos</text>
      <text x="4" y="196" fontSize="10.5" fill={MUT}>Solo cuenta como fiduciaria la custodia o el fideicomiso que</text>
      <text x="4" y="210" fontSize="10.5" fill={MUT}>beneficia a terceros. Si apoya los programas del propio</text>
      <text x="4" y="224" fontSize="10.5" fill={MUT}>gobierno, se trata como gubernamental.</text>
    </svg>
  )
}

/* ------------------------------------------------------------- I.b */
function Model() {
  return (
    <svg {...svgProps('El modelo integrado exige estados de todo el gobierno y tres juegos de estados por fondos, con conciliación obligatoria entre los fondos gubernamentales y la columna de actividades gubernamentales.', 348)}>
      <Defs />
      <text x="4" y="12" fontSize="9.5" letterSpacing="1.2" fontWeight="700" fill={SEAL}>ARRIBA · TODO EL GOBIERNO</text>
      <rect x="4" y="20" width="352" height="66" rx="8" fill={SEALS} stroke={SEAL} strokeWidth="1.4" />
      <text x="16" y="38" fontSize="10.5" fontWeight="700" fill={SEAL}>Statement of net position · of activities</text>
      <text x="16" y="52" fontSize="9.5" fill={SEAL}>recursos económicos · devengado · rendición operativa</text>
      <rect x="16" y="58" width="150" height="22" rx="4" fill={SHEET} stroke={SEAL} strokeWidth="1" />
      <text x="91" y="73" textAnchor="middle" fontSize="9.5" fill={INK}>Actividades gubernam.</text>
      <rect x="174" y="58" width="120" height="22" rx="4" fill={SHEET} stroke={SEAL} strokeWidth="1" />
      <text x="234" y="73" textAnchor="middle" fontSize="9.5" fill={INK}>Tipo negocio</text>
      <text x="302" y="73" fontSize="9" fill={MUT}>+ total</text>

      <text x="4" y="112" fontSize="9.5" letterSpacing="1.2" fontWeight="700" fill={MUT}>ABAJO · POR FONDOS</text>
      {[
        ['Gubernamentales', 'recursos corrientes · devengado modificado', 'rendición fiscal', SEAL, 0],
        ['Propietarios', 'recursos económicos · devengado', 'enterprise + internal service', INK, 1],
        ['Fiduciarios', 'recursos económicos · devengado', 'NO suben a todo el gobierno', NO, 2],
      ].map(([t, a, b, c, i]) => (
        <g key={t as string}>
          <rect x={4} y={120 + (i as number) * 56} width={352} height={48} rx="7"
            fill={c === NO ? NOS : SHEET} stroke={c as string} strokeWidth="1.2" />
          <text x={16} y={139 + (i as number) * 56} fontSize="11" fontWeight="700" fill={c as string}>{t as string}</text>
          <text x={16} y={152 + (i as number) * 56} fontSize="9" fill={MUT}>{a as string}</text>
          <text x={16} y={163 + (i as number) * 56} fontSize="9" fill={c === NO ? NO : MUT}>{b as string}</text>
        </g>
      ))}
      <text x="10" y="300" fontSize="10.5" fontWeight="700" fill={SEAL}>Conciliación obligatoria</text>
      <text x="10" y="314" fontSize="10.5" fill={MUT}>Total fund balances de fondos gubernamentales ↔ net</text>
      <text x="10" y="328" fontSize="10.5" fill={MUT}>position de actividades gubernamentales. Y lo mismo</text>
      <text x="10" y="342" fontSize="10.5" fill={MUT}>entre los dos estados operativos.</text>
    </svg>
  )
}

/* ------------------------------------------------------------- II */
function Funds() {
  const groups: [string, string[], string, string][] = [
    ['Gubernamentales', ['General Fund', 'Special revenue', 'Debt service', 'Capital projects', 'Permanent'], 'Recursos corrientes · devengado modificado', SEAL],
    ['Propietarios', ['Internal service', 'Enterprise'], 'Recursos económicos · devengado', INK],
    ['Fiduciarios', ['Custodial', 'Investment trust', 'Pension trust', 'Private-purpose trust'], 'Recursos económicos · devengado', NO],
  ]
  let y = 8
  const out: ReactElement[] = []
  groups.forEach(([name, types, basis, c]) => {
    const h = 30 + types.length * 20
    out.push(
      <g key={name}>
        <rect x={4} y={y} width={352} height={h} rx="8" fill={c === SEAL ? SEALS : c === NO ? NOS : SHEET} stroke={c} strokeWidth="1.3" />
        <text x={16} y={y + 19} fontSize="11.5" fontWeight="700" fill={c}>{name}</text>
        <text x={350} y={y + 19} textAnchor="end" fontSize="8.5" fill={c}>{basis}</text>
        {types.map((t, i) => (
          <g key={t}>
            <circle cx={26} cy={y + 34 + i * 20} r="2.5" fill={c} />
            <text x={36} y={y + 38 + i * 20} fontSize="10.5" fill={INK}>{t}</text>
          </g>
        ))}
      </g>,
    )
    y += h + 10
  })
  return (
    <svg {...svgProps('Las tres categorías de fondos y sus once tipos. La categoría determina el enfoque de medición y la base contable.', y + 44)}>
      <Defs />
      {out}
      <text x="4" y={y + 14} fontSize="10.5" fontWeight="700" fill={NO}>Las dos que se confunden:</text>
      <text x="4" y={y + 28} fontSize="10.5" fill={MUT}>permanent fund es gubernamental, no fiduciario; internal</text>
      <text x="4" y={y + 42} fontSize="10.5" fill={MUT}>service es propietario aunque solo sirva al propio gobierno.</text>
    </svg>
  )
}

/* ------------------------------------------------------------ III */
function Focus() {
  return (
    <svg {...svgProps('Una patrulla de sesenta mil dólares es un expenditure completo en el fondo gubernamental el año de compra, y un activo depreciable en los estados de todo el gobierno.', 272)}>
      <Defs />
      <Box x={100} y={4} w={160} h={30} a="Patrulla · $60 000" b="comprada en efectivo" />
      <path d="M180 36 L180 48 L92 48 L92 60" fill="none" stroke={SEAL} strokeWidth="1.4" markerEnd="url(#ars)" />
      <path d="M180 36 L180 48 L268 48 L268 60" fill="none" stroke={RULE} strokeWidth="1.4" markerEnd="url(#ar)" />

      <rect x="4" y="62" width="172" height="120" rx="9" fill={SEALS} stroke={SEAL} strokeWidth="1.3" />
      <text x="90" y="80" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={SEAL}>Fondo gubernamental</text>
      <text x="90" y="93" textAnchor="middle" fontSize="8.5" fill={SEAL}>recursos corrientes</text>
      <rect x="16" y="102" width="148" height="30" rx="5" fill={SHEET} stroke={SEAL} strokeWidth="1" />
      <text x="90" y="115" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={INK}>Expenditure $60 000</text>
      <text x="90" y="127" textAnchor="middle" fontSize="9" fill={MUT}>todo en el año 1</text>
      <text x="90" y="150" textAnchor="middle" fontSize="9.5" fill={MUT}>No aparece como activo:</text>
      <text x="90" y="162" textAnchor="middle" fontSize="9.5" fill={MUT}>no paga obligaciones</text>
      <text x="90" y="174" textAnchor="middle" fontSize="9.5" fill={MUT}>del periodo.</text>

      <rect x="188" y="62" width="168" height="120" rx="9" fill={SUNK} stroke={RULE} strokeWidth="1.3" />
      <text x="272" y="80" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={INK}>Todo el gobierno</text>
      <text x="272" y="93" textAnchor="middle" fontSize="8.5" fill={MUT}>recursos económicos</text>
      <rect x="200" y="102" width="144" height="30" rx="5" fill={SHEET} stroke={RULE} strokeWidth="1" />
      <text x="272" y="115" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={INK}>Activo $60 000</text>
      <text x="272" y="127" textAnchor="middle" fontSize="9" fill={MUT}>menos depreciación</text>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={204 + i * 36} y={144} width={28} height={10} rx="2" fill={OKS} stroke={OK} strokeWidth="0.9" />
      ))}
      <text x="272" y="174" textAnchor="middle" fontSize="9.5" fill={MUT}>Expense repartido por años</text>

      <rect x="4" y="196" width="352" height="34" rx="7" fill={SHEET} stroke={SEAL} strokeWidth="1.2" strokeDasharray="4 3" />
      <text x="180" y="217" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={SEAL}>La conciliación explica esta diferencia</text>
      <text x="4" y="252" fontSize="10.5" fill={MUT}>Misma transacción, dos cifras. Ninguna está mal: responden</text>
      <text x="4" y="266" fontSize="10.5" fill={MUT}>a preguntas de rendición de cuentas distintas.</text>
    </svg>
  )
}

/* ------------------------------------------------------------- IV */
function FundBalance() {
  const rows: [string, string, string][] = [
    ['Nonspendable', 'No se puede gastar: inventario, anticipos,', 'principal de una dotación'],
    ['Restricted', 'Candado externo: otorgante, acreedor,', 'donante, legislación habilitante'],
    ['Committed', 'Acción formal del máximo nivel.', 'Se quita con la misma acción'],
    ['Assigned', 'Intención sin acción formal, del cuerpo', 'de gobierno o de quien delegó'],
    ['Unassigned', 'El residuo del General Fund.', 'Solo él puede tenerlo positivo'],
  ]
  return (
    <svg {...svgProps('Las cinco clasificaciones del fund balance, en el orden en que se determinan: primero lo no gastable, y el resto según quién impuso la restricción.', 300)}>
      <Defs />
      <Box x={92} y={4} w={176} h={28} a="Fund balance del fondo" />
      <line x1="180" y1="34" x2="180" y2="46" stroke={RULE} strokeWidth="1.3" markerEnd="url(#ar)" />
      {rows.map(([t, a, b], i) => {
        const y = 50 + i * 46
        const strong = i === 0
        return (
          <g key={t}>
            <rect x={4} y={y} width={352} height={38} rx="7"
              fill={strong ? SEALS : SHEET} stroke={strong ? SEAL : RULE} strokeWidth={strong ? 1.4 : 1.1} />
            <text x={16} y={y + 16} fontSize="11" fontWeight="700" fill={strong ? SEAL : INK}>{t}</text>
            <text x={16} y={y + 28} fontSize="9" fill={MUT}>{a}</text>
            <text x={230} y={y + 16} fontSize="9" fill={MUT}>{b}</text>
            {i < rows.length - 1 && (
              <line x1="180" y1={y + 38} x2="180" y2={y + 46} stroke={RULE} strokeWidth="1.2" markerEnd="url(#ar)" />
            )}
          </g>
        )
      })}
      <text x="4" y={296} fontSize="10.5" fill={MUT}>Se clasifica de arriba abajo. Más candado arriba, menos abajo.</text>
    </svg>
  )
}

/* -------------------------------------------------------------- V */
function Major() {
  return (
    <svg {...svgProps('Un fondo es mayor cuando el mismo elemento supera el diez por ciento de su categoría y el cinco por ciento del total combinado de fondos gubernamentales y enterprise.', 268)}>
      <Defs />
      <Box x={80} y={4} w={200} h={30} a="Un fondo cualquiera" b="¿merece columna propia?" />
      <line x1="180" y1="36" x2="180" y2="52" stroke={RULE} strokeWidth="1.3" markerEnd="url(#ar)" />
      <rect x="20" y="54" width="320" height="42" rx="7" fill={SEALS} stroke={SEAL} strokeWidth="1.3" />
      <text x="180" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill={SEAL}>Valla 1 · ≥ 10 % de su categoría</text>
      <text x="180" y="87" textAnchor="middle" fontSize="9" fill={SEAL}>activos, pasivos, ingresos o egresos</text>
      <line x1="180" y1="98" x2="180" y2="114" stroke={SEAL} strokeWidth="1.3" markerEnd="url(#ars)" />
      <text x="192" y="110" fontSize="9" fill={MUT}>el MISMO elemento</text>
      <rect x="20" y="116" width="320" height="42" rx="7" fill={SEALS} stroke={SEAL} strokeWidth="1.3" />
      <text x="180" y="134" textAnchor="middle" fontSize="11" fontWeight="700" fill={SEAL}>Valla 2 · ≥ 5 % del combinado</text>
      <text x="180" y="149" textAnchor="middle" fontSize="9" fill={SEAL}>gubernamentales + enterprise</text>
      <line x1="180" y1="160" x2="180" y2="176" stroke={SEAL} strokeWidth="1.3" markerEnd="url(#ars)" />
      <rect x="60" y="178" width="240" height="30" rx="7" fill={OKS} stroke={OK} strokeWidth="1.3" />
      <text x="180" y="198" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={OK}>Fondo mayor · columna propia</text>
      <rect x="4" y="220" width="352" height="42" rx="7" fill={NOS} stroke={NO} strokeWidth="1.2" />
      <text x="16" y="238" fontSize="10.5" fontWeight="700" fill={NO}>No aplica a:</text>
      <text x="16" y="253" fontSize="10" fill={INK}>internal service funds ni fondos fiduciarios. El General Fund es mayor siempre.</text>
    </svg>
  )
}

export const CH2_FIGURES: Record<string, () => ReactElement> = {
  activities: Activities,
  model: Model,
  funds: Funds,
  focus: Focus,
  fundbalance: FundBalance,
  major: Major,
}
