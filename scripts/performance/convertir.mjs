/**
 * Convierte docs/contenido/performance.md en src/lib/performanceLeccion.ts.
 *
 * El documento es la fuente: se edita allí y se vuelve a correr esto. Igual
 * que el de Aerodinámica, pero con la plantilla propia de este módulo:
 *
 *   # NIVEL n · …                    abre un nivel
 *   ## TEMA n · …                    abre una lección
 *   **¿QUÉ ES?**                     párrafo de entrada
 *   **LO QUE DEBE SABER UN PILOTO**  el desarrollo: párrafos, tablas, listas
 *   **APLICACIÓN EN AEROLÍNEA**      bloque enLaOperacion
 *   **EJEMPLO**                      callout con su rótulo
 *   **EN POCAS PALABRAS**            subtítulo más viñetas de cierre
 *   **[ESPACIO PARA IMAGEN]** · `PERF-nn`   hueco rotulado, con lo que pide
 *   ### `esc-nn` · …                 escenario, como piensaComoPiloto
 *   **`ej-nn`** … / **Respuesta: …** ejercicio: enunciado visible, respuesta detrás
 *
 * La definición inicial abre la lección 1; el cierre y los errores de
 * entrevista se enganchan al final de la última. Los anexos no se convierten:
 * son para quien mantiene el módulo, no para el alumno.
 *
 * Uso: node scripts/performance/convertir.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const FUENTE = path.join(RAIZ, "docs/contenido/performance.md")
const DESTINO = path.join(RAIZ, "src/lib/performanceLeccion.ts")

/** Lo que el documento promete en su ficha. Si no cuadra, el script para. */
const ESPERADO = { temas: 40, niveles: 7, imagenes: 20, escenarios: 10, ejercicios: 18 }

/** Medida de las figuras del módulo, la misma del resto de los cursos. */
const FIGURA = { medida: "Figura · 16:9 · 1600×900", ratio: "16 / 9", alto: 260 }

const bruto = fs.readFileSync(FUENTE, "utf8").replace(/\r\n/g, "\n")
const lineas = bruto.split("\n")

// ─── Utilidades de lectura ──────────────────────────────────────────────────

/** Los tramos de primer nivel: `# TÍTULO` y lo que va debajo. */
function tramos() {
  const salida = []
  let actual = null
  for (const l of lineas) {
    const m = l.match(/^# (.+)$/)
    if (m) {
      actual = { titulo: m[1].trim(), cuerpo: [] }
      salida.push(actual)
    } else if (actual) {
      actual.cuerpo.push(l)
    }
  }
  return salida
}

/**
 * Las marcas que cierran un párrafo: incluye las continuaciones (la imagen
 * sugerida, el objetivo, la respuesta de un ejercicio) para que el párrafo
 * anterior no se las trague.
 */
const MARCAS = /^\*\*(¿QUÉ ES\?|LO QUE DEBE SABER UN PILOTO|APLICACIÓN EN AEROLÍNEA|EJEMPLO|EN POCAS PALABRAS|\[ESPACIO PARA IMAGEN\]|IMAGEN SUGERIDA:|OBJETIVO:|Respuesta:|`ej-)/

/**
 * Solo los cinco rótulos de la plantilla. Son los que parten el tema en
 * apartados; una imagen o un ejercicio son bloques dentro de un apartado y su
 * unidad no se puede cortar, así que no entran aquí.
 */
const SECCIONES = /^\*\*(¿QUÉ ES\?|LO QUE DEBE SABER UN PILOTO|APLICACIÓN EN AEROLÍNEA|EJEMPLO|EN POCAS PALABRAS)\*\*$/

/** Párrafo: líneas seguidas hasta un vacío o el principio de otro bloque. */
function finDeParrafo(cuerpo, i) {
  let j = i
  while (
    j < cuerpo.length &&
    cuerpo[j].trim() !== "" &&
    !/^#{2,4} /.test(cuerpo[j]) &&
    !/^[->] /.test(cuerpo[j]) &&
    !cuerpo[j].startsWith("|") &&
    !cuerpo[j].startsWith("```") &&
    !cuerpo[j].startsWith("---") &&
    !/^\d+\. /.test(cuerpo[j]) &&
    // Una marca corta el párrafo que viene ANTES, no el que empieza en ella:
    // la pregunta de un escenario va sola, en negrita, y no es parte de la
    // situación que la precede, pero la respuesta de un ejercicio arranca
    // justo en `**Respuesta:`. Sin el `j > i` el párrafo se cierra en su
    // propia primera línea y el bloque sale vacío, que es como los dieciocho
    // ejercicios llegaron a la app con el botón puesto y nada detrás.
    (j === i || (!/^\*\*¿.+\?\*\*$/.test(cuerpo[j]) && !MARCAS.test(cuerpo[j])))
  ) {
    j++
  }
  return j
}

function leerParrafo(cuerpo, i) {
  const fin = finDeParrafo(cuerpo, i)
  return { texto: cuerpo.slice(i, fin).join(" ").trim(), siguiente: fin }
}

function leerTabla(cuerpo, i) {
  const fila = (l) =>
    l
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim())
  const head = fila(cuerpo[i])
  let j = i + 2 // la línea de guiones
  const rows = []
  while (j < cuerpo.length && cuerpo[j].trim().startsWith("|")) {
    rows.push(fila(cuerpo[j]))
    j++
  }
  return { bloque: { kind: "table", head, rows }, siguiente: j }
}

function leerLista(cuerpo, i, ordenada) {
  const marca = ordenada ? /^\d+\. / : /^- /
  const items = []
  let j = i
  while (j < cuerpo.length && marca.test(cuerpo[j])) {
    items.push(cuerpo[j].replace(marca, "").trim())
    j++
  }
  return { items, siguiente: j }
}

function leerCerca(cuerpo, i) {
  let j = i + 1
  const dentro = []
  while (j < cuerpo.length && !cuerpo[j].startsWith("```")) {
    dentro.push(cuerpo[j])
    j++
  }
  return { texto: dentro.join("\n"), siguiente: j + 1 }
}

/** Una cita `> …`, que en el documento siempre es un aparte que conviene retener. */
function leerCita(cuerpo, i) {
  const partes = []
  let j = i
  while (j < cuerpo.length && cuerpo[j].startsWith("> ")) {
    partes.push(cuerpo[j].replace(/^> /, "").trim())
    j++
  }
  return { texto: partes.join(" ").trim(), siguiente: j }
}

// ─── Bloques genéricos ──────────────────────────────────────────────────────

/**
 * Convierte un tramo de líneas en bloques, sin conocer la plantilla del tema.
 * Lo usan el cuerpo de cada tema y también los apartados especiales.
 */
function bloquesDe(cuerpo, ctx = {}) {
  const bloques = []
  let i = 0
  while (i < cuerpo.length) {
    const l = cuerpo[i]

    if (l.trim() === "" || l.startsWith("---")) {
      i++
      continue
    }

    // Hueco de imagen: tres líneas que van juntas siempre.
    const hueco = l.match(/^\*\*\[ESPACIO PARA IMAGEN\]\*\* · `(PERF-\d\d)`$/)
    if (hueco) {
      const sugerida = cuerpo[i + 1]?.match(/^\*\*IMAGEN SUGERIDA:\*\* (.+)$/)
      const objetivo = cuerpo[i + 2]?.match(/^\*\*OBJETIVO:\*\* (.+)$/)
      if (!sugerida || !objetivo) throw new Error(`${hueco[1]}: falta la imagen sugerida o el objetivo`)
      bloques.push({
        kind: "hueco",
        rotulo: `${hueco[1]} · ${FIGURA.medida}`,
        descripcion: sugerida[1].trim(),
        pie: objetivo[1].trim(),
        alto: FIGURA.alto,
        ratio: FIGURA.ratio,
      })
      ctx.imagenes?.push(hueco[1])
      i += 3
      continue
    }

    // Escenario operacional: título, situación, pregunta y respuesta.
    const esc = l.match(/^### `(esc-\d\d)` · (.+)$/)
    if (esc) {
      const situacion = leerParrafo(cuerpo, i + 1)
      const preg = cuerpo[situacion.siguiente]?.match(/^\*\*(¿.+\?)\*\*$/)
      if (!preg) throw new Error(`${esc[1]}: no encuentro la pregunta`)
      const respuesta = leerParrafo(cuerpo, situacion.siguiente + 1)
      bloques.push({
        kind: "piensaComoPiloto",
        momento: esc[2].trim(),
        situacion: situacion.texto,
        pregunta: preg[1].trim(),
        respuesta: respuesta.texto,
        claves: [],
        // La clave hace que pedir la respuesta cuente en el progreso: la
        // práctica de este módulo vive dentro de la lección.
        clave: esc[1],
      })
      ctx.escenarios?.push(esc[1])
      i = respuesta.siguiente
      continue
    }

    // Ejercicio resuelto: enunciado a la vista, respuesta detrás de un botón.
    const ej = l.match(/^\*\*`(ej-\d\d)`\*\* (.+)$/)
    if (ej) {
      let enunciado = ej[2].trim()
      let j = i + 1
      while (j < cuerpo.length && cuerpo[j].trim() !== "" && !/^\*\*Respuesta:/.test(cuerpo[j])) {
        enunciado += ` ${cuerpo[j].trim()}`
        j++
      }
      if (!/^\*\*Respuesta:/.test(cuerpo[j] ?? "")) throw new Error(`${ej[1]}: no encuentro la respuesta`)
      const respuesta = leerParrafo(cuerpo, j)
      bloques.push({ kind: "p", text: `**${ej[1].toUpperCase()}** · ${enunciado}` })
      bloques.push({
        kind: "detalleTecnico",
        etiqueta: "Ver la respuesta",
        clave: ej[1],
        bloques: [{ kind: "p", text: respuesta.texto.replace(/^\*\*Respuesta: /, "**") }],
      })
      ctx.ejercicios?.push(ej[1])
      i = respuesta.siguiente
      continue
    }

    const sub = l.match(/^### (.+)$/)
    if (sub) {
      bloques.push({ kind: "sub", text: sub[1].trim() })
      i++
      continue
    }

    if (l.startsWith("|")) {
      const t = leerTabla(cuerpo, i)
      bloques.push(t.bloque)
      i = t.siguiente
      continue
    }

    if (l.startsWith("> ")) {
      const c = leerCita(cuerpo, i)
      bloques.push({ kind: "callout", tone: "tip", text: c.texto })
      i = c.siguiente
      continue
    }

    if (l.startsWith("```")) {
      const c = leerCerca(cuerpo, i)
      bloques.push({ kind: "code", text: c.texto, tabular: true })
      i = c.siguiente
      continue
    }

    if (/^- /.test(l)) {
      const lista = leerLista(cuerpo, i, false)
      bloques.push({ kind: "vinetas", items: lista.items })
      i = lista.siguiente
      continue
    }

    if (/^\d+\. /.test(l)) {
      const lista = leerLista(cuerpo, i, true)
      bloques.push({ kind: "list", items: lista.items, ordered: true })
      i = lista.siguiente
      continue
    }

    // Las marcas de plantilla se tratan fuera; aquí solo párrafos.
    if (MARCAS.test(l)) {
      i++
      continue
    }

    const p = leerParrafo(cuerpo, i)
    if (p.texto) bloques.push({ kind: "p", text: p.texto })
    i = p.siguiente === i ? i + 1 : p.siguiente
  }
  return bloques
}

/** El cuerpo de un tema, respetando su plantilla. */
function bloquesDeTema(cuerpo, ctx) {
  const bloques = []
  let i = 0
  while (i < cuerpo.length) {
    const l = cuerpo[i]

    if (l.trim() === "" || l.startsWith("---")) {
      i++
      continue
    }

    if (/^\*\*¿QUÉ ES\?\*\*$/.test(l) || /^\*\*LO QUE DEBE SABER UN PILOTO\*\*$/.test(l)) {
      i++
      continue
    }

    if (/^\*\*APLICACIÓN EN AEROLÍNEA\*\*$/.test(l)) {
      const p = leerParrafo(cuerpo, i + 1)
      const pasos = []
      let j = p.siguiente
      while (j < cuerpo.length && cuerpo[j].trim() === "") j++
      if (j < cuerpo.length && /^\d+\. /.test(cuerpo[j])) {
        const lista = leerLista(cuerpo, j, true)
        pasos.push(...lista.items)
        j = lista.siguiente
      }
      bloques.push({
        kind: "enLaOperacion",
        momento: "En la operación",
        texto: p.texto,
        ...(pasos.length ? { pasos } : {}),
      })
      i = j
      continue
    }

    if (/^\*\*EJEMPLO\*\*$/.test(l)) {
      const p = leerParrafo(cuerpo, i + 1)
      bloques.push({ kind: "callout", tone: "info", title: "Ejemplo", text: p.texto })
      i = p.siguiente
      continue
    }

    if (/^\*\*EN POCAS PALABRAS\*\*$/.test(l)) {
      let j = i + 1
      while (j < cuerpo.length && cuerpo[j].trim() === "") j++
      const lista = leerLista(cuerpo, j, false)
      if (!lista.items.length) throw new Error("«En pocas palabras» sin viñetas")
      bloques.push({ kind: "sub", text: "En pocas palabras" })
      bloques.push({ kind: "vinetas", items: lista.items })
      i = lista.siguiente
      continue
    }

    // Todo lo demás lo resuelve el lector genérico. El tramo llega hasta el
    // siguiente rótulo de la plantilla, nunca hasta una continuación.
    const fin = (() => {
      let j = i + 1
      while (j < cuerpo.length && !SECCIONES.test(cuerpo[j])) j++
      return j
    })()
    bloques.push(...bloquesDe(cuerpo.slice(i, fin), ctx))
    i = fin
  }
  return bloques
}

// ─── Lectura del documento ──────────────────────────────────────────────────

const partes = tramos()
const ctx = { imagenes: [], escenarios: [], ejercicios: [] }

const niveles = []
const temas = []

for (const parte of partes) {
  const nivel = parte.titulo.match(/^NIVEL (\d+) · (.+)$/)
  if (!nivel) continue
  const nombre = cajaNormal(nivel[2].trim())
  const titulo = `Nivel ${nivel[1]} · ${nombre}`
  let primero = null

  // Partir el nivel en sus temas.
  const indices = []
  parte.cuerpo.forEach((l, k) => {
    if (/^## TEMA \d+ · /.test(l)) indices.push(k)
  })
  indices.forEach((desde, k) => {
    const hasta = indices[k + 1] ?? parte.cuerpo.length
    const cab = parte.cuerpo[desde].match(/^## TEMA (\d+) · (.+)$/)
    const n = Number(cab[1])
    if (primero === null) primero = n
    temas.push({
      n,
      title: cajaNormal(cab[2].trim()),
      kicker: nombre,
      cuerpo: parte.cuerpo.slice(desde + 1, hasta),
    })
  })
  niveles.push({ titulo, desde: primero })
}

/** Los títulos van en versales en el documento; en la app, en caja normal. */
function cajaNormal(bruto) {
  if (bruto !== bruto.toUpperCase()) return bruto
  const bajo = bruto.toLowerCase()
  return bajo.charAt(0).toUpperCase() + bajo.slice(1)
}

temas.sort((a, b) => a.n - b.n)

const lecciones = temas.map((t) => {
  const blocks = bloquesDeTema(t.cuerpo, ctx)
  return { n: t.n, title: t.title, kicker: t.kicker, blocks }
})

// La definición inicial abre la primera lección.
const definicion = partes.find((p) => /^DEFINICIÓN INICIAL/.test(p.titulo))
if (!definicion) throw new Error("no encuentro la definición inicial")
lecciones[0].blocks = [...bloquesDeTema(definicion.cuerpo, ctx), ...lecciones[0].blocks]

// El cierre y los errores de entrevista se enganchan al final de la última.
const cierre = partes.find((p) => /^CIERRE/.test(p.titulo))
const errores = partes.find((p) => /^ERRORES FRECUENTES/.test(p.titulo))
if (!cierre || !errores) throw new Error("falta el cierre o los errores de entrevista")
const ultima = lecciones[lecciones.length - 1]
ultima.blocks.push({ kind: "sub", text: "Lo que debes recordar de todo el módulo" })
ultima.blocks.push(...bloquesDe(cierre.cuerpo, ctx))
ultima.blocks.push({ kind: "sub", text: "Errores frecuentes en entrevistas" })
ultima.blocks.push(...bloquesDe(errores.cuerpo, ctx))

/** Minutos de lectura, redondeados y acotados como en el resto de los módulos. */
function minutos(blocks) {
  let palabras = 0
  const anda = (v) => {
    if (typeof v === "string") palabras += v.split(/\s+/).filter(Boolean).length
    else if (Array.isArray(v)) v.forEach(anda)
    else if (v && typeof v === "object") {
      for (const [k, x] of Object.entries(v)) if (k !== "kind" && k !== "rotulo" && k !== "ratio") anda(x)
    }
  }
  anda(blocks)
  return Math.min(10, Math.max(3, Math.round(palabras / 190)))
}

for (const l of lecciones) l.minutes = minutos(l.blocks)

// ─── Comprobaciones ─────────────────────────────────────────────────────────

const fallos = []
const comprobar = (cond, mensaje) => {
  if (!cond) fallos.push(mensaje)
}

comprobar(lecciones.length === ESPERADO.temas, `temas: ${lecciones.length}, esperaba ${ESPERADO.temas}`)
comprobar(niveles.length === ESPERADO.niveles, `niveles: ${niveles.length}, esperaba ${ESPERADO.niveles}`)
comprobar(ctx.imagenes.length === ESPERADO.imagenes, `imágenes: ${ctx.imagenes.length}, esperaba ${ESPERADO.imagenes}`)
comprobar(ctx.escenarios.length === ESPERADO.escenarios, `escenarios: ${ctx.escenarios.length}, esperaba ${ESPERADO.escenarios}`)
comprobar(ctx.ejercicios.length === ESPERADO.ejercicios, `ejercicios: ${ctx.ejercicios.length}, esperaba ${ESPERADO.ejercicios}`)
comprobar(new Set(ctx.imagenes).size === ctx.imagenes.length, "hay códigos de imagen repetidos")
lecciones.forEach((l, k) => {
  comprobar(l.n === k + 1, `la lección en la posición ${k + 1} dice ser la ${l.n}`)
  comprobar(l.blocks.length > 2, `la lección ${l.n} tiene ${l.blocks.length} bloques`)
  comprobar(Boolean(l.title), `la lección ${l.n} no tiene título`)
})

if (fallos.length) {
  console.error("No se escribió nada:")
  for (const f of fallos) console.error(`  · ${f}`)
  process.exit(1)
}

// ─── Escritura ──────────────────────────────────────────────────────────────

const j = (v) => JSON.stringify(v, null, 2)

fs.writeFileSync(
  DESTINO,
  `// GENERADO por scripts/performance/convertir.mjs desde
// docs/contenido/performance.md. No se edita a mano: se edita el documento y
// se vuelve a correr el script.

/**
 * Los cuarenta temas de Performance, en el formato del lector de lecciones.
 *
 * El contenido es de Camilo (docs/contenido/performance.md, versión 1.0 del
 * 24 de septiembre de 2026), con sus fuentes en el Anexo B del documento.
 *
 * Las veinte figuras entran como huecos rotulados: el módulo se lee completo
 * desde hoy y cada hueco dice qué imagen falta y qué tiene que enseñar.
 */

import type { DocScreen } from "@/lib/docBlocks"
import type { LectorNivel } from "@/components/lesson/LectorLeccion"

/**
 * Los siete niveles, con el tema en el que empieza cada uno. Se generan con
 * las lecciones para que no puedan desfasarse del documento.
 */
export const PERF_NIVELES: LectorNivel[] = ${j(niveles)}

export const PERF_LECCIONES: DocScreen[] = ${j(lecciones)}

// La numeración es la que se guarda como progreso: si el documento se
// desordena, mejor caerse al arrancar que marcar leído el tema equivocado.
PERF_LECCIONES.forEach((s, i) => {
  if (s.n !== i + 1) throw new Error(\`performanceLeccion: el tema \${s.n} está en la posición \${i + 1}\`)
})

export const PERF_LECCION_TOTAL = PERF_LECCIONES.length
export const PERF_MINUTOS = PERF_LECCIONES.reduce((t, s) => t + s.minutes, 0)

/** Los huecos de figura que quedan por llenar, para el inventario de imágenes. */
export const PERF_FIGURAS_PENDIENTES = ${j(ctx.imagenes)}

/**
 * Las claves de práctica del módulo: los dieciocho ejercicios resueltos del
 * tema 40 y los diez escenarios del 38. No hay pantalla de práctica aparte,
 * pero el progreso las cuenta igual y el catálogo las valida.
 */
export const PERF_PRACTICA_CLAVES = ${j([...ctx.ejercicios, ...ctx.escenarios])}
`,
  "utf8",
)

console.log(`temas: ${lecciones.length} · ${lecciones.reduce((t, l) => t + l.minutes, 0)} min`)
console.log(`niveles: ${niveles.map((n) => `${n.titulo} (desde ${n.desde})`).join(" · ")}`)
console.log(`huecos de imagen: ${ctx.imagenes.length} · escenarios: ${ctx.escenarios.length} · ejercicios: ${ctx.ejercicios.length}`)
console.log(`escrito ${path.relative(RAIZ, DESTINO)}`)
