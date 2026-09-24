/**
 * Nivel 3 · Del defecto al despacho (lecciones 16 a 25, capítulos 16 a 21 y 33 a 36 de la especificación).
 *
 * Hay algo inoperativo: ¿salimos o no, y cómo? Por qué MEL no es «GO», el
 * flujo del defecto al despacho, qué le toca al piloto, el libro técnico, el
 * diferido, los ítems múltiples, la decisión del comandante y cómo
 * encontrar, consultar y confirmar la revisión de la MEL. El proceso
 * concreto depende del operador y está en su manual.
 *
 * OJO: los capítulos de este nivel no son correlativos. La lección es el
 * orden del archivo; el capítulo va en el comentario de cada una (y en
 * MEL_CAPITULOS de index.ts), solo para encontrar su texto.
 *
 * Fuente: docs/mel/nivel-3.md, entero. Cada entrada real de MMEL va como tabla
 * con sus columnas y la cita debajo; cada [ESPACIO PARA IMAGEN] es un hueco
 * rotulado con el código del documento (MEL-NN-MM, donde NN es el CAPÍTULO) y
 * la explicación de sus flechas queda como texto. Lo que el Markdown marca
 * VERIFICAR sale en un callout «Verificar» visible y, completo, en el detalle
 * técnico de FUENTES. El formato de los bloques y de los huecos está
 * documentado al inicio de index.ts.
 */

import type { DocBlockData, DocScreen } from "@/lib/docBlocks"

type Proporcion = "16:9" | "4:3" | "9:16" | "1:1" | "3:4" | "16:10"

/** Alto en pantalla, proporción CSS y ancho máximo de cada formato de hueco. */
const MEDIDAS: Record<Proporcion, { alto: number; ratio: string; anchoMax?: number }> = {
  "16:9": { alto: 280, ratio: "16 / 9" },
  "16:10": { alto: 300, ratio: "16 / 10" },
  "4:3": { alto: 360, ratio: "4 / 3" },
  "1:1": { alto: 420, ratio: "1 / 1", anchoMax: 480 },
  "3:4": { alto: 480, ratio: "3 / 4", anchoMax: 420 },
  "9:16": { alto: 560, ratio: "9 / 16", anchoMax: 360 },
}

/** El hueco de una imagen que todavía no existe, rotulado como la pide el documento. */
function hueco(codigo: string, tipo: string, prop: Proporcion, px: string, descripcion: string): DocBlockData {
  const m = MEDIDAS[prop]
  return {
    kind: "hueco",
    rotulo: `${codigo} · ${tipo} · ${prop} · ${px} px`,
    descripcion,
    alto: m.alto,
    ratio: m.ratio,
    ...(m.anchoMax ? { anchoMax: m.anchoMax } : {}),
  }
}

/** «Lo que dice cada flecha»: la explicación de cada anotación, en orden. */
function flechas(items: string[]): DocBlockData[] {
  return [
    { kind: "p", text: "**Lo que dice cada flecha:**" },
    { kind: "list", ordered: true, items },
  ]
}

/** Una entrada real de MMEL: sus columnas y, debajo, de dónde sale. */
function entrada(rows: string[][], cita: string): DocBlockData[] {
  return [
    {
      kind: "table",
      head: ["Ítem", "Cat.", "Instalados", "Requeridos", "Observaciones o excepciones"],
      rows,
    },
    { kind: "p", text: cita },
  ]
}

function error(text: string): DocBlockData {
  return { kind: "callout", tone: "warn", title: "Error frecuente", text }
}

function verificar(text: string): DocBlockData {
  return { kind: "callout", tone: "verificar", title: "Verificar", text }
}

function enPocasPalabras(items: string[]): DocBlockData {
  return { kind: "summary", title: "En pocas palabras", items }
}

/** FUENTES del capítulo, plegadas: lo verificado y lo que falta verificar. */
function fuentes(cita: string, verificado: string[], porVerificar: string[] = []): DocBlockData {
  const bloques: DocBlockData[] = [
    { kind: "sub", text: "Verificado" },
    { kind: "list", items: verificado },
  ]
  if (porVerificar.length > 0) {
    bloques.push({ kind: "sub", text: "Por verificar" }, { kind: "list", items: porVerificar })
  }
  return { kind: "detalleTecnico", etiqueta: "Fuentes", cita, bloques }
}

/** Una pregunta de la lista de las 22, con su número y dónde se responde. */
function pregunta(n: number, q: string, donde: string, rotulo = "Dónde se responde"): string {
  return `**${n}.** ${q} ${rotulo}: ${donde}.`
}

export const NIVEL_3: DocScreen[] = [
  // ── 16 ──────────────────────────────────────────────────────────────────
  {
    n: 16,
    title: "MEL no significa «GO»",
    kicker: "Que haya alivio no obliga a salir",
    minutes: 8,
    blocks: [
      {
        kind: "p",
        text: "Ya sabes leer una entrada. Este nivel responde la pregunta que importa en la línea: **hay algo inoperativo, ¿salimos o no, y cómo?** Diez capítulos: por qué MEL no es «GO», el flujo del defecto al despacho, qué le toca al piloto, el libro técnico, el diferido, los ítems múltiples, la decisión del comandante y cómo encontrar, consultar y confirmar la revisión de la MEL.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Cómo leer este nivel",
        text: "En todo el nivel: cuando algo es FAA se dice «FAA (fuente)»; cuando es Colombia, «RAC …». El proceso concreto (quién llama a quién, qué formulario, qué pantalla) **depende del operador** y está en su manual.",
      },
      hueco(
        "MEL-16-01",
        "Diagrama",
        "16:9",
        "1600×900",
        "Imagen sugerida: tres filtros en serie, como tres compuertas en un embudo. Arriba entra una tarjeta roja «DEFECTO». Compuerta 1: «¿HAY ALIVIO?» (preguntas 1 a 6). Compuerta 2: «¿SE CUMPLIÓ?» (preguntas 7 a 11). Compuerta 3: «¿SIRVE PARA ESTE VUELO?» (preguntas 12 a 22). De cada compuerta sale una flecha lateral hacia «NO DISPATCH / OTRA ACCIÓN APROBADA». Solo al fondo aparece «DISPATCH», pequeño. Rótulos en mono, mayúsculas. Objetivo: que el piloto vea que encontrar el ítem en la MEL es apenas la primera compuerta. La mayoría de los «no» aparecen en la segunda y en la tercera.",
      ),

      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Que un ítem esté en la MEL solo quiere decir que **puede** haber alivio. El alivio existe cuando se cumplen todas sus condiciones y, además, el avión sigue siendo apto para **este vuelo**, con esta ruta, este tiempo y este aeropuerto.",
      },
      { kind: "p", text: "Dos frases de la FAA que resumen el capítulo:" },
      {
        kind: "quote",
        text: "MEL conditions and limitations do not relieve the operator from determining that the aircraft is in a condition for safe operation with items of equipment inoperative.",
        source:
          "PL-34 Rev 5; igual en 8900.1 Vol 4 Cap 4 Secc 3, 4-687, que agrega: «This applies to all MEL items regardless of whether an (M) procedure applies to the item».",
      },
      {
        kind: "quote",
        text: "If an operator does not list a particular MMEL item in its MEL, that item is not subject to MEL relief and must be operative at takeoff.",
        source: "8900.1, 4-685B1)c)",
      },
      {
        kind: "p",
        text: "En Colombia la misma idea viene por el lado de la decisión: la MEL existe «para que el piloto al mando pueda determinar si puede iniciar el vuelo» (RAC 121.2615(a)). Determinar es analizar, no leer un sí.",
      },

      { kind: "sub", text: "Las 22 preguntas" },
      {
        kind: "secuencia",
        orientacion: "horizontal",
        items: ["¿Hay alivio? (1 a 6)", "¿Se cumplió? (7 a 11)", "¿Sirve para este vuelo? (12 a 22)"],
      },
      { kind: "p", text: "**Compuerta 1: ¿hay alivio?**" },
      {
        kind: "list",
        items: [
          pregunta(1, "¿El ítem está en **nuestra** MEL (no en la MMEL)?", "índice ATA de la MEL del operador"),
          pregunta(
            2,
            "¿La entrada aplica a **nuestra configuración** (modelo, modificación, equipo instalado)?",
            "texto del ítem y sub-ítems",
          ),
          pregunta(3, "¿Cuántos hay instalados?", "Number Installed"),
          pregunta(4, "¿Cuántos se requieren para despachar?", "Number Required for Dispatch"),
          pregunta(5, "¿Qué categoría tiene y cuál es su intervalo?", "Repair Category (y Remarks si es A)"),
          pregunta(6, "¿Qué condiciones pone?", "Remarks or Exceptions, provisos"),
        ],
      },
      { kind: "p", text: "**Compuerta 2: ¿se cumplió?**" },
      {
        kind: "list",
        items: [
          pregunta(7, "¿Pide (M)? ¿Está hecho y firmado?", "libro técnico, liberación de mantenimiento"),
          pregunta(8, "¿Pide (O)? ¿Quién lo hace, cuándo, se repite?", "procedimiento (O) del operador"),
          pregunta(9, "¿Todos los procedimientos están completos, incluido el placard?", "libro técnico, cabina"),
          pregunta(10, "¿El intervalo sigue vigente para todo el vuelo?", "fecha límite del diferido"),
          pregunta(
            11,
            "¿Hay **otras** fallas o diferidos abiertos que se crucen con este?",
            "libro técnico, lista de diferidos (cap. 21)",
          ),
        ],
      },
      { kind: "p", text: "**Compuerta 3: ¿sirve para este vuelo?**" },
      {
        kind: "list",
        items: [
          pregunta(12, "¿Qué restricciones pone a la operación?", "«Except for ETOPS…»", "Ejemplo de dónde muerde"),
          pregunta(
            13,
            "¿Cambia la performance (despegue, aterrizaje, peso)?",
            "«Appropriate performance adjustments are applied»",
            "Ejemplo de dónde muerde",
          ),
          pregunta(14, "¿Afecta la navegación?", "radioayudas, FMS, IRS", "Ejemplo de dónde muerde"),
          pregunta(
            15,
            "¿Afecta las aproximaciones?",
            "«Approach minimums do not require its use»",
            "Ejemplo de dónde muerde",
          ),
          pregunta(
            16,
            "¿Afecta un espacio aéreo especial?",
            "«Enroute or approach procedures do not require its use»",
            "Ejemplo de dónde muerde",
          ),
          pregunta(17, "¿La meteorología prevista cambia el análisis?", "radar, antihielo, frenos", "Ejemplo de dónde muerde"),
          pregunta(18, "¿Hay EDTO/ETOPS en la ruta?", "«Except for ETOPS beyond 120 minutes»", "Ejemplo de dónde muerde"),
          pregunta(19, "¿El vuelo es en espacio RVSM?", "equipos de altitud y autopiloto", "Ejemplo de dónde muerde"),
          pregunta(20, "¿Se va a necesitar CAT II/III?", "autopiloto, autoland", "Ejemplo de dónde muerde"),
          pregunta(21, "¿La ruta o la aproximación es PBN/RNP?", "GNSS, FMS", "Ejemplo de dónde muerde"),
          pregunta(
            22,
            "¿Qué cambia en el despacho: combustible, alternos, plan de vuelo?",
            "penalización de combustible, APU",
            "Ejemplo de dónde muerde",
          ),
        ],
      },
      {
        kind: "p",
        text: "Los ejemplos entre comillas son textos reales de las MMEL FAA A318-A321 Rev 32 y B-737 Rev 63a (se ven completos en este nivel y en el Nivel 4). Las preguntas 19 a 21 dependen de la regulación de cada espacio aéreo y de las aprobaciones del operador: la MEL no siempre las escribe, pero el vuelo las exige igual.",
      },

      { kind: "sub", text: "Cómo se ve en la MEL" },
      hueco(
        "MEL-16-02",
        "Imagen anotada",
        "4:3",
        "1600×1200",
        "Imagen base: recreación fiel del ítem 22-10-01 Autopilot Systems, alivio de categoría B, de la MMEL FAA A318-A321, Rev 32, página 22-1 (Rev 32, 07/30/2025), con el texto de la tabla de abajo. Es una MMEL (del tipo), no la MEL de un operador. Anotaciones: 1) «2 | 0», pregunta 4 respondida, y todavía no dice nada; 2) «(O)», procedimiento operacional (pregunta 8); 3) «Approach minimums do not require their use», preguntas 15 y 20, destino y alterno con el tiempo previsto; 4) «Enroute operations do not require their use», preguntas 16 y 19, la ruta completa; 5) «acceptable to flightcrew», parte de la decisión queda en la tripulación (cap. 33). Objetivo: ver que una entrada «2 instalados, 0 requeridos» todavía abre cinco preguntas que solo se responden mirando el vuelo concreto.",
      ),
      ...entrada(
        [
          [
            "22-10-01 Autopilot Systems",
            "B",
            "2",
            "0",
            "(O) May be inoperative provided: a) Approach minimums do not require their use, b) Enroute operations do not require their use, and c) Number of flight segments and segment duration is acceptable to flightcrew. NOTE: Any Mode which operates normally may be used.",
          ],
        ],
        "MMEL FAA A318-A321, Rev 32, página 22-1 (Rev 32, 07/30/2025). Es una MMEL (del tipo), no la MEL de un operador.",
      ),
      ...flechas([
        "**«2 | 0»**: el número permite salir con los dos autopilotos inoperativos. Es el dato más visible y el que menos decide.",
        "**«(O)»**: el operador tiene un procedimiento de operación para este caso. El piloto lo busca y lo aplica; no lo improvisa.",
        "**«Approach minimums…»**: si el destino o el alterno están en condiciones que exigen una aproximación con autopiloto, la condición no se cumple para ese vuelo, aunque se cumpla para otro.",
        "**«Enroute operations…»**: lo mismo para la ruta. Si alguna parte del vuelo exige el autopiloto, no hay alivio para ese vuelo.",
        "**«acceptable to flightcrew»**: número de tramos y duración. Legalmente se puede; la tripulación decide si es razonable hoy.",
      ]),

      { kind: "sub", text: "Aplicación en la operación" },
      {
        kind: "list",
        items: [
          "La misma entrada puede ser «GO» a las 10:00 y «NO GO» a las 18:00 si cambia el tiempo en destino. La pregunta 15 se responde con el METAR y el TAF, no con la MEL.",
          "La FAA lista las limitaciones que el plan de vuelo debe reflejar cuando hay un ítem MEL: altitud, presurización, temperatura, performance, peso, combustible, navegación, comunicaciones, meteorología (incluido hielo y lluvia), carga, mandos de vuelo, tren y frenos, «Autoflight capabilities», eléctrico, ETOPS, luces, oxígeno, sistemas de información y energía auxiliar (8900.1, 4-691C). Es una buena lista de chequeo mental.",
          "En Colombia el combustible tiene que considerar el «efecto de los reportes diferidos de mantenimiento y/o cualquier desviación respecto de la configuración» (RAC 121.2645(b); Anexo 6, 4.3.6.2 b) 5)).",
        ],
      },
      verificar(
        "Qué equipos exige cada operación específica en Colombia (RVSM, PBN/RNP, CAT II/III, EDTO): consultar RAC 91, RAC 121 y las especificaciones de operación del explotador.",
      ),

      error(
        "«Está en la MEL, entonces salimos.» Encontrar el ítem es la pregunta 1 de 22. El error típico en entrevista es contestar con el número de requeridos y parar ahí.",
      ),
      enPocasPalabras([
        "MEL da alivio **con condiciones**, no permiso general.",
        "Lo que no está en la MEL del operador tiene que funcionar al despegue.",
        "Tres compuertas: ¿hay alivio?, ¿se cumplió?, ¿sirve para este vuelo?",
        "La tercera compuerta depende del vuelo concreto: ruta, tiempo, aeropuerto, aprobaciones.",
        "El análisis no lo reemplaza nadie: ni el (M) firmado ni el número de requeridos.",
      ]),
      fuentes(
        "PL-34 · 8900.1 · RAC 121",
        [
          "FAA MMEL PL-34 Rev 5 (04/23/2024), preámbulo p. 3-4.",
          "FAA Order 8900.1 Vol 4 Cap 4 Secc 3 (CHG 933, 9/18/24), 4-685B1)c), 4-687, 4-691C.",
          "MMEL FAA A318-A321, Rev 32, ítem 22-10-01, página 22-1.",
          "RAC 121 Enm. 10 (2025), 121.2615(a) y 121.2645(b); Anexo 6 Parte I, 4.3.6.2 (citado en la lista EFOD SRVSOP 2025).",
        ],
        [
          "VERIFICAR: qué equipos exige cada operación específica en Colombia (RVSM, PBN/RNP, CAT II/III, EDTO) contra RAC 91, RAC 121 y las especificaciones de operación del explotador.",
        ],
      ),
    ],
  },
  // ── 17 ──────────────────────────────────────────────────────────────────
  {
    n: 17,
    title: "El flujo operacional de la MEL",
    kicker: "Del defecto al despacho, paso a paso",
    minutes: 6,
    blocks: [
      hueco(
        "MEL-17-01",
        "Diagrama",
        "9:16",
        "1080×1920",
        "Imagen sugerida: flujo vertical grande, pensado para el celular. Cajas en inglés (así se ven en la línea) con subtítulo corto en español: DEFECT DETECTED → TECH LOG ENTRY → IDENTIFY SYSTEM → FIND MEL ITEM → rombo «RELIEF?». Rama NO (a la izquierda, en rojo semántico): «NOT DISPATCHABLE UNTIL CORRECTED» con una caja menor «OTHER APPROVED ACTION (repair, CDL, NEF, special flight permit)». Rama YES (hacia abajo): CATEGORY / INTERVAL → INSTALLED / REQUIRED → PROVISOS → (M) MAINTENANCE ACTION → (O) OPERATIONAL PROCEDURE → PLACARD → OPERATIONAL IMPACT → CREW BRIEFING → DISPATCH. Entre PROVISOS y (M), un segundo rombo pequeño «ALL MET?» que también devuelve a la rama NO. Una franja lateral marca «hasta el despegue». Objetivo: que el piloto tenga en la cabeza el orden completo y vea que hay dos salidas hacia el «no», no una.",
      ),

      { kind: "sub", text: "El flujo, paso a paso" },
      {
        kind: "secuencia",
        numerada: true,
        items: [
          "DEFECT DETECTED",
          "TECH LOG ENTRY: se anota; ese registro fija el día del descubrimiento",
          "IDENTIFY SYSTEM: qué sistema, qué función se perdió",
          "FIND MEL ITEM: capítulo ATA → ítem → sub-ítem de nuestra configuración",
          "RELIEF? Si NO: NOT DISPATCHABLE UNTIL CORRECTED (o reparar, u otra vía aprobada). Si YES, sigue",
          "CATEGORY / INTERVAL: ¿cuánto tiempo hay?",
          "INSTALLED / REQUIRED: ¿cuántos quedan y cuántos pide?",
          "PROVISOS: ¿se cumplen todos? Si NO: NOT DISPATCHABLE",
          "(M): mantenimiento desactiva, asegura, inspecciona, firma",
          "(O): la tripulación (u otro autorizado) aplica el procedimiento",
          "PLACARD: rótulo en el control o indicador",
          "OPERATIONAL IMPACT: performance, combustible, ruta, aproximaciones, alternos",
          "CREW BRIEFING: todos saben qué falta y qué cambia",
          "DISPATCH: con el diferido en el despacho y el plan ajustado",
        ],
      },
      {
        kind: "table",
        head: ["Paso", "Qué pasa", "De dónde sale"],
        rows: [
          ["Tech log entry", "«it is reported by making an entry in the aircraft maintenance record/logbook»", "PL-34"],
          ["Relief? NO", "Lo que no está en la MEL tiene que funcionar al despegue", "8900.1, 4-685B1)c)"],
          ["Otra vía aprobada", "«repaired or may be deferred per the MEL or other approved means»", "PL-34"],
          [
            "Permiso especial de vuelo",
            "Vía distinta a la MEL, con su propio trámite",
            "14 CFR 121.628(c); RAC 121.2615(d)(4)",
          ],
          ["(M)", "«must be accomplished prior to operation with the listed item inoperative»", "PL-25 Rev 24"],
          [
            "(O)",
            "«must be accomplished in planning for or operating with the listed item inoperative»",
            "PL-25 Rev 24",
          ],
          ["Placard", "«to inform and remind the crewmembers and maintenance personnel»", "PL-25 Rev 24"],
          [
            "Documentación",
            "«Such documentation is required prior to operation with any item of equipment inoperative»",
            "PL-34",
          ],
          [
            "Despacho",
            "La información MEL va al piloto al mando y al despachador antes de salir de la plataforma; debería ir en el despacho",
            "8900.1, 4-691B y C",
          ],
          [
            "Briefing",
            "Lo que afecta la cabina se comunica a la tripulación de cabina, por ejemplo en el briefing",
            "8900.1, 4-691B",
          ],
        ],
      },

      { kind: "sub", text: "Cuándo aplica el flujo: hasta el despegue" },
      {
        kind: "list",
        items: [
          "FAA: «MEL relief may be applied to an MEL item newly identified as inoperative up until the point an aircraft has taken off» (8900.1, 4-690A). Para efectos de MEL, el despegue es el punto en que el piloto empieza a aplicar potencia para despegar (PL-25, Takeoff).",
          "Después del despegue **no hay MEL**: la tripulación maneja la falla con el AFM, los procedimientos y las listas aprobadas; la falla se resuelve antes de la siguiente salida (8900.1, 4-690C).",
          "Si la falla aparece **después de salir de la plataforma y antes del despegue** (pushback, rodaje), el piloto al mando se comunica con despacho y mantenimiento, y se decide entre: volver a reparar; volver a cumplir (M) y (O); o, solo si la autoridad lo aprobó al operador, que la tripulación haga ciertos procedimientos sin volver (8900.1, 4-691E; AC 120-125, 6.3.2). «If the MEL procedures for a specific item require a mechanic's inspection, takeoff would be prohibited until the required inspection is completed» (AC 120-125, 6.1.3).",
          "En el SRVSOP la misma idea: la MEL se aplica «hasta antes del despegue» y «no aplica para los ítems que fallan después del despegue» (MIA SRVSOP Enm. 13, PIV-VI-C7, 3.19.3.1 y 3.19.3.3).",
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "Ojo con un documento viejo",
        text: "El MIO del SRVSOP (Parte II, Vol II, Cap 16, primera edición de 2013) dice que el vuelo se considera iniciado «cuando la aeronave se mueve por sus propios medios» y describe otro manejo para esa ventana. Es de 2013 y no coincide con la FAA vigente. Lo que aplica en tu operación está en el manual del operador.",
      },
      verificar(
        "Hasta qué momento aplica la MEL y qué puede hacer la tripulación en rodaje sin volver a plataforma: consultar el manual de operaciones del explotador y su programa de MEL aprobado por la Aerocivil.",
      ),

      error(
        "Saltarse pasos porque «mantenimiento ya lo difirió». El (O), el impacto operacional y el briefing son de la tripulación y del despacho; el (M) firmado no los cubre.",
      ),
      enPocasPalabras([
        "El flujo empieza en el **registro**: sin entrada en el libro técnico no hay diferido.",
        "Hay dos salidas al «no»: sin alivio, o con alivio pero con una condición que no se cumple.",
        "(M), (O) y placard van **antes** de operar.",
        "La MEL se usa hasta el despegue; en vuelo mandan el AFM y las listas.",
        "Falla en rodaje: se habla con despacho y mantenimiento; lo que se puede hacer sin volver lo define el operador con aprobación.",
      ]),
      fuentes(
        "PL-25 · PL-34 · 8900.1 · AC 120-125",
        [
          "FAA MMEL PL-34 Rev 5, preámbulo p. 4.",
          "FAA MMEL PL-25 Rev 24 (04/13/2026): (M), (O), Placarding, Takeoff.",
          "FAA Order 8900.1 Vol 4 Cap 4 Secc 3 (CHG 933), 4-685B1)c), 4-690A y C, 4-691B, C y E.",
          "AC 120-125 (11/1/23), 6.1.3 y 6.3.2.",
          "14 CFR 121.628(c); RAC 121 Enm. 10, 121.2615(d)(4).",
          "SRVSOP MIA Enm. 13 (2025), PIV-VI-C7, 3.19.3.1 y 3.19.3.3; SRVSOP MIO Parte II Vol II Cap 16 (2013), Sección 5, punto 4.",
        ],
        [
          "VERIFICAR: hasta qué momento aplica la MEL y qué puede hacer la tripulación en rodaje sin volver a plataforma, contra el manual de operaciones del explotador y su programa de MEL aprobado por la Aerocivil.",
        ],
      ),
    ],
  },
  // ── 18 ──────────────────────────────────────────────────────────────────
  {
    n: 18,
    title: "La responsabilidad del piloto",
    kicker: "Qué revisa y qué firma la tripulación",
    minutes: 7,
    blocks: [
      hueco(
        "MEL-18-01",
        "Diagrama",
        "1:1",
        "1200×1200",
        "Imagen sugerida: cuatro bloques alrededor de un avión visto desde arriba: «OPERADOR» (MEL aprobada, programa de reparación, control operacional), «MANTENIMIENTO» ((M), liberación, placard), «DESPACHO / CONTROL OPERACIONAL» (plan de vuelo, combustible, despacho con el diferido) y, más grande, «PILOTO AL MANDO» (entiende, verifica, decide). Flechas de información de los tres primeros hacia el piloto. Sin nombres de aerolíneas. Objetivo: que el piloto vea que la MEL la construye el operador y la ejecutan varios, pero la decisión de iniciar el vuelo pasa por él con la información de todos.",
      ),

      { kind: "sub", text: "¿Qué es?" },
      { kind: "p", text: "Antes de aceptar un avión con un ítem abierto, el piloto necesita tener claro:" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Qué está inoperativo.",
          "Qué función se perdió.",
          "Qué otros sistemas quedan afectados.",
          "Qué restricciones impone.",
          "Qué procedimientos pide ((M) hecho, (O) por hacer).",
          "Qué impacto tiene en el vuelo.",
          "Qué acción hay que hacer antes del vuelo.",
          "Qué cambia en la planificación.",
          "Qué ítems relacionados hay (otros diferidos, avisos que también se pierden).",
        ],
      },

      { kind: "sub", text: "Lo que debe saber un piloto" },
      { kind: "p", text: "La responsabilidad no se reparte igual en todas las normas. Lo que dicen las fuentes:" },
      {
        kind: "table",
        head: ["", "FAA", "Colombia (RAC) y OACI"],
        rows: [
          [
            "Norma de la MEL",
            "14 CFR 121.628: «No person may take off…». No nombra al piloto al mando: dice que la tripulación tendrá acceso directo a la MEL y que los registros de lo inoperativo estarán «available to the pilot».",
            "RAC 121.2615(a): la MEL está en el manual de operaciones «para que el piloto al mando pueda determinar si puede iniciar el vuelo o continuarlo a partir de cualquier parada intermedia». Igual el Anexo 6, 6.1.3 («enable the pilot-in-command to determine…»).",
          ],
          [
            "Aptitud del avión",
            "14 CFR 91.7(b): el piloto al mando «is responsible for determining whether that aircraft is in condition for safe flight».",
            "RAC 121.2550(a): no se inicia el vuelo sin los formularios que certifican que el piloto al mando comprobó la aeronavegabilidad y el visto bueno de mantenimiento. RAC 91.545(a), en la misma línea.",
          ],
          [
            "Irregularidades en el libro",
            "14 CFR 121.563: anotar al final del vuelo; antes de cada vuelo, «ascertain the status of each irregularity».",
            "RAC 121.2317: el mismo texto en español («se asegurará de la condición de cada irregularidad ingresada al final del vuelo anterior»).",
          ],
          [
            "Despacho",
            "14 CFR 121.533(b) (doméstico): piloto al mando y despachador «jointly responsible» del despacho. 8900.1, 4-691A: operador, piloto al mando y despachador responden por despachar el avión aeronavegable.",
            "RAC 91, Apéndice 2 (j): las responsabilidades del piloto al mando al aceptar un avión con deficiencias según la MEL están en la 91.545.",
          ],
          [
            "Operador",
            "PL-34: «Operators are responsible for exercising the necessary operational control to ensure that an ALoS is maintained.»",
            "RAC 91, Apéndice 2 (f): el explotador se asegura de que no se inicie un vuelo con varios ítems MEL sin analizar su interrelación.",
          ],
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "La diferencia que hay que saber decir en una entrevista",
        text: "En el RAC y en la OACI la MEL está escrita, explícitamente, **al servicio de la decisión del piloto al mando**. En la FAA, la regla de la MEL (121.628) habla de condiciones para despegar y de acceso de la tripulación; la responsabilidad del piloto al mando viene de otras reglas (91.7, 121.563, 121.533). En ninguno de los dos sistemas el piloto está solo: el operador responde por el control operacional.",
      },

      { kind: "sub", text: "Cómo se ve en la MEL" },
      hueco(
        "MEL-18-02",
        "Imagen anotada",
        "4:3",
        "1600×1200",
        "Imagen base: recreación fiel del ítem 34-43-01 Traffic Alert and Collision Avoidance System (TCAS II), alivio de categoría B, de la MMEL FAA A318-A321, Rev 32, página 34-21, con el texto de la tabla de abajo. Es una MMEL (del tipo), no la MEL de un operador. Anotaciones: 1) «(M)», mantenimiento hace algo antes del vuelo, no es tarea del piloto; 2) «deactivated and secured», el piloto confirma que está hecho y firmado en el libro técnico; 3) «Enroute or approach procedures do not require its use», esto sí es del piloto y del despacho; 4) «NOTE 1: … GPWS Modes 1-5 and GPWS Terrain System are also inoperative», con esa modificación diferir el TCAS se lleva también la protección de terreno; 5) «NOTE 2: … ADS-B In function (ATSAW) is considered inoperative», otra función que se pierde sin que nadie la haya reportado como falla. Objetivo: separar lo que hace mantenimiento de lo que tiene que entender el piloto, y ver que un solo diferido puede quitar funciones de otros sistemas.",
      ),
      ...entrada(
        [
          [
            "34-43-01 Traffic Alert and Collision Avoidance System (TCAS II)",
            "B",
            "1",
            "0",
            "(M) May be inoperative provided: a) System is deactivated and secured, and b) Enroute or approach procedures do not require its use. NOTE 1: For aircraft equipped with Mod. 34637/MP P8454 (T2CAS), GPWS Modes 1-5 and GPWS Terrain System are also inoperative. NOTE 2: For aircraft equipped with Mod. 150896/MP P11422, ADS-B In function (ATSAW) is considered inoperative.",
          ],
        ],
        "MMEL FAA A318-A321, Rev 32, página 34-21. Es una MMEL (del tipo), no la MEL de un operador.",
      ),
      ...flechas([
        "**(M)**: el procedimiento es de mantenimiento. El piloto no desactiva nada.",
        "**«deactivated and secured»**: el piloto no lo ejecuta, pero verifica que el libro técnico lo muestre hecho.",
        "**«Enroute or approach procedures…»**: es una condición operacional. Mantenimiento no sabe por dónde vuela el avión mañana; el piloto y el despacho sí.",
        "**NOTE 1**: en aviones con esa modificación el piloto sale **sin TCAS y sin GPWS modos 1-5 ni terreno**. Es la pregunta 3 de la lista: qué otros sistemas quedan afectados. Si el piloto no lee la nota, sale creyendo que solo le falta el TCAS.",
        "**NOTE 2**: «considered inoperative» significa que se trata como inoperativo para todo efecto aunque funcione (PL-25, Considered Inoperative).",
      ]),
      {
        kind: "p",
        text: "Una nota no es un proviso (PL-25, System Page, NOTE), pero sí es información que cambia lo que el piloto sabe de su avión.",
      },

      { kind: "sub", text: "Aplicación en la operación" },
      {
        kind: "list",
        items: [
          "El operador tiene que hacer llegar la información MEL al piloto al mando y al despachador antes de salir de la plataforma (8900.1, 4-691B). Si no llegó, se pide.",
          "El piloto lee el libro técnico antes de cada vuelo (121.563; RAC 121.2317): qué está abierto, qué está diferido, qué vence.",
          "Si un ítem MEL impone limitaciones de performance, altitud, peso o combustible, el plan de vuelo se recalcula y el despacho se emite de nuevo o se enmienda (8900.1, 4-691E3)e)).",
          "Qué firma el piloto, en qué formulario y con qué palabras depende del manual del operador.",
        ],
      },
      verificar(
        "Qué firma el piloto al mando al aceptar un avión con diferidos (formulario de preparación del vuelo, libro técnico, despacho): consultar el manual de operaciones del explotador.",
      ),

      error(
        "«Mantenimiento firmó, entonces el avión está listo.» La firma cubre el (M) y la liberación. El impacto operacional, el (O) y la decisión de iniciar el vuelo no los firma mantenimiento.",
      ),
      enPocasPalabras([
        "El piloto no ejecuta el (M); verifica que esté hecho y entiende qué cambió.",
        "Las notas de una entrada pueden quitar funciones de otros sistemas.",
        "RAC y OACI: la MEL existe para la decisión del piloto al mando.",
        "FAA: la 121.628 no nombra al PIC; su responsabilidad sale de 91.7, 121.563 y 121.533.",
        "En los dos sistemas el operador ejerce el control operacional.",
      ]),
      fuentes(
        "14 CFR 121.628 · RAC 121.2615",
        [
          "14 CFR 121.628, 91.7(b), 121.563, 121.533(b) (eCFR, vigente al 2026-09-23).",
          "FAA MMEL PL-34 Rev 5; PL-25 Rev 24 (Considered Inoperative; System Page, NOTE).",
          "FAA Order 8900.1 Vol 4 Cap 4 Secc 3 (CHG 933), 4-691A, B y E.",
          "RAC 121 Enm. 10, 121.2317, 121.2550(a), 121.2615(a); RAC 91 Enm. 12, 91.545(a) y Apéndice 2 (f) y (j); Anexo 6 Parte I, 6.1.3 (citado en la lista EFOD SRVSOP 2025).",
          "MMEL FAA A318-A321, Rev 32, ítem 34-43-01, página 34-21.",
        ],
        [
          "VERIFICAR: qué firma el piloto al mando al aceptar un avión con diferidos (formulario de preparación del vuelo, libro técnico, despacho) contra el manual de operaciones del explotador.",
        ],
      ),
    ],
  },
  // ── 19 ──────────────────────────────────────────────────────────────────
  {
    n: 19,
    title: "Tech log y aircraft logbook",
    kicker: "Donde queda escrito el defecto",
    minutes: 7,
    blocks: [
      hueco(
        "MEL-19-01",
        "Imagen anotada",
        "3:4",
        "1200×1600",
        "Imagen base: página ficticia de un registro técnico de vuelo, genérica, sin logo ni nombre de operador, con el encabezado «REGISTRO TÉCNICO DE VUELO · Aeronave de ejemplo · Página 0417» y una sola entrada escrita a mano en tinta azul (el texto está abajo). Firma y licencia del técnico (liberación) y casilla «Recibido por la tripulación» con firma. Anotaciones: 1) fecha y hora, el día del descubrimiento; 2) el defecto, descrito por quien lo vio; 3) la acción de mantenimiento, incluido el rótulo; 4) la referencia MEL que ampara el diferido; 5) «DIF-0093», el número con el que el operador lo sigue hasta cerrarlo; 6) «24 MAR 2026 · 2359», la fecha límite de rectificación; 7) firmas de mantenimiento y de la tripulación, liberación y constancia de recepción cuando el operador lo pide. Objetivo pedagógico: que el piloto sepa leer una entrada de libro técnico en diez segundos y encuentre lo que le importa: qué falla, bajo qué ítem MEL, hasta cuándo y si está firmado.",
      ),
      {
        kind: "code",
        text: [
          "REGISTRO TÉCNICO DE VUELO · Aeronave de ejemplo · Página 0417",
          "",
          "Fecha/hora:          14 MAR 2026 · 21:40 UTC · Vuelo: EJ 000",
          "Defecto (tripulación): Luz de lectura del puesto izquierdo no enciende.",
          "                     Resto de iluminación de cabina normal.",
          "Acción (mantenimiento): Verificado. Sin repuesto en estación.",
          "                     Diferido según MEL. Placard INOP instalado.",
          "Referencia MEL:      33-12-01 · Cat. C · Inst. 2 · Req. 1",
          "Control de diferido: DIF-0093",
          "Fecha límite de reparación: 24 MAR 2026 · 2359",
          "Firma y licencia del técnico (liberación)",
          "Recibido por la tripulación: firma",
        ].join("\n"),
      },
      {
        kind: "p",
        text: "Escenario de práctica: la página es ficticia, sobre la «Aeronave de ejemplo»; no es el registro de un operador real.",
      },
      ...flechas([
        "**Fecha y hora del registro.** En el sistema FAA el día en que la falla se anota en el libro es el «day of discovery» y no cuenta en el intervalo (PL-25). Por eso la fecha de la entrada no es un trámite.",
        "**Defecto.** Lo que la tripulación observó. Queda escrito para que mantenimiento lo trabaje y para que la siguiente tripulación lo entienda.",
        "**Acción de mantenimiento.** Reparó o difirió. Si difirió, aquí o en el formato del operador queda el (M) cumplido y el placard.",
        "**Referencia MEL.** Ítem, categoría, instalados y requeridos. El piloto la contrasta con la MEL a bordo: que el ítem exista, que aplique a este avión y que las condiciones sigan cumpliéndose.",
        "**Número de control.** Permite seguir el diferido en el programa del operador (cap. 20).",
        "**Fecha límite.** En la entrada ficticia, categoría C con el esquema FAA: registrado el 14, el intervalo empieza a las 0000 del 15 y termina a las 2359 del 24 (PL-25, Repair Category C: 10 días calendario consecutivos, excluido el día del descubrimiento). En Colombia el intervalo es el que fije la MEL aprobada del operador.",
        "**Firmas.** Mantenimiento firma la liberación. La firma de la tripulación, y en qué casos va, depende del operador.",
      ]),

      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "El documento donde se anota cada falla y lo que se hizo con ella. Tiene muchos nombres: tech log, aircraft logbook, bitácora de mantenimiento, libro técnico, registro técnico de vuelo. Puede ser de papel o electrónico. El formato **depende del operador**.",
      },
      {
        kind: "norma",
        rac: "RAC 121.001",
        titulo: "Registro técnico de vuelo de la aeronave",
        texto:
          "Documento para registrar todas las dificultades, fallas o malfuncionamientos detectados en la aeronave durante su operación, así como la certificación de conformidad de mantenimiento correspondiente a las acciones correctivas efectuadas por el personal de mantenimiento sobre estas. Este documento puede ser parte del libro de a bordo (Bitácora o libro de vuelo) o en un documento independiente.",
      },
      {
        kind: "list",
        items: [
          "RAC 121.2850: el explotador debe usarlo para registrar todas las fallas y registrar allí los certificados de conformidad de mantenimiento.",
          "FAA (PL-34): el ítem inoperativo se reporta «by making an entry in the aircraft maintenance record/logbook», y luego se repara o se difiere antes de seguir operando.",
        ],
      },

      { kind: "sub", text: "Lo que debe saber un piloto" },
      { kind: "p", text: "Qué queda registrado:" },
      {
        kind: "table",
        head: ["Dato", "Por qué le importa al piloto"],
        rows: [
          ["Defecto", "Sabe qué falla y desde cuándo"],
          ["Acción de mantenimiento", "Sabe si se reparó o se difirió"],
          ["Referencia MEL", "Puede ir a la entrada y leer las condiciones"],
          ["Ítem diferido", "Sabe que hay un alivio en curso, con su número"],
          ["Fecha de rectificación", "Sabe si el diferido sigue vigente para su vuelo"],
          ["Aceptación de la tripulación", "Cuando el operador la pide, deja constancia de que lo supo"],
        ],
      },
      { kind: "p", text: "Además:" },
      {
        kind: "list",
        items: [
          "El RAC 91, Apéndice 2 (h) pide que lo aceptado como inoperativo se anote «en el libro técnico de a bordo de la aeronave, a fin de informar a la tripulación de vuelo y al personal de mantenimiento».",
          "Lo inoperativo y la información de la MEL tienen que estar disponibles para el piloto (14 CFR 121.628(a)(4); RAC 121.2615(c)).",
          "Cuando hay liberación de aeronavegabilidad, en la FAA se entrega copia al piloto al mando (14 CFR 121.709(d)).",
          "El MIO del SRVSOP (2013) indica que el cumplimiento de un (O) se deja registrado por quien lo hace, con una anotación en la bitácora (Cap 16, 4.1.36 e)).",
        ],
      },

      { kind: "sub", text: "Aplicación en la operación" },
      {
        kind: "list",
        items: [
          "**Al llegar al avión**: leer las últimas páginas del libro técnico y la lista de diferidos. Antes de cada vuelo el piloto al mando se asegura de la condición de cada irregularidad anotada al final del vuelo anterior (14 CFR 121.563; RAC 121.2317).",
          "**Al terminar el vuelo**: las irregularidades mecánicas del vuelo se anotan al final de ese vuelo (mismas reglas).",
          "**Si algo no cuadra** (referencia MEL que no aplica a la matrícula, fecha vencida, (M) sin firma): no se sale hasta aclararlo con mantenimiento y despacho.",
        ],
      },
      verificar(
        "Formato del registro técnico, quién firma el cumplimiento de un (O) y si la tripulación firma la recepción de diferidos: consultar el manual de operaciones y el manual de control de mantenimiento del explotador.",
      ),

      error(
        "Pensar que un diferido ya firmado no hay que revisarlo. La regla pide verificar el estado de cada irregularidad **antes de cada vuelo**, no solo de las nuevas.",
      ),
      enPocasPalabras([
        "Sin entrada en el libro técnico no hay diferido.",
        "La fecha del registro define el día del descubrimiento.",
        "El piloto lee el libro antes de cada vuelo y anota al final de cada vuelo.",
        "Referencia MEL, número de diferido y fecha límite son lo primero que se busca.",
        "El formato y las firmas dependen del operador.",
      ]),
      fuentes(
        "RAC 121.001 · 14 CFR 121.563",
        [
          "RAC 121 Enm. 10, 121.001 (definición de registro técnico de vuelo), 121.2317, 121.2615(c), 121.2850.",
          "RAC 91 Enm. 12, Apéndice 2 (h).",
          "14 CFR 121.563, 121.628(a)(4), 121.709(d).",
          "FAA MMEL PL-34 Rev 5, p. 4; PL-25 Rev 24, Day of Discovery y Repair Category C.",
          "SRVSOP MIO Parte II Vol II Cap 16 (2013), 4.1.36 e).",
        ],
        [
          "VERIFICAR: formato del registro técnico, quién firma el cumplimiento de un (O) y si la tripulación firma la recepción de diferidos, contra el manual de operaciones y el manual de control de mantenimiento del explotador.",
        ],
      ),
    ],
  },
  // ── 20 ──────────────────────────────────────────────────────────────────
  {
    n: 20,
    title: "Deferred defect y DMI",
    kicker: "El defecto diferido y su control",
    minutes: 7,
    blocks: [
      hueco(
        "MEL-20-01",
        "Esquema",
        "16:9",
        "1600×900",
        "Imagen sugerida: línea de tiempo horizontal de la vida de un diferido, con seis hitos: ① REGISTRO (libro técnico) → ② DIFERIDO (ítem MEL, (M), placard) → ③ VUELOS CON CONDICIONES ((O) en cada vuelo, cuando lo pida) → ④ SEGUIMIENTO (número de control, repuesto, fecha) → ⑤ RECTIFICACIÓN (reparación y firma) → ⑥ CIERRE (placard retirado, diferido cerrado). Una barra de color debajo marca el intervalo de reparación y termina en una línea vertical «LÍMITE». Detrás de la línea, en gris, «NO DISPATCH». Objetivo: que el piloto vea que un diferido tiene principio, seguimiento y fin, y que mientras está abierto sus condiciones siguen vigentes en cada vuelo.",
      ),

      { kind: "sub", text: "¿Qué es?" },
      { kind: "p", text: "Diferir es **aplazar la reparación** bajo la autoridad de la MEL, con condiciones. La FAA lo define:" },
      {
        kind: "quote",
        text: "A deferral is the term used to describe the authorization for an operator to delay repair and continue operating with a required item inoperative, under the authority of its FAA-approved MEL. Authority to defer repair of an inoperative item is subject to specific conditions and limitations, as described in the associated proviso.",
        source: "AC 120-125, 1.7.10",
      },
      {
        kind: "p",
        text: "Sobre el nombre: las fuentes usan «deferred maintenance items» (AC 120-125, 8.5; Anexo 6, 4.3.6.2) y el RAC habla de «reportes diferidos de mantenimiento» (121.2645(b)). La sigla **DMI** no aparece en las fuentes normativas de este módulo. Cómo lo llama y lo numera cada operador depende de su manual.",
      },
      { kind: "p", text: "**Deferred no es ignored.** Un diferido tiene seis partes:" },
      {
        kind: "table",
        head: ["Parte", "Qué significa"],
        rows: [
          ["Identificación", "Ítem MEL, número de control, matrícula"],
          ["Seguimiento", "Alguien lo revisa: por qué no se ha reparado, cuándo se va a reparar"],
          ["Límite temporal", "La categoría fija hasta cuándo"],
          ["Condiciones", "Los provisos siguen vigentes en **cada** vuelo"],
          ["Procedimientos", "(M) una vez al diferir; (O) cuando la entrada lo pida, a veces en cada vuelo"],
          ["Rectificación", "Reparación, firma y cierre"],
        ],
      },

      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "**No es indefinido.** «Con el MEL no se tiene la intención de permitir la operación de la aeronave con sistemas o equipo inoperativos durante un período indefinido» (RAC 91, Apéndice 2 (e)). La FAA: «It is important that repairs be accomplished at the earliest opportunity» (PL-34).",
          "**El operador lo sigue.** En la FAA el programa de MEL tiene que registrar fecha y, cuando aplique, hora del diferimiento y de la reparación, con revisión de supervisión del número de diferidos por avión, la razón de cada demora y la fecha estimada de reparación; más un plan para juntar repuesto, personal y avión, y una revisión de los repuestos pedidos (8900.1, 4-688B).",
          "**«Considered inoperative» dura hasta la reparación.** Lo que la MEL da por inoperativo no se usa hasta que se repare el ítem original (PL-25, Considered Inoperative).",
          "**Algunos (M) y (O) se repiten.** Ejemplo real, abajo: la condición c) sigue viva mientras el diferido esté abierto. Y cuando la MMEL dice «verified operative» con un intervalo (por ejemplo, antes de cada vuelo), hay que comprobarlo en ese intervalo (PL-25, Verified Operative).",
        ],
      },
      {
        kind: "quote",
        text: "(M)(O) Except for ETOPS, may be removed provided: a) Procedures do not require its use, b) APU system is deactivated, c) APU compartment is inspected after first flight and then every 100 flight hours, and d) Removed APU is accounted for in the airplane weight and balance.",
        source: "MMEL FAA B-737 Rev 63a, capítulo 49, ítem 01-01B (APU, página 49-1). Es una MMEL (del tipo), no la MEL de un operador.",
      },

      { kind: "sub", text: "Cómo se ve en la MEL: el plazo y su única extensión (FAA)" },
      hueco(
        "MEL-20-02",
        "Esquema",
        "16:9",
        "1600×900",
        "Imagen sugerida: cuatro barras horizontales, una por categoría, rotuladas «FAA (PL-25 / 8900.1 4-689)». B: bloque de 3 días + bloque punteado de 3 días «Continuing Authorization-Single Extension». C: bloque de 10 días + bloque punteado de 10 días. A y D: bloque sólido con un candado y «el operador no la extiende». Nota al pie: «Aviso a la autoridad dentro de 24 h». Objetivo: que el piloto sepa que el límite de un diferido no se estira a voluntad: en el sistema FAA hay una sola extensión posible, solo para B y C, y con aviso.",
      ),
      { kind: "p", text: "En el sistema FAA:" },
      {
        kind: "table",
        head: ["", "Qué dice", "Fuente"],
        rows: [
          [
            "Quién puede",
            "El operador con OpSpec D095 puede aprobar **una** extensión única del intervalo",
            "8900.1, 4-689; PL-25",
          ],
          [
            "Qué categorías",
            "Solo **B y C**. «[…] is not authorized for Repair Category A and D items» (definición «Continuing Authorization, Single Extension»)",
            "PL-25; 8900.1, 4-689",
          ],
          ["Cuánto", "Hasta otro intervalo igual: B, 3 días más; C, 10 días más", "8900.1, 4-689B"],
          ["Aviso", "A la oficina de la FAA dentro de 24 horas", "8900.1, 4-689C"],
          [
            "Categoría A",
            "El operador no la extiende; solo en situaciones «extremely rare» se pide a la FAA. Los ítems limitados por horas de motor o ciclos «may never be extended»",
            "8900.1, 4-689F",
          ],
          ["Categoría D", "El operador no la extiende; puede pedirlo a la FAA", "8900.1, 4-689G"],
          ["Abuso", "La FAA puede quitar el privilegio si se usa para tapar fallas del programa", "8900.1, 4-689H"],
        ],
      },
      {
        kind: "p",
        text: "Ejemplo con la cifra de PL-25: ítem C registrado el 26 de enero a las 10:00. El intervalo termina a las 2359 del 5 de febrero. Si el operador aplica su extensión única, esta empieza al final del diferido original y dura como máximo otros 10 días calendario consecutivos: hasta las 2359 del 15 de febrero, y no más.",
      },
      {
        kind: "p",
        text: "En el SRVSOP el esquema es el mismo: autorización para una sola extensión en B y C, no en A ni en D, y aviso «al IPO y al IPM dentro de las 24 horas» (MIA SRVSOP Enm. 13, PIV-VI-C7). El RAC 121 no fija categorías ni extensiones: aplica lo que diga la MEL aprobada del operador.",
      },

      { kind: "sub", text: "Aplicación en la operación" },
      {
        kind: "list",
        items: [
          "Antes de cada vuelo: ¿el diferido vence durante mi rotación? Si vence a las 2359 y el último tramo aterriza a las 0030, el problema es del plan, no del reloj.",
          "Si el diferido fue extendido, el libro técnico o el sistema del operador tiene que mostrarlo. Si no aparece, el diferido vence en su fecha original.",
          "Cada vuelo con el diferido abierto repite las condiciones: (O) repetitivo, placard en su sitio, restricciones en el plan.",
        ],
      },
      verificar(
        "Si el operador colombiano tiene autorización para la extensión única, sus límites y a quién avisa: consultar el manual de MEL (programa de administración de la MEL) del operador aprobado por la Aerocivil. El MIA propio de la Aerocivil no se encontró en su sitio público.",
      ),

      error(
        "«Está diferido, entonces ya no es problema.» El diferido es un problema **controlado**: con plazo, condiciones y alguien que lo sigue. Si una de esas tres cosas falta, ya no está controlado.",
      ),
      enPocasPalabras([
        "Diferir es aplazar la reparación con condiciones, no olvidarla.",
        "Las condiciones valen en cada vuelo hasta el cierre.",
        "Algunos (M) y (O) se repiten (por vuelo, por horas).",
        "FAA: una sola extensión, solo B y C, con aviso en 24 h; A y D no las extiende el operador.",
        "En Colombia, plazos y extensiones según la MEL y el programa aprobados del operador.",
      ]),
      fuentes(
        "AC 120-125 · 8900.1 4-689",
        [
          "AC 120-125 (11/1/23), 1.7.10 y 8.5.",
          "FAA Order 8900.1 Vol 4 Cap 4 Secc 3 (CHG 933), 4-688B y 4-689 (A a H).",
          "FAA MMEL PL-25 Rev 24: Continuing Authorization, Considered Inoperative, Repair Category C, Verified Operative. PL-34 Rev 5, p. 4.",
          "MMEL FAA B-737 Rev 63a, capítulo 49, ítem 01-01B, página 49-1.",
          "RAC 91 Enm. 12, Apéndice 2 (e); RAC 121 Enm. 10, 121.2645(b); Anexo 6 Parte I, 4.3.6.2 (lista EFOD SRVSOP 2025).",
          "SRVSOP MIA Enm. 13, PIV-VI-C7, nota de C7-1/C7-2 y 3.19.2.",
        ],
        [
          "VERIFICAR: si el operador colombiano tiene autorización para la extensión única, sus límites y a quién avisa, contra el manual de MEL / programa de administración de la MEL del operador aprobado por la Aerocivil (el MIA propio de la Aerocivil no se encontró en su sitio público).",
        ],
      ),
    ],
  },
  // ── 21 ──────────────────────────────────────────────────────────────────
  {
    n: 21,
    title: "Varios ítems de MEL a la vez",
    kicker: "Cuando se suman las restricciones",
    minutes: 7,
    blocks: [
      hueco(
        "MEL-21-01",
        "Diagrama",
        "16:9",
        "1600×900",
        "Imagen sugerida: dos tarjetas lado a lado, cada una con un check verde grande: «ÍTEM 1 · RELIEF OK» e «ÍTEM 2 · RELIEF OK». Una flecha las junta en una tercera tarjeta con borde ámbar (semántico, alerta) y el rótulo «ÍTEM 1 + ÍTEM 2 = ¿?». Debajo, en mono: MEL + MEL ≠ GO. Objetivo: que el piloto vea que dos alivios válidos por separado no garantizan un alivio válido juntos.",
      ),

      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Cada entrada de la MEL se escribe pensando en ese ítem. Cuando hay dos o más ítems abiertos a la vez, la suma puede quitar la misma redundancia por dos lados o cargar a la tripulación más de lo razonable.",
      },
      { kind: "p", text: "Lo que dicen las fuentes, todas en la misma línea:" },
      {
        kind: "quote",
        text: "When operating with multiple inoperative items, the interrelationships between those items and the effect on aircraft operation and crew workload will be considered.",
        source: "FAA, PL-34 (preámbulo de toda MEL 121)",
      },
      {
        kind: "quote",
        text: "An inoperative component in a particular system can affect the operation or limit the inoperability of a component in another system (e.g., inoperative components of a wheel braking system limiting the inoperability of the thrust reverser system).",
        source: "FAA, 8900.1, 4-692",
      },
      {
        kind: "quote",
        text: "Multiple item failures can significantly impact operational limitations and flightcrew workload. This includes the consideration of possible additional item failures while an aircraft is en route.",
        source: "FAA, 8900.1, 4-692 (igual en AC 120-125, 6.4)",
      },
      {
        kind: "norma",
        rac: "RAC 91, Apéndice 2 (f) y (g)",
        texto:
          "(f) «Los explotadores deben asegurarse de que no se inicie ningún vuelo cuando varios elementos del MEL no funcionen, sin haber determinado que la interrelación que existe entre los sistemas o componentes inoperativos no dará lugar a una degradación inaceptable del nivel de seguridad operacional o a un aumento indebido en la carga de trabajo de la tripulación de vuelo.» Y (g): hay que considerar «la posibilidad de que surjan otras fallas».",
      },
      {
        kind: "p",
        text: "La FAA lo dice como algo a considerar; el RAC y el SRVSOP (MIA, PIV-VI-C7, 3.14) lo formulan como **prohibición**: no se inicia el vuelo sin haberlo determinado.",
      },

      { kind: "sub", text: "Lo que debe saber un piloto" },
      { kind: "p", text: "Hay dos tipos de combinación:" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**La que la MEL ya escribe.** Una entrada pone como condición que otro sistema funcione. Si ese otro sistema también está diferido, la condición no se cumple y no hay alivio. Se detecta leyendo los provisos.",
          "**La que la MEL no escribe.** Cada ítem cumple sus condiciones, pero juntos quitan dos capas de la misma protección o suman carga de trabajo. Aquí no hay un texto que lo prohíba: hay análisis del operador y juicio del piloto.",
        ],
      },
      {
        kind: "p",
        text: "El MIO del SRVSOP resume qué mirar: la interrelación entre equipos, la carga de trabajo de la tripulación, la operación de la aeronave y las restricciones del vuelo (Cap 16, Sección 5, punto 7).",
      },

      { kind: "sub", text: "Cómo se ve en la MEL" },
      hueco(
        "MEL-21-02",
        "Imagen anotada",
        "16:9",
        "1600×900",
        "Imagen base: dos extractos reales, uno al lado del otro, de la MMEL FAA A318-A321, Rev 32. Izquierda: 78-30-01 Thrust Reverser Systems, sub-ítem 1) (A318/A319ceo/A320ceo/A321ceo), página 78-2 (Rev 31, 08/13/2024), mostrando solo a), g), h), i) y j) y el resto con «…». Derecha: 32-44-01 Yellow Brake System, sub-ítem 2), página 32-19 (Rev 32, 07/30/2025). Textos en la tabla de abajo. Son de una MMEL (del tipo), no de la MEL de un operador. Anotaciones: 1) izquierda, «One may be inoperative provided», alivio para un reversor con condiciones; 2) izquierda, «h) Main wheel braking system operates normally», el reversor diferido exige frenos normales; 3) derecha, «Braking on one wheel may be inoperative», alivio para el freno de una rueda; 4) derecha, «b) Both reversers operate normally», el freno diferido exige los dos reversores. Una línea une la flecha 2 con la flecha 4, con el rótulo «NO PUEDEN COEXISTIR». Objetivo pedagógico: ver en un texto real el ejemplo que da la FAA (frenos y reversores): cada alivio es válido solo, y cada uno excluye al otro.",
      ),
      ...entrada(
        [
          [
            "78-30-01 Thrust Reverser Systems, 1) (A318/A319ceo/A320ceo/A321ceo)",
            "C",
            "2",
            "1",
            "(M)(O) One may be inoperative provided: … g) Wheel brake tachometers operate normally, h) Main wheel braking system operates normally, …",
          ],
          [
            "32-44-01 Yellow Brake System, 2)",
            "C",
            "1",
            "1",
            "(M) Braking on one wheel may be inoperative provided: a) Yellow hydraulic supply of affected brake is deactivated, and b) Both reversers operate normally.",
          ],
        ],
        "MMEL FAA A318-A321, Rev 32: ítem 78-30-01 1), página 78-2 (Rev 31, 08/13/2024); ítem 32-44-01 2), página 32-19 (Rev 32, 07/30/2025). Son de una MMEL (del tipo), no de la MEL de un operador.",
      ),
      ...flechas([
        "**Reversor**: se puede salir con un reversor inoperativo, con (M), (O) y una lista larga de condiciones.",
        "**«Main wheel braking system operates normally»**: una de esas condiciones es que el frenado normal funcione. El piloto la lee como «si también tengo un freno diferido, este alivio no existe».",
        "**Freno de una rueda**: también tiene alivio, con (M).",
        "**«Both reversers operate normally»**: y exige los dos reversores. Es la misma relación vista desde el otro lado.",
      ]),
      {
        kind: "p",
        text: "Con uno solo abierto, hay alivio. Con los dos, ninguno de los dos cumple sus condiciones: la MEL misma cierra la puerta.",
      },
      {
        kind: "enLaOperacion",
        momento: "Combinación que la MEL no escribe",
        rotulo: "Escenario de práctica",
        texto:
          "Aeronave de ejemplo con dos diferidos vigentes: el radar meteorológico, diferido con la condición de que no se requiera para el vuelo, y un sistema de ejemplo que reduce la ayuda del piloto automático en crucero. Cada uno, solo, cumple. El vuelo es nocturno, de tres horas, sobre una zona con convección pronosticada. Ninguna entrada prohíbe la combinación. La pregunta del RAC 91 Apéndice 2 (f) sigue ahí: ¿la suma da una carga de trabajo indebida o deja a la tripulación sin la herramienta que necesita justo donde la va a necesitar?",
      },

      { kind: "sub", text: "Aplicación en la operación" },
      {
        kind: "list",
        items: [
          "Con dos o más diferidos, el piloto lee **todos** los provisos buscando referencias cruzadas («operates normally», «is operative», «considered inoperative»).",
          "Revisa las notas: un diferido puede dejar otro sistema como inoperativo (el caso del TCAS con T2CAS del cap. 18).",
          "Piensa en la siguiente falla: si en ruta falla lo que queda, ¿con qué me quedo? (8900.1, 4-692; RAC 91, Apéndice 2 (g)).",
          "Si el análisis no le cierra, lo plantea a despacho y mantenimiento antes de salir.",
        ],
      },

      error(
        "«Cada ítem tiene su alivio, entonces pueden coexistir.» MEL + MEL no es igual a GO. La propia MMEL a veces lo prohíbe en los provisos, y cuando no lo escribe, el análisis sigue siendo obligatorio.",
      ),
      enPocasPalabras([
        "Dos alivios válidos por separado pueden no ser válidos juntos.",
        "Buscar en los provisos las condiciones que nombran otros sistemas.",
        "Frenos y reversores es el ejemplo de la FAA, y se ve en la MMEL A318-A321 real.",
        "Considerar carga de trabajo y una posible falla adicional en ruta.",
        "RAC y SRVSOP: sin ese análisis, el vuelo no se inicia.",
      ]),
      fuentes("8900.1 4-692 · RAC 91 Ap. 2", [
        "FAA MMEL PL-34 Rev 5, p. 4.",
        "FAA Order 8900.1 Vol 4 Cap 4 Secc 3 (CHG 933), 4-692; AC 120-125, 6.4.",
        "RAC 91 Enm. 12, Apéndice 2 (f) y (g); SRVSOP MIA Enm. 13, PIV-VI-C7, 3.14; SRVSOP MIO Parte II Vol II Cap 16 (2013), Sección 5, punto 7.",
        "MMEL FAA A318-A321, Rev 32: ítem 78-30-01 1), página 78-2 (Rev 31); ítem 32-44-01 2), página 32-19 (Rev 32); ítem 34-43-01, NOTE 1.",
      ]),
    ],
  },
  // ── 22 · capítulo 33 ────────────────────────────────────────────────────
  {
    n: 22,
    title: "La MEL y la decisión del comandante",
    kicker: "La última palabra antes de salir",
    minutes: 7,
    blocks: [
      hueco(
        "MEL-33-01",
        "Diagrama",
        "16:9",
        "1600×900",
        "Imagen sugerida: dos capas superpuestas. Abajo, una base firme rotulada «LEGAL: MEL CUMPLIDA» (ítem, (M), (O), placard, plazo). Encima, una segunda capa con diez fichas pequeñas: meteorología, terreno, aeropuerto, pista, experiencia, carga de trabajo, múltiples MEL, complejidad, alternos, información de despacho. Arriba, una sola pregunta: «¿APROPIADO HOY?». Al costado, un marco fino que rodea todo: «DENTRO DE LAS POLÍTICAS Y SOP DEL OPERADOR». Objetivo: que el piloto vea que la MEL cumplida es la base, no la respuesta, y que su decisión opera dentro del marco del operador.",
      ),

      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "La MEL responde si el avión **puede** salir con un ítem inoperativo. El comandante responde si **debe** salir hoy, con este vuelo. Legal no siempre es operacionalmente apropiado.",
      },

      { kind: "sub", text: "Lo que debe saber un piloto" },
      { kind: "p", text: "La base normativa de esa decisión:" },
      {
        kind: "table",
        head: ["", "FAA", "Colombia (RAC) y OACI"],
        rows: [
          [
            "La MEL y el piloto al mando",
            "121.628 no lo nombra (cap. 18)",
            "RAC 121.2615(a) y Anexo 6, 6.1.3: la MEL es para que el piloto al mando «pueda determinar si puede iniciar el vuelo». RAC 91.1920(a): «si es posible iniciar el vuelo o continuar ese vuelo»",
          ],
          [
            "Aptitud para el vuelo",
            "91.7(b): el PIC determina si el avión está «in condition for safe flight»",
            "RAC 91.545(a); RAC 121.2550(a)",
          ],
          [
            "Autoridad",
            "121.533(d): el PIC, durante el tiempo de vuelo, está al mando y es responsable de la seguridad",
            "RAC 121.2610(a): ningún piloto al mando permite que el vuelo continúe si, en su opinión o en la del despachador, no puede completarse con seguridad",
          ],
          [
            "La MEL no reemplaza el juicio",
            "PL-34 y 8900.1, 4-687: las condiciones de la MEL no relevan de determinar que el avión esté en condición segura",
            "RAC 91, Apéndice 2 (f) y (g)",
          ],
        ],
      },
      { kind: "p", text: "Y en la propia MEL: hay provisos que dejan la decisión a la tripulación de forma explícita." },
      {
        kind: "list",
        items: [
          "MMEL FAA A318-A321, Rev 32, ítem 22-10-01 (autopiloto, alivio B): «c) Number of flight segments and segment duration is acceptable to flightcrew.»",
          "MMEL FAA A318-A321, Rev 32, ítem 30-71-01, página 30-13 (Waste Water Drain Mast Heating System, segundo alivio): «b) The pilot in command will determine if flight duration is acceptable with a FWD lavatory unusable».",
        ],
      },

      { kind: "sub", text: "Cómo se ve en la MEL" },
      hueco(
        "MEL-33-02",
        "Imagen anotada",
        "4:3",
        "1600×1200",
        "Imagen base: recreación fiel del ítem 22 / 01B Autopilot Systems de la MMEL FAA B-737, Rev 63a, página 22-1 (Rev 63, 04/03/2026), con el texto de la tabla de abajo. Es una MMEL (del tipo), no la MEL de un operador. Anotaciones: 1) «Except for ETOPS», primera restricción de la operación, antes de cualquier condición; 2) «acceptable to flightcrew», la entrada deja la decisión a la tripulación; 3) «weather, traffic density, and effect of other inoperative systems», los factores que la propia nota pide considerar; 4) «If CWS is inoperative, do not use other modes», una condición técnica que cambia lo que la tripulación puede usar. Objetivo pedagógico: ver que la MMEL misma reconoce que la legalidad no cierra la decisión y nombra los factores que la tripulación debe pesar.",
      ),
      ...entrada(
        [
          [
            "22 / 01B Autopilot Systems",
            "B",
            "-",
            "0",
            "Except for ETOPS, may be inoperative provided: a) Approach minimums do not require their use, b) Enroute operations do not require autopilot use, and c) Number of flight segments and segment duration is acceptable to flightcrew. NOTE 1: Operators should make every effort to repair autopilot early in repair interval, as provided by this relief statement, in consideration of such factors as weather, traffic density, and effect of other inoperative systems. NOTE 2: Any mode which functions normally may be used. If CWS is inoperative, do not use other modes (pitch or roll).",
          ],
        ],
        "MMEL FAA B-737, Rev 63a, página 22-1 (Rev 63, 04/03/2026). Es una MMEL (del tipo), no la MEL de un operador.",
      ),
      ...flechas([
        "**«Except for ETOPS»**: si el vuelo es ETOPS, este alivio no existe. Se mira antes que todo lo demás.",
        "**«acceptable to flightcrew»**: cuántos tramos y cuánto dura cada uno lo acepta o no la tripulación. Es una decisión escrita en la entrada.",
        "**La NOTE 1**: tiempo, densidad de tráfico y otros sistemas inoperativos. Es la lista que la tripulación también usa para decidir.",
        "**La NOTE 2**: si CWS está inoperativo, no se usan otros modos. Cambia el cuadro de carga de trabajo.",
      ]),
      {
        kind: "callout",
        tone: "info",
        title: "Nota",
        text: "En el B737 este alivio **no lleva (O)**; en el A320 el ítem equivalente sí (22-10-01). Por eso se lee la MEL del avión que se vuela, no la de otro tipo.",
      },

      { kind: "sub", text: "Aplicación en la operación" },
      { kind: "p", text: "Factores que el comandante pesa, aunque la MEL esté cumplida:" },
      {
        kind: "list",
        items: [
          "Meteorología en salida, ruta, destino y alternos.",
          "Terreno y altitudes mínimas de la ruta.",
          "Aeropuerto: facilidades, mantenimiento disponible, horario.",
          "Pista: longitud, estado, contaminación.",
          "Experiencia de la tripulación con el avión y con la ruta.",
          "Carga de trabajo total, sobre todo de noche o en tramos largos.",
          "Múltiples ítems MEL abiertos (cap. 21).",
          "Complejidad del vuelo: tramos, aproximaciones, espacio aéreo.",
          "Alternos disponibles con la capacidad real del avión.",
          "La información de despacho: si el plan ya refleja las limitaciones.",
        ],
      },
      {
        kind: "p",
        text: "Y un límite: la decisión se toma **dentro de las políticas y SOP del operador**. El comandante no inventa condiciones técnicas ni procedimientos, ni reemplaza el (M). Si decide no aceptar el avión, lo resuelve con despacho y mantenimiento según el manual. La FAA lo recoge para fallas antes del despegue: si el ítem «could affect the safety of flight due to circumstances such as weather, performance, weight and balance (W&B), or fuel limitations, the aircraft must return to the gate or ramp area for repairs» (AC 120-125, 6.3.2.1).",
      },
      {
        kind: "enLaOperacion",
        momento: "Antes de aceptar la rotación",
        rotulo: "Escenario de práctica",
        texto:
          "Aeronave de ejemplo, sin ningún autopiloto por un diferido válido. Programación: cuatro tramos nocturnos. Destino del último tramo con techo bajo pronosticado y una aproximación de no precisión. Todas las condiciones escritas se cumplen en el papel. ¿Qué preguntas le haces al despachador antes de aceptar la rotación completa?",
      },
      verificar(
        "Procedimiento cuando el piloto al mando no acepta un avión con diferidos (a quién informa, qué se registra): consultar el manual de operaciones del explotador.",
      ),

      error(
        "Tratar la MEL como si decidiera sola. El error contrario también existe: rechazar un avión sin un análisis, «porque tiene MEL». La decisión se argumenta con las condiciones del día.",
      ),
      enPocasPalabras([
        "Legal no siempre es apropiado.",
        "En RAC y OACI la MEL está escrita para la decisión del piloto al mando.",
        "Algunas entradas le dejan la decisión a la tripulación por escrito.",
        "Meteorología, pista, terreno, carga de trabajo y otros diferidos pesan tanto como el texto.",
        "La decisión va dentro de las políticas y SOP del operador.",
      ]),
      fuentes(
        "RAC 121.2615 · 14 CFR 91.7",
        [
          "RAC 121 Enm. 10, 121.2550(a), 121.2610(a), 121.2615(a); RAC 91 Enm. 12, 91.545(a), 91.1920(a), Apéndice 2 (f) y (g); Anexo 6 Parte I, 6.1.3 (lista EFOD SRVSOP 2025).",
          "14 CFR 91.7(b), 121.533(d), 121.628.",
          "FAA MMEL PL-34 Rev 5; FAA Order 8900.1 Vol 4 Cap 4 Secc 3, 4-687; AC 120-125, 6.3.2.1.",
          "MMEL FAA B-737 Rev 63a, capítulo 22, ítem 01B, página 22-1; MMEL FAA A318-A321 Rev 32, ítems 22-10-01 (página 22-1) y 30-71-01 (página 30-13).",
        ],
        [
          "VERIFICAR: procedimiento cuando el piloto al mando no acepta un avión con diferidos (a quién informa, qué se registra) contra el manual de operaciones del explotador.",
        ],
      ),
    ],
  },
  // ── 23 · capítulo 34 ────────────────────────────────────────────────────
  {
    n: 23,
    title: "Cómo buscar un ítem",
    kicker: "Del síntoma en cabina a la entrada correcta",
    minutes: 7,
    blocks: [
      hueco(
        "MEL-34-01",
        "Recreación",
        "9:16",
        "1080×1920",
        "Imagen sugerida: pantalla genérica de una MEL digital en una tableta de cabina (EFB), sin marca de software ni de operador. Arriba, barra de búsqueda con el texto «weather radar» escrito. Debajo, resultados agrupados por capítulo: «34 · NAVIGATION» con dos ítems resaltados. A la izquierda, un árbol ATA plegable (21, 22, 23… 49). En la parte superior, una franja fija «MEL REV 00 · EFECTIVA 00 MMM 0000 · Aeronave de ejemplo». Todos los números son ficticios. Objetivo: que el piloto vea las dos vías para llegar a un ítem (buscar por palabra y navegar por ATA) y que la revisión y la aeronave están siempre a la vista.",
      ),

      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Buscar un ítem no es escribir una palabra y leer el primer resultado. Es un recorrido de 12 pasos que termina en el impacto sobre el vuelo.",
      },

      { kind: "sub", text: "Los 12 pasos" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Sistema.** Qué falla de verdad: el síntoma, el mensaje, el indicador.",
          "**Capítulo ATA.** En qué capítulo vive (34 Navigation, 49 APU, 32 Landing Gear…).",
          "**Ítem.** La entrada correcta dentro del capítulo.",
          "**Configuración.** El sub-ítem que corresponde a **este** avión (modelo, motor, modificación).",
          "**Categoría.** A, B, C o D y su intervalo; si hay varias líneas, cuál se aplicó.",
          "**Installed.** Cuántos hay.",
          "**Required.** Cuántos se necesitan, siempre sujeto a Remarks.",
          "**Remarks.** Todas las condiciones, provisos y notas, completas.",
          "**(M).** Si pide mantenimiento y si está firmado.",
          "**(O).** Si pide procedimiento de operación y cuál.",
          "**Referencias.** Otras entradas que menciona, ETOPS, «14 CFR» o norma local, procedimientos del operador.",
          "**Impacto.** Performance, combustible, ruta, aproximaciones, alternos (cap. 16).",
        ],
      },

      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "**La numeración cambia según el fabricante.** En la MMEL FAA A318-A321 los ítems van en seis dígitos «CC-SS-NN» (22-10-01, 34-41-01, 49-10-01), con sub-ítems «1)», «2)». En la MMEL FAA B-737 la página dice el capítulo y el ítem es corto (01, 01-01, 15-01) con **letras para las alternativas de alivio** (01A, 01B, 15-01A). La MEL del operador puede tener su propio formato, siempre que no sea menos restrictiva (AC 120-125, 7.2).",
          "**Los mensajes también tienen entrada.** En la MMEL A318-A321 hay ítems «XX-00-00» para mensajes de mantenimiento de ECAM (por ejemplo, 49-00-00 CLASS II MAINTENANCE MESSAGES).",
          "**La configuración decide.** Ejemplo real, MMEL FAA A318-A321 Rev 32, 49-10-01: el sub-ítem 1) es para «A318/A319/A320/A321 without Mod. 163213/MP J4530»; el 2) para «A321 with Mod. 163213/MP J4530 and without Mod. 162739/MP J4335», con una condición distinta («FWD ACT is empty or not installed»). Leer el sub-ítem de otro avión es leer otra regla.",
          "**Si no está, no hay alivio.** «If an operator does not list a particular MMEL item in its MEL, that item is not subject to MEL relief and must be operative at takeoff» (8900.1, 4-685B1)c)).",
          "**El operador puede dividir un ítem.** Ejemplo de la FAA: el operador puede listar los modos del autopiloto (HDG, VOR/LOC, ALT) como ítems separados; si no lo hizo y falla un modo, «the operator would have to defer the autopilot system» (8900.1, 4-685B1)d)2.a.). Por eso se busca en la MEL del operador, no en la MMEL.",
        ],
      },

      { kind: "sub", text: "Cómo se ve en la MEL" },
      hueco(
        "MEL-34-02",
        "Imagen anotada",
        "16:9",
        "1600×900",
        "Imagen base: dos columnas con la misma función buscada, «weather radar», en dos MMEL FAA reales. Izquierda, MMEL FAA A318-A321, Rev 32, página 34-17: el ítem 34-41-01 y debajo su sub-ítem 7) (sin la NOTE). Derecha, MMEL FAA B-737, Rev 63a, página 34-7: el ítem 15-01 y su alternativa 15-01A (sin la NOTE). Textos en las tablas de abajo. Son MMEL (del tipo), no la MEL de un operador. Anotaciones: 1) izquierda, «34-41-01», numeración Airbus de seis dígitos; 2) derecha, «15-01A», numeración Boeing corta, con letra para la alternativa de alivio; 3) izquierda, «7)», sub-ítem, la función concreta dentro del sistema; 4) ambas, «14 CFR», referencia a la norma de operación, en otro país se lee como la norma local; 5) izquierda, «***», ítem instalado en algunos aviones y no en otros, no pasa a la MEL del operador. Objetivo pedagógico: ver que la misma búsqueda da números y estructuras distintas según el tipo, y que la configuración y las referencias se leen antes de concluir.",
      ),
      ...entrada(
        [
          ["34-41-01 Weather Radar Systems", "D", "-", "-", "Any in excess of those required by 14 CFR may be inoperative."],
          [
            "7) `***` Predictive Windshear Detection and Avoidance System",
            "B",
            "-",
            "0",
            "(O) May be inoperative provided alternate procedures are established and used.",
          ],
        ],
        "MMEL FAA A318-A321, Rev 32, página 34-17 (sin la NOTE). Es una MMEL (del tipo), no la MEL de un operador.",
      ),
      ...entrada(
        [
          [
            "15-01 Weather Radar with Windshear Detection and Avoidance System (Predictive) Installed",
            "",
            "",
            "",
            "",
          ],
          [
            "15-01A",
            "B",
            "-",
            "0",
            "(O) May be inoperative provided: a) Weather radar is not required by 14 CFR, and b) Alternate procedures are established and used.",
          ],
        ],
        "MMEL FAA B-737, Rev 63a, página 34-7 (sin la NOTE). Es una MMEL (del tipo), no la MEL de un operador.",
      ),
      ...flechas([
        "**34-41-01**: capítulo 34, sección 41, ítem 01. Airbus.",
        "**15-01A**: en Boeing la página indica el capítulo (34); la letra A distingue una alternativa de alivio de otra (15-01B, 15-01C).",
        "**7)**: el sub-ítem. Si falla solo la función predictiva de cizalladura, la entrada es el sub-ítem, no el sistema completo.",
        "**«14 CFR»**: la PL-25 dice que «\"14 CFR\" also implies the regulations within the State the aircraft is operated». El piloto se pregunta qué exige su norma para su vuelo.",
        "**Triple asterisco** (`***`): ítem que puede estar instalado en unos aviones y no en otros. No se lleva a la MEL del operador (PL-25, Triple Asterisk).",
      ]),

      { kind: "sub", text: "Aplicación en la operación" },
      {
        kind: "list",
        items: [
          "Si la búsqueda por palabra no encuentra nada, se navega por el capítulo ATA: el ítem puede estar con otro nombre.",
          "Siempre se abre la entrada completa: los resultados de búsqueda muestran un título, no las condiciones.",
          "Se confirma que el sub-ítem corresponde a la matrícula (modificaciones, motor, modelo).",
        ],
      },

      error(
        "Encontrar el ítem y quedarse en el paso 7 («requeridos 0, salimos»). Los pasos 8 a 12 son donde aparecen las restricciones.",
      ),
      enPocasPalabras([
        "Doce pasos: del sistema al impacto sobre el vuelo.",
        "La numeración es distinta en Airbus y Boeing; se aprende la lógica, no el número.",
        "El sub-ítem de la configuración correcta es el que manda.",
        "Lo que no está en la MEL del operador debe funcionar al despegue.",
        "Siempre se lee la entrada completa.",
      ]),
      fuentes("MMEL A318-A321 · MMEL B-737 · PL-25", [
        "MMEL FAA A318-A321, Rev 32: ítems 34-41-01 (página 34-17), 49-00-00 y 49-10-01 (página 49-1).",
        "MMEL FAA B-737, Rev 63a: capítulo 34, ítems 15-01A a 15-01C (página 34-7).",
        "FAA MMEL PL-25 Rev 24: Required by 14 CFR, Triple Asterisk.",
        "FAA Order 8900.1 Vol 4 Cap 4 Secc 3 (CHG 933), 4-685B1)c) y d); AC 120-125, 7.2.",
      ]),
    ],
  },
  // ── 24 · capítulo 35 ────────────────────────────────────────────────────
  {
    n: 24,
    title: "MEL digital y EFB",
    kicker: "La MEL en la tableta de la cabina",
    minutes: 5,
    blocks: [
      hueco(
        "MEL-35-01",
        "Imagen anotada",
        "16:10",
        "1600×1000",
        "Imagen base: pantalla ficticia y genérica de una MEL electrónica en un EFB (sin marca de software ni de operador). Franja superior: «MEL REV 00 · 00 MMM 0000 · Aeronave de ejemplo». Panel izquierdo: árbol ATA. Centro: una entrada inventada abierta, «Ítem 30-XX-XX · Sistema de ejemplo · C · 2 · 1 · (O) One may be inoperative provided…», con «(O)» subrayado como hipervínculo. Panel derecho: «Diferidos de esta aeronave» con dos filas y sus fechas límite. Abajo, un enlace «Ver también: ítem 30-YY-YY». Anotaciones: 1) franja de revisión, número, fecha y aeronave siempre visibles; 2) árbol ATA, navegación por capítulo cuando la búsqueda no encuentra; 3) «(O)» subrayado, hipervínculo al procedimiento de operación; 4) panel de diferidos, lo abierto en esta matrícula si el sistema del operador lo integra; 5) «Ver también», referencia cruzada a otra entrada. Objetivo pedagógico: reconocer las funciones típicas de una MEL digital y saber que cada operador las implementa distinto.",
      ),
      ...flechas([
        "**Revisión**: antes de leer una entrada, confirmar que la MEL mostrada es la vigente y la de este avión (cap. 36).",
        "**Árbol ATA**: la búsqueda por palabra falla si el ítem tiene otro nombre.",
        "**Hipervínculo (O)**: lleva al procedimiento. El procedimiento es parte de la condición.",
        "**Diferidos**: algunos sistemas muestran lo abierto de la matrícula. No reemplaza el libro técnico.",
        "**Referencia cruzada**: la MEL digital facilita ver interrelaciones (cap. 21), pero solo si el operador las enlazó.",
      ]),

      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "La MEL en formato electrónico, normalmente en el EFB. Es la misma MEL aprobada; cambia el medio. La AC 120-125 lo anticipa: «traditional pages may become digital sections or subsections of flowing text» (2.4).",
      },
      { kind: "p", text: "Funciones que suele tener (**depende del operador**, no todas existen en todos):" },
      {
        kind: "list",
        items: [
          "Búsqueda por palabra.",
          "Navegación por capítulo ATA.",
          "Hipervínculos a procedimientos (O) y (M).",
          "Control de revisión visible.",
          "Lista de diferidos de la aeronave.",
          "Referencias cruzadas entre ítems.",
        ],
      },

      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "table",
        head: ["", "FAA", "Colombia (RAC) y SRVSOP"],
        rows: [
          [
            "Acceso",
            "14 CFR 121.628(a)(2): acceso directo de la tripulación, en todo momento antes del vuelo, «through printed or other means approved»",
            "RAC 121.2615(c): acceso directo «a través del MEL impreso o por otros medios aprobados por la UAEAC»",
          ],
          [
            "Aprobación del medio electrónico",
            "8900.1, 4-693: la MEL electrónica requiere autorización (OpSpec A025); mostrarla en un EFB, además, OpSpec A061",
            "RAC 121.1010: la UAEAC expide una aprobación específica para las funciones del EFB",
          ],
          [
            "Medios que no valen",
            "8900.1, 4-693: no incluyen «telephone, radio, or data link». AC 120-125, 6.5: «Indirect methods… are not acceptable»",
            "El MIO SRVSOP de 2013 (Sección 5, 3.1) menciona el acceso por ACARS como ejemplo de medio alterno, si se aprueba. Es un documento de 2013 y **no coincide** con la FAA vigente",
          ],
          [
            "Si falla el EFB",
            "No tratado en las secciones de MEL citadas",
            "RAC 121.1010(b)(1)(iii): el explotador se asegura de que, si falla el EFB, la tripulación disponga rápidamente de información suficiente",
          ],
        ],
      },
      {
        kind: "p",
        text: "La FAA insiste en que el acceso es a **toda** la MEL: «This applies to the MEL in its entirety, which must be directly accessible up until the point the aircraft takes off» (8900.1, 4-693).",
      },

      { kind: "sub", text: "Aplicación en la operación" },
      {
        kind: "list",
        items: [
          "Antes de usarla: revisión vigente, sincronizada, aeronave correcta.",
          "Buscar, abrir la entrada completa, seguir los enlaces de (O) y de referencias.",
          "Si el EFB falla, aplicar el respaldo que defina el operador. La MEL tiene que seguir disponible hasta el despegue.",
          "No confundir la lista de diferidos del EFB con el libro técnico: manda el registro oficial del operador.",
        ],
      },
      verificar(
        "Qué aprobación específica tiene el operador para la MEL en EFB, qué medios de acceso acepta la Aerocivil (en particular data link) y cuál es el respaldo si falla el EFB: consultar el manual de operaciones del explotador y su aprobación EFB.",
      ),

      error(
        "Confiar en el resultado de la búsqueda. Si la palabra no coincide, el buscador dice «sin resultados» y el piloto concluye «no hay alivio» o, peor, que no aplica nada. Se navega por ATA antes de concluir.",
      ),
      enPocasPalabras([
        "La MEL digital es la misma MEL aprobada en otro medio.",
        "El medio electrónico necesita aprobación (FAA: OpSpec A025 y A061; Colombia: RAC 121.1010).",
        "FAA: teléfono, radio o data link no cuentan como acceso directo.",
        "Funciones y respaldo dependen del operador.",
        "Revisión, aeronave y entrada completa, siempre.",
      ]),
      fuentes(
        "8900.1 4-693 · RAC 121.1010",
        [
          "14 CFR 121.628(a)(2).",
          "FAA Order 8900.1 Vol 4 Cap 4 Secc 3 (CHG 933), 4-693; AC 120-125, 2.4 y 6.5.",
          "RAC 121 Enm. 10, 121.1010 y 121.2615(c).",
          "SRVSOP MIO Parte II Vol II Cap 16 (2013), Sección 5, 3.1 y 3.2.",
        ],
        [
          "VERIFICAR: qué aprobación específica tiene el operador para la MEL en EFB, qué medios de acceso acepta la Aerocivil (en particular data link) y cuál es el respaldo si falla el EFB, contra el manual de operaciones del explotador y su aprobación EFB.",
        ],
      ),
    ],
  },
  // ── 25 · capítulo 36 ────────────────────────────────────────────────────
  {
    n: 25,
    title: "Revision status",
    kicker: "Cómo saber que la MEL está vigente",
    minutes: 8,
    blocks: [
      hueco(
        "MEL-36-01",
        "Imagen anotada",
        "3:4",
        "1200×1600",
        "Imagen base: portada ficticia de la MEL de un operador, genérica, sin logo real: «OPERADOR DE EJEMPLO · MINIMUM EQUIPMENT LIST · Tipo: Aeronave de ejemplo · Aplicable a: matrículas XX-AAA, XX-AAB, XX-AAC · MEL Revisión 14 · Fecha 00 MMM 0000 · Basada en MMEL Revisión 00 · Aprobada por: [autoridad] · Página de control: ver página C-1». Debajo, un recorte de la página de control con tres filas: «21 · 21-1 a 21-9 · Rev 12 · fecha», «22 · 22-1 a 22-5 · Rev 14 · fecha», «49 · 49-1 a 49-3 · Rev 13 · fecha». Anotaciones: 1) «MEL Revisión 14 · Fecha», revisión del documento completo; 2) «Basada en MMEL Revisión 00», de qué MMEL sale, no tiene que coincidir con el número de la MEL; 3) «Aplicable a: matrículas…», efectividad, si la matrícula no está esa MEL no es la de tu avión; 4) «Aprobada por», sin aprobación no hay MEL; 5) filas de la página de control con revisiones distintas, cada página tiene su revisión y su fecha. Objetivo pedagógico: saber en diez segundos si la MEL que se tiene en la mano es la vigente, la de este avión y la aprobada, y entender por qué las páginas no llevan todas la misma revisión.",
      ),
      ...flechas([
        "**Revisión y fecha de la MEL**: la del documento completo.",
        "**MMEL base**: la MEL indica sobre qué revisión de la MMEL se hizo. La FAA lo pide en la página de control (AC 120-125, 2.4.5), y aclara que el número de revisión de la MEL «does not have to match the MMEL revision number» (9.2.1.2, Note).",
        "**Aplicabilidad**: qué aviones cubre.",
        "**Aprobación**: la MEL la aprueba la autoridad del Estado del explotador (en Colombia, la UAEAC, RAC 121.2615(a)).",
        "**Página de control**: en la FAA contiene al menos el nombre del operador, la lista de todas las páginas con la fecha de revisión de cada una, la revisión de MMEL base y, si se usa para aprobar, la firma del inspector (AC 120-125, 2.4.5).",
      ]),

      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "El estado de revisión dice si la MEL que se consulta es la vigente y la que aplica al avión. Tres datos:",
      },
      {
        kind: "list",
        items: [
          "**Número y fecha de revisión.**",
          "**Efectividad**: desde cuándo rige.",
          "**Aplicabilidad**: a qué aviones y configuraciones.",
        ],
      },

      { kind: "sub", text: "Lo que debe saber un piloto: la revisión va por página" },
      {
        kind: "p",
        text: "Las MMEL reales lo muestran. Cada página lleva en el encabezado su propia revisión y fecha:",
      },
      hueco(
        "MEL-36-02",
        "Imagen anotada",
        "16:9",
        "1600×900",
        "Imagen base: dos recortes reales de la MMEL FAA A318-A321, Rev 32. Izquierda: la «Table of Contents and Control Page» (página I) con las filas de la tabla de abajo. Derecha: el encabezado de la página 49-1: «REVISION NO. 30 · DATE: 03/03/2023 · PAGE NO. 49-1 · AIRCRAFT: Airbus A320». Es una MMEL (del tipo), no la MEL de un operador. Anotaciones: 1) «Cover Page · 32 · 07/30/2025», la MMEL completa está en la revisión 32; 2) «49 … 30 · 03/03/2023», el capítulo 49 sigue en la revisión 30 porque no cambió; 3) «REVISION NO. 30 · DATE: 03/03/2023» en la página 49-1, la página confirma lo que dice la página de control. Objetivo pedagógico: ver con un documento real que una MMEL en revisión 32 tiene páginas en revisión 30 y 31, y que eso es normal: se comprueba con la página de control.",
      ),
      {
        kind: "table",
        head: ["Sección", "Páginas", "Revisión", "Fecha"],
        rows: [
          ["Cover Page", "", "32", "07/30/2025"],
          ["21 Air Conditioning", "21-1 thru 29", "30", "03/03/2023"],
          ["24 Electrical Power", "24-1 thru 25", "31", "08/13/2024"],
          ["49 Airborne Auxiliary Power", "49-1 thru 3", "30", "03/03/2023"],
        ],
      },
      {
        kind: "code",
        text: "REVISION NO. 30 · DATE: 03/03/2023 · PAGE NO. 49-1 · AIRCRAFT: Airbus A320",
      },
      {
        kind: "p",
        text: "MMEL FAA A318-A321, Rev 32: Table of Contents and Control Page (página I) y encabezado de la página 49-1. Es una MMEL (del tipo), no la MEL de un operador.",
      },
      ...flechas([
        "**Revisión del documento**: A318-A321 Rev 32, del 07/30/2025.",
        "**Revisión del capítulo**: el capítulo 49 está en Rev 30 (03/03/2023) y el 78 en Rev 31 (08/13/2024). No es un error: esas páginas no cambiaron en la 32.",
        "**Encabezado de la página**: coincide con la página de control. Si no coincidiera, algo está mal en la copia.",
      ]),
      {
        kind: "p",
        text: "En la MMEL FAA B-737 pasa lo mismo, más marcado: la Rev 63a es del 05/27/2026, la mayoría de los capítulos están en 63 (04/03/2026), el 36 en 62 (11/28/2022), el 80 en 58 (10/10/2015) y el 75 en 52 (04/29/2008). Boeing explica su regla en los Highlights: «For any change affecting an ATA section, all pages in that associated ATA section are re-dated accordingly».",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Un caso real para entrenar el ojo",
        text: "En esa misma B-737 Rev 63a, el encabezado de la página 78-1 dice «REVISION NO. 63 / DATE: 11/28/2022», mientras la página de control lista el capítulo 78 como «63 · 04/03/2026». No le toca al piloto resolver eso; sí le toca verlo y preguntar cuando la página y la página de control no coinciden.",
      },

      { kind: "sub", text: "Otras marcas de revisión que se leen" },
      {
        kind: "table",
        head: ["Marca", "Qué significa", "Fuente"],
        rows: [
          [
            "Letra después del número (63a)",
            "Revisión interina, no obligatoria",
            "AC 120-125, 9.2.1.2; MIO SRVSOP 2013, Sección 5, 2.1.1",
          ],
          ["Número siguiente (63 → 64)", "Revisión estándar, obligatoria", "AC 120-125, 9.2.2.2"],
          [
            "Barra vertical «|»",
            "Cambio en esa fila en la revisión actual de esa página",
            "PL-25, Vertical Bar",
          ],
          [
            "Policy Application Record",
            "Qué PL se aplicaron y hasta qué fecha",
            "MMEL A318-A321 Rev 32, p. VII",
          ],
        ],
      },
      {
        kind: "p",
        text: "Ejemplo del último: la MMEL A318-A321 Rev 32 registra que aplicó la «PL-025 … Revision 23 06/12/2023» y aclara que ninguna PL posterior al 01/14/2025 se consideró. La PL-25 vigente es la Rev 24 (04/13/2026). Una MMEL siempre va un paso atrás de la política más nueva.",
      },

      { kind: "sub", text: "Aplicación en la operación" },
      { kind: "p", text: "**Cuánto tarda la MEL en seguir a la MMEL** no es igual en todas partes:" },
      {
        kind: "table",
        head: ["", "FAA", "Colombia (RAC)"],
        rows: [
          [
            "Revisión estándar de la MMEL",
            "El operador debería incorporarla y presentarla dentro de 90 días desde la fecha de la revisión de la MMEL (AC 120-125, 9.2.2.3)",
            "No se encontró un plazo general",
          ],
          [
            "Ítems más restrictivos",
            "Puede haber un plazo más corto cuando se quita un alivio (AC 120-125, 9.2.2.3)",
            "10 días calendario desde la notificación o publicación de la revisión, o la fecha que fije la MMEL; aplica la más restrictiva (RAC 121.2615(a), Nota 2)",
          ],
        ],
      },
      {
        kind: "list",
        items: [
          "**Diferidos abiertos cuando cambia la revisión**: en la FAA, si la MMEL se vuelve más restrictiva, el diferido abierto puede seguir con la categoría y el proviso con que se difirió hasta su reparación (AC 120-125, 9.2.2.4).",
          "En la cabina: confirmar la revisión en la portada o franja del EFB, que el avión esté en la aplicabilidad y, si hay duda sobre una página, compararla con la página de control.",
        ],
      },
      verificar(
        "Plazo para incorporar revisiones no restrictivas de la MMEL y tratamiento de los diferidos abiertos cuando cambia la revisión: consultar el manual de MEL del operador y la Aerocivil. El RAC 121.2615 solo fija los 10 días para lo más restrictivo.",
      ),

      error(
        "Pensar que todas las páginas de una MEL llevan el mismo número de revisión, y alarmarse (o peor, no mirar) cuando no es así. Lo normal es que varíen; lo que se comprueba es que coincidan con la página de control.",
      ),
      enPocasPalabras([
        "Revisión, efectividad y aplicabilidad: tres datos antes de usar la MEL.",
        "La revisión va por página; la página de control dice cuál corresponde a cada una.",
        "La letra (63a) indica revisión interina; el número siguiente, estándar.",
        "La MEL dice sobre qué MMEL se hizo; su número de revisión puede ser otro.",
        "Colombia: 10 días para incorporar lo más restrictivo de una revisión de la MMEL.",
      ]),
      fuentes(
        "AC 120-125 · RAC 121.2615",
        [
          "MMEL FAA A318-A321, Rev 32: Table of Contents and Control Page (p. I), FAA MMEL Policy Application Record (p. VII), encabezado de la página 49-1.",
          "MMEL FAA B-737, Rev 63a: Table of Contents and Control Page (p. I), Highlights of Change (p. II), encabezado de la página 78-1.",
          "FAA MMEL PL-25 Rev 24, Vertical Bar.",
          "AC 120-125 (11/1/23), 2.4.5, 9.2.1.2, 9.2.2.2, 9.2.2.3 y 9.2.2.4.",
          "RAC 121 Enm. 10, 121.2615(a) y su Nota 2.",
          "SRVSOP MIO Parte II Vol II Cap 16 (2013), Sección 5, 2.1.1.",
        ],
        [
          "VERIFICAR: plazo para incorporar revisiones no restrictivas de la MMEL y tratamiento de los diferidos abiertos cuando cambia la revisión, contra el manual de MEL del operador y la Aerocivil (el RAC 121.2615 solo fija los 10 días para lo más restrictivo).",
        ],
      ),
    ],
  },
]
