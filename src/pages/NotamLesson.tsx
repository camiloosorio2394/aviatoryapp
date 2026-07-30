import { useCallback, useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ClipboardCheck,
  Clock,
  Info,
  Library,
  Lightbulb,
  ListOrdered,
  Target,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { useSession } from "@/hooks/useSession"
import { LEVEL_META, accentText, readLocalProgress, writeLocalProgress } from "@/lib/notam"
import {
  fetchNotamProgress,
  markNotamProgress,
  pushPendingLocalProgress,
} from "@/lib/notamProgress"
import { LESSON_SCREENS, LESSON_SOURCES, LESSON_TOTAL } from "@/lib/notamLesson"
import type { LessonBlock } from "@/lib/notamLesson"

const TOTAL = LESSON_TOTAL
const TOTAL_MINUTES = LESSON_SCREENS.reduce((acc, s) => acc + s.minutes, 0)

/**
 * Color legible para un token --av-* pintado DENTRO de la hoja.
 *
 * `accentText` mezcla con --foreground, que sigue el tema de la app y en modo
 * oscuro es casi blanco: sobre el papel quedaría ilegible. Aquí mezclamos con
 * --doc-fg, que siempre es oscuro, así que el acento se lee igual en claro y
 * en oscuro sin perder identidad de color.
 */
function docAccent(token: string, mix = 45): string {
  return `color-mix(in oklab, ${token} ${mix}%, var(--doc-fg))`
}

/** Fondo tenue de un token sobre el papel, sin transparencias que ensucien. */
function docTint(token: string, mix = 8): string {
  return `color-mix(in oklab, ${token} ${mix}%, var(--doc-bg))`
}

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
      <div className="px-4 sm:px-7 py-7 pb-20 max-w-[1180px] mx-auto">
        <PageHeader
          eyebrow={
            <>
              <BookOpen className="h-3.5 w-3.5" /> NOTAM · Lección
            </>
          }
          title="Qué es un NOTAM y cómo leerlo"
          subtitle={`Documento de estudio en ${TOTAL} secciones, para leer de corrido como un PDF.`}
          actions={
            <Link
              to="/app/aerolinea/notam"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-[14px] font-semibold border border-border bg-card text-foreground transition-transform hover:-translate-y-0.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Volver a NOTAM
            </Link>
          }
        >
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] font-semibold text-muted-foreground">
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
          {/* Índice lateral: usa los tokens de la app, no es papel */}
          <aside
            className="hidden lg:block lg:sticky lg:top-20 max-h-[calc(100vh-6.5rem)] overflow-y-auto rounded-2xl border border-border bg-card p-3"
            aria-label="Índice de la lección"
          >
            <div className="px-2.5 pt-1 pb-2 text-[11.5px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Contenido
            </div>
            <TocList activeN={activeN} readSections={readSections} onSelect={goToSection} />
          </aside>

          <div className="min-w-0">
            {/* Índice desplegable en móvil */}
            <details
              ref={mobileTocRef}
              className="lg:hidden mb-4 rounded-2xl border border-border bg-card overflow-hidden"
            >
              <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden px-4 py-3 flex items-center justify-between gap-3 text-[14px] font-semibold text-foreground">
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
                <span className="shrink-0 text-[11.5px] font-semibold text-muted-foreground tabular">
                  Sección {activeN} de {TOTAL}
                </span>
              </div>
            </div>

            {/* La hoja: papel claro, continuo, con todo el contenido en orden */}
            <article
              ref={sheetRef}
              className="doc-sheet rounded-2xl px-5 sm:px-10 py-8 sm:py-11"
            >
              <header className="pb-7 border-b doc-rule">
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] doc-muted">
                  Documento de estudio · NOTAM
                </div>
                <p className="mt-3 mb-0 text-[15px] leading-[1.75] max-w-[64ch]">
                  Basado en el Doc 8400 de la OACI (PANS-ABC, 6ª ed.), el Anexo 15 y los resúmenes
                  mensuales de NOTAM vigentes de la Aeronáutica Civil de Colombia. Léelo de corrido:
                  cada sección continúa la anterior y el índice te devuelve a cualquier punto.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] font-semibold doc-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {TOTAL_MINUTES} minutos
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ListOrdered className="h-3.5 w-3.5" /> {TOTAL} secciones
                  </span>
                  <span>Material de la Aerocivil con corte al 29 JUL 2026</span>
                </div>
              </header>

              {LESSON_SCREENS.map((screen) => {
                const level = LEVEL_META[screen.level]
                return (
                  <section
                    key={screen.n}
                    id={`s-${screen.n}`}
                    data-section={screen.n}
                    className="scroll-mt-24 py-8 sm:py-9 border-t doc-rule first-of-type:border-t-0"
                  >
                    <header className="flex items-start gap-3 sm:gap-5">
                      <span
                        className="mono shrink-0 text-[30px] sm:text-[40px] font-extrabold leading-none tabular"
                        style={{ color: "color-mix(in oklab, var(--doc-fg) 17%, var(--doc-bg))" }}
                        aria-hidden
                      >
                        {String(screen.n).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h2 className="m-0 text-[19px] sm:text-[23px] font-extrabold tracking-[-0.02em] leading-[1.2]">
                          {screen.title}
                        </h2>
                        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] doc-muted">
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
                        <Block key={`${screen.n}-${i}`} block={block} />
                      ))}
                    </div>
                  </section>
                )
              })}

              <SourcesBlock />
              <NextSteps readCount={readSections.length} id="cierre" />
            </article>
          </div>
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
                  isActive ? "font-bold text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
                style={
                  isActive
                    ? { background: "color-mix(in oklab, var(--av-blue-500) 11%, transparent)" }
                    : undefined
                }
              >
                <span
                  className="shrink-0 w-4 mt-px text-[11.5px] font-bold tabular"
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

// ─── Marcado ligero: **negrita** y `codigo` ──────────────────────────────────

/**
 * Convierte marcado ligero a nodos de React sin dangerouslySetInnerHTML.
 * Soporta **negrita** y `codigo`. Pensado para vivir dentro de la hoja: los
 * colores salen de las variables --doc-*.
 */
function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  const out: ReactNode[] = []
  parts.forEach((part, i) => {
    if (part === "") return
    if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
      out.push(
        <strong key={i} className="font-bold" style={{ color: "var(--doc-fg)" }}>
          {part.slice(2, -2)}
        </strong>,
      )
      return
    }
    if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
      out.push(
        <code
          key={i}
          className="mono text-[0.88em] px-1.5 py-[0.12em] rounded-md border doc-rule break-words"
          style={{ background: docTint("var(--av-blue-500)", 9), color: "var(--doc-fg)" }}
        >
          {part.slice(1, -1)}
        </code>,
      )
      return
    }
    out.push(<span key={i}>{part}</span>)
  })
  return out
}

// ─── Bloques ─────────────────────────────────────────────────────────────────

const CALLOUT_TONE: Record<
  "info" | "warn" | "tip",
  { color: string; icon: typeof Info; fallbackTitle: string }
> = {
  info: { color: "var(--av-blue-500)", icon: Info, fallbackTitle: "Nota de fuente" },
  warn: { color: "var(--av-amber-400)", icon: AlertTriangle, fallbackTitle: "Ojo con esto" },
  tip: { color: "var(--av-green-400)", icon: Lightbulb, fallbackTitle: "Consejo" },
}

function Block({ block }: { block: LessonBlock }) {
  switch (block.kind) {
    case "p":
      return <p className="m-0 text-[15.5px]">{renderInline(block.text)}</p>

    case "quote":
      return (
        <blockquote
          className="m-0 pl-4 sm:pl-5 py-1 border-l-2"
          style={{ borderColor: docAccent("var(--av-blue-500)", 35) }}
        >
          <p className="m-0 text-[15.5px] italic">{renderInline(block.text)}</p>
          {block.source && <div className="mt-2 text-[12.5px] doc-muted">{block.source}</div>}
        </blockquote>
      )

    case "list": {
      const items = block.items.map((item, i) => (
        <li key={i} className="pl-1 text-[15.5px] leading-[1.7]">
          {renderInline(item)}
        </li>
      ))
      const cls = "m-0 pl-5 flex flex-col gap-2.5 marker:font-semibold"
      return block.ordered ? (
        <ol className={`list-decimal ${cls}`}>{items}</ol>
      ) : (
        <ul className={`list-disc ${cls}`}>{items}</ul>
      )
    }

    case "table":
      return (
        <div className="overflow-x-auto rounded-lg border doc-rule">
          <table className="w-full min-w-[440px] border-collapse text-left">
            <thead className="doc-soft">
              <tr>
                {block.head.map((h, i) => (
                  <th
                    key={i}
                    className="px-3.5 py-2.5 border-b doc-rule doc-muted text-[11.5px] font-bold uppercase tracking-[0.07em]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b doc-rule last:border-b-0">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3.5 py-3 align-top text-[14px] leading-[1.6]">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case "code":
      return (
        <pre className="doc-soft m-0 overflow-x-auto rounded-lg border doc-rule px-4 py-3.5">
          <code
            className="mono block text-[13px] leading-[1.65] whitespace-pre-wrap"
            style={{ color: "var(--doc-fg)" }}
          >
            {block.text}
          </code>
        </pre>
      )

    case "callout": {
      const tone = CALLOUT_TONE[block.tone]
      const Icon = tone.icon
      return (
        <div
          className="rounded-lg border-l-[3px] border-y border-r p-4 flex items-start gap-3"
          style={{
            borderColor: docAccent(tone.color, 30),
            borderLeftColor: docAccent(tone.color, 60),
            background: docTint(tone.color, 7),
          }}
        >
          <Icon
            className="shrink-0 mt-0.5 h-4 w-4"
            style={{ color: docAccent(tone.color, 70) }}
            aria-hidden
          />
          <div className="min-w-0">
            <div className="text-[13.5px] font-bold" style={{ color: docAccent(tone.color, 55) }}>
              {block.title ?? tone.fallbackTitle}
            </div>
            <p className="m-0 mt-1 text-[14.5px]">{renderInline(block.text)}</p>
          </div>
        </div>
      )
    }

    case "kv":
      return (
        <dl className="m-0 flex flex-col gap-0">
          {block.items.map((item, i) => (
            <div
              key={i}
              className="grid gap-x-4 gap-y-1 py-2.5 border-b doc-rule last:border-b-0 sm:grid-cols-[minmax(110px,180px)_minmax(0,1fr)]"
            >
              <dt
                className="mono text-[13.5px] font-bold"
                style={{ color: docAccent("var(--av-blue-500)", 60) }}
              >
                {item.k}
              </dt>
              <dd className="m-0 text-[14.5px] leading-[1.65]">{renderInline(item.v)}</dd>
            </div>
          ))}
        </dl>
      )
  }
}

// ─── Cierre del documento ────────────────────────────────────────────────────

function SourcesBlock() {
  return (
    <section className="pt-8 border-t doc-rule">
      <div
        className="inline-flex items-center gap-1.5 text-[12.5px] font-bold uppercase tracking-[0.12em]"
        style={{ color: docAccent("var(--av-blue-500)", 55) }}
      >
        <Library className="h-3.5 w-3.5" /> Fuentes
      </div>
      <ol className="mt-3 mb-0 pl-5 list-decimal flex flex-col gap-1.5">
        {LESSON_SOURCES.map((s, i) => (
          <li key={i} className="text-[13.5px] leading-[1.65] doc-muted">
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
      <h2 className="m-0 text-[17px] sm:text-[19px] font-extrabold tracking-[-0.02em]">
        Ya sabes leer un NOTAM de principio a fin
      </h2>
      <p className="mt-1.5 mb-0 text-[14px] doc-muted leading-[1.7]">
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
        <span className="block text-[15px] font-bold tracking-[-0.01em]">{title}</span>
        <span className="block mt-0.5 text-[13px] leading-[1.6] doc-muted">{hint}</span>
      </span>
      <ArrowRight
        className="hidden sm:block shrink-0 mt-1 h-4 w-4 doc-muted group-hover:translate-x-0.5 transition-transform"
        aria-hidden
      />
    </Link>
  )
}
