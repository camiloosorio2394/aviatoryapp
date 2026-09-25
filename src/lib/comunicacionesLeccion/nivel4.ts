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
    kicker: "Reportes, solicitudes y cambios de frecuencia",
    minutes: 6,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "El crucero parece la fase tranquila, pero la radio no para: transferencias entre sectores, llamadas iniciales, pedidos de nivel y de directo, reportes de meteorología y, donde no hay radar, reportes de posición. La tarea del piloto es **saber siempre en qué frecuencia está, cuál sigue y qué tiene autorizado**.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "La dependencia ATS dice cuándo cambiar de frecuencia. Si no lo dice, **el piloto informa antes de cambiar** (Doc 9432, 2.8.2.1).",
          "`CONTACT` es llamar en la frecuencia nueva. `STAND BY FOR` (quede en escucha) es pasar a la frecuencia y esperar, porque la dependencia lo va a llamar pronto. `MONITOR` es escuchar una frecuencia donde se radiodifunde información (Doc 9432, 2.6 y 2.8.2.2).",
          "En la primera llamada después de un cambio de canal va el nivel, aunque la región permita omitirlo en los reportes de posición (Doc 4444, 4.11.2.1.1), y la velocidad si fue asignada (4.11.2.2).",
          "ATC ofrece la ruta más directa siempre que el espacio aéreo, la carga de trabajo y el tráfico lo permitan (Doc 4444, 4.5.7.2.3). Pedir un directo es normal; no es un favor.",
          "El avión que ya está en un nivel de crucero normalmente tiene prioridad sobre otros que piden ese nivel (Doc 4444, 5.3.3.7). A veces la respuesta a un pedido de nivel es «no» por eso.",
          "Turbulencia moderada o fuerte, engelamiento moderado o fuerte, ondas orográficas fuertes, ciertas tormentas, tempestades de polvo o arena, cenizas y actividad volcánica: **se notifican con una aeronotificación especial** (Doc 4444, 4.12.3.1). Por voz lleva: tipo de mensaje, identificación, posición, hora, nivel y la condición (4.12.3.3).",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "«REQUEST DIRECT (punto)» y «PROCEED DIRECT (punto)» (ejemplo 5) y la forma «REQUEST (nivel) DUE (motivo)» (ejemplo 6) no están en las fuentes cargadas: consultar el Doc 4444 16.ª ed., cap. 12. La redacción oral de la aeronotificación especial («AIREP SPECIAL», ejemplo 7): Doc 4444, Apéndice 1 (no cargado).",
      },
      ...ejemplo(
        "Ejemplo 1 · Transferencia a otro sector",
        [
          `ATC:   "Aviatory 452, contact Bogota Control one two eight decimal seven."`,
          `PILOT: "One two eight decimal seven, Aviatory 452."`,
        ],
        "Significado: cambiar a 128.7 y llamar. Se colaciona la frecuencia.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Primera llamada en el sector nuevo",
        [
          `PILOT: "Bogota Control, Aviatory 452, flight level three five zero."`,
          `ATC:   "Aviatory 452, Bogota Control, identified."`,
        ],
        "Significado: se dice el nivel para que el controlador lo compare con lo que ve en pantalla.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Quede en escucha",
        [
          `ATC:   "Aviatory 452, stand by for Bogota Control one three two decimal two."`,
          `PILOT: "One three two decimal two, Aviatory 452."`,
        ],
        "Significado: pasar a 132.2 y esperar la llamada del controlador (Doc 9432, 2.8.2.2).",
      ),
      ...ejemplo(
        "Ejemplo 4 · Haga escucha",
        [
          `ATC:   "Aviatory 452, monitor ATIS one two three decimal two five."`,
          `PILOT: "Monitoring one two three decimal two five, Aviatory 452."`,
        ],
        "Significado: escuchar la radiodifusión, no transmitir en ella.",
      ),
      ...ejemplo(
        "Ejemplo 5 · Pedir un directo (VERIFICAR)",
        [
          `PILOT: "Aviatory 452, request direct KUBIN."`,
          `ATC:   "Aviatory 452, proceed direct KUBIN."`,
          `PILOT: "Direct KUBIN, Aviatory 452."`,
        ],
        "Significado: el directo ahorra tiempo y combustible. Mientras no llegue la autorización, el avión sigue su ruta.",
      ),
      ...ejemplo(
        "Ejemplo 6 · Pedir nivel por turbulencia (VERIFICAR la forma del pedido)",
        [
          `PILOT: "Aviatory 452, request flight level three seven zero due moderate turbulence."`,
          `ATC:   "Aviatory 452, climb to flight level three seven zero."`,
          `PILOT: "Leaving flight level three five zero climbing to flight level three seven zero, Aviatory 452."`,
        ],
        "Significado: el motivo le dice a ATC que otros aviones a ese nivel tendrán lo mismo.",
      ),
      ...ejemplo(
        "Ejemplo 7 · Aeronotificación especial (VERIFICAR la redacción)",
        [
          `PILOT: "Bogota Control, Aviatory 452, AIREP special."`,
          `ATC:   "Aviatory 452, Bogota Control."`,
          `PILOT: "Aviatory 452, GIKOS at four five, flight level three five zero, moderate turbulence."`,
          `ATC:   "Aviatory 452, roger."`,
        ],
        "Significado: los elementos (identificación, posición, hora, nivel, condición) están en el Doc 4444, 4.12.3.3. La redacción exacta está en el Apéndice 1, no cargado. ATC la pasa a la oficina meteorológica (4.12.6.3). Fíjese en la respuesta de ATC: su distintivo y el de la estación. El Doc 9432 omitió «GO AHEAD»; esa respuesta ya es la invitación a transmitir (2.6, Nota).",
      ),
      ...ejemplo(
        "Ejemplo 8 · Próxima notificación",
        [
          `ATC:   "Aviatory 452, next report KUBIN."`,
          `PILOT: "Wilco, Aviatory 452."`,
        ],
        "Significado: el próximo reporte de posición es en KUBIN (Doc 9432, 3.4.2).",
      ),
      ...ejemplo(
        "Ejemplo 9 · Sin respuesta en la frecuencia nueva (PLAIN LANGUAGE)",
        [
          `PILOT: "Bogota Control, Aviatory 452, no reply on one three two decimal two."`,
          `ATC:   "Aviatory 452, contact Bogota Control one three two decimal eight five."`,
          `PILOT: "One three two decimal eight five, Aviatory 452."`,
        ],
        "Significado: si la frecuencia nueva no responde, lo primero es volver a la anterior y avisar. La falla de comunicaciones se trata en el capítulo 32.",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En crucero",
        texto: "En crucero muchas tripulaciones dejan preseleccionada en la radio de reserva la frecuencia siguiente o la anterior, y anotan en el plan de vuelo la frecuencia activa. Cuando uno de los pilotos sale del puesto (descanso, baño), el que queda asume la radio y lo que se autorizó mientras tanto se le cuenta al otro al volver. Cómo se reparte y se registra lo define el SOP.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Perder la frecuencia", "**Perder la frecuencia**: aceptar un cambio, sintonizar mal y quedarse sin contacto sin darse cuenta."),
      error("Confundir `MONITOR` con `CONTACT`", "**Confundir `MONITOR` con `CONTACT`**: llamar en una frecuencia de radiodifusión, o no llamar cuando había que hacerlo."),
      error("Callar la turbulencia", "**Callar la turbulencia**: no hacer la aeronotificación deja a los que vienen atrás sin aviso."),
      error("Tomar el directo como autorizado", "**Tomar el directo como autorizado** porque «siempre lo dan»."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "`CONTACT` llama; `STAND BY FOR` espera la llamada; `MONITOR` solo escucha.",
          "Sin instrucción, avisar antes de cambiar de frecuencia.",
          "Primera llamada en sector nuevo: nivel, y velocidad si está asignada.",
          "Turbulencia o engelamiento moderado o fuerte: aeronotificación especial.",
          "Frecuencia activa y siguiente, siempre claras en cabina.",
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
            text: "Doc 4444 (15.ª ed., Enm. 4) 4.5.7.2.3; 4.11.2.1.1; 4.11.2.2; 4.12.3.1; 4.12.3.3; 4.12.6.3; 5.3.3.1; 5.3.3.7. Doc 9432 (4.ª ed.) 2.6 («CONTACT», «MONITOR», «STANDBY»); 2.6, Nota (se omitió «GO AHEAD»: la respuesta con los distintivos invita a transmitir); 2.8.2.1; 2.8.2.2 («STAND BY FOR … TOWER», «MONITOR ATIS»); 3.4.2 («NEXT REPORT»); 6.2.1 («IDENTIFIED»).",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: «REQUEST DIRECT (punto)» y «PROCEED DIRECT (punto)» contra Doc 4444 16.ª ed. cap. 12 (no cargado).",
              "VERIFICAR: «REQUEST (nivel) DUE (motivo)» contra Doc 4444 16.ª ed. cap. 12 (no cargado).",
              "VERIFICAR: redacción oral de la aeronotificación especial («AIREP SPECIAL») contra Doc 4444 Apéndice 1 (no cargado).",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
  // ── 24 ──────────────────────────────────────────────────────────────────
  {
    n: 24,
    title: "Reportes de posición",
    kicker: "Qué lleva un reporte y cuándo se da",
    minutes: 6,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "El reporte de posición le dice a ATC dónde está el avión, a qué hora, a qué nivel y qué viene después. Con radar o ADS casi no se usa; sin vigilancia (zonas remotas, oceánicas o con radar fuera de servicio) es la base de la separación.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      { kind: "p", text: "**Los seis elementos** (Doc 9432, 3.4.1; Doc 4444, 4.11.2.1):" },
      {
        kind: "list",
        items: [
          "Identificación de la aeronave.",
          "Posición.",
          "Hora.",
          "Nivel de vuelo o altitud, incluidos el nivel de paso y el autorizado si no se mantiene el autorizado.",
          "Próxima posición y hora estimada sobre ella.",
          "Punto significativo siguiente.",
        ],
        ordered: true,
      },
      {
        kind: "list",
        items: [
          "Los elementos 4, 5 y 6 se pueden omitir si lo prescribe un acuerdo regional de navegación aérea. El 4 va siempre en la primera llamada tras cambiar de frecuencia.",
          "Si ATC asignó una velocidad, se incluye (Doc 4444, 4.11.2.2).",
          "**Cuándo**: en rutas con puntos de notificación obligatoria, al pasar cada uno. En rutas sin puntos designados, a la primera media hora de vuelo y luego cada hora (Doc 4444, 4.11.1.1 y 4.11.1.2).",
          "Con datos de vigilancia adecuados, ATC puede eximir de reportar (Doc 9432, 3.4.2; Doc 4444, 4.11.1.3).",
          "Cuando se prescribe, el último reporte antes de pasar a otra FIR se da también a la dependencia de la FIR siguiente (Doc 4444, 4.11.1.4).",
          "Si un reporte no llega a la hora prevista, ATC no supone que el avión va a tiempo: lo busca (Doc 4444, 4.11.1.5). Un reporte tarde genera llamadas y trabajo.",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "«REPORT ESTIMATE (punto)» (ejemplo 7) no está en las fuentes cargadas: consultar el Doc 4444 16.ª ed., cap. 12. La forma del reporte por HF («POSITION» como llamada, ejemplo 8), el formato de coordenadas y la tolerancia para corregir estimados: Doc 4444 cap. 12, Doc 7030 (procedimientos suplementarios regionales) y AIP del Estado (no cargados).",
      },
      ...ejemplo(
        "Ejemplo 1 · Reporte completo",
        [
          `PILOT: "Aviatory 452, GIKOS four seven, flight level three three zero, PAXUM five seven, RODEL next."`,
          `ATC:   "Aviatory 452, roger."`,
        ],
        "Significado: sobre GIKOS al minuto 47, FL 330, estimando PAXUM al minuto 57, siguiente RODEL. `ROGER` basta: es información, no una instrucción.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Reporte con velocidad asignada (orden ilustrativo)",
        [
          `PILOT: "Aviatory 452, PAXUM one two, flight level three five zero, Mach point seven eight, RODEL three four, KUBIN next."`,
          `ATC:   "Aviatory 452, roger."`,
        ],
        "Significado: se agregó la velocidad asignada. El Doc 4444 exige incluirla pero lo cargado no fija su lugar en el reporte.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Reporte sin estar en el nivel autorizado",
        [
          `PILOT: "Aviatory 452, KUBIN two zero, passing flight level two six zero climbing to flight level three three zero, LOSAM four one, TOMUR next."`,
          `ATC:   "Aviatory 452, roger."`,
        ],
        "Significado: el elemento 4 lleva nivel de paso y nivel autorizado.",
      ),
      ...ejemplo(
        "Ejemplo 4 · ATC fija el próximo reporte",
        [
          `ATC:   "Aviatory 452, next report RODEL."`,
          `PILOT: "Wilco, Aviatory 452."`,
        ],
        "Significado: puede omitir los puntos intermedios y reportar en RODEL.",
      ),
      ...ejemplo(
        "Ejemplo 5 · ATC exime de reportes",
        [
          `ATC:   "Aviatory 452, omit position reports until FIR boundary, next report RODEL."`,
          `PILOT: "Wilco, Aviatory 452."`,
        ],
        "Significado: no reportar hasta el límite de la FIR; el siguiente reporte es en RODEL.",
      ),
      ...ejemplo(
        "Ejemplo 6 · Reanudar reportes",
        [
          `ATC:   "Aviatory 452, resume position reporting."`,
          `PILOT: "Wilco, Aviatory 452."`,
        ],
        "Significado: vuelven los reportes en cada punto obligatorio. Suele pasar cuando se pierde la vigilancia.",
      ),
      ...ejemplo(
        "Ejemplo 7 · ATC pide un estimado (VERIFICAR la forma de la pregunta)",
        [
          `ATC:   "Aviatory 452, report estimate PAXUM."`,
          `PILOT: "Aviatory 452, estimating PAXUM one four."`,
        ],
        "Significado: estimado sobre PAXUM al minuto 14. «Estimating» aparece en el Doc 9432 (3.5.2 y 7.3).",
      ),
      ...ejemplo(
        "Ejemplo 8 · Reporte procedimental en zona sin radar, por HF (VERIFICAR)",
        [
          `PILOT: "Oceanic Radio, Aviatory 452, position."`,
          `ATC:   "Aviatory 452, Oceanic Radio."`,
          `PILOT: "Aviatory 452, zero five north zero four zero west at one two three zero, flight level three five zero, estimating zero eight north zero four five west at one three one five, next zero one one north zero five zero west."`,
          `ATC:   "Aviatory 452, roger."`,
        ],
        "Significado: estación y coordenadas ficticias. Los seis elementos son los mismos; cambia que la posición va en coordenadas y la hora completa. La operación oceánica, HF y SELCAL están en el nivel 6.",
      ),
      {
        kind: "hueco",
        rotulo: "CM-24-01 · Esquema · 4:5 · 1080×1350 px",
        descripcion: "Imagen sugerida: Tarjeta vertical de bolsillo con seis casillas numeradas: 1 «Quién» (Aviatory 452), 2 «Dónde» (GIKOS), 3 «Cuándo» (47), 4 «Nivel» (FL 330), 5 «Próximo y estimado» (PAXUM 57), 6 «Siguiente» (RODEL). Al lado de cada casilla, la palabra inglesa como se dice por radio. Una nota al pie: «4, 5 y 6 pueden omitirse por acuerdo regional; el nivel va siempre en la primera llamada tras cambiar de frecuencia». Objetivo: Que el piloto memorice el orden de los seis elementos y pueda armar un reporte sin pensar.",
        alto: 420,
        ratio: "4 / 5",
        anchoMax: 420,
      },
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En rutas procedimentales",
        texto: "En rutas procedimentales, el plan de vuelo operacional trae los puntos, los estimados y espacio para anotar la hora real y el combustible. La tripulación arma el reporte sobre ese papel o sobre la página del FMS antes de llamar, para no transmitir improvisando. Si el estimado al punto siguiente cambia en más de lo que tolera la región, se corrige con ATC; el umbral lo fija cada región en sus procedimientos suplementarios y AIP (VERIFICAR).",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Mezclar el orden", "**Mezclar el orden** y que ATC tenga que pedir de nuevo el reporte."),
      error("Estimado equivocado", "**Estimado equivocado** por leer el tiempo de otro punto en el FMS."),
      error("Olvidar el nivel en la primera llamada", "**Olvidar el nivel en la primera llamada** tras cambiar de frecuencia."),
      error("Reportar tarde", "**Reportar tarde** y generar una búsqueda innecesaria."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Quién, dónde, cuándo, nivel, próximo con estimado, siguiente.",
          "Velocidad asignada: va en el reporte.",
          "Con radar, ATC puede eximir; `RESUME POSITION REPORTING` las devuelve.",
          "Preparar el reporte antes de apretar el PTT.",
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
            text: "Doc 9432 (4.ª ed.) 2.6, Nota (respuesta con distintivos en lugar de «GO AHEAD»); 3.4.1 (ejemplo «WICKEN 47 FL 330 MARLO 57 COLIN NEXT»); 3.4.2 («NEXT REPORT», «OMIT POSITION REPORTS UNTIL FIR BOUNDARY», «RESUME POSITION REPORTING»); 3.5.2 y 7.3 («ESTIMATING»). Doc 4444 (15.ª ed., Enm. 4) cap. 1 («Punto de notificación»); 4.11.1.1 a 4.11.1.5; 4.11.2.1; 4.11.2.1.1; 4.11.2.2.",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: «REPORT ESTIMATE (punto)» contra Doc 4444 16.ª ed. cap. 12 (no cargado).",
              "VERIFICAR: forma del reporte por HF («POSITION» como llamada), formato de coordenadas y tolerancia para corregir estimados, contra Doc 4444 cap. 12, Doc 7030 (procedimientos suplementarios regionales) y AIP del Estado (no cargados).",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
  // ── 25 ──────────────────────────────────────────────────────────────────
  {
    n: 25,
    title: "Desvíos por meteorología",
    kicker: "Cómo pedir un desvío con claridad",
    minutes: 7,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Es salirse de la ruta o del nivel autorizado para evitar tormentas, turbulencia u otra meteorología significativa. En Latinoamérica, con convección fuerte buena parte del año, es comunicación de todos los días.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "Un desvío es un **cambio de la autorización**. Se pide y se espera la aprobación, igual que un nivel. Cuando se concede, ATC debería decir exactamente qué cambió (Doc 4444, 4.5.7.4.1). Si no puede, dice `UNABLE` y, cuando se justifique, ofrece una alternativa (4.5.7.4.2).",
          "Una solicitud clara tiene cinco partes:",
        ],
      },
      {
        kind: "list",
        items: [
          "**Qué**: desvío izquierda o derecha, un rumbo, o un nivel.",
          "**Cuánto**: millas desde la ruta, o el rumbo.",
          "**Por qué**: «due weather».",
          "**Hasta dónde o por cuánto tiempo**: «for about three zero miles», «back on track at GIKOS».",
          "**Cuándo**: pedirlo con anticipación, no cuando ya se está encima de la celda.",
        ],
        ordered: true,
      },
      {
        kind: "list",
        items: [
          "No existe una frase estándar para cada situación de meteorología. Cuando la fraseología no alcanza, se usa lenguaje claro, tan claro y conciso como la fraseología, sin charla (Doc 9432, 3.2.3 y 3.2.4).",
          "Turbulencia o tormentas que cumplan los criterios de 4.12.3.1 se notifican con aeronotificación especial (Doc 4444).",
          "Si no se puede obtener autorización a tiempo y hay que desviarse, existe un procedimiento de contingencia OACI (Doc 4444, cap. 15, no cargado): VERIFICAR su contenido antes de enseñarlo. La autoridad final sobre la seguridad del vuelo es del piloto al mando; la urgencia y el socorro se tratan en el nivel 5.",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "La fraseología de desvío por meteorología de los ejemplos («REQUEST (número) MILES LEFT/RIGHT OF TRACK DUE WEATHER», «DEVIATION UP TO (número) MILES LEFT/RIGHT OF TRACK APPROVED», «REPORT BACK ON TRACK», «REPORT CLEAR OF WEATHER», «UNABLE (dirección) DEVIATION DUE TRAFFIC») y «PROCEED DIRECT (punto)» no están en las fuentes cargadas: consultar el Doc 4444 16.ª ed., cap. 12. El procedimiento de contingencia para desviarse sin autorización ATC: Doc 4444 16.ª ed., cap. 15 (no cargado).",
      },
      {
        kind: "p",
        text: "La fraseología de desvío por meteorología está en el Doc 4444 cap. 12, no cargado. Los ejemplos con **(VERIFICAR)** siguen la forma que Camilo dio como ejemplo conceptual.",
      },
      ...ejemplo(
        "Ejemplo 1 · Pedir desvío lateral (VERIFICAR)",
        [
          `PILOT: "Bogota Control, Aviatory 452, request two zero miles right of track due weather."`,
          `ATC:   "Aviatory 452, deviation up to two zero miles right of track approved, report back on track."`,
          `PILOT: "Up to two zero miles right of track, wilco, Aviatory 452."`,
        ],
        "Significado: puede separarse hasta 20 NM a la derecha de la ruta. Debe avisar cuando vuelva a ella.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Avisar con anticipación (PLAIN LANGUAGE)",
        [
          `PILOT: "Bogota Control, Aviatory 452, weather ahead on our track. In about four zero miles we will need to deviate right, up to two zero miles."`,
          `ATC:   "Aviatory 452, roger, expect deviation right, call me when ready."`,
          `PILOT: "Wilco, Aviatory 452."`,
        ],
        "Significado: el piloto le da tiempo al controlador para mover el tráfico. Frases cortas, números concretos, una idea por frase.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Pedir un rumbo (VERIFICAR la forma del pedido)",
        [
          `PILOT: "Aviatory 452, request heading one two zero due weather."`,
          `ATC:   "Aviatory 452, turn right heading one two zero, report clear of weather."`,
          `PILOT: "Right heading one two zero, wilco, Aviatory 452."`,
        ],
        "Significado: en área terminal a veces es más simple pedir un rumbo que un desvío en millas.",
      ),
      ...ejemplo(
        "Ejemplo 4 · ATC no puede hacia el lado pedido (VERIFICAR)",
        [
          `PILOT: "Aviatory 452, request deviation right of track due weather."`,
          `ATC:   "Aviatory 452, unable right deviation due traffic. Left deviation up to one five miles approved."`,
          `PILOT: "Aviatory 452, left of track is also weather. Request descent to flight level three one zero."`,
        ],
        "Significado: si la alternativa no sirve, se dice y se propone otra. La segunda frase del piloto es PLAIN LANGUAGE.",
      ),
      ...ejemplo(
        "Ejemplo 5 · Incapaz de mantener la ruta (UNABLE + PLAIN LANGUAGE)",
        [
          `PILOT: "Bogota Control, Aviatory 452, unable to maintain track due weather. Request immediate deviation left up to three zero miles."`,
          `ATC:   "Aviatory 452, deviation left up to three zero miles approved, report back on track."`,
          `PILOT: "Left up to three zero miles, wilco, Aviatory 452."`,
        ],
        "Significado: «unable to maintain track» dice el problema, «request immediate» dice la urgencia sin llegar a socorro.",
      ),
      ...ejemplo(
        "Ejemplo 6 · Turbulencia y cambio de nivel (VERIFICAR la forma del pedido)",
        [
          `PILOT: "Aviatory 452, severe turbulence at flight level three five zero. Request descent to flight level three one zero."`,
          `ATC:   "Aviatory 452, descend to flight level three one zero."`,
          `PILOT: "Leaving flight level three five zero descending to flight level three one zero, Aviatory 452."`,
        ],
        "Significado: turbulencia fuerte es condición de aeronotificación especial (Doc 4444, 4.12.3.1). ATC la usará para avisar a otros.",
      ),
      ...ejemplo(
        "Ejemplo 7 · Volver a la ruta (VERIFICAR)",
        [
          `PILOT: "Aviatory 452, clear of weather, request direct GIKOS."`,
          `ATC:   "Aviatory 452, proceed direct GIKOS."`,
          `PILOT: "Direct GIKOS, Aviatory 452."`,
        ],
        "Significado: el desvío terminó. El piloto no vuelve a la ruta por su cuenta si ATC le dio un rumbo; pide.",
      ),
      {
        kind: "hueco",
        rotulo: "CM-25-01 · Diagrama · 16:9 · 1600×900 px",
        descripcion: "Imagen sugerida: Vista en planta de una ruta recta entre dos waypoints ficticios (GIKOS y PAXUM) con una línea de celdas convectivas en rojo y amarillo tipo radar meteorológico sobre la ruta. Un avión que se separa a la derecha, con una cota «hasta 20 NM» y un punto «back on track». Encima, un globo de diálogo con las cinco partes de la solicitud: QUÉ (right of track), CUÁNTO (20 miles), POR QUÉ (due weather), HASTA DÓNDE (back on track at PAXUM), CUÁNDO (40 NM antes). Colores de la celda solo como representación de radar meteorológico, no como código de alerta de la app. Objetivo: Que el piloto arme una solicitud de desvío completa y la pida con anticipación.",
        alto: 280,
      },
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Frente a la convección",
        texto: "La decisión de desviarse sale del radar meteorológico de a bordo y de lo que reportan otros aviones. En la frecuencia se escucha a quienes van adelante: si todos piden la derecha, ATC ya está preparando ese lado. Qué distancia mínima mantener de una celda lo define el operador en su manual; no es fraseología.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Pedir tarde", "**Pedir tarde**, encima de la celda, cuando ATC ya no tiene espacio para mover el tráfico."),
      error("Solicitud incompleta", "**Solicitud incompleta**: «request deviation» sin lado ni distancia obliga a otro intercambio."),
      error("Desviarse sin decir nada", "**Desviarse sin decir nada** cuando había tiempo para pedir."),
      error("Olvidar el «report back on track»", "**Olvidar el «report back on track»** y dejar a ATC sin saber dónde termina el desvío."),
      error("Hablar de más en lenguaje claro", "**Hablar de más en lenguaje claro**: explicar la tormenta en vez de pedir lo que se necesita."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Un desvío se pide y se autoriza como cualquier cambio.",
          "Qué, cuánto, por qué, hasta dónde, y con tiempo.",
          "`UNABLE` a la alternativa, más una propuesta.",
          "Turbulencia o tormenta significativa: aeronotificación especial.",
          "Si hay que actuar sin autorización, hay procedimiento de contingencia (verificar Doc 4444 cap. 15).",
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
            text: "Doc 4444 (15.ª ed., Enm. 4) 4.5.7.4.1; 4.5.7.4.2; 4.12.3.1; 4.12.3.3. Doc 9432 (4.ª ed.) 2.6 («UNABLE», «WILCO»); 3.2.3; 3.2.4; 3.3 («DESCEND TO FL»); 6.3 («TURN RIGHT HEADING»).",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: «REQUEST (número) MILES LEFT/RIGHT OF TRACK DUE WEATHER», «DEVIATION UP TO (número) MILES LEFT/RIGHT OF TRACK APPROVED», «REPORT BACK ON TRACK», «REPORT CLEAR OF WEATHER» y «UNABLE (dirección) DEVIATION DUE TRAFFIC», contra Doc 4444 16.ª ed. cap. 12 (no cargado).",
              "VERIFICAR: procedimiento de contingencia para desvío por meteorología sin autorización ATC, contra Doc 4444 16.ª ed. cap. 15 (no cargado).",
              "VERIFICAR: «PROCEED DIRECT (punto)» contra Doc 4444 16.ª ed. cap. 12 (no cargado).",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
  // ── 26 ──────────────────────────────────────────────────────────────────
  {
    n: 26,
    title: "STAR y llegada",
    kicker: "La llegada autorizada y lo que la modifica",
    minutes: 8,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "La **STAR** (llegada normalizada por instrumentos) es una ruta de llegada IFR publicada que une un punto significativo, normalmente en una ruta ATS, con un punto donde puede empezar una aproximación por instrumentos publicada (Doc 4444, cap. 1). La llegada termina de armarse con Approach: pista, tipo de aproximación, QNH, nivel de transición y secuencia.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "Cuando la STAR está publicada en la AIP, la autorización puede nombrarla por su designador («autorizado llegada vía (designación)», Doc 4444, 4.5.7.2.1).",
          "En el contacto inicial, Approach normalmente dice qué aproximación esperar. El nivel de transición se puede omitir si está publicado en la AIP (Doc 9432, 7.3.1).",
          "En el primer contacto con el aeródromo se acusa recibo del ATIS (Doc 9432, 4.6.2 y 7.3).",
          "El QNH va en la primera autorización para descender por debajo del nivel de transición (Doc 4444, 4.10.4.5).",
          "**Una instrucción que modifica parte de la STAR** (un directo, un rumbo, un nivel, una velocidad) cambia esa parte. Qué pasa con las restricciones publicadas que quedan es lo que regula la fraseología `DESCEND VIA STAR` en la 16.ª ed. del Doc 4444 (VERIFICAR). Si queda duda: `CONFIRM`.",
          "`EXPECT` da información para planear, **no autoriza**. «Expect ILS approach runway three one» no es autorización de aproximación.",
          "En el descenso inicial de un reactor, ATC solo debería pedir menos de 250 kt con la aquiescencia de la tripulación (Doc 4444, 4.6.3.3). Ver capítulo 22.",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "No están en las fuentes cargadas: «CLEARED (designador) ARRIVAL» como forma inglesa de «autorizado llegada vía (designación)» (ejemplo 1); «DESCEND VIA STAR TO (nivel)» (ejemplo 2) y qué restricciones publicadas quedan vigentes tras una instrucción de nivel sin «VIA» o un directo; «PROCEED DIRECT (punto)» (ejemplo 6) y «REDUCE SPEED TO (número) KNOTS» (ejemplo 8). Consultar el Doc 4444 16.ª ed., caps. 6 y 12, y la AIP del Estado.",
      },
      ...ejemplo(
        "Ejemplo 1 · Autorización con la STAR (VERIFICAR la redacción inglesa)",
        [
          `ATC:   "Aviatory 452, cleared PAXUM two Bravo arrival, descend to flight level one two zero."`,
          `PILOT: "Cleared PAXUM two Bravo arrival, descending to flight level one two zero, Aviatory 452."`,
        ],
        "Significado: seguir la STAR PAXUM 2B y descender a FL 120. El Doc 4444 cargado da la forma en español («autorizado llegada vía»); la inglesa está en el cap. 12.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Descenso por la STAR (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, descend via STAR to seven thousand feet, QNH one zero one two."`,
          `PILOT: "Descend via STAR to seven thousand feet, QNH one zero one two, Aviatory 452."`,
        ],
        "Significado: bajar hasta 7000 ft cumpliendo las restricciones de nivel y velocidad publicadas de la STAR. Con QNH porque la altitud autorizada está por debajo del nivel de transición.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Primer contacto con Approach",
        [
          `PILOT: "Bogota Approach, Aviatory 452, flight level one two zero, estimating PAXUM four six, information Delta."`,
          `ATC:   "Aviatory 452, descend to five thousand feet, QNH one zero one two, transition level seven zero, expect ILS approach runway three one."`,
          `PILOT: "Descending to five thousand feet, QNH one zero one two, transition level seven zero, expecting ILS approach runway three one, Aviatory 452."`,
        ],
        "Significado: nivel, estimado y ATIS en la llamada. ATC da altitud, QNH, nivel de transición y aproximación prevista; todo se colaciona.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Descender después de un punto",
        [
          `ATC:   "Aviatory 452, after passing PAXUM descend to flight level eight zero."`,
          `PILOT: "After PAXUM descend to flight level eight zero, Aviatory 452."`,
        ],
        "Significado: autorización condicional. **No se inicia el descenso antes de PAXUM.**",
      ),
      ...ejemplo(
        "Ejemplo 5 · Restricción de cruce",
        [
          `ATC:   "Aviatory 452, cross RODEL flight level one zero zero or above."`,
          `PILOT: "Cross RODEL flight level one zero zero or above, Aviatory 452."`,
        ],
        "Significado: sobre RODEL a FL 100 o más alto. Hay que planear el descenso para cumplirla.",
      ),
      ...ejemplo(
        "Ejemplo 6 · Directo que corta la STAR (directo VERIFICAR; la pregunta es PLAIN LANGUAGE con palabra normalizada)",
        [
          `ATC:   "Aviatory 452, proceed direct RODEL."`,
          `PILOT: "Direct RODEL, Aviatory 452. Confirm altitude restriction at RODEL still applies?"`,
          `ATC:   "Aviatory 452, affirm, cross RODEL flight level one zero zero or above."`,
          `PILOT: "Cross RODEL flight level one zero zero or above, Aviatory 452."`,
        ],
        "Significado: al saltarse puntos, puede desaparecer del FMS alguna restricción, o quedar menos distancia para bajar. Se confirma.",
      ),
      ...ejemplo(
        "Ejemplo 7 · Cambio de pista (EXPECT verificado; lo demás PLAIN LANGUAGE)",
        [
          `ATC:   "Aviatory 452, expect ILS approach runway one three, QNH one zero one four."`,
          `PILOT: "Runway one three, QNH one zero one four, Aviatory 452. We need about three minutes to set up the new approach."`,
          `ATC:   "Aviatory 452, roger, fly heading one eight zero."`,
          `PILOT: "Heading one eight zero, Aviatory 452."`,
        ],
        "Significado: un cambio de pista en la llegada es carga de trabajo real (nueva aproximación, nuevos puntos, nueva distancia). Decir cuánto tiempo se necesita es mejor que aceptar y quedarse corto.",
      ),
      ...ejemplo(
        "Ejemplo 8 · Velocidad en la llegada (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, reduce speed to two two zero knots."`,
          `PILOT: "Reduce speed to two two zero knots, Aviatory 452."`,
        ],
        "Significado: ajuste para la secuencia. Si con esa velocidad no se cumple una restricción de altitud, se avisa.",
      ),
      {
        kind: "hueco",
        rotulo: "CM-26-01 · Diagrama · 16:9 · 1600×900 px",
        descripcion: "Imagen sugerida: Esquema en planta de una STAR ficticia «PAXUM 2B»: PAXUM → RODEL → KUBIN → punto de aproximación inicial. Junto a cada punto, su restricción publicada en estilo de carta (RODEL «FL100 o superior», KUBIN «250 kt máx.»). Una línea en otro color muestra un directo ATC de PAXUM a RODEL que salta un punto intermedio. Al margen, tres tarjetas: «EXPECT = planear, no autoriza», «DESCEND VIA STAR = con restricciones publicadas (verificar)», «Instrucción ATC = cambia lo que nombra». Objetivo: Que el piloto entienda qué parte de la STAR cambia con cada instrucción y que un directo puede dejarle menos distancia para descender.",
        alto: 280,
      },
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Preparando la llegada",
        texto: "La llegada se prepara antes del descenso con el ATIS, la STAR y la aproximación esperada, y se hace el briefing. Cualquier cambio posterior (pista, STAR, directo) obliga a volver a revisar lo cargado en el FMS contra la carta, con los dos pilotos. Si la distancia que queda no alcanza para bajar a tiempo, se dice pronto: ATC puede dar vectores, más distancia o una restricción distinta.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Tomar `EXPECT` como autorización", "**Tomar `EXPECT` como autorización** y bajar o empezar la aproximación."),
      error("Descender antes del punto", "**Descender antes del punto** en una autorización «after passing»."),
      error("Perder una restricción", "**Perder una restricción** al cargar un directo en el FMS."),
      error("Aceptar un cambio de pista sin tiempo", "**Aceptar un cambio de pista sin tiempo** para preparar la nueva aproximación y llegar alto o rápido."),
      error("Olvidar el QNH", "**Olvidar el QNH** al cruzar el nivel de transición en descenso."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "La STAR viene en la autorización y se colaciona.",
          "`EXPECT` sirve para planear; no autoriza nada.",
          "Primer contacto con Approach: nivel, estimado, ATIS.",
          "Directo o rumbo: cambia la parte que nombra; si no está claro lo demás, `CONFIRM`.",
          "Si no alcanza a descender, se dice antes.",
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
            text: "Doc 4444 (15.ª ed., Enm. 4) cap. 1 («Llegada normalizada por instrumentos (STAR)»); 4.5.7.2.1; 4.5.7.5.1; 4.6.3.3; 4.10.4.5. Doc 9432 (4.ª ed.) 2.8.3.7 («CROSS A1 AT WICKEN FL 70»); 2.8.3.10 («CROSS WICKEN FL 150 OR ABOVE»); 3.3.3.1 («AFTER PASSING … DESCEND TO FL 80»); 4.6.2; 7.3.1 y 7.3 (primer contacto con Approach, «DESCEND TO 4 000 FEET QNH 1005 TRANSITION LEVEL 50 EXPECT ILS APPROACH RUNWAY 24», «EXPECT ILS APPROACH RUNWAY 24 QNH 1014»).",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: «CLEARED (designador) ARRIVAL» como forma inglesa de «autorizado llegada vía (designación)», contra Doc 4444 16.ª ed. cap. 12 (no cargado).",
              "VERIFICAR: «DESCEND VIA STAR TO (nivel)» y qué restricciones publicadas quedan vigentes tras una instrucción de nivel sin «VIA» o un directo, contra Doc 4444 16.ª ed. caps. 6 y 12 (no cargados) y la AIP del Estado.",
              "VERIFICAR: «PROCEED DIRECT (punto)» y «REDUCE SPEED TO (número) KNOTS» contra Doc 4444 16.ª ed. cap. 12 (no cargado).",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
  // ── 27 ──────────────────────────────────────────────────────────────────
  {
    n: 27,
    title: "Aproximación",
    kicker: "La autorización de aproximación y lo que se reporta",
    minutes: 9,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "La aproximación es la parte del vuelo que lleva el avión desde la llegada hasta la pista. Este capítulo trata **cómo se comunica**, no cómo se vuela el procedimiento.",
      },
      { kind: "p", text: "Definiciones del Doc 4444 (cap. 1) que conviene tener claras:" },
      {
        kind: "glosario",
        items: [
          {
            k: "Procedimiento de aproximación por instrumentos",
            v: "serie de maniobras predeterminadas por referencia a los instrumentos, con protección contra obstáculos. Se clasifica en **de precisión** (PA, por ejemplo ILS), **con guía vertical** (APV) y **que no es de precisión** (NPA).",
          },
          {
            k: "Aproximación final",
            v: "la parte del procedimiento que empieza en el punto o la referencia de aproximación final.",
          },
          {
            k: "Aproximación visual",
            v: "en un vuelo IFR, cuando parte o todo el procedimiento por instrumentos no se completa y se sigue con referencia visual al terreno.",
          },
          {
            k: "Altitud/altura de decisión (DA/DH)",
            v: "donde debe iniciarse la aproximación frustrada si no se tiene la referencia visual requerida.",
          },
        ],
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "`EXPECT (tipo) APPROACH` es información. La **autorización de aproximación** es otra transmisión: «cleared … approach runway …».",
          "Si ATC pide «report established», se informa cuando el avión está establecido en el procedimiento (Doc 9432, 7.3).",
          "Los vectores hacia la final son rumbos como los del capítulo 21, con la misma colación.",
          "Cerca del final, ATC solo debería pedir ajustes de velocidad menores (±20 kt) y ninguno después de 4 NM del umbral (Doc 4444, 4.6.3.6 y 4.6.3.7).",
          "ATC puede avisar una **advertencia de altitud mínima (MSAW)** e instrucciones (Doc 9432, 6.7.1). Se reacciona primero y se habla después.",
          "La información esencial del aeródromo (por ejemplo, un ILS fuera de servicio) se da antes de empezar la aproximación final, salvo que ya se tenga por otra fuente (Doc 9432, 4.10).",
          "Una aproximación RNAV o RNP exige que el avión y la tripulación estén aprobados. Si no se puede volar la que ATC propone, `UNABLE` y se pide otra. La comunicación PBN está en el capítulo 40.",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "No están en las fuentes cargadas: «CLEARED ILS APPROACH RUNWAY (número)», la forma del rumbo de interceptación y «REPORT ESTABLISHED ON THE LOCALIZER» (Doc 9432 cap. 7, 7.4 en adelante, y Doc 4444 16.ª ed. cap. 12); «REPORT RUNWAY IN SIGHT» y «CLEARED VISUAL APPROACH RUNWAY (número)» (Doc 4444 16.ª ed. cap. 12); «CLEARED RNP (o RNAV) APPROACH RUNWAY (número)» y la designación de aproximaciones RNP (Doc 4444 16.ª ed. cap. 12 y Doc 9613, Manual PBN); «MAINTAIN (número) KNOTS UNTIL (distancia) FINAL» (Doc 4444 16.ª ed. cap. 12).",
      },
      ...ejemplo(
        "Ejemplo 1 · Aproximación ILS directa",
        [
          `PILOT: "Runway three one, QNH one zero one four, request straight-in ILS approach, Aviatory 452."`,
          `ATC:   "Aviatory 452, cleared straight-in ILS approach runway three one, report established."`,
          `PILOT: "Cleared straight-in ILS approach runway three one, wilco, Aviatory 452."`,
          `PILOT: "Aviatory 452, established, runway in sight."`,
          `ATC:   "Aviatory 452, contact Tower one one eight decimal seven."`,
          `PILOT: "One one eight decimal seven, Aviatory 452."`,
        ],
        "Significado: autorizado a la aproximación ILS directa. «Report established» se cumple con `WILCO` y luego se informa. Después, cambio a Torre.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Vectores hacia la final",
        [
          `ATC:   "Aviatory 452, turn left heading two one zero, descend to four thousand feet, QNH one zero one four."`,
          `PILOT: "Left heading two one zero, descending to four thousand feet, QNH one zero one four, Aviatory 452."`,
        ],
        "Significado: rumbo, altitud y QNH en una sola transmisión. Se colaciona en el mismo orden.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Rumbo de interceptación y autorización ILS (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, turn left heading one six zero, cleared ILS approach runway three one, report established on the localizer."`,
          `PILOT: "Left heading one six zero, cleared ILS approach runway three one, wilco, Aviatory 452."`,
          `PILOT: "Aviatory 452, established on the localizer."`,
        ],
        "Significado: rumbo para interceptar, autorización de la aproximación y pedido de notificar establecido en el localizador. La forma exacta del Doc 4444 cap. 12 (no cargado) se confirma.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Aproximación visual (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, report runway in sight."`,
          `PILOT: "Aviatory 452, runway in sight."`,
          `ATC:   "Aviatory 452, cleared visual approach runway three one."`,
          `PILOT: "Cleared visual approach runway three one, Aviatory 452."`,
        ],
        "Significado: ver la pista no es tener la autorización. Hasta escuchar «cleared visual approach», el avión sigue con lo último autorizado.",
      ),
      ...ejemplo(
        "Ejemplo 5 · Aproximación RNP (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, cleared RNP approach runway one three."`,
          `PILOT: "Cleared RNP approach runway one three, Aviatory 452."`,
        ],
        "Significado: se nombra el tipo de aproximación y la pista. Si la carta tiene varias del mismo tipo, se nombra la que corresponde.",
      ),
      ...ejemplo(
        "Ejemplo 6 · No puede volar la aproximación propuesta (UNABLE + PLAIN LANGUAGE)",
        [
          `ATC:   "Aviatory 452, expect RNP approach runway one three."`,
          `PILOT: "Aviatory 452, unable RNP approach. Request ILS approach runway three one."`,
          `ATC:   "Aviatory 452, roger, expect ILS approach runway three one, fly heading two seven zero."`,
          `PILOT: "Heading two seven zero, expecting ILS approach runway three one, Aviatory 452."`,
        ],
        "Significado: el avión no tiene hoy la capacidad requerida (por equipo o por aprobación). Se dice con tiempo para que ATC reorganice.",
      ),
      ...ejemplo(
        "Ejemplo 7 · Ayuda fuera de servicio",
        [
          `ATC:   "Aviatory 452, ILS runway three one unserviceable."`,
          `PILOT: "Roger, Aviatory 452. Request RNP approach runway three one."`,
        ],
        "Significado: la primera parte sigue el Doc 9432 (4.10); el pedido es PLAIN LANGUAGE.",
      ),
      ...ejemplo(
        "Ejemplo 8 · Advertencia de altitud mínima",
        [
          `ATC:   "Aviatory 452, low altitude warning, check your altitude immediately, QNH is one zero zero six, the minimum flight altitude is four thousand five hundred feet."`,
          `PILOT: "Aviatory 452, climbing to four thousand five hundred feet, QNH one zero zero six."`,
        ],
        "Significado: el sistema de ATC detecta al avión demasiado bajo. Se corrige primero. La respuesta del piloto es un ejemplo en lenguaje claro: el Doc 9432 cargado no la trae.",
      ),
      ...ejemplo(
        "Ejemplo 9 · Velocidad hasta la final (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, maintain one six zero knots until four miles final."`,
          `PILOT: "One six zero knots until four miles final, Aviatory 452."`,
        ],
        "Significado: después de 4 NM la velocidad es de la tripulación para estabilizar.",
      ),
      {
        kind: "hueco",
        rotulo: "CM-27-01 · Diagrama · 16:9 · 1600×900 px",
        descripcion: "Imagen sugerida: Vista en planta de una interceptación del localizador de una pista genérica «31». El avión viene en rumbo 210, luego rumbo 160 hacia el eje extendido de la pista (ángulo de interceptación visible). En el punto de interceptación, la etiqueta «Established on the localizer». Debajo, un perfil lateral con la senda de planeo y el punto «4 NM» marcado con «Sin control de velocidad ATC desde aquí». Globos de diálogo cortos en cada tramo: «turn left heading 160», «cleared ILS approach runway 31», «established». Objetivo: Que el piloto asocie cada fase de la interceptación con lo que se dice por radio y distinga el rumbo de interceptación de la autorización de aproximación.",
        alto: 280,
      },
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Briefing y autorización de aproximación",
        texto: "La aproximación esperada se prepara y se revisa en el briefing antes del descenso. La autorización se colaciona y el PM verifica que el modo de aproximación esté armado según el SOP. Muchos operadores exigen que ambos pilotos confirmen en voz alta pista y tipo de aproximación al recibir la autorización. Cambios tardíos de pista o de tipo de aproximación son una fuente conocida de aproximaciones no estabilizadas: si no hay tiempo, se pide.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Tomar el rumbo de interceptación como autorización de aproximación", "Con solo «heading one six zero», el avión cruza el localizador y sigue de largo."),
      error("Descender en la senda sin autorización de aproximación", "**Descender en la senda sin autorización de aproximación.**"),
      error("Confundir pista o tipo de aproximación", "**Confundir pista o tipo de aproximación** (31 y 13, ILS y RNP) por sesgo de expectativa del briefing."),
      error("Aceptar una aproximación para la que el avión o la tripulación no están aprobados", "**Aceptar una aproximación para la que el avión o la tripulación no están aprobados.**"),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "`EXPECT` prepara; «cleared … approach» autoriza.",
          "El rumbo de interceptación no es autorización de aproximación.",
          "«Report established»: `WILCO` y luego informar.",
          "`UNABLE` si no puede volar el procedimiento, y pedir otro.",
          "MSAW: corregir primero, hablar después.",
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
            text: "Doc 4444 (15.ª ed., Enm. 4) cap. 1 («Procedimiento de aproximación por instrumentos (IAP)» y su clasificación PA/APV/NPA, «Aproximación final», «Aproximación visual», «Altitud de decisión (DA) o altura de decisión (DH)»); 4.6.3.6; 4.6.3.7. Doc 9432 (4.ª ed.) 4.10 («ILS 09 UNSERVICEABLE»); 6.3 (rumbos); 6.7.1 («LOW ALTITUDE WARNING, CHECK YOUR ALTITUDE IMMEDIATELY»); 7.3.1; 7.3 («REQUEST STRAIGHT-IN ILS APPROACH», «CLEARED STRAIGHT-IN ILS APPROACH RUNWAY 24 REPORT ESTABLISHED», «ESTABLISHED RUNWAY IN SIGHT», «CONTACT TOWER»).",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: «CLEARED ILS APPROACH RUNWAY (número)», la forma del rumbo de interceptación del localizador y «REPORT ESTABLISHED ON THE LOCALIZER», contra Doc 9432 cap. 7 (7.4 en adelante, no cargado) y Doc 4444 16.ª ed. cap. 12 (no cargado).",
              "VERIFICAR: «REPORT RUNWAY IN SIGHT» y «CLEARED VISUAL APPROACH RUNWAY (número)» contra Doc 4444 16.ª ed. cap. 12 (no cargado).",
              "VERIFICAR: «CLEARED RNP (o RNAV) APPROACH RUNWAY (número)» y la designación de aproximaciones RNP, contra Doc 4444 16.ª ed. cap. 12 y Doc 9613 (Manual PBN) (no cargados).",
              "VERIFICAR: «MAINTAIN (número) KNOTS UNTIL (distancia) FINAL» contra Doc 4444 16.ª ed. cap. 12 (no cargado).",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
  // ── 28 ──────────────────────────────────────────────────────────────────
  {
    n: 28,
    title: "Espera (holding)",
    kicker: "Instrucciones de espera y hora prevista de aproximación",
    minutes: 8,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "El **procedimiento de espera** es una maniobra predeterminada que mantiene al avión dentro de un espacio aéreo especificado mientras espera otra autorización (Doc 4444, cap. 1). Se vuela sobre un **punto de referencia de espera**. Lo usa ATC cuando hay más llegadas que capacidad de pista, cuando la pista se cierra o cuando la meteorología no deja aterrizar.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "**Hora prevista de aproximación (EAT)**: hora a la que ATC prevé que el avión, después de una demora, dejará el punto de espera para completar la aproximación. La hora real de salida de la espera depende de la autorización de aproximación (Doc 4444, cap. 1 y su Nota). La EAT sirve para planear el combustible y, en caso de falla de comunicaciones, tiene un papel propio (capítulo 32).",
          "Cuando la demora es conocida, ATC puede hacerla absorber antes, con velocidad reducida en crucero (Doc 4444, 4.6.3.1).",
          "**No se aplica control de velocidad** a quien entra o está en espera (Doc 4444, 4.6.1.2). Las velocidades máximas de espera y las entradas al circuito están en el Doc 8168 (PANS-OPS), no cargado.",
          "En la misma espera, ATC puede fijar regímenes de descenso para mantener la separación entre aviones que bajan a velocidades muy distintas (Doc 4444, 5.3.4.1.1).",
          "Un viraje de 360 u órbita «for delay» no es un circuito de espera: es una demora corta con vectores (Doc 9432, 6.3.4).",
          "**Una instrucción de espera incompleta se aclara antes de llegar al punto**: punto, nivel, rumbo de acercamiento, sentido de los virajes y duración o distancia del alejamiento.",
          "La tripulación sabe cuánto tiempo puede esperar antes de tener que ir al alterno. Ese número se dice a ATC antes de que sea un problema. La comunicación de combustible mínimo y de emergencia de combustible está en el capítulo 37.",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "Toda instrucción de espera de ATC de esta lección es por verificar, aunque el ejemplo no lo repita: «HOLD AT (fijo) AS PUBLISHED», la espera no publicada con «INBOUND TRACK», «RIGHT/LEFT HAND PATTERN» y «OUTBOUND TIME», «EXPECT APPROACH CLEARANCE AT (hora)», «DELAY NOT DETERMINED», «NO DELAY EXPECTED». Consultar el Doc 4444 16.ª ed., cap. 12, y el Doc 9432, cap. 7 (7.4 en adelante) y cap. 8. Velocidades máximas de espera, entradas al circuito y tiempo de alejamiento: Doc 8168 PANS-OPS Vol. I. Si el Estado exige informar la entrada en la espera: su AIP.",
      },
      {
        kind: "p",
        text: "La fraseología de espera está en partes del Doc 9432 y del Doc 4444 que no están cargadas. Toda instrucción de espera de ATC en este capítulo va con **(VERIFICAR)**, aunque el ejemplo no lo repita.",
      },
      ...ejemplo(
        "Ejemplo 1 · Espera publicada (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, hold at PAXUM as published, maintain flight level one two zero, expect approach clearance at four five."`,
          `PILOT: "Hold at PAXUM as published, maintaining flight level one two zero, expect approach clearance at four five, Aviatory 452."`,
        ],
        "Significado: esperar en PAXUM con el circuito de la carta, a FL 120. La aproximación se prevé a los 45. Se colaciona el nivel y la hora.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Espera no publicada (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, hold at GIKOS, flight level one five zero, inbound track two seven zero, right hand pattern, outbound time one minute."`,
          `PILOT: "Hold at GIKOS, flight level one five zero, inbound track two seven zero, right hand pattern, outbound time one minute, Aviatory 452."`,
        ],
        "Significado: ATC arma el circuito completo: punto, nivel, rumbo de acercamiento, virajes a la derecha, un minuto de alejamiento. Se colaciona todo.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Falta un dato (palabras normalizadas)",
        [
          `ATC:   "Aviatory 452, hold at GIKOS, flight level one five zero, inbound track two seven zero, outbound time one minute."`,
          `PILOT: "Aviatory 452, confirm right or left hand pattern?"`,
          `ATC:   "Aviatory 452, right hand pattern."`,
          `PILOT: "Right hand pattern, Aviatory 452."`,
        ],
        "Significado: sin el sentido de los virajes, la espera no está definida. Se pregunta antes del punto, no encima de él.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Demora sin determinar (VERIFICAR la frase de ATC; la respuesta es PLAIN LANGUAGE)",
        [
          `ATC:   "Aviatory 452, delay not determined, runway closed."`,
          `PILOT: "Roger, Aviatory 452. We can hold for three zero minutes, then we will need to divert to Cali."`,
          `ATC:   "Aviatory 452, roger, I will advise."`,
        ],
        "Significado: sin hora prevista, la tripulación le da a ATC su límite. Así ATC sabe cuándo debe tener lista la desviación.",
      ),
      ...ejemplo(
        "Ejemplo 5 · Sin demora (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, no delay expected, cleared ILS approach runway three one."`,
          `PILOT: "Cleared ILS approach runway three one, Aviatory 452."`,
        ],
        "Significado: la autorización de aproximación es lo que saca al avión de la espera. No se sale por haber llegado la EAT.",
      ),
      ...ejemplo(
        "Ejemplo 6 · Límite de combustible (UNABLE + PLAIN LANGUAGE)",
        [
          `ATC:   "Aviatory 452, expect approach clearance at one five."`,
          `PILOT: "Aviatory 452, unable to hold until one five due fuel. Maximum holding time one zero minutes, then we divert to Cali."`,
        ],
        "Significado: `UNABLE` normalizada, motivo y dato concreto. Esto no es declarar combustible mínimo ni emergencia: esas frases están en el capítulo 37.",
      ),
      ...ejemplo(
        "Ejemplo 7 · Informar entrada en la espera (PLAIN LANGUAGE; depende del Estado)",
        [
          `PILOT: "Aviatory 452, entering the hold at PAXUM, flight level one two zero."`,
          `ATC:   "Aviatory 452, roger."`,
        ],
        "Significado: algunas dependencias lo piden y otras no. Se hace si la AIP o ATC lo exigen.",
      ),
      ...ejemplo(
        "Ejemplo 8 · Descenso dentro de la espera",
        [
          `ATC:   "Aviatory 452, descend to flight level one zero zero."`,
          `PILOT: "Leaving flight level one two zero descending to flight level one zero zero, Aviatory 452."`,
        ],
        "Significado: los aviones de abajo salen hacia la aproximación y los de arriba bajan un escalón. La colación es la del capítulo 20.",
      ),
      {
        kind: "hueco",
        rotulo: "CM-28-01 · Diagrama · 16:9 · 1600×900 px",
        descripcion: "Imagen sugerida: Circuito de espera en planta sobre un fijo ficticio «GIKOS». Se ven: el fijo (triángulo), el tramo de acercamiento con la etiqueta «Inbound track 270» y la flecha hacia el fijo, el viraje a la derecha sobre el fijo, el tramo de alejamiento con «Outbound time 1 min», y el segundo viraje a la derecha de vuelta al acercamiento. Texto «Right hand pattern» con flechas de sentido. En un recuadro lateral, los cinco datos que debe tener la instrucción: fijo, nivel, inbound track, sentido de virajes, tiempo o distancia de alejamiento; y aparte «EAT: hora prevista de salida de la espera». Objetivo: Que el piloto reconozca cada elemento de una instrucción de espera en el dibujo y sepa qué preguntar si falta alguno.",
        alto: 280,
      },
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Al recibir una espera",
        texto: "Al recibir una espera, la tripulación la carga en el FMS, verifica contra la carta o contra lo dictado, y calcula cuánto puede esperar con el combustible que tiene antes de ir al alterno. Ese tiempo se actualiza en cada vuelta y se habla con ATC antes de llegar al límite. Los criterios de combustible y de decisión de desviar son del operador y de la norma del Estado; aquí solo se trata cómo comunicarlos.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Colacionar la espera a medias", "**Colacionar la espera a medias** y descubrir encima del fijo que falta el sentido de los virajes."),
      error("Confundir la EAT con una autorización", "**Confundir la EAT con una autorización** y salir de la espera sin autorización de aproximación."),
      error("Guardarse el límite de combustible", "**Guardarse el límite de combustible** hasta que ya no hay margen."),
      error("Tomar el descenso de otro avión", "**Tomar el descenso de otro avión** en una frecuencia llena de aviones en la misma espera."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Fijo, nivel, rumbo de acercamiento, sentido de virajes, alejamiento: si falta uno, se pregunta.",
          "EAT planea; la autorización de aproximación saca de la espera.",
          "Sin control de velocidad ATC en la espera.",
          "Decir a tiempo cuánto se puede esperar y a dónde se desviaría.",
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
            text: "Doc 4444 (15.ª ed., Enm. 4) cap. 1 («Procedimiento de espera», «Punto de referencia de espera», «Hora prevista de aproximación» y su Nota); 4.6.1.2; 4.6.3.1; 5.3.4.1.1. Doc 9432 (4.ª ed.) cap. 1 («Hora prevista de aproximación», «Procedimiento de espera»); 2.6 («CONFIRM», «UNABLE»); 3.3 (descenso); 6.3.4 («ORBIT LEFT FOR DELAY»).",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: toda la fraseología de espera de los ejemplos («HOLD AT (fijo) AS PUBLISHED», «HOLD AT (fijo) (nivel) INBOUND TRACK (tres dígitos) RIGHT/LEFT HAND PATTERN OUTBOUND TIME (número) MINUTES», «EXPECT APPROACH CLEARANCE AT (hora)», «DELAY NOT DETERMINED», «NO DELAY EXPECTED»), contra Doc 4444 16.ª ed. cap. 12 y Doc 9432 cap. 7 (7.4 en adelante) y cap. 8 (no cargados).",
              "VERIFICAR: velocidades máximas de espera, entradas al circuito y tiempo de alejamiento por nivel, contra Doc 8168 PANS-OPS Vol. I (no cargado).",
              "VERIFICAR: si el Estado exige informar la entrada en la espera, contra su AIP.",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
  // ── 29 ──────────────────────────────────────────────────────────────────
  {
    n: 29,
    title: "Aterrizaje",
    kicker: "CONTINUE APPROACH no es CLEARED TO LAND",
    minutes: 8,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Es la última autorización del vuelo antes de tocar la pista: **CLEARED TO LAND**. Antes de ella, Torre puede decir otras cosas que suenan parecido y no autorizan nada.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      { kind: "definicion", text: "CONTINUE APPROACH no es CLEARED TO LAND." },
      {
        kind: "list",
        items: [
          "`CONTINUE APPROACH` quiere decir: siga aproximándose, **todavía no tiene autorización para aterrizar**. Suele venir con el viento, porque la pista aún no está libre o porque Torre está secuenciando (Doc 9432, 4.6.4 y 4.7.1). En el Doc 9432 el piloto acusa recibo solo con su distintivo: no hay nada que colacionar.",
          "`CLEARED TO LAND` es la autorización. Lleva la pista y normalmente el viento. **Se colaciona con la pista** (Doc 4444, 4.5.7.5.1: las autorizaciones para aterrizar se colacionan siempre).",
          "Si el avión se acerca al punto en el que su SOP exige tener la autorización y no la tiene, se pregunta. Si sigue sin tenerla, **motor y al aire**. Ese punto lo define el operador y, en algunos Estados, la norma nacional: no es un valor OACI único.",
          "Algunos Estados usan fraseología adicional en la final (por ejemplo, para anticipar una autorización tardía). Si no está en el Doc 4444 del Estado o en su AIP, no se asume nada: se pregunta.",
          "Torre evita transmitir en la última parte de la final y durante el recorrido de aterrizaje, salvo por seguridad (Doc 9432, 4.1.2). Lo que llegue en ese momento es importante.",
          "Notificaciones en la final: «FINAL» a 4 NM (7 km) o menos del punto de toma de contacto; «LONG FINAL» si el viraje a final es más lejos, o a unas 8 NM en una aproximación directa (Doc 9432, 4.7.1). Se hacen cuando las pide Torre o el procedimiento local.",
          "Después de aterrizar: se sigue en la frecuencia de Torre hasta dejar la pista, salvo instrucción distinta (Doc 9432, 4.9).",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "Los intercambios de esta lección salen del Doc 9432 cargado. Queda por verificar lo que por eso no se usa en ellos: la fraseología adicional de la final (autorización tardía, aterrizaje después de otro tráfico), contra el Doc 4444 16.ª ed. cap. 12 y la AIP del Estado; y el punto en el que el operador o el Estado exige tener la autorización de aterrizaje, contra el SOP del operador y la norma nacional (en Colombia, RAC y AIP Colombia).",
      },
      ...ejemplo(
        "Ejemplo 1 · Continuar la aproximación",
        [
          `PILOT: "Bogota Tower, Aviatory 452, long final."`,
          `ATC:   "Aviatory 452, continue approach, wind two six zero degrees one eight knots."`,
          `PILOT: "Aviatory 452."`,
        ],
        "Significado: siga, sin autorización para aterrizar. El distintivo solo es el acuse de recibo que muestra el Doc 9432. Decir «continue approach, Aviatory 452» también deja claro en cabina que falta la autorización.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Autorización para aterrizar",
        [
          `PILOT: "Aviatory 452, final."`,
          `ATC:   "Aviatory 452, runway three one, cleared to land, wind two seven zero degrees two zero knots."`,
          `PILOT: "Runway three one, cleared to land, Aviatory 452."`,
        ],
        "Significado: ahora sí puede aterrizar. Se colaciona pista y autorización. El viento no hace falta colacionarlo.",
      ),
      ...ejemplo(
        "Ejemplo 3 · La autorización no llega (palabra normalizada + PLAIN LANGUAGE)",
        [
          `PILOT: "Bogota Tower, Aviatory 452, confirm cleared to land runway three one?"`,
          `ATC:   "Aviatory 452, negative, continue approach, traffic departing runway three one."`,
          `PILOT: "Aviatory 452."`,
        ],
        "Significado: se pregunta con `CONFIRM`. La respuesta `NEGATIVE` deja claro que no hay autorización. Si no llega antes del punto que fija el SOP, motor y al aire.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Pista ocupada",
        [
          `ATC:   "Aviatory 452, go around, aircraft on the runway."`,
          `PILOT: "Going around, Aviatory 452."`,
        ],
        "Significado: orden de motor y al aire. Se ejecuta y se responde corto (capítulo 30).",
      ),
      ...ejemplo(
        "Ejemplo 5 · Información esencial en la final",
        [
          `ATC:   "Aviatory 452, caution, large flock of birds north of runway three one."`,
          `PILOT: "Roger, Aviatory 452."`,
        ],
        "Significado: información, no instrucción. `ROGER` basta. La decisión de continuar es de la tripulación.",
      ),
      ...ejemplo(
        "Ejemplo 6 · Salida de pista y cambio a Tierra",
        [
          `ATC:   "Aviatory 452, take first right, when vacated contact Ground one two one decimal eight."`,
          `PILOT: "First right, wilco, one two one decimal eight, Aviatory 452."`,
        ],
        "Significado: salir por la primera a la derecha. **Se cambia a Tierra cuando la pista quedó libre**, no antes.",
      ),
      ...ejemplo(
        "Ejemplo 7 · Pista libre",
        [
          `PILOT: "Bogota Ground, Aviatory 452, runway vacated."`,
          `ATC:   "Aviatory 452, taxi to stand two seven via taxiway Alpha."`,
          `PILOT: "Stand two seven via taxiway Alpha, Aviatory 452."`,
        ],
        "Significado: primer contacto con Tierra. La instrucción de rodaje se colaciona como en el capítulo 16.",
      ),
      ...ejemplo(
        "Ejemplo 8 · Órbita por tráfico en la pista (circuito visual)",
        [
          `ATC:   "Aviatory 452, orbit right due traffic on the runway, report again on final."`,
          `PILOT: "Orbiting right, wilco, Aviatory 452."`,
        ],
        "Significado: en un circuito de tránsito visual, Torre puede demorar al avión con una órbita en vez de un motor y al aire (Doc 9432, 4.6.5). En una aproximación IFR estabilizada, lo normal es el motor y al aire.",
      ),
      {
        kind: "hueco",
        rotulo: "CM-29-01 · Diagrama · 16:9 · 1600×900 px",
        descripcion: "Imagen sugerida: Perfil lateral de una aproximación final hacia una pista genérica «31», con el avión a varias distancias. A 8 NM, globo «LONG FINAL» y respuesta de torre «CONTINUE APPROACH, wind…» con una etiqueta gris «SIN autorización para aterrizar». A 4 NM, globo «FINAL» y respuesta «RUNWAY 31, CLEARED TO LAND, wind…» con una etiqueta en el color de acento del módulo «AUTORIZADO». Antes del umbral, una línea vertical punteada rotulada «Punto de decisión según SOP del operador: sin CLEARED TO LAND → preguntar; si no llega → GO AROUND». El ámbar y el rojo no se usan como decoración. Objetivo: Que el piloto distinga de un vistazo CONTINUE APPROACH de CLEARED TO LAND y sepa que la falta de autorización tiene un punto de decisión.",
        alto: 280,
      },
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En la final",
        texto: "Muchos SOP incluyen en la lista de la final un ítem para confirmar la autorización de aterrizaje, y que el PM la anuncie en voz alta al recibirla. Cuándo se decide el motor y al aire por falta de autorización, qué pasa en pistas paralelas y cómo se confirma la pista correcta son reglas del operador y del Estado. Lo que no cambia: **sin «cleared to land» no se aterriza**.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Escuchar «cleared to land» donde dijeron «continue approach»", "Es el sesgo de expectativa en su forma más peligrosa: la tripulación espera la autorización y el cerebro la completa."),
      error("Colacionar sin la pista", "**Colacionar sin la pista**, sobre todo con pistas paralelas o en uso cruzado."),
      error("Tomar una autorización de aterrizaje de otro distintivo", "**Tomar una autorización de aterrizaje de otro distintivo** en una frecuencia de torre cargada."),
      error("Cambiar a Tierra con el avión todavía en la pista", "**Cambiar a Tierra con el avión todavía en la pista.**"),
      error("Aterrizar sin autorización", "**Aterrizar sin autorización** por pérdida de comunicaciones sin haberlo notado. Si la radio está en silencio en la final, algo pasa."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "`CONTINUE APPROACH` no autoriza a aterrizar.",
          "`CLEARED TO LAND` se colaciona con la pista.",
          "Sin autorización al punto que fija el SOP: preguntar; si no llega, motor y al aire.",
          "En Torre hasta dejar la pista; luego Tierra.",
          "`ROGER` para información; colación para autorizaciones.",
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
            text: "Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1 b) y c). Doc 9432 (4.ª ed.) 2.6 («CONFIRM», «NEGATIVE», «ROGER»); 4.1.2; 4.6.4 («REPORT FINAL», «CONTINUE APPROACH WIND …»); 4.6.5 («ORBIT RIGHT DUE TRAFFIC ON THE RUNWAY. REPORT AGAIN ON FINAL»); 4.7.1 («LONG FINAL», «CONTINUE APPROACH WIND 260 DEGREES 18 KNOTS», «RUNWAY 27 CLEARED TO LAND WIND 270 DEGREES 20 KNOTS» y su colación); 4.8.1 («GO AROUND AIRCRAFT ON THE RUNWAY»); 4.9 («TAKE FIRST RIGHT WHEN VACATED CONTACT GROUND», «RUNWAY VACATED», «TAXI TO STAND 27 VIA TAXIWAY ALPHA»); 4.10 («LARGE FLOCK OF BIRDS NORTH OF RUNWAY 27»).",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: fraseología adicional de la final (autorización tardía, aterrizaje después de otro tráfico) contra Doc 4444 16.ª ed. cap. 12 y la AIP del Estado (no cargados). No se usa en los ejemplos.",
              "VERIFICAR: punto en el que el operador o el Estado exige tener la autorización de aterrizaje, contra el SOP del operador y la norma nacional (en Colombia, RAC y AIP Colombia).",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
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
