import { Link } from "react-router-dom"
import { ArrowRight, RotateCcw } from "lucide-react"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import {
  CATEGORIAS,
  NOTA_TIEMPOS,
  PSICO_HUB,
  type ResultadoPsico,
  nivelAlcanzado,
} from "@/lib/psicotecnicas"

interface Props {
  resultado: ResultadoPsico
  /** El simulacro añade el puntaje global, la velocidad y la precisión. */
  conPuntajeGlobal?: boolean
  onRepetir: () => void
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
export function PsicoResultado({ resultado, conPuntajeGlobal, onRepetir }: Props) {
  const r = resultado

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="rounded-2xl surface p-6 sm:p-8">
        <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
          Resultado
        </div>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <div className="text-[44px] font-semibold tabular-nums leading-none tracking-[-0.03em]">
            {conPuntajeGlobal ? r.global : r.porcentaje}%
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
            <Dato valor={`${r.precision}%`} etiqueta="Precisión" />
            <Dato valor={`${r.velocidad}%`} etiqueta="Velocidad" />
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
