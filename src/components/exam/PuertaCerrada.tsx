import { Link } from "react-router-dom"
import {
  AlertTriangle,
  ArrowLeft,
  Award,
  BookOpen,
  Loader2,
  Lock,
  PenLine,
} from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { type ExamenConfig } from "@/components/exam/tipos"
import { mix } from "@/components/exam/formato"

// ─── Puerta cerrada ──────────────────────────────────────────────────────────

export function Cargando({ texto }: { texto: string }) {
  return (
    <>
      <div
        className="px-5 sm:px-7 py-20 max-w-[900px] mx-auto flex flex-col items-center gap-3 text-muted-foreground"
        role="status"
        aria-label={texto}
      >
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="text-[13px]">{texto}</span>
      </div>
    </>
  )
}

/**
 * La evaluación cerrada, con la cuenta de lo que falta. No es un castigo: las
 * preguntas salen de las lecciones, y presentarla sin haberlas leído solo
 * produce un puntaje bajo que no le enseña nada a nadie.
 */
export function Bloqueado({ config, leidas }: { config: ExamenConfig; leidas: number[] }) {
  const T = config.totalLecciones
  const hechas = leidas.length
  const faltan = T - hechas
  const pct = Math.round((hechas / T) * 100)
  let siguiente = 1
  while (siguiente <= T && leidas.includes(siguiente)) siguiente++
  if (siguiente > T) siguiente = T
  const unidad = config.unidadLeccion
  const unidadSing = unidad.endsWith("es") ? unidad.slice(0, -2) : unidad.slice(0, -1)

  return (
    <>
      <div className="px-5 sm:px-7 py-9 sm:py-11 pb-20 max-w-[760px] mx-auto">
        <Link
          to={config.hub}
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {config.volverTexto}
        </Link>

        <PageHeader
          eyebrow={
            <>
              <Award className="h-3.5 w-3.5" /> {config.eyebrow}
            </>
          }
          title="La evaluación se abre cuando termines la lectura"
          subtitle={`Son ${config.porIntento} preguntas al azar sobre las ${T} ${unidad} del módulo. Para presentarla necesitas haberlas leído todas.`}
        />

        <div
          className="rounded-2xl border p-5 sm:p-6"
          style={{ borderColor: mix("var(--av-amber-400)", 28), background: mix("var(--av-amber-400)", 5) }}
        >
          <div className="flex items-start gap-3">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: mix("var(--av-amber-400)", 14),
                border: `1px solid ${mix("var(--av-amber-400)", 30)}`,
                color: "var(--av-amber-400)",
              }}
            >
              <Lock className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[15px] font-semibold tracking-[-0.01em]">
                {faltan === 1 ? `Te falta una ${unidadSing} por leer` : `Te faltan ${faltan} ${unidad} por leer`}
              </div>
              <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
                Llevas {hechas} de {T}. Termínalas y la evaluación se abre sola: no hay que pedir nada ni esperar nada.
              </p>
            </div>
            <div
              className="tabular flex-shrink-0 text-[20px] font-semibold tracking-[-0.02em]"
              style={{ color: "var(--av-amber-400)" }}
            >
              {pct}%
            </div>
          </div>

          <div
            className="mt-4 h-1.5 rounded-full overflow-hidden"
            style={{ background: mix("var(--border)", 55) }}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={T}
            aria-valuenow={hechas}
            aria-label={`${hechas} de ${T} ${unidad} leídas`}
          >
            <div className="h-full rounded-full transition-[width]" style={{ width: `${pct}%`, background: "var(--av-amber-400)" }} />
          </div>
        </div>

        <Link
          to={`${config.leccion}?l=${siguiente}`}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 h-14 px-6 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
          style={{ background: config.acento }}
        >
          <BookOpen className="h-4.5 w-4.5" />
          {hechas === 0 ? "Empezar la lectura" : `Continuar en la ${unidadSing} ${siguiente}`}
        </Link>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px]">
          <Link
            to={config.practica}
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <PenLine className="h-3.5 w-3.5" /> Mientras tanto, ve a la práctica
          </Link>
        </div>

        <div
          className="mt-8 rounded-2xl border p-4 flex items-start gap-3"
          style={{ borderColor: mix("var(--av-amber-400)", 25), background: mix("var(--av-amber-400)", 6) }}
        >
          <AlertTriangle className="flex-shrink-0 mt-0.5 h-4.5 w-4.5" style={{ color: "var(--av-amber-400)" }} />
          <div className="text-[13px] text-foreground/85 leading-relaxed">{config.aviso}</div>
        </div>
      </div>
    </>
  )
}
