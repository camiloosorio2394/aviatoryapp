import { describe, expect, it } from "vitest"
import { BANCO } from "@/data/psicotecnicas"
import { PSICO_DISPONIBLES, PSICO_TOTAL, disponiblesPsico } from "@/lib/psicotecnicasConteo"
// @ts-expect-error: módulo JavaScript sin tipos, lo usa también el exportador de Node
import { bancoDePsicotecnicas } from "../../scripts/bancos/psicotecnicas.mjs"

const bancos = import.meta.glob<{ banco: string; preguntas: unknown[] }>("/contenido/bancos/psicotecnicas.json", {
  import: "default",
  eager: true,
})

describe("banco de psicotécnicas", () => {
  it("contenido/bancos/psicotecnicas.json está al día con src/data/psicotecnicas", () => {
    // Si falla: node scripts/bancos/exportar-psicotecnicas.mjs, y sembrar el banco.
    expect(bancos["/contenido/bancos/psicotecnicas.json"]).toEqual(bancoDePsicotecnicas(BANCO))
  })

  it("los conteos que muestran las pantallas cuadran con el banco", () => {
    const real: Record<string, Record<string, number>> = {}
    for (const e of BANCO) {
      real[e.categoria] ??= { basico: 0, intermedio: 0, avanzado: 0 }
      real[e.categoria][e.nivel]++
    }
    // Si falla: poner estas cifras en src/lib/psicotecnicasConteo.ts.
    expect(PSICO_DISPONIBLES).toEqual(real)
    expect(PSICO_TOTAL).toBe(BANCO.length)
    expect(disponiblesPsico({ categoria: "espacial", nivel: "todos" })).toBe(
      BANCO.filter((e) => e.categoria === "espacial").length,
    )
    expect(disponiblesPsico({ categoria: "todas", nivel: "avanzado" })).toBe(
      BANCO.filter((e) => e.nivel === "avanzado").length,
    )
  })
})
