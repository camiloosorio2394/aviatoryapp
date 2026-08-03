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
import { registrarEstudioDiario } from "@/lib/activity"
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

/**
 * El material del examen vive en @/lib/icaoMockExam y está en inglés (es el
 * examen). Estos dos mapas traducen solo el CHROME que ese archivo expone:
 * el nombre de cada parte y la explicación de cada descriptor. Si el material
 * cambiara, cae de vuelta al texto original en lugar de romperse.
 */
const PART_LABEL_ES: Record<string, string> = {
  "Part 1 · Interview": "Parte 1 · Interview",
  "Part 2 · Interactive Comprehension": "Parte 2 · Interactive Comprehension",
  "Part 3 · Picture Description & Discussion": "Parte 3 · Picture Description & Discussion",
}

const DESCRIPTOR_ES: Record<string, { name: string; detail: string }> = {
  pronunciation: { name: "Pronunciation", detail: "Que se te entienda con claridad y sin esfuerzo." },
  structure: { name: "Structure", detail: "Gramática y construcción de las oraciones." },
  vocabulary: { name: "Vocabulary", detail: "Amplitud y precisión del vocabulario." },
  fluency: { name: "Fluency", detail: "Hablar de corrido y natural, con pocas pausas." },
  comprehension: { name: "Comprehension", detail: "Entender los mensajes, incluso los inesperados." },
  interactions: { name: "Interactions", detail: "Sostener la conversación y pedir aclaraciones." },
}

function descriptorEs(key: string, fallbackName: string, fallbackDetail = ""): { name: string; detail: string } {
  return DESCRIPTOR_ES[key] ?? { name: fallbackName, detail: fallbackDetail }
}

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
    void registrarEstudioDiario("icao-simulacro")
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
        <StepView step={step} onSkip={advance} />
        <div className="mt-7 flex items-center justify-between">
          <div className="text-[13px] text-muted-foreground">
            {idx + 1} de {steps.length}
          </div>
          <button
            onClick={advance}
            className="inline-flex items-center gap-2 h-12 px-6 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--av-blue-500)" }}
          >
            {idx >= steps.length - 1 ? "Terminar el simulacro" : "Siguiente"} <ArrowRight className="h-4 w-4" />
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
      <div className="px-7 py-9 sm:py-11 pb-20 max-w-[860px] mx-auto">
        <Link to="/app/icao" className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a Inglés ICAO
        </Link>

        <section className="relative overflow-hidden rounded-2xl surface p-7 sm:p-8">
          <div className="relative">
            <span className="chip chip-amber">
              <Award className="h-3 w-3" /> Simulacro · examen completo cronometrado
            </span>
            <h1 className="mt-4 text-[32px] sm:text-[32px] font-semibold tracking-[-0.03em] leading-[1.05]">
              Simulacro TEA
            </h1>
            <p className="mt-3 text-[17px] text-muted-foreground max-w-[640px] leading-relaxed">
              El examen completo, seguido y cronometrado: las 3 partes en orden, con audios reales.
              Igual que en el examen real,{" "}
              <strong className="text-foreground">responde en voz alta</strong> y sin pausas.
            </p>
          </div>
        </section>

        {/* Estructura */}
        <div className="mt-7 grid gap-3 md:grid-cols-3">
          <PartCard icon={Radio} color="var(--av-blue-500)" title="Parte 1 · Interview" detail={`${EXAM_SHAPE.interview} preguntas sobre tu rol`} time="~8 min" />
          <PartCard icon={Headphones} color="var(--av-violet-400)" title="Parte 2 · Comprensión" detail={`${EXAM_SHAPE.short} cortos · ${EXAM_SHAPE.long} largos · ${EXAM_SHAPE.interactive} interactivos`} time="~12 min" />
          <PartCard icon={ImageIcon} color="var(--av-green-400)" title="Parte 3 · Imágenes y conversación" detail="1 par de imágenes" time="~10 min" />
        </div>

        {/* Reglas */}
        <div className="mt-5 rounded-2xl border p-4 flex items-start gap-3" style={{ borderColor: "color-mix(in oklab, var(--av-amber-400) 25%, transparent)", background: "color-mix(in oklab, var(--av-amber-400) 6%, transparent)" }}>
          <AlertTriangle className="flex-shrink-0 mt-0.5 h-4.5 w-4.5" style={{ color: "var(--av-amber-400)" }} />
          <div className="text-[13px] text-foreground/85 leading-relaxed">
            <strong>Reglas:</strong> los audios suenan máximo 2 veces (1 más 1 repetición). No vas a
            ver las respuestas hasta el final. Al terminar te autoevalúas en los 6 descriptores ICAO.
            Recuerda que tu resultado final es tu <strong>descriptor más bajo</strong>.
          </div>
        </div>

        {/* Historial */}
        <MockHistory />

        {/* Grabación */}
        <button
          onClick={() => recSupported && setWantRecord(!wantRecord)}
          disabled={!recSupported}
          className="mt-4 w-full rounded-2xl border p-4 flex items-center gap-3 text-left transition-colors disabled:opacity-50"
          style={{ borderColor: wantRecord ? "color-mix(in oklab, var(--av-blue-500) 45%, transparent)" : "color-mix(in oklab, var(--border) 65%, transparent)", background: wantRecord ? "color-mix(in oklab, var(--av-blue-500) 8%, transparent)" : "transparent" }}
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: wantRecord ? "color-mix(in oklab, var(--av-blue-500) 16%, transparent)" : "color-mix(in oklab, var(--border) 40%, transparent)", color: wantRecord ? "var(--av-blue-500)" : "var(--muted-foreground)" }}>
            {wantRecord ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </div>
          <div className="flex-1">
            <div className="text-[15px] font-semibold tracking-[-0.01em]">
              Grabar mis respuestas {wantRecord ? "· activado" : "· desactivado"}
            </div>
            <div className="text-[13px] text-muted-foreground">
              {recSupported
                ? "Te grabas mientras respondes y te escuchas al final. La grabación queda solo en tu navegador, no se sube a ningún lado."
                : "Tu navegador no permite grabar audio."}
            </div>
          </div>
        </button>

        <button
          onClick={onStart}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 h-14 px-6 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
          style={{ background: "var(--av-blue-500)" }}
        >
          <Sparkles className="h-4.5 w-4.5" /> Empezar el simulacro
        </button>
      </div>
    </AppLayout>
  )
}

/** Tinte de fondo: los tokens *-400 son claros a propósito, sirven para fondos. */
function levelTint(lvl: number): string {
  return lvl >= 5 ? "var(--av-green-400)" : lvl >= 4 ? "var(--av-blue-500)" : "var(--av-amber-400)"
}

/** Color de TEXTO: los *-400 no se leen sobre bg-card en modo claro, así que el
    verde y el ámbar van por sus tokens semánticos de texto. */
function levelText(lvl: number | null): string {
  if (lvl == null) return "var(--muted-foreground)"
  return lvl >= 5 ? "var(--av-success-fg)" : lvl >= 4 ? "var(--av-blue-500)" : "var(--av-warn-fg)"
}

function fmtDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString("es", { day: "2-digit", month: "short" }) +
    " · " + d.toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" })
}

function MockHistory() {
  const { user } = useSession()
  const [loading, setLoading] = useState(true)
  const [history, setHistory] = useState<MockResult[]>([])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (!user) { if (!cancelled) setLoading(false); return }
      const rows = await fetchMockHistory(user.id)
      if (!cancelled) { setHistory(rows); setLoading(false) }
    })()
    return () => { cancelled = true }
  }, [user])

  if (loading) {
    return (
      <div className="mt-4 flex items-center gap-2 text-[13px] text-muted-foreground">
        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Cargando tu historial…
      </div>
    )
  }
  if (history.length === 0) {
    return (
      <div className="mt-4 rounded-2xl border border-border/60 bg-muted/20 p-4 text-[13px] text-muted-foreground flex items-center gap-2">
        <History className="h-4 w-4" /> Todavía no guardaste ningún simulacro. Haz uno y guárdalo para ver tu progreso aquí.
      </div>
    )
  }

  const levels = history.filter((h) => h.final_level != null).map((h) => h.final_level as number)
  const best = levels.length ? Math.max(...levels) : null
  const last = history[0]?.final_level ?? null

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-3">
        <History className="h-4 w-4" style={{ color: "var(--av-blue-500)" }} />
        <h2 className="text-[20px] font-semibold tracking-[-0.02em]">Tu historial</h2>
      </div>
      <div className="grid grid-cols-3 gap-2.5 mb-3">
        <Stat label="Simulacros" value={String(history.length)} color="var(--av-blue-500)" />
        <Stat label="Mejor nivel" value={best != null ? `ICAO ${best}` : "—"} color={levelText(best)} />
        <Stat label="Último" value={last != null ? `ICAO ${last}` : "—"} color={levelText(last)} />
      </div>
      <div className="space-y-1.5">
        {history.map((h) => (
          <div key={h.id} className="rounded-xl border bg-card px-3.5 py-2.5 flex items-center gap-3" style={{ borderColor: "color-mix(in oklab, var(--border) 65%, transparent)" }}>
            <div className="tabular-nums w-14 flex-shrink-0 text-[15px] font-semibold" style={{ color: levelText(h.final_level) }}>
              {h.final_level != null ? `ICAO ${h.final_level}` : "—"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold">{fmtDate(h.taken_at)}</div>
              <div className="tabular-nums text-[12px] text-muted-foreground">
                {fmtTime(h.duration_seconds)} · {h.total_items} ítems{h.recorded ? " · grabado" : ""}
              </div>
            </div>
            <div className="hidden sm:flex gap-1">
              {DESCRIPTORS.map((d) => {
                const v = h.scores?.[d.key]
                return (
                  <span key={d.key} title={descriptorEs(d.key, d.name).name} className="tabular-nums w-5 h-5 rounded flex items-center justify-center text-[12px] font-semibold"
                    style={{ background: v ? `color-mix(in oklab, ${levelTint(v)} 16%, transparent)` : "transparent", color: v ? levelText(v) : "var(--muted-foreground)" }}>
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
      <div className="text-[20px] font-semibold tracking-[-0.02em]" style={{ color }}>{value}</div>
      <div className="text-[12px] text-muted-foreground">{label}</div>
    </div>
  )
}

function PartCard({ icon: Icon, color, title, detail, time }: { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string; title: string; detail: string; time: string }) {
  return (
    <div className="rounded-2xl border bg-card p-4" style={{ borderColor: `color-mix(in oklab, ${color} 28%, transparent)` }}>
      <div className="flex items-center justify-between">
        <Icon className="h-4.5 w-4.5" style={{ color }} />
        <span className="text-[12px] text-muted-foreground">{time}</span>
      </div>
      <div className="mt-2 text-[15px] font-semibold tracking-[-0.01em]">{title}</div>
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
        <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
          {PART_LABEL_ES[PARTS[part].label] ?? PARTS[part].label}
        </div>
        <div className="flex items-center gap-3">
          {recording && (
            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: "var(--av-danger-fg)" }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--av-red-400)" }} /> REC
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 tabular-nums text-[13px] text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> {fmtTime(elapsed)}
          </span>
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-border/50 overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: "var(--av-blue-500)" }} />
      </div>
    </div>
  )
}

// ─── STEP VIEW ───────────────────────────────────────────────────────────────
// El `key` en ExamPlayer es obligatorio: sin él, dos pasos seguidos del mismo
// tipo reutilizan la misma instancia y el contador de reproducciones se queda
// en 2/2, dejando el botón de Play muerto para el resto de los audios.
function StepView({ step, onSkip }: { step: ExamStep; onSkip: () => void }) {
  if (step.kind === "interview") {
    return (
      <Card>
        <Kicker icon={Radio} text="Responde en voz alta: natural, técnico y profesional" />
        <div className="mt-3 text-[20px] font-semibold leading-snug tracking-[-0.01em]">{step.question}</div>
      </Card>
    )
  }
  if (step.kind === "short") {
    return (
      <Card>
        <Kicker icon={Headphones} text="Escucha y responde: cuál era el mensaje y quién hablaba" />
        <div className="mt-4"><ExamPlayer key={step.audio.audioUrl} audioUrl={step.audio.audioUrl} onSkip={onSkip} /></div>
        <Prompts items={["What was the message?", "Pilot or controller?"]} />
      </Card>
    )
  }
  if (step.kind === "long") {
    return (
      <Card>
        <Kicker icon={Headphones} text="Mensaje largo: toma notas y explica la situación en detalle" />
        <div className="mt-4"><ExamPlayer key={step.audio.audioUrl} audioUrl={step.audio.audioUrl} onSkip={onSkip} /></div>
        <Prompts items={["What was the problem?", "What were they requesting / advising?", "All the important details"]} />
      </Card>
    )
  }
  if (step.kind === "interactive") {
    return (
      <Card>
        <Kicker icon={MessageSquare} text="Situación: haz preguntas y después da recomendaciones" />
        <div className="mt-4"><ExamPlayer key={step.item.audioUrl} audioUrl={step.item.audioUrl} label="Reproducir la situación" onSkip={onSkip} /></div>
        <Prompts items={["1) Questions to get more info (~20s)", "2) Recommendations to resolve it"]} />
      </Card>
    )
  }
  // picture
  return (
    <Card>
      <Kicker icon={ImageIcon} text="Describe cada imagen, compara, identifica riesgos, opina y conversa" />
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
    <div className="inline-flex items-center gap-2 text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
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
    <figure className="rounded-2xl border overflow-hidden bg-muted" style={{ borderColor: "color-mix(in oklab, var(--border) 70%, transparent)" }}>
      <div className="relative">
        <div className="absolute top-2 left-2 z-10 w-7 h-7 rounded-lg flex items-center justify-center text-[13px] font-semibold text-white" style={{ background: "oklch(0.2 0.02 250 / 0.75)" }}>{letter}</div>
        <img src={src} alt={alt} className="w-full aspect-[4/3] object-cover" />
      </div>
    </figure>
  )
}

// ─── EXAM PLAYER (2 plays, sin reveal) ───────────────────────────────────────
function ExamPlayer({ audioUrl, label, onSkip }: { audioUrl: string; label?: string; onSkip?: () => void }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [plays, setPlays] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState(false)
  const maxPlays = 2
  const canPlay = plays < maxPlays

  useEffect(() => () => { audioRef.current?.pause(); audioRef.current = null }, [])

  function play() {
    if (!canPlay) return
    if (!audioRef.current) {
      const a = new Audio(audioUrl)
      a.preload = "none"
      a.onended = () => setPlaying(false)
      // Sin esto, un audio que no carga dejaba el botón sin hacer nada en medio
      // de un examen cronometrado.
      a.onerror = () => { setPlaying(false); setError(true) }
      audioRef.current = a
    }
    audioRef.current.currentTime = 0
    audioRef.current.play()
      .then(() => { setPlaying(true); setError(false); setPlays((p) => p + 1) })
      .catch(() => { setPlaying(false); setError(true) })
  }
  function stop() { audioRef.current?.pause(); if (audioRef.current) audioRef.current.currentTime = 0; setPlaying(false) }

  return (
    <div>
      <div className="flex items-center gap-2 flex-wrap">
        <button onClick={playing ? stop : play} disabled={!canPlay && !playing}
          className="inline-flex items-center gap-2 h-11 px-5 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          style={{ background: "var(--av-blue-500)" }}>
          {playing ? <><Square className="h-4 w-4" /> Detener</> : plays === 0 ? <><Play className="h-4 w-4" /> {label ?? "Reproducir"}</> : <><RotateCcw className="h-4 w-4" /> Repetir</>}
        </button>
        <div className="tabular-nums text-[12px] text-muted-foreground">
          {plays}/{maxPlays}{plays >= maxPlays && " · sin tercera"}
        </div>
      </div>
      {error && (
        <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
          <span className="text-[13px]" style={{ color: "var(--av-danger-fg)" }}>
            Este audio no cargó. Prueba de nuevo con Repetir, o salta este ítem y sigue.
          </span>
          {onSkip && (
            <button
              onClick={onSkip}
              className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-[13px] font-semibold surface hover:bg-muted transition-colors"
            >
              Saltar este ítem <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}
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
      <div className="px-7 py-9 sm:py-11 pb-24 max-w-[920px] mx-auto">
        <div className="text-center">
          <div className="text-[13px] font-semibold" style={{ color: "var(--av-success-fg)" }}>Simulacro terminado</div>
          <h1 className="mt-2 text-[32px] sm:text-[32px] font-semibold tracking-[-0.03em] leading-[1.05]">¡Terminaste el examen!</h1>
          <div className="mt-2 inline-flex items-center gap-1.5 tabular-nums text-[13px] text-muted-foreground">
            <Clock className="h-4 w-4" /> Tiempo total: {fmtTime(elapsed)} · {steps.length} ítems
          </div>
        </div>

        {/* Autoevaluación */}
        <div className="mt-9">
          <h2 className="text-[20px] font-semibold tracking-[-0.02em]">Autoevalúate en los 6 descriptores</h2>
          <p className="mt-1 text-[13px] text-muted-foreground">Sé honesto: tu resultado final es tu descriptor más bajo.</p>
          <div className="mt-4 space-y-2.5">
            {DESCRIPTORS.map((d) => {
              const es = descriptorEs(d.key, d.name, d.detail)
              return (
              <div key={d.key} className="rounded-2xl border bg-card p-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4" style={{ borderColor: "color-mix(in oklab, var(--border) 65%, transparent)" }}>
                <div className="min-w-0">
                  <div className="text-[15px] font-semibold tracking-[-0.01em]">{es.name}</div>
                  <div className="text-[13px] text-muted-foreground">{es.detail}</div>
                </div>
                {/* En móvil los 3 niveles son tap targets de ancho completo: es el
                    momento en que el piloto se asigna su nivel ICAO. */}
                <div className="grid grid-cols-3 gap-1.5 w-full sm:w-auto sm:flex sm:flex-shrink-0">
                  {[3, 4, 5].map((lvl) => {
                    const active = scores[d.key] === lvl
                    return (
                      <button key={lvl} onClick={() => setScores((s) => ({ ...s, [d.key]: lvl }))}
                        aria-label={`${es.name}: nivel ${lvl}`}
                        aria-pressed={active}
                        className="tabular-nums w-full sm:w-10 h-11 sm:h-10 rounded-lg text-[15px] font-semibold border transition-colors"
                        style={{
                          borderColor: active ? "color-mix(in oklab, var(--av-blue-500) 55%, transparent)" : "color-mix(in oklab, var(--border) 60%, transparent)",
                          background: active ? "color-mix(in oklab, var(--av-blue-500) 18%, transparent)" : "transparent",
                          color: active ? "var(--av-blue-500)" : "var(--muted-foreground)",
                        }}>
                        {lvl}
                      </button>
                    )
                  })}
                </div>
              </div>
              )
            })}
          </div>

          {finalLevel != null && (
            <div className="mt-4 rounded-2xl border p-5 text-center" style={{ borderColor: `color-mix(in oklab, ${finalLevel >= 5 ? "var(--av-green-400)" : finalLevel >= 4 ? "var(--av-blue-500)" : "var(--av-amber-400)"} 40%, transparent)`, background: `color-mix(in oklab, ${finalLevel >= 5 ? "var(--av-green-400)" : finalLevel >= 4 ? "var(--av-blue-500)" : "var(--av-amber-400)"} 8%, transparent)` }}>
              <div className="text-[12px] text-muted-foreground">Tu nivel estimado, el descriptor más bajo</div>
              {/* El número va en color de texto normal: --av-green-400 y
                  --av-amber-400 no se leen sobre fondo claro. El tono lo da el chip. */}
              <div className="mt-1 tabular-nums text-[32px] font-semibold tracking-[-0.04em] text-foreground">
                ICAO {finalLevel}
              </div>
              <div className="mt-0.5">
                <span className={finalLevel >= 5 ? "chip chip-green" : finalLevel >= 4 ? "chip" : "chip chip-amber"}>
                  {finalLevel >= 5 ? "Extended: nivel de aerolínea" : finalLevel >= 4 ? "Operational: mínimo legal internacional" : "Pre-operational: sigue practicando"}
                </span>
              </div>

              {/* Guardar */}
              {saveState === "saved" ? (
                <div className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: "var(--av-success-fg)" }}>
                  <CheckCircle2 className="h-4 w-4" /> Guardado en tu historial
                </div>
              ) : (
                <button
                  onClick={save}
                  disabled={!user || saveState === "saving"}
                  className="mt-4 inline-flex items-center gap-2 h-11 px-5 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
                  style={{ background: "var(--av-blue-500)" }}
                >
                  {saveState === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Guardar el resultado
                </button>
              )}
              {saveState === "error" && (
                <div className="mt-2 text-[13px]" style={{ color: "var(--av-danger-fg)" }}>No pudimos guardar. Inténtalo de nuevo.</div>
              )}
              {!user && (
                <div className="mt-2 text-[13px] text-muted-foreground">Inicia sesión para guardar tu resultado.</div>
              )}
            </div>
          )}
        </div>

        {/* Review */}
        <div className="mt-10">
          <h2 className="text-[20px] font-semibold tracking-[-0.02em]">Repaso: qué salió y las respuestas</h2>
          <p className="mt-1 text-[13px] text-muted-foreground">Escucha de nuevo, lee las transcripciones y, si te grabaste, escúchate.</p>
          <div className="mt-4 space-y-2">
            {steps.map((s, i) => (
              <ReviewItem key={i} step={s} n={i + 1} recordingUrl={recordings[i]} />
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <button onClick={onRestart} className="inline-flex items-center gap-2 h-12 px-6 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--av-blue-500)" }}>
            <RotateCcw className="h-4 w-4" /> Otro simulacro
          </button>
          <Link to="/app/icao" className="inline-flex items-center gap-1.5 h-12 px-6 rounded-xl text-[15px] font-semibold surface hover:bg-muted transition-colors">
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
    <div className="rounded-2xl border bg-card overflow-hidden" style={{ borderColor: open ? "color-mix(in oklab, var(--av-blue-500) 30%, transparent)" : "color-mix(in oklab, var(--border) 65%, transparent)" }}>
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center gap-3 p-3.5 text-left">
        <span className="tabular-nums flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-[12px] font-semibold" style={{ background: "color-mix(in oklab, var(--av-blue-500) 12%, transparent)", color: "var(--av-blue-500)" }}>{n}</span>
        <span className="text-[12px] font-semibold flex-shrink-0 px-1.5 py-0.5 rounded" style={{ background: "color-mix(in oklab, var(--border) 40%, transparent)", color: "var(--muted-foreground)" }}>{meta.tag}</span>
        <span className="flex-1 text-[13px] font-semibold truncate">{meta.title}</span>
        {open ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
      </button>
      {open && (
        <div className="px-3.5 pb-3.5 space-y-3">
          {recordingUrl && (
            <div>
              <div className="text-[12px] font-semibold mb-1" style={{ color: "var(--av-blue-500)" }}>Tu respuesta</div>
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
  const box = { borderColor: "color-mix(in oklab, var(--av-blue-500) 22%, transparent)", background: "color-mix(in oklab, var(--av-blue-500) 6%, transparent)" }
  if (step.kind === "interview") {
    return (
      <div className="rounded-xl border p-3" style={box}>
        <div className="text-[12px] font-semibold mb-1" style={{ color: "var(--av-blue-500)" }}>Respuesta modelo</div>
        <p className="text-[13px] text-foreground/90 leading-relaxed">{step.suggestedAnswer}</p>
        {step.highRegisterWords && step.highRegisterWords.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {step.highRegisterWords.map((w) => (
              <span key={w} className="px-2 py-0.5 rounded-md text-[12px] font-semibold" style={{ background: "color-mix(in oklab, var(--av-amber-400) 14%, transparent)", color: "var(--av-warn-fg)" }}>{w}</span>
            ))}
          </div>
        )}
      </div>
    )
  }
  if (step.kind === "short") {
    return (
      <div className="rounded-xl border p-3 space-y-1.5" style={box}>
        {step.audio.speaker && <Badge speaker={step.audio.speaker} />}
        
        {step.audio.transcript && <p className="text-[13px] italic text-muted-foreground">&ldquo;{step.audio.transcript}&rdquo;</p>}
      </div>
    )
  }
  if (step.kind === "long") {
    return (
      <div className="rounded-xl border p-3 space-y-1.5" style={box}>
        {step.audio.speaker && <Badge speaker={step.audio.speaker} />}
        {step.audio.summary && <p className="text-[13px] text-foreground/90">{step.audio.summary}</p>}
        {step.audio.problem && <p className="text-[13px] text-foreground/90"><strong>Problema:</strong> {step.audio.problem}</p>}
        {step.audio.request && <p className="text-[13px] text-foreground/90"><strong>Pedido:</strong> {step.audio.request}</p>}
        {step.audio.transcript && <p className="text-[13px] italic text-muted-foreground">&ldquo;{step.audio.transcript}&rdquo;</p>}
      </div>
    )
  }
  if (step.kind === "interactive") {
    return (
      <div className="rounded-xl border p-3 space-y-2" style={box}>
        {step.item.transcript && <p className="text-[13px] italic text-foreground/90">&ldquo;{step.item.transcript}&rdquo;</p>}
        {step.item.questions && <div><div className="text-[12px] font-semibold mb-1" style={{ color: "var(--av-blue-500)" }}>Preguntas</div><ul className="space-y-0.5">{step.item.questions.map((q) => <li key={q} className="text-[13px] italic text-foreground/90">&ldquo;{q}&rdquo;</li>)}</ul></div>}
        {step.item.advice && <div><div className="text-[12px] font-semibold mb-1" style={{ color: "var(--av-success-fg)" }}>Recomendaciones</div><ul className="space-y-0.5">{step.item.advice.map((a) => <li key={a} className="flex items-start gap-1.5 text-[13px] text-foreground/90"><Check className="flex-shrink-0 mt-0.5 h-3 w-3 text-[var(--av-green-400)]" strokeWidth={3} />{a}</li>)}</ul></div>}
      </div>
    )
  }
  // picture
  return (
    <div className="rounded-xl border p-3" style={box}>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <img src={step.pair.imageA} alt={step.pair.altA} className="w-full aspect-[4/3] object-cover rounded-md" />
        <img src={step.pair.imageB} alt={step.pair.altB} className="w-full aspect-[4/3] object-cover rounded-md" />
      </div>
      <div className="text-[12px] font-semibold mb-1" style={{ color: "var(--av-success-fg)" }}>Conversación</div>
      <ul className="space-y-0.5">{step.pair.discussion.map((q) => <li key={q} className="text-[13px] text-foreground/90">{q}</li>)}</ul>
    </div>
  )
}

/** Mismo tratamiento para los dos hablantes: .chip, con su par claro/oscuro. */
function Badge({ speaker }: { speaker: "pilot" | "controller" }) {
  const isPilot = speaker === "pilot"
  return (
    <span className={isPilot ? "chip chip-cyan" : "chip chip-amber"}>
      {isPilot ? <Plane className="h-2.5 w-2.5" /> : <RadioTower className="h-2.5 w-2.5" />}
      {isPilot ? "Pilot" : "Controller"}
    </span>
  )
}
