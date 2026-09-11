/**
 * Borra los cachés que dejó de usar el service worker, y vacía el de la API.
 *
 * Cuando una regla de caché cambia de nombre, el caché viejo no desaparece:
 * se queda ocupando espacio en el dispositivo de cada piloto que ya lo tenía,
 * y nadie vuelve a leerlo nunca. Esta lista es la de los que ya jubilamos.
 *
 * El caso que la estrenó: los cachés `*-images` de la primera versión
 * guardaban con `CacheFirst` cualquier respuesta 200, y una portada que
 * todavía no existía devolvía el `index.html` del SPA con un 200. Ese HTML
 * quedaba guardado como si fuera la imagen y la dejaba rota para siempre en
 * ese dispositivo. Se arregló filtrando por `Content-Type` y subiendo los
 * cachés a `-v2` (ver vite.config.ts); esto solo saca la basura que quedó.
 *
 * Va en la app y NO dentro del service worker a propósito. Un error aquí
 * rompe una limpieza; un error en el service worker deja la app entera sin
 * instalar. La lista es fija por el mismo motivo: borrar "todo lo que no
 * reconozco" se llevaría por delante el precaché de Workbox, cuyo nombre
 * incluye el origen y cambia entre entornos.
 *
 * `supabase-cache` se jubiló porque guardaba cualquier respuesta de Supabase,
 * también las de Auth, y un equipo compartido podía servírselas sin red al
 * siguiente piloto. Su reemplazo solo guarda lecturas de la API REST y archivos
 * públicos, y se vacía al cerrar sesión (borrarCacheDeLaApi).
 *
 * Es idempotente: `caches.delete` de algo que no existe devuelve `false` sin
 * más, así que correrla en cada arranque no cuesta nada.
 */

import { CACHE_API_SUPABASE } from "@/lib/cachesPwa"

/** Cachés retirados. Al jubilar uno nuevo, se añade aquí y no se quita nunca. */
const CACHES_JUBILADOS = ["modulo-images", "notam-images", "infografia-images", "supabase-cache"]

/** Sin CacheStorage (navegador viejo, o contexto no seguro) no hay cachés que tocar. */
function hayCacheStorage(): boolean {
  // `window.caches` es undefined ahí, no basta con comprobar el tipo.
  return typeof window !== "undefined" && "caches" in window
}

export async function limpiarCachesJubilados(): Promise<string[]> {
  if (!hayCacheStorage()) return []

  try {
    const existentes = await window.caches.keys()
    const borrados: string[] = []
    for (const nombre of CACHES_JUBILADOS) {
      if (!existentes.includes(nombre)) continue
      if (await window.caches.delete(nombre)) borrados.push(nombre)
    }
    return borrados
  } catch {
    // Un fallo limpiando cachés no puede tumbar el arranque de la app: el
    // piloto pierde unos megas de espacio, no la sesión.
    return []
  }
}

/**
 * Vacía la caché de respuestas de la API. Son datos de quien tenía la sesión
 * abierta: se llama al cerrarla. Devuelve true si había algo que borrar.
 */
export async function borrarCacheDeLaApi(): Promise<boolean> {
  if (!hayCacheStorage()) return false
  try {
    return await window.caches.delete(CACHE_API_SUPABASE)
  } catch {
    // Si el navegador no deja borrarla, la regla del service worker igual la
    // vence en 24 horas y nunca guarda respuestas de Auth.
    return false
  }
}
