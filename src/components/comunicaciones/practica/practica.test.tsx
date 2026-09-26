import { act } from "react"
import { createRoot, type Root } from "react-dom/client"
import { afterEach, describe, expect, it, vi } from "vitest"
import type { ReproductorRadio } from "@/lib/radio"
import {
  CM_COPIA,
  CM_DESARMALA,
  CM_ES_PARA_MI,
  CM_ESTANDAR_O_PLAIN,
  CM_HEARBACK,
  CM_PANEL,
  CM_QUE_RESPONDES,
  CM_RAFAGA,
  CM_READBACK,
  CM_VUELO_COMPLETO,
} from "@/lib/comunicacionesPracticaEjemplos"
import {
  CopiaAutorizacion,
  Desarmala,
  EsParaMi,
  EstandarOPlain,
  Hearback,
  PanelCabina,
  QueRespondes,
  RafagaNumeros,
  ReadbackVoz,
  VueloCompleto,
} from "@/components/comunicaciones/practica"

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

/** Un reproductor que «suena» al instante, como si no hubiera audio en el navegador. */
function reproductorMudo(): ReproductorRadio & { reproducir: ReturnType<typeof vi.fn> } {
  return {
    reproducir: vi.fn(async () => ({ fuente: "texto" as const, cancelada: false })),
    detener: vi.fn(),
    cerrar: vi.fn(),
  }
}

let raiz: Root | null = null
let contenedor: HTMLDivElement

async function montar(nodo: React.ReactNode) {
  contenedor = document.createElement("div")
  document.body.appendChild(contenedor)
  raiz = createRoot(contenedor)
  await act(async () => raiz?.render(nodo))
  return contenedor
}

afterEach(async () => {
  await act(async () => raiz?.unmount())
  raiz = null
  contenedor.remove()
})

function boton(texto: string | RegExp): HTMLButtonElement {
  const b = [...contenedor.querySelectorAll("button")].find((x) =>
    typeof texto === "string" ? x.textContent?.includes(texto) : texto.test(x.textContent ?? ""),
  )
  if (!b) throw new Error(`no hay botón «${texto}»`)
  return b
}

async function tocar(el: HTMLElement) {
  await act(async () => el.click())
}

describe("render básico de los diez ejercicios", () => {
  it.each([
    ["CopiaAutorizacion", () => <CopiaAutorizacion item={CM_COPIA[0]} reproductor={reproductorMudo()} />, "Copia la autorización"],
    ["ReadbackVoz", () => <ReadbackVoz item={CM_READBACK[0]} reproductor={reproductorMudo()} />, "Escucha y colaciona"],
    ["EsParaMi", () => <EsParaMi item={CM_ES_PARA_MI[0]} reproductor={reproductorMudo()} />, "AVIANCA 452"],
    ["Hearback", () => <Hearback item={CM_HEARBACK[0]} reproductor={reproductorMudo()} />, "eres el PM"],
    ["QueRespondes", () => <QueRespondes item={CM_QUE_RESPONDES[0]} reproductor={reproductorMudo()} />, "Unable to expedite"],
    ["Desarmala", () => <Desarmala item={CM_DESARMALA[1]} reproductor={reproductorMudo()} />, "SIGUIENTE ACCIÓN"],
    ["PanelCabina", () => <PanelCabina item={CM_PANEL[0]} reproductor={reproductorMudo()} />, "HDG"],
    ["RafagaNumeros", () => <RafagaNumeros item={CM_RAFAGA[0]} reproductor={reproductorMudo()} />, "Ráfaga de números"],
    ["EstandarOPlain", () => <EstandarOPlain item={CM_ESTANDAR_O_PLAIN[1]} reproductor={reproductorMudo()} />, "lenguaje claro"],
    ["VueloCompleto", () => <VueloCompleto item={CM_VUELO_COMPLETO[0]} reproductor={reproductorMudo()} />, "Vuelo completo"],
  ])("%s", async (_n, crear, texto) => {
    const c = await montar(crear())
    expect(c.textContent).toContain(texto)
    expect(c.querySelector('[role="status"]')).not.toBeNull()
  })
})

describe("interacción", () => {
  it("¿Qué respondes?: al elegir anuncia el resultado y muestra la transmisión", async () => {
    const onResultado = vi.fn()
    const item = CM_QUE_RESPONDES[1]
    const c = await montar(<QueRespondes item={item} reproductor={reproductorMudo()} onResultado={onResultado} />)
    expect(c.textContent).not.toContain(item.transmision.texto)
    await tocar(boton("affirm"))
    expect(onResultado).toHaveBeenCalledWith({ aciertos: 1, total: 1 })
    expect(c.querySelector('[role="status"]')?.textContent).toContain("Correcto")
    expect(c.textContent).toContain(item.transmision.texto)
  })

  it("el control de radio suena, cuenta la repetición y se bloquea al agotarlas", async () => {
    const rep = reproductorMudo()
    const item = { ...CM_QUE_RESPONDES[0], repeticiones: 1 }
    await montar(<QueRespondes item={item} reproductor={rep} />)
    await tocar(boton("Escuchar"))
    expect(rep.reproducir).toHaveBeenCalledTimes(1)
    expect(contenedor.textContent).toContain("1 repetición")
    await tocar(boton("Say again"))
    expect(rep.reproducir).toHaveBeenCalledTimes(2)
    expect(boton("Say again").disabled).toBe(true)
  })

  it("en modo examen no hay selector de velocidad", async () => {
    await montar(<QueRespondes item={CM_QUE_RESPONDES[0]} reproductor={reproductorMudo()} modoExamen />)
    expect(contenedor.textContent).not.toContain("Velocidad")
    await act(async () => raiz?.unmount())
    await montar(<QueRespondes item={CM_QUE_RESPONDES[0]} reproductor={reproductorMudo()} />)
    expect(contenedor.textContent).toContain("Velocidad")
  })

  it("Copia la autorización: califica campo por campo", async () => {
    const onResultado = vi.fn()
    const item = CM_COPIA[2]
    await montar(<CopiaAutorizacion item={item} reproductor={reproductorMudo()} onResultado={onResultado} />)
    const inputs = [...contenedor.querySelectorAll("input")]
    const valores = ["four thousand", "1005", "50", "24"]
    for (const [i, input] of inputs.entries()) {
      await act(async () => {
        const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set
        setter?.call(input, valores[i])
        input.dispatchEvent(new Event("input", { bubbles: true }))
      })
    }
    await tocar(boton("Revisar"))
    expect(onResultado).toHaveBeenCalledWith({ aciertos: 4, total: 4 })
  })

  it("Readback sin reconocimiento de voz ofrece escribir", async () => {
    await montar(<ReadbackVoz item={CM_READBACK[0]} reproductor={reproductorMudo()} />)
    expect(contenedor.querySelector("textarea")).not.toBeNull()
    expect(contenedor.textContent).toContain("no reconoce voz")
  })

  it("Panel: la perilla responde al teclado", async () => {
    await montar(<PanelCabina item={CM_PANEL[0]} reproductor={reproductorMudo()} />)
    const hdg = contenedor.querySelector('[role="spinbutton"][aria-label="HDG"]') as HTMLElement
    expect(hdg.getAttribute("aria-valuenow")).toBe("110")
    await act(async () => {
      hdg.dispatchEvent(new KeyboardEvent("keydown", { key: "PageDown", bubbles: true }))
    })
    expect(hdg.getAttribute("aria-valuenow")).toBe("100")
  })

  it("Hearback: sin haber escuchado no se puede responder", async () => {
    await montar(<Hearback item={CM_HEARBACK[1]} reproductor={reproductorMudo()} />)
    expect(boton("La colación está bien").disabled).toBe(true)
    await tocar(boton("Escuchar ATC"))
    expect(boton("La colación está bien").disabled).toBe(false)
    await tocar(boton("Error en: QNH"))
    expect(contenedor.querySelector('[role="status"]')?.textContent).toContain("Bien cazado")
  })
})
