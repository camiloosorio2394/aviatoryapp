/**
 * Señales generadas por código: ruido de fondo, squelch, curva de distorsión
 * y cortes. Nada viene de un archivo, así que no hay nada que descargar ni
 * ningún dominio que autorizar en la CSP.
 *
 * Son funciones puras sobre Float32Array para poder probarlas sin Web Audio.
 */

/** Generador pseudoaleatorio con semilla (mulberry32). Así el ruido se puede probar. */
export function crearAleatorio(semilla = 1): () => number {
  let a = semilla >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Ruido rosa (filtro de Paul Kellet). Suena a soplido de radio y no al siseo
 * fino del ruido blanco. Queda entre -1 y 1.
 */
export function llenarRuidoRosa(destino: Float32Array, aleatorio: () => number): Float32Array {
  let b0 = 0,
    b1 = 0,
    b2 = 0,
    b3 = 0,
    b4 = 0,
    b5 = 0,
    b6 = 0
  for (let i = 0; i < destino.length; i++) {
    const blanco = aleatorio() * 2 - 1
    b0 = 0.99886 * b0 + blanco * 0.0555179
    b1 = 0.99332 * b1 + blanco * 0.0750759
    b2 = 0.969 * b2 + blanco * 0.153852
    b3 = 0.8665 * b3 + blanco * 0.3104856
    b4 = 0.55 * b4 + blanco * 0.5329522
    b5 = -0.7616 * b5 - blanco * 0.016898
    const rosa = b0 + b1 + b2 + b3 + b4 + b5 + b6 + blanco * 0.5362
    b6 = blanco * 0.115926
    destino[i] = Math.max(-1, Math.min(1, rosa * 0.11))
  }
  return destino
}

/**
 * Clic y ráfaga de squelch. Al abrir: un clic seco y un soplido corto que
 * baja. Al cerrar: la «cola» de squelch, más larga y más fuerte, que es lo que
 * en la radio anuncia que la otra estación soltó el botón.
 */
export function llenarSquelch(
  destino: Float32Array,
  frecuenciaMuestreo: number,
  aleatorio: () => number,
  tipo: "apertura" | "cierre",
): Float32Array {
  const clic = Math.floor(frecuenciaMuestreo * 0.004)
  const caida = tipo === "apertura" ? 0.035 : 0.07
  for (let i = 0; i < destino.length; i++) {
    const t = i / frecuenciaMuestreo
    const ruido = aleatorio() * 2 - 1
    const env = Math.exp(-t / caida)
    const pico = i < clic ? (1 - i / clic) * (i % 2 === 0 ? 1 : -1) : 0
    destino[i] = Math.max(-1, Math.min(1, ruido * env * 0.8 + pico * 0.9))
  }
  return destino
}

/** Duración de la ráfaga de squelch, en segundos. */
export const DURACION_SQUELCH = { apertura: 0.12, cierre: 0.22 } as const

/**
 * Curva de saturación suave para el WaveShaper. `cantidad` de 0 (casi lineal)
 * a 1 (bastante sucia). Es impar y va de -1 a 1.
 */
export function curvaDistorsion(cantidad: number, muestras = 1024): Float32Array<ArrayBuffer> {
  const k = 1 + Math.max(0, Math.min(1, cantidad)) * 30
  const curva = new Float32Array(new ArrayBuffer(muestras * 4))
  const norma = Math.tanh(k)
  for (let i = 0; i < muestras; i++) {
    const x = (i * 2) / (muestras - 1) - 1
    curva[i] = Math.tanh(k * x) / norma
  }
  return curva
}

export interface Corte {
  /** Segundos desde que empieza la voz. */
  inicio: number
  duracion: number
}

/**
 * Dónde se corta la señal en una voz de `duracion` segundos. Cortes de 60 a
 * 180 ms, nunca en el primer medio segundo (el distintivo se tiene que oír).
 */
export function planDeCortes(duracion: number, cortesPorSegundo: number, aleatorio: () => number): Corte[] {
  if (cortesPorSegundo <= 0 || duracion <= 0.8) return []
  const cuantos = Math.floor(duracion * cortesPorSegundo)
  const cortes: Corte[] = []
  for (let i = 0; i < cuantos; i++) {
    const inicio = 0.5 + aleatorio() * (duracion - 0.8)
    cortes.push({ inicio, duracion: 0.06 + aleatorio() * 0.12 })
  }
  return cortes.sort((a, b) => a.inicio - b.inicio)
}
