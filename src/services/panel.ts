/**
 * Datos del Dashboard en dos llamadas
 * (supabase/migrations/20260911210250_panel_en_dos_llamadas.sql):
 * - `panel_inicio()`: lo que necesita el encabezado para pintarse.
 * - `panel_tarjetas()`: el resto, que carga después con su esqueleto.
 *
 * Antes eran 16 peticiones. La forma de lo que llega se valida aquí: si la base
 * y la app se desalinean, falla con un error en vez de pintar tarjetas vacías.
 */

import { supabase } from "@/integrations/supabase/client"
import { armarSerieHeatmap } from "@/lib/activity"
import { MODULOS_AEROLINEA, type ClaveModulo } from "@/lib/modulosAerolinea"
import type { PlanDeEstudio } from "@/services/planDeEstudio"

/** Una postulación que todavía espera respuesta, como la cuenta el panel. */
export interface PostulacionAbierta {
  aerolinea: string
  estado: "postulada" | "en_proceso"
  dias: number
}
import type {
  Achievement,
  ActivityDay,
  DailyQuizQuestion,
  LicenseRow,
  NotamResumen,
  PcaReadiness,
  Peer,
  PilotState,
  Profile,
  Streak,
  SubjectMastery,
  Subscription,
} from "@/components/dashboard/tipos"

export interface InicioPanel {
  perfil: Profile | null
  piloto: PilotState | null
  racha: Streak | null
  suscripcion: Subscription | null
  quizzesCompletados: number
}

export interface TarjetasPanel {
  /** La colección completa, en orden. */
  logros: Achievement[]
  /** Los desbloqueados, del más reciente al más viejo, con su fecha. */
  desbloqueados: Achievement[]
  /** Serie del heatmap, desde el lunes de hace 11 semanas, con ceros. */
  actividad: ActivityDay[]
  companeros: Peer[]
  quizDiario: DailyQuizQuestion[]
  dominio: SubjectMastery[]
  /**
   * Los módulos de Ingreso a aerolínea, por clave. `null` en uno significa que
   * el piloto no lo ha tocado, y la tarjeta lo dice; no es un cero.
   *
   * Se recorren desde `MODULOS_AEROLINEA` y no uno por uno: así, cuando entra
   * un módulo nuevo, el servicio no se queda corto sin que nadie lo note.
   */
  modulos: Record<ClaveModulo, NotamResumen | null>
  /** Qué días dijo que iba a estudiar. `null` si no se lo ha puesto. */
  plan: PlanDeEstudio | null
  /** Las postulaciones que siguen esperando respuesta, de la más vieja. */
  postulaciones: PostulacionAbierta[]
  licencias: LicenseRow[]
  preparacion: PcaReadiness | null
}

type Crudo = Record<string, unknown>

function objeto(v: unknown, campo: string): Crudo {
  if (typeof v !== "object" || v === null || Array.isArray(v)) throw new Error(`panel: ${campo} no es un objeto`)
  return v as Crudo
}

function objetoONulo<T>(v: unknown, campo: string): T | null {
  return v === null || v === undefined ? null : (objeto(v, campo) as T)
}

function lista<T>(v: unknown, campo: string): T[] {
  if (!Array.isArray(v)) throw new Error(`panel: ${campo} no es una lista`)
  return v as T[]
}

function entero(v: unknown, campo: string): number {
  if (typeof v !== "number" || !Number.isInteger(v)) throw new Error(`panel: ${campo} no es un entero`)
  return v
}

export function leerInicioPanel(datos: unknown): InicioPanel {
  const d = objeto(datos, "panel_inicio")
  return {
    perfil: objetoONulo<Profile>(d.perfil, "perfil"),
    piloto: objetoONulo<PilotState>(d.piloto, "piloto"),
    racha: objetoONulo<Streak>(d.racha, "racha"),
    suscripcion: objetoONulo<Subscription>(d.suscripcion, "suscripcion"),
    quizzesCompletados: entero(d.quizzes_completados, "quizzes_completados"),
  }
}

type LogroCrudo = Achievement & { unlocked_at: string | null }

export function leerTarjetasPanel(datos: unknown, hoy = new Date()): TarjetasPanel {
  const d = objeto(datos, "panel_tarjetas")

  const logrosCrudos = lista<LogroCrudo>(d.logros, "logros")
  // La colección no lleva fecha: la fecha es de los desbloqueados.
  const logros: Achievement[] = logrosCrudos.map((l) => ({
    id: l.id,
    code: l.code,
    name: l.name,
    description: l.description,
    icon: l.icon,
    tier: l.tier,
  }))
  const desbloqueados = logrosCrudos
    .filter((l): l is LogroCrudo & { unlocked_at: string } => typeof l.unlocked_at === "string")
    .sort((a, b) => Date.parse(b.unlocked_at) - Date.parse(a.unlocked_at))

  /**
   * Los módulos vienen todos con la misma forma, así que se leen igual.
   *
   * Un módulo que no viene se lee como «sin avance» y no como error: si el
   * cliente sale antes que la migración que lo agregó, el panel muestra el
   * módulo sin empezar en vez de caerse entero. Lo que sí viene se valida
   * igual de estricto que todo lo demás.
   */
  /** El plan viene con la forma de la tabla; se deja en la del servicio. */
  const leerPlan = (v: unknown): PlanDeEstudio | null => {
    if (v === null || v === undefined) return null
    const p = objeto(v, "plan") as { dias: number[]; hora: string; zona: string; minutos_meta: number }
    return { dias: p.dias, hora: p.hora.slice(0, 5), zona: p.zona, minutosMeta: p.minutos_meta }
  }

  const moduloResumen = (campo: string): NotamResumen | null => {
    if (d[campo] === undefined || d[campo] === null) return null
    const m = objeto(d[campo], campo)
    const lesson = entero(m.lecciones, `${campo}.lecciones`)
    const practice = entero(m.practicas, `${campo}.practicas`)
    const best = m.mejor === null || m.mejor === undefined ? null : entero(m.mejor, `${campo}.mejor`)
    return lesson === 0 && practice === 0 && best === null ? null : { lesson, practice, best }
  }

  return {
    logros,
    desbloqueados,
    actividad: armarSerieHeatmap(lista<ActivityDay>(d.actividad, "actividad"), hoy),
    companeros: lista<Peer>(d.companeros, "companeros"),
    quizDiario: lista<DailyQuizQuestion>(d.quiz_diario, "quiz_diario"),
    dominio: lista<SubjectMastery>(d.dominio, "dominio"),
    plan: leerPlan(d.plan),
    // Si el cliente sale antes que la migración que las agregó, no vienen: se
    // leen como «ninguna» y no como error, igual que los módulos. Un panel que
    // se cae entero por un campo que falta es peor que uno sin esa tira.
    postulaciones: d.postulaciones === undefined
      ? []
      : lista<PostulacionAbierta>(d.postulaciones, "postulaciones"),
    modulos: Object.fromEntries(
      MODULOS_AEROLINEA.map((m) => [m.clave, moduloResumen(m.clave)]),
    ) as Record<ClaveModulo, NotamResumen | null>,
    licencias: lista<LicenseRow>(d.licencias, "licencias"),
    preparacion: objetoONulo<PcaReadiness>(d.preparacion, "preparacion"),
  }
}

export async function traerInicioPanel(): Promise<InicioPanel> {
  const { data, error } = await supabase.rpc("panel_inicio")
  if (error) throw error
  return leerInicioPanel(data)
}

export async function traerTarjetasPanel(): Promise<TarjetasPanel> {
  const { data, error } = await supabase.rpc("panel_tarjetas")
  if (error) throw error
  return leerTarjetasPanel(data)
}

/** Crea los avisos de documentos por vencer. No devuelve nada que el panel pinte. */
export function revisarVencimientos(): void {
  void supabase.rpc("check_my_expiries").then(({ error }) => {
    if (error) console.warn("check_my_expiries", error.message)
  })
}
