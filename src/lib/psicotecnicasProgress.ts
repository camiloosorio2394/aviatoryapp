/**
 * Progreso de psicotécnicas: respaldo local y base de datos.
 *
 * Misma regla que el resto de los módulos: el respaldo local se escribe siempre
 * —así la sección funciona sin sesión y sin red— y la base es la verdad entre
 * dispositivos. Si la consulta falla no se borra nada de lo local.
 *
 * Lo que se guarda de una sesión es el marcador, no el detalle de respuestas.
 * Cada tanda se sortea distinta, así que un arreglo de respuestas no sería
 * comparable entre intentos; lo que sí sirve para volver es el mejor puntaje.
 */

import { supabase } from "@/integrations/supabase/client"
import type {
  CategoriaPsico,
  ModoPsico,
  NivelPsico,
  ResultadoPsico,
} from "@/lib/psicotecnicas"

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

interface Sesion {
  modo: ModoPsico
  nivel: NivelPsico | "todos"
  categoria: CategoriaPsico | "todas"
  resultado: ResultadoPsico
}

/**
 * Cierra una sesión: actualiza el respaldo local y, si hay sesión iniciada,
 * inserta el intento. Nunca lanza: terminar una prueba no puede fallar porque
 * la red se cayó.
 */
export async function guardarSesion({ modo, nivel, categoria, resultado }: Sesion): Promise<void> {
  const local = leerPsicoLocal()
  const esSimulacro = modo === "simulacion"

  escribirPsicoLocal({
    mejorSimulacro: esSimulacro
      ? Math.max(local.mejorSimulacro ?? 0, resultado.global)
      : local.mejorSimulacro,
    sesiones: local.sesiones + 1,
    ultimoPorCategoria: {
      ...local.ultimoPorCategoria,
      ...Object.fromEntries(resultado.porCategoria.map((c) => [c.categoria, c.porcentaje])),
    },
  })

  try {
    const { data } = await supabase.auth.getUser()
    const userId = data.user?.id
    if (!userId) return
    await supabase.from("user_psico_attempts").insert({
      user_id: userId,
      modo,
      categoria,
      nivel,
      total: resultado.total,
      correctas: resultado.correctas,
      score: resultado.porcentaje,
      velocidad: resultado.velocidad,
      global: resultado.global,
    })
  } catch {
    /* queda el respaldo local */
  }
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
