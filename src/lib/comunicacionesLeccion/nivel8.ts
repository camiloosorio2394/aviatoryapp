/**
 * Nivel 8 · Práctica y repaso, lecciones 62 a 69.
 *
 * Los ejercicios distinguen plantillas didácticas de transcripciones reales.
 * No se asignan indicativos, rutas, frecuencias ni datos de cartas inventados.
 * Las fichas de la lección 69 usan campos entre corchetes y exigen contrastar
 * fraseología y datos operacionales con las fuentes vigentes del Estado.
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

/** Una ficha de estudio con función y plantilla sin datos operacionales inventados. */
type Frase = { n: number; frase: string; significado: string; ejemplo: string }

function fichasFrases(titulo: string, frases: Frase[]): DocBlockData {
  return {
    kind: "fichas",
    titulo,
    columnas: 2,
    items: frases.map((f) => ({
      titulo: `${f.n}. ${f.frase}`,
      ref: "Plantilla didáctica · consultar fuente vigente",
      puntosRotulo: "Función y uso",
      puntos: [`**FUNCIÓN:** ${f.significado}`, `**USO DIDÁCTICO:** ${f.ejemplo}`],
    })),
  }
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
    kicker: "Cuatro defensas que sostienen toda la operación",
    minutes: 15,
    blocks: [
      {
        kind: "p",
        text: "Al llegar al final del módulo no conviene recitar frases sueltas. Un piloto aspirante a aerolínea debe demostrar que puede **escuchar, decidir, comunicar y verificar** bajo carga de trabajo real. La radio es una barrera de seguridad integrada con navegación, gestión de recursos de cabina y procedimientos del explotador. Estos principios reúnen el curso; no son una lista de comprobación que sustituya los procedimientos vigentes.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-68-01.svg",
        alt: "Cuatro defensas de comunicación operacional: escuchar, decidir, comunicar y verificar.",
        ancho: 1600,
        alto: 900,
        pie: "Una respuesta segura no termina cuando se suelta el pulsador: la tripulación confirma el dato, observa la respuesta ATC y comprueba que la aeronave siga la trayectoria correcta.",
      },
      { kind: "sub", text: "1 · Escuchar y atribuir correctamente" },
      {
        kind: "list",
        items: [
          "**Protege la frecuencia.** Escucha antes de transmitir; prepara destinatario, indicativo, petición y motivo breve antes de accionar el pulsador.",
          "**Confirma el destinatario.** Un distintivo parecido, una transmisión bloqueada o una cifra que coincide con lo esperado exigen más atención, no una inferencia rápida.",
          "**Separa acción de expectativa.** STANDBY no autoriza; una aproximación prevista no es una autorización de aterrizaje; una ruta aprobada no abre una pista.",
          "**Escucha la condición completa.** Antes, después, hasta, detrás de y al pasar pueden cambiar el momento de la maniobra aun si el valor fue entendido.",
          "**Pide aclaración temprano.** Si falta una palabra crítica, solicita SAY AGAIN o CONFIRM según corresponda, sin rellenar el vacío con memoria o con la pantalla.",
        ],
      },
      { kind: "sub", text: "2 · Decidir antes de aceptar" },
      {
        kind: "list",
        items: [
          "**Evalúa la capacidad real.** Una autorización solo sirve si la aeronave puede cumplirla en la posición y configuración presentes. Si no puede, comunica UNABLE y una necesidad concreta.",
          "**Mantén la prioridad de vuelo.** Controlar la aeronave y evitar un conflicto inmediato precede a una transmisión extensa; el piloto que monitoriza puede ayudar sin desatender la trayectoria.",
          "**No confundas estados de combustible.** MINIMUM FUEL indica que cambios o demoras adicionales pueden comprometer la reserva final; una emergencia de combustible requiere la declaración de socorro correspondiente. No son sinónimos.",
          "**Ante un aviso de resolución del sistema anticolisión, sigue el procedimiento aplicable.** Avisa a ATC cuando la carga de trabajo lo permita y comunica al terminar la maniobra, conforme a la guía vigente del equipo y del Estado.",
          "**En una emergencia, comunica lo que permite ayudar.** Naturaleza del problema, intención, posición o nivel cuando corresponda y asistencia requerida; amplía después, sin retrasar el control de la aeronave.",
        ],
      },
      { kind: "sub", text: "3 · Comunicar con significado exacto" },
      {
        kind: "list",
        items: [
          "**Usa fraseología normalizada cuando exista.** Para situaciones que no cubre, usa inglés claro y directo, no una imitación insegura de una fórmula.",
          "**Distingue recibir, aceptar y cumplir.** ROGER, WILCO, AFFIRM y NEGATIVE no intercambian funciones; una palabra de acuse no reemplaza la colación de un dato crítico.",
          "**Di la cifra completa cuando sea esencial.** Nivel, rumbo, pista, velocidad, código y restricción se comunican según el procedimiento aplicable; no los abrevies porque parezcan obvios.",
          "**No persigas un acento nativo.** La escala OACI evalúa inteligibilidad, estructura, vocabulario, fluidez, comprensión e interacción; una pronunciación clara vale más que un discurso elaborado.",
          "**Diferencia sistemas.** Voz y enlace de datos tienen ciclos distintos; un mensaje de autorización por data link debe revisarse dentro de la tripulación y aplicarse según el procedimiento del explotador.",
        ],
      },
      { kind: "sub", text: "4 · Cerrar el ciclo en cabina" },
      {
        kind: "list",
        items: [
          "**Colaciona y escucha el hearback.** Repite los elementos críticos con el distintivo y atiende cualquier corrección de ATC.",
          "**Cruza autorización, entrada y trayectoria.** Los dos pilotos cotejan lo que se dijo con el ajuste seleccionado y con lo que efectivamente vuela el avión.",
          "**No des por concluida una maniobra por haberla anunciado.** Una instrucción recibida, colacionada e introducida todavía necesita vigilancia de ejecución y de sus límites.",
          "**Consulta la fuente vigente.** Las variantes nacionales, cartas, frecuencias y procedimientos locales no se deducen de un ejemplo de entrenamiento; en Colombia se consultan Aerocivil/eAIP y el manual del explotador.",
        ],
      },
      {
        kind: "escenario",
        titulo: "Cierre de una autorización compleja",
        situacion: "Ejercicio didáctico, no transmisión real. En descenso hacia [aeródromo], ATC modifica el nivel autorizado y añade una condición de cruce. Al mismo tiempo la tripulación prepara una aproximación distinta a la esperada.",
        preguntas: [
          { q: "¿Qué hace primero el piloto que vuela?", a: "Conserva la trayectoria autorizada y comprueba si la nueva instrucción puede cumplirse. No inicia el descenso condicionado antes del punto." },
          { q: "¿Qué hace el piloto que monitoriza?", a: "Anota acción, nivel y condición; colaciona todo lo crítico, escucha el hearback y compara la programación con la autorización mientras ambos mantienen conciencia de la aproximación." },
          { q: "¿Y si no puede alcanzar la restricción?", a: "Lo comunica de inmediato con UNABLE y solicita alternativa; no colaciona como aceptado algo que sabe imposible." },
        ],
        concepto: "La radio es parte de una decisión compartida, no un trámite verbal aislado.",
      },
      {
        kind: "summary",
        title: "Para una entrevista o simulador",
        items: [
          "Explica la secuencia escuchar → decidir → comunicar → verificar con un ejemplo operacional completo.",
          "Muestra qué dato o condición pondría en riesgo la separación, la pista o la trayectoria.",
          "Di qué harías si no entendiste o no puedes cumplir, y cómo confirmarías que la instrucción se ejecutó correctamente.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "FAA AIM · OACI Doc 9835 · OACI Anexo 6",
        bloques: [
          { kind: "p", text: "FAA, Aeronautical Information Manual §§4-2 y 4-4-7, técnicas de radio, responsabilidad ante autorizaciones y colación de niveles, vectores y pistas: https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap4_section_4.html" },
          { kind: "p", text: "OACI, Doc 9835, Manual on the Implementation of ICAO Language Proficiency Requirements, escala y uso de fraseología e inglés claro: https://www4.icao.int/aelts/uploads/icao%20doc9835%202nd%20edition.pdf" },
          { kind: "p", text: "OACI, materiales oficiales de formación sobre gestión de combustible: MINIMUM FUEL y MAYDAY FUEL describen estados diferentes: https://icao.int/SAM/Documents/2014-EDTO/EDTO%20Module%20%207%20%E2%80%93Implementing%20EDTO%20regulations.pdf" },
          { kind: "p", text: "FAA, AIM §4-4, operación ante avisos TCAS/ACAS; aplicar además el manual del equipo y del explotador: https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap4_section_4.html" },
          { kind: "p", text: "Para Colombia, datos y procedimientos vigentes exclusivamente de Aerocivil/eAIP. Fotografía, esquema y escenario: material didáctico, no registro de vuelo: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
        ],
      },
    ],
  },
  // ── 69 ──────────────────────────────────────────────────────────────────
  {
    n: 69,
    title: "Repaso rápido: 50 frases",
    kicker: "Significado, respuesta y decisión en cada fase",
    minutes: 25,
    blocks: [
      {
        kind: "p",
        text: "Estas cincuenta fichas son un repaso de funciones, no cincuenta autorizaciones listas para copiar. Los campos entre corchetes se llenan solo con datos recibidos, publicados o confirmados en la operación real. No se incluyen rutas, indicativos, frecuencias ni pistas inventadas. La Administración Federal de Aviación de Estados Unidos (FAA; Federal Aviation Administration) ofrece en su Aeronautical Information Manual (AIM) un ejemplo documentado de colación de nivel con «United Twelve»; aquí se cita como ejemplo de la guía, **no como transcripción de un vuelo**. Cada ficha debe contrastarse con la fraseología del Estado y el manual del explotador.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-69-01.svg",
        alt: "Cuatro preguntas para estudiar cada frase: qué significa, qué requiere colación, qué acción permite y qué queda por confirmar.",
        ancho: 1600,
        alto: 900,
        pie: "La frase por sí sola no basta. Comprueba el destinatario, la acción autorizada, los valores y las condiciones; después coteja la ejecución.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Cómo usar estas fichas",
        text: "Lee la frase, explica su función sin mirar y di qué colacionarías o aclararías en una situación real. Los ejemplos con [campos] son plantillas didácticas, no transmisiones reales ni procedimientos locales publicados.",
      },
      fichasFrases("Acuses, aclaración y límites", [
        { n: 1, frase: "UNABLE", significado: "No puedo cumplir la solicitud, instrucción o autorización; comunico el límite y, si es útil, el motivo.", ejemplo: "UNABLE [restricción] DUE [motivo breve], [indicativo]." },
        { n: 2, frase: "WILCO", significado: "Recibí y cumpliré una instrucción; no sustituye una colación obligatoria.", ejemplo: "WILCO, [indicativo], solo si el mensaje no exige repetir un dato crítico." },
        { n: 3, frase: "ROGER", significado: "Recibí la transmisión; no significa sí ni demuestra qué cifra se oyó.", ejemplo: "ROGER, [indicativo], para información sin acción ni pregunta sí/no." },
        { n: 4, frase: "AFFIRM", significado: "Respuesta afirmativa en fraseología OACI; verificar variante aplicable en cada Estado.", ejemplo: "AFFIRM, [indicativo], ante una pregunta clara de sí/no." },
        { n: 5, frase: "NEGATIVE", significado: "Respuesta negativa o corrección; no equivale a una explicación de incapacidad.", ejemplo: "NEGATIVE, [indicativo]; ampliar si ATC necesita conocer el motivo." },
        { n: 6, frase: "SAY AGAIN", significado: "Solicito repetición de la última transmisión o de una parte identificada.", ejemplo: "SAY AGAIN ALL AFTER [palabra o elemento], [indicativo]." },
        { n: 7, frase: "CONFIRM", significado: "Pido verificar una autorización, instrucción o dato que creo haber oído.", ejemplo: "CONFIRM [valor o permiso dudoso], [indicativo]." },
        { n: 8, frase: "STANDBY", significado: "Espere; no concede una autorización.", ejemplo: "Si ATC dice STANDBY, conservo la autorización previa." },
        { n: 9, frase: "CORRECTION", significado: "La parte previa de esta transmisión fue errónea; sigue la versión correcta.", ejemplo: "[dato equivocado], CORRECTION, [dato correcto]." },
        { n: 10, frase: "I SAY AGAIN", significado: "Repito el mensaje para aclarar o enfatizar, no para cambiarlo.", ejemplo: "[dato crítico], I SAY AGAIN, [dato crítico]." },
        { n: 11, frase: "SPEAK SLOWER", significado: "Solicito que reduzcan la velocidad del habla.", ejemplo: "SPEAK SLOWER, [indicativo], si la velocidad impide comprender." },
        { n: 12, frase: "DISREGARD", significado: "Ignore la transmisión o parte indicada.", ejemplo: "DISREGARD [mensaje previo], [indicativo], cuando corresponda." },
        { n: 13, frase: "REQUEST", significado: "Introduzco una petición; no anuncia una autorización recibida.", ejemplo: "[dependencia], [indicativo], REQUEST [acción]." },
        { n: 14, frase: "MONITOR", significado: "Escuche la frecuencia indicada; no es la misma instrucción que CONTACT.", ejemplo: "MONITOR [frecuencia recibida], [indicativo]; no inventar un llamado inicial." },
        { n: 15, frase: "CONTACT", significado: "Establezca comunicación con la dependencia indicada.", ejemplo: "CONTACT [dependencia y frecuencia recibidas]; el primer llamado lleva el indicativo." },
        { n: 16, frase: "RECLEARED", significado: "Nueva autorización que modifica la previa en lo expresamente indicado.", ejemplo: "RECLEARED [nuevo límite o nivel]; comparar con la autorización anterior." },
      ]),
      fichasFrases("Superficie y pista", [
        { n: 17, frase: "CLEARED TO [límite] VIA [ruta]", significado: "Autorización de ruta; comprobar límite, trayectoria y condiciones. No permite entrar en pista.", ejemplo: "Colacionar [límite], [ruta], [nivel] y [código] recibidos." },
        { n: 18, frase: "REQUEST START-UP", significado: "Pedir puesta en marcha conforme al procedimiento local.", ejemplo: "[dependencia], [indicativo], REQUEST START-UP, INFORMATION [letra recibida]." },
        { n: 19, frase: "REQUEST PUSH-BACK", significado: "Pedir retroceso; la aprobación y condiciones deben oírse aparte.", ejemplo: "[dependencia], [indicativo], REQUEST PUSH-BACK." },
        { n: 20, frase: "TAXI TO HOLDING POINT RUNWAY [pista]", significado: "Rodar hasta el punto de espera indicado, sin entrar en pista.", ejemplo: "Colacionar [pista], [ruta de rodaje] y cualquier límite recibido." },
        { n: 21, frase: "HOLD SHORT OF RUNWAY [pista]", significado: "Mantener fuera de esa pista; el límite debe identificarse y colacionarse.", ejemplo: "HOLDING SHORT OF RUNWAY [pista recibida], [indicativo]." },
        { n: 22, frase: "CROSS RUNWAY [pista]", significado: "Cruzar solo la pista autorizada y cumplir la condición de reporte si existe.", ejemplo: "CROSS RUNWAY [pista recibida], [indicativo]; reportar vacada si se pidió." },
        { n: 23, frase: "LINE UP AND WAIT", significado: "Entrar y alinearse cuando corresponda, pero esperar autorización de despegue.", ejemplo: "RUNWAY [pista recibida], LINE UP AND WAIT, [indicativo]." },
        { n: 24, frase: "CLEARED FOR TAKEOFF", significado: "Autorización específica de despegue en la pista indicada.", ejemplo: "RUNWAY [pista recibida], CLEARED FOR TAKEOFF, [indicativo]." },
        { n: 25, frase: "CANCEL TAKEOFF", significado: "Se cancela la autorización; evaluar fase de carrera y responder según procedimiento.", ejemplo: "Ante CANCEL TAKEOFF, ejecutar el procedimiento aplicable y avisar cuando sea posible." },
        { n: 26, frase: "STOP IMMEDIATELY", significado: "Instrucción urgente de detenerse; mantener control de la aeronave.", ejemplo: "STOPPING, [indicativo], cuando la carga de trabajo permita responder." },
      ]),
      fichasFrases("Salida, niveles y vectores", [
        { n: 27, frase: "WHEN PASSING [nivel], CONTACT [dependencia]", significado: "Transferencia diferida; no cambiar antes de cumplir la condición.", ejemplo: "WHEN PASSING [nivel], CONTACT [dependencia y frecuencia recibidas]." },
        { n: 28, frase: "CLIMB TO [nivel]", significado: "Ascender al nivel asignado; distinguirlo de una expectativa futura.", ejemplo: "CLIMBING TO [nivel recibido], [indicativo]." },
        { n: 29, frase: "MAINTAIN [nivel]", significado: "Mantener el nivel indicado hasta nueva instrucción.", ejemplo: "MAINTAINING [nivel recibido], [indicativo]." },
        { n: 30, frase: "STOP DESCENT AT [nivel]", significado: "Interrumpir el descenso y nivelar en el nuevo límite.", ejemplo: "STOP DESCENT AT [nivel recibido], [indicativo]." },
        { n: 31, frase: "EXPEDITE CLIMB / DESCENT", significado: "Acelerar el cambio de nivel si es posible; si no, comunicar UNABLE.", ejemplo: "UNABLE TO EXPEDITE DUE [motivo], [indicativo]." },
        { n: 32, frase: "CROSS [punto] AT OR ABOVE [nivel]", significado: "Restricción vertical en un punto; evaluar la capacidad antes de aceptar.", ejemplo: "Si no es posible: UNABLE TO CROSS [punto] AT [nivel], [indicativo]." },
        { n: 33, frase: "TURN LEFT / RIGHT HEADING [rumbo]", significado: "Vector con dirección y rumbo; ambas partes pueden ser críticas.", ejemplo: "LEFT HEADING [tres dígitos recibidos], [indicativo]." },
        { n: 34, frase: "RESUME OWN NAVIGATION", significado: "Termina el vectoramiento según la instrucción; verificar ruta o punto siguiente.", ejemplo: "RESUME OWN NAVIGATION DIRECT [punto recibido], [indicativo]." },
        { n: 35, frase: "TRAFFIC IN SIGHT / NEGATIVE CONTACT", significado: "Informar si el tránsito señalado está a la vista o no.", ejemplo: "NEGATIVE CONTACT, [indicativo], si no se identifica el tránsito." },
        { n: 36, frase: "SQUAWK [código] / SQUAWK IDENT", significado: "Seleccionar el código recibido o activar IDENT cuando se ordene.", ejemplo: "SQUAWK [cuatro dígitos recibidos], [indicativo]." },
        { n: 37, frase: "CHECK ALTIMETER SETTING AND CONFIRM LEVEL", significado: "Comprobar reglaje altimétrico y confirmar nivel indicado.", ejemplo: "Tras verificar instrumentos: [reglaje y nivel actuales], [indicativo]." },
      ]),
      fichasFrases("Llegada, contingencia y urgencia", [
        { n: 38, frase: "EXPECT [aproximación] RUNWAY [pista]", significado: "Preparar la aproximación esperada; no es autorización para volarla.", ejemplo: "EXPECT [aproximación y pista recibidas]: preparar, sin abandonar la autorización actual." },
        { n: 39, frase: "CLEARED [aproximación] APPROACH", significado: "Autorización para ejecutar la aproximación especificada con sus condiciones.", ejemplo: "CLEARED [aproximación recibida] RUNWAY [pista recibida], [indicativo]." },
        { n: 40, frase: "CONTINUE APPROACH", significado: "Continuar aproximando; aún falta autorización para aterrizar.", ejemplo: "CONTINUING APPROACH, [indicativo]; esperar CLEARED TO LAND." },
        { n: 41, frase: "CLEARED TO LAND", significado: "Autorización específica para aterrizar en la pista indicada.", ejemplo: "RUNWAY [pista recibida], CLEARED TO LAND, [indicativo]." },
        { n: 42, frase: "GO AROUND / GOING AROUND", significado: "Orden de motor y al aire o aviso de la tripulación; seguir trayectoria aplicable.", ejemplo: "GOING AROUND, [indicativo]; comunicar necesidad adicional cuando sea posible." },
        { n: 43, frase: "REDUCE SPEED TO [velocidad]", significado: "Control de velocidad: confirmar cifra y compatibilidad con configuración.", ejemplo: "REDUCING TO [velocidad recibida], [indicativo]." },
        { n: 44, frase: "HOLD AT [punto]", significado: "Instrucción de espera; confirmar punto, nivel, sentido, rumbo/derrota y hora si fueron asignados.", ejemplo: "HOLD AT [punto recibido]; pedir los elementos que falten según el procedimiento aplicable." },
        { n: 45, frase: "REQUEST WEATHER DEVIATION", significado: "Pedir desviación por meteorología con lado, extensión y motivo cuando se conozcan.", ejemplo: "REQUEST DEVIATION [lado y distancia] DUE WEATHER, [indicativo]; esperar respuesta." },
        { n: 46, frase: "CLIMB VIA SID", significado: "En jurisdicciones donde se use, seguir restricciones verticales publicadas de la salida autorizada; consultar carta y variante estatal.", ejemplo: "CLIMB VIA [salida publicada y autorizada] TO [nivel recibido], [indicativo]." },
        { n: 47, frase: "TCAS RA / CLEAR OF CONFLICT", significado: "Aviso de resolución del sistema anticolisión y fin del conflicto; seguir guía de equipo y operador.", ejemplo: "TCAS RA, [indicativo] cuando sea posible; después CLEAR OF CONFLICT." },
        { n: 48, frase: "MINIMUM FUEL", significado: "Aviso de que cambios a la autorización podrían llevar a aterrizar por debajo de la reserva final prevista; no da prioridad automática.", ejemplo: "[dependencia], [indicativo], MINIMUM FUEL." },
        { n: 49, frase: "MAYDAY / MAYDAY FUEL", significado: "Socorro ante peligro grave; para emergencia de combustible se usa la declaración prevista por OACI.", ejemplo: "MAYDAY repetido tres veces, [dependencia], [indicativo], [problema], [intención], [necesidad]." },
        { n: 50, frase: "PAN PAN", significado: "Urgencia que afecta la seguridad sin llegar al estado de socorro descrito por MAYDAY.", ejemplo: "PAN PAN repetido tres veces, [dependencia], [indicativo], [situación], [intención]." },
      ]),
      {
        kind: "escenario",
        titulo: "Del repaso a una decisión real",
        situacion: "Ejercicio didáctico, no transmisión real. Durante rodaje, ATC entrega una ruta que termina en un punto de espera de pista. Más tarde comunica STANDBY ante una solicitud de cruce. La tripulación recibe entonces una indicación de frecuencia para CONTACT otra dependencia.",
        preguntas: [
          { q: "¿Qué tres frases no equivalen a permiso de cruce?", a: "TAXI TO HOLDING POINT limita el rodaje, STANDBY no autoriza y CONTACT solo ordena establecer comunicación. Falta autorización explícita para cruzar la pista." },
          { q: "¿Qué debe retener la tripulación antes de cambiar de frecuencia?", a: "El límite de mantener fuera, la posición exacta y la necesidad de autorización específica. Si la transferencia deja duda, pedir aclaración antes de cualquier movimiento." },
        ],
        concepto: "Conocer una palabra significa conocer también lo que no autoriza.",
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "FAA AIM · OACI Doc 9432 · Aerocivil/eAIP",
        bloques: [
          { kind: "p", text: "FAA, Aeronautical Information Manual §§4-2 y 4-4-7: identificación, palabras de acuse, colación de niveles, vectores y pistas; incluye el ejemplo publicado con United Twelve: https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap4_section_4.html" },
          { kind: "p", text: "OACI, Manual of Radiotelephony, Doc 9432, 4.ª edición: vocabulario y secuencias de radiotelefonía; la fraseología concreta puede variar por Estado: https://store.icao.int/en/manual-of-radiotelephony-doc-9432" },
          { kind: "p", text: "OACI, material de formación de combustible: diferencia entre MINIMUM FUEL y declaración de emergencia: https://icao.int/SAM/Documents/2014-EDTO/EDTO%20Module%20%207%20%E2%80%93Implementing%20EDTO%20regulations.pdf" },
          { kind: "p", text: "Para cartas, frecuencias, rutas y fraseología colombiana vigente, consultar exclusivamente Aerocivil/eAIP. Las imágenes, fichas y el escenario son didácticos, no un registro operacional: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
        ],
      },
    ],
  },
]
