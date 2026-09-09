/**
 * Recorta las figuras de los ejercicios psicotécnicos desde los PDF de origen.
 *
 * Uso:
 *   node scripts/psicotecnicas/extraer-figuras.mjs <carpeta-con-los-pdf>
 *
 * Por qué existe: los ejercicios de razonamiento abstracto y espacial no son
 * texto, son figuras. La única forma fiel de traerlos es recortarlos del PDF
 * original —redibujarlos a mano cambiaría la lógica del ejercicio, que es
 * justo lo que no se puede tocar—. Este script deja el recorte documentado y
 * repetible: si mañana llega una edición nueva del material, se vuelve a correr
 * y las coordenadas quedan aquí, no en la memoria de quien lo hizo.
 *
 * Necesita `pdftoppm` (poppler: `brew install poppler`) y `sharp`
 * (`npm install --no-save sharp`).
 *
 * Las coordenadas de recorte están medidas sobre el render a la resolución que
 * declara cada fuente (`dpi`), no en proporciones: los PDF de origen tienen
 * cajas de tamaño irregular y una fracción global cortaba las etiquetas de
 * opción de unos y dejaba media pregunta en otros.
 */

import { execFileSync } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const raiz = path.resolve(__dirname, "../..")
const destinoBase = path.resolve(raiz, "public/psicotecnicas")

const origen = process.argv[2]
if (!origen) {
  console.error("Uso: node scripts/psicotecnicas/extraer-figuras.mjs <carpeta-con-los-pdf>")
  process.exit(1)
}

/**
 * A1 — «Series de figuras» (Centro de Nivelación MARPID).
 *
 * El PDF es una presentación navegable: cada problema ocupa seis páginas (la
 * limpia y cinco de solución progresiva). La limpia es la única sin texto de
 * navegación, y va en 5, 11, 17… de seis en seis.
 *
 * Del recorte se dejan fuera la cabecera y el pie de marca, el contador
 * «01/20» —la app lleva su propia numeración y ver dos a la vez confunde— y la
 * marca de red social del autor, que cae entre la matriz y las opciones y no
 * forma parte del ejercicio.
 */
const A1 = {
  archivo: "554759531-Razonamiento-Abstracto-Series-de-Figuras.pdf",
  carpeta: "abstracto",
  prefijo: "AB-A1",
  dpi: 150,
  total: 20,
  pagina: (n) => 5 + 6 * (n - 1),
  recorte: { top: 0.149, bottom: 0.8797 },
  tapar: [{ x: 0.4, y: 0.665, w: 0.22, h: 0.035 }],
}

/**
 * E1 — «Test razonamiento espacial» (14 preguntas, 7 minutos).
 *
 * Aquí van varios ejercicios por página, cada uno dentro de una caja con borde.
 * Se recorta solo la figura: el enunciado viaja como texto en los datos, así
 * que repetirlo dentro de la imagen lo mostraría dos veces.
 *
 * El corte de cada uno está medido a mano. Se intentó detectarlo por el hueco
 * en blanco que sigue al enunciado, pero el umbral que respetaba las preguntas
 * de dos renglones se comía las etiquetas A/B/C/D de las de uno.
 *
 * Los ejercicios 13 y 14 cierran antes del borde de su caja: son los dos únicos
 * que llevan las alternativas como lista de texto dentro de la caja, y esas van
 * en los datos. Recortando hasta el borde salían dos veces, dentro de la figura
 * y otra vez como botones debajo.
 */
const E1 = {
  archivo: "670006116-Test-Razonamiento-Espacial.pdf",
  carpeta: "espacial",
  prefijo: "ES-E1",
  dpi: 130,
  margenLateral: { izq: 120, der: 118 },
  // [página, nº de ejercicio, y donde termina el enunciado, y donde cierra la caja]
  cortes: [
    [1, 1, 436, 614], [1, 2, 677, 839], [1, 3, 899, 1063], [1, 4, 1123, 1261],
    [2, 5, 285, 407], [2, 6, 500, 658], [2, 7, 750, 935], [2, 8, 1000, 1167],
    [3, 9, 196, 432], [3, 10, 525, 775], [3, 11, 866, 1257],
    [4, 12, 306, 700], [4, 13, 790, 1000],
    [5, 14, 230, 415],
  ],
}

/**
 * E2 — «Test de razonamiento espacial» (Grupo Pinillos / AulaContable).
 *
 * Este material viene con la respuesta ya marcada: un círculo sobre la opción
 * correcta en las de figuras, y resaltado amarillo en las de opción en texto.
 *
 * Eso decide su uso. Las preguntas 7 a 10 tienen las opciones en una lista de
 * texto aparte de la figura, así que se recorta solo la figura —sin el
 * resaltado— y sirven como ejercicio. Las demás llevan la marca encima de las
 * propias opciones, y ahí no hay recorte que valga: entran como ejemplos
 * resueltos del modo entrenamiento, que es lo que de verdad son.
 */
const E2 = {
  archivo: "667045629-TEST-DE-RAZ-ESPACIAL-compressed.pdf",
  carpeta: "espacial",
  prefijo: "ES-E2",
  dpi: 150,
  /**
   * Ventana que deja fuera el título, la lista de opciones —que va en una
   * columna a la izquierda y lleva el resaltado de la respuesta— y el marco de
   * la diapositiva. Lo que sobra de blanco lo quita el `trim`.
   *
   * La columna de opciones termina hacia el 10 % del ancho en las cuatro
   * páginas; la figura siempre empieza después.
   */
  ventana: { x0: 0.108, y0: 0.21, x1: 0.72, y1: 0.88 },
  paginas: [[10, 7], [11, 8], [12, 9], [13, 10]],
  // Los ejemplos resueltos se guardan enteros: la marca es parte del ejemplo.
  ejemplos: [4, 5, 6, 7, 8, 9, 14, 15],
  // Las dos páginas de teoría del cubo, para la lección.
  teoria: [2, 3],
}

/**
 * A2 — «Razonamiento abstracto», un ejercicio por página.
 *
 * Mezcla ejercicios abstractos y espaciales pese al nombre del archivo, así que
 * la categoría de cada uno se decide en los datos, no aquí. Se recorta el
 * blanco sobrante de la página y ya.
 */
const A2 = {
  archivo: "455247140-Razonamiento-Abstracto.pdf",
  carpeta: "abstracto",
  prefijo: "AB-A2",
  dpi: 100,
  desde: 2,
  hasta: 62, // 63 y 64 vienen en blanco; la 1 es la portada
}

/**
 * N1 — «Razonamiento numérico», 40 ejercicios de opción múltiple.
 *
 * Casi todo es texto y viaja como texto. La única figura imprescindible es la
 * del ejercicio 3: sin ver la pieza —un cuadrado con un triángulo encima— no
 * hay forma de calcular el área que pide.
 */
const N1 = {
  archivo: "256486461-Razonamiento-Numerico.pdf",
  carpeta: "numerico",
  dpi: 130,
  figuras: [{ pagina: 1, nombre: "NU-N1-03", caja: [862, 776, 952, 898] }],
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "psico-"))

function rasterizar(pdf, pagina, dpi, prefijo) {
  execFileSync("pdftoppm", [
    "-png", "-r", String(dpi),
    "-f", String(pagina), "-l", String(pagina),
    pdf, path.join(tmp, prefijo),
  ])
  const salida = fs.readdirSync(tmp).find((f) => f.startsWith(prefijo) && f.endsWith(".png"))
  if (!salida) throw new Error(`pdftoppm no generó la página ${pagina} de ${pdf}`)
  return path.join(tmp, salida)
}

function asegurar(carpeta) {
  const d = path.join(destinoBase, carpeta)
  fs.mkdirSync(d, { recursive: true })
  return d
}

let generadas = 0

async function extraerA1() {
  const pdf = path.join(origen, A1.archivo)
  const destino = asegurar(A1.carpeta)
  for (let n = 1; n <= A1.total; n++) {
    const png = rasterizar(pdf, A1.pagina(n), A1.dpi, `a1_${n}`)
    const { width, height } = await sharp(png).metadata()
    const top = Math.round(height * A1.recorte.top)
    const alto = Math.round(height * A1.recorte.bottom) - top
    // Las tapas se aplican antes del recorte, en coordenadas de página entera.
    const parches = A1.tapar.map((t) => ({
      input: {
        create: {
          width: Math.round(width * t.w),
          height: Math.round(height * t.h),
          channels: 3,
          background: "#ffffff",
        },
      },
      left: Math.round(width * t.x),
      top: Math.round(height * t.y),
    }))
    await sharp(png)
      .composite(parches)
      .extract({ left: 0, top, width, height: alto })
      .webp({ quality: 88, effort: 6 })
      .toFile(path.join(destino, `${A1.prefijo}-${String(n).padStart(2, "0")}.webp`))
    generadas++
  }
}

async function extraerE1() {
  const pdf = path.join(origen, E1.archivo)
  const destino = asegurar(E1.carpeta)
  for (const [pagina, n, y0, y1] of E1.cortes) {
    const png = rasterizar(pdf, pagina, E1.dpi, `e1_${n}`)
    const { width } = await sharp(png).metadata()
    await sharp(png)
      .extract({
        left: E1.margenLateral.izq,
        top: y0,
        width: width - E1.margenLateral.izq - E1.margenLateral.der,
        height: y1 - y0,
      })
      .webp({ quality: 88, effort: 6 })
      .toFile(path.join(destino, `${E1.prefijo}-${String(n).padStart(2, "0")}.webp`))
    generadas++
  }
}

async function extraerE2() {
  const pdf = path.join(origen, E2.archivo)
  const destino = asegurar(E2.carpeta)
  const v = E2.ventana
  for (const [pagina, n] of E2.paginas) {
    const png = rasterizar(pdf, pagina, E2.dpi, `e2_${n}`)
    const { width, height } = await sharp(png).metadata()
    const left = Math.round(width * v.x0)
    const top = Math.round(height * v.y0)
    await sharp(png)
      .extract({
        left,
        top,
        width: Math.round(width * v.x1) - left,
        height: Math.round(height * v.y1) - top,
      })
      .trim({ threshold: 18 })
      .extend({ top: 12, bottom: 12, left: 12, right: 12, background: "#ffffff" })
      .flatten({ background: "#ffffff" })
      .webp({ quality: 88, effort: 6 })
      .toFile(path.join(destino, `${E2.prefijo}-${String(n).padStart(2, "0")}.webp`))
    generadas++
  }
  for (const pagina of [...E2.ejemplos, ...E2.teoria]) {
    const png = rasterizar(pdf, pagina, E2.dpi, `e2p_${pagina}`)
    const etiqueta = E2.teoria.includes(pagina) ? "teoria" : "ejemplo"
    await sharp(png)
      .trim({ threshold: 12 })
      .flatten({ background: "#ffffff" })
      .webp({ quality: 86, effort: 6 })
      .toFile(path.join(destino, `${E2.prefijo}-${etiqueta}-${String(pagina).padStart(2, "0")}.webp`))
    generadas++
  }
}

async function extraerA2() {
  const pdf = path.join(origen, A2.archivo)
  const destino = asegurar(A2.carpeta)
  for (let p = A2.desde; p <= A2.hasta; p++) {
    const png = rasterizar(pdf, p, A2.dpi, `a2_${p}`)
    await sharp(png)
      .trim({ threshold: 22 })
      .extend({ top: 14, bottom: 14, left: 14, right: 14, background: "#ffffff" })
      .webp({ quality: 86, effort: 6 })
      .toFile(path.join(destino, `${A2.prefijo}-${String(p).padStart(2, "0")}.webp`))
    generadas++
  }
}

async function extraerN1() {
  const pdf = path.join(origen, N1.archivo)
  const destino = asegurar(N1.carpeta)
  for (const { pagina, nombre, caja } of N1.figuras) {
    const png = rasterizar(pdf, pagina, N1.dpi, `n1_${nombre}`)
    const [x0, y0, x1, y1] = caja
    await sharp(png)
      .extract({ left: x0, top: y0, width: x1 - x0, height: y1 - y0 })
      .extend({ top: 10, bottom: 10, left: 10, right: 10, background: "#ffffff" })
      .webp({ quality: 90, effort: 6 })
      .toFile(path.join(destino, `${nombre}.webp`))
    generadas++
  }
}

try {
  await extraerA1()
  await extraerE1()
  await extraerE2()
  await extraerA2()
  await extraerN1()
  console.log(`Listo: ${generadas} figuras en ${destinoBase}`)
} finally {
  fs.rmSync(tmp, { recursive: true, force: true })
}
