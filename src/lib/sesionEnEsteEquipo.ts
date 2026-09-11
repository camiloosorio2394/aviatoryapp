/**
 * Engancha la sesión con lo que queda guardado en este equipo.
 *
 * Se llama una sola vez, al arrancar y antes de pintar, para que ninguna
 * pantalla alcance a leer ni a subir datos locales de otro piloto: al iniciar
 * sesión (y al recuperar una sesión guardada) los datos locales pasan a su
 * nombre, y al cerrarla se vacía la caché de respuestas de la API.
 */

import { supabase } from "@/integrations/supabase/client"
import { reclamarDatosLocales } from "@/lib/datosLocales"
import { borrarCacheDeLaApi } from "@/lib/limpiezaCaches"

export function protegerDatosDeEsteEquipo(): void {
  supabase.auth.onAuthStateChange((evento, sesion) => {
    // supabase-js corre este callback en medio de su propio manejo de la sesión:
    // aquí no se espera nada ni se llama a otro método de supabase, que podría
    // quedarse bloqueado.
    if (sesion?.user) reclamarDatosLocales(sesion.user.id)
    // SIGNED_OUT llega también cuando la sesión vence o se revoca.
    if (evento === "SIGNED_OUT") void borrarCacheDeLaApi()
  })
}
