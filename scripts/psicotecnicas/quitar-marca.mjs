/**
 * Quita la franja del logotipo de Facebook de los recortes del cuadernillo A1.
 *
 * El encargo de dibujar las figuras sigue en pie y es la solución de verdad,
 * pero mientras tanto hay veinte ejercicios en producción con el logotipo de
 * Facebook y el usuario `/eshingre` impresos en mitad de la pregunta. Y esa
 * marca concreta **no está dentro de la figura**: cae en el hueco entre la
 * matriz y la fila de alternativas. Se puede recortar sin tocar un solo trazo
 * del ejercicio, y eso es una marca ajena menos en un producto de pago desde
 * hoy.
 *
 * Cómo la encuentra: el logotipo es lo único azul de una lámina que por lo
 * demás es negra sobre blanco. Se localizan las filas de píxeles con azul de
 * verdad, se comprueba que entre esa franja y el dibujo hay papel por arriba y
 * por abajo, y se cosen las dos mitades. Si el azul no aparece, o la franja
 * roza el dibujo, el ejercicio se deja como está: **preferimos un recorte con
 * marca a un recorte con el ejercicio mordido**.
 *
 * Los originales NO se tocan. Las láminas limpias se escriben al lado, con el
 * sufijo `-limpio`, porque el recorte original es la única prueba de qué decía
 * la fuente y contra ella se revisan las figuras dibujadas.
 *
 * Necesita `sharp` (`npm install --no-save sharp`), igual que
 * `generar-visuales.mjs`.
 *
 *   node scripts/psicotecnicas/quitar-marca.mjs
 *   node scripts/psicotecnicas/quitar-marca.mjs --forzar   (rehace las que ya están)
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const CARPETA = path.join(RAIZ, "public/psicotecnicas/abstracto")
const FORZAR = process.argv.includes("--forzar")

const rojo = (s) => `\x1b[31m${s}\x1b[0m`
const verde = (s) => `\x1b[32m${s}\x1b[0m`
const ambar = (s) => `\x1b[33m${s}\x1b[0m`
const tenue = (s) => `\x1b[2m${s}\x1b[0m`

/**
 * Las filas que llevan azul, y las que llevan tinta.
 *
 * «Azul de verdad» quiere decir un píxel donde el canal azul le saca cuarenta
 * a los otros dos: el gris del papel escaneado y el negro del trazo nunca lo
 * cumplen, y el logotipo sí.
 */
async function analizar(archivo) {
  const { data, info } = await sharp(archivo)
    .raw()
    .toColourspace("srgb")
    .toBuffer({ resolveWithObject: true })
  const { width: ancho, height: alto, channels } = info

  const azules = []
  const conTinta = []
  for (let fila = 0; fila < alto; fila++) {
    let azul = 0
    let tinta = 0
    for (let col = 0; col < ancho; col++) {
      const i = (fila * ancho + col) * channels
      const [r, g, b] = [data[i], data[i + 1], data[i + 2]]
      if (b > 90 && b - r > 40 && b - g > 40) azul++
      // Tinta: cualquier píxel claramente más oscuro que el papel.
      if (r < 140 && g < 140 && b < 140) tinta++
    }
    if (azul >= 3) azules.push(fila)
    if (tinta >= 3) conTinta.push(fila)
  }
  return { azules, conTinta, ancho, alto }
}

const laminas = fs
  .readdirSync(CARPETA)
  .filter((f) => /^AB-A1-\d+\.webp$/.test(f))
  .sort()

let limpias = 0
const saltadas = []

for (const lamina of laminas) {
  const id = lamina.replace(".webp", "")
  const origen = path.join(CARPETA, lamina)
  const destino = path.join(CARPETA, `${id}-limpio.webp`)

  if (fs.existsSync(destino) && !FORZAR) {
    limpias++
    continue
  }

  const { azules, conTinta, ancho, alto } = await analizar(origen)

  if (azules.length === 0) {
    saltadas.push({ id, motivo: "no se encontró nada azul: puede que ya esté limpia" })
    continue
  }

  // La franja a quitar: desde la primera fila azul hasta la última, con un
  // pelo de margen para llevarse también el texto negro que va al lado.
  const margen = Math.round(alto * 0.012)
  const desde = Math.max(0, Math.min(...azules) - margen)
  const hasta = Math.min(alto - 1, Math.max(...azules) + margen)

  // La comprobación que impide morder el ejercicio: entre la franja y el
  // dibujo tiene que haber papel en blanco por arriba y por abajo.
  const azulesSet = new Set(azules)
  const tintaAjena = conTinta.filter((f) => f >= desde && f <= hasta && !azulesSet.has(f))
  const holgura = Math.round(alto * 0.004)
  const rozaArriba = tintaAjena.some((f) => f <= desde + holgura)
  const rozaAbajo = tintaAjena.some((f) => f >= hasta - holgura)

  if (rozaArriba || rozaAbajo) {
    saltadas.push({ id, motivo: "la franja roza el dibujo; se deja el recorte como está" })
    continue
  }

  // Las dos mitades, cosidas sin la franja de en medio.
  const altoArriba = desde
  const altoAbajo = alto - hasta - 1
  const [mitadArriba, mitadAbajo] = await Promise.all([
    sharp(origen).extract({ left: 0, top: 0, width: ancho, height: altoArriba }).png().toBuffer(),
    sharp(origen)
      .extract({ left: 0, top: hasta + 1, width: ancho, height: altoAbajo })
      .png()
      .toBuffer(),
  ])

  await sharp({
    create: { width: ancho, height: altoArriba + altoAbajo, channels: 3, background: "#ffffff" },
  })
    .composite([
      { input: mitadArriba, left: 0, top: 0 },
      { input: mitadAbajo, left: 0, top: altoArriba },
    ])
    .webp({ quality: 92, effort: 6 })
    .toFile(destino)

  limpias++
  console.log(
    `${verde("✓")} ${id} ${tenue(`franja de ${hasta - desde + 1} px quitada (filas ${desde}–${hasta})`)}`
  )
}

// ────────────────────────────────────────────────────────────────────────────
// La lista, para que el banco sepa a cuál apuntar
//
// El banco corre en el navegador y no puede mirar el disco, así que la lista
// se escribe aquí como módulo. Se regenera cada vez: si mañana se limpia una
// lámina más, entra sola.

const conLimpia = laminas
  .map((l) => l.replace(".webp", ""))
  .filter((id) => fs.existsSync(path.join(CARPETA, `${id}-limpio.webp`)))

fs.writeFileSync(
  path.join(RAIZ, "src/data/psicotecnicas/laminasLimpias.ts"),
  `/**
 * Las láminas del A1 que ya tienen versión sin el logotipo de Facebook.
 *
 * La escribe \`scripts/psicotecnicas/quitar-marca.mjs\`: no se edita a mano.
 * El original se conserva al lado como prueba de qué decía la fuente; lo que
 * se enseña es la limpia.
 */

export const LAMINAS_LIMPIAS = new Set([
${conLimpia.map((id) => `  "${id}",`).join("\n")}
])
`,
  "utf-8"
)

console.log()
console.log(`Láminas del A1: ${laminas.length}. Con versión limpia: ${limpias}.`)
console.log(tenue("Lista escrita en src/data/psicotecnicas/laminasLimpias.ts"))

if (saltadas.length > 0) {
  console.log()
  console.log(ambar(`${saltadas.length} sin limpiar:`))
  for (const s of saltadas) console.log(`  ${ambar("·")} ${s.id}: ${s.motivo}`)
}

// Cero comprobaciones no es un aprobado, aquí tampoco.
if (limpias === 0) {
  console.log()
  console.log(rojo("No se limpió ninguna lámina."))
  process.exit(1)
}
