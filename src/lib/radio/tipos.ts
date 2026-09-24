/**
 * Tipos del reproductor de radio de Comunicaciones.
 *
 * Una transmisión es una línea de guion con su audio: el id es también el
 * nombre del archivo (`public/modulos/comunicaciones/audio/<id>.mp3`) y la
 * entrada del manifiesto `contenido/audio/comunicaciones.json`.
 */

/** Quién habla. Decide la voz del mp3 y, sin mp3, la voz sintética. */
export type VozRadio = "atc_latam" | "atc_uk" | "atc_us" | "piloto" | "piloto_pm"

/** Qué tan mala está la radio. */
export type PerfilRadio = "limpia" | "normal" | "sucia"

export const VOCES_RADIO: readonly VozRadio[] = ["atc_latam", "atc_uk", "atc_us", "piloto", "piloto_pm"]
export const PERFILES_RADIO: readonly PerfilRadio[] = ["limpia", "normal", "sucia"]

export interface Transmision {
  /** Minúsculas, cifras y guiones. Es el nombre del mp3. */
  id: string
  /** Lo que se dice, en inglés, con los números en palabras como se transmiten. */
  texto: string
  voz: VozRadio
  /** Perfil por defecto. Un ejercicio o el vuelo completo lo pueden cambiar. */
  perfil: PerfilRadio
}

/**
 * De dónde salió lo que sonó:
 *   audio    → el mp3 grabado, con el efecto de radio en vivo
 *   sintesis → no hay mp3; habló la voz del navegador con ruido alrededor
 *   texto    → ni mp3 ni voz del navegador: la pantalla muestra el texto
 */
export type FuenteAudio = "audio" | "sintesis" | "texto"

export interface ResultadoReproduccion {
  fuente: FuenteAudio
  /** Se cortó antes de terminar (otra reproducción, detener o salir). */
  cancelada: boolean
}

export interface OpcionesReproduccion {
  /** Si no viene, el de la transmisión. */
  perfil?: PerfilRadio
  /** 1 es normal. En modo examen siempre 1. */
  velocidad?: number
}
