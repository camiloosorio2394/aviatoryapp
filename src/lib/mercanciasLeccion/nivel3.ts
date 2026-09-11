/**
 * Nivel 3 · Transporte aéreo: qué puede volar y qué no, los límites que solo
 * añade cada país, lo que llevan pasajeros y tripulantes, y las mercancías
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
        titulo: "El criterio de fondo",
        texto:
          "En ningún caso deberán transportarse por aeronaves los artículos o sustancias que, cuando se presentan para el transporte, son susceptibles de explotar, reaccionar peligrosamente, producir llamas o desarrollar de manera peligrosa calor o emisiones de gases o vapores tóxicos, corrosivos o inflamables en las condiciones que se observan habitualmente durante el transporte.",
      },
      {
        kind: "p",
        text: "Ese es el criterio material: aunque un artículo no esté nominado en la lista, si se comporta así en las condiciones normales del transporte, no vuela. La propia norma lo advierte: la lista no es exhaustiva.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "1 · Prohibido en todos los casos",
            puntos: [
              "Lo que las Instrucciones Técnicas nombran, por su nombre o por descripción genérica, como prohibido cualesquiera que sean las circunstancias.",
              "No se transporta en ninguna aeronave. Ni con dispensa.",
              "En la lista aparece con la palabra «Prohibido» en las columnas 2 y 3.",
            ],
          },
          {
            titulo: "2 · Prohibido salvo dispensa",
            puntos: [
              "Lo que figura como prohibido en circunstancias normales, y los animales vivos infectados.",
              "Solo vuela con dispensa de la AAC, o con aprobación otorgada por los Estados involucrados cuando las Instrucciones lo prevén.",
              "En la lista aparece con «Prohibido» en las columnas de pasajeros o de carga.",
            ],
          },
          {
            titulo: "3 · Permitido con aprobación",
            puntos: [
              "Cuando las Instrucciones Técnicas lo prevén expresamente, la AAC puede otorgar aprobación si se logra un nivel de seguridad equivalente.",
              "Casos típicos: extrema urgencia, cuando otras modalidades de transporte no son apropiadas, o cuando cumplir todas las condiciones sería contrario al interés público.",
            ],
          },
          {
            titulo: "4 · Permitido cumpliendo las Instrucciones",
            puntos: [
              "El caso normal: únicamente se transportan mercancías peligrosas cumpliendo el reglamento y las especificaciones y procedimientos de las Instrucciones Técnicas.",
              "Es lo que hace el 99 % de los envíos que ves en un NOTOC.",
            ],
          },
        ],
      },
      {
        kind: "hueco",
        rotulo: "MP-FLJ-02 · Flujograma · 3:4 · 1200×1600 · SVG",
        descripcion:
          "Árbol de decisión vertical con ramas sí/no: ¿está prohibido en todas las circunstancias? → ¿figura como prohibido en circunstancias normales? → ¿las Instrucciones prevén aprobación? → ¿hay dispensa? → transporte normal cumpliendo las Instrucciones.",
        alto: 420,
        anchoMax: 520,
      },
      {
        kind: "definicion",
        text: "Cómo se lee la lista: «Prohibido» en las columnas 2 y 3 es prohibido en todos los casos; «Prohibido» en las columnas de aeronave de pasajeros o de carga es prohibido en circunstancias normales, y ahí cabe la dispensa o la aprobación.",
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
        kind: "piensaComoPiloto",
        momento: "Te llaman del centro de operaciones",
        situacion:
          "Un cliente importante quiere mandar en tu vuelo un artículo que en la lista de mercancías peligrosas aparece como **«Prohibido»** en la columna de aeronave de pasajeros. El despachador te dice que van a pedir «un permiso especial» y pregunta si tú ves algún problema.",
        pregunta: "¿Qué preguntas tú antes de opinar?",
        claves: [
          "**¿Prohibido en qué columna?** Si figura como prohibido en circunstancias normales, cabe una dispensa. Si figura como prohibido cualesquiera que sean las circunstancias, no cabe nada: no vuela.",
          "**¿Es aprobación o dispensa?** Aprobación solo si las Instrucciones previeron ese caso. Si no lo previeron, lo que toca es dispensa, y la dispensa tiene motivos tasados.",
          "**¿Quién la da?** La autoridad de aviación civil, no el explotador ni el cliente. Y se pide, no se supone.",
          "**¿Y si sale?** Sale con condiciones escritas, y esas condiciones acaban llegando a mi información de vuelo. Quiero verlas.",
        ],
        cierre:
          "«Permiso especial» no es una categoría. Aprobación, dispensa y excepción son tres cosas distintas, y la diferencia decide si ese envío existe o no.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué mercancías peligrosas están prohibidas en el transporte aéreo?",
            respuesta:
              "Hay dos niveles de prohibición. Primero, un criterio material: lo que al presentarse para el transporte pueda explotar, reaccionar peligrosamente, producir llamas o desprender calor o gases tóxicos, corrosivos o inflamables en las condiciones normales de transporte no vuela, esté o no en la lista. Y segundo, lo que las Instrucciones nombran expresamente como prohibido, sea en todas las circunstancias o solo en circunstancias normales, en cuyo caso cabe dispensa.",
            claves: ["Criterio material aunque no esté en la lista", "Prohibido en todas las circunstancias", "Prohibido en circunstancias normales, salvo dispensa"],
          },
          {
            nivel: "interpretacion",
            q: "La lista no es exhaustiva. ¿Qué implica eso?",
            respuesta:
              "Que no estar en la lista no es un salvoconducto. La norma lo dice expresamente: ciertas mercancías que corresponden a las descripciones de prohibición se incluyeron con la palabra «Prohibido», pero la lista no es exhaustiva. Si un artículo cumple el criterio material, está prohibido aunque nadie lo haya escrito.",
            claves: ["La lista no es exhaustiva", "El criterio material manda", "No estar listado no autoriza"],
          },
          {
            nivel: "situacion",
            q: "Un envío requiere dispensa y el explotador la ha obtenido. ¿Qué esperas ver tú como comandante?",
            respuesta:
              "Espero que la mercancía aparezca en mi información escrita como cualquier otra, y espero que las condiciones bajo las que se otorgó la dispensa estén reflejadas en los procedimientos del vuelo. Una dispensa no hace desaparecer el riesgo: lo autoriza bajo condiciones que buscan un nivel de seguridad equivalente. Si esas condiciones me afectan, tengo que conocerlas antes de salir.",
            claves: ["Aparece en la información escrita", "La dispensa impone condiciones", "Nivel de seguridad equivalente"],
          },
        ],
      },
    ],
  },

  // ── 10 ──────────────────────────────────────────────────────────────────
  {
    n: 10,
    title: "Lo que cada país añade",
    kicker: "Discrepancias notificadas",
    minutes: 8,
    blocks: [
      {
        kind: "p",
        text: "Un curso genérico te enseña el Anexo 18 y las Instrucciones Técnicas. Y con eso no basta, porque encima de esa base cada Estado y cada explotador añaden lo suyo: por seguridad, por geografía, por la flota que vuela allí. Esas diferencias tienen nombre, se notifican a la OACI y se publican. Saber que existen y dónde buscarlas es lo que separa a quien estudió el reglamento de quien sabe operarlo.",
      },
      {
        kind: "definicion",
        text: "La norma reparte la tarea en dos. **El explotador** mira las diferencias de los Estados por los que opera o sobrevuela. **El expedidor** mira las de esos mismos Estados y, además, las del explotador al que entrega la carga. Tú heredas el resultado: si alguien no las miró, el bulto ya está a bordo.",
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Ver el texto completo de las discrepancias",
        bloques: [
          {
            kind: "norma",
            titulo: "Las diferencias hay que buscarlas antes, no descubrirlas después",
            texto:
              "(c) El explotador deberá cumplir con los reglamentos específicos de los Estados en los que opere o sobrevuele, teniendo en cuenta las diferencias de estos: (1) las discrepancias de cada Estado que difieran de las previstas en las Instrucciones Técnicas vigentes son las notificadas a la OACI y publicadas en las Instrucciones Técnicas. (d) El expedidor observará las diferencias de cada Estado involucrado en el transporte de la mercancía a ser expedida antes de entregar las mercancías peligrosas a un explotador. (e) El expedidor observará las diferencias notificadas por el explotador al cual pretende entregar mercancías peligrosas para su transporte.",
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Briefing de un vuelo internacional",
        situacion:
          "Sales de tu base hacia São Paulo con un envío de mercancías peligrosas declarado. Todo el papeleo está en español y viene perfecto según el reglamento de tu país.",
        pregunta: "¿Qué puede fallar aunque en tu país esté todo bien?",
        claves: [
          "Brasil tiene la discrepancia **BR 6**: en el transporte internacional con origen en Brasil exige inglés, y en el interior brasileño, portugués. El Estado de destino impone sus condiciones.",
          "Si el envío lleva material radiactivo, Brasil exige además aprobación de la **CNEN**, que no es la autoridad aeronáutica. Ningún permiso de mi país lo sustituye.",
          "Quién tenía que mirar eso: el **expedidor**, antes de entregar la carga, y el **explotador**, por los Estados de la ruta. Yo no reviso discrepancias bulto a bulto.",
          "Lo que sí me toca: saber que existen, para no dar por hecho que lo válido en casa vale en destino.",
        ],
        cierre:
          "El error clásico no es incumplir la norma propia: es cumplirla y suponer que con eso basta en toda la ruta.",
      },
      { kind: "sub", text: "Cuatro Estados de la región, cuatro añadidos" },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Brasil · idioma",
            puntos: [
              "Todo el transporte interior en territorio brasileño: portugués en las marcas y en los documentos.",
              "Internacional con origen en Brasil: además, inglés.",
            ],
          },
          {
            titulo: "Brasil · radiactivo y plazos",
            puntos: [
              "El radiactivo desde o dentro de Brasil requiere aprobación de la Comisión nacional de energía nuclear (CNEN).",
              "Las solicitudes a la ANAC: mínimo 15 días antes del vuelo para aprobaciones, 60 para dispensas.",
            ],
          },
          {
            titulo: "Colombia · flota",
            puntos: [
              "Prohibido todo tipo de mercancías peligrosas en aeronaves de aviación civil privada.",
              "Prohibida la clase 3 combustibles en monomotores, salvo lo que se permite llevar a pasajeros y tripulantes.",
            ],
          },
          {
            titulo: "Colombia · radiactivo",
            puntos: [
              "El expedidor presenta al explotador la autorización del Servicio Geológico Colombiano, Grupo de Seguridad Nuclear y Protección Radiológica.",
              "Mismo patrón que Brasil con la CNEN: el permiso aeronáutico no reemplaza al nuclear.",
            ],
          },
        ],
      },
      {
        kind: "hueco",
        rotulo: "MP-DIA-02 · Mapa · 4:3 · 1200×900 · SVG",
        descripcion:
          "Mapa de Suramérica en el estilo de Aviatory con cuatro chinchetas: Brasil (BR 6 idioma), Colombia (monomotores), Chile (LAN LA-05) y Argentina (AR-09 teléfono 24 h). Una ruta punteada cruzando tres de ellos para que se vea que un solo vuelo acumula discrepancias.",
        alto: 340,
      },
      { kind: "sub", text: "Colombia, el ejemplo trabajado" },
      {
        kind: "p",
        text: "Vamos a fondo con un país, porque el ejercicio es el mismo en cualquiera: abre tu reglamento nacional, busca qué añade sobre la base de las Instrucciones y apúntalo. Estas son las de Colombia, que además son preguntas frecuentes de entrevista allí.",
      },
      {
        kind: "norma",
        texto:
          "(a) Por razones de seguridad se prohíbe el transporte de todo tipo de mercancías peligrosas por vía aérea, en aeronaves clasificadas dentro de la Aviación Civil Privada. (b) Salvo lo señalado en […], por razones de seguridad se prohíbe el transporte de mercancías peligrosas pertenecientes a la Clase 3 combustibles, por vía aérea, en aeronaves monomotores y las clasificadas dentro de la Aviación Civil Privada.",
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Ver las ocho limitaciones que Colombia añade",
        bloques: [
        {
          kind: "fichas",
          columnas: 3,
          items: [
            {
              titulo: "Aviación civil privada",
              puntos: ["Prohibido el transporte de todo tipo de mercancías peligrosas."],
            },
            {
              titulo: "Monomotores · clase 3",
              puntos: [
                "Prohibida la clase 3 combustibles, salvo lo que se permite llevar a pasajeros y tripulantes.",
              ],
            },
            {
              titulo: "Monomotores · otras clases",
              puntos: [
                "Con aprobación de la autoridad, previa verificación de las condiciones de seguridad del explotador.",
                "La autoridad determina los aeródromos donde no se aprueba esa operación.",
              ],
            },
            {
              titulo: "Ala rotatoria",
              puntos: [
                "La AAC puede aprobar operar sin cumplir todos los requisitos habituales, con las condiciones que fijan las Instrucciones. Es regional: el LAR lo recoge igual.",
              ],
            },
            {
              titulo: "Carga externa en helicóptero",
              puntos: ["Cumple el manual de operaciones del helicóptero, el reglamento nacional y las Instrucciones."],
            },
            {
              titulo: "Correo aéreo",
              puntos: [
                "No son admisibles, excepto: muestras de pacientes; sustancias infecciosas y el hielo seco que las refrigera, con declaración del expedidor; y material radiactivo con actividad de hasta una décima parte del límite que fijan las Instrucciones.",
                "El explotador necesita autorización en sus OpSpecs para llevar mercancías peligrosas por correo.",
              ],
            },
            {
              titulo: "Material radiactivo",
              puntos: [
                "Sujeto a los requisitos de las Instrucciones y del Reglamento del OIEA.",
                "El expedidor presenta al explotador la autorización del Servicio Geológico Colombiano, Grupo de Seguridad Nuclear y Protección Radiológica.",
              ],
            },
            {
              titulo: "Seguro",
              puntos: [
                "El explotador acredita ante la autoridad que sus seguros de responsabilidad cubren los daños que provengan del transporte de mercancías peligrosas.",
              ],
            },
          ],
        },
        ],
      },
      { kind: "sub", text: "Y el explotador también pone las suyas" },
      {
        kind: "p",
        text: "No solo los Estados: las aerolíneas notifican las suyas y también se publican en las Instrucciones. Casi siempre son más restrictivas que la norma, porque nacen de algo que le pasó a esa compañía. Si tu explotador adopta condiciones propias, las identifica en su manual de operaciones y la autoridad las notifica a la OACI. Lee estas tres de la región y fíjate en la última.",
      },
      {
        kind: "kv",
        items: [
          {
            k: "BR 6 · Brasil",
            v: "«Para todo el transporte del interior en territorio brasileño, debe utilizarse el idioma portugués en todas las marcas y en todos los documentos de transporte de mercancías peligrosas. Para el transporte internacional con origen en territorio brasileño, debe utilizarse el inglés en las marcas y en los documentos, además de los idiomas exigidos por los Estados de tránsito y destino.»",
          },
          {
            k: "AR-09 · Aerolíneas Argentinas",
            v: "«El expedidor debe proporcionar un número telefónico de emergencia de 24 horas para llamar a una persona o agencia que sepa sobre los peligros, características y medidas que han de adoptarse en caso de accidente o incidente a raíz de cada una de las mercancías peligrosas que se transportan.» El número va en la declaración del expedidor, precedido de «Contacto de emergencia» o «Número de 24 horas».",
          },
          {
            k: "BR 3 · Brasil",
            v: "«Los explotadores de servicios aéreos que transportan mercancías peligrosas deben presentar un informe mensual de todas las mercancías peligrosas transportadas desde o dentro del Brasil para el décimo día laborable del mes siguiente a más tardar.»",
          },
          {
            k: "LA-05 · LAN Airlines",
            v: "«Los generadores de oxígeno químicos se aceptarán únicamente para el transporte cuando en el embalaje o la documentación adjunta se confirme que el generador de oxígeno no tiene una fecha de expiración vencida o que ha sido utilizado.» Vuelve a leer la lección 1: esta discrepancia es ValuJet convertido en regla de una aerolínea de la región.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "De dónde salen estos extractos",
        text: "Son textuales de la lista de discrepancias notificadas por los Estados y por los explotadores, en la edición 2011-2012 de las Instrucciones Técnicas. Se citan como muestra de qué forma tienen, no como la lista vigente: cambian con cada edición. Lo que no cambia es que existen y que hay que buscarlas en la edición en vigor y en el manual de tu explotador.",
      },
      {
        kind: "enLaOperacion",
        momento: "En el despacho de un vuelo internacional",
        texto:
          "La misma carga, el mismo avión y la misma clase pueden tener requisitos distintos según el Estado de origen, de tránsito o de destino. Por eso el manual de operaciones y la ruta importan tanto como la clase. Si sales hacia Brasil con mercancías peligrosas y las marcas van solo en español, el problema no está en tu país: está en la discrepancia BR 6, y quien la tenía que mirar era el expedidor antes de entregar el bulto.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué son las discrepancias notificadas y dónde se publican?",
            respuesta:
              "Son las diferencias que un Estado o un explotador aplica respecto de las Instrucciones Técnicas. Se notifican a la OACI y se publican en las propias Instrucciones. El explotador debe cumplir las de los Estados en los que opere o sobrevuele, y el expedidor las de todos los Estados involucrados y las del explotador al que entrega la carga.",
            claves: ["Diferencias de Estados y de explotadores", "Se notifican a la OACI", "Se publican en las Instrucciones"],
          },
          {
            nivel: "interpretacion",
            q: "¿Por qué una aerolínea tendría reglas más restrictivas que la norma?",
            respuesta:
              "Casi siempre porque le pasó algo. Las discrepancias de explotador nacen de la experiencia propia: LAN, por ejemplo, solo acepta generadores de oxígeno químicos si consta que no están vencidos ni usados, que es exactamente la lección de ValuJet convertida en regla de empresa. Un explotador puede ser más restrictivo que la norma; nunca menos.",
            claves: ["Nacen de la experiencia propia", "Más restrictivas, nunca más permisivas", "Se identifican en el manual de operaciones"],
          },
          {
            nivel: "situacion",
            q: "Vuelas a un país cuyo reglamento no conoces y llevas mercancías peligrosas. ¿De qué te tienes que preocupar?",
            respuesta:
              "De que alguien haya mirado las discrepancias de ese Estado antes de que la carga saliera. No es mi trabajo revisarlas bulto a bulto, pero sí saber que existen y que afectan cosas concretas: el idioma de las marcas, los plazos para pedir aprobaciones, los permisos de organismos que no son la autoridad aeronáutica. Si salgo hacia Brasil y las marcas van solo en español, el problema es la discrepancia BR 6 y quien tenía que mirarla era el expedidor.",
            claves: ["El explotador cumple las de los Estados de la ruta", "El expedidor las mira antes de entregar", "Idioma, plazos, permisos de otros organismos"],
          },
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
        text: "La carga declarada llega con papeles. Lo que sube en el equipaje de 180 pasajeros, no. Por eso el reglamento le dedica un capítulo entero a lo que un pasajero o un tripulante puede llevar encima, en la maleta de mano y en la facturada.",
      },
      {
        kind: "norma",
        texto:
          "Salvo en aquellas situaciones contempladas en las Instrucciones Técnicas, las mercancías peligrosas no deben ser transportadas por los pasajeros o las tripulaciones como o dentro del equipaje facturado, como o dentro del equipaje de mano, o consigo mismo. Está prohibido el transporte de mercancías peligrosas como equipaje facturado, equipaje de mano o en la persona, por pasajeros o tripulantes, con excepción de aquellas mercancías descritas en […] de las Instrucciones Técnicas, siempre que se cumplan todos los requisitos establecidos por dicha tabla.",
      },
      {
        kind: "definicion",
        text: "La regla es prohibición general con una sola excepción: lo que las Instrucciones Técnicas permiten expresamente. Y el tripulante está sujeto exactamente a la misma regla que el pasajero. Tu maleta no tiene fuero.",
      },
      {
        kind: "hueco",
        rotulo: "MP-TAB-01 · Tabla 8-1 · Pendiente de fuente",
        descripcion:
          "Tabla interactiva y filtrable con las mercancías admitidas a pasajeros y tripulantes y sus condiciones: equipaje de mano, facturado, en la persona, aprobación del explotador y del comandante. Requiere cargar la Parte 8 de las Instrucciones Técnicas vigentes; no se incluye contenido para no publicar datos sin fuente.",
        alto: 220,
      },
      { kind: "sub", text: "Los casos que más se preguntan" },
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
        text: "Los valores exactos (vatios-hora, gramos, litros, número de unidades) salen de las Instrucciones Técnicas y de la DGR de la IATA en su edición vigente, y de la política de tu explotador. Aquí están resumidos para aprender la regla, no para aplicarla en mostrador.",
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
          "En el punto de compra del billete. Por internet, en texto o ilustración, y la compra no se completa si el pasajero no indica que comprendió las restricciones.",
          "En el aeropuerto, con avisos destacados y suficientes donde se venden pasajes, en el despacho y en las zonas de embarque, con ejemplos visuales de lo prohibido.",
          "En el despacho a distancia: la presentación no se completa sin la confirmación del pasajero.",
          "En el autoservicio del aeropuerto: la información va en ilustración y el trámite no se completa sin confirmación.",
          "En la recepción del equipaje: el personal obtiene confirmación de que no lleva mercancías no permitidas y pregunta por cualquier artículo sospechoso.",
          "En el equipaje excedente que va como carga: la misma confirmación, a quien lo entrega.",
        ],
      },
      {
        kind: "norma",
        texto:
          "Todo explotador facilitará en su manual de operaciones información apropiada que permita a la tripulación de vuelo cumplir sus responsabilidades en lo relativo al transporte de mercancías peligrosas, y facilitará asimismo instrucciones acerca de las medidas que haya que adoptar en el caso de que surjan situaciones de emergencia que involucren mercancías peligrosas.",
      },
      {
        kind: "enLaOperacion",
        momento: "En el embarque",
        texto:
          "El pasajero que discute en la puerta porque su maleta de mano baja a bodega con un power bank dentro: la respuesta no es una opinión tuya ni de la auxiliar. La dan las Instrucciones Técnicas y el procedimiento del explotador. El power bank sale de la maleta y sube a cabina; el portátil que se queda dentro va apagado. Si el pasajero no lo acepta, la maleta no baja.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En el mostrador, de uniforme",
        situacion:
          "Vas de pasajero a recoger un avión en otra base. Llevas en la maleta que vas a facturar tu linterna de inspección con pilas de litio de repuesto, un encendedor y una botella de 500 ml de un producto de limpieza de visores.",
        pregunta: "¿Qué de eso no puede ir donde lo has puesto?",
        claves: [
          "**Los repuestos de litio, no.** Las baterías de repuesto y los power banks van en cabina, nunca facturados: si entran en fuga térmica en bodega, nadie interviene.",
          "**El encendedor, tampoco.** Va en la persona, y uno solo. Facturado no.",
          "**El producto de limpieza depende de lo que sea.** Si es inflamable, las Instrucciones Técnicas marcan qué cabe y en qué cantidad, y 500 ml puede pasarse.",
          "Y lo importante: **ir de uniforme no cambia nada**. La prohibición alcanza a pasajeros y a tripulantes por igual.",
        ],
        cierre:
          "La tripulación no tiene fuero. Es de las preguntas de entrevista más frecuentes, y es de las que se contestan mal por costumbre.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué puede llevar un pasajero en materia de mercancías peligrosas?",
            respuesta:
              "La regla general es la prohibición: ni en equipaje facturado, ni de mano, ni en la persona. La única excepción es lo que las Instrucciones Técnicas permiten expresamente, y siempre con todas las condiciones que imponen: cantidades, si va en cabina o facturado, y si hace falta aprobación del explotador.",
            claves: ["Prohibición general", "Única excepción: lo que permiten las Instrucciones", "Con todas sus condiciones"],
          },
          {
            nivel: "interpretacion",
            q: "¿Por qué los power banks solo pueden ir en cabina?",
            respuesta:
              "Porque una batería de litio en fuga térmica hay que enfriarla, y para enfriarla hay que llegar a ella. En cabina alguien lo ve, lo huele y actúa en segundos. En bodega, hasta que salta un detector puede haber pasado mucho tiempo y la reacción se ha propagado a las celdas vecinas.",
            claves: ["Fuga térmica", "En cabina se detecta y se interviene", "En bodega no se puede alcanzar"],
          },
          {
            nivel: "situacion",
            q: "Un tripulante te dice que él sí puede llevar cosas que un pasajero no, porque va trabajando. ¿Qué le respondes?",
            respuesta:
              "Que se equivoca. La norma prohíbe el transporte de mercancías peligrosas a bordo tanto a pasajeros como a miembros de la tripulación, en equipaje facturado, de mano o en la persona, y la excepción es la misma para los dos. Lo que la tripulación sí tiene es formación para saberlo, que es justamente por lo que se le exige más, no menos.",
            claves: ["La tripulación no tiene fuero", "Misma excepción que el pasajero", "Formación no es privilegio"],
          },
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
        titulo: "Mercancía peligrosa oculta",
        texto:
          "Carga declarada con descripción general que debería haber sido declarada como mercancía peligrosa, o mercancías peligrosas prohibidas o en cantidades mayores al límite permitido presente en el equipaje o junto al cuerpo del pasajero o tripulante, o presente en ítem de correo.",
      },
      {
        kind: "p",
        text: "El reglamento obliga a que el personal de reservas, ventas, recepción de carga y recepción de pasajeros tenga a mano tres cosas: las **descripciones generales** que suelen usarse para artículos que pueden esconder mercancías peligrosas, **otras indicaciones** de que puede haberlas (etiquetas, marcas) y la lista de lo que el pasajero **sí** puede llevar. La lista oficial de descripciones generales está en las Instrucciones Técnicas.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Descripciones que deben hacerte dudar",
            puntos: [
              "«Repuestos de aeronave», «material de la compañía»: pueden traer generadores de oxígeno, extintores, baterías, aerosoles.",
              "«Motor», «vehículo», «equipo accionado con acumulador»: ejemplos expresos de objetos de la clase 9.",
              "«Equipo de salvamento de inflado automático»: ejemplo expreso de la clase 9.",
              "«Muestras», «material de diagnóstico»: pueden ser 6.1, 6.2, o ir con hielo seco (clase 9).",
              "«Equipo de campamento», «herramientas», «kit de reparación»: combustibles, aerosoles, adhesivos, baterías. Descripciones habituales de la lista oficial.",
            ],
          },
          {
            titulo: "Otras indicaciones",
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
        texto:
          "Para evitar que los pasajeros introduzcan en la aeronave, dentro de su equipaje, o lleven en su persona, mercancías peligrosas ocultas que éstos tienen prohibido transportar, el personal encargado de la recepción y las organizaciones o empresas que aceptan equipaje excedente como carga deberían pedir al pasajero, o a la persona que actúa en nombre del pasajero, confirmación de que no llevan o despachan mercancías peligrosas que no estén permitidas, y obtener además confirmación del contenido de cualquier artículo que sospechen pueda contener mercancías peligrosas cuyo transporte no esté permitido.",
      },
      { kind: "sub", text: "Tres cosas que se oyen y no son verdad" },
      {
        kind: "fichas",
        columnas: 3,
        items: [
          {
            titulo: "«Si el explotador no transporta mercancías peligrosas, este tema no le aplica»",
            puntos: [
              "Al contrario: debe tener en su manual los procedimientos para evitar que entren sin declarar, y capacitar igual a su personal.",
            ],
          },
          {
            titulo: "«Basta con preguntarle al pasajero si lleva algo peligroso»",
            puntos: [
              "Además hay que obtener confirmación del contenido de cualquier artículo que se sospeche pueda contener mercancías peligrosas no permitidas.",
            ],
          },
          {
            titulo: "«Encontrar una oculta se resuelve bajándola del vuelo»",
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
        kind: "hueco",
        rotulo: "MP-IMG-21 · Imagen real · 16:9 · 1600×900 · JPG o WebP",
        descripcion:
          "Una caja de aspecto totalmente inocente en una cinta de equipaje, con una descripción genérica escrita a mano tipo «REPUESTOS» o «MUESTRAS». Lo que enseña es que una mercancía oculta no parece peligrosa: parece carga normal. Si consigues una foto de un hallazgo real de aduanas o de una terminal de carga, mejor, con crédito.",
        alto: 300,
      },
      {
        kind: "piensaComoPiloto",
        momento: "Antes de embarcar, en el mostrador",
        situacion:
          "El agente te consulta: un pasajero factura una caja declarada como «equipo de buceo». Al pesarla suena algo metálico y rueda. El pasajero dice que son «las botellas, pero vacías».",
        pregunta: "¿Qué es lo que te tiene que hacer ruido?",
        claves: [
          "«Equipo de buceo» es una **descripción general**: exactamente el tipo de descripción que la norma obliga a tener listada como posible indicio de mercancía oculta.",
          "«Vacías» no es una categoría. Un cilindro que se declara vacío puede tener presión residual, y la palabra «vacío» sobre una caja es literalmente lo que llevaban los generadores de ValuJet.",
          "Lo que corresponde es **obtener confirmación del contenido**, no creer la respuesta. La norma obliga a pedirla cuando se sospeche.",
          "Y si resulta que llevaba algo no declarado, **eso ya es un suceso notificable** aunque nunca llegue a subir al avión.",
        ],
        cierre:
          "Las mercancías ocultas no se detectan por su aspecto: se detectan por la descripción genérica y por la respuesta que no cuadra.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué es una mercancía peligrosa oculta?",
            respuesta:
              "Carga declarada con una descripción general que debería haberse declarado como mercancía peligrosa, o mercancías peligrosas prohibidas o en cantidad superior a la permitida presentes en el equipaje o junto al cuerpo de un pasajero o tripulante, o en un envío postal.",
            claves: ["Descripción general que oculta lo que es", "También en equipaje o en la persona", "También en el correo"],
          },
          {
            nivel: "interpretacion",
            q: "¿Por qué el reglamento obliga a que el personal de reservas y de recepción tenga una lista de descripciones generales?",
            respuesta:
              "Porque las mercancías ocultas no se reconocen por su aspecto sino por cómo se describen. «Repuestos», «muestras», «equipo médico» o «material de rodaje» pueden contener perfectamente mercancías peligrosas. La lista existe para que quien recibe la carga o al pasajero sepa cuándo tiene que pedir confirmación del contenido en vez de dar por buena la descripción.",
            claves: ["No se reconocen por el aspecto", "Descripciones generales sospechosas", "Obliga a pedir confirmación"],
          },
          {
            nivel: "situacion",
            q: "En tierra descubren una mercancía peligrosa no declarada en la carga de tu vuelo y la retiran antes de embarcarla. No pasó nada. ¿Hay que notificar?",
            respuesta:
              "Sí. Descubrir una mercancía peligrosa oculta ya es un suceso con mercancías peligrosas, aunque no haya daños ni llegue a bordo. Es más: es el nivel que más información aporta al sistema, porque señala un fallo de la cadena que todavía no ha costado nada. Notificarlo hoy es el accidente que no ocurre el año que viene.",
            claves: ["Sí se notifica", "Es un suceso aunque no haya daño", "Alimenta el SMS"],
          },
        ],
      },
      {
        kind: "ponAPrueba",
        titulo: "Control del nivel 3",
        preguntas: [
          {
            q: "¿En qué se diferencia una dispensa de una aprobación?",
            opciones: [
              {
                t: "La aprobación existe cuando las Instrucciones Técnicas la prevén para ese caso; la dispensa exime de lo previsto en las Instrucciones cuando no hay referencia específica.",
                ok: true,
                fb: "La propia definición de aprobación lo aclara: si no hay una referencia específica en las Instrucciones Técnicas para otorgar una aprobación, se puede pedir una dispensa. Y la dispensa nunca procede para lo prohibido en todas las circunstancias.",
              },
              {
                t: "Son sinónimos; la diferencia es solo el nombre según el Estado.",
                fb: "El reglamento las define por separado y con efectos distintos. La aprobación existe cuando las Instrucciones la prevén para ese caso; la dispensa es la salida cuando no la prevén, y procede por extrema urgencia, porque otro modo de transporte no sea apropiado o porque cumplirlo todo sea contrario al interés público.",
              },
              {
                t: "La dispensa la da el explotador y la aprobación la autoridad.",
                fb: "Ambas las otorga la autoridad de aviación civil, no el explotador: él las pide. Y si ninguno de los criterios encaja, el Estado de sobrevuelo todavía puede otorgar la dispensa si se convence de que hay un nivel equivalente de seguridad.",
              },
            ],
          },
          {
            q: "Un artículo no aparece en la lista de mercancías peligrosas, pero en las condiciones normales de transporte produce llamas. ¿Puede volar?",
            opciones: [
              {
                t: "Sí, porque no está en la lista.",
                fb: "La lista no es exhaustiva. El criterio material prohíbe todo lo que en las condiciones habituales del transporte pueda explotar, reaccionar, producir llamas o calor o emitir vapores peligrosos.",
              },
              {
                t: "No: lo prohíbe el criterio material, esté o no en la lista.",
                ok: true,
                fb: "Es el criterio que va antes que la lista. Si algo se comporta así, no vuela, y punto.",
              },
              {
                t: "Solo con dispensa.",
                fb: "La dispensa sirve para lo prohibido en circunstancias normales, no para lo que por su comportamiento no puede transportarse en ningún caso.",
              },
            ],
          },
          {
            q: "Un laboratorio quiere enviar animales vivos infectados. ¿Qué nivel aplica?",
            opciones: [
              {
                t: "Permitido cumpliendo las Instrucciones, como cualquier sustancia infecciosa.",
                fb: "Las sustancias infecciosas embaladas sí van por el régimen normal. Los animales vivos infectados están nombrados aparte, y no en ese nivel.",
              },
              {
                t: "Prohibido salvo dispensa.",
                ok: true,
                fb: "El reglamento los nombra expresamente: los animales vivos infectados estarán prohibidos salvo dispensa de la AAC.",
              },
              {
                t: "Prohibido en todos los casos.",
                fb: "No están en el nivel absoluto: la norma deja abierta la dispensa. Lo prohibido en todos los casos es lo que las Instrucciones nombran así cualesquiera que sean las circunstancias.",
              },
            ],
          },
          {
            q: "Vas a operar un monomotor con carga que incluye un artículo de la clase 8. ¿Qué necesitas?",
            opciones: [
              {
                t: "Aprobación de la autoridad, previa verificación de las condiciones de seguridad del explotador, que además determina en qué aeródromos no se aprueba esa operación.",
                ok: true,
                fb: "La prohibición absoluta en monomotores es para la clase 3 combustibles y para toda la aviación civil privada. Las demás clases en monomotor requieren aprobación con verificación previa.",
              },
              {
                t: "Nada especial: la clase 8 no está restringida en monomotores.",
                fb: "El reglamento colombiano exige aprobación para mercancías distintas de la clase 3 en monomotores. Es una limitación nacional, no del Anexo 18.",
              },
              {
                t: "Está prohibido en todos los casos.",
                fb: "Lo prohibido en monomotor por razones de seguridad es la clase 3 combustibles, salvo lo que se permite llevar a pasajeros y tripulantes.",
              },
            ],
          },
          {
            q: "¿Qué mercancías peligrosas admite el correo aéreo, según el reglamento colombiano?",
            opciones: [
              {
                t: "Ninguna: el correo no admite mercancías peligrosas.",
                fb: "La regla general es esa, pero hay tres excepciones: muestras de pacientes, sustancias infecciosas con su hielo seco y declaración del expedidor, y material radiactivo de muy baja actividad.",
              },
              {
                t: "Muestras de pacientes; sustancias infecciosas con el hielo seco que las refrigera y declaración del expedidor; y material radiactivo con actividad de hasta una décima parte del límite que fijan las Instrucciones.",
                ok: true,
                fb: "Son las tres que admite el correo, a reserva de lo que dispongan las autoridades postales y la Unión Postal Universal. Y el explotador necesita la autorización en sus OpSpecs.",
              },
              {
                t: "Las mismas que en carga, si el operador postal las acepta.",
                fb: "El correo tiene su propia lista, mucho más corta. Y el operador postal designado necesita que la autoridad examine y apruebe sus procedimientos antes de aceptar mercancías peligrosas en el correo.",
              },
            ],
          },
          {
            q: "Un expedidor entrega material radiactivo con toda la documentación de las Instrucciones Técnicas. En Colombia, ¿le falta algo?",
            opciones: [
              {
                t: "No: con la declaración del expedidor basta.",
                fb: "Falta un papel más: la autorización del Servicio Geológico Colombiano, Grupo de Seguridad Nuclear y Protección Radiológica, que el expedidor presenta al explotador. En Brasil el equivalente es la aprobación de la CNEN (discrepancia BR 8): el patrón se repite, cambia el organismo.",
              },
              {
                t: "Sí: la autorización del Servicio Geológico Colombiano.",
                ok: true,
                fb: "Es una licencia de manejo o una autorización de importación o reexportación, según el caso. Y el explotador no acepta una declaración tachada o enmendada salvo que la enmienda esté anulada con la misma firma.",
              },
              {
                t: "Sí: una dispensa de la autoridad aeronáutica.",
                fb: "El material radiactivo permitido no necesita dispensa: necesita cumplir las Instrucciones, el Reglamento del OIEA y, además, el permiso del organismo nuclear del país que corresponda.",
              },
            ],
          },
          {
            q: "Un tripulante lleva en su maleta un artículo de la clase 2. ¿Qué aplica?",
            opciones: [
              {
                t: "La misma regla que a un pasajero: prohibido salvo que las Instrucciones Técnicas lo permitan y se cumplan todos sus requisitos.",
                ok: true,
                fb: "La norma nombra expresamente a «los pasajeros o las tripulaciones», y la única excepción es la misma para los dos. Si se descubre, el explotador debe notificarlo.",
              },
              {
                t: "Los tripulantes están exceptuados por ser personal de la operación.",
                fb: "Hay una excepción, pero es para objetos y sustancias exigidos por aeronavegabilidad y reglamentos de operación, no para el equipaje personal del tripulante.",
              },
              {
                t: "Depende de si el vuelo es nacional o internacional.",
                fb: "La regla no distingue tipo de vuelo. Lo que sí cambia según la ruta son las discrepancias notificadas por los Estados (lección 10).",
              },
            ],
          },
          {
            q: "¿En qué momento debe recibir el pasajero la información sobre lo que no puede llevar?",
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
                fb: "El sitio web es parte de la obligación, pero no la agota: los avisos físicos con ejemplos visuales y la confirmación en el despacho son obligatorios también.",
              },
            ],
          },
          {
            q: "En la recepción del equipaje, ¿basta con preguntarle al pasajero si lleva algo peligroso?",
            opciones: [
              {
                t: "Sí: la confirmación del pasajero libera al explotador.",
                fb: "La confirmación es obligatoria, pero la misma norma exige además obtener confirmación acerca del contenido de cualquier artículo que se sospeche pueda contener mercancías peligrosas no permitidas.",
              },
              {
                t: "No: además hay que pedir confirmación del contenido de cualquier artículo sospechoso.",
                ok: true,
                fb: "Dos preguntas, no una: «¿lleva mercancías peligrosas no permitidas?» y «¿qué contiene esto?» ante cualquier artículo que haga dudar. Muchos objetos que parecen inocuos contienen mercancías peligrosas.",
              },
              {
                t: "No hay que preguntar nada: para eso está el control de seguridad.",
                fb: "La requisa previene que entren; la confirmación en el despacho es una obligación distinta y expresa.",
              },
            ],
          },
          {
            q: "Una caja de carga declarada como «motor de combustión interna».",
            opciones: [
              {
                t: "Sí.",
                ok: true,
                fb: "Es un ejemplo expreso de objeto de la clase 9. Puede traer combustible residual, batería y aceite.",
              },
              {
                t: "No.",
                fb: "Figura expresamente entre los objetos de la clase 9. «Motor» es una descripción general clásica.",
              },
            ],
          },
          {
            q: "Un envío de «equipo de salvamento de inflado automático».",
            opciones: [
              {
                t: "Sí.",
                ok: true,
                fb: "Ejemplo expreso de objeto de la clase 9: lleva un cartucho de gas comprimido y a veces pirotecnia.",
              },
              {
                t: "No.",
                fb: "Un chaleco o una balsa de inflado automático traen gas comprimido, y figuran expresamente como clase 9.",
              },
            ],
          },
          {
            q: "Unas «muestras de laboratorio» sin más descripción, en una caja fría.",
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
            opciones: [
              {
                t: "Sí, es mercancía peligrosa, pero no está oculta: viene declarada.",
                ok: true,
                fb: "Es clase 9 cuando al embalarlo tiene un campo de 0,159 A/m o más a 2,1 m del bulto, y tiene etiqueta propia. Como viene declarada y etiquetada, es lo contrario de una oculta.",
              },
              {
                t: "No es mercancía peligrosa.",
                fb: "Sí lo es: pertenece a la clase 9 y tiene su propia etiqueta de manipulación. Lo que no es, es oculta: viene declarada.",
              },
            ],
          },
          {
            q: "Una caja de «documentos impresos y papelería».",
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
          }
        ],
      },
    ],
  },
]
