/* Capítulo 2 — Principios de contabilidad y reporte financiero para
   gobiernos estatales y locales.
   Reck, Lowensohn & Neely, 18e, cap. 2. */

import type { Article, Chapter, Question } from '../types'

const ARTICLES: Article[] = [
  /* ------------------------------------------------------------ I */
  {
    id: 'b1',
    roman: 'I',
    concept: 'El modelo integrado de reporte',
    title: 'Dos juegos de estados que cuentan la misma historia',
    en: 'The GASB integrated reporting model',
    standfirst:
      'El gobierno no elige entre reportar a largo o a corto plazo. Reporta las dos cosas, en dos juegos de estados que después tiene que conciliar entre sí.',
    steps: [
      {
        head: 'Tres tipos de actividad',
        blocks: [
          { k: 'p', t: 'Casi todo gobierno de propósito general hace tres cosas distintas, y el modelo de reporte nace de esa división.' },
          { k: 'p', t: 'Las <span class="term">actividades gubernamentales<i>governmental activities</i></span> son los servicios centrales: policía, bomberos, calles, parques, educación, y el soporte administrativo.' },
          { k: 'p', t: 'Las <span class="term">tipo negocio<i>business-type</i></span> cobran al usuario: agua, alcantarillado, transporte, estacionamientos, albercas. Las <span class="term">fiduciarias<i>fiduciary</i></span> son recursos de terceros que el gobierno solo custodia.' },
          { k: 'fig', id: 'activities', cap: 'Solo se reportan como fiduciarias las relaciones de custodia o fideicomiso que benefician a terceros. Si la actividad apoya los programas del propio gobierno, es gubernamental.' },
        ],
      },
      {
        head: 'El primer juego: todo el gobierno',
        blocks: [
          { k: 'p', t: 'Los <span class="term">estados de todo el gobierno<i>government-wide</i></span> son dos: el <em>statement of net position</em> y el <em>statement of activities</em>.' },
          { k: 'p', t: 'Usan <em>enfoque de recursos económicos y base devengada</em>, igual que una empresa. Presentan columnas separadas para actividades gubernamentales y tipo negocio, más un total del gobierno primario.' },
          { k: 'p', t: 'Dos rarezas frente a una empresa: los gastos se reportan <em>por función o programa</em>, no por naturaleza; y el <em>net position</em> se parte en tres —inversión neta en activos de capital, restringido y no restringido—.' },
        ],
      },
      {
        head: 'El segundo juego: por fondos',
        blocks: [
          { k: 'p', t: 'Además hay <em>tres</em> juegos de estados por fondos, uno por cada categoría: gubernamentales, propietarios y fiduciarios.' },
          { k: 'fig', id: 'model', cap: 'Las categorías de fondos corresponden a las tres actividades, con una excepción que se pregunta mucho: los internal service funds son fondos propietarios, pero al nivel de todo el gobierno casi siempre se reportan dentro de actividades gubernamentales.' },
          { k: 'p', t: 'La razón: aunque operan como negocio, los internal service funds sirven sobre todo a departamentos del mismo gobierno, no al público. Si sirven principalmente a fondos enterprise, entonces sí van en la columna tipo negocio.' },
        ],
      },
      {
        head: 'Lo fiduciario queda fuera de arriba',
        blocks: [
          { k: 'note', head: 'La regla que hay que fijar', t: 'Los recursos fiduciarios <em>no pueden usarse para los programas del gobierno</em>. Por eso el GASB exige que se omitan de los estados de todo el gobierno y aparezcan <em>solo</em> en sus dos estados por fondos.', tone: 'warn' },
          { k: 'p', t: 'Esos dos son el <em>statement of fiduciary net position</em> y el <em>statement of changes in fiduciary net position</em>. Ambos con recursos económicos y devengado.' },
        ],
      },
      {
        head: 'Y por eso hay conciliación',
        blocks: [
          { k: 'p', t: 'La misma información de actividades gubernamentales aparece medida de dos maneras distintas. Eso confunde, y el GASB lo resuelve exigiendo conciliaciones.' },
          { k: 'p', t: 'El total de <em>fund balances</em> del balance de fondos gubernamentales debe conciliarse con el <em>net position</em> de actividades gubernamentales. Lo mismo con el cambio del periodo entre ambos estados operativos.' },
          { k: 'p', t: 'Puede ir al pie del propio estado o como cédula aparte. Por ahora basta con saber que es obligatoria: prepararla se ve en el capítulo 9.' },
        ],
      },
    ],
    terms: [
      ['Governmental activities', 'Servicios centrales: seguridad, obras públicas, cultura, educación y soporte administrativo.'],
      ['Business-type activities', 'Actividades que cobran al usuario y buscan autofinanciarse: agua, transporte, estacionamientos.'],
      ['Fiduciary activities', 'Recursos que el gobierno custodia para terceros. Se omiten de los estados de todo el gobierno.'],
      ['Statement of net position', 'El balance de todo el gobierno. Net position = activos + deferred outflows − pasivos − deferred inflows.'],
      ['Statement of activities', 'Estado operativo de todo el gobierno. Reporta gastos por función o programa, no por naturaleza.'],
    ],
    quiz: [
      {
        q: '¿Qué afirmación sobre los estados básicos de un gobierno estatal o local es correcta?',
        src: '2–16, ítem 2',
        o: [
          'Los estados de todo el gobierno llevan columnas separadas para actividades gubernamentales y tipo negocio',
          'Los estados por fondos llevan una columna por cada fondo mayor',
          'Los fondos no mayores se agregan en una sola columna',
          'Todas las anteriores',
        ],
        a: 3,
        w: 'Las tres son correctas. Columnas por tipo de actividad arriba, columna por fondo mayor abajo, y una sola columna agregada para todos los no mayores.',
      },
      {
        q: 'Los activos y pasivos que el gobierno mantiene como custodio o fiduciario para terceros se reportan en…',
        src: '2–16, ítem 7',
        o: [
          'La columna fiduciaria de los estados de todo el gobierno',
          'Los estados por fondos fiduciarios',
          'Ambos, de todo el gobierno y por fondos',
          'Ninguno de los dos',
        ],
        a: 1,
        w: 'Solo en los estados por fondos fiduciarios. Como esos recursos no pueden financiar los programas del gobierno, se omiten de los estados de todo el gobierno. No existe una columna fiduciaria arriba.',
      },
      {
        q: 'La información de un <em>internal service fund</em> se reporta en los estados por fondos propietarios y además en…',
        src: '2–16, ítem 9',
        o: [
          'La columna de actividades gubernamentales',
          'La columna de actividades tipo negocio',
          'Una u otra, según a quién sirva predominantemente',
          'Ninguna: se omite de los estados de todo el gobierno',
        ],
        a: 2,
        w: 'Depende de a quién sirve. Como suele servir a departamentos del propio gobierno, casi siempre va en actividades gubernamentales; si sirve sobre todo a fondos enterprise, va en tipo negocio.',
      },
    ],
  },

  /* ----------------------------------------------------------- II */
  {
    id: 'b2',
    roman: 'II',
    concept: 'Las tres categorías de fondos',
    title: 'Once tipos de fondo, tres categorías, un solo criterio',
    en: 'Fund categories: governmental, proprietary, fiduciary',
    standfirst:
      'El plan de cuentas de un condado está organizado por fondos. Saber en qué categoría cae cada uno es lo que te dice qué base contable aplicarle.',
    steps: [
      {
        head: 'Qué es exactamente un fondo',
        blocks: [
          { k: 'p', t: 'En el gobierno, las exigencias legales y las de los GAAP con frecuencia chocan. El sistema contable tiene que poder satisfacer <em>las dos</em>. De esa tensión nacen los fondos.' },
          { k: 'p', t: 'Un <span class="term">fondo<i>fund</i></span> es una entidad fiscal <em>y</em> contable, con un juego de cuentas que cuadra solo, que registra recursos y sus pasivos relacionados, segregados para una actividad u objetivo específico.' },
          { k: 'p', t: 'Es decir: tiene sus propios recursos, sus propios pasivos y sus propios registros, y podría preparar estados por separado. Se crean por contrato o subvención, por legislación habilitante, o por decisión del propio gobierno.' },
          { k: 'note', head: 'Los mínimos posibles', t: 'El GASB recomienda establecer <em>solo el número mínimo de fondos</em> necesario para cumplir la ley y administrar bien. Demasiados fondos crean complejidad inútil y administración ineficiente.', tone: 'seal' },
        ],
      },
      {
        head: 'Categoría 1 · Fondos gubernamentales',
        blocks: [
          { k: 'p', t: 'Cinco tipos. Todo gobierno tiene <em>uno y solo uno</em> <span class="term">General Fund<i>fondo general</i></span>: es el fondo operativo principal, y ahí va todo lo que no esté obligado a ir en otro lado.' },
          { k: 'p', t: 'Los <em>special revenue funds</em> guardan ingresos restringidos o comprometidos para un propósito operativo concreto: una biblioteca, el mantenimiento de calles.' },
          { k: 'p', t: 'Los <em>debt service funds</em> pagan principal e intereses de deuda general a largo plazo. Los <em>capital projects funds</em> registran la compra o construcción de activos de larga vida.' },
          { k: 'p', t: 'Los <em>permanent funds</em> son dotaciones donde el principal se preserva a perpetuidad y los rendimientos apoyan un <em>propósito público</em>. Si los rendimientos benefician a particulares, no es permanent fund sino private-purpose trust.' },
        ],
      },
      {
        head: 'Categoría 2 · Fondos propietarios',
        blocks: [
          { k: 'p', t: 'Dos tipos, y se distinguen por <em>a quién le venden</em>.' },
          { k: 'p', t: 'Los <span class="term">internal service funds<i>servicios internos</i></span> sirven a departamentos del mismo gobierno a costo reembolsable: compras centralizadas, almacén, flotilla, procesamiento de datos, autoseguro.' },
          { k: 'p', t: 'Los <span class="term">enterprise funds<i>empresariales</i></span> venden al público. El GASB los <em>exige</em> si la deuda está garantizada solo por los ingresos de la actividad, si la ley obliga a recuperar los costos con tarifas, o si la política de precios está diseñada para recuperar costos.' },
        ],
      },
      {
        head: 'Categoría 3 · Fondos fiduciarios',
        blocks: [
          { k: 'p', t: 'Uno de custodia y tres de fideicomiso. Los <em>custodial funds</em> se usan cuando el gobierno solo administra activos de terceros — por ejemplo, impuestos cobrados por cuenta de otro gobierno.' },
          { k: 'p', t: 'Para ser <em>trust fund</em> tiene que haber un acuerdo de fideicomiso, o tratarse de un plan de pensiones o beneficios post-empleo.' },
          { k: 'fig', id: 'funds', cap: 'Once tipos de fondo. La columna de la derecha es la que decide todo lo demás: la categoría determina el enfoque de medición y la base contable, que es el artículo III.' },
          { k: 'p', t: 'Los <em>pension trust funds</em> guardan activos para el retiro de empleados. Los <em>investment trust funds</em> reportan la parte de participantes externos en el fondo de inversión del gobierno. Los <em>private-purpose trust funds</em> benefician a particulares, organizaciones u otros gobiernos.' },
        ],
      },
    ],
    terms: [
      ['Fund', 'Entidad fiscal y contable, con cuentas que cuadran solas, segregada para una actividad u objetivo.'],
      ['General Fund', 'El fondo operativo principal. Cada gobierno tiene uno y solo uno.'],
      ['Special revenue fund', 'Ingresos restringidos o comprometidos para un propósito operativo específico.'],
      ['Permanent fund', 'Dotación cuyo principal se preserva y cuyos rendimientos apoyan un propósito público.'],
      ['Internal service fund', 'Sirve a departamentos del mismo gobierno a costo reembolsable.'],
      ['Enterprise fund', 'Vende bienes o servicios al público a cambio de una tarifa.'],
      ['Custodial fund', 'El gobierno solo administra activos de terceros, sin fideicomiso.'],
    ],
    quiz: [
      {
        q: '¿Qué afirmación sobre la definición de un <em>fondo</em> es correcta?',
        src: '2–16, ítem 1',
        o: [
          'Es una entidad fiscal diseñada para demostrar cumplimiento de disposiciones legales y contractuales',
          'Es una entidad contable que permite reportar según GAAP sin verse restringida por lo legal',
          'Es un mecanismo para contabilizar ingresos y gastos restringidos aparte de los no restringidos',
          'Existe para llevar actividades donde no hay reglas ni restricciones específicas',
        ],
        a: 2,
        w: 'La necesidad de separar recursos con restricciones legales o contractuales de los que no las tienen es exactamente lo que dio origen a los fondos. Un fondo es a la vez entidad fiscal y contable, y sirve para lo legal <em>y</em> para GAAP.',
      },
      {
        q: 'Una dotación cuyo principal se preserva y cuyos rendimientos pagan becas <em>a hijos de policías caídos</em> se registra en…',
        src: '2–19',
        o: ['Un permanent fund', 'Un private-purpose trust fund', 'Un special revenue fund', 'Un custodial fund'],
        a: 1,
        w: 'El beneficio va a particulares, no a un programa del gobierno. Si los rendimientos apoyaran un cementerio o un parque público sería permanent fund; al beneficiar a personas concretas es fiduciario.',
      },
      {
        q: 'El costo de una función central de compras y almacén que sirve a los departamentos del propio gobierno va en…',
        src: '2–19',
        o: ['El General Fund', 'Un enterprise fund', 'Un internal service fund', 'Un capital projects fund'],
        a: 2,
        w: 'Servir a departamentos del mismo gobierno a costo reembolsable es la definición de internal service fund. Si vendiera al público sería enterprise.',
      },
      {
        q: 'Los impuestos que un gobierno cobra <em>por cuenta de otro gobierno</em> se registran en…',
        src: '2–19',
        o: ['Un investment trust fund', 'Un custodial fund', 'Un special revenue fund', 'El General Fund'],
        a: 1,
        w: 'No hay acuerdo de fideicomiso; el gobierno solo administra y entrega. Eso es un custodial fund, la categoría fiduciaria más simple.',
      },
    ],
  },

  /* ---------------------------------------------------------- III */
  {
    id: 'b3',
    roman: 'III',
    concept: 'Enfoque de medición y base contable',
    title: 'Dos formas de medir la misma transacción',
    en: 'Measurement focus and basis of accounting',
    standfirst:
      'Enfoque de medición responde «¿qué se mide?». Base contable responde «¿cuándo se registra?». Van siempre en pareja, y la categoría del fondo decide cuál pareja te toca.',
    steps: [
      {
        head: 'La pareja corta',
        blocks: [
          { k: 'p', t: 'Los fondos <em>gubernamentales</em> usan <span class="term">recursos financieros corrientes<i>current financial resources</i></span> con <span class="term">devengado modificado<i>modified accrual</i></span>.' },
          { k: 'p', t: 'Se mide solo el efectivo y lo que se convertirá en efectivo a tiempo para pagar obligaciones del periodo. El ingreso se reconoce cuando es <em>medible</em> y está <span class="term">disponible<i>available</i></span>.' },
          { k: 'note', head: 'Cuánto es «disponible»', t: 'Cada gobierno define su propio plazo, salvo una excepción: los impuestos prediales deben cobrarse <em>dentro de 60 días</em> del cierre para considerarse disponibles. La mayoría adopta 60 días para todo, pero el rango va de 30 días a un año.', tone: 'seal' },
        ],
      },
      {
        head: 'Qué desaparece del balance',
        blocks: [
          { k: 'p', t: 'Consecuencia directa del enfoque corto: el balance de fondos gubernamentales <em>no reporta</em> activos de capital ni deuda a largo plazo.' },
          { k: 'p', t: 'Los terrenos, edificios y equipo no sirven para pagar obligaciones del periodo. Las obligaciones a largo plazo no hay que pagarlas este periodo. Ninguno de los dos entra.' },
          { k: 'p', t: 'Los dos <em>sí</em> aparecen, pero arriba: en la columna de actividades gubernamentales del statement of net position. La misma realidad, medida con la otra pareja.' },
        ],
      },
      {
        head: 'Expenditures no es expenses',
        blocks: [
          { k: 'p', t: 'Los <span class="term">expenditures<i>egresos</i></span> son los recursos usados para adquirir un activo o servicio, y se reconocen cuando surge la obligación de pagar con recursos corrientes.' },
          { k: 'p', t: 'Los <span class="term">expenses<i>gastos</i></span> son costos expirados o consumidos al prestar el servicio. Miden el costo a largo plazo, así que pertenecen al nivel de todo el gobierno.' },
          { k: 'fig', id: 'focus', cap: 'Comprar una patrulla de $60 000 es un expenditure completo el año de la compra en el fondo; arriba es un activo que se deprecia por años. La misma transacción, dos cifras distintas — y por eso hay conciliación.' },
        ],
      },
      {
        head: 'La pareja larga',
        blocks: [
          { k: 'p', t: 'Todo lo demás usa <span class="term">recursos económicos<i>economic resources</i></span> con <span class="term">devengado pleno<i>accrual</i></span>: los estados de todo el gobierno, los fondos propietarios y los fondos fiduciarios.' },
          { k: 'p', t: 'Los fondos propietarios lo necesitan por una razón práctica: si vas a cobrarle al usuario, tienes que conocer el <em>costo completo</em> del servicio, depreciación incluida, para fijar la tarifa y para decidir si conviene prestarlo o contratarlo fuera.' },
          { k: 'p', t: 'Los estados por fondos gubernamentales sirven a la rendición de cuentas <em>fiscal</em>. Los demás, a la <em>operativa</em>. Es el mismo par del capítulo 1, ahora con la mecánica.' },
        ],
      },
    ],
    terms: [
      ['Current financial resources', 'Efectivo y partidas que se volverán efectivo a tiempo para pagar obligaciones del periodo.'],
      ['Modified accrual', 'Ingresos cuando son medibles y están disponibles; expenditures cuando obligan recursos corrientes.'],
      ['Available', 'Cobrable a tiempo para pagar obligaciones del periodo. 60 días obligatorios para el impuesto predial.'],
      ['Economic resources focus', 'Se miden todos los recursos, corrientes y no corrientes, con devengado pleno.'],
      ['Expenditures', 'Recursos usados para adquirir un activo o servicio. Propio de los fondos gubernamentales.'],
      ['Expenses', 'Costos expirados o consumidos al prestar el servicio. Propio del nivel de todo el gobierno.'],
    ],
    quiz: [
      {
        q: 'El enfoque de medición y la base contable que deben usar los estados <em>por fondos gubernamentales</em> son…',
        src: '2–16, ítem 4',
        o: [
          'Recursos económicos y devengado',
          'Recursos financieros corrientes y devengado modificado',
          'Recursos financieros corrientes y base de efectivo',
          'Recursos económicos y devengado modificado',
        ],
        a: 1,
        w: 'Van siempre juntos: recursos financieros corrientes con devengado modificado. La pareja de recursos económicos con devengado es la de todo el gobierno, propietarios y fiduciarios.',
      },
      {
        q: 'Bajo devengado modificado…',
        src: '2–16, ítem 8',
        o: [
          'Los ingresos se reconocen al ocurrir la transacción de intercambio',
          'Los expenditures se reconocen cuando el costo de un activo expira',
          'Los ingresos se reconocen cuando son medibles y están disponibles para pagar obligaciones del periodo',
          'Los expenses se reconocen cuando surge una obligación por servicios prestados',
        ],
        a: 2,
        w: '«Medible y disponible» es la fórmula exacta. Las opciones B y D describen devengado pleno, y además usan <em>expenses</em>, que no es el término de los fondos gubernamentales.',
      },
      {
        q: 'Un condado compra una patrulla de $60 000 en efectivo. ¿Cómo se reporta?',
        src: 'Concepto, LO 2-3',
        o: [
          'Expenditure de $60 000 en el fondo; activo depreciable en todo el gobierno',
          'Activo depreciable en los dos lugares',
          'Expenditure de $60 000 en los dos lugares',
          'No se reporta hasta que se deprecie',
        ],
        a: 0,
        w: 'Abajo el enfoque es corto: salió efectivo del periodo, así que es un expenditure completo. Arriba el enfoque es largo: es un activo que se consume por años. La conciliación explica la diferencia.',
      },
      {
        q: '¿Por qué el balance de fondos gubernamentales no muestra la deuda a largo plazo?',
        src: 'Concepto, LO 2-3',
        o: [
          'Porque el GASB permite omitirla si es inmaterial',
          'Porque no hay que pagarla con recursos financieros del periodo actual',
          'Porque ya aparece en las notas',
          'Porque se reporta solo en los fondos propietarios',
        ],
        a: 1,
        w: 'El enfoque de recursos financieros corrientes solo admite lo que afecta el periodo. La deuda a largo plazo sí aparece, pero en la columna de actividades gubernamentales de los estados de todo el gobierno.',
      },
    ],
  },

  /* ----------------------------------------------------------- IV */
  {
    id: 'b4',
    roman: 'IV',
    concept: 'Clasificación del fund balance',
    title: 'Cinco cajones, ordenados por quién puso el candado',
    en: 'Fund balance classifications',
    standfirst:
      'La clasificación no describe para qué se va a usar el dinero. Describe quién impuso la restricción y qué tan difícil es quitarla.',
    steps: [
      {
        head: 'Primero: ¿se puede gastar?',
        blocks: [
          { k: 'p', t: 'La clasificación se hace en orden. Lo primero es apartar lo <span class="term">no gastable<i>nonspendable</i></span>: lo que no está en forma de poder gastarse, o que por ley o contrato no puede gastarse.' },
          { k: 'p', t: 'En forma no gastable: inventarios, pagos anticipados, documentos por cobrar a largo plazo. Legalmente intocable: el principal de una dotación permanente.' },
          { k: 'fig', id: 'fundbalance', cap: 'El orden importa: primero se aparta lo no gastable, y lo que queda se clasifica según quién puso el candado y qué se necesita para quitarlo.' },
        ],
      },
      {
        head: 'Después: ¿quién puso el candado?',
        blocks: [
          { k: 'p', t: '<span class="term">Restringido<i>restricted</i></span> — el candado viene de <em>afuera</em>: acreedores, otorgantes, donantes, la constitución, o legislación habilitante. Solo se cambia con el consentimiento de quien lo puso.' },
          { k: 'p', t: '<span class="term">Comprometido<i>committed</i></span> — el candado lo puso el propio gobierno, pero al <em>máximo nivel</em> y por acción formal: una ordenanza del concejo o de la comisión del condado. Quitarlo exige la misma acción formal.' },
          { k: 'p', t: '<span class="term">Asignado<i>assigned</i></span> — hay <em>intención</em> de usarlo para algo, pero sin acción formal. La expresa el cuerpo de gobierno o alguien en quien delegó: un comité de finanzas, el administrador municipal.' },
        ],
      },
      {
        head: 'Habilitante no es lo mismo que comprometido',
        blocks: [
          { k: 'note', head: 'La distinción fina que se pregunta', t: 'La <em>legislación habilitante</em> autoriza recaudar un ingreso <em>para un fin restringido</em>, y ese componente impide usarlo en otra cosa: eso es <em>restringido</em>. En cambio los fondos <em>comprometidos</em> sí pueden destinarse a otra cosa, revirtiendo la acción formal que los comprometió.', tone: 'warn' },
          { k: 'p', t: 'Prueba rápida: si para liberarlo basta con que el mismo cuerpo vote de nuevo, es comprometido. Si hace falta el consentimiento de un tercero, es restringido.' },
        ],
      },
      {
        head: 'Y lo que sobra',
        blocks: [
          { k: 'p', t: '<span class="term">No asignado<i>unassigned</i></span> es el residuo del General Fund después de clasificar todo lo demás. Técnicamente disponible para cualquier propósito.' },
          { k: 'note', head: 'Dos reglas de signo', t: 'El General Fund es el <em>único</em> que puede tener un fund balance no asignado <em>positivo</em>. Cualquier otro fondo que gaste de más puede tener que reportar un no asignado <em>negativo</em>. Y el GASB no permite saldos negativos en restringido, comprometido ni asignado.', tone: 'warn' },
          { k: 'p', t: 'Se sobreentiende además que lo que quede en fondos de special revenue, capital projects, debt service o permanent, sin ser restringido ni comprometido, está <em>asignado</em>.' },
          { k: 'p', t: 'Por último, el gobierno debe adoptar una política sobre qué se considera gastado primero cuando concurren varias clasificaciones. Lo normal es gastar antes lo más limitado.' },
        ],
      },
    ],
    terms: [
      ['Nonspendable', 'No está en forma de gastarse (inventario, anticipos) o legalmente debe mantenerse intacto.'],
      ['Restricted', 'Candado externo: acreedores, otorgantes, donantes, constitución o legislación habilitante.'],
      ['Committed', 'Candado interno al máximo nivel, por acción formal. Se quita con la misma acción formal.'],
      ['Assigned', 'Intención de uso sin acción formal, expresada por el cuerpo de gobierno o quien delegó.'],
      ['Unassigned', 'El residuo del General Fund. Único fondo que puede tenerlo positivo.'],
      ['Enabling legislation', 'Autoriza recaudar para un fin restringido. Produce saldo restringido, no comprometido.'],
    ],
    quiz: [
      {
        q: '¿Cuál de estos importes se clasificaría como <em>restricted</em>?',
        src: '2–16, ítem 5',
        o: [
          'Recursos que el administrador municipal apartó para reparar una calle',
          'Una subvención federal que solo puede usarse en juegos infantiles',
          'Un monto importante de inventario',
          'Una dotación que la ciudad debe mantener a perpetuidad',
        ],
        a: 1,
        w: 'El otorgante es externo y fijó el destino: restringido. La opción A es asignado (intención sin acción formal); C y D son nonspendable — el inventario por su forma y el principal de la dotación por ley.',
      },
      {
        q: 'El concejo aprueba una ordenanza que aparta $1 000 000 como reserva de emergencia, retirable solo con dos tercios de los votos. Eso es…',
        src: '2–20',
        o: ['Restricted', 'Committed', 'Assigned', 'Unassigned'],
        a: 1,
        w: 'El candado lo puso el propio gobierno al máximo nivel y mediante acción formal, y quitarlo exige la misma acción formal. Es committed. Sería restricted solo si el límite viniera de fuera.',
      },
      {
        q: '¿Qué fondo puede reportar un <em>unassigned fund balance</em> positivo?',
        src: '2–16, ítem 15',
        o: ['El General Fund', 'El General Fund y los special revenue funds', 'Todos los fondos gubernamentales', 'Los enterprise funds'],
        a: 0,
        w: 'Solo el General Fund. Otros fondos pueden llegar a reportar un no asignado <em>negativo</em> si gastan por encima de lo restringido, comprometido o asignado, pero nunca uno positivo.',
      },
      {
        q: 'El alcalde declara que aparta $25 000 para comprar un terreno para un parque, sin ordenanza. Eso es…',
        src: '2–20',
        o: ['Restricted', 'Committed', 'Assigned', 'Nonspendable'],
        a: 2,
        w: 'Hay intención expresada por alguien con autoridad delegada, pero no hubo acción formal del máximo nivel. Eso es assigned. Con una ordenanza del concejo habría sido committed.',
      },
    ],
  },

  /* ------------------------------------------------------------ V */
  {
    id: 'b5',
    roman: 'V',
    concept: 'Determinación de fondos mayores',
    title: 'Qué fondos merecen su propia columna',
    en: 'Major fund determination',
    standfirst:
      'Nadie quiere leer cuarenta columnas. El GASB fija una prueba aritmética para decidir cuáles se muestran aparte y cuáles se agregan en una sola.',
    steps: [
      {
        head: 'Para qué existe la prueba',
        blocks: [
          { k: 'p', t: 'El GASB reconoce que al usuario no le interesan todos los fondos, sino los de mayor monto. Por eso exige una columna separada por cada <span class="term">fondo mayor<i>major fund</i></span>, más una columna agregada con todos los no mayores.' },
          { k: 'p', t: 'Aplica solo a fondos <em>gubernamentales</em> y <em>enterprise</em>. No aplica a internal service ni a fiduciarios.' },
          { k: 'p', t: 'El General Fund es siempre mayor, por su naturaleza. Para los demás hay que hacer la cuenta.' },
        ],
      },
      {
        head: 'Las dos vallas',
        blocks: [
          { k: 'p', t: 'Un fondo es mayor si alguno de sus elementos —activos, pasivos, ingresos o egresos— cumple <em>las dos</em> condiciones:' },
          { k: 'p', t: '<em>(a)</em> Es al menos el <em>10 %</em> del mismo elemento para todos los fondos de su categoría. <em>(b)</em> Ese <em>mismo</em> elemento es al menos el <em>5 %</em> del total de fondos gubernamentales y enterprise combinados.' },
          { k: 'fig', id: 'major', cap: 'Las dos vallas se saltan con el mismo elemento. Un fondo que pasa el 10 % en pasivos y el 5 % en ingresos no califica: son elementos distintos.' },
          { k: 'note', head: 'El error clásico', t: 'Cumplir <em>(a)</em> con un elemento y <em>(b)</em> con otro <em>no</em> sirve. Tiene que ser el mismo elemento el que salte las dos vallas.', tone: 'warn' },
        ],
      },
      {
        head: 'Y el criterio del juicio',
        blocks: [
          { k: 'p', t: 'Además de la aritmética, el gobierno <em>puede</em> reportar como mayor cualquier fondo que considere de importancia significativa para los usuarios, aunque no cumpla los porcentajes.' },
          { k: 'p', t: 'Y si un fondo cumplió ambos criterios el año pasado pero este año cumple uno o ninguno, el gobierno puede optar por seguir reportándolo como mayor, a la espera de la determinación del año siguiente.' },
          { k: 'p', t: 'Los no mayores se agregan en una columna, pero muchos gobiernos publican <em>combining statements</em> en el informe anual con el detalle de cada uno.' },
        ],
      },
      {
        head: 'Y el presupuesto, aparte',
        blocks: [
          { k: 'p', t: 'Ligado a esto, el GASB exige cédulas de comparación presupuesto contra real para el General Fund y para cada <em>special revenue fund mayor</em> que tenga presupuesto legalmente adoptado.' },
          { k: 'p', t: 'Recomienda presentarlas como RSI justo después de las notas. El gobierno también puede convertirlas en un estado dentro de los estados básicos.' },
        ],
      },
    ],
    terms: [
      ['Major fund', 'Fondo que recibe columna propia. El General Fund siempre lo es; los demás pasan la prueba 10 % y 5 %.'],
      ['Nonmajor funds', 'Se agregan en una sola columna, con detalle opcional en combining statements.'],
      ['Budgetary comparison schedule', 'Presupuesto contra real para el General Fund y cada special revenue fund mayor con presupuesto legal.'],
    ],
    quiz: [
      {
        q: 'Un gobierno reporta activos totales: General $18 400 000; Library (special revenue) $2 900 000; Debt Service $2 600 000; total gubernamentales $26 300 000; gubernamentales y enterprise combinados $51 250 000. ¿Cuáles son mayores por activos?',
        src: '2–16, ítem 10',
        o: ['Solo el General Fund', 'General Fund y Library Fund', 'General Fund y Debt Service Fund', 'Los tres'],
        a: 1,
        w: 'El 10 % de gubernamentales es $2 630 000; el 5 % del combinado, $2 562 500. Library ($2 900 000) supera ambas. Debt Service ($2 600 000) pasa el 5 % pero se queda $30 000 por debajo del 10 %, así que no es mayor. El General lo es siempre.',
      },
      {
        q: 'La separación de fondos mayores existe porque…',
        src: '2–16, ítem 6',
        o: [
          'Los usuarios quieren el detalle de todos los fondos',
          'Agregar fondos que superen el 5 % viola las normas',
          'Los usuarios necesitan examinar los fondos fiduciarios',
          'Los usuarios necesitan ver los fondos con montos grandes de recursos y actividad',
        ],
        a: 3,
        w: 'La prueba existe para destacar lo material. La opción A es lo contrario del propósito, y la C es falsa: la prueba de fondo mayor no aplica a fiduciarios.',
      },
      {
        q: '¿A qué fondos <em>no</em> se les aplica la prueba de fondo mayor?',
        src: 'Concepto, LO 2-4',
        o: [
          'A los special revenue funds',
          'A los internal service funds y a los fiduciarios',
          'A los enterprise funds',
          'Al General Fund y a los capital projects funds',
        ],
        a: 1,
        w: 'La prueba aplica solo a fondos gubernamentales y enterprise. Los internal service y los fiduciarios quedan fuera.',
      },
    ],
  },
]

const FINAL: Question[] = [
  {
    q: 'El MD&A del condado dice que sus fondos fiduciarios «se resumen por tipo: pensiones, otros beneficios y private-purpose trust». ¿Qué falta?',
    src: 'Caso 2–12 · artículo II',
    o: [
      'Nada: esos son todos los tipos fiduciarios',
      'Faltan los custodial funds',
      'Faltan los internal service funds',
      'Faltan los permanent funds',
    ],
    a: 1,
    w: 'La categoría fiduciaria tiene cuatro tipos: custodial más los tres de fideicomiso. Los permanent funds son gubernamentales y los internal service, propietarios.',
  },
  {
    q: 'El mismo MD&A dice que los activos fiduciarios «no se presentan como parte de los estados de todo el gobierno». ¿Es correcto?',
    src: 'Caso 2–12 · artículo I',
    o: [
      'No: deberían ir en una columna fiduciaria',
      'Sí: no pueden financiar los programas del gobierno, así que se omiten',
      'No: van en actividades gubernamentales',
      'Solo si el gobierno es pequeño',
    ],
    a: 1,
    w: 'Es de lo poco que el MD&A dice bien. Como esos recursos no pueden usarse para los programas del gobierno, el GASB exige omitirlos arriba y reportarlos solo en sus dos estados por fondos.',
  },
  {
    q: 'El MD&A dice que tres actividades enterprise (aeropuerto, transporte y recreación) <em>requieren subsidio de impuestos</em>. ¿Qué implica?',
    src: 'Caso 2–12 · artículo II',
    o: [
      'Que deben reclasificarse como fondos gubernamentales de inmediato',
      'Nada: los subsidios operativos a actividades tipo negocio son comunes',
      'Que el gobierno violó las normas GASB',
      'Que deben pasar a internal service funds',
    ],
    a: 1,
    w: 'El texto lo dice expresamente: los subsidios de impuestos generales no son raros, sobre todo en transporte. Lo que obliga a usar enterprise fund es la garantía de la deuda, la exigencia legal de recuperar costos o la política de precios.',
  },
  {
    q: '¿Por qué el MD&A tiene que explicar las diferencias entre los estados por fondos y los de todo el gobierno?',
    src: 'Caso 2–12 · artículo III',
    o: [
      'Porque los fondos usan efectivo y arriba se usa devengado',
      'Porque abajo se mide corto plazo y arriba largo plazo, y el GASB exige conciliar',
      'Porque los auditores lo piden',
      'Porque los fondos excluyen las actividades tipo negocio',
    ],
    a: 1,
    w: 'La misma información de actividades gubernamentales aparece con dos enfoques de medición distintos. Por eso el GASB exige conciliar los fund balances con el net position, y el cambio del periodo entre los dos estados operativos.',
  },
  {
    q: 'El condado quiere clasificar $464 000 de seguro pagado por anticipado en su General Fund. ¿Qué clasificación?',
    src: '2–20 · artículo IV',
    o: ['Restricted', 'Committed', 'Nonspendable', 'Unassigned'],
    a: 2,
    w: 'Un pago anticipado no está en forma de poder gastarse: es nonspendable, igual que el inventario. Lo primero que se aparta al clasificar.',
  },
  {
    q: 'Un fondo del condado alcanza el 10 % de los pasivos de su categoría y el 5 % de los ingresos del combinado. ¿Es mayor?',
    src: 'Artículo V',
    o: [
      'Sí: cumple las dos condiciones',
      'No: las dos vallas debe saltarlas el mismo elemento',
      'Sí, pero solo si el condado lo decide',
      'No hay información suficiente',
    ],
    a: 1,
    w: 'Es el error clásico. Cumplir (a) con pasivos y (b) con ingresos no sirve: tiene que ser el mismo elemento el que pase el 10 % y el 5 %.',
  },
]

export const CH2: Chapter = {
  id: 'ch2',
  num: 2,
  name: 'Principios para gobiernos estatales y locales',
  en: 'Principles of Accounting and Financial Reporting for State and Local Governments',
  caseTab: 'Expediente · caso 2–12',
  caseTitle: 'El MD&A que no cuadra con la norma',
  caseLede: [
    'El condado publicó su MD&A describiendo sus estados básicos. Tu trabajo es auditarlo: señalar qué partes <em>sí</em> cumplen las normas GASB y cuáles <em>no</em>.',
    'Para poder juzgarlo hace falta conocer el modelo de reporte, las tres categorías de fondos, qué base contable le toca a cada una, cómo se clasifica el fund balance y qué fondos merecen columna propia. Este capítulo es exactamente eso.',
  ],
  articles: ARTICLES,
  capstoneLede:
    'Cinco tareas con guía mínima. La primera es el caso 2–12 propiamente dicho; las demás son la mecánica que te permite resolverlo.',
  closing:
    'Ya puedes leer el plan de cuentas de un condado y saber, para cualquier partida, en qué fondo vive, con qué base se mide, cómo se clasifica su saldo y si merece columna propia.',
  tasks: [
    {
      kind: 'sort',
      title: 'Audita el MD&A del condado',
      src: 'Caso 2–12, requisito (a)',
      hint: 'Cada frase viene del MD&A. Decide si cumple las normas GASB o no.',
      bins: [
        { code: 'ok', label: 'Conforme a GASB', eyebrow: 'Cumple' },
        { code: 'no', label: 'No conforme', eyebrow: 'Falla' },
      ],
      items: [
        ['Los estados de todo el gobierno son el statement of net position y el de activities', 0],
        ['Los fondos gubernamentales usan devengado modificado', 0],
        ['Los fondos propietarios incluyen enterprise e internal service, en devengado', 0],
        ['Los activos fiduciarios no se presentan en los estados de todo el gobierno', 0],
        ['Los fondos no mayores se resumen en una sola columna', 0],
        ['Los fondos fiduciarios se resumen en pensiones, otros beneficios y private-purpose', 1],
        ['Los fondos gubernamentales no presentan activos de capital ni deuda a largo plazo', 0],
        ['Tres actividades enterprise requieren subsidio de impuestos', 0],
      ],
      note: 'La única frase que falla es la lista de fondos fiduciarios: omite los custodial funds. Las demás describen correctamente el modelo — incluidos los subsidios a actividades enterprise, que el texto reconoce como comunes.',
    },
    {
      kind: 'sort',
      title: 'Cada tipo de fondo, en su categoría',
      src: 'Problema 2–17',
      hint: 'Toca el tipo de fondo, luego su categoría.',
      bins: [
        { code: 'GF', label: 'Gubernamentales', eyebrow: 'GF' },
        { code: 'PF', label: 'Propietarios', eyebrow: 'PF' },
        { code: 'FF', label: 'Fiduciarios', eyebrow: 'FF' },
      ],
      items: [
        ['Custodial fund', 2],
        ['Permanent fund', 0],
        ['Debt service fund', 0],
        ['Internal service fund', 1],
        ['Pension trust fund', 2],
        ['Special revenue fund', 0],
        ['Enterprise fund', 1],
        ['General Fund', 0],
        ['Investment trust fund', 2],
        ['Capital projects fund', 0],
        ['Private-purpose trust fund', 2],
      ],
      note: 'Los dos que más se confunden: el permanent fund es gubernamental aunque suene a fideicomiso, y el internal service es propietario aunque solo sirva al propio gobierno.',
    },
    {
      kind: 'sort',
      title: 'Clasifica el fund balance de Allentown',
      src: 'Problema 2–20',
      hint: 'Pregúntate quién puso el candado y qué se necesita para quitarlo.',
      bins: [
        { code: 'N', label: 'Nonspendable', eyebrow: 'a' },
        { code: 'R', label: 'Restricted', eyebrow: 'b' },
        { code: 'C', label: 'Committed', eyebrow: 'c' },
        { code: 'A', label: 'Assigned', eyebrow: 'd' },
        { code: 'U', label: 'Unassigned', eyebrow: 'e' },
      ],
      items: [
        ['$22 000 de inventario en el General Fund', 0],
        ['$464 000 de seguro pagado por anticipado', 0],
        ['Reserva de emergencia de $1 000 000, retirable con dos tercios del concejo', 2],
        ['5 % del impuesto a las ventas apartado por ordenanza para desarrollo económico', 2],
        ['$250 000 de subvención federal para vivienda de emergencia', 1],
        ['$100 000 de prima de bonos que la administradora apartó para pagar principal', 3],
        ['$25 000 que el alcalde aparta para comprar terreno de un parque', 3],
        ['Saldo de $50 000 sin restricciones en un special revenue fund', 3],
        ['El capital projects fund cerró con saldo negativo', 4],
        ['Cambio neto de $154 238 en el General Fund', 4],
      ],
      note: 'La ordenanza del concejo compromete; la decisión de la administradora o del alcalde solo asigna. Y ojo con el special revenue sin restricciones: lo que sobra en un fondo que no es el General se considera asignado, no no asignado.',
    },
    {
      kind: 'major',
      title: '¿Qué fondos merecen columna propia?',
      src: 'Problema 2–16, ítem 10',
      hint: 'Compara cada elemento contra las dos vallas. Marca cada fondo como mayor o no mayor.',
      funds: [
        {
          name: 'General Fund',
          assets: 18400000,
          liabilities: 5200000,
          revenues: 21300000,
          expenditures: 20100000,
          major: true,
          why: 'El General Fund es mayor siempre, por su naturaleza. Ni siquiera hay que hacer la cuenta.',
        },
        {
          name: 'Library Fund (special revenue)',
          assets: 2900000,
          liabilities: 410000,
          revenues: 3150000,
          expenditures: 2980000,
          major: true,
          why: 'Por activos: $2,9 M supera el 10 % de gubernamentales ($2 630 000) y el 5 % del combinado ($2 562 500). El mismo elemento salta las dos vallas.',
        },
        {
          name: 'Debt Service Fund',
          assets: 2600000,
          liabilities: 180000,
          revenues: 2400000,
          expenditures: 2350000,
          major: false,
          why: 'Por activos, $2,6 M no llega al 10 % de gubernamentales ($2 630 000). Ningún otro elemento salta ambas vallas, así que no es mayor.',
        },
      ],
      totalCategory: { assets: 26300000, liabilities: 6100000, revenues: 28900000, expenditures: 27500000 },
      totalCombined: { assets: 51250000, liabilities: 14800000, revenues: 55200000, expenditures: 52700000 },
      note: 'La trampa está en el Debt Service Fund: se queda a $30 000 del 10 %. Por eso la prueba se hace con números, no a ojo.',
    },
    {
      kind: 'quiz',
      title: 'Vuelve al MD&A',
      src: 'Cruza los cinco artículos',
      hint: 'Seis preguntas sobre el caso del condado.',
      questions: FINAL,
    },
  ],
  glossary: [
    ['Available', 'Disponible', 'Cobrable a tiempo para pagar obligaciones del periodo. El impuesto predial exige 60 días; el resto lo define cada gobierno.', 'III'],
    ['Assigned fund balance', 'Saldo asignado', 'Intención de uso sin acción formal, expresada por el cuerpo de gobierno o por quien este delegó.', 'IV'],
    ['Business-type activities', 'Actividades tipo negocio', 'Servicios cobrados al usuario que buscan autofinanciarse. Los subsidios de impuestos generales no son raros.', 'I'],
    ['Capital projects fund', 'Fondo de proyectos de capital', 'Registra ingresos y bonos destinados a comprar o construir activos de larga vida.', 'II'],
    ['Committed fund balance', 'Saldo comprometido', 'Restringido por acción formal del máximo nivel del gobierno. Se libera con la misma acción formal.', 'IV'],
    ['Current financial resources', 'Recursos financieros corrientes', 'Efectivo y partidas que se volverán efectivo a tiempo para pagar obligaciones del periodo.', 'III'],
    ['Custodial fund', 'Fondo de custodia', 'El gobierno administra activos de terceros sin acuerdo de fideicomiso. Ej.: impuestos cobrados para otro gobierno.', 'II'],
    ['Debt service fund', 'Fondo de servicio de deuda', 'Recursos apartados para pagar principal e intereses de deuda general a largo plazo.', 'II'],
    ['Deferred outflow / inflow of resources', 'Salida / entrada diferida', 'Consumo o adquisición de activos netos que corresponde a un periodo futuro. No es activo ni pasivo: es un elemento propio.', 'I'],
    ['Economic resources focus', 'Enfoque de recursos económicos', 'Se miden todos los recursos, corrientes y no corrientes. Va con devengado pleno.', 'III'],
    ['Enabling legislation', 'Legislación habilitante', 'Autoriza recaudar un ingreso para un fin restringido. Produce saldo restringido, no comprometido.', 'IV'],
    ['Enterprise fund', 'Fondo empresarial', 'Vende al público. Obligatorio si la deuda se garantiza con sus ingresos, si la ley exige recuperar costos, o por política de precios.', 'II'],
    ['Expenditures', 'Egresos', 'Recursos usados para adquirir un activo o servicio, reconocidos al obligar recursos corrientes.', 'III'],
    ['Expenses', 'Gastos', 'Costos expirados o consumidos al prestar el servicio. Miden el costo a largo plazo.', 'III'],
    ['Fund', 'Fondo', 'Entidad fiscal y contable con cuentas que cuadran solas, segregada para una actividad u objetivo específico.', 'II'],
    ['General Fund', 'Fondo general', 'El fondo operativo principal. Uno y solo uno por gobierno. Recibe todo lo que no deba ir a otro lado.', 'II'],
    ['Internal service fund', 'Fondo de servicios internos', 'Sirve a departamentos del propio gobierno. Propietario, pero suele reportarse en actividades gubernamentales.', 'II'],
    ['Major fund', 'Fondo mayor', 'Recibe columna propia. El General siempre; los demás si el mismo elemento pasa el 10 % y el 5 %.', 'V'],
    ['Modified accrual', 'Devengado modificado', 'Ingresos cuando son medibles y están disponibles; expenditures cuando obligan recursos corrientes.', 'III'],
    ['Nonspendable fund balance', 'Saldo no gastable', 'No está en forma de gastarse (inventario, anticipos) o debe mantenerse intacto por ley o contrato.', 'IV'],
    ['Permanent fund', 'Fondo permanente', 'Dotación cuyo principal se preserva y cuyos rendimientos apoyan un propósito público.', 'II'],
    ['Private-purpose trust fund', 'Fideicomiso de propósito privado', 'Beneficia a particulares, organizaciones u otros gobiernos, no a un programa del gobierno.', 'II'],
    ['Restricted fund balance', 'Saldo restringido', 'Candado externo: acreedores, otorgantes, donantes, constitución o legislación habilitante.', 'IV'],
    ['Special revenue fund', 'Fondo de ingresos especiales', 'Ingresos restringidos o comprometidos para un propósito operativo concreto.', 'II'],
    ['Unassigned fund balance', 'Saldo no asignado', 'El residuo del General Fund. Único fondo que puede tenerlo positivo.', 'IV'],
  ],
}
