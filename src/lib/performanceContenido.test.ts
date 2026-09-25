import { describe, expect, it } from "vitest"
import type { DocBlockData } from "@/lib/docBlocks"
import { PERF_FIGURAS_PENDIENTES, PERF_LECCIONES, PERF_PRACTICA_CLAVES } from "@/lib/performanceLeccion"

/**
 * Lo que el convertidor tiene que dejar bien en `performanceLeccion.ts`, que se
 * genera y no se edita a mano (scripts/performance/convertir.mjs).
 *
 * Nace de dos defectos reales de la primera versión: los dieciocho ejercicios
 * llegaron a la app con el botón «Ver la respuesta» puesto y el cuerpo vacío,
 * porque el corte de párrafo trataba `**Respuesta:` como frontera también
 * cuando el párrafo empezaba ahí; y ninguno traía `clave`, así que el contador
 * de práctica del hub se habría quedado en 0 / 28 para siempre.
 */

/** Todos los bloques, incluidos los que van dentro de un detalle técnico. */
function todosLosBloques(bs: DocBlockData[]): DocBlockData[] {
  return bs.flatMap((b) => (b.kind === "detalleTecnico" ? [b, ...todosLosBloques(b.bloques)] : [b]))
}

const BLOQUES = PERF_LECCIONES.flatMap((l) => todosLosBloques(l.blocks))

describe("contenido de Performance", () => {
  it("cada ejercicio y cada escenario lleva su clave de práctica", () => {
    const conClave = BLOQUES.filter(
      (b) => (b.kind === "detalleTecnico" || b.kind === "piensaComoPiloto") && b.clave,
    ).map((b) => (b.kind === "detalleTecnico" || b.kind === "piensaComoPiloto" ? b.clave : undefined))

    // Sin esto el hub cuenta «Ejercicios 0 / 28» y no se mueve nunca.
    expect([...conClave].sort()).toEqual([...PERF_PRACTICA_CLAVES].sort())
    expect(new Set(conClave).size).toBe(conClave.length)
  })

  it("ninguna respuesta queda vacía", () => {
    for (const b of BLOQUES) {
      if (b.kind === "detalleTecnico" && b.clave) {
        const texto = b.bloques.map((x) => (x.kind === "p" ? x.text : "")).join("")
        expect(texto.trim(), `${b.clave} no tiene respuesta`).not.toBe("")
      }
      if (b.kind === "piensaComoPiloto" && b.clave) {
        expect(b.respuesta?.trim(), `${b.clave} no tiene respuesta`).toBeTruthy()
        expect(b.pregunta.trim(), `${b.clave} no tiene pregunta`).not.toBe("")
      }
    }
  })

  it("ningún párrafo del módulo queda vacío", () => {
    // Un `p` vacío es la firma del corte de párrafo mal puesto: el bloque se
    // pinta y no dice nada.
    for (const b of BLOQUES) {
      if (b.kind === "p") expect(b.text.trim()).not.toBe("")
    }
  })

  it("las veinte figuras van numeradas, sin repetir, y ya dibujadas", () => {
    // Cada imagen del documento es una figura SVG o, si falta, su hueco: entre
    // las dos tienen que salir los veinte códigos, cada uno una vez.
    const codigos = BLOQUES.flatMap((b) =>
      b.kind === "figura" ? [b.src.match(/PERF-\d\d/)?.[0]] : b.kind === "hueco" ? [b.rotulo.match(/^PERF-\d\d/)?.[0]] : [],
    )
    expect(codigos.filter(Boolean)).toHaveLength(20)
    expect(new Set(codigos).size).toBe(20)
    expect(PERF_FIGURAS_PENDIENTES).toEqual([])
  })
})
