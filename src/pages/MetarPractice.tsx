import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  PencilLine,
  ShieldAlert,
  Target,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { SectionTitle } from "@/components/ui/section-title"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import { registrarEstudioDiario } from "@/lib/activity"
import { LEVEL_META, accentText, type NotamLevel } from "@/lib/notam"
import {
  METAR_DISCLAIMERS,
  METAR_EXERCISES,
  readMetarProgress,
  writeMetarProgress,
} from "@/lib/metar"

/**
 * Práctica del tema METAR (ruta /app/aerolinea/meteorologia/practica).
 *
 * Misma mecánica que la práctica de NOTAM y por la misma razón: el piloto
 * interpreta el informe con sus palabras y SOLO DESPUÉS puede ver la respuesta
 * modelo. Escribir primero es lo que entrena; leer la respuesta antes de
 * intentarlo solo produce la sensación de haberla sabido.
 *
 * El progreso vive en el respaldo local con el resto del tema.
 */

type LevelFilter = NotamLevel | "todos"

const LEVEL_FILTERS: LevelFilter[] = ["todos", "basico", "intermedio", "avanzado"]

function levelLabel(l: LevelFilter): string {
  return l === "todos" ? "Todos los niveles" : LEVEL_META[l].label
}

export function MetarPractice() {
  const [level, setLevel] = useState<LevelFilter>("todos")
  const [idx, setIdx] = useState(0)
  const [answer, setAnswer] = useState("")
  const [revealed, setRevealed] = useState(false)
  const [doneKeys, setDoneKeys] = useState<string[]>(() => readMetarProgress().practiceDone)

  const list = useMemo(
    () => (level === "todos" ? METAR_EXERCISES : METAR_EXERCISES.filter((e) => e.nivel === level)),
    [level]
  )

  const levelCounts = useMemo(() => {
    const counts: Record<LevelFilter, number> = {
      todos: METAR_EXERCISES.length,
      basico: 0,
      intermedio: 0,
      avanzado: 0,
    }
    for (const e of METAR_EXERCISES) counts[e.nivel] += 1
    return counts
  }, [])

  const safeIdx = list.length > 0 ? Math.min(idx, list.length - 1) : 0
  const item = list.length > 0 ? list[safeIdx] : null
  const key = item ? `ex-${item.id}` : ""
  const isDone = key !== "" && doneKeys.includes(key)
  const doneCount = METAR_EXERCISES.filter((e) => doneKeys.includes(`ex-${e.id}`)).length
  const pct = Math.round((doneCount / METAR_EXERCISES.length) * 100)

  function irA(i: number): void {
    setIdx(i)
    setAnswer("")
    setRevealed(false)
  }

  function cambiarNivel(l: LevelFilter): void {
    setLevel(l)
    irA(0)
  }

  function marcarResuelto(): void {
    if (key === "" || doneKeys.includes(key)) return
    const next = [...doneKeys, key]
    setDoneKeys(next)
    writeMetarProgress({ practiceDone: next })
    void registrarEstudioDiario("metar-practica")
  }

  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-12 max-w-[1280px] mx-auto">
        <Link
          to="/app/aerolinea/meteorologia"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a Meteorología
        </Link>

        <PageHeader
          eyebrow={
            <>
              <Target className="h-3.5 w-3.5" /> Meteorología · Práctica
            </>
          }
          title="Practica interpretando METAR"
          subtitle={`${METAR_EXERCISES.length} informes con formato real. Léelo, explícalo con tus palabras y después compara con la respuesta modelo.`}
        />

        {/* Filtros y avance */}
        <section className="rounded-xl surface p-5 mb-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[13px] text-muted-foreground">Nivel:</span>
            {LEVEL_FILTERS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => cambiarNivel(l)}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full border text-[13px] font-medium transition-colors"
                style={
                  level === l
                    ? {
                        borderColor: "color-mix(in oklab, var(--av-blue-500) 40%, transparent)",
                        background: "color-mix(in oklab, var(--av-blue-500) 11%, transparent)",
                        color: accentText("var(--av-blue-500)"),
                      }
                    : { borderColor: "var(--border)" }
                }
              >
                {levelLabel(l)}
                <span className="tabular text-[12px] text-muted-foreground">{levelCounts[l]}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="text-[13px] text-muted-foreground">
              <span className="font-medium text-foreground tabular">
                {doneCount} de {METAR_EXERCISES.length}
              </span>{" "}
              resueltos
            </span>
            <span className="tabular text-[13px] font-medium text-muted-foreground">{pct}%</span>
          </div>
          <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full transition-[width]"
              style={{ width: `${pct}%`, background: "var(--av-blue-500)" }}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {list.map((e, i) => {
              const hecho = doneKeys.includes(`ex-${e.id}`)
              const activo = i === safeIdx
              return (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => irA(i)}
                  aria-label={`Ir al ejercicio ${i + 1} de ${list.length}${hecho ? ", ya resuelto" : ""}`}
                  className="tabular h-9 w-9 rounded-lg border text-[13px] font-medium transition-colors"
                  style={
                    activo
                      ? {
                          borderColor: "var(--av-blue-500)",
                          background: "var(--av-blue-500)",
                          color: "white",
                        }
                      : hecho
                        ? {
                            borderColor: "color-mix(in oklab, var(--av-green-400) 40%, transparent)",
                            background: "color-mix(in oklab, var(--av-green-400) 12%, transparent)",
                            color: accentText("var(--av-green-400)"),
                          }
                        : { borderColor: "var(--border)" }
                  }
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
          <p className="mt-2 text-[12px] text-muted-foreground">
            En verde los que ya marcaste como resueltos.
          </p>
        </section>

        {item && (
          <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
            {/* El informe */}
            <section className="rounded-xl surface p-5 sm:p-6">
              <div className="text-[12px] font-medium" style={{ color: accentText("var(--av-blue-500)") }}>
                Ejercicio {safeIdx + 1} de {list.length}
              </div>
              <h2 className="mt-1 text-[20px] font-semibold tracking-[-0.02em]">{item.titulo}</h2>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="chip">{LEVEL_META[item.nivel].label}</span>
                {isDone && (
                  <span className="chip chip-green">
                    <CheckCircle2 className="h-3 w-3" /> Resuelto
                  </span>
                )}
              </div>

              <div
                className="mt-4 rounded-lg border-l-[3px] border-y border-r p-3.5 flex items-start gap-2.5"
                style={{
                  borderColor: "color-mix(in oklab, var(--av-amber-400) 26%, transparent)",
                  borderLeftColor: "color-mix(in oklab, var(--av-amber-400) 55%, transparent)",
                  background: "color-mix(in oklab, var(--av-amber-400) 7%, transparent)",
                }}
              >
                <ShieldAlert
                  className="shrink-0 mt-0.5 h-4 w-4"
                  style={{ color: accentText("var(--av-amber-400)", 75) }}
                  aria-hidden
                />
                <p className="m-0 text-[12px] leading-relaxed text-foreground/85">
                  {METAR_DISCLAIMERS.practice}
                </p>
              </div>

              <div className="mt-4 text-[12px] font-medium text-muted-foreground">El informe</div>
              <pre className="mt-1.5 mb-0 overflow-x-auto rounded-lg border border-border bg-muted/40 px-4 py-3.5">
                <code className="mono block text-[13px] leading-[1.7] whitespace-pre-wrap break-words">
                  {item.metar}
                </code>
              </pre>

              <div
                className="mt-4 rounded-lg p-4"
                style={{ background: "color-mix(in oklab, var(--av-blue-500) 7%, transparent)" }}
              >
                <div
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
                  style={{ color: accentText("var(--av-blue-500)") }}
                >
                  <Target className="h-3.5 w-3.5" /> Tu tarea
                </div>
                <p className="mt-1 mb-0 text-[15px] leading-relaxed">{item.consigna}</p>
              </div>
            </section>

            {/* Tu respuesta */}
            <section className="rounded-xl surface p-5 sm:p-6">
              <SectionTitle
                icon={PencilLine}
                eyebrow="Tu interpretación"
                title="Explícalo con tus palabras"
                hint="Escribe primero y compara después. Así entrenas como en un briefing real."
              />
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={7}
                placeholder="Dónde y cuándo, cómo sopla, cuánto ves, qué tapa, qué números, y qué decide todo eso."
                className="w-full rounded-lg border border-border bg-card px-3.5 py-3 text-[15px] leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-[var(--av-blue-500)]"
              />

              {!revealed ? (
                <>
                  <button
                    type="button"
                    onClick={() => setRevealed(true)}
                    className={appButtonClass({ size: "lg" }, "mt-3 w-full")}
                    style={appButtonStyle()}
                  >
                    <Eye className="h-4 w-4" /> Comparar con la respuesta modelo
                  </button>
                  <p className="mt-2 text-[12px] text-muted-foreground leading-relaxed">
                    Intenta escribir tu versión completa antes de comparar: es la parte que de verdad
                    te entrena.
                  </p>
                </>
              ) : (
                <div className="mt-4">
                  <div className="text-[12px] font-medium text-muted-foreground">
                    Respuesta modelo
                  </div>
                  <p className="mt-1.5 text-[15px] leading-relaxed">{item.respuesta_modelo}</p>

                  <div className="mt-4 text-[12px] font-medium text-muted-foreground">
                    Puntos clave
                  </div>
                  <ul className="mt-1.5 pl-5 list-disc flex flex-col gap-1.5">
                    {item.puntos_clave.map((p, i) => (
                      <li key={i} className="text-[13px] leading-relaxed">
                        {p}
                      </li>
                    ))}
                  </ul>

                  {item.errores_tipicos && item.errores_tipicos.length > 0 && (
                    <>
                      <div
                        className="mt-4 text-[12px] font-medium"
                        style={{ color: accentText("var(--av-amber-400)") }}
                      >
                        Errores típicos
                      </div>
                      <ul className="mt-1.5 pl-5 list-disc flex flex-col gap-1.5">
                        {item.errores_tipicos.map((p, i) => (
                          <li key={i} className="text-[13px] leading-relaxed">
                            {p}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <div className="mt-4 pt-3.5 border-t border-border">
                    {isDone ? (
                      <div
                        className="inline-flex items-center gap-1.5 text-[13px] font-medium"
                        style={{ color: accentText("var(--av-green-400)") }}
                      >
                        <CheckCircle2 className="h-4 w-4" /> Ya lo marcaste como resuelto
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={marcarResuelto}
                        className={appButtonClass({ variant: "secondary" })}
                      >
                        <Check className="h-4 w-4" strokeWidth={3} /> Marcar como resuelto
                      </button>
                    )}
                  </div>
                </div>
              )}
            </section>
          </div>
        )}

        {/* Navegación */}
        <div className="mt-6 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => irA(Math.max(0, safeIdx - 1))}
            disabled={safeIdx === 0}
            className={appButtonClass({ variant: "secondary" }, "disabled:opacity-40")}
          >
            <ChevronLeft className="h-4 w-4" /> Anterior
          </button>
          <span className="tabular text-[13px] text-muted-foreground">
            {safeIdx + 1} de {list.length}
          </span>
          <button
            type="button"
            onClick={() => irA(Math.min(list.length - 1, safeIdx + 1))}
            disabled={safeIdx >= list.length - 1}
            className={appButtonClass({ variant: "secondary" }, "disabled:opacity-40")}
          >
            Siguiente <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
