/**
 * Nivel 1 · Introducción: por qué existe la norma, por qué el avión cambia el
 * riesgo, el vocabulario y quién responde por qué.
 *
 * La cita manda de lo mundial a lo nacional: Anexo 18 y Doc 9284 de la OACI,
 * LAR 175 del SRVSOP (Primera edición, Enmienda 4, diciembre 2017) y, como
 * ejemplo de adopción nacional, el RAC 175 de Colombia (Edición original,
 * marzo 2016). Cada equivalencia se contrastó contra los dos textos: el
 * literal no siempre lleva la misma letra en una norma y en la otra. El caso
 * real sale del informe de la NTSB y se cita como tal.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const NIVEL_1: DocScreen[] = [
  // ── 01 ──────────────────────────────────────────────────────────────────
  {
    n: 1,
    title: "El vuelo 592",
    kicker: "Por qué existe la norma",
    minutes: 7,
    blocks: [
      {
        kind: "casoReal",
        titulo: "ValuJet 592",
        fecha: "11 de mayo de 1996",
        lugar: "Everglades, Florida",
        aeronave: "DC-9-32 · N904VJ · Miami a Atlanta",
        mercancia:
          "Generadores químicos de oxígeno retirados de dos MD-80, sin las tapas de seguridad, declarados como material de la compañía y marcados como vacíos.",
        queOcurrio: [
          "Seis minutos después de despegar de Miami la tripulación reportó humo en cabina. El avión cayó en los Everglades. Murieron las 110 personas a bordo: 2 pilotos, 3 auxiliares y 105 pasajeros.",
          "En la bodega delantera, de clase D, iban unos 144 generadores químicos de oxígeno. Un generador de esos produce oxígeno con una reacción que calienta el cilindro a varios cientos de grados. No llevaban las tapas que impiden que se activen por golpe, iban sueltos en cajas de cartón, encima de unas llantas y sin sujeción.",
          "En el manifiesto figuraban como «Oxy Canisters, Empty». No estaban vacíos. Viajaron como material de la compañía, no como mercancía peligrosa.",
        ],
        consecuencia:
          "La NTSB atribuyó el accidente a un incendio en la bodega iniciado por la activación de uno o más generadores. Señaló tres fallas: el taller que no identificó ni embaló bien los generadores, la aerolínea que no vigiló a su contratista y la autoridad, que no exigía detección ni extinción de incendios en las bodegas de clase D.",
        leccion:
          "La cadena falló en tres eslabones y los tres tienen nombre en la norma: el expedidor que no identifica ni embala (LAR 175.215 y 175.410), el explotador que no vigila ni capacita (LAR 175.220 y Capítulo D) y una regla de diseño que la autoridad no había cerrado. El comandante firmó un manifiesto que decía otra cosa. Este módulo trata de por qué esa firma tuya importa.",
        cita: {
          texto:
            "…the failure of SabreTech to properly prepare, package, and identify unexpended chemical oxygen generators before presenting them to ValuJet for carriage…",
          de: "NTSB, causa probable, informe AAR-97/06",
        },
        fuente: "NTSB, Aircraft Accident Report NTSB/AAR-97/06 (1997).",
        hueco: {
          id: "MP-IMG-01",
          medida: "16:9 · 1600×900 · JPG o WebP",
          descripcion:
            "Un generador químico de oxígeno de aviación, con su tapa de seguridad a la vista, o una foto del DC-9 de ValuJet con crédito. Mejor el objeto que el accidente: es la imagen que abre el módulo.",
        },
      },
      {
        kind: "p",
        text: "Lo primero que hay que fijar no es la lista de sustancias. Es la definición, porque de ella sale todo lo demás.",
      },
      {
        kind: "norma",
        oaci: "Anexo 18",
        ref: "LAR 175.001 (a)",
        rac: "RAC 175.001 (a) (31)",
        titulo: "Mercancías peligrosas",
        texto:
          "Todo objeto o sustancia que pueda constituir un riesgo para la salud, la seguridad, los bienes o el medio ambiente y que figure en la lista de mercancías peligrosas de las Instrucciones Técnicas o esté clasificado conforme a dichas Instrucciones.",
      },
      {
        kind: "p",
        text: "Fíjate en las dos mitades: **riesgo** y **estar en la lista o ser clasificable**. Un artículo no es mercancía peligrosa porque lo parezca. Lo es porque encaja en los criterios de clasificación de las Instrucciones Técnicas. La lista es la Tabla 3-1 de las Instrucciones; lo que no está en la lista se clasifica con los mismos criterios (Parte 2 de las Instrucciones, según el LAR 175.415).",
      },
      {
        kind: "definicion",
        text: "Los generadores de ValuJet no dejaban de ser mercancía peligrosa por llamarse «canisters» ni por ir marcados como vacíos. Lo que cuenta es lo que la sustancia hace, no lo que dice la caja.",
      },
      { kind: "sub", text: "De dónde viene la obligación" },
      { kind: "p", text: "Cuatro documentos, uno dentro del otro. Toca cada eslabón." },
      {
        kind: "flujo",
        pista: "Elige un eslabón para leer qué aporta.",
        pasos: [
          {
            clave: "anexo18",
            etiqueta: "Anexo 18",
            sub: "Convenio de Chicago",
            texto:
              "La norma internacional: transporte sin riesgos de mercancías peligrosas por vía aérea. Todo Estado miembro de la OACI se obliga a cumplir los Anexos técnicos del Convenio de Chicago. De aquí sale todo lo demás.",
          },
          {
            clave: "doc9284",
            etiqueta: "Doc 9284",
            sub: "Instrucciones Técnicas",
            texto:
              "El detalle operativo: la lista de mercancías, el embalaje, las marcas y etiquetas, la segregación y la información al piloto al mando. Se reedita cada dos años. Las normas de la región la llaman «Instrucciones Técnicas» y remiten a su última versión publicada (LAR 175.001 (a)).",
          },
          {
            clave: "lar175",
            etiqueta: "LAR 175",
            sub: "SRVSOP · la región",
            texto:
              "El reglamento armonizado que el Sistema Regional de Cooperación para la Vigilancia de la Seguridad Operacional elaboró con fundamento en el Anexo 18 y propuso a sus Estados miembros. Es la norma que este módulo cita: su articulado, 175.001 a 175.715, es el que reconocerás en el reglamento de tu país.",
          },
          {
            clave: "nacional",
            etiqueta: "Tu reglamento",
            sub: "Cada Estado publica el suyo",
            texto:
              "Cada autoridad de aviación civil adopta el LAR 175 en su propia norma y le pone su nombre y su numeración. En Colombia es el RAC 175, adoptado por la Resolución 00478 de 2016. Esa es la que te aplica a ti, y aplica a vuelos internos e internacionales por igual: busca la tuya y ten a mano su número de artículo.",
          },
        ],
      },
      {
        kind: "hueco",
        rotulo: "MP-ILU-01 · Ilustración · 16:9 · 1600×900 · SVG o PNG",
        descripcion:
          "Las cuatro capas anidadas, Anexo 18 → Doc 9284 → LAR 175 → reglamento nacional, como anillos concéntricos en el estilo isométrico de Aviatory. El anillo exterior con varias siglas de la región (RAC, RAP, RDAC, RAB, DAN) para que se vea que la última capa cambia según el país. Sin texto pequeño.",
        alto: 300,
      },
      {
        kind: "callout",
        tone: "info",
        title: "El reglamento fija el qué; las Instrucciones, el cómo",
        text: "El LAR 175, y con él el reglamento de tu país, remite a las Instrucciones Técnicas casi en cada artículo. Cuando te pregunten dónde está la lista, cuánto puede llevar un pasajero o cómo se separa un bulto de otro, la respuesta detallada está en el Doc 9284; el reglamento es el que te obliga a aplicarlo (LAR 175.005 (b)).",
      },
      {
        kind: "enLaOperacion",
        momento: "En la rampa",
        texto:
          "Sube un bulto a tu avión con una etiqueta que no reconoces. La pregunta no es «¿parece peligroso?». Es «¿está clasificado, documentado y aceptado conforme a las Instrucciones?». Si nadie te lo puede decir, ese bulto no ha pasado por la cadena que este módulo describe.",
      },
      {
        kind: "ponAPrueba",
        preguntas: [
          {
            q: "Un explotador vuela solo rutas nacionales dentro de su país. ¿Le aplica el Doc 9284 de la OACI?",
            ref: "LAR 175.005 (b)",
            opciones: [
              {
                t: "Sí. El reglamento adopta las Instrucciones Técnicas y aplica a vuelos internos e internacionales.",
                ok: true,
                fb: "El LAR 175.005 (b) lo dice sin distinguir el tipo de vuelo: cualquier aeronave civil con origen, destino, tránsito o sobrevuelo en el territorio nacional. El RAC 175.016 de Colombia lo repite y añade que aplica por igual a matrícula nacional o extranjera y a operador nacional o extranjero.",
              },
              {
                t: "No. Las Instrucciones Técnicas solo rigen el transporte internacional.",
                fb: "Es la trampa clásica. El LAR 175.005 (b) exige cumplir las Instrucciones Técnicas en cualquier aeronave civil con origen, destino, tránsito o sobrevuelo en el territorio nacional, sin distinguir el tipo de vuelo.",
              },
              {
                t: "Solo si transporta carga; si es de pasajeros, no.",
                fb: "El reglamento aplica también al explotador que no acepta mercancías peligrosas: el LAR 175.305 (b) le exige programas de instrucción tenga o no autorización para transportarlas, justamente para que no entren sin declarar.",
              },
            ],
          },
          {
            q: "Una caja marcada «vacía» contiene generadores de oxígeno sin gastar. ¿Es mercancía peligrosa?",
            ref: "LAR 175.001 (a)",
            opciones: [
              {
                t: "No, porque el manifiesto dice que está vacía.",
                fb: "La definición no mira el manifiesto: mira si el objeto puede constituir un riesgo y si está en la lista o es clasificable. Un generador sin gastar lo está. Marcarlo como vacío es exactamente lo que pasó en ValuJet.",
              },
              {
                t: "Sí: lo que la clasifica es lo que contiene y lo que puede hacer, no lo que dice la caja.",
                ok: true,
                fb: "La definición del LAR 175.001 (a) tiene dos mitades, riesgo y estar en la lista o ser clasificable conforme a las Instrucciones, y los generadores sin gastar cumplen las dos.",
              },
              {
                t: "Solo si el expedidor la declara como tal.",
                fb: "La declaración es una obligación del expedidor (LAR 175.215 (a)), no la condición para que algo sea mercancía peligrosa. Si no la declara, sigue siéndolo, y además pasa a ser mercancía peligrosa oculta (LAR 175.001 (a)).",
              },
            ],
          },
        ],
      },
      {
        kind: "summary",
        items: [
          "Mercancía peligrosa = riesgo + estar en la lista o ser clasificable (LAR 175.001 (a)).",
          "La cadena: Anexo 18 → Doc 9284 (Instrucciones Técnicas) → LAR 175 del SRVSOP → el reglamento de tu país.",
          "El reglamento aplica a vuelos internos e internacionales por igual (LAR 175.005 (b)).",
          "ValuJet 592: tres fallas, tres artículos. La firma del comandante era el último control y firmó lo que decía la caja.",
        ],
      },
    ],
  },

  // ── 02 ──────────────────────────────────────────────────────────────────
  {
    n: 2,
    title: "¿Por qué es peligroso en un avión?",
    kicker: "La física del vuelo",
    minutes: 6,
    blocks: [
      {
        kind: "p",
        text: "Una lata de aerosol no es un problema en una estantería. Un power bank tampoco. Lo que los convierte en un problema es el sitio donde van a pasar las próximas horas: un tubo presurizado, con vibración, cambios de temperatura y nadie que pueda salir a apagar un incendio.",
      },
      {
        kind: "norma",
        oaci: "Instrucciones Técnicas, Partes 4 y 6",
        ref: "LAR 175.420 (c)",
        rac: "RAC 175.420 (b)",
        texto:
          "Los embalajes utilizados para el transporte de mercancías peligrosas por vía aérea serán de buena calidad y estarán construidos y cerrados de modo seguro, para evitar pérdidas que podrían originarse en las condiciones normales de transporte, debido a cambios de temperatura, humedad o presión, o a la vibración.",
      },
      {
        kind: "p",
        text: "Ese artículo nombra los enemigos. El reglamento no los explica porque da por sentado que los conoces. Aquí van.",
      },
      {
        kind: "rejilla",
        items: [
          {
            titulo: "Presión",
            desc: "La cabina y las bodegas vuelan a una presión menor que la del suelo. Un recipiente cerrado a nivel del mar queda con presión hacia afuera: lo que estaba justo se abre, y la fuga pequeña se agranda.",
          },
          {
            titulo: "Temperatura",
            desc: "Entre la plataforma y el crucero hay decenas de grados de diferencia. Un líquido inflamable que se calienta despide más vapor; un peróxido que se calienta se descompone.",
          },
          {
            titulo: "Vibración",
            desc: "Horas de vibración aflojan tapas, rozan embalajes entre sí y rompen frascos interiores. Por eso el 175.420 (e) exige acolchar y sujetar los embalajes interiores.",
          },
          {
            titulo: "Tiempo y aislamiento",
            desc: "En tierra un derrame se atiende en minutos. En crucero el aeródromo más cercano puede estar a más de una hora. Lo que pase lo resuelve la tripulación con lo que ya está a bordo.",
          },
        ],
        nota: "MP-ICO-01 a MP-ICO-04 · Iconos de línea · 96×96 · SVG monocromo: manómetro, termómetro, ondas de vibración, reloj con avión.",
      },
      { kind: "sub", text: "Lo que no hay a bordo" },
      {
        kind: "p",
        text: "En un avión no hay bomberos, no hay ducha de emergencia, no hay dónde aislar un bulto y no se puede abrir una ventana. El equipo mínimo de respuesta que exige el reglamento cabe en una bolsa: bolsas grandes de polietileno, ligaduras y guantes largos de goma (175.620). Con eso, con el extintor de mano y con el procedimiento del explotador se atiende lo que ocurra hasta aterrizar.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "El caso de las bodegas clase D",
        text: "En ValuJet 592 la bodega delantera no tenía detección ni extinción de incendios. La tripulación se enteró del fuego cuando el humo llegó a la cabina, y para entonces llevaba minutos ardiendo. Después del accidente la FAA exigió detección y supresión en esas bodegas. Es la razón por la que hoy la bodega de tu avión avisa. Fuente: NTSB AAR-97/06.",
      },
      {
        kind: "definicion",
        text: "El riesgo de una mercancía peligrosa en aviación no es solo lo que la sustancia hace. Es lo que hace bajo presión, temperatura y vibración, durante horas, sin ayuda exterior. Cada regla de embalaje, cantidad y estiba que vas a ver existe por eso.",
      },
      {
        kind: "enLaOperacion",
        momento: "Antes de la salida",
        texto:
          "Cuando en la información al piloto al mando veas un envío de líquido inflamable en la bodega trasera, no lo leas como «pintura». Léelo como vapores inflamables, en un espacio cerrado, con una diferencia de presión que crece durante el ascenso, durante tres horas. Con esa lectura se entienden todas las limitaciones de cantidad que vienen después.",
      },
      {
        kind: "ponAPrueba",
        preguntas: [
          {
            q: "¿Por qué el reglamento exige que los embalajes resistan cambios de presión, y no solo golpes?",
            ref: "LAR 175.420 (c) y (f)",
            opciones: [
              {
                t: "Porque en vuelo la presión ambiente baja y un recipiente cerrado en tierra queda con presión hacia afuera.",
                ok: true,
                fb: "El 175.420 (b) nombra expresamente los cambios de temperatura, humedad o presión y la vibración como las condiciones normales del transporte aéreo que el embalaje tiene que aguantar.",
              },
              {
                t: "Porque las bodegas no están presurizadas.",
                fb: "En los aviones presurizados las bodegas también lo están, pero a la altitud de cabina, que es menor que la presión del suelo. La diferencia sigue existiendo.",
              },
              {
                t: "Porque los golpes no importan en el transporte aéreo.",
                fb: "Importan, y por eso el mismo artículo exige acolchar y sujetar los embalajes interiores (175.420 (e)). Lo que añade el vuelo es presión, temperatura y vibración sostenida.",
              },
            ],
          },
        ],
      },
    ],
  },

  // ── 03 ──────────────────────────────────────────────────────────────────
  {
    n: 3,
    title: "El vocabulario que te van a preguntar",
    kicker: "Doce términos y tres permisos",
    minutes: 7,
    blocks: [
      {
        kind: "p",
        text: "Las preguntas de entrevista sobre mercancías peligrosas casi siempre empiezan por una definición. No porque haya que recitarla: porque con el término mal entendido, la respuesta que sigue sale mal. Estas doce son las del LAR 175.001 (a), tal cual. El reglamento de tu país las repite casi palabra por palabra, aunque las numere: el LAR las ordena alfabéticamente y no las numera.",
      },
      {
        kind: "fichas",
        columnas: 3,
        items: [
          {
            titulo: "Bulto",
            ref: "LAR 175.001 (a)",
            puntos: [
              "El producto final de la operación de empacado: el embalaje en sí y su contenido, preparado para el transporte.",
            ],
          },
          {
            titulo: "Embalaje",
            ref: "LAR 175.001 (a)",
            puntos: [
              "Los recipientes y demás componentes o materiales necesarios para que el recipiente sea idóneo a su función de contención.",
            ],
          },
          {
            titulo: "Sobre-embalaje externo",
            ref: "LAR 175.001 (a)",
            puntos: [
              "Embalaje de un expedidor único que contiene uno o más bultos y forma una unidad para manipular y estibar.",
            ],
          },
          {
            titulo: "Dispositivo de carga unitarizada (ULD)",
            ref: "LAR 175.001 (a)",
            puntos: [
              "Contenedor de carga, contenedor de aeronave, paleta con red o paleta con red sobre un iglú.",
              "No incluye los sobre-embalajes.",
            ],
          },
          {
            titulo: "Envío",
            ref: "LAR 175.001 (a)",
            puntos: [
              "Uno o más bultos que un explotador acepta de un expedidor de una sola vez, en un mismo sitio, para un mismo consignatario y dirección.",
            ],
          },
          {
            titulo: "Expedidor",
            ref: "LAR 175.001 (a)",
            puntos: ["Toda persona que, en su nombre o en nombre de una organización, envía la mercancía."],
          },
          {
            titulo: "Número de la ONU",
            ref: "LAR 175.001 (a)",
            puntos: [
              "Cuatro dígitos asignados por el Comité de expertos de las Naciones Unidas para reconocer una sustancia o un grupo de ellas.",
            ],
          },
          {
            titulo: "COMAT y COMAT peligroso",
            ref: "LAR 175.001 (a)",
            puntos: [
              "COMAT: propiedad del explotador que viaja en su propio provecho, que no es requisito de operación ni de aeronavegabilidad para ese vuelo y no se vende ni se usa en él.",
              "COMAT peligroso: COMAT clasificado como mercancía peligrosa.",
            ],
          },
          {
            titulo: "Declaración del expedidor",
            ref: "LAR 175.001 (a)",
            puntos: [
              "Documento firmado por persona idónea: las mercancías están descritas por su nombre apropiado, clasificadas, empacadas, marcadas, etiquetadas y en condiciones de volar conforme a las Instrucciones.",
            ],
          },
          {
            titulo: "Incompatible",
            ref: "LAR 175.001 (a)",
            puntos: [
              "Mercancías que, de mezclarse, podrían generar peligrosamente calor o gases, o producir una sustancia corrosiva.",
            ],
          },
          {
            titulo: "Mercancía peligrosa oculta",
            ref: "LAR 175.001 (a)",
            puntos: [
              "Carga declarada con descripción general que debió declararse como peligrosa; o mercancía prohibida o en exceso en el equipaje, en la persona del pasajero o tripulante, o en el correo.",
            ],
          },
          {
            titulo: "Piloto al mando",
            ref: "LAR 175.001 (a)",
            puntos: ["El comandante: responsable de la operación y seguridad de la aeronave durante el tiempo de vuelo."],
          },
        ],
      },
      {
        kind: "enLaOperacion",
        momento: "El gancho de esta lección",
        texto:
          "En ValuJet los generadores de oxígeno viajaron como material de la compañía: COMAT. Un repuesto de la aerolínea que va en tu avión no deja de ser mercancía peligrosa por ser de la casa. Si está clasificado como tal, es COMAT peligroso y sigue todas las reglas (el LAR 175.020 (b) nombra el COMAT peligroso entre las mercancías que la autoridad puede autorizar por aprobación específica a un explotador que no tiene autorización general).",
      },
      { kind: "sub", text: "Tres permisos que se confunden" },
      {
        kind: "fichas",
        columnas: 3,
        items: [
          {
            titulo: "Aprobación",
            ref: "LAR 175.001 (a)",
            puntos: [
              "La otorga la autoridad de aviación civil (AAC) de tu país.",
              "Permite transportar mercancías prohibidas en aeronaves de pasajeros o de carga cuando las Instrucciones Técnicas dicen que pueden ir con aprobación.",
              "La pide quien va a expedir, ante la autoridad del Estado que corresponda según el caso.",
              "Si las Instrucciones no prevén aprobación para ese caso, se pide dispensa.",
            ],
          },
          {
            titulo: "Dispensa",
            ref: "LAR 175.001 (a)",
            puntos: [
              "Toda autorización que no sea una aprobación, otorgada por la autoridad nacional que corresponda, que exime de lo previsto en las Instrucciones Técnicas.",
              "Procede por extrema urgencia, cuando otro modo de transporte no es apropiado o cuando cumplir todo sería contrario al interés público (LAR 175.020 (e)).",
              "Nunca para mercancías prohibidas en todas las circunstancias.",
            ],
          },
          {
            titulo: "Excepción",
            ref: "LAR 175.001 (a)",
            puntos: [
              "No es un permiso: es una disposición de la norma que excluye a un artículo de las condiciones que normalmente le aplicarían.",
              "Ejemplo: lo que la aeronave lleva por exigencia de aeronavegabilidad o de operación (175.145 (a)).",
              "No requiere trámite ante la autoridad.",
            ],
          },
        ],
      },
      {
        kind: "definicion",
        text: "La aprobación y la dispensa se piden. La excepción ya está escrita en la norma.",
      },
      {
        kind: "ponAPrueba",
        preguntas: [
          {
            q: "Vas a llevar en tu vuelo una caja de repuestos de la propia aerolínea que contiene un acumulador. ¿Cómo se llama eso en el reglamento?",
            ref: "LAR 175.001 (a)",
            opciones: [
              {
                t: "COMAT peligroso.",
                ok: true,
                fb: "Es propiedad del explotador transportada en su propio provecho, no exigida por la operación ni la aeronavegabilidad de ese vuelo, y está clasificada como mercancía peligrosa.",
              },
              {
                t: "Carga exceptuada del operador.",
                fb: "La excepción del 175.145 (a) cubre lo que hay que llevar a bordo por requisitos de aeronavegabilidad o de operación. Un repuesto que viaja para el negocio del explotador, no para ese vuelo, es COMAT. Y el 175.145 (b) dice que los repuestos de esos objetos se transportan conforme a las Instrucciones.",
              },
              {
                t: "Equipaje de la tripulación.",
                fb: "El equipaje de tripulación se rige por el Capítulo H (175.705 y 175.715) y solo admite lo que las Instrucciones Técnicas permiten a pasajeros y tripulantes.",
              },
            ],
          },
          {
            q: "Un explotador necesita transportar algo que las Instrucciones Técnicas no prevén ni con aprobación. ¿Qué pide?",
            ref: "LAR 175.001 (a) y 175.020",
            opciones: [
              {
                t: "Una excepción.",
                fb: "La excepción no se pide: ya está escrita en la norma (175.001 (a) (20)). Si el caso no está previsto, no hay excepción que invocar.",
              },
              {
                t: "Una dispensa.",
                ok: true,
                fb: "La nota del 175.001 (a) (4) es literal: si no hay referencia específica en las Instrucciones Técnicas para otorgar una aprobación, se puede pedir una dispensa. La otorga la Secretaría de Seguridad Aérea y nunca para lo prohibido en todas las circunstancias (175.020 (g)).",
              },
              {
                t: "Una aprobación.",
                fb: "La aprobación solo existe cuando las Instrucciones Técnicas dicen que ese caso puede transportarse con aprobación. Si no lo dicen, el camino es la dispensa.",
              },
            ],
          },
        ],
      },
    ],
  },

  // ── 04 ──────────────────────────────────────────────────────────────────
  {
    n: 4,
    title: "Quién responde por qué",
    kicker: "La cadena de responsabilidad",
    minutes: 7,
    blocks: [
      {
        kind: "p",
        text: "Cuando un bulto llega a tu avión ya pasó por varias manos. Cada una tiene obligaciones escritas, y ninguna borra las de la anterior. Esta es la cadena, con el artículo de cada eslabón.",
      },
      {
        kind: "hueco",
        rotulo: "MP-FLJ-01 · Flujograma · 21:9 · 2000×860 · SVG",
        descripcion:
          "Cadena horizontal: Expedidor → Agente de carga → Terminal de carga → Explotador (aceptación) → Estiba → Comandante → Destino. Un nodo por actor con su artículo del LAR 175 y una marca donde la responsabilidad cambia de manos.",
        alto: 260,
      },
      {
        kind: "fichas",
        columnas: 3,
        items: [
          {
            titulo: "Expedidor",
            ref: "LAR 175.215 y 175.410",
            puntos: [
              "Identifica exactamente las mercancías peligrosas que ofrece.",
              "Es el responsable de la identificación y la clasificación.",
              "Las entrega clasificadas, documentadas, certificadas, descritas, embaladas, marcadas y etiquetadas.",
              "Posee y usa las Instrucciones Técnicas o un manual equivalente.",
              "Conserva los archivos por mínimo 18 meses.",
            ],
          },
          {
            titulo: "Explotador",
            ref: "LAR 175.220",
            puntos: [
              "Solo acepta mercancías peligrosas si tiene la autorización en sus OpSpecs (175.020 (a)).",
              "Su manual de operaciones dice si acepta o rechaza carga con mercancías peligrosas.",
              "Si no las acepta, tiene procedimientos para que no entren sin declarar.",
              "Programa de instrucción aprobado por la AAC.",
              "Responde por que sus agentes acreditados cumplan sus procedimientos.",
            ],
          },
          {
            titulo: "Operador de terminal de carga",
            ref: "LAR 175.225",
            puntos: [
              "Área especial de almacenamiento con acceso libre para los vehículos de salvamento y extinción.",
              "Cuadros de etiquetas y tabla de segregación visibles y actualizados.",
              "Procedimientos ante sucesos, con los teléfonos de la AAC y demás autoridades vinculadas a la vigilancia sanitaria, radiactiva y química.",
              "Conserva los documentos tres meses.",
            ],
          },
          {
            titulo: "Operador de aeródromo",
            ref: "LAR 175.005 (a) (6)",
            nota: "El LAR 175 lo alcanza pero no le dedica sección de obligaciones: se las fija tu reglamento nacional. En Colombia, el RAC 175.227 y 175.228.",
            puntos: [
              "Programa de manejo de mercancías peligrosas del aeródromo.",
              "Capacita a su personal según la tabla de intensidad de su reglamento.",
              "Manual de manejo aprobado por la AAC.",
              "Con las aerolíneas y la seguridad aeroportuaria: informa a los pasajeros y previene las mercancías ocultas.",
              "Organiza la atención de accidentes e incidentes en el aeródromo.",
            ],
          },
          {
            titulo: "La AAC (tu autoridad)",
            ref: "LAR 175.020 y 175.025",
            nota: "En Colombia, la UAEAC (Aerocivil), por el RAC 175.035 y 175.230.",
            puntos: [
              "Autoridad competente para el Anexo 18, las Instrucciones Técnicas y el reglamento nacional.",
              "Actualiza la norma con las enmiendas de la OACI.",
              "Vigila e inspecciona a explotadores, expedidores y aeródromos.",
              "Verifica los programas de instrucción y otorga aprobaciones y dispensas.",
              "Emite recomendaciones para que los eventos no se repitan.",
            ],
          },
          {
            titulo: "Tripulación de vuelo",
            ref: "LAR 175.515, 175.620 y Capítulo D",
            puntos: [
              "El piloto al mando firma la información escrita antes de que las mercancías se transporten.",
              "Tiene esa información a su alcance durante todo el vuelo.",
              "Conoce las medidas de emergencia con mercancías peligrosas.",
              "Recibe instrucción como mínimo cada 24 meses (175.310 (a)).",
            ],
          },
        ],
      },
      {
        kind: "norma",
        ref: "LAR 175.205 (c)",
        rac: "RAC 175.205 (c)",
        titulo: "Quien actúa en nombre de otro responde igual",
        texto:
          "Si alguien realiza alguna función prevista en este Reglamento en nombre de quien entrega mercancías peligrosas para transportar por vía aérea, en nombre del explotador o en nombre del operador de terminal de carga, tendrá que realizarla necesariamente de conformidad con las condiciones previstas en este Reglamento y en las Instrucciones Técnicas.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "La responsabilidad no se diluye en la cadena",
        text: "El incumplimiento da lugar a acciones administrativas, sin perjuicio de las responsabilidades penales, conforme a la legislación nacional (LAR 175.205 (b)). Con qué norma se sanciona y con qué cuantía lo decide cada país: en Colombia, el RAC 13, por remisión del RAC 175.636. Alcanza también al explotador cuyo envío llega a otro Estado sin cumplir las Instrucciones y ese Estado lo notifica.",
      },
      {
        kind: "enLaOperacion",
        momento: "Tu firma",
        texto:
          "La información escrita sobre las mercancías peligrosas embarcadas la firma el piloto al mando **antes** de que se transporten (175.515 (a) (1)). No es un recibido: es la constancia de que sabes qué llevas, dónde va y qué hacer si algo pasa. Lo que hay detrás de esa hoja lo ves en el nivel 4.",
      },
      {
        kind: "ponAPrueba",
        preguntas: [
          {
            q: "Un bulto llega a la aeronave mal clasificado. ¿De quién es la responsabilidad de la clasificación?",
            ref: "LAR 175.410, 175.415 y 175.510",
            opciones: [
              {
                t: "Del expedidor.",
                ok: true,
                fb: "El 175.416 es explícito: el expedidor es responsable de la identificación y clasificación. Eso no exime al explotador de inspeccionar el bulto y la documentación antes de aceptarlo (175.514).",
              },
              {
                t: "Del explotador, porque es quien lo sube al avión.",
                fb: "El explotador responde por aceptar, cargar, estibar, segregar e informar; la clasificación es del expedidor. Pero si acepta un envío que no cumple, incumple el 175.220 (b).",
              },
              {
                t: "Del operador de terminal de carga.",
                fb: "La terminal responde por almacenamiento, segregación en tierra, información y conservación de documentos (175.225), no por clasificar.",
              },
            ],
          },
          {
            q: "¿Qué necesita un explotador para poder aceptar carga con mercancías peligrosas?",
            ref: "LAR 175.020 (a) y 175.220 (a)",
            opciones: [
              {
                t: "Que el expedidor firme la declaración.",
                fb: "La declaración del expedidor es necesaria para cada envío, pero no habilita al explotador. Sin autorización en las OpSpecs no puede aceptar mercancías peligrosas aunque el envío esté perfecto.",
              },
              {
                t: "Una autorización de la AAC en sus OpSpecs o documento equivalente.",
                ok: true,
                fb: "El 175.020 (a) exige la autorización en las OpSpecs, y el 175.220 (a) repite que solo así puede aceptar y transportar. Sin ella, la única puerta es la autorización especial del 175.020 (c) para mercancías de riesgo menor.",
              },
              {
                t: "Tener el Doc 9284 a bordo.",
                fb: "Poseer y usar las Instrucciones Técnicas es una obligación del explotador (175.220 (k)), pero es una condición para aceptar bien, no la autorización para aceptar.",
              },
            ],
          },
        ],
      },
      {
        kind: "summary",
        items: [
          "Expedidor: identifica y clasifica (175.416). Explotador: solo acepta con OpSpecs y responde por sus agentes (175.220). Terminal: almacena, segrega e informa (175.225).",
          "Quien actúa en nombre de otro responde igual (LAR 175.205 (c)); la sanción la fija la legislación de cada país.",
          "El piloto al mando firma la información escrita antes de que las mercancías se transporten (175.515 (a) (1)).",
        ],
      },
    ],
  },
]
