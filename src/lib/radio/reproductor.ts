import { PERFILES, type ParametrosPerfil } from "./perfiles"
import {
  DURACION_SQUELCH,
  crearAleatorio,
  curvaDistorsion,
  llenarRuidoRosa,
  llenarSquelch,
  planDeCortes,
} from "./senales"
import type {
  FuenteAudio,
  OpcionesReproduccion,
  PerfilRadio,
  ResultadoReproduccion,
  Transmision,
  VozRadio,
} from "./tipos"

/**
 * Reproductor de radio VHF: toma el mp3 de una transmisión y lo pasa por una
 * cadena de Web Audio que lo deja sonando a radio.
 *
 *   mp3 → pasa altos → pasa bajos → saturación → compresor → voz ─┐
 *   ruido rosa en bucle → pasa banda → ruido ─────────────────────┼→ salida
 *   squelch de apertura y de cierre ─────────────────────────────┤
 *   (sucia) silbido de batido y cortes de señal ──────────────────┘
 *
 * Si el mp3 no existe todavía (404) o no se puede decodificar, habla la voz
 * del navegador (speechSynthesis) con el texto del guion. Esa voz no pasa por
 * Web Audio, así que no lleva filtro, pero sí el ruido de fondo y el squelch
 * alrededor. Y si tampoco hay voz del navegador, se devuelve `texto` para que
 * la pantalla muestre la transmisión escrita.
 *
 * El mp3 se pide al propio dominio (`connect-src 'self'`) y se decodifica en
 * memoria: no hace falta tocar la CSP de vercel.json.
 */

export const BASE_AUDIO_COMUNICACIONES = "/modulos/comunicaciones/audio"

export function urlAudio(id: string, base = BASE_AUDIO_COMUNICACIONES): string {
  return `${base}/${encodeURIComponent(id)}.mp3`
}

export interface DependenciasRadio {
  fetch: (url: string) => Promise<Response>
  /** Null donde no hay Web Audio (jsdom, navegadores muy viejos). */
  crearContexto: () => AudioContext | null
  /** Null donde no hay speechSynthesis. */
  sintesis: SpeechSynthesis | null
  crearEnunciado: ((texto: string) => SpeechSynthesisUtterance) | null
  base: string
}

function dependenciasDelNavegador(): DependenciasRadio {
  const w = typeof window !== "undefined" ? window : undefined
  const Contexto =
    w?.AudioContext ?? (w as unknown as { webkitAudioContext?: typeof AudioContext } | undefined)?.webkitAudioContext
  const hayVoz = !!w && "speechSynthesis" in w && typeof SpeechSynthesisUtterance !== "undefined"
  return {
    fetch: (url) => fetch(url),
    crearContexto: () => {
      if (!Contexto) return null
      try {
        return new Contexto()
      } catch {
        return null
      }
    },
    sintesis: hayVoz ? w.speechSynthesis : null,
    crearEnunciado: hayVoz ? (t) => new SpeechSynthesisUtterance(t) : null,
    base: BASE_AUDIO_COMUNICACIONES,
  }
}

/**
 * Descarga el mp3. Devuelve null si no está. Ojo: un archivo que falta puede
 * volver como index.html con 200 si alguien deshace la exclusión de modulos/
 * en el rewrite de vercel.json; por eso se exige un Content-Type de audio.
 */
export async function cargarAudio(id: string, deps: Pick<DependenciasRadio, "fetch" | "base">): Promise<ArrayBuffer | null> {
  try {
    const r = await deps.fetch(urlAudio(id, deps.base))
    if (!r.ok) return null
    const tipo = r.headers.get("content-type") ?? ""
    if (!/^audio\/|octet-stream/.test(tipo)) return null
    return await r.arrayBuffer()
  } catch {
    // Sin conexión: se cae a la voz del navegador, que es justo el respaldo.
    return null
  }
}

/** Idiomas y tono de la voz sintética por papel, para que ATC y PM no suenen igual. */
const VOZ_SINTETICA: Record<VozRadio, { idiomas: string[]; tono: number; ritmo: number; desplazar: number }> = {
  atc_latam: { idiomas: ["en-US", "en"], tono: 0.9, ritmo: 0.95, desplazar: 0 },
  atc_uk: { idiomas: ["en-GB", "en"], tono: 1, ritmo: 0.95, desplazar: 0 },
  atc_us: { idiomas: ["en-US", "en"], tono: 1, ritmo: 1, desplazar: 0 },
  piloto: { idiomas: ["en-US", "en-GB", "en"], tono: 1.1, ritmo: 1, desplazar: 1 },
  piloto_pm: { idiomas: ["en-AU", "en-GB", "en-US", "en"], tono: 1.2, ritmo: 1, desplazar: 1 },
}

/** Elige una voz en inglés. `desplazar` toma la segunda que calce, para variar. */
export function elegirVoz(voces: SpeechSynthesisVoice[], voz: VozRadio): SpeechSynthesisVoice | null {
  const cfg = VOZ_SINTETICA[voz]
  for (const idioma of cfg.idiomas) {
    const calzan = voces.filter((v) => v.lang.toLowerCase().startsWith(idioma.toLowerCase()))
    if (calzan.length) return calzan[Math.min(cfg.desplazar, calzan.length - 1)]
  }
  return null
}

export interface ReproductorRadio {
  reproducir: (tx: Transmision, opciones?: OpcionesReproduccion) => Promise<ResultadoReproduccion>
  detener: () => void
  /** Suelta el AudioContext. Tras esto el reproductor se puede volver a usar: crea otro. */
  cerrar: () => void
}

interface Pendiente {
  fuente: FuenteAudio
  resolver: (r: ResultadoReproduccion) => void
  limpiar: () => void
}

export function crearReproductorRadio(parcial: Partial<DependenciasRadio> = {}): ReproductorRadio {
  const deps: DependenciasRadio = { ...dependenciasDelNavegador(), ...parcial }
  let ctx: AudioContext | null = null
  let intentoContexto = false
  let turno = 0
  let pendiente: Pendiente | null = null
  const decodificados = new Map<string, AudioBuffer>()
  /** Ids que ya se sabe que no tienen mp3: no se vuelven a pedir en la sesión. */
  const sinArchivo = new Set<string>()
  const aleatorio = crearAleatorio(Date.now() % 100000)
  let bufferRuido: AudioBuffer | null = null

  function contexto(): AudioContext | null {
    if (ctx || intentoContexto) return ctx
    intentoContexto = true
    ctx = deps.crearContexto()
    return ctx
  }

  function terminar(cancelada: boolean) {
    const p = pendiente
    if (!p) return
    pendiente = null
    p.limpiar()
    p.resolver({ fuente: p.fuente, cancelada })
  }

  function detener() {
    turno++
    deps.sintesis?.cancel()
    terminar(true)
  }

  // ─── Piezas de Web Audio ───────────────────────────────────────────────────

  function ruidoDeFondo(c: AudioContext, salida: AudioNode, p: ParametrosPerfil, desde: number) {
    if (!bufferRuido || bufferRuido.sampleRate !== c.sampleRate) {
      bufferRuido = c.createBuffer(1, Math.floor(c.sampleRate * 2), c.sampleRate)
      llenarRuidoRosa(bufferRuido.getChannelData(0), aleatorio)
    }
    const fuente = c.createBufferSource()
    fuente.buffer = bufferRuido
    fuente.loop = true
    const banda = c.createBiquadFilter()
    banda.type = "bandpass"
    banda.frequency.value = 1400
    banda.Q.value = 0.6
    const g = c.createGain()
    g.gain.setValueAtTime(0, desde)
    g.gain.linearRampToValueAtTime(p.ruido, desde + 0.03)
    fuente.connect(banda).connect(g).connect(salida)
    fuente.start(desde)
    return {
      parar: (en: number) => {
        g.gain.setValueAtTime(p.ruido, Math.max(desde, en - 0.03))
        g.gain.linearRampToValueAtTime(0, en)
        try {
          fuente.stop(en + 0.01)
        } catch {
          /* ya parado */
        }
      },
      cortar: () => {
        try {
          fuente.stop()
        } catch {
          /* ya parado */
        }
      },
    }
  }

  function squelch(c: AudioContext, salida: AudioNode, p: ParametrosPerfil, en: number, tipo: "apertura" | "cierre") {
    const dur = DURACION_SQUELCH[tipo]
    const b = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate)
    llenarSquelch(b.getChannelData(0), c.sampleRate, aleatorio, tipo)
    const f = c.createBufferSource()
    f.buffer = b
    const filtro = c.createBiquadFilter()
    filtro.type = "bandpass"
    filtro.frequency.value = 2000
    filtro.Q.value = 0.5
    const g = c.createGain()
    g.gain.value = p.squelch
    f.connect(filtro).connect(g).connect(salida)
    f.start(Math.max(en, c.currentTime))
    return f
  }

  /** Silbido de batido que sube y baja: dos portadoras que casi coinciden. */
  function interferencia(c: AudioContext, salida: AudioNode, p: ParametrosPerfil, desde: number, hasta: number) {
    const osc = c.createOscillator()
    osc.type = "sine"
    osc.frequency.value = 900 + aleatorio() * 600
    const lfo = c.createOscillator()
    lfo.frequency.value = 0.3 + aleatorio() * 0.5
    const prof = c.createGain()
    prof.gain.value = 180
    lfo.connect(prof).connect(osc.frequency)
    const g = c.createGain()
    g.gain.value = p.interferencia * 0.025
    osc.connect(g).connect(salida)
    osc.start(desde)
    lfo.start(desde)
    osc.stop(hasta)
    lfo.stop(hasta)
    return [osc, lfo]
  }

  function crearSalida(c: AudioContext): GainNode {
    const master = c.createGain()
    master.gain.value = 0.9
    master.connect(c.destination)
    return master
  }

  // ─── Con mp3 ───────────────────────────────────────────────────────────────

  function sonarBuffer(c: AudioContext, buffer: AudioBuffer, perfil: PerfilRadio, velocidad: number, miTurno: number) {
    const p = PERFILES[perfil]
    const master = crearSalida(c)
    const t0 = c.currentTime + 0.03
    const fondo = ruidoDeFondo(c, master, p, t0)
    const nodos: AudioScheduledSourceNode[] = [squelch(c, master, p, t0, "apertura")]

    const src = c.createBufferSource()
    src.buffer = buffer
    src.playbackRate.value = velocidad
    const alto = c.createBiquadFilter()
    alto.type = "highpass"
    alto.frequency.value = p.pasoAlto
    alto.Q.value = 0.7
    const bajo = c.createBiquadFilter()
    bajo.type = "lowpass"
    bajo.frequency.value = p.pasoBajo
    bajo.Q.value = 0.7
    // Un realce en la zona de presencia: la voz de radio es nasal y aguda.
    const presencia = c.createBiquadFilter()
    presencia.type = "peaking"
    presencia.frequency.value = 1800
    presencia.gain.value = 4
    presencia.Q.value = 1
    const satura = c.createWaveShaper()
    satura.curve = curvaDistorsion(p.distorsion)
    satura.oversample = "2x"
    const comp = c.createDynamicsCompressor()
    comp.threshold.value = -26
    comp.ratio.value = 8
    comp.attack.value = 0.003
    comp.release.value = 0.12
    const voz = c.createGain()
    voz.gain.value = p.voz
    src.connect(alto).connect(bajo).connect(presencia).connect(satura).connect(comp).connect(voz).connect(master)

    const inicioVoz = t0 + DURACION_SQUELCH.apertura * 0.8
    const duracion = buffer.duration / velocidad
    const finVoz = inicioVoz + duracion
    for (const corte of planDeCortes(duracion, p.cortes, aleatorio)) {
      const a = inicioVoz + corte.inicio
      voz.gain.setValueAtTime(p.voz, a)
      voz.gain.linearRampToValueAtTime(0.05, a + 0.01)
      voz.gain.setValueAtTime(0.05, a + corte.duracion)
      voz.gain.linearRampToValueAtTime(p.voz, a + corte.duracion + 0.01)
    }
    if (p.interferencia > 0) nodos.push(...interferencia(c, master, p, inicioVoz, finVoz))
    src.start(inicioVoz)
    nodos.push(src)
    nodos.push(squelch(c, master, p, finVoz + 0.02, "cierre"))
    const fin = finVoz + 0.02 + DURACION_SQUELCH.cierre
    fondo.parar(fin)

    return new Promise<ResultadoReproduccion>((resolver) => {
      const reloj = setTimeout(() => {
        if (turno === miTurno) terminar(false)
      }, Math.max(0, (fin - c.currentTime) * 1000) + 60)
      pendiente = {
        fuente: "audio",
        resolver,
        limpiar: () => {
          clearTimeout(reloj)
          for (const n of nodos) {
            try {
              n.stop()
            } catch {
              /* ya parado */
            }
          }
          fondo.cortar()
          // Desconectar tarde: cortar en seco con el nodo conectado da un clic.
          setTimeout(() => master.disconnect(), 80)
        },
      }
    })
  }

  // ─── Sin mp3: voz del navegador ────────────────────────────────────────────

  function sonarSintesis(tx: Transmision, perfil: PerfilRadio, velocidad: number, miTurno: number) {
    const sintesis = deps.sintesis
    const crear = deps.crearEnunciado
    if (!sintesis || !crear) return Promise.resolve<ResultadoReproduccion>({ fuente: "texto", cancelada: false })

    const c = contexto()
    const p = PERFILES[perfil]
    const master = c ? crearSalida(c) : null
    const fondo = c && master ? ruidoDeFondo(c, master, p, c.currentTime + 0.02) : null
    if (c && master) squelch(c, master, p, c.currentTime + 0.02, "apertura")

    const cfg = VOZ_SINTETICA[tx.voz]
    const u = crear(tx.texto)
    const v = elegirVoz(sintesis.getVoices(), tx.voz)
    if (v) u.voice = v
    u.lang = v?.lang ?? cfg.idiomas[0]
    u.rate = 0.95 * cfg.ritmo * velocidad
    u.pitch = cfg.tono

    return new Promise<ResultadoReproduccion>((resolver) => {
      let cola: ReturnType<typeof setTimeout> | undefined
      const alTerminar = () => {
        if (turno !== miTurno) return
        if (c && master && fondo) {
          const en = c.currentTime + 0.02
          squelch(c, master, p, en, "cierre")
          fondo.parar(en + DURACION_SQUELCH.cierre)
          cola = setTimeout(() => {
            if (turno === miTurno) terminar(false)
          }, (DURACION_SQUELCH.cierre + 0.05) * 1000)
        } else {
          terminar(false)
        }
      }
      pendiente = {
        fuente: "sintesis",
        resolver,
        limpiar: () => {
          clearTimeout(respaldo)
          clearTimeout(cola)
          fondo?.cortar()
          if (master) setTimeout(() => master.disconnect(), 80)
        },
      }
      u.onend = alTerminar
      u.onerror = alTerminar
      // Chrome a veces no dispara onend. Un tope por largo del texto evita que
      // el ejercicio se quede esperando para siempre.
      const palabras = tx.texto.split(/\s+/).length
      const respaldo = setTimeout(alTerminar, (palabras / (2.4 * velocidad) + 4) * 1000)
      // El squelch primero, la voz después: así suena como una radio que abre.
      setTimeout(
        () => {
          if (turno !== miTurno) return
          sintesis.cancel()
          sintesis.speak(u)
        },
        c ? DURACION_SQUELCH.apertura * 1000 : 0,
      )
    })
  }

  async function decodificar(c: AudioContext, datos: ArrayBuffer, id: string): Promise<AudioBuffer | null> {
    try {
      return await c.decodeAudioData(datos)
    } catch (e) {
      // El archivo existe pero no es un mp3 que el navegador entienda: se
      // sigue con la voz sintética, pero conviene saberlo al revisar audios.
      console.warn(`radio: no se pudo decodificar ${id}.mp3`, e)
      return null
    }
  }

  async function reproducir(tx: Transmision, opciones: OpcionesReproduccion = {}): Promise<ResultadoReproduccion> {
    detener()
    const miTurno = turno
    const perfil = opciones.perfil ?? tx.perfil
    const velocidad = opciones.velocidad ?? 1

    const c = contexto()
    if (c && c.state === "suspended") {
      try {
        await c.resume()
      } catch {
        /* sin permiso de audio: lo intentará la voz del navegador */
      }
    }

    let buffer = decodificados.get(tx.id) ?? null
    if (!buffer && c && !sinArchivo.has(tx.id)) {
      const datos = await cargarAudio(tx.id, deps)
      if (turno !== miTurno) return { fuente: "texto", cancelada: true }
      if (datos) buffer = await decodificar(c, datos, tx.id)
      if (buffer) decodificados.set(tx.id, buffer)
      else sinArchivo.add(tx.id)
    }
    if (turno !== miTurno) return { fuente: "texto", cancelada: true }

    if (buffer && c) return sonarBuffer(c, buffer, perfil, velocidad, miTurno)
    return sonarSintesis(tx, perfil, velocidad, miTurno)
  }

  function cerrar() {
    detener()
    const c = ctx
    ctx = null
    intentoContexto = false
    bufferRuido = null
    decodificados.clear()
    if (c && c.state !== "closed") void c.close().catch(() => undefined)
  }

  return { reproducir, detener, cerrar }
}
