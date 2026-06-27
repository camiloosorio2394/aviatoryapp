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
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { useRecorder } from "@/hooks/useRecorder"
import {
  buildExam,
  PARTS,
  DESCRIPTORS,
  EXAM_SHAPE,
  fmtTime,
  type ExamStep,
} from "@/lib/icaoMockExam"

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
    return <Result steps={steps} elapsed={elapsed} recordings={recordings} onRestart={() => setPhase("intro")} />
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
          <div className="text-[12px] text-muted-foreground">
            {idx + 1} de {steps.length}
          </div>
          <button
            onClick={advance}
            className="av-shine inline-flex items-center gap-2 h-12 px-6 rounded-lg text-[14px] font-semibold text-white border-0"
            style={{
              background: "linear-gradient(180deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)",
              boxShadow: "0 1px 0 rgb(255 255 255 / 18%) inset, 0 10px 24px -8px oklch(0.55 0.22 264 / 45%)",
            }}
          >
            {idx >= steps.length - 1 ? "Terminar simulacro" : "Siguiente"} <ArrowRight className="h-4 w-4" />
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
        <Link to="/app/icao" className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="h-3.5 w-3.5" /> Volver al módulo Inglés ICAO
        </Link>

        <section
          className="cockpit relative overflow-hidden rounded-3xl border p-9"
          style={{ borderColor: "oklch(0.32 0.04 250 / 0.6)", boxShadow: "var(--shadow-navy), inset 0 1px 0 rgb(255 255 255 / 7%)" }}
        >
          <div className="cockpit-grid absolute inset-0 opacity-60" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(at 80% 0%, oklch(0.78 0.16 215 / 25%) 0%, transparent 50%)" }} />
          <div className="relative">
            <div className="mono inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full"
              style={{ color: "var(--av-amber-400)", background: "color-mix(in oklab, var(--av-amber-400) 12%, transparent)", border: "1px solid color-mix(in oklab, var(--av-amber-400) 30%, transparent)" }}>
              <Award className="h-3 w-3" /> SIMULACRO · EXAMEN COMPLETO CRONOMETRADO
            </div>
            <h1 className="mt-4 text-[40px] font-extrabold tracking-[-0.04em] text-white leading-[1.05]">
              Simulacro TEA
            </h1>
            <p className="mt-3 text-[16px] text-white/75 max-w-[640px] leading-relaxed">
              El examen completo, de corrido y cronometrado: las 3 partes, en orden, con audios reales.
              Como en el examen real, <strong className="text-white">respondé en voz alta</strong> y sin pausas.
            </p>
          </div>
        </section>

        {/* Estructura */}
        <div className="mt-7 grid gap-3 md:grid-cols-3">
          <PartCard icon={Radio} color="var(--av-blue-500)" title="Part 1 · Interview" detail={`${EXAM_SHAPE.interview} preguntas sobre tu rol`} time="~8 min" />
          <PartCard icon={Headphones} color="var(--av-violet-400)" title="Part 2 · Comprehension" detail={`${EXAM_SHAPE.short} short · ${EXAM_SHAPE.long} long · ${EXAM_SHAPE.interactive} interactive`} time="~12 min" />
          <PartCard icon={ImageIcon} color="var(--av-green-400)" title="Part 3 · Picture + Discussion" detail="1 pareja de imágenes" time="~10 min" />
        </div>

        {/* Reglas */}
        <div className="mt-5 rounded-xl border p-4 flex items-start gap-3" style={{ borderColor: "color-mix(in oklab, var(--av-amber-400) 25%, transparent)", background: "color-mix(in oklab, var(--av-amber-400) 6%, transparent)" }}>
          <AlertTriangle className="flex-shrink-0 mt-0.5 h-4.5 w-4.5" style={{ color: "var(--av-amber-400)" }} />
          <div className="text-[12.5px] text-foreground/85 leading-relaxed">
            <strong>Reglas:</strong> los audios se reproducen máximo 2 veces (1 + 1 repetición). No vas a ver las
            respuestas hasta el final. Al terminar te autoevaluás en los 6 descriptores ICAO — recordá que tu nota
            final es la del <strong>descriptor más bajo</strong>.
          </div>
        </div>

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
            <div className="text-[14px] font-bold tracking-[-0.01em]">
              Grabar mis respuestas {wantRecord ? "· activado" : "· desactivado"}
            </div>
            <div className="text-[12px] text-muted-foreground">
              {recSupported
                ? "Te grabás respondiendo y te escuchás al final. La grabación queda solo en tu navegador, no se sube a ningún lado."
                : "Tu navegador no soporta grabación de audio."}
            </div>
          </div>
        </button>

        <button
          onClick={onStart}
          className="av-shine mt-6 w-full inline-flex items-center justify-center gap-2 h-14 px-6 rounded-xl text-[15px] font-semibold text-white border-0"
          style={{ background: "linear-gradient(180deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)", boxShadow: "0 1px 0 rgb(255 255 255 / 18%) inset, 0 12px 28px -8px oklch(0.55 0.22 264 / 50%)" }}
        >
          <Sparkles className="h-4.5 w-4.5" /> Empezar simulacro
        </button>
      </div>
    </AppLayout>
  )
}

function PartCard({ icon: Icon, color, title, detail, time }: { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string; title: string; detail: string; time: string }) {
  return (
    <div className="rounded-xl border p-4" style={{ borderColor: `color-mix(in oklab, ${color} 28%, transparent)` }}>
      <div className="flex items-center justify-between">
        <Icon className="h-4.5 w-4.5" style={{ color }} />
        <span className="mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{time}</span>
      </div>
      <div className="mt-2 text-[13.5px] font-bold tracking-[-0.01em]">{title}</div>
      <div className="text-[11.5px] text-muted-foreground">{detail}</div>
    </div>
  )
}

// ─── RUN HEADER ──────────────────────────────────────────────────────────────
function RunHeader({ idx, total, part, elapsed, recording }: { idx: number; total: number; part: 1 | 2 | 3; elapsed: number; recording: boolean }) {
  const pct = ((idx + 1) / total) * 100
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
        <div className="mono text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--av-cyan-400)" }}>
          {PARTS[part].label}
        </div>
        <div className="flex items-center gap-3">
          {recording && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold" style={{ color: "var(--av-red-400)" }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--av-red-400)" }} /> REC
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 mono text-[12px] text-muted-foreground">
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
        <Kicker icon={Radio} text="Respondé en voz alta — natural, técnico y profesional" />
        <div className="mt-3 text-[22px] font-bold leading-snug tracking-[-0.01em]">{step.question}</div>
      </Card>
    )
  }
  if (step.kind === "short") {
    return (
      <Card>
        <Kicker icon={Headphones} text="Escuchá y respondé: ¿cuál era el mensaje? ¿pilot o controller?" />
        <div className="mt-4"><ExamPlayer audioUrl={step.audio.audioUrl} /></div>
        <Prompts items={["What was the message?", "Pilot or controller?"]} />
      </Card>
    )
  }
  if (step.kind === "long") {
    return (
      <Card>
        <Kicker icon={Headphones} text="Mensaje largo — tomá notas y explicá la situación con detalle" />
        <div className="mt-4"><ExamPlayer audioUrl={step.audio.audioUrl} /></div>
        <Prompts items={["¿Cuál era el problema?", "¿Qué pedía / avisaba?", "Todos los detalles importantes"]} />
      </Card>
    )
  }
  if (step.kind === "interactive") {
    return (
      <Card>
        <Kicker icon={MessageSquare} text="Situación — formulá preguntas y luego dá recomendaciones" />
        <div className="mt-4"><ExamPlayer audioUrl={step.item.audioUrl} label="Escuchar situación" /></div>
        <Prompts items={["1) Preguntas para obtener más info (~20s)", "2) Recomendaciones para resolver"]} />
      </Card>
    )
  }
  // picture
  return (
    <Card>
      <Kicker icon={ImageIcon} text="Describí cada imagen, compará, identificá riesgos, opiná y conversá" />
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <ExamImage src={step.pair.imageA} alt={step.pair.altA} letter="A" />
        <ExamImage src={step.pair.imageB} alt={step.pair.altB} letter="B" />
      </div>
      <Prompts items={["Describí A y B en detalle", "Compará: similitudes y diferencias", "Riesgos · posibles causas · tu opinión"]} />
    </Card>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border bg-card p-6" style={{ borderColor: "color-mix(in oklab, var(--border) 70%, transparent)" }}>{children}</div>
}

function Kicker({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-[12px] font-semibold" style={{ color: "var(--av-cyan-400)" }}>
      <Icon className="h-4 w-4" /> {text}
    </div>
  )
}

function Prompts({ items }: { items: string[] }) {
  return (
    <div className="mt-4 grid gap-1.5">
      {items.map((t) => (
        <div key={t} className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
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
        <div className="absolute top-2 left-2 z-10 mono w-7 h-7 rounded-lg flex items-center justify-center text-[13px] font-extrabold text-white" style={{ background: "oklch(0.2 0.02 250 / 0.75)" }}>{letter}</div>
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
        className="inline-flex items-center gap-2 h-11 px-5 rounded-lg text-[14px] font-semibold text-white border-0 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: "linear-gradient(180deg, var(--av-violet-400) 0%, oklch(0.5 0.2 295) 100%)", boxShadow: "0 1px 0 rgb(255 255 255 / 18%) inset, 0 8px 20px -8px oklch(0.5 0.2 295 / 50%)" }}>
        {playing ? <><Square className="h-4 w-4" /> Detener</> : plays === 0 ? <><Play className="h-4 w-4" /> {label ?? "Reproducir"}</> : <><RotateCcw className="h-4 w-4" /> Escuchar otra vez</>}
      </button>
      <div className="mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
        {plays}/{maxPlays}{plays >= maxPlays && " · sin tercera"}
      </div>
    </div>
  )
}

// ─── RESULT ──────────────────────────────────────────────────────────────────
function Result({ steps, elapsed, recordings, onRestart }: { steps: ExamStep[]; elapsed: number; recordings: Record<number, string>; onRestart: () => void }) {
  const [scores, setScores] = useState<Record<string, number>>({})
  const allRated = DESCRIPTORS.every((d) => scores[d.key])
  const finalLevel = allRated ? Math.min(...DESCRIPTORS.map((d) => scores[d.key])) : null

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-24 max-w-[920px] mx-auto">
        <div className="text-center">
          <div className="mono text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--av-green-400)" }}>SIMULACRO COMPLETADO</div>
          <h1 className="mt-2 text-[34px] font-extrabold tracking-[-0.03em]">¡Terminaste el examen!</h1>
          <div className="mt-2 inline-flex items-center gap-1.5 mono text-[13px] text-muted-foreground">
            <Clock className="h-4 w-4" /> Tiempo total: {fmtTime(elapsed)} · {steps.length} ítems
          </div>
        </div>

        {/* Autoevaluación */}
        <div className="mt-9">
          <h2 className="text-[20px] font-extrabold tracking-[-0.02em]">Autoevaluate en los 6 descriptores</h2>
          <p className="mt-1 text-[13px] text-muted-foreground">Sé honesto: tu nota final es la del descriptor más bajo.</p>
          <div className="mt-4 space-y-2.5">
            {DESCRIPTORS.map((d) => (
              <div key={d.key} className="rounded-xl border p-3.5 flex items-center justify-between gap-4" style={{ borderColor: "color-mix(in oklab, var(--border) 65%, transparent)" }}>
                <div className="min-w-0">
                  <div className="text-[14px] font-bold tracking-[-0.01em]">{d.name}</div>
                  <div className="text-[11.5px] text-muted-foreground">{d.detail}</div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  {[3, 4, 5].map((lvl) => {
                    const active = scores[d.key] === lvl
                    return (
                      <button key={lvl} onClick={() => setScores((s) => ({ ...s, [d.key]: lvl }))}
                        className="mono w-10 h-10 rounded-lg text-[14px] font-extrabold border transition-colors"
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
              <div className="mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">TU NIVEL ESTIMADO (= descriptor más bajo)</div>
              <div className="mt-1 text-[44px] font-extrabold tracking-[-0.04em]" style={{ color: finalLevel >= 5 ? "var(--av-green-400)" : finalLevel >= 4 ? "var(--av-cyan-400)" : "var(--av-amber-400)" }}>
                ICAO {finalLevel}
              </div>
              <div className="text-[12.5px] text-muted-foreground">{finalLevel >= 5 ? "Extended — nivel para aerolínea" : finalLevel >= 4 ? "Operational — mínimo legal internacional" : "Pre-operational — a seguir practicando"}</div>
            </div>
          )}
        </div>

        {/* Review */}
        <div className="mt-10">
          <h2 className="text-[20px] font-extrabold tracking-[-0.02em]">Revisión — qué apareció y las respuestas</h2>
          <p className="mt-1 text-[13px] text-muted-foreground">Volvé a escuchar, leé los transcripts y, si grabaste, escuchate.</p>
          <div className="mt-4 space-y-2">
            {steps.map((s, i) => (
              <ReviewItem key={i} step={s} n={i + 1} recordingUrl={recordings[i]} />
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <button onClick={onRestart} className="av-shine inline-flex items-center gap-2 h-12 px-6 rounded-lg text-[14px] font-semibold text-white border-0"
            style={{ background: "linear-gradient(180deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)", boxShadow: "0 1px 0 rgb(255 255 255 / 18%) inset, 0 10px 24px -8px oklch(0.55 0.22 264 / 45%)" }}>
            <RotateCcw className="h-4 w-4" /> Otro simulacro
          </button>
          <Link to="/app/icao" className="inline-flex items-center gap-1.5 h-12 px-6 rounded-lg text-[14px] font-semibold border border-border bg-card hover:bg-muted transition-colors">
            Volver al módulo
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
        <span className="mono flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-[11px] font-bold" style={{ background: "color-mix(in oklab, var(--av-cyan-400) 12%, transparent)", color: "var(--av-cyan-300)" }}>{n}</span>
        <span className="mono text-[9px] font-bold uppercase tracking-[0.12em] flex-shrink-0 px-1.5 py-0.5 rounded" style={{ background: "color-mix(in oklab, var(--border) 40%, transparent)", color: "var(--muted-foreground)" }}>{meta.tag}</span>
        <span className="flex-1 text-[13px] font-semibold truncate">{meta.title}</span>
        {open ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
      </button>
      {open && (
        <div className="px-3.5 pb-3.5 space-y-3">
          {recordingUrl && (
            <div>
              <div className="mono text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--av-cyan-400)] mb-1">TU RESPUESTA</div>
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
    case "short": return { tag: "2A", title: step.audio.messageSummary ?? step.audio.label }
    case "long": return { tag: "2B", title: step.audio.title }
    case "interactive": return { tag: "2C", title: step.item.transcript ?? step.item.label }
    case "picture": return { tag: "P3", title: step.pair.theme }
  }
}

function ReviewBody({ step }: { step: ExamStep }) {
  const box = { borderColor: "color-mix(in oklab, var(--av-cyan-400) 22%, transparent)", background: "color-mix(in oklab, var(--av-cyan-400) 6%, transparent)" }
  if (step.kind === "interview") {
    return (
      <div className="rounded-lg border p-3" style={box}>
        <div className="mono text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--av-cyan-400)] mb-1">RESPUESTA MODELO</div>
        <p className="text-[12.5px] text-foreground/90 leading-relaxed">{step.suggestedAnswer}</p>
        {step.highRegisterWords && step.highRegisterWords.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {step.highRegisterWords.map((w) => (
              <span key={w} className="px-2 py-0.5 rounded-md text-[11px] font-semibold" style={{ background: "color-mix(in oklab, var(--av-amber-400) 14%, transparent)", color: "var(--av-amber-400)" }}>{w}</span>
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
        {step.audio.messageSummary && <p className="text-[12.5px] text-foreground/90">{step.audio.messageSummary}</p>}
        {step.audio.transcript && <p className="text-[12px] italic text-muted-foreground">&ldquo;{step.audio.transcript}&rdquo;</p>}
      </div>
    )
  }
  if (step.kind === "long") {
    return (
      <div className="rounded-lg border p-3 space-y-1.5" style={box}>
        {step.audio.speaker && <Badge speaker={step.audio.speaker} />}
        {step.audio.summary && <p className="text-[12.5px] text-foreground/90">{step.audio.summary}</p>}
        {step.audio.problem && <p className="text-[12.5px] text-foreground/90"><strong>Problema:</strong> {step.audio.problem}</p>}
        {step.audio.request && <p className="text-[12.5px] text-foreground/90"><strong>Pedía:</strong> {step.audio.request}</p>}
        {step.audio.transcript && <p className="text-[12px] italic text-muted-foreground">&ldquo;{step.audio.transcript}&rdquo;</p>}
      </div>
    )
  }
  if (step.kind === "interactive") {
    return (
      <div className="rounded-lg border p-3 space-y-2" style={box}>
        {step.item.transcript && <p className="text-[12.5px] italic text-foreground/90">&ldquo;{step.item.transcript}&rdquo;</p>}
        {step.item.questions && <div><div className="mono text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--av-cyan-400)] mb-1">PREGUNTAS</div><ul className="space-y-0.5">{step.item.questions.map((q) => <li key={q} className="text-[12px] italic text-foreground/80">&ldquo;{q}&rdquo;</li>)}</ul></div>}
        {step.item.advice && <div><div className="mono text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--av-green-400)] mb-1">RECOMENDACIONES</div><ul className="space-y-0.5">{step.item.advice.map((a) => <li key={a} className="flex items-start gap-1.5 text-[12px] text-foreground/80"><Check className="flex-shrink-0 mt-0.5 h-3 w-3 text-[var(--av-green-400)]" strokeWidth={3} />{a}</li>)}</ul></div>}
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
      <div className="mono text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--av-green-400)] mb-1">DISCUSSION</div>
      <ul className="space-y-0.5">{step.pair.discussion.map((q) => <li key={q} className="text-[12px] text-foreground/80">{q}</li>)}</ul>
    </div>
  )
}

function Badge({ speaker }: { speaker: "pilot" | "controller" }) {
  const isPilot = speaker === "pilot"
  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: isPilot ? "color-mix(in oklab, var(--av-cyan-400) 14%, transparent)" : "color-mix(in oklab, var(--av-amber-400) 14%, transparent)", color: isPilot ? "var(--av-cyan-300)" : "var(--av-amber-400)" }}>
      {isPilot ? <Plane className="h-2.5 w-2.5" /> : <RadioTower className="h-2.5 w-2.5" />}
      {isPilot ? "Pilot" : "Controller"}
    </div>
  )
}
