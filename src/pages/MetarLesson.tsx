import { useCallback, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, ArrowRight, BookOpen, Check, Clock, Library, ListOrdered, ScanSearch } from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { DocBlock } from "@/components/DocLessonBlocks"
import { docAccent, docTint } from "@/lib/docSheet"
import { appButtonClass } from "@/lib/buttonStyles"
import { registrarEstudioDiario } from "@/lib/activity"
import { useSession } from "@/hooks/useSession"
import { LEVEL_META, accentText } from "@/lib/notam"
import { readMetarProgress, writeMetarProgress } from "@/lib/metar"
import {
  fetchMetarProgress,
  markMetarProgress,
  pushPendingMetarProgress,
} from "@/lib/metarProgress"
import { METAR_LESSON, METAR_LESSON_TOTAL, METAR_SOURCES } from "@/lib/metarLesson"

const TOTAL = METAR_LESSON_TOTAL
const TOTAL_MINUTES = METAR_LESSON.reduce((acc, s) => acc + s.minutes, 0)

/**
 * Lección METAR en formato documento: la misma hoja continua de la lección
 * NOTAM (índice lateral, sección activa por scroll, progreso al pasar).
 * Ruta: /app/aerolinea/meteorologia/aprende
 *
 * El progreso sigue el mismo esquema que NOTAM: el respaldo local manda y la
 * base es la verdad entre dispositivos. Antes vivía solo en este navegador
 * porque la tabla no existía; ya existe, y sin esto la lista de temas de
 * Ingreso a aerolínea no tendría avance real de METAR que mostrar.
 */
export function MetarLesson() {
  const { user, isLoading: sessionLoading } = useSession()
  const [activeN, setActiveN] = useState(1)
  const [readSections, setReadSections] = useState<number[]>(() => readMetarProgress().lessonScreens)
  const [progress, setProgress] = useState(0)
  const sheetRef = useRef<HTMLElement | null>(null)
  const mobileTocRef = useRef<HTMLDetailsElement | null>(null)

  // El respaldo local manda y la base es un extra: si la RPC falla no se
  // muestra nada, el progreso ya quedó guardado localmente.
  const markRead = useCallback((n: number) => {
    setReadSections((prev) => (prev.includes(n) ? prev : [...prev, n].sort((a, b) => a - b)))
    if (readMetarProgress().lessonScreens.includes(n)) return
    void markMetarProgress({ lessonScreen: n })
    void registrarEstudioDiario("metar-leccion", {
      minutes: METAR_LESSON.find((s) => s.n === n)?.minutes ?? 0,
    })
  }, [])

  // Hidrata lo leído desde la base y sube lo que se leyó sin sesión. Sin esto,
  // abrir la lección en otro dispositivo la mostraba entera sin leer.
  useEffect(() => {
    if (sessionLoading) return
    const uid = user?.id
    if (!uid) return
    let cancelled = false

    void (async () => {
      const fetched = await fetchMetarProgress(uid)
      if (cancelled || !fetched) return
      const remote = await pushPendingMetarProgress(fetched)
      if (cancelled) return
      const merged = Array.from(
        new Set([...readMetarProgress().lessonScreens, ...remote.lessonScreens]),
      ).sort((a, b) => a - b)
      // El local se iguala al servidor para que markRead no vuelva a mandar a la
      // RPC secciones que ya están guardadas.
      writeMetarProgress({ lessonScreens: merged })
      setReadSections((prev) =>
        prev.length === merged.length && merged.every((n) => prev.includes(n)) ? prev : merged,
      )
    })()

    return () => {
      cancelled = true
    }
  }, [user?.id, sessionLoading])

  // Sección activa + marcado de leídas, con la franja superior como banda de
  // observación: cuando una sección entra ahí, el lector ya llegó a ella.
  useEffect(() => {
    const visible = new Set<number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const n = Number((entry.target as HTMLElement).dataset.section)
          if (!Number.isFinite(n)) continue
          if (entry.isIntersecting) {
            visible.add(n)
            markRead(n)
          } else {
            visible.delete(n)
          }
        }
        if (visible.size === 0) return
        setActiveN(Math.min(...visible))
      },
      { rootMargin: "-84px 0px -58% 0px", threshold: 0 },
    )
    for (const s of METAR_LESSON) {
      const el = document.getElementById(`m-${s.n}`)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [markRead])

  // Porcentaje leído, medido sobre la hoja y no sobre la página.
  useEffect(() => {
    const measure = () => {
      const el = sheetRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const recorrido = rect.height - window.innerHeight * 0.75
      if (recorrido <= 0) {
        setProgress(100)
        return
      }
      const avance = (window.innerHeight * 0.25 - rect.top) / recorrido
      setProgress(Math.round(Math.min(1, Math.max(0, avance)) * 100))
    }
    const raf = window.requestAnimationFrame(measure)
    window.addEventListener("scroll", measure, { passive: true })
    window.addEventListener("resize", measure)
    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener("scroll", measure)
      window.removeEventListener("resize", measure)
    }
  }, [])

  const goToSection = useCallback((anchor: string) => {
    const el = document.getElementById(anchor)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    const details = mobileTocRef.current
    if (details) details.open = false
  }, [])

  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-12 max-w-[1180px] mx-auto">
        <PageHeader
          eyebrow={
            <>
              <BookOpen className="h-3.5 w-3.5" /> Meteorología · METAR
            </>
          }
          title="Qué es un METAR y cómo leerlo"
          subtitle={`Documento de estudio en ${TOTAL} secciones, para leer de corrido como un PDF.`}
          actions={
            <Link
              to="/app/aerolinea/meteorologia"
              className={appButtonClass({ variant: "secondary" })}
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Volver a Meteorología
            </Link>
          }
        >
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] font-semibold text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> {TOTAL_MINUTES} min de lectura
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ListOrdered className="h-3 w-3" /> {TOTAL} secciones
            </span>
            <span className="tabular">
              {readSections.length} de {TOTAL} leídas
            </span>
          </div>
        </PageHeader>

        <div className="lg:grid lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-8 lg:items-start">
          {/* Índice lateral */}
          <aside
            className="hidden lg:block lg:sticky lg:top-20 max-h-[calc(100vh-6.5rem)] overflow-y-auto rounded-2xl surface p-3"
            aria-label="Índice de la lección"
          >
            <div className="px-2.5 pt-1 pb-2 text-[12px] font-semibold text-muted-foreground">
              Contenido
            </div>
            <TocList activeN={activeN} readSections={readSections} onSelect={goToSection} />
          </aside>

          <div className="min-w-0">
            {/* Índice desplegable en móvil */}
            <details
              ref={mobileTocRef}
              className="lg:hidden mb-4 rounded-2xl surface overflow-hidden"
            >
              <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden px-4 py-3 flex items-center justify-between gap-3 text-[15px] font-semibold text-foreground">
                <span className="inline-flex items-center gap-2">
                  <ListOrdered className="h-4 w-4" /> Contenido de la lección
                </span>
                <span className="text-[13px] font-semibold text-muted-foreground tabular">
                  {activeN} / {TOTAL}
                </span>
              </summary>
              <div className="px-2 pb-3">
                <TocList activeN={activeN} readSections={readSections} onSelect={goToSection} />
              </div>
            </details>

            {/* Barra de lectura */}
            <div className="sticky top-16 z-20 pt-2 pb-2.5 bg-background/90 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div
                  className="h-1 flex-1 rounded-full overflow-hidden"
                  style={{ background: "color-mix(in oklab, var(--muted-foreground) 20%, transparent)" }}
                  role="progressbar"
                  aria-label="Progreso de lectura del documento"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full transition-[width] duration-150"
                    style={{ width: `${progress}%`, background: "var(--av-blue-500)" }}
                  />
                </div>
                <span className="shrink-0 text-[12px] font-semibold text-muted-foreground tabular">
                  Sección {activeN} de {TOTAL}
                </span>
              </div>
            </div>

            {/* La hoja */}
            <article ref={sheetRef} className="doc-sheet rounded-2xl px-5 sm:px-10 py-8 sm:py-11">
              <header className="pb-7 border-b doc-rule">
                <div className="text-[12px] font-semibold doc-muted">
                  Documento de estudio · METAR
                </div>
                <p className="mt-3 mb-0 text-[15px] leading-[1.75] max-w-[64ch]">
                  Basado en la bibliografía del curso: el briefing para pilotos de un meteorólogo
                  Clase III de la OMM y la leyenda de lectura de METAR y TAF. Lo que la bibliografía
                  no cubre va marcado en el texto para validarlo con tu instructor.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-semibold doc-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {TOTAL_MINUTES} minutos
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ListOrdered className="h-3.5 w-3.5" /> {TOTAL} secciones
                  </span>
                </div>
              </header>

              {METAR_LESSON.map((screen) => {
                const level = LEVEL_META[screen.level]
                return (
                  <section
                    key={screen.n}
                    id={`m-${screen.n}`}
                    data-section={screen.n}
                    className="scroll-mt-24 py-8 sm:py-9 border-t doc-rule first-of-type:border-t-0"
                  >
                    <header className="flex items-start gap-3 sm:gap-5">
                      <span
                        className="mono shrink-0 text-[32px] font-semibold leading-none tabular"
                        style={{ color: "color-mix(in oklab, var(--doc-fg) 17%, var(--doc-bg))" }}
                        aria-hidden
                      >
                        {String(screen.n).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h2 className="m-0 text-[20px] sm:text-[24px] font-semibold tracking-[-0.02em] leading-[1.2]">
                          {screen.title}
                        </h2>
                        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] doc-muted">
                          <span>{screen.kicker}</span>
                          <span
                            className="inline-flex items-center gap-1 font-semibold"
                            style={{ color: docAccent(level.color, 55) }}
                          >
                            {level.label}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {screen.minutes} min
                          </span>
                        </div>
                      </div>
                    </header>

                    <div className="doc-prose mt-5 flex flex-col gap-4">
                      {screen.blocks.map((block, i) => (
                        <DocBlock key={`${screen.n}-${i}`} block={block} />
                      ))}
                    </div>
                  </section>
                )
              })}

              {/* Fuentes */}
              <section className="pt-8 border-t doc-rule">
                <div
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold"
                  style={{ color: docAccent("var(--av-blue-500)", 55) }}
                >
                  <Library className="h-3.5 w-3.5" /> Fuentes
                </div>
                <ol className="mt-3 mb-0 pl-5 list-decimal flex flex-col gap-1.5">
                  {METAR_SOURCES.map((s, i) => (
                    <li key={i} className="text-[13px] leading-[1.65] doc-muted">
                      {s}
                    </li>
                  ))}
                </ol>
              </section>

              {/* Cierre hacia el decodificador */}
              <section id="cierre-metar" className="scroll-mt-24 mt-8 pt-7 border-t doc-rule">
                <h2 className="m-0 text-[17px] sm:text-[20px] font-semibold tracking-[-0.02em]">
                  Ya sabes leer un METAR de principio a fin
                </h2>
                <p className="mt-1.5 mb-0 text-[13px] doc-muted leading-[1.7]">
                  Lo que sigue es velocidad: pega informes en el decodificador y compáralos con tu
                  lectura mental. Llevas {readSections.length} de {TOTAL} secciones leídas.
                </p>
                <Link
                  to="/app/aerolinea/meteorologia/decodificador"
                  className="doc-soft group mt-4 rounded-xl border doc-rule p-4 flex items-start gap-3 transition-transform hover:-translate-y-0.5"
                >
                  <span
                    className="shrink-0 h-10 w-10 rounded-xl flex items-center justify-center"
                    style={{ color: docAccent("var(--av-blue-500)", 70), background: docTint("var(--av-blue-500)", 14) }}
                  >
                    <ScanSearch className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-semibold tracking-[-0.01em]">
                      Abrir el Decodificador METAR
                    </span>
                    <span className="block mt-0.5 text-[13px] leading-[1.6] doc-muted">
                      Pega cualquier informe y te lo desarma grupo por grupo, con la leyenda completa
                      del curso al lado.
                    </span>
                  </span>
                  <ArrowRight className="hidden sm:block shrink-0 mt-1 h-4 w-4 doc-muted group-hover:translate-x-0.5 transition-transform" aria-hidden />
                </Link>
              </section>
            </article>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

function TocList({
  activeN,
  readSections,
  onSelect,
}: {
  activeN: number
  readSections: number[]
  onSelect: (anchor: string) => void
}) {
  return (
    <nav>
      <ol className="m-0 p-0 list-none flex flex-col gap-0.5">
        {METAR_LESSON.map((s) => {
          const isActive = s.n === activeN
          const isRead = readSections.includes(s.n)
          return (
            <li key={s.n}>
              <a
                href={`#m-${s.n}`}
                onClick={(e) => {
                  e.preventDefault()
                  onSelect(`m-${s.n}`)
                }}
                aria-current={isActive ? "location" : undefined}
                className={`flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-[13px] leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isActive ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
                style={
                  isActive
                    ? { background: "color-mix(in oklab, var(--av-blue-500) 11%, transparent)" }
                    : undefined
                }
              >
                <span
                  className="shrink-0 w-4 mt-px text-[12px] font-semibold tabular"
                  style={isActive ? { color: "var(--av-blue-500)" } : undefined}
                >
                  {s.n}
                </span>
                <span className="min-w-0 flex-1">{s.title}</span>
                {isRead && (
                  <Check
                    className="shrink-0 mt-px h-3.5 w-3.5"
                    strokeWidth={3}
                    style={{ color: accentText("var(--av-green-400)") }}
                    aria-label="Leída"
                  />
                )}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
