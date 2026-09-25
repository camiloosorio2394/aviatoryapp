import { describe, expect, it } from "vitest"
import {
  alternarCapacidad,
  calificarBusqueda,
  calificarCombinados,
  calificarImpacto,
  calificarLectura,
  calificarPasoLectura,
  calificarPlazo,
  calificarPodemosSalir,
  claveEjercicioMel,
  cuentaTramos,
  diaDeDescubrimiento,
  diasContados,
  entradasDe,
  esEntradaReal,
  formatoFecha,
  formatoFechaHora,
  mismaSeleccion,
  NINGUN_TRAMO,
  opcionesPlazo,
  respuestaPlazo,
  ultimoDiaCalendario,
  ultimoDiaDeVuelo,
  type EjCalculaElPlazo,
  type EjLeeLaEntrada,
  type EntradaMel,
  type ParteEntrada,
} from "@/lib/melPractica"
import {
  MEL_BUSCA_EL_ITEM,
  MEL_CALCULA_EL_PLAZO,
  MEL_COMBINADOS,
  MEL_ENTRADAS_INVENTADAS,
  MEL_ENTRADAS_REALES,
  MEL_IMPACTO_OPERACIONAL,
  MEL_LEE_LA_ENTRADA,
  MEL_PODEMOS_SALIR,
  MEL_PRACTICA_DATOS,
} from "@/lib/melPracticaDatos"

function plazo(p: Partial<EjCalculaElPlazo> & Pick<EjCalculaElPlazo, "categoria" | "plazo">): EjCalculaElPlazo {
  return { id: "x", tipo: "calculaElPlazo", fuente: "", explicacion: "", situacion: "", cuenta: "local", opciones: [], ...p }
}

// ─── Plazos ──────────────────────────────────────────────────────────────────

describe("plazos (sistema FAA, PL-25 Rev 24)", () => {
  it("el ejemplo de PL-25: 26 de enero a las 10:00; B vence el 29 y C el 5 de febrero, a las 2359", () => {
    expect(ultimoDiaCalendario("2026-01-26", 3)).toBe("2026-01-29")
    expect(ultimoDiaCalendario("2026-01-26", 10)).toBe("2026-02-05")
    const registro = { fecha: "2026-01-26", hora: "10:00", huso: -5 }
    expect(respuestaPlazo(plazo({ categoria: "B", plazo: { unidad: "calendario" }, registro }))).toBe("2026-01-29T23:59")
    expect(respuestaPlazo(plazo({ categoria: "C", plazo: { unidad: "calendario" }, registro }))).toBe("2026-02-05T23:59")
  })

  it("D son 120 días sin contar el del registro", () => {
    const ej = plazo({ categoria: "D", plazo: { unidad: "calendario" }, registro: { fecha: "2026-03-03", hora: "16:45", huso: -5 } })
    expect(respuestaPlazo(ej)).toBe("2026-07-01T23:59")
    expect(diasContados(ej)).toHaveLength(120)
    expect(diasContados(ej)[0]).toBe("2026-03-04")
  })

  it("A en días calendario usa los días del ítem; sin ellos no hay respuesta", () => {
    const registro = { fecha: "2026-05-10", hora: "08:00", huso: -5 }
    expect(respuestaPlazo(plazo({ categoria: "A", plazo: { unidad: "calendario", dias: 2 }, registro }))).toBe("2026-05-12T23:59")
    expect(respuestaPlazo(plazo({ categoria: "A", plazo: { unidad: "calendario" }, registro }))).toBeNull()
  })

  it("si el operador cuenta en UTC, la hora local se convierte antes de fijar el day of discovery", () => {
    const r = { fecha: "2026-08-14", hora: "21:30", huso: -5 }
    expect(diaDeDescubrimiento(r, "UTC")).toBe("2026-08-15")
    expect(diaDeDescubrimiento(r, "local")).toBe("2026-08-14")
    expect(diaDeDescubrimiento({ fecha: "2026-08-14", hora: "03:00", huso: 5 }, "UTC")).toBe("2026-08-13")
  })

  it("cuenta el 29 de febrero en año bisiesto y cruza fin de año", () => {
    expect(ultimoDiaCalendario("2028-02-27", 3)).toBe("2028-03-01")
    expect(ultimoDiaCalendario("2027-02-27", 3)).toBe("2027-03-02")
    expect(ultimoDiaCalendario("2026-12-27", 10)).toBe("2027-01-06")
  })

  it("flight-days: solo cuentan los días con al menos un vuelo iniciado, después del de descubrimiento", () => {
    expect(ultimoDiaDeVuelo("2026-04-06", 2, ["2026-04-06", "2026-04-08", "2026-04-09", "2026-04-10"])).toBe("2026-04-09")
    expect(ultimoDiaDeVuelo("2026-04-06", 2, ["2026-04-09", "2026-04-08", "2026-04-08"])).toBe("2026-04-09")
    expect(ultimoDiaDeVuelo("2026-04-06", 3, ["2026-04-08", "2026-04-09"])).toBeNull()
  })

  it("vuelos u horas, lo que ocurra primero: el primer tramo que pasa cierra la cuenta", () => {
    const p = {
      unidad: "vuelosHoras" as const,
      vuelos: 3,
      horas: 6,
      tramos: [
        { id: "t1", ruta: "A-B", horas: 1.6, hecho: true },
        { id: "t2", ruta: "B-A", horas: 1.7 },
        { id: "t3", ruta: "A-C", horas: 2.9 },
        { id: "t4", ruta: "C-A", horas: 0.5 },
      ],
    }
    const c = cuentaTramos(p)
    expect(c.map((x) => x.permitido)).toEqual([true, true, false, false])
    expect(c[2].horas).toBe(6.2)
    const ej = plazo({ categoria: "A", plazo: p })
    expect(respuestaPlazo(ej)).toBe("t2")
    expect(opcionesPlazo(ej)).toEqual(["t2", "t3", "t4", NINGUN_TRAMO])
    expect(calificarPlazo(ej, "t3")).toBe(false)
    expect(calificarPlazo(ej, "t2")).toBe(true)
  })

  it("si ya no cabe ningún tramo, la respuesta es «ninguno»", () => {
    const ej = plazo({
      categoria: "A",
      plazo: { unidad: "vuelosHoras", vuelos: 1, tramos: [{ id: "a", ruta: "X", horas: 1, hecho: true }, { id: "b", ruta: "Y", horas: 1 }] },
    })
    expect(respuestaPlazo(ej)).toBe(NINGUN_TRAMO)
  })

  it("formatea fechas en español sin depender del navegador", () => {
    expect(formatoFecha("2026-02-05")).toBe("jue 5 feb 2026")
    expect(formatoFechaHora("2026-01-29T23:59")).toBe("jue 29 ene 2026, 23:59")
  })
})

// ─── Calificación ────────────────────────────────────────────────────────────

describe("calificación", () => {
  it("mismaSeleccion no depende del orden ni de repetidos", () => {
    expect(mismaSeleccion([2, 0, 0], [0, 2])).toBe(true)
    expect(mismaSeleccion([0], [0, 2])).toBe(false)
    expect(mismaSeleccion([0, 1, 2], [0, 2])).toBe(false)
  })

  it("lee la entrada: por paso, tocando o eligiendo", () => {
    const ej: EjLeeLaEntrada = MEL_LEE_LA_ENTRADA[0]
    const toca = ej.pasos.find((p) => p.tipo === "toca")!
    expect(calificarPasoLectura(toca, toca.tipo === "toca" ? toca.parte : "item")).toBe(true)
    expect(calificarPasoLectura(toca, "observaciones")).toBe(false)
    expect(calificarPasoLectura(toca, undefined)).toBe(false)
    const todas: Record<string, ParteEntrada | number[]> = {}
    for (const p of ej.pasos) todas[p.id] = p.tipo === "toca" ? p.parte : p.correctas
    const r = calificarLectura(ej, todas)
    expect(r.every((x) => x.ok)).toBe(true)
    expect(r).toHaveLength(ej.pasos.length)
    expect(calificarLectura(ej, {}).some((x) => x.ok)).toBe(false)
  })

  it("¿podemos salir?: decisión y juego de razones, dos puntos", () => {
    const ej = {
      decision: "no" as const,
      razones: [
        { texto: "a", correcta: true },
        { texto: "b", correcta: false },
        { texto: "c", correcta: true },
      ],
    }
    expect(calificarPodemosSalir(ej, "no", [0, 2])).toMatchObject({ aciertos: 2, total: 2, decisionOk: true, razonesOk: true })
    expect(calificarPodemosSalir(ej, "no", [0])).toMatchObject({ aciertos: 1, razones: [true, true, false] })
    expect(calificarPodemosSalir(ej, "si", [0, 1, 2])).toMatchObject({ aciertos: 0, razones: [true, false, true] })
    expect(calificarPodemosSalir(ej, null, [])).toMatchObject({ decisionOk: false })
  })

  it("combinados: decisión y dependencia", () => {
    const ej = { decision: "si" as const, dependencia: { opciones: ["a", "b"], correcta: 1 } }
    expect(calificarCombinados(ej, "si", 1)).toMatchObject({ aciertos: 2, total: 2 })
    expect(calificarCombinados(ej, "falta", 1)).toMatchObject({ aciertos: 1, decisionOk: false, dependenciaOk: true })
    expect(calificarCombinados(ej, null, null).aciertos).toBe(0)
  })

  it("busca el ítem: capítulo e ítem por separado", () => {
    const ej = MEL_BUSCA_EL_ITEM[0]
    expect(calificarBusqueda(ej, ej.capitulo, ej.item).every((p) => p.ok)).toBe(true)
    const otro = ej.capitulos.find((c) => c.numero !== ej.capitulo)!.numero
    expect(calificarBusqueda(ej, otro, ej.item).map((p) => p.ok)).toEqual([false, true])
  })

  it("impacto: aciertos sobre la unión; marcar todo no suma y no marcar nada da cero", () => {
    const ej = { afecta: ["rvsm", "meteorologia"] as const }
    const bien = calificarImpacto({ afecta: [...ej.afecta] }, ["meteorologia", "rvsm"])
    expect(bien).toMatchObject({ aciertos: 2, total: 2, ok: true })
    const sobra = calificarImpacto({ afecta: [...ej.afecta] }, ["rvsm", "meteorologia", "combustible", "pbn"])
    expect(sobra).toMatchObject({ aciertos: 2, total: 4, ok: false })
    expect(sobra.estado.combustible).toBe("sobra")
    const falta = calificarImpacto({ afecta: [...ej.afecta] }, ["rvsm"])
    expect(falta.estado.meteorologia).toBe("omitida")
    expect(calificarImpacto({ afecta: [...ej.afecta] }, [])).toMatchObject({ aciertos: 0, total: 2, ok: false })
  })

  it("«ninguna» va sola", () => {
    expect(alternarCapacidad(["rvsm", "pbn"], "ninguna")).toEqual(["ninguna"])
    expect(alternarCapacidad(["ninguna"], "rvsm")).toEqual(["rvsm"])
    expect(alternarCapacidad(["rvsm"], "rvsm")).toEqual([])
  })

  it("clave de progreso: mel-<tipo>-<id>", () => {
    expect(claveEjercicioMel({ tipo: "calculaElPlazo", id: "pl25-categoria-b" })).toBe("mel-calculaElPlazo-pl25-categoria-b")
  })
})

// ─── Los datos ───────────────────────────────────────────────────────────────

const RAYAS = new RegExp(`[${String.fromCharCode(0x2014)}${String.fromCharCode(0x2013)}]`)

function textos(x: unknown, fuera: string[] = []): string[] {
  if (typeof x === "string") fuera.push(x)
  else if (Array.isArray(x)) x.forEach((y) => textos(y, fuera))
  else if (x && typeof x === "object") Object.values(x).forEach((y) => textos(y, fuera))
  return fuera
}

function partesDeFila(e: EntradaMel, fila: number): ParteEntrada[] {
  const f = e.filas[fila]
  const p: ParteEntrada[] = ["codigo", "item"]
  if (f.categoria) p.push("categoria")
  if (f.instalados) p.push("instalados")
  if (f.requeridos) p.push("requeridos")
  if (f.procedimientos?.length) p.push("procedimientos")
  if (f.observaciones) p.push("observaciones")
  if (f.notas?.length) p.push("nota")
  return p
}

describe("datos de práctica", () => {
  it("trae los mínimos pedidos por tipo", () => {
    expect(MEL_LEE_LA_ENTRADA.length).toBeGreaterThanOrEqual(12)
    expect(MEL_PODEMOS_SALIR.length).toBeGreaterThanOrEqual(12)
    expect(MEL_CALCULA_EL_PLAZO.length).toBeGreaterThanOrEqual(10)
    expect(MEL_COMBINADOS.length).toBeGreaterThanOrEqual(8)
    expect(MEL_BUSCA_EL_ITEM.length).toBeGreaterThanOrEqual(10)
    expect(MEL_IMPACTO_OPERACIONAL.length).toBeGreaterThanOrEqual(10)
  })

  it("las claves de progreso son únicas", () => {
    const claves = MEL_PRACTICA_DATOS.map(claveEjercicioMel)
    expect(new Set(claves).size).toBe(claves.length)
  })

  it("sin raya larga ni media en ningún texto (deepPlain las cambia por «: »)", () => {
    for (const t of textos(MEL_PRACTICA_DATOS)) expect(RAYAS.test(t), t).toBe(false)
  })

  it("todo ejercicio tiene fuente y explicación, y las filas señaladas existen", () => {
    for (const ej of MEL_PRACTICA_DATOS) {
      expect(ej.fuente.trim(), ej.id).not.toBe("")
      expect(ej.explicacion.trim(), ej.id).not.toBe("")
      for (const e of entradasDe(ej)) expect(e.filas.length).toBeGreaterThan(0)
    }
    const conFila = [...MEL_LEE_LA_ENTRADA, ...MEL_PODEMOS_SALIR, ...MEL_IMPACTO_OPERACIONAL]
    for (const ej of conFila) expect(ej.entrada.filas[ej.fila]?.categoria, ej.id).toBeTruthy()
    for (const ej of MEL_COMBINADOS) for (const it of ej.items) expect(it.entrada.filas[it.fila]?.categoria, ej.id).toBeTruthy()
    for (const ej of MEL_CALCULA_EL_PLAZO) if (ej.entrada) expect(ej.entrada.filas[ej.fila ?? -1]?.categoria, ej.id).toBe(ej.categoria)
  })

  it("lee la entrada: lo que se pide tocar existe en la fila y las correctas están en rango", () => {
    for (const ej of MEL_LEE_LA_ENTRADA) {
      const partes = partesDeFila(ej.entrada, ej.fila)
      const ids = ej.pasos.map((p) => p.id)
      expect(new Set(ids).size, ej.id).toBe(ids.length)
      for (const p of ej.pasos) {
        if (p.tipo === "toca") expect(partes, `${ej.id}/${p.id}`).toContain(p.parte)
        else {
          expect(p.correctas.length, `${ej.id}/${p.id}`).toBeGreaterThan(0)
          for (const c of p.correctas) expect(c < p.opciones.length && c >= 0, `${ej.id}/${p.id}`).toBe(true)
        }
      }
    }
  })

  it("¿podemos salir?: hay de las tres decisiones y cada caso tiene razones buenas y malas", () => {
    const decisiones = new Set(MEL_PODEMOS_SALIR.map((e) => e.decision))
    expect([...decisiones].sort()).toEqual(["falta", "no", "si"])
    for (const ej of MEL_PODEMOS_SALIR) {
      expect(ej.razones.some((r) => r.correcta), ej.id).toBe(true)
      expect(ej.razones.some((r) => !r.correcta), ej.id).toBe(true)
      if (ej.decision === "si") expect(ej.cumpliendo, ej.id).toBeTruthy()
    }
  })

  it("calcula el plazo: la respuesta existe, está entre las opciones y no se repite", () => {
    const unidades = new Set(MEL_CALCULA_EL_PLAZO.map((e) => e.plazo.unidad))
    expect([...unidades].sort()).toEqual(["calendario", "diasDeVuelo", "vuelosHoras"])
    for (const ej of MEL_CALCULA_EL_PLAZO) {
      const buena = respuestaPlazo(ej)
      expect(buena, ej.id).not.toBeNull()
      const ops = opcionesPlazo(ej)
      expect(new Set(ops).size, ej.id).toBe(ops.length)
      expect(ops, ej.id).toContain(buena)
      expect(ops.length, ej.id).toBeGreaterThanOrEqual(3)
      if (ej.plazo.unidad !== "vuelosHoras") expect(ej.registro, ej.id).toBeTruthy()
    }
  })

  it("incluye el ejemplo del 26 de enero de PL-25", () => {
    const b = MEL_CALCULA_EL_PLAZO.find((e) => e.id === "pl25-categoria-b")!
    const c = MEL_CALCULA_EL_PLAZO.find((e) => e.id === "pl25-categoria-c")!
    expect(respuestaPlazo(b)).toBe("2026-01-29T23:59")
    expect(respuestaPlazo(c)).toBe("2026-02-05T23:59")
  })

  it("combinados: 2 o 3 ítems y la dependencia en rango", () => {
    for (const ej of MEL_COMBINADOS) {
      expect(ej.items.length, ej.id).toBeGreaterThanOrEqual(2)
      expect(ej.items.length, ej.id).toBeLessThanOrEqual(3)
      expect(ej.dependencia.correcta).toBeLessThan(ej.dependencia.opciones.length)
    }
    expect(new Set(MEL_COMBINADOS.map((e) => e.decision)).size).toBeGreaterThan(1)
  })

  it("busca el ítem: el capítulo y el ítem buenos están en sus listas, y el ítem es de ese capítulo", () => {
    for (const ej of MEL_BUSCA_EL_ITEM) {
      expect(ej.capitulos.map((c) => c.numero), ej.id).toContain(ej.capitulo)
      expect(ej.items.map((i) => i.codigo), ej.id).toContain(ej.item)
      for (const i of ej.items) expect(i.codigo.startsWith(`${ej.capitulo}-`), `${ej.id}/${i.codigo}`).toBe(true)
    }
  })

  it("impacto: «ninguna» va sola y hay al menos un caso de cada capacidad principal", () => {
    const vistas = new Set<string>()
    for (const ej of MEL_IMPACTO_OPERACIONAL) {
      expect(ej.afecta.length, ej.id).toBeGreaterThan(0)
      if (ej.afecta.includes("ninguna")) expect(ej.afecta, ej.id).toEqual(["ninguna"])
      ej.afecta.forEach((a) => vistas.add(a))
    }
    for (const c of ["rvsm", "catIIIII", "edto", "pbn", "performance", "combustible", "meteorologia", "ninguna"]) expect(vistas, c).toContain(c)
  })

  it("entradas reales: citan su MMEL; inventadas: sin cita y en numeración XX-85 a XX-89", () => {
    for (const e of MEL_ENTRADAS_REALES) {
      expect(esEntradaReal(e), e.codigo).toBe(true)
      expect(e.fuente, e.codigo).toMatch(/^MMEL FAA (A318-A321, Rev 32|B-737, Rev 63a), /)
      expect(e.fuente, e.codigo).toContain(e.codigo)
    }
    for (const e of MEL_ENTRADAS_INVENTADAS) {
      expect(esEntradaReal(e), e.codigo).toBe(false)
      expect(e.codigo, e.codigo).toMatch(/^\d{2}-8[5-9]-\d{2}$/)
      expect(e.codigo.slice(0, 2)).toBe(e.ata.numero)
    }
  })

  it("todas las entradas que usan los ejercicios están en las listas de reales o inventadas", () => {
    const todas = new Set<EntradaMel>([...MEL_ENTRADAS_REALES, ...MEL_ENTRADAS_INVENTADAS])
    for (const ej of MEL_PRACTICA_DATOS) for (const e of entradasDe(ej)) expect(todas.has(e), `${ej.id}: ${e.codigo}`).toBe(true)
  })

  it("una inventada no repite un número de ítem de las lecciones (docs/mel)", () => {
    const docs = Object.values(import.meta.glob<string>("/docs/mel/*.md", { query: "?raw", import: "default", eager: true })).join("\n")
    expect(docs.length).toBeGreaterThan(0)
    for (const e of MEL_ENTRADAS_INVENTADAS) expect(docs.includes(e.codigo), e.codigo).toBe(false)
  })
})
