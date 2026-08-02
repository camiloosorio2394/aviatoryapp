import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, BookOpen } from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { CourseCard } from "@/components/ui/course-card"
import { useSession } from "@/hooks/useSession"
import {
  MP_LECTOR,
  MP_LECTURA_TOTAL,
  MP_SECCIONES,
  MP_TITULO,
  MP_VIGENCIA,
  resumirMercancias,
} from "@/lib/mercancias"
import { fetchMercanciasProgress, readMercanciasLocal } from "@/lib/mercanciasProgress"

/**
 * Hub del tema Mercancías Peligrosas (módulo Ingreso a aerolínea).
 * Ruta: /app/aerolinea/mercancias
 *
 * El hub SÍ vive dentro de la app, como el de NOTAM: aquí se ve qué trae el
 * tema y se entra. El lector es el que sale a pantalla completa.
 *
 * A diferencia de NOTAM y METAR, el tema no se parte en cuatro destinos: la
 * práctica y el chequeo son pasos del mismo lector, así que aquí hay una sola
 * puerta y debajo el temario, que es lo que de verdad ayuda a decidir si
 * entras ahora.
 */
export function Mercancias() {
  const { user, isLoading: sessionLoading } = useSession()
  const estudio = MP_SECCIONES.filter((s) => s.grupo !== "practica")
  const pruebas = MP_SECCIONES.filter((s) => s.grupo === "practica")

  // Arranca con el respaldo local para no mostrar cero mientras carga, y se
  // completa con la base, que es la verdad entre dispositivos.
  const [progreso, setProgreso] = useState(() => readMercanciasLocal())
  const [hidratado, setHidratado] = useState(false)
  const cargando = sessionLoading || (Boolean(user) && !hidratado)

  useEffect(() => {
    if (sessionLoading || !user) return
    let cancelado = false
    void (async () => {
      const traido = await fetchMercanciasProgress(user.id)
      if (cancelado) return
      if (traido) setProgreso(traido)
      setHidratado(true)
    })()
    return () => {
      cancelado = true
    }
  }, [user, sessionLoading])

  const resumen = resumirMercancias(progreso)

  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-12 max-w-[1280px] mx-auto">
        <Link
          to="/app/aerolinea"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a Ingreso a aerolínea
        </Link>

        <PageHeader
          eyebrow={`Ingreso a aerolínea · ${MP_TITULO}`}
          title="Mercancías peligrosas, de la norma a la emergencia"
          subtitle="Las nueve clases, qué responde el comandante, qué llevan los pasajeros, las baterías de litio y el NOTOC. Con lector propio: se estudia de corrido y termina en práctica y chequeo."
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <CourseCard
            to={MP_LECTOR}
            icon={BookOpen}
            color="var(--av-amber-400)"
            meta={`${MP_LECTURA_TOTAL} secciones de lectura · práctica y chequeo final`}
            title="Abrir el módulo"
            blurb="Se lee de corrido, con su propio índice y sin salir del tema. Termina con una práctica de clasificación y un chequeo."
            photo="/infografias/mercancias/portada.webp"
            cta={resumen.empty ? "Entrar al módulo" : "Seguir donde ibas"}
            statusLoading={cargando}
            progress={resumen.overall}
            done={resumen.overall >= 100}
            status={
              resumen.empty
                ? `Sin empezar · ${MP_VIGENCIA}`
                : resumen.overall >= 100
                  ? "Módulo completo"
                  : `Vas por el ${resumen.overall}%: ${resumen.lessonRead} de ${MP_LECTURA_TOTAL} secciones y ${resumen.practiceDone} de 4 casos`
            }
          />
        </div>

        <section className="mt-8 rounded-xl surface p-6">
          <div className="text-[15px] font-semibold">Lo que vas a leer</div>
          <ol className="mt-3 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
            {estudio.map((s) => (
              <li key={s.n} className="flex items-baseline gap-2.5 text-[13px]">
                <span className="mono tabular-nums text-muted-foreground">{s.n}</span>
                <span>{s.titulo}</span>
              </li>
            ))}
          </ol>

          <div className="mt-5 pt-4 border-t border-border/60">
            <div className="text-[13px] font-semibold">Y cómo se cierra</div>
            <ol className="mt-2 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
              {pruebas.map((s) => (
                <li key={s.n} className="flex items-baseline gap-2.5 text-[13px]">
                  <span className="mono tabular-nums text-muted-foreground">{s.n}</span>
                  <span>{s.titulo}</span>
                </li>
              ))}
            </ol>
          </div>

          <p className="mt-5 text-[13px] text-muted-foreground leading-relaxed max-w-[680px]">
            El material sale del RAC 175 en su edición original, del Anexo 18 y el Doc 9284 de
            OACI y de la IATA DGR. Las tres se enmiendan o se reeditan, así que sirve para
            estudiar y no para aplicar límites en línea de vuelo: antes de usar una cifra,
            confirma la edición en vigor y el manual de tu explotador.
          </p>
        </section>
      </div>
    </AppLayout>
  )
}
