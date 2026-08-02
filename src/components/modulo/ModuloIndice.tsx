import type { ModuloSeccion } from "./tipos"

/**
 * Índice numerado del lector de módulo.
 *
 * En pantalla ancha es una columna pegada a la izquierda. En celular NO
 * desaparece ni se mete en un cajón: se convierte en una tira horizontal de
 * números que se desliza, porque saber en qué sección vas y poder saltar a
 * otra es la mitad de la utilidad del índice, y un cajón lo esconde.
 *
 * La sección activa lleva fondo navy con su número en ámbar, igual en los dos
 * formatos.
 */

interface ModuloIndiceProps {
  secciones: ModuloSeccion[]
  /** Índice de la sección activa dentro de `secciones`. */
  actual: number
  onIr: (i: number) => void
  /** Secciones ya completadas, por índice. Se marcan con un punto. */
  hechas?: number[]
}

export function ModuloIndice({ secciones, actual, onIr, hechas = [] }: ModuloIndiceProps) {
  const estudio = secciones.filter((s) => s.grupo !== "practica")
  const practica = secciones.filter((s) => s.grupo === "practica")

  return (
    <>
      {/* Ancho: columna lateral */}
      <nav
        aria-label="Secciones del módulo"
        className="hidden lg:block w-[248px] shrink-0 self-start sticky top-[104px]"
      >
        <Grupo
          etiqueta="Contenido"
          items={estudio}
          secciones={secciones}
          actual={actual}
          hechas={hechas}
          onIr={onIr}
        />
        {practica.length > 0 && (
          <div className="mt-5">
            <Grupo
              etiqueta="Ponte a prueba"
              items={practica}
              secciones={secciones}
              actual={actual}
              hechas={hechas}
              onIr={onIr}
            />
          </div>
        )}
      </nav>

      {/* Angosto: tira horizontal de números */}
      <nav
        aria-label="Secciones del módulo"
        className="lg:hidden w-full min-w-0 -mx-4 px-4 sm:-mx-6 sm:px-6 overflow-x-auto"
        style={{ width: "calc(100% + 2rem)" }}
      >
        <ul className="flex gap-1.5 pb-1 w-max">
          {secciones.map((s, i) => {
            const activo = i === actual
            return (
              <li key={s.n}>
                <button
                  type="button"
                  onClick={() => onIr(i)}
                  aria-current={activo ? "step" : undefined}
                  title={s.titulo}
                  className="mono flex h-9 w-9 items-center justify-center rounded-lg text-[12px] font-semibold transition-colors"
                  style={
                    activo
                      ? { background: "var(--mod-band)", color: "var(--mod-accent)" }
                      : {
                          background: "var(--mod-card)",
                          color: hechas.includes(i) ? "var(--mod-link)" : "var(--mod-muted)",
                          border: "1px solid var(--mod-line)",
                        }
                  }
                >
                  {s.n}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}

function Grupo({
  etiqueta,
  items,
  secciones,
  actual,
  hechas,
  onIr,
}: {
  etiqueta: string
  items: ModuloSeccion[]
  secciones: ModuloSeccion[]
  actual: number
  hechas: number[]
  onIr: (i: number) => void
}) {
  return (
    <>
      <div className="mod-eyebrow px-3 mb-2">{etiqueta}</div>
      <ul className="flex flex-col gap-0.5">
        {items.map((s) => {
          const i = secciones.indexOf(s)
          const activo = i === actual
          return (
            <li key={s.n}>
              <button
                type="button"
                onClick={() => onIr(i)}
                aria-current={activo ? "step" : undefined}
                className="w-full text-left flex items-start gap-2.5 rounded-lg px-3 py-2 transition-colors"
                style={
                  activo
                    ? { background: "var(--mod-band)", color: "#FFFFFF" }
                    : { color: "var(--mod-text)" }
                }
              >
                <span
                  className="mono shrink-0 text-[12px] font-semibold pt-px tabular-nums"
                  style={{ color: activo ? "var(--mod-accent)" : "var(--mod-muted)" }}
                >
                  {s.n}
                </span>
                <span className="text-[13.5px] leading-snug">{s.titulo}</span>
                {hechas.includes(i) && !activo && (
                  <span
                    aria-label="Sección leída"
                    className="ml-auto mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: "var(--mod-link)" }}
                  />
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}
