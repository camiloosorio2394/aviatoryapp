/**
 * El plan de estudio del piloto: qué días y a qué hora.
 *
 * No es una preferencia de la pantalla, es el compromiso que el recordatorio
 * nocturno le devuelve. Por eso vive en la base y no en el navegador: el que
 * manda el aviso es el servidor, de noche, cuando la app está cerrada.
 *
 * La base normaliza los días (los ordena y les quita repetidos) y valida la
 * zona horaria, así que aquí no se repite ninguna de las dos cosas.
 */

import { supabase } from "@/integrations/supabase/client"
import { reportarError } from "@/lib/errores"

/**
 * La semana como se lee aquí, de lunes a domingo. El `valor` es el que usa la
 * base (`extract(dow)`: 0 = domingo), que no es el mismo orden.
 */
export const DIAS_DE_LA_SEMANA = [
  { valor: 1, corto: "L", largo: "lunes" },
  { valor: 2, corto: "M", largo: "martes" },
  { valor: 3, corto: "X", largo: "miércoles" },
  { valor: 4, corto: "J", largo: "jueves" },
  { valor: 5, corto: "V", largo: "viernes" },
  { valor: 6, corto: "S", largo: "sábado" },
  { valor: 0, corto: "D", largo: "domingo" },
] as const

/** Lo que cabe en un rato de verdad, no lo que suena bien. */
export const MINUTOS_SUGERIDOS = [10, 20, 30, 45, 60]

export interface PlanDeEstudio {
  /** 0 = domingo … 6 = sábado. */
  dias: number[]
  /** "HH:MM" en la zona del piloto. */
  hora: string
  zona: string
  minutosMeta: number
}

interface FilaPlan {
  dias: number[]
  hora: string
  zona: string
  minutos_meta: number
}

/** La zona del navegador, que es la del piloto. Si no se puede saber, Bogotá. */
export function zonaDelEquipo(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Bogota"
  } catch {
    return "America/Bogota"
  }
}

/**
 * El plan guardado, o `null` si no tiene ninguno o no se pudo leer. En los dos
 * casos la pantalla ofrece ponerlo, que es lo prudente.
 */
export async function traerPlanDeEstudio(userId: string): Promise<PlanDeEstudio | null> {
  const { data, error } = await supabase
    .from("plan_de_estudio")
    .select("dias, hora, zona, minutos_meta")
    .eq("user_id", userId)
    .maybeSingle()
  if (error) {
    console.warn("plan de estudio", error.message)
    return null
  }
  if (!data) return null

  const fila = data as FilaPlan
  return {
    dias: fila.dias,
    // Postgres devuelve "20:00:00"; al piloto le importan horas y minutos.
    hora: fila.hora.slice(0, 5),
    zona: fila.zona,
    minutosMeta: fila.minutos_meta,
  }
}

/**
 * Guarda el plan. Lanza con un mensaje ya en español, que es lo que la pantalla
 * muestra.
 */
export async function guardarPlanDeEstudio(userId: string, plan: PlanDeEstudio): Promise<void> {
  if (plan.dias.length === 0) {
    throw new Error("Elige al menos un día.")
  }

  const { error } = await supabase.from("plan_de_estudio").upsert(
    {
      user_id: userId,
      dias: [...plan.dias].sort((a, b) => a - b),
      hora: plan.hora,
      zona: plan.zona,
      minutos_meta: plan.minutosMeta,
    },
    { onConflict: "user_id" },
  )
  if (error) {
    reportarError("plan de estudio: guardar", error)
    throw new Error("No pudimos guardar tu plan. Inténtalo de nuevo.")
  }
}

/**
 * Cómo se lee el plan en una línea: «lunes, miércoles y viernes a las 20:00».
 * La coma serial no existe en español, así que el último va con «y».
 */
export function resumirPlan(plan: PlanDeEstudio): string {
  const nombres = DIAS_DE_LA_SEMANA.filter((d) => plan.dias.includes(d.valor)).map((d) => d.largo)
  if (nombres.length === 0) return "sin días elegidos"

  const dias =
    nombres.length === 1
      ? nombres[0]
      : `${nombres.slice(0, -1).join(", ")} y ${nombres[nombres.length - 1]}`
  return `${dias} a las ${plan.hora}`
}

/** Los tres primeros que devuelve Intl en inglés, al número de `extract(dow)`. */
const DIA_POR_NOMBRE: Record<string, number> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
}

/**
 * Si hoy es uno de los días del plan, en la zona del piloto y no en la del
 * servidor: un piloto en Lima y uno en Santiago no cambian de día a la vez.
 */
export function hoyTocaEstudiar(plan: PlanDeEstudio, ahora = new Date()): boolean {
  const nombre = new Intl.DateTimeFormat("en-US", {
    timeZone: plan.zona,
    weekday: "short",
  }).format(ahora)
  const dia = DIA_POR_NOMBRE[nombre]
  return dia !== undefined && plan.dias.includes(dia)
}
