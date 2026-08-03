import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowRight,
  PlayCircle,
  Star,
  Clock,
  Headphones,
  Play,
  Pause,
  GraduationCap,
  Brain,
  Video,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Hero estilo plataforma de cursos (Platzi / Domestika / Coursera) para pilotos.
 * Izquierda: propuesta de valor + CTA + prueba social. Derecha: réplica en vivo
 * de la pantalla del Simulacro TEA (producto real, no mockup genérico) con
 * cronómetro corriendo y REC pulsando + mini rows de los otros cursos.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
      {/* fondo sutil, calmo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[var(--surface-soft,transparent)]" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
        {/* ── Copy ── */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[13px] font-medium">
            <span className="flex items-center gap-0.5 text-amber-500">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </span>
            <span className="text-muted-foreground">La escuela de los pilotos de LATAM</span>
          </div>

          <h1 className="mt-5 text-[2.6rem] sm:text-6xl font-extrabold tracking-[-0.035em] leading-[1.04]">
            De estudiante a{" "}
            <span className="text-gradient-gold">piloto de aerolínea</span>
          </h1>

          <p className="mt-5 text-[17px] sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Cursos, simulacros y práctica guiada para aprobar tus chequeos, llegar a tu nivel de
            inglés ICAO y entrar a una aerolínea. Aprende a tu ritmo, paso a paso.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
            <Button asChild size="lg" className="rounded-full text-base px-7 h-12 font-semibold">
              <Link to="/login?mode=signup">
                Empieza gratis <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full text-base px-6 h-12 font-semibold">
              <a href="#como-funciona">
                <PlayCircle className="mr-2 h-5 w-5" /> Ver cómo funciona
              </a>
            </Button>
          </div>

          {/* Aquí iba una fila de avatares y "+2.000 pilotos ya estudian aquí".
              Ni los pilotos ni la cifra existían. Vuelve cuando haya un número
              real que valga la pena enseñar. */}

          <div className="mt-7 flex items-center justify-center lg:justify-start gap-x-4 gap-y-1.5 flex-wrap text-[13px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-500" /> 7 días gratis</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-500" /> Sin tarjeta</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-500" /> Cancelas cuando quieras</span>
          </div>
        </div>

        {/* ── Deck de course cards ── */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* card de fondo (decorativa) */}
          <div aria-hidden className="absolute -right-3 top-6 hidden sm:block w-[88%] h-[88%] rounded-2xl border border-border bg-card/60 rotate-3" />
          <div aria-hidden className="absolute -left-3 top-3 hidden sm:block w-[88%] h-[88%] rounded-2xl border border-border bg-card/60 -rotate-2" />

          {/* card principal: réplica en vivo del Simulacro TEA (el player sí funciona) */}
          <div className="relative rounded-2xl border border-border bg-card overflow-hidden shadow-[0_24px_60px_-24px_rgb(0_0_0_/_22%)]">
            <div className="p-5">
              {/* header del examen: parte + REC + cronómetro */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-[12.5px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
                  Simulacro TEA · Part 2
                </span>
                <span className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-bold" style={{ color: "var(--av-red-400)" }}>
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--av-red-400)" }} /> REC
                  </span>
                  <span className="inline-flex items-center gap-1 tabular-nums text-[12.5px] text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> <ExamTimer />
                  </span>
                </span>
              </div>
              <div className="mt-2.5 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full" style={{ width: "58%", background: "var(--av-blue-500)" }} />
              </div>
              <div className="mt-1.5 text-[11.5px] text-muted-foreground">Pregunta 14 de 24</div>

              {/* tarjeta de pregunta con audio */}
              <div className="mt-4 rounded-xl border border-border p-4">
                <div className="flex items-center gap-2 text-[12.5px] text-muted-foreground">
                  <Headphones className="h-4 w-4 flex-shrink-0" style={{ color: "var(--av-blue-500)" }} />
                  Long message: take notes and explain the situation
                </div>
                <HeroExamPlayer />
                <div className="mt-3 space-y-1 text-[12.5px] text-muted-foreground">
                  <div className="flex items-start gap-1.5">
                    <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--av-blue-500)" }} /> What was the problem?
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--av-blue-500)" }} /> What were they requesting or advising?
                  </div>
                </div>
              </div>

              {/* footer: nivel objetivo + siguiente */}
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-[12px] text-muted-foreground">
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-md text-[11.5px] font-bold"
                    style={{ background: "color-mix(in oklab, var(--av-blue-500) 14%, transparent)", color: "var(--av-blue-500)" }}
                  >
                    4
                  </span>
                  Nivel objetivo: ICAO 4
                </span>
                <span className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg text-[13.5px] font-semibold text-white" style={{ background: "var(--av-blue-500)" }}>
                  Siguiente <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>

          {/* mini course rows flotando (otros cursos) */}
          <div className="mt-4 grid grid-cols-3 gap-2.5">
            <MiniCourse icon={GraduationCap} color="#4338CA" label="Examen PCA" pct={48} />
            <MiniCourse icon={Brain} color="#B45309" label="Psicotécnicas" pct={20} />
            <MiniCourse icon={Video} color="#0E7490" label="Entrevistas" pct={10} />
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Player funcional con un audio REAL del examen (bucket público icao-audio,
 * el mismo que usa IcaoComprehension). El visitante escucha un mensaje ATC
 * auténtico antes de registrarse. preload="none": no pesa hasta el click.
 */
const SAMPLE_AUDIO_URL =
  "https://gvwqmfxphsbmbrhyjcmk.supabase.co/storage/v1/object/public/icao-audio/long/07-spillage-ramp.wav"

function HeroExamPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [pct, setPct] = useState(0)

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) void a.play().catch(() => {})
    else a.pause()
  }

  return (
    <div className="mt-3 flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2">
      <audio
        ref={audioRef}
        src={SAMPLE_AUDIO_URL}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPct(0)}
        onTimeUpdate={(e) => {
          const a = e.currentTarget
          if (a.duration > 0) setPct((a.currentTime / a.duration) * 100)
        }}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pausar el audio de ejemplo" : "Escuchar un audio real del examen"}
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-white transition-transform hover:scale-105 active:scale-95"
        style={{ background: "var(--av-blue-500)" }}
      >
        {playing ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
      </button>
      <span className="relative h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
        <span
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${pct}%`, background: "var(--av-blue-500)" }}
        />
      </span>
      <span className="text-[11.5px] text-muted-foreground whitespace-nowrap">1 de 2</span>
    </div>
  )
}

/** Cronómetro decorativo del simulacro: arranca en 14:32 y corre en vivo. */
function ExamTimer() {
  const [seconds, setSeconds] = useState(14 * 60 + 32)
  useEffect(() => {
    const id = setInterval(() => setSeconds((v) => v + 1), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <>
      {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
    </>
  )
}

function MiniCourse({ icon: Icon, color, label, pct }: { icon: React.ComponentType<{ className?: string }>; color: string; label: string; pct: number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `color-mix(in oklab, ${color} 16%, transparent)`, color }}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="mt-2 text-[12.5px] font-semibold leading-tight truncate">{label}</div>
      <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}
