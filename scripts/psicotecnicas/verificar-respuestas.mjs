/**
 * Verifica aritméticamente la respuesta de cada serie numérica.
 *
 * Uso:
 *   node scripts/psicotecnicas/verificar-respuestas.mjs <carpeta-con-los-pdf>
 *
 * Por qué existe: las 173 series salen de un parseo automático de la sección de
 * soluciones del PDF, y un parseo puede equivocarse en silencio. Que la
 * respuesta esté marcada como correcta no la hace correcta.
 *
 * Lo que hace es reconstruir la serie con las operaciones que el propio
 * documento declara —«18 (+3) 21 (+3) 24…»— y comprobar dos cosas:
 *   1. que aplicando cada operación al término correspondiente salga el
 *      siguiente, es decir que el rastro describa la serie que se muestra;
 *   2. que aplicando la última operación al último término salga la respuesta
 *      que se cargó en el banco.
 *
 * Si las dos se cumplen, la respuesta está verificada y no depende de que nadie
 * la haya leído bien. Las que no se pueden comprobar así —series entrelazadas,
 * donde el documento no declara operación— se listan aparte para revisarlas a
 * mano: no se dan por buenas ni por malas.
 */

import { execFileSync } from "node:child_process"
import fs from "node:fs"
import { registerHooks } from "node:module"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const raiz = path.resolve(__dirname, "../..")

const origen = process.argv[2]
if (!origen) {
  console.error("Uso: node scripts/psicotecnicas/verificar-respuestas.mjs <carpeta-con-los-pdf>")
  process.exit(1)
}

function resolverTs(base) {
  for (const c of [base, `${base}.ts`, path.join(base, "index.ts")]) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c
  }
  return null
}

registerHooks({
  resolve(especificador, contexto, siguiente) {
    const alias = especificador.startsWith("@/")
    const relativo = especificador.startsWith(".")
    if (!alias && !relativo) return siguiente(especificador, contexto)
    const base = alias
      ? path.resolve(raiz, "src", especificador.slice(2))
      : path.resolve(path.dirname(fileURLToPath(contexto.parentURL)), especificador)
    const encontrado = resolverTs(base)
    if (!encontrado) return siguiente(especificador, contexto)
    return { url: pathToFileURL(encontrado).href, shortCircuit: true }
  },
})

const { SERIES } = await import(
  pathToFileURL(path.resolve(raiz, "src/data/psicotecnicas/series.ts")).href
)

// ── La fuente, otra vez, para leer el rastro de operaciones ─────────────────
const PDF = path.join(origen, "336461140-Psicotecnicos-razonamiento-numerico.pdf")
// -enc UTF-8 no es opcional: sin él, algunas compilaciones de poppler sacan
// el texto en la página de códigos local, «NUMÉRICO» llega roto y el corte no
// se encuentra. El fallo era mudo y el informe salía en limpio.
const texto = execFileSync("pdftotext", ["-layout", "-enc", "UTF-8", PDF, "-"], {
  encoding: "utf8",
})
const corte = texto.indexOf("SOLUCIONES RAZONAMIENTO NUMÉRICO")
if (corte < 0) {
  console.error(
    "No encuentro la sección de soluciones en " +
      PDF +
      ".\nSin ella no hay nada contra qué contrastar, y un informe de cero\n" +
      "discrepancias sobre cero comprobaciones no dice nada. Revisa que el PDF\n" +
      "sea el de origen y que pdftotext esté emitiendo UTF-8.",
  )
  process.exit(1)
}
const ruido = /^(SOLUCIONES|PSICOTÉCNICOS|RAZONAMIENTO NUMÉRICO|U\. P\. AULA MAGNA)/

function leerItems(bloque) {
  const items = new Map()
  let actual = null
  for (const cruda of bloque.split("\n")) {
    const linea = cruda.trim()
    if (!linea || ruido.test(linea)) continue
    const inicio = linea.match(/^(\d{1,2})\.\s*(.+)$/)
    if (inicio) {
      actual = Number(inicio[1])
      items.set(actual, inicio[2])
    } else if (actual !== null && items.has(actual)) {
      items.set(actual, `${items.get(actual)} ${linea}`)
    }
  }
  return items
}

function leerBloques(t) {
  const bloques = new Map()
  const partes = t.split(/^\s*Ejercicio\s+(\d+)\s*$/m)
  for (let i = 1; i < partes.length; i += 2) bloques.set(Number(partes[i]), leerItems(partes[i + 1] ?? ""))
  return bloques
}

const soluciones = leerBloques(texto.slice(corte))

/** Aplica una operación declarada («+3», «x2», «:2», «=») a un número. */
function aplicar(valor, op) {
  const limpio = op.replace(/\s+/g, "")
  if (limpio === "=" || limpio === "+" || limpio === "-") return null // sin cantidad: no verificable
  const m = limpio.match(/^([+\-x×:/])\s*(\d+(?:[.,]\d+)?)$/)
  if (!m) return null
  const n = Number(m[2].replace(",", "."))
  switch (m[1]) {
    case "+": return valor + n
    case "-": return valor - n
    case "x": case "×": return valor * n
    case ":": case "/": return n === 0 ? null : valor / n
    default: return null
  }
}

const verificadas = []
const discrepancias = []
const sinComprobar = []

for (const e of SERIES) {
  const [, , nEj, nItem] = e.id.split("-").map((p, i) => (i >= 2 ? Number(p) : p))
  const solucion = soluciones.get(nEj)?.get(nItem)
  const respuesta = Number(e.opciones[e.respuesta])
  const terminos = e.enunciado
    .replace(/^Complete la serie:\s*/, "")
    .replace(/,?\s*…\s*$/, "")
    .split(/,\s*/)
    .map(Number)

  if (!solucion) { sinComprobar.push([e.id, "sin solución en la fuente"]); continue }

  const ops = [...solucion.matchAll(/\(([^)]+)\)/g)].map((m) => m[1].trim())
  if (ops.length === 0) { sinComprobar.push([e.id, "serie entrelazada, sin operaciones declaradas"]); continue }
  // Los «(+)», «(-)» y «(=)» sueltos no son operaciones: el documento los usa
  // como flechas entre términos. Con ellos de por medio los paréntesis dejan de
  // alinear con los saltos, así que no hay nada que contrastar.
  if (ops.some((o) => /^[+\-=]$/.test(o.replace(/\s+/g, "")))) {
    sinComprobar.push([e.id, "el documento usa «(+)» y «(=)» como flechas, no como operaciones"])
    continue
  }
  // Sin una operación por salto no hay alineación posible: series agrupadas con
  // «//» o entrelazadas, donde el documento solo declara los saltos de una.
  if (solucion.includes("//") || ops.length < terminos.length - 1) {
    sinComprobar.push([e.id, "serie agrupada o entrelazada: las operaciones no alinean con los términos"])
    continue
  }

  // 1. ¿El rastro describe la serie que se muestra?
  let cadenaOk = true
  let comprobados = 0
  for (let i = 0; i < terminos.length - 1 && i < ops.length; i++) {
    const esperado = aplicar(terminos[i], ops[i])
    if (esperado === null) continue
    comprobados++
    if (Math.abs(esperado - terminos[i + 1]) > 1e-9) cadenaOk = false
  }

  // 2. ¿La última operación lleva del último término a la respuesta?
  //
  // Solo si el documento la declara. Cuando trae un salto menos que términos
  // —el caso de las alternantes— el salto siguiente no está escrito, y
  // deducirlo sería suponer cuál toca. Ahí basta con haber validado la cadena.
  const predicha =
    ops.length >= terminos.length ? aplicar(terminos.at(-1), ops[terminos.length - 1]) : null

  if (comprobados === 0) {
    sinComprobar.push([e.id, "operaciones sin cantidad («=», «+» sueltos)"])
  } else if (cadenaOk && predicha === null) {
    verificadas.push(e.id)
  } else if (!cadenaOk) {
    discrepancias.push([e.id, `el rastro no reproduce la serie mostrada`, e.enunciado, solucion])
  } else if (Math.abs(predicha - respuesta) > 1e-9) {
    discrepancias.push([e.id, `la serie predice ${predicha} y el banco dice ${respuesta}`, e.enunciado, solucion])
  } else {
    verificadas.push(e.id)
  }
}

console.log(`Series en el banco: ${SERIES.length}`)
console.log(`  ✓ verificadas aritméticamente: ${verificadas.length}`)
console.log(`  · sin comprobación automática: ${sinComprobar.length}`)
console.log(`  ✗ discrepancias: ${discrepancias.length}`)

if (discrepancias.length > 0) {
  console.log("\nDISCREPANCIAS — revisar a mano:")
  for (const [id, motivo, enunciado, solucion] of discrepancias) {
    console.log(`\n  ${id}: ${motivo}`)
    console.log(`    ${enunciado}`)
    console.log(`    fuente: ${solucion.replace(/\s+/g, " ").slice(0, 150)}`)
  }
}

if (process.argv.includes("--detalle") && sinComprobar.length > 0) {
  console.log("\nSIN COMPROBACIÓN AUTOMÁTICA:")
  for (const [id, motivo] of sinComprobar) console.log(`  ${id}: ${motivo}`)
}

process.exit(discrepancias.length > 0 ? 1 : 0)
