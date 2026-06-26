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

/**
 * TEA — Part 3: Picture Description & Discussion (un solo módulo).
 * El examinador muestra 2 imágenes relacionadas; el candidato las describe,
 * compara, identifica riesgos, especula causas, opina y conversa.
 */
export function IcaoPictureDescription() {
  const [idx, setIdx] = useState(0)
  const pair = PICTURE_PAIRS[idx]
  const total = PICTURE_PAIRS.length

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[1080px] mx-auto">
        <Link
          to="/app/icao"
          className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver al módulo Inglés ICAO
        </Link>

        {/* Header */}
        <div
          className="mono inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] px-2 py-1 rounded-full"
          style={{
            color: "var(--av-green-400)",
            background: "color-mix(in oklab, var(--av-green-400) 12%, transparent)",
            border: "1px solid color-mix(in oklab, var(--av-green-400) 30%, transparent)",
          }}
        >
          <ImageIcon className="h-3 w-3" /> TEA · PART 3 · PICTURE DESCRIPTION & DISCUSSION · 10 MIN
        </div>
        <h1 className="mt-3 text-[34px] font-extrabold tracking-[-0.03em] leading-[1.05]">
          Picture Description &amp; Discussion
        </h1>
        <p className="mt-2 text-[14px] text-muted-foreground max-w-[760px]">
          El examinador te muestra <strong className="text-foreground">dos imágenes relacionadas</strong>.
          Tenés que describir cada una, compararlas, identificar riesgos, explicar posibles causas, dar
          tu opinión y conversar sobre el tema. Mide tu capacidad de <strong className="text-foreground">desarrollar
          ideas, justificar opiniones y hablar con fluidez</strong>.
        </p>

        {/* Task steps */}
        <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {PART3_TASK_STEPS.map((s, i) => (
            <div
              key={s.label}
              className="rounded-xl border p-3"
              style={{ borderColor: "color-mix(in oklab, var(--border) 65%, transparent)" }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="mono flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold"
                  style={{ background: "color-mix(in oklab, var(--av-green-400) 14%, transparent)", color: "var(--av-green-400)" }}
                >
                  {i + 1}
                </span>
                <div className="text-[12.5px] font-bold tracking-[-0.01em]">{s.label}</div>
              </div>
              <p className="mt-1 text-[11.5px] text-muted-foreground leading-snug">{s.detail}</p>
            </div>
          ))}
        </div>

        {/* Pair navigator */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <div>
            <div className="mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--av-green-400)]">
              PAR {pair.id} / {total} · {pair.themeEn}
            </div>
            <h2 className="mt-0.5 text-[20px] font-extrabold tracking-[-0.02em]">{pair.theme}</h2>
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
                title={p.theme}
                className="mono w-8 h-8 rounded-lg text-[11px] font-bold border transition-colors"
                style={{
                  borderColor: active
                    ? "color-mix(in oklab, var(--av-green-400) 50%, transparent)"
                    : "color-mix(in oklab, var(--border) 60%, transparent)",
                  background: active ? "color-mix(in oklab, var(--av-green-400) 16%, transparent)" : "transparent",
                  color: active ? "var(--av-green-400)" : "var(--muted-foreground)",
                }}
              >
                {p.id}
              </button>
            )
          })}
        </div>

        <div className="mt-10 pt-6 border-t border-border/60 text-[11px] text-muted-foreground mono text-center">
          {total} pares de imágenes · TEA Part 3 · material NEW PICTURES
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
        <Hint icon={ImageIcon} color="var(--av-green-400)" text="Describí A y B en detalle, luego compará." />
        <Hint icon={AlertTriangle} color="var(--av-amber-400)" text="Identificá riesgos y posibles causas." />
        <Hint icon={Lightbulb} color="var(--av-cyan-400)" text="Dá tu opinión y justificala." />
      </div>

      {/* Discussion */}
      <div className="mt-5">
        <button
          onClick={() => setShowDiscussion((s) => !s)}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-lg text-[13px] font-semibold text-white border-0"
          style={{
            background: "linear-gradient(180deg, var(--av-green-400) 0%, oklch(0.55 0.16 155) 100%)",
            boxShadow: "0 1px 0 rgb(255 255 255 / 18%) inset, 0 8px 20px -8px oklch(0.55 0.16 155 / 50%)",
          }}
        >
          <MessagesSquare className="h-4 w-4" />
          {showDiscussion ? "Ocultar preguntas de discusión" : "Ver preguntas de discusión"}
        </button>

        {showDiscussion && (
          <div
            className="mt-3 rounded-xl border p-4"
            style={{
              borderColor: "color-mix(in oklab, var(--av-green-400) 25%, transparent)",
              background: "color-mix(in oklab, var(--av-green-400) 6%, transparent)",
            }}
          >
            <div className="mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--av-green-400)] mb-2">
              DISCUSSION · respondé en voz alta, desarrollando ideas
            </div>
            <ul className="space-y-2">
              {pair.discussion.map((q) => (
                <li key={q} className="flex items-start gap-2 text-[13.5px] text-foreground/90">
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
      className="rounded-2xl border overflow-hidden bg-card"
      style={{ borderColor: "color-mix(in oklab, var(--border) 70%, transparent)" }}
    >
      <div className="relative">
        <div
          className="absolute top-2 left-2 z-10 mono w-7 h-7 rounded-lg flex items-center justify-center text-[13px] font-extrabold text-white"
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
      <figcaption className="px-3 py-2 text-[11.5px] text-muted-foreground leading-snug">{alt}</figcaption>
    </figure>
  )
}

function Hint({ icon: Icon, color, text }: { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string; text: string }) {
  return (
    <div
      className="flex items-start gap-2 rounded-lg border p-2.5 text-[12px] text-foreground/80"
      style={{ borderColor: "color-mix(in oklab, var(--border) 60%, transparent)" }}
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
      className="inline-flex items-center justify-center h-9 w-9 rounded-lg border bg-card hover:bg-muted transition-colors disabled:opacity-35 disabled:cursor-not-allowed"
      style={{ borderColor: "color-mix(in oklab, var(--border) 70%, transparent)" }}
      aria-label={dir === "prev" ? "Par anterior" : "Par siguiente"}
    >
      {dir === "prev" ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
    </button>
  )
}
