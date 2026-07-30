import { useCallback, useEffect, useRef, useState } from "react"
import { supabase } from "@/integrations/supabase/client"

/** Bucket privado del banco oficial dentro de Supabase Storage. */
export const OFFICIAL_BANK_BUCKET = "documentos-oficiales"

/** Vida de la URL firmada. Corta a propósito: si alguien copia el enlace, deja
 *  de servir en una hora. Se renueva sola mientras el visor esté abierto. */
const SIGNED_URL_TTL_SECONDS = 60 * 60
/** Se renueva antes de que caduque para que el visor no se quede a medias. */
const REFRESH_MARGIN_MS = 5 * 60 * 1000

interface State {
  url: string | null
  loading: boolean
  /** null = sin error. "missing" = el archivo todavía no se ha subido. */
  error: "missing" | "denied" | "unknown" | null
}

/**
 * Entrega una URL firmada temporal del banco oficial.
 *
 * El bucket es privado: no hay ruta pública que adivinar. Cada visita genera un
 * enlace que caduca, y se renueva mientras la pestaña siga abierta.
 *
 * Distingue el caso de "archivo no subido todavía" del de "sin permiso" porque
 * el primero le pasa al equipo y el segundo al usuario, y merecen mensajes
 * distintos en pantalla.
 */
export function useOfficialBank() {
  const [state, setState] = useState<State>({ url: null, loading: true, error: null })
  const timer = useRef<number | null>(null)
  /** La renovación se agenda a sí misma, así que la función tiene que
   *  referenciarse por ref: usarla directamente sería leerla antes de existir. */
  const signRef = useRef<() => Promise<void>>(async () => {})

  const sign = useCallback(async () => {
    // Se busca el PDF en lugar de fijar su nombre. Atarlo a un nombre concreto
    // rompe el visor en cuanto alguien sube el archivo tal como lo descargó de
    // Aerocivil, que es justo lo que pasó la primera vez.
    const { data: files, error: listError } = await supabase.storage
      .from(OFFICIAL_BANK_BUCKET)
      .list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } })

    if (listError) {
      const msg = listError.message.toLowerCase()
      setState({
        url: null,
        loading: false,
        error: msg.includes("permission") || msg.includes("denied") ? "denied" : "unknown",
      })
      return
    }

    const pdf = files?.find((f) => f.name.toLowerCase().endsWith(".pdf"))
    if (!pdf) {
      setState({ url: null, loading: false, error: "missing" })
      return
    }

    const { data, error } = await supabase.storage
      .from(OFFICIAL_BANK_BUCKET)
      .createSignedUrl(pdf.name, SIGNED_URL_TTL_SECONDS)

    if (error || !data?.signedUrl) {
      const msg = (error?.message ?? "").toLowerCase()
      const kind = msg.includes("not found") || msg.includes("does not exist")
        ? "missing"
        : msg.includes("permission") || msg.includes("denied") || msg.includes("unauthorized")
          ? "denied"
          : "unknown"
      setState({ url: null, loading: false, error: kind })
      return
    }

    setState({ url: data.signedUrl, loading: false, error: null })

    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => void signRef.current(), SIGNED_URL_TTL_SECONDS * 1000 - REFRESH_MARGIN_MS)
  }, [])

  useEffect(() => {
    signRef.current = sign
  }, [sign])

  useEffect(() => {
    void sign()
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [sign])

  return { ...state, retry: sign }
}
