import { useEffect, useState } from "react"
import { usePrefiereQuieto } from "@/hooks/usePrefiereQuieto"
import { Link } from "react-router-dom"
import { ArrowRight, ChevronDown, RotateCcw } from "lucide-react"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import { FiguraEnunciado, FiguraOpcion } from "./FiguraPsico"
import { ReportarProblema } from "@/components/ReportarProblema"
import {
  CATEGORIAS,
  NOTA_TIEMPOS,
  PSICO_HUB,
  type ResultadoPsico,
  nivelAlcanzado,
} from "@/lib/psicotecnicas"
import type { ItemRepaso } from "@/services/psicotecnicas"

interface Props {
  resultado: ResultadoPsico
  /** El simulacro añade el puntaje global, la velocidad y la precisión. */
  conPuntajeGlobal?: boolean
  /**
   * La tanda con lo que se respondió y la solución de cada ejercicio, que el
   * servidor entrega al cerrarla. Sin esto el informe sigue siendo el mismo,
   * solo que sin la revisión.
   */
  repaso?: ItemRepaso[]
  onRepetir: () => void
}

/**
 * Una cifra que sube desde cero, una sola vez y en seiscientos milisegundos.
 *
 * Es la única animación del informe y llega cuando la prueba ya terminó, así
 * que no le quita tiempo a nadie: sirve para que el ojo se pose en el número
 * en vez de encontrárselo puesto. Con el movimiento reducido activado devuelve
 * el valor final de entrada, sin recorrido.
 */
function useContador(valor: number, activo = true): number {
  const quieto = usePrefiereQuieto()
  const anima = activo && !quieto
  const [animado, setAnimado] = useState(0)

  // Sin animación la cifra es la cifra: se deriva en vez de fijarse desde el
  // efecto, que era un setState en su cuerpo cada vez que el informe se abría
  // con el movimiento reducido puesto.
  const visible = anima ? animado : valor

  useEffect(() => {
    if (!anima) return

    const DURACION = 600
    const desde = Date.now()
    // Con intervalo y no con requestAnimationFrame: el recorrido es corto, el
    // paso es de un cuadro y así la cifra avanza igual en cualquier contexto.
    const t = window.setInterval(() => {
      const parte = Math.min(1, (Date.now() - desde) / DURACION)
      // Frena al final en vez de cortarse en seco.
      setAnimado(Math.round(valor * (1 - Math.pow(1 - parte, 3))))
      if (parte >= 1) window.clearInterval(t)
    }, 16)
    return () => window.clearInterval(t)
  }, [valor, anima])

  return visible
}

/** Dato suelto del informe: cifra grande arriba, etiqueta debajo. */
function Dato({ valor, etiqueta, color }: { valor: string; etiqueta: string; color?: string }) {
  return (
    <div className="rounded-xl border border-border p-4">
      <div
        className="text-[26px] font-semibold tabular-nums leading-none tracking-[-0.02em]"
        style={color ? { color } : undefined}
      >
        {valor}
      </div>
      <div className="mt-1.5 text-[13px] text-muted-foreground leading-snug">{etiqueta}</div>
    </div>
  )
}

/** Barra de una familia, con su porcentaje. */
function BarraCategoria({
  nombre,
  porcentaje,
  detalle,
}: {
  nombre: string
  porcentaje: number
  detalle: string
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <div className="text-[15px] font-medium">{nombre}</div>
        <div className="text-[15px] font-semibold tabular-nums">{porcentaje}%</div>
      </div>
      <div className="mt-1.5 h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${porcentaje}%`,
            background:
              porcentaje >= 75
                ? "var(--av-green-400)"
                : porcentaje >= 50
                  ? "var(--av-amber-400)"
                  : "var(--av-red-400)",
          }}
        />
      </div>
      <div className="mt-1 text-[13px] text-muted-foreground">{detalle}</div>
    </div>
  )
}

/**
 * El informe de una sesión.
 *
 * Muestra exactitud y tiempo por separado, que es como se lee una psicotécnica:
 * acertar despacio y fallar rápido son dos problemas distintos y se corrigen de
 * forma distinta. Por eso el tiempo promedio se abre en aciertos y fallos —si
 * tardas más en las que fallas, estás dudando; si tardas menos, estás
 * disparando— y por eso la velocidad es un puntaje aparte y no una penalización
 * escondida dentro del acierto.
 */
export function PsicoResultado({
  resultado,
  conPuntajeGlobal,
  repaso: tanda,
  onRepetir,
}: Props) {
  const r = resultado
  const cifraGrande = useContador(conPuntajeGlobal ? r.global : r.porcentaje)
  const precision = useContador(r.precision, conPuntajeGlobal)
  const velocidad = useContador(r.velocidad, conPuntajeGlobal)

  /**
   * Lo que hay que repasar: lo fallado y lo que se quedó sin responder.
   *
   * Es donde de verdad se aprende, y hasta ahora la explicación pasaba y no se
   * recuperaba. Los aciertos no entran: repasar lo que ya salió bien es tiempo
   * que no enseña nada.
   */
  const repaso = (tanda ?? []).filter((item) => !item.respuesta.correcta)

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="rounded-2xl surface p-6 sm:p-8">
        <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
          Resultado
        </div>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <div className="text-[44px] font-semibold tabular-nums leading-none tracking-[-0.03em]">
            {cifraGrande}%
          </div>
          <div className="text-[17px] font-medium text-muted-foreground">
            {conPuntajeGlobal ? "resultado global" : nivelAlcanzado(r.porcentaje)}
          </div>
        </div>
        {conPuntajeGlobal && (
          <p className="mt-2 text-[13px] text-muted-foreground">
            El global pesa un 70% la precisión y un 30% la velocidad. Nivel alcanzado:{" "}
            <strong className="text-foreground">{nivelAlcanzado(r.porcentaje)}</strong>.
          </p>
        )}

        <div className="mt-6 grid gap-3 grid-cols-2 sm:grid-cols-4">
          <Dato valor={String(r.total)} etiqueta="Ejercicios realizados" />
          <Dato
            valor={String(r.correctas)}
            etiqueta="Respuestas correctas"
            color="var(--av-green-400)"
          />
          <Dato
            valor={String(r.incorrectas)}
            etiqueta="Respuestas incorrectas"
            color="var(--av-red-400)"
          />
          <Dato valor={String(r.sinResponder)} etiqueta="No respondidas" />
        </div>

        {conPuntajeGlobal && (
          <div className="mt-3 grid gap-3 grid-cols-2">
            <Dato valor={`${precision}%`} etiqueta="Precisión" />
            <Dato valor={`${velocidad}%`} etiqueta="Velocidad" />
          </div>
        )}

        <div className="mt-3 grid gap-3 grid-cols-2 sm:grid-cols-3">
          <Dato valor={`${r.tiempoPromedio} s`} etiqueta="Tiempo promedio" />
          <Dato valor={`${r.tiempoCorrectas} s`} etiqueta="Promedio en las correctas" />
          <Dato valor={`${r.tiempoIncorrectas} s`} etiqueta="Promedio en las incorrectas" />
        </div>

        <div className="mt-3 grid gap-3 grid-cols-2">
          <Dato valor={String(r.dentroDeTiempo)} etiqueta="Respondidos dentro del tiempo" />
          <Dato valor={String(r.fueraDeTiempo)} etiqueta="Respondidos fuera del tiempo" />
        </div>
      </div>

      {r.porCategoria.length > 0 && (
        <div className="mt-4 rounded-2xl surface p-6 sm:p-8">
          <div className="text-[17px] font-semibold">Desempeño por categoría</div>
          <div className="mt-5 space-y-5">
            {r.porCategoria.map((c) => (
              <BarraCategoria
                key={c.categoria}
                nombre={CATEGORIAS[c.categoria].nombre}
                porcentaje={c.porcentaje}
                detalle={`${c.correctas} de ${c.total}`}
              />
            ))}
          </div>

          {r.fortaleza && r.porMejorar && r.fortaleza !== r.porMejorar && (
            <div className="mt-6 pt-5 border-t border-border grid gap-4 sm:grid-cols-2">
              <div>
                <div className="text-[13px] font-semibold" style={{ color: "var(--av-green-400)" }}>
                  Fortaleza
                </div>
                <div className="mt-0.5 text-[15px] font-medium">
                  {CATEGORIAS[r.fortaleza].nombre}
                </div>
              </div>
              <div>
                <div className="text-[13px] font-semibold" style={{ color: "var(--av-amber-400)" }}>
                  Área por mejorar
                </div>
                <div className="mt-0.5 text-[15px] font-medium">
                  {CATEGORIAS[r.porMejorar].nombre}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {repaso.length > 0 && (
        <section className="mt-4 rounded-2xl surface p-6 sm:p-8">
          <div className="text-[17px] font-semibold">
            Repasa lo que falló · {repaso.length}
          </div>
          <p className="mt-1 text-[15px] text-muted-foreground max-w-[62ch]">
            Aquí están los que no salieron, con su figura y su explicación. Es la parte de la
            sesión donde se aprende: en la prueba la explicación pasa y no vuelve.
          </p>
          <div className="mt-5 space-y-3">
            {repaso.map((item) => (
              <FichaRepaso key={item.solucion.id} {...item} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onRepetir}
          className={appButtonClass({ size: "lg" })}
          style={appButtonStyle()}
        >
          <RotateCcw className="h-4 w-4" /> Otra tanda
        </button>
        <Link to={PSICO_HUB} className={appButtonClass({ variant: "secondary", size: "lg" })}>
          Volver al módulo <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <p className="mt-5 text-[13px] text-muted-foreground leading-relaxed max-w-[70ch]">
        {NOTA_TIEMPOS}
      </p>
    </div>
  )
}

/**
 * Un ejercicio fallado, plegado.
 *
 * Plegado por defecto y no abierto: con treinta ejercicios, un informe que se
 * despliega entero no se lee. Se abre el que interesa, se mira la figura al
 * lado de la explicación, y se cierra.
 */
function FichaRepaso({ ejercicio, respuesta, solucion }: ItemRepaso) {
  const [abierta, setAbierta] = useState(false)
  const suya = respuesta.elegida === null ? null : ejercicio.opciones[respuesta.elegida]
  const { figura } = ejercicio

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <button
        type="button"
        onClick={() => setAbierta((v) => !v)}
        aria-expanded={abierta}
        className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-muted transition-colors"
      >
        <span className="text-[13px] font-semibold text-muted-foreground tabular-nums shrink-0">
          {solucion.id}
        </span>
        <span className="min-w-0 flex-1 text-[15px]">
          {suya === null ? (
            <span className="text-muted-foreground">Se quedó sin responder</span>
          ) : (
            <>
              Respondiste <strong className="font-semibold">{suya}</strong>; era{" "}
              <strong className="font-semibold" style={{ color: "var(--av-green-400)" }}>
                {ejercicio.opciones[solucion.respuesta]}
              </strong>
            </>
          )}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${abierta ? "rotate-180" : ""}`}
        />
      </button>

      {abierta && (
        <div className="border-t border-border px-4 py-4">
          <div className="text-[15px] font-medium">{ejercicio.enunciado}</div>

          {figura ? (
            <>
              <FiguraEnunciado figura={figura} />
              <div className="mt-3 flex flex-wrap gap-3">
                {ejercicio.opciones.map((opcion, i) => {
                  const buena = i === solucion.respuesta
                  const suyaEsta = i === respuesta.elegida
                  return (
                    <span
                      key={opcion + i}
                      className="flex flex-col items-center gap-1 rounded-xl border p-2 text-foreground"
                      style={{
                        borderColor: buena
                          ? "var(--av-green-400)"
                          : suyaEsta
                            ? "var(--av-red-400)"
                            : "var(--border)",
                        background: buena
                          ? "color-mix(in oklab, var(--av-green-400) 12%, transparent)"
                          : suyaEsta
                            ? "color-mix(in oklab, var(--av-red-400) 12%, transparent)"
                            : undefined,
                      }}
                    >
                      <FiguraOpcion figura={figura} indice={i} />
                      <span className="text-[13px] font-semibold text-muted-foreground">
                        {opcion}
                      </span>
                    </span>
                  )
                })}
              </div>
            </>
          ) : (
            ejercicio.imagen && (
              // El recorte es papel escaneado y va sobre blanco también en tema
              // oscuro: sobre una superficie oscura, un escaneo de papel se lee
              // como un fallo de carga. Los ejercicios ya dibujados no tienen
              // este problema y siguen al tema.
              <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-white p-3">
                <img
                  src={ejercicio.imagen}
                  alt={ejercicio.imagenAlt ?? ejercicio.enunciado}
                  className="mx-auto h-auto max-w-full"
                  loading="lazy"
                />
              </div>
            )
          )}

          <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">
            {solucion.explicacion}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-muted-foreground">
            <span>{solucion.subcategoria}</span>
            <span>·</span>
            <span>
              {respuesta.segundos} s de {respuesta.limite} s
            </span>
          </div>

          {/* También aquí, y no solo en el reproductor: en evaluación y en
              simulación no hay corrección al momento, así que este repaso es la
              única ocasión en que el piloto vuelve a ver la figura con calma. Y
              es cuando de verdad sabe si lo que falló fue él o la pregunta. */}
          <ReportarProblema
            modulo="psicotecnicas"
            ejercicioId={solucion.id}
            extra={{
              desde: "repaso",
              eligio: respuesta.elegida === null ? null : ejercicio.opciones[respuesta.elegida],
              correcta: ejercicio.opciones[solucion.respuesta],
              dibujada: Boolean(ejercicio.figura),
            }}
          />
        </div>
      )}
    </div>
  )
}
