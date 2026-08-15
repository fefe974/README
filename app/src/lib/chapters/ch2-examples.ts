import type { Example } from '../types'

/* Ejemplos del capítulo 2, en el mismo Condado de Valle Verde. */

export const CH2_EXAMPLES: Record<string, Example> = {
  /* ------------------------------------------ I · modelo integrado */
  'b1-0': {
    title: 'Cuatro actividades de un martes cualquiera',
    setup: 'Clasifica cada actividad del condado en una de las tres categorías.',
    viz: {
      v: 'ledger',
      cols: ['Actividad', 'Categoría'],
      rows: [
        { cells: ['Patrullaje del sheriff', 'Gubernamental'], tone: 'seal' },
        { cells: ['Planta de agua potable', 'Tipo negocio'], tone: 'plain' },
        { cells: ['Impuestos cobrados para el distrito escolar', 'Fiduciaria'], tone: 'no' },
        { cells: ['Fondo de pensiones de los empleados', 'Fiduciaria'], tone: 'no' },
      ],
    },
    probe: {
      p: 'classify',
      ask: 'Clasifica cada actividad del condado.',
      options: ['Gubernamental', 'Tipo negocio', 'Fiduciaria'],
      items: [
        { label: 'Patrullaje del sheriff', answer: 0 },
        { label: 'Planta de agua potable', answer: 1 },
        { label: 'Impuestos cobrados para el distrito escolar', answer: 2 },
        { label: 'Fondo de pensiones de los empleados', answer: 2 },
      ],
    },
    steps: [
      'El patrullaje se paga con impuestos generales y no cobra al usuario: gubernamental.',
      'La planta de agua cobra por metro cúbico y busca cubrir su costo: tipo negocio.',
      'Los impuestos del distrito escolar <em>nunca son del condado</em>: solo los cobra y los entrega.',
      'Las pensiones son de los empleados, no del condado. También son de terceros.',
    ],
    answer:
      'Una gubernamental, una tipo negocio y dos fiduciarias. La prueba fiduciaria es si el recurso beneficia a un tercero; si apoya los programas del propio condado, es gubernamental.',
  },
  'b1-1': {
    title: 'Leer el statement of net position',
    setup: 'Un extracto del estado de todo el gobierno de Valle Verde, en miles.',
    viz: {
      v: 'ledger',
      cols: ['Concepto', 'Gubernam.', 'Tipo negocio'],
      rows: [
        { cells: ['Activos', '412 800', '186 400'] },
        { cells: ['Deferred outflows', '9 600', '2 100'] },
        { cells: ['Pasivos', '(238 500)', '(97 300)'] },
        { cells: ['Deferred inflows', '(6 200)', '(1 400)'] },
        { cells: ['<b>Net position</b>', '<b>177 700</b>', '<b>89 800</b>'], tone: 'seal' },
      ],
    },
    probe: {
      p: 'choice',
      ask: 'Con las cifras de la tabla, ¿cuál es el net position de actividades gubernamentales?',
      options: ['412 800', '177 700', '174 300', '183 900'],
      answer: 1,
    },
    steps: [
      'Dos columnas separadas: actividades gubernamentales y tipo negocio. No se mezclan.',
      'Aparecen dos elementos que una empresa no tiene: <em>deferred outflows</em> y <em>deferred inflows</em> de recursos.',
      'No son activos ni pasivos: son consumos o adquisiciones que corresponden a un periodo futuro.',
      'Net position = activos + deferred outflows − pasivos − deferred inflows.',
    ],
    answer:
      'Se lee como un balance, pero con cuatro elementos en vez de dos y con las actividades separadas por columna. Y el net position se reporta en tres partes: inversión neta en capital, restringido y no restringido.',
  },
  'b1-2': {
    title: 'El taller de flotilla que cambia de columna',
    setup:
      'El taller de mantenimiento de Valle Verde es un internal service fund. Factura $4 200 000 al año. ¿Dónde aparece en los estados de todo el gobierno?',
    viz: {
      v: 'split',
      whole: { label: 'Facturación del taller', amount: '$4,2 M' },
      parts: [
        { label: 'A departamentos gubernamentales', amount: '$3,8 M · 90 %', tone: 'seal' },
        { label: 'Al fondo de agua (enterprise)', amount: '$0,4 M · 10 %', tone: 'plain' },
      ],
    },
    probe: {
      p: 'choice',
      ask: '¿En qué columna de los estados de todo el gobierno aparece el taller?',
      options: [
        'Actividades gubernamentales',
        'Actividades tipo negocio',
        'Una columna propia de servicios internos',
        'No aparece arriba',
      ],
      answer: 0,
    },
    steps: [
      'Abajo, en los estados por fondos, el taller es un fondo <em>propietario</em>. Eso no está en duda.',
      'Arriba hay que decidir columna, y la regla mira a quién sirve predominantemente.',
      'El 90 % de su facturación va a departamentos gubernamentales.',
      'Así que arriba se reporta dentro de <em>actividades gubernamentales</em>, no tipo negocio.',
    ],
    answer:
      'Propietario abajo, gubernamental arriba. Si el reparto fuera al revés y sirviera sobre todo a fondos enterprise, subiría a la columna tipo negocio.',
  },
  'b1-3': {
    title: 'Ochenta millones que no aparecen arriba',
    setup:
      'El fondo de pensiones de los empleados de Valle Verde tiene $80 000 000 en activos. El condado los administra.',
    viz: {
      v: 'ledger',
      cols: ['Estado', '¿Aparecen los $80 M?'],
      rows: [
        { cells: ['Statement of net position (todo el gobierno)', 'No'], tone: 'no' },
        { cells: ['Statement of activities (todo el gobierno)', 'No'], tone: 'no' },
        { cells: ['Statement of fiduciary net position', 'Sí'], tone: 'ok' },
        { cells: ['Statement of changes in fiduciary net position', 'Sí'], tone: 'ok' },
      ],
    },
    probe: {
      p: 'yesno',
      ask: '¿Aparecen los $80 000 000 en cada estado?',
      yes: 'Aparecen', no: 'No aparecen',
      items: [
        { label: 'Statement of net position (todo el gobierno)', answer: false },
        { label: 'Statement of activities (todo el gobierno)', answer: false },
        { label: 'Statement of fiduciary net position', answer: true },
        { label: 'Statement of changes in fiduciary net position', answer: true },
      ],
    },
    steps: [
      'El condado <em>controla</em> esos activos: decide inversiones y firma cheques.',
      'Pero no puede usarlos para pagar policías, calles ni nada de sus programas.',
      'Como no pueden financiar los programas del gobierno, el GASB los excluye de arriba.',
      'Aparecen solo en los dos estados fiduciarios, ambos con recursos económicos y devengado.',
    ],
    answer:
      'Controlar no es lo mismo que poder usar. No existe una columna fiduciaria en los estados de todo el gobierno — esa es la trampa habitual.',
  },
  'b1-4': {
    title: 'Por qué $12 M no es $95 M',
    setup:
      'El balance de fondos gubernamentales de Valle Verde cierra con $12 000 000 de fund balance. El net position de actividades gubernamentales es de $95 000 000.',
    viz: {
      v: 'ledger',
      cols: ['Partida', 'Miles'],
      rows: [
        { cells: ['Total fund balances · fondos gubernamentales', '12 000'], tone: 'seal' },
        { cells: ['+ Activos de capital, netos', '148 000'], tone: 'ok' },
        { cells: ['− Deuda a largo plazo', '(61 000)'], tone: 'no' },
        { cells: ['− Otros ajustes', '(4 000)'], tone: 'no' },
        { cells: ['<b>= Net position · actividades gubernam.</b>', '<b>95 000</b>'], tone: 'seal' },
      ],
    },
    probe: {
      p: 'choice',
      ask: '¿Por qué el fund balance es $12 M y el net position $95 M?',
      options: [
        'Porque uno está mal calculado',
        'Porque abajo no se reportan activos de capital ni deuda a largo plazo',
        'Porque arriba se incluyen los fondos fiduciarios',
        'Porque usan periodos distintos',
      ],
      answer: 1,
    },
    steps: [
      'Abajo no se reportan activos de capital: no sirven para pagar obligaciones del periodo.',
      'Al subir, esos $148 M de activos netos <em>sí</em> entran.',
      'Abajo tampoco se reporta la deuda a largo plazo. Al subir, se resta.',
      'La diferencia entre $12 M y $95 M queda explicada línea por línea.',
    ],
    answer:
      'Es la <em>conciliación</em> que el GASB exige. Puede ir al pie del balance o como cédula aparte; prepararla se ve en el capítulo 9.',
  },

  /* ------------------------------------------ II · categorías de fondos */
  'b2-0': {
    title: 'Un donativo que obliga a abrir un fondo',
    setup:
      'Una vecina dona $500 000 a Valle Verde con una condición escrita: solo pueden usarse para operar la biblioteca.',
    viz: {
      v: 'ledger',
      cols: ['El fondo de biblioteca', 'Monto'],
      rows: [
        { cells: ['Efectivo', '$500 000'] },
        { cells: ['Pasivos', '$0'] },
        { cells: ['<b>Fund balance</b>', '<b>$500 000</b>'], tone: 'seal' },
      ],
    },
    probe: {
      p: 'choice',
      ask: '¿Qué tipo de fondo hay que abrir para ese donativo?',
      options: ['General Fund', 'Special revenue fund', 'Permanent fund', 'Private-purpose trust fund'],
      answer: 1,
    },
    steps: [
      'Si el dinero entrara al General Fund, se mezclaría con recursos sin restricción.',
      'Entonces nadie podría demostrar que se usó solo en la biblioteca.',
      'Por eso se abre un fondo: una entidad fiscal <em>y</em> contable con cuentas que cuadran solas.',
      'Tiene sus propios recursos, sus propios pasivos y podría preparar estados por separado.',
    ],
    answer:
      'Es un <em>special revenue fund</em>. Los fondos existen justamente para separar lo restringido de lo no restringido — pero el GASB pide abrir solo el mínimo necesario.',
  },
  'b2-1': {
    title: 'Cuatro cheques, cuatro fondos gubernamentales',
    setup: 'Valle Verde firma cuatro pagos el mismo día. Cada uno vive en un fondo distinto.',
    viz: {
      v: 'ledger',
      cols: ['Pago', 'Fondo'],
      rows: [
        { cells: ['Nómina de la oficina del administrador', 'General Fund'], tone: 'seal' },
        { cells: ['Bacheo pagado con el impuesto a la gasolina', 'Special revenue'], tone: 'plain' },
        { cells: ['Intereses de los bonos de 2019', 'Debt service'], tone: 'plain' },
        { cells: ['Anticipo al constructor del nuevo juzgado', 'Capital projects'], tone: 'plain' },
      ],
    },
    probe: {
      p: 'classify',
      ask: '¿En qué fondo vive cada pago?',
      options: ['General', 'Special revenue', 'Debt service', 'Capital projects'],
      items: [
        { label: 'Nómina de la oficina del administrador', answer: 0 },
        { label: 'Bacheo pagado con el impuesto a la gasolina', answer: 1 },
        { label: 'Intereses de los bonos de 2019', answer: 2 },
        { label: 'Anticipo al constructor del nuevo juzgado', answer: 3 },
      ],
    },
    steps: [
      'La nómina administrativa no está obligada a ir a otro lado: General Fund, por defecto.',
      'El impuesto a la gasolina está restringido a calles, así que necesita su propio fondo.',
      'Los intereses de deuda general a largo plazo van al fondo de servicio de deuda.',
      'La construcción de un activo de larga vida va al fondo de proyectos de capital.',
    ],
    answer:
      'Cuatro de los cinco tipos gubernamentales. Falta el <em>permanent fund</em>, que solo aparece cuando hay una dotación cuyo principal se preserva.',
  },
  'b2-2': {
    title: 'La alberca y el taller',
    setup:
      'Valle Verde opera una alberca municipal que cobra $30 la entrada, y un taller que repara los vehículos del propio condado.',
    viz: {
      v: 'ledger',
      cols: ['Operación', 'Le vende a', 'Tipo'],
      rows: [
        { cells: ['Alberca municipal', 'el público', 'Enterprise'], tone: 'seal' },
        { cells: ['Taller de flotilla', 'departamentos del condado', 'Internal service'], tone: 'plain' },
      ],
    },
    probe: {
      p: 'classify',
      ask: 'Los dos son propietarios. ¿De qué tipo es cada uno?',
      options: ['Enterprise', 'Internal service'],
      items: [
        { label: 'Alberca municipal, entrada $30', answer: 0 },
        { label: 'Taller que repara los vehículos del condado', answer: 1 },
      ],
    },
    steps: [
      'Los dos son propietarios: cobran por lo que hacen y usan devengado pleno.',
      'La única pregunta que los separa es <em>a quién le venden</em>.',
      'La alberca vende al público: enterprise.',
      'El taller cobra a departamentos del mismo condado a costo reembolsable: internal service.',
    ],
    answer:
      'Misma categoría, distinto tipo. Y ojo: el GASB <em>obliga</em> a usar enterprise si la deuda se garantiza con los ingresos de la actividad, si la ley exige recuperar costos con tarifas, o si la política de precios está diseñada para recuperarlos.',
  },
  'b2-3': {
    title: 'Dos fideicomisos que parecen iguales',
    setup:
      'Valle Verde administra dos dotaciones de $1 000 000 cada una. El principal se preserva en ambas; solo cambia quién recibe los rendimientos.',
    viz: {
      v: 'ledger',
      cols: ['Dotación', 'Los rendimientos van a', 'Fondo'],
      rows: [
        { cells: ['Fondo Ramírez', 'mantener el parque municipal', 'Permanent · gubernamental'], tone: 'seal' },
        { cells: ['Fondo Ortega', 'becas para hijos de bomberos caídos', 'Private-purpose trust · fiduciario'], tone: 'no' },
      ],
    },
    probe: {
      p: 'classify',
      ask: 'Mismo principal preservado. ¿Qué fondo le toca a cada dotación?',
      options: ['Permanent (gubernamental)', 'Private-purpose trust (fiduciario)'],
      items: [
        { label: 'Fondo Ramírez · rendimientos mantienen el parque municipal', answer: 0 },
        { label: 'Fondo Ortega · rendimientos pagan becas a hijos de bomberos', answer: 1 },
      ],
    },
    steps: [
      'Las dos preservan el principal a perpetuidad. Eso no las distingue.',
      'Los rendimientos del Fondo Ramírez mantienen un parque: beneficia al público en general.',
      'Los del Fondo Ortega pagan becas a personas concretas: beneficia a particulares.',
      'Beneficio público → permanent fund, que es <em>gubernamental</em>. Beneficio privado → fiduciario.',
    ],
    answer:
      'Estructura idéntica, categorías distintas. La pregunta que decide es a quién benefician los rendimientos, no cómo está armado el fideicomiso.',
  },

  /* ------------------------------------- III · medición y base contable */
  'b3-0': {
    title: 'El mismo predial, dos fechas de cobro',
    setup:
      'Valle Verde cierra su año el 31 de diciembre de 2024. Tiene $900 000 de predial por cobrar. La política del condado son 60 días.',
    viz: {
      v: 'ledger',
      cols: ['Se cobra el', 'Días tras el cierre', '¿Ingreso de 2024?'],
      rows: [
        { cells: ['14 de febrero de 2025', '45', 'Sí'], tone: 'ok' },
        { cells: ['20 de abril de 2025', '110', 'No'], tone: 'no' },
      ],
    },
    probe: {
      p: 'yesno',
      ask: 'Cierre el 31 de diciembre, política de 60 días. ¿Es ingreso de 2024?',
      yes: 'Sí', no: 'No',
      items: [
        { label: 'Cobrado el 14 de febrero de 2025 · 45 días', answer: true },
        { label: 'Cobrado el 20 de abril de 2025 · 110 días', answer: false },
      ],
    },
    steps: [
      'Bajo devengado modificado, el ingreso necesita dos cosas: ser <em>medible</em> y estar <em>disponible</em>.',
      'Medible lo es en ambos casos: son $900 000 ya determinados.',
      'Disponible significa cobrable a tiempo para pagar obligaciones del periodo.',
      'Los cobrados a 45 días entran en 2024. Los de 110 días, no: se reconocerán después.',
    ],
    answer:
      'Solo lo cobrado dentro de la ventana es ingreso de 2024. Para el impuesto predial el GASB fija <em>60 días obligatorios</em>; en los demás ingresos cada gobierno define su plazo, entre 30 días y un año.',
  },
  'b3-1': {
    title: 'Lo que no cabe en el balance del fondo',
    setup:
      'El fondo de proyectos de capital de Valle Verde construyó un juzgado de $8 000 000, financiado con un bono de $5 000 000 a 20 años.',
    viz: {
      v: 'ledger',
      cols: ['Partida', 'Balance del fondo', 'Todo el gobierno'],
      rows: [
        { cells: ['Efectivo remanente', 'Sí', 'Sí'], tone: 'ok' },
        { cells: ['Edificio del juzgado · $8 M', 'No', 'Sí'], tone: 'no' },
        { cells: ['Bono a 20 años · $5 M', 'No', 'Sí'], tone: 'no' },
      ],
    },
    probe: {
      p: 'yesno',
      ask: '¿Aparece en el balance del fondo de proyectos de capital?',
      yes: 'Aparece', no: 'No aparece',
      items: [
        { label: 'Efectivo remanente', answer: true },
        { label: 'Edificio del juzgado · $8 000 000', answer: false },
        { label: 'Bono a 20 años · $5 000 000', answer: false },
      ],
    },
    steps: [
      'El enfoque del fondo es de recursos financieros <em>corrientes</em>.',
      'El edificio no se puede usar para pagar obligaciones del periodo, así que no entra como activo.',
      'El bono no hay que pagarlo este periodo, así que tampoco entra como pasivo.',
      'Los dos sí aparecen arriba, en la columna de actividades gubernamentales.',
    ],
    answer:
      'El balance del fondo muestra casi puro efectivo y cuentas de corto plazo. No es que se hayan omitido: se reportan con el otro enfoque, en el otro estado.',
  },
  'b3-2': {
    title: 'Un camión de basura, dos cifras',
    setup:
      'Valle Verde compra un camión de basura de $240 000 en efectivo. Vida útil: 8 años, sin valor residual.',
    viz: {
      v: 'ledger',
      cols: ['Año', 'En el fondo', 'En todo el gobierno'],
      rows: [
        { cells: ['Año 1', '$240 000', '$30 000'], tone: 'seal' },
        { cells: ['Año 2', '$0', '$30 000'] },
        { cells: ['Años 3 a 8', '$0', '$30 000 c/u'] },
        { cells: ['<b>Total 8 años</b>', '<b>$240 000</b>', '<b>$240 000</b>'], tone: 'ok' },
      ],
    },
    probe: {
      p: 'choice',
      ask: 'El camión cuesta $240 000 y dura 8 años. ¿Cuánto se registra en el fondo el año 1?',
      options: ['$30 000', '$240 000', '$0', '$210 000'],
      answer: 1,
    },
    steps: [
      'En el fondo se registra un <em>expenditure</em> de $240 000 el año 1: salió todo el recurso corriente.',
      'Arriba se registra un activo, y el <em>expense</em> es la depreciación: $30 000 al año.',
      'El año 1 las dos cifras difieren en $210 000.',
      'A ocho años suman lo mismo. Lo que cambia es <em>cuándo</em> se reconoce el costo.',
    ],
    answer:
      'Expenditure mide el recurso que salió este periodo; expense mide el costo consumido. Misma transacción, dos preguntas, y la conciliación explica la diferencia.',
  },
  'b3-3': {
    title: 'Poner precio al metro cúbico de agua',
    setup:
      'El fondo de agua de Valle Verde necesita fijar tarifa. Sirvió 2 000 000 de metros cúbicos este año.',
    viz: {
      v: 'split',
      whole: { label: 'Costo completo del servicio', amount: '$5 400 000' },
      parts: [
        { label: 'Operación: sueldos, químicos, energía', amount: '$3 900 000', tone: 'plain' },
        { label: 'Depreciación de planta y red', amount: '$1 100 000', tone: 'seal' },
        { label: 'Intereses de la deuda', amount: '$400 000', tone: 'plain' },
      ],
    },
    probe: {
      p: 'choice',
      ask: 'Con el costo completo y 2 000 000 de m³, ¿cuál es la tarifa por metro cúbico?',
      options: ['$2,15', '$2,70', '$1,95', '$3,20'],
      answer: 1,
    },
    steps: [
      'Con devengado modificado no vería la depreciación: solo el efectivo que salió este año.',
      'Sin esos $1 100 000, el costo parecería de $4 300 000 y la tarifa saldría baja.',
      'La red se desgasta aunque no salga efectivo, y hay que reponerla algún día.',
      'Costo completo entre 2 000 000 de m³ da $2,70 por metro cúbico.',
    ],
    answer:
      'Los fondos propietarios usan recursos económicos y devengado por una razón práctica: sin el costo completo, incluida la depreciación, no se puede fijar tarifa ni decidir si conviene prestar el servicio o contratarlo fuera.',
  },

  /* ------------------------------------------------ IV · fund balance */
  'b4-0': {
    title: 'Lo primero que se aparta',
    setup:
      'El General Fund de Valle Verde cierra con $3 000 000 de fund balance. La contadora empieza a clasificarlo.',
    viz: {
      v: 'split',
      whole: { label: 'Fund balance del General Fund', amount: '$3 000 000' },
      parts: [
        { label: 'Inventario de almacén', amount: '$22 000', tone: 'seal' },
        { label: 'Seguros pagados por anticipado', amount: '$464 000', tone: 'seal' },
        { label: 'Queda por clasificar', amount: '$2 514 000', tone: 'plain' },
      ],
    },
    probe: {
      p: 'yesno',
      ask: '¿Es nonspendable?',
      yes: 'Sí', no: 'No',
      items: [
        { label: 'Inventario de almacén · $22 000', answer: true },
        { label: 'Seguros pagados por anticipado · $464 000', answer: true },
        { label: 'Efectivo sin restricción · $2 514 000', answer: false },
      ],
    },
    steps: [
      'La clasificación se hace en orden, y lo primero es apartar lo <em>no gastable</em>.',
      'El inventario es un bien físico: no está en forma de poder gastarse.',
      'El seguro anticipado ya se pagó: tampoco es un recurso disponible para gastar.',
      'Los $2 514 000 restantes sí son gastables, y ahora se clasifican según quién puso el candado.',
    ],
    answer:
      '$486 000 son <em>nonspendable</em>. La misma lógica aplica al principal de una dotación permanente, que es no gastable por ley aunque sea dinero.',
  },
  'b4-1': {
    title: 'Tres candados, tres dueños',
    setup: 'Sobre los $2 514 000 restantes hay tres restricciones distintas.',
    viz: {
      v: 'ledger',
      cols: ['Monto', 'Quién puso el candado', 'Clasificación'],
      rows: [
        { cells: ['$250 000', 'el gobierno federal (subvención)', 'Restricted'], tone: 'seal' },
        { cells: ['$1 000 000', 'la comisión, por ordenanza', 'Committed'], tone: 'ok' },
        { cells: ['$100 000', 'la administradora del condado', 'Assigned'], tone: 'plain' },
      ],
    },
    probe: {
      p: 'classify',
      ask: '¿Quién puso el candado en cada monto?',
      options: ['Restricted', 'Committed', 'Assigned'],
      items: [
        { label: '$250 000 · subvención federal para vivienda', answer: 0 },
        { label: '$1 000 000 · reserva creada por ordenanza de la comisión', answer: 1 },
        { label: '$100 000 · apartados por la administradora del condado', answer: 2 },
      ],
    },
    steps: [
      'Pregunta única: ¿quién impuso la restricción y qué se necesita para quitarla?',
      'La subvención federal viene de <em>afuera</em>. Solo el otorgante puede liberarla: restricted.',
      'La ordenanza la puso el propio condado al máximo nivel y por acción formal: committed.',
      'La administradora tiene autoridad delegada pero no hubo acción formal: assigned.',
    ],
    answer:
      'Externo → restricted. Interno con acción formal → committed. Interno sin acción formal → assigned. El monto no importa: importa el origen del candado.',
  },
  'b4-2': {
    title: 'Dos ordenanzas que no son lo mismo',
    setup:
      'La comisión de Valle Verde aprobó dos ordenanzas. Las dos apartan dinero, pero se clasifican distinto.',
    viz: {
      v: 'flow',
      nodes: [
        { label: 'Ordenanza A · crea un impuesto', sub: 'grava 0,5 % de ventas y lo destina a desarrollo económico', tone: 'seal' },
        { label: '¿Puede la comisión usarlo en otra cosa?', sub: 'No: el componente de ingreso lo impide', tone: 'no' },
        { label: 'Ordenanza B · aparta una reserva', sub: 'destina $1 000 000 de recursos existentes a emergencias', tone: 'ok' },
        { label: '¿Puede la comisión usarlo en otra cosa?', sub: 'Sí, revirtiendo la ordenanza', tone: 'ok' },
      ],
    },
    probe: {
      p: 'classify',
      ask: 'Las dos son ordenanzas del máximo nivel. ¿Cómo se clasifica cada saldo?',
      options: ['Restricted', 'Committed'],
      items: [
        { label: 'A · crea un impuesto a las ventas destinado a desarrollo económico', answer: 0 },
        { label: 'B · aparta $1 000 000 ya existentes como reserva de emergencia', answer: 1 },
      ],
    },
    steps: [
      'Las dos son acciones formales del máximo nivel, así que parecen ambas <em>committed</em>.',
      'La ordenanza A es <em>legislación habilitante</em>: autoriza recaudar un ingreso <em>para un fin restringido</em>.',
      'Ese componente de ingreso impide usar el recurso en otra cosa, aunque la comisión quisiera.',
      'La ordenanza B solo aparta recursos que ya existían. Basta revertirla para liberarlos.',
    ],
    answer:
      'La A produce saldo <em>restricted</em>; la B, <em>committed</em>. La prueba rápida: si basta con que el mismo cuerpo vuelva a votar, es committed.',
  },
  'b4-3': {
    title: 'El cierre completo de dos fondos',
    setup:
      'Valle Verde clasifica el residuo del General Fund y el de un special revenue fund que quedó sin restricciones.',
    viz: {
      v: 'ledger',
      cols: ['Fondo', 'Residuo', 'Clasificación'],
      rows: [
        { cells: ['General Fund', '$1 164 000', 'Unassigned'], tone: 'ok' },
        { cells: ['Special revenue (biblioteca)', '$50 000', 'Assigned'], tone: 'seal' },
        { cells: ['Capital projects (sobregirado)', '−$80 000', 'Unassigned negativo'], tone: 'no' },
      ],
    },
    probe: {
      p: 'classify',
      ask: '¿Cómo se clasifica el residuo de cada fondo?',
      options: ['Unassigned', 'Assigned'],
      items: [
        { label: 'General Fund · $1 164 000 restantes', answer: 0 },
        { label: 'Special revenue de biblioteca · $50 000 sin restricción', answer: 1 },
        { label: 'Capital projects · sobregirado en $80 000', answer: 0 },
      ],
    },
    steps: [
      'En el General Fund, lo que sobra tras clasificar todo lo demás es <em>unassigned</em>.',
      'Es el único fondo que puede tener un unassigned <em>positivo</em>.',
      'En el fondo de biblioteca, lo que sobra sin ser restringido ni comprometido se entiende <em>asignado</em>.',
      'El fondo de capital gastó de más: reporta un unassigned <em>negativo</em>, que sí está permitido.',
    ],
    answer:
      'Dos reglas de signo: solo el General Fund puede tener unassigned positivo, y el GASB no permite saldos negativos en restricted, committed ni assigned.',
  },

  /* ---------------------------------------------- V · fondos mayores */
  'b5-0': {
    title: 'Veintitrés fondos en dos columnas y media',
    setup:
      'Valle Verde usa 23 fondos gubernamentales. El balance impreso no tiene 23 columnas.',
    viz: {
      v: 'split',
      whole: { label: 'Fondos gubernamentales del condado', amount: '23' },
      parts: [
        { label: 'General Fund · columna propia', amount: '1', tone: 'seal' },
        { label: 'Mayores por la prueba · columna propia', amount: '2', tone: 'ok' },
        { label: 'No mayores · una sola columna agregada', amount: '20', tone: 'plain' },
      ],
    },
    probe: {
      p: 'choice',
      ask: 'El condado usa 23 fondos gubernamentales y 2 pasan la prueba. ¿Cuántas columnas tendrá el balance?',
      options: ['23', '4', '3', '2'],
      answer: 1,
    },
    steps: [
      'Al usuario no le interesan los 23: le interesan los que mueven dinero grande.',
      'El General Fund siempre tiene columna, sin hacer cuentas.',
      'Dos fondos más pasan la prueba aritmética y también reciben columna.',
      'Los otros 20 se suman en una sola columna de «otros fondos gubernamentales».',
    ],
    answer:
      'Cuatro columnas en total. La prueba aplica solo a fondos gubernamentales y enterprise: nunca a internal service ni a fiduciarios.',
  },
  'b5-1': {
    title: 'Un fondo que casi lo logra',
    setup:
      'El fondo de caminos de Valle Verde tiene $2 600 000 de activos. Los fondos gubernamentales suman $26 300 000 y, junto con los enterprise, $51 250 000.',
    viz: {
      v: 'scale',
      label: 'Activos del fondo de caminos',
      value: '$2 600 000',
      marks: [
        { label: 'Valla 1 · 10 % de gubernamentales', value: '$2 630 000', pass: false },
        { label: 'Valla 2 · 5 % del combinado', value: '$2 562 500', pass: true },
      ],
    },
    probe: {
      p: 'yesno',
      ask: 'El fondo tiene $2 600 000 de activos. ¿Salta cada valla?',
      yes: 'La salta', no: 'No la salta',
      items: [
        { label: 'Valla 1 · 10 % de gubernamentales = $2 630 000', answer: false },
        { label: 'Valla 2 · 5 % del combinado = $2 562 500', answer: true },
      ],
    },
    steps: [
      '10 % de $26 300 000 son $2 630 000. El fondo tiene $2 600 000: se queda corto por $30 000.',
      '5 % de $51 250 000 son $2 562 500. Aquí sí pasa.',
      'Pero las dos vallas hay que saltarlas con el <em>mismo</em> elemento.',
      'Falló la primera con activos, así que por activos no califica. Habría que probar pasivos, ingresos y egresos por separado.',
    ],
    answer:
      'No es fondo mayor por activos. Por $30 000 — y por eso la prueba se hace con números y no a ojo.',
  },
  'b5-2': {
    title: 'El fondo pequeño que igual sale aparte',
    setup:
      'El fondo de emergencias sanitarias de Valle Verde movió $600 000, muy por debajo de los umbrales. La comisión quiere que se vea aparte.',
    viz: {
      v: 'flow',
      nodes: [
        { label: '¿Pasa el 10 % y el 5 % con el mismo elemento?', sub: 'No, en ningún elemento', tone: 'no' },
        { label: '¿Lo considera el condado de importancia significativa?', sub: 'Sí: es el fondo más consultado por los residentes', tone: 'ok' },
        { label: 'Se reporta como fondo mayor', sub: 'por decisión, no por aritmética', tone: 'seal' },
      ],
    },
    probe: {
      p: 'choice',
      ask: 'No pasa ningún umbral, pero al condado le importa. ¿Puede reportarse como mayor?',
      options: [
        'No: la prueba aritmética es la única vía',
        'Sí: cualquier fondo de importancia significativa puede reportarse como mayor',
        'Solo si lo autoriza el auditor',
        'Solo si lo pasó el año anterior',
      ],
      answer: 1,
    },
    steps: [
      'Por números no califica: ni activos, ni pasivos, ni ingresos, ni egresos llegan.',
      'Pero la norma añade un criterio de juicio a la prueba aritmética.',
      'Cualquier fondo que el gobierno considere de importancia significativa para los usuarios puede reportarse como mayor.',
      'La aritmética es un piso obligatorio, no un techo.',
    ],
    answer:
      'Sí puede reportarse como mayor. Y al revés: un fondo que cumplió ambos criterios el año pasado y este año no, puede seguir reportándose como mayor a la espera del año siguiente.',
  },
  'b5-3': {
    title: 'Qué fondos llevan cédula presupuestal',
    setup: 'Valle Verde decide para cuáles de sus fondos debe publicar comparación de presupuesto contra real.',
    viz: {
      v: 'ledger',
      cols: ['Fondo', '¿Presupuesto legal?', '¿Lleva cédula?'],
      rows: [
        { cells: ['General Fund', 'Sí', 'Sí'], tone: 'ok' },
        { cells: ['Caminos · special revenue mayor', 'Sí', 'Sí'], tone: 'ok' },
        { cells: ['Biblioteca · special revenue no mayor', 'Sí', 'No'], tone: 'no' },
        { cells: ['Proyectos de capital · mayor', 'No', 'No'], tone: 'no' },
      ],
    },
    probe: {
      p: 'yesno',
      ask: '¿Lleva cédula de comparación presupuestal?',
      yes: 'Sí', no: 'No',
      items: [
        { label: 'General Fund', answer: true },
        { label: 'Caminos · special revenue mayor, con presupuesto legal', answer: true },
        { label: 'Biblioteca · special revenue NO mayor', answer: false },
        { label: 'Proyectos de capital · mayor, sin presupuesto legal', answer: false },
      ],
    },
    steps: [
      'La exigencia alcanza al General Fund y a cada <em>special revenue fund mayor</em>.',
      'Caminos cumple las dos condiciones: es special revenue, es mayor y tiene presupuesto legalmente adoptado.',
      'Biblioteca tiene presupuesto pero no es mayor: queda fuera.',
      'Proyectos de capital es mayor pero no es special revenue: también queda fuera.',
    ],
    answer:
      'Solo dos cédulas. El GASB recomienda presentarlas como RSI justo después de las notas, aunque el gobierno puede convertirlas en un estado dentro de los básicos.',
  },
}
