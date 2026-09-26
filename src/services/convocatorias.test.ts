import { describe, expect, it, vi } from "vitest"
import { leerConvocatorias } from "@/services/convocatorias"

const fila = {
  id: 1,
  airline_id: 3,
  cargo: "primer_oficial",
  tipo: "vacante",
  titulo: "Primer Oficial",
  pais: "Panamá",
  ciudad: "Panamá",
  url: "https://ejom.fa.us6.oraclecloud.com/hcmUI/CandidateExperience/es/sites/CX_1/job/12380",
  publicada_en: "2026-02-10",
  cierra_en: "2026-12-31",
  requisitos: ["Minimum age: Twenty-one (21) years.", "  ", 42],
  idioma: "en",
  abierta: true,
  cerrada_en: null,
  horas_minimas: null,
  horas_nacionales: 250,
  horas_extranjeros: 1000,
  nivel_icao: 5,
}

describe("leerConvocatorias", () => {
  it("deja cada fila en la forma de la app", () => {
    expect(leerConvocatorias([fila])).toEqual([
      {
        id: 1,
        airlineId: 3,
        cargo: "primer_oficial",
        tipo: "vacante",
        titulo: "Primer Oficial",
        pais: "Panamá",
        ciudad: "Panamá",
        url: fila.url,
        publicadaEn: "2026-02-10",
        cierraEn: "2026-12-31",
        requisitos: ["Minimum age: Twenty-one (21) years."],
        idioma: "en",
        abierta: true,
        cerradaEn: null,
        horasMinimas: null,
        horasNacionales: 250,
        horasExtranjeros: 1000,
        nivelIcao: 5,
      },
    ])
  })

  it("descarta la fila rara y sigue con las demás", () => {
    const aviso = vi.spyOn(console, "warn").mockImplementation(() => {})
    const lista = leerConvocatorias([
      { ...fila, id: 2, url: "http://sin-https.com" },
      { ...fila, id: 3, cargo: "azafata" },
      { ...fila, id: 4 },
    ])
    expect(lista.map((c) => c.id)).toEqual([4])
    expect(aviso).toHaveBeenCalledTimes(2)
    aviso.mockRestore()
  })

  it("si no llega una lista, es un error", () => {
    expect(() => leerConvocatorias({})).toThrow(/lista/)
  })
})
