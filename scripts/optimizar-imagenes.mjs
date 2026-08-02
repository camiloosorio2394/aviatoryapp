/**
 * Convierte imágenes a WebP para la app.
 *
 * Uso:
 *   node scripts/optimizar-imagenes.mjs <carpeta-origen> <carpeta-destino> [ancho]
 *
 * Ejemplo, las portadas de la Biblioteca:
 *   node scripts/optimizar-imagenes.mjs C:/Datos/Downloads public/biblioteca/portadas 900
 *
 * Por qué existe: las imágenes que llegan de diseño pesan megas y en una PWA
 * eso lo paga cada piloto que instala la app. WebP baja entre un 70 y un 90 por
 * ciento sin diferencia visible. Antes esto se hacía a mano cada vez.
 *
 * Las fotografías van con pérdida (calidad 82); los gráficos planos con alfa,
 * sin pérdida, que comprimen mejor así.
 */

import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const [origen, destino, anchoArg] = process.argv.slice(2)

if (!origen || !destino) {
  console.error("Uso: node scripts/optimizar-imagenes.mjs <origen> <destino> [ancho]")
  process.exit(1)
}

const ancho = anchoArg ? Number(anchoArg) : 1400
fs.mkdirSync(destino, { recursive: true })

const entradas = fs
  .readdirSync(origen)
  .filter((f) => /\.(png|jpe?g)$/i.test(f))

if (!entradas.length) {
  console.error(`No hay imágenes en ${origen}`)
  process.exit(1)
}

let antes = 0
let despues = 0
const filas = []

for (const nombre of entradas) {
  const rutaOrigen = path.join(origen, nombre)
  const meta = await sharp(rutaOrigen).metadata()
  const bytesAntes = fs.statSync(rutaOrigen).size
  antes += bytesAntes

  // Un grafico plano con transparencia comprime mejor sin perdida. Una
  // fotografia, al reves: sin perdida pesaria mas que el PNG original.
  const esGrafico = meta.hasAlpha && meta.width <= 800

  let img = sharp(rutaOrigen).resize({ width: ancho, withoutEnlargement: true })
  img = esGrafico ? img.webp({ lossless: true, effort: 6 }) : img.webp({ quality: 82 })

  const salida = path.join(destino, nombre.replace(/\.(png|jpe?g)$/i, ".webp"))
  await img.toFile(salida)

  const bytesDespues = fs.statSync(salida).size
  despues += bytesDespues
  filas.push([nombre, `${meta.width}x${meta.height}`, Math.round(bytesAntes / 1024), Math.round(bytesDespues / 1024)])
}

console.log("archivo".padEnd(30) + "dimensiones".padEnd(13) + "antes".padStart(8) + "después".padStart(9))
filas.forEach(([n, d, a, b]) =>
  console.log(n.padEnd(30) + d.padEnd(13) + `${a}K`.padStart(8) + `${b}K`.padStart(9))
)
console.log("")
console.log(
  `TOTAL: ${(antes / 1048576).toFixed(2)} MB a ${(despues / 1024).toFixed(0)} KB` +
  `   ahorro ${Math.round((1 - despues / antes) * 100)}%`
)
console.log(`\nEscritas en ${destino}`)
