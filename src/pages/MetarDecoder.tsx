import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, ScanSearch, Search, ShieldAlert } from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { SectionTitle } from "@/components/ui/section-title"
import { accentText } from "@/lib/notam"
import {
  CLOUD_COVER,
  CONVECTIVE,
  DESCRIPTORS,
  METAR_DISCLAIMER,
  METAR_EXAMPLES,
  OTHERS,
  PHENOMENA,
  QUALIFIERS,
  TREND_CODES,
  parseMetar,
} from "@/lib/metar"
import { registrarEstudioDiario } from "@/lib/activity"

/**
 * Decodificador METAR (ruta /app/aerolinea/meteorologia/decodificador).
 *
 * Dos mitades: pegas un informe y te lo desarma grupo por grupo, y abajo la
 * leyenda completa de la bibliografía del curso con buscador. Lo que el
 * decodificador no reconoce lo dice ("grupo no reconocido"): nunca inventa
 * una lectura.
 */

type TabKey = "fenomenos" | "descriptores" | "calificadores" | "nubes" | "tendencias" | "otros"

const TABS: { key: TabKey; label: string }[] = [
  { key: "fenomenos", label: "Fenómenos" },
  { key: "descriptores", label: "Descriptores" },
  { key: "calificadores", label: "Calificadores" },
  { key: "nubes", label: "Nubes" },
  { key: "tendencias", label: "Tendencias" },
  { key: "otros", label: "Otros" },
]

function tabEntries(tab: TabKey): [string, string][] {
  switch (tab) {
    case "fenomenos":
      return Object.entries(PHENOMENA)
    case "descriptores":
      return Object.entries(DESCRIPTORS)
    case "calificadores":
      return Object.entries(QUALIFIERS)
    case "nubes":
      return [
        ...Object.entries(CLOUD_COVER).map(
          ([k, v]) => [k, v.octas ? `${v.label} (${v.octas})` : v.label] as [string, string]
        ),
        ...Object.entries(CONVECTIVE),
      ]
    case "tendencias":
      return Object.entries(TREND_CODES)
    case "otros":
      return Object.entries(OTHERS)
  }
}

/** Color por grupo del informe decodificado, con los tokens del sistema. */
const GRUPO_COLOR: Record<string, string> = {
  "Tipo de informe": "var(--av-blue-500)",
  "Estación": "var(--av-blue-500)",
  "Día y hora": "var(--av-blue-500)",
  "Viento": "var(--av-cyan-400)",
  "Visibilidad": "var(--av-green-400)",
  "Alcance visual en pista": "var(--av-green-400)",
  "Tiempo presente": "var(--av-amber-400)",
  "Tiempo reciente": "var(--av-amber-400)",
  "Nubes": "var(--av-violet-400)",
  "Temperatura y rocío": "var(--av-red-400)",
  "QNH": "var(--av-red-400)",
  "Tendencia": "var(--av-blue-500)",
  "Cizalladura": "var(--av-amber-400)",
}

export function MetarDecoder() {
  const [input, setInput] = useState(METAR_EXAMPLES[0].metar)
  const [tab, setTab] = useState<TabKey>("fenomenos")
  const [query, setQuery] = useState("")

  const tokens = useMemo(() => (input.trim() ? parseMetar(input) : []), [input])

  // Cuenta como día estudiado en cuanto el piloto decodifica algo distinto del
  // ejemplo precargado. Abrir la pantalla no es estudiar, y marcarlo como tal
  // sería justo la clase de cifra inflada que este producto no se permite.
  useEffect(() => {
    if (tokens.length > 0 && input.trim() !== METAR_EXAMPLES[0].metar) {
      void registrarEstudioDiario("metar-decodificador")
    }
  }, [tokens.length, input])

  const entries = useMemo(() => {
    const base = tabEntries(tab)
    const q = query.trim().toLowerCase()
    if (!q) return base
    return base.filter(([k, v]) => k.toLowerCase().includes(q) || v.toLowerCase().includes(q))
  }, [tab, query])

  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-12 max-w-[1280px] mx-auto">
        {/* Mismo control de volver que el decodificador de NOTAM. */}
        <Link
          to="/app/aerolinea/meteorologia"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a Meteorología
        </Link>

        <PageHeader
          eyebrow={
            <>
              <ScanSearch className="h-3.5 w-3.5" /> Meteorología · Decodificador
            </>
          }
          title="Decodificador METAR"
          subtitle="Pega cualquier informe y te lo desarma grupo por grupo, con la leyenda del curso al lado."
        />

        {/* Entrada */}
        <section className="rounded-xl surface p-5 sm:p-6">
          <SectionTitle
            icon={ScanSearch}
            eyebrow="El informe"
            title="Pega un METAR o prueba un ejemplo"
          />
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            rows={2}
            placeholder="METAR SKBO 261300Z 09006KT 9999 SCT023 BKN080 14/09 Q1027 NOSIG"
            className="mono w-full rounded-lg border border-border bg-background p-3.5 text-[14px] leading-relaxed text-foreground placeholder:text-muted-foreground/70 resize-y focus:outline-none focus:border-foreground/30 transition-colors"
            aria-label="Informe METAR a decodificar"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {METAR_EXAMPLES.map((e) => (
              <button
                key={e.label}
                type="button"
                onClick={() => setInput(e.metar)}
                className="h-9 px-3.5 rounded-full text-[13px] font-semibold border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {e.label}
              </button>
            ))}
          </div>

          <div
            className="mt-4 rounded-lg border p-3.5 flex items-start gap-2.5"
            style={{
              borderColor: "color-mix(in oklab, var(--av-amber-400) 32%, transparent)",
              background: "color-mix(in oklab, var(--av-amber-400) 8%, transparent)",
            }}
          >
            <ShieldAlert className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: accentText("var(--av-amber-400)", 75) }} />
            <p className="m-0 text-[13px] text-foreground/85 leading-relaxed">{METAR_DISCLAIMER}</p>
          </div>
        </section>

        {/* Lectura grupo por grupo */}
        {tokens.length > 0 && (
          <section className="mt-6 rounded-xl surface p-5 sm:p-6">
            <SectionTitle
              icon={ScanSearch}
              eyebrow="La lectura"
              title="Grupo por grupo"
              hint="Lo que no se reconoce se marca: revísalo contra la leyenda, nunca lo asumas."
            />
            <div className="rounded-lg border border-border overflow-hidden">
              {tokens.map((t, i) => {
                const color = t.unknown ? "var(--av-red-400)" : (GRUPO_COLOR[t.grupo] ?? "var(--muted-foreground)")
                return (
                  <div
                    key={`${t.raw}-${i}`}
                    className={`grid grid-cols-[minmax(84px,auto)_1fr] sm:grid-cols-[140px_170px_1fr] gap-x-4 gap-y-1 px-4 py-2.5 items-baseline ${
                      i === tokens.length - 1 ? "" : "border-b border-border"
                    }`}
                  >
                    <span className="mono text-[14px] font-semibold" style={{ color: accentText(color, 75) }}>
                      {t.raw}
                    </span>
                    <span className="hidden sm:block text-[12px] uppercase tracking-[0.07em] font-semibold text-muted-foreground">
                      {t.grupo}
                    </span>
                    <span className="col-span-2 sm:col-span-1 text-[14px] text-foreground/90 leading-snug">
                      {t.decoded}
                    </span>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Leyenda del curso */}
        <section className="mt-6 rounded-xl surface p-5 sm:p-6">
          <SectionTitle
            icon={Search}
            eyebrow="La leyenda"
            title="Códigos de la bibliografía del curso"
            hint="Las tablas de la leyenda METAR y TAF, tal como vienen en el manual."
          />

          <div className="flex flex-wrap items-center gap-2">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                aria-pressed={tab === t.key}
                className="h-9 px-3.5 rounded-full text-[13px] font-semibold transition-colors"
                style={
                  tab === t.key
                    ? { background: "var(--av-blue-500)", color: "white" }
                    : { color: "var(--muted-foreground)" }
                }
              >
                {t.label}
              </button>
            ))}
            <div className="relative ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar código o palabra"
                className="h-9 w-[210px] rounded-full border border-border bg-background pl-9 pr-3 text-[13px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-foreground/30 transition-colors"
                aria-label="Buscar en la leyenda"
              />
            </div>
          </div>

          <div className="mt-4 grid sm:grid-cols-2 gap-x-6">
            {entries.map(([k, v]) => (
              <div key={k} className="flex items-baseline gap-3 py-2 border-b border-border last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0">
                <span className="mono shrink-0 w-14 text-[13px] font-bold" style={{ color: accentText("var(--av-blue-500)") }}>
                  {k}
                </span>
                <span className="text-[14px] text-foreground/90 leading-snug">{v}</span>
              </div>
            ))}
            {entries.length === 0 && (
              <p className="m-0 py-3 text-[13px] text-muted-foreground col-span-2">
                Nada con ese texto en esta tabla. Prueba en otra pestaña.
              </p>
            )}
          </div>
        </section>
      </div>
    </AppLayout>
  )
}
