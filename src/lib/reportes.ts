import { supabase } from "@/integrations/supabase/client"

/**
 * Reportar un fallo de contenido desde la app.
 *
 * Existe porque los verificadores tienen un punto ciego que no se puede tapar
 * con más verificadores: comprueban que la respuesta sea la correcta y que el
 * archivo exista, pero ninguno puede mirar si la imagen se ve bien. Los tres
 * últimos fallos del módulo de psicotécnicas —letras cortadas, un damero de
 * fondo, un dado sin su cara de arriba— los encontró una persona mirando la
 * pantalla.
 *
 * Quien mira todas las pantallas todos los días es el piloto.
 */

export type MotivoReporte = "imagen" | "respuesta" | "enunciado" | "otro"

export const MOTIVOS: { valor: MotivoReporte; etiqueta: string; ayuda: string }[] = [
  {
    valor: "imagen",
    etiqueta: "La imagen se ve mal",
    ayuda: "Cortada, borrosa, con marcas encima o no se entiende",
  },
  {
    valor: "respuesta",
    etiqueta: "La respuesta no cuadra",
    ayuda: "Creo que la correcta es otra",
  },
  {
    valor: "enunciado",
    etiqueta: "El enunciado confunde",
    ayuda: "Pide una cosa y las opciones son de otra",
  },
  { valor: "otro", etiqueta: "Otra cosa", ayuda: "Cuéntanos qué pasa" },
]

export interface Reporte {
  modulo: string
  /** El identificador de la ficha. Es lo que hace el reporte accionable. */
  ejercicioId?: string
  motivo: MotivoReporte
  detalle?: string
  /** Lo que había en pantalla: qué opción estaba elegida, por ejemplo. */
  extra?: Record<string, unknown>
}

/**
 * Manda el reporte.
 *
 * Devuelve si se pudo o no, sin lanzar: esto se llama desde un botón al lado de
 * un ejercicio cronometrado, y una excepción aquí no puede tumbar la tanda.
 *
 * Puede fallar por una razón concreta y esperada: mientras la migración
 * `20260909010000_reportes_de_contenido.sql` no esté aplicada, la tabla no
 * existe. En ese caso se dice, no se finge que se envió: un «gracias» sobre un
 * reporte que no llegó a ninguna parte es peor que el fallo que se reportaba.
 */
export async function enviarReporte(reporte: Reporte): Promise<{ ok: boolean; error?: string }> {
  try {
    const { data: sesion } = await supabase.auth.getUser()
    const usuario = sesion.user
    if (!usuario) return { ok: false, error: "Hay que iniciar sesión para reportar." }

    const { error } = await supabase.from("content_reports").insert({
      user_id: usuario.id,
      modulo: reporte.modulo,
      ejercicio_id: reporte.ejercicioId ?? null,
      motivo: reporte.motivo,
      detalle: reporte.detalle?.trim() || null,
      contexto: {
        ruta: window.location.pathname,
        ancho: window.innerWidth,
        // Sirve para reproducir: varios de los fallos de imagen solo se ven en
        // un tema o en un ancho concreto.
        tema: document.documentElement.classList.contains("dark") ? "oscuro" : "claro",
        ...reporte.extra,
      },
    })

    if (error) {
      // A la consola con el detalle: si la tabla todavía no existe, es lo que
      // lo dice, y el mensaje de pantalla no debe cargar con eso.
      console.error("[Aviatory] No se pudo guardar el reporte:", error)
      return { ok: false, error: "No pudimos enviarlo ahora. Inténtalo más tarde." }
    }
    return { ok: true }
  } catch (err) {
    console.error("[Aviatory] No se pudo guardar el reporte:", err)
    return { ok: false, error: "No pudimos enviarlo ahora. Inténtalo más tarde." }
  }
}
