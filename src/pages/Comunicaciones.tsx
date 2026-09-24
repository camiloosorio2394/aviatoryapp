import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, BookOpen, GraduationCap, Headphones } from "lucide-react"
import { CourseCard } from "@/components/ui/course-card"
import type { CourseCardProps } from "@/components/ui/course-card"
import { EspacioVideo } from "@/components/modulo/EspacioVideo"
import { useSession } from "@/hooks/useSession"
import {
  CM_ACENTO,
  CM_APRENDE,
  CM_EVALUACION,
  CM_FUENTES,
  CM_LECTURA_TOTAL,
  CM_NIVELES,
  CM_PRACTICA,
  CM_TITULO,
  readComunicacionesLocal,
  resumirComunicaciones,
} from "@/lib/comunicaciones"
import { CM_PRACTICA_CONTEO } from "@/lib/comunicacionesConteo"
import { fetchComunicacionesProgress, pushPendingComunicaciones } from "@/lib/comunicacionesProgress"

/**
 * Hub del módulo Comunicaciones aeronáuticas y gestión ATC.
 * Ruta: /app/aerolinea/comunicaciones
 *
 * La misma casa que el hub de Aeropuertos: hero con velo del acento (aquí
 * ciruela), el espacio del video de apertura y las puertas numeradas: la
 * lección, la práctica con audio y la evaluación del servidor.
 *
 * El video todavía no está grabado: su hueco queda rotulado con lo que hace
 * falta producir.
 */
export function Comunicaciones() {
  const { user, isLoading: sesionCargando } = useSession()
  // Arranca con el respaldo local para no mostrar cero mientras carga, y se
  // completa con la base, que es la verdad entre dispositivos.
  const [progreso, setProgreso] = useState(() => readComunicacionesLocal())

  useEffect(() => {
    if (sesionCargando || !user) return
    let cancelado = false
    void (async () => {
      try {
        const traido = await fetchComunicacionesProgress(user.id)
        if (cancelado || !traido) return
        // Sube lo que se avanzó sin sesión y muestra la base unida con lo local.
        await pushPendingComunicaciones(traido)
        if (!cancelado) setProgreso(traido)
      } catch {
        /* sin red: se queda el respaldo local */
      }
    })()
    return () => {
      cancelado = true
    }
  }, [user, sesionCargando])

  const {
    lessonRead: leidas,
    lessonPct: pct,
    practiceDone: practicados,
    practicePct,
    best: mejor,
    passed,
  } = useMemo(() => resumirComunicaciones(progreso), [progreso])

  const partes: CourseCardProps[] = [
    {
      to: CM_APRENDE,
      densidad: "compacta",
      photoAspect: "5/2",
      icon: BookOpen,
      color: CM_ACENTO,
      meta: `${CM_LECTURA_TOTAL} lecciones · ${CM_NIVELES.length} niveles`,
      title: "1. Aprende",
      blurb:
        "De la disciplina de radio a la emergencia y el CPDLC, en el orden en que te lo encuentras en un vuelo.",
      photoHueco: "CM-POR-01 · 5:2 · 1200×480 · Cabina de noche con el panel de audio y el micrófono en primer plano",
      status:
        leidas === 0 ? "Sin empezar" : leidas >= CM_LECTURA_TOTAL ? "Lección completa" : `${leidas} de ${CM_LECTURA_TOTAL} lecciones leídas`,
      progress: pct,
      done: leidas >= CM_LECTURA_TOTAL,
      cta: "Iniciar formación",
    },
    {
      to: CM_PRACTICA,
      densidad: "compacta",
      photoAspect: "5/2",
      icon: Headphones,
      color: CM_ACENTO,
      meta: `${CM_PRACTICA_CONTEO} ejercicios con audio de radio`,
      title: "2. Practica",
      blurb: "Escuchar, copiar, colacionar y responder con ruido de radio, hasta un vuelo completo.",
      photoHueco: "CM-POR-02 · 5:2 · 1200×480 · Auriculares de cabina sobre el pedestal, con el panel de audio encendido",
      status:
        practicados === 0
          ? "Sin empezar"
          : practicados >= CM_PRACTICA_CONTEO
            ? "Práctica completa"
            : `${practicados} de ${CM_PRACTICA_CONTEO} ejercicios`,
      progress: practicePct,
      done: practicados >= CM_PRACTICA_CONTEO,
      cta: practicados === 0 ? "Iniciar práctica" : "Seguir practicando",
    },
    {
      to: CM_EVALUACION,
      densidad: "compacta",
      photoAspect: "5/2",
      icon: GraduationCap,
      color: CM_ACENTO,
      meta: "Opción múltiple, con explicación al final",
      title: "3. Evaluación",
      blurb: "Lo que preguntan de radio y ATC en una entrevista técnica, con corrección al terminar.",
      photoHueco: "CM-POR-03 · 5:2 · 1200×480 · Consola de un controlador con la pantalla radar",
      status: mejor === null ? "Sin intentos" : `Mejor puntaje: ${mejor}`,
      done: passed,
      cta: mejor === null ? "Iniciar evaluación" : "Volver a presentarla",
    },
  ]

  return (
    <div className="@container notam-hub px-5 sm:px-8 py-9 sm:py-11 pb-24 max-w-[1600px] mx-auto">
      <Link
        to="/app/aerolinea"
        className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Volver a Ingreso a aerolínea
      </Link>

      <section className="relative overflow-hidden rounded-[18px] bg-[#251229] shadow-[0_1px_2px_rgba(11,27,48,0.08)]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(37,18,41,.97) 0%, rgba(78,42,86,.90) 48%, rgba(210,176,218,.48) 100%)",
          }}
          aria-hidden
        />

        <div className="relative grid gap-7 px-7 pb-7 pt-7 sm:px-12 sm:pb-8 sm:pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-10">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <span className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: "#E0C7E6" }}>
                Módulo
              </span>
              <span className="h-3 w-px bg-white/20" aria-hidden />
              <span className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                Ingreso a aerolínea
              </span>
            </div>

            <h1 className="nh-display mt-4 text-[34px] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-[42px] lg:text-[48px]">
              {CM_TITULO}
            </h1>

            <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.55] text-white/80">
              Escuchar, interpretar, confirmar y responder. Este módulo no es un curso de inglés ni
              una lista de frases: es lo que tienes que hacer bien cada vez que el ATC te llama, desde
              la autorización en plataforma hasta una emergencia sobre el océano.
            </p>

            <p className="mt-3 text-[13px] text-white/50">{CM_FUENTES}</p>
          </div>

          <div className="lg:justify-self-end">
            <EspacioVideo
              src="/modulos/comunicaciones/intro.mp4"
              portada="/modulos/comunicaciones/intro-poster.webp"
              duracion="1 min"
              titulo="Escuchar, confirmar, responder"
              continuarA={CM_APRENDE}
              continuarTexto="Empezar el módulo"
              claveVisto="aviatory.comunicaciones.video"
              acento="#D2B0DA"
              rotulo="CM-VID-01 · Video de apertura · 16:9 · 60 s"
              descripcion="El video del módulo, con la misma serie que NOTAM y Aeropuertos: ocho escenas, un minuto, con el avatar y la voz propios del curso, en español (lang «es»). Recorre un vuelo por sus frecuencias, de Delivery a Ground en destino. Se guarda como intro.mp4 y su primer cuadro como intro-poster.webp; en cuanto estén, el reproductor aparece aquí solo."
            />
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-5 @xl:grid-cols-2 @5xl:grid-cols-4">
        {partes.map((p) => (
          <CourseCard key={p.title} {...p} />
        ))}
      </div>
    </div>
  )
}
