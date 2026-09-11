import { useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MessageSquareText,
  ShieldAlert,
  Tags,
  Target,
  ClipboardList,
} from "lucide-react"
import { useSession } from "@/hooks/useSession"
import { accentText } from "@/lib/tileColors"
import { MP_HUB, MP_TITULO } from "@/lib/mercancias"
import {
  CASOS,
  EJERCICIOS_ETIQUETAS,
  ENTREVISTA,
  ESCENARIOS,
  PRACTICA_TOTALES,
  claveCaso,
  claveEntrevista,
  claveEscenario,
  claveEtiquetas,
} from "@/lib/mercanciasPractica"
import {
  fetchMercanciasProgress,
  markMercanciasProgress,
  pushPendingMercancias,
  readMercanciasLocal,
} from "@/lib/mercanciasProgress"
import { registrarEstudioDiario } from "@/lib/activity"
import { type Mode, ACENTO } from "@/components/mercancias/practica/comun"
import { Etiquetas } from "@/components/mercancias/practica/Etiquetas"
import { Clasifica } from "@/components/mercancias/practica/Clasifica"
import { Escenario } from "@/components/mercancias/practica/Escenario"
import { Entrevista } from "@/components/mercancias/practica/Entrevista"
import { ModeButton } from "@/components/mercancias/practica/Piezas"

/**
 * Práctica de Mercancías peligrosas (ruta /app/aerolinea/mercancias/practica).
 *
 * La misma casa que la práctica de NOTAM (cabecera sobre foto, pestañas,
 * selector numerado, la respuesta a la derecha) con cuatro modos:
 *
 *   Etiquetas   → ejercicios visuales por rondas con los rombos de las etiquetas
 *   Clasifica   → un envío; el piloto elige clase y si lleva grupo de embalaje
 *   Escenarios  → situaciones que se resuelven con las palabras propias y
 *                 después se comparan con la respuesta modelo
 *   Entrevista  → lo que podrían preguntarte, con respuesta modelo y qué evalúan
 *
 * El acento es el amarillo del módulo (--av-dg-*); el verde sigue marcando lo
 * resuelto, como en NOTAM.
 */

const HERO = "/infografias/mercancias/portada.webp"

const AVISO =
  "Ejercicios construidos con fines formativos a partir del LAR 175, del Anexo 18 y de las Instrucciones Técnicas, con el RAC 175 de Colombia como ejemplo de adopción nacional. Los escenarios no son documentos reales ni sustituyen el manual de operaciones del explotador; las cifras de las Instrucciones y los artículos de tu reglamento nacional se verifican en la edición vigente."

const MODOS: { key: Mode; label: string; icon: ReactNode; total: number }[] = [
  { key: "etiquetas", label: "Etiquetas", icon: <Tags className="h-4 w-4" />, total: PRACTICA_TOTALES.etiquetas },
  { key: "clasifica", label: "Clasifica", icon: <Target className="h-4 w-4" />, total: PRACTICA_TOTALES.casos },
  { key: "escenarios", label: "Escenarios", icon: <ClipboardList className="h-4 w-4" />, total: PRACTICA_TOTALES.escenarios },
  { key: "entrevista", label: "Entrevista", icon: <MessageSquareText className="h-4 w-4" />, total: PRACTICA_TOTALES.entrevista },
]

function clavesDe(mode: Mode): string[] {
  switch (mode) {
    case "etiquetas":
      return EJERCICIOS_ETIQUETAS.map((e) => claveEtiquetas(e.id))
    case "clasifica":
      return CASOS.map((c) => claveCaso(c.id))
    case "escenarios":
      return ESCENARIOS.map((e) => claveEscenario(e.id))
    case "entrevista":
      return ENTREVISTA.map((p) => claveEntrevista(p.n))
  }
}

export function MercanciasPractice() {
  const { user } = useSession()
  const [mode, setMode] = useState<Mode>("etiquetas")
  const [idx, setIdx] = useState(0)
  const [doneKeys, setDoneKeys] = useState<string[]>(() => readMercanciasLocal().practiceDone)
  const [saving, setSaving] = useState(false)

  // Progreso en Supabase: si falla, seguimos con el local. De paso sube lo que
  // se resolvió sin sesión.
  useEffect(() => {
    const uid = user?.id
    if (!uid) return
    let cancelled = false
    void (async () => {
      const fetched = await fetchMercanciasProgress(uid)
      if (cancelled || !fetched) return
      const remote = await pushPendingMercancias(fetched)
      if (cancelled || remote.practiceDone.length === 0) return
      setDoneKeys((prev) => Array.from(new Set([...prev, ...remote.practiceDone])))
    })()
    return () => {
      cancelled = true
    }
  }, [user?.id])

  const claves = useMemo(() => clavesDe(mode), [mode])
  const total = claves.length
  const safeIdx = Math.min(idx, total - 1)
  const doneInMode = claves.filter((k) => doneKeys.includes(k)).length
  const pct = total > 0 ? Math.round((doneInMode / total) * 100) : 0

  async function markDone(key: string): Promise<void> {
    if (doneKeys.includes(key)) return
    setSaving(true)
    setDoneKeys((prev) => (prev.includes(key) ? prev : [...prev, key]))
    try {
      await markMercanciasProgress({ practiceId: key })
      void registrarEstudioDiario("mercancias-practica")
    } finally {
      setSaving(false)
    }
  }

  function changeMode(m: Mode): void {
    setMode(m)
    setIdx(0)
  }

  const clave = claves[safeIdx]
  const isDone = doneKeys.includes(clave)

  return (
    <>
      <div className="notam-practica px-4 sm:px-7 py-9 sm:py-11 pb-20 max-w-[1560px] mx-auto">
        <Link
          to={MP_HUB}
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a {MP_TITULO}
        </Link>

        <header className="np-hero relative mb-8 overflow-hidden rounded-[18px]">
          <img src={HERO} alt="" aria-hidden="true" className="np-hero-foto" />
          <div className="np-hero-velo" />
          <div className="relative px-6 py-11 text-center sm:px-10 sm:py-14">
            <div className="np-hero-rotulo">
              <Target className="h-3.5 w-3.5" /> Mercancías peligrosas · Práctica
            </div>
            <h1 className="np-display mx-auto mt-4 max-w-[880px] text-[30px] font-semibold leading-[1.1] text-white sm:text-[40px]">
              Practica lo que te van a preguntar
            </h1>
            <p className="mx-auto mt-5 max-w-[720px] text-[15px] leading-[1.7] text-white/80 sm:text-[16px]">
              Reconoce etiquetas, clasifica envíos, resuelve escenarios operacionales con tus
              palabras y ensaya las preguntas de una entrevista técnica. Cada respuesta trae su
              artículo de la norma.
            </p>
            <div className="np-hero-cifras">
              {MODOS.map((m, i) => (
                <span key={m.key} className="contents">
                  {i > 0 && <span aria-hidden="true" className="np-hero-punto" />}
                  <span>
                    <strong className="tabular">{m.total}</strong> {m.label.toLowerCase()}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* === CONTROLES === */}
        <section className="min-w-0 rounded-2xl surface p-5 sm:p-6">
          <div
            className="grid gap-2 sm:grid-cols-4 p-1 rounded-xl"
            style={{ background: "color-mix(in oklab, var(--border) 35%, transparent)" }}
            role="group"
            aria-label="Modo de práctica"
          >
            {MODOS.map((m) => (
              <ModeButton
                key={m.key}
                active={mode === m.key}
                onClick={() => changeMode(m.key)}
                icon={m.icon}
                label={`${m.label} (${m.total})`}
              />
            ))}
          </div>

          <div className="mt-5">
            <div className="flex items-end justify-between gap-3">
              <div className="text-[13px] font-semibold text-foreground">
                <span className="tabular">{doneInMode}</span> de <span className="tabular">{total}</span>{" "}
                {mode === "entrevista" ? "ensayadas" : "resueltos"}
              </div>
              <div className="text-[12px] text-muted-foreground tabular">{pct}%</div>
            </div>
            <div
              className="mt-2 h-2 rounded-full overflow-hidden"
              style={{ background: "color-mix(in oklab, var(--border) 60%, transparent)" }}
              role="progressbar"
              aria-valuenow={doneInMode}
              aria-valuemin={0}
              aria-valuemax={total}
              aria-label="Progreso del modo activo"
            >
              <div className="h-full rounded-full transition-[width]" style={{ width: `${pct}%`, background: ACENTO }} />
            </div>
          </div>

          <div className="mt-5">
            <div className="np-rotulo mb-2">Salta al que quieras</div>
            <div className="flex flex-wrap gap-1">
              {claves.map((k, i) => {
                const active = i === safeIdx
                const done = doneKeys.includes(k)
                const color = done ? "var(--av-green-400)" : ACENTO
                return (
                  <button
                    key={k}
                    onClick={() => setIdx(i)}
                    aria-label={`Ir al ${i + 1} de ${total}${done ? ", ya resuelto" : ""}`}
                    aria-current={active ? "true" : undefined}
                    className="np-salto relative inline-flex items-center justify-center rounded-[6px] border tabular transition-colors"
                    style={{
                      color: active ? "white" : done ? accentText(color) : "var(--muted-foreground)",
                      background: active ? color : done ? `color-mix(in oklab, ${color} 12%, transparent)` : "transparent",
                      borderColor: active ? color : done ? `color-mix(in oklab, ${color} 40%, transparent)` : "var(--border)",
                    }}
                  >
                    {i + 1}
                  </button>
                )
              })}
            </div>
            <div className="mt-2 text-[11px] text-muted-foreground">En verde los que ya marcaste como resueltos.</div>
          </div>
        </section>

        {/* === EJERCICIO ACTIVO === */}
        <div className="mt-6">
          {mode === "etiquetas" && (
            <Etiquetas
              key={clave}
              ejercicio={EJERCICIOS_ETIQUETAS[safeIdx]}
              n={safeIdx + 1}
              total={total}
              isDone={isDone}
              onFinish={() => void markDone(clave)}
            />
          )}
          {mode === "clasifica" && (
            <Clasifica
              key={clave}
              caso={CASOS[safeIdx]}
              n={safeIdx + 1}
              total={total}
              isDone={isDone}
              saving={saving}
              onDone={() => void markDone(clave)}
            />
          )}
          {mode === "escenarios" && (
            <Escenario
              key={clave}
              escenario={ESCENARIOS[safeIdx]}
              n={safeIdx + 1}
              total={total}
              isDone={isDone}
              saving={saving}
              onDone={() => void markDone(clave)}
            />
          )}
          {mode === "entrevista" && (
            <Entrevista
              key={clave}
              pregunta={ENTREVISTA[safeIdx]}
              n={safeIdx + 1}
              total={total}
              isDone={isDone}
              saving={saving}
              onDone={() => void markDone(clave)}
            />
          )}
        </div>

        {/* === NAVEGACION === */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            onClick={() => setIdx(Math.max(0, safeIdx - 1))}
            disabled={safeIdx === 0}
            className="inline-flex items-center gap-1.5 h-11 px-4 rounded-xl text-[13px] font-semibold border border-border text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" /> Anterior
          </button>
          <div className="text-[13px] text-muted-foreground tabular">
            {safeIdx + 1} de {total}
          </div>
          <button
            onClick={() => setIdx(Math.min(total - 1, safeIdx + 1))}
            disabled={safeIdx >= total - 1}
            className="inline-flex items-center gap-1.5 h-11 px-4 rounded-xl text-[13px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
            style={{ background: ACENTO }}
          >
            Siguiente <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <p className="np-aviso mt-8">
          <ShieldAlert className="h-3 w-3 shrink-0" aria-hidden="true" />
          <span>{AVISO}</span>
        </p>
      </div>
    </>
  )
}
