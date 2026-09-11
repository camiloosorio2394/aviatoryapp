/**
 * Progreso de un módulo de curso (lecciones leídas y prácticas resueltas):
 * puente entre el respaldo local y la base. Lo comparten NOTAM, Meteorología y
 * Mercancías, que antes tenían tres copias casi idénticas de esto.
 *
 * Reglas:
 *   - El respaldo local siempre se escribe primero: el módulo funciona sin
 *     sesión y sin red.
 *   - La base es la verdad entre dispositivos. Se escribe solo por la RPC
 *     `<modulo>_mark_progress`, que es idempotente (agrega sin duplicar).
 *   - Lo avanzado sin sesión se sube cuando aparece una, comparando contra lo
 *     que la base tiene de verdad. Solo cuenta como subido lo que la RPC
 *     aceptó: un error devuelto por la base no se da por guardado.
 */

import { supabase } from "@/integrations/supabase/client"

export interface ProgresoRemoto {
  lessonScreens: number[]
  practiceDone: string[]
}

export interface MarcaProgreso {
  lessonScreen?: number
  practiceId?: string
}

export interface ConfigProgreso {
  tabla: "user_notam_progress" | "user_metar_progress" | "user_mercancias_progress"
  rpc: "notam_mark_progress" | "metar_mark_progress" | "mercancias_mark_progress"
  /** Lo que el respaldo local tiene leído y resuelto. */
  leerLocal: () => ProgresoRemoto
  /** Anota una marca en el respaldo local. */
  anotarLocal: (marca: MarcaProgreso) => void
}

interface Fila {
  lesson_screens: number[] | null
  practice_done: string[] | null
}

/** Cuántas RPC de subida van en paralelo, para no abrir decenas de conexiones de golpe. */
const TANDA = 6

function unir<T>(a: T[], b: T[]): T[] {
  return Array.from(new Set([...a, ...b]))
}

export function crearProgresoModulo({ tabla, rpc, leerLocal, anotarLocal }: ConfigProgreso) {
  /**
   * El progreso guardado en la base, sin mezclar con lo local. null si la
   * consulta falla, para distinguir "no hay progreso" de "no pudimos preguntar".
   */
  async function leer(userId: string): Promise<ProgresoRemoto | null> {
    try {
      const { data, error } = await supabase
        .from(tabla)
        .select("lesson_screens, practice_done")
        .eq("user_id", userId)
        .maybeSingle()
      if (error) return null
      const fila = data as Fila | null
      return { lessonScreens: fila?.lesson_screens ?? [], practiceDone: fila?.practice_done ?? [] }
    } catch {
      return null
    }
  }

  /** Manda una marca a la base. true si la base la aceptó. */
  async function enviar(marca: MarcaProgreso): Promise<boolean> {
    try {
      const { error } = await supabase.rpc(rpc, {
        p_lesson_screen: marca.lessonScreen ?? null,
        p_practice_id: marca.practiceId ?? null,
      })
      // Sin sesión la RPC responde permiso denegado: es el caso esperado de quien
      // estudia sin cuenta, y lo local ya quedó para subirlo después.
      if (error) console.warn(rpc, error.message)
      return !error
    } catch (error) {
      console.warn(rpc, error)
      return false
    }
  }

  /** Marca una lección leída o una práctica resuelta, local y en la base. */
  async function marcar(marca: MarcaProgreso): Promise<void> {
    anotarLocal(marca)
    await enviar(marca)
  }

  /**
   * Sube lo que el respaldo local tiene y la base no. `remoto` tiene que ser lo
   * que devolvió `leer` (sin mezclar con lo local): si ya trae lo local, no hay
   * nada pendiente que comparar. Devuelve el remoto más lo que se subió bien.
   */
  async function subirPendiente(remoto: ProgresoRemoto): Promise<ProgresoRemoto> {
    const local = leerLocal()
    const marcas: MarcaProgreso[] = [
      ...local.lessonScreens.filter((n) => !remoto.lessonScreens.includes(n)).map((n) => ({ lessonScreen: n })),
      ...local.practiceDone.filter((id) => !remoto.practiceDone.includes(id)).map((id) => ({ practiceId: id })),
    ]
    if (marcas.length === 0) return remoto

    const subidas: MarcaProgreso[] = []
    for (let i = 0; i < marcas.length; i += TANDA) {
      const tanda = marcas.slice(i, i + TANDA)
      const resultados = await Promise.all(tanda.map(enviar))
      tanda.forEach((marca, j) => {
        if (resultados[j]) subidas.push(marca)
      })
    }

    return {
      lessonScreens: unir(
        remoto.lessonScreens,
        subidas.flatMap((m) => (m.lessonScreen === undefined ? [] : [m.lessonScreen])),
      ).sort((a, b) => a - b),
      practiceDone: unir(remoto.practiceDone, subidas.flatMap((m) => (m.practiceId === undefined ? [] : [m.practiceId]))),
    }
  }

  return { leer, marcar, subirPendiente }
}

/** Anota una marca en listas locales sin repetir. */
export function conMarca(local: ProgresoRemoto, marca: MarcaProgreso): ProgresoRemoto {
  return {
    lessonScreens:
      marca.lessonScreen === undefined || local.lessonScreens.includes(marca.lessonScreen)
        ? local.lessonScreens
        : [...local.lessonScreens, marca.lessonScreen].sort((a, b) => a - b),
    practiceDone:
      marca.practiceId === undefined || local.practiceDone.includes(marca.practiceId)
        ? local.practiceDone
        : [...local.practiceDone, marca.practiceId],
  }
}
