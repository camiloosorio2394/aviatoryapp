import { act } from "react"
import { createRoot, type Root } from "react-dom/client"
import { MemoryRouter } from "react-router-dom"
import { afterEach, beforeEach, describe, expect, it } from "vitest"

import { InvitarTrasAprobar } from "@/components/constancia/InvitarTrasAprobar"

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const CLAVE = "aviatory.invitacion.pospuesta"
const UN_DIA = 86_400_000

let root: Root
let contenedor: HTMLDivElement

function pintar() {
  act(() => {
    root.render(
      <MemoryRouter>
        <InvitarTrasAprobar />
      </MemoryRouter>,
    )
  })
}

function seVe() {
  return contenedor.textContent?.includes("Ver mi enlace") ?? false
}

beforeEach(() => {
  localStorage.clear()
  contenedor = document.createElement("div")
  document.body.appendChild(contenedor)
  root = createRoot(contenedor)
})

afterEach(() => {
  act(() => root.unmount())
  contenedor.remove()
})

describe("la invitación de después de aprobar", () => {
  it("se ofrece cuando no se ha pospuesto", () => {
    pintar()
    expect(seVe()).toBe(true)
  })

  it("cerrarla la calla, y lo recuerda al volver", () => {
    pintar()
    const cerrar = contenedor.querySelector<HTMLButtonElement>('button[aria-label="Ahora no"]')
    act(() => cerrar!.click())
    expect(seVe()).toBe(false)

    act(() => root.unmount())
    root = createRoot(contenedor)
    pintar()
    expect(seVe()).toBe(false)
  })

  it("al mes vuelve a ofrecerse: no se calla para siempre", () => {
    localStorage.setItem(CLAVE, String(Date.now() - 31 * UN_DIA))
    pintar()
    expect(seVe()).toBe(true)
  })

  it("un valor corrupto no la esconde ni rompe la pantalla del examen", () => {
    localStorage.setItem(CLAVE, "cualquier cosa")
    pintar()
    expect(seVe()).toBe(true)
  })
})
