/**
 * Nivel 5 · Práctica y entrevista (lecciones 34 a 40, capítulos 30 a 32 y 37 a 40 de la especificación).
 *
 * Se usa todo lo anterior: una entrada real leída flecha por flecha, casos
 * para decidir si se sale o no, casos operacionales con entradas reales, los
 * errores que más se oyen en entrevista, lo que hay que llevar memorizado,
 * las preguntas típicas en inglés y un simulador de diez ejercicios.
 *
 * OJO: los capítulos de este nivel no son correlativos. La lección es el
 * orden del archivo; el capítulo va en el comentario de cada una (y en
 * MEL_CAPITULOS de index.ts), solo para encontrar su texto.
 *
 * Fuente: docs/mel/nivel-5.md, entero. Cómo se pasó cada capítulo:
 *
 * - 30: la imagen anotada es un hueco y sus flechas van como texto debajo;
 *   la entrada real, en tabla con su cita visible.
 * - 31: cada tarjeta en tabla y el análisis tras el botón (`piensaComoPiloto`).
 * - 32: cada caso con su entrada real en tabla, la cita debajo y el análisis
 *   por aspecto (alivio, condiciones, (M), (O), meteorología...).
 * - 37: cada error con su corrección y su fuente.
 * - 38: los 22 puntos, en sus dos bloques.
 * - 39: las veinte preguntas en `entrevista`, con la línea en español.
 * - 40: cada ejercicio con su entrada en tabla y las diez respuestas tras un
 *   botón cada una (`escenario`).
 *
 * Las entradas inventadas van sobre la «Aeronave de ejemplo» y rotuladas como
 * escenario de práctica. Lo que el Markdown marca VERIFICAR sale en un callout
 * visible y, completo, en el detalle técnico de FUENTES. El formato de los
 * bloques y de los huecos está documentado al inicio de index.ts.
 */

import type { DocBlockData, DocScreen } from "@/lib/docBlocks"

/** El aviso visible de lo que no está en las fuentes cargadas. */
function verificar(text: string): DocBlockData {
  return { kind: "callout", tone: "verificar", title: "Verificar", text }
}

/** La cita de una entrada, visible debajo de su tabla. */
function cita(text: string): DocBlockData {
  return { kind: "p", text: `**Cita:** ${text}` }
}

/** El rótulo de toda entrada inventada. */
const CITA_EJEMPLO = cita(
  "entrada inventada sobre la «Aeronave de ejemplo» (bimotor turbofán de transporte). Escenario de práctica: no corresponde a ningún avión ni operador.",
)

/** El cierre de cada lección. */
function enPocasPalabras(items: string[]): DocBlockData {
  return { kind: "summary", title: "En pocas palabras", items }
}

/** El detalle técnico de FUENTES de cada lección. */
function fuentes(citaCorta: string, verificado: string[], porVerificar: string[] = []): DocBlockData {
  const bloques: DocBlockData[] = [
    { kind: "sub", text: "Verificado" },
    { kind: "list", items: verificado },
  ]
  if (porVerificar.length > 0) {
    bloques.push({ kind: "sub", text: "Por verificar" }, { kind: "list", items: porVerificar })
  }
  return { kind: "detalleTecnico", etiqueta: "Fuentes", cita: citaCorta, bloques }
}

/** Los plazos del nivel: son del sistema FAA; en Colombia manda la MEL aprobada. */
const PLAZOS_FAA: DocBlockData = {
  kind: "callout",
  tone: "info",
  title: "Plazos",
  text: "Los plazos siguen el sistema FAA (PL-25); en Colombia rigen los de la MEL aprobada del operador.",
}

// ── Capítulo 31 ─────────────────────────────────────────────────────────────

/** Un caso de «¿Podemos salir?»: la tarjeta a la vista y el análisis tras el botón. */
function podemosSalir(c: {
  n: number
  titulo: string
  datos: [string, string][]
  analisis: string[]
  respuesta: string
}): DocBlockData[] {
  return [
    { kind: "sub", text: `Caso ${c.n}: ${c.titulo}` },
    { kind: "table", head: ["Campo", "Dato"], rows: c.datos.map(([k, v]) => [k, v]) },
    CITA_EJEMPLO,
    {
      kind: "piensaComoPiloto",
      momento: `Caso ${c.n}`,
      rotulo: "Escenario de práctica",
      situacion: "Lee la tarjeta de arriba y crúzala con este vuelo concreto.",
      pregunta: "¿Podemos salir? Decide antes de abrir el análisis: sí con condiciones, no, o falta información.",
      respuesta: `**Respuesta:** ${c.respuesta}`,
      claves: c.analisis,
    },
  ]
}

// ── Capítulo 37 ─────────────────────────────────────────────────────────────

/** Un error frecuente: lo que se oye (alerta), la corrección y de dónde sale. */
function errorFrecuente(n: number, frase: string, correccion: string, fuente: string): DocBlockData[] {
  return [
    { kind: "callout", tone: "warn", title: `Error ${n}`, text: `«${frase}»` },
    { kind: "p", text: `**Corrección:** ${correccion}` },
    { kind: "p", text: `**Fuente:** ${fuente}` },
  ]
}

// ── Capítulo 40 ─────────────────────────────────────────────────────────────

const PREGUNTAS_SIMULADOR = [
  "¿Qué sistema es?",
  "¿Qué categoría tiene y hasta cuándo va el plazo?",
  "¿Cuántos hay instalados?",
  "¿Cuántos se requieren para despacho?",
  "¿Hay (M)? ¿Está cumplido?",
  "¿Hay (O)? ¿Qué le toca a la tripulación?",
  "¿Qué condiciones hay y se cumplen hoy?",
  "¿Qué impacto tiene en el vuelo?",
  "¿Qué más hay que consultar?",
  "¿Hay elementos suficientes para decidir? ¿Cuál es la decisión?",
] as const

type Diez = [string, string, string, string, string, string, string, string, string, string]

const COLUMNAS_SIMULADOR = ["Seq.", "Item", "Cat.", "Inst.", "Req.", "Remarks or Exceptions"]

/** Un ejercicio del simulador: la entrada y la situación a la vista, las diez soluciones plegadas. */
function ejercicio(c: {
  n: number
  titulo: string
  filas: string[][]
  situacion: string
  soluciones: Diez
}): DocBlockData[] {
  return [
    { kind: "sub", text: `Ejercicio ${c.n}: ${c.titulo}` },
    { kind: "table", head: COLUMNAS_SIMULADOR, rows: c.filas },
    CITA_EJEMPLO,
    {
      kind: "escenario",
      titulo: `Ejercicio ${c.n}: responde las diez preguntas`,
      situacion: c.situacion,
      preguntas: c.soluciones.map((a, i) => ({ q: `${i + 1}. ${PREGUNTAS_SIMULADOR[i] ?? ""}`, a })),
    },
  ]
}

export const NIVEL_5: DocScreen[] = [
  // ── 34 · capítulo 30 ────────────────────────────────────────────────────
  {
    n: 34,
    title: "Una entrada real, flecha por flecha",
    kicker: "Ejemplo visual completo",
    minutes: 9,
    blocks: [
      {
        kind: "p",
        text: "Aquí se usa todo lo anterior. Primero una entrada real leída flecha por flecha; luego casos para decidir si se sale o no, seis casos operacionales con entradas reales de las MMEL de la FAA, los errores que más se oyen en entrevista, lo que hay que llevar memorizado, las preguntas típicas en inglés y un simulador de diez ejercicios.",
      },
      { kind: "p", text: "Dos reglas para todo el nivel:" },
      {
        kind: "list",
        items: [
          "Las entradas **reales** son de las MMEL de la FAA (MMEL FAA A318-A321 Rev 32 y MMEL FAA B-737 Rev 63a). Son la lista maestra del tipo, **no la MEL de un operador**. La MEL de tu aerolínea puede ser más restrictiva, nunca menos (FAA Order 8900.1 Vol 4 Cap 4 Secc 3, 4-682; SRVSOP MIA PIV-VI-C7 3.17).",
          "Las entradas **inventadas** van sobre una «Aeronave de ejemplo» (bimotor turbofán de transporte). No corresponden a ningún avión ni operador.",
          "Los plazos de las categorías A, B, C y D son del sistema FAA (PL-25 Rev 24). El RAC no los define: en Colombia aplican los que establezca la MEL del operador aprobada por la UAEAC.",
        ],
      },
      {
        kind: "hueco",
        rotulo: "MEL-30-01 · Imagen anotada · 4:5 · 1080×1350 px",
        descripcion:
          "Imagen base: recreación fiel (misma tipografía de tabla, mismas columnas) de la página 32-1 de la MMEL FAA B-737, Rev 63a, capítulo 32 Landing Gear, filas 01 (Gear Seal Warning System) y 02 Antiskid System con sus sub-ítems 02-01 y 02-02. Encabezado completo de la página: «U.S. DEPARTMENT OF TRANSPORTATION / FEDERAL AVIATION ADMINISTRATION MASTER MINIMUM EQUIPMENT LIST / REVISION NO. 63 / DATE: 04/03/2026 / PAGE NO. 32-1 / AIRCRAFT: Boeing B-737 / TABLE KEY 1. REPAIR CATEGORY 2. NO. INSTALLED 3. NO. REQUIRED FOR DISPATCH 4. REMARKS OR EXCEPTIONS / 32. Landing Gear». La fila 02-02 resaltada con un fondo suave del acento del módulo; el resto en gris. Doce flechas, explicadas debajo. Objetivo: que el piloto vea que una fila que parece «1 / 0, se puede» es en realidad un paquete de condiciones, y que aprenda a recorrerla siempre en el mismo orden.",
        alto: 420,
        ratio: "4 / 5",
        anchoMax: 420,
      },
      {
        kind: "kv",
        items: [
          { k: "Flecha 1 · «REVISION NO. 63 / DATE: 04/03/2026»", v: "Revisión y fecha de esta página, que no es la del documento (Rev 63a, 05/27/2026)." },
          { k: "Flecha 2 · «PAGE NO. 32-1» y «32. Landing Gear»", v: "Capítulo ATA 32, tren de aterrizaje. Es la puerta de entrada al sistema." },
          { k: "Flecha 3 · «02 Antiskid System»", v: "Número de secuencia y nombre del ítem." },
          { k: "Flecha 4 · «02-02 (-600/-700/-800/-900/-900ER)»", v: "Sub-ítem por configuración. Solo aplica a esos modelos." },
          { k: "Flecha 5 · «C» (columna 1)", v: "Categoría de reparación." },
          { k: "Flecha 6 · «1» (columna 2)", v: "Número instalado." },
          { k: "Flecha 7 · «0» (columna 3)", v: "Número requerido para despacho." },
          { k: "Flecha 8 · «(M)(O)»", v: "Hay procedimiento de mantenimiento y procedimiento operacional." },
          { k: "Flecha 9 · «May be inoperative provided:»", v: "La autorización existe solo si se cumplen los provisos que siguen." },
          { k: "Flecha 10 · «a) Associated Antiskid channel(s) is deactivated»", v: "Condición física que cumple mantenimiento." },
          { k: "Flecha 11 · «b) Operations are conducted in compliance with AFM»", v: "Condición de operación que cumple la tripulación." },
          { k: "Flecha 12 · «***» junto a la fila 01", v: "Ítem que no está instalado en todos los aviones cubiertos por la MMEL." },
        ],
      },
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Una entrada completa y corta de una MMEL oficial: el sistema antiskid del B737. Se eligió porque tiene todo lo que trae una entrada de verdad (capítulo, ítem, configuración, categoría, números, (M), (O) y provisos) sin ocupar varias páginas.",
      },
      {
        kind: "p",
        text: "Es una **MMEL de la FAA para el tipo B737**, no la MEL de una aerolínea. Sirve para aprender a leer; en la línea se lee la MEL aprobada del operador.",
      },
      { kind: "sub", text: "Cómo se ve en la MMEL" },
      {
        kind: "table",
        head: ["Sequence No.", "Item", "1", "2", "3", "4. Remarks or Exceptions"],
        rows: [
          ["01 ***", "Gear Seal Warning System (-100/-200)", "C", "1", "0", "(M) May be inoperative provided gear seal function is checked once each flight-day."],
          ["02", "Antiskid System", "", "", "", ""],
          ["02-01", "(-100/-200/-300/-400/-500)", "C", "1", "0", "(O) May be inoperative provided operations are conducted in compliance with AFM."],
          [
            "02-02",
            "(-600/-700/-800/-900/-900ER)",
            "C",
            "1",
            "0",
            "(M)(O) May be inoperative provided: a) Associated Antiskid channel(s) is deactivated, and b) Operations are conducted in compliance with AFM.",
          ],
        ],
      },
      cita("MMEL FAA B-737, Rev 63a, página 32-1 (encabezado de la página: REVISION NO. 63, DATE 04/03/2026), textual."),
      { kind: "sub", text: "Qué dice cada flecha" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Revisión de la página (REVISION NO. 63, 04/03/2026).** Cada página de una MMEL lleva su propia revisión. La MMEL completa está en la Rev 63a, pero la tabla de contenido lista el capítulo 32 como «63 04/03/2026». Qué mira el piloto: que su MEL esté en la revisión vigente del operador. Por qué importa: una entrada vieja puede tener condiciones distintas.",
          "**ATA 32, Landing Gear.** El antiskid es parte del sistema de frenos, que en ATA está en el capítulo del tren. Qué mira el piloto: el capítulo para llegar rápido al ítem. Por qué importa: buscar por el nombre del mensaje de falla a veces no lleva al ítem correcto.",
          "**02 Antiskid System.** Es el ítem: el sistema completo. Qué mira el piloto: que el defecto del tech log sea exactamente este ítem y no otro parecido (p. ej. la válvula del freno de parqueo, ítem 03, que tiene sus propias condiciones).",
          "**02-02 y su configuración.** El mismo sistema tiene dos alivios según el modelo. Qué mira el piloto: su modelo. Por qué importa: un -800 no puede usar la fila 02-01, que no pide (M). Usar la fila equivocada es usar un alivio que no existe para ese avión.",
          "**Categoría C.** Según FAA (PL-25 Rev 24): reparar dentro de 10 días calendario consecutivos (240 h), excluyendo el día del descubrimiento. En Colombia, el plazo que diga la MEL aprobada del operador. Qué mira el piloto: la fecha límite en el tech log.",
          "**Instalado 1.** El avión tiene un sistema antiskid (con sus canales).",
          "**Requerido 0.** Se puede salir sin él, **siempre que se cumplan los Remarks**. El «0» no es la autorización: la autorización está en la columna 4 (PL-25, Number Required for Dispatch: «providing the conditions specified in the Remarks or Exceptions column are met»).",
          "**(M)(O).** Hay dos requisitos antes de usar el alivio: uno de mantenimiento y uno operacional (PL-25). Qué mira el piloto: que el (M) esté cumplido y firmado, y qué le toca a él por el (O).",
          "**«May be inoperative provided:».** Todo lo que sigue es obligatorio. Si una letra no se cumple, no hay alivio.",
          "**a) canal desactivado.** Es la parte (M): mantenimiento desactiva el canal según su procedimiento. El piloto no lo hace ni lo improvisa; lo verifica en el tech log.",
          "**b) operación conforme al AFM.** Es la parte (O): el AFM trae limitaciones y performance para operar con antiskid inoperativo. Qué mira el piloto: que el despacho y los cálculos de despegue y aterrizaje los hayan aplicado. Por qué importa: frenar sin antiskid cambia la distancia de parada y el riesgo en pista mojada o contaminada.",
          "`***` **(triple asterisco).** Ítem instalado en algunos aviones del tipo y no en todos. El símbolo no pasa a la MEL del operador (PL-25, Triple Asterisk).",
        ],
      },
      { kind: "sub", text: "¿Cómo debe leerla un piloto?" },
      {
        kind: "pasos",
        items: [
          {
            rotulo: "1 · Documento correcto",
            texto: "MEL del operador, revisión vigente, para esta matrícula. (La MMEL solo se usa para aprender: «La MMEL no puede ser utilizada como una MEL para realizar despachos», SRVSOP MIA PIV-VI-C7 3.5.)",
          },
          { rotulo: "2 · Sistema y ATA", texto: "Antiskid: capítulo 32." },
          { rotulo: "3 · Configuración", texto: "B737-800: sub-ítem 02-02, no 02-01." },
          {
            rotulo: "4 · Categoría y fecha límite",
            texto: "C. Si se registró el 3 de octubre a las 07:15, con el sistema FAA el plazo corre del 4 al 13 de octubre y vence a las 2359 del 13. En Colombia, el que fije la MEL aprobada.",
          },
          { rotulo: "5 · Instalados y requeridos", texto: "1 y 0: puede faltar el sistema completo, con condiciones." },
          { rotulo: "6 · Remarks completos", texto: "Provisos a) y b). Ninguno se salta." },
          { rotulo: "7 · (M) y placard", texto: "En el tech log: canal desactivado, firma de mantenimiento, referencia MEL, placard instalado." },
          {
            rotulo: "8 · (O) e impacto, y decisión",
            texto: "Cumplir el (O); performance de despegue y aterrizaje con antiskid inoperativo según AFM; estado de la pista y meteorología; otros ítems abiertos del sistema de frenado o de los reversores; briefing. Solo entonces se acepta el avión.",
          },
        ],
      },
      {
        kind: "enLaOperacion",
        momento: "Aplicación en la operación",
        texto: "Llegas al avión y el tech log trae «Antiskid inop, MEL 32-02-02, cat C». Lo que cambia tu día no es el diferido: es el (O). El despacho debe reflejar la limitación («The operational flight plan must account for any operational limitations», 8900.1 4-691C) y tú confirmas que los números de despegue y aterrizaje salieron con esa condición. Si la pista de destino está mojada o corta, esa es la conversación con despacho.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Error frecuente",
        text: "Leer «C 1 0» y concluir «se puede». O usar la fila de otro modelo porque «es el mismo sistema». La fila correcta depende de la configuración, y el alivio depende de los provisos.",
      },
      verificar("Limitaciones y performance con antiskid inoperativo contra el AFM del modelo y el (O) de la MEL del operador."),
      enPocasPalabras([
        "La revisión se mira por página, no solo en la portada.",
        "Primero la configuración, después los números.",
        "Required 0 no autoriza nada por sí solo: autorizan los Remarks cumplidos.",
        "(M) lo hace mantenimiento; el piloto lo verifica. (O) lo cumple la tripulación.",
        "La decisión incluye el impacto: aquí, performance de frenado.",
      ]),
      fuentes(
        "MMEL FAA B-737 · 32-02",
        [
          "MMEL FAA B-737, Rev 63a (05/27/2026), página 32-1 (Rev 63, 04/03/2026), ítems 32-01, 32-02-01 y 32-02-02; tabla de contenido p. I.",
          "PL-25 Rev 24: Number Required for Dispatch, Repair Category C, (M), (O), Triple Asterisk.",
          "FAA Order 8900.1 Vol 4 Cap 4 Secc 3 (CHG 933), 4-682 y 4-691C.",
          "SRVSOP MIA Enm. 13, PIV-VI-C7 3.5.",
        ],
        ["Limitaciones y performance con antiskid inoperativo contra el AFM del modelo y el (O) de la MEL del operador."],
      ),
    ],
  },
  // ── 35 · capítulo 31 ────────────────────────────────────────────────────
  {
    n: 35,
    title: "¿Podemos salir?",
    kicker: "Casos para decidir con la MEL en la mano",
    minutes: 12,
    blocks: [
      {
        kind: "hueco",
        rotulo: "MEL-31-01 · Esquema · 4:5 · 1080×1350 px",
        descripcion:
          "Imagen sugerida: tarjeta de caso en papel (fondo papel del lector) con nueve renglones rotulados en mono y mayúsculas: DEFECT, MEL ENTRY, CATEGORY, INSTALLED, REQUIRED, CONDITIONS, (M), (O), FLIGHT CONDITIONS. Abajo, tres sellos posibles: «GO CON CONDICIONES», «NO GO», «FALTA INFORMACIÓN». Ninguno marcado. Objetivo: que el piloto vea que hay tres respuestas posibles y no dos, y que la respuesta sale de cruzar la entrada con el vuelo concreto.",
        alto: 420,
        ratio: "4 / 5",
        anchoMax: 420,
      },
      { kind: "sub", text: "Cómo se usa" },
      {
        kind: "p",
        text: "Siete casos inventados sobre una Aeronave de ejemplo. Lee la tarjeta, decide y después mira el análisis. No basta con «sí» o «no»: la respuesta es el razonamiento.",
      },
      PLAZOS_FAA,
      ...podemosSalir({
        n: 1,
        titulo: "pack de aire acondicionado",
        datos: [
          ["DEFECT", "«PACK 2 FAULT» en el prevuelo. Registrado en el tech log hoy a las 08:20."],
          ["MEL ENTRY", "21-85-01 Air Conditioning Pack"],
          ["CATEGORY", "C"],
          ["INSTALLED", "2"],
          ["REQUIRED", "1"],
          ["CONDITIONS", "«(M)(O) One may be inoperative provided: a) Inoperative pack is secured closed, and b) Flight altitude is limited as specified in the (O) procedure.»"],
          ["(M)", "Válvula asegurada cerrada. Firmado en el tech log a las 09:05, placard instalado."],
          ["(O)", "Limitación de altitud según el procedimiento del operador."],
          ["FLIGHT CONDITIONS", "Vuelo doméstico diurno, 1 h 10 min, plan original en un nivel por encima del límite de la (O)."],
        ],
        analisis: [
          "El ítem existe y la configuración coincide.",
          "C: el día de hoy no cuenta; vence en 10 días calendario (FAA).",
          "2 instalados, 1 requerido, y queda uno.",
          "a) cumplido y firmado. b) no se cumple **con el plan actual**.",
          "Impacto: hay que rehacer el plan en un nivel permitido. Volar más bajo cambia el consumo; despacho recalcula el combustible y el nivel se coordina con ATC.",
          "Redundancia: con un solo pack, una segunda falla en vuelo deja al avión sin ese respaldo. Se habla en el briefing (AC 120-125 6.4: considerar fallas adicionales en ruta).",
        ],
        respuesta: "sí, **con el plan de vuelo rehecho** en un nivel permitido y el combustible recalculado. Con el plan original, no.",
      }),
      ...podemosSalir({
        n: 2,
        titulo: "antihielo de ala con hielo pronosticado",
        datos: [
          ["DEFECT", "Válvula de antihielo de ala izquierda no abre en la prueba."],
          ["MEL ENTRY", "30-85-01 Wing Anti-Ice Valve"],
          ["CATEGORY", "C"],
          ["INSTALLED", "2"],
          ["REQUIRED", "0"],
          ["CONDITIONS", "«(M) May be inoperative provided: a) Valve is secured closed, and b) Airplane is not operated in known or forecast icing conditions.»"],
          ["(M)", "Cumplido y firmado."],
          ["(O)", "No tiene."],
          ["FLIGHT CONDITIONS", "Salida nocturna. El pronóstico de área trae engelamiento moderado entre el nivel de salida y el de crucero."],
        ],
        analisis: [
          "Ítem, configuración, categoría y (M): en orden.",
          "b) dice «known **or forecast**». Hay pronóstico de engelamiento en la trayectoria.",
          "No hace falta que haya hielo real: el pronóstico basta para que el proviso no se cumpla.",
          "Que «seguramente no vamos a encontrar hielo» no es un argumento: el proviso no pide opinión, pide que no haya pronóstico.",
        ],
        respuesta:
          "no. Opciones: reparar, cambiar de avión o esperar a que el pronóstico ya no incluya esa condición en la trayectoria (decisión de la aerolínea con despacho, no del piloto solo).",
      }),
      ...podemosSalir({
        n: 3,
        titulo: "«WX RADAR INOP», y nada más",
        datos: [
          ["DEFECT", "Tech log: «WX RADAR INOP». Sin más detalle."],
          ["MEL ENTRY", "34-85-01 Weather Radar System, con sub-ítems"],
          ["CATEGORY", "Sistema completo: C. Sub-ítem «1) Transceiver (dual transceivers installed)»: D"],
          ["INSTALLED", "Sistema: 1. Transceptor: 2"],
          ["REQUIRED", "Sistema: 0. Transceptor: 1"],
          [
            "CONDITIONS",
            "Sistema: «May be inoperative provided weather radar is not required by the operating rules.» Transceptor: «One may be inoperative provided remaining transceiver operates normally.»",
          ],
          ["(M)", "No tiene."],
          ["(O)", "No tiene."],
          ["FLIGHT CONDITIONS", "Salida a las 19:30. Pronóstico de tormentas en la ruta."],
        ],
        analisis: [
          "No sabemos **qué** falló: el sistema completo o un transceptor de dos.",
          "Tampoco sabemos si este avión tiene dos transceptores; el sub-ítem 1) solo aplica si los tiene.",
          "Si es un transceptor y el otro funciona: alivio D, sin impacto en el vuelo.",
          "Si es el sistema: el alivio pide que el radar no sea requerido por la norma. En Colombia, RAC 121.860 exige a los aviones presurizados un radar que funcione de noche o en IMC en áreas donde se esperan tormentas. Esta noche, con tormentas pronosticadas, sí es requerido.",
        ],
        respuesta:
          "falta información. Hay que pedir a mantenimiento la anotación exacta (qué componente, qué ítem de la MEL) y confirmar la configuración del avión. Según la respuesta, es «sí» o es «no».",
      }),
      ...podemosSalir({
        n: 4,
        titulo: "dos ítems que se necesitan entre sí",
        datos: [
          ["DEFECT", "Nuevo: «GEN 1 FAULT» (generador del motor 1). Ya abierto desde ayer: generador de la APU inoperativo."],
          ["MEL ENTRY", "Nuevo: 24-85-01 Engine Driven Generator. Abierto: 24-86-01 APU Generator"],
          ["CATEGORY", "24-85-01: C. 24-86-01: C"],
          ["INSTALLED", "24-85-01: 2. 24-86-01: 1"],
          ["REQUIRED", "24-85-01: 1. 24-86-01: 0"],
          [
            "CONDITIONS",
            "24-85-01: «(M)(O) One may be inoperative provided: a) Generator is disconnected, and b) APU generator operates normally.» 24-86-01: «May be inoperative provided both engine driven generators operate normally.»",
          ],
          ["(M)", "24-85-01: pendiente."],
          ["(O)", "24-85-01: procedimiento de carga eléctrica del operador."],
          ["FLIGHT CONDITIONS", "Vuelo doméstico diurno."],
        ],
        analisis: [
          "Cada ítem, solo, tiene alivio.",
          "El nuevo pide «APU generator operates normally». El abierto está justamente inoperativo.",
          "Y el abierto pide «both engine driven generators operate normally». Ya no es así.",
          "Los dos provisos se anulan entre sí. MEL + MEL no suma: se cruza.",
        ],
        respuesta:
          "no. Hay que reparar uno de los dos. Es el caso que describen PL-34 («the interrelationships between those items [...] will be considered») y el RAC 91 Apéndice 2 (f).",
      }),
      ...podemosSalir({
        n: 5,
        titulo: "categoría B que ya venció",
        datos: [
          ["DEFECT", "Diferido abierto: luz de aviso de un sistema de la cabina de pilotos."],
          ["MEL ENTRY", "31-xx (ítem de indicación)"],
          ["CATEGORY", "B"],
          ["INSTALLED", "1"],
          ["REQUIRED", "0"],
          ["CONDITIONS", "«May be inoperative provided alternate procedures are established and used.» (con (O))"],
          ["(M)", "No tiene."],
          ["(O)", "Procedimiento alterno del operador."],
          ["FLIGHT CONDITIONS", "Registrado el 14 de marzo a las 18:40 UTC (el operador cuenta en UTC). Salida hoy, 18 de marzo, 06:30 UTC."],
        ],
        analisis: [
          "Sistema FAA: B son 3 días calendario consecutivos excluyendo el día del descubrimiento.",
          "El 14 no cuenta. Cuentan 15, 16 y 17. Vence a las 2359 UTC del 17 de marzo.",
          "Hoy es 18: el intervalo terminó.",
          "Extensión: en la FAA, el operador con esa autorización (OpSpec D095) puede dar una sola extensión a ítems B y C, y avisar a la FAA en 24 h (8900.1 4-689). El SRVSOP describe el mismo esquema (MIA PIV-VI-C7). No la da el piloto, y tiene que estar documentada.",
        ],
        respuesta:
          "no, salvo que el tech log muestre una extensión aprobada según el procedimiento del operador. Sin eso, el avión no sale hasta que se repare.",
      }),
      verificar("Procedimiento de extensión de intervalos en Colombia contra la MEL y el manual del operador aprobados por la UAEAC."),
      ...podemosSalir({
        n: 6,
        titulo: "diferido anotado, (M) sin hacer",
        datos: [
          ["DEFECT", "Bomba de combustible delantera del tanque izquierdo, baja presión."],
          ["MEL ENTRY", "28-85-01 Fuel Boost Pump"],
          ["CATEGORY", "C"],
          ["INSTALLED", "4"],
          ["REQUIRED", "3"],
          ["CONDITIONS", "«(M)(O) One may be inoperative provided: a) Inoperative pump is deactivated, and b) Fuel management procedures in the (O) procedure are used.»"],
          ["(M)", "Tech log: «Diferido MEL 28-85-01». Sin firma del (M). Sin placard."],
          ["(O)", "Procedimiento de manejo de combustible del operador."],
          ["FLIGHT CONDITIONS", "Vuelo doméstico, sin restricciones meteorológicas."],
        ],
        analisis: [
          "El ítem tiene alivio y los números cuadran: 4, 3, queda 3.",
          "Pero el (M) es un requisito **previo**: «must be accomplished prior to operation with the listed item inoperative» (PL-25). No hay constancia de que se haya hecho.",
          "Falta el placard (PL-25, Placarding; en Colombia, leyenda «NO OPERATIVO», RAC 91.1105(a)(9)).",
          "«Mantenimiento ya lo difirió» no significa que lo cumplió.",
        ],
        respuesta:
          "todavía no. Se llama a mantenimiento para que cumpla y firme el (M) y ponga el placard. Después, briefing del (O) y se sale. «If the MEL procedures for a specific item require a mechanic's inspection, takeoff would be prohibited until the required inspection is completed» (AC 120-125, 6.1.3).",
      }),
      ...podemosSalir({
        n: 7,
        titulo: "el caso fácil, que igual se lee completo",
        datos: [
          ["DEFECT", "Luz de logotipo derecha fundida."],
          ["MEL ENTRY", "33-85-01 Logo Lights"],
          ["CATEGORY", "D"],
          ["INSTALLED", "2"],
          ["REQUIRED", "0"],
          ["CONDITIONS", "«May be inoperative.»"],
          ["(M)", "No tiene."],
          ["(O)", "No tiene."],
          ["FLIGHT CONDITIONS", "Vuelo nocturno."],
        ],
        analisis: [
          "Sin provisos, sin (M) ni (O).",
          "D: 120 días calendario excluyendo el día del descubrimiento (FAA).",
          "Aun así: anotación en el tech log, placard y seguimiento del plazo. Sin impacto en el vuelo.",
        ],
        respuesta: "sí. Lo que se enseña aquí es que hasta el ítem más simple se anota, se rotula y tiene fecha.",
      }),
      enPocasPalabras([
        "Hay tres respuestas: sí con condiciones, no, y falta información.",
        "Un proviso con «forecast» no se cumple si hay pronóstico, aunque el cielo esté limpio.",
        "Dos alivios válidos pueden anularse entre sí.",
        "Un intervalo vencido cierra el alivio; la extensión no la da el piloto.",
        "Diferido anotado no es (M) cumplido.",
      ]),
      fuentes(
        "PL-25 · PL-34 · AC 120-125",
        [
          "PL-25 Rev 24: Repair Category B, C y D; Day of Discovery; (M); (O); Placarding.",
          "PL-34 Rev 5, p. 4 (ítems múltiples).",
          "FAA Order 8900.1 Vol 4 Cap 4 Secc 3, 4-689 (extensión única B y C).",
          "AC 120-125, 6.1.3 y 6.4.",
          "RAC 121 Enm. 10, 121.860 (radar meteorológico); RAC 91 Enm. 12, Apéndice 2 (f) y 91.1105(a)(9).",
          "SRVSOP MIA Enm. 13, PIV-VI-C7 (nota sobre extensión B y C).",
        ],
        ["Procedimiento de extensión de intervalos en Colombia contra la MEL y el manual del operador aprobados por la UAEAC."],
      ),
    ],
  },
  // ── 36 · capítulo 32 ────────────────────────────────────────────────────
  {
    n: 36,
    title: "Casos operacionales",
    kicker: "Seis situaciones con entradas reales",
    minutes: 16,
    blocks: [
      {
        kind: "p",
        text: "Seis casos con entradas **reales** de las MMEL de la FAA. Recuerda: son MMEL del tipo; la MEL de tu aerolínea puede tener menos alivio o más condiciones. En cada caso: alivio, condiciones, (M), (O), meteorología, performance, ruta, aeropuertos, capacidades e impacto.",
      },

      // Caso 1
      { kind: "sub", text: "Caso 1: weather radar" },
      {
        kind: "table",
        head: ["Seq.", "Cat.", "Inst.", "Req.", "Remarks or Exceptions"],
        rows: [
          [
            "15-01A",
            "B",
            "-",
            "0",
            "(O) May be inoperative provided: a) Weather radar is not required by 14 CFR, and b) Alternate procedures are established and used. NOTE: Operator's alternate procedures should include reviewing windshear avoidance and windshear recovery procedures.",
          ],
          [
            "15-01B",
            "C",
            "-",
            "0",
            "(O) May be inoperative provided: a) Weather radar is not required by 14 CFR, b) Alternate procedures are established and used, and c) Windshear Warning and Guidance System (Reactive) operates normally.",
          ],
          ["15-01C", "D", "-", "1", "May be inoperative provided one remaining weather radar operates normally."],
        ],
      },
      cita(
        "entrada real. MMEL FAA B-737, Rev 63a, página 34-7 (Rev 63, 04/03/2026), ítem 34-15-01 «Weather Radar with Windshear Detection and Avoidance System (Predictive) Installed».",
      ),
      {
        kind: "p",
        text: "En el A320 (MMEL FAA A318-A321, Rev 32, página 34-17, ítem 34-41-01) el ítem principal dice «D | - | - | Any in excess of those required by 14 CFR may be inoperative» y luego alivia funciones por separado (modo mapa, AUTO TILT, detección de turbulencia, windshear predictivo).",
      },
      {
        kind: "kv",
        items: [
          { k: "Alivio", v: "Tres alternativas en el B737. La B y la C sirven cuando se pierde el radar; la D, cuando hay dos y queda uno." },
          {
            k: "Condiciones",
            v: "Que el radar **no sea requerido por la norma**. PL-25 aclara que «\"14 CFR\" also implies the regulations within the State the aircraft is operated». En Colombia, RAC 121.860: «Todos los aviones presurizados deben tener instalado un radar meteorológico que funcione, tanto de noche como en IMC, en áreas donde se espera que existan tormentas u otras condiciones meteorológicas peligrosas.»",
          },
          { k: "(M)", v: "No tiene." },
          { k: "(O)", v: "Procedimientos alternos; la NOTE sugiere repasar evitar y recuperar de windshear. La 15-01B pide además que el windshear reactivo funcione." },
          {
            k: "Meteorología",
            v: "Es lo que decide. De día y sin tormentas esperadas, puede no ser requerido. De noche o en IMC con tormentas esperadas, lo es, y el alivio no aplica.",
          },
          { k: "Performance", v: "Sin efecto directo." },
          {
            k: "Ruta y aeropuertos",
            v: "Una ruta con convección de tarde puede quedar fuera para ese avión. El alterno también cuenta: si el plan B está bajo tormentas, el problema sigue.",
          },
          { k: "Capacidades", v: "Se pierde la detección de tormentas y, en esta configuración, el windshear predictivo." },
          { k: "Impacto", v: "El mismo avión puede salir a las 07:00 y no a las 18:00." },
        ],
      },

      // Caso 2
      { kind: "sub", text: "Caso 2: autopilot" },
      {
        kind: "table",
        head: ["Cat.", "Inst.", "Req.", "Remarks or Exceptions"],
        rows: [
          ["C", "2", "1", "(O) One may be inoperative provided approach minimums do not require its use."],
          [
            "B",
            "2",
            "0",
            "(O) May be inoperative provided: a) Approach minimums do not require their use, b) Enroute operations do not require their use, and c) Number of flight segments and segment duration is acceptable to flightcrew. NOTE: Any Mode which operates normally may be used.",
          ],
        ],
      },
      cita("entrada real. MMEL FAA A318-A321, Rev 32, página 22-1 (Rev 32, 07/30/2025), ítem 22-10-01 Autopilot Systems."),
      {
        kind: "table",
        head: ["Seq.", "Cat.", "Inst.", "Req.", "Remarks or Exceptions"],
        rows: [
          ["01A", "C", "-", "1", "«May be inoperative provided approach minimums do not require its use.»"],
          [
            "01B",
            "B",
            "-",
            "0",
            "«Except for ETOPS, may be inoperative provided: a) Approach minimums do not require their use, b) Enroute operations do not require autopilot use, and c) Number of flight segments and segment duration is acceptable to flightcrew.»",
          ],
        ],
      },
      cita("entrada real. MMEL FAA B-737, Rev 63a, página 22-1 (Rev 63, 04/03/2026), ítem 22-01 Autopilot Systems."),
      {
        kind: "p",
        text: "Con NOTE 1 (reparar pronto, considerando «weather, traffic density, and effect of other inoperative systems») y NOTE 2 («If CWS is inoperative, do not use other modes (pitch or roll)»).",
      },
      {
        kind: "kv",
        items: [
          { k: "Alivio", v: "Uno de dos (C) o los dos (B)." },
          {
            k: "Condiciones",
            v: "Mínimos de aproximación que no lo requieran; con los dos inoperativos, además, que la operación en ruta no los requiera y que la tripulación acepte los tramos y su duración. En el B737, la B excluye ETOPS.",
          },
          { k: "(M)", v: "No tiene." },
          { k: "(O)", v: "En el A320 sí; en el B737 esta entrada no lleva (O)." },
          { k: "Meteorología", v: "Si el destino o el alterno están por debajo de lo que se puede volar sin ese autopiloto, el plan no sirve." },
          { k: "Performance", v: "Sin efecto directo." },
          { k: "Ruta", v: "«Enroute operations do not require their use»: hay espacios y procedimientos en ruta que pueden exigir autopiloto." },
          { k: "Capacidades", v: "Se pueden perder aproximaciones de categoría superior o autoland." },
          { k: "Impacto", v: "Carga de trabajo. El proviso c) le da a la tripulación la palabra: si los tramos son largos o muchos, puede decir que no." },
        ],
      },
      verificar("Qué aproximaciones y operaciones en ruta exigen uno o dos autopilotos (incluido RVSM) contra el AFM, el FCOM y las autorizaciones del operador."),

      // Caso 3
      { kind: "sub", text: "Caso 3: thrust reverser" },
      {
        kind: "table",
        head: ["Cat.", "Inst.", "Req.", "Remarks or Exceptions"],
        rows: [
          [
            "C",
            "2",
            "1",
            "(M)(O) One may be inoperative provided: a) Thrust reverser is locked in forward thrust position, and b) Appropriate performance adjustments are applied.",
          ],
        ],
      },
      cita("entrada real. MMEL FAA B-737, Rev 63a, página 78-1, ítem 78-01-03 (-600/-700/-800/-900/-900ER)."),
      verificar(
        "La página 78-1 de la MMEL B-737 dice «REVISION NO. 63 / DATE: 11/28/2022» y la tabla de contenido lista el capítulo 78 como «63 04/03/2026»: se cita la página tal cual.",
      ),
      {
        kind: "p",
        text: "En el A320ceo (MMEL FAA A318-A321, Rev 32, páginas 78-2 y 78-3, Rev 31, 08/13/2024, ítem 78-30-01 1)) la entrada es **C | 2 | 1 | (M)(O)** con diez provisos, entre ellos:",
      },
      {
        kind: "list",
        items: [
          "«a) Inoperative reverser is deactivated and secured in the stowed position and no operations or procedures require its use»",
          "«g) Wheel brake tachometers operate normally»",
          "«h) Main wheel braking system operates normally»",
          "«i) Flightcrew is provided with the following statement [...]: \"For a landing conducted with one deactivated thrust reverser, ensure that both engine thrust levers are retarded to the IDLE detent for the flare and the touchdown. Select both thrust levers to reverse when applying reverse thrust,\"»",
          "«j) Appropriate performance adjustments are applied»",
        ],
      },
      {
        kind: "kv",
        items: [
          { k: "Alivio", v: "Uno de dos." },
          { k: "Condiciones", v: "Reversor bloqueado o desactivado; performance ajustada; en el A320, además, frenos y tacómetros normales." },
          { k: "(M)", v: "Bloquear o desactivar el reversor (lo hace mantenimiento)." },
          { k: "(O)", v: "En el A320 incluye una instrucción textual para el aterrizaje, que tiene que llegar a la tripulación." },
          { k: "Meteorología", v: "Pista mojada o contaminada pesa más en la distancia de aterrizaje." },
          {
            k: "Performance",
            v: "«appropriate performance adjustments»: los ajustes salen del AFM y del sistema del operador, no de una regla de memoria.",
          },
          { k: "Aeropuertos", v: "Pistas cortas o contaminadas pueden quedar fuera, en destino o alterno." },
          { k: "Capacidades", v: "Menos margen de frenado; ojo con otros ítems del sistema de frenos (caso 6)." },
          { k: "Impacto", v: "Técnica de aterrizaje (el A320 lo dice textual) y peso máximo de aterrizaje que puede bajar según la pista." },
        ],
      },

      // Caso 4
      { kind: "sub", text: "Caso 4: APU" },
      {
        kind: "table",
        head: ["Cat.", "Inst.", "Req.", "Remarks or Exceptions"],
        rows: [
          ["C", "1", "0", "(O) Except for ETOPS, may be inoperative."],
          ["A", "1", "0", "(O) Except for ETOPS beyond 120 minutes, may be inoperative provided repairs are made within 4 flights."],
        ],
      },
      cita(
        "entrada real. MMEL FAA A318-A321, Rev 32, página 49-1 (Rev 30, 03/03/2023), ítem 49-10-01 APU System, sub-ítem 1) A318/A319/A320/A321 without Mod. 163213/MP J4530.",
      ),
      {
        kind: "table",
        head: ["Seq.", "Cat.", "Inst.", "Req.", "Remarks or Exceptions"],
        rows: [
          [
            "01-02A",
            "C",
            "1",
            "0",
            "«(M) Except for ETOPS, may be inoperative provided: a) Procedures do not require its use, and b) Perform a visual inspection of tail cone area and adjacent control surfaces to confirm there is no evidence of heat damage or delamination.»",
          ],
        ],
      },
      cita("entrada real. MMEL FAA B-737, Rev 63a, página 49-1, ítem 49-01-02 Airplane with APU APS2000."),
      {
        kind: "kv",
        items: [
          {
            k: "Alivio",
            v: "En el A320, dos alternativas. La C excluye todo ETOPS. La A permite ETOPS de hasta 120 minutos, pero solo por 4 vuelos (el intervalo en vuelos empieza cuando se difiere el ítem, PL-25 Repair Category A).",
          },
          { k: "Condiciones", v: "La configuración importa: el A321 con otras modificaciones pide además que el tanque adicional esté vacío o no instalado." },
          { k: "(M)", v: "En el B737 APS2000, inspección de la zona de cola." },
          { k: "(O)", v: "En el A320, sí." },
          { k: "Meteorología", v: "Sin APU, el acondicionamiento en tierra depende de equipos externos; en calor o frío extremo eso pesa en la cabina." },
          { k: "Performance", v: "Según el avión, la APU puede usarse en ciertos despegues; si el operador lo hace, el (O) lo dirá." },
          {
            k: "Aeropuertos",
            v: "Hacen falta planta de energía y aire externos en cada escala, incluido un posible desvío. Un aeropuerto sin ellos es un problema para el arranque.",
          },
          { k: "Capacidades", v: "Se pierde una fuente de respaldo eléctrico y neumático." },
          { k: "Impacto", v: "ETOPS (C) o ETOPS largo (A) fuera; planificación de escalas." },
        ],
      },

      // Caso 5
      { kind: "sub", text: "Caso 5: TCAS / ACAS" },
      {
        kind: "table",
        head: ["Cat.", "Inst.", "Req.", "Remarks or Exceptions"],
        rows: [
          [
            "B",
            "1",
            "0",
            "(M) May be inoperative provided: a) System is deactivated and secured, and b) Enroute or approach procedures do not require its use. NOTE 1: For aircraft equipped with Mod. 34637/MP P8454 (T2CAS), GPWS Modes 1-5 and GPWS Terrain System are also inoperative. NOTE 2: For aircraft equipped with Mod. 150896/MP P11422, ADS-B In function (ATSAW) is considered inoperative.",
          ],
          [
            "C",
            "1",
            "0",
            "(M) May be inoperative provided: a) Not required by 14 CFR, b) System is deactivated and secured, and c) Enroute or approach procedures do not require its use. (mismas NOTE 1 y 2)",
          ],
        ],
      },
      cita(
        "entrada real. MMEL FAA A318-A321, Rev 32, página 34-21 (Rev 32, 07/30/2025), ítem 34-43-01 Traffic Alert and Collision Avoidance System (TCAS II).",
      ),
      {
        kind: "p",
        text: "En el B737 (MMEL FAA B-737, Rev 63a, página 34-25, ítem 34-40) es igual con «-» en instalados: **40A | B | - | 0** y **40B | C | - | 0**.",
      },
      {
        kind: "kv",
        items: [
          { k: "Alivio", v: "B (sin exigir que no sea requerido por la norma) o C (solo si la norma no lo exige)." },
          { k: "Condiciones", v: "Desactivado y asegurado; que ni la ruta ni la aproximación lo exijan." },
          { k: "(M)", v: "Desactivar y asegurar." },
          { k: "(O)", v: "No tiene." },
          {
            k: "Norma en Colombia",
            v: "RAC 121.855(a) exige ACAS II / TCAS II a los aviones de turbina (excepto turbohélices) de más de 5.700 kg o de más de 19 pasajeros, y 121.855(d) lo exige en versión 7.1 a todo avión que «pretenda volar en espacio aéreo con separación vertical mínima reducida (RVSM) o que realice operaciones internacionales».",
          },
          { k: "Meteorología", v: "Sin efecto directo; en IMC se pierde una capa de conciencia de tránsito." },
          { k: "Ruta", v: "Vuelos internacionales o en RVSM pueden quedar fuera según la norma del Estado." },
          { k: "Capacidades", v: "NOTE 1: en aviones con T2CAS, también quedan inoperativos los modos 1-5 del GPWS y el terreno. Un diferido se lleva otro sistema." },
          { k: "Impacto", v: "La decisión la marcan la ruta y el espacio aéreo, no el avión." },
        ],
      },
      verificar("Cómo se aplica el alivio de TCAS con RAC 121.855(d) (RVSM e internacional) contra la MEL del operador aprobada por la UAEAC."),

      // Caso 6
      { kind: "sub", text: "Caso 6: múltiples MEL (frenos y reversor)" },
      {
        kind: "hueco",
        rotulo: "MEL-32-01 · Imagen anotada · 4:5 · 1080×1350 px",
        descripcion:
          "Imagen base: dos recortes reales, uno sobre otro: MMEL FAA A318-A321, Rev 32, página 32-10, ítem 32-42-01 Main Wheel Braking Systems (C | 4 | 3), y página 78-2, ítem 78-30-01 1) Thrust Reverser Systems (C | 2 | 1). Una línea une los dos provisos que se cruzan. Tres flechas, explicadas debajo. Objetivo: que el piloto vea que dos entradas con check verde, juntas, no dejan salir.",
        alto: 420,
        ratio: "4 / 5",
        anchoMax: 420,
      },
      {
        kind: "kv",
        items: [
          { k: "Flecha 1 · «e) Both reversers operate normally,» (32-42-01)", v: "El alivio del freno pide los dos reversores." },
          { k: "Flecha 2 · «h) Main wheel braking system operates normally,» (78-30-01)", v: "El alivio del reversor pide el frenado normal." },
          { k: "Flecha 3 · «i) The AUTO/BRK Function is considered inoperative.» (32-42-01)", v: "Diferir un freno arrastra el autofreno y sus propias condiciones." },
        ],
      },
      { kind: "p", text: "**Qué dice cada flecha**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**«Both reversers operate normally».** Si ya hay un reversor diferido, el freno no se puede diferir. El piloto lo busca siempre que haya un diferido del mismo sistema de frenado o desaceleración.",
          "**«Main wheel braking system operates normally».** Es el espejo: con un freno diferido, el reversor no se puede diferir.",
          "**«Considered inoperative».** El autofreno se trata como inoperativo aunque funcione, y hay que cumplir su propia entrada (32-42-04: «a) Approach minimums do not require its use, and b) Normal braking is not affected»). PL-25: el ítem se trata como inoperativo para despacho y vuelo, con placard y cumpliendo sus Remarks.",
        ],
      },
      { kind: "p", text: "**Entradas reales.**" },
      {
        kind: "table",
        head: ["Ítem", "Cat.", "Inst.", "Req.", "Extracto de Remarks"],
        rows: [
          [
            "32-42-01 Main Wheel Braking Systems (p. 32-10)",
            "C",
            "4",
            "3",
            "«(M)(O) One brake may be inoperative provided: a) Minimum runway width is 148 ft. (45 meters), b) Antiskid system operates normally, c) Nose wheel steering operates normally, d) Affected brake is removed or deactivated, e) Both reversers operate normally, f) Green and yellow systems on operative brakes operate normally, g) AFM performance penalties are applied, h) Approach minimums do not require its use, and i) The AUTO/BRK Function is considered inoperative.»",
          ],
          [
            "78-30-01 1) Thrust Reverser Systems, ceo (p. 78-2)",
            "C",
            "2",
            "1",
            "«(M)(O) One may be inoperative provided: [...] g) Wheel brake tachometers operate normally, h) Main wheel braking system operates normally, [...]»",
          ],
        ],
      },
      cita("entradas reales. MMEL FAA A318-A321, Rev 32, página 32-10 (ítem 32-42-01) y página 78-2 (ítem 78-30-01 1))."),
      {
        kind: "kv",
        items: [
          { k: "Alivio", v: "Cada uno por separado; juntos, ninguno." },
          { k: "Condiciones", v: "Se excluyen entre sí." },
          { k: "(M) y (O)", v: "Los dos ítems los tienen." },
          {
            k: "Meteorología y aeropuertos",
            v: "Con un freno diferido, ancho mínimo de pista 45 m y penalizaciones de performance del AFM. Eso deja fuera pistas angostas en destino y alterno.",
          },
          { k: "Capacidades", v: "Sin autofreno; aproximaciones que lo exijan, fuera." },
          {
            k: "Impacto",
            v: "Es el ejemplo exacto de la FAA: «inoperative components of a wheel braking system limiting the inoperability of the thrust reverser system» (8900.1 4-692).",
          },
        ],
      },
      verificar("Ajustes de performance con reversor o freno inoperativo contra el AFM y el sistema de performance del operador."),
      enPocasPalabras([
        "Radar: la meteorología y la hora deciden si el alivio aplica.",
        "Autopiloto: se pierden aproximaciones y se suma carga de trabajo.",
        "Reversor: performance y técnica de aterrizaje.",
        "APU: ETOPS y equipos de tierra en cada escala, incluido el desvío.",
        "TCAS: ruta, RVSM y vuelos internacionales; en T2CAS se lleva el GPWS.",
        "Varias MEL: se cruzan los provisos, no se suman los checks.",
      ]),
      fuentes(
        "MMEL FAA B-737 y A318-A321",
        [
          "MMEL FAA B-737, Rev 63a: páginas 22-1 (22-01A/B), 34-7 (34-15-01A/B/C), 34-25 (34-40A/B), 49-1 (49-01-02A), 78-1 (78-01-03).",
          "MMEL FAA A318-A321, Rev 32: páginas 22-1 (22-10-01), 32-10 (32-42-01), 32-17 (32-42-04), 34-17 (34-41-01), 34-21 (34-43-01), 49-1 (49-10-01), 78-2 y 78-3 (78-30-01 1)).",
          "PL-25 Rev 24: Required by 14 CFR, Considered Inoperative, Repair Category A; Apéndice A (Weather Radar §§ 121.357, 121.358; TCAS § 121.356).",
          "FAA Order 8900.1 Vol 4 Cap 4 Secc 3, 4-692.",
          "RAC 121 Enm. 10, 121.855 y 121.860.",
        ],
        [
          "La página 78-1 de la MMEL B-737 dice «REVISION NO. 63 / DATE: 11/28/2022» y la tabla de contenido lista el capítulo 78 como «63 04/03/2026»: se cita la página tal cual.",
          "Qué aproximaciones y operaciones en ruta exigen uno o dos autopilotos (incluido RVSM) contra el AFM, el FCOM y las autorizaciones del operador.",
          "Cómo se aplica el alivio de TCAS con RAC 121.855(d) (RVSM e internacional) contra la MEL del operador aprobada por la UAEAC.",
          "Ajustes de performance con reversor o freno inoperativo contra el AFM y el sistema de performance del operador.",
        ],
      ),
    ],
  },
  // ── 37 · capítulo 37 ────────────────────────────────────────────────────
  {
    n: 37,
    title: "Errores frecuentes en entrevista",
    kicker: "Lo que más se oye y por qué está mal",
    minutes: 8,
    blocks: [
      { kind: "p", text: "Doce frases que se oyen en entrevistas y en la línea. Cada una con su corrección y de dónde sale." },
      ...errorFrecuente(
        1,
        "La MEL es la lista de cosas que pueden estar dañadas.",
        "es la lista de ítems que pueden estar inoperativos **bajo condiciones**, y todo lo que no aparece en ella tiene que funcionar.",
        "PL-34 Rev 5, p. 3 («all equipment [...] not listed on the MEL must be operative»); RAC 121.001 («a reserva de determinadas condiciones»).",
      ),
      ...errorFrecuente(
        2,
        "MMEL y MEL son lo mismo.",
        "la MMEL es del tipo de avión; la MEL es del operador, para su configuración, y aprobada por su autoridad. La MMEL no se usa para despachar.",
        "8900.1 Vol 4 Cap 4 Secc 3, 4-681 y 4-682; SRVSOP MIA PIV-VI-C7 3.5 («La MMEL no puede ser utilizada como una MEL para realizar despachos»).",
      ),
      ...errorFrecuente(
        3,
        "Installed 2, Required 1: siempre puedo volar con uno.",
        "el número requerido vale solo si se cumplen los Remarks.",
        "PL-25 Rev 24, Number Required for Dispatch («providing the conditions specified in the Remarks or Exceptions column are met»).",
      ),
      ...errorFrecuente(
        4,
        "Category A significa reparar de inmediato.",
        "A significa que el plazo está escrito en los Remarks del ítem. Puede ser en vuelos, días de vuelo u horas. Ejemplo real: A320, APU, «repairs are made within 4 flights».",
        "PL-25, Repair Category A; MMEL FAA A318-A321 Rev 32, ítem 49-10-01.",
      ),
      ...errorFrecuente(
        5,
        "(O) significa optional.",
        "(O) es un procedimiento de operaciones **requerido** para planificar u operar con el ítem inoperativo; normalmente lo cumple la tripulación.",
        "PL-25, (O).",
      ),
      ...errorFrecuente(
        6,
        "(M) significa MEL.",
        "(M) es un procedimiento de mantenimiento que debe cumplirse **antes** de operar con el ítem inoperativo.",
        "PL-25, (M).",
      ),
      ...errorFrecuente(
        7,
        "Si está en la MEL, no importa la meteorología.",
        "muchos provisos dependen del tiempo. El radar solo se alivia si la norma no lo exige, y en Colombia la norma lo exige de noche o en IMC con tormentas esperadas.",
        "MMEL FAA B-737 Rev 63a, 34-15-01A/B; RAC 121.860; 8900.1 4-691C (el plan de vuelo debe tener en cuenta las limitaciones, incluida la meteorología).",
      ),
      ...errorFrecuente(
        8,
        "Si hay MEL abierta, mantenimiento ya hizo todo.",
        "mantenimiento hace el (M); el (O) es de la tripulación, y el comandante verifica el estado de cada anotación antes del vuelo. Si el (M) no está hecho, no se despega.",
        "PL-25, (M) y (O); 14 CFR 121.563; AC 120-125, 6.1.3.",
      ),
      ...errorFrecuente(
        9,
        "Dos MEL siempre pueden coexistir.",
        "la interrelación se evalúa. Hay provisos que se excluyen: en el A320, un freno diferido pide los dos reversores y un reversor diferido pide el frenado normal.",
        "PL-34 p. 4; 8900.1 4-692; RAC 91 Apéndice 2 (f); MMEL FAA A318-A321 Rev 32, 32-42-01 e) y 78-30-01 h).",
      ),
      ...errorFrecuente(
        10,
        "La MEL es solo de mantenimiento.",
        "existe para que el piloto al mando decida si inicia el vuelo, y la tripulación debe tener acceso directo a ella antes de cada vuelo.",
        "RAC 121.2615(a) y (c); 14 CFR 121.628(a)(2).",
      ),
      ...errorFrecuente(
        11,
        "Un avión con MEL abierta no es aeronavegable.",
        "la MEL aprobada es un cambio aprobado al diseño de tipo; operando dentro de sus condiciones, el avión mantiene la aeronavegabilidad y un nivel aceptable de seguridad.",
        "14 CFR 121.628(a)(2); RAC 121.2615(c); 8900.1 4-681 («while maintaining the airworthiness of the aircraft»).",
      ),
      ...errorFrecuente(
        12,
        "La MEL permite ignorar el defecto hasta que expire.",
        "la MEL da un plazo máximo, no un permiso para olvidarse. Se repara en la primera oportunidad, dentro de un programa de reparación controlado.",
        "PL-34 p. 4 («repairs be accomplished at the earliest opportunity»; «controlled and sound repair program»); RAC 91 Apéndice 2 (e) («no se tiene la intención de permitir la operación [...] durante un período indefinido»).",
      ),
      enPocasPalabras([
        "Condiciones siempre; lo no listado, operativo.",
        "MMEL del tipo, MEL del operador.",
        "(M) mantenimiento antes; (O) operaciones, requerido.",
        "A: plazo en los Remarks.",
        "Varias MEL se cruzan; plazo máximo no es plazo recomendado.",
      ]),
      fuentes("PL-25 · PL-34 · 8900.1", [
        "PL-34 Rev 5, pp. 3-4.",
        "PL-25 Rev 24: Number Required for Dispatch, Repair Category A, (M), (O).",
        "FAA Order 8900.1 Vol 4 Cap 4 Secc 3, 4-681, 4-682, 4-691C, 4-692.",
        "AC 120-125, 6.1.3; 14 CFR 121.563 y 121.628.",
        "RAC 121 Enm. 10, 121.2615 y 121.860; RAC 91 Enm. 12, Apéndice 2 (e) y (f).",
        "SRVSOP MIA Enm. 13, PIV-VI-C7 3.5.",
        "MMEL FAA A318-A321 Rev 32 (32-42-01, 49-10-01, 78-30-01); MMEL FAA B-737 Rev 63a (34-15-01).",
      ]),
    ],
  },
  // ── 38 · capítulo 38 ────────────────────────────────────────────────────
  {
    n: 38,
    title: "Lo que un piloto debe memorizar",
    kicker: "Lo mínimo que no se consulta",
    minutes: 5,
    blocks: [
      {
        kind: "hueco",
        rotulo: "MEL-38-01 · Esquema · 9:16 · 1080×1920 px",
        descripcion:
          "Imagen sugerida: tarjeta vertical tipo «kneeboard» en papel, con los 22 puntos numerados en dos bloques: «QUÉ ES» (1 a 8) y «CÓMO SE USA» (9 a 22). Rótulos en mono y mayúsculas, acento del módulo en los números. Objetivo: una sola imagen para repasar antes de la entrevista o antes de aceptar un avión.",
        alto: 480,
        ratio: "9 / 16",
        anchoMax: 340,
      },
      { kind: "sub", text: "Qué es" },
      {
        kind: "list",
        items: [
          "**1. MEL no es MMEL.** La MMEL es del tipo; la MEL es del operador.",
          "**2. La MMEL es la base de la MEL.** La MEL se hace a partir de ella.",
          "**3. La MEL es específica** del operador, de su configuración y de su operación, y la aprueba su autoridad (en Colombia, la UAEAC).",
          "**4. Más restrictiva sí, menos nunca.** Ni que la MMEL, ni que la norma, ni que el AFM.",
          "**5. No es un permiso general.** Es un alivio temporal con condiciones.",
          "**6. Lo que no está en la MEL, funciona.** Si no está listado, no hay alivio.",
          "**7. La MEL rige hasta el despegue.** Lo que falla después se maneja con el AFM y los procedimientos del operador, y se resuelve antes de la siguiente salida.",
          "**8. La MMEL no se usa para despachar.**",
        ],
      },
      { kind: "sub", text: "Cómo se usa" },
      {
        kind: "list",
        items: [
          "**9. Leer la entrada completa**, desde el capítulo hasta el último proviso.",
          "**10. Primero la configuración.** Un sub-ítem de otro modelo o modificación no aplica.",
          "**11. Installed no es Required.** Required vale solo si se cumplen los Remarks.",
          "**12. Los Remarks son lo crítico.** «Provided» significa: solo si.",
          "**13. (O):** procedimiento operacional requerido, normalmente de la tripulación.",
          "**14. (M):** procedimiento de mantenimiento, antes del vuelo. El piloto verifica que esté firmado; no lo improvisa.",
          "**15. Categorías A, B, C, D (sistema FAA, PL-25):** B 3 días, C 10 días, D 120 días calendario, excluyendo el día del descubrimiento. En Colombia, lo que fije la MEL aprobada.",
          "**16. A depende del intervalo escrito en el ítem** (vuelos, días de vuelo, horas).",
          "**17. Day of discovery:** el día en que se registró en el tech log; no cuenta en plazos de días.",
          "**18. Un diferido requiere seguimiento:** fecha límite, condiciones y reparación.",
          "**19. Placard:** avisa a tripulación y mantenimiento. En Colombia, leyenda «NO OPERATIVO».",
          "**20. Mirar el impacto:** performance, combustible, meteorología, aproximaciones, RVSM, PBN, ETOPS/EDTO.",
          "**21. Varias MEL = análisis conjunto.** Se cruzan provisos y carga de trabajo; se piensa en la siguiente falla en ruta.",
          "**22. Entender las implicaciones antes de aceptar el avión.** Legal no siempre es apropiado para ese vuelo; la decisión del comandante va dentro de las políticas del operador.",
        ],
      },
      fuentes("PL-25 · PL-34 · RAC 121", [
        "PL-34 Rev 5, pp. 3-4; PL-25 Rev 24 (Day of Discovery, Repair Category A-D, (M), (O), Placarding, Number Required for Dispatch).",
        "FAA Order 8900.1 Vol 4 Cap 4 Secc 3, 4-682, 4-685B1)c), 4-690A y 4-690C, 4-692.",
        "RAC 121 Enm. 10, 121.001 y 121.2615; RAC 91 Enm. 12, 91.1105(a)(9) y Apéndice 2.",
        "SRVSOP MIA Enm. 13, PIV-VI-C7 3.5 y 3.17.",
      ]),
    ],
  },
  // ── 39 · capítulo 39 ────────────────────────────────────────────────────
  {
    n: 39,
    title: "Preguntas típicas de entrevista",
    kicker: "Lo que preguntan, en inglés y en español",
    minutes: 9,
    blocks: [
      {
        kind: "p",
        text: "Veinte preguntas en inglés, como las hacen en entrevista, con respuesta corta en inglés y una línea en español. Las de intervalos usan el sistema FAA (PL-25); dilo así en la entrevista y agrega que en Colombia rige la MEL aprobada del operador.",
      },
      {
        kind: "entrevista",
        titulo: "Qué es y cómo se lee",
        intro: "Responde en voz alta, en inglés, antes de abrir cada una.",
        preguntas: [
          {
            nivel: "concepto",
            q: "1. What is an MEL?",
            respuesta:
              "An operator-specific, approved document that lists the items that may be inoperative for dispatch, and the conditions, limitations and procedures that must be met. **En español:** el documento del operador que dice qué puede estar inoperativo y bajo qué condiciones.",
          },
          {
            nivel: "concepto",
            q: "2. What is the difference between an MMEL and an MEL?",
            respuesta:
              "The MMEL is the master list for the aircraft type. The MEL is built from it by the operator, for its configuration and operation, and approved by its authority. **En español:** la MMEL es del tipo; la MEL, del operador.",
          },
          {
            nivel: "concepto",
            q: "3. Can an MEL be less restrictive than the MMEL?",
            respuesta: "No. It can be more restrictive, never less. **En español:** más restrictiva sí, menos nunca.",
          },
          {
            nivel: "concepto",
            q: "4. What does (M) mean?",
            respuesta:
              "A specific maintenance procedure that must be accomplished before operating with the item inoperative, normally by maintenance. **En español:** procedimiento de mantenimiento, antes del vuelo.",
          },
          {
            nivel: "concepto",
            q: "5. What does (O) mean?",
            respuesta:
              "A specific operations procedure required for planning or operating with the item inoperative, normally done by the flight crew. **En español:** procedimiento de operaciones; no es opcional.",
          },
          {
            nivel: "concepto",
            q: "6. What are the repair categories?",
            respuesta:
              "Under the FAA system: A, interval stated in the remarks; B, 3 consecutive calendar days; C, 10; D, 120, all excluding the day of discovery. In Colombia, the intervals in the operator's approved MEL apply. **En español:** A según el ítem; B 3, C 10, D 120 días (FAA).",
          },
          {
            nivel: "concepto",
            q: "7. What is the day of discovery?",
            respuesta:
              "The calendar day the malfunction was recorded in the logbook. It is excluded from the interval. **En español:** el día en que se anotó; no cuenta.",
          },
          {
            nivel: "interpretacion",
            q: "8. A Category C item was logged at 10:00 on January 26. When does it expire?",
            respuesta:
              "Under the FAA system, at 23:59 on February 5. **En español:** el conteo empieza a las 0000 del 27 y termina a las 2359 del 5 de febrero.",
          },
          {
            nivel: "interpretacion",
            q: "9. How is a Category A interval counted in flights?",
            respuesta:
              "From the moment the item is deferred. If it is in calendar days or flight days, the day of discovery is excluded. **En español:** en vuelos, desde el diferimiento; en días, sin el día del descubrimiento.",
          },
          {
            nivel: "concepto",
            q: "10. What does a dash in the \"number installed\" column mean?",
            respuesta:
              "A variable number of items. The operator's MEL shows the actual number. **En español:** cantidad variable; la MEL pone el número real.",
          },
          {
            nivel: "interpretacion",
            q: "11. Two installed, one required. Can you always go with one inoperative?",
            respuesta: "No. Only if every condition in the remarks is met. **En español:** el número no autoriza; los Remarks sí.",
          },
          {
            nivel: "concepto",
            q: "12. What is the most important column?",
            respuesta:
              "Remarks or Exceptions. That is where the relief and its provisos are. **En español:** Remarks, porque ahí están las condiciones.",
          },
          {
            nivel: "concepto",
            q: "13. What is the difference between a proviso and a note?",
            respuesta:
              "A proviso is a condition you must comply with. A note gives information and is not part of the proviso. **En español:** el proviso obliga; la nota informa.",
          },
        ],
      },
      {
        kind: "entrevista",
        titulo: "Cómo se aplica",
        preguntas: [
          {
            nivel: "situacion",
            q: "14. The item is not in the MEL. What do you do?",
            respuesta:
              "There is no relief. It must be repaired before takeoff, or another approved means must be used. **En español:** sin ítem en la MEL, no hay alivio.",
          },
          {
            nivel: "interpretacion",
            q: "15. Does the MEL apply to a failure after takeoff?",
            respuesta:
              "No. In flight you follow the AFM and the operator's procedures. It must be addressed before the next departure. **En español:** la MEL rige hasta el despegue.",
          },
          {
            nivel: "situacion",
            q: "16. How do you deal with multiple MEL items?",
            respuesta:
              "You check how they interact, the provisos that cross, the crew workload and what happens if something else fails en route. **En español:** se analizan juntas, no una por una.",
          },
          {
            nivel: "concepto",
            q: "17. Why is an inoperative item placarded?",
            respuesta:
              "To inform and remind the crew and maintenance of the item's condition, as close as practical to the control or indicator. **En español:** para que nadie lo use por error; en Colombia, «NO OPERATIVO».",
          },
          {
            nivel: "concepto",
            q: "18. What is the difference between the MEL and the CDL?",
            respuesta:
              "The MEL covers inoperative equipment. The CDL covers external parts that may be missing, with their performance penalties. **En español:** MEL, equipo inoperativo; CDL, partes externas faltantes.",
          },
          {
            nivel: "situacion",
            q: "19. Who is responsible for accepting the aircraft?",
            respuesta:
              "The pilot in command decides whether the flight can start, together with dispatch and the operator's operational control. **En español:** el comandante decide, dentro del control operacional del operador.",
          },
          {
            nivel: "situacion",
            q: "20. Can an aircraft with an inoperative item still be dispatched legally?",
            respuesta:
              "Yes, if the item is in the approved MEL, all its conditions and procedures are met, it is within its repair interval, it is recorded and placarded, and the flight's limitations are accounted for. **En español:** sí, con todas las condiciones cumplidas y documentadas.",
          },
        ],
      },
      fuentes("PL-25 · PL-34 · 8900.1", [
        "PL-25 Rev 24: Dash, Day of Discovery, Repair Category A-D (ejemplo del 26 de enero), (M), (O), Placarding, Proviso y NOTE, Number Required for Dispatch.",
        "PL-34 Rev 5, pp. 3-4.",
        "FAA Order 8900.1 Vol 4 Cap 4 Secc 1, 4-623B (CDL); Secc 3, 4-682, 4-685B1)c), 4-690C, 4-691A, 4-692.",
        "14 CFR 91.7(b), 121.533(b), 121.628; RAC 121.2615(a); RAC 91.1105(a)(9).",
      ]),
    ],
  },
  // ── 40 · capítulo 40 ────────────────────────────────────────────────────
  {
    n: 40,
    title: "Mini simulador de MEL",
    kicker: "Diez ejercicios para cerrar el módulo",
    minutes: 18,
    blocks: [
      {
        kind: "hueco",
        rotulo: "MEL-40-01 · Esquema · 9:16 · 1080×1920 px",
        descripcion:
          "Imagen sugerida: pantalla de simulador: arriba la entrada de la MEL en su tabla de cuatro columnas; en medio, la situación del día (tech log, hora, meteorología); abajo, diez casillas numeradas para las respuestas y un botón «Ver solución». Estilo EFB, fondo papel, acento del módulo. Objetivo: que el piloto practique el mismo orden de lectura diez veces, con entradas distintas y trampas distintas.",
        alto: 480,
        ratio: "9 / 16",
        anchoMax: 340,
      },
      { kind: "sub", text: "Cómo se usa" },
      {
        kind: "p",
        text: "Diez ejercicios sobre una Aeronave de ejemplo. Las entradas son inventadas. En cada uno responde estas diez preguntas antes de mirar la solución:",
      },
      { kind: "list", ordered: true, items: [...PREGUNTAS_SIMULADOR] },
      PLAZOS_FAA,
      { kind: "p", text: "No todas las respuestas son obvias, y a veces la respuesta correcta es «falta información»." },
      ...ejercicio({
        n: 1,
        titulo: "luces de aterrizaje",
        filas: [
          [
            "33-86-01",
            "Landing Lights",
            "C",
            "4",
            "-",
            "One or more may be inoperative provided for night operations at least one landing light on each side operates normally.",
          ],
        ],
        situacion:
          "Exterior izquierda inoperativa; interior izquierda y las dos derechas funcionan. Salida 17:20 local, llegada 18:55 local, después de la puesta del sol. Tech log con anotación y placard, registrado hoy.",
        soluciones: [
          "Luces de aterrizaje, ATA 33 Lights.",
          "C: 10 días calendario sin contar hoy (FAA).",
          "4.",
          "«-»: variable. Depende de si hay operación nocturna. La MEL del operador debería mostrar el número real.",
          "No hay (M).",
          "No hay (O).",
          "De noche, al menos una por lado. Queda la interior izquierda y las dos derechas: se cumple.",
          "Aterrizaje nocturno con menos iluminación de un lado. Sin impacto en performance.",
          "Que la interior izquierda se haya probado en el prevuelo.",
          "Sí, hay elementos. Se sale. La trampa es pensar que, como la llegada es de noche, no se puede.",
        ],
      }),
      ...ejercicio({
        n: 2,
        titulo: "una prohibición escondida en los Remarks",
        filas: [
          ["30-86-01", "Wing Illumination Lights", "C", "2", "0", "May be inoperative provided airplane is not operated at night in known or forecast icing conditions."],
        ],
        situacion: "Luz izquierda inoperativa. Salida 21:40 local. El pronóstico trae engelamiento ligero en el ascenso. Tech log y placard en orden.",
        soluciones: [
          "Luces de inspección de ala (ver hielo de noche), ATA 30 Ice and Rain Protection en esta MEL.",
          "C: 10 días (FAA).",
          "2.",
          "0.",
          "No hay (M).",
          "No hay (O).",
          "Prohibido de noche con hielo conocido o pronosticado. Hoy hay las dos cosas: no se cumple.",
          "Sin la luz no se puede ver la acumulación en el ala de noche.",
          "Si hay otra forma aprobada de cumplir, solo la dará la MEL del operador; aquí no la hay.",
          "Sí, hay elementos: no se sale con esta condición. El número «0» no vale porque el proviso no se cumple.",
        ],
      }),
      ...ejercicio({
        n: 3,
        titulo: "(M) sin completar",
        filas: [
          [
            "36-85-01",
            "Engine Bleed Air System",
            "C",
            "2",
            "1",
            "(M)(O) One may be inoperative provided: a) Associated bleed valve is secured closed, and b) Flight altitude is limited as specified in the (O) procedure.",
          ],
        ],
        situacion: "Tech log con «BLEED 2 INOP, diferido MEL 36-85-01». Casilla del (M) sin firma. Plan en un nivel dentro del límite de la (O).",
        soluciones: [
          "Sangrado de aire del motor 2, ATA 36 Pneumatic.",
          "C: 10 días (FAA).",
          "2.",
          "1.",
          "Sí. **No está cumplido**: no hay firma.",
          "Sí: limitación de altitud; el plan ya la respeta.",
          "a) sin constancia; b) se cumple.",
          "Nivel limitado, más consumo; una sola fuente de sangrado en vuelo.",
          "Mantenimiento: que cumpla y firme el (M) y ponga el placard.",
          "Sí, hay elementos: todavía no se sale. Se sale cuando el (M) esté firmado.",
        ],
      }),
      ...ejercicio({
        n: 4,
        titulo: "plazo vencido",
        filas: [["21-86-01", "Cabin Zone Temperature Sensor", "C", "3", "2", "(O) One may be inoperative provided associated zone temperature is controlled manually."]],
        situacion: "Registrado el 20 de junio a las 22:10 UTC. El operador cuenta en UTC. Hoy es 1 de julio, salida 06:00 UTC. El tech log no muestra extensión.",
        soluciones: [
          "Sensor de temperatura de zona de cabina, ATA 21 Air Conditioning.",
          "C. El 20 no cuenta; cuentan del 21 al 30 de junio. Venció a las 2359 UTC del 30 de junio.",
          "3.",
          "2.",
          "No hay (M).",
          "Sí: control manual de la temperatura de esa zona.",
          "Técnicamente se cumplirían, pero el plazo ya pasó.",
          "Ninguno, porque el alivio ya no existe.",
          "Si hay una extensión aprobada según el procedimiento del operador (FAA: única, solo B y C, 8900.1 4-689).",
          "Sí, hay elementos: no se sale sin reparación o extensión documentada. La trampa es contar el 20 como día 1.",
        ],
      }),
      ...ejercicio({
        n: 5,
        titulo: "la fila de otra configuración",
        filas: [
          ["32-85-01", "Brake Temperature Monitoring System", "", "", "", ""],
          ["1)", "Aircraft with Mod. 1234", "C", "1", "0", "(O) May be inoperative provided brake temperatures are checked as specified in the (O) procedure."],
          [
            "2)",
            "Aircraft without Mod. 1234",
            "C",
            "1",
            "0",
            "(M)(O) May be inoperative provided: a) Brake temperatures are checked by maintenance before each departure, and b) (O) procedure is used.",
          ],
        ],
        situacion: "El tech log difiere por 32-85-01 1). Según los registros, este avión **no** tiene la Mod. 1234. No hay (M) firmado.",
        soluciones: [
          "Monitoreo de temperatura de frenos, ATA 32 Landing Gear.",
          "C: 10 días (FAA).",
          "1.",
          "0.",
          "En la fila correcta, 2), sí hay (M), y no está hecho.",
          "Sí, en ambas filas.",
          "La fila 1) no aplica a este avión. La 2) pide la verificación por mantenimiento antes de cada salida: no hay constancia.",
          "Sin monitoreo de temperatura de frenos: atención a tiempos de escala cortos y frenadas fuertes.",
          "Mantenimiento: corregir la referencia MEL y cumplir el (M) de la fila 2).",
          "Sí, hay elementos: así como está, no se sale. El diferido cita un alivio que no existe para este avión.",
        ],
      }),
      ...ejercicio({
        n: 6,
        titulo: "dos ítems que se suman en la aproximación",
        filas: [
          [
            "34-86-01",
            "Radio Altimeter",
            "A",
            "2",
            "1",
            "(O) One may be inoperative provided: a) Approach minimums do not require its use, and b) Repairs are made within 3 flight-days.",
          ],
          ["22-85-01", "Autopilot", "C", "2", "1", "(O) One may be inoperative provided approach minimums do not require its use."],
        ],
        situacion:
          "Radioaltímetro 1 diferido ayer a las 16:00. Hoy se difiere el autopiloto 2. Destino con pronóstico de niebla por debajo de los mínimos CAT I a la hora de llegada; el alterno está en CAT I holgado.",
        soluciones: [
          "Radioaltímetro (ATA 34) y autopiloto (ATA 22).",
          "RA: A, 3 días de vuelo sin contar el día del descubrimiento (ayer); hoy es el primero. Autopiloto: C, 10 días (FAA).",
          "2 y 2.",
          "1 y 1.",
          "Ninguno tiene (M).",
          "Ambos: planificación con los mínimos disponibles.",
          "Cada uno se cumple si la aproximación no los requiere. Juntos, pueden dejar al avión sin capacidad por debajo de CAT I.",
          "Si solo queda CAT I, el destino no es aterrizable a la hora prevista: hay que planear con el alterno y el combustible para llegar a él.",
          "AFM y manual del operador: qué exige cada categoría de aproximación; despacho: alterno y combustible.",
          "Falta información para cerrar: qué aproximaciones quedan autorizadas con esta combinación. Con eso, la salida es posible solo si el plan no depende de una aproximación por debajo de CAT I.",
        ],
      }),
      verificar("Qué aproximaciones exigen radioaltímetro y autopiloto en cada categoría, contra el AFM y el manual de operaciones del operador."),
      ...ejercicio({
        n: 7,
        titulo: "categoría A contada en vuelos",
        filas: [
          [
            "26-85-01",
            "Lavatory Smoke Detector",
            "A",
            "2",
            "1",
            "(M)(O) One may be inoperative provided: a) Associated lavatory is locked closed and not used, and b) Repairs are made within 3 flights.",
          ],
        ],
        situacion:
          "Diferido esta mañana antes del primer vuelo, (M) firmado y placard puesto. Vuelos hechos: BOG-MDE, MDE-BOG, BOG-CTG. Te toca CTG-BOG.",
        soluciones: [
          "Detector de humo del baño, ATA 26 Fire Protection.",
          "A: 3 vuelos, contados desde que se difirió (PL-25, Category A en vuelos).",
          "2.",
          "1.",
          "Sí, cumplido y firmado.",
          "Sí: baño cerrado y fuera de servicio; aviso a la tripulación de cabina.",
          "a) se cumple; b) ya se hicieron los 3 vuelos.",
          "El tuyo sería el cuarto.",
          "Si el diferido se hizo antes del primer vuelo (sí) y si hay extensión: una categoría A no se extiende (8900.1 4-689F).",
          "Sí, hay elementos: no se sale. La trampa es contar días en vez de vuelos.",
        ],
      }),
      ...ejercicio({
        n: 8,
        titulo: "sin la meteorología no se decide",
        filas: [["34-85-01", "Weather Radar System", "C", "1", "0", "May be inoperative provided weather radar is not required by the operating rules."]],
        situacion: "Radar inoperativo, anotado y con placard. Salida 18:10 local. El paquete de despacho todavía no trae el pronóstico de ruta.",
        soluciones: [
          "Radar meteorológico, ATA 34 Navigation.",
          "C: 10 días (FAA).",
          "1.",
          "0.",
          "No hay (M).",
          "No hay (O).",
          "Depende de si la norma lo exige: en Colombia, RAC 121.860 (noche o IMC con tormentas esperadas).",
          "Si se sale: sin detección de tormentas.",
          "Pronóstico de ruta, destino y alterno; hora real de llegada; condiciones IMC.",
          "**Falta información.** Con tormentas esperadas de noche o en IMC, no; sin ellas, sí.",
        ],
      }),
      ...ejercicio({
        n: 9,
        titulo: "la NOTE no es un proviso",
        filas: [
          [
            "34-87-01",
            "Predictive Windshear System",
            "B",
            "1",
            "0",
            "(O) May be inoperative provided alternate procedures are established and used. NOTE: Reactive windshear warning remains available if operative.",
          ],
        ],
        situacion:
          "El primer oficial dice que no se puede salir porque el sistema reactivo tiene una falla intermitente anotada hace un mes y cerrada. Hoy funciona y no hay otro diferido.",
        soluciones: [
          "Windshear predictivo, ATA 34.",
          "B: 3 días calendario sin contar el de hoy (FAA).",
          "1.",
          "0.",
          "No hay (M).",
          "Sí: procedimientos alternos (repaso de evitar y recuperar de windshear).",
          "Un solo proviso: procedimientos alternos. Se cumple con el (O).",
          "Sin aviso predictivo; más atención a reportes de windshear y convección en despegue y aproximación.",
          "Que el reactivo no tenga un diferido abierto: está cerrado y operativo.",
          "Sí, hay elementos: se sale con el (O). La NOTE informa, no condiciona (PL-25: «A note is not a part of the proviso»).",
        ],
      }),
      ...ejercicio({
        n: 10,
        titulo: "«considered inoperative» que cambia el nivel",
        filas: [
          [
            "34-88-01",
            "Air Data Computer",
            "C",
            "3",
            "2",
            "(M) One may be inoperative provided: a) Associated ADC is deactivated, and b) Altitude Alerting System is considered inoperative.",
          ],
          ["34-89-01", "Altitude Alerting System", "C", "1", "0", "(O) May be inoperative provided airplane is not operated in RVSM airspace."],
        ],
        situacion: "ADC 2 falla. (M) firmado. El plan de vuelo es en un nivel RVSM.",
        soluciones: [
          "Computador de datos de aire, y por arrastre alerta de altitud, ATA 34.",
          "Ambos C: 10 días (FAA).",
          "3 y 1.",
          "2 y 0.",
          "Sí, en el ADC: cumplido.",
          "Sí, en la alerta de altitud: no operar en RVSM.",
          "La alerta funciona, pero se trata como inoperativa (PL-25, Considered Inoperative), así que se aplica su entrada: fuera de RVSM. El plan actual no la cumple.",
          "Nivel por debajo de RVSM: más consumo, otra ruta posible, coordinación con ATC.",
          "Despacho: nuevo plan y combustible; alterno con el nuevo consumo.",
          "Sí, hay elementos: con el plan actual, no. Con plan fuera de RVSM y combustible recalculado, sí.",
        ],
      }),
      enPocasPalabras([
        "El mismo orden de lectura, siempre: sistema, configuración, categoría, números, provisos, (M), (O), impacto.",
        "Las trampas están en los Remarks, en las fechas y en las filas de configuración.",
        "«Considered inoperative» trae la otra entrada completa.",
        "Una NOTE informa; un proviso obliga.",
        "«Falta información» es una respuesta válida: se pide el dato antes de decidir.",
      ]),
      fuentes(
        "PL-25 · 8900.1 4-689",
        [
          "PL-25 Rev 24: Repair Category A-D, Day of Discovery, Flight-Day, Considered Inoperative, NOTE, Proviso, Dash, (M), (O).",
          "FAA Order 8900.1 Vol 4 Cap 4 Secc 3, 4-685B4)b) y 4-689 (incluido 4-689F: no se extiende la categoría A).",
          "RAC 121 Enm. 10, 121.860.",
        ],
        ["Qué aproximaciones exigen radioaltímetro y autopiloto en cada categoría, contra el AFM y el manual de operaciones del operador."],
      ),
    ],
  },
]
