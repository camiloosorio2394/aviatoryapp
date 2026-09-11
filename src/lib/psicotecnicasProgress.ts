/**
 * Progreso de psicotécnicas: respaldo local y lectura de la base.
 *
 * Las tandas las califica y las guarda el servidor (psico_terminar). Aquí queda
 * el respaldo local que el hub lee sin red, y la lectura del mejor simulacro
 * guardado, que es la verdad entre dispositivos.
 *
 * Lo que se guarda de una sesión es el marcador, no el detalle de respuestas.
 * Cada tanda se sortea distinta, así que un arreglo de respuestas no sería
 * comparable entre intentos; lo que sí sirve para volver es el mejor puntaje.
 */

import { supabase } from "@/integrations/supabase/client"
import type { CategoriaPsico, ModoPsico, ResultadoPsico } from "@/lib/psicotecnicas"

const CLAVE = "av_psico_v1"

export interface PsicoLocal {
  /** Mejor resultado global del simulacro, sobre 100. */
  mejorSimulacro: number | null
  /** Cuántas tandas ha terminado, de cualquier modo. */
  sesiones: number
  /** Último porcentaje de acierto por familia, para el hub. */
  ultimoPorCategoria: Partial<Record<CategoriaPsico, number>>
}

const VACIO: PsicoLocal = { mejorSimulacro: null, sesiones: 0, ultimoPorCategoria: {} }

export function leerPsicoLocal(): PsicoLocal {
  try {
    const crudo = localStorage.getItem(CLAVE)
    if (!crudo) return VACIO
    const datos = JSON.parse(crudo) as Partial<PsicoLocal>
    return {
      mejorSimulacro:
        typeof datos.mejorSimulacro === "number" ? datos.mejorSimulacro : null,
      sesiones: typeof datos.sesiones === "number" ? datos.sesiones : 0,
      ultimoPorCategoria: datos.ultimoPorCategoria ?? {},
    }
  } catch {
    // Modo privado, cuota llena o JSON corrupto: se sigue sin respaldo.
    return VACIO
  }
}

function escribirPsicoLocal(datos: PsicoLocal): void {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(datos))
  } catch {
    /* sin respaldo local, la sesión sigue funcionando igual */
  }
}

/**
 * Anota en el respaldo local una tanda que el servidor ya calificó y guardó.
 *
 * El intento en la base lo escribe psico_terminar; esto solo deja el mejor
 * simulacro y el último porcentaje por familia para que el hub responda sin
 * red. Nunca lanza.
 */
export function anotarSesionLocal(modo: ModoPsico, resultado: ResultadoPsico): void {
  const local = leerPsicoLocal()
  escribirPsicoLocal({
    mejorSimulacro:
      modo === "simulacion" ? Math.max(local.mejorSimulacro ?? 0, resultado.global) : local.mejorSimulacro,
    sesiones: local.sesiones + 1,
    ultimoPorCategoria: {
      ...local.ultimoPorCategoria,
      ...Object.fromEntries(resultado.porCategoria.map((c) => [c.categoria, c.porcentaje])),
    },
  })
}

/** Mejor resultado global del simulacro guardado en la base. */
export async function mejorSimulacroRemoto(userId: string): Promise<number | null> {
  try {
    const { data, error } = await supabase
      .from("user_psico_attempts")
      .select("global")
      .eq("user_id", userId)
      .eq("modo", "simulacion")
      .order("global", { ascending: false })
      .limit(1)
    if (error) return null
    const fila = (data ?? [])[0] as { global: number } | undefined
    return typeof fila?.global === "number" ? fila.global : null
  } catch {
    return null
  }
}
