import { describe, expect, it, vi } from "vitest"
import { cargarAudio, crearReproductorRadio, elegirVoz, urlAudio, type Transmision } from "@/lib/radio"
import { crearAleatorio, curvaDistorsion, llenarRuidoRosa, llenarSquelch, planDeCortes } from "@/lib/radio/senales"

const TX: Transmision = {
  id: "cm-ej-squawk-6402",
  texto: "Aviatory four five two, squawk six four zero two.",
  voz: "atc_latam",
  perfil: "normal",
}

/** Un nodo de Web Audio de mentira: acepta cualquier propiedad y cualquier llamada. */
function nodoFalso(): unknown {
  const parametro = () => ({ value: 0, setValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn() })
  const base: Record<string, unknown> = {
    gain: parametro(),
    frequency: parametro(),
    Q: parametro(),
    playbackRate: parametro(),
    threshold: parametro(),
    ratio: parametro(),
    attack: parametro(),
    release: parametro(),
    start: vi.fn(),
    stop: vi.fn(),
    disconnect: vi.fn(),
  }
  const nodo: Record<string, unknown> = new Proxy(base, {
    get(t, k: string) {
      if (k === "connect") return () => nodo
      return k in t ? t[k] : undefined
    },
    set(t, k: string, v) {
      t[k] = v
      return true
    },
  })
  return nodo
}

function contextoFalso(decodifica: boolean) {
  const fuentes: Record<string, unknown>[] = []
  const ctx = {
    state: "running",
    currentTime: 0,
    sampleRate: 8000,
    destination: nodoFalso(),
    resume: vi.fn(async () => undefined),
    close: vi.fn(async () => undefined),
    createGain: () => nodoFalso(),
    createBiquadFilter: () => nodoFalso(),
    createWaveShaper: () => nodoFalso(),
    createDynamicsCompressor: () => nodoFalso(),
    createOscillator: () => nodoFalso(),
    createBufferSource: () => {
      const n = nodoFalso() as Record<string, unknown>
      fuentes.push(n)
      return n
    },
    createBuffer: (_c: number, largo: number, sr: number) => ({
      sampleRate: sr,
      duration: largo / sr,
      getChannelData: () => new Float32Array(largo),
    }),
    decodeAudioData: vi.fn(async () => {
      if (!decodifica) throw new Error("no es audio")
      return { duration: 0.05, sampleRate: 8000 }
    }),
  }
  return { ctx: ctx as unknown as AudioContext, fuentes }
}

function sintesisFalsa() {
  const dichos: string[] = []
  const sintesis = {
    getVoices: () => [{ lang: "en-US", name: "Falsa" }] as SpeechSynthesisVoice[],
    cancel: vi.fn(),
    speak: vi.fn((u: { texto: string; onend?: () => void }) => {
      dichos.push(u.texto)
      setTimeout(() => u.onend?.(), 0)
    }),
  }
  const crearEnunciado = (texto: string) => ({ texto }) as unknown as SpeechSynthesisUtterance
  return { sintesis: sintesis as unknown as SpeechSynthesis, crearEnunciado, dichos }
}

function respuesta(status: number, tipo: string) {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers({ "content-type": tipo }),
    arrayBuffer: async () => new ArrayBuffer(8),
  } as unknown as Response
}

describe("cargarAudio", () => {
  it("pide el mp3 por id en la carpeta del módulo", async () => {
    const fetch = vi.fn(async () => respuesta(200, "audio/mpeg"))
    const datos = await cargarAudio(TX.id, { fetch, base: "/modulos/comunicaciones/audio" })
    expect(fetch).toHaveBeenCalledWith("/modulos/comunicaciones/audio/cm-ej-squawk-6402.mp3")
    expect(datos).toBeInstanceOf(ArrayBuffer)
    expect(urlAudio("a b")).toBe("/modulos/comunicaciones/audio/a%20b.mp3")
  })
  it("un 404 es «no hay audio»", async () => {
    expect(await cargarAudio(TX.id, { fetch: async () => respuesta(404, "text/plain"), base: "" })).toBeNull()
  })
  it("un index.html con 200 tampoco es audio", async () => {
    expect(await cargarAudio(TX.id, { fetch: async () => respuesta(200, "text/html"), base: "" })).toBeNull()
  })
  it("sin red devuelve null en vez de lanzar", async () => {
    expect(
      await cargarAudio(TX.id, {
        fetch: async () => {
          throw new TypeError("offline")
        },
        base: "",
      }),
    ).toBeNull()
  })
})

describe("reproductor de radio", () => {
  it("si falta el mp3, habla la voz del navegador con el texto del guion", async () => {
    const { ctx } = contextoFalso(true)
    const voz = sintesisFalsa()
    const fetch = vi.fn(async () => respuesta(404, "text/plain"))
    const rep = crearReproductorRadio({ fetch, crearContexto: () => ctx, ...voz })
    const r = await rep.reproducir(TX)
    expect(r).toEqual({ fuente: "sintesis", cancelada: false })
    expect(voz.dichos).toEqual([TX.texto])
    // La segunda vez no vuelve a pedir el archivo que ya se sabe que no está.
    await rep.reproducir(TX)
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it("si el mp3 no se puede decodificar, también cae a la voz del navegador", async () => {
    const { ctx } = contextoFalso(false)
    const voz = sintesisFalsa()
    const aviso = vi.spyOn(console, "warn").mockImplementation(() => undefined)
    const rep = crearReproductorRadio({ fetch: async () => respuesta(200, "audio/mpeg"), crearContexto: () => ctx, ...voz })
    const r = await rep.reproducir(TX)
    expect(r.fuente).toBe("sintesis")
    expect(aviso).toHaveBeenCalled()
    aviso.mockRestore()
  })

  it("con mp3, suena el audio y no la voz del navegador", async () => {
    const { ctx, fuentes } = contextoFalso(true)
    const voz = sintesisFalsa()
    const rep = crearReproductorRadio({ fetch: async () => respuesta(200, "audio/mpeg"), crearContexto: () => ctx, ...voz })
    const r = await rep.reproducir(TX, { perfil: "sucia", velocidad: 1 })
    expect(r).toEqual({ fuente: "audio", cancelada: false })
    expect(voz.dichos).toEqual([])
    // Ruido de fondo, squelch de apertura, voz y squelch de cierre.
    expect(fuentes.length).toBeGreaterThanOrEqual(4)
  })

  it("sin Web Audio ni voz del navegador, devuelve «texto» para que la pantalla lo muestre", async () => {
    const rep = crearReproductorRadio({ fetch: async () => respuesta(404, ""), crearContexto: () => null, sintesis: null, crearEnunciado: null })
    expect(await rep.reproducir(TX)).toEqual({ fuente: "texto", cancelada: false })
  })

  it("detener corta la reproducción en curso", async () => {
    const { ctx } = contextoFalso(true)
    const rep = crearReproductorRadio({ fetch: async () => respuesta(200, "audio/mpeg"), crearContexto: () => ctx, sintesis: null, crearEnunciado: null })
    const promesa = rep.reproducir({ ...TX, id: "otro" })
    await new Promise((r) => setTimeout(r, 0))
    rep.detener()
    expect((await promesa).cancelada).toBe(true)
  })

  it("elige voz en inglés según el papel", () => {
    const voces = [
      { lang: "es-ES", name: "a" },
      { lang: "en-GB", name: "b" },
      { lang: "en-US", name: "c" },
    ] as SpeechSynthesisVoice[]
    expect(elegirVoz(voces, "atc_uk")?.name).toBe("b")
    expect(elegirVoz(voces, "atc_us")?.name).toBe("c")
    expect(elegirVoz([{ lang: "es-ES", name: "a" }] as SpeechSynthesisVoice[], "atc_uk")).toBeNull()
  })
})

describe("señales generadas", () => {
  it("el ruido rosa queda entre -1 y 1 y no es silencio", () => {
    const b = llenarRuidoRosa(new Float32Array(4000), crearAleatorio(7))
    expect(Math.max(...b)).toBeLessThanOrEqual(1)
    expect(Math.min(...b)).toBeGreaterThanOrEqual(-1)
    expect(b.some((x) => Math.abs(x) > 0.01)).toBe(true)
  })
  it("el squelch arranca fuerte y se apaga", () => {
    const b = llenarSquelch(new Float32Array(1600), 8000, crearAleatorio(3), "cierre")
    const inicio = b.slice(0, 200).reduce((s, x) => s + Math.abs(x), 0)
    const final = b.slice(-200).reduce((s, x) => s + Math.abs(x), 0)
    expect(inicio).toBeGreaterThan(final * 3)
  })
  it("la curva de distorsión es impar y acotada", () => {
    const c = curvaDistorsion(0.6, 101)
    expect(c[0]).toBeCloseTo(-1)
    expect(c[100]).toBeCloseTo(1)
    expect(c[50]).toBeCloseTo(0)
  })
  it("los cortes no tapan el primer medio segundo", () => {
    const cortes = planDeCortes(4, 1, crearAleatorio(1))
    expect(cortes).toHaveLength(4)
    expect(cortes.every((c) => c.inicio >= 0.5)).toBe(true)
    expect(planDeCortes(4, 0, crearAleatorio(1))).toEqual([])
  })
})
