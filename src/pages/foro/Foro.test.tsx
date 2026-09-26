import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { boton, clic, desmontarTodo, montar } from "@/test/pantalla"
import type { PublicacionForo } from "@/lib/foro"

const foro = vi.hoisted(() => ({
  traerFeed: vi.fn(),
  traerTendencias: vi.fn(),
  votar: vi.fn(),
  confirmarAviso: vi.fn(),
}))
vi.mock("@/services/foro", () => foro)
vi.mock("@/hooks/useSession", () => ({ useSession: () => ({ user: { id: "p1", user_metadata: { username: "capi" } } }) }))
vi.mock("@/pages/Community", () => ({ Community: () => <p>salas de chat</p> }))
vi.mock("@/services/perfil", () => ({ traerIdentidadEnLaBarra: vi.fn().mockResolvedValue({ username: "capi", photoUrl: null }) }))

const { Foro } = await import("./Foro")

const publicacion = (cambios: Partial<PublicacionForo>): PublicacionForo => ({
  id: 1,
  categoria: "entrevistas",
  titulo: "Así fue mi proceso en Avianca",
  cuerpo: "Primero psicotécnicas, luego simulador.",
  recortado: false,
  aerolinea: null,
  ciudad: null,
  autor: { usuario: "capi_a", foto: null, racha: 4 },
  anonima: false,
  puntos: 3,
  comentarios: 2,
  confirmaciones: 0,
  desmentidos: 0,
  vigente: null,
  estado: "publicada",
  creada_en: new Date().toISOString(),
  editada_en: null,
  mi_voto: 0,
  mi_confirmacion: null,
  es_mia: false,
  ...cambios,
})

const pintar = (ruta = "/app/comunidad") =>
  montar(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/app/comunidad" element={<Foro />} />
        <Route path="/app/comunidad/c/:categoria" element={<Foro />} />
      </Routes>
    </MemoryRouter>,
  )

beforeEach(() => {
  vi.clearAllMocks()
  foro.traerTendencias.mockResolvedValue({ estado: "listo", datos: { categorias: [], aerolineas: [], avisos: [] } })
})
afterEach(desmontarTodo)

describe("el feed de la comunidad", () => {
  it("pinta las publicaciones con su categoría, autor y comentarios", async () => {
    foro.traerFeed.mockResolvedValue({ estado: "listo", datos: { publicaciones: [publicacion({})], hay_mas: false } })
    const p = await pintar()
    expect(p.texto()).toContain("Así fue mi proceso en Avianca")
    expect(p.texto()).toContain("@capi_a")
    expect(p.texto()).toContain("2 comentarios")
    expect(foro.traerFeed).toHaveBeenCalledWith({ categoria: null, orden: "tendencia", aerolinea: null, pagina: 0 })
  })

  it("votar suma de una vez y queda lo que dice la base", async () => {
    foro.traerFeed.mockResolvedValue({ estado: "listo", datos: { publicaciones: [publicacion({})], hay_mas: false } })
    foro.votar.mockResolvedValue({ ok: true, datos: { puntos: 4, mi_voto: 1 } })
    await pintar()
    await clic(boton("Votar a favor"))
    expect(foro.votar).toHaveBeenCalledWith(1, 1)
    expect(document.querySelector("[role=group][aria-label='4 puntos']")).not.toBeNull()
  })

  it("si el voto falla, vuelve a como estaba", async () => {
    foro.traerFeed.mockResolvedValue({ estado: "listo", datos: { publicaciones: [publicacion({})], hay_mas: false } })
    foro.votar.mockResolvedValue({ ok: false, mensaje: "Llegaste al máximo de hoy." })
    await pintar()
    await clic(boton("Votar a favor"))
    expect(document.querySelector("[role=group][aria-label='3 puntos']")).not.toBeNull()
  })

  it("un aviso pregunta si sigue vigente y confirma", async () => {
    const a = publicacion({ id: 2, categoria: "avisos", titulo: "LATAM está llamando a entrevistas", vigente: true, confirmaciones: 1 })
    foro.traerFeed.mockResolvedValue({ estado: "listo", datos: { publicaciones: [a], hay_mas: false } })
    foro.confirmarAviso.mockResolvedValue({ ok: true, datos: { confirmaciones: 2, desmentidos: 0, vigente: true, mi_confirmacion: true } })
    const p = await pintar()
    expect(p.texto()).toContain("¿Sigue vigente?")
    await clic(boton("Sí"))
    expect(foro.confirmarAviso).toHaveBeenCalledWith(2, true)
    expect(p.texto()).toContain("2 lo confirman")
  })

  it("la categoría viene de la dirección", async () => {
    foro.traerFeed.mockResolvedValue({ estado: "listo", datos: { publicaciones: [], hay_mas: false } })
    const p = await pintar("/app/comunidad/c/cursos")
    expect(foro.traerFeed).toHaveBeenCalledWith({ categoria: "cursos", orden: "tendencia", aerolinea: null, pagina: 0 })
    expect(p.texto()).toContain("Todavía no hay nada en Cursos y habilitaciones")
  })

  it("sin la migración, se ven las salas de chat de siempre", async () => {
    foro.traerFeed.mockResolvedValue({ estado: "sin_foro" })
    const p = await pintar()
    expect(p.texto()).toContain("salas de chat")
  })
})
