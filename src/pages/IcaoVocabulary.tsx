import { useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import {
  Search,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Loader2,
  X,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { ContentGuard } from "@/components/ContentGuard"
import { supabase } from "@/integrations/supabase/client"
import { Lock } from "lucide-react"

/**
 * Glosario consultable de vocabulario ICAO / Aviation English.
 * Fuente: libro "ICAO Vocabulary Book" recopilado por Cami.
 *
 * Backend: tabla `icao_vocabulary` (público al authenticated, búsqueda full-text).
 * UX clave: este glosario tiene que cargar rápido y ser instantáneo de buscar
 * — los usuarios lo van a abrir en pleno estudio. Por eso traemos todo en
 * memoria una vez (~350 filas, <100KB) y filtramos client-side.
 */

interface VocabEntry {
  id: number
  term_en: string
  translation_es: string
  definition: string
  category: VocabCategory
}

type VocabCategory =
  | "aircraft"
  | "airport"
  | "navigation"
  | "flight_ops"
  | "weather"
  | "health"
  | "security"
  | "non_routine"

const CATEGORIES: { slug: VocabCategory | "all"; label: string; color: string }[] = [
  { slug: "all",         label: "All",         color: "var(--av-blue-500)" },
  { slug: "aircraft",    label: "Aircraft",    color: "#0E7490" },
  { slug: "airport",     label: "Airport",     color: "#2563EB" },
  { slug: "navigation",  label: "Navigation",  color: "#7C3AED" },
  { slug: "flight_ops",  label: "Flight Ops",  color: "#047857" },
  { slug: "weather",     label: "Weather",     color: "#2563EB" },
  { slug: "health",      label: "Health",      color: "#DC2626" },
  { slug: "security",    label: "Security",    color: "#B45309" },
  { slug: "non_routine", label: "Non-routine", color: "#DC2626" },
]

export function IcaoVocabulary() {
  const [data, setData] = useState<VocabEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<VocabCategory | "all">("all")
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const { data, error } = await supabase
        .from("icao_vocabulary")
        .select("id,term_en,translation_es,definition,category")
        .eq("is_active", true)
        .order("term_en", { ascending: true })
        .limit(1000)
      if (cancelled) return
      if (error) {
        console.error("icao_vocabulary", error)
      } else {
        setData((data ?? []) as VocabEntry[])
      }
      setLoading(false)
    })()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 50)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return data.filter((e) => {
      if (category !== "all" && e.category !== category) return false
      if (!q) return true
      return (
        e.term_en.toLowerCase().includes(q) ||
        e.translation_es.toLowerCase().includes(q) ||
        e.definition.toLowerCase().includes(q)
      )
    })
  }, [data, query, category])

  return (
    <AppLayout>
      <ContentGuard>
      <div className="px-7 py-7 pb-20 max-w-[1240px] mx-auto">
        {/* Back link */}
        <Link
          to="/app/icao"
          className="inline-flex items-center gap-1.5 text-[13.5px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to ICAO English
        </Link>

        {/* Header */}
        <div className="flex items-start justify-between gap-6 flex-wrap mb-7">
          <div>
            <div
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
              style={{ color: "var(--av-blue-500)" }}
            >
              <BookOpen className="h-3.5 w-3.5" /> Glossary · {data.length} terms
            </div>
            <h1 className="mt-1.5 text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.05]">
              Aviation English vocabulary
            </h1>
            <p className="mt-2 text-[15px] text-muted-foreground max-w-[680px]">
              What you need to understand (and be able to use) in routine situations and emergencies.
              Search by English term, translation or definition. This stays available
              anytime: open it while you study or in class.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Link
              to="/app/icao/quiz"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-sm font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--av-blue-500)" }}
            >
              Test me with questions <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="sticky top-[60px] z-10 -mx-1 mb-5 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70 rounded-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search: unruly, ingest, ditch, windshear, Spanish translation…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-12 pl-10 pr-10 rounded-2xl border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-[var(--av-blue-500)]/30"
              style={{ borderColor: "color-mix(in oklab, var(--border) 80%, transparent)" }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 px-1">
            {CATEGORIES.map((c) => {
              const active = category === c.slug
              const count = c.slug === "all"
                ? data.length
                : data.filter((e) => e.category === c.slug).length
              return (
                <button
                  key={c.slug}
                  onClick={() => setCategory(c.slug)}
                  className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full text-[12.5px] font-semibold whitespace-nowrap border transition-colors"
                  style={{
                    borderColor: active
                      ? `color-mix(in oklab, ${c.color} 45%, transparent)`
                      : "color-mix(in oklab, var(--border) 60%, transparent)",
                    background: active
                      ? `color-mix(in oklab, ${c.color} 18%, transparent)`
                      : "transparent",
                    color: active ? c.color : "var(--muted-foreground)",
                  }}
                >
                  <span>{c.label}</span>
                  <span className="opacity-70 tabular-nums">{count}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Loading glossary…</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <div className="text-sm">No results for "{query}".</div>
            <button
              onClick={() => { setQuery(""); setCategory("all") }}
              className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] text-[var(--av-blue-500)] hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-2.5 md:grid-cols-2">
            {filtered.map((e) => (
              <TermCard key={e.id} entry={e} query={query} />
            ))}
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-border/60 text-[12.5px] text-muted-foreground text-center flex items-center justify-center gap-1.5">
          <Lock className="h-3 w-3" /> {filtered.length} of {data.length} terms · protected content · ICAO Vocab Book (Cami)
        </div>
      </div>
      </ContentGuard>
    </AppLayout>
  )
}

function TermCard({ entry, query }: { entry: VocabEntry; query: string }) {
  const cat = CATEGORIES.find((c) => c.slug === entry.category) ?? CATEGORIES[0]
  return (
    <div
      className="rounded-2xl border border-border bg-card p-4 flex flex-col gap-1.5 transition-transform hover:-translate-y-0.5 hover:shadow-md"
      style={{ borderColor: "color-mix(in oklab, var(--border) 70%, transparent)" }}
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="text-[16px] font-bold tracking-[-0.01em]">
          <Highlight text={entry.term_en} query={query} />
        </div>
        <div
          className="text-[11px] font-semibold flex-shrink-0"
          style={{ color: cat.color }}
        >
          {cat.label}
        </div>
      </div>
      <div className="text-[14px] italic" style={{ color: "color-mix(in oklab, var(--av-blue-500) 90%, transparent)" }}>
        <Highlight text={entry.translation_es} query={query} />
      </div>
      <p className="text-[14px] text-foreground/90 leading-relaxed mt-0.5">
        <Highlight text={entry.definition} query={query} />
      </p>
    </div>
  )
}

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim()
  if (!q) return <>{text}</>
  const lower = text.toLowerCase()
  const ql = q.toLowerCase()
  const parts: { t: string; hit: boolean }[] = []
  let i = 0
  while (i < text.length) {
    const idx = lower.indexOf(ql, i)
    if (idx < 0) {
      parts.push({ t: text.slice(i), hit: false })
      break
    }
    if (idx > i) parts.push({ t: text.slice(i, idx), hit: false })
    parts.push({ t: text.slice(idx, idx + q.length), hit: true })
    i = idx + q.length
  }
  return (
    <>
      {parts.map((p, k) =>
        p.hit ? (
          <mark
            key={k}
            className="rounded-sm px-0.5"
            style={{ background: "color-mix(in oklab, var(--av-blue-500) 22%, transparent)", color: "inherit" }}
          >
            {p.t}
          </mark>
        ) : (
          <span key={k}>{p.t}</span>
        )
      )}
    </>
  )
}
