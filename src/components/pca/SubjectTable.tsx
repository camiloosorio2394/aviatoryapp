import type { ComponentType } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Check } from "lucide-react"
import { getSubjectMeta } from "@/lib/vaultSubjects"
import { subjectFoto } from "@/lib/subjectFotos"
import { subjectSymbol } from "@/lib/subjectSymbols"

export interface SubjectRowData {
  slug: string
  count: number
  answered: number
}

/**
 * Materias en tabla, no en mosaico.
 *
 * Once tarjetas de 92px repitiendo icono, nombre y "N preguntas" ocupaban
 * cuatro filas para once datos. Las herramientas que usa un piloto (el
 * logbook, una carta, un plan de vuelo) presentan datos tabulados: filas
 * comparables de un vistazo, con las cifras alineadas en columna.
 *
 * La barra es una sola serie —cuánto del banco de esa materia ya viste—, así
 * que va en un solo tono, el de tinta, como la tarjeta del PCA en el panel. La
 * materia que dejaste a medias lleva «En curso», igual que los módulos. Vista
 * entera no se pinta de verde: haber visto todas las preguntas no es haberlas
 * acertado, y el verde en esta app significa acierto.
 *
 * La cabecera desaparece en móvil, donde cada fila se lee como bloque.
 *
 * Cada materia abre con su miniatura (124 × 84, la de `subjectFotos`), que es
 * lo que hace reconocible la fila antes de leer el nombre. Donde todavía no
 * hay foto queda el símbolo de carta de siempre, en su cuadrado de 32 px:
 * nunca un hueco.
 */
export function SubjectTable({ rows, enCurso }: { rows: SubjectRowData[]; enCurso?: string | null }) {
  return (
    <div className="overflow-hidden rounded-2xl surface">
      <div className="nh-display hidden grid-cols-[1fr_96px_212px_36px] gap-4 border-b border-border px-5 py-3 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground @2xl:grid">
        {/* La primera columna no lleva rótulo: el de la sección, justo encima,
            ya dice «Materias», y «Materias» sobre «Materia» se leía repetido. */}
        <span />
        <span className="text-right">Preguntas</span>
        <span>Tu avance</span>
        <span />
      </div>

      <ul className="m-0 list-none p-0">
        {rows.map((r, i) => (
          <SubjectRow
            key={r.slug}
            data={r}
            foto={subjectFoto(r.slug)}
            icon={subjectSymbol(r.slug)}
            enCurso={r.slug === enCurso}
            last={i === rows.length - 1}
          />
        ))}
      </ul>
    </div>
  )
}

function SubjectRow({
  data,
  foto,
  icon: Simbolo,
  enCurso,
  last,
}: {
  data: SubjectRowData
  /** La miniatura de la materia; sin ella se pinta el símbolo. */
  foto?: string
  icon: ComponentType<{ className?: string }>
  enCurso: boolean
  last: boolean
}) {
  const meta = getSubjectMeta(data.slug)
  const quizCount = Math.min(10, data.count)
  const pct = data.count > 0 ? Math.round((data.answered / data.count) * 100) : 0
  const entera = pct >= 100

  return (
    <li className={last ? "" : "border-b border-border"}>
      <Link
        to={`/app/pca/quiz/${data.slug}?module=pca&count=${quizCount}`}
        className="group grid grid-cols-[1fr_36px] items-center gap-x-4 gap-y-2 px-5 py-3.5 transition-colors hover:bg-muted/60 @2xl:grid-cols-[1fr_96px_212px_36px]"
      >
        <div className="flex min-w-0 items-center gap-3 @2xl:gap-4">
          {foto ? (
            /* Decorativa: el nombre va al lado. En móvil se encoge a 92 px para
               dejarle sitio al texto; la proporción es siempre la de la foto. */
            <img
              src={foto}
              alt=""
              width={124}
              height={84}
              loading="lazy"
              decoding="async"
              className="h-[62px] w-[92px] shrink-0 rounded-[10px] object-cover @2xl:h-[84px] @2xl:w-[124px]"
            />
          ) : (
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
              <Simbolo className="h-4 w-4" />
            </span>
          )}
          <span className="truncate text-[14.5px] font-semibold tracking-[-0.01em] text-foreground">
            {meta.name}
          </span>
          {enCurso && (
            <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[11px] font-semibold text-foreground">
              En curso
            </span>
          )}
        </div>

        <div className="hidden text-right @2xl:block">
          <span className="tabular text-[14px] text-foreground">{data.count}</span>
        </div>

        {/* En móvil el avance baja a su propia línea, bajo el nombre. */}
        <div className="col-span-2 row-start-2 @2xl:col-span-1 @2xl:row-start-auto">
          {pct > 0 ? (
            <div className="flex items-center gap-3">
              {/* 6 px, extremo redondeado y cuadrado en la base, que es de
                  donde crece. La pista es el banco entero de la materia. */}
              <div
                className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-r-[3px] bg-muted"
                role="progressbar"
                aria-label={`Avance en ${meta.name}`}
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-r-[3px]"
                  style={{ width: `${Math.min(pct, 100)}%`, background: "var(--foreground)" }}
                />
              </div>
              <span className="tabular inline-flex w-[60px] shrink-0 items-center justify-end gap-1 whitespace-nowrap text-[12.5px] font-semibold text-muted-foreground">
                {entera && <Check className="h-3.5 w-3.5" aria-hidden />}
                {pct} %
              </span>
            </div>
          ) : (
            // En pantalla ancha la cifra ya está en su columna; en móvil, que no
            // la tiene, va detrás.
            <span className="text-[12.5px] text-muted-foreground">
              Sin empezar<span className="tabular @2xl:hidden"> · {data.count} preguntas</span>
            </span>
          )}
        </div>

        <ArrowRight className="col-start-2 row-start-1 h-4 w-4 justify-self-end text-muted-foreground transition-transform group-hover:translate-x-0.5 @2xl:col-start-auto @2xl:row-start-auto" />
      </Link>
    </li>
  )
}
