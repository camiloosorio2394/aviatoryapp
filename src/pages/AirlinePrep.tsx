import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  AlertTriangle,
  ArrowRight,
  Brain,
  ClipboardCheck,
  ClipboardList,
  CloudSun,
  Plane,
} from "lucide-react"
import { AerodromeIcon } from "@/components/icons/aero"
import { AppLayout } from "@/components/layout/AppLayout"
import { TarjetaModulo } from "@/components/aerolinea/TarjetaModulo"
import type { TarjetaModuloProps } from "@/components/aerolinea/TarjetaModulo"
import { appButtonClass } from "@/lib/buttonStyles"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import {
  NOTAM_PRACTICE_TOTAL,
  TOTALS,
  readLocalProgress,
  resumirNotam,
} from "@/lib/notam"
import { fetchNotamProgress } from "@/lib/notamProgress"
import { METAR_PRACTICE_TOTAL, readMetarProgress, resumirMetar } from "@/lib/metar"
import { fetchMetarProgress } from "@/lib/metarProgress"
import { METAR_LESSON_MINUTES, METAR_LESSON_TOTAL } from "@/lib/metarLesson"
import { LESSON_MINUTES } from "@/lib/notamLesson"
import {
  AIRLINE_MOCK_PASS_SCORE,
  BANCO_TOTAL,
  fetchMejorPuntajeSimulacro,
  readAirlineMockLocal,
} from "@/lib/airlineMock"
import { MP_HUB, MP_LECTURA_TOTAL, MP_PRACTICA_TOTAL, resumirMercancias } from "@/lib/mercancias"
import { MP_MINUTOS } from "@/lib/mercanciasLeccion"
import { PSICO_HUB, SIMULACRO_TOTAL } from "@/lib/psicotecnicas"
import { BANCO_TOTAL as PSICO_BANCO_TOTAL } from "@/data/psicotecnicas"
import { leerPsicoLocal, mejorSimulacroRemoto } from "@/lib/psicotecnicasProgress"
import { fetchMercanciasProgress, readMercanciasLocal } from "@/lib/mercanciasProgress"
import notamPhoto from "@/assets/photos/tema-notam-pista-luces.jpg"
import meteorologiaPhoto from "@/assets/photos/tema-meteorologia-nubes-altura.jpg"
// Reusa la foto que la portada ya asocia a este módulo: la herramienta es del
// módulo, no un curso aparte, y compartir la imagen lo dice sin texto.
import matchPhoto from "@/assets/photos/aerolinea-piloto.jpg"
import simulacroPhoto from "@/assets/photos/notam-evaluacion-examen.jpg"
// La cabina al amanecer: la foto no la usa ninguna tarjeta de esta pantalla,
// así que el hero no repite imagen con lo que tiene debajo.
import heroPhoto from "@/assets/photos/cta-cockpit-dawn.jpg"

/**
 * Módulo Ingreso a aerolínea: la lista de TEMAS de estudio.
 *
 * La pantalla lee el progreso real de cada tema y ordena por él: primero lo
 * que quedó a medias, después lo que no se ha tocado y de último lo terminado.
 * Antes era estática, así que quien llevaba 6 de 13 secciones de NOTAM veía
 * exactamente lo mismo que quien nunca lo abrió.
 *
 * Composición pensada para cuatro columnas (11 de septiembre de 2026):
 *
 *  - Arriba, el hero de las portadas de módulo en su versión corta: foto bajo
 *    velo navy, titular en Archivo y el panel de avance de cristal. Antes
 *    era la cabecera genérica de la app, y la pantalla que agrupa los módulos
 *    no se parecía a ninguno de ellos.
 *  - Los temas van en una rejilla de cuatro, porque son cuatro y son
 *    equivalentes. Las herramientas no se estudian ni se terminan, así que van
 *    en su propio grupo, en dos tarjetas horizontales que llenan la fila en vez
 *    de dejar dos huecos.
 *  - La rejilla responde al ancho del contenido y no al de la ventana, porque
 *    la barra lateral se come 245 px: una, dos o cuatro columnas, nunca tres,
 *    que con cuatro temas deja uno huérfano.
 *  - Lo que viene después va pegado a los temas, como una fila de pastillas: es
 *    la continuación de la rejilla, no un párrafo aparte.
 *
 * Las tarjetas son `TarjetaModulo`, la versión compacta de la tarjeta de
 * catálogo. El único botón primario de la pantalla sigue siendo el de
 * continuar.
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
]

/** Rótulo de grupo: el de las portadas de módulo, en Archivo y con aire. */
const ROTULO =
  "nh-display m-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"

interface TemaEstado {
  card: Omit<TarjetaModuloProps, "cargando" | "chip" | "orientacion">
  /** Avance del tema, 0 a 100. Decide el orden de la lista. */
  pct: number
  to: string
  nombre: string
  /** Una herramienta no se estudia ni se completa: va aparte y no se retoma. */
  herramienta?: boolean
}

/** El CTA de un tema según por dónde vas. */
function ctaDeTema(pct: number): string {
  if (pct >= 100) return "Repasar"
  return pct > 0 ? "Continuar" : "Empezar"
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
  const [metarProgress, setMetarProgress] = useState(() => {
    const local = readMetarProgress()
    return {
      lessonScreens: local.lessonScreens,
      practiceDone: local.practiceDone,
      bestExamScore: local.bestExamScore,
    }
  })
  const [mejorSimulacro, setMejorSimulacro] = useState<number | null>(
    () => readAirlineMockLocal().bestScore
  )
  const [mercanciasProgreso, setMercanciasProgreso] = useState(() => readMercanciasLocal())
  const [mejorPsico, setMejorPsico] = useState<number | null>(
    () => leerPsicoLocal().mejorSimulacro
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
      const [notamRes, metarRes, examRes, metarExamRes, mockRes, mpRes, psicoRes] =
        await Promise.all([
        fetchNotamProgress(user.id),
        fetchMetarProgress(user.id),
        supabase
          .from("user_notam_exam_attempts")
          .select("score")
          .eq("user_id", user.id)
          .order("score", { ascending: false })
          .limit(1),
        supabase
          .from("user_metar_exam_attempts")
          .select("score")
          .eq("user_id", user.id)
          .order("score", { ascending: false })
          .limit(1),
        fetchMejorPuntajeSimulacro(user.id),
        fetchMercanciasProgress(user.id),
        mejorSimulacroRemoto(user.id),
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
        const best = (metarExamRes.data ?? [])[0]?.score
        const local = readMetarProgress()
        const scores = [typeof best === "number" ? best : null, local.bestExamScore].filter(
          (s): s is number => typeof s === "number"
        )
        setMetarProgress({
          lessonScreens: Array.from(new Set([...metarRes.lessonScreens, ...local.lessonScreens])),
          practiceDone: Array.from(new Set([...metarRes.practiceDone, ...local.practiceDone])),
          bestExamScore: scores.length > 0 ? Math.max(...scores) : null,
        })
      }
      setMejorSimulacro(mockRes)
      if (mpRes) setMercanciasProgreso(mpRes)
      // Se queda con el mayor entre la base y el respaldo local: si el mejor
      // intento se hizo sin sesión en este mismo equipo, no se pierde.
      if (psicoRes !== null) {
        setMejorPsico((local) => Math.max(local ?? 0, psicoRes))
      }
      setHidratado(true)
    })()

    return () => {
      cancelled = true
    }
  }, [user, sessionLoading])

  const notam = useMemo(() => resumirNotam(notamProgress), [notamProgress])
  // Las tres partes salen de la misma fuente ya unida (base + respaldo local).
  // Antes la lección venía de la base y la práctica y la evaluación solo de
  // localStorage, así que en otro dispositivo el porcentaje de METAR mentía:
  // la lección aparecía y los 10 informes y la evaluación salían en cero.
  const metar = useMemo(() => resumirMetar(metarProgress), [metarProgress])
  const mercancias = useMemo(() => resumirMercancias(mercanciasProgreso), [mercanciasProgreso])

  // Los estados van en cifras cortas («9/9 secciones») porque la tarjeta de
  // cuatro columnas les da un renglón. Los que decían «13 secciones cortas» o
  // «9 secciones» a mano ya no cuadraban con los módulos: ahora salen de los
  // mismos totales que la lección.
  const temas: TemaEstado[] = useMemo(() => {
    const lista: TemaEstado[] = [
      {
        nombre: "NOTAM",
        to: "/app/aerolinea/notam",
        pct: notam.overall,
        card: {
          to: "/app/aerolinea/notam",
          // Símbolo de aeródromo de carta: un NOTAM avisa de lo que cambia en
          // un aeródromo o su espacio aéreo, así que el símbolo informa. Donde
          // no informaría (el simulacro, el match) se quedan los genéricos: la
          // regla es que el símbolo diga algo, no que decore.
          icon: AerodromeIcon,
          color: "var(--av-blue-500)",
          titulo: "NOTAM",
          meta: `${TOTALS.lessonScreens} secciones · ${LESSON_MINUTES} min`,
          descripcion:
            "Lee la línea Q y decodifica avisos reales de la Aerocivil.",
          foto: notamPhoto,
          cta: ctaDeTema(notam.overall),
          avance: notam.overall,
          completo: notam.overall >= 100,
          estado: notam.empty
            ? `Sin empezar · ${TOTALS.lessonScreens} secciones`
            : notam.overall >= 100
              ? "Tema completo"
              : `${notam.lessonRead}/${TOTALS.lessonScreens} secciones · ${notam.practiceDone}/${NOTAM_PRACTICE_TOTAL} ejercicios`,
        },
      },
      {
        nombre: "Meteorología operacional",
        to: "/app/aerolinea/meteorologia",
        pct: metar.overall,
        card: {
          to: "/app/aerolinea/meteorologia",
          icon: CloudSun,
          color: "var(--av-mt-700)",
          titulo: "Meteorología operacional",
          meta: `${METAR_LESSON_TOTAL} secciones · ${METAR_LESSON_MINUTES} min`,
          // Lo que se aprende, en el orden en que se lee.
          descripcion:
            "Del cielo al informe: nubes, frentes, METAR y TAF.",
          foto: meteorologiaPhoto,
          cta: ctaDeTema(metar.overall),
          avance: metar.overall,
          completo: metar.overall >= 100,
          estado: metar.empty
            ? `Sin empezar · ${METAR_LESSON_TOTAL} secciones`
            : metar.overall >= 100
              ? "Tema completo"
              : `${metar.lessonRead}/${METAR_LESSON_TOTAL} secciones · ${metar.practiceDone}/${METAR_PRACTICE_TOTAL} informes`,
        },
      },
      {
        nombre: "Mercancías peligrosas",
        to: MP_HUB,
        pct: mercancias.overall,
        card: {
          to: MP_HUB,
          icon: AlertTriangle,
          color: "var(--av-dg-700)",
          titulo: "Mercancías peligrosas",
          meta: `${MP_LECTURA_TOTAL} lecciones · ${MP_MINUTOS} min`,
          descripcion: "Clases, NOTOC, baterías de litio y qué hacer en vuelo.",
          // La portada del propio módulo, la misma que ve en su hub. Vive en
          // public y no en assets porque así queda fuera del precache.
          foto: "/infografias/mercancias/portada.webp",
          cta: ctaDeTema(mercancias.overall),
          avance: mercancias.overall,
          completo: mercancias.overall >= 100,
          estado: mercancias.empty
            ? `Sin empezar · ${MP_LECTURA_TOTAL} lecciones`
            : mercancias.overall >= 100
              ? "Tema completo"
              : `${mercancias.lessonRead}/${MP_LECTURA_TOTAL} lecciones · ${mercancias.practiceDone}/${MP_PRACTICA_TOTAL} ejercicios`,
        },
      },
      // Psicotécnicas no se "termina": es un banco para entrenar. Lo que hace
      // de avance es el mejor resultado del simulacro, que es lo único que
      // mide de verdad si ya estás listo para el proceso.
      {
        nombre: "Pruebas psicotécnicas",
        to: PSICO_HUB,
        pct: mejorPsico ?? 0,
        card: {
          to: PSICO_HUB,
          icon: Brain,
          // El violeta del tema, en su escalón de texto: el --av-violet-400 a
          // secas no llega a AA sobre blanco. Es el mismo valor que ya usa
          // .chip-violet; la variable se define en el contenedor de la página.
          color: "var(--psico-acento)",
          titulo: "Pruebas psicotécnicas",
          meta: `${PSICO_BANCO_TOTAL} ejercicios cronometrados`,
          descripcion: "Razonamiento abstracto, espacial y numérico, con reloj.",
          // La portada del propio tema, dibujada para él. Vive en public y no en
          // assets porque así queda fuera del precache, como la de Mercancías.
          foto: "/infografias/psicotecnicas/portada.webp",
          cta: mejorPsico === null ? "Empezar" : "Entrenar",
          avance: mejorPsico ?? 0,
          estado:
            mejorPsico === null
              ? `Sin empezar · simulacro de ${SIMULACRO_TOTAL}`
              : `Mejor simulacro: ${mejorPsico}/100`,
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
          titulo: "Simulacro de entrevista técnica",
          // Del propio banco, no de una suma a mano: cuando entró Mercancías
          // Peligrosas esta cifra se quedó anunciando 40 con 45 cargadas.
          meta: `${BANCO_TOTAL} preguntas · 25 por intento`,
          descripcion: "Preguntas de todos los temas, mezcladas, como en la prueba de verdad.",
          foto: simulacroPhoto,
          cta: mejorSimulacro === null ? "Presentar el simulacro" : "Volver a presentarlo",
          estado:
            mejorSimulacro === null
              ? "Sin presentar · baraja en cada intento"
              : mejorSimulacro >= AIRLINE_MOCK_PASS_SCORE
                ? `Mejor puntaje: ${mejorSimulacro}/100 · aprobado`
                : `Mejor puntaje: ${mejorSimulacro}/100 · apruebas con ${AIRLINE_MOCK_PASS_SCORE}`,
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
          titulo: "Para cuál calificas",
          meta: "Siempre disponible",
          descripcion:
            "Qué pide cada aerolínea de la región y qué te falta a ti para postular.",
          foto: matchPhoto,
          cta: "Ver mi match",
          estado: "Se calcula con tu Logbook y tu perfil",
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
  }, [notam, metar, mercancias, mejorSimulacro, mejorPsico])

  const cursables = temas.filter((t) => !t.herramienta)
  const herramientas = temas.filter((t) => t.herramienta)

  // El único botón primario de la pantalla: retomar donde ibas, o entrar al
  // primero si todavía no empezaste nada. Las herramientas no se retoman.
  const enCurso = cursables.find((t) => t.pct > 0 && t.pct < 100)
  const continuar = enCurso ?? cursables[0]

  // Para la fila de lo que viene: cuántos temas hay abiertos y por cuál vas. Si
  // empezaste uno, vas por el primero, no por el segundo: el número es cuántos
  // has tocado, con mínimo uno (el que estás a punto de empezar).
  const disponibles = cursables.length
  const temaActual = Math.min(Math.max(1, cursables.filter((t) => t.pct > 0).length), disponibles)
  // La cifra grande del panel: el promedio de los temas abiertos, el mismo
  // cálculo con el que cada portada resume sus partes.
  const avanceGeneral = Math.round(
    cursables.reduce((suma, t) => suma + t.pct, 0) / Math.max(1, disponibles)
  )

  return (
    <AppLayout>
      {/* `notam-hub` es lo que da el Archivo de las portadas a `.nh-display`.
          `@container`: las rejillas responden al ancho del contenido, no al de
          la ventana. La variable del violeta vive aquí porque solo esta
          pantalla la necesita. */}
      <div className="notam-hub @container px-5 sm:px-8 py-6 sm:py-8 pb-16 max-w-[1280px] mx-auto [--psico-acento:oklch(0.45_0.2_295)] dark:[--psico-acento:var(--av-violet-400)]">
        {/* El hero de las portadas de módulo, en su versión corta: la foto a
            sangre bajo el velo navy, el titular en Archivo, un solo botón y el
            panel de avance dentro, porque «qué es esto» y «cómo voy» son la
            misma pregunta al llegar. Mide lo justo para que la primera fila de
            tarjetas se vea sin bajar. */}
        <section className="relative overflow-hidden rounded-[18px] shadow-[0_1px_2px_rgba(11,27,48,0.08)]">
          <img
            src={heroPhoto}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 27%" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(8,20,36,.92) 0%, rgba(8,20,36,.80) 42%, rgba(8,20,36,.58) 72%, rgba(8,20,36,.42) 100%)",
            }}
          />

          <div className="relative grid gap-6 px-6 py-6 sm:px-10 sm:py-7 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,272px)] @4xl:gap-10">
            <div className="min-w-0 self-center">
              <div className="flex flex-wrap items-center gap-3">
                <span className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7FB2F2]">
                  Módulo
                </span>
                <span className="hidden h-3 w-px bg-white/20 @md:block" aria-hidden />
                <span className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                  {disponibles} temas abiertos · {PROXIMOS.length} en camino
                </span>
              </div>

              <h1 className="nh-display mt-3 text-[32px] font-bold leading-none tracking-[-0.03em] text-white sm:text-[38px] @5xl:text-[44px]">
                Ingreso a aerolínea
              </h1>

              <p className="mt-3 mb-0 max-w-[52ch] text-[15px] leading-[1.55] text-white/80">
                Lo que evalúan las aerolíneas de la región, tema por tema.
              </p>

              <div className="mt-5">
                {loading ? (
                  <span
                    className="block h-11 w-48 rounded-[10px] bg-white/15 animate-pulse"
                    aria-hidden="true"
                  />
                ) : (
                  <Link
                    to={continuar.to}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-[10px] px-5 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(10,26,47,0.35)] transition-transform active:scale-[0.98]"
                    style={{ background: "var(--av-blue-500)" }}
                  >
                    <Plane className="h-4 w-4" />
                    {enCurso ? `Seguir con ${enCurso.nombre}` : `Empezar por ${continuar.nombre}`}
                  </Link>
                )}
              </div>
            </div>

            {/* El mismo panel de cristal de las portadas, sin las filas por
                parte: aquí cada tema ya trae su barra en la tarjeta de abajo, y
                repetirlas duplicaba el hero sin decir nada nuevo. Queda la cifra
                global y por dónde vas en la ruta. */}
            <div className="self-start overflow-hidden rounded-[14px] border border-white/15 bg-[rgba(6,17,31,0.62)] backdrop-blur-[6px] @4xl:self-center">
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
                        {avanceGeneral}%
                      </span>
                      <span className="text-[11px] text-white/60">de los temas abiertos</span>
                    </div>
                    <div
                      className="mt-3 h-1 overflow-hidden rounded-sm bg-white/15"
                      role="progressbar"
                      aria-valuenow={avanceGeneral}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Avance de Ingreso a aerolínea"
                    >
                      <div
                        className="h-full rounded-sm transition-[width]"
                        style={{ width: `${avanceGeneral}%`, background: "var(--av-green-400)" }}
                      />
                    </div>
                  </>
                )}
                {!sessionLoading && !user && (
                  <p className="mt-2 mb-0 text-[10.5px] leading-[1.5] text-white/55">
                    Inicia sesión para guardar tu avance en la cuenta.
                  </p>
                )}
              </div>

              {PROXIMOS.length > 0 && (
                <div className="border-t border-white/10 px-3.5 py-2.5 text-[11.5px] leading-[1.5] text-white/65">
                  <span className="font-semibold text-white/90">
                    Tema {temaActual} de {disponibles + PROXIMOS.length}
                  </span>{" "}
                  · el próximo que abrimos es {PROXIMOS[0]}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mt-8" aria-labelledby="aerolinea-temas">
          <h2 id="aerolinea-temas" className={ROTULO}>
            Temas de estudio
          </h2>

          {/* Una, dos o cuatro columnas. Nunca tres: con cuatro temas deja uno
              solo en la segunda fila. */}
          <div className="mt-3 grid grid-cols-1 gap-4 @xl:grid-cols-2 @4xl:grid-cols-4">
            {cursables.map((t) => (
              <TarjetaModulo
                key={t.to}
                {...t.card}
                chip={enCurso && t.to === enCurso.to ? "En curso" : undefined}
                cargando={loading}
              />
            ))}
          </div>

          {/* Los que siguen, contados como ruta y no como huecos: una fila de
              pastillas pegada a la rejilla, que es de lo que es continuación.
              Las pastillas no son botones: no se abren hasta estar completos. */}
          {PROXIMOS.length > 0 && (
            <div className="mt-5 flex flex-col gap-2.5 @3xl:flex-row @3xl:items-center @3xl:gap-4">
              <p className="m-0 shrink-0 text-[12.5px] text-muted-foreground">
                <span className="font-semibold text-foreground">En camino.</span> Se abren en este
                orden, cada uno cuando está completo:
              </p>
              <ol className="m-0 flex list-none flex-wrap gap-2 p-0">
                {PROXIMOS.map((p, i) => (
                  <li
                    key={p}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-1 text-[12.5px] text-muted-foreground"
                  >
                    <span className="tabular text-[11px] font-semibold text-foreground/70">
                      {disponibles + i + 1}
                    </span>
                    {p}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </section>

        <section className="mt-10" aria-labelledby="aerolinea-herramientas">
          <h2 id="aerolinea-herramientas" className={ROTULO}>
            Herramientas
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-4 @3xl:grid-cols-2">
            {herramientas.map((t) => (
              <TarjetaModulo key={t.to} {...t.card} orientacion="horizontal" cargando={loading} />
            ))}
          </div>
        </section>

        {/* Lo que sí puedes adelantar hoy: en una franja, no en un bloque. */}
        <section className="mt-10 flex flex-col gap-3 rounded-xl surface px-5 py-4 @3xl:flex-row @3xl:items-center @3xl:justify-between @3xl:gap-6">
          <div className="min-w-0">
            <h2 className="m-0 text-[15px] font-semibold">Mientras tanto</h2>
            <p className="mt-0.5 mb-0 max-w-[64ch] text-[13px] leading-relaxed text-muted-foreground">
              Tu Logbook y tus vencimientos alimentan el Pilot ID con el que vas a postular, y
              afinan tu match por aerolínea.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
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
