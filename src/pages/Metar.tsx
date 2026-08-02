import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, BookOpen, ClipboardCheck, ScanSearch, Target } from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { CourseCard } from "@/components/ui/course-card"
import type { CourseCardProps } from "@/components/ui/course-card"
import { useSession } from "@/hooks/useSession"
import { supabase } from "@/integrations/supabase/client"
import {
  METAR_EXAM_PASS_SCORE,
  METAR_EXAM_QUESTIONS,
  METAR_LEGEND_TOTAL,
  METAR_PRACTICE_TOTAL,
  readMetarProgress,
  resumirMetar,
} from "@/lib/metar"
import { fetchMetarProgress, pushPendingMetarProgress } from "@/lib/metarProgress"
import { METAR_EXAMPLES } from "@/lib/metar"
import { METAR_LESSON_TOTAL } from "@/lib/metarLesson"
import aprendePhoto from "@/assets/photos/metar-leccion-nubes.jpg"
import decodificadorPhoto from "@/assets/photos/metar-decodificador-manga.jpg"
import practicaPhoto from "@/assets/photos/metar-practica-cabina-nubes.jpg"
import evaluacionPhoto from "@/assets/photos/metar-evaluacion-escritorio.jpg"

/**
 * Hub del tema Meteorología operacional (módulo Ingreso a aerolínea).
 * Ruta: /app/aerolinea/meteorologia
 *
 * El tema completo: lección, decodificador, práctica y evaluación. El TAF
 * tendrá su propia lección. Las tres partes con progreso viven en la base con
 * respaldo local: lección y práctica en user_metar_progress, la evaluación en
 * user_metar_exam_attempts.
 *
 * Las partes se presentan con la tarjeta de curso compartida, la misma del
 * catálogo de la portada y del hub de NOTAM.
 */

export function Metar() {
  const { user, isLoading: sessionLoading } = useSession()
  // Arranca con el respaldo local para no mostrar cero mientras carga, y se
  // completa con lo que haya en la base (que es la verdad entre dispositivos).
  // Las tres partes se hidratan juntas. Antes solo la lección venía de la base
  // y la práctica y la evaluación se leían del respaldo local, así que en otro
  // dispositivo el tema decía "0 de 10 informes" sobre trabajo ya hecho.
  const [progreso, setProgreso] = useState(() => {
    const local = readMetarProgress()
    return {
      lessonScreens: local.lessonScreens,
      practiceDone: local.practiceDone,
      bestExamScore: local.bestExamScore,
    }
  })

  useEffect(() => {
    if (sessionLoading) return
    const uid = user?.id
    if (!uid) return
    let cancelled = false

    void (async () => {
      const [fetched, examRes] = await Promise.all([
        fetchMetarProgress(uid),
        supabase
          .from("user_metar_exam_attempts")
          .select("score")
          .eq("user_id", uid)
          .order("score", { ascending: false })
          .limit(1),
      ])
      if (cancelled || !fetched) return
      const remote = await pushPendingMetarProgress(fetched)
      if (cancelled) return
      const local = readMetarProgress()
      const best = (examRes.data ?? [])[0]?.score
      const scores = [typeof best === "number" ? best : null, local.bestExamScore].filter(
        (s): s is number => typeof s === "number"
      )
      setProgreso({
        lessonScreens: Array.from(new Set([...local.lessonScreens, ...remote.lessonScreens])),
        practiceDone: Array.from(new Set([...local.practiceDone, ...remote.practiceDone])),
        bestExamScore: scores.length > 0 ? Math.max(...scores) : null,
      })
    })()

    return () => {
      cancelled = true
    }
  }, [user?.id, sessionLoading])

  const resumen = resumirMetar(progreso)

  const partes: CourseCardProps[] = [
    {
      to: "/app/aerolinea/meteorologia/aprende",
      icon: BookOpen,
      color: "var(--av-blue-500)",
      meta: `${METAR_LESSON_TOTAL} secciones de lectura`,
      title: "Aprende",
      blurb:
        "Qué es un METAR y cómo leerlo grupo por grupo: viento, visibilidad, tiempo presente, nubes, QNH y tendencias.",
      cta: "Abrir la lección",
      photo: aprendePhoto,
      status:
        resumen.lessonRead === 0
          ? "Sin empezar"
          : resumen.lessonRead >= METAR_LESSON_TOTAL
            ? "Lección completa"
            : `${resumen.lessonRead} de ${METAR_LESSON_TOTAL} secciones leídas`,
      progress: resumen.lessonPct,
      done: resumen.lessonRead >= METAR_LESSON_TOTAL,
    },
    {
      to: "/app/aerolinea/meteorologia/decodificador",
      icon: ScanSearch,
      color: "var(--av-cyan-400)",
      meta: `${METAR_LEGEND_TOTAL} claves y ${METAR_EXAMPLES.length} informes de ejemplo`,
      title: "Decodificador",
      blurb:
        "Pega cualquier METAR y te lo desarma grupo por grupo. Trae las tablas de fenómenos, descriptores, nubes y tendencias con buscador.",
      cta: "Abrir el decodificador",
      photo: decodificadorPhoto,
      status: "Consulta libre, sin límite",
    },
    {
      to: "/app/aerolinea/meteorologia/practica",
      icon: Target,
      color: "var(--av-violet-400)",
      meta: `${METAR_PRACTICE_TOTAL} informes con respuesta modelo`,
      title: "Práctica",
      blurb:
        "Lees el informe, lo interpretas con tus palabras y solo después comparas con la respuesta modelo. Con los errores típicos de cada caso.",
      cta: "Empezar a practicar",
      photo: practicaPhoto,
      status:
        resumen.practiceDone === 0
          ? "Sin empezar"
          : `${resumen.practiceDone} de ${METAR_PRACTICE_TOTAL} resueltos`,
      progress: resumen.practicePct,
      done: resumen.practiceDone >= METAR_PRACTICE_TOTAL,
    },
    {
      to: "/app/aerolinea/meteorologia/evaluacion",
      icon: ClipboardCheck,
      color: "var(--av-amber-400)",
      meta: `${METAR_EXAM_QUESTIONS.length} preguntas, apruebas con ${METAR_EXAM_PASS_SCORE}`,
      title: "Evaluación",
      blurb:
        "Opción múltiple con preguntas y opciones barajadas. Al final ves la explicación y la referencia de cada una.",
      cta: "Presentar la evaluación",
      photo: evaluacionPhoto,
      status:
        resumen.best === null
          ? "Sin intentos"
          : resumen.passed
            ? `Aprobada con ${resumen.best} de 100`
            : `Mejor puntaje: ${resumen.best} de 100`,
      progress: resumen.examPct,
      done: resumen.passed,
    },
  ]

  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-12 max-w-[1280px] mx-auto">
        {/* Mismo control de volver que el hub de NOTAM: un enlace de texto sobre
            el título, no un botón compitiendo con la acción de la página. */}
        <Link
          to="/app/aerolinea"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a Ingreso a aerolínea
        </Link>

        <PageHeader
          eyebrow="Ingreso a aerolínea · Meteorología operacional"
          title="METAR: el estado del cielo en una línea"
          subtitle="La lectura obligada del briefing junto al NOTAM. Lección, decodificador, práctica y evaluación. El TAF tendrá su propia lección."
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {partes.map((p) => (
            <CourseCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
