import { describe, expect, it } from "vitest"
import { AERO_LECCIONES, AERO_LECCION_TOTAL, AERO_MINUTOS, AERO_PRIORITARIAS } from "@/lib/aerodinamicaLeccion"
import {
  AERO_ENTREVISTA,
  AERO_ESCENARIOS,
  AERO_PRACTICA_CLAVES,
  AERO_PRACTICA_TOTAL,
} from "@/lib/aerodinamicaPractica"
import {
  AERO_LECTURA_MINUTOS,
  AERO_LECTURA_TOTAL,
  AERO_PRACTICA_TOTAL as AERO_PRACTICA_TOTAL_FIJO,
} from "@/lib/aerodinamica"
import { AERO_EVALUACION_META } from "@/lib/aerodinamicaEvaluacion"

/**
 * El contenido de Aerodinámica sale de docs/contenido/aerodinamica.md por
 * scripts/aerodinamica/convertir.mjs. El conversor ya valida al generar; esto
 * vuelve a comprobarlo sobre lo generado, que es lo que la app sirve de verdad,
 * y sobre el banco que se carga en la base.
 *
 * Si el documento cambia: node scripts/aerodinamica/convertir.mjs
 */

const SECCIONES = Array.from({ length: 12 }, (_, i) => `S${String(i + 1).padStart(2, "0")}`)

interface PreguntaBanco {
  id: string
  enunciado: string
  opciones: string[]
  correcta: number
  explicacion: string
  metadatos: { tema: string; seccion: number }
}

// El banco entra por Vite, como en evaluacionesContenido.test.ts: así la
// prueba corre en el mismo entorno que el resto de src/.
const banco = (
  import.meta.glob<{ banco: string; preguntas: PreguntaBanco[] }>(
    "/contenido/bancos/aerodinamica_evaluacion.json",
    { import: "default", eager: true },
  )
)["/contenido/bancos/aerodinamica_evaluacion.json"]

/** Los bloques que preguntan algo: no puede quedar ninguno dentro de una sección. */
const BLOQUES_QUE_PREGUNTAN = ["ponAPrueba", "escenario", "piensaComoPiloto", "entrevista"]

describe("Aerodinámica: las doce secciones", () => {
  it("son doce, numeradas de 1 a 12, y suman los minutos que anuncia el hub", () => {
    expect(AERO_LECCION_TOTAL).toBe(12)
    expect(AERO_LECCIONES.map((s) => s.n)).toEqual(Array.from({ length: 12 }, (_, i) => i + 1))
    expect(AERO_LECTURA_TOTAL).toBe(AERO_LECCION_TOTAL)
    expect(AERO_LECTURA_MINUTOS).toBe(AERO_MINUTOS)
  })

  it("cada una trae título, objetivo y minutos", () => {
    for (const s of AERO_LECCIONES) {
      expect(s.title.length, `sección ${s.n}`).toBeGreaterThan(3)
      expect(s.kicker.length, `sección ${s.n}`).toBeGreaterThan(3)
      expect(s.minutes, `sección ${s.n}`).toBeGreaterThan(0)
      expect(s.blocks.length, `sección ${s.n}`).toBeGreaterThan(3)
    }
  })

  it("las prioritarias son las cuatro que marca el documento", () => {
    expect(AERO_PRIORITARIAS).toEqual([4, 6, 10, 11])
  })

  it("lleva los diez espacios de imagen, cada uno con su IMG-xx y su pie", () => {
    const huecos = AERO_LECCIONES.flatMap((s) => s.blocks.filter((b) => b.kind === "hueco"))
    expect(huecos).toHaveLength(10)
    const ids = huecos.map((h) => (h.kind === "hueco" ? h.rotulo.split(" · ")[0] : ""))
    expect(ids).toEqual(Array.from({ length: 10 }, (_, i) => `IMG-${String(i + 1).padStart(2, "0")}`))
    for (const h of huecos) {
      if (h.kind !== "hueco") continue
      expect(h.descripcion.length, h.rotulo).toBeGreaterThan(10)
    }
  })
})

describe("Aerodinámica: dentro de una sección no se pregunta nada", () => {
  // Regla de Camilo, la misma que vació Mercancías: se pregunta en la práctica
  // y en el quiz final, no mientras se lee. El documento trae 45 preguntas de
  // sección; el conversor las lee para validarlas y no las emite.
  it("ninguna sección trae un bloque que pregunte", () => {
    for (const s of AERO_LECCIONES) {
      const preguntones = s.blocks.filter((b) => BLOQUES_QUE_PREGUNTAN.includes(b.kind))
      expect(preguntones.map((b) => b.kind), `sección ${s.n}`).toEqual([])
    }
  })

  it("las preguntas de entrevista del texto siguen, con la respuesta al desplegar", () => {
    // Son otra cosa: seis a lo largo del módulo, dentro de la prosa, con la
    // respuesta escondida. No son un examen; son el desplegable de siempre.
    const desplegables = AERO_LECCIONES.flatMap((s) =>
      s.blocks.filter((b) => b.kind === "detalleTecnico"),
    )
    expect(desplegables.length).toBeGreaterThanOrEqual(6)
    for (const d of desplegables) {
      if (d.kind !== "detalleTecnico") continue
      expect((d.etiqueta ?? "").length).toBeGreaterThan(5)
      expect(d.bloques.length).toBeGreaterThan(0)
    }
  })
})

describe("Aerodinámica: la práctica", () => {
  it("son trece escenarios, esc-01 a esc-13, con una respuesta por pregunta", () => {
    expect(AERO_ESCENARIOS).toHaveLength(13)
    expect(AERO_ESCENARIOS.map((e) => e.id)).toEqual(
      Array.from({ length: 13 }, (_, i) => `esc-${String(i + 1).padStart(2, "0")}`),
    )
    for (const e of AERO_ESCENARIOS) {
      expect(e.preguntas.length, e.id).toBeGreaterThan(0)
      expect(e.analisis, e.id).toHaveLength(e.preguntas.length)
      expect(e.situacion.length, e.id).toBeGreaterThan(40)
      for (const t of e.temas) expect(SECCIONES, `${e.id}: ${t}`).toContain(t)
    }
  })

  it("son cuarenta y nueve preguntas de entrevista, ent-01 a ent-49, 17/16/16", () => {
    expect(AERO_ENTREVISTA).toHaveLength(49)
    expect(AERO_ENTREVISTA.map((e) => e.id)).toEqual(
      Array.from({ length: 49 }, (_, i) => `ent-${String(i + 1).padStart(2, "0")}`),
    )
    const porNivel = (n: string) => AERO_ENTREVISTA.filter((e) => e.nivel === n).length
    expect(porNivel("basico")).toBe(17)
    expect(porNivel("intermedio")).toBe(16)
    expect(porNivel("avanzado")).toBe(16)

    for (const e of AERO_ENTREVISTA) {
      expect(e.pregunta.length, e.id).toBeGreaterThan(10)
      expect(e.respuesta.length, e.id).toBeGreaterThan(10)
      expect(e.explicacion.length, e.id).toBeGreaterThan(10)
      expect(e.punto.length, e.id).toBeGreaterThan(5)
      for (const t of e.temas) expect(SECCIONES, `${e.id}: ${t}`).toContain(t)
      // Las de opción múltiple: cuatro opciones y la correcta dentro de rango.
      if (e.opciones) {
        expect(e.opciones, e.id).toHaveLength(4)
        expect(e.correcta, e.id).toBeGreaterThanOrEqual(0)
        expect(e.correcta, e.id).toBeLessThanOrEqual(3)
        expect(e.respuesta, e.id).toBe(e.opciones[e.correcta as number])
      }
    }
  })

  it("las claves de práctica son sesenta y dos, sin repetir, y es lo que dice el hub", () => {
    expect(AERO_PRACTICA_CLAVES).toHaveLength(62)
    expect(new Set(AERO_PRACTICA_CLAVES).size).toBe(62)
    expect(AERO_PRACTICA_TOTAL).toBe(62)
    expect(AERO_PRACTICA_TOTAL_FIJO).toBe(AERO_PRACTICA_TOTAL)
  })
})

describe("Aerodinámica: el banco del quiz final", () => {
  it("son cuarenta preguntas, ev-01 a ev-40, y el total que anuncia la pantalla", () => {
    expect(banco.banco).toBe("aerodinamica_evaluacion")
    expect(banco.preguntas).toHaveLength(40)
    expect(banco.preguntas.map((p) => p.id)).toEqual(
      Array.from({ length: 40 }, (_, i) => `ev-${String(i + 1).padStart(2, "0")}`),
    )
    expect(AERO_EVALUACION_META.total).toBe(banco.preguntas.length)
  })

  it("cada pregunta tiene cuatro opciones distintas y la correcta entre 0 y 3", () => {
    for (const p of banco.preguntas) {
      expect(p.opciones, p.id).toHaveLength(4)
      expect(new Set(p.opciones).size, p.id).toBe(4)
      expect(Number.isInteger(p.correcta), p.id).toBe(true)
      expect(p.correcta, p.id).toBeGreaterThanOrEqual(0)
      expect(p.correcta, p.id).toBeLessThanOrEqual(3)
      expect(p.explicacion.length, p.id).toBeGreaterThan(10)
    }
  })

  it("cada pregunta declara una sección que existe, y las doce están cubiertas", () => {
    for (const p of banco.preguntas) {
      expect(SECCIONES, `${p.id}: ${p.metadatos.tema}`).toContain(p.metadatos.tema)
      expect(p.metadatos.seccion, p.id).toBe(Number(p.metadatos.tema.slice(1)))
    }
    // Sin esto, el bloque «temas que debes repasar» dejaría secciones mudas.
    const cubiertas = new Set(banco.preguntas.map((p) => p.metadatos.tema))
    expect([...cubiertas].sort()).toEqual(SECCIONES)
  })
})
