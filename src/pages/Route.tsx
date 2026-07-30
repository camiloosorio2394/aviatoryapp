import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Check, Loader2, Map as MapIcon, Trophy, Sparkles, ArrowRight, Target, BookOpen, Clock } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { AppLayout } from "@/components/layout/AppLayout"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"
import { SectionTitle } from "@/components/ui/section-title"

type PilotStage =
  | "student_ppl"
  | "ppl"
  | "cpl_in_progress"
  | "cpl_ready"
  | "hour_building"
  | "instructor"
  | "airline_candidate"

interface Checklist {
  id: number
  stage: PilotStage
  name: string
  description: string | null
}

interface Item {
  id: number
  checklist_id: number
  key: string
  title: string
  description: string | null
  category: string | null
  order_index: number
}

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
  const [items, setItems] = useState<Item[]>([])
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState(true)
  const [togglingId, setTogglingId] = useState<number | null>(null)

  useEffect(() => {
    if (!user) return
    let cancelled = false

    async function load() {
      try {
        const { data: ps } = await supabase
          .from("pilot_state")
          .select("stage")
          .eq("user_id", user!.id)
          .maybeSingle()
        const userStage = (ps as { stage?: PilotStage } | null)?.stage ?? null
        if (cancelled) return
        setStage(userStage)

        if (!userStage) {
          setLoading(false)
          return
        }

        const { data: ch } = await supabase
          .from("checklists")
          .select("*")
          .eq("stage", userStage)
          .order("order_index")
          .limit(1)
          .maybeSingle()
        if (cancelled) return
        const checklistRow = ch as Checklist | null
        setChecklist(checklistRow)

        if (!checklistRow) {
          setLoading(false)
          return
        }

        const [itemsRes, progressRes] = await Promise.all([
          supabase
            .from("checklist_items")
            .select("*")
            .eq("checklist_id", checklistRow.id)
            .order("order_index"),
          supabase
            .from("checklist_progress")
            .select("item_id")
            .eq("user_id", user!.id),
        ])
        if (cancelled) return

        setItems((itemsRes.data ?? []) as Item[])
        setCompletedIds(
          new Set(((progressRes.data ?? []) as { item_id: number }[]).map((p) => p.item_id))
        )
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "No pudimos cargar tu ruta")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [user])

  async function toggleItem(item: Item) {
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
        const { error } = await supabase
          .from("checklist_progress")
          .delete()
          .eq("user_id", user.id)
          .eq("item_id", item.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from("checklist_progress")
          .insert({ user_id: user.id, item_id: item.id })
        if (error) throw error
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
    const map = new Map<string, Item[]>()
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
      <AppLayout>
        <div className="px-6 py-12 max-w-4xl mx-auto animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-32 bg-muted rounded-2xl" />
          <div className="h-64 bg-muted rounded-2xl" />
        </div>
      </AppLayout>
    )
  }

  if (!stage) {
    return (
      <AppLayout>
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
      </AppLayout>
    )
  }

  if (!checklist) {
    return (
      <AppLayout>
        <div className="px-4 sm:px-7 py-7 pb-20 max-w-[1480px] mx-auto">
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
      </AppLayout>
    )
  }

  const currentIdx = STAGE_ORDER.indexOf(stage)

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[1480px] mx-auto">
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
                className="absolute left-0 h-0.5 rounded-full transition-all duration-700"
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
                        className="relative w-[50px] h-[50px] rounded-full flex items-center justify-center font-semibold text-sm"
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
                          className="text-[13.5px] font-semibold tracking-[-0.015em]"
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
              <div className="tabular-nums mt-2 text-4xl font-semibold tracking-[-0.04em] text-foreground">
                {percent}%
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {completedCount} de {totalCount} items completados
              </div>
            </div>
            {allDone && (
              <div
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-white"
                style={{ background: "var(--av-green-400)" }}
              >
                <Trophy className="h-3.5 w-3.5" /> ¡Etapa completa!
              </div>
            )}
          </div>
          <div className="relative h-2.5 rounded-full overflow-hidden bg-muted">
            <div
              className="h-full rounded-full transition-all duration-700"
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
                        className="flex h-[22px] w-[22px] items-center justify-center rounded-md flex-shrink-0 mt-0.5 transition-all"
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
                          className={`text-[14px] font-semibold ${
                            checked ? "line-through text-muted-foreground" : "text-foreground"
                          }`}
                        >
                          {item.title}
                        </div>
                        {item.description && (
                          <p
                            className={`mt-1 text-xs leading-relaxed ${
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
              <h3 className="text-base font-semibold text-foreground">¡Completaste todos los items!</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
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
    </AppLayout>
  )
}
