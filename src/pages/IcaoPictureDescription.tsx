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
      <div className="px-7 py-9 sm:py-11 pb-24 max-w-[1080px] mx-auto">
        <Link
          to="/app/icao"
          className="inline-flex items-center gap-1.5 text-[13.5px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to ICAO English
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
              TEA · Part 3 · Picture description &amp; discussion · 10 min
            </div>
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.05] text-foreground">
            Picture Description &amp; Discussion
          </h1>
          <p className="mt-3 text-[15px] text-muted-foreground max-w-[760px]">
            The examiner shows you <strong className="text-foreground">two related images</strong>.
            You have to describe each one, compare them, spot risks, explain possible causes, give
            your opinion and discuss the topic. It measures your ability to <strong className="text-foreground">develop
            ideas, justify opinions and speak fluently</strong>.
          </p>
        </section>

        {/* Task steps */}
        <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {PART3_TASK_STEPS.map((s, i) => (
            <div
              key={s.label}
              className="rounded-2xl surface p-3"
            >
              <div className="flex items-center gap-2">
                <span
                  className="tabular-nums flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center text-[12px] font-bold"
                  style={{ background: "color-mix(in oklab, var(--av-green-400) 14%, transparent)", color: "var(--av-green-400)" }}
                >
                  {i + 1}
                </span>
                <div className="text-[14px] font-bold tracking-[-0.01em]">{s.label}</div>
              </div>
              <p className="mt-1 text-[13px] text-muted-foreground leading-snug">{s.detail}</p>
            </div>
          ))}
        </div>

        {/* Pair navigator */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <div>
            <div className="text-[13px] font-semibold tabular-nums text-[var(--av-green-400)]">
              Pair {pair.id} / {total}
            </div>
            <h2 className="mt-0.5 text-[20px] font-extrabold tracking-[-0.02em]">{pair.themeEn}</h2>
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
                className="tabular-nums w-8 h-8 rounded-lg text-[12.5px] font-bold border transition-colors"
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

        <div className="mt-10 pt-6 border-t border-border/60 text-[12.5px] text-muted-foreground text-center">
          {total} image pairs · TEA Part 3 · NEW PICTURES material
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
        <Hint icon={ImageIcon} color="var(--av-green-400)" text="Describe A and B in detail, then compare them." />
        <Hint icon={AlertTriangle} color="var(--av-amber-400)" text="Identify risks and possible causes." />
        <Hint icon={Lightbulb} color="var(--av-blue-500)" text="Give your opinion and justify it." />
      </div>

      {/* Discussion */}
      <div className="mt-5">
        <button
          onClick={() => setShowDiscussion((s) => !s)}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-full text-[14px] font-semibold text-white border-0 surface-lift"
          style={{ background: "var(--av-green-400)" }}
        >
          <MessagesSquare className="h-4 w-4" />
          {showDiscussion ? "Hide discussion questions" : "Show discussion questions"}
        </button>

        {showDiscussion && (
          <div
            className="mt-3 rounded-2xl border p-4"
            style={{
              borderColor: "color-mix(in oklab, var(--av-green-400) 25%, transparent)",
              background: "color-mix(in oklab, var(--av-green-400) 6%, transparent)",
            }}
          >
            <div className="text-[13px] font-semibold text-[var(--av-green-400)] mb-2">
              Discussion · answer out loud, developing your ideas
            </div>
            <ul className="space-y-2">
              {pair.discussion.map((q) => (
                <li key={q} className="flex items-start gap-2 text-[14.5px] text-foreground/90">
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
          className="absolute top-2 left-2 z-10 w-7 h-7 rounded-lg flex items-center justify-center text-[14px] font-extrabold text-white"
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
      className="flex items-start gap-2 rounded-lg border border-border bg-card p-2.5 text-[13.5px] text-foreground/90"
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
      className="inline-flex items-center justify-center h-9 w-9 rounded-xl border border-border bg-card hover:bg-muted transition-colors disabled:opacity-35 disabled:cursor-not-allowed"
      aria-label={dir === "prev" ? "Par anterior" : "Par siguiente"}
    >
      {dir === "prev" ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
    </button>
  )
}
