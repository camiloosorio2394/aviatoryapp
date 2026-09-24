/**
 * Nivel 4 · Impacto operacional (lecciones 26 a 33, capítulos 22 a 29 de la especificación).
 *
 * El ítem tiene alivio; ¿qué le hace a mi vuelo? Un diferido puede tocar la
 * performance, el combustible, la meteorología en la que se puede volar,
 * las aproximaciones, el espacio aéreo (RVSM, PBN) y las rutas EDTO. Cierra
 * con la APU como caso guía.
 *
 * Fuente: docs/mel/nivel-4.md, entero. La introducción del nivel abre la
 * lección 26. Cada entrada real de MMEL es una tabla con sus columnas y la
 * cita (MMEL, revisión, ítem, página) debajo (`entrada`). Cada imagen anotada
 * es un hueco y sus flechas van como `pasos`, con lo que dice cada una en la
 * práctica en una lista. Lo que el Markdown marca VERIFICAR sale en un
 * callout «Verificar» visible y, completo, en el detalle técnico de FUENTES.
 * El formato de los bloques y de los huecos está documentado al inicio de
 * index.ts.
 */

import type { DocBlockData, DocScreen } from "@/lib/docBlocks"

/** Una entrada real de MMEL: la tabla con sus columnas y la cita debajo. */
function entrada(cita: string, head: string[], rows: string[][]): DocBlockData[] {
  return [
    { kind: "table", head, rows },
    { kind: "p", text: `**Cita:** ${cita}.` },
  ]
}

/** Las flechas de una imagen anotada: lo que señala cada una y su explicación. */
function flechas(items: [string, string][]): DocBlockData {
  return {
    kind: "pasos",
    items: items.map(([codigo, texto], i) => ({ rotulo: `Flecha ${i + 1}`, codigo, texto })),
  }
}

/** Un error frecuente. */
function error(titulo: string, text: string): DocBlockData {
  return { kind: "callout", tone: "warn", title: titulo, text }
}

/** Un hueco de 16:9 a lo ancho de la columna. */
function hueco169(rotulo: string, descripcion: string): DocBlockData {
  return { kind: "hueco", rotulo, descripcion, alto: 280 }
}

/** Un hueco vertical (4:5), acotado para que no domine la página. */
function hueco45(rotulo: string, descripcion: string): DocBlockData {
  return { kind: "hueco", rotulo, descripcion, alto: 420, ratio: "4 / 5", anchoMax: 420 }
}

const CAT = ["Cat.", "Inst.", "Req."]

const MMEL_A320 = "MMEL FAA A318/A319/A320/A321, Rev 32"
const MMEL_B737 = "MMEL FAA B-737, Rev 63a"

export const NIVEL_4: DocScreen[] = [
  // ── 26 · capítulo 22 ────────────────────────────────────────────────────
  {
    n: 26,
    title: "MEL y performance",
    kicker: "Pesos, pistas y penalizaciones",
    minutes: 13,
    blocks: [
      {
        kind: "p",
        text: "En los niveles anteriores aprendiste a leer una entrada y a llevar un defecto hasta el despacho. Aquí la pregunta cambia: **ya sé que el ítem tiene alivio; ¿qué le hace a mi vuelo?** Un ítem diferido puede tocar la performance, el combustible, la meteorología en la que puedes volar, las aproximaciones que puedes hacer, el espacio aéreo (RVSM, PBN) y las rutas EDTO/ETOPS. El nivel cierra con la APU como caso guía.",
      },
      { kind: "sub", text: "Cómo leer las citas de este nivel" },
      {
        kind: "list",
        items: [
          "Las entradas reales son de dos **MMEL de la FAA** (documentos del tipo de avión, no la MEL de una aerolínea): A318/A319/A320/A321 Rev 32 y B-737 Rev 63a. En esas MMEL **cada página lleva su propia revisión**; la anotamos cuando citamos.",
          "Airbus numera `CC-SS-NN` (p. ej. `49-10-01`). Boeing numera dentro del capítulo y marca las alternativas con letra; aquí lo escribimos con el capítulo delante (p. ej. `49-01-01A`), como la propia MMEL cuando dice «MMEL Item 49-01».",
          "Cuando una MMEL dice «14 CFR», la FAA aclara que «\"14 CFR\" also implies the regulations within the State the aircraft is operated» (PL-25 Rev 24, «Required by 14 CFR»). En Colombia, eso es el RAC.",
          "La MEL de tu operador puede ser más restrictiva que la MMEL, nunca menos (8900.1, 4-682). Lo que leas aquí te enseña a razonar; la decisión se toma con la MEL aprobada del operador.",
        ],
      },
      {
        kind: "norma",
        titulo: "La lista que ordena todo el nivel",
        ref: "FAA Order 8900.1 Vol 4 Cap 4 Secc 3, CHG 933, 4-691C",
        rac: "RAC 121, Enm. 10, p. 234",
        naturaleza: "requisito",
        texto: "La lista que ordena todo el nivel es de la FAA. El plan operacional de vuelo «must account for any operational limitations [...] imposed by the conditions or limitations of an MEL», y da ejemplos: «Altitude restrictions», «Performance capabilities», «Weight restrictions», «Fuel penalties and limitations», «Navigational limitations», «Weather restrictions (including ice and rain limitations)», «Landing gear restrictions, including braking and steering», «Autoflight capabilities», «ETOPS limitations», «Auxiliary power limitations». En Colombia, la planificación del vuelo considera el «Efecto de los reportes diferidos de mantenimiento y/o cualquier desviación respecto de la configuración».",
      },
      hueco169(
        "MEL-22-00 · Diagrama · 16:9 · 1600×900 px",
        "Imagen sugerida: Un ítem MEL en el centro (tarjeta con «ITEM DEFERRED · MEL») del que salen siete flechas a siete íconos: pista (PERFORMANCE), surtidor (FUEL), nube (WEATHER), aproximación con luces (APPROACH), bloque de niveles de vuelo (RVSM), ruta con waypoints (PBN), océano con círculos de desviación (EDTO/ETOPS). Estilo plano, papel claro, rótulos en mono. Objetivo: Que el piloto vea que un ítem diferido no es un dato de mantenimiento aislado: toca varias partes del vuelo a la vez, y cada una se revisa antes de aceptar el avión.",
      ),
      { kind: "titulo", text: "Performance", n: "22" },
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Muchos alivios de la MEL no quitan el ítem «gratis»: lo cambian por una **penalización de performance**. El avión puede salir, pero con menos margen en despegue o aterrizaje, y eso puede costar peso, pista o ambas cosas. En la MMEL lo reconoces por frases como «Appropriate performance adjustments are applied», «AFM performance penalties are applied» u «Operations are conducted in compliance with AFM».",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "**La MMEL dice que hay penalización, no cuánto.** El número sale del AFM (y de las herramientas de performance del operador). Este módulo no da cifras: no hay valores universales.",
          "**Los sistemas que más tocan la performance** son los que frenan el avión en tierra: frenos, antiskid, reversores, spoilers y autobrake. También algunos de antihielo y sistemas que cambian la configuración o la resistencia (una compuerta que queda abierta, un tren que no se retrae).",
          "**Cambia el despegue, el aterrizaje o los dos.** Y según la pista del día (longitud, contaminación, viento) el mismo ítem puede ser irrelevante en un aeropuerto y limitante en otro.",
          "**Los ítems se vigilan entre sí.** Un sistema de frenado inoperativo puede limitar el alivio de los reversores y al revés: la FAA pone ese ejemplo exacto («inoperative components of a wheel braking system limiting the inoperability of the thrust reverser system», 8900.1, 4-692).",
        ],
      },
      { kind: "sub", text: "Cómo se ve en la MEL" },
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "Cuánto penaliza cada ítem (peso, distancia, velocidades): consultar el AFM del avión y las herramientas de performance del operador; este módulo no da cifras. Qué dice el AFM del B737 para operar con antiskid inoperativo: el AFM de la variante (la MMEL solo remite a él). El contenido de los procedimientos (M) y (O) de estos ítems: la MEL del operador (en el B737, basados en el Dispatch Deviations Guide, MMEL B-737 p. XIII).",
      },
      {
        kind: "p",
        text: "Entradas reales (MMEL FAA, no MEL de operador). Resumimos el texto de Remarks; lo entrecomillado es textual.",
      },
      ...entrada(
        `${MMEL_B737} · ítem 78-01-03 (-600 a -900ER) · p. 78-1`,
        ["Ítem", ...CAT, "Qué pide (extracto)"],
        [["Thrust Reverser Systems", "C", "2", "1", "«(M)(O) One may be inoperative provided: a) Thrust reverser is locked in forward thrust position, and b) Appropriate performance adjustments are applied.»"]],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 78-30-01 1) (ceo) · pp. 78-2 y 78-3 (rev. de página 31, 08/13/2024)`,
        ["Ítem", ...CAT, "Qué pide (extracto)"],
        [["Thrust Reverser Systems", "C", "2", "1", "(M)(O) Entre sus condiciones: «Wheel brake tachometers operate normally», «Main wheel braking system operates normally» y «Appropriate performance adjustments are applied»."]],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 32-42-01 · p. 32-10`,
        ["Ítem", ...CAT, "Qué pide (extracto)"],
        [["Main Wheel Braking Systems", "C", "4", "3", "«(M)(O) One brake may be inoperative provided: a) Minimum runway width is 148 ft. (45 meters), b) Antiskid system operates normally, [...] e) Both reversers operate normally, [...] g) AFM performance penalties are applied, h) Approach minimums do not require its use, and i) The AUTO/BRK Function is considered inoperative.»"]],
      ),
      ...entrada(
        `${MMEL_B737} · ítem 32-02-02 (-600 a -900ER) · p. 32-1`,
        ["Ítem", ...CAT, "Qué pide (extracto)"],
        [["Antiskid System", "C", "1", "0", "«(M)(O) May be inoperative provided: a) Associated Antiskid channel(s) is deactivated, and b) Operations are conducted in compliance with AFM.»"]],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 32-42-05 · p. 32-18`,
        ["Ítem", ...CAT, "Qué pide (extracto)"],
        [["Tachometer", "C", "4", "3", "(O) Entre sus condiciones: «Crosswind component is below 10 kt at departure airport and below 15 kt at arrival airport», «Takeoff runway state is no more than wet» y «AFM Performance penalties are applied»."]],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 27-64-01 1) · p. 27-11`,
        ["Ítem", ...CAT, "Qué pide (extracto)"],
        [["Spoiler Surfaces", "C", "10", "8", "«(M)(O) One pair of symmetrical surfaces 1 or 3 may be inoperative in the retracted position provided: a) SECs associated with operative spoilers operate normally, and b) AFM performance penalties are applied.»"]],
      ),
      ...entrada(
        `${MMEL_B737} · ítem 27-07-02 (-800SFP) · p. 27-6`,
        ["Ítem", ...CAT, "Qué pide (extracto)"],
        [["Auto Speed Brake System", "C", "1", "0", "«(M)(O) May be inoperative provided: a) System is deactivated, and b) Appropriate performance adjustments are applied.»"]],
      ),
      ...entrada(
        `${MMEL_B737} · ítem 32-14 (-600 a -900ER) · p. 32-4`,
        ["Ítem", ...CAT, "Qué pide (extracto)"],
        [["Gear Retraction Braking System", "C", "1", "0", "«(O) May be inoperative provided: a) After takeoff, landing gear remains extended for 2 minutes before retraction, and b) Takeoff performance is based on Landing Gear Extended.»"]],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 32-47-01 · p. 32-21`,
        ["Ítem", ...CAT, "Qué pide (extracto)"],
        [["Brake Temperature Monitoring Unit", "C", "2", "0", "«(M)(O) May be inoperative provided brake ground cooling time is applied.»"]],
      ),
      {
        kind: "p",
        text: "Fíjate en el cruce: el reversor del A320 pide frenos normales; el freno del A320 pide los dos reversores normales. **Con un reversor y un freno diferidos a la vez, ninguno de los dos alivios se cumple.**",
      },
      hueco169(
        "MEL-22-01 · Imagen anotada · 16:9 · 1600×900 px",
        "Imagen base: Recreación fiel, una encima de otra, de dos filas de la MMEL FAA A318/A319/A320/A321 Rev 32: ítem 32-42-01 Main Wheel Braking Systems (página 32-10, revisión de página 32, 07/30/2025) e ítem 78-30-01 1) Thrust Reverser Systems (páginas 78-2 y 78-3, revisión de página 31, 08/13/2024). Solo las columnas Item, 1, 2, 3 y Remarks. Anotaciones: cinco flechas sobre «e) Both reversers operate normally» (32-42-01), «h) Main wheel braking system operates normally» (78-30-01), las dos frases de penalización de performance, «a) Minimum runway width is 148 ft. (45 meters)» y «(M)(O)» en las dos filas. Objetivo: Que el piloto vea que dos alivios «legales» por separado se anulan entre sí, y que la penalización de performance vive en el AFM, no en la MEL.",
      ),
      flechas([
        ["«e) Both reversers operate normally» (en 32-42-01)", "El alivio del freno depende de que no haya ningún reversor diferido."],
        ["«h) Main wheel braking system operates normally» (en 78-30-01)", "El alivio del reversor depende de que el frenado de ruedas esté completo."],
        ["«AFM performance penalties are applied» / «Appropriate performance adjustments are applied»", "Las dos entradas cobran performance. La MMEL no dice cuánto: eso sale del AFM."],
        ["«a) Minimum runway width is 148 ft. (45 meters)»", "Condición de aeropuerto. El mismo avión, con el mismo ítem, puede ir a una pista y no a otra."],
        ["«(M)(O)» en las dos filas", "Mantenimiento desactiva y asegura; operaciones aplica su procedimiento (en el reversor del A320, hasta una frase que la tripulación debe recibir por el despacho o el procedimiento (O))."],
      ]),
      { kind: "p", text: "**Lo que dice cada flecha, en la práctica:**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Flecha 1 y 2.** Antes de aceptar el avión con un freno o un reversor diferido, mira la lista de ítems abiertos: si aparece el otro, el alivio no existe. Esto es lo que la FAA llama interrelación entre ítems (8900.1, 4-692).",
          "**Flecha 3.** La penalización se calcula con la configuración degradada. Si el cálculo de performance no la incluye, el despacho está mal hecho aunque la MEL se haya cumplido.",
          "**Flecha 4.** Hay condiciones que dependen del aeropuerto: ancho de pista, estado de la pista, viento cruzado. Se revisan para salida, destino y alternos.",
          "**Flecha 5.** El (M) no lo hace el piloto; el (O) sí le toca a la tripulación o a despacho, según el operador.",
        ],
      },
      hueco45(
        "MEL-22-02 · Esquema · 4:5 · 1080×1350 px",
        "Imagen sugerida: Perfil lateral de un despegue y un aterrizaje en una pista. Sobre el tramo de frenado, cuatro etiquetas grises: REVERSER, ANTISKID, BRAKES, SPOILERS/AUTOBRAKE. Sobre el tramo de ascenso inicial: GEAR RETRACTION. Al costado, un libro rotulado «AFM · performance» con una flecha hacia una casilla «PESO / PISTA» con signo de interrogación. Sin números. Objetivo: Ubicar en qué fase pega cada ítem y recordar que la cifra sale del AFM.",
      ),
      { kind: "sub", text: "Aplicación en la operación" },
      {
        kind: "list",
        items: [
          "**Briefing de despegue y aterrizaje.** Con un reversor diferido, el briefing incluye cómo se aplica el empuje reverso y qué margen de pista queda. El A320 lo exige por escrito: la tripulación debe recibir la frase «For a landing conducted with one deactivated thrust reverser, ensure that both engine thrust levers are retarded to the IDLE detent for the flare and the touchdown. Select both thrust levers to reverse when applying reverse thrust» (78-30-01 1), proviso i)).",
          "**Cálculo de performance.** Revisa que el cálculo del día tenga la configuración correcta (ítem diferido incluido). Si hay duda, se consulta con despacho antes de salir.",
          "**Pista contaminada o viento cruzado.** Algunas condiciones (32-42-05 del A320) limitan el estado de la pista y el viento cruzado. Un cambio de pista en servicio o un METAR nuevo puede sacarte del alivio antes del despegue.",
          "**Rotaciones cortas.** Sin monitor de temperatura de frenos, el A320 pide aplicar el tiempo de enfriamiento en tierra (32-47-01); el B737 remite a limitaciones del AFM de «Maximum Quick Turnaround Weight» (ítem 32-11A, p. 32-3). Eso pesa en el itinerario.",
          "**Antiskid en el B737.** La condición es operar «in compliance with AFM». El piloto tiene que saber qué dice el AFM de su avión para antiskid inoperativo antes de aceptar el despacho.",
        ],
      },
      { kind: "sub", text: "Error frecuente" },
      error(
        "«El reversor no cuenta en la distancia de aterrizaje, así que da igual si está diferido»",
        "Esa regla no la dice ninguna de estas entradas. Lo que sí dicen es que se apliquen **ajustes de performance** y que el resto del frenado esté **normal**. Qué cuenta y qué no en el cálculo lo define el AFM, no la intuición.",
      ),
      error("Aceptar el ítem mirando solo su fila", "En el A320, freno y reversor se vigilan entre sí."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "«Appropriate performance adjustments» y «AFM performance penalties» significan: hay que recalcular, y el número sale del AFM.",
          "Frenos, antiskid, reversores, spoilers y autobrake son los ítems que más pesan en pista.",
          "Algunas condiciones dependen del aeropuerto: ancho de pista, estado de la pista, viento.",
          "Los alivios de frenado y reversores se condicionan mutuamente: MEL + MEL no es GO.",
          "La penalización puede costar peso, pista o ambas cosas.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "MMEL FAA · 8900.1 · RAC 121",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "list",
            items: [
              "MMEL FAA A318/A319/A320/A321, Rev 32 (07/30/2025), ítems 27-64-01 1) (p. 27-11), 32-42-01 (p. 32-10), 32-42-05 (p. 32-18) y 32-47-01 (p. 32-21), páginas en revisión 32; ítem 78-30-01 1) (pp. 78-2 y 78-3, revisión de página 31, 08/13/2024).",
              "MMEL FAA B-737, Rev 63a (05/27/2026), ítems 27-07-02 (p. 27-6), 32-02-02 (p. 32-1), 32-11A (p. 32-3), 32-14 (p. 32-4), páginas en revisión 63 (04/03/2026); ítem 78-01-03 (p. 78-1; su encabezado dice «REVISION NO. 63 / DATE: 11/28/2022»).",
              "FAA Order 8900.1 Vol 4 Cap 4 Secc 3, CHG 933, 4-691C y 4-692.",
              "RAC 121 Enm. 10 (2025), p. 234 (efecto de los diferidos en la planificación).",
            ],
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: cuánto penaliza cada ítem (peso, distancia, velocidades) contra el AFM del avión y las herramientas de performance del operador. Este módulo no da cifras.",
              "VERIFICAR: qué dice el AFM del B737 para operar con antiskid inoperativo, contra el AFM de la variante (la MMEL solo remite a él).",
              "VERIFICAR: el contenido de los procedimientos (M) y (O) de estos ítems contra la MEL del operador (en el B737, basados en el Dispatch Deviations Guide, MMEL B-737 p. XIII).",
            ],
          },
        ],
      },
    ],
  },
  // ── 27 · capítulo 23 ────────────────────────────────────────────────────
  {
    n: 27,
    title: "MEL y combustible",
    kicker: "Cuando el ítem cambia lo que hay que cargar",
    minutes: 9,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Un ítem MEL puede aumentar el combustible que necesitas o cambiar cómo lo planificas. Casi nunca lo dice con la palabra «fuel»: lo dice con una **restricción de altitud**, una **restricción de velocidad**, una **configuración** que aumenta la resistencia o la obligación de **usar la APU** todo el vuelo. Todo eso termina en el plan de vuelo.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "**Limitación de altitud = más combustible.** Si la MEL te deja por debajo de un nivel, vuelas más bajo que el óptimo durante todo el crucero. La FAA pone las restricciones de altitud y las penalizaciones de combustible en la misma lista de cosas que el plan de vuelo debe considerar (8900.1, 4-691C, puntos 1 y 6).",
          "**Limitación de velocidad.** Una restricción de velocidad por debajo de cierta altitud cambia el perfil de ascenso y descenso.",
          "**Penalización aerodinámica.** Una compuerta que queda abierta o un tren que va abajo aumentan la resistencia. La MMEL lo expresa como «performance adjustments» o remitiendo a un apéndice del AFM.",
          "**APU encendida todo el vuelo.** Algunos alivios de generador exigen que la APU alimente la red eléctrica durante todo el vuelo: la APU consume combustible.",
          "**La categoría C también limita.** La FAA dice que un ítem C «may impose limitations to a flight, such as altitude restrictions, a minimum or maximum operating temperature, or fuel penalties» (8900.1, 4-685B2)c)). Categoría C no significa «sin impacto».",
        ],
      },
      { kind: "sub", text: "Cómo se ve en la MEL" },
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "La penalización de combustible de cada configuración (techo, tren abajo, compuerta abierta, APU en uso): consultar el AFM y el sistema de planificación del operador. Cómo el operador refleja la limitación MEL en el plan operacional de vuelo y en el despacho: su Manual de Operaciones.",
      },
      ...entrada(
        `${MMEL_B737} · ítem 21-01-01-01 · p. 21-1`,
        ["Ítem", ...CAT, "Qué pide (extracto textual)", "Efecto en combustible"],
        [["Air Conditioning Packs", "C", "2", "1", "«(O) Except for ETOPS, one may be inoperative provided flight altitude remains at or below FL 250.»", "Crucero más bajo"]],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 21-52-01 1) (A319 sin Mod. 30626) · p. 21-15 (rev. de página 30, 03/03/2023)`,
        ["Ítem", ...CAT, "Qué pide (extracto textual)", "Efecto en combustible"],
        [["Packs", "C", "2", "1", "«(O) Except for ETOPS, one may be inoperative provided: a) Airplane remains at or below FL 310, [...]»", "Crucero más bajo (el techo cambia según versión y modificación)"]],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 24-20-01 1) · p. 24-2 (rev. de página 31, 08/13/2024)`,
        ["Ítem", ...CAT, "Qué pide (extracto textual)", "Efecto en combustible"],
        [["Engine Driven Generator Channel", "B", "2", "1", "«(M)(O) Except for ETOPS, one may be inoperative provided: a) APU generator operates normally and is used throughout the flight, b) Operator ensures that the APU oil quantity is adequate for the intended flight, [...] f) Aircraft remains at or below FL 330, [...]»", "APU todo el vuelo y techo"]],
      ),
      ...entrada(
        `${MMEL_B737} · ítem 24-01-02 (-600 a -900ER) · p. 24-1`,
        ["Ítem", ...CAT, "Qué pide (extracto textual)", "Efecto en combustible"],
        [["Engine Driven Generator Systems", "B", "2", "1", "«(M)(O) Except for ETOPS, may be inoperative provided: APU generator operates normally and is used throughout flight.»", "APU todo el vuelo"]],
      ),
      ...entrada(
        `${MMEL_B737} · ítem 30-11-02 (-300 a -900ER) · p. 30-10`,
        ["Ítem", ...CAT, "Qué pide (extracto textual)", "Efecto en combustible"],
        [["Electrically Heated Windshields, No. 1 Window", "C", "2", "1", "Entre sus condiciones: «Airspeed is limited to 250 KIAS below 10,000 ft. MSL»", "Perfil de ascenso y descenso"]],
      ),
      ...entrada(
        `${MMEL_B737} · ítem 49-06A · p. 49-3`,
        ["Ítem", ...CAT, "Qué pide (extracto textual)", "Efecto en combustible"],
        [["APU Air Inlet Door", "C", "1", "0", "«(M)(O) May be inoperative provided: a) Door is deactivated in the fully open position, and b) Appropriate performance adjustments are applied.»", "Resistencia adicional"]],
      ),
      ...entrada(
        `${MMEL_B737} · ítem 32-16 (-600 a -900ER) · p. 32-5`,
        ["Ítem", ...CAT, "Qué pide (extracto textual)", "Efecto en combustible"],
        [["Landing Gear Actuation System", "B", "1", "0", "«(M)(O) May be inoperative provided: a) Inoperative components are secured by an accepted procedure, b) Landing gear is secured in down position, and c) Airplane is dispatched in accordance with AFM Gear Extended Appendix.»", "Vuelo con tren abajo"]],
      ),
      hueco169(
        "MEL-23-01 · Imagen anotada · 16:9 · 1600×900 px",
        "Imagen base: Recreación fiel de la fila 21-01-01-01 de la MMEL FAA B-737 Rev 63a, página 21-1 (revisión de página 63, 04/03/2026): «01 Air Conditioning Packs / 01-01 All-Passenger Configuration (All Models) / 01-01-01 (-100/-200/-300/-400/-500/-600 and -700/-800 without PATS Auxiliary Fuel Tanks) | C | 2 | 1 | (O) Except for ETOPS, one may be inoperative provided flight altitude remains at or below FL 250.» Anotaciones: cuatro flechas sobre el sub-ítem con sus variantes, «Except for ETOPS», «(O)» y «flight altitude remains at or below FL 250». Objetivo: Que el piloto lea una restricción de altitud como un dato de combustible y de planificación, no como una nota menor.",
      ),
      flechas([
        ["«01-01-01 (-100/-200/-300/-400/-500/-600 and -700/-800 without PATS Auxiliary Fuel Tanks)»", "El alivio depende de la variante y de si lleva tanques auxiliares. Primero, ¿es mi avión?"],
        ["«Except for ETOPS»", "En un vuelo ETOPS/EDTO no hay alivio."],
        ["«(O)»", "Hay procedimiento de operación; el techo tiene que llegar al plan de vuelo."],
        ["«flight altitude remains at or below FL 250»", "Techo de crucero. Cambia combustible, tiempo y, en rutas largas, puede cambiar la ruta o la escala."],
      ]),
      { kind: "p", text: "**Lo que dice cada flecha, en la práctica:**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Flecha 1.** Si el sub-ítem no es el de tu avión, esta fila no te sirve; busca la que sí.",
          "**Flecha 2.** Primera pregunta de despacho: ¿el vuelo es ETOPS/EDTO? Si lo es, se acabó el alivio.",
          "**Flecha 3.** El (O) del operador dirá cómo se planifica. El piloto verifica que el plan refleje el techo.",
          "**Flecha 4.** Revisa el plan: nivel de crucero, combustible y si el techo te pone en conflicto con terreno, meteorología o espacio aéreo de la ruta.",
        ],
      },
      hueco169(
        "MEL-23-02 · Diagrama · 16:9 · 1600×900 px",
        "Imagen sugerida: Dos perfiles verticales del mismo vuelo superpuestos. Uno en línea continua sube hasta un nivel alto rotulado «CRUCERO PLANEADO». Otro en línea discontinua se queda bajo una línea horizontal rotulada «TECHO MEL». Entre los dos, un surtidor con signo «+». Sin niveles ni cantidades concretas. Objetivo: Ver que una restricción de altitud se traduce en más combustible y más tiempo.",
      ),
      { kind: "sub", text: "Aplicación en la operación" },
      {
        kind: "list",
        items: [
          "**En el despacho.** Pregunta si el plan de vuelo ya incluye la limitación: nivel máximo, velocidad, APU en uso o configuración. La FAA espera que la limitación esté en el plan (8900.1, 4-691C) y que, si el ítem se aplica después de emitido el despacho, se enmiende (4-691D).",
          "**Generador con alivio que depende de la APU.** Revisa que el combustible de la APU esté considerado. La MMEL del A320 además pide que el operador asegure aceite suficiente de la APU «for the intended flight».",
          "**Tren abajo.** Es uno de los casos de mayor impacto: el B737 remite al «AFM Gear Extended Appendix». Combustible, techo y velocidad salen de ahí.",
          "**Si falla algo más en vuelo.** Con un techo MEL, una segunda falla puede dejarte aún más bajo o sin la fuente de respaldo que tenías. La FAA pide considerar «possible additional item failures while an aircraft is en route» (8900.1, 4-692).",
        ],
      },
      { kind: "sub", text: "Error frecuente" },
      error(
        "«El ítem es categoría C, entonces no afecta el vuelo»",
        "La categoría habla del plazo de reparación, no del impacto operacional. La propia FAA dice que un ítem C puede imponer restricciones de altitud y penalizaciones de combustible (8900.1, 4-685B2)c)).",
      ),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "La MEL rara vez dice «fuel»: lo dice con altitud, velocidad, configuración o APU.",
          "Techo de crucero = más combustible y más tiempo.",
          "Algunos alivios de generador exigen la APU todo el vuelo.",
          "Categoría C no significa «sin impacto».",
          "La limitación tiene que estar en el plan de vuelo y en el despacho.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "MMEL FAA · 8900.1",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "list",
            items: [
              "MMEL FAA B-737, Rev 63a, ítems 21-01-01-01 (p. 21-1), 24-01-02 (p. 24-1), 30-11-02 (p. 30-10), 32-16 (p. 32-5) y 49-06A (p. 49-3), páginas en revisión 63 (04/03/2026).",
              "MMEL FAA A318/A319/A320/A321, Rev 32, ítems 21-52-01 1) (p. 21-15, revisión de página 30, 03/03/2023) y 24-20-01 1) (p. 24-2, revisión de página 31, 08/13/2024).",
              "FAA Order 8900.1 Vol 4 Cap 4 Secc 3, CHG 933, 4-685B2)c), 4-691C, 4-691D y 4-692.",
            ],
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: la penalización de combustible de cada configuración (techo, tren abajo, compuerta abierta, APU en uso) contra el AFM y el sistema de planificación del operador.",
              "VERIFICAR: cómo el operador refleja la limitación MEL en el plan operacional de vuelo y en el despacho, contra su Manual de Operaciones.",
            ],
          },
        ],
      },
    ],
  },
  // ── 28 · capítulo 24 ────────────────────────────────────────────────────
  {
    n: 28,
    title: "MEL y meteorología",
    kicker: "Hielo, lluvia y condiciones en las que no se puede volar",
    minutes: 10,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Varios alivios de la MEL solo valen **si el tiempo lo permite**. La condición está escrita en Remarks: sin engelamiento conocido o pronosticado, sin humedad visible, solo de día en VMC, sin precipitación cerca del aeropuerto. Si el tiempo cambia, el alivio se cae aunque el ítem siga igual.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "p",
        text: "**Las frases que debes reconocer** (todas aparecen en las MMEL de este módulo):",
      },
      {
        kind: "list",
        items: [
          "«not operated in known or forecast icing conditions»",
          "«not operated in visible moisture»",
          "«Operations are conducted in Day VMC only» y «not conducted into known or forecast over-the-top conditions»",
          "«not operated in precipitation within 5 SM of the airport of takeoff or intended landing»",
          "«VMC exist at departure and arrival airports»",
        ],
      },
      {
        kind: "list",
        items: [
          "**«Forecast» importa.** No basta con que hoy no haya hielo en la salida: la condición cubre también lo pronosticado en la ruta.",
          "**Radar meteorológico: primero la regla, luego la MMEL.** La MMEL solo da alivio si el radar no es requerido por la regla de operación.",
          "**Windshear.** Predictivo y reactivo se cubren entre sí: el alivio de uno pide que el otro funcione o que haya procedimientos alternos.",
          "**Autopiloto y tiempo.** La NOTE 1 del autopiloto del B737 pide reparar pronto «in consideration of such factors as weather, traffic density, and effect of other inoperative systems».",
        ],
      },
      {
        kind: "norma",
        ref: "RAC 121.860",
        rac: "RAC 121, Enm. 10 (2025), p. 90",
        naturaleza: "requisito",
        texto: "En Colombia, el RAC 121.860 dice: «Todos los aviones presurizados deben tener instalado un radar meteorológico que funcione, tanto de noche como en IMC, en áreas donde se espera que existan tormentas u otras condiciones meteorológicas peligrosas.»",
      },
      { kind: "sub", text: "Cómo se ve en la MEL" },
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "El contenido de los «alternate procedures» de radar y windshear: consultar la MEL y el Manual de Operaciones del operador. Cómo define el operador «known or forecast icing conditions» para el despacho: su Manual de Operaciones y el AFM.",
      },
      ...entrada(
        `${MMEL_B737} · ítem 34-15-01A · p. 34-7`,
        ["Ítem", ...CAT, "Condición meteorológica (textual)"],
        [["Weather Radar (with Predictive Windshear)", "B", "-", "0", "«(O) May be inoperative provided: a) Weather radar is not required by 14 CFR, and b) Alternate procedures are established and used.»"]],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 34-41-01 · p. 34-17`,
        ["Ítem", ...CAT, "Condición meteorológica (textual)"],
        [["Weather Radar Systems", "D", "-", "-", "«Any in excess of those required by 14 CFR may be inoperative.»"]],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 30-11-01 1) · p. 30-1`,
        ["Ítem", ...CAT, "Condición meteorológica (textual)"],
        [["Wing Anti-Ice Control Valves", "C", "2", "0", "«(M) Except for ETOPS beyond 120 minutes, may be inoperative provided: a) Affected valves are secured in closed position, and b) Aircraft is not operated in known or forecast icing conditions.»"]],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 30-42-03 · p. 30-11`,
        ["Ítem", ...CAT, "Condición meteorológica (textual)"],
        [["Windshield Heating Systems", "C", "2", "1", "«Except for ETOPS beyond 120 minutes, one may be inoperative provided: a) Airplane is not operated in known or forecast icing conditions, and b) Approach minimums do not require its use.»"]],
      ),
      ...entrada(
        `${MMEL_B737} · ítem 30-05-02-01 · p. 30-7`,
        ["Ítem", ...CAT, "Condición meteorológica (textual)"],
        [["Left/Right Pitot Heaters", "B", "2", "1", "«Except for ETOPS beyond 120 minutes, one may be inoperative for day VMC provided: a) Aux Pitot heater operates normally, b) Airplane is not operated in visible moisture, and c) Airplane is not operated in known or forecast icing conditions.»"]],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 30-45-01 · p. 30-12`,
        ["Ítem", ...CAT, "Condición meteorológica (textual)"],
        [["Windshield Wiper Systems", "C", "2", "0", "«(O) May be inoperative provided: a) Airplane is not operated in precipitation within 5 SM of the airport of takeoff or intended landing, and b) Approach minimums do not require its use.»"]],
      ),
      ...entrada(
        `${MMEL_B737} · ítem 34-07-01 · p. 34-5`,
        ["Ítem", ...CAT, "Condición meteorológica (textual)"],
        [["Standby Attitude Indicator", "B", "1", "0", "«May be inoperative provided: a) Operations are conducted in Day VMC only, and b) Operations are not conducted into known or forecast over-the-top conditions.»"]],
      ),
      ...entrada(
        `${MMEL_B737} · ítem 34-03-02 · p. 34-4`,
        ["Ítem", ...CAT, "Condición meteorológica (textual)"],
        [["Altimeter Vibrators (Pneumatic)", "C", "2", "1", "«One may be inoperative provided VMC exist at departure and arrival airports.»"]],
      ),
      hueco169(
        "MEL-24-01 · Imagen anotada · 16:9 · 1600×900 px",
        "Imagen base: Recreación fiel del ítem 34-15-01 de la MMEL FAA B-737 Rev 63a, página 34-7 (revisión de página 63, 04/03/2026): «15 Weather Radar / 15-01 Weather Radar with Windshear Detection and Avoidance System (Predictive) Installed», con sus tres alternativas 15-01A (B · - · 0), 15-01B (C · - · 0) y 15-01C (D · - · 1). Anotaciones: cinco flechas sobre las tres letras de alternativa, «Weather radar is not required by 14 CFR», «Alternate procedures are established and used», el sistema reactivo de 15-01B y el radar restante de 15-01C. Objetivo: Que el piloto vea que un mismo sistema puede tener varias alternativas de alivio, y que la del radar depende de la regla de operación y de la meteorología prevista.",
      ),
      flechas([
        ["«15-01A · 15-01B · 15-01C»", "Tres alivios distintos para el mismo sistema. Se usa el que corresponda a lo que realmente falló y a las condiciones que se pueden cumplir."],
        ["«Weather radar is not required by 14 CFR»", "El alivio depende de la regla de operación. En Colombia, RAC 121.860."],
        ["«Alternate procedures are established and used»", "El operador tiene un procedimiento alterno. La NOTE dice que debe incluir repasar cómo evitar y cómo recuperar de una cortante de viento."],
        ["«Windshear Warning and Guidance System (Reactive) operates normally» (15-01B)", "Para el intervalo más largo (C), el sistema reactivo tiene que funcionar."],
        ["«D · - · 1 · provided one remaining weather radar operates normally» (15-01C)", "Si hay dos radares, perder uno es otra cosa: queda el otro."],
      ]),
      { kind: "p", text: "**Lo que dice cada flecha, en la práctica:**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Flecha 1.** No elijas la alternativa más cómoda: la fija mantenimiento según el defecto y la confirma la condición que sí se cumple.",
          "**Flecha 2.** Si el vuelo es de noche o en IMC por un área con tormentas esperadas, el RAC 121.860 exige radar que funcione. La pregunta no es «¿está en la MEL?», es «¿lo exige la regla para este vuelo?».",
          "**Flecha 3.** El procedimiento alterno lo escribe el operador. No se improvisa en cabina.",
          "**Flecha 4.** Si además falla el reactivo, esta alternativa ya no sirve.",
          "**Flecha 5.** Instalados «-»: la cantidad varía por avión; la MEL del operador pone el número real.",
        ],
      },
      {
        kind: "hueco",
        rotulo: "MEL-24-02 · Esquema · 1:1 · 1080×1080 px",
        descripcion: "Imagen sugerida: Cuadrícula de 2 × 3 con seis íconos meteorológicos y, debajo de cada uno, la frase en inglés tal como aparece en la MMEL, subrayada: copo de hielo («known or forecast icing conditions»), gotas en el parabrisas («visible moisture»), sol («Day VMC only»), capa de nubes con avión encima («over-the-top»), lluvia sobre una pista («precipitation within 5 SM»), nube de tormenta con radar («not required by 14 CFR»). Objetivo: Reconocer de vista las condiciones meteorológicas que anulan un alivio.",
        alto: 420,
        ratio: "1 / 1",
        anchoMax: 480,
      },
      { kind: "sub", text: "Aplicación en la operación" },
      {
        kind: "list",
        items: [
          "**En el briefing de salida.** Con un ítem de hielo o calefacción diferido, revisa el TAF de salida, destino y alternos, los pronósticos de ruta y los niveles de congelación. Si hay engelamiento pronosticado en la ruta, el alivio no aplica.",
          "**Si el tiempo cambia antes del despegue.** La MEL aplica hasta el despegue (8900.1, 4-690A). Si un nuevo pronóstico mete hielo o precipitación en la condición, se vuelve a evaluar con despacho y mantenimiento.",
          "**Si cambia en vuelo.** Ahí ya no es MEL: se maneja con el AFM y los procedimientos del operador (8900.1, 4-690C). Pero la decisión en tierra debe haber considerado ese riesgo.",
          "**Radar inoperativo.** Aunque la regla no lo exija (vuelo diurno VMC, sin tormentas esperadas), pregúntate si la ruta, la hora de llegada y la temporada lo hacen prudente. Es decisión del comandante dentro de la política del operador.",
        ],
      },
      { kind: "sub", text: "Error frecuente" },
      error(
        "«Si está en la MEL, la meteorología no importa»",
        "Es al revés: muchas entradas están escritas alrededor del tiempo. Un alivio válido a las 06:00 con cielo despejado puede no valer a las 14:00 con engelamiento pronosticado.",
      ),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Las condiciones meteorológicas están en Remarks: léelas palabra por palabra.",
          "«Forecast» incluye lo pronosticado, no solo lo que ves.",
          "El radar se alivia solo si la regla de operación no lo exige (RAC 121.860).",
          "Windshear predictivo y reactivo se respaldan: no pueden faltar los dos sin procedimiento.",
          "Si el tiempo cambia antes del despegue, se reevalúa el alivio.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "MMEL FAA · RAC 121.860 · 8900.1",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "list",
            items: [
              "MMEL FAA B-737, Rev 63a, ítems 30-05-02-01 (p. 30-7), 34-03-02 (p. 34-4), 34-07-01 (p. 34-5), 34-15-01A/B/C (p. 34-7) y 22-01B NOTE 1 (p. 22-1), páginas en revisión 63 (04/03/2026).",
              "MMEL FAA A318/A319/A320/A321, Rev 32, ítems 30-11-01 1) (p. 30-1), 30-42-03 (p. 30-11), 30-45-01 (p. 30-12) y 34-41-01 (p. 34-17), páginas en revisión 32 (07/30/2025).",
              "RAC 121 Enm. 10 (2025), 121.860 (p. 90).",
              "FAA MMEL PL-25 Rev 24, «Required by 14 CFR».",
              "FAA Order 8900.1 Vol 4 Cap 4 Secc 3, CHG 933, 4-690A y 4-690C.",
            ],
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: el contenido de los «alternate procedures» de radar y windshear contra la MEL y el Manual de Operaciones del operador.",
              "VERIFICAR: cómo define el operador «known or forecast icing conditions» para el despacho, contra su Manual de Operaciones y el AFM.",
            ],
          },
        ],
      },
    ],
  },
  // ── 29 · capítulo 25 ────────────────────────────────────────────────────
  {
    n: 29,
    title: "MEL y aproximaciones",
    kicker: "Qué mínimos y qué categorías siguen disponibles",
    minutes: 10,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "El avión puede ser **legal para volar y no tener una capacidad**. Con el autopiloto, el autoland, el autothrust o un radioaltímetro diferidos, la MEL casi siempre deja salir, pero con una condición que se repite: **«provided approach minimums do not require its use»**. Si el aeropuerto de destino o el alterno solo tienen, ese día, mínimos que exigen ese equipo, el alivio no sirve para ese vuelo.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "**La MMEL no dice «CAT II prohibido».** Dice que los mínimos que vas a usar no deben requerir el equipo. Qué equipo exige cada categoría (CAT I, II, III, autoland, RNP, GLS) lo definen el AFM, las aprobaciones del operador y su MEL.",
          "**Piensa en los mínimos del día, no en los de la carta.** Si el pronóstico en destino está por encima de los mínimos CAT I, el ítem quizá no importe. Si se espera niebla, puede decidir el despacho o el alterno.",
          "**El alterno también cuenta.** Si el alterno depende de una aproximación que requiere el equipo diferido, ese alterno no sirve igual.",
          "**Varios ítems de guiado se suman.** Autopiloto, director de vuelo, autothrust, radioaltímetro: cada uno puede quitar una capacidad distinta.",
          "**En Colombia**, el RAC 121.2725(b)(2)(iv) pide al operador que quiera crédito operacional con equipo avanzado (por ejemplo, HUD) «Establecer y documentar los procedimientos para situaciones normales y anormales y el MEL».",
        ],
      },
      { kind: "sub", text: "Cómo se ve en la MEL" },
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "Qué equipos exige cada categoría de aproximación (CAT II, CAT III, autoland, RNP AR, GLS, HUD) para cada avión: consultar el AFM, las especificaciones de operación del operador y su MEL. Los mínimos del operador para salida, destino y alterno con equipo degradado: su Manual de Operaciones.",
      },
      ...entrada(
        `${MMEL_A320} · ítem 22-10-01 · p. 22-1`,
        ["Ítem", ...CAT, "Remarks (textual)"],
        [
          ["Autopilot Systems", "C", "2", "1", "«(O) One may be inoperative provided approach minimums do not require its use.»"],
          ["", "B", "2", "0", "«(O) May be inoperative provided: a) Approach minimums do not require their use, b) Enroute operations do not require their use, and c) Number of flight segments and segment duration is acceptable to flightcrew. NOTE: Any Mode which operates normally may be used.»"],
        ],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 22-81-06 · p. 22-12`,
        ["Ítem", ...CAT, "Remarks (textual)"],
        [["Automatic Landing System (AUTOLAND)", "C", "1", "0", "«May be inoperative provided approach minimums do not require its use.»"]],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 22-30-01 1) · p. 22-3`,
        ["Ítem", ...CAT, "Remarks (textual)"],
        [["Autothrust Function", "C", "1", "0", "«(M) May be inoperative provided: a) All thrust lever sensors are verified to operate normally, and b) Approach minimums do not require its use. NOTE: Alpha floor is not available with autothrust function inoperative.»"]],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 34-42-01 1) · p. 34-18`,
        ["Ítem", ...CAT, "Remarks (textual)"],
        [["Radio Altimeter (RA) Systems", "A", "2", "1", "«(M)(O) One may be inoperative provided: a) Approach minimums do not require its use, [...] d) Repairs are made within 2 flight-days for RA 1 and within 3 flight-days for RA 2.»"]],
      ),
      ...entrada(
        `${MMEL_B737} · ítems 22-20-01 y 22-20-02 · p. 22-11`,
        ["Ítem", ...CAT, "Remarks (textual)"],
        [["Automatic Landing System: Fail Passive / Fail Operational (LAND 3)", "C", "1", "0", "«May be inoperative provided approach minimums do not require its use.»"]],
      ),
      ...entrada(
        `${MMEL_B737} · ítem 22-17B · p. 22-10`,
        ["Ítem", ...CAT, "Remarks (textual)"],
        [["Takeoff/Go-Around (TO/GA) Switches", "C", "2", "0", "Condiciones sobre despegue manual y uso de AP/FD. «NOTE: Flight director go-around and windshear guidance are not available with both TO/GA switches inoperative.»"]],
      ),
      ...entrada(
        `${MMEL_B737} · ítem 34-44 · p. 34-27`,
        ["Ítem", ...CAT, "Remarks (textual)"],
        [["Head-Up Display System (HUD)", "D", "-", "0", "«May be inoperative provided procedures do not require its use. NOTE: Any mode which operates normally may be used.»"]],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 34-30-03 · p. 34-15`,
        ["Ítem", ...CAT, "Remarks (textual)"],
        [["GNSS Landing System (GLS) Function", "D", "2", "0", "«(O) May be inoperative provided approach minimums do not require the use of GLS.»"]],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 34-36-01 · p. 34-15`,
        ["Ítem", ...CAT, "Remarks (textual)"],
        [["ILS Navigation Systems", "C", "2", "-", "«As required by 14 CFR. NOTE: GPWS Glideslope Deviation Light(s) will be inoperative with the loss of the ILS 1.»"]],
      ),
      hueco169(
        "MEL-25-01 · Imagen anotada · 16:9 · 1600×900 px",
        "Imagen base: Recreación fiel del ítem 22-10-01 Autopilot Systems de la MMEL FAA A318/A319/A320/A321 Rev 32, página 22-1 (revisión de página 32, 07/30/2025), con sus dos alternativas (C · 2 · 1 y B · 2 · 0). Anotaciones: seis flechas sobre las dos alternativas, «Approach minimums do not require its use», «Enroute operations do not require their use», la decisión de segmentos que se deja a la tripulación y el «(O)». Objetivo: Que el piloto vea cómo la MEL deja volar y a la vez recorta capacidades, y que una misma condición («approach minimums») se repite en todo el capítulo de autovuelo.",
      ),
      flechas([
        ["«C · 2 · 1»", "Uno de dos autopilotos puede faltar; el intervalo es de categoría C."],
        ["«B · 2 · 0»", "Los dos pueden faltar, pero el plazo se acorta (categoría B) y las condiciones crecen."],
        ["«Approach minimums do not require its use»", "Está en las dos alternativas. Si los mínimos que vas a usar piden autopiloto (o dos), el alivio no sirve."],
        ["«Enroute operations do not require their use»", "Aparece solo cuando faltan los dos. En ruta también hay operaciones que dependen del autopiloto."],
        ["«Number of flight segments and segment duration is acceptable to flightcrew»", "La MMEL le deja una decisión a la tripulación: cuántos tramos y de qué duración está dispuesta a volar a mano."],
        ["«(O)»", "En el A320 el alivio lleva procedimiento de operación. En el B737 (22-01A/B) el mismo alivio no lleva (O)."],
      ]),
      { kind: "p", text: "**Lo que dice cada flecha, en la práctica:**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Flechas 1 y 2.** Revisa cuál alternativa aplicó mantenimiento. No es igual tener un autopiloto que ninguno.",
          "**Flecha 3.** Cruza el ítem con los mínimos previstos en destino y alterno.",
          "**Flecha 4.** Pregunta si la ruta o el espacio aéreo dependen del autopiloto (ver capítulo 26, RVSM).",
          "**Flecha 5.** Es una decisión real de la tripulación: fatiga, tiempo, carga de trabajo, número de tramos. Se puede decir que no.",
          "**Flecha 6.** La misma función puede llevar símbolos distintos según el avión. Por eso no se generaliza entre tipos.",
        ],
      },
      hueco45(
        "MEL-25-02 · Diagrama · 4:5 · 1080×1350 px",
        "Imagen sugerida: Escalera de cuatro peldaños que baja hacia una pista entre niebla: «RNP / RNAV», «CAT I», «CAT II», «CAT III / AUTOLAND». Al lado de los peldaños inferiores, íconos de equipos en gris con candado: AP, A/THR, RA, AUTOLAND. Leyenda abajo: «Approach minimums do not require its use». Sin mínimos numéricos. Objetivo: Ver que un ítem diferido puede cerrar los peldaños bajos de la escalera sin impedir el vuelo.",
      ),
      { kind: "sub", text: "Aplicación en la operación" },
      {
        kind: "list",
        items: [
          "**Planificación.** Con un ítem de autovuelo o de aterrizaje diferido, se revisa el pronóstico en destino y alternos contra los mínimos que quedan disponibles. Si el pronóstico está cerca de mínimos bajos, puede cambiar el alterno o el combustible.",
          "**Briefing de aproximación.** Di en voz alta qué capacidad no tienes hoy: «sin autoland», «un solo autopiloto», «sin autothrust, sin alpha floor» (NOTE del 22-30-01 del A320).",
          "**Radioaltímetro.** En el A320 es categoría A con plazo en días de vuelo, y la NOTE advierte que en ciertas configuraciones un RA 1 inoperativo deja inoperativos los modos 1 a 5 del GPWS. Un ítem de aproximación puede arrastrar un sistema de alerta.",
          "**Workload.** Sin autopiloto, en un día largo con meteorología marginal, la condición «acceptable to flightcrew» es una pregunta seria, no un trámite.",
        ],
      },
      { kind: "sub", text: "Error frecuente" },
      error(
        "«Tengo alivio MEL para el autoland, entonces puedo salir a un destino con niebla»",
        "Puedes salir, pero solo si los mínimos que vas a usar (en destino y alternos) **no** requieren autoland. La MEL resolvió el despacho, no la aproximación.",
      ),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "«Approach minimums do not require its use» es la frase clave del capítulo.",
          "Legal para volar no es lo mismo que capaz de hacer cualquier aproximación.",
          "Qué equipo exige cada categoría lo dicen el AFM, las aprobaciones y la MEL del operador.",
          "Revisa destino y alternos contra las capacidades que quedan.",
          "Algunas entradas le dejan una decisión expresa a la tripulación.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "MMEL FAA · RAC 121.2725",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "list",
            items: [
              "MMEL FAA A318/A319/A320/A321, Rev 32, ítems 22-10-01 (p. 22-1), 22-30-01 1) (p. 22-3), 22-81-06 (p. 22-12), 34-30-03 y 34-36-01 (p. 34-15), 34-42-01 1) (p. 34-18), páginas en revisión 32 (07/30/2025).",
              "MMEL FAA B-737, Rev 63a, ítems 22-01A/B (p. 22-1), 22-17B (p. 22-10), 22-20-01 y 22-20-02 (p. 22-11) y 34-44 (p. 34-27), páginas en revisión 63 (04/03/2026).",
              "RAC 121 Enm. 10 (2025), 121.2725(b)(2)(iv) (pp. 241-242).",
            ],
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: qué equipos exige cada categoría de aproximación (CAT II, CAT III, autoland, RNP AR, GLS, HUD) para cada avión, contra el AFM, las especificaciones de operación del operador y su MEL.",
              "VERIFICAR: los mínimos del operador para salida, destino y alterno con equipo degradado, contra su Manual de Operaciones.",
            ],
          },
        ],
      },
    ],
  },
  // ── 30 · capítulo 26 ────────────────────────────────────────────────────
  {
    n: 30,
    title: "MEL y RVSM",
    kicker: "Qué equipo exige el espacio aéreo reducido",
    minutes: 9,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "RVSM es el espacio aéreo donde la separación vertical se reduce a 1.000 ft entre FL 290 y FL 410 (RAC 121.995(d)). Para volar ahí, el avión necesita ciertas capacidades y el operador una aprobación específica. Un ítem MEL puede dejar el avión **despachable, pero no para RVSM**: vuelas por debajo o pides autorización al ATC.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "norma",
        titulo: "Qué pide el RAC para RVSM",
        ref: "RAC 121.995(d)(1) y (d)(2)",
        rac: "RAC 121, Enm. 10 (2025), pp. 110-111",
        naturaleza: "requisito",
        texto: "Según el RAC 121.995(d)(1), el avión debe tener equipo que pueda: «(i) Indicar a la tripulación de vuelo el nivel de vuelo en que está volando; (ii) Mantener automáticamente el nivel de vuelo seleccionado; (iii) Dar alerta a la tripulación de vuelo en caso de desviación con respecto al nivel de vuelo seleccionado [...]; y (iv) Indicar automáticamente la altitud de presión.» Y (d)(2): «La Aerocivil expedirá una aprobación específica para operaciones en espacio aéreo RVSM.»",
      },
      {
        kind: "list",
        items: [
          "**Dónde lo ves en la MEL.** Las cuatro capacidades se corresponden con sistemas que tienen entrada MEL: altimetría y datos de aire, autopiloto con mantenimiento de altitud, alerta de altitud y transpondedor con reporte de altitud.",
          "**Impacto.** Nivel más bajo, más combustible, más tiempo, posible cambio de ruta y una coordinación con el ATC.",
        ],
      },
      { kind: "p", text: "**La MEL lo dice de tres maneras:**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Nombrándolo: «Enroute operations (i.e., RVSM) do not require its use».",
          "Prohibiéndolo: «RVSM operations are not conducted» o «RVSM operations are not permitted».",
          "De forma general: «Enroute operations do not require their use» (autopiloto).",
        ],
      },
      { kind: "sub", text: "Cómo se ve en la MEL" },
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "La política completa de MMEL para RVSM: consultar la FAA PL-084 Rev 1 (no descargada). Qué ítems MEL retira la aprobación RVSM del operador: su aprobación específica de la Aerocivil, el RAC 91 Parte 1 Apéndice 6 y su MEL. Cómo se indica en el plan de vuelo OACI que el avión no está aprobado para RVSM ese día: el PANS-ATM (Doc 4444) y el Manual de Operaciones del operador (no cargados).",
      },
      ...entrada(
        `${MMEL_A320} · ítem 34-42-04 · p. 34-20`,
        ["Ítem", ...CAT, "Remarks (textual)"],
        [["Altitude Alerting System", "A", "-", "0", "«(O) May be inoperative provided: a) Autopilot with altitude hold and altitude capture operates normally, b) Enroute operations (i.e., RVSM) do not require its use, c) Airplane does not depart from a designated airport (as listed in the operator's MEL) where repair or replacement can be made, and d) Repairs are made within 3 flight-days.»"]],
      ),
      ...entrada(
        `${MMEL_B737} · ítem 34-25 · p. 34-15`,
        ["Ítem", ...CAT, "Remarks (textual)"],
        [["Altitude Alerting System", "A", "1", "0", "Mismo texto que el A320."]],
      ),
      ...entrada(
        `${MMEL_B737} · ítem 30-05-01-01 (-100 a -500) · p. 30-6`,
        ["Ítem", ...CAT, "Remarks (textual)"],
        [["No. 1 Aux Pitot/Static Heater", "B", "1", "0", "«May be inoperative provided: a) No. 2 Aux Pitot Static heater operates normally, b) RVSM operations are not conducted, and c) Airplane is not operated in known or forecast icing conditions.»"]],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 34-10-01 4) ADR 2 · p. 34-8`,
        ["Ítem", ...CAT, "Remarks (textual)"],
        [["ADIRS", "C", "1", "0", "(M)(O) con cinco condiciones. «NOTE: Without Mod. 30416/ MP P6635 or 31528/ MP P7268, RVSM operations are not permitted.»"]],
      ),
      ...entrada(
        `${MMEL_B737} · ítem 22-01B · p. 22-1`,
        ["Ítem", ...CAT, "Remarks (textual)"],
        [["Autopilot Systems", "B", "-", "0", "«Except for ETOPS, may be inoperative provided: a) Approach minimums do not require their use, b) Enroute operations do not require autopilot use, and c) [...]»"]],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 34-52-01 · p. 34-25`,
        ["Ítem", ...CAT, "Remarks (textual)"],
        [["ATC Transponders and Automatic Altitude Reporting Systems", "B", "-", "0", "«May be inoperative provided: a) Operations do not require its use, and b) Prior to flight, approval is obtained from ATC facilities having jurisdiction over the planned route of flight.»"]],
      ),
      {
        kind: "p",
        text: "Las dos MMEL citan además la **PL-084** «Master Minimum Equipment List (MMEL) for Reduced Separation Minimum (RVSM) Operations», Revision 1, 08/15/1997, para el ítem de alerta de altitud (registro de aplicación de Policy Letters, A320 pp. VII-XII; B737 pp. III-X). Esa PL no está entre las fuentes cargadas.",
      },
      hueco169(
        "MEL-26-01 · Imagen anotada · 16:9 · 1600×900 px",
        "Imagen base: Recreación fiel del ítem 34-42-04 Altitude Alerting System de la MMEL FAA A318/A319/A320/A321 Rev 32, página 34-20 (revisión de página 32, 07/30/2025), primera alternativa (A · - · 0). Anotaciones: cinco flechas sobre la categoría «A» y las condiciones a), b), c) y d) de Remarks. Objetivo: Que el piloto vea en una sola entrada todo lo del capítulo: RVSM nombrado, una dependencia del autopiloto, una condición de aeropuerto y un plazo.",
      ),
      flechas([
        ["«A»", "Categoría A: el plazo está escrito en Remarks, no en la definición de la categoría."],
        ["«a) Autopilot with altitude hold and altitude capture operates normally»", "El alivio de un sistema depende de otro. Si el autopiloto también está diferido, no hay alivio."],
        ["«b) Enroute operations (i.e., RVSM) do not require its use»", "Con la alerta de altitud inoperativa, el vuelo se planifica fuera de RVSM (o donde la ruta no la exija)."],
        ["«c) Airplane does not depart from a designated airport (as listed in the operator's MEL) where repair or replacement can be made»", "Condición de aeropuerto. Si estás en una base con capacidad de reparación listada en la MEL del operador, no sales así."],
        ["«d) Repairs are made within 3 flight-days»", "El intervalo de la categoría A, contado en días de vuelo."],
      ]),
      { kind: "p", text: "**Lo que dice cada flecha, en la práctica:**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Flecha 1.** Cuenta el plazo desde lo que dice la entrada. En el sistema FAA, la categoría A no tiene un intervalo fijo (PL-25); en Colombia, el de la MEL aprobada.",
          "**Flecha 2.** Revisa la lista de diferidos buscando el autopiloto.",
          "**Flecha 3.** El plan de vuelo tiene que ir fuera del bloque RVSM, con el combustible de ese nivel.",
          "**Flecha 4.** Pregunta en qué aeropuerto estás: la MEL del operador tiene la lista.",
          "**Flecha 5.** Tres días de vuelo, no tres días calendario. La definición está en PL-25 («Flight-Day»).",
        ],
      },
      hueco169(
        "MEL-26-02 · Diagrama · 16:9 · 1600×900 px",
        "Imagen sugerida: Corte vertical del espacio aéreo con una franja sombreada rotulada «RVSM · FL 290 a FL 410». Un avión en la franja con los cuatro íconos del RAC 121.995(d)(1) (altímetro, piloto automático, campana de alerta, transpondedor). Un segundo avión, con un ícono en gris «INOP», debajo de la franja, con una flecha de combustible «+» y un globo de diálogo «ATC». Objetivo: Ver que un ítem MEL puede sacar el vuelo del bloque RVSM sin dejarlo en tierra.",
      ),
      { kind: "sub", text: "Aplicación en la operación" },
      {
        kind: "list",
        items: [
          "**Antes de aceptar el avión.** Revisa si algún diferido toca altimetría, datos de aire, autopiloto, alerta de altitud o transpondedor. Si toca, pregunta: ¿el plan va fuera de RVSM?",
          "**Plan de vuelo.** Si vuelas fuera de RVSM por un ítem MEL, cambian nivel, combustible y tiempo. El plan presentado al ATC debe reflejar la capacidad real del avión. La MMEL lo pide expresamente en otra entrada: la base de datos de navegación inoperativa exige que «The ICAO Flight Plan is updated (as required) to notify ATC of the navigation equipment status of the aircraft» (A320 34-61-01; B737 34-36-02-05).",
          "**Con el ATC.** El transpondedor inoperativo pide aprobación previa del ATC con jurisdicción sobre la ruta (A320 34-52-01; B737 34-18A).",
          "**Si falla algo en vuelo en RVSM.** Ya no es MEL: se aplican los procedimientos de contingencia del operador y del espacio aéreo.",
        ],
      },
      { kind: "sub", text: "Error frecuente" },
      error(
        "«Si el avión es despachable, puede volar a cualquier nivel»",
        "Despachable significa que la MEL se cumple para **esa operación**. Si la entrada excluye RVSM, el avión es legal por debajo del bloque y no dentro.",
      ),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "RVSM exige indicar el nivel, mantenerlo automáticamente, alertar la desviación y reportar la altitud (RAC 121.995(d)(1)).",
          "Busca en los diferidos: altimetría, datos de aire, autopiloto, alerta de altitud, transpondedor.",
          "La MEL dice «RVSM» expresamente o lo esconde en «Enroute operations do not require».",
          "Fuera de RVSM: más combustible, más tiempo, coordinación con ATC.",
          "El plan de vuelo tiene que reflejar la capacidad real del avión.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "RAC 121.995 · MMEL FAA · PL-25",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "list",
            items: [
              "RAC 121 Enm. 10 (2025), 121.995(d)(1) y (d)(2) (pp. 110-111).",
              "MMEL FAA A318/A319/A320/A321, Rev 32, ítems 34-10-01 4) (p. 34-8), 34-42-04 (p. 34-20), 34-52-01 (p. 34-25) y 34-61-01 (p. 34-34), páginas en revisión 32 (07/30/2025); registro de aplicación de Policy Letters (PL-084).",
              "MMEL FAA B-737, Rev 63a, ítems 22-01B (p. 22-1), 30-05-01-01 (p. 30-6), 34-18A (p. 34-11), 34-25 (p. 34-15) y 34-36-02-05 (p. 34-24), páginas en revisión 63 (04/03/2026); registro de aplicación de Policy Letters (PL-084).",
              "FAA MMEL PL-25 Rev 24, «Repair Category A» y «Flight-Day».",
            ],
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: la política completa de MMEL para RVSM contra la FAA PL-084 Rev 1 (no descargada).",
              "VERIFICAR: qué ítems MEL retira la aprobación RVSM del operador, contra su aprobación específica de la Aerocivil, el RAC 91 Parte 1 Apéndice 6 y su MEL.",
              "VERIFICAR: cómo se indica en el plan de vuelo OACI que el avión no está aprobado para RVSM ese día, contra el PANS-ATM (Doc 4444) y el Manual de Operaciones del operador (no cargados).",
            ],
          },
        ],
      },
    ],
  },
  // ── 31 · capítulo 27 ────────────────────────────────────────────────────
  {
    n: 31,
    title: "MEL y PBN / RNP",
    kicker: "La navegación que pide la ruta y lo que queda a bordo",
    minutes: 10,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "La navegación basada en la performance (PBN) depende de sensores (GNSS/GPS, IRS, DME), de un computador que los combine (FMC, FMGC o FMS) y de las pantallas donde la tripulación la ve. Un ítem MEL en esa cadena puede dejar el avión despachable pero sin la especificación de navegación que pide una ruta, una salida, una llegada o una aproximación.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "norma",
        titulo: "El RAC lo liga a la MEL",
        ref: "RAC 121.995(b)(1)(iii) · Apéndice 10, Parte B, B10.1",
        rac: "RAC 121, Enm. 10 (2025), pp. 110-111 y 349",
        naturaleza: "requisito",
        texto: "Para operaciones con especificación PBN, el avión debe «Contar con la información relativa a las capacidades de especificación de navegación del avión que se incluyen en la MEL» (RAC 121.995(b)(1)(iii)). Y en el Manual de Operaciones, la MEL se prepara «teniendo en cuenta [...] las operaciones concretas autorizadas (EDTO, RVSM, RNP, operaciones todo tiempo, etc.)» (RAC 121, Apéndice 10, Parte B, B10.1).",
      },
      {
        kind: "list",
        items: [
          "**Redundancia.** El RAC 121.995(e) pide que, si falla un elemento del equipo de navegación, el restante permita navegar según los requisitos. Por eso muchos alivios piden que «el otro» funcione.",
          "**La MMEL no dice qué exige cada RNP.** Dice «provided operations/procedures do not require its use» o «alternate procedures are established and used». Qué exige RNP 1, RNP APCH o RNP AR está en el AFM, las aprobaciones del operador y su MEL.",
          "**Base de datos vencida no es un ítem MEL.** Lo dicen las dos MMEL: «An out-of-currency or out-of-date navigation database is not authorized MMEL relief per 14 CFR.»",
        ],
      },
      { kind: "sub", text: "Cómo se ve en la MEL" },
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "Qué sensores y equipos exige cada especificación de navegación (RNAV, RNP 1, RNP APCH, RNP AR) para cada avión: consultar el AFM, la aprobación PBN del operador y su MEL. Cómo se indica en el plan de vuelo OACI el equipo de navegación degradado: el PANS-ATM (Doc 4444) y el Manual de Operaciones del operador (no cargados).",
      },
      ...entrada(
        `${MMEL_A320} · ítem 34-58-01 1) a) · p. 34-29`,
        ["Ítem", ...CAT, "Remarks (textual o extracto)"],
        [
          ["*** Global Positioning System", "C", "2", "1", "«(O) May be inoperative provided alternate procedures are established and used.»"],
          ["", "C", "2", "0", "«(O) May be inoperative provided: a) Alternate procedures are established and used, and b) One DME is operative.»"],
          ["", "D", "2", "0", "«May be inoperative provided procedures do not require its use.»"],
        ],
      ),
      ...entrada(
        `${MMEL_B737} · ítem 34-45 · p. 34-27`,
        ["Ítem", ...CAT, "Remarks (textual o extracto)"],
        [
          ["*** Global Positioning System (GPS) · 45A", "C", "-", "0", "«May be inoperative provided alternate procedures are established and used.»"],
          ["45B", "D", "-", "0", "«May be inoperative provided procedures do not require its use.»"],
        ],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 34-10-01 1) a) · p. 34-2`,
        ["Ítem", ...CAT, "Remarks (textual o extracto)"],
        [["ADIRS, IR 1", "C", "1", "0", "«(O) NAV Mode of IR 1 may be inoperative provided: a) IR 1 is operated in ATT mode, b) IR 2 and IR 3 are operative, c) GPS 1 is operative, d) Terrain Awareness and Warning System is considered inoperative, and e) Approach minimums do not require its use.» (Otra alternativa cambia c) por «Flight remains within radio navaids».)"]],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 22-72-01 1) · p. 22-5`,
        ["Ítem", ...CAT, "Remarks (textual o extracto)"],
        [["Flight Management System, FMS 1", "C", "1", "0", "«(O) Except for ETOPS, may be inoperative provided: a) FMS 2 is operative, and b) Operations/procedures do not require its use.»"]],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 22-75-02 · p. 22-6`,
        ["Ítem", ...CAT, "Remarks (textual o extracto)"],
        [["*** RNP pb switch", "D", "1", "0", "«May be inoperative provided operations/procedures do not require its use.»"]],
      ),
      ...entrada(
        `${MMEL_B737} · ítem 34-36-02-02 · p. 34-21`,
        ["Ítem", ...CAT, "Remarks (textual o extracto)"],
        [["FMCS, Computer", "C", "-", "1", "«May be inoperative provided it is not required to meet 14 CFR navigation requirements.»"]],
      ),
      ...entrada(
        `${MMEL_B737} · ítem 34-36-02-04-01 · p. 34-23`,
        ["Ítem", ...CAT, "Remarks (textual o extracto)"],
        [["CRT ANCDU (-300/-400/-500)", "C", "-", "0", "«NOTE: Two independent navigation systems are required for operations beyond range of radio navigation aids.»"]],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 34-61-01 · p. 34-34 (y ${MMEL_B737}, ítem 34-36-02-05, p. 34-24)`,
        ["Ítem", ...CAT, "Remarks (textual o extracto)"],
        [["Navigation Databases", "A", "-", "0", "Condiciones a) a e), incluida la actualización del plan de vuelo OACI, y «It is repaired within 10 flight-days»."]],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 34-51-01 · p. 34-25`,
        ["Ítem", ...CAT, "Remarks (textual o extracto)"],
        [["DME", "C", "2", "-", "«Any in excess of those required by 14 CFR may be inoperative.»"]],
      ),
      hueco169(
        "MEL-27-01 · Imagen anotada · 16:9 · 1600×900 px",
        "Imagen base: Recreación fiel del ítem 34-58-01 *** Global Positioning System, sub-ítem 1) a), de la MMEL FAA A318/A319/A320/A321 Rev 32, página 34-29 (revisión de página 32, 07/30/2025), con sus tres alternativas (C · 2 · 1, C · 2 · 0, D · 2 · 0). Anotaciones: cinco flechas sobre el triple asterisco, la configuración del sub-ítem y las tres alternativas con sus condiciones. Objetivo: Que el piloto vea que el alivio del GPS existe, pero que el vuelo planeado (rutas, procedimientos, aproximaciones) decide si se puede usar.",
      ),
      flechas([
        ["«***»", "El triple asterisco indica que el ítem puede no estar instalado en todos los aviones cubiertos por la MMEL (PL-25). No pasa a la MEL del operador."],
        ["«1) Aircraft not equipped with ADS-B Out Function · a) Without VOR/MKR function activated on iMMR [...]»", "El alivio depende de la configuración. Hay otros sub-ítems para aviones con ADS-B Out."],
        ["«C · 2 · 1»", "Falta un GPS, queda uno. Condición: procedimientos alternos."],
        ["«C · 2 · 0 · b) One DME is operative»", "Faltan los dos GPS. La navegación se apoya en otras fuentes; por eso se exige DME."],
        ["«D · 2 · 0 · procedures do not require its use»", "Alternativa de plazo largo, pero solo si ningún procedimiento del vuelo necesita GPS."],
      ]),
      { kind: "p", text: "**Lo que dice cada flecha, en la práctica:**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Flecha 1.** En la MEL de tu operador el ítem aparecerá sin asteriscos y ajustado a tu flota.",
          "**Flecha 2.** Primero confirma la configuración de tu avión; si tiene ADS-B Out, la NOTE del sub-ítem 2) dice: «If no GPS is available, ADS-B Transmissions are considered inoperative». Un ítem arrastra otro.",
          "**Flechas 3 y 4.** Revisa las salidas, rutas, llegadas y aproximaciones del plan: ¿alguna exige GNSS?",
          "**Flecha 5.** «Procedures do not require its use» se verifica con las cartas del día, no de memoria.",
        ],
      },
      hueco169(
        "MEL-27-02 · Esquema · 16:9 · 1600×900 px",
        "Imagen sugerida: Cadena de navegación de izquierda a derecha: tres sensores (GNSS, IRS, DME) → computador (FMS/FMGC) → pantallas (ND/PFD) → procedimiento en carta (RNP). Un eslabón en gris con «INOP». Encima de la cadena, la frase «provided operations/procedures do not require its use». Abajo, dos pistas: una con aproximación ILS (disponible) y otra con aproximación RNP (tachada). Objetivo: Ver que perder un eslabón de la cadena puede cerrar un procedimiento PBN sin dejar el avión en tierra.",
      ),
      { kind: "sub", text: "Aplicación en la operación" },
      {
        kind: "list",
        items: [
          "**Revisar el plan contra las cartas.** Con un GPS, un IRS o un FMS diferido, repasa SID, STAR, ruta y aproximación de destino y alterno. Si alguna exige una especificación PBN que el avión no cumple hoy, se cambia el procedimiento, el alterno o la ruta.",
          "**Dependencias en cadena.** El IR 1 del A320 en modo ATT pide GPS 1 operativo (o volar dentro de cobertura de radioayudas) y deja el TAWS «considered inoperative». Un ítem de navegación puede apagar un sistema de alerta.",
          "**ETOPS.** El FMS 1 del A320 no tiene alivio en ETOPS («Except for ETOPS»).",
          "**Base de datos.** Si la base de datos está inoperativa, el plan de vuelo OACI se actualiza «(as required)» para que el ATC sepa el estado real del equipo. Si está vencida, no hay alivio MEL.",
        ],
      },
      { kind: "sub", text: "Error frecuente" },
      error(
        "«Si tengo alivio para el GPS, puedo volar la ruta de siempre»",
        "El alivio vale solo si los procedimientos del vuelo no requieren el GPS o si se cumplen los procedimientos alternos. En una ruta y un destino con procedimientos RNP, esa condición puede no cumplirse.",
      ),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "PBN es una cadena: sensores, computador, pantallas y procedimiento.",
          "La MMEL no fija qué exige cada especificación RNP; lo fijan el AFM y las aprobaciones.",
          "«Operations/procedures do not require its use» se verifica contra las cartas del vuelo.",
          "Base de datos vencida: sin alivio MEL.",
          "En Colombia, la MEL debe reflejar las capacidades PBN del avión (RAC 121.995(b)(1)(iii)).",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "RAC 121.995 · MMEL FAA · PL-25",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "list",
            items: [
              "RAC 121 Enm. 10 (2025), 121.995(b)(1)(iii) y (e) (pp. 110-111); Apéndice 10, Parte B, B10.1 (p. 349).",
              "MMEL FAA A318/A319/A320/A321, Rev 32, ítems 22-72-01 1) (p. 22-5), 22-75-02 (p. 22-6), 34-10-01 1) a) (p. 34-2), 34-51-01 (p. 34-25), 34-58-01 (pp. 34-29 a 34-33) y 34-61-01 (p. 34-34), páginas en revisión 32 (07/30/2025).",
              "MMEL FAA B-737, Rev 63a, ítems 34-36-02-02 (p. 34-21), 34-36-02-04-01 (p. 34-23), 34-36-02-05 (p. 34-24) y 34-45 (p. 34-27), páginas en revisión 63 (04/03/2026).",
              "FAA MMEL PL-25 Rev 24, «Triple Asterisk (***)».",
            ],
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: qué sensores y equipos exige cada especificación de navegación (RNAV, RNP 1, RNP APCH, RNP AR) para cada avión, contra el AFM, la aprobación PBN del operador y su MEL.",
              "VERIFICAR: cómo se indica en el plan de vuelo OACI el equipo de navegación degradado, contra el PANS-ATM (Doc 4444) y el Manual de Operaciones del operador (no cargados).",
            ],
          },
        ],
      },
    ],
  },
  // ── 32 · capítulo 28 ────────────────────────────────────────────────────
  {
    n: 32,
    title: "MEL y ETOPS / EDTO",
    kicker: "Lo que se exige para volar lejos de un alterno",
    minutes: 9,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "EDTO (el término del RAC y de la OACI) y ETOPS (el término de la FAA y de las MMEL) se refieren a vuelos en los que el avión se aleja de los aeródromos alternos en ruta más allá de un umbral de tiempo. El propio RAC lo aclara: «Es posible que, en algunos documentos, al referirse a EDTO mencionen ETOPS» (RAC 121.2581, Nota). En la MEL, esos vuelos tienen reglas propias: **muchos alivios que valen en un vuelo normal no valen en EDTO**.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "**Umbral en Colombia.** Sin aprobación específica EDTO, un bimotor de turbina no opera rutas con un tiempo de desviación mayor de 60 minutos hasta un alterno en ruta (RAC 121.2581(b)(1)(i)).",
          "**Sistema significativo para EDTO.** El RAC lo define como un «Sistema de avión cuya falla o degradación podría afectar negativamente la seguridad operacional de un vuelo EDTO, o cuyo funcionamiento continuo es específicamente necesario para el vuelo y aterrizaje seguros de un avión durante una desviación EDTO» (RAC 121.001).",
          "**Qué puede hacer un ítem MEL a un vuelo EDTO:** prohibirlo, reducir el tiempo de desviación que puedes planificar, cambiar la ruta, cambiar los alternos o el combustible. Cuál de esas pasa depende de la MEL y de la aprobación EDTO del operador.",
          "**Cuánto pesa.** En el texto de la MMEL A318-A321 la expresión «Except for ETOPS» aparece 146 veces (55 de ellas como «beyond 120 minutes»); en la B-737, 91 (22).",
        ],
      },
      { kind: "p", text: "**Tres formas de escribirlo en la MMEL:**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "«Except for ETOPS, may be inoperative…»: sin alivio para ETOPS.",
          "«Except for ETOPS beyond 120 minutes, may be inoperative…»: hay alivio para ETOPS de hasta 120 minutos, no más.",
          "Una **alternativa aparte** con otra categoría y otro plazo para cubrir ETOPS (la APU del A320, capítulo 29).",
        ],
      },
      { kind: "sub", text: "Cómo se ve en la MEL" },
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "La política MMEL de ETOPS (qué significa exactamente «beyond 120 minutes» y cómo se aplica): consultar la FAA PL-040 Rev 3 (no descargada). Que los términos ETOPS de la MMEL y EDTO del RAC coinciden en umbrales y tiempos para cada avión: la aprobación EDTO del operador y la OACI Doc 10085 (no cargado).",
      },
      ...entrada(
        `${MMEL_A320} · ítem 49-10-01 1) · p. 49-1 (rev. de página 30)`,
        ["Ítem", "Cat.", "Forma", "Texto (extracto)"],
        [
          ["APU System", "C", "Alternativa aparte", "«(O) Except for ETOPS, may be inoperative.»"],
          ["", "A", "Alternativa aparte", "«(O) Except for ETOPS beyond 120 minutes, may be inoperative provided repairs are made within 4 flights.»"],
        ],
      ),
      ...entrada(
        `${MMEL_B737} · ítem 22-01B · p. 22-1`,
        ["Ítem", "Cat.", "Forma", "Texto (extracto)"],
        [["Autopilot Systems (ninguno)", "B", "Sin alivio ETOPS", "«Except for ETOPS, may be inoperative provided: [...]»"]],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 22-72-01 1) · p. 22-5`,
        ["Ítem", "Cat.", "Forma", "Texto (extracto)"],
        [["FMS 1", "C", "Sin alivio ETOPS", "«(O) Except for ETOPS, may be inoperative provided: a) FMS 2 is operative, [...]»"]],
      ),
      ...entrada(
        `${MMEL_A320} · ítem 30-42-03 · p. 30-11`,
        ["Ítem", "Cat.", "Forma", "Texto (extracto)"],
        [["Windshield Heating Systems", "C", "Hasta 120 min", "«Except for ETOPS beyond 120 minutes, one may be inoperative provided: [...]»"]],
      ),
      ...entrada(
        `${MMEL_B737} · ítem 30-05-02-01 · p. 30-7`,
        ["Ítem", "Cat.", "Forma", "Texto (extracto)"],
        [["Left/Right Pitot Heaters", "B", "Hasta 120 min", "«Except for ETOPS beyond 120 minutes, one may be inoperative for day VMC provided: [...]»"]],
      ),
      ...entrada(
        `${MMEL_B737} · ítem 24-02 · p. 24-2`,
        ["Ítem", "Cat.", "Forma", "Texto (extracto)"],
        [["APU Generator System", "C", "Sin alivio ETOPS", "«Except for ETOPS, may be inoperative.»"]],
      ),
      {
        kind: "p",
        text: "Las dos MMEL remiten a la **PL-040** «ETOPS and Polar Operations», Revision 3, 11/10/2020 (A320: aplicada, entre otros, a 49-10-01, 49-10-02, 49-30-01 y 30-42-03; B737: «As Applicable»). Esa PL no está entre las fuentes cargadas.",
      },
      {
        kind: "quote",
        text: "«a proviso may allow an item to be inoperative provided the aircraft is not operated in Extended Operations (ETOPS)»",
        source: "La FAA usa justo este caso como ejemplo de proviso (8900.1, 4-686, p. 14).",
      },
      hueco169(
        "MEL-28-01 · Imagen anotada · 16:9 · 1600×900 px",
        "Imagen base: Tres filas reales recortadas y apiladas: (1) MMEL FAA A318/A319/A320/A321 Rev 32, ítem 22-72-01 1) FMS 1, página 22-5 (revisión de página 32); (2) misma MMEL, ítem 30-42-03 Windshield Heating Systems, página 30-11 (revisión de página 32); (3) misma MMEL, ítem 49-10-01 1) APU System, página 49-1 (revisión de página 30, 03/03/2023), las dos alternativas C y A. Anotaciones: tres flechas, una por fila, sobre «Except for ETOPS», «Except for ETOPS beyond 120 minutes» y las dos alternativas de la APU. Objetivo: Que el piloto distinga las tres formas en que la MMEL limita un alivio en ETOPS y sepa que el tiempo de desviación planificado decide cuál aplica.",
      ),
      flechas([
        ["«Except for ETOPS» (fila 1)", "Sin alivio en ningún vuelo ETOPS/EDTO."],
        ["«Except for ETOPS beyond 120 minutes» (fila 2)", "Alivio en ETOPS de hasta 120 minutos. Más allá, no."],
        ["«C · Except for ETOPS» frente a «A · Except for ETOPS beyond 120 minutes · repairs are made within 4 flights» (fila 3)", "Dos alternativas para el mismo ítem. La que sirve para ETOPS tiene un plazo mucho más corto."],
      ]),
      { kind: "p", text: "**Lo que dice cada flecha, en la práctica:**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Flecha 1.** Si el vuelo es EDTO, esta entrada no te da alivio: el ítem tiene que funcionar.",
          "**Flecha 2.** La pregunta es el tiempo de desviación del plan. Si pasa de 120 minutos, no hay alivio.",
          "**Flecha 3.** Para ETOPS hasta 120 minutos hay alivio, pero con categoría A y plazo en vuelos. Se vigila cuántos quedan.",
        ],
      },
      hueco169(
        "MEL-28-02 · Diagrama · 16:9 · 1600×900 px",
        "Imagen sugerida: Mapa esquemático de una ruta sobre agua con dos aeródromos alternos en ruta y sus círculos de tiempo de desviación. En la ruta, un punto de entrada y uno de salida EDTO. Arriba, tres casillas: «Except for ETOPS → NO», «beyond 120 min → hasta 120», «alternativa aparte → otra categoría». Sin distancias ni tiempos concretos salvo el rótulo «120 min» de la MMEL. Objetivo: Relacionar la frase de la MEL con el tiempo de desviación que se planifica.",
      ),
      { kind: "sub", text: "Aplicación en la operación" },
      {
        kind: "list",
        items: [
          "**En el despacho EDTO.** Revisa cada diferido buscando «ETOPS». Si alguno dice «Except for ETOPS», el vuelo no sale como EDTO con ese ítem abierto: se repara o se cambia la ruta (si la operación lo permite).",
          "**Si dice «beyond 120 minutes».** Compara con el tiempo de desviación del plan y con lo que autoriza la aprobación EDTO del operador.",
          "**Alternos y combustible.** El RAC ata el despacho EDTO al tiempo del «sistema significativo más limitante» (RAC 121.2581(b)(3)). Si un ítem MEL cambia la capacidad de un sistema significativo, pregunta a despacho cómo afecta la ruta, los alternos y el combustible.",
          "**Verificación previa a la salida.** El RAC 121.001 nombra la verificación de servicio previa a la salida (PDSC) EDTO, que certifica personal de mantenimiento calificado para EDTO (definición «Certificador de conformidad para EDTO»). Pregunta si ya se hizo con el ítem diferido considerado.",
        ],
      },
      { kind: "sub", text: "Error frecuente" },
      error(
        "«Si el ítem tiene alivio, también vale para EDTO»",
        "La MMEL del A320 lo contradice más de cien veces. En EDTO, la redundancia que la MEL deja perder en un vuelo corto es la que necesitas si te toca desviarte lejos de todo.",
      ),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "EDTO (RAC, OACI) y ETOPS (FAA, MMEL) se usan para lo mismo en la MEL; el RAC lo aclara.",
          "«Except for ETOPS»: sin alivio. «Beyond 120 minutes»: alivio hasta 120.",
          "Algunas entradas tienen una alternativa aparte para ETOPS, con plazo más corto.",
          "Un ítem puede prohibir el vuelo EDTO, reducir el tiempo de desviación o cambiar ruta, alternos y combustible.",
          "Se revisa contra la aprobación EDTO del operador.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "RAC 121.2581 · MMEL FAA · 8900.1",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "list",
            items: [
              "RAC 121 Enm. 10 (2025), 121.001 (definiciones «Sistema significativo para EDTO» y «Certificador de conformidad para EDTO»), 121.2581 Nota, (b)(1) y (b)(3) (pp. 223-224).",
              "MMEL FAA A318/A319/A320/A321, Rev 32, ítems 22-72-01 1) (p. 22-5), 30-42-03 (p. 30-11) y 49-10-01 (p. 49-1, revisión de página 30, 03/03/2023); registro de aplicación de Policy Letters (PL-040).",
              "MMEL FAA B-737, Rev 63a, ítems 22-01B (p. 22-1), 24-02 (p. 24-2) y 30-05-02-01 (p. 30-7); registro de aplicación de Policy Letters (PL-040).",
              "FAA Order 8900.1 Vol 4 Cap 4 Secc 3, CHG 933, 4-686 (p. 14) y 4-691C (punto 15).",
              "Conteo de «Except for ETOPS» en el texto extraído de las dos MMEL (A318-A321: 146, de ellas 55 «beyond 120 minutes»; B-737: 91, de ellas 22).",
            ],
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: la política MMEL de ETOPS (qué significa exactamente «beyond 120 minutes» y cómo se aplica) contra la FAA PL-040 Rev 3 (no descargada).",
              "VERIFICAR: que los términos ETOPS de la MMEL y EDTO del RAC coinciden en umbrales y tiempos para cada avión, contra la aprobación EDTO del operador y la OACI Doc 10085 (no cargado).",
            ],
          },
        ],
      },
    ],
  },
  // ── 33 · capítulo 29 ────────────────────────────────────────────────────
  {
    n: 33,
    title: "MEL y APU: caso guía",
    kicker: "Un solo ítem, todos sus efectos en el vuelo",
    minutes: 15,
    blocks: [
      {
        kind: "p",
        text: "Este capítulo junta todo el nivel en un solo sistema. La APU parece un ítem «de comodidad», pero toca energía eléctrica, aire, arranque de motores, aeropuertos, EDTO y decisiones de desvío. Usamos las entradas reales de las dos MMEL y las comparamos.",
      },
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "La APU (Auxiliary Power Unit) es un motor pequeño en la cola que da energía eléctrica y aire (bleed) cuando los motores están apagados y, en muchos casos, en vuelo. Con la APU inoperativa, el avión depende de **fuentes externas en tierra** (energía y aire) o de los motores. La FAA la nombra en la lista de limitaciones que el plan de vuelo debe considerar: «Auxiliary power limitations» (8900.1, 4-691C, punto 19).",
      },
      { kind: "sub", text: "Las dos entradas reales" },
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "El contenido del procedimiento (O) de APU inoperativa (arranque de motores sin APU, uso de energía y aire de tierra): consultar la MEL y el FCOM del operador. Por qué el A321 con tanques adicionales exige el ACT vacío o no instalado con la APU inoperativa: la documentación Airbus del operador (la MMEL no lo explica). La política MMEL de APU en ETOPS: la FAA PL-040 Rev 3 y, para el generador de la APU, la PL-107 Rev 1 (no descargadas). Limitaciones de temperatura o de clima de cabina en tierra sin APU: el Manual de Operaciones del operador (no aparecen en las entradas de APU).",
      },
      { kind: "p", text: "**A320 · ítem 49-10-01 APU System**" },
      ...entrada(
        `${MMEL_A320} · ítem 49-10-01 APU System · p. 49-1 (revisión de página 30, 03/03/2023); sub-ítem 3) en p. 49-2`,
        ["Sub-ítem", ...CAT, "Remarks or Exceptions"],
        [
          ["1) A318/A319/A320/A321 without Mod. 163213/MP J4530", "C", "1", "0", "«(O) Except for ETOPS, may be inoperative.»"],
          ["", "A", "1", "0", "«(O) Except for ETOPS beyond 120 minutes, may be inoperative provided repairs are made within 4 flights.»"],
          ["2) A321 with Mod. 163213/MP J4530 and without Mod. 162739/MP J4335", "C", "1", "0", "«(O) Except for ETOPS, may be inoperative provided FWD ACT is empty or not installed.»"],
          ["", "A", "1", "0", "«(O) Except for ETOPS beyond 120 minutes, may be inoperative provided: a) FWD ACT is empty or not installed, and b) Repairs are made within 4 flights.»"],
          ["3) A321 with Mod. 163213/MP J4530 and with Mod. 162739/MP J4335 (p. 49-2)", "C / A", "1", "0", "Igual que 2), con «AFT 2 ACT» en lugar de «FWD ACT»."],
        ],
      ),
      { kind: "p", text: "**B737 · ítem 49-01 Auxiliary Power Unit (APU)**" },
      ...entrada(
        `${MMEL_B737} · ítem 49-01 Auxiliary Power Unit (APU) · pp. 49-1 y 49-2 (revisión de página 63, 04/03/2026)`,
        ["Sub-ítem", ...CAT, "Remarks or Exceptions"],
        [
          ["01-01A · Airplane without APU APS2000", "C", "1", "0", "«Except for ETOPS, may be inoperative provided procedures do not require its use.»"],
          ["01-01B · (mismo)", "C", "1", "0", "«(M)(O) Except for ETOPS, may be removed provided: a) Procedures do not require its use, b) APU system is deactivated, c) APU compartment is inspected after first flight and then every 100 flight hours, and d) Removed APU is accounted for in the airplane weight and balance.»"],
          ["01-02A · Airplane with APU APS2000", "C", "1", "0", "«(M) Except for ETOPS, may be inoperative provided: a) Procedures do not require its use, and b) Perform a visual inspection of tail cone area and adjacent control surfaces to confirm there is no evidence of heat damage or delamination.»"],
          ["01-02B · (mismo)", "C", "1", "0", "«(M)(O) Except for ETOPS, may be removed provided: [...] Removed APU is accounted for in the airplane weight and balance.»"],
        ],
      ),
      { kind: "sub", text: "Comparación: lo que cambia entre los dos" },
      {
        kind: "table",
        head: ["Pregunta", "A320 (49-10-01)", "B737 (49-01)"],
        rows: [
          ["¿Hay alivio en vuelo no ETOPS?", "Sí, categoría C.", "Sí, categoría C."],
          ["¿Hay alivio en ETOPS?", "Sí, hasta 120 minutos, con la alternativa A: reparar «within 4 flights».", "No. Todas las alternativas dicen «Except for ETOPS»."],
          ["¿Lleva (O)?", "Sí, en todas las alternativas.", "Solo en las de APU retirada (01-01B, 01-02B). La 01-01A no lleva (O) ni (M)."],
          ["¿Lleva (M)?", "No en 49-10-01.", "Sí en 01-02A (inspección de la cola por daño térmico) y en las de APU retirada."],
          ["¿Condición de configuración?", "A321 con tanques adicionales (ACT): el tanque indicado debe ir vacío o no instalado.", "El modelo de APU (APS2000 o no) cambia la alternativa."],
          ["¿Condición de «procedimientos»?", "No en el texto.", "«Procedures do not require its use» en todas."],
          ["¿Peso y balance?", "No aparece.", "Si la APU se retira, se refleja en el peso y balance."],
        ],
      },
      {
        kind: "definicion",
        text: "Lo que te enseña la comparación: **el mismo sistema, con el mismo número instalado y requerido (1 y 0), tiene alivios distintos según el avión.** No se generaliza entre tipos.",
      },
      hueco169(
        "MEL-29-01 · Imagen anotada · 16:9 · 1600×900 px",
        "Imagen base: Recreación fiel de la página 49-1 de la MMEL FAA A318/A319/A320/A321 Rev 32 (encabezado de página: «REVISION NO. 30 / DATE: 03/03/2023 / PAGE NO. 49-1 / 49. Airborne Auxiliary Power»), ítem 49-10-01 APU System, sub-ítems 1) y 2) con sus alternativas C y A. Anotaciones: siete flechas sobre la revisión de página, la configuración del sub-ítem 1), «C · 1 · 0», «(O)», «Except for ETOPS», la alternativa A para ETOPS y la condición del FWD ACT del sub-ítem 2). Objetivo: Que el piloto lea una entrada de APU completa: configuración, categoría, (O), EDTO y condiciones de combustible, antes de decir «la APU no es requerida».",
      ),
      flechas([
        ["«REVISION NO. 30 · DATE: 03/03/2023»", "La MMEL es Rev 32, pero esta página está en Rev 30. Cada página lleva su revisión."],
        ["«1) A318/A319/A320/A321 without Mod. 163213/MP J4530»", "Primero la configuración. Un A321 con esa modificación usa el sub-ítem 2) o 3)."],
        ["«C · 1 · 0»", "Una APU instalada, cero requeridas, plazo de categoría C. Solo si se cumple Remarks."],
        ["«(O)»", "Hay procedimiento de operación en todas las alternativas."],
        ["«Except for ETOPS»", "La alternativa C no sirve para ETOPS."],
        ["«A · Except for ETOPS beyond 120 minutes · repairs are made within 4 flights»", "La alternativa para ETOPS de hasta 120 minutos, con plazo en vuelos."],
        ["«FWD ACT is empty or not installed» (sub-ítem 2)", "Condición de configuración de combustible en el A321 con tanque adicional."],
      ]),
      hueco169(
        "MEL-29-02 · Imagen anotada · 16:9 · 1600×900 px",
        "Imagen base: Recreación fiel de la página 49-1 de la MMEL FAA B-737 Rev 63a (encabezado: «REVISION NO. 63 / DATE: 04/03/2026 / PAGE NO. 49-1 / 49. Airborne Auxiliary Power»), ítem 01 Auxiliary Power Unit (APU), filas 01-01A, 01-01B y 01-02A. Anotaciones: seis flechas sobre el modelo de APU, las letras de alternativa, «Except for ETOPS», «procedures do not require its use», la inspección (M) de 01-02A y el peso y balance de 01-01B. Objetivo: Comparar con el A320 y ver que el mismo sistema tiene alivios distintos en cada tipo.",
      ),
      flechas([
        ["«01-01 Airplane without APU APS2000 · 01-02 Airplane with APU APS2000»", "El modelo de APU decide la fila."],
        ["«01-01A · 01-01B»", "La letra marca alternativas del mismo ítem: inoperativa (A) o retirada (B)."],
        ["«Except for ETOPS» (en las tres filas)", "En el B737 no hay alivio de APU para ETOPS en este ítem."],
        ["«procedures do not require its use»", "Si algún procedimiento del vuelo depende de la APU, el alivio no aplica."],
        ["«(M) · b) Perform a visual inspection of tail cone area [...] heat damage or delamination» (01-02A)", "Mantenimiento inspecciona antes de usar el alivio. El piloto no lo hace."],
        ["«d) Removed APU is accounted for in the airplane weight and balance» (01-01B)", "Si la APU se retiró, el peso y balance cambia."],
      ]),
      { kind: "p", text: "**Lo que dicen las flechas de las dos imágenes, en la práctica:**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Revisión de página y configuración.** Confirma que la MEL del operador está vigente y que el sub-ítem es el de tu avión (modificación, modelo de APU, tanques).",
          "**Categoría.** En el A320, si el vuelo es ETOPS hasta 120 minutos, cuenta los vuelos que quedan del plazo de la alternativa A.",
          "**(M) y (O).** Pregunta si el (M) está firmado y qué pide el (O) del operador. El contenido del (O) no está en la MMEL.",
          "**EDTO.** Si el vuelo es EDTO: en el B737 este ítem no da alivio; en el A320, solo hasta 120 minutos.",
          "**«Procedures do not require its use».** Recorre el vuelo: arranque, rodaje, clima de cabina, alterno. Si algo depende de la APU, no se cumple.",
        ],
      },
      { kind: "sub", text: "Las preguntas que hace un piloto con la APU diferida" },
      {
        kind: "apartado",
        titulo: "1. ¿Puedo despachar?",
        parrafos: [
          "En un vuelo no ETOPS, las dos MMEL tienen alivio de categoría C, siempre que se cumpla todo Remarks y que la MEL del operador lo tenga igual o más restrictivo. En ETOPS/EDTO: A320 solo hasta 120 minutos (alternativa A); B737, no.",
        ],
      },
      {
        kind: "apartado",
        titulo: "2. ¿Qué categoría y qué plazo?",
        parrafos: [
          "C en el sistema FAA: 10 días calendario consecutivos sin contar el día del descubrimiento (PL-25). La alternativa A del A320: «within 4 flights». En Colombia rigen los intervalos de la MEL aprobada del operador.",
        ],
      },
      {
        kind: "apartado",
        titulo: "3. ¿Hay (M)?",
        parrafos: [
          "A320 49-10-01: no. B737 01-02A: sí (inspección de la zona de la cola). B737 01-01B y 01-02B (APU retirada): sí, desactivación e inspecciones del compartimiento.",
        ],
      },
      {
        kind: "apartado",
        titulo: "4. ¿Hay (O)?",
        parrafos: [
          "A320: sí, en todas las alternativas. B737: solo en las de APU retirada. Qué dice el (O) lo define el operador (en el B737, a partir del Dispatch Deviations Guide, MMEL p. XIII).",
        ],
      },
      {
        kind: "apartado",
        titulo: "5. ¿Necesito aire externo?",
        parrafos: [
          "Sin APU, no hay aire de la APU para arrancar motores ni para acondicionar la cabina en tierra. La MMEL no escribe «ground air required» en 49-10-01 ni en 49-01. Sí muestra la dependencia en entradas vecinas del B737: la válvula de purga de la APU inoperativa abierta exige que «APU bleed air is not used for engine start on ground» (49-09-01A, p. 49-5), y un indicador de EGT de la APU inoperativo limita la APU a «supply electrical power and for starting one engine only» (49-05-01, p. 49-3). Cómo se arranca sin APU (aire de tierra, arranque cruzado) lo dice el procedimiento del operador.",
        ],
      },
      {
        kind: "apartado",
        titulo: "6. ¿Necesito energía externa?",
        parrafos: [
          "En tierra, sin APU, la energía llega de la planta externa o de los motores. El A320 lo muestra en su NOTE del generador de la APU: «When GPCU/Ground Power Control Function of the GAPCU and APU generator are both inoperative, engines cannot be started» (24-20-02, p. 24-14, revisión de página 31). Con APU y control de energía externa perdidos a la vez, el avión no arranca.",
        ],
      },
      {
        kind: "apartado",
        titulo: "7. ¿Qué limitaciones de aeropuerto aparecen?",
        parrafos: [
          "Las entradas de APU no nombran aeropuertos. El impacto es práctico: si en la salida, el destino o el alterno no hay energía y aire de tierra disponibles, el avión puede quedar sin forma de arrancar o de climatizar la cabina. Eso se pregunta a despacho antes de salir.",
        ],
      },
      {
        kind: "apartado",
        titulo: "8. ¿Cómo arranco?",
        parrafos: [
          "Según el procedimiento (O) y el FCOM del operador. La MMEL solo deja ver las condiciones: por ejemplo, en el A320, la bomba de combustible de la APU inoperativa permite arrancar la APU «using A.C. boost pump feeding left fuel manifold» (NOTE de 49-30-01, p. 49-2).",
        ],
      },
      {
        kind: "apartado",
        titulo: "9. ¿Afecta EDTO?",
        parrafos: [
          "Sí, y es la diferencia más clara entre los dos aviones (pregunta 1). Además, en las dos MMEL el generador de la APU inoperativo tampoco tiene alivio para ETOPS en sus alternativas generales (A320 24-20-02: «Except for ETOPS» o «Except for ETOPS beyond 120 minutes»; B737 24-02: «Except for ETOPS, may be inoperative»).",
        ],
      },
      {
        kind: "apartado",
        titulo: "10. ¿Importa la temperatura?",
        parrafos: [
          "Las entradas de APU no ponen un límite de temperatura. Pero sin APU, el aire acondicionado en tierra depende del equipo de tierra o de los motores. En un aeropuerto caliente, eso puede cambiar el embarque y el tiempo en tierra. VERIFICAR la política del operador.",
        ],
      },
      {
        kind: "apartado",
        titulo: "11. ¿Qué pasa en el destino?",
        parrafos: [
          "El vuelo de vuelta empieza sin APU. Pregunta si el destino tiene energía y aire de tierra, y si allá hay mantenimiento para reparar dentro del plazo.",
        ],
      },
      {
        kind: "apartado",
        titulo: "12. ¿Y si me desvío?",
        parrafos: [
          "En un desvío, el alterno puede no tener equipo de tierra. Y la APU deja de estar disponible como respaldo si falla un generador en vuelo. Las dos MMEL condicionan el alivio de un generador de motor a que el de la APU «operates normally and is used throughout the flight» (A320 24-20-01 1), p. 24-2; B737 24-01-02, p. 24-1). **Con la APU diferida, ese alivio ya no se puede usar si mañana falla un generador de motor.**",
        ],
      },
      hueco169(
        "MEL-29-03 · Diagrama · 16:9 · 1600×900 px",
        "Imagen sugerida: La APU en el centro, en gris con «INOP». De ella salen cuatro líneas punteadas hacia: «ELECTRICAL (APU GEN)», «BLEED AIR», «ENGINE START», «ETOPS/EDTO». Cada línea termina en una pregunta corta: «¿GPU en tierra?», «¿aire de tierra?», «¿cómo arranco?», «¿vuelo EDTO?». Abajo, un segundo ítem en gris, «ENG GEN», con un signo de alerta y el texto «su alivio pide la APU». Objetivo: Ver que la APU sostiene otras cosas: energía, aire, arranque, EDTO y el alivio de otros ítems.",
      ),
      { kind: "sub", text: "Aplicación en la operación" },
      {
        kind: "enLaOperacion",
        momento: "En la línea",
        rotulo: "Escenario de práctica",
        texto: "Ejemplo de razonamiento en la línea (Aeronave de ejemplo, bimotor de corto alcance, vuelo no EDTO, salida de madrugada, destino con equipo de tierra):",
        pasos: [
          "El tech log muestra la APU diferida por MEL, categoría C, con (O).",
          "Confirmas la configuración y que el vuelo no es EDTO.",
          "Preguntas por el (O): arranque sin APU, procedimiento en tierra.",
          "Revisas la lista de diferidos: ¿hay algún generador de motor diferido? Si lo hay, su alivio pedía la APU: MEL + MEL no es GO.",
          "Preguntas si salida, destino y alterno tienen energía y aire de tierra.",
          "Revisas el plazo de reparación y dónde se puede reparar.",
          "Briefing: sin APU como respaldo eléctrico ni neumático en vuelo.",
        ],
      },
      { kind: "sub", text: "Error frecuente" },
      error(
        "«La APU no es requerida para el despacho (Req. 0), entonces no importa»",
        "El cero es condicional: en el A320 y en el B737 no aplica igual en EDTO, en el A321 depende de los tanques adicionales, en el B737 depende de que los procedimientos no la requieran, y además condiciona el alivio de otros ítems (el generador de motor).",
      ),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Installed 1, Required 0 no significa «da igual»: se lee todo Remarks.",
          "A320: alivio C sin ETOPS y alivio A para ETOPS hasta 120 minutos (4 vuelos). B737: sin alivio para ETOPS.",
          "Sin APU, dependes de energía y aire de tierra: pregunta por salida, destino y alterno.",
          "La APU es la condición de otros alivios (generador de motor).",
          "Mismo sistema, alivios distintos en cada avión: no se generaliza.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "MMEL FAA · PL-25 · 8900.1",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "list",
            items: [
              "MMEL FAA A318/A319/A320/A321, Rev 32 (07/30/2025), ítems 49-10-01 (pp. 49-1 y 49-2) y 49-30-01 (p. 49-2), páginas en revisión 30 (03/03/2023); ítems 24-20-01 1) (p. 24-2) y 24-20-02 1) (p. 24-14), páginas en revisión 31 (08/13/2024).",
              "MMEL FAA B-737, Rev 63a (05/27/2026), ítems 49-01-01A, 49-01-01B, 49-01-02A, 49-01-02B, 49-05-01 y 49-09-01A (pp. 49-1 a 49-5), 24-01-02 (p. 24-1) y 24-02 (p. 24-2), páginas en revisión 63 (04/03/2026); página XIII (Guidelines for (M) and (O) Procedures).",
              "FAA MMEL PL-25 Rev 24, «Repair Category C», «Day of Discovery».",
              "FAA Order 8900.1 Vol 4 Cap 4 Secc 3, CHG 933, 4-691C (punto 19).",
            ],
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: el contenido del procedimiento (O) de APU inoperativa (arranque de motores sin APU, uso de energía y aire de tierra) contra la MEL y el FCOM del operador.",
              "VERIFICAR: por qué el A321 con tanques adicionales exige el ACT vacío o no instalado con la APU inoperativa, contra la documentación Airbus del operador (la MMEL no lo explica).",
              "VERIFICAR: la política MMEL de APU en ETOPS contra la FAA PL-040 Rev 3 y, para el generador de la APU, la PL-107 Rev 1 (no descargadas).",
              "VERIFICAR: limitaciones de temperatura o de clima de cabina en tierra sin APU, contra el Manual de Operaciones del operador (no aparecen en las entradas de APU).",
            ],
          },
        ],
      },
    ],
  },
]
