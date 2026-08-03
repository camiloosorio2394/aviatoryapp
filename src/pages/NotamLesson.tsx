import { useCallback, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ClipboardCheck,
  Library,
  ListOrdered,
  Target,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { Rotulo, Filete } from "@/components/ui/rotulo"
import { DocBlock } from "@/components/DocLessonBlocks"
import { docAccent, docTint } from "@/lib/docSheet"
import { registrarEstudioDiario } from "@/lib/activity"
import { useSession } from "@/hooks/useSession"
import {
  DISCLAIMERS,
  LEVEL_META,
  accentText,
  readLocalProgress,
  writeLocalProgress,
} from "@/lib/notam"
import {
  fetchNotamProgress,
  markNotamProgress,
  pushPendingLocalProgress,
} from "@/lib/notamProgress"
import {
  LESSON_MINUTES,
  LESSON_SCREENS,
  LESSON_SOURCES,
  LESSON_TOTAL,
} from "@/lib/notamLesson"

const TOTAL = LESSON_TOTAL
// El mismo número que anuncia la tarjeta del hub: una sola fuente.
const TOTAL_MINUTES = LESSON_MINUTES

/**
 * Lección NOTAM en formato documento: una sola hoja clara, lectura continua,
 * índice lateral y progreso por scroll.
 * Ruta: /app/aerolinea/notam/aprende
 */
export function NotamLesson() {
  const { user, isLoading: sessionLoading } = useSession()
  const [activeN, setActiveN] = useState(1)
  const [readSections, setReadSections] = useState<number[]>(() => readLocalProgress().lessonScreens)
  const [progress, setProgress] = useState(0)
  const sheetRef = useRef<HTMLElement | null>(null)
  const mobileTocRef = useRef<HTMLDetailsElement | null>(null)

  // Marca una sección como leída: el respaldo local manda, la base de datos es
  // un extra. Si la RPC falla no se muestra nada: el progreso ya quedó local.
  const markRead = useCallback((n: number) => {
    setReadSections((prev) => (prev.includes(n) ? prev : [...prev, n].sort((a, b) => a - b)))
    if (readLocalProgress().lessonScreens.includes(n)) return
    void markNotamProgress({ lessonScreen: n })
    // Leer también es estudiar. Sin esto, el piloto pasaba 47 minutos en este
    // documento y el Dashboard le decía que no había estudiado.
    void registrarEstudioDiario("notam-leccion", {
      minutes: LESSON_SCREENS.find((s) => s.n === n)?.minutes ?? 0,
    })
  }, [])

  // Hidrata lo leído desde la base de datos.
  //
  // El respaldo local solo cubre este navegador: sin esta consulta, abrir la
  // lección en otro dispositivo o con el almacenamiento limpio la mostraba
  // entera sin leer aunque el progreso estuviera guardado. De paso sube lo que
  // se leyó sin sesión, que antes se unía solo para mostrarlo y se perdía al
  // cambiar de equipo.
  useEffect(() => {
    if (sessionLoading) return
    const uid = user?.id
    if (!uid) return
    let cancelled = false

    void (async () => {
      const fetched = await fetchNotamProgress(uid)
      if (cancelled || !fetched) return
      const remote = await pushPendingLocalProgress(fetched)
      if (cancelled) return
      const merged = Array.from(
        new Set([...readLocalProgress().lessonScreens, ...remote.lessonScreens]),
      ).sort((a, b) => a - b)
      // El local se iguala al servidor para que markRead no vuelva a mandar a la
      // RPC secciones que ya están guardadas.
      writeLocalProgress({ lessonScreens: merged })
      setReadSections((prev) =>
        prev.length === merged.length && merged.every((n) => prev.includes(n)) ? prev : merged,
      )
    })()

    return () => {
      cancelled = true
    }
  }, [user?.id, sessionLoading])

  // Sección activa + marcado de leídas. La banda de observación es la franja
  // superior de la pantalla, justo debajo del topbar: cuando una sección entra
  // ahí, el usuario ya llegó a ella.
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

    for (const s of LESSON_SCREENS) {
      const el = document.getElementById(`s-${s.n}`)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [markRead])

  // Porcentaje leído del documento, medido sobre la hoja y no sobre la página.
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

    // La primera medición va en un frame aparte para no llamar a setState
    // dentro del cuerpo del efecto.
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
      <div className="px-4 sm:px-7 py-9 sm:py-11 pb-20 max-w-[1280px] mx-auto">
        <PageHeader
          eyebrow={
            <>
              <BookOpen className="h-3.5 w-3.5" /> NOTAM · Lección
            </>
          }
          title="Qué es un NOTAM y cómo leerlo"
          subtitle={`${TOTAL} secciones cortas: el código, las casillas y práctica con avisos reales de la Aerocivil.`}
          actions={
            <Link
              to="/app/aerolinea/notam"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-[13px] font-semibold surface text-foreground transition-transform hover:-translate-y-0.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Volver a NOTAM
            </Link>
          }
        />

        {/* Ficha técnica de la lección: los datos en una tira, no en la prosa.
            Es la misma pieza de la portada; la referencia del documento fuente
            y el corte del material van aquí y en el riel, no en un párrafo. */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 py-2.5 border-y border-border mono text-[12px] text-muted-foreground -mt-4 mb-8">
          <span>{TOTAL} secciones</span>
          <Filete />
          <span>{TOTAL_MINUTES} min</span>
          <Filete />
          <span>OACI Doc 8400, 6ª ed.</span>
          <Filete />
          <span>Corte Aerocivil: 29 JUL 2026</span>
          <span className="ml-auto tabular" style={{ color: "var(--av-blue-500)" }}>
            {readSections.length} de {TOTAL} leídas
          </span>
        </div>

        {/* Contenido a la izquierda, riel a la derecha: la estructura de la
            maqueta aprobada. El índice dejó de ser una tarjeta flotante a la
            izquierda del papel: ahora es parte del instrumento, con el avance
            segmentado y la fuente como lista de definición. */}
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10 lg:items-start">
          <div className="min-w-0">
            {/* Índice desplegable en móvil */}
            <details
              ref={mobileTocRef}
              className="lg:hidden mb-4 rounded-2xl surface overflow-hidden"
            >
              <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden px-4 py-3 flex items-center justify-between gap-3 text-[13px] font-semibold text-foreground">
                <span className="inline-flex items-center gap-2">
                  <ListOrdered className="h-4 w-4" /> Contenido de la lección
                </span>
                <span className="text-[12px] font-semibold text-muted-foreground tabular">
                  {activeN} / {TOTAL}
                </span>
              </summary>
              <div className="px-2 pb-3">
                <TocList activeN={activeN} readSections={readSections} onSelect={goToSection} />
              </div>
            </details>

            {/* Barra de lectura: fina, fija y por encima de la hoja */}
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

            {/* La hoja: papel claro y continuo. Perdió su portadilla: lo que
                decía (fuente, edición, corte, minutos) ya vive en la tira de
                metadatos y en el riel. Abrir la lección es caer en la sección
                1, no en una carátula. */}
            <article
              ref={sheetRef}
              className="doc-sheet rounded-2xl px-5 sm:px-10 py-2 sm:py-3"
            >
              {LESSON_SCREENS.map((screen) => {
                const level = LEVEL_META[screen.level]
                return (
                  <section
                    key={screen.n}
                    id={`s-${screen.n}`}
                    data-section={screen.n}
                    className="scroll-mt-24 py-8 sm:py-9 border-t doc-rule first-of-type:border-t-0"
                  >
                    {/* El rótulo de sección de la maqueta: número y resumen en
                        mono arriba, el título manda por tamaño. El número
                        gigante fantasma se va: decoraba, no informaba. */}
                    <header>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mono text-[11px] font-medium uppercase tracking-[0.14em] doc-muted">
                        <span>
                          <span style={{ color: "var(--doc-accent)" }}>
                            {String(screen.n).padStart(2, "0")}
                          </span>{" "}
                          · {screen.kicker}
                        </span>
                        <span style={{ color: docAccent(level.color, 55) }}>
                          {level.label} · {screen.minutes} min
                        </span>
                      </div>
                      <h2 className="mt-2 mb-0 text-[20px] sm:text-[24px] font-semibold tracking-[-0.02em] leading-[1.2]">
                        {screen.title}
                      </h2>
                    </header>

                    <div className="doc-prose mt-5 flex flex-col gap-4">
                      {screen.blocks.map((block, i) => (
                        <DocBlock key={`${screen.n}-${i}`} block={block} />
                      ))}
                    </div>
                  </section>
                )
              })}

              <SourcesBlock />
              <NextSteps readCount={readSections.length} id="cierre" />
            </article>
          </div>

          {/* El riel: avance segmentado, secciones y la fuente como lista de
              definición. Es la columna de 300px de la maqueta aprobada, con
              nuestros tokens. En celular no existe: el índice va en el
              desplegable de arriba y la fuente cierra la hoja. */}
          <aside
            className="hidden lg:block lg:sticky lg:top-20 max-h-[calc(100vh-6.5rem)] overflow-y-auto pb-4"
            aria-label="Avance e índice de la lección"
          >
            <section aria-label="Tu avance">
              <Rotulo>Tu avance</Rotulo>
              <div className="mt-2.5 flex items-baseline gap-2">
                <span className="tabular text-[24px] font-semibold tracking-[-0.02em] leading-none">
                  {readSections.length}
                </span>
                <span className="mono text-[12px] text-muted-foreground">/ {TOTAL} secciones</span>
              </div>
              {/* Un segmento por sección, en su orden. Pinta exactamente las
                  leídas, aunque no sean consecutivas: es un mapa, no una barra. */}
              <div
                className="mt-3 grid gap-[3px]"
                style={{ gridTemplateColumns: `repeat(${TOTAL}, minmax(0, 1fr))` }}
                role="img"
                aria-label={`${readSections.length} de ${TOTAL} secciones leídas`}
              >
                {LESSON_SCREENS.map((s) => (
                  <div
                    key={s.n}
                    className="h-[5px]"
                    style={{
                      background: readSections.includes(s.n)
                        ? "var(--av-blue-500)"
                        : "color-mix(in oklab, var(--muted-foreground) 18%, transparent)",
                    }}
                  />
                ))}
              </div>
            </section>

            <section className="mt-7" aria-label="Secciones">
              <Rotulo>Secciones</Rotulo>
              <div className="mt-2 -mx-2.5">
                <TocList activeN={activeN} readSections={readSections} onSelect={goToSection} />
              </div>
            </section>

            <section className="mt-7" aria-label="Fuente">
              <Rotulo>Fuente</Rotulo>
              <dl className="mt-2.5 mb-0 grid grid-cols-[64px_minmax(0,1fr)] gap-x-3 gap-y-1.5 text-[13px]">
                <dt className="mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground mt-px">
                  Doc.
                </dt>
                <dd className="m-0 text-foreground">OACI Doc 8400 (PANS-ABC)</dd>
                <dt className="mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground mt-px">
                  Edición
                </dt>
                <dd className="m-0 text-foreground">6ª · 2004</dd>
                <dt className="mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground mt-px">
                  Base
                </dt>
                <dd className="m-0 text-foreground">Anexo 15 OACI</dd>
                <dt className="mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground mt-px">
                  Corte
                </dt>
                <dd className="m-0 text-foreground">Aerocivil, 29 JUL 2026</dd>
              </dl>
              <div
                className="mt-3.5 pl-3 border-l-2 text-[12px] leading-relaxed text-muted-foreground"
                style={{ borderColor: "color-mix(in oklab, var(--av-amber-400) 60%, transparent)" }}
              >
                {DISCLAIMERS.edition}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </AppLayout>
  )
}

// ─── Índice ──────────────────────────────────────────────────────────────────

interface TocListProps {
  activeN: number
  readSections: number[]
  onSelect: (anchor: string) => void
}

function TocList({ activeN, readSections, onSelect }: TocListProps) {
  return (
    <nav>
      <ol className="m-0 p-0 list-none flex flex-col gap-0.5">
        {LESSON_SCREENS.map((s) => {
          const isActive = s.n === activeN
          const isRead = readSections.includes(s.n)
          return (
            <li key={s.n}>
              <a
                href={`#s-${s.n}`}
                onClick={(e) => {
                  e.preventDefault()
                  onSelect(`s-${s.n}`)
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

        {/* Los dos últimos pasos del temario no son lectura: son la práctica y la
            evaluación. Van en el índice para que el recorrido completo se vea. */}
        <li className="mt-1 pt-1 border-t border-border">
          <a
            href="#cierre"
            onClick={(e) => {
              e.preventDefault()
              onSelect("cierre")
            }}
            className="flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-[13px] leading-snug text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowRight className="shrink-0 mt-0.5 h-3.5 w-3.5" aria-hidden />
            <span className="min-w-0 flex-1">Práctica y evaluación</span>
          </a>
        </li>
      </ol>
    </nav>
  )
}

// ─── Cierre del documento ────────────────────────────────────────────────────

function SourcesBlock() {
  return (
    <section className="pt-8 border-t doc-rule">
      <div
        className="inline-flex items-center gap-1.5 text-[12px] font-semibold"
        style={{ color: docAccent("var(--av-blue-500)", 55) }}
      >
        <Library className="h-3.5 w-3.5" /> Fuentes
      </div>
      <ol className="mt-3 mb-0 pl-5 list-decimal flex flex-col gap-1.5">
        {LESSON_SOURCES.map((s, i) => (
          <li key={i} className="text-[13px] leading-[1.65] doc-muted">
            {s}
          </li>
        ))}
      </ol>
      <p className="mt-4 mb-0 text-[13px] leading-[1.7] doc-muted max-w-[68ch]">
        El Doc 8400 y el Anexo 15 son la norma. Las guías de curso son material didáctico. La
        edición del Doc 8400 que usamos es la 6ª (2004): confirma siempre contra la edición vigente
        y contra los NOTAM publicados por la Aerocivil.
      </p>
    </section>
  )
}

function NextSteps({ readCount, id }: { readCount: number; id?: string }) {
  return (
    <section id={id} className="scroll-mt-24 mt-8 pt-7 border-t doc-rule">
      <h2 className="m-0 text-[17px] sm:text-[20px] font-semibold tracking-[-0.02em]">
        Ya sabes leer un NOTAM de principio a fin
      </h2>
      <p className="mt-1.5 mb-0 text-[13px] doc-muted leading-[1.7]">
        Lo que sigue es practicar con material real y medirte en la evaluación. Llevas {readCount} de{" "}
        {TOTAL} secciones leídas.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <DocLink
          to="/app/aerolinea/notam/practica"
          icon={Target}
          color="var(--av-blue-500)"
          title="Practicar con NOTAM reales"
          hint="Ejercicios de interpretación y NOTAM colombianos del resumen de la Aerocivil."
        />
        <DocLink
          to="/app/aerolinea/notam/evaluacion"
          icon={ClipboardCheck}
          color="var(--av-green-400)"
          title="Hacer la evaluación"
          hint="20 preguntas de opción múltiple. Apruebas con 80 sobre 100."
        />
      </div>
    </section>
  )
}

interface DocLinkProps {
  to: string
  icon: typeof Target
  color: string
  title: string
  hint: string
}

function DocLink({ to, icon: Icon, color, title, hint }: DocLinkProps) {
  return (
    <Link
      to={to}
      className="doc-soft group rounded-xl border doc-rule p-4 flex items-start gap-3 transition-transform hover:-translate-y-0.5"
    >
      <span
        className="shrink-0 h-10 w-10 rounded-xl flex items-center justify-center"
        style={{ color: docAccent(color, 70), background: docTint(color, 14) }}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold tracking-[-0.01em]">{title}</span>
        <span className="block mt-0.5 text-[13px] leading-[1.6] doc-muted">{hint}</span>
      </span>
      <ArrowRight
        className="hidden sm:block shrink-0 mt-1 h-4 w-4 doc-muted group-hover:translate-x-0.5 transition-transform"
        aria-hidden
      />
    </Link>
  )
}
