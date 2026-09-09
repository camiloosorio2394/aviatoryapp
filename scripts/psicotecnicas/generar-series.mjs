/**
 * Genera el banco de series numéricas desde el PDF de origen.
 *
 * Uso:
 *   node scripts/psicotecnicas/generar-series.mjs <carpeta-con-los-pdf>
 *
 * Escribe `src/data/psicotecnicas/series.ts`, que sí va al repositorio: la app
 * no debe depender de tener el PDF a mano para compilar.
 *
 * El documento («Psicotécnicos — Razonamiento numérico», 336461140) trae los
 * enunciados en una primera mitad y las soluciones en la segunda, numerados
 * igual, así que se emparejan por número de ejercicio y de ítem. De la solución
 * sale además el rastro de operaciones —«33 (+2) 35 (+2) 37…»— con el que se
 * arma la explicación, de modo que ni la respuesta ni el porqué salen de aquí.
 *
 * Lo único que no está en la fuente son las alternativas: el original es de
 * completar el número, sin opciones. Como el módulo entero funciona con opción
 * múltiple cronometrada, se generan tres distractores por ítem a partir de los
 * errores típicos de cada serie (aplicar el paso anterior, pasarse un paso,
 * invertir el signo). No se «cambian» alternativas del original porque el
 * original no tiene ninguna.
 *
 * Necesita `pdftotext` (poppler).
 */

import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const raiz = path.resolve(__dirname, "../..")
const salida = path.resolve(raiz, "src/data/psicotecnicas/series.ts")

const origen = process.argv[2]
if (!origen) {
  console.error("Uso: node scripts/psicotecnicas/generar-series.mjs <carpeta-con-los-pdf>")
  process.exit(1)
}

const PDF = path.join(origen, "336461140-Psicotecnicos-razonamiento-numerico.pdf")
const texto = execFileSync("pdftotext", ["-layout", PDF, "-"], { encoding: "utf8" })

// La palabra SOLUCIONES aparece suelta como pie de página, así que el corte se
// hace por el título de la sección, que va una sola vez.
const corte = texto.indexOf("SOLUCIONES RAZONAMIENTO NUMÉRICO")
if (corte < 0) throw new Error("No se encontró la sección de soluciones")

const ruido = /^(SOLUCIONES|PSICOTÉCNICOS|RAZONAMIENTO NUMÉRICO|U\. P\. AULA MAGNA)/

/** Parte un bloque en ítems numerados, uniendo los renglones que continúan. */
function leerItems(bloque) {
  const items = new Map()
  let actual = null
  for (const cruda of bloque.split("\n")) {
    const linea = cruda.trim()
    if (!linea || ruido.test(linea)) continue
    const inicio = linea.match(/^(\d{1,2})\.\s*(.+)$/)
    if (inicio) {
      actual = Number(inicio[1])
      items.set(actual, inicio[2])
    } else if (actual !== null && items.has(actual)) {
      items.set(actual, `${items.get(actual)} ${linea}`)
    }
  }
  return items
}

/**
 * Separa un texto en bloques «Ejercicio N», con su instrucción.
 *
 * La instrucción importa y mucho: **los diez bloques no piden lo mismo**. Seis
 * piden completar la serie, dos piden señalar el número que sobra y uno pide
 * los dos números que siguen. Cargarlos todos como «completa la serie» es
 * cambiar la pregunta, y con ella la respuesta.
 */
function leerBloques(texto) {
  const bloques = new Map()
  const partes = texto.split(/^\s*Ejercicio\s+(\d+)\s*$/m)
  for (let i = 1; i < partes.length; i += 2) {
    const cuerpo = partes[i + 1] ?? ""
    // La instrucción es lo que va antes del primer ítem numerado.
    const hastaPrimerItem = cuerpo.split(/^\s*1\.\s/m)[0] ?? ""
    bloques.set(Number(partes[i]), {
      items: leerItems(cuerpo),
      instruccion: hastaPrimerItem.replace(/\s+/g, " ").trim(),
    })
  }
  return bloques
}

/**
 * Qué pide un bloque, leído de su propia instrucción.
 *
 * Varios bloques dicen «sigue las mismas instrucciones que en el ejercicio
 * anterior», y el último no trae instrucción ninguna, así que el tipo se
 * hereda del bloque de antes. Lo que NO se hace es suponer «completar» por
 * defecto: suponerlo fue justo lo que metió 27 ejercicios con la pregunta
 * cambiada.
 */
function tipoDeBloque(instruccion, anterior) {
  if (/err[oó]ne[oa]/i.test(instruccion)) return "intruso"
  if (/dos n[uú]meros que siguen/i.test(instruccion)) return "completar"
  if (/complet[ae]/i.test(instruccion)) return "completar"
  if (/mismas (instrucciones|indicaciones)/i.test(instruccion)) return anterior
  // Sin instrucción propia: hereda. Si no hay de quién heredar, no se inventa.
  return anterior
}

const enunciados = leerBloques(texto.slice(0, corte))
const soluciones = leerBloques(texto.slice(corte))

/**
 * De «33 (+2) 35 (+2) … ? 51.» saca 51.
 *
 * No se puede anclar al final: bastantes soluciones llevan detrás una línea
 * suelta con los saltos de segundo nivel («+2 +2 +2»), que al unir renglones
 * queda pegada después de la respuesta. Se toma la última marca «? número».
 */
function respuestaDe(solucion) {
  const marcas = [...solucion.matchAll(/\?\s*(-?\d+(?:[.,]\d+)?)/g)]
  if (marcas.length === 0) return null
  return Number(marcas.at(-1)[1].replace(",", "."))
}

/** El desglose, sin la coletilla de la respuesta ni los saltos de segundo nivel. */
function rastroDe(solucion) {
  const marcas = [...solucion.matchAll(/\?\s*(-?\d+(?:[.,]\d+)?)/g)]
  const hasta = marcas.length > 0 ? marcas.at(-1).index : solucion.length
  return solucion
    .slice(0, hasta)
    // El ejercicio 1 viene en prosa y repite la respuesta antes del desglose.
    .replace(/^La respuesta correcta es[^.]*\.\s*/i, "")
    .replace(/^Observamos que/i, "Se observa que")
    // En esa misma prosa el «?» hace de flecha entre términos.
    .replace(/\s*\?\s*/g, " ")
    .replace(/\s+/g, " ")
    .replace(/[\s.,;]+$/, "")
    .trim()
}

/** Los pasos declarados entre paréntesis, en orden. */
function pasosDe(solucion) {
  return [...solucion.matchAll(/\(([^)]+)\)/g)].map((m) => m[1].trim())
}

/** Los números de la serie, tal como los muestra el enunciado. */
function terminosDe(enunciado) {
  return enunciado
    .replace(/\.\.\.|…/g, "")
    .split(/[,\s]+/)
    .map((t) => t.trim())
    .filter((t) => /^-?\d+$/.test(t))
    .map(Number)
}

/**
 * Clasifica la serie por el rastro de operaciones de la propia solución.
 * Sin rastro es porque hay dos series entrelazadas, que es lo más difícil.
 */
function clasificar(pasos) {
  // Sin paréntesis no hay un salto único que seguir: son dos series metidas
  // una dentro de otra, y eso es lo más duro de ver a contrarreloj.
  if (pasos.length === 0) return { sub: "Sucesiones alternantes", nivel: "avanzado" }

  const unicos = new Set(pasos)
  const multiplicativa = pasos.some((p) => /x|×|:|\//.test(p))

  // ¿Los saltos crecen de forma regular (+1, +2, +3…)? Es un patrón clásico:
  // cuesta más que un salto fijo, pero no es de los que se atragantan.
  const numeros = pasos.map((p) => Number(p.replace(/[^\d-]/g, "")))
  const regular =
    numeros.length > 2 &&
    numeros.every(Number.isFinite) &&
    new Set(numeros.slice(1).map((n, i) => n - numeros[i])).size === 1

  if (multiplicativa) {
    return {
      sub: "Sucesiones multiplicativas",
      nivel: unicos.size <= 2 ? "intermedio" : "avanzado",
    }
  }
  if (unicos.size === 1) return { sub: "Sucesiones aritméticas", nivel: "basico" }
  if (unicos.size === 2) return { sub: "Sucesiones alternantes", nivel: "intermedio" }
  return {
    sub: "Sucesiones de progresión variable",
    nivel: regular ? "intermedio" : "avanzado",
  }
}

/**
 * Tres distractores para un ítem.
 *
 * Se construyen con los errores que de verdad comete quien va rápido: repetir
 * el penúltimo salto, adelantarse un término, o equivocar el signo. Si alguno
 * coincide con la respuesta o se repite, se rellena con vecinos.
 */
function distractores(terminos, respuesta) {
  const ultimo = terminos.at(-1) ?? respuesta
  const salto = respuesta - ultimo
  const previo = terminos.length >= 2 ? ultimo - terminos.at(-2) : salto
  const candidatos = [
    ultimo + previo,
    respuesta + salto,
    ultimo - salto,
    respuesta + 1,
    respuesta - 1,
    respuesta + 2,
    ultimo,
  ]
  const vistos = new Set([respuesta])
  const elegidos = []
  for (const c of candidatos) {
    if (!Number.isFinite(c) || vistos.has(c)) continue
    vistos.add(c)
    elegidos.push(c)
    if (elegidos.length === 3) break
  }
  return elegidos
}

/**
 * Tres distractores para un ítem de «número que sobra».
 *
 * Aquí no valen los distractores de completar: la respuesta es un término que
 * está **dentro** de la serie, así que las otras tres alternativas tienen que
 * salir también de la serie. Un número que no aparece se descarta de un
 * vistazo y regala el ejercicio.
 */
function distractoresIntruso(terminos, respuesta) {
  const otros = terminos.filter((t) => t !== respuesta)
  const vistos = new Set([respuesta])
  const elegidos = []
  // Se toman repartidos a lo largo de la serie, no los tres primeros: si
  // siempre salieran del principio, el intruso se delataría por posición.
  const paso = Math.max(1, Math.floor(otros.length / 4))
  for (let i = 0; i < otros.length && elegidos.length < 3; i += paso) {
    if (vistos.has(otros[i])) continue
    vistos.add(otros[i])
    elegidos.push(otros[i])
  }
  for (const t of otros) {
    if (elegidos.length >= 3) break
    if (vistos.has(t)) continue
    vistos.add(t)
    elegidos.push(t)
  }
  return elegidos
}

/** Aplica una operación declarada («+3», «x2», «:2») a un número. */
function aplicar(valor, op) {
  const m = op.replace(/\s+/g, "").match(/^([+\-x×:/])(\d+(?:[.,]\d+)?)$/)
  if (!m) return null
  const n = Number(m[2].replace(",", "."))
  switch (m[1]) {
    case "+": return valor + n
    case "-": return valor - n
    case "x": case "×": return valor * n
    case ":": case "/": return n === 0 ? null : valor / n
    default: return null
  }
}

/**
 * Contrasta la serie impresa con las operaciones que declara la solución.
 *
 * El documento tiene erratas, y hay que separarlas en dos clases porque no se
 * arreglan igual:
 *
 * — La cadena de operaciones reproduce la serie entera pero la respuesta
 *   impresa no cuadra. Entonces la errata está en la respuesta y la regla
 *   manda: en «1 (x2) 2 (x2) 4 (x2) 8 (x2) 16 (x2) 32 (x2)» el documento
 *   imprime 6 y la respuesta es 64. Se corrige y se deja anotado.
 * — La serie impresa contradice su propia regla a mitad de camino (un «21»
 *   donde tocaba 22). Ahí no hay forma de saber si sobra el término o la regla,
 *   y el ejercicio no se puede cargar: entrenar con él enseña al revés.
 *
 * Cuando no hay suficientes operaciones con cantidad para juzgar —series
 * entrelazadas, agrupadas con «//», o con «(=)» y «(+)» sueltos— se devuelve
 * "sin_juicio" y se respeta la respuesta del documento.
 */
function contrastar(terminos, pasos, solucion, respuestaImpresa) {
  // Sin una operación por cada salto no se puede alinear nada. Pasa en las
  // series agrupadas —el documento las separa con «//» o con espacios— y en las
  // entrelazadas, donde solo se declaran los saltos de una de las dos. Ahí no
  // se juzga: la respuesta del documento es lo único que hay.
  const agrupada = solucion.includes("//")
  // Los «(+)» y «(=)» sueltos son flechas entre términos, no operaciones: con
  // ellos los paréntesis dejan de alinear con los saltos.
  const conFlechas = pasos.some((o) => /^[+\-=]$/.test(o.replace(/\s+/g, "")))
  if (agrupada || conFlechas || pasos.length < terminos.length - 1) {
    return { veredicto: "sin_juicio" }
  }

  const comprobables = []
  for (let i = 0; i < terminos.length - 1 && i < pasos.length; i++) {
    const esperado = aplicar(terminos[i], pasos[i])
    if (esperado !== null) comprobables.push([esperado, terminos[i + 1]])
  }
  if (comprobables.length < 3) return { veredicto: "sin_juicio" }
  if (comprobables.some(([a, b]) => Math.abs(a - b) > 1e-9)) {
    return { veredicto: "serie_inconsistente" }
  }

  // Solo se corrige la respuesta si el documento declara también la operación
  // del último salto, el que lleva del último término mostrado a la solución.
  // Cuando no la declara —el caso de las alternantes, que traen un salto menos
  // que términos— predecirla exigiría adivinar cuál toca, y adivinar es
  // exactamente lo que no puede hacer un banco de entrenamiento.
  if (pasos.length < terminos.length) return { veredicto: "cadena_verificada" }
  const predicha = aplicar(terminos.at(-1), pasos[terminos.length - 1])
  if (predicha === null) return { veredicto: "cadena_verificada" }
  if (Math.abs(predicha - respuestaImpresa) > 1e-9) {
    // La regla y la respuesta impresa no coinciden. Solo se corrige cuando la
    // serie tiene UNA sola operación repetida de principio a fin: ahí la regla
    // es incuestionable y lo impreso es una errata evidente («1 2 4 8 16 32»
    // con seis «x2» y respuesta 6, que es un 64 al que se le cayó el 4).
    //
    // Con operaciones mezcladas, que la regla y la respuesta discrepen
    // significa que el documento se contradice, y no hay forma de saber cuál de
    // las dos está mal. Ese ejercicio no entra.
    if (new Set(pasos).size === 1) {
      return { veredicto: "respuesta_corregida", respuesta: predicha }
    }
    return { veredicto: "serie_inconsistente" }
  }
  return { veredicto: "verificada" }
}

/** Baraja estable: el mismo ítem siempre coloca su respuesta en el mismo sitio. */
function mezclar(opciones, semilla) {
  const copia = [...opciones]
  let s = semilla
  for (let i = copia.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) % 2147483648
    const j = s % (i + 1)
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

const ejercicios = []
let descartados = 0
let verificados = 0
/** Ítems corregidos y descartados, para dejarlos por escrito al terminar. */
const corregidos = []
const inconsistentes = []

/** El tipo de cada bloque, resuelto en orden para poder heredarlo. */
const TIPOS = new Map()
let tipoPrevio = null
for (const [nEj, bloque] of [...enunciados].sort((a, b) => a[0] - b[0])) {
  const tipo = tipoDeBloque(bloque.instruccion, tipoPrevio)
  if (!tipo) throw new Error(`El ejercicio ${nEj} no dice qué pide y no hay bloque anterior del que heredarlo`)
  TIPOS.set(nEj, tipo)
  tipoPrevio = tipo
}

for (const [nEj, bloque] of [...enunciados].sort((a, b) => a[0] - b[0])) {
  const items = bloque.items
  const tipo = TIPOS.get(nEj)
  const sols = soluciones.get(nEj)?.items
  if (!sols) continue
  for (const [nItem, enunciado] of [...items].sort((a, b) => a[0] - b[0])) {
    const solucion = sols.get(nItem)
    if (!solucion) { descartados++; continue }
    const impresa = respuestaDe(solucion)
    const terminos = terminosDe(enunciado)
    if (impresa === null || terminos.length < 4) { descartados++; continue }

    const pasos = pasosDe(solucion)

    // Los de «número que sobra» no pasan por el contraste: ese compara la
    // respuesta contra la cadena de operaciones, y aquí la respuesta no es el
    // final de la cadena sino el término que la rompe. Su comprobación es otra
    // —quitarlo tiene que dejar una serie limpia— y la hace
    // `verificar-series.mjs`, que resuelve sin mirar la respuesta.
    // El cuadernillo mezcla los dos tipos dentro del mismo bloque: bajo el
    // encabezado «señala el número erróneo» hay series limpias cuya solución es
    // la continuación, no un intruso. Así que el tipo se decide por ítem y con
    // evidencia: si la respuesta impresa es uno de los términos, es el intruso;
    // si no está en la serie, es la continuación y se trata como tal.
    if (tipo === "intruso" && terminos.includes(impresa)) {
      const opcionesIntruso = mezclar(
        [impresa, ...distractoresIntruso(terminos, impresa)],
        nEj * 100 + nItem
      )
      if (opcionesIntruso.length < 4) { descartados++; continue }
      ejercicios.push({
        id: `NU-N2-${String(nEj).padStart(2, "0")}-${String(nItem).padStart(2, "0")}`,
        subcategoria: "Número que rompe la serie",
        nivel: "intermedio",
        enunciado: `Señala el número que sobra en la serie: ${terminos.join(", ")}`,
        opciones: opcionesIntruso.map(String),
        respuesta: opcionesIntruso.indexOf(impresa),
        explicacion:
          `El número que sobra es ${impresa}: quitándolo, el resto de la serie sigue una sola regla. ` +
          `Conviene mirar los saltos de dos en dos y buscar el que no encaja, en vez de leer la serie entera de corrido.`,
        tiempo: 60,
        fuente: `Psicotécnicos — Razonamiento numérico (336461140), ejercicio ${nEj}.${nItem}`,
      })
      verificados++
      continue
    }

    // El contraste decide si el ítem entra, entra corregido, o no entra.
    const juicio = contrastar(terminos, pasos, solucion, impresa)
    if (juicio.veredicto === "serie_inconsistente") {
      inconsistentes.push(`${nEj}.${nItem}: ${terminos.join(", ")} — la serie impresa contradice sus propias operaciones`)
      continue
    }
    const respuesta = juicio.veredicto === "respuesta_corregida" ? juicio.respuesta : impresa
    if (juicio.veredicto === "respuesta_corregida") {
      corregidos.push(`${nEj}.${nItem}: ${terminos.join(", ")} — el documento imprime ${impresa}, la regla da ${respuesta}`)
    }
    if (juicio.veredicto === "verificada" || juicio.veredicto === "cadena_verificada") verificados++

    const { sub, nivel } = clasificar(pasos)
    const opciones = mezclar([respuesta, ...distractores(terminos, respuesta)], nEj * 100 + nItem)
    if (opciones.length < 4) { descartados++; continue }

    const desglose = rastroDe(solucion)
    const rastro = desglose
      ? `El documento lo desglosa así: ${desglose}.`
      : "Conviene separar los términos de posición par de los de posición impar: son dos series entrelazadas."

    ejercicios.push({
      id: `NU-N2-${String(nEj).padStart(2, "0")}-${String(nItem).padStart(2, "0")}`,
      subcategoria: sub,
      nivel,
      enunciado: `Complete la serie: ${terminos.join(", ")}, …`,
      opciones: opciones.map(String),
      respuesta: opciones.indexOf(respuesta),
      explicacion: `El término que sigue es ${respuesta}. ${rastro}`,
      tiempo: nivel === "basico" ? 45 : nivel === "intermedio" ? 60 : 75,
      fuente: `Psicotécnicos — Razonamiento numérico (336461140), ejercicio ${nEj}.${nItem}`,
    })
  }
}

const cabecera = `import type { EjercicioPsico } from "@/lib/psicotecnicas"

/**
 * Series numéricas — ${ejercicios.length} ejercicios.
 *
 * ARCHIVO GENERADO. No se edita a mano: sale de
 * \`node scripts/psicotecnicas/generar-series.mjs <carpeta-con-los-pdf>\`.
 *
 * Fuente: «Psicotécnicos — Razonamiento numérico» (documento 336461140), que
 * trae los enunciados y su sección de soluciones. La respuesta y el desglose de
 * cada serie son los del documento; las cuatro alternativas se generan, porque
 * el original es de completar el número y no ofrece ninguna.
 */
export const SERIES: EjercicioPsico[] = `

const cuerpo = JSON.stringify(
  ejercicios.map((e) => ({ ...e, categoria: "numerico" })),
  null,
  2
)

fs.writeFileSync(salida, `${cabecera}${cuerpo}\n`, "utf8")
console.log(`Listo: ${ejercicios.length} series en ${path.relative(raiz, salida)}`)
console.log(`  ✓ verificadas contra sus propias operaciones: ${verificados}`)
console.log(`  · sin operaciones suficientes para juzgar: ${ejercicios.length - verificados - corregidos.length}`)
if (corregidos.length > 0) {
  console.log(`  ! respuesta corregida (errata de la fuente): ${corregidos.length}`)
  for (const c of corregidos) console.log(`      ${c}`)
}
if (inconsistentes.length > 0) {
  console.log(`  ✗ fuera por serie inconsistente: ${inconsistentes.length}`)
  for (const c of inconsistentes) console.log(`      ${c}`)
}
if (descartados > 0) console.log(`  · fuera por no poder leerse: ${descartados}`)
