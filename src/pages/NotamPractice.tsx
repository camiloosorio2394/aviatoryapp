import { useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import {
  AlertTriangle,
  ArrowLeft,
  BookMarked,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  Image as ImageIcon,
  ImageOff,
  ListChecks,
  Loader2,
  Maximize2,
  PencilLine,
  ShieldAlert,
  Target,
  X,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { SectionTitle } from "@/components/ui/section-title"
import { useSession } from "@/hooks/useSession"
import {
  DISCLAIMERS,
  EXERCISES,
  LEVEL_META,
  NATIONAL_NOTAMS,
  ORIGIN_META,
  TOTALS,
  accentText,
  notamImageUrl,
  readLocalProgress,
  type NationalNotam,
  type NotamExercise,
  type NotamLevel,
} from "@/lib/notam"
import { fetchNotamProgress, markNotamProgress, pushPendingLocalProgress } from "@/lib/notamProgress"
import { registrarEstudioDiario } from "@/lib/activity"

/**
 * Practica NOTAM (ruta /app/aerolinea/notam/practica).
 *
 * Dos modos sobre la misma mecanica: el usuario interpreta el NOTAM con sus
 * palabras y solo despues puede comparar con la respuesta modelo.
 *   texto  -> 16 ejercicios de EXERCISES
 *   imagen -> 14 NOTAM colombianos reales de NATIONAL_NOTAMS
 */

type Mode = "texto" | "imagen"
type LevelFilter = NotamLevel | "todos"

interface PracticeItem {
  /** Clave de progreso: "ex-<id>" o "nat-<id>" */
  key: string
  mode: Mode
  nivel: NotamLevel
  titulo: string
  consigna: string
  modelo: string
  puntos: string[]
  errores: string[]
  fuente: string
  exercise: NotamExercise | null
  national: NationalNotam | null
}

const IMAGE_CONSIGNA =
  "Describe con tus palabras qué informa este NOTAM y cuál es su impacto operacional: qué instalación o servicio afecta, dónde, desde y hasta cuándo, y qué no podrías hacer mientras esté vigente."

const TEXT_ITEMS: PracticeItem[] = EXERCISES.map((e) => ({
  key: `ex-${e.id}`,
  mode: "texto",
  nivel: e.nivel,
  titulo: e.titulo,
  consigna: e.consigna,
  modelo: e.respuesta_modelo,
  puntos: e.puntos_clave,
  errores: e.errores_tipicos ?? [],
  fuente: e.fuente,
  exercise: e,
  national: null,
}))

const IMAGE_ITEMS: PracticeItem[] = NATIONAL_NOTAMS.map((n) => ({
  key: `nat-${n.id}`,
  mode: "imagen",
  nivel: n.nivel,
  titulo: `${n.serie_numero} · ${n.aerodromo}`,
  consigna: IMAGE_CONSIGNA,
  modelo: n.decodificacion,
  puntos: n.puntos_clave,
  errores: n.errores_tipicos ?? [],
  fuente: n.fuente_imagen,
  exercise: null,
  national: n,
}))

const LEVEL_FILTERS: LevelFilter[] = ["todos", "basico", "intermedio", "avanzado"]

function levelLabel(l: LevelFilter): string {
  return l === "todos" ? "Todos los niveles" : LEVEL_META[l].label
}

/** Intento en curso. Va atado a la clave del ejercicio: al cambiar de ejercicio se descarta. */
interface Attempt {
  key: string
  answer: string
  revealed: boolean
  ticked: number[]
}

const EMPTY_ATTEMPT: Attempt = { key: "", answer: "", revealed: false, ticked: [] }

export function NotamPractice() {
  const { user } = useSession()

  const [mode, setMode] = useState<Mode>("texto")
  const [level, setLevel] = useState<LevelFilter>("todos")
  const [idx, setIdx] = useState(0)
  const [attempt, setAttempt] = useState<Attempt>(EMPTY_ATTEMPT)
  const [doneKeys, setDoneKeys] = useState<string[]>(() => readLocalProgress().exercisesDone)
  const [saving, setSaving] = useState(false)
  const [zoom, setZoom] = useState(false)
  // "ancho" entra siempre: en celular abrir en tamaño natural obliga a arrastrar
  // dentro del modal antes de ver nada.
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>("ancho")

  const modeItems = mode === "texto" ? TEXT_ITEMS : IMAGE_ITEMS

  const list = useMemo(
    () => (level === "todos" ? modeItems : modeItems.filter((i) => i.nivel === level)),
    [modeItems, level]
  )

  const safeIdx = list.length > 0 ? Math.min(idx, list.length - 1) : 0
  const item: PracticeItem | null = list.length > 0 ? list[safeIdx] : null
  const itemKey = item?.key ?? ""

  const levelCounts = useMemo(() => {
    const counts: Record<LevelFilter, number> = {
      todos: modeItems.length,
      basico: 0,
      intermedio: 0,
      avanzado: 0,
    }
    for (const it of modeItems) counts[it.nivel] += 1
    return counts
  }, [modeItems])

  const doneInMode = modeItems.filter((it) => doneKeys.includes(it.key)).length
  const isDone = itemKey !== "" && doneKeys.includes(itemKey)

  // El intento solo vale para el ejercicio activo: al cambiar de ejercicio la
  // respuesta se limpia y la respuesta modelo vuelve a quedar oculta.
  const current = attempt.key === itemKey ? attempt : EMPTY_ATTEMPT
  const answer = current.answer
  const revealed = current.revealed
  const ticked = current.ticked

  // Progreso en Supabase: si falla, seguimos con el local. De paso sube lo que
  // se resolvió sin sesión, que si no se pierde al cambiar de dispositivo.
  useEffect(() => {
    const uid = user?.id
    if (!uid) return
    let cancelled = false

    void (async () => {
      const fetched = await fetchNotamProgress(uid)
      if (cancelled || !fetched) return
      const remote = await pushPendingLocalProgress(fetched)
      if (cancelled || remote.practiceDone.length === 0) return
      setDoneKeys((prev) => Array.from(new Set([...prev, ...remote.practiceDone])))
    })()

    return () => {
      cancelled = true
    }
  }, [user?.id])

  // Cerrar la imagen ampliada con la tecla Escape
  useEffect(() => {
    if (!zoom) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [zoom])

  // El nivel vuelve a "ancho" en cada apertura: es el que sirve en celular.
  function abrirZoom(): void {
    setZoomLevel("ancho")
    setZoom(true)
  }

  async function markDone(key: string): Promise<void> {
    setSaving(true)
    setDoneKeys((prev) => (prev.includes(key) ? prev : [...prev, key]))
    try {
      await markNotamProgress({ practiceId: key })
      // Resolver ejercicios cuenta como día estudiado, igual que la evaluación.
      void registrarEstudioDiario("notam-practica")
    } finally {
      setSaving(false)
    }
  }

  function changeMode(m: Mode): void {
    setMode(m)
    setIdx(0)
    setZoom(false)
  }

  function changeLevel(l: LevelFilter): void {
    setLevel(l)
    setIdx(0)
    setZoom(false)
  }

  function goTo(i: number): void {
    setIdx(i)
    setZoom(false)
  }

  function writeAnswer(value: string): void {
    setAttempt({ ...current, key: itemKey, answer: value })
  }

  function reveal(): void {
    setAttempt({ ...current, key: itemKey, revealed: true })
  }

  function toggleTick(i: number): void {
    const next = ticked.includes(i) ? ticked.filter((n) => n !== i) : [...ticked, i]
    setAttempt({ ...current, key: itemKey, ticked: next })
  }

  const pct = modeItems.length > 0 ? Math.round((doneInMode / modeItems.length) * 100) : 0

  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        <Link
          to="/app/aerolinea/notam"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a la sección NOTAM
        </Link>

        <PageHeader
          eyebrow={
            <>
              <Target className="h-3.5 w-3.5" /> NOTAM · Práctica
            </>
          }
          title="Practica interpretando NOTAM"
          subtitle={`${TOTALS.exercises} ejercicios de texto y ${TOTALS.national} NOTAM reales de Colombia. Lee el NOTAM, explícalo con tus palabras y después compara con la respuesta modelo.`}
          actions={
            <Link
              to="/app/aerolinea/notam/decodificador"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-[13px] font-semibold border border-border text-foreground hover:bg-muted transition-colors"
            >
              <BookMarked className="h-4 w-4" /> Abrir el decodificador
            </Link>
          }
        />

        {/* === CONTROLES: modo, nivel, progreso y selector === */}
        <section className="rounded-2xl surface p-5 sm:p-6">
          <div
            className="grid gap-2 sm:grid-cols-2 p-1 rounded-xl"
            style={{ background: "color-mix(in oklab, var(--border) 35%, transparent)" }}
            role="group"
            aria-label="Modo de práctica"
          >
            <ModeButton
              active={mode === "texto"}
              onClick={() => changeMode("texto")}
              icon={<FileText className="h-4 w-4" />}
              label={`Ejercicios de texto (${TOTALS.exercises})`}
            />
            <ModeButton
              active={mode === "imagen"}
              onClick={() => changeMode("imagen")}
              icon={<ImageIcon className="h-4 w-4" />}
              label={`NOTAM reales de Colombia (${TOTALS.national})`}
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-[12px] font-semibold text-muted-foreground mr-1">Nivel:</span>
            {LEVEL_FILTERS.map((l) => {
              const active = level === l
              const color = l === "todos" ? "var(--av-blue-500)" : LEVEL_META[l].color
              return (
                <button
                  key={l}
                  onClick={() => changeLevel(l)}
                  aria-pressed={active}
                  className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px] font-semibold border transition-colors"
                  style={{
                    color: active ? accentText(color) : "var(--muted-foreground)",
                    borderColor: active
                      ? `color-mix(in oklab, ${color} 45%, transparent)`
                      : "var(--border)",
                    background: active
                      ? `color-mix(in oklab, ${color} 12%, transparent)`
                      : "transparent",
                  }}
                >
                  {levelLabel(l)}
                  <span className="tabular opacity-70">{levelCounts[l]}</span>
                </button>
              )
            })}
          </div>

          <div className="mt-5">
            <div className="flex items-end justify-between gap-3">
              <div className="text-[13px] font-semibold text-foreground">
                <span className="tabular">{doneInMode}</span> de{" "}
                <span className="tabular">{modeItems.length}</span> resueltos
                <span className="text-muted-foreground font-normal">
                  {" "}
                  en {mode === "texto" ? "los ejercicios de texto" : "los NOTAM de Colombia"}
                </span>
              </div>
              <div className="text-[12px] text-muted-foreground tabular">{pct}%</div>
            </div>
            <div
              className="mt-2 h-2 rounded-full overflow-hidden"
              style={{ background: "color-mix(in oklab, var(--border) 60%, transparent)" }}
              role="progressbar"
              aria-valuenow={doneInMode}
              aria-valuemin={0}
              aria-valuemax={modeItems.length}
              aria-label="Progreso del modo activo"
            >
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${pct}%`, background: "var(--av-blue-500)" }}
              />
            </div>
          </div>

          {list.length > 0 && (
            <div className="mt-5">
              <div className="text-[12px] font-semibold text-muted-foreground mb-2">
                Salta al ejercicio que quieras
              </div>
              <div className="flex flex-wrap gap-1.5">
                {list.map((it, i) => {
                  const active = i === safeIdx
                  const done = doneKeys.includes(it.key)
                  const color = done ? "var(--av-green-400)" : "var(--av-blue-500)"
                  // En modo texto el título revela la respuesta (asunto, estado y lugar),
                  // así que ni el tooltip ni el lector de pantalla lo pueden anunciar.
                  const rotulo = it.exercise ? `Ejercicio ${i + 1}` : it.titulo
                  return (
                    <button
                      key={it.key}
                      onClick={() => goTo(i)}
                      title={rotulo}
                      aria-label={`Ir al ejercicio ${i + 1} de ${list.length}: ${rotulo}${done ? ", ya resuelto" : ""}`}
                      aria-current={active ? "true" : undefined}
                      className="relative inline-flex items-center justify-center h-9 w-9 rounded-lg text-[12px] font-semibold tabular border transition-colors"
                      style={{
                        color: active ? "white" : done ? accentText(color) : "var(--muted-foreground)",
                        background: active
                          ? color
                          : done
                            ? `color-mix(in oklab, ${color} 12%, transparent)`
                            : "transparent",
                        borderColor: active
                          ? color
                          : done
                            ? `color-mix(in oklab, ${color} 40%, transparent)`
                            : "var(--border)",
                      }}
                    >
                      {i + 1}
                      {done && !active && (
                        <Check className="absolute -top-1 -right-1 h-3 w-3" strokeWidth={3.5} />
                      )}
                    </button>
                  )
                })}
              </div>
              <div className="mt-2 text-[12px] text-muted-foreground">
                En verde los que ya marcaste como resueltos.
              </div>
            </div>
          )}
        </section>

        {/* === EJERCICIO ACTIVO === */}
        {!item ? (
          <div className="mt-6 rounded-2xl surface p-7 text-center">
            <div className="text-[17px] font-semibold tracking-[-0.01em]">
              No hay ejercicios de nivel {levelLabel(level).toLowerCase()} en este modo
            </div>
            <p className="mt-1.5 text-[13px] text-muted-foreground">
              Cambia de nivel o limpia el filtro para ver todos los ejercicios disponibles.
            </p>
            <button
              onClick={() => changeLevel("todos")}
              className="mt-4 inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-[13px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--av-blue-500)" }}
            >
              Ver todos los niveles
            </button>
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_0.85fr] items-start">
              {/* ── Columna del NOTAM ── */}
              <section className="rounded-2xl surface p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div
                      className="text-[12px] font-semibold"
                      style={{ color: accentText("var(--av-blue-500)") }}
                    >
                      {mode === "texto" ? "Ejercicio de texto" : "NOTAM real de Colombia"} {safeIdx + 1}{" "}
                      de {list.length}
                    </div>
                    {/* En los ejercicios de texto el título es la decodificación (asunto, estado
                        y lugar), así que se guarda hasta que el usuario pide la respuesta modelo.
                        En los NOTAM reales el título es serie, número y aeródromo: no revela nada. */}
                    <h2 className="mt-0.5 text-[20px] font-semibold tracking-[-0.01em] leading-tight">
                      {item.exercise && !revealed
                        ? `Ejercicio ${safeIdx + 1} de ${list.length}`
                        : item.titulo}
                    </h2>
                  </div>
                  {isDone && (
                    <span
                      className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full text-[12px] font-semibold flex-shrink-0"
                      style={{
                        color: accentText("var(--av-green-400)"),
                        background: "color-mix(in oklab, var(--av-green-400) 12%, transparent)",
                        border: "1px solid color-mix(in oklab, var(--av-green-400) 32%, transparent)",
                      }}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Resuelto
                    </span>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <LevelChip nivel={item.nivel} />
                  {item.exercise && <OriginChip exercise={item.exercise} />}
                  {item.national && (
                    <>
                      <span className="chip chip-cyan mono">{item.national.serie_numero}</span>
                      <span className="chip">{item.national.aerodromo}</span>
                    </>
                  )}
                </div>

                {/* Avisos obligatorios */}
                {item.exercise && !ORIGIN_META[item.exercise.origen].real && (
                  <Callout tone="amber" icon={<AlertTriangle className="h-4 w-4" />} className="mt-4">
                    {DISCLAIMERS.practice}
                  </Callout>
                )}
                {item.national && (
                  <Callout tone="red" icon={<ShieldAlert className="h-4 w-4" />} className="mt-4">
                    {DISCLAIMERS.national}
                  </Callout>
                )}

                {/* El NOTAM */}
                {item.exercise ? (
                  <div className="mt-5">
                    <div className="text-[12px] font-semibold text-muted-foreground mb-2">
                      Texto del NOTAM
                    </div>
                    <div
                      className="rounded-xl border overflow-x-auto"
                      style={{
                        borderColor: "color-mix(in oklab, var(--av-blue-500) 22%, transparent)",
                        background: "color-mix(in oklab, var(--av-blue-500) 6%, transparent)",
                      }}
                    >
                      <pre className="mono m-0 p-4 text-[12px] sm:text-[13px] leading-[1.7] whitespace-pre-wrap break-words text-foreground">
                        {item.exercise.notam}
                      </pre>
                    </div>
                  </div>
                ) : item.national ? (
                  <div className="mt-5">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="text-[12px] font-semibold text-muted-foreground">
                        Recorte del resumen oficial de la Aerocivil
                      </div>
                      <button
                        onClick={abrirZoom}
                        aria-label="Ampliar la imagen del NOTAM"
                        className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-[12px] font-semibold border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      >
                        <Maximize2 className="h-3.5 w-3.5" /> Ampliar
                      </button>
                    </div>
                    {/* min-w-0 corta la herencia del ancho del hijo: sin esto, el
                        min-w-[560px] de la imagen empuja la grilla y el scroll
                        horizontal se lo lleva la página entera, no el recuadro. */}
                    <div className="min-w-0">
                      <NotamImage
                        key={item.national.id}
                        national={item.national}
                        variant="card"
                        onZoom={abrirZoom}
                      />
                    </div>
                    <div className="mt-3">
                      <div className="text-[12px] font-semibold text-muted-foreground mb-1.5">
                        Transcripción
                      </div>
                      <p
                        className="mono m-0 text-[12px] leading-relaxed text-foreground/85 rounded-lg p-3 border border-border break-words"
                        style={{ background: "color-mix(in oklab, var(--border) 22%, transparent)" }}
                      >
                        {item.national.transcripcion}
                      </p>
                    </div>
                  </div>
                ) : null}

                {/* Consigna */}
                <div
                  className="mt-5 rounded-xl border p-4"
                  style={{
                    borderColor: "color-mix(in oklab, var(--av-blue-500) 28%, transparent)",
                    background: "color-mix(in oklab, var(--av-blue-500) 7%, transparent)",
                  }}
                >
                  <div
                    className="inline-flex items-center gap-1.5 text-[12px] font-semibold"
                    style={{ color: accentText("var(--av-blue-500)") }}
                  >
                    <Target className="h-3.5 w-3.5" /> Tu tarea
                  </div>
                  <p className="mt-1.5 mb-0 text-[15px] text-foreground/90 leading-relaxed">
                    {item.consigna}
                  </p>
                </div>
              </section>

              {/* ── Columna de la respuesta ── */}
              <section className="rounded-2xl surface p-5 sm:p-6">
                <SectionTitle
                  icon={PencilLine}
                  eyebrow="Tu interpretación"
                  title="Explícalo con tus palabras"
                  hint="Escribe primero, compara después. Así entrenas como en un briefing real."
                />

                <label htmlFor={`respuesta-${item.key}`} className="sr-only">
                  Tu interpretación del NOTAM
                </label>
                <textarea
                  id={`respuesta-${item.key}`}
                  value={answer}
                  onChange={(e) => writeAnswer(e.target.value)}
                  placeholder="Qué instalación o servicio afecta, dónde, desde y hasta cuándo, y qué impacto tiene para el vuelo."
                  className="w-full min-h-[180px] rounded-xl border border-border bg-background p-3.5 text-[13px] leading-relaxed text-foreground placeholder:text-muted-foreground/70 resize-y focus:outline-none focus:border-foreground/30 transition-colors"
                />

                {!revealed ? (
                  <div className="mt-4">
                    <button
                      onClick={reveal}
                      className="w-full inline-flex items-center justify-center gap-2 h-12 px-5 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
                      style={{ background: "var(--av-blue-500)" }}
                    >
                      <Eye className="h-4 w-4" /> Comparar con la respuesta modelo
                    </button>
                    <p className="mt-2 mb-0 text-[12px] text-muted-foreground leading-relaxed">
                      {answer.trim().length < 20
                        ? "Intenta escribir tu versión completa antes de comparar: es la parte que de verdad te entrena."
                        : "La respuesta modelo aparece solo cuando tú lo pides."}
                    </p>
                  </div>
                ) : (
                  <div className="mt-5 anim-fade-up">
                    <div>
                      <div
                        className="inline-flex items-center gap-1.5 text-[12px] font-semibold"
                        style={{ color: accentText("var(--av-green-400)") }}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" /> Respuesta modelo
                      </div>
                      {item.exercise && (
                        <div className="mt-1.5 text-[15px] font-semibold tracking-[-0.01em] leading-snug">
                          {item.titulo}
                        </div>
                      )}
                      <p className="mt-2 mb-0 text-[13px] text-foreground/90 leading-relaxed">
                        {item.modelo}
                      </p>
                    </div>

                    {/* Checklist autoevaluable */}
                    <div className="mt-5">
                      <div className="flex items-center gap-1.5 text-[13px] font-semibold">
                        <ListChecks className="h-4 w-4" style={{ color: "var(--av-blue-500)" }} />
                        Puntos clave
                      </div>
                      <p className="mt-1 mb-2.5 text-[12px] text-muted-foreground leading-relaxed">
                        Tilda los que sí mencionaste en tu respuesta. El conteo es orientativo, para
                        que veas qué se te escapó.
                      </p>
                      <ul className="m-0 p-0 list-none space-y-1.5">
                        {item.puntos.map((p, i) => {
                          const on = ticked.includes(i)
                          return (
                            <li key={`${itemKey}-punto-${i}`}>
                              <label
                                className="flex items-start gap-2.5 rounded-lg border p-2.5 cursor-pointer transition-colors"
                                style={{
                                  borderColor: on
                                    ? "color-mix(in oklab, var(--av-green-400) 38%, transparent)"
                                    : "var(--border)",
                                  background: on
                                    ? "color-mix(in oklab, var(--av-green-400) 9%, transparent)"
                                    : "transparent",
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={on}
                                  onChange={() => toggleTick(i)}
                                  className="mt-0.5 h-4 w-4 flex-shrink-0"
                                  style={{ accentColor: "var(--av-green-400)" }}
                                />
                                <span className="text-[13px] leading-snug text-foreground/90">{p}</span>
                              </label>
                            </li>
                          )
                        })}
                      </ul>
                      {/* Sin marcas todavía no hay nada que calificar: mostrar el resultado en
                          cero sería castigar al usuario antes de que se autoevalúe. */}
                      {ticked.length > 0 ? (
                        <ScoreHint ticked={ticked.length} total={item.puntos.length} />
                      ) : (
                        <p className="mt-3 mb-0 text-[12px] text-muted-foreground leading-relaxed">
                          Tilda los puntos que sí cubriste para ver cómo te fue.
                        </p>
                      )}
                    </div>

                    {item.errores.length > 0 && (
                      <Callout tone="amber" icon={<AlertTriangle className="h-4 w-4" />} className="mt-5">
                        <span className="font-semibold">Errores típicos en este NOTAM:</span>
                        <ul className="mt-1.5 mb-0 pl-4 space-y-1 list-disc">
                          {item.errores.map((e, i) => (
                            <li key={`${itemKey}-error-${i}`} className="leading-snug">
                              {e}
                            </li>
                          ))}
                        </ul>
                      </Callout>
                    )}

                    <div className="mt-5 pt-4 border-t border-border">
                      <div className="flex items-start gap-2 text-[12px] text-muted-foreground leading-relaxed">
                        <BookMarked className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                        <span>Fuente: {item.fuente}</span>
                      </div>

                      {isDone ? (
                        <div
                          className="mt-3 inline-flex items-center gap-1.5 h-11 px-4 rounded-xl text-[13px] font-semibold w-full justify-center"
                          style={{
                            color: accentText("var(--av-green-400)"),
                            background: "color-mix(in oklab, var(--av-green-400) 10%, transparent)",
                            border: "1px solid color-mix(in oklab, var(--av-green-400) 32%, transparent)",
                          }}
                        >
                          <CheckCircle2 className="h-4 w-4" /> Ya lo marcaste como resuelto
                        </div>
                      ) : (
                        <button
                          onClick={() => void markDone(item.key)}
                          disabled={saving}
                          className="mt-3 w-full inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                          style={{ background: "var(--av-green-400)" }}
                        >
                          {saving ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" /> Guardando
                            </>
                          ) : (
                            <>
                              <Check className="h-4 w-4" strokeWidth={3} /> Marcar como resuelto
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </section>
            </div>

            {/* === NAVEGACION === */}
            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                onClick={() => goTo(Math.max(0, safeIdx - 1))}
                disabled={safeIdx === 0}
                className="inline-flex items-center gap-1.5 h-11 px-4 rounded-xl text-[13px] font-semibold border border-border text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" /> Anterior
              </button>
              <div className="text-[13px] text-muted-foreground tabular">
                {safeIdx + 1} de {list.length}
              </div>
              <button
                onClick={() => goTo(Math.min(list.length - 1, safeIdx + 1))}
                disabled={safeIdx >= list.length - 1}
                className="inline-flex items-center gap-1.5 h-11 px-4 rounded-xl text-[13px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
                style={{ background: "var(--av-blue-500)" }}
              >
                Siguiente <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </>
        )}

        {/* === IMAGEN AMPLIADA === */}
        {zoom && item?.national && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Imagen ampliada del NOTAM ${item.national.serie_numero}`}
            onClick={() => setZoom(false)}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 p-3 sm:p-4"
            style={{ background: "rgb(11 16 32 / 82%)" }}
          >
            {/* Control de ampliación: tres niveles reales. "Ajustar al ancho" es
                el que hace usable el modal en celular. */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 rounded-xl p-1"
              style={{ background: "rgb(11 16 32 / 70%)" }}
              role="group"
              aria-label="Nivel de ampliación"
            >
              {ZOOM_LEVELS.map((lvl) => (
                <button
                  key={lvl.key}
                  onClick={() => setZoomLevel(lvl.key)}
                  aria-pressed={zoomLevel === lvl.key}
                  className="h-9 px-3 rounded-lg text-[13px] font-semibold border-0 transition-colors"
                  style={{
                    background: zoomLevel === lvl.key ? "var(--av-blue-500)" : "transparent",
                    color: zoomLevel === lvl.key ? "white" : "rgb(255 255 255 / 72%)",
                  }}
                >
                  {lvl.label}
                </button>
              ))}
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[1200px] max-h-[80vh] overflow-auto rounded-2xl p-3 sm:p-4"
              style={{ background: "rgb(255 255 255)", touchAction: "pan-x pan-y pinch-zoom" }}
            >
              <NotamImage
                key={`zoom-${item.national.id}`}
                national={item.national}
                variant="zoom"
                zoomLevel={zoomLevel}
              />
            </div>

            <button
              onClick={() => setZoom(false)}
              aria-label="Cerrar la imagen ampliada"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 inline-flex items-center justify-center h-10 w-10 rounded-full border-0 text-white"
              style={{ background: "rgb(11 16 32 / 70%)" }}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  )
}

// ─── Imagen del recorte ──────────────────────────────────────────────────────

type ZoomLevel = "ancho" | "natural" | "doble"

const ZOOM_LEVELS: { key: ZoomLevel; label: string }[] = [
  { key: "ancho", label: "Ajustar al ancho" },
  { key: "natural", label: "Tamaño real" },
  { key: "doble", label: "El doble" },
]

/** Los recortes son de 1875 x 260 px: "tamaño real" es su ancho natural. */
const ZOOM_WIDTH: Record<ZoomLevel, string> = {
  ancho: "100%",
  natural: "1875px",
  doble: "3750px",
}

interface NotamImageProps {
  national: NationalNotam
  variant: "card" | "zoom"
  zoomLevel?: ZoomLevel
  onZoom?: () => void
}

/**
 * Recorte del resumen de la Aerocivil, con los tres estados que puede tener.
 *
 * Los PNG se sirven como assets estáticos y los precachea el service worker. Si
 * un deploy viejo deja una entrada apuntando a un archivo que ya no está, antes
 * se veía un recuadro blanco vacío y el usuario no entendía qué había pasado.
 * Ahora cae a la transcripción, que es exactamente el mismo NOTAM en texto y ya
 * viene con cada registro.
 */
function NotamImage({ national, variant, zoomLevel = "ancho", onZoom }: NotamImageProps) {
  const [state, setState] = useState<"cargando" | "lista" | "falló">("cargando")
  const isCard = variant === "card"

  if (state === "falló") {
    return (
      <div
        className="rounded-xl border p-3.5"
        style={{
          borderColor: "color-mix(in oklab, var(--av-amber-400) 32%, transparent)",
          background: "color-mix(in oklab, var(--av-amber-400) 8%, transparent)",
        }}
      >
        <div className="flex items-start gap-2.5">
          <span className="flex-shrink-0 mt-0.5" style={{ color: "var(--av-amber-400)" }}>
            <ImageOff className="h-4 w-4" />
          </span>
          <p className="m-0 text-[13px] leading-relaxed text-foreground/85">
            No se pudo mostrar el recorte del resumen. Trabaja con el texto del NOTAM: dice
            exactamente lo mismo.
          </p>
        </div>
        <pre
          className="mono mt-3 mb-0 p-3 rounded-lg border border-border text-[12px] leading-relaxed whitespace-pre-wrap break-words text-foreground"
          style={{ background: "color-mix(in oklab, var(--border) 22%, transparent)" }}
        >
          {national.transcripcion}
        </pre>
      </div>
    )
  }

  const media = (
    <div className={`relative ${isCard ? "w-full min-w-[560px]" : "inline-block"}`}>
      <img
        src={notamImageUrl(national.imagen)}
        alt={national.transcripcion}
        loading={isCard ? "lazy" : "eager"}
        // Una imagen que ya está en caché puede terminar de cargar antes de que
        // React enganche onLoad: sin este chequeo el esqueleto se quedaría fijo.
        ref={(el) => {
          if (el?.complete && el.naturalWidth > 0) setState("lista")
        }}
        onLoad={() => setState("lista")}
        onError={() => setState("falló")}
        className={`block h-auto ${isCard ? "w-full rounded-md" : "max-w-none rounded-lg"}`}
        style={{
          aspectRatio: "1875 / 260",
          ...(isCard ? {} : { width: ZOOM_WIDTH[zoomLevel] }),
        }}
      />
      {state === "cargando" && (
        <div
          className={`absolute inset-0 animate-pulse ${isCard ? "rounded-md" : "rounded-lg"}`}
          style={{ background: "color-mix(in oklab, var(--muted-foreground) 16%, transparent)" }}
          aria-hidden
        />
      )}
    </div>
  )

  if (!isCard) return media

  return (
    <button
      onClick={onZoom}
      aria-label={`Ampliar la imagen del NOTAM ${national.serie_numero}`}
      className="block w-full rounded-xl border p-2.5 sm:p-3 overflow-x-auto text-left"
      style={{ background: "rgb(255 255 255)", borderColor: "var(--border)" }}
    >
      {media}
    </button>
  )
}

// ─── Piezas ──────────────────────────────────────────────────────────────────

function ModeButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: ReactNode
  label: string
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className="inline-flex items-center justify-center gap-2 h-11 px-3 rounded-lg text-[13px] sm:text-[13px] font-semibold transition-colors text-center"
      style={{
        background: active ? "var(--av-blue-500)" : "transparent",
        color: active ? "white" : "var(--muted-foreground)",
      }}
    >
      {icon}
      <span className="truncate">{label}</span>
    </button>
  )
}

function LevelChip({ nivel }: { nivel: NotamLevel }) {
  const meta = LEVEL_META[nivel]
  return (
    <span
      className="chip"
      style={{
        color: accentText(meta.color),
        background: `color-mix(in oklab, ${meta.color} 13%, transparent)`,
        borderColor: `color-mix(in oklab, ${meta.color} 32%, transparent)`,
      }}
    >
      {meta.label}
    </span>
  )
}

function OriginChip({ exercise }: { exercise: NotamExercise }) {
  const meta = ORIGIN_META[exercise.origen]
  if (!meta.real) return <span className="chip chip-amber">{meta.label}</span>
  const label =
    exercise.origen === "oficial_doc8400" ? "Ejemplo oficial del Doc 8400" : "NOTAM real histórico"
  return (
    <span className="chip chip-green">
      <Check className="h-3 w-3" strokeWidth={3} /> {label}
    </span>
  )
}

function Callout({
  tone,
  icon,
  children,
  className = "",
}: {
  tone: "amber" | "red"
  icon: ReactNode
  children: ReactNode
  className?: string
}) {
  const color = tone === "amber" ? "var(--av-amber-400)" : "var(--av-red-400)"
  return (
    <div
      className={`rounded-xl border p-3.5 flex items-start gap-2.5 ${className}`}
      style={{
        borderColor: `color-mix(in oklab, ${color} 32%, transparent)`,
        background: `color-mix(in oklab, ${color} 8%, transparent)`,
      }}
    >
      <span className="flex-shrink-0 mt-0.5" style={{ color }}>
        {icon}
      </span>
      <div className="text-[13px] text-foreground/85 leading-relaxed">{children}</div>
    </div>
  )
}

function ScoreHint({ ticked, total }: { ticked: number; total: number }) {
  const ratio = total > 0 ? ticked / total : 0
  const color =
    ratio >= 0.8 ? "var(--av-green-400)" : ratio >= 0.5 ? "var(--av-amber-400)" : "var(--av-red-400)"
  const msg =
    ratio >= 0.8
      ? "Muy bien: cubriste lo esencial del NOTAM."
      : ratio >= 0.5
        ? "Vas bien, pero repasa los puntos que te faltaron."
        : "Vuelve a leer el NOTAM y arma de nuevo tu interpretación."
  return (
    <div
      className="mt-3 rounded-lg p-3 text-[13px] leading-relaxed"
      style={{
        color: accentText(color),
        background: `color-mix(in oklab, ${color} 10%, transparent)`,
        border: `1px solid color-mix(in oklab, ${color} 28%, transparent)`,
      }}
    >
      <span className="font-semibold tabular">
        Mencionaste {ticked} de {total} puntos clave.
      </span>{" "}
      <span className="text-foreground/80">{msg}</span>
    </div>
  )
}
