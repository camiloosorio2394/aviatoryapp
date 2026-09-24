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
    kicker: "Fraseología donde exista y plain English donde no",
    minutes: 15,
    blocks: [
      {
        kind: "p",
        text: "Capítulos 51 a 61. Cuando la frase estándar no alcanza y cuando el que falla es el oído: situaciones no normales, inglés para lo no normal, pedir aclaración, acentos, sesgo de expectativa, distintivos parecidos, transmisiones bloqueadas, cabina estéril, PF y PM, gestión de autorizaciones y los errores que más se repiten.",
      },
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Es lo que se dice por radio cuando algo del avión, de la cabina o del entorno sale de lo normal: una falla de sistema, un pasajero enfermo, humo, un impacto con aves, meteorología que obliga a desviarse. La fraseología OACI cubre las rutinas; para buena parte de estas situaciones **no existe una frase normalizada** y hay que usar lenguaje común (Doc 9432 3.2.2; Doc 9835 3.3.13).",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "Primero se vuela el avión. La llamada se hace cuando la trayectoria está controlada y la tripulación sabe qué pasa (Aviate, Navigate, Communicate).",
          "ATC necesita cuatro cosas para ayudarle: **qué pasa, qué puede hacer el avión, qué necesita la tripulación y qué piensa hacer**. No necesita el detalle técnico del sistema.",
          "No toda falla es MAYDAY o PAN PAN. Declarar una condición de socorro o urgencia es decisión del comandante según la gravedad; una falla contenida puede comunicarse en lenguaje común sin prefijo. Lo que no se puede hacer es **subestimar** una situación grave con palabras vagas.",
          "La fraseología se usa primero cuando existe (Doc 9835 4.3.3). El lenguaje común entra donde la fraseología no alcanza y debe ser igual de claro, conciso y sin ambigüedad (Doc 9835 4.3.4; Doc 9432 3.2.3 y 3.2.4).",
          "El Doc 9835 3.3.19 cita un diálogo real entre un controlador y el piloto de un avión liviano que no podía bajar el tren: **el 60% del diálogo tuvo que hacerse en lenguaje común**. En una situación no normal, la mayor parte de lo que se dice no está en ningún manual de fraseología.",
          "Cuando se cambia de fraseología a lenguaje común y de vuelta (salto de código, Doc 9835 3.3.21), la fraseología se contamina de palabras sobrantes y el lenguaje común se vuelve telegráfico. En las partes normalizadas (niveles, rumbos, pistas, colación) se vuelve a la fraseología exacta.",
        ],
      },
      {
        kind: "hueco",
        rotulo: "CM-51-01 · Diagrama · 4:5 · 1080×1350 px",
        descripcion:
          "Imagen sugerida: Tarjeta vertical en cuatro franjas apiladas, cada una con un icono simple y una palabra en inglés: PROBLEM (triángulo de alerta), CAPABILITY (avión con flecha de trayectoria), NEEDS (mano que pide), INTENTIONS (flecha hacia un aeropuerto). A la izquierda, una línea vertical que une las cuatro franjas con el rótulo «Lo que ATC necesita saber». Colores neutros; el ámbar solo en el triángulo. Objetivo: Que el piloto memorice el orden de la información que ATC necesita en cualquier situación no normal, antes que el nombre técnico de la falla.",
        alto: 420,
        ratio: "4 / 5",
        anchoMax: 420,
      },
      { kind: "sub", text: "Fraseología OACI" },
      {
        kind: "p",
        text: "Diez situaciones. En cada una: qué hay normalizado y cómo se dice lo que no lo está. Los prefijos MAYDAY y PAN PAN se muestran cuando la situación los justificaría; su texto exacto y el orden de los elementos están en VERIFICAR (Anexo 10 Vol. II cap. 5; Doc 4444 cap. 15; Doc 9432 cap. 9).",
      },
      COMO_LEER,
      verificar(
        "Las llamadas MAYDAY y PAN PAN de esta lección (repetición y orden: estación, identificación, naturaleza, intención, posición, nivel, rumbo), el acuse «roger MAYDAY», el descenso de emergencia, la señal MEDICAL tras PAN PAN, la pregunta por personas a bordo y autonomía, «STATE INTENTIONS», las frases de desvío por meteorología, «UNABLE RVSM DUE EQUIPMENT», la redacción inglesa de las observaciones de tren y la interferencia ilícita **no están en las fuentes cargadas**. Consultar el Anexo 10 Vol. II cap. 5, el Doc 4444 cap. 12 y 15, el Doc 9432 cap. 9 (y la versión inglesa de 4.7.3) y el Anexo 10 Vol. IV antes de tomarlas como norma.",
      ),

      { kind: "sub", text: "51.1 Falla hidráulica" },
      {
        kind: "p",
        text: "**STANDARD PHRASEOLOGY**: no hay una frase normalizada para «falla hidráulica». Si la tripulación la considera urgencia, se antepone PAN PAN (VERIFICAR). Lo que sí es normalizado son los niveles, rumbos y esperas que ATC asigne después.",
      },
      ...ejemplo(
        "Ejemplo 1 · Ejemplo conceptual: ATC pide intenciones («state intentions»: VERIFICAR)",
        [
          `ATC:   "AVIATORY 452, state intentions."`,
          `PILOT: "We have a hydraulic problem. We need approximately ten minutes to complete the checklist and would like to remain in the present area. AVIATORY 452."`,
        ],
        "Significado: ATC pregunta qué va a hacer la tripulación. El piloto dice qué pasa (problema hidráulico), cuánto tiempo necesita (diez minutos) y qué quiere (quedarse en la zona). **PLAIN ENGLISH**.",
      ),
      {
        kind: "callout",
        tone: "tip",
        title: "Por qué es efectivo",
        text: "Una idea por frase; da un tiempo concreto que ATC puede planear; pide algo que ATC puede conceder (un área, un nivel, una espera) sin obligarlo a adivinar. No explica qué sistema falló ni por qué, porque eso no cambia lo que ATC tiene que hacer.",
      },
      ...ejemplo(
        "Ejemplo 2 · Nivel y rumbo asignados",
        [
          `ATC:   "AVIATORY 452, roger. Maintain flight level one two zero, turn right heading one eight zero. Advise when ready for approach."`,
          `PILOT: "Maintain flight level one two zero, right heading one eight zero, wilco. AVIATORY 452."`,
        ],
        "Significado: nivel y rumbo se colacionan siempre (Doc 4444 4.5.7.5.1 c). «Advise when ready» es lenguaje común; se acusa con WILCO.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Lista completa: la consecuencia para el aeropuerto (PLAIN ENGLISH)",
        [
          `PILOT: "Bogota Approach, AVIATORY 452, checklist complete. We have no nosewheel steering and we expect a longer landing roll. We will need to be towed from the runway. Request ILS runway one three left."`,
        ],
        "Significado: **PLAIN ENGLISH**. El piloto anuncia la consecuencia que afecta al aeropuerto (bloqueará la pista porque no puede rodar), no la descripción del sistema.",
      ),

      { kind: "sub", text: "51.2 Falla eléctrica" },
      {
        kind: "p",
        text: "**STANDARD PHRASEOLOGY**: ninguna específica. Según la gravedad, PAN PAN o MAYDAY (VERIFICAR).",
      },
      ...ejemplo(
        "Ejemplo 4 · Llamada de urgencia (PAN PAN: VERIFICAR)",
        [
          `PILOT: "PAN PAN, PAN PAN, PAN PAN, Bogota Control, AVIATORY 452, electrical failure, operating on standby power. We may lose some radios. Flight level three two zero, request direct Bogota and descent."`,
        ],
        "Significado: urgencia. Lo clave para ATC es «podemos perder radios»: le avisa que el contacto puede cortarse. Nombre de estación, identificación, naturaleza, intención, posición, nivel y rumbo van en el orden que fije el Anexo 10 (VERIFICAR).",
      ),
      ...ejemplo(
        "Ejemplo 5 · Nueva autorización de ruta y nivel",
        [
          `ATC:   "AVIATORY 452, roger. Cleared direct Bogota. Descend to flight level two four zero."`,
          `PILOT: "Direct Bogota, descend to flight level two four zero. AVIATORY 452."`,
        ],
        "Significado: nueva autorización de ruta y nivel. Se colaciona completa aunque haya urgencia.",
      ),
      ...ejemplo(
        "Ejemplo 6 · Qué hará si pierde contacto (PLAIN ENGLISH)",
        [`PILOT: "AVIATORY 452, if we lose contact we will continue to Bogota as cleared."`],
        "Significado: **PLAIN ENGLISH**. El piloto adelanta qué hará si pierde comunicaciones, para que ATC lo sepa antes. Lo que haga después, sin radio, lo rige el procedimiento de falla de comunicaciones (capítulo 32) y el procedimiento nacional publicado en el AIP.",
      ),

      { kind: "sub", text: "51.3 Pérdida de presurización" },
      {
        kind: "p",
        text: "**STANDARD PHRASEOLOGY**: el descenso de emergencia tiene procedimiento propio en el Doc 4444 cap. 15 y en el Doc 9432 9.4, que no están cargados (VERIFICAR su redacción).",
      },
      ...ejemplo(
        "Ejemplo 7 · Llamada de socorro con descenso de emergencia (MAYDAY y descenso de emergencia: VERIFICAR)",
        [
          `PILOT: "MAYDAY, MAYDAY, MAYDAY, Bogota Control, AVIATORY 452, loss of cabin pressure, emergency descent to flight level one zero zero, heading two seven zero."`,
        ],
        "Significado: socorro. Rumbo y nivel objetivo van en la llamada porque ATC necesita separar a otros tráficos de un avión que baja rápido.",
      ),
      ...ejemplo("Ejemplo 8 · Acuse de ATC y colación («roger MAYDAY»: VERIFICAR)", [
        `ATC:   "AVIATORY 452, roger MAYDAY. Descend to flight level one zero zero. Report level."`,
        `PILOT: "Descend to flight level one zero zero, wilco. AVIATORY 452."`,
      ]),
      ...ejemplo(
        "Ejemplo 9 · Al nivelar",
        [`PILOT: "AVIATORY 452, maintaining flight level one zero zero. Cabin under control. Request direct Bogota."`],
        "Significado: al nivelar, el piloto reporta nivel (normalizado) y estado (lenguaje común).",
      ),
      {
        kind: "callout",
        tone: "info",
        title: "Nota",
        text: "En el descenso la prioridad es la máscara, el avión y el procedimiento. Si la llamada no cabe al inicio, se hace después; lo que diga el procedimiento del operador manda.",
      },

      { kind: "sub", text: "51.4 Problema médico a bordo" },
      {
        kind: "p",
        text: "**STANDARD PHRASEOLOGY**: no hay frase para describir al paciente. La urgencia se declara con PAN PAN si la tripulación lo decide (VERIFICAR).",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Trampa",
        text: "En el Anexo 10 Vol. II, la señal «MEDICAL» después de PAN PAN está asociada a **transportes sanitarios** (vuelos protegidos por los Convenios de Ginebra), no a un pasajero enfermo (VERIFICAR Anexo 10 Vol. II 5.3.3.4). Para un pasajero enfermo se dice «medical emergency on board» en lenguaje común.",
      },
      ...ejemplo(
        "Ejemplo 10 · Urgencia médica con desvío (PAN PAN: VERIFICAR)",
        [
          `PILOT: "PAN PAN, PAN PAN, PAN PAN, Bogota Control, AVIATORY 452, medical emergency on board. Request diversion to Cali, direct. Flight level three five zero."`,
        ],
        "Significado: urgencia, intención (desviar a Cali) y pedido (directo).",
      ),
      ...ejemplo(
        "Ejemplo 11 · Autorización y datos del paciente (PLAIN ENGLISH)",
        [
          `ATC:   "AVIATORY 452, roger. Cleared direct Cali, descend to flight level two four zero. Do you require medical assistance on arrival?"`,
          `PILOT: "Direct Cali, descend to flight level two four zero. Affirm, request ambulance on arrival. Male passenger, sixty years old, chest pain, conscious. AVIATORY 452."`,
        ],
        "Significado: colación de ruta y nivel; luego datos concretos del paciente (**PLAIN ENGLISH**). Sin diagnósticos: lo que vea la tripulación.",
      ),
      {
        kind: "p",
        text: "Contraste que da el Doc 9835 3.3.15: un piloto militar que pedía apoyo para una paciente habló con frases largas, hipótesis («para el caso en que debamos desviarnos») y pedidos indirectos («quisiéramos solicitar»). El manual lo pone como ejemplo de lenguaje común «bien poco claro» (3.3.16). La versión de arriba dice lo mismo en tres frases.",
      },

      { kind: "sub", text: "51.5 Humo en cabina de pasajeros o en cabina de mando" },
      {
        kind: "p",
        text: "**STANDARD PHRASEOLOGY**: ninguna para «humo». Humo o fuego a bordo suele llevar a socorro; la decisión es del comandante según el procedimiento del operador.",
      },
      ...ejemplo(
        "Ejemplo 12 · Llamada de socorro por humo (MAYDAY: VERIFICAR)",
        [
          `PILOT: "MAYDAY, MAYDAY, MAYDAY, Bogota Approach, AVIATORY 452, smoke in the cabin, request immediate return to Bogota. Passing flight level one five zero, heading three four zero."`,
        ],
        "Significado: socorro, naturaleza, intención, nivel y rumbo.",
      ),
      ...ejemplo(
        "Ejemplo 13 · Rumbo, altitud y QNH («roger MAYDAY»: VERIFICAR)",
        [
          `ATC:   "AVIATORY 452, roger MAYDAY. Turn left heading one eight zero, descend to eight thousand feet, QNH one zero two eight. Expect ILS runway one three left."`,
          `PILOT: "Left heading one eight zero, descend eight thousand feet, QNH one zero two eight. AVIATORY 452."`,
        ],
        "Significado: rumbo, altitud y QNH se colacionan siempre (Doc 4444 4.5.7.5.1 c).",
      ),
      ...ejemplo(
        "Ejemplo 14 · Pedir servicios y avisar que está ocupado (PLAIN ENGLISH)",
        [
          `PILOT: "AVIATORY 452, smoke is decreasing. We will need the fire services on landing. We will pass persons on board and fuel later, busy now."`,
        ],
        "Significado: **PLAIN ENGLISH**. El piloto dice qué necesita y avisa que no puede atender más preguntas ahora. Decir «busy now» es legítimo: ATC prefiere saberlo a esperar una respuesta.",
      ),
      ...ejemplo(
        "Ejemplo 15 · Personas a bordo y autonomía (redacción: VERIFICAR)",
        [`ATC:   "AVIATORY 452, roger. Report persons on board and endurance when able."`],
        "Significado: ATC pide personas a bordo y autonomía para los servicios de salvamento. La redacción OACI exacta de esta pregunta está en VERIFICAR; en Estados Unidos se oye «souls on board».",
      ),

      { kind: "sub", text: "51.6 Pasajero perturbador (passenger disturbance)" },
      {
        kind: "p",
        text: "**STANDARD PHRASEOLOGY**: no hay frase para un pasajero violento. **No confundir con interferencia ilícita** (secuestro o amenaza a la seguridad del vuelo), que tiene procedimiento y código de transpondedor propios (capítulo 31; Doc 4444 cap. 15, VERIFICAR).",
      },
      ...ejemplo(
        "Ejemplo 16 · Pasajero perturbador reducido (PLAIN ENGLISH)",
        [
          `PILOT: "Bogota Approach, AVIATORY 452, we have a disruptive passenger, now restrained. Situation under control. Request police on arrival."`,
        ],
        "Significado: **PLAIN ENGLISH**. Qué pasa, en qué estado está (controlado) y qué necesita (policía al llegar).",
      ),
      ...ejemplo("Ejemplo 17 · Respuesta de ATC", [
        `ATC:   "AVIATORY 452, roger. Police will meet you at the stand. Say stand number when known."`,
        `PILOT: "Wilco. AVIATORY 452."`,
      ]),
      ...ejemplo(
        "Ejemplo 18 · La situación empeora (PLAIN ENGLISH)",
        [`PILOT: "AVIATORY 452, the passenger is no longer restrained. Crew is managing. We request priority landing."`],
        "Significado: la situación empeoró. El piloto actualiza a ATC en cuanto cambia. Si en algún momento la seguridad del vuelo queda amenazada, pasa a urgencia o socorro según el procedimiento del operador.",
      ),

      { kind: "sub", text: "51.7 Impacto con aves (bird strike)" },
      {
        kind: "p",
        text: "**STANDARD PHRASEOLOGY**: ninguna para «bird strike». Hay que reportarlo porque afecta a otros: ATC avisa a las aeronaves siguientes y puede inspeccionar la pista.",
      },
      ...ejemplo(
        "Ejemplo 19 · Impacto sin consecuencias (PLAIN ENGLISH)",
        [
          `PILOT: "Bogota Departure, AVIATORY 452, bird strike on departure, engine parameters normal. Request to continue as cleared."`,
        ],
        "Significado: **PLAIN ENGLISH**. Qué pasó y que el avión está bien; la tripulación pide seguir.",
      ),
      ...ejemplo(
        "Ejemplo 20 · Información para la inspección de pista",
        [
          `ATC:   "AVIATORY 452, roger. Continue climb to flight level one eight zero. Say position on the runway where you hit the birds."`,
          `PILOT: "Climb flight level one eight zero. We estimate halfway down the runway, at rotation. AVIATORY 452."`,
        ],
        "Significado: colación del nivel; luego información para la inspección de pista.",
      ),
      ...ejemplo(
        "Ejemplo 21 · Impacto con pérdida de motor (MAYDAY: VERIFICAR)",
        [
          `PILOT: "MAYDAY, MAYDAY, MAYDAY, Bogota Tower, AVIATORY 452, bird strike, engine failure left engine, maintaining three thousand five hundred feet, request immediate return runway one three right."`,
        ],
        "Significado: otra gravedad. Con pérdida de motor en despegue, socorro.",
      ),

      { kind: "sub", text: "51.8 Evitar meteorología (weather avoidance)" },
      {
        kind: "p",
        text: "**STANDARD PHRASEOLOGY**: el Doc 4444 cap. 12 y cap. 15 traen frases y procedimientos de desvío por meteorología que no están cargados (VERIFICAR). Mientras tanto, la forma segura es pedir con elementos concretos: dirección, distancia, motivo y hasta cuándo.",
      },
      ...ejemplo(
        "Ejemplo 22 · Desvío pedido y aprobado (frases de desvío: VERIFICAR)",
        [
          `PILOT: "Bogota Control, AVIATORY 452, request deviation two zero miles right of track due weather."`,
          `ATC:   "AVIATORY 452, deviation up to two zero miles right of track approved. Report back on track."`,
          `PILOT: "Up to two zero miles right of track, wilco. AVIATORY 452."`,
        ],
        "Significado: se pide y se aprueba un desvío acotado. «Report back on track» obliga a avisar al regresar.",
      ),
      ...ejemplo(
        "Ejemplo 23 · No aceptar lo que no se puede cumplir (frases de desvío: VERIFICAR)",
        [
          `ATC:   "AVIATORY 452, unable deviation right due traffic. Left deviation approved up to one five miles."`,
          `PILOT: "Unable left deviation due weather. Request climb to flight level three seven zero to remain clear. AVIATORY 452."`,
        ],
        "Significado: el piloto no acepta lo que no puede cumplir (UNABLE, Doc 9432 2.6 y 2.8.3.10) y ofrece una alternativa.",
      ),
      ...ejemplo(
        "Ejemplo 24 · Aviso de lo que el avión va a hacer (PLAIN ENGLISH)",
        [`PILOT: "AVIATORY 452, unable to maintain track due weather. We are turning right heading zero niner zero."`],
        "Significado: **PLAIN ENGLISH**. Aviso de lo que el avión va a hacer cuando no hay tiempo de esperar autorización. Qué puede hacer la tripulación sin autorización está en el Doc 4444 cap. 15 y en la normativa nacional (VERIFICAR).",
      ),

      { kind: "sub", text: "51.9 Pérdida de instrumentos o de indicaciones" },
      {
        kind: "p",
        text: "**STANDARD PHRASEOLOGY**: frases como «UNABLE RVSM DUE EQUIPMENT» existen en el Doc 4444 cap. 12 (VERIFICAR). Para describir la falla, lenguaje común.",
      },
      ...ejemplo(
        "Ejemplo 25 · Velocidad no fiable (PLAIN ENGLISH)",
        [
          `PILOT: "Bogota Control, AVIATORY 452, unreliable airspeed indication. We are maintaining flight level three three zero. Request no level changes and radar ground speed checks."`,
        ],
        "Significado: **PLAIN ENGLISH**. El piloto dice qué perdió, qué está haciendo y qué ayuda concreta pide (velocidad sobre tierra del radar).",
      ),
      ...ejemplo(
        "Ejemplo 26 · Datos independientes de ATC",
        [
          `ATC:   "AVIATORY 452, roger. Ground speed four six zero knots. Mode C readout flight level three three zero."`,
          `PILOT: "Four six zero knots, thank you. AVIATORY 452."`,
        ],
        "Significado: ATC le da datos independientes de sus instrumentos.",
      ),
      ...ejemplo(
        "Ejemplo 27 · Pérdida de capacidad RVSM («UNABLE RVSM DUE EQUIPMENT»: VERIFICAR)",
        [`PILOT: "AVIATORY 452, unable RVSM due equipment."`],
        "Significado: aviso de pérdida de capacidad RVSM (capítulo 39). ATC tendrá que cambiar la separación o el nivel.",
      ),

      { kind: "sub", text: "51.10 Problema con el tren de aterrizaje" },
      {
        kind: "p",
        text: "**STANDARD PHRASEOLOGY**: el Doc 9432 4.7.2 trae la solicitud de pasada baja para inspección visual del tren. Esta parte **está verificada**:",
      },
      ...ejemplo(
        "Ejemplo 28 · Pasada baja para inspección del tren (modelo verificado, Doc 9432 4.7.2)",
        [
          `PILOT: "Bogota Tower, AVIATORY 452, request low pass, unsafe left gear indication."`,
          `ATC:   "AVIATORY 452, cleared low pass runway one three right, not below five hundred feet, report final."`,
          `PILOT: "Runway one three right, not below five hundred feet, wilco. AVIATORY 452."`,
        ],
        "Significado: la frase y su respuesta siguen el modelo del Doc 9432 4.7.2 (allí con FASTAIR 345 y pista 27). La tripulación pide que la torre mire el tren.",
      ),
      {
        kind: "p",
        text: "Después de la pasada, la torre describe lo que ve. El Doc 9432 4.7.3 da las respuestas en español («el tren de aterrizaje parece estar desplegado», «la rueda izquierda no parece estar desplegada»); su redacción en inglés está en VERIFICAR.",
      },
      ...ejemplo(
        "Ejemplo 29 · Lo que ve la torre (redacción inglesa: VERIFICAR)",
        [
          `ATC:   "AVIATORY 452, the landing gear appears to be down."`,
          `PILOT: "Roger. We will make a full stop landing. Request fire services standing by. AVIATORY 452."`,
        ],
        "Significado: la torre dice «parece»: no puede certificar que el tren está asegurado. El piloto decide y pide lo que necesita (**PLAIN ENGLISH**).",
      ),
      {
        kind: "p",
        text: "El Doc 9835 3.3.19 muestra el caso real que cita (en español, sin nombres): ATC pregunta las intenciones sobre el tren, el piloto responde que intentará bajarlo de nuevo y, si no puede, aterrizará con las tres ruedas arriba; ATC ofrece una pasada baja para verificación visual. Buena parte de eso no tiene fórmula normalizada.",
      },

      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Durante la falla, en cabina y en frecuencia",
        texto: "En la cabina de un avión de transporte, la falla se gestiona con la lista de verificación y el reparto de tareas del operador. Normalmente uno vuela y el otro comunica y lee la lista, pero el reparto exacto lo fija el SOP del operador (capítulo 59).",
        pasos: [
          "La primera llamada suele ser corta: qué pasa, que la tripulación está trabajando en ello y qué necesita **ahora** (un rumbo, un nivel, tiempo). La segunda, cuando hay plan: intención, aproximación, servicios en tierra.",
          "Los servicios en tierra (bomberos, ambulancia, policía, remolque) se piden por radio a ATC. Mientras antes se pidan, antes llegan.",
        ],
      },
      { kind: "sub", text: "Error frecuente" },
      error("Minimizar", "**Minimizar**: «we have a little problem», «nothing serious». ATC no puede medir la gravedad si el piloto no la dice."),
      error(
        "Narrar el sistema",
        "**Narrar el sistema** en vez de decir la consecuencia: «the green system low pressure light came on during the flap extension…». A ATC le sirve «we will need a longer runway» o «we will need to be towed».",
      ),
      error(
        "Mezclar la colación con la explicación",
        "**Mezclar la colación con la explicación** y dejar un nivel o un rumbo sin colacionar.",
      ),
      error("PAN PAN MEDICAL para un pasajero enfermo", "Usar PAN PAN MEDICAL para un pasajero enfermo (ver 51.4)."),
      error("No actualizar a ATC", "No actualizar a ATC cuando la situación empeora o mejora."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Primero se vuela el avión; la llamada viene después.",
          "ATC necesita: problema, capacidad, necesidades e intenciones.",
          "Fraseología donde existe; lenguaje común claro y corto donde no.",
          "Niveles, rumbos, QNH, pistas y autorizaciones se colacionan siempre, también en emergencia.",
          "Pedir servicios en tierra temprano.",
          "Declarar la gravedad real: ni más ni menos.",
        ],
      },
      fuentes(
        "Doc 9835 · Doc 9432 · Doc 4444",
        "Doc 9835 (2.ª ed.) 3.3.13, 3.3.15, 3.3.16, 3.3.19, 3.3.21, 4.3.3, 4.3.4; Doc 9432 (4.ª ed.) 2.6 (UNABLE, WILCO), 2.8.3.10, 3.2.2, 3.2.3, 3.2.4, 4.7.2 (REQUEST LOW PASS UNSAFE LEFT GEAR INDICATION y su autorización), 4.7.3 (respuestas de la torre, en español); Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1.",
        [
          "VERIFICAR: texto exacto de la llamada MAYDAY y PAN PAN (repetición, orden: estación, identificación, naturaleza, intención, posición, nivel, rumbo) contra Anexo 10 Vol. II cap. 5 (5.3), Doc 4444 cap. 15 y Doc 9432 cap. 9 (no cargados).",
          "VERIFICAR: «roger MAYDAY» como acuse de ATC contra Doc 9432 cap. 9 y Doc 4444 cap. 15.",
          "VERIFICAR: procedimiento y fraseología de descenso de emergencia contra Doc 4444 cap. 15 y Doc 9432 9.4.",
          "VERIFICAR: uso de la señal MEDICAL tras PAN PAN solo para transportes sanitarios contra Anexo 10 Vol. II 5.3.3.4.",
          "VERIFICAR: redacción OACI de la pregunta por personas a bordo y autonomía («persons on board», «endurance») contra Doc 4444 cap. 12 y 15; «souls on board» es uso de Estados Unidos (FAA JO 7110.65).",
          "VERIFICAR: «STATE INTENTIONS» / «REPORT INTENTIONS» como frase de ATC contra Doc 4444 cap. 12.",
          "VERIFICAR: frases de desvío por meteorología («REQUEST DEVIATION… DUE WEATHER», «DEVIATION APPROVED», «REPORT BACK ON TRACK») contra Doc 4444 cap. 12 y procedimiento de contingencia de 15.2.",
          "VERIFICAR: «UNABLE RVSM DUE EQUIPMENT» contra Doc 4444 cap. 12.",
          "VERIFICAR: redacción en inglés de las observaciones de tren («THE LANDING GEAR APPEARS DOWN») contra la versión inglesa del Doc 9432 4.7.3.",
          "VERIFICAR: interferencia ilícita, código 7500 y procedimiento contra Doc 4444 cap. 15 y Anexo 10 Vol. IV.",
        ],
      ),
    ],
  },
  // ── 52 ──────────────────────────────────────────────────────────────────
  {
    n: 52,
    title: "Inglés para lo no normal",
    kicker: "Problema, capacidad, necesidad e intenciones",
    minutes: 9,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Es el inglés que un piloto necesita cuando la fraseología se acaba y el avión tiene un problema (English for non-normal operations). No se trata de saber más vocabulario técnico: se trata de **decir lo necesario con palabras simples**, aunque no recuerde el término exacto.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "El Doc 9835 4.6.6 dice que la comprensión importa sobre todo «cuando se producen complicaciones», y que es ahí «donde más se necesita el lenguaje común». El descriptor de interacción del nivel 4 pide que el piloto «inicia y sostiene intercambios verbales aun cuando trate sobre situaciones imprevistas» (4.6.7).",
          "Bajo tensión, las frases se alargan y se desordenan (Doc 9835 3.3.16; 5.3.3.1). La defensa es una estructura aprendida de antemano.",
          "Se puede controlar la inteligibilidad **bajando la velocidad, limitando la información de cada frase y haciendo pausas** (Doc 9835 5.3.3.7).",
          "Hay que decir el problema en forma **explícita y directa**, no indirecta (Doc 9835 5.3.3.5). El manual advierte que varios accidentes e incidentes se atribuyeron a lenguaje poco directo para informar un problema (5.3.3.4).",
          "Si no sale la palabra técnica, se describe el efecto: «the left engine is shaking» en lugar de buscar «severe vibration N1». ATC necesita la consecuencia, no el nombre del componente.",
        ],
      },
      { kind: "sub", text: "La estructura de cinco preguntas" },
      {
        kind: "table",
        head: ["Pregunta", "Qué dice el piloto", "Ejemplo"],
        rows: [
          ["WHAT IS THE PROBLEM?", "Qué pasa, en una frase", `"We have ice on the wings."`],
          ["WHAT CAN I DO?", "Qué sigue funcionando o qué puede mantener", `"We can maintain heading."`],
          ["WHAT CAN'T I DO?", "Qué no puede cumplir", `"We cannot maintain this altitude."`],
          ["WHAT DO I NEED?", "Qué le pide a ATC", `"Request immediate descent to flight level two four zero."`],
          ["WHAT ARE MY INTENTIONS?", "Qué va a hacer", `"We intend to continue to Bogota."`],
        ],
      },
      {
        kind: "p",
        text: "No hace falta decir las cinco siempre ni en ese orden. Sirve como lista mental para no dejar fuera lo importante.",
      },
      {
        kind: "hueco",
        rotulo: "CM-52-01 · Esquema · 1:1 · 1080×1080 px",
        descripcion:
          "Imagen sugerida: Cinco tarjetas en columna, cada una con la pregunta en inglés en mono mayúsculas (WHAT IS THE PROBLEM? / WHAT CAN I DO? / WHAT CAN'T I DO? / WHAT DO I NEED? / WHAT ARE MY INTENTIONS?) y, al lado, una frase de ejemplo corta en inglés del caso de engelamiento. Flecha descendente entre tarjetas. Objetivo: Que el piloto tenga una plantilla visual para ordenar un mensaje no normal cuando no hay fraseología.",
        alto: 420,
        ratio: "1 / 1",
        anchoMax: 480,
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      verificar(
        "«SAY INTENTIONS» como frase de ATC no está en las fuentes cargadas: consultar el Doc 4444 cap. 12. La estructura de cinco preguntas es una herramienta didáctica, no texto OACI: confirmar si el operador tiene su propio formato. Los hechos y conclusiones del vuelo 052 de Avianca se confirman en el informe NTSB AAR-91/04 (no cargado).",
      ),
      ...ejemplo(
        "Ejemplo 1 · Engelamiento: el problema y el pedido (PLAIN ENGLISH)",
        [
          `PILOT: "Bogota Control, AVIATORY 452, we cannot maintain this altitude due icing. Request immediate descent to flight level two four zero."`,
          `ATC:   "AVIATORY 452, descend to flight level two four zero."`,
          `PILOT: "Descend to flight level two four zero. AVIATORY 452."`,
        ],
        "Significado: **PLAIN ENGLISH** para el problema y el pedido; fraseología normalizada para la instrucción y su colación. En una frase: lo que no puede (mantener altitud), por qué (hielo) y lo que necesita (descenso inmediato a un nivel concreto).",
      ),
      ...ejemplo(
        "Ejemplo 2 · Misma situación, mal dicha",
        [
          `PILOT: "Bogota, AVIATORY 452, eh, we are having some problems with the ice, I think we would like to go a little lower if that is possible."`,
        ],
        "Significado: no dice que no puede mantener el nivel, no dice a qué nivel ni con qué urgencia. «A little lower» obliga a ATC a preguntar. Además, el Doc 9432 2.2.1 g) pide evitar sonidos de duda como «eh».",
      ),
      ...ejemplo(
        "Ejemplo 3 · Falla de motor sin palabra técnica (PLAIN ENGLISH)",
        [
          `PILOT: "Bogota Approach, AVIATORY 452, the right engine is vibrating and we have reduced power. We can maintain eight thousand feet. Request vectors for ILS runway one three left."`,
        ],
        "Significado: **PLAIN ENGLISH**. Describe el efecto (vibra, redujo potencia), la capacidad (mantiene altitud) y el pedido.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Pérdida de potencia con recepción difícil (modelo verificado, Doc 9432 2.8.1.8)",
        [
          `PILOT: "Bogota, AVIATORY 452, GIKOS, two thousand five hundred feet, I say again, two thousand five hundred feet, engine losing power, engine losing power."`,
        ],
        "Significado: el Doc 9432 2.8.1.8 recomienda repetir los elementos importantes si la recepción será difícil; su ejemplo es «WALDEN 2 500 FEET, I SAY AGAIN 2 500 FEET, ENGINE LOSING POWER, ENGINE LOSING POWER».",
      ),
      ...ejemplo(
        "Ejemplo 5 · Pedir tiempo («say intentions»: VERIFICAR)",
        [
          `ATC:   "AVIATORY 452, say intentions."`,
          `PILOT: "Standby. AVIATORY 452."`,
          `PILOT (un minuto después): "Bogota Approach, AVIATORY 452, we need five more minutes to complete the checklist. Request to hold at present position."`,
        ],
        "Significado: STANDBY («espere y le llamaré», Doc 9432 2.6) compra tiempo sin prometer nada. Después se da un tiempo concreto.",
      ),
      ...ejemplo(
        "Ejemplo 6 · Decir lo que no se puede",
        [
          `ATC:   "AVIATORY 452, expect runway three one, circle to land."`,
          `PILOT: "Unable circling due flight control problem. Request straight-in ILS runway one three left. AVIATORY 452."`,
        ],
        "Significado: UNABLE más el motivo (Doc 9432 2.6 y 2.8.3.10) y una alternativa.",
      ),
      ...ejemplo(
        "Ejemplo 7 · No entender la pregunta de ATC",
        [
          `ATC:   "AVIATORY 452, do you require the equipment to follow you to the stand after landing?"`,
          `PILOT: "Say again slowly. AVIATORY 452."`,
          `ATC:   "AVIATORY 452, do you want the fire trucks to follow you after landing?"`,
          `PILOT: "Affirm. AVIATORY 452."`,
        ],
        "Significado: es mejor pedir repetición que contestar a ciegas (Doc 9835 4.6.7). SPEAK SLOWER es la frase normalizada para pedir que hable más lento (Doc 9432 2.6).",
      ),
      ...ejemplo(
        "Ejemplo 8 · Informar intenciones de forma completa (PLAIN ENGLISH)",
        [
          `PILOT: "Bogota Approach, AVIATORY 452, we intend to land at Bogota runway one three left. We will stop on the runway and need the fire services to inspect the brakes. We do not need an evacuation at this time."`,
        ],
        "Significado: **PLAIN ENGLISH**. Frases cortas, una idea cada una. «At this time» deja claro que puede cambiar.",
      ),
      { kind: "sub", text: "Caso real para discutir" },
      {
        kind: "p",
        text: "Vuelo 052 de Avianca, 25 de enero de 1990, Nueva York. El informe de la NTSB (AAR-91/04) concluyó que la tripulación no comunicó a ATC de forma clara que tenía una emergencia de combustible. Las palabras usadas no transmitieron la urgencia real, y ATC no la trató como emergencia. Lección: si la situación es grave, se dice la palabra que la hace grave (MAYDAY, «emergency»), no una aproximación. El Doc 9835 1.2.1 menciona entre tres accidentes graves con fallas de comunicación en inglés «un accidente porque la aeronave se quedó sin combustible», sin nombrarlo.",
      },
      verificar(
        "Los hechos y conclusiones del vuelo 052 de Avianca no están en las fuentes cargadas: se confirman en el informe NTSB AAR-91/04.",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En la frecuencia, en el simulador y en la entrevista",
        texto: "Muchos operadores entrenan una estructura fija para anunciar una falla por radio y en el briefing de cabina. Si su operador tiene una, esa manda; la de cinco preguntas es una ayuda de estudio, no una norma OACI.",
        pasos: [
          "En la entrevista y en el simulador suelen evaluar que el candidato pueda explicar una falla en inglés sin quedarse en silencio buscando la palabra exacta.",
        ],
      },
      { kind: "sub", text: "Error frecuente" },
      error(
        "Traducir frases largas y corteses",
        "Traducir del español frases largas y corteses: «We would like to request, if possible, a descent…». La cortesía sobra (Doc 9432 3.1.4).",
      ),
      error("El nombre en vez de la consecuencia", "Decir el nombre del botón o de la luz en vez de la consecuencia."),
      error(
        "Quedarse callado",
        "Quedarse callado por no encontrar la palabra. El silencio puede interpretarse como comprensión (Doc 9835 4.6.7).",
      ),
      error("Pedir sin valor concreto", "Pedir sin valor concreto: «lower», «a few miles», «some time»."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Frases cortas, una idea cada una.",
          "Problema, lo que puede, lo que no puede, lo que necesita, lo que va a hacer.",
          "Consecuencia antes que nombre técnico.",
          "Valores concretos: nivel, minutos, millas, pista.",
          "Si la situación es grave, se dice la palabra que la hace grave.",
          "STANDBY para ganar tiempo; SAY AGAIN o SPEAK SLOWER si no entendió.",
        ],
      },
      fuentes(
        "Doc 9835 · Doc 9432",
        "Doc 9835 (2.ª ed.) 1.2.1, 3.3.16, 4.6.6, 4.6.7, 5.3.3.1, 5.3.3.4, 5.3.3.5, 5.3.3.7; Doc 9432 (4.ª ed.) 2.2.1 g), 2.6 (STANDBY, SPEAK SLOWER, UNABLE, AFFIRM), 2.8.1.8, 2.8.3.10, 3.1.4.",
        [
          "VERIFICAR: hechos y conclusiones del vuelo 052 de Avianca contra el informe NTSB AAR-91/04 (no cargado).",
          "VERIFICAR: «SAY INTENTIONS» como frase de ATC contra Doc 4444 cap. 12.",
          "VERIFICAR: la estructura de cinco preguntas es herramienta didáctica, no texto OACI; confirmar si el operador tiene su propio formato.",
        ],
      ),
    ],
  },
  // ── 53 ──────────────────────────────────────────────────────────────────
  {
    n: 53,
    title: "Cómo pedir aclaración",
    kicker: "SAY AGAIN, CONFIRM y VERIFY sin vergüenza",
    minutes: 8,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Son las palabras normalizadas para decir «no entendí», «repítame», «¿es esto lo que me dijo?», «no puedo» o «espere». Usarlas bien evita ejecutar algo que no se entendió.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      { kind: "p", text: "Significados oficiales (Doc 9432 2.6):" },
      {
        kind: "table",
        head: ["Palabra", "Significado OACI", "Cuándo la usa el piloto"],
        rows: [
          ["SAY AGAIN", "«Repítame todo, o la siguiente parte, de su última transmisión»", "No oyó o no entendió"],
          [
            "CONFIRM",
            "«Solicito verificación de: (autorización, instrucciones, medidas, información)»",
            "Cree que entendió pero quiere estar seguro",
          ],
          ["SPEAK SLOWER", "«Disminuya la velocidad al hablar»", "El controlador habla demasiado rápido"],
          [
            "WORDS TWICE",
            "Como solicitud: «La comunicación es difícil. Ruego transmita cada palabra o grupo de palabras dos veces»",
            "Recepción muy mala",
          ],
          [
            "UNABLE",
            "«No puedo cumplir su solicitud, instrucciones o autorización» (normalmente seguida del motivo)",
            "No puede cumplir",
          ],
          ["STANDBY", "«Espere y le llamaré». No es ni aprobación ni denegación", "Necesita tiempo antes de responder"],
          ["I SAY AGAIN", "«Repito para aclarar o recalcar»", "Repite algo propio"],
          ["NEGATIVE", "«No», «Permiso no concedido», «Es incorrecto» o «No se puede»", "Corrige a ATC"],
        ],
      },
      {
        kind: "p",
        text: "Variantes de SAY AGAIN (Doc 9432 2.8.1.4): SAY AGAIN (todo), SAY AGAIN (elemento), SAY AGAIN ALL BEFORE…, SAY AGAIN ALL AFTER…, SAY AGAIN ALL BETWEEN… AND….",
      },
      {
        kind: "p",
        text: "Sobre **VERIFY**: no figura en la lista de palabras normalizadas del Doc 9432 2.6 (4.ª ed.). Aparece como instrucción del controlador en la fraseología de vigilancia («verifique nivel», Doc 9432 6.5, solo en español en lo cargado). Para pedir confirmación, el piloto tiene CONFIRM. VERIFY se oye mucho en espacio aéreo de Estados Unidos; su estado en el Anexo 10 y el Doc 4444 vigentes está en VERIFICAR.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Pedir aclaración no es una falla de nivel de inglés",
        text: "El descriptor de nivel 4 dice que el piloto «ante posibles malentendidos verifica, confirma o clarifica adecuadamente» (Doc 9835 4.6.7), y que la comprensión ante imprevistos «requiere estrategias de aclaración» (4.6.6). El mismo manual dice que es mucho más seguro repreguntar, e incluso reconocer que no se entendió, que dejar que el silencio se interprete como comprensión (4.6.7).",
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      verificar(
        "El estado de VERIFY como palabra normalizada no está en las fuentes cargadas: consultar el Anexo 10 Vol. II 5.2.1.9 y el Doc 4444 cap. 12; su uso en Estados Unidos, el FAA AIM y la JO 7110.65. «CAN YOU ACCEPT (runway)» como frase de ATC se confirma en el Doc 4444 cap. 12.",
      ),
      ...ejemplo(
        "Ejemplo 1 · SAY AGAIN (elemento)",
        [
          `ATC:   "AVIATORY 452, descend to flight level two (ininteligible) zero, contact Bogota Approach one one niner decimal five."`,
          `PILOT: "Say again level. AVIATORY 452."`,
          `ATC:   "AVIATORY 452, descend to flight level two four zero."`,
          `PILOT: "Descend to flight level two four zero. AVIATORY 452."`,
        ],
        "Significado: SAY AGAIN (elemento) pide solo lo que faltó (Doc 9432 2.8.1.4). La frecuencia se entendió; el nivel no.",
      ),
      ...ejemplo(
        "Ejemplo 2 · SAY AGAIN ALL AFTER",
        [
          `ATC:   "AVIATORY 452, cleared direct GIKOS, descend to flight level two four zero, reduce speed two five zero knots, contact Bogota Approach one one niner decimal five."`,
          `PILOT: "Say again all after GIKOS. AVIATORY 452."`,
        ],
        "Significado: pide todo lo que siguió a la última palabra bien recibida (SAY AGAIN ALL AFTER).",
      ),
      ...ejemplo(
        "Ejemplo 3 · CONFIRM",
        [
          `ATC:   "AVIATORY 452, turn left heading two one zero."`,
          `PILOT: "Confirm left heading two one zero? AVIATORY 452."`,
          `ATC:   "AVIATORY 452, affirm, left heading two one zero."`,
        ],
        "Significado: CONFIRM se usa cuando lo recibido no calza con lo esperado (en este caso, un viraje hacia el terreno o contrario a la ruta). ATC responde AFFIRM («sí»).",
      ),
      ...ejemplo(
        "Ejemplo 4 · Confirmar una autorización de pista (PLAIN ENGLISH en la segunda parte)",
        [
          `ATC:   "AVIATORY 452, runway one three left, line up and wait."`,
          `PILOT: "Confirm line up and wait, not cleared for takeoff? AVIATORY 452."`,
        ],
        "Significado: **PLAIN ENGLISH** en la segunda parte. Ante la mínima duda sobre una autorización de pista, se confirma antes de moverse.",
      ),
      ...ejemplo(
        "Ejemplo 5 · SPEAK SLOWER",
        [
          `ATC (muy rápido): "AVIATORY 452 descend flight level one two zero reduce speed two two zero cleared ILS approach runway one three left report established."`,
          `PILOT: "Speak slower. AVIATORY 452."`,
        ],
        "Significado: SPEAK SLOWER es la frase normalizada (Doc 9432 2.6). No es descortés.",
      ),
      ...ejemplo(
        "Ejemplo 6 · Recepción muy mala: WORDS TWICE",
        [`PILOT: "Bogota Control, AVIATORY 452, reception is very poor, words twice."`],
        "Significado: WORDS TWICE como solicitud (Doc 9432 2.6).",
      ),
      ...ejemplo(
        "Ejemplo 7 · No puede cumplir: UNABLE",
        [
          `ATC:   "AVIATORY 452, climb to flight level three nine zero."`,
          `PILOT: "Unable flight level three nine zero due weight. AVIATORY 452."`,
        ],
        "Significado: el modelo verificado del Doc 9432 2.8.3.10 es «UNABLE TO CROSS WICKEN FL 150 DUE WEIGHT».",
      ),
      ...ejemplo(
        "Ejemplo 8 · No sabe la respuesta todavía: STANDBY («can you accept»: VERIFICAR)",
        [
          `ATC:   "AVIATORY 452, can you accept runway three one?"`,
          `PILOT: "Standby. AVIATORY 452."`,
          `PILOT: "Bogota Approach, AVIATORY 452, affirm, we can accept runway three one."`,
        ],
        "Significado: STANDBY no dice sí ni no. Después hay que volver con la respuesta.",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En cabina, antes de apretar el micrófono",
        texto: "En cabina, antes de pedir aclaración conviene preguntarle al otro piloto: «¿Qué oíste?». Si hay diferencia, se pide a ATC.",
        pasos: [
          "En frecuencias congestionadas se pide solo lo que falta (SAY AGAIN LEVEL, SAY AGAIN ALL AFTER…) para no ocupar la frecuencia más de lo necesario.",
        ],
      },
      { kind: "sub", text: "Error frecuente" },
      error(
        "Colacionar lo que se cree haber oído",
        "Colacionar lo que se cree haber oído en vez de pedir repetición.",
      ),
      error(
        "ROGER a una pregunta de sí o no",
        "Usar ROGER para responder una pregunta que pide sí o no. El Doc 9432 2.6 lo prohíbe: la respuesta es AFFIRM o NEGATIVE.",
      ),
      error("STANDBY sin volver", "Decir STANDBY y no volver nunca."),
      error("Say again de todo", "Pedir «say again» de todo cuando solo faltó un número."),
      error(
        "Confirm sin decir qué",
        "«Confirm» sin decir qué se confirma. Se repite el elemento: «Confirm flight level two four zero».",
      ),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "SAY AGAIN si no oyó; CONFIRM si oyó pero duda.",
          "Pedir solo lo que falta.",
          "SPEAK SLOWER y WORDS TWICE existen y son normalizadas.",
          "UNABLE siempre con motivo.",
          "STANDBY no es aprobación y obliga a volver.",
          "Pedir repetición es una competencia del nivel 4, no una debilidad.",
        ],
      },
      fuentes(
        "Doc 9432 · Doc 9835",
        "Doc 9432 (4.ª ed.) 2.6 (SAY AGAIN, CONFIRM, SPEAK SLOWER, WORDS TWICE, UNABLE, STANDBY, I SAY AGAIN, NEGATIVE, AFFIRM, ROGER), 2.8.1.4, 2.8.3.10, 6.5 («verifique nivel»); Doc 9835 (2.ª ed.) 4.6.6, 4.6.7.",
        [
          "VERIFICAR: estado de VERIFY como palabra normalizada contra Anexo 10 Vol. II 5.2.1.9 y Doc 4444 cap. 12 (no cargados); uso en EE. UU. contra FAA AIM y JO 7110.65.",
          "VERIFICAR: «CAN YOU ACCEPT (runway)» como frase de ATC contra Doc 4444 cap. 12.",
        ],
      ),
    ],
  },
  // ── 54 ──────────────────────────────────────────────────────────────────
  {
    n: 54,
    title: "Acentos y escucha",
    kicker: "Estrategias para una frecuencia difícil",
    minutes: 7,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Escuchar bien por radio (listening) a controladores y pilotos de otros países, con acentos distintos, velocidades altas, radio de mala calidad y frecuencia congestionada.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "**Todos tenemos acento** (Doc 9835, definición de «acento»). No existe un acento correcto ni una institución que lo fije (5.3.4.3). Lo que se exige es un acento **inteligible para la comunidad aeronáutica** (4.5.3 e; 5.3.4.1).",
          "El nivel 4 comprende «cuando el acento o las variantes utilizadas son suficientemente inteligibles para la comunidad internacional de usuarios» y, ante complicaciones, su comprensión «es más lenta o requiere estrategias de aclaración» (Doc 9835 4.6.6). El nivel 5 ya comprende «una gran diversidad de variantes lingüísticas (dialectos y acentos)».",
          "La radio empeora todo: el ancho de banda oscurece sonidos como «s» y «f», hay estática y ruido de cabina, y si alguien habla antes de oprimir el micrófono se corta el inicio del mensaje (Doc 9835 3.3.1 f).",
          "Los hablantes de segunda lengua se apoyan más en la pronunciación que en el contexto (Doc 9835 5.3.3.6). Por eso los números mal pronunciados son peligrosos.",
          "En Latinoamérica muchas dependencias alternan español e inglés (Doc 9835 3.3.22; 4.3.5). Un piloto que opera en inglés pierde lo que se dice en español en la misma frecuencia, y viceversa.",
          "La responsabilidad es de ambos lados: quien domina menos la lengua debe capacitarse; quien la domina más debe modular su expresión (Doc 9835 3.3.3).",
        ],
      },
      { kind: "sub", text: "Estrategias de escucha" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Anticipar sin completar**: saber qué viene según la fase de vuelo (en descenso, nivel y frecuencia) pero escuchar lo que realmente dicen.",
          "**Filtrar por distintivo**: la atención sube con el propio call sign, y también con distintivos parecidos (capítulo 56).",
          "**Buscar las palabras operacionales**: CLIMB, DESCEND, TURN, HEADING, HOLD, CLEARED, CONTACT, UNABLE, CANCEL.",
          "**Confirmar los números críticos**: nivel, rumbo, pista, frecuencia, QNH, código SSR.",
          "**No completar mentalmente** lo que no se oyó.",
          "**Pedir repetición** (capítulo 53).",
          "Del lado propio: hablar a velocidad constante, sin exceder 100 palabras por minuto y más lento si el otro va a anotar; pausa antes y después de números (Doc 9432 2.2.1 d y f).",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      verificar(
        "El idioma de uso en las frecuencias colombianas (español e inglés) no está en las fuentes cargadas: consultar el AIP Colombia GEN 3.4 y los RAC.",
      ),
      ...ejemplo(
        "Ejemplo 1 · Frecuencia no entendida",
        [
          `ATC (rápido, acento fuerte): "AVIATORY 452, descend to flight level one one zero, contact Bogota Approach one one niner decimal five."`,
          `PILOT: "Say again frequency. AVIATORY 452."`,
          `ATC:   "AVIATORY 452, one one niner decimal five."`,
          `PILOT: "One one niner decimal five. AVIATORY 452."`,
        ],
        "Significado: el nivel se entendió; la frecuencia no. Se pide solo lo que faltó.",
      ),
      ...ejemplo(
        "Ejemplo 2 · QNH incompleto",
        [`ATC:   "AVIATORY 452, QNH one zero (ruido) three."`, `PILOT: "Say again QNH. AVIATORY 452."`],
        "Significado: el QNH es un valor que se colaciona siempre (Doc 4444 4.5.7.5.1 c). Nunca se «adivina» el dígito faltante.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Prueba de radio (Doc 9432 2.8.4.3)",
        [
          `PILOT: "Bogota Tower, AVIATORY 452, radio check one one eight decimal one."`,
          `ATC:   "AVIATORY 452, Bogota Tower, reading you three, loud background whistle."`,
        ],
        "Significado: escala de inteligibilidad 1 a 5 (Doc 9432 2.8.4.3). «Tres» es inteligible con dificultad. El ejemplo del Doc 9432 es «READING YOU THREE, LOUD BACKGROUND WHISTLE».",
      ),
      ...ejemplo(
        "Ejemplo 4 · Dígitos uno por uno",
        [`ATC:   "AVIATORY 452, turn right heading zero four zero."`, `PILOT: "Right heading zero four zero. AVIATORY 452."`],
        "Significado: en inglés el «four» y el «forty» se confunden con el acento; decir los dígitos uno por uno (Doc 9432 2.4.2) evita el problema. El Doc 9835 3.3.11 da el ejemplo de «runway ten left», donde «ten» podría oírse como «turn»: por eso se dice «runway one zero left».",
      ),
      ...ejemplo(
        "Ejemplo 5 · Pedir que hable más lento",
        [`PILOT: "Bogota Control, AVIATORY 452, speak slower please, we are not receiving you clearly."`],
        "Significado: SPEAK SLOWER normalizado (Doc 9432 2.6) más una explicación corta. La palabra «please» es cortesía que la fraseología evita (3.1.4); aquí no causa daño, pero sobra.",
      ),
      {
        kind: "hueco",
        rotulo: "CM-54-01 · Diagrama · 16:9 · 1600×900 px",
        descripcion:
          "Imagen sugerida: Una onda de audio horizontal que representa una transmisión ATC. Sobre ella, la transcripción «AVIATORY 452, descend flight level one one zero, contact Bogota Approach one one niner decimal five», con el distintivo resaltado, la palabra DESCEND resaltada, el nivel en un recuadro y la frecuencia en otro. Una zona de la onda está tapada por estática gris sobre la frecuencia, con la etiqueta «SAY AGAIN FREQUENCY». Objetivo: Que el piloto vea qué partes de una transmisión debe capturar con prioridad y que un trozo perdido se pide, no se inventa.",
        alto: 280,
      },
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En rutas regionales",
        texto: "Las rutas regionales en Latinoamérica pasan por dependencias con acentos distintos en el mismo vuelo. Los dos pilotos escuchan las autorizaciones críticas y comparan lo que oyeron (capítulo 59).",
        pasos: [
          "Si la frecuencia está en español para el tráfico local e inglés para el internacional, conviene seguir ambas para mantener conciencia del tráfico, según el idioma que maneje la tripulación.",
        ],
      },
      { kind: "sub", text: "Error frecuente" },
      error("Colacionar un número que no se oyó", "Colacionar con seguridad un número que no se oyó."),
      error(
        "Burlarse o impacientarse con un acento",
        "Burlarse o impacientarse con un acento. El Doc 9835 2.5.5 dice que no hay acento mejor que otro.",
      ),
      error("Acelerar para «sonar fluido»", "Acelerar el propio habla para «sonar fluido»."),
      error(
        "Suponer que un nativo siempre será claro",
        "Asumir que un nativo anglohablante siempre será claro: el Doc 9835 2.4.1.2 recuerda que un nativo puede tener un acento regional ininteligible para otros.",
      ),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "El acento no es el problema; la inteligibilidad sí.",
          "Números críticos: o se oyeron completos o se piden de nuevo.",
          "Dígitos uno por uno.",
          "Hablar a velocidad constante y con pausas en los números.",
          "Pedir repetición es parte del nivel 4.",
        ],
      },
      fuentes(
        "Doc 9835 · Doc 9432 · Doc 4444",
        "Doc 9835 (2.ª ed.) definición de «acento», 2.4.1.2, 2.5.5, 3.3.1 f), 3.3.3, 3.3.11, 3.3.22, 4.3.5, 4.5.3 e), 4.6.6, 5.3.3.6, 5.3.3.7, 5.3.4.1, 5.3.4.3; Doc 9432 (4.ª ed.) 2.2.1 d) y f), 2.4.2, 2.6, 2.8.4.3, 3.1.4; Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1.",
        ["VERIFICAR: idioma de uso en frecuencias colombianas (español e inglés) contra AIP Colombia GEN 3.4 y RAC."],
      ),
    ],
  },
  // ── 55 ──────────────────────────────────────────────────────────────────
  {
    n: 55,
    title: "Sesgo de expectativa",
    kicker: "Oír lo que se esperaba en vez de lo que se dijo",
    minutes: 7,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Es la tendencia a oír lo que uno espera oír (expectation bias). Si la tripulación espera «flight level two four zero» y ATC dice «two six zero», la mente puede corregir el dato hacia lo esperado sin que nadie lo note.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "El Doc 9835 lo menciona de forma directa: los especialistas en factores humanos «destacan el peligro de dejar que nuestras expectativas tiñan nuestra interpretación de la realidad» (4.5.3 d). Entre los errores del oyente cuenta la percepción incorrecta por «falsas expectativas» (Cuadro 2-1, error de decodificación).",
          "El descriptor de comprensión insiste en entender al controlador «especialmente cuando difieren de lo que el piloto anticipaba escuchar» (Doc 9835 4.6.6).",
          "Dónde aparece más: la pista que se usa siempre, el nivel que se pidió, el rumbo de la ruta habitual, la autorización que se esperaba («cleared for takeoff» cuando dijeron «line up and wait»), el distintivo parecido al propio.",
          "Las defensas son la **colación completa**, el **hearback** del controlador (Doc 4444 4.5.7.5.2) y el **crosscheck** entre pilotos. Ninguna funciona si se colaciona lo que se esperaba en lugar de lo que se oyó.",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      verificar(
        "El formato del crosscheck verbal entre PF y PM de estos ejemplos es ilustrativo: se confirma contra el SOP del operador, porque varía de uno a otro.",
      ),
      ...ejemplo(
        "Ejemplo 1 · Pista esperada",
        [
          `ATC:   "AVIATORY 452, cleared ILS approach runway one three right."`,
          `PILOT: "Cleared ILS approach runway one three left. AVIATORY 452."`,
          `ATC:   "AVIATORY 452, negative, I say again, runway one three right."`,
          `PILOT: "Runway one three right, cleared ILS approach. AVIATORY 452."`,
        ],
        "Significado: la tripulación esperaba la pista izquierda de siempre. El hearback de ATC detectó el error. NEGATIVE I SAY AGAIN es el modelo del Doc 9432 2.8.3.9.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Nivel pedido y nivel autorizado",
        [
          `PILOT: "Bogota Control, AVIATORY 452, request flight level three seven zero."`,
          `ATC:   "AVIATORY 452, climb to flight level three five zero."`,
          `PILOT: "Climb to flight level three five zero. AVIATORY 452."`,
        ],
        "Significado: se autorizó un nivel **distinto** del pedido. El riesgo es colacionar o seleccionar el pedido. El PM dice el valor en voz alta y el PF lo verifica en la pantalla (capítulo 60).",
      ),
      ...ejemplo(
        "Ejemplo 3 · Autorización esperada en pista",
        [
          `ATC:   "AVIATORY 452, runway one three left, line up and wait."`,
          `PILOT: "Runway one three left, line up and wait. AVIATORY 452."`,
        ],
        "Significado: la tripulación lista para despegar puede «oír» una autorización de despegue. LINE UP AND WAIT no autoriza a despegar. El Doc 9432 2.8.3.3 reserva la palabra TAKE-OFF para la autorización de despegue o su cancelación.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Rumbo habitual",
        [
          `ATC:   "AVIATORY 452, turn left heading one niner zero."`,
          `PILOT: "Left heading one niner zero. AVIATORY 452."`,
          `PM (en cabina): «Izquierda uno nueve cero».`,
          `PF (en cabina): «Izquierda uno nueve cero, seleccionado».`,
        ],
        "Significado: la ruta de siempre sale a la derecha. La colación lo dice bien; el crosscheck asegura que también se seleccionó bien.",
      ),
      ...ejemplo(
        "Ejemplo 5 · Autorización de otro avión",
        [
          `ATC:   "AVIATORY 425, descend to flight level two zero zero."`,
          `PILOT: "Descend flight level two zero zero, AVIATORY 452."`,
          `ATC:   "AVIATORY 452, negative, that instruction was for AVIATORY 425. AVIATORY 452, maintain flight level two eight zero."`,
          `PILOT: "Maintain flight level two eight zero. AVIATORY 452."`,
        ],
        "Significado: la tripulación esperaba descenso y tomó la autorización de un distintivo parecido (capítulo 56). Terminar la colación con el propio distintivo (Doc 9432 2.8.3.7) permitió detectarlo.",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En la base y en el briefing",
        texto: "En aeropuertos conocidos (base de la aerolínea) el sesgo es mayor porque la rutina es más fuerte.",
        pasos: [
          "Un briefing que anticipa «esperamos pista 13L» ayuda a planear, pero debe terminar con «confirmamos con la autorización que nos den».",
          "Cuando algo no calza con lo esperado, se dice en voz alta en cabina y se confirma con ATC.",
        ],
      },
      { kind: "sub", text: "Error frecuente" },
      error("Colacionar lo que se esperaba", "Colacionar lo que se esperaba."),
      error("Seleccionar el valor pedido", "Seleccionar en el MCP/FCU el valor pedido y no el autorizado."),
      error(
        "Confiar en que ATC corregirá",
        "Confiar en que ATC corregirá: el hearback falla también, sobre todo en frecuencias saturadas.",
      ),
      error("«Era el turno»", "Suponer que la autorización es para uno porque «era el turno»."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Se oye lo que se espera; hay que escuchar lo que se dice.",
          "Si difiere de lo esperado, se confirma.",
          "La colación repite lo oído, no lo esperado.",
          "El crosscheck entre pilotos es la segunda barrera.",
          "Los distintivos parecidos son terreno fértil para el sesgo.",
        ],
      },
      {
        kind: "hueco",
        rotulo: "CM-55-01 · Esquema · 16:9 · 1600×900 px",
        descripcion:
          "Imagen sugerida: Dos globos de diálogo. A la izquierda, el de ATC dice «climb flight level three five zero». A la derecha, el de la mente del piloto dice «three seven zero» (lo pedido), tachado en rojo, y debajo «three five zero» en verde con un check. En medio, un filtro con la palabra EXPECTATION. Objetivo: Que el piloto visualice cómo la expectativa reemplaza el dato oído y que la colación y el crosscheck son el filtro correcto.",
        alto: 280,
      },
      fuentes(
        "Doc 9835 · Doc 4444 · Doc 9432",
        "Doc 9835 (2.ª ed.) Cuadro 2-1, 4.5.3 d), 4.6.6, 5.3.3.2 («autosugestión»); Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1, 4.5.7.5.2; Doc 9432 (4.ª ed.) 2.8.3.3, 2.8.3.7, 2.8.3.9.",
        ["VERIFICAR: formato del crosscheck verbal PF/PM contra el SOP del operador (varía por operador)."],
      ),
    ],
  },
  // ── 56 ──────────────────────────────────────────────────────────────────
  {
    n: 56,
    title: "Distintivos parecidos",
    kicker: "Cuando la autorización era para otro",
    minutes: 7,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Dos o más aeronaves en la misma frecuencia con distintivos que suenan parecido (similar call signs): AVIATORY 452, AVIATORY 425, AVIATORY 542. El riesgo es que una tripulación acepte y ejecute una autorización que era para otra.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "Un distintivo formado por designador telefónico más número de vuelo **no se abrevia** (Doc 9432 2.7.2.2, tipo c). AVIATORY 452 siempre es AVIATORY 452.",
          "La colación sirve también «para comprobar que sólo la aeronave a la que iba dirigida actúe de acuerdo con dicha autorización» (Doc 9432 2.8.3.4). Por eso la colación **termina con el distintivo propio** (2.8.3.7).",
          "Si hay probabilidad de confusión, ATC puede ordenar a una aeronave que cambie temporalmente el tipo de su distintivo (Doc 9432 2.7.2.3). La frase exacta está en VERIFICAR.",
          "Números con dígitos iguales en distinto orden (452 y 425), o que terminan igual (452 y 552), son los más peligrosos. Se suman al sesgo de expectativa (capítulo 55).",
          "Una transmisión cruzada puede tapar la corrección de ATC (capítulo 57).",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      verificar(
        "La frase para el cambio temporal de distintivo («CHANGE YOUR CALL SIGN TO…», «REVERT TO FLIGHT PLAN CALL SIGN») y el aviso «CAUTION SIMILAR CALL SIGN» no están en las fuentes cargadas: consultar el Doc 4444 cap. 12 y la práctica de la dependencia. Los programas de prevención de distintivos parecidos (por ejemplo, Eurocontrol Call Sign Similarity Service) y su equivalente en Colombia se consultan con la autoridad y el proveedor ATS.",
      ),
      {
        kind: "escenario",
        titulo: "Escenario de práctica (ficticio): dos colaciones de la misma autorización",
        situacion:
          "En Bogota Approach están AVIATORY 452 (su vuelo) y AVIATORY 425, ambos en descenso. ATC: `AVIATORY 425, descend to flight level one two zero.` PILOT (de 452, por error): `Descend flight level one two zero, AVIATORY 452.` PILOT (de 425): `Descend flight level one two zero, AVIATORY 425.`",
        preguntas: [
          {
            q: "¿Qué pudo oír ATC y qué tiene que pasar después?",
            a: "Dos colaciones de la misma autorización. Si se pisaron, ATC no oyó ninguna. Si ATC oyó la de 452, debe corregirla.",
          },
          {
            q: "¿Cómo suena la corrección y qué hace la tripulación de 452?",
            a: "ATC: `AVIATORY 452, negative, maintain flight level one six zero. That clearance was for AVIATORY 425.` PILOT: `Maintain flight level one six zero, AVIATORY 452.` Corrección con NEGATIVE. La tripulación de 452 vuelve o se queda en su nivel.",
          },
        ],
        concepto: "La colación termina con el distintivo propio para que solo actúe la aeronave a la que iba dirigida (Doc 9432 2.8.3.4 y 2.8.3.7).",
      },
      ...ejemplo(
        "Ejemplo 1 · Duda antes de colacionar (PLAIN ENGLISH en «confirm instruction was for»)",
        [
          `ATC:   "AVIATORY 4…2, turn right heading zero niner zero."`,
          `PILOT: "Bogota Approach, AVIATORY 452, confirm instruction was for AVIATORY 452?"`,
          `ATC:   "AVIATORY 452, negative, that was for AVIATORY 542."`,
        ],
        "Significado: si no está seguro de que era para usted, se pregunta antes de ejecutar. **PLAIN ENGLISH** en «confirm instruction was for».",
      ),
      ...ejemplo(
        "Ejemplo 2 · ATC cambia distintivos (redacción: VERIFICAR)",
        [
          `ATC:   "AVIATORY 452, due similar call sign on frequency, change your call sign to AVIATORY 452 Alpha until further advised."`,
          `PILOT: "Changing call sign to AVIATORY 452 Alpha. AVIATORY 452 Alpha."`,
        ],
        "Significado: aplicación de Doc 9432 2.7.2.3. La redacción OACI de la frase está en VERIFICAR; el nuevo distintivo se usa hasta que ATC indique volver al del plan de vuelo.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Aviso de ATC (VERIFICAR)",
        [`ATC:   "AVIATORY 452, caution, similar call sign AVIATORY 425 on frequency."`, `PILOT: "Roger. AVIATORY 452."`],
        "Significado: aviso práctico común en algunas dependencias; no está en lo cargado (VERIFICAR).",
      ),
      ...ejemplo(
        "Ejemplo 4 · Aviso de la tripulación (PLAIN ENGLISH)",
        [`PILOT: "Bogota Approach, AVIATORY 452, for your information, AVIATORY 425 is also on frequency."`],
        "Significado: **PLAIN ENGLISH**. Si la tripulación nota el parecido antes que ATC, puede decirlo en un momento tranquilo.",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En la programación y en cabina",
        texto: "Las aerolíneas y los proveedores ATS tienen programas para evitar números de vuelo parecidos en la misma franja horaria. Su existencia y funcionamiento varían por región y operador.",
        pasos: [
          "En cabina, cuando hay un distintivo parecido en frecuencia, conviene decirlo en voz alta («ojo, hay un 425») para que ambos pilotos estén alerta.",
        ],
      },
      { kind: "sub", text: "Error frecuente" },
      error("Colacionar sin el distintivo", "Colacionar sin el distintivo, o con solo el número."),
      error(
        "Ejecutar sin oír el distintivo completo",
        "Ejecutar una autorización que se esperaba aunque el distintivo no se oyó completo.",
      ),
      error("Responder «por las dudas»", "Responder «por las dudas» a una llamada que no se entendió."),
      error(
        "Confundir el distintivo modificado y el original",
        "Seguir usando el distintivo modificado después de que ATC ordenó volver al original, o viceversa.",
      ),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Designador más número de vuelo no se abrevia.",
          "La colación termina con el distintivo propio.",
          "Si no está seguro de que era para usted, pregunte antes de ejecutar.",
          "ATC puede cambiar temporalmente su distintivo.",
          "Distintivo parecido más expectativa: doble riesgo.",
        ],
      },
      fuentes(
        "Doc 9432 · Doc 4444",
        "Doc 9432 (4.ª ed.) 2.7.2.2 (tipo c no se abrevia), 2.7.2.3, 2.8.3.4, 2.8.3.7; Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.2.",
        [
          "VERIFICAR: frase para cambio temporal de distintivo («CHANGE YOUR CALL SIGN TO…», «REVERT TO FLIGHT PLAN CALL SIGN») contra Doc 4444 cap. 12.",
          "VERIFICAR: aviso «CAUTION SIMILAR CALL SIGN» contra Doc 4444 cap. 12 y práctica de la dependencia.",
          "VERIFICAR: programas de prevención de distintivos parecidos (por ejemplo, Eurocontrol Call Sign Similarity Service) y su equivalente en Colombia ante la autoridad y el proveedor ATS.",
        ],
      ),
    ],
  },
  // ── 57 ──────────────────────────────────────────────────────────────────
  {
    n: 57,
    title: "Transmisiones bloqueadas",
    kicker: "Dos a la vez y un dato perdido",
    minutes: 8,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Una transmisión bloqueada (blocked transmission) ocurre cuando dos estaciones transmiten al mismo tiempo en la misma frecuencia. Los receptores oyen un chillido (heterodino), un mensaje mezclado o nada. Quien transmitía no se entera: mientras oprime el micrófono no oye a nadie.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "En radiotelefonía «los mensajes se transmiten de a uno por vez» (Doc 9835 3.3.1 e). Por eso la primera regla es **escuchar antes de transmitir** (Doc 9432 2.2.1 a).",
          "Oprimir el micrófono antes de empezar a hablar y soltarlo al terminar (Doc 9432 2.2.1 j). Hablar antes de oprimir corta el inicio del mensaje (Doc 9835 3.3.1 f).",
          "El **micrófono trabado** es «una situación molesta y potencialmente peligrosa» (Doc 9432 2.2.2): bloquea la frecuencia entera y quien lo tiene trabado no oye a ATC.",
          "Si se oye un chillido o un mensaje incompleto justo cuando se esperaba una llamada propia, **se asume que puede haber sido para usted**, y se pregunta.",
          "Si su colación coincidió con otra, ATC no oyó ninguna de las dos: no hubo hearback.",
          "Si nadie respondió a su colación, no se puede asumir que ATC la escuchó.",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      verificar(
        "«BLOCKED» como frase normalizada no está en las fuentes cargadas: en Estados Unidos, consultar el FAA AIM 4-2 y la JO 7110.65; en OACI, el Anexo 10 Vol. II y el Doc 4444 cap. 12. Los hechos del accidente de Tenerife (heterodino, frase de la tripulación) se confirman en el informe oficial de la Comisión de Investigación de Accidentes de España y los comentarios de los Países Bajos (no cargados), igual que la correspondencia entre ese accidente y el de 1977 que cita el Doc 9835 3.3.6.",
      ),
      ...ejemplo(
        "Ejemplo 1 · ATC no identificó quién llamó (verificado, Doc 9432 2.8.1.5)",
        [`ATC:   "Station calling Bogota Approach, say again your call sign."`, `PILOT: "Bogota Approach, AVIATORY 452."`],
        "Significado: modelo del Doc 9432: «STATION CALLING GEORGETOWN GROUND SAY AGAIN YOUR CALL SIGN».",
      ),
      ...ejemplo(
        "Ejemplo 2 · El piloto oyó un chillido («blocked»: VERIFICAR)",
        [
          `PILOT: "Bogota Approach, AVIATORY 452, transmission blocked, say again."`,
          `ATC:   "AVIATORY 452, descend to flight level one four zero."`,
          `PILOT: "Descend flight level one four zero. AVIATORY 452."`,
        ],
        "Significado: «Transmission blocked» describe lo que pasó; «say again» es la frase normalizada. En EE. UU. la palabra BLOCKED se usa como frase propia; en OACI su estado está en VERIFICAR.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Colación sin respuesta (PLAIN ENGLISH en la primera parte)",
        [
          `PILOT: "Descend flight level one four zero. AVIATORY 452."`,
          `(Chillido al mismo tiempo. Silencio de ATC.)`,
          `PILOT: "Bogota Approach, AVIATORY 452, confirm you received our readback, descending flight level one four zero."`,
          `ATC:   "AVIATORY 452, affirm."`,
        ],
        "Significado: **PLAIN ENGLISH** en la primera parte. Una colación que pudo haberse perdido se confirma.",
      ),
      ...ejemplo(
        "Ejemplo 4 · ATC pierde parte de una llamada propia",
        [
          `PILOT: "Bogota Approach, AVIATORY 452, request descent."`,
          `ATC:   "AVIATORY 452, say again all after AVIATORY 452."`,
          `PILOT: "Request descent. AVIATORY 452."`,
        ],
        "Significado: SAY AGAIN ALL AFTER (Doc 9432 2.8.1.4).",
      ),
      ...ejemplo(
        "Ejemplo 5 · Micrófono trabado de otra aeronave (PLAIN ENGLISH después de ALL STATIONS)",
        [
          `(Frecuencia ocupada con ruido de cabina durante 40 segundos.)`,
          `ATC (en cuanto se libera): "All stations, Bogota Approach, check your microphones, frequency was blocked. AVIATORY 452, did you receive the descent clearance?"`,
          `PILOT: "Negative. AVIATORY 452."`,
        ],
        "Significado: ALL STATIONS inicia un mensaje para todos (Doc 9432 2.8.1.2). El resto es **PLAIN ENGLISH**. La tripulación dice NEGATIVE y no colaciona lo que no oyó.",
      ),
      { kind: "sub", text: "Caso real para discutir" },
      {
        kind: "p",
        text: "En el accidente de Tenerife (27 de marzo de 1977), dos transmisiones simultáneas produjeron un heterodino que tapó parte de un mensaje crítico, y la tripulación que despegaba usó una frase ambigua sobre su situación de despegue. El Doc 9835 3.3.6 menciona un accidente de 1977, sin nombrarlo, tras el cual la OACI modificó fraseología y procedimientos. Una consecuencia visible hoy es la regla del Doc 9432 2.8.3.3: la palabra TAKE-OFF solo se usa para autorizar o cancelar el despegue; en los demás casos se dice DEPARTURE o AIRBORNE.",
      },
      verificar(
        "Los hechos del accidente de Tenerife no están en las fuentes cargadas: se confirman en el informe oficial de la Comisión de Investigación de Accidentes de España y en los comentarios de los Países Bajos. Que el accidente de 1977 del Doc 9835 3.3.6 sea Tenerife también está por confirmar.",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En frecuencias saturadas",
        texto: "En frecuencias saturadas, el PM espera un instante después de cada transmisión (propia o ajena) antes de oprimir el micrófono, por si ATC o alguien más va a hablar.",
        pasos: [
          "Después de colacionar una autorización crítica, ambos pilotos escuchan si ATC corrige. Si hubo chillido, se pregunta.",
          "El micrófono se deja donde no pueda activarse por accidente (Doc 9432 2.2.2).",
        ],
      },
      { kind: "sub", text: "Error frecuente" },
      error("«Seguro no era para mí»", "Asumir que la autorización tapada «seguro no era para mí»."),
      error(
        "Repetir de inmediato la propia llamada",
        "Repetir de inmediato la propia llamada y bloquear otra vez la frecuencia.",
      ),
      error("Dar por buena una colación sin respuesta", "Dar por buena una colación a la que nadie respondió."),
      error("Hablar antes de oprimir", "Empezar a hablar antes de oprimir el micrófono."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Escuchar antes de transmitir.",
          "Chillido cuando esperaba una llamada: pregunte.",
          "Colación pisada = colación no escuchada.",
          "Micrófono trabado bloquea a todos.",
          "Nunca colacionar ni ejecutar lo que no se oyó completo.",
        ],
      },
      {
        kind: "hueco",
        rotulo: "CM-57-01 · Diagrama · 16:9 · 1600×900 px",
        descripcion:
          "Imagen sugerida: Línea de tiempo horizontal con dos barras de transmisión superpuestas en el mismo intervalo: arriba «ATC: AVIATORY 452 descend…», abajo «AVIATORY 425: request…». En la zona de superposición, una onda en zigzag rotulada «HETERODYNE / SQUEAL». Debajo, lo que oye AVIATORY 452: «…452… (chillido)…», y un globo con «SAY AGAIN». Objetivo: Que el piloto entienda que en la superposición nadie recibe completo y que la respuesta correcta es pedir repetición.",
        alto: 280,
      },
      fuentes(
        "Doc 9432 · Doc 9835",
        "Doc 9432 (4.ª ed.) 2.2.1 a) y j), 2.2.2, 2.8.1.2, 2.8.1.4, 2.8.1.5, 2.8.3.3; Doc 9835 (2.ª ed.) 3.3.1 e) y f), 3.3.6.",
        [
          "VERIFICAR: «BLOCKED» como frase normalizada (en EE. UU., FAA AIM 4-2 y JO 7110.65; en OACI, Anexo 10 Vol. II y Doc 4444 cap. 12).",
          "VERIFICAR: hechos del accidente de Tenerife (heterodino, frase de la tripulación) contra el informe oficial de la Comisión de Investigación de Accidentes de España y los comentarios de los Países Bajos (no cargados); y que el accidente de 1977 citado en Doc 9835 3.3.6 corresponde a Tenerife.",
        ],
      ),
    ],
  },
  // ── 58 ──────────────────────────────────────────────────────────────────
  {
    n: 58,
    title: "Cabina estéril y comunicaciones",
    kicker: "Conversaciones que tapan la radio",
    minutes: 7,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "«Sterile cockpit» (cabina estéril) es la regla o política de limitar la cabina, en las fases críticas del vuelo, a las tareas y conversaciones necesarias para operar el avión. Protege la escucha de ATC y la atención de la tripulación.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "**No es una norma OACI única en lo cargado.** Es regla de algunos Estados y política de muchos operadores, y cambia de uno a otro. En Estados Unidos, por ejemplo, está en el reglamento de operaciones de transporte aéreo (14 CFR 121.542), con fases y altitudes definidas (VERIFICAR). En Colombia hay que consultar los RAC y el manual de operaciones del operador (VERIFICAR).",
          "Qué fases cubre, desde qué altitud, qué conversaciones se permiten y cómo se llama a la cabina de mando desde la de pasajeros: **lo define el operador**.",
          "Lo que sí está en lo cargado es el lado ATC del mismo principio: los controladores deberían evitar transmitir durante el despegue, el ascenso inicial, la última etapa de la aproximación final y el recorrido de aterrizaje, salvo que sea necesario por seguridad, porque la carga de trabajo en cabina es máxima (Doc 9432 4.1.2; 4.5.4). Durante un motor y al aire, las transmisiones deberían ser breves y mínimas (4.8.1). Tampoco deberían dar una autorización de ruta durante maniobras complicadas de rodaje, y jamás durante la alineación o el despegue (2.8.3.2).",
          "El rodaje es una fase de alto riesgo de comunicación: autorizaciones de rodaje, cruces de pista, esperas. Una conversación ajena en ese momento puede hacer perder un HOLD SHORT.",
          "El Doc 9835 1.2.6 recuerda que el lenguaje también participa en la CRM y que fallas de comunicación entre tripulantes figuran como causa concomitante en incidentes y accidentes.",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      verificar(
        "La regla de cabina estéril no está en las fuentes cargadas: en Estados Unidos se consulta el 14 CFR 121.542 (fases y altitud); en Colombia, los RAC y el manual de operaciones del operador. «GOING AROUND» y la fraseología de motor y al aire se confirman en el Doc 9432 cap. 4 y 7 y el Doc 4444 cap. 12.",
      ),
      ...ejemplo(
        "Ejemplo 1 · Rodaje con conversación interna",
        [
          `ATC:   "AVIATORY 452, taxi to holding point runway one three left via Alpha, hold short of runway one three right."`,
          `PILOT: "Taxi holding point runway one three left via Alpha, hold short runway one three right. AVIATORY 452."`,
        ],
        "Significado: la instrucción de mantenerse fuera de una pista se colaciona siempre (Doc 4444 4.5.7.5.1 b). Si en ese momento se hablaba de la escala o del hotel, la parte «hold short» es la que se pierde.",
      ),
      {
        kind: "escenario",
        titulo: "Escenario de práctica: llamada de la cabina de pasajeros en aproximación",
        situacion:
          "ATC: `AVIATORY 452, reduce speed one six zero knots, contact Bogota Tower one one eight decimal one.` El interfono de cabina suena al mismo tiempo.",
        preguntas: [
          {
            q: "¿Qué hace el piloto que comunica y cómo suena?",
            a: "PILOT: `Say again, AVIATORY 452.` ATC: `AVIATORY 452, reduce speed one six zero knots, contact Bogota Tower one one eight decimal one.` PILOT: `Speed one six zero knots, one one eight decimal one. AVIATORY 452.` El piloto que comunica prioriza ATC y pide repetición; el interfono espera. Cómo se atiende la cabina de pasajeros en fase crítica depende del SOP.",
          },
        ],
        concepto: "Si algo interrumpe una autorización, se pide repetición.",
      },
      ...ejemplo(
        "Ejemplo 2 · ATC evita transmitir en la carrera de despegue (modelo verificado)",
        [
          `ATC:   "AVIATORY 452, runway one three left, cleared for takeoff."`,
          `PILOT: "Runway one three left, cleared for takeoff. AVIATORY 452."`,
          `(ATC no vuelve a llamar hasta que el avión está en ascenso estabilizado, salvo emergencia, Doc 9432 4.5.4.)`,
        ],
      ),
      ...ejemplo(
        "Ejemplo 3 · Motor y al aire («going around» y la instrucción de ascenso: VERIFICAR)",
        [
          `PILOT: "Bogota Tower, AVIATORY 452, going around."`,
          `ATC:   "AVIATORY 452, roger. Climb to seven thousand feet, fly runway heading."`,
          `PILOT: "Seven thousand feet, runway heading. AVIATORY 452."`,
        ],
        "Significado: mensajes cortos y mínimos (Doc 9432 4.8.1). La redacción «GOING AROUND» y la instrucción de ascenso están en VERIFICAR (Doc 9432 cap. 7 y Doc 4444 cap. 12). El Doc 9835 5.3.2.2 explica por qué no se usan variantes («on the go», «balked approach»): el resto de la frecuencia no las entiende.",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En las fases críticas",
        texto: "Lo típico en operadores: fases críticas definidas en el manual, llamada de cabina de pasajeros solo por seguridad en esas fases, briefings y conversaciones no operacionales fuera de ellas. El detalle es de cada operador.",
        pasos: ["La cabina estéril también protege la escucha de las llamadas a **otros** aviones, que dan conciencia del tráfico."],
      },
      { kind: "sub", text: "Error frecuente" },
      error(
        "Briefing o anuncios durante una autorización",
        "Hacer el briefing de llegada o anuncios a pasajeros mientras se recibe una autorización.",
      ),
      error("Conversaciones ajenas en rodaje", "Conversaciones ajenas al vuelo durante el rodaje."),
      error("Creer que la regla es igual en todas partes", "Creer que la regla es igual en todos los Estados y operadores."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Sterile cockpit varía por Estado y operador: se aplica lo que diga su manual.",
          "ATC también evita transmitir en las fases críticas.",
          "El rodaje es fase crítica de comunicación.",
          "Si algo interrumpe una autorización, se pide repetición.",
          "Menos conversación en fase crítica = más escucha.",
        ],
      },
      fuentes(
        "Doc 9432 · Doc 9835 · Doc 4444",
        "Doc 9432 (4.ª ed.) 2.8.3.2, 4.1.2, 4.5.4, 4.8.1; Doc 9835 (2.ª ed.) 1.2.6, 5.3.2.2; Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1 b).",
        [
          "VERIFICAR: regla de cabina estéril en EE. UU. contra 14 CFR 121.542 (fases y altitud).",
          "VERIFICAR: regla o política equivalente en Colombia contra RAC y el manual de operaciones del operador.",
          "VERIFICAR: «GOING AROUND» y fraseología de motor y al aire contra Doc 9432 cap. 4 y 7 y Doc 4444 cap. 12.",
        ],
      ),
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
