import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Briefcase, CloudSun, FileSearch, Sparkles } from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { CourseCard } from "@/components/ui/course-card"
import type { CourseCardProps } from "@/components/ui/course-card"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import {
  NOTAM_PRACTICE_TOTAL,
  TOTALS,
  readLocalProgress,
  resumirNotam,
} from "@/lib/notam"
import { fetchNotamProgress } from "@/lib/notamProgress"
import { METAR_EXAMPLES, METAR_LEGEND_TOTAL, readMetarProgress, resumirMetar } from "@/lib/metar"
import { fetchMetarProgress } from "@/lib/metarProgress"
import { METAR_LESSON_TOTAL } from "@/lib/metarLesson"
import notamPhoto from "@/assets/photos/tema-notam-pista-luces.jpg"
import meteorologiaPhoto from "@/assets/photos/tema-meteorologia-nubes-altura.jpg"

/**
 * Módulo Ingreso a aerolínea: la lista de TEMAS de estudio.
 *
 * Cada tema se abre por dentro cuando su contenido está listo; hoy están
 * abiertos NOTAM y Meteorología operacional.
 *
 * La pantalla lee el progreso real de cada tema y ordena por él: primero lo
 * que quedó a medias, después lo que no se ha tocado y de último lo terminado.
 * Antes era estática, así que quien llevaba 6 de 13 secciones de NOTAM veía
 * exactamente lo mismo que quien nunca lo abrió.
 *
 * Las tarjetas usan el mismo componente de catálogo que la portada y los hubs
 * de cada tema: la foto orienta y distingue, y el único botón primario de la
 * pantalla es el de continuar.
 */

/** Temas que todavía no tienen contenido, en el orden en que se van abriendo. */
const PROXIMOS: string[] = [
  "Performance y planificación",
  "Sistemas y motor a reacción",
  "Entrevista técnica",
  "Entrevista HR y CRM",
  "Psicotécnicos y assessment",
  "Requisitos por aerolínea",
]

interface TemaEstado {
  card: CourseCardProps
  /** Avance del tema, 0 a 100. Decide el orden de la lista. */
  pct: number
  to: string
  nombre: string
}

export function AirlinePrep() {
  const { user, isLoading: sessionLoading } = useSession()
  const [notamProgress, setNotamProgress] = useState(() => {
    const local = readLocalProgress()
    return {
      lessonScreens: local.lessonScreens,
      practiceDone: local.exercisesDone,
      bestExamScore: local.bestExamScore,
    }
  })
  const [metarScreens, setMetarScreens] = useState<number[]>(
    () => readMetarProgress().lessonScreens
  )
  const [hidratado, setHidratado] = useState(false)

  // Quien estudia sin cuenta ve su respaldo local de inmediato: no hay nada que
  // esperar. Con sesión, se espera a la base antes de dar el avance por bueno.
  const loading = sessionLoading || (Boolean(user) && !hidratado)

  // Arranca con el respaldo local (así la pantalla nunca miente hacia abajo
  // mientras carga) y lo completa con la base, que es la verdad entre
  // dispositivos. Si una consulta falla, se queda con lo local en vez de
  // borrar el avance de la vista.
  useEffect(() => {
    if (sessionLoading || !user) return
    let cancelled = false

    void (async () => {
      const [notamRes, metarRes, examRes] = await Promise.all([
        fetchNotamProgress(user.id),
        fetchMetarProgress(user.id),
        supabase
          .from("user_notam_exam_attempts")
          .select("score")
          .eq("user_id", user.id)
          .order("score", { ascending: false })
          .limit(1),
      ])
      if (cancelled) return

      if (notamRes) {
        const best = (examRes.data ?? [])[0]?.score
        const local = readLocalProgress()
        const scores = [typeof best === "number" ? best : null, local.bestExamScore].filter(
          (s): s is number => typeof s === "number"
        )
        setNotamProgress({
          lessonScreens: Array.from(
            new Set([...notamRes.lessonScreens, ...local.lessonScreens])
          ),
          practiceDone: Array.from(new Set([...notamRes.practiceDone, ...local.exercisesDone])),
          bestExamScore: scores.length > 0 ? Math.max(...scores) : null,
        })
      }
      if (metarRes) {
        setMetarScreens(
          Array.from(new Set([...metarRes.lessonScreens, ...readMetarProgress().lessonScreens]))
        )
      }
      setHidratado(true)
    })()

    return () => {
      cancelled = true
    }
  }, [user, sessionLoading])

  const notam = useMemo(() => resumirNotam(notamProgress), [notamProgress])
  const metar = useMemo(() => resumirMetar({ lessonScreens: metarScreens }), [metarScreens])

  const temas: TemaEstado[] = useMemo(() => {
    const lista: TemaEstado[] = [
      {
        nombre: "NOTAM",
        to: "/app/aerolinea/notam",
        pct: notam.overall,
        card: {
          to: "/app/aerolinea/notam",
          icon: FileSearch,
          color: "var(--av-blue-500)",
          // Las cifras salen de los datos cargados, no de un texto a mano: si
          // el banco crece, la promesa de la tarjeta crece con él.
          meta: `${TOTALS.lessonScreens} secciones · ${TOTALS.subjects + TOTALS.statuses} códigos · ${TOTALS.exercises} ejercicios · ${TOTALS.national} NOTAM reales · ${TOTALS.examQuestions} preguntas`,
          title: "NOTAM",
          blurb:
            "Qué es un NOTAM, cómo se lee la línea Q y cómo decodificar cualquier aviso. Con material real de la Aerocivil.",
          photo: notamPhoto,
          cta: notam.empty ? "Empezar el tema" : "Seguir con el tema",
          progress: notam.overall,
          done: notam.overall >= 100,
          status: notam.empty
            ? "Arranca por la lección: 13 secciones cortas"
            : notam.overall >= 100
              ? "Tema completo"
              : `Vas por el ${notam.overall}%: ${notam.lessonRead} de ${TOTALS.lessonScreens} secciones y ${notam.practiceDone} de ${NOTAM_PRACTICE_TOTAL} ejercicios`,
        },
      },
      {
        nombre: "Meteorología operacional",
        to: "/app/aerolinea/meteorologia",
        pct: metar.overall,
        card: {
          to: "/app/aerolinea/meteorologia",
          icon: CloudSun,
          color: "var(--av-cyan-400)",
          meta: `${METAR_LESSON_TOTAL} secciones · ${METAR_LEGEND_TOTAL} claves de la leyenda · ${METAR_EXAMPLES.length} informes de ejemplo`,
          title: "Meteorología operacional",
          // El resumen promete solo lo publicado: METAR. Cuando el curso TAF
          // exista, se restaura la promesa completa (decisión anotada en
          // src/data/metar/FUENTES.md).
          blurb:
            "METAR: la lectura del cielo que te preguntan en la entrevista técnica. TAF llega después.",
          photo: meteorologiaPhoto,
          cta: metar.empty ? "Empezar el tema" : "Seguir con el tema",
          progress: metar.overall,
          done: metar.overall >= 100,
          status: metar.empty
            ? "Arranca por la lección: 9 secciones cortas"
            : metar.overall >= 100
              ? "Lección completa. La práctica llega pronto"
              : `Vas por el ${metar.overall}%: ${metar.lessonRead} de ${METAR_LESSON_TOTAL} secciones leídas`,
        },
      },
    ]

    // Primero lo que está a medias, después lo no empezado y de último lo
    // terminado: la pantalla ordena por lo que te falta hacer, no por el orden
    // en que se publicaron los temas.
    const grupo = (t: TemaEstado) => (t.pct >= 100 ? 2 : t.pct > 0 ? 0 : 1)
    return lista
      .map((t, i) => ({ t, i }))
      .sort((a, b) => grupo(a.t) - grupo(b.t) || b.t.pct - a.t.pct || a.i - b.i)
      .map(({ t }) => t)
  }, [notam, metar])

  // El único botón primario de la pantalla: retomar donde ibas, o entrar al
  // primero si todavía no empezaste nada.
  const enCurso = temas.find((t) => t.pct > 0 && t.pct < 100)
  const continuar = enCurso ?? temas[0]

  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-12 max-w-[1280px] mx-auto">
        <PageHeader
          eyebrow={
            <>
              <Briefcase className="h-3.5 w-3.5" /> Carrera
            </>
          }
          title="Preparación para aerolínea"
          subtitle="Los temas que evalúan las aerolíneas de Latinoamérica, uno por uno. Abrimos cada tema cuando su contenido está completo, no antes."
          actions={
            loading ? (
              <span
                className="block h-9 w-44 rounded-lg bg-muted animate-pulse"
                aria-hidden="true"
              />
            ) : (
              <Link
                to={continuar.to}
                className={appButtonClass({ size: "lg" })}
                style={appButtonStyle()}
              >
                <Sparkles className="h-4 w-4" />
                {enCurso ? `Seguir con ${enCurso.nombre}` : `Empezar por ${continuar.nombre}`}
              </Link>
            )
          }
        />

        {/* Temas con contenido */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {temas.map((t) => (
            <CourseCard key={t.to} {...t.card} statusLoading={loading} />
          ))}
        </div>

        {/* Los que siguen. Antes eran seis tarjetas apagadas que ocupaban media
            pantalla para decir solamente que no existen. Una línea informa lo
            mismo, y además nombra cuál es el próximo. */}
        <p className="mt-6 text-[13px] text-muted-foreground leading-relaxed max-w-[820px]">
          <span className="font-medium text-foreground">
            El próximo tema es {PROXIMOS[0]}.
          </span>{" "}
          Después vienen {PROXIMOS.slice(1, -1).join(", ")} y {PROXIMOS[PROXIMOS.length - 1]}. Los
          abrimos en ese orden, cada uno cuando su contenido está completo.
        </p>

        {/* Lo que sí puedes adelantar hoy */}
        <section className="mt-8 rounded-xl surface p-6">
          <div className="text-[15px] font-semibold">Mientras tanto</div>
          <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed max-w-[680px]">
            Tu Logbook y tus vencimientos alimentan el Pilot ID que vas a necesitar el día que
            postules, y el match por aerolínea te dice qué requisito te falta para cada una.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/app/match" className={appButtonClass({ variant: "secondary" })}>
              Ver mi match <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link to="/app/logbook" className={appButtonClass({ variant: "secondary" })}>
              Mi Logbook <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}
