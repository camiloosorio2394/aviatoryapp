import { describe, expect, it } from "vitest"
import practica from "./ejercicios_metar.json"

describe("práctica de Meteorología", () => {
  it("mantiene los 70 casos didácticos identificables como simulados", () => {
    expect(practica.ejercicios).toHaveLength(70)
    expect(new Set(practica.ejercicios.map((caso) => caso.id)).size).toBe(70)
    expect(practica.meta.aviso_obligatorio_en_pantalla).toContain("simulados")
  })

  it("incluye claves METAR/TAF de varios países además de Colombia", () => {
    const codigos = practica.ejercicios.map((caso) => caso.metar.match(/^(?:METAR|SPECI|TAF) ([A-Z]{4})/)?.[1])
    const presentes = new Set(codigos)

    for (const codigo of ["EGLL", "EHAM", "OMDB", "LFPG", "SBGR"]) {
      expect(presentes, `falta el aeródromo internacional ${codigo}`).toContain(codigo)
    }

    expect(presentes).toContain("KMIA") // Convenciones estadounidenses explícitas.
  })

  it("no confunde la sintaxis TREND de METAR/SPECI con las ventanas TAF", () => {
    for (const caso of practica.ejercicios) {
      if (!/^(METAR|SPECI) /.test(caso.metar)) continue

      expect(caso.metar, `caso ${caso.id}`).not.toMatch(/\b(?:BECMG|TEMPO) \d{4}(?:\s|$)/)

      const hora = caso.metar.match(/^(?:METAR|SPECI) \w{4} \d{2}(\d{2})(\d{2})Z/)
      expect(hora, `hora del caso ${caso.id}`).not.toBeNull()
      if (!hora) continue
      const emitido = Number(hora[1]) * 60 + Number(hora[2])

      for (const ventana of caso.metar.matchAll(/\b(?:BECMG|TEMPO) FM(\d{2})(\d{2}) TL(\d{2})(\d{2})/g)) {
        const desde = Number(ventana[1]) * 60 + Number(ventana[2])
        const hasta = Number(ventana[3]) * 60 + Number(ventana[4])
        expect(desde, `inicio TREND del caso ${caso.id}`).toBeGreaterThanOrEqual(emitido)
        expect(hasta, `fin TREND del caso ${caso.id}`).toBeGreaterThan(desde)
        expect(hasta, `validez TREND del caso ${caso.id}`).toBeLessThanOrEqual(emitido + 120)
      }
    }
  })
})
