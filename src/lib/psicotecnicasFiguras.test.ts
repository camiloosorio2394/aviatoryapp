import { describe, expect, it } from "vitest"
import { svgEnunciado, type Figura } from "@/lib/psicotecnicasFiguras"
import { FIGURAS_A1 } from "@/data/psicotecnicas/figurasA1"

/** La primera figura del banco que tiene una casilla con letra. */
function figuraConLetra(): Figura {
  const figura = Object.values(FIGURAS_A1).find((f) => JSON.stringify(f).includes('"cuadro-lobulos"'))
  if (!figura) throw new Error("el banco ya no trae la casilla con letra")
  return structuredClone(figura) as Figura
}

describe("figuras de psicotécnicas", () => {
  it("pinta las letras que existen", () => {
    expect(svgEnunciado(figuraConLetra())).toMatch(/<text[^>]*>(A|C|D)<\/text>/)
  })

  it("no pinta un texto que no sea una de sus letras, aunque llegue del servidor", () => {
    const figura = figuraConLetra()
    const inyectado = '<img src=x onerror="alert(1)">'
    const recorrer = (v: unknown) => {
      if (Array.isArray(v)) v.forEach(recorrer)
      else if (v && typeof v === "object") {
        const o = v as Record<string, unknown>
        if (o.tipo === "cuadro-lobulos") o.letra = inyectado
        Object.values(o).forEach(recorrer)
      }
    }
    recorrer(figura)
    const svg = svgEnunciado(figura)
    expect(svg).not.toContain("<img")
    expect(svg).not.toContain("onerror")
  })
})
