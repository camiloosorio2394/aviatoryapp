/**
 * Genera el banco de series numéricas desde el PDF de origen.
 *
 * Uso:
 *   node scripts/psicotecnicas/generar-series.mjs <carpeta-con-los-pdf>
 *
 * Escribe `src/data/psicotecnicas/series.ts`, que sí va al repositorio: la app
 * no debe depender de tener el PDF a mano para compilar.
 *
 * El documento («Psicotécnicos — Razonamiento numérico», 336461140) trae los
 * enunciados en una primera mitad y las soluciones en la segunda, numerados
 * igual, así que se emparejan por número de ejercicio y de ítem. De la solución
 * sale además el rastro de operaciones —«33 (+2) 35 (+2) 37…»— con el que se
 * arma la explicación, de modo que ni la respuesta ni el porqué salen de aquí.
 *
 * Lo único que no está en la fuente son las alternativas: el original es de
 * completar el número, sin opciones. Como el módulo entero funciona con opción
 * múltiple cronometrada, se generan tres distractores por ítem a partir de los
 * errores típicos de cada serie (aplicar el paso anterior, pasarse un paso,
 * invertir el signo). No se «cambian» alternativas del original porque el
 * original no tiene ninguna.
 *
 * Necesita `pdftotext` (poppler).
 */

import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const raiz = path.resolve(__dirname, "../..")
const salida = path.resolve(raiz, "src/data/psicotecnicas/series.ts")

const origen = process.argv[2]
if (!origen) {
  console.error("Uso: node scripts/psicotecnicas/generar-series.mjs <carpeta-con-los-pdf>")
  process.exit(1)
}

const PDF = path.join(origen, "336461140-Psicotecnicos-razonamiento-numerico.pdf")
const texto = execFileSync("pdftotext", ["-layout", PDF, "-"], { encoding: "utf8" })

// La palabra SOLUCIONES aparece suelta como pie de página, así que el corte se
// hace por el título de la sección, que va una sola vez.
const corte = texto.indexOf("SOLUCIONES RAZONAMIENTO NUMÉRICO")
if (corte < 0) throw new Error("No se encontró la sección de soluciones")

const ruido = /^(SOLUCIONES|PSICOTÉCNICOS|RAZONAMIENTO NUMÉRICO|U\. P\. AULA MAGNA)/

/** Parte un bloque en ítems numerados, uniendo los renglones que continúan. */
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

/** Separa un texto en bloques «Ejercicio N». */
function leerBloques(texto) {
  const bloques = new Map()
  const partes = texto.split(/^\s*Ejercicio\s+(\d+)\s*$/m)
  for (let i = 1; i < partes.length; i += 2) {
    bloques.set(Number(partes[i]), leerItems(partes[i + 1] ?? ""))
  }
  return bloques
}

const enunciados = leerBloques(texto.slice(0, corte))
const soluciones = leerBloques(texto.slice(corte))

/**
 * De «33 (+2) 35 (+2) … ? 51.» saca 51.
 *
 * No se puede anclar al final: bastantes soluciones llevan detrás una línea
 * suelta con los saltos de segundo nivel («+2 +2 +2»), que al unir renglones
 * queda pegada después de la respuesta. Se toma la última marca «? número».
 */
function respuestaDe(solucion) {
  const marcas = [...solucion.matchAll(/\?\s*(-?\d+(?:[.,]\d+)?)/g)]
  if (marcas.length === 0) return null
  return Number(marcas.at(-1)[1].replace(",", "."))
}

/** El desglose, sin la coletilla de la respuesta ni los saltos de segundo nivel. */
function rastroDe(solucion) {
  const marcas = [...solucion.matchAll(/\?\s*(-?\d+(?:[.,]\d+)?)/g)]
  const hasta = marcas.length > 0 ? marcas.at(-1).index : solucion.length
  return solucion
    .slice(0, hasta)
    // El ejercicio 1 viene en prosa y repite la respuesta antes del desglose.
    .replace(/^La respuesta correcta es[^.]*\.\s*/i, "")
    .replace(/^Observamos que/i, "Se observa que")
    // En esa misma prosa el «?» hace de flecha entre términos.
    .replace(/\s*\?\s*/g, " ")
    .replace(/\s+/g, " ")
    .replace(/[\s.,;]+$/, "")
    .trim()
}

/** Los pasos declarados entre paréntesis, en orden. */
function pasosDe(solucion) {
  return [...solucion.matchAll(/\(([^)]+)\)/g)].map((m) => m[1].trim())
}

/** Los números de la serie, tal como los muestra el enunciado. */
function terminosDe(enunciado) {
  return enunciado
    .replace(/\.\.\.|…/g, "")
    .split(/[,\s]+/)
    .map((t) => t.trim())
    .filter((t) => /^-?\d+$/.test(t))
    .map(Number)
}

/**
 * Clasifica la serie por el rastro de operaciones de la propia solución.
 * Sin rastro es porque hay dos series entrelazadas, que es lo más difícil.
 */
function clasificar(pasos) {
  // Sin paréntesis no hay un salto único que seguir: son dos series metidas
  // una dentro de otra, y eso es lo más duro de ver a contrarreloj.
  if (pasos.length === 0) return { sub: "Sucesiones alternantes", nivel: "avanzado" }

  const unicos = new Set(pasos)
  const multiplicativa = pasos.some((p) => /x|×|:|\//.test(p))

  // ¿Los saltos crecen de forma regular (+1, +2, +3…)? Es un patrón clásico:
  // cuesta más que un salto fijo, pero no es de los que se atragantan.
  const numeros = pasos.map((p) => Number(p.replace(/[^\d-]/g, "")))
  const regular =
    numeros.length > 2 &&
    numeros.every(Number.isFinite) &&
    new Set(numeros.slice(1).map((n, i) => n - numeros[i])).size === 1

  if (multiplicativa) {
    return {
      sub: "Sucesiones multiplicativas",
      nivel: unicos.size <= 2 ? "intermedio" : "avanzado",
    }
  }
  if (unicos.size === 1) return { sub: "Sucesiones aritméticas", nivel: "basico" }
  if (unicos.size === 2) return { sub: "Sucesiones alternantes", nivel: "intermedio" }
  return {
    sub: "Sucesiones de progresión variable",
    nivel: regular ? "intermedio" : "avanzado",
  }
}

/**
 * Tres distractores para un ítem.
 *
 * Se construyen con los errores que de verdad comete quien va rápido: repetir
 * el penúltimo salto, adelantarse un término, o equivocar el signo. Si alguno
 * coincide con la respuesta o se repite, se rellena con vecinos.
 */
function distractores(terminos, respuesta) {
  const ultimo = terminos.at(-1) ?? respuesta
  const salto = respuesta - ultimo
  const previo = terminos.length >= 2 ? ultimo - terminos.at(-2) : salto
  const candidatos = [
    ultimo + previo,
    respuesta + salto,
    ultimo - salto,
    respuesta + 1,
    respuesta - 1,
    respuesta + 2,
    ultimo,
  ]
  const vistos = new Set([respuesta])
  const elegidos = []
  for (const c of candidatos) {
    if (!Number.isFinite(c) || vistos.has(c)) continue
    vistos.add(c)
    elegidos.push(c)
    if (elegidos.length === 3) break
  }
  return elegidos
}

/** Baraja estable: el mismo ítem siempre coloca su respuesta en el mismo sitio. */
function mezclar(opciones, semilla) {
  const copia = [...opciones]
  let s = semilla
  for (let i = copia.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) % 2147483648
    const j = s % (i + 1)
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

const ejercicios = []
let descartados = 0

for (const [nEj, items] of [...enunciados].sort((a, b) => a[0] - b[0])) {
  const sols = soluciones.get(nEj)
  if (!sols) continue
  for (const [nItem, enunciado] of [...items].sort((a, b) => a[0] - b[0])) {
    const solucion = sols.get(nItem)
    if (!solucion) { descartados++; continue }
    const respuesta = respuestaDe(solucion)
    const terminos = terminosDe(enunciado)
    if (respuesta === null || terminos.length < 4) { descartados++; continue }

    const pasos = pasosDe(solucion)
    const { sub, nivel } = clasificar(pasos)
    const opciones = mezclar([respuesta, ...distractores(terminos, respuesta)], nEj * 100 + nItem)
    if (opciones.length < 4) { descartados++; continue }

    const desglose = rastroDe(solucion)
    const rastro = desglose
      ? `El documento lo desglosa así: ${desglose}.`
      : "Conviene separar los términos de posición par de los de posición impar: son dos series entrelazadas."

    ejercicios.push({
      id: `NU-N2-${String(nEj).padStart(2, "0")}-${String(nItem).padStart(2, "0")}`,
      subcategoria: sub,
      nivel,
      enunciado: `Complete la serie: ${terminos.join(", ")}, …`,
      opciones: opciones.map(String),
      respuesta: opciones.indexOf(respuesta),
      explicacion: `El término que sigue es ${respuesta}. ${rastro}`,
      tiempo: nivel === "basico" ? 45 : nivel === "intermedio" ? 60 : 75,
      fuente: `Psicotécnicos — Razonamiento numérico (336461140), ejercicio ${nEj}.${nItem}`,
    })
  }
}

const cabecera = `import type { EjercicioPsico } from "@/lib/psicotecnicas"

/**
 * Series numéricas — ${ejercicios.length} ejercicios.
 *
 * ARCHIVO GENERADO. No se edita a mano: sale de
 * \`node scripts/psicotecnicas/generar-series.mjs <carpeta-con-los-pdf>\`.
 *
 * Fuente: «Psicotécnicos — Razonamiento numérico» (documento 336461140), que
 * trae los enunciados y su sección de soluciones. La respuesta y el desglose de
 * cada serie son los del documento; las cuatro alternativas se generan, porque
 * el original es de completar el número y no ofrece ninguna.
 */
export const SERIES: EjercicioPsico[] = `

const cuerpo = JSON.stringify(
  ejercicios.map((e) => ({ ...e, categoria: "numerico" })),
  null,
  2
)

fs.writeFileSync(salida, `${cabecera}${cuerpo}\n`, "utf8")
console.log(`Listo: ${ejercicios.length} series en ${path.relative(raiz, salida)} (${descartados} descartadas)`)
