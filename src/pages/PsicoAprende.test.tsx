import { renderToStaticMarkup } from "react-dom/server"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"
import { EJEMPLOS_ESPACIAL } from "@/data/psicotecnicas/aprende"
import { PsicoAprende } from "./PsicoAprende"

describe("ruta de aprendizaje psicotécnico", () => {
  it("separa métodos, láminas y ejemplos en tres etapas navegables", () => {
    const html = renderToStaticMarkup(<MemoryRouter><PsicoAprende /></MemoryRouter>)
    expect(html).toContain('aria-label="Ruta de aprendizaje"')
    for (const destino of ["metodos", "cubos", "ejemplos"]) {
      expect(html).toContain(`href="#psico-${destino}"`)
      expect(html).toContain(`id="psico-${destino}"`)
    }
    expect((html.match(/<details/g) ?? []).length).toBe(EJEMPLOS_ESPACIAL.length)
    expect((html.match(/<details[^>]* open=""/g) ?? []).length).toBe(1)
  })
})
