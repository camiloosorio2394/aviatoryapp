/**
 * Las postulaciones del piloto: a dónde mandó la hoja de vida y en qué quedó.
 *
 * Es lo único que la app no sabía y que decide si sirve o no. Todo lo demás
 * —horas, inglés, match— se detiene justo antes de la única pregunta que
 * importa: si entró a una aerolínea.
 *
 * Es el relato del piloto, no un dato verificado: él marca «contratado» y nadie
 * lo comprueba. Sirve para acompañarlo y para saber qué piden de verdad las
 * aerolíneas; no sirve para publicar una cifra de contratados.
 */

import { supabase } from "@/integrations/supabase/client"
import { reportarError } from "@/lib/errores"

export type EstadoPostulacion = "postulada" | "en_proceso" | "contratado" | "no_quedo" | "retirada"
export type EtapaProceso =
  | "hoja_de_vida"
  | "psicotecnicas"
  | "entrevista"
  | "simulador"
  | "ingles"
  | "medico"
  | "otra"

export interface Postulacion {
  id: number
  airlineId: number | null
  /** El nombre que se muestra, venga de la lista o escrito por el piloto. */
  aerolinea: string
  estado: EstadoPostulacion
  etapaFinal: EtapaProceso | null
  nota: string | null
  postuladaEn: string
}

/** Cómo se nombra cada estado en pantalla, y si la postulación sigue viva. */
export const ESTADOS: { valor: EstadoPostulacion; nombre: string; abierta: boolean }[] = [
  { valor: "postulada", nombre: "Postulada", abierta: true },
  { valor: "en_proceso", nombre: "En proceso", abierta: true },
  { valor: "contratado", nombre: "Me contrataron", abierta: false },
  { valor: "no_quedo", nombre: "No quedé", abierta: false },
  { valor: "retirada", nombre: "Me retiré", abierta: false },
]

/**
 * Las etapas de un proceso de aerolínea, en el orden en que pasan. Se pregunta
 * solo cuando no siguió: saber dónde se cae la gente es lo que dice si los
 * módulos preparan para lo que hay que preparar.
 */
export const ETAPAS: { valor: EtapaProceso; nombre: string }[] = [
  { valor: "hoja_de_vida", nombre: "No pasé de la hoja de vida" },
  { valor: "psicotecnicas", nombre: "Pruebas psicotécnicas" },
  { valor: "ingles", nombre: "Inglés" },
  { valor: "entrevista", nombre: "Entrevista" },
  { valor: "simulador", nombre: "Simulador" },
  { valor: "medico", nombre: "Examen médico" },
  { valor: "otra", nombre: "Otra" },
]

interface FilaPostulacion {
  id: number
  airline_id: number | null
  aerolinea: string | null
  estado: EstadoPostulacion
  etapa_final: EtapaProceso | null
  nota: string | null
  postulada_en: string
  airlines: { name: string } | null
}

/** Lista vacía si no hay ninguna o no se pudo leer: la pantalla ofrece agregar. */
export async function traerPostulaciones(userId: string): Promise<Postulacion[]> {
  const { data, error } = await supabase
    .from("postulaciones")
    .select("id, airline_id, aerolinea, estado, etapa_final, nota, postulada_en, airlines(name)")
    .eq("user_id", userId)
    .order("postulada_en", { ascending: false })
  if (error) {
    console.warn("postulaciones", error.message)
    return []
  }

  return (data ?? []).map((f) => {
    const fila = f as unknown as FilaPostulacion
    return {
      id: fila.id,
      airlineId: fila.airline_id,
      aerolinea: fila.airlines?.name ?? fila.aerolinea ?? "Aerolínea",
      estado: fila.estado,
      etapaFinal: fila.etapa_final,
      nota: fila.nota,
      postuladaEn: fila.postulada_en,
    }
  })
}

export interface PostulacionNueva {
  /** De la lista de aerolíneas, o `null` y entonces va el nombre escrito. */
  airlineId: number | null
  aerolinea: string | null
  postuladaEn: string
}

/** Lanza con el mensaje que la pantalla muestra. */
export async function registrarPostulacion(userId: string, datos: PostulacionNueva): Promise<void> {
  if (datos.airlineId === null && !datos.aerolinea?.trim()) {
    throw new Error("Elige una aerolínea o escribe su nombre.")
  }
  if (datos.postuladaEn > hoyEnColombia()) {
    throw new Error("La fecha no puede ser del futuro.")
  }

  const { error } = await supabase.from("postulaciones").insert({
    user_id: userId,
    airline_id: datos.airlineId,
    aerolinea: datos.airlineId === null ? datos.aerolinea?.trim() : null,
    postulada_en: datos.postuladaEn,
  })
  if (error) {
    reportarError("postulaciones: registrar", error)
    throw new Error("No pudimos guardar la postulación. Inténtalo de nuevo.")
  }
}

export interface CambioDeEstado {
  estado: EstadoPostulacion
  /** Solo cuando no siguió; en cualquier otro estado se limpia. */
  etapaFinal: EtapaProceso | null
  nota: string | null
}

export async function actualizarPostulacion(id: number, cambio: CambioDeEstado): Promise<void> {
  const { error } = await supabase
    .from("postulaciones")
    .update({
      estado: cambio.estado,
      // La etapa solo tiene sentido en la que no siguió: si el piloto se
      // corrige a «en proceso», la de antes deja de ser cierta.
      etapa_final: cambio.estado === "no_quedo" ? cambio.etapaFinal : null,
      nota: cambio.nota?.trim() || null,
    })
    .eq("id", id)
  if (error) {
    reportarError("postulaciones: actualizar", error)
    throw new Error("No pudimos guardar el cambio. Inténtalo de nuevo.")
  }
}

/** Hoy en Colombia, que es con lo que la base valida la fecha. */
export function hoyEnColombia(ahora = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(ahora)
}

/** Las que siguen vivas, que son las que el piloto está esperando. */
export function abiertas(lista: Postulacion[]): Postulacion[] {
  const vivas = new Set(ESTADOS.filter((e) => e.abierta).map((e) => e.valor))
  return lista.filter((p) => vivas.has(p.estado))
}
