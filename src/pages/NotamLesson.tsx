import { useCallback, useEffect, useState } from "react"
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
  GraduationCap,
  Info,
  Lightbulb,
  Library,
  Target,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { SectionTitle } from "@/components/ui/section-title"
import { supabase } from "@/integrations/supabase/client"
import { LEVEL_META, accentText, readLocalProgress, writeLocalProgress } from "@/lib/notam"
import { LESSON_SCREENS, LESSON_SOURCES } from "@/lib/notamLesson"
import type { LessonBlock } from "@/lib/notamLesson"

const TOTAL = LESSON_SCREENS.length

/**
 * Lección NOTAM: 9 pantallas, una a la vez.
 * Ruta: /app/aerolinea/notam/aprende
 */
export function NotamLesson() {
  const [idx, setIdx] = useState(0)
  const [readScreens, setReadScreens] = useState<number[]>(() => readLocalProgress().lessonScreens)
  const [finished, setFinished] = useState(false)

  const screen = LESSON_SCREENS[idx]
  const level = LEVEL_META[screen.level]

  // Marca la pantalla como leída: el respaldo local manda, la base de datos es un extra.
  const markRead = useCallback((n: number) => {
    setReadScreens((prev) => (prev.includes(n) ? prev : [...prev, n].sort((a, b) => a - b)))

    const stored = readLocalProgress().lessonScreens
    if (stored.includes(n)) return
    writeLocalProgress({ lessonScreens: [...stored, n].sort((a, b) => a - b) })

    // Si la persistencia remota falla no pasa nada: el progreso ya quedó local.
    void supabase
      .rpc("notam_mark_progress", { p_lesson_screen: n, p_practice_id: null })
      .then(
        () => undefined,
        () => undefined,
      )
  }, [])

  // Scroll al tope cada vez que cambia la pantalla.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [idx])

  const goTo = useCallback(
    (nextIdx: number) => {
      if (nextIdx < 0 || nextIdx >= TOTAL || nextIdx === idx) return
      markRead(LESSON_SCREENS[idx].n)
      setIdx(nextIdx)
    },
    [idx, markRead],
  )

  const isLast = idx === TOTAL - 1

  return (
    <AppLayout>
      <div className="px-5 sm:px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        <Link
          to="/app/aerolinea/notam"
          className="inline-flex items-center gap-1.5 text-[13.5px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a la sección NOTAM
        </Link>

        <PageHeader
          eyebrow={
            <>
              <BookOpen className="h-3.5 w-3.5" /> NOTAM · Aprende
            </>
          }
          title={screen.title}
          subtitle={screen.kicker}
          actions={
            <>
              <button
                type="button"
                onClick={() => goTo(idx - 1)}
                disabled={idx === 0}
                className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-[14px] font-semibold border border-border bg-card text-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Anterior
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isLast) {
                    markRead(screen.n)
                    setFinished(true)
                    return
                  }
                  goTo(idx + 1)
                }}
                className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-[14px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--av-blue-500)" }}
              >
                {isLast ? "Terminar" : "Siguiente"} <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </>
          }
        >
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1 rounded-full"
              style={{
                color: accentText(level.color),
                background: `color-mix(in oklab, ${level.color} 12%, transparent)`,
                border: `1px solid color-mix(in oklab, ${level.color} 30%, transparent)`,
              }}
            >
              <Target className="h-3 w-3" /> {level.label}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-muted-foreground">
              <Clock className="h-3 w-3" /> {screen.minutes} min de lectura
            </span>
            <span className="text-[12px] font-semibold text-muted-foreground tabular">
              Pantalla {screen.n} de {TOTAL}
            </span>
          </div>
        </PageHeader>

        <ProgressBar
          current={idx}
          readScreens={readScreens}
          onJump={(nextIdx) => {
            setFinished(false)
            goTo(nextIdx)
          }}
        />

        {/* key por pantalla para que la animación de entrada se repita al avanzar */}
        <article
          key={screen.n}
          className="mt-6 rounded-2xl border border-border bg-card p-5 sm:p-7 anim-fade-up"
        >
          <div className="flex flex-col gap-4">
            {screen.blocks.map((block, i) => (
              <Block key={`${screen.n}-${i}`} block={block} />
            ))}
          </div>
        </article>

        {isLast && (
          <ClosingCard
            finished={finished || readScreens.includes(screen.n)}
            onFinish={() => {
              markRead(screen.n)
              setFinished(true)
            }}
          />
        )}

        {/* Navegación inferior, para no obligar a subir */}
        <div className="mt-7 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => goTo(idx - 1)}
            disabled={idx === 0}
            className="inline-flex items-center gap-1.5 h-11 px-5 rounded-xl text-[14.5px] font-semibold border border-border bg-card text-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
          >
            <ArrowLeft className="h-4 w-4" /> Anterior
          </button>
          <div className="text-[13px] text-muted-foreground tabular hidden sm:block">
            {readScreens.length} de {TOTAL} pantallas leídas
          </div>
          <button
            type="button"
            onClick={() => {
              if (isLast) {
                markRead(screen.n)
                setFinished(true)
                return
              }
              goTo(idx + 1)
            }}
            className="inline-flex items-center gap-1.5 h-11 px-5 rounded-xl text-[14.5px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--av-blue-500)" }}
          >
            {isLast ? "Terminar la lección" : "Siguiente"} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </AppLayout>
  )
}

// ─── Progreso ────────────────────────────────────────────────────────────────

interface ProgressBarProps {
  current: number
  readScreens: number[]
  onJump: (idx: number) => void
}

function ProgressBar({ current, readScreens, onJump }: ProgressBarProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="flex items-center gap-1.5 sm:gap-2">
        {LESSON_SCREENS.map((s, i) => {
          const isCurrent = i === current
          const isRead = readScreens.includes(s.n)
          const background = isCurrent
            ? "var(--av-blue-500)"
            : isRead
              ? "color-mix(in oklab, var(--av-green-400) 55%, transparent)"
              : "color-mix(in oklab, var(--muted-foreground) 35%, transparent)"
          return (
            <button
              key={s.n}
              type="button"
              onClick={() => onJump(i)}
              aria-label={`Ir a la pantalla ${s.n}: ${s.title}`}
              aria-current={isCurrent ? "step" : undefined}
              title={`${s.n}. ${s.title}`}
              className="group flex-1 min-w-0 py-3 focus-visible:outline-none"
            >
              <span
                className="block h-2.5 rounded-full transition-all group-hover:opacity-80"
                style={{ background }}
              />
            </button>
          )
        })}
      </div>
      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span
            className="h-2 w-4 rounded-full"
            style={{ background: "var(--av-blue-500)" }}
          />
          Pantalla actual
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            className="h-2 w-4 rounded-full"
            style={{ background: "color-mix(in oklab, var(--av-green-400) 55%, transparent)" }}
          />
          Leída
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            className="h-2 w-4 rounded-full"
            style={{ background: "color-mix(in oklab, var(--muted-foreground) 35%, transparent)" }}
          />
          Pendiente
        </span>
        <span className="text-[11.5px]">Toca cualquier segmento para saltar a esa pantalla.</span>
      </div>
    </div>
  )
}

// ─── Marcado ligero: **negrita** y `codigo` ──────────────────────────────────

/**
 * Convierte marcado ligero a nodos de React sin dangerouslySetInnerHTML.
 * Soporta **negrita** y `codigo`.
 */
function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  const out: ReactNode[] = []
  parts.forEach((part, i) => {
    if (part === "") return
    if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
      out.push(
        <strong key={i} className="font-bold text-foreground">
          {part.slice(2, -2)}
        </strong>,
      )
      return
    }
    if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
      out.push(
        <code
          key={i}
          className="mono text-[0.9em] px-1.5 py-[0.1em] rounded-md border border-border whitespace-nowrap"
          style={{ background: "color-mix(in oklab, var(--av-blue-500) 9%, transparent)" }}
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
      return (
        <p className="text-[15px] text-foreground/90 leading-relaxed">{renderInline(block.text)}</p>
      )

    case "quote":
      return (
        <blockquote
          className="pl-4 sm:pl-5 py-1 border-l-2"
          style={{ borderColor: "color-mix(in oklab, var(--av-blue-500) 45%, transparent)" }}
        >
          <p className="text-[15px] sm:text-[15.5px] text-foreground/90 leading-relaxed italic">
            {renderInline(block.text)}
          </p>
          {block.source && (
            <div className="mt-1.5 text-[12.5px] text-muted-foreground">{block.source}</div>
          )}
        </blockquote>
      )

    case "list": {
      const items = block.items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[15px] text-foreground/90 leading-relaxed">
          {block.ordered ? (
            <span
              className="flex-shrink-0 mt-0.5 inline-flex items-center justify-center h-5 w-5 rounded-full text-[11.5px] font-bold tabular"
              style={{
                color: accentText("var(--av-blue-500)"),
                background: "color-mix(in oklab, var(--av-blue-500) 12%, transparent)",
              }}
            >
              {i + 1}
            </span>
          ) : (
            <Check
              className="flex-shrink-0 mt-1 h-3.5 w-3.5"
              style={{ color: "var(--av-blue-500)" }}
              strokeWidth={3}
            />
          )}
          <span>{renderInline(item)}</span>
        </li>
      ))
      return block.ordered ? (
        <ol className="flex flex-col gap-2.5 m-0 p-0 list-none">{items}</ol>
      ) : (
        <ul className="flex flex-col gap-2.5 m-0 p-0 list-none">{items}</ul>
      )
    }

    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[520px] border-collapse text-left">
            <thead className="bg-muted">
              <tr>
                {block.head.map((h, i) => (
                  <th
                    key={i}
                    className="px-3.5 py-2.5 text-[12.5px] font-bold uppercase tracking-[0.06em] text-muted-foreground border-b border-border"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-border last:border-b-0">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-3.5 py-3 align-top text-[14px] text-foreground/90 leading-relaxed"
                    >
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
        <pre className="overflow-x-auto rounded-xl border border-border bg-muted px-4 py-3.5">
          <code className="mono text-[13px] leading-relaxed whitespace-pre-wrap text-foreground/90">
            {block.text}
          </code>
        </pre>
      )

    case "callout": {
      const tone = CALLOUT_TONE[block.tone]
      const Icon = tone.icon
      return (
        <div
          className="rounded-xl border p-4 flex items-start gap-3"
          style={{
            borderColor: `color-mix(in oklab, ${tone.color} 28%, transparent)`,
            background: `color-mix(in oklab, ${tone.color} 7%, transparent)`,
          }}
        >
          <Icon className="flex-shrink-0 mt-0.5 h-4 w-4" style={{ color: tone.color }} />
          <div>
            <div className="text-[13.5px] font-bold" style={{ color: accentText(tone.color) }}>
              {block.title ?? tone.fallbackTitle}
            </div>
            <p className="mt-0.5 text-[14px] text-foreground/85 leading-relaxed">
              {renderInline(block.text)}
            </p>
          </div>
        </div>
      )
    }

    case "kv":
      return (
        <div className="grid gap-2.5 sm:grid-cols-2">
          {block.items.map((item, i) => (
            <div key={i} className="rounded-xl border border-border p-3.5">
              <div
                className="mono text-[13.5px] font-bold"
                style={{ color: accentText("var(--av-blue-500)") }}
              >
                {item.k}
              </div>
              <div className="mt-1 text-[13.5px] text-muted-foreground leading-relaxed">
                {renderInline(item.v)}
              </div>
            </div>
          ))}
        </div>
      )
  }
}

// ─── Cierre de la lección ────────────────────────────────────────────────────

function ClosingCard({ finished, onFinish }: { finished: boolean; onFinish: () => void }) {
  return (
    <section
      className="mt-6 rounded-2xl border p-5 sm:p-7"
      style={{
        borderColor: "color-mix(in oklab, var(--av-green-400) 28%, transparent)",
        background: "color-mix(in oklab, var(--av-green-400) 6%, transparent)",
      }}
    >
      <SectionTitle
        icon={GraduationCap}
        eyebrow="Lección completa"
        title="Ya sabes leer un NOTAM de principio a fin"
        hint="Lo que sigue es practicar con material real y medirte en la evaluación."
        right={
          finished ? (
            <span
              className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold px-2.5 py-1 rounded-full"
              style={{
                color: accentText("var(--av-green-400)"),
                background: "color-mix(in oklab, var(--av-green-400) 14%, transparent)",
              }}
            >
              <Check className="h-3 w-3" strokeWidth={3} /> Progreso guardado
            </span>
          ) : (
            <button
              type="button"
              onClick={onFinish}
              className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-[13px] font-semibold border border-border bg-card text-foreground transition-transform hover:-translate-y-0.5"
            >
              <Check className="h-3.5 w-3.5" /> Marcar como leída
            </button>
          )
        }
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          to="/app/aerolinea/notam/practica"
          className="group rounded-xl border border-border bg-card p-4 flex items-start gap-3 transition-transform hover:-translate-y-0.5"
        >
          <span
            className="flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center"
            style={{
              color: "var(--av-blue-500)",
              background: "color-mix(in oklab, var(--av-blue-500) 12%, transparent)",
            }}
          >
            <Target className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-[15.5px] font-bold tracking-[-0.01em]">
              Practicar con NOTAM reales
            </span>
            <span className="block mt-0.5 text-[13px] text-muted-foreground leading-relaxed">
              Ejercicios de interpretación y NOTAM colombianos del resumen de la Aerocivil.
            </span>
          </span>
          <ArrowRight className="hidden sm:block flex-shrink-0 mt-1 h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <Link
          to="/app/aerolinea/notam/evaluacion"
          className="group rounded-xl border border-border bg-card p-4 flex items-start gap-3 transition-transform hover:-translate-y-0.5"
        >
          <span
            className="flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center"
            style={{
              color: "var(--av-green-400)",
              background: "color-mix(in oklab, var(--av-green-400) 12%, transparent)",
            }}
          >
            <ClipboardCheck className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-[15.5px] font-bold tracking-[-0.01em]">
              Hacer la evaluación
            </span>
            <span className="block mt-0.5 text-[13px] text-muted-foreground leading-relaxed">
              20 preguntas de opción múltiple. Apruebas con 80 sobre 100.
            </span>
          </span>
          <ArrowRight className="hidden sm:block flex-shrink-0 mt-1 h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="mt-5 pt-4 border-t border-border/60">
        <div
          className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold mb-2"
          style={{ color: accentText("var(--av-blue-500)") }}
        >
          <Library className="h-3.5 w-3.5" /> Fuentes de la lección
        </div>
        <ol className="flex flex-col gap-1.5 m-0 p-0 list-none">
          {LESSON_SOURCES.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-[13px] text-muted-foreground leading-relaxed">
              <span className="tabular font-semibold text-foreground/70">{i + 1}.</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[12.5px] text-muted-foreground leading-relaxed">
          El Doc 8400 y el Anexo 15 son la norma. Las guías de curso son material didáctico. La
          edición del Doc 8400 que usamos es la 6ª (2004): confirma siempre contra la edición
          vigente y contra los NOTAM publicados por la Aerocivil.
        </p>
      </div>
    </section>
  )
}
