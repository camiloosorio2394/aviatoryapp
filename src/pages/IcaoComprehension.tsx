import { useState } from "react"
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
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { useSpeech } from "@/hooks/useSpeech"
import {
  SHORT_AUDIOS,
  LONG_AUDIOS,
  INTERACTIVE_SCENARIOS,
  type Speaker,
} from "@/lib/icaoComprehension"

/**
 * TEA — Part 2: Interactive Comprehension (interactivo, con voz sintetizada).
 * 2A Short · 2B Long · 2C Interactive Response.
 */
type Tab = "2a" | "2b" | "2c"

export function IcaoComprehension() {
  const [tab, setTab] = useState<Tab>("2a")
  const speech = useSpeech()

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
          completo</strong>. Acá practicás con voz sintetizada — el examen real usa grabaciones con
          acentos variados y ruido de cabina.
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
            pedir <strong>una segunda</strong> reproducción, pero <strong>nunca una tercera</strong>.
            Pedir repetición seguido baja la nota de Comprehension. Acá replicamos esa regla: tenés 2
            reproducciones por audio, después se habilita el transcript para autocorregirte.
          </div>
        </div>

        {!speech.supported && (
          <div className="mt-3 rounded-lg border border-border/60 bg-muted/30 p-3 text-[12px] text-muted-foreground">
            Tu navegador no soporta síntesis de voz. Vas a ver los transcripts directamente en vez de
            escucharlos.
          </div>
        )}
        {speech.supported && !speech.hasEnglishVoice && (
          <div className="mt-3 rounded-lg border border-border/60 bg-muted/30 p-3 text-[12px] text-muted-foreground">
            No se detectó una voz en inglés en tu sistema. La reproducción puede sonar con otro acento;
            usá el transcript para verificar.
          </div>
        )}

        {/* Tabs */}
        <div className="mt-7 flex gap-1.5 flex-wrap">
          <TabBtn active={tab === "2a"} onClick={() => setTab("2a")} label="2A · Short Audios" />
          <TabBtn active={tab === "2b"} onClick={() => setTab("2b")} label="2B · Long Audios" />
          <TabBtn active={tab === "2c"} onClick={() => setTab("2c")} label="2C · Interactive Response" />
        </div>

        <div className="mt-6">
          {tab === "2a" && <ShortAudiosSection speech={speech} />}
          {tab === "2b" && <LongAudiosSection speech={speech} />}
          {tab === "2c" && <InteractiveSection speech={speech} />}
        </div>
      </div>
    </AppLayout>
  )
}

type Speech = ReturnType<typeof useSpeech>

// ─── Player reutilizable (regla 1 + 1 reproducciones) ────────────────────────
function AudioPlayer({
  speech,
  transcript,
  label,
}: {
  speech: Speech
  transcript: string
  label?: string
}) {
  const [plays, setPlays] = useState(0)
  const maxPlays = 2
  const canPlay = plays < maxPlays

  function play() {
    if (!canPlay) return
    setPlays((p) => p + 1)
    speech.speak(transcript)
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={speech.speaking ? speech.stop : play}
        disabled={!canPlay && !speech.speaking}
        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg text-[13px] font-semibold text-white border-0 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(180deg, var(--av-violet-400) 0%, oklch(0.5 0.2 295) 100%)",
          boxShadow: "0 1px 0 rgb(255 255 255 / 18%) inset, 0 8px 20px -8px oklch(0.5 0.2 295 / 50%)",
        }}
      >
        {speech.speaking ? (
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
    </div>
  )
}

// ─── 2A · SHORT AUDIOS ───────────────────────────────────────────────────────
function ShortAudiosSection({ speech }: { speech: Speech }) {
  return (
    <>
      <SectionIntro
        text="6 mensajes cortos (5–10s). Después de cada uno, respondé mentalmente: ¿cuál era el mensaje? ¿hablaba un piloto o un controlador? No hace falta repetir palabra por palabra — sí transmitir toda la info relevante."
      />
      <div className="space-y-3">
        {SHORT_AUDIOS.map((a) => (
          <ShortAudioCard key={a.id} audio={a} speech={speech} />
        ))}
      </div>
    </>
  )
}

function ShortAudioCard({ audio, speech }: { audio: (typeof SHORT_AUDIOS)[number]; speech: Speech }) {
  const [revealed, setRevealed] = useState(false)
  return (
    <div className="rounded-xl border bg-card p-4" style={cardBorder}>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="mono text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
          Audio {audio.id} / {SHORT_AUDIOS.length}
        </div>
        <RevealBtn revealed={revealed} onClick={() => setRevealed((r) => !r)} />
      </div>
      <div className="mt-3">
        <AudioPlayer speech={speech} transcript={audio.transcript} />
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2 text-[12px] text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <HelpCircle className="h-3.5 w-3.5" /> What was the message?
        </div>
        <div className="flex items-center gap-1.5">
          <HelpCircle className="h-3.5 w-3.5" /> Pilot or controller?
        </div>
      </div>

      {revealed && (
        <div className="mt-3 rounded-lg border p-3" style={revealBox}>
          <SpeakerBadge speaker={audio.speaker} />
          <div className="mt-2 text-[12.5px] text-foreground/90 leading-relaxed">
            {audio.messageSummary}
          </div>
          <Transcript text={audio.transcript} />
        </div>
      )}
    </div>
  )
}

// ─── 2B · LONG AUDIOS ────────────────────────────────────────────────────────
function LongAudiosSection({ speech }: { speech: Speech }) {
  return (
    <>
      <SectionIntro
        text="4 mensajes largos (15–20s). Acá SÍ podés tomar notas. Después tenés que explicar la situación con el mayor detalle posible: cuál era el problema, qué pedía el hablante y todos los detalles importantes (fuel, POB, posición…). Cuanta más info correcta recuerdes, mejor la nota."
      />
      <div className="space-y-3">
        {LONG_AUDIOS.map((a) => (
          <LongAudioCard key={a.id} audio={a} speech={speech} />
        ))}
      </div>
    </>
  )
}

function LongAudioCard({ audio, speech }: { audio: (typeof LONG_AUDIOS)[number]; speech: Speech }) {
  const [revealed, setRevealed] = useState(false)
  return (
    <div className="rounded-xl border bg-card p-4" style={cardBorder}>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="mono text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
          Audio largo {audio.id} / {LONG_AUDIOS.length}
        </div>
        <RevealBtn revealed={revealed} onClick={() => setRevealed((r) => !r)} />
      </div>
      <div className="mt-3">
        <AudioPlayer speech={speech} transcript={audio.transcript} />
      </div>
      <div className="mt-2 text-[11px] text-muted-foreground flex items-center gap-1.5">
        <Lightbulb className="h-3 w-3" /> Tomá notas: problema · pedido · detalles
      </div>

      {revealed && (
        <div className="mt-3 rounded-lg border p-3.5 space-y-3" style={revealBox}>
          <SpeakerBadge speaker={audio.speaker} />
          <RevealRow label="El problema" value={audio.problem} color="var(--av-red-400)" />
          <RevealRow label="Qué pedía" value={audio.request} color="var(--av-cyan-400)" />
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
          <Transcript text={audio.transcript} />
        </div>
      )}
    </div>
  )
}

// ─── 2C · INTERACTIVE RESPONSE ───────────────────────────────────────────────
function InteractiveSection({ speech }: { speech: Speech }) {
  return (
    <>
      <SectionIntro
        text="3 situaciones cortas no rutinarias. Tras escuchar, tenés ~20s para formular preguntas que te den más información. Después, el examinador te pide recomendaciones o consejos para resolver. Se evalúa interacción natural en Plain English: preguntas relevantes + soluciones apropiadas."
      />
      <div className="space-y-3">
        {INTERACTIVE_SCENARIOS.map((s) => (
          <InteractiveCard key={s.id} scenario={s} speech={speech} />
        ))}
      </div>
    </>
  )
}

function InteractiveCard({ scenario, speech }: { scenario: (typeof INTERACTIVE_SCENARIOS)[number]; speech: Speech }) {
  const [revealed, setRevealed] = useState(false)
  return (
    <div className="rounded-xl border bg-card p-4" style={cardBorder}>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="mono text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
          Situación {scenario.id} / {INTERACTIVE_SCENARIOS.length}
        </div>
        <RevealBtn revealed={revealed} onClick={() => setRevealed((r) => !r)} labelShow="Ver modelo" labelHide="Ocultar modelo" />
      </div>
      <div className="mt-3">
        <AudioPlayer speech={speech} transcript={scenario.situation} label="Escuchar situación" />
      </div>
      <div className="mt-3 grid gap-1.5 text-[12px] text-muted-foreground">
        <div className="flex items-center gap-1.5"><HelpCircle className="h-3.5 w-3.5" /> 1) Formulá preguntas para obtener más info (~20s)</div>
        <div className="flex items-center gap-1.5"><MessageSquare className="h-3.5 w-3.5" /> 2) Dá recomendaciones para resolver</div>
      </div>

      {revealed && (
        <div className="mt-3 rounded-lg border p-3.5 space-y-3" style={revealBox}>
          <div>
            <div className="mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--av-cyan-400)] mb-1.5">
              PREGUNTAS QUE PODRÍAS HACER
            </div>
            <ul className="space-y-1">
              {scenario.suggestedQuestions.map((q) => (
                <li key={q} className="flex items-start gap-2 text-[12.5px] italic text-foreground/85">
                  <HelpCircle className="flex-shrink-0 mt-0.5 h-3.5 w-3.5 text-[var(--av-cyan-400)]" />
                  <span>"{q}"</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--av-green-400)] mb-1.5">
              RECOMENDACIONES
            </div>
            <ul className="space-y-1">
              {scenario.suggestedAdvice.map((a) => (
                <li key={a} className="flex items-start gap-2 text-[12.5px] text-foreground/85">
                  <Check className="flex-shrink-0 mt-0.5 h-3.5 w-3.5 text-[var(--av-green-400)]" strokeWidth={3} />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
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
  return (
    <p className="mb-4 text-[13px] text-foreground/75 leading-relaxed">{text}</p>
  )
}

function RevealBtn({ revealed, onClick, labelShow = "Ver respuesta", labelHide = "Ocultar" }: { revealed: boolean; onClick: () => void; labelShow?: string; labelHide?: string }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-[12px] font-semibold transition-colors"
      style={{ color: "var(--av-violet-400)" }}
    >
      {revealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
      {revealed ? labelHide : labelShow}
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
    <div className="mt-3 pt-2.5 border-t border-border/40">
      <div className="mono text-[9px] font-bold uppercase tracking-[0.14em] text-muted-foreground mb-1">
        TRANSCRIPT
      </div>
      <p className="text-[12px] italic text-muted-foreground leading-relaxed">"{text}"</p>
    </div>
  )
}
