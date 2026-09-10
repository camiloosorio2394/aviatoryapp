/**
 * Rehace las láminas del A1 recortándolas del PDF de origen.
 *
 * Los recortes que había venían de capturas de pantalla del cuadernillo, y
 * arrastraban dos defectos que no se arreglan retocando el pixel:
 *
 * — **La fila de letras estaba partida por la mitad.** De la C solo sobrevivía
 *   el arco de abajo de su recuadro, que en pantalla se lee como un tachón, y
 *   la D y la E quedaban mordidas. Las veinte compartían el mismo encuadre de
 *   1123 × 821, así que era el recorte y no el original.
 * — **El logotipo de Facebook y el usuario `/eshingre`** caían entre la matriz
 *   y las alternativas.
 *
 * Del PDF salen enteras y sin nada de eso. Lo que se conserva es solo el
 * ejercicio: la matriz, las cinco alternativas y sus letras. Fuera quedan las
 * bandas amarillas de la escuela, su logotipo, el correo, las flechas de
 * navegación y la línea del Facebook. Los cuadernillos son de dónde salieron
 * los ejercicios, no parte del producto.
 *
 * ### Dónde está cada lámina
 *
 * El PDF es un curso para proyectar: cada problema ocupa seis diapositivas, la
 * primera limpia y las cinco siguientes con una alternativa recuadrada —azul si
 * es la correcta, roja si no—. La que sirve es la limpia, y está en la página
 * **6·N − 1**. Comprobado contra cuatro problemas sueltos, no deducido de uno.
 *
 * ### Qué NO hace
 *
 * No toca las respuestas, ni el banco, ni los recortes viejos: escribe al lado
 * con el sufijo `-limpio` y deja los originales donde estaban, que son la
 * prueba de qué decía la fuente.
 *
 * Necesita `sharp` (`npm install --no-save sharp`) y `pdftoppm`.
 *
 *   node scripts/psicotecnicas/recortar-laminas.mjs ~/Downloads
 */

import { execFileSync } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const DESTINO = path.join(RAIZ, "public/psicotecnicas/abstracto")
const CARPETA = process.argv[2] ?? path.join(os.homedir(), "Downloads")
const RESOLUCION = 200

const rojo = (s) => `\x1b[31m${s}\x1b[0m`
const verde = (s) => `\x1b[32m${s}\x1b[0m`
const ambar = (s) => `\x1b[33m${s}\x1b[0m`
const tenue = (s) => `\x1b[2m${s}\x1b[0m`

const pdf = fs
  .readdirSync(CARPETA)
  .filter((f) => f.includes("554759531") && f.toLowerCase().endsWith(".pdf"))
  .map((f) => path.join(CARPETA, f))[0]

if (!pdf) {
  console.error(rojo(`No se encontró el cuadernillo 554759531 en ${CARPETA}.`))
  console.error("Sin el original no hay de dónde recortar, así que esto es un fallo.")
  process.exit(1)
}

const temporal = fs.mkdtempSync(path.join(os.tmpdir(), "laminas-"))

/** La página de la diapositiva limpia del problema N. */
const paginaDe = (n) => 6 * n - 1

/** Rinde una página del PDF a PNG y devuelve sus píxeles. */
async function pixeles(pagina) {
  const base = path.join(temporal, `p${pagina}`)
  execFileSync("pdftoppm", ["-r", String(RESOLUCION), "-png", "-f", String(pagina), "-l", String(pagina), pdf, base])
  const archivo = fs.readdirSync(temporal).find((f) => f.startsWith(`p${pagina}-`))
  const ruta = path.join(temporal, archivo)
  const { data, info } = await sharp(ruta).raw().toColourspace("srgb").toBuffer({ resolveWithObject: true })
  return { ruta, data, ancho: info.width, alto: info.height, canales: info.channels }
}

/**
 * Las bandas de la diapositiva, encontradas por color y no por proporciones.
 *
 * Medir por fracciones fijas funciona hasta que una diapositiva viene un pelo
 * corrida, y entonces muerde el dibujo sin avisar. El amarillo de la escuela y
 * el azul del Facebook son inconfundibles, así que se buscan esos.
 */
function bandas({ data, ancho, alto, canales }) {
  const amarilla = []
  const azul = []
  const conTinta = []

  for (let y = 0; y < alto; y++) {
    let am = 0
    let az = 0
    let tinta = 0
    for (let x = 0; x < ancho; x++) {
      const i = (y * ancho + x) * canales
      const [r, g, b] = [data[i], data[i + 1], data[i + 2]]
      if (r > 200 && g > 165 && b < 165) am++
      if (b > 90 && b - r > 40 && b - g > 40) az++
      if (r < 140 && g < 140 && b < 140) tinta++
    }
    if (am > ancho * 0.3) amarilla.push(y)
    if (az >= 3) azul.push(y)
    if (tinta >= 3) conTinta.push(y)
  }
  return { amarilla, azul, conTinta }
}

/** Las columnas con tinta dentro de un rango de filas, para ajustar los lados. */
function columnasConTinta({ data, ancho, canales }, desde, hasta) {
  const cols = []
  for (let x = 0; x < ancho; x++) {
    let tinta = 0
    for (let y = desde; y <= hasta; y++) {
      const i = (y * ancho + x) * canales
      if (data[i] < 140 && data[i + 1] < 140 && data[i + 2] < 140) tinta++
    }
    if (tinta >= 2) cols.push(x)
  }
  return cols
}

const hechas = []
const saltadas = []

for (let n = 1; n <= 20; n++) {
  const id = `AB-A1-${String(n).padStart(2, "0")}`
  const pagina = paginaDe(n)
  const img = await pixeles(pagina)
  const { amarilla, azul, conTinta } = bandas(img)

  if (amarilla.length === 0 || azul.length === 0) {
    saltadas.push({ id, motivo: `en la página ${pagina} no se reconocen las bandas de la plantilla` })
    continue
  }

  // El ejercicio vive entre la banda amarilla de arriba y la de abajo.
  const finCabecera = Math.max(...amarilla.filter((y) => y < img.alto / 2))
  const iniPie = Math.min(...amarilla.filter((y) => y > img.alto / 2))

  // La franja del Facebook parte el ejercicio en dos: matriz arriba,
  // alternativas abajo. Se quita, y las dos mitades se cosen.
  const azulDentro = azul.filter((y) => y > finCabecera && y < iniPie)
  if (azulDentro.length === 0) {
    saltadas.push({ id, motivo: `en la página ${pagina} no aparece la franja del Facebook donde se esperaba` })
    continue
  }
  const margen = Math.round(img.alto * 0.008)
  const cortaDesde = Math.min(...azulDentro) - margen
  const cortaHasta = Math.max(...azulDentro) + margen

  // La lámina empieza en el título, no en el número de página del cuadernillo.
  //
  // Los dos viven a la misma altura, así que la altura no los separa: lo que
  // los separa es de qué lado están. El número va pegado al margen derecho y el
  // título arranca por la izquierda, de modo que la primera fila con tinta en
  // la mitad izquierda ya es del ejercicio. Colar el número sería meter la
  // paginación del cuadernillo dentro del producto.
  const arribaDesde = (() => {
    for (let y = finCabecera + 1; y < cortaDesde; y++) {
      for (let x = 0; x < img.ancho / 2; x++) {
        const k = (y * img.ancho + x) * img.canales
        if (img.data[k] < 140 && img.data[k + 1] < 140 && img.data[k + 2] < 140) {
          return Math.max(finCabecera + 1, y - margen)
        }
      }
    }
    return finCabecera + 1
  })()

  const arribaHasta = cortaDesde
  const abajoDesde = cortaHasta
  const abajoHasta = Math.max(...conTinta.filter((y) => y > cortaHasta && y < iniPie)) + margen

  const cols = columnasConTinta(img, arribaDesde, abajoHasta)
  const izquierda = Math.max(0, Math.min(...cols) - margen)
  const derecha = Math.min(img.ancho - 1, Math.max(...cols) + margen)
  const anchoCorte = derecha - izquierda + 1

  const altoArriba = arribaHasta - arribaDesde
  const altoAbajo = abajoHasta - abajoDesde

  const [mitadArriba, mitadAbajo] = await Promise.all([
    sharp(img.ruta).extract({ left: izquierda, top: arribaDesde, width: anchoCorte, height: altoArriba }).png().toBuffer(),
    sharp(img.ruta).extract({ left: izquierda, top: abajoDesde, width: anchoCorte, height: altoAbajo }).png().toBuffer(),
  ])

  await sharp({
    create: { width: anchoCorte, height: altoArriba + altoAbajo, channels: 3, background: "#ffffff" },
  })
    .composite([
      { input: mitadArriba, left: 0, top: 0 },
      { input: mitadAbajo, left: 0, top: altoArriba },
    ])
    .webp({ quality: 92, effort: 6 })
    .toFile(path.join(DESTINO, `${id}-limpio.webp`))

  hechas.push(id)
  console.log(`${verde("✓")} ${id} ${tenue(`página ${pagina} · ${anchoCorte}×${altoArriba + altoAbajo}`)}`)
}

fs.rmSync(temporal, { recursive: true, force: true })

// ────────────────────────────────────────────────────────────────────────────
// La lista que usa el banco

fs.writeFileSync(
  path.join(RAIZ, "src/data/psicotecnicas/laminasLimpias.ts"),
  `/**
 * Las láminas del A1 recortadas del PDF de origen.
 *
 * La escribe \`scripts/psicotecnicas/recortar-laminas.mjs\`: no se edita a mano.
 * El recorte viejo se conserva al lado como prueba de qué se estaba enseñando;
 * lo que ve el piloto es esta.
 */

export const LAMINAS_LIMPIAS = new Set([
${hechas.map((id) => `  "${id}",`).join("\n")}
])
`,
  "utf-8"
)

console.log()
console.log(`Láminas rehechas desde el PDF: ${hechas.length} de 20.`)

if (saltadas.length > 0) {
  console.log()
  console.log(ambar(`${saltadas.length} sin rehacer:`))
  for (const s of saltadas) console.log(`  ${ambar("·")} ${s.id}: ${s.motivo}`)
}

// Cero comprobaciones no es un aprobado, aquí tampoco.
if (hechas.length === 0) {
  console.log()
  console.log(rojo("No se rehizo ninguna lámina."))
  process.exit(1)
}
