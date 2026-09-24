/**
 * Práctica con audio del módulo Comunicaciones: los tipos de los diez
 * ejercicios y cómo se califica cada uno.
 *
 * Aquí no hay contenido: solo la forma de los datos y la corrección, que son
 * funciones puras (se prueban sin pantalla y sin audio). Los ítems viven en
 * otro archivo (hoy, los de ejemplo en `comunicacionesPracticaEjemplos.ts`) y
 * los componentes están en `components/comunicaciones/practica/`.
 *
 * Toda transmisión que suena es una `Transmision` del manifiesto
 * `contenido/audio/comunicaciones.json`: el id es el nombre del mp3.
 *
 * Cada ítem lleva `fuente`: el párrafo del documento del que sale la
 * fraseología (p. ej. «Doc 9432 2.8.3.7»). Lo que no es fraseología OACI va
 * rotulado como PLAIN LANGUAGE.
 */

import {
  campoCoincide,
  contieneFrase,
  normalizarCampo,
  normalizarHablado,
  type TipoCampo,
} from "@/lib/comunicacionesNormalizar"
import type { PerfilRadio, Transmision } from "@/lib/radio"

export type { PerfilRadio, Transmision, VozRadio } from "@/lib/radio"
export type { TipoCampo } from "@/lib/comunicacionesNormalizar"

/** Lo común a todos los ítems. */
export interface EjercicioBase {
  /** Único dentro de su tipo. Sirve de clave de progreso. */
  id: string
  /** Párrafo de origen, p. ej. «Doc 9432 7.3.1». */
  fuente: string
  /** Cuántas veces se puede volver a oír. Por defecto 2. «Say again» cuenta. */
  repeticiones?: number
}

/** Lo que un ejercicio le devuelve a quien lo contiene (el vuelo completo, la página). */
export interface ResultadoEjercicio {
  aciertos: number
  total: number
}

export function porcentaje(r: ResultadoEjercicio): number {
  return r.total > 0 ? Math.round((r.aciertos / r.total) * 100) : 0
}

// ─── 1. Copia la autorización ────────────────────────────────────────────────

export interface CampoCopia {
  id: string
  /** Lo que ve el piloto sobre la casilla: «Límite», «Nivel», «Squawk»… */
  etiqueta: string
  tipo: TipoCampo
  esperado: string
  /** Otras formas válidas que la normalización no cubre (p. ej. «WCK3»). */
  alternativas?: string[]
  /** Pista de formato en la casilla, p. ej. «FL280». */
  ayuda?: string
}

export interface EjCopia extends EjercicioBase {
  tipo: "copia"
  transmision: Transmision
  campos: CampoCopia[]
  explicacion: string
}

export interface ResultadoCampo {
  id: string
  ok: boolean
  esperado: string
  dado: string
}

export function calificarCopia(ej: EjCopia, respuestas: Record<string, string>): ResultadoCampo[] {
  return ej.campos.map((c) => {
    const dado = respuestas[c.id] ?? ""
    return { id: c.id, ok: campoCoincide(c.tipo, dado, c.esperado, c.alternativas), esperado: c.esperado, dado }
  })
}

// ─── 2. Readback con la voz ──────────────────────────────────────────────────

/** Un elemento que la colación tiene que llevar (Doc 9432 2.8.3.5 y 2.8.3.7). */
export interface ElementoCritico {
  id: string
  /** «Nivel», «QNH», «Distintivo»… */
  etiqueta: string
  tipo: TipoCampo
  /** Cómo se dice o escribe; se normaliza igual que lo del piloto. */
  valor: string
  alternativas?: string[]
}

export interface EjReadback extends EjercicioBase {
  tipo: "readback"
  transmision: Transmision
  elementos: ElementoCritico[]
  /** La colación modelo, para mostrar al final. */
  modelo: string
  explicacion: string
}

export interface ResultadoReadback {
  presentes: string[]
  faltan: string[]
}

/**
 * ¿Está el elemento en lo que dijo el piloto? Los numéricos se buscan como
 * valor (240 vale igual dicho «two four zero» o «240»); los de texto, como
 * frase dentro de la colación.
 */
export function elementoPresente(dicho: string, el: ElementoCritico): boolean {
  const n = normalizarHablado(dicho)
  const valores = [el.valor, ...(el.alternativas ?? [])]
  const numerico = ["nivel", "altitud", "rumbo", "frecuencia", "squawk", "qnh", "velocidad"].includes(el.tipo)
  if (numerico) {
    const esperados = valores.map((v) => normalizarCampo(el.tipo, v)).filter((v): v is string => v !== null)
    const fichas = n.split(" ")
    return fichas.some((f) => /^\d/.test(f) && esperados.includes(normalizarCampo(el.tipo, f) ?? ""))
  }
  if (el.tipo === "pista") {
    const esperados = valores.map((v) => normalizarCampo("pista", v))
    const fichas = n.split(" ")
    return fichas.some((f, i) => /^\d/.test(f) && esperados.includes(normalizarCampo("pista", fichas.slice(i, i + 2).join(" "))))
  }
  return valores.some((v) => contieneFrase(n, normalizarHablado(v)))
}

export function calificarReadback(ej: EjReadback, dicho: string): ResultadoReadback {
  const presentes: string[] = []
  const faltan: string[] = []
  for (const el of ej.elementos) (elementoPresente(dicho, el) ? presentes : faltan).push(el.id)
  return { presentes, faltan }
}

// ─── 3. ¿Es para mí? ─────────────────────────────────────────────────────────

export interface EjEsParaMi extends EjercicioBase {
  tipo: "esParaMi"
  /** Tu distintivo, tal como se escribe: «AVIATORY 452». */
  distintivo: string
  transmisiones: { transmision: Transmision; paraMi: boolean }[]
  explicacion: string
}

export interface ResultadoEsParaMi {
  aciertos: number
  omisiones: number
  falsasAlarmas: number
  /** Correctos entre todas las decisiones (marcar o dejar pasar). */
  correctas: number
  total: number
}

export function calificarEsParaMi(ej: EjEsParaMi, marcadas: readonly number[]): ResultadoEsParaMi {
  let aciertos = 0
  let omisiones = 0
  let falsasAlarmas = 0
  ej.transmisiones.forEach((t, i) => {
    const marcada = marcadas.includes(i)
    if (t.paraMi && marcada) aciertos++
    else if (t.paraMi && !marcada) omisiones++
    else if (!t.paraMi && marcada) falsasAlarmas++
  })
  const total = ej.transmisiones.length
  return { aciertos, omisiones, falsasAlarmas, correctas: total - omisiones - falsasAlarmas, total }
}

// ─── 4. Hearback: tú eres el PM ──────────────────────────────────────────────

export interface EjHearback extends EjercicioBase {
  tipo: "hearback"
  instruccion: Transmision
  /** La colación del compañero (voz `piloto_pm`). */
  colacion: Transmision
  /** Los elementos de la colación que se pueden señalar. */
  elementos: { id: string; etiqueta: string }[]
  /** Null si la colación está bien; si no, el id del elemento equivocado. */
  error: string | null
  explicacion: string
}

/** «correcto» o el id del elemento que el piloto señala como erróneo. */
export type RespuestaHearback = "correcto" | string

export function calificarHearback(ej: EjHearback, respuesta: RespuestaHearback): boolean {
  return ej.error === null ? respuesta === "correcto" : respuesta === ej.error
}

// ─── 5. ¿Qué respondes? ──────────────────────────────────────────────────────

export interface EjQueRespondes extends EjercicioBase {
  tipo: "queRespondes"
  /** Lo que pasa a bordo, en español, para decidir la respuesta. */
  situacion: string
  transmision: Transmision
  opciones: string[]
  correcta: number
  explicacion: string
}

export function calificarQueRespondes(ej: EjQueRespondes, elegida: number): boolean {
  return elegida === ej.correcta
}

// ─── 6. Desármala ────────────────────────────────────────────────────────────

export type CategoriaDesarme = "distintivo" | "accion" | "valor" | "condicion" | "siguiente"

export const CATEGORIAS_DESARME: { id: CategoriaDesarme; etiqueta: string }[] = [
  { id: "distintivo", etiqueta: "CALL SIGN" },
  { id: "accion", etiqueta: "ACCIÓN" },
  { id: "valor", etiqueta: "VALOR" },
  { id: "condicion", etiqueta: "CONDICIÓN" },
  { id: "siguiente", etiqueta: "SIGUIENTE ACCIÓN" },
]

export interface EjDesarmala extends EjercicioBase {
  tipo: "desarmala"
  transmision: Transmision
  fichas: { id: string; texto: string; categoria: CategoriaDesarme }[]
  explicacion: string
}

export function calificarDesarmala(
  ej: EjDesarmala,
  asignacion: Record<string, CategoriaDesarme | undefined>,
): { id: string; ok: boolean }[] {
  return ej.fichas.map((f) => ({ id: f.id, ok: asignacion[f.id] === f.categoria }))
}

// ─── 7. Panel de cabina ──────────────────────────────────────────────────────

export type ControlPanel = "hdg" | "alt" | "spd" | "vs"

export interface ValoresPanel {
  hdg: number
  /** En pies. FL240 es 24000. */
  alt: number
  spd: number
  vs: number
}

export interface EjPanel extends EjercicioBase {
  tipo: "panel"
  transmision: Transmision
  inicial: ValoresPanel
  /** Solo se revisa lo que viene aquí. Lo demás se puede tocar sin castigo. */
  objetivo: Partial<ValoresPanel>
  /** Si el panel muestra V/S. */
  conVs?: boolean
  /** Si la altitud se muestra como nivel de vuelo (FL240) y no en pies. */
  altEnNivel?: boolean
  explicacion: string
}

/** Paso y límites de cada perilla. Rumbo circular de 1 a 360. */
export const PERILLAS: Record<ControlPanel, { min: number; max: number; paso: number; pasoGrande: number; etiqueta: string; unidad: string }> = {
  hdg: { min: 1, max: 360, paso: 1, pasoGrande: 10, etiqueta: "HDG", unidad: "°" },
  alt: { min: 0, max: 45000, paso: 100, pasoGrande: 1000, etiqueta: "ALT", unidad: "ft" },
  spd: { min: 100, max: 350, paso: 1, pasoGrande: 10, etiqueta: "SPD", unidad: "kt" },
  vs: { min: -6000, max: 6000, paso: 100, pasoGrande: 500, etiqueta: "V/S", unidad: "ft/min" },
}

/** Mueve una perilla respetando sus límites; el rumbo da la vuelta (360 → 1). */
export function moverPerilla(control: ControlPanel, valor: number, delta: number): number {
  const p = PERILLAS[control]
  if (control === "hdg") {
    const v = (((valor - 1 + delta) % 360) + 360) % 360
    return v + 1
  }
  return Math.max(p.min, Math.min(p.max, valor + delta))
}

export function calificarPanel(ej: EjPanel, valores: ValoresPanel): { control: ControlPanel; ok: boolean; esperado: number; dado: number }[] {
  return (Object.keys(ej.objetivo) as ControlPanel[]).map((control) => {
    const esperado = ej.objetivo[control] as number
    const dado = valores[control]
    const ok = control === "hdg" ? ((dado % 360) || 360) === ((esperado % 360) || 360) : dado === esperado
    return { control, ok, esperado, dado }
  })
}

/** Cómo se muestra la altitud: FL por encima de 10 000 ft si el ítem lo pide. */
export function textoAltitud(pies: number, comoNivel: boolean): string {
  return comoNivel ? `FL${String(Math.round(pies / 100)).padStart(3, "0")}` : `${pies}`
}

// ─── 8. Ráfaga de números ────────────────────────────────────────────────────

export type TipoDictado = "squawk" | "frecuencia" | "qnh" | "matricula" | "rumbo" | "pista" | "nivel"

export interface Dictado {
  id: string
  tipo: TipoDictado
  transmision: Transmision
  esperado: string
}

export interface EjRafaga extends EjercicioBase {
  tipo: "rafaga"
  dictados: Dictado[]
  /** Segundos para escribir cada uno, contados desde que termina de sonar. */
  segundos: number
  explicacion: string
}

const TIPO_CAMPO_DICTADO: Record<TipoDictado, TipoCampo> = {
  squawk: "squawk",
  frecuencia: "frecuencia",
  qnh: "qnh",
  matricula: "texto",
  rumbo: "rumbo",
  pista: "pista",
  nivel: "nivel",
}

export function calificarDictado(d: Dictado, respuesta: string, segundosUsados: number, limite: number): { ok: boolean; aTiempo: boolean } {
  const aTiempo = segundosUsados <= limite
  // Matrícula: «G-ABCD», «gabcd» y «golf alfa bravo charlie delta» valen lo mismo.
  const ok = campoCoincide(TIPO_CAMPO_DICTADO[d.tipo], respuesta, d.esperado)
  return { ok: ok && aTiempo, aTiempo }
}

// ─── 9. ¿Estándar o plain? ───────────────────────────────────────────────────

export type BloquePlain = "problema" | "capacidad" | "necesidad" | "intencion"

export const BLOQUES_PLAIN: { id: BloquePlain; etiqueta: string; pregunta: string }[] = [
  { id: "problema", etiqueta: "Problema", pregunta: "Qué pasa" },
  { id: "capacidad", etiqueta: "Capacidad", pregunta: "Qué puedes hacer todavía" },
  { id: "necesidad", etiqueta: "Necesidad", pregunta: "Qué necesitas del ATC" },
  { id: "intencion", etiqueta: "Intención", pregunta: "Qué vas a hacer" },
]

export interface EjEstandarOPlain extends EjercicioBase {
  tipo: "estandarOPlain"
  situacion: string
  /** La transmisión que abre la situación, si la hay. */
  transmision?: Transmision
  clasificacion: "fraseologia" | "plain"
  /** Si es fraseología: la frase OACI que corresponde. */
  frase?: string
  /** Si es plain: por bloque, las frases a elegir y cuál es la buena. */
  bloques?: Partial<Record<BloquePlain, { opciones: string[]; correcta: number }>>
  explicacion: string
}

export function calificarEstandarOPlain(
  ej: EjEstandarOPlain,
  clasificacion: "fraseologia" | "plain",
  elegidas: Partial<Record<BloquePlain, number>>,
): { clasificacionOk: boolean; bloques: { id: BloquePlain; ok: boolean }[]; aciertos: number; total: number } {
  const clasificacionOk = clasificacion === ej.clasificacion
  const bloques =
    ej.clasificacion === "plain" && ej.bloques
      ? (Object.keys(ej.bloques) as BloquePlain[]).map((id) => ({ id, ok: elegidas[id] === ej.bloques?.[id]?.correcta }))
      : []
  const aciertos = (clasificacionOk ? 1 : 0) + bloques.filter((b) => b.ok).length
  return { clasificacionOk, bloques, aciertos, total: 1 + bloques.length }
}

// ─── 10. Vuelo completo ──────────────────────────────────────────────────────

export type EjercicioSimple =
  | EjCopia
  | EjReadback
  | EjEsParaMi
  | EjHearback
  | EjQueRespondes
  | EjDesarmala
  | EjPanel
  | EjRafaga
  | EjEstandarOPlain

export interface PasoVuelo {
  /** Fase del vuelo, para la pantalla: «Autorización», «Rodaje»… */
  fase: string
  ejercicio: EjercicioSimple
  /** La radio de este tramo. Sube a lo largo del vuelo. */
  perfil: PerfilRadio
}

export interface EjVueloCompleto extends EjercicioBase {
  tipo: "vueloCompleto"
  titulo: string
  pasos: PasoVuelo[]
  explicacion: string
}

/** Cuántas transmisiones suenan en un ejercicio. El vuelo completo va de 15 a 20. */
export function transmisionesDe(ej: EjercicioSimple): Transmision[] {
  switch (ej.tipo) {
    case "copia":
    case "readback":
    case "queRespondes":
    case "desarmala":
    case "panel":
      return [ej.transmision]
    case "esParaMi":
      return ej.transmisiones.map((t) => t.transmision)
    case "hearback":
      return [ej.instruccion, ej.colacion]
    case "rafaga":
      return ej.dictados.map((d) => d.transmision)
    case "estandarOPlain":
      return ej.transmision ? [ej.transmision] : []
  }
}

/** Puntaje final del vuelo: aciertos sobre total de todos los pasos. */
export function puntajeVuelo(resultados: readonly (ResultadoEjercicio | undefined)[]): ResultadoEjercicio & { porcentaje: number } {
  let aciertos = 0
  let total = 0
  for (const r of resultados) {
    if (!r) continue
    aciertos += r.aciertos
    total += r.total
  }
  return { aciertos, total, porcentaje: porcentaje({ aciertos, total }) }
}

export type EjercicioComunicaciones = EjercicioSimple | EjVueloCompleto

/** Clave de progreso de un ítem, para el catálogo y la base. Nunca a mano. */
export function claveEjercicioCm(ej: Pick<EjercicioComunicaciones, "tipo" | "id">): string {
  return `cm-${ej.tipo}-${ej.id}`
}
