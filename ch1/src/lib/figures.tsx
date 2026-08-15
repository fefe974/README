import type { FigureId } from './content'

/* Hand-authored inline SVG. Colours come from the token variables so
   both themes resolve; nothing here depends on a raw hex. */

const INK = 'rgb(var(--ink))'
const MUT = 'rgb(var(--muted))'
const SEAL = 'rgb(var(--seal))'
const SEALS = 'rgb(var(--seal-soft))'
const RULE = 'rgb(var(--rule-2))'
const SHEET = 'rgb(var(--sheet))'
const SUNK = 'rgb(var(--sunk))'
const NO = 'rgb(var(--no))'
const NOS = 'rgb(var(--no-soft))'
const OK = 'rgb(var(--ok))'
const OKS = 'rgb(var(--ok-soft))'

function Defs() {
  return (
    <defs>
      <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill={INK} />
      </marker>
      <marker id="ars" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill={SEAL} />
      </marker>
      <marker id="arn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill={NO} />
      </marker>
    </defs>
  )
}

type BoxProps = {
  x: number; y: number; w: number; h: number
  a: string; b?: string
  stroke?: string; fill?: string; text?: string; sub?: string
}
function Box({ x, y, w, h, a, b, stroke = RULE, fill = SHEET, text = INK, sub = MUT }: BoxProps) {
  const cx = x + w / 2
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx="7" fill={fill} stroke={stroke} strokeWidth="1.2" />
      {b ? (
        <>
          <text x={cx} y={y + h / 2 - 3} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={text}>{a}</text>
          <text x={cx} y={y + h / 2 + 11} textAnchor="middle" fontSize="10" fill={sub}>{b}</text>
        </>
      ) : (
        <text x={cx} y={y + h / 2 + 4} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={text}>{a}</text>
      )}
    </>
  )
}

const svgProps = (label: string, h: number) => ({
  viewBox: `0 0 360 ${h}`,
  role: 'img' as const,
  'aria-label': label,
  className: 'block h-auto w-full min-w-[320px]',
})

/* ---------------------------------------------------------- I.a */
function Resources() {
  const rows = [
    { y: 6, tag: 'EMPRESA', a: 'Cliente / accionista', b: 'Empresa', back: 'bienes y retorno proporcional a lo aportado', dash: false, c: INK },
    { y: 112, tag: 'GOBIERNO', a: 'Contribuyente', b: 'Gobierno', back: 'servicios, sin relación con lo que cada uno pagó', dash: true, c: SEAL },
  ]
  return (
    <svg {...svgProps('En una empresa quien aporta recursos recibe un retorno proporcional; en un gobierno el contribuyente aporta de forma involuntaria y lo que recibe no depende de lo que pagó.', 218)}>
      <Defs />
      {rows.map((r) => (
        <g key={r.tag}>
          <text x="4" y={r.y + 9} fontSize="9.5" letterSpacing="1.3" fontWeight="700" fill={r.c}>{r.tag}</text>
          <Box x={4} y={r.y + 18} w={140} h={38} a={r.a} stroke={r.c} />
          <Box x={216} y={r.y + 18} w={140} h={38} a={r.b} stroke={r.c} />
          <line x1="146" y1={r.y + 37} x2="212" y2={r.y + 37} stroke={r.c} strokeWidth="1.4" markerEnd={r.c === SEAL ? 'url(#ars)' : 'url(#ar)'} />
          <text x="179" y={r.y + 31} textAnchor="middle" fontSize="9.5" fill={r.c}>recursos</text>
          <path d={`M286 ${r.y + 56} C286 ${r.y + 82} 74 ${r.y + 82} 74 ${r.y + 56}`} fill="none" stroke={r.c} strokeWidth="1.4" strokeDasharray={r.dash ? '4 3' : undefined} markerEnd={r.c === SEAL ? 'url(#ars)' : 'url(#ar)'} />
          <text x="180" y={r.y + 96} textAnchor="middle" fontSize="10" fill={MUT}>{r.back}</text>
        </g>
      ))}
    </svg>
  )
}

/* ---------------------------------------------------------- I.b */
function NoNetIncome() {
  return (
    <svg {...svgProps('Una empresa resume su desempeño en una sola cifra de utilidad neta; un gobierno no tiene esa cifra y en su lugar responde dos preguntas de rendición de cuentas.', 250)}>
      <Defs />
      <text x="4" y="12" fontSize="9.5" letterSpacing="1.3" fontWeight="700" fill={MUT}>EMPRESA</text>
      {['Ingresos', 'Costos', 'Gastos'].map((t, i) => (
        <g key={t}>
          <rect x={4} y={22 + i * 26} width="76" height="20" rx="4" fill={SUNK} stroke={RULE} strokeWidth="1" />
          <text x={42} y={36 + i * 26} textAnchor="middle" fontSize="9.5" fill={INK}>{t}</text>
          <line x1="84" y1={32 + i * 26} x2="106" y2={58} stroke={RULE} strokeWidth="1" />
        </g>
      ))}
      <rect x="110" y="34" width="106" height="48" rx="7" fill={OKS} stroke={OK} strokeWidth="1.4" />
      <text x="163" y="54" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={OK}>Net income</text>
      <text x="163" y="68" textAnchor="middle" fontSize="9.5" fill={OK}>una sola cifra</text>
      <text x="226" y="56" fontSize="10" fill={MUT}>¿lo hizo bien?</text>
      <text x="226" y="69" fontSize="10" fill={MUT}>se responde aquí</text>

      <line x1="4" y1="100" x2="356" y2="100" stroke={RULE} strokeWidth="1" />

      <text x="4" y="120" fontSize="9.5" letterSpacing="1.3" fontWeight="700" fill={SEAL}>GOBIERNO</text>
      {['Impuestos', 'Subvenciones', 'Cobros'].map((t, i) => (
        <g key={t}>
          <rect x={4} y={130 + i * 26} width="76" height="20" rx="4" fill={SUNK} stroke={RULE} strokeWidth="1" />
          <text x={42} y={144 + i * 26} textAnchor="middle" fontSize="9.5" fill={INK}>{t}</text>
          <line x1="84" y1={140 + i * 26} x2="106" y2={166} stroke={RULE} strokeWidth="1" />
        </g>
      ))}
      <rect x="110" y="142" width="106" height="48" rx="7" fill={NOS} stroke={NO} strokeWidth="1.4" strokeDasharray="5 3" />
      <text x="163" y="163" textAnchor="middle" fontSize="15" fontWeight="700" fill={NO}>no existe</text>
      <text x="163" y="177" textAnchor="middle" fontSize="9.5" fill={NO}>ninguna cifra única</text>
      <path d="M220 166 L238 166 L238 140 L252 140" fill="none" stroke={SEAL} strokeWidth="1.4" markerEnd="url(#ars)" />
      <path d="M220 166 L238 166 L238 192 L252 192" fill="none" stroke={SEAL} strokeWidth="1.4" markerEnd="url(#ars)" />
      <Box x={256} y={126} w={100} h={30} a="¿Cumplió la ley?" stroke={SEAL} fill={SEALS} text={SEAL} />
      <Box x={256} y={178} w={100} h={30} a="¿Usó bien todo?" stroke={SEAL} fill={SEALS} text={SEAL} />
      <text x="4" y="228" fontSize="10.5" fill={MUT}>Sin mercado competitivo y sin relación entre lo pagado y</text>
      <text x="4" y="242" fontSize="10.5" fill={MUT}>el servicio recibido, la rendición de cuentas ocupa ese hueco.</text>
    </svg>
  )
}

/* ---------------------------------------------------------- II.a */
function Authority() {
  return (
    <svg {...svgProps('El gobierno está restringido por leyes de jurisdicciones superiores, por los actos de su propio cuerpo legislativo, por acuerdos con acreedores y por el electorado, y esas restricciones crean requisitos únicos de rendición de cuentas financiera.', 296)}>
      <Defs />
      <Box x={60} y={4} w={240} h={34} a="Leyes de jurisdicciones superiores" b="federal y estatal, subvenciones condicionadas" stroke={SEAL} />
      <Box x={4} y={92} w={104} h={52} a="Cuerpo" b="legislativo" stroke={SEAL} />
      <Box x={252} y={92} w={104} h={52} a="Acreedores" b="bond covenants" stroke={SEAL} />
      <Box x={60} y={198} w={240} h={34} a="El electorado" b="el poder reside en el pueblo" stroke={SEAL} />

      <rect x="118" y="86" width="124" height="64" rx="9" fill={SEALS} stroke={SEAL} strokeWidth="1.6" />
      <text x="180" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill={SEAL}>Gobierno</text>
      <text x="180" y="128" textAnchor="middle" fontSize="9.5" fill={SEAL}>ejecutivo · legislativo</text>
      <text x="180" y="140" textAnchor="middle" fontSize="9.5" fill={SEAL}>· judicial</text>

      <line x1="180" y1="42" x2="180" y2="82" stroke={SEAL} strokeWidth="1.4" markerEnd="url(#ars)" />
      <line x1="112" y1="118" x2="114" y2="118" stroke={SEAL} strokeWidth="1.4" markerEnd="url(#ars)" />
      <line x1="248" y1="118" x2="246" y2="118" stroke={SEAL} strokeWidth="1.4" markerEnd="url(#ars)" />
      <line x1="180" y1="194" x2="180" y2="154" stroke={SEAL} strokeWidth="1.4" markerEnd="url(#ars)" />
      <text x="190" y="66" fontSize="9.5" fill={MUT}>restringe</text>
      <text x="190" y="184" fontSize="9.5" fill={MUT}>delega y exige</text>

      {/* Leaves from below the Acreedores box, not across its label. */}
      <path d="M330 148 L330 250 L180 250 L180 256" fill="none" stroke={SEAL} strokeWidth="1.4" strokeDasharray="4 3" markerEnd="url(#ars)" />
      <Box x={4} y={260} w={352} h={32} a="Requisitos únicos de rendición de cuentas financiera" stroke={SEAL} fill={SEALS} text={SEAL} />
    </svg>
  )
}

/* ---------------------------------------------------------- II.b */
function Accountability() {
  return (
    <svg {...svgProps('La rendición de cuentas fiscal pregunta si el gobierno cumplió el presupuesto dentro del año; la operativa pregunta si usó bien sus recursos en un horizonte largo.', 244)}>
      <Defs />
      <text x="4" y="14" fontSize="10" fontWeight="700" fill={INK}>Accountability</text>
      <text x="98" y="14" fontSize="10" fill={MUT}>— la piedra angular, en dos preguntas</text>
      <line x1="180" y1="24" x2="180" y2="36" stroke={RULE} strokeWidth="1.2" />
      <line x1="76" y1="36" x2="284" y2="36" stroke={RULE} strokeWidth="1.2" />
      <line x1="76" y1="36" x2="76" y2="50" stroke={RULE} strokeWidth="1.2" markerEnd="url(#ar)" />
      <line x1="284" y1="36" x2="284" y2="50" stroke={RULE} strokeWidth="1.2" markerEnd="url(#ar)" />

      <rect x="4" y="52" width="168" height="116" rx="9" fill={SEALS} stroke={SEAL} strokeWidth="1.3" />
      <text x="88" y="72" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SEAL}>Fiscal</text>
      <text x="88" y="92" textAnchor="middle" fontSize="10.5" fill={INK}>¿Cumplió lo que el</text>
      <text x="88" y="105" textAnchor="middle" fontSize="10.5" fill={INK}>público decidió sobre</text>
      <text x="88" y="118" textAnchor="middle" fontSize="10.5" fill={INK}>recaudar y gastar?</text>
      <text x="88" y="140" textAnchor="middle" fontSize="9.5" fill={SEAL}>horizonte: el año</text>
      <text x="88" y="152" textAnchor="middle" fontSize="9.5" fill={SEAL}>presupuestario</text>

      <rect x="188" y="52" width="168" height="116" rx="9" fill={SUNK} stroke={RULE} strokeWidth="1.3" />
      <text x="272" y="72" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK}>Operativa</text>
      <text x="272" y="92" textAnchor="middle" fontSize="10.5" fill={INK}>¿Usó sus recursos de</text>
      <text x="272" y="105" textAnchor="middle" fontSize="10.5" fill={INK}>forma eficiente y eficaz</text>
      <text x="272" y="118" textAnchor="middle" fontSize="10.5" fill={INK}>para sus objetivos?</text>
      <text x="272" y="140" textAnchor="middle" fontSize="9.5" fill={MUT}>horizonte: largo</text>
      <text x="272" y="152" textAnchor="middle" fontSize="9.5" fill={MUT}>plazo</text>

      <line x1="4" y1="192" x2="356" y2="192" stroke={RULE} strokeWidth="1.2" markerEnd="url(#ar)" />
      <line x1="10" y1="186" x2="10" y2="198" stroke={RULE} strokeWidth="1.2" />
      <text x="10" y="212" fontSize="9.5" fill={MUT}>1 año</text>
      <text x="352" y="212" textAnchor="end" fontSize="9.5" fill={MUT}>largo plazo</text>
      <text x="4" y="236" fontSize="10.5" fill={MUT}>Cada pregunta necesita su propio juego de estados: ver artículo IV.</text>
    </svg>
  )
}

/* ---------------------------------------------------------- III */
function Jurisdiction() {
  return (
    <svg {...svgProps('La Financial Accounting Foundation supervisa al GASB y al FASB; tres funcionarios federales crearon el FASAB en 1990. Las organizaciones sin fines de lucro se reparten entre GASB y FASB según sean gubernamentales o no.', 330)}>
      <Defs />
      <Box x={16} y={4} w={154} h={34} a="Financial Accounting" b="Foundation (FAF)" />
      <Box x={192} y={4} w={164} h={34} a="Comptroller General," b="OMB y Tesoro · 1990" />
      <line x1="58" y1="40" x2="58" y2="62" stroke={RULE} strokeWidth="1.3" markerEnd="url(#ar)" />
      <line x1="130" y1="40" x2="130" y2="62" stroke={RULE} strokeWidth="1.3" markerEnd="url(#ar)" />
      <line x1="274" y1="40" x2="274" y2="62" stroke={RULE} strokeWidth="1.3" markerEnd="url(#ar)" />
      <text x="66" y="54" fontSize="8.5" fill={MUT}>nombra</text>

      <Box x={8} y={64} w={100} h={32} a="GASB" stroke={SEAL} fill={SEALS} text={SEAL} />
      <Box x={118} y={64} w={100} h={32} a="FASB" />
      <Box x={228} y={64} w={128} h={32} a="FASAB" />
      <text x="58" y="110" textAnchor="middle" fontSize="8.5" fill={MUT}>1984</text>
      <text x="168" y="110" textAnchor="middle" fontSize="8.5" fill={MUT}>1973</text>
      <text x="292" y="110" textAnchor="middle" fontSize="8.5" fill={MUT}>1990</text>

      <line x1="58" y1="114" x2="58" y2="132" stroke={SEAL} strokeWidth="1.3" markerEnd="url(#ars)" />
      <line x1="168" y1="114" x2="168" y2="132" stroke={RULE} strokeWidth="1.3" markerEnd="url(#ar)" />
      <line x1="292" y1="114" x2="292" y2="132" stroke={RULE} strokeWidth="1.3" markerEnd="url(#ar)" />
      <Box x={4} y={134} w={108} h={46} a="Gobiernos" b="estatales y locales" stroke={SEAL} />
      <Box x={120} y={134} w={96} h={46} a="Empresas" b="for-profit" />
      <Box x={224} y={134} w={132} h={46} a="Gobierno federal" b="y sus agencias" />

      <line x1="58" y1="184" x2="58" y2="202" stroke={SEAL} strokeWidth="1.3" markerEnd="url(#ars)" />
      <line x1="168" y1="184" x2="168" y2="202" stroke={RULE} strokeWidth="1.3" markerEnd="url(#ar)" />
      <rect x="4" y="196" width="212" height="8" rx="4" fill="none" />
      <Box x={4} y={204} w={108} h={46} a="NFP que son" b="gubernamentales" stroke={SEAL} fill={SEALS} text={SEAL} sub={SEAL} />
      <Box x={120} y={204} w={150} h={46} a="NFP independientes" b="de un gobierno" />

      <rect x="4" y="264" width="352" height="60" rx="8" fill={NOS} stroke={NO} strokeWidth="1.2" />
      <text x="16" y="282" fontSize="10.5" fontWeight="700" fill={NO}>Aquí se pierde el punto</text>
      <text x="16" y="298" fontSize="10" fill={INK}>Las NFP están partidas entre dos tableros. Universidad</text>
      <text x="16" y="312" fontSize="10" fill={INK}>pública → GASB. Museo privado → FASB. No se elige.</text>
    </svg>
  )
}

/* ---------------------------------------------------------- IV.a */
function Acfr() {
  const rows: [string, string, boolean][] = [
    ['Informe del auditor', 'auditor’s report', false],
    ['Management’s discussion and analysis', 'MD&A — es RSI', true],
    ['Estados básicos y sus notas', 'government-wide + fund + notes', true],
    ['Otra required supplementary information', 'RSI distinta del MD&A', true],
    ['Información suplementaria adicional', 'combining and individual fund statements', false],
  ]
  return (
    <svg {...svgProps('El informe anual completo tiene tres secciones, y los requisitos mínimos de reporte externo son solo un subconjunto de la sección financiera.', 452)}>
      <Defs />
      <rect x="2" y="2" width="356" height="396" rx="10" fill="none" stroke={INK} strokeWidth="1.6" />
      <text x="14" y="22" fontSize="10" letterSpacing="1.1" fontWeight="700" fill={INK}>ACFR · ANNUAL COMPREHENSIVE FINANCIAL REPORT</text>
      <text x="14" y="35" fontSize="9.5" fill={MUT}>No es obligatorio — pero casi todos los gobiernos lo preparan</text>

      <Box x={12} y={46} w={336} h={38} a="1 · Sección introductoria" b="Portada, carta de transmisión, descripción del gobierno" />

      <rect x="12" y="92" width="336" height="246" rx="7" fill={SHEET} stroke={INK} strokeWidth="1.2" />
      <text x="24" y="110" fontSize="12" fontWeight="700" fill={INK}>2 · Sección financiera</text>
      {rows.map((r, i) => (
        <g key={r[0]}>
          <rect x="34" y={120 + i * 38} width="304" height="32" rx="6" fill={r[2] ? SEALS : SUNK} stroke={r[2] ? SEAL : RULE} strokeWidth="1" />
          <text x="44" y={133 + i * 38} fontSize="10.5" fontWeight="700" fill={r[2] ? SEAL : INK}>{r[0]}</text>
          <text x="44" y={145 + i * 38} fontSize="9.5" fill={MUT}>{r[1]}</text>
        </g>
      ))}
      <path d="M32 158 L24 158 L24 266 L32 266" fill="none" stroke={SEAL} strokeWidth="1.5" />
      <rect x="34" y="308" width="10" height="11" rx="2" fill={SEALS} stroke={SEAL} strokeWidth="1" />
      <text x="50" y="313" fontSize="9.5" fontWeight="700" fill={SEAL}>estos tres = el mínimo requerido de reporte</text>
      <text x="50" y="325" fontSize="9.5" fill={SEAL}>externo · general purpose external financial reporting</text>

      <Box x={12} y={346} w={336} h={38} a="3 · Sección estadística" b="Demografía, tendencias financieras, capacidad fiscal, operación" />

      <text x="2" y="424" fontSize="10.5" fontWeight="700" fill={NO}>La relación que hay que memorizar:</text>
      <text x="2" y="442" fontSize="10.5" fill={INK}>mínimo requerido ⊂ sección financiera ⊂ ACFR</text>
    </svg>
  )
}

/* ---------------------------------------------------------- IV.b */
function Dual() {
  const rows: [string, string, string][] = [
    ['Base contable', 'Accrual basis', 'Modified accrual'],
    ['Enfoque', 'Recursos económicos', 'Recursos corrientes'],
    ['Horizonte', 'Largo plazo', 'El año presupuestario'],
    ['Registra', 'Expenses', 'Expenditures'],
  ]
  return (
    <svg {...svgProps('Los estados financieros básicos se dividen en estados de todo el gobierno, que responden por la rendición de cuentas operativa, y estados por fondos, que responden por la rendición de cuentas fiscal.', 300)}>
      <Defs />
      <Box x={70} y={4} w={220} h={34} a="Basic financial statements" b="los dos juegos que exige el GASB" />
      <path d="M180 40 L180 52 L92 52 L92 64" fill="none" stroke={RULE} strokeWidth="1.4" markerEnd="url(#ar)" />
      <path d="M180 40 L180 52 L268 52 L268 64" fill="none" stroke={SEAL} strokeWidth="1.4" markerEnd="url(#ars)" />

      <rect x="6" y="66" width="172" height="178" rx="9" fill={SUNK} stroke={RULE} strokeWidth="1.3" />
      <rect x="188" y="66" width="166" height="178" rx="9" fill={SEALS} stroke={SEAL} strokeWidth="1.3" />
      <text x="92" y="86" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK}>Government-wide</text>
      <text x="92" y="99" textAnchor="middle" fontSize="9.5" fill={MUT}>todo el gobierno, agregado</text>
      <text x="271" y="86" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SEAL}>Governmental funds</text>
      <text x="271" y="99" textAnchor="middle" fontSize="9.5" fill={SEAL}>por fondos, en detalle</text>
      {rows.map((r, i) => (
        <g key={r[0]}>
          <line x1="6" y1={110 + i * 32} x2="178" y2={110 + i * 32} stroke={RULE} strokeWidth="0.8" />
          <line x1="188" y1={110 + i * 32} x2="354" y2={110 + i * 32} stroke={SEAL} strokeWidth="0.8" opacity="0.4" />
          <text x="14" y={122 + i * 32} fontSize="8.5" letterSpacing="0.6" fill={MUT}>{r[0].toUpperCase()}</text>
          <text x="14" y={134 + i * 32} fontSize="10.5" fontWeight="700" fill={INK}>{r[1]}</text>
          <text x="196" y={134 + i * 32} fontSize="10.5" fontWeight="700" fill={INK}>{r[2]}</text>
        </g>
      ))}
      <line x1="6" y1="240" x2="178" y2="240" stroke={RULE} strokeWidth="1" />
      <line x1="188" y1="240" x2="354" y2="240" stroke={SEAL} strokeWidth="1" opacity="0.4" />
      <Box x={6} y={252} w={172} h={40} a="Operational" b="¿usó bien los recursos?" />
      <Box x={188} y={252} w={166} h={40} a="Fiscal" b="¿cumplió lo aprobado?" stroke={SEAL} fill={SEALS} text={SEAL} sub={SEAL} />
    </svg>
  )
}

const MAP: Record<FigureId, () => JSX.Element> = {
  resources: Resources,
  noNetIncome: NoNetIncome,
  authority: Authority,
  accountability: Accountability,
  jurisdiction: Jurisdiction,
  acfr: Acfr,
  dual: Dual,
}

export function Figure({ id, cap }: { id: FigureId; cap: string }) {
  const C = MAP[id]
  return (
    <figure className="mt-5 rounded-xl border border-rule bg-sheet p-4 pb-3 shadow-[var(--shadow-sm)]">
      <div className="overflow-x-auto">
        <C />
      </div>
      <figcaption className="mt-3 border-t border-rule pt-3 text-[13px] leading-snug text-muted">{cap}</figcaption>
    </figure>
  )
}
