import { describe, expect, it } from "vitest"
// @ts-expect-error módulo disponible en el entorno de pruebas
import { readFileSync } from "node:fs"
// @ts-expect-error módulo disponible en el entorno de pruebas
import { resolve } from "node:path"
import type { DocBlockData } from "@/lib/docBlocks"
import { RAC_LECCIONES, RAC_LECCION_TOTAL, RAC_MINUTOS, RAC_NIVELES } from "@/lib/racLeccion"
import { RAC_PRACTICA, RAC_PRACTICA_CLAVES } from "@/lib/racPractica"

/**
 * Lo que el conversor tiene que dejar bien en racLeccion.ts y racPractica.ts,
 * que se generan y no se editan a mano (scripts/rac/convertir.mjs).
 *
 * La regla de Camilo es que en la lectura no se pregunta nada: el quiz de
 * cada unidad va a la práctica, y la práctica no puede copiar una pregunta
 * del banco de la evaluación, que vive en el servidor.
 */

interface Banco {
  banco: string
  preguntas: { id: string; enunciado: string }[]
}

const banco: Banco = JSON.parse(readFileSync(resolve("contenido/bancos/rac_evaluacion.json"), "utf8"))

/** Todos los objetos con `kind` de un bloque, incluidos los anidados. */
function bloquesAnidados(v: unknown): { kind: string }[] {
  if (Array.isArray(v)) return v.flatMap(bloquesAnidados)
  if (v && typeof v === "object") {
    const hijos = Object.values(v).flatMap(bloquesAnidados)
    return "kind" in v && typeof v.kind === "string" ? [v as { kind: string }, ...hijos] : hijos
  }
  return []
}

/** Todos los textos de un bloque, a cualquier profundidad. */
function textos(v: unknown): string[] {
  if (typeof v === "string") return [v]
  if (Array.isArray(v)) return v.flatMap(textos)
  if (v && typeof v === "object") return Object.values(v).flatMap(textos)
  return []
}

const PREGUNTAS = RAC_PRACTICA.flatMap((g) => g.preguntas)
const normal = (t: string) => t.toLocaleLowerCase("es").replace(/\s+/g, " ").trim()

describe("contenido del módulo RAC", () => {
  it("trae las diecinueve unidades, numeradas y con contenido", () => {
    expect(RAC_LECCIONES).toHaveLength(19)
    expect(RAC_LECCION_TOTAL).toBe(19)
    RAC_LECCIONES.forEach((l, i) => {
      expect(l.n).toBe(i + 1)
      expect(l.title.trim(), `la unidad ${l.n} no tiene título`).not.toBe("")
      expect(l.kicker.trim(), `la unidad ${l.n} no tiene bloque`).not.toBe("")
      expect(l.blocks.length, `la unidad ${l.n} no tiene bloques`).toBeGreaterThan(2)
      expect(l.minutes).toBeGreaterThan(0)
    })
    expect(RAC_MINUTOS).toBe(RAC_LECCIONES.reduce((t, l) => t + l.minutes, 0))
  })

  it("los cinco bloques empiezan en una unidad que existe, en orden", () => {
    expect(RAC_NIVELES).toHaveLength(5)
    expect(RAC_NIVELES[0].desde).toBe(1)
    for (let i = 1; i < RAC_NIVELES.length; i++) expect(RAC_NIVELES[i].desde).toBeGreaterThan(RAC_NIVELES[i - 1].desde)
    for (const n of RAC_NIVELES) expect(n.desde).toBeLessThanOrEqual(RAC_LECCION_TOTAL)
  })

  it("ningún texto de las lecciones lleva raya larga", () => {
    // deepPlain() la reescribe como «: » y la frase queda rota.
    for (const l of RAC_LECCIONES) {
      for (const t of textos(l.blocks as DocBlockData[])) expect(t, `unidad ${l.n}`).not.toContain("—")
    }
  })

  it("ninguna lección pregunta: no hay «pon a prueba»", () => {
    for (const l of RAC_LECCIONES) {
      const kinds = bloquesAnidados(l.blocks).map((b) => b.kind)
      expect(kinds, `unidad ${l.n}`).not.toContain("ponAPrueba")
    }
  })

  it("ningún párrafo queda vacío", () => {
    for (const l of RAC_LECCIONES) {
      for (const b of l.blocks) if (b.kind === "p") expect(b.text.trim(), `unidad ${l.n}`).not.toBe("")
    }
  })

  it("las 54 claves de práctica son las de las preguntas, sin repetir", () => {
    expect(RAC_PRACTICA).toHaveLength(19)
    expect(RAC_PRACTICA_CLAVES).toHaveLength(54)
    expect(RAC_PRACTICA_CLAVES).toEqual(PREGUNTAS.map((p) => p.id))
    expect(new Set(RAC_PRACTICA_CLAVES).size).toBe(RAC_PRACTICA_CLAVES.length)
  })

  it("cada grupo de práctica apunta a su unidad", () => {
    RAC_PRACTICA.forEach((g, i) => {
      expect(g.n).toBe(i + 1)
      expect(g.tema).toBe(`U${String(i + 1).padStart(2, "0")}`)
      expect(g.titulo).toBe(RAC_LECCIONES[i].title)
      expect(g.preguntas.length).toBeGreaterThan(0)
    })
  })

  it("cada pregunta tiene cuatro opciones distintas, una correcta válida, explicación y referencia", () => {
    for (const p of PREGUNTAS) {
      expect(p.opciones, p.id).toHaveLength(4)
      expect(new Set(p.opciones).size, p.id).toBe(4)
      expect(Number.isInteger(p.correcta) && p.correcta >= 0 && p.correcta < 4, p.id).toBe(true)
      expect(p.explicacion.trim(), p.id).not.toBe("")
      expect(p.referencia.trim(), p.id).not.toBe("")
      for (const t of textos(p)) expect(t, p.id).not.toContain("—")
    }
  })

  it("ninguna pregunta de práctica repite un enunciado del banco de la evaluación", () => {
    expect(banco.banco).toBe("rac_evaluacion")
    expect(banco.preguntas).toHaveLength(50)
    const delBanco = new Set(banco.preguntas.map((p) => normal(p.enunciado)))
    const repetidas = PREGUNTAS.filter((p) => p.enunciado.length >= 40 && delBanco.has(normal(p.enunciado))).map((p) => p.id)
    expect(repetidas).toEqual([])
    const ids = new Set(banco.preguntas.map((p) => p.id))
    expect(PREGUNTAS.filter((p) => ids.has(p.id))).toEqual([])
  })
})
