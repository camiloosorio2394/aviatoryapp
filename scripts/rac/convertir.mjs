/**
 * Convierte docs/contenido/rac.md en lo que usa la app del módulo RAC:
 *
 *   src/lib/racLeccion.ts                  las diecinueve unidades y sus bloques
 *   src/lib/racPractica.ts                 el quiz de cada unidad, como práctica
 *   contenido/bancos/rac_evaluacion.json   el banco del quiz final
 *
 * El documento es la fuente: se edita allí y se vuelve a correr esto. Su
 * plantilla, unidad por unidad:
 *
 *   # BLOQUE n · …                     abre un bloque (nivel del lector)
 *   ## RAC nn · …                      abre una unidad (una lección)
 *   *Enmienda …*                       versión usada: párrafo, sin cursiva
 *   **Unidad:** Uxx · **Lectura:** ~N min · …   de aquí salen código y minutos; no se pinta
 *   > …                                aparte destacado: callout
 *   ### ¿De qué trata? · Lo que debe saber un piloto · Datos importantes · En pocas palabras
 *   #### …                             apartado dentro de la unidad
 *   #### Detalle · …                   detalle plegado (detalleTecnico) hasta el
 *                                      siguiente #### o ###: la norma completa
 *                                      no desaparece, pero no compite con lo
 *                                      que el piloto tiene que saber
 *   ### Quiz · Uxx · RAC nn            preguntas de la unidad: van a la práctica
 *
 * El quiz de cada unidad no entra en la lección: la regla de Camilo es que en
 * la lectura no se pregunta nada. La ficha del módulo no se convierte, salvo
 * «Antes de empezar: ¿RAC 2 o RAC 61?», que abre la lección 1. Los anexos
 * tampoco: son para quien mantiene el módulo, no para el alumno.
 *
 * La lectura de cada unidad va de 3 a 8 minutos: lo pidió el encargo del
 * módulo. Los minutos de la ficha («~N min») tienen que ser los que da el texto
 * VISIBLE a 230 palabras por minuto; lo plegado no cuenta, porque
 * se abre a demanda. Si una unidad se pasa, lo que sobra baja a un
 * «#### Detalle · …»; no se borra.
 *
 * Los títulos cortos de las lecciones («RAC 91 · Reglas generales de vuelo y
 * de operación») salen de la columna «Nombre» del mapa del módulo; el
 * encabezado de cada unidad trae el nombre oficial completo, que en varios
 * RAC no cabe en una cabecera.
 *
 * Uso: node scripts/rac/convertir.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const FUENTE = path.join(RAIZ, "docs/contenido/rac.md")
const DESTINO_LECCION = path.join(RAIZ, "src/lib/racLeccion.ts")
const DESTINO_PRACTICA = path.join(RAIZ, "src/lib/racPractica.ts")
const DESTINO_BANCO = path.join(RAIZ, "contenido/bancos/rac_evaluacion.json")

/** Lo que el documento promete en su ficha. Si no cuadra, el script para. */
const ESPERADO = { unidades: 19, bloques: 5, practica: 54, banco: 50 }

/**
 * Lectura en español de un texto técnico: unas 230 palabras por minuto. Es el
 * ritmo con el que se estimaron las fichas del documento, y está en el rango
 * de la lectura silenciosa medida para el español.
 */
const PALABRAS_POR_MINUTO = 230
const LECTURA = { min: 3, max: 8 }

/**
 * Las unidades que quedan por debajo del mínimo a propósito: son fichas, y
 * rellenarlas sería meter lo que al piloto no le toca.
 */
const FICHAS_CORTAS = new Map([["U18", "RAC 210: al piloto solo le tocan las frecuencias de emergencia y el ELT"]])

/** Los únicos `###` que puede traer una unidad antes de su quiz. */
const APARTADOS = new Set(["¿De qué trata?", "Lo que debe saber un piloto", "Datos importantes", "En pocas palabras"])

/** Una lista de viñetas con más de esto va como lista, no como viñetas. */
const MAX_VINETAS = 5

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

/** Los títulos van en versales en el documento; en la app, en caja normal. */
function cajaNormal(texto) {
  if (texto !== texto.toUpperCase()) return texto
  const bajo = texto.toLocaleLowerCase("es")
  return bajo.charAt(0).toLocaleUpperCase("es") + bajo.slice(1)
}

/**
 * La cursiva no existe en la app (renderInline solo entiende negrita,
 * resaltado y código). Dentro del texto el documento la usa para rotular
 * («*De la aeronave*: …»), así que pasa a negrita, que es como rotula el
 * resto del documento; sin esto el piloto vería los asteriscos.
 */
function sinCursiva(texto) {
  return texto.replace(/(?<!\*)\*(?!\*)([^*\n]+?)(?<!\*)\*(?!\*)/g, "**$1**")
}

const esVacia = (l) => l.trim() === ""
const esLista = (l) => /^- /.test(l) || /^\d+\. /.test(l)
const esHija = (l) => /^\s+(?:- |\d+\. )/.test(l)

/** Párrafo: líneas seguidas hasta un vacío o el principio de otro bloque. */
function leerParrafo(cuerpo, i) {
  let j = i
  while (
    j < cuerpo.length &&
    !esVacia(cuerpo[j]) &&
    !/^#{1,6} /.test(cuerpo[j]) &&
    !(j > i && esLista(cuerpo[j])) &&
    !(j > i && esHija(cuerpo[j])) &&
    !cuerpo[j].startsWith("|") &&
    !cuerpo[j].startsWith(">") &&
    !cuerpo[j].startsWith("---")
  ) {
    j++
  }
  const texto = cuerpo
    .slice(i, j)
    .map((l) => l.trim())
    .join(" ")
    .trim()
  return { texto, siguiente: j === i ? i + 1 : j }
}

function leerTabla(cuerpo, i, donde) {
  const fila = (l) =>
    l
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim())
  const head = fila(cuerpo[i])
  if (!/^\|[\s:|-]+\|?$/.test(cuerpo[i + 1]?.trim() ?? "")) {
    throw new Error(`${donde}: la tabla «${cuerpo[i]}» no tiene la línea de guiones`)
  }
  let j = i + 2
  const rows = []
  while (j < cuerpo.length && cuerpo[j].trim().startsWith("|")) {
    rows.push(fila(cuerpo[j]))
    j++
  }
  return { bloque: { kind: "table", head, rows }, siguiente: j }
}

/** Una cita `> …`, que puede ocupar varias líneas. */
function leerCita(cuerpo, i) {
  const partes = []
  let j = i
  while (j < cuerpo.length && cuerpo[j].startsWith(">")) {
    partes.push(cuerpo[j].replace(/^>\s?/, "").trim())
    j++
  }
  return { texto: partes.filter(Boolean).join(" ").trim(), siguiente: j }
}

/**
 * Si una sublista se une a su ítem, la frase sigue en minúscula: «…
 * (203.320): turbulencia moderada o fuerte; engelamiento…». No se toca una
 * sigla («CRM», «PIC») ni un rótulo en negrita seguido de dos puntos
 * («**Ordinarias**: …»), que es un término y no el arranque de una frase.
 */
function minusculaInicial(texto) {
  const m = texto.match(/^(\*\*)?(\p{L}+)/u)
  if (!m) return texto
  const palabra = m[2]
  if (palabra[0] !== palabra[0].toLocaleUpperCase("es") || palabra[0] === palabra[0].toLocaleLowerCase("es")) return texto
  if ((palabra.match(/\p{Lu}/gu) ?? []).length > 1) return texto
  if (m[1]) {
    const cierre = texto.indexOf("**", 2)
    if (cierre > 0 && texto.slice(cierre + 2).startsWith(":")) return texto
  }
  const k = m[1] ? 2 : 0
  return texto.slice(0, k) + texto[k].toLocaleLowerCase("es") + texto.slice(k + 1)
}

/**
 * El catálogo de bloques no tiene listas de dos niveles: las hijas se unen a
 * su ítem en una sola frase, separadas por punto y coma. Una hija que ya trae
 * su enlace («…; o») lo conserva.
 */
function unirSublista(padre, hijas) {
  const partes = hijas.map((h, k) => {
    const t = minusculaInicial(h)
    if (k === hijas.length - 1) return t
    if (/[;,](?: [oy])?$/.test(t)) return t
    return `${t.replace(/\.$/, "")};`
  })
  return `${padre} ${partes.join(" ")}`
}

/** Una lista, con sus hijas indentadas unidas al ítem madre. */
function leerLista(cuerpo, i) {
  const ordenada = /^\d+\. /.test(cuerpo[i])
  const marca = ordenada ? /^\d+\. / : /^- /
  const hija = /^\s+(?:- |\d+\. )/
  const items = []
  let j = i
  while (j < cuerpo.length) {
    const l = cuerpo[j]
    if (marca.test(l)) {
      items.push({ texto: l.replace(marca, "").trim(), hijas: [] })
    } else if (hija.test(l) && items.length) {
      items[items.length - 1].hijas.push(l.replace(hija, "").trim())
    } else {
      break
    }
    j++
  }
  return {
    ordenada,
    items: items.map((it) => (it.hijas.length ? unirSublista(it.texto, it.hijas) : it.texto)),
    siguiente: j,
  }
}

// ─── Bloques ────────────────────────────────────────────────────────────────

/** Convierte un tramo de líneas en bloques del lector. */
function bloquesDe(cuerpo, donde) {
  const bloques = []
  let i = 0
  while (i < cuerpo.length) {
    const l = cuerpo[i]

    if (esVacia(l) || l.startsWith("---")) {
      i++
      continue
    }

    const apartado = l.match(/^### (.+)$/)
    if (apartado) {
      const texto = apartado[1].trim()
      if (!APARTADOS.has(texto)) throw new Error(`${donde}: apartado desconocido «${texto}»`)
      bloques.push({ kind: "titulo", text: texto })
      i++
      continue
    }

    // Detalle plegado: todo lo que sigue hasta el próximo apartado.
    const detalle = l.match(/^#### Detalle · (.+)$/)
    if (detalle) {
      let j = i + 1
      while (j < cuerpo.length && !/^#{3,4} /.test(cuerpo[j])) j++
      const dentro = bloquesDe(cuerpo.slice(i + 1, j), donde)
      if (!dentro.length) throw new Error(`${donde}: «${l}» sin contenido`)
      bloques.push({ kind: "detalleTecnico", etiqueta: detalle[1].trim(), bloques: dentro })
      i = j
      continue
    }

    const sub = l.match(/^#### (.+)$/)
    if (sub) {
      bloques.push({ kind: "sub", text: sub[1].trim() })
      i++
      continue
    }

    if (/^#{1,6} /.test(l)) throw new Error(`${donde}: encabezado inesperado «${l}»`)

    if (l.startsWith("|")) {
      const t = leerTabla(cuerpo, i, donde)
      bloques.push(t.bloque)
      i = t.siguiente
      continue
    }

    if (l.startsWith(">")) {
      const c = leerCita(cuerpo, i)
      bloques.push({ kind: "callout", tone: "info", text: c.texto })
      i = c.siguiente
      continue
    }

    if (l.startsWith("```")) throw new Error(`${donde}: bloque de código sin tratamiento`)

    if (esLista(l)) {
      const lista = leerLista(cuerpo, i)
      if (lista.ordenada) bloques.push({ kind: "list", items: lista.items, ordered: true })
      else if (lista.items.length > MAX_VINETAS) bloques.push({ kind: "list", items: lista.items })
      else bloques.push({ kind: "vinetas", items: lista.items })
      i = lista.siguiente
      continue
    }

    if (esHija(l)) throw new Error(`${donde}: sublista sin ítem madre «${l.trim()}»`)

    // Un párrafo, también el que va indentado dentro de una lista (el aparte
    // «Además…» bajo la tabla del PCA, el «Ojo» del PTL): sale suelto, entre
    // la lista que lo precede y la que sigue.
    const p = leerParrafo(cuerpo, i)
    if (p.texto) bloques.push({ kind: "p", text: p.texto })
    i = p.siguiente
  }
  return bloques
}

/** Aplica una función a cada texto de un bloque, recorriendo los anidados. */
function mapearTextos(v, f) {
  if (typeof v === "string") return f(v)
  if (Array.isArray(v)) return v.map((x) => mapearTextos(x, f))
  if (v && typeof v === "object") {
    const salida = {}
    for (const [k, x] of Object.entries(v)) salida[k] = k === "kind" || k === "tone" ? x : mapearTextos(x, f)
    return salida
  }
  return v
}

/** Todos los textos de un valor, para las comprobaciones. */
function textos(v) {
  if (typeof v === "string") return [v]
  if (Array.isArray(v)) return v.flatMap(textos)
  if (v && typeof v === "object") return Object.values(v).flatMap(textos)
  return []
}

/** Las palabras que se leen sin abrir nada: lo plegado no cuenta. */
function palabrasVisibles(bloques) {
  const visibles = bloques.filter((b) => b.kind !== "detalleTecnico")
  return textos(visibles)
    .join(" ")
    .replace(/\*\*|==|`/g, " ")
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length
}

// ─── Preguntas ──────────────────────────────────────────────────────────────

const LETRA = { A: 0, B: 1, C: 2, D: 3 }

/**
 * Lee un bloque de opción múltiple a partir de la línea del enunciado:
 *
 *   **id** · Enunciado
 *   - A) … (hasta D)
 *   **Correcta:** X · **Tema:** Uxx · **Referencia:** …
 *   **Explicación:** …
 */
function leerPregunta(cuerpo, i) {
  const cab = cuerpo[i].match(/^\*\*([a-z0-9-]+)\*\* · (.+)$/)
  if (!cab) throw new Error(`esperaba el enunciado de una pregunta, hay «${cuerpo[i]}»`)
  const id = cab[1]

  const opciones = []
  let j = i + 1
  while (j < cuerpo.length && /^- [A-D]\) /.test(cuerpo[j])) {
    const letra = cuerpo[j][2]
    if (LETRA[letra] !== opciones.length) throw new Error(`${id}: la opción ${letra} está fuera de orden`)
    opciones.push(cuerpo[j].slice(5).trim())
    j++
  }
  const correcta = cuerpo[j]?.match(/^\*\*Correcta:\*\* ([A-D]) · \*\*Tema:\*\* (U\d\d) · \*\*Referencia:\*\* (.+)$/)
  if (!correcta) throw new Error(`${id}: esperaba «**Correcta:** X · **Tema:** Uxx · **Referencia:** …», hay «${cuerpo[j]}»`)
  j++
  const expl = cuerpo[j]?.match(/^\*\*Explicación:\*\* (.+)$/)
  if (!expl) throw new Error(`${id}: esperaba la explicación, hay «${cuerpo[j]}»`)
  j++

  return {
    pregunta: {
      id,
      enunciado: cab[2].trim(),
      opciones,
      correcta: LETRA[correcta[1]],
      explicacion: expl[1].trim(),
      referencia: correcta[3].trim(),
      tema: correcta[2],
    },
    siguiente: j,
  }
}

/** Todas las preguntas de un tramo, en orden. */
function preguntasDe(cuerpo) {
  const salida = []
  let i = 0
  while (i < cuerpo.length) {
    if (/^\*\*[a-z0-9-]+\*\* · /.test(cuerpo[i])) {
      const p = leerPregunta(cuerpo, i)
      salida.push(p.pregunta)
      i = p.siguiente
    } else {
      if (!esVacia(cuerpo[i]) && !cuerpo[i].startsWith("---")) {
        throw new Error(`línea suelta entre las preguntas: «${cuerpo[i]}»`)
      }
      i++
    }
  }
  return salida
}

// ─── Lectura del documento ──────────────────────────────────────────────────

const partes = tramos()

const version = bruto.match(/^\*\*Versión:\*\* ([^·\n]+) · ([^·\n]+)/m)
if (!version) throw new Error("no encuentro la versión del documento")

// La ficha: «Antes de empezar» y el mapa del módulo.
const ficha = partes[0]
if (!ficha || !/→ RAC$/.test(ficha.titulo)) throw new Error("no encuentro la ficha del módulo")

function apartadoDeFicha(titulo) {
  const k = ficha.cuerpo.findIndex((l) => l === `### ${titulo}`)
  if (k < 0) throw new Error(`no encuentro «${titulo}» en la ficha`)
  let fin = k + 1
  while (fin < ficha.cuerpo.length && !/^#{1,3} /.test(ficha.cuerpo[fin])) fin++
  return ficha.cuerpo.slice(k + 1, fin)
}

const ANTES = "Antes de empezar: ¿RAC 2 o RAC 61?"
const antesDeEmpezar = [{ kind: "titulo", text: ANTES }, ...bloquesDe(apartadoDeFicha(ANTES), "ficha")]

const mapa = (() => {
  const cuerpo = apartadoDeFicha("Mapa del módulo")
  const k = cuerpo.findIndex((l) => l.startsWith("|"))
  if (k < 0) throw new Error("el mapa del módulo no tiene tabla")
  const { bloque } = leerTabla(cuerpo, k, "mapa")
  const unidades = new Map()
  const bloques = []
  for (const fila of bloque.rows) {
    const [unidad, rac, nombre, , , , lectura] = fila
    const b = nombre.match(/^\*\*Bloque (\d+) · (.+)\*\*$/)
    if (!unidad && b) {
      bloques.push({ n: Number(b[1]), nombre: b[2].trim() })
      continue
    }
    const min = lectura?.match(/^~(\d+) min$/)
    if (!/^U\d\d$/.test(unidad) || !min) throw new Error(`fila del mapa que no entiendo: «${fila.join(" | ")}»`)
    unidades.set(unidad, { rac, nombre, minutos: Number(min[1]) })
  }
  return { unidades, bloques }
})()

// Los bloques y sus unidades.
const niveles = []
const lecciones = []
const practica = []
const temaABloque = new Map()

for (const parte of partes) {
  const cab = parte.titulo.match(/^BLOQUE (\d+) · (.+)$/)
  if (!cab) continue
  const nBloque = Number(cab[1])
  const nombre = cajaNormal(cab[2].trim())
  const enMapa = mapa.bloques.find((b) => b.n === nBloque)
  if (!enMapa || enMapa.nombre.toLocaleUpperCase("es") !== cab[2].trim().toLocaleUpperCase("es")) {
    throw new Error(`el bloque ${nBloque} («${cab[2]}») no coincide con el mapa del módulo`)
  }

  const indices = []
  parte.cuerpo.forEach((l, k) => {
    if (/^## RAC /.test(l)) indices.push(k)
  })
  if (!indices.length) throw new Error(`el bloque ${nBloque} no tiene unidades`)
  niveles.push({ titulo: `Bloque ${nBloque} · ${enMapa.nombre}`, desde: lecciones.length + 1 })

  indices.forEach((desde, k) => {
    const hasta = indices[k + 1] ?? parte.cuerpo.length
    const encabezado = parte.cuerpo[desde].match(/^## RAC (\d+) · (.+)$/)
    if (!encabezado) throw new Error(`encabezado de unidad que no entiendo: «${parte.cuerpo[desde]}»`)
    const cuerpo = parte.cuerpo.slice(desde + 1, hasta)
    const donde = `RAC ${encabezado[1]}`

    const lineaVersion = cuerpo[0]?.match(/^\*([^*].*[^*])\*$/)
    if (!lineaVersion) throw new Error(`${donde}: falta la línea de la versión, en cursiva, bajo el título`)
    const ficheUnidad = cuerpo[1]?.match(/^\*\*Unidad:\*\* (U\d\d) · \*\*Lectura:\*\* ~(\d+) min · /)
    if (!ficheUnidad) throw new Error(`${donde}: falta la línea «**Unidad:** Uxx · **Lectura:** ~N min · …»`)
    const tema = ficheUnidad[1]
    const minutes = Number(ficheUnidad[2])
    const n = lecciones.length + 1

    const enMapaU = mapa.unidades.get(tema)
    if (!enMapaU) throw new Error(`${donde}: la unidad ${tema} no está en el mapa`)
    if (enMapaU.rac !== encabezado[1]) throw new Error(`${tema}: el mapa dice RAC ${enMapaU.rac} y la unidad RAC ${encabezado[1]}`)
    if (enMapaU.minutos !== minutes) throw new Error(`${tema}: el mapa dice ~${enMapaU.minutos} min y la unidad ~${minutes}`)
    if (tema !== `U${String(n).padStart(2, "0")}`) throw new Error(`${tema} está en la posición ${n}`)

    // Hasta el quiz, lección; desde el quiz, práctica.
    const corte = cuerpo.findIndex((l) => /^### Quiz · /.test(l))
    if (corte < 0) throw new Error(`${tema}: no tiene quiz`)
    const cabQuiz = cuerpo[corte].match(/^### Quiz · (U\d\d) · RAC (\d+)$/)
    if (!cabQuiz || cabQuiz[1] !== tema || cabQuiz[2] !== encabezado[1]) {
      throw new Error(`${tema}: el quiz dice «${cuerpo[corte]}»`)
    }

    const title = `RAC ${encabezado[1]} · ${enMapaU.nombre}`
    const blocks = mapearTextos(
      [{ kind: "p", text: lineaVersion[1].trim() }, ...bloquesDe(cuerpo.slice(2, corte), tema)],
      sinCursiva,
    )
    lecciones.push({ n, title, kicker: nombre, minutes, blocks })

    const preguntas = preguntasDe(cuerpo.slice(corte + 1))
    preguntas.forEach((p, q) => {
      const idEsperado = `${tema.toLowerCase()}-q${q + 1}`
      if (p.id !== idEsperado) throw new Error(`${tema}: esperaba ${idEsperado} y encontré ${p.id}`)
      if (p.tema !== tema) throw new Error(`${p.id}: dice tema ${p.tema} dentro de ${tema}`)
    })
    practica.push({
      tema,
      n,
      titulo: title,
      preguntas: preguntas.map(({ tema: _tema, ...p }) => p),
    })
    temaABloque.set(tema, nBloque)
  })
}

// La ficha abre la primera lección.
if (!lecciones.length) throw new Error("no encuentro ninguna unidad")
lecciones[0].blocks = [...antesDeEmpezar, ...lecciones[0].blocks]

// El banco del quiz final.
const final = partes.find((p) => /^QUIZ FINAL DEL MÓDULO RAC$/.test(p.titulo))
if (!final) throw new Error("no encuentro el quiz final")
const porIntento = final.cuerpo.join("\n").match(/\*\*Por intento:\*\* (\d+) al azar/)
if (!porIntento) throw new Error("el quiz final no dice cuántas preguntas van por intento")
const cuposDoc = [...(final.cuerpo.find((l) => l.startsWith("**Banco por bloque:**")) ?? "").matchAll(/bloque (\d+): (\d+)/g)].map(
  (m) => [Number(m[1]), Number(m[2])],
)
const inicioBanco = final.cuerpo.findIndex((l) => /^\*\*ev-\d\d\*\* · /.test(l))
if (inicioBanco < 0) throw new Error("el quiz final no tiene preguntas")
const banco = preguntasDe(final.cuerpo.slice(inicioBanco))

// ─── Comprobaciones ─────────────────────────────────────────────────────────

const fallos = []
const comprobar = (cond, mensaje) => {
  if (!cond) fallos.push(mensaje)
}

const preguntasPractica = practica.flatMap((g) => g.preguntas)

comprobar(lecciones.length === ESPERADO.unidades, `unidades: ${lecciones.length}, esperaba ${ESPERADO.unidades}`)
comprobar(niveles.length === ESPERADO.bloques, `bloques: ${niveles.length}, esperaba ${ESPERADO.bloques}`)
comprobar(mapa.unidades.size === ESPERADO.unidades, `el mapa trae ${mapa.unidades.size} unidades`)
comprobar(
  preguntasPractica.length === ESPERADO.practica,
  `preguntas de práctica: ${preguntasPractica.length}, esperaba ${ESPERADO.practica}`,
)
comprobar(banco.length === ESPERADO.banco, `preguntas del banco: ${banco.length}, esperaba ${ESPERADO.banco}`)

lecciones.forEach((l, k) => {
  comprobar(l.n === k + 1, `la lección en la posición ${k + 1} dice ser la ${l.n}`)
  comprobar(l.blocks.length > 2, `la lección ${l.n} tiene ${l.blocks.length} bloques`)
  comprobar(Boolean(l.title), `la lección ${l.n} no tiene título`)
  // La lectura: los minutos de la ficha son los del texto visible, y van de 3 a 8.
  const palabras = palabrasVisibles(l.blocks)
  const calculados = Math.max(1, Math.round(palabras / PALABRAS_POR_MINUTO))
  comprobar(
    l.minutes === calculados,
    `la lección ${l.n} dice ~${l.minutes} min y su texto visible da ~${calculados} (${palabras} palabras a ${PALABRAS_POR_MINUTO}/min)`,
  )
  const tema = `U${String(l.n).padStart(2, "0")}`
  if (!FICHAS_CORTAS.has(tema)) {
    comprobar(
      calculados >= LECTURA.min && calculados <= LECTURA.max,
      `la lección ${l.n} (${l.title}) se lee en ~${calculados} min, fuera de ${LECTURA.min} a ${LECTURA.max}: ${palabras} palabras visibles; lo que sobre, a un «#### Detalle · …»`,
    )
  }
  // La regla de Camilo: en la lectura no se pregunta nada.
  comprobar(!l.blocks.some((b) => b.kind === "ponAPrueba"), `la lección ${l.n} trae un «pon a prueba»`)
  for (const b of l.blocks) {
    if (b.kind === "p") comprobar(b.text.trim() !== "", `la lección ${l.n} tiene un párrafo vacío`)
    if (b.kind === "list" || b.kind === "vinetas") {
      comprobar(b.items.length > 0 && b.items.every((x) => x.trim()), `la lección ${l.n} tiene una lista vacía`)
    }
    if (b.kind === "table") {
      comprobar(b.head.every((c) => c), `la lección ${l.n} tiene una tabla sin encabezado`)
      for (const r of b.rows) {
        comprobar(r.length === b.head.length, `la lección ${l.n}: fila de ${r.length} celdas en una tabla de ${b.head.length}`)
      }
    }
  }
})

for (const p of [...preguntasPractica, ...banco]) {
  comprobar(p.opciones.length === 4, `${p.id}: ${p.opciones.length} opciones`)
  comprobar(new Set(p.opciones).size === p.opciones.length, `${p.id}: opciones repetidas`)
  comprobar(Number.isInteger(p.correcta) && p.correcta >= 0 && p.correcta <= 3, `${p.id}: correcta fuera de rango`)
  comprobar(Boolean(p.explicacion && p.referencia && p.enunciado), `${p.id}: le falta enunciado, explicación o referencia`)
}

const ids = [...preguntasPractica, ...banco].map((p) => p.id)
comprobar(new Set(ids).size === ids.length, "hay ids de pregunta repetidos")
banco.forEach((p, k) => {
  comprobar(p.id === `ev-${String(k + 1).padStart(2, "0")}`, `el banco trae ${p.id} en la posición ${k + 1}`)
  comprobar(temaABloque.has(p.tema), `${p.id}: el tema ${p.tema} no existe`)
})

// Los cupos por bloque que anuncia el quiz final.
const porBloque = {}
for (const p of banco) porBloque[temaABloque.get(p.tema)] = (porBloque[temaABloque.get(p.tema)] ?? 0) + 1
comprobar(cuposDoc.length === ESPERADO.bloques, "el quiz final no dice cuántas preguntas trae cada bloque")
for (const [b, cupo] of cuposDoc) {
  comprobar(porBloque[b] === cupo, `bloque ${b}: el documento dice ${cupo} preguntas en el banco y hay ${porBloque[b] ?? 0}`)
}

// Una pregunta de práctica no debe copiar una de la evaluación.
const normal = (t) => t.toLocaleLowerCase("es").replace(/\s+/g, " ").trim()
const enunciadosBanco = new Set(banco.map((p) => normal(p.enunciado)))
for (const p of preguntasPractica) {
  if (p.enunciado.length >= 40) comprobar(!enunciadosBanco.has(normal(p.enunciado)), `${p.id} repite un enunciado del banco`)
}

// deepPlain() reescribe la raya larga; y un asterisco suelto se vería tal cual.
const todos = [...textos(lecciones), ...textos(niveles), ...textos(practica), ...textos(banco)]
for (const t of todos) {
  comprobar(!t.includes("—"), `raya larga en «${t.slice(0, 60)}…»`)
  comprobar(!t.replace(/\*\*/g, "").includes("*"), `asterisco suelto en «${t.slice(0, 60)}…»`)
}

if (fallos.length) {
  console.error("No se escribió nada:")
  for (const f of fallos) console.error(`  · ${f}`)
  process.exit(1)
}

// ─── Escritura ──────────────────────────────────────────────────────────────

const j = (v) => JSON.stringify(v, null, 2)
const AVISO = `// GENERADO por scripts/rac/convertir.mjs desde
// docs/contenido/rac.md. No se edita a mano: se edita el documento y
// se vuelve a correr el script.
`
const VERSION = `${version[1].trim()}, ${version[2].trim()}`

fs.writeFileSync(
  DESTINO_LECCION,
  `${AVISO}
/**
 * Las diecinueve unidades del módulo RAC, una por reglamento, en el formato
 * del lector de lecciones.
 *
 * El contenido está en docs/contenido/rac.md, con sus fuentes en el Anexo B
 * del documento. Versión convertida: ${VERSION}.
 *
 * El quiz de cada unidad no va aquí: está en racPractica.ts, porque en la
 * lectura no se pregunta nada.
 */

import type { DocScreen } from "@/lib/docBlocks"
import type { LectorNivel } from "@/components/lesson/LectorLeccion"

/**
 * Los cinco bloques, con la unidad en la que empieza cada uno. Se generan con
 * las lecciones para que no puedan desfasarse del documento.
 */
export const RAC_NIVELES: LectorNivel[] = ${j(niveles)}

export const RAC_LECCIONES: DocScreen[] = ${j(lecciones)}

// La numeración es la que se guarda como progreso: si el documento se
// desordena, mejor caerse al arrancar que marcar leída la unidad equivocada.
RAC_LECCIONES.forEach((s, i) => {
  if (s.n !== i + 1) throw new Error(\`racLeccion: la unidad \${s.n} está en la posición \${i + 1}\`)
})

export const RAC_LECCION_TOTAL = RAC_LECCIONES.length
export const RAC_MINUTOS = RAC_LECCIONES.reduce((t, s) => t + s.minutes, 0)
`,
  "utf8",
)

fs.writeFileSync(
  DESTINO_PRACTICA,
  `${AVISO}
/**
 * La práctica del módulo RAC: el quiz de cada unidad, con corrección
 * inmediata, agrupado por la unidad de la que sale.
 *
 * No son las preguntas de la evaluación final: esas viven en el servidor
 * (contenido/bancos/rac_evaluacion.json) y el conversor comprueba que ningún
 * enunciado de aquí repita uno de allá.
 */

import type { GrupoPractica } from "@/lib/practicaQuiz"

export const RAC_PRACTICA: GrupoPractica[] = ${j(practica)}

/** Las claves de práctica: una por pregunta, en el orden del documento. */
export const RAC_PRACTICA_CLAVES: string[] = ${j(preguntasPractica.map((p) => p.id))}
`,
  "utf8",
)

fs.writeFileSync(
  DESTINO_BANCO,
  j({
    banco: "rac_evaluacion",
    descripcion: `Quiz final del módulo RAC. Cada intento toma ${porIntento[1]} al azar.`,
    preguntas: banco.map((p) => ({
      id: p.id,
      enunciado: p.enunciado,
      opciones: p.opciones,
      correcta: p.correcta,
      explicacion: p.explicacion,
      referencia: p.referencia,
      metadatos: { tema: p.tema, bloque: temaABloque.get(p.tema) },
    })),
  }) + "\n",
  "utf8",
)

console.log(`unidades: ${lecciones.length} · ${lecciones.reduce((t, l) => t + l.minutes, 0)} min`)
console.log(`bloques: ${niveles.map((n) => `${n.titulo} (desde ${n.desde})`).join(" · ")}`)
console.log(`práctica: ${preguntasPractica.length} preguntas en ${practica.length} grupos`)
console.log(
  `banco: ${banco.length} · por bloque ` +
    Object.keys(porBloque)
      .sort()
      .map((k) => `${k}:${porBloque[k]}`)
      .join(" "),
)
for (const d of [DESTINO_LECCION, DESTINO_PRACTICA, DESTINO_BANCO]) console.log(`escrito ${path.relative(RAIZ, d)}`)
