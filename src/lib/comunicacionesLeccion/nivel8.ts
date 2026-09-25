/**
 * Nivel 8 · Práctica y repaso, lecciones 62 a 69.
 *
 * Los ejercicios distinguen plantillas didácticas de transcripciones reales.
 * No se asignan indicativos, rutas, frecuencias ni datos de cartas inventados.
 * Las fichas de la lección 69 usan campos entre corchetes y exigen contrastar
 * fraseología y datos operacionales con las fuentes vigentes del Estado.
 */

import type { DocBlockData, DocScreen } from "@/lib/docBlocks"
import { LECCION_62, LECCION_63 } from "./practicaReal"

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

export const NIVEL_8: DocScreen[] = [
  // ── 62 ──────────────────────────────────────────────────────────────────
  LECCION_62,
  // ── 63 ──────────────────────────────────────────────────────────────────
  LECCION_63,
  // ── 64 ──────────────────────────────────────────────────────────────────
  {
    n: 64,
    title: "Plain English: práctica no normal",
    kicker: "Lo inesperado se describe con hechos, capacidad e intención",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "La fraseología no cubre cada falla, enfermedad o condición meteorológica. El Doc 9835 de la OACI exige que el lenguaje común sea inteligible, directo, pertinente y no ambiguo, sin reemplazar las palabras normalizadas para niveles, autorizaciones, MAYDAY o PAN PAN. En lo no normal se transmiten **hechos confirmados, capacidad real, ayuda requerida e intención actual**.",
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
        kind: "p",
        text: "**Lo viste en la lección 51:** pasajero enfermo, olor a quemado, tren no asegurado, impacto con aves, alerta hidráulica y desvío por meteorología. Aquí quedan cuatro situaciones que no están allí. Ejemplo educativo. El distintivo de llamada de la aerolínea es real; el número de vuelo es ficticio. Los diálogos no son transcripciones de vuelos reales.",
      },
      { kind: "sub", text: "Cuatro situaciones para responder en voz alta" },
      ...caso64({
        titulo: "1. Configuración de alas limitada",
        situacion: "Una superficie de alta sustentación no responde como se esperaba y la tripulación aún no ha establecido las limitaciones finales.",
        comunicar: "Efecto operacional confirmado, tiempo para lista e intención provisional.",
        turnos: ["PILOT: AVIANCA 452, we cannot use the planned configuration. We need to level off and complete the checklist. We will advise the speed limit when confirmed."],
        porQue: "No inventar velocidades o altitudes antes de consultar la documentación de la aeronave. La limitación confirmada se comunica tan pronto sea útil para la separación.",
      }),
      ...caso64({
        titulo: "2. Turbulencia y nivel",
        situacion: "La turbulencia impide mantener el nivel con precisión. El siguiente nivel aún no está autorizado.",
        comunicar: "Incapacidad actual, motivo y solicitud de alternativa.",
        turnos: ["PILOT: AVIANCA 452, unable to maintain the assigned level due severe turbulence. Request a different level. We will advise when stable."],
        porQue: "La información crítica es que la separación puede verse afectada. La petición no constituye por sí misma autorización para cambiar de nivel.",
      }),
      ...caso64({
        titulo: "3. Capacidad de navegación degradada",
        situacion: "El sistema ya no satisface el requisito de la aproximación prevista.",
        comunicar: "Capacidad que se perdió, procedimiento que no puede aceptarse y alternativa solicitada.",
        turnos: ["PILOT: AVIANCA 452, we cannot continue the planned navigation procedure. Request an alternative approach or radar vectors."],
        porQue: "La frase depende de la capacidad realmente perdida y de la aprobación de la aeronave. No afirmar una falla específica de RNP si el diagnóstico no está confirmado.",
      }),
      ...caso64({
        titulo: "4. Posible daño en rueda",
        situacion: "La torre observa restos tras el despegue, pero la tripulación aún no sabe si son propios.",
        comunicar: "Sospecha diferenciada de hechos, necesidades para evaluar y servicios de apoyo.",
        turnos: ["PILOT: AVIANCA 452, the runway debris may be from our aircraft. We have no confirmed tyre indication yet. Request time to assess before landing."],
        porQue: "«May be» comunica incertidumbre. No pedir un tiempo fijo ni prometer aterrizaje inmediato hasta completar la evaluación pertinente.",
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
    minutes: 3,
    blocks: [
      {
        kind: "p",
        text: "En una selección de aerolínea no basta sonar fluido: hay que detectar si la instrucción es para el vuelo, si se entendió completa, si puede cumplirse y qué hará el avión. Son **situaciones didácticas, no transcripciones**. Responde en voz alta antes de abrir cada tarjeta: qué comunicas, qué compruebas y cuándo pides aclaración o dices UNABLE.",
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
        titulo: "2. Cambio de pista durante rodaje",
        escenario: "ATC anuncia una pista distinta antes del punto de espera.",
        atc: "Se comunica una pista nueva.",
        respuesta: "Colacionar la pista; detener o pedir tiempo para revisar salida, performance y configuración. No aplicar la pista anterior por inercia.",
        razonamiento: "La radio, la preparación y el avión deben quedar sincronizados.",
      }),
      ...escenario65({
        titulo: "3. Duda en rodaje nocturno",
        escenario: "La tripulación no identifica con certeza la intersección que aparece adelante.",
        atc: "No hay mensaje nuevo.",
        respuesta: "Detenerse en lugar seguro, comunicar posición confirmada y pedir aclaración de la ruta antes de continuar.",
        razonamiento: "Avanzar con una duda cerca de pista aumenta el riesgo de incursión.",
      }),
      ...escenario65({
        titulo: "4. Espera y combustible",
        escenario: "ATC asigna una demora y el combustible reduce la flexibilidad de la tripulación.",
        atc: "Se ofrece una espera.",
        respuesta: "Colacionar la instrucción completa, evaluar combustible con datos del vuelo y comunicar oportunamente el límite o el estado de combustible según corresponda.",
        razonamiento: "La dependencia no puede gestionar un límite que no conoce. No usar MINIMUM FUEL como sustituto de una emergencia real.",
      }),
      ...escenario65({
        titulo: "5. Condición de pista con tráfico no visto",
        escenario: "Una entrada a pista se condiciona al paso de otra aeronave que los pilotos no identifican.",
        atc: "ATC formula una instrucción condicional.",
        respuesta: "Decir que no se tiene el tránsito a la vista y no entrar hasta aclarar la condición.",
        razonamiento: "Aceptar una referencia visual no confirmada deja abierta una incursión.",
      }),
      ...escenario65({
        titulo: "6. Salida inmediata sin preparación",
        escenario: "ATC pregunta si el avión está listo para salir de inmediato.",
        atc: "Se solicita disponibilidad inmediata.",
        respuesta: "Responder negativamente si listas, cabina o performance no están listas; informar cuándo se podrá estar listo.",
        razonamiento: "La conveniencia de la secuencia no sustituye los criterios del operador.",
      }),
      {
        kind: "p",
        text: "El caso real de una intención que cambia con la capacidad del avión (US Airways 1549) está en la lección 51.",
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
        etiqueta: "Más escenarios",
        cita: "Doce situaciones más",
        bloques: [
          ...escenario65({
            titulo: "7. Velocidad incompatible",
            escenario: "La tripulación no puede reducir al valor solicitado en la configuración y fase actuales.",
            atc: "ATC solicita reducir velocidad.",
            respuesta: "Informar UNABLE con la limitación confirmada y pedir una alternativa; no inventar una velocidad mínima de un avión genérico.",
            razonamiento: "El controlador necesita el límite real. La configuración para cumplir solo se modifica si el SOP y la situación lo permiten.",
          }),
          ...escenario65({
            titulo: "8. Desvío por tormenta",
            escenario: "El radar meteorológico muestra que la ruta autorizada atraviesa una célula.",
            atc: "No hay autorización nueva todavía.",
            respuesta: "Solicitar con tiempo una desviación concreta y esperar la respuesta; si ya se requiere una contingencia, seguir el procedimiento publicado.",
            razonamiento: "Una solicitud no mueve por sí sola el límite de la ruta autorizada.",
          }),
          ...escenario65({
            titulo: "9. Cambio de aproximación",
            escenario: "Durante la llegada se propone un procedimiento diferente al preparado.",
            atc: "ATC indica esperar otra aproximación.",
            respuesta: "Repetir lo recibido como expectativa, pedir tiempo o vectores si hace falta y no confundir EXPECT con autorización.",
            razonamiento: "Preparación incompleta es una razón operacional para pedir tiempo, no para improvisar la entrada.",
          }),
          ...escenario65({
            titulo: "10. Distintivos similares",
            escenario: "Otra aeronave en frecuencia tiene un indicativo muy parecido.",
            atc: "Una instrucción puede dirigirse a la otra aeronave.",
            respuesta: "No actuar hasta identificar el distintivo completo. Si persiste la duda, pedir confirmación para el propio vuelo.",
            razonamiento: "La colación con identificador propio permite detectar respuesta del destinatario equivocado.",
          }),
          ...escenario65({
            titulo: "11. Transmisión cubierta",
            escenario: "Una instrucción esperada llega fragmentada por una transmisión simultánea.",
            atc: "Solo se oyen palabras aisladas.",
            respuesta: "Pedir SAY AGAIN de todo o de la parte perdida; no completar números con lo esperado.",
            razonamiento: "El sesgo de expectativa puede producir una colación coherente de un mensaje que nunca se oyó.",
          }),
          ...escenario65({
            titulo: "12. Combustible mínimo",
            escenario: "Una autorización al destino ya no admite demoras adicionales sin afectar la planificación de reserva.",
            atc: "ATC anuncia posible demora.",
            respuesta: "Comunicar MINIMUM FUEL conforme al procedimiento aplicable y explicar cualquier límite de espera; vigilar si la situación exige declaración de socorro.",
            razonamiento: "MINIMUM FUEL no es por sí misma una declaración de emergencia ni garantiza prioridad.",
          }),
          ...escenario65({
            titulo: "13. Emergencia de combustible",
            escenario: "La predicción de combustible al aterrizar cae por debajo de la reserva final requerida.",
            atc: "ATC mantiene una demora.",
            respuesta: "Declarar socorro por combustible conforme a la norma aplicable, comunicar intención y asistencia requerida; no aceptar una espera inviable.",
            razonamiento: "La prioridad cambia por la condición real, no porque el piloto haya dicho antes MINIMUM FUEL.",
          }),
          ...escenario65({
            titulo: "14. Aviso de resolución ACAS",
            escenario: "La aeronave recibe una resolución anticolisión que contradice una instrucción ATC.",
            atc: "ATC sigue dando una instrucción de nivel.",
            respuesta: "Seguir el aviso de resolución según entrenamiento; avisar a ATC tan pronto sea practicable y, al quedar libre de conflicto, comunicar el retorno a la autorización vigente o recibir una nueva.",
            razonamiento: "La FAA AIM trata la desviación por RA y la notificación posterior; el control del avión tiene prioridad sobre redactar una frase larga.",
          }),
          ...escenario65({
            titulo: "15. Emergencia de motor",
            escenario: "Una condición seria aparece durante el ascenso inicial.",
            atc: "ATC intenta transferir el vuelo.",
            respuesta: "Conservar trayectoria, repartir tareas y declarar la prioridad adecuada; comunicar incapacidad, ayuda requerida e intención actual antes de una transferencia innecesaria.",
            razonamiento: "La categoría MAYDAY/PAN PAN depende de la gravedad y efecto de la condición, no de una plantilla de entrevista.",
          }),
          ...escenario65({
            titulo: "16. Motor y al aire iniciado por la tripulación",
            escenario: "La aproximación deja de cumplir criterios del operador.",
            atc: "ATC no ha dado una nueva instrucción.",
            respuesta: "Ejecutar motor y al aire conforme al procedimiento, informar la maniobra y colacionar cualquier rumbo o nivel posterior.",
            razonamiento: "La decisión de abandonar una aproximación inestable no se negocia para satisfacer la secuencia ATC.",
          }),
          ...escenario65({
            titulo: "17. Pérdida de contacto",
            escenario: "Después de un cambio de frecuencia no se establece comunicación.",
            atc: "No hay respuesta de la nueva dependencia.",
            respuesta: "Comprobar radio, selección, audio y frecuencia; usar canales y procedimiento publicados para restaurar contacto. Si persiste, aplicar la falla de comunicaciones del Estado.",
            razonamiento: "No inventar aquí ruta, nivel, tiempo ni frecuencia; en Colombia el procedimiento vigente se consulta en Aerocivil/eAIP.",
          }),
          ...escenario65({
            titulo: "18. Corrección de colación",
            escenario: "ATC corrige una cifra que el piloto repitió mal.",
            atc: "El controlador transmite una corrección.",
            respuesta: "Repetir la cifra corregida, actualizar nota y selector, y comprobar entre pilotos.",
            razonamiento: "El circuito readback/hearback solo protege si se escucha y ejecuta la corrección.",
          }),
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
    minutes: 3,
    blocks: [
      {
        kind: "p",
        text: "Un acento latinoamericano no es un error. La escala de competencia lingüística de la OACI (Doc 9835) admite la influencia de la lengua materna mientras la comprensión operacional se conserve. Lo que importa es que una palabra, cifra o respuesta **cambie el significado de la instrucción**. Aquí van los calcos que vienen del español; las frases son didácticas.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-66-01.svg",
        alt: "Cuatro contrastes esenciales: recibido frente a sí, frase de cortesía frente a solicitud directa, expectativa frente a autorización y número oído frente a número confirmado.",
        ancho: 1600,
        alto: 900,
        pie: "Contrastes de sentido, no un examen de acento. La defensa es escoger la palabra que expresa la acción exacta, colacionar el dato crítico y preguntar cuando falta información.",
      },
      {
        kind: "p",
        text: "**Lo viste en la lección 61:** ROGER en lugar de «sí» o de una colación, «okay» y «copy», AFFIRM frente a «affirmative» y TAKEOFF fuera de lugar son errores de cualquier piloto. Las palabras normalizadas están en la lección 11.",
      },
      { kind: "sub", text: "Siete calcos que cambian la operación" },
      {
        kind: "table",
        head: ["Calco o hábito", "Por qué puede fallar", "Defensa"],
        rows: [
          ["«Repeat» por «repita»", "No es la petición normalizada de repetición.", "SAY AGAIN, especificando el elemento si solo una parte quedó cubierta."],
          ["Números como inglés cotidiano", "Agrupar dígitos puede confundir pista, rumbo o nivel.", "Pronunciar cada dígito según la regla aplicable y ritmo que permita verificarlo."],
          ["«Point» o «comma» en una frecuencia", "El separador radiofónico en inglés se expresa DECIMAL.", "Usar DECIMAL y colacionar la frecuencia recibida, sin crear una de ejemplo."],
          ["«Course» cuando se pide rumbo", "Heading, track y course no describen exactamente la misma referencia.", "Pedir o colacionar el parámetro que ATC realmente asignó; aclarar si hay duda."],
          ["«Ascend» o «go down»", "Se aparta de CLIMB y DESCEND, las palabras reconocibles de la instrucción.", "Usar el verbo normalizado para una autorización de nivel."],
          ["Traducción de «actualmente» como actually", "En inglés actually suele introducir una corrección, no solo tiempo presente.", "Decir now si importa el estado actual; separar hechos de correcciones."],
          ["Cortesía extensa antes del pedido", "Retrasa la información útil y ocupa la frecuencia.", "Dependencia, indicativo, petición y motivo breve cuando sea necesario."],
        ],
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
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "La escala OACI permite acento si se mantiene la comprensión.",
          "SAY AGAIN, CLIMB, DESCEND y DECIMAL; no sus traducciones.",
          "Heading no es course, y actually no es «actualmente».",
          "Brevedad significa retirar cortesía redundante, no eliminar restricciones.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Más detalle",
        cita: "FAA AIM §4-4-7 · palabras de acuse",
        bloques: [
          {
            kind: "p",
            text: "ROGER, WILCO, AFFIRM, NEGATIVE y SAY AGAIN tienen funciones distintas. La selección depende de si la transmisión contenía información, una pregunta, una instrucción simple o un dato que exige colación. Si la instrucción incluye pista, nivel, rumbo u otro número crítico, una palabra de acuse puede ser insuficiente. La FAA AIM §4-4-7 recomienda repetir las cifras pertinentes con el indicativo para que el controlador detecte una discrepancia.",
          },
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
    minutes: 3,
    blocks: [
      {
        kind: "p",
        text: "Una instrucción puede llegar mientras la tripulación cambia configuración o prepara una aproximación. No basta oír la primera cifra: hay que separar **a quién va dirigida, qué acción exige, qué dato la define, cuándo aplica y qué sigue**. Este orden es una herramienta del módulo; no sustituye la fraseología ni las reglas de colación.",
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
      {
        kind: "p",
        text: "Es el mismo ciclo de las lecciones 53, 56 y 60: si el destinatario, la acción o la condición no quedaron claros, no se ejecuta y se pide repetición.",
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
      { kind: "sub", text: "Excepciones que cambian la prioridad" },
      {
        kind: "p",
        text: "El orden no es rígido. Una condición de pista, una instrucción para evitar tránsito o una emergencia exigen atención inmediata: primero se controla el avión y se evita el peligro. Y no hace falta reconstruir el mensaje entero para pedir SAY AGAIN si una parte crítica quedó tapada. **La seguridad determina la prioridad.**",
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
        etiqueta: "Más detalle y ejemplos",
        cita: "El ciclo de cabina · distintivos parecidos",
        bloques: [
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
            titulo: "Dos distintivos parecidos",
            situacion: "Ejercicio didáctico, no transcripción real. ATC transmite una instrucción de viraje a un avión cuyo distintivo se parece al propio. La tripulación reconoce el rumbo que esperaba y está a punto de seleccionarlo.",
            preguntas: [
              { q: "¿Cuál es el primer filtro?", a: "El distintivo completo, antes del verbo y de la cifra. Una instrucción plausible no necesariamente pertenece al propio vuelo." },
              { q: "¿Qué se comunica si persiste la duda?", a: "Se solicita confirmación del destinatario con el propio distintivo. Mientras no se aclare, se mantiene la autorización previa y se vigila la trayectoria." },
            ],
            concepto: "La expectativa no reemplaza la identificación.",
          },
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
    minutes: 3,
    blocks: [
      {
        kind: "p",
        text: "Al final del módulo no se trata de recitar frases. Un piloto aspirante a aerolínea debe **escuchar, decidir, comunicar y verificar** bajo carga de trabajo real. Estos principios reúnen el curso; no sustituyen los procedimientos vigentes.",
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
          "**Protege la frecuencia.** Escucha antes de transmitir y prepara el mensaje antes de pulsar.",
          "**Confirma el destinatario.** Un distintivo parecido o una cifra esperada exigen más atención, no una inferencia.",
          "**Separa acción de expectativa.** STANDBY no autoriza; una ruta aprobada no abre una pista.",
          "**Escucha la condición completa.** Antes, después, hasta o al pasar cambian el momento de la maniobra.",
          "**Pide aclaración temprano.** SAY AGAIN o CONFIRM, sin rellenar el vacío con memoria.",
        ],
      },
      { kind: "sub", text: "2 · Decidir antes de aceptar" },
      {
        kind: "list",
        items: [
          "**Evalúa la capacidad real.** Si el avión no puede cumplir, UNABLE y una necesidad concreta.",
          "**Vuela primero.** Controlar la aeronave precede a una transmisión extensa.",
          "**No confundas estados de combustible.** MINIMUM FUEL avisa que una demora más puede comprometer la reserva final; la emergencia de combustible es un MAYDAY.",
          "**Ante un aviso de resolución (RA), sigue el procedimiento.** Avisa a ATC cuando puedas y comunica al terminar.",
          "**En una emergencia, comunica lo que permite ayudar.** Naturaleza, intención, posición y asistencia; amplía después.",
        ],
      },
      { kind: "sub", text: "3 · Comunicar con significado exacto" },
      {
        kind: "list",
        items: [
          "**Fraseología cuando existe.** Inglés claro y directo para lo que no cubre.",
          "**Recibir, aceptar y cumplir son distintos.** ROGER, WILCO, AFFIRM y NEGATIVE no se intercambian.",
          "**Di la cifra completa.** Nivel, rumbo, pista, velocidad y código no se abrevian.",
          "**No persigas un acento nativo.** La escala OACI evalúa inteligibilidad, no origen.",
          "**Voz y data link tienen ciclos distintos.** Un mensaje por enlace de datos se revisa entre los dos pilotos antes de aplicarlo.",
        ],
      },
      { kind: "sub", text: "4 · Cerrar el ciclo en cabina" },
      {
        kind: "list",
        items: [
          "**Colaciona y escucha el hearback.** Atiende cualquier corrección de ATC.",
          "**Cruza autorización, selección y trayectoria.** Lo hacen los dos pilotos.",
          "**Anunciar no es cumplir.** Una maniobra colacionada todavía necesita vigilancia.",
          "**Consulta la fuente vigente.** En Colombia, Aerocivil/eAIP y el manual del explotador.",
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
        etiqueta: "Más detalle",
        cita: "Los veinte principios, explicados",
        bloques: [
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
    minutes: 5,
    blocks: [
      {
        kind: "p",
        text: "Cincuenta frases para repasar **qué significa cada una y qué no autoriza**. Lee la frase, di su función sin mirar y explica qué colacionarías o aclararías. Las plantillas de uso están plegadas al final; los campos entre corchetes se llenan solo con datos recibidos, publicados o confirmados.",
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
        kind: "glosario",
        titulo: "Acuses, aclaración y límites",
        items: [
          { k: "1. UNABLE", v: "No puedo cumplir; digo el límite y, si sirve, el motivo." },
          { k: "2. WILCO", v: "Recibí y cumpliré; no sustituye una colación obligatoria." },
          { k: "3. ROGER", v: "Recibí la transmisión; no significa sí." },
          { k: "4. AFFIRM", v: "Sí, en fraseología OACI; verificar la variante del Estado." },
          { k: "5. NEGATIVE", v: "No, o corrección; no explica una incapacidad." },
          { k: "6. SAY AGAIN", v: "Repita todo o la parte que identifico." },
          { k: "7. CONFIRM", v: "Verifique un dato o permiso que creo haber oído." },
          { k: "8. STANDBY", v: "Espere; no concede nada." },
          { k: "9. CORRECTION", v: "Lo anterior fue un error; sigue la versión correcta." },
          { k: "10. I SAY AGAIN", v: "Repito para aclarar o enfatizar, no para cambiar." },
          { k: "11. SPEAK SLOWER", v: "Hable más despacio." },
          { k: "12. DISREGARD", v: "Ignore la transmisión o la parte indicada." },
          { k: "13. REQUEST", v: "Es una petición, no una autorización recibida." },
          { k: "14. MONITOR", v: "Escuche la frecuencia; no es CONTACT." },
          { k: "15. CONTACT", v: "Establezca comunicación con la dependencia indicada." },
          { k: "16. RECLEARED", v: "Nueva autorización que cambia solo lo indicado." },
        ],
      },
      {
        kind: "glosario",
        titulo: "Superficie y pista",
        items: [
          { k: "17. CLEARED TO [límite] VIA [ruta]", v: "Autorización de ruta; no permite entrar en pista." },
          { k: "18. REQUEST START-UP", v: "Pedir puesta en marcha según el procedimiento local." },
          { k: "19. REQUEST PUSH-BACK", v: "Pedir retroceso; la aprobación se oye aparte." },
          { k: "20. TAXI TO HOLDING POINT", v: "Rodar hasta el punto de espera, sin entrar en pista." },
          { k: "21. HOLD SHORT OF RUNWAY", v: "Mantener fuera de esa pista; se colaciona." },
          { k: "22. CROSS RUNWAY", v: "Cruzar solo la pista autorizada." },
          { k: "23. LINE UP AND WAIT", v: "Alinearse y esperar la autorización de despegue." },
          { k: "24. CLEARED FOR TAKEOFF", v: "Autorización de despegue en la pista indicada." },
          { k: "25. CANCEL TAKEOFF", v: "Se cancela la autorización; actuar según la fase de la carrera." },
          { k: "26. STOP IMMEDIATELY", v: "Detenerse ya, manteniendo el control." },
        ],
      },
      {
        kind: "glosario",
        titulo: "Salida, niveles y vectores",
        items: [
          { k: "27. WHEN PASSING [nivel], CONTACT", v: "Transferencia diferida; no cambiar antes de la condición." },
          { k: "28. CLIMB TO", v: "Ascender al nivel asignado; no es una expectativa." },
          { k: "29. MAINTAIN", v: "Mantener el nivel hasta nueva instrucción." },
          { k: "30. STOP DESCENT AT", v: "Interrumpir el descenso y nivelar ahí." },
          { k: "31. EXPEDITE CLIMB / DESCENT", v: "Acelerar el cambio si se puede; si no, UNABLE." },
          { k: "32. CROSS [punto] AT OR ABOVE", v: "Restricción vertical; evaluar antes de aceptar." },
          { k: "33. TURN LEFT / RIGHT HEADING", v: "Dirección y rumbo: las dos partes son críticas." },
          { k: "34. RESUME OWN NAVIGATION", v: "Termina el vectoreo; verificar el punto siguiente." },
          { k: "35. TRAFFIC IN SIGHT / NEGATIVE CONTACT", v: "El tránsito señalado está o no a la vista." },
          { k: "36. SQUAWK / SQUAWK IDENT", v: "Seleccionar el código o activar IDENT." },
          { k: "37. CHECK ALTIMETER SETTING AND CONFIRM LEVEL", v: "Comprobar el reglaje y confirmar el nivel." },
        ],
      },
      {
        kind: "glosario",
        titulo: "Llegada, contingencia y urgencia",
        items: [
          { k: "38. EXPECT [aproximación]", v: "Preparar; no es autorización para volarla." },
          { k: "39. CLEARED [aproximación] APPROACH", v: "Autorización para la aproximación especificada." },
          { k: "40. CONTINUE APPROACH", v: "Seguir aproximando; falta la autorización de aterrizaje." },
          { k: "41. CLEARED TO LAND", v: "Autorización de aterrizaje en la pista indicada." },
          { k: "42. GO AROUND / GOING AROUND", v: "Orden de ATC o aviso de la tripulación; volar la trayectoria aplicable." },
          { k: "43. REDUCE SPEED TO", v: "Confirmar la cifra y que sea compatible con la configuración." },
          { k: "44. HOLD AT", v: "Espera: punto, nivel, sentido, rumbo o derrota y hora." },
          { k: "45. REQUEST WEATHER DEVIATION", v: "Pedir desvío con lado y extensión; esperar respuesta." },
          { k: "46. CLIMB VIA SID", v: "Donde se use, con las restricciones publicadas." },
          { k: "47. TCAS RA / CLEAR OF CONFLICT", v: "Aviso de resolución y fin del conflicto." },
          { k: "48. MINIMUM FUEL", v: "Una demora más puede dejar menos de la reserva final; sin prioridad automática." },
          { k: "49. MAYDAY / MAYDAY FUEL", v: "Socorro; también la emergencia de combustible." },
          { k: "50. PAN PAN", v: "Urgencia que no llega a socorro." },
        ],
      },
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
        etiqueta: "Plantillas de uso",
        cita: "Las 50, con AVIANCA 452",
        bloques: [
          { kind: "p", text: "Ejemplo educativo. El distintivo de llamada de la aerolínea es real; el número de vuelo es ficticio. Lo que va entre corchetes se llena solo con datos recibidos o publicados." },
          {
            kind: "kv",
            items: [
              { k: "1. UNABLE", v: "UNABLE [restricción] DUE [motivo breve], AVIANCA 452." },
              { k: "2. WILCO", v: "WILCO, AVIANCA 452, solo si el mensaje no exige repetir un dato crítico." },
              { k: "3. ROGER", v: "ROGER, AVIANCA 452, para información sin acción ni pregunta sí/no." },
              { k: "4. AFFIRM", v: "AFFIRM, AVIANCA 452, ante una pregunta clara de sí/no." },
              { k: "5. NEGATIVE", v: "NEGATIVE, AVIANCA 452; ampliar si ATC necesita el motivo." },
              { k: "6. SAY AGAIN", v: "SAY AGAIN ALL AFTER [palabra o elemento], AVIANCA 452." },
              { k: "7. CONFIRM", v: "CONFIRM [valor o permiso dudoso], AVIANCA 452." },
              { k: "8. STANDBY", v: "Si ATC dice STANDBY, se conserva la autorización previa." },
              { k: "9. CORRECTION", v: "[dato equivocado], CORRECTION, [dato correcto]." },
              { k: "10. I SAY AGAIN", v: "[dato crítico], I SAY AGAIN, [dato crítico]." },
              { k: "11. SPEAK SLOWER", v: "SPEAK SLOWER, AVIANCA 452, si la velocidad impide comprender." },
              { k: "12. DISREGARD", v: "DISREGARD [mensaje previo], AVIANCA 452, cuando corresponda." },
              { k: "13. REQUEST", v: "[dependencia], AVIANCA 452, REQUEST [acción]." },
              { k: "14. MONITOR", v: "MONITOR [frecuencia recibida], AVIANCA 452; no inventar un llamado inicial." },
              { k: "15. CONTACT", v: "CONTACT [dependencia y frecuencia recibidas]; el primer llamado lleva el indicativo." },
              { k: "16. RECLEARED", v: "RECLEARED [nuevo límite o nivel]; comparar con la autorización anterior." },
              { k: "17. CLEARED TO", v: "Colacionar [límite], [ruta], [nivel] y [código] recibidos." },
              { k: "18. REQUEST START-UP", v: "[dependencia], AVIANCA 452, REQUEST START-UP, INFORMATION [letra recibida]." },
              { k: "19. REQUEST PUSH-BACK", v: "[dependencia], AVIANCA 452, REQUEST PUSH-BACK." },
              { k: "20. TAXI TO HOLDING POINT", v: "Colacionar [pista], [ruta de rodaje] y cualquier límite recibido." },
              { k: "21. HOLD SHORT", v: "HOLDING SHORT OF RUNWAY [pista recibida], AVIANCA 452." },
              { k: "22. CROSS RUNWAY", v: "CROSS RUNWAY [pista recibida], AVIANCA 452; reportar libre si se pidió." },
              { k: "23. LINE UP AND WAIT", v: "RUNWAY [pista recibida], LINE UP AND WAIT, AVIANCA 452." },
              { k: "24. CLEARED FOR TAKEOFF", v: "RUNWAY [pista recibida], CLEARED FOR TAKEOFF, AVIANCA 452." },
              { k: "25. CANCEL TAKEOFF", v: "Ejecutar el procedimiento aplicable y avisar cuando sea posible." },
              { k: "26. STOP IMMEDIATELY", v: "STOPPING, AVIANCA 452, cuando la carga de trabajo permita responder." },
              { k: "27. WHEN PASSING", v: "WHEN PASSING [nivel], CONTACT [dependencia y frecuencia recibidas]." },
              { k: "28. CLIMB TO", v: "CLIMBING TO [nivel recibido], AVIANCA 452." },
              { k: "29. MAINTAIN", v: "MAINTAINING [nivel recibido], AVIANCA 452." },
              { k: "30. STOP DESCENT AT", v: "STOP DESCENT AT [nivel recibido], AVIANCA 452." },
              { k: "31. EXPEDITE", v: "UNABLE TO EXPEDITE DUE [motivo], AVIANCA 452." },
              { k: "32. CROSS AT OR ABOVE", v: "Si no es posible: UNABLE TO CROSS [punto] AT [nivel], AVIANCA 452." },
              { k: "33. HEADING", v: "LEFT HEADING [tres dígitos recibidos], AVIANCA 452." },
              { k: "34. RESUME OWN NAVIGATION", v: "RESUME OWN NAVIGATION DIRECT [punto recibido], AVIANCA 452." },
              { k: "35. NEGATIVE CONTACT", v: "NEGATIVE CONTACT, AVIANCA 452, si no se identifica el tránsito." },
              { k: "36. SQUAWK", v: "SQUAWK [cuatro dígitos recibidos], AVIANCA 452." },
              { k: "37. CHECK ALTIMETER SETTING", v: "Tras verificar instrumentos: [reglaje y nivel actuales], AVIANCA 452." },
              { k: "38. EXPECT", v: "EXPECT [aproximación y pista recibidas]: preparar, sin abandonar la autorización actual." },
              { k: "39. CLEARED APPROACH", v: "CLEARED [aproximación recibida] RUNWAY [pista recibida], AVIANCA 452." },
              { k: "40. CONTINUE APPROACH", v: "CONTINUING APPROACH, AVIANCA 452; esperar CLEARED TO LAND." },
              { k: "41. CLEARED TO LAND", v: "RUNWAY [pista recibida], CLEARED TO LAND, AVIANCA 452." },
              { k: "42. GOING AROUND", v: "GOING AROUND, AVIANCA 452; comunicar la necesidad adicional cuando sea posible." },
              { k: "43. REDUCE SPEED", v: "REDUCING TO [velocidad recibida], AVIANCA 452." },
              { k: "44. HOLD AT", v: "HOLD AT [punto recibido]; pedir los elementos que falten según el procedimiento aplicable." },
              { k: "45. WEATHER DEVIATION", v: "REQUEST DEVIATION [lado y distancia] DUE WEATHER, AVIANCA 452; esperar respuesta." },
              { k: "46. CLIMB VIA SID", v: "CLIMB VIA [salida publicada y autorizada] TO [nivel recibido], AVIANCA 452." },
              { k: "47. TCAS RA", v: "TCAS RA, AVIANCA 452, cuando sea posible; después CLEAR OF CONFLICT." },
              { k: "48. MINIMUM FUEL", v: "[dependencia], AVIANCA 452, MINIMUM FUEL." },
              { k: "49. MAYDAY", v: "MAYDAY repetido tres veces, [dependencia], AVIANCA 452, [problema], [intención], [necesidad]." },
              { k: "50. PAN PAN", v: "PAN PAN repetido tres veces, [dependencia], AVIANCA 452, [situación], [intención]." },
            ],
          },
          { kind: "p", text: "La Administración Federal de Aviación de Estados Unidos (FAA; Federal Aviation Administration) ofrece en su Aeronautical Information Manual (AIM) un ejemplo documentado de colación de nivel con «United Twelve»; se cita como ejemplo de la guía, **no como transcripción de un vuelo**. Cada plantilla se contrasta con la fraseología del Estado y el manual del explotador." },
        ],
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
