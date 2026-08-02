import { useCallback, useEffect, useRef, useState } from "react"
import { supabase } from "@/integrations/supabase/client"

/** Bucket privado de documentos oficiales dentro de Supabase Storage. */
export const DOCS_BUCKET = "documentos-oficiales"

/**
 * Vida de la URL firmada. Corta a propósito: si alguien copia el enlace, deja
 * de servir en una hora. Se renueva sola mientras el visor esté abierto.
 */
const TTL_SEGUNDOS = 60 * 60
/** Se renueva antes de que caduque para que el visor no se quede a medias. */
const MARGEN_MS = 5 * 60 * 1000

interface Estado {
  url: string | null
  loading: boolean
  /** null = sin error. "missing" = el archivo todavía no se ha subido. */
  error: "missing" | "denied" | "unknown" | null
}

/**
 * Entrega una URL firmada temporal de un PDF del bucket privado.
 *
 * El bucket es privado: no hay ruta pública que adivinar. Cada visita genera un
 * enlace que caduca, y se renueva mientras la pestaña siga abierta.
 *
 * Distingue "el archivo no está subido" de "no tienes permiso" porque el primero
 * le pasa al equipo y el segundo al usuario, y merecen mensajes distintos.
 *
 * Sale de `useOfficialBank`, que tenía la ruta fija en el banco de preguntas.
 * Ahora recibe la ruta, que es lo que guarda `library_items.file_url`, para que
 * cualquier documento de la Biblioteca use el mismo camino.
 */
export function usePdfFirmado(ruta: string | null, bucket: string = DOCS_BUCKET) {
  const [estado, setEstado] = useState<Estado>({ url: null, loading: true, error: null })
  const timer = useRef<number | null>(null)
  /**
   * La renovación se agenda a sí misma, así que la función tiene que
   * referenciarse por ref: usarla directamente sería leerla antes de existir.
   */
  const firmarRef = useRef<() => Promise<void>>(async () => {})

  const firmar = useCallback(async () => {
    // Sin ruta no hay nada que firmar. El estado de ese caso lo resuelve el
    // return de abajo, no un setState aquí: hacerlo dentro del efecto encadena
    // renders y es lo que marca la regla de React.
    if (!ruta) return

    const { data, error } = await supabase.storage.from(bucket).createSignedUrl(ruta, TTL_SEGUNDOS)

    if (error || !data?.signedUrl) {
      const msg = (error?.message ?? "").toLowerCase()
      const tipo =
        msg.includes("not found") || msg.includes("does not exist")
          ? "missing"
          : msg.includes("permission") || msg.includes("denied") || msg.includes("unauthorized")
            ? "denied"
            : "unknown"
      setEstado({ url: null, loading: false, error: tipo })
      return
    }

    setEstado({ url: data.signedUrl, loading: false, error: null })

    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(
      () => void firmarRef.current(),
      TTL_SEGUNDOS * 1000 - MARGEN_MS
    )
  }, [ruta, bucket])

  useEffect(() => {
    firmarRef.current = firmar
  }, [firmar])

  useEffect(() => {
    void firmar()
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [firmar])

  // Una ficha de referencia no tiene archivo: se reporta como "no está" sin
  // haber consultado nada.
  if (!ruta) return { url: null, loading: false, error: "missing" as const, retry: firmar }

  return { ...estado, retry: firmar }
}
