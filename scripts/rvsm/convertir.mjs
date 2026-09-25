#!/usr/bin/env node
/**
 * Convierte docs/contenido/rvsm.md en:
 *
 *   src/lib/rvsmLeccion.ts                   los 32 capítulos, para el lector
 *   src/lib/rvsmPractica.ts                  las 96 preguntas de los quiz de capítulo
 *   contenido/bancos/rvsm_evaluacion.json    las 40 del quiz final
 *
 * El documento es la fuente: se edita allí y se vuelve a correr esto. La
 * plantilla de cada capítulo:
 *
 *   ## N. TÍTULO                             abre un capítulo (en versales)
 *   **ID:** Rnn · **Tiempo:** N min          los minutos; la línea no se emite
 *   ### ¿Qué es? … ### En pocas palabras     los apartados, como `titulo`
 *   #### X                                   subtítulo dentro de un apartado
 *   [ESPACIO PARA IMAGEN]                    hueco, con IMAGEN SUGERIDA: y OBJETIVO:
 *   [ESPACIO PARA IMAGEN ANOTADA]            hueco, con IMAGEN BASE:, ANOTACIONES: y OBJETIVO PEDAGÓGICO:
 *
 * Cada hueco lleva un código por orden de aparición (RV-01, RV-02…). Si la
 * figura de ese código ya está dibujada (scripts/rvsm/figuras y su SVG en
 * public/modulos/rvsm/), sale la figura; si no, el hueco rotulado. Ver
 * scripts/figuras/enLeccion.mjs.
 *   ### Quiz · Capítulo N                    NO entra en la lección: va a la práctica
 *   ### Escenario N · Título                 (capítulo 32) un piensaComoPiloto
 *   # BLOQUE N · TÍTULO                      abre un nivel del índice lateral
 *
 * En la lectura no se pregunta nada (regla de Camilo): las preguntas de cada
 * capítulo viven en la pantalla de práctica, y las del quiz final, en el
 * servidor. Por eso el script comprueba que ninguna de práctica repita una
 * del banco.
 *
 * El cierre del módulo (errores frecuentes, lo que hay que memorizar y las
 * preguntas de entrevista) se engancha al final del capítulo 32. Los anexos no
 * se convierten: son para quien mantiene el módulo.
 *
 * Si algo no cuadra con lo que el documento promete, no se escribe nada.
 *
 * Uso: node scripts/rvsm/convertir.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { bloquesDeFigura, figuraDibujada } from "../figuras/enLeccion.mjs"
import { FIGURAS } from "./figuras/index.mjs"

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const FUENTE = path.join(RAIZ, "docs/contenido/rvsm.md")
const DESTINO_LECCION = path.join(RAIZ, "src/lib/rvsmLeccion.ts")
const DESTINO_PRACTICA = path.join(RAIZ, "src/lib/rvsmPractica.ts")
const DESTINO_BANCO = path.join(RAIZ, "contenido/bancos/rvsm_evaluacion.json")
const DIR_FIGURAS = path.join(RAIZ, "public/modulos/rvsm")
const FIGURA_POR_CODIGO = new Map(FIGURAS.map((f) => [f.codigo, f]))

/** Lo que el documento promete en su ficha. Si no cuadra, el script para. */
const ESPERADO = { capitulos: 32, imagenes: 20, escenarios: 10, porCapitulo: 3, practica: 96, banco: 40 }

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
    return { bloques: [], siguiente: j }
  }

  const codigo = `RV-${String(ctx.huecos.length + ctx.figuras.length + 1).padStart(2, "0")}`
  const figura = figuraDibujada({ porCodigo: FIGURA_POR_CODIGO, codigo, dirPublico: DIR_FIGURAS, modulo: "rvsm", fallos })
  if (!figura) {
    ctx.huecos.push(codigo)
    return {
      bloques: [
        {
          kind: "hueco",
          rotulo: `${codigo} · ${FIGURA.medida}${anotada ? " · anotada" : ""}`,
          descripcion: anotada ? `${descripcion} ANOTACIONES: ${anotaciones}` : descripcion,
          pie,
          alto: FIGURA.alto,
          ratio: FIGURA.ratio,
        },
      ],
      siguiente: j,
    }
  }

  ctx.figuras.push(codigo)
  return { bloques: bloquesDeFigura({ figura, codigo, src: `/modulos/rvsm/${codigo}.svg`, anotaciones, fallos }), siguiente: j }
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
      const { bloques: deLaFigura, siguiente } = leerHueco(cuerpo, i, ctx)
      bloques.push(...deLaFigura)
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
 * «QUÉ ES RVSM» → «Qué es RVSM».
 *
 * Los títulos del documento van en versales y hay que bajarlos, pero sin
 * tocar las siglas. Detectarlas por longitud no funciona: «QUÉ», «TRES» y
 * «SON» son mayúsculas y cortas y no son siglas. Por eso la lista es
 * explícita; si aparece una sigla nueva en un título, se añade aquí.
 */
const SIGLAS = new Set([
  "RVSM", "MEL", "CDL", "OACI", "FAA", "RAC", "AIP", "ATC", "ATS", "TCAS", "ACAS",
  "CRM", "AAD", "ASE", "TVE", "LHD", "MWA", "QRH", "SOP", "FCOM", "AFM", "PFD",
  "FMS", "FMC", "ADS-B", "SSR", "QNH", "QFE", "FL", "IFR", "VFR", "PF", "PM",
  "CARSAMMA", "EDTO", "PBN", "EFB", "FIR", "OPSPECS", "ADC", "SSE", "SSEC",
])

/** Nombres propios que tampoco se bajan. */
const PROPIOS = new Set(["COLOMBIA", "BOGOTÁ", "BARRANQUILLA", "SUDAMÉRICA", "CARIBE"])

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

const ctx = { huecos: [], figuras: [], escenarios: [] }
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

  if (/^# QUIZ FINAL DE RVSM$/.test(l)) {
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
  const id = meta.match(/\*\*ID:\*\*\s*(R\d\d)/)?.[1]
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

  lecciones.push({ n: cap.n, title: cap.titulo, kicker: id ?? `R${cap.n}`, minutes: minutos, blocks })

  if (corteQuiz !== -1) {
    const finQuiz = cuerpo.length
    const preguntas = leerPreguntas(cuerpo.slice(corteQuiz + 1, finQuiz), `capítulo ${cap.n}`)
    comprobar(
      preguntas.length === ESPERADO.porCapitulo,
      `capítulo ${cap.n}: esperaba ${ESPERADO.porCapitulo} preguntas y encontré ${preguntas.length}`,
    )
    practica.push({
      tema: id ?? `R${cap.n}`,
      n: cap.n,
      titulo: cap.titulo,
      preguntas: preguntas.map(({ tema, ...resto }) => resto),
    })
  }
}

// ─── Comprobaciones ─────────────────────────────────────────────────────────

comprobar(capitulos.length === ESPERADO.capitulos, `esperaba ${ESPERADO.capitulos} capítulos y encontré ${capitulos.length}`)
comprobar(ctx.huecos.length + ctx.figuras.length === ESPERADO.imagenes, `esperaba ${ESPERADO.imagenes} imágenes y encontré ${ctx.huecos.length + ctx.figuras.length}`)
const sinHueco = FIGURAS.filter((f) => !ctx.figuras.includes(f.codigo)).map((f) => f.codigo)
comprobar(sinHueco.length === 0, `figuras dibujadas sin hueco en el documento: ${sinHueco.join(", ")}`)
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

// CLAUDE.md: la raya larga no va en el contenido; van paréntesis o comillas
// angulares. Se revisa el documento entero para que no llegue a la app.
{
  const conRaya = lineas
    .map((l, i) => [i + 1, l])
    .filter(([, l]) => l.includes("\u2014"))
  for (const [n, l] of conRaya.slice(0, 5)) {
    fallos.push(`raya larga en la línea ${n}: «${l.trim().slice(0, 60)}…»`)
  }
  if (conRaya.length > 5) fallos.push(`… y ${conRaya.length - 5} líneas más con raya larga`)
}

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
  crlf(`// GENERADO por scripts/rvsm/convertir.mjs desde docs/contenido/rvsm.md.
// No se edita a mano: se edita el documento y se vuelve a correr el script.

/**
 * Los ${lecciones.length} capítulos de RVSM, en el formato del lector de lecciones.
 *
 * El contenido es el del documento, sin tocar: este archivo lo traduce a
 * bloques. ${ctx.figuras.length} de las ${ctx.figuras.length + ctx.huecos.length} imágenes son figuras SVG de public/modulos/rvsm/,
 * dibujadas con scripts/figuras/dibujar.mjs rvsm; ${ctx.huecos.length ? `las otras ${ctx.huecos.length} entran como huecos rotulados.` : "no queda ningún hueco."}
 *
 * Las preguntas de cada capítulo NO están aquí: viven en rvsmPractica.ts,
 * porque en la lectura no se pregunta nada.
 */

import type { DocScreen } from "@/lib/docBlocks"
import type { LectorNivel } from "@/components/lesson/LectorLeccion"

/** Los ${niveles.length} bloques del documento, con el capítulo en el que empieza cada uno. */
export const RV_NIVELES: LectorNivel[] = ${j(niveles)}

export const RV_LECCIONES: DocScreen[] = ${j(lecciones)}

/** Cuántos capítulos hay. Lo lee el catálogo de contenido, que valida la base. */
export const RV_LECCION_TOTAL = ${lecciones.length}

/** Las claves de práctica: los identificadores de las preguntas de capítulo. */
export const RV_PRACTICA_CLAVES = ${j(practica.flatMap((g) => g.preguntas.map((q) => q.id)))}

/** Los huecos de figura que quedan por llenar, para el inventario de imágenes. */
export const RV_FIGURAS_PENDIENTES: string[] = ${j(ctx.huecos)}
`),
)

fs.writeFileSync(
  DESTINO_PRACTICA,
  crlf(`// GENERADO por scripts/rvsm/convertir.mjs desde docs/contenido/rvsm.md.
// No se edita a mano: se edita el documento y se vuelve a correr el script.

/**
 * La práctica de RVSM: las tres preguntas del quiz de cada capítulo, con
 * corrección inmediata.
 *
 * No son las del quiz final, que viven en el servidor
 * (contenido/bancos/rvsm_evaluacion.json); el conversor comprueba que ningún
 * enunciado de aquí repita uno de allá.
 */

import type { GrupoPractica } from "@/lib/practicaQuiz"

export const RV_PRACTICA: GrupoPractica[] = ${j(practica)}
`),
)

fs.writeFileSync(
  DESTINO_BANCO,
  `${JSON.stringify(
    {
      banco: "rvsm_evaluacion",
      descripcion: "Quiz final del módulo RVSM. Cada intento toma 20 al azar.",
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
console.log(`figuras: ${ctx.figuras.length} · huecos de imagen: ${ctx.huecos.length} · escenarios: ${ctx.escenarios.length}`)
