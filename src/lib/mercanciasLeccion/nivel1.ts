/**
 * Nivel 1 · Introducción: por qué existe la norma, por qué el avión cambia el
 * riesgo, el vocabulario y quién responde por qué.
 *
 * Sin citas en el texto, por decisión de Camilo: la lección 1 dice de dónde
 * sale todo (Anexo 18 y Doc 9284 de la OACI, LAR 175 del SRVSOP, Primera
 * edición, Enmienda 4, diciembre 2017, y el RAC 175 de Colombia, Edición
 * original, marzo 2016) y el resto del módulo no cita artículo por artículo.
 * Cada dato y cada literal se contrastó igual contra los dos textos: el
 * literal no siempre lleva la misma letra en una norma y en la otra.
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
          "La cadena falló en tres eslabones y los tres tienen nombre en la norma: el expedidor que no identifica ni embala, el explotador que no vigila ni capacita y una regla de diseño que la autoridad no había cerrado. El comandante firmó un manifiesto que decía otra cosa. Este módulo trata de por qué esa firma tuya importa.",
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
        titulo: "Mercancías peligrosas",
        texto:
          "==Todo objeto o sustancia que pueda constituir un riesgo para la salud, la seguridad, los bienes o el medio ambiente y que figure en la lista de mercancías peligrosas de las Instrucciones Técnicas o esté clasificado conforme a dichas Instrucciones.==",
      },
      {
        kind: "p",
        text: "Fíjate en las dos mitades: **riesgo** y **estar en la lista o ser clasificable**. Un artículo no es mercancía peligrosa porque lo parezca. Lo es porque encaja en los criterios de clasificación de las Instrucciones Técnicas. La lista está en esas mismas Instrucciones, y lo que no figura en ella se clasifica con esos mismos criterios.",
      },
      {
        kind: "definicion",
        text: "En ValuJet 592, los generadores químicos de oxígeno figuraban en el manifiesto como «Oxy Canisters, Empty»: cilindros de oxígeno vacíos. No estaban vacíos, y el nombre que llevaban en el papel no les quitaba el riesgo. Algo es mercancía peligrosa por lo que puede hacer, no por cómo lo llamen ni por lo que diga la caja.",
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
              "El detalle operativo: la lista de mercancías, el embalaje, las marcas y etiquetas, la segregación y la información al piloto al mando. Se reedita cada dos años. Las normas de la región la llaman «Instrucciones Técnicas» y remiten a su última versión publicada.",
          },
          {
            clave: "lar175",
            etiqueta: "LAR 175",
            sub: "SRVSOP · la región",
            texto:
              "El reglamento armonizado que el Sistema Regional de Cooperación para la Vigilancia de la Seguridad Operacional elaboró con fundamento en el Anexo 18 y propuso a sus Estados miembros. Es la base de este módulo, y sus reglas son las que reconocerás en el reglamento de tu país.",
          },
          {
            clave: "nacional",
            etiqueta: "Tu reglamento",
            sub: "Cada Estado publica el suyo",
            texto:
              "Cada autoridad de aviación civil adopta el LAR 175 en su propia norma y le pone su nombre y su numeración. En Colombia es el RAC 175, adoptado por la Resolución 00478 de 2016. Esa es la que te aplica a ti, y aplica a vuelos internos e internacionales por igual: busca la tuya y tenla a mano.",
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
        text: "El LAR 175, y con él el reglamento de tu país, remite a las Instrucciones Técnicas casi en cada artículo. Cuando te pregunten dónde está la lista, cuánto puede llevar un pasajero o cómo se separa un bulto de otro, la respuesta detallada está en el Doc 9284; el reglamento es el que te obliga a aplicarlo.",
      },
      {
        kind: "p",
        text: "Todo lo que estudias en este módulo sale de estos cuatro documentos: el Anexo 18 y el Doc 9284 de la OACI, el LAR 175 del SRVSOP y el RAC 175 de Colombia. Como el LAR 175 es el reglamento que armonizan los países de la región, lo que aprendes aquí es aplicable en toda Latinoamérica. Los casos reales vienen de los informes oficiales de investigación de cada accidente. Por eso, a lo largo del módulo no citamos artículo por artículo: cuando necesites el texto exacto, está en el reglamento de tu país.",
      },
      {
        kind: "enLaOperacion",
        momento: "En la rampa",
        texto:
          "Sube un bulto a tu avión con una etiqueta que no reconoces. La pregunta no es «¿parece peligroso?». Es «¿está clasificado, documentado y aceptado conforme a las Instrucciones?». Si nadie te lo puede decir, ese bulto no ha pasado por la cadena que este módulo describe.",
      },
    ],
  },

  // ── 02 ──────────────────────────────────────────────────────────────────
  {
    n: 2,
    title: "¿Por qué es peligroso en un avión?",
    kicker: "La física del vuelo",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "Una lata de aerosol no es un problema en una estantería. Un power bank tampoco. Lo que los convierte en un problema es el sitio donde van a pasar las próximas horas: un tubo presurizado, con vibración, cambios de temperatura y nadie que pueda salir a apagar un incendio.",
      },
      {
        kind: "norma",
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
            icono: "/modulos/mercancias/ico-presion.webp",
            desc: "La cabina y las bodegas vuelan a una presión menor que la del suelo. Un recipiente cerrado a nivel del mar queda con presión hacia afuera: lo que estaba justo se abre, y la fuga pequeña se agranda.",
          },
          {
            titulo: "Temperatura",
            icono: "/modulos/mercancias/ico-temperatura.webp",
            desc: "Entre la plataforma y el crucero hay decenas de grados de diferencia. Un líquido inflamable que se calienta despide más vapor; un peróxido que se calienta se descompone.",
          },
          {
            titulo: "Vibración",
            icono: "/modulos/mercancias/ico-vibracion.webp",
            desc: "Horas de vibración aflojan tapas, rozan embalajes entre sí y rompen frascos interiores. Por eso el reglamento exige acolchar y sujetar los embalajes interiores.",
          },
          {
            titulo: "Tiempo y aislamiento",
            icono: "/modulos/mercancias/ico-tiempo.webp",
            desc: "En tierra un derrame se atiende en minutos. En crucero el aeródromo más cercano puede estar a más de una hora. Lo que pase lo resuelve la tripulación con lo que ya está a bordo.",
          },
        ],
      },
      { kind: "sub", text: "Lo que cambia cuando el problema ocurre en vuelo" },
      {
        kind: "p",
        text: "En tierra, un incidente con mercancías peligrosas puede recibir apoyo externo rápidamente. En vuelo, la tripulación debe actuar con los procedimientos y equipos disponibles a bordo y mantener la situación controlada hasta poder aterrizar.",
      },
      {
        kind: "p",
        text: "Por eso, el explotador debe proporcionar procedimientos de emergencia y el equipo previsto para responder a determinados eventos con mercancías peligrosas, incluyendo elementos como bolsas grandes de polietileno, ligaduras y guantes largos de goma.",
      },
      { kind: "sub", text: "¿Qué significa esto para ti como piloto?" },
      {
        kind: "p",
        text: "No significa que tengas que hacer el trabajo del personal de tierra. Significa que debes saber reconocer el riesgo, conocer el procedimiento de tu operador y utilizar los recursos disponibles a bordo cuando una mercancía peligrosa genere una situación anormal.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "El caso de las bodegas clase D",
        text: "En ValuJet 592 la bodega delantera no tenía detección ni extinción de incendios. La tripulación se enteró del fuego cuando el humo llegó a la cabina, y para entonces llevaba minutos ardiendo. Después del accidente la FAA exigió detección y supresión en esas bodegas. Es la razón por la que hoy la bodega de tu avión avisa.",
      },
      {
        kind: "enLaOperacion",
        momento: "Antes de la salida",
        texto:
          "Cuando en la información al piloto al mando veas un envío de **líquido inflamable** en la bodega trasera, no lo leas como «pintura». Léelo como **vapores inflamables, en un espacio cerrado**, con una diferencia de presión que crece durante el ascenso, durante tres horas. Con esa lectura se entienden todas las limitaciones de cantidad que vienen después.",
        imagen: {
          src: "/modulos/mercancias/img-06-bodega-clase-3.webp",
          alt: "Paleta de cajas de pintura UN 1263 con la etiqueta de clase 3, envuelta en film y sujeta con red y cinchas dentro de la bodega de un avión.",
        },
      },
    ],
  },

  // ── 03 ──────────────────────────────────────────────────────────────────
  {
    n: 3,
    title: "El vocabulario que te van a preguntar",
    kicker: "Trece términos y tres permisos",
    minutes: 6,
    blocks: [
      {
        kind: "p",
        text: "No necesitas memorizar una lista de definiciones. Lo importante es aprender a reconocer estos términos cuando aparezcan durante una operación.",
      },
      {
        kind: "p",
        text: "Piénsalo como piloto: cada palabra tiene un contexto en el que puedes encontrarla: en la documentación, durante la preparación del vuelo, en la información entregada a la tripulación o al observar la carga.",
      },
      {
        kind: "figura",
        src: "/modulos/mercancias/ilu-03-bulto-sobre-embalaje-uld.webp",
        alt: "Bulto, sobre-embalaje y ULD a la misma escala. Un bulto: una caja UN 1263 PAINT. Un sobre-embalaje: una caja exterior marcada OVERPACK con tres bultos dentro. Un ULD: un contenedor AKE con varios sobre-embalajes. Mismo concepto, diferente tamaño.",
        ancho: 1672,
        alto: 941,
      },
      { kind: "sub", text: "Lo que vas a leer en el papel que firmas" },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "NOTOC",
            imagen: {
              src: "/modulos/mercancias/img-15-notoc.webp",
              alt: "NOTOC de ejemplo con nueve partes señaladas: datos del vuelo, título del documento, información de preparación, destinatario y remitente, mercancías peligrosas, otras cargas especiales, información adicional, firma de Load Control, y fecha y hora.",
            },
            tecnica: {
              rotulo: "Lo que exige el reglamento",
              texto: "Salvo en los casos en que las Instrucciones Técnicas indiquen lo contrario, el explotador de toda aeronave en la cual haya que transportar mercancías peligrosas, deberá proporcionar al piloto al mando, lo antes posible antes de la salida de la aeronave y por escrito, la información prevista en las Instrucciones Técnicas.",
            },
            puntos: ["El papel que te dice qué mercancías peligrosas llevas, cuántas y dónde van. Lo firmas antes de salir y lo tienes a mano todo el vuelo, por si algo pasa."],
          },
          {
            titulo: "Bulto",
            imagen: {
              src: "/modulos/mercancias/img-08-bulto.webp",
              alt: "Caja de aerosoles UN 1950 en la rampa con cuatro partes señaladas: las marcas, el número ONU, la etiqueta de riesgo y las marcas de orientación.",
            },
            tecnica: {
              texto: "El producto final de la operación de empacado, que comprende el embalaje en sí y su contenido preparado en forma idónea para el transporte.",
            },
            puntos: ["Es la mercancía ya empacada y lista para volar: el embalaje con lo que lleva dentro. Cuando el NOTOC dice «3 bultos», son tres de estos."],
          },
          {
            titulo: "Embalaje",
            imagen: {
              src: "/modulos/mercancias/img-09-embalaje.webp",
              alt: "Caja de cartón abierta y vacía con dos partes señaladas: la caja exterior, que contiene y protege, y la protección interior, que amortigua y evita daños.",
            },
            tecnica: {
              texto: "Los recipientes y demás componentes o materiales necesarios para que el recipiente sea idóneo a su función de contención.",
            },
            puntos: ["Es lo que contiene y protege la mercancía: la caja, la lata o el frasco y su relleno. Vacío es embalaje; con la mercancía dentro, ya es un bulto."],
          },
          {
            titulo: "Sobre-embalaje",
            imagen: {
              src: "/modulos/mercancias/img-10-sobre-embalaje.webp",
              alt: "Paleta de cajas de aerosoles envueltas en film con cinco partes señaladas: varios bultos en una sola unidad, el film exterior, las marcas y etiquetas visibles, la marca OVERPACK y la paleta.",
            },
            tecnica: {
              texto: "Embalaje utilizado por un expedidor único que contenga uno o más bultos y constituya una unidad para facilitar su manipulación y estiba.",
            },
            puntos: ["Es la unidad en que un mismo expedidor junta sus bultos, con film o una caja por fuera, para moverlos más fácil. Por fuera parece uno solo; por dentro puede haber varios."],
          },
          {
            titulo: "ULD",
            imagen: {
              src: "/modulos/mercancias/img-11-uld.webp",
              alt: "Contenedor de carga aérea junto a un avión con tres partes señaladas: el contenedor ULD, la carga asegurada con red y la paleta que le sirve de base.",
            },
            tecnica: {
              texto: "Toda variedad de contenedor de carga, contenedor de aeronave, paleta de aeronave con red o paleta de aeronave con red sobre un iglú.",
            },
            puntos: ["Es el contenedor o la paleta con red que se sube a la bodega. En el NOTOC te dice **dónde** va cada bulto, que es lo que necesitas saber si algo pasa."],
          },
          {
            titulo: "Número ONU",
            imagen: {
              src: "/modulos/mercancias/img-12-numero-onu.webp",
              alt: "Marca de baterías de litio en una caja con dos partes señaladas: el número ONU, UN 3480, y la denominación, LITHIUM ION BATTERIES.",
            },
            tecnica: {
              texto: "Número de cuatro dígitos asignado por el Comité de expertos en transporte de mercaderías peligrosas, de las Naciones Unidas, que sirve para reconocer las diversas sustancias o determinado grupo de ellas.",
            },
            puntos: ["Son cuatro números que identifican la sustancia: UN 1263 es pintura y UN 3480, baterías de ion litio. Es lo primero que busca quien atiende una emergencia."],
          },
          {
            titulo: "Denominación del artículo expedido",
            imagen: {
              src: "/modulos/mercancias/img-13-denominacion.webp",
              alt: "Lata de pintura con tres partes señaladas: el nombre comercial del fabricante, el número ONU, UN 1263, y la denominación oficial, PAINT.",
            },
            tecnica: {
              rotulo: "Lo que exige el reglamento",
              texto: "La identificación de las mercancías peligrosas deberá ser hecha por medio de un número de la ONU (UN o ID) y por medio de la denominación del artículo expedido, de acuerdo con las Instrucciones Técnicas.",
            },
            puntos: ["Es el nombre oficial con que viaja la mercancía, no el de la marca: un esmalte de avión va como «PAINT». Si el NOTOC trae un nombre comercial, algo falló antes."],
          },
          {
            titulo: "Envío",
            imagen: {
              src: "/modulos/mercancias/img-14-envio.webp",
              alt: "Paleta de cajas de pintura UN 1263 de un mismo expedidor en la zona de aceptación de carga, con la guía aérea y la declaración del expedidor al lado.",
            },
            tecnica: {
              texto: "Uno o más bultos de mercancías peligrosas que un explotador acepta de un expedidor de una sola vez y en un mismo sitio recibidos en un lote y despachados a un mismo consignatario y dirección.",
            },
            puntos: ["Es todo lo que un expedidor entrega de una vez para un mismo destinatario. Puede ser un bulto o veinte: la aerolínea lo acepta como una sola entrega."],
          },
        ],
      },
      { kind: "sub", text: "Lo que vas a oír en una conversación" },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Expedidor",
            imagen: {
              src: "/modulos/mercancias/img-16-expedidor.webp",
              alt: "Expedidor: quien ofrece o envía la mercancía y responde de que esté bien identificada, clasificada, embalada, marcada, etiquetada y documentada. En la foto, un empleado cierra una caja UN 1263 PAINT con etiqueta de clase 3 y prepara la declaración de mercancías peligrosas.",
            },
          },
          {
            titulo: "COMAT",
            imagen: {
              src: "/modulos/mercancias/img-17-comat.webp",
              alt: "COMAT: material de la propia compañía que viaja en su avión, como un repuesto, una rueda o la batería de un equipo. Si está clasificado como mercancía peligrosa es COMAT peligroso y cumple todas las reglas: ser de la casa no exime de nada. En la foto, una rueda, una caja de repuestos y una batería UN 3480 de la aerolínea en la rampa.",
            },
          },
          {
            titulo: "Mercancías incompatibles",
            imagen: {
              src: "/modulos/mercancias/img-18-incompatibles.webp",
              alt: "Mercancías incompatibles: las que no deben ir juntas porque su interacción puede generar calor, fuego, gases o sustancias corrosivas; por eso existen reglas de segregación. En la foto, una paleta de hidróxido de sodio corrosivo (clase 8) y otra de gasolina (clase 3) con el aviso «No juntar».",
            },
          },
          {
            titulo: "Mercancías peligrosas ocultas",
            imagen: {
              src: "/modulos/mercancias/img-19-ocultas.webp",
              alt: "Mercancías peligrosas ocultas: las que no se declararon como tales, bajo una descripción general de carga o en el equipaje de un pasajero. Descubrirlas puede ser un suceso que hay que reportar. En la foto, una caja rotulada SPARE PARTS con una batería de litio, un aerosol y un aditivo de combustible dentro.",
            },
          },
          {
            titulo: "Declaración del expedidor",
            imagen: {
              src: "/modulos/mercancias/img-20-declaracion-expedidor.webp",
              alt: "Declaración del expedidor: el documento con el que el expedidor declara qué mercancía peligrosa envía y certifica que la preparó según las Instrucciones Técnicas. La prepara y firma el expedidor, no la tripulación. En la foto, la declaración de un envío de UN 3480 junto al NOTOC, que es el resumen que llega a la tripulación.",
            },
          },
        ],
      },
      { kind: "sub", text: "Tres permisos que se confunden" },
      {
        kind: "p",
        text: "Aprobación, dispensa y excepción suenan parecidas, pero no significan lo mismo. La diferencia está en quién autoriza la operación y en qué momento la norma permite apartarse de las condiciones habituales.",
      },
      {
        kind: "fichas",
        columnas: 1,
        items: [
          {
            titulo: "Aprobación",
            tecnica: {
              rotulo: "Definición",
              texto: "Autorización otorgada por la autoridad nacional que corresponda para transportar las mercancías peligrosas prohibidas en aeronaves de pasajeros o de carga, cuando en las Instrucciones Técnicas se establece que dichas mercancías pueden transportarse con una aprobación; o bien para otros fines especificados en las Instrucciones Técnicas.",
            },
            puntosRotulo: "Ejemplo práctico",
            puntos: [
              "Estás en tu A320 y debes transportar una mercancía peligrosa que normalmente está prohibida en una aeronave de pasajeros, pero las Instrucciones Técnicas permiten transportarla si se obtiene una aprobación previa.",
              "La aprobación la gestiona el operador (el explotador) ante la autoridad competente. En Colombia, por ejemplo, ante la UAEAC (Aerocivil); en México, ante la AFAC.",
              "Es decir, la norma permite ese transporte, pero el operador necesita una aprobación previa.",
            ],
          },
          {
            titulo: "Dispensa",
            tecnica: {
              rotulo: "Definición",
              texto: "Toda autorización, que no sea una aprobación, otorgada por la autoridad nacional que corresponda, que exime de lo previsto en las Instrucciones Técnicas.",
            },
            puntosRotulo: "Ejemplo práctico",
            puntos: [
              "Estás en tu A320 y necesitas transportar una mercancía peligrosa por una situación de extrema urgencia, pero no puedes cumplir una condición específica de transporte establecida en las Instrucciones Técnicas: por ejemplo, una condición de cantidad, ruta, aeronave o forma de transporte.",
              "El operador (el explotador) solicita una dispensa a la autoridad competente, que puede autorizar el transporte bajo condiciones especiales, siempre que se mantenga un nivel general de seguridad equivalente.",
              "Es decir, la condición normal no puede cumplirse, pero la autoridad puede autorizar excepcionalmente apartarse de ella.",
            ],
          },
          {
            titulo: "Excepción",
            tecnica: {
              rotulo: "Definición",
              texto: "Toda disposición del presente Reglamento por la que se excluye determinado artículo, considerado mercancía peligrosa, de las condiciones normalmente aplicables a tal artículo.",
            },
            puntosRotulo: "Ejemplo práctico",
            puntos: [
              "Estás en tu A320 y durante la preparación del vuelo identificas una mercancía peligrosa. Al consultar las Instrucciones Técnicas encuentras que, para ese artículo y en esa condición específica, la propia norma establece que uno de los requisitos que normalmente se exige no aplica.",
              "Es decir, no tienes que pedir una autorización para dejar de cumplir ese requisito, porque la propia norma ya establece la excepción.",
            ],
          },
        ],
      },
      {
        kind: "definicion",
        text: "La regla para no equivocarse: si la norma lo previó, es aprobación. Si no lo previó y hay que salirse, es dispensa. Si no hay que pedir nada, es excepción.",
      },
    ],
  },

  // ── 04 ──────────────────────────────────────────────────────────────────
  {
    n: 4,
    title: "Quién responde por qué",
    kicker: "La cadena y tu lugar en ella",
    minutes: 4,
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
      },
      { kind: "sub", text: "Qué te llega a ti de cada eslabón" },
      {
        kind: "p",
        text: "Léelo así y la cadena deja de ser un organigrama. Cada uno produce algo, y ese algo termina llegando a la cabina convertido en una línea de papel o en una caja en tu bodega.",
      },
      {
        kind: "fichas",
        columnas: 1,
        items: [
          {
            titulo: "Agente de carga",
            tecnica: {
              rotulo: "Qué hace",
              texto: "Recibe la mercancía, verifica la documentación y coordina su envío.",
            },
            puntosRotulo: "¿Qué llega hasta ti?",
            puntos: [
              "Su trabajo es principalmente un filtro previo. Tú normalmente no ves ese proceso, pero de él depende que la carga llegue correctamente preparada a la operación.",
            ],
          },
          {
            titulo: "Terminal de carga",
            tecnica: {
              rotulo: "Qué hace",
              texto: "Recibe, almacena y manipula la mercancía antes de entregarla para el vuelo.",
            },
            puntosRotulo: "¿Qué llega hasta ti?",
            puntos: [
              "Que la mercancía haya sido almacenada y manipulada correctamente antes de ser cargada en la aeronave.",
            ],
          },
          {
            titulo: "Explotador",
            tecnica: {
              rotulo: "Qué hace",
              texto:
                "Determina si puede aceptar la mercancía para el transporte y aplica los procedimientos establecidos por el operador.",
            },
            puntosRotulo: "¿Qué llega hasta ti?",
            puntos: ["La carga que finalmente ha sido aceptada para ese vuelo y la información que recibe la tripulación."],
          },
          {
            titulo: "Carga y estiba",
            tecnica: {
              rotulo: "Qué hace",
              texto:
                "Ubica, segrega y asegura la mercancía dentro de la aeronave de acuerdo con los procedimientos aplicables.",
            },
            puntosRotulo: "¿Qué llega hasta ti?",
            puntos: [
              "La ubicación de la mercancía en la aeronave, que puedes consultar en la información entregada a la tripulación.",
            ],
          },
          {
            titulo: "Tú, piloto al mando",
            tecnica: {
              rotulo: "Qué haces",
              texto:
                "Recibes la información sobre las mercancías peligrosas transportadas, la conoces antes del vuelo y la tienes disponible durante la operación.",
            },
            puntosRotulo: "Tu papel",
            puntos: [
              "Eres quien debe entender qué mercancías peligrosas llevas, dónde están y qué hacer si ocurre una emergencia.",
            ],
          },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Ver las obligaciones completas de cada actor",
        bloques: [
          {
            kind: "fichas",
            columnas: 2,
            items: [
              {
                titulo: "Expedidor",
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
                puntos: [
                  "Solo acepta mercancías peligrosas si tiene la autorización en sus OpSpecs.",
                  "Su manual de operaciones dice si acepta o rechaza carga con mercancías peligrosas.",
                  "Si no las acepta, tiene procedimientos para que no entren sin declarar.",
                  "Programa de instrucción aprobado por la AAC.",
                  "Responde por que sus agentes acreditados cumplan sus procedimientos.",
                  "Incluye el transporte de mercancías peligrosas en el alcance de su SMS.",
                ],
              },
              {
                titulo: "Operador de terminal de carga",
                puntos: [
                  "Área especial de almacenamiento con acceso libre para los vehículos de salvamento y extinción.",
                  "Cuadros de etiquetas y tabla de segregación visibles y actualizados.",
                  "Procedimientos ante sucesos, con los teléfonos de la AAC y demás autoridades vinculadas a la vigilancia sanitaria, radiactiva y química.",
                  "Conserva los documentos tres meses.",
                ],
              },
              {
                titulo: "Operador de aeródromo",
                nota: "El LAR 175 lo alcanza pero no le dedica sección de obligaciones: se las fija tu reglamento nacional, como hace el de Colombia.",
                puntos: [
                  "Programa de manejo de mercancías peligrosas del aeródromo.",
                  "Capacita a su personal según la tabla de intensidad de su reglamento.",
                  "Con las aerolíneas y la seguridad aeroportuaria: informa a los pasajeros y previene las mercancías ocultas.",
                  "Organiza la atención de accidentes e incidentes en el aeródromo.",
                ],
              },
              {
                titulo: "La AAC (tu autoridad)",
                nota: "En Colombia, la UAEAC (Aerocivil).",
                puntos: [
                  "Autoridad competente para el Anexo 18, las Instrucciones Técnicas y el reglamento nacional.",
                  "Actualiza la norma con las enmiendas de la OACI.",
                  "Vigila e inspecciona a explotadores, expedidores y aeródromos.",
                  "Verifica los programas de instrucción y otorga aprobaciones y dispensas.",
                ],
              },
              {
                titulo: "Tripulación de vuelo",
                puntos: [
                  "Recibe por escrito la información de mercancías peligrosas antes de la salida.",
                  "El piloto al mando la firma antes de que se transporten.",
                  "La tiene al alcance durante todo el vuelo.",
                  "Conoce las medidas de emergencia con mercancías peligrosas.",
                  "Recibe instrucción como mínimo cada 24 meses.",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]
