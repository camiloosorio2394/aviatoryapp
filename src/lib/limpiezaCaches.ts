/**
 * Borra los cachés de imágenes que dejó de usar el service worker.
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
 * Es idempotente: `caches.delete` de algo que no existe devuelve `false` sin
 * más, así que correrla en cada arranque no cuesta nada.
 */

/** Cachés retirados. Al jubilar uno nuevo, se añade aquí y no se quita nunca. */
const CACHES_JUBILADOS = ["modulo-images", "notam-images", "infografia-images"]

export async function limpiarCachesJubilados(): Promise<string[]> {
  // Sin CacheStorage (navegador viejo, o contexto no seguro) no hay nada que
  // hacer. `window.caches` es undefined ahí, no basta con comprobar el tipo.
  if (typeof window === "undefined" || !("caches" in window)) return []

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
