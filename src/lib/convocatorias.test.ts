import { describe, expect, it } from "vitest"
import type { Convocatoria } from "@/services/convocatorias"
import {
  agruparPorPais,
  banderaDe,
  fechaLarga,
  chequeosDeConvocatoria,
  horasQueAplican,
  hoyEnBogota,
  resumenDeConvocatorias,
  textoDeHoras,
  textoDelAviso,
} from "@/lib/convocatorias"

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
    horasMinimas: null,
    horasNacionales: null,
    horasExtranjeros: null,
    nivelIcao: null,
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

describe("las horas y el nivel de cada convocatoria frente al piloto", () => {
  // Los números los lee la función de borde al guardar; sus pruebas están en
  // scripts/convocatorias/lectores.test.ts. Aquí se prueba qué hace la app con ellos.
  const copa = { horas: null, horasNacionales: 250, horasExtranjeros: 1000, icao: 5 }

  it("Copa: al colombiano le aplican las de extranjero; al panameño, las de nacional", () => {
    expect(horasQueAplican(copa, "Colombia", "Panamá")).toBe(1000)
    expect(horasQueAplican(copa, "Panamá", "Panama")).toBe(250)
    // Sin país del piloto, las de extranjero: las que más piden.
    expect(horasQueAplican(copa, null, "Panamá")).toBe(1000)
    expect(textoDeHoras(copa, "Panamá")).toBe("250 h si eres de Panamá · 1.000 h si eres extranjero")
  })

  it("Arajet: 1.500 generales y 1.000 para dominicanos", () => {
    const arajet = { horas: 1500, horasNacionales: 1000, horasExtranjeros: null, icao: 4 }
    expect(horasQueAplican(arajet, "Colombia", "República Dominicana")).toBe(1500)
    expect(horasQueAplican(arajet, "República Dominicana", "Republica Dominicana")).toBe(1000)
  })

  it("los chequeos salen solo de lo publicado y dicen lo que falta", () => {
    const c = conv({ horasNacionales: 250, horasExtranjeros: 1000, nivelIcao: 5 })
    expect(chequeosDeConvocatoria(c, { horas: 420, icao: 4, pais: "Colombia" })).toEqual([
      { etiqueta: "Horas de vuelo", pide: "1.000 h", tienes: "420 h", cumple: false, falta: "580 h de vuelo" },
      { etiqueta: "Inglés ICAO", pide: "Nivel 5", tienes: "Nivel 4", cumple: false, falta: "subir a nivel 5 de inglés" },
    ])
    // Sin datos del piloto no se sabe; sin datos de la convocatoria, no hay chequeo.
    expect(chequeosDeConvocatoria(c, { horas: null, icao: null, pais: null }).map((ch) => ch.cumple)).toEqual([null, null])
    expect(chequeosDeConvocatoria(conv({}), { horas: 420, icao: 4, pais: "Colombia" })).toEqual([])
  })
})

describe("por país", () => {
  it("agrupa con el país del piloto primero y las de ingreso antes que capitán", () => {
    const po = conv({ pais: "Argentina" })
    const cap = conv({ pais: "Colombia", cargo: "capitan" })
    const poCo = conv({ pais: "Colombia" })
    const grupos = agruparPorPais([po, cap, poCo], "Colombia")
    expect(grupos.map((g) => g.pais)).toEqual(["Colombia", "Argentina"])
    expect(grupos[0].convocatorias).toEqual([poCo, cap])
  })

  it("cada país con su bandera; uno que no conocemos, sin bandera", () => {
    expect(banderaDe("Panamá")).toBe("/banderas/pa.webp")
    expect(banderaDe("República Dominicana")).toBe("/banderas/do.webp")
    expect(banderaDe("Narnia")).toBeNull()
  })
})
