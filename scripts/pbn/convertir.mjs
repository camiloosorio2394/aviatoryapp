#!/usr/bin/env node
/**
 * Convierte docs/contenido/pbn.md en:
 *
 *   src/lib/pbnLeccion.ts                   los 52 capítulos, para el lector
 *   src/lib/pbnPractica.ts                  las 156 preguntas de los quiz de capítulo
 *   contenido/bancos/pbn_evaluacion.json    las 50 del quiz final
 *
 * El documento es la fuente: se edita allí y se vuelve a correr esto. La
 * plantilla de cada capítulo:
 *
 *   ## N. TÍTULO                             abre un capítulo (en versales)
 *   **ID:** Pnn · **Tiempo:** N min          los minutos; la línea no se emite
 *   ### ¿Qué es? … ### En pocas palabras     los apartados, como `titulo`
 *   #### X                                   subtítulo dentro de un apartado
 *   [ESPACIO PARA IMAGEN]                    hueco, con IMAGEN SUGERIDA: y OBJETIVO:
 *   [ESPACIO PARA IMAGEN ANOTADA]            hueco, con IMAGEN BASE:, ANOTACIONES: y OBJETIVO PEDAGÓGICO:
 *   ### Quiz · Capítulo N                    NO entra en la lección: va a la práctica
 *   ### Escenario N · Título                 (capítulo 52) un piensaComoPiloto
 *   # BLOQUE N · TÍTULO                      abre un nivel del índice lateral
 *
 * En la lectura no se pregunta nada (regla de Camilo): las preguntas de cada
 * capítulo viven en la pantalla de práctica, y las del quiz final, en el
 * servidor. Por eso el script comprueba que ninguna de práctica repita una
 * del banco.
 *
 * El cierre del módulo (errores frecuentes, lo que hay que memorizar y las
 * preguntas de entrevista) se engancha al final del capítulo 52. Los anexos no
 * se convierten: son para quien mantiene el módulo.
 *
 * Si algo no cuadra con lo que el documento promete, no se escribe nada.
 *
 * Uso: node scripts/pbn/convertir.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const FUENTE = path.join(RAIZ, "docs/contenido/pbn.md")
const DESTINO_LECCION = path.join(RAIZ, "src/lib/pbnLeccion.ts")
const DESTINO_PRACTICA = path.join(RAIZ, "src/lib/pbnPractica.ts")
const DESTINO_BANCO = path.join(RAIZ, "contenido/bancos/pbn_evaluacion.json")

/** Lo que el documento promete en su ficha. Si no cuadra, el script para. */
const ESPERADO = { capitulos: 52, huecos: 28, escenarios: 12, porCapitulo: 3, practica: 156, banco: 50 }

const FIGURA = { medida: "Figura · 16:9 · 1600×900", ratio: "16 / 9", alto: 260 }

const lineas = fs.readFileSync(FUENTE, "utf8").replace(/\r\n/g, "\n").split("\n")

const fallos = []
const comprobar = (cond, mensaje) => {
  if (!cond) fallos.push(mensaje)
}

// ─── Utilidades de lectura ──────────────────────────────────────────────────

const ES_MARCA = (l) =>
  l === "[ESPACIO PARA IMAGEN]" ||
  l === "[ESPACIO PARA IMAGEN ANOTADA]" ||
  /^(IMAGEN SUGERIDA|IMAGEN BASE|ANOTACIONES|OBJETIVO|OBJETIVO PEDAGÓGICO):$/.test(l)

function finDeParrafo(cuerpo, i) {
  let j = i
  while (
    j < cuerpo.length &&
    cuerpo[j].trim() !== "" &&
    !cuerpo[j].startsWith("#") &&
    !cuerpo[j].startsWith("- ") &&
    !cuerpo[j].startsWith("> ") &&
    !cuerpo[j].startsWith("|") &&
    !cuerpo[j].startsWith("---") &&
    !cuerpo[j].startsWith("```") &&
    !/^\d+\. /.test(cuerpo[j]) &&
    (j === i || !ES_MARCA(cuerpo[j]))
  ) {
    j++
  }
  return j
}

function leerParrafo(cuerpo, i) {
  const fin = finDeParrafo(cuerpo, i)
  return { texto: cuerpo.slice(i, fin).join(" ").trim(), siguiente: fin }
}

function leerLista(cuerpo, i, ordenada) {
  const marca = ordenada ? /^\d+\. / : /^- /
  const items = []
  let j = i
  while (j < cuerpo.length && marca.test(cuerpo[j])) {
    items.push(cuerpo[j].replace(marca, "").trim())
    j++
  }
  return { items, siguiente: j }
}

function leerTabla(cuerpo, i) {
  const fila = (l) =>
    l
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim())
  const head = fila(cuerpo[i])
  let j = i + 2 // la línea de guiones
  const rows = []
  while (j < cuerpo.length && cuerpo[j].trim().startsWith("|")) {
    rows.push(fila(cuerpo[j]))
    j++
  }
  return { bloque: { kind: "table", head, rows }, siguiente: j }
}

function leerCita(cuerpo, i) {
  const partes = []
  let j = i
  while (j < cuerpo.length && cuerpo[j].startsWith(">")) {
    partes.push(cuerpo[j].replace(/^>\s?/, "").trim())
    j++
  }
  return { texto: partes.join(" ").trim(), siguiente: j }
}

function leerCerca(cuerpo, i) {
  let j = i + 1
  const dentro = []
  while (j < cuerpo.length && !cuerpo[j].startsWith("```")) {
    dentro.push(cuerpo[j])
    j++
  }
  return { texto: dentro.join(" ").trim(), siguiente: j + 1 }
}

/**
 * Un hueco de imagen, en sus dos formas.
 *
 * La simple trae IMAGEN SUGERIDA: y OBJETIVO:. La anotada trae IMAGEN BASE:,
 * ANOTACIONES: con sus flechas y OBJETIVO PEDAGÓGICO:. Las dos acaban en el
 * mismo bloque `hueco`: lo que cambia es que en la anotada la descripción
 * lleva pegadas las flechas, que es justo lo que necesita quien la dibuje.
 */
function leerHueco(cuerpo, i, ctx) {
  const anotada = cuerpo[i] === "[ESPACIO PARA IMAGEN ANOTADA]"
  let j = i + 1
  const saltarBlancos = () => {
    while (j < cuerpo.length && cuerpo[j].trim() === "") j++
  }
  /** Lee el tramo que va tras un rótulo, hasta el siguiente rótulo o el fin. */
  const tramo = (rotulo) => {
    saltarBlancos()
    if (cuerpo[j] !== rotulo) return null
    j++
    const partes = []
    while (j < cuerpo.length && cuerpo[j].trim() !== "" && !ES_MARCA(cuerpo[j]) && !cuerpo[j].startsWith("#")) {
      partes.push(cuerpo[j].trim())
      j++
    }
    return partes.join(" ").trim()
  }

  const descripcion = anotada ? tramo("IMAGEN BASE:") : tramo("IMAGEN SUGERIDA:")
  const anotaciones = anotada ? tramo("ANOTACIONES:") : null
  const pie = anotada ? tramo("OBJETIVO PEDAGÓGICO:") : tramo("OBJETIVO:")

  if (!descripcion || !pie || (anotada && !anotaciones)) {
    fallos.push(`hueco de imagen incompleto cerca de la línea «${cuerpo[i + 1] ?? ""}»`)
    return { bloque: null, siguiente: j }
  }

  const codigo = `RV-${String(ctx.huecos.length + 1).padStart(2, "0")}`
  ctx.huecos.push(codigo)

  return {
    bloque: {
      kind: "hueco",
      rotulo: `${codigo} · ${FIGURA.medida}${anotada ? " · anotada" : ""}`,
      descripcion: anotada ? `${descripcion} ANOTACIONES: ${anotaciones}` : descripcion,
      pie,
      alto: FIGURA.alto,
      ratio: FIGURA.ratio,
    },
    siguiente: j,
  }
}

// ─── Preguntas ──────────────────────────────────────────────────────────────

const ENUNCIADO = /^\*\*([a-z]{1,2}\d{2}-q\d|ev-\d\d)\*\* · (.+)$/
const OPCION = /^- ([A-D])\) (.+)$/
const CORRECTA = /^\*\*Correcta:\*\* ([A-D])(?: · (.+))?$/
const EXPLICACION = /^\*\*Explicación:\*\* (.+)$/

/** Las preguntas de un tramo, en el formato que declara la ficha del módulo. */
function leerPreguntas(cuerpo, donde) {
  const preguntas = []
  let i = 0
  while (i < cuerpo.length) {
    const cab = cuerpo[i].match(ENUNCIADO)
    if (!cab) {
      i++
      continue
    }
    const id = cab[1]
    const enunciado = cab[2].trim()
    i++

    const opciones = []
    while (i < cuerpo.length && OPCION.test(cuerpo[i])) {
      opciones.push(cuerpo[i].match(OPCION)[2].trim())
      i++
    }
    if (opciones.length !== 4) {
      fallos.push(`${donde} · ${id}: esperaba cuatro opciones y encontré ${opciones.length}`)
      continue
    }

    const corr = cuerpo[i]?.match(CORRECTA)
    if (!corr) {
      fallos.push(`${donde} · ${id}: falta la línea «Correcta:»`)
      continue
    }
    i++
    const meta = corr[2] ?? ""
    const tema = meta.match(/\*\*Tema:\*\* ([^·]+)/)?.[1]?.trim()
    const referencia = meta.match(/\*\*Referencia:\*\* (.+)$/)?.[1]?.trim()

    const expl = cuerpo[i]?.match(EXPLICACION)
    if (!expl) {
      fallos.push(`${donde} · ${id}: falta la explicación`)
      continue
    }
    i++

    preguntas.push({
      id,
      enunciado,
      opciones,
      correcta: corr[1].charCodeAt(0) - 65,
      explicacion: expl[1].trim(),
      referencia: referencia ?? "",
      tema: tema ?? "",
    })
  }
  return preguntas
}

// ─── Bloques de un tramo ────────────────────────────────────────────────────

function bloquesDe(cuerpo, ctx) {
  const bloques = []
  let i = 0

  while (i < cuerpo.length) {
    const l = cuerpo[i]

    if (l.trim() === "" || l.startsWith("---")) {
      i++
      continue
    }

    if (l === "[ESPACIO PARA IMAGEN]" || l === "[ESPACIO PARA IMAGEN ANOTADA]") {
      const { bloque, siguiente } = leerHueco(cuerpo, i, ctx)
      if (bloque) bloques.push(bloque)
      i = siguiente
      continue
    }

    if (l.startsWith("#### ")) {
      bloques.push({ kind: "sub", text: l.replace(/^#### /, "").trim() })
      i++
      continue
    }

    if (l.startsWith("### ")) {
      bloques.push({ kind: "titulo", text: l.replace(/^### /, "").trim() })
      i++
      continue
    }

    if (l.startsWith("## ")) {
      bloques.push({ kind: "titulo", text: l.replace(/^## /, "").trim() })
      i++
      continue
    }

    if (l.startsWith("|")) {
      const { bloque, siguiente } = leerTabla(cuerpo, i)
      bloques.push(bloque)
      i = siguiente
      continue
    }

    if (l.startsWith(">")) {
      const { texto, siguiente } = leerCita(cuerpo, i)
      if (texto) bloques.push({ kind: "quote", text: texto })
      i = siguiente
      continue
    }

    if (l.startsWith("```")) {
      const { texto, siguiente } = leerCerca(cuerpo, i)
      if (texto) bloques.push({ kind: "p", text: texto })
      i = siguiente
      continue
    }

    if (l.startsWith("- ")) {
      const { items, siguiente } = leerLista(cuerpo, i, false)
      bloques.push({ kind: "list", items })
      i = siguiente
      continue
    }

    if (/^\d+\. /.test(l)) {
      const { items, siguiente } = leerLista(cuerpo, i, true)
      bloques.push({ kind: "list", items, ordered: true })
      i = siguiente
      continue
    }

    const { texto, siguiente } = leerParrafo(cuerpo, i)
    if (texto) bloques.push({ kind: "p", text: texto })
    i = siguiente > i ? siguiente : i + 1
  }

  return bloques
}

/**
 * Los diez escenarios del capítulo 32, como `piensaComoPiloto`: la situación y
 * la pregunta quedan a la vista y el razonamiento se abre con un botón, que es
 * lo que obliga a pensar antes de leer la respuesta.
 */
function leerEscenarios(cuerpo, ctx) {
  const bloques = []
  let i = 0
  while (i < cuerpo.length) {
    const cab = cuerpo[i].match(/^### Escenario (\d+) · (.+)$/)
    if (!cab) {
      i++
      continue
    }
    const titulo = cab[2].trim()
    const campo = (rotulo) => {
      const idx = cuerpo.findIndex((l, k) => k > i && l.startsWith(`**${rotulo}:**`))
      if (idx === -1 || (cuerpo[idx + 1] ?? "").startsWith("### Escenario")) return null
      return cuerpo[idx].replace(`**${rotulo}:**`, "").trim()
    }
    const situacion = campo("Situación")
    const pregunta = campo("Pregunta")
    const razonamiento = campo("Razonamiento correcto")
    const referencia = campo("Referencia")

    if (!situacion || !pregunta || !razonamiento) {
      fallos.push(`escenario ${cab[1]}: le falta situación, pregunta o razonamiento`)
      i++
      continue
    }

    ctx.escenarios.push(cab[1])
    // `momento` es el rótulo del bloque y `claves` lo que se abre con el botón:
    // aquí, la referencia que respalda el razonamiento. El título del escenario
    // va en `momento` porque `piensaComoPiloto` no tiene campo de título.
    bloques.push({
      kind: "piensaComoPiloto",
      momento: `Escenario ${cab[1]} · ${titulo}`,
      rotulo: "Escenario de práctica",
      situacion,
      pregunta,
      respuesta: razonamiento,
      claves: referencia ? [{ titulo: "Referencia", texto: referencia }] : [],
    })
    i++
  }
  return bloques
}

/**
 * «QUÉ ES PBN» → «Qué es PBN».
 *
 * Los títulos del documento van en versales y hay que bajarlos, pero sin
 * tocar las siglas. Detectarlas por longitud no funciona: «QUÉ», «TRES» y
 * «SON» son mayúsculas y cortas y no son siglas. Por eso la lista es
 * explícita; si aparece una sigla nueva en un título, se añade aquí.
 */
const SIGLAS = new Set(["PBN","RNAV","RNP","APCH","AR","A-RNP","OACI","FAA","RAC","AIP","UAEAC","ATC","ATS","ATM",
  "GNSS","GPS","SBAS","GBAS","WAAS","LAAS","GLONASS","RAIM","FDE","ABAS","ADS-B","DME","VOR","NDB","ILS","GLS","IRS","IRU","INS",
  "FMS","FMC","AFM","FCOM","QRH","SOP","MEL","CDL","PFD","ND","EFB","TAWS","GPWS","TCAS","ACAS","CPDLC","AIRAC","AIS",
  "ANP","EPU","EPE","TSE","NSE","PDE","FTE","PSE","PEE","XTK","DTK","RF","TF","CF","DF","IF","FAF","FAP","IAF","MDA","DA","OEA",
  "LNAV","VNAV","BARO-VNAV","LNAV/VNAV","LPV","LP","APV","QNH","QFE","FL","IFR","VFR","PF","PM","MON","MNPS","RSP","EDTO","CAT","SID","STAR","DP","ODP",
  "NOTAM","ARINC","RTCA","TSO","LOA","OEM","NM","FIR","OPSPECS","FOV","FRT","DER","TIBA","ADC"])

/** Nombres propios que tampoco se bajan. */
const PROPIOS = new Set(["COLOMBIA","BOGOTÁ","NUEVA","ZELANDA","SUDAMÉRICA","CARIBE","ESTADOS","UNIDOS"])

function capitalizar(texto) {
  const bajo = texto
    .split(" ")
    .map((palabra) => {
      const nucleo = palabra.replace(/[^A-Za-zÁÉÍÓÚÑÜ0-9-]/g, "")
      const arriba = nucleo.toUpperCase()
      if (SIGLAS.has(arriba) && nucleo === arriba) return palabra
      if (PROPIOS.has(arriba)) {
        const bajo = palabra.toLocaleLowerCase("es")
        return bajo.replace(/\p{L}/u, (c) => c.toLocaleUpperCase("es"))
      }
      return palabra.toLocaleLowerCase("es")
    })
    .join(" ")
  // La primera letra, no el primer carácter: un título que abre con comilla
  // angular se quedaba en minúscula.
  return bajo.replace(/\p{L}/u, (c) => c.toLocaleUpperCase("es"))
}

// ─── Recorrido del documento ────────────────────────────────────────────────

const ctx = { huecos: [], escenarios: [] }
const niveles = []
const capitulos = []
let bancoCrudo = []
let cierre = []

for (let i = 0; i < lineas.length; i++) {
  const l = lineas[i]

  const bloque = l.match(/^# BLOQUE \d+ · (.+)$/)
  if (bloque) {
    niveles.push({ titulo: capitalizar(bloque[1].trim()), desde: capitulos.length + 1 })
    continue
  }

  if (/^# QUIZ FINAL DE PBN$/.test(l)) {
    let fin = i + 1
    while (fin < lineas.length && !/^# /.test(lineas[fin])) fin++
    bancoCrudo = leerPreguntas(lineas.slice(i + 1, fin), "banco")
    i = fin - 1
    continue
  }

  if (/^# CIERRE DEL MÓDULO$/.test(l)) {
    // Hasta el siguiente encabezado de nivel 1, que es el quiz final. Parar en
    // «# ANEXO» se tragaba el banco entero y lo dejaba en cero sin avisar.
    let fin = i + 1
    while (fin < lineas.length && !/^# /.test(lineas[fin])) fin++
    cierre = lineas.slice(i + 1, fin)
    i = fin - 1
    continue
  }

  const cap = l.match(/^## ([1-9]\d*)\. (.+)$/)
  if (!cap) continue

  let fin = i + 1
  while (fin < lineas.length && !/^## [1-9]\d*\. /.test(lineas[fin]) && !/^# /.test(lineas[fin])) fin++

  capitulos.push({ n: Number(cap[1]), titulo: capitalizar(cap[2].trim()), cuerpo: lineas.slice(i + 1, fin) })
  i = fin - 1
}

// ─── Capítulos: lección, práctica y minutos ─────────────────────────────────

const lecciones = []
const practica = []

for (const [idx, cap] of capitulos.entries()) {
  const cuerpo = cap.cuerpo

  // La línea de ID y tiempo es nota de implementación: da los minutos y no se pinta.
  const meta = cuerpo.find((l) => /^\*\*ID:\*\*/.test(l)) ?? ""
  const id = meta.match(/\*\*ID:\*\*\s*(P\d\d)/)?.[1]
  const minutos = Number(meta.match(/\*\*Tiempo:\*\*\s*(\d+)\s*min/)?.[1]) || 5
  comprobar(Boolean(id), `capítulo ${cap.n}: falta la línea de ID`)

  const corteQuiz = cuerpo.findIndex((l) => /^### Quiz · Capítulo \d+/.test(l))
  const corteEsc = cuerpo.findIndex((l) => /^### Escenario \d+ · /.test(l))

  // El texto de la lección: todo menos la línea de meta, los escenarios y el quiz.
  const hasta = corteEsc !== -1 ? corteEsc : corteQuiz !== -1 ? corteQuiz : cuerpo.length
  const texto = cuerpo.slice(0, hasta).filter((l) => !/^\*\*ID:\*\*/.test(l))

  const blocks = bloquesDe(texto, ctx)

  if (corteEsc !== -1) {
    const finEsc = corteQuiz !== -1 ? corteQuiz : cuerpo.length
    blocks.push(...leerEscenarios(cuerpo.slice(corteEsc, finEsc), ctx))
  }

  // El cierre del módulo se engancha al final del último capítulo.
  if (idx === capitulos.length - 1 && cierre.length > 0) {
    blocks.push(...bloquesDe(cierre, ctx))
  }

  lecciones.push({ n: cap.n, title: cap.titulo, kicker: id ?? `P${cap.n}`, minutes: minutos, blocks })

  if (corteQuiz !== -1) {
    const finQuiz = cuerpo.length
    const preguntas = leerPreguntas(cuerpo.slice(corteQuiz + 1, finQuiz), `capítulo ${cap.n}`)
    comprobar(
      preguntas.length === ESPERADO.porCapitulo,
      `capítulo ${cap.n}: esperaba ${ESPERADO.porCapitulo} preguntas y encontré ${preguntas.length}`,
    )
    practica.push({
      tema: id ?? `P${cap.n}`,
      n: cap.n,
      titulo: cap.titulo,
      preguntas: preguntas.map(({ tema, ...resto }) => resto),
    })
  }
}

// ─── Comprobaciones ─────────────────────────────────────────────────────────

comprobar(capitulos.length === ESPERADO.capitulos, `esperaba ${ESPERADO.capitulos} capítulos y encontré ${capitulos.length}`)
comprobar(ctx.huecos.length === ESPERADO.huecos, `esperaba ${ESPERADO.huecos} huecos y encontré ${ctx.huecos.length}`)
comprobar(ctx.escenarios.length === ESPERADO.escenarios, `esperaba ${ESPERADO.escenarios} escenarios y encontré ${ctx.escenarios.length}`)
comprobar(bancoCrudo.length === ESPERADO.banco, `esperaba ${ESPERADO.banco} preguntas de banco y encontré ${bancoCrudo.length}`)

const totalPractica = practica.reduce((n, g) => n + g.preguntas.length, 0)
comprobar(totalPractica === ESPERADO.practica, `esperaba ${ESPERADO.practica} preguntas de práctica y encontré ${totalPractica}`)

for (const l of lecciones) comprobar(l.blocks.length > 0, `el capítulo ${l.n} salió vacío`)

// Ninguna de práctica puede repetir una del banco: es la regla de la casa y
// además lo vigila evaluacionesContenido.test.ts.
const norma = (s) => s.replace(/\s+/g, " ").trim().toLocaleLowerCase("es")
const enBanco = new Set(bancoCrudo.map((q) => norma(q.enunciado)))
for (const g of practica) {
  for (const q of g.preguntas) {
    comprobar(!enBanco.has(norma(q.enunciado)), `${q.id} repite un enunciado del banco de evaluación`)
  }
}

const ids = [...practica.flatMap((g) => g.preguntas.map((q) => q.id)), ...bancoCrudo.map((q) => q.id)]
comprobar(new Set(ids).size === ids.length, "hay identificadores de pregunta repetidos")

if (fallos.length > 0) {
  console.error("No se generó nada:")
  for (const f of fallos) console.error(`  · ${f}`)
  process.exit(1)
}

// ─── Escritura ──────────────────────────────────────────────────────────────

const j = (v) => JSON.stringify(v, null, 2)
const crlf = (s) => s.replace(/\n/g, "\r\n")

fs.writeFileSync(
  DESTINO_LECCION,
  crlf(`// GENERADO por scripts/pbn/convertir.mjs desde docs/contenido/pbn.md.
// No se edita a mano: se edita el documento y se vuelve a correr el script.

/**
 * Los ${lecciones.length} capítulos de PBN, en el formato del lector de lecciones.
 *
 * El contenido es el del documento, sin tocar: este archivo lo traduce a
 * bloques. Las ${ctx.huecos.length} imágenes entran como huecos rotulados, cada uno con lo que
 * hay que dibujar y para qué, así que el módulo se lee completo desde hoy.
 *
 * Las preguntas de cada capítulo NO están aquí: viven en pbnPractica.ts,
 * porque en la lectura no se pregunta nada.
 */

import type { DocScreen } from "@/lib/docBlocks"
import type { LectorNivel } from "@/components/lesson/LectorLeccion"

/** Los ${niveles.length} bloques del documento, con el capítulo en el que empieza cada uno. */
export const PB_NIVELES: LectorNivel[] = ${j(niveles)}

export const PB_LECCIONES: DocScreen[] = ${j(lecciones)}

/** Cuántos capítulos hay. Lo lee el catálogo de contenido, que valida la base. */
export const PB_LECCION_TOTAL = ${lecciones.length}

/** Las claves de práctica: los identificadores de las preguntas de capítulo. */
export const PB_PRACTICA_CLAVES = ${j(practica.flatMap((g) => g.preguntas.map((q) => q.id)))}

/** Los huecos de figura que quedan por llenar, para el inventario de imágenes. */
export const PB_FIGURAS_PENDIENTES = ${j(ctx.huecos)}
`),
)

fs.writeFileSync(
  DESTINO_PRACTICA,
  crlf(`// GENERADO por scripts/pbn/convertir.mjs desde docs/contenido/pbn.md.
// No se edita a mano: se edita el documento y se vuelve a correr el script.

/**
 * La práctica de PBN: las tres preguntas del quiz de cada capítulo, con
 * corrección inmediata.
 *
 * No son las del quiz final, que viven en el servidor
 * (contenido/bancos/pbn_evaluacion.json); el conversor comprueba que ningún
 * enunciado de aquí repita uno de allá.
 */

import type { GrupoPractica } from "@/lib/practicaQuiz"

export const PB_PRACTICA: GrupoPractica[] = ${j(practica)}
`),
)

fs.writeFileSync(
  DESTINO_BANCO,
  `${JSON.stringify(
    {
      banco: "pbn_evaluacion",
      descripcion: "Quiz final del módulo PBN. Cada intento toma 20 al azar.",
      preguntas: bancoCrudo.map((q) => ({
        id: q.id,
        enunciado: q.enunciado,
        opciones: q.opciones,
        correcta: q.correcta,
        explicacion: q.explicacion,
        referencia: q.referencia,
        metadatos: { tema: q.tema },
      })),
    },
    null,
    2,
  )}\n`,
)

console.log(`${DESTINO_LECCION}: ${lecciones.length} capítulos, ${niveles.length} bloques`)
console.log(`${DESTINO_PRACTICA}: ${totalPractica} preguntas en ${practica.length} grupos`)
console.log(`${DESTINO_BANCO}: ${bancoCrudo.length} preguntas`)
console.log(`huecos de imagen: ${ctx.huecos.length} · escenarios: ${ctx.escenarios.length}`)
