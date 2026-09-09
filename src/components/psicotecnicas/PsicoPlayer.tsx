import { useCallback, useEffect, useRef, useState } from "react"
import { CheckCircle2, ChevronRight, Clock, XCircle } from "lucide-react"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import {
  type EjercicioPsico,
  type ModoPsico,
  type NivelPsico,
  type RespuestaPsico,
  tiempoDe,
} from "@/lib/psicotecnicas"

interface Props {
  ejercicios: EjercicioPsico[]
  modo: ModoPsico
  nivel: NivelPsico | "todos"
  onTerminar: (respuestas: RespuestaPsico[]) => void
}

/**
 * El reproductor de ejercicios cronometrados.
 *
 * Los tres modos comparten mecanismo y se diferencian en dos decisiones:
 *
 * — Entrenamiento corrige al momento y deja seguir aunque el reloj llegue a
 *   cero, porque ahí el cronómetro es una referencia y no un examen. Que se
 *   pasara del tiempo igual queda registrado: es justo el dato que hay que
 *   mejorar.
 * — Evaluación y simulación no corrigen nada durante la prueba y pasan sola de
 *   ejercicio al agotarse el tiempo, contándolo como no respondido. Enseñar el
 *   acierto en mitad de una prueba cambia lo que mide.
 *
 * Durante el ejercicio la pantalla no muestra nada que no haga falta: número,
 * barra, reloj y el ejercicio. Ni menú, ni categoría, ni explicaciones.
 */
export function PsicoPlayer({ ejercicios, modo, nivel, onTerminar }: Props) {
  const [indice, setIndice] = useState(0)
  const [elegida, setElegida] = useState<number | null>(null)
  const [revelado, setRevelado] = useState(false)
  const [restante, setRestante] = useState(() =>
    ejercicios.length > 0 ? tiempoDe(ejercicios[0], modo, nivel) : 0
  )

  const respuestas = useRef<RespuestaPsico[]>([])
  const inicio = useRef<number>(Date.now())
  const ejercicio = ejercicios[indice]
  const limite = ejercicio ? tiempoDe(ejercicio, modo, nivel) : 0
  const corrigeAlMomento = modo === "entrenamiento"

  /**
   * Cierra el ejercicio actual y avanza. `eleccion` es null cuando se acabó el
   * tiempo sin responder.
   */
  const avanzar = useCallback(
    (eleccion: number | null) => {
      if (!ejercicio) return
      const segundos = Math.round((Date.now() - inicio.current) / 1000)
      respuestas.current.push({
        id: ejercicio.id,
        categoria: ejercicio.categoria,
        elegida: eleccion,
        correcta: eleccion === ejercicio.respuesta,
        segundos,
        limite,
      })

      const siguiente = indice + 1
      if (siguiente >= ejercicios.length) {
        onTerminar(respuestas.current)
        return
      }
      setIndice(siguiente)
      setElegida(null)
      setRevelado(false)
      setRestante(tiempoDe(ejercicios[siguiente], modo, nivel))
      inicio.current = Date.now()
    },
    [ejercicio, ejercicios, indice, limite, modo, nivel, onTerminar]
  )

  // El reloj solo descuenta. Quien decide qué pasa al llegar a cero es el
  // efecto de abajo: avanzar desde dentro del actualizador de estado dispara
  // una actualización de otro componente en mitad del render de este.
  useEffect(() => {
    if (!ejercicio || revelado) return
    const t = window.setInterval(() => {
      setRestante((s) => (s <= 1 ? 0 : s - 1))
    }, 1000)
    return () => window.clearInterval(t)
  }, [ejercicio, revelado])

  // En entrenamiento el cero no expulsa: se queda ahí y solo avisa. En los
  // otros dos modos cierra el ejercicio como no respondido.
  useEffect(() => {
    if (restante !== 0 || corrigeAlMomento || revelado) return
    avanzar(null)
  }, [restante, corrigeAlMomento, revelado, avanzar])

  if (!ejercicio) return null

  function responder(i: number) {
    if (revelado) return
    if (corrigeAlMomento) {
      setElegida(i)
      setRevelado(true)
    } else {
      // Sin corrección al momento, elegir es contestar y pasar.
      avanzar(i)
    }
  }

  const acertado = revelado && elegida === ejercicio.respuesta
  const progreso = Math.round((indice / ejercicios.length) * 100)
  const apurado = restante <= 10
  const agotado = restante === 0

  return (
    <div className="max-w-[900px] mx-auto">
      {/* Barra de estado: lo único que acompaña al ejercicio */}
      <div className="flex items-center gap-4 mb-3">
        <div className="text-[13px] font-semibold tabular-nums text-muted-foreground whitespace-nowrap">
          {indice + 1} / {ejercicios.length}
        </div>
        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-[width] duration-300"
            style={{ width: `${progreso}%`, background: "var(--av-blue-500)" }}
          />
        </div>
        <div
          className="flex items-center gap-1.5 text-[15px] font-semibold tabular-nums whitespace-nowrap"
          style={{
            color: agotado
              ? "var(--av-red-400)"
              : apurado
                ? "var(--av-amber-400)"
                : "var(--foreground)",
          }}
          // El reloj cambia solo; sin esto un lector de pantalla no se entera.
          role="timer"
          aria-live={apurado ? "polite" : "off"}
        >
          <Clock className="h-4 w-4" />
          {String(Math.floor(restante / 60)).padStart(2, "0")}:
          {String(restante % 60).padStart(2, "0")}
        </div>
      </div>

      <div className="rounded-2xl surface p-5 sm:p-7">
        <h2 className="text-[17px] sm:text-[19px] font-semibold leading-snug tracking-[-0.01em]">
          {ejercicio.enunciado}
        </h2>

        {ejercicio.imagen && (
          <div className="mt-4 rounded-xl border border-border bg-white p-3 overflow-x-auto">
            <img
              src={ejercicio.imagen}
              alt={ejercicio.imagenAlt ?? ejercicio.enunciado}
              className="mx-auto max-w-full h-auto"
              // El ejercicio es la imagen: si tarda, la pantalla no sirve.
              loading="eager"
            />
          </div>
        )}

        {/* Cuando la figura ya trae dibujadas sus alternativas, los botones son
            solo las letras: repetir "A) B) C)" debajo no aporta y aleja el
            cursor de lo que el piloto está mirando. */}
        <div
          className={
            ejercicio.opcionesEnImagen
              ? "mt-5 flex flex-wrap gap-2"
              : "mt-5 grid gap-2 sm:grid-cols-2"
          }
        >
          {ejercicio.opciones.map((opcion, i) => {
            const esCorrecta = revelado && i === ejercicio.respuesta
            const esFallo = revelado && i === elegida && !acertado
            // En entrenamiento el cero no cierra nada, así que las opciones
            // siguen activas: es lo que promete el aviso de abajo.
            const bloqueado = revelado || (agotado && !corrigeAlMomento)
            return (
              <button
                key={opcion + i}
                type="button"
                onClick={() => responder(i)}
                disabled={bloqueado}
                aria-label={
                  ejercicio.opcionesEnImagen ? `Opción ${opcion}` : undefined
                }
                className={[
                  "rounded-xl border text-left transition-colors",
                  ejercicio.opcionesEnImagen
                    ? "h-12 w-14 flex items-center justify-center text-[17px] font-semibold"
                    : "px-4 py-3 text-[15px]",
                  bloqueado ? "cursor-default" : "hover:bg-muted",
                ].join(" ")}
                style={{
                  borderColor: esCorrecta
                    ? "var(--av-green-400)"
                    : esFallo
                      ? "var(--av-red-400)"
                      : "var(--border)",
                  background: esCorrecta
                    ? "color-mix(in oklab, var(--av-green-400) 12%, transparent)"
                    : esFallo
                      ? "color-mix(in oklab, var(--av-red-400) 12%, transparent)"
                      : undefined,
                }}
              >
                {!ejercicio.opcionesEnImagen && (
                  <span className="font-semibold mr-2 text-muted-foreground">
                    {String.fromCharCode(65 + i)}.
                  </span>
                )}
                {opcion}
              </button>
            )
          })}
        </div>

        {/* En entrenamiento el reloj no expulsa, pero deja constancia. */}
        {corrigeAlMomento && agotado && !revelado && (
          <p
            className="mt-4 text-[13px] font-medium"
            style={{ color: "var(--av-amber-400)" }}
          >
            Se acabó el tiempo recomendado. Puedes seguir respondiendo: quedará
            registrado que te pasaste.
          </p>
        )}

        {revelado && (
          <div className="mt-5 pt-5 border-t border-border">
            <div
              className="flex items-center gap-2 text-[15px] font-semibold"
              style={{ color: acertado ? "var(--av-green-400)" : "var(--av-red-400)" }}
            >
              {acertado ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              {acertado
                ? "Correcto"
                : `Respuesta correcta: ${ejercicio.opciones[ejercicio.respuesta]}`}
            </div>
            <p className="mt-2 text-[15px] leading-relaxed text-foreground/90">
              {ejercicio.explicacion}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-muted-foreground">
              <span>{ejercicio.subcategoria}</span>
              <span>·</span>
              <span>{ejercicio.fuente}</span>
            </div>
            <button
              type="button"
              onClick={() => avanzar(elegida)}
              className={appButtonClass({ size: "lg" }, "mt-5")}
              style={appButtonStyle()}
            >
              {indice + 1 === ejercicios.length ? "Ver resultado" : "Siguiente"}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
