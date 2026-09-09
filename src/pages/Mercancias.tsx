import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, BookMarked, BookOpen, GraduationCap, Target } from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { CourseCard } from "@/components/ui/course-card"
import type { CourseCardProps } from "@/components/ui/course-card"
import { appButtonClass } from "@/lib/buttonStyles"
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
  MP_VIGENCIA,
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

/** La portada del módulo (la lámina de las nueve clases). Vive en public para no entrar al precache. */
const HERO = "/infografias/mercancias/portada.webp"

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
        // Sube lo que se avanzó sin sesión antes de armar el resumen.
        const remoto = await pushPendingMercancias(traido)
        if (!cancelado) setProgreso({ ...remoto, bestScore: traido.bestScore })
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
      icon: BookOpen,
      color: "var(--av-dg-700)",
      meta: `${MP_LECTURA_TOTAL} lecciones en ${MP_NIVELES.length} niveles · ${MP_MINUTOS} min`,
      title: "1. Aprende",
      blurb:
        "De la definición al NOTOC: las nueve clases, quién responde por qué, lo que puede volar y lo que no, y qué hacer si algo pasa en vuelo. Con el artículo del RAC 175 en cada afirmación.",
      cta: resumen.lessonRead === 0 ? "Abrir la lección" : "Seguir donde ibas",
      photoHueco: "MP-POR-01 · Portada 3:2 · 1200×800 · Un bulto etiquetado en rampa",
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
      icon: Target,
      color: "var(--av-dg-700)",
      meta: `${MP_PRACTICA_TOTAL} ejercicios: etiquetas, clasificación, escenarios y entrevista`,
      title: "2. Práctica",
      blurb:
        "Reconoces etiquetas, clasificas envíos, resuelves escenarios operacionales y ensayas las preguntas de una entrevista técnica.",
      cta: "Empezar a practicar",
      photoHueco: "MP-POR-02 · Portada 3:2 · 1200×800 · Un ULD con etiquetas de riesgo",
      status:
        resumen.practiceDone === 0
          ? "Sin empezar"
          : `${resumen.practiceDone} de ${MP_PRACTICA_TOTAL} resueltos`,
      progress: resumen.practicePct,
      done: resumen.practiceDone >= MP_PRACTICA_TOTAL,
    },
    {
      to: MP_EVALUACION,
      icon: GraduationCap,
      color: "var(--av-dg-700)",
      meta: `${MP_EXAM_PER_ATTEMPT} preguntas aleatorias, apruebas con ${MP_PASS_SCORE}`,
      title: "3. Evaluación",
      blurb:
        "Opción múltiple con preguntas y opciones barajadas. Se abre al terminar la lección; al final ves la explicación y el artículo de cada una.",
      cta: "Presentar la evaluación",
      photoHueco: "MP-POR-03 · Portada 3:2 · 1200×800 · Cabina con el NOTOC en la mano",
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
        <section className="relative overflow-hidden rounded-[18px] shadow-[0_1px_2px_rgba(11,27,48,0.08)]">
          <img src={HERO} alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(8,20,36,.92) 0%, rgba(8,20,36,.80) 40%, rgba(8,20,36,.55) 70%, rgba(8,20,36,.35) 100%)",
            }}
            aria-hidden
          />

          <div className="relative grid gap-8 px-7 pb-10 pt-9 sm:px-12 sm:pb-12 sm:pt-11 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-10">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em]"
                  style={{ color: "var(--av-dg-500)" }}
                >
                  Ingreso a aerolínea
                </span>
                <span className="h-3 w-px bg-white/20" aria-hidden />
                <span className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                  {MP_VIGENCIA}
                </span>
              </div>

              <h1 className="nh-display mt-4 text-[38px] font-bold leading-none tracking-[-0.03em] text-white sm:text-[48px] lg:text-[58px]">
                {MP_TITULO}
              </h1>

              <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-white/80">
                Las nueve clases, quién responde por qué, lo que puede volar y lo que no, el
                documento que firmas antes de cada salida y qué hacer si algo pasa en vuelo. Es lo
                que te preguntan en una entrevista técnica, y cada respuesta trae su artículo.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  to={MP_APRENDE}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-[10px] px-6 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(10,26,47,0.35)] transition-[filter] hover:brightness-110"
                  style={{ background: "var(--av-dg-700)" }}
                >
                  <BookOpen className="h-4 w-4" />{" "}
                  {resumen.lessonRead === 0 ? "Empezar la lección" : "Seguir la lección"}
                </Link>
                <Link
                  to="/app/biblioteca#mercancias-peligrosas"
                  className="inline-flex min-h-[48px] items-center gap-2 whitespace-nowrap rounded-[10px] border border-white/25 px-5 text-[15px] font-medium text-white/90 transition-colors hover:border-white/60 hover:text-white"
                >
                  <BookMarked className="h-4 w-4" /> Ver la bibliografía
                </Link>
              </div>
            </div>

            {/* Panel de avance en cristal sobre la foto */}
            <div className="self-start rounded-[14px] border border-white/15 bg-[rgba(6,17,31,0.62)] px-5 py-[18px] backdrop-blur-[6px] lg:min-w-[230px]">
              <div className="nh-display text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
                Tu avance
              </div>
              {loading ? (
                <>
                  <div className="mt-3 h-9 w-24 animate-pulse rounded bg-white/15" />
                  <div className="mt-4 h-1 animate-pulse rounded-sm bg-white/15" />
                </>
              ) : (
                <>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="nh-display tabular text-[40px] font-bold leading-none text-white">
                      {resumen.overall}%
                    </span>
                    <span className="text-[13px] text-white/60">del módulo</span>
                  </div>
                  <div
                    className="mt-4 h-1 overflow-hidden rounded-sm bg-white/15"
                    role="progressbar"
                    aria-valuenow={resumen.overall}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Avance del módulo Mercancías peligrosas"
                  >
                    <div
                      className="h-full rounded-sm transition-all"
                      style={{ width: `${resumen.overall}%`, background: "var(--av-dg-500)" }}
                    />
                  </div>
                </>
              )}
              <p className="mt-3 text-[12px] leading-[1.5] text-white/55">
                {user
                  ? "Se guarda en tu cuenta a medida que avanzas."
                  : "Inicia sesión para guardar tu avance en la cuenta."}
              </p>
            </div>
          </div>
        </section>

        {/* Franja de avance: una sola caja con tres celdas */}
        <div className="mt-6 grid gap-px overflow-hidden rounded-[14px] border border-border bg-border [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          <Celda
            titulo="Lección"
            valor={`${resumen.lessonRead} / ${MP_LECTURA_TOTAL}`}
            pie="lecciones leídas"
            pct={resumen.lessonPct}
            color="var(--av-dg-600)"
            cargando={loading}
          />
          <Celda
            titulo="Práctica"
            valor={`${resumen.practiceDone} / ${MP_PRACTICA_TOTAL}`}
            pie="ejercicios resueltos"
            pct={resumen.practicePct}
            color="var(--av-dg-600)"
            cargando={loading}
          />
          <Celda
            titulo="Evaluación"
            valor={resumen.best === null ? "Sin intentos" : `${resumen.best} / 100`}
            aviso={resumen.best === null}
            pie={
              resumen.best === null
                ? `apruebas con ${MP_PASS_SCORE}`
                : resumen.passed
                  ? "aprobada"
                  : `te faltan ${MP_PASS_SCORE - resumen.best} puntos`
            }
            pct={resumen.examPct}
            color={resumen.passed ? "var(--av-green-400)" : "var(--av-amber-400)"}
            cargando={loading}
          />
        </div>

        {/* Las tres partes */}
        <section className="pt-14">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {partes.map((p) => (
              <CourseCard key={p.title} {...p} statusLoading={loading} />
            ))}
          </div>
        </section>

        {/* La nota de vigencia, a la vista y corta. El material se estudia; los
            límites en línea de vuelo se confirman en la edición en vigor. */}
        <section className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl surface px-6 py-5">
          <p className="m-0 max-w-[640px] text-[13px] leading-relaxed text-muted-foreground">
            El material sale del RAC 175 en su edición original, del LAR 175, del Anexo 18 y del
            Doc 9284 de la OACI. Todos se enmiendan: sirve para estudiar, no para aplicar límites
            en línea de vuelo. Antes de usar una cifra, confirma la edición en vigor y el manual
            de tu explotador.
          </p>
          <Link
            to="/app/biblioteca#mercancias-peligrosas"
            className={appButtonClass({ variant: "secondary" }, "shrink-0")}
          >
            <BookMarked className="h-4 w-4" /> Bibliografía del tema
          </Link>
        </section>
      </div>
    </AppLayout>
  )
}

// ─── Sub componentes ─────────────────────────────────────────────────────────

/** Una celda de la franja de avance: bloque, cifra, barra y pie. Igual que en NOTAM. */
function Celda({
  titulo,
  valor,
  pie,
  pct,
  color,
  aviso,
  cargando,
}: {
  titulo: string
  valor: string
  pie: string
  pct: number
  color: string
  aviso?: boolean
  cargando?: boolean
}) {
  return (
    <div className="bg-card px-6 py-[22px]">
      <div className="flex items-center justify-between gap-3">
        <span className="nh-display text-[16px] font-semibold">{titulo}</span>
        {cargando ? (
          <span className="h-4 w-14 animate-pulse rounded bg-muted" />
        ) : aviso ? (
          <span className="chip chip-amber shrink-0 whitespace-nowrap">{valor}</span>
        ) : (
          <span className="tabular text-[14px]" style={{ color }}>
            {valor}
          </span>
        )}
      </div>
      <div
        className="mt-3 h-[5px] overflow-hidden rounded-[3px] bg-muted"
        role="progressbar"
        aria-valuenow={cargando ? undefined : pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Avance de ${titulo}`}
      >
        <div className="h-full rounded-[3px] transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
      <div className="mt-2.5 text-[11px] tracking-[0.04em] text-muted-foreground">{pie}</div>
    </div>
  )
}
