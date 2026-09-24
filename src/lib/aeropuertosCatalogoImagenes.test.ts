import { describe, expect, it } from "vitest"
import { AP_CAT_FICHAS } from "@/lib/aeropuertosCatalogo"
import { imagenDeFicha } from "@/lib/aeropuertosCatalogoImagenes"

describe("imágenes del catálogo de Aeropuertos", () => {
  it("resuelve todas las imágenes prestadas de las lecciones a archivos existentes", () => {
    const prestadas = AP_CAT_FICHAS.filter((f) => f.imagen?.clase === "prestada" && f.imagen.de === "leccion")
    expect(prestadas).toHaveLength(45)
    for (const ficha of prestadas) {
      const src = imagenDeFicha(ficha)
      expect(src, ficha.es).toBeDefined()
      expect(src, ficha.es).toMatch(/^\/modulos\/aeropuertos\/ap-\d{2}-\d{2}-[^/]+\.webp$/)
    }
  })

  it("muestra el mismo archivo en las fichas que comparten una imagen propia ya verificada", () => {
    const origen = AP_CAT_FICHAS.find((f) => f.imagen?.codigo === "AP-CAT-07")!
    const barraDeViraje = AP_CAT_FICHAS.find((f) => f.es === "Barra de viraje")!
    expect(imagenDeFicha(barraDeViraje)).toBe(imagenDeFicha(origen))
  })

  it("muestra la foto específica donde antes había hueco propio", () => {
    const foto = AP_CAT_FICHAS.find((f) => f.imagen?.codigo === "AP-CAT-03")!
    expect(imagenDeFicha(foto)).toBe("/modulos/aeropuertos/ap-cat-03-eje-rodaje-sobre-pista.webp")
  })

  it("conserva el hueco cuando aún no existe un activo apto", () => {
    const pendiente = AP_CAT_FICHAS.find((f) => f.imagen?.codigo === "AP-CAT-01")!
    expect(imagenDeFicha(pendiente)).toBeUndefined()
  })
})
