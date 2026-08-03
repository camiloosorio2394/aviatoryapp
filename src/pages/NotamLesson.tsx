import { useCallback, useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, ArrowRight, Check, ClipboardCheck, Library, Target } from "lucide-react"
import { DocBlock } from "@/components/DocLessonBlocks"
import { docAccent, docTint } from "@/lib/docSheet"
import { registrarEstudioDiario } from "@/lib/activity"
import { useSession } from "@/hooks/useSession"
import { LEVEL_META, readLocalProgress, writeLocalProgress } from "@/lib/notam"
import {
  fetchNotamProgress,
  markNotamProgress,
  pushPendingLocalProgress,
} from "@/lib/notamProgress"
import { LESSON_SCREENS, LESSON_SOURCES, LESSON_TOTAL } from "@/lib/notamLesson"

const TOTAL = LESSON_TOTAL

/**
 * Lección NOTAM como lector propio a pantalla completa.
 *
 * Implementa el handoff "Rediseño NOTAM profesional" (v3, 3 de agosto): papel
 * cálido y navy de carta aeronáutica (tokens .lector-notam en index.css),
 * sidebar persistente, decodificador interactivo con resaltado cruzado y
 * estados por bloque. Con un cambio pedido por Camilo sobre el handoff: el
 * sidebar no lista las secciones del módulo Ingreso a aerolínea (eso ya lo
 * hace el hub), lista los 13 temas de ESTA lección.
 *
 * Ruta: /app/aerolinea/notam/aprende
 */
export function NotamLesson() {
  const { user, isLoading: sessionLoading } = useSession()
  const [activeN, setActiveN] = useState(1)
  const [readSections, setReadSections] = useState<number[]>(() => readLocalProgress().lessonScreens)

  // Marca una sección como leída: el respaldo local manda, la base de datos es
  // un extra. Si la RPC falla no se muestra nada: el progreso ya quedó local.
  const markRead = useCallback((n: number) => {
    setReadSections((prev) => (prev.includes(n) ? prev : [...prev, n].sort((a, b) => a - b)))
    if (readLocalProgress().lessonScreens.includes(n)) return
    void markNotamProgress({ lessonScreen: n })
    // Leer también es estudiar. Sin esto, el piloto pasaba 47 minutos en la
    // lección y el Dashboard le decía que no había estudiado.
    void registrarEstudioDiario("notam-leccion", {
      minutes: LESSON_SCREENS.find((s) => s.n === n)?.minutes ?? 0,
    })
  }, [])

  // Hidrata lo leído desde la base de datos. El respaldo local solo cubre este
  // navegador: sin esta consulta, abrir la lección en otro dispositivo la
  // mostraba entera sin leer aunque el progreso estuviera guardado.
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

  // Sección activa + marcado de leídas, por scroll: cuando una sección entra
  // en la franja superior de la pantalla, el lector ya llegó a ella.
  useEffect(() => {
    const visible = new Set<number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const n = Number((entry.target as HTMLElement).dataset.section)
          if (!Number.isFinite(n)) continue
          if (entry.isIntersecting) {
            visible.add(n)
            markRead(n)
          } else {
            visible.delete(n)
          }
        }
        if (visible.size === 0) return
        setActiveN(Math.min(...visible))
      },
      { rootMargin: "-84px 0px -58% 0px", threshold: 0 },
    )

    for (const s of LESSON_SCREENS) {
      const el = document.getElementById(`s-${s.n}`)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [markRead])

  const goToSection = useCallback((anchor: string) => {
    const el = document.getElementById(anchor)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  // La siguiente sección sin leer. Alimenta el botón primario de la tarjeta de
  // avance y la barra fija del móvil; con todo leído, apunta al cierre.
  const proxima = useMemo(() => LESSON_SCREENS.find((s) => !readSections.includes(s.n)), [readSections])

  return (
    <div className="lector-notam min-h-screen lg:flex">
      <SidebarLector
        activeN={activeN}
        readSections={readSections}
        onSelect={goToSection}
        userEmail={user?.email ?? null}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        <BarraSuperior activeN={activeN} readCount={readSections.length} />

        {/* Cabecera de sección: cifra viva, título y tarjeta de avance */}
        <section
          className="px-5 pt-6 pb-6 lg:px-10 lg:pt-9 lg:pb-8 lg:grid lg:grid-cols-[120px_minmax(0,1fr)_300px] lg:gap-8 lg:items-start border-b"
          style={{ borderColor: "var(--ln-hair)" }}
        >
          {/* La cifra acompaña el scroll: dice en qué sección vas, no decora */}
          <div className="hidden lg:block select-none" aria-hidden>
            <div
              className="ln-display font-bold tabular"
              style={{ fontSize: 76, lineHeight: 0.82, letterSpacing: "-0.02em", color: "var(--ln-hair-strong)" }}
            >
              {String(activeN).padStart(2, "0")}
            </div>
            <div className="mono mt-2 text-[10px] font-semibold tracking-[0.14em]" style={{ color: "var(--ln-faint)" }}>
              DE {TOTAL}
            </div>
          </div>

          <div className="min-w-0">
            <div className="ln-epigrafe" style={{ color: "var(--ln-primary)" }}>
              Ingreso a aerolínea · Lección
            </div>
            <h1
              className="ln-display mt-2 mb-0 font-bold text-[44px] lg:text-[68px]"
              style={{ lineHeight: 0.94, letterSpacing: "-0.015em", color: "var(--ln-ink)" }}
            >
              NOTAM
            </h1>
            <p
              className="mt-3.5 mb-0 text-[15px] lg:text-[16.5px] leading-[1.58] max-w-[58ch]"
              style={{ color: "var(--ln-muted)", textWrap: "pretty" }}
            >
              Los NOTAM avisan de pistas cerradas, ayudas fuera de servicio y peligros temporales:
              los necesitas para planear cada vuelo y te los preguntan en las entrevistas y pruebas
              técnicas de las aerolíneas.
            </p>
          </div>

          <TarjetaAvance readSections={readSections} proxima={proxima} onSelect={goToSection} />
        </section>

        {/* Cuerpo: las 13 secciones, con el decodificador injertado tras la 1.
            El wrapper doc-sheet es solo el ámbito de los tokens de DocBlock;
            el papel lo pone el lector. */}
        <main className="doc-sheet px-5 py-8 lg:px-10 lg:py-10 max-w-[980px] pb-28 lg:pb-14" style={{ background: "transparent" }}>
          {LESSON_SCREENS.map((screen) => {
            const level = LEVEL_META[screen.level]
            return (
              <div key={screen.n}>
                <section
                  id={`s-${screen.n}`}
                  data-section={screen.n}
                  className={`scroll-mt-24 py-8 lg:py-9 ${screen.n === 1 ? "pt-0 lg:pt-0" : "border-t"}`}
                  style={screen.n === 1 ? undefined : { borderColor: "var(--ln-hair)" }}
                >
                  <header>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="ln-epigrafe">
                        <span style={{ color: "var(--ln-primary)" }}>
                          {String(screen.n).padStart(2, "0")}
                        </span>{" "}
                        · {screen.kicker}
                      </span>
                      <span className="ln-epigrafe" style={{ color: docAccent(level.color, 55) }}>
                        {level.label} · {screen.minutes} min
                      </span>
                    </div>
                    <h2
                      className="ln-display mt-2.5 mb-0 font-semibold text-[24px] lg:text-[30px]"
                      style={{ lineHeight: 1.1, color: "var(--ln-ink)" }}
                    >
                      {screen.title}
                    </h2>
                  </header>
                  <div className="doc-prose mt-5 flex flex-col gap-4">
                    {screen.blocks.map((block, i) => (
                      <DocBlock key={`${screen.n}-${i}`} block={block} />
                    ))}
                  </div>
                </section>

                {/* El decodificador vive entre la sección 1 y la 2, como en el
                    handoff: primero qué es, de inmediato uno desarmado en vivo. */}
                {screen.n === 1 && <Decodificador />}
              </div>
            )
          })}

          <PieFuente />
          <NextSteps readCount={readSections.length} id="cierre" />
        </main>
      </div>

      <BarraMovil proxima={proxima} onSelect={goToSection} />
    </div>
  )
}

// ─── Sidebar: los 13 temas de la lección ─────────────────────────────────────

interface SidebarProps {
  activeN: number
  readSections: number[]
  onSelect: (anchor: string) => void
  userEmail: string | null
}

function SidebarLector({ activeN, readSections, onSelect, userEmail }: SidebarProps) {
  return (
    <aside
      className="ln-side hidden lg:flex flex-col w-[252px] shrink-0 sticky top-0 h-screen overflow-y-auto"
      style={{ background: "var(--ln-navy)" }}
      aria-label="Temas de la lección"
    >
      <Link to="/app" className="flex items-center gap-2.5 px-5 pt-[22px]">
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

      <div className="mono px-5 mt-[26px] text-[10px] font-semibold tracking-[0.16em] uppercase" style={{ color: "var(--ln-navy-label)" }}>
        NOTAM · Lección
      </div>

      <nav className="mt-2.5" aria-label="Secciones de la lección">
        {LESSON_SCREENS.map((s) => {
          const isActive = s.n === activeN
          const isRead = readSections.includes(s.n)
          return (
            <a
              key={s.n}
              href={`#s-${s.n}`}
              onClick={(e) => {
                e.preventDefault()
                onSelect(`s-${s.n}`)
              }}
              aria-current={isActive ? "location" : undefined}
              className="grid grid-cols-[26px_1fr_auto] items-baseline gap-2.5 px-5 py-2 text-[14px] transition-colors duration-150"
              style={
                isActive
                  ? {
                      background: "var(--ln-paper)",
                      borderLeft: "3px solid var(--ln-focus)",
                      paddingLeft: 17,
                      color: "var(--ln-ink)",
                      fontWeight: 600,
                    }
                  : { color: "var(--ln-item)" }
              }
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = "var(--ln-navy-hover)"
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = "transparent"
              }}
            >
              <span
                className="mono text-[11px] font-medium tabular"
                style={{ color: isActive ? "var(--ln-primary)" : "var(--ln-navy-dim)" }}
              >
                {String(s.n).padStart(2, "0")}
              </span>
              <span className="truncate">{s.title}</span>
              {isRead && (
                <Check
                  className="h-3 w-3"
                  strokeWidth={3}
                  style={{ color: isActive ? "var(--ln-primary)" : "var(--ln-navy-dim)" }}
                  aria-label="Leída"
                />
              )}
            </a>
          )
        })}
      </nav>

      {/* Después de leer viene hacer: las otras tres partes del tema */}
      <div className="mx-5 mt-4 pt-3.5 flex flex-col gap-0.5 border-t" style={{ borderColor: "var(--ln-navy-rule)" }}>
        {[
          { to: "/app/aerolinea/notam/practica", label: "Práctica" },
          { to: "/app/aerolinea/notam/evaluacion", label: "Evaluación" },
          { to: "/app/aerolinea/notam/decodificador", label: "Decodificador" },
        ].map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="flex items-center justify-between py-1.5 text-[13px] transition-colors duration-150 hover:text-white"
            style={{ color: "var(--ln-item)" }}
          >
            {l.label} <ArrowRight className="h-3 w-3" aria-hidden />
          </Link>
        ))}
      </div>

      <div className="mt-auto px-5 pb-6">
        <div className="pt-3.5 border-t" style={{ borderColor: "var(--ln-navy-rule)" }}>
          <Link
            to="/app/aerolinea/notam"
            className="inline-flex items-center gap-1.5 text-[13px] transition-colors duration-150 hover:text-white"
            style={{ color: "var(--ln-item)" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Volver a NOTAM
          </Link>
          {userEmail && (
            <div className="mt-3.5 flex items-center gap-2.5">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-semibold text-white"
                style={{ background: "var(--ln-bright)" }}
              >
                {userEmail[0]?.toUpperCase()}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[12.5px]" style={{ color: "var(--ln-paper)" }}>
                  {userEmail.split("@")[0]}
                </span>
                <span className="mono block text-[10px] tracking-[0.08em] uppercase" style={{ color: "var(--ln-navy-label)" }}>
                  Ingreso a aerolínea
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

// ─── Barras superior e inferior ──────────────────────────────────────────────

/** Reloj Zulú real: HH:mmZ en UTC, refrescado cada medio minuto. */
function useZulu(): string {
  const [zulu, setZulu] = useState(() => formatZulu(new Date()))
  useEffect(() => {
    const id = window.setInterval(() => setZulu(formatZulu(new Date())), 30_000)
    return () => window.clearInterval(id)
  }, [])
  return zulu
}

function formatZulu(d: Date): string {
  return `${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}Z`
}

function BarraSuperior({ activeN, readCount }: { activeN: number; readCount: number }) {
  const zulu = useZulu()
  return (
    <header
      className="sticky top-0 z-30 flex h-[50px] lg:h-[58px] items-center justify-between px-4 lg:px-8 border-b"
      style={{ background: "var(--ln-paper)", borderColor: "var(--ln-hair)" }}
    >
      {/* Escritorio: miga. Móvil: volver + sección en curso. */}
      <div className="hidden lg:flex items-center gap-2 text-[13.5px]">
        <Link to="/app/aerolinea" className="transition-colors duration-150" style={{ color: "var(--ln-soft)" }}>
          Ingreso a aerolínea
        </Link>
        <span style={{ color: "var(--ln-hair-strong)" }}>/</span>
        <Link to="/app/aerolinea/notam" className="transition-colors duration-150" style={{ color: "var(--ln-soft)" }}>
          NOTAM
        </Link>
        <span style={{ color: "var(--ln-hair-strong)" }}>/</span>
        <span className="font-semibold" style={{ color: "var(--ln-ink)" }}>
          Lección
        </span>
      </div>
      <div className="flex lg:hidden items-center gap-3">
        <Link to="/app/aerolinea/notam" aria-label="Volver a NOTAM" style={{ color: "var(--ln-ink)" }}>
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <span className="mono text-[11px] font-semibold tracking-[0.1em]" style={{ color: "var(--ln-ink)" }}>
          SEC {String(activeN).padStart(2, "0")}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="mono hidden lg:inline text-[11px] tracking-[0.1em]" style={{ color: "var(--ln-faint)" }}>
          ZULÚ {zulu}
        </span>
        <span className="mono lg:hidden text-[10.5px] tabular" style={{ color: "var(--ln-faint)" }}>
          {readCount} / {TOTAL}
        </span>
      </div>
    </header>
  )
}

function BarraMovil({
  proxima,
  onSelect,
}: {
  proxima: (typeof LESSON_SCREENS)[number] | undefined
  onSelect: (anchor: string) => void
}) {
  return (
    <div
      className="lg:hidden fixed inset-x-0 bottom-0 z-30 border-t px-4 py-3"
      style={{ background: "var(--ln-paper)", borderColor: "var(--ln-hair)" }}
    >
      <button
        type="button"
        onClick={() => onSelect(proxima ? `s-${proxima.n}` : "cierre")}
        className="flex h-12 w-full items-center justify-center rounded-[6px] text-[15px] font-semibold text-white transition-colors duration-150"
        style={{ background: "var(--ln-primary)" }}
      >
        {proxima ? `Continuar sección ${proxima.n}` : "Ir a práctica y evaluación"}
      </button>
    </div>
  )
}

// ─── Tarjeta de avance ───────────────────────────────────────────────────────

function TarjetaAvance({
  readSections,
  proxima,
  onSelect,
}: {
  readSections: number[]
  proxima: (typeof LESSON_SCREENS)[number] | undefined
  onSelect: (anchor: string) => void
}) {
  return (
    <div
      className="mt-6 lg:mt-0 rounded-[8px] border p-[18px] flex flex-col gap-4"
      style={{ background: "var(--ln-sunk)", borderColor: "var(--ln-hair)" }}
    >
      <div className="flex items-baseline justify-between">
        <span className="mono text-[10.5px] font-semibold tracking-[0.12em] uppercase" style={{ color: "var(--ln-faint)" }}>
          Tu avance
        </span>
        <span className="mono text-[12px] tabular" style={{ color: "var(--ln-ink)" }}>
          {readSections.length} / {TOTAL}
        </span>
      </div>
      <div
        className="grid gap-[2px]"
        style={{ gridTemplateColumns: `repeat(${TOTAL}, minmax(0, 1fr))` }}
        role="img"
        aria-label={`${readSections.length} de ${TOTAL} secciones leídas`}
      >
        {LESSON_SCREENS.map((s) => (
          <div
            key={s.n}
            className="h-[6px]"
            style={{
              background: readSections.includes(s.n) ? "var(--ln-primary)" : "var(--ln-hair-strong)",
            }}
          />
        ))}
      </div>
      {/* En celular la acción vive en la barra fija de abajo: repetirla aquí
          ponía dos botones "Continuar" en la misma pantalla. */}
      <button
        type="button"
        onClick={() => onSelect(proxima ? `s-${proxima.n}` : "cierre")}
        className="hidden lg:flex h-11 items-center justify-center rounded-[6px] text-[15px] font-semibold text-white transition-colors duration-150 hover:brightness-110"
        style={{ background: "var(--ln-primary)" }}
      >
        {proxima ? `Continuar sección ${proxima.n}` : "Ir a práctica y evaluación"}
      </button>
      <Link
        to="/app/aerolinea/notam/decodificador"
        className="hidden lg:flex h-9 items-center justify-center text-[14px] transition-colors duration-150"
        style={{ color: "var(--ln-muted)" }}
      >
        Decodificar un código
      </Link>
    </div>
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
 * Datos del handoff, verificados casilla por casilla.
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

/** Líneas del panel de código: la cabecera no es interactiva; A, B y C comparten línea. */
const LINEAS_CODIGO: string[][] = [["Q"], ["A", "B", "C"], ["E"], ["F"]]

function Decodificador() {
  const [activa, setActiva] = useState<string | null>(null)
  const porClave = useMemo(() => new Map(NOTAM_DEMO.casillas.map((c) => [c.clave, c])), [])
  const rotulo = activa ? (porClave.get(activa)?.rotulo ?? "") : "Señala una casilla o su texto"

  return (
    <section className="py-8 lg:py-9 border-t" style={{ borderColor: "var(--ln-hair)" }} aria-label="Decodificador interactivo">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="ln-epigrafe">Decodificador · pasa el cursor</span>
        {/* La leyenda anuncia la casilla activa también al lector de pantalla */}
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
        <div className="mono px-[26px] py-6 text-[13.5px]" style={{ background: "var(--ln-navy)", lineHeight: 2.1 }}>
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

      {/* Móvil: el código arriba y las casillas como fichas apiladas, código y
          explicación juntos. Nada de scroll horizontal. */}
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
              <div className="mt-1 text-[14px] leading-[1.5]" style={{ color: precaucion ? "var(--ln-caution-ink)" : "var(--ln-body)" }}>
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

// ─── Pie de fuente documental ────────────────────────────────────────────────

function PieFuente() {
  return (
    <section className="pt-7 mt-2 border-t" style={{ borderColor: "var(--ln-hair)" }}>
      <div className="ln-epigrafe">De dónde sale el contenido</div>
      <div className="mt-3 flex flex-wrap items-baseline gap-x-7 gap-y-1.5 text-[13.5px]" style={{ color: "var(--ln-muted)" }}>
        <span>
          OACI Doc 8400 (PANS-ABC) · 6ª ed. 2004 · Sección 7 ·{" "}
          <span className="mono text-[12.5px]">págs. 7-1 → 7-16</span>
        </span>
        <span>Ejemplos: resúmenes NOTAM vigentes de la Aerocivil</span>
      </div>
      <div
        className="mt-3.5 px-3.5 py-[11px] text-[13px] leading-[1.55]"
        style={{
          background: "var(--ln-caution-bg)",
          borderLeft: "3px solid var(--ln-caution)",
          color: "var(--ln-caution-ink)",
        }}
      >
        Esta edición (2004) es la cargada como fuente. Existen ediciones posteriores del Doc 8400:
        verifica la edición vigente ante la Aerocivil o la OACI antes de aplicar contenido
        normativo.
      </div>
      <ol className="mt-4 mb-0 pl-5 list-decimal flex flex-col gap-1.5">
        {LESSON_SOURCES.map((s, i) => (
          <li key={i} className="text-[13px] leading-[1.65]" style={{ color: "var(--ln-soft)" }}>
            {s}
          </li>
        ))}
      </ol>
    </section>
  )
}

// ─── Cierre: práctica y evaluación ───────────────────────────────────────────

function NextSteps({ readCount, id }: { readCount: number; id?: string }) {
  return (
    <section id={id} className="scroll-mt-24 mt-8 pt-7 border-t" style={{ borderColor: "var(--ln-hair)" }}>
      <h2 className="ln-display m-0 text-[24px] font-semibold" style={{ color: "var(--ln-ink)" }}>
        Ya sabes leer un NOTAM de principio a fin
      </h2>
      <p className="mt-1.5 mb-0 text-[13.5px] leading-[1.7]" style={{ color: "var(--ln-muted)" }}>
        Lo que sigue es practicar con material real y medirte en la evaluación. Llevas {readCount} de{" "}
        {TOTAL} secciones leídas.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <DocLink
          to="/app/aerolinea/notam/practica"
          icon={Target}
          color="var(--av-blue-500)"
          title="Practicar con NOTAM reales"
          hint="Ejercicios de interpretación y NOTAM colombianos del resumen de la Aerocivil."
        />
        <DocLink
          to="/app/aerolinea/notam/evaluacion"
          icon={ClipboardCheck}
          color="var(--av-green-400)"
          title="Hacer la evaluación"
          hint="20 preguntas de opción múltiple. Apruebas con 80 sobre 100."
        />
      </div>

      <div className="mono mt-6 flex items-center gap-1.5 text-[11px]" style={{ color: "var(--ln-faint)" }}>
        <Library className="h-3.5 w-3.5" aria-hidden /> El RAC y los documentos citados están en la
        Biblioteca.
      </div>
    </section>
  )
}

interface DocLinkProps {
  to: string
  icon: typeof Target
  color: string
  title: string
  hint: string
}

function DocLink({ to, icon: Icon, color, title, hint }: DocLinkProps) {
  return (
    <Link
      to={to}
      className="group rounded-[8px] border p-4 flex items-start gap-3 transition-colors duration-150"
      style={{ background: "var(--ln-sunk)", borderColor: "var(--ln-hair)" }}
    >
      <span
        className="shrink-0 h-10 w-10 rounded-[6px] flex items-center justify-center"
        style={{ color: docAccent(color, 70), background: docTint(color, 14) }}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold" style={{ color: "var(--ln-ink)" }}>
          {title}
        </span>
        <span className="block mt-0.5 text-[13px] leading-[1.6]" style={{ color: "var(--ln-soft)" }}>
          {hint}
        </span>
      </span>
      <ArrowRight
        className="hidden sm:block shrink-0 mt-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
        style={{ color: "var(--ln-soft)" }}
        aria-hidden
      />
    </Link>
  )
}
