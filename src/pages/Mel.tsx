import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, BookOpen, GraduationCap, ListChecks } from "lucide-react"
import { CourseCard } from "@/components/ui/course-card"
import type { CourseCardProps } from "@/components/ui/course-card"
import { EspacioVideo } from "@/components/modulo/EspacioVideo"
import { useSession } from "@/hooks/useSession"
import {
  MEL_ACENTO,
  MEL_APRENDE,
  MEL_EVALUACION,
  MEL_FUENTES,
  MEL_LECTURA_TOTAL,
  MEL_NIVELES,
  MEL_PRACTICA,
  MEL_TITULO,
  readMelLocal,
  resumirMel,
} from "@/lib/mel"
import { MEL_PRACTICA_CONTEO } from "@/lib/melConteo"
import { fetchMelProgress, pushPendingMel } from "@/lib/melProgress"

/**
 * Hub del módulo Minimum Equipment List (MEL).
 * Ruta: /app/aerolinea/mel
 *
 * La misma casa que el hub de Comunicaciones ATC: hero con velo del acento
 * (aquí grafito), el espacio del video de apertura y las puertas numeradas:
 * la lección, la práctica con entradas de MEL y la evaluación del servidor.
 *
 * El video todavía no está grabado: su hueco queda rotulado con lo que hace
 * falta producir.
 */
export function Mel() {
  const { user, isLoading: sesionCargando } = useSession()
  // Arranca con el respaldo local para no mostrar cero mientras carga, y se
  // completa con la base, que es la verdad entre dispositivos.
  const [progreso, setProgreso] = useState(() => readMelLocal())

  useEffect(() => {
    if (sesionCargando || !user) return
    let cancelado = false
    void (async () => {
      try {
        const traido = await fetchMelProgress(user.id)
        if (cancelado || !traido) return
        // Sube lo que se avanzó sin sesión y muestra la base unida con lo local.
        await pushPendingMel(traido)
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
  } = useMemo(() => resumirMel(progreso), [progreso])

  const partes: CourseCardProps[] = [
    {
      to: MEL_APRENDE,
      densidad: "compacta",
      photoAspect: "5/2",
      icon: BookOpen,
      color: MEL_ACENTO,
      meta: `${MEL_LECTURA_TOTAL} lecciones · ${MEL_NIVELES.length} niveles`,
      title: "1. Aprende",
      blurb:
        "De qué es la MEL a leer una entrada columna por columna, llevar el defecto hasta el despacho y defenderlo en la entrevista.",
      photoHueco: "MEL-POR-01 · 5:2 · 1200×480 · Página de MEL abierta junto al tech log, con una etiqueta INOP en primer plano",
      status:
        leidas === 0
          ? "Sin empezar"
          : leidas >= MEL_LECTURA_TOTAL
            ? "Lección completa"
            : `${leidas} de ${MEL_LECTURA_TOTAL} lecciones leídas`,
      progress: pct,
      done: leidas >= MEL_LECTURA_TOTAL,
      cta: "Iniciar formación",
    },
    {
      to: MEL_PRACTICA,
      densidad: "compacta",
      photoAspect: "5/2",
      icon: ListChecks,
      color: MEL_ACENTO,
      meta: `${MEL_PRACTICA_CONTEO} ejercicios con entradas de MEL`,
      title: "2. Practica",
      blurb: "Encontrar el ítem, leer la entrada, calcular el plazo, decidir si sale y qué le cambia al vuelo.",
      photoHueco: "MEL-POR-02 · 5:2 · 1200×480 · Tablet con la MEL abierta en una entrada, sobre el pedestal de la cabina",
      status:
        practicados === 0
          ? "Sin empezar"
          : practicados >= MEL_PRACTICA_CONTEO
            ? "Práctica completa"
            : `${practicados} de ${MEL_PRACTICA_CONTEO} ejercicios`,
      progress: practicePct,
      done: practicados >= MEL_PRACTICA_CONTEO,
      cta: practicados === 0 ? "Iniciar práctica" : "Seguir practicando",
    },
    {
      to: MEL_EVALUACION,
      densidad: "compacta",
      photoAspect: "5/2",
      icon: GraduationCap,
      color: MEL_ACENTO,
      meta: "Opción múltiple, con explicación al final",
      title: "3. Evaluación",
      blurb: "Lo que preguntan de MEL en una entrevista técnica, con corrección al terminar.",
      photoHueco: "MEL-POR-03 · 5:2 · 1200×480 · Tech log con un diferido anotado y la etiqueta INOP al lado",
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

      <section className="relative overflow-hidden rounded-[18px] bg-[#201913] shadow-[0_1px_2px_rgba(11,27,48,0.08)]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(32,25,19,.97) 0%, rgba(69,59,51,.90) 48%, rgba(200,187,177,.48) 100%)",
          }}
          aria-hidden
        />

        <div className="relative grid gap-7 px-7 pb-7 pt-7 sm:px-12 sm:pb-8 sm:pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-10">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <span className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: "#D9CFC7" }}>
                Módulo
              </span>
              <span className="h-3 w-px bg-white/20" aria-hidden />
              <span className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                Ingreso a aerolínea
              </span>
            </div>

            <h1 className="nh-display mt-4 text-[34px] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-[42px] lg:text-[48px]">
              {MEL_TITULO}
            </h1>

            <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.55] text-white/80">
              Algo no funciona y el avión tiene que salir. Este módulo te enseña a leer la entrada,
              cumplir lo que pide y decidir si se puede despachar, y a explicarlo en una entrevista sin
              confundir MEL con MMEL ni alivio con obligación de salir.
            </p>

            <p className="mt-3 text-[13px] text-white/50">{MEL_FUENTES}</p>
          </div>

          <div className="lg:justify-self-end">
            <EspacioVideo
              src="/modulos/mel/intro.mp4"
              portada="/modulos/mel/intro-poster.webp"
              duracion="1 min"
              titulo="Del tech log al despacho"
              continuarA={MEL_APRENDE}
              continuarTexto="Empezar el módulo"
              claveVisto="aviatory.mel.video"
              acento="#C8BBB1"
              rotulo="MEL-VID-01 · Video de apertura · 16:9 · 60 s"
              descripcion="El video del módulo, con la misma serie que NOTAM, Aeropuertos y Comunicaciones: ocho escenas, un minuto, con el avatar y la voz propios del curso, en español (lang «es»). Recorre un defecto desde que se anota en el tech log hasta el despacho: la entrada de la MEL, la categoría, el (M), el (O) y la etiqueta INOP. Se guarda como intro.mp4 y su primer cuadro como intro-poster.webp; en cuanto estén, el reproductor aparece aquí solo."
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
