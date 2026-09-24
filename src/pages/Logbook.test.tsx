import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import type { Flight, ResumenBitacora } from "@/services/bitacora"
import { boton, campo, clic, desmontarTodo, escribir, montar } from "@/test/pantalla"

// La bitácora se lee en la zona del piloto: un vuelo del día 1 no puede caer en
// el mes anterior. Se fija antes de que nada toque una fecha.
vi.stubEnv("TZ", "America/Bogota")

const servicio = vi.hoisted(() => ({
  traerBitacora: vi.fn(),
  guardarVuelo: vi.fn(),
  borrarVuelo: vi.fn(),
}))
const avisos = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }))
const errores = vi.hoisted(() => ({ reportarError: vi.fn() }))
// El mismo objeto en cada render, como el hook de verdad: si cambiara, la
// pantalla volvería a pedir la bitácora en cada repintado.
const sesion = vi.hoisted(() => ({ user: { id: "piloto-1" }, session: null, isLoading: false }))

vi.mock("@/services/bitacora", async (original) => ({
  ...(await original<typeof import("@/services/bitacora")>()),
  ...servicio,
}))
vi.mock("sonner", () => ({ toast: avisos }))
vi.mock("@/lib/errores", () => errores)
vi.mock("@/hooks/useSession", () => ({ useSession: () => sesion }))

const { Logbook } = await import("@/pages/Logbook")
const { RESUMEN_BITACORA_VACIO } = await import("@/services/bitacora")

function vuelo(parcial: Partial<Flight>): Flight {
  return {
    id: 1,
    flight_date: "2026-09-10",
    aircraft_registration: "HK-1234",
    aircraft_type: "C172",
    from_airport: "SKBO",
    to_airport: "SKMD",
    total_minutes: 90,
    pic_minutes: 90,
    sic_minutes: 0,
    dual_minutes: 0,
    instrument_real_minutes: 0,
    instrument_sim_minutes: 0,
    night_minutes: 0,
    cross_country_minutes: 0,
    landings_day: 1,
    landings_night: 0,
    remarks: null,
    created_at: "2026-09-10T20:00:00Z",
    ...parcial,
  }
}

function resumen(parcial: Partial<ResumenBitacora>): ResumenBitacora {
  return { ...RESUMEN_BITACORA_VACIO, ...parcial }
}

function respuesta(vuelos: Flight[], r: Partial<ResumenBitacora> = {}, error: { message: string } | null = null) {
  return { vuelos, resumen: resumen(r), error }
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] })
  vi.setSystemTime(new Date("2026-09-24T15:00:00Z"))
  servicio.traerBitacora.mockReset()
  servicio.guardarVuelo.mockReset().mockResolvedValue(undefined)
  servicio.borrarVuelo.mockReset().mockResolvedValue({ error: null })
  avisos.success.mockReset()
  avisos.error.mockReset()
  errores.reportarError.mockReset()
  vi.spyOn(window, "confirm").mockReturnValue(true)
})

afterEach(() => {
  desmontarTodo()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe("la bitácora de vuelo", () => {
  it("muestra los totales que calcula la base, no los de la lista", async () => {
    servicio.traerBitacora.mockResolvedValue(
      respuesta([vuelo({ id: 1 }), vuelo({ id: 2, flight_date: "2026-09-12", from_airport: "SKCL" })], {
        vuelos: 600,
        minutosTotal: 45_000,
        minutosUltimos90Dias: 1_230,
        aterrizajesUltimos90Dias: 14,
      }),
    )
    const p = await montar(<Logbook />)

    expect(servicio.traerBitacora).toHaveBeenCalledWith("piloto-1")
    expect(p.texto()).toContain("LOGBOOK · 750.0h TOTALES")
    expect(p.texto()).toContain("20.5 h")
    expect(p.texto()).toContain("14")
    // La lista trae 2, pero el piloto tiene 600: se dice, no se esconde.
    expect(p.texto()).toContain("Los 2 más recientes de 600 vuelos")
    expect(p.texto()).toContain("SKCL")
  })

  it("sin vuelos invita a registrar el primero", async () => {
    servicio.traerBitacora.mockResolvedValue(respuesta([]))
    const p = await montar(<Logbook />)
    expect(p.texto()).toContain("Empieza tu logbook digital")
    expect(p.texto()).toContain("0 vuelos")
  })

  it("si la carga falla lo reporta y se lo dice al piloto", async () => {
    const fallo = { message: "JWT expired" }
    servicio.traerBitacora.mockResolvedValue(respuesta([], {}, fallo))
    await montar(<Logbook />)

    expect(errores.reportarError).toHaveBeenCalledWith("bitácora: cargar", fallo)
    expect(avisos.error).toHaveBeenCalledWith(expect.stringContaining("No pudimos cargar tu bitácora"))
  })

  it("un vuelo del día 1 queda en su mes, no en el anterior", async () => {
    servicio.traerBitacora.mockResolvedValue(respuesta([vuelo({ id: 7, flight_date: "2026-09-01" })]))
    const p = await montar(<Logbook />)

    expect(p.texto()).toContain("septiembre de 2026")
    expect(p.texto()).not.toContain("agosto")
    expect(boton(/Eliminar el vuelo del 01 /).getAttribute("aria-label")).toMatch(/^Eliminar el vuelo del 01 SEP/)
  })

  it("el filtro «Este año» no deja fuera el vuelo del 1 de enero", async () => {
    servicio.traerBitacora.mockResolvedValue(
      respuesta([vuelo({ id: 1, flight_date: "2026-01-01" }), vuelo({ id: 2, flight_date: "2025-12-31" })]),
    )
    const p = await montar(<Logbook />)
    await clic(boton("Este año"))
    expect(p.texto()).toContain("1 vuelos")
    expect(p.texto()).toContain("enero de 2026")
    expect(p.texto()).not.toContain("diciembre de 2025")
  })

  it("registrar un vuelo manda los minutos y los códigos en mayúscula, y recarga", async () => {
    servicio.traerBitacora.mockResolvedValue(respuesta([]))
    await montar(<Logbook />)

    await clic(boton("Nuevo vuelo"))
    await escribir(campo("Fecha"), "2026-09-20")
    await escribir(campo("Tiempo total (horas)"), "1.5")
    await escribir(campo("Matrícula"), " hk-1234 ")
    await escribir(campo("Tipo de aeronave"), "c172")
    await escribir(campo("Desde (ICAO)"), "skbo")
    await escribir(campo("Hasta (ICAO)"), "skmd")
    await escribir(campo("PIC"), "1.5")
    await escribir(campo("Nocturno"), "0.4")
    await escribir(campo("Observaciones"), "  Viento cruzado  ")
    await clic(boton("Registrar vuelo"))

    expect(servicio.guardarVuelo).toHaveBeenCalledWith({
      userId: "piloto-1",
      flightDate: "2026-09-20",
      aircraftRegistration: "HK-1234",
      aircraftType: "C172",
      fromAirport: "SKBO",
      toAirport: "SKMD",
      totalMinutes: 90,
      picMinutes: 90,
      sicMinutes: 0,
      dualMinutes: 0,
      instrumentRealMinutes: 0,
      instrumentSimMinutes: 0,
      nightMinutes: 24,
      crossCountryMinutes: 0,
      landingsDay: 1,
      landingsNight: 0,
      remarks: "Viento cruzado",
    })
    expect(avisos.success).toHaveBeenCalledWith("Vuelo registrado")
    expect(servicio.traerBitacora).toHaveBeenCalledTimes(2)
  })

  it("sin tiempo total no guarda nada", async () => {
    servicio.traerBitacora.mockResolvedValue(respuesta([]))
    await montar(<Logbook />)
    await clic(boton("Nuevo vuelo"))
    await escribir(campo("Tiempo total (horas)"), "0")
    await clic(boton("Registrar vuelo"))

    expect(servicio.guardarVuelo).not.toHaveBeenCalled()
    expect(avisos.error).toHaveBeenCalledWith("El tiempo total debe ser mayor a 0")
  })

  it("si el vuelo no se guarda lo reporta y deja el formulario abierto con lo escrito", async () => {
    servicio.traerBitacora.mockResolvedValue(respuesta([]))
    const fallo = new Error("new row violates row-level security policy")
    servicio.guardarVuelo.mockRejectedValue(fallo)
    const p = await montar(<Logbook />)

    await clic(boton("Nuevo vuelo"))
    await escribir(campo("Tiempo total (horas)"), "2")
    await clic(boton("Registrar vuelo"))

    expect(errores.reportarError).toHaveBeenCalledWith("bitácora: guardar vuelo", fallo)
    expect(avisos.error).toHaveBeenCalled()
    expect(avisos.success).not.toHaveBeenCalled()
    expect(p.texto()).toContain("Nuevo vuelo")
    expect(campo("Tiempo total (horas)").value).toBe("2")
  })

  it("eliminar pide confirmación y borra ese vuelo", async () => {
    servicio.traerBitacora
      .mockResolvedValueOnce(respuesta([vuelo({ id: 42 })]))
      .mockResolvedValue(respuesta([]))
    await montar(<Logbook />)
    await clic(boton(/Eliminar el vuelo/))

    expect(window.confirm).toHaveBeenCalled()
    expect(servicio.borrarVuelo).toHaveBeenCalledWith(42)
    expect(avisos.success).toHaveBeenCalledWith("Vuelo eliminado")
  })

  it("si el piloto no confirma, no se borra nada", async () => {
    vi.mocked(window.confirm).mockReturnValue(false)
    servicio.traerBitacora.mockResolvedValue(respuesta([vuelo({ id: 42 })]))
    await montar(<Logbook />)
    await clic(boton(/Eliminar el vuelo/))
    expect(servicio.borrarVuelo).not.toHaveBeenCalled()
  })

  it("si borrar falla, el vuelo vuelve a la lista y el fallo queda reportado", async () => {
    const fallo = { message: "permission denied" }
    servicio.borrarVuelo.mockResolvedValue({ error: fallo })
    servicio.traerBitacora.mockResolvedValue(respuesta([vuelo({ id: 42, from_airport: "SKRG" })]))
    const p = await montar(<Logbook />)
    await clic(boton(/Eliminar el vuelo/))

    expect(errores.reportarError).toHaveBeenCalledWith("bitácora: eliminar vuelo", fallo)
    expect(p.texto()).toContain("SKRG")
  })
})
