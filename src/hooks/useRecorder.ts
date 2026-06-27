import { useCallback, useEffect, useRef, useState } from "react"

/**
 * Grabación de voz por paso para el Simulacro TEA, con MediaRecorder.
 *
 * - `enable()` pide permiso de micrófono una vez (toda la sesión usa el mismo
 *   stream). Devuelve true si quedó habilitado.
 * - `startStep()` arranca a grabar el paso actual.
 * - `stopStep()` corta y devuelve un objectURL del audio grabado (o null).
 * - `disable()` libera el micrófono.
 *
 * Las grabaciones viven solo en memoria (objectURLs) — no se suben a ningún
 * lado. Se usan para que el candidato se escuche al final del simulacro.
 */
export function useRecorder() {
  const supported =
    typeof navigator !== "undefined" &&
    !!navigator.mediaDevices?.getUserMedia &&
    typeof MediaRecorder !== "undefined"

  const streamRef = useRef<MediaStream | null>(null)
  const recRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const urlsRef = useRef<string[]>([])
  const [active, setActive] = useState(false)

  const disable = useCallback(() => {
    try {
      recRef.current?.state !== "inactive" && recRef.current?.stop()
    } catch { /* noop */ }
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    recRef.current = null
    setActive(false)
  }, [])

  const enable = useCallback(async (): Promise<boolean> => {
    if (!supported) return false
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true })
      setActive(true)
      return true
    } catch {
      return false
    }
  }, [supported])

  const startStep = useCallback(() => {
    if (!streamRef.current) return
    try {
      chunksRef.current = []
      const rec = new MediaRecorder(streamRef.current)
      rec.ondataavailable = (e) => { if (e.data.size) chunksRef.current.push(e.data) }
      rec.start()
      recRef.current = rec
    } catch { /* noop */ }
  }, [])

  const stopStep = useCallback((): Promise<string | null> => {
    return new Promise((resolve) => {
      const rec = recRef.current
      if (!rec || rec.state === "inactive") return resolve(null)
      rec.onstop = () => {
        if (!chunksRef.current.length) return resolve(null)
        const blob = new Blob(chunksRef.current, { type: rec.mimeType || "audio/webm" })
        const url = URL.createObjectURL(blob)
        urlsRef.current.push(url)
        resolve(url)
      }
      try { rec.stop() } catch { resolve(null) }
    })
  }, [])

  // Limpieza: cortar micrófono y revocar URLs al desmontar.
  useEffect(() => {
    return () => {
      disable()
      urlsRef.current.forEach((u) => URL.revokeObjectURL(u))
      urlsRef.current = []
    }
  }, [disable])

  return { supported, active, enable, startStep, stopStep, disable }
}
