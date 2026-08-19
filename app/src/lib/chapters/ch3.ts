import type { Article, Chapter } from '../types'

/* Capítulo 3 · Cuentas del estado de operación y contabilidad
   presupuestaria. Los tres conceptos que sostienen el capítulo —
   presupuesto, base modificada y encumbrance — se enseñan por
   analogía antes que por asiento: el permiso, la ventana de cobro y
   la reservación. El asiento llega después, cuando ya se sabe qué
   está representando. */

/* ------------------------------------------------------------ I */
const A1: Article = {
  id: 'c1',
  roman: 'I',
  concept: 'Contabilidad presupuestaria',
  title: 'El presupuesto entra a los libros como cualquier transacción',
  en: 'Budgetary accounting',
  standfirst:
    'En una empresa el presupuesto vive en una hoja de cálculo. En un gobierno se asienta en el mayor, porque es una ley y alguien tiene que poder demostrar en cualquier momento que todavía se está cumpliendo.',
  steps: [
    {
      head: 'Piensa en un permiso, no en un plan',
      blocks: [
        {
          k: 'p',
          t: 'El presupuesto de una empresa es una intención: si el mercado cambia, la dirección lo cambia. El de un gobierno es una <b>autorización legal</b> aprobada por el cabildo. Rebasar una <span class="term">appropriation<i>apropiación</i></span> no es un mal trimestre: es una violación de la ley.',
        },
        { k: 'fig', id: 'c3-permit', cap: 'Un plan se archiva. Un permiso se registra.' },
        {
          k: 'p',
          t: 'De ahí sale toda la mecánica de este capítulo. Si la autorización es una ley, el sistema tiene que poder responder, cualquier martes de julio, cuánto queda sin ejercer. Y eso solo es posible si la ley está anotada como un saldo.',
        },
      ],
    },
    {
      head: 'Cuatro cuentas y un solo asiento',
      blocks: [
        {
          k: 'p',
          t: 'Al adoptarse el presupuesto se hace <em>un</em> asiento. <span class="term">Estimated Revenues<i>ingresos estimados</i></span> va al debe: es lo que se espera que entre. <span class="term">Appropriations<i>apropiaciones</i></span> y <span class="term">Estimated Other Financing Uses<i>otros usos estimados</i></span> van al haber: son las autorizaciones para que salga.',
        },
        { k: 'fig', id: 'c3-budget-entry', cap: 'El asiento de adopción, y de dónde sale el cuadre.' },
        {
          k: 'note',
          head: 'Budgetary Fund Balance no se calcula',
          t: 'Es la diferencia que hace cuadrar el asiento. Si los ingresos estimados superan a las autorizaciones, va al haber y el presupuesto es superavitario. Si no alcanzan, va al <em>debe</em>: el cabildo aprobó un déficit.',
          tone: 'seal',
        },
      ],
    },
    {
      head: 'Por qué las apropiaciones van al haber',
      blocks: [
        {
          k: 'p',
          t: 'Cuesta la primera vez. La clave está en verlo como el espejo del estado que se publicará doce meses después: en él los ingresos van al haber y los gastos al debe. El asiento presupuestario invierte los dos, porque registra <em>lo esperado</em> contra lo ocurrido.',
        },
        {
          k: 'p',
          t: 'Así, cuando llega el ingreso real —al haber de <b>Revenues</b>— y el gasto real —al debe de <b>Expenditures</b>—, cada uno va consumiendo su contraparte estimada. Al final del año, si el presupuesto se cumplió al centavo, todo queda en cero.',
        },
      ],
    },
    {
      head: 'La resta que se hace todos los días',
      blocks: [
        {
          k: 'p',
          t: 'El <span class="term">available balance<i>saldo disponible</i></span> de una apropiación no es lo apropiado menos lo gastado. Hay que restar también lo <em>comprometido</em>: las órdenes de compra firmadas cuya factura todavía no llega.',
        },
        { k: 'fig', id: 'c3-available', cap: 'Apropiación − gastado − comprometido = lo que todavía se puede firmar.' },
        {
          k: 'p',
          t: 'Es la cifra que el director de finanzas mira antes de autorizar cualquier compra, y la razón de ser del artículo III.',
        },
      ],
    },
    {
      head: 'Cuando el presupuesto cambia a media carrera',
      blocks: [
        {
          k: 'p',
          t: 'Un presupuesto se puede modificar, pero solo por la misma vía que lo aprobó. La modificación se asienta igual que la adopción, únicamente por el <em>cambio</em>: si el cabildo autoriza $200 000 más para bomberos, se acredita Appropriations por $200 000 y se carga Budgetary Fund Balance por la misma cifra.',
        },
        {
          k: 'note',
          head: 'Original, final y real: tres columnas',
          t: 'El <span class="term">budgetary comparison schedule<i>estado comparativo presupuestario</i></span> exige mostrar el presupuesto <em>original</em>, el <em>final</em> —ya modificado— y lo real. Por eso las modificaciones no borran nada: se suman, y la historia queda a la vista.',
          tone: 'seal',
        },
      ],
    },
  ],
  terms: [
    ['appropriation', 'Autorización legal, con tope, para gastar en un fin determinado durante un periodo.'],
    ['estimated revenues', 'Los ingresos que el presupuesto aprobado espera recibir en el periodo.'],
    ['budgetary fund balance', 'La cuenta que cuadra el asiento del presupuesto: el superávit o déficit aprobado.'],
    ['available balance', 'Apropiación menos gastos menos compromisos abiertos: lo que todavía se puede comprometer.'],
  ],
  quiz: [
    {
      q: 'Al adoptarse el presupuesto, Estimated Revenues son $26 400 000, Appropriations $25 600 000 y Estimated Other Financing Uses $500 000. ¿Cómo entra Budgetary Fund Balance?',
      src: '3–4',
      o: ['Al debe por $300 000', 'Al haber por $300 000', 'Al haber por $800 000', 'No entra: el asiento ya cuadra'],
      a: 1,
      w: '26 400 000 − 25 600 000 − 500 000 = 300 000. Como los ingresos estimados superan a las salidas autorizadas, la diferencia va al haber: el cabildo aprobó un superávit.',
    },
    {
      q: 'Una apropiación de $60 000 lleva $32 400 gastados y una orden de compra abierta por $16 000. ¿Cuál es el saldo disponible?',
      src: '3–6',
      o: ['$27 600', '$11 600', '$43 600', '$60 000'],
      a: 1,
      w: '60 000 − 32 400 − 16 000 = 11 600. El compromiso resta aunque no sea un gasto: ese peso ya tiene dueño.',
    },
    {
      q: '¿Por qué Appropriations se registra al haber y no al debe?',
      src: '3–3',
      o: [
        'Porque es un pasivo del gobierno frente a sus proveedores',
        'Porque el asiento presupuestario es el espejo del estado de operación: lo que saldrá va al haber para que el gasto real lo consuma desde el debe',
        'Porque las cuentas presupuestarias siempre son acreedoras',
        'Por convención, sin una razón contable de fondo',
      ],
      a: 1,
      w: 'La apropiación es la contraparte estimada del gasto. El gasto real llega al debe y la va consumiendo; si el presupuesto se cumple exacto, las dos quedan en cero.',
    },
  ],
}

/* ----------------------------------------------------------- II */
const A2: Article = {
  id: 'c2',
  roman: 'II',
  concept: 'Base modificada de acumulación',
  title: 'Medible y disponible, o todavía no es ingreso',
  en: 'Modified accrual basis of accounting',
  standfirst:
    'La acumulación completa pregunta si ya te ganaste el dinero. La base modificada añade una segunda pregunta, y es la que sorprende: ¿llega a tiempo para pagar lo de este año?',
  steps: [
    {
      head: 'Dos preguntas, no una',
      blocks: [
        {
          k: 'p',
          t: 'Bajo <span class="term">modified accrual<i>base modificada</i></span> un ingreso se reconoce solo si cumple las dos condiciones: <b>medible</b> —se sabe cuánto— y <b>disponible</b> —se cobrará a tiempo para pagar las obligaciones de este mismo periodo.',
        },
        {
          k: 'p',
          t: 'Piensa en un pago que te prometieron por escrito para dentro de ocho meses. Es perfectamente medible, y no te sirve de nada para la renta de este mes. La base modificada trata ese dinero exactamente así.',
        },
      ],
    },
    {
      head: 'La ventana de disponibilidad',
      blocks: [
        {
          k: 'p',
          t: 'Cada gobierno fija su propio plazo, salvo una excepción con nombre propio: el <span class="term">property tax<i>impuesto predial</i></span> debe cobrarse dentro de los <b>60 días</b> siguientes al cierre para considerarse disponible.',
        },
        { k: 'fig', id: 'c3-available60', cap: 'Medible es cuánto. Disponible es cuándo — y es la que decide.' },
        {
          k: 'note',
          head: 'Lo que no alcanza no desaparece',
          t: 'La parte que se cobrará después de la ventana no se pierde ni se cancela: se registra como <span class="term">deferred inflow of resources<i>entrada diferida</i></span> y se reconocerá como ingreso el año que sí esté disponible.',
          tone: 'seal',
        },
      ],
    },
    {
      head: 'El gasto nace con la obligación',
      blocks: [
        {
          k: 'p',
          t: 'Del lado del gasto la regla es más corta: un <span class="term">expenditure<i>gasto</i></span> se registra cuando se incurre la <b>obligación del fondo</b>. No cuando se firma la orden, no cuando se paga el cheque: cuando el gobierno queda legalmente obligado, que normalmente es al recibir el bien o el servicio.',
        },
        {
          k: 'note',
          head: 'Tres excepciones que se preguntan',
          t: 'El servicio de la deuda, las vacaciones acumuladas y el juicio pendiente se registran <em>cuando vencen y se pagan</em>, no cuando se devengan. La obligación existe, pero no consume recursos financieros corrientes hasta el vencimiento.',
          tone: 'warn',
        },
      ],
    },
    {
      head: 'Los cuatro caracteres de un gasto',
      blocks: [
        {
          k: 'p',
          t: 'El GASB clasifica el gasto por <span class="term">character<i>carácter</i></span>, según a qué periodo beneficia: <b>current</b> —beneficia a este año—, <b>capital outlay</b> —a este y a los siguientes—, <b>debt service</b> —a periodos ya pasados— e <b>intergovernmental</b> —a otro gobierno.',
        },
        {
          k: 'p',
          t: 'Es la clasificación que más se confunde con la de <em>función</em> —seguridad pública, salud, obras—, que responde a otra pregunta: no a qué periodo beneficia, sino para qué programa se gastó.',
        },
      ],
    },
    {
      head: 'Lo que entra pero no es ingreso',
      blocks: [
        {
          k: 'p',
          t: 'Una transferencia desde otro fondo y el producto de una emisión de deuda aumentan el efectivo, pero no son ingresos: no vienen de fuera de la entidad ni de una operación propia. Se registran como <span class="term">other financing sources<i>otras fuentes de financiamiento</i></span>, en un renglón aparte.',
        },
        {
          k: 'note',
          head: 'Por qué importa la distinción',
          t: 'Mezclarlas con los ingresos infla el resultado del fondo con dinero que solo cambió de bolsillo o que habrá que devolver. El estado de operación las presenta <em>después</em> del exceso de ingresos sobre gastos, justo para que se puedan leer por separado.',
          tone: 'seal',
        },
      ],
    },
  ],
  terms: [
    ['modified accrual', 'Base que reconoce el ingreso solo si es medible y disponible, y el gasto al incurrirse la obligación del fondo.'],
    ['available', 'Cobrable a tiempo para pagar las obligaciones del propio periodo; para el predial, dentro de 60 días del cierre.'],
    ['deferred inflow of resources', 'Recurso ya recibido o exigible que todavía no puede reconocerse como ingreso del periodo.'],
    ['other financing sources', 'Entradas que no son ingresos: transferencias entre fondos y producto de emisiones de deuda.'],
  ],
  quiz: [
    {
      q: 'El condado levanta un predial de $18 000 000 y estima que cobrará $600 000 después del 1 de marzo siguiente. ¿Qué pasa con esos $600 000?',
      src: '3–9',
      o: [
        'Se cancelan contra la estimación de incobrables',
        'Se reconocen como ingreso del año: el derecho ya nació',
        'Se registran como deferred inflow y serán ingreso del año siguiente',
        'No se registran hasta cobrarse',
      ],
      a: 2,
      w: 'Son medibles pero no disponibles: caen fuera de la ventana de 60 días. El derecho se registra, el ingreso espera.',
    },
    {
      q: 'El 28 de diciembre llegan y se aceptan muebles de oficina por $40 000. La factura se paga el 15 de enero. ¿En qué año es el expenditure?',
      src: '3–11',
      o: ['En el año en que se pagó', 'En el año en que se recibieron', 'Se reparte entre los dos', 'Cuando se emitió la orden de compra'],
      a: 1,
      w: 'La obligación del fondo se incurrió al recibir y aceptar los bienes. El pago posterior solo liquida un pasivo que ya existía.',
    },
    {
      q: 'El condado compra una ambulancia por $310 000 para el departamento de bomberos. ¿Cuál es su carácter?',
      src: '3–13',
      o: ['Current', 'Capital outlay', 'Debt service', 'Intergovernmental'],
      a: 1,
      w: 'El carácter pregunta a qué periodos beneficia el gasto. La ambulancia servirá varios años: capital outlay. «Bomberos» es su función, que es otra clasificación.',
    },
    {
      q: 'El General Fund recibe $500 000 del fondo de agua como reembolso de servicios administrativos, y otros $300 000 como transferencia de apoyo. ¿Cómo entran?',
      src: '3–15',
      o: [
        'Los dos como revenues',
        'Los dos como other financing sources',
        '$500 000 como revenue y $300 000 como other financing source',
        '$300 000 como revenue y $500 000 como other financing source',
      ],
      a: 2,
      w: 'El reembolso paga un servicio realmente prestado: es ingreso. La transferencia solo mueve recursos entre bolsillos del mismo gobierno: other financing source.',
    },
  ],
}

/* ---------------------------------------------------------- III */
const A3: Article = {
  id: 'c3',
  roman: 'III',
  concept: 'El ciclo de encumbrance',
  title: 'Reservar, recibir, pagar: tres momentos, no uno',
  en: 'The encumbrance cycle',
  standfirst:
    'Si el gasto solo se registrara al recibir la mercancía, dos departamentos podrían comprometer el mismo peso sin enterarse. El encumbrance existe para tapar ese hueco de semanas.',
  steps: [
    {
      head: 'La reservación del restaurante',
      blocks: [
        {
          k: 'p',
          t: 'Reservas una mesa. No has cenado ni has pagado, pero la mesa ya no está disponible para nadie más. Cuando cenas, consumes. Cuando pagas, solo sale el dinero de una cuenta que ya debías.',
        },
        { k: 'fig', id: 'c3-reservation', cap: 'Tres momentos que nadie confunde en la vida diaria — y que la contabilidad separa igual.' },
        {
          k: 'p',
          t: 'Los tres momentos tienen nombre contable: <b>encumbrance</b>, <b>expenditure</b> y la salida de <b>cash</b>. El error clásico es saltarse el primero y registrar el gasto al firmar la orden.',
        },
      ],
    },
    {
      head: 'El asiento que no toca el gasto',
      blocks: [
        {
          k: 'p',
          t: 'Al emitir la orden de compra se carga <span class="term">Encumbrances<i>compromisos</i></span> y se abona <span class="term">Encumbrances Outstanding<i>compromisos por surtir</i></span>, por el importe <em>estimado</em>. Las dos son presupuestarias: no aparecen en ningún estado financiero.',
        },
        {
          k: 'note',
          head: 'Un compromiso no es un pasivo',
          t: 'El proveedor todavía puede no entregar. Mientras no haya entrega no hay obligación legal de pagar, y por eso no hay pasivo — pero el dinero ya está apartado y el saldo disponible bajó.',
          tone: 'seal',
        },
      ],
    },
    {
      head: 'Recórrelo tú, paso a paso',
      blocks: [
        {
          k: 'p',
          t: 'Una orden real casi nunca llega completa ni al precio exacto. Avanza el simulador un paso a la vez y observa qué cuenta se mueve, cuál no, y qué pasa con el saldo disponible.',
        },
        { k: 'sim', id: 'encumbrance' },
      ],
    },
    {
      head: 'La reversa al estimado, el gasto al real',
      blocks: [
        {
          k: 'p',
          t: 'Es la disciplina que separa un asiento correcto de uno que casi lo está. La reversa del compromiso se hace por lo que se <em>estimó</em> al ordenar. El gasto se registra por lo que dice la <em>factura</em>. La diferencia no se fuerza a cuadrar: simplemente cae en el saldo disponible.',
        },
        {
          k: 'note',
          head: 'Por qué no se revierte al importe facturado',
          t: 'Porque Encumbrances Outstanding guarda lo que se apartó, no lo que costó. Si se revirtiera a $32 400 cuando se apartaron $32 000, la cuenta quedaría con un saldo falso de $400 y el compromiso pendiente dejaría de cuadrar con las órdenes abiertas.',
          tone: 'warn',
        },
      ],
    },
    {
      head: 'Lo que queda abierto el 31 de diciembre',
      blocks: [
        {
          k: 'p',
          t: 'Termina el año y hay órdenes firmadas que aún no se surten. Las cuentas presupuestarias se cancelan como todas las demás, pero el compromiso <em>no desaparece</em>: el recurso sigue apartado.',
        },
        {
          k: 'p',
          t: 'Se reclasifica dentro del <span class="term">fund balance<i>saldo del fondo</i></span> — a <b>committed</b> o <b>assigned</b> según quién impuso la restricción — para que el lector del balance vea que esa parte del saldo ya tiene destino.',
        },
      ],
    },
  ],
  terms: [
    ['encumbrance', 'Compromiso registrado al emitir una orden de compra, por el importe estimado.'],
    ['encumbrances outstanding', 'La contracuenta acreedora del compromiso; se revierte al recibir los bienes.'],
    ['purchase order', 'El documento que compromete la apropiación sin crear todavía un pasivo.'],
    ['vouchers payable', 'El pasivo real que nace al recibir y aceptar los bienes o servicios.'],
  ],
  quiz: [
    {
      q: 'Se emite una orden de compra por $840 000 estimados. ¿Cuál es el asiento?',
      src: '3–17',
      o: [
        'Dr Expenditures 840 000 / Cr Vouchers Payable 840 000',
        'Dr Encumbrances 840 000 / Cr Encumbrances Outstanding 840 000',
        'Dr Encumbrances Outstanding 840 000 / Cr Encumbrances 840 000',
        'Ninguno: la orden de compra no se registra',
      ],
      a: 1,
      w: 'La orden compromete la apropiación sin crear pasivo. Encumbrances al debe, su contracuenta al haber, y ninguna de las dos toca el estado de operación.',
    },
    {
      q: 'Llega parte de una orden: se habían estimado $32 000 y la factura dice $32 400. ¿Por cuánto se revierte el compromiso?',
      src: '3–18',
      o: ['$32 400', '$32 000', '$400', 'No se revierte hasta surtir la orden completa'],
      a: 1,
      w: 'La reversa siempre va al importe estimado, porque eso es lo que se apartó. El gasto entra aparte por los $32 400 facturados.',
    },
    {
      q: 'Al 31 de diciembre quedan órdenes de compra abiertas por $320 000. ¿Qué se hace con ellas?',
      src: '3–20',
      o: [
        'Se cancelan: si no se surtieron, no hubo gasto',
        'Se registran como expenditure del año que termina',
        'Se cancelan las cuentas presupuestarias y el importe se reclasifica dentro del fund balance como committed o assigned',
        'Se dejan abiertas en Encumbrances hasta que llegue la mercancía',
      ],
      a: 2,
      w: 'No hubo gasto, así que no hay expenditure. Pero el recurso sigue apartado, y el balance tiene que decirlo: por eso se reclasifica el fund balance en vez de dejarlo como no asignado.',
    },
    {
      q: 'Se pagan facturas por $48 700 ya registradas como expenditure al recibir los bienes. ¿Qué efecto tiene el pago sobre el gasto del año?',
      src: '3–19',
      o: [
        'Lo aumenta en $48 700',
        'Ninguno: el gasto se registró al incurrirse la obligación',
        'Lo aumenta solo por la parte que exceda al estimado',
        'Lo reclasifica de capital outlay a current',
      ],
      a: 1,
      w: 'Bajo base modificada el gasto nace con la obligación del fondo, no con el pago. El cheque solo liquida un pasivo que ya estaba en libros.',
    },
  ],
}

/* ----------------------------------------------------------- IV */
const A4: Article = {
  id: 'c4',
  roman: 'IV',
  concept: 'Los asientos de cierre dobles',
  title: 'Dos sistemas en paralelo se cierran dos veces',
  en: 'Dual closing entries',
  standfirst:
    'Un fondo gubernamental lleva todo el año dos juegos de cuentas que nunca se tocan: el plan aprobado y lo que de verdad pasó. Al cierre, cada uno se cancela por su lado.',
  steps: [
    {
      head: 'Dos juegos, dos cierres',
      blocks: [
        {
          k: 'p',
          t: 'Las presupuestarias —Estimated Revenues, Appropriations, Budgetary Fund Balance— registran lo autorizado. Las reales —Revenues, Expenditures, Other Financing Uses— registran lo ocurrido. Corren en paralelo y no comparten una sola cuenta.',
        },
        { k: 'fig', id: 'c3-dual', cap: 'Dos juegos que nunca se mezclan, ni durante el año ni al cerrar.' },
        {
          k: 'p',
          t: 'Por eso hay dos asientos de cierre, y por eso el orden entre ellos da igual: no se cruzan en ningún punto.',
        },
      ],
    },
    {
      head: 'Cerrar lo presupuestario: exactamente al revés',
      blocks: [
        {
          k: 'p',
          t: 'El cierre presupuestario es el asiento de adopción con los lados invertidos, <b>a los importes del presupuesto final</b>. Nada de cifras reales entra aquí: se está cancelando el plan, no comparándolo.',
        },
        {
          k: 'note',
          head: 'Final, no original',
          t: 'Si el presupuesto se modificó durante el año, se cancela por el importe <em>final</em> — el original más todas las modificaciones. Es lo que quedó vivo en las cuentas, y por tanto lo que hay que dejar en cero.',
          tone: 'warn',
        },
      ],
    },
    {
      head: 'Cerrar lo real: todo a fund balance',
      blocks: [
        {
          k: 'p',
          t: 'Revenues tiene saldo acreedor y se carga; Expenditures y Other Financing Uses tienen saldo deudor y se abonan. La diferencia se lleva a <span class="term">Fund Balance—Unassigned<i>saldo no asignado</i></span>, y es el resultado del año.',
        },
        {
          k: 'p',
          t: 'Ese resultado tiene nombre propio en el estado: <em>net change in fund balance</em>. No se llama utilidad, porque no lo es — es cuánto creció o se encogió el recurso financiero disponible.',
        },
      ],
    },
    {
      head: 'El compromiso abierto no se cierra a cero',
      blocks: [
        {
          k: 'p',
          t: 'Encumbrances y Encumbrances Outstanding también son presupuestarias y también se cancelan. Pero si quedaron órdenes abiertas, el recurso sigue apartado y el balance tiene que mostrarlo.',
        },
        {
          k: 'note',
          head: 'Cancelar no es olvidar',
          t: 'Se cancelan las dos cuentas presupuestarias y, en el mismo momento, se reclasifica el importe de <b>Fund Balance—Unassigned</b> a <b>Committed</b> o <b>Assigned</b>. El saldo total del fondo no cambia: cambia lo que dice sobre sí mismo.',
          tone: 'seal',
        },
      ],
    },
    {
      head: 'La comparación que exige la norma',
      blocks: [
        {
          k: 'p',
          t: 'Con los dos sistemas cerrados, el gobierno publica el <span class="term">budgetary comparison schedule<i>estado comparativo presupuestario</i></span>: presupuesto original, presupuesto final, cifras reales, y la variación contra el final.',
        },
        {
          k: 'note',
          head: 'La comparación va en base presupuestaria',
          t: 'Si el gobierno presupuesta sobre base de efectivo o cuenta los encumbrances como gastos, el estado se presenta <em>en esa misma base</em> y se concilia aparte con el GAAP. Comparar en bases distintas no compararía nada.',
          tone: 'seal',
        },
      ],
    },
  ],
  terms: [
    ['closing entries', 'Los asientos que dejan en cero las cuentas temporales al final del periodo.'],
    ['net change in fund balance', 'El resultado del año de un fondo gubernamental: cuánto creció o se encogió su recurso financiero.'],
    ['budgetary comparison schedule', 'Estado que confronta presupuesto original, presupuesto final y cifras reales.'],
    ['budgetary basis', 'La base sobre la que el gobierno presupuesta, que puede no ser la del GAAP y entonces se concilia.'],
  ],
  quiz: [
    {
      q: 'El presupuesto se adoptó con Appropriations de $25 600 000 y durante el año se modificó al alza por $200 000. ¿Por cuánto se carga Appropriations al cerrar?',
      src: '3–22',
      o: ['$25 600 000', '$25 800 000', 'Por el gasto real del año', '$200 000'],
      a: 1,
      w: 'Se cancela el presupuesto final: original más modificaciones. Es el saldo que las cuentas presupuestarias traen vivo, y es lo que hay que dejar en cero.',
    },
    {
      q: 'Revenues del año fueron $26 180 000; Expenditures $25 410 000; Transfers Out $500 000. ¿Qué va a Fund Balance—Unassigned?',
      src: '3–23',
      o: ['$770 000 al haber', '$270 000 al haber', '$270 000 al debe', '$1 270 000 al haber'],
      a: 1,
      w: '26 180 000 − 25 410 000 − 500 000 = 270 000. La transferencia hacia afuera también consume recursos, aunque no sea un gasto.',
    },
    {
      q: 'Al cierre quedan encumbrances abiertos por $320 000. ¿Qué pasa con el saldo total del fondo?',
      src: '3–24',
      o: [
        'Baja $320 000: el recurso ya está comprometido',
        'No cambia: solo se reclasifican $320 000 de unassigned a committed o assigned',
        'Sube $320 000 al cancelar la cuenta presupuestaria',
        'Depende de si la orden se surte en enero',
      ],
      a: 1,
      w: 'La reclasificación mueve dinero entre renglones del mismo fund balance. El total es idéntico; lo que cambia es cuánto de él dice estar libre.',
    },
    {
      q: '¿Por qué hay dos asientos de cierre y no uno solo?',
      src: '3–21',
      o: [
        'Porque el GASB exige presentarlos por separado en el estado',
        'Porque las cuentas presupuestarias y las reales son dos sistemas que no comparten ninguna cuenta, así que no hay nada que cruzar entre ellos',
        'Porque el cierre presupuestario se hace antes del ajuste anual y el real después',
        'Porque el presupuestario lo autoriza el cabildo y el real el contralor',
      ],
      a: 1,
      w: 'No es una regla de presentación sino de mecánica: no comparten cuenta, así que un asiento combinado no cancelaría nada que el otro no cancele ya. El orden entre ellos tampoco importa.',
    },
  ],
}

export const CH3: Chapter = {
  id: 'ch3',
  num: 3,
  name: 'Cuentas de operación y contabilidad presupuestaria',
  en: 'Governmental Operating Statement Accounts; Budgetary Accounting',
  caseTab: 'Expediente · caso 3–C',
  caseTitle: 'Un año completo del General Fund, asiento por asiento',
  caseLede: [
    'El Condado de Valle Verde arranca el ejercicio 2026 con un presupuesto aprobado por el cabildo y lo termina con dos asientos de cierre. En medio: el levy predial, órdenes de compra que llegan a medias, y una nómina.',
    'El capítulo enseña las tres piezas que hacen falta para escribir cada uno de esos asientos — el presupuesto en los libros, la base modificada y el ciclo del encumbrance — y después te pide que los escribas tú.',
  ],
  articles: [A1, A2, A3, A4],
  capstoneLede:
    'Siete asientos, en el orden en que ocurren. Para cada uno hay tres candidatos y solo uno correcto: los otros dos son los errores que de verdad se cometen. Elige, y verás por qué el tuyo funciona o dónde se rompió.',
  tasks: [
    {
      kind: 'entries',
      title: 'El año completo del General Fund',
      src: 'Caso 3–C · Condado de Valle Verde',
      hint: 'Los datos del problema quedan a la mano arriba. Cada respuesta es definitiva y se explica en el momento.',
      fund: 'General Fund · ejercicio 2026',
      facts: [
        ['Estimated Revenues aprobados', '$26 400 000'],
        ['Appropriations aprobadas', '$25 600 000'],
        ['Estimated Other Financing Uses', '$500 000'],
        ['Levy predial bruto', '$18 000 000'],
        ['Incobrables estimados sobre el levy', '2 %'],
        ['Órdenes de compra emitidas', '$840 000'],
        ['Entrega parcial · estimado', '$520 000'],
        ['Entrega parcial · facturado', '$528 500'],
        ['Nómina bruta del periodo', '$1 250 000'],
        ['Retención de ISR federal', '$187 500'],
        ['FICA retenido a empleados (7.65 %)', '$95 625'],
        ['Revenues reales del año', '$26 180 000'],
        ['Expenditures reales del año', '$25 410 000'],
        ['Transferencia efectiva al fondo de deuda', '$500 000'],
      ],
      entries: [
        {
          ref: '1',
          narrative: 'El <b>2 de enero</b> el cabildo adopta el presupuesto del ejercicio.',
          options: [
            [
              { account: 'Estimated Revenues', side: 'D', amount: 26_400_000 },
              { account: 'Appropriations', side: 'H', amount: 25_600_000 },
              { account: 'Estimated Other Financing Uses', side: 'H', amount: 500_000 },
              { account: 'Budgetary Fund Balance', side: 'H', amount: 300_000 },
            ],
            [
              { account: 'Appropriations', side: 'D', amount: 25_600_000 },
              { account: 'Estimated Other Financing Uses', side: 'D', amount: 500_000 },
              { account: 'Budgetary Fund Balance', side: 'D', amount: 300_000 },
              { account: 'Estimated Revenues', side: 'H', amount: 26_400_000 },
            ],
            [
              { account: 'Estimated Revenues', side: 'D', amount: 26_400_000 },
              { account: 'Appropriations', side: 'H', amount: 26_400_000 },
            ],
          ],
          answer: 0,
          why: 'Estimated Revenues al debe por lo que se espera entrar; las dos autorizaciones de salida al haber. Budgetary Fund Balance es el cuadre: 26 400 000 − 25 600 000 − 500 000 = <b>300 000</b> al haber, un presupuesto superavitario.',
          trap: 'La opción con los lados invertidos es el asiento de <em>cierre</em>, no el de adopción — correcto en diciembre y desastroso en enero. La tercera olvida la transferencia autorizada y fuerza el cuadre inflando Appropriations en $800 000 que el cabildo nunca aprobó.',
        },
        {
          ref: '2',
          narrative: 'Se levanta el <b>predial del año</b>: $18 000 000 brutos, con 2 % estimado de incobrable.',
          options: [
            [
              { account: 'Taxes Receivable—Current', side: 'D', amount: 17_640_000 },
              { account: 'Revenues', side: 'H', amount: 17_640_000 },
            ],
            [
              { account: 'Taxes Receivable—Current', side: 'D', amount: 18_000_000 },
              { account: 'Allowance for Uncollectible Current Taxes', side: 'H', amount: 360_000 },
              { account: 'Revenues', side: 'H', amount: 17_640_000 },
            ],
            [
              { account: 'Cash', side: 'D', amount: 18_000_000 },
              { account: 'Revenues', side: 'H', amount: 18_000_000 },
            ],
          ],
          answer: 1,
          why: 'El derecho de cobro nace por el bruto: el condado puede exigir los $18 000 000 completos. Lo que no espera cobrar va a una <em>contracuenta</em> de $360 000, y el ingreso se reconoce neto: $17 640 000.',
          trap: 'Netear el recibible contra la estimación borra del balance $360 000 que legalmente sí se pueden cobrar, y deja al departamento de cobranza sin la cifra que persigue. Y registrar contra Cash confunde el levy con la recaudación: el ingreso nace al levantar el impuesto, no al cobrarlo.',
        },
        {
          ref: '3',
          narrative: 'Se emiten <b>órdenes de compra</b> de suministros por $840 000 estimados.',
          options: [
            [
              { account: 'Expenditures', side: 'D', amount: 840_000 },
              { account: 'Vouchers Payable', side: 'H', amount: 840_000 },
            ],
            [
              { account: 'Encumbrances Outstanding', side: 'D', amount: 840_000 },
              { account: 'Encumbrances', side: 'H', amount: 840_000 },
            ],
            [
              { account: 'Encumbrances', side: 'D', amount: 840_000 },
              { account: 'Encumbrances Outstanding', side: 'H', amount: 840_000 },
            ],
          ],
          answer: 2,
          why: 'La orden compromete la apropiación sin crear obligación legal: nadie ha entregado nada. Las dos cuentas son presupuestarias y no aparecen en ningún estado financiero — su único trabajo es bajar el saldo disponible.',
          trap: 'Registrar Expenditures aquí es <em>el</em> error del capítulo: inventa un gasto y un pasivo por mercancía que el proveedor todavía podría no entregar. La otra opción tiene las cuentas correctas y los lados al revés, que deja el saldo disponible <em>subiendo</em> $840 000.',
        },
        {
          ref: '4',
          narrative: 'Llega <b>parte de la orden</b>: se estimó en $520 000 y la factura dice $528 500.',
          options: [
            [
              { account: 'Encumbrances Outstanding', side: 'D', amount: 520_000 },
              { account: 'Encumbrances', side: 'H', amount: 520_000 },
              { account: 'Expenditures', side: 'D', amount: 528_500 },
              { account: 'Vouchers Payable', side: 'H', amount: 528_500 },
            ],
            [
              { account: 'Encumbrances Outstanding', side: 'D', amount: 528_500 },
              { account: 'Encumbrances', side: 'H', amount: 528_500 },
              { account: 'Expenditures', side: 'D', amount: 528_500 },
              { account: 'Vouchers Payable', side: 'H', amount: 528_500 },
            ],
            [
              { account: 'Expenditures', side: 'D', amount: 528_500 },
              { account: 'Vouchers Payable', side: 'H', amount: 528_500 },
            ],
          ],
          answer: 0,
          why: 'Son dos asientos que van juntos y por importes distintos. La reversa cancela lo que se <em>apartó</em> ($520 000); el gasto entra por lo que se <em>facturó</em> ($528 500). Los $8 500 de diferencia no se fuerzan a ningún lado: salen del saldo disponible.',
          trap: 'Revertir por los $528 500 facturados deja Encumbrances Outstanding con $8 500 de menos de los que realmente quedan apartados, y a partir de ahí la cuenta ya no cuadra con las órdenes abiertas. Omitir la reversa es peor: los $520 000 siguen restando saldo disponible por mercancía que ya llegó, y el condado se autolimita el resto del año.',
        },
        {
          ref: '5',
          narrative: 'Se paga la <b>nómina</b> del periodo: $1 250 000 brutos, con $187 500 de ISR y $95 625 de FICA retenidos.',
          options: [
            [
              { account: 'Expenditures', side: 'D', amount: 966_875 },
              { account: 'Cash', side: 'H', amount: 966_875 },
            ],
            [
              { account: 'Expenditures', side: 'D', amount: 1_250_000 },
              { account: 'Due to Federal Government', side: 'H', amount: 187_500 },
              { account: 'FICA Taxes Payable', side: 'H', amount: 95_625 },
              { account: 'Cash', side: 'H', amount: 966_875 },
            ],
            [
              { account: 'Salaries Expense', side: 'D', amount: 1_250_000 },
              { account: 'Due to Federal Government', side: 'H', amount: 187_500 },
              { account: 'FICA Taxes Payable', side: 'H', amount: 95_625 },
              { account: 'Cash', side: 'H', amount: 966_875 },
            ],
          ],
          answer: 1,
          why: 'El gasto del condado es lo que le cuesta el trabajo: el <b>bruto</b>. Las retenciones no son un descuento a su costo — son dinero de los empleados que el condado guarda un rato y luego entrega al fisco, así que son pasivos. Solo salen $966 875 de efectivo.',
          trap: 'Registrar el gasto por el neto esconde $283 125 de costo real de personal y deja las retenciones sin pasivo que las reclame. Y <em>Salaries Expense</em> es la trampa del capítulo 2 reapareciendo: en un fondo gubernamental, bajo base modificada, la cuenta se llama <b>Expenditures</b>. Expense es la palabra de los estados de todo el gobierno.',
        },
        {
          ref: '6',
          narrative: 'Al <b>31 de diciembre</b>, primer asiento de cierre: las cuentas presupuestarias.',
          options: [
            [
              { account: 'Appropriations', side: 'D', amount: 25_600_000 },
              { account: 'Estimated Other Financing Uses', side: 'D', amount: 500_000 },
              { account: 'Budgetary Fund Balance', side: 'D', amount: 300_000 },
              { account: 'Estimated Revenues', side: 'H', amount: 26_400_000 },
            ],
            [
              { account: 'Appropriations', side: 'D', amount: 25_410_000 },
              { account: 'Estimated Other Financing Uses', side: 'D', amount: 500_000 },
              { account: 'Estimated Revenues', side: 'H', amount: 25_910_000 },
            ],
            [
              { account: 'Appropriations', side: 'D', amount: 25_600_000 },
              { account: 'Estimated Other Financing Uses', side: 'D', amount: 500_000 },
              { account: 'Budgetary Fund Balance', side: 'D', amount: 300_000 },
              { account: 'Revenues', side: 'D', amount: 26_180_000 },
              { account: 'Estimated Revenues', side: 'H', amount: 26_400_000 },
              { account: 'Expenditures', side: 'H', amount: 25_410_000 },
              { account: 'Other Financing Uses—Transfers Out', side: 'H', amount: 500_000 },
              { account: 'Fund Balance—Unassigned', side: 'H', amount: 270_000 },
            ],
          ],
          answer: 0,
          why: 'El asiento de adopción, con los lados invertidos y por los mismos importes. No se está comparando nada: se está dejando en cero un juego de cuentas que solo existía para vigilar la ley.',
          trap: 'Cerrar por las cifras <em>reales</em> es tentador y no cierra nada: deja las presupuestarias con el saldo de la diferencia entre lo aprobado y lo ejercido, que es justo lo que no debe quedar en libros. Y juntar los dos cierres en un asiento no está mal por el resultado — está mal porque hace ilegible cuál sistema se está cancelando, y en cuanto haya una modificación presupuestaria deja de cuadrar.',
        },
        {
          ref: '7',
          narrative: 'Segundo asiento de cierre: las cuentas <b>reales</b> de operación.',
          options: [
            [
              { account: 'Revenues', side: 'D', amount: 26_180_000 },
              { account: 'Expenditures', side: 'H', amount: 25_410_000 },
              { account: 'Fund Balance—Unassigned', side: 'H', amount: 770_000 },
            ],
            [
              { account: 'Revenues', side: 'D', amount: 26_180_000 },
              { account: 'Expenditures', side: 'H', amount: 25_410_000 },
              { account: 'Other Financing Uses—Transfers Out', side: 'H', amount: 500_000 },
              { account: 'Budgetary Fund Balance', side: 'H', amount: 270_000 },
            ],
            [
              { account: 'Revenues', side: 'D', amount: 26_180_000 },
              { account: 'Expenditures', side: 'H', amount: 25_410_000 },
              { account: 'Other Financing Uses—Transfers Out', side: 'H', amount: 500_000 },
              { account: 'Fund Balance—Unassigned', side: 'H', amount: 270_000 },
            ],
          ],
          answer: 2,
          why: 'Revenues trae saldo acreedor y se carga; Expenditures y la transferencia traen saldo deudor y se abonan. Queda <b>$270 000</b> — el <em>net change in fund balance</em> del año: 26 180 000 − 25 410 000 − 500 000.',
          trap: 'Olvidar la transferencia hacia afuera infla el resultado a $770 000: una transferencia no es un gasto, pero consume recursos igual y tiene que cerrar. Y llevar el resultado a <em>Budgetary</em> Fund Balance mezcla los dos sistemas justo en el último paso: esa cuenta ya quedó en cero en el asiento anterior y no puede recibir el resultado real.',
        },
      ],
      note: 'Si fallaste alguno, vuelve al artículo que lo cubre: los tres primeros son del III, la nómina del II, y los dos cierres del IV. Los errores que viste como opciones no son inventados — son los que aparecen en los exámenes.',
    },
    {
      kind: 'quiz',
      title: 'Comprobación final del capítulo',
      src: 'Preguntas 3–1 a 3–10',
      hint: 'Sin guía. Diez preguntas que mezclan los cuatro artículos, como el examen.',
      questions: [
        {
          q: 'El presupuesto se registra en las cuentas de un fondo gubernamental porque:',
          src: '3–1',
          o: [
            'El GASB exige que todo plan financiero se asiente en libros',
            'La apropiación es una autorización legal y el sistema debe poder demostrar en todo momento cuánto queda sin ejercer',
            'Sin el asiento no se podría calcular la utilidad del fondo',
            'Lo exige el auditor externo antes de emitir opinión',
          ],
          a: 1,
          w: 'El registro existe por la naturaleza legal del presupuesto. Un plan no necesita saldo; una ley con tope, sí.',
        },
        {
          q: 'Bajo base modificada, un ingreso se reconoce cuando es:',
          src: '3–2',
          o: ['Devengado', 'Cobrado', 'Medible y disponible', 'Medible y devengado'],
          a: 2,
          w: 'Las dos condiciones son necesarias. Disponible es la que distingue esta base de la acumulación completa.',
        },
        {
          q: 'Estimated Revenues $9 500 000 y Appropriations $9 800 000. ¿Cómo entra Budgetary Fund Balance?',
          src: '3–3',
          o: ['Al haber por $300 000', 'Al debe por $300 000', 'Al haber por $19 300 000', 'No entra'],
          a: 1,
          w: 'Las autorizaciones de salida superan a los ingresos esperados en $300 000: el cabildo aprobó un déficit, y el cuadre va al debe.',
        },
        {
          q: 'El gasto de un fondo gubernamental se registra cuando:',
          src: '3–4',
          o: [
            'Se emite la orden de compra',
            'Se incurre la obligación del fondo, normalmente al recibir el bien o servicio',
            'Se paga la factura',
            'Se aprueba la apropiación correspondiente',
          ],
          a: 1,
          w: 'Ni la orden ni el pago crean el gasto. La orden todavía no obliga y el pago solo liquida un pasivo ya registrado.',
        },
        {
          q: 'Encumbrances y Encumbrances Outstanding aparecen en:',
          src: '3–5',
          o: [
            'El balance del fondo, entre los pasivos',
            'El estado de operación, junto a los expenditures',
            'Ningún estado financiero: son cuentas presupuestarias',
            'El estado de todo el gobierno',
          ],
          a: 2,
          w: 'Son herramientas de control interno del presupuesto. Su efecto se ve en el saldo disponible, no en un estado publicado.',
        },
        {
          q: 'Una apropiación de $500 000 lleva $310 000 en expenditures y $80 000 en órdenes abiertas. ¿Cuánto queda disponible?',
          src: '3–6',
          o: ['$190 000', '$110 000', '$420 000', '$80 000'],
          a: 1,
          w: '500 000 − 310 000 − 80 000 = 110 000. Los compromisos abiertos restan aunque no sean gastos.',
        },
        {
          q: 'El producto de una emisión de bonos recibido por el General Fund se presenta como:',
          src: '3–7',
          o: ['Revenue', 'Other financing source', 'Pasivo a largo plazo del fondo', 'Deferred inflow of resources'],
          a: 1,
          w: 'No es un ingreso: es dinero que habrá que devolver. Va en el renglón de otras fuentes, después del exceso de ingresos sobre gastos.',
        },
        {
          q: 'La compra de una patrulla se clasifica, por carácter, como:',
          src: '3–8',
          o: ['Current', 'Capital outlay', 'Debt service', 'Seguridad pública'],
          a: 1,
          w: 'El carácter mira a qué periodos beneficia el gasto: la patrulla sirve varios años. «Seguridad pública» es la función, otra clasificación distinta.',
        },
        {
          q: 'Al cerrar las cuentas presupuestarias se usan los importes:',
          src: '3–9',
          o: [
            'Reales del año',
            'Del presupuesto original únicamente',
            'Del presupuesto final: original más todas las modificaciones',
            'La diferencia entre presupuesto y real',
          ],
          a: 2,
          w: 'Se cancela lo que las cuentas traen vivo, y eso es el presupuesto final. Las cifras reales no entran nunca al cierre presupuestario.',
        },
        {
          q: 'Quedan $250 000 de órdenes de compra abiertas al cierre. El efecto sobre el fund balance total es:',
          src: '3–10',
          o: [
            'Disminuye $250 000',
            'Aumenta $250 000',
            'No cambia: $250 000 pasan de unassigned a committed o assigned',
            'Depende de si el proveedor entrega en enero',
          ],
          a: 2,
          w: 'La reclasificación mueve el importe entre renglones del mismo saldo. El total es idéntico; lo que cambia es cuánto de él se declara libre.',
        },
      ],
    },
  ],
  closing:
    'Un año del General Fund cabe en siete asientos, y los siete salen de tres ideas: el presupuesto es una ley que se asienta, el ingreso necesita estar disponible y no solo devengado, y entre firmar y pagar hay un momento intermedio que merece su propio registro.',
  glossary: [
    ['appropriation', 'Apropiación', 'Autorización legal con tope para gastar en un fin determinado durante un periodo. Rebasarla es una violación de la ley, no un desvío del plan.', 'I'],
    ['estimated revenues', 'Ingresos estimados', 'Los ingresos que el presupuesto aprobado espera recibir. Se registran al debe al adoptarse el presupuesto.', 'I'],
    ['budgetary fund balance', 'Saldo presupuestario del fondo', 'La cuenta que cuadra el asiento de adopción. Al haber si el presupuesto es superavitario; al debe si es deficitario.', 'I'],
    ['available balance', 'Saldo disponible', 'Apropiación menos gastos menos compromisos abiertos. Es la cifra que decide si se puede firmar una compra más.', 'I'],
    ['budget amendment', 'Modificación presupuestaria', 'Cambio autorizado por la misma vía que aprobó el presupuesto. Se asienta solo por la diferencia y no borra el original.', 'I'],
    ['modified accrual', 'Base modificada de acumulación', 'Reconoce el ingreso si es medible y disponible, y el gasto al incurrirse la obligación del fondo.', 'II'],
    ['available', 'Disponible', 'Cobrable a tiempo para pagar las obligaciones del propio periodo. Para el impuesto predial, dentro de 60 días del cierre.', 'II'],
    ['deferred inflow of resources', 'Entrada diferida de recursos', 'Recurso exigible que todavía no puede reconocerse como ingreso porque no está disponible. Se reconocerá el año que sí lo esté.', 'II'],
    ['character classification', 'Clasificación por carácter', 'Agrupa el gasto según a qué periodos beneficia: current, capital outlay, debt service e intergovernmental.', 'II'],
    ['other financing sources', 'Otras fuentes de financiamiento', 'Entradas que no son ingresos: transferencias entre fondos y producto de emisiones de deuda.', 'II'],
    ['encumbrance', 'Compromiso', 'Reserva registrada al emitir una orden de compra, por el importe estimado. No es un gasto ni un pasivo.', 'III'],
    ['encumbrances outstanding', 'Compromisos por surtir', 'La contracuenta acreedora del compromiso. Se revierte al importe estimado cuando llegan los bienes.', 'III'],
    ['purchase order', 'Orden de compra', 'El documento que compromete la apropiación. Baja el saldo disponible sin crear obligación legal de pagar.', 'III'],
    ['vouchers payable', 'Cuentas por pagar', 'El pasivo real que nace al recibir y aceptar los bienes o servicios, por el importe facturado.', 'III'],
    ['closing entries', 'Asientos de cierre', 'Dejan en cero las cuentas temporales. En un fondo gubernamental son dos: el presupuestario y el real.', 'IV'],
    ['net change in fund balance', 'Cambio neto en el saldo del fondo', 'El resultado del año de un fondo gubernamental. No se llama utilidad porque no lo es.', 'IV'],
    ['budgetary comparison schedule', 'Estado comparativo presupuestario', 'Confronta presupuesto original, presupuesto final y cifras reales, en la base sobre la que se presupuestó.', 'IV'],
    ['budgetary basis', 'Base presupuestaria', 'La base sobre la que el gobierno presupuesta. Si difiere del GAAP, la comparación se presenta en ella y se concilia aparte.', 'IV'],
  ],
  /* ---------------------------------------------------------------
     La hoja de asientos. Todos los del capítulo, con las cifras del
     mismo caso de Valle Verde, para que la referencia y el ejercicio
     no cuenten historias distintas.
     --------------------------------------------------------------- */
  entries: [
    {
      id: 'e1', group: 'El presupuesto', budgetary: true,
      when: 'Al adoptarse el presupuesto',
      lines: [
        { account: 'Estimated Revenues', side: 'D', amount: 26_400_000 },
        { account: 'Appropriations', side: 'H', amount: 25_600_000 },
        { account: 'Estimated Other Financing Uses', side: 'H', amount: 500_000 },
        { account: 'Budgetary Fund Balance', side: 'H', amount: 300_000 },
      ],
      note: 'Budgetary Fund Balance es el cuadre, no un cálculo. Al haber si sobra, al <b>debe</b> si el cabildo aprobó un déficit.',
    },
    {
      id: 'e2', group: 'El presupuesto', budgetary: true,
      when: 'Al modificarse el presupuesto (aumento de apropiación)',
      lines: [
        { account: 'Budgetary Fund Balance', side: 'D', amount: 200_000 },
        { account: 'Appropriations', side: 'H', amount: 200_000 },
      ],
      note: 'Solo por la <em>diferencia</em>. El presupuesto original no se borra: se necesita para las tres columnas del estado comparativo.',
    },

    {
      id: 'e3', group: 'Ingresos',
      when: 'Al levantar el impuesto predial',
      lines: [
        { account: 'Taxes Receivable—Current', side: 'D', amount: 18_000_000 },
        { account: 'Allowance for Uncollectible Current Taxes', side: 'H', amount: 360_000 },
        { account: 'Revenues', side: 'H', amount: 17_640_000 },
      ],
      note: 'El recibible va al <b>bruto</b> porque eso es lo exigible; el ingreso al neto. Nunca se netean entre sí.',
    },
    {
      id: 'e4', group: 'Ingresos',
      when: 'Al cobrar impuestos del año',
      lines: [
        { account: 'Cash', side: 'D', amount: 17_200_000 },
        { account: 'Taxes Receivable—Current', side: 'H', amount: 17_200_000 },
      ],
      note: 'El cobro no genera ingreso: el ingreso ya se reconoció al levantar el impuesto.',
    },
    {
      id: 'e5', group: 'Ingresos',
      when: 'Al cierre, reclasificar lo no cobrado a moroso',
      lines: [
        { account: 'Taxes Receivable—Delinquent', side: 'D', amount: 800_000 },
        { account: 'Allowance for Uncollectible Current Taxes', side: 'D', amount: 360_000 },
        { account: 'Taxes Receivable—Current', side: 'H', amount: 800_000 },
        { account: 'Allowance for Uncollectible Delinquent Taxes', side: 'H', amount: 360_000 },
      ],
      note: 'Se mueven las dos cuentas en pareja: el recibible y su estimación. Si solo se moviera una, la contracuenta quedaría huérfana.',
    },
    {
      id: 'e6', group: 'Ingresos',
      when: 'Al cierre, diferir la parte del predial que no es disponible',
      lines: [
        { account: 'Revenues', side: 'D', amount: 600_000 },
        { account: 'Deferred Inflows—Property Taxes', side: 'H', amount: 600_000 },
      ],
      note: 'Lo que se cobrará después de los 60 días no es ingreso de este año. No se cancela: espera al año en que sí esté disponible.',
    },
    {
      id: 'e7', group: 'Ingresos',
      when: 'Al cobrar un ingreso sin recibible previo (licencias, multas)',
      lines: [
        { account: 'Cash', side: 'D', amount: 420_000 },
        { account: 'Revenues', side: 'H', amount: 420_000 },
      ],
      note: 'Los ingresos que no son medibles hasta cobrarse se reconocen al recibirlos. No hay recibible que registrar antes.',
    },

    {
      id: 'e8', group: 'El ciclo del gasto', budgetary: true,
      when: 'Al emitir la orden de compra',
      lines: [
        { account: 'Encumbrances', side: 'D', amount: 840_000 },
        { account: 'Encumbrances Outstanding', side: 'H', amount: 840_000 },
      ],
      note: 'Por el importe <b>estimado</b>. Baja el saldo disponible sin crear gasto ni pasivo.',
    },
    {
      id: 'e9', group: 'El ciclo del gasto', budgetary: true,
      when: 'Al recibir los bienes · reversa del compromiso',
      lines: [
        { account: 'Encumbrances Outstanding', side: 'D', amount: 520_000 },
        { account: 'Encumbrances', side: 'H', amount: 520_000 },
      ],
      note: 'Siempre al importe <b>estimado</b> de la orden, nunca al facturado. Va acompañado del asiento siguiente.',
    },
    {
      id: 'e10', group: 'El ciclo del gasto',
      when: 'Al recibir los bienes · el gasto',
      lines: [
        { account: 'Expenditures', side: 'D', amount: 528_500 },
        { account: 'Vouchers Payable', side: 'H', amount: 528_500 },
      ],
      note: 'Al importe <b>facturado</b>. La diferencia contra el estimado no se fuerza: cae en el saldo disponible.',
    },
    {
      id: 'e11', group: 'El ciclo del gasto',
      when: 'Al gastar sin orden de compra previa (servicios, energía)',
      lines: [
        { account: 'Expenditures', side: 'D', amount: 96_400 },
        { account: 'Vouchers Payable', side: 'H', amount: 96_400 },
      ],
      note: 'No todo gasto pasa por encumbrance. Los recurrentes de importe conocido suelen registrarse directo.',
    },
    {
      id: 'e12', group: 'El ciclo del gasto',
      when: 'Al pagar las facturas',
      lines: [
        { account: 'Vouchers Payable', side: 'D', amount: 528_500 },
        { account: 'Cash', side: 'H', amount: 528_500 },
      ],
      note: 'El pago no toca el gasto: solo liquida un pasivo que ya estaba registrado.',
    },

    {
      id: 'e13', group: 'Nómina',
      when: 'Al pagar la nómina del periodo',
      lines: [
        { account: 'Expenditures', side: 'D', amount: 1_250_000 },
        { account: 'Due to Federal Government', side: 'H', amount: 187_500 },
        { account: 'FICA Taxes Payable', side: 'H', amount: 95_625 },
        { account: 'Cash', side: 'H', amount: 966_875 },
      ],
      note: 'El gasto es el <b>bruto</b>: es lo que cuesta el trabajo. Las retenciones son dinero ajeno en tránsito, y por eso pasivos.',
    },
    {
      id: 'e14', group: 'Nómina',
      when: 'Al enterar las retenciones al fisco',
      lines: [
        { account: 'Due to Federal Government', side: 'D', amount: 187_500 },
        { account: 'FICA Taxes Payable', side: 'D', amount: 95_625 },
        { account: 'Cash', side: 'H', amount: 283_125 },
      ],
      note: 'Se liquidan los pasivos creados en la nómina. Ningún gasto nuevo: el gasto fue el bruto en su momento.',
    },

    {
      id: 'e15', group: 'Transferencias',
      when: 'Al transferir recursos a otro fondo (fondo que entrega)',
      lines: [
        { account: 'Other Financing Uses—Transfers Out', side: 'D', amount: 500_000 },
        { account: 'Cash', side: 'H', amount: 500_000 },
      ],
      note: 'No es un gasto: no compra nada ni paga un servicio. Consume recursos igual, y por eso cierra contra fund balance.',
    },
    {
      id: 'e16', group: 'Transferencias',
      when: 'Al recibir la transferencia (fondo que recibe)',
      lines: [
        { account: 'Cash', side: 'D', amount: 500_000 },
        { account: 'Other Financing Sources—Transfers In', side: 'H', amount: 500_000 },
      ],
      note: 'Tampoco es ingreso: el dinero no viene de fuera de la entidad. Los dos lados se eliminan al consolidar.',
    },

    {
      id: 'e17', group: 'El cierre', budgetary: true,
      when: 'Cierre 1 · cancelar las cuentas presupuestarias',
      lines: [
        { account: 'Appropriations', side: 'D', amount: 25_600_000 },
        { account: 'Estimated Other Financing Uses', side: 'D', amount: 500_000 },
        { account: 'Budgetary Fund Balance', side: 'D', amount: 300_000 },
        { account: 'Estimated Revenues', side: 'H', amount: 26_400_000 },
      ],
      note: 'El asiento de adopción invertido, a los importes del presupuesto <b>final</b>. Ninguna cifra real entra aquí.',
    },
    {
      id: 'e18', group: 'El cierre', budgetary: true,
      when: 'Cierre 2 · cancelar los compromisos que quedaron abiertos',
      lines: [
        { account: 'Encumbrances Outstanding', side: 'D', amount: 320_000 },
        { account: 'Encumbrances', side: 'H', amount: 320_000 },
      ],
      note: 'Las cuentas presupuestarias se cancelan aunque la orden siga viva. Lo que sobrevive es la reclasificación de abajo.',
    },
    {
      id: 'e19', group: 'El cierre',
      when: 'Cierre 3 · cancelar las cuentas reales de operación',
      lines: [
        { account: 'Revenues', side: 'D', amount: 26_180_000 },
        { account: 'Expenditures', side: 'H', amount: 25_410_000 },
        { account: 'Other Financing Uses—Transfers Out', side: 'H', amount: 500_000 },
        { account: 'Fund Balance—Unassigned', side: 'H', amount: 270_000 },
      ],
      note: 'La diferencia es el <em>net change in fund balance</em> del año. Va a Fund Balance, nunca a Budgetary Fund Balance.',
    },
    {
      id: 'e20', group: 'El cierre',
      when: 'Cierre 4 · reservar el saldo por las órdenes abiertas',
      lines: [
        { account: 'Fund Balance—Unassigned', side: 'D', amount: 320_000 },
        { account: 'Fund Balance—Committed', side: 'H', amount: 320_000 },
      ],
      note: 'El total del fondo no cambia. Cambia lo que el balance <em>declara</em> libre, que es de lo que trata el capítulo 2.',
    },
  ],
}
