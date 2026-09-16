/**
 * Progreso de Aeropuertos: el progreso de módulo común (progresoModulo) con el
 * respaldo local del tema, su RPC aeropuertos_mark_progress y la mejor nota de
 * la evaluación.
 *
 * El respaldo local vive en `lib/aeropuertos.ts`, que es el archivo liviano que
 * cargan el panel y la tarjeta del hub. Lo de la base vive aquí, porque trae el
 * cliente de Supabase detrás y no tiene nada que hacer en aquella pantalla.
 *
 * Mientras Camilo no corra `supabase/migrations/20260916000000_progreso_de_aeropuertos.sql`
 * la tabla no existe: la consulta falla, `leer` devuelve null y el módulo sigue
 * contando con lo del navegador, que es exactamente lo que hacía antes. El día
 * que la corra, lo que cada piloto tenga guardado aquí se sube solo en su
 * primera visita.
 */

import { supabase } from "@/integrations/supabase/client"
import { conMarca, crearProgresoModulo, type ProgresoRemoto } from "@/lib/progresoModulo"
import {
  readAeropuertosLocal,
  writeAeropuertosLocal,
  writeAeropuertosPracticas,
  type AeropuertosProgreso,
} from "@/lib/aeropuertos"

/** Lo que devuelve fetchAeropuertosProgress: lo unido para mostrar, y lo que la base tiene de verdad. */
export interface AeropuertosTraido extends AeropuertosProgreso {
  remoto: ProgresoRemoto
}

const progreso = crearProgresoModulo({
  tabla: "user_aeropuertos_progress",
  rpc: "aeropuertos_mark_progress",
  leerLocal: () => {
    const p = readAeropuertosLocal()
    return { lessonScreens: p.lessonScreens, practiceDone: p.practiceDone }
  },
  anotarLocal: (marca) => {
    const antes = readAeropuertosLocal()
    const despues = conMarca({ lessonScreens: antes.lessonScreens, practiceDone: antes.practiceDone }, marca)
    if (despues.lessonScreens !== antes.lessonScreens) writeAeropuertosLocal(despues.lessonScreens)
    if (despues.practiceDone !== antes.practiceDone) writeAeropuertosPracticas(despues.practiceDone)
  },
})

/**
 * El progreso del piloto unido con el respaldo local, para mostrarlo, y en
 * `remoto` lo que la base tiene de verdad, que es contra lo que se sube lo
 * pendiente. null si la consulta falla.
 */
export async function fetchAeropuertosProgress(userId: string): Promise<AeropuertosTraido | null> {
  const [remoto, examen] = await Promise.all([
    progreso.leer(userId),
    supabase
      .from("user_aeropuertos_exam_attempts")
      .select("score")
      .eq("user_id", userId)
      .order("score", { ascending: false })
      .limit(1)
      .then(
        (r) => r,
        () => ({ data: null }),
      ),
  ])
  if (!remoto) return null

  const local = readAeropuertosLocal()
  const mejorRemoto = (examen.data ?? [])[0]?.score
  const puntajes = [typeof mejorRemoto === "number" ? mejorRemoto : null, local.bestScore].filter(
    (s): s is number => typeof s === "number",
  )

  return {
    lessonScreens: Array.from(new Set([...remoto.lessonScreens, ...local.lessonScreens])),
    practiceDone: Array.from(new Set([...remoto.practiceDone, ...local.practiceDone])),
    bestScore: puntajes.length > 0 ? Math.max(...puntajes) : null,
    remoto,
  }
}

/** Marca una lección leída o un ejercicio resuelto, local y en la base. */
export const markAeropuertosProgress = progreso.marcar

/**
 * Sube lo que se avanzó sin sesión, comparando contra lo que la base tiene (no
 * contra lo ya unido con lo local, que no dejaría nada pendiente que subir).
 * Devuelve lo de la base más lo que se subió bien.
 */
export async function pushPendingAeropuertos(traido: AeropuertosTraido): Promise<AeropuertosProgreso> {
  const subido = await progreso.subirPendiente(traido.remoto)
  return { ...subido, bestScore: traido.bestScore }
}
