#!/usr/bin/env node
/**
 * Convierte docs/contenido/aerodinamica.md en el contenido tipado del módulo.
 *
 *   node scripts/aerodinamica/convertir.mjs
 *
 * El documento es la fuente: aquí no se reescribe ni se resume nada, solo se
 * traduce su estructura a los bloques que ya usa el lector de lecciones. Si el
 * documento cambia, se vuelve a correr y las pruebas dicen si algo se salió de
 * su sitio.
 *
 * Genera tres archivos:
 *
 *   src/lib/aerodinamicaLeccion.ts        las doce secciones, como DocScreen[]
 *   src/lib/aerodinamicaPractica.ts       13 escenarios y 49 preguntas de entrevista
 *   contenido/bancos/aerodinamica_evaluacion.json   las 40 del quiz final
 *
 * Cómo se traduce cada marca del documento:
 *
 *   ###  título                       sub
 *   párrafo                           p
 *   - lista                           vinetas (hasta 5) o list
 *   1. lista                          list ordenada
 *   | tabla |                         table
 *   **APLICACIÓN OPERACIONAL**        enLaOperacion, con sus viñetas en `pasos`
 *   > **DEBES RECORDAR** / PUNTO CLAVE  callout tone tip, con su rótulo
 *   **PREGUNTA DE ENTREVISTA** · *q*  detalleTecnico: la pregunta a la vista,
 *                                     la respuesta al desplegar
 *   [IMAGEN — …] · `IMG-xx`           figura didáctica, con alt y pie
 *   **ESQUEMA** + ```…```             code (el de S11 lleva su propio visual)
 *   ### Quiz · Sección N              ponAPrueba, al cierre de la sección
 *
 * Las letras de las respuestas (A, B, C, D) se convierten a índice desde 0,
 * que es como las guarda banco_preguntas.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const FUENTE = path.join(RAIZ, "docs/contenido/aerodinamica.md")

const CUENTAS_ESPERADAS = { secciones: 12, quiz: 45, escenarios: 13, entrevista: 49, banco: 40, imagenes: 24 }

/**
 * El rótulo corto de cada sección.
 *
 * El documento no trae uno: trae el objetivo, que es una frase entera y en el
 * lector se sale de su renglón. Estas son etiquetas de navegación, sacadas del
 * asunto de cada sección; el objetivo no se pierde, entra como primer párrafo.
 */
const ROTULOS = {
  S01: "El vocabulario físico",
  S02: "Cómo se equilibran",
  S03: "De dónde sale la sustentación",
  S04: "La pérdida es de ángulo",
  S05: "Parásita, inducida y L/D",
  S06: "Lo que cambia al virar",
  S07: "Qué mueve cada mando",
  S08: "Dónde va el peso",
  S09: "Lo que se ve en vuelo",
  S10: "Compresibilidad y ondas de choque",
  S11: "El margen que se estrecha",
  S12: "High, hot y heavy",
}

const FIGURAS = {
  "IMG-01": ["img-01-viento-relativo.webp", "Dos aviones comparan trayectoria, actitud y viento relativo en vuelo nivelado y en descenso"],
  "IMG-02": ["img-02-cuatro-fuerzas.webp", "Vectores de sustentación, peso, empuje y resistencia en vuelo nivelado y ascenso estabilizado"],
  "IMG-03": ["img-03-perfil-aerodinamico.webp", "Perfil aerodinámico con cuerda, ángulo de ataque, presiones, viento relativo y sustentación"],
  "IMG-04": ["img-04-curva-sustentacion.webp", "Curvas de coeficiente de sustentación frente al ángulo de ataque para ala limpia, flaps y slats"],
  "IMG-05": ["img-05-curva-resistencia.webp", "Curvas de resistencia inducida, parásita y total con el punto de máxima eficiencia"],
  "IMG-06": ["img-06-factor-carga.webp", "Sustentación inclinada en un viraje y curva del factor de carga según el alabeo"],
  "IMG-07": ["img-07-superficies-control.webp", "Vista superior de un avión con alerones, flaps, slats, spoilers, elevador y timón señalados por color"],
  "IMG-08": ["img-08-centro-gravedad.webp", "Comparación de fuerzas y estabilidad con el centro de gravedad adelantado y atrasado"],
  "IMG-09": ["img-09-fenomenos-operacionales.webp", "Comparación entre el efecto suelo y la oscilación acoplada del Dutch Roll"],
  "IMG-10": ["img-10-mach-ala-flecha.webp", "Perfil transónico con onda de choque y descomposición de velocidad sobre un ala en flecha"],
  "IMG-11": ["img-11-coffin-corner.webp", "Envolvente de altitud y Mach donde convergen los límites de buffet de baja y alta velocidad"],
  "IMG-12": ["img-12-densidad-performance.webp", "Cadena causal de alta elevación, temperatura y peso sobre velocidad y distancia de pista"],
  "IMG-13": ["img-13-actitud-trayectoria.webp", "Comparación entre actitud, trayectoria de vuelo y viento relativo en dos condiciones de vuelo"],
  "IMG-14": ["img-14-pitch-energia.webp", "Relación operativa entre actitud de cabeceo, empuje, velocidad y altura"],
  "IMG-15": ["img-15-variables-sustentacion.webp", "Variables de la ecuación de sustentación explicadas con escenas y anotaciones aerodinámicas"],
  "IMG-16": ["img-16-recuperacion-perdida.webp", "Secuencia visual para recuperar una pérdida reduciendo primero el ángulo de ataque"],
  "IMG-17": ["img-17-planeo-ld.webp", "Relación de planeo, máximo L sobre D y efectos del peso y el viento"],
  "IMG-18": ["img-18-va-turbulencia.webp", "Relación entre velocidad de maniobra, peso y velocidad publicada para turbulencia"],
  "IMG-19": ["img-19-configuracion-ala.webp", "Comparación fotográfica de ala limpia, configuración de despegue, aterrizaje y spoilers"],
  "IMG-20": ["img-20-estabilidad-dinamica.webp", "Comparación entre estabilidad estática y respuesta dinámica con el tiempo"],
  "IMG-21": ["img-21-dutch-roll-espiral.webp", "Comparación visual del Dutch Roll y la inestabilidad espiral"],
  "IMG-22": ["img-22-ala-flecha-mach.webp", "Componente normal del flujo, Mach crítico y compromisos del ala en flecha"],
  "IMG-23": ["img-23-recuperacion-altura.webp", "Secuencia de recuperación de energía a gran altitud con pérdida de altura aceptada"],
  "IMG-24": ["img-24-velocidades-ias-tas-gs.webp", "Relación entre IAS, CAS, EAS, TAS y velocidad sobre el suelo"],
}

/**
 * Los títulos del documento van en versales porque son encabezados de Markdown.
 * En la app son títulos de página: se pasan a caja normal sin tocar una palabra,
 * conservando los nombres propios que sí llevan mayúscula.
 */
const PROPIOS = ["Mach", "Coffin Corner"]

function cajaDeTitulo(bruto) {
  let s = bruto.charAt(0) + bruto.slice(1).toLocaleLowerCase("es")
  for (const p of PROPIOS) {
    s = s.replace(new RegExp(p, "gi"), p)
  }
  return s
}

/** El esquema de S11 se pinta con un componente, no con texto monoespaciado. */
const ESQUEMA_VISUAL = "aero-margen-velocidad"

const bruto = fs.readFileSync(FUENTE, "utf8").replace(/\r\n/g, "\n")
const lineas = bruto.split("\n")

// ─── Utilidades de lectura ──────────────────────────────────────────────────

/** Los tramos de primer nivel del documento: `# TÍTULO` y lo que va debajo. */
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

const LETRA = { A: 0, B: 1, C: 2, D: 3 }

/**
 * Lee un bloque de opción múltiple a partir de la línea del enunciado.
 * Devuelve la pregunta y en qué línea sigue el documento.
 */
function leerPregunta(cuerpo, i, idEsperado) {
  const cab = cuerpo[i].match(/^\*\*([a-z0-9-]+)\*\* · (.+)$/)
  if (!cab) throw new Error(`línea ${i}: esperaba el enunciado de una pregunta, hay «${cuerpo[i]}»`)
  const id = cab[1]
  if (idEsperado && id !== idEsperado) throw new Error(`esperaba ${idEsperado} y encontré ${id}`)

  const opciones = []
  let j = i + 1
  while (j < cuerpo.length && /^- [A-D]\) /.test(cuerpo[j])) {
    opciones.push(cuerpo[j].slice(5).trim())
    j++
  }
  const correcta = cuerpo[j]?.match(/^\*\*Correcta:\*\* ([A-D]) · \*\*Tema:\*\* (S\d\d)$/)
  if (!correcta) throw new Error(`${id}: esperaba «**Correcta:** X · **Tema:** Sxx», hay «${cuerpo[j]}»`)
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
      tema: correcta[2],
      explicacion: expl[1].trim(),
    },
    siguiente: j,
  }
}

/** Una tabla de Markdown a partir de su primera línea. */
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

/** Un bloque cercado ```…```, sin las cercas. */
function leerCerca(cuerpo, i) {
  let j = i + 1
  const dentro = []
  while (j < cuerpo.length && !cuerpo[j].startsWith("```")) {
    dentro.push(cuerpo[j])
    j++
  }
  return { texto: dentro.join("\n"), siguiente: j + 1 }
}

/** Párrafo: líneas seguidas hasta un vacío o el principio de otro bloque. */
function finDeParrafo(cuerpo, i) {
  let j = i
  while (
    j < cuerpo.length &&
    cuerpo[j].trim() !== "" &&
    !/^#{2,4} /.test(cuerpo[j]) &&
    !/^[->|] /.test(cuerpo[j]) &&
    !cuerpo[j].startsWith("|") &&
    !cuerpo[j].startsWith("```") &&
    !cuerpo[j].startsWith("---") &&
    !/^\d+\. /.test(cuerpo[j]) &&
    !/^\*\*(CONCEPTO|APLICACIÓN OPERACIONAL|ESQUEMA|PREGUNTA DE ENTREVISTA|ESCENARIO|Preguntas|Análisis|Temas:)\*\*/.test(cuerpo[j]) &&
    !/^\[IMAGEN/.test(cuerpo[j])
  ) {
    j++
  }
  return j
}

/** Viñetas seguidas, del mismo tipo. */
function leerLista(cuerpo, i, ordenada) {
  const marca = ordenada ? /^\d+\. / : /^- /
  // Las viñetas anidadas («  - ») entran en la misma lista: el catálogo de
  // bloques no tiene listas de dos niveles, y en el único sitio donde el
  // documento las usa (los spoilers de la sección 7) la viñeta madre es solo
  // un rótulo, así que sus hijas se leen igual de bien al mismo nivel.
  const hija = ordenada ? /^\s+\d+\. / : /^\s+- /
  const items = []
  let j = i
  while (j < cuerpo.length && (marca.test(cuerpo[j]) || hija.test(cuerpo[j]))) {
    items.push(cuerpo[j].replace(marca, "").replace(hija, "").trim())
    j++
  }
  return { items, siguiente: j }
}

// ─── El cuerpo de una sección, bloque a bloque ──────────────────────────────

function bloquesDeSeccion(cuerpo, idSeccion) {
  const bloques = []
  let i = 0

  const empujarParrafo = (texto) => {
    if (texto.trim()) bloques.push({ kind: "p", text: texto.trim() })
  }

  while (i < cuerpo.length) {
    const l = cuerpo[i]

    if (l.trim() === "" || l.startsWith("---")) {
      i++
      continue
    }

    // `CONCEPTO` no pinta nada: marca que lo que sigue es texto principal.
    if (/^\*\*CONCEPTO\*\*/.test(l)) {
      i++
      continue
    }

    // Las notas al implementador no son contenido del curso: dicen cómo pintar
    // el bloque de arriba, y ese bloque ya está pintado.
    if (/^\*Implementación sugerida:\*/.test(l)) {
      i = finDeParrafo(cuerpo, i)
      continue
    }

    const sub = l.match(/^### (.+)$/)
    if (sub) {
      bloques.push({ kind: "sub", text: sub[1].trim() })
      i++
      continue
    }

    // Aplicación operacional: párrafos y, si las trae, sus viñetas.
    if (/^\*\*APLICACIÓN OPERACIONAL\*\*/.test(l)) {
      i++
      const parrafos = []
      let pasos
      while (i < cuerpo.length && cuerpo[i].trim() !== "") {
        if (/^- /.test(cuerpo[i])) {
          const lista = leerLista(cuerpo, i, false)
          pasos = lista.items
          i = lista.siguiente
        } else {
          const fin = finDeParrafo(cuerpo, i)
          if (fin === i) break
          parrafos.push(cuerpo.slice(i, fin).join(" ").trim())
          i = fin
        }
      }
      bloques.push({
        kind: "enLaOperacion",
        momento: "Aplicación operacional",
        texto: parrafos.join("\n\n"),
        ...(pasos ? { pasos } : {}),
      })
      continue
    }

    // Debes recordar / Punto clave: van citados con «>».
    const recordar = l.match(/^> \*\*(DEBES RECORDAR|PUNTO CLAVE)\*\*$/)
    if (recordar) {
      i++
      const dentro = []
      while (i < cuerpo.length && cuerpo[i].startsWith("> ")) {
        dentro.push(cuerpo[i].slice(2).trim())
        i++
      }
      bloques.push({
        kind: "callout",
        tone: "tip",
        title: recordar[1] === "PUNTO CLAVE" ? "Punto clave" : "Debes recordar",
        text: dentro.join(" "),
      })
      continue
    }

    // Pregunta de entrevista dentro de la lección: pregunta a la vista,
    // respuesta al desplegar. El documento la escribe de dos maneras, con la
    // pregunta en la misma línea o en la siguiente.
    if (/^\*\*PREGUNTA DE ENTREVISTA\*\*/.test(l)) {
      const enLinea = l.match(/^\*\*PREGUNTA DE ENTREVISTA\*\* · \*(.+)\*$/)
      i++
      let etiqueta
      if (enLinea) {
        etiqueta = enLinea[1].trim()
      } else {
        const aparte = cuerpo[i]?.match(/^\*(.+)\*$/)
        if (!aparte) throw new Error(`${idSeccion}: pregunta de entrevista sin pregunta, hay «${cuerpo[i]}»`)
        etiqueta = aparte[1].trim()
        i++
      }
      const fin = finDeParrafo(cuerpo, i)
      bloques.push({
        kind: "detalleTecnico",
        etiqueta,
        bloques: [{ kind: "p", text: cuerpo.slice(i, fin).join(" ").trim() }],
      })
      i = fin
      continue
    }

    // Esquema: el de S11 tiene componente propio; los demás van en monoespaciado.
    if (/^\*\*ESQUEMA\*\*/.test(l)) {
      const nota = l.replace(/^\*\*ESQUEMA\*\*\s*·?\s*/, "").trim()
      i++
      if (idSeccion === "S11") {
        bloques.push({ kind: "interactivo", nombre: ESQUEMA_VISUAL })
        // Se saltan las cercas del documento: las sustituye el componente.
        while (i < cuerpo.length && !/^\*|^###|^\[IMAGEN/.test(cuerpo[i])) {
          if (cuerpo[i].startsWith("```")) i = leerCerca(cuerpo, i).siguiente
          else i++
        }
        continue
      }
      if (nota && !nota.startsWith("(")) empujarParrafo(nota)
      while (i < cuerpo.length && cuerpo[i].trim() === "") i++
      if (cuerpo[i]?.startsWith("```")) {
        const cerca = leerCerca(cuerpo, i)
        bloques.push({ kind: "code", text: cerca.texto, grande: true, tabular: true })
        i = cerca.siguiente
      }
      continue
    }

    // Imagen: figura didáctica renderizada, con dimensiones estables y pie.
    const imagen = l.match(/^\[IMAGEN — (.+)\] · `(IMG-\d\d)`$/)
    if (imagen) {
      i++
      let pie = ""
      const m = cuerpo[i]?.match(/^\*Pie:\* (.+)$/)
      if (m) {
        pie = m[1].trim()
        i++
      }
      const meta = FIGURAS[imagen[2]]
      if (!meta) throw new Error(`${imagen[2]}: falta metadato de figura`)
      bloques.push({
        kind: "figura",
        src: `/modulos/aerodinamica/figuras/${meta[0]}`,
        alt: meta[1],
        ancho: 1600,
        alto: 900,
        pie,
      })
      continue
    }

    if (l.startsWith("|")) {
      const t = leerTabla(cuerpo, i)
      bloques.push(t.bloque)
      i = t.siguiente
      continue
    }

    if (l.startsWith("```")) {
      const cerca = leerCerca(cuerpo, i)
      bloques.push({ kind: "code", text: cerca.texto, tabular: true })
      i = cerca.siguiente
      continue
    }

    if (/^- /.test(l)) {
      const lista = leerLista(cuerpo, i, false)
      bloques.push(
        lista.items.length <= 5
          ? { kind: "vinetas", items: lista.items }
          : { kind: "list", items: lista.items },
      )
      i = lista.siguiente
      continue
    }

    if (/^\d+\. /.test(l)) {
      const lista = leerLista(cuerpo, i, true)
      bloques.push({ kind: "list", items: lista.items, ordered: true })
      i = lista.siguiente
      continue
    }

    const fin = finDeParrafo(cuerpo, i)
    if (fin === i) {
      throw new Error(`${idSeccion}: no sé qué hacer con «${l}»`)
    }
    empujarParrafo(cuerpo.slice(i, fin).join(" "))
    i = fin
  }

  return bloques
}

// ─── Las doce secciones ─────────────────────────────────────────────────────

const secciones = []
const quizPorSeccion = []

for (const t of tramos()) {
  const cab = t.titulo.match(/^SECCIÓN (\d+) · (.+)$/)
  if (!cab) continue
  const numero = Number(cab[1])
  if (numero > 12) continue

  const id = `S${String(numero).padStart(2, "0")}`
  const cuerpo = t.cuerpo

  // Cuatro secciones llevan además «· **Sección prioritaria**».
  const ficha = cuerpo[0]?.match(/^\*\*ID:\*\* (S\d\d) · \*\*Tiempo:\*\* (\d+)(?:–\d+)? min(?: · \*\*(.+)\*\*)?$/)
  if (!ficha) throw new Error(`${id}: no encontré «**ID:** … **Tiempo:** … min», hay «${cuerpo[0]}»`)
  if (ficha[1] !== id) throw new Error(`la sección ${numero} dice ser ${ficha[1]}`)
  const objetivo = cuerpo[1]?.match(/^\*\*Objetivo:\*\* (.+)$/)
  if (!objetivo) throw new Error(`${id}: no encontré el objetivo`)

  // El cuerpo se parte en la teoría y el quiz de cierre.
  const corte = cuerpo.findIndex((l) => /^### Quiz · Sección \d+$/.test(l))
  if (corte < 0) throw new Error(`${id}: no encontré su quiz`)

  const bloques = bloquesDeSeccion(cuerpo.slice(2, corte), id)
  // El objetivo abre la sección: en el rótulo no cabe y es contenido del
  // documento, no un adorno.
  bloques.unshift({ kind: "p", text: `**Objetivo:** ${objetivo[1].trim()}` })

  // El quiz de la sección.
  const preguntas = []
  let i = corte + 1
  while (i < cuerpo.length) {
    if (cuerpo[i].trim() === "" || cuerpo[i].startsWith("---")) {
      i++
      continue
    }
    const { pregunta, siguiente } = leerPregunta(cuerpo, i)
    if (pregunta.tema !== id) throw new Error(`${pregunta.id}: dice tema ${pregunta.tema} y está en ${id}`)
    preguntas.push(pregunta)
    quizPorSeccion.push(pregunta)
    i = siguiente
  }

  // El quiz de la sección NO entra en la lección. Regla de Camilo, la misma que
  // vació Mercancías: dentro de un módulo no se pregunta nada; se pregunta en
  // la práctica y en el quiz final. Se sigue leyendo del documento para
  // contarlo y validarlo, pero no se emite.

  secciones.push({
    n: numero,
    id,
    title: cajaDeTitulo(cab[2].trim()),
    kicker: ROTULOS[id] ?? objetivo[1].trim(),
    minutes: Number(ficha[2]),
    prioritaria: /prioritaria/i.test(ficha[3] ?? ""),
    blocks: bloques,
  })
}

// ─── Escenarios (Sección 13) ────────────────────────────────────────────────

const escenarios = []
{
  const t = tramos().find((x) => /^SECCIÓN 13 /.test(x.titulo))
  if (!t) throw new Error("no encontré la sección 13")
  const partes = t.cuerpo.join("\n").split(/\n### (?=esc-)/).slice(1)
  for (const p of partes) {
    const lin = p.split("\n")
    const cab = lin[0].match(/^(esc-\d\d) · (.+)$/)
    if (!cab) throw new Error(`escenario con encabezado raro: «${lin[0]}»`)
    const bloque = (marca) => {
      const desde = lin.findIndex((l) => l.trim() === `**${marca}**`)
      if (desde < 0) return null
      let j = desde + 1
      const dentro = []
      while (j < lin.length && !/^\*\*(ESCENARIO|Preguntas|Análisis|Temas:)\*\*/.test(lin[j]) && !lin[j].startsWith("---")) {
        dentro.push(lin[j])
        j++
      }
      return dentro.join("\n").trim()
    }
    const numerada = (texto) =>
      texto
        .split("\n")
        .filter((l) => /^\d+\. /.test(l))
        .map((l) => l.replace(/^\d+\. /, "").trim())

    const situacion = bloque("ESCENARIO")
    const preguntas = numerada(bloque("Preguntas") ?? "")
    const analisis = numerada(bloque("Análisis") ?? "")
    const temas = p.match(/^\*\*Temas:\*\* (.+)$/m)
    if (!situacion || preguntas.length === 0 || analisis.length !== preguntas.length || !temas) {
      throw new Error(`${cab[1]}: escenario incompleto (${preguntas.length} preguntas, ${analisis.length} respuestas)`)
    }
    escenarios.push({
      id: cab[1],
      titulo: cab[2].trim(),
      situacion: situacion.replace(/\n+/g, " ").trim(),
      preguntas,
      analisis,
      temas: temas[1].split(",").map((s) => s.trim()),
    })
  }
}

// ─── Entrevista (Sección 14) ────────────────────────────────────────────────

const entrevista = []
{
  const t = tramos().find((x) => /^SECCIÓN 14 /.test(x.titulo))
  if (!t) throw new Error("no encontré la sección 14")
  const texto = t.cuerpo.join("\n")
  const porNivel = texto.split(/\n## NIVEL /).slice(1)
  for (const trozo of porNivel) {
    const nivel = trozo.slice(0, trozo.indexOf(" ·")).trim().toLowerCase()
    for (const p of trozo.split(/\n### (?=ent-)/).slice(1)) {
      const lin = p.split("\n")
      const cab = lin[0].match(/^(ent-\d\d) · (.+)$/)
      if (!cab) throw new Error(`pregunta de entrevista con encabezado raro: «${lin[0]}»`)
      const campo = (nombre) => {
        const l = lin.find((x) => x.startsWith(`**${nombre}:**`))
        return l ? l.slice(nombre.length + 5).trim() : null
      }
      const opciones = lin.filter((l) => /^- [A-D]\) /.test(l)).map((l) => l.slice(5).trim())
      const respuesta = campo("Respuesta correcta")
      const explicacion = campo("Explicación")
      const punto = campo("Punto que debes recordar")
      const tema = campo("Tema")
      if (!respuesta || !explicacion || !punto || !tema) {
        throw new Error(`${cab[1]}: le falta respuesta, explicación, punto o tema`)
      }
      entrevista.push({
        id: cab[1],
        nivel: nivel === "básico" ? "basico" : nivel === "intermedio" ? "intermedio" : "avanzado",
        titulo: cab[2].trim(),
        pregunta: campo("Pregunta") ?? "",
        ...(opciones.length ? { opciones, correcta: LETRA[respuesta] } : {}),
        respuesta: opciones.length ? opciones[LETRA[respuesta]] : respuesta,
        explicacion,
        punto,
        // Casi todas citan una sección; ent-49 cita dos.
        temas: tema.split(",").map((s) => s.trim()),
      })
    }
  }
}

// ─── Banco del quiz final ───────────────────────────────────────────────────

const banco = []
{
  const t = tramos().find((x) => x.titulo === "QUIZ FINAL DE AERODINÁMICA")
  if (!t) throw new Error("no encontré el quiz final")
  const cuerpo = t.cuerpo
  let i = 0
  while (i < cuerpo.length) {
    if (!/^\*\*ev-\d\d\*\* · /.test(cuerpo[i])) {
      i++
      continue
    }
    const { pregunta, siguiente } = leerPregunta(cuerpo, i)
    banco.push(pregunta)
    i = siguiente
  }
}

// ─── Validaciones ───────────────────────────────────────────────────────────

const fallos = []
const comprobar = (cond, mensaje) => {
  if (!cond) fallos.push(mensaje)
}

comprobar(secciones.length === CUENTAS_ESPERADAS.secciones, `secciones: ${secciones.length}`)
comprobar(quizPorSeccion.length === CUENTAS_ESPERADAS.quiz, `preguntas de sección: ${quizPorSeccion.length}`)
comprobar(escenarios.length === CUENTAS_ESPERADAS.escenarios, `escenarios: ${escenarios.length}`)
comprobar(entrevista.length === CUENTAS_ESPERADAS.entrevista, `entrevista: ${entrevista.length}`)
comprobar(banco.length === CUENTAS_ESPERADAS.banco, `banco: ${banco.length}`)

const imagenes = secciones.flatMap((s) => s.blocks.filter((b) => b.kind === "figura"))
comprobar(imagenes.length === CUENTAS_ESPERADAS.imagenes, `imágenes: ${imagenes.length}`)

const TEMAS = new Set(secciones.map((s) => s.id))
for (const p of [...quizPorSeccion, ...banco]) {
  comprobar(p.opciones.length === 4, `${p.id}: ${p.opciones.length} opciones`)
  comprobar(Number.isInteger(p.correcta) && p.correcta >= 0 && p.correcta <= 3, `${p.id}: correcta fuera de rango`)
  comprobar(TEMAS.has(p.tema), `${p.id}: tema ${p.tema} no existe`)
  comprobar(new Set(p.opciones).size === 4, `${p.id}: opciones repetidas`)
}
for (const e of entrevista)
  for (const tm of e.temas) comprobar(TEMAS.has(tm), `${e.id}: tema ${tm} no existe`)

const ids = [...quizPorSeccion, ...banco].map((p) => p.id).concat(escenarios.map((e) => e.id), entrevista.map((e) => e.id))
comprobar(new Set(ids).size === ids.length, "hay ids repetidos")

const porNivel = { basico: 0, intermedio: 0, avanzado: 0 }
for (const e of entrevista) porNivel[e.nivel]++
comprobar(porNivel.basico === 17, `básico: ${porNivel.basico}`)
comprobar(porNivel.intermedio === 16, `intermedio: ${porNivel.intermedio}`)
comprobar(porNivel.avanzado === 16, `avanzado: ${porNivel.avanzado}`)

if (fallos.length) {
  console.error("El documento no cuadra:")
  for (const f of fallos) console.error("  · " + f)
  process.exit(1)
}

// ─── Escritura ──────────────────────────────────────────────────────────────

const j = (v) => JSON.stringify(v, null, 2)
const AVISO = `// GENERADO por scripts/aerodinamica/convertir.mjs desde
// docs/contenido/aerodinamica.md. No se edita a mano: se edita el documento y
// se vuelve a correr el script.\n`

fs.writeFileSync(
  path.join(RAIZ, "src/lib/aerodinamicaLeccion.ts"),
  `${AVISO}
/**
 * Las doce secciones de Aerodinámica, en el formato del lector de lecciones.
 *
 * El contenido es de Camilo (docs/contenido/aerodinamica.md, versión 1.0 del
 * 15 de septiembre de 2026), con sus fuentes en el Anexo B del documento.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const AERO_LECCIONES: DocScreen[] = ${j(secciones.map(({ id: _id, prioritaria: _p, ...s }) => s))}

/**
 * Las secciones que el documento marca como prioritarias: las que un
 * entrevistador técnico pregunta primero.
 */
export const AERO_PRIORITARIAS: number[] = ${j(secciones.filter((s) => s.prioritaria).map((s) => s.n))}

// La numeración es la que se guarda como progreso: si el documento se
// desordena, mejor caerse al arrancar que marcar leída la sección equivocada.
AERO_LECCIONES.forEach((s, i) => {
  if (s.n !== i + 1) throw new Error(\`aerodinamicaLeccion: la sección \${s.n} está en la posición \${i + 1}\`)
})

export const AERO_LECCION_TOTAL = AERO_LECCIONES.length
export const AERO_MINUTOS = AERO_LECCIONES.reduce((t, s) => t + s.minutes, 0)
`,
  "utf8",
)

fs.writeFileSync(
  path.join(RAIZ, "src/lib/aerodinamicaPractica.ts"),
  `${AVISO}
/**
 * La práctica de Aerodinámica: trece escenarios de aplicación y cuarenta y
 * nueve preguntas de entrevista en tres niveles.
 *
 * Un escenario se marca hecho al desplegar su análisis; una pregunta, al ver
 * la respuesta. Las claves son las que valida modulos_contenido.
 */

export interface EscenarioAero {
  id: string
  titulo: string
  situacion: string
  preguntas: string[]
  /** Una respuesta por pregunta, en el mismo orden. */
  analisis: string[]
  /** Las secciones que pone a prueba: "S06", "S04". */
  temas: string[]
}

export type NivelEntrevista = "basico" | "intermedio" | "avanzado"

export interface PreguntaEntrevistaAero {
  id: string
  nivel: NivelEntrevista
  titulo: string
  pregunta: string
  /** Solo las de opción múltiple; las abiertas se despliegan sin elegir. */
  opciones?: string[]
  /** Índice de la correcta dentro de \`opciones\`, desde 0. */
  correcta?: number
  respuesta: string
  explicacion: string
  punto: string
  /** Las secciones que repasa. Casi todas citan una; ent-49 cita dos. */
  temas: string[]
}

export const AERO_ESCENARIOS: EscenarioAero[] = ${j(escenarios)}

export const AERO_ENTREVISTA: PreguntaEntrevistaAero[] = ${j(entrevista)}

export const AERO_NIVELES: { clave: NivelEntrevista; rotulo: string }[] = [
  { clave: "basico", rotulo: "Básico" },
  { clave: "intermedio", rotulo: "Intermedio" },
  { clave: "avanzado", rotulo: "Avanzado" },
]

/** Las claves de práctica válidas: los escenarios y las de entrevista. */
export const AERO_PRACTICA_CLAVES: string[] = [
  ...AERO_ESCENARIOS.map((e) => e.id),
  ...AERO_ENTREVISTA.map((e) => e.id),
]

export const AERO_PRACTICA_TOTAL = AERO_PRACTICA_CLAVES.length
`,
  "utf8",
)

fs.writeFileSync(
  path.join(RAIZ, "contenido/bancos/aerodinamica_evaluacion.json"),
  j({
    banco: "aerodinamica_evaluacion",
    descripcion: "Quiz final de Aerodinámica. Cada intento toma 20 al azar.",
    preguntas: banco.map((p) => ({
      id: p.id,
      enunciado: p.enunciado,
      opciones: p.opciones,
      correcta: p.correcta,
      explicacion: p.explicacion,
      metadatos: { tema: p.tema, seccion: Number(p.tema.slice(1)) },
    })),
  }) + "\n",
  "utf8",
)

const porSeccion = {}
for (const p of banco) porSeccion[p.tema] = (porSeccion[p.tema] || 0) + 1

console.log(`secciones: ${secciones.length} · ${secciones.reduce((t, s) => t + s.minutes, 0)} min`)
console.log(`quiz de sección: ${quizPorSeccion.length}`)
console.log(`escenarios: ${escenarios.length} · entrevista: ${entrevista.length} (${porNivel.basico}/${porNivel.intermedio}/${porNivel.avanzado})`)
console.log(`banco: ${banco.length} · por sección ` + Object.keys(porSeccion).sort().map((k) => `${k}:${porSeccion[k]}`).join(" "))
console.log(`imágenes: ${imagenes.length}`)
