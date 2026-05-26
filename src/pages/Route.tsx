import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Check, Loader2, Map as MapIcon, Trophy, Sparkles, ArrowRight, Target } from "lucide-react"
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
  airline_candidate: "Candidato a Aerolínea",
}

const STAGE_ORDER: PilotStage[] = [
  "student_ppl",
  "ppl",
  "cpl_in_progress",
  "cpl_ready",
  "hour_building",
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
          toast.success("¡Hito conseguido! 🎉")
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
        <div className="px-6 py-12 max-w-2xl mx-auto text-center">
          <p className="text-muted-foreground">No hay ruta para esta etapa todavía.</p>
        </div>
      </AppLayout>
    )
  }

  const currentIdx = STAGE_ORDER.indexOf(stage)

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        <PageHeader
          eyebrow={`MI RUTA · ${STAGE_LABEL[stage].toUpperCase()}`}
          title={checklist.name}
          subtitle={checklist.description ?? undefined}
        />

        {/* Mission map dark band */}
        <div
          className="map-tile map-grid anim-fade-up relative rounded-3xl border p-8 mb-7 overflow-hidden"
          style={{
            borderColor: "oklch(0.32 0.04 250 / 0.6)",
            boxShadow: "var(--shadow-navy), inset 0 1px 0 rgb(255 255 255 / 6%)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 100%, oklch(0.78 0.16 215 / 25%) 0%, transparent 60%)",
            }}
          />
          <div className="relative">
            {/* Track */}
            <div className="relative py-2 pb-8">
              <div
                className="absolute left-0 right-0 h-0.5 rounded-full"
                style={{ top: 24, background: "oklch(0.4 0.04 250 / 0.6)" }}
              />
              <div
                className="absolute left-0 h-0.5 rounded-full"
                style={{
                  top: 24,
                  width: `${(currentIdx / (STAGE_ORDER.length - 1)) * 100}%`,
                  background: "linear-gradient(90deg, var(--av-cyan-400), white)",
                  boxShadow: "0 0 12px var(--av-cyan-400)",
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
                        className="relative w-[50px] h-[50px] rounded-full flex items-center justify-center text-white font-extrabold text-sm"
                        style={{
                          background: done
                            ? "linear-gradient(135deg, var(--av-cyan-300), var(--av-blue-500))"
                            : current
                              ? "linear-gradient(135deg, var(--av-cyan-400), var(--av-blue-500))"
                              : "oklch(0.24 0.035 250)",
                          border: current
                            ? "2px solid var(--av-cyan-400)"
                            : "2px solid oklch(0.36 0.05 250)",
                          color: done || current ? "white" : "oklch(0.55 0.04 250)",
                          boxShadow:
                            done || current
                              ? "0 0 0 6px oklch(0.78 0.16 215 / 15%), 0 8px 24px -8px oklch(0.78 0.16 215 / 60%)"
                              : "none",
                        }}
                      >
                        {done ? <Check className="h-5 w-5" /> : <span className="mono">{i + 1}</span>}
                        {current && <span className="radar-pulse" />}
                      </div>
                      <div className="text-center">
                        <div
                          className="mono text-[13px] font-bold tracking-[-0.015em]"
                          style={{
                            color: done || current ? "white" : "oklch(0.65 0.04 250)",
                          }}
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
        <div className="rounded-xl border border-border bg-card p-6 mb-6">
          <div className="flex justify-between items-baseline mb-3">
            <div>
              <div
                className="mono text-[10px] font-bold tracking-[0.14em] uppercase"
                style={{ color: "var(--av-cyan-400)" }}
              >
                Tu progreso en esta etapa
              </div>
              <div className="mono tabular-nums mt-2 text-4xl font-extrabold tracking-[-0.04em] text-foreground">
                {percent}%
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {completedCount} de {totalCount} items completados
              </div>
            </div>
            {allDone && (
              <div
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, var(--av-cyan-400), var(--av-blue-500))",
                  boxShadow: "var(--shadow-cyan)",
                }}
              >
                <Trophy className="h-3.5 w-3.5" /> ¡Etapa completa!
              </div>
            )}
          </div>
          <div
            className="relative h-2.5 rounded-full overflow-hidden border border-border"
            style={{ background: "var(--muted)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${percent}%`,
                background: "linear-gradient(90deg, var(--av-cyan-400), var(--av-cyan-300), white)",
                boxShadow: "0 0 12px var(--av-cyan-400)",
              }}
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
              <div className="rounded-xl border border-border bg-card overflow-hidden">
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
                          background: checked ? "var(--av-cyan-400)" : "transparent",
                          border: checked ? "none" : "1.5px solid var(--border)",
                          color: "white",
                          boxShadow: checked
                            ? "0 0 0 3px color-mix(in oklab, var(--av-cyan-400) 20%, transparent)"
                            : "none",
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
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--av-cyan-400) 8%, var(--card)) 0%, var(--card) 70%)",
              borderColor: "color-mix(in oklab, var(--av-cyan-400) 35%, var(--border))",
            }}
          >
            <Sparkles className="h-7 w-7 flex-shrink-0" style={{ color: "var(--av-cyan-400)" }} />
            <div className="flex-1">
              <h3 className="text-base font-bold text-foreground">¡Completaste todos los items!</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Actualiza tu etapa en tu perfil para desbloquear la siguiente ruta.
              </p>
            </div>
            <Button asChild className="rounded-full border-0 text-white" style={{
              background: "linear-gradient(180deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)",
            }}>
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
