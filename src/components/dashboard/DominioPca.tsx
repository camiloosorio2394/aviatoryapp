import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import type { SubjectMastery } from "@/components/dashboard/tipos"

/**
 * Dónde flojea el piloto en el PCA, materia por materia.
 *
 * La pregunta que responde es una sola, «qué refuerzo», así que la forma es de
 * énfasis y no categórica: la materia más floja va en el azul y todas las demás
 * en gris. Cinco colores distintos pedirían al lector descifrar una leyenda para
 * llegar a lo mismo que aquí ve de un vistazo.
 *
 * Por qué acierto y no cobertura: `get_subject_mastery` cuenta contra la tabla
 * legada `questions`, casi vacía, así que «preguntas vistas sobre total» salía
 * por encima del 100 %. El promedio de acierto de sus propios quizzes sí se
 * sostiene con estos datos.
 *
 * Una materia sin práctica no lleva barra en cero: un cero diría «0 % de
 * acierto», que es falso. Dice «Sin práctica».
 *
 * Colores comprobados con el validador de la guía de visualización, en los dos
 * temas: el gris pasa 3:1 contra el fondo (claro #858a93 sobre blanco, oscuro
 * #6c717a sobre #171717) y separa ΔE 20 del azul también con daltonismo.
 */
export function DominioPca({ dominio, cargando }: { dominio: SubjectMastery[]; cargando: boolean }) {
  const practicadas = dominio
    .filter((m) => m.attempts_count > 0)
    .sort((a, b) => a.avg_score - b.avg_score)
  const sinPractica = dominio.filter((m) => m.attempts_count === 0)
  const masFloja = practicadas[0] ?? null

  return (
    <div className="flex h-full flex-col rounded-2xl surface p-5 [--dp-enfasis:var(--av-blue-500)] [--dp-contexto:#858a93] dark:[--dp-enfasis:var(--av-blue-400)] dark:[--dp-contexto:#6c717a]">
      <h3 className="m-0 text-[15px] font-semibold tracking-[-0.01em] text-foreground">Dominio por materia</h3>
      <p className="m-0 mt-0.5 text-[12.5px] text-muted-foreground">Tu acierto en los quizzes del banco PCA</p>

      {cargando ? (
        <div className="mt-4 flex flex-col gap-3" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-7 rounded bg-muted animate-pulse" />
          ))}
        </div>
      ) : practicadas.length === 0 ? (
        <div className="mt-4 flex flex-1 flex-col items-start justify-center gap-3 rounded-xl border border-dashed border-border px-4 py-5">
          <p className="m-0 text-[13px] leading-relaxed text-muted-foreground">
            Todavía no hay quizzes del banco. Con el primero, aquí verás qué materia reforzar.
          </p>
          <Link to="/app/pca" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-foreground">
            Hacer el primero <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      ) : (
        <>
          {/* La lista es a la vez la gráfica y su tabla: cada fila lleva el
              nombre y la cifra escritos, así que nada depende del color ni de
              pasar el ratón. La fila entera es la zona activa, más grande que
              la barra, y su lectura sale igual con el teclado. */}
          <ul className="m-0 mt-4 flex list-none flex-col gap-1 p-0">
            {practicadas.map((m) => {
              const enfasis = m.subject_id === masFloja?.subject_id
              const valor = Math.round(m.avg_score)
              const lectura = `${valor} % · ${m.subject_name} · ${m.attempts_count} quiz${m.attempts_count !== 1 ? "zes" : ""}`
              return (
                <li
                  key={m.subject_id}
                  tabIndex={0}
                  aria-label={`${m.subject_name}: ${valor} % de acierto en ${m.attempts_count} quiz${m.attempts_count !== 1 ? "zes" : ""}${enfasis ? ", la más floja" : ""}`}
                  className="group relative -mx-2 rounded-lg px-2 py-1.5 outline-none transition-colors hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span
                      className={`truncate text-[13px] ${enfasis ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                    >
                      {m.subject_name}
                    </span>
                    <span
                      className={`tabular shrink-0 text-[13px] font-semibold ${enfasis ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {valor} %
                    </span>
                  </div>
                  {/* 8 px de grosor, extremo redondeado de 4 px y cuadrado en la
                      base, que es de donde crece. La pista es el 0-100 entero. */}
                  <div className="mt-1.5 h-2 overflow-hidden rounded-r-[4px] bg-muted">
                    <div
                      className="h-full rounded-r-[4px] transition-[filter] group-hover:brightness-110 group-focus-visible:brightness-110"
                      style={{
                        width: `${Math.max(valor, 2)}%`,
                        background: enfasis ? "var(--dp-enfasis)" : "var(--dp-contexto)",
                      }}
                    />
                  </div>
                  {/* La lectura: la cifra delante y en fuerte, la materia detrás.
                      Aquí el lector ya sabe qué fila miró y quiere el número. */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-8 right-0 z-10 hidden whitespace-nowrap rounded-md bg-foreground px-2.5 py-1 text-[11.5px] text-background shadow-sm group-hover:block group-focus-visible:block"
                  >
                    {lectura}
                  </div>
                </li>
              )
            })}
          </ul>

          {sinPractica.length > 0 && (
            <p className="m-0 mt-3 text-[12px] leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Sin práctica:</span>{" "}
              {sinPractica.map((m) => m.subject_name).join(", ")}.
            </p>
          )}

          {masFloja && (
            <Link
              to="/app/pca"
              className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-semibold text-foreground"
            >
              Reforzar {masFloja.subject_name}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          )}
        </>
      )}
    </div>
  )
}
