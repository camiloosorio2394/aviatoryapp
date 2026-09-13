import { act } from "react"
import { createRoot, type Root } from "react-dom/client"
import { MemoryRouter } from "react-router-dom"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import type { Session } from "@supabase/supabase-js"

const sesion = vi.hoisted(() => ({ actual: null as Session | null }))

vi.mock("@/hooks/useSession", () => ({
  useSession: () => ({ session: sesion.actual, user: sesion.actual?.user ?? null, isLoading: false }),
}))

const { Header } = await import("@/components/layout/Header")

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

let root: Root
let contenedor: HTMLDivElement

/** Los destinos de todos los enlaces del encabezado, en orden. */
function destinos() {
  return [...contenedor.querySelectorAll("a")].map((a) => a.getAttribute("href"))
}

/** El menú de teléfono solo existe desplegado, así que hay que abrirlo. */
function abrirMenuDeTelefono() {
  const boton = contenedor.querySelector<HTMLButtonElement>('button[aria-expanded="false"]')
  if (!boton) throw new Error("No se encontró el botón del menú de teléfono")
  act(() => boton.click())
}

function pintar() {
  act(() => {
    root.render(
      <MemoryRouter initialEntries={["/pricing"]}>
        <Header />
      </MemoryRouter>,
    )
  })
}

beforeEach(() => {
  sesion.actual = null
  contenedor = document.createElement("div")
  document.body.appendChild(contenedor)
  root = createRoot(contenedor)
})

afterEach(() => {
  act(() => root.unmount())
  contenedor.remove()
})

describe("encabezado público", () => {
  it("sin sesión invita a entrar y a registrarse", () => {
    pintar()
    abrirMenuDeTelefono()
    expect(destinos()).toContain("/login")
    expect(destinos()).toContain("/login?mode=signup")
    expect(destinos()).not.toContain("/app")
  })

  it("con sesión ofrece la vuelta a la app y no pide entrar otra vez", () => {
    sesion.actual = { user: { id: "piloto-1" } } as Session
    pintar()
    abrirMenuDeTelefono()
    // Las dos puertas: la de escritorio y la del menú de teléfono.
    expect(destinos().filter((d) => d === "/app")).toHaveLength(2)
    expect(destinos().some((d) => d?.startsWith("/login"))).toBe(false)
  })
})
