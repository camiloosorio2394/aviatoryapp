import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { ArrowLeft, ArrowRight, Check, ListOrdered, X } from "lucide-react"
import { DocBlock } from "@/components/DocLessonBlocks"
import { docAccent } from "@/lib/docSheet"
import { registrarEstudioDiario } from "@/lib/activity"
import { useSession } from "@/hooks/useSession"
import { LEVEL_META, readLocalProgress, writeLocalProgress } from "@/lib/notam"
import {
  fetchNotamProgress,
  markNotamProgress,
  pushPendingLocalProgress,
} from "@/lib/notamProgress"
import { LESSON_SCREENS, LESSON_TOTAL, type LessonBlock } from "@/lib/notamLesson"

const TOTAL = LESSON_TOTAL

/**
 * Lección NOTAM como reproductor paginado, sin scroll de página.
 *
 * Implementa el handoff "Lección 01" (continuación del de la sección, mismos
 * tokens .lector-notam): una lección por vista, dividida en pasos que caben en
 * pantalla, con avance por el botón inferior, pastilla deslizante en el
 * sidebar y retícula de eje izquierdo único. El paso vive en la URL para que
 * recargar no pierda el sitio.
 *
 * Los huecos de imagen van VISIBLES y rotulados a pedido de Camilo: la app
 * está en construcción, solo entran él y Nico, y el hueco es el recordatorio
 * de qué imagen falta y de qué medida.
 *
 * Ruta: /app/aerolinea/notam/aprende?l=1&paso=1
 */
export function NotamLesson() {
  const { user, isLoading: sessionLoading } = useSession()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [readSections, setReadSections] = useState<number[]>(() => readLocalProgress().lessonScreens)
  const [drawer, setDrawer] = useState(false)
  const contentRef = useRef<HTMLDivElement | null>(null)

  const l = clamp(Number(searchParams.get("l")) || 1, 1, TOTAL)
  const leccion = LESSON_SCREENS[l - 1]
  const siguiente = l < TOTAL ? LESSON_SCREENS[l] : null

  // Los pasos de la lección: los cortes de la propia lección si los declara
  // (la 01 trae los del handoff), o el reparto por peso estimado si no.
  const pasos = useMemo(
    () => (leccion.cortes ? partirPorCortes(leccion.blocks, leccion.cortes) : partirEnPasos(leccion.blocks)),
    [leccion],
  )
  const totalPasos = pasos.length
  const paso = clamp(Number(searchParams.get("paso")) || 1, 1, totalPasos)

  const irALeccion = useCallback(
    (n: number) => {
      setSearchParams({ l: String(n) })
      setDrawer(false)
    },
    [setSearchParams],
  )

  const irAPaso = useCallback(
    (p: number) => setSearchParams({ l: String(l), paso: String(p) }, { replace: true }),
    [setSearchParams, l],
  )

  // Marca una lección como completada. Se dispara al TERMINAR su último paso,
  // no al abrirla: es la regla del handoff y es más honesta que el scroll.
  const markRead = useCallback((n: number) => {
    setReadSections((prev) => (prev.includes(n) ? prev : [...prev, n].sort((a, b) => a - b)))
    if (readLocalProgress().lessonScreens.includes(n)) return
    void markNotamProgress({ lessonScreen: n })
    void registrarEstudioDiario("notam-leccion", {
      minutes: LESSON_SCREENS.find((s) => s.n === n)?.minutes ?? 0,
    })
  }, [])

  const completarYSeguir = useCallback(() => {
    markRead(l)
    if (siguiente) irALeccion(siguiente.n)
    else navigate("/app/aerolinea/notam/practica")
  }, [markRead, l, siguiente, irALeccion, navigate])

  const avanzar = useCallback(() => {
    if (paso < totalPasos) irAPaso(paso + 1)
    else completarYSeguir()
  }, [paso, totalPasos, irAPaso, completarYSeguir])

  const retroceder = useCallback(() => {
    if (paso > 1) irAPaso(paso - 1)
    else if (l > 1) irALeccion(l - 1)
  }, [paso, l, irAPaso, irALeccion])

  // Teclado: flechas y espacio avanzan, como pide el handoff. El espacio solo
  // cuando el foco no está en un control, para no robarle el clic a un botón.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return
      // El target puede no ser un elemento (document en eventos sintéticos)
      const t = e.target instanceof HTMLElement ? e.target : null
      if (t?.closest("input, textarea, select, [contenteditable]")) return
      if (e.key === "ArrowRight") avanzar()
      else if (e.key === "ArrowLeft") retroceder()
      else if (e.key === " " && !t?.closest("button, a, [role='button']")) {
        e.preventDefault()
        avanzar()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [avanzar, retroceder])

  // Al cambiar de lección o de paso, el área de contenido vuelve arriba. El
  // scroll interno existe solo como salida de emergencia cuando un paso no
  // cabe (ventana baja, texto ampliado): el documento entero nunca scrollea.
  useEffect(() => {
    contentRef.current?.scrollTo(0, 0)
  }, [l, paso])

  // Hidrata lo completado desde la base, y sube lo local pendiente.
  useEffect(() => {
    if (sessionLoading) return
    const uid = user?.id
    if (!uid) return
    let cancelled = false

    void (async () => {
      const fetched = await fetchNotamProgress(uid)
      if (cancelled || !fetched) return
      const remote = await pushPendingLocalProgress(fetched)
      if (cancelled) return
      const merged = Array.from(
        new Set([...readLocalProgress().lessonScreens, ...remote.lessonScreens]),
      ).sort((a, b) => a - b)
      writeLocalProgress({ lessonScreens: merged })
      setReadSections((prev) =>
        prev.length === merged.length && merged.every((n) => prev.includes(n)) ? prev : merged,
      )
    })()

    return () => {
      cancelled = true
    }
  }, [user?.id, sessionLoading])

  const nivel = LEVEL_META[leccion.level]
  const bloquesDelPaso = pasos[paso - 1] ?? []
  // Los huecos de columna 2 se emparejan a la derecha del texto en escritorio,
  // como la figura del diagrama junto a "Quién los emite" en el handoff. En
  // móvil van en el flujo, después de su texto.
  const derecha = bloquesDelPaso.filter(
    (b): b is Extract<LessonBlock, { kind: "hueco" }> => b.kind === "hueco" && b.col === 2,
  )

  return (
    <div className="lector-notam h-dvh flex overflow-hidden">
      <SidebarNav
        clase="hidden lg:flex"
        lActiva={l}
        readSections={readSections}
        onPick={irALeccion}
      />

      {/* Cajón móvil: el mismo sidebar, deslizado sobre el contenido */}
      {drawer && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-40"
            style={{ background: "rgba(22, 25, 29, 0.45)" }}
            onClick={() => setDrawer(false)}
            aria-hidden
          />
          <div className="lg:hidden fixed inset-y-0 left-0 z-50 flex">
            <SidebarNav clase="flex" lActiva={l} readSections={readSections} onPick={irALeccion} />
            <button
              type="button"
              onClick={() => setDrawer(false)}
              aria-label="Cerrar el índice"
              className="mt-4 ml-2 flex h-9 w-9 items-center justify-center rounded-[6px]"
              style={{ background: "var(--ln-paper)", color: "var(--ln-ink)" }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Barra superior: miga y hora Zulú real */}
        <header
          className="flex h-14 shrink-0 items-center justify-between px-4 lg:px-10 border-b"
          style={{ borderColor: "var(--ln-hair)" }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setDrawer(true)}
              aria-label="Abrir el índice de lecciones"
              className="lg:hidden flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px]"
              style={{ color: "var(--ln-ink)" }}
            >
              <ListOrdered className="h-4 w-4" />
            </button>
            <nav className="flex items-center gap-2 text-[13.5px] min-w-0" aria-label="Miga de pan">
              <Link to="/app/aerolinea" className="hidden sm:inline" style={{ color: "var(--ln-soft)" }}>
                Ingreso a aerolínea
              </Link>
              <span className="hidden sm:inline" style={{ color: "var(--ln-hair-strong)" }}>/</span>
              <Link to="/app/aerolinea/notam" style={{ color: "var(--ln-soft)" }}>
                NOTAM
              </Link>
              <span style={{ color: "var(--ln-hair-strong)" }}>/</span>
              <span className="font-semibold truncate" style={{ color: "var(--ln-ink)" }}>
                Lección {String(l).padStart(2, "0")}
              </span>
            </nav>
          </div>
          <RelojZulu />
        </header>

        {/* Área de contenido: la única región que puede desplazarse */}
        <div ref={contentRef} className="flex-1 overflow-y-auto">
          <div className="px-5 lg:px-10 pt-6 lg:pt-[34px] pb-8">
            {/* Cabecera de la lección: no se re-anima al cambiar de paso */}
            <header>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="ln-epigrafe">
                  <span style={{ color: "var(--ln-primary)" }}>{String(l).padStart(2, "0")}</span> ·{" "}
                  {leccion.kicker}
                </span>
                <span
                  className="ln-epigrafe whitespace-nowrap"
                  style={{ color: docAccent(nivel.color, 55) }}
                >
                  {nivel.label} · {leccion.minutes} min
                </span>
              </div>
              <h1
                className="ln-display mt-2 mb-0 font-bold text-[34px] lg:text-[54px]"
                style={{ lineHeight: 1.0, letterSpacing: "-0.012em", color: "var(--ln-ink)" }}
              >
                {leccion.title}
              </h1>
              <div
                className="mt-4 grid gap-[3px] max-w-[420px]"
                style={{ gridTemplateColumns: `repeat(${TOTAL}, minmax(0, 1fr))` }}
                role="img"
                aria-label={`${readSections.length} de ${TOTAL} lecciones completadas`}
              >
                {LESSON_SCREENS.map((s) => (
                  <div
                    key={s.n}
                    className="h-[5px]"
                    style={{
                      background: readSections.includes(s.n)
                        ? "var(--ln-primary)"
                        : "var(--ln-hair-strong)",
                    }}
                  />
                ))}
              </div>
            </header>

            {/* El paso: solo el cuerpo se funde al avanzar */}
            <div key={`${l}-${paso}`} className="ln-paso mt-8">
              <div
                className="grid grid-cols-1 lg:grid-cols-[minmax(0,700px)_1fr] gap-x-11"
                style={{ rowGap: 38 }}
              >
                {paso === 1 && (
                  <div className="lg:col-span-2">
                    <HuecoImagen
                      rotulo="PORTADA · 1360×500"
                      descripcion="Foto horizontal funcional para esta lección: torre, plataforma o pista. Sin textos encima."
                      alto={250}
                    />
                  </div>
                )}
                {bloquesDelPaso.map((block, i) => {
                  if (block.kind === "interactivo") {
                    return (
                      <div key={i} className="lg:col-span-2 min-w-0">
                        <Decodificador />
                      </div>
                    )
                  }
                  if (block.kind === "hueco") {
                    // Columna 2: en escritorio lo pinta el carril derecho; aquí
                    // solo su versión móvil, en el flujo. Sin col: ancho normal.
                    return (
                      <div key={i} className={block.col === 2 ? "lg:hidden min-w-0" : "lg:col-span-2 min-w-0"}>
                        <HuecoImagen {...block} />
                      </div>
                    )
                  }
                  return (
                    <div key={i} className={esAncho(block) ? "lg:col-span-2 min-w-0" : "min-w-0 lg:col-start-1"}>
                      <div className="doc-sheet doc-prose" style={{ background: "transparent" }}>
                        <DocBlock block={block} />
                      </div>
                    </div>
                  )
                })}
                {/* El carril derecho de escritorio: el diagrama junto al texto,
                    ocupando el hueco con contenido en vez de dejarlo vacío. El
                    span cuenta las filas reales del cuerpo: sobrepasarlas crea
                    filas fantasma que cobran su row-gap y estiran el paso. */}
                {derecha.length > 0 && (
                  <div
                    className="hidden lg:flex min-w-0 flex-col gap-6"
                    style={{
                      gridColumn: 2,
                      gridRow: `${paso === 1 ? 2 : 1} / span ${Math.max(1, bloquesDelPaso.filter((b) => !(b.kind === "hueco" && b.col === 2)).length)}`,
                    }}
                  >
                    {derecha.map((b, i) => (
                      <HuecoImagen key={i} {...b} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pie de navegación: fijo abajo, siempre visible, el único primario */}
        <footer
          className="flex shrink-0 items-center justify-between gap-4 lg:gap-6 border-t px-4 lg:px-10 py-3.5"
          style={{ borderColor: "var(--ln-hair)", background: "var(--ln-paper)" }}
        >
          <button
            type="button"
            onClick={() => (paso === totalPasos ? completarYSeguir() : siguiente ? irALeccion(siguiente.n) : navigate("/app/aerolinea/notam/practica"))}
            className="hidden sm:block min-w-0 text-left"
          >
            <span className="block text-[13px]" style={{ color: "var(--ln-soft)" }}>
              Siguiente
            </span>
            <span
              className="block truncate text-[15px] lg:text-[17.5px] font-semibold"
              style={{ color: "var(--ln-primary)" }}
            >
              {siguiente
                ? `${String(siguiente.n).padStart(2, "0")} · ${siguiente.title} →`
                : "Práctica y evaluación →"}
            </span>
          </button>

          <div className="flex items-center gap-4 lg:gap-5 ml-auto">
            {totalPasos > 1 && (
              <div className="flex items-center gap-[5px]" aria-label={`Paso ${paso} de ${totalPasos}`}>
                {Array.from({ length: totalPasos }, (_, i) => (
                  <span
                    key={i}
                    className="h-[5px] w-[5px] rounded-full"
                    style={{ background: i + 1 === paso ? "var(--ln-primary)" : "var(--ln-hair-strong)" }}
                    aria-hidden
                  />
                ))}
              </div>
            )}
            {readSections.includes(l) && (
              <span className="hidden lg:inline-flex items-center gap-1.5 text-[14px]" style={{ color: "var(--ln-primary)" }}>
                <Check className="h-3.5 w-3.5" strokeWidth={3} /> Lección completada
              </span>
            )}
            {paso > 1 && (
              <button
                type="button"
                onClick={retroceder}
                aria-label="Paso anterior"
                className="flex h-[46px] w-[46px] items-center justify-center rounded-[6px] border"
                style={{ borderColor: "var(--ln-hair-strong)", color: "var(--ln-muted)" }}
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={avanzar}
              className="flex h-[46px] items-center justify-center rounded-[6px] px-6 lg:px-8 text-[15px] font-semibold text-white transition-colors duration-150 hover:brightness-110"
              style={{ background: "var(--ln-primary)" }}
            >
              {paso < totalPasos
                ? "Continuar"
                : siguiente
                  ? `Lección ${String(siguiente.n).padStart(2, "0")} →`
                  : "Práctica y evaluación"}
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}

// ─── Utilidades de paginación ────────────────────────────────────────────────

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, Math.round(n)))
}

/** Bloques que rompen la medida de lectura y ocupan todo el ancho. */
function esAncho(block: LessonBlock): boolean {
  return ["table", "code", "breakdown", "notam", "infografia", "rejilla", "glosario"].includes(
    block.kind,
  )
}

/** Parte los bloques en pasos por los cortes declarados (índices 1-based). */
function partirPorCortes(blocks: LessonBlock[], cortes: number[]): LessonBlock[][] {
  const pasos: LessonBlock[][] = []
  let desde = 0
  for (const corte of cortes) {
    if (corte > desde && corte <= blocks.length) {
      pasos.push(blocks.slice(desde, corte))
      desde = corte
    }
  }
  if (desde < blocks.length) pasos.push(blocks.slice(desde))
  return pasos.length > 0 ? pasos : [blocks]
}

/**
 * Peso aproximado de cada bloque en pantalla. No mide píxeles: reparte para
 * que un paso normal quepa en un portátil, y el scroll interno del área queda
 * como salida de emergencia para ventanas bajas, que es lo que permite el
 * handoff. El contenido no se toca: solo se decide dónde cortar.
 */
const PESO: Record<string, number> = {
  p: 1,
  quote: 1.2,
  list: 1.6,
  check: 1.6,
  callout: 1.4,
  kv: 1.8,
  code: 1.8,
  table: 2.4,
  example: 2.6,
  breakdown: 2.6,
  notam: 3,
  figura: 2.5,
  infografia: 4.5,
  summary: 1.8,
}

function partirEnPasos(blocks: LessonBlock[]): LessonBlock[][] {
  const pasos: LessonBlock[][] = []
  let actual: LessonBlock[] = []
  let peso = 0
  for (const b of blocks) {
    const w = PESO[b.kind] ?? 1.5
    if (actual.length > 0 && peso + w > 7.5) {
      pasos.push(actual)
      actual = []
      peso = 0
    }
    actual.push(b)
    peso += w
  }
  if (actual.length > 0) pasos.push(actual)
  return pasos
}

// ─── Sidebar con pastilla deslizante ─────────────────────────────────────────

interface SidebarNavProps {
  clase: string
  lActiva: number
  readSections: number[]
  onPick: (n: number) => void
}

/**
 * La lista de las 13 lecciones con UN indicador que viaja: la pastilla. Todas
 * las filas usan el mismo color de texto, la activa incluida; la selección la
 * comunica solo la pastilla. Se anima transform y altura (una fila de dos
 * líneas mide distinto), se mide por ref, se recalcula en resize, y en el
 * primer render se coloca sin transición para no deslizar desde cero.
 */
function SidebarNav({ clase, lActiva, readSections, onPick }: SidebarNavProps) {
  const filas = useRef<(HTMLButtonElement | null)[]>([])
  const [pill, setPill] = useState({ y: 0, h: 36 })
  const [anim, setAnim] = useState(false)

  const medir = useCallback(() => {
    const fila = filas.current[lActiva - 1]
    if (fila) setPill({ y: fila.offsetTop, h: fila.offsetHeight })
  }, [lActiva])

  useLayoutEffect(() => {
    medir()
  }, [medir])

  useEffect(() => {
    // La transición se enciende después del primer render colocado.
    const id = window.setTimeout(() => setAnim(true), 60)
    window.addEventListener("resize", medir)
    return () => {
      window.clearTimeout(id)
      window.removeEventListener("resize", medir)
    }
  }, [medir])

  return (
    <aside
      className={`ln-side ${clase} h-full w-[296px] shrink-0 flex-col overflow-y-auto`}
      style={{ background: "var(--ln-navy)", paddingTop: 22, paddingBottom: 24 }}
      aria-label="Lecciones"
    >
      <Link to="/app" className="flex items-center gap-2.5 px-5">
        <span
          className="ln-display flex h-[26px] w-[26px] items-center justify-center rounded-[4px] text-[17px] font-bold"
          style={{ background: "var(--ln-paper)", color: "var(--ln-navy)" }}
        >
          A
        </span>
        <span className="mono text-[12px] font-semibold tracking-[0.18em]" style={{ color: "var(--ln-paper)" }}>
          AVIATORY
        </span>
      </Link>

      <div className="mt-[26px] flex items-baseline justify-between px-5">
        <span
          className="mono text-[10px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: "var(--ln-navy-label)" }}
        >
          NOTAM · Lección
        </span>
        <span className="mono text-[10px] tabular" style={{ color: "var(--ln-navy-dim)" }}>
          {readSections.length} / {TOTAL}
        </span>
      </div>

      {/* El envoltorio relativo contiene la pastilla y, encima, las filas */}
      <div className="relative mt-2.5">
        <div
          className={`absolute ${anim ? "ln-pastilla" : ""}`}
          style={{
            top: 0,
            left: 8,
            right: 8,
            height: pill.h,
            transform: `translateY(${pill.y}px)`,
            background: "var(--ln-pill)",
            borderRadius: 7,
            pointerEvents: "none",
          }}
          aria-hidden
        />
        <nav className="relative">
          {LESSON_SCREENS.map((s, i) => (
            <button
              key={s.n}
              ref={(el) => {
                filas.current[i] = el
              }}
              type="button"
              onClick={() => onPick(s.n)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") filas.current[i + 1]?.focus()
                if (e.key === "ArrowUp") filas.current[i - 1]?.focus()
              }}
              aria-current={s.n === lActiva ? "page" : undefined}
              className="ln-fila grid w-full grid-cols-[24px_1fr_14px] items-center gap-2.5 rounded-[7px] px-5 text-left"
              style={{ paddingTop: 9, paddingBottom: 9 }}
            >
              <span className="mono text-[11px] tabular" style={{ color: "var(--ln-navy-dim)" }}>
                {String(s.n).padStart(2, "0")}
              </span>
              <span className="ln-fila-titulo text-[14px] leading-[1.3]" style={{ color: "var(--ln-item)" }}>
                {s.title}
              </span>
              {readSections.includes(s.n) && (
                <Check className="h-[11px] w-[11px]" strokeWidth={3} style={{ color: "var(--ln-navy-dim)" }} aria-label="Completada" />
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto px-5">
        <div className="border-t pt-2 mt-4" style={{ borderColor: "var(--ln-navy-rule)" }}>
          {[
            { to: "/app/aerolinea/notam/practica", label: "Práctica" },
            { to: "/app/aerolinea/notam/evaluacion", label: "Evaluación" },
          ].map((x) => (
            <Link
              key={x.to}
              to={x.to}
              className="flex items-center justify-between text-[14.5px] transition-colors duration-150 hover:text-white"
              style={{ color: "var(--ln-footer)", paddingTop: 9, paddingBottom: 9 }}
            >
              {x.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          ))}
          <Link
            to="/app/aerolinea/notam"
            className="mt-1 inline-flex items-center gap-1.5 text-[13px] transition-colors duration-150 hover:text-white"
            style={{ color: "var(--ln-navy-dim)" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Volver a NOTAM
          </Link>
        </div>
      </div>
    </aside>
  )
}

// ─── Reloj Zulú ──────────────────────────────────────────────────────────────

function RelojZulu() {
  const [zulu, setZulu] = useState(() => formatZulu(new Date()))
  useEffect(() => {
    const id = window.setInterval(() => setZulu(formatZulu(new Date())), 30_000)
    return () => window.clearInterval(id)
  }, [])
  return (
    <span className="mono shrink-0 text-[11px] tracking-[0.1em]" style={{ color: "var(--ln-faint)" }}>
      ZULÚ {zulu}
    </span>
  )
}

function formatZulu(d: Date): string {
  return `${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}Z`
}

// ─── Hueco de imagen rotulado ────────────────────────────────────────────────

/**
 * Placeholder visible a propósito: la app está en construcción y el hueco es
 * el recordatorio de qué imagen falta y de qué medida. Sin radio, hundido en
 * paper-sunk, como manda el handoff. Cuando llegue el archivo real, el hueco
 * se cambia por la imagen conservando el pie.
 */
function HuecoImagen({
  rotulo,
  descripcion,
  alto,
  anchoMax,
  pie,
}: {
  rotulo: string
  descripcion: string
  alto: number
  anchoMax?: number
  pie?: string
}) {
  return (
    <figure className="m-0" style={anchoMax ? { maxWidth: anchoMax } : undefined}>
      <div
        className="flex flex-col items-center justify-center gap-1.5 border px-6 text-center"
        style={{ height: alto, background: "var(--ln-sunk)", borderColor: "var(--ln-hair)" }}
      >
        <span
          className="mono text-[11px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: "var(--ln-primary)" }}
        >
          {rotulo}
        </span>
        <span className="max-w-[420px] text-[13.5px] leading-[1.5]" style={{ color: "var(--ln-soft)" }}>
          {descripcion}
        </span>
      </div>
      {pie && (
        <figcaption className="mt-2 text-[12.5px] leading-[1.5]" style={{ color: "var(--ln-faint)" }}>
          {pie}
        </figcaption>
      )}
    </figure>
  )
}

// ─── Decodificador interactivo ───────────────────────────────────────────────

interface Casilla {
  clave: string
  codigo: string
  rotulo: string
  explicacion: string
}

/**
 * Ejemplo didáctico con formato OACI completo (las casillas Q a G). No es un
 * aviso vigente y la pieza lo dice en pantalla: el resumen colombiano no trae
 * la línea Q, y justamente por eso el ejemplo completo se construye aparte.
 */
const NOTAM_DEMO: { cabecera: string; casillas: Casilla[]; aviso: string } = {
  cabecera: "A2451/26 NOTAMN",
  casillas: [
    {
      clave: "Q",
      codigo: "Q) SKED/QMRLC/IV/NBO/A/000/999/0442N07409W005",
      rotulo: "Q) calificador: QMRLC, pista cerrada",
      explicacion: "Calificador: FIR, clave QMRLC = pista cerrada, tráfico IFR/VFR, alcance aeródromo.",
    },
    {
      clave: "A",
      codigo: "A) SKBO",
      rotulo: "A) aeródromo: SKBO",
      explicacion: "Aeródromo afectado: SKBO, El Dorado.",
    },
    {
      clave: "B",
      codigo: "B) 2608010600",
      rotulo: "B) inicio de vigencia",
      explicacion: "Inicio de vigencia: 01 AGO 2026, 06:00 UTC.",
    },
    {
      clave: "C",
      codigo: "C) 2608012359",
      rotulo: "C) fin de vigencia",
      explicacion: "Fin de vigencia: mismo día, 23:59 UTC.",
    },
    {
      clave: "E",
      codigo: "E) RWY 13L/31R CLSD DUE WIP",
      rotulo: "E) texto llano de la condición",
      explicacion: "Texto llano: pista 13L/31R cerrada por trabajos en curso (WIP).",
    },
    {
      clave: "F",
      codigo: "F) SFC  G) UNL",
      rotulo: "F/G) límites verticales",
      explicacion: "Límites verticales: desde superficie hasta ilimitado.",
    },
  ],
  aviso:
    "Un cierre de pista es NOTAM de precaución operativa: obliga a recalcular performance y alternos antes de despachar.",
}

const LINEAS_CODIGO: string[][] = [["Q"], ["A", "B", "C"], ["E"], ["F"]]

function Decodificador() {
  const [activa, setActiva] = useState<string | null>(null)
  const porClave = useMemo(() => new Map(NOTAM_DEMO.casillas.map((c) => [c.clave, c])), [])
  const rotulo = activa ? (porClave.get(activa)?.rotulo ?? "") : "Señala una casilla o su texto"

  return (
    <section aria-label="Decodificador interactivo">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2
          className="ln-display m-0 text-[24px] lg:text-[30px] font-semibold"
          style={{ lineHeight: 1.1, color: "var(--ln-ink)" }}
        >
          Así se ve uno de verdad
        </h2>
        <span className="mono hidden lg:inline text-[11.5px]" style={{ color: "var(--ln-primary)" }} aria-live="polite">
          {rotulo}
        </span>
      </div>

      {/* Escritorio: dos paneles con resaltado cruzado bidireccional */}
      <div
        className="mt-4 hidden lg:grid grid-cols-[1.05fr_1fr] overflow-hidden rounded-[8px] border"
        style={{ borderColor: "var(--ln-hair-strong)" }}
        onMouseLeave={() => setActiva(null)}
      >
        <div
          className="mono flex flex-col justify-center px-[26px] py-6 text-[13.5px]"
          style={{ background: "var(--ln-navy)", lineHeight: 2.1 }}
        >
          <div style={{ color: "var(--ln-navy-dim)" }}>{NOTAM_DEMO.cabecera}</div>
          {LINEAS_CODIGO.map((claves, i) => (
            <div key={i}>
              {claves.map((clave, j) => {
                const c = porClave.get(clave)
                if (!c) return null
                const on = activa === clave
                return (
                  <span key={clave}>
                    {j > 0 && " "}
                    <span
                      role="button"
                      tabIndex={0}
                      onMouseEnter={() => setActiva(clave)}
                      onFocus={() => setActiva(clave)}
                      onBlur={() => setActiva(null)}
                      onClick={() => setActiva(on ? null : clave)}
                      className="cursor-pointer rounded-[3px] px-[5px] py-[3px] transition-colors duration-100"
                      style={{
                        background: on ? "var(--ln-bright)" : "transparent",
                        color: on ? "var(--ln-on-bright)" : "var(--ln-navy-text)",
                        fontWeight: on ? 600 : 400,
                      }}
                    >
                      {c.codigo}
                    </span>
                  </span>
                )
              })}
            </div>
          ))}
        </div>

        <div style={{ background: "var(--ln-paper)", borderLeft: "1px solid var(--ln-hair-strong)" }}>
          {NOTAM_DEMO.casillas.map((c, i) => {
            const on = activa === c.clave
            return (
              <div
                key={c.clave}
                onMouseEnter={() => setActiva(c.clave)}
                onClick={() => setActiva(on ? null : c.clave)}
                className="grid grid-cols-[46px_1fr] gap-3 px-[18px] py-[11px] transition-colors duration-100"
                style={{
                  background: on ? "var(--ln-tint)" : "transparent",
                  borderBottom: i < NOTAM_DEMO.casillas.length - 1 ? "1px solid var(--ln-row-rule)" : "none",
                  cursor: "default",
                }}
              >
                <span className="mono text-[12.5px] font-semibold" style={{ color: "var(--ln-primary)" }}>
                  {c.clave === "F" ? "F/G)" : `${c.clave})`}
                </span>
                <span className="text-[14px] leading-[1.5]" style={{ color: "var(--ln-body)" }}>
                  {c.explicacion}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Móvil: código arriba y fichas apiladas, sin scroll horizontal */}
      <div className="mt-4 flex flex-col gap-2.5 lg:hidden">
        <div
          className="mono rounded-[6px] px-4 py-3.5 text-[11.5px]"
          style={{ background: "var(--ln-navy)", color: "var(--ln-navy-text)", lineHeight: 1.85 }}
        >
          <div style={{ color: "var(--ln-navy-dim)" }}>{NOTAM_DEMO.cabecera}</div>
          {NOTAM_DEMO.casillas.map((c) => (
            <div key={c.clave} className="break-words">
              {c.codigo}
            </div>
          ))}
        </div>
        {NOTAM_DEMO.casillas.map((c) => {
          const precaucion = c.clave === "E"
          return (
            <div
              key={c.clave}
              className="px-3.5 py-3"
              style={{
                background: precaucion ? "var(--ln-caution-bg)" : "var(--ln-sunk)",
                borderLeft: `3px solid ${precaucion ? "var(--ln-caution)" : "var(--ln-primary)"}`,
                borderRadius: "0 6px 6px 0",
              }}
            >
              <div
                className="mono text-[11.5px] font-semibold"
                style={{ color: precaucion ? "var(--ln-caution)" : "var(--ln-primary)" }}
              >
                {c.codigo}
              </div>
              <div
                className="mt-1 text-[14px] leading-[1.5]"
                style={{ color: precaucion ? "var(--ln-caution-ink)" : "var(--ln-body)" }}
              >
                {c.explicacion}
              </div>
            </div>
          )
        })}
      </div>

      <div
        className="mt-3.5 px-3.5 py-[11px] text-[13px] leading-[1.55]"
        style={{
          background: "var(--ln-caution-bg)",
          borderLeft: "3px solid var(--ln-caution)",
          color: "var(--ln-caution-ink)",
        }}
      >
        {NOTAM_DEMO.aviso}
      </div>
      <p className="mono mt-2.5 mb-0 text-[11px]" style={{ color: "var(--ln-faint)" }}>
        Ejemplo didáctico con formato OACI completo. No es un aviso vigente.
      </p>
    </section>
  )
}
