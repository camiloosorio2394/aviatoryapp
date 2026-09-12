import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Check, Loader2, Map as MapIcon, Trophy, Sparkles, ArrowRight, Target, BookOpen, Clock, RotateCcw } from "lucide-react"
import { toast } from "sonner"
import {
  desmarcarItem,
  marcarItem,
  traerRuta,
  type Checklist,
  type ChecklistItem,
  type PilotStage,
} from "@/services/ruta"
import { reportarError } from "@/lib/errores"
import { useSession } from "@/hooks/useSession"
import { Button } from "@/components/ui/button"
import { EstadoError } from "@/components/EstadoError"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import { PageHeader } from "@/components/ui/page-header"
import { SectionTitle } from "@/components/ui/section-title"

const STAGE_LABEL: Record<PilotStage, string> = {
  student_ppl: "Estudiante PPL",
  ppl: "Piloto Privado",
  cpl_in_progress: "Cursando CPL",
  cpl_ready: "Piloto Comercial",
  hour_building: "Hour Building",
  instructor: "Instructor de Vuelo",
  airline_candidate: "Candidato a Aerolínea",
}

const STAGE_ORDER: PilotStage[] = [
  "student_ppl",
  "ppl",
  "cpl_in_progress",
  "cpl_ready",
  "hour_building",
  "instructor",
  "airline_candidate",
]

export function Route() {
  const { user } = useSession()
  const [stage, setStage] = useState<PilotStage | null>(null)
  const [checklist, setChecklist] = useState<Checklist | null>(null)
  const [items, setItems] = useState<ChecklistItem[]>([])
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState(true)
  /** No se pudo leer la etapa o la checklist: se ofrece reintentar. */
  const [fallo, setFallo] = useState(false)
  const [intento, setIntento] = useState(0)
  const [togglingId, setTogglingId] = useState<number | null>(null)

  useEffect(() => {
    if (!user) return
    let cancelled = false

    async function load() {
      try {
        const ruta = await traerRuta(user!.id)
        if (cancelled) return
        setStage(ruta.etapa)
        setChecklist(ruta.checklist)
        setItems(ruta.items)
        setCompletedIds(ruta.completados)
      } catch (err) {
        reportarError("ruta", err)
        if (!cancelled) setFallo(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [user, intento])

  async function toggleItem(item: ChecklistItem) {
    if (!user || togglingId === item.id) return
    setTogglingId(item.id)
    const isCompleted = completedIds.has(item.id)
    setCompletedIds((prev) => {
      const next = new Set(prev)
      if (isCompleted) next.delete(item.id)
      else next.add(item.id)
      return next
    })

    try {
      if (isCompleted) {
        await desmarcarItem(user.id, item.id)
      } else {
        await marcarItem(user.id, item.id)
        if (item.title.includes("🎉")) {
          toast.success("Hito conseguido")
        }
      }
    } catch (err) {
      setCompletedIds((prev) => {
        const next = new Set(prev)
        if (isCompleted) next.add(item.id)
        else next.delete(item.id)
        return next
      })
      toast.error(err instanceof Error ? err.message : "No pudimos guardar")
    } finally {
      setTogglingId(null)
    }
  }

  const categories = useMemo(() => {
    const map = new Map<string, ChecklistItem[]>()
    for (const item of items) {
      const cat = item.category ?? "General"
      if (!map.has(cat)) map.set(cat, [])
      map.get(cat)!.push(item)
    }
    return Array.from(map.entries())
  }, [items])

  const completedCount = items.filter((i) => completedIds.has(i.id)).length
  const totalCount = items.length
  const percent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)
  const allDone = percent === 100 && totalCount > 0

  if (loading) {
    return (
      <>
        <div className="px-6 py-12 max-w-4xl mx-auto animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-32 bg-muted rounded-2xl" />
          <div className="h-64 bg-muted rounded-2xl" />
        </div>
      </>
    )
  }

  if (fallo) {
    return (
      <div className="px-6 py-12 max-w-4xl mx-auto">
        <EstadoError
          titulo="No pudimos cargar tu ruta"
          mensaje="Revisa tu conexión e inténtalo de nuevo. Tu avance está guardado."
          acciones={
            <button
              type="button"
              onClick={() => {
                setFallo(false)
                setLoading(true)
                setIntento((n) => n + 1)
              }}
              className={appButtonClass({ size: "lg" })}
              style={appButtonStyle()}
            >
              <RotateCcw className="h-4 w-4" /> Intentar de nuevo
            </button>
          }
        />
      </div>
    )
  }

  if (!stage) {
    return (
      <>
        <div className="px-6 py-12 max-w-2xl mx-auto text-center">
          <MapIcon className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
          <h2 className="text-xl font-semibold">Completa tu perfil primero</h2>
          <p className="mt-2 text-muted-foreground">
            Para mostrarte una ruta personalizada necesitamos saber tu etapa.
          </p>
          <Button asChild className="mt-6 rounded-full">
            <Link to="/onboarding">Ir al onboarding</Link>
          </Button>
        </div>
      </>
    )
  }

  if (!checklist) {
    return (
      <>
        <div className="px-4 sm:px-7 py-9 sm:py-11 pb-20 max-w-[1480px] mx-auto">
          <PageHeader
            eyebrow={
              <>
                <MapIcon className="h-3.5 w-3.5" /> Mi ruta
              </>
            }
            title="Tu ruta para esta etapa está en camino"
            subtitle="Estamos armando el checklist de esta etapa. Mientras tanto, hay dos cosas que sí puedes adelantar hoy y que cuentan igual."
          />
          <div className="grid gap-4 sm:grid-cols-2 max-w-[840px]">
            <Link
              to="/app/pca"
              className="rounded-2xl surface p-5 card-apple block"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: "color-mix(in oklab, var(--av-blue-500) 14%, transparent)" }}
              >
                <BookOpen className="h-5 w-5" style={{ color: "var(--av-blue-500)" }} />
              </span>
              <div className="mt-3 text-[15px] font-semibold">Practica el examen PCA</div>
              <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
                El banco por materia ya está cargado y cada quiz te explica lo que falles.
              </p>
            </Link>
            <Link
              to="/app/logbook"
              className="rounded-2xl surface p-5 card-apple block"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: "color-mix(in oklab, var(--av-cyan-400) 14%, transparent)" }}
              >
                <Clock className="h-5 w-5" style={{ color: "var(--av-cyan-400)" }} />
              </span>
              <div className="mt-3 text-[15px] font-semibold">Registra tus horas</div>
              <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
                Tus horas de vuelo son el requisito que más pesa para postular a una aerolínea.
              </p>
            </Link>
          </div>
        </div>
      </>
    )
  }

  const currentIdx = STAGE_ORDER.indexOf(stage)

  return (
    <>
      <div className="px-7 py-9 sm:py-11 pb-20 max-w-[1480px] mx-auto">
        <PageHeader
          eyebrow={`Mi ruta · ${STAGE_LABEL[stage]}`}
          title={checklist.name}
          subtitle={checklist.description ?? undefined}
        />

        {/* Stage track */}
        <div className="relative rounded-2xl surface p-8 mb-7 overflow-x-auto">
          <div className="relative min-w-[640px]">
            {/* Track */}
            <div className="relative py-2 pb-8">
              <div
                className="absolute left-0 right-0 h-0.5 rounded-full"
                style={{ top: 24, background: "var(--border)" }}
              />
              <div
                className="absolute left-0 h-0.5 rounded-full transition-[width] duration-700"
                style={{
                  top: 24,
                  width: `${(currentIdx / (STAGE_ORDER.length - 1)) * 100}%`,
                  background: "var(--av-blue-500)",
                }}
              />
              <div className="flex justify-between relative">
                {STAGE_ORDER.map((s, i) => {
                  const done = i < currentIdx
                  const current = i === currentIdx
                  return (
                    <div
                      key={s}
                      className="flex flex-col items-center gap-3.5"
                      style={{ minWidth: 100, maxWidth: 140 }}
                    >
                      <div
                        className="relative w-[50px] h-[50px] rounded-full flex items-center justify-center font-semibold text-[15px]"
                        style={{
                          background: done ? "var(--av-green-400)" : current ? "var(--av-blue-500)" : "var(--muted)",
                          border: current ? "2px solid var(--av-blue-500)" : "2px solid var(--border)",
                          color: done || current ? "white" : "var(--muted-foreground)",
                          boxShadow: current ? "0 0 0 4px color-mix(in oklab, var(--av-blue-500) 18%, transparent)" : "none",
                        }}
                      >
                        {done ? <Check className="h-5 w-5" /> : <span className="tabular-nums">{i + 1}</span>}
                      </div>
                      <div className="text-center">
                        <div
                          className="text-[13px] font-semibold tracking-[-0.015em]"
                          style={{ color: done || current ? "var(--foreground)" : "var(--muted-foreground)" }}
                        >
                          {STAGE_LABEL[s]}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Progress strip */}
        <div className="rounded-2xl surface p-6 mb-6">
          <div className="flex justify-between items-baseline mb-3">
            <div>
              <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
                Tu progreso en esta etapa
              </div>
              <div className="tabular-nums mt-2 text-[32px] font-semibold tracking-[-0.04em] text-foreground">
                {percent}%
              </div>
              <div className="text-[15px] text-muted-foreground mt-1">
                {completedCount} de {totalCount} items completados
              </div>
            </div>
            {allDone && (
              <div
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-white"
                style={{ background: "var(--av-green-400)" }}
              >
                <Trophy className="h-3.5 w-3.5" /> ¡Etapa completa!
              </div>
            )}
          </div>
          <div className="relative h-2.5 rounded-full overflow-hidden bg-muted">
            <div
              className="h-full rounded-full transition-[width] duration-700"
              style={{ width: `${percent}%`, background: "var(--av-blue-500)" }}
            />
          </div>
        </div>

        {/* Categories */}
        {categories.map(([cat, catItems]) => {
          const catComplete = catItems.filter((i) => completedIds.has(i.id)).length
          return (
            <section key={cat} className="mb-7">
              <SectionTitle
                icon={Target}
                eyebrow={cat}
                title={`${catComplete} / ${catItems.length} completos`}
              />
              <div className="rounded-2xl surface overflow-hidden">
                {catItems.map((item, i) => {
                  const checked = completedIds.has(item.id)
                  const toggling = togglingId === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleItem(item)}
                      disabled={toggling}
                      className="w-full text-left flex items-start gap-3.5 p-4 transition-colors hover:bg-muted/50"
                      style={{
                        borderBottom: i < catItems.length - 1 ? "1px solid var(--border)" : "none",
                      }}
                    >
                      <span
                        className="flex h-[22px] w-[22px] items-center justify-center rounded-md flex-shrink-0 mt-0.5 transition-[color,background-color,border-color,box-shadow]"
                        style={{
                          background: checked ? "var(--av-green-400)" : "transparent",
                          border: checked ? "none" : "1.5px solid var(--border)",
                          color: "white",
                        }}
                      >
                        {toggling ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : checked ? (
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        ) : null}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-[13px] font-semibold ${
                            checked ? "line-through text-muted-foreground" : "text-foreground"
                          }`}
                        >
                          {item.title}
                        </div>
                        {item.description && (
                          <p
                            className={`mt-1 text-[12px] leading-relaxed ${
                              checked ? "text-muted-foreground/70" : "text-muted-foreground"
                            }`}
                          >
                            {item.description}
                          </p>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>
          )
        })}

        {allDone && (
          <section
            className="rounded-2xl border p-6 flex items-center gap-4"
            style={{
              background: "color-mix(in oklab, var(--av-blue-500) 5%, transparent)",
              borderColor: "color-mix(in oklab, var(--av-blue-500) 25%, transparent)",
            }}
          >
            <Sparkles className="h-7 w-7 flex-shrink-0" style={{ color: "var(--av-blue-500)" }} />
            <div className="flex-1">
              <h3 className="text-[17px] font-semibold text-foreground">¡Completaste todos los items!</h3>
              <p className="mt-0.5 text-[15px] text-muted-foreground">
                Actualiza tu etapa en tu perfil para desbloquear la siguiente ruta.
              </p>
            </div>
            <Button
              asChild
              className="rounded-xl border-0 text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--av-blue-500)" }}
            >
              <Link to="/app/perfil">
                Actualizar etapa <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </section>
        )}
      </div>
    </>
  )
}
