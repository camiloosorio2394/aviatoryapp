/**
 * Nombres de los cachés del service worker que la app también toca.
 *
 * Los crea vite.config.ts y los vacía o jubila la app, así que viven en un solo
 * sitio. Este archivo lo compila también la configuración de Node: nada de DOM.
 */

/**
 * Lecturas de la API REST y archivos públicos de Storage de Supabase.
 * Son datos de quien tiene la sesión abierta: la app lo vacía al cerrarla.
 */
export const CACHE_API_SUPABASE = "supabase-api-v2"
