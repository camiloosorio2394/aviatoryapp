import { describe, expect, it } from "vitest"
import type { Convocatoria } from "@/services/convocatorias"
import { fechaLarga, hoyEnBogota, resumenDeConvocatorias, textoDelAviso } from "@/lib/convocatorias"

let id = 0
function conv(p: Partial<Convocatoria>): Convocatoria {
  id += 1
  return {
    id,
    airlineId: 3,
    cargo: "primer_oficial",
    tipo: "vacante",
    titulo: "Primer Oficial",
    pais: "Panamá",
    ciudad: "Panamá",
    url: "https://ejemplo.com/vacante",
    publicadaEn: "2026-02-10",
    cierraEn: "2026-12-31",
    requisitos: ["Licencia comercial"],
    idioma: "es",
    abierta: true,
    cerradaEn: null,
    ...p,
  }
}

const HOY = "2026-09-26"

describe("resumenDeConvocatorias", () => {
  it("una de primer oficial abierta enciende el aviso; la de capitán va aparte", () => {
    const po = conv({})
    const cap = conv({ cargo: "capitan", titulo: "Capitan" })
    const r = resumenDeConvocatorias(3, [po, cap], HOY)
    expect(r.abiertas).toEqual([po])
    expect(r.otrasAbiertas).toEqual([cap])
    expect(textoDelAviso(r)).toBe("Abierta · Panamá")
  })

  it("solo capitán abierto no es convocatoria para quien busca su primer puesto", () => {
    const r = resumenDeConvocatorias(3, [conv({ cargo: "capitan" })], HOY)
    expect(r.abiertas).toEqual([])
    expect(textoDelAviso(r)).toBe("Pendiente por abrir")
  })

  it("una abierta cuya fecha de cierre ya pasó no cuenta", () => {
    const vencida = conv({ cierraEn: "2026-09-25" })
    const r = resumenDeConvocatorias(3, [vencida], HOY)
    expect(r.abiertas).toEqual([])
    // Pero sus requisitos sirven de referencia.
    expect(r.referencia).toBe(vencida)
  })

  it("sin nada abierto, la página de pilotos gana a una vacante cerrada como referencia", () => {
    const cerrada = conv({ abierta: false, cerradaEn: "2026-08-01T12:00:00Z" })
    const pagina = conv({ abierta: false, tipo: "pagina", cargo: "piloto", titulo: "Pilotos" })
    const r = resumenDeConvocatorias(3, [cerrada, pagina], HOY)
    expect(r.referencia).toBe(pagina)
  })

  it("no mezcla aerolíneas y sin requisitos no hay referencia", () => {
    const deOtra = conv({ airlineId: 7 })
    const sinRequisitos = conv({ abierta: false, requisitos: [] })
    const r = resumenDeConvocatorias(3, [deOtra, sinRequisitos], HOY)
    expect(r).toEqual({ abiertas: [], otrasAbiertas: [], referencia: null })
  })

  it("con abiertas en dos países, el aviso no nombra ninguno", () => {
    const r = resumenDeConvocatorias(3, [conv({}), conv({ pais: "Colombia" })], HOY)
    expect(textoDelAviso(r)).toBe("Convocatoria abierta")
  })
})

describe("fechas", () => {
  it("escribe la fecha larga sin correrse un día por la zona horaria", () => {
    expect(fechaLarga("2027-01-01")).toBe("1 de enero de 2027")
    expect(fechaLarga("2026-09-26T03:00:00Z")).toBe("26 de septiembre de 2026")
  })

  it("hoy es el de Bogotá", () => {
    // 02:00 UTC del 27 es todavía el 26 en Bogotá.
    expect(hoyEnBogota(new Date("2026-09-27T02:00:00Z"))).toBe("2026-09-26")
  })
})
