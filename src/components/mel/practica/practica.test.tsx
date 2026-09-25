import { act } from "react"
import { createRoot, type Root } from "react-dom/client"
import { afterEach, describe, expect, it, vi } from "vitest"
import {
  MEL_BUSCA_EL_ITEM,
  MEL_CALCULA_EL_PLAZO,
  MEL_COMBINADOS,
  MEL_IMPACTO_OPERACIONAL,
  MEL_LEE_LA_ENTRADA,
  MEL_PODEMOS_SALIR,
  MEL_PRACTICA_DATOS,
} from "@/lib/melPracticaDatos"
import { DECISIONES, NOMBRE_PARTE, formatoFechaHora, partirProvisos, respuestaPlazo } from "@/lib/melPractica"
import {
  BuscaElItem,
  CalculaElPlazo,
  Combinados,
  EjercicioMel,
  EntradaMel,
  ImpactoOperacional,
  LeeLaEntrada,
  PodemosSalir,
} from "@/components/mel/practica"

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

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

function botones(): HTMLButtonElement[] {
  return [...contenedor.querySelectorAll("button")]
}

function boton(texto: string | RegExp): HTMLButtonElement {
  const b = botones().find((x) => (typeof texto === "string" ? x.textContent?.includes(texto) : texto.test(x.textContent ?? "")))
  if (!b) throw new Error(`No hay botón «${String(texto)}»`)
  return b
}

function porEtiqueta(inicio: string): HTMLButtonElement {
  const b = botones().find((x) => x.getAttribute("aria-label")?.startsWith(inicio))
  if (!b) throw new Error(`No hay botón con etiqueta «${inicio}»`)
  return b
}

async function clic(b: HTMLElement) {
  await act(async () => b.click())
}

describe("EntradaMel", () => {
  it("pinta la tabla con roles, la fila resaltada y la cita de la MMEL", async () => {
    const ej = MEL_LEE_LA_ENTRADA[0]
    await montar(<EntradaMel entrada={ej.entrada} resaltar={ej.fila} />)
    expect(contenedor.querySelector('[role="table"]')).not.toBeNull()
    expect(contenedor.querySelectorAll('[role="columnheader"]').length).toBe(5)
    expect(contenedor.querySelector('[aria-current="true"]')).not.toBeNull()
    expect(contenedor.textContent).toContain(ej.entrada.codigo)
    expect(contenedor.textContent).toContain("Master Minimum Equipment List")
    expect(contenedor.textContent).toContain(ej.entrada.fuente)
    // Sin «toca» no hay botones.
    expect(botones()).toHaveLength(0)
  })

  it("una entrada inventada se rotula «Aeronave de ejemplo» y no lleva cita", async () => {
    const ej = MEL_LEE_LA_ENTRADA.find((e) => !e.entrada.fuente)!
    await montar(<EntradaMel entrada={ej.entrada} />)
    expect(contenedor.textContent).toContain("Aeronave de ejemplo")
    expect(contenedor.querySelector("figcaption")).toBeNull()
  })

  it("parte los provisos a), b)… en renglones", () => {
    expect(partirProvisos("May be inoperative provided: a) Uno, and b) Dos (i.e., RVSM) tres.")).toEqual([
      "May be inoperative provided:",
      "a) Uno, and",
      "b) Dos (i.e., RVSM) tres.",
    ])
  })
})

describe("LeeLaEntrada", () => {
  it("se juega tocando y eligiendo, y al final da el puntaje por campo", async () => {
    const ej = MEL_LEE_LA_ENTRADA[0]
    const onResultado = vi.fn()
    await montar(<LeeLaEntrada item={ej} onResultado={onResultado} />)
    for (const paso of ej.pasos) {
      if (paso.tipo === "toca") {
        await clic(porEtiqueta(NOMBRE_PARTE[paso.parte]))
      } else {
        for (const i of paso.correctas) await clic(boton(paso.opciones[i]))
        if (paso.correctas.length > 1) await clic(boton("Comprobar"))
      }
      expect(contenedor.textContent).toContain("Correcto")
      await clic(boton(/Siguiente|Ver resultado/))
    }
    expect(onResultado).toHaveBeenLastCalledWith({ aciertos: ej.pasos.length, total: ej.pasos.length })
    expect(contenedor.textContent).toContain(`${ej.pasos.length} de ${ej.pasos.length} campos bien`)
    expect(contenedor.textContent).toContain(ej.explicacion)
  })

  it.each(MEL_LEE_LA_ENTRADA.map((e) => [e.id, e] as const))("%s: respondiendo todo bien da el puntaje completo", async (_id, ej) => {
    const onResultado = vi.fn()
    await montar(<LeeLaEntrada item={ej} onResultado={onResultado} />)
    for (const paso of ej.pasos) {
      if (paso.tipo === "toca") await clic(porEtiqueta(NOMBRE_PARTE[paso.parte]))
      else {
        for (const i of paso.correctas) {
          const b = botones().find((x) => x.getAttribute("aria-pressed") !== null && x.textContent?.endsWith(paso.opciones[i]))
          if (!b) throw new Error(`Sin opción «${paso.opciones[i]}»`)
          await clic(b)
        }
        if (paso.correctas.length > 1) await clic(boton("Comprobar"))
      }
      await clic(boton(/Siguiente|Ver resultado/))
    }
    expect(onResultado).toHaveBeenLastCalledWith({ aciertos: ej.pasos.length, total: ej.pasos.length })
  })

  it("tocar la parte equivocada lo marca y muestra dónde estaba", async () => {
    const ej = MEL_LEE_LA_ENTRADA[0]
    await montar(<LeeLaEntrada item={ej} />)
    await clic(porEtiqueta(NOMBRE_PARTE.requeridos))
    expect(contenedor.textContent).toContain(`No. Era: ${NOMBRE_PARTE.categoria}`)
  })

  it("en modo examen no hay «Volver a intentarlo»", async () => {
    const ej = MEL_LEE_LA_ENTRADA[1]
    await montar(<LeeLaEntrada item={ej} modoExamen />)
    for (const paso of ej.pasos) {
      if (paso.tipo === "toca") await clic(porEtiqueta(NOMBRE_PARTE[paso.parte]))
      else {
        await clic(boton(paso.opciones[0]))
        if (paso.correctas.length > 1) await clic(boton("Comprobar"))
      }
      await clic(boton(/Siguiente|Ver resultado/))
    }
    expect(botones().some((b) => b.textContent?.includes("Volver a intentarlo"))).toBe(false)
  })
})

describe("PodemosSalir", () => {
  it("decisión y razones, luego la explicación", async () => {
    const ej = MEL_PODEMOS_SALIR.find((e) => e.decision === "si")!
    const onResultado = vi.fn()
    await montar(<PodemosSalir item={ej} onResultado={onResultado} />)
    expect(boton("Comprobar").disabled).toBe(true)
    await clic(boton(DECISIONES.find((d) => d.valor === ej.decision)!.texto))
    for (const r of ej.razones) if (r.correcta) await clic(boton(r.texto))
    await clic(boton("Comprobar"))
    expect(onResultado).toHaveBeenCalledWith({ aciertos: 2, total: 2 })
    expect(contenedor.textContent).toContain("Sí, cumpliendo:")
    expect(contenedor.textContent).toContain(ej.explicacion)
    await clic(boton("Volver a intentarlo"))
    expect(boton("Comprobar").disabled).toBe(true)
  })

  it("una decisión equivocada se marca", async () => {
    const ej = MEL_PODEMOS_SALIR.find((e) => e.decision === "no")!
    await montar(<PodemosSalir item={ej} />)
    await clic(boton(DECISIONES.find((d) => d.valor === "si")!.texto))
    await clic(boton("Comprobar"))
    expect(contenedor.textContent).toContain("Decisión equivocada")
  })
})

describe("CalculaElPlazo", () => {
  it("en días: elegir la fecha buena y ver la cuenta sin el day of discovery", async () => {
    const ej = MEL_CALCULA_EL_PLAZO.find((e) => e.id === "pl25-categoria-b")!
    const onResultado = vi.fn()
    await montar(<CalculaElPlazo item={ej} onResultado={onResultado} />)
    await clic(boton(formatoFechaHora(respuestaPlazo(ej)!)))
    expect(onResultado).toHaveBeenCalledWith({ aciertos: 1, total: 1 })
    expect(contenedor.textContent).toContain("Day of discovery (no cuenta): lun 26 ene 2026")
    expect(contenedor.textContent).toContain("3: jue 29 ene 2026")
  })

  it("en tramos: las opciones son los pendientes y «ninguno»", async () => {
    const ej = MEL_CALCULA_EL_PLAZO.find((e) => e.plazo.unidad === "vuelosHoras" && e.plazo.horas !== undefined)!
    const onResultado = vi.fn()
    await montar(<CalculaElPlazo item={ej} onResultado={onResultado} />)
    expect(contenedor.textContent).toContain("lo que ocurra primero")
    await clic(boton("Ninguno"))
    expect(onResultado).toHaveBeenCalledWith({ aciertos: 0, total: 1 })
    expect(contenedor.textContent).toContain("pasa el límite")
  })
})

describe("Combinados", () => {
  it("pinta cada ítem abierto y califica decisión y dependencia", async () => {
    const ej = MEL_COMBINADOS[0]
    const onResultado = vi.fn()
    await montar(<Combinados item={ej} onResultado={onResultado} />)
    expect(contenedor.querySelectorAll('[role="table"]').length).toBe(ej.items.length)
    expect(contenedor.textContent).toContain(`Ítem abierto 1 de ${ej.items.length}`)
    await clic(boton(DECISIONES.find((d) => d.valor === ej.decision)!.texto))
    await clic(boton(ej.dependencia.opciones[ej.dependencia.correcta]))
    await clic(boton("Comprobar"))
    expect(onResultado).toHaveBeenCalledWith({ aciertos: 2, total: 2 })
  })
})

describe("BuscaElItem", () => {
  it("capítulo equivocado: se avisa, se abre el bueno y se elige el ítem", async () => {
    const ej = MEL_BUSCA_EL_ITEM[0]
    const onResultado = vi.fn()
    await montar(<BuscaElItem item={ej} onResultado={onResultado} />)
    const otro = ej.capitulos.find((c) => c.numero !== ej.capitulo)!
    await clic(boton(otro.titulo))
    expect(contenedor.textContent).toContain(`No es ese capítulo: está en ATA ${ej.capitulo}`)
    const bueno = ej.items.find((i) => i.codigo === ej.item)!
    await clic(boton(bueno.titulo))
    expect(onResultado).toHaveBeenCalledWith({ aciertos: 1, total: 2 })
    expect(contenedor.textContent).toContain("Ítem correcto")
  })
})

describe("ImpactoOperacional", () => {
  it("marcar las capacidades y comprobar", async () => {
    const ej = MEL_IMPACTO_OPERACIONAL.find((e) => e.afecta.length === 2)!
    const onResultado = vi.fn()
    await montar(<ImpactoOperacional item={ej} onResultado={onResultado} />)
    const textos: Record<string, string> = { rvsm: "RVSM", catIIIII: "CAT II", edto: "EDTO", pbn: "PBN", performance: "Performance", combustible: "Combustible", meteorologia: "Meteorología", ninguna: "Ninguna" }
    for (const c of ej.afecta) await clic(boton(textos[c]))
    expect(boton(textos[ej.afecta[0]]).getAttribute("aria-pressed")).toBe("true")
    await clic(boton("Comprobar"))
    expect(onResultado).toHaveBeenCalledWith({ aciertos: 2, total: 2 })
  })

  it("«Ninguna» desmarca las demás", async () => {
    const ej = MEL_IMPACTO_OPERACIONAL[0]
    await montar(<ImpactoOperacional item={ej} />)
    await clic(boton("RVSM"))
    await clic(boton("Ninguna"))
    expect(boton("RVSM").getAttribute("aria-pressed")).toBe("false")
    expect(boton("Ninguna").getAttribute("aria-pressed")).toBe("true")
  })
})

describe("EjercicioMel", () => {
  it("pinta todos los ejercicios de los datos sin romperse", async () => {
    await montar(
      <div>
        {MEL_PRACTICA_DATOS.map((ej) => (
          <EjercicioMel key={`${ej.tipo}-${ej.id}`} item={ej} />
        ))}
      </div>,
    )
    expect(contenedor.querySelectorAll("section").length).toBe(MEL_PRACTICA_DATOS.length)
  })
})
