import { describe, expect, it } from "vitest"
import type { DocBlockData } from "@/lib/docBlocks"
import {
  CB_ESCENARIO_CLAVES,
  CB_FIGURAS_PENDIENTES,
  CB_LECCIONES,
  CB_LECCION_TOTAL,
  CB_MINUTOS,
  CB_NIVELES,
} from "@/lib/combustibleLeccion"
import { CB_PRACTICA, CB_PRACTICA_CLAVES } from "@/lib/combustiblePractica"

/**
 * Lo que el conversor tiene que dejar bien en `combustibleLeccion.ts` y
 * `combustiblePractica.ts`, que se generan y no se editan a mano
 * (scripts/combustible/convertir.mjs). El conversor ya valida al generar; esto
 * vuelve a comprobarlo sobre lo generado, que es lo que la app sirve.
 *
 * Recoge lo que falló en Performance: escenarios con el botón puesto y nada
 * detrás, y claves de práctica que no cuadraban con los bloques.
 *
 * Si el documento cambia: node scripts/combustible/convertir.mjs
 */

interface PreguntaBanco {
  id: string
  enunciado: string
}

// El banco entra por Vite, como en evaluacionesContenido.test.ts: la prueba
// lo lee del disco y nada de esto llega al bundle de la app.
const RUTA_BANCO = "/contenido/bancos/combustible_evaluacion.json"
const banco = import.meta.glob<{ banco: string; preguntas: PreguntaBanco[] }>(
  "/contenido/bancos/combustible_evaluacion.json",
  { import: "default", eager: true },
)[RUTA_BANCO]

/** Todos los bloques, incluidos los que van dentro de un detalle técnico. */
function todosLosBloques(bs: DocBlockData[]): DocBlockData[] {
  return bs.flatMap((b) => (b.kind === "detalleTecnico" ? [b, ...todosLosBloques(b.bloques)] : [b]))
}

/** Todas las cadenas de un valor, recorriendo lo anidado. */
function textos(v: unknown): string[] {
  if (typeof v === "string") return [v]
  if (Array.isArray(v)) return v.flatMap(textos)
  if (v && typeof v === "object") return Object.values(v).flatMap(textos)
  return []
}

const normal = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim()

const BLOQUES = CB_LECCIONES.flatMap((l) => todosLosBloques(l.blocks))
const PREGUNTAS = CB_PRACTICA.flatMap((g) => g.preguntas)

describe("Gestión del combustible: la lección", () => {
  it("son veintitrés capítulos, numerados, con título legible, parte, minutos y bloques", () => {
    expect(CB_LECCION_TOTAL).toBe(23)
    expect(CB_LECCIONES.map((l) => l.n)).toEqual(Array.from({ length: 23 }, (_, i) => i + 1))
    expect(CB_NIVELES.map((n) => n.desde)).toEqual([1, 12, 23])
    const partes = CB_NIVELES.map((n) => n.titulo.split(" · ")[1])
    for (const l of CB_LECCIONES) {
      expect(l.title.length, `capítulo ${l.n}`).toBeGreaterThan(3)
      // En el documento van en versales; en la app, en caja normal.
      expect(l.title, `capítulo ${l.n}`).not.toBe(l.title.toUpperCase())
      expect(partes, `capítulo ${l.n}`).toContain(l.kicker)
      expect(l.minutes, `capítulo ${l.n}`).toBeGreaterThan(0)
      expect(l.blocks.length, `capítulo ${l.n}`).toBeGreaterThan(2)
    }
    expect(CB_MINUTOS).toBe(CB_LECCIONES.reduce((t, l) => t + l.minutes, 0))
  })

  it("ningún texto lleva raya larga", () => {
    // deepPlain la reescribiría como «: » y cambiaría el sentido de la frase.
    for (const s of textos([CB_LECCIONES, CB_PRACTICA])) expect(s, s.slice(0, 60)).not.toContain("—")
  })

  it("en la lectura no se pregunta nada", () => {
    expect(BLOQUES.filter((b) => b.kind === "ponAPrueba")).toHaveLength(0)
    // Ni una pregunta del quiz de capítulo coló en el texto.
    for (const s of textos(CB_LECCIONES)) {
      expect(s, s.slice(0, 60)).not.toMatch(/\bc\d\d-q\d\b|\*\*Correcta:\*\*/)
    }
  })

  it("ningún párrafo, ítem o tabla queda vacío o roto", () => {
    for (const b of BLOQUES) {
      if (b.kind === "p") expect(b.text.trim()).not.toBe("")
      if (b.kind === "list" || b.kind === "vinetas") {
        for (const x of b.items) expect(x.trim()).not.toBe("")
      }
      if (b.kind === "table") {
        for (const r of b.rows) expect(r, b.head.join(" | ")).toHaveLength(b.head.length)
      }
    }
    // Una marca sin cerrar se vería con los asteriscos en pantalla.
    for (const s of textos(CB_LECCIONES)) {
      expect(s.replace(/\*\*[^*]+\*\*/g, ""), s.slice(0, 60)).not.toContain("*")
    }
  })

  it("las quince figuras van rotuladas por capítulo, sin repetir, y ya dibujadas", () => {
    // Cada imagen del documento sale como figura SVG o, si falta, como hueco;
    // el código es el del capítulo en que está (IMG-C01, IMG-C11…).
    const porCapitulo = CB_LECCIONES.flatMap((l) =>
      todosLosBloques(l.blocks).flatMap((b) => {
        if (b.kind === "figura") return [{ n: l.n, codigo: b.src.match(/IMG-C\d\d/)?.[0] ?? "" }]
        if (b.kind === "hueco") return [{ n: l.n, codigo: b.rotulo.match(/^IMG-C\d\d/)?.[0] ?? "" }]
        return []
      }),
    )
    expect(porCapitulo).toHaveLength(15)
    expect(new Set(porCapitulo.map((f) => f.codigo)).size).toBe(15)
    for (const { n, codigo } of porCapitulo) expect(codigo).toBe(`IMG-C${String(n).padStart(2, "0")}`)
    expect(CB_FIGURAS_PENDIENTES).toEqual([])
    // Las verticales no pasan de 400 px de ancho: a todo el ancho de lectura
    // se saldrían de la pantalla.
    for (const b of BLOQUES) {
      if (b.kind === "figura" && b.alto > b.ancho) expect(b.anchoMax, b.src).toBe(400)
    }
  })

  it("los diez escenarios llevan su clave y algo detrás del botón", () => {
    const escenarios = BLOQUES.filter((b) => b.kind === "piensaComoPiloto")
    expect(escenarios).toHaveLength(10)
    expect(CB_ESCENARIO_CLAVES).toEqual(Array.from({ length: 10 }, (_, i) => `esc-${String(i + 1).padStart(2, "0")}`))
    expect(escenarios.map((b) => (b.kind === "piensaComoPiloto" ? b.clave : undefined))).toEqual(CB_ESCENARIO_CLAVES)
    // Todos en el capítulo 23.
    const cap23 = CB_LECCIONES[22].blocks.filter((b) => b.kind === "piensaComoPiloto")
    expect(cap23).toHaveLength(10)
    for (const b of escenarios) {
      if (b.kind !== "piensaComoPiloto") continue
      expect(b.situacion.trim(), `${b.clave} sin situación`).not.toBe("")
      expect(b.pregunta.trim(), `${b.clave} sin pregunta`).not.toBe("")
      // Lo que le pasó a Performance: botón puesto y nada detrás.
      const detras = (b.respuesta ?? "").trim() !== "" || b.claves.length > 0
      expect(detras, `${b.clave} no tiene respuesta ni claves`).toBe(true)
      for (const c of b.claves) expect(textos(c).join("").trim(), `${b.clave} con una clave vacía`).not.toBe("")
    }
  })
})

describe("Gestión del combustible: la práctica", () => {
  it("son veintidós grupos, uno por capítulo, con tres preguntas cada uno", () => {
    expect(CB_PRACTICA.map((g) => g.n)).toEqual(Array.from({ length: 22 }, (_, i) => i + 1))
    for (const g of CB_PRACTICA) {
      const nn = String(g.n).padStart(2, "0")
      expect(g.tema).toBe(`C${nn}`)
      expect(g.titulo).toBe(CB_LECCIONES[g.n - 1].title)
      expect(g.preguntas.map((p) => p.id)).toEqual([1, 2, 3].map((k) => `c${nn}-q${k}`))
    }
  })

  it("cada pregunta trae cuatro opciones distintas, una correcta válida, explicación y referencia", () => {
    expect(PREGUNTAS).toHaveLength(66)
    for (const p of PREGUNTAS) {
      expect(p.enunciado.trim(), p.id).not.toBe("")
      expect(p.opciones, p.id).toHaveLength(4)
      expect(new Set(p.opciones).size, p.id).toBe(4)
      expect(Number.isInteger(p.correcta) && p.correcta >= 0 && p.correcta <= 3, p.id).toBe(true)
      expect(p.explicacion.trim(), p.id).not.toBe("")
      expect(p.referencia.trim(), p.id).not.toBe("")
    }
  })

  it("las claves de práctica son las preguntas y los escenarios, sin repetir", () => {
    // Sin esto el contador de práctica del hub no cuadra con lo que se marca.
    expect(CB_PRACTICA_CLAVES).toEqual([...PREGUNTAS.map((p) => p.id), ...CB_ESCENARIO_CLAVES])
    expect(CB_PRACTICA_CLAVES).toHaveLength(76)
    expect(new Set(CB_PRACTICA_CLAVES).size).toBe(CB_PRACTICA_CLAVES.length)
  })

  it("ninguna pregunta de práctica ni texto de la lección repite un enunciado del banco", () => {
    expect(banco, RUTA_BANCO).toBeDefined()
    expect(banco.preguntas).toHaveLength(40)
    const delBanco = new Set(banco.preguntas.map((p) => normal(p.enunciado)))
    for (const p of PREGUNTAS) {
      if (p.enunciado.length >= 40) expect(delBanco.has(normal(p.enunciado)), `${p.id} repite el banco`).toBe(false)
    }
    for (const s of textos(CB_LECCIONES)) {
      if (s.length >= 40) expect(delBanco.has(normal(s)), s.slice(0, 60)).toBe(false)
    }
    // Y ningún id se cruza: el banco usa ev-nn, la práctica cNN-qN y esc-NN.
    const ids = new Set(banco.preguntas.map((p) => p.id))
    for (const c of CB_PRACTICA_CLAVES) expect(ids.has(c), c).toBe(false)
  })
})
