import type { AuthChangeEvent, Session } from "@supabase/supabase-js"
import { beforeEach, describe, expect, it, vi } from "vitest"

type Oyente = (evento: AuthChangeEvent, sesion: Session | null) => void

const doble = vi.hoisted(() => ({
  oyente: null as ((evento: string, sesion: unknown) => void) | null,
  borrarCacheDeLaApi: vi.fn(async () => true),
  reclamarDatosLocales: vi.fn(() => false),
}))

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      onAuthStateChange: (oyente: Oyente) => {
        doble.oyente = oyente as (evento: string, sesion: unknown) => void
        return { data: { subscription: { unsubscribe: () => {} } } }
      },
    },
  },
}))
vi.mock("@/lib/limpiezaCaches", () => ({ borrarCacheDeLaApi: doble.borrarCacheDeLaApi }))
vi.mock("@/lib/datosLocales", () => ({ reclamarDatosLocales: doble.reclamarDatosLocales }))

const { protegerDatosDeEsteEquipo } = await import("@/lib/sesionEnEsteEquipo")

function emitir(evento: AuthChangeEvent, userId?: string) {
  doble.oyente?.(evento, userId ? { user: { id: userId } } : null)
}

describe("sesión en este equipo", () => {
  beforeEach(() => {
    doble.borrarCacheDeLaApi.mockClear()
    doble.reclamarDatosLocales.mockClear()
    protegerDatosDeEsteEquipo()
  })

  it("al iniciar o recuperar sesión, los datos locales pasan a nombre de ese piloto", () => {
    emitir("INITIAL_SESSION", "piloto-a")
    emitir("SIGNED_IN", "piloto-b")
    expect(doble.reclamarDatosLocales).toHaveBeenNthCalledWith(1, "piloto-a")
    expect(doble.reclamarDatosLocales).toHaveBeenNthCalledWith(2, "piloto-b")
    expect(doble.borrarCacheDeLaApi).not.toHaveBeenCalled()
  })

  it("al cerrar sesión vacía la caché de la API y no toca el progreso local", () => {
    emitir("SIGNED_OUT")
    expect(doble.borrarCacheDeLaApi).toHaveBeenCalledOnce()
    expect(doble.reclamarDatosLocales).not.toHaveBeenCalled()
  })

  it("sin sesión al arrancar no hace nada", () => {
    emitir("INITIAL_SESSION")
    expect(doble.reclamarDatosLocales).not.toHaveBeenCalled()
    expect(doble.borrarCacheDeLaApi).not.toHaveBeenCalled()
  })
})
