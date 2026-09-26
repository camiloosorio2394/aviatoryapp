import { describe, expect, it } from "vitest"
import {
  CATEGORIAS_FORO,
  conConfirmacion,
  conVoto,
  formatearPuntos,
  haceCuanto,
  mensajeForo,
  nombreDeAutor,
  partesConEnlaces,
  rutaCategoria,
  rutaPublicacion,
  slugDeTitulo,
  type PublicacionForo,
} from "./foro"

const aviso = (cambios: Partial<PublicacionForo> = {}): PublicacionForo => ({
  id: 1,
  categoria: "avisos",
  titulo: "LATAM abrió convocatoria",
  cuerpo: "",
  recortado: false,
  aerolinea: null,
  ciudad: null,
  autor: null,
  anonima: false,
  puntos: 1,
  comentarios: 0,
  confirmaciones: 0,
  desmentidos: 0,
  vigente: true,
  estado: "publicada",
  creada_en: "2026-09-26T12:00:00Z",
  editada_en: null,
  mi_voto: 0,
  mi_confirmacion: null,
  es_mia: false,
  ...cambios,
})

// La migración, como texto: de ahí salen las claves que la base acepta.
const migracion = Object.values(
  import.meta.glob<string>("/supabase/migrations/20261003010000_foro_de_la_comunidad.sql", {
    query: "?raw",
    import: "default",
    eager: true,
  }),
)[0]

describe("las categorías", () => {
  it("son las mismas seis de la migración, en el mismo orden", () => {
    const sql = migracion
    const bloque = sql.slice(sql.indexOf("insert into public.foro_categorias"), sql.indexOf("on conflict (clave)"))
    const claves = [...bloque.matchAll(/\('([a-z-]+)',/g)].map((m) => m[1])
    expect(claves).toEqual(CATEGORIAS_FORO.map((c) => c.clave))
  })
})

describe("las rutas", () => {
  it("el título en letras, sin tildes ni signos", () => {
    expect(slugDeTitulo("Así fue mi proceso en Avianca, del CV al simulador")).toBe("asi-fue-mi-proceso-en-avianca-del-cv-al-simulador")
    expect(slugDeTitulo("¿Cuántas horas piden hoy?")).toBe("cuantas-horas-piden-hoy")
    expect(slugDeTitulo("¡¡¡!!!")).toBe("publicacion")
    const largo = slugDeTitulo("palabra ".repeat(30))
    expect(largo.length).toBeLessThanOrEqual(80)
    expect(largo.endsWith("-")).toBe(false)
  })

  it("dentro de la app", () => {
    expect(rutaPublicacion({ id: 42, titulo: "Mi primer año" })).toBe("/app/comunidad/p/42/mi-primer-ano")
    expect(rutaCategoria("avisos")).toBe("/app/comunidad/c/avisos")
    expect(rutaCategoria(null)).toBe("/app/comunidad")
  })
})

describe("lo que cambia antes de que conteste la base", () => {
  it("el voto se aplica por diferencia, como en la base", () => {
    const p = aviso({ puntos: 5, mi_voto: 0 })
    expect(conVoto(p, 1)).toMatchObject({ puntos: 6, mi_voto: 1 })
    expect(conVoto({ ...p, mi_voto: 1 }, -1)).toMatchObject({ puntos: 3, mi_voto: -1 })
    expect(conVoto({ ...p, mi_voto: -1 }, 0)).toMatchObject({ puntos: 6, mi_voto: 0 })
  })

  it("confirmar y desmentir mueven las dos cuentas", () => {
    const sigue = conConfirmacion(aviso({ confirmaciones: 2 }), true)
    expect(sigue).toMatchObject({ confirmaciones: 3, desmentidos: 0, mi_confirmacion: true, vigente: true })
    const yaNo = conConfirmacion(sigue, false)
    expect(yaNo).toMatchObject({ confirmaciones: 2, desmentidos: 1, mi_confirmacion: false })
    expect(conConfirmacion(yaNo, null)).toMatchObject({ confirmaciones: 2, desmentidos: 0, mi_confirmacion: null })
  })

  it("con tres «ya no» que ganan, el aviso deja de estar vigente", () => {
    expect(conConfirmacion(aviso({ confirmaciones: 1, desmentidos: 2 }), false).vigente).toBe(false)
    expect(conConfirmacion(aviso({ confirmaciones: 4, desmentidos: 2 }), false).vigente).toBe(true)
  })
})

describe("los textos", () => {
  it("los enlaces se separan sin arrastrar la puntuación", () => {
    expect(partesConEnlaces("Mira https://avianca.com/empleos. Cierra hoy")).toEqual([
      { texto: "Mira " },
      { texto: "https://avianca.com/empleos", enlace: "https://avianca.com/empleos" },
      { texto: ". Cierra hoy" },
    ])
    expect(partesConEnlaces("sin enlaces")).toEqual([{ texto: "sin enlaces" }])
  })

  it("la hora de un foro", () => {
    const ahora = new Date("2026-09-26T12:00:00Z")
    expect(haceCuanto("2026-09-26T11:59:30Z", ahora)).toBe("ahora")
    expect(haceCuanto("2026-09-26T11:55:00Z", ahora)).toBe("hace 5 min")
    expect(haceCuanto("2026-09-26T09:00:00Z", ahora)).toBe("hace 3 h")
    expect(haceCuanto("2026-09-24T12:00:00Z", ahora)).toBe("hace 2 d")
    expect(haceCuanto("2026-08-01T12:00:00Z", ahora)).toMatch(/1.*ago/)
    expect(haceCuanto("no es fecha", ahora)).toBe("")
  })

  it("puntos, autor y errores", () => {
    expect(formatearPuntos(999)).toBe("999")
    expect(formatearPuntos(1234)).toBe("1,2 k")
    expect(nombreDeAutor(null)).toBe("Piloto anónimo")
    expect(nombreDeAutor({ usuario: "capi", foto: null, racha: 0 })).toBe("@capi")
    expect(mensajeForo("aviso_sin_aerolinea")).toMatch(/aerolínea/)
    expect(mensajeForo("otra_cosa")).toMatch(/No pudimos/)
  })
})
