import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowRight,
  Briefcase,
  ClipboardCheck,
  ClipboardList,
  CloudSun,
  FileSearch,
  Plane,
} from "lucide-react"
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
import {
  METAR_EXAM_QUESTIONS,
  METAR_LEGEND_TOTAL,
  METAR_PRACTICE_TOTAL,
  readMetarProgress,
  resumirMetar,
} from "@/lib/metar"
import { fetchMetarProgress } from "@/lib/metarProgress"
import { METAR_LESSON_TOTAL } from "@/lib/metarLesson"
import notamPhoto from "@/assets/photos/tema-notam-pista-luces.jpg"
import meteorologiaPhoto from "@/assets/photos/tema-meteorologia-nubes-altura.jpg"
// Reusa la foto que la portada ya asocia a este módulo: la herramienta es del
// módulo, no un curso aparte, y compartir la imagen lo dice sin texto.
import matchPhoto from "@/assets/photos/aerolinea-piloto.jpg"
import simulacroPhoto from "@/assets/photos/notam-evaluacion-examen.jpg"

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

/**
 * Temas que todavía no tienen contenido, en el orden en que se van abriendo.
 *
 * "Requisitos por aerolínea" salió de esta lista: no está pendiente, ya existe
 * como /app/match ("Para cuál calificas"), que consulta aerolíneas, horas y
 * perfil y calcula exactamente eso. Anunciarlo como futuro y enlazarlo cuarenta
 * píxeles más abajo era la contradicción del hallazgo C5.
 */
const PROXIMOS: string[] = [
  "Performance y planificación",
  "Sistemas y motor a reacción",
  "Entrevista técnica",
  "Entrevista HR y CRM",
  "Psicotécnicos y assessment",
]

interface TemaEstado {
  card: CourseCardProps
  /** Avance del tema, 0 a 100. Decide el orden de la lista. */
  pct: number
  to: string
  nombre: string
  /** Una herramienta no se estudia ni se completa: va al final y no se retoma. */
  herramienta?: boolean
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
  const metar = useMemo(() => {
    const local = readMetarProgress()
    return resumirMetar({
      lessonScreens: metarScreens,
      practiceDone: local.practiceDone,
      bestExamScore: local.bestExamScore,
    })
  }, [metarScreens])

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
          meta: `${METAR_LESSON_TOTAL} secciones · ${METAR_LEGEND_TOTAL} claves · ${METAR_PRACTICE_TOTAL} informes de práctica · ${METAR_EXAM_QUESTIONS.length} preguntas`,
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
              ? "Tema completo"
              : `Vas por el ${metar.overall}%: ${metar.lessonRead} de ${METAR_LESSON_TOTAL} secciones y ${metar.practiceDone} de ${METAR_PRACTICE_TOTAL} informes`,
        },
      },
      // El cierre del módulo, al estilo del simulacro TEA: la razón para volver
      // cuando ya leíste todo. No se completa, así que va con las herramientas.
      {
        nombre: "Simulacro de entrevista técnica",
        to: "/app/aerolinea/simulacro",
        pct: 0,
        herramienta: true,
        card: {
          to: "/app/aerolinea/simulacro",
          icon: ClipboardCheck,
          color: "var(--av-amber-400)",
          meta: `${TOTALS.examQuestions + METAR_EXAM_QUESTIONS.length} preguntas en el banco, 25 por intento`,
          title: "Simulacro de entrevista técnica",
          blurb:
            "Preguntas mezcladas de todos los temas abiertos, sin decirte de cuál es cada una. Como en la prueba de verdad.",
          photo: simulacroPhoto,
          cta: "Presentar el simulacro",
          status: "Cada intento baraja de nuevo",
        },
      },
      {
        nombre: "Para cuál calificas",
        to: "/app/match",
        pct: 0,
        herramienta: true,
        card: {
          to: "/app/match",
          icon: ClipboardList,
          color: "var(--av-green-400)",
          meta: "Tus horas y tu perfil contra lo que pide cada aerolínea",
          title: "Para cuál calificas",
          blurb:
            "Qué pide cada aerolínea de la región y qué te falta a ti para postular. Se calcula con tu Logbook y tu perfil, así que se actualiza solo.",
          photo: matchPhoto,
          cta: "Ver mi match",
          status: "Herramienta, siempre disponible",
        },
      },
    ]

    // Primero lo que está a medias, después lo no empezado y de último lo
    // terminado: la pantalla ordena por lo que te falta hacer, no por el orden
    // en que se publicaron los temas. Las herramientas van al final: no se
    // estudian ni se completan.
    const grupo = (t: TemaEstado) =>
      t.herramienta ? 3 : t.pct >= 100 ? 2 : t.pct > 0 ? 0 : 1
    return lista
      .map((t, i) => ({ t, i }))
      .sort((a, b) => grupo(a.t) - grupo(b.t) || b.t.pct - a.t.pct || a.i - b.i)
      .map(({ t }) => t)
  }, [notam, metar])

  // El único botón primario de la pantalla: retomar donde ibas, o entrar al
  // primero si todavía no empezaste nada. Las herramientas no se retoman.
  const cursables = temas.filter((t) => !t.herramienta)
  const enCurso = cursables.find((t) => t.pct > 0 && t.pct < 100)
  const continuar = enCurso ?? cursables[0]

  // Para la línea de ruta: cuántos temas hay abiertos y por cuál vas. Si
  // empezaste uno, vas por el primero, no por el segundo: el número es cuántos
  // has tocado, con mínimo uno (el que estás a punto de empezar).
  const disponibles = cursables.length
  const temaActual = Math.min(Math.max(1, cursables.filter((t) => t.pct > 0).length), disponibles)

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
                <Plane className="h-4 w-4" />
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

        {/* Los que siguen, contados como ruta y no como huecos. Antes eran seis
            tarjetas apagadas que ocupaban media pantalla para decir solamente
            que no existen; un temario que avanza es lo que un piloto quiere
            ver. Las cifras salen del propio arreglo: no se descuadran solas. */}
        <p className="mt-6 text-[13px] text-muted-foreground leading-relaxed max-w-[820px]">
          <span className="font-medium text-foreground">
            Vas por el tema {temaActual} de {disponibles + PROXIMOS.length}. El próximo que abrimos
            es {PROXIMOS[0]}.
          </span>{" "}
          Después vienen {PROXIMOS.slice(1, -1).join(", ")} y {PROXIMOS[PROXIMOS.length - 1]}. Los
          abrimos en ese orden, cada uno cuando su contenido está completo.
        </p>

        {/* Lo que sí puedes adelantar hoy */}
        <section className="mt-8 rounded-xl surface p-6">
          <div className="text-[15px] font-semibold">Mientras tanto</div>
          <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed max-w-[680px]">
            Tu Logbook y tus vencimientos alimentan el Pilot ID que vas a necesitar el día que
            postules. Cuanto más completo esté, más fino sale tu match por aerolínea.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/app/logbook" className={appButtonClass({ variant: "secondary" })}>
              Mi Logbook <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link to="/app/vencimientos" className={appButtonClass({ variant: "secondary" })}>
              Mis vencimientos <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}
