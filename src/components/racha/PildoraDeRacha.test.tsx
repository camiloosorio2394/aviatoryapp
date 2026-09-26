import { act } from "react"
import { createRoot, type Root } from "react-dom/client"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { PildoraDeRacha } from "./PildoraDeRacha"

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const CLAVE = "aviatory.racha.vista"

let root: Root
let host: HTMLDivElement

beforeEach(() => {
  localStorage.clear()
  host = document.createElement("div")
  document.body.appendChild(host)
  root = createRoot(host)
})

afterEach(() => {
  act(() => root.unmount())
  host.remove()
  vi.useRealTimers()
})

const pintar = (dias: number, masLarga?: number) => act(() => root.render(<PildoraDeRacha dias={dias} masLarga={masLarga} />))
const pildora = () => host.querySelector(".racha-pildora")!
const celebrando = () => host.querySelector(".racha.is-celebrando") !== null

describe("PildoraDeRacha", () => {
  it("dice los días y pinta la llama del nivel", () => {
    pintar(7, 7)
    expect(pildora().getAttribute("data-nivel")).toBe("3")
    expect(pildora().getAttribute("aria-label")).toBe("Racha de 7 días")
    expect(pildora().textContent).toContain("7")
    expect(pildora().textContent).toContain("días")
    expect(host.querySelector("svg.racha-llama")).not.toBeNull()
  })

  it("con un día habla en singular y sin racha queda apagada", () => {
    pintar(1)
    expect(pildora().getAttribute("aria-label")).toBe("Racha de 1 día")
    pintar(0)
    expect(pildora().getAttribute("data-nivel")).toBe("0")
    expect(pildora().getAttribute("aria-label")).toBe("Racha de 0 días")
  })

  it("celebra cuando subió desde la última vista y avisa si es récord", () => {
    vi.useFakeTimers()
    localStorage.setItem(CLAVE, JSON.stringify({ dias: 6, masLarga: 6 }))
    pintar(7, 7)
    // Primero termina la entrada; la celebración espera.
    expect(celebrando()).toBe(false)
    act(() => vi.advanceTimersByTime(900))
    expect(celebrando()).toBe(true)
    expect(host.querySelector(".racha-aviso")?.textContent).toBe("¡Nueva mejor racha!")
    act(() => vi.advanceTimersByTime(1100))
    expect(celebrando()).toBe(false)
    expect(host.querySelector(".racha-aviso")).not.toBeNull()
    act(() => vi.advanceTimersByTime(2500))
    expect(host.querySelector(".racha-aviso")).toBeNull()
    expect(JSON.parse(localStorage.getItem(CLAVE)!)).toEqual({ dias: 7, masLarga: 7 })
  })

  it("sube sin récord: late pero no avisa", () => {
    vi.useFakeTimers()
    localStorage.setItem(CLAVE, JSON.stringify({ dias: 6, masLarga: 12 }))
    pintar(7, 12)
    act(() => vi.advanceTimersByTime(900))
    expect(celebrando()).toBe(true)
    expect(host.querySelector(".racha-aviso")).toBeNull()
  })

  it("no celebra la primera vez que la ve ni si no subió; con dos días late sin récord", () => {
    vi.useFakeTimers()
    pintar(7, 10)
    act(() => vi.advanceTimersByTime(3000))
    expect(celebrando()).toBe(false)

    act(() => root.unmount())
    root = createRoot(host)
    localStorage.setItem(CLAVE, JSON.stringify({ dias: 7, masLarga: 10 }))
    pintar(7, 10)
    act(() => vi.advanceTimersByTime(3000))
    expect(celebrando()).toBe(false)

    act(() => root.unmount())
    root = createRoot(host)
    localStorage.setItem(CLAVE, JSON.stringify({ dias: 1, masLarga: 1 }))
    pintar(2, 2)
    act(() => vi.advanceTimersByTime(900))
    expect(celebrando()).toBe(true)
    expect(host.querySelector(".racha-aviso")).toBeNull()
  })
})
