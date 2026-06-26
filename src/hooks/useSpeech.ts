import { useCallback, useEffect, useRef, useState } from "react"

/**
 * Hook fino sobre la Web Speech API (speechSynthesis) para "reproducir" los
 * transcripts del módulo de comprensión como si fueran audios de radio.
 *
 * - Carga las voces de forma async (en Chrome llegan por el evento
 *   `voiceschanged`, que puede dispararse después del primer render).
 * - Prefiere una voz en inglés (en-GB o en-US).
 * - Expone `supported` para que la UI haga fallback (mostrar transcript) si el
 *   navegador no tiene síntesis de voz o no hay voz en inglés.
 *
 * Nota: el examen real usa audios con acentos variados y ruido; esto es voz
 * sintetizada, sirve para practicar comprensión, no para imitar fidelidad.
 */
export function useSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [speaking, setSpeaking] = useState(false)
  const supported =
    typeof window !== "undefined" && "speechSynthesis" in window

  // Mantener referencia al utterance activo para cancelarlo limpio.
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (!supported) return
    const synth = window.speechSynthesis
    const load = () => setVoices(synth.getVoices())
    load()
    synth.addEventListener("voiceschanged", load)
    return () => {
      synth.removeEventListener("voiceschanged", load)
      synth.cancel()
    }
  }, [supported])

  const pickVoice = useCallback(() => {
    if (!voices.length) return null
    // Preferencia: en-GB, luego en-US, luego cualquier inglés, luego nada.
    return (
      voices.find((v) => /^en-GB/i.test(v.lang)) ??
      voices.find((v) => /^en-US/i.test(v.lang)) ??
      voices.find((v) => /^en/i.test(v.lang)) ??
      null
    )
  }, [voices])

  const hasEnglishVoice = supported && pickVoice() != null

  const speak = useCallback(
    (text: string, opts?: { onEnd?: () => void }) => {
      if (!supported) {
        opts?.onEnd?.()
        return
      }
      const synth = window.speechSynthesis
      synth.cancel() // corta cualquier reproducción previa
      const u = new SpeechSynthesisUtterance(text)
      const v = pickVoice()
      if (v) u.voice = v
      u.lang = v?.lang ?? "en-US"
      u.rate = 0.92 // un pelín más lento que natural, como ATC claro
      u.pitch = 1
      u.onstart = () => setSpeaking(true)
      u.onend = () => {
        setSpeaking(false)
        opts?.onEnd?.()
      }
      u.onerror = () => {
        setSpeaking(false)
        opts?.onEnd?.()
      }
      utterRef.current = u
      synth.speak(u)
    },
    [supported, pickVoice],
  )

  const stop = useCallback(() => {
    if (!supported) return
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [supported])

  return { speak, stop, speaking, supported, hasEnglishVoice }
}
