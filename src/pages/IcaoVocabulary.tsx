import { useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import {
  Search,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Loader2,
  X,
  ChevronDown,
  Lock,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { ContentGuard } from "@/components/ContentGuard"
import { supabase } from "@/integrations/supabase/client"

/**
 * Glosario consultable de vocabulario ICAO / Aviation English.
 * Fuente: libro "ICAO Vocabulary Book" recopilado por Cami.
 *
 * Backend: tabla `icao_vocabulary` (público al authenticated, búsqueda full-text).
 * UX clave: este glosario tiene que cargar rápido y ser instantáneo de buscar
 * — los usuarios lo van a abrir en pleno estudio. Por eso traemos todo en
 * memoria una vez (~350 filas, <100KB) y filtramos client-side.
 *
 * Render: sin búsqueda el listado se agrupa por letra (con índice A-Z) y se
 * corta en PAGE_SIZE tarjetas. El filtro sigue siendo client-side: esto no
 * cambia el fetch, solo evita pintar 351 tarjetas idénticas de una sola vez.
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

const CATEGORIES: { slug: VocabCategory | "all"; label: string }[] = [
  { slug: "all",         label: "Todas" },
  { slug: "aircraft",    label: "Aeronave" },
  { slug: "airport",     label: "Aeropuerto" },
  { slug: "navigation",  label: "Navegación" },
  { slug: "flight_ops",  label: "Operación de vuelo" },
  { slug: "weather",     label: "Meteorología" },
  { slug: "health",      label: "Salud" },
  { slug: "security",    label: "Seguridad" },
  { slug: "non_routine", label: "No rutinario" },
]

const PAGE_SIZE = 60

/** Letra de agrupación: A-Z, y "#" para cualquier otra cosa. */
function letterOf(term: string): string {
  const c = term.trim().charAt(0).toUpperCase()
  return c >= "A" && c <= "Z" ? c : "#"
}

export function IcaoVocabulary() {
  const [data, setData] = useState<VocabEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<VocabCategory | "all">("all")
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [pendingAnchor, setPendingAnchor] = useState<string | null>(null)
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

  // Cada vez que cambia el filtro, volvemos al primer tramo. Se ajusta durante
  // el render (no en un efecto) para no encadenar un segundo repintado.
  const filterKey = `${query}::${category}`
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey)
  if (prevFilterKey !== filterKey) {
    setPrevFilterKey(filterKey)
    setLimit(PAGE_SIZE)
  }

  const visible = useMemo(() => filtered.slice(0, limit), [filtered, limit])

  /** Letras presentes en el resultado completo (para el índice A-Z). */
  const letters = useMemo(() => {
    const set = new Set<string>()
    for (const e of filtered) set.add(letterOf(e.term_en))
    return [...set].sort()
  }, [filtered])

  /** Sin búsqueda agrupamos por letra; con búsqueda el orden lo manda el match. */
  const groups = useMemo(() => {
    if (query.trim()) return null
    const map = new Map<string, VocabEntry[]>()
    for (const e of visible) {
      const L = letterOf(e.term_en)
      const bucket = map.get(L)
      if (bucket) bucket.push(e)
      else map.set(L, [e])
    }
    return [...map.entries()]
  }, [visible, query])

  // Scroll a la letra una vez que el tramo que la contiene ya está pintado.
  useEffect(() => {
    if (!pendingAnchor) return
    const target = pendingAnchor
    // El scroll y el reset van en el callback del timer: así el tramo nuevo ya
    // está pintado cuando buscamos el ancla, y no hay setState en el efecto.
    const t = setTimeout(() => {
      document.getElementById(`letter-${target}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
      setPendingAnchor(null)
    }, 0)
    return () => clearTimeout(t)
  }, [pendingAnchor, limit])

  function goToLetter(L: string) {
    let lastIdx = -1
    for (let i = 0; i < filtered.length; i++) {
      if (letterOf(filtered[i].term_en) === L) lastIdx = i
    }
    if (lastIdx >= 0 && lastIdx + 1 > limit) setLimit(lastIdx + 1)
    setPendingAnchor(L)
  }

  const remaining = filtered.length - visible.length

  return (
    <AppLayout>
      <ContentGuard>
      <div className="px-7 py-7 pb-20 max-w-[1240px] mx-auto">
        {/* Back link */}
        <Link
          to="/app/icao"
          className="inline-flex items-center gap-1.5 text-[13.5px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a Inglés ICAO
        </Link>

        {/* Header */}
        <div className="flex items-start justify-between gap-6 flex-wrap mb-7">
          <div>
            <div
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
              style={{ color: "var(--av-blue-500)" }}
            >
              {/* Nada de "0 terms" antes de que llegue la data. */}
              <BookOpen className="h-3.5 w-3.5" /> Glosario{data.length > 0 ? ` · ${data.length} términos` : ""}
            </div>
            <h1 className="mt-1.5 text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.05]">
              Vocabulario de inglés aeronáutico
            </h1>
            <p className="mt-2 text-[15px] text-muted-foreground max-w-[680px]">
              Lo que necesitas entender (y poder usar) en situaciones rutinarias y en emergencias.
              Busca por término en inglés, por su traducción o por la definición. Queda disponible
              siempre: ábrelo mientras estudias o en clase.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Link
              to="/app/icao/quiz"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-sm font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--av-blue-500)" }}
            >
              Ponerme a prueba con preguntas <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="sticky top-16 z-20 -mx-1 mb-5 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70 rounded-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <label htmlFor="vocab-search" className="sr-only">Buscar en el glosario</label>
            <input
              id="vocab-search"
              ref={inputRef}
              type="text"
              placeholder="Busca: unruly, ingest, ditch, windshear, o la traducción…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-12 pl-10 pr-10 rounded-2xl border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-[var(--av-blue-500)]/30"
              style={{ borderColor: "color-mix(in oklab, var(--border) 80%, transparent)" }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded text-muted-foreground hover:text-foreground"
                aria-label="Borrar la búsqueda"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 px-1">
            {CATEGORIES.map((c) => {
              const active = category === c.slug
              const count = loading
                ? null
                : c.slug === "all"
                ? data.length
                : data.filter((e) => e.category === c.slug).length
              return (
                <button
                  key={c.slug}
                  onClick={() => setCategory(c.slug)}
                  className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full text-[12.5px] font-semibold whitespace-nowrap border transition-colors"
                  style={{
                    borderColor: active
                      ? "color-mix(in oklab, var(--av-blue-500) 45%, transparent)"
                      : "color-mix(in oklab, var(--border) 60%, transparent)",
                    background: active
                      ? "color-mix(in oklab, var(--av-blue-500) 16%, transparent)"
                      : "transparent",
                    color: active ? "var(--av-blue-500)" : "var(--muted-foreground)",
                  }}
                >
                  <span>{c.label}</span>
                  {count != null && <span className="opacity-70 tabular-nums">{count}</span>}
                </button>
              )
            })}
          </div>
        </div>

        {/* Índice A-Z: sin él son 351 tarjetas sin ninguna forma de navegar */}
        {!loading && !query.trim() && letters.length > 1 && (
          <nav aria-label="Ir a una letra" className="mb-5 flex flex-wrap gap-1">
            {letters.map((L) => (
              <button
                key={L}
                onClick={() => goToLetter(L)}
                className="w-7 h-7 rounded-md text-[12.5px] font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {L}
              </button>
            ))}
          </nav>
        )}

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Cargando el glosario…</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center flex flex-col items-center">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                background: "color-mix(in oklab, var(--av-blue-500) 14%, transparent)",
                border: "1px solid color-mix(in oklab, var(--av-blue-500) 30%, transparent)",
                color: "var(--av-blue-500)",
              }}
            >
              <Search className="h-5 w-5" />
            </div>
            <h2 className="mt-3.5 text-[17px] font-bold tracking-[-0.01em]">
              {query.trim() ? `No hay resultados para “${query.trim()}”` : "Todavía no hay términos en esta categoría"}
            </h2>
            <p className="mt-1.5 text-[14px] text-muted-foreground max-w-[420px]">
              Prueba con una palabra más corta, con la traducción en español, o limpia los filtros
              para ver el glosario completo.
            </p>
            <button
              onClick={() => { setQuery(""); setCategory("all") }}
              className="mt-4 inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-[14px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--av-blue-500)" }}
            >
              Limpiar filtros
            </button>
          </div>
        ) : groups ? (
          <div className="space-y-6">
            {groups.map(([L, entries]) => (
              <section key={L} id={`letter-${L}`} className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="text-[17px] font-extrabold tracking-[-0.02em]" style={{ color: "var(--av-blue-500)" }}>
                    {L}
                  </div>
                  <div className="h-px flex-1 bg-border" />
                  <div className="tabular-nums text-[12px] text-muted-foreground">{entries.length}</div>
                </div>
                <div className="grid gap-2.5 md:grid-cols-2">
                  {entries.map((e) => (
                    <TermCard key={e.id} entry={e} query={query} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="grid gap-2.5 md:grid-cols-2">
            {visible.map((e) => (
              <TermCard key={e.id} entry={e} query={query} />
            ))}
          </div>
        )}

        {!loading && remaining > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setLimit((l) => l + PAGE_SIZE)}
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl text-[14px] font-semibold border border-border bg-card hover:bg-muted transition-colors"
            >
              Ver más términos
              <span className="tabular-nums text-muted-foreground">faltan {remaining}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        )}

        {!loading && data.length > 0 && (
          <div className="mt-12 pt-6 border-t border-border/60 text-[12.5px] text-muted-foreground text-center flex items-center justify-center gap-1.5">
            <Lock className="h-3 w-3" /> Mostrando {visible.length} de {filtered.length} · contenido protegido · ICAO Vocab Book (Cami)
          </div>
        )}
      </div>
      </ContentGuard>
    </AppLayout>
  )
}

function TermCard({ entry, query }: { entry: VocabEntry; query: string }) {
  const cat = CATEGORIES.find((c) => c.slug === entry.category) ?? CATEGORIES[0]
  return (
    // Sin hover lift: una ficha de glosario no lleva a ningún lado, así que no
    // finge ser clickeable.
    <div
      className="rounded-2xl border border-border bg-card p-4 flex flex-col gap-1.5"
      style={{ borderColor: "color-mix(in oklab, var(--border) 70%, transparent)" }}
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="text-[16px] font-bold tracking-[-0.01em]">
          <Highlight text={entry.term_en} query={query} />
        </div>
        {/* Etiqueta en gris: los tokens amber/green no se leen a 11px en modo claro. */}
        <div className="text-[11px] font-semibold flex-shrink-0 text-muted-foreground">
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
