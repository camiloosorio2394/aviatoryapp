/**
 * Nivel 7 · Situaciones no normales y factores humanos (lecciones 51 a 61, capítulos 51 a 61 de la especificación).
 *
 * Cuando la frase estándar no alcanza y cuando el que falla es el oído: plain
 * English para lo no normal, pedir aclaración, sesgo de expectativa,
 * distintivos parecidos y cómo se reparte la radio en la cabina.
 *
 * Fuente: docs/comunicaciones/nivel-7.md, entero. Cada intercambio del
 * Markdown es un bloque `code` con su significado debajo (`ejemplo`); los
 * rótulos STANDARD PHRASEOLOGY, PLAIN ENGLISH y (VERIFICAR) de cada ejemplo se
 * conservan en su título o en su significado. Lo que el Markdown marca
 * VERIFICAR sale en un callout «Verificar» visible al empezar la fraseología y,
 * completo, en el detalle técnico de FUENTES. Los «Escenario de práctica» de
 * los capítulos 56, 58 y 59 van como `escenario`. Los dos casos reales que el
 * Markdown propone para discutir (Avianca 052 y Tenerife) no van como
 * `casoReal`: sus informes no están cargados, así que van como texto con su
 * callout «Verificar» al lado. El formato de los bloques y de los huecos está
 * documentado al inicio de index.ts.
 */

import type { DocBlockData, DocScreen } from "@/lib/docBlocks"

/**
 * Un intercambio: el título en negrita, la transmisión literal (una línea por
 * turno de palabra) y el significado en español. Sin significado cuando el
 * Markdown no lo trae (una colación que sigue a la anterior).
 */
function ejemplo(titulo: string, turnos: string[], significado?: string): DocBlockData[] {
  const out: DocBlockData[] = [
    { kind: "p", text: `**${titulo}**` },
    { kind: "code", text: turnos.join("\n") },
  ]
  if (significado) out.push({ kind: "p", text: significado })
  return out
}

/** Un error frecuente: el nombre del error como título y la explicación. */
function error(titulo: string, text: string): DocBlockData {
  return { kind: "callout", tone: "warn", title: titulo, text }
}

/** El aviso visible de lo que no está verificado en la lección. */
function verificar(text: string): DocBlockData {
  return { kind: "callout", tone: "verificar", title: "Verificar", text }
}

/** Cómo leer los ejemplos: va al empezar la fraseología de cada lección. */
const COMO_LEER: DocBlockData = {
  kind: "callout",
  tone: "info",
  title: "Cómo leer los ejemplos",
  text: "`AVIATORY 452` es un distintivo **ficticio**; AVIATORY 425 y AVIATORY 542 se usan como distintivos parecidos. «Bogota Control», «Bogota Approach», «Bogota Tower» y «Bogota Ground» son estaciones de ejemplo educativo, no transcripciones reales; GIKOS y LUDEM son puntos ficticios. **STANDARD PHRASEOLOGY**: frases que salen de la fraseología OACI; si no está en las fuentes cargadas, va con **(VERIFICAR)**. **PLAIN ENGLISH**: lenguaje común en inglés (plain language); no hay frase normalizada para eso y se construye con las reglas del capítulo 52.",
}

/** Las convenciones de los ejemplos de todo el nivel (cabecera de nivel-7.md). */
const CONVENCIONES: DocBlockData = {
  kind: "list",
  items: [
    "`AVIATORY 452` es un distintivo ficticio. `AVIATORY 425` y `AVIATORY 542` se usan como distintivos parecidos.",
    "«Bogota Control», «Bogota Approach», «Bogota Tower» y «Bogota Ground» son estaciones de ejemplo educativo, no transcripciones reales. `GIKOS` y `LUDEM` son puntos ficticios.",
    "**STANDARD PHRASEOLOGY** marca frases que salen de la fraseología OACI. Si la frase no está en las fuentes cargadas, aparece en la línea VERIFICAR del capítulo.",
    "**PLAIN ENGLISH** marca lenguaje común en inglés (plain language): no hay frase normalizada para eso y se construye con las reglas del capítulo 52.",
    "Fuentes cargadas: Doc 9432 (4.ª ed., 2007), Doc 4444 (15.ª ed. con Enm. 4, 2012; no es la edición vigente), Doc 9835 (2.ª ed., 2010). No están cargados el Anexo 10 Vol. II, el Doc 4444 cap. 12 y 15 ni el Doc 9432 cap. 9.",
  ],
}

/** El bloque FUENTES de cada capítulo, plegado. */
function fuentes(cita: string, verificado: string, porVerificar: string[]): DocBlockData {
  return {
    kind: "detalleTecnico",
    etiqueta: "Fuentes",
    cita,
    bloques: [
      { kind: "sub", text: "Verificado" },
      { kind: "p", text: verificado },
      { kind: "sub", text: "Por verificar" },
      { kind: "list", items: porVerificar },
      { kind: "sub", text: "Convenciones de los ejemplos" },
      CONVENCIONES,
    ],
  }
}

export const NIVEL_7: DocScreen[] = [
  // ── 51 ──────────────────────────────────────────────────────────────────
  {
    n: 51,
    title: "Comunicaciones en situaciones anormales",
    kicker: "Del hecho operacional a una petición que ATC pueda atender",
    minutes: 18,
    blocks: [
      {
        kind: "p",
        text: "En una situación no normal, la radio no es un informe de mantenimiento. El controlador necesita entender **qué sucede, qué puede hacer el avión, qué ayuda necesita la tripulación y cuál es su intención**. La tripulación mantiene el control de la trayectoria, usa la fraseología estandarizada cuando existe y recurre al inglés claro cuando la situación no cabe en una fórmula. La prioridad de la llamada depende de si hay socorro, urgencia u otra condición anormal; una condición que amenaza la seguridad no debe esconderse detrás de palabras vagas.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-51-01.webp",
        alt: "Historieta de tres escenas: tripulación estabiliza el vuelo, comunica el problema a ATC y el controlador coordina asistencia mientras la cabina continúa la lista.",
        ancho: 1600,
        alto: 900,
        pie: "Secuencia didáctica, no transcripción real: 1) PF conserva el control y PM identifica la necesidad inmediata; 2) PM comunica naturaleza, capacidad, necesidad e intención; 3) ATC coordina asistencia y la cabina continúa sus tareas. Ningún panel ni posición dibujados representan un vuelo específico.",
      },
      { kind: "sub", text: "No hay una frase prefabricada para toda falla" },
      {
        kind: "p",
        text: "El Manual de requisitos de competencia lingüística de OACI (Doc 9835) explica que la fraseología cubre gran parte de la rutina, pero ante problemas técnicos, pasajeros enfermos u otros sucesos inesperados pilotos y controladores deben usar lenguaje común. Ese inglés no es improvisación descuidada: debe ser inteligible, directo, pertinente, no ambiguo y conciso. Si ATC emite un nivel, rumbo, velocidad o autorización, **esa parte vuelve a la fraseología y a su colación**. Decir «we have a problem» sin explicar limitaciones ni petición deja al controlador sin una acción concreta.",
      },
      {
        kind: "table",
        head: ["Pregunta para la cabina", "Información útil para ATC", "Evitar"],
        rows: [
          ["¿Qué ocurre?", "Naturaleza observable: pérdida de empuje, humo, enfermedad, falla de sistema u otra condición.", "Diagnóstico técnico no confirmado o siglas internas del fabricante."],
          ["¿Qué puede hacer el avión?", "Capacidad real: mantener nivel, virar, aceptar una aproximación o necesitar tiempo.", "Prometer una maniobra que aún no se ha evaluado."],
          ["¿Qué se necesita?", "Prioridad, vectores, demora, descenso, pista, asistencia o espacio para la lista.", "Pedir ayuda sin decir cuál ni cuándo."],
          ["¿Qué se hará?", "Intención actual y cualquier cambio de intención tan pronto se conozca.", "Dejar que ATC suponga que la intención sigue igual."],
        ],
      },
      { kind: "sub", text: "Prioridad y primera llamada" },
      {
        kind: "p",
        text: "La guía FAA AIM §6-3-1 distingue socorro y urgencia y recomienda iniciar las llamadas correspondientes con MAYDAY o PAN PAN, preferiblemente repetidos tres veces. También explica que el piloto puede obtener ayuda al contactar la dependencia competente y comunicar la naturaleza de la dificultad, las intenciones y la asistencia deseada. La prioridad no se determina por una etiqueta de falla aislada: depende de su efecto actual o inminente sobre la seguridad. Se transmite por la frecuencia en uso si funciona; otros canales se emplean según el procedimiento aplicable cuando hace falta.",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Controlar y repartir tareas.** El piloto que vuela (PF, Pilot Flying) mantiene una trayectoria segura. El piloto que monitorea (PM, Pilot Monitoring) recopila la información necesaria y comunica; la distribución puede cambiar por la situación y el procedimiento del operador.",
          "**Declarar la prioridad adecuada.** Si existe socorro o urgencia, usar la señal correspondiente de manera temprana. Una falla contenida que no amenaza la seguridad puede requerir coordinación sin prefijo, pero debe describirse con precisión.",
          "**Transmitir primero lo que permite actuar.** Naturaleza, capacidad, necesidad e intención. La posición y otros datos que ATC desconozca se añaden según el contexto; no se recita una lista interminable mientras el avión requiere atención.",
          "**Escuchar la respuesta.** ATC puede ofrecer vectores, demora, prioridad o asistencia. La cabina confirma qué puede aceptar y colaciona cualquier autorización crítica. «Stand by» debe acompañarse de una nueva comunicación cuando haya información útil.",
          "**Actualizar.** Si la lista revela otra limitación, cambia la intención o el tiempo necesario, informar de nuevo. Una primera estimación no es un compromiso inmutable.",
        ],
      },
      { kind: "sub", text: "Caso real documentado: US Airways 1549" },
      {
        kind: "p",
        text: "El 15 de enero de 2009, el vuelo **US Airways 1549**, de LaGuardia a Charlotte, perdió casi todo el empuje en ambos motores después de impactar aves y terminó acuatizando en el río Hudson. El informe NTSB/AAR-10/03 y las entrevistas del expediente describen cómo la tripulación comunicó la emergencia, explicó la pérdida de empuje y cambió su evaluación sobre la posibilidad de regresar a LaGuardia. La enseñanza no es memorizar una frase célebre: **ATC solo puede coordinar alternativas compatibles con la capacidad que la tripulación va comunicando**. Esta lección resume el caso; la historieta anterior no reproduce ese vuelo ni es una transcripción de sus mensajes.",
      },
      {
        kind: "escenario",
        titulo: "Una intención cambia después de revisar la capacidad",
        situacion: "Ejercicio didáctico inspirado en el principio operacional documentado por NTSB en US Airways 1549, no en su diálogo literal. Una tripulación comunica una condición seria y inicialmente considera regresar al aeropuerto de salida. Al evaluar la performance y la lista, concluye que esa alternativa ya no es viable. ATC aún ofrece vectores de regreso.",
        preguntas: [
          { q: "¿Se acepta la ruta sugerida para no interrumpir al controlador?", a: "No. La tripulación informa de inmediato que esa alternativa no es viable y comunica una intención actualizada, incluso si requiere asistencia distinta. El controlador necesita la capacidad real, no una aceptación por cortesía." },
          { q: "¿Qué detalle técnico debe preceder a la petición de ayuda?", a: "Ninguno que retrase lo esencial. Se describe la naturaleza y consecuencia operacional, se comunica lo que el avión puede o no puede hacer y se pide la ayuda concreta; el diagnóstico detallado puede esperar." },
          { q: "Si ATC asigna un rumbo o nivel mientras se gestiona la falla, ¿qué ocurre con la colación?", a: "Se colacionan los elementos críticos que realmente pueden aceptarse. Si no se puede cumplir, se dice de inmediato y se solicita una alternativa; la prioridad no convierte una instrucción ambigua en segura." },
        ],
        concepto: "La comunicación eficaz actualiza la intención cuando cambia la capacidad del avión.",
      },
      {
        kind: "enLaOperacion",
        momento: "Después de la primera comunicación",
        texto: "PM mantiene un registro breve de lo transmitido, de la ayuda solicitada y de la respuesta de ATC. PF verifica que una autorización recibida sea compatible con la trayectoria y las limitaciones actuales. Si la cabina necesita tiempo para una lista, lo pide explícitamente; si la situación se agrava, revisa la prioridad de la llamada. Evitar términos vagos como «un pequeño problema» cuando el efecto real es pérdida de capacidad, y evitar asimismo detalles de ingeniería que ATC no puede usar.",
        pasos: [
          "Nombrar la condición y su consecuencia operacional, no una hipótesis no confirmada.",
          "Pedir una acción que ATC pueda proporcionar y señalar el tiempo necesario.",
          "Actualizar limitaciones e intención; colacionar solo autorizaciones entendidas y aceptables.",
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "No confundir una reconstrucción didáctica con una transmisión real",
        text: "El caso US Airways 1549 está identificado y documentado por NTSB. Las preguntas de esta página son escenarios de entrenamiento, no mensajes reales de ese vuelo ni fraseología colombiana publicada.",
      },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Primero se conserva una trayectoria segura y se reparte la carga de trabajo.",
          "ATC necesita naturaleza, capacidad, ayuda requerida e intención actual.",
          "MAYDAY o PAN PAN dan prioridad cuando corresponde; la falla por sí sola no decide la categoría.",
          "El inglés claro completa la fraseología, no sustituye la colación de autorizaciones.",
          "Cuando cambia la capacidad del avión, se actualiza la intención comunicada.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "FAA AIM §6-3-1 · OACI Doc 9835 · NTSB/AAR-10/03",
        bloques: [
          { kind: "p", text: "FAA, Aeronautical Information Manual §6-3-1, comunicaciones de socorro y urgencia, contenido y prioridad de la llamada: https://www.faa.gov/air_traffic/publications/aim_html/chap6_section_3.html" },
          { kind: "p", text: "OACI, Doc 9835, 2.ª edición, §§3.3.13–3.3.17: uso de lenguaje común cuando la fraseología no cubre lo inesperado y sus exigencias de claridad. Documento oficial de OACI, no una fraseología local: https://www4.icao.int/aelts/uploads/icao%20doc9835%202nd%20edition.pdf" },
          { kind: "p", text: "NTSB, informe de accidente AAR-10/03, US Airways vuelo 1549, hecho y secuencia operacional; entrevistas del expediente para la comunicación inicial y la revisión de la alternativa: https://www.ntsb.gov/investigations/accidentreports/reports/aar1003.pdf" },
          { kind: "p", text: "Para fraseología, dependencias y procedimientos colombianos vigentes, consultar la AIP/eAIP oficial de Aerocivil; aquí no se asigna ninguna frecuencia ni se representa una carta: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "Fotografía, historieta y ejercicio son recreaciones didácticas. No contienen audio ni transcripciones ATC reales." },
        ],
      },
    ],
  },
  // ── 52 ──────────────────────────────────────────────────────────────────
  {
    n: 52,
    title: "Inglés para lo no normal",
    kicker: "Inglés claro bajo carga de trabajo, sin perder precisión operacional",
    minutes: 17,
    blocks: [
      {
        kind: "p",
        text: "Para un piloto aspirante a aerolínea, hablar de una condición no normal en inglés no es recitar términos de sistemas. Es **transformar una evaluación de cabina en información que el control de tránsito aéreo (ATC, Air Traffic Control) pueda usar sin adivinar**. La fraseología normalizada sigue siendo obligatoria para sus elementos propios; el lenguaje común cubre el hecho inesperado, las limitaciones y la ayuda requerida. Hablar despacio, en unidades cortas y con valores confirmados disminuye las ambigüedades más que una frase larga y elegante.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-52-01.svg",
        alt: "Cuatro tarjetas con preguntas en inglés: problema, capacidad, necesidades e intenciones para estructurar una llamada no normal.",
        ancho: 1600,
        alto: 900,
        pie: "Plantilla de estudio, no orden obligatorio ni texto prescrito por OACI: describir el problema observable, la capacidad real, la ayuda concreta y la intención actual. La prioridad de socorro o urgencia se declara al inicio cuando corresponde; niveles, rumbos y autorizaciones se expresan y colacionan con fraseología estándar.",
      },
      { kind: "sub", text: "La fraseología tiene límites; el inglés claro también tiene reglas" },
      {
        kind: "p",
        text: "El Doc 9835 de la Organización de Aviación Civil Internacional (OACI; International Civil Aviation Organization, ICAO) señala que los problemas técnicos, médicos o de seguridad pueden exigir lenguaje común porque no existe una fórmula para cada hecho. Exige **inteligibilidad, franqueza, pertinencia, ausencia de ambigüedad y concisión**. Bajo presión aparecen frases largas, indirectas y mezcladas con hipótesis; por eso la tripulación prepara mentalmente una secuencia corta antes de transmitir. No se debe convertir una sospecha («quizá el tren no bajó») en certeza ni una incapacidad («no podemos mantener este nivel») en simple preferencia por descender.",
      },
      {
        kind: "table",
        head: ["Idea didáctica", "Comunicación directa", "Lo que ATC necesita evitar"],
        rows: [
          ["Efecto observable", "La indicación y el comportamiento que la tripulación ha confirmado.", "Un nombre de componente que no explica la consecuencia para el vuelo."],
          ["Capacidad", "Puede o no puede mantener nivel, rumbo, velocidad, espera o aproximación.", "Aceptar una maniobra que el avión ya no puede ejecutar."],
          ["Petición", "Vectores, prioridad, demora, cambio de nivel o apoyo específico.", "Preguntar varias veces qué ayuda solicita la tripulación."],
          ["Intención", "Plan actual y aviso de que puede revisarse tras la lista.", "Tratar una intención preliminar como decisión definitiva."],
        ],
      },
      {
        kind: "p",
        text: "La secuencia de cuatro preguntas es una **herramienta del curso**, no fraseología publicada. Cuando haya socorro o urgencia, la señal MAYDAY o PAN PAN y la naturaleza de la condición no esperan a que se complete una plantilla. La FAA AIM §6-3-1 indica que la dificultad, la intención y la asistencia deseada permiten a la dependencia empezar a ayudar; la información adicional se aporta conforme se conoce y sin desplazar el control del avión.",
      },
      { kind: "sub", text: "Pedir tiempo y explicar límites" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Preparar un mensaje verificable.** PM resume el hecho confirmado y una petición concreta; PF valida que lo ofrecido a ATC es compatible con la capacidad del avión. Si la evaluación sigue en curso, se dice.",
          "**Usar palabras sencillas para el efecto.** Se prefiere una descripción observable en vez de forzar un término técnico incorrecto. Una indicación de motor, una vibración o la incapacidad de sostener el nivel son más útiles que nombrar sin certeza la pieza fallada.",
          "**Pedir tiempo sin desaparecer.** Si la tripulación necesita completar una lista, solicita el tiempo o espacio operacional necesario e indica cuándo volverá a informar. Silencio prolongado sin coordinación puede privar a ATC de datos críticos.",
          "**Separar petición de autorización.** Solicitar un descenso, espera o vector no habilita a ejecutarlo salvo autorización o aplicación de una contingencia de seguridad publicada. La colación de una instrucción recibida permanece precisa incluso dentro de un intercambio en inglés claro.",
          "**Actualizar la intención.** Una vez concluida la lista, comunicar cambios de capacidad y decidir si se mantiene la petición, se solicita otro destino o se declara una prioridad mayor.",
        ],
      },
      { kind: "sub", text: "Caso real documentado: Avianca 052" },
      {
        kind: "p",
        text: "El 25 de enero de 1990, el vuelo **Avianca 052**, desde Bogotá hacia Nueva York con escala en Medellín, agotó combustible después de esperas y un intento de aproximación; 73 personas fallecieron. El informe NTSB/AAR-91/04 atribuyó el accidente a varios factores, entre ellos la gestión de combustible y **no comunicar oportunamente a ATC una emergencia de combustible**; también señaló deficiencias de gestión de flujo y la falta de terminología estandarizada y comprensible entonces. La lección de comunicación no borra las demás causas: si la situación requiere trato de emergencia, expresarla con prioridad inequívoca y comprobar que cabina y ATC entienden lo mismo. No se reproducen aquí frases de la grabación.",
      },
      {
        kind: "escenario",
        titulo: "De una petición indirecta a una necesidad clara",
        situacion: "Ejercicio didáctico, no transmisión de Avianca 052. Una tripulación enfrenta una limitación confirmada y necesita descender; aún no dispone de un nivel alterno seguro confirmado. El piloto que monitorea tiende a decir que «preferiría ir un poco más bajo». El piloto que vuela advierte que no pueden mantener el nivel asignado.",
        preguntas: [
          { q: "¿Qué información falta en «preferiríamos bajar un poco»?", a: "Falta la incapacidad real de mantener el nivel, el motivo operacional confirmado, la urgencia y una petición que ATC pueda tramitar. Se comunica la limitación de forma directa y se solicita asistencia o un nivel concreto cuando la cabina pueda validarlo." },
          { q: "¿Debe inventarse un nivel alterno para sonar preciso?", a: "No. La precisión no es inventar un valor. La tripulación comunica la limitación y pide el tiempo o la asistencia necesaria mientras determina qué nivel puede aceptar." },
          { q: "Si ATC ofrece un rumbo y un nivel durante el intercambio, ¿cómo se responde?", a: "Se confirma si pueden cumplirse y se colacionan los elementos críticos mediante fraseología. Si alguno es incompatible con la condición, se dice «unable» y se solicita una alternativa." },
        ],
        concepto: "Ser claro es declarar la limitación verdadera y la ayuda necesaria, no adornar ni completar con datos no confirmados.",
      },
      {
        kind: "enLaOperacion",
        momento: "Simulador y entrevista de aerolínea",
        texto: "El instructor puede introducir un hecho no previsto, una pregunta ATC difícil o una palabra técnica que el candidato no recuerda. La evaluación útil es si el piloto mantiene la trayectoria, formula un mensaje comprensible, reconoce lo que ignora, confirma instrucciones y actualiza la intención. El lenguaje común no debe sonar como una lista de vocabulario: debe permitir que otra persona tome una decisión operacional.",
        pasos: [
          "Ensayar mensajes breves con problema observable, capacidad, petición e intención.",
          "Explicar en inglés simple el efecto si falta un término técnico.",
          "Pedir repetición o aclaración cuando no se entiende; no responder por suposición.",
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Avianca 052 no se reduce a una sola palabra",
        text: "La investigación describió un accidente multifactorial. La enseñanza sobre claridad y prioridad se apoya en ese informe, pero no sustituye el análisis completo de combustible, coordinación de cabina y gestión del tránsito.",
      },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "La fraseología cubre sus elementos; el inglés claro explica lo inesperado.",
          "Mensaje breve: hecho observable, capacidad, petición e intención, según la prioridad real.",
          "No reemplazar una incapacidad por un deseo ni una sospecha por certeza.",
          "Una petición no es autorización; niveles y rumbos se colacionan con precisión.",
          "El caso Avianca 052 muestra por qué la prioridad debe llegar inequívocamente a ATC.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "OACI Doc 9835 · FAA AIM §6-3-1 · NTSB/AAR-91/04",
        bloques: [
          { kind: "p", text: "OACI, Doc 9835, 2.ª edición, §§3.3.13–3.3.17 y 5.3.3: inglés común en situaciones imprevistas, comunicación directa y carga cognitiva; la plantilla visual es didáctica, no un texto OACI: https://www4.icao.int/aelts/uploads/icao%20doc9835%202nd%20edition.pdf" },
          { kind: "p", text: "FAA, Aeronautical Information Manual §6-3-1: prioridad, naturaleza de la dificultad, intenciones y asistencia requerida: https://www.faa.gov/air_traffic/publications/aim_html/chap6_section_3.html" },
          { kind: "p", text: "NTSB, investigación DCA90MA019 y reporte AAR-91/04 sobre Avianca 052: hechos, causas múltiples y comunicación de la emergencia de combustible: https://www.ntsb.gov/investigations/Pages/DCA90MA019.aspx" },
          { kind: "p", text: "Para fraseología y procedimientos colombianos vigentes, consultar la AIP/eAIP de Aerocivil; esta lección no asigna frecuencias, niveles ni rutas operativas: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "La portada, el esquema y el escenario son material de formación, no representaciones de Avianca 052 ni transcripciones ATC." },
        ],
      },
    ],
  },
  // ── 53 ──────────────────────────────────────────────────────────────────
  {
    n: 53,
    title: "Cómo pedir aclaración",
    kicker: "Repetir lo incierto antes de convertirlo en una acción",
    minutes: 16,
    blocks: [
      {
        kind: "p",
        text: "En una cabina de aerolínea, una palabra incompleta puede cambiar un nivel, un rumbo o una autorización de pista. Pedir aclaración es **detener la cadena entre una recepción dudosa y una acción irreversible**. El piloto que monitorea identifica exactamente qué falta y no programa ni ejecuta el elemento incierto hasta que la instrucción quede clara y colacionada.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-53-01.webp",
        alt: "Tres escenas: una tripulación detecta un dato incompleto, la piloto solicita repetición y el controlador responde mientras se registra la instrucción.",
        ancho: 1600,
        alto: 900,
        pie: "Escena didáctica, no una transmisión real: detectar el dato ausente, pedir a ATC que repita la parte concreta, escuchar, anotar y colacionar antes de actuar. Una expectativa de cabina nunca sustituye una autorización.",
      },
      { kind: "sub", text: "Cuatro respuestas que no significan lo mismo" },
      {
        kind: "table",
        head: ["Expresión", "Sentido publicado por FAA", "Uso operacional"],
        rows: [
          ["SAY AGAIN", "Solicita repetir toda la transmisión o una parte.", "No se recibió con certeza un elemento; nombrar el elemento faltante."],
          ["UNABLE", "Indica incapacidad de cumplir una instrucción o solicitud.", "No puede ejecutarla; explicar el motivo útil y buscar alternativa."],
          ["STAND BY", "Pide esperar y volver a comunicarse.", "Hace falta consultar o calcular; no es aceptación ni rechazo."],
          ["ROGER", "Acusa recibo de la transmisión.", "No responde por sí solo sí/no ni reemplaza la colación."],
        ],
      },
      {
        kind: "p",
        text: "El glosario Pilot/Controller de la Administración Federal de Aviación de Estados Unidos (FAA; Federal Aviation Administration) define estos términos. CONFIRM puede servir para pedir verificación de un dato que se cree haber escuchado, pero aquí no se presenta como sustituto universal de SAY AGAIN ni como autorización. Lo decisivo es **decir cuál dato se cuestiona** y esperar una respuesta inequívoca. No se enseña VERIFY como palabra de aplicación libre: su sentido depende del contexto y del procedimiento publicado.",
      },
      { kind: "sub", text: "Secuencia de cabina: detectar, preguntar, cerrar" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Detectar la incertidumbre.** El piloto que monitorea marca el nivel, rumbo, velocidad, pista o límite no recibido. Si ambos pilotos discrepan, se pregunta; ninguna versión se asume por mayoría.",
          "**Conservar la trayectoria autorizada.** Mientras se espera repetición, se mantiene la última autorización válida, atendiendo las exigencias de seguridad aplicables. No se introduce un valor adivinado en el sistema de gestión de vuelo.",
          "**Pedir la parte dudosa.** Se solicita repetir el nivel, la pista o la parte posterior a un elemento bien recibido. Un SAY AGAIN general es útil si todo el mensaje se perdió; una petición concreta ahorra tiempo si lo demás está claro.",
          "**Escuchar la respuesta completa.** Se anota el dato repetido y se compara con la situación y las limitaciones del avión. Si persiste la duda, se pregunta otra vez; el silencio no es acuerdo.",
          "**Colacionar y verificar el cierre.** La FAA AIM §4-4-7 pide colacionar números asignados, rumbos e instrucciones de pista, entre otros elementos críticos, con el indicativo. Si ATC corrige la colación, se confirma antes de ejecutar.",
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Pedir repetición no autoriza a moverse",
        text: "En una pista, calle de rodaje o cerca de un límite de autorización, se detiene la acción dudosa. Ni ROGER ni STAND BY ni una expectativa basada en operaciones previas equivalen a autorización.",
      },
      { kind: "sub", text: "Recepción e imposibilidad son problemas diferentes" },
      {
        kind: "p",
        text: "Si la instrucción se oyó mal, corresponde pedir repetición o confirmar el elemento, no colacionar la interpretación más probable. Si se oyó bien pero no puede cumplirse —por desempeño, configuración, combustible o una limitación— corresponde UNABLE y una alternativa. Si todavía no se sabe si puede aceptarse, STAND BY comunica la pausa y exige volver con una respuesta. Esta distinción evita que ATC trate como comprendida una instrucción apenas recibida o como aceptada una instrucción inviable.",
      },
      {
        kind: "escenario",
        titulo: "Ejercicio didáctico: el último dígito no llegó",
        situacion: "No es una grabación real ni una autorización utilizable. Durante una llegada, ATC transmite varios elementos. La tripulación identifica el indicativo y un rumbo, pero el último dígito del nivel queda cubierto por otra transmisión. El piloto que vuela desea iniciar el descenso mientras el piloto que monitorea solo anotó una parte del número.",
        preguntas: [
          { q: "¿Qué debe hacer quien monitorea?", a: "Avisar que el nivel no está confirmado y pedir a ATC que repita precisamente ese nivel. No completar el dígito por altitud esperada, carta o costumbre." },
          { q: "¿Puede iniciarse el descenso por inferencia?", a: "No. Se mantiene la condición autorizada mientras se resuelve el dato incierto. Cada elemento aplicable debe estar claro." },
          { q: "¿Y si el nivel repetido queda fuera de la capacidad del avión?", a: "La recepción ya está resuelta; ahora se comunica UNABLE con el motivo operacional y se solicita una alternativa. No usar SAY AGAIN para encubrir incapacidad." },
        ],
        concepto: "Una aclaración útil identifica el dato, obtiene respuesta y cierra el circuito con una colación correcta.",
      },
      { kind: "sub", text: "Competencia lingüística bajo carga de trabajo" },
      {
        kind: "p",
        text: "El Doc 9835 de la Organización de Aviación Civil Internacional (OACI; International Civil Aviation Organization, ICAO) trata la verificación, confirmación y aclaración de malentendidos como parte de una interacción eficaz. La habilidad no consiste en sonar fluido mientras se adivina: consiste en reconocer una laguna, formular una pregunta comprensible y recuperar una comprensión compartida. Un simulador puede introducir una transmisión parcial para evaluar el proceso completo, no solo la pronunciación de SAY AGAIN.",
      },
      {
        kind: "enLaOperacion",
        momento: "Preparación y simulador de aerolínea",
        texto: "Antes de una fase de alta carga, la tripulación acuerda qué datos requieren verificación cruzada: pista, límite, nivel, rumbo y restricciones. Durante la operación, quien monitorea anota lo recibido y anuncia discrepancias sin mantener una conversación interna prolongada con el micrófono abierto.",
        pasos: [
          "Identificar la pieza incierta sin inventar el resto.",
          "Pedir repetición y escuchar la respuesta hasta el final.",
          "Colacionar, resolver correcciones y solo entonces actualizar la acción.",
        ],
      },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "SAY AGAIN resuelve recepción incompleta; UNABLE declara que no se puede cumplir.",
          "STAND BY da tiempo, pero no concede ni rechaza; hay que volver a responder.",
          "ROGER acusa recibo, no reemplaza una respuesta sí/no ni una colación crítica.",
          "La secuencia segura es detectar, preguntar, escuchar, colacionar y actuar.",
          "Pedir aclaración a tiempo es una habilidad operacional.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "FAA Pilot/Controller Glossary · FAA AIM §4-4-7 · OACI Doc 9835",
        bloques: [
          { kind: "p", text: "FAA, Pilot/Controller Glossary: SAY AGAIN y STAND BY: https://www.faa.gov/air_traffic/publications/atpubs/pcg_html/glossary-s.html" },
          { kind: "p", text: "FAA, Pilot/Controller Glossary: UNABLE: https://www.faa.gov/air_traffic/publications/atpubs/pcg_html/glossary-u.html ; ROGER: https://www.faa.gov/air_traffic/publications/atpubs/pcg_html/glossary-r.html" },
          { kind: "p", text: "FAA, Aeronautical Information Manual §4-4-7: colación de números, rumbos e instrucciones de pista: https://www.faa.gov/air_traffic/publications/aim_html/chap4_section_4.html" },
          { kind: "p", text: "OACI, Doc 9835, 2.ª edición, descriptores de interacción y estrategias de aclaración: https://www4.icao.int/aelts/uploads/icao%20doc9835%202nd%20edition.pdf" },
          { kind: "p", text: "Para fraseología y procedimientos colombianos vigentes, consultar la AIP/eAIP de Aerocivil. El escenario y las imágenes son didácticos: no asignan ruta, pista, frecuencia ni nivel reales, y no son transcripciones ATC: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
        ],
      },
    ],
  },
  // ── 54 ──────────────────────────────────────────────────────────────────
  {
    n: 54,
    title: "Acentos y escucha",
    kicker: "Inteligibilidad, recepción parcial y trabajo de cabina",
    minutes: 17,
    blocks: [
      {
        kind: "p",
        text: "Una frecuencia internacional reúne voces con acentos, ritmos y condiciones de radio diferentes. La seguridad no depende de sonar como un hablante nativo, sino de **comprender los datos operacionales y resolver lo que no se comprendió**. En una cabina de dos pilotos, escuchar es una tarea compartida: uno vuela, el otro registra y colaciona, y ambos advierten si la instrucción recibida no concuerda.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-54-01.webp",
        alt: "Tres escenas visuales: una controladora transmite, una tripulación contrasta una nota incompleta y el piloto que monitorea solicita aclaración.",
        ancho: 1600,
        alto: 900,
        pie: "Situación didáctica, no transcripción: la controladora transmite; el piloto que monitorea detecta una pieza incierta y la contrasta con quien vuela; solo después solicita repetición específica. El acento no identifica un error: lo relevante es si el mensaje quedó inteligible y confirmado.",
      },
      { kind: "sub", text: "Qué se pierde realmente por radio" },
      {
        kind: "p",
        text: "El Doc 9835 de la Organización de Aviación Civil Internacional (OACI; International Civil Aviation Organization, ICAO) distingue acento de inteligibilidad: no establece un acento universalmente correcto y exige que la pronunciación sea comprensible para la comunidad aeronáutica. Una transmisión puede degradarse por ruido de cabina, estática, recorte al pulsar el micrófono, velocidad excesiva o solapamiento de voces. El oyente no debe atribuir automáticamente una dificultad al origen nacional del interlocutor; primero identifica **qué parte de la señal faltó**.",
      },
      {
        kind: "table",
        head: ["Amenaza", "Señal de alerta", "Respuesta útil"],
        rows: [
          ["Inicio recortado", "Se oyó el dato, no el indicativo ni el verbo.", "No asumir que la llamada era propia; pedir repetición."],
          ["Número incompleto", "Falta un dígito de nivel, rumbo, frecuencia o pista.", "Pedir ese elemento; no completarlo con el valor esperado."],
          ["Dos transmisiones a la vez", "Se oye una mezcla o un ruido sostenido.", "Esperar a que la frecuencia quede libre y solicitar repetición."],
          ["Ritmo o acento no familiar", "Se reconocen palabras sueltas, no la instrucción entera.", "Pedir que se repita o se aclare la parte concreta."],
          ["Distintivos parecidos", "La llamada podría ser para otro avión.", "Confirmar el destinatario antes de actuar."],
        ],
      },
      { kind: "sub", text: "Anticipar no es completar" },
      {
        kind: "p",
        text: "Conocer la fase de vuelo permite escuchar selectivamente: tras la salida son probables nivel, rumbo y frecuencia; durante el rodaje, pista y límites de cruce. Esa anticipación ayuda a distribuir atención, pero crea un riesgo: **oír lo que se esperaba en vez de lo transmitido**. La tripulación separa en su nota tres categorías: recibido con certeza, recibido parcialmente y no recibido. Solo la primera alimenta la colación. La segunda y la tercera generan una pregunta. Un número que coincide con el plan de vuelo o con la pantalla no queda confirmado por esa coincidencia.",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Preparar la escucha.** Antes de cambiar de dependencia, uno de los pilotos conserva el control del avión y el otro se prepara para copiar la nueva autorización; si hay carga alta, se pospone una tarea no crítica.",
          "**Reconocer el destinatario.** Se escucha el indicativo completo, especialmente si hay tráficos con distintivos semejantes. No se mueve un selector por captar solo los últimos dígitos.",
          "**Capturar verbo y restricciones.** CLIMB, DESCEND, TURN, CONTACT o CLEARED cambian el significado; una negación o una limitación también. Si el verbo falta, el número por sí solo no describe una acción.",
          "**Comparar en cabina.** Quien monitorea repite al piloto que vuela el elemento que va a colacionar. Una discrepancia activa la petición de aclaración, no una negociación interna mientras ATC espera.",
          "**Cerrar el circuito.** Se solicita repetición, se colaciona lo requerido y se escucha cualquier corrección de ATC antes de actualizar el modo o el plan de vuelo.",
        ],
      },
      {
        kind: "escenario",
        titulo: "Ejercicio didáctico: una frecuencia parcialmente recibida",
        situacion: "No representa una transmisión real. Durante una transferencia de control, la tripulación entiende el indicativo y la instrucción de contactar otra dependencia, pero pierde uno de los dígitos de la frecuencia. El valor que parece probable aparece en un equipo de a bordo, aunque no se oyó completo por radio.",
        preguntas: [
          { q: "¿Debe seleccionarse la frecuencia probable?", a: "No como sustituto de la instrucción recibida. Se pide que se repita la frecuencia y se comprueba la respuesta completa antes de abandonar la frecuencia actual." },
          { q: "¿Qué dato conviene solicitar?", a: "La frecuencia, no necesariamente toda la transmisión. La pregunta debe identificar la pieza ausente y el indicativo." },
          { q: "¿Qué hacer si la repetición sigue ininteligible?", a: "Indicar que aún no se recibe claramente, pedir una repetición más lenta o una alternativa de coordinación según la situación. No fingir comprensión por presión de tiempo." },
        ],
        concepto: "El contexto guía la atención, pero no certifica números no escuchados.",
      },
      { kind: "sub", text: "Hacerse inteligible también es responsabilidad propia" },
      {
        kind: "p",
        text: "El Doc 9835 recomienda estrategias comunicativas para detectar y resolver malentendidos, incluso reformular cuando repetir exactamente lo mismo no ayuda. Quien transmite usa una velocidad estable, articula números y deja pausas que permitan anotar; quien escucha pide una parte concreta y explica si la recepción es deficiente. La habilidad se practica con acentos diversos y ruido realista, sin convertir una variante lingüística en estereotipo. El objetivo del nivel operacional OACI es una interacción que se mantenga eficaz aun cuando el acento o un evento imprevisto exijan aclaración.",
      },
      {
        kind: "enLaOperacion",
        momento: "Simulador de selección de aerolínea",
        texto: "Un buen ejercicio mezcla instrucciones relevantes con tráfico para otros distintivos y una transmisión parcialmente cubierta. El candidato debe mantener trayectoria, identificar qué dato propio falta, solicitar aclaración y actualizar la cabina solo al recibir una respuesta completa.",
        pasos: [
          "Registrar lo que sí se escuchó; marcar explícitamente lo incierto.",
          "Solicitar repetición sin atribuir el problema al acento del controlador.",
          "Colacionar y comprobar la respuesta de ATC antes de ejecutar.",
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "La fluidez no se mide por adivinar",
        text: "Pedir una repetición clara puede ser más competente que responder de inmediato con una lectura convincente pero incorrecta. Si la carga de trabajo impide copiar, decirlo y coordinar otra oportunidad de transmisión es preferible a inventar una instrucción.",
      },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "El criterio es inteligibilidad, no imitar un acento determinado.",
          "Verbo, destinatario y números críticos deben recibirse completos.",
          "Anticipar ayuda a escuchar, pero no completa información perdida.",
          "Una discrepancia de cabina exige aclaración antes de actuar.",
          "Hablar de modo claro y adaptar la transmisión es responsabilidad compartida.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "OACI Doc 9835 · FAA AIM",
        bloques: [
          { kind: "p", text: "OACI, Doc 9835, 2.ª edición, §§3.3, 4.5–4.6 y 5.3: inteligibilidad del acento, condiciones de radiotelefonía, estrategias para detectar y resolver malentendidos: https://www4.icao.int/aelts/uploads/icao%20doc9835%202nd%20edition.pdf" },
          { kind: "p", text: "FAA, Aeronautical Information Manual, capítulo 4, sección 2, técnicas de radiocomunicación: escuchar antes de transmitir, claridad y brevedad: https://www.faa.gov/air_traffic/publications/aim_html/chap4_section_2.html" },
          { kind: "p", text: "Para idiomas y fraseología publicados para dependencias colombianas, consultar AIP/eAIP Aerocivil. No se asigna aquí frecuencia ni procedimiento local: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "La portada, la secuencia y el escenario son material didáctico, no representación de comunicaciones registradas." },
        ],
      },
    ],
  },
  // ── 55 ──────────────────────────────────────────────────────────────────
  {
    n: 55,
    title: "Sesgo de expectativa",
    kicker: "Escuchar la autorización real, aunque contradiga el plan",
    minutes: 17,
    blocks: [
      {
        kind: "p",
        text: "El sesgo de expectativa aparece cuando la tripulación interpreta una transmisión de control de tránsito aéreo (ATC; Air Traffic Control) a través de lo que esperaba recibir. La preparación es indispensable, pero **una pista, un nivel o un rumbo previsto no es una autorización**. Si se pidió un nivel y llega otro, la discrepancia merece más atención que una instrucción rutinaria: es precisamente donde una respuesta automática puede introducir el valor equivocado en la aeronave.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-55-01.svg",
        alt: "Esquema: nivel solicitado FL 370, nivel transmitido FL 350 y nivel FL 350 colacionado y confirmado antes de seleccionar.",
        ancho: 1600,
        alto: 900,
        pie: "Ejemplo numérico didáctico, no una autorización real. La tripulación solicitó un nivel; ATC transmitió otro. La barrera es separar lo esperado de lo oído, colacionar el dato recibido y verificar que el nivel seleccionado coincide con el autorizado.",
      },
      { kind: "sub", text: "Qué dicen los materiales de seguridad" },
      {
        kind: "p",
        text: "El Doc 9835 de la Organización de Aviación Civil Internacional (OACI; International Civil Aviation Organization, ICAO) advierte que las expectativas pueden alterar la interpretación de la realidad y que la comprensión debe sostenerse cuando la respuesta difiere de lo previsto. Un boletín de procedimientos de la Administración Federal de Aviación de Estados Unidos (FAA; Federal Aviation Administration), ATPB 2025-01, describe el sesgo de expectativa en controladores, pilotos y personal de superficie. Indica que puede contribuir a fallas de colación y escucha, y que el análisis de incursiones de pista lo identifica como factor importante en desviaciones de pilotos. No afirma que cada confusión de radio tenga una causa única.",
      },
      {
        kind: "table",
        head: ["Expectativa previa", "Dato que exige escucha activa", "Defensa"],
        rows: [
          ["Pista de uso habitual", "Una pista diferente o una instrucción de esperar.", "Comparar con la autorización, colacionar la pista y detenerse ante duda."],
          ["Nivel solicitado", "Nivel autorizado distinto.", "Registrar el recibido, colacionarlo y cotejar el selector."],
          ["Ruta preparada", "Un directo, vector o límite diferente.", "Verificar el texto recibido y el cambio en el plan antes de ejecutar."],
          ["Era nuestro turno", "Distintivo similar de otro avión.", "Escuchar el indicativo completo y no responder por secuencia."],
        ],
      },
      { kind: "sub", text: "Dónde se rompe el circuito" },
      {
        kind: "p",
        text: "El error puede aparecer en tres puntos. Primero, la escucha sustituye el dato transmitido por el que figuraba en el briefing. Segundo, la colación repite el dato esperado con voz segura; un controlador también puede pasar por alto esa diferencia. Tercero, aun con una colación correcta, se selecciona en la cabina el valor pedido o previsto. Por eso hacen falta **dos verificaciones independientes**: la transmisión con su colación y la comparación entre el valor autorizado y el valor cargado o seleccionado. El formato exacto de llamadas internas depende de los procedimientos de cada operador.",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Anunciar la expectativa como hipótesis.** En el briefing, decir qué pista o procedimiento se prevé y dejar explícito que se confirmará con ATC y la información vigente.",
          "**Marcar lo inesperado.** Cuando ATC da algo diferente, el piloto que monitorea lo señala en cabina sin reformularlo para que encaje con el plan.",
          "**Colacionar el dato recibido.** Incluir indicativo y elementos críticos que correspondan. Si no se oyó completo, pedir repetición antes de colacionar.",
          "**Esperar corrección o confirmación.** La ausencia de corrección no garantiza que ATC detectó un error; la responsabilidad de comprender y cumplir no se delega al controlador.",
          "**Cruzar con los controles.** El piloto que vuela verifica que pista, nivel, rumbo o límite seleccionado corresponda a lo autorizado antes de iniciar la maniobra.",
        ],
      },
      {
        kind: "escenario",
        titulo: "Ejercicio didáctico: autorizado distinto de lo solicitado",
        situacion: "No es una transmisión ni una ruta real. La tripulación ha solicitado un nivel superior por eficiencia. ATC autoriza uno intermedio. El piloto que monitorea colaciona bien el nivel intermedio, pero el piloto que vuela ya había preparado el selector con el nivel solicitado.",
        preguntas: [
          { q: "¿Basta la colación correcta?", a: "No. El valor seleccionado todavía puede ser el pedido y no el autorizado. Se compara el selector con la autorización antes de iniciar el ascenso." },
          { q: "¿Se debe pedir confirmación porque el nivel no era el esperado?", a: "Si se escuchó y colacionó con certeza, no siempre. Se pide aclaración si existe duda real sobre el nivel o su aplicabilidad; lo importante es no convertir la expectativa en dato." },
          { q: "¿Qué cambia si la discrepancia es una autorización de pista?", a: "El margen para inferir es aún menor. La tripulación confirma indicativo, pista y verbo de autorización; no entra ni despega basándose en que «era el turno»." },
        ],
        concepto: "La colación protege el mensaje; el cotejo de cabina protege la ejecución.",
      },
      {
        kind: "enLaOperacion",
        momento: "Operar en un aeropuerto conocido",
        texto: "La familiaridad acelera la preparación, pero también hace probable que una tripulación complete mentalmente una autorización parcial con el patrón de siempre. Un briefing útil reconoce la opción esperada y prepara una alternativa, sin tratar ninguna como vigente antes de la autorización.",
        pasos: [
          "Escuchar el indicativo completo y la instrucción real.",
          "Verbalizar las diferencias entre plan y autorización.",
          "Colacionar y verificar los controles antes de la acción.",
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "ATC también puede esperar una respuesta",
        text: "El boletín FAA recuerda que el sesgo puede afectar a ambos lados de la frecuencia. No se presupone que una colación errónea siempre será corregida; la tripulación mantiene su propio control cruzado.",
      },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Lo previsto en el briefing es hipótesis, no autorización.",
          "Una instrucción inesperada requiere escucha activa, no ajuste mental.",
          "La colación debe reflejar lo transmitido, y el selector lo autorizado.",
          "Un distintivo parecido o un turno esperado no identifican al destinatario.",
          "Las barreras se reparten entre radio, cabina y verificación de controles.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "OACI Doc 9835 · FAA ATPB 2025-01 · FAA AIM",
        bloques: [
          { kind: "p", text: "OACI, Doc 9835, 2.ª edición, §§4.5.3–4.6.6: expectativa, comprensión ante lo inesperado y estrategias de aclaración: https://www4.icao.int/aelts/uploads/icao%20doc9835%202nd%20edition.pdf" },
          { kind: "p", text: "FAA, Air Traffic Procedures Bulletin 2025-01, apartado Expectation Bias, sobre efectos en controladores, pilotos y superficie y defensas: https://www.faa.gov/air_traffic/publications/media/atpb_jan_2025.pdf" },
          { kind: "p", text: "FAA, Aeronautical Information Manual §4-4-7, colación de elementos críticos: https://www.faa.gov/air_traffic/publications/aim_html/chap4_section_4.html" },
          { kind: "p", text: "Para procedimientos y autorizaciones colombianas vigentes, consultar AIP/eAIP Aerocivil. La foto, el esquema y el escenario son didácticos, no transcripciones ni una carta de navegación: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
        ],
      },
    ],
  },
  // ── 56 ──────────────────────────────────────────────────────────────────
  {
    n: 56,
    title: "Distintivos parecidos",
    kicker: "La autorización puede ser correcta, pero dirigida a otro avión",
    minutes: 17,
    blocks: [
      {
        kind: "p",
        text: "Dos vuelos pueden compartir los mismos números o sonidos en una frecuencia, aunque tengan operadores distintos. Si una tripulación reconoce solo el final del indicativo y esperaba una autorización, puede colacionar una instrucción ajena. El riesgo no se limita a una colación equivocada: puede terminar en un cambio de nivel, rumbo o movimiento en superficie **sin autorización para ese avión**. La defensa inicial es escuchar el distintivo completo, no responder «por si acaso» y no actuar mientras el destinatario sea incierto.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-56-01.svg",
        alt: "Esquema de dos indicativos similares, United 31 y Alaska 31: el controlador identifica al destinatario y solo ese avión colaciona.",
        ancho: 1600,
        alto: 900,
        pie: "Los nombres proceden de un ejemplo publicado por FAA JO 7110.65 §2-4-15; no representan vuelos actuales ni una transcripción. El número 31 coincide, pero el prefijo distingue al destinatario. Si el indicativo llega incompleto, se solicita confirmación antes de cambiar trayectoria o configuración.",
      },
      { kind: "sub", text: "Un ejemplo oficial, no una conversación inventada" },
      {
        kind: "p",
        text: "La orden FAA JO 7110.65 §2-4-15 instruye a los controladores a enfatizar los elementos distintivos, **no abreviar identificaciones que suenen parecido** y avisar a los pilotos afectados. Su ejemplo usa United Thirty-one y Alaska Thirty-one en una misma frecuencia, con el nombre de la aerolínea repetido para dar claridad. Es un ejemplo normativo estadounidense, no evidencia de que esos dos vuelos operen hoy juntos. EUROCONTROL mantiene además un servicio de similitud de indicativos para ayudar a reducir conflictos desde la planificación, pero ese servicio no reemplaza la vigilancia de la tripulación en radio.",
      },
      {
        kind: "table",
        head: ["Señal", "Riesgo", "Defensa"],
        rows: [
          ["Solo se oyó el número", "La llamada puede ser para otra aerolínea.", "Esperar el indicativo completo o confirmar destinatario."],
          ["Mismo prefijo, dígitos reordenados", "La memoria completa el vuelo conocido.", "Registrar y colacionar el número exacto."],
          ["Dos pilotos colacionan una misma instrucción", "Una aceptación ajena puede pasar inadvertida.", "Detener ejecución y resolver explícitamente con ATC."],
          ["ATC modifica temporalmente un indicativo", "Usar el anterior en una llamada posterior.", "Anotar el nuevo indicativo y aplicarlo hasta que ATC indique lo contrario."],
        ],
      },
      { kind: "sub", text: "Disciplina de escucha y colación" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Detectar similitud temprano.** Si se oye un vuelo con sonido próximo al propio, ambos pilotos lo señalan en cabina y prestan atención al prefijo y a todos los dígitos, no solo al final.",
          "**Separar destinatario y contenido.** Una instrucción perfectamente clara para otro avión sigue siendo ajena. No se colaciona ni se selecciona aunque coincida con una petición propia.",
          "**Confirmar si falta el indicativo.** El piloto que monitorea pregunta a ATC si la instrucción era para su aeronave, identificándose con su indicativo completo. No construye una fraseología local supuesta ni añade un sufijo por iniciativa propia.",
          "**Colacionar con identificación propia.** La FAA JO 7110.65 exige que las colaciones de autorizaciones o instrucciones incluyan el distintivo o matrícula; ese cierre ayuda a detectar una respuesta del avión incorrecto.",
          "**Escuchar el hearback y actualizar cabina.** Si ATC corrige destinatario o instrucción, la tripulación conserva su última autorización válida y verifica que no haya seleccionado un cambio para el otro vuelo.",
        ],
      },
      {
        kind: "escenario",
        titulo: "Ejercicio didáctico: una llamada para el otro tráfico",
        situacion: "El escenario no es una transmisión real. Dos vuelos con el mismo número, pero prefijos distintos, comparten frecuencia. ATC dirige a uno una autorización de cambio de nivel. El otro oyó el número, pero no el prefijo, y ese cambio coincide con el que esperaba solicitar.",
        preguntas: [
          { q: "¿Puede el segundo vuelo colacionar el nivel porque parece adecuado?", a: "No. El contenido no determina el destinatario. Mantiene su autorización y pide a ATC confirmar a quién se dirigió la llamada." },
          { q: "¿Qué aportaría una colación que terminara con el indicativo completo?", a: "Da a ATC una oportunidad de identificar una respuesta de la aeronave incorrecta. No elimina la obligación de la tripulación de comprobar el destinatario antes de actuar." },
          { q: "¿Cómo cambia la conducta si ATC avisa que hay indicativos similares?", a: "Ambos pilotos redoblan escucha del prefijo y los dígitos completos. Se sigue la identificación que ATC haya instruido; no se inventan abreviaturas." },
        ],
        concepto: "Primero destinatario inequívoco, después contenido y colación, por último acción.",
      },
      {
        kind: "enLaOperacion",
        momento: "Frecuencia congestionada y selección de aerolínea",
        texto: "Una prueba útil combina dos distintivos próximos y una instrucción que el candidato espera recibir. La respuesta correcta no es repetir automáticamente el nivel: es reconocer que el destinatario no quedó claro, mantener el vuelo y cerrar la ambigüedad con ATC.",
        pasos: [
          "Escuchar y anotar prefijo más número completos.",
          "Identificar en cabina el otro distintivo parecido.",
          "Ante duda, confirmar antes de colacionar o ejecutar.",
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "No copiar una técnica FAA como regla local universal",
        text: "La repetición del prefijo y los avisos del §2-4-15 pertenecen a la orden estadounidense citada. Para una dependencia colombiana, la tripulación sigue la fraseología, instrucciones y AIP/eAIP vigentes de Aerocivil; esta lección no crea un procedimiento colombiano nuevo.",
      },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Un número compartido no identifica a la aeronave destinataria.",
          "Una instrucción clara para otro vuelo no autoriza al propio.",
          "Indicativo completo en escucha y colación; duda de destinatario se resuelve antes de actuar.",
          "ATC puede advertir similitud, pero la tripulación mantiene su propia barrera.",
          "Los ejemplos FAA y EUROCONTROL ilustran la amenaza; no son vuelos actuales ni fraseología colombiana.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "FAA JO 7110.65 §2-4-15 · EUROCONTROL CSS",
        bloques: [
          { kind: "p", text: "FAA, JO 7110.65, §§2-4-3 y 2-4-15: indicativo en colaciones, énfasis y avisos ante identificaciones similares; ejemplo United Thirty-one/Alaska Thirty-one: https://www.faa.gov/air_traffic/publications/atpubs/atc_html/chap2_section_4.html" },
          { kind: "p", text: "EUROCONTROL, Call Sign Similarity Service, análisis de conflictos desde la programación: https://www.eurocontrol.int/service/call-sign-similarity-service" },
          { kind: "p", text: "Para procedimientos colombianos vigentes, consultar AIP/eAIP Aerocivil. Foto, esquema y escenario son didácticos; no representan un incidente registrado ni asignan una frecuencia, pista o ruta: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
        ],
      },
    ],
  },
  // ── 57 ──────────────────────────────────────────────────────────────────
  {
    n: 57,
    title: "Transmisiones bloqueadas",
    kicker: "Dos voces a la vez y la información que desaparece",
    minutes: 18,
    blocks: [
      {
        kind: "p",
        text: "En radiotelefonía de voz, dos estaciones pueden transmitir casi al mismo tiempo en una frecuencia. El receptor puede oír ruido, una mezcla o solo fragmentos. **Un fragmento reconocible no garantiza que el mensaje entero se recibió**. Tampoco puede el emisor asumir que el controlador escuchó su colación si otra señal coincidió. La disciplina consiste en detectar la pérdida, mantener la última autorización válida y recuperar el contenido crítico antes de actuar.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-57-01.svg",
        alt: "Línea de tiempo con dos transmisiones simultáneas en una frecuencia y una zona superpuesta que deja la recepción incierta.",
        ancho: 1600,
        alto: 900,
        pie: "Esquema didáctico, no una grabación de accidente: cuando dos transmisiones se superponen, la zona compartida no debe reconstruirse por contexto. Se conserva la autorización vigente y se pide que se repita la parte perdida.",
      },
      { kind: "sub", text: "Tres situaciones que conviene distinguir" },
      {
        kind: "table",
        head: ["Situación", "Qué puede percibir la cabina", "Respuesta inicial"],
        rows: [
          ["Dos transmisiones simultáneas", "Ruido o palabras incompletas.", "Esperar que termine la frecuencia y pedir repetición de lo perdido."],
          ["Colación tapada", "La tripulación oyó su propia voz, pero no sabe si ATC la recibió.", "Escuchar posible corrección y confirmar recepción si hubo bloqueo o duda crítica."],
          ["Micrófono trabado", "Canal ocupado de forma continua, incluso con ruido de cabina.", "Comprobar primero el propio transmisor; seguir procedimientos publicados si se pierde la comunicación."],
        ],
      },
      {
        kind: "p",
        text: "La Aeronautical Information Manual de la Administración Federal de Aviación de Estados Unidos (FAA; Federal Aviation Administration) §4-2-2 pide escuchar antes de transmitir, hacer una pequeña pausa tras pulsar el micrófono para no perder la primera palabra, esperar antes de repetir una llamada y comprobar que el propio micrófono no quedó transmitiendo. También advierte que un micrófono trabado puede bloquear la frecuencia durante un periodo prolongado. Son técnicas de radio ampliamente útiles; los procedimientos de contingencia y frecuencias alternativas se consultan en la documentación vigente del espacio aéreo donde se opera.",
      },
      { kind: "sub", text: "Recuperar una autorización sin fabricar el resto" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Detectar la superposición.** Ante un silbido, una mezcla o una caída de palabras, anotar qué parte fue inteligible y cuál no. No completar por una carta, un plan o una altitud esperada.",
          "**Dejar libre la frecuencia.** Antes de hablar, comprobar que las otras estaciones terminaron. Una retransmisión impulsiva puede tapar la corrección que ATC estaba por dar.",
          "**Preguntar con precisión.** Identificarse y pedir que se repita la instrucción o el elemento crítico. Si no se sabe siquiera si el mensaje era propio, confirmar primero el destinatario.",
          "**Colacionar el contenido confirmado.** La nueva respuesta de ATC, no el fragmento inicial, determina qué dato se registra. El piloto que vuela comprueba la selección o el cambio en el plan.",
          "**Reevaluar si el canal permanece bloqueado.** Comprobar audio, volumen, frecuencia y transmisor propio. Si no se restablece el contacto, seguir la contingencia aplicable; esta lección no inventa una frecuencia sustituta.",
        ],
      },
      { kind: "sub", text: "Caso documentado: Tenerife, 27 de marzo de 1977" },
      {
        kind: "p",
        text: "La FAA conserva una copia del informe español del accidente de Los Rodeos y una síntesis técnica. En los segundos previos a la colisión entre los Boeing 747 de KLM y Pan Am, la torre y Pan Am transmitieron casi simultáneamente. La superposición produjo un ruido en la cabina KLM que afectó la recepción de una comunicación crítica. **No fue la única causa**: el informe analiza el inicio del despegue sin autorización expresa, fraseología ambigua, visibilidad reducida y decisiones de cabina. La lección aquí es puntual: una transmisión superpuesta puede eliminar la advertencia que otra tripulación cree haber emitido. No se recrea la grabación ni se atribuye una intención no documentada a los participantes.",
      },
      {
        kind: "escenario",
        titulo: "Ejercicio didáctico: se perdió la parte central",
        situacion: "No reproduce Tenerife ni una transmisión real. Durante una llegada, la cabina oye su indicativo al inicio y al final de una llamada de ATC, pero otra estación tapa el verbo y el nivel. El piloto que monitorea cree que puede tratarse de un descenso; el piloto que vuela tiene preparado un nivel inferior.",
        preguntas: [
          { q: "¿Es suficiente que se oyera el indicativo?", a: "No. Falta la acción y el nivel. Se conserva la última autorización, se solicita repetición y se espera respuesta antes de seleccionar o iniciar el cambio." },
          { q: "¿Qué pasa si la tripulación había colacionado al mismo tiempo?", a: "No puede asumir que ATC la oyó. Si el bloqueo afectó una colación crítica, se resuelve explícitamente la duda de recepción y se escucha cualquier corrección." },
          { q: "¿Cómo evita provocar otro bloqueo?", a: "Escucha que la frecuencia quede libre antes de pulsar, hace una pausa breve y transmite un mensaje corto con el elemento que falta." },
        ],
        concepto: "Cuando se pierde una pieza crítica, la respuesta es recuperar el mensaje, no reconstruirlo.",
      },
      {
        kind: "enLaOperacion",
        momento: "Frecuencia congestionada",
        texto: "El piloto que monitorea protege la escucha mientras el piloto que vuela conserva el control y la trayectoria. Después de una colación crítica, ambos dejan espacio para que ATC corrija. Un canal silencioso no prueba que una transmisión propia llegó; se valora lo que efectivamente se oyó y la situación.",
        pasos: [
          "Escuchar antes de transmitir y comprobar el propio micrófono.",
          "Pedir repetición si una instrucción o colación quedó cubierta.",
          "Aplicar la contingencia publicada si el contacto no se restablece.",
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "No reducir Tenerife a un ruido de radio",
        text: "La investigación fue multifactorial. La superposición explica una pérdida de información en un momento crítico; no sustituye las conclusiones completas sobre autorización de despegue, fraseología, visibilidad y decisiones.",
      },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Escuchar antes de pulsar y dar tiempo al canal para quedar libre.",
          "Una transmisión parcialmente recibida no habilita a completar la instrucción.",
          "Una colación tapada puede no haber llegado a ATC.",
          "Comprobar el propio micrófono ante ocupación prolongada.",
          "Tenerife demuestra la importancia del fenómeno, dentro de un accidente de múltiples factores.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "FAA AIM §4-2-2 · Informe oficial español de Tenerife",
        bloques: [
          { kind: "p", text: "FAA, Aeronautical Information Manual §4-2-2, técnicas de micrófono, escucha, espera y micrófono trabado: https://www.faa.gov/air_traffic/publications/aim_html/chap4_section_2.html" },
          { kind: "p", text: "Informe oficial español sobre la colisión de Los Rodeos, copia alojada por FAA, pp. 46–50: secuencia de comunicaciones simultáneas y análisis de factores: https://www.faa.gov/sites/faa.gov/files/2022-11/Spanish_AccReport.pdf" },
          { kind: "p", text: "FAA, Lessons Learned, síntesis y contexto de la colisión de Tenerife: https://www.faa.gov/lessons_learned/transport_airplane/accidents/PH-BUF" },
          { kind: "p", text: "Para procedimientos de comunicaciones colombianos vigentes, consultar AIP/eAIP Aerocivil. Portada, esquema y ejercicio son didácticos y no transcriben Tenerife ni asignan una frecuencia: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
        ],
      },
    ],
  },
  // ── 58 ──────────────────────────────────────────────────────────────────
  {
    n: 58,
    title: "Cabina estéril y comunicaciones",
    kicker: "Proteger la escucha durante las fases críticas",
    minutes: 17,
    blocks: [
      {
        kind: "p",
        text: "Cabina estéril no significa silencio absoluto. Significa que, durante las fases críticas, la atención y las conversaciones de la tripulación se reservan para operar el avión con seguridad. Una llamada de control de tránsito aéreo (ATC; Air Traffic Control), un aviso de pista o una condición anormal sí puede ser esencial; una conversación ajena al vuelo, un anuncio no urgente o una pregunta administrativa puede esperar. La finalidad es **preservar capacidad para volar, escuchar, colacionar y verificar**.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-58-01.webp",
        alt: "Tres escenas: avión en rodaje, tripulación concentrada en cabina y conversación no urgente con la auxiliar después de estacionar.",
        ancho: 1600,
        alto: 900,
        pie: "Secuencia didáctica, no un procedimiento de operador: durante el rodaje se priorizan trayectoria y radio; una comunicación no urgente se difiere hasta una fase apropiada. Un aviso genuino de seguridad de la cabina de pasajeros no se ignora: se gestiona según los procedimientos del explotador.",
      },
      { kind: "sub", text: "Regla estadounidense y aplicación por operador" },
      {
        kind: "p",
        text: "En operaciones estadounidenses sujetas a **14 CFR §121.542**, la regla prohíbe tareas y actividades no esenciales que distraigan durante fases críticas. Incluye operaciones de rodaje, despegue, aterrizaje y otras operaciones por debajo de 10 000 pies, salvo crucero. La misma norma identifica como no esenciales la conversación personal y las comunicaciones no urgentes entre cabina de pasajeros y cabina de mando. **Esa definición es de Estados Unidos**: no debe trasladarse automáticamente a Colombia. En una aerolínea colombiana rigen los Reglamentos Aeronáuticos de Colombia (RAC), la documentación vigente y el manual del explotador, cuyos detalles específicos deben consultarse antes de operar.",
      },
      {
        kind: "table",
        head: ["Comunicación durante fase crítica", "Tratamiento conceptual", "Por qué"],
        rows: [
          ["Autorización de rodaje y límite de pista", "Escuchar, anotar y colacionar lo requerido.", "Puede cambiar el movimiento de la aeronave."],
          ["Aviso de seguridad desde cabina de pasajeros", "Atender por el canal y procedimiento del operador.", "La urgencia puede superar la restricción de conversación."],
          ["Coordinación de configuración y lista", "Mantenerla breve y vinculada a la operación.", "Permite controlar amenazas y errores."],
          ["Charla personal o asunto administrativo", "Posponerlo.", "Compite con la radio y la vigilancia."],
        ],
      },
      { kind: "sub", text: "Cómo se pierde una instrucción" },
      {
        kind: "p",
        text: "El rodaje combina control de trayectoria, señalización, otras aeronaves, cambios de autorización y colaciones de pista. Si una conversación interna cubre el final de una instrucción, la tripulación puede registrar la calle pero perder el límite de espera. En aproximación, una llamada de cabina de pasajeros puede coincidir con un cambio de pista, velocidad o frecuencia. La defensa no es hacer como si se hubiera entendido: **se mantiene la autorización confirmada y se pide repetición del elemento perdido**. La distribución exacta de tareas entre piloto que vuela y piloto que monitorea depende de los procedimientos de la aerolínea.",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Preparar antes de entrar en fase crítica.** Completar briefings y tareas no urgentes cuando la carga lo permita. Acordar quién escucha y colaciona la radio y quién mantiene el control del avión.",
          "**Identificar una interrupción esencial.** Una alerta técnica o un aviso de seguridad real requiere respuesta; no se descarta bajo la etiqueta de cabina estéril. Se prioriza según la amenaza y el procedimiento del operador.",
          "**Posponer lo no esencial.** Evitar conversaciones personales, asuntos de servicio y cambios administrativos cuando compiten con el rodaje, la salida o la aproximación.",
          "**Recuperar una llamada tapada.** Si una instrucción de ATC quedó incompleta, pedir repetición en vez de colacionar una versión inferida. El piloto que vuela mantiene la última autorización válida.",
          "**Cerrar después de la fase crítica.** Cuando la situación lo permita, retomar las comunicaciones diferidas y confirmar que ninguna cuestión de seguridad quedó pendiente.",
        ],
      },
      { kind: "sub", text: "Caso real documentado: Colgan Air 3407" },
      {
        kind: "p",
        text: "El 12 de febrero de 2009, el vuelo **Colgan Air 3407** perdió el control durante una aproximación a Buffalo. La Junta Nacional de Seguridad en el Transporte de Estados Unidos (NTSB; National Transportation Safety Board) determinó como causa probable la respuesta inapropiada del comandante a la activación del avisador de pérdida. Entre los factores contribuyentes incluyó que la tripulación **no siguió los procedimientos de cabina estéril**, junto con fallas de vigilancia de velocidad, gestión de vuelo y procedimientos de selección de velocidad. Este caso no demuestra que una llamada de ATC específica se perdiera: ilustra cómo la distracción consume recursos de monitoreo en una fase crítica. No se reproducen diálogos de la grabación.",
      },
      {
        kind: "escenario",
        titulo: "Ejercicio didáctico: interfono y autorización de rodaje",
        situacion: "No es una transmisión real. Durante el rodaje, ATC da una autorización con una restricción de mantenerse antes de una pista. Al mismo tiempo suena el interfono con un asunto que todavía no se sabe si es de seguridad. El piloto que monitorea oye la ruta, pero no la restricción completa.",
        preguntas: [
          { q: "¿Se puede continuar por la calle que sí se oyó?", a: "No más allá de cualquier límite no confirmado. Se conserva la posición o la autorización vigente según la situación, se pide repetir la parte de pista y se gestiona el interfono sin perder el control del movimiento." },
          { q: "¿Debe ignorarse la llamada de cabina de pasajeros?", a: "No automáticamente. Puede ser un aviso de seguridad. Se atiende conforme al procedimiento del operador, distribuyendo tareas para no abandonar la vigilancia ni fingir que la autorización de rodaje quedó clara." },
          { q: "¿Cuándo se retoma el asunto no urgente?", a: "En una fase apropiada, después de cerrar la instrucción de ATC y asegurar el movimiento de la aeronave." },
        ],
        concepto: "Cabina estéril es gestión de prioridad y atención, no una prohibición de comunicar riesgos.",
      },
      {
        kind: "enLaOperacion",
        momento: "Briefing y simulador de aerolínea",
        texto: "El instructor puede introducir una llamada de interfono al mismo tiempo que una autorización crítica. Se observa si la tripulación distribuye tareas, pregunta por lo perdido, mantiene el avión bajo control y distingue un aviso de seguridad de una interrupción no esencial.",
        pasos: [
          "Nombrar la fase crítica y proteger la escucha.",
          "Atender riesgos reales sin trivializarlos ni perder una restricción ATC.",
          "Diferir el resto y volver a la conversación cuando sea seguro.",
        ],
      },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Cabina estéril protege atención, radio y monitoreo en fases críticas.",
          "La definición legal citada es estadounidense; la aplicación local depende de RAC y operador.",
          "Un aviso genuino de seguridad sí se gestiona.",
          "Una autorización tapada se repite; no se completa por memoria.",
          "Colgan 3407 muestra el costo de la distracción dentro de un accidente multifactorial.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "14 CFR §121.542 · NTSB DCA09MA027",
        bloques: [
          { kind: "p", text: "Regulación estadounidense vigente, 14 CFR §121.542, deberes de tripulación en fases críticas: https://www.ecfr.gov/current/title-14/chapter-I/subchapter-G/part-121/subpart-T/section-121.542" },
          { kind: "p", text: "NTSB, investigación DCA09MA027, Colgan Air 3407, causa probable y factores contribuyentes: https://www.ntsb.gov/investigations/Pages/DCA09MA027.aspx" },
          { kind: "p", text: "Para las reglas colombianas vigentes y la aplicación concreta, consultar los RAC y el manual de operaciones del explotador. El acceso oficial a información aeronáutica de Aerocivil es: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "La portada, la secuencia y el ejercicio son material didáctico, no representación del vuelo 3407 ni transcripción ATC." },
        ],
      },
    ],
  },
  // ── 59 ──────────────────────────────────────────────────────────────────
  {
    n: 59,
    title: "PF y PM en las comunicaciones",
    kicker: "Quién habla, quién escucha y quién verifica",
    minutes: 7,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Es cómo se reparten las comunicaciones entre el piloto que vuela (PF, pilot flying) y el piloto que monitorea (PM, pilot monitoring) en un avión de dos pilotos.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "En muchos operadores el **PM** gestiona la mayor parte de las comunicaciones con ATC y el **PF** la trayectoria del avión. **No es una regla universal**: el reparto lo fija el SOP del operador, y puede cambiar en tierra (quién opera la radio en rodaje), en emergencia o cuando el comandante decide tomar la radio. No hay en lo cargado una norma OACI que lo fije.",
          "Aunque uno solo hable, **los dos escuchan** las autorizaciones críticas: nivel, rumbo, velocidad, pista, QNH, código SSR, ruta.",
          "El cambio en el MCP/FCU o en el FMS lo hace quien diga el SOP; el otro lo **verifica** en voz alta.",
          "El Doc 9835 1.2.6 señala que el lenguaje participa en la CRM y que la competencia lingüística refuerza la CRM, sobre todo en tripulaciones de nacionalidades distintas.",
          "Si el PM está ocupado (lista de verificación, llamada a la cabina), el PF debe saber que la radio quedó sin vigilancia exclusiva, o se reasigna la tarea según el SOP.",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      verificar(
        "El reparto de comunicaciones entre PF y PM, los callouts y la verificación de cambios en MCP/FCU/FMS de estos ejemplos se confirman contra el manual de operaciones y los SOP del operador (varían por operador y tipo de avión). La guía de la autoridad sobre monitoreo de la trayectoria y rol del PM (circulares de asesoramiento de la FAA o material de la autoridad colombiana) no está cargada. El texto MAYDAY se confirma según el capítulo 51.",
      ),
      {
        kind: "escenario",
        titulo: "Escenario de práctica: cambio de nivel con crosscheck",
        situacion: "ATC: `AVIATORY 452, descend to flight level two four zero.` El PM lleva la radio; el PF, el avión.",
        preguntas: [
          {
            q: "¿Qué va a ATC y qué se dice dentro de la cabina?",
            a: "PM (radio): `Descend flight level two four zero. AVIATORY 452.` PM (cabina): «Flight level two four zero». PF (cabina, después de seleccionar): «Two four zero set». PM (cabina, mirando la selección): «Checked». La colación va a ATC; la verificación, dentro de la cabina. Las palabras exactas del crosscheck las fija el SOP.",
          },
        ],
        concepto: "Uno habla; los dos escuchan. Uno selecciona; el otro verifica.",
      },
      ...ejemplo(
        "Ejemplo 1 · Discrepancia entre pilotos",
        [
          `ATC:   "AVIATORY 452, turn right heading two seven zero."`,
          `PM (radio): "Right heading two seven zero. AVIATORY 452."`,
          `PF (cabina): «¿Dijo dos siete cero o dos seis cero?».`,
          `PM (radio): "Bogota Control, AVIATORY 452, confirm heading two seven zero."`,
          `ATC:   "AVIATORY 452, affirm, heading two seven zero."`,
        ],
        "Significado: cuando los dos pilotos no oyeron lo mismo, se confirma con ATC (CONFIRM, Doc 9432 2.6). No se decide por mayoría ni por jerarquía.",
      ),
      ...ejemplo(
        "Ejemplo 2 · PF toma la radio en una emergencia, según SOP (MAYDAY: VERIFICAR)",
        [
          `PF (cabina): «Yo tengo radio y controles; tú corre la lista».`,
          `PF (radio): "MAYDAY, MAYDAY, MAYDAY, Bogota Approach, AVIATORY 452, engine fire, request immediate return runway one three left."`,
        ],
        "Significado: algunos operadores asignan la radio al PF en ciertas emergencias para liberar al PM con la lista de verificación. Otros no. Lo que importa es que el reparto quede **dicho en voz alta**. El texto MAYDAY está en VERIFICAR (capítulo 51).",
      ),
      ...ejemplo(
        "Ejemplo 3 · PM ocupado",
        [
          `PM (cabina): «Voy a llamar a la cabina de pasajeros; tienes radio».`,
          `PF (cabina): «Tengo radio».`,
          `ATC:   "AVIATORY 452, contact Bogota Approach one one niner decimal five."`,
          `PF (radio): "One one niner decimal five. AVIATORY 452."`,
        ],
        "Significado: traspaso explícito de la radio. Así no queda la frecuencia sin nadie escuchando.",
      ),
      {
        kind: "hueco",
        rotulo: "CM-59-01 · Diagrama · 16:9 · 1600×900 px",
        descripcion:
          "Imagen sugerida: Vista esquemática de dos asientos de cabina. Del lado PM, un icono de micrófono y la etiqueta «COMMUNICATE / READBACK». Del lado PF, un icono de mando y la etiqueta «FLY / SET». Entre ambos, una flecha doble con «CROSSCHECK». Arriba, un globo de ATC que llega a los dos auriculares. Rótulo inferior pequeño: «Reparto típico: lo define el SOP del operador». Objetivo: Que el piloto vea que la comunicación es de uno pero la escucha y la verificación son de los dos.",
        alto: 280,
      },
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Según el manual del operador",
        texto: "Los operadores definen en su manual quién opera la radio en cada fase, las llamadas estándar (callouts) de cambios de autorización y cómo se verifican los cambios del FMS.",
        pasos: [
          "Algunos operadores piden que el PF repita en voz alta cada nivel autorizado antes de seleccionarlo; otros que el PM lo seleccione y el PF lo verifique. Ambos buscan lo mismo: dos cabezas sobre cada valor crítico.",
        ],
      },
      { kind: "sub", text: "Error frecuente" },
      error("El PF deja de escuchar", "El PF deja de escuchar ATC «porque el PM está en la radio»."),
      error("Nadie verifica lo seleccionado", "El PM colaciona bien pero nadie verifica lo seleccionado."),
      error("Traspasar la radio sin decirlo", "Traspasar la radio sin decirlo."),
      error("Resolver la duda sin ATC", "Resolver una duda entre pilotos sin preguntar a ATC."),
      error("Atribuirle a la OACI el SOP", "Atribuir a la OACI el reparto PF/PM del propio operador."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "El reparto PF/PM lo fija el SOP del operador, no la OACI.",
          "Uno habla; los dos escuchan.",
          "Uno selecciona; el otro verifica.",
          "La radio se traspasa en voz alta.",
          "Si los dos oyeron distinto, se confirma con ATC.",
        ],
      },
      fuentes(
        "Doc 9835 · Doc 9432 · Doc 4444",
        "Doc 9835 (2.ª ed.) 1.2.6; Doc 9432 (4.ª ed.) 2.6 (CONFIRM); Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1.",
        [
          "VERIFICAR: reparto de comunicaciones PF/PM, callouts y verificación de cambios en MCP/FCU/FMS contra el manual de operaciones y los SOP del operador (varía por operador y tipo de avión).",
          "VERIFICAR: guía de la autoridad sobre monitoreo de la trayectoria y rol del PM (por ejemplo, circulares de asesoramiento de la FAA o material de la autoridad colombiana), no cargada.",
        ],
      ),
    ],
  },
  // ── 60 ──────────────────────────────────────────────────────────────────
  {
    n: 60,
    title: "Gestión de autorizaciones en cabina",
    kicker: "Escuchar, colacionar, seleccionar, verificar y ejecutar",
    minutes: 9,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Es el proceso completo con el que la tripulación convierte una autorización de ATC en lo que el avión hace (clearance management): escuchar, interpretar, colacionar, seleccionar, verificar, ejecutar y vigilar. Une las comunicaciones ATC con la CRM.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "La colación no termina el trabajo. Una autorización bien colacionada y mal seleccionada sigue siendo un error.",
          "El controlador escucha la colación y corrige cualquier discrepancia (Doc 4444 4.5.7.5.2). Ese hearback no ve lo que se selecciona en cabina: eso solo lo detecta el crosscheck.",
          "Cuando se cambia una parte de una autorización de nivel, se enuncia de nuevo toda la autorización de nivel (Doc 9432 3.3.3). Una autorización nueva invalida la anterior o parte de ella (RECLEARED, Doc 9432 2.6).",
          "Una autorización de ruta no es una autorización de despegue ni para entrar a la pista (Doc 9432 2.8.3.3).",
          "Las autorizaciones con varios elementos se ejecutan en el orden correcto y todas: un giro y un descenso son dos acciones.",
        ],
      },
      { kind: "sub", text: "El proceso" },
      {
        kind: "table",
        head: ["Paso", "Qué se hace", "Quién (típico, según SOP)"],
        rows: [
          ["HEAR", "Escuchar la autorización completa", "Ambos"],
          ["INTERPRET", "Entender qué pide y si se puede cumplir", "Ambos"],
          ["READBACK", "Colacionar los elementos obligatorios con el distintivo", "El que comunica"],
          ["SET", "Seleccionar valores en MCP/FCU/FMS", "Según SOP"],
          ["CROSSCHECK", "Verificar lo seleccionado contra lo autorizado", "El otro piloto"],
          ["EXECUTE", "Iniciar la maniobra", "PF"],
          ["MONITOR", "Vigilar que el avión haga lo autorizado y capte el valor", "Ambos"],
        ],
      },
      {
        kind: "hueco",
        rotulo: "CM-60-01 · Diagrama · 16:9 · 1600×900 px",
        descripcion:
          "Imagen sugerida: Flujo horizontal de siete cajas unidas por flechas: ATC CLEARANCE → HEAR → READBACK → SET → CROSSCHECK → EXECUTE → MONITOR. Bajo cada caja, un icono (auricular, micrófono, perilla del MCP, dos ojos, avión girando, pantalla con el nivel captado). Una flecha de retorno desde MONITOR hasta HEAR con la etiqueta «Si algo no calza: CONFIRM». Rótulos en mono mayúsculas. Objetivo: Que el piloto memorice la secuencia completa y vea que la duda devuelve el proceso al inicio.",
        alto: 280,
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      verificar(
        "«BE LEVEL BY (punto)» no está en las fuentes cargadas: consultar el Doc 4444 cap. 12. La secuencia HEAR, READBACK, SET, CROSSCHECK, EXECUTE, MONITOR es didáctica: los callouts y el reparto se confirman contra el SOP del operador.",
      ),
      ...ejemplo(
        "Ejemplo 1 · Descenso y viraje en una sola autorización",
        [
          `ATC:   "AVIATORY 452, descend flight level two four zero, turn right heading two seven zero."`,
          `PILOT: "Descend flight level two four zero, right heading two seven zero. AVIATORY 452."`,
        ],
        "Significado: dos instrucciones que se colacionan siempre (nivel y rumbo, Doc 4444 4.5.7.5.1 c).",
      ),
      { kind: "p", text: "Proceso en cabina:" },
      {
        kind: "list",
        ordered: true,
        items: [
          "HEAR: ambos oyen «two four zero» y «right two seven zero».",
          "INTERPRET: descenso y viraje a la derecha; ¿hay terreno o meteorología en ese rumbo? No.",
          "READBACK: el PM colaciona.",
          "SET: se selecciona FL240 en altitud y 270 en rumbo.",
          "CROSSCHECK: el otro piloto verifica «240, 270, derecha».",
          "EXECUTE: el PF inicia descenso y viraje por la derecha.",
          "MONITOR: ambos vigilan el viraje por la derecha (no por la izquierda) y la captura de FL240.",
        ],
      },
      ...ejemplo(
        "Ejemplo 2 · Autorización con restricción («be level by»: VERIFICAR)",
        [
          `ATC:   "AVIATORY 452, descend to flight level one five zero, be level by GIKOS."`,
          `PILOT: "Descend flight level one five zero, level by GIKOS. AVIATORY 452."`,
        ],
        "Significado: la restricción se colaciona y se programa en el FMS o se vigila con cálculo de descenso. La redacción «BE LEVEL BY» está en VERIFICAR (Doc 4444 cap. 12). En cabina: ¿llegamos? Si no, UNABLE ahora, no al pasar GIKOS.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Autorización que reemplaza a la anterior (Doc 9432 3.3.3.2)",
        [
          `ATC:   "AVIATORY 452, stop descent at flight level one eight zero."`,
          `PILOT: "Stop descent at flight level one eight zero. AVIATORY 452."`,
        ],
        "Significado: modelo del Doc 9432 3.3.3.2 («STOP DESCENT AT FL 150»). En cabina se cambia la selección de inmediato, porque el avión ya viene bajando.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Autorización condicional con nivel (Doc 9432 3.3.3.1)",
        [
          `ATC:   "AVIATORY 452, after passing GIKOS descend to flight level one two zero."`,
          `PILOT: "After passing GIKOS, descend flight level one two zero. AVIATORY 452."`,
        ],
        "Significado: modelo del Doc 9432 3.3.3.1 («AFTER PASSING NORTH CROSS NDB DESCEND TO FL 80»). El valor se puede preseleccionar según SOP, pero el descenso **no empieza** hasta pasar GIKOS. Aquí se cometen errores de ejecución anticipada.",
      ),
      ...ejemplo(
        "Ejemplo 5 · Cambio de frecuencia en medio de una autorización (Doc 9432 2.8.2.1)",
        [
          `ATC:   "AVIATORY 452, climb to flight level three one zero, when passing flight level two zero zero contact Bogota Control one two eight decimal seven."`,
          `PILOT: "Climb flight level three one zero, when passing flight level two zero zero, one two eight decimal seven. AVIATORY 452."`,
        ],
        "Significado: modelo del Doc 9432 2.8.2.1 («WHEN PASSING FL 80 CONTACT ALEXANDER CONTROL 129.1»). Hay dos acciones con disparadores distintos: una ahora y otra al pasar FL200.",
      ),
      ...ejemplo(
        "Ejemplo 6 · No se puede cumplir (Doc 9432 2.8.3.10)",
        [
          `ATC:   "AVIATORY 452, climb to flight level three nine zero."`,
          `PILOT: "Unable flight level three nine zero due weight, request flight level three seven zero. AVIATORY 452."`,
        ],
        "Significado: si en INTERPRET se ve que no se puede, se dice UNABLE antes de colacionar como si se fuera a cumplir (Doc 9432 2.8.3.10).",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Con autorizaciones largas y modos automáticos",
        texto: "Muchos operadores escriben las autorizaciones largas (ruta, restricciones) en el plan de vuelo o en una tarjeta mientras se reciben.",
        pasos: [
          "Los modos automáticos pueden no hacer lo esperado (por ejemplo, un modo que no capta el nivel o un viraje por el lado corto). El paso MONITOR existe por eso.",
          "Los operadores usan callouts para cada cambio de modo o de valor; el detalle está en su SOP.",
        ],
      },
      { kind: "sub", text: "Error frecuente" },
      error("Colacionar bien y seleccionar mal", "Colacionar bien y seleccionar mal."),
      error("Seleccionar sin verificación", "Seleccionar sin que el otro verifique."),
      error("Ejecutar antes de la condición", "Ejecutar antes de la condición (autorizaciones condicionales)."),
      error("Perder el segundo elemento", "Perder el segundo elemento de una autorización doble."),
      error("Dejar el valor anterior", "Dejar el valor anterior cuando ATC cambió la autorización."),
      error(
        "Aceptar una restricción imposible",
        "Aceptar una restricción que no se puede cumplir y descubrirlo tarde.",
      ),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Escuchar, interpretar, colacionar, seleccionar, verificar, ejecutar, vigilar.",
          "El hearback de ATC no ve la selección: el crosscheck sí.",
          "Autorización condicional: se espera la condición.",
          "Si no se puede, UNABLE temprano.",
          "Si algo no calza, se vuelve al inicio con CONFIRM.",
        ],
      },
      fuentes(
        "Doc 4444 · Doc 9432",
        "Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1, 4.5.7.5.2; Doc 9432 (4.ª ed.) 2.6 (RECLEARED, CONFIRM, UNABLE), 2.8.2.1, 2.8.3.3, 2.8.3.10, 3.3.3, 3.3.3.1, 3.3.3.2.",
        [
          "VERIFICAR: «BE LEVEL BY (punto)» contra Doc 4444 cap. 12.",
          "VERIFICAR: la secuencia HEAR-READBACK-SET-CROSSCHECK-EXECUTE-MONITOR es didáctica; confirmar callouts y reparto contra el SOP del operador.",
        ],
      ),
    ],
  },
  // ── 61 ──────────────────────────────────────────────────────────────────
  {
    n: 61,
    title: "Errores comunes",
    kicker: "Los que se repiten y cómo se evitan",
    minutes: 9,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Es la lista de los errores de comunicación que más riesgo operacional producen, con su causa y su defensa. Sirve de repaso de todo el módulo.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "El Doc 9835 1.2.2 resume las tres formas en que el lenguaje contribuye a accidentes: uso incorrecto de la fraseología, conocimiento insuficiente del lenguaje común y uso de más de un idioma en el mismo espacio aéreo.",
          "El mismo manual cita un estudio (Mell, 1992) según el cual el 70% de los actos de habla en ruta que debían hacerse con fraseología normalizada no la cumplían (Doc 9835 1.2.3). El dato es del estudio citado, no de un análisis actual.",
          "El Doc 9432 2.1 dice que se han producido incidentes y accidentes en los que el uso de procedimientos y fraseología no normalizados fue factor contribuyente.",
        ],
      },
      { kind: "sub", text: "Los errores, uno por uno" },
      {
        kind: "table",
        head: ["Error", "Por qué es peligroso", "Defensa"],
        rows: [
          ["Readback incompleto", "ATC no puede verificar lo que no se dijo", "Colacionar todos los elementos obligatorios (Doc 4444 4.5.7.5.1)"],
          ["Hearback incorrecto", "El controlador no detecta un error de colación", "La tripulación no depende solo del hearback; crosscheck interno"],
          ["Frecuencia errada", "Pérdida de contacto; autorizaciones perdidas", "Colacionar la frecuencia; si no hay respuesta, volver a la anterior"],
          ["Pista errada", "Incursión, aterrizaje en pista equivocada", "Colacionar la pista siempre; confirmar si difiere de la esperada"],
          ["Altitud errada", "Pérdida de separación, terreno", "Colacionar, seleccionar y verificar entre pilotos"],
          ["Call sign incorrecto", "Se ejecuta una autorización ajena", "Colación terminada con el distintivo propio (Doc 9432 2.8.3.7)"],
          ["Transmisión bloqueada", "Autorizaciones o correcciones perdidas", "Escuchar antes de hablar; preguntar ante un chillido"],
          ["Distintivos parecidos", "Autorización ajena aceptada", "Atención al distintivo completo; preguntar si hay duda"],
          ["Expectation bias", "Se oye lo esperado", "Colacionar lo oído; confirmar lo inesperado"],
          ["Exceso de lenguaje no estándar", "Nadie más en frecuencia entiende", "Fraseología primero (Doc 9835 4.3.3)"],
          ["Hablar rápido", "Mensaje ininteligible", "No más de 100 palabras por minuto (Doc 9432 2.2.1 d)"],
          ["Slang y coloquialismos", "Ambigüedad", "Evitarlos (Doc 9835 3.3.9)"],
          ["No preguntar", "Se ejecuta algo no entendido", "SAY AGAIN, CONFIRM"],
          ["Aceptar lo que no se puede cumplir", "Incumplimiento tardío", "UNABLE con motivo (Doc 9432 2.8.3.10)"],
          ["Copiar mal un número", "Valor equivocado en el sistema", "Dígito por dígito; leer lo anotado"],
          ["No hacer crosscheck", "Error de selección sin detectar", "Uno selecciona, otro verifica"],
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      verificar(
        "«GOING AROUND» y «ARE YOU ABLE TO ACCEPT (runway)» no están en las fuentes cargadas: consultar el Doc 9432 cap. 4 y 7 y el Doc 4444 cap. 12. El procedimiento de falla de comunicaciones se confirma en el Doc 4444 cap. 15, el Anexo 10 Vol. II 5.2.2.7 y el AIP del Estado (capítulo 32).",
      ),
      ...ejemplo(
        "Ejemplo 1 · Readback incompleto",
        [
          `ATC:   "AVIATORY 452, descend to flight level one two zero, QNH one zero two eight, turn left heading three three zero."`,
          `PILOT (mal): "Descending, left heading three three zero. AVIATORY 452."`,
          `PILOT (bien): "Descend flight level one two zero, QNH one zero two eight, left heading three three zero. AVIATORY 452."`,
        ],
        "Significado: nivel, QNH y rumbo se colacionan siempre (Doc 4444 4.5.7.5.1 c). «Descending» sin valor no le permite a ATC verificar nada.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Colación incorrecta corregida (modelo verificado, Doc 9432 2.8.3.9)",
        [
          `ATC:   "AVIATORY 452, QNH one zero zero three."`,
          `PILOT: "QNH one zero one three. AVIATORY 452."`,
          `ATC:   "AVIATORY 452, negative, I say again, QNH one zero zero three."`,
          `PILOT: "QNH one zero zero three. AVIATORY 452."`,
        ],
        "Significado: el Doc 9432 2.8.3.9 da este mismo ejemplo con G-CD. Después de NEGATIVE I SAY AGAIN, se vuelve a colacionar.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Frecuencia errada (falla de comunicaciones: VERIFICAR)",
        [
          `ATC:   "AVIATORY 452, contact Bogota Control one two eight decimal seven."`,
          `PILOT: "One two eight decimal seven. AVIATORY 452."`,
          `(En la frecuencia nueva nadie responde.)`,
        ],
        "Significado: se vuelve a la frecuencia anterior y se pide confirmación (**PLAIN ENGLISH**: `Bogota Approach, AVIATORY 452, no contact on one two eight decimal seven, confirm frequency.`). Si no hay contacto en ninguna, rige el procedimiento de falla de comunicaciones (capítulo 32).",
      ),
      ...ejemplo(
        "Ejemplo 4 · Slang y lenguaje no estándar («going around»: VERIFICAR)",
        [`PILOT (mal): "AVIATORY 452, we're on the go."`, `PILOT (bien): "AVIATORY 452, going around."`],
        "Significado: el Doc 9835 5.3.2.2 usa este caso: «we're on the go» u otra jerga regional puede no entenderse por el controlador y los demás aviones. La frase normalizada está en VERIFICAR (capítulo 58).",
      ),
      ...ejemplo(
        "Ejemplo 5 · ROGER donde no corresponde («are you able to accept»: VERIFICAR)",
        [
          `ATC:   "AVIATORY 452, are you able to accept runway three one?"`,
          `PILOT (mal): "Roger. AVIATORY 452."`,
          `PILOT (bien): "Affirm. AVIATORY 452."`,
        ],
        "Significado: ROGER solo dice «he recibido toda su transmisión». No se usa para responder una pregunta que pide sí o no (Doc 9432 2.6).",
      ),
      ...ejemplo(
        "Ejemplo 6 · Aceptar lo que no se puede cumplir (Doc 9432 2.8.3.10)",
        [
          `ATC:   "AVIATORY 452, cross GIKOS at or above flight level one five zero, if unable, maintain flight level one three zero."`,
          `PILOT: "Unable to cross GIKOS flight level one five zero due weight, maintaining flight level one three zero. AVIATORY 452."`,
        ],
        "Significado: modelo del Doc 9432 2.8.3.10 («IF UNABLE, MAINTAIN FL 130… UNABLE TO CROSS WICKEN FL 150 DUE WEIGHT, MAINTAINING FL 130»).",
      ),
      ...ejemplo(
        "Ejemplo 7 · Corregir un error propio (Doc 9432 2.8.1.6)",
        [`PILOT: "Bogota Control, AVIATORY 452, GIKOS four seven, flight level three three zero, LUDEM zero seven, correction, LUDEM five seven."`],
        "Significado: CORRECTION, repitiendo el último grupo correcto y la versión corregida (Doc 9432 2.8.1.6; su ejemplo: «MARLO 07 CORRECTION MARLO 57»).",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En los reportes de seguridad y en la entrevista",
        texto: "Los programas de reporte de seguridad de las aerolíneas registran estos errores; muchos casos de desviación de nivel empiezan con una colación o una selección equivocada.",
        pasos: [
          "En la entrevista es frecuente que pregunten por un error de comunicación propio y qué se aprendió. Una respuesta sólida describe el error, la barrera que lo detectó y qué se cambió.",
        ],
      },
      { kind: "sub", text: "Error frecuente" },
      error(
        "Suponer",
        "El error de fondo de todos los anteriores: **suponer**. Suponer que la autorización era para uno, que el número era el esperado, que ATC oyó la colación, que el otro piloto verificó.",
      ),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Colacionar completo, con el distintivo.",
          "Lo inesperado se confirma.",
          "Lo que no se oyó se pide.",
          "Lo que no se puede se dice con UNABLE.",
          "Fraseología primero; lenguaje común claro cuando no hay.",
          "Uno selecciona, otro verifica.",
        ],
      },
      {
        kind: "hueco",
        rotulo: "CM-61-01 · Esquema · 4:5 · 1080×1350 px",
        descripcion:
          "Imagen sugerida: Tarjeta de repaso con 16 filas cortas, cada una con un icono pequeño y el nombre del error en inglés (INCOMPLETE READBACK, WRONG FREQUENCY, WRONG RUNWAY, WRONG ALTITUDE, WRONG CALL SIGN, BLOCKED, SIMILAR CALL SIGN, EXPECTATION BIAS, NON-STANDARD, TOO FAST, SLANG, NOT ASKING, ACCEPTING THE IMPOSSIBLE, WRONG NUMBER, NO CROSSCHECK, ASSUMING). Al lado de cada una, la defensa en una palabra (READBACK, CONFIRM, SAY AGAIN, UNABLE, CROSSCHECK). Rojo solo para el nombre del error; tinta normal para la defensa. Objetivo: Que el piloto tenga una hoja de repaso visual que empareje cada error con su barrera.",
        alto: 420,
        ratio: "4 / 5",
        anchoMax: 420,
      },
      fuentes(
        "Doc 9835 · Doc 9432 · Doc 4444",
        "Doc 9835 (2.ª ed.) 1.2.2, 1.2.3 (cita del estudio Mell, 1992), 3.3.9, 4.3.3, 5.3.2.2; Doc 9432 (4.ª ed.) 2.1, 2.2.1 d), 2.6 (ROGER, AFFIRM), 2.8.1.6, 2.8.3.7, 2.8.3.9, 2.8.3.10; Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1.",
        [
          "VERIFICAR: «GOING AROUND» contra Doc 9432 cap. 4 y 7 y Doc 4444 cap. 12.",
          "VERIFICAR: «ARE YOU ABLE TO ACCEPT (runway)» como frase de ATC contra Doc 4444 cap. 12.",
          "VERIFICAR: procedimiento de falla de comunicaciones contra Doc 4444 cap. 15, Anexo 10 Vol. II 5.2.2.7 y AIP del Estado (capítulo 32).",
        ],
      ),
    ],
  },
]
