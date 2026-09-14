import { useSyncExternalStore } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { supabase } from "@/integrations/supabase/client"

export interface EstadoDeSesion {
  session: Session | null
  user: User | null
  /** true hasta que Supabase contesta la primera vez. */
  isLoading: boolean
}

/**
 * El estado de la sesión, uno solo para toda la app.
 *
 * useSession se usa en cuarenta pantallas y componentes. Con un useEffect por
 * componente, cada uno abría su propio onAuthStateChange y pedía getSession()
 * aparte: cuarenta suscripciones al mismo evento y cuarenta lecturas del mismo
 * token, y cada entrada o salida despertaba a los cuarenta por separado.
 *
 * Acá el estado vive una vez en el módulo. Supabase se suscribe cuando monta el
 * primer componente que usa el hook y se desuscribe cuando se va el último; los
 * componentes leen el valor con useSyncExternalStore, que repinta solo a quien
 * esté montado y solo cuando el objeto cambia de identidad.
 */
let estado: EstadoDeSesion = { session: null, user: null, isLoading: true }

const oyentes = new Set<() => void>()
let suscripcion: { unsubscribe: () => void } | null = null

function publicar(session: Session | null): void {
  // Supabase avisa también cuando no cambió nada —al volver a la pestaña, por
  // ejemplo—. Si el token es el mismo, la sesión es la misma y no hay por qué
  // repintar cuarenta componentes.
  if (!estado.isLoading && estado.session?.access_token === session?.access_token) return

  estado = { session, user: session?.user ?? null, isLoading: false }
  for (const avisar of oyentes) avisar()
}

function suscribir(avisar: () => void): () => void {
  oyentes.add(avisar)

  if (!suscripcion) {
    suscripcion = supabase.auth.onAuthStateChange((_evento, sesion) => publicar(sesion)).data.subscription
    void supabase.auth.getSession().then(({ data }) => publicar(data.session))
  }

  return () => {
    oyentes.delete(avisar)
    if (oyentes.size === 0) {
      suscripcion?.unsubscribe()
      suscripcion = null
    }
  }
}

/**
 * El estado no se borra al quedarse sin oyentes: si la app vuelve a montar el
 * hook, muestra la última sesión conocida mientras getSession() la confirma, en
 * lugar de pasar otra vez por «cargando».
 */
function leer(): EstadoDeSesion {
  return estado
}

export function useSession(): EstadoDeSesion {
  return useSyncExternalStore(suscribir, leer, leer)
}
