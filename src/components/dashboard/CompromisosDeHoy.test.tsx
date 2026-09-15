import { act } from "react"
import { createRoot, type Root } from "react-dom/client"
import { MemoryRouter } from "react-router-dom"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { CompromisosDeHoy } from "@/components/dashboard/CompromisosDeHoy"
import type { PlanDeEstudio } from "@/services/planDeEstudio"
import type { PostulacionAbierta } from "@/services/panel"

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

/** Martes 15 de septiembre de 2026, 15:00 UTC (10:00 en Bogotá). */
const MARTES = new Date("2026-09-15T15:00:00Z")

const plan = (dias: number[]): PlanDeEstudio => ({
  dias,
  hora: "20:00",
  zona: "America/Bogota",
  minutosMeta: 25,
})

let root: Root
let contenedor: HTMLDivElement

function pintar(props: {
  plan: PlanDeEstudio | null
  estudioHoy?: boolean
  postulaciones?: PostulacionAbierta[]
}) {
  act(() => {
    root.render(
      <MemoryRouter>
        <CompromisosDeHoy
          plan={props.plan}
          estudioHoy={props.estudioHoy ?? false}
          postulaciones={props.postulaciones ?? []}
        />
      </MemoryRouter>,
    )
  })
  return contenedor.textContent ?? ""
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(MARTES)
  contenedor = document.createElement("div")
  document.body.appendChild(contenedor)
  root = createRoot(contenedor)
})

afterEach(() => {
  act(() => root.unmount())
  contenedor.remove()
  vi.useRealTimers()
})

describe("lo que el piloto se comprometió a hacer", () => {
  it("sin plan y sin postulaciones no ocupa espacio", () => {
    expect(pintar({ plan: null })).toBe("")
  })

  it("en uno de sus días dice que hoy toca, con sus propios minutos", () => {
    // Martes = 2.
    expect(pintar({ plan: plan([2]) })).toContain("Hoy toca")
    expect(pintar({ plan: plan([2]) })).toContain("25 minutos")
  })

  it("si ya estudió, deja de pedirle nada", () => {
    const texto = pintar({ plan: plan([2]), estudioHoy: true })
    expect(texto).toContain("Hoy ya estudiaste")
    expect(texto).not.toContain("Hoy toca")
  })

  it("en un día que no eligió, dice cuándo es el próximo", () => {
    // Lunes, miércoles y viernes: desde el martes, el próximo es mañana.
    expect(pintar({ plan: plan([1, 3, 5]) })).toContain("mañana (miércoles)")
  })

  it("con un solo día a la semana da la vuelta y no dice «—»", () => {
    // Solo lunes: desde el martes hay que saltar seis días.
    expect(pintar({ plan: plan([1]) })).toContain("el lunes")
  })

  it("la postulación más vieja es la que se muestra, y dice cuántas faltan", () => {
    const texto = pintar({
      plan: null,
      postulaciones: [
        { aerolinea: "Wingo", estado: "en_proceso", dias: 26 },
        { aerolinea: "Copa Airlines", estado: "postulada", dias: 9 },
      ],
    })
    expect(texto).toContain("Wingo")
    expect(texto).toContain("26 días")
    expect(texto).toContain("y 1 más")
    expect(texto).not.toContain("Copa Airlines")
  })

  it("con una sola postulación no inventa un «y 0 más»", () => {
    const texto = pintar({
      plan: null,
      postulaciones: [{ aerolinea: "Wingo", estado: "postulada", dias: 1 }],
    })
    expect(texto).toContain("1 día")
    expect(texto).not.toContain("más")
  })
})
