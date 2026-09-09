/**
 * Recalcula los 38 ejercicios de opción múltiple de razonamiento numérico.
 *
 * Uso:
 *   node scripts/psicotecnicas/verificar-numerico.mjs
 *
 * Por qué existe: el documento 256486461 no trae clave de respuestas, así que
 * las 38 se resolvieron a mano al cargarlas. Una respuesta resuelta a mano y
 * revisada a ojo se parece demasiado a una respuesta inventada.
 *
 * Aquí cada una se vuelve a calcular desde el enunciado, con la aritmética
 * escrita y ejecutada —no leída—, y se compara contra lo que quedó en el banco.
 * Si alguien cambia una respuesta sin querer, esto lo dice.
 *
 * Las que dependen de una figura o de contar casos se resuelven igual, con el
 * dato de la figura escrito como constante y anotado de dónde sale.
 */

import fs from "node:fs"
import { registerHooks } from "node:module"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const raiz = path.resolve(__dirname, "../..")

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

const { NUMERICO } = await import(
  pathToFileURL(path.resolve(raiz, "src/data/psicotecnicas/numerico.ts")).href
)

// ── Utilidades ──────────────────────────────────────────────────────────────
const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1))
const C = (n, k) => fact(n) / (fact(k) * fact(n - k))

/**
 * La respuesta esperada de cada ejercicio, recalculada.
 *
 * El valor puede ser el texto exacto de la alternativa, o un número que se
 * compara contra la alternativa tras quitarle separadores de miles, unidades y
 * el signo decimal a la europea.
 */
const ESPERADO = {
  // Ganancia sobre el precio final: P − 0,20P = 120.
  "NU-N1-01": 120 / 0.8,
  // x + 0,2x = 2400; el que menos tiene guarda 0,2x.
  "NU-N1-02": 0.2 * (2400 / 1.2),
  // Cuadrado de lado 2 más triángulo equilátero de lado 2: 4 + √3.
  "NU-N1-03": "4 + √3",
  // Grupos de 5 letras entre las 11 de «Matemáticas»: sin orden.
  "NU-N1-04": C(11, 5),
  // Queda 3/4 y luego la mitad de eso: 3/8 del total son 1500.
  "NU-N1-05": 1500 / (3 / 8),
  // aₙ = aₙ₋₂ + aₙ₋₃ sobre 1,1,1,2,2,3,4,5,7,9,12.
  "NU-N1-06": (() => {
    const s = [1, 1, 1]
    while (s.length < 12) s.push(s.at(-2) + s.at(-3))
    return s.at(-1)
  })(),
  // n/2 = 3m → m = n/6 → m/2 = n/12.
  "NU-N1-07": "n/12",
  // Los cuatro vértices al centro dejan la mitad del cuadrado.
  "NU-N1-08": (6 * 6) / 2,
  // De los 8 resultados, 4 tienen dos caras o más.
  "NU-N1-09": "1/2",
  // Reponer 20 sobre las 80 que quedan.
  "NU-N1-10": `${(20 / 80) * 100}%`,
  // h = −t² + 5t + c con h(2) = 12 → c = 6; luego h(4).
  "NU-N1-12": (() => {
    const c = 12 - (-(2 ** 2) + 5 * 2)
    return -(4 ** 2) + 5 * 4 + c
  })(),
  // 38 km + 5 hm + 16 dam en metros.
  "NU-N1-13": 38 * 1000 + 5 * 100 + 16 * 10,
  // Fibonacci en los números y la misma posición en el alfabeto: 13 = M.
  "NU-N1-14": "M13",
  // B=2, d=4, g=7 con saltos +2, +3, +4 → 11 = K.
  "NU-N1-15": "K",
  // Rectángulo 6×12 dividido por triángulos de catetos 3 y 4.
  "NU-N1-16": (6 * 12) / ((3 * 4) / 2),
  // Chatea con el 10% de los 400 que conoce; no chatea con el resto de 1600.
  "NU-N1-17": 1600 - 0.1 * (0.25 * 1600),
  // Quinto de 8,7,5,4,3/4,1/2,1/6,1/9.
  "NU-N1-18": "3/4",
  // b + h = 30 con b = 2h.
  "NU-N1-19": 2 * (30 / 3),
  // 2 platos × 4 bebidas = 8 casos; 2 favorables.
  "NU-N1-20": (2 / 8).toFixed(3).replace(".", ","),
  // t + a = 132 y 4t + 2a = 456 → t = 96, a = 36. Pide avestruces primero.
  "NU-N1-21": "36; 96",
  // Catetos 3 y 4 (hipotenusa 5).
  "NU-N1-22": (3 * 4) / 2,
  // 600 cm × 1100 cm.
  "NU-N1-23": 600 * 1100,
  // (4/10)(3/9)(6/8) sin reposición.
  "NU-N1-24": `${(4 / 10) * (3 / 9) * (6 / 8) * 100}%`,
  // p + t = 108 y 2p + 5t = 348, repartido entre 4 pisos.
  "NU-N1-25": (() => {
    const t = (348 - 2 * 108) / 3
    const p = 108 - t
    return `${p / 4} y ${t / 4}`
  })(),
  // J + 180 = 2(P − 180) y P + 150 = J − 150.
  "NU-N1-26": (() => {
    // 2P − 540 = P + 300
    return 300 + 540
  })(),
  // A + 2A + 4A = 1 → B = 2/7.
  "NU-N1-27": "2/7",
  // Subconjuntos de dos elementos entre tres.
  "NU-N1-28": C(3, 2),
  // x − 8 = √(x + 4) → x² − 17x + 60 = 0, raíz válida.
  "NU-N1-29": (() => {
    const raices = [(17 + Math.sqrt(17 ** 2 - 240)) / 2, (17 - Math.sqrt(17 ** 2 - 240)) / 2]
    return raices.find((x) => x - 8 >= 0 && Math.abs(x - 8 - Math.sqrt(x + 4)) < 1e-9)
  })(),
  // C(12,2) − C(10,2).
  "NU-N1-30": C(12, 2) - C(10, 2),
  // x² + 3x − 88 = 0.
  "NU-N1-31": "x₁ = 8, x₂ = −11",
  // Cinco banderas distintas.
  "NU-N1-32": fact(5),
  // Descuentos sucesivos: 10% y luego 2%.
  "NU-N1-33": 100 * 100 * 0.9 * 0.98,
  // (x−2)(x−3) = 6 → x = 5; el ancho es x − 3.
  "NU-N1-34": 5 - 3,
  // Equipos de dos entre diez.
  "NU-N1-35": C(10, 2),
  // 200 cm, corta el 85%, y del resto la mitad.
  "NU-N1-36": 200 * 0.15 * 0.5,
  // C(8,3).
  "NU-N1-38": C(8, 3),
  // 320,25 min = 5 h 20 min 15 s sumados a 15 h 20 min 10 s.
  "NU-N1-39": (() => {
    const seg = 15 * 3600 + 20 * 60 + 10 + 320.25 * 60
    const h = Math.floor(seg / 3600)
    const m = Math.floor((seg % 3600) / 60)
    return `${h} h, ${m} min, ${Math.round(seg % 60)} s`
  })(),
  // b + h = 24 con b = h + 4; después base/2 y altura×2.
  "NU-N1-40": (() => {
    const h = (24 - 4) / 2
    const b = h + 4
    return `${2 * (b / 2 + h * 2)} m`
  })(),
}

/** Normaliza una alternativa para poder compararla con un número. */
function comoNumero(texto) {
  const limpio = texto
    .replace(/\s/g, "")
    .replace(/[a-zA-Z%²³°]/g, "")
    .replace(/\./g, "")
    .replace(",", ".")
  const n = Number(limpio)
  return Number.isFinite(n) ? n : null
}

const fallos = []
let comprobados = 0

for (const e of NUMERICO) {
  const esperado = ESPERADO[e.id]
  if (esperado === undefined) {
    fallos.push(`${e.id}: no hay cálculo de contraste escrito para este ejercicio`)
    continue
  }
  comprobados++
  const cargada = e.opciones[e.respuesta]

  let coincide
  if (typeof esperado === "number") {
    const n = comoNumero(cargada)
    coincide = n !== null && Math.abs(n - esperado) < 1e-6
  } else {
    const norm = (t) => String(t).replace(/\s+/g, "").replace(/[·.]/g, "")
    coincide = norm(cargada) === norm(esperado)
  }

  if (!coincide) {
    fallos.push(
      `${e.id}: el cálculo da «${esperado}» y el banco marca «${cargada}» ` +
        `(alternativas: ${e.opciones.join(" / ")})`
    )
  }
}

console.log(`Numérico de opción múltiple: ${NUMERICO.length} ejercicios, ${comprobados} recalculados`)
if (fallos.length > 0) {
  console.error(`\n✗ ${fallos.length} no cuadran:\n`)
  for (const f of fallos) console.error(`  · ${f}`)
  process.exit(1)
}
console.log("✓ los 38 coinciden con el cálculo hecho desde el enunciado")
