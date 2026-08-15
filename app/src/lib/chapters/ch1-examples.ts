import type { Example } from '../types'

/* Un ejemplo trabajado por paso, con la clave `${articleId}-${stepIndex}`.
   Todos ocurren en el mismo lugar —el Condado de Valle Verde— para que
   el estudiante siga una sola entidad a lo largo del curso. */

export const CH1_EXAMPLES: Record<string, Example> = {
  /* ------------------------------------------------ I · distinciones */
  'a1-0': {
    title: 'María paga dos cosas el mismo día',
    setup:
      'María paga $1 200 de impuesto predial al Condado de Valle Verde. Esa misma tarde compra un café de $58 en la cafetería de la esquina.',
    viz: {
      v: 'ledger',
      cols: ['Lo que paga', 'Monto', 'Qué recibe'],
      rows: [
        { cells: ['Café', '$58', 'Un café'], tone: 'ok', note: 'proporcional y directo' },
        { cells: ['Predial', '$1 200', 'Los servicios del condado'], tone: 'seal', note: 'sin relación con lo pagado' },
      ],
    },
    probe: {
      p: 'choice',
      ask: '¿Cuál de los dos pagos es una transacción de intercambio?',
      options: ['El café', 'El predial', 'Los dos', 'Ninguno de los dos'],
      answer: 0,
    },
    steps: [
      '¿Puede negarse a pagar? El café sí; el predial no. El pago al condado es <em>involuntario</em>.',
      '¿Puede elegir la cantidad? Puede pedir un café más chico. No puede pedir «menos policía» y pagar menos.',
      '¿Lo que recibe depende de lo que pagó? El café sí. Su vecino paga $400 de predial y usa las mismas calles.',
      'Su vecino recibe lo mismo pagando un tercio. Esa desconexión es la que rompe el modelo comercial.',
    ],
    answer:
      'El café es una transacción de intercambio: pago proporcional, beneficio directo. El predial no lo es, y por eso la contabilidad del condado no puede funcionar como la de la cafetería.',
  },
  'a1-1': {
    title: 'Aplicar las tres pruebas a un museo',
    setup:
      'El Museo Regional de Valle Verde es privado, cobra entrada de $40 y termina el año con $180 000 de superávit. ¿Es una entidad sin fines de lucro según el FASB?',
    viz: {
      v: 'flow',
      nodes: [
        { label: 'Prueba (a) · aportantes sin retorno proporcional', sub: 'Recibió $2,1 M en donativos. Los donantes no reciben nada a cambio.', tone: 'ok' },
        { label: 'Prueba (b) · propósito distinto de la utilidad', sub: 'Su fin es conservar y exhibir, no generar utilidad.', tone: 'ok' },
        { label: 'Prueba (c) · sin intereses de propiedad', sub: 'Nadie posee una parte que pueda vender o redimir.', tone: 'ok' },
      ],
    },
    probe: {
      p: 'yesno',
      ask: '¿El museo cumple cada una de las tres pruebas?',
      yes: 'Cumple', no: 'No cumple',
      items: [
        { label: '(a) Recibe recursos de quienes no esperan retorno proporcional', answer: true },
        { label: '(b) Su propósito operativo no es generar utilidad', answer: true },
        { label: '(c) No hay intereses de propiedad vendibles', answer: true },
      ],
    },
    steps: [
      'El superávit de $180 000 <em>no</em> descalifica nada: ninguna de las tres pruebas habla de resultados.',
      'Prueba (a): los donantes aportan $2,1 M sin esperar devolución. Cumple.',
      'Prueba (b): el propósito operativo es conservar y exhibir, no lucrar. Cumple.',
      'Prueba (c): no hay acciones ni participaciones vendibles. Cumple.',
    ],
    answer:
      'Cumple las tres, así que es una entidad sin fines de lucro. Tener superávit es normal y permitido — lo que importa es el propósito y la ausencia de dueños.',
  },
  'a1-2': {
    title: 'Un superávit que esconde un problema',
    setup:
      'Valle Verde cierra el año con $2 000 000 más de lo que gastó. El tesorero lo presenta como un año excelente.',
    viz: {
      v: 'ledger',
      cols: ['Indicador', 'Cifra'],
      rows: [
        { cells: ['Recursos menos gastos', '+$2 000 000'], tone: 'ok' },
        { cells: ['Baches sin reparar', '1 840'], tone: 'no' },
        { cells: ['Tiempo de respuesta de bomberos', '11 min'], tone: 'no' },
        { cells: ['Mantenimiento pospuesto', '$6 300 000'], tone: 'no' },
      ],
    },
    probe: {
      p: 'choice',
      ask: '¿El superávit de $2 000 000 prueba que el condado tuvo un buen año?',
      options: [
        'Sí: entró más de lo que salió',
        'No: el superávit vino de posponer mantenimiento',
        'Sí, si además bajó la deuda',
        'No se puede saber sin el estado de flujos',
      ],
      answer: 1,
    },
    steps: [
      'En una empresa, $2 M de utilidad casi siempre es buena noticia.',
      'Aquí el superávit salió de <em>no</em> prestar servicios: se pospuso mantenimiento por $6,3 M.',
      'El condado no compite: los residentes no pueden irse a otro proveedor de bomberos.',
      'Entonces la cifra no mide desempeño. Solo mide que entró más de lo que salió.',
    ],
    answer:
      'Ninguna cifra única sirve para juzgar a un gobierno. Hay que preguntar además si cumplió lo que el público decidió y si usó bien los recursos — las dos preguntas del artículo II.',
  },
  'a1-3': {
    title: 'Cuatro entidades del mismo condado',
    setup: 'Clasifica cada una como gobierno de propósito general o especial.',
    viz: {
      v: 'ledger',
      cols: ['Entidad', 'Funciones'],
      rows: [
        { cells: ['Condado de Valle Verde', 'muchas'], tone: 'seal' },
        { cells: ['Ciudad de San Ramón', 'muchas'], tone: 'seal' },
        { cells: ['Distrito Escolar de Valle Verde', 'una'], tone: 'ok' },
        { cells: ['Distrito de Control de Inundaciones', 'una'], tone: 'ok' },
      ],
    },
    probe: {
      p: 'classify',
      ask: 'Clasifica cada entidad.',
      options: ['Propósito general', 'Propósito especial'],
      items: [
        { label: 'Condado de Valle Verde', answer: 0 },
        { label: 'Ciudad de San Ramón', answer: 0 },
        { label: 'Distrito Escolar de Valle Verde', answer: 1 },
        { label: 'Distrito de Control de Inundaciones', answer: 1 },
      ],
    },
    steps: [
      'La prueba no es el tamaño ni el presupuesto: es <em>cuántas funciones distintas</em> presta.',
      'El condado da seguridad, calles, salud, parques y registro civil. Muchas funciones.',
      'La ciudad de San Ramón, lo mismo a menor escala. También muchas.',
      'El distrito escolar solo educa; el de inundaciones solo drena. Una función cada uno.',
    ],
    answer:
      'Condado y ciudad son de <em>propósito general</em>; los dos distritos, de <em>propósito especial</em>. Los cuatro pueden gravar y recaudar — eso no los distingue.',
  },

  /* ------------------------------------- II · autoridad y rendición */
  'a2-0': {
    title: 'El alcalde quiere gastar $500 000 no presupuestados',
    setup:
      'Tras una tormenta, el alcalde de San Ramón ordena reparar un puente por $500 000. No hay partida presupuestal para eso.',
    viz: {
      v: 'flow',
      nodes: [
        { label: 'El alcalde ordena el gasto', sub: 'rama ejecutiva', tone: 'plain' },
        { label: 'El concejo debe autorizarlo', sub: 'rama legislativa · el presupuesto es ley', tone: 'seal' },
        { label: 'Un tribunal puede revisarlo', sub: 'rama judicial', tone: 'plain' },
        { label: 'El auditor lo revisará el año siguiente', sub: 'y el electorado en la próxima elección', tone: 'plain' },
      ],
    },
    probe: {
      p: 'choice',
      ask: '¿Puede el alcalde ordenar ese gasto por su cuenta?',
      options: [
        'Sí: es una emergencia y él dirige el ejecutivo',
        'No: necesita que el concejo modifique el presupuesto',
        'Sí, pero debe avisar al auditor',
        'Solo si el monto es menor a $1 000 000',
      ],
      answer: 1,
    },
    steps: [
      'En una empresa, un director con autoridad de gasto firma y se ejecuta.',
      'Aquí el presupuesto es una <em>autorización legal</em>: sin partida, el alcalde no puede gastar solo.',
      'El concejo debe aprobar una modificación presupuestal. Esa es la rama legislativa limitando a la ejecutiva.',
      'Y el reporte financiero del año tendrá que <em>demostrar</em> que la modificación existió y se respetó.',
    ],
    answer:
      'El poder está repartido y cada rama limita a la otra. El reporte financiero no solo informa: prueba que se obedeció la ley.',
  },
  'a2-1': {
    title: 'Una subvención con cuatro dueños',
    setup:
      'Valle Verde recibe $3 000 000 del gobierno federal para un programa de vivienda. ¿Ante quién responde por ese dinero?',
    viz: {
      v: 'flow',
      nodes: [
        { label: 'Gobierno federal', sub: 'exige informe de uso y auditoría específica', tone: 'seal' },
        { label: 'Legislatura estatal', sub: 'sus leyes también aplican al condado', tone: 'seal' },
        { label: 'Comisión del condado', sub: 'aprobó aceptar la subvención por ordenanza', tone: 'seal' },
        { label: 'Los residentes', sub: 'que pagan y reciben el servicio', tone: 'seal' },
      ],
    },
    probe: {
      p: 'choice',
      ask: '¿Ante cuántas instancias distintas responde el condado por esos $3 000 000?',
      options: ['Una: el gobierno federal', 'Dos', 'Tres', 'Cuatro'],
      answer: 3,
    },
    steps: [
      'El otorgante federal condiciona el uso: solo vivienda, solo familias de bajos ingresos.',
      'Encima corren las leyes estatales sobre compras y contratación, que no desaparecen.',
      'La comisión del condado tuvo que aprobar formalmente la aceptación.',
      'Y los residentes pueden exigir cuentas por un programa financiado con recursos públicos.',
    ],
    answer:
      'Cuatro capas de restricción sobre un solo monto. Cada una crea un requisito de rendición de cuentas que el reporte tiene que poder demostrar.',
  },
  'a2-2': {
    title: 'Cumplió el presupuesto y aun así falló',
    setup:
      'El departamento de obras de Valle Verde gastó $11 800 000 contra un presupuesto autorizado de $12 000 000. Las calles empeoraron.',
    viz: {
      v: 'split',
      whole: { label: 'Un solo departamento, dos juicios', amount: '$11,8 M' },
      parts: [
        { label: 'Fiscal · ¿gastó dentro de lo aprobado?', amount: 'Sí', tone: 'ok' },
        { label: 'Operativa · ¿usó bien los recursos?', amount: 'No', tone: 'no' },
      ],
    },
    probe: {
      p: 'yesno',
      ask: '¿Cumplió el departamento cada tipo de rendición de cuentas?',
      yes: 'Sí', no: 'No',
      items: [
        { label: 'Fiscal: ¿gastó dentro de lo aprobado?', answer: true },
        { label: 'Operativa: ¿usó bien los recursos?', answer: false },
      ],
    },
    steps: [
      'Pregunta fiscal: ¿se mantuvo dentro de los $12 M autorizados? Sí, por $200 000.',
      'Con eso basta para la rendición de cuentas <em>fiscal</em>: cumplió lo que el público decidió.',
      'Pregunta operativa: ¿el gasto produjo calles en mejor estado? No: el índice de pavimento bajó.',
      'Las dos respuestas son verdaderas al mismo tiempo, y ninguna sustituye a la otra.',
    ],
    answer:
      'Cumplir el presupuesto no prueba que se usaron bien los recursos. Por eso hacen falta dos juegos de estados, uno para cada pregunta.',
  },
  'a2-3': {
    title: 'El año en que alguien más pagó la cuenta',
    setup:
      'En 2024 Valle Verde recaudó $48 000 000 y el costo de los servicios que prestó fue de $52 000 000. La diferencia se cubrió emitiendo deuda.',
    viz: {
      v: 'split',
      whole: { label: 'Costo de los servicios de 2024', amount: '$52 M' },
      parts: [
        { label: 'Pagado por contribuyentes de 2024', amount: '$48 M', tone: 'ok' },
        { label: 'Trasladado a contribuyentes futuros', amount: '$4 M', tone: 'no' },
      ],
    },
    probe: {
      p: 'choice',
      ask: '¿Cuánto del costo de 2024 lo pagarán contribuyentes futuros?',
      options: ['$0', '$4 000 000', '$48 000 000', '$52 000 000'],
      answer: 1,
    },
    steps: [
      'Los residentes de 2024 recibieron servicios por $52 M.',
      'Solo aportaron $48 M. Faltaron $4 M.',
      'Esos $4 M se pagarán con impuestos de años futuros, más intereses.',
      'Quien los pague en 2031 no recibió el servicio de 2024.',
    ],
    answer:
      'Se rompió la <em>equidad entre periodos</em>. Ojo: los activos del condado pueden superar sus pasivos y aun así estar roto — la pregunta es solo si los recursos del año pagaron los servicios del año.',
  },

  /* ---------------------------------------------- III · jurisdicción */
  'a3-0': {
    title: 'Tres cartas en el mismo escritorio',
    setup:
      'La contadora de Valle Verde recibe consultas de tres entidades el mismo día. ¿Qué tablero le toca a cada una?',
    viz: {
      v: 'ledger',
      cols: ['Entidad', 'Tablero'],
      rows: [
        { cells: ['Condado de Valle Verde', 'GASB'], tone: 'seal' },
        { cells: ['Ferretería La Sierra, S.A.', 'FASB'], tone: 'plain' },
        { cells: ['Servicio de Parques Nacionales', 'FASAB'], tone: 'plain' },
      ],
    },
    probe: {
      p: 'classify',
      ask: '¿Qué cuerpo normativo le toca a cada una?',
      options: ['GASB', 'FASB', 'FASAB'],
      items: [
        { label: 'Condado de Valle Verde', answer: 0 },
        { label: 'Ferretería La Sierra, S.A.', answer: 1 },
        { label: 'Servicio de Parques Nacionales', answer: 2 },
      ],
    },
    steps: [
      'La pregunta nunca es qué dice la norma, sino <em>qué naturaleza tiene la entidad</em>.',
      'El condado es un gobierno local. Le toca el GASB.',
      'La ferretería es una empresa. Le toca el FASB.',
      'El Servicio de Parques es una agencia federal. Le toca el FASAB.',
    ],
    answer:
      'Tres entidades, tres tableros, y ninguna puede elegir. La Regla 203 del AICPA designa a los tres cuerpos y la naturaleza de la entidad decide cuál aplica.',
  },
  'a3-1': {
    title: 'De dónde sale el dinero del GASB',
    setup: 'Un residente pregunta si el GASB trabaja para el gobierno. Sigue el hilo del financiamiento.',
    viz: {
      v: 'flow',
      nodes: [
        { label: 'Financial Accounting Foundation', sub: 'nombra a los miembros del GASB y del FASB', tone: 'seal' },
        { label: 'Dodd-Frank (2010)', sub: 'ordenó crear una cuota de apoyo para el GASB', tone: 'plain' },
        { label: 'FINRA la establece en 2012', sub: 'la cobra a las firmas que reportan valores municipales', tone: 'plain' },
        { label: 'Resultado: no depende de ningún gobierno', sub: 'independent standards-setting board in the private sector', tone: 'ok' },
      ],
    },
    probe: {
      p: 'choice',
      ask: '¿De dónde sale el dinero que financia al GASB?',
      options: [
        'Del presupuesto federal',
        'De cuotas voluntarias de los gobiernos que regula',
        'De una cuota sobre operaciones de valores municipales',
        'De la venta de sus publicaciones',
      ],
      answer: 2,
    },
    steps: [
      'El GASB se formó en 1984 y opera bajo la Financial Accounting Foundation, que nombra a sus miembros.',
      'La misma fundación supervisa al FASB. Son cuerpos <em>paralelos</em>, no uno subordinado al otro.',
      'Su dinero viene de una cuota sobre operaciones de valores municipales, no del presupuesto público.',
      'El FASB se financia parecido, con una cuota sobre emisiones corporativas creada por Sarbanes-Oxley.',
    ],
    answer:
      'No trabaja para el gobierno. Al no depender de ninguna organización ni gobierno en particular, se le describe como un cuerpo normativo independiente del sector privado.',
  },
  'a3-2': {
    title: 'Dos hospitales en la misma avenida',
    setup:
      'El Hospital General de Valle Verde lo opera el condado. El Hospital San Lucas es una asociación privada sin fines de lucro. Los dos son NFP.',
    viz: {
      v: 'ledger',
      cols: ['Hospital', 'Naturaleza', 'Tablero'],
      rows: [
        { cells: ['General de Valle Verde', 'gubernamental', 'GASB'], tone: 'seal' },
        { cells: ['San Lucas', 'privado', 'FASB'], tone: 'plain' },
      ],
    },
    probe: {
      p: 'classify',
      ask: 'Los dos son sin fines de lucro. ¿Qué tablero sigue cada uno?',
      options: ['GASB', 'FASB'],
      items: [
        { label: 'Hospital General de Valle Verde (lo opera el condado)', answer: 0 },
        { label: 'Hospital San Lucas (asociación privada)', answer: 1 },
      ],
    },
    steps: [
      'Los dos son sin fines de lucro, así que «ser NFP» no decide nada por sí solo.',
      'El General lo opera el condado: es una NFP <em>gubernamental</em>.',
      'San Lucas es independiente de cualquier gobierno: es una NFP privada.',
      'Ninguno de los dos consejos directivos puede votar para cambiar de tablero.',
    ],
    answer:
      'El General sigue al GASB y San Lucas al FASB. La autoridad sobre las NFP está partida, y lo que decide es si la entidad es gubernamental — no lo que prefiera su administración.',
  },
  'a3-3': {
    title: 'Quién paga por las normas que sigues',
    setup:
      'Valle Verde emite bonos municipales por $20 000 000. Una casa de bolsa reporta las operaciones al MSRB.',
    viz: {
      v: 'flow',
      nodes: [
        { label: 'El condado emite bonos municipales', sub: '$20 000 000', tone: 'plain' },
        { label: 'Las firmas reportan las operaciones', sub: 'al Municipal Securities Rule-Making Board', tone: 'plain' },
        { label: 'FINRA les cobra la cuota de apoyo', sub: 'establecida en febrero de 2012', tone: 'seal' },
        { label: 'Con eso se financia el GASB', sub: 'que fija las normas que el condado debe seguir', tone: 'ok' },
      ],
    },
    probe: {
      p: 'choice',
      ask: '¿Quién paga la cuota que sostiene al GASB?',
      options: [
        'El condado que emite los bonos',
        'Las firmas que reportan operaciones de valores municipales',
        'Los compradores de los bonos',
        'La Financial Accounting Foundation',
      ],
      answer: 1,
    },
    steps: [
      'La Dodd-Frank de 2010 ordenó crear una cuota de apoyo contable para el GASB.',
      'FINRA la estableció en febrero de 2012 y la cobra a las firmas que reportan operaciones de valores municipales.',
      'Así el GASB no depende de cuotas voluntarias de los gobiernos que regula.',
      'El FASB se sostiene igual, con la cuota sobre emisiones corporativas de Sarbanes-Oxley.',
    ],
    answer:
      'El mercado de bonos municipales financia al normador. Esa independencia de recursos es la razón de que a ambos se les llame boards independientes del sector privado.',
  },

  /* --------------------------------------------------- IV · el ACFR */
  'a4-0': {
    title: 'Dos ciudades, dos publicaciones',
    setup:
      'San Ramón publica solo lo mínimo obligatorio. Valle Verde publica su informe anual completo. Las dos cumplen la norma.',
    viz: {
      v: 'ledger',
      cols: ['Contenido', 'Mínimo', 'Informe completo'],
      rows: [
        { cells: ['MD&A', 'Sí', 'Sí'], tone: 'seal' },
        { cells: ['Estados básicos y notas', 'Sí', 'Sí'], tone: 'seal' },
        { cells: ['RSI distinta del MD&A', 'Sí', 'Sí'], tone: 'seal' },
        { cells: ['Carta de transmisión', 'No', 'Sí'] },
        { cells: ['Informe del auditor', 'No', 'Sí'] },
        { cells: ['Sección estadística', 'No', 'Sí'] },
      ],
    },
    probe: {
      p: 'yesno',
      ask: '¿Cada pieza forma parte del mínimo obligatorio?',
      yes: 'Sí', no: 'No',
      items: [
        { label: 'MD&A', answer: true },
        { label: 'Estados financieros básicos y notas', answer: true },
        { label: 'Carta de transmisión', answer: false },
        { label: 'Sección estadística', answer: false },
      ],
    },
    steps: [
      'El mínimo obligatorio lo fija el GASB y es corto: MD&A, estados básicos con notas, y RSI.',
      'El informe anual completo <em>no es obligatorio</em>, pero casi todos lo preparan como registro público.',
      'Todo lo que trae el mínimo está también dentro del informe completo.',
      'San Ramón cumple la norma publicando menos. No está incumpliendo nada.',
    ],
    answer:
      'El mínimo vive <em>dentro</em> del informe completo. Confundir uno con otro es el error más común del capítulo: uno es obligatorio y pequeño, el otro voluntario y grande.',
  },
  'a4-1': {
    title: 'La lista de verificación del contador',
    setup:
      'La contadora de San Ramón arma el paquete mínimo. Va tachando lo que la norma exige.',
    viz: {
      v: 'ledger',
      cols: ['Pieza', '¿Obligatoria?'],
      rows: [
        { cells: ['MD&A', 'Sí · es RSI'], tone: 'ok' },
        { cells: ['Estados de todo el gobierno', 'Sí'], tone: 'ok' },
        { cells: ['Estados por fondos', 'Sí'], tone: 'ok' },
        { cells: ['Notas a los estados', 'Sí · parte integral'], tone: 'ok' },
        { cells: ['Otra RSI distinta del MD&A', 'Sí'], tone: 'ok' },
        { cells: ['Combining statements', 'No'], tone: 'no' },
      ],
    },
    probe: {
      p: 'yesno',
      ask: '¿Cuáles exige el mínimo?',
      yes: 'Exigida', no: 'No exigida',
      items: [
        { label: 'Estados por fondos', answer: true },
        { label: 'Notas a los estados financieros', answer: true },
        { label: 'Otra RSI distinta del MD&A', answer: true },
        { label: 'Combining and individual fund statements', answer: false },
      ],
    },
    steps: [
      'El MD&A abre el paquete: narrativa legible sobre los estados y el año frente al anterior.',
      'Los estados básicos son <em>dos categorías</em>, no una: de todo el gobierno y por fondos.',
      'Las notas no son un anexo opcional: son <em>parte integral</em> de los estados.',
      'Los combining statements dan detalle de fondos no mayores, pero van más allá del mínimo.',
    ],
    answer:
      'El paquete mínimo son cuatro piezas: MD&A, estados básicos (de todo el gobierno y por fondos), notas y RSI distinta del MD&A. Nada más.',
  },
  'a4-2': {
    title: 'Tres documentos buscando su sección',
    setup:
      'Sobre el escritorio hay tres piezas del informe de Valle Verde. ¿En qué sección va cada una?',
    viz: {
      v: 'ledger',
      cols: ['Documento', 'Sección'],
      rows: [
        { cells: ['Carta del director financiero a la comisión', 'Introductoria'], tone: 'seal' },
        { cells: ['Opinión del auditor independiente', 'Financiera'], tone: 'ok' },
        { cells: ['Tabla de deuda por habitante, 10 años', 'Estadística'], tone: 'plain' },
      ],
    },
    probe: {
      p: 'classify',
      ask: '¿En qué sección va cada documento?',
      options: ['Introductoria', 'Financiera', 'Estadística'],
      items: [
        { label: 'Carta del director financiero a la comisión', answer: 0 },
        { label: 'Opinión del auditor independiente', answer: 1 },
        { label: 'Tabla de deuda por habitante, 10 años', answer: 2 },
      ],
    },
    steps: [
      'La carta de transmisión suena financiera, pero es de presentación: va en la <em>introductoria</em>.',
      'La opinión del auditor sí es financiera, y encabeza esa sección.',
      'La tabla de diez años es una tendencia, no un estado: va en la <em>estadística</em>.',
      'De estas tres, solo la opinión del auditor está en la sección que contiene el mínimo obligatorio — pero ella misma no forma parte del mínimo.',
    ],
    answer:
      'Introductoria, financiera y estadística. La carta de transmisión es la que más se coloca mal, justamente porque suena a algo financiero.',
  },
  'a4-3': {
    title: 'Dos informes del mismo condado',
    setup:
      'En el archivo de Valle Verde hay un informe de 2018 y otro de 2024. Las portadas no dicen lo mismo.',
    viz: {
      v: 'ledger',
      cols: ['Año', 'Título en la portada', 'Contenido'],
      rows: [
        { cells: ['2018', 'Comprehensive Annual Financial Report', 'tres secciones'], tone: 'plain' },
        { cells: ['2024', 'Annual Comprehensive Financial Report', 'tres secciones'], tone: 'seal' },
      ],
    },
    probe: {
      p: 'choice',
      ask: '¿Qué cambió entre el informe de 2018 y el de 2024?',
      options: [
        'Se añadió la sección estadística',
        'Solo el nombre: CAFR pasó a ACFR',
        'El informe se volvió obligatorio',
        'Cambió la base contable',
      ],
      answer: 1,
    },
    steps: [
      'Las palabras están en distinto orden: <em>comprehensive annual</em> contra <em>annual comprehensive</em>.',
      'El cambio viene del <em>Statement No. 98</em> del GASB, emitido en 2021.',
      'La razón no fue técnica: la sigla anterior se pronuncia como un insulto racial en inglés sudafricano.',
      'El contenido no cambió: las mismas tres secciones, el mismo mínimo adentro.',
    ],
    answer:
      'Es el mismo documento con otro nombre. Reconoce los dos términos: tu libro de 2019 dice CAFR y todo el material actual dice ACFR.',
  },
  'a4-4': {
    title: 'Un condado, dos cifras de resultado',
    setup:
      'Valle Verde cierra 2024. El estado por fondos y el de todo el gobierno reportan cifras distintas para el mismo año.',
    viz: {
      v: 'ledger',
      cols: ['Estado', 'Resultado del año', 'Responde por'],
      rows: [
        { cells: ['Por fondos gubernamentales', '+$1,2 M', 'rendición fiscal'], tone: 'seal' },
        { cells: ['De todo el gobierno', '−$3,4 M', 'rendición operativa'], tone: 'plain' },
      ],
    },
    probe: {
      p: 'choice',
      ask: 'Una dice +$1,2 M y la otra −$3,4 M. ¿Cuál está mal?',
      options: ['La de fondos', 'La de todo el gobierno', 'Ninguna: miden cosas distintas', 'Las dos'],
      answer: 2,
    },
    steps: [
      'Abajo se miden solo recursos financieros corrientes: entró más efectivo del que salió, +$1,2 M.',
      'Arriba se miden todos los recursos: se reconoció depreciación y el aumento de la deuda de pensiones.',
      'Ninguna de las dos está mal. Miden cosas distintas con enfoques distintos.',
      'Por eso el GASB obliga a conciliar las dos cifras: la diferencia debe poder explicarse línea por línea.',
    ],
    answer:
      'Dos juegos de estados porque hay dos preguntas. El fondo dice si cumplió el año; el de todo el gobierno, si el condado está mejor o peor que antes.',
  },
}
