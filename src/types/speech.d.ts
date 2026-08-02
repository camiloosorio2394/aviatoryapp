/**
 * Tipos mínimos de la API de reconocimiento de voz del navegador.
 *
 * `lib.dom` de esta versión de TypeScript (6.0) ya trae los tipos de los
 * eventos y los resultados (`SpeechRecognitionEvent`,
 * `SpeechRecognitionResultList`, `SpeechRecognitionResult`,
 * `SpeechRecognitionAlternative`, `SpeechRecognitionErrorEvent`), pero NO trae
 * la interfaz del reconocedor ni su constructor en `window`. Comprobado.
 *
 * Aquí se declara solo lo que falta, y solo lo que el hook usa. No es la
 * especificación completa a propósito: declarar de más obliga a mantenerlo el
 * día que `lib.dom` lo incorpore.
 */

interface SpeechRecognition extends EventTarget {
  lang: string
  continuous: boolean
  interimResults: boolean
  maxAlternatives: number

  start(): void
  stop(): void
  abort(): void

  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null
  onend: ((this: SpeechRecognition, ev: Event) => void) | null
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null
}

declare const SpeechRecognition: {
  prototype: SpeechRecognition
  new (): SpeechRecognition
}

interface Window {
  /** Presente en Safari y en Chrome antiguo. */
  webkitSpeechRecognition?: typeof SpeechRecognition
  /** Presente en Chrome y Edge recientes. Ausente en Firefox. */
  SpeechRecognition?: typeof SpeechRecognition
}
