import { describe, expect, it } from "vitest"
import { esReciente, proximasMisiones, semanaEnCurso, rangoDePiloto, xpGanada, XP_DE_NIVEL, XP_POR_RANGO } from "./logros"

describe("el nivel del piloto", () => {
  it("empieza en el nivel 1, en plataforma y de bronce", () => {
    expect(rangoDePiloto(0)).toEqual({ numero: 1, fase: "En plataforma", metal: "bronze", xp: 0, xpEnRango: 0, xpParaSubir: 100 })
  })

  it("sube cada 100 XP y cambia de fase y de metal en sus cortes", () => {
    expect(rangoDePiloto(90)).toMatchObject({ numero: 1, xpEnRango: 90, xpParaSubir: 10 })
    expect(rangoDePiloto(100)).toMatchObject({ numero: 2, xpEnRango: 0, xpParaSubir: 100 })
    expect(rangoDePiloto(250)).toMatchObject({ numero: 3, fase: "Rodaje", metal: "bronze" })
    expect(rangoDePiloto(500)).toMatchObject({ numero: 6, fase: "Despegue", metal: "silver" })
    expect(rangoDePiloto(1400)).toMatchObject({ numero: 15, fase: "Crucero", metal: "gold" })
    expect(rangoDePiloto(2550)).toMatchObject({ numero: 26, fase: "Leyenda", metal: "platinum" })
  })

  it("no se rompe con XP negativa ni con decimales", () => {
    expect(rangoDePiloto(-5).numero).toBe(1)
    expect(rangoDePiloto(99.9).numero).toBe(1)
  })

  it("la XP suma solo lo ganado, a lo que vale su metal", () => {
    const logros = [
      { code: "a", tier: "bronze" as const },
      { code: "b", tier: "silver" as const },
      { code: "c", tier: "gold" as const },
    ]
    expect(xpGanada(logros, (c) => c !== "c")).toBe(XP_DE_NIVEL.bronze + XP_DE_NIVEL.silver)
    expect(XP_POR_RANGO).toBe(100)
  })
})

describe("las próximas misiones", () => {
  const todos = () => true

  it("sin nada ganado: la primera racha y el primer paso de los primeros módulos", () => {
    const m = proximasMisiones({ existe: todos, ganado: () => false, racha: 0, hrefDiario: "/app/pca" })
    expect(m.map((x) => x.code)).toEqual(["streak_3", "notam_lesson", "metar_lesson"])
    expect(m[0]).toMatchObject({ actual: 0, meta: 3, href: "/app/pca" })
    expect(m[1]).toMatchObject({ actual: 0, meta: 4, detalle: "Empieza NOTAM", href: "/app/aerolinea/notam" })
  })

  it("la racha cuenta los días que lleva y salta a la meta que falta", () => {
    const ganados = new Set(["streak_3"])
    const [racha] = proximasMisiones({ existe: todos, ganado: (c) => ganados.has(c), racha: 5, hrefDiario: "/x" })
    expect(racha).toMatchObject({ code: "streak_7", actual: 5, meta: 7, detalle: "5 de 7 días seguidos" })
  })

  it("los módulos empezados van antes que los nuevos, el más avanzado primero", () => {
    const ganados = new Set(["streak_3", "streak_7", "streak_30", "rac_lesson", "mel_lesson", "mel_practice", "mel_exam"])
    const m = proximasMisiones({ existe: todos, ganado: (c) => ganados.has(c), racha: 0, hrefDiario: "/x" })
    expect(m.map((x) => x.code)).toEqual(["mel_master", "rac_practice", "notam_lesson"])
    expect(m[0]).toMatchObject({ actual: 3, meta: 4, detalle: "Paso 4 de 4 en MEL" })
  })

  it("no ofrece un logro que no está en la tabla, ni un módulo ya dominado", () => {
    const ganados = new Set(["notam_lesson", "notam_practice", "notam_exam", "notam_master"])
    const existe = (c: string) => !c.startsWith("streak_") && c !== "metar_practice" && c !== "metar_exam"
    const m = proximasMisiones({ existe, ganado: (c) => ganados.has(c), racha: 2, hrefDiario: "/x" })
    expect(m.map((x) => x.code)).toEqual(["metar_lesson", "mercancias_lesson", "aerodinamica_lesson"])
    expect(m[0].meta).toBe(2)
  })
})

describe("lo reciente", () => {
  const ahora = new Date("2026-09-26T12:00:00Z")
  it("es lo ganado en los últimos siete días", () => {
    expect(esReciente("2026-09-25T12:00:00Z", ahora)).toBe(true)
    expect(esReciente("2026-09-18T12:00:00Z", ahora)).toBe(false)
    expect(esReciente(undefined, ahora)).toBe(false)
    expect(esReciente("no es fecha", ahora)).toBe(false)
  })
})

describe("la semana en curso", () => {
  it("va de lunes a domingo y marca hoy, lo estudiado y lo que falta", () => {
    // 26 de septiembre de 2026 es sábado.
    const semana = semanaEnCurso(
      [
        { date: "2026-09-21", activities_count: 2 },
        { date: "2026-09-24", activities_count: 0 },
        { date: "2026-09-26", activities_count: 1 },
      ],
      "2026-09-26",
    )
    expect(semana.map((d) => d.dia)).toEqual([
      "2026-09-21", "2026-09-22", "2026-09-23", "2026-09-24", "2026-09-25", "2026-09-26", "2026-09-27",
    ])
    expect(semana.map((d) => d.activo)).toEqual([true, false, false, false, false, true, false])
    expect(semana.find((d) => d.esHoy)?.letra).toBe("S")
    expect(semana.filter((d) => d.futuro).map((d) => d.letra)).toEqual(["D"])
  })
})
