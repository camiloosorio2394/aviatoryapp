/**
 * Nivel 3 · Transporte aéreo: qué puede volar y qué no, los límites que solo
 * están en Colombia, lo que llevan pasajeros y tripulantes, y las mercancías
 * peligrosas ocultas.
 *
 * Artículos contrastados con el RAC 175 (Edición original, marzo 2016). Las
 * discrepancias de Estados son extractos textuales del Adendo núm. 5 (2012)
 * del Doc 9284. La Tabla 8-1 de las Instrucciones Técnicas no está cargada:
 * va como hueco y las cifras de pasajeros llevan su aviso de verificación.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const NIVEL_3: DocScreen[] = [
  // ── 09 ──────────────────────────────────────────────────────────────────
  {
    n: 9,
    title: "Los cuatro niveles de permiso",
    kicker: "¿Puede volar?",
    minutes: 6,
    blocks: [
      {
        kind: "p",
        text: "«¿Puede volar?» no tiene una respuesta de sí o no. Tiene cuatro. Una mercancía puede estar prohibida en todos los casos, prohibida salvo dispensa, permitida con aprobación o permitida cumpliendo las Instrucciones. Saber en cuál de los cuatro cae un envío es lo que te dice qué papel tiene que traer.",
      },
      {
        kind: "norma",
        ref: "RAC 175.110 (a)",
        titulo: "El criterio de fondo",
        texto:
          "En ningún caso deberán transportarse por aeronaves los artículos o sustancias que, cuando se presentan para el transporte, son susceptibles de explotar, reaccionar peligrosamente, producir llamas o desarrollar de manera peligrosa calor o emisiones de gases o vapores tóxicos, corrosivos o inflamables en las condiciones que se observan habitualmente durante el transporte.",
      },
      {
        kind: "p",
        text: "Ese es el criterio material: aunque un artículo no esté nominado en la lista, si se comporta así en las condiciones normales del transporte, no vuela. El propio RAC lo advierte: la lista no es exhaustiva (175.110 (b) (1)).",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "1 · Prohibido en todos los casos",
            ref: "175.114 y 175.110 (b)",
            puntos: [
              "Lo que las Instrucciones Técnicas nombran, por su nombre o por descripción genérica, como prohibido cualesquiera que sean las circunstancias.",
              "No se transporta en ninguna aeronave. Ni con dispensa.",
              "En la lista aparece con la palabra «Prohibido» en las columnas 2 y 3.",
            ],
          },
          {
            titulo: "2 · Prohibido salvo dispensa",
            ref: "175.112 y 175.110 (c)",
            puntos: [
              "Lo que figura como prohibido en circunstancias normales, y los animales vivos infectados.",
              "Solo vuela con dispensa de la UAEAC (o del Estado de procedencia), o con aprobación cuando las Instrucciones lo prevén.",
              "En la lista aparece con «Prohibido» en las columnas de pasajeros o de carga.",
            ],
          },
          {
            titulo: "3 · Permitido con aprobación",
            ref: "175.020 (f)",
            puntos: [
              "Cuando las Instrucciones Técnicas lo prevén expresamente, la UAEAC puede otorgar aprobación si se logra un nivel de seguridad equivalente.",
              "Casos típicos: extrema urgencia, cuando otras modalidades de transporte no son apropiadas, o cuando cumplir todas las condiciones sería contrario al interés público.",
            ],
          },
          {
            titulo: "4 · Permitido cumpliendo las Instrucciones",
            ref: "175.011 (a)",
            puntos: [
              "El caso normal: únicamente se transportan mercancías peligrosas cumpliendo las especificaciones y procedimientos del RAC 175 y de las Instrucciones Técnicas.",
              "Es lo que hace el 99 % de los envíos que ves en un NOTOC.",
            ],
          },
        ],
      },
      {
        kind: "hueco",
        rotulo: "MP-FLJ-02 · Flujograma · 3:4 · 1200×1600 · SVG",
        descripcion:
          "Árbol de decisión vertical con ramas sí/no: ¿está prohibido en todas las circunstancias? → ¿figura como prohibido en circunstancias normales? → ¿las Instrucciones prevén aprobación? → ¿hay dispensa? → transporte normal cumpliendo las Instrucciones. Cada rama con su artículo del RAC 175.",
        alto: 420,
        anchoMax: 520,
      },
      {
        kind: "definicion",
        text: "Cómo se lee la lista: «Prohibido» en las columnas 2 y 3 es prohibido en todos los casos; «Prohibido» en las columnas de aeronave de pasajeros o de carga es prohibido en circunstancias normales, y ahí cabe la dispensa o la aprobación (175.110 (b) (1) y (c) (1)).",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Pasajeros o carga: la limitación que te toca a ti",
        text: "Es la más directa para el comandante. Un bulto marcado «Exclusivamente en aeronaves de carga» (Cargo Aircraft Only) está permitido en un carguero y **nunca** en una aeronave que lleve pasajeros. Si aparece en la información de un vuelo con pasajeros, la carga no sale. No hay aprobación del expedidor ni posición de estiba que lo arregle.",
      },
      {
        kind: "enLaOperacion",
        momento: "Antes de firmar",
        texto:
          "Con el NOTOC en la mano, cada línea cae en uno de los cuatro niveles. Lo permitido cumpliendo las Instrucciones no necesita nada más que su documentación. Lo permitido con aprobación tiene que traerla, y tú tienes que saber que existe. Lo prohibido salvo dispensa, lo mismo con la dispensa. Y lo prohibido en todos los casos no debería estar en ese papel: si está, alguien se equivocó antes que tú.",
      },
      {
        kind: "ponAPrueba",
        preguntas: [
          {
            q: "¿En qué se diferencia una dispensa de una aprobación?",
            ref: "RAC 175.001 (a) (4) y (13); 175.020",
            opciones: [
              {
                t: "La aprobación existe cuando las Instrucciones Técnicas la prevén para ese caso; la dispensa exime de lo previsto en las Instrucciones cuando no hay referencia específica.",
                ok: true,
                fb: "La nota del 175.001 (a) (4) lo dice literalmente: si no hay una referencia específica en las Instrucciones Técnicas para otorgar una aprobación, se puede pedir una dispensa. Y la dispensa nunca procede para lo prohibido en todas las circunstancias (175.020 (g)).",
              },
              {
                t: "Son sinónimos; la diferencia es solo el nombre según el Estado.",
                fb: "El reglamento las define por separado y con efectos distintos, incluso en cuanto a qué Estado debe ser Colombia: para aprobaciones, Estado de origen y/o del explotador; para dispensas, también tránsito, sobrevuelo o destino (175.020 (h)).",
              },
              {
                t: "La dispensa la da el explotador y la aprobación la autoridad.",
                fb: "Ambas las otorga la UAEAC; la dispensa, a través de la Secretaría de Seguridad Aérea (175.001 (a) (13)). El explotador las pide (175.225, obligaciones del explotador de servicios aéreos), no las da.",
              },
            ],
          },
          {
            q: "Un artículo no aparece en la lista de mercancías peligrosas, pero en las condiciones normales de transporte produce llamas. ¿Puede volar?",
            ref: "RAC 175.110 (a) y (b) (1)",
            opciones: [
              {
                t: "Sí, porque no está en la lista.",
                fb: "La lista no es exhaustiva (175.110 (b) (1)). El criterio material del 175.110 (a) prohíbe todo lo que en las condiciones habituales del transporte pueda explotar, reaccionar, producir llamas o calor o emitir vapores peligrosos.",
              },
              {
                t: "No: lo prohíbe el criterio material del 175.110 (a), esté o no en la lista.",
                ok: true,
                fb: "Es el artículo que va antes que la lista. Si algo se comporta así, no vuela, y punto.",
              },
              {
                t: "Solo con dispensa.",
                fb: "La dispensa sirve para lo prohibido en circunstancias normales, no para lo que por su comportamiento no puede transportarse en ningún caso (175.020 (g)).",
              },
            ],
          },
          {
            q: "Un laboratorio quiere enviar animales vivos infectados. ¿Qué nivel aplica?",
            ref: "RAC 175.112 (a) (2)",
            opciones: [
              {
                t: "Permitido cumpliendo las Instrucciones, como cualquier sustancia infecciosa.",
                fb: "Las sustancias infecciosas embaladas sí van por el régimen normal. Los animales vivos infectados están nombrados aparte, y no en ese nivel.",
              },
              {
                t: "Prohibido salvo dispensa.",
                ok: true,
                fb: "El 175.112 (a) los nombra expresamente junto a los artículos prohibidos en circunstancias normales: solo con dispensa de la UAEAC o del Estado de procedencia, o con aprobación si las Instrucciones lo prevén.",
              },
              {
                t: "Prohibido en todos los casos.",
                fb: "No están en el nivel absoluto: la norma deja abierta la dispensa. Lo prohibido en todos los casos es lo que las Instrucciones nombran así cualesquiera que sean las circunstancias (175.114).",
              },
            ],
          },
        ],
      },
      {
        kind: "summary",
        items: [
          "Criterio material: lo que explota, reacciona, arde o emite vapores peligrosos en condiciones normales de transporte no vuela, esté o no en la lista (175.110 (a)).",
          "Cuatro niveles: prohibido en todos los casos (175.114), prohibido salvo dispensa (175.112), permitido con aprobación (175.020 (f)), permitido cumpliendo las Instrucciones (175.011).",
          "«Exclusivamente en aeronaves de carga» nunca sube a un vuelo con pasajeros.",
        ],
      },
    ],
  },

  // ── 10 ──────────────────────────────────────────────────────────────────
  {
    n: 10,
    title: "Los límites que solo están en Colombia",
    kicker: "Lo que un curso genérico no dice",
    minutes: 7,
    blocks: [
      {
        kind: "p",
        text: "Un curso genérico te enseña el Anexo 18. Una entrevista en Colombia te pregunta esto: las limitaciones que el RAC 175 añade por su cuenta, por razones de seguridad y por la geografía y la flota del país. Ninguna viene del Anexo.",
      },
      {
        kind: "norma",
        ref: "RAC 175.115 (a) y (b)",
        texto:
          "(a) Por razones de seguridad se prohíbe el transporte de todo tipo de mercancías peligrosas por vía aérea, en aeronaves clasificadas dentro de la Aviación Civil Privada. (b) Salvo lo señalado en el numeral 175.715, por razones de seguridad se prohíbe el transporte de mercancías peligrosas pertenecientes a la Clase 3 combustibles, por vía aérea, en aeronaves monomotores y las clasificadas dentro de la Aviación Civil Privada.",
      },
      {
        kind: "fichas",
        columnas: 3,
        items: [
          {
            titulo: "Aviación civil privada",
            ref: "175.115 (a)",
            puntos: ["Prohibido el transporte de todo tipo de mercancías peligrosas."],
          },
          {
            titulo: "Monomotores · clase 3",
            ref: "175.115 (b)",
            puntos: [
              "Prohibida la clase 3 combustibles, salvo lo que el 175.715 permite llevar a pasajeros y tripulantes.",
            ],
          },
          {
            titulo: "Monomotores · otras clases",
            ref: "175.115 (c)",
            puntos: [
              "Con aprobación de la UAEAC, previa verificación de las condiciones de seguridad del explotador.",
              "La UAEAC determina los aeródromos donde no se aprueba esa operación.",
            ],
          },
          {
            titulo: "Ala rotatoria",
            ref: "175.140 (a)",
            puntos: [
              "La UAEAC puede aprobar operar sin cumplir todos los requisitos habituales, según la Parte 7, Capítulo 7 de las Instrucciones.",
            ],
          },
          {
            titulo: "Carga externa en helicóptero",
            ref: "175.142 (a)",
            puntos: ["Cumple el manual de operaciones del helicóptero, el RAC 175 y las Instrucciones."],
          },
          {
            titulo: "Correo aéreo",
            ref: "175.125",
            puntos: [
              "No son admisibles, excepto: muestras de pacientes; sustancias infecciosas y el hielo seco que las refrigera, con declaración del expedidor; y material radiactivo con actividad de hasta una décima parte de la Tabla 2-15 de las Instrucciones.",
              "El explotador necesita autorización en sus OpSpecs para llevar mercancías peligrosas por correo (175.125 (e)).",
            ],
          },
          {
            titulo: "Material radiactivo",
            ref: "175.120 y 175.536",
            puntos: [
              "Sujeto al Capítulo 6, Parte 1 de las Instrucciones y al Reglamento del OIEA.",
              "El expedidor presenta al explotador la autorización del Servicio Geológico Colombiano, Grupo de Seguridad Nuclear y Protección Radiológica.",
            ],
          },
          {
            titulo: "Seguro",
            ref: "175.025 (g)",
            puntos: [
              "El explotador acredita ante la UAEAC que sus seguros de responsabilidad cubren los daños que provengan del transporte de mercancías peligrosas.",
            ],
          },
        ],
      },
      { kind: "sub", text: "Discrepancias: la misma carga, otras reglas según la ruta" },
      {
        kind: "p",
        text: "Las Instrucciones Técnicas publican las diferencias que cada Estado y cada explotador notifican a la OACI. El expedidor debe observar las de cada Estado involucrado antes de entregar la mercancía, y también las del explotador al que se la entrega (175.115 (d) y (e)). Si un explotador colombiano adopta condiciones más restrictivas, las identifica en su manual y la UAEAC las notifica a la OACI (175.220 (h)).",
      },
      {
        kind: "kv",
        items: [
          {
            k: "BR 6 · Brasil",
            v: "«Para todo el transporte del interior en territorio brasileño, debe utilizarse el idioma portugués en todas las marcas y en todos los documentos de transporte de mercancías peligrosas. Para el transporte internacional con origen en territorio brasileño, debe utilizarse el inglés en las marcas y en los documentos, además de los idiomas exigidos por los Estados de tránsito y destino.»",
          },
          {
            k: "HR 3 · Croacia",
            v: "«Las mercancías peligrosas para las que se requiere aprobación según las Disposiciones especiales A1 o A2 de las presentes Instrucciones o las dispensas o aprobaciones de otro Estado, pueden transportarse en aeronaves de pasajeros o de carga en territorio croata únicamente con la aprobación de la Agencia de aviación civil de Croacia (CCAA). Las solicitudes de aprobación deben presentarse a CCAA como mínimo 10 días antes del vuelo previsto.»",
          },
          {
            k: "BR 3 · Brasil",
            v: "«Los explotadores de servicios aéreos que transportan mercancías peligrosas deben presentar un informe mensual de todas las mercancías peligrosas transportadas desde o dentro del Brasil para el décimo día laborable del mes siguiente a más tardar.»",
          },
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "De dónde salen estos extractos",
        text: "Son textuales del Adendo núm. 5 (31 de mayo de 2012) a las Instrucciones Técnicas, edición 2011-2012, Adjunto 3, Tabla A-1, Discrepancias notificadas por los Estados. Las discrepancias cambian con cada edición: lo que no cambia es que existen y que hay que buscarlas en la edición vigente.",
      },
      {
        kind: "enLaOperacion",
        momento: "En el despacho de un vuelo internacional",
        texto:
          "La misma carga, el mismo avión y la misma clase pueden tener requisitos distintos según el Estado de origen, de tránsito o de destino. Por eso el manual de operaciones y la ruta importan tanto como la clase. Si vuelas a Brasil con mercancías peligrosas y las marcas están solo en español, el problema no es de Colombia: es de la discrepancia BR 6.",
      },
      {
        kind: "ponAPrueba",
        preguntas: [
          {
            q: "Vas a operar un monomotor con carga que incluye un artículo de la clase 8. ¿Qué necesitas?",
            ref: "RAC 175.115 (b) y (c)",
            opciones: [
              {
                t: "Aprobación de la UAEAC, previa verificación de las condiciones de seguridad del explotador; y la UAEAC determina en qué aeródromos no se aprueba esa operación.",
                ok: true,
                fb: "La prohibición absoluta en monomotores es para la clase 3 combustibles y para toda la aviación civil privada. Las demás clases en monomotor requieren aprobación con verificación previa.",
              },
              {
                t: "Nada especial: la clase 8 no está restringida en Colombia.",
                fb: "El 175.115 (c) exige aprobación para mercancías distintas de la clase 3 en monomotores. Es una limitación propia del RAC, no del Anexo 18.",
              },
              {
                t: "Está prohibido en todos los casos.",
                fb: "Lo prohibido en monomotor por razones de seguridad es la clase 3 combustibles, salvo lo señalado en 175.715.",
              },
            ],
          },
          {
            q: "¿Qué mercancías peligrosas admite el correo aéreo en Colombia?",
            ref: "RAC 175.125 (f)",
            opciones: [
              {
                t: "Ninguna: el correo no admite mercancías peligrosas.",
                fb: "La regla general es esa (175.125 (a)), pero el (f) trae tres excepciones: muestras de pacientes, sustancias infecciosas con su hielo seco y declaración del expedidor, y material radiactivo de muy baja actividad.",
              },
              {
                t: "Muestras de pacientes; sustancias infecciosas con el hielo seco que las refrigera y declaración del expedidor; y material radiactivo con actividad de hasta una décima parte de la Tabla 2-15.",
                ok: true,
                fb: "Son las tres del 175.125 (f), a reserva de lo que dispongan las autoridades postales y la Unión Postal Universal. Y el explotador necesita la autorización en sus OpSpecs (175.125 (e)).",
              },
              {
                t: "Las mismas que en carga, si el operador postal las acepta.",
                fb: "El correo tiene su propia lista, mucho más corta. El operador postal necesita además aprobación específica de la UAEAC antes de aceptar cualquiera (175.125 (d)).",
              },
            ],
          },
          {
            q: "Un expedidor entrega material radiactivo con toda la documentación de las Instrucciones Técnicas. ¿Le falta algo en Colombia?",
            ref: "RAC 175.536 (a)",
            opciones: [
              {
                t: "No: con la declaración del expedidor basta.",
                fb: "En Colombia falta un papel más: la autorización del Servicio Geológico Colombiano, Grupo de Seguridad Nuclear y Protección Radiológica, que el expedidor presenta al explotador (175.536 (a)).",
              },
              {
                t: "Sí: la autorización del Servicio Geológico Colombiano.",
                ok: true,
                fb: "Es una licencia de manejo o una autorización de importación o reexportación, según el caso. Y el explotador no acepta una declaración tachada o enmendada salvo que la enmienda esté anulada con la misma firma (175.536 (c)).",
              },
              {
                t: "Sí: una dispensa de la UAEAC.",
                fb: "El material radiactivo permitido no necesita dispensa: necesita cumplir las Instrucciones, el Reglamento del OIEA (175.120) y, en Colombia, traer la autorización del Servicio Geológico Colombiano.",
              },
            ],
          },
        ],
      },
      {
        kind: "summary",
        items: [
          "Aviación civil privada: nada. Monomotores: nada de clase 3 combustibles; el resto con aprobación de la UAEAC (175.115).",
          "Correo: solo muestras de pacientes, infecciosas con hielo seco y declaración, y radiactivo de muy baja actividad (175.125 (f)).",
          "Radiactivo en Colombia: autorización del Servicio Geológico Colombiano (175.536).",
          "Discrepancias: la ruta cambia las reglas. Se leen en la edición vigente de las Instrucciones.",
        ],
      },
    ],
  },

  // ── 11 ──────────────────────────────────────────────────────────────────
  {
    n: 11,
    title: "Pasajeros y tripulantes",
    kicker: "Lo que sube a cabina",
    minutes: 8,
    blocks: [
      {
        kind: "p",
        text: "La carga declarada llega con papeles. Lo que sube en el equipaje de 180 pasajeros, no. Por eso el reglamento le dedica un capítulo entero, el H, a lo que un pasajero o un tripulante puede llevar encima, en la maleta de mano y en la facturada.",
      },
      {
        kind: "norma",
        ref: "RAC 175.151 (a) y 175.715 (a)",
        texto:
          "Salvo en aquellas situaciones contempladas en las Instrucciones Técnicas, las mercancías peligrosas no deben ser transportadas por los pasajeros o las tripulaciones como o dentro del equipaje facturado, como o dentro del equipaje de mano, o consigo mismo. Está prohibido el transporte de mercancías peligrosas como equipaje facturado, equipaje de mano o en la persona, por pasajeros o tripulantes, con excepción de aquellas mercancías descritas en la Tabla 8-1 de las Instrucciones Técnicas, siempre que se cumplan todos los requisitos establecidos por dicha tabla.",
      },
      {
        kind: "definicion",
        text: "La regla es prohibición general con una sola excepción: la Tabla 8-1 de las Instrucciones Técnicas. Y el tripulante está sujeto exactamente a la misma regla que el pasajero. Tu maleta no tiene fuero.",
      },
      {
        kind: "hueco",
        rotulo: "MP-TAB-01 · Tabla 8-1 · Pendiente de fuente",
        descripcion:
          "Tabla interactiva y filtrable con las mercancías admitidas a pasajeros y tripulantes y sus condiciones: equipaje de mano, facturado, en la persona, aprobación del explotador y del comandante. Requiere cargar la Parte 8 de las Instrucciones Técnicas vigentes; no se incluye contenido para no publicar datos sin fuente.",
        alto: 220,
      },
      { kind: "sub", text: "Lo que suele preguntarse de la Tabla 8-1" },
      {
        kind: "kv",
        items: [
          {
            k: "Repuestos y power banks",
            v: "Solo en cabina, con los terminales protegidos. Nunca en bodega.",
          },
          {
            k: "Dispositivos con batería",
            v: "Mejor en cabina; si van en bodega, apagados y protegidos contra activación accidental.",
          },
          {
            k: "Vapeadores",
            v: "Solo en cabina o en la persona, y prohibido cargarlos a bordo.",
          },
          {
            k: "Bebidas alcohólicas de 24 a 70 %",
            v: "Hasta 5 litros por persona, en su envase de venta. Por debajo del 24 % no están reguladas; por encima del 70 % no van.",
          },
          {
            k: "Aerosoles y artículos de tocador",
            v: "De uso personal, con límite de cantidad total por persona.",
          },
          {
            k: "Encendedor o fósforos de seguridad",
            v: "Uno, en la persona. Nunca en el equipaje.",
          },
          {
            k: "Oxígeno o gas de uso médico",
            v: "Con aprobación del explotador.",
          },
          {
            k: "Munición",
            v: "Solo en equipaje facturado, limitada, bien embalada y con aprobación del explotador. Nunca en cabina.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Esta lista es para estudiar",
        text: "Los valores exactos (vatios-hora, gramos, litros, número de unidades) salen de la Tabla 8-1 del Doc 9284, Parte 8, y de la sección 2.3 de la IATA DGR en su edición vigente, y de la política de tu explotador. Aquí están resumidos para aprender la regla, no para aplicarla en mostrador.",
      },
      { kind: "sub", text: "Dónde se le informa al pasajero" },
      {
        kind: "p",
        text: "El reglamento no confía en que el pasajero sepa. Le obliga al explotador y al aeródromo a decírselo, en seis momentos, y en dos de ellos el trámite no se puede completar si el pasajero no confirma que entendió.",
      },
      {
        kind: "secuencia",
        numerada: true,
        orientacion: "vertical",
        items: [
          "En el punto de compra del billete. Por internet, en texto o ilustración, y la compra no se completa si el pasajero no indica que comprendió las restricciones (175.705 (a)).",
          "En el aeropuerto, con avisos destacados y suficientes donde se venden pasajes, en el despacho y en las zonas de embarque, con ejemplos visuales de lo prohibido (175.705 (b)).",
          "En el despacho a distancia: la presentación no se completa sin la confirmación del pasajero (175.705 (d)).",
          "En el autoservicio del aeropuerto: la información va en ilustración y el trámite no se completa sin confirmación (175.705 (e)).",
          "En la recepción del equipaje: el personal obtiene confirmación de que no lleva mercancías no permitidas y pregunta por cualquier artículo sospechoso (175.705 (f)).",
          "En el equipaje excedente que va como carga: la misma confirmación, a quien lo entrega (175.705 (g)).",
        ],
      },
      {
        kind: "norma",
        ref: "RAC 175.705 (h)",
        texto:
          "Todo explotador facilitará en su manual de operaciones información apropiada que permita a la tripulación de vuelo cumplir sus responsabilidades en lo relativo al transporte de mercancías peligrosas, y facilitará asimismo instrucciones acerca de las medidas que haya que adoptar en el caso de que surjan situaciones de emergencia que involucren mercancías peligrosas.",
      },
      {
        kind: "enLaOperacion",
        momento: "En el embarque",
        texto:
          "El pasajero que discute en la puerta porque su maleta de mano baja a bodega con un power bank dentro: la respuesta no es una opinión tuya ni de la auxiliar. Es la Tabla 8-1 y el procedimiento del explotador. El power bank sale de la maleta y sube a cabina; el portátil que se queda dentro va apagado. Si el pasajero no lo acepta, la maleta no baja.",
      },
      {
        kind: "ponAPrueba",
        preguntas: [
          {
            q: "Un tripulante lleva en su maleta un artículo de la clase 2. ¿Qué aplica?",
            ref: "RAC 175.151 y 175.715",
            opciones: [
              {
                t: "La misma regla que a un pasajero: prohibido salvo que esté en la Tabla 8-1 y cumpla todos sus requisitos.",
                ok: true,
                fb: "El 175.151 nombra expresamente a «los pasajeros o las tripulaciones», y el 175.715 fija la única excepción. Si se descubre, el explotador debe notificarlo (175.625).",
              },
              {
                t: "Los tripulantes están exceptuados por ser personal de la operación.",
                fb: "La excepción del 175.145 es para objetos y sustancias exigidos por aeronavegabilidad y reglamentos de operación, no para el equipaje personal del tripulante.",
              },
              {
                t: "Depende de si el vuelo es nacional o internacional.",
                fb: "La regla no distingue tipo de vuelo. Lo que sí cambia según la ruta son las discrepancias notificadas por los Estados (lección 10).",
              },
            ],
          },
          {
            q: "¿En qué momento debe recibir el pasajero la información sobre lo que no puede llevar?",
            ref: "RAC 175.705 (a) a (g)",
            opciones: [
              {
                t: "En el mostrador, cuando factura.",
                fb: "El mostrador es uno de seis momentos, y no el primero. La información empieza en el punto de compra del billete y sigue en los avisos del aeropuerto, el despacho a distancia, el autoservicio y el equipaje excedente.",
              },
              {
                t: "En el punto de compra, en avisos del aeropuerto, en el despacho a distancia, en el autoservicio, en la recepción del equipaje y en el equipaje excedente como carga.",
                ok: true,
                fb: "Seis momentos, y en la compra por internet, el despacho a distancia y el autoservicio el trámite no se puede completar sin que el pasajero confirme que entendió.",
              },
              {
                t: "Solo en el sitio web del explotador.",
                fb: "El sitio web es parte de la obligación (175.705 (c)), pero no la agota: los avisos físicos con ejemplos visuales y la confirmación en el despacho son obligatorios también.",
              },
            ],
          },
          {
            q: "En la recepción del equipaje, ¿basta con preguntarle al pasajero si lleva algo peligroso?",
            ref: "RAC 175.705 (f)",
            opciones: [
              {
                t: "Sí: la confirmación del pasajero libera al explotador.",
                fb: "La confirmación es obligatoria, pero el mismo inciso exige además obtener confirmación acerca del contenido de cualquier artículo que se sospeche pueda contener mercancías peligrosas no permitidas.",
              },
              {
                t: "No: además hay que pedir confirmación del contenido de cualquier artículo sospechoso.",
                ok: true,
                fb: "Dos preguntas, no una: «¿lleva mercancías peligrosas no permitidas?» y «¿qué contiene esto?» ante cualquier artículo que haga dudar. La Nota 1 del 175.705 recuerda que muchos artículos que parecen inocuos las contienen.",
              },
              {
                t: "No hay que preguntar nada: para eso está el control de seguridad.",
                fb: "La requisa previene que entren; la confirmación en el despacho es una obligación distinta y expresa del 175.705 (f).",
              },
            ],
          },
        ],
      },
      {
        kind: "summary",
        items: [
          "Prohibición general para pasajeros y tripulantes; la única excepción es la Tabla 8-1 (175.151 y 175.715). La tripulación no tiene fuero.",
          "Repuestos y power banks solo en cabina; vapeadores sin cargar; alcohol de 24 a 70 % hasta 5 L; munición solo facturada y con aprobación. Cifras: verificar en la edición vigente.",
          "Seis momentos de información al pasajero (175.705), tres con confirmación obligatoria.",
        ],
      },
    ],
  },

  // ── 12 ──────────────────────────────────────────────────────────────────
  {
    n: 12,
    title: "Mercancías peligrosas ocultas",
    kicker: "Lo que nadie declaró",
    minutes: 6,
    blocks: [
      {
        kind: "p",
        text: "«Oxy Canisters, Empty». Esa descripción general es exactamente una mercancía peligrosa oculta: carga declarada con un nombre vago que debió declararse como lo que era. El riesgo del sistema no es la carga declarada, que llega con papeles, etiquetas y estiba: es la que nadie declaró.",
      },
      {
        kind: "norma",
        ref: "RAC 175.001 (a) (32)",
        titulo: "Mercancía peligrosa oculta",
        texto:
          "Carga declarada con descripción general que debería haber sido declarada como mercancía peligrosa, o mercancías peligrosas prohibidas o en cantidades mayores al límite permitido presente en el equipaje o junto al cuerpo del pasajero o tripulante, o presente en ítem de correo.",
      },
      {
        kind: "p",
        text: "El 175.610 (a) obliga a que el personal de reservas, ventas, recepción de carga y recepción de pasajeros tenga a mano tres cosas: las **descripciones generales** que suelen usarse para artículos que pueden esconder mercancías peligrosas, **otras indicaciones** de que puede haberlas (etiquetas, marcas) y la lista de lo que el pasajero **sí** puede llevar. La lista oficial de descripciones generales está en el Capítulo 6 de la Parte 7 de las Instrucciones Técnicas.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Descripciones que deben hacerte dudar",
            ref: "175.1010 (a) (9), 175.610 (a) (1)",
            puntos: [
              "«Repuestos de aeronave», «material de la compañía»: pueden traer generadores de oxígeno, extintores, baterías, aerosoles.",
              "«Motor», «vehículo», «equipo accionado con acumulador»: el RAC los nombra como objetos de la clase 9.",
              "«Equipo de salvamento de inflado automático»: ejemplo expreso de la clase 9.",
              "«Muestras», «material de diagnóstico»: pueden ser 6.1, 6.2, o ir con hielo seco (clase 9).",
              "«Equipo de campamento», «herramientas», «kit de reparación»: combustibles, aerosoles, adhesivos, baterías. Descripciones habituales de la lista de la Parte 7, Capítulo 6.",
            ],
          },
          {
            titulo: "Otras indicaciones",
            ref: "175.610 (a) (2)",
            puntos: [
              "Una etiqueta de riesgo o de manipulación en una caja que no viene declarada como mercancía peligrosa.",
              "Un número UN o una marca de embalaje homologado en el cartón.",
              "Marcas de «este lado arriba», «manténgase alejado del calor», «líquido».",
              "Olor, manchas, humedad, hinchazón, calor al tacto.",
            ],
          },
        ],
      },
      {
        kind: "norma",
        ref: "RAC 175.610 (c)",
        texto:
          "Para evitar que los pasajeros introduzcan en la aeronave, dentro de su equipaje, o lleven en su persona, mercancías peligrosas ocultas que éstos tienen prohibido transportar, el personal encargado de la recepción y las organizaciones o empresas que aceptan equipaje excedente como carga deberían pedir al pasajero, o a la persona que actúa en nombre del pasajero, confirmación de que no llevan o despachan mercancías peligrosas que no estén permitidas, y obtener además confirmación del contenido de cualquier artículo que sospechen pueda contener mercancías peligrosas cuyo transporte no esté permitido.",
      },
      {
        kind: "ponAPrueba",
        titulo: "¿Puede esconder una mercancía peligrosa?",
        preguntas: [
          {
            q: "Una caja de carga declarada como «motor de combustión interna».",
            ref: "RAC 175.1010 (a) (9)",
            opciones: [
              {
                t: "Sí.",
                ok: true,
                fb: "El RAC lo cita como ejemplo de objeto de la clase 9. Puede traer combustible residual, batería y aceite.",
              },
              {
                t: "No.",
                fb: "El RAC lo nombra expresamente entre los objetos de la clase 9. «Motor» es una descripción general clásica.",
              },
            ],
          },
          {
            q: "Un envío de «equipo de salvamento de inflado automático».",
            ref: "RAC 175.1010 (a) (9)",
            opciones: [
              {
                t: "Sí.",
                ok: true,
                fb: "Ejemplo expreso de objeto de la clase 9: lleva un cartucho de gas comprimido y a veces pirotecnia.",
              },
              {
                t: "No.",
                fb: "Un chaleco o una balsa de inflado automático traen gas comprimido. El RAC los nombra como clase 9.",
              },
            ],
          },
          {
            q: "Unas «muestras de laboratorio» sin más descripción, en una caja fría.",
            ref: "RAC 175.125 (f) y 175.1010 (a) (6) y (9)",
            opciones: [
              {
                t: "Sí.",
                ok: true,
                fb: "Pueden ser sustancias infecciosas (6.2) o tóxicas (6.1), y la caja fría casi seguro trae hielo seco, que es clase 9. Es la descripción vaga por excelencia.",
              },
              {
                t: "No.",
                fb: "«Muestras» es una descripción general típica: puede esconder 6.1, 6.2 y el hielo seco (clase 9) que las refrigera.",
              },
            ],
          },
          {
            q: "Un envío declarado como «material magnetizado» con su etiqueta de manipulación.",
            ref: "RAC 175.1010 (a) (9) y Apéndice 1, Figura 1.22",
            opciones: [
              {
                t: "Sí, es mercancía peligrosa, pero no está oculta: viene declarada.",
                ok: true,
                fb: "Es clase 9 cuando al embalarlo tiene un campo de 0,159 A/m o más a 2,1 m del bulto, y tiene etiqueta propia. Como viene declarada y etiquetada, es lo contrario de una oculta.",
              },
              {
                t: "No es mercancía peligrosa.",
                fb: "Sí lo es: el RAC la nombra en la clase 9 y le da etiqueta de manipulación. Lo que no es, es oculta: viene declarada.",
              },
            ],
          },
          {
            q: "Una caja de «documentos impresos y papelería».",
            ref: "RAC 175.610 (c) y 175.705 (f)",
            opciones: [
              {
                t: "Sí, siempre hay que sospechar.",
                fb: "El control funciona al revés: se pide confirmación del contenido de lo que haga dudar, no se presume peligro donde no lo hay. Lo sospechoso es la descripción vaga, no el producto obvio.",
              },
              {
                t: "No, por sí misma.",
                ok: true,
                fb: "Papel es papel. El personal debe pedir confirmación del contenido de cualquier artículo que sospeche, y una caja de documentos no lo es. Sospechar de todo es tan inútil como no sospechar de nada.",
              },
            ],
          },
        ],
      },
      { kind: "sub", text: "Tres cosas que se oyen y no son verdad" },
      {
        kind: "fichas",
        columnas: 3,
        items: [
          {
            titulo: "«Si el explotador no transporta mercancías peligrosas, este tema no le aplica»",
            ref: "175.220 (f) y 175.305 (b)",
            puntos: [
              "Al contrario: debe tener en su manual los procedimientos para evitar que entren sin declarar, y capacitar igual a su personal.",
            ],
          },
          {
            titulo: "«Basta con preguntarle al pasajero si lleva algo peligroso»",
            ref: "175.610 (c) y 175.705 (f)",
            puntos: [
              "Además hay que obtener confirmación del contenido de cualquier artículo que se sospeche pueda contener mercancías peligrosas no permitidas.",
            ],
          },
          {
            titulo: "«Encontrar una oculta se resuelve bajándola del vuelo»",
            ref: "175.625 y 175.001 (a) (41)",
            puntos: [
              "También hay que notificarla: descubrir una mercancía peligrosa oculta es un suceso con mercancías peligrosas. Lo ves en la lección 16.",
            ],
          },
        ],
      },
      {
        kind: "enLaOperacion",
        momento: "En la rampa",
        texto:
          "Una descripción vaga en el manifiesto es una pregunta, no una respuesta. «Repuestos», «equipo», «muestras», «material de la compañía»: cada una de esas palabras puede tapar un generador de oxígeno, una batería o un aerosol. Los generadores de ValuJet viajaron como «canisters» vacíos. Si lo que sube a tu avión tiene nombre de cajón de sastre, alguien tiene que decirte qué hay dentro.",
      },
      {
        kind: "summary",
        items: [
          "Oculta = declarada con descripción general que debió declararse como peligrosa, o prohibida o en exceso en equipaje, persona o correo (175.001 (a) (32)).",
          "El personal tiene a mano las descripciones generales, las otras indicaciones y lo que el pasajero sí puede llevar (175.610 (a)).",
          "Ante un artículo sospechoso se pide confirmación del contenido, no solo «¿lleva algo peligroso?» (175.610 (c)).",
          "Descubrir una oculta es un suceso: se notifica.",
        ],
      },
    ],
  },
]
