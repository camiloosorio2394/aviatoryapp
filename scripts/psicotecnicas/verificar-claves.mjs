/**
 * Contrasta las respuestas del banco contra la clave impresa en cada PDF.
 *
 * Es la comprobación más simple y la que más pesa: dos de los cuadernillos
 * traen su propia hoja de soluciones, así que no hay que deducir nada —basta
 * con leerla y comparar—. Lo que se comprueba aquí:
 *
 *   · Abstracto A1 (554759531) — su lámina SOLUCIONES, los 20.
 *   · Espacial E1 (670006116) — su clave del final, los 14.
 *
 * Lo que NO se comprueba aquí, y dónde sí:
 *
 *   · Espacial E2 (667045629) marca la respuesta resaltándola sobre la propia
 *     diapositiva, así que no hay texto que leer: sus 4 se revisaron mirando
 *     las páginas 10 a 13 del PDF.
 *   · Numérico N1 (256486461) no trae clave: lo recalcula
 *     `verificar-numerico.mjs` desde el enunciado.
 *   · Series N2 (336461140): `verificar-series.mjs` las resuelve de cero.
 *
 * Cero comprobaciones no es un aprobado: si un PDF falta o su clave no aparece
 * donde debería, el script sale con error en vez de dar por bueno lo que no
 * miró. Es exactamente el fallo que ya nos coló una vez un «0 verificadas, 0
 * discrepancias» en verde.
 *
 *   node scripts/psicotecnicas/verificar-claves.mjs ~/Downloads
 */

import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createServer } from "vite"

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const CARPETA = process.argv[2] ?? path.join(process.env.HOME ?? "", "Downloads")

const rojo = (s) => `\x1b[31m${s}\x1b[0m`
const verde = (s) => `\x1b[32m${s}\x1b[0m`
const tenue = (s) => `\x1b[2m${s}\x1b[0m`

/** El PDF cuyo nombre lleva ese identificador, mirando en la carpeta dada. */
function buscarPdf(id) {
  const encontrado = fs.readdirSync(CARPETA).find((f) => f.includes(id) && f.toLowerCase().endsWith(".pdf"))
  if (!encontrado) {
    console.error(rojo(`No se encontró el PDF ${id} en ${CARPETA}.`))
    console.error("Sin el cuadernillo no hay nada que contrastar, así que esto es un fallo.")
    process.exit(1)
  }
  return path.join(CARPETA, encontrado)
}

/** El texto del PDF, con la codificación fijada. */
function texto(pdf) {
  // `-enc UTF-8` va explícito: sin fijarlo, buscar «SOLUCIONES» acentuado deja
  // de encontrar la sección y el verificador termina sin comprobar nada.
  return execFileSync("pdftotext", ["-layout", "-enc", "UTF-8", pdf, "-"], {
    encoding: "utf-8",
    maxBuffer: 64 * 1024 * 1024,
  })
}

const servidor = await createServer({
  root: RAIZ,
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "silent",
})
let ABSTRACTO, ESPACIAL
try {
  ;({ ABSTRACTO } = await servidor.ssrLoadModule("/src/data/psicotecnicas/abstracto.ts"))
  ;({ ESPACIAL } = await servidor.ssrLoadModule("/src/data/psicotecnicas/espacial.ts"))
} finally {
  await servidor.close()
}

const fallos = []
let comprobadas = 0

// ────────────────────────────────────────────────────────────────────────────
// Abstracto A1: «01 C 02 D 03 E …» en la lámina SOLUCIONES.

{
  const bruto = texto(buscarPdf("554759531"))
  const seccion = bruto.slice(bruto.indexOf("SOLUCIONES"))
  if (!bruto.includes("SOLUCIONES")) {
    console.error(rojo("El cuadernillo A1 no tiene la lámina SOLUCIONES donde se esperaba."))
    process.exit(1)
  }
  const clave = new Map()
  for (const m of seccion.matchAll(/\b(\d{2})\s+([A-E])\b/g)) clave.set(Number(m[1]), m[2])
  if (clave.size < 20) {
    console.error(rojo(`Solo se leyeron ${clave.size} respuestas de la clave del A1, y son 20.`))
    process.exit(1)
  }

  for (const e of ABSTRACTO) {
    const n = Number(e.id.slice(-2))
    const delBanco = e.opciones[e.respuesta]
    const deLaFuente = clave.get(n)
    comprobadas++
    if (delBanco !== deLaFuente) {
      fallos.push(`${e.id}: el banco responde ${delBanco} y la clave del cuadernillo dice ${deLaFuente}`)
    }
  }
  console.log(`${verde("✓")} Abstracto A1: ${ABSTRACTO.length} contra la lámina SOLUCIONES`)
}

// ────────────────────────────────────────────────────────────────────────────
// Espacial E1: «1. (c)  2. (c) …» al final del cuadernillo.

{
  const bruto = texto(buscarPdf("670006116"))
  const i = bruto.indexOf("SOLUCIONES")
  if (i < 0) {
    console.error(rojo("El cuadernillo E1 no tiene su clave donde se esperaba."))
    process.exit(1)
  }
  const clave = new Map()
  for (const m of bruto.slice(i).matchAll(/(\d{1,2})\.\s*\(([a-d])\)/g)) clave.set(Number(m[1]), m[2].toUpperCase())
  if (clave.size < 14) {
    console.error(rojo(`Solo se leyeron ${clave.size} respuestas de la clave del E1, y son 14.`))
    process.exit(1)
  }

  const deE1 = ESPACIAL.filter((e) => e.id.startsWith("ES-E1-"))
  for (const e of deE1) {
    const n = Number(e.id.slice(-2))
    // Los dos últimos preguntan «cuántas veces», así que sus alternativas son
    // números: lo que se contrasta es la posición, que es lo que dice la clave.
    const letraDelBanco = "ABCDE"[e.respuesta]
    const deLaFuente = clave.get(n)
    comprobadas++
    if (letraDelBanco !== deLaFuente) {
      fallos.push(
        `${e.id}: el banco responde la ${letraDelBanco} (${e.opciones[e.respuesta]}) y la clave dice la ${deLaFuente}`
      )
    }
  }
  console.log(`${verde("✓")} Espacial E1: ${deE1.length} contra la clave del final`)
}

// ────────────────────────────────────────────────────────────────────────────

console.log()
if (comprobadas === 0) {
  console.log(rojo("No se contrastó ninguna respuesta. Eso no es un aprobado."))
  process.exit(1)
}

if (fallos.length > 0) {
  console.log(rojo(`${fallos.length} respuesta(s) no coinciden con la clave impresa:`))
  for (const f of fallos) console.log(`  ${rojo("✗")} ${f}`)
  console.log()
  console.log("No se corrige nada desde aquí: hay que mirar la lámina y decidir.")
  process.exit(1)
}

console.log(verde(`Las ${comprobadas} respuestas con clave impresa coinciden con su cuadernillo.`))
console.log(
  tenue(
    "Las 4 del E2 se revisaron mirando las páginas 10 a 13 de su PDF, que resalta la opción correcta."
  )
)
