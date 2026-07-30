import { Link } from "react-router-dom"
import { GraduationCap, ArrowRight } from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"

/**
 * Materias generales.
 *
 * El módulo existe en el menú pero todavía no tiene contenido ni alcance
 * definido. La pantalla lo dice sin rodeos y ofrece una salida real, en lugar
 * de inventar tarjetas de temas que no están decididos: prometer un temario
 * que después cambia es peor que declarar que está en construcción.
 *
 * Cuando se defina qué entra aquí (teoría de fondo, práctica de vuelo o ambas),
 * esta página se reemplaza por la lista de temas.
 */
export function GeneralSubjects() {
  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-12 max-w-[1280px] mx-auto">
        <PageHeader
          eyebrow={
            <>
              <GraduationCap className="h-4 w-4" /> Módulo
            </>
          }
          title="Materias generales"
          subtitle="Estudio de fondo, separado de la preparación para un examen concreto."
        />

        <section className="rounded-xl surface p-6 sm:p-8 max-w-[640px]">
          <span
            className="inline-flex items-center text-[13px] px-2 py-0.5 rounded-md"
            style={{
              color: "var(--av-warn-fg)",
              background: "color-mix(in oklab, var(--av-amber-400) 12%, transparent)",
            }}
          >
            En construcción
          </span>

          <h2 className="mt-4 text-[20px] font-semibold tracking-[-0.02em]">
            Estamos definiendo qué entra aquí
          </h2>
          <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed">
            Este módulo va a reunir el estudio que no depende de un examen. Todavía no está
            decidido su alcance, así que preferimos dejarlo vacío antes que publicar un temario
            que después cambie.
          </p>
          <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
            Mientras tanto, el banco del examen PCA ya tiene las materias organizadas y con
            preguntas reales.
          </p>

          <Link
            to="/app/pca"
            className={appButtonClass({ size: "lg" }, "mt-6")}
            style={appButtonStyle()}
          >
            Ir al examen PCA <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </AppLayout>
  )
}
