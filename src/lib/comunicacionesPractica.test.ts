import { describe, expect, it } from "vitest"
import {
  calificarCopia,
  calificarDesarmala,
  calificarDictado,
  calificarEsParaMi,
  calificarEstandarOPlain,
  calificarHearback,
  calificarPanel,
  calificarQueRespondes,
  calificarReadback,
  claveEjercicioCm,
  moverPerilla,
  puntajeVuelo,
  transmisionesDe,
} from "@/lib/comunicacionesPractica"
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
  CM_TRANSMISIONES_EJEMPLO,
  CM_VUELO_COMPLETO,
} from "@/lib/comunicacionesPracticaEjemplos"

describe("1. Copia la autorización", () => {
  const ej = CM_COPIA[0]
  it("acepta cada campo en cualquier formato normalizable", () => {
    const r = calificarCopia(ej, {
      limite: "kennington",
      ruta: "alfa one",
      nivel: "280",
      salida: "Wicken three Delta departure",
      squawk: "5501",
    })
    expect(r.every((c) => c.ok)).toBe(true)
  })
  it("califica campo por campo", () => {
    const r = calificarCopia(ej, { limite: "KENNINGTON", ruta: "A1", nivel: "FL290", salida: "", squawk: "5501" })
    expect(r.filter((c) => !c.ok).map((c) => c.id)).toEqual(["nivel", "salida"])
  })
})

describe("2. Readback con la voz", () => {
  it("encuentra los elementos dichos en palabras", () => {
    const ej = CM_READBACK[1]
    const r = calificarReadback(
      ej,
      "descending to four thousand feet QNH one zero zero fife transition level fife zero expecting ILS approach runway two four Aviatory four five two",
    )
    expect(r.faltan).toEqual([])
  })
  it("dice qué faltó", () => {
    const ej = CM_READBACK[1]
    const r = calificarReadback(ej, "descending four thousand feet runway two four")
    expect(r.faltan).toEqual(["qnh", "transicion", "distintivo"])
  })
  it("un número equivocado no cuenta como presente", () => {
    const r = calificarReadback(CM_READBACK[0], "six four zero three Aviatory four five two")
    expect(r.faltan).toEqual(["squawk"])
  })
  it("acepta lo que devuelve el reconocedor en cifras", () => {
    const r = calificarReadback(CM_READBACK[2], "holding point runway 27 QNH 1019 giving way Aviatory 452")
    expect(r.faltan).toEqual([])
  })
})

describe("3. ¿Es para mí?", () => {
  const ej = CM_ES_PARA_MI[0]
  it("todo bien", () => {
    const r = calificarEsParaMi(ej, [1, 3, 5])
    expect(r).toMatchObject({ aciertos: 3, omisiones: 0, falsasAlarmas: 0, correctas: 6, total: 6 })
  })
  it("cuenta omisiones y falsas alarmas", () => {
    const r = calificarEsParaMi(ej, [0, 1])
    expect(r).toMatchObject({ aciertos: 1, omisiones: 2, falsasAlarmas: 1, correctas: 3 })
  })
})

describe("4. Hearback", () => {
  it("colación correcta: solo vale «correcto»", () => {
    expect(calificarHearback(CM_HEARBACK[0], "correcto")).toBe(true)
    expect(calificarHearback(CM_HEARBACK[0], "nivel")).toBe(false)
  })
  it("colación con error: vale el elemento equivocado", () => {
    expect(calificarHearback(CM_HEARBACK[1], "qnh")).toBe(true)
    expect(calificarHearback(CM_HEARBACK[1], "correcto")).toBe(false)
    expect(calificarHearback(CM_HEARBACK[2], "direccion")).toBe(false)
  })
})

describe("5. ¿Qué respondes?", () => {
  it("solo la correcta", () => {
    const ej = CM_QUE_RESPONDES[1]
    expect(calificarQueRespondes(ej, ej.correcta)).toBe(true)
    expect(calificarQueRespondes(ej, 0)).toBe(false)
  })
})

describe("6. Desármala", () => {
  it("revisa cada ficha", () => {
    const ej = CM_DESARMALA[1]
    const bien = Object.fromEntries(ej.fichas.map((f) => [f.id, f.categoria]))
    expect(calificarDesarmala(ej, bien).every((x) => x.ok)).toBe(true)
    const r = calificarDesarmala(ej, { ...bien, cond: "siguiente" })
    expect(r.filter((x) => !x.ok).map((x) => x.id)).toEqual(["cond"])
  })
})

describe("7. Panel de cabina", () => {
  it("solo revisa lo que pide el ítem", () => {
    const ej = CM_PANEL[0]
    expect(calificarPanel(ej, { ...ej.inicial, hdg: 50, spd: 300 }).every((x) => x.ok)).toBe(true)
    expect(calificarPanel(ej, ej.inicial)[0].ok).toBe(false)
  })
  it("el rumbo da la vuelta y la altitud tiene tope", () => {
    expect(moverPerilla("hdg", 360, 1)).toBe(1)
    expect(moverPerilla("hdg", 5, -10)).toBe(355)
    expect(moverPerilla("alt", 45000, 1000)).toBe(45000)
    expect(moverPerilla("alt", 0, -100)).toBe(0)
  })
  it("FL240 es 24000 pies", () => {
    const ej = CM_PANEL[1]
    expect(calificarPanel(ej, { ...ej.inicial, alt: 24000 })[0].ok).toBe(true)
  })
})

describe("8. Ráfaga de números", () => {
  const [sq, frec] = CM_RAFAGA[0].dictados
  it("bien y a tiempo", () => {
    expect(calificarDictado(sq, "6402", 3, 8)).toEqual({ ok: true, aTiempo: true })
    expect(calificarDictado(frec, "121,75", 5, 8)).toEqual({ ok: true, aTiempo: true })
  })
  it("fuera de tiempo no vale aunque esté bien", () => {
    expect(calificarDictado(sq, "6402", 9, 8)).toEqual({ ok: false, aTiempo: false })
  })
  it("matrícula con guion o deletreada", () => {
    const mat = CM_RAFAGA[1].dictados[0]
    expect(calificarDictado(mat, "G-ABCD", 2, 8).ok).toBe(true)
  })
})

describe("9. ¿Estándar o plain?", () => {
  it("fraseología: basta clasificar", () => {
    const r = calificarEstandarOPlain(CM_ESTANDAR_O_PLAIN[0], "fraseologia", {})
    expect(r).toMatchObject({ clasificacionOk: true, aciertos: 1, total: 1 })
  })
  it("plain: clasificación y cada bloque", () => {
    const ej = CM_ESTANDAR_O_PLAIN[1]
    const bien = { problema: 1, capacidad: 0, necesidad: 2, intencion: 1 }
    expect(calificarEstandarOPlain(ej, "plain", bien)).toMatchObject({ aciertos: 5, total: 5 })
    const r = calificarEstandarOPlain(ej, "fraseologia", { ...bien, necesidad: 0 })
    expect(r.clasificacionOk).toBe(false)
    expect(r.aciertos).toBe(3)
  })
})

describe("10. Vuelo completo", () => {
  const vuelo = CM_VUELO_COMPLETO[0]
  it("tiene de 15 a 20 transmisiones", () => {
    const n = vuelo.pasos.reduce((s, p) => s + transmisionesDe(p.ejercicio).length, 0)
    expect(n).toBeGreaterThanOrEqual(15)
    expect(n).toBeLessThanOrEqual(20)
  })
  it("la radio nunca mejora a lo largo del vuelo", () => {
    const orden = { limpia: 0, normal: 1, sucia: 2 }
    const niveles = vuelo.pasos.map((p) => orden[p.perfil])
    expect(niveles).toEqual([...niveles].sort((a, b) => a - b))
  })
  it("el puntaje suma todos los pasos", () => {
    expect(puntajeVuelo([{ aciertos: 3, total: 4 }, undefined, { aciertos: 1, total: 1 }])).toEqual({
      aciertos: 4,
      total: 5,
      porcentaje: 80,
    })
  })
})

describe("datos de ejemplo", () => {
  const todos = [
    ...CM_COPIA,
    ...CM_READBACK,
    ...CM_ES_PARA_MI,
    ...CM_HEARBACK,
    ...CM_QUE_RESPONDES,
    ...CM_DESARMALA,
    ...CM_PANEL,
    ...CM_RAFAGA,
    ...CM_ESTANDAR_O_PLAIN,
    ...CM_VUELO_COMPLETO,
  ]
  it("cada ítem trae su fuente y una clave única", () => {
    for (const ej of todos) expect(ej.fuente.length).toBeGreaterThan(5)
    const claves = todos.map(claveEjercicioCm)
    expect(new Set(claves).size).toBe(claves.length)
  })
  it("ningún texto lleva raya larga ni media", () => {
    const json = JSON.stringify(todos)
    expect(json).not.toMatch(/[\u2013\u2014]/)
  })
  it("una transmisión con el mismo id dice siempre lo mismo", () => {
    const porId = new Map<string, string>()
    for (const t of CM_TRANSMISIONES_EJEMPLO) {
      expect(porId.get(t.id) ?? t.texto).toBe(t.texto)
      porId.set(t.id, t.texto)
    }
  })
  it("las respuestas modelo pasan su propia revisión", () => {
    for (const ej of CM_READBACK) expect(calificarReadback(ej, ej.modelo).faltan).toEqual([])
    for (const ej of CM_COPIA) {
      const r = calificarCopia(ej, Object.fromEntries(ej.campos.map((c) => [c.id, c.esperado])))
      expect(r.every((c) => c.ok)).toBe(true)
    }
  })
})
