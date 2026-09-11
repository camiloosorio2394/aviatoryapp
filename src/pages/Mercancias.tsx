import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, BookOpen, GraduationCap, Target } from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { CourseCard } from "@/components/ui/course-card"
import { FilaAvance } from "@/components/modulo/FilaAvance"
import { VideoIntro } from "@/components/modulo/VideoIntro"
import type { CourseCardProps } from "@/components/ui/course-card"
import { useSession } from "@/hooks/useSession"
import {
  MP_APRENDE,
  MP_EVALUACION,
  MP_EXAM_PER_ATTEMPT,
  MP_LECTURA_TOTAL,
  MP_PASS_SCORE,
  MP_PRACTICA,
  MP_PRACTICA_TOTAL,
  MP_TITULO,
  resumirMercancias,
} from "@/lib/mercancias"
import { MP_MINUTOS, MP_NIVELES } from "@/lib/mercanciasLeccion"
import {
  fetchMercanciasProgress,
  pushPendingMercancias,
  readMercanciasLocal,
} from "@/lib/mercanciasProgress"

/**
 * Hub del tema Mercancías peligrosas (módulo Ingreso a aerolínea).
 * Ruta: /app/aerolinea/mercancias
 *
 * La misma casa que el hub de NOTAM: hero con foto y velo navy, franja de
 * avance con tres celdas y las tres puertas numeradas. Lo único que cambia es
 * el acento, que aquí es el amarillo aviación del módulo, y las fotos.
 */


export function Mercancias() {
  const { user, isLoading: sessionLoading } = useSession()
  // Arranca con el respaldo local para no mostrar cero mientras carga, y se
  // completa con la base, que es la verdad entre dispositivos.
  const [progreso, setProgreso] = useState(() => readMercanciasLocal())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionLoading) return
    let cancelado = false

    void (async () => {
      if (!user) {
        if (!cancelado) setLoading(false)
        return
      }
      try {
        const traido = await fetchMercanciasProgress(user.id)
        if (cancelado || !traido) return
        // Sube lo que se avanzó sin sesión; el resumen muestra la base unida con lo local.
        await pushPendingMercancias(traido)
        if (!cancelado) setProgreso(traido)
      } catch {
        /* sin red: se queda el respaldo local */
      } finally {
        if (!cancelado) setLoading(false)
      }
    })()

    return () => {
      cancelado = true
    }
  }, [user, sessionLoading])

  const resumen = useMemo(() => resumirMercancias(progreso), [progreso])

  const partes: CourseCardProps[] = [
    {
      to: MP_APRENDE,
      densidad: "compacta" as const,
      photoAspect: "5/2" as const,
      icon: BookOpen,
      color: "var(--av-dg-700)",
      meta: `${MP_LECTURA_TOTAL} lecciones · ${MP_NIVELES.length} niveles · ${MP_MINUTOS} min`,
      title: "1. Aprende",
      blurb:
        "Las nueve clases, quién responde por qué y qué firmas antes de cada salida. Y al cierre de cada nivel, la entrevista de aerolínea.",
      cta: "Iniciar formación",
      photoHueco: "MP-POR-01 · Portada 5:2 · 1200×480 · Un bulto etiquetado en rampa",
      status:
        resumen.lessonRead === 0
          ? "Sin empezar"
          : resumen.lessonRead >= MP_LECTURA_TOTAL
            ? "Lección completa"
            : `${resumen.lessonRead} de ${MP_LECTURA_TOTAL} lecciones leídas`,
      progress: resumen.lessonPct,
      done: resumen.lessonRead >= MP_LECTURA_TOTAL,
    },
    {
      to: MP_PRACTICA,
      densidad: "compacta" as const,
      photoAspect: "5/2" as const,
      icon: Target,
      color: "var(--av-dg-700)",
      meta: `${MP_PRACTICA_TOTAL} ejercicios · Etiquetas, envíos y escenarios`,
      title: "2. Práctica",
      blurb:
        "Reconoces etiquetas, clasificas envíos y resuelves escenarios de entrevista técnica.",
      cta: "Iniciar práctica",
      photoHueco: "MP-POR-02 · Portada 5:2 · 1200×480 · Un ULD con etiquetas de riesgo",
      status:
        resumen.practiceDone === 0
          ? "Sin empezar"
          : `${resumen.practiceDone} de ${MP_PRACTICA_TOTAL} resueltos`,
      progress: resumen.practicePct,
      done: resumen.practiceDone >= MP_PRACTICA_TOTAL,
    },
    {
      to: MP_EVALUACION,
      densidad: "compacta" as const,
      photoAspect: "5/2" as const,
      icon: GraduationCap,
      color: "var(--av-dg-700)",
      meta: `${MP_EXAM_PER_ATTEMPT} preguntas · Puntaje mínimo ${MP_PASS_SCORE}%`,
      title: "3. Evaluación",
      blurb:
        "Opción múltiple barajada. Al terminar ves la explicación y el artículo de cada pregunta.",
      cta: "Iniciar evaluación",
      photoHueco: "MP-POR-03 · Portada 5:2 · 1200×480 · Cabina con el NOTOC en la mano",
      status:
        resumen.best === null
          ? "Sin intentos"
          : resumen.passed
            ? `Aprobada con ${resumen.best} de 100`
            : `Mejor puntaje: ${resumen.best} de 100`,
      done: resumen.passed,
    },
  ]

  return (
    <AppLayout>
      <div className="notam-hub px-5 sm:px-8 py-9 sm:py-11 pb-24 max-w-[1280px] mx-auto">
        <Link
          to="/app/aerolinea"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a Ingreso a aerolínea
        </Link>

        {/* Hero de sección: la foto a sangre bajo un velo navy en degradado,
            para que el título se lea sobre cualquier zona de la imagen. */}
        <section className="relative overflow-hidden rounded-[18px] bg-[#0A1524] shadow-[0_1px_2px_rgba(11,27,48,0.08)]">
          {/* La imagen de fondo se retiró para rehacerla. El hueco NO se borra:
              el hero conserva su caja, su velo y su forma, así que cuando llegue
              la imagen se vuelve a poner el <img> justo aquí y no cambia nada
              más. El rótulo de la esquina dice la medida que hace falta. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(8,20,36,.97) 0%, rgba(8,20,36,.94) 42%, rgba(8,20,36,.86) 72%, rgba(8,20,36,.78) 100%)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-2 rounded-[14px] border border-dashed border-white/[0.10]"
            aria-hidden
          />
          <span className="nh-display pointer-events-none absolute bottom-3 right-4 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/30">
            [Imagen de fondo · 2432×860 · espacio reservado]
          </span>

          <div className="relative grid gap-7 px-7 pb-7 pt-7 sm:px-12 sm:pb-8 sm:pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,248px)] lg:gap-10">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em]"
                  style={{ color: "var(--av-dg-500)" }}
                >
                  Módulo 2
                </span>
                <span className="h-3 w-px bg-white/20" aria-hidden />
                <span className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                  Ingreso a aerolínea
                </span>
              </div>

              <h1 className="nh-display mt-4 text-[38px] font-bold leading-none tracking-[-0.03em] text-white sm:text-[46px] lg:text-[54px]">
                {MP_TITULO}
              </h1>

              <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.55] text-white/80">
                Las nueve clases, quién responde por qué, lo que puede volar y lo que no, el
                documento que firmas antes de cada salida y qué hacer si algo pasa en vuelo. Es lo
                que te preguntan en una entrevista técnica.
              </p>

              <div className="mt-5 flex w-fit max-w-full flex-col gap-3">
                {/* La miniatura y el cartel son el mismo fotograma mientras el
                    módulo no tenga foto de hero. Cuando la haya, la miniatura
                    pasa a ser esa foto, como en NOTAM. */}
                <VideoIntro
                  src="/modulos/mercancias/intro.mp4"
                  miniatura="/modulos/mercancias/intro-poster.webp"
                  portada="/modulos/mercancias/intro-poster.webp"
                  duracion="59 s"
                  titulo="Introducción al módulo de Mercancías peligrosas"
                  continuarA={MP_APRENDE}
                  continuarTexto="Empezar la lección"
                  claveVisto="av:visto:intro:mercancias"
                  acento="var(--av-dg-700)"
                />

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to={MP_APRENDE}
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-[10px] px-6 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(10,26,47,0.35)] transition-[filter] hover:brightness-110"
                    style={{ background: "var(--av-dg-700)" }}
                  >
                    <BookOpen className="h-4 w-4" /> Empezar la lección
                  </Link>
                  <Link
                    to={MP_PRACTICA}
                    className="inline-flex min-h-[48px] items-center gap-2 whitespace-nowrap rounded-[10px] border border-white/25 px-5 text-[15px] font-medium text-white/90 transition-colors hover:border-white/60 hover:text-white"
                  >
                    <Target className="h-4 w-4" /> Ir a la práctica
                  </Link>
                </div>
              </div>
            </div>

            {/* Avance del módulo: la cifra global y, bajo una línea fina, de qué
                se compone. Una sola caja de cristal sobre la foto. Los 33px de
                margen son el alto del rótulo más el margen del título, o sea lo
                que la columna izquierda tiene por encima del h1 y esta no: con
                ellos, el tope del cuadro y el de las letras coinciden. */}
            <div className="self-start overflow-hidden rounded-[14px] border border-white/15 bg-[rgba(6,17,31,0.62)] backdrop-blur-[6px] lg:mt-[33px] lg:min-w-[210px]">
              <div className="px-3.5 pb-3 pt-3.5">
                <div className="nh-display text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
                  Tu avance
                </div>
                {loading ? (
                  <>
                    <div className="mt-2.5 h-6 w-16 animate-pulse rounded bg-white/15" />
                    <div className="mt-3 h-1 animate-pulse rounded-sm bg-white/15" />
                  </>
                ) : (
                  <>
                    <div className="mt-1.5 flex items-baseline gap-2">
                      <span className="nh-display tabular text-[23px] font-bold leading-none text-white">
                        {resumen.overall}%
                      </span>
                      <span className="text-[11px] text-white/60">del módulo</span>
                    </div>
                    <div
                      className="mt-3 h-1 overflow-hidden rounded-sm bg-white/15"
                      role="progressbar"
                      aria-valuenow={resumen.overall}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Avance del módulo Mercancías peligrosas"
                    >
                      <div
                        className="h-full rounded-sm transition-[width]"
                        style={{ width: `${resumen.overall}%`, background: "var(--av-dg-500)" }}
                      />
                    </div>
                  </>
                )}
                {/* Solo sin sesión, y esperando a saberlo: mientras se resuelve,
                    `user` está indefinido y a quien sí tiene sesión le
                    parpadearía un aviso diciéndole que no la tiene. */}
                {!sessionLoading && !user && (
                  <p className="mt-2 text-[10.5px] leading-[1.5] text-white/55">
                    Inicia sesión para guardar tu avance en la cuenta.
                  </p>
                )}
              </div>

              <div className="border-t border-white/10 p-1">
                <FilaAvance
                  titulo="Lección"
                  to={MP_APRENDE}
                  valor={`${resumen.lessonRead} / ${MP_LECTURA_TOTAL}`}
                  pct={resumen.lessonPct}
                  color="#4E9BF5"
                  cargando={loading}
                />
                <FilaAvance
                  titulo="Práctica"
                  to={MP_PRACTICA}
                  valor={`${resumen.practiceDone} / ${MP_PRACTICA_TOTAL}`}
                  pct={resumen.practicePct}
                  color="var(--av-cyan-400)"
                  cargando={loading}
                />
                <FilaAvance
                  titulo="Evaluación"
                  to={MP_EVALUACION}
                  valor={resumen.best === null ? "Sin intentos" : `${resumen.best} / 100`}
                  aviso={resumen.best === null}
                  pct={resumen.examPct}
                  color={resumen.passed ? "var(--av-green-400)" : "var(--av-amber-400)"}
                  cargando={loading}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Las tres partes */}
        <section className="pt-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {partes.map((p) => (
              <CourseCard key={p.title} {...p} statusLoading={loading} />
            ))}
          </div>
        </section>

      </div>
    </AppLayout>
  )
}
