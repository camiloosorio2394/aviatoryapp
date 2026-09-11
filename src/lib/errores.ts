import { supabase } from "@/integrations/supabase/client"

/**
 * Errores que alguien tiene que ver.
 *
 * `console.error` solo llega a la consola del navegador del piloto, y en
 * producción nadie la mira. `reportarError` deja la traza en la consola igual y
 * además la guarda en la base: tabla `errores_cliente`, por la función
 * `reportar_error_cliente`, con tope de 30 por piloto por hora
 * (supabase/migrations/20260911201503_errores_del_cliente.sql).
 *
 * Qué va aquí y qué no:
 * - `reportarError`: lo que rompe algo que el piloto esperaba. Una pantalla que
 *   se cae, algo que no se guardó, una respuesta del servidor con otra forma.
 * - `console.warn`: lo degradado y esperable. Una tarjeta opcional sin datos, o
 *   estar sin conexión.
 *
 * Sin sesión no se envía, porque la función exige piloto. Un fallo de red
 * tampoco se envía: no llegaría. En una misma pestaña, cada error se envía una
 * vez y como mucho se envían 20 distintos.
 */

const MAXIMO_POR_PESTANA = 20
const enviados = new Set<string>()

/** Versión desplegada. Vercel la expone al build como VITE_VERCEL_GIT_COMMIT_SHA. */
const VERSION = (import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA as string | undefined)?.slice(0, 12) ?? null

export interface ErrorNormalizado {
  mensaje: string
  detalle: string | null
}

/** Mensaje y detalle legibles de un Error, un error de PostgREST o cualquier otra cosa lanzada. */
export function normalizarError(error: unknown): ErrorNormalizado {
  if (error instanceof Error) {
    return { mensaje: error.message || error.name, detalle: error.stack ?? null }
  }
  if (typeof error === "string") return { mensaje: error, detalle: null }
  if (typeof error === "object" && error !== null) {
    const e = error as { message?: unknown; code?: unknown; details?: unknown; hint?: unknown }
    if (typeof e.message === "string") {
      const codigo = typeof e.code === "string" && e.code ? `${e.code}: ` : ""
      const extra = [e.details, e.hint].filter((x): x is string => typeof x === "string" && x.length > 0)
      return { mensaje: codigo + e.message, detalle: extra.length > 0 ? extra.join("\n") : null }
    }
    let texto: string
    try {
      texto = JSON.stringify(error)
    } catch {
      texto = String(error)
    }
    return { mensaje: texto, detalle: null }
  }
  return { mensaje: String(error), detalle: null }
}

function esFalloDeRed(error: unknown, mensaje: string): boolean {
  return (
    (error instanceof TypeError && /fetch|network|load failed/i.test(mensaje)) ||
    /Failed to fetch|NetworkError|Load failed/i.test(mensaje)
  )
}

/**
 * Deja el error en la consola y lo guarda en la base.
 * @param contexto qué se estaba haciendo, corto y estable (sirve para agrupar).
 * @param extra    detalle adicional, por ejemplo el árbol de componentes.
 */
export function reportarError(contexto: string, error: unknown, extra?: string): void {
  console.error(`[Aviatory] ${contexto}`, error)

  const { mensaje, detalle } = normalizarError(error)
  if (esFalloDeRed(error, mensaje)) return
  const clave = `${contexto}|${mensaje}`
  if (enviados.has(clave) || enviados.size >= MAXIMO_POR_PESTANA) return
  enviados.add(clave)

  void enviar(contexto, mensaje, [detalle, extra].filter(Boolean).join("\n\n") || null)
}

async function enviar(contexto: string, mensaje: string, detalle: string | null): Promise<void> {
  try {
    const { data } = await supabase.auth.getSession()
    if (!data.session) return
    const { error } = await supabase.rpc("reportar_error_cliente", {
      p_contexto: contexto,
      p_mensaje: mensaje,
      p_detalle: detalle,
      p_ruta: window.location.pathname,
      p_version: VERSION,
      p_navegador: navigator.userAgent,
    })
    // El reporte no se reporta: si falla, queda solo en la consola.
    if (error) console.warn("reportar_error_cliente", error.message)
  } catch (error) {
    console.warn("reportar_error_cliente", error)
  }
}

/**
 * Lo que ninguna pantalla atrapó: excepciones fuera de React y promesas
 * rechazadas sin `catch`. Los errores de scripts de otro origen (extensiones del
 * navegador) y el aviso benigno de ResizeObserver no se reportan.
 */
export function escucharErroresGlobales(): void {
  window.addEventListener("error", (evento) => {
    if (evento.filename && !evento.filename.startsWith(window.location.origin)) return
    if (/ResizeObserver loop/.test(evento.message)) return
    reportarError("error sin atrapar", evento.error ?? evento.message)
  })
  window.addEventListener("unhandledrejection", (evento) => {
    reportarError("promesa rechazada sin atrapar", evento.reason)
  })
}
