/**
 * Nivel 4 · En ruta y llegada (lecciones 19 a 30, capítulos 19 a 30 de la especificación).
 *
 * Del SID a la pista de destino: niveles, rumbos, velocidades, reportes,
 * desvíos por meteorología, llegada, aproximación, espera, aterrizaje y motor
 * y al aire.
 *
 * Fuente: docs/comunicaciones/nivel-4.md, entero. Cada intercambio del
 * Markdown es un bloque `code` con su significado debajo (`ejemplo`); los
 * rótulos (VERIFICAR) y PLAIN LANGUAGE de cada ejemplo se conservan en su
 * título. Lo que el Markdown marca VERIFICAR sale en un callout «Verificar»
 * visible al empezar la fraseología y, completo, en el detalle técnico de
 * FUENTES. El formato de los bloques y de los huecos está documentado al
 * inicio de index.ts.
 */

import type { DocBlockData, DocScreen } from "@/lib/docBlocks"

/**
 * Un intercambio: el título en negrita, la transmisión literal (una línea por
 * turno de palabra) y el significado en español.
 */
function ejemplo(titulo: string, turnos: string[], significado: string): DocBlockData[] {
  return [
    { kind: "p", text: `**${titulo}**` },
    { kind: "code", text: turnos.join("\n") },
    { kind: "p", text: significado },
  ]
}

/** Un error frecuente: el nombre del error como título y la explicación. */
function error(titulo: string, text?: string): DocBlockData {
  return text === undefined
    ? { kind: "callout", tone: "warn", text: titulo }
    : { kind: "callout", tone: "warn", title: titulo, text }
}

/** Cómo leer los ejemplos: va al empezar la fraseología de cada lección. */
const COMO_LEER: DocBlockData = {
  kind: "callout",
  tone: "info",
  title: "Cómo leer los ejemplos",
  text: "`AVIATORY 452`, las estaciones, pistas, frecuencias, SID, STAR y waypoints son **ficticios**. Frase **sin etiqueta**: su estructura está en el Doc 9432 o el Doc 4444 cargados (el párrafo exacto va en Fuentes). **(VERIFICAR)**: fraseología OACI conocida que no está en las fuentes cargadas. **PLAIN LANGUAGE**: lenguaje claro, no fraseología estandarizada.",
}

/** Las convenciones de los ejemplos de todo el nivel (cabecera de nivel-4.md). */
const CONVENCIONES: DocBlockData = {
  kind: "list",
  items: [
    "`AVIATORY 452` es un distintivo ficticio. «Bogota Departure», «Bogota Control», «Bogota Approach», «Bogota Tower» y «Bogota Ground» son estaciones de ejemplo educativo. Pistas, frecuencias, niveles de transición, designadores de SID y STAR y waypoints (GIKOS, PAXUM, RODEL, KUBIN, LOSAM, TOMUR, VATIX) son **ficticios**: no corresponden a la carta real de ningún aeródromo.",
    "Los números van con su ortografía inglesa normal para que se lean fácil. La pronunciación OACI de cada dígito está en el capítulo 5.",
    "Frase **sin etiqueta**: su estructura está en el Doc 9432 o el Doc 4444 cargados (se cambiaron distintivo, lugares y valores). El párrafo exacto va en FUENTES.",
    "**(VERIFICAR)**: fraseología OACI conocida que no está en las fuentes cargadas. Confirmarla en el documento indicado antes de publicarla como norma.",
    "**PLAIN LANGUAGE**: lenguaje claro, no fraseología estandarizada.",
    "Fuentes cargadas: Doc 9432, Manual de radiotelefonía, 4.ª ed. 2007 (caps. 1 a 7.3) y Doc 4444, PANS-ATM, 15.ª ed. con Enm. 4 (caps. 1 a 4 y comienzo del 5). El cap. 12 del Doc 4444 (fraseología), el cap. 8 del Doc 9432 (control de área) y la sección 7.4 en adelante del Doc 9432 **no están cargados**. La 15.ª ed. del Doc 4444 no es la vigente: existe la 16.ª ed. (2016) con enmiendas.",
  ],
}

export const NIVEL_4: DocScreen[] = [
  // ── 19 ──────────────────────────────────────────────────────────────────
  {
    n: 19,
    title: "SID y salida",
    kicker: "La ruta publicada, sus restricciones y lo que cambia con ATC",
    minutes: 21,
    blocks: [
      {
        kind: "p",
        text: "Una salida normalizada por instrumentos (SID, Standard Instrument Departure) es una trayectoria publicada que permite pasar del aeródromo a la fase en ruta dentro de la autorización recibida. En cabina se cruzan tres fuentes que no son intercambiables: el procedimiento vigente, la autorización del control de tránsito aéreo (ATC, air traffic control) y la capacidad real del avión. El error peligroso no suele ser olvidar que existe una SID, sino asumir qué parte sigue vigente después de un directo, un rumbo o un nuevo nivel.",
      },
      { kind: "sub", text: "Antes de despegar: leer lo autorizado, no lo cargado por costumbre" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Identificar la salida.** El piloto que atiende la radio (PM, pilot monitoring) copia designador, transición, nivel inicial y restricciones expresas. El piloto que vuela (PF, pilot flying) contrasta lo recibido con el plan de vuelo, la publicación de información aeronáutica (AIP, Aeronautical Information Publication) vigente y lo cargado en el sistema de gestión de vuelo (FMS, Flight Management System). Un procedimiento seleccionado en el FMS no equivale a autorización.",
          "**Leer límites laterales, verticales y de velocidad.** La trayectoria publicada puede llevar restricciones que continúan siendo pertinentes incluso cuando ATC cambia otra parte. Se revisan también datos de performance y obstáculos según el manual y el SOP del operador. Si no es posible cumplir una restricción, se comunica antes de llegar a ella.",
          "**Confirmar lo que no coincide.** Una pista o designador distinto, una transición inesperada o un nivel inicial incompatible con lo preparado no se corrige silenciosamente en el FMS. La tripulación detiene la secuencia de decisión que depende del dato y solicita aclaración a ATC.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-19-01.svg",
        alt: "Matriz conceptual que separa trayectoria lateral, nivel y velocidad de una SID publicada y los cambios explícitos de ATC.",
        ancho: 1600,
        alto: 850,
        pie: "Esta matriz no es una carta ni representa una salida real. Cada nueva instrucción se compara por separado con el componente lateral, vertical y de velocidad publicado. Un directo a un punto de la SID evita los puntos intermedios, pero no borra automáticamente todas las restricciones futuras. Un vector fuera de la SID exige entender si y dónde se espera reingresar.",
      },
      { kind: "sub", text: "Después del despegue: tres modificaciones diferentes" },
      {
        kind: "table",
        head: ["Lo que dice ATC", "Efecto sobre la SID", "Comprobación en cabina"],
        rows: [
          ["CLIMB VIA SID TO (level), fraseología OACI", "Autoriza ascenso al nivel explícito siguiendo las restricciones aplicables de la SID.", "Colacionar la frase completa y el nivel; sin nivel la frase está incompleta en la formulación OACI."],
          ["CLEARED DIRECT a un punto que pertenece a la SID", "Se omiten los puntos sobrevolados; al llegar al punto autorizado se retoma la navegación propia de la SID.", "Distinguir restricciones omitidas de las que aún quedan después del punto de reingreso."],
          ["Vector o directo a un punto ajeno a la SID", "La aeronave sale temporalmente del procedimiento publicado.", "Confirmar trayectoria, nivel, restricciones y expectativa de reingreso; no asumir retorno automático."],
          ["Cancelación explícita de restricciones", "Cambia solo las restricciones que ATC identifica como canceladas.", "Mantener el nivel autorizado y las demás restricciones que sigan vigentes."],
        ],
      },
      {
        kind: "p",
        text: "La Organización de Aviación Civil Internacional (OACI, International Civil Aviation Organization) explica que **CLIMB VIA SID** sin un nivel asignado es una frase incompleta bajo su procedimiento: debe decir CLIMB VIA SID TO (level). También advierte que Estados que no aplican exactamente ese esquema —cita expresamente a Estados Unidos— pueden usar CLIMB VIA SID sin nivel en una autorización específica. No se mezclan ambas prácticas. Para Colombia, la fuente del procedimiento vigente es la eAIP de Aerocivil y la autorización real, no un diálogo de entrenamiento.",
      },
      {
        kind: "p",
        text: "La misma guía OACI distingue un directo a un punto **de la propia SID** de un directo a un punto que **no pertenece** a ella. En el primer caso, los puntos intermedios evitados dejan de obligar, pero las restricciones futuras no desaparecen por eso. En el segundo, el avión sale del procedimiento y la tripulación necesita saber cómo continúa la ruta y si control prevé reingreso. Un cambio de nivel tampoco autoriza a ignorar límites laterales o de velocidad por intuición. El PM colaciona cada cambio, el PF revisa el modo de guiado y ambos verifican el efecto en el FMS.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-19-02.webp",
        alt: "Historieta fotográfica de cuatro paneles: briefing de salida, controlador de salida, escucha en vuelo y verificación cruzada en cabina.",
        ancho: 1672,
        alto: 941,
        pie: "Historieta didáctica, no transcripción: 1) la tripulación revisa la salida antes de partir; 2) el controlador gestiona el tránsito; 3) el PM escucha una modificación tras el despegue; 4) PF y PM comprueban juntos qué parte de la autorización cambia. Las pantallas son intencionalmente ilegibles: no representan una carta, SID, ruta ni dato local inventado.",
      },
      { kind: "sub", text: "La primera llamada a Salida" },
      {
        kind: "p",
        text: "Al transferirse de torre a Salida, el PM contacta a la dependencia indicada con el distintivo completo y la información de nivel que exijan el procedimiento y la instrucción. Es esencial que el controlador pueda comparar el nivel que la tripulación está dejando y el que cree autorizado. Si se asignó velocidad o hay una restricción significativa, la tripulación no la omite cuando deba notificarse. El orden exacto de la primera llamada y la frecuencia se toman de la publicación y de la transferencia recibida; no existe en esta lección un «Bogotá Salida» o una frecuencia de ejemplo que deba memorizarse.",
      },
      {
        kind: "escenario",
        titulo: "Directo a un punto de la SID después del despegue",
        situacion: "Caso didáctico sin pista, ruta, nivel o indicativo fabricado. La tripulación vuela una SID publicada y ya recibió un nivel autorizado. Salida instruye un directo a un punto que sí aparece más adelante en esa misma SID. Entre la posición actual y ese punto hay dos puntos publicados; después de él hay una restricción de velocidad. Uno de los pilotos supone que el directo eliminó todas las restricciones.",
        preguntas: [
          {
            q: "¿Qué cambia y qué no se debe asumir?",
            a: "El directo permite evitar los puntos intermedios según la autorización; la restricción que queda después del punto de reingreso no se borra por inferencia. Ambos pilotos verifican el tramo resultante y el nivel autorizado. Si la frase o una restricción suscita duda, piden confirmación antes de configurar o volar una interpretación distinta.",
          },
          {
            q: "¿Qué harían si el directo fuera a un punto ajeno a la SID?",
            a: "Lo tratan como salida de la trayectoria publicada, no como un reingreso implícito. Colacionan el punto y solicitan aclaración sobre nivel, restricciones restantes y expectativa de volver a la SID si control no lo ha indicado. No dejan que el FMS seleccione automáticamente una trayectoria que ATC no autorizó.",
          },
        ],
        concepto: "Modificar la trayectoria lateral no equivale a cancelar por completo límites verticales y de velocidad.",
      },
      {
        kind: "enLaOperacion",
        momento: "Cada vez que Salida cambia la autorización",
        texto: "El PM escucha y anota qué dimensión cambia —ruta, nivel o velocidad—, colaciona la instrucción completa y confirma cualquier ambigüedad. El PF mantiene la trayectoria segura mientras verifica el modo lateral y vertical seleccionado. Una restricción que el avión no puede cumplir se comunica a tiempo con UNABLE y una explicación breve; no se espera a sobrevolar el punto. El operador define sus procedimientos operacionales normalizados (SOP, standard operating procedures) y sus llamadas cruzadas, pero ninguna automatización exime de cotejar la autorización con lo que realmente volará el avión.",
      },
      { kind: "sub", text: "Errores que importan" },
      error("Confundir una SID cargada en el FMS con una SID autorizada, o volar una versión antigua sin contrastarla con la publicación vigente."),
      error("Tratar un directo a un punto de la SID como cancelación automática de todas las restricciones futuras."),
      error("Suponer reingreso a la SID después de un vector o directo fuera de ella sin una instrucción clara."),
      error("Interpretar CLIMB VIA SID sin nivel como una autorización OACI completa cuando se necesita un nivel explícito."),
      error("Aceptar una restricción que el avión no puede cumplir y comunicar UNABLE demasiado tarde."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "La SID publicada, la autorización ATC y lo cargado en el FMS se comparan; no son la misma cosa.",
          "CLIMB VIA SID TO (level) incluye nivel explícito en la formulación OACI; no trasladar otras variantes de Estado sin verificar.",
          "Un directo a un punto de la SID omite los puntos intermedios, no todas las restricciones posteriores.",
          "Un vector fuera de la SID exige confirmar cómo sigue la trayectoria y si se espera reingreso.",
          "Si una restricción no es posible, se comunica UNABLE antes de llegar a ella.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "OACI · Cambios SID/STAR y preguntas para tripulaciones",
        bloques: [
          { kind: "sub", text: "Documentos oficiales" },
          { kind: "p", text: "OACI, Changes to SID & STAR Phraseologies (https://www.icao.int/airnavigation/changes-to-sid_star-phra-seologies) y Flight Crews FAQ, preguntas 2, 5–8 (https://www.icao.int/airnavigation/faq-flight-crews). Esas páginas explican el alcance de CLIMB VIA SID TO (level), directos a puntos de la SID, restricciones remanentes y reingreso. La comparación se refiere a la fraseología OACI y reconoce expresamente diferencias de Estados Unidos." },
          { kind: "sub", text: "Límite de aplicación" },
          { kind: "list", items: [
            "La matriz y el escenario no son una SID, una carta ni una transcripción real.",
            "No se usan designadores, niveles, velocidades, frecuencias ni puntos inventados como si fueran datos operativos.",
            "Para una operación colombiana, comprobar la eAIP de Aerocivil vigente, la autorización efectivamente recibida y el SOP del operador.",
          ] },
        ],
      },
    ],
  },
  // ── 20 ──────────────────────────────────────────────────────────────────
  {
    n: 20,
    title: "Ascenso y cambios de nivel",
    kicker: "Escuchar, colacionar, seleccionar y comprobar",
    minutes: 20,
    blocks: [
      {
        kind: "p",
        text: "Una autorización de ascenso o descenso del control de tránsito aéreo (ATC, air traffic control) no termina al repetirla por radio. Para que el avión vuele el nivel correcto, la tripulación debe identificar a quién se dirige la instrucción, entender si se habla de altitud o nivel de vuelo, colacionar el valor completo, seleccionarlo y comprobar que el modo vertical conduce al objetivo autorizado. Estas acciones se encadenan con la trayectoria lateral, las restricciones publicadas y la capacidad real del avión.",
      },
      { kind: "sub", text: "Dos referencias verticales, una sola intención autorizada" },
      {
        kind: "p",
        text: "La **altitud** se expresa respecto al nivel medio del mar con un ajuste altimétrico apropiado, normalmente QNH (código Q del ajuste de presión al nivel medio del mar). El **nivel de vuelo** es una superficie de presión referida al ajuste estándar de 1013,2 hectopascales (hPa). Por eso una autorización «FLIGHT LEVEL (number)» no se reemplaza por la misma cifra en pies. La altitud de transición, el nivel de transición y la capa entre ambos separan el uso de cada referencia; sus valores no son universales. En Colombia se comprueban en la publicación de información aeronáutica (AIP, Aeronautical Information Publication) vigente de Aerocivil y en la información del aeródromo correspondiente.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-20-01.svg",
        alt: "Diagrama conceptual de altitud de transición, capa de transición y nivel de transición, sin alturas locales inventadas.",
        ancho: 1600,
        alto: 900,
        pie: "Esquema conceptual, no perfil de un aeródromo. Al ascender se cambia a referencia estándar según la altitud de transición aplicable; al descender, al cruzar el nivel de transición, se usa la referencia altimétrica comunicada. La cifra y el ajuste se toman de la publicación y de la autorización reales, nunca de esta figura.",
      },
      { kind: "sub", text: "La secuencia completa en una cabina de dos pilotos" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Escuchar la llamada entera.** El piloto que monitorea (PM, pilot monitoring) confirma el distintivo y copia el nuevo nivel junto con cualquier condición de tiempo, punto, régimen o restricción. Si el distintivo se parece al de otra aeronave o una sílaba queda bloqueada, no se ejecuta una interpretación probable: se pide repetición.",
          "**Colacionar la instrucción completa.** Se distingue «FLIGHT LEVEL» de «FEET» y se incluye el nivel o la altitud, la condición y el distintivo. El controlador debe poder detectar una discrepancia; responder solamente con la cifra reduce esa oportunidad.",
          "**Seleccionar y verificar.** El piloto que vuela (PF, pilot flying) mantiene la trayectoria y confirma el valor seleccionado en el panel de guiado, el ajuste de altímetro y el modo vertical. El PM coteja lo seleccionado con lo autorizado. El reparto exacto de tareas sigue los procedimientos operacionales normalizados (SOP, standard operating procedures) del operador.",
          "**Monitorear la captura.** Ambos observan que el avión asciende o desciende hacia el objetivo autorizado, respeta las restricciones que siguen vigentes y captura el nivel sin sobrepasarlo. Una instrucción de cambio de nivel no elimina por sí sola una restricción lateral o de velocidad.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-20-02.webp",
        alt: "Historieta fotográfica de escucha del nivel, respuesta del piloto, colación y verificación cruzada en cabina.",
        ancho: 1672,
        alto: 941,
        pie: "Historieta didáctica, no transcripción: 1) el PM escucha; 2) control emite una instrucción; 3) el PM colaciona; 4) ambos pilotos comprueban la selección y el modo vertical. No se muestran niveles, distintivos, frecuencias o datos de una autorización real.",
      },
      { kind: "sub", text: "Cambios que modifican la decisión" },
      {
        kind: "table",
        head: ["Instrucción o situación", "Lo que exige la tripulación"],
        rows: [
          ["CLIMB / DESCEND TO (level)", "Colacionar el nuevo objetivo y cambiar el guiado solo después de confirmar que la instrucción es para su avión."],
          ["MAINTAIN (level)", "Mantener el nivel indicado; MAINTAIN no es una manera abreviada de ordenar un ascenso o descenso."],
          ["REPORT LEAVING / PASSING / REACHING (level)", "Notificar exactamente el evento pedido. Una autorización a otro avión puede depender de esa información."],
          ["EXPEDITE o régimen de ascenso/descenso", "Comprobar si el avión puede cumplirlo. Si no, decir UNABLE de inmediato, indicar la limitación y esperar una alternativa."],
          ["Nueva autorización antes de alcanzar la anterior", "Identificar qué parte reemplaza a la instrucción previa, colacionarla y verificar de nuevo el objetivo seleccionado."],
        ],
      },
      {
        kind: "p",
        text: "La fraseología publicada por la Agencia de la Unión Europea para la Seguridad Aérea (EASA, European Union Aviation Safety Agency) muestra CLIMB o DESCEND seguido de TO (level), y separa MAINTAIN (level) para conservar un nivel. También contiene REPORT LEAVING, PASSING o REACHING y variantes de régimen. Son patrones normativos para el ámbito indicado por esa fuente, no un diálogo colombiano ni una autorización para copiar números arbitrarios. El valor, las restricciones y la dependencia concreta se toman de la instrucción real y de la AIP aplicable.",
      },
      {
        kind: "escenario",
        titulo: "Cambio de nivel durante un ascenso autorizado",
        situacion: "Caso didáctico sin distintivos, aeródromos ni cifras fabricadas. La aeronave asciende hacia un nivel autorizado. Antes de alcanzarlo, ATC asigna otro objetivo e incorpora una condición de cruce. Al mismo tiempo, el PM advierte que el primer nivel sigue seleccionado en el panel y que el régimen disponible puede no permitir cumplir la condición.",
        preguntas: [
          {
            q: "¿Qué se comunica y qué se verifica antes de ejecutar?",
            a: "Se colaciona el nuevo nivel y la condición completa para ese avión. PF y PM identifican qué autorización queda sustituida, seleccionan y verifican el nuevo objetivo y comprueban modo vertical, trayectoria y restricciones remanentes. No basta con repetir correctamente la cifra si el panel permanece en el objetivo anterior.",
          },
          {
            q: "¿Qué pasa si la condición no puede cumplirse?",
            a: "Se informa UNABLE en cuanto se identifica la limitación y se explica de forma breve lo que sí puede hacer el avión. La tripulación no acepta en silencio una condición imposible ni altera unilateralmente la separación; coordina una autorización practicable con ATC.",
          },
        ],
        concepto: "La seguridad vertical requiere coherencia entre radio, selección, capacidad y trayectoria observada.",
      },
      {
        kind: "enLaOperacion",
        momento: "Después de cada modificación vertical",
        texto: "El PM confirma distintivo, nivel y condiciones; el PF mantiene control del vuelo. Ambos cotejan autorización, selector, ajuste altimétrico y modo vertical. Si cambia la referencia durante ascenso o descenso, la tripulación aplica el punto de transición publicado y el SOP. Si una instrucción entra en conflicto con la performance, una restricción o la seguridad del terreno, se comunica de inmediato y se solicita aclaración o alternativa; no se deja que la automatización decida qué autorización prevalece.",
      },
      { kind: "sub", text: "Errores que importan" },
      error("Colacionar solo un número sin decir si es altitud en pies o nivel de vuelo."),
      error("Aceptar una autorización de otro distintivo en una frecuencia congestionada."),
      error("Decir un nuevo nivel por radio y dejar seleccionado el anterior."),
      error("Cambiar QNH y ajuste estándar en un punto supuesto, sin comprobar la transición aplicable."),
      error("Esperar hasta la captura para reconocer que no se puede cumplir un régimen o una condición."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Altitud y nivel de vuelo tienen referencias diferentes; la transición se toma de la publicación aplicable.",
          "Una instrucción vertical se escucha, colaciona, selecciona, verifica y monitorea.",
          "MAINTAIN conserva un nivel; CLIMB o DESCEND ordenan el cambio.",
          "La imposibilidad de cumplir se comunica pronto con UNABLE y una explicación breve.",
          "Ninguna cifra ni frecuencia de entrenamiento sustituye una autorización real.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "OACI · Doc 4444; EASA · SERA.14001",
        bloques: [
          { kind: "sub", text: "Documentos oficiales" },
          { kind: "p", text: "OACI, Doc 4444, PANS-ATM, edición disponible en el portal de OACI (https://applications.icao.int/tools/ATMiKIT/story_content/external_files/story_content/external_files/DOC%204444_PANS%20ATM_en.pdf), definiciones de altitud y nivel de vuelo y procedimientos de reglaje altimétrico. EASA, Easy Access Rules for Standardised European Rules of the Air, Appendix 1 to AMC1 SERA.14001, secciones 1.1.1–1.1.2 y 1.2.3 (https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-10299). Son referencias de fraseología y conceptos; la operación colombiana se consulta en Aerocivil/eAIP vigente." },
          { kind: "sub", text: "Límites del material" },
          { kind: "list", items: [
            "El diagrama no indica valores de transición de ningún aeropuerto.",
            "La historieta y el escenario no son una transcripción ni describen un vuelo real.",
            "Las acciones de cabina se adaptan al avión, el manual y los SOP de cada operador.",
          ] },
        ],
      },
    ],
  },
  // ── 21 ──────────────────────────────────────────────────────────────────
  {
    n: 21,
    title: "Rumbo, directo y vectores",
    kicker: "Quién guía la trayectoria y cuándo vuelve la navegación propia",
    minutes: 19,
    blocks: [
      {
        kind: "p",
        text: "Un **vector** es una instrucción de rumbo dada por el control de tránsito aéreo (ATC, air traffic control) con ayuda de vigilancia. No equivale a un punto directo en el sistema de gestión de vuelo (FMS, Flight Management System): durante el vector la tripulación vuela el rumbo instruido y monitorea la trayectoria, mientras ATC mantiene la secuencia prevista. Un **directo** cambia la ruta lateral hacia un punto nombrado; volver a la navegación propia requiere entender exactamente dónde y cómo se reingresa a la ruta autorizada.",
      },
      { kind: "sub", text: "Rumbo, derrota y ruta no son sinónimos" },
      {
        kind: "list",
        items: [
          "Un **rumbo** indica hacia dónde apunta el avión respecto al norte magnético. La **derrota** es el recorrido sobre el terreno; el viento puede separarlas. Si la instrucción es FLY HEADING, no se sustituye por una derrota calculada por el FMS.",
          "TURN LEFT o TURN RIGHT identifica el sentido del viraje; HEADING seguido de tres cifras identifica el rumbo de salida. El piloto que monitorea (PM, pilot monitoring) colaciona ambos elementos y el distintivo. Si el sentido es esencial y no se entiende, solicita confirmación antes de seleccionar un giro ambiguo.",
          "RESUME OWN NAVIGATION indica el fin de la guía vectorial cuando corresponde, acompañado de posición e instrucciones apropiadas. No significa «volver a cualquier línea magenta»; la tripulación identifica la ruta o el punto al que se le devuelve.",
          "Un directo a un punto de una salida normalizada por instrumentos (SID, Standard Instrument Departure) no tiene exactamente el mismo efecto que un directo a un punto ajeno a ella. La lección 19 explica qué restricciones permanecen y por qué el reingreso no se infiere.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-21-01.svg",
        alt: "Esquema conceptual que diferencia seguir la ruta publicada, volar un rumbo vectorizado y recibir un directo para retomar navegación propia.",
        ancho: 1600,
        alto: 900,
        pie: "Esquema de estados, no carta aeronáutica ni trayectoria a escala. El rumbo vectorizado no es la ruta del FMS; el directo solo se vuela hacia el punto efectivamente autorizado. Antes de reingresar se comprueban posición, nivel, restricciones vigentes y capacidad de navegación.",
      },
      { kind: "sub", text: "Secuencia operacional de una modificación lateral" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Primero, identificar la instrucción.** El PM escucha el distintivo, sentido de giro, rumbo o punto, motivo si lo transmite control, y cualquier límite de nivel o velocidad. El piloto que vuela (PF, pilot flying) mantiene control del avión mientras se resuelve una duda.",
          "**Después, colacionar y configurar.** Si es vector, se selecciona el modo de rumbo apropiado y se comprueba que no se confunda con modo de derrota. Si es directo, se verifica el punto nombrado y el tramo resultante en el FMS antes de ejecutarlo. El reparto exacto de tareas depende de los procedimientos operacionales normalizados (SOP, standard operating procedures) del operador.",
          "**Monitorear la trayectoria real.** Ambos comprueban que el avión inicia el viraje correcto, captura el rumbo o navega al punto autorizado y sigue respetando el nivel y la velocidad vigentes. Un cambio lateral no cancela las otras dimensiones por inferencia.",
          "**Cerrar la guía vectorial.** Al recibir RESUME OWN NAVIGATION o una nueva ruta, se confirma dónde se encuentra el avión y a qué punto o segmento debe ir. Si la instrucción deja incierto el reingreso, se pregunta; no se permite que el FMS invente la continuidad.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-21-02.webp",
        alt: "Historieta fotográfica de controlador emitiendo un vector y tripulación que recibe, comprueba y retoma la navegación propia.",
        ancho: 1672,
        alto: 941,
        pie: "Historieta didáctica, no una comunicación grabada: 1) el controlador asigna un rumbo; 2) la tripulación lo ejecuta y monitorea; 3) el PM revisa el efecto de una nueva instrucción; 4) ambos confirman la ruta autorizada antes de volver a navegación propia. Las pantallas son ilegibles y no representan una carta o ruta real.",
      },
      { kind: "sub", text: "Lo que respaldan la fraseología y la separación" },
      {
        kind: "p",
        text: "El apéndice de fraseología de la Agencia de la Unión Europea para la Seguridad Aérea (EASA, European Union Aviation Safety Agency) incluye FLY HEADING (tres cifras), TURN LEFT/RIGHT HEADING (tres cifras), CONTINUE PRESENT HEADING y RESUME OWN NAVIGATION con posición e instrucciones. Son ejemplos de estructura normativa de su ámbito, no una autorización colombiana ni un diálogo inventado. El documento oficial OACI Doc 4444 consultado indica que, durante vectores a un vuelo por reglas de vuelo instrumental (IFR, Instrument Flight Rules) o un directo que lo saca de una ruta de servicios de tránsito aéreo (ATS, air traffic services), el controlador debe dar autorizaciones con margen de obstáculos hasta el punto donde el piloto retome su navegación. La tripulación conserva responsabilidad de verificar el vuelo seguro y pedir aclaración si algo no cuadra; el documento consultado es una edición anterior y no sustituye la versión vigente aplicable.",
      },
      {
        kind: "escenario",
        titulo: "Un vector seguido de un directo",
        situacion: "Caso didáctico sin aeródromo, frecuencia, rumbo numérico ni punto inventado. La aeronave seguía una ruta publicada. ATC asigna un rumbo por secuenciación; después instruye proceder directo a un punto que no estaba en el tramo inmediato de la ruta. El FMS ofrece automáticamente una pierna posterior, pero los pilotos no tienen claro si control pretende un reingreso a la ruta original.",
        preguntas: [
          {
            q: "¿Qué se verifica antes de aceptar la trayectoria que propone el FMS?",
            a: "Se colaciona el punto efectivamente autorizado y se comparan posición actual, pierna prevista, nivel y restricciones remanentes. Si el punto queda fuera del procedimiento o la continuación no está clara, se solicita la ruta o expectativa de reingreso a ATC. No se confunde la propuesta de navegación del equipo con una autorización.",
          },
          {
            q: "¿Qué cambia si la instrucción fuera solo CONTINUE PRESENT HEADING?",
            a: "La tripulación mantiene el rumbo actual y monitorea la trayectoria; no activa por cuenta propia un directo ni vuelve a la ruta porque el vector parezca haber terminado. Espera una nueva instrucción o solicita aclaración si aparece un problema de seguridad o de capacidad.",
          },
        ],
        concepto: "La autoridad de la ruta lateral viene de la instrucción ATC; la automatización solo ejecuta lo comprobado.",
      },
      {
        kind: "enLaOperacion",
        momento: "Al pasar de vector a directo o a navegación propia",
        texto: "El PM colaciona sentido de giro, rumbo o punto e identifica qué parte de la ruta cambia. El PF verifica que el modo lateral y la trayectoria observada coincidan con esa autorización. Los dos comparan el nivel y la velocidad vigentes, la separación con el terreno y el tramo que propone el FMS. Si no pueden identificar un reingreso seguro y autorizado, piden instrucciones adicionales antes de ejecutar una interpretación implícita.",
      },
      { kind: "sub", text: "Errores que importan" },
      error("Colacionar el valor del rumbo sin el sentido de viraje cuando este fue instruido."),
      error("Confundir rumbo con derrota o dejar seleccionado el modo lateral equivocado."),
      error("Reanudar la ruta cargada en el FMS solo porque el vector parece haber terminado."),
      error("Activar un directo sin revisar qué restricciones y tramo quedan por delante."),
      error("Asumir que la responsabilidad de ATC durante vectores elimina toda verificación de seguridad en cabina."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Un vector es rumbo instruido; un directo es nueva ruta hacia un punto autorizado.",
          "El sentido del giro, el rumbo o el punto se colacionan y se verifican en el modo lateral.",
          "RESUME OWN NAVIGATION requiere saber qué navegación retomar y desde dónde.",
          "Nivel, velocidad y restricciones no desaparecen al cambiar la trayectoria lateral.",
          "Si el reingreso o el margen con el terreno no es claro, se pide aclaración.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "EASA · AMC1 SERA.14001; OACI · Doc 4444",
        bloques: [
          { kind: "sub", text: "Documentos oficiales" },
          { kind: "p", text: "EASA, Appendix 1 to AMC1 SERA.14001, sección 2.1.3–2.1.4, instrucciones vectoriales y terminación de guía (https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-10299). OACI, Doc 4444 PANS-ATM, edición anterior disponible en su portal, 8.6.5.2 y 8.6.5.5 (https://applications.icao.int/tools/ATMiKIT/story_content/external_files/story_content/external_files/DOC%204444_PANS%20ATM_en.pdf). Su texto aclara el margen de obstáculos bajo vector y el retorno a navegación propia; para uso operacional se comprueba la edición vigente y la AIP/eAIP de Aerocivil." },
          { kind: "sub", text: "Límites del material" },
          { kind: "list", items: [
            "La figura no representa una ruta ATS, una carta ni distancias reales.",
            "La historieta y el escenario son construcciones didácticas, no transcripciones.",
            "No se inventan indicativos, rumbos, puntos ni frecuencias para aparentar una operación real.",
          ] },
        ],
      },
    ],
  },
  // ── 22 ──────────────────────────────────────────────────────────────────
  {
    n: 22,
    title: "Control de velocidad",
    kicker: "Separación, energía y límites de una instrucción",
    minutes: 19,
    blocks: [
      {
        kind: "p",
        text: "El control de tránsito aéreo (ATC, air traffic control) utiliza ajustes de velocidad para ordenar el flujo y conservar separación. Para una tripulación de aerolínea, una instrucción de velocidad no es un número aislado: altera la energía del avión, la capacidad de cumplir restricciones de descenso y el tiempo disponible para configurar la aproximación. Hay que recibirla, colacionarla, comprobar si es realizable y vigilar sus consecuencias sobre el perfil completo.",
      },
      { kind: "sub", text: "Qué velocidad se está controlando" },
      {
        kind: "list",
        items: [
          "Una velocidad expresada en nudos durante descenso o aproximación se interpreta normalmente como **velocidad indicada** (IAS, indicated airspeed), no como velocidad sobre el terreno. El viento cambia la segunda sin que el piloto deje de cumplir la primera.",
          "En vuelo alto se puede controlar mediante **número de Mach**, relación entre velocidad verdadera y velocidad del sonido. El cambio de Mach a IAS se produce según el perfil, el avión y la instrucción aplicable; no se convierten dos consignas por intuición.",
          "REDUCE SPEED TO y MAINTAIN fijan un objetivo; OR GREATER y OR LESS establecen un límite, no una velocidad exacta. MINIMUM CLEAN SPEED es la mínima velocidad que puede volarse sin dispositivos hipersustentadores, aerofrenos ni tren desplegados; no es una cifra universal.",
          "RESUME NORMAL SPEED termina un ajuste de ATC; RESUME PUBLISHED SPEED remite a las velocidades publicadas que correspondan. NO ATC SPEED RESTRICTIONS no elimina límites reglamentarios ni restricciones publicadas que sigan vigentes.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-22-01.svg",
        alt: "Diagrama conceptual de la competencia entre reducir velocidad y perder altura cuando queda poca distancia de descenso.",
        ancho: 1600,
        alto: 900,
        pie: "Modelo de energía, no carta ni cálculo de performance: una reducción temprana puede integrarse al descenso; una reducción tardía simultánea con mucho descenso pendiente puede exigir negociar con ATC. Los límites reales dependen del avión y del procedimiento.",
      },
      { kind: "sub", text: "Secuencia completa en una llegada" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Recibir y colacionar.** El piloto que monitorea (PM, pilot monitoring) identifica el distintivo, verbo, velocidad o límite y condición UNTIL si la hay. Repite los elementos relevantes y el distintivo; una respuesta breve que omite OR GREATER, OR LESS o el punto de terminación cambia el sentido de la autorización.",
          "**Evaluar antes de prometer.** El piloto que vuela (PF, pilot flying) y el PM comparan la nueva velocidad con márgenes del avión, restricciones publicadas, nivel, distancia a la pista, viento y capacidad de desacelerar. Una reducción tardía mientras se exige un descenso pronunciado puede ser físicamente incompatible.",
          "**Configurar y monitorear.** Se selecciona el modo de velocidad apropiado conforme a los procedimientos operacionales normalizados (SOP, standard operating procedures) del operador y se comprueba la velocidad realmente seguida. Si el avión no alcanzará la consigna a tiempo o no puede cumplirla de forma segura, la tripulación informa inmediatamente y propone lo que sí puede aceptar.",
          "**Gestionar el relevo.** Una velocidad asignada se incluye en los reportes pertinentes y, conforme al procedimiento aplicable, en el primer contacto tras cambiar de frecuencia. La tripulación confirma que el siguiente controlador conoce la restricción y no supone que esta terminó solo porque cambió la frecuencia.",
          "**Cerrar la restricción.** Al recibir una instrucción de liberación, se identifica si termina únicamente el ajuste ATC o si vuelven a regir velocidades publicadas. La fase final debe conservar márgenes de estabilización; si no se alcanza una aproximación estabilizada según el operador, se aplica su criterio de aproximación frustrada.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-22-02.webp",
        alt: "Historieta fotográfica de cuatro paneles: control asigna velocidad, tripulación colaciona, verifica energía y monitorea la aproximación.",
        ancho: 1672,
        alto: 941,
        pie: "Historieta didáctica, no transcripción: 1) control pide el ajuste por secuenciación; 2) el PM colaciona; 3) ambos verifican si el avión puede desacelerar sin comprometer el descenso; 4) la tripulación vigila configuración y estabilidad al aproximarse. Las pantallas no contienen datos operacionales utilizables.",
      },
      { kind: "sub", text: "Fraseología que sí está documentada" },
      {
        kind: "p",
        text: "El apéndice de fraseología de la Agencia de la Unión Europea para la Seguridad Aérea (EASA, European Union Aviation Safety Agency), AMC1 SERA.14001, sección 2.1.6, documenta REPORT SPEED; MAINTAIN [velocidad] KNOTS [OR GREATER/OR LESS] [UNTIL punto]; INCREASE o REDUCE SPEED TO [velocidad] KNOTS; RESUME NORMAL SPEED; REDUCE TO MINIMUM CLEAN SPEED; RESUME PUBLISHED SPEED; y NO [ATC] SPEED RESTRICTIONS. Los corchetes aquí indican variables o elementos opcionales de una plantilla, no una transmisión real. La fraseología se comprueba frente al Estado y la publicación vigente aplicables antes de usarla operacionalmente.",
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "No trasladar cifras entre Estados",
        text: "El Doc 4444 de la Organización de Aviación Civil Internacional (OACI; ICAO, International Civil Aviation Organization) consultado es una edición anterior: sus referencias a incrementos, velocidades mínimas o distancia al umbral orientan el estudio, pero no se presentan aquí como límites colombianos vigentes. Las restricciones publicadas, procedimientos y velocidades legales se comprueban en la Publicación de Información Aeronáutica (AIP, Aeronautical Information Publication) electrónica —eAIP— oficial de Aerocivil y en las publicaciones operacionales aplicables.",
      },
      {
        kind: "escenario",
        titulo: "La reducción que ya no cabe en el perfil",
        situacion: "Caso didáctico sin distintivo, frecuencia, ruta ni valores inventados. En descenso por llegada publicada, ATC solicita una velocidad inferior para espaciar dos aeronaves. El avión aún debe perder altura y cumplir una restricción posterior. La tripulación calcula que desacelerar de inmediato hará imposible cumplir ambas condiciones sin abandonar un perfil seguro.",
        preguntas: [
          {
            q: "¿Se colaciona y se acepta de todos modos para resolverlo después?",
            a: "No. El PM informa de inmediato que la velocidad solicitada no es realizable junto con el descenso o restricción vigente, y explica qué velocidad, nivel o alternativa podría aceptar. El PF conserva la trayectoria segura mientras se coordina una nueva instrucción; no se vuela una autorización imposible en silencio.",
          },
          {
            q: "Al oír NO ATC SPEED RESTRICTIONS, ¿puede elegirse cualquier velocidad?",
            a: "No. Se extingue el ajuste de velocidad de ATC, pero siguen aplicando los límites reglamentarios, las velocidades publicadas que no hayan sido canceladas y los márgenes del avión. Se revisa qué restricciones realmente permanecen antes de modificar el objetivo.",
          },
        ],
        concepto: "La colación confirma lo que se oyó; la evaluación confirma que se puede volar.",
      },
      {
        kind: "enLaOperacion",
        momento: "Cuando velocidad y descenso compiten",
        texto: "El PM coteja la autorización con las restricciones de la llegada y comunica pronto cualquier incapacidad. El PF supervisa trayectoria, modo de velocidad, distancia remanente y configuración. Ambos evitan resolver el conflicto con una maniobra brusca o llegar a la final sin estabilidad; solicitan una alternativa de ATC o ejecutan la opción segura prevista por su operador.",
      },
      { kind: "sub", text: "Errores que importan" },
      error("Confundir una velocidad exacta con un límite OR GREATER u OR LESS."),
      error("Aceptar simultáneamente una reducción y un descenso que el avión no puede realizar."),
      error("Olvidar la velocidad asignada al transferirse a otro sector."),
      error("Suponer que NO ATC SPEED RESTRICTIONS anula límites publicados o reglamentarios."),
      error("Priorizar una velocidad tardía por encima de la estabilización de la aproximación."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "El ajuste ATC busca separación; la tripulación responde por la capacidad y seguridad del avión.",
          "Se colacionan valor, límite y condición de terminación, no solo un número.",
          "Si no se puede cumplir, se avisa temprano y se propone una alternativa realizable.",
          "La liberación de un ajuste ATC no borra automáticamente otras restricciones.",
          "La aproximación estabilizada manda sobre intentar satisfacer tardíamente una consigna imposible.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "EASA · AMC1 SERA.14001; OACI · Doc 4444",
        bloques: [
          { kind: "sub", text: "Documentos oficiales" },
          { kind: "p", text: "EASA, Easy Access Rules for Standardised European Rules of the Air, revisión agosto de 2025, Appendix 1 to AMC1 SERA.14001, § 2.1.6 (https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-10299). OACI, Doc 4444 PANS-ATM, edición anterior disponible en portal oficial, § 4.6 y § 4.11 (https://applications.icao.int/tools/ATMiKIT/story_content/external_files/story_content/external_files/DOC%204444_PANS%20ATM_en.pdf). La primera respalda las plantillas de fraseología; el segundo, el principio de control de velocidad y aviso de incapacidad. Verificar edición actual y requisitos locales antes de uso operacional." },
          { kind: "sub", text: "Límites del material" },
          { kind: "list", items: [
            "La historieta y el escenario son construcciones didácticas; ninguna frase se presenta como grabación auténtica.",
            "No se atribuyen cifras operacionales ni procedimientos específicos a un aeropuerto colombiano.",
            "Para la operación real prevalecen la AIP/eAIP vigente de Aerocivil, la autorización recibida y los procedimientos del operador.",
          ] },
        ],
      },
    ],
  },
  // ── 23 ──────────────────────────────────────────────────────────────────
  {
    n: 23,
    title: "Crucero",
    kicker: "Transferencia de sector, solicitudes y reportes útiles",
    minutes: 19,
    blocks: [
      {
        kind: "p",
        text: "El crucero no es silencio de radio: una aeronave cruza sectores, mantiene una autorización de ruta y nivel, recibe cambios y puede necesitar informar condiciones que afectan a otros vuelos. La disciplina consiste en saber **qué dependencia controla**, **qué autorización sigue vigente** y **qué información debe llegar al siguiente sector**. El piloto que monitorea (PM, pilot monitoring) gestiona la comunicación sin perder la conciencia de la trayectoria que supervisa el piloto que vuela (PF, pilot flying).",
      },
      { kind: "sub", text: "Una transferencia no termina al cambiar el número" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Preparar la frecuencia.** Se escucha la dependencia y frecuencia que dicta el control de tránsito aéreo (ATC, air traffic control), se colacionan y se verifica la selección. Una digitación errónea puede hacer perder contacto en un momento que parece rutinario.",
          "**Distinguir la acción.** CONTACT exige llamar en la nueva frecuencia. STAND BY FOR pide permanecer a la escucha porque la dependencia iniciará el contacto. MONITOR indica escuchar la frecuencia designada sin iniciar una llamada normal. Son instrucciones distintas; no se intercambian por comodidad.",
          "**Dar un primer contacto útil.** Tras la transferencia se transmite distintivo y nivel según el procedimiento aplicable, además de velocidad asignada y otra condición que deba conocer el sector receptor. No se supone que el controlador tenga la misma imagen de lo que se acordó antes.",
          "**Confirmar recepción.** Si la dependencia no responde, se comprueba la frecuencia y el equipo, se reintenta de forma proporcionada y se usa la frecuencia anterior u otros medios conforme al procedimiento. El piloto no permanece indefinidamente en silencio ni improvisa una nueva ruta.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-23-01.svg",
        alt: "Esquema de tres pasos del relevo entre sectores: autorización vigente, transferencia de frecuencia y primer contacto confirmado.",
        ancho: 1600,
        alto: 900,
        pie: "Flujo conceptual, no sector ni frecuencia real: antes y después del relevo deben quedar claros el nivel, la ruta, la velocidad asignada y la dependencia que responde. Si falta respuesta, se aplican los procedimientos de restablecimiento de contacto.",
      },
      { kind: "sub", text: "Solicitudes: pedir no es recibir autorización" },
      {
        kind: "p",
        text: "En crucero puede solicitarse un directo, otro nivel por rendimiento o turbulencia, o una desviación meteorológica. La tripulación transmite la solicitud con el distintivo y el motivo útil para ATC, pero mantiene ruta y nivel actuales hasta recibir y colacionar una nueva autorización. Antes de activar un directo en el sistema de gestión de vuelo (FMS, Flight Management System), ambos pilotos identifican el punto autorizado, la pierna resultante y las restricciones que permanecen. Si se niega una solicitud, se mantiene la autorización anterior o se negocia una alternativa; una expectativa de respuesta favorable no mueve el avión.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-23-02.webp",
        alt: "Historieta fotográfica de control en ruta, transferencia de frecuencia, primer contacto de la tripulación y reporte de turbulencia.",
        ancho: 1672,
        alto: 941,
        pie: "Historieta didáctica, no grabación: 1) un sector entrega la aeronave; 2) el PM selecciona y comprueba la frecuencia mientras el PF vuela; 3) la tripulación establece contacto con el nuevo sector; 4) informa condiciones meteorológicas relevantes. No se muestran frecuencias, rutas ni indicativos reales.",
      },
      { kind: "sub", text: "Cuando la meteorología merece un reporte" },
      {
        kind: "p",
        text: "Una aeronotificación especial no es un comentario genérico sobre nubes. La norma europea SERA.12005 exige reportar, entre otros fenómenos, turbulencia o engelamiento moderados o severos, onda orográfica severa, determinados tipos de tormenta, tormenta intensa de polvo o arena y ceniza volcánica. Al transmitir, la tripulación identifica posición, hora, nivel y fenómeno observado de acuerdo con el formato aplicable, para que los servicios de tránsito aéreo (ATS, air traffic services) puedan redistribuir una advertencia útil. No se atribuye aquí una transmisión a un vuelo concreto que no esté documentado.",
      },
      { kind: "sub", text: "Plantillas documentadas, no diálogo inventado" },
      {
        kind: "p",
        text: "La Agencia de la Unión Europea para la Seguridad Aérea (EASA, European Union Aviation Safety Agency), en AMC1 SERA.14001, registra CONTACT [dependencia] [frecuencia], STAND BY FOR [dependencia] [frecuencia], MONITOR [dependencia] [frecuencia], REQUEST CHANGE TO [frecuencia] y REMAIN THIS FREQUENCY. Los campos entre corchetes son variables didácticas: ninguna cifra o estación ha sido creada para aparentar un mensaje real. La fraseología local y el procedimiento operacional se cotejan con la publicación estatal vigente.",
      },
      {
        kind: "escenario",
        titulo: "El sector nuevo no responde",
        situacion: "Caso didáctico sin frecuencia ni ruta inventada. Una tripulación recibe CONTACT con otra dependencia mientras mantiene una velocidad asignada y un nivel autorizado. El PM selecciona la frecuencia, pero no recibe respuesta en el primer intento; al mismo tiempo, el PF observa una zona de turbulencia adelante.",
        preguntas: [
          {
            q: "¿Qué información no debe perderse durante el relevo?",
            a: "Deben seguir claros el distintivo, la dependencia y frecuencia seleccionadas, ruta y nivel autorizados, velocidad asignada y condiciones relevantes. El PM verifica sintonía y equipo, reintenta según la situación y recupera la frecuencia anterior o el canal apropiado de acuerdo con el procedimiento para informar la falta de contacto. El PF mantiene la trayectoria segura.",
          },
          {
            q: "¿Puede empezar un directo para rodear la turbulencia mientras espera respuesta?",
            a: "No por el mero hecho de haber solicitado un cambio o de no recibir respuesta. La tripulación conserva la autorización vigente y comunica el problema por el medio disponible. Si la seguridad exige una acción inmediata, aplica el procedimiento pertinente y avisa tan pronto como sea posible; no disfraza una desviación no coordinada como autorización previa.",
          },
        ],
        concepto: "La frecuencia cambia; la responsabilidad de conocer y cumplir la autorización no se transfiere por suposición.",
      },
      {
        kind: "enLaOperacion",
        momento: "Crucero con cambio de sector",
        texto: "El PM colaciona la transferencia, compara la frecuencia sintonizada y prepara un primer contacto que incluya los elementos aún vigentes. El PF sigue la ruta autorizada y comprueba nivel, velocidad y meteorología. Si aparece una solicitud de cambio, ambos revisan capacidad, combustible y efecto sobre la ruta antes de ejecutarla; si no hay respuesta, recurren al procedimiento de recuperación de comunicaciones en lugar de asumir aprobación.",
      },
      { kind: "sub", text: "Errores que importan" },
      error("Tratar CONTACT, STAND BY FOR y MONITOR como si fueran equivalentes."),
      error("Omitir en el primer contacto una velocidad asignada que continúa vigente."),
      error("Activar un directo o cambiar de nivel porque la solicitud parece razonable."),
      error("Permanecer sin contacto tras una frecuencia mal seleccionada sin detectar el problema."),
      error("No reportar una condición meteorológica significativa observada en ruta."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Se conoce siempre la dependencia activa, la frecuencia y la autorización vigente.",
          "La transferencia exige selección correcta y contacto según el verbo recibido.",
          "El primer contacto informa nivel y condiciones relevantes que siguen vigentes.",
          "Un pedido de directo o nivel no autoriza a ejecutarlo.",
          "Las condiciones peligrosas observadas se reportan con información útil, no con frases vagas.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "EASA · AMC1 SERA.14001 y SERA.12005; OACI · Doc 4444",
        bloques: [
          { kind: "sub", text: "Documentos oficiales" },
          { kind: "p", text: "EASA, Easy Access Rules for Standardised European Rules of the Air, revisión agosto de 2025, Appendix 1 to AMC1 SERA.14001, § 1.1.4, transferencia y cambio de frecuencia (https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-10299); SERA.12005, observaciones especiales (https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-9921). OACI (ICAO, International Civil Aviation Organization), Doc 4444 PANS-ATM, edición anterior disponible en portal oficial, §§ 4.11–4.12 y Apéndice 1 (https://applications.icao.int/tools/ATMiKIT/story_content/external_files/story_content/external_files/DOC%204444_PANS%20ATM_en.pdf). Verificar siempre la edición actual y las reglas estatales aplicables." },
          { kind: "sub", text: "Límites del material" },
          { kind: "list", items: [
            "La figura no representa sectores ni frecuencias operacionales.",
            "La historieta y el escenario son didácticos y no transcripciones.",
            "No se inventan rutas, distintivos, frecuencias o aeronotificaciones para simular realidad documental.",
          ] },
        ],
      },
    ],
  },
  // ── 24 ──────────────────────────────────────────────────────────────────
  {
    n: 24,
    title: "Reportes de posición",
    kicker: "Seis elementos, estimados y responsabilidad de reportar",
    minutes: 19,
    blocks: [
      {
        kind: "p",
        text: "Un reporte de posición por voz permite a los servicios de tránsito aéreo (ATS, air traffic services) conocer el progreso real de una aeronave, especialmente donde la separación depende de información procedimental. La Organización de Aviación Civil Internacional (OACI; ICAO, International Civil Aviation Organization) define su estructura básica. La vigilancia o el enlace de datos pueden reducir algunos reportes, pero la tripulación no decide omitirlos por observar que el avión aparece en una pantalla: sigue la obligación publicada y las instrucciones recibidas.",
      },
      { kind: "sub", text: "Los seis elementos del reporte" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Identificación de la aeronave:** el distintivo con el que la dependencia la reconoce.",
          "**Posición:** el punto significativo o las coordenadas que corresponden al procedimiento; se comprueban con navegación y plan de vuelo, no se leen de memoria.",
          "**Hora:** el momento real sobre esa posición, expresado según la convención horaria aplicable. No se sustituye por la hora estimada que figuraba antes en el plan.",
          "**Nivel o altitud:** el nivel mantenido; si se está en ascenso o descenso, se indican nivel de paso y nivel autorizado según el formato aplicable.",
          "**Próxima posición y hora estimada:** se lee el punto siguiente junto con un estimado actualizado, no el punto posterior ni una hora de salida.",
          "**Punto significativo siguiente:** el que viene después de la próxima posición. Permite entender la continuación prevista de la ruta.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-24-01.svg",
        alt: "Tarjeta técnica de los seis elementos de un reporte de posición, sin indicativo, punto ni hora inventados.",
        ancho: 1600,
        alto: 900,
        pie: "Tarjeta de memoria basada en OACI Doc 4444: identificación, posición, hora, nivel, próximo punto con estimado y punto siguiente. La omisión de ciertos elementos depende de acuerdos regionales e instrucciones; el nivel se incluye en la primera llamada tras cambio de canal.",
      },
      { kind: "sub", text: "Lo que cambia según el servicio" },
      {
        kind: "list",
        items: [
          "El Doc 4444 de OACI, edición 16 consultada, permite omitir los elementos 4 a 6 de ciertos reportes de voz cuando así lo prescribe un acuerdo regional. No es una licencia general para abreviar cualquier reporte.",
          "El nivel o altitud se incluye en la llamada inicial después de cambiar el canal de voz, incluso si ciertas omisiones regionales permiten no repetirlo en reportes posteriores.",
          "Si hay una velocidad asignada, se incorpora según el procedimiento de reporte aplicable; no se supone que el siguiente sector la deducirá del progreso observado.",
          "El control de tránsito aéreo (ATC, air traffic control) puede ordenar omitir reportes o pedir el siguiente en un punto determinado. RESUME POSITION REPORTING devuelve la obligación que corresponda. Si se aproxima un límite de región de información de vuelo (FIR, Flight Information Region), se revisan además los requisitos de la dependencia siguiente.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-24-02.webp",
        alt: "Historieta fotográfica: piloto prepara datos, confirma la hora, transmite y operador de radio registra el reporte de posición.",
        ancho: 1672,
        alto: 941,
        pie: "Historieta didáctica, no comunicación grabada: 1) el PM prepara la posición con su plan; 2) confirma la hora efectiva y el estimado; 3) transmite mientras el PF vuela; 4) la estación recibe y registra. El océano y los equipos son genéricos; no aparecen coordenadas, indicativos ni frecuencias operacionales.",
      },
      { kind: "sub", text: "Preparación y transmisión sin improvisar" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Antes del punto:** el piloto que monitorea (PM, pilot monitoring) identifica el punto obligatorio siguiente, su estimado y el punto posterior en el plan de vuelo operacional o sistema de gestión de vuelo (FMS, Flight Management System). Verifica la autorización y el nivel con el piloto que vuela (PF, pilot flying).",
          "**Al sobrevolarlo:** confirma posición y hora efectiva, actualiza el siguiente estimado y ordena los seis elementos. Si el nivel está cambiando, evita anunciar como mantenido el nivel autorizado aún no alcanzado.",
          "**Durante la llamada:** escucha que el canal esté libre y comunica de forma breve y ordenada. Si ATC devuelve una instrucción en lugar de solo acusar recibo, se colaciona la parte que corresponda; un simple acuse no modifica ruta o nivel.",
          "**Después:** registra la hora real, confirma el próximo requisito de reporte y vigila si el estimado cambia. La magnitud que obliga a corregir un estimado o los puntos que pueden omitirse dependen del procedimiento regional y estatal aplicable; no se fija aquí un umbral inventado.",
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "No confundir formato universal con detalle local",
        text: "La estructura de seis elementos viene de OACI Doc 4444; los puntos obligatorios, periodicidad alternativa, coordenadas, tolerancia del estimado y canal de reporte dependen del espacio aéreo y de publicaciones vigentes. Para Colombia, consultar exclusivamente la Publicación de Información Aeronáutica (AIP, Aeronautical Information Publication) electrónica —eAIP— oficial de Aerocivil. Las imágenes no son cartas ni documentos AIP.",
      },
      {
        kind: "escenario",
        titulo: "El estimado cambió antes del punto",
        situacion: "Caso didáctico sin ruta, indicativo, coordenadas ni horas fabricadas. Una aeronave se aproxima a un punto de notificación obligatoria en un sector procedimental. El PM observa que su estimado anterior ya no coincide con el FMS; además, el avión todavía asciende hacia el nivel autorizado. La dependencia no ha cancelado los reportes.",
        preguntas: [
          {
            q: "¿Qué se prepara para el reporte y qué error debe evitarse?",
            a: "El PM confirma con el PF el punto real, la hora al pasarlo, el nivel de paso y el autorizado, el nuevo estimado del punto próximo y el punto siguiente. No anuncia el nivel autorizado como si ya estuviera mantenido ni repite el estimado viejo por inercia. Si corresponde actualizar el estimado antes de pasar, lo comunica conforme al procedimiento aplicable.",
          },
          {
            q: "¿Puede omitir el reporte porque una pantalla de vigilancia muestra la aeronave?",
            a: "No. La obligación termina o cambia por norma, acuerdo regional o instrucción ATC aplicable, no por una suposición de la tripulación acerca de la cobertura. Se reporta salvo que exista exención válida o instrucción específica.",
          },
        ],
        concepto: "Un reporte útil describe lo que ocurrió y lo que se estima ahora, no lo que decía el plan antes.",
      },
      {
        kind: "enLaOperacion",
        momento: "Ruta con reportes procedimentales",
        texto: "El PM mantiene actualizado el registro de punto, hora real, estimado y nivel, y prepara la frase antes de transmitir. El PF verifica la trayectoria y el nivel mientras escucha la coherencia del reporte. Si cambian estimados, autorización o condiciones, ambos revisan qué debe informarse al sector y qué dato se entregará en el primer contacto con la dependencia siguiente.",
      },
      { kind: "sub", text: "Errores que importan" },
      error("Leer el estimado de un punto distinto del que sigue en la ruta autorizada."),
      error("Anunciar como mantenido el nivel autorizado cuando el avión todavía asciende o desciende."),
      error("Sustituir la hora efectiva de paso por el estimado anterior."),
      error("Omitir un reporte obligatorio porque se presume vigilancia o enlace de datos."),
      error("No corregir un estimado significativamente cambiado conforme al procedimiento aplicable."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Seis piezas: quién, dónde, cuándo, nivel, próximo con estimado y siguiente.",
          "La hora real de paso no es el estimado previo.",
          "El nivel de paso y el autorizado se diferencian cuando el avión cambia de nivel.",
          "Las omisiones solo aplican si norma, acuerdo o ATC lo permiten.",
          "El reporte se prepara y verifica en cabina antes de ocupar la frecuencia.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "OACI · Doc 4444, edición 16",
        bloques: [
          { kind: "sub", text: "Documento oficial" },
          { kind: "p", text: "OACI, Doc 4444 PANS-ATM, edición 16, enmienda 10 publicada en su portal oficial, §§ 4.11.1–4.11.2 y Apéndice 1 (https://www.icao.int/ESAF/Documents/meetings/2021/AFI%20ATM%20Coordination%20Meeting%202021/Presentations/4444_16ed_amend_10_highlighted.pdf). El documento respalda los seis elementos, las condiciones de omisión y el nivel en la llamada inicial tras cambiar canal. Verificar edición actual, acuerdos regionales y eAIP antes de uso operacional." },
          { kind: "sub", text: "Límites del material" },
          { kind: "list", items: [
            "La tarjeta es una ayuda de estudio, no un formato estatal de reporte.",
            "La historieta y el escenario son didácticos, no una transcripción ni un reporte archivado.",
            "No se inventan puntos, coordenadas, frecuencias o tiempos para dar apariencia de caso real.",
          ] },
        ],
      },
    ],
  },
  // ── 25 ──────────────────────────────────────────────────────────────────
  {
    n: 25,
    title: "Desvíos por meteorología",
    kicker: "Pedir temprano, precisar el cambio y manejar la respuesta",
    minutes: 20,
    blocks: [
      {
        kind: "p",
        text: "Un desvío para evitar meteorología adversa modifica la trayectoria o el nivel autorizados. La tripulación detecta la amenaza, decide qué espacio necesita y coordina con el control de tránsito aéreo (ATC, air traffic control) **antes** de acercarse demasiado al fenómeno. No basta decir que hay una nube: el controlador necesita saber qué cambio se solicita, en qué dirección, hasta dónde y con qué urgencia para comprobar el tráfico.",
      },
      { kind: "sub", text: "Preparar una solicitud útil" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Qué cambia:** trayectoria lateral, rumbo, directo o nivel. El piloto que vuela (PF, pilot flying) y el piloto que monitorea (PM, pilot monitoring) acuerdan la maniobra que realmente sirve, sin transformar una solicitud lateral en descenso implícito.",
          "**Lado y magnitud:** se indica izquierda o derecha de la ruta, o el rumbo requerido, y el margen aproximado que permita describir la solicitud. No se inventa una cota universal de separación de la célula: los criterios del operador y las condiciones prevalecen.",
          "**Motivo y tiempo:** se comunica que es por meteorología y se pide temprano. Una alerta anticipada permite a ATC organizar el tráfico; si el riesgo ya es inmediato, se dice claramente que la acción no puede esperar.",
          "**Límite y regreso:** se especifica, si es posible, cuándo podría reanudarse la ruta o qué condición indicará que se está libre del fenómeno. La ruta original no se recupera a ciegas si la autorización de desvío o un vector posterior requieren coordinación.",
          "**Plan alternativo:** si ATC no puede aprobar el lado solicitado, la tripulación evalúa el otro lado, un nivel distinto, espera o cambio de ruta. No acepta una alternativa que conduzca al mismo peligro.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-25-01.svg",
        alt: "Tarjeta conceptual con los cinco datos de una solicitud temprana de desvío meteorológico.",
        ancho: 1600,
        alto: 900,
        pie: "Estructura de comunicación, no carta ni procedimiento de contingencia: qué maniobra, lado y magnitud, motivo, momento y límite o regreso. La tripulación no ejecuta un cambio solicitado hasta recibir autorización, salvo que la seguridad obligue a actuar conforme al procedimiento de contingencia aplicable.",
      },
      { kind: "sub", text: "La autorización y la incapacidad no son detalles menores" },
      {
        kind: "p",
        text: "Una solicitud no modifica la autorización vigente. La regla SERA.8015 de la Agencia de la Unión Europea para la Seguridad Aérea (EASA, European Union Aviation Safety Agency) distingue el cambio solicitado y autorizado de una emergencia que exige acción inmediata; en ese último caso se informa a los servicios de tránsito aéreo (ATS, air traffic services) tan pronto como sea posible. Esta norma europea ayuda a explicar la lógica, pero no se presenta como reglamentación colombiana. El procedimiento OACI específico para desviarse por meteorología sin autorización previa depende del entorno operacional y no debe improvisarse a partir de una historieta.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-25-02.webp",
        alt: "Historieta fotográfica de cuatro paneles: tripulación identifica la célula, solicita desvío, control evalúa tráfico y la tripulación comprueba la ruta autorizada.",
        ancho: 1672,
        alto: 941,
        pie: "Historieta didáctica, no transcripción: 1) los pilotos reconocen el fenómeno con tiempo; 2) el PM solicita un cambio concreto mientras el PF vuela; 3) ATC valora el tráfico; 4) la tripulación confirma y vigila la nueva trayectoria. La imagen no prescribe una distancia mínima, rumbo ni procedimiento local.",
      },
      { kind: "sub", text: "Secuencia radiotelefónica completa" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Aviso y solicitud.** El PM transmite distintivo, fenómeno y cambio necesario con lenguaje claro y conciso cuando no hay una frase normalizada que cubra todo. Las plantillas de esta lección usan campos entre corchetes, no indicativos, frecuencias ni rutas inventados.",
          "**Respuesta de ATC.** El controlador aprueba el cambio con límites explícitos, pide esperar o declara que no puede aprobarlo por tráfico. El PM colaciona el lado, rumbo, nivel y cualquier instrucción de reportar o reingresar; el PF compara el modo y la trayectoria seleccionados con la autorización.",
          "**Si la alternativa no es segura.** La tripulación dice que no puede aceptarla y propone otra opción. Una respuesta negativa del controlador no convierte en seguro el sector meteorológico que se quiere evitar.",
          "**Durante y después.** Se vigilan límites autorizados, separación y combustible; se comunica cuándo se está libre del fenómeno y se solicita o confirma el reingreso. Si se recibió una instrucción de REPORT BACK ON ROUTE, se reporta cuando efectivamente se está sobre la ruta original, no cuando apenas se está libre de nubes.",
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Contingencia sin autorización: procedimiento, no atajo",
        text: "La Organización de Aviación Civil Internacional (OACI; ICAO, International Civil Aviation Organization) incluye en el Doc 4444 un procedimiento de contingencia para meteorología cuando no puede obtenerse una autorización revisada; no es intercambiable con un desvío ATC aprobado. Una guía oficial regional de OACI consultada recalca esa distinción. Aquí no se enseñan desplazamientos, distancias, cambios de nivel o frecuencias de contingencia fuera de su contexto completo: antes de una operación real se estudian la edición vigente del Doc 4444, la publicación del Estado, el espacio aéreo y los procedimientos del operador.",
      },
      {
        kind: "escenario",
        titulo: "El lado disponible no evita la célula",
        situacion: "Caso didáctico sin ruta, punto, frecuencia ni distancia inventados. La tripulación solicita anticipadamente desviarse hacia el lado que muestra aire claro. ATC no puede aprobar ese lado por tráfico y propone el opuesto, donde los pilotos observan otra célula convectiva. La separación meteorológica disponible se está agotando.",
        preguntas: [
          {
            q: "¿Se acepta la alternativa del controlador para conservar la separación de tránsito?",
            a: "No si también es insegura. El PM informa claramente que no puede aceptarla y solicita una alternativa practicable; el PF mantiene el control y evalúa las opciones de trayectoria, nivel y tiempo. Debe comunicarse la urgencia real. Si el margen de seguridad exige actuar sin autorización, se aplica la contingencia o emergencia pertinente y se avisa tan pronto como sea posible; no se asume que el rechazo equivale a autorización de otro rumbo.",
          },
          {
            q: "Cuando el avión deja atrás la célula, ¿terminó el desvío?",
            a: "No necesariamente. La tripulación verifica los límites de la autorización y coordina el regreso a la ruta o una nueva ruta. Si se pidió REPORT BACK ON ROUTE, el reporte corresponde al reingreso efectivo, no simplemente a estar libre de meteorología.",
          },
        ],
        concepto: "Pedir pronto abre opciones; aceptar un lado inseguro o improvisar el regreso las cierra.",
      },
      {
        kind: "enLaOperacion",
        momento: "Células convectivas en ruta",
        texto: "El PF mantiene una trayectoria segura y revisa qué desvío es viable con las limitaciones del avión y del operador. El PM prepara una petición breve con lado, magnitud, motivo y necesidad temporal; escucha con precisión los límites que devuelva ATC. Ambos verifican el efecto sobre combustible, nivel, tráfico y regreso, y distinguen una aprobación normal de un procedimiento de contingencia si el tiempo de reacción se agota.",
      },
      { kind: "sub", text: "Errores que importan" },
      error("Pedir un desvío cuando ya no queda tiempo útil para coordinarlo."),
      error("Solicitar solo «desvío» sin lado, margen ni intención de regreso."),
      error("Interpretar una solicitud enviada como autorización recibida."),
      error("Aceptar por presión una alternativa que conduce a otra zona peligrosa."),
      error("Informar «de regreso» antes de reingresar efectivamente a la ruta cuando ATC pidió ese reporte."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Se solicita con tiempo y precisión: qué, lado, magnitud, motivo y límite.",
          "Se mantiene la autorización actual hasta que ATC apruebe el cambio.",
          "Una alternativa insegura se rechaza y se propone otra.",
          "El regreso se confirma conforme a la autorización, no por intuición.",
          "La contingencia sin autorización es una situación distinta que exige el procedimiento vigente.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "OACI · Doc 4444 y guía regional; EASA · SERA.8015",
        bloques: [
          { kind: "sub", text: "Documentos oficiales" },
          { kind: "p", text: "OACI, Doc 4444 PANS-ATM, edición oficial anterior consultada, §§ 4.5.7.4, 4.12.3 y 15.2.3 (https://applications.icao.int/tools/ATMiKIT/story_content/external_files/story_content/external_files/DOC%204444_PANS%20ATM_en.pdf). OACI, SAT OESB 2024-002 revisión 01, § 2 Weather Deviation Procedures, distingue contingencia sin autorización y desvío aprobado (https://www.icao.int/sites/default/files/WACAF/MeetingDocs/2025/SAT%20DOCUMENTS/SAT-OESB-2024-002_Revision-01.pdf). EASA, Easy Access Rules SERA.8015, cambios al plan de vuelo controlado (https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-9888). Para Colombia se consulta exclusivamente la Publicación de Información Aeronáutica (AIP, Aeronautical Information Publication) electrónica —eAIP— vigente de Aerocivil; no se infieren cifras de un ejemplo extranjero." },
          { kind: "sub", text: "Límites del material" },
          { kind: "list", items: [
            "La tarjeta y la historieta son didácticas; no representan una ruta, carta o frecuencia real.",
            "No se proporciona un procedimiento de contingencia incompleto ni una separación fija respecto de tormentas.",
            "El escenario no es una transcripción y no autoriza una maniobra operacional.",
          ] },
        ],
      },
    ],
  },
  // ── 26 ──────────────────────────────────────────────────────────────────
  {
    n: 26,
    title: "STAR y llegada",
    kicker: "Distinguir previsión, autorización y cambios durante el descenso",
    minutes: 19,
    blocks: [
      {
        kind: "p",
        text: "Una llegada normalizada por instrumentos (STAR, Standard Terminal Arrival Route) enlaza la ruta de vuelo con el entorno de aproximación mediante una trayectoria publicada. Para una tripulación de aerolínea, la tarea no consiste en memorizar un nombre: hay que saber qué ruta está autorizada, qué restricciones siguen vigentes, cuál es el nivel autorizado y qué aproximación solo se ha anunciado como probable. Las cartas y procedimientos concretos se consultan en la publicación estatal vigente; ninguna imagen de esta lección es una carta.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-26-01.svg",
        alt: "Esquema conceptual que diferencia EXPECT, autorización de descenso por STAR y autorización de aproximación; muestra la revisión necesaria ante un directo o cambio de pista.",
        ancho: 1600,
        alto: 900,
        pie: "Esquema didáctico, no carta: EXPECT permite preparar pero no ejecutar; una autorización de descenso por la STAR incorpora las restricciones que corresponden; CLEARED APPROACH es una autorización diferente. Ante un directo o cambio de pista, la tripulación revisa la trayectoria y comunica temprano si no puede cumplir.",
      },
      { kind: "sub", text: "Tres mensajes que no se deben mezclar" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Llegada autorizada:** se comprueba el designador y la transición aplicables contra la carta vigente, la autorización y la ruta cargada en el sistema de gestión de vuelo (FMS, Flight Management System). Cargar una STAR no equivale por sí solo a estar autorizado a volarla.",
          "**Descenso autorizado:** el nivel límite y las restricciones asociadas dependen de la frase recibida. En la fraseología documentada por la Agencia de la Unión Europea para la Seguridad Aérea (EASA, European Union Aviation Safety Agency), DESCEND VIA STAR TO (level) incluye la ruta lateral y las restricciones de nivel y velocidad publicadas hasta el nivel autorizado. Una instrucción distinta no se interpreta por analogía: se confirma su efecto cuando exista duda.",
          "**Aproximación prevista o autorizada:** EXPECT informa qué preparar; CLEARED (type of approach) APPROACH autoriza la aproximación indicada según sus condiciones. Ni el aviso de pista ni una STAR cargada constituyen por sí mismos la autorización de aproximación.",
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "La frase publicada y la jurisdicción importan",
        text: "La distinción DESCEND VIA STAR, cancelación de restricciones y directo aparece en la fraseología EASA AMC1 SERA.14001; se cita como referencia documental europea, no como publicación colombiana. Para operar en Colombia, comprobar la Publicación de Información Aeronáutica (AIP, Aeronautical Information Publication) electrónica —eAIP— oficial de Aerocivil, el procedimiento, la carta y la autorización real. Este material no fija pistas, puntos, frecuencias, niveles ni mínimos.",
      },
      { kind: "sub", text: "Antes de iniciar el descenso" },
      {
        kind: "list",
        items: [
          "El piloto que monitorea (PM, pilot monitoring) obtiene la información terminal disponible, identifica pista y aproximación previstas, carta vigente, transición, restricciones y comunicaciones esperadas. El piloto que vuela (PF, pilot flying) revisa el plan de descenso, combustible, meteorología y energía del avión.",
          "Ambos comparan la STAR y su transición en la autorización con la representación en el FMS y la carta. Revisan discontinuidades, restricciones de nivel y velocidad, sentido de los virajes, distancia disponible y posibles cambios de pista. La función de descenso del avión no garantiza cumplimiento de una restricción.",
          "La preparación del ajuste altimétrico y del nivel de transición se hace con información oficial recibida y con el procedimiento aplicable; aquí no se inventa un valor de presión ni un nivel local. La lectura y colación de altitud o nivel autorizados deben ser inequívocas.",
          "Antes del primer contacto con la dependencia de aproximación se identifican los elementos que siguen vigentes: nivel, velocidad asignada, ruta autorizada y datos terminales recibidos. No se omite una restricción solo porque otro sector ha tomado la frecuencia.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-26-02.webp",
        alt: "Historieta fotográfica en cuatro paneles: preparación de llegada en cabina, recepción por radio, control de aproximación y verificación conjunta de un cambio de trayectoria.",
        ancho: 2048,
        alto: 1152,
        pie: "Historieta didáctica, no transcripción: 1) PF y PM preparan llegada y aproximación con material vigente; 2) el PM escucha y colaciona la autorización; 3) aproximación coordina la secuencia; 4) ambos verifican ruta, restricciones y distancia restante tras un cambio. Las pantallas son genéricas y no representan una carta, radar o autorización real.",
      },
      { kind: "sub", text: "Cuando ATC cambia algo durante la llegada" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Escuchar y separar variables:** identificar si el control de tránsito aéreo (ATC, air traffic control) cambia ruta, nivel, velocidad, pista o aproximación. Colacionar con claridad lo que exige respuesta; un aviso EXPECT no se transforma en autorización.",
          "**Revisar el tramo nuevo:** un directo puede saltar puntos, reducir millas de descenso y cambiar qué restricciones están delante. El PM comprueba la nueva secuencia en FMS y carta; el PF vigila la trayectoria y la energía. Se confirma con ATC cualquier incertidumbre sobre restricciones o reincorporación; no se deduce una cancelación tácita.",
          "**Recalcular factibilidad:** si el avión queda alto, rápido o sin tiempo de preparación por un directo o cambio de pista, comunicarlo pronto. Solicitar distancia, otra instrucción o tiempo de preparación según el caso; no aceptar en silencio una autorización imposible de cumplir.",
          "**Confirmar la aproximación:** preparar una aproximación esperada es útil, pero se espera su autorización específica antes de ejecutarla. Una instrucción de rumbo o nivel tampoco autoriza por sí sola a iniciar una aproximación.",
        ],
      },
      {
        kind: "escenario",
        titulo: "Un directo acorta el descenso",
        situacion: "Caso didáctico sin ruta, pista, indicativo, frecuencia, carta ni cifra inventadas. La tripulación recibió una STAR y un nivel de descenso. Durante el descenso, ATC ofrece un directo que omite parte de la trayectoria. El FMS muestra menos distancia restante y una restricción que requiere revisar su aplicabilidad. Aproximación había anunciado una pista como EXPECT, pero aún no ha autorizado la aproximación.",
        preguntas: [
          {
            q: "¿Qué hacen PF y PM antes de activar el directo?",
            a: "El PM colaciona el directo y verifica en la carta vigente y el FMS el tramo al que se irá, las restricciones delante y el efecto en la distancia disponible. El PF mantiene el control del descenso y comprueba la energía. Si el efecto sobre una restricción o la reincorporación no es claro, se confirma con ATC antes de asumir que dejó de aplicar.",
          },
          {
            q: "Si no alcanzan a cumplir el descenso, ¿pueden ignorar la restricción y comenzar la aproximación prevista?",
            a: "No. Comunican temprano que no pueden cumplir y solicitan una solución o instrucción revisada. EXPECT solo sirve para preparar; no autoriza a iniciar la aproximación. Cuando se reciba una autorización de aproximación, ambos verifican que corresponde a la pista y procedimiento preparados.",
          },
        ],
        concepto: "Un cambio de ruta modifica la geometría y el tiempo disponible; no convierte una expectativa en autorización ni borra restricciones por suposición.",
      },
      {
        kind: "enLaOperacion",
        momento: "Llegada con alta carga de trabajo",
        texto: "El PM conserva una imagen verbal de la autorización —ruta, nivel, velocidad, pista prevista y elementos aún por confirmar— mientras selecciona y verifica los cambios en el FMS. El PF monitorea trayectoria y energía, y comunica si una instrucción exige más tiempo o distancia. Después de cada cambio, los dos hacen una comprobación cruzada breve con la carta y la autorización, incluida la preparación altimétrica, sin dejar que la programación sustituya el control del vuelo.",
      },
      { kind: "sub", text: "Errores que importan" },
      error("Tratar EXPECT como autorización para descender por una ruta o iniciar la aproximación."),
      error("Aceptar un directo sin revisar distancia restante y restricciones aplicables."),
      error("Suponer que un cambio de nivel o de pista cancela automáticamente toda restricción publicada."),
      error("Cargar una llegada diferente de la autorizada o no verificar la transición."),
      error("Callar que la aeronave quedó alta, rápida o sin tiempo para preparar el nuevo procedimiento."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "La carta publicada, la autorización y el FMS deben coincidir.",
          "EXPECT permite planear; CLEARED APPROACH es una autorización distinta.",
          "DESCEND VIA STAR tiene implicaciones concretas para ruta y restricciones donde esa fraseología es aplicable.",
          "Directos y cambios de pista exigen comprobar geometría, energía y restricciones.",
          "Si no se puede cumplir, se comunica antes de llegar al punto crítico.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "EASA · AMC1 SERA.14001; OACI · Doc 4444",
        bloques: [
          { kind: "sub", text: "Documentos oficiales" },
          {
            kind: "p",
            text: "EASA, Easy Access Rules for Standardised European Rules of the Air, Appendix 1 to AMC1 SERA.14001, frases DESCEND VIA STAR TO (level), cancelación de restricciones, directo y autorización de aproximación (https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-10299). Organización de Aviación Civil Internacional (OACI; ICAO, International Civil Aviation Organization), Doc 4444 PANS-ATM, edición 16 publicada en su portal (https://www.icao.int/ESAF/Documents/meetings/2021/AFI%20ATM%20Coordination%20Meeting%202021/Presentations/4444_16ed_amend_10_highlighted.pdf). Verificar edición y aplicación estatal vigentes.",
          },
          { kind: "sub", text: "Límites del material" },
          { kind: "list", items: [
            "La figura esquematiza decisiones; no es una STAR, una carta ni un procedimiento.",
            "La historieta y el escenario son didácticos, no registro de una comunicación real.",
            "No se inventan puntos, pistas, mínimos, QNH, frecuencias o rutas para simular un ejemplo documental.",
          ] },
        ],
      },
    ],
  },
  // ── 27 ──────────────────────────────────────────────────────────────────
  {
    n: 27,
    title: "Aproximación",
    kicker: "Vector, autorización, establecimiento y cambio de pista",
    minutes: 20,
    blocks: [
      {
        kind: "p",
        text: "Durante la aproximación, una tripulación puede recibir rumbos de interceptación, una aproximación prevista, una autorización para el procedimiento, un pedido de reportar establecido y después una transferencia a torre. Son actos distintos. Confundir uno con otro puede llevar a abandonar un rumbo antes de tiempo, descender sin autorización o preparar la pista equivocada. Esta lección se concentra en la comunicación y la comprobación cruzada, no sustituye la carta ni enseña a volar un procedimiento específico.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-27-01.svg",
        alt: "Esquema conceptual que separa vector o EXPECT, autorización de aproximación, reporte de establecido y autorización de aterrizaje.",
        ancho: 1600,
        alto: 900,
        pie: "Esquema didáctico, no carta: un rumbo o EXPECT orienta y permite preparar; CLEARED APPROACH autoriza un procedimiento; REPORT ESTABLISHED pide informar un hecho cuando ocurra. La autorización de aproximación no equivale a autorización de aterrizaje.",
      },
      { kind: "sub", text: "Reconocer el alcance de cada transmisión" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**EXPECT:** comunica el tipo de aproximación o pista que se prevé. PM y PF preparan la carta, los mínimos y la configuración, pero siguen la autorización vigente; la expectativa puede cambiar.",
          "**VECTOR:** el rumbo asignado lleva hacia la secuencia o la interceptación. Según OACI Doc 4444, al vectorizar para interceptar una ayuda interpretada por el piloto se pide reportar establecido en el rumbo de aproximación final, y la autorización de aproximación normalmente se emite antes del reporte de establecido. El rumbo por sí solo no es esa autorización.",
          "**CLEARED APPROACH:** identifica el procedimiento autorizado y, cuando corresponde, la pista. La tripulación colaciona y coteja tipo, designador y pista con la carta vigente y el sistema de gestión de vuelo (FMS, Flight Management System). La fraseología de EASA permite CLEARED (type of approach) APPROACH [RUNWAY (number)]; su aplicación local se verifica.",
          "**REPORT ESTABLISHED:** pide una notificación posterior. El piloto que monitorea (PM, pilot monitoring) no anuncia establecido mientras el avión sigue en interceptación; el piloto que vuela (PF, pilot flying) confirma captura y trayectoria conforme al procedimiento y a los instrumentos.",
          "**CONTACT TOWER y aterrizaje:** una transferencia cambia la dependencia y frecuencia de comunicación. Haber sido autorizado a la aproximación no es haber sido autorizado a aterrizar; se escucha y colaciona la autorización de aterrizaje por separado.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-27-02.webp",
        alt: "Historieta fotográfica en tres paneles: piloto escucha, controladora de aproximación coordina y tripulación comprueba conjuntamente el procedimiento en la cabina.",
        ancho: 1672,
        alto: 941,
        pie: "Historieta didáctica, no transcripción: 1) el PM recibe y colaciona rumbo o autorización; 2) la controladora coordina la aproximación; 3) PF y PM confirman tipo, pista, modos y trayectoria antes de reportar establecido. Pantallas genéricas, sin carta, frecuencia o vuelo real.",
      },
      { kind: "sub", text: "La secuencia operacional completa" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Preparar antes del vector final:** obtener información terminal y carta vigente, confirmar capacidad del avión y de la tripulación para el procedimiento, revisar aproximación frustrada, mínimos, meteorología, energía y estabilización según los procedimientos del operador. Una pista prevista no elimina la necesidad de volver a verificar.",
          "**Recibir y colacionar:** separar rumbo, nivel, velocidad, pista y tipo de aproximación. El control de tránsito aéreo (ATC, air traffic control) puede transmitir varios elementos juntos; el PM anota o retiene los críticos y el PF coteja lo seleccionado con lo oído. Si un elemento no se escucha o resulta inconsistente, se pide repetición o confirmación.",
          "**Interceptar sin adelantarse:** mantener el último rumbo autorizado hasta que la instrucción o el procedimiento autorizado permitan dejarlo. Confirmar que los modos de navegación y aproximación reflejan la intención, no solo que un indicador se ilumina. La transferencia a torre se efectúa según la instrucción recibida.",
          "**Reportar y seguir escuchando:** si se solicitó REPORT ESTABLISHED, transmitir cuando efectivamente se cumpla. Continuar vigilando instrucciones, información esencial del aeródromo y la autorización posterior de aterrizaje. Una aproximación autorizada puede terminar en aproximación frustrada si no se cumplen las condiciones de continuación.",
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "No usar esta lección como carta o fraseología colombiana",
        text: "Los ejemplos aquí son conceptuales y no contienen una pista, ILS, RNP, frecuencia, altitud, QNH o mínimo inventados. Para Colombia se utiliza exclusivamente la Publicación de Información Aeronáutica (AIP, Aeronautical Information Publication) electrónica —eAIP— oficial de Aerocivil y la autorización recibida. Las frases EASA se citan con su jurisdicción; no se atribuyen a una carta colombiana.",
      },
      { kind: "sub", text: "Si cambia el procedimiento o no se puede cumplir" },
      {
        kind: "list",
        items: [
          "Una pista o tipo de aproximación diferente cambia carta, trayectoria, equipo, energía y briefing. El PM identifica exactamente qué fue anunciado y qué fue autorizado; ambos verifican que la selección en el FMS corresponda a la instrucción real, no a la expectativa anterior.",
          "Si la aeronave o la tripulación no reúne los requisitos del procedimiento ofrecido, o no hay tiempo para prepararlo con seguridad, se comunica UNABLE y se solicita una alternativa. No se acepta una autorización esperando resolver la incompatibilidad después.",
          "La aproximación visual también exige una autorización específica y las condiciones aplicables. Informar que se tiene una referencia visual no sustituye la autorización; OACI Doc 4444 condiciona la autorización de aproximación visual en vectores al reporte de aeródromo o tránsito precedente a la vista.",
          "Si ATC emite una advertencia de baja altitud, la prioridad es mantener o recuperar una trayectoria segura conforme a los procedimientos de la aeronave y responder con información útil. No se espera a completar un intercambio largo para actuar.",
        ],
      },
      {
        kind: "escenario",
        titulo: "Cambio tardío de aproximación",
        situacion: "Caso didáctico sin aeródromo, pista, indicativo, frecuencia, rumbo o mínimo inventados. Durante los vectores, la tripulación tiene preparada una aproximación por instrumentos que solo fue anunciada como EXPECT. ATC informa que se usará otra aproximación. El PM necesita cambiar la selección y ambos pilotos deben verificar la nueva carta; entretanto llega un rumbo de interceptación. Aún no se ha transmitido CLEARED APPROACH.",
        preguntas: [
          {
            q: "¿Qué se vuela y qué se comunica mientras no llega la autorización de aproximación?",
            a: "Se cumple el rumbo y nivel autorizados, con vigilancia de trayectoria y separación conforme al servicio. El PM aclara tipo y pista previstos, evalúa junto al PF el tiempo necesario y comunica si no pueden preparar el cambio con seguridad. Ninguno inicia el procedimiento solo por haberlo cargado o por esperar la autorización.",
          },
          {
            q: "¿Qué deben comprobar al recibir finalmente CLEARED APPROACH?",
            a: "Colacionar el procedimiento y pista autorizados; cotejarlos entre autorización, carta vigente y selección del FMS; comprobar capacidad, modos, energía y condiciones de continuación. Si ATC pidió reportar establecido, hacerlo solo cuando lo estén. La autorización de aterrizaje seguirá siendo independiente.",
          },
        ],
        concepto: "El vector y la expectativa no reemplazan la autorización; un cambio tardío requiere tiempo, verificación y comunicación franca.",
      },
      {
        kind: "enLaOperacion",
        momento: "De aproximación a torre",
        texto: "El PM conserva la autorización de rumbo, nivel y velocidad mientras verifica la aproximación recibida y prepara la transferencia. El PF supervisa la trayectoria y anuncia cualquier diferencia entre el avión, el FMS y la carta. Tras reportar establecido si fue requerido, la tripulación sigue escuchando: contacto con torre, autorización de aterrizaje y cambios de último momento son eventos separados. Si la aproximación deja de estar estabilizada o segura, se aplica el procedimiento de aproximación frustrada y se comunica.",
      },
      { kind: "sub", text: "Errores que importan" },
      error("Tomar EXPECT o un rumbo de interceptación como autorización de aproximación."),
      error("Reportar establecido antes de que la aeronave lo esté efectivamente."),
      error("Cambiar pista o tipo en el FMS sin comprobar autorización y carta vigentes."),
      error("Aceptar una aproximación para la que avión o tripulación no cumplen los requisitos."),
      error("Confundir autorización de aproximación con autorización de aterrizaje."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "EXPECT prepara; CLEARED APPROACH autoriza el procedimiento.",
          "Un vector se colaciona y se vuela; por sí solo no autoriza la aproximación.",
          "REPORT ESTABLISHED se cumple solo cuando el avión está establecido.",
          "Un cambio tardío exige revisar procedimiento, capacidad y tiempo disponible.",
          "Aproximación autorizada y aterrizaje autorizado son dos decisiones distintas.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "OACI · Doc 4444; EASA · AMC1 SERA.14001",
        bloques: [
          { kind: "sub", text: "Documentos oficiales" },
          { kind: "p", text: "OACI (ICAO, International Civil Aviation Organization), Doc 4444 PANS-ATM, edición 15 con enmienda 4 disponible en portal oficial, §§ 8.9.4 y 8.9.5, sobre vectores, reporte de establecido y aproximación visual (https://applications.icao.int/tools/ATMiKIT/story_content/external_files/story_content/external_files/DOC%204444_PANS%20ATM_en.pdf). Agencia de la Unión Europea para la Seguridad Aérea (EASA, European Union Aviation Safety Agency), Easy Access Rules for SERA, Appendix 1 to AMC1 SERA.14001, § 1.3.2, autorización de aproximación (https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-10299). Confirmar siempre publicación y edición estatales vigentes." },
          { kind: "sub", text: "Límites del material" },
          { kind: "list", items: [
            "El esquema no muestra una geometría de interceptación ni mínimos reales.",
            "La historieta y el escenario son didácticos, no transcripciones.",
            "No se fabrican pistas, ayudas, frecuencias o autorizaciones específicas.",
          ] },
        ],
      },
    ],
  },
  // ── 28 ──────────────────────────────────────────────────────────────────
  {
    n: 28,
    title: "Espera (holding)",
    kicker: "Autorización de espera, EAT y margen de combustible",
    minutes: 19,
    blocks: [
      {
        kind: "p",
        text: "Una espera mantiene a la aeronave en un espacio protegido mientras se organiza una autorización posterior. En comunicaciones, el reto es reconstruir con precisión la instrucción recibida y distinguir la hora prevista de aproximación de una autorización para salir. En operación de aerolínea se añade una decisión que no puede postergarse: cuánto tiempo permite el combustible permanecer en espera antes de solicitar otra solución. Esta lección no enseña entradas, velocidades o geometría de un circuito concreto; eso se obtiene de la carta y del procedimiento aplicables.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-28-01.svg",
        alt: "Tarjeta conceptual con cuatro decisiones: verificar autorización de espera, interpretar EAT, actualizar combustible y esperar autorización para salir.",
        ancho: 1600,
        alto: 900,
        pie: "Tarjeta didáctica, no circuito ni carta: la tripulación distingue punto y nivel autorizados, datos de espera publicada o detallada, hora prevista de aproximación y límite de combustible. La hora prevista ayuda a planear; no autoriza por sí sola a abandonar la espera.",
      },
      { kind: "sub", text: "Reconstruir la autorización completa" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Identificar el punto y el nivel:** el piloto que monitorea (PM, pilot monitoring) confirma referencia, ruta hasta ella y nivel autorizado; el piloto que vuela (PF, pilot flying) verifica navegación y energía antes de llegar. No se copia una espera parecida solo por reconocer el nombre de un punto.",
          "**Distinguir publicada de detallada:** si el control de tránsito aéreo (ATC, air traffic control) indica HOLD AS PUBLISHED, ambos comparan la carta vigente con la autorización. Si se dictan instrucciones detalladas, se comprueban los elementos que correspondan, incluidos curso de acercamiento, sentido de virajes y tiempo o distancia de alejamiento. No se inventa un sentido por omisión.",
          "**Colacionar lo crítico:** punto, nivel, sentido y otros elementos esenciales se devuelven claramente. Si la transmisión queda incompleta o no se entiende, REQUEST HOLDING INSTRUCTIONS o una confirmación específica se piden antes del punto, mientras aún hay margen para resolverlo.",
          "**Verificar la entrada y evolución:** el sistema de gestión de vuelo (FMS, Flight Management System) es una ayuda, no una fuente de autorización. PF y PM comparan selección con carta o instrucción y monitorean la trayectoria. Los criterios de entrada y velocidad se toman del procedimiento vigente, no de una ilustración didáctica.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-28-02.webp",
        alt: "Historieta fotográfica en tres paneles: controladora comunica, pilotos comprueban la espera y tripulación evalúa margen de combustible.",
        ancho: 1672,
        alto: 941,
        pie: "Historieta didáctica, no transcripción: 1) aproximación transmite una instrucción de espera; 2) PF y PM cotejan lo recibido con el vuelo; 3) revisan combustible y comunican a tiempo una limitación. Los instrumentos son genéricos y no muestran punto, nivel ni procedimiento real.",
      },
      { kind: "sub", text: "EAT no es autorización de aproximación" },
      {
        kind: "p",
        text: "La hora prevista de aproximación (EAT, Expected Approach Time) estima cuándo ATC espera que la aeronave deje la referencia de espera para completar la aproximación. Su valor permite planear secuencia, combustible y contingencias; puede revisarse. La fraseología EASA AMC1 SERA.14001 distingue EXPECTED APPROACH TIME, REVISED EXPECTED APPROACH TIME y DELAY NOT DETERMINED. Aunque llegue la hora comunicada, la tripulación no abandona por iniciativa propia una espera normal con comunicaciones: espera la autorización o instrucción pertinente. Los procedimientos de falla de comunicaciones son un caso distinto y se estudian por separado.",
      },
      { kind: "sub", text: "Secuencia operativa desde el aviso de demora" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Antes del punto:** PM prepara la carta, identifica instrucciones y EAT o aviso de demora; PF comprueba nivel, velocidad según procedimiento aplicable y capacidad de permanecer. Si falta una pieza esencial, se solicita aclaración antes de entrar.",
          "**En espera:** ambos monitorizan la trayectoria y actualizan hora estimada, combustible disponible y opciones de alterno. Una EAT revisada modifica el plan de tiempo; no convierte el procedimiento cargado en una autorización nueva.",
          "**Al acercarse al límite:** se informa a ATC de forma temprana la limitación operacional y se solicita una alternativa o prioridad según la situación. Las expresiones normalizadas de combustible mínimo y emergencia se utilizan solo cuando se cumplen sus criterios, no como sinónimos de una preferencia por evitar demora.",
          "**Salida:** cuando ATC emite autorización de aproximación, ruta o nivel nuevos, se colacionan y se comprueba qué cambia en el FMS. Si la autorización de salida no llega, no se asume que la EAT la reemplaza; si hay falla de radio se aplica el procedimiento publicado correspondiente.",
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "La carta y la publicación estatal son indispensables",
        text: "EASA AMC1 SERA.14001 documenta HOLD AS PUBLISHED, instrucciones detalladas de espera y frases de EAT, pero es referencia europea. Los puntos, niveles, sentidos, velocidades, entradas, duración de alejamiento y reportes exigibles en Colombia se consultan únicamente en la Publicación de Información Aeronáutica (AIP, Aeronautical Information Publication) electrónica —eAIP— oficial de Aerocivil y la autorización real. Aquí no se inventa una carta de espera.",
      },
      {
        kind: "escenario",
        titulo: "Demora mayor que el margen disponible",
        situacion: "Caso didáctico sin vuelo, punto, nivel, hora, aeropuerto o frecuencia fabricados. La tripulación recibe autorización de espera publicada y una EAT. El PM comprueba en la carta el circuito y el PF mantiene el nivel autorizado. Tras una revisión, la EAT se retrasa y el combustible disponible ya no permite esperar hasta esa hora conservando el margen planificado para el alterno.",
        preguntas: [
          {
            q: "¿Puede abandonar la espera al llegar la primera EAT?",
            a: "No. La EAT es una estimación, y además fue revisada. La tripulación conserva la autorización vigente y espera una instrucción o autorización de salida, salvo que se active el procedimiento aplicable para otra contingencia como falla de comunicaciones.",
          },
          {
            q: "¿Qué comunica antes de agotar su margen?",
            a: "PF y PM actualizan juntos el tiempo viable de espera según combustible, alterno y criterios del operador. Comunican temprano que no pueden aceptar la demora prevista y solicitan una solución operacional. Si se cumplen criterios de combustible mínimo o emergencia, usan la expresión correspondiente y aplican el procedimiento, sin confundirla con una petición informal de prioridad.",
          },
        ],
        concepto: "La hora prevista organiza el plan; el combustible define el margen; solo la autorización aplicable cambia la trayectoria.",
      },
      {
        kind: "enLaOperacion",
        momento: "Espera en una llegada congestionada",
        texto: "El PM conserva una nota breve de punto, nivel, circuito publicado o detallado, EAT y revisiones. El PF controla la trayectoria y recibe del PM actualizaciones de combustible y tiempo restante. Ambos acuerdan cuándo pedir una alternativa antes de perder margen; al recibir autorización de salida, comprueban ruta, nivel y aproximación con la carta y la selección del FMS. La decisión de desviar se rige por el operador y las normas aplicables, no por una cifra genérica de esta lección.",
      },
      { kind: "sub", text: "Errores que importan" },
      error("Entrar en una espera con punto, nivel o sentido de virajes sin confirmar."),
      error("Usar una carta distinta de la espera o transición autorizada."),
      error("Confundir la EAT con una autorización de salida o de aproximación."),
      error("No actualizar combustible y alterno tras una demora revisada."),
      error("Avisar de la limitación de combustible solo cuando ya no queda margen útil."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Se comprueban punto, nivel y detalles de la espera autorizada.",
          "La espera publicada se coteja con la carta; la detallada se reconstruye con la instrucción.",
          "EAT permite planear, no salir sin autorización.",
          "El margen de combustible se actualiza y se comunica antes de agotarse.",
          "La salida de la espera exige verificar la nueva autorización y el FMS.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "EASA · AMC1 SERA.14001; OACI · Doc 4444",
        bloques: [
          { kind: "sub", text: "Documentos oficiales" },
          { kind: "p", text: "Agencia de la Unión Europea para la Seguridad Aérea (EASA, European Union Aviation Safety Agency), Easy Access Rules for SERA, Appendix 1 to AMC1 SERA.14001, §§ 1.3.3–1.3.4, autorizaciones de espera publicada y detallada, REQUEST HOLDING INSTRUCTIONS y EAT (https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-10299). Organización de Aviación Civil Internacional (OACI; ICAO, International Civil Aviation Organization), Doc 4444 PANS-ATM, edición 16 disponible en portal oficial, definición de espera y EAT (https://www.icao.int/ESAF/Documents/meetings/2021/AFI%20ATM%20Coordination%20Meeting%202021/Presentations/4444_16ed_amend_10_highlighted.pdf). Confirmar edición y aplicación estatal vigentes." },
          { kind: "sub", text: "Límites del material" },
          { kind: "list", items: [
            "La figura no dibuja una espera y no puede usarse como carta.",
            "La historieta y el escenario son didácticos, no transcripciones.",
            "No se prescriben velocidades, tiempos de alejamiento, combustible mínimo ni puntos locales.",
          ] },
        ],
      },
    ],
  },
  // ── 29 ──────────────────────────────────────────────────────────────────
  {
    n: 29,
    title: "Aterrizaje",
    kicker: "CONTINUE APPROACH no es CLEARED TO LAND",
    minutes: 18,
    blocks: [
      {
        kind: "p",
        text: "En corta final, dos expresiones pueden parecer próximas cuando la tripulación espera la pista: CONTINUE APPROACH y RUNWAY … CLEARED TO LAND. Solo la segunda contiene autorización para aterrizar. El control de tránsito aéreo (ATC, air traffic control) puede pedir continuar mientras termina una secuencia; el piloto no completa mentalmente las palabras que faltan. El piloto que monitorea (PM, pilot monitoring) comprueba distintivo y pista, y el piloto que vuela (PF, pilot flying) mantiene una trayectoria desde la que todavía puede ejecutar motor y al aire si no llega la autorización o si deja de ser seguro continuar.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-29-01.svg",
        alt: "Comparación textual entre CONTINUE APPROACH, que no autoriza aterrizar, y RUNWAY CLEARED TO LAND, que sí debe colacionarse con la pista.",
        ancho: 1600,
        alto: 900,
        pie: "Tarjeta didáctica: CONTINUE APPROACH permite seguir aproximándose pero no aterrizar; RUNWAY … CLEARED TO LAND exige confirmar distintivo, pista y autorización, y colacionarlos. Si la autorización no llega, se pregunta a tiempo y se aplica el criterio de motor y al aire del operador.",
      },
      { kind: "sub", text: "La distinción operacional" },
      {
        kind: "list",
        items: [
          "**CONTINUE APPROACH:** la fraseología EASA AMC1 SERA.14001 incluye CONTINUE APPROACH [PREPARE FOR POSSIBLE GO-AROUND]. No afirma que la pista esté autorizada para el aterrizaje. El PM mantiene en su modelo mental que la autorización está pendiente y lo comunica claramente en cabina.",
          "**RUNWAY (number) CLEARED TO LAND:** autorización de aterrizaje para una pista identificada. La Organización de Aviación Civil Internacional (OACI; ICAO, International Civil Aviation Organization) exige colacionar las autorizaciones de aterrizaje. La pista y la autorización se repiten de manera que el controlador pueda detectar un error.",
          "**Distintivo correcto:** en una frecuencia cargada, o con aeronaves de distintivo parecido, escuchar CLEARED TO LAND no basta: debe corresponder a la propia aeronave. Si cualquier parte es dudosa, CONFIRM o SAY AGAIN antes de asumir la autorización.",
          "**Aproximación y aterrizaje separados:** haber sido autorizado a volar una aproximación por instrumentos no habilita automáticamente a tocar la pista. La autorización para aterrizar llega de la dependencia competente y puede emitirse más tarde.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-29-02.webp",
        alt: "Historieta fotográfica en tres paneles: piloto escucha en final, torre vigila el aeródromo y tripulación confirma si hay autorización de aterrizaje.",
        ancho: 1672,
        alto: 941,
        pie: "Historieta didáctica, no transcripción: 1) el PM distingue las palabras recibidas; 2) torre coordina el uso de la pista; 3) PF y PM confirman distintivo y pista antes de anunciar en cabina que existe autorización. El aeropuerto y las pantallas son genéricos, sin frecuencia ni vuelo real.",
      },
      { kind: "sub", text: "Secuencia en la final" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Contacto con torre:** el PM sintoniza la frecuencia instruida, hace la llamada según el procedimiento aplicable y escucha tráfico y pista. El PF mantiene el avión estabilizado y preparado para continuar o frustrar; una transferencia de frecuencia no constituye autorización de aterrizaje.",
          "**Instrucción de continuar:** se acusa recibo conforme al procedimiento, pero ambos pilotos mantienen explícita la falta de autorización. Se vigilan mensajes posteriores y la situación de la pista. Un aviso de viento o tráfico no cambia por sí solo el estatus de autorización.",
          "**Autorización recibida:** se verifica distintivo, pista y expresión CLEARED TO LAND; el PM colaciona pista y autorización, y PF confirma en cabina la pista correcta. Si hay pistas paralelas o una pista cambiada, no basta reconocer la palabra land: se confronta la designación exacta con la aproximación volada.",
          "**Autorización ausente o anulada:** se pregunta con suficiente tiempo. Si sigue ausente al punto de decisión del procedimiento normalizado de operación (SOP, Standard Operating Procedures) del explotador, o si hay instrucción GO AROUND o una condición insegura, se ejecuta motor y al aire y se comunica según la carga de trabajo. No se fija aquí una distancia universal.",
          "**Tras el aterrizaje:** se conserva la escucha y se cumplen las instrucciones de salida de pista. El cambio a tierra se hace cuando la instrucción y la situación real lo permiten; no se abandona una frecuencia prematuramente mientras aún se ocupa la pista.",
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "No inventar una final local",
        text: "Las frases citadas son de documentos oficiales EASA y OACI. Para un aeródromo colombiano se consulta exclusivamente la Publicación de Información Aeronáutica (AIP, Aeronautical Information Publication) electrónica —eAIP— oficial de Aerocivil y las instrucciones reales. Esta lección no asigna pista, viento, frecuencia, punto de decisión, mínimos ni procedimiento de salida; el SOP del operador determina cuándo debe estar confirmada la autorización para continuar al aterrizaje.",
      },
      {
        kind: "escenario",
        titulo: "La palabra que no llegó",
        situacion: "Caso didáctico sin aeródromo, pista, distintivo, frecuencia, viento ni distancia inventados. La tripulación está en final estabilizada. Torre dice CONTINUE APPROACH mientras coordina otro movimiento. El PM había esperado CLEARED TO LAND y por un momento cree haberlo oído; el PF pregunta si la autorización existe. Aún no se ha transmitido una autorización de aterrizaje.",
        preguntas: [
          {
            q: "¿Qué debe responder y registrar mentalmente el PM?",
            a: "Acusa recibo según corresponda, pero aclara dentro de la cabina que solo recibieron CONTINUE APPROACH. Mantiene pendiente la autorización de aterrizaje, verifica distintivo y pista en las llamadas siguientes y pregunta a torre con tiempo si no llega. No convierte un aviso de continuidad en autorización.",
          },
          {
            q: "¿Qué decisión toma la tripulación si la autorización sigue ausente?",
            a: "Aplica su punto de decisión del SOP y ejecuta motor y al aire si no hay autorización para aterrizar o si no es seguro continuar. El PF vuela la maniobra y el PM comunica cuando la carga de trabajo lo permite. Una eventual autorización de aproximación anterior no cambia este requisito.",
          },
        ],
        concepto: "La escucha exacta evita que la expectativa produzca un aterrizaje sin autorización.",
      },
      {
        kind: "enLaOperacion",
        momento: "Cabina en corta final",
        texto: "Antes de la fase de mayor carga, PF y PM han acordado quién vigila la autorización de aterrizaje y cómo la confirman. El PM anuncia de forma inequívoca si está pendiente o recibida, colaciona pista y autorización y permanece atento a una orden de motor y al aire. El PF controla la trayectoria y mantiene la opción de frustrar. Tras tocar tierra, ambos siguen las instrucciones hasta que la pista está efectivamente libre y corresponde transferir la comunicación.",
      },
      { kind: "sub", text: "Errores que importan" },
      error("Oír mentalmente CLEARED TO LAND cuando torre dijo CONTINUE APPROACH."),
      error("Colacionar una autorización de aterrizaje sin identificar la pista."),
      error("Aceptar para el propio vuelo una autorización dirigida a otro distintivo."),
      error("Seguir al aterrizaje sin autorización porque ya existía autorización de aproximación."),
      error("Cambiar de frecuencia antes de dejar libre la pista o antes de que la instrucción lo permita."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "CONTINUE APPROACH no autoriza a aterrizar.",
          "RUNWAY … CLEARED TO LAND se verifica y se colaciona con la pista.",
          "El distintivo debe corresponder al propio vuelo.",
          "Sin autorización en el punto que exige el SOP, se frustra; no hay distancia única aquí.",
          "La comunicación posterior continúa hasta salir de la pista y recibir la transferencia aplicable.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "EASA · AMC1 SERA.14001; OACI · Doc 4444",
        bloques: [
          { kind: "sub", text: "Documentos oficiales" },
          { kind: "p", text: "Agencia de la Unión Europea para la Seguridad Aérea (EASA, European Union Aviation Safety Agency), Easy Access Rules for SERA, Appendix 1 to AMC1 SERA.14001, §§ 1.4.15–1.4.16, CONTINUE APPROACH y RUNWAY (number) CLEARED TO LAND (https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-10299). OACI, Doc 4444 PANS-ATM, edición 16 disponible en portal oficial, § 4.5.7.5.1 sobre colación de autorizaciones de aterrizaje (https://www.icao.int/ESAF/Documents/meetings/2021/AFI%20ATM%20Coordination%20Meeting%202021/Presentations/4444_16ed_amend_10_highlighted.pdf). Verificar edición y aplicación estatal vigentes." },
          { kind: "sub", text: "Límites del material" },
          { kind: "list", items: [
            "La figura no representa distancias o una pista operativa.",
            "La historieta y el escenario son didácticos, no una transcripción.",
            "No se fija un punto universal de motor y al aire por falta de autorización.",
          ] },
        ],
      },
    ],
  },
  // ── 30 ──────────────────────────────────────────────────────────────────
  {
    n: 30,
    title: "Motor y al aire",
    kicker: "Go-around ordenado o iniciado por la tripulación",
    minutes: 7,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "**Motor y al aire** (go-around) es interrumpir la aproximación y subir. El **procedimiento de aproximación frustrada** es lo que hay que volar si no se puede seguir la aproximación (Doc 4444, cap. 1). Puede ordenarlo ATC o decidirlo la tripulación.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "**Aviate, Navigate, Communicate.** Primero se vuela el avión (potencia, actitud, configuración), luego se navega (la frustrada publicada o la instrucción de ATC), y después se habla. Nadie espera una transmisión en los primeros segundos.",
          "En la maniobra la carga de trabajo es alta, y ATC debe dar transmisiones breves y reducidas al mínimo (Doc 9432, 4.8.1).",
          "**Sin instrucciones en contrario, un avión IFR vuela el procedimiento de aproximación frustrada publicado**; uno VFR sigue en el circuito de tránsito (Doc 9432, 4.8.2).",
          "Si la tripulación lo inicia, dice `GOING AROUND` (Doc 9432, 4.8.3). La razón se puede dar después, cuando el avión esté estable y si ATC la necesita.",
          "Situaciones que llevan a un motor y al aire:",
        ],
      },
      {
        kind: "list",
        items: [
          "**Ordenado por ATC**: pista ocupada, tráfico, separación.",
          "**Pista no disponible**: vehículo, animal, obstáculo.",
          "**Aproximación no estabilizada**: el Doc 4444 recuerda que la tripulación debe estabilizarse, típicamente a 3 NM del umbral (Nota a 4.6.3.7, que remite al Doc 8168). Los criterios exactos son del operador.",
          "**Sin referencia visual en la DA/DH** (definición del Doc 4444, cap. 1).",
          "**Sin autorización de aterrizaje** en el punto que fija el SOP (capítulo 29).",
          "Cizalladura, meteorología u otra razón técnica.",
        ],
      },
      {
        kind: "list",
        items: [
          "Las nuevas instrucciones de rumbo y nivel después del motor y al aire **se colacionan** como siempre.",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "«SAY REASON FOR GO-AROUND» (ejemplo 5), u otra forma en que ATC pida el motivo, no está en las fuentes cargadas: consultar el Doc 4444 16.ª ed., cap. 12; si no existe, es PLAIN LANGUAGE. La fraseología específica de cizalladura (ejemplo 8): Doc 4444 16.ª ed. cap. 12 y AIP del Estado. Los criterios de aproximación estabilizada: Doc 8168 PANS-OPS Vol. I y SOP del operador.",
      },
      ...ejemplo(
        "Ejemplo 1 · Ordenado por ATC",
        [
          `ATC:   "Aviatory 452, go around, aircraft on the runway."`,
          `PILOT: "Going around, Aviatory 452."`,
        ],
        "Significado: la orden se ejecuta de inmediato. La respuesta es corta.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Iniciado por la tripulación, ATC solo acusa recibo",
        [
          `PILOT: "Aviatory 452, going around."`,
          `ATC:   "Aviatory 452, roger."`,
        ],
        "Significado: sin otra instrucción, el avión IFR vuela la frustrada publicada (Doc 9432, 4.8.2).",
      ),
      ...ejemplo(
        "Ejemplo 3 · ATC da otras instrucciones después",
        [
          `PILOT: "Aviatory 452, going around."`,
          `ATC:   "Aviatory 452, roger, climb to five thousand feet, turn right heading zero four zero."`,
          `PILOT: "Climbing to five thousand feet, right heading zero four zero, Aviatory 452."`,
        ],
        "Significado: ATC reemplaza la frustrada publicada con una altitud y un rumbo. Estructura de los ejemplos de nivel (3.3) y rumbo (6.3) del Doc 9432.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Cambio a Approach después de la frustrada",
        [
          `ATC:   "Aviatory 452, contact Bogota Approach one two zero decimal four."`,
          `PILOT: "One two zero decimal four, Aviatory 452."`,
          `PILOT: "Bogota Approach, Aviatory 452, passing three thousand five hundred feet climbing to five thousand feet, heading zero four zero."`,
        ],
        "Significado: primera llamada con nivel de paso, nivel autorizado y rumbo asignado para que Approach sepa dónde está y qué tiene.",
      ),
      ...ejemplo(
        "Ejemplo 5 · Explicar el motivo y pedir lo siguiente (PLAIN LANGUAGE)",
        [
          `ATC:   "Aviatory 452, say reason for go-around."`,
          `PILOT: "Aviatory 452, unstable approach. Request vectors for another ILS approach runway three one."`,
          `ATC:   "Aviatory 452, fly heading zero four zero, expect vectors for ILS approach runway three one."`,
          `PILOT: "Heading zero four zero, Aviatory 452."`,
        ],
        "Significado: motivo en dos palabras y lo que se necesita. Nadie pide detalles técnicos por radio en ese momento.",
      ),
      ...ejemplo(
        "Ejemplo 6 · Sin referencia visual en los mínimos (PLAIN LANGUAGE)",
        [
          `PILOT: "Aviatory 452, going around."`,
          `ATC:   "Aviatory 452, roger."`,
          `PILOT: "Aviatory 452, no visual reference at minimums. Request holding to wait for weather improvement, endurance four zero minutes."`,
        ],
        "Significado: primero `GOING AROUND`. Una vez estable, el motivo, la intención y el dato que ATC necesita para planear (cuánto puede esperar).",
      ),
      ...ejemplo(
        "Ejemplo 7 · Motor y al aire con tráfico: se repite la orden",
        [
          `ATC:   "Aviatory 452, go around, I say again, go around, aircraft on the runway."`,
          `PILOT: "Going around, Aviatory 452."`,
        ],
        "Significado: `I SAY AGAIN` para recalcar. El piloto no discute ni pregunta: ejecuta.",
      ),
      ...ejemplo(
        "Ejemplo 8 · Frustrada por cizalladura (PLAIN LANGUAGE)",
        [
          `PILOT: "Aviatory 452, going around, windshear."`,
          `ATC:   "Aviatory 452, roger."`,
        ],
        "Significado: la palabra «windshear» avisa a Torre de algo que afecta también al avión de atrás. Si el Estado tiene fraseología específica para esto, se usa esa (VERIFICAR).",
      ),
      {
        kind: "hueco",
        rotulo: "CM-30-01 · Esquema · 16:9 · 1600×900 px",
        descripcion: "Imagen sugerida: Tres bloques horizontales en secuencia sobre una trayectoria de motor y al aire que sube desde cerca de la pista. Bloque 1 «AVIATE» sobre el inicio de la subida: potencia, actitud, configuración. Bloque 2 «NAVIGATE» en el tramo siguiente: frustrada publicada o instrucción ATC. Bloque 3 «COMMUNICATE» más adelante: globo «Going around, Aviatory 452». Abajo, una franja pequeña con las causas (ATC, pista no disponible, no estabilizada, sin referencia visual en DA/DH, sin autorización de aterrizaje, cizalladura). Estilo limpio, color de acento del módulo; sin ámbar ni rojo decorativos. Objetivo: Que el piloto vea que la comunicación va después de volar y navegar, y que la frase inicial es corta.",
        alto: 280,
      },
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En el motor y al aire",
        texto: "Los SOP definen quién anuncia el motor y al aire en cabina, quién hace la llamada a Torre y cuándo. Lo habitual es que el PM transmita «going around» cuando el PF ya tiene el avión subiendo y la frustrada en curso, pero no hay regla universal. La tripulación revisa antes de la aproximación la frustrada publicada y cualquier instrucción distinta que ATC haya anticipado, para no tener que leerla en el peor momento.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Hablar antes de volar", "**Hablar antes de volar**: soltar la radio antes de tener el avión estable."),
      error("Esperar la autorización para hacer motor y al aire", "No hace falta: se hace y se informa."),
      error("Volar la frustrada publicada cuando ATC dio otra", "**Volar la frustrada publicada cuando ATC dio otra** o al revés, por no colacionar bien."),
      error("Explicaciones largas", "**Explicaciones largas** en la frecuencia de Torre, bloqueando al avión que viene atrás."),
      error("Olvidar que el siguiente puede tener lo mismo", "**Olvidar que el siguiente puede tener lo mismo**: la razón (cizalladura, pista, meteorología) le sirve a ATC y a los demás."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Aviate, Navigate, Communicate.",
          "Iniciado por la tripulación: `GOING AROUND`.",
          "Sin otra instrucción, IFR vuela la frustrada publicada.",
          "Nuevas instrucciones de rumbo y nivel se colacionan.",
          "El motivo, corto y cuando el avión esté estable.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 4444 · Doc 9432",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Doc 4444 (15.ª ed., Enm. 4) cap. 1 («Procedimiento de aproximación frustrada», «Altitud de decisión (DA) o altura de decisión (DH)»); 4.5.7.5.1; 4.6.3.7 y su Nota (aproximación estabilizada, típicamente 3 NM, remite al Doc 8168). Doc 9432 (4.ª ed.) 2.6 («I SAY AGAIN», «ROGER», «CONTACT»); 3.3 (niveles); 6.3 (rumbos); 4.8.1 («GO AROUND AIRCRAFT ON THE RUNWAY», «GOING AROUND»); 4.8.2; 4.8.3; 6.4.2 («REQUEST VECTORS»).",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: «SAY REASON FOR GO-AROUND» (u otra forma en que ATC pida el motivo), contra Doc 4444 16.ª ed. cap. 12 (no cargado). Si no existe, es PLAIN LANGUAGE.",
              "VERIFICAR: fraseología específica de cizalladura en la aproximación, contra Doc 4444 16.ª ed. cap. 12 y la AIP del Estado (no cargados).",
              "VERIFICAR: criterios de aproximación estabilizada, contra Doc 8168 PANS-OPS Vol. I (no cargado) y el SOP del operador.",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
]
