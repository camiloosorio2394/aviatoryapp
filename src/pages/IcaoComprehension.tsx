import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  Headphones,
  Play,
  Square,
  RotateCcw,
  Eye,
  EyeOff,
  Lightbulb,
  Plane,
  RadioTower,
  AlertTriangle,
  Check,
  HelpCircle,
  MessageSquare,
  BookOpen,
  ChevronDown,
  Sparkles,
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
          className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver al módulo Inglés ICAO
        </Link>

        {/* Header */}
        <div
          className="mono inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] px-2 py-1 rounded-full"
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
        <p className="mt-2 text-[14px] text-muted-foreground max-w-[720px]">
          La sección que más diferencia al TEA. Escuchás situaciones no rutinarias y de emergencia y
          tenés que demostrar que <strong className="text-foreground">comprendiste el mensaje
          completo</strong>. Estos son <strong className="text-foreground">audios reales</strong> del
          material de práctica.
        </p>

        {/* Regla de reproducción */}
        <div
          className="mt-5 rounded-xl border p-4 flex items-start gap-3"
          style={{
            borderColor: "color-mix(in oklab, var(--av-amber-400) 25%, transparent)",
            background: "color-mix(in oklab, var(--av-amber-400) 6%, transparent)",
          }}
        >
          <AlertTriangle className="flex-shrink-0 mt-0.5 h-4.5 w-4.5" style={{ color: "var(--av-amber-400)" }} />
          <div className="text-[12.5px] text-foreground/85 leading-relaxed">
            <strong>Regla del examen:</strong> cada audio se reproduce <strong>una vez</strong>. Podés
            pedir <strong>una segunda</strong>, pero <strong>nunca una tercera</strong>. Pedir
            repetición seguido baja la nota de Comprehension. Acá replicamos esa regla: 2
            reproducciones por audio.
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
        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg text-[13px] font-semibold text-white border-0 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(180deg, var(--av-violet-400) 0%, oklch(0.5 0.2 295) 100%)",
          boxShadow: "0 1px 0 rgb(255 255 255 / 18%) inset, 0 8px 20px -8px oklch(0.5 0.2 295 / 50%)",
        }}
      >
        {playing ? (
          <><Square className="h-3.5 w-3.5" /> Detener</>
        ) : plays === 0 ? (
          <><Play className="h-3.5 w-3.5" /> {label ?? "Reproducir"}</>
        ) : (
          <><RotateCcw className="h-3.5 w-3.5" /> Escuchar otra vez</>
        )}
      </button>
      <div className="mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
        {plays}/{maxPlays} reproducciones
        {plays >= maxPlays && " · sin tercera (regla TEA)"}
      </div>
      {error && (
        <div className="text-[11px] text-[var(--av-red-400)]">No se pudo cargar el audio.</div>
      )}
    </div>
  )
}

// ─── 2A · SHORT AUDIOS ───────────────────────────────────────────────────────
function ShortAudiosSection() {
  return (
    <>
      <SectionIntro text={`${SHORT_AUDIO_TOTAL} mensajes cortos en 3 sets. Después de cada uno, respondé mentalmente: ¿cuál era el mensaje? ¿hablaba un piloto o un controlador? No hace falta repetir palabra por palabra — sí transmitir toda la info relevante.`} />
      <WorkbookSamples
        title={`Frases modelo del workbook · "What is the message?" (${SAMPLE_MESSAGES_2A.length})`}
        intro="Ejemplos oficiales del tipo de mensaje que vas a escuchar (Aviation English Now). Practicá parafrasear cada uno: ¿cuál es el mensaje y quién habla?"
        items={SAMPLE_MESSAGES_2A}
      />
      <div className="space-y-7">
        {SHORT_AUDIO_SETS.map((set) => (
          <div key={set.key}>
            <div className="flex items-baseline gap-2 mb-1.5 flex-wrap">
              <h3 className="text-[14px] font-bold tracking-[-0.01em]">{set.title}</h3>
              <span className="mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{set.note}</span>
            </div>
            {set.keyNote && (
              <p className="text-[11px] text-muted-foreground mb-3 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-[var(--av-violet-400)]" /> {set.keyNote}
              </p>
            )}
            <div className="grid gap-2.5 sm:grid-cols-2">
              {set.items.map((a) => (
                <ShortAudioCard key={a.id} audio={a} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function ShortAudioCard({ audio }: { audio: ShortAudio }) {
  const [revealed, setRevealed] = useState(false)
  const hasKey = !!audio.messageSummary
  return (
    <div className="rounded-xl border bg-card p-3.5" style={cardBorder}>
      <div className="flex items-center justify-between gap-2">
        <div className="mono text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
          {audio.label}
        </div>
        {hasKey && <RevealBtn revealed={revealed} onClick={() => setRevealed((r) => !r)} />}
      </div>
      <div className="mt-2">
        <ClipPlayer audioUrl={audio.audioUrl} />
      </div>
      <div className="mt-2.5 grid gap-1 text-[11.5px] text-muted-foreground">
        <div className="flex items-center gap-1.5"><HelpCircle className="h-3 w-3" /> What was the message?</div>
        <div className="flex items-center gap-1.5"><HelpCircle className="h-3 w-3" /> Pilot or controller?</div>
      </div>

      {hasKey && revealed && (
        <div className="mt-3 rounded-lg border p-3" style={revealBox}>
          {audio.speaker && <SpeakerBadge speaker={audio.speaker} />}
          <div className="mt-2 text-[12.5px] text-foreground/90 leading-relaxed">{audio.messageSummary}</div>
          {audio.transcript && <Transcript text={audio.transcript} />}
        </div>
      )}
    </div>
  )
}

// ─── 2B · LONG AUDIOS ────────────────────────────────────────────────────────
function LongAudiosSection() {
  return (
    <>
      <SectionIntro text="Mensajes largos (15–20s). Acá SÍ podés tomar notas. Después explicá la situación con el mayor detalle posible: cuál era el problema, qué pedía el hablante y todos los detalles importantes. Cuanta más info correcta recuerdes, mejor la nota." />
      <div className="space-y-3">
        {LONG_AUDIOS.map((a) => (
          <LongAudioCard key={a.id} audio={a} />
        ))}
      </div>
    </>
  )
}

function LongAudioCard({ audio }: { audio: LongAudio }) {
  const [revealed, setRevealed] = useState(false)
  return (
    <div className="rounded-xl border bg-card p-4" style={cardBorder}>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="mono text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
          Audio largo {audio.id} / {LONG_AUDIOS.length}
        </div>
        {audio.hasKey && <RevealBtn revealed={revealed} onClick={() => setRevealed((r) => !r)} />}
      </div>
      <div className="mt-1 text-[13.5px] font-semibold tracking-[-0.01em]">{audio.title}</div>
      <div className="mt-3">
        <ClipPlayer audioUrl={audio.audioUrl} />
      </div>
      <div className="mt-2 text-[11px] text-muted-foreground flex items-center gap-1.5">
        <Lightbulb className="h-3 w-3" /> Tomá notas: problema · pedido · detalles
      </div>

      {revealed && audio.hasKey && (
        <div className="mt-3 rounded-lg border p-3.5 space-y-3" style={revealBox}>
          {audio.speaker && <SpeakerBadge speaker={audio.speaker} />}
          {audio.summary && <RevealRow label="Resumen" value={audio.summary} color="var(--av-cyan-400)" />}
          {audio.problem && <RevealRow label="El problema" value={audio.problem} color="var(--av-red-400)" />}
          {audio.request && <RevealRow label="Qué pedía / aviso" value={audio.request} color="var(--av-cyan-400)" />}
          {audio.details && audio.details.length > 0 && (
            <div>
              <div className="mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--av-green-400)] mb-1.5">
                DETALLES CLAVE
              </div>
              <ul className="space-y-1">
                {audio.details.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-[12.5px] text-foreground/85">
                    <Check className="flex-shrink-0 mt-0.5 h-3.5 w-3.5 text-[var(--av-green-400)]" strokeWidth={3} />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {audio.transcript && <Transcript text={audio.transcript} />}
        </div>
      )}
    </div>
  )
}

// ─── 2C · INTERACTIVE RESPONSE ───────────────────────────────────────────────
function InteractiveSection() {
  return (
    <>
      <SectionIntro text="Situaciones cortas no rutinarias. Tras escuchar, tenés ~20s para formular preguntas que te den más información. Después, dá recomendaciones o consejos para resolver. Se evalúa interacción natural en Plain English: preguntas relevantes + soluciones apropiadas." />
      <WorkbookSamples
        title={`Escenarios modelo del workbook · "Ask questions + advice" (${SAMPLE_SCENARIOS_2C.length})`}
        intro="Situaciones oficiales del tipo de la Parte 2C (Aviation English Now). Para cada una: formulá 2-3 preguntas para obtener más info y luego dá un consejo."
        items={SAMPLE_SCENARIOS_2C}
      />
      <div className="space-y-2.5">
        {INTERACTIVE_ITEMS.map((it) => (
          <InteractiveCard key={it.id} item={it} />
        ))}
      </div>
    </>
  )
}

function InteractiveCard({ item }: { item: InteractiveItem }) {
  const [revealed, setRevealed] = useState(false)
  const hasKey = !!item.questions?.length
  return (
    <div className="rounded-xl border bg-card p-4" style={cardBorder}>
      <div className="flex items-center justify-between gap-2">
        <div className="mono text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
          {item.label}
        </div>
        {hasKey && <RevealBtn revealed={revealed} onClick={() => setRevealed((r) => !r)} />}
      </div>
      <div className="mt-2">
        <ClipPlayer audioUrl={item.audioUrl} label="Escuchar situación" />
      </div>
      <div className="mt-3 grid gap-1.5 text-[12px] text-muted-foreground">
        <div className="flex items-center gap-1.5"><HelpCircle className="h-3.5 w-3.5" /> 1) Formulá preguntas para obtener más info (~20s)</div>
        <div className="flex items-center gap-1.5"><MessageSquare className="h-3.5 w-3.5" /> 2) Dá recomendaciones para resolver</div>
      </div>

      {hasKey && revealed && (
        <div className="mt-3 rounded-lg border p-3.5 space-y-3" style={revealBox}>
          {item.transcript && (
            <div className="text-[12.5px] text-foreground/90">
              <span className="mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Situación: </span>
              <span className="italic">&ldquo;{item.transcript}&rdquo;</span>
            </div>
          )}
          {item.questions && (
            <div>
              <div className="mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--av-cyan-400)] mb-1.5">
                PREGUNTAS QUE PODRÍAS HACER
              </div>
              <ul className="space-y-1">
                {item.questions.map((q) => (
                  <li key={q} className="flex items-start gap-2 text-[12.5px] italic text-foreground/85">
                    <HelpCircle className="flex-shrink-0 mt-0.5 h-3.5 w-3.5 text-[var(--av-cyan-400)]" />
                    <span>&ldquo;{q}&rdquo;</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {item.advice && (
            <div>
              <div className="mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--av-green-400)] mb-1.5">
                RECOMENDACIONES
              </div>
              <ul className="space-y-1">
                {item.advice.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-[12.5px] text-foreground/85">
                    <Check className="flex-shrink-0 mt-0.5 h-3.5 w-3.5 text-[var(--av-green-400)]" strokeWidth={3} />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
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
          <span className="text-[13px] font-bold tracking-[-0.01em] truncate">{title}</span>
        </div>
        <ChevronDown
          className="flex-shrink-0 h-4 w-4 text-muted-foreground transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <div className="p-4 pt-3">
          <p className="text-[12px] text-muted-foreground leading-relaxed mb-3">{intro}</p>
          <ol className="space-y-1.5">
            {items.map((s, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[13px] text-foreground/85 leading-relaxed">
                <span
                  className="mono flex-shrink-0 w-6 text-right text-[11px] font-bold pt-0.5"
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
      className="mono px-4 h-9 rounded-full text-[12px] font-bold uppercase tracking-[0.06em] border transition-colors"
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
  return <p className="mb-4 text-[13px] text-foreground/75 leading-relaxed">{text}</p>
}

function RevealBtn({ revealed, onClick }: { revealed: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-[12px] font-semibold transition-colors"
      style={{ color: "var(--av-violet-400)" }}
    >
      {revealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
      {revealed ? "Ocultar" : "Ver respuesta"}
    </button>
  )
}

function SpeakerBadge({ speaker }: { speaker: Speaker }) {
  const isPilot = speaker === "pilot"
  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold"
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
      <div className="mono text-[10px] font-bold uppercase tracking-[0.14em] mb-1" style={{ color }}>
        {label}
      </div>
      <div className="text-[12.5px] text-foreground/85 leading-relaxed">{value}</div>
    </div>
  )
}

function Transcript({ text }: { text: string }) {
  return (
    <div className="mt-2.5 pt-2.5 border-t border-border/40">
      <div className="mono text-[9px] font-bold uppercase tracking-[0.14em] text-muted-foreground mb-1">
        TRANSCRIPT
      </div>
      <p className="text-[12px] italic text-muted-foreground leading-relaxed">&ldquo;{text}&rdquo;</p>
    </div>
  )
}
