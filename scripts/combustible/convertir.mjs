/**
 * Convierte docs/contenido/gestion-combustible.md en:
 *
 *   src/lib/combustibleLeccion.ts                   los 23 capítulos, para el lector
 *   src/lib/combustiblePractica.ts                  las 66 preguntas de los quiz de capítulo
 *   contenido/bancos/combustible_evaluacion.json    las 40 del quiz final
 *
 * El documento es la fuente: se edita allí y se vuelve a correr esto. La
 * plantilla de cada capítulo:
 *
 *   ## N. TÍTULO                          abre un capítulo (en versales)
 *   **ID:** Cnn · **Tiempo:** N min       los minutos; la línea no se emite
 *   ### ¿Qué es? … ### En pocas palabras  los cinco apartados, como `titulo`
 *   #### X                                subtítulo dentro de un apartado
 *   [ESPACIO PARA IMAGEN]                 hueco, con IMAGEN SUGERIDA: y OBJETIVO:
 *   ### Quiz · Capítulo N                 NO entra en la lección: va a la práctica
 *   ### Escenario N · Título              (capítulo 23) un piensaComoPiloto
 *
 * La lección 1 abre con tres apartados de la ficha del módulo (marco
 * normativo, vocabulario y cómo leer las cifras). El cierre («Lo que debes
 * recordar…») y los errores comunes se enganchan al final de la 23. La tabla
 * de la ficha, el formato de las preguntas y los anexos no se convierten: son
 * para quien mantiene el módulo.
 *
 * En la lectura no se pregunta nada (regla de Camilo): las preguntas de cada
 * capítulo viven en la pantalla de práctica, y las del quiz final, en el
 * servidor. Por eso el script comprueba que ninguna de práctica repita una
 * del banco.
 *
 * Si algo no cuadra con lo que el documento promete, no se escribe nada.
 *
 * Uso: node scripts/combustible/convertir.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { bloquesDeFigura, figuraDibujada } from "../figuras/enLeccion.mjs"
import { FIGURAS } from "./figuras/index.mjs"

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const FUENTE = path.join(RAIZ, "docs/contenido/gestion-combustible.md")
const DESTINO_LECCION = path.join(RAIZ, "src/lib/combustibleLeccion.ts")
const DESTINO_PRACTICA = path.join(RAIZ, "src/lib/combustiblePractica.ts")
const DESTINO_BANCO = path.join(RAIZ, "contenido/bancos/combustible_evaluacion.json")
const DIR_FIGURAS = path.join(RAIZ, "public/modulos/combustible")
const FIGURA_POR_CODIGO = new Map(FIGURAS.map((f) => [f.codigo, f]))
/** Lo que falle al buscar una figura dibujada; se suma a `fallos` al final. */
const fallosFiguras = []

/** Lo que el documento promete en su ficha. Si no cuadra, el script para. */
const ESPERADO = { capitulos: 23, huecos: 15, escenarios: 10, porCapitulo: 3, practica: 66, banco: 40 }

/**
 * Las tres partes del módulo, con el capítulo en que empieza cada una. El
 * documento no las marca; se fijan aquí porque son la navegación del lector.
 */
const PARTES = [
  { titulo: "Parte 1 · Planificar el combustible", desde: 1 },
  { titulo: "Parte 2 · Gestionarlo en vuelo", desde: 12 },
  { titulo: "Parte 3 · Escenarios y cierre", desde: 23 },
]

/** Los apartados de la ficha que sí entran, al principio de la lección 1. */
const FICHA_UTIL = [
  "El marco normativo que usa este módulo",
  "Vocabulario: el español del RAC y el inglés del OFP",
  "Cómo leer las cifras de los ejemplos",
]
/** Los que se leen y se descartan a propósito. */
const FICHA_FUERA = ["Formato de las preguntas"]

/** Los cinco apartados de la plantilla de un capítulo, en su orden. */
const APARTADOS = ["¿Qué es?", "Lo que debe saber un piloto", "Aplicación operacional", "Ejemplo", "En pocas palabras"]

/** Siglas que conservan su caja al pasar un título de versales a caja normal. */
const SIGLAS = new Set(["OFP", "FMS", "ATC", "PIC", "RAC", "OACI", "EDTO", "MEL", "CDL", "PNR", "ETP", "CP", "FAA", "FOB", "FU", "EFOB"])

const LETRA = { A: 0, B: 1, C: 2, D: 3 }

const pad = (n) => String(n).padStart(2, "0")

const bruto = fs.readFileSync(FUENTE, "utf8").replace(/\r\n/g, "\n")
const lineas = bruto.split("\n")

/** Lo que se resolvió a mano y conviene que quien corre el script sepa. */
const avisos = []

// ─── Utilidades de lectura ──────────────────────────────────────────────────

/**
 * Parte unas líneas por un encabezado. Lo que va dentro de un bloque de
 * código no cuenta como encabezado.
 */
function partir(ls, marca) {
  const salida = []
  let actual = null
  let enCodigo = false
  for (const l of ls) {
    if (l.startsWith("```")) enCodigo = !enCodigo
    const m = enCodigo ? null : l.match(marca)
    if (m) {
      actual = { titulo: m[1].trim(), cuerpo: [] }
      salida.push(actual)
    } else if (actual) {
      actual.cuerpo.push(l)
    }
  }
  return salida
}

/** Lo que va antes del primer encabezado de un tramo. */
function preambulo(ls, marca) {
  const k = ls.findIndex((l) => marca.test(l))
  return k < 0 ? ls : ls.slice(0, k)
}

/**
 * El texto en línea: `renderInline` solo entiende **negrita**, ==resaltado==
 * y `código`. La cursiva del documento (*Cifras ilustrativas.*, los títulos de
 * los manuales de Airbus) saldría con los asteriscos a la vista, así que se
 * quita la marca y se deja el texto.
 */
function limpiar(texto) {
  return texto.replace(/(^|[^*])\*([^*\s](?:[^*]*[^*\s])?)\*(?!\*)/g, "$1$2").trim()
}

/** Líneas con las que empieza otro bloque: cortan el párrafo anterior. */
const INICIO = [
  /^#{1,6} /,
  /^- /,
  /^\d+\. /,
  /^\s+(\d+\.|-) /,
  /^\|/,
  /^```/,
  /^> /,
  /^---/,
  /^\[ESPACIO PARA IMAGEN\]$/,
  /^(IMAGEN SUGERIDA|OBJETIVO):$/,
]
const empiezaBloque = (l) => INICIO.some((r) => r.test(l))

/** Párrafo: líneas seguidas hasta un vacío o el principio de otro bloque. */
function leerParrafo(cuerpo, i) {
  let j = i
  while (j < cuerpo.length && cuerpo[j].trim() !== "" && (j === i || !empiezaBloque(cuerpo[j]))) j++
  return { texto: cuerpo.slice(i, j).map((l) => l.trim()).join(" ").trim(), siguiente: j }
}

function siguienteNoVacia(cuerpo, i) {
  let k = i
  while (k < cuerpo.length && cuerpo[k].trim() === "") k++
  return k
}

function leerTabla(cuerpo, i, donde) {
  const fila = (l) =>
    l
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => limpiar(c.trim()))
  const head = fila(cuerpo[i])
  if (!/^\|[\s:|-]+\|$/.test(cuerpo[i + 1]?.trim() ?? "")) {
    throw new Error(`${donde}: la tabla «${cuerpo[i].slice(0, 50)}» no trae la línea de guiones`)
  }
  let j = i + 2
  const rows = []
  while (j < cuerpo.length && cuerpo[j].trim().startsWith("|")) {
    const r = fila(cuerpo[j])
    if (r.length !== head.length) {
      throw new Error(`${donde}: una fila de la tabla «${head.join(" | ")}» tiene ${r.length} celdas, no ${head.length}`)
    }
    rows.push(r)
    j++
  }
  return { bloque: { kind: "table", head, rows }, siguiente: j }
}

/**
 * Una lista. Si un ítem trae una sublista sangrada (el capítulo 20 tiene una),
 * se pliega dentro de su ítem, numerada: el lector no pinta listas anidadas y
 * partirla dejaría el ítem padre sin su contenido.
 */
function leerLista(cuerpo, i, ordenada, donde) {
  const marca = ordenada ? /^\d+\. / : /^- /
  const items = []
  const plegados = new Set()
  let j = i
  while (j < cuerpo.length) {
    const l = cuerpo[j]
    if (marca.test(l)) {
      items.push(limpiar(l.replace(marca, "")))
      j++
      continue
    }
    const anidada = l.match(/^\s+(?:(\d+)\.|-) (.+)$/)
    if (anidada && items.length) {
      items[items.length - 1] += ` ${anidada[1] ? `${anidada[1]}. ` : ""}${limpiar(anidada[2])}`
      plegados.add(items.length - 1)
      j++
      continue
    }
    break
  }
  for (const k of plegados) avisos.push(`${donde}: sublista plegada dentro de «${items[k].slice(0, 40)}…»`)
  return { items, siguiente: j }
}

function leerCerca(cuerpo, i, donde) {
  let j = i + 1
  const dentro = []
  while (j < cuerpo.length && !cuerpo[j].startsWith("```")) {
    dentro.push(cuerpo[j])
    j++
  }
  if (j >= cuerpo.length) throw new Error(`${donde}: bloque de código sin cerrar`)
  return { texto: dentro.join("\n"), siguiente: j + 1 }
}

/** Máximo común divisor, para reducir la medida de una figura a su proporción. */
const mcd = (a, b) => (b === 0 ? a : mcd(b, a % b))

/**
 * Hueco de imagen: `[ESPACIO PARA IMAGEN]`, `IMAGEN SUGERIDA:` con la
 * descripción debajo y `OBJETIVO:` con el texto debajo. La medida sale de la
 * última frase de la descripción («Formato horizontal, 1600 × 900 px.»), que
 * pasa al rótulo y no se repite en la descripción.
 */
function leerHueco(cuerpo, i, ctx) {
  const donde = `C${pad(ctx.n)}`
  let k = siguienteNoVacia(cuerpo, i + 1)
  if (cuerpo[k]?.trim() !== "IMAGEN SUGERIDA:") throw new Error(`${donde}: hueco sin «IMAGEN SUGERIDA:»`)
  const sugerida = leerParrafo(cuerpo, siguienteNoVacia(cuerpo, k + 1))
  k = siguienteNoVacia(cuerpo, sugerida.siguiente)
  if (cuerpo[k]?.trim() !== "OBJETIVO:") throw new Error(`${donde}: hueco sin «OBJETIVO:»`)
  const objetivo = leerParrafo(cuerpo, siguienteNoVacia(cuerpo, k + 1))

  const medida = sugerida.texto.match(/\s*Formato (horizontal|vertical), (\d+) × (\d+) px\.?$/)
  if (!medida) throw new Error(`${donde}: la imagen sugerida no termina con «Formato …, ancho × alto px.»`)
  const ancho = Number(medida[2])
  const alto = Number(medida[3])
  const d = mcd(ancho, alto)
  const [a, b] = [ancho / d, alto / d]
  const vertical = alto > ancho
  if (vertical !== (medida[1] === "vertical")) throw new Error(`${donde}: dice «${medida[1]}» y mide ${ancho}×${alto}`)

  const codigo = `IMG-C${pad(ctx.n)}`
  ctx.huecos.push({ codigo, rotulo: `${codigo} · Figura · ${a}:${b} · ${ancho}×${alto}`, formato: `${ancho} × ${alto}` })

  // Si la figura ya está dibujada (scripts/combustible/figuras), sale ella,
  // con la medida que pide el documento.
  const figura = figuraDibujada({ porCodigo: FIGURA_POR_CODIGO, codigo, dirPublico: DIR_FIGURAS, modulo: "combustible", fallos: fallosFiguras })
  if (figura) {
    if ((figura.ancho ?? 1600) !== ancho || figura.alto !== alto) {
      fallosFiguras.push(`${codigo}: el documento pide ${ancho}×${alto} y la figura mide ${figura.ancho ?? 1600}×${figura.alto}`)
    }
    ctx.dibujadas.push(codigo)
    return { bloques: bloquesDeFigura({ figura, codigo, src: `/modulos/combustible/${codigo}.svg`, anotaciones: null, fallos: fallosFiguras }), siguiente: objetivo.siguiente }
  }
  return {
    bloques: [{
      kind: "hueco",
      rotulo: `${codigo} · Figura · ${a}:${b} · ${ancho}×${alto}`,
      descripcion: limpiar(sugerida.texto.slice(0, medida.index)),
      pie: limpiar(objetivo.texto),
      // Con `ratio` el hueco mide lo que la figura en cualquier ancho; `alto`
      // queda como respaldo. Las verticales llevan además un ancho máximo: a
      // todo el ancho de lectura, un 9:14 pasaría del alto de la pantalla.
      alto: vertical ? 560 : 260,
      ...(vertical ? { anchoMax: 400 } : {}),
      ratio: `${a} / ${b}`,
    }],
    siguiente: objetivo.siguiente,
  }
}

// ─── Bloques genéricos ──────────────────────────────────────────────────────

/** Convierte un tramo de líneas en bloques, sin conocer la plantilla. */
function bloquesDe(cuerpo, ctx) {
  const donde = `C${pad(ctx.n)}`
  const bloques = []
  let i = 0
  while (i < cuerpo.length) {
    const l = cuerpo[i]

    if (l.trim() === "" || /^---+$/.test(l.trim())) {
      i++
      continue
    }

    if (l.trim() === "[ESPACIO PARA IMAGEN]") {
      const h = leerHueco(cuerpo, i, ctx)
      bloques.push(...h.bloques)
      i = h.siguiente
      continue
    }

    if (/^(IMAGEN SUGERIDA|OBJETIVO):$/.test(l.trim())) {
      throw new Error(`${donde}: «${l.trim()}» suelto, sin su [ESPACIO PARA IMAGEN]`)
    }

    const sub = l.match(/^#### (.+)$/)
    if (sub) {
      bloques.push({ kind: "sub", text: limpiar(sub[1]) })
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

    if (l.startsWith("> ")) {
      const partes = []
      let j = i
      while (j < cuerpo.length && cuerpo[j].startsWith("> ")) partes.push(cuerpo[j++].slice(2).trim())
      bloques.push({ kind: "callout", tone: "tip", text: limpiar(partes.join(" ")) })
      i = j
      continue
    }

    if (l.startsWith("```")) {
      const c = leerCerca(cuerpo, i, donde)
      bloques.push({ kind: "code", text: c.texto, tabular: true })
      i = c.siguiente
      continue
    }

    if (/^- /.test(l)) {
      const lista = leerLista(cuerpo, i, false, donde)
      // Las viñetas del catálogo son para listas cortas (cinco como mucho).
      bloques.push(lista.items.length <= 5 ? { kind: "vinetas", items: lista.items } : { kind: "list", items: lista.items })
      i = lista.siguiente
      continue
    }

    if (/^\d+\. /.test(l)) {
      const lista = leerLista(cuerpo, i, true, donde)
      bloques.push({ kind: "list", items: lista.items, ordered: true })
      i = lista.siguiente
      continue
    }

    if (/^\s+(\d+\.|-) /.test(l)) throw new Error(`${donde}: sublista sin ítem padre: «${l.trim()}»`)

    const p = leerParrafo(cuerpo, i)
    if (p.texto) bloques.push({ kind: "p", text: limpiar(p.texto) })
    i = p.siguiente === i ? i + 1 : p.siguiente
  }
  return bloques
}

// ─── Preguntas ──────────────────────────────────────────────────────────────

/**
 * Una pregunta de opción múltiple:
 *
 *   **id** · Enunciado
 *   - A) … - D) …
 *   **Correcta:** X · **Tema:** Cnn · **Referencia:** …
 *   **Explicación:** …
 *
 * `texto` decide si se limpia la cursiva: sí en la práctica, que pinta la
 * app; no en el banco, que se guarda tal cual lo trae el documento.
 */
function leerPreguntas(cuerpo, donde, texto) {
  const preguntas = []
  let i = 0
  while (i < cuerpo.length) {
    const l = cuerpo[i]
    if (l.trim() === "" || /^---+$/.test(l.trim())) {
      i++
      continue
    }
    const cab = l.match(/^\*\*([a-z0-9-]+)\*\* · (.+)$/)
    if (!cab) throw new Error(`${donde}: esperaba una pregunta y hay «${l.slice(0, 60)}»`)
    const id = cab[1]
    const opciones = []
    let j = i + 1
    for (const letra of "ABCD") {
      const op = cuerpo[j]?.match(/^- ([A-D])\) (.+)$/)
      if (!op || op[1] !== letra) throw new Error(`${id}: esperaba la opción ${letra}, hay «${cuerpo[j]}»`)
      opciones.push(texto(op[2]))
      j++
    }
    if (/^- [A-Z]\) /.test(cuerpo[j] ?? "")) throw new Error(`${id}: tiene más de cuatro opciones`)
    const clave = cuerpo[j]?.match(/^\*\*Correcta:\*\* ([A-D]) · \*\*Tema:\*\* (C\d\d) · \*\*Referencia:\*\* (.+)$/)
    if (!clave) throw new Error(`${id}: esperaba «**Correcta:** X · **Tema:** Cnn · **Referencia:** …», hay «${cuerpo[j]}»`)
    j++
    const expl = cuerpo[j]?.match(/^\*\*Explicación:\*\* (.+)$/)
    if (!expl) throw new Error(`${id}: esperaba la explicación, hay «${cuerpo[j]}»`)
    j++
    preguntas.push({
      id,
      enunciado: texto(cab[2]),
      opciones,
      correcta: LETRA[clave[1]],
      tema: clave[2],
      explicacion: texto(expl[1]),
      referencia: texto(clave[3]),
    })
    i = j
  }
  return preguntas
}

// ─── Escenarios (capítulo 23) ───────────────────────────────────────────────

/**
 * Un escenario: situación, pregunta y razonamiento. El razonamiento puede ser
 * un párrafo (va a `respuesta`), una lista (va a `claves`) o los dos. Lo que
 * sobre después es un escenario con otra forma, y el script para.
 */
function leerEscenario(titulo, cuerpo, ctx) {
  const cab = titulo.match(/^Escenario (\d+) · (.+)$/)
  if (!cab) throw new Error(`C23: apartado inesperado «${titulo}»`)
  const n = Number(cab[1])
  const donde = `Escenario ${n}`

  const campo = (desde, rotulo) => {
    const k = siguienteNoVacia(cuerpo, desde)
    const l = cuerpo[k] ?? ""
    if (!l.startsWith(`**${rotulo}**`)) throw new Error(`${donde}: esperaba «**${rotulo}**», hay «${l.slice(0, 60)}»`)
    const p = leerParrafo(cuerpo, k)
    return { texto: limpiar(p.texto.slice(rotulo.length + 4)), siguiente: p.siguiente }
  }

  const situacion = campo(0, "Situación.")
  const pregunta = campo(situacion.siguiente, "Pregunta.")
  const k = siguienteNoVacia(cuerpo, pregunta.siguiente)
  const rotulo = (cuerpo[k] ?? "").match(/^\*\*(Razonamiento(?: operacional)?\.)\*\*/)
  if (!rotulo) throw new Error(`${donde}: esperaba «**Razonamiento.**», hay «${cuerpo[k]}»`)
  const razonamiento = campo(k, rotulo[1])

  let claves = []
  let fin = siguienteNoVacia(cuerpo, razonamiento.siguiente)
  if (/^- /.test(cuerpo[fin] ?? "")) {
    const lista = leerLista(cuerpo, fin, false, donde)
    claves = lista.items
    fin = siguienteNoVacia(cuerpo, lista.siguiente)
  }
  while (fin < cuerpo.length && /^---+$/.test(cuerpo[fin].trim())) fin = siguienteNoVacia(cuerpo, fin + 1)
  if (fin < cuerpo.length) throw new Error(`${donde}: sobra «${cuerpo[fin].slice(0, 60)}» después del razonamiento`)

  const clave = `esc-${pad(n)}`
  ctx.escenarios.push(clave)
  return {
    kind: "piensaComoPiloto",
    momento: `Escenario ${n} · ${limpiar(cab[2])}`,
    rotulo: "Escenario de práctica",
    situacion: situacion.texto,
    pregunta: pregunta.texto,
    ...(razonamiento.texto ? { respuesta: razonamiento.texto } : {}),
    claves,
    // Pedir la respuesta cuenta como práctica hecha.
    clave,
  }
}

// ─── Lectura del documento ──────────────────────────────────────────────────

/** Los títulos van en versales en el documento; en la app, en caja normal. */
function cajaNormal(texto) {
  if (texto !== texto.toUpperCase()) return texto
  const bajo = texto
    .split(" ")
    .map((w) => (SIGLAS.has(w) ? w : w.toLowerCase()))
    .join(" ")
  return bajo.charAt(0).toUpperCase() + bajo.slice(1)
}

const nivel1 = partir(lineas, /^# (.+)$/)
const documento = nivel1[0]
const quizFinal = nivel1.find((t) => t.titulo === "QUIZ FINAL DE GESTIÓN DEL COMBUSTIBLE")
const anexoFiguras = nivel1.find((t) => /^ANEXO A · FIGURAS/.test(t.titulo))
if (!documento || !quizFinal || !anexoFiguras) throw new Error("falta el cuerpo, el quiz final o el Anexo A")

const nivel2 = partir(documento.cuerpo, /^## (.+)$/)

const ctx = { n: 0, huecos: [], dibujadas: [], escenarios: [] }
const lecciones = []
const practica = []
let ficha = null
let cierre = null
let errores = null

for (const t of nivel2) {
  if (t.titulo === "Contenido completo del módulo (fuente para implementación)") continue
  if (t.titulo === "0. FICHA DEL MÓDULO") {
    ficha = t
    continue
  }
  if (t.titulo === "LO QUE DEBES RECORDAR SOBRE GESTIÓN DEL COMBUSTIBLE") {
    cierre = t
    continue
  }
  if (t.titulo === "ERRORES COMUNES") {
    errores = t
    continue
  }
  const cab = t.titulo.match(/^(\d+)\. (.+)$/)
  if (!cab) throw new Error(`apartado de segundo nivel inesperado: «${t.titulo}»`)
  const n = Number(cab[1])
  ctx.n = n

  const inicio = siguienteNoVacia(t.cuerpo, 0)
  const id = t.cuerpo[inicio]?.match(/^\*\*ID:\*\* (C\d\d) · \*\*Tiempo:\*\* (\d+) min$/)
  if (!id) throw new Error(`capítulo ${n}: falta la línea «**ID:** Cnn · **Tiempo:** N min»`)
  if (id[1] !== `C${pad(n)}`) throw new Error(`capítulo ${n}: su ID es ${id[1]}`)
  const cuerpo = t.cuerpo.slice(inicio + 1)

  const parte = [...PARTES].reverse().find((p) => n >= p.desde)
  const title = cajaNormal(cab[2].trim())
  const blocks = [...bloquesDe(preambulo(cuerpo, /^### /), ctx)]
  const vistos = []

  for (const a of partir(cuerpo, /^### (.+)$/)) {
    if (n === ESPERADO.capitulos) {
      blocks.push(leerEscenario(a.titulo, a.cuerpo, ctx))
      continue
    }
    const quiz = a.titulo.match(/^Quiz · Capítulo (\d+)$/)
    if (quiz) {
      if (Number(quiz[1]) !== n) throw new Error(`capítulo ${n}: trae el quiz del capítulo ${quiz[1]}`)
      practica.push({
        tema: `C${pad(n)}`,
        n,
        titulo: title,
        preguntas: leerPreguntas(a.cuerpo, `quiz C${pad(n)}`, limpiar),
      })
      continue
    }
    if (!APARTADOS.includes(a.titulo)) throw new Error(`capítulo ${n}: apartado fuera de la plantilla «${a.titulo}»`)
    vistos.push(a.titulo)
    blocks.push({ kind: "titulo", text: a.titulo })
    blocks.push(...bloquesDe(a.cuerpo, ctx))
  }

  if (n < ESPERADO.capitulos && vistos.join("|") !== APARTADOS.join("|")) {
    throw new Error(`capítulo ${n}: apartados ${vistos.join(", ")}; esperaba ${APARTADOS.join(", ")}`)
  }

  lecciones.push({ n, title, kicker: parte.titulo.split(" · ")[1], minutes: Number(id[2]), blocks })
}

// La ficha: sus tres apartados útiles abren la lección 1.
if (!ficha) throw new Error("no encuentro la ficha del módulo")
{
  ctx.n = 1
  const apartados = partir(ficha.cuerpo, /^### (.+)$/)
  for (const a of apartados) {
    if (!FICHA_UTIL.includes(a.titulo) && !FICHA_FUERA.includes(a.titulo)) {
      throw new Error(`ficha: apartado nuevo «${a.titulo}»; decide si entra (FICHA_UTIL) o no (FICHA_FUERA)`)
    }
  }
  const inicio = []
  for (const titulo of FICHA_UTIL) {
    const a = apartados.find((x) => x.titulo === titulo)
    if (!a) throw new Error(`ficha: falta «${titulo}»`)
    inicio.push({ kind: "sub", text: titulo }, ...bloquesDe(a.cuerpo, ctx))
  }
  const primera = lecciones.find((l) => l.n === 1)
  if (!primera) throw new Error("no encuentro el capítulo 1")
  primera.blocks = [...inicio, ...primera.blocks]
}

// El cierre y los errores comunes, al final de la 23.
if (!cierre || !errores) throw new Error("falta «Lo que debes recordar…» o «Errores comunes»")
{
  ctx.n = ESPERADO.capitulos
  const ultima = lecciones.find((l) => l.n === ESPERADO.capitulos)
  if (!ultima) throw new Error(`no encuentro el capítulo ${ESPERADO.capitulos}`)
  ultima.blocks.push({ kind: "titulo", text: cajaNormal(cierre.titulo) }, ...bloquesDe(cierre.cuerpo, ctx))
  ultima.blocks.push({ kind: "titulo", text: cajaNormal(errores.titulo) }, ...bloquesDe(errores.cuerpo, ctx))
}

lecciones.sort((a, b) => a.n - b.n)

// El banco del quiz final: desde la primera pregunta, lo de antes es su ficha.
const cabeceraQuiz = quizFinal.cuerpo.join("\n")
const porIntento = cabeceraQuiz.match(/\*\*Por intento:\*\* (\d+) al azar/)
if (!porIntento) throw new Error("quiz final: no dice cuántas preguntas van por intento")
const primeraEv = quizFinal.cuerpo.findIndex((l) => /^\*\*ev-\d\d\*\* · /.test(l))
if (primeraEv < 0) throw new Error("quiz final: no encuentro ev-01")
const banco = leerPreguntas(quizFinal.cuerpo.slice(primeraEv), "quiz final", (s) => s.trim())

// Las figuras que promete el Anexo A, para cruzarlas con los huecos.
const figurasAnexo = []
for (const l of anexoFiguras.cuerpo) {
  const m = l.match(/^\| (IMG-C\d\d) \| C\d\d \| .+ \| (\d+ × \d+) \|$/)
  if (m) figurasAnexo.push({ codigo: m[1], formato: m[2] })
}

// ─── Comprobaciones ─────────────────────────────────────────────────────────

const fallos = []
const comprobar = (cond, mensaje) => {
  if (!cond) fallos.push(mensaje)
}

/** Todas las cadenas de un valor, recorriendo lo anidado. */
function* textos(v) {
  if (typeof v === "string") yield v
  else if (Array.isArray(v)) for (const x of v) yield* textos(x)
  else if (v && typeof v === "object") for (const x of Object.values(v)) yield* textos(x)
}

/** Todos los bloques, incluidos los que van dentro de otro. */
function* bloquesTodos(bs) {
  for (const b of bs) {
    yield b
    if (Array.isArray(b.bloques)) yield* bloquesTodos(b.bloques)
  }
}

const normal = (s) => s.toLowerCase().replace(/\s+/g, " ").trim()

comprobar(lecciones.length === ESPERADO.capitulos, `capítulos: ${lecciones.length}, esperaba ${ESPERADO.capitulos}`)
lecciones.forEach((l, k) => {
  comprobar(l.n === k + 1, `la lección en la posición ${k + 1} dice ser la ${l.n}`)
  comprobar(Boolean(l.title) && l.title !== l.title.toUpperCase(), `la lección ${l.n} no tiene título en caja normal`)
  comprobar(l.minutes > 0, `la lección ${l.n} no trae minutos`)
  comprobar(l.blocks.length > 2, `la lección ${l.n} tiene ${l.blocks.length} bloques`)
  for (const b of bloquesTodos(l.blocks)) {
    comprobar(b.kind !== "ponAPrueba", `la lección ${l.n} trae un ponAPrueba: en la lectura no se pregunta`)
    if (b.kind === "p") {
      comprobar(b.text.trim() !== "", `la lección ${l.n} tiene un párrafo vacío`)
      comprobar(!empiezaBloque(b.text), `la lección ${l.n}: párrafo con marca de bloque «${b.text.slice(0, 40)}»`)
    }
    if (b.kind === "list" || b.kind === "vinetas") {
      comprobar(b.items.every((x) => x.trim() !== ""), `la lección ${l.n} tiene un ítem de lista vacío`)
    }
  }
  for (const s of textos(l.blocks)) {
    comprobar(!/\bc\d\d-q\d\b|\*\*Correcta:\*\*/.test(s), `la lección ${l.n} trae texto del quiz: «${s.slice(0, 50)}»`)
  }
})

comprobar(ctx.huecos.length === ESPERADO.huecos, `huecos de imagen: ${ctx.huecos.length}, esperaba ${ESPERADO.huecos}`)
fallos.push(...fallosFiguras)
const sinHueco = FIGURAS.filter((f) => !ctx.dibujadas.includes(f.codigo)).map((f) => f.codigo)
comprobar(sinHueco.length === 0, `figuras dibujadas sin hueco en el documento: ${sinHueco.join(", ")}`)
comprobar(new Set(ctx.huecos.map((h) => h.codigo)).size === ctx.huecos.length, "hay dos huecos en un mismo capítulo")
comprobar(
  JSON.stringify(ctx.huecos.map((h) => [h.codigo, h.formato])) === JSON.stringify(figurasAnexo.map((f) => [f.codigo, f.formato])),
  `los huecos no cuadran con el Anexo A: ${ctx.huecos.map((h) => `${h.codigo} ${h.formato}`).join(", ")}`,
)

comprobar(ctx.escenarios.length === ESPERADO.escenarios, `escenarios: ${ctx.escenarios.length}, esperaba ${ESPERADO.escenarios}`)
for (const l of lecciones) {
  for (const b of bloquesTodos(l.blocks)) {
    if (b.kind !== "piensaComoPiloto") continue
    comprobar(b.situacion && b.pregunta, `${b.clave}: le falta la situación o la pregunta`)
    comprobar(Boolean(b.respuesta) || b.claves.length > 0, `${b.clave}: el botón no tendría nada detrás`)
  }
}

comprobar(practica.length === ESPERADO.capitulos - 1, `grupos de práctica: ${practica.length}, esperaba ${ESPERADO.capitulos - 1}`)
const preguntasPractica = practica.flatMap((g) => g.preguntas)
comprobar(preguntasPractica.length === ESPERADO.practica, `preguntas de práctica: ${preguntasPractica.length}, esperaba ${ESPERADO.practica}`)
for (const g of practica) {
  comprobar(g.preguntas.length === ESPERADO.porCapitulo, `${g.tema}: ${g.preguntas.length} preguntas`)
  g.preguntas.forEach((p, k) => {
    comprobar(p.id === `c${pad(g.n)}-q${k + 1}`, `${g.tema}: la pregunta ${k + 1} se llama ${p.id}`)
    comprobar(p.tema === g.tema, `${p.id}: dice ser del tema ${p.tema}`)
  })
}

comprobar(banco.length === ESPERADO.banco, `banco: ${banco.length}, esperaba ${ESPERADO.banco}`)
banco.forEach((p, k) => {
  comprobar(p.id === `ev-${pad(k + 1)}`, `banco: la pregunta ${k + 1} se llama ${p.id}`)
  const cap = Number(p.tema.slice(1))
  comprobar(cap >= 1 && cap < ESPERADO.capitulos, `${p.id}: tema ${p.tema} fuera de los capítulos con quiz`)
})

for (const p of [...preguntasPractica, ...banco]) {
  comprobar(p.opciones.length === 4, `${p.id}: ${p.opciones.length} opciones`)
  comprobar(new Set(p.opciones).size === 4, `${p.id}: opciones repetidas`)
  comprobar(Number.isInteger(p.correcta) && p.correcta >= 0 && p.correcta <= 3, `${p.id}: correcta fuera de rango`)
  comprobar(p.enunciado && p.explicacion && p.referencia, `${p.id}: le falta enunciado, explicación o referencia`)
}

const ids = [...preguntasPractica.map((p) => p.id), ...banco.map((p) => p.id), ...ctx.escenarios]
comprobar(new Set(ids).size === ids.length, "hay ids repetidos entre práctica, banco y escenarios")

const delBanco = new Set(banco.map((p) => normal(p.enunciado)))
for (const p of preguntasPractica) {
  if (p.enunciado.length >= 40) comprobar(!delBanco.has(normal(p.enunciado)), `${p.id} repite un enunciado del banco`)
}

for (const s of textos([lecciones, practica, banco])) {
  comprobar(!s.includes("—"), `raya larga en «${s.slice(0, 60)}»: van paréntesis o comillas angulares`)
  const sinNegrita = s.replace(/\*\*[^*]+\*\*/g, "")
  comprobar(!sinNegrita.includes("*"), `asterisco suelto (marca sin cerrar) en «${s.slice(0, 60)}»`)
}

// CLAUDE.md: la raya larga no va en el contenido; van paréntesis o comillas
// angulares. Se revisa el documento entero para que no llegue a la app.
{
  const conRaya = bruto.split("\n")
    .map((l, i) => [i + 1, l])
    .filter(([, l]) => l.includes("\u2014"))
  for (const [n, l] of conRaya.slice(0, 5)) {
    fallos.push(`raya larga en la línea ${n}: «${l.trim().slice(0, 60)}…»`)
  }
  if (conRaya.length > 5) fallos.push(`… y ${conRaya.length - 5} líneas más con raya larga`)
}

if (fallos.length) {
  console.error("No se escribió nada:")
  for (const f of fallos) console.error(`  · ${f}`)
  process.exit(1)
}

// ─── Escritura ──────────────────────────────────────────────────────────────

const j = (v) => JSON.stringify(v, null, 2)
const AVISO = `// GENERADO por scripts/combustible/convertir.mjs desde
// docs/contenido/gestion-combustible.md. No se edita a mano: se edita el
// documento y se vuelve a correr el script.
`

fs.writeFileSync(
  DESTINO_LECCION,
  `${AVISO}
/**
 * Los veintitrés capítulos de Gestión del combustible, en el formato del
 * lector de lecciones.
 *
 * El contenido es de docs/contenido/gestion-combustible.md (versión 1.0 del
 * 24 de septiembre de 2026), con sus fuentes en el Anexo C del documento.
 *
 * En la lectura no se pregunta nada: el quiz de cada capítulo está en
 * combustiblePractica.ts y el final, en el servidor. Los diez escenarios del
 * capítulo 23 sí van aquí, con su clave: pedir el análisis cuenta como
 * práctica.
 *
 * Las quince figuras entran como huecos rotulados: el módulo se lee completo
 * y cada hueco dice qué imagen falta y qué tiene que enseñar.
 */

import type { DocScreen } from "@/lib/docBlocks"
import type { LectorNivel } from "@/components/lesson/LectorLeccion"

/**
 * Las tres partes, con el capítulo en el que empieza cada una. Se generan con
 * las lecciones para que no puedan desfasarse del documento.
 */
export const CB_NIVELES: LectorNivel[] = ${j(PARTES)}

export const CB_LECCIONES: DocScreen[] = ${j(lecciones)}

// La numeración es la que se guarda como progreso: si el documento se
// desordena, mejor caerse al arrancar que marcar leído el capítulo equivocado.
CB_LECCIONES.forEach((s, i) => {
  if (s.n !== i + 1) throw new Error(\`combustibleLeccion: el capítulo \${s.n} está en la posición \${i + 1}\`)
})

export const CB_LECCION_TOTAL = CB_LECCIONES.length
export const CB_MINUTOS = CB_LECCIONES.reduce((t, s) => t + s.minutes, 0)

/**
 * Los huecos de figura que quedan por llenar, para el inventario de imágenes.
 * Las dibujadas son SVG de public/modulos/combustible/ (node
 * scripts/figuras/dibujar.mjs combustible).
 */
export const CB_FIGURAS_PENDIENTES: string[] = ${j(ctx.huecos.filter((h) => !ctx.dibujadas.includes(h.codigo)).map((h) => h.rotulo))}

/** Las claves de los diez escenarios del capítulo 23, que cuentan como práctica. */
export const CB_ESCENARIO_CLAVES: string[] = ${j(ctx.escenarios)}
`,
  "utf8",
)

fs.writeFileSync(
  DESTINO_PRACTICA,
  `${AVISO}
/**
 * La práctica de Gestión del combustible: las tres preguntas del quiz de cada
 * capítulo, del 1 al 22, con corrección inmediata.
 *
 * No son las del quiz final, que viven en el servidor
 * (contenido/bancos/combustible_evaluacion.json); el conversor comprueba que
 * ningún enunciado de aquí repita uno de allá.
 */

import type { GrupoPractica } from "@/lib/practicaQuiz"

export const CB_PRACTICA: GrupoPractica[] = ${j(
    practica.map((g) => ({
      tema: g.tema,
      n: g.n,
      titulo: g.titulo,
      preguntas: g.preguntas.map((p) => ({
        id: p.id,
        enunciado: p.enunciado,
        opciones: p.opciones,
        correcta: p.correcta,
        explicacion: p.explicacion,
        referencia: p.referencia,
      })),
    })),
  )}

/**
 * Las claves de práctica del módulo: las sesenta y seis preguntas de capítulo
 * y los diez escenarios del capítulo 23 (combustibleLeccion.ts). Son las que
 * guarda el progreso y valida el catálogo.
 */
export const CB_PRACTICA_CLAVES: string[] = ${j([...preguntasPractica.map((p) => p.id), ...ctx.escenarios])}
`,
  "utf8",
)

fs.writeFileSync(
  DESTINO_BANCO,
  j({
    banco: "combustible_evaluacion",
    descripcion: `Quiz final de Gestión del combustible. Cada intento toma ${porIntento[1]} al azar.`,
    preguntas: banco.map((p) => ({
      id: p.id,
      enunciado: p.enunciado,
      opciones: p.opciones,
      correcta: p.correcta,
      explicacion: p.explicacion,
      referencia: p.referencia,
      metadatos: { tema: p.tema, capitulo: Number(p.tema.slice(1)) },
    })),
  }) + "\n",
  "utf8",
)

const minutos = lecciones.reduce((t, l) => t + l.minutes, 0)
console.log(`capítulos: ${lecciones.length} · ${minutos} min`)
console.log(`partes: ${PARTES.map((p) => `${p.titulo} (desde ${p.desde})`).join(" · ")}`)
console.log(`figuras: ${ctx.dibujadas.length} · huecos de imagen: ${ctx.huecos.length - ctx.dibujadas.length} · escenarios: ${ctx.escenarios.length}`)
console.log(`práctica: ${practica.length} grupos, ${preguntasPractica.length} preguntas · claves: ${preguntasPractica.length + ctx.escenarios.length}`)
console.log(`banco: ${banco.length}`)
for (const a of avisos) console.log(`aviso: ${a}`)
console.log(`escrito ${[DESTINO_LECCION, DESTINO_PRACTICA, DESTINO_BANCO].map((d) => path.relative(RAIZ, d)).join(", ")}`)
