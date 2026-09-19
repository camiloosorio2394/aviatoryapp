import { PSICO_HUB } from "@/lib/psicotecnicas"
import type { PilotStage } from "@/services/ruta"

/**
 * Constantes de Mi ruta: el orden de las etapas y qué herramienta de la app
 * ayuda a cumplir cada paso de las listas.
 */

/** Las etapas de la carrera, en el orden en que se recorren. */
export const ORDEN_DE_ETAPAS: readonly PilotStage[] = [
  "student_ppl",
  "ppl",
  "cpl_in_progress",
  "cpl_ready",
  "hour_building",
  "instructor",
  "airline_candidate",
]

/** Una pantalla de la app que ayuda a cumplir un paso de la ruta. */
export interface Herramienta {
  to: string
  /** Como se llama en la barra lateral, para que se reconozca. */
  nombre: string
  /** El verbo del botón del hero: lo que el piloto va a hacer allí. */
  verbo: string
}

const LOGBOOK: Herramienta = { to: "/app/logbook", nombre: "Logbook", verbo: "Registrar horas" }
const VENCIMIENTOS: Herramienta = { to: "/app/vencimientos", nombre: "Vencimientos", verbo: "Cargar el médico" }
const EXAMENES: Herramienta = { to: "/app/examenes", nombre: "Qué cayó en el examen", verbo: "Ver qué cae" }
const PCA: Herramienta = { to: "/app/pca", nombre: "Examen PCA", verbo: "Practicar en el PCA" }
const ICAO: Herramienta = { to: "/app/icao", nombre: "Inglés ICAO", verbo: "Practicar inglés" }
const SIMULACRO: Herramienta = {
  to: "/app/aerolinea/simulacro",
  nombre: "Simulacro de entrevista",
  verbo: "Hacer el simulacro",
}
const PSICOTECNICAS: Herramienta = { to: PSICO_HUB, nombre: "Psicotécnicas", verbo: "Entrenar" }
const MATCH: Herramienta = { to: "/app/match", nombre: "Para cuál calificas", verbo: "Ver para cuál calificas" }

/**
 * La herramienta de cada paso, por la `key` de `checklist_items`.
 *
 * Solo donde la app ayuda de verdad: los exámenes del PPL van a lo que
 * reportan los pilotos y no al banco del PCA, que es el del comercial. Un paso
 * que no está aquí (una habilitación, la foto, el plan financiero) no lleva
 * enlace, y una clave que cambie en la base solo pierde el suyo.
 */
export const HERRAMIENTA_DEL_PASO: Readonly<Record<string, Herramienta>> = {
  // Salud: el certificado médico se vigila en vencimientos.
  med_class2: VENCIMIENTOS,
  keep_med: VENCIMIENTOS,
  med_class1: VENCIMIENTOS,
  med_class1_ok: VENCIMIENTOS,
  // Horas: todas salen del logbook.
  hours_40: LOGBOOK,
  solo_10: LOGBOOK,
  xc_5: LOGBOOK,
  hours_log: LOGBOOK,
  hours_200: LOGBOOK,
  hours_pic_50: LOGBOOK,
  hours_xc_20: LOGBOOK,
  hours_night: LOGBOOK,
  hours_inst: LOGBOOK,
  hours_total_500: LOGBOOK,
  hours_pic_100: LOGBOOK,
  // Teoría del PPL.
  exam_meteo: EXAMENES,
  exam_regl: EXAMENES,
  exam_nav: EXAMENES,
  exam_motores: EXAMENES,
  // Teoría del CPL: el banco oficial del Piloto Comercial.
  exam_cpl_meteo: PCA,
  exam_cpl_regl: PCA,
  exam_cpl_nav: PCA,
  exam_cpl_others: PCA,
  // Inglés.
  icao_start: ICAO,
  icao_4: ICAO,
  icao_5: ICAO,
  // Selección.
  interview_prep: SIMULACRO,
  interview_tech: SIMULACRO,
  compass: PSICOTECNICAS,
  apply_avianca: MATCH,
  apply_latam: MATCH,
  apply_copa: MATCH,
  apply_wingo: MATCH,
  first_apply: MATCH,
}

/** La categoría del paso que cierra cada lista: la licencia, la oferta. */
export const CATEGORIA_HITO = "Hito"
