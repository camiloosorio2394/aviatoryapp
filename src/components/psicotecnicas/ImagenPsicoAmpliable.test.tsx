import { act } from "react"
import { createRoot } from "react-dom/client"
import { afterEach, describe, expect, it } from "vitest"
import { ImagenPsicoAmpliable } from "./ImagenPsicoAmpliable"

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const contenedor = document.createElement("div")
document.body.append(contenedor)
const raiz = createRoot(contenedor)

afterEach(() => {
  act(() => raiz.render(<></>))
})

describe("ImagenPsicoAmpliable", () => {
  it("mantiene la lámina y permite ampliarla y volver a ajustarla", () => {
    act(() => raiz.render(<ImagenPsicoAmpliable src="/figura.svg" alt="Figura de prueba" loading="eager" />))
    const imagen = contenedor.querySelector("img")!
    const boton = contenedor.querySelector("button")!
    expect(imagen.getAttribute("src")).toBe("/figura.svg")
    expect(imagen.getAttribute("alt")).toBe("Figura de prueba")
    expect(imagen.getAttribute("loading")).toBe("eager")
    expect(boton.getAttribute("aria-expanded")).toBe("false")
    act(() => boton.click())
    expect(boton.getAttribute("aria-expanded")).toBe("true")
    expect(imagen.className).toContain("w-[900px]")
    act(() => boton.click())
    expect(boton.getAttribute("aria-expanded")).toBe("false")
  })
})
