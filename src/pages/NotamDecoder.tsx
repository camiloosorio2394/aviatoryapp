import { useMemo, useRef, useState } from "react"
import type { ComponentType, CSSProperties, ReactNode } from "react"
import { Link } from "react-router-dom"
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Ban,
  BookOpen,
  Check,
  ChevronDown,
  Clock,
  FileText,
  Info,
  Layers,
  ScanLine,
  Search,
  Sparkles,
  X,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { SectionTitle } from "@/components/ui/section-title"
import {
  CODE_META,
  DISCLAIMERS,
  GLOSSARY,
  OFFICIAL_EXAMPLES,
  SPECIAL_RULES,
  STATUS_CODES,
  SUBJECT_CODES,
  TOTALS,
  accentText,
  decodeQ,
  formatNotamDateTime,
  isCancelCode,
  type OfficialExample,
  type StatusCode,
  type SubjectCode,
} from "@/lib/notam"

/**
 * Decodificador NOTAM (ruta /app/aerolinea/notam/decodificador).
 *
 * Herramienta central de la seccion: 168 codigos de asunto y 78 de estado del
 * Doc 8400, mas conversor de fecha/hora, ejemplos oficiales y glosario de la
 * casilla E). Todo el contenido sale de src/lib/notam.ts.
 */

// ─── Helpers locales ─────────────────────────────────────────────────────────

/** Normaliza para buscar sin acentos ni mayusculas. */
function norm(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
}

function softBg(color: string, pct = 12): string {
  return `color-mix(in oklab, ${color} ${pct}%, transparent)`
}

function softBorder(color: string, pct = 30): string {
  return `color-mix(in oklab, ${color} ${pct}%, transparent)`
}

/**
 * La clase .chip esta declarada fuera de @layer y fija 22 px de alto con 11 px de
 * tipografia, asi que las utilidades de Tailwind no la sobreescriben. Cuando un
 * chip es un boton de verdad necesita area tactil, y eso solo se logra por style.
 */
const TAP_CHIP: CSSProperties = { height: 34, padding: "0 12px", fontSize: 12.5 }

interface CodeParts {
  subjectKey: string
  statusKey: string
  /** Cuantas letras del cuerpo (asunto + estado) escribio el usuario. */
  typed: number
}

/**
 * Separa lo que el usuario va escribiendo, tolerando minusculas, espacios y la
 * ausencia de la Q inicial. A diferencia de decodeQ(), esto tambien sirve para
 * codigos a medio escribir, que es lo que necesita el desglose en vivo.
 */
function splitCode(raw: string): CodeParts {
  const clean = raw.toUpperCase().replace(/[^A-Z]/g, "")
  const body = clean.startsWith("Q") ? clean.slice(1, 5) : clean.slice(0, 4)
  return { subjectKey: body.slice(0, 2), statusKey: body.slice(2, 4), typed: body.length }
}

// ─── Datos derivados (estaticos, se calculan una sola vez) ───────────────────

interface SubjectRow {
  key: string
  data: SubjectCode
  hay: string
}

interface StatusRow {
  key: string
  data: StatusCode
  hay: string
}

const SUBJECT_ROWS: SubjectRow[] = Object.entries(SUBJECT_CODES).map(([key, data]) => ({
  key,
  data,
  hay: norm(`${key} ${data.significado} ${data.fraseologia} ${data.seccion} ${data.subseccion}`),
}))

const STATUS_ROWS: StatusRow[] = Object.entries(STATUS_CODES).map(([key, data]) => ({
  key,
  data,
  hay: norm(`${key} ${data.significado} ${data.fraseologia} ${data.categoria}`),
}))

const SUBJECT_SECTIONS: string[] = Array.from(new Set(SUBJECT_ROWS.map((r) => r.data.seccion)))
const STATUS_CATEGORIES: string[] = Array.from(new Set(STATUS_ROWS.map((r) => r.data.categoria)))

const SECTION_COLOR: Record<string, string> = {
  AGA: "var(--av-blue-500)",
  COM: "var(--av-cyan-400)",
  RAC: "var(--av-violet-400)",
  "Avisos para la navegación": "var(--av-amber-400)",
  "Otras informaciones": "var(--av-green-400)",
}

const CATEGORY_COLOR: Record<string, string> = {
  "Disponibilidad (A)": "var(--av-blue-500)",
  "Cambios (C)": "var(--av-violet-400)",
  "Condiciones de peligro (H)": "var(--av-red-400)",
  "Limitaciones (L)": "var(--av-amber-400)",
  "Otros (XX)": "var(--av-cyan-400)",
}

function sectionColor(name: string): string {
  return SECTION_COLOR[name] ?? "var(--av-blue-500)"
}

function categoryColor(name: string): string {
  return CATEGORY_COLOR[name] ?? "var(--av-blue-500)"
}

const EXAMPLE_CHIPS: string[] = ["QMRLC", "QNVAS", "QLPAS", "QMXLC", "QPDAW", "QWMLW", "QFAHX", "QKKKK"]

const SPECIAL_RULE_ROWS: { label: string; text: string }[] = [
  { label: "QKKKK: lista de verificación", text: SPECIAL_RULES.KKKK },
  { label: "TT en el estado: NOTAM iniciador", text: SPECIAL_RULES.TT },
  { label: "XX en el asunto", text: SPECIAL_RULES.XX_asunto },
  { label: "XX en el estado", text: SPECIAL_RULES.XX_estado },
  { label: "Códigos que cancelan un NOTAM", text: SPECIAL_RULES.cancelacion },
]

const KV_LABELS: Record<string, string> = {
  FIR: "FIR",
  codigo: "Código de 5 letras",
  trafico: "Tránsito afectado",
  objetivo: "Objetivo",
  alcance: "Alcance",
  limites: "Límites",
  nota: "Nota",
  F_G: "Casillas F) y G)",
  A: "Casilla A)",
  B: "Casilla B)",
  C: "Casilla C)",
  E: "Casilla E)",
}

const BOX_LABELS: Record<string, string> = {
  Q: "Casilla Q) calificador",
  A: "Casilla A) aeródromo o FIR",
  B: "Casilla B) inicio de validez",
  C: "Casilla C) fin de validez",
  D: "Casilla D) horario",
  E: "Casilla E) texto",
  F: "Casilla F) límite inferior",
  G: "Casilla G) límite superior",
}

const PAGE_SIZE = 40

type Tab = "asuntos" | "estados"

// ─── Pagina ──────────────────────────────────────────────────────────────────

export function NotamDecoder() {
  const [input, setInput] = useState("")
  const [dateGroup, setDateGroup] = useState("")
  const [tab, setTab] = useState<Tab>("asuntos")
  const [query, setQueryState] = useState("")
  const [section, setSectionState] = useState<string | null>(null)
  const [category, setCategoryState] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)
  const [glossQuery, setGlossQuery] = useState("")
  const [openExample, setOpenExample] = useState<string | null>(OFFICIAL_EXAMPLES[0]?.id ?? null)

  const decoderRef = useRef<HTMLElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const decoded = useMemo(() => decodeQ(input), [input])
  const parts = useMemo(() => splitCode(input), [input])

  const subject: SubjectCode | null =
    parts.subjectKey.length === 2 ? SUBJECT_CODES[parts.subjectKey] ?? null : null
  const status: StatusCode | null =
    parts.statusKey.length === 2 ? STATUS_CODES[parts.statusKey] ?? null : null

  const dateTime = useMemo(() => formatNotamDateTime(dateGroup), [dateGroup])

  const subjectResults = useMemo(() => {
    const q = norm(query.trim())
    return SUBJECT_ROWS.filter(
      (r) => (section === null || r.data.seccion === section) && (q === "" || r.hay.includes(q))
    )
  }, [query, section])

  const statusResults = useMemo(() => {
    const q = norm(query.trim())
    return STATUS_ROWS.filter(
      (r) => (category === null || r.data.categoria === category) && (q === "" || r.hay.includes(q))
    )
  }, [query, category])

  const glossary = useMemo(() => {
    const q = norm(glossQuery.trim())
    if (q === "") return GLOSSARY
    return GLOSSARY.filter((g) => norm(`${g.abbr} ${g.meaning}`).includes(q))
  }, [glossQuery])

  const results: number = tab === "asuntos" ? subjectResults.length : statusResults.length
  const visibleSubjects = showAll ? subjectResults : subjectResults.slice(0, PAGE_SIZE)
  const visibleStatuses = showAll ? statusResults : statusResults.slice(0, PAGE_SIZE)
  const hidden = results - (tab === "asuntos" ? visibleSubjects.length : visibleStatuses.length)

  function setQuery(value: string): void {
    setQueryState(value)
    setShowAll(false)
  }

  function pickTab(next: Tab): void {
    setTab(next)
    setShowAll(false)
  }

  function pickSection(value: string | null): void {
    setSectionState(value)
    setShowAll(false)
  }

  function pickCategory(value: string | null): void {
    setCategoryState(value)
    setShowAll(false)
  }

  function focusDecoder(): void {
    decoderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    inputRef.current?.focus()
  }

  /** Rellena el decodificador combinando el codigo elegido con lo ya escrito. */
  function applySubject(key: string): void {
    const other = parts.statusKey.length === 2 ? parts.statusKey : "XX"
    setInput(`Q${key}${other}`)
    focusDecoder()
  }

  function applyStatus(key: string): void {
    const other = parts.subjectKey.length === 2 ? parts.subjectKey : "XX"
    setInput(`Q${other}${key}`)
    focusDecoder()
  }

  // Letras que no estan en las tablas pero si tienen significado normativo.
  const subjectSpecial: string | null =
    parts.subjectKey === "XX"
      ? "Asunto no enumerado en el código NOTAM: el detalle va en lenguaje claro en la casilla E)."
      : parts.subjectKey === "KK"
        ? "Forma parte de QKKKK: NOTAM de lista de verificación."
        : null
  const statusSpecial: string | null =
    parts.statusKey === "TT"
      ? "NOTAM iniciador (trigger): anuncia una enmienda o un suplemento AIP AIRAC."
      : parts.statusKey === "KK"
        ? "Forma parte de QKKKK: NOTAM de lista de verificación."
        : null

  const cancels = parts.statusKey.length === 2 && isCancelCode(parts.statusKey)
  const shortRead =
    subject && status && subject.fraseologia && status.fraseologia
      ? `${subject.fraseologia} ${status.fraseologia}`.toUpperCase()
      : null

  return (
    <AppLayout>
      <div className="px-5 sm:px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        <Link
          to="/app/aerolinea/notam"
          className="inline-flex items-center gap-1.5 text-[13.5px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a la sección NOTAM
        </Link>

        <PageHeader
          eyebrow={
            <>
              <ScanLine className="h-3.5 w-3.5" /> NOTAM · Decodificador
            </>
          }
          title="Decodifica cualquier código NOTAM"
          subtitle={`Los ${TOTALS.subjects} códigos de asunto y los ${TOTALS.statuses} de estado del Doc 8400 de la OACI, con buscador, conversor de hora UTC, los ${OFFICIAL_EXAMPLES.length} ejemplos oficiales decodificados y el glosario de la casilla E).`}
          actions={
            <Link
              to="/app/aerolinea/notam/practica"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-sm font-semibold surface hover:bg-muted transition-colors"
            >
              Ir a practicar <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        />

        {/* ═══ 1. DECODIFICADOR EN VIVO ═══ */}
        <section
          ref={decoderRef}
          className="scroll-mt-6 rounded-2xl surface p-5 sm:p-7 anim-fade-up"
        >
          <SectionTitle
            icon={ScanLine}
            eyebrow="Decodificador en vivo"
            title="Escribe el grupo de 5 letras"
            hint="Acepta minúsculas y también funciona si omites la Q inicial."
          />

          <div className="relative">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, 8))}
              placeholder="QMRLC"
              maxLength={8}
              autoComplete="off"
              spellCheck={false}
              aria-label="Código NOTAM de 5 letras"
              className="mono w-full h-16 sm:h-20 rounded-xl border bg-background px-4 sm:px-5 pr-12 text-[26px] sm:text-[34px] font-semibold uppercase tracking-[0.14em] text-foreground outline-none transition-shadow placeholder:text-muted-foreground/40 focus:ring-2 focus:ring-[color-mix(in_oklab,var(--av-blue-500)_45%,transparent)]"
              style={{ borderColor: softBorder("var(--av-blue-500)", 28) }}
            />
            {input.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setInput("")
                  inputRef.current?.focus()
                }}
                aria-label="Borrar el código escrito"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Ejemplos clicables */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[12.5px] text-muted-foreground mr-0.5">Prueba con:</span>
            {EXAMPLE_CHIPS.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setInput(code)}
                className="mono chip hover:opacity-80 transition-opacity"
                style={{
                  ...TAP_CHIP,
                  ...(input.toUpperCase() === code
                    ? {
                        background: softBg("var(--av-blue-500)", 14),
                        borderColor: softBorder("var(--av-blue-500)", 38),
                        color: accentText("var(--av-blue-500)"),
                      }
                    : {}),
                }}
              >
                {code}
              </button>
            ))}
          </div>

          {/* Desglose o estado inicial */}
          {parts.typed === 0 ? (
            <Anatomy onExample={() => setInput("QMRLC")} />
          ) : (
            <>
              <div className="mt-5 grid gap-3 lg:grid-cols-[104px_1fr_1fr]">
                <FixedQBlock />
                <PartBlock
                  role="Asunto"
                  caption="2ª y 3ª letras"
                  code={parts.subjectKey}
                  needed={2}
                  color="var(--av-blue-500)"
                  significado={subject ? subject.significado : null}
                  fraseologia={subject ? subject.fraseologia : null}
                  tags={subject ? [subject.seccion, subject.subseccion] : []}
                  tagColor={subject ? sectionColor(subject.seccion) : "var(--av-blue-500)"}
                  special={subjectSpecial}
                  missingText="Estas dos letras no corresponden a ningún asunto del Doc 8400. Revisa el código o búscalo en la tabla de abajo."
                />
                <PartBlock
                  role="Estado"
                  caption="4ª y 5ª letras"
                  code={parts.statusKey}
                  needed={2}
                  color="var(--av-violet-400)"
                  significado={status ? status.significado : null}
                  fraseologia={status ? status.fraseologia : null}
                  tags={status ? [status.categoria] : []}
                  tagColor={status ? categoryColor(status.categoria) : "var(--av-violet-400)"}
                  nota={status?.nota ?? null}
                  special={statusSpecial}
                  extraChip={
                    cancels
                      ? {
                          label: "cancela un NOTAM",
                          color: "var(--av-red-400)",
                          title:
                            parts.statusKey === "XX"
                              ? "XX significa que el estado va en lenguaje claro en la casilla E), y por eso también sirve para cancelar un NOTAM (Doc 8400, §3.8)."
                              : "Doc 8400, §3.8: este estado se usa para cancelar un NOTAM vigente.",
                        }
                      : undefined
                  }
                  missingText="Estas dos letras no corresponden a ningún estado del Doc 8400. Revisa el código o búscalo en la tabla de abajo."
                />
              </div>

              {shortRead && (
                <div
                  className="mt-3 rounded-xl border p-3.5 flex flex-wrap items-center gap-x-2 gap-y-1"
                  style={{
                    borderColor: softBorder("var(--av-green-400)", 26),
                    background: softBg("var(--av-green-400)", 6),
                  }}
                >
                  <Check
                    className="h-4 w-4 flex-shrink-0"
                    style={{ color: "var(--av-green-400)" }}
                    strokeWidth={3}
                  />
                  <span className="text-[13.5px] text-muted-foreground">
                    Así se lee de forma abreviada en la casilla E):
                  </span>
                  <span
                    className="mono text-[14px] font-semibold"
                    style={{ color: accentText("var(--av-green-400)") }}
                  >
                    {shortRead}
                  </span>
                </div>
              )}

              {decoded.special !== null && decoded.note !== null && (
                <Callout tone="var(--av-amber-400)" icon={Sparkles} title="Regla especial del Doc 8400">
                  {decoded.note}
                </Callout>
              )}

              {parts.typed >= 4 && !decoded.valid && (
                <Callout tone="var(--av-red-400)" icon={AlertTriangle} title="Este código no resuelve">
                  Ni el asunto ni el estado figuran en el Doc 8400. Comprueba el orden de las letras:
                  primero el asunto (2ª y 3ª) y después el estado (4ª y 5ª).
                </Callout>
              )}
            </>
          )}
        </section>

        {/* ═══ 2. CONVERSOR DE FECHA Y HORA ═══ */}
        <section className="mt-7 rounded-2xl surface p-5 sm:p-6">
          <SectionTitle
            icon={Clock}
            eyebrow="Conversor de fecha y hora"
            title="El grupo de 10 dígitos (AAMMDDHHMM)"
            hint="Las casillas B) y C) siempre van en UTC: leerlas en hora local es el error más común y en Colombia te desvía 5 horas."
          />

          <div className="grid gap-4 lg:grid-cols-[300px_1fr] lg:items-start">
            <div>
              <label htmlFor="notam-datetime" className="sr-only">
                Grupo de fecha y hora de 10 dígitos
              </label>
              <input
                id="notam-datetime"
                value={dateGroup}
                onChange={(e) => setDateGroup(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="2607290230"
                inputMode="numeric"
                autoComplete="off"
                className="mono tabular w-full h-14 rounded-xl border bg-background px-4 text-[19px] font-semibold tracking-[0.1em] text-foreground outline-none transition-shadow placeholder:text-muted-foreground/40 focus:ring-2 focus:ring-[color-mix(in_oklab,var(--av-cyan-400)_45%,transparent)]"
                style={{ borderColor: softBorder("var(--av-cyan-400)", 34) }}
              />
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setDateGroup("2607290230")}
                  className="mono chip hover:opacity-80 transition-opacity"
                  style={TAP_CHIP}
                >
                  2607290230
                </button>
                <button
                  type="button"
                  onClick={() => setDateGroup("9203312359")}
                  className="mono chip hover:opacity-80 transition-opacity"
                  style={TAP_CHIP}
                >
                  9203312359
                </button>
              </div>
            </div>

            <div className="min-w-0">
              {dateGroup.length === 0 && (
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <div className="text-[13.5px] text-muted-foreground leading-relaxed">
                    Escribe el grupo tal como aparece en la casilla B) o C). Se lee de dos en dos:
                    año, mes, día, hora y minutos, siempre en UTC.
                  </div>
                  <div className="mono mt-2.5 flex flex-wrap gap-2 text-[13px]">
                    {[
                      { g: "26", l: "año" },
                      { g: "07", l: "mes" },
                      { g: "29", l: "día" },
                      { g: "02", l: "hora" },
                      { g: "30", l: "minutos" },
                    ].map((b) => (
                      <span key={b.l} className="rounded-lg surface px-2.5 py-1.5">
                        <span className="font-semibold text-foreground">{b.g}</span>{" "}
                        <span className="text-[11px] text-muted-foreground">{b.l}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {dateGroup.length > 0 && dateTime === null && (
                <div
                  className="rounded-xl border p-4 flex items-start gap-2.5"
                  style={{
                    borderColor: softBorder("var(--av-amber-400)", 26),
                    background: softBg("var(--av-amber-400)", 7),
                  }}
                >
                  <Info
                    className="h-4 w-4 flex-shrink-0 mt-0.5"
                    style={{ color: "var(--av-amber-400)" }}
                  />
                  <div className="text-[13.5px] text-foreground/85 leading-relaxed">
                    Todavía no puedo convertirlo: necesito los 10 dígitos completos y una fecha
                    válida. Recuerda que PERM, EST y UFN no son grupos de fecha: PERM significa
                    permanente, EST que el fin de validez es estimado y UFN hasta nuevo aviso.
                  </div>
                </div>
              )}

              {dateTime !== null && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <TimeCard
                    label="Así se publica en el NOTAM"
                    value={dateTime.utc}
                    color="var(--av-blue-500)"
                  />
                  <TimeCard
                    label="Equivalente en Colombia (UTC menos 5)"
                    value={dateTime.local}
                    color="var(--av-cyan-400)"
                  />
                  <div className="sm:col-span-2 text-[13px] text-muted-foreground leading-relaxed">
                    Planifica siempre con la hora UTC. La hora local solo te sirve para saber si el
                    NOTAM te afecta en tu día de vuelo.
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ═══ 3. TABLAS NAVEGABLES ═══ */}
        <section className="mt-9">
          <SectionTitle
            icon={Layers}
            eyebrow="Referencia completa"
            title="Tablas de asuntos y estados"
            hint="Toca cualquier fila para llevar ese código al decodificador de arriba."
          />

          <div className="rounded-2xl surface p-4 sm:p-5">
            {/* Pestanias */}
            <div role="tablist" aria-label="Tablas de códigos" className="flex flex-wrap gap-2">
              <TabButton
                active={tab === "asuntos"}
                onClick={() => pickTab("asuntos")}
                label="Asuntos (2ª y 3ª letras)"
                count={TOTALS.subjects}
                color="var(--av-blue-500)"
              />
              <TabButton
                active={tab === "estados"}
                onClick={() => pickTab("estados")}
                label="Estados (4ª y 5ª letras)"
                count={TOTALS.statuses}
                color="var(--av-violet-400)"
              />
            </div>

            {/* Buscador */}
            <div className="mt-4 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busca por código, significado o fraseología: pista, clsd, MR…"
                autoComplete="off"
                aria-label="Buscar en la tabla de códigos"
                className="w-full h-11 rounded-xl border border-border bg-background pl-10 pr-10 text-[14px] text-foreground outline-none transition-colors focus:border-[color-mix(in_oklab,var(--av-blue-500)_45%,transparent)]"
              />
              {query.length > 0 && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Borrar la búsqueda"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Filtros */}
            <div className="mt-3 flex flex-wrap gap-2">
              {tab === "asuntos" ? (
                <>
                  <FilterChip
                    label="Todas las secciones"
                    active={section === null}
                    onClick={() => pickSection(null)}
                    color="var(--av-blue-500)"
                  />
                  {SUBJECT_SECTIONS.map((s) => (
                    <FilterChip
                      key={s}
                      label={s}
                      active={section === s}
                      onClick={() => pickSection(section === s ? null : s)}
                      color={sectionColor(s)}
                    />
                  ))}
                </>
              ) : (
                <>
                  <FilterChip
                    label="Todas las categorías"
                    active={category === null}
                    onClick={() => pickCategory(null)}
                    color="var(--av-violet-400)"
                  />
                  {STATUS_CATEGORIES.map((c) => (
                    <FilterChip
                      key={c}
                      label={c}
                      active={category === c}
                      onClick={() => pickCategory(category === c ? null : c)}
                      color={categoryColor(c)}
                    />
                  ))}
                </>
              )}
            </div>

            {/* Conteo */}
            <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
              <div className="tabular text-[13px] text-muted-foreground">
                {results === 0
                  ? "Ningún código coincide"
                  : `${results} ${results === 1 ? "código" : "códigos"} ${
                      tab === "asuntos" ? "de asunto" : "de estado"
                    }`}
                {hidden > 0 && `, mostrando los primeros ${PAGE_SIZE}`}
              </div>
              {hidden > 0 && (
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className="text-[13px] font-semibold"
                  style={{ color: accentText("var(--av-blue-500)") }}
                >
                  Ver todos ({results})
                </button>
              )}
            </div>

            {/* Filas */}
            <div
              role="tabpanel"
              aria-label={
                tab === "asuntos" ? "Códigos de asunto del Doc 8400" : "Códigos de estado del Doc 8400"
              }
            >
              {results === 0 ? (
                <div className="mt-4 rounded-xl border border-border bg-muted/30 p-6 text-center">
                  <div className="text-[14px] font-semibold text-foreground">
                    No encontramos ese código
                  </div>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    Prueba con menos letras, con el significado en español o quita el filtro de{" "}
                    {tab === "asuntos" ? "sección" : "categoría"}.
                  </p>
                </div>
              ) : (
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  {tab === "asuntos"
                    ? visibleSubjects.map((r) => (
                        <SubjectRowCard
                          key={r.key}
                          row={r}
                          selected={parts.subjectKey === r.key}
                          onPick={() => applySubject(r.key)}
                        />
                      ))
                    : visibleStatuses.map((r) => (
                        <StatusRowCard
                          key={r.key}
                          row={r}
                          selected={parts.statusKey === r.key}
                          onPick={() => applyStatus(r.key)}
                        />
                      ))}
                </div>
              )}
            </div>

            {showAll && results > PAGE_SIZE && (
              <div className="mt-3 text-center">
                <button
                  type="button"
                  onClick={() => setShowAll(false)}
                  className="text-[13px] font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  Mostrar solo los primeros {PAGE_SIZE}
                </button>
              </div>
            )}
          </div>

          {/* Reglas especiales */}
          <div className="mt-4 rounded-2xl surface p-5">
            <div className="text-[17px] font-semibold tracking-[-0.01em]">
              Reglas especiales que conviene tener a mano
            </div>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
              {SPECIAL_RULE_ROWS.map((r) => (
                <div key={r.label} className="rounded-xl border border-border bg-muted/20 p-3.5">
                  <div className="text-[13.5px] font-semibold text-foreground">{r.label}</div>
                  <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
                    {r.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 4. EJEMPLOS OFICIALES ═══ */}
        <section className="mt-9">
          <SectionTitle
            icon={FileText}
            eyebrow="Material del Doc 8400"
            title={`Los ${OFFICIAL_EXAMPLES.length} ejemplos oficiales, decodificados`}
            hint="Son los NOTAM que el propio documento explica casilla por casilla."
          />
          <div className="grid gap-2.5">
            {OFFICIAL_EXAMPLES.map((ex) => (
              <ExampleCard
                key={ex.id}
                example={ex}
                open={openExample === ex.id}
                onToggle={() => setOpenExample(openExample === ex.id ? null : ex.id)}
              />
            ))}
          </div>
        </section>

        {/* ═══ 5. GLOSARIO DE LA CASILLA E) ═══ */}
        <section className="mt-9">
          <SectionTitle
            icon={BookOpen}
            eyebrow="Casilla E)"
            title="Glosario de abreviaturas"
            hint="El texto de la casilla E) va en lenguaje claro con abreviaturas OACI. Estas son las que más aparecen."
            right={
              <span className="tabular hidden sm:inline text-[13px] text-muted-foreground">
                {glossary.length} de {GLOSSARY.length}
              </span>
            }
          />
          <div className="rounded-2xl surface p-4 sm:p-5">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={glossQuery}
                onChange={(e) => setGlossQuery(e.target.value)}
                placeholder="Busca una abreviatura: CLSD, U/S, pista…"
                autoComplete="off"
                aria-label="Buscar en el glosario de la casilla E)"
                className="w-full h-11 rounded-xl border border-border bg-background pl-10 pr-10 text-[14px] text-foreground outline-none transition-colors focus:border-[color-mix(in_oklab,var(--av-blue-500)_45%,transparent)]"
              />
              {glossQuery.length > 0 && (
                <button
                  type="button"
                  onClick={() => setGlossQuery("")}
                  aria-label="Borrar la búsqueda del glosario"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {glossary.length === 0 ? (
              <p className="mt-4 text-[13.5px] text-muted-foreground">
                Esa abreviatura no está en el glosario mínimo. Búscala en la tabla de códigos o en el
                AIP de la Aerocivil.
              </p>
            ) : (
              <div className="mt-3 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {glossary.map((g) => (
                  <div
                    key={g.abbr}
                    className="rounded-lg border border-border bg-muted/20 px-3 py-2 flex items-baseline gap-2"
                  >
                    <span
                      className="mono text-[13px] font-semibold flex-shrink-0"
                      style={{ color: accentText("var(--av-cyan-400)") }}
                    >
                      {g.abbr}
                    </span>
                    <span className="text-[13px] text-muted-foreground leading-snug">
                      {g.meaning}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ═══ 6. VIGENCIA (aviso obligatorio) ═══ */}
        <section
          className="mt-9 rounded-2xl border p-5 flex items-start gap-3"
          style={{
            borderColor: softBorder("var(--av-amber-400)", 26),
            background: softBg("var(--av-amber-400)", 6),
          }}
        >
          <AlertTriangle
            className="h-4.5 w-4.5 flex-shrink-0 mt-0.5"
            style={{ color: "var(--av-amber-400)" }}
          />
          <div>
            <div className="text-[14px] font-semibold text-foreground">Nota de vigencia</div>
            <p className="mt-1 text-[13.5px] text-foreground/85 leading-relaxed">
              {DISCLAIMERS.edition}
            </p>
            <p className="mt-2 text-[12.5px] text-muted-foreground leading-relaxed">
              Fuente: {CODE_META.fuente}
            </p>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}

// ─── Bloques del desglose ────────────────────────────────────────────────────

function FixedQBlock() {
  return (
    <div
      className="rounded-xl border p-4 flex flex-col items-center justify-center text-center"
      style={{
        borderColor: softBorder("var(--av-cyan-400)", 30),
        background: softBg("var(--av-cyan-400)", 7),
      }}
    >
      <div
        className="mono text-[34px] font-semibold leading-none"
        style={{ color: accentText("var(--av-cyan-400)") }}
      >
        Q
      </div>
      <div className="mt-1.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        Letra fija
      </div>
    </div>
  )
}

interface PartBlockProps {
  role: string
  caption: string
  code: string
  needed: number
  color: string
  significado: string | null
  fraseologia: string | null
  tags: string[]
  tagColor: string
  nota?: string | null
  /** Significado normativo de letras que no figuran en las tablas (XX, KK, TT). */
  special?: string | null
  extraChip?: { label: string; color: string; title?: string }
  missingText: string
}

function PartBlock({
  role,
  caption,
  code,
  needed,
  color,
  significado,
  fraseologia,
  tags,
  tagColor,
  nota,
  special,
  extraChip,
  missingText,
}: PartBlockProps) {
  const incomplete = code.length < needed
  const isSpecial = !incomplete && significado === null && Boolean(special)
  const unresolved = !incomplete && significado === null && !isSpecial
  const tone = incomplete
    ? "var(--muted-foreground)"
    : unresolved
      ? "var(--av-red-400)"
      : isSpecial
        ? "var(--av-amber-400)"
        : color

  return (
    <div
      className="rounded-xl border p-4"
      style={{
        borderColor: incomplete ? "var(--border)" : softBorder(tone, unresolved ? 34 : 30),
        background: incomplete ? "transparent" : softBg(tone, unresolved ? 7 : 6),
        borderStyle: incomplete ? "dashed" : "solid",
      }}
    >
      <div className="flex items-baseline justify-between gap-2">
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {role} · {caption}
        </div>
        {unresolved && (
          <span className="chip chip-red">
            <Ban className="h-3 w-3" /> sin correspondencia
          </span>
        )}
        {isSpecial && <span className="chip chip-amber">regla especial</span>}
      </div>

      <div
        className="mono mt-1 text-[30px] sm:text-[34px] font-semibold leading-none tracking-[0.08em]"
        style={{ color: incomplete ? "var(--muted-foreground)" : accentText(tone) }}
      >
        {code.padEnd(needed, "·")}
      </div>

      {incomplete ? (
        <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
          Te faltan {needed - code.length} {needed - code.length === 1 ? "letra" : "letras"} para
          resolver esta parte.
        </p>
      ) : unresolved ? (
        <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">{missingText}</p>
      ) : (
        <>
          <p className="mt-2 text-[14px] font-semibold text-foreground leading-snug">
            {significado ?? special}
          </p>
          {fraseologia && fraseologia.length > 0 && (
            <p className="mono mt-1 text-[13px] text-muted-foreground">
              fraseología: {fraseologia}
            </p>
          )}
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span
                key={t}
                className="chip"
                style={{
                  background: softBg(tagColor, 12),
                  borderColor: softBorder(tagColor, 28),
                  color: accentText(tagColor),
                }}
              >
                {t}
              </span>
            ))}
            {extraChip && (
              <span
                className="chip"
                title={extraChip.title}
                style={{
                  background: softBg(extraChip.color, 14),
                  borderColor: softBorder(extraChip.color, 32),
                  color: accentText(extraChip.color),
                }}
              >
                {extraChip.label}
              </span>
            )}
          </div>
          {nota && (
            <div className="mt-2.5 flex items-start gap-1.5 text-[12.5px] text-muted-foreground leading-relaxed">
              <Info className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
              <span>{nota}</span>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function Anatomy({ onExample }: { onExample: () => void }) {
  return (
    <div className="mt-5 rounded-xl border border-border bg-muted/25 p-4 sm:p-5">
      <div className="text-[15px] font-semibold tracking-[-0.01em]">
        Cómo está armado el grupo de 5 letras
      </div>
      <p className="mt-1 text-[13.5px] text-muted-foreground leading-relaxed max-w-[720px]">
        Todos los códigos empiezan con Q. Las dos letras siguientes dicen de qué se habla (el
        asunto) y las dos últimas dicen qué le pasa (el estado). Con eso solo ya entiendes la mitad
        del NOTAM antes de leer la casilla E).
      </p>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
        <AnatomyCell code="Q" label="Letra fija" detail="Marca que es un código NOTAM." color="var(--av-cyan-400)" />
        <AnatomyCell
          code="MR"
          label="Asunto · 2ª y 3ª"
          detail="MR es pista (rwy)."
          color="var(--av-blue-500)"
        />
        <AnatomyCell
          code="LC"
          label="Estado · 4ª y 5ª"
          detail="LC es cerrado (clsd)."
          color="var(--av-violet-400)"
        />
      </div>

      <div className="mt-3.5 flex flex-wrap items-center gap-2">
        <span className="text-[13.5px] text-muted-foreground">Entonces</span>
        <span className="mono text-[15px] font-semibold text-foreground tracking-[0.1em]">QMRLC</span>
        <span className="text-[13.5px] text-muted-foreground">se lee</span>
        <span
          className="mono text-[14px] font-semibold"
          style={{ color: accentText("var(--av-green-400)") }}
        >
          RWY CLSD
        </span>
        <span className="text-[13.5px] text-muted-foreground">o sea, pista cerrada.</span>
        <button
          type="button"
          onClick={onExample}
          className="text-[13.5px] font-semibold"
          style={{ color: accentText("var(--av-blue-500)") }}
        >
          Decodificarlo
        </button>
      </div>
    </div>
  )
}

function AnatomyCell({
  code,
  label,
  detail,
  color,
}: {
  code: string
  label: string
  detail: string
  color: string
}) {
  return (
    <div
      className="rounded-xl border p-3.5"
      style={{ borderColor: softBorder(color, 26), background: softBg(color, 6) }}
    >
      <div className="mono text-[22px] font-semibold leading-none" style={{ color: accentText(color) }}>
        {code}
      </div>
      <div className="mt-1.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 text-[13px] text-foreground/85">{detail}</div>
    </div>
  )
}

function Callout({
  tone,
  icon: Icon,
  title,
  children,
}: {
  tone: string
  icon: ComponentType<{ className?: string; style?: CSSProperties }>
  title: string
  children: ReactNode
}) {
  return (
    <div
      className="mt-3 rounded-xl border p-4 flex items-start gap-2.5"
      style={{ borderColor: softBorder(tone, 28), background: softBg(tone, 7) }}
    >
      <Icon className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: tone }} />
      <div>
        <div className="text-[13.5px] font-semibold text-foreground">{title}</div>
        <p className="mt-0.5 text-[13.5px] text-foreground/85 leading-relaxed">{children}</p>
      </div>
    </div>
  )
}

function TimeCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{ borderColor: softBorder(color, 28), background: softBg(color, 6) }}
    >
      <div className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{label}</div>
      <div
        className="mono tabular mt-1 text-[15px] sm:text-[16px] font-semibold leading-snug"
        style={{ color: accentText(color) }}
      >
        {value}
      </div>
    </div>
  )
}

// ─── Pestanias y filtros ─────────────────────────────────────────────────────

function TabButton({
  active,
  onClick,
  label,
  count,
  color,
}: {
  active: boolean
  onClick: () => void
  label: string
  count: number
  color: string
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border text-[14px] font-semibold transition-colors"
      style={{
        borderColor: active ? softBorder(color, 45) : "var(--border)",
        background: active ? softBg(color, 12) : "transparent",
        color: active ? accentText(color) : "var(--muted-foreground)",
      }}
    >
      {label}
      <span className="tabular text-[12px] opacity-70">{count}</span>
    </button>
  )
}

function FilterChip({
  label,
  active,
  onClick,
  color,
}: {
  label: string
  active: boolean
  onClick: () => void
  color: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="chip hover:opacity-85 transition-opacity"
      style={{
        ...TAP_CHIP,
        ...(active
          ? {
              background: softBg(color, 14),
              borderColor: softBorder(color, 38),
              color: accentText(color),
            }
          : {}),
      }}
    >
      {label}
    </button>
  )
}

// ─── Filas de las tablas ─────────────────────────────────────────────────────

function SubjectRowCard({
  row,
  selected,
  onPick,
}: {
  row: SubjectRow
  selected: boolean
  onPick: () => void
}) {
  const color = sectionColor(row.data.seccion)
  return (
    <button
      type="button"
      onClick={onPick}
      aria-label={`Usar el código de asunto ${row.key} en el decodificador`}
      className="w-full text-left rounded-xl border p-3.5 transition-colors hover:bg-muted/50"
      style={{
        borderColor: selected ? softBorder(color, 45) : "var(--border)",
        background: selected ? softBg(color, 8) : "transparent",
      }}
    >
      <span className="flex items-start gap-3">
        <span
          className="mono text-[15px] font-semibold flex-shrink-0 w-[34px]"
          style={{ color: accentText(color) }}
        >
          {row.key}
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-[14px] font-semibold text-foreground leading-snug">
            {row.data.significado}
          </span>
          {row.data.fraseologia.length > 0 && (
            <span className="mono block text-[12.5px] text-muted-foreground mt-0.5">
              {row.data.fraseologia}
            </span>
          )}
          <span className="mt-1.5 flex flex-wrap gap-1.5">
            <span
              className="chip"
              style={{
                background: softBg(color, 12),
                borderColor: softBorder(color, 28),
                color: accentText(color),
              }}
            >
              {row.data.seccion}
            </span>
            <span className="chip">{row.data.subseccion}</span>
          </span>
        </span>
      </span>
    </button>
  )
}

function StatusRowCard({
  row,
  selected,
  onPick,
}: {
  row: StatusRow
  selected: boolean
  onPick: () => void
}) {
  const color = categoryColor(row.data.categoria)
  const cancels = isCancelCode(row.key)
  // XX entra en la lista de códigos que cancelan (Doc 8400, §3.8) aunque su
  // categoría sea "Otros", así que conviene aclarar por qué aparece la etiqueta.
  const cancelTitle =
    row.key === "XX"
      ? "XX significa que el estado va en lenguaje claro en la casilla E), y por eso también sirve para cancelar un NOTAM (Doc 8400, §3.8)."
      : "Doc 8400, §3.8: este estado se usa para cancelar un NOTAM vigente."
  return (
    <button
      type="button"
      onClick={onPick}
      aria-label={`Usar el código de estado ${row.key} en el decodificador`}
      className="w-full text-left rounded-xl border p-3.5 transition-colors hover:bg-muted/50"
      style={{
        borderColor: selected ? softBorder(color, 45) : "var(--border)",
        background: selected ? softBg(color, 8) : "transparent",
      }}
    >
      <span className="flex items-start gap-3">
        <span
          className="mono text-[15px] font-semibold flex-shrink-0 w-[34px]"
          style={{ color: accentText(color) }}
        >
          {row.key}
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-[14px] font-semibold text-foreground leading-snug">
            {row.data.significado}
          </span>
          {row.data.fraseologia.length > 0 && (
            <span className="mono block text-[12.5px] text-muted-foreground mt-0.5">
              {row.data.fraseologia}
            </span>
          )}
          <span className="mt-1.5 flex flex-wrap gap-1.5">
            <span
              className="chip"
              style={{
                background: softBg(color, 12),
                borderColor: softBorder(color, 28),
                color: accentText(color),
              }}
            >
              {row.data.categoria}
            </span>
            {cancels && (
              <span
                className="chip"
                title={cancelTitle}
                style={{
                  background: softBg("var(--av-red-400)", 12),
                  borderColor: softBorder("var(--av-red-400)", 30),
                  color: accentText("var(--av-red-400)"),
                }}
              >
                cancela un NOTAM
              </span>
            )}
          </span>
          {row.data.nota && (
            <span className="mt-2 flex items-start gap-1.5 text-[12px] text-muted-foreground leading-relaxed">
              <Info className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
              <span>{row.data.nota}</span>
            </span>
          )}
        </span>
      </span>
    </button>
  )
}

// ─── Ejemplos oficiales ──────────────────────────────────────────────────────

function ExampleCard({
  example,
  open,
  onToggle,
}: {
  example: OfficialExample
  open: boolean
  onToggle: () => void
}) {
  const boxes = Object.entries(example.notam)
  const kv = Object.entries(example.decodificacion)

  return (
    <div
      className="rounded-2xl border bg-card overflow-hidden"
      style={{
        borderColor: open ? softBorder("var(--av-blue-500)", 32) : "var(--border)",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-start gap-3 p-4 text-left"
      >
        <span
          className="mono flex-shrink-0 mt-0.5 px-2 py-0.5 rounded-md text-[12px] font-semibold"
          style={{
            background: softBg("var(--av-blue-500)", 12),
            color: accentText("var(--av-blue-500)"),
          }}
        >
          {example.notam.Q ? example.notam.Q.split("/")[1] ?? example.id : example.id}
        </span>
        <span className="flex-1 min-w-0 text-[14px] text-foreground leading-snug">
          {example.descripcion}
        </span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="px-4 pb-4 grid gap-3 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-muted/25 p-3.5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              NOTAM tal como se publica
            </div>
            <div className="mt-2 grid gap-1.5">
              {boxes.map(([box, value]) => (
                <div key={box} className="grid grid-cols-[36px_1fr] gap-2 items-baseline">
                  <span
                    className="mono text-[12.5px] font-semibold"
                    style={{ color: accentText("var(--av-blue-500)") }}
                    title={BOX_LABELS[box] ?? box}
                  >
                    {box})
                  </span>
                  <span className="mono text-[12.5px] text-foreground/90 break-words">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl border p-3.5"
            style={{
              borderColor: softBorder("var(--av-green-400)", 24),
              background: softBg("var(--av-green-400)", 5),
            }}
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Decodificación
            </div>
            <dl className="mt-2 grid gap-1.5">
              {kv.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[12px] font-semibold text-muted-foreground">
                    {KV_LABELS[k] ?? k.replace(/_/g, " / ")}
                  </dt>
                  <dd className="text-[13px] text-foreground/90 leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 pt-2.5 border-t border-border/60 text-[12px] text-muted-foreground leading-relaxed">
              Fuente: {example.fuente}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
