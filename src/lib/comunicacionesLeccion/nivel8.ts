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
      situacion: `**ESCENARIO DIDÁCTICO:** ${c.escenario} **MENSAJE O SITUACIÓN ATC (no transcripción):** ${c.atc}`,
      preguntas: [
        { q: "¿Qué comunicas y qué decides?", a: c.respuesta },
        { q: "¿Cómo lo razonas en voz alta ante el evaluador?", a: c.razonamiento },
      ],
    },
  ]
  if (c.verificar) out.push(verificar(c.verificar))
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
    title: "Plain English: práctica no normal",
    kicker: "Lo inesperado se describe con hechos, capacidad e intención",
    minutes: 22,
    blocks: [
      {
        kind: "p",
        text: "La fraseología normalizada no cubre cada falla, enfermedad o condición meteorológica. El Manual de requisitos de competencia lingüística de la Organización de Aviación Civil Internacional (OACI; International Civil Aviation Organization, ICAO), Doc 9835, exige que el lenguaje común sea inteligible, directo, pertinente y no ambiguo. Eso no elimina las palabras normalizadas para niveles, autorizaciones, MAYDAY o PAN PAN cuando corresponden. En una situación no normal, el piloto no debe adornar el mensaje: debe convertir **hechos confirmados, capacidad real, ayuda requerida e intención actual** en información que ATC pueda usar.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-64-01.svg",
        alt: "Cuatro bloques de un mensaje no normal: hecho observado, capacidad y límites, ayuda requerida e intención actual; con una flecha de actualización cuando cambia la evaluación.",
        ancho: 1600,
        alto: 900,
        pie: "Plantilla didáctica, no orden fijo de transmisión: decir el hecho observable, la capacidad que afecta al vuelo, la ayuda concreta y la intención actual. Si una lista cambia la capacidad o la decisión, actualizar el mensaje a ATC.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Ejemplos, no transcripciones",
        text: "Los mensajes siguientes están construidos para practicar inglés claro. No representan vuelos reales, no asignan rutas, pistas, frecuencias ni límites de aeronave y no sustituyen el manual de operaciones. La categoría de urgencia o socorro se decide por el efecto de la condición; no por la etiqueta del sistema.",
      },
      { kind: "sub", text: "Diez situaciones para responder en voz alta" },
      ...caso64({
        titulo: "1. Emergencia médica a bordo",
        situacion: "Un pasajero necesita atención urgente y la tripulación evalúa desviar. Aún no se ha decidido destino.",
        comunicar: "La condición observada, prioridad que se solicita, intención provisional y asistencia médica al arribo.",
        turnos: ["PILOT (ejemplo didáctico): We have a seriously ill passenger. We are assessing a diversion. Request priority and medical assistance on arrival."],
        porQue: "No se inventa un diagnóstico ni un aeropuerto. Si la condición cumple criterios de urgencia o socorro se usa la señal correspondiente. Se actualiza la intención cuando la cabina decide el destino.",
      }),
      ...caso64({
        titulo: "2. Olor a quemado sin fuente identificada",
        situacion: "Se percibe olor a quemado; no hay confirmación de fuego. La tripulación aplica la lista y requiere tiempo.",
        comunicar: "Hecho observado, incertidumbre sobre la fuente, limitación actual y ayuda pedida.",
        turnos: ["PILOT (ejemplo didáctico): We have a burning smell in the cabin; the source is not identified. We need time to complete the checklist. Request vectors away from traffic."],
        porQue: "Decir «source not identified» evita presentar una hipótesis como certeza. Si la amenaza crece, cambia la prioridad y la intención; ATC debe conocerlo.",
      }),
      ...caso64({
        titulo: "3. Indicación de tren no asegurado",
        situacion: "Un indicador no confirma una pata abajo y asegurada durante la llegada.",
        comunicar: "Indicación exacta, necesidad de interrumpir aproximación y tiempo o apoyo necesario.",
        turnos: ["PILOT (ejemplo didáctico): We have an unsafe landing gear indication. We need to discontinue the approach and complete the checklist. We will advise our intentions."],
        porQue: "No afirmar que el tren está físicamente arriba: solo se conoce la indicación. Una pasada de inspección se solicita si es apropiada tras evaluar la situación.",
      }),
      ...caso64({
        titulo: "4. Configuración de alas limitada",
        situacion: "Una superficie de alta sustentación no responde como se esperaba y la tripulación aún no ha establecido las limitaciones finales.",
        comunicar: "Efecto operacional confirmado, tiempo para lista e intención provisional.",
        turnos: ["PILOT (ejemplo didáctico): We cannot use the planned configuration. We need to level off and complete the checklist. We will advise the speed limit when confirmed."],
        porQue: "No inventar velocidades o altitudes antes de consultar la documentación de la aeronave. La limitación confirmada se comunica tan pronto sea útil para la separación.",
      }),
      ...caso64({
        titulo: "5. Impacto con aves",
        situacion: "Tras un golpe y una indicación anormal, la tripulación estabiliza el vuelo. Puede haber restos en pista.",
        comunicar: "Naturaleza del evento, efecto confirmado, evaluación pendiente y posible peligro para otras aeronaves.",
        turnos: ["PILOT (ejemplo didáctico): We had a bird strike after departure. We are assessing an engine indication. There may be debris on the runway. Request time to evaluate."],
        porQue: "No declarar motor fallado sin evidencia. La información sobre posibles restos es pertinente para la torre, pero la cabina no debe distraerse de volar el avión.",
      }),
      ...caso64({
        titulo: "6. Turbulencia y nivel",
        situacion: "La turbulencia impide mantener el nivel con precisión. El siguiente nivel aún no está autorizado.",
        comunicar: "Incapacidad actual, motivo y solicitud de alternativa.",
        turnos: ["PILOT (ejemplo didáctico): Unable to maintain the assigned level due severe turbulence. Request a different level. We will advise when stable."],
        porQue: "La información crítica es que la separación puede verse afectada. La petición no constituye por sí misma autorización para cambiar de nivel.",
      }),
      ...caso64({
        titulo: "7. Capacidad de navegación degradada",
        situacion: "El sistema ya no satisface el requisito de la aproximación prevista.",
        comunicar: "Capacidad que se perdió, procedimiento que no puede aceptarse y alternativa solicitada.",
        turnos: ["PILOT (ejemplo didáctico): We cannot continue the planned navigation procedure. Request an alternative approach or radar vectors."],
        porQue: "La frase depende de la capacidad realmente perdida y de la aprobación de la aeronave. No afirmar una falla específica de RNP si el diagnóstico no está confirmado.",
      }),
      ...caso64({
        titulo: "8. Posible daño en rueda",
        situacion: "La torre observa restos tras el despegue, pero la tripulación aún no sabe si son propios.",
        comunicar: "Sospecha diferenciada de hechos, necesidades para evaluar y servicios de apoyo.",
        turnos: ["PILOT (ejemplo didáctico): The runway debris may be from our aircraft. We have no confirmed tyre indication yet. Request time to assess before landing."],
        porQue: "«May be» comunica incertidumbre. No pedir un tiempo fijo ni prometer aterrizaje inmediato hasta completar la evaluación pertinente.",
      }),
      ...caso64({
        titulo: "9. Falla hidráulica",
        situacion: "Una alerta indica pérdida de un sistema, pero las consecuencias en controles o tren aún se evalúan.",
        comunicar: "Problema confirmado, capacidad actual y tiempo o espacio requerido.",
        turnos: ["PILOT (ejemplo didáctico): We have a hydraulic system warning. Flight controls are responding normally at present. Request time to complete the checklist."],
        porQue: "La expresión «at present» deja claro que la capacidad puede cambiar. No transmitir detalles de ingeniería que todavía no alteran la ayuda de ATC.",
      }),
      ...caso64({
        titulo: "10. Meteorología en trayectoria",
        situacion: "Una célula convectiva bloquea el tramo autorizado y la tripulación necesita separarse.",
        comunicar: "Ruta actual inviable, dirección preferida y solicitud concreta de desvío.",
        turnos: ["PILOT (ejemplo didáctico): Unable to continue on the assigned track due weather. Request deviation to the right. We will advise the extent required."],
        porQue: "Se solicita el desvío, no se anuncia como realizado. Los límites específicos provienen de la respuesta ATC y de las contingencias publicadas, no de este ejemplo.",
      }),
      {
        kind: "escenario",
        titulo: "Cambió la capacidad después de la primera llamada",
        situacion: "La tripulación comunicó que necesitaba tiempo para una lista por una alerta de sistema. Durante la evaluación descubre que ya no puede mantener el nivel asignado. ATC aún planifica con la capacidad comunicada inicialmente.",
        preguntas: [
          { q: "¿Qué se transmite primero?", a: "La incapacidad actual para mantener el nivel y el motivo confirmado; después una solicitud compatible con el control del avión. No se espera a terminar todos los detalles de la lista." },
          { q: "¿Se repite toda la historia técnica?", a: "No. Se actualiza el dato que cambió la separación y la intención. El diagnóstico completo no sustituye la necesidad operacional." },
          { q: "¿Qué parte vuelve a fraseología normalizada?", a: "Los niveles, rumbos, autorizaciones y sus colaciones. El lenguaje claro explica el evento inesperado y la capacidad." },
        ],
        concepto: "Una primera intención es provisional: ATC necesita sus cambios oportunamente.",
      },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Describir lo observado, no una causa supuesta.",
          "Decir lo que el avión puede y no puede hacer ahora.",
          "Pedir una ayuda que ATC pueda proporcionar.",
          "Actualizar intención y prioridad cuando la evaluación cambie.",
          "Mantener fraseología para los elementos que sí están normalizados.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "OACI Doc 9835 · FAA AIM §6-3-1 · Aerocivil/eAIP",
        bloques: [
          { kind: "p", text: "OACI, Doc 9835, 2.ª edición, uso de lenguaje común para eventos inesperados y cualidades de claridad, concisión y ausencia de ambigüedad: https://www4.icao.int/aelts/uploads/icao%20doc9835%202nd%20edition.pdf" },
          { kind: "p", text: "FAA, Aeronautical Information Manual §6-3-1, comunicaciones de socorro y urgencia, naturaleza, intenciones y asistencia deseada: https://www.faa.gov/air_traffic/publications/aim_html/chap6_section_3.html" },
          { kind: "p", text: "Para aplicación colombiana, consultar exclusivamente Aerocivil/eAIP y el manual del explotador. La fotografía, el diagrama y las diez frases son material didáctico; ninguna corresponde a una transmisión real: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
        ],
      },
    ],
  },
  // ── 65 ──────────────────────────────────────────────────────────────────
  {
    n: 65,
    title: "Escenarios ATC de entrevista",
    kicker: "Dieciocho decisiones que revelan el criterio del piloto",
    minutes: 28,
    blocks: [
      {
        kind: "p",
        text: "En una selección de aerolínea no basta sonar fluido: hay que detectar si una instrucción es para el vuelo, si se entendió completa, si puede cumplirse y qué hará realmente el avión. Los dieciocho casos siguientes son **situaciones didácticas, no audios ni transcripciones reales**; no asignan rutas, frecuencias, pistas o límites inventados. Responde antes de abrir cada tarjeta y explica cómo lo comunicarías, qué comprobarías en cabina y en qué momento pedirías aclaración o dirías UNABLE.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-65-01.svg",
        alt: "Rúbrica visual de una respuesta de entrevista: escucha, decisión, comunicación y verificación de la trayectoria.",
        ancho: 1600,
        alto: 900,
        pie: "Herramienta didáctica para preparar el simulador, no criterio oficial de una aerolínea: escuchar el mensaje completo, decidir si es aceptable, transmitir con claridad y comprobar el efecto en la trayectoria.",
      },
      { kind: "sub", text: "Responde, luego revela el razonamiento" },
      ...escenario65({
        titulo: "1. Ascenso que no puede sostenerse",
        escenario: "La performance calculada no permite alcanzar el nivel que ofrece ATC.",
        atc: "ATC ofrece un nivel superior.",
        respuesta: "Comunicar UNABLE de inmediato, explicar la limitación de performance y señalar qué nivel sí es viable si ya está verificado.",
        razonamiento: "Aceptar para «ganar tiempo» crea una discrepancia de separación; el piloto decide si puede aceptar una autorización.",
      }),
      ...escenario65({
        titulo: "2. Velocidad incompatible",
        escenario: "La tripulación no puede reducir al valor solicitado en la configuración y fase actuales.",
        atc: "ATC solicita reducir velocidad.",
        respuesta: "Informar UNABLE con la limitación confirmada y pedir una alternativa; no inventar una velocidad mínima de un avión genérico.",
        razonamiento: "El controlador necesita el límite real. La configuración para cumplir solo se modifica si el SOP y la situación lo permiten.",
      }),
      ...escenario65({
        titulo: "3. Desvío por tormenta",
        escenario: "El radar meteorológico muestra que la ruta autorizada atraviesa una célula.",
        atc: "No hay autorización nueva todavía.",
        respuesta: "Solicitar con tiempo una desviación concreta y esperar la respuesta; si ya se requiere una contingencia, seguir el procedimiento publicado.",
        razonamiento: "Una solicitud no mueve por sí sola el límite de la ruta autorizada.",
      }),
      ...escenario65({
        titulo: "4. Cambio de pista durante rodaje",
        escenario: "ATC anuncia una pista distinta antes del punto de espera.",
        atc: "Se comunica una pista nueva.",
        respuesta: "Colacionar la pista; detener o pedir tiempo para revisar salida, performance y configuración. No aplicar la pista anterior por inercia.",
        razonamiento: "La radio, la preparación y el avión deben quedar sincronizados.",
      }),
      ...escenario65({
        titulo: "5. Cambio de aproximación",
        escenario: "Durante la llegada se propone un procedimiento diferente al preparado.",
        atc: "ATC indica esperar otra aproximación.",
        respuesta: "Repetir lo recibido como expectativa, pedir tiempo o vectores si hace falta y no confundir EXPECT con autorización.",
        razonamiento: "Preparación incompleta es una razón operacional para pedir tiempo, no para improvisar la entrada.",
      }),
      ...escenario65({
        titulo: "6. Duda en rodaje nocturno",
        escenario: "La tripulación no identifica con certeza la intersección que aparece adelante.",
        atc: "No hay mensaje nuevo.",
        respuesta: "Detenerse en lugar seguro, comunicar posición confirmada y pedir aclaración de la ruta antes de continuar.",
        razonamiento: "Avanzar con una duda cerca de pista aumenta el riesgo de incursión.",
      }),
      ...escenario65({
        titulo: "7. Distintivos similares",
        escenario: "Otra aeronave en frecuencia tiene un indicativo muy parecido.",
        atc: "Una instrucción puede dirigirse a la otra aeronave.",
        respuesta: "No actuar hasta identificar el distintivo completo. Si persiste la duda, pedir confirmación para el propio vuelo.",
        razonamiento: "La colación con identificador propio permite detectar respuesta del destinatario equivocado.",
      }),
      ...escenario65({
        titulo: "8. Transmisión cubierta",
        escenario: "Una instrucción esperada llega fragmentada por una transmisión simultánea.",
        atc: "Solo se oyen palabras aisladas.",
        respuesta: "Pedir SAY AGAIN de todo o de la parte perdida; no completar números con lo esperado.",
        razonamiento: "El sesgo de expectativa puede producir una colación coherente de un mensaje que nunca se oyó.",
      }),
      ...escenario65({
        titulo: "9. Espera y combustible",
        escenario: "ATC asigna una demora y el combustible reduce la flexibilidad de la tripulación.",
        atc: "Se ofrece una espera.",
        respuesta: "Colacionar la instrucción completa, evaluar combustible con datos del vuelo y comunicar oportunamente el límite o el estado de combustible según corresponda.",
        razonamiento: "La dependencia no puede gestionar un límite que no conoce. No usar MINIMUM FUEL como sustituto de una emergencia real.",
      }),
      ...escenario65({
        titulo: "10. Combustible mínimo",
        escenario: "Una autorización al destino ya no admite demoras adicionales sin afectar la planificación de reserva.",
        atc: "ATC anuncia posible demora.",
        respuesta: "Comunicar MINIMUM FUEL conforme al procedimiento aplicable y explicar cualquier límite de espera; vigilar si la situación exige declaración de socorro.",
        razonamiento: "MINIMUM FUEL no es por sí misma una declaración de emergencia ni garantiza prioridad.",
      }),
      ...escenario65({
        titulo: "11. Emergencia de combustible",
        escenario: "La predicción de combustible al aterrizar cae por debajo de la reserva final requerida.",
        atc: "ATC mantiene una demora.",
        respuesta: "Declarar socorro por combustible conforme a la norma aplicable, comunicar intención y asistencia requerida; no aceptar una espera inviable.",
        razonamiento: "La prioridad cambia por la condición real, no porque el piloto haya dicho antes MINIMUM FUEL.",
      }),
      ...escenario65({
        titulo: "12. Aviso de resolución ACAS",
        escenario: "La aeronave recibe una resolución anticolisión que contradice una instrucción ATC.",
        atc: "ATC sigue dando una instrucción de nivel.",
        respuesta: "Seguir el aviso de resolución según entrenamiento; avisar a ATC tan pronto sea practicable y, al quedar libre de conflicto, comunicar el retorno a la autorización vigente o recibir una nueva.",
        razonamiento: "La FAA AIM trata la desviación por RA y la notificación posterior; el control del avión tiene prioridad sobre redactar una frase larga.",
      }),
      ...escenario65({
        titulo: "13. Emergencia de motor",
        escenario: "Una condición seria aparece durante el ascenso inicial.",
        atc: "ATC intenta transferir el vuelo.",
        respuesta: "Conservar trayectoria, repartir tareas y declarar la prioridad adecuada; comunicar incapacidad, ayuda requerida e intención actual antes de una transferencia innecesaria.",
        razonamiento: "La categoría MAYDAY/PAN PAN depende de la gravedad y efecto de la condición, no de una plantilla de entrevista.",
      }),
      ...escenario65({
        titulo: "14. Motor y al aire iniciado por la tripulación",
        escenario: "La aproximación deja de cumplir criterios del operador.",
        atc: "ATC no ha dado una nueva instrucción.",
        respuesta: "Ejecutar motor y al aire conforme al procedimiento, informar la maniobra y colacionar cualquier rumbo o nivel posterior.",
        razonamiento: "La decisión de abandonar una aproximación inestable no se negocia para satisfacer la secuencia ATC.",
      }),
      ...escenario65({
        titulo: "15. Pérdida de contacto",
        escenario: "Después de un cambio de frecuencia no se establece comunicación.",
        atc: "No hay respuesta de la nueva dependencia.",
        respuesta: "Comprobar radio, selección, audio y frecuencia; usar canales y procedimiento publicados para restaurar contacto. Si persiste, aplicar la falla de comunicaciones del Estado.",
        razonamiento: "No inventar aquí ruta, nivel, tiempo ni frecuencia; en Colombia el procedimiento vigente se consulta en Aerocivil/eAIP.",
      }),
      ...escenario65({
        titulo: "16. Condición de pista con tráfico no visto",
        escenario: "Una entrada a pista se condiciona al paso de otra aeronave que los pilotos no identifican.",
        atc: "ATC formula una instrucción condicional.",
        respuesta: "Decir que no se tiene el tránsito a la vista y no entrar hasta aclarar la condición.",
        razonamiento: "Aceptar una referencia visual no confirmada deja abierta una incursión.",
      }),
      ...escenario65({
        titulo: "17. Salida inmediata sin preparación",
        escenario: "ATC pregunta si el avión está listo para salir de inmediato.",
        atc: "Se solicita disponibilidad inmediata.",
        respuesta: "Responder negativamente si listas, cabina o performance no están listas; informar cuándo se podrá estar listo.",
        razonamiento: "La conveniencia de la secuencia no sustituye los criterios del operador.",
      }),
      ...escenario65({
        titulo: "18. Corrección de colación",
        escenario: "ATC corrige una cifra que el piloto repitió mal.",
        atc: "El controlador transmite una corrección.",
        respuesta: "Repetir la cifra corregida, actualizar nota y selector, y comprobar entre pilotos.",
        razonamiento: "El circuito readback/hearback solo protege si se escucha y ejecuta la corrección.",
      }),
      {
        kind: "sub",
        text: "Caso real documentado: US Airways 1549",
      },
      {
        kind: "p",
        text: "El informe de la Junta Nacional de Seguridad del Transporte de Estados Unidos (NTSB; National Transportation Safety Board) sobre el vuelo US Airways 1549 registra la pérdida casi total de empuje en ambos motores tras el impacto con aves y el acuatizaje en el Hudson. La enseñanza comunicacional es que una intención inicial puede cambiar cuando la tripulación comprueba su capacidad real. El caso se menciona como **hecho documentado**; ninguno de los dieciocho diálogos anteriores pretende reproducir sus transmisiones.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "No inventar datos para sonar seguro",
        text: "En un simulador, si falta el punto, la pista, el límite de combustible o la frecuencia, explica qué dato pedirías y qué publicación verificarías. Una respuesta técnicamente coherente con cifras supuestas enseña el hábito equivocado.",
      },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "La decisión de aceptar, pedir aclaración o comunicar UNABLE va antes de la frase elegante.",
          "Una colación debe ir seguida de selección y monitoreo correctos.",
          "Las contingencias se resuelven con el procedimiento vigente del Estado y del operador.",
          "Las intenciones y limitaciones se actualizan cuando cambia la evaluación.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "FAA AIM · NTSB DCA09MA026 · OACI Anexo 6",
        bloques: [
          { kind: "p", text: "FAA, Aeronautical Information Manual §4-4-7, responsabilidad de aceptar o rechazar y colación: https://www.faa.gov/air_traffic/publications/aim_html/chap4_section_4.html" },
          { kind: "p", text: "FAA, Aeronautical Information Manual §4-4-17, aviso de resolución y notificación a ATC: https://www.faa.gov/air_traffic/publications/aim_html/chap4_section_4.html" },
          { kind: "p", text: "OACI, Anexo 6 Parte I, criterios de combustible mínimo y emergencia de combustible (la aplicación operacional se verifica en la edición vigente y el manual del explotador): https://www.icao.int/safety/CAPSCA/PublishingImages/Pages/ICAO-SARPs-%28Annexes-and-PANS%29/Annex%206.pdf" },
          { kind: "p", text: "NTSB, expediente DCA09MA026, hechos del vuelo US Airways 1549: https://www.ntsb.gov/investigations/Pages/DCA09MA026.aspx" },
          { kind: "p", text: "Para fraseología, cartas, frecuencias y falla de comunicaciones colombianas vigentes, consultar exclusivamente Aerocivil/eAIP y el SOP del explotador. La foto, el esquema y los dieciocho casos son material didáctico: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
        ],
      },
    ],
  },
  // ── 66 ──────────────────────────────────────────────────────────────────
  {
    n: 66,
    title: "Errores frecuentes de hispanohablantes",
    kicker: "No se evalúa el acento: se protege el significado",
    minutes: 20,
    blocks: [
      {
        kind: "p",
        text: "Un acento latinoamericano no es un error. La escala de competencia lingüística de la Organización de Aviación Civil Internacional (OACI; International Civil Aviation Organization, ICAO), reproducida en el Doc 9835, admite influencia de la lengua materna mientras la comprensión operacional se conserve. Lo que sí importa es que una palabra, cifra o respuesta **cambie el significado de la instrucción**. Esta lección compara calcos habituales del español con la decisión de radio que necesita claridad; las frases de ejemplo son didácticas y no transcripciones de vuelos.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-66-01.svg",
        alt: "Cuatro contrastes esenciales: recibido frente a sí, frase de cortesía frente a solicitud directa, expectativa frente a autorización y número oído frente a número confirmado.",
        ancho: 1600,
        alto: 900,
        pie: "Contrastes de sentido, no un examen de acento. La defensa es escoger la palabra que expresa la acción exacta, colacionar el dato crítico y preguntar cuando falta información.",
      },
      { kind: "sub", text: "Doce contrastes que cambian la operación" },
      {
        kind: "table",
        head: ["Calco o hábito", "Por qué puede fallar", "Defensa"],
        rows: [
          ["ROGER para decir «sí»", "Acusa recepción; no responde una pregunta de capacidad o disponibilidad.", "Responder afirmativa o negativamente con la palabra prevista en la fraseología aplicable."],
          ["ROGER para un nivel", "No permite saber qué nivel oyó el piloto.", "Colacionar el nivel completo y confirmar que se seleccionó el mismo valor."],
          ["«Affirmative» en contexto OACI", "La palabra normalizada OACI es AFFIRM; la FAA permite «Affirmative» en su práctica.", "Usar el término del Estado/entorno donde se opera; no enseñar una variante estadounidense como si fuera regla OACI."],
          ["«Repeat» por «repita»", "No es la petición normalizada de repetición.", "SAY AGAIN, especificando el elemento si solo una parte quedó cubierta."],
          ["«Okay», «copy» o «no problem»", "No distinguen recibir, aceptar, cumplir o colacionar.", "Usar la palabra normalizada apropiada o repetir el dato crítico."],
          ["«Ready for take-off» antes del permiso", "La palabra TAKEOFF puede escucharse fuera de una autorización real.", "Informar listo para salida según fraseología local; reservar TAKEOFF para autorización o cancelación."],
          ["Números como inglés cotidiano", "Agrupar dígitos puede confundir pista, rumbo o nivel.", "Pronunciar cada dígito según la regla aplicable y ritmo que permita verificarlo."],
          ["«Point» o «comma» en una frecuencia", "El separador radiofónico en inglés se expresa DECIMAL.", "Usar DECIMAL y colacionar la frecuencia recibida, sin crear una de ejemplo."],
          ["«Course» cuando se pide rumbo", "Heading, track y course no describen exactamente la misma referencia.", "Pedir o colacionar el parámetro que ATC realmente asignó; aclarar si hay duda."],
          ["«Ascend» o «go down»", "Se aparta de CLIMB y DESCEND, las palabras reconocibles de la instrucción.", "Usar el verbo normalizado para una autorización de nivel."],
          ["Traducción de «actualmente» como actually", "En inglés actually suele introducir una corrección, no solo tiempo presente.", "Decir now si importa el estado actual; separar hechos de correcciones."],
          ["Cortesía extensa antes del pedido", "Retrasa la información útil y ocupa la frecuencia.", "Dependencia, indicativo, petición y motivo breve cuando sea necesario."],
        ],
      },
      { kind: "sub", text: "La diferencia importante entre sistemas" },
      {
        kind: "p",
        text: "No se deben mezclar variantes sin aviso. La guía de fraseología de OACI usa AFFIRM como respuesta afirmativa normalizada; la Aeronautical Information Manual de la Administración Federal de Aviación de Estados Unidos (FAA; Federal Aviation Administration) admite «Affirmative» entre las respuestas de acuse en su sistema. La enseñanza para un candidato colombiano es **verificar la fraseología vigente del Estado y el procedimiento del explotador**, no memorizar una corrección universal basada en una sola jurisdicción.",
      },
      {
        kind: "p",
        text: "ROGER, WILCO, AFFIRM, NEGATIVE y SAY AGAIN tienen funciones distintas. La selección depende de si la transmisión contenía información, una pregunta, una instrucción simple o un dato que exige colación. Si la instrucción incluye pista, nivel, rumbo u otro número crítico, una palabra de acuse puede ser insuficiente. La FAA AIM §4-4-7 recomienda repetir las cifras pertinentes con el indicativo para que el controlador detecte una discrepancia.",
      },
      { kind: "sub", text: "Entrenamiento de escucha y respuesta" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Grabar una lectura breve de una instrucción sin datos inventados: usar campos entre corchetes o una autorización real debidamente anonimizada y autorizada para estudio.",
          "Escuchar si el destinatario, la acción, las condiciones y las cifras se distinguen sin depender del contexto visual.",
          "Reformular la respuesta de manera más breve **sin quitar un dato obligatorio**. No buscar acento nativo; buscar inteligibilidad.",
          "Pedir a otra persona que identifique qué entendió. Si difiere, corregir el elemento que causa ambigüedad y repetir.",
        ],
      },
      {
        kind: "escenario",
        titulo: "ROGER no contesta una capacidad",
        situacion: "Ejercicio didáctico, no transmisión real. ATC pregunta si la tripulación puede aceptar una salida inmediata. El piloto responde «Roger» mientras la lista de antes del despegue sigue abierta.",
        preguntas: [
          { q: "¿Qué información falta para ATC?", a: "Si el avión está realmente listo para una salida inmediata. ROGER solo confirma recepción." },
          { q: "¿Qué sería una respuesta segura?", a: "Responder negativamente y comunicar que necesita terminar la preparación; después avisar cuando esté listo conforme a fraseología local." },
          { q: "¿Por qué no basta hablar con buen acento?", a: "El problema no es pronunciación: es que la palabra elegida expresa una función distinta." },
        ],
        concepto: "La precisión semántica importa más que sonar nativo.",
      },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "La escala OACI permite acento si se mantiene la comprensión.",
          "Una palabra de acuse no reemplaza respuesta sí/no ni colación de datos críticos.",
          "Las variantes FAA y OACI se identifican, no se mezclan como regla universal.",
          "Brevedad significa retirar cortesía redundante, no eliminar restricciones.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "OACI Doc 9835 · FAA AIM §§4-2 y 4-4",
        bloques: [
          { kind: "p", text: "OACI, Doc 9835, 2.ª edición, Apéndice A, escala de competencia lingüística y relación entre pronunciación y comprensión: https://www4.icao.int/aelts/uploads/icao%20doc9835%202nd%20edition.pdf" },
          { kind: "p", text: "FAA, Aeronautical Information Manual §4-2, técnicas de radiotelefonía y palabras de acuse usadas en Estados Unidos: https://www.faa.gov/air_traffic/publications/aim_html/chap4_section_2.html" },
          { kind: "p", text: "FAA, Aeronautical Information Manual §4-4-7, colación de elementos críticos: https://www.faa.gov/air_traffic/publications/aim_html/chap4_section_4.html" },
          { kind: "p", text: "Para fraseología, frecuencias y procedimientos colombianos vigentes, consultar Aerocivil/eAIP y el manual del explotador. La foto, el esquema y el escenario son didácticos: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
        ],
      },
    ],
  },
  // ── 67 ──────────────────────────────────────────────────────────────────
  {
    n: 67,
    title: "Qué escuchar primero",
    kicker: "Destinatario, acción, dato y condición antes de actuar",
    minutes: 18,
    blocks: [
      {
        kind: "p",
        text: "Una instrucción ATC puede llegar cuando la tripulación también cambia configuración, verifica una restricción o prepara una aproximación. La solución no es oír solo la primera cifra. Es construir una imagen completa del mensaje y separar **a quién va dirigido, qué acción exige, qué dato la define, cuándo aplica y qué ocurrirá después**. Este orden es una herramienta didáctica del módulo; no sustituye la fraseología ni las reglas de colación del Estado y del explotador.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-67-01.svg",
        alt: "Secuencia de cinco preguntas para escuchar una instrucción ATC: destinatario, acción, dato, condición y paso siguiente.",
        ancho: 1600,
        alto: 900,
        pie: "La condición puede cambiar el sentido de toda la instrucción. El piloto confirma los elementos críticos antes de programar y ejecutar; el otro piloto coteja y ambos escuchan el hearback.",
      },
      {
        kind: "table",
        head: ["Pregunta de escucha", "Qué debe quedar claro", "Error que evita"],
        rows: [
          ["1 · ¿Para quién?", "Distintivo completo; si hay otro parecido, detener la atribución automática.", "Ejecutar una instrucción destinada a otro avión."],
          ["2 · ¿Qué acción?", "Verbo de autorización, instrucción, información o expectativa.", "Confundir EXPECT con CLEARED, CONTACT con MONITOR o STANDBY con permiso."],
          ["3 · ¿Qué dato?", "Pista, nivel, rumbo, velocidad, frecuencia, punto u otro valor crítico.", "Programar la cifra esperada en vez de la recibida."],
          ["4 · ¿Qué condición?", "Antes, después, al pasar, hasta, detrás de, por encima o por debajo.", "Ejecutar demasiado pronto o ignorar una restricción."],
          ["5 · ¿Qué sigue?", "Reporte, transferencia, verificación de capacidad o espera de una autorización adicional.", "Terminar la colación y perder el próximo paso."],
        ],
      },
      { kind: "sub", text: "Un ciclo de cabina, no solo una técnica de memoria" },
      {
        kind: "list",
        ordered: true,
        items: [
          "El piloto que atiende la radio identifica el distintivo completo. Si la transmisión está bloqueada, incompleta o podría ser para otro avión, no ejecuta y pide repetición.",
          "Descompone el mensaje en acción, valor y condición. El piloto que vuela conserva el control de trayectoria; el otro puede anotar y anticipar el ajuste, pero no convierte una expectativa en autorización.",
          "Comprueba si la maniobra puede cumplirse con las limitaciones reales. Si no, comunica UNABLE oportunamente y solicita una alternativa; una colación literal no demuestra capacidad.",
          "Colaciona los elementos que lo requieren con el distintivo. Mantiene el orden de las restricciones cuando ayuda a detectar errores. La FAA AIM §4-4-7 pide repetir niveles, restricciones y vectores en la secuencia recibida para esa operación estadounidense.",
          "Ambos comparan autorización, pantalla y trayectoria. Escuchan la respuesta del controlador a la colación; si corrige un dato, actualizan el plan antes de actuar.",
        ],
      },
      {
        kind: "escenario",
        titulo: "La cifra correcta con el momento incorrecto",
        situacion: "Ejercicio didáctico, no transcripción real. La tripulación recibe un descenso a [nivel asignado] que empieza **después de [punto publicado o autorizado]**. El piloto que programa oye bien el nivel, pero omite la condición temporal y selecciona el descenso de inmediato.",
        preguntas: [
          { q: "¿Cuál era el elemento de mayor riesgo?", a: "La condición «después de». El valor de nivel era correcto, pero iniciar antes transforma la instrucción y puede afectar la separación." },
          { q: "¿Cómo se protege la tripulación?", a: "Colaciona nivel y condición, verifica el punto y retiene el nivel previo hasta cumplir la condición. Si existe duda sobre el punto o la capacidad, solicita aclaración antes de iniciar." },
        ],
        concepto: "La condición no es una nota accesoria de la autorización.",
      },
      {
        kind: "escenario",
        titulo: "Pista y límite de rodaje",
        situacion: "Ejercicio didáctico, no transcripción real. La autorización incluye una ruta de rodaje y una instrucción de mantener fuera de [pista]. En la cabina se recuerda la ruta, pero el límite queda oculto al final de una transmisión larga.",
        preguntas: [
          { q: "¿Qué se colaciona y verifica?", a: "Ruta aplicable, pista involucrada y límite de mantener fuera. El piloto que no conduce el avión señala el punto de detención y comprueba que nadie lo sobrepase sin autorización específica." },
          { q: "¿Qué hacer si la última parte quedó tapada?", a: "Detener el avance en un lugar seguro, pedir repetición de la instrucción de límite y no inferir permiso de cruce desde la ruta general de rodaje." },
        ],
        concepto: "La autorización de rodaje no concede por sí sola el cruce de una pista.",
      },
      {
        kind: "escenario",
        titulo: "Dos distintivos parecidos",
        situacion: "Ejercicio didáctico, no transcripción real. ATC transmite una instrucción de viraje a un avión cuyo distintivo se parece al propio. La tripulación reconoce el rumbo que esperaba y está a punto de seleccionarlo.",
        preguntas: [
          { q: "¿Cuál es el primer filtro?", a: "El distintivo completo, antes del verbo y de la cifra. Una instrucción plausible no necesariamente pertenece al propio vuelo." },
          { q: "¿Qué se comunica si persiste la duda?", a: "Se solicita confirmación del destinatario con el propio distintivo. Mientras no se aclare, se mantiene la autorización previa y se vigila la trayectoria." },
        ],
        concepto: "La expectativa no reemplaza la identificación.",
      },
      { kind: "sub", text: "Excepciones que cambian la prioridad" },
      {
        kind: "p",
        text: "El orden de cinco preguntas no obliga a procesar siempre en secuencia rígida. Una condición de pista, una instrucción de evitar tránsito o una emergencia puede exigir atención inmediata; el piloto primero mantiene el control del avión y evita el peligro. Tampoco se debe esperar a reconstruir un mensaje entero para pedir SAY AGAIN si una parte crítica quedó cubierta. La técnica ordena la memoria, pero **la seguridad determina la prioridad**.",
      },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Primero comprueba que la transmisión sea para ti; luego acción, dato, condición y paso siguiente.",
          "Una cifra bien oída con una condición omitida sigue siendo una autorización mal entendida.",
          "Colacionar, verificar en cabina, escuchar la corrección y monitorizar la trayectoria forman un mismo ciclo.",
          "Los escenarios usan campos entre corchetes: no representan una ruta, frecuencia ni transmisión real.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "FAA AIM §4-4-7 · OACI Doc 9432",
        bloques: [
          { kind: "p", text: "FAA, Aeronautical Information Manual §4-4-7: registro de autorizaciones IFR, colación de niveles, restricciones, vectores y pistas, identificación del avión, y responsabilidad del piloto de aceptar o rechazar una autorización: https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap4_section_4.html" },
          { kind: "p", text: "FAA, Aeronautical Information Manual §4-2: contacto, identificación y técnicas generales de radiotelefonía: https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap4_section_2.html" },
          { kind: "p", text: "OACI, Manual of Radiotelephony, Doc 9432, 4.ª edición: referencia de fraseología y colación, no fuente de las situaciones inventadas de esta lección: https://store.icao.int/en/manual-of-radiotelephony-doc-9432" },
          { kind: "p", text: "Para procedimientos, frecuencias, puntos y cartas vigentes en Colombia, consultar solo Aerocivil/eAIP. La foto, el esquema y los escenarios son didácticos: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
        ],
      },
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
