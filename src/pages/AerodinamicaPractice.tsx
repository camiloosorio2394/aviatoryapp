import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, ChevronLeft, ChevronRight, ClipboardList, MessageSquareText, Target } from "lucide-react"
import { useSession } from "@/hooks/useSession"
import { accentText } from "@/lib/tileColors"
import { registrarEstudioDiario } from "@/lib/activity"
import { AERO_HUB, AERO_PRACTICA_TOTAL, AERO_TITULO } from "@/lib/aerodinamica"
import {
  AERO_ENTREVISTA,
  AERO_ESCENARIOS,
  AERO_NIVELES,
  type NivelEntrevista,
} from "@/lib/aerodinamicaPractica"
import {
  fetchAerodinamicaProgress,
  markAerodinamicaProgress,
  pushPendingAerodinamica,
  readAerodinamicaLocal,
} from "@/lib/aerodinamicaProgress"
import {
  ACENTO,
  EscenarioAplicacion,
  PreguntaEntrevista,
} from "@/components/aerodinamica/practica/Piezas"

/**
 * Práctica de Aerodinámica (ruta /app/aerolinea/aerodinamica/practica).
 *
 * Dos modos, los que define el documento del módulo:
 *
 *   Aplicación → 13 escenarios operacionales; se marca al desplegar el análisis
 *   Entrevista → 49 preguntas en tres niveles; se marca al ver la respuesta
 *
 * La casa es la de la práctica de Mercancías: pestañas, barra de avance, tira
 * de saltos con lo hecho en verde y el ejercicio debajo. El acento es el azul
 * acero del módulo; el verde sigue queriendo decir «ya lo hiciste».
 */

type Modo = "aplicacion" | "entrevista"

const AVISO =
  "Escenarios y preguntas construidos con fines formativos a partir del PHAK de la FAA, la AC 61-107B, el AUPRTA y la AMC 25.251 de EASA. No sustituyen el manual de operaciones ni el AFM de tu tipo: las cifras concretas se verifican ahí."

export function AerodinamicaPractice() {
  const { user } = useSession()
  const [modo, setModo] = useState<Modo>("aplicacion")
  const [nivel, setNivel] = useState<NivelEntrevista | "todos">("todos")
  const [idx, setIdx] = useState(0)
  const [hechas, setHechas] = useState<string[]>(() => readAerodinamicaLocal().practiceDone)
  const [guardando, setGuardando] = useState(false)

  // Progreso en la base: si falla, seguimos con el local. De paso sube lo que
  // se resolvió sin sesión.
  useEffect(() => {
    const uid = user?.id
    if (!uid) return
    let cancelado = false
    void (async () => {
      const traido = await fetchAerodinamicaProgress(uid)
      if (cancelado || !traido) return
      const remoto = await pushPendingAerodinamica(traido)
      if (cancelado || remoto.practiceDone.length === 0) return
      setHechas((prev) => Array.from(new Set([...prev, ...remoto.practiceDone])))
    })()
    return () => {
      cancelado = true
    }
  }, [user?.id])

  const entrevistaFiltrada = useMemo(
    () => (nivel === "todos" ? AERO_ENTREVISTA : AERO_ENTREVISTA.filter((p) => p.nivel === nivel)),
    [nivel],
  )

  const claves = useMemo(
    () =>
      modo === "aplicacion"
        ? AERO_ESCENARIOS.map((e) => e.id)
        : entrevistaFiltrada.map((p) => p.id),
    [modo, entrevistaFiltrada],
  )

  const total = claves.length
  const iSeguro = Math.min(idx, Math.max(0, total - 1))
  const hechasAqui = claves.filter((k) => hechas.includes(k)).length
  const pct = total > 0 ? Math.round((hechasAqui / total) * 100) : 0
  const clave = claves[iSeguro]
  const yaEsta = hechas.includes(clave)

  const totalHechas = useMemo(
    () => new Set(hechas.filter((k) => /^(esc|ent)-\d\d$/.test(k))).size,
    [hechas],
  )

  async function marcar(k: string): Promise<void> {
    if (hechas.includes(k)) return
    setGuardando(true)
    setHechas((prev) => (prev.includes(k) ? prev : [...prev, k]))
    try {
      await markAerodinamicaProgress({ practiceId: k })
      void registrarEstudioDiario("aerodinamica-practica")
    } finally {
      setGuardando(false)
    }
  }

  function cambiarModo(m: Modo): void {
    setModo(m)
    setIdx(0)
  }

  const MODOS: { key: Modo; label: string; icono: React.ReactNode; total: number }[] = [
    { key: "aplicacion", label: "Aplicación", icono: <ClipboardList className="h-4 w-4" />, total: AERO_ESCENARIOS.length },
    { key: "entrevista", label: "Entrevista", icono: <MessageSquareText className="h-4 w-4" />, total: AERO_ENTREVISTA.length },
  ]

  return (
    <div className="notam-practica mx-auto max-w-[900px] px-4 py-9 pb-20 sm:px-7 sm:py-11">
      <Link
        to={AERO_HUB}
        className="mb-4 inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Volver a {AERO_TITULO}
      </Link>

      <header className="relative mb-8 overflow-hidden rounded-[18px] bg-[#0A1524] px-6 py-10 text-center sm:px-10 sm:py-12">
        <div
          className="pointer-events-none absolute inset-2 rounded-[14px] border border-dashed border-white/[0.10]"
          aria-hidden
        />
        <div className="relative">
          <div className="rotulo inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
            <Target className="h-3.5 w-3.5" /> Aerodinámica · Práctica
          </div>
          <h1 className="nh-display mx-auto mt-4 max-w-[760px] text-[28px] font-semibold leading-[1.12] text-white sm:text-[36px]">
            Aplica lo que leíste y ensaya lo que te van a preguntar
          </h1>
          <p className="mx-auto mt-4 max-w-[640px] text-[15px] leading-[1.65] text-white/80 sm:text-[16px]">
            Trece situaciones de vuelo que se resuelven con los conceptos del módulo, y las cuarenta
            y nueve preguntas que hace un entrevistador técnico, por nivel.
          </p>
          <div className="tabular mt-5 text-[12.5px] text-white/55">
            {totalHechas} de {AERO_PRACTICA_TOTAL} hechos en todo el módulo
          </div>
        </div>
      </header>

      {/* === CONTROLES === */}
      <section className="min-w-0 rounded-2xl surface p-5 sm:p-6">
        <div
          className="grid gap-2 rounded-xl p-1 sm:grid-cols-2"
          style={{ background: "color-mix(in oklab, var(--border) 35%, transparent)" }}
          role="group"
          aria-label="Modo de práctica"
        >
          {MODOS.map((m) => {
            const activo = modo === m.key
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => cambiarModo(m.key)}
                aria-current={activo ? "true" : undefined}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-3 text-[14px] font-semibold transition-colors"
                style={{
                  color: activo ? "white" : "var(--muted-foreground)",
                  background: activo ? ACENTO : "transparent",
                }}
              >
                {m.icono}
                {m.label} ({m.total})
              </button>
            )
          })}
        </div>

        {modo === "entrevista" && (
          <div className="mt-4">
            <div className="rotulo mb-2 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Nivel
            </div>
            <div className="flex flex-wrap gap-2">
              {[{ clave: "todos" as const, rotulo: "Todos" }, ...AERO_NIVELES].map((n) => {
                const activo = nivel === n.clave
                return (
                  <button
                    key={n.clave}
                    type="button"
                    onClick={() => {
                      setNivel(n.clave)
                      setIdx(0)
                    }}
                    aria-pressed={activo}
                    className="inline-flex min-h-[38px] items-center rounded-full border px-3.5 text-[13px] font-medium transition-colors"
                    style={{
                      color: activo ? accentText(ACENTO) : "var(--muted-foreground)",
                      background: activo ? `color-mix(in oklab, ${ACENTO} 12%, transparent)` : "transparent",
                      borderColor: activo
                        ? `color-mix(in oklab, ${ACENTO} 40%, transparent)`
                        : "var(--border)",
                    }}
                  >
                    {n.rotulo}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <div className="mt-5">
          <div className="flex items-end justify-between gap-3">
            <div className="text-[13px] font-semibold text-foreground">
              <span className="tabular">{hechasAqui}</span> de <span className="tabular">{total}</span>{" "}
              {modo === "entrevista" ? "ensayadas" : "resueltos"}
            </div>
            <div className="tabular text-[12px] text-muted-foreground">{pct}%</div>
          </div>
          <div
            className="mt-2 h-2 overflow-hidden rounded-full"
            style={{ background: "color-mix(in oklab, var(--border) 60%, transparent)" }}
            role="progressbar"
            aria-valuenow={hechasAqui}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label="Progreso del modo activo"
          >
            <div
              className="h-full rounded-full transition-[width]"
              style={{ width: `${pct}%`, background: ACENTO }}
            />
          </div>
        </div>

        <div className="mt-5">
          <div className="rotulo mb-2 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Salta al que quieras
          </div>
          <div className="flex flex-wrap gap-1">
            {claves.map((k, i) => {
              const activo = i === iSeguro
              const hecho = hechas.includes(k)
              const color = hecho ? "var(--av-green-400)" : ACENTO
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={`Ir al ${i + 1} de ${total}${hecho ? ", ya hecho" : ""}`}
                  aria-current={activo ? "true" : undefined}
                  className="tabular relative inline-flex h-9 min-w-9 items-center justify-center rounded-[6px] border px-2 text-[12.5px] transition-colors"
                  style={{
                    color: activo ? "white" : hecho ? accentText(color) : "var(--muted-foreground)",
                    background: activo
                      ? color
                      : hecho
                        ? `color-mix(in oklab, ${color} 12%, transparent)`
                        : "transparent",
                    borderColor: activo
                      ? color
                      : hecho
                        ? `color-mix(in oklab, ${color} 40%, transparent)`
                        : "var(--border)",
                  }}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
          <div className="mt-2 text-[11px] text-muted-foreground">
            En verde los que ya marcaste como hechos.
          </div>
        </div>
      </section>

      {/* === EJERCICIO ACTIVO === */}
      <div className="mt-6">
        {total === 0 ? (
          <p className="text-[15px] text-muted-foreground">No hay preguntas en este nivel.</p>
        ) : modo === "aplicacion" ? (
          <EscenarioAplicacion
            key={clave}
            escenario={AERO_ESCENARIOS[iSeguro]}
            n={iSeguro + 1}
            total={total}
            hecho={yaEsta}
            guardando={guardando}
            onVer={() => void marcar(clave)}
          />
        ) : (
          <PreguntaEntrevista
            key={clave}
            pregunta={entrevistaFiltrada[iSeguro]}
            n={iSeguro + 1}
            total={total}
            hecho={yaEsta}
            guardando={guardando}
            onVer={() => void marcar(clave)}
          />
        )}
      </div>

      {/* === NAVEGACIÓN === */}
      {total > 0 && (
        <nav className="mt-5 flex items-center justify-between gap-3" aria-label="Navegación de ejercicios">
          <button
            type="button"
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={iSeguro === 0}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-[10px] border border-border px-4 text-[14px] font-medium text-foreground transition-colors hover:border-foreground/40 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" /> Anterior
          </button>
          <span className="tabular text-[12.5px] text-muted-foreground">
            {iSeguro + 1} / {total}
          </span>
          <button
            type="button"
            onClick={() => setIdx((i) => Math.min(total - 1, i + 1))}
            disabled={iSeguro >= total - 1}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-[10px] border border-border px-4 text-[14px] font-medium text-foreground transition-colors hover:border-foreground/40 disabled:opacity-40"
          >
            Siguiente <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      )}

      <p className="mt-8 mb-0 text-[12px] leading-[1.6] text-muted-foreground">{AVISO}</p>
    </div>
  )
}
