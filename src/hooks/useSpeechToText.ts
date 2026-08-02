import { useCallback, useEffect, useRef, useState } from "react"

/**
 * Dictado con el reconocedor de voz del navegador.
 *
 * Es gratis y no necesita clave, pero NO es local: Chrome manda el audio a los
 * servidores de Google y Safari a los de Apple. Por eso el consentimiento del
 * piloto es obligatorio antes de la primera vez (ver `lib/dictado.ts`).
 *
 * Mismo estilo que `useRecorder`: soporte, estado, texto y dos acciones.
 *
 * Hay cuatro trampas en esta API y las cuatro están resueltas aquí:
 *
 *   1. SE CORTA SOLO. Chrome lo detiene tras unos segundos de silencio, y a
 *      veces sin motivo. Se lleva una bandera de "el usuario quiere seguir" y
 *      en `onend` se vuelve a arrancar mientras siga puesta.
 *   2. DOS SABORES DE RESULTADO. Los `isFinal` se ACUMULAN; el parcial es solo
 *      el último y se REEMPLAZA. Acumular los parciales repite el texto.
 *   3. FIREFOX NO LO SOPORTA. Se detecta y se dice, en vez de dejar un botón
 *      que no hace nada.
 *   4. LOS TIPOS. Declarados en `src/types/speech.d.ts`, sin `any`.
 */

/** El constructor, con el prefijo de Safari como respaldo. */
function constructorDeReconocedor(): typeof SpeechRecognition | null {
  if (typeof window === "undefined") return null
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null
}

export type ErrorDictado = "sin-permiso" | "sin-microfono" | "sin-red" | "sin-voz" | "otro"

/** Traduce el código del navegador a algo que se le pueda decir al piloto. */
function traducirError(codigo: string): ErrorDictado {
  if (codigo === "not-allowed" || codigo === "service-not-allowed") return "sin-permiso"
  if (codigo === "audio-capture") return "sin-microfono"
  if (codigo === "network") return "sin-red"
  if (codigo === "no-speech") return "sin-voz"
  return "otro"
}

export interface EstadoDictado {
  /** Si el navegador tiene la API. Falso en Firefox. */
  soportado: boolean
  escuchando: boolean
  /** Lo ya reconocido en firme. Es lo que se guarda. */
  texto: string
  /** Lo que está reconociendo ahora mismo. Cambia en cada evento. */
  parcial: string
  error: ErrorDictado | null
  /** Media de la confianza de los tramos finales, de 0 a 1. Null si no hay. */
  confianza: number | null
  /** Segundos de dictado, del primer arranque al último parado. */
  segundos: number
  /**
   * Cuántas veces el navegador cortó solo y hubo que volver a arrancar.
   *
   * No es decoración: es el dato que dice si esta API aguanta una respuesta de
   * 60 segundos, que es lo que hay que medir antes de extenderla al resto del
   * módulo.
   */
  reenganches: number
  empezar: () => void
  parar: () => void
  limpiar: () => void
}

export function useSpeechToText(idioma = "en-US"): EstadoDictado {
  const [soportado] = useState(() => constructorDeReconocedor() !== null)
  const [escuchando, setEscuchando] = useState(false)
  const [texto, setTexto] = useState("")
  const [parcial, setParcial] = useState("")
  const [error, setError] = useState<ErrorDictado | null>(null)
  const [confianza, setConfianza] = useState<number | null>(null)
  const [segundos, setSegundos] = useState(0)
  const [reenganches, setReenganches] = useState(0)

  const rec = useRef<SpeechRecognition | null>(null)
  /** Trampa 1: lo que el USUARIO quiere, que no es lo mismo que lo que hace la API. */
  const queriendo = useRef(false)
  const desde = useRef<number | null>(null)

  /**
   * El texto va en dos niveles, y hace falta.
   *
   * Dentro de una sesión, los finales se reconstruyen enteros en cada evento en
   * vez de ir sumando lo nuevo. Es idempotente: si el motor reenvía un tramo
   * que ya había dado por final (y hay motores que lo hacen), no sale repetido.
   *
   * Entre sesiones no sirve, porque al reenganchar el reconocedor empieza con
   * la lista de resultados vacía. Por eso lo de las sesiones anteriores se
   * guarda aparte y se antepone.
   */
  const textoPrevio = useRef("")
  const confianzasPrevias = useRef<number[]>([])
  const textoSesion = useRef("")
  const confianzasSesion = useRef<number[]>([])

  /**
   * Cierra el tramo de tiempo abierto y lo suma.
   *
   * El delta se calcula AQUÍ y no dentro del actualizador de `setSegundos`: ese
   * se ejecuta más tarde, y para entonces `desde` ya vale null. Leerlo ahí
   * daba `Date.now()` entero, o sea la marca de tiempo de 1970 en segundos como
   * "duración". Se vio en la primera prueba del hook.
   */
  const cerrarTramo = useCallback(() => {
    if (desde.current === null) return
    const transcurrido = Math.round((Date.now() - desde.current) / 1000)
    desde.current = null
    setSegundos((s) => s + transcurrido)
  }, [])

  const parar = useCallback(() => {
    queriendo.current = false
    rec.current?.stop()
    setEscuchando(false)
    cerrarTramo()
    setParcial("")
  }, [cerrarTramo])

  const empezar = useCallback(() => {
    const Ctor = constructorDeReconocedor()
    if (!Ctor) return

    setError(null)
    queriendo.current = true
    desde.current = Date.now()

    const r = new Ctor()
    r.lang = idioma // El TEA es de inglés: con el idioma del navegador no sirve.
    r.continuous = true
    r.interimResults = true
    r.maxAlternatives = 1

    r.onresult = (e: SpeechRecognitionEvent) => {
      // Trampa 2: los finales van a `texto`, el parcial se REEMPLAZA. Y los
      // finales se reconstruyen desde el índice 0, no desde `e.resultIndex`:
      // así el resultado no depende de que el motor no reenvíe un tramo que ya
      // había cerrado, que es la diferencia entre salir bien y salir repetido.
      let finales = ""
      let enCurso = ""
      const confs: number[] = []
      for (let i = 0; i < e.results.length; i++) {
        const resultado = e.results[i]
        const alternativa = resultado[0]
        if (resultado.isFinal) {
          finales += alternativa.transcript + " "
          if (typeof alternativa.confidence === "number" && alternativa.confidence > 0) {
            confs.push(alternativa.confidence)
          }
        } else {
          enCurso += alternativa.transcript
        }
      }
      textoSesion.current = finales
      confianzasSesion.current = confs

      setTexto((textoPrevio.current + finales).replace(/\s+/g, " "))
      const todas = [...confianzasPrevias.current, ...confs]
      setConfianza(todas.length ? todas.reduce((a, b) => a + b, 0) / todas.length : null)
      setParcial(enCurso)
    }

    r.onerror = (e: SpeechRecognitionErrorEvent) => {
      const tipo = traducirError(e.error)
      // "no-speech" salta con cualquier pausa larga y no es un fallo: el
      // reenganche de onend lo resuelve solo. Avisar de eso sería ruido.
      if (tipo === "sin-voz") return
      setError(tipo)
      queriendo.current = false
      setEscuchando(false)
    }

    r.onend = () => {
      // La sesión que termina pasa a ser "lo previo": al reenganchar, el
      // reconocedor arranca con la lista de resultados vacía y lo dicho hasta
      // aquí se perdería.
      textoPrevio.current = (textoPrevio.current + textoSesion.current).replace(/\s+/g, " ")
      confianzasPrevias.current = [...confianzasPrevias.current, ...confianzasSesion.current]
      textoSesion.current = ""
      confianzasSesion.current = []

      // Trampa 1: si el usuario no dijo de parar, volvemos a arrancar.
      if (queriendo.current) {
        setReenganches((n) => n + 1)
        try {
          r.start()
          return
        } catch {
          // Arrancar sobre un reconocedor a medio cerrar lanza. Se deja parado
          // en vez de quedarse en un bucle de intentos.
          queriendo.current = false
        }
      }
      setEscuchando(false)
      cerrarTramo()
    }

    rec.current = r
    try {
      r.start()
      setEscuchando(true)
    } catch {
      queriendo.current = false
      setError("otro")
    }
  }, [idioma, cerrarTramo])

  const limpiar = useCallback(() => {
    textoPrevio.current = ""
    textoSesion.current = ""
    confianzasPrevias.current = []
    confianzasSesion.current = []
    setTexto("")
    setParcial("")
    setConfianza(null)
    setSegundos(0)
    setReenganches(0)
    setError(null)
  }, [])

  // Salir de la pantalla con el micrófono abierto lo deja abierto.
  useEffect(() => {
    return () => {
      queriendo.current = false
      rec.current?.abort()
    }
  }, [])

  return {
    soportado,
    escuchando,
    texto: texto.trim(),
    parcial,
    error,
    confianza,
    segundos,
    reenganches,
    empezar,
    parar,
    limpiar,
  }
}

/** Cuenta palabras de una transcripción. Vacía es cero, no uno. */
export function contarPalabras(t: string): number {
  const limpio = t.trim()
  return limpio === "" ? 0 : limpio.split(/\s+/).length
}
