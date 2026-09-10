/**
 * Quita el damero y ajusta el encuadre de las láminas espaciales.
 *
 * Las del cuadernillo E2 salieron de diapositivas con el fondo en transparente,
 * y al exportarlas ese fondo se convirtió en la **cuadrícula gris que dibujan
 * los editores para representar «aquí no hay nada»**. No es transparencia: son
 * píxeles grises pintados, alternando 240 y 255. En la aplicación eso se ve
 * como una imagen rota.
 *
 * Encima, el dibujo ocupa una quinta parte del lienzo y el resto es damero, así
 * que la figura sale diminuta en una esquina de un rectángulo enorme.
 *
 * Aquí se hacen tres cosas, en este orden:
 *
 *  1. **Se apaga el damero.** Todo píxel gris claro —las tres componentes por
 *     encima de 232— pasa a blanco. El umbral no es arbitrario: el damero vive
 *     en 240 y 255, y el dibujo no pasa de 224 en ninguna de estas láminas, así
 *     que separa sin tocar el sombreado de las mesas ni de los cubos.
 *  2. **Se recorta a lo que hay**, con un margen proporcional. Una figura
 *     centrada y grande se lee; la misma figura en la esquina de un lienzo
 *     vacío, no.
 *  3. **Se avisa si el dibujo llega al borde.** Eso quiere decir que el recorte
 *     original ya lo mordió, y entonces esta lámina no tiene arreglo desde
 *     aquí: hay que volver al PDF. Es el caso del dado de `ES-E2-10`, al que le
 *     faltaba la cara de arriba en un ejercicio que pide contar puntos.
 *
 * Los originales no se tocan: la lámina limpia se escribe al lado con el
 * sufijo `-limpio`.
 *
 * Necesita `sharp` (`npm install --no-save sharp`).
 *
 *   node scripts/psicotecnicas/limpiar-espacial.mjs
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const CARPETA = path.join(RAIZ, "public/psicotecnicas/espacial")

const rojo = (s) => `\x1b[31m${s}\x1b[0m`
const verde = (s) => `\x1b[32m${s}\x1b[0m`
const ambar = (s) => `\x1b[33m${s}\x1b[0m`
const tenue = (s) => `\x1b[2m${s}\x1b[0m`

/** Por encima de esto es fondo; por debajo, dibujo. */
const CLARO = 232
/** Cuántos píxeles de dibujo tiene que haber en una fila para contarla. */
const MINIMO = 3

const laminas = fs
  .readdirSync(CARPETA)
  .filter((f) => f.endsWith(".webp") && !f.includes("-limpio"))
  .sort()

const limpias = []
const intactas = []
const mordidas = []

for (const lamina of laminas) {
  const origen = path.join(CARPETA, lamina)
  const { data, info } = await sharp(origen).raw().toColourspace("srgb").toBuffer({ resolveWithObject: true })
  const { width: ancho, height: alto, channels: canales } = info

  const esFondo = (i) => data[i] >= CLARO && data[i + 1] >= CLARO && data[i + 2] >= CLARO

  // ¿Tiene damero? El gris exacto 240 en una porción grande de la lámina no
  // aparece por casualidad: es la cuadrícula del editor.
  let grisExacto = 0
  for (let y = 0; y < alto; y += 3) {
    for (let x = 0; x < ancho; x += 3) {
      const i = (y * ancho + x) * canales
      if (data[i] === 240 && data[i + 1] === 240 && data[i + 2] === 240) grisExacto++
    }
  }
  const conDamero = grisExacto / ((alto / 3) * (ancho / 3)) > 0.05

  // La caja del dibujo, contando solo filas y columnas con tinta de verdad.
  const filas = []
  const columnas = new Array(ancho).fill(0)
  for (let y = 0; y < alto; y++) {
    let n = 0
    for (let x = 0; x < ancho; x++) {
      const i = (y * ancho + x) * canales
      if (!esFondo(i)) {
        n++
        columnas[x]++
      }
    }
    if (n >= MINIMO) filas.push(y)
  }
  const cols = columnas.map((n, x) => (n >= MINIMO ? x : -1)).filter((x) => x >= 0)

  if (filas.length === 0 || cols.length === 0) {
    intactas.push({ id: lamina, motivo: "no se encontró dibujo" })
    continue
  }

  const arriba = filas[0]
  const abajo = filas[filas.length - 1]
  const izq = cols[0]
  const der = cols[cols.length - 1]

  if (!conDamero) {
    intactas.push({ id: lamina, motivo: "sin damero; se deja como está" })
    continue
  }

  // Si el dibujo llega al borde del lienzo, el recorte de origen ya lo mordió.
  const pegado = arriba <= 2 || izq <= 2 || abajo >= alto - 3 || der >= ancho - 3
  if (pegado) mordidas.push(lamina)

  // El damero, apagado.
  const limpio = Buffer.from(data)
  for (let p = 0; p < ancho * alto; p++) {
    const i = p * canales
    if (esFondo(i)) {
      limpio[i] = 255
      limpio[i + 1] = 255
      limpio[i + 2] = 255
    }
  }

  const margen = Math.round(Math.max(der - izq, abajo - arriba) * 0.05)
  const x0 = Math.max(0, izq - margen)
  const y0 = Math.max(0, arriba - margen)
  const x1 = Math.min(ancho - 1, der + margen)
  const y1 = Math.min(alto - 1, abajo + margen)

  await sharp(limpio, { raw: { width: ancho, height: alto, channels: canales } })
    .extract({ left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 })
    .flatten({ background: "#ffffff" })
    .webp({ quality: 92, effort: 6 })
    .toFile(path.join(CARPETA, lamina.replace(".webp", "-limpio.webp")))

  limpias.push(lamina.replace(".webp", ""))
  console.log(
    `${verde("✓")} ${lamina.replace(".webp", "").padEnd(22)} ${tenue(
      `${ancho}×${alto} → ${x1 - x0 + 1}×${y1 - y0 + 1}`
    )}${pegado ? ` ${ambar("· el dibujo llega al borde")}` : ""}`
  )
}

fs.writeFileSync(
  path.join(RAIZ, "src/data/psicotecnicas/laminasEspacialLimpias.ts"),
  `/**
 * Las láminas espaciales a las que se les quitó el damero del fondo.
 *
 * La escribe \`scripts/psicotecnicas/limpiar-espacial.mjs\`: no se edita a mano.
 * El original se conserva al lado; lo que ve el piloto es la limpia.
 */

export const ESPACIAL_LIMPIAS = new Set([
${limpias.map((id) => `  "${id}",`).join("\n")}
])
`,
  "utf-8"
)

console.log()
console.log(`Láminas espaciales: ${laminas.length}. Con damero y limpiadas: ${limpias.length}.`)
if (intactas.length > 0) {
  console.log(tenue(`  ${intactas.length} sin damero, no hacía falta tocarlas.`))
}

if (mordidas.length > 0) {
  console.log()
  console.log(ambar(`${mordidas.length} con el dibujo pegado al borde:`))
  for (const m of mordidas) console.log(`  ${ambar("·")} ${m}`)
  console.log(
    tenue(
      "  El recorte de origen ya las mordió. Recortarlas mejor aquí no devuelve\n" +
        "  lo que falta: hay que volver al PDF del cuadernillo."
    )
  )
}

if (limpias.length === 0) {
  console.log()
  console.log(rojo("No se limpió ninguna lámina."))
  process.exit(1)
}
