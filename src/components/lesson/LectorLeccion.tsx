import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { ArrowLeft, ArrowRight, Check, ListOrdered, MessageSquareQuote, X } from "lucide-react"
import { DocBlock } from "@/components/DocLessonBlocks"
import { HuecoImagen } from "@/components/lesson/HuecoImagen"
import { PantallaEntrevista, type LectorEntrevista } from "@/components/lesson/EntrevistaNivel"
import { docAccent } from "@/lib/docSheet"
import { registrarEstudioDiario } from "@/lib/activity"
import { useSession } from "@/hooks/useSession"
import { LEVEL_META } from "@/lib/notamComun"
import type { DocScreen } from "@/lib/docBlocks"

/**
 * Un nivel del temario: el rótulo que se pinta en el índice encima de la
 * primera lección que le pertenece.
 */
export interface LectorNivel {
  titulo: string
  /** Número de la primera lección del nivel. */
  desde: number
}

/**
 * Lo que un módulo tiene que decir para que el lector lo enseñe.
 *
 * El lector no sabe de NOTAM ni de mercancías: sabe de lecciones, de progreso
 * y de un tema visual. Cada módulo trae sus lecciones, sus rutas, sus
 * funciones de progreso y, si tiene alguna pieza interactiva propia, quién
 * la pinta.
 */
export interface LectorModulo {
  /** Clase del tema: "lector-notam" a secas, o con un modificador ("lector-notam lector-mp"). */
  tema?: string
  /** Nombre corto para la miga y el «Volver a …». */
  nombre: string
  /** Rótulo del índice: "NOTAM · Módulo". */
  rotulo: string
  hub: string
  practica?: string
  evaluacion?: string
  /** Carpeta pública de las portadas: "/modulos/notam". */
  portadas: string
  /**
   * Proporción de la portada. Por defecto 8:3, que es la franja con la que
   * abre NOTAM. Un módulo cuyas portadas sean piezas diseñadas (con título y
   * pie dentro de la imagen) pide la suya, porque el recorte por el centro se
   * comería justamente eso.
   */
  portadaRatio?: string
  /** Clave de la actividad diaria que se registra al completar una lección. */
  actividad: Parameters<typeof registrarEstudioDiario>[0]
  lecciones: DocScreen[]
  niveles?: LectorNivel[]
  /**
   * La entrevista de aerolínea que cierra cada nivel: una pantalla propia
   * después de la última lección del nivel (?e=1). No es una lección: no se
   * numera ni cuenta para el progreso, así las lecciones siguen siendo las que
   * la base y los logros esperan.
   */
  entrevistas?: LectorEntrevista[]
  /** Adónde va el «Continuar» de la última lección. */
  alFinal: string
  /** El texto del pie en la última lección: "Práctica y evaluación →". */
  textoFinal: string
  leerLocal: () => number[]
  escribirLocal: (ns: number[]) => void
  /** Marca una lección leída, local y en la base. */
  marcar: (n: number) => Promise<void> | void
  /** Trae lo leído desde la base y sube lo local pendiente. Devuelve la lista remota. */
  hidratar?: (uid: string) => Promise<number[] | null>
  /** Pinta un bloque `interactivo` por su nombre. Sin él, el bloque no pinta nada. */
  interactivo?: (nombre: string) => ReactNode
}

/**
 * Lector de lecciones-documento: cada lección es UNA página que se lee
 * scrolleando, como el standalone aprobado para NOTAM. El sidebar navy queda
 * fijo con las lecciones y la pastilla; el contenido scrollea; el pie con
 * "Siguiente" y "Continuar" cierra la página y pasa a la lección que viene.
 * Sin pasos ni puntos: la paginación es entre lecciones, no dentro de una.
 *
 * Todo va en UNA columna de 720px, centrada como la página de un PDF: la
 * portada, los títulos y el texto comparten el mismo ancho y el mismo borde
 * izquierdo. La portada se resuelve por nombre de archivo (ver Portada).
 *
 * Los huecos de imagen van VISIBLES y rotulados a pedido de Camilo: la app
 * está en construcción, solo entran él y Nico, y el hueco es el recordatorio
 * de qué imagen falta y de qué medida.
 *
 * Nació como NotamLesson; se generalizó para Mercancías peligrosas sin cambiar
 * nada de lo que NOTAM ya enseñaba.
 *
 * Ruta: <hub>/aprende?l=1
 */
export function LectorLeccion({ modulo }: { modulo: LectorModulo }) {
  const TOTAL = modulo.lecciones.length
  const { user, isLoading: sessionLoading } = useSession()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  // Descarta los números de lección que ya no existen. El progreso se guarda
  // por número, así que al retirar una lección del temario los números altos
  // quedarían fuera de rango y el contador enseñaría "13 / 12".
  const soloExistentes = useCallback(
    (ns: number[]) => ns.filter((n) => n >= 1 && n <= TOTAL),
    [TOTAL],
  )

  const [readSections, setReadSections] = useState<number[]>(() =>
    soloExistentes(modulo.leerLocal()),
  )
  const [drawer, setDrawer] = useState(false)
  const contentRef = useRef<HTMLDivElement | null>(null)

  // Las entrevistas hechas viven solo en este navegador: son ensayo, no progreso.
  const claveEntrevistas = `aviatory.${modulo.actividad}.entrevistas`
  const [entrevistasHechas, setEntrevistasHechas] = useState<number[]>(() => {
    try {
      const v: unknown = JSON.parse(localStorage.getItem(claveEntrevistas) ?? "[]")
      return Array.isArray(v) ? v.filter((x): x is number => typeof x === "number") : []
    } catch {
      return []
    }
  })

  // ?e=N abre la entrevista del nivel N. Si el módulo no la tiene, se ignora
  // y manda ?l como siempre.
  const entrevista = modulo.entrevistas?.find((x) => x.nivel === Number(searchParams.get("e"))) ?? null
  const l = clamp(Number(searchParams.get("l")) || (entrevista ? entrevista.tras : 1), 1, TOTAL)
  const leccion = modulo.lecciones[l - 1]
  // Lo que viene después de esta pantalla: tras la última lección de un nivel
  // va su entrevista; tras la entrevista, la primera lección del nivel que sigue.
  const entrevistaTras = entrevista ? null : (modulo.entrevistas?.find((x) => x.tras === l) ?? null)
  const nSiguiente = entrevista ? entrevista.tras + 1 : l + 1
  const siguiente = entrevistaTras ? null : nSiguiente <= TOTAL ? modulo.lecciones[nSiguiente - 1] : null

  const irALeccion = useCallback(
    (n: number) => {
      setSearchParams({ l: String(n) })
      setDrawer(false)
    },
    [setSearchParams],
  )

  const irAEntrevista = useCallback(
    (nivel: number) => {
      setSearchParams({ e: String(nivel) })
      setDrawer(false)
    },
    [setSearchParams],
  )

  const marcarEntrevista = useCallback(
    (nivel: number) => {
      setEntrevistasHechas((prev) => {
        if (prev.includes(nivel)) return prev
        const next = [...prev, nivel].sort((a, b) => a - b)
        try {
          localStorage.setItem(claveEntrevistas, JSON.stringify(next))
        } catch {
          // Sin almacenamiento: la marca dura lo que dure la página.
        }
        return next
      })
    },
    [claveEntrevistas],
  )

  // Marca una lección como completada. Se dispara con el Continuar del final,
  // no al abrirla: llegar al pie es haberla recorrido.
  const markRead = useCallback(
    (n: number) => {
      setReadSections((prev) => (prev.includes(n) ? prev : [...prev, n].sort((a, b) => a - b)))
      if (modulo.leerLocal().includes(n)) return
      void modulo.marcar(n)
      void registrarEstudioDiario(modulo.actividad, {
        minutes: modulo.lecciones.find((s) => s.n === n)?.minutes ?? 0,
      })
    },
    [modulo],
  )

  const completarYSeguir = useCallback(() => {
    if (entrevista) marcarEntrevista(entrevista.nivel)
    else markRead(l)
    if (entrevistaTras) irAEntrevista(entrevistaTras.nivel)
    else if (siguiente) irALeccion(siguiente.n)
    else navigate(modulo.alFinal)
  }, [entrevista, marcarEntrevista, markRead, l, entrevistaTras, irAEntrevista, siguiente, irALeccion, navigate, modulo.alFinal])

  // Al cambiar de pantalla, el área de contenido vuelve arriba.
  useEffect(() => {
    contentRef.current?.scrollTo(0, 0)
  }, [l, entrevista])

  // Hidrata lo completado desde la base, y sube lo local pendiente.
  useEffect(() => {
    if (sessionLoading) return
    const uid = user?.id
    if (!uid || !modulo.hidratar) return
    let cancelled = false

    void (async () => {
      const remote = await modulo.hidratar?.(uid)
      if (cancelled || !remote) return
      const merged = soloExistentes(
        Array.from(new Set([...modulo.leerLocal(), ...remote])),
      ).sort((a, b) => a - b)
      modulo.escribirLocal(merged)
      setReadSections((prev) =>
        prev.length === merged.length && merged.every((n) => prev.includes(n)) ? prev : merged,
      )
    })()

    return () => {
      cancelled = true
    }
  }, [user?.id, sessionLoading, modulo, soloExistentes])

  const nivel = leccion.level ? LEVEL_META[leccion.level] : null

  return (
    <div className={`${modulo.tema ?? "lector-notam"} h-dvh flex overflow-hidden`}>
      <SidebarNav
        clase="hidden lg:flex"
        modulo={modulo}
        lActiva={l}
        eActiva={entrevista?.nivel ?? null}
        readSections={readSections}
        entrevistasHechas={entrevistasHechas}
        onPick={irALeccion}
        onPickEntrevista={irAEntrevista}
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
            <SidebarNav
              clase="flex"
              modulo={modulo}
              lActiva={l}
              eActiva={entrevista?.nivel ?? null}
              readSections={readSections}
              entrevistasHechas={entrevistasHechas}
              onPick={irALeccion}
              onPickEntrevista={irAEntrevista}
            />
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
              <Link to={modulo.hub} style={{ color: "var(--ln-soft)" }}>
                {modulo.nombre}
              </Link>
              <span style={{ color: "var(--ln-hair-strong)" }}>/</span>
              <span className="font-semibold truncate" style={{ color: "var(--ln-ink)" }}>
                {entrevista ? `Entrevista · Nivel ${entrevista.nivel}` : `Lección ${String(l).padStart(2, "0")}`}
              </span>
            </nav>
          </div>
          <RelojZulu />
        </header>

        {/* Área de contenido: la única región que puede desplazarse */}
        <div ref={contentRef} className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[800px] px-5 lg:px-10 pt-6 lg:pt-[34px] pb-8">
            {/* Cabecera de la lección: no se re-anima al cambiar de paso */}
            <header>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                {entrevista ? (
                  <span className="ln-epigrafe">
                    <span style={{ color: "var(--ln-primary)" }}>Entrevista</span> · Nivel {entrevista.nivel} ·{" "}
                    {entrevista.titulo}
                  </span>
                ) : (
                  <span className="ln-epigrafe">
                    <span style={{ color: "var(--ln-primary)" }}>{String(l).padStart(2, "0")}</span> ·{" "}
                    {leccion.kicker}
                  </span>
                )}
                <span
                  className="ln-epigrafe whitespace-nowrap"
                  style={nivel && !entrevista ? { color: docAccent(nivel.color, 55) } : undefined}
                >
                  {entrevista
                    ? `${entrevista.preguntas.length} preguntas · ${entrevista.minutes} min`
                    : `${nivel ? `${nivel.label} · ` : ""}${leccion.minutes} min`}
                </span>
              </div>
              <h1
                className="ln-display mt-2 mb-0 font-bold text-[34px] lg:text-[44px]"
                style={{ lineHeight: 1.0, letterSpacing: "-0.012em", color: "var(--ln-ink)" }}
              >
                {entrevista ? "Lo que te pueden preguntar en una aerolínea" : leccion.title}
              </h1>
              <div
                className="mt-4 grid gap-[3px] max-w-[420px]"
                style={{ gridTemplateColumns: `repeat(${TOTAL}, minmax(0, 1fr))` }}
                role="img"
                aria-label={`${readSections.length} de ${TOTAL} lecciones completadas`}
              >
                {modulo.lecciones.map((s) => (
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

            {/* La lección entera, de corrido: se lee scrolleando */}
            <div key={entrevista ? `e${entrevista.nivel}` : l} className="ln-paso mt-8">
              {entrevista ? (
                <PantallaEntrevista
                  dir={modulo.portadas}
                  ratio={modulo.portadaRatio ?? PORTADA_RATIO}
                  entrevista={entrevista}
                  clave={`aviatory.${modulo.actividad}`}
                />
              ) : (
              <div className="flex flex-col" style={{ rowGap: 38 }}>
                <Portada
                  dir={modulo.portadas}
                  n={l}
                  titulo={leccion.title}
                  ratio={modulo.portadaRatio}
                />
                {leccion.blocks.map((block, i) => {
                  if (block.kind === "interactivo") {
                    return (
                      <div key={i} className="min-w-0">
                        {modulo.interactivo?.(block.nombre)}
                      </div>
                    )
                  }
                  if (block.kind === "hueco") {
                    return (
                      <div key={i} className="min-w-0">
                        <HuecoImagen {...block} />
                      </div>
                    )
                  }
                  return (
                    <div key={i} className="min-w-0">
                      <div className="doc-sheet doc-prose" style={{ background: "transparent" }}>
                        <DocBlock block={block} />
                      </div>
                    </div>
                  )
                })}
              </div>
              )}

              {/* Pie de la lección, al final del contenido como en el
                  standalone: Siguiente a la izquierda, Continuar a la derecha */}
              <footer
                className="mt-11 flex items-center justify-between gap-4 border-t pt-6"
                style={{ borderColor: "var(--ln-hair)" }}
              >
                <button
                  type="button"
                  onClick={completarYSeguir}
                  className="hidden sm:block min-w-0 text-left"
                >
                  <span className="block text-[13px]" style={{ color: "var(--ln-soft)" }}>
                    Siguiente
                  </span>
                  <span
                    className="block truncate text-[15px] lg:text-[17.5px] font-semibold"
                    style={{ color: "var(--ln-primary)" }}
                  >
                    {entrevistaTras
                      ? `Entrevista · Nivel ${entrevistaTras.nivel} →`
                      : siguiente
                        ? `${String(siguiente.n).padStart(2, "0")} · ${siguiente.title} →`
                        : modulo.textoFinal}
                  </span>
                </button>

                <div className="flex items-center gap-4 lg:gap-5 ml-auto">
                  {(entrevista ? entrevistasHechas.includes(entrevista.nivel) : readSections.includes(l)) && (
                    <span
                      className="hidden lg:inline-flex items-center gap-1.5 text-[14px]"
                      style={{ color: "var(--ln-primary)" }}
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3} /> {entrevista ? "Entrevista ensayada" : "Lección completada"}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={completarYSeguir}
                    className="flex h-[46px] items-center justify-center rounded-[6px] px-6 lg:px-8 text-[15px] font-semibold text-white transition-colors duration-150 hover:brightness-110"
                    style={{ background: "var(--ln-primary)" }}
                  >
                    Continuar
                  </button>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Utilidades ──────────────────────────────────────────────────────────────

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, Math.round(n)))
}

// ─── Sidebar con pastilla deslizante ─────────────────────────────────────────

interface SidebarNavProps {
  clase: string
  modulo: LectorModulo
  lActiva: number
  /** Nivel de la entrevista abierta, o null si lo abierto es una lección. */
  eActiva: number | null
  readSections: number[]
  entrevistasHechas: number[]
  onPick: (n: number) => void
  onPickEntrevista: (nivel: number) => void
}

/** Una fila del índice: una lección, o la entrevista que cierra un nivel. */
type FilaIndice =
  | { clave: string; tipo: "leccion"; n: number; titulo: string }
  | { clave: string; tipo: "entrevista"; n: number; nivel: number; preguntas: number }

/**
 * La lista de lecciones con UN indicador que viaja: la pastilla. Todas las
 * filas usan el mismo color de texto, la activa incluida; la selección la
 * comunica solo la pastilla. Se anima transform y altura (una fila de dos
 * líneas mide distinto), se mide por ref, se recalcula en resize, y en el
 * primer render se coloca sin transición para no deslizar desde cero.
 *
 * Si el módulo trae niveles, cada uno pone su rótulo encima de su primera
 * lección. Son texto, no filas: no se pulsan y la pastilla los ignora.
 */
function SidebarNav({ clase, modulo, lActiva, eActiva, readSections, entrevistasHechas, onPick, onPickEntrevista }: SidebarNavProps) {
  const TOTAL = modulo.lecciones.length
  const filas = useRef<(HTMLButtonElement | null)[]>([])
  const [pill, setPill] = useState({ y: 0, h: 36 })
  const [anim, setAnim] = useState(false)

  // Las filas en el orden en que se ven: cada lección y, tras la última de un
  // nivel, su entrevista. La pastilla y las flechas del teclado van por índice
  // de fila, no por número de lección, porque la entrevista no tiene número.
  const indice = useMemo<FilaIndice[]>(() => {
    const out: FilaIndice[] = []
    for (const s of modulo.lecciones) {
      out.push({ clave: `l${s.n}`, tipo: "leccion", n: s.n, titulo: s.title })
      const e = modulo.entrevistas?.find((x) => x.tras === s.n)
      if (e) out.push({ clave: `e${e.nivel}`, tipo: "entrevista", n: s.n, nivel: e.nivel, preguntas: e.preguntas.length })
    }
    return out
  }, [modulo.lecciones, modulo.entrevistas])
  const iActiva = indice.findIndex((f) => f.clave === (eActiva !== null ? `e${eActiva}` : `l${lActiva}`))

  const medir = useCallback(() => {
    const fila = filas.current[iActiva]
    if (fila) setPill({ y: fila.offsetTop, h: fila.offsetHeight })
  }, [iActiva])

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

  const nivelDe = (n: number) => modulo.niveles?.find((x) => x.desde === n)

  const enlaces = [
    modulo.practica ? { to: modulo.practica, label: "Práctica" } : null,
    modulo.evaluacion ? { to: modulo.evaluacion, label: "Evaluación" } : null,
  ].filter((x): x is { to: string; label: string } => x !== null)

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
          {modulo.rotulo}
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
          {indice.map((f, i) => {
            const nivel = f.tipo === "leccion" ? nivelDe(f.n) : undefined
            const activa = i === iActiva
            const hecha = f.tipo === "leccion" ? readSections.includes(f.n) : entrevistasHechas.includes(f.nivel)
            return (
              <div key={f.clave}>
                {nivel && (
                  <div
                    className={`mono px-5 text-[9.5px] font-semibold uppercase tracking-[0.16em] ${i === 0 ? "pb-1.5" : "pt-4 pb-1.5"}`}
                    style={{ color: "var(--ln-navy-label)" }}
                    aria-hidden
                  >
                    {nivel.titulo}
                  </div>
                )}
                <button
                  ref={(el) => {
                    filas.current[i] = el
                  }}
                  type="button"
                  onClick={() => (f.tipo === "leccion" ? onPick(f.n) : onPickEntrevista(f.nivel))}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") filas.current[i + 1]?.focus()
                    if (e.key === "ArrowUp") filas.current[i - 1]?.focus()
                  }}
                  aria-current={activa ? "page" : undefined}
                  className="ln-fila grid w-full grid-cols-[24px_1fr_14px] items-start gap-2.5 rounded-[7px] px-5 text-left"
                  style={{ paddingTop: 9, paddingBottom: 9, minHeight: 54 }}
                >
                  {f.tipo === "leccion" ? (
                    <>
                      <span className="mono mt-[3px] text-[11px] tabular" style={{ color: "var(--ln-navy-dim)" }}>
                        {String(f.n).padStart(2, "0")}
                      </span>
                      <span className="ln-fila-titulo text-[14px] leading-[1.3]" style={{ color: "var(--ln-item)" }}>
                        {f.titulo}
                      </span>
                    </>
                  ) : (
                    <>
                      {/* La entrevista no lleva número: lleva el icono, y debajo
                          del título dice lo que es. Así se distingue de una
                          lección sin romper la columna. */}
                      <MessageSquareQuote className="mt-[3px] h-[13px] w-[13px]" style={{ color: "var(--ln-bright)" }} aria-hidden />
                      <span className="min-w-0">
                        <span className="ln-fila-titulo block text-[14px] leading-[1.3]" style={{ color: "var(--ln-item)" }}>
                          Lo que te pueden preguntar
                        </span>
                        <span
                          className="mono mt-[3px] block text-[9.5px] font-semibold uppercase tracking-[0.14em]"
                          style={{ color: "var(--ln-navy-dim)" }}
                        >
                          Entrevista · {f.preguntas} preguntas
                        </span>
                      </span>
                    </>
                  )}
                  {hecha && (
                    <Check
                      className="mt-[4px] h-[11px] w-[11px]"
                      strokeWidth={3}
                      style={{ color: "var(--ln-navy-dim)" }}
                      aria-label={f.tipo === "leccion" ? "Completada" : "Ensayada"}
                    />
                  )}
                </button>
              </div>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto px-5">
        <div className="border-t pt-2 mt-4" style={{ borderColor: "var(--ln-navy-rule)" }}>
          {enlaces.map((x) => (
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
            to={modulo.hub}
            className="mt-1 inline-flex items-center gap-1.5 text-[13px] transition-colors duration-150 hover:text-white"
            style={{ color: "var(--ln-navy-dim)" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Volver a {modulo.nombre}
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

// ─── Portada de la lección ───────────────────────────────────────────────────

/**
 * Las portadas se resuelven por nombre de archivo: basta guardar
 * public/modulos/<modulo>/leccion-NN.webp (NN = número de lección, dos cifras)
 * para que aparezca, sin tocar código. Mientras el archivo no exista queda el
 * hueco rotulado con esa ruta.
 *
 * Van en public/modulos y no en assets porque son material de UNA sección:
 * bajo assets entrarían al precache y todas las portadas se las descargaría
 * cada piloto al instalar, entre o no al módulo (ver public/modulos/LEEME.md y
 * el globIgnores de vite.config.ts). Aquí viajan bajo demanda y se quedan en
 * caché la primera vez que se ven.
 *
 * La proporción la fija el módulo (8:3 por defecto): una imagen de otra
 * medida se recorta por el centro, así todas las lecciones abren igual.
 * El estado `falta` se reinicia solo al cambiar de lección, porque el bloque
 * que la contiene lleva key={l} y se remonta entero.
 */
const PORTADA_RATIO = "8 / 3"

function Portada({
  dir,
  n,
  titulo,
  ratio = PORTADA_RATIO,
}: {
  dir: string
  n: number
  titulo: string
  ratio?: string
}) {
  const [falta, setFalta] = useState(false)
  const archivo = `leccion-${String(n).padStart(2, "0")}.webp`

  if (falta) {
    return (
      <HuecoImagen
        rotulo={`PORTADA · ${ratio.replace(" / ", ":")}`}
        descripcion={`Imagen horizontal (${ratio.replace(" / ", ":")}) para esta lección. Pásala a WebP con scripts/optimizar-imagenes.mjs, guárdala como public${dir}/${archivo} y aparece sola.`}
        alto={270}
        ratio={ratio}
      />
    )
  }
  return (
    <figure className="m-0 w-full">
      <img
        src={`${dir}/${archivo}`}
        alt={`Portada de la lección ${String(n).padStart(2, "0")}: ${titulo}`}
        className="block w-full"
        style={{ aspectRatio: ratio, objectFit: "cover", background: "var(--ln-sunk)" }}
        onError={() => setFalta(true)}
        decoding="async"
      />
    </figure>
  )
}
