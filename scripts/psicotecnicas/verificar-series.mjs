/**
 * Resuelve las 162 series numéricas por cuenta propia y compara.
 *
 * Por qué hace falta otro verificador. El que ya había, `verificar-respuestas`,
 * no resuelve nada: lee del PDF las operaciones que el propio documento declara
 * para cada serie y comprueba que cuadren con la respuesta impresa. Eso pilla
 * una errata de transcripción, pero no pilla que el documento esté equivocado,
 * y deja 65 series fuera de comprobación porque el original declara menos
 * operaciones que saltos.
 *
 * Este empieza de cero. Coge los números del enunciado, **sin mirar la
 * respuesta del banco**, busca la regla entre una familia cerrada, predice el
 * término siguiente y solo entonces compara. Si el documento estuviera mal, la
 * discrepancia sale aquí.
 *
 * Tres resultados posibles, y los tres se cuentan por separado:
 *
 * — **Coincide**: la regla deducida da lo mismo que dice el banco. Es la única
 *   que cuenta como verificada.
 * — **Discrepa**: la regla da otra cosa. No se corrige nada desde aquí: se
 *   señala para mirarla contra la fuente.
 * — **Ambigua o sin regla**: dos reglas que se sostienen y no coinciden, o
 *   ninguna que explique la serie. Tampoco se corrige; se declara.
 *
 * Cero comprobaciones no es un aprobado: si no se resolvió ninguna, sale con
 * error.
 *
 *   node scripts/psicotecnicas/verificar-series.mjs
 */

import path from "node:path"
import { fileURLToPath } from "node:url"
import { createServer } from "vite"

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")

const rojo = (s) => `\x1b[31m${s}\x1b[0m`
const verde = (s) => `\x1b[32m${s}\x1b[0m`
const ambar = (s) => `\x1b[33m${s}\x1b[0m`
const tenue = (s) => `\x1b[2m${s}\x1b[0m`

// ────────────────────────────────────────────────────────────────────────────
// La familia de reglas
//
// Cerrada a propósito, y con la misma disciplina que el solucionador de
// figuras: una regla necesita al menos dos saltos que la confirmen. Con un
// solo salto cualquier cosa «encaja», y eso no es resolver, es adivinar.

const APOYOS_MINIMOS = 2
/** Los números del cuadernillo son enteros o decimales cortos. */
const iguales = (a, b) => Math.abs(a - b) < 1e-9

/** Diferencia constante: 3, 7, 11, 15 … */
function aritmetica(n) {
  if (n.length < APOYOS_MINIMOS + 1) return null
  const d = n[1] - n[0]
  for (let i = 1; i < n.length - 1; i++) if (!iguales(n[i + 1] - n[i], d)) return null
  return { nombre: `suma ${d} cada vez`, siguiente: n.at(-1) + d }
}

/** Razón constante: 3, 6, 12, 24 … */
function geometrica(n) {
  if (n.length < APOYOS_MINIMOS + 1 || n.some((x) => x === 0)) return null
  const r = n[1] / n[0]
  for (let i = 1; i < n.length - 1; i++) if (!iguales(n[i + 1] / n[i], r)) return null
  return { nombre: `multiplica por ${r} cada vez`, siguiente: n.at(-1) * r }
}

/** Las diferencias crecen de forma constante: 1, 2, 4, 7, 11 … */
function segundoOrden(n) {
  if (n.length < APOYOS_MINIMOS + 2) return null
  const d = n.slice(1).map((x, i) => x - n[i])
  const dd = d[1] - d[0]
  for (let i = 1; i < d.length - 1; i++) if (!iguales(d[i + 1] - d[i], dd)) return null
  return {
    nombre: `las diferencias suben de ${dd} en ${dd}`,
    siguiente: n.at(-1) + d.at(-1) + dd,
  }
}

/** Las diferencias se repiten en ciclo: +2, +5, +2, +5 … */
function cicloDeDiferencias(n, periodo) {
  const d = n.slice(1).map((x, i) => x - n[i])
  if (d.length < periodo + APOYOS_MINIMOS) return null
  for (let i = periodo; i < d.length; i++) if (!iguales(d[i], d[i - periodo])) return null
  return {
    nombre: `diferencias que se repiten cada ${periodo}: ${d.slice(0, periodo).join(", ")}`,
    siguiente: n.at(-1) + d[d.length % periodo],
  }
}

/**
 * Operaciones que se alternan: ×2, +3, ×2, +3 …
 *
 * Cada salto repite el de `periodo` posiciones antes, sea suma o producto. Es
 * la familia que el cuadernillo llama «progresión variable».
 */
function cicloDeOperaciones(n, periodo) {
  if (n.length < periodo + APOYOS_MINIMOS + 1) return null
  const salto = (i) => ({ suma: n[i + 1] - n[i], razon: n[i] === 0 ? null : n[i + 1] / n[i] })
  const pasos = n.slice(0, -1).map((_, i) => salto(i))

  const tipos = []
  for (let i = 0; i < periodo; i++) {
    let porSuma = true
    let porRazon = true
    for (let j = i; j < pasos.length; j += periodo) {
      if (!iguales(pasos[j].suma, pasos[i].suma)) porSuma = false
      if (pasos[j].razon === null || pasos[i].razon === null || !iguales(pasos[j].razon, pasos[i].razon))
        porRazon = false
    }
    if (!porSuma && !porRazon) return null
    tipos.push(porSuma ? { op: "+", v: pasos[i].suma } : { op: "×", v: pasos[i].razon })
  }

  const toca = tipos[pasos.length % periodo]
  return {
    nombre: `ciclo de ${periodo}: ${tipos.map((t) => `${t.op}${t.v}`).join(", ")}`,
    siguiente: toca.op === "+" ? n.at(-1) + toca.v : n.at(-1) * toca.v,
  }
}

/**
 * Dos o tres series metidas una dentro de otra.
 *
 * Se parten por posición y cada trozo se resuelve por su cuenta. El que
 * predice es el que le toca al término que falta.
 */
function entrelazadas(n, hilos) {
  if (n.length < hilos * (APOYOS_MINIMOS + 1)) return null
  const trozos = Array.from({ length: hilos }, (_, h) => n.filter((_, i) => i % hilos === h))
  const reglas = trozos.map((t) => aritmetica(t) ?? geometrica(t))
  if (reglas.some((r) => r === null)) return null
  const cual = n.length % hilos
  return {
    nombre: `${hilos} series entrelazadas (${reglas.map((r) => r.nombre).join(" / ")})`,
    siguiente: reglas[cual].siguiente,
  }
}

/** Cada término sale del anterior por «por k más c»: 3, 7, 15, 31 … */
function afin(n) {
  if (n.length < APOYOS_MINIMOS + 2) return null
  // Con dos pares de términos se despeja k y c; el resto tiene que cumplirlo.
  const denominador = n[1] - n[0]
  if (denominador === 0) return null
  const k = (n[2] - n[1]) / denominador
  if (!Number.isFinite(k) || iguales(k, 1)) return null // k=1 ya lo cubre la aritmética
  const c = n[1] - k * n[0]
  for (let i = 0; i < n.length - 1; i++) if (!iguales(n[i + 1], k * n[i] + c)) return null
  return {
    nombre: `por ${k}${c >= 0 ? " más " : " menos "}${Math.abs(c)} cada vez`,
    siguiente: k * n.at(-1) + c,
  }
}

/**
 * Las diferencias siguen su propio ciclo de operaciones: 7, 11, 17, 29, 43 …
 *
 * Los saltos son 4, 6, 12, 14 —más 2, por 2, más 2— así que la regla no está en
 * la serie sino un piso más abajo. El cuadernillo tiene unas cuantas así.
 */
function cicloSobreDiferencias(n, periodo) {
  if (n.length < periodo + APOYOS_MINIMOS + 2) return null
  const d = n.slice(1).map((x, i) => x - n[i])
  const regla = cicloDeOperaciones(d, periodo) ?? aritmetica(d) ?? geometrica(d)
  if (!regla) return null
  return {
    nombre: `las diferencias siguen su propia regla (${regla.nombre})`,
    siguiente: n.at(-1) + regla.siguiente,
  }
}

/**
 * Tríos donde el tercero sale de los dos primeros: 3, 3, 9 // 4, 4, 16 …
 *
 * Se comprueba con producto y con suma, que son los dos que usa el documento.
 */
function trios(n) {
  if (n.length < 6) return null
  const completos = Math.floor(n.length / 3)
  for (const [nombre, op] of [["el producto", (a, b) => a * b], ["la suma", (a, b) => a + b]]) {
    let cuadran = 0
    let falla = false
    for (let t = 0; t < completos; t++) {
      const [a, b, c] = n.slice(t * 3, t * 3 + 3)
      if (iguales(c, op(a, b))) cuadran++
      else falla = true
    }
    if (falla || cuadran < APOYOS_MINIMOS) continue
    // Solo predice cuando lo que falta es el cierre del trío.
    if (n.length % 3 !== 2) continue
    return {
      nombre: `en cada trío, el tercero es ${nombre} de los dos primeros`,
      siguiente: op(n.at(-2), n.at(-1)),
    }
  }
  return null
}

/** Cada término es la suma de los dos anteriores: 1, 1, 2, 3, 5, 8 … */
function sumaDeAnteriores(n, cuantos) {
  if (n.length < cuantos + APOYOS_MINIMOS) return null
  for (let i = cuantos; i < n.length; i++) {
    const suma = n.slice(i - cuantos, i).reduce((a, b) => a + b, 0)
    if (!iguales(n[i], suma)) return null
  }
  return {
    nombre: `cada término es la suma de los ${cuantos} anteriores`,
    siguiente: n.slice(-cuantos).reduce((a, b) => a + b, 0),
  }
}

/**
 * Todas las reglas que se sostienen sobre esta serie.
 *
 * Van por orden de sencillez, y ese orden decide. En «1, 3, 9, 27, 81, 243»
 * encaja el «×3 siempre» y encaja también un ciclo de tres operaciones que da
 * otro resultado; el ciclo no es una lectura alternativa, es la misma serie
 * mirada con más piezas de las que hacen falta. Cuando una regla más simple
 * explica la serie entera, las más complicadas no cuentan.
 */
function reglasQueExplican(n) {
  const porNivel = [
    [aritmetica(n), geometrica(n), sumaDeAnteriores(n, 2)],
    [
      afin(n),
      segundoOrden(n),
      cicloDeDiferencias(n, 2),
      cicloDeOperaciones(n, 2),
      entrelazadas(n, 2),
      trios(n),
    ],
    [
      cicloDeDiferencias(n, 3),
      cicloDeDiferencias(n, 4),
      cicloDeOperaciones(n, 3),
      cicloSobreDiferencias(n, 2),
      entrelazadas(n, 3),
      sumaDeAnteriores(n, 3),
    ],
  ]
  const candidatas = porNivel.map((nivel) => nivel.filter(Boolean)).find((nivel) => nivel.length > 0) ?? []

  // Reglas distintas que predicen lo mismo no son un empate: son la misma
  // respuesta vista de dos maneras.
  const porPrediccion = new Map()
  for (const r of candidatas) {
    const clave = r.siguiente.toFixed(6)
    if (!porPrediccion.has(clave)) porPrediccion.set(clave, { valor: r.siguiente, reglas: [] })
    porPrediccion.get(clave).reglas.push(r.nombre)
  }
  return [...porPrediccion.values()]
}

/**
 * Cuál es el número que sobra, deducido.
 *
 * Se prueba a quitar cada término: el que sobra es aquel cuya ausencia deja una
 * serie que una sola regla explica entera. Si al quitar dos términos distintos
 * la serie queda limpia las dos veces, el ejercicio es ambiguo y se dice.
 */
function intrusoDeducido(n) {
  const culpables = []
  for (let i = 0; i < n.length; i++) {
    const resto = n.filter((_, j) => j !== i)
    if (resto.length < 4) continue
    const reglas = reglasQueExplican(resto)
    if (reglas.length === 1) culpables.push({ termino: n[i], regla: reglas[0].reglas[0] })
  }
  // Un mismo valor puede aparecer dos veces en la serie; eso no es empate.
  const valores = new Set(culpables.map((c) => c.termino))
  if (valores.size !== 1) return { estado: valores.size === 0 ? "sin-regla" : "ambiguo", culpables }
  return { estado: "resuelto", ...culpables[0] }
}

// ────────────────────────────────────────────────────────────────────────────

/** Los números del enunciado, sin mirar nada más. */
function numerosDe(enunciado) {
  const cuerpo = enunciado.replace(/^.*?:\s*/, "").replace(/[…\.]+\s*$/, "")
  return cuerpo
    .split(/[,;]/)
    .map((t) => t.trim().replace(/\s/g, "").replace(",", "."))
    .filter((t) => t.length > 0 && /^-?\d+(\.\d+)?$/.test(t))
    .map(Number)
}

const servidor = await createServer({
  root: RAIZ,
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "silent",
})
let SERIES
try {
  ;({ SERIES } = await servidor.ssrLoadModule("/src/data/psicotecnicas/series.ts"))
} finally {
  await servidor.close()
}

const coinciden = []
const discrepan = []
const ambiguas = []
const sinRegla = []

for (const e of SERIES) {
  const n = numerosDe(e.enunciado)
  const delBanco = Number(e.opciones[e.respuesta].replace(/\s/g, "").replace(",", "."))

  if (n.length < 4) {
    sinRegla.push({ id: e.id, motivo: `solo se leyeron ${n.length} términos del enunciado` })
    continue
  }

  // Los de «número que sobra» se comprueban al revés: quitando el candidato.
  if (/sobra en la serie/.test(e.enunciado)) {
    const veredicto = intrusoDeducido(n)
    if (veredicto.estado === "resuelto") {
      if (iguales(veredicto.termino, delBanco))
        coinciden.push({ id: e.id, valor: veredicto.termino, regla: `quitando ${veredicto.termino}: ${veredicto.regla}` })
      else
        discrepan.push({ id: e.id, deducido: veredicto.termino, delBanco, regla: veredicto.regla, serie: n })
    } else if (veredicto.estado === "ambiguo") {
      ambiguas.push({
        id: e.id,
        motivo: `quitando ${veredicto.culpables.map((c) => c.termino).join(" o ")} la serie queda limpia`,
        delBanco,
      })
    } else {
      sinRegla.push({ id: e.id, motivo: "quitando cualquier término la serie sigue sin tener una regla clara" })
    }
    continue
  }

  const opciones = reglasQueExplican(n)
  if (opciones.length === 0) {
    sinRegla.push({ id: e.id, motivo: "ninguna regla de la familia explica la serie" })
    continue
  }
  if (opciones.length > 1) {
    ambiguas.push({
      id: e.id,
      motivo: `dos reglas la explican y predicen distinto: ${opciones
        .map((o) => `${o.valor} (${o.reglas[0]})`)
        .join(" / ")}`,
      delBanco,
    })
    continue
  }

  const { valor, reglas } = opciones[0]
  if (iguales(valor, delBanco)) coinciden.push({ id: e.id, valor, regla: reglas[0] })
  else discrepan.push({ id: e.id, deducido: valor, delBanco, regla: reglas[0], serie: n })
}

// ────────────────────────────────────────────────────────────────────────────
// El parte

console.log()
console.log(`Series del banco: ${SERIES.length}`)
console.log(`  ${verde("✓")} resueltas por cuenta propia y coinciden: ${coinciden.length}`)
console.log(`  ${rojo("✗")} discrepan: ${discrepan.length}`)
console.log(`  ${ambar("·")} ambiguas (dos reglas que no coinciden): ${ambiguas.length}`)
console.log(`  ${ambar("·")} sin regla en la familia: ${sinRegla.length}`)

if (discrepan.length > 0) {
  console.log()
  console.log(rojo("Discrepancias — hay que mirarlas contra la fuente, no corregirlas aquí:"))
  for (const d of discrepan) {
    console.log(`  ${rojo("✗")} ${d.id}`)
    console.log(`     serie:     ${d.serie.join(", ")}`)
    console.log(`     el banco:  ${d.delBanco}`)
    console.log(`     deducido:  ${d.deducido}   ${tenue(`(${d.regla})`)}`)
  }
}

if (ambiguas.length > 0) {
  console.log()
  console.log(ambar("Ambiguas:"))
  for (const a of ambiguas) console.log(`  ${ambar("·")} ${a.id}: ${a.motivo} — el banco dice ${a.delBanco}`)
}

if (sinRegla.length > 0) {
  console.log()
  console.log(ambar(`Sin regla en la familia (${sinRegla.length}):`))
  for (const s of sinRegla.slice(0, 25)) console.log(`  ${ambar("·")} ${s.id}: ${s.motivo}`)
  if (sinRegla.length > 25) console.log(tenue(`  … y ${sinRegla.length - 25} más`))
}

console.log()
if (coinciden.length === 0) {
  console.log(rojo("No se resolvió ninguna serie. Eso no es un aprobado."))
  process.exit(1)
}
if (discrepan.length > 0) process.exit(1)
console.log(
  verde(
    `Las ${coinciden.length} series que la familia sabe resolver coinciden con la respuesta del banco.`
  )
)
