#!/usr/bin/env node
/**
 * Convierte un documento de contenido en el archivo de lecciones de su módulo.
 *
 *   node scripts/modulos/convertir-unidades.mjs rac
 *   node scripts/modulos/convertir-unidades.mjs combustible
 *
 * Sirve para los dos porque los dos documentos están escritos en el mismo
 * dialecto, el de unidades (RAC) y capítulos (Gestión del combustible):
 *
 *   ## <unidad>              una lección
 *   ### <apartado>           bloque `titulo`
 *   #### <sub-apartado>      bloque `sub`
 *   ### Quiz · …             bloque `ponAPrueba`, con sus preguntas
 *   [ESPACIO PARA IMAGEN]    bloque `hueco`, con lo que pide la imagen
 *   - viñeta                 `list`
 *   | tabla |                `table`
 *   > aparte                 `quote`
 *
 * Aerodinámica y Performance tienen su propio convertidor porque sus
 * documentos usan otro dialecto (marcas en negrita en vez de encabezados). Este
 * no los reemplaza: cubre el dialecto que RAC y Combustible sí comparten, y por
 * eso es uno solo y no dos copias.
 *
 * El contenido no se toca: se traduce. Si el documento dice algo que este
 * script no sabe leer, falla en vez de tragárselo en silencio, que es como se
 * pierde una sección sin que nadie se entere.
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")

/**
 * Lo propio de cada módulo. `esperado` es la red de seguridad: si el documento
 * crece o encoge, el script para y lo dice, en vez de generar un módulo con
 * lecciones de menos.
 */
const MODULOS = {
  rac: {
    fuente: "docs/contenido/rac.md",
    destino: "src/lib/racLeccion.ts",
    prefijo: "RAC",
    titulo: "RAC",
    // `## RAC 2 · Personal aeronáutico (…)`
    unidad: /^## RAC (\d+) · (.+)$/,
    // `# BLOQUE 1 · TU LICENCIA Y TU APTITUD`
    grupo: /^# BLOQUE (\d+) · (.+)$/,
    grupoRotulo: (n, t) => `Bloque ${n} · ${capitalizar(t)}`,
    codigoHueco: "RAC",
    esperado: { unidades: 19, grupos: 5 },
  },
  combustible: {
    fuente: "docs/contenido/gestion-combustible.md",
    destino: "src/lib/combustibleLeccion.ts",
    prefijo: "CB",
    titulo: "Gestión del combustible",
    // `## 4. BLOCK FUEL`. El capítulo 0 es la ficha del módulo y no es lección.
    unidad: /^## ([1-9]\d*)\. (.+)$/,
    grupo: null,
    codigoHueco: "CB",
    esperado: { unidades: 23, grupos: 0, huecos: 15 },
  },
}

/** `TU LICENCIA Y TU APTITUD` → `Tu licencia y tu aptitud`. */
function capitalizar(texto) {
  const bajo = texto.toLocaleLowerCase("es")
  return bajo.charAt(0).toLocaleUpperCase("es") + bajo.slice(1)
}

// ─── Lectura del documento ──────────────────────────────────────────────────

const clave = process.argv[2]
const cfg = MODULOS[clave]
if (!cfg) {
  console.error(`Uso: node scripts/modulos/convertir-unidades.mjs <${Object.keys(MODULOS).join("|")}>`)
  process.exit(1)
}

const bruto = fs.readFileSync(path.join(RAIZ, cfg.fuente), "utf8").replace(/\r\n/g, "\n")
const lineas = bruto.split("\n")

// ─── Utilidades de bloque ───────────────────────────────────────────────────

/** Hasta dónde llega el párrafo que empieza en `i`. */
function finDeParrafo(cuerpo, i) {
  let j = i
  while (
    j < cuerpo.length &&
    cuerpo[j].trim() !== "" &&
    !cuerpo[j].startsWith("#") &&
    !cuerpo[j].startsWith("- ") &&
    !cuerpo[j].startsWith("> ") &&
    !cuerpo[j].startsWith("|") &&
    !cuerpo[j].startsWith("---") &&
    !cuerpo[j].startsWith("```") &&
    !/^\d+\. /.test(cuerpo[j]) &&
    (j === i || !esMarcaDeImagen(cuerpo[j]))
  ) {
    j++
  }
  return j
}

function esMarcaDeImagen(l) {
  return l === "[ESPACIO PARA IMAGEN]" || l === "IMAGEN SUGERIDA:" || l === "OBJETIVO:"
}

function leerParrafo(cuerpo, i) {
  const fin = finDeParrafo(cuerpo, i)
  return { texto: cuerpo.slice(i, fin).join(" ").trim(), siguiente: fin }
}

function leerLista(cuerpo, i, ordenada) {
  const marca = ordenada ? /^\d+\. / : /^- /
  const items = []
  let j = i
  while (j < cuerpo.length) {
    if (marca.test(cuerpo[j])) {
      items.push(cuerpo[j].replace(marca, "").trim())
      j++
      continue
    }
    // Una viñeta que sigue en la línea de abajo, sin guion: se pega a la
    // anterior en vez de romper la lista en dos.
    if (items.length > 0 && cuerpo[j].startsWith("  ") && cuerpo[j].trim() !== "") {
      items[items.length - 1] += ` ${cuerpo[j].trim()}`
      j++
      continue
    }
    break
  }
  return { items, siguiente: j }
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

function leerCita(cuerpo, i) {
  const partes = []
  let j = i
  while (j < cuerpo.length && cuerpo[j].startsWith(">")) {
    partes.push(cuerpo[j].replace(/^>\s?/, "").trim())
    j++
  }
  return { texto: partes.join(" ").trim(), siguiente: j }
}

function leerCerca(cuerpo, i) {
  let j = i + 1
  const dentro = []
  while (j < cuerpo.length && !cuerpo[j].startsWith("```")) {
    dentro.push(cuerpo[j])
    j++
  }
  return { texto: dentro.join(" ").trim(), siguiente: j + 1 }
}

/**
 * El hueco de imagen del documento, en tres tramos separados por líneas en
 * blanco:
 *
 *   [ESPACIO PARA IMAGEN]
 *
 *   IMAGEN SUGERIDA:
 *   <qué se dibuja>
 *
 *   OBJETIVO:
 *   <qué tiene que enseñar>
 */
function leerHueco(cuerpo, i, ctx) {
  let j = i + 1
  const saltarBlancos = () => {
    while (j < cuerpo.length && cuerpo[j].trim() === "") j++
  }
  const tramo = (rotulo) => {
    saltarBlancos()
    if (cuerpo[j] !== rotulo) return null
    j++
    const { texto, siguiente } = leerParrafo(cuerpo, j)
    j = siguiente
    return texto
  }
  const descripcion = tramo("IMAGEN SUGERIDA:")
  const pie = tramo("OBJETIVO:")
  if (!descripcion || !pie) {
    throw new Error(`hueco de imagen sin «IMAGEN SUGERIDA:» o sin «OBJETIVO:» cerca de: ${cuerpo[i + 1] ?? ""}`)
  }
  const codigo = `${cfg.codigoHueco}-${String(ctx.huecos.length + 1).padStart(2, "0")}`
  ctx.huecos.push(codigo)
  return {
    bloque: {
      kind: "hueco",
      rotulo: `${codigo} · Figura · 16:9 · 1600×900`,
      descripcion,
      pie,
      alto: 260,
      ratio: "16 / 9",
    },
    siguiente: j,
  }
}

// ─── El quiz de la unidad ───────────────────────────────────────────────────

const ENUNCIADO = /^\*\*([a-z0-9]+-q\d+)\*\* · (.+)$/
const OPCION = /^- ([A-D])\) (.+)$/
const CORRECTA = /^\*\*Correcta:\*\* ([A-D])(?: · (.+))?$/
const EXPLICACION = /^\*\*Explicación:\*\* (.+)$/

/**
 * Las preguntas de un `### Quiz · …`, tal como las escribe el documento.
 *
 * El documento trae UNA explicación por pregunta y el bloque `ponAPrueba` pide
 * una por opción. Se pone la misma en las cuatro a propósito: la explicación ya
 * dice por qué las otras no valen, y repartirla a ojo sería escribir contenido
 * que nadie revisó. El día que se redacte la retroalimentación por opción, se
 * cambia aquí y se vuelve a generar.
 */
function leerQuiz(cuerpo, ctx) {
  const preguntas = []
  let i = 0
  while (i < cuerpo.length) {
    const cab = cuerpo[i].match(ENUNCIADO)
    if (!cab) {
      i++
      continue
    }
    const id = cab[1]
    const q = cab[2].trim()
    i++

    const opciones = []
    while (i < cuerpo.length && OPCION.test(cuerpo[i])) {
      const m = cuerpo[i].match(OPCION)
      opciones.push({ letra: m[1], t: m[2].trim() })
      i++
    }
    if (opciones.length !== 4) {
      throw new Error(`${id}: esperaba cuatro opciones y encontré ${opciones.length}`)
    }

    const corr = cuerpo[i]?.match(CORRECTA)
    if (!corr) throw new Error(`${id}: no encuentro la línea «Correcta:»`)
    i++
    const ref = (corr[2] ?? "").match(/\*\*Referencia:\*\* (.+?)(?: ·|$)/)?.[1]

    const expl = cuerpo[i]?.match(EXPLICACION)
    if (!expl) throw new Error(`${id}: no encuentro la explicación`)
    i++

    ctx.preguntas.push(id)
    preguntas.push({
      q,
      ...(ref ? { ref: ref.trim() } : {}),
      // La clave es la del documento, y es la que el catálogo registra: sin
      // ella la pregunta se pinta igual pero no cuenta para el progreso.
      clave: id,
      opciones: opciones.map((o) => ({
        t: o.t,
        ...(o.letra === corr[1] ? { ok: true } : {}),
        fb: expl[1].trim(),
      })),
    })
  }
  if (preguntas.length === 0) throw new Error("un quiz sin preguntas")
  return preguntas
}

// ─── Bloques de un tramo cualquiera ─────────────────────────────────────────

function bloquesDe(cuerpo, ctx) {
  const bloques = []
  let i = 0

  while (i < cuerpo.length) {
    const l = cuerpo[i]

    if (l.trim() === "" || l.startsWith("---")) {
      i++
      continue
    }

    if (l === "[ESPACIO PARA IMAGEN]") {
      const { bloque, siguiente } = leerHueco(cuerpo, i, ctx)
      bloques.push(bloque)
      i = siguiente
      continue
    }

    if (l.startsWith("#### ")) {
      bloques.push({ kind: "sub", text: l.replace(/^#### /, "").trim() })
      i++
      continue
    }

    if (l.startsWith("### ")) {
      bloques.push({ kind: "titulo", text: l.replace(/^### /, "").trim() })
      i++
      continue
    }

    if (l.startsWith("|")) {
      const { bloque, siguiente } = leerTabla(cuerpo, i)
      bloques.push(bloque)
      i = siguiente
      continue
    }

    if (l.startsWith(">")) {
      const { texto, siguiente } = leerCita(cuerpo, i)
      if (texto) bloques.push({ kind: "quote", text: texto })
      i = siguiente
      continue
    }

    if (l.startsWith("```")) {
      const { texto, siguiente } = leerCerca(cuerpo, i)
      if (texto) bloques.push({ kind: "p", text: texto })
      i = siguiente
      continue
    }

    if (l.startsWith("- ")) {
      const { items, siguiente } = leerLista(cuerpo, i, false)
      bloques.push({ kind: "list", items })
      i = siguiente
      continue
    }

    if (/^\d+\. /.test(l)) {
      const { items, siguiente } = leerLista(cuerpo, i, true)
      bloques.push({ kind: "list", items, ordered: true })
      i = siguiente
      continue
    }

    const { texto, siguiente } = leerParrafo(cuerpo, i)
    if (texto) bloques.push({ kind: "p", text: texto })
    i = siguiente > i ? siguiente : i + 1
  }

  return bloques
}

/**
 * La cabecera de la unidad, antes del primer apartado.
 *
 * RAC abre cada unidad con dos líneas de servicio:
 *
 *   *Enmienda 17, octubre de 2019 (Resolución 03044 …)*
 *   **Unidad:** U01 · **Lectura:** ~13 min · **Tipo:** unidad completa; …
 *
 * La primera es contenido (de qué edición de la norma se está leyendo, que en
 * un módulo de reglamentos es justo lo que hay que ver) y se queda, sin las
 * cursivas. La segunda es nota de implementación para quien armó el módulo: de
 * ahí sale el `minutes` de la pantalla y no se pinta, porque el lector ya
 * enseña la unidad y los minutos por su cuenta.
 */
function cabeceraDeUnidad(cuerpo) {
  let i = 0
  let edicion = null
  let lectura = null

  while (i < cuerpo.length && cuerpo[i].trim() === "") i++

  const cursiva = cuerpo[i]?.match(/^\*([^*].*)\*$/)
  if (cursiva) {
    edicion = cursiva[1].trim()
    i++
  }

  const meta = cuerpo[i]?.match(/^\*\*Unidad:\*\*/)
  if (meta) {
    lectura = Number(cuerpo[i].match(/\*\*Lectura:\*\*\s*~?(\d+)\s*min/)?.[1]) || null
    i++
  }

  return { edicion, lectura, resto: cuerpo.slice(i) }
}

/**
 * Los bloques de una unidad entera, con el quiz apartado.
 *
 * El quiz no se mezcla con el resto: va al final, en su bloque interactivo, que
 * es donde el documento lo pone y donde el lector sabe pintarlo.
 */
function bloquesDeUnidad(cuerpo, ctx) {
  const { edicion, lectura, resto } = cabeceraDeUnidad(cuerpo)

  const corte = resto.findIndex((l) => /^### Quiz(?: ·|$)/.test(l))
  const texto = corte === -1 ? resto : resto.slice(0, corte)

  const bloques = []
  if (edicion) bloques.push({ kind: "p", text: edicion })
  bloques.push(...bloquesDe(texto, ctx))

  if (corte !== -1) {
    const preguntas = leerQuiz(resto.slice(corte + 1), ctx)
    bloques.push({ kind: "ponAPrueba", titulo: "Pon a prueba lo que aprendiste", preguntas })
  }
  return { bloques, lectura }
}

// ─── Recorrido del documento ────────────────────────────────────────────────

const ctx = { huecos: [], preguntas: [] }
const unidades = []
const grupos = []

for (let i = 0; i < lineas.length; i++) {
  const l = lineas[i]

  if (cfg.grupo) {
    const g = l.match(cfg.grupo)
    if (g) {
      grupos.push({ titulo: cfg.grupoRotulo(g[1], g[2].trim()), desde: unidades.length + 1 })
      continue
    }
  }

  const u = l.match(cfg.unidad)
  if (!u) continue

  // El cuerpo de la unidad llega hasta la siguiente unidad, el siguiente
  // grupo o el siguiente encabezado de nivel 1 (los anexos del final).
  let fin = i + 1
  while (
    fin < lineas.length &&
    !cfg.unidad.test(lineas[fin]) &&
    !/^# /.test(lineas[fin])
  ) {
    fin++
  }

  const cuerpo = lineas.slice(i + 1, fin)
  unidades.push({ codigo: u[1], titulo: u[2].trim(), cuerpo })
}

// ─── La lección ─────────────────────────────────────────────────────────────

/**
 * El rótulo pequeño de la pantalla. En RAC es el número de la norma, que es lo
 * que el piloto busca; en Combustible, el capítulo.
 */
function kickerDe(u) {
  return clave === "rac" ? `RAC ${u.codigo}` : `Capítulo ${u.codigo}`
}

/** El título de la pantalla, sin el número que ya va en el kicker. */
function tituloDe(u) {
  return clave === "rac" ? u.titulo : capitalizar(u.titulo)
}

/**
 * Minutos de lectura. Manda lo que declare el documento, que es la estimación
 * de quien escribió la unidad; donde no lo diga, se cuentan las palabras a 200
 * por minuto, como en los demás módulos, y nunca menos de uno.
 */
function minutos(blocks, declarados) {
  if (declarados) return declarados
  const texto = JSON.stringify(blocks).replace(/[^\p{L}\p{N}\s]/gu, " ")
  const palabras = texto.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(palabras / 200))
}

const lecciones = unidades.map((u, idx) => {
  const { bloques, lectura } = bloquesDeUnidad(u.cuerpo, ctx)
  return {
    n: idx + 1,
    title: tituloDe(u),
    kicker: kickerDe(u),
    minutes: minutos(bloques, lectura),
    blocks: bloques,
  }
})

// ─── Comprobaciones ─────────────────────────────────────────────────────────

const fallos = []
const comprobar = (cond, mensaje) => {
  if (!cond) fallos.push(mensaje)
}

comprobar(
  lecciones.length === cfg.esperado.unidades,
  `esperaba ${cfg.esperado.unidades} unidades y encontré ${lecciones.length}`,
)
comprobar(
  grupos.length === cfg.esperado.grupos,
  `esperaba ${cfg.esperado.grupos} grupos y encontré ${grupos.length}`,
)
if (typeof cfg.esperado.huecos === "number") {
  comprobar(
    ctx.huecos.length === cfg.esperado.huecos,
    `esperaba ${cfg.esperado.huecos} huecos de imagen y encontré ${ctx.huecos.length}`,
  )
}
for (const l of lecciones) {
  comprobar(l.blocks.length > 0, `la unidad ${l.n} (${l.title}) salió vacía`)
}

if (fallos.length > 0) {
  console.error(`No se generó ${cfg.destino}:`)
  for (const f of fallos) console.error(`  · ${f}`)
  process.exit(1)
}

// ─── Escritura ──────────────────────────────────────────────────────────────

const j = (v) => JSON.stringify(v, null, 2)
const P = cfg.prefijo

const cabecera = `// GENERADO por scripts/modulos/convertir-unidades.mjs ${clave} desde
// ${cfg.fuente}. No se edita a mano: se edita el documento y se vuelve a
// correr el script.

/**
 * ${cfg.titulo}: las ${lecciones.length} unidades, en el formato del lector de lecciones.
 *
 * El contenido es el del documento, sin tocar: este archivo lo traduce a
 * bloques, no lo reescribe.
 */

import type { DocScreen } from "@/lib/docBlocks"${grupos.length > 0 ? `\nimport type { LectorNivel } from "@/components/lesson/LectorLeccion"` : ""}
`

const nivelesTs =
  grupos.length > 0
    ? `
/** Los ${grupos.length} bloques del documento, con la unidad en la que empieza cada uno. */
export const ${P}_NIVELES: LectorNivel[] = ${j(grupos)}
`
    : ""

const salida = `${cabecera}${nivelesTs}
export const ${P}_LECCIONES: DocScreen[] = ${j(lecciones)}

/** Cuántas unidades hay. Lo lee el catálogo de contenido, que valida la base. */
export const ${P}_LECCION_TOTAL = ${lecciones.length}

/**
 * Las claves de práctica del módulo: las preguntas del final de cada unidad.
 *
 * Salen del documento y no se escriben a mano, que es la regla de la casa: la
 * base solo acepta prácticas que existen, y el catálogo se genera de aquí.
 */
export const ${P}_PRACTICA_CLAVES = ${j(ctx.preguntas)}

/** Los huecos de figura que quedan por llenar, para el inventario de imágenes. */
export const ${P}_FIGURAS_PENDIENTES = ${j(ctx.huecos)}
`

fs.writeFileSync(path.join(RAIZ, cfg.destino), salida.replace(/\n/g, "\r\n"))

console.log(`${cfg.destino}: ${lecciones.length} unidades, ${grupos.length} grupos`)
console.log(`huecos de imagen: ${ctx.huecos.length} · preguntas de quiz: ${ctx.preguntas.length}`)
