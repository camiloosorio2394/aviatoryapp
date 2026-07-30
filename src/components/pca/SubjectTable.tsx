import type { ComponentType } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { getSubjectMeta } from "@/lib/vaultSubjects"
import { subjectSymbol } from "@/lib/subjectSymbols"

export interface SubjectRowData {
  slug: string
  count: number
  answered: number
}

/** Bajo este número la materia se marca como banco corto. */
const SMALL_BANK = 20

/**
 * Materias en tabla, no en mosaico.
 *
 * Once tarjetas de 92px repitiendo icono, nombre y "N preguntas" ocupaban
 * cuatro filas para once datos. Las herramientas que usa un piloto (el
 * logbook, una carta, un plan de vuelo) presentan datos tabulados: filas
 * comparables de un vistazo, con las cifras alineadas en columna.
 *
 * La cabecera desaparece en móvil, donde cada fila se lee como bloque.
 */
export function SubjectTable({ rows }: { rows: SubjectRowData[] }) {
  return (
    <div className="surface rounded-xl overflow-hidden">
      <div className="hidden sm:grid grid-cols-[1fr_120px_160px_44px] gap-4 px-4 py-2.5 border-b border-border text-[13px] text-muted-foreground">
        <span>Materia</span>
        <span className="text-right">Preguntas</span>
        <span>Tu avance</span>
        <span />
      </div>

      {rows.map((r, i) => (
        <SubjectRow
          key={r.slug}
          data={r}
          icon={subjectSymbol(r.slug)}
          last={i === rows.length - 1}
        />
      ))}
    </div>
  )
}

function SubjectRow({
  data,
  icon: Symbol,
  last,
}: {
  data: SubjectRowData
  icon: ComponentType<{ className?: string }>
  last: boolean
}) {
  const meta = getSubjectMeta(data.slug)
  const quizCount = Math.min(10, data.count)
  const short = data.count < SMALL_BANK
  const pct = data.count > 0 ? Math.round((data.answered / data.count) * 100) : 0

  return (
    <Link
      to={`/app/pca/quiz/${data.slug}?module=pca&count=${quizCount}`}
      className={`grid grid-cols-[1fr_44px] sm:grid-cols-[1fr_120px_160px_44px] gap-x-4 gap-y-2 px-4 py-3 items-center transition-colors hover:bg-muted/60 ${
        last ? "" : "border-b border-border"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <Symbol className="h-[18px] w-[18px] text-muted-foreground flex-shrink-0" />
        <div className="min-w-0">
          <div className="text-[15px] font-semibold tracking-[-0.01em] truncate">{meta.name}</div>
          {short && (
            <div className="text-[13px] sm:hidden" style={{ color: "var(--av-warn-fg)" }}>
              Banco corto
            </div>
          )}
        </div>
      </div>

      <div className="hidden sm:block text-right">
        <span className="tabular-nums text-[15px]">{data.count}</span>
        {short && (
          <div className="text-[13px]" style={{ color: "var(--av-warn-fg)" }}>
            banco corto
          </div>
        )}
      </div>

      <div className="hidden sm:block">
        {pct > 0 ? (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-muted">
              <div
                className="h-full rounded-full"
                style={{ width: `${pct}%`, background: "var(--av-blue-500)" }}
              />
            </div>
            <span className="tabular-nums text-[13px] text-muted-foreground w-9 text-right">
              {pct}%
            </span>
          </div>
        ) : (
          <span className="text-[13px] text-muted-foreground">Sin empezar</span>
        )}
      </div>

      <ArrowRight className="h-4 w-4 text-muted-foreground justify-self-end" />
    </Link>
  )
}
