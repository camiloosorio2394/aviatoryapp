import { useMemo, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Sparkles, ArrowRight, ArrowLeft, Loader2, Check, X, Play, Pause,
  Radio, BookOpen, Gauge, Headphones,
} from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { AppLayout } from "@/components/layout/AppLayout"
import {
  buildInitialTest, gradeItem, estimateIcaoLevel,
  type BuiltTest, type GradedAnswer,
} from "@/lib/initialTest"

type Phase = "intro" | "run" | "result"

export function TestInicial() {
  const { user } = useSession()
  const navigate = useNavigate()
  const [phase, setPhase] = useState<Phase>("intro")
  const [building, setBuilding] = useState(false)
  const [test, setTest] = useState<BuiltTest | null>(null)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [grading, setGrading] = useState(false)
  const [results, setResults] = useState<Record<string, GradedAnswer>>({})

  async function start() {
    setBuilding(true)
    try {
      const t = await buildInitialTest()
      if (t.items.length === 0) {
        toast.error("Todavía no hay preguntas cargadas para el test.")
        return
      }
      setTest(t)
      setIndex(0)
      setSelected(null)
      setResults({})
      setPhase("run")
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "No pudimos armar el test")
    } finally {
      setBuilding(false)
    }
  }

  const item = test?.items[index]
  const graded = item ? results[item.uid] : undefined
  const isLast = test ? index === test.items.length - 1 : false

  async function choose(letter: string) {
    if (!item || graded || grading) return
    setSelected(letter)
    setGrading(true)
    const g = await gradeItem(item, letter)
    setResults((r) => ({ ...r, [item.uid]: g }))
    setGrading(false)
  }

  function next() {
    if (isLast) { setPhase("result"); return }
    setIndex((i) => i + 1)
    setSelected(null)
  }

  if (phase === "intro") return <Intro onStart={start} building={building} />
  if (phase === "result" && test) return <Result test={test} results={results} user={user} navigate={navigate} />

  // RUN
  if (!test || !item) return null
  const total = test.items.length
  const answeredCount = Object.keys(results).length

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[760px] mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="text-[13px] font-semibold" style={{ color: item.area === "icao" ? "var(--av-blue-500)" : "#7C3AED" }}>
            {item.area === "icao" ? <span className="inline-flex items-center gap-1.5"><Radio className="h-3.5 w-3.5" /> Inglés ICAO</span>
              : <span className="inline-flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" /> {item.areaLabel}</span>}
          </div>
          <div className="tabular-nums text-[13px] font-semibold text-muted-foreground">
            {index + 1} / {total}
          </div>
        </div>

        {/* progress */}
        <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-7">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(answeredCount / total) * 100}%`, background: "var(--av-blue-500)" }} />
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          {item.audioUrl && <AudioItem url={item.audioUrl} />}
          {item.context && <p className="text-[13.5px] text-muted-foreground italic mb-3">{item.context}</p>}
          <h2 className="text-[18px] font-bold tracking-[-0.01em] leading-snug">{item.prompt}</h2>

          <div className="mt-5 space-y-2.5">
            {item.options.map((o) => {
              const isSel = selected === o.letter
              const showCorrect = graded && o.letter === graded.correctAnswer
              const showWrong = graded && isSel && !graded.correct
              return (
                <button
                  key={o.letter}
                  onClick={() => choose(o.letter)}
                  disabled={!!graded || grading}
                  className="w-full text-left flex items-start gap-3 rounded-xl border p-3.5 transition-colors disabled:cursor-default"
                  style={{
                    borderColor: showCorrect ? "#047857" : showWrong ? "#DC2626" : isSel ? "var(--av-blue-500)" : "var(--border)",
                    background: showCorrect ? "color-mix(in oklab, #047857 8%, transparent)" : showWrong ? "color-mix(in oklab, #DC2626 8%, transparent)" : isSel ? "color-mix(in oklab, var(--av-blue-500) 6%, transparent)" : "transparent",
                  }}
                >
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[12px] font-bold tabular-nums"
                    style={{
                      background: showCorrect ? "#047857" : showWrong ? "#DC2626" : "color-mix(in oklab, var(--av-blue-500) 12%, transparent)",
                      color: showCorrect || showWrong ? "#fff" : "var(--av-blue-500)",
                    }}
                  >
                    {showCorrect ? <Check className="h-3.5 w-3.5" /> : showWrong ? <X className="h-3.5 w-3.5" /> : o.letter}
                  </span>
                  <span className="text-[14.5px] text-foreground leading-snug pt-0.5">{o.text}</span>
                </button>
              )
            })}
          </div>

          {graded && (
            <div className="mt-4 rounded-xl border border-border bg-muted/30 p-3.5">
              <div className="text-[13px] font-semibold mb-1" style={{ color: graded.correct ? "#047857" : "#DC2626" }}>
                {graded.correct ? "¡Correcto!" : "Incorrecto"}
              </div>
              {graded.explanation && <p className="text-[13.5px] text-muted-foreground leading-relaxed">{graded.explanation}</p>}
            </div>
          )}

          {grading && !graded && (
            <div className="mt-4 flex items-center gap-2 text-[13px] text-muted-foreground"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Verificando…</div>
          )}
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={next}
            disabled={!graded}
            className="inline-flex items-center gap-1.5 h-11 px-6 rounded-xl text-[15px] font-semibold text-white disabled:opacity-40 transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--av-blue-500)" }}
          >
            {isLast ? "Ver resultado" : "Siguiente"} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </AppLayout>
  )
}

function AudioItem({ url }: { url: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [plays, setPlays] = useState(0)
  function toggle() {
    if (!audioRef.current) {
      const a = new Audio(url)
      a.onended = () => { setPlaying(false); setPlays((p) => p + 1) }
      audioRef.current = a
    }
    const a = audioRef.current
    if (playing) { a.pause(); setPlaying(false) }
    else if (plays < 2) { a.currentTime = 0; void a.play(); setPlaying(true) }
  }
  return (
    <div className="mb-4 flex items-center gap-3">
      <button
        onClick={toggle}
        disabled={plays >= 2 && !playing}
        className="inline-flex items-center gap-2 h-10 px-4 rounded-xl text-[14px] font-semibold text-white disabled:opacity-40"
        style={{ background: "var(--av-blue-500)" }}
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />} {playing ? "Pausar" : "Reproducir"}
      </button>
      <span className="inline-flex items-center gap-1.5 text-[12.5px] text-muted-foreground"><Headphones className="h-3.5 w-3.5" /> {plays}/2 reproducciones</span>
    </div>
  )
}

function Intro({ onStart, building }: { onStart: () => void; building: boolean }) {
  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[760px] mx-auto">
        <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-7 sm:p-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl mb-4" style={{ background: "linear-gradient(135deg, var(--av-blue-400), var(--av-blue-500))" }}>
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>Test inicial · diagnóstico</div>
          <h1 className="mt-1.5 text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.05]">
            ¿Por dónde estás parado hoy?
          </h1>
          <p className="mt-3 text-[16px] text-muted-foreground leading-relaxed">
            Un diagnóstico rápido para personalizar tu ruta: unas preguntas de <strong className="text-foreground">inglés ICAO</strong> (incluye 1 de audio) y <strong className="text-foreground">2 por cada materia</strong> del examen PCA. Al terminar te damos tu <strong className="text-foreground">Nivel Inicial estimado</strong> y por dónde conviene empezar.
          </p>
        </section>

        <div className="mt-5 grid sm:grid-cols-3 gap-3">
          {[
            { icon: Radio, t: "Inglés ICAO", d: "Lectura + 1 audio" },
            { icon: BookOpen, t: "Materias PCA", d: "2 por materia" },
            { icon: Gauge, t: "~15 min", d: "Lo podés saltar" },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-card p-4">
              <c.icon className="h-5 w-5 mb-2" style={{ color: "var(--av-blue-500)" }} />
              <div className="text-[14px] font-bold">{c.t}</div>
              <div className="text-[12.5px] text-muted-foreground">{c.d}</div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border p-4 text-[13px] text-muted-foreground" style={{ borderColor: "color-mix(in oklab, var(--av-blue-500) 22%, transparent)", background: "color-mix(in oklab, var(--av-blue-500) 5%, transparent)" }}>
          El nivel ICAO de este test es <strong className="text-foreground">estimado</strong>. El oficial sale del <strong className="text-foreground">simulacro TEA</strong> (hablado), que podés hacer cuando quieras.
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={onStart}
            disabled={building}
            className="inline-flex items-center gap-2 h-12 px-7 rounded-xl text-[15px] font-semibold text-white disabled:opacity-60 transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--av-blue-500)" }}
          >
            {building ? <><Loader2 className="h-4 w-4 animate-spin" /> Armando tu test…</> : <>Empezar el test <ArrowRight className="h-4 w-4" /></>}
          </button>
          <Link to="/app" className="text-[14px] font-semibold text-muted-foreground hover:text-foreground transition-colors">
            Saltar por ahora
          </Link>
        </div>
      </div>
    </AppLayout>
  )
}

function Result({
  test, results, user, navigate,
}: {
  test: BuiltTest
  results: Record<string, GradedAnswer>
  user: ReturnType<typeof useSession>["user"]
  navigate: ReturnType<typeof useNavigate>
}) {
  const [saving, setSaving] = useState(false)

  const { estimate, perSubject, weakest } = useMemo(() => {
    const graded = Object.values(results)
    const icao = graded.filter((g) => g.area === "icao")
    const icaoCorrect = icao.filter((g) => g.correct).length
    const est = estimateIcaoLevel(icaoCorrect, test.icaoCount)
    const bySub = new Map<string, { correct: number; total: number; label: string }>()
    for (const s of test.subjects) bySub.set(s.slug, { correct: 0, total: 0, label: s.label })
    for (const it of test.items) {
      if (it.area === "icao") continue
      const e = bySub.get(it.area)
      if (!e) continue
      e.total += 1
      if (results[it.uid]?.correct) e.correct += 1
    }
    const arr = [...bySub.entries()].map(([slug, v]) => ({ slug, ...v, pct: v.total ? Math.round((v.correct / v.total) * 100) : 0 }))
    const byPct = [...arr].sort((a, b) => a.pct - b.pct)
    const byName = [...arr].sort((a, b) => a.label.localeCompare(b.label))
    return { estimate: est, perSubject: byName, weakest: byPct[0] ?? null }
  }, [results, test])

  async function save() {
    if (!user || estimate == null) { navigate("/app"); return }
    setSaving(true)
    try {
      await supabase.from("pilot_state").upsert({
        user_id: user.id,
        icao_english_level: estimate,
        updated_at: new Date().toISOString(),
      })
      toast.success("Listo, guardamos tu Nivel Inicial ✈️")
      navigate("/app")
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "No pudimos guardar")
      setSaving(false)
    }
  }

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[760px] mx-auto">
        <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>Test inicial · resultado</div>
        <h1 className="mt-1.5 text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.05]">Tu punto de partida</h1>

        {/* ICAO estimate */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 flex items-center gap-5">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl flex-shrink-0" style={{ background: "linear-gradient(135deg, var(--av-blue-400), var(--av-blue-500))" }}>
            <Radio className="h-7 w-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-muted-foreground">Nivel Inicial · Inglés ICAO (estimado)</div>
            <div className="text-[28px] font-extrabold tracking-[-0.03em]">
              {estimate != null ? `Nivel ${estimate}` : "Sin datos"}
            </div>
            <p className="text-[12.5px] text-muted-foreground">
              Estimado. El oficial sale del{" "}
              <Link to="/app/icao/simulacro" className="font-semibold" style={{ color: "var(--av-blue-500)" }}>simulacro TEA →</Link>
            </p>
          </div>
        </div>

        {/* Per subject */}
        {perSubject.length > 0 && (
          <div className="mt-5 rounded-2xl border border-border bg-card p-6">
            <div className="text-[13px] font-semibold mb-3" style={{ color: "var(--av-blue-500)" }}>Por materia</div>
            <div className="space-y-2.5">
              {perSubject.map((s) => (
                <div key={s.slug} className="grid items-center gap-3" style={{ gridTemplateColumns: "1fr 90px auto" }}>
                  <span className="text-[13.5px] font-medium truncate">{s.label}</span>
                  <div className="relative h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.pct >= 70 ? "#047857" : s.pct >= 40 ? "#B45309" : "#DC2626" }} />
                  </div>
                  <span className="tabular-nums text-[12.5px] font-semibold text-muted-foreground text-right">{s.correct}/{s.total}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendation */}
        {weakest && weakest.total > 0 && (
          <Link
            to={`/app/pca/quiz/${weakest.slug}?module=pca&count=10`}
            className="mt-5 flex items-center justify-between gap-3 rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
            style={{ borderColor: "color-mix(in oklab, var(--av-blue-500) 30%, transparent)", background: "color-mix(in oklab, var(--av-blue-500) 5%, transparent)" }}
          >
            <div>
              <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>Empezá por acá</div>
              <div className="mt-0.5 text-[16px] font-bold tracking-[-0.01em]">{weakest.label} es tu materia más floja</div>
              <div className="text-[13px] text-muted-foreground">Hacé un quiz de 10 para reforzarla.</div>
            </div>
            <ArrowRight className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
          </Link>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 h-12 px-7 rounded-xl text-[15px] font-semibold text-white disabled:opacity-60 transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--av-blue-500)" }}
          >
            {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Guardando…</> : <>Guardar y continuar <ArrowRight className="h-4 w-4" /></>}
          </button>
          <Link to="/app/icao/simulacro" className="text-[14px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
            Hacer el simulacro TEA (oficial)
          </Link>
        </div>

        <Link to="/app" className="mt-6 inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Volver al dashboard
        </Link>
      </div>
    </AppLayout>
  )
}
