import { afterEach, describe, expect, it, vi } from "vitest"
import { CACHE_API_SUPABASE } from "@/lib/cachesPwa"
import { borrarCacheDeLaApi, limpiarCachesJubilados } from "@/lib/limpiezaCaches"

function cacheStorageFalso(existentes: string[]) {
  const nombres = new Set(existentes)
  return {
    keys: vi.fn(async () => [...nombres]),
    delete: vi.fn(async (nombre: string) => nombres.delete(nombre)),
  }
}

describe("cachés del service worker", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("jubila la caché vieja de Supabase y conserva la nueva y el precaché", async () => {
    const caches = cacheStorageFalso(["supabase-cache", CACHE_API_SUPABASE, "workbox-precache-v2-origen"])
    vi.stubGlobal("caches", caches)

    expect(await limpiarCachesJubilados()).toEqual(["supabase-cache"])
    expect(await caches.keys()).toEqual([CACHE_API_SUPABASE, "workbox-precache-v2-origen"])
  })

  it("al cerrar sesión vacía solo la caché de la API", async () => {
    const caches = cacheStorageFalso([CACHE_API_SUPABASE, "workbox-precache-v2-origen"])
    vi.stubGlobal("caches", caches)

    expect(await borrarCacheDeLaApi()).toBe(true)
    expect(await caches.keys()).toEqual(["workbox-precache-v2-origen"])
  })

  it("sin CacheStorage no falla", async () => {
    expect("caches" in window).toBe(false)
    expect(await borrarCacheDeLaApi()).toBe(false)
    expect(await limpiarCachesJubilados()).toEqual([])
  })
})
