import { useCallback, useEffect, useRef, useState } from "react"
import {
  crearReproductorRadio,
  type FuenteAudio,
  type PerfilRadio,
  type ReproductorRadio,
  type Transmision,
} from "@/lib/radio"

/**
 * El reproductor de radio para una pantalla de práctica.
 *
 * Lleva la cuenta de las repeticiones: la primera vez que suena una
 * transmisión (o una secuencia) es gratis; cada vez que vuelve a sonar cuenta,
 * que es lo que en la radio es pedir «say again». Con el límite agotado, ya
 * no suena más y el ejercicio se resuelve con lo que se oyó.
 *
 * En modo examen la velocidad queda fija en 1: se practica a la velocidad a la
 * que habla el controlador.
 *
 * El AudioContext nace en el primer `escuchar()`, que siempre viene de un
 * toque del piloto: así el navegador no lo bloquea por autoplay.
 */

export interface OpcionesRadio {
  /** Cuántas veces se puede volver a oír. Infinity sin límite. Por defecto 2. */
  limiteRepeticiones?: number
  modoExamen?: boolean
  /** Fuerza el perfil de todas las transmisiones (el vuelo completo lo sube por tramos). */
  perfil?: PerfilRadio
  /** Para pruebas. */
  reproductor?: ReproductorRadio
}

export interface OpcionesEscucha {
  /** Pausa entre transmisiones de una secuencia, en ms. Por defecto 700. */
  pausaMs?: number
  /** Avisa qué transmisión de la secuencia empieza a sonar. */
  alEmpezar?: (indice: number) => void
  /** Si es true, no cuenta como repetición aunque ya haya sonado. */
  gratis?: boolean
}

export interface EstadoRadio {
  sonando: boolean
  /** Índice de la transmisión que suena dentro de la secuencia, o null. */
  sonandoIndice: number | null
  /** De dónde salió lo último que sonó. */
  fuente: FuenteAudio | null
  repeticionesUsadas: number
  /** Null si no hay límite. */
  repeticionesRestantes: number | null
  /** Si lo que se escuchó ya se puede volver a oír. */
  puedeRepetir: boolean
  velocidad: number
  setVelocidad: (v: number) => void
  velocidadBloqueada: boolean
  /** Si esta secuencia ya sonó una vez. */
  yaSono: (txs: Transmision | Transmision[]) => boolean
  /**
   * Hace sonar una transmisión o una secuencia. Devuelve la fuente de la
   * última, o null si no sonó (límite agotado o cortada).
   */
  escuchar: (txs: Transmision | Transmision[], opciones?: OpcionesEscucha) => Promise<FuenteAudio | null>
  detener: () => void
  /** Contador a cero, para una transmisión nueva sin remontar el ejercicio. */
  reiniciar: () => void
}

function claveDe(txs: Transmision[]): string {
  return txs.map((t) => t.id).join("|")
}

const esperar = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function useRadio(opciones: OpcionesRadio = {}): EstadoRadio {
  const { limiteRepeticiones = 2, modoExamen = false, perfil, reproductor } = opciones
  const [sonando, setSonando] = useState(false)
  const [sonandoIndice, setSonandoIndice] = useState<number | null>(null)
  const [fuente, setFuente] = useState<FuenteAudio | null>(null)
  const [usadas, setUsadas] = useState(0)
  const [oidas, setOidas] = useState<string[]>([])
  const [velocidadElegida, setVelocidadElegida] = useState(1)

  const rep = useRef<ReproductorRadio | null>(reproductor ?? null)
  const vivo = useRef(true)
  const secuencia = useRef(0)

  useEffect(() => {
    vivo.current = true
    const secuenciaActual = secuencia
    const reproductorActual = rep
    return () => {
      vivo.current = false
      // Corta cualquier secuencia en curso: sus pasos pendientes ya no suenan.
      secuenciaActual.current++
      reproductorActual.current?.cerrar()
    }
  }, [])

  const velocidad = modoExamen ? 1 : velocidadElegida
  const restantes = Number.isFinite(limiteRepeticiones) ? Math.max(0, limiteRepeticiones - usadas) : null
  const puedeRepetir = restantes === null || restantes > 0

  const yaSono = useCallback(
    (txs: Transmision | Transmision[]) => oidas.includes(claveDe(Array.isArray(txs) ? txs : [txs])),
    [oidas],
  )

  const detener = useCallback(() => {
    secuencia.current++
    rep.current?.detener()
    setSonando(false)
    setSonandoIndice(null)
  }, [])

  const escuchar = useCallback(
    async (entrada: Transmision | Transmision[], op: OpcionesEscucha = {}): Promise<FuenteAudio | null> => {
      const txs = Array.isArray(entrada) ? entrada : [entrada]
      if (txs.length === 0) return null
      const clave = claveDe(txs)
      const repite = oidas.includes(clave) && !op.gratis
      if (repite && !puedeRepetir) return null
      if (repite) setUsadas((n) => n + 1)
      else if (!oidas.includes(clave)) setOidas((o) => [...o, clave])

      if (!rep.current) rep.current = crearReproductorRadio()
      const r = rep.current
      const miSecuencia = ++secuencia.current
      setSonando(true)
      let ultima: FuenteAudio | null = null
      for (let i = 0; i < txs.length; i++) {
        if (secuencia.current !== miSecuencia) return null
        setSonandoIndice(i)
        op.alEmpezar?.(i)
        const res = await r.reproducir(txs[i], { perfil: perfil ?? txs[i].perfil, velocidad })
        if (!vivo.current) return null
        if (res.cancelada) return null
        ultima = res.fuente
        setFuente(res.fuente)
        if (i < txs.length - 1) await esperar(op.pausaMs ?? 700)
      }
      if (secuencia.current === miSecuencia && vivo.current) {
        setSonando(false)
        setSonandoIndice(null)
      }
      return ultima
    },
    [oidas, puedeRepetir, perfil, velocidad],
  )

  const reiniciar = useCallback(() => {
    setUsadas(0)
    setOidas([])
  }, [])

  const setVelocidad = useCallback(
    (v: number) => {
      if (!modoExamen) setVelocidadElegida(v)
    },
    [modoExamen],
  )

  return {
    sonando,
    sonandoIndice,
    fuente,
    repeticionesUsadas: usadas,
    repeticionesRestantes: restantes,
    puedeRepetir,
    velocidad,
    setVelocidad,
    velocidadBloqueada: modoExamen,
    yaSono,
    escuchar,
    detener,
    reiniciar,
  }
}
