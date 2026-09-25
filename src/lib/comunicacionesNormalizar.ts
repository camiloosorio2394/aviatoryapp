/**
 * Normalización de lo que el piloto dice o escribe en la práctica de
 * Comunicaciones: números hablados, alfabeto de deletreo y formatos de campo.
 *
 * El reconocedor de voz del navegador devuelve cualquier cosa: «two four zero»,
 * «240», «24 0», «two forty», «niner», «tree». Y el piloto que escribe pone
 * «FL240», «flight level 240» o «240». Todo eso tiene que valer lo mismo, así
 * que se pasa todo por aquí antes de comparar.
 *
 * Pronunciación de referencia: Doc 9432 (4.ª ed.) 2.4.1 (TRI, FO-ar, FA-IF,
 * NAI-na), 2.4.2 (dígito a dígito), 2.4.3 (CIENTOS y MIL en altitudes, nubes,
 * visibilidad y RVR) y 2.4.4 (canales VHF con «decimal»). Alfabeto: 2.3.3.
 */

/** Palabras que valen un dígito, incluidas las variantes OACI y las que confunde el reconocedor. */
const DIGITOS: Record<string, string> = {
  zero: "0",
  "ze-ro": "0",
  zeero: "0",
  oh: "0",
  one: "1",
  wun: "1",
  won: "1",
  two: "2",
  too: "2",
  to: "2",
  three: "3",
  tree: "3",
  four: "4",
  fower: "4",
  for: "4",
  five: "5",
  fife: "5",
  six: "6",
  seven: "7",
  eight: "8",
  ait: "8",
  nine: "9",
  niner: "9",
}

/**
 * «to», «too», «for» y «oh» son palabras de verdad («climb to», «report for»)
 * y solo valen dígito cuando van pegadas a otro número. Se resuelven aparte.
 */
const DIGITOS_AMBIGUOS = new Set(["to", "too", "for", "oh", "won"])

const DECENAS: Record<string, string> = {
  ten: "10",
  eleven: "11",
  twelve: "12",
  thirteen: "13",
  fourteen: "14",
  fifteen: "15",
  sixteen: "16",
  seventeen: "17",
  eighteen: "18",
  nineteen: "19",
  twenty: "2",
  thirty: "3",
  forty: "4",
  fifty: "5",
  sixty: "6",
  seventy: "7",
  eighty: "8",
  ninety: "9",
}
/** Las decenas redondas: «forty» sola es 40, «forty two» es 42. */
const DECENA_REDONDA = new Set(["twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"])

/** Alfabeto de deletreo (Doc 9432 2.3.3), con las grafías que devuelve el reconocedor. */
const ALFABETO: Record<string, string> = {
  alfa: "a",
  alpha: "a",
  bravo: "b",
  charlie: "c",
  delta: "d",
  echo: "e",
  foxtrot: "f",
  golf: "g",
  hotel: "h",
  india: "i",
  juliet: "j",
  julieta: "j",
  juliett: "j",
  kilo: "k",
  lima: "l",
  mike: "m",
  november: "n",
  oscar: "o",
  papa: "p",
  quebec: "q",
  romeo: "r",
  sierra: "s",
  tango: "t",
  uniform: "u",
  victor: "v",
  whiskey: "w",
  whisky: "w",
  xray: "x",
  "x-ray": "x",
  yankee: "y",
  zulu: "z",
}

const PALABRA_DECIMAL = new Set(["decimal", "point", "dayseemal", "coma", "comma"])

function esNumero(t: string): boolean {
  return /^\d+$/.test(t)
}

/**
 * Parte el texto en fichas: minúsculas, sin tildes, «FL240» → «fl 240»,
 * «118,7» → «118.7», «1 013» → «1013», sin puntuación.
 */
export function fichas(texto: string): string[] {
  const limpio = texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    // Coma decimal: «118,7» → «118.7». Antes de quitar la puntuación.
    .replace(/(\d),(\d)/g, "$1.$2")
    // Miles separados por espacio fino o normal: «1 013», «2 500».
    .replace(/(\d)[\s\u00a0\u202f](?=\d{3}\b)/g, "$1")
    .replace(/x-ray/g, "xray")
    .replace(/ze-ro/g, "zero")
    .replace(/flight\s+level/g, "fl")
    // «FL240», «RWY24L», «A1»: separar letras de números salvo en decimales.
    .replace(/([a-z])(\d)/g, "$1 $2")
    .replace(/(\d)([a-z])/g, "$1 $2")
    .replace(/[^a-z0-9.\s-]/g, " ")
    .replace(/-/g, " ")
    // Punto suelto que no es decimal (fin de frase).
    .replace(/\.(?!\d)/g, " ")
    .replace(/(?<!\d)\./g, " ")
  return limpio.split(/\s+/).filter(Boolean)
}

/** «118.700» → «118.7»; «118.000» → «118». Así 118.7 y 118.70 son lo mismo. */
function recortarDecimal(n: string): string {
  if (!n.includes(".")) return n
  return n.replace(/0+$/, "").replace(/\.$/, "")
}

/**
 * Convierte fichas habladas en números: «two four zero» → «240»,
 * «one one eight decimal seven» → «118.7», «four thousand» → «4000»,
 * «two thousand five hundred» → «2500», «two forty» → «240».
 *
 * Los dígitos seguidos se pegan (así se transmiten: Doc 9432 2.4.2). Las
 * palabras «thousand» y «hundred» multiplican lo que va delante (2.4.3).
 */
export function unirNumeros(entrada: string[]): string[] {
  const salida: string[] = []
  let digitos = ""
  let acumulado = 0
  let hayMultiplo = false
  let decimales: string | null = null

  const cerrar = () => {
    if (decimales !== null) {
      const entero = hayMultiplo ? String(acumulado + (digitos ? Number(digitos) : 0)) : digitos
      salida.push(recortarDecimal(`${entero}.${decimales}`))
    } else if (hayMultiplo) {
      salida.push(String(acumulado + (digitos ? Number(digitos) : 0)))
    } else if (digitos) {
      salida.push(digitos)
    }
    digitos = ""
    acumulado = 0
    hayMultiplo = false
    decimales = null
  }

  const agregar = (d: string) => {
    if (decimales !== null) decimales += d
    else digitos += d
  }

  const enNumero = () => digitos !== "" || hayMultiplo || decimales !== null

  for (let i = 0; i < entrada.length; i++) {
    const t = entrada[i]
    const siguiente = entrada[i + 1]
    const siguienteEsNumero =
      siguiente !== undefined &&
      (esNumero(siguiente) || (siguiente in DIGITOS && !DIGITOS_AMBIGUOS.has(siguiente)) || siguiente in DECENAS)

    if (esNumero(t)) {
      agregar(t)
      continue
    }
    if (/^\d+\.\d+$/.test(t)) {
      if (enNumero()) cerrar()
      const [e, d] = t.split(".")
      digitos = e
      decimales = d
      continue
    }
    if (t in DIGITOS) {
      // «to», «for», «oh» valen dígito solo en medio de un número: «one to one»
      // sí, «climb to four thousand» no.
      if (DIGITOS_AMBIGUOS.has(t) && !(enNumero() && siguienteEsNumero)) {
        cerrar()
        salida.push(t)
        continue
      }
      agregar(DIGITOS[t])
      continue
    }
    if (t in DECENAS) {
      const base = DECENAS[t]
      if (DECENA_REDONDA.has(t)) {
        const unidad = siguiente !== undefined && siguiente in DIGITOS && !DIGITOS_AMBIGUOS.has(siguiente) ? DIGITOS[siguiente] : null
        if (unidad !== null && unidad !== "0") {
          agregar(base + unidad)
          i++
        } else {
          agregar(base + "0")
        }
      } else {
        agregar(base)
      }
      continue
    }
    if (t === "thousand" && enNumero()) {
      acumulado += (digitos ? Number(digitos) : 1) * 1000
      digitos = ""
      hayMultiplo = true
      continue
    }
    if (t === "hundred" && enNumero()) {
      acumulado += (digitos ? Number(digitos) : 1) * 100
      digitos = ""
      hayMultiplo = true
      continue
    }
    if (PALABRA_DECIMAL.has(t) && enNumero() && decimales === null && siguienteEsNumero) {
      if (hayMultiplo) {
        digitos = String(acumulado + (digitos ? Number(digitos) : 0))
        acumulado = 0
        hayMultiplo = false
      }
      decimales = ""
      continue
    }
    cerrar()
    salida.push(t)
  }
  cerrar()
  return salida
}

/** Alfabeto de deletreo a letras: «alfa one» → «a 1». */
function letras(entrada: string[]): string[] {
  return entrada.map((t) => ALFABETO[t] ?? t)
}

/**
 * Normaliza una transmisión dicha o escrita a una cadena comparable:
 * minúsculas, números en cifras, deletreo en letras, espacios simples.
 *
 *   «Flight level two four zero, Avianca four five two» → «fl 240 avianca 452»
 *   «FL240 AVIANCA 452»                                 → «fl 240 avianca 452»
 */
export function normalizarHablado(texto: string): string {
  return letras(unirNumeros(fichas(texto))).join(" ")
}

/** ¿Aparece `buscado` (ya normalizado) en `texto` (ya normalizado), respetando límites de ficha? */
export function contieneFrase(textoNormalizado: string, buscadoNormalizado: string): boolean {
  if (!buscadoNormalizado) return true
  return ` ${textoNormalizado} `.includes(` ${buscadoNormalizado} `)
}

// ─── Campos de una autorización ──────────────────────────────────────────────

/** Tipos de campo que sabe comparar la práctica. */
export type TipoCampo =
  | "limite"
  | "ruta"
  | "salida"
  | "nivel"
  | "altitud"
  | "rumbo"
  | "frecuencia"
  | "squawk"
  | "qnh"
  | "pista"
  | "distintivo"
  | "velocidad"
  | "texto"

/** Solo las cifras de un texto normalizado, en orden. */
function cifras(n: string): string[] {
  return n.split(" ").filter((t) => /^\d+(\.\d+)?$/.test(t))
}

/**
 * Forma canónica de un campo, para comparar lo que escribió el piloto con lo
 * esperado. Devuelve null si no hay nada que comparar.
 *
 *   nivel:      «FL240», «flight level 240», «240», «two four zero» → «FL240»
 *   altitud:    «4000», «4 000 ft», «four thousand feet»            → «4000»
 *   rumbo:      «050», «50», «heading zero five zero»                → «50»
 *   frecuencia: «118,7», «118.700», «one one eight decimal seven»    → «118.7»
 *   pista:      «24L», «runway 24 left», «RWY 24 L»                  → «24L»
 *   texto:      letras y cifras, sin espacios ni signos              → «A1», «WICKEN3»
 */
export function normalizarCampo(tipo: TipoCampo, valor: string): string | null {
  const n = normalizarHablado(valor)
  if (!n) return null
  const nums = cifras(n)
  switch (tipo) {
    case "nivel": {
      if (nums.length === 0) return null
      const v = Number(nums[0])
      return Number.isFinite(v) ? `FL${v}` : null
    }
    case "altitud":
    case "velocidad":
    case "qnh":
    case "rumbo": {
      if (nums.length === 0) return null
      const v = Number(nums[0])
      return Number.isFinite(v) ? String(v) : null
    }
    case "squawk": {
      if (nums.length === 0) return null
      return nums.join("").padStart(4, "0")
    }
    case "frecuencia": {
      if (nums.length === 0) return null
      return recortarDecimal(nums[0].includes(".") ? nums[0] : `${nums[0]}`)
    }
    case "pista": {
      if (nums.length === 0) return null
      const fichasPista = n.split(" ")
      const i = fichasPista.indexOf(nums[0])
      const lado = fichasPista[i + 1]
      const sufijo =
        lado === "left" || lado === "l" ? "L" : lado === "right" || lado === "r" ? "R" : lado === "center" || lado === "centre" || lado === "c" ? "C" : ""
      return `${String(Number(nums[0])).padStart(2, "0")}${sufijo}`
    }
    case "distintivo":
    case "limite":
    case "ruta":
    case "salida":
    case "texto": {
      const t = n
        .split(" ")
        // Palabras de relleno que el piloto puede escribir o no.
        .filter((p) => !["via", "to", "the", "departure", "vor", "ndb", "runway", "rwy"].includes(p) || tipo === "texto")
        .join("")
        .toUpperCase()
      return t || null
    }
  }
}

/** ¿Lo escrito por el piloto vale lo esperado para ese tipo de campo? Acepta alternativas. */
export function campoCoincide(tipo: TipoCampo, dado: string, esperado: string, alternativas: string[] = []): boolean {
  const d = normalizarCampo(tipo, dado)
  if (d === null) return false
  return [esperado, ...alternativas].some((e) => normalizarCampo(tipo, e) === d)
}
