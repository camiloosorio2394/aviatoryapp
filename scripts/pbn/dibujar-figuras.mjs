/**
 * Escribe las figuras de PBN en public/modulos/pbn/.
 *
 *   node scripts/pbn/dibujar-figuras.mjs              escribe los SVG
 *   node scripts/pbn/dibujar-figuras.mjs --png <dir>  además, una PNG de cada
 *                                                     una para revisarlas
 *
 * Después hay que volver a correr scripts/pbn/convertir.mjs, que es el que
 * cambia cada hueco por su figura en la lección.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { FIGURAS } from "./figuras/index.mjs"

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const DESTINO = path.join(RAIZ, "public/modulos/pbn")
fs.mkdirSync(DESTINO, { recursive: true })

const iPng = process.argv.indexOf("--png")
const dirPng = iPng > 0 ? path.resolve(process.argv[iPng + 1]) : null
const sharp = dirPng ? (await import("sharp")).default : null
if (dirPng) fs.mkdirSync(dirPng, { recursive: true })

const soloEstas = process.argv.slice(2).filter((a) => /^PB-\d\d$/.test(a))

for (const f of FIGURAS) {
  if (soloEstas.length && !soloEstas.includes(f.codigo)) continue
  const svg = f.svg()
  if (/—/.test(svg)) throw new Error(`${f.codigo}: raya larga en el texto de la figura`)
  const archivo = path.join(DESTINO, `${f.codigo}.svg`)
  fs.writeFileSync(archivo, svg, "utf8")
  if (sharp) await sharp(Buffer.from(svg)).png().toFile(path.join(dirPng, `${f.codigo}.png`))
  console.log(`${f.codigo}  ${(Buffer.byteLength(svg) / 1024).toFixed(1)} KB`)
}
