/* Chapter 1 content, sourced from Reck, Lowensohn & Neely,
   "Accounting for Governmental & Nonprofit Entities", 18e, ch. 1.
   Narration is Spanish; terms of art stay in English via <span class="term">. */

export type Block =
  | { k: 'p'; t: string }
  | { k: 'fig'; id: FigureId; cap: string }
  | { k: 'note'; head: string; t: string; tone?: 'seal' | 'warn' }

export type Question = {
  q: string
  src: string
  o: string[]
  a: number
  w: string
}

export type Step = { head: string; blocks: Block[] }

export type Article = {
  id: string
  roman: string
  concept: string
  title: string
  en: string
  standfirst: string
  /* One idea per step. A phone shows one step at a time, so no article
     is ever a single long scroll. */
  steps: Step[]
  terms: [string, string][]
  quiz: Question[]
}

export type FigureId =
  | 'resources'
  | 'noNetIncome'
  | 'authority'
  | 'accountability'
  | 'jurisdiction'
  | 'acfr'
  | 'dual'

export const ARTICLES: Article[] = [
  /* ------------------------------------------------------------ I */
  {
    id: 'a1',
    roman: 'I',
    concept: 'Gobierno vs. contabilidad comercial',
    title: 'Por qué no se puede usar la contabilidad de una empresa',
    en: 'Distinctions between governmental and commercial accounting',
    standfirst:
      'La diferencia no empieza en los asientos contables. Empieza en cómo entra el dinero y en qué espera a cambio quien lo aporta.',
    steps: [
      {
        head: 'El dinero entra de otra manera',
        blocks: [
          { k: 'p', t: 'En una empresa, quien aporta recursos espera algo proporcional de vuelta. El cliente paga y se lleva el producto. El accionista invierte, espera dividendos y puede vender su parte.' },
          { k: 'p', t: 'En un gobierno eso se rompe. El <span class="term">contribuyente<i>taxpayer</i></span> paga de forma <em>involuntaria</em>, ante una entidad que casi siempre tiene poder monopólico. No elige cuánto servicio recibe ni puede negarse a pagar.' },
          { k: 'fig', id: 'resources', cap: 'La diferencia está en la flecha de retorno: sólida y proporcional en la empresa, punteada en el gobierno porque lo que recibes no depende de lo que aportaste.' },
        ],
      },
      {
        head: 'Las tres características del FASB',
        blocks: [
          { k: 'p', t: 'El FASB fijó en su <span class="term">Concepts No. 4<i>SFAC 4</i></span> lo que separa a estas entidades de un negocio:' },
          { k: 'p', t: '<em>(a)</em> Reciben recursos de quienes no esperan devolución ni beneficios proporcionales. <em>(b)</em> Su propósito operativo no es generar utilidad. <em>(c)</em> No hay intereses de propiedad que se puedan vender, transferir o redimir.' },
        ],
      },
      {
        head: 'No existe una cifra que lo resuma',
        blocks: [
          { k: 'p', t: 'De aquí sale lo que ordena el resto del curso. Sin mercado competitivo, y sin relación entre lo que se paga y el servicio que se recibe, <em>no hay una cifra de utilidad neta que sirva para juzgar a un gobierno</em>.' },
          { k: 'fig', id: 'noNetIncome', cap: 'Una empresa comprime su desempeño en una sola cifra. Un gobierno no tiene esa cifra, y la rendición de cuentas ocupa su lugar.' },
          { k: 'note', head: 'La pregunta que reemplaza a la utilidad', t: '¿Contra qué se juzga entonces a un gobierno? Contra si cumplió lo que el público decidió, y si usó bien lo que recibió. Ese hueco es el que llena la rendición de cuentas — el artículo II.', tone: 'seal' },
        ],
      },
      {
        head: 'Dos tipos de gobierno',
        blocks: [
          { k: 'p', t: 'Los <span class="term">gobiernos de propósito general<i>general purpose</i></span> —estados, condados, municipios, <em>townships</em>— prestan una gama amplia de servicios.' },
          { k: 'p', t: 'Los de <span class="term">propósito especial<i>special purpose</i></span> —distritos escolares, universidades públicas, distritos de riego o de bomberos— prestan una sola función o unas pocas. Ambos pueden gravar y recaudar.' },
        ],
      },
    ],
    terms: [
      ['General purpose government', 'Gobierno de propósito general: presta una amplia gama de servicios a sus residentes.'],
      ['Special purpose government', 'Gobierno de propósito especial: una sola función o unas pocas, con poder de gravar.'],
      ['Exchange transaction', 'Transacción de intercambio: cobro por un servicio prestado. Existe tanto en gobiernos como en empresas.'],
    ],
    quiz: [
      {
        q: '¿Cuál de los siguientes es un <em>special purpose government</em>?',
        src: '1–19, ítem 1',
        o: ['El estado de Arkansas', 'El condado de Greene', 'Minneapolis Public Schools', 'La ciudad de Seattle'],
        a: 2,
        w: 'Un distrito escolar independiente presta una sola función: educación. Estados, condados y ciudades prestan una gama amplia, así que son de propósito general.',
      },
      {
        q: '¿Qué afirmación es verdadera <em>tanto</em> para un gobierno <em>como</em> para una empresa?',
        src: '1–19, ítem 2',
        o: [
          'Ausencia de motivo de lucro',
          'Puede ganar ingresos mediante transacciones de intercambio',
          'Ausencia de dueños',
          'Los recursos los aportan quienes no se benefician directamente',
        ],
        a: 1,
        w: 'Un gobierno también cobra por servicios: agua, permisos, transporte. Esas son <em>exchange transactions</em>, igual que una venta. Las otras tres describen solo al gobierno.',
      },
      {
        q: 'Según el FASB, ¿cuál <em>no</em> es una de las características que distinguen a estas entidades?',
        src: 'SFAC 4, par. 6',
        o: [
          'Recursos de quienes no esperan beneficios proporcionales',
          'Propósito operativo distinto de generar utilidad',
          'Ausencia de intereses de propiedad definidos',
          'Prohibición legal de acumular superávit',
        ],
        a: 3,
        w: 'No existe tal prohibición: un gobierno puede terminar el año con superávit. Las otras tres son literalmente las tres características de <em>Concepts No. 4</em>.',
      },
    ],
  },

  /* ----------------------------------------------------------- II */
  {
    id: 'a2',
    roman: 'II',
    concept: 'Autoridad legal y rendición de cuentas',
    title: 'La ley manda, y el reporte demuestra que se obedeció',
    en: 'Legal authority and public accountability',
    standfirst:
      'En una empresa el presupuesto es un plan. En un gobierno es una ley. Esa sola diferencia explica buena parte del modelo contable.',
    steps: [
      {
        head: 'El poder reside en el pueblo',
        blocks: [
          { k: 'p', t: 'El GASB describe el entorno de un gobierno señalando dónde reside el poder: <em>en manos del pueblo</em>.' },
          { k: 'p', t: 'Los votantes lo delegan en funcionarios mediante elecciones. Una vez delegado queda repartido entre el ejecutivo, el legislativo y el judicial, y cada rama limita a las otras.' },
          { k: 'fig', id: 'authority', cap: 'Las restricciones llegan de arriba y de los lados. Cada capa impone requisitos que el reporte financiero tiene que poder demostrar.' },
        ],
      },
      {
        head: 'Las restricciones llegan de todos lados',
        blocks: [
          { k: 'p', t: 'A esos límites internos se suman los externos: las leyes de jurisdicciones superiores, los actos del propio cuerpo legislativo y los acuerdos con acreedores.' },
          { k: 'p', t: 'Todos crean requisitos únicos de rendición de cuentas financiera. Y quien recibe subvenciones de un nivel superior debe rendir cuentas a quien se las dio, además de a la ciudadanía.' },
          { k: 'p', t: 'Por eso el GASB afirma que <em>la rendición de cuentas es la piedra angular de todo reporte financiero en el gobierno</em>.' },
        ],
      },
      {
        head: 'Dos preguntas, no una',
        blocks: [
          { k: 'p', t: 'Esa piedra angular se parte en dos, y el examen las distingue sin piedad.' },
          { k: 'p', t: 'La <span class="term">rendición de cuentas fiscal<i>fiscal accountability</i></span> pregunta si el gobierno cumplió lo que el público decidió sobre recaudar y gastar, normalmente dentro del año presupuestario.' },
          { k: 'p', t: 'La <span class="term">operativa<i>operational accountability</i></span> pregunta algo más amplio: si usó sus recursos de forma eficiente y eficaz para cumplir sus objetivos.' },
          { k: 'fig', id: 'accountability', cap: 'Dos preguntas, dos horizontes. Cumplir la ley del presupuesto es de corto plazo; usar bien los recursos es de largo plazo.' },
        ],
      },
      {
        head: 'Vivir dentro de sus medios',
        blocks: [
          { k: 'p', t: 'El GASB considera la <span class="term">equidad entre periodos<i>interperiod equity</i></span> parte esencial de la rendición de cuentas. En una frase: que el gobierno <em>viva dentro de sus medios</em>.' },
          { k: 'p', t: 'El reporte debe permitir evaluar si los recursos del periodo actual bastaron para pagar los servicios del periodo actual.' },
          { k: 'note', head: 'Cuando se rompe, alguien más paga', t: 'El exceso se vuelve carga de contribuyentes futuros que <em>nunca recibieron el beneficio</em>. Ojo: no pregunta si los ingresos superaron a los gastos, ni si los activos cubren los pasivos. Esas son las distractoras clásicas.', tone: 'warn' },
          { k: 'p', t: 'La autoridad legal alcanza también a la auditoría. Las leyes varían de estado a estado, pero en todos los casos la opinión del auditor debe acompañar a los estados del informe.' },
        ],
      },
    ],
    terms: [
      ['Accountability', 'Rendición de cuentas: la piedra angular de todo reporte financiero gubernamental.'],
      ['Fiscal accountability', '¿Cumplió el gobierno lo decidido por el público sobre recaudar y gastar en el periodo?'],
      ['Operational accountability', '¿Usó el gobierno sus recursos de forma eficiente y eficaz?'],
      ['Interperiod equity', 'Equidad entre periodos: si los recursos del año actual pagaron los servicios del año actual.'],
    ],
    quiz: [
      {
        q: 'El concepto de <em>interperiod equity</em> se refiere a si…',
        src: '1–19, ítem 5',
        o: [
          'Los ingresos igualaron o superaron a los gastos del año',
          'Los activos totales bastaron para cubrir los pasivos totales',
          'Los ingresos del año presente bastaron para pagar los servicios del año presente',
          'Los contribuyentes futuros recibirán el mismo nivel de servicios',
        ],
        a: 2,
        w: 'Recursos del periodo actual contra servicios del periodo actual. La opción D suena parecida y es la trampa habitual: describe una consecuencia, no la definición.',
      },
      {
        q: 'James Black revisa el reporte de su ciudad porque le preocupa que <em>no esté usando bien sus recursos</em>. ¿Qué le interesa principalmente?',
        src: '1–19, ítem 4',
        o: ['Fiscal accountability', 'Social accountability', 'Political accountability', 'Operational accountability'],
        a: 3,
        w: '«Usar los recursos de forma eficiente y eficaz» es la definición de <em>operational accountability</em>. La fiscal es distinta: cumplir lo decidido sobre recaudar y gastar dentro del año presupuestario.',
      },
      {
        q: '¿Por qué el presupuesto de un gobierno cambia el modelo contable, a diferencia del de una empresa?',
        src: 'Concepto, LO 1-3',
        o: [
          'Porque es más detallado que el de una empresa',
          'Porque es una autorización legal cuyo cumplimiento el reporte debe poder demostrar',
          'Porque lo aprueba un auditor externo',
          'Porque se prepara con base devengada',
        ],
        a: 1,
        w: 'El presupuesto es una autorización con fuerza de ley, no un plan interno. Demostrar que se cumplió es <em>fiscal accountability</em>, y es la razón de que los fondos gubernamentales usen un enfoque de corto plazo.',
      },
    ],
  },

  /* ---------------------------------------------------------- III */
  {
    id: 'a3',
    roman: 'III',
    concept: 'Jurisdicción GASB vs. FASB',
    title: 'Quién le fija las normas a quién',
    en: 'GASB vs. FASB jurisdiction',
    standfirst:
      'La pregunta de examen casi nunca es qué dice la norma. Es qué tablero le toca a esta entidad — y no se puede elegir.',
    steps: [
      {
        head: 'Tres tableros, no uno',
        blocks: [
          { k: 'p', t: 'La Regla 203 del Código de Conducta Profesional del AICPA designa tres cuerpos con autoridad para establecer los <span class="term">GAAP<i>generally accepted accounting principles</i></span>.' },
          { k: 'p', t: 'El <em>GASB</em> para gobiernos estatales y locales. El <em>FASB</em> para empresas y organizaciones sin fines de lucro. El <em>FASAB</em> para el gobierno federal y sus agencias.' },
          { k: 'fig', id: 'jurisdiction', cap: 'Sigue la flecha hacia arriba desde la entidad. La fila de abajo es donde se pierde la mayoría de los puntos.' },
        ],
      },
      {
        head: 'Quién supervisa a quién',
        blocks: [
          { k: 'p', t: 'El GASB y el FASB son cuerpos <em>paralelos</em> bajo la <span class="term">Financial Accounting Foundation<i>FAF</i></span>, que nombra a sus miembros. El GASB se formó en 1984; el FASB, en 1973.' },
          { k: 'p', t: 'El FASAB nació por otra vía. Lo crearon en 1990 el <em>Comptroller General</em>, el director de la OMB y el secretario del Tesoro. Sus normas deben ser consistentes con las del GASB en lo posible.' },
        ],
      },
      {
        head: 'La línea donde se pierde el punto',
        blocks: [
          { k: 'p', t: 'La autoridad sobre las organizaciones sin fines de lucro <em>está partida</em>, porque muchas son de naturaleza gubernamental.' },
          { k: 'note', head: 'La regla, sin excepciones', t: 'Si la NFP es gubernamental —universidad pública, hospital público— sigue al <em>GASB</em>. Si es independiente de un gobierno, sigue al <em>FASB</em>. No lo decide la administración ni el consejo: depende de lo que la entidad <em>es</em>.', tone: 'warn' },
        ],
      },
      {
        head: 'Por qué se les llama independientes',
        blocks: [
          { k: 'p', t: 'La ley Sarbanes-Oxley impuso una cuota sobre emisiones de valores corporativos para sostener al FASB.' },
          { k: 'p', t: 'La Dodd-Frank de 2010 ordenó una cuota equivalente para el GASB, y FINRA la estableció en 2012 sobre las firmas que reportan operaciones de valores municipales.' },
          { k: 'p', t: 'Al no depender de ninguna organización ni gobierno en particular, a ambos se les describe como <em>independent standards-setting boards in the private sector</em>.' },
        ],
      },
    ],
    terms: [
      ['GASB', 'Normas para gobiernos estatales y locales, incluidas sus organizaciones sin fines de lucro. Formado en 1984.'],
      ['FASB', 'Normas para empresas y para NFP no gubernamentales. Formado en 1973.'],
      ['FASAB', 'Normas para el gobierno federal y sus agencias. Creado en 1990.'],
      ['FAF', 'Financial Accounting Foundation: supervisa y nombra a los miembros del GASB y del FASB.'],
      ['GAAP', 'Principios de contabilidad generalmente aceptados, según la Regla 203 del AICPA.'],
    ],
    quiz: [
      {
        q: '¿Qué afirmación sobre las fuentes de normas es <em>falsa</em>?',
        src: '1–19, ítem 3',
        o: [
          'El GASB fija normas para todos los gobiernos estatales y locales',
          'El FASB fija normas para todas las entidades empresariales y sin fines de lucro',
          'El FASB y el GASB son administrados por la Financial Accounting Foundation',
          'El FASAB fija normas para el gobierno federal y sus agencias',
        ],
        a: 1,
        w: 'Es falsa por la palabra «todas». El FASB no cubre a las NFP gubernamentales —universidades y hospitales públicos— que siguen al GASB.',
      },
      {
        q: 'Un consejero del Beth House Museum (NFP no gubernamental) dice: «podemos elegir entre las reglas del FASB o las del GASB». ¿Tiene razón?',
        src: '1–4',
        o: [
          'Sí; ambos están bajo la FAF, así que son intercambiables',
          'Sí, si el consejo lo aprueba por mayoría',
          'No; al ser una NFP no gubernamental le corresponde el FASB, sin opción',
          'No; toda NFP sigue al GASB',
        ],
        a: 2,
        w: 'No hay elección. El cuerpo normativo lo determina la naturaleza de la entidad. Si el museo fuera operado por una ciudad, sería GASB.',
      },
      {
        q: 'Asigna: <em>Department of Defense</em> · <em>Mayo Clinic</em> · <em>New York City</em>.',
        src: '1–21',
        o: ['FASAB · FASB · GASB', 'GASB · FASB · FASAB', 'FASAB · GASB · GASB', 'FASB · FASB · GASB'],
        a: 0,
        w: 'Defensa es una agencia federal → FASAB. Mayo Clinic es una NFP privada → FASB. Nueva York es un gobierno local → GASB.',
      },
      {
        q: 'Una universidad pública estatal y una universidad privada. ¿Qué normas sigue cada una?',
        src: '1–21',
        o: ['Ambas FASB', 'Ambas GASB', 'La pública GASB; la privada FASB', 'La pública FASAB; la privada FASB'],
        a: 2,
        w: 'La universidad pública es una NFP gubernamental → GASB. La privada es independiente de un gobierno → FASB. El FASAB solo cubre al gobierno federal.',
      },
    ],
  },

  /* ----------------------------------------------------------- IV */
  {
    id: 'a4',
    roman: 'IV',
    concept: 'Estructura del CAFR / ACFR',
    title: 'Lo mínimo obligatorio, y el informe que lo contiene',
    en: 'Basic CAFR / ACFR structure',
    standfirst:
      'Son dos cosas distintas y se confunden constantemente. Una es obligatoria y pequeña. La otra es voluntaria y mucho más grande.',
    steps: [
      {
        head: 'Dos cosas que se confunden siempre',
        blocks: [
          { k: 'p', t: 'El GASB fija un <em>mínimo obligatorio</em> de reporte financiero externo. Por separado existe el informe anual completo, que <em>no es obligatorio</em> aunque casi todos los gobiernos lo preparan.' },
          { k: 'p', t: 'El mínimo vive <em>dentro</em> del informe. Confundirlos es el error más común del capítulo.' },
        ],
      },
      {
        head: 'Qué exige el mínimo',
        blocks: [
          { k: 'p', t: 'Cuatro cosas: el <span class="term">MD&amp;A<i>management’s discussion and analysis</i></span>, los estados básicos —de todo el gobierno y por fondos—, sus notas, y la <span class="term">RSI<i>required supplementary information</i></span> distinta del MD&amp;A.' },
          { k: 'p', t: 'El MD&amp;A es a la vez RSI y el centro del modelo: cuenta en forma narrativa y legible qué hay en los estados y cómo fue el año frente al anterior. Las notas son <em>parte integral</em> de los estados.' },
        ],
      },
      {
        head: 'La anatomía del informe',
        blocks: [
          { k: 'fig', id: 'acfr', cap: 'Léelo como una caja dentro de otra caja. Todo lo que queda fuera del corchete va más allá del mínimo.' },
          { k: 'p', t: '<em>Introductoria:</em> portada, índice, carta de transmisión y descripción del gobierno.' },
          { k: 'p', t: '<em>Financiera:</em> informe del auditor, MD&amp;A, estados básicos y notas, RSI, e información suplementaria como los <em>combining statements</em>.' },
          { k: 'p', t: '<em>Estadística:</em> datos demográficos y económicos, tendencias financieras, capacidad fiscal e información operativa.' },
        ],
      },
      {
        head: 'CAFR pasó a llamarse ACFR',
        blocks: [
          { k: 'note', head: 'Tu libro dice CAFR; la norma vigente dice ACFR', t: 'El texto, de 2019, dice <em>comprehensive annual financial report</em>. En 2021 el GASB lo renombró <span class="term">annual comprehensive financial report<i>ACFR</i></span> con su <em>Statement No. 98</em>, porque la sigla anterior suena como un insulto racial en inglés sudafricano.', tone: 'seal' },
          { k: 'p', t: 'Es el mismo documento, con las mismas tres secciones y el mismo contenido. Reconoce los dos términos: verás CAFR en material anterior a 2021 y ACFR en todo lo actual.' },
        ],
      },
      {
        head: 'Por qué hay dos juegos de estados',
        blocks: [
          { k: 'p', t: 'Cada juego responde a una de las dos preguntas del artículo II.' },
          { k: 'fig', id: 'dual', cap: 'Bajo devengado modificado los ingresos se reconocen cuando son medibles y están disponibles, y se registran expenditures —no expenses— cuando obligan recursos corrientes.' },
          { k: 'p', t: 'Los de todo el gobierno usan lo mismo que una empresa —base devengada y recursos económicos— porque así se evalúa mejor la rendición de cuentas operativa.' },
          { k: 'p', t: 'Los de fondos gubernamentales miran el corto plazo, que es lo que permite evaluar la fiscal. Nota: el GASB dice <em>net position</em> donde el FASB dice <em>net assets</em>; son lo mismo.' },
        ],
      },
    ],
    terms: [
      ['CAFR / ACFR', 'El informe anual completo. Renombrado de comprehensive a annual comprehensive por GASB 98 (2021). No es obligatorio.'],
      ['MD&A', 'Discusión y análisis de la administración: narrativa legible; es RSI y es el centro del modelo.'],
      ['RSI', 'Required supplementary information: obligatoria, fuera de los estados básicos.'],
      ['Government-wide statements', 'Agregados; base devengada; recursos económicos; responden por la rendición de cuentas operativa.'],
      ['Fund statements', 'Por fondos; los gubernamentales usan devengado modificado; responden por la rendición de cuentas fiscal.'],
      ['Modified accrual', 'Ingresos cuando son medibles y están disponibles; expenditures cuando obligan recursos corrientes.'],
    ],
    quiz: [
      {
        q: '¿Qué componentes forman el <em>mínimo requerido</em> de reporte financiero externo de propósito general?',
        src: '1–19, ítem 6',
        o: [
          'Sección introductoria, sección financiera y sección estadística',
          'MD&amp;A, estados de todo el gobierno, estados por fondos, notas y RSI',
          'Carta del director financiero, estados del gobierno, notas y RSI',
          'MD&amp;A, estados de todo el gobierno, notas y RSI',
        ],
        a: 1,
        w: 'La opción A describe las secciones del <em>ACFR</em>, no el mínimo: esa es justamente la confusión que se busca. La D omite los estados por fondos, que sí son parte de los estados básicos.',
      },
      {
        q: 'La información útil para evaluar la <em>operational accountability</em> se reporta principalmente en…',
        src: '1–19, ítem 7',
        o: ['Los estados por fondos', 'Los estados de todo el gobierno', 'La sección estadística', 'La carta de transmisión'],
        a: 1,
        w: 'Los estados de todo el gobierno usan base devengada y recursos económicos, que es lo que permite juzgar eficiencia y eficacia. Los estados por fondos sirven para la rendición de cuentas fiscal.',
      },
      {
        q: '¿Cuál de estos <em>no</em> forma parte de la sección financiera?',
        src: '1–8 y 1–17',
        o: ['El informe del auditor', 'El MD&amp;A', 'La carta de transmisión', 'Los combining and individual fund statements'],
        a: 2,
        w: 'La carta de transmisión va en la sección <em>introductoria</em>. Es la pieza que más se coloca mal, porque suena a algo financiero.',
      },
      {
        q: 'Bajo <em>modified accrual</em>, ¿cuándo se reconoce un ingreso?',
        src: 'LO 1-4',
        o: [
          'Cuando se gana, sin importar cuándo se cobra',
          'Cuando es medible y está disponible para gastar',
          'Cuando se recibe el efectivo, siempre',
          'Cuando lo aprueba el presupuesto',
        ],
        a: 1,
        w: '«Medible y disponible» es la fórmula exacta. Del otro lado se registran <em>expenditures</em>, no <em>expenses</em>.',
      },
      {
        q: '¿Qué cambió el <em>Statement No. 98</em> del GASB en 2021?',
        src: 'GASB 98',
        o: [
          'Eliminó la sección estadística del informe',
          'Hizo obligatorio el informe anual completo',
          'Renombró el CAFR como ACFR, sin cambiar su contenido',
          'Sustituyó el devengado modificado por el devengado pleno',
        ],
        a: 2,
        w: 'Solo el nombre: de <em>comprehensive annual financial report</em> a <em>annual comprehensive financial report</em>. Mismo documento, mismas secciones, mismo contenido.',
      },
    ],
  },
]

/* ------------------------------------------------------------------
   Cierre — el caso 1–17 / 1–18 con guía mínima
   ------------------------------------------------------------------ */

export const SORT_BINS = ['Introductoria', 'Financiera', 'Estadística']
export const SORT_ITEMS: [string, number][] = [
  ['Carta de transmisión', 0],
  ['Portada e índice', 0],
  ['Descripción del gobierno', 0],
  ['Informe del auditor independiente', 1],
  ['MD&A', 1],
  ['Estados básicos y notas', 1],
  ['RSI distinta del MD&A', 1],
  ['Combining and individual fund statements', 1],
  ['Tablas demográficas y económicas', 2],
  ['Tendencias financieras', 2],
  ['Capacidad fiscal', 2],
  ['Información operativa', 2],
]

export const MATCH_BINS: [string, string][] = [
  ['G', 'GASB'],
  ['F', 'FASB'],
  ['FB', 'FASAB'],
]
export const MATCH_ITEMS: [string, string][] = [
  ['Una universidad estatal pública', 'G'],
  ['Department of Defense', 'FB'],
  ['AICPA', 'F'],
  ['El condado donde vives', 'G'],
  ['Internal Revenue Service', 'FB'],
  ['Mayo Clinic', 'F'],
  ['New York City', 'G'],
  ['American Cancer Society', 'F'],
  ['Metropolitan Washington Airports Authority', 'G'],
  ['The Metropolitan Museum of Art', 'F'],
]

export const GRID_COLS = ['Gobierno', 'NFP privada', 'Empresa']
export const GRID_ROWS: [string, ('Y' | 'N')[]][] = [
  ['Ausencia de intereses de propiedad que se puedan vender', ['Y', 'Y', 'N']],
  ['Quien aporta recursos espera un beneficio proporcional', ['N', 'N', 'Y']],
  ['Su desempeño global se resume en una cifra de net income', ['N', 'N', 'Y']],
  ['Exige un MD&A como required supplementary information', ['Y', 'N', 'N']],
  ['Prepara estados government-wide y estados por fondos', ['Y', 'N', 'N']],
  ['Reporta net assets con y sin restricciones de donante', ['N', 'Y', 'N']],
  ['Prepara un statement of activities', ['Y', 'Y', 'N']],
  ['Sigue normas emitidas por el GASB', ['Y', 'N', 'N']],
]

export const FINAL: Question[] = [
  {
    q: 'Un ciudadano quiere saber si su ciudad <em>cumplió el presupuesto aprobado</em>. ¿Qué estados consulta y con qué base contable?',
    src: 'Cruza los artículos II y IV',
    o: [
      'Government-wide, base devengada',
      'Estados por fondos gubernamentales, devengado modificado',
      'La sección estadística del ACFR',
      'La carta de transmisión',
    ],
    a: 1,
    w: 'Cumplir lo aprobado dentro del año es <em>fiscal accountability</em> → estados por fondos → devengado modificado, con enfoque de recursos financieros corrientes.',
  },
  {
    q: 'La ciudad publicó solo el mínimo requerido, sin ACFR. ¿Qué <em>no</em> vas a encontrar?',
    src: 'Artículo IV',
    o: ['El MD&A', 'Los estados financieros básicos', 'La carta de transmisión y la sección estadística', 'Las notas'],
    a: 2,
    w: 'El mínimo es MD&amp;A + estados básicos + notas + RSI. La carta de transmisión y la sección estadística existen solo dentro del informe completo, que es voluntario.',
  },
  {
    q: 'El concejo pregunta si la ciudad «vivió dentro de sus medios». ¿Qué concepto invocan?',
    src: 'Artículo II',
    o: [
      'Operational accountability',
      'Interperiod equity',
      'Stewardship',
      'Budgetary integrity',
    ],
    a: 1,
    w: '«Vivir dentro de sus medios» es la definición literal de <em>interperiod equity</em>. Si no se cumple, la diferencia la pagan contribuyentes futuros que no recibieron el servicio.',
  },
  {
    q: 'Un hospital operado por un condado prepara sus estados. ¿Qué normas sigue y por qué?',
    src: 'Artículo III',
    o: [
      'FASB, porque es una organización sin fines de lucro',
      'GASB, porque es una NFP gubernamental',
      'FASAB, porque recibe fondos federales',
      'Puede elegir entre GASB y FASB',
    ],
    a: 1,
    w: 'Ser sin fines de lucro no decide nada por sí solo. Lo que decide es si la entidad es gubernamental: al ser operada por un condado, sigue al GASB.',
  },
  {
    q: '¿Por qué un gobierno no puede ser evaluado con una cifra de utilidad neta?',
    src: 'Artículo I',
    o: [
      'Porque la ley le prohíbe generar superávit',
      'Porque no lleva contabilidad de costos',
      'Porque no hay mercado competitivo ni relación entre lo pagado y el servicio recibido',
      'Porque sus ingresos no son medibles',
    ],
    a: 2,
    w: 'El contribuyente aporta de forma involuntaria ante un monopolio y no elige el nivel de servicio. Sin esa relación, ninguna cifra única resume el desempeño — y por eso la rendición de cuentas ocupa su lugar.',
  },
  {
    q: 'Tu fuente de 2019 dice «CAFR» y la circular del estado de 2024 dice «ACFR». ¿Qué concluyes?',
    src: 'Artículo IV · GASB 98',
    o: [
      'Son informes distintos con contenidos distintos',
      'El ACFR reemplazó al CAFR y además añadió la sección estadística',
      'Es el mismo informe; GASB 98 solo cambió el nombre en 2021',
      'El CAFR es voluntario y el ACFR obligatorio',
    ],
    a: 2,
    w: 'Mismo documento, mismas tres secciones, mismo contenido. Solo cambió el nombre. Verás ambos términos según la fecha del material.',
  },
]

export const GLOSSARY: [string, string, string, string][] = [
  ['Accountability', 'Rendición de cuentas', 'La piedra angular de todo reporte financiero gubernamental: justificar cómo se obtienen y se usan los recursos públicos.', 'II'],
  ['ACFR / CAFR', 'Informe anual integral', 'El informe completo de tres secciones. No es obligatorio. Renombrado por GASB 98 en 2021; el contenido no cambió.', 'IV'],
  ['Basic financial statements', 'Estados financieros básicos', 'Las dos categorías que prescribe el GASB —government-wide y fund— junto con sus notas, que son parte integral.', 'IV'],
  ['Exchange transaction', 'Transacción de intercambio', 'Cobro por un servicio prestado. Ocurre tanto en gobiernos como en empresas, y por eso no sirve para distinguirlos.', 'I'],
  ['FAF', 'Financial Accounting Foundation', 'Supervisa al GASB y al FASB, nombra a sus miembros y sostiene sus operaciones.', 'III'],
  ['FASAB', 'Federal Accounting Standards Advisory Board', 'Creado en 1990 por el Comptroller General, el director de la OMB y el secretario del Tesoro. Cubre el gobierno federal.', 'III'],
  ['FASB', 'Financial Accounting Standards Board', 'Formado en 1973. Normas para empresas y para NFP no gubernamentales.', 'III'],
  ['Fiscal accountability', 'Rendición de cuentas fiscal', 'Si el gobierno cumplió lo decidido por el público sobre recaudar y gastar, normalmente dentro del año presupuestario.', 'II'],
  ['GAAP', 'Principios de contabilidad generalmente aceptados', 'Establecidos por GASB, FASB y FASAB según la Regla 203 del Código de Conducta Profesional del AICPA.', 'III'],
  ['GASB', 'Governmental Accounting Standards Board', 'Formado en 1984. Normas para gobiernos estatales y locales, incluidas sus NFP.', 'III'],
  ['General purpose government', 'Gobierno de propósito general', 'Estados, condados, municipios y townships: prestan una amplia gama de servicios.', 'I'],
  ['Government-wide statements', 'Estados de todo el gobierno', 'Vista agregada. Base devengada y recursos económicos. Responden por la rendición de cuentas operativa.', 'IV'],
  ['Interperiod equity', 'Equidad entre periodos', 'Que el gobierno viva dentro de sus medios: si los recursos del año actual pagaron los servicios del año actual.', 'II'],
  ['MD&A', 'Discusión y análisis de la administración', 'RSI narrativa y legible sobre el propósito de los estados básicos y la situación frente al año anterior.', 'IV'],
  ['Modified accrual', 'Base devengada modificada', 'Ingresos cuando son medibles y están disponibles; expenditures cuando obligan recursos financieros corrientes.', 'IV'],
  ['Net position / Net assets', 'Activo neto', 'El GASB dice net position; el FASB dice net assets. Son sustancialmente lo mismo.', 'IV'],
  ['Operational accountability', 'Rendición de cuentas operativa', 'Si el gobierno usó sus recursos de forma eficiente y eficaz para cumplir sus objetivos operativos.', 'II'],
  ['RSI', 'Información suplementaria requerida', 'Obligatoria y fuera de los estados básicos. El MD&A es RSI, y además se exige otra RSI distinta del MD&A.', 'IV'],
  ['Special purpose government', 'Gobierno de propósito especial', 'Distritos escolares independientes, universidades públicas y distritos especiales: una función o unas pocas.', 'I'],
]
