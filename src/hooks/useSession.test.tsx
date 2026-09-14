import { act, useEffect } from "react"
import { createRoot, type Root } from "react-dom/client"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import type { Session } from "@supabase/supabase-js"

const auth = vi.hoisted(() => ({
  getSession: vi.fn(),
  onAuthStateChange: vi.fn(),
}))

vi.mock("@/integrations/supabase/client", () => ({ supabase: { auth } }))

const { useSession } = await import("@/hooks/useSession")

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

/** Una sesión de mentira: solo lo que el hook mira. */
const sesionCon = (token: string, userId = "piloto-1") =>
  ({ access_token: token, user: { id: userId } }) as unknown as Session

let avisarCambio: (evento: string, sesion: Session | null) => void
let desuscribir: ReturnType<typeof vi.fn>
let pintadas: string[]

/** Cuenta cuántas veces pinta cada sonda, para ver a quién despierta un cambio. */
function Sonda({ nombre }: { nombre: string }) {
  const { session, isLoading } = useSession()
  useEffect(() => {
    pintadas.push(`${nombre}:${isLoading ? "cargando" : (session?.access_token ?? "sin-sesion")}`)
  })
  return null
}

let root: Root
let contenedor: HTMLDivElement

beforeEach(() => {
  pintadas = []
  desuscribir = vi.fn()
  auth.getSession.mockResolvedValue({ data: { session: null } })
  auth.onAuthStateChange.mockImplementation((cb: typeof avisarCambio) => {
    avisarCambio = cb
    return { data: { subscription: { unsubscribe: desuscribir } } }
  })
  contenedor = document.createElement("div")
  document.body.appendChild(contenedor)
  root = createRoot(contenedor)
})

afterEach(() => {
  act(() => root.unmount())
  contenedor.remove()
  vi.clearAllMocks()
})

function pintar(cuantas: number) {
  act(() => {
    root.render(
      <>
        {Array.from({ length: cuantas }, (_, i) => (
          <Sonda key={i} nombre={`s${i + 1}`} />
        ))}
      </>,
    )
  })
}

describe("useSession", () => {
  it("tres componentes, una sola suscripción y una sola lectura del token", async () => {
    pintar(3)
    await act(async () => {})

    expect(auth.onAuthStateChange).toHaveBeenCalledTimes(1)
    expect(auth.getSession).toHaveBeenCalledTimes(1)
  })

  it("un cambio de sesión llega a todos los que estén montados", async () => {
    pintar(3)
    await act(async () => {})
    pintadas = []

    act(() => avisarCambio("SIGNED_IN", sesionCon("token-1")))

    expect(pintadas.sort()).toEqual(["s1:token-1", "s2:token-1", "s3:token-1"])
  })

  it("si el token no cambió, no repinta a nadie", async () => {
    pintar(3)
    await act(async () => {})
    act(() => avisarCambio("SIGNED_IN", sesionCon("token-1")))
    pintadas = []

    // Supabase avisa también al volver a la pestaña, con la misma sesión.
    act(() => avisarCambio("TOKEN_REFRESHED", sesionCon("token-1")))

    expect(pintadas).toEqual([])
  })

  it("salir deja a todos sin sesión", async () => {
    pintar(2)
    await act(async () => {})
    act(() => avisarCambio("SIGNED_IN", sesionCon("token-1")))
    pintadas = []

    act(() => avisarCambio("SIGNED_OUT", null))

    expect(pintadas.sort()).toEqual(["s1:sin-sesion", "s2:sin-sesion"])
  })

  it("se desuscribe de Supabase cuando se va el último componente", async () => {
    pintar(2)
    await act(async () => {})

    // Queda uno: la suscripción sigue viva.
    pintar(1)
    expect(desuscribir).not.toHaveBeenCalled()

    act(() => root.render(<></>))
    expect(desuscribir).toHaveBeenCalledTimes(1)
  })
})
