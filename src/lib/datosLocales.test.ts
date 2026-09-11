import { beforeEach, describe, expect, it } from "vitest"
import { CLAVE_DUENO, borrarDatosDelPiloto, reclamarDatosLocales } from "@/lib/datosLocales"
import { CLAVE_BARRA_FIJADA, CLAVE_TEMA } from "@/lib/preferenciasEquipo"

const SESION_SUPABASE = "sb-gvwqmfxphsbmbrhyjcmk-auth-token"

function sembrarEquipoCompartido() {
  localStorage.setItem("aviatory.notam.progress", '{"lessonScreens":[1,2]}')
  localStorage.setItem("aviatory.mercancias-leccion.entrevista.1.dominadas", "[3]")
  localStorage.setItem("av_psico_v1", "{}")
  localStorage.setItem(CLAVE_TEMA, "dark")
  localStorage.setItem(CLAVE_BARRA_FIJADA, "1")
  localStorage.setItem(SESION_SUPABASE, "{}")
  localStorage.setItem("ph_otra_libreria", "x")
  sessionStorage.setItem("aviatory.lector.rac-61", "12")
}

describe("datos locales por piloto", () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  it("borra lo del piloto y conserva preferencias, sesión y claves ajenas", () => {
    sembrarEquipoCompartido()
    borrarDatosDelPiloto()

    expect(localStorage.getItem("aviatory.notam.progress")).toBeNull()
    expect(localStorage.getItem("aviatory.mercancias-leccion.entrevista.1.dominadas")).toBeNull()
    expect(localStorage.getItem("av_psico_v1")).toBeNull()
    expect(sessionStorage.getItem("aviatory.lector.rac-61")).toBeNull()

    expect(localStorage.getItem(CLAVE_TEMA)).toBe("dark")
    expect(localStorage.getItem(CLAVE_BARRA_FIJADA)).toBe("1")
    expect(localStorage.getItem(SESION_SUPABASE)).toBe("{}")
    expect(localStorage.getItem("ph_otra_libreria")).toBe("x")
  })

  it("lo avanzado sin cuenta lo reclama el primero que entra, sin borrarlo", () => {
    sembrarEquipoCompartido()
    expect(reclamarDatosLocales("piloto-a")).toBe(false)
    expect(localStorage.getItem("aviatory.notam.progress")).not.toBeNull()
    expect(localStorage.getItem(CLAVE_DUENO)).toBe("piloto-a")
  })

  it("el mismo piloto conserva su progreso al volver", () => {
    sembrarEquipoCompartido()
    reclamarDatosLocales("piloto-a")
    expect(reclamarDatosLocales("piloto-a")).toBe(false)
    expect(localStorage.getItem("aviatory.notam.progress")).not.toBeNull()
  })

  it("si entra otro piloto, lo del anterior se borra antes de que lo lea", () => {
    sembrarEquipoCompartido()
    reclamarDatosLocales("piloto-a")

    expect(reclamarDatosLocales("piloto-b")).toBe(true)
    expect(localStorage.getItem("aviatory.notam.progress")).toBeNull()
    expect(localStorage.getItem(CLAVE_DUENO)).toBe("piloto-b")
    expect(localStorage.getItem(CLAVE_TEMA)).toBe("dark")
  })
})
