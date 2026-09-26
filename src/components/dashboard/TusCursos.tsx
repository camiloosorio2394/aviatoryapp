import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Barra } from "@/components/dashboard/ResumenPiloto"

/**
 * «Tus cursos abiertos»: los tres cursos de Formación, para que el piloto elija
 * por dónde sigue (pedido de Camilo, 26-sep-2026). Reemplaza a «Continúa tu
 * preparación», que solo mostraba el módulo de Ingreso a aerolínea: ese módulo
 * ahora es el detalle de su curso.
 *
 * Los empezados van primero; los que no, al final y con «Por empezar».
 */
export interface CursoAbierto {
  clave: "aerolinea" | "icao" | "pca"
  titulo: string
  foto: string
  to: string
  estado: "en-curso" | "por-empezar" | "completo"
  /** Una línea: por dónde va o qué es el curso si no lo ha empezado. */
  detalle: string
  /** La barra y su cifra; `null` si el curso no tiene nada que medir todavía. */
  avance: { pct: number; texto: string } | null
  accion: string
}

const ESTADO: Record<CursoAbierto["estado"], string> = {
  "en-curso": "En curso",
  "por-empezar": "Por empezar",
  completo: "Completo",
}

function TarjetaCurso({ curso }: { curso: CursoAbierto }) {
  return (
    <Link
      to={curso.to}
      className="group surface surface-lift flex min-w-0 flex-col overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[16/8] overflow-hidden bg-[var(--marca-navy)]">
        <img
          src={curso.foto}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(8,20,36,0) 35%, rgba(8,20,36,.82) 100%)" }}
        />
        <span className="absolute left-3.5 top-3.5 rounded-full border border-white/20 bg-[rgba(6,17,31,0.45)] px-2.5 py-0.5 text-[11px] font-medium text-white/90 backdrop-blur-[4px]">
          {ESTADO[curso.estado]}
        </span>
        <h3 className="titular absolute inset-x-4 bottom-3 m-0 text-[22px] font-medium leading-tight text-white">{curso.titulo}</h3>
      </div>
      <div className="flex flex-1 flex-col p-4 pt-3.5">
        <p className="m-0 text-[13px] leading-snug text-muted-foreground">{curso.detalle}</p>
        {curso.avance && (
          <div className="mt-3.5 flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <Barra pct={curso.avance.pct} etiqueta={`Avance en ${curso.titulo}`} />
            </div>
            <span className="cifra shrink-0 text-[12.5px] text-foreground">{curso.avance.texto}</span>
          </div>
        )}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13.5px] font-semibold text-foreground">
          {curso.accion}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  )
}

export function TusCursos({ cursos }: { cursos: CursoAbierto[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2 @4xl:grid-cols-3">
      {cursos.map((c) => (
        <TarjetaCurso key={c.clave} curso={c} />
      ))}
    </div>
  )
}
