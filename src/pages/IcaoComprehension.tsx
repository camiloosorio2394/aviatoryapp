import { useEffect, useRef, useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  ArrowRight,
  Headphones,
  Play,
  Square,
  RotateCcw,
  Eye,
  Plane,
  RadioTower,
  AlertTriangle,
  Check,
  HelpCircle,
  BookOpen,
  ChevronDown,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import {
  SHORT_AUDIO_SETS,
  SHORT_AUDIO_TOTAL,
  LONG_AUDIOS,
  INTERACTIVE_ITEMS,
  SAMPLE_MESSAGES_2A,
  SAMPLE_SCENARIOS_2C,
  type Speaker,
  type LongAudio,
  type ShortAudio,
  type InteractiveItem,
} from "@/lib/icaoComprehension"

/**
 * TEA — Part 2: Interactive Comprehension. Audios reales (Supabase Storage).
 * 2A Short · 2B Long · 2C Interactive Response.
 */
type Tab = "2a" | "2b" | "2c"

export function IcaoComprehension() {
  const [tab, setTab] = useState<Tab>("2a")

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[940px] mx-auto">
        <Link
          to="/app/icao"
          className="inline-flex items-center gap-1.5 text-[13.5px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to ICAO English
        </Link>

        {/* Header */}
        <div
          className="mono inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.18em] px-2 py-1 rounded-full"
          style={{
            color: "var(--av-violet-400)",
            background: "color-mix(in oklab, var(--av-violet-400) 12%, transparent)",
            border: "1px solid color-mix(in oklab, var(--av-violet-400) 30%, transparent)",
          }}
        >
          <Headphones className="h-3 w-3" /> TEA · PART 2 · INTERACTIVE COMPREHENSION · 8–12 MIN
        </div>
        <h1 className="mt-3 text-[34px] font-extrabold tracking-[-0.03em] leading-[1.05]">
          Interactive Comprehension
        </h1>
        <p className="mt-2 text-[15px] text-muted-foreground max-w-[720px]">
          The part that sets the TEA apart. You listen to non-routine and emergency situations and
          have to show that you <strong className="text-foreground">understood the whole
          message</strong>. These are <strong className="text-foreground">real audios</strong> from
          the practice material.
        </p>

        {/* Playback rule */}
        <div
          className="mt-5 rounded-xl border p-4 flex items-start gap-3"
          style={{
            borderColor: "color-mix(in oklab, var(--av-amber-400) 25%, transparent)",
            background: "color-mix(in oklab, var(--av-amber-400) 6%, transparent)",
          }}
        >
          <AlertTriangle className="flex-shrink-0 mt-0.5 h-4.5 w-4.5" style={{ color: "var(--av-amber-400)" }} />
          <div className="text-[14px] text-foreground/85 leading-relaxed">
            <strong>Exam rule:</strong> each audio plays <strong>once</strong>. You may request
            <strong> one replay</strong>, but <strong>never a third time</strong>. Asking for repeats
            often lowers your Comprehension score. We mirror that rule here: 2 plays per audio.
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-7 flex gap-1.5 flex-wrap">
          <TabBtn active={tab === "2a"} onClick={() => setTab("2a")} label="2A · Short Audios" />
          <TabBtn active={tab === "2b"} onClick={() => setTab("2b")} label="2B · Long Audios" />
          <TabBtn active={tab === "2c"} onClick={() => setTab("2c")} label="2C · Interactive Response" />
        </div>

        <div className="mt-6">
          {tab === "2a" && <ShortAudiosSection />}
          {tab === "2b" && <LongAudiosSection />}
          {tab === "2c" && <InteractiveSection />}
        </div>
      </div>
    </AppLayout>
  )
}

// ─── Player de audio real (regla 1 + 1 reproducciones) ───────────────────────
function ClipPlayer({ audioUrl, label }: { audioUrl: string; label?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [plays, setPlays] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState(false)
  const maxPlays = 2
  const canPlay = plays < maxPlays

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  function ensureAudio() {
    if (!audioRef.current) {
      const a = new Audio(audioUrl)
      a.preload = "none"
      a.onended = () => setPlaying(false)
      a.onerror = () => { setPlaying(false); setError(true) }
      audioRef.current = a
    }
    return audioRef.current
  }

  function play() {
    if (!canPlay) return
    const a = ensureAudio()
    a.currentTime = 0
    a.play()
      .then(() => {
        setPlaying(true)
        setError(false)
        setPlays((p) => p + 1)
      })
      .catch(() => setError(true))
  }

  function stop() {
    const a = audioRef.current
    if (a) {
      a.pause()
      a.currentTime = 0
    }
    setPlaying(false)
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={playing ? stop : play}
        disabled={!canPlay && !playing}
        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg text-[14px] font-semibold text-white border-0 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(180deg, var(--av-violet-400) 0%, oklch(0.5 0.2 295) 100%)",
          boxShadow: "0 1px 0 rgb(255 255 255 / 18%) inset, 0 8px 20px -8px oklch(0.5 0.2 295 / 50%)",
        }}
      >
        {playing ? (
          <><Square className="h-3.5 w-3.5" /> Stop</>
        ) : plays === 0 ? (
          <><Play className="h-3.5 w-3.5" /> {label ?? "Play"}</>
        ) : (
          <><RotateCcw className="h-3.5 w-3.5" /> Play again</>
        )}
      </button>
      <div className="mono text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
        {plays}/{maxPlays} plays
        {plays >= maxPlays && " · no third (TEA rule)"}
      </div>
      {error && (
        <div className="text-[12.5px] text-[var(--av-red-400)]">Couldn't load the audio.</div>
      )}
    </div>
  )
}

// ─── QUIZ unificado (aleatorio, una pregunta a la vez) ───────────────────────
interface QItem {
  id: string
  audioUrl: string
  playLabel?: string
  speaker?: Speaker // si existe → se pregunta pilot/controller y se verifica
  reveal: ReactNode
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const QUIZ_SIZE = 10
function pickQuiz(items: QItem[]): QItem[] {
  return shuffle(items).slice(0, Math.min(QUIZ_SIZE, items.length))
}

function QuizRunner({ items, accent = "var(--av-violet-400)" }: { items: QItem[]; accent?: string }) {
  const [order, setOrder] = useState<QItem[]>(() => pickQuiz(items))
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<Speaker | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const scorable = order.filter((q) => q.speaker).length
  const cur = order[idx]

  function pickSpeaker(s: Speaker) {
    if (revealed) return
    setPicked(s)
    setRevealed(true)
    if (s === cur.speaker) setScore((v) => v + 1)
  }
  function next() {
    if (idx >= order.length - 1) { setDone(true); return }
    setIdx((i) => i + 1); setPicked(null); setRevealed(false)
  }
  function restart() {
    setOrder(pickQuiz(items)); setIdx(0); setPicked(null); setRevealed(false); setScore(0); setDone(false)
  }

  if (done) {
    const pct = scorable ? Math.round((score / scorable) * 100) : 0
    return (
      <div className="text-center pt-6">
        <div className="mono text-[12px] font-bold uppercase tracking-[0.16em] text-muted-foreground">QUIZ COMPLETE</div>
        {scorable > 0 ? (
          <>
            <div className="mt-2 text-[64px] font-extrabold tracking-[-0.04em] leading-none" style={{ color: accent }}>{score} / {scorable}</div>
            <div className="mt-1 mono text-[13px] uppercase tracking-[0.16em]" style={{ color: accent }}>{pct}% pilot/controller</div>
          </>
        ) : (
          <div className="mt-3 text-[16px] text-foreground/80">You went through {order.length} situations.</div>
        )}
        <div className="mt-8">
          <button onClick={restart} className="av-shine inline-flex items-center gap-2 h-11 px-5 rounded-lg text-[14px] font-semibold text-white border-0"
            style={{ background: `linear-gradient(180deg, ${accent} 0%, oklch(0.5 0.2 295) 100%)`, boxShadow: "0 8px 20px -8px oklch(0.5 0.2 295 / 50%)" }}>
            <RotateCcw className="h-4 w-4" /> New quiz (new random set)
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* progreso */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="mono text-[12.5px] uppercase tracking-[0.12em] text-muted-foreground">
          {idx + 1} <span className="opacity-50">/ {order.length}</span>
        </div>
        <div className="flex-1 mx-3 h-1.5 rounded-full bg-border/50 overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width: `${((idx + (revealed ? 1 : 0)) / order.length) * 100}%`, background: accent }} />
        </div>
        {scorable > 0 && <div className="mono text-[12.5px] text-muted-foreground">✓ {score}</div>}
      </div>

      <div className="rounded-2xl border bg-card p-5" style={cardBorder}>
        <div className="flex items-center justify-center">
          <ClipPlayer audioUrl={cur.audioUrl} label={cur.playLabel ?? "Play"} />
        </div>

        {/* Pilot/controller question (verified) */}
        {cur.speaker && (
          <div className="mt-5">
            <div className="text-center text-[14px] font-semibold mb-2.5">Who is speaking?</div>
            <div className="flex items-center justify-center gap-2.5">
              {(["pilot", "controller"] as Speaker[]).map((s) => {
                const chosen = picked === s
                const isAnswer = cur.speaker === s
                const showCorrect = revealed && isAnswer
                const showWrong = revealed && chosen && !isAnswer
                return (
                  <button key={s} onClick={() => pickSpeaker(s)} disabled={revealed}
                    className="inline-flex items-center gap-2 h-11 px-5 rounded-xl text-[14px] font-bold border transition-colors disabled:cursor-default"
                    style={{
                      borderColor: showCorrect ? "var(--av-green-400)" : showWrong ? "var(--av-red-400)" : chosen ? accent : "color-mix(in oklab, var(--border) 70%, transparent)",
                      background: showCorrect ? "color-mix(in oklab, var(--av-green-400) 14%, transparent)" : showWrong ? "color-mix(in oklab, var(--av-red-400) 14%, transparent)" : "transparent",
                      color: showCorrect ? "var(--av-green-400)" : showWrong ? "var(--av-red-400)" : "var(--foreground)",
                    }}>
                    {s === "pilot" ? <Plane className="h-4 w-4" /> : <RadioTower className="h-4 w-4" />}
                    {s === "pilot" ? "Pilot" : "Controller"}
                    {showCorrect && <Check className="h-4 w-4" strokeWidth={3} />}
                  </button>
                )
              })}
            </div>
            {revealed && (
              <div className="mt-2.5 text-center text-[13px] font-semibold" style={{ color: picked === cur.speaker ? "var(--av-green-400)" : "var(--av-red-400)" }}>
                {picked === cur.speaker ? "Correct!" : `It was ${cur.speaker === "pilot" ? "Pilot" : "Controller"}`}
              </div>
            )}
          </div>
        )}

        {/* For 2C (no speaker): Show answer button */}
        {!cur.speaker && !revealed && (
          <div className="mt-5 flex justify-center">
            <button onClick={() => setRevealed(true)} className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-[13.5px] font-semibold border border-border bg-card hover:bg-muted transition-colors">
              <Eye className="h-4 w-4" /> Show model answer
            </button>
          </div>
        )}

        {/* Reveal: the key info */}
        {revealed && <div className="mt-4">{cur.reveal}</div>}
      </div>

      {revealed && (
        <div className="mt-5 flex justify-end">
          <button onClick={next} className="av-shine inline-flex items-center gap-2 h-11 px-5 rounded-lg text-[14px] font-semibold text-white border-0"
            style={{ background: `linear-gradient(180deg, ${accent} 0%, oklch(0.5 0.2 295) 100%)`, boxShadow: "0 8px 20px -8px oklch(0.5 0.2 295 / 50%)" }}>
            {idx >= order.length - 1 ? "See results" : "Next"} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  )
}

// ─── Reveals (la "misma info que en audios largos") ──────────────────────────
function ShortReveal({ a }: { a: ShortAudio }) {
  return (
    <div className="rounded-lg border p-3.5" style={revealBox}>
      {a.speaker && <SpeakerBadge speaker={a.speaker} />}
      {a.transcript && <Transcript text={a.transcript} />}
    </div>
  )
}
function LongReveal({ a }: { a: LongAudio }) {
  return (
    <div className="rounded-lg border p-3.5 space-y-3" style={revealBox}>
      <div className="text-[14.5px] font-semibold tracking-[-0.01em]">{a.title}</div>
      {a.summary && <RevealRow label="Summary" value={a.summary} color="var(--av-cyan-400)" />}
      {a.problem && <RevealRow label="The problem" value={a.problem} color="var(--av-red-400)" />}
      {a.request && <RevealRow label="Request / advisory" value={a.request} color="var(--av-cyan-400)" />}
      {a.details && a.details.length > 0 && (
        <div>
          <div className="mono text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--av-green-400)] mb-1.5">KEY DETAILS</div>
          <ul className="space-y-1">
            {a.details.map((d) => (
              <li key={d} className="flex items-start gap-2 text-[14px] text-foreground/85">
                <Check className="flex-shrink-0 mt-0.5 h-3.5 w-3.5 text-[var(--av-green-400)]" strokeWidth={3} /><span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {a.transcript && <Transcript text={a.transcript} />}
    </div>
  )
}
function InteractiveReveal({ it }: { it: InteractiveItem }) {
  return (
    <div className="rounded-lg border p-3.5 space-y-3" style={revealBox}>
      {it.transcript && (
        <div className="text-[14px] text-foreground/90">
          <span className="mono text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Situation: </span>
          <span className="italic">&ldquo;{it.transcript}&rdquo;</span>
        </div>
      )}
      {it.questions && (
        <div>
          <div className="mono text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--av-cyan-400)] mb-1.5">QUESTIONS YOU COULD ASK</div>
          <ul className="space-y-1">
            {it.questions.map((q) => (
              <li key={q} className="flex items-start gap-2 text-[14px] italic text-foreground/85">
                <HelpCircle className="flex-shrink-0 mt-0.5 h-3.5 w-3.5 text-[var(--av-cyan-400)]" /><span>&ldquo;{q}&rdquo;</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {it.advice && (
        <div>
          <div className="mono text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--av-green-400)] mb-1.5">RECOMMENDATIONS</div>
          <ul className="space-y-1">
            {it.advice.map((a) => (
              <li key={a} className="flex items-start gap-2 text-[14px] text-foreground/85">
                <Check className="flex-shrink-0 mt-0.5 h-3.5 w-3.5 text-[var(--av-green-400)]" strokeWidth={3} /><span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ─── 2A · SHORT AUDIOS (quiz aleatorio) ──────────────────────────────────────
function ShortAudiosSection() {
  const items: QItem[] = SHORT_AUDIO_SETS.flatMap((set) =>
    set.items.map((a) => ({ id: a.id, audioUrl: a.audioUrl, speaker: a.speaker, reveal: <ShortReveal a={a} /> })),
  )
  return (
    <>
      <SectionIntro text={`A random quiz of ${Math.min(10, SHORT_AUDIO_TOTAL)} short messages drawn from the bank of ${SHORT_AUDIO_TOTAL}. Listen, decide whether it's a pilot or a controller — we check it — then compare with the answer key.`} />
      <WorkbookSamples title={`Workbook model phrases · "What is the message?" (${SAMPLE_MESSAGES_2A.length})`}
        intro="Official examples of the kind of message you'll hear (Aviation English Now). Practise paraphrasing each one."
        items={SAMPLE_MESSAGES_2A} />
      <QuizRunner items={items} />
    </>
  )
}

// ─── 2B · LONG AUDIOS (random quiz) ──────────────────────────────────────────
function LongAudiosSection() {
  const items: QItem[] = LONG_AUDIOS.map((a) => ({
    id: String(a.id), audioUrl: a.audioUrl, speaker: a.speaker, reveal: <LongReveal a={a} />,
  }))
  return (
    <>
      <SectionIntro text="A random quiz of long messages. Listen (you can take notes), decide pilot/controller — we check it — then explain the situation and compare with problem · request · details." />
      <QuizRunner items={items} />
    </>
  )
}

// ─── 2C · INTERACTIVE RESPONSE (random quiz) ─────────────────────────────────
function InteractiveSection() {
  const items: QItem[] = INTERACTIVE_ITEMS.map((it) => ({
    id: String(it.id), audioUrl: it.audioUrl, playLabel: "Play situation", reveal: <InteractiveReveal it={it} />,
  }))
  return (
    <>
      <SectionIntro text="A random quiz of non-routine situations. Listen, ask questions to get more info and give recommendations, then compare with the model." />
      <WorkbookSamples title={`Workbook model scenarios · "Ask questions + advice" (${SAMPLE_SCENARIOS_2C.length})`}
        intro="Official Part 2C-style situations (Aviation English Now)."
        items={SAMPLE_SCENARIOS_2C} />
      <QuizRunner items={items} />
    </>
  )
}

// ─── Sub-componentes compartidos ─────────────────────────────────────────────
const cardBorder = { borderColor: "color-mix(in oklab, var(--border) 70%, transparent)" }
const revealBox = {
  borderColor: "color-mix(in oklab, var(--av-violet-400) 25%, transparent)",
  background: "color-mix(in oklab, var(--av-violet-400) 6%, transparent)",
}

function WorkbookSamples({ title, intro, items }: { title: string; intro: string; items: string[] }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="mb-5 rounded-xl border overflow-hidden"
      style={{ borderColor: "color-mix(in oklab, var(--av-violet-400) 22%, transparent)" }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 p-3.5 text-left"
        style={{ background: "color-mix(in oklab, var(--av-violet-400) 6%, transparent)" }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <BookOpen className="flex-shrink-0 h-4 w-4 text-[var(--av-violet-400)]" />
          <span className="text-[14px] font-bold tracking-[-0.01em] truncate">{title}</span>
        </div>
        <ChevronDown
          className="flex-shrink-0 h-4 w-4 text-muted-foreground transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <div className="p-4 pt-3">
          <p className="text-[13.5px] text-muted-foreground leading-relaxed mb-3">{intro}</p>
          <ol className="space-y-1.5">
            {items.map((s, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[14px] text-foreground/85 leading-relaxed">
                <span
                  className="mono flex-shrink-0 w-6 text-right text-[12.5px] font-bold pt-0.5"
                  style={{ color: "var(--av-violet-400)" }}
                >
                  {i + 1}.
                </span>
                <span>&ldquo;{s}&rdquo;</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

function TabBtn({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="mono px-4 h-9 rounded-full text-[13.5px] font-bold uppercase tracking-[0.06em] border transition-colors"
      style={{
        borderColor: active
          ? "color-mix(in oklab, var(--av-violet-400) 45%, transparent)"
          : "color-mix(in oklab, var(--border) 60%, transparent)",
        background: active ? "color-mix(in oklab, var(--av-violet-400) 16%, transparent)" : "transparent",
        color: active ? "var(--av-violet-400)" : "var(--muted-foreground)",
      }}
    >
      {label}
    </button>
  )
}

function SectionIntro({ text }: { text: string }) {
  return <p className="mb-4 text-[14px] text-foreground/90 leading-relaxed">{text}</p>
}

function SpeakerBadge({ speaker }: { speaker: Speaker }) {
  const isPilot = speaker === "pilot"
  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12.5px] font-bold"
      style={{
        background: isPilot
          ? "color-mix(in oklab, var(--av-cyan-400) 14%, transparent)"
          : "color-mix(in oklab, var(--av-amber-400) 14%, transparent)",
        color: isPilot ? "var(--av-cyan-300)" : "var(--av-amber-400)",
      }}
    >
      {isPilot ? <Plane className="h-3 w-3" /> : <RadioTower className="h-3 w-3" />}
      {isPilot ? "Pilot" : "Controller"}
    </div>
  )
}

function RevealRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <div className="mono text-[12px] font-bold uppercase tracking-[0.14em] mb-1" style={{ color }}>
        {label}
      </div>
      <div className="text-[14px] text-foreground/85 leading-relaxed">{value}</div>
    </div>
  )
}

function Transcript({ text }: { text: string }) {
  return (
    <div className="mt-2.5 pt-2.5 border-t border-border/40">
      <div className="mono text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground mb-1">
        TRANSCRIPT
      </div>
      <p className="text-[13.5px] italic text-muted-foreground leading-relaxed">&ldquo;{text}&rdquo;</p>
    </div>
  )
}
