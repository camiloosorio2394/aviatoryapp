import { useCallback, useEffect, useRef, useState } from "react"
import { AlertTriangle, Bookmark, CheckCircle2, ChevronRight, Loader2, XCircle } from "lucide-react"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import { FiguraEnunciado, FiguraOpcion } from "./FiguraPsico"
import { ReportarProblema } from "@/components/ReportarProblema"
import type { CorreccionPsico, SesionPsico } from "@/services/psicotecnicas"
import type { ErrorEvaluacion } from "@/services/rpc"

interface Props {
  sesion: SesionPsico
  /** Entrenamiento: registra y espera la corrección. null si no se pudo. */
  onCorregir: (posicion: number, opcion: number, segundos: number) => Promise<CorreccionPsico | null>
  /** Evaluación y simulación: registra sin esperar. opcion null = se acabó el tiempo. */
  onRegistrar: (posicion: number, opcion: number | null, segundos: number) => void
  onAplazar: (posicion: number) => void
  onTerminar: () => void
  /** Lo último que falló al hablar con el servidor, para decírselo al piloto. */
  errorAccion: ErrorEvaluacion | null
}

/**
 * El aro del reloj.
 *
 * Enseña el tiempo que queda sin obligar a leer la cifra, que es lo que se
 * agradece cuando la cabeza está en el ejercicio. Se vacía en sentido horario
 * desde arriba y en los últimos diez segundos pasa a ámbar; no parpadea, y a
 * cero se queda vacío y en rojo en vez de desaparecer.
 */
function AroReloj({ restante, limite }: { restante: number; limite: number }) {
  const radio = 15
  const vuelta = 2 * Math.PI * radio
  const parte = limite > 0 ? Math.max(0, Math.min(1, restante / limite)) : 0
  const apurado = restante <= 10 && restante > 0

  return (
    <svg width="38" height="38" viewBox="0 0 38 38" aria-hidden className="shrink-0 -rotate-90">
      <circle cx="19" cy="19" r={radio} fill="none" stroke="var(--border)" strokeWidth="3" />
      <circle
        className="pj-aro"
        cx="19"
        cy="19"
        r={radio}
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        stroke={
          restante === 0
            ? "var(--av-red-400)"
            : apurado
              ? "var(--av-amber-400)"
              : "var(--av-blue-500)"
        }
        strokeDasharray={vuelta}
        strokeDashoffset={vuelta * (1 - parte)}
      />
    </svg>
  )
}

/**
 * El reproductor de ejercicios cronometrados.
 *
 * Los tres modos comparten mecanismo y se diferencian en dos decisiones:
 *
 * — Entrenamiento corrige al momento (la corrección la da el servidor) y deja
 *   seguir aunque el reloj llegue a cero, porque ahí el cronómetro es una
 *   referencia y no un examen. Que se pasara del tiempo igual queda registrado:
 *   es justo el dato que hay que mejorar.
 * — Evaluación y simulación no corrigen nada durante la prueba y pasan sola de
 *   ejercicio al agotarse el tiempo, contándolo como no respondido. Enseñar el
 *   acierto en mitad de una prueba cambia lo que mide. La respuesta sale hacia
 *   el servidor sin esperar: cada milisegundo entre un ejercicio y el siguiente
 *   es tiempo que en la prueba real no se pierde.
 *
 * Durante el ejercicio la pantalla no muestra nada que no haga falta: número,
 * barra, reloj y el ejercicio. Ni menú, ni categoría, ni explicaciones.
 */
export function PsicoPlayer({ sesion, onCorregir, onRegistrar, onAplazar, onTerminar, errorAccion }: Props) {
  const { ejercicios, modo } = sesion

  /**
   * El orden real de la tanda.
   *
   * Empieza siendo el de entrada y cambia cuando el piloto deja un ejercicio
   * para el final: ese se va al fondo de la cola. Es la estrategia de
   * cualquier prueba con reloj —saltar el que se atasca y volver con el tiempo
   * que sobre— y hasta ahora no se podía entrenar aquí.
   */
  const [orden, setOrden] = useState<number[]>(() => ejercicios.map((_, i) => i))
  /** Los que ya se aplazaron una vez: no se puede aplazar dos veces. */
  const [aplazados, setAplazados] = useState<Set<number>>(() => new Set())
  const [indice, setIndice] = useState(0)
  const [elegida, setElegida] = useState<number | null>(null)
  const [correccion, setCorreccion] = useState<CorreccionPsico | null>(null)
  const [comprobando, setComprobando] = useState(false)
  const [restante, setRestante] = useState(() => ejercicios[0]?.limite ?? 0)

  const inicio = useRef<number>(0)
  const restanteRef = useRef(restante)

  /** Mueve el reloj: el estado para pintar y el ref para que lo lea el propio
   *  intervalo sin volver a montarse. */
  const ponerRestante = useCallback((s: number) => {
    restanteRef.current = s
    setRestante(s)
  }, [])

  // El cronómetro del primer ejercicio arranca al montar. Leer el reloj durante
  // el render es impuro, así que se fija desde un efecto.
  useEffect(() => {
    inicio.current = Date.now()
  }, [])
  const ejercicio = ejercicios[orden[indice]]
  const limite = ejercicio?.limite ?? 0
  const corrigeAlMomento = modo === "entrenamiento"
  const revelado = correccion !== null

  const segundosEnPantalla = useCallback(() => Math.round((Date.now() - inicio.current) / 1000), [])

  /** Pasa al siguiente ejercicio, o cierra la tanda si era el último. */
  const avanzar = useCallback(() => {
    const siguiente = indice + 1
    if (siguiente >= orden.length) {
      onTerminar()
      return
    }
    setIndice(siguiente)
    setElegida(null)
    setCorreccion(null)
    ponerRestante(ejercicios[orden[siguiente]].limite)
    inicio.current = Date.now()
  }, [ejercicios, indice, onTerminar, orden, ponerRestante])

  /**
   * Deja el ejercicio para el final: se va al fondo de la cola y el reloj
   * arranca de nuevo cuando vuelva.
   *
   * El tiempo que se registra es el de la pasada en que se responde, no la
   * suma de las dos. Es lo que pasa en una prueba real: se vuelve a la
   * pregunta con la cabeza fresca, y lo que mide el reloj es esa vuelta. El
   * servidor lo sabe porque también se le avisa.
   */
  const aplazar = useCallback(() => {
    if (!ejercicio || revelado || comprobando) return
    const posicion = orden[indice]
    const resto = orden.filter((_, i) => i !== indice)
    onAplazar(ejercicio.posicion)
    setOrden([...resto, posicion])
    setAplazados((previos) => new Set(previos).add(posicion))
    setElegida(null)
    ponerRestante(ejercicios[resto[indice] ?? posicion].limite)
    inicio.current = Date.now()
  }, [comprobando, ejercicio, ejercicios, indice, onAplazar, orden, revelado, ponerRestante])

  // El reloj descuenta y además decide qué pasa al llegar a cero, desde el
  // propio temporizador. Lo que NO se puede hacer, y por eso no se hace, es
  // avanzar desde dentro del actualizador de estado: eso dispara una
  // actualización de otro componente en mitad del render de este.
  //
  // En entrenamiento el cero no expulsa: se queda ahí y solo avisa. En los
  // otros dos modos cierra el ejercicio como no respondido.
  useEffect(() => {
    if (!ejercicio || revelado || comprobando) return
    const t = window.setInterval(() => {
      const s = restanteRef.current
      const siguiente = s <= 1 ? 0 : s - 1
      ponerRestante(siguiente)
      if (siguiente === 0 && !corrigeAlMomento) {
        onRegistrar(ejercicio.posicion, null, segundosEnPantalla())
        avanzar()
      }
    }, 1000)
    return () => window.clearInterval(t)
  }, [ejercicio, revelado, comprobando, corrigeAlMomento, avanzar, onRegistrar, ponerRestante, segundosEnPantalla])

  if (!ejercicio) return null

  async function responder(i: number) {
    if (revelado || comprobando) return
    const segundos = segundosEnPantalla()
    if (!corrigeAlMomento) {
      // Sin corrección al momento, elegir es contestar y pasar.
      onRegistrar(ejercicio.posicion, i, segundos)
      avanzar()
      return
    }
    setElegida(i)
    setComprobando(true)
    const c = await onCorregir(ejercicio.posicion, i, segundos)
    setComprobando(false)
    if (c) setCorreccion(c)
    // Si no llegó la corrección, el aviso de error queda a la vista y se puede volver a elegir.
    else setElegida(null)
  }

  const acertado = correccion?.correcta === true
  const primera = indice === 0
  const yaAplazado = aplazados.has(orden[indice])
  // Aplazar solo tiene sentido si queda algo por delante a donde mandarlo.
  const puedeAplazar = !revelado && !comprobando && !yaAplazado && indice < orden.length - 1
  const progreso = Math.round((indice / orden.length) * 100)
  const apurado = restante <= 10
  const agotado = restante === 0

  return (
    <div className="psico-juego max-w-[900px] mx-auto">
      {/* Barra de estado: lo único que acompaña al ejercicio */}
      <div className="flex items-center gap-4 mb-3">
        <div className="text-[13px] font-semibold tabular-nums text-muted-foreground whitespace-nowrap">
          {indice + 1} / {orden.length}
        </div>
        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-[width] duration-300"
            style={{ width: `${progreso}%`, background: "var(--av-blue-500)" }}
          />
        </div>
        <div
          className="flex items-center gap-2 text-[15px] font-semibold tabular-nums whitespace-nowrap"
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
          <AroReloj restante={restante} limite={limite} />
          {String(Math.floor(restante / 60)).padStart(2, "0")}:
          {String(restante % 60).padStart(2, "0")}
        </div>
      </div>

      <div className="rounded-2xl surface p-5 sm:p-7">
        <h2 className="text-[17px] sm:text-[19px] font-semibold leading-snug tracking-[-0.01em]">
          {ejercicio.enunciado}
        </h2>

        {/* Los ejercicios dibujados mandan sobre el recorte: son los que no
            llevan marcas ajenas encima y se leen sin ampliar. */}
        {/* La figura entra subiendo diez píxeles la primera vez que se abre la
            sesión: plantarse de golpe se lee como un salto de maquetación. De
            ahí en adelante NO se anima nada, porque cada milisegundo entre un
            ejercicio y el siguiente es tiempo perdido que en la prueba real no
            se pierde. */}
        {ejercicio.figura ? (
          <div className={primera ? "ln-aparece ln-visible" : undefined}>
            <FiguraEnunciado figura={ejercicio.figura} />
          </div>
        ) : (
          ejercicio.imagen && (
            <div className="mt-4 rounded-xl border border-border bg-white p-3 overflow-x-auto">
              <img
                src={ejercicio.imagen}
                alt={ejercicio.imagenAlt ?? ejercicio.enunciado}
                className="mx-auto max-w-full h-auto"
                // El ejercicio es la imagen: si tarda, la pantalla no sirve.
                loading="eager"
              />
            </div>
          )
        )}

        {/* Cuando la figura ya trae dibujadas sus alternativas, los botones son
            solo las letras: repetir "A) B) C)" debajo no aporta y aleja el
            cursor de lo que el piloto está mirando. */}
        <div
          className={
            ejercicio.figura
              ? "mt-5 flex flex-wrap gap-3"
              : ejercicio.opcionesEnImagen
                ? "mt-5 flex flex-wrap gap-2"
                : "mt-5 grid gap-2 sm:grid-cols-2"
          }
        >
          {ejercicio.opciones.map((opcion, i) => {
            const esCorrecta = revelado && i === correccion.respuesta
            const esFallo = revelado && i === elegida && !acertado
            // En entrenamiento el cero no cierra nada, así que las opciones
            // siguen activas: es lo que promete el aviso de abajo.
            const bloqueado = revelado || comprobando || (agotado && !corrigeAlMomento)
            return (
              <button
                key={opcion + i}
                type="button"
                onClick={() => void responder(i)}
                disabled={bloqueado}
                aria-label={
                  ejercicio.figura || ejercicio.opcionesEnImagen
                    ? `Opción ${opcion}`
                    : undefined
                }
                className={[
                  "pj-opcion rounded-xl border text-left",
                  ejercicio.figura
                    ? "flex flex-col items-center gap-1 p-2"
                    : ejercicio.opcionesEnImagen
                      ? "h-12 w-14 flex items-center justify-center text-[17px] font-semibold"
                      : "px-4 py-3 text-[15px]",
                  bloqueado ? "cursor-default" : "hover:bg-muted",
                ].join(" ")}
                style={{
                  borderColor: esCorrecta
                    ? "var(--av-green-400)"
                    : esFallo
                      ? "var(--av-red-400)"
                      : comprobando && i === elegida
                        ? "var(--av-blue-500)"
                        : "var(--border)",
                  background: esCorrecta
                    ? "color-mix(in oklab, var(--av-green-400) 12%, transparent)"
                    : esFallo
                      ? "color-mix(in oklab, var(--av-red-400) 12%, transparent)"
                      : undefined,
                }}
              >
                {ejercicio.figura ? (
                  <>
                    <FiguraOpcion figura={ejercicio.figura} indice={i} />
                    <span className="text-[13px] font-semibold text-muted-foreground">
                      {opcion}
                    </span>
                  </>
                ) : (
                  <>
                    {!ejercicio.opcionesEnImagen && (
                      <span className="font-semibold mr-2 text-muted-foreground">
                        {String.fromCharCode(65 + i)}.
                      </span>
                    )}
                    {opcion}
                  </>
                )}
              </button>
            )
          })}
        </div>

        {comprobando && (
          <p className="mt-4 inline-flex items-center gap-2 text-[13px] text-muted-foreground" role="status">
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Comprobando tu respuesta...
          </p>
        )}

        {errorAccion && !comprobando && (
          <div
            className="mt-4 rounded-lg border border-border bg-muted/40 p-3 flex items-start gap-2.5"
            role="alert"
          >
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--av-amber-400)" }} aria-hidden />
            <p className="m-0 text-[13px] text-muted-foreground leading-relaxed">{errorAccion.message}</p>
          </div>
        )}

        {/* Dejar uno para el final. La cola lo devuelve al terminar la tanda,
            con el reloj de nuevo a cero: es cómo se hace en una prueba real. */}
        {puedeAplazar && (
          <button
            type="button"
            onClick={aplazar}
            className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Bookmark className="h-3.5 w-3.5" /> Dejarlo para el final
          </button>
        )}
        {yaAplazado && !revelado && (
          <p className="mt-4 text-[13px] text-muted-foreground">
            Este lo dejaste para el final. Ahora toca responderlo.
          </p>
        )}

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
                : `Respuesta correcta: ${ejercicio.opciones[correccion.respuesta]}`}
            </div>
            <p className="mt-2 text-[15px] leading-relaxed text-foreground/90">
              {correccion.explicacion}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-muted-foreground">
              <span>{correccion.subcategoria}</span>
              {correccion.fuente && (
                <>
                  <span>·</span>
                  <span>{correccion.fuente}</span>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={avanzar}
              className={appButtonClass({ size: "lg" }, "mt-5")}
              style={appButtonStyle()}
            >
              {indice + 1 === orden.length ? "Ver resultado" : "Siguiente"}
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* El reporte va aquí y no en mitad del ejercicio: mientras el
                reloj corre, cualquier cosa que no sea el ejercicio roba tiempo.
                Con la respuesta ya revelada, el piloto acaba de mirar la figura
                con calma y es justo cuando sabe si algo no cuadraba. */}
            <ReportarProblema
              modulo="psicotecnicas"
              ejercicioId={correccion.id}
              extra={{
                modo,
                eligio: elegida === null ? null : ejercicio.opciones[elegida],
                correcta: ejercicio.opciones[correccion.respuesta],
                dibujada: Boolean(ejercicio.figura),
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
