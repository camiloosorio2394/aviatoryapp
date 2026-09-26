import { beforeEach, describe, expect, it, vi } from "vitest"

const { rpc, from, reportarError } = vi.hoisted(() => ({ rpc: vi.fn(), from: vi.fn(), reportarError: vi.fn() }))
vi.mock("@/integrations/supabase/client", () => ({ supabase: { rpc, from } }))
vi.mock("@/lib/errores", () => ({ reportarError }))

import { comentar, publicar, reportar, traerAerolineasDelForo, traerFeed, traerPublicacion, votar } from "./foro"

beforeEach(() => {
  vi.clearAllMocks()
  vi.spyOn(console, "warn").mockImplementation(() => {})
})

describe("leer el foro", () => {
  it("pide el feed con sus filtros", async () => {
    rpc.mockResolvedValue({ data: { publicaciones: [], hay_mas: false }, error: null })
    const r = await traerFeed({ categoria: "avisos", orden: "nuevo", aerolinea: 3, pagina: 1 })
    expect(r).toEqual({ estado: "listo", datos: { publicaciones: [], hay_mas: false } })
    expect(rpc).toHaveBeenCalledWith("foro_feed", { p_categoria: "avisos", p_orden: "nuevo", p_aerolinea: 3, p_pagina: 1 })
  })

  it("sin la migración responde sin_foro y no lo reporta", async () => {
    rpc.mockResolvedValue({ data: null, error: { code: "PGRST202", message: "Could not find the function public.foro_feed" } })
    expect(await traerFeed()).toEqual({ estado: "sin_foro" })
    expect(reportarError).not.toHaveBeenCalled()
  })

  it("una respuesta con otra forma es un error, y se reporta", async () => {
    rpc.mockResolvedValue({ data: { algo: 1 }, error: null })
    expect(await traerFeed()).toEqual({ estado: "error" })
    expect(reportarError).toHaveBeenCalled()
  })

  it("una publicación que ya no está llega como null", async () => {
    rpc.mockResolvedValue({ data: null, error: null })
    expect(await traerPublicacion(9)).toEqual({ estado: "listo", datos: null })
    expect(rpc).toHaveBeenCalledWith("foro_publicacion", { p_id: 9 })
  })

  it("las aerolíneas para publicar, con los nombres del foro", async () => {
    const q = { select: () => q, order: async () => ({ data: [{ id: 1, name: "Avianca", code: "AVA", brand_color: "#E32327" }], error: null }) }
    from.mockReturnValue(q)
    expect(await traerAerolineasDelForo()).toEqual([{ id: 1, nombre: "Avianca", codigo: "AVA", color: "#E32327" }])
  })
})

describe("escribir en el foro", () => {
  it("publicar manda todo y devuelve el id", async () => {
    rpc.mockResolvedValue({ data: 7, error: null })
    const r = await publicar({ categoria: "avisos", titulo: "LATAM abrió convocatoria", cuerpo: "", aerolinea: 2, ciudad: "Bogotá", anonima: false })
    expect(r).toEqual({ ok: true, datos: 7 })
    expect(rpc).toHaveBeenCalledWith("foro_publicar", {
      p_categoria: "avisos",
      p_titulo: "LATAM abrió convocatoria",
      p_cuerpo: "",
      p_aerolinea: 2,
      p_ciudad: "Bogotá",
      p_anonima: false,
    })
  })

  it("lo que la base explica se dice en palabras del piloto y no se reporta", async () => {
    rpc.mockResolvedValue({ data: null, error: { code: "P0001", message: "demasiadas_publicaciones" } })
    expect(await votar(1, 1)).toEqual({ ok: false, mensaje: "Llegaste al máximo de hoy. Vuelve a intentarlo mañana." })
    expect(reportarError).not.toHaveBeenCalled()
  })

  it("un fallo que la base no explica se reporta", async () => {
    rpc.mockResolvedValue({ data: null, error: { code: "500", message: "se cayó" } })
    const r = await comentar(1, "hola")
    expect(r.ok).toBe(false)
    expect(reportarError).toHaveBeenCalledWith("foro: comentar", { code: "500", message: "se cayó" })
  })

  it("comentar y reportar mandan a qué responden y qué reportan", async () => {
    rpc.mockResolvedValue({ data: true, error: null })
    await comentar(1, "respuesta", { padre: 4, anonimo: true })
    expect(rpc).toHaveBeenCalledWith("foro_comentar", { p_publicacion: 1, p_cuerpo: "respuesta", p_padre: 4, p_anonimo: true })
    await reportar({ comentario: 4 }, "spam")
    expect(rpc).toHaveBeenCalledWith("foro_reportar", { p_publicacion: null, p_comentario: 4, p_motivo: "spam", p_detalle: null })
  })
})
