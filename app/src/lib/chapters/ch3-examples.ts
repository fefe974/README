import type { Example } from '../types'

/* Ejemplos del capítulo 3, en el mismo Condado de Valle Verde. Uno
   por cada paso de cada artículo: el estudiante decide antes de leer
   el razonamiento, siempre. */

export const CH3_EXAMPLES: Record<string, Example> = {
  /* --------------------------------------- I · contab. presupuestaria */
  'c1-0': {
    title: 'Cuatro frases sobre el presupuesto',
    setup: 'Marca si cada frase describe un presupuesto de gobierno o solo uno de empresa.',
    viz: {
      v: 'ledger',
      cols: ['Frase', 'Gobierno'],
      rows: [
        { cells: ['Rebasarlo es una violación de la ley', 'Sí'], tone: 'seal' },
        { cells: ['La dirección puede ajustarlo cuando convenga', 'No'], tone: 'no' },
        { cells: ['Se registra en el mayor como saldo', 'Sí'], tone: 'seal' },
        { cells: ['Se puede modificar sin volver a quien lo aprobó', 'No'], tone: 'no' },
      ],
    },
    probe: {
      p: 'yesno',
      ask: '¿Describe la frase al presupuesto de un gobierno?',
      yes: 'Gobierno',
      no: 'Solo empresa',
      items: [
        { label: 'Rebasarlo es una violación de la ley', answer: true },
        { label: 'La dirección puede ajustarlo cuando convenga', answer: false },
        { label: 'Se registra en el mayor como saldo', answer: true },
        { label: 'Se puede modificar sin volver a quien lo aprobó', answer: false },
      ],
    },
    steps: [
      'El presupuesto de un gobierno es una <em>ley</em> aprobada por el cabildo, no una intención de la administración.',
      'Por eso se puede modificar, pero solo por la misma vía que lo aprobó: otra sesión del cabildo.',
      'Y por eso se asienta: hace falta un saldo que responda «cuánto queda» en cualquier momento del año.',
      'En una empresa nada de esto hace falta, porque nadie va a juicio por gastar de más.',
    ],
    answer:
      'Las dos frases de gobierno son las que hablan de obligatoriedad y de registro. Las dos de empresa son las que dan por hecho que el presupuesto se puede cambiar solo.',
  },

  'c1-1': {
    title: 'El cuadre que nadie calcula',
    setup:
      'El cabildo aprueba: ingresos estimados <b>$9 200 000</b>, apropiaciones <b>$8 750 000</b> y una transferencia autorizada de <b>$250 000</b> al fondo de deuda.',
    viz: {
      v: 'ledger',
      cols: ['Cuenta', 'Debe', 'Haber'],
      rows: [
        { cells: ['Estimated Revenues', '9 200 000', '—'], tone: 'seal' },
        { cells: ['Appropriations', '—', '8 750 000'] },
        { cells: ['Estimated Other Financing Uses', '—', '250 000'] },
        { cells: ['<b>Budgetary Fund Balance</b>', '—', '<b>?</b>'], tone: 'no' },
      ],
    },
    probe: {
      p: 'choice',
      ask: '¿Por cuánto y de qué lado entra Budgetary Fund Balance?',
      options: ['$450 000 al haber', '$200 000 al haber', '$200 000 al debe', '$9 000 000 al haber'],
      answer: 1,
    },
    steps: [
      'Suma primero todo lo autorizado a salir: 8 750 000 + 250 000 = <b>9 000 000</b>.',
      'Compáralo con lo que se espera entrar: 9 200 000.',
      'Sobran 200 000. Como el asiento ya tiene 9 200 000 al debe y solo 9 000 000 al haber, el cuadre va al <em>haber</em>.',
      'Un saldo acreedor en esta cuenta significa presupuesto superavitario: el cabildo autorizó menos salidas de las que espera recibir.',
    ],
    answer:
      'Budgetary Fund Balance no se calcula aparte: es lo que falta para cuadrar. Si hubiera ido al debe, el cabildo habría aprobado un déficit.',
  },

  'c1-2': {
    title: 'De qué lado va cada una',
    setup: 'Coloca cada cuenta del lado que le toca en el asiento de adopción del presupuesto.',
    viz: {
      v: 'flow',
      nodes: [
        { label: 'Estimated Revenues', sub: 'lo que entrará · debe', tone: 'seal' },
        { label: 'Appropriations', sub: 'lo que podrá salir · haber', tone: 'plain' },
        { label: 'Revenues real', sub: 'llega al haber y consume', tone: 'ok' },
        { label: 'Expenditures real', sub: 'llega al debe y consume', tone: 'ok' },
      ],
    },
    probe: {
      p: 'classify',
      ask: 'Clasifica cada cuenta por el lado en que se registra al adoptarse el presupuesto.',
      options: ['Debe', 'Haber'],
      items: [
        { label: 'Estimated Revenues', answer: 0 },
        { label: 'Appropriations', answer: 1 },
        { label: 'Estimated Other Financing Uses', answer: 1 },
        { label: 'Budgetary Fund Balance (presupuesto superavitario)', answer: 1 },
      ],
    },
    steps: [
      'Estimated Revenues va al <b>debe</b>: es la expectativa de entrada, el espejo del ingreso real que llegará al haber.',
      'Appropriations y Estimated Other Financing Uses van al <b>haber</b>: son autorizaciones de salida, espejo del gasto real que llegará al debe.',
      'Cada cuenta real va consumiendo su estimada desde el lado contrario.',
      'Budgetary Fund Balance sigue al superávit: al haber si sobra, al debe si el presupuesto es deficitario.',
    ],
    answer:
      'La regla corta: lo estimado se registra <em>al revés</em> de como se registrará lo real. Por eso el año cierra en cero si el presupuesto se cumple exacto.',
  },

  'c1-3': {
    title: '¿Alcanza para una compra más?',
    setup:
      'El departamento de parques tiene una apropiación de <b>$480 000</b>. Lleva <b>$295 000</b> de gastos registrados y una orden de compra abierta por <b>$62 000</b>.',
    viz: {
      v: 'split',
      whole: { label: 'Appropriation · parques', amount: '$480 000' },
      parts: [
        { label: 'Expenditures registrados', amount: '$295 000', tone: 'seal' },
        { label: 'Órdenes abiertas', amount: '$62 000', tone: 'plain' },
        { label: 'Saldo disponible', amount: '$123 000', tone: 'ok' },
      ],
    },
    probe: {
      p: 'choice',
      ask: 'El director quiere firmar una compra de $130 000. ¿Cuál es el saldo disponible y puede firmarla?',
      options: [
        '$185 000 · sí puede',
        '$123 000 · no puede',
        '$123 000 · sí puede, porque la orden abierta todavía no es gasto',
        '$418 000 · sí puede',
      ],
      answer: 1,
    },
    steps: [
      'Empieza por la apropiación completa: 480 000.',
      'Resta lo ya gastado: 480 000 − 295 000 = 185 000.',
      'Resta también lo <em>comprometido</em>: 185 000 − 62 000 = <b>123 000</b>.',
      'No alcanza para 130 000. Faltan 7 000, y firmar sería comprometer dinero que ya tiene dueño.',
    ],
    answer:
      'El compromiso resta aunque no sea gasto: ese es exactamente su trabajo. Sin él, el director habría firmado y el sobregiro habría aparecido cuando llegara la factura de la primera orden.',
  },

  'c1-4': {
    title: 'El cabildo autoriza $150 000 más',
    setup:
      'A mitad de año el cabildo aprueba $150 000 adicionales de apropiación para parques. El presupuesto original tenía apropiaciones por $8 750 000.',
    viz: {
      v: 'ledger',
      cols: ['Columna del estado', 'Apropiaciones'],
      rows: [
        { cells: ['Presupuesto original', '8 750 000'] },
        { cells: ['Modificación aprobada', '+150 000'], tone: 'seal' },
        { cells: ['<b>Presupuesto final</b>', '<b>8 900 000</b>'], tone: 'ok' },
      ],
    },
    probe: {
      p: 'choice',
      ask: '¿Cuál es el asiento de la modificación?',
      options: [
        'Dr Budgetary Fund Balance 150 000 / Cr Appropriations 150 000',
        'Dr Appropriations 8 900 000 / Cr Budgetary Fund Balance 8 900 000',
        'Dr Expenditures 150 000 / Cr Appropriations 150 000',
        'Ninguno: la modificación solo se revela en notas',
      ],
      answer: 0,
    },
    steps: [
      'Se asienta solo por el <em>cambio</em>: 150 000, no por el presupuesto completo.',
      'Aumentar una autorización de salida es acreditar Appropriations.',
      'El otro lado sale del cuadre presupuestario: Budgetary Fund Balance al debe. Autorizar más gasto reduce el superávit aprobado.',
      'El original no se toca. Se necesita intacto para la columna «presupuesto original» del estado comparativo.',
    ],
    answer:
      'La modificación se registra igual que la adopción y solo por la diferencia. Original más modificaciones da el presupuesto final, que es el que se cancelará al cierre.',
  },

  /* ------------------------------------------- II · base modificada */
  'c2-0': {
    title: 'Medible, disponible, o las dos',
    setup: 'Para cada partida, decide si cumple las dos condiciones para ser ingreso de este año.',
    viz: {
      v: 'ledger',
      cols: ['Partida', 'Medible', 'Disponible'],
      rows: [
        { cells: ['Predial cobrado en noviembre', 'Sí', 'Sí'], tone: 'ok' },
        { cells: ['Subsidio federal firmado, se cobra en 14 meses', 'Sí', 'No'], tone: 'no' },
        { cells: ['Multas de tránsito por cobrar', 'No', '—'], tone: 'no' },
        { cells: ['Predial cobrable el 20 de enero', 'Sí', 'Sí'], tone: 'ok' },
      ],
    },
    probe: {
      p: 'yesno',
      ask: '¿Es ingreso de este año bajo base modificada?',
      yes: 'Sí es ingreso',
      no: 'Todavía no',
      items: [
        { label: 'Predial cobrado en noviembre', answer: true },
        { label: 'Subsidio federal firmado, se cobra en 14 meses', answer: false },
        { label: 'Multas de tránsito por cobrar, monto incierto', answer: false },
        { label: 'Predial cobrable el 20 de enero siguiente', answer: true },
      ],
    },
    steps: [
      'El predial de noviembre cumple las dos: se sabe cuánto y ya entró.',
      'El subsidio a 14 meses es perfectamente medible y <em>no está disponible</em>: no sirve para pagar nada de este año.',
      'Las multas por cobrar fallan la primera condición: no son medibles hasta que alguien paga.',
      'El predial del 20 de enero cae dentro de la ventana de 60 días, así que sí cuenta como del año que cerró.',
    ],
    answer:
      'Fallar cualquiera de las dos basta para que no sea ingreso todavía. La segunda —disponible— es la que distingue esta base de la acumulación completa.',
  },

  'c2-1': {
    title: 'Dos cobranzas de enero y abril',
    setup:
      'El año cerró el 31 de diciembre. Del predial quedan por cobrar <b>$335 000</b>: $240 000 entran el 15 de enero y $95 000 el 20 de abril.',
    viz: {
      v: 'scale',
      label: 'Ventana de disponibilidad · 60 días desde el cierre',
      value: '1 de marzo',
      marks: [
        { label: 'Cobro del 15 de enero · $240 000', value: 'día 15', pass: true },
        { label: 'Cobro del 20 de abril · $95 000', value: 'día 110', pass: false },
      ],
    },
    probe: {
      p: 'choice',
      ask: '¿Cuánto de esos $335 000 es ingreso del año que cerró?',
      options: ['$335 000', '$240 000', '$95 000', 'Nada: ninguno se cobró dentro del año'],
      answer: 1,
    },
    steps: [
      'La ventana del predial son 60 días después del cierre: hasta el <b>1 de marzo</b>.',
      'Los $240 000 del 15 de enero caen dentro. Son medibles y disponibles: ingreso del año que cerró.',
      'Los $95 000 del 20 de abril caen fuera. Medibles sí, disponibles no.',
      'Esos $95 000 no se cancelan: se registran como <em>deferred inflow</em> y serán ingreso del año siguiente.',
    ],
    answer:
      'Solo $240 000. La regla de los 60 días es la única ventana fija que da la norma; para los demás ingresos cada gobierno define su plazo, y casi todos adoptan el mismo.',
  },

  'c2-2': {
    title: 'Tres fechas para un mismo escritorio',
    setup:
      'El condado ordena escritorios el 10 de noviembre, los recibe el 28 de diciembre y paga la factura el 15 de enero. Importe: <b>$40 000</b>.',
    viz: {
      v: 'flow',
      nodes: [
        { label: '10 nov · orden', sub: 'encumbrance', tone: 'plain' },
        { label: '28 dic · recepción', sub: 'expenditure', tone: 'seal' },
        { label: '15 ene · pago', sub: 'solo efectivo', tone: 'ok' },
      ],
    },
    probe: {
      p: 'choice',
      ask: '¿En qué año se registra el expenditure de $40 000?',
      options: [
        'En el año del pago, porque ahí salió el dinero',
        'En el año de la recepción, porque ahí se incurrió la obligación del fondo',
        'En el año de la orden, porque ahí se comprometió el recurso',
        'Se reparte entre los dos años',
      ],
      answer: 1,
    },
    steps: [
      'El 10 de noviembre solo hay una orden: el proveedor todavía podría no entregar. Encumbrance, no gasto.',
      'El 28 de diciembre llegan y se aceptan. Ahí nace la <b>obligación del fondo</b>: ahí nace el expenditure.',
      'El 15 de enero se paga. El pago liquida un pasivo que ya estaba en libros; no crea gasto.',
      'Así que el gasto es del año que cerró el 31 de diciembre, aunque el dinero saliera en enero.',
    ],
    answer:
      'Bajo base modificada el gasto sigue a la obligación, no al efectivo ni a la orden. Es la razón de que los libros no se cierren el 31 de diciembre a mediodía.',
  },

  'c2-3': {
    title: 'Cuatro gastos, cuatro caracteres',
    setup: 'Clasifica cada gasto por su <em>carácter</em>: a qué periodos beneficia.',
    viz: {
      v: 'ledger',
      cols: ['Gasto', 'Carácter'],
      rows: [
        { cells: ['Sueldos de los bomberos', 'Current'] },
        { cells: ['Ambulancia nueva', 'Capital outlay'], tone: 'seal' },
        { cells: ['Interés del bono de 2019', 'Debt service'], tone: 'plain' },
        { cells: ['Aportación al distrito escolar', 'Intergovernmental'], tone: 'no' },
      ],
    },
    probe: {
      p: 'classify',
      ask: 'Clasifica cada gasto por carácter.',
      options: ['Current', 'Capital outlay', 'Debt service', 'Intergovernmental'],
      items: [
        { label: 'Sueldos de los bomberos', answer: 0 },
        { label: 'Ambulancia nueva por $310 000', answer: 1 },
        { label: 'Interés del bono emitido en 2019', answer: 2 },
        { label: 'Aportación al distrito escolar', answer: 3 },
      ],
    },
    steps: [
      'El sueldo beneficia al periodo en que se trabajó: <b>current</b>.',
      'La ambulancia servirá varios años: <b>capital outlay</b>.',
      'El interés paga dinero que se usó en 2019: beneficia a periodos <em>pasados</em>, así que es <b>debt service</b>.',
      'La aportación beneficia a <em>otro</em> gobierno: <b>intergovernmental</b>.',
    ],
    answer:
      'El carácter siempre responde a «¿a qué periodos beneficia?». No confundir con la función —bomberos, salud, obras—, que responde a «¿para qué programa?».',
  },

  'c2-4': {
    title: 'Entra dinero, pero ¿es ingreso?',
    setup: 'Cuatro entradas de efectivo al General Fund. Solo algunas son ingresos.',
    viz: {
      v: 'ledger',
      cols: ['Entrada', 'Se presenta como'],
      rows: [
        { cells: ['Predial cobrado', 'Revenue'], tone: 'ok' },
        { cells: ['Producto de una emisión de bonos', 'Other financing source'], tone: 'no' },
        { cells: ['Transferencia del fondo de agua', 'Other financing source'], tone: 'no' },
        { cells: ['Reembolso del fondo de agua por servicios prestados', 'Revenue'], tone: 'ok' },
      ],
    },
    probe: {
      p: 'classify',
      ask: 'Clasifica cada entrada de recursos.',
      options: ['Revenue', 'Other financing source'],
      items: [
        { label: 'Predial cobrado', answer: 0 },
        { label: 'Producto de una emisión de bonos', answer: 1 },
        { label: 'Transferencia de apoyo del fondo de agua', answer: 1 },
        { label: 'Reembolso del fondo de agua por servicios administrativos prestados', answer: 0 },
      ],
    },
    steps: [
      'El predial viene de fuera de la entidad y no hay que devolverlo: ingreso.',
      'El bono hay que devolverlo con intereses. Aumenta el efectivo y no es ingreso de nadie.',
      'La transferencia mueve dinero entre bolsillos del mismo gobierno: no vino de fuera.',
      'El reembolso sí paga un servicio realmente prestado por el General Fund, así que se gana como cualquier venta: ingreso.',
    ],
    answer:
      'La prueba son dos preguntas: ¿viene de fuera de la entidad, y se ganó? La transferencia falla la primera; el bono falla la segunda. El reembolso pasa las dos.',
  },

  /* ------------------------------------------- III · el encumbrance */
  'c3-0': {
    title: 'La mesa, la cena y la cuenta',
    setup: 'Empareja cada momento de la reservación con la cuenta que le corresponde.',
    viz: {
      v: 'flow',
      nodes: [
        { label: 'Reservas', sub: 'Encumbrance', tone: 'seal' },
        { label: 'Cenas', sub: 'Expenditure', tone: 'plain' },
        { label: 'Pagas', sub: 'Cash', tone: 'ok' },
      ],
    },
    probe: {
      p: 'classify',
      ask: '¿Qué cuenta se mueve en cada momento?',
      options: ['Encumbrances', 'Expenditures', 'Cash'],
      items: [
        { label: 'Se firma la orden de compra', answer: 0 },
        { label: 'Llega y se acepta la mercancía', answer: 1 },
        { label: 'Se paga la factura', answer: 2 },
        { label: 'El proveedor confirma que la orden entró a producción', answer: 0 },
      ],
    },
    steps: [
      'Firmar la orden aparta el recurso sin consumir nada: <b>Encumbrances</b>.',
      'Recibir y aceptar la mercancía es lo que crea la obligación: <b>Expenditures</b>.',
      'Pagar solo mueve efectivo contra un pasivo que ya existía: <b>Cash</b>.',
      'Que el proveedor confirme producción no cambia nada: seguimos en el compromiso, sin entrega.',
    ],
    answer:
      'Nadie diría que cenó al reservar. La contabilidad gubernamental hace la misma distinción y le pone un asiento a cada momento, porque entre firmar y recibir pueden pasar semanas.',
  },

  'c3-1': {
    title: 'La orden de compra de $840 000',
    setup: 'Valle Verde emite órdenes de suministros por <b>$840 000</b> estimados. Nada ha llegado.',
    viz: {
      v: 'ledger',
      cols: ['Cuenta', 'Debe', 'Haber'],
      rows: [
        { cells: ['Encumbrances', '840 000', '—'], tone: 'seal' },
        { cells: ['Encumbrances Outstanding', '—', '840 000'], tone: 'seal' },
        { cells: ['<i>Expenditures</i>', '<i>no se toca</i>', '—'], tone: 'no' },
        { cells: ['<i>Vouchers Payable</i>', '—', '<i>no se toca</i>'], tone: 'no' },
      ],
    },
    probe: {
      p: 'choice',
      ask: '¿Qué efecto tiene este asiento sobre los estados financieros del fondo?',
      options: [
        'Aumenta los gastos del periodo en $840 000',
        'Crea un pasivo de $840 000',
        'Ninguno: las dos cuentas son presupuestarias y no aparecen en ningún estado',
        'Reduce el efectivo en $840 000',
      ],
      answer: 2,
    },
    steps: [
      'Las dos cuentas del asiento son <em>presupuestarias</em>: existen para controlar la apropiación, no para reportar.',
      'No hay gasto porque nadie ha entregado nada todavía.',
      'No hay pasivo porque el proveedor aún puede incumplir sin que el condado deba un peso.',
      'Lo único que cambió es el <b>saldo disponible</b>, que bajó $840 000 — y eso no se publica, se administra.',
    ],
    answer:
      'El encumbrance es control interno hecho asiento. Su efecto se ve en lo que el condado todavía puede firmar, nunca en el estado de operación.',
  },

  'c3-2': {
    title: 'A media orden, ¿cuánto queda?',
    setup:
      'Apropiación de <b>$90 000</b>. Se ordenó equipo por <b>$54 000</b> estimados; llegó la mitad, estimada en $27 000, con factura de <b>$27 900</b>.',
    viz: {
      v: 'split',
      whole: { label: 'Appropriation', amount: '$90 000' },
      parts: [
        { label: 'Expenditures (lo facturado)', amount: '$27 900', tone: 'seal' },
        { label: 'Encumbrances abiertos (lo que falta)', amount: '$27 000', tone: 'plain' },
        { label: 'Saldo disponible', amount: '$35 100', tone: 'ok' },
      ],
    },
    probe: {
      p: 'choice',
      ask: '¿Cuál es el saldo disponible después de la entrega parcial?',
      options: ['$36 000', '$35 100', '$62 100', '$8 100'],
      answer: 1,
    },
    steps: [
      'De los $54 000 comprometidos se revirtieron $27 000 al llegar la mitad. Quedan <b>$27 000</b> abiertos.',
      'El gasto entró por lo facturado: <b>$27 900</b>, no por los $27 000 estimados.',
      '90 000 − 27 900 − 27 000 = <b>35 100</b>.',
      'Los $900 de sobreprecio salieron del saldo disponible. Nadie los absorbió: simplemente hay $900 menos para el resto del año.',
    ],
    answer:
      'La entrega parcial mueve las dos cosas a la vez y por importes distintos. Por eso el saldo disponible no es una resta limpia: lleva dentro la diferencia entre lo estimado y lo real.',
  },

  'c3-3': {
    title: 'Estimado $18 500, factura $19 200',
    setup:
      'Llega una orden completa. Se había estimado en <b>$18 500</b> y la factura dice <b>$19 200</b>.',
    viz: {
      v: 'ledger',
      cols: ['Cuenta', 'Debe', 'Haber'],
      rows: [
        { cells: ['Encumbrances Outstanding', '18 500', '—'], tone: 'seal' },
        { cells: ['Encumbrances', '—', '18 500'], tone: 'seal' },
        { cells: ['Expenditures', '19 200', '—'], tone: 'ok' },
        { cells: ['Vouchers Payable', '—', '19 200'], tone: 'ok' },
      ],
    },
    probe: {
      p: 'choice',
      ask: '¿Por cuánto se revierte el compromiso?',
      options: ['$19 200, el importe facturado', '$18 500, el importe estimado', '$700, solo la diferencia', 'No se revierte: se ajusta al alza'],
      answer: 1,
    },
    steps: [
      'Encumbrances Outstanding guarda lo que se <em>apartó</em>, y se apartaron $18 500.',
      'Revertir por $19 200 dejaría la cuenta con $700 de menos de los que realmente hay apartados en otras órdenes.',
      'El gasto sí va por lo facturado: $19 200. Es lo que el condado debe de verdad.',
      'Los $700 de diferencia no se fuerzan a ningún lado. Salen del saldo disponible, que es donde deben doler.',
    ],
    answer:
      'Son dos asientos que van juntos y por importes distintos. Es la disciplina que separa un asiento correcto de uno que casi lo está.',
  },

  'c3-4': {
    title: 'Órdenes vivas el 31 de diciembre',
    setup: 'Cierra el año con órdenes de compra abiertas por <b>$145 000</b>. La mercancía llegará en febrero.',
    viz: {
      v: 'flow',
      nodes: [
        { label: 'Encumbrances', sub: 'se cancela a cero', tone: 'plain' },
        { label: 'Expenditure', sub: 'no hay: nada llegó', tone: 'no' },
        { label: 'Fund Balance', sub: 'se reclasifica $145 000', tone: 'ok' },
      ],
    },
    probe: {
      p: 'choice',
      ask: '¿Qué se hace con los $145 000 al cierre?',
      options: [
        'Se registran como expenditure del año que termina',
        'Se cancelan las cuentas presupuestarias y se reclasifica el fund balance a committed o assigned',
        'Se dejan abiertos en Encumbrances hasta febrero',
        'Se cancelan sin más: si no llegó, no pasó nada',
      ],
      answer: 1,
    },
    steps: [
      'No hubo entrega, así que no hay gasto: registrar un expenditure sería inventarlo.',
      'Las cuentas presupuestarias son temporales y se cancelan como todas: Encumbrances queda en cero.',
      'Pero el recurso <em>sigue apartado</em>, y el balance tiene que decirlo.',
      'Se reclasifican $145 000 de Fund Balance—Unassigned a Committed o Assigned, según quién impuso la restricción.',
    ],
    answer:
      'El saldo total del fondo no cambia con la reclasificación. Lo que cambia es cuánto de ese saldo declara estar libre — que es justo la pregunta del capítulo 2.',
  },

  /* --------------------------------------------- IV · cierre doble */
  'c4-0': {
    title: 'Cuál es cuál al cerrar',
    setup: 'Separa las cuentas en los dos sistemas que corren en paralelo dentro del fondo.',
    viz: {
      v: 'ledger',
      cols: ['Cuenta', 'Sistema'],
      rows: [
        { cells: ['Estimated Revenues', 'Presupuestaria'] },
        { cells: ['Revenues', 'Real'], tone: 'seal' },
        { cells: ['Appropriations', 'Presupuestaria'] },
        { cells: ['Expenditures', 'Real'], tone: 'seal' },
        { cells: ['Encumbrances', 'Presupuestaria'] },
      ],
    },
    probe: {
      p: 'classify',
      ask: '¿A qué sistema pertenece cada cuenta?',
      options: ['Presupuestaria', 'Real'],
      items: [
        { label: 'Estimated Revenues', answer: 0 },
        { label: 'Expenditures', answer: 1 },
        { label: 'Encumbrances Outstanding', answer: 0 },
        { label: 'Other Financing Uses—Transfers Out', answer: 1 },
      ],
    },
    steps: [
      'Todo lo que empieza con <em>Estimated</em> o habla de <em>Encumbrances</em> es presupuestario: registra el plan y el control.',
      'Revenues, Expenditures y Other Financing Uses registran lo que de verdad pasó: son reales.',
      'Los dos sistemas no comparten <em>ninguna</em> cuenta, ni durante el año ni al cerrar.',
      'Por eso hay dos asientos de cierre, y por eso el orden entre ellos da exactamente igual.',
    ],
    answer:
      'La prueba rápida: si la cuenta aparece en un estado financiero publicado, es real. Si solo vive en el mayor para vigilar la ley, es presupuestaria.',
  },

  'c4-1': {
    title: 'Cerrar el plan, no el resultado',
    setup:
      'Presupuesto original: ingresos estimados <b>$9 200 000</b>, apropiaciones <b>$8 750 000</b>, transferencia autorizada <b>$250 000</b>. Durante el año se aprobaron <b>$150 000</b> más de apropiación.',
    viz: {
      v: 'ledger',
      cols: ['Cuenta', 'Debe', 'Haber'],
      rows: [
        { cells: ['Appropriations', '8 900 000', '—'], tone: 'seal' },
        { cells: ['Estimated Other Financing Uses', '250 000', '—'] },
        { cells: ['Budgetary Fund Balance', '50 000', '—'] },
        { cells: ['Estimated Revenues', '—', '9 200 000'], tone: 'seal' },
      ],
    },
    probe: {
      p: 'choice',
      ask: '¿Por cuánto se carga Appropriations en el asiento de cierre presupuestario?',
      options: ['$8 750 000', '$8 900 000', 'Por el gasto real del año', '$150 000'],
      answer: 1,
    },
    steps: [
      'Se cancela lo que las cuentas traen <em>vivo</em>, y eso es el presupuesto final.',
      'Final = original + modificaciones: 8 750 000 + 150 000 = <b>8 900 000</b>.',
      'Budgetary Fund Balance también quedó modificado: nació con 200 000 al haber y la modificación le cargó 150 000. Cierra por 50 000.',
      'Comprueba el cuadre: 8 900 000 + 250 000 + 50 000 = 9 200 000, exactamente Estimated Revenues.',
    ],
    answer:
      'Ninguna cifra real entra al cierre presupuestario. No se está comparando el plan con lo ocurrido: se está borrando el plan, que ya cumplió su función de vigilancia.',
  },

  'c4-2': {
    title: 'El resultado del año',
    setup:
      'Cifras reales del año: ingresos <b>$9 310 000</b>, gastos <b>$8 640 000</b>, transferencia efectiva al fondo de deuda <b>$250 000</b>.',
    viz: {
      v: 'split',
      whole: { label: 'Revenues del año', amount: '$9 310 000' },
      parts: [
        { label: 'Expenditures', amount: '$8 640 000', tone: 'seal' },
        { label: 'Transfers Out', amount: '$250 000', tone: 'plain' },
        { label: 'A Fund Balance—Unassigned', amount: '$420 000', tone: 'ok' },
      ],
    },
    probe: {
      p: 'choice',
      ask: '¿Cuánto va a Fund Balance—Unassigned en el cierre de las cuentas reales?',
      options: ['$670 000 al haber', '$420 000 al haber', '$420 000 al debe', '$9 310 000 al haber'],
      answer: 1,
    },
    steps: [
      'Revenues trae saldo acreedor y se carga por 9 310 000.',
      'Expenditures y Transfers Out traen saldo deudor y se abonan: 8 640 000 y 250 000.',
      '9 310 000 − 8 640 000 − 250 000 = <b>420 000</b> al haber.',
      'Olvidar la transferencia daría 670 000: una transferencia no es gasto, pero consume recursos igual y tiene que cerrar.',
    ],
    answer:
      'Esos $420 000 son el <em>net change in fund balance</em>. No se llama utilidad porque no lo es: es cuánto creció el recurso financiero disponible del fondo.',
  },

  'c4-3': {
    title: 'Reclasificar no es gastar',
    setup:
      'El fondo cierra con <b>$1 800 000</b> de fund balance total. Quedan órdenes abiertas por <b>$145 000</b>.',
    viz: {
      v: 'ledger',
      cols: ['Renglón del fund balance', 'Antes', 'Después'],
      rows: [
        { cells: ['Unassigned', '1 800 000', '1 655 000'], tone: 'seal' },
        { cells: ['Committed', '—', '145 000'], tone: 'ok' },
        { cells: ['<b>Total</b>', '<b>1 800 000</b>', '<b>1 800 000</b>'], tone: 'plain' },
      ],
    },
    probe: {
      p: 'yesno',
      ask: '¿Es correcta cada afirmación sobre la reclasificación?',
      yes: 'Correcta',
      no: 'Incorrecta',
      items: [
        { label: 'El fund balance total baja a $1 655 000', answer: false },
        { label: 'Se reclasifican $145 000 de unassigned a committed', answer: true },
        { label: 'Se registra un expenditure de $145 000', answer: false },
        { label: 'El total del fondo queda igual en $1 800 000', answer: true },
      ],
    },
    steps: [
      'El total no cambia: la reclasificación mueve dinero entre renglones del mismo saldo.',
      'Unassigned baja 145 000 y Committed sube 145 000. Suman lo mismo que antes.',
      'No hay expenditure porque no llegó nada: registrar uno sería inventar un gasto.',
      'Lo que cambia es lo que el balance <em>declara</em>: ya no dice que esos 145 000 estén libres.',
    ],
    answer:
      'Un lector del balance que vea $1 800 000 de unassigned creería que el condado puede disponer de todo. La reclasificación existe para que no lo crea.',
  },

  'c4-4': {
    title: 'Las tres columnas del comparativo',
    setup:
      'Apropiaciones: original <b>$8 750 000</b>, final <b>$8 900 000</b>. Gasto real del año: <b>$8 640 000</b>.',
    viz: {
      v: 'ledger',
      cols: ['Columna', 'Importe'],
      rows: [
        { cells: ['Presupuesto original', '8 750 000'] },
        { cells: ['Presupuesto final', '8 900 000'], tone: 'seal' },
        { cells: ['Real', '8 640 000'], tone: 'plain' },
        { cells: ['<b>Variación vs. final</b>', '<b>260 000 favorable</b>'], tone: 'ok' },
      ],
    },
    probe: {
      p: 'choice',
      ask: '¿Contra qué columna se calcula la variación, y cuánto es?',
      options: [
        'Contra el original: $110 000 favorable',
        'Contra el final: $260 000 favorable',
        'Contra el final: $260 000 desfavorable',
        'Contra el original: $150 000 desfavorable',
      ],
      answer: 1,
    },
    steps: [
      'La variación se mide contra el presupuesto <b>final</b>: es la autorización que de verdad estuvo vigente al gastar.',
      '8 900 000 − 8 640 000 = <b>260 000</b>.',
      'Es <em>favorable</em> porque se gastó menos de lo autorizado. En gasto, gastar de menos es cumplir.',
      'El original se muestra igualmente, para que el lector vea que la autorización creció $150 000 a media carrera.',
    ],
    answer:
      'Las tres columnas cuentan una historia que ninguna sola cuenta: qué se aprobó, qué se acabó autorizando, y qué se ejerció. Por eso la norma exige mostrar el original aunque ya no rija.',
  },
}
