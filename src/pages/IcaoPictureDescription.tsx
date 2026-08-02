import { useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  Image as ImageIcon,
  AlertTriangle,
  Lightbulb,
  MessagesSquare,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PICTURE_PAIRS, PART3_TASK_STEPS, type PicturePair } from "@/lib/icaoPictures"
import { registrarEstudioDiario } from "@/lib/activity"

/**
 * TEA — Part 3: Picture Description & Discussion (un solo módulo).
 * El examinador muestra 2 imágenes relacionadas; el candidato las describe,
 * compara, identifica riesgos, especula causas, opina y conversa.
 */
/**
 * Los pasos de la tarea viven en @/lib/icaoPictures en inglés. Aquí solo se
 * traduce ese rótulo explicativo; si el material cambiara, cae de vuelta al
 * texto original en lugar de romperse.
 */
const TASK_STEP_ES: Record<string, { label: string; detail: string }> = {
  "Describe each image": {
    label: "Describe cada imagen",
    detail: "Detalle por detalle, primer plano y fondo: qué ves en A y qué ves en B.",
  },
  "Compare the two": {
    label: "Compara las dos",
    detail: "Semejanzas y diferencias entre las dos situaciones.",
  },
  "Identify the risks": {
    label: "Identifica los riesgos",
    detail: "Qué peligros o problemas de seguridad aparecen.",
  },
  "Explain possible causes": {
    label: "Explica posibles causas",
    detail: "Especula con “might / could / may have”: qué pudo haberlo provocado.",
  },
  "Give your opinion": {
    label: "Da tu opinión",
    detail: "Qué piensas del tema y por qué. Justifícalo.",
  },
  "Discuss the topic": {
    label: "Conversa sobre el tema",
    detail: "Responde las preguntas de conversación desarrollando tus ideas.",
  },
}

export function IcaoPictureDescription() {
  const [idx, setIdx] = useState(0)
  const pair = PICTURE_PAIRS[idx]
  const total = PICTURE_PAIRS.length

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[1080px] mx-auto">
        <Link
          to="/app/icao"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a Inglés ICAO
        </Link>

        {/* Header */}
        <section className="relative overflow-hidden rounded-2xl surface p-7 sm:p-8">
          <div className="flex items-center gap-3">
            <div
              className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white"
              style={{ background: "linear-gradient(135deg, var(--av-blue-400), var(--av-blue-500))" }}
            >
              <ImageIcon className="h-5 w-5" />
            </div>
            <div
              className="text-[13px] font-semibold"
              style={{ color: "var(--av-blue-500)" }}
            >
              TEA · Parte 3 · Picture Description &amp; Discussion · 10 minutos
            </div>
          </div>
          <h1 className="mt-4 text-[32px] sm:text-[32px] font-semibold tracking-[-0.03em] leading-[1.05] text-foreground">
            Descripción de imágenes y conversación
          </h1>
          <p className="mt-3 text-[15px] text-muted-foreground max-w-[760px]">
            El examinador te muestra <strong className="text-foreground">dos imágenes relacionadas</strong>.
            Tienes que describir cada una, compararlas, identificar riesgos, explicar posibles causas,
            dar tu opinión y conversar sobre el tema. Mide tu capacidad de{" "}
            <strong className="text-foreground">desarrollar ideas, justificar opiniones y hablar con fluidez</strong>.
          </p>
        </section>

        {/* Task steps */}
        <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {PART3_TASK_STEPS.map((s, i) => {
            const es = TASK_STEP_ES[s.label] ?? s
            return (
              <div
                key={s.label}
                className="rounded-2xl surface p-3"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="tabular-nums flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center text-[12px] font-semibold"
                    style={{ background: "color-mix(in oklab, var(--av-green-400) 14%, transparent)", color: "var(--av-success-fg)" }}
                  >
                    {i + 1}
                  </span>
                  <div className="text-[13px] font-semibold tracking-[-0.01em]">{es.label}</div>
                </div>
                <p className="mt-1 text-[13px] text-muted-foreground leading-snug">{es.detail}</p>
              </div>
            )
          })}
        </div>

        {/* Pair navigator */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <div>
            <div className="text-[13px] font-semibold tabular-nums" style={{ color: "var(--av-success-fg)" }}>
              Par {pair.id} / {total}
            </div>
            <h2 className="mt-0.5 text-[20px] font-semibold tracking-[-0.02em]">{pair.themeEn}</h2>
          </div>
          <div className="flex items-center gap-1.5">
            <NavBtn disabled={idx === 0} onClick={() => setIdx((i) => Math.max(0, i - 1))} dir="prev" />
            <NavBtn disabled={idx === total - 1} onClick={() => setIdx((i) => Math.min(total - 1, i + 1))} dir="next" />
          </div>
        </div>

        <PairView key={pair.id} pair={pair} />

        {/* Pair picker (dots) */}
        <div className="mt-7 flex flex-wrap gap-1.5">
          {PICTURE_PAIRS.map((p, i) => {
            const active = i === idx
            return (
              <button
                key={p.id}
                onClick={() => setIdx(i)}
                title={p.themeEn}
                className="tabular-nums w-8 h-8 rounded-lg text-[12px] font-semibold border transition-colors"
                style={{
                  borderColor: active
                    ? "color-mix(in oklab, var(--av-green-400) 50%, transparent)"
                    : "color-mix(in oklab, var(--border) 60%, transparent)",
                  background: active ? "color-mix(in oklab, var(--av-green-400) 16%, transparent)" : "transparent",
                  color: active ? "var(--av-success-fg)" : "var(--muted-foreground)",
                }}
              >
                {p.id}
              </button>
            )
          })}
        </div>

        <div className="mt-10 pt-6 border-t border-border/60 text-[12px] text-muted-foreground text-center">
          {total} pares de imágenes · TEA Parte 3 · material NEW PICTURES
        </div>
      </div>
    </AppLayout>
  )
}

function PairView({ pair }: { pair: PicturePair }) {
  const [showDiscussion, setShowDiscussion] = useState(false)
  return (
    <>
      {/* Images */}
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <PictureCard letter="A" src={pair.imageA} alt={pair.altA} />
        <PictureCard letter="B" src={pair.imageB} alt={pair.altB} />
      </div>

      {/* Reminders */}
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <Hint icon={ImageIcon} color="var(--av-green-400)" text="Describe A y B en detalle y luego compáralas." />
        <Hint icon={AlertTriangle} color="var(--av-amber-400)" text="Identifica riesgos y posibles causas." />
        <Hint icon={Lightbulb} color="var(--av-blue-500)" text="Da tu opinión y justifícala." />
      </div>

      {/* Discussion */}
      <div className="mt-5">
        <button
          onClick={() => {
            // Abrir las preguntas de conversación es el acto de estudio: es lo
            // que se practica de esta parte del examen. Montar la página no.
            if (!showDiscussion) void registrarEstudioDiario("icao-imagenes")
            setShowDiscussion((s) => !s)
          }}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl text-[13px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
          style={{ background: "var(--av-blue-500)" }}
        >
          <MessagesSquare className="h-4 w-4" />
          {showDiscussion ? "Ocultar las preguntas de conversación" : "Ver las preguntas de conversación"}
        </button>

        {showDiscussion && (
          <div
            className="mt-3 rounded-2xl border p-4"
            style={{
              borderColor: "color-mix(in oklab, var(--av-green-400) 25%, transparent)",
              background: "color-mix(in oklab, var(--av-green-400) 6%, transparent)",
            }}
          >
            <div className="text-[13px] font-semibold mb-2" style={{ color: "var(--av-success-fg)" }}>
              Conversación: responde en voz alta desarrollando tus ideas
            </div>
            <ul className="space-y-2">
              {pair.discussion.map((q) => (
                <li key={q} className="flex items-start gap-2 text-[15px] text-foreground/90">
                  <Check className="flex-shrink-0 mt-0.5 h-3.5 w-3.5 text-[var(--av-green-400)]" strokeWidth={3} />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

function PictureCard({ letter, src, alt }: { letter: string; src: string; alt: string }) {
  return (
    <figure
      className="rounded-2xl border border-border overflow-hidden bg-card"
    >
      <div className="relative">
        <div
          className="absolute top-2 left-2 z-10 w-7 h-7 rounded-lg flex items-center justify-center text-[13px] font-semibold text-white"
          style={{ background: "oklch(0.2 0.02 250 / 0.75)", backdropFilter: "blur(4px)" }}
        >
          {letter}
        </div>
        <img
          src={src}
          alt={alt}
          className="w-full aspect-[4/3] object-cover bg-muted"
        />
      </div>
      <figcaption className="px-3 py-2 text-[13px] text-muted-foreground leading-snug">{alt}</figcaption>
    </figure>
  )
}

function Hint({ icon: Icon, color, text }: { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string; text: string }) {
  return (
    <div
      className="flex items-start gap-2 rounded-lg surface p-2.5 text-[13px] text-foreground/90"
    >
      <Icon className="flex-shrink-0 mt-0.5 h-3.5 w-3.5" style={{ color }} />
      <span>{text}</span>
    </div>
  )
}

function NavBtn({ disabled, onClick, dir }: { disabled: boolean; onClick: () => void; dir: "prev" | "next" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center h-9 w-9 rounded-xl surface hover:bg-muted transition-colors disabled:opacity-35 disabled:cursor-not-allowed"
      aria-label={dir === "prev" ? "Par anterior" : "Par siguiente"}
    >
      {dir === "prev" ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
    </button>
  )
}
