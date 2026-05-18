import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Check, Loader2, Map as MapIcon, Trophy, Sparkles, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { AppLayout } from "@/components/layout/AppLayout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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
          new Set(
            ((progressRes.data ?? []) as { item_id: number }[]).map((p) => p.item_id)
          )
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
    // Optimistic
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
        // Pequeño feedback de éxito
        if (item.title.includes("🎉")) {
          toast.success("¡Hito conseguido! 🎉")
        }
      }
    } catch (err) {
      // Revertir
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
          <h2 className="text-xl font-semibold">Completá tu perfil primero</h2>
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

  return (
    <AppLayout>
      <div className="px-4 sm:px-6 lg:px-10 py-8 max-w-4xl mx-auto space-y-8">
        <header>
          <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {STAGE_LABEL[stage]}
          </div>
          <h1 className="mt-1 text-3xl sm:text-4xl font-bold tracking-[-0.03em]">
            {checklist.name}
          </h1>
          {checklist.description && (
            <p className="mt-2 text-muted-foreground leading-relaxed">
              {checklist.description}
            </p>
          )}
        </header>

        {/* Progress hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white p-7 sm:p-9 shadow-2xl shadow-blue-500/30">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 -right-16 h-60 w-60 rounded-full bg-cyan-300/20 blur-3xl"
          />
          <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
                Tu progreso en esta ruta
              </div>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-6xl sm:text-7xl font-bold tracking-[-0.04em] tabular">
                  {percent}%
                </span>
                <span className="text-sm text-blue-100/90">
                  {completedCount} de {totalCount} items
                </span>
              </div>
            </div>
            {allDone && (
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-2 text-sm font-semibold">
                <Trophy className="h-4 w-4" /> ¡Etapa completa!
              </div>
            )}
          </div>
          <div className="relative mt-5 h-2.5 rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-200 shadow-[0_0_16px_rgb(255_255_255_/_40%)] transition-all duration-700"
              style={{ width: `${percent}%` }}
            />
          </div>
        </section>

        {/* Categories with items */}
        {categories.map(([cat, catItems]) => {
          const catComplete = catItems.filter((i) => completedIds.has(i.id)).length
          return (
            <section key={cat}>
              <div className="flex items-baseline justify-between mb-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {cat}
                </h2>
                <Badge variant="secondary" className="rounded-full text-xs">
                  {catComplete} / {catItems.length}
                </Badge>
              </div>
              <ul className="space-y-2">
                {catItems.map((item) => {
                  const checked = completedIds.has(item.id)
                  const toggling = togglingId === item.id
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => toggleItem(item)}
                        disabled={toggling}
                        className={`w-full text-left flex items-start gap-4 rounded-2xl border p-4 sm:p-5 transition-all ${
                          checked
                            ? "border-blue-500/30 bg-blue-50/40 dark:bg-blue-950/20"
                            : "border-border/60 bg-card hover:border-blue-500/30 hover:bg-muted/30"
                        }`}
                      >
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-md border-2 flex-shrink-0 transition-all mt-0.5 ${
                            checked
                              ? "bg-gradient-to-br from-blue-500 to-blue-700 border-transparent text-white shadow-md shadow-blue-500/30"
                              : "border-border bg-background"
                          }`}
                        >
                          {toggling ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : checked ? (
                            <Check className="h-4 w-4" strokeWidth={3} />
                          ) : null}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div
                            className={`text-sm sm:text-base font-medium ${
                              checked ? "line-through text-muted-foreground" : ""
                            }`}
                          >
                            {item.title}
                          </div>
                          {item.description && (
                            <p
                              className={`mt-1 text-xs sm:text-sm leading-relaxed ${
                                checked
                                  ? "text-muted-foreground/70"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {item.description}
                            </p>
                          )}
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}

        {allDone && (
          <section className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-50 via-blue-50/40 to-transparent dark:from-blue-950/40 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <Sparkles className="h-7 w-7 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-base font-semibold">¡Completaste todos los items!</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Actualiza tu etapa en tu perfil para desbloquear la siguiente ruta.
              </p>
            </div>
            <Button asChild className="btn-apple rounded-full border-0">
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
