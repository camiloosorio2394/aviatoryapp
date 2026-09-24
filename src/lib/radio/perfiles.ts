import type { PerfilRadio } from "./tipos"

/**
 * Cómo suena cada perfil. Todo se aplica en vivo sobre el mp3 (o alrededor de
 * la voz sintética), así que un mismo audio sirve para los tres.
 *
 * La banda de 300 a 3400 Hz es la de la voz en un canal de radiotelefonía:
 * lo que queda fuera es lo que la radio de a bordo no deja pasar. «Sucia»
 * estrecha la banda, sube el ruido y agrega un silbido de batido y cortes
 * breves, que es lo que hace que un número se pierda.
 */
export interface ParametrosPerfil {
  /** Corte del pasa altos, Hz. */
  pasoAlto: number
  /** Corte del pasa bajos, Hz. */
  pasoBajo: number
  /** Ganancia del ruido de fondo (0 a 1). */
  ruido: number
  /** Cuánto satura la distorsión (0 a 1). */
  distorsion: number
  /** Volumen del silbido de batido (0 a 1). 0 lo apaga. */
  interferencia: number
  /** Cortes de señal por segundo de voz. 0 no corta. */
  cortes: number
  /** Volumen del clic y la ráfaga de squelch. */
  squelch: number
  /** Volumen de la voz tras la cadena. */
  voz: number
}

export const PERFILES: Record<PerfilRadio, ParametrosPerfil> = {
  limpia: {
    pasoAlto: 300,
    pasoBajo: 3400,
    ruido: 0.012,
    distorsion: 0.12,
    interferencia: 0,
    cortes: 0,
    squelch: 0.1,
    voz: 1,
  },
  normal: {
    pasoAlto: 320,
    pasoBajo: 3200,
    ruido: 0.035,
    distorsion: 0.32,
    interferencia: 0,
    cortes: 0,
    squelch: 0.16,
    voz: 0.95,
  },
  sucia: {
    pasoAlto: 400,
    pasoBajo: 2800,
    ruido: 0.085,
    distorsion: 0.6,
    interferencia: 0.35,
    cortes: 0.22,
    squelch: 0.22,
    voz: 0.9,
  },
}

/** Nombre para la pantalla. */
export const NOMBRE_PERFIL: Record<PerfilRadio, string> = {
  limpia: "Radio limpia",
  normal: "Radio normal",
  sucia: "Radio con interferencia",
}

/** Las velocidades que ofrece la práctica. En examen no se muestran. */
export const VELOCIDADES = [0.85, 1, 1.15] as const
