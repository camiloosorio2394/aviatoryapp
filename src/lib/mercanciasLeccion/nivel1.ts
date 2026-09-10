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
        imagen: {
          src: "/modulos/mercancias/img-01-generador-oxigeno.webp",
          alt: "Generador químico de oxígeno de aviación, el tipo de dispositivo que viajaba sin tapa de seguridad en la bodega del vuelo 592.",
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
        kind: "figura",
        src: "/modulos/mercancias/ilu-01-cuatro-documentos.webp",
        alt: "Cuatro anillos concéntricos: Anexo 18 del Convenio de Chicago, Doc 9284 con las Instrucciones Técnicas, LAR 175 latinoamericano y, en la base, el reglamento nacional.",
        ancho: 1400,
        alto: 788,
        pie: "Las cuatro capas, de fuera hacia dentro. La cuarta cambia según el país: aquí aparece el RAC 175 de Colombia. Ojo, que el LAR 175 no es de IATA sino del SRVSOP, el Sistema Regional de Cooperación para la Vigilancia de la Seguridad Operacional.",
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
        kind: "entrevista",
        intro:
          "Esta lección da para tres preguntas, y las tres caen. Intenta responder en voz alta antes de abrir.",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué son las mercancías peligrosas?",
            respuesta:
              "Todo objeto o sustancia que pueda constituir un riesgo para la salud, la seguridad, los bienes o el medio ambiente y que figure en la lista de las Instrucciones Técnicas o esté clasificado conforme a ellas. Son dos mitades: el riesgo y estar en la lista o ser clasificable.",
            claves: ["Riesgo", "Lista o clasificable", "Instrucciones Técnicas"],
            ref: "LAR 175.001 (a)",
          },
          {
            nivel: "interpretacion",
            q: "Si el expedidor no declara algo como mercancía peligrosa, ¿deja de serlo?",
            respuesta:
              "No. Lo que clasifica es lo que la sustancia es y lo que puede hacer, no lo que dice el papel. Si va sin declarar sigue siendo mercancía peligrosa, y además pasa a ser una mercancía peligrosa oculta, que es un suceso notificable.",
            claves: ["No cambia la naturaleza", "Mercancía peligrosa oculta", "Es notificable"],
            ref: "LAR 175.001 (a) y 175.625",
          },
          {
            nivel: "situacion",
            q: "Te preguntan qué te dice a ti, como piloto, el accidente de ValuJet 592. ¿Qué respondes?",
            respuesta:
              "Que la cadena tiene varios eslabones y que el último es la firma del comandante. Los generadores iban mal clasificados, mal embalados y declarados como material de la compañía marcado «vacío». Ninguno de esos errores era mío, pero el avión era mío. Por eso la información que firmo antes de salir no es un trámite: es el único punto donde la cadena todavía se puede parar.",
            claves: ["Cadena de eslabones", "La firma es un control, no un trámite", "COMAT no exime"],
            ref: "NTSB/AAR-97/06",
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
      },
      {
        kind: "figura",
        src: "/modulos/mercancias/ico-cuatro-enemigos.webp",
        alt: "Cuatro iconos: un manómetro sobre nubes, un termómetro entre un copo de nieve y un sol, una caja en una cinta transportadora con ondas de vibración, y un reloj con un avión en pista.",
        ancho: 1200,
        alto: 800,
        anchoMax: 620,
        pie: "Presión, temperatura, vibración y tiempo. Los cuatro actúan a la vez durante todo el vuelo.",
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
      {
        kind: "piensaComoPiloto",
        momento: "En crucero, FL350",
        situacion:
          "Llevas en bodega un envío que en tierra nadie miró dos veces: aerosoles de cantidad limitada, bien embalados y declarados. A nivel de crucero la presión de cabina equivale a unos 8.000 pies y la bodega va a esa misma presión. Estás a cincuenta minutos del aeródromo alterno más cercano.",
        pregunta: "¿Qué ha cambiado respecto a esa misma caja en el almacén?",
        claves: [
          "La presión de fuera bajó: cada recipiente cerrado en tierra ahora empuja hacia afuera. Un cierre mediocre gotea aquí, no allá.",
          "Nadie va a bajar a mirar. Lo que pase en esa bodega lo vas a saber por un detector de humo o por un olor en cabina.",
          "Los cincuenta minutos son el dato. En tierra un derrame se atiende en cinco; aquí el tiempo de respuesta lo pones tú con lo que ya está a bordo.",
        ],
        cierre:
          "Por eso el reglamento exige que el embalaje aguante cambios de temperatura, humedad, presión y vibración: no describe un almacén, describe tu vuelo.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Por qué una mercancía peligrosa es más peligrosa en un avión que en un camión?",
            respuesta:
              "Por cuatro cosas que actúan a la vez y no paran en todo el vuelo: la presión ambiente baja, la temperatura cambia, la vibración es sostenida y no hay a quién llamar. En tierra un derrame lo atienden los bomberos en minutos; en crucero lo resuelve la tripulación con lo que ya está a bordo.",
            claves: ["Presión", "Temperatura", "Vibración", "Aislamiento y tiempo"],
          },
          {
            nivel: "situacion",
            q: "¿Qué hay a bordo para responder a un suceso con mercancías peligrosas?",
            respuesta:
              "Poco, y por eso hay que conocerlo: el equipo de respuesta de emergencia que exige el reglamento (bolsas grandes de polietileno, ligaduras y guantes largos de goma), los extintores de mano y el procedimiento del explotador. Con eso se contiene hasta aterrizar. No hay bomberos, ni ducha de emergencia, ni forma de aislar un bulto.",
            claves: ["Equipo de respuesta de emergencia", "Extintor de mano", "Procedimiento del explotador"],
            ref: "LAR 175.620 (d)",
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
        text: "No te vamos a pedir que recites doce definiciones. Te vamos a enseñar **dónde oye cada palabra un piloto**, porque ese es el gancho que hace que se queden. Si sabes que «sobre-embalaje» es lo que ves en la paleta y «bulto» lo que cuenta el NOTOC, la definición sale sola.",
      },
      { kind: "sub", text: "Lo que vas a leer en el papel que firmas" },
      {
        kind: "fichas",
        columnas: 3,
        items: [
          {
            titulo: "Bulto",
            puntos: ["Una caja lista para volar: el embalaje y lo que lleva dentro.", "Es la unidad que cuenta el NOTOC. Cuando ves «3 bultos», son tres de estos."],
          },
          {
            titulo: "Sobre-embalaje",
            puntos: ["Varios bultos de un mismo expedidor agrupados en uno para manipularlos juntos.", "Por fuera parece un bulto. Por dentro son varios, y cada uno con su etiqueta."],
          },
          {
            titulo: "ULD",
            puntos: ["El contenedor o la paleta con red donde va la carga.", "En el NOTOC te dice **dónde** está el bulto. Es lo que buscarías si tuvieras que decirle a alguien en qué parte de la bodega está."],
          },
          {
            titulo: "Número ONU",
            puntos: ["Cuatro dígitos que identifican la sustancia. UN 1263 es pintura, UN 3480 son baterías de litio sueltas.", "Es lo primero que lees, y lo primero que va a buscar quien atienda una emergencia."],
          },
          {
            titulo: "Denominación del artículo expedido",
            puntos: ["El nombre oficial de transporte, no el comercial.", "Una lata de «Aviatory Gloss» va como pintura. Si el NOTOC trae un nombre de marca, algo se saltó un paso."],
          },
          {
            titulo: "Envío",
            puntos: ["Uno o más bultos que el explotador acepta de un expedidor de una vez y para un mismo destinatario.", "Un envío puede ser un bulto o veinte. Cuenta como una sola aceptación."],
          },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Ver definiciones literales del reglamento",
        cita: "LAR 175.001 (a)",
        bloques: [
          {
            kind: "kv",
            items: [
              { k: "Bulto", v: "El producto final de la operación de empacado, que comprende el embalaje en sí y su contenido preparado en forma idónea para el transporte." },
              { k: "Embalaje", v: "Los recipientes y demás componentes o materiales necesarios para que el recipiente sea idóneo a su función de contención." },
              { k: "Sobre-embalaje", v: "Embalaje utilizado por un expedidor único que contenga uno o más bultos y constituya una unidad para facilitar su manipulación y estiba. No incluye los dispositivos de carga unitarizada." },
              { k: "Dispositivo de carga unitarizada", v: "Toda variedad de contenedor de carga, contenedor de aeronave, paleta de aeronave con red o paleta de aeronave con red sobre un iglú. No se incluyen los sobre-embalajes." },
              { k: "Envío", v: "Uno o más bultos de mercancías peligrosas que un explotador acepta de un expedidor de una sola vez y en un mismo sitio, recibidos en un lote y despachados a un mismo consignatario y dirección." },
              { k: "Número de la ONU", v: "Número de cuatro dígitos asignado por el Comité de expertos en transporte de mercaderías peligrosas de las Naciones Unidas, que sirve para reconocer las diversas sustancias o determinado grupo de ellas." },
            ],
          },
        ],
      },
      { kind: "sub", text: "Lo que vas a oír en una conversación" },
      {
        kind: "fichas",
        columnas: 3,
        items: [
          {
            titulo: "Expedidor",
            puntos: ["Quien envía la mercancía y responde de clasificarla, embalarla, marcarla y declararla.", "Es el primer eslabón. Cuando algo llega mal, casi siempre empezó aquí."],
          },
          {
            titulo: "COMAT",
            puntos: ["Material de la propia compañía que viaja en su avión: un repuesto, una rueda, una batería de un equipo.", "Si está clasificado como mercancía peligrosa es **COMAT peligroso** y cumple todas las reglas. Ser de la casa no exime de nada, y en ValuJet eso costó 110 vidas."],
          },
          {
            titulo: "Incompatible",
            puntos: ["Dos mercancías que, si se mezclan, generan calor, gases o algo corrosivo.", "Es la razón de que existan tablas de segregación y de que no todo pueda ir junto en la misma bodega."],
          },
          {
            titulo: "Mercancía peligrosa oculta",
            puntos: ["Carga declarada con una descripción general que debía declararse como peligrosa, o lo prohibido que aparece en un equipaje.", "Descubrir una **ya es un suceso notificable**, aunque no pase nada más. Lección 12."],
          },
          {
            titulo: "Declaración del expedidor",
            puntos: ["El documento donde el expedidor certifica qué es, cómo va embalado y que cumple las Instrucciones.", "Tú no la firmas ni la revisas: viaja con la carga. Lo que llega a ti es el resumen, que es el NOTOC."],
          },
          {
            titulo: "Piloto al mando",
            puntos: ["El piloto designado para estar al mando y encargarse de la realización segura del vuelo.", "En este módulo esa palabra aparece cada vez que la norma le asigna algo a alguien que eres tú."],
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Preparando el vuelo",
        situacion:
          "En la información que te entregan lees: «UN 1263 PAINT, clase 3, GE II, 2 bultos, ULD AKE 12345 AV». Un compañero te dice que son «unas latas de pintura, nada del otro mundo».",
        pregunta: "¿Qué acabas de leer de verdad, palabra por palabra?",
        claves: [
          "**UN 1263** identifica la sustancia. Es lo primero que daría por radio si tuviera que describir el problema.",
          "**PAINT** es la denominación del artículo expedido, el nombre oficial. No es la marca comercial.",
          "**Clase 3** es líquido inflamable, y **GE II** que dentro de su clase presenta peligro intermedio.",
          "**2 bultos** son dos cajas, no dos litros. Y el **ULD** me dice en qué contenedor están, que es lo que necesitaría para localizarlas.",
        ],
        cierre:
          "Tu compañero no se equivoca en que es pintura. Se equivoca en «nada del otro mundo»: acaba de resumir cinco datos que en una emergencia son lo único que tienes.",
      },
      { kind: "sub", text: "Tres permisos que se confunden" },
      {
        kind: "p",
        text: "Estas tres se preguntan mucho porque suenan parecido y significan cosas distintas. La diferencia está en **quién la da y cuándo existe**.",
      },
      {
        kind: "fichas",
        columnas: 3,
        items: [
          {
            titulo: "Aprobación",
            puntos: ["La da la autoridad **cuando las Instrucciones dicen que ese caso puede ir con aprobación**.", "Existe porque la norma ya la previó."],
          },
          {
            titulo: "Dispensa",
            puntos: ["La da la autoridad **cuando las Instrucciones NO prevén nada** para ese caso.", "Por extrema urgencia, porque otro modo de transporte no sirva o por interés público, siempre con seguridad equivalente."],
          },
          {
            titulo: "Excepción",
            puntos: ["**No se pide a nadie**: ya está escrita en la norma.", "Ejemplo: lo que la aeronave lleva por exigencia de aeronavegabilidad o de operación."],
          },
        ],
      },
      {
        kind: "definicion",
        text: "La regla para no equivocarse: si la norma lo previó, es aprobación. Si no lo previó y hay que salirse, es dispensa. Si no hay que pedir nada, es excepción.",
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Ver el texto de los tres permisos",
        cita: "LAR 175.001 (a) y 175.020",
        bloques: [
          {
            kind: "kv",
            items: [
              { k: "Aprobación", v: "Autorización otorgada por la autoridad nacional que corresponda para transportar las mercancías peligrosas prohibidas en aeronaves de pasajeros o de carga, cuando en las Instrucciones Técnicas se establece que dichas mercancías pueden transportarse con una aprobación; o bien para otros fines especificados en las Instrucciones Técnicas. Nota: si no hay una referencia específica en las Instrucciones Técnicas para permitir el otorgamiento de una aprobación, se puede pedir una dispensa." },
              { k: "Dispensa", v: "Toda autorización, que no sea una aprobación, otorgada por la autoridad nacional que corresponda, que exime de lo previsto en las Instrucciones Técnicas. Procede en casos de extrema urgencia, cuando otras modalidades de transporte no sean apropiadas o cuando el cumplimiento de todas las condiciones exigidas sea contrario al interés público, siempre que se logre un nivel general de seguridad equivalente (LAR 175.020 (e))." },
              { k: "Excepción", v: "Toda disposición del presente Reglamento por la que se excluye determinado artículo, considerado mercancía peligrosa, de las condiciones normalmente aplicables a tal artículo." },
            ],
          },
        ],
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué diferencia hay entre un bulto, un sobre-embalaje y un ULD?",
            respuesta:
              "El bulto es la unidad: el embalaje y su contenido. El sobre-embalaje son varios bultos de un mismo expedidor agrupados para manipularlos juntos. El ULD es el contenedor o la paleta con red de la aeronave, y no cuenta como sobre-embalaje. En el NOTOC el bulto me dice cuánto hay y el ULD dónde está.",
            claves: ["Bulto = unidad", "Sobre-embalaje = varios bultos, un expedidor", "ULD = contenedor o paleta"],
            ref: "LAR 175.001 (a)",
          },
          {
            nivel: "interpretacion",
            q: "¿Cuándo se pide una dispensa y cuándo una aprobación?",
            respuesta:
              "La aprobación existe cuando las Instrucciones Técnicas ya previeron que ese caso puede ir con aprobación. La dispensa es la salida cuando no lo previeron: procede por extrema urgencia, porque otro modo de transporte no sea apropiado o porque cumplirlo todo sea contrario al interés público, y siempre con un nivel de seguridad equivalente. Las dos las da la autoridad, no el explotador: él las pide.",
            claves: ["La norma lo previó = aprobación", "No lo previó = dispensa", "La da la autoridad"],
            ref: "LAR 175.020 (d) y (e)",
          },
          {
            nivel: "situacion",
            q: "En el NOTOC ves un repuesto de la propia aerolínea. ¿Cambia algo por ser material de la compañía?",
            respuesta:
              "No cambia nada. Es COMAT, y si está clasificado como mercancía peligrosa es COMAT peligroso: cumple las mismas reglas de clasificación, embalaje, marcado y documentación que cualquier envío de un tercero. De hecho es la trampa clásica, y es exactamente lo que falló en ValuJet 592.",
            claves: ["COMAT peligroso", "No exime de nada", "ValuJet 592"],
            ref: "LAR 175.001 (a) y 175.020 (b)",
          },
        ],
      },
    ],
  },

  // ── 04 ──────────────────────────────────────────────────────────────────
  {
    n: 4,
    title: "Quién responde por qué",
    kicker: "La cadena y tu lugar en ella",
    minutes: 7,
    blocks: [
      {
        kind: "p",
        text: "Cuando un bulto llega a tu avión ya pasó por varias manos. **No necesitas saber hacer el trabajo de ninguna de ellas.** Necesitas saber otra cosa: qué te llega a ti de cada una, y qué pasa contigo si alguna falló.",
      },
      {
        kind: "figura",
        src: "/modulos/mercancias/flj-01-cadena-responsabilidad.webp",
        alt: "Cadena de siete eslabones: expedidor, agente de carga, operador de terminal de carga, explotador en la aceptación, carga y aseguramiento, comandante y destino, cada uno con sus obligaciones.",
        ancho: 1800,
        alto: 775,
        pie: "Los artículos del cuadro son los del RAC 175 de Colombia, que es donde la cadena está numerada eslabón por eslabón. En el LAR 175 los mismos deberes están en 175.215 (expedidor), 175.220 (explotador), 175.225 (terminal de carga) y 175.515 (información al comandante).",
      },
      { kind: "sub", text: "Qué te llega a ti de cada eslabón" },
      {
        kind: "p",
        text: "Léelo así y la cadena deja de ser un organigrama. Cada uno produce algo, y ese algo termina llegando a la cabina convertido en una línea de papel o en una caja en tu bodega.",
      },
      {
        kind: "kv",
        items: [
          {
            k: "Expedidor",
            v: "Clasifica, embala, marca, etiqueta y declara. **Lo que te llega a ti:** que el UN y la clase del NOTOC signifiquen de verdad lo que hay en la caja. Si mintió, tú vuelas con otra cosa.",
          },
          {
            k: "Agente de carga",
            v: "Verifica la documentación y coordina la transferencia. **Lo que te llega a ti:** casi siempre nada visible. Es un filtro silencioso: cuando funciona, no te enteras.",
          },
          {
            k: "Terminal de carga",
            v: "Almacena en área especial, con cuadros de etiquetas y tabla de segregación a la vista. **Lo que te llega a ti:** que dos incompatibles no hayan pasado la noche juntos antes de subir.",
          },
          {
            k: "Explotador (aceptación)",
            v: "Solo acepta si tiene la autorización en sus OpSpecs, e inspecciona el bulto con lista de verificación. **Lo que te llega a ti:** el filtro que decide si ese envío llega a existir en tu vuelo.",
          },
          {
            k: "Carga y estiba",
            v: "Coloca, segrega y asegura según las Instrucciones. **Lo que te llega a ti:** la posición real de la mercancía, que es la casilla del NOTOC que miras si hay humo.",
          },
          {
            k: "Tú, piloto al mando",
            v: "Recibes la información por escrito, la firmas antes de que se transporte y la tienes al alcance durante el vuelo. **Eres el último control de una cadena que no viste.**",
          },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Ver las obligaciones completas de cada actor",
        cita: "LAR 175.215 a 175.225",
        bloques: [
          {
            kind: "fichas",
            columnas: 2,
            items: [
              {
                titulo: "Expedidor",
                ref: "LAR 175.215 y 175.410",
                puntos: [
                  "Identifica exactamente las mercancías peligrosas que ofrece.",
                  "Es el responsable de la identificación y la clasificación.",
                  "Las entrega clasificadas, documentadas, certificadas, descritas, embaladas, marcadas y etiquetadas.",
                  "Posee y usa las Instrucciones Técnicas o un manual equivalente.",
                  "Asegura que el transporte terrestre desde o hacia el aeropuerto también cumpla.",
                ],
              },
              {
                titulo: "Explotador",
                ref: "LAR 175.220",
                puntos: [
                  "Solo acepta mercancías peligrosas si tiene la autorización en sus OpSpecs (LAR 175.020 (a)).",
                  "Su manual de operaciones dice si acepta o rechaza carga con mercancías peligrosas.",
                  "Si no las acepta, tiene procedimientos para que no entren sin declarar.",
                  "Programa de instrucción aprobado por la AAC.",
                  "Responde por que sus agentes acreditados cumplan sus procedimientos.",
                  "Incluye el transporte de mercancías peligrosas en el alcance de su SMS (LAR 175.220 (k)).",
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
                ],
              },
              {
                titulo: "Tripulación de vuelo",
                ref: "LAR 175.515, 175.620 y Capítulo D",
                puntos: [
                  "Recibe por escrito la información de mercancías peligrosas antes de la salida.",
                  "El piloto al mando la firma antes de que se transporten.",
                  "La tiene al alcance durante todo el vuelo.",
                  "Conoce las medidas de emergencia con mercancías peligrosas.",
                  "Recibe instrucción como mínimo cada 24 meses (LAR 175.310 (a)).",
                ],
              },
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
        kind: "p",
        text: "Traducido: subcontratar no diluye la responsabilidad. El explotador responde de que sus agentes acreditados cumplan sus procedimientos, aunque no sean empleados suyos.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Cinco minutos antes de firmar",
        situacion:
          "Te entregan la información de mercancías peligrosas del vuelo. Trae dos bultos de clase 8 en un ULD de bodega delantera. Está completa, legible y firmada por el despachador. Tú no viste el bulto, no viste la declaración del expedidor y no estuviste en la aceptación.",
        pregunta: "Entonces, ¿qué estás firmando exactamente?",
        claves: [
          "No estás certificando que la clasificación sea correcta: eso lo certificó el expedidor y lo verificó la aceptación.",
          "Estás dejando constancia de que **recibiste la información** y de que la conoces: qué hay, cuánto y dónde está.",
          "Y estás asumiendo que si esa información no está o está mal, el vuelo no sale así. Es el punto donde la cadena todavía se puede parar.",
          "Si algo no cuadra (un grupo de embalaje en un UN de litio, una posición que no existe en ese avión), preguntar es parte del trabajo, no una molestia.",
        ],
        cierre:
          "La firma no te convierte en experto en embalaje. Te convierte en el último que pudo decir «esto no sale así».",
      },
      {
        kind: "ponAPrueba",
        preguntas: [
          {
            q: "¿Quién es responsable de la identificación y clasificación de una mercancía peligrosa?",
            ref: "LAR 175.410, 175.415 y 175.510",
            opciones: [
              {
                t: "El expedidor.",
                ok: true,
                fb: "Es su obligación, y es el primer eslabón. Eso no exime al explotador de inspeccionar el bulto y la documentación antes de aceptar.",
              },
              {
                t: "El explotador, al aceptarlas con la lista de verificación.",
                fb: "El explotador verifica y puede rechazar, pero quien clasifica y responde de que la clasificación sea correcta es el expedidor.",
              },
              {
                t: "El piloto al mando, al firmar la información escrita.",
                fb: "El piloto recibe y firma la información. No clasifica ni verifica embalajes: ni es su función ni tendría cómo hacerlo desde la cabina.",
              },
            ],
          },
          {
            q: "Un agente acreditado del explotador incumple un procedimiento de aceptación. ¿De quién es el problema?",
            ref: "LAR 175.205 (c) y 175.220",
            opciones: [
              {
                t: "Solo del agente: es una empresa independiente.",
                fb: "Quien realiza una función en nombre del explotador tiene que hacerla conforme al reglamento, y el explotador responde de que sus agentes acreditados cumplan sus procedimientos.",
              },
              {
                t: "Del agente y del explotador: actuar en nombre de otro no diluye la obligación.",
                ok: true,
                fb: "El LAR 175.205 (c) lo dice sin rodeos, y el explotador además responde de sus agentes acreditados. Subcontratar reparte el trabajo, no la responsabilidad.",
              },
              {
                t: "Del piloto al mando, que firmó la información del vuelo.",
                fb: "La firma acredita que recibiste la información, no que la aceptación en tierra se hizo bien.",
              },
            ],
          },
        ],
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Cuáles son las responsabilidades del piloto al mando en materia de mercancías peligrosas?",
            respuesta:
              "Recibir por escrito y lo antes posible antes de la salida la información de las mercancías peligrosas a bordo, firmarla antes de que se transporten, tenerla al alcance durante todo el vuelo y conocer los procedimientos de emergencia. Y, si se presenta una situación en vuelo, informar a la dependencia de tránsito aéreo para que se avise en tierra.",
            claves: ["Recibir por escrito antes de la salida", "Firmar", "Tenerla al alcance en vuelo", "Informar a ATC"],
            ref: "LAR 175.515 y 175.620",
          },
          {
            nivel: "interpretacion",
            q: "Si el expedidor declara mal un envío, ¿qué responsabilidad tiene el comandante?",
            respuesta:
              "La clasificación no es suya y no puede verificarla desde la cabina: eso corresponde al expedidor y a la aceptación. Lo que sí le corresponde es no volar sin la información escrita, conocerla, y actuar si algo en ella no cuadra. La responsabilidad del comandante está en el eslabón de información, no en el de clasificación.",
            claves: ["El expedidor clasifica", "El comandante recibe y conoce la información", "Actuar si algo no cuadra"],
            ref: "LAR 175.215 y 175.515",
          },
          {
            nivel: "situacion",
            q: "Vas a salir y no te han entregado la información de mercancías peligrosas, aunque sabes que llevas carga declarada. ¿Qué haces?",
            respuesta:
              "No salgo así. La norma exige que el explotador se la proporcione al piloto al mando por escrito y lo antes posible antes de la salida, y que la firme antes de que las mercancías se transporten. Sin ese documento no tengo qué hay, cuánto ni dónde, que es justo lo que necesitaría si algo pasa en vuelo. Lo pido y, si no aparece, se resuelve antes de mover el avión.",
            claves: ["Por escrito antes de la salida", "Firmada por el piloto al mando", "Sin ella no hay qué, cuánto ni dónde"],
            ref: "LAR 175.515 (a)",
          },
        ],
      },
      {
        kind: "summary",
        items: [
          "Cada eslabón produce algo que termina llegando a la cabina: el UN que lees, el bulto que va en tu bodega y la posición que consultarías con humo.",
          "El expedidor clasifica y declara; el explotador acepta o rechaza; tú recibes, firmas y conoces.",
          "Quien actúa en nombre de otro responde igual (LAR 175.205 (c)): subcontratar no diluye la obligación.",
          "Tu firma no certifica el embalaje. Certifica que la información llegó, y es el último punto donde el vuelo se puede parar.",
        ],
      },
    ],
  },
]
