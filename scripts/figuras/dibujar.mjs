/**
 * Escribe las figuras SVG de un módulo en public/modulos/<modulo>/.
 *
 *   node scripts/figuras/dibujar.mjs pbn                 escribe los SVG
 *   node scripts/figuras/dibujar.mjs pbn --png <dir>     además, una PNG de
 *                                                        cada una para revisarlas
 *   node scripts/figuras/dibujar.mjs pbn PB-03 PB-11     solo esas
 *
 * Después hay que volver a correr el conversor del módulo, que es el que
 * cambia cada hueco por su figura en la lección.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")

/** Dónde están las figuras de cada módulo y adónde van sus SVG. */
const MODULOS = {
  pbn: { figuras: "../pbn/figuras/index.mjs", destino: "public/modulos/pbn" },
  rvsm: { figuras: "../rvsm/figuras/index.mjs", destino: "public/modulos/rvsm" },
  performance: { figuras: "../performance/figuras/index.mjs", destino: "public/modulos/performance" },
  combustible: { figuras: "../combustible/figuras/index.mjs", destino: "public/modulos/combustible" },
}

const modulo = process.argv[2]
if (!MODULOS[modulo]) {
  console.error(`Uso: node scripts/figuras/dibujar.mjs <${Object.keys(MODULOS).join("|")}> [--png <dir>] [códigos]`)
  process.exit(1)
}
const { FIGURAS } = await import(MODULOS[modulo].figuras)
const destino = path.join(RAIZ, MODULOS[modulo].destino)
fs.mkdirSync(destino, { recursive: true })

const iPng = process.argv.indexOf("--png")
const dirPng = iPng > 0 ? path.resolve(process.argv[iPng + 1]) : null
const sharp = dirPng ? (await import("sharp")).default : null
if (dirPng) fs.mkdirSync(dirPng, { recursive: true })

const soloEstas = process.argv.slice(3).filter((a) => /^[A-Z]+-[A-Z]?\d\d$/.test(a))

for (const f of FIGURAS) {
  if (soloEstas.length && !soloEstas.includes(f.codigo)) continue
  const svg = f.svg()
  if (/—/.test(svg)) throw new Error(`${f.codigo}: raya larga en el texto de la figura`)
  fs.writeFileSync(path.join(destino, `${f.codigo}.svg`), svg, "utf8")
  if (sharp) await sharp(Buffer.from(svg)).png().toFile(path.join(dirPng, `${f.codigo}.png`))
  console.log(`${f.codigo}  ${(Buffer.byteLength(svg) / 1024).toFixed(1)} KB`)
}
