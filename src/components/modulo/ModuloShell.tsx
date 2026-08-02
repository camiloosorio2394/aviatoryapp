import { useEffect, useRef, type ReactNode } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { ModuloTopbar } from "./ModuloTopbar"
import { ModuloIndice } from "./ModuloIndice"
import type { ModuloSeccion } from "./tipos"

/**
 * Cascarón del lector de módulo.
 *
 * El lector SALE del layout de la app: nada de rail ni de cabecera mientras se
 * estudia. Ocupa la pantalla, trae su propia barra y un botón de salir que
 * devuelve al hub del tema.
 *
 * Es genérico a propósito. Cuando NOTAM y METAR migren a este formato reusan
 * este mismo cascarón: recibe las secciones, cuál está activa y el contenido,
 * y no sabe de qué módulo se trata.
 *
 * La superficie es `.mod-shell`, que no se invierte con el tema (misma lógica
 * que `.doc-sheet`): dentro se usan las variables --mod-* y nunca los tokens
 * de la app.
 */

interface ModuloShellProps {
  titulo: string
  fuentes: string
  vigencia: string
  secciones: ModuloSeccion[]
  actual: number
  onIr: (i: number) => void
  /** Secciones ya completadas, por índice. */
  hechas?: number[]
  salirA: string
  children: ReactNode
}

export function ModuloShell({
  titulo,
  fuentes,
  vigencia,
  secciones,
  actual,
  onIr,
  hechas,
  salirA,
  children,
}: ModuloShellProps) {
  const hoja = useRef<HTMLDivElement | null>(null)
  const seccion = secciones[actual]

  // El contador cuenta solo lo que se lee. La práctica y el chequeo no son
  // "la 10 de 11": son otra cosa y se rotulan como tal.
  const estudio = secciones.filter((s) => s.grupo !== "practica")
  const posicion = seccion?.grupo === "practica" ? null : estudio.indexOf(seccion) + 1

  // Cambiar de sección devuelve arriba. Sin esto se entra a la siguiente por
  // la mitad, que es lo que pasa al pasar página en un lector largo.
  useEffect(() => {
    hoja.current?.scrollIntoView({ block: "start" })
  }, [actual])

  return (
    <div className="mod-shell min-h-screen">
      <ModuloTopbar
        titulo={titulo}
        fuentes={fuentes}
        vigencia={vigencia}
        paso={posicion}
        total={estudio.length}
        etiquetaPaso={seccion?.titulo}
        salirA={salirA}
      />

      {/* En columna hasta lg y en dos columnas a partir de ahí. Si la fila fuera
          flex también en celular, la tira de números del índice sería un ítem
          flex sin ancho contenido y empujaría la página a lo ancho. */}
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 py-5 sm:py-7 flex flex-col lg:flex-row lg:gap-7">
        <ModuloIndice secciones={secciones} actual={actual} onIr={onIr} hechas={hechas} />

        <main className="min-w-0 flex-1">
          <div ref={hoja} className="lg:hidden h-3" />

          <article
            className="rounded-2xl p-5 sm:p-8 flex flex-col gap-5"
            style={{
              background: "var(--mod-card)",
              border: "1px solid var(--mod-line)",
              boxShadow: "0 1px 2px rgb(0 0 0 / 4%), 0 14px 34px -22px rgb(11 35 64 / 30%)",
            }}
          >
            {children}
          </article>

          <Navegacion secciones={secciones} actual={actual} onIr={onIr} />
        </main>
      </div>
    </div>
  )
}

/** Anterior y siguiente al pie, con el título de adónde va cada uno. */
function Navegacion({
  secciones,
  actual,
  onIr,
}: {
  secciones: ModuloSeccion[]
  actual: number
  onIr: (i: number) => void
}) {
  const anterior = actual > 0 ? secciones[actual - 1] : null
  const siguiente = actual < secciones.length - 1 ? secciones[actual + 1] : null

  return (
    <nav className="mt-5 flex flex-col sm:flex-row gap-3" aria-label="Navegación entre secciones">
      {anterior && (
        <button
          type="button"
          onClick={() => onIr(actual - 1)}
          className="flex-1 min-w-0 text-left rounded-xl px-4 py-3 flex items-center gap-3 transition-colors hover:bg-white"
          style={{ background: "var(--mod-card)", border: "1px solid var(--mod-line)" }}
        >
          <ArrowLeft className="h-4 w-4 shrink-0" style={{ color: "var(--mod-muted)" }} />
          <span className="min-w-0">
            <span className="mod-eyebrow block">Anterior</span>
            <span
              className="block text-[13.5px] font-semibold truncate"
              style={{ color: "var(--mod-title)" }}
            >
              {anterior.titulo}
            </span>
          </span>
        </button>
      )}
      {siguiente && (
        <button
          type="button"
          onClick={() => onIr(actual + 1)}
          className="flex-1 min-w-0 text-right rounded-xl px-4 py-3 flex items-center gap-3 justify-end transition-opacity hover:opacity-90"
          style={{ background: "var(--mod-band)" }}
        >
          <span className="min-w-0">
            <span className="mod-eyebrow block" style={{ color: "var(--mod-accent)" }}>
              Siguiente
            </span>
            <span className="block text-[13.5px] font-semibold truncate text-white">
              {siguiente.titulo}
            </span>
          </span>
          <ArrowRight className="h-4 w-4 shrink-0" style={{ color: "var(--mod-accent)" }} />
        </button>
      )}
    </nav>
  )
}
