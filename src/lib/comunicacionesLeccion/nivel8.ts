/**
 * Nivel 8 · Práctica y repaso (lecciones 62 a 69, capítulos 62 a 68 y el repaso de las 50 frases de la especificación).
 *
 * El cierre: la fraseología que se debe dominar, práctica de Aviation English
 * y de plain English, escenarios de entrevista, errores frecuentes de
 * hispanohablantes, qué escuchar primero, el resumen final y el repaso de
 * las 50 frases.
 *
 * Fuente: docs/comunicaciones/nivel-8.md, entero. Estas lecciones no usan el
 * formato estándar de capítulo: cada una lleva el suyo (SITUACIÓN / ATC /
 * PILOT / SIGNIFICADO / ERROR COMÚN, etc.), y así se conserva:
 *
 * - 62: cada situación es un intercambio en `code` con su significado y el
 *   error común en un callout de alerta.
 * - 63: cada situación es un `piensaComoPiloto` (la respuesta correcta queda
 *   tras el botón, como pide el Markdown: «tápate la respuesta»).
 * - 64: cada caso con su ejemplo PLAIN LANGUAGE en `code`.
 * - 65: cada escenario de entrevista es un `escenario` (respuesta esperada y
 *   razonamiento, plegados).
 * - 66: lo que se oye (alerta), lo correcto (`code`) y por qué importa.
 * - 67: la transmisión descompuesta en los cinco pasos (`pasos`).
 * - 68: los 28 principios.
 * - 69: las 50 frases en fichas; las [P] van con su VERIFICAR.
 *
 * Lo que el Markdown marca VERIFICAR sale en un callout «Verificar» visible
 * junto al ejemplo y, completo, en el detalle técnico de FUENTES. Los rótulos
 * PLAIN LANGUAGE se conservan. El formato de los bloques y de los huecos está
 * documentado al inicio de index.ts.
 */

import type { DocBlockData, DocScreen } from "@/lib/docBlocks"

/**
 * Un intercambio: el título en negrita, la transmisión literal (una línea por
 * turno de palabra) y, si lo hay, el significado.
 */
function ejemplo(titulo: string, turnos: string[], significado?: string): DocBlockData[] {
  const out: DocBlockData[] = [
    { kind: "p", text: `**${titulo}**` },
    { kind: "code", text: turnos.join("\n") },
  ]
  if (significado) out.push({ kind: "p", text: significado })
  return out
}

/** Un error frecuente: alerta semántica, no error. */
function error(titulo: string, text: string): DocBlockData {
  return { kind: "callout", tone: "warn", title: titulo, text }
}

/** El aviso visible de lo que no está en las fuentes cargadas. */
function verificar(text: string): DocBlockData {
  return { kind: "callout", tone: "verificar", title: "Verificar", text }
}

/** Una situación del capítulo 63, con la respuesta tras el botón. */
function practica63(c: {
  n: number
  situacion: string
  atc: string
  quiere: string
  respuesta: string
  explicacion: string
}): DocBlockData {
  return {
    kind: "piensaComoPiloto",
    momento: `Situación ${c.n}`,
    situacion: `**SITUACIÓN DIDÁCTICA:** ${c.situacion} **FORMULACIÓN EN INGLÉS (no transcripción real):** ${c.atc}`,
    pregunta: "¿Qué acción se solicita, qué falta por confirmar y qué dirías? Responde en voz alta antes de mirar.",
    respuesta: `**INTENCIÓN OPERACIONAL:** ${c.quiere}`,
    claves: [
      { titulo: "RESPUESTA Y DECISIÓN", texto: c.respuesta },
      { titulo: "RAZONAMIENTO", texto: c.explicacion },
    ],
  }
}

/** Un caso del capítulo 64: situación, qué comunicar, ejemplo PLAIN LANGUAGE y por qué funciona. */
function caso64(c: {
  titulo: string
  situacion: string
  comunicar: string
  turnos: string[]
  porQue: string
  verificar?: string
}): DocBlockData[] {
  const out: DocBlockData[] = [
    { kind: "sub", text: c.titulo },
    { kind: "p", text: `**SITUACIÓN:** ${c.situacion}` },
    { kind: "p", text: `**QUÉ NECESITA COMUNICAR:** ${c.comunicar}` },
    ...ejemplo(c.verificar ? "EJEMPLO EN INGLÉS (PLAIN LANGUAGE; prefijo VERIFICAR)" : "EJEMPLO EN INGLÉS (PLAIN LANGUAGE)", c.turnos),
    { kind: "p", text: `**POR QUÉ FUNCIONA:** ${c.porQue}` },
  ]
  if (c.verificar) out.push(verificar(c.verificar))
  return out
}

/** Un escenario de entrevista del capítulo 65. */
function escenario65(c: {
  titulo: string
  escenario: string
  atc: string
  respuesta: string
  razonamiento: string
  verificar?: string
}): DocBlockData[] {
  const out: DocBlockData[] = [
    {
      kind: "escenario",
      titulo: c.titulo,
      situacion: `**ESCENARIO:** ${c.escenario} **ATC:** ${c.atc}`,
      preguntas: [
        { q: "¿Qué respondes? (respuesta esperada)", a: c.respuesta },
        { q: "¿Cómo lo razonas en voz alta ante el evaluador?", a: c.razonamiento },
      ],
    },
  ]
  if (c.verificar) out.push(verificar(c.verificar))
  return out
}

/** Un error del capítulo 66: lo que se oye, lo correcto y por qué importa. */
function error66(c: {
  titulo: string
  seOye: string
  correcto: string
  correctoEsFrase?: boolean
  porQue: string
  verificar?: string
}): DocBlockData[] {
  const out: DocBlockData[] = [
    { kind: "sub", text: c.titulo },
    error("Lo que se oye", c.seOye),
    ...(c.correctoEsFrase === false
      ? [{ kind: "p", text: `**LO CORRECTO:** ${c.correcto}` } as DocBlockData]
      : ejemplo("LO CORRECTO", [c.correcto])),
    { kind: "p", text: `**POR QUÉ IMPORTA:** ${c.porQue}` },
  ]
  if (c.verificar) out.push(verificar(c.verificar))
  return out
}

/** Un ejemplo del capítulo 67: la transmisión, sus cinco pasos y la colación. */
function orden67(c: {
  titulo: string
  atc: string
  pasos: [string, string][]
  pilot: string[]
  fuente?: string
}): DocBlockData[] {
  const out: DocBlockData[] = [
    { kind: "sub", text: c.titulo },
    { kind: "code", text: `ATC: ${c.atc}` },
    { kind: "pasos", items: c.pasos.map(([rotulo, texto]) => ({ rotulo, texto })) },
    { kind: "code", text: c.pilot.join("\n") },
  ]
  if (c.fuente) out.push({ kind: "p", text: c.fuente })
  return out
}

/** Una frase del repaso: número, [V] o [P], significado y ejemplo. */
type Frase = { n: number; frase: string; significado: string; ejemplo: string; pendiente?: string }

function fichasFrases(titulo: string, frases: Frase[]): DocBlockData {
  return {
    kind: "fichas",
    titulo,
    columnas: 2,
    items: frases.map((f) => ({
      titulo: `${f.n}. ${f.frase}`,
      ref: f.pendiente ? "[P] Pendiente de verificar" : "[V] Verificada",
      puntosRotulo: "Significado y ejemplo",
      puntos: [`**SIGNIFICADO:** ${f.significado}`, `**EJEMPLO:** ${f.ejemplo}`],
      ...(f.pendiente ? { nota: `VERIFICAR: ${f.pendiente}` } : {}),
    })),
  }
}

/** Cómo leer los ejemplos: va al empezar cada lección. */
const COMO_LEER: DocBlockData = {
  kind: "callout",
  tone: "info",
  title: "Cómo leer los ejemplos",
  text: "`AVIATORY 452` es un distintivo **ficticio** (`AVIATORY 425` y `AVIATORY 542` se usan como distintivos parecidos). Estaciones, pistas, frecuencias, códigos, niveles y altitudes son didácticos; los puntos GIKOS, TOLEX, RAPUD, MUVAN y ORSEK son **ficticios**. **(VERIFICAR)**: fraseología que no está en las fuentes cargadas; no la tomes como verificada hasta confirmarla. **PLAIN LANGUAGE**: lenguaje claro, no fraseología normalizada. Ninguna respuesta de este nivel reemplaza el SOP de tu aerolínea.",
}

/** Las convenciones de todo el nivel (nivel-8.md). */
const CONVENCIONES: DocBlockData = {
  kind: "list",
  items: [
    "`AVIATORY 452` es un distintivo ficticio. `AVIATORY 425` y `AVIATORY 542` se usan como distintivos parecidos.",
    "Las estaciones («Bogota Ground», «Bogota Tower», «Approach», «Control») son ejemplos educativos. Pistas, frecuencias, códigos, niveles y altitudes son didácticos: no corresponden a la publicación de ningún aeródromo. Cuando se usa una dependencia sin ciudad («Approach», «Tower») es a propósito, para que las altitudes no se lean como datos reales de un aeropuerto.",
    "Los puntos GIKOS, TOLEX, RAPUD, MUVAN y ORSEK son **ficticios**.",
    "Los números van escritos como se dicen por radio: cada dígito por separado, salvo millares y centenas enteras (Doc 9432, 2.4.2 y 2.4.3). «Decimal» en las frecuencias (Doc 9432, 2.4.1).",
    "Lo que está en las fuentes cargadas se cita. La fraseología que no está en ellas (emergencias, MINIMUM FUEL, MAYDAY FUEL, TCAS RA, CPDLC, CLIMB VIA SID, espera, falla de comunicaciones, control de velocidad, desvíos por meteorología) aparece marcada al final con **(VERIFICAR: …)** y en el bloque FUENTES de cada capítulo. No la tomes como verificada hasta confirmarla.",
    "Los ejemplos rotulados **PLAIN LANGUAGE** no son fraseología normalizada: son lenguaje claro, que el Doc 9432 (3.2.3 y 3.2.4) y el Doc 9835 (4.3.3 y 4.3.4) exigen claro, conciso y sin ambigüedad.",
    "La fraseología puede variar según el Estado. En Colombia, consultar AIP GEN 3.4 y los RAC. Ninguna respuesta de este nivel reemplaza el SOP de tu aerolínea.",
    "Las fuentes cargadas son el Doc 9432 (4.ª ed., 2007) y el Doc 4444 (15.ª ed., Enm. 4, 2012). La 15.ª edición del Doc 4444 **no es la vigente** (existe la 16.ª, de 2016, con enmiendas): toda cita del Doc 4444 debe confirmarse contra la edición en vigor.",
  ],
}

/** El detalle técnico de FUENTES de cada lección. */
function fuentes(cita: string, verificado: string, porVerificar: string[], notas: string[] = []): DocBlockData {
  const bloques: DocBlockData[] = [
    { kind: "sub", text: "Verificado" },
    { kind: "p", text: verificado },
  ]
  if (porVerificar.length > 0) {
    bloques.push({ kind: "sub", text: "Por verificar" }, { kind: "list", items: porVerificar })
  }
  if (notas.length > 0) {
    bloques.push({ kind: "sub", text: "Notas" }, { kind: "list", items: notas })
  }
  bloques.push({ kind: "sub", text: "Convenciones de los ejemplos" }, CONVENCIONES)
  return { kind: "detalleTecnico", etiqueta: "Fuentes", cita, bloques }
}

export const NIVEL_8: DocScreen[] = [
  // ── 62 ──────────────────────────────────────────────────────────────────
  {
    n: 62,
    title: "Fraseología que debes dominar",
    kicker: "No recitar frases: reconocer intención, límite y respuesta",
    minutes: 24,
    blocks: [
      {
        kind: "p",
        text: "Este repaso reúne veintidós momentos de una operación de línea, desde la autorización inicial hasta una contingencia. **No son transmisiones reales ni una ruta publicada**: cada fila es una situación de estudio sin indicativos, frecuencias, puntos o cifras inventadas. El objetivo no es memorizar un libreto, sino detectar el destinatario, la acción autorizada, sus condiciones, la colación necesaria y el instante en que la cabina debe pedir aclaración o declarar incapacidad.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-62-01.svg",
        alt: "Secuencia de cuatro preguntas para responder una instrucción ATC: quién, qué, bajo qué límite y qué confirma o solicita la tripulación.",
        ancho: 1600,
        alto: 900,
        pie: "Guía didáctica, no fraseología prescrita. Antes de actuar, identificar destinatario, acción, límite y respuesta; luego comprobar que la selección y el movimiento del avión coincidan.",
      },
      { kind: "sub", text: "Antes de que el avión se mueva" },
      {
        kind: "table",
        head: ["Situación", "Dato que debes retener", "Respuesta y decisión"],
        rows: [
          ["1. Autorización de ruta", "Límite, ruta o salida publicada, nivel inicial, restricciones y código si se emite.", "Registrar y colacionar los elementos críticos; contrastar con la documentación vigente. La ruta no autoriza entrar en pista."],
          ["2. Puesta en marcha", "Quién concede o coordina, condiciones y demora.", "Distinguir «espere» de aprobación; coordinar con personal de tierra según el procedimiento local."],
          ["3. Retroceso", "Aprobación, dirección o condición aplicable.", "No iniciar con una expectativa ni con una solicitud propia. Confirmar la aprobación real."],
          ["4. Rodaje", "Ruta, límite, pista asignada y cualquier instrucción de esperar fuera.", "Colacionar límites de pista y detenerse en el punto indicado. No inferir un cruce de una autorización de rodaje."],
          ["5. Cruce de pista", "Pista específica y autorización expresa.", "Verificar pista, trayectoria y tráfico; colacionar el cruce antes de ingresar."],
          ["6. Alinear y esperar", "Pista e instrucción de alineación sin permiso de despegue.", "Entrar solo cuando corresponda y permanecer a la espera de la autorización de despegue."],
          ["7. Despegue", "Pista exacta y autorización inequívoca.", "Colacionar pista y despegue; verificar que la instrucción sea para el distintivo propio."],
        ],
      },
      { kind: "sub", text: "Del ascenso al crucero" },
      {
        kind: "table",
        head: ["Situación", "Dato que debes retener", "Respuesta y decisión"],
        rows: [
          ["8. Transferencia de frecuencia", "Dependencia a contactar y frecuencia recibida.", "Colacionar la frecuencia, ajustar el equipo y establecer el contacto; si falla, seguir el procedimiento publicado."],
          ["9. Cambio de nivel", "Nuevo nivel y cualquier condición de inicio o límite.", "Colacionar completo, cotejar el selector y vigilar la captura. Una selección anticipada no permite ejecutar antes de la condición."],
          ["10. Rumbo o vector", "Dirección del viraje, rumbo asignado y fin de la instrucción.", "Colacionar el rumbo y verificar que la trayectoria responda."],
          ["11. Directo", "Punto autorizado y si modifica otras restricciones.", "Confirmar el punto en la fuente de navegación y resolver qué partes de la autorización anterior siguen vigentes."],
          ["12. Velocidad", "Valor, unidad, condición y capacidad real.", "Colacionar y evaluar si es alcanzable sin comprometer la operación; comunicar UNABLE si no lo es."],
          ["13. Reporte de posición", "Posición verificada, hora/nivel y siguiente dato requerido.", "Transmitir solo información comprobada, según el servicio y procedimiento aplicables."],
          ["14. Desvío meteorológico", "Distancia, dirección y límite autorizado para apartarse de la ruta.", "Solicitar espacio y expresar necesidad concreta; no convertir una petición en aprobación."],
        ],
      },
      { kind: "sub", text: "Llegada y cierre" },
      {
        kind: "table",
        head: ["Situación", "Dato que debes retener", "Respuesta y decisión"],
        rows: [
          ["15. Llegada publicada", "Transición, restricción y punto hasta donde existe autorización.", "Cotejar la publicación vigente y la instrucción nueva; la llegada no concede por sí sola aproximación ni aterrizaje."],
          ["16. Espera", "Punto, dirección, tiempos o distancias y nivel autorizado.", "Copiar todos los elementos; pedir aclaración si alguno queda indeterminado."],
          ["17. Aproximación", "Tipo, pista y límite de autorización.", "Verificar que la aproximación autorizada coincide con preparación y equipos; colacionar lo requerido."],
          ["18. Motor y al aire", "Nueva trayectoria, nivel y dependencia.", "Volar el procedimiento o la instrucción aplicable, comunicar y cotejar sin sacrificar el control del avión."],
          ["19. Aterrizaje", "Pista y permiso explícito para aterrizar.", "No confundir estar establecido o ser número uno con autorización. Colacionar la pista."],
          ["20. Salida de pista", "Punto de salida, límite de rodaje y cambio de frecuencia.", "Confirmar que se ha liberado la pista; seguir la instrucción de superficie vigente."],
        ],
      },
      { kind: "sub", text: "Cuando el plan deja de funcionar" },
      {
        kind: "table",
        head: ["Situación", "Dato que debes retener", "Respuesta y decisión"],
        rows: [
          ["21. Incapacidad", "Qué instrucción no se puede cumplir y por qué afecta la trayectoria.", "Comunicar UNABLE temprano y solicitar una alternativa viable. No aceptar por cortesía."],
          ["22. Socorro o urgencia", "Naturaleza, capacidad, ayuda requerida e intención actual.", "Priorizar el vuelo y emitir MAYDAY o PAN PAN cuando corresponda; actualizar a ATC al cambiar la capacidad."],
        ],
      },
      { kind: "sub", text: "Cómo practicar en voz alta" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Elegir una fila y describir sin números: «ATC me autorizó / instruyó / pidió…». Distinguir siempre petición de autorización.",
          "Decir qué parte debería colacionarse en ese contexto y qué dato faltante obligaría a SAY AGAIN o CONFIRM. Las palabras exactas y el idioma aplicable se comprueban en la publicación correspondiente.",
          "Explicar qué seleccionará y comprobará cada piloto según el procedimiento del operador; después, qué respuesta del avión confirmaría que se ejecuta lo autorizado.",
          "Añadir una variación: instrucción imposible, transmisión cubierta o corrección de ATC. Responder antes de ver la respuesta.",
        ],
      },
      {
        kind: "escenario",
        titulo: "Ensayo integral: instrucción condicionada",
        situacion: "Ejercicio didáctico, no tráfico ni ruta reales. Una tripulación espera descender durante la llegada. ATC asigna un nivel inferior, pero especifica que el descenso comienza solo después de una condición. Mientras el piloto que monitorea colaciona, el piloto que vuela programa el nivel. El avión empieza a descender antes de que la condición se cumpla.",
        preguntas: [
          { q: "¿Qué debía incluir la colación?", a: "El nivel y la condición, con el indicativo. Si no se oyó completa, se pide repetición antes de actuar." },
          { q: "¿Cuál es la diferencia entre preparar y ejecutar?", a: "Según el SOP puede prepararse la selección; la maniobra no se inicia hasta que la autorización sea efectiva. La cabina debe vigilar modo y trayectoria." },
          { q: "¿Cómo se recupera?", a: "Se señala y corrige la desviación conforme al procedimiento, se informa a ATC si corresponde y se confirma cuál autorización sigue vigente." },
        ],
        concepto: "Fraseología, selección y trayectoria son tres verificaciones diferentes.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Alcance de las fuentes",
        text: "Los ejemplos verbales publicados por FAA ilustran prácticas de Estados Unidos, no reemplazan fraseología, AIP/eAIP ni procedimientos colombianos vigentes. Aquí no se asigna una frecuencia ni se dibuja una carta ficticia.",
      },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Veintidós momentos, una disciplina: destinatario, acción, condición, respuesta y verificación.",
          "Autorizaciones de ruta, rodaje, aproximación y aterrizaje tienen límites distintos.",
          "Una colación no sustituye cotejar selector, modo y trayectoria.",
          "La incapacidad y la duda se comunican temprano.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "FAA AIM §§4-3, 4-4 y 6-3 · Aerocivil/eAIP",
        bloques: [
          { kind: "p", text: "FAA, Aeronautical Information Manual §4-4-1, alcance de una autorización; §4-4-7, colación y responsabilidad del piloto: https://www.faa.gov/air_traffic/publications/aim_html/chap4_section_4.html" },
          { kind: "p", text: "FAA, Aeronautical Information Manual §4-3, rodaje, pista y comunicaciones en aeródromo: https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap4_section_3.html" },
          { kind: "p", text: "FAA, Aeronautical Information Manual §6-3-1, comunicaciones de socorro y urgencia: https://www.faa.gov/air_traffic/publications/aim_html/chap6_section_3.html" },
          { kind: "p", text: "Para aplicar procedimientos, dependencias, cartas y fraseología colombianos vigentes, consultar exclusivamente la AIP/eAIP oficial de Aerocivil y el manual del explotador. Las veintidós situaciones son ejercicios de reconocimiento, no transmisiones reales: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
        ],
      },
    ],
  },
  // ── 63 ──────────────────────────────────────────────────────────────────
  {
    n: 63,
    title: "Aviation English: práctica operacional",
    kicker: "Veinte decisiones, de superficie a contingencia",
    minutes: 25,
    blocks: [
      {
        kind: "p",
        text: "La competencia de inglés aeronáutico no se demuestra repitiendo un guion. Se demuestra al reconocer **qué quiere ATC, a quién se dirige, qué condición limita la acción y qué necesita decir la tripulación**. Estos veinte ejercicios son formulaciones didácticas con campos entre corchetes; **no son audios ni transcripciones reales**, no asignan rutas, pistas ni frecuencias, y no reemplazan fraseología del Estado o procedimientos del operador. Responde en voz alta antes de abrir cada solución.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-63-01.webp",
        alt: "Secuencia visual de tres escenas: piloto escucha una instrucción, controlador transmite desde la torre y dos pilotos comprueban juntos la interpretación.",
        ancho: 1672,
        alto: 941,
        pie: "Recreación didáctica, no una transmisión real: 1) escuchar destinatario y elementos críticos; 2) ATC comunica una instrucción o consulta; 3) la tripulación explica la intención, colaciona lo requerido y coteja la acción antes de ejecutarla.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Cómo usar los corchetes",
        text: "Los campos como [level] o [published fix] representan datos que deben provenir de una instrucción real y de una publicación vigente. No se pronuncian literalmente. Si faltan o no se oyen, la respuesta correcta es pedir repetición o confirmación, no inventarlos.",
      },
      { kind: "titulo", text: "Superficie y salida" },
      practica63({
        n: 1,
        situacion: "Rodaje inicial. La tripulación aún está en plataforma y recibe una ruta de rodaje.",
        atc: "Taxi to [holding point] via [taxiway].",
        quiere: "Ir solo hasta el límite indicado por la ruta autorizada.",
        respuesta: "Colacionar pista, ruta y cualquier límite; confirmar que el recorrido coincide con el plano oficial vigente del aeródromo.",
        explicacion: "Una autorización de rodaje no concede permiso para cruzar una pista.",
      }),
      practica63({
        n: 2,
        situacion: "Esperar fuera. Durante el rodaje aparece una pista antes del punto final.",
        atc: "Hold short of runway [number].",
        quiere: "Detener el avión antes de entrar en la pista identificada.",
        respuesta: "Colacionar la pista y mantener la posición hasta recibir instrucción adicional.",
        explicacion: "La instrucción prevalece sobre la expectativa de continuar.",
      }),
      practica63({
        n: 3,
        situacion: "Cruzar pista. Tras esperar fuera, llega una instrucción posterior.",
        atc: "Cross runway [number].",
        quiere: "Cruzar solo la pista nombrada.",
        respuesta: "Colacionar el cruce y comprobar que ambos pilotos identifican la pista correcta.",
        explicacion: "No basta con oír «cross»; la pista debe ser inequívoca.",
      }),
      practica63({
        n: 4,
        situacion: "Alinear y esperar. El avión está en el punto de espera y otro tráfico aún usa la pista.",
        atc: "Line up and wait runway [number].",
        quiere: "Entrar y alinearse, sin permiso para despegar.",
        respuesta: "Colacionar pista e instrucción; continuar atento a una autorización de despegue posterior.",
        explicacion: "LINE UP AND WAIT no equivale a CLEARED FOR TAKEOFF.",
      }),
      practica63({
        n: 5,
        situacion: "Despegue. La torre emite una autorización inequívoca para la pista asignada.",
        atc: "Cleared for takeoff runway [number].",
        quiere: "Despegar por la pista especificada si todo está listo.",
        respuesta: "Colacionar pista y despegue; identificar el propio indicativo y cualquier restricción adicional.",
        explicacion: "Si pista o indicativo no coinciden, aclarar antes de actuar.",
      }),
      practica63({
        n: 6,
        situacion: "Cambio de frecuencia. Después de salir, ATC instruye contacto con otra dependencia.",
        atc: "Contact [facility] on [published frequency].",
        quiere: "Cambiar y establecer contacto con la dependencia indicada.",
        respuesta: "Colacionar la frecuencia recibida y verificar su selección; si no hay contacto, aplicar el procedimiento de recuperación pertinente.",
        explicacion: "No se inventa una frecuencia ni se trata el silencio como autorización.",
      }),
      { kind: "titulo", text: "Ascenso, ruta y vigilancia" },
      practica63({
        n: 7,
        situacion: "Ascenso condicionado. En salida ATC asigna un nivel con una condición temporal.",
        atc: "Climb to [level] after [condition].",
        quiere: "El ascenso adicional comienza solo tras la condición.",
        respuesta: "Colacionar nivel y disparador; preparar la selección solo según SOP y vigilar la trayectoria.",
        explicacion: "La condición es parte de la autorización, no un comentario.",
      }),
      practica63({
        n: 8,
        situacion: "Detener el ascenso. ATC modifica el nivel antes de que la cabina alcance el anterior.",
        atc: "Stop climb at [level].",
        quiere: "El límite nuevo reemplaza el objetivo anterior.",
        respuesta: "Colacionar el nuevo nivel, cotejar la selección y observar la captura.",
        explicacion: "El riesgo aumenta si la cabina mantiene el valor esperado.",
      }),
      practica63({
        n: 9,
        situacion: "Vector de rumbo. La dependencia asigna dirección y rumbo.",
        atc: "Turn [direction] heading [assigned heading].",
        quiere: "Volver a una trayectoria controlada por vector.",
        respuesta: "Colacionar dirección y rumbo, cotejar selector y confirmar el viraje real.",
        explicacion: "Una cifra correcta en la radio no prueba un viraje correcto.",
      }),
      practica63({
        n: 10,
        situacion: "Directo a punto. ATC modifica la ruta previamente autorizada.",
        atc: "Proceed direct [published fix].",
        quiere: "Ir al punto autorizado, no al que la tripulación esperaba.",
        respuesta: "Confirmar identidad del punto en la base vigente y resolver si restricciones anteriores siguen aplicando.",
        explicacion: "Si hay dos puntos parecidos o falta un dato, pedir aclaración.",
      }),
      practica63({
        n: 11,
        situacion: "Control de velocidad. La velocidad asignada parece incompatible con la configuración actual.",
        atc: "Maintain [assigned speed].",
        quiere: "Mantener el valor pedido si es operacionalmente posible.",
        respuesta: "Evaluar capacidad y, si no puede cumplirse, informar UNABLE con una alternativa útil.",
        explicacion: "Aceptar en radio no elimina una limitación del avión.",
      }),
      practica63({
        n: 12,
        situacion: "Información de tránsito. ATC informa posición relativa de otro avión.",
        atc: "Traffic [clock position], [distance], [relative movement].",
        quiere: "Buscar o vigilar el tránsito descrito.",
        respuesta: "Solo comunicar TRAFFIC IN SIGHT si realmente está identificado; de lo contrario, decir que no hay contacto visual.",
        explicacion: "La información de tránsito no es por sí sola una instrucción de viraje.",
      }),
      practica63({
        n: 13,
        situacion: "Alerta de altitud. La dependencia advierte un posible conflicto con terreno.",
        atc: "Low altitude alert; check your altitude immediately.",
        quiere: "Comprobar sin demora la altitud y la trayectoria.",
        respuesta: "Priorizar control del avión, verificar altímetros y seguir la instrucción recibida según contexto.",
        explicacion: "No responder con un acuse vacío mientras el avión continúa bajo.",
      }),
      { kind: "titulo", text: "Llegada y contingencia" },
      practica63({
        n: 14,
        situacion: "Desvío meteorológico. El radar de la cabina muestra una zona convectiva en la ruta.",
        atc: "Say intentions.",
        quiere: "ATC solicita conocer qué planea hacer la tripulación.",
        respuesta: "Pedir una desviación concreta con lado, amplitud y motivo; esperar autorización o aplicar contingencia publicada si corresponde.",
        explicacion: "La petición no es permiso para abandonar la ruta.",
      }),
      practica63({
        n: 15,
        situacion: "Espera. La llegada se congestiona y ATC asigna una espera.",
        atc: "Hold at [published fix] as instructed.",
        quiere: "Mantenerse en el punto y patrón autorizados.",
        respuesta: "Copiar punto, sentido, nivel y límite; aclarar cualquier elemento incompleto y evaluar combustible.",
        explicacion: "No fabricar parámetros de espera que no se recibieron ni están publicados.",
      }),
      practica63({
        n: 16,
        situacion: "Corrección de un número. La colación inicial repite un dato distinto y ATC lo corrige.",
        atc: "Negative, I say again, [correct value].",
        quiere: "El dato anterior era incorrecto; ahora rige la corrección.",
        respuesta: "Repetir el valor corregido, actualizar registro y selector, y cotejar entre pilotos.",
        explicacion: "El hearback solo protege si la tripulación escucha la corrección.",
      }),
      practica63({
        n: 17,
        situacion: "Aproximación. La dependencia autoriza una aproximación publicada.",
        atc: "Cleared [published approach] runway [number].",
        quiere: "Ejecutar la aproximación especificada, respetando su alcance.",
        respuesta: "Colacionar la autorización aplicable, verificar procedimiento, transición y pista en material oficial.",
        explicacion: "Una autorización de aproximación no es autorización de aterrizaje.",
      }),
      practica63({
        n: 18,
        situacion: "Motor y al aire. La torre advierte que no puede mantenerse el aterrizaje.",
        atc: "Go around.",
        quiere: "Interrumpir el aterrizaje y volar la maniobra aplicable.",
        respuesta: "Primero controlar el avión, luego colacionar y confirmar cualquier vector o nivel nuevo.",
        explicacion: "No confundir una petición de reporte con la instrucción inmediata de motor y al aire.",
      }),
      practica63({
        n: 19,
        situacion: "Anormal: limitación nueva. Durante una falla, ATC ofrece una acción que el avión ya no puede cumplir.",
        atc: "Maintain [level] / say intentions.",
        quiere: "ATC aún no conoce la limitación actual de la tripulación.",
        respuesta: "Comunicar UNABLE, el efecto observable y la ayuda necesaria en inglés claro; actualizar la intención.",
        explicacion: "La prioridad de la falla depende de su efecto, no del nombre del componente.",
      }),
      practica63({
        n: 20,
        situacion: "Socorro o urgencia. La condición amenaza la seguridad y la tripulación necesita asistencia.",
        atc: "State nature of emergency and intentions.",
        quiere: "La dependencia necesita naturaleza, capacidad, intención y ayuda requerida.",
        respuesta: "Volar primero; declarar MAYDAY o PAN PAN según la condición, comunicar límites reales y pedir apoyo concreto.",
        explicacion: "No recitar un diagnóstico extenso ni aceptar una maniobra inviable.",
      }),
      {
        kind: "enLaOperacion",
        momento: "Evaluación oral de selección",
        texto: "El evaluador puede cambiar un solo elemento del mensaje después de tu primera interpretación. Una respuesta sólida identifica lo que cambió, separa la colación de la acción y dice cuándo pediría aclaración o avisaría UNABLE. La fluidez sin precisión no basta.",
        pasos: [
          "Parafrasear primero la intención en español en una frase.",
          "Responder en inglés de forma breve y con los datos realmente recibidos.",
          "Explicar el cotejo en cabina y la decisión si aparece una discrepancia.",
        ],
      },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "No convertir campos didácticos en datos de operación.",
          "Comprender la intención antes de buscar una frase elegante.",
          "Aclarar lo que no se oyó y rechazar lo que no se puede cumplir.",
          "Distinguir permiso, instrucción, consulta e información de tránsito.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "FAA AIM §§4-2, 4-3, 4-4, 6-3 · OACI Doc 9835",
        bloques: [
          { kind: "p", text: "FAA, Aeronautical Information Manual §4-2, indicativos y contacto; §4-4-7, colación de elementos críticos: https://www.faa.gov/air_traffic/publications/aim_html/chap4_section_4.html" },
          { kind: "p", text: "FAA, Aeronautical Information Manual §4-3, operaciones de superficie y pistas: https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap4_section_3.html" },
          { kind: "p", text: "FAA, Aeronautical Information Manual §6-3-1, comunicaciones de socorro y urgencia: https://www.faa.gov/air_traffic/publications/aim_html/chap6_section_3.html" },
          { kind: "p", text: "OACI, Doc 9835, 2.ª edición, lenguaje común para situaciones inesperadas: https://www4.icao.int/aelts/uploads/icao%20doc9835%202nd%20edition.pdf" },
          { kind: "p", text: "Las frases concretas, frecuencias, cartas y procedimientos colombianos vigentes se consultan exclusivamente en Aerocivil/eAIP y el SOP del explotador. Las escenas y preguntas de esta lección son material didáctico: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
        ],
      },
    ],
  },
  // ── 64 ──────────────────────────────────────────────────────────────────
  {
    n: 64,
    title: "Plain English: práctica",
    kicker: "Escenarios sin frase estándar suficiente",
    minutes: 9,
    blocks: [
      {
        kind: "p",
        text: "Diez situaciones en las que la fraseología normalizada no alcanza. El Doc 9432 (3.2.2) dice que la fraseología no pretende cubrir todas las situaciones, y el Doc 9835 (4.3.4) pide que el lenguaje claro se use «con claridad y concisión y evitando toda ambigüedad, como si se tratara de la fraseología normalizada». No es permiso para charlar (Doc 9432, 3.2.4): incluso en lenguaje común hay que hablar con fluidez, claridad y concisión (Doc 9835, 3.3.20).",
      },
      {
        kind: "secuencia",
        titulo: "La plantilla que funciona en casi todos los casos (vista en el capítulo 52)",
        numerada: true,
        items: [
          "**Qué pasa** (el problema, en una frase).",
          "**Qué puedes y qué no puedes hacer.**",
          "**Qué necesitas** (pista, nivel, rumbo, tiempo, servicios en tierra).",
          "**Qué vas a hacer** (intención).",
        ],
      },
      {
        kind: "p",
        text: "Todos los ejemplos en inglés de este capítulo son **PLAIN LANGUAGE**. Donde aparecen MAYDAY o PAN PAN, el prefijo va marcado para verificar. Si declarar socorro o urgencia lo decide el capitán con la QRH y el SOP; aquí se muestra la comunicación, no la decisión técnica.",
      },
      COMO_LEER,
      verificar(
        "Los prefijos MAYDAY y PAN PAN y el orden de los elementos del mensaje (64.1 y 64.2), la fraseología de turbulencia y de imposibilidad de mantener nivel en RVSM (64.6) y la de degradación de capacidad PBN (64.7) no están en las fuentes cargadas. Consultar Anexo 10 Vol. II cap. 5, Doc 9432 9.2 y 9.3 y Doc 4444 cap. 12 y 15.",
      ),
      {
        kind: "callout",
        tone: "info",
        title: "Valores didácticos",
        text: "Los límites de velocidad, tiempos y configuraciones de los ejemplos son didácticos; los reales salen de la QRH y el AFM del avión.",
      },
      ...caso64({
        titulo: "64.1 Pasajero gravemente enfermo",
        situacion: "En crucero, a 40 minutos del destino. Un pasajero inconsciente; hay un médico a bordo que pide aterrizar lo antes posible.",
        comunicar: "Que hay una emergencia médica, cuál es la gravedad, que quieres prioridad y servicios médicos al llegar.",
        turnos: [
          `PILOT: "PAN PAN, PAN PAN, PAN PAN, Bogota Control, Aviatory 452, medical emergency. One passenger unconscious, a doctor is on board. Request priority to Bogota and ambulance on arrival."`,
        ],
        porQue:
          "Cuatro frases cortas. El ATC sabe qué pasa, qué quiere y qué tiene que preparar en tierra. No hay diagnóstico ni historia: si el ATC necesita más (edad, estado), lo pregunta.",
        verificar: "Prefijo PAN PAN y orden del mensaje: Anexo 10 Vol. II cap. 5; Doc 9432 9.3 (no cargados).",
      }),
      ...caso64({
        titulo: "64.2 Olor a humo en cabina",
        situacion:
          "FL 360. La tripulación de cabina reporta olor a quemado cerca de la cocina trasera. No hay humo visible. La lista de verificación está en curso.",
        comunicar: "El problema, que la fuente no está identificada, que quieres descender y aterrizar pronto, y a dónde.",
        turnos: [
          `PILOT: "MAYDAY, MAYDAY, MAYDAY, Bogota Control, Aviatory 452, burning smell in the cabin, source unknown. Request immediate descent and diversion to Cali."`,
        ],
        porQue:
          "«Source unknown» le dice al ATC que el problema puede crecer. «Immediate descent» y el aeropuerto concreto le permiten actuar sin preguntar. Algunos operadores tratan todo olor o humo como socorro; otros dejan la decisión al capitán: es SOP, no fraseología.",
        verificar: "Prefijo MAYDAY y orden del mensaje: Anexo 10 Vol. II cap. 5; Doc 9432 9.2 (no cargados).",
      }),
      ...caso64({
        titulo: "64.3 Indicación de tren",
        situacion: "En aproximación, el tren izquierdo no marca abajo y asegurado.",
        comunicar: "La indicación, que necesitas tiempo para la lista y que quieres una inspección visual desde la torre.",
        turnos: [
          `PILOT: "Aviatory 452, unsafe left gear indication. Request to discontinue the approach and hold for one five minutes to complete the checklist. Then request low pass runway two seven for visual inspection."`,
        ],
        porQue:
          "«Unsafe left gear indication» y «request low pass» son las palabras del ejemplo del Doc 9432 (4.7.2), así que el controlador las reconoce. Da un tiempo concreto: el ATC puede planear 15 minutos, no «a while».",
      }),
      ...caso64({
        titulo: "64.4 Flaps que no retraen",
        situacion: "Después del despegue, los flaps quedan en 5 y no retraen. Tu velocidad máxima con esa configuración es 200 kt y el consumo sube.",
        comunicar: "Que no puedes acelerar, qué límite tienes y qué quieres hacer.",
        turnos: [
          `PILOT: "Aviatory 452, flaps are stuck, we cannot retract them. Maximum speed two zero zero knots. Request to level off at one two thousand feet and hold to complete the checklist. We will probably return to Bogota."`,
        ],
        porQue:
          "El ATC no necesita saber de hidráulica: necesita el límite de velocidad (le cambia la secuencia) y la intención probable. «We will probably return» anticipa sin comprometerse.",
      }),
      ...caso64({
        titulo: "64.5 Impacto con ave (bird strike)",
        situacion: "En la carrera de despegue sentiste un golpe en el motor derecho. Parámetros normales.",
        comunicar: "El impacto, el estado actual, que puede haber restos en la pista y tu intención.",
        turnos: [
          `PILOT: "Tower, Aviatory 452, bird strike on the right engine during take-off. Engine parameters are normal. There may be bird remains on the runway. Request to maintain five thousand feet and hold to evaluate."`,
        ],
        porQue:
          "Avisa lo que afecta a otros (restos en la pista) además de lo propio. «Parameters are normal» evita que el ATC active una emergencia que no declaraste. Si cambia algo, lo dices.",
      }),
      ...caso64({
        titulo: "64.6 Turbulencia severa",
        situacion: "FL 370. Turbulencia severa, no puedes mantener el nivel dentro de la tolerancia.",
        comunicar: "Que no puedes mantener el nivel, por qué y qué nivel pides.",
        turnos: [`PILOT: "Aviatory 452, severe turbulence, unable to maintain flight level three seven zero. Request descent to flight level three three zero."`],
        porQue:
          "Empieza con el dato que cambia la separación («unable to maintain»). La solicitud es concreta. Una notificación de turbulencia también sirve a los aviones que vienen detrás.",
        verificar: "Fraseología de turbulencia y de imposibilidad de mantener nivel en RVSM: Doc 4444 cap. 12 y 15 (no cargados).",
      }),
      ...caso64({
        titulo: "64.7 Degradación de navegación",
        situacion: "En la llegada, el FMS avisa que la precisión de navegación no cumple lo requerido y la aproximación prevista es RNP.",
        comunicar: "Que no puedes hacer el procedimiento RNAV/RNP y qué alternativa necesitas.",
        turnos: [`PILOT: "Approach, Aviatory 452, we have lost our RNP capability. Unable RNP approach. Request ILS approach runway two four, or vectors."`],
        porQue: "El problema en una frase, el UNABLE con motivo (Doc 9432, 2.8.3.10) y dos alternativas que el ATC puede elegir.",
        verificar: "Fraseología de degradación de capacidad PBN («unable RNP»): Doc 4444 cap. 12 (no cargado).",
      }),
      ...caso64({
        titulo: "64.8 Sospecha de daño en llanta",
        situacion: "Después del despegue, la torre informa restos de caucho en la pista. Crees que puede ser tu avión.",
        comunicar: "Que puede ser tuyo, que no tienes indicaciones (o las que tienes), que necesitas tiempo y qué harás al aterrizar.",
        turnos: [
          `PILOT: "Tower, Aviatory 452, we may have a burst tyre from our take-off. No abnormal indications at the moment. Request to hold at five thousand feet to burn fuel. Request fire services on standby for our landing."`,
        ],
        porQue:
          "Separa lo que sabes («no abnormal indications») de lo que sospechas («may have»). Pide lo que necesitarás con tiempo. «Standby» aquí es lenguaje claro («en espera de actuar»), no la palabra normalizada STANDBY.",
      }),
      ...caso64({
        titulo: "64.9 Falla hidráulica",
        situacion: "Aviso de pérdida de un sistema hidráulico en la llegada.",
        comunicar: "El problema, que necesitas tiempo y espacio, y dónde quieres quedarte.",
        turnos: [
          `ATC:   "Aviatory 452, state intentions."`,
          `PILOT: "We have a hydraulic problem. We need approximately ten minutes to complete the checklist and would like to remain in the present area."`,
        ],
        porQue:
          "Es el ejemplo del capítulo 51. Responde exactamente lo que el ATC preguntó (intención), da un tiempo y pide algo que el ATC puede dar (quedarte en la zona). No habla de presiones ni de sistemas.",
      }),
      ...caso64({
        titulo: "64.10 Evitar meteorología",
        situacion: "En la llegada, una celda sobre el punto al que te llevan los vectores.",
        comunicar: "Que no puedes seguir el rumbo asignado, qué rumbo necesitas y por cuánto.",
        turnos: [`PILOT: "Approach, Aviatory 452, unable heading two seven zero due weather. Request heading three zero zero for about one five miles."`],
        porQue: "UNABLE con motivo, luego la alternativa con número y duración. El ATC puede aprobar o darte otra opción sin preguntar nada más.",
      }),
      fuentes(
        "Doc 9432 · Doc 9835",
        "Doc 9432 (4.ª ed.) 2.8.3.10, 3.2.2, 3.2.4, 4.7.2, 4.7.3; Doc 9835 (2.ª ed.) 3.3.20, 4.3.3, 4.3.4.",
        [
          "VERIFICAR: prefijos MAYDAY y PAN PAN y el orden de los elementos del mensaje contra Anexo 10 Vol. II cap. 5 y Doc 9432 9.2 y 9.3 (no cargados).",
          "VERIFICAR: fraseología de turbulencia y de imposibilidad de mantener nivel en espacio RVSM contra Doc 4444 cap. 12 y 15 (no cargados).",
          "VERIFICAR: fraseología de degradación de capacidad PBN («unable RNP») contra Doc 4444 cap. 12 (no cargado).",
        ],
        ["Los límites de velocidad, tiempos y configuraciones de los ejemplos son didácticos; los reales salen de la QRH y el AFM del avión."],
      ),
    ],
  },
  // ── 65 ──────────────────────────────────────────────────────────────────
  {
    n: 65,
    title: "Escenarios ATC de entrevista",
    kicker: "Lo que preguntan y cómo se razona la respuesta",
    minutes: 14,
    blocks: [
      {
        kind: "p",
        text: "Dieciocho escenarios como los que se preguntan en una entrevista o en un simulador de selección. El evaluador no busca inglés elegante: busca que entiendas qué te piden, reconozcas si puedes cumplir, respondas corto y expliques tu razonamiento. Las respuestas esperadas van en inglés; el razonamiento, en español, es lo que debes poder explicar en voz alta.",
      },
      COMO_LEER,
      verificar(
        "Varios escenarios usan fraseología que no está en las fuentes cargadas: control de velocidad (65.2), desvío por meteorología (65.3), espera (65.9), MINIMUM FUEL y MAYDAY FUEL (65.10 y 65.11), TCAS RA (65.12), MAYDAY (65.13) y falla de comunicaciones con 121.5 MHz (65.15). Cada uno va marcado. Consultar Doc 4444 cap. 12 y 15 (edición vigente), Doc 9432 9.2, 9.5 y 11.6, Anexo 10 Vol. II cap. 5, Anexo 6 Parte I, 4.3.7 y el AIP del Estado.",
      ),
      ...escenario65({
        titulo: "65.1 No puedes subir por peso",
        escenario: "Avión pesado al inicio del crucero. El FMS da como nivel máximo FL 330.",
        atc: `"Aviatory 452, climb flight level three five zero."`,
        respuesta: `"Unable flight level three five zero due performance, Aviatory 452."`,
        razonamiento: `Si aceptas y el avión no llega, te quedas sin margen de maniobra y sin decírselo al ATC. UNABLE significa «no puedo cumplir» y normalmente va seguido del motivo (Doc 9432, 2.6). El Doc 9432 (2.8.3.10) trae el mismo caso con otro elemento: «unable to cross WICKEN FL 150 due weight». Puedes añadir lo que sí puedes: "Able flight level three three zero." (PLAIN LANGUAGE)`,
      }),
      ...escenario65({
        titulo: "65.2 No puedes con la velocidad (VERIFICAR)",
        escenario: "FL 180 en descenso. El ATC pide 200 kt y tu velocidad mínima limpia es 225 kt.",
        atc: `"Aviatory 452, reduce speed to two zero zero knots."`,
        respuesta: `"Unable two zero zero knots, minimum clean speed two two five knots, Aviatory 452." (VERIFICAR: Doc 4444 cap. 12, control de velocidad)`,
        razonamiento:
          "La tripulación informa al ATC si no puede cumplir una instrucción de velocidad (Doc 4444, 4.6.1.4). Dar tu mínima le permite al ATC resolver la separación sin adivinar. Otra opción es aceptar y sacar flaps si el SOP y la situación lo permiten; lo que no vale es aceptar sin cumplir.",
        verificar: "65.2: «reduce speed to» y «minimum clean speed» como respuesta del piloto. Consultar Doc 4444 cap. 12 (no cargado).",
      }),
      ...escenario65({
        titulo: "65.3 Pedir desvío por meteorología (VERIFICAR)",
        escenario: "FL 350. Celda en ruta; paso libre 15 NM a la izquierda.",
        atc: "(silencio; tú inicias)",
        respuesta: `"Control, Aviatory 452, request deviation up to one five miles left of track due weather." (VERIFICAR: Doc 4444 cap. 12 y 15)`,
        razonamiento: `Pides con tiempo, antes de estar encima de la celda. Lado, distancia y motivo en una línea. Si el ATC dice «unable», preguntas por la alternativa: "Say alternative." (PLAIN LANGUAGE)`,
        verificar: "65.3: «request deviation up to (distancia) left of track due weather». Consultar Doc 4444 cap. 12 y 15 (no cargados).",
      }),
      ...escenario65({
        titulo: "65.4 Cambio de pista en rodaje",
        escenario: "Rodando a la 24. El viento cambió.",
        atc: `"Aviatory 452, recleared holding point runway one four, taxi behind the B737 coming from your left."`,
        respuesta: `"Recleared holding point runway one four, traffic in sight, Aviatory 452."`,
        razonamiento: `Modelo del Doc 9432 (4.4.2). RECLEARED anula lo anterior (Doc 9432, 2.6). Colacionas la pista nueva y, antes de llegar al punto de espera, los dos pilotos cambian y verifican en el FMS la pista, la SID y los datos de despegue. Si no alcanzan a prepararse, lo dicen: "Aviatory 452, we need two minutes at the holding point to complete the new runway briefing." (PLAIN LANGUAGE)`,
      }),
      ...escenario65({
        titulo: "65.5 Cambio de pista en la llegada",
        escenario: "A 25 NM, preparado para ILS 24. El ATC cambia a la 06.",
        atc: `"Aviatory 452, expect ILS approach runway zero six."`,
        respuesta: `"Expecting ILS approach runway zero six, Aviatory 452." Y si no alcanzas a prepararla: "Aviatory 452, request vectors to allow time to set up the new approach." (PLAIN LANGUAGE)`,
        razonamiento:
          "La pista se colaciona siempre (Doc 4444, 4.5.7.5.1 c). Aceptar un cambio y hacerlo mal preparado es peor que pedir unos minutos. El evaluador busca que reconozcas tu carga de trabajo.",
      }),
      ...escenario65({
        titulo: "65.6 Confusión en rodaje",
        escenario: "Aeropuerto nuevo para ti, de noche. No estás seguro de si el giro a la izquierda es Bravo o Charlie.",
        atc: "(ninguna; estás rodando)",
        respuesta: `Te detienes y llamas: "Ground, Aviatory 452, holding position on Alpha, confirm next turn left on Bravo." (PLAIN LANGUAGE sobre la base de HOLD POSITION y CONFIRM)`,
        razonamiento:
          "En tierra, detenerse es seguro; seguir con dudas no. CONFIRM es «solicito verificación» (Doc 9432, 2.6). Una duda en rodaje cerca de una pista es exactamente la situación que el Doc 9432 (4.5.2) pide evitar: que algo se interprete como autorización para entrar a una pista.",
      }),
      ...escenario65({
        titulo: "65.7 Distintivo parecido",
        escenario: "En la frecuencia están Aviatory 452 (tú) y Aviatory 542.",
        atc: `"Aviatory 542, descend flight level two four zero."`,
        respuesta: `Ninguna. No es para ti. Si no oíste bien el número: "Control, Aviatory 452, confirm descent clearance was for Aviatory 452?" (PLAIN LANGUAGE sobre la base de CONFIRM)`,
        razonamiento:
          "Tu colación termina con tu distintivo precisamente para que el ATC detecte si respondió el avión equivocado (Doc 9432, 2.8.3.4 y 2.8.3.7). Si la confusión se repite, el ATC puede ordenar un cambio temporal del tipo de distintivo (Doc 9432, 2.7.2.3). Un distintivo con número de vuelo no se abrevia (Doc 9432, 2.7.2.2 c).",
      }),
      ...escenario65({
        titulo: "65.8 Transmisión bloqueada",
        escenario: "Esperabas la autorización de descenso y oíste un chillido con palabras sueltas.",
        atc: `"…vi…452…scend…"`,
        respuesta: `"Aviatory 452, say again."`,
        razonamiento: `No completes con lo que esperabas oír. SAY AGAIN pide repetir todo (Doc 9432, 2.8.1.4). Si solo perdiste una parte, pides esa parte: "Say again level." (PLAIN LANGUAGE sobre la base de «say again (item)», Doc 9432, 2.8.1.4).`,
      }),
      ...escenario65({
        titulo: "65.9 Espera con combustible limitado (VERIFICAR)",
        escenario: "El ATC te manda a esperar sin hora. Puedes esperar 20 minutos antes de ir al alterno.",
        atc: `"Aviatory 452, hold at GIKOS, flight level one five zero, inbound track two seven zero degrees, right hand pattern, expect further clearance at five zero."`,
        respuesta: `Colación completa y luego: "Aviatory 452, we can accept two zero minutes of holding, then we will divert to Cali." (PLAIN LANGUAGE) (VERIFICAR: Doc 4444 cap. 12, espera)`,
        razonamiento: "El ATC no sabe tu combustible. Decirlo pronto evita llegar al MINIMUM FUEL o a la emergencia por no haber hablado.",
        verificar: "65.9: fraseología de espera y «expect further clearance at». Consultar Doc 4444 cap. 12 (no cargado).",
      }),
      ...escenario65({
        titulo: "65.10 Combustible mínimo (VERIFICAR)",
        escenario: "Cualquier demora más te obligaría a aterrizar con menos que la reserva final.",
        atc: `"Aviatory 452, expect one five minutes delay."`,
        respuesta: `"Aviatory 452, minimum fuel." (VERIFICAR: Doc 4444 cap. 12 y 15; Anexo 6 Parte I, 4.3.7)`,
        razonamiento:
          "MINIMUM FUEL avisa que ya no puedes aceptar demoras adicionales (Doc 4444, cap. 1, definición de combustible mínimo). No es emergencia ni da prioridad. Si la situación sigue empeorando, el siguiente paso es declarar emergencia de combustible.",
        verificar: "65.10: «MINIMUM FUEL». Consultar Doc 4444 cap. 12 y 15 (edición vigente) y Anexo 6 Parte I, 4.3.7 (no cargados).",
      }),
      ...escenario65({
        titulo: "65.11 Emergencia de combustible (VERIFICAR)",
        escenario: "Calculas que aterrizarás con menos que la reserva final.",
        atc: `"Aviatory 452, continue holding, expect further clearance at one five."`,
        respuesta: `"MAYDAY, MAYDAY, MAYDAY, fuel, Aviatory 452, request immediate approach runway two four." (VERIFICAR: Doc 4444 cap. 12 y 15; Anexo 6 Parte I, 4.3.7)`,
        razonamiento:
          "No aceptas la espera: ya no puedes. MAYDAY FUEL es una declaración de socorro y cambia la prioridad. El criterio exacto (reserva final) lo fija el Anexo 6 y el operador.",
        verificar: "65.11: «MAYDAY MAYDAY MAYDAY FUEL». Consultar Doc 4444 cap. 12 y 15 (edición vigente) y Anexo 6 Parte I, 4.3.7 (no cargados).",
      }),
      ...escenario65({
        titulo: "65.12 TCAS RA (VERIFICAR)",
        escenario: "Descendiendo a FL 160. El TCAS da un RA de ascenso.",
        atc: `"Aviatory 452, continue descent to flight level one two zero."`,
        respuesta: `Sigues el RA y dices: "Aviatory 452, unable, TCAS RA." Terminado: "Aviatory 452, clear of conflict, returning to flight level one two zero." (VERIFICAR: Doc 4444 cap. 12 y 15; Doc 9432 11.6)`,
        razonamiento:
          "Durante un RA manda el RA, no la instrucción del ATC. Se comunica cuando la carga de trabajo lo permite, corto, y se vuelve a la última autorización una vez libre del conflicto.",
        verificar: "65.12: «unable, TCAS RA» y «clear of conflict, returning to». Consultar Doc 4444 cap. 12 y 15 y Doc 9432 11.6 (no cargados).",
      }),
      ...escenario65({
        titulo: "65.13 Emergencia: fuego de motor (VERIFICAR)",
        escenario: "Ascenso inicial. Fuego motor 1. Memoria y lista en curso.",
        atc: `"Aviatory 452, contact Control one two eight decimal seven five."`,
        respuesta: `"MAYDAY, MAYDAY, MAYDAY, Aviatory 452, engine fire number one, request to remain this frequency, returning to land runway one three left." (VERIFICAR: Anexo 10 Vol. II cap. 5; Doc 9432 9.2)`,
        razonamiento:
          "Cambiar de frecuencia en medio de la emergencia significa explicarlo todo otra vez. Con la emergencia declarada, el ATC decide. Primero se vuela el avión: el MAYDAY sale cuando el PF tiene el control.",
        verificar: "65.13: estructura de MAYDAY. Consultar Anexo 10 Vol. II cap. 5 y Doc 9432 9.2 (no cargados).",
      }),
      ...escenario65({
        titulo: "65.14 Motor y al aire por inestable",
        escenario: "A 800 ft, la aproximación no cumple tus criterios de estabilización.",
        atc: "(silencio; tú inicias)",
        respuesta: `"Aviatory 452, going around."`,
        razonamiento:
          "El Doc 9432 (4.8.3) pide la frase GOING AROUND cuando el piloto inicia la maniobra. Si el ATC no da otra cosa, sigues la frustrada publicada (Doc 9432, 4.8.2). En la entrevista, di también por qué: la decisión de ir al aire no se negocia por radio.",
      }),
      ...escenario65({
        titulo: "65.15 Pérdida de comunicaciones (VERIFICAR)",
        escenario: "Diez minutos sin oír nada en la frecuencia, que antes estaba ocupada.",
        atc: "(nada)",
        respuesta: `Revisas frecuencia seleccionada, volumen, panel de audio y el otro radio. Pruebas la frecuencia anterior: "Bogota Control, Aviatory 452, radio check one two eight decimal seven five." Si no hay respuesta, pruebas otra dependencia o 121.5 y, sin contacto, seleccionas 7600 y aplicas el procedimiento de falla de comunicaciones del Estado. (VERIFICAR: Anexo 10 Vol. II cap. 5; Doc 9432 9.5; AIP)`,
        razonamiento:
          "La prueba de radio sigue el Doc 9432 (2.8.4.1): estación, aeronave, «radio check» y frecuencia. El 7600 lo dice el Doc 9432 (6.6, nota). Lo que se hace después (niveles, rutas, tiempos) es procedimiento de la OACI adaptado por cada Estado: dilo así en la entrevista.",
        verificar:
          "65.15: procedimiento de falla de comunicaciones y uso de 121.5 MHz. Consultar Anexo 10 Vol. II cap. 5, Doc 9432 9.5, Doc 4444 cap. 15 y el AIP del Estado (no cargados).",
      }),
      ...escenario65({
        titulo: "65.16 Autorización condicional con tránsito que no ves",
        escenario: "En el punto de espera. Torre condiciona tu entrada a un Airbus que no encuentras.",
        atc: `"Aviatory 452, behind the landing Airbus, line up and wait behind."`,
        respuesta: `"Aviatory 452, negative contact with the Airbus." (PLAIN LANGUAGE sobre la base de «negative contact», Doc 9432, 6.4.2)`,
        razonamiento:
          "Una autorización condicional sobre movimientos en pista solo se usa si el tránsito está a la vista del controlador y del piloto (Doc 9432, 4.5.7). Si no lo ves, aceptarla es entrar a la pista a ciegas. El Doc 9432 también advierte que el tipo de avión puede no bastar para identificarlo.",
      }),
      ...escenario65({
        titulo: "65.17 Salida inmediata cuando no estás listo",
        escenario: "Rodando al punto de espera, lista de antes del despegue sin terminar.",
        atc: `"Aviatory 452, are you ready for immediate departure?"`,
        respuesta: `"Negative, Aviatory 452." Si quieres, con el tiempo: "Ready in two minutes." (PLAIN LANGUAGE)`,
        razonamiento:
          "NEGATIVE es «no» (Doc 9432, 2.6). El Doc 9432 (4.5.5) muestra la respuesta afirmativa «AFFIRM». Decir que sí para ayudar al ATC y entrar a la pista con la lista a medias es el error que el evaluador quiere ver si cometes.",
      }),
      ...escenario65({
        titulo: "65.18 Tu colación sale mal",
        escenario: "Colacionaste el código SSR con un dígito cambiado.",
        atc: `"Aviatory 452, negative, I say again, squawk six four one one."`,
        respuesta: `"Squawk six four one one, Aviatory 452." y compruebas el transpondedor.`,
        razonamiento:
          "El controlador escucha la colación y corrige con NEGATIVE I SAY AGAIN (Doc 9432, 2.8.3.8 y 2.8.3.9). El código SSR se colaciona siempre (Doc 4444, 4.5.7.5.1 c). El error no fue equivocarse: habría sido no oír la corrección.",
      }),
      fuentes(
        "Doc 9432 · Doc 4444",
        "Doc 9432 (4.ª ed.) 2.6, 2.7.2.2, 2.7.2.3, 2.8.1.4, 2.8.3.4, 2.8.3.7 a 2.8.3.10, 2.8.4.1, 4.4.2, 4.5.2, 4.5.5, 4.5.7, 4.8.2, 4.8.3, 6.4.2, 6.6 y nota; Doc 4444 (15.ª ed., Enm. 4) cap. 1 (definición de combustible mínimo), 4.5.7.5.1, 4.6.1.4.",
        [
          "VERIFICAR: «reduce speed to», «minimum clean speed» como respuesta del piloto contra Doc 4444 cap. 12 (no cargado).",
          "VERIFICAR: «request deviation up to (distancia) left of track due weather» contra Doc 4444 cap. 12 y 15 (no cargados).",
          "VERIFICAR: fraseología de espera y «expect further clearance at» contra Doc 4444 cap. 12 (no cargado).",
          "VERIFICAR: «MINIMUM FUEL» y «MAYDAY MAYDAY MAYDAY FUEL» contra Doc 4444 cap. 12 y 15 (edición vigente) y Anexo 6 Parte I, 4.3.7 (no cargados).",
          "VERIFICAR: «unable, TCAS RA», «clear of conflict, returning to» contra Doc 4444 cap. 12 y 15 y Doc 9432 11.6 (no cargados).",
          "VERIFICAR: estructura de MAYDAY contra Anexo 10 Vol. II cap. 5 y Doc 9432 9.2 (no cargados).",
          "VERIFICAR: procedimiento de falla de comunicaciones y uso de 121.5 MHz contra Anexo 10 Vol. II cap. 5, Doc 9432 9.5, Doc 4444 cap. 15 y el AIP del Estado (no cargados).",
        ],
      ),
    ],
  },
  // ── 66 ──────────────────────────────────────────────────────────────────
  {
    n: 66,
    title: "Errores frecuentes de hispanohablantes",
    kicker: "Los que tienen consecuencia operacional",
    minutes: 10,
    blocks: [
      {
        kind: "p",
        text: "Este capítulo no trata del acento. Un acento hispano es normal en la radio y no es un error: el Doc 9835 evalúa la pronunciación por si **interfiere con la comprensión**, no por si suena nativa. Aquí solo entran errores que pueden cambiar lo que el controlador entiende o hacer más lenta la comunicación. Casi todos vienen de lo mismo: pensar la frase en español y traducirla.",
      },
      {
        kind: "p",
        text: "El Doc 9835 (2.3.4.2, Cuadro 2-1) da el mapa: **errores de codificación** (mala elección de vocabulario o sintaxis, mensaje poco directo por cortesía, giros informales, jerga) y **errores de enunciación** (velocidad, pausas, pronunciación, acentuación). Los que siguen son de esos dos tipos.",
      },
      COMO_LEER,
      verificar(
        "Tres puntos de este capítulo no están en las fuentes cargadas: las grafías inglesas «TREE», «FIFE» y «NINER» y la tabla de pronunciación en inglés (Anexo 10 Vol. II cap. 5 y la versión en inglés del Doc 9432, 2.4); el motivo por el que la OACI eligió AFFIRM y no «affirmative»; y el descriptor de pronunciación de la escala de la OACI (Doc 9835, Apéndice A).",
      ),
      ...error66({
        titulo: "66.1 «Affirmative» en lugar de AFFIRM",
        seOye: `"Affirmative, Aviatory 452."`,
        correcto: `"Affirm, Aviatory 452."`,
        porQue:
          "En la tabla de palabras normalizadas del Doc 9432 (2.6), la columna en español trae «AFIRMO/AFIRMATIVO» y la columna en inglés trae solo **AFFIRM**, con el significado «Sí». El ejemplo de 4.5.5 lo confirma: «G-CD AFIRMATIVO (G-CD AFFIRM)». En español las dos formas son válidas; en inglés, no. El hispanohablante traduce «afirmativo» y dice «affirmative». Lo que el texto cargado no da es el motivo de la elección; la explicación habitual (que «affirmative» y «negative» terminan igual y se confunden con mala recepción) no está en las fuentes cargadas y no se presenta aquí como norma.",
      }),
      ...error66({
        titulo: "66.2 ROGER para contestar una pregunta",
        seOye: `ATC: "Aviatory 452, are you ready for immediate departure?" PILOT: "Roger."`,
        correcto: `"Affirm, Aviatory 452."  o  "Negative, Aviatory 452."`,
        porQue:
          "ROGER significa «he recibido toda su transmisión» y en ningún caso se usa para contestar una pregunta que exige un sí o un no (Doc 9432, 2.6, nota a RECIBIDO). «Roger» no dice si estás listo.",
      }),
      ...error66({
        titulo: "66.3 ROGER en lugar de colacionar o de WILCO",
        seOye: `ATC: "Aviatory 452, climb to flight level two four zero." PILOT: "Roger, Aviatory 452."`,
        correcto: `"Climbing to flight level two four zero, Aviatory 452."`,
        porQue:
          "Las instrucciones de nivel se colacionan siempre (Doc 4444, 4.5.7.5.1 c). ROGER solo dice que recibiste; WILCO dice que comprendiste y cumplirás (Doc 9432, 2.6). Ninguno de los dos le muestra al controlador **qué** entendiste.",
      }),
      ...error66({
        titulo: "66.4 Números: dígitos, no cifras en inglés corriente",
        seOye: `"Runway thirty", "flight level two forty", "heading one twenty".`,
        correcto: `"Runway three zero", "flight level two four zero", "heading one two zero".`,
        porQue:
          "Todos los números se dicen dígito por dígito, salvo los millares y las centenas enteras de altitud, altura de nubes, visibilidad y RVR (Doc 9432, 2.4.2 y 2.4.3). «Thirty» y «thirteen» se confunden con facilidad; «three zero» y «one three», no. Lo mismo con «fifty» y «fifteen».",
      }),
      ...error66({
        titulo: "66.5 La pronunciación de 3, 5 y 9",
        seOye: "«three», «five» y «nine» dichos deprisa y a medias, como en una conversación, sin marcar cada sílaba.",
        correcto: "La pronunciación que da el Doc 9432 (2.4.1): 3 = TRI, 5 = FA-IF, 9 = NAI-na, con el énfasis en la sílaba en mayúsculas.",
        correctoEsFrase: false,
        porQue:
          "No hay que inventar reglas: el Doc 9432 da esa tabla en la edición en español, con una transcripción aproximada para hispanohablantes. La idea es que cada dígito suene inconfundible, no que suene británico o estadounidense. Las grafías inglesas «TREE», «FIFE» y «NINER» aparecen en otros documentos de la OACI que no están cargados.",
        verificar: "Grafías «TREE», «FIFE» y «NINER» y la tabla de pronunciación en inglés: Anexo 10 Vol. II cap. 5 y la versión en inglés del Doc 9432, 2.4 (no cargados).",
      }),
      ...error66({
        titulo: "66.6 «Coma» en las frecuencias",
        seOye: `"One two one comma seven five" o "one two one point seven five".`,
        correcto: `"One two one decimal seven five."`,
        porQue:
          "El elemento se llama «decimal» en la tabla de pronunciación (Doc 9432, 2.4.1). La versión en español del Doc 9432 dice «coma» (2.4.4), pero en inglés el separador es «decimal»: es un calco del español.",
      }),
      ...error66({
        titulo: "66.7 Heading, track y course",
        seOye: `"Request course two seven zero" cuando se quiere un rumbo.`,
        correcto: `"Request heading two seven zero."`,
        porQue:
          "En español decimos «rumbo» para casi todo. En la radio no es lo mismo: **heading** es hacia dónde apunta la nariz (el Doc 9432, 6.1.2, dice que se expresan en grados magnéticos) y **track** es la trayectoria sobre el terreno (el Doc 9432 traduce «TRACK 070» como «DERROTA 070», 6.3.3). «Course» no aparece en la fraseología cargada. Pedir «course» cuando quieres «heading» deja al controlador sin saber qué vas a volar con viento cruzado.",
      }),
      ...error66({
        titulo: "66.8 «Ascend» y «go down»",
        seOye: `"Request to ascend to flight level three five zero", "we are going down to…".`,
        correcto: `"Request climb to flight level three five zero."  /  "Leaving flight level two four zero, descending to flight level one two zero."`,
        porQue:
          "La fraseología usa **CLIMB** y **DESCEND** (Doc 9432, 3.3.3.1). En el texto cargado «ascend» no aparece en inglés; es un calco de «ascender». Las palabras normalizadas se reconocen aunque la recepción sea mala; las demás, no.",
      }),
      ...error66({
        titulo: "66.9 Frases largas y cortesía",
        seOye: `"Good morning Bogota, Aviatory 452, we would like to request, if it is possible, a descent to flight level two four zero, please, thank you very much."`,
        correcto: `"Bogota Control, Aviatory 452, request descent to flight level two four zero."`,
        porQue:
          "El Doc 9432 (3.1.4) pide evitar las expresiones de cortesía. El Doc 9835 (Cuadro 2-1) cuenta como error de codificación el «mensaje poco directo por consideraciones de cortesía». En español la cortesía es respeto; en la frecuencia, cada segundo de más es un segundo que otro avión no puede transmitir.",
      }),
      ...error66({
        titulo: "66.10 Palabras informales en lugar de las normalizadas",
        seOye: `"Okay", "copy", "yes", "no", "no problem", "go ahead with that".`,
        correcto: "ROGER, WILCO, AFFIRM, NEGATIVE, o la colación (Doc 9432, 2.6).",
        correctoEsFrase: false,
        porQue:
          "«Okay» puede significar «recibido», «de acuerdo» o «lo haré», y el controlador no sabe cuál. El Doc 9835 (Cuadro 2-1) cuenta los giros informales y la jerga como error de codificación. Las palabras normalizadas tienen un solo significado.",
      }),
      ...error66({
        titulo: "66.11 «Repeat» en lugar de SAY AGAIN",
        seOye: `"Repeat, please."`,
        correcto: `"Say again."  o  "Say again (el elemento)."`,
        porQue:
          "En español, REPITA es SAY AGAIN y REPITO es I SAY AGAIN (Doc 9432, 2.6). El piloto traduce «repita» como «repeat», que no está en la tabla. Además, SAY AGAIN permite pedir solo una parte: «say again all after…», «say again all before…» (Doc 9432, 2.8.1.4).",
      }),
      ...error66({
        titulo: "66.12 «Take-off» fuera de su momento",
        seOye: `"Aviatory 452, ready for take-off." (traducción de «listos para el despegue»)`,
        correcto: `"Aviatory 452, ready."  o  "ready for departure".`,
        porQue:
          "La palabra TAKE-OFF solo se usa cuando se autoriza el despegue o cuando se cancela; en los demás casos se usa «departure» o «airborne» (Doc 9432, 2.8.3.3). Si la palabra aparece en otro contexto, alguien puede oír lo que esperaba oír.",
      }),
      ...error66({
        titulo: "66.13 Falsos amigos en lenguaje claro",
        seOye: `"We are actually at flight level two four zero" (queriendo decir «actualmente»). "We will eventually need to divert" (queriendo decir «posiblemente»).`,
        correcto: `"We are now at flight level two four zero."  /  "We may need to divert."`,
        porQue:
          "«Actually» significa «en realidad» (suena a corrección) y «eventually» significa «al final», algo que sí va a pasar (suena a decisión tomada). En una situación anormal, el ATC puede empezar a preparar un desvío que todavía no pediste, o no prepararlo cuando sí lo necesitas.",
      }),
      fuentes(
        "Doc 9432 · Doc 9835",
        "Doc 9432 (4.ª ed.) 2.4.1, 2.4.2, 2.4.3, 2.4.4, 2.6 y notas, 2.8.1.4, 2.8.3.3, 3.1.4, 3.3.3.1, 4.5.5, 6.1.2, 6.3.3; Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1; Doc 9835 (2.ª ed.) 2.3.4.2 y Cuadro 2-1.",
        [
          "VERIFICAR: grafías «TREE», «FIFE», «NINER» y la tabla de pronunciación en inglés contra Anexo 10 Vol. II cap. 5 y la versión en inglés del Doc 9432, 2.4 (no cargados).",
          "VERIFICAR: el motivo por el que la OACI eligió AFFIRM y no «affirmative»; no figura en las fuentes cargadas.",
          "VERIFICAR: el descriptor de pronunciación de la escala de la OACI contra Doc 9835 Apéndice A (no cargado).",
        ],
      ),
    ],
  },
  // ── 67 ──────────────────────────────────────────────────────────────────
  {
    n: 67,
    title: "Qué escuchar primero",
    kicker: "Distintivo, acción, valor, condición y lo siguiente",
    minutes: 10,
    blocks: [
      {
        kind: "p",
        text: "En una frecuencia congestionada, el cerebro no alcanza a procesar todo con el mismo peso. No se trata de escuchar menos, sino de escuchar **en orden**. Este es el orden de trabajo:",
      },
      {
        kind: "table",
        head: ["#", "Qué buscas", "Pregunta que te haces"],
        rows: [
          ["1", "**CALL SIGN**", "¿Es para mí? ¿Es exactamente mi distintivo?"],
          ["2", "**CLEARANCE / ACTION**", "¿Qué verbo? climb, descend, turn, hold, contact, cleared…"],
          ["3", "**VALUE**", "¿Qué número? nivel, rumbo, velocidad, frecuencia, pista"],
          ["4", "**CONDITION / LIMIT**", "¿Hasta dónde, cuándo, con qué restricción? by, until, when passing, behind"],
          ["5", "**NEXT ACTION**", "¿Qué tengo que hacer o notificar después? report, expect, then"],
        ],
      },
      {
        kind: "p",
        text: "Si fallas el paso 1, lo demás no importa: o no es para ti, o te pierdes una instrucción tuya. Si fallas el 4, cumples el valor en el lugar equivocado.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Herramienta didáctica",
        text: "El orden de escucha de cinco pasos es una herramienta didáctica de este módulo, no una norma OACI.",
      },
      {
        kind: "hueco",
        rotulo: "CM-67-01 · Diagrama · 16:9 · 1600×900 px",
        descripcion:
          "Imagen sugerida: Una transmisión ATC escrita en una sola línea («Aviatory 452, descend flight level two four zero, be level by GIKOS»), con cada tramo subrayado en un color distinto y numerado 1 a 5: distintivo, acción, valor, condición/límite, siguiente acción (vacío en este ejemplo, marcado «no hay»). Debajo, una flecha hacia la colación del piloto con los mismos colores. Fondo papel, acento del módulo. Objetivo: Que el piloto vea que una transmisión se descompone en piezas con distinto peso y que la colación devuelve las mismas piezas en el mismo orden.",
        alto: 300,
        ratio: "16 / 9",
      },
      COMO_LEER,
      ...orden67({
        titulo: "67.1 El ejemplo base (VERIFICAR)",
        atc: `"Aviatory 452, descend flight level two four zero, be level by GIKOS."`,
        pasos: [
          ["1 · CALL SIGN", "Aviatory 452. Es para mí."],
          ["2 · ACTION", "descend."],
          ["3 · VALUE", "flight level two four zero."],
          ["4 · CONDITION / LIMIT", "estar nivelado **en** GIKOS, no solo empezar a bajar."],
          ["5 · NEXT ACTION", "ninguna explícita. Implícita: calcular si llegas; si no, decirlo ya."],
        ],
        pilot: [`PILOT:             "Descend flight level two four zero, level by GIKOS, Aviatory 452."`, `PILOT (si no llegas): "Unable level by GIKOS, Aviatory 452."`],
        fuente: "UNABLE: Doc 9432, 2.6 y 2.8.3.10.",
      }),
      {
        kind: "p",
        text: "Nota: «be level by» es la forma del ejemplo de este módulo. La restricción de cruzar un punto a un nivel está en el Doc 9432 («cross WICKEN FL 150 or above», 2.8.3.10; «cross A1 at WICKEN FL 70», 2.8.3.7). La forma OACI para «alcanzar un nivel antes de un punto» está en fraseología no cargada.",
      },
      verificar("«Be level by (point)» y la forma OACI «to reach (level) by (point)»: Doc 4444 cap. 12 (no cargado)."),
      ...orden67({
        titulo: "67.2 Transferencia con condición",
        atc: `"Aviatory 452, when passing flight level eight zero, contact Bogota Control one two nine decimal one."`,
        pasos: [
          ["1 · CALL SIGN", "Aviatory 452."],
          ["2 · ACTION", "contact."],
          ["3 · VALUE", "Bogota Control, 129.1."],
          ["4 · CONDITION", "when passing FL 80. No antes."],
          ["5 · NEXT ACTION", "llamar con nivel en el primer contacto."],
        ],
        pilot: [`PILOT: "When passing flight level eight zero, one two nine decimal one, Aviatory 452."`],
        fuente: "Modelo del Doc 9432, 2.8.2.1.",
      }),
      ...orden67({
        titulo: "67.3 Rumbo con límite",
        atc: `"Aviatory 452, turn right heading zero four zero until passing flight level seven zero, then direct GIKOS."`,
        pasos: [
          ["1 · CALL SIGN", "Aviatory 452."],
          ["2 · ACTION", "turn right."],
          ["3 · VALUE", "heading 040."],
          ["4 · CONDITION", "until passing FL 70."],
          ["5 · NEXT ACTION", "then direct GIKOS."],
        ],
        pilot: [`PILOT: "Right heading zero four zero until passing flight level seven zero, then direct GIKOS, Aviatory 452."`],
        fuente: "Doc 9432, 7.1.2.",
      }),
      ...orden67({
        titulo: "67.4 Cruce con alternativa",
        atc: `"Aviatory 452, cleared to Cali flight level two nine zero, cross TOLEX flight level one five zero or above, if unable, maintain flight level one three zero."`,
        pasos: [
          ["1 · CALL SIGN", "Aviatory 452."],
          ["2 · ACTION", "cleared to Cali; cross."],
          ["3 · VALUE", "FL 290; FL 150."],
          ["4 · CONDITION", "TOLEX or above. Y una salida: if unable, FL 130."],
          ["5 · NEXT ACTION", "decidir ya si puedes cruzar."],
        ],
        pilot: [`PILOT (si no puedes): "Unable to cross TOLEX flight level one five zero due weight, maintaining flight level one three zero, Aviatory 452."`],
        fuente: "Modelo del Doc 9432, 2.8.3.10.",
      }),
      ...orden67({
        titulo: "67.5 Ascenso con régimen",
        atc: `"Aviatory 452, climb to flight level two four zero, expedite until passing flight level one eight zero."`,
        pasos: [
          ["1 · CALL SIGN", "Aviatory 452."],
          ["2 · ACTION", "climb; expedite."],
          ["3 · VALUE", "FL 240."],
          ["4 · LIMIT", "until passing FL 180. Después, régimen normal."],
          ["5 · NEXT ACTION", "ninguna."],
        ],
        pilot: [`PILOT: "Climbing to flight level two four zero, expediting until passing flight level one eight zero, Aviatory 452."`],
        fuente: "Doc 9432, 3.3.3.3.",
      }),
      ...orden67({
        titulo: "67.6 Descenso diferido",
        atc: `"Aviatory 452, after passing RAPUD descend to flight level eight zero."`,
        pasos: [
          ["1 · CALL SIGN", "Aviatory 452."],
          ["2 · ACTION", "descend."],
          ["3 · VALUE", "FL 80."],
          ["4 · CONDITION", "after passing RAPUD. Si bajas antes, rompes la separación que el ATC planeó."],
          ["5 · NEXT ACTION", "ninguna."],
        ],
        pilot: [`PILOT: "After RAPUD descend to flight level eight zero, Aviatory 452."`],
        fuente: "Doc 9432, 3.3.3.1.",
      }),
      ...orden67({
        titulo: "67.7 Condicional en pista",
        atc: `"Aviatory 452, behind the landing Airbus, line up and wait behind."`,
        pasos: [
          ["1 · CALL SIGN", "Aviatory 452."],
          ["2 · ACTION", "line up and wait."],
          ["3 · VALUE", "la pista en uso."],
          ["4 · CONDITION", "behind the landing Airbus. Aquí la condición va **primero** y es lo más importante."],
          ["5 · NEXT ACTION", "esperar la autorización de despegue."],
        ],
        pilot: [`PILOT: "Behind the Airbus, line up and wait behind, Aviatory 452."`],
        fuente: "Doc 9432, 4.5.7.",
      }),
      {
        kind: "p",
        text: "**Por qué este ejemplo rompe el orden:** en las condicionales el Doc 9432 pone la condición antes de la autorización (4.5.7). Si escuchas solo «line up», te falta la mitad.",
      },
      ...orden67({
        titulo: "67.8 Aproximación con varios elementos",
        atc: `"Aviatory 452, descend to four thousand feet, QNH one zero zero five, transition level five zero, expect ILS approach runway two four."`,
        pasos: [
          ["1 · CALL SIGN", "Aviatory 452."],
          ["2 · ACTION", "descend."],
          ["3 · VALUE", "4 000 ft, QNH 1005, nivel de transición 50."],
          ["4 · LIMIT", "4 000 ft es altitud (QNH), no nivel de vuelo."],
          ["5 · NEXT ACTION", "expect ILS 24: preparar la aproximación."],
        ],
        pilot: [
          `PILOT: "Descending to four thousand feet, QNH one zero zero five, transition level five zero, expecting ILS approach runway two four, Aviatory 452."`,
        ],
        fuente: "Doc 9432, 7.3.1.",
      }),
      ...orden67({
        titulo: "67.9 Despegue con instrucción de salida",
        atc: `"Aviatory 452, climb straight ahead until two thousand five hundred feet before turning right, runway two four, cleared for take-off."`,
        pasos: [
          ["1 · CALL SIGN", "Aviatory 452."],
          ["2 · ACTION", "cleared for take-off; climb straight ahead; turn right."],
          ["3 · VALUE", "runway 24; 2 500 ft."],
          ["4 · LIMIT", "until 2 500 ft."],
          ["5 · NEXT ACTION", "viraje a la derecha después."],
        ],
        pilot: [`PILOT: "Straight ahead two thousand five hundred feet, right turn, runway two four, cleared for take-off, Aviatory 452."`],
        fuente: "Doc 9432, 4.5.9.",
      }),
      ...orden67({
        titulo: "67.10 Rodaje con pista intermedia",
        atc: `"Aviatory 452, taxi to holding point runway one three left via Alpha, hold short of runway one three right."`,
        pasos: [
          ["1 · CALL SIGN", "Aviatory 452."],
          ["2 · ACTION", "taxi; hold short."],
          ["3 · VALUE", "holding point 13L; via Alpha."],
          ["4 · LIMIT", "hold short of 13R. Es el dato que evita una incursión en pista."],
          ["5 · NEXT ACTION", "esperar autorización de cruce."],
        ],
        pilot: [`PILOT: "Taxi to holding point runway one three left via Alpha, hold short of runway one three right, Aviatory 452."`],
        fuente: "Doc 9432, 4.4.2.",
      }),
      { kind: "sub", text: "67.11 Distintivo parecido en la misma frecuencia" },
      { kind: "code", text: `ATC: "Aviatory 542, turn left heading three one zero, descend flight level one two zero."` },
      {
        kind: "pasos",
        items: [
          { rotulo: "1 · CALL SIGN", texto: "Aviatory **542**. No es 452. Te detienes aquí." },
          { rotulo: "2 a 5", texto: "No aplican: no es tu instrucción." },
        ],
      },
      {
        kind: "p",
        text: "**Qué haces:** nada, salvo que no estés seguro del número. En ese caso preguntas (ver 65.7). Escuchar primero el distintivo es lo que evita que ejecutes el viraje de otro.",
      },
      fuentes(
        "Doc 9432",
        "Doc 9432 (4.ª ed.) 2.6, 2.8.2.1, 2.8.3.7, 2.8.3.10, 3.3.3.1, 3.3.3.3, 4.4.2, 4.5.7, 4.5.9, 7.1.2, 7.3.1.",
        ["VERIFICAR: «be level by (point)» y la forma OACI «to reach (level) by (point)» contra Doc 4444 cap. 12 (no cargado)."],
        ["El orden de escucha de cinco pasos es una herramienta didáctica de este módulo, no una norma OACI."],
      ),
    ],
  },
  // ── 68 ──────────────────────────────────────────────────────────────────
  {
    n: 68,
    title: "Resumen final",
    kicker: "Lo que un piloto de aerolínea debe recordar",
    minutes: 6,
    blocks: [
      {
        kind: "p",
        text: "Veintiocho principios. Si en la entrevista te preguntan «¿qué es una buena comunicación con el ATC?», aquí está la respuesta.",
      },
      verificar(
        "Los principios 21 y 22 nombran fraseología que no está en las fuentes cargadas (MINIMUM FUEL, PAN PAN, MAYDAY y ACAS): consultar Anexo 10 Vol. II cap. 5, Doc 4444 cap. 12 y 15 y Doc 8168 Vol. I. El principio 28 remite a procedimientos nacionales: AIP GEN 3.4 y RAC de Colombia.",
      ),
      {
        kind: "list",
        ordered: true,
        items: [
          "**Escucha antes de transmitir.** Si alguien está hablando o esperando respuesta, tu llamada lo pisa.",
          "**Piensa antes de oprimir el PTT.** Sabe a quién llamas, quién eres y qué quieres antes de hablar.",
          "**Usa la fraseología normalizada siempre que exista.** Es lo primero, no una opción (Doc 9835, 4.3.3).",
          "**Usa lenguaje claro cuando la fraseología no alcanza**, con la misma claridad y brevedad (Doc 9432, 3.2.3 y 3.2.4; Doc 9835, 4.3.4).",
          "**Lenguaje claro no es charla.** Nada de cortesías, relleno ni jerga (Doc 9432, 3.1.4 y 3.2.4).",
          "**Breve y preciso.** Una idea por frase. Números dígito por dígito (Doc 9432, 2.4.2).",
          "**Nunca ejecutes lo que no entendiste.** Primero aclaras, después actúas.",
          "**Colaciona lo crítico, siempre:** autorizaciones de ruta; entrar, aterrizar, despegar, esperar fuera, cruzar, rodar y retroceder en pista; pista en uso, altímetro, código SSR, nivel, rumbo, velocidad y nivel de transición (Doc 4444, 4.5.7.5.1).",
          "**Termina la colación con tu distintivo** (Doc 9432, 2.8.3.7).",
          "**Escucha la respuesta a tu colación.** Si el ATC dice «negative, I say again», corrige (Doc 9432, 2.8.3.9).",
          "**Confirma lo que dudes.** SAY AGAIN, CONFIRM, SPEAK SLOWER existen para eso (Doc 9432, 2.6). Pedir repetición no es un fracaso.",
          "**UNABLE es una respuesta válida**, con el motivo (Doc 9432, 2.6 y 2.8.3.10). Aceptar lo que no puedes cumplir es el error.",
          "**Nunca asumas una autorización.** STANDBY no es aprobación (Doc 9432, 2.6). CONTINUE APPROACH no es CLEARED TO LAND. LINE UP AND WAIT no es CLEARED FOR TAKE-OFF.",
          "**La autorización de ruta no es autorización para entrar a la pista** (Doc 9432, 2.8.3.3).",
          "**Ten conciencia del distintivo.** Escucha el tuyo completo, desconfía de los parecidos y no aceptes una instrucción de otro.",
          "**Atención máxima a pistas y altitudes.** Son los datos que, mal entendidos, terminan en incursión en pista o en pérdida de separación.",
          "**Controla el sesgo de expectativa.** Oímos lo que esperamos oír; el Doc 9835 (Cuadro 2-1) cuenta las falsas expectativas entre las causas de error de decodificación.",
          "**ROGER no es WILCO, MONITOR no es CONTACT.** Cada palabra tiene un solo significado (Doc 9432, 2.6).",
          "**Aviate, Navigate, Communicate.** La radio nunca desplaza el control del avión.",
          "**En emergencia: problema, intención, necesidad.** Qué pasa, qué vas a hacer, qué necesitas.",
          "**Declara pronto.** MINIMUM FUEL, PAN PAN o MAYDAY a tiempo le dan margen al ATC; tarde, solo le dan problemas (VERIFICAR la fraseología: Anexo 10 Vol. II cap. 5; Doc 4444 cap. 12 y 15).",
          "**En un RA, manda el TCAS.** Se cumple el RA y se informa después (VERIFICAR: Doc 4444 cap. 12 y 15).",
          "**ATC y pilotos comparten la responsabilidad.** El ATC escucha tu colación (Doc 4444, 4.5.7.5.2) y tú escuchas su corrección; ninguno reemplaza al otro.",
          "**Aviation English busca efectividad, no sofisticación.** Un inglés simple y correcto vale más que uno elegante y ambiguo.",
          "**CPDLC complementa la voz.** No se requiere colación oral de los mensajes CPDLC salvo que la autoridad ATS lo prescriba (Doc 4444, 4.5.7.5.2.1), pero el mensaje se lee entre los dos pilotos.",
          "**Los dos pilotos monitorizan las autorizaciones críticas.** Uno habla, los dos escuchan.",
          "**Una autorización se escucha, se confirma, se introduce, se verifica y se monitoriza.** Hasta que el avión la está volando, no está cumplida.",
          "**Lo que varía entre Estados se consulta.** Procedimientos de falla de comunicaciones, uso de fraseología local o sterile cockpit dependen del Estado y del operador: en Colombia, AIP GEN 3.4 y RAC.",
        ],
      },
      fuentes(
        "Doc 9432 · Doc 4444 · Doc 9835",
        "Doc 9432 (4.ª ed.) 2.4.2, 2.6, 2.8.3.3, 2.8.3.7, 2.8.3.9, 2.8.3.10, 3.1.4, 3.2.3, 3.2.4; Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1, 4.5.7.5.2, 4.5.7.5.2.1; Doc 9835 (2.ª ed.) 4.3.3, 4.3.4, Cuadro 2-1.",
        [
          "VERIFICAR: fraseología de MINIMUM FUEL, PAN PAN y MAYDAY contra Anexo 10 Vol. II cap. 5 y Doc 4444 cap. 12 y 15 (no cargados).",
          "VERIFICAR: procedimientos y fraseología ACAS contra Doc 4444 cap. 12 y 15 y Doc 8168 Vol. I (no cargados).",
          "VERIFICAR: procedimientos nacionales en AIP GEN 3.4 y RAC de Colombia (no cargados).",
        ],
      ),
    ],
  },
  // ── 69 ──────────────────────────────────────────────────────────────────
  {
    n: 69,
    title: "Repaso rápido: 50 frases",
    kicker: "Frase, significado y ejemplo",
    minutes: 12,
    blocks: [
      {
        kind: "glosario",
        titulo: "Leyenda",
        items: [
          { k: "[V]", v: "Verificada en una fuente cargada (Doc 9432 4.ª ed. o Doc 4444 15.ª ed.), con el párrafo al lado." },
          { k: "[P]", v: "Pendiente: fraseología OACI que no está en lo cargado. Úsala sabiendo que debe confirmarse contra el documento indicado." },
        ],
      },
      { kind: "p", text: "Los valores (niveles, rumbos, pistas, puntos) son de ejemplo. GIKOS y TOLEX son ficticios." },
      fichasFrases("Palabras normalizadas", [
        { n: 1, frase: "«UNABLE»", significado: "No puedo cumplir su solicitud, instrucción o autorización. Normalmente va con el motivo (Doc 9432, 2.6).", ejemplo: `"Unable flight level three five zero due performance, Aviatory 452."` },
        { n: 2, frase: "«WILCO»", significado: "He comprendido su mensaje y procederé de acuerdo (Doc 9432, 2.6).", ejemplo: `ATC: "Report passing flight level seven zero." PILOT: "Wilco, Aviatory 452."` },
        { n: 3, frase: "«ROGER»", significado: "He recibido toda su transmisión. No sirve para contestar una pregunta de sí o no (Doc 9432, 2.6, nota).", ejemplo: `ATC: "Caution construction work adjacent to gate three seven." PILOT: "Roger, Aviatory 452."` },
        { n: 4, frase: "«AFFIRM»", significado: "Sí (Doc 9432, 2.6; ejemplo en 4.5.5).", ejemplo: `ATC: "Are you ready for immediate departure?" PILOT: "Affirm, Aviatory 452."` },
        { n: 5, frase: "«NEGATIVE»", significado: "No; permiso no concedido; es incorrecto; no se puede (Doc 9432, 2.6).", ejemplo: `"Negative, transponder unserviceable, Aviatory 452." (Doc 9432, 6.5.2)` },
        { n: 6, frase: "«SAY AGAIN»", significado: "Repítame todo o la parte que indico de su última transmisión (Doc 9432, 2.6 y 2.8.1.4).", ejemplo: `"Aviatory 452, say again all after flight level."` },
        { n: 7, frase: "«CONFIRM»", significado: "Solicito verificación de una autorización, instrucción, medida o información (Doc 9432, 2.6).", ejemplo: `"Aviatory 452, confirm cleared to cross runway two four."` },
        { n: 8, frase: "«STANDBY»", significado: "Espere y le llamaré. No es aprobación ni denegación (Doc 9432, 2.6, nota).", ejemplo: `ATC: "Aviatory 452, stand by." (No inicias nada hasta que te llamen.)` },
        { n: 9, frase: "«CORRECTION»", significado: "Hubo un error en esta transmisión; la versión correcta es… (Doc 9432, 2.6 y 2.8.1.6).", ejemplo: `"Aviatory 452, GIKOS four seven, flight level three three zero, TOLEX zero seven, correction, TOLEX five seven."` },
        { n: 10, frase: "«I SAY AGAIN»", significado: "Repito para aclarar o recalcar (Doc 9432, 2.6 y 2.8.1.8).", ejemplo: `"Aviatory 452, two thousand five hundred feet, I say again, two thousand five hundred feet."` },
        { n: 11, frase: "«SPEAK SLOWER»", significado: "Disminuya la velocidad al hablar (Doc 9432, 2.6).", ejemplo: `"Aviatory 452, speak slower."` },
        { n: 12, frase: "«DISREGARD»", significado: "Haga caso omiso de esto (Doc 9432, 2.6).", ejemplo: `"Aviatory 452, request flight level three seven zero… disregard."` },
        { n: 13, frase: "«REQUEST»", significado: "Desearía saber o deseo obtener (Doc 9432, 2.6).", ejemplo: `"Aviatory 452, request descent." (Doc 9432, 3.3.3.1)` },
        { n: 14, frase: "«MONITOR»", significado: "Escuchar en una frecuencia. No es llamar (Doc 9432, 2.6 y 2.8.2.2).", ejemplo: `ATC: "Aviatory 452, monitor ATIS one two three decimal two five." PILOT: "Monitoring one two three decimal two five, Aviatory 452."` },
        { n: 15, frase: "«CONTACT»", significado: "Establezca comunicaciones con… (Doc 9432, 2.6 y 2.8.2.1).", ejemplo: `ATC: "Aviatory 452, contact Tower one one eight decimal seven." PILOT: "One one eight decimal seven, Aviatory 452."` },
        { n: 16, frase: "«RECLEARED»", significado: "La nueva autorización invalida la anterior o parte de ella (Doc 9432, 2.6).", ejemplo: `"Recleared flight level three three zero, Aviatory 452." (Doc 9432, 3.3.3.2)` },
      ]),
      fichasFrases("Tierra y pista", [
        { n: 17, frase: "«CLEARED TO (límite) VIA (ruta), (nivel), SQUAWK (código)»", significado: "Autorización de ruta. Se colaciona completa (Doc 9432, 2.8.3.5 y 2.8.3.6).", ejemplo: `"Cleared to Cali via GIKOS One Alpha departure, flight level two eight zero, squawk five five zero one, Aviatory 452."` },
        { n: 18, frase: "«REQUEST START UP, INFORMATION (letra)»", significado: "Pides puesta en marcha e informas que tienes el ATIS (Doc 9432, 4.2.2).", ejemplo: `"Bogota Ground, Aviatory 452, stand two four, request start up, information Bravo."` },
        { n: 19, frase: "«REQUEST PUSH-BACK» / «PUSH-BACK APPROVED»", significado: "Solicitud y aprobación de retroceso (Doc 9432, 4.3.1).", ejemplo: `"Apron, Aviatory 452, stand two seven, request push-back."` },
        { n: 20, frase: "«TAXI TO HOLDING POINT RUNWAY (número)»", significado: "Rueda hasta el punto de espera de esa pista; ahí te detienes (Doc 9432, 4.4.1 y 4.4.3).", ejemplo: `"Holding point runway two seven, QNH one zero one nine, Aviatory 452."` },
        { n: 21, frase: "«HOLD SHORT OF RUNWAY (número)» / «HOLDING SHORT»", significado: "Detente antes de esa pista. Se colaciona siempre (Doc 9432, 4.4.2; Doc 4444, 4.5.7.5.1 b).", ejemplo: `"Holding short runway two four, Aviatory 452."` },
        { n: 22, frase: "«CROSS RUNWAY (número), REPORT VACATED»", significado: "Cruza y avisa cuando todo el avión haya pasado el punto de espera del otro lado (Doc 9432, 4.4.2 y nota).", ejemplo: `"Crossing, wilco, Aviatory 452." Luego: "Aviatory 452, runway vacated."` },
        { n: 23, frase: "«LINE UP AND WAIT»", significado: "Entra a la pista y espera. No es autorización de despegue (Doc 9432, 4.5.3).", ejemplo: `"Runway two four, line up and wait, Aviatory 452."` },
        { n: 24, frase: "«CLEARED FOR TAKE-OFF»", significado: "Autorizado a despegar. Única situación, junto con la cancelación, en que se usa la palabra TAKE-OFF (Doc 9432, 2.8.3.3 y 4.5.4).", ejemplo: `"Runway two four, cleared for take-off, Aviatory 452."` },
        { n: 25, frase: "«HOLD POSITION, CANCEL TAKE-OFF»", significado: "No inicies el despegue; la autorización queda anulada (Doc 9432, 4.5.10).", ejemplo: `ATC: "Aviatory 452, hold position, cancel take-off, I say again, cancel take-off, vehicle on runway." PILOT: "Holding, Aviatory 452."` },
        { n: 26, frase: "«STOP IMMEDIATELY»", significado: "Abandona ya la carrera de despegue; el ATC lo repite con el distintivo (Doc 9432, 4.5.11).", ejemplo: `"Stopping, Aviatory 452."` },
      ]),
      fichasFrases("Salida, niveles y vectores", [
        { n: 27, frase: "«WHEN PASSING (nivel) CONTACT (dependencia) (frecuencia)»", significado: "Cambio de frecuencia diferido hasta pasar ese nivel (Doc 9432, 2.8.2.1).", ejemplo: `"When passing flight level eight zero, one two nine decimal one, Aviatory 452."` },
        { n: 28, frase: "«CLIMB TO (nivel)» / «LEAVING (nivel) CLIMBING TO (nivel)»", significado: "Ascenso y su colación (Doc 9432, 3.3.3.1).", ejemplo: `"Leaving flight level one one zero, climbing to flight level two four zero, Aviatory 452."` },
        { n: 29, frase: "«MAINTAIN (nivel)»", significado: "Continúe en las condiciones especificadas (Doc 9432, 2.6 y 3.3.3.1).", ejemplo: `"Maintaining two thousand five hundred feet, Aviatory 452."` },
        { n: 30, frase: "«STOP DESCENT (o CLIMB) AT (nivel)»", significado: "Anula el nivel autorizado antes; nivelas ahí (Doc 9432, 3.3.3.2).", ejemplo: `"Stop descent at flight level one five zero, Aviatory 452."` },
        { n: 31, frase: "«EXPEDITE DESCENT (o CLIMB)» / «UNABLE TO EXPEDITE»", significado: "Régimen mayor que el normal, o que no puedes darlo (Doc 9432, 3.3.3.3).", ejemplo: `"Unable to expedite, Aviatory 452."` },
        { n: 32, frase: "«CROSS (punto) (nivel) OR ABOVE, IF UNABLE MAINTAIN (nivel)»", significado: "Restricción de cruce con alternativa prevista (Doc 9432, 2.8.3.10).", ejemplo: `"Unable to cross TOLEX flight level one five zero due weight, maintaining flight level one three zero, Aviatory 452."` },
        { n: 33, frase: "«TURN LEFT (o RIGHT) HEADING (tres dígitos) FOR (motivo)»", significado: "Vector con sentido de viraje y motivo (Doc 9432, 6.3.1).", ejemplo: `"Left heading zero five zero, Aviatory 452."` },
        { n: 34, frase: "«RESUME OWN NAVIGATION DIRECT (punto)»", significado: "Terminan los vectores; navega directo al punto (Doc 9432, 6.3.3).", ejemplo: `"Direct GIKOS, Aviatory 452."` },
        { n: 35, frase: "«TRAFFIC (hora de reloj), (distancia)…» / «TRAFFIC IN SIGHT» / «NEGATIVE CONTACT»", significado: "Información de tránsito y tus dos respuestas posibles (Doc 9432, 6.4.1 y 6.4.2).", ejemplo: `"Negative contact, request vectors, Aviatory 452."` },
        { n: 36, frase: "«SQUAWK (código)» / «SQUAWK IDENT»", significado: "Selecciona el código / activa IDENT (Doc 9432, 6.5.1 y 6.6).", ejemplo: `"Squawk six four one one, Aviatory 452."` },
        { n: 37, frase: "«CHECK ALTIMETER SETTING AND CONFIRM LEVEL»", significado: "Revisa el reglaje y confirma tu nivel actual (Doc 9432, 6.5.1 y 6.5.2).", ejemplo: `"Aviatory 452, altimeter one zero one three, flight level eight zero."` },
      ]),
      fichasFrases("Llegada y aterrizaje", [
        { n: 38, frase: "«EXPECT (tipo de aproximación) APPROACH RUNWAY (número)»", significado: "Aproximación prevista; prepárala (Doc 9432, 7.3.1).", ejemplo: `"Expecting ILS approach runway two four, Aviatory 452."` },
        { n: 39, frase: "«CLEARED (tipo) APPROACH RUNWAY (número), REPORT ESTABLISHED»", significado: "Autorizado para la aproximación; avisa al quedar establecido (Doc 9432, 7.3.1).", ejemplo: `"Cleared straight-in ILS approach runway two four, wilco, Aviatory 452."` },
        { n: 40, frase: "«CONTINUE APPROACH»", significado: "Sigue la aproximación. **No** es autorización para aterrizar (Doc 9432, 4.6.4 y 4.7.1).", ejemplo: `ATC: "Aviatory 452, continue approach, wind two six zero degrees one eight knots." PILOT: "Aviatory 452."` },
        { n: 41, frase: "«CLEARED TO LAND»", significado: "Autorizado a aterrizar en la pista indicada (Doc 9432, 4.7.1).", ejemplo: `"Runway two seven, cleared to land, Aviatory 452."` },
        { n: 42, frase: "«GO AROUND» / «GOING AROUND»", significado: "Orden del ATC / aviso o respuesta del piloto (Doc 9432, 4.8.1 y 4.8.3).", ejemplo: `"Going around, Aviatory 452."` },
      ]),
      verificar(
        "Las frases 43 a 50 son fraseología OACI que **no está** en las fuentes cargadas. Úsalas sabiendo que deben confirmarse contra el documento indicado en cada una (Doc 4444 cap. 12 y 15, edición vigente; Doc 9432 7.3, 8.7, 9.2, 9.3 y 11.6; Anexo 10 Vol. II cap. 5; Anexo 6 Parte I, 4.3.7).",
      ),
      fichasFrases("Pendientes de verificar", [
        {
          n: 43,
          frase: "«REDUCE SPEED TO (número) KNOTS» / «MAINTAIN MINIMUM CLEAN SPEED»",
          significado: "Control de velocidad; la velocidad mínima limpia es la mínima sin dispositivos hipersustentadores, frenos aerodinámicos ni tren (Doc 4444, 4.6.3.2 y nota, en español).",
          ejemplo: `"Reduce speed to two two zero knots, Aviatory 452."`,
          pendiente: "Doc 4444 cap. 12.",
        },
        {
          n: 44,
          frase: "«HOLD AT (punto)… EXPECT FURTHER CLEARANCE AT (hora)»",
          significado: "Instrucción de espera y hora prevista de la próxima autorización.",
          ejemplo: `"Hold at TOLEX, flight level one two zero, inbound track zero nine zero, left hand, expect further clearance at three five, Aviatory 452."`,
          pendiente: "Doc 4444 cap. 12; Doc 9432 7.3 y 8.7.",
        },
        {
          n: 45,
          frase: "«REQUEST DEVIATION UP TO (distancia) LEFT (o RIGHT) OF TRACK DUE WEATHER»",
          significado: "Solicitud de desvío lateral por meteorología, con lado, distancia y motivo.",
          ejemplo: `"Aviatory 452, request deviation up to two zero miles right of track due weather."`,
          pendiente: "Doc 4444 cap. 12 y 15.",
        },
        {
          n: 46,
          frase: "«CLIMB VIA SID TO (nivel)»",
          significado: "Asciende siguiendo el perfil vertical y las restricciones publicadas de la SID hasta el nivel indicado.",
          ejemplo: `"Climb via SID to flight level one three zero, Aviatory 452."`,
          pendiente: "Doc 4444 cap. 12, edición vigente.",
        },
        {
          n: 47,
          frase: "«TCAS RA» / «CLEAR OF CONFLICT, RETURNING TO (autorización)»",
          significado: "Te apartaste de la autorización por un RA / terminó y vuelves a lo autorizado.",
          ejemplo: `"Aviatory 452, clear of conflict, returning to flight level one six zero."`,
          pendiente: "Doc 4444 cap. 12 y 15; Doc 9432 11.6.",
        },
        {
          n: 48,
          frase: "«MINIMUM FUEL»",
          significado:
            "Debes aterrizar en un aeródromo específico y no puedes aceptar demoras adicionales. No es emergencia (definición en Doc 4444, cap. 1; la frase no está en lo cargado).",
          ejemplo: `"Approach, Aviatory 452, minimum fuel."`,
          pendiente: "Doc 4444 cap. 12 y 15; Anexo 6 Parte I, 4.3.7.",
        },
        {
          n: 49,
          frase: "«MAYDAY, MAYDAY, MAYDAY» (y «MAYDAY FUEL»)",
          significado: "Socorro: peligro grave e inminente, se necesita ayuda inmediata.",
          ejemplo: `"MAYDAY, MAYDAY, MAYDAY, Bogota Departure, Aviatory 452, engine fire number two, returning to Bogota, passing one two thousand feet, heading one three zero."`,
          pendiente: "Anexo 10 Vol. II cap. 5; Doc 9432 9.2; Doc 4444 cap. 12 y 15 para MAYDAY FUEL.",
        },
        {
          n: 50,
          frase: "«PAN PAN, PAN PAN, PAN PAN»",
          significado: "Urgencia: hay un problema que compromete la seguridad del avión o de alguien a bordo, sin peligro inminente.",
          ejemplo: `"PAN PAN, PAN PAN, PAN PAN, Bogota Control, Aviatory 452, medical case on board, request priority to Bogota."`,
          pendiente: "Anexo 10 Vol. II cap. 5; Doc 9432 9.3.",
        },
      ]),
      { kind: "p", text: "**Conteo:** 42 frases [V] y 8 frases [P]." },
      verificar(
        "**Fuera de la lista, también pendientes:** «TRANSMITTING BLIND DUE TO RECEIVER FAILURE» (Anexo 10 Vol. II cap. 5; Doc 9432 9.5), respuestas CPDLC por enlace de datos (Doc 4444 cap. 14; Doc 10037) y «SQUAWK 7700» en inglés: el Doc 9432 (6.5.1) solo trae en español «TRANSPONDEDOR MAYDAY: seleccione código de emergencia» (Doc 4444 cap. 12). El código 7600 para problemas de radiocomunicaciones sí está verificado (Doc 9432, 6.6, nota).",
      ),
      fuentes(
        "Doc 9432 · Doc 4444",
        "Doc 9432 (4.ª ed.) 2.6 y notas, 2.8.1.4, 2.8.1.6, 2.8.1.8, 2.8.2.1, 2.8.2.2, 2.8.3.5, 2.8.3.6, 2.8.3.10, 3.3.3.1 a 3.3.3.3, 4.2.2, 4.3.1, 4.4.1 a 4.4.3, 4.5.3 a 4.5.5, 4.5.10, 4.5.11, 4.6.4, 4.7.1, 4.8.1, 4.8.3, 4.10, 6.3.1, 6.3.3, 6.4.1, 6.4.2, 6.5.1, 6.5.2, 6.6 y nota, 7.3.1; Doc 4444 (15.ª ed., Enm. 4) cap. 1 (combustible mínimo), 4.5.7.5.1, 4.6.3.2.",
        [
          "VERIFICAR: frases 43 a 50 contra los documentos indicados en cada una (no cargados).",
          "VERIFICAR: «transmitting blind», respuestas CPDLC y «squawk 7700» en inglés, según se indica arriba.",
        ],
      ),
    ],
  },
]
