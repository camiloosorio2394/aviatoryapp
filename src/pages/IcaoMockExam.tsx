import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Square,
  RotateCcw,
  Mic,
  MicOff,
  Clock,
  Radio,
  Headphones,
  Image as ImageIcon,
  Plane,
  RadioTower,
  HelpCircle,
  MessageSquare,
  Check,
  Eye,
  EyeOff,
  Award,
  AlertTriangle,
  Sparkles,
  Loader2,
  History,
  Save,
  CheckCircle2,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { useRecorder } from "@/hooks/useRecorder"
import { useSession } from "@/hooks/useSession"
import {
  buildExam,
  PARTS,
  DESCRIPTORS,
  EXAM_SHAPE,
  fmtTime,
  type ExamStep,
} from "@/lib/icaoMockExam"
import { fetchMockHistory, saveMockResult, type MockResult } from "@/lib/icaoMockResults"

type Phase = "intro" | "running" | "done"

export function IcaoMockExam() {
  const [phase, setPhase] = useState<Phase>("intro")
  const [steps, setSteps] = useState<ExamStep[]>([])
  const [idx, setIdx] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [recordings, setRecordings] = useState<Record<number, string>>({})
  const [wantRecord, setWantRecord] = useState(false)
  const rec = useRecorder()

  // Cronómetro global
  useEffect(() => {
    if (phase !== "running") return
    const t = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(t)
  }, [phase])

  async function start() {
    const plan = buildExam()
    setSteps(plan)
    setIdx(0)
    setElapsed(0)
    setRecordings({})
    if (wantRecord) {
      const ok = await rec.enable()
      if (!ok) setWantRecord(false)
      else rec.startStep()
    }
    setPhase("running")
  }

  async function advance() {
    // Cortar grabación del paso actual y guardarla
    if (wantRecord && rec.active) {
      const url = await rec.stopStep()
      if (url) setRecordings((r) => ({ ...r, [idx]: url }))
    }
    if (idx >= steps.length - 1) {
      rec.disable()
      setPhase("done")
      return
    }
    setIdx((i) => i + 1)
    if (wantRecord && rec.active) rec.startStep()
  }

  if (phase === "intro") {
    return <Intro wantRecord={wantRecord} setWantRecord={setWantRecord} recSupported={rec.supported} onStart={start} />
  }
  if (phase === "done") {
    return <Result steps={steps} elapsed={elapsed} recordings={recordings} recorded={wantRecord} onRestart={() => setPhase("intro")} />
  }

  // running
  const step = steps[idx]
  const part = step.part
  return (
    <AppLayout>
      <div className="px-7 py-6 pb-24 max-w-[920px] mx-auto">
        <RunHeader idx={idx} total={steps.length} part={part} elapsed={elapsed} recording={wantRecord && rec.active} />
        <StepView step={step} />
        <div className="mt-7 flex items-center justify-between">
          <div className="text-[13.5px] text-muted-foreground">
            {idx + 1} of {steps.length}
          </div>
          <button
            onClick={advance}
            className="av-shine inline-flex items-center gap-2 h-12 px-6 rounded-lg text-[15px] font-semibold text-white border-0"
            style={{
              background: "linear-gradient(180deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)",
              boxShadow: "0 1px 0 rgb(255 255 255 / 18%) inset, 0 10px 24px -8px oklch(0.55 0.22 264 / 45%)",
            }}
          >
            {idx >= steps.length - 1 ? "Finish mock exam" : "Next"} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </AppLayout>
  )
}

// ─── INTRO ───────────────────────────────────────────────────────────────────
function Intro({ wantRecord, setWantRecord, recSupported, onStart }: { wantRecord: boolean; setWantRecord: (v: boolean) => void; recSupported: boolean; onStart: () => void }) {
  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[860px] mx-auto">
        <Link to="/app/icao" className="inline-flex items-center gap-1.5 text-[13.5px] text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to ICAO English
        </Link>

        <section
          className="cockpit relative overflow-hidden rounded-3xl border p-9"
          style={{ borderColor: "oklch(0.32 0.04 250 / 0.6)", boxShadow: "var(--shadow-navy), inset 0 1px 0 rgb(255 255 255 / 7%)" }}
        >
          <div className="cockpit-grid absolute inset-0 opacity-60" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(at 80% 0%, oklch(0.78 0.16 215 / 25%) 0%, transparent 50%)" }} />
          <div className="relative">
            <div className="mono inline-flex items-center gap-1.5 text-[12.5px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full"
              style={{ color: "var(--av-amber-400)", background: "color-mix(in oklab, var(--av-amber-400) 12%, transparent)", border: "1px solid color-mix(in oklab, var(--av-amber-400) 30%, transparent)" }}>
              <Award className="h-3 w-3" /> MOCK EXAM · FULL TIMED TEST
            </div>
            <h1 className="mt-4 text-[40px] font-extrabold tracking-[-0.04em] text-white leading-[1.05]">
              TEA Mock Exam
            </h1>
            <p className="mt-3 text-[17px] text-white/88 max-w-[640px] leading-relaxed">
              The full exam, in one go and timed: all 3 parts, in order, with real audios.
              Just like the real exam, <strong className="text-white">answer out loud</strong> and without pauses.
            </p>
          </div>
        </section>

        {/* Estructura */}
        <div className="mt-7 grid gap-3 md:grid-cols-3">
          <PartCard icon={Radio} color="var(--av-blue-500)" title="Part 1 · Interview" detail={`${EXAM_SHAPE.interview} questions about your role`} time="~8 min" />
          <PartCard icon={Headphones} color="var(--av-violet-400)" title="Part 2 · Comprehension" detail={`${EXAM_SHAPE.short} short · ${EXAM_SHAPE.long} long · ${EXAM_SHAPE.interactive} interactive`} time="~12 min" />
          <PartCard icon={ImageIcon} color="var(--av-green-400)" title="Part 3 · Picture + Discussion" detail="1 image pair" time="~10 min" />
        </div>

        {/* Reglas */}
        <div className="mt-5 rounded-xl border p-4 flex items-start gap-3" style={{ borderColor: "color-mix(in oklab, var(--av-amber-400) 25%, transparent)", background: "color-mix(in oklab, var(--av-amber-400) 6%, transparent)" }}>
          <AlertTriangle className="flex-shrink-0 mt-0.5 h-4.5 w-4.5" style={{ color: "var(--av-amber-400)" }} />
          <div className="text-[14px] text-foreground/85 leading-relaxed">
            <strong>Rules:</strong> audios play a maximum of 2 times (1 + 1 replay). You won't see the
            answers until the end. When you finish, you self-assess on the 6 ICAO descriptors — remember your
            final result is your <strong>lowest descriptor</strong>.
          </div>
        </div>

        {/* Historial */}
        <MockHistory />

        {/* Grabación */}
        <button
          onClick={() => recSupported && setWantRecord(!wantRecord)}
          disabled={!recSupported}
          className="mt-4 w-full rounded-xl border p-4 flex items-center gap-3 text-left transition-colors disabled:opacity-50"
          style={{ borderColor: wantRecord ? "color-mix(in oklab, var(--av-cyan-400) 45%, transparent)" : "color-mix(in oklab, var(--border) 65%, transparent)", background: wantRecord ? "color-mix(in oklab, var(--av-cyan-400) 8%, transparent)" : "transparent" }}
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: wantRecord ? "color-mix(in oklab, var(--av-cyan-400) 16%, transparent)" : "color-mix(in oklab, var(--border) 40%, transparent)", color: wantRecord ? "var(--av-cyan-400)" : "var(--muted-foreground)" }}>
            {wantRecord ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </div>
          <div className="flex-1">
            <div className="text-[15px] font-bold tracking-[-0.01em]">
              Record my answers {wantRecord ? "· on" : "· off"}
            </div>
            <div className="text-[13.5px] text-muted-foreground">
              {recSupported
                ? "You record yourself answering and listen back at the end. The recording stays only in your browser, it's not uploaded anywhere."
                : "Your browser doesn't support audio recording."}
            </div>
          </div>
        </button>

        <button
          onClick={onStart}
          className="av-shine mt-6 w-full inline-flex items-center justify-center gap-2 h-14 px-6 rounded-xl text-[16px] font-semibold text-white border-0"
          style={{ background: "linear-gradient(180deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)", boxShadow: "0 1px 0 rgb(255 255 255 / 18%) inset, 0 12px 28px -8px oklch(0.55 0.22 264 / 50%)" }}
        >
          <Sparkles className="h-4.5 w-4.5" /> Start mock exam
        </button>
      </div>
    </AppLayout>
  )
}

function levelColor(lvl: number | null): string {
  if (lvl == null) return "var(--muted-foreground)"
  return lvl >= 5 ? "var(--av-green-400)" : lvl >= 4 ? "var(--av-cyan-400)" : "var(--av-amber-400)"
}

function fmtDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString("en", { day: "2-digit", month: "short" }) +
    " · " + d.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" })
}

function MockHistory() {
  const { user } = useSession()
  const [loading, setLoading] = useState(true)
  const [history, setHistory] = useState<MockResult[]>([])

  useEffect(() => {
    let cancelled = false
    if (!user) { setLoading(false); return }
    ;(async () => {
      const rows = await fetchMockHistory(user.id)
      if (!cancelled) { setHistory(rows); setLoading(false) }
    })()
    return () => { cancelled = true }
  }, [user])

  if (loading) {
    return (
      <div className="mt-4 flex items-center gap-2 text-[13.5px] text-muted-foreground">
        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading your history…
      </div>
    )
  }
  if (history.length === 0) {
    return (
      <div className="mt-4 rounded-xl border border-border/60 bg-muted/20 p-4 text-[14px] text-muted-foreground flex items-center gap-2">
        <History className="h-4 w-4" /> You haven't saved any mock exam yet. Take one and save it to see your progress here.
      </div>
    )
  }

  const levels = history.filter((h) => h.final_level != null).map((h) => h.final_level as number)
  const best = levels.length ? Math.max(...levels) : null
  const last = history[0]?.final_level ?? null

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-3">
        <History className="h-4 w-4 text-[var(--av-cyan-400)]" />
        <h2 className="text-[17px] font-extrabold tracking-[-0.02em]">Your history</h2>
      </div>
      <div className="grid grid-cols-3 gap-2.5 mb-3">
        <Stat label="Mock exams" value={String(history.length)} color="var(--av-cyan-400)" />
        <Stat label="Best level" value={best != null ? `ICAO ${best}` : "—"} color={levelColor(best)} />
        <Stat label="Latest" value={last != null ? `ICAO ${last}` : "—"} color={levelColor(last)} />
      </div>
      <div className="space-y-1.5">
        {history.map((h) => (
          <div key={h.id} className="rounded-lg border bg-card px-3.5 py-2.5 flex items-center gap-3" style={{ borderColor: "color-mix(in oklab, var(--border) 65%, transparent)" }}>
            <div className="mono w-14 flex-shrink-0 text-[16px] font-extrabold" style={{ color: levelColor(h.final_level) }}>
              {h.final_level != null ? `ICAO ${h.final_level}` : "—"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13.5px] font-semibold">{fmtDate(h.taken_at)}</div>
              <div className="mono text-[12.5px] text-muted-foreground">
                {fmtTime(h.duration_seconds)} · {h.total_items} items{h.recorded ? " · recorded" : ""}
              </div>
            </div>
            <div className="hidden sm:flex gap-1">
              {DESCRIPTORS.map((d) => {
                const v = h.scores?.[d.key]
                return (
                  <span key={d.key} title={d.name} className="mono w-5 h-5 rounded flex items-center justify-center text-[12px] font-bold"
                    style={{ background: v ? `color-mix(in oklab, ${levelColor(v)} 16%, transparent)` : "transparent", color: v ? levelColor(v) : "var(--muted-foreground)" }}>
                    {v ?? "·"}
                  </span>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl border p-3 text-center" style={{ borderColor: "color-mix(in oklab, var(--border) 60%, transparent)" }}>
      <div className="text-[19px] font-extrabold tracking-[-0.02em]" style={{ color }}>{value}</div>
      <div className="mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{label}</div>
    </div>
  )
}

function PartCard({ icon: Icon, color, title, detail, time }: { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string; title: string; detail: string; time: string }) {
  return (
    <div className="rounded-xl border p-4" style={{ borderColor: `color-mix(in oklab, ${color} 28%, transparent)` }}>
      <div className="flex items-center justify-between">
        <Icon className="h-4.5 w-4.5" style={{ color }} />
        <span className="mono text-[12px] uppercase tracking-[0.12em] text-muted-foreground">{time}</span>
      </div>
      <div className="mt-2 text-[14.5px] font-bold tracking-[-0.01em]">{title}</div>
      <div className="text-[13px] text-muted-foreground">{detail}</div>
    </div>
  )
}

// ─── RUN HEADER ──────────────────────────────────────────────────────────────
function RunHeader({ idx, total, part, elapsed, recording }: { idx: number; total: number; part: 1 | 2 | 3; elapsed: number; recording: boolean }) {
  const pct = ((idx + 1) / total) * 100
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
        <div className="mono text-[12.5px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--av-cyan-400)" }}>
          {PARTS[part].label}
        </div>
        <div className="flex items-center gap-3">
          {recording && (
            <span className="inline-flex items-center gap-1.5 text-[12.5px] font-bold" style={{ color: "var(--av-red-400)" }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--av-red-400)" }} /> REC
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 mono text-[13.5px] text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> {fmtTime(elapsed)}
          </span>
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-border/50 overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: "var(--av-cyan-400)" }} />
      </div>
    </div>
  )
}

// ─── STEP VIEW ───────────────────────────────────────────────────────────────
function StepView({ step }: { step: ExamStep }) {
  if (step.kind === "interview") {
    return (
      <Card>
        <Kicker icon={Radio} text="Answer out loud — natural, technical and professional" />
        <div className="mt-3 text-[22px] font-bold leading-snug tracking-[-0.01em]">{step.question}</div>
      </Card>
    )
  }
  if (step.kind === "short") {
    return (
      <Card>
        <Kicker icon={Headphones} text="Listen and answer: what was the message? pilot or controller?" />
        <div className="mt-4"><ExamPlayer audioUrl={step.audio.audioUrl} /></div>
        <Prompts items={["What was the message?", "Pilot or controller?"]} />
      </Card>
    )
  }
  if (step.kind === "long") {
    return (
      <Card>
        <Kicker icon={Headphones} text="Long message — take notes and explain the situation in detail" />
        <div className="mt-4"><ExamPlayer audioUrl={step.audio.audioUrl} /></div>
        <Prompts items={["What was the problem?", "What were they requesting / advising?", "All the important details"]} />
      </Card>
    )
  }
  if (step.kind === "interactive") {
    return (
      <Card>
        <Kicker icon={MessageSquare} text="Situation — ask questions, then give recommendations" />
        <div className="mt-4"><ExamPlayer audioUrl={step.item.audioUrl} label="Play situation" /></div>
        <Prompts items={["1) Questions to get more info (~20s)", "2) Recommendations to resolve it"]} />
      </Card>
    )
  }
  // picture
  return (
    <Card>
      <Kicker icon={ImageIcon} text="Describe each image, compare, identify risks, give opinions and discuss" />
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <ExamImage src={step.pair.imageA} alt={step.pair.altA} letter="A" />
        <ExamImage src={step.pair.imageB} alt={step.pair.altB} letter="B" />
      </div>
      <Prompts items={["Describe A and B in detail", "Compare: similarities and differences", "Risks · possible causes · your opinion"]} />
    </Card>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border bg-card p-6" style={{ borderColor: "color-mix(in oklab, var(--border) 70%, transparent)" }}>{children}</div>
}

function Kicker({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-[13.5px] font-semibold" style={{ color: "var(--av-cyan-400)" }}>
      <Icon className="h-4 w-4" /> {text}
    </div>
  )
}

function Prompts({ items }: { items: string[] }) {
  return (
    <div className="mt-4 grid gap-1.5">
      {items.map((t) => (
        <div key={t} className="flex items-center gap-1.5 text-[14px] text-muted-foreground">
          <HelpCircle className="h-3.5 w-3.5" /> {t}
        </div>
      ))}
    </div>
  )
}

function ExamImage({ src, alt, letter }: { src: string; alt: string; letter: string }) {
  return (
    <figure className="rounded-xl border overflow-hidden bg-muted" style={{ borderColor: "color-mix(in oklab, var(--border) 70%, transparent)" }}>
      <div className="relative">
        <div className="absolute top-2 left-2 z-10 mono w-7 h-7 rounded-lg flex items-center justify-center text-[14px] font-extrabold text-white" style={{ background: "oklch(0.2 0.02 250 / 0.75)" }}>{letter}</div>
        <img src={src} alt={alt} className="w-full aspect-[4/3] object-cover" />
      </div>
    </figure>
  )
}

// ─── EXAM PLAYER (2 plays, sin reveal) ───────────────────────────────────────
function ExamPlayer({ audioUrl, label }: { audioUrl: string; label?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [plays, setPlays] = useState(0)
  const [playing, setPlaying] = useState(false)
  const maxPlays = 2
  const canPlay = plays < maxPlays

  useEffect(() => () => { audioRef.current?.pause(); audioRef.current = null }, [])

  function play() {
    if (!canPlay) return
    if (!audioRef.current) {
      const a = new Audio(audioUrl)
      a.preload = "none"
      a.onended = () => setPlaying(false)
      audioRef.current = a
    }
    audioRef.current.currentTime = 0
    audioRef.current.play().then(() => { setPlaying(true); setPlays((p) => p + 1) }).catch(() => setPlaying(false))
  }
  function stop() { audioRef.current?.pause(); if (audioRef.current) audioRef.current.currentTime = 0; setPlaying(false) }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button onClick={playing ? stop : play} disabled={!canPlay && !playing}
        className="inline-flex items-center gap-2 h-11 px-5 rounded-lg text-[15px] font-semibold text-white border-0 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: "linear-gradient(180deg, var(--av-violet-400) 0%, oklch(0.5 0.2 295) 100%)", boxShadow: "0 1px 0 rgb(255 255 255 / 18%) inset, 0 8px 20px -8px oklch(0.5 0.2 295 / 50%)" }}>
        {playing ? <><Square className="h-4 w-4" /> Stop</> : plays === 0 ? <><Play className="h-4 w-4" /> {label ?? "Play"}</> : <><RotateCcw className="h-4 w-4" /> Play again</>}
      </button>
      <div className="mono text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
        {plays}/{maxPlays}{plays >= maxPlays && " · no third"}
      </div>
    </div>
  )
}

// ─── RESULT ──────────────────────────────────────────────────────────────────
function Result({ steps, elapsed, recordings, recorded, onRestart }: { steps: ExamStep[]; elapsed: number; recordings: Record<number, string>; recorded: boolean; onRestart: () => void }) {
  const { user } = useSession()
  const [scores, setScores] = useState<Record<string, number>>({})
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const allRated = DESCRIPTORS.every((d) => scores[d.key])
  const finalLevel = allRated ? Math.min(...DESCRIPTORS.map((d) => scores[d.key])) : null

  async function save() {
    if (!user || !allRated || saveState === "saving" || saveState === "saved") return
    setSaveState("saving")
    const { ok } = await saveMockResult({
      userId: user.id,
      durationSeconds: elapsed,
      totalItems: steps.length,
      scores,
      finalLevel,
      recorded,
    })
    setSaveState(ok ? "saved" : "error")
  }

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-24 max-w-[920px] mx-auto">
        <div className="text-center">
          <div className="mono text-[12px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--av-green-400)" }}>MOCK EXAM COMPLETE</div>
          <h1 className="mt-2 text-[34px] font-extrabold tracking-[-0.03em]">You finished the exam!</h1>
          <div className="mt-2 inline-flex items-center gap-1.5 mono text-[14px] text-muted-foreground">
            <Clock className="h-4 w-4" /> Total time: {fmtTime(elapsed)} · {steps.length} items
          </div>
        </div>

        {/* Autoevaluación */}
        <div className="mt-9">
          <h2 className="text-[20px] font-extrabold tracking-[-0.02em]">Self-assess on the 6 descriptors</h2>
          <p className="mt-1 text-[14px] text-muted-foreground">Be honest: your final result is your lowest descriptor.</p>
          <div className="mt-4 space-y-2.5">
            {DESCRIPTORS.map((d) => (
              <div key={d.key} className="rounded-xl border p-3.5 flex items-center justify-between gap-4" style={{ borderColor: "color-mix(in oklab, var(--border) 65%, transparent)" }}>
                <div className="min-w-0">
                  <div className="text-[15px] font-bold tracking-[-0.01em]">{d.name}</div>
                  <div className="text-[13px] text-muted-foreground">{d.detail}</div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  {[3, 4, 5].map((lvl) => {
                    const active = scores[d.key] === lvl
                    return (
                      <button key={lvl} onClick={() => setScores((s) => ({ ...s, [d.key]: lvl }))}
                        className="mono w-10 h-10 rounded-lg text-[15px] font-extrabold border transition-colors"
                        style={{
                          borderColor: active ? "color-mix(in oklab, var(--av-cyan-400) 55%, transparent)" : "color-mix(in oklab, var(--border) 60%, transparent)",
                          background: active ? "color-mix(in oklab, var(--av-cyan-400) 18%, transparent)" : "transparent",
                          color: active ? "var(--av-cyan-300)" : "var(--muted-foreground)",
                        }}>
                        {lvl}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {finalLevel != null && (
            <div className="mt-4 rounded-2xl border p-5 text-center" style={{ borderColor: `color-mix(in oklab, ${finalLevel >= 5 ? "var(--av-green-400)" : finalLevel >= 4 ? "var(--av-cyan-400)" : "var(--av-amber-400)"} 40%, transparent)`, background: `color-mix(in oklab, ${finalLevel >= 5 ? "var(--av-green-400)" : finalLevel >= 4 ? "var(--av-cyan-400)" : "var(--av-amber-400)"} 8%, transparent)` }}>
              <div className="mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground">YOUR ESTIMATED LEVEL (= lowest descriptor)</div>
              <div className="mt-1 text-[44px] font-extrabold tracking-[-0.04em]" style={{ color: finalLevel >= 5 ? "var(--av-green-400)" : finalLevel >= 4 ? "var(--av-cyan-400)" : "var(--av-amber-400)" }}>
                ICAO {finalLevel}
              </div>
              <div className="text-[14px] text-muted-foreground">{finalLevel >= 5 ? "Extended — airline level" : finalLevel >= 4 ? "Operational — international legal minimum" : "Pre-operational — keep practising"}</div>

              {/* Guardar */}
              {saveState === "saved" ? (
                <div className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold" style={{ color: "var(--av-green-400)" }}>
                  <CheckCircle2 className="h-4 w-4" /> Saved to your history
                </div>
              ) : (
                <button
                  onClick={save}
                  disabled={!user || saveState === "saving"}
                  className="mt-4 inline-flex items-center gap-2 h-11 px-5 rounded-lg text-[14.5px] font-semibold text-white border-0 disabled:opacity-50"
                  style={{ background: "linear-gradient(180deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)", boxShadow: "0 1px 0 rgb(255 255 255 / 18%) inset, 0 8px 20px -8px oklch(0.55 0.22 264 / 45%)" }}
                >
                  {saveState === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save result
                </button>
              )}
              {saveState === "error" && (
                <div className="mt-2 text-[13.5px] text-[var(--av-red-400)]">Couldn't save. Try again.</div>
              )}
              {!user && (
                <div className="mt-2 text-[13px] text-muted-foreground">Sign in to save your result.</div>
              )}
            </div>
          )}
        </div>

        {/* Review */}
        <div className="mt-10">
          <h2 className="text-[20px] font-extrabold tracking-[-0.02em]">Review — what came up and the answers</h2>
          <p className="mt-1 text-[14px] text-muted-foreground">Listen again, read the transcripts and, if you recorded, listen to yourself.</p>
          <div className="mt-4 space-y-2">
            {steps.map((s, i) => (
              <ReviewItem key={i} step={s} n={i + 1} recordingUrl={recordings[i]} />
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <button onClick={onRestart} className="av-shine inline-flex items-center gap-2 h-12 px-6 rounded-lg text-[15px] font-semibold text-white border-0"
            style={{ background: "linear-gradient(180deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)", boxShadow: "0 1px 0 rgb(255 255 255 / 18%) inset, 0 10px 24px -8px oklch(0.55 0.22 264 / 45%)" }}>
            <RotateCcw className="h-4 w-4" /> Another mock exam
          </button>
          <Link to="/app/icao" className="inline-flex items-center gap-1.5 h-12 px-6 rounded-lg text-[15px] font-semibold border border-border bg-card hover:bg-muted transition-colors">
            Back to the module
          </Link>
        </div>
      </div>
    </AppLayout>
  )
}

function ReviewItem({ step, n, recordingUrl }: { step: ExamStep; n: number; recordingUrl?: string }) {
  const [open, setOpen] = useState(false)
  const meta = reviewMeta(step)
  return (
    <div className="rounded-xl border bg-card overflow-hidden" style={{ borderColor: open ? "color-mix(in oklab, var(--av-cyan-400) 30%, transparent)" : "color-mix(in oklab, var(--border) 65%, transparent)" }}>
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center gap-3 p-3.5 text-left">
        <span className="mono flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-[12.5px] font-bold" style={{ background: "color-mix(in oklab, var(--av-cyan-400) 12%, transparent)", color: "var(--av-cyan-300)" }}>{n}</span>
        <span className="mono text-[11px] font-bold uppercase tracking-[0.12em] flex-shrink-0 px-1.5 py-0.5 rounded" style={{ background: "color-mix(in oklab, var(--border) 40%, transparent)", color: "var(--muted-foreground)" }}>{meta.tag}</span>
        <span className="flex-1 text-[14px] font-semibold truncate">{meta.title}</span>
        {open ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
      </button>
      {open && (
        <div className="px-3.5 pb-3.5 space-y-3">
          {recordingUrl && (
            <div>
              <div className="mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--av-cyan-400)] mb-1">YOUR ANSWER</div>
              <audio controls src={recordingUrl} className="w-full h-9" />
            </div>
          )}
          <ReviewBody step={step} />
        </div>
      )}
    </div>
  )
}

function reviewMeta(step: ExamStep): { tag: string; title: string } {
  switch (step.kind) {
    case "interview": return { tag: "P1", title: step.question }
    case "short": return { tag: "2A", title: step.audio.transcript ?? step.audio.label }
    case "long": return { tag: "2B", title: step.audio.title }
    case "interactive": return { tag: "2C", title: step.item.transcript ?? step.item.label }
    case "picture": return { tag: "P3", title: step.pair.themeEn }
  }
}

function ReviewBody({ step }: { step: ExamStep }) {
  const box = { borderColor: "color-mix(in oklab, var(--av-cyan-400) 22%, transparent)", background: "color-mix(in oklab, var(--av-cyan-400) 6%, transparent)" }
  if (step.kind === "interview") {
    return (
      <div className="rounded-lg border p-3" style={box}>
        <div className="mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--av-cyan-400)] mb-1">MODEL ANSWER</div>
        <p className="text-[14px] text-foreground/90 leading-relaxed">{step.suggestedAnswer}</p>
        {step.highRegisterWords && step.highRegisterWords.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {step.highRegisterWords.map((w) => (
              <span key={w} className="px-2 py-0.5 rounded-md text-[12.5px] font-semibold" style={{ background: "color-mix(in oklab, var(--av-amber-400) 14%, transparent)", color: "var(--av-amber-400)" }}>{w}</span>
            ))}
          </div>
        )}
      </div>
    )
  }
  if (step.kind === "short") {
    return (
      <div className="rounded-lg border p-3 space-y-1.5" style={box}>
        {step.audio.speaker && <Badge speaker={step.audio.speaker} />}
        
        {step.audio.transcript && <p className="text-[13.5px] italic text-muted-foreground">&ldquo;{step.audio.transcript}&rdquo;</p>}
      </div>
    )
  }
  if (step.kind === "long") {
    return (
      <div className="rounded-lg border p-3 space-y-1.5" style={box}>
        {step.audio.speaker && <Badge speaker={step.audio.speaker} />}
        {step.audio.summary && <p className="text-[14px] text-foreground/90">{step.audio.summary}</p>}
        {step.audio.problem && <p className="text-[14px] text-foreground/90"><strong>Problem:</strong> {step.audio.problem}</p>}
        {step.audio.request && <p className="text-[14px] text-foreground/90"><strong>Requested:</strong> {step.audio.request}</p>}
        {step.audio.transcript && <p className="text-[13.5px] italic text-muted-foreground">&ldquo;{step.audio.transcript}&rdquo;</p>}
      </div>
    )
  }
  if (step.kind === "interactive") {
    return (
      <div className="rounded-lg border p-3 space-y-2" style={box}>
        {step.item.transcript && <p className="text-[14px] italic text-foreground/90">&ldquo;{step.item.transcript}&rdquo;</p>}
        {step.item.questions && <div><div className="mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--av-cyan-400)] mb-1">QUESTIONS</div><ul className="space-y-0.5">{step.item.questions.map((q) => <li key={q} className="text-[13.5px] italic text-foreground/90">&ldquo;{q}&rdquo;</li>)}</ul></div>}
        {step.item.advice && <div><div className="mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--av-green-400)] mb-1">RECOMMENDATIONS</div><ul className="space-y-0.5">{step.item.advice.map((a) => <li key={a} className="flex items-start gap-1.5 text-[13.5px] text-foreground/90"><Check className="flex-shrink-0 mt-0.5 h-3 w-3 text-[var(--av-green-400)]" strokeWidth={3} />{a}</li>)}</ul></div>}
      </div>
    )
  }
  // picture
  return (
    <div className="rounded-lg border p-3" style={box}>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <img src={step.pair.imageA} alt={step.pair.altA} className="w-full aspect-[4/3] object-cover rounded-md" />
        <img src={step.pair.imageB} alt={step.pair.altB} className="w-full aspect-[4/3] object-cover rounded-md" />
      </div>
      <div className="mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--av-green-400)] mb-1">DISCUSSION</div>
      <ul className="space-y-0.5">{step.pair.discussion.map((q) => <li key={q} className="text-[13.5px] text-foreground/90">{q}</li>)}</ul>
    </div>
  )
}

function Badge({ speaker }: { speaker: "pilot" | "controller" }) {
  const isPilot = speaker === "pilot"
  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[12px] font-bold" style={{ background: isPilot ? "color-mix(in oklab, var(--av-cyan-400) 14%, transparent)" : "color-mix(in oklab, var(--av-amber-400) 14%, transparent)", color: isPilot ? "var(--av-cyan-300)" : "var(--av-amber-400)" }}>
      {isPilot ? <Plane className="h-2.5 w-2.5" /> : <RadioTower className="h-2.5 w-2.5" />}
      {isPilot ? "Pilot" : "Controller"}
    </div>
  )
}
