import { act } from "react"
import { createRoot, type Root } from "react-dom/client"
import { MemoryRouter } from "react-router-dom"
import { afterEach, beforeEach, describe, expect, it } from "vitest"

import { SubjectTable } from "@/components/pca/SubjectTable"
import { MATERIAS_CON_FOTO, subjectFoto } from "@/lib/subjectFotos"
import { SUBJECT_META } from "@/lib/vaultSubjects"

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

let root: Root
let contenedor: HTMLDivElement

function pintar(slugs: string[]) {
  act(() => {
    root.render(
      <MemoryRouter>
        <SubjectTable rows={slugs.map((slug, i) => ({ slug, count: 90 - i, answered: 0 }))} />
      </MemoryRouter>,
    )
  })
  return contenedor
}

beforeEach(() => {
  contenedor = document.createElement("div")
  document.body.appendChild(contenedor)
  root = createRoot(contenedor)
})

afterEach(() => {
  act(() => root.unmount())
  contenedor.remove()
})

/**
 * Las miniaturas de las materias del PCA: cada materia con foto la pinta, y la
 * que no la tiene conserva su símbolo. Nace del cambio del 25 de septiembre de
 * 2026, cuando los glifos de 32 px pasaron a ser fotos de 124 × 84.
 */
describe("la tabla de materias del PCA", () => {
  it("pinta la miniatura de cada materia que la tiene, decorativa y a su medida", () => {
    const el = pintar(["meteorologia", "aerodinamica"])
    const fotos = [...el.querySelectorAll("img")]
    expect(fotos).toHaveLength(2)
    expect(fotos[0].getAttribute("src")).toBe(subjectFoto("meteorologia"))
    // Decorativa: el nombre va al lado, así que el alt es vacío y no se lee dos veces.
    expect(fotos.every((f) => f.getAttribute("alt") === "")).toBe(true)
    expect(fotos.every((f) => f.getAttribute("width") === "124" && f.getAttribute("height") === "84")).toBe(true)
  })

  it("una materia sin foto sigue con su símbolo, nunca con un hueco", () => {
    const el = pintar(["motores"])
    expect(el.querySelector("img")).toBeNull()
    expect(el.querySelector("svg")).not.toBeNull()
    expect(el.textContent).toContain("Motores")
  })

  it("las nueve materias con foto son materias del banco", () => {
    // Que cada archivo exista en disco lo comprueba scripts/pca/fotos-materias.test.ts,
    // porque el tsconfig de src no trae los tipos de Node.
    expect(MATERIAS_CON_FOTO).toHaveLength(9)
    for (const slug of MATERIAS_CON_FOTO) {
      expect(SUBJECT_META[slug], `${slug} no está en SUBJECT_META`).toBeDefined()
    }
  })
})
