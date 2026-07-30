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
  MessageSquare,
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
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a Inglés ICAO
        </Link>

        {/* Header */}
        <section className="relative overflow-hidden rounded-2xl surface p-7 sm:p-8">
          <div
            className="inline-flex items-center gap-2 h-9 w-9 rounded-xl items-center justify-center"
            style={{
              background: "linear-gradient(135deg, var(--av-blue-400), var(--av-blue-500))",
            }}
          >
            <Headphones className="h-4.5 w-4.5 text-white" />
          </div>
          <div className="mt-3 text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
            TEA · Parte 2 · Interactive Comprehension · 8 a 12 minutos
          </div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-[-0.03em] leading-[1.05]">
            Comprensión interactiva
          </h1>
          <p className="mt-2 text-[15px] text-muted-foreground max-w-[720px]">
            Es la parte que distingue al TEA. Escuchas situaciones no rutinarias y de emergencia, y
            tienes que demostrar que{" "}
            <strong className="text-foreground">entendiste el mensaje completo</strong>. Son{" "}
            <strong className="text-foreground">audios reales</strong> del material de práctica.
          </p>
        </section>

        {/* Playback rule */}
        <div
          className="mt-5 rounded-2xl border p-4 flex items-start gap-3"
          style={{
            borderColor: "color-mix(in oklab, var(--av-amber-400) 25%, transparent)",
            background: "color-mix(in oklab, var(--av-amber-400) 6%, transparent)",
          }}
        >
          <AlertTriangle className="flex-shrink-0 mt-0.5 h-4.5 w-4.5" style={{ color: "var(--av-amber-400)" }} />
          <div className="text-[14px] text-foreground/85 leading-relaxed">
            <strong>Regla del examen:</strong> cada audio suena <strong>una vez</strong>. Puedes pedir
            <strong> una repetición</strong>, pero <strong>nunca una tercera</strong>. Pedir
            repeticiones suele bajar tu nota de Comprehension. Aquí reproducimos esa regla: 2
            reproducciones por audio.
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-7 flex gap-1.5 flex-wrap">
          <TabBtn active={tab === "2a"} onClick={() => setTab("2a")} label="2A · Audios cortos" />
          <TabBtn active={tab === "2b"} onClick={() => setTab("2b")} label="2B · Audios largos" />
          <TabBtn active={tab === "2c"} onClick={() => setTab("2c")} label="2C · Respuesta interactiva" />
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
        className="inline-flex items-center gap-2 h-10 px-4 rounded-xl text-[14px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        style={{
          background: "var(--av-blue-500)",
        }}
      >
        {playing ? (
          <><Square className="h-3.5 w-3.5" /> Detener</>
        ) : plays === 0 ? (
          <><Play className="h-3.5 w-3.5" /> {label ?? "Reproducir"}</>
        ) : (
          <><RotateCcw className="h-3.5 w-3.5" /> Repetir</>
        )}
      </button>
      <div className="tabular-nums text-[12.5px] text-muted-foreground">
        {plays}/{maxPlays} reproducciones
        {plays >= maxPlays && " · no hay tercera (regla del TEA)"}
      </div>
      {error && (
        <div className="text-[12.5px]" style={{ color: "var(--av-danger-fg)" }}>
          No pudimos cargar el audio.
        </div>
      )}
    </div>
  )
}

// ─── QUIZ unificado (aleatorio, una pregunta a la vez) ───────────────────────
interface QItem {
  id: string
  audioUrl: string
  playLabel?: string
  /** identidad del clip ("Set B · Audio 034"): sin esto todos los ítems se ven iguales */
  eyebrow: string
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

function QuizRunner({ items, kicker, accent = "var(--av-blue-500)" }: { items: QItem[]; kicker: { icon: React.ComponentType<{ className?: string }>; text: string }; accent?: string }) {
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
        <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>Quiz terminado</div>
        {scorable > 0 ? (
          <>
            <div className="mt-2 text-[64px] font-semibold tracking-[-0.04em] leading-none tabular-nums" style={{ color: accent }}>{score} / {scorable}</div>
            <div className="mt-1 text-[14px] font-semibold tabular-nums" style={{ color: accent }}>{pct}% en piloto o controlador</div>
          </>
        ) : (
          <div className="mt-3 text-[16px] text-foreground/80">Recorriste {order.length} situaciones.</div>
        )}
        <div className="mt-8">
          <button onClick={restart} className="inline-flex items-center gap-2 h-11 px-5 rounded-xl text-[14px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
            style={{ background: accent }}>
            <RotateCcw className="h-4 w-4" /> Nuevo quiz (otra selección al azar)
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* progreso */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="tabular-nums text-[12.5px] text-muted-foreground">
          {idx + 1} <span className="opacity-50">/ {order.length}</span>
        </div>
        <div className="flex-1 mx-3 h-1.5 rounded-full bg-border/50 overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width: `${((idx + (revealed ? 1 : 0)) / order.length) * 100}%`, background: accent }} />
        </div>
        {scorable > 0 && <div className="tabular-nums text-[12.5px] text-muted-foreground">✓ {score}</div>}
      </div>

      <div className="rounded-2xl border bg-card p-5" style={cardBorder}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <div className="text-[12px] font-semibold uppercase tracking-[0.12em]" style={{ color: accent }}>
            {cur.eyebrow}
          </div>
          <Kicker icon={kicker.icon} text={kicker.text} />
        </div>

        {/* El `key` es obligatorio: sin él el player se reutiliza entre ítems,
            se queda con el <audio> del clip anterior y el contador en 2/2. */}
        <div className="mt-4 flex items-center justify-center">
          <ClipPlayer key={cur.id} audioUrl={cur.audioUrl} label={cur.playLabel} />
        </div>

        {/* Pilot/controller question (verified) */}
        {cur.speaker && (
          <div className="mt-5">
            <div className="text-center text-[14px] font-semibold mb-2.5">¿Quién habla?</div>
            <div className="flex items-center justify-center gap-2.5">
              {(["pilot", "controller"] as Speaker[]).map((s) => {
                const chosen = picked === s
                const isAnswer = cur.speaker === s
                const showCorrect = revealed && isAnswer
                const showWrong = revealed && chosen && !isAnswer
                return (
                  <button key={s} onClick={() => pickSpeaker(s)} disabled={revealed}
                    className="inline-flex items-center gap-2 h-11 px-5 rounded-xl text-[14px] font-semibold border transition-colors disabled:cursor-default"
                    style={{
                      borderColor: showCorrect ? "var(--av-green-400)" : showWrong ? "var(--av-red-400)" : chosen ? accent : "color-mix(in oklab, var(--border) 70%, transparent)",
                      background: showCorrect ? "color-mix(in oklab, var(--av-green-400) 14%, transparent)" : showWrong ? "color-mix(in oklab, var(--av-red-400) 14%, transparent)" : "transparent",
                      color: showCorrect ? "var(--av-success-fg)" : showWrong ? "var(--av-danger-fg)" : "var(--foreground)",
                    }}>
                    {s === "pilot" ? <Plane className="h-4 w-4" /> : <RadioTower className="h-4 w-4" />}
                    {s === "pilot" ? "Pilot" : "Controller"}
                    {showCorrect && <Check className="h-4 w-4" strokeWidth={3} />}
                  </button>
                )
              })}
            </div>
            {revealed && (
              <div className="mt-2.5 text-center text-[13px] font-semibold" style={{ color: picked === cur.speaker ? "var(--av-success-fg)" : "var(--av-danger-fg)" }}>
                {picked === cur.speaker ? "¡Correcto!" : `Era ${cur.speaker === "pilot" ? "Pilot" : "Controller"}`}
              </div>
            )}
          </div>
        )}

        {/* For 2C (no speaker): Show answer button */}
        {!cur.speaker && !revealed && (
          <div className="mt-5 flex justify-center">
            <button onClick={() => setRevealed(true)} className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-[13.5px] font-semibold surface hover:bg-muted transition-colors">
              <Eye className="h-4 w-4" /> Ver la respuesta modelo
            </button>
          </div>
        )}

        {/* Reveal: the key info */}
        {revealed && <div className="mt-4">{cur.reveal}</div>}
      </div>

      {revealed && (
        <div className="mt-5 flex justify-end">
          <button onClick={next} className="inline-flex items-center gap-2 h-11 px-5 rounded-xl text-[14px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
            style={{ background: accent }}>
            {idx >= order.length - 1 ? "Ver resultados" : "Siguiente"} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  )
}

// ─── Reveals (la "misma info que en audios largos") ──────────────────────────
function ShortReveal({ a }: { a: ShortAudio }) {
  return (
    <div className="rounded-2xl border p-3.5" style={revealBox}>
      {a.speaker && <SpeakerBadge speaker={a.speaker} />}
      {a.transcript && <Transcript text={a.transcript} />}
    </div>
  )
}
function LongReveal({ a }: { a: LongAudio }) {
  return (
    <div className="rounded-2xl border p-3.5 space-y-3" style={revealBox}>
      <div className="text-[14.5px] font-semibold tracking-[-0.01em]">{a.title}</div>
      {a.summary && <RevealRow label="Resumen" value={a.summary} color="var(--av-blue-500)" />}
      {a.problem && <RevealRow label="El problema" value={a.problem} color="var(--av-danger-fg)" />}
      {a.request && <RevealRow label="Pedido o aviso" value={a.request} color="var(--av-blue-500)" />}
      {a.details && a.details.length > 0 && (
        <div>
          <div className="text-[12.5px] font-semibold text-muted-foreground mb-1.5">Datos clave</div>
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
    <div className="rounded-2xl border p-3.5 space-y-3" style={revealBox}>
      {it.transcript && (
        <div className="text-[14px] text-foreground/90">
          <span className="text-[12.5px] font-semibold text-muted-foreground">Situación: </span>
          <span className="italic">&ldquo;{it.transcript}&rdquo;</span>
        </div>
      )}
      {it.questions && (
        <div>
          <div className="text-[12.5px] font-semibold text-[var(--av-blue-500)] mb-1.5">Preguntas que podrías hacer</div>
          <ul className="space-y-1">
            {it.questions.map((q) => (
              <li key={q} className="flex items-start gap-2 text-[14px] italic text-foreground/85">
                <HelpCircle className="flex-shrink-0 mt-0.5 h-3.5 w-3.5 text-[var(--av-blue-500)]" /><span>&ldquo;{q}&rdquo;</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {it.advice && (
        <div>
          <div className="text-[12.5px] font-semibold text-muted-foreground mb-1.5">Recomendaciones</div>
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
  const items: QItem[] = SHORT_AUDIO_SETS.flatMap((set) => {
    // "Set A · Track 1–16" → "Set A", para poder mostrar "Set A · Track 7"
    const setName = set.title.split(" · ")[0]
    return set.items.map((a) => ({
      id: a.id,
      audioUrl: a.audioUrl,
      eyebrow: `${setName} · ${a.label}`,
      speaker: a.speaker,
      reveal: <ShortReveal a={a} />,
    }))
  })
  return (
    <>
      <SectionIntro text={`Una selección al azar de ${Math.min(QUIZ_SIZE, SHORT_AUDIO_TOTAL)} mensajes cortos tomados del banco de ${SHORT_AUDIO_TOTAL}.`} />
      <WorkbookSamples title={`Frases modelo del workbook · "What is the message?" (${SAMPLE_MESSAGES_2A.length})`}
        intro="Ejemplos oficiales del tipo de mensaje que vas a escuchar (Aviation English Now). Practica parafrasear cada uno."
        items={SAMPLE_MESSAGES_2A} />
      <QuizRunner items={items} kicker={{ icon: Headphones, text: "Escucha y decide: piloto o controlador" }} />
    </>
  )
}

// ─── 2B · LONG AUDIOS (random quiz) ──────────────────────────────────────────
function LongAudiosSection() {
  // El título del audio es la respuesta, así que en la cabecera va solo la
  // identidad del clip: el título aparece al revelar.
  const items: QItem[] = LONG_AUDIOS.map((a) => ({
    id: String(a.id),
    audioUrl: a.audioUrl,
    eyebrow: `2B · Audio largo ${String(a.id).padStart(2, "0")}`,
    speaker: a.speaker,
    reveal: <LongReveal a={a} />,
  }))
  return (
    <>
      <SectionIntro text={`Una selección al azar de ${Math.min(QUIZ_SIZE, LONG_AUDIOS.length)} mensajes largos tomados del banco de ${LONG_AUDIOS.length}. Puedes tomar notas mientras escuchas.`} />
      <QuizRunner items={items} kicker={{ icon: Headphones, text: "Explica la situación y luego compara: problema, pedido y datos" }} />
    </>
  )
}

// ─── 2C · INTERACTIVE RESPONSE (random quiz) ─────────────────────────────────
function InteractiveSection() {
  const items: QItem[] = INTERACTIVE_ITEMS.map((it) => ({
    id: String(it.id),
    audioUrl: it.audioUrl,
    playLabel: "Reproducir la situación",
    eyebrow: `2C · ${it.label}`,
    reveal: <InteractiveReveal it={it} />,
  }))
  return (
    <>
      <SectionIntro text={`Una selección al azar de situaciones no rutinarias tomadas del banco de ${INTERACTIVE_ITEMS.length}.`} />
      <WorkbookSamples title={`Situaciones modelo del workbook · "Ask questions + advice" (${SAMPLE_SCENARIOS_2C.length})`}
        intro="Situaciones oficiales con el formato de la Parte 2C (Aviation English Now)."
        items={SAMPLE_SCENARIOS_2C} />
      <QuizRunner items={items} kicker={{ icon: MessageSquare, text: "Haz preguntas para conseguir más información y luego da recomendaciones" }} />
    </>
  )
}

// ─── Sub-componentes compartidos ─────────────────────────────────────────────
const cardBorder = { borderColor: "color-mix(in oklab, var(--border) 70%, transparent)" }
const revealBox = {
  borderColor: "color-mix(in oklab, var(--av-blue-500) 25%, transparent)",
  background: "color-mix(in oklab, var(--av-blue-500) 6%, transparent)",
}

function WorkbookSamples({ title, intro, items }: { title: string; intro: string; items: string[] }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="mb-5 rounded-2xl border overflow-hidden"
      style={{ borderColor: "color-mix(in oklab, var(--av-blue-500) 22%, transparent)" }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 p-3.5 text-left"
        style={{ background: "color-mix(in oklab, var(--av-blue-500) 6%, transparent)" }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <BookOpen className="flex-shrink-0 h-4 w-4 text-[var(--av-blue-500)]" />
          <span className="text-[14px] font-semibold tracking-[-0.01em] truncate">{title}</span>
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
                  className="tabular-nums flex-shrink-0 w-6 text-right text-[12.5px] font-semibold pt-0.5"
                  style={{ color: "var(--av-blue-500)" }}
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
      className="px-4 h-9 rounded-full text-[13.5px] font-semibold border transition-colors"
      style={{
        borderColor: active
          ? "color-mix(in oklab, var(--av-blue-500) 45%, transparent)"
          : "color-mix(in oklab, var(--border) 60%, transparent)",
        background: active ? "color-mix(in oklab, var(--av-blue-500) 16%, transparent)" : "transparent",
        color: active ? "var(--av-blue-500)" : "var(--muted-foreground)",
      }}
    >
      {label}
    </button>
  )
}

function SectionIntro({ text }: { text: string }) {
  return <p className="mb-4 text-[13.5px] text-muted-foreground leading-relaxed">{text}</p>
}

/** Instrucción corta dentro de la tarjeta (mismo patrón que el simulacro). */
function Kicker({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-muted-foreground">
      <Icon className="h-3.5 w-3.5" /> {text}
    </div>
  )
}

/** Pilot y Controller comparten forma y tratamiento: los dos son .chip, que ya
    trae su par de color claro/oscuro legible. */
function SpeakerBadge({ speaker }: { speaker: Speaker }) {
  const isPilot = speaker === "pilot"
  return (
    <span className={isPilot ? "chip chip-cyan" : "chip chip-amber"}>
      {isPilot ? <Plane className="h-3 w-3" /> : <RadioTower className="h-3 w-3" />}
      {isPilot ? "Pilot" : "Controller"}
    </span>
  )
}

function RevealRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <div className="text-[12.5px] font-semibold mb-1" style={{ color }}>
        {label}
      </div>
      <div className="text-[14px] text-foreground/85 leading-relaxed">{value}</div>
    </div>
  )
}

function Transcript({ text }: { text: string }) {
  return (
    <div className="mt-2.5 pt-2.5 border-t border-border/40">
      <div className="text-[12px] font-semibold text-muted-foreground mb-1">
        Transcripción
      </div>
      <p className="text-[13.5px] italic text-muted-foreground leading-relaxed">&ldquo;{text}&rdquo;</p>
    </div>
  )
}
