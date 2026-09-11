/**
 * Topes que la base aplica a lo que publica un piloto (mensajes y reacciones
 * de la comunidad, reportes de examen y de contenido). Cuando se pasa, el
 * servidor responde `demasiadas_publicaciones`; la pantalla lo explica en vez de
 * mostrar el texto técnico.
 * Ver supabase/migrations/20260911193818_comunidad_y_reportes_con_tope.sql.
 */
export function esTopeDePublicaciones(error: unknown): boolean {
  const mensaje = (error as { message?: unknown } | null)?.message
  return typeof mensaje === "string" && mensaje.includes("demasiadas_publicaciones")
}
