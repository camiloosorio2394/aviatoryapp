import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, ChevronLeft, ChevronRight, Headphones, Info, Radio } from "lucide-react"
import { EjercicioCm, VueloCompleto } from "@/components/comunicaciones/practica"
import { useSession } from "@/hooks/useSession"
import { accentText } from "@/lib/tileColors"
import { registrarEstudioDiario } from "@/lib/activity"
import { CM_ACENTO, CM_HUB, CM_TITULO_CORTO, readComunicacionesLocal } from "@/lib/comunicaciones"
import { grabacionesQueFaltan } from "@/lib/comunicacionesAudio"
import { claveEjercicioCm } from "@/lib/comunicacionesPractica"
import {
  fetchComunicacionesProgress,
  markComunicacionesProgress,
  pushPendingComunicaciones,
} from "@/lib/comunicacionesProgress"
import { CM_PRACTICA_GRUPOS, CM_PRACTICA_TOTAL, esSimple, type TipoCm } from "@/lib/comunicacionesPracticaGrupos"
import { NOMBRE_PERFIL, PERFILES_RADIO, type PerfilRadio } from "@/lib/radio"

/**
 * Práctica de Comunicaciones ATC (ruta /app/aerolinea/comunicaciones/practica).
 *
 * La casa es la de la práctica de Aeropuertos: cabecera, pestañas, barra de
 * avance, tira de saltos con lo resuelto en verde y el ejercicio debajo. Los
 * diez tipos se agrupan en los cuatro verbos del módulo (escuchar,
 * interpretar, confirmar, responder) más el vuelo completo, que los encadena.
 *
 * Los ejercicios son los del motor (`components/comunicaciones/practica`) y
 * toman el acento de `--av-blue-500`, que aquí se re-ancla a la ciruela del
 * módulo. Cada uno se monta con `key` por ítem: así su contador de «say
 * again» y su estado empiezan en cero al cambiar de ejercicio.
 *
 * Un ejercicio queda marcado al resolverlo (acertado o no), como en
 * Aeropuertos: la clave sale de `claveEjercicioCm` y va al respaldo local y a
 * la base, que la valida contra el catálogo.
 *
 * Mientras falten los mp3, las transmisiones suenan con la voz del navegador.
 * La pantalla lo dice antes de escuchar, ejercicio por ejercicio, y el propio
 * control de radio lo repite al sonar.
 */

const ACENTO = "var(--cm-acento)"

type PerfilElegido = "ejercicio" | PerfilRadio

export function ComunicacionesPractice() {
  const [grupoId, setGrupoId] = useState(CM_PRACTICA_GRUPOS[0].id)
  const grupo = CM_PRACTICA_GRUPOS.find((g) => g.id === grupoId) ?? CM_PRACTICA_GRUPOS[0]
  const [tipoElegido, setTipoElegido] = useState<TipoCm>(grupo.tipos[0].tipo)
  const tipo = grupo.tipos.find((t) => t.tipo === tipoElegido) ?? grupo.tipos[0]
  const [idx, setIdx] = useState(0)
  const [perfil, setPerfil] = useState<PerfilElegido>("ejercicio")
  const [hechos, setHechos] = useState<string[]>(() => readComunicacionesLocal().practiceDone)
  const { user } = useSession()

  // Lo resuelto en la base, y de paso sube lo que se resolvió sin sesión. Si
  // falla (o la tabla todavía no existe), se sigue con lo del navegador.
  useEffect(() => {
    const uid = user?.id
    if (!uid) return
    let cancelado = false
    void (async () => {
      const traido = await fetchComunicacionesProgress(uid)
      if (cancelado || !traido) return
      const remoto = await pushPendingComunicaciones(traido)
      if (cancelado || remoto.practiceDone.length === 0) return
      setHechos((prev) => Array.from(new Set([...prev, ...remoto.practiceDone])))
    })()
    return () => {
      cancelado = true
    }
  }, [user?.id])

  const items = tipo.items
  const claves = items.map(claveEjercicioCm)
  const total = items.length
  const iSeguro = Math.min(idx, Math.max(0, total - 1))
  const item = items[iSeguro]
  const clave = claves[iSeguro]
  const hechosAqui = claves.filter((k) => hechos.includes(k)).length
  const pct = total > 0 ? Math.round((hechosAqui / total) * 100) : 0
  const hechosTotal = new Set(hechos.filter((k) => k.startsWith("cm-"))).size
  const esVuelo = item?.tipo === "vueloCompleto"

  // ¿Este ejercicio tiene sus grabaciones? Se pregunta antes de escuchar, para
  // que el aviso llegue antes que la voz del navegador y no después.
  const [audio, setAudio] = useState<{ clave: string; faltan: number; total: number } | null>(null)
  useEffect(() => {
    if (!item) return
    let cancelado = false
    void grabacionesQueFaltan(item).then((r) => {
      if (!cancelado) setAudio({ clave: claveEjercicioCm(item), ...r })
    })
    return () => {
      cancelado = true
    }
  }, [item])
  const audioAqui = audio && audio.clave === clave ? audio : null

  function marcar(k: string): void {
    if (hechos.includes(k)) return
    setHechos((prev) => (prev.includes(k) ? prev : [...prev, k]))
    void markComunicacionesProgress({ practiceId: k })
    void registrarEstudioDiario("comunicaciones-practica")
  }

  function cambiarGrupo(id: typeof grupoId): void {
    const g = CM_PRACTICA_GRUPOS.find((x) => x.id === id)
    if (!g) return
    setGrupoId(id)
    setTipoElegido(g.tipos[0].tipo)
    setIdx(0)
  }

  function cambiarTipo(t: TipoCm): void {
    setTipoElegido(t)
    setIdx(0)
  }

  const perfilForzado = perfil === "ejercicio" ? undefined : perfil

  return (
    <div
      className="notam-practica mx-auto max-w-[1100px] px-4 py-9 pb-20 sm:px-7 sm:py-11"
      style={{ "--cm-acento": CM_ACENTO, "--av-blue-500": CM_ACENTO } as React.CSSProperties}
    >
      <Link
        to={CM_HUB}
        className="mb-4 inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Volver a {CM_TITULO_CORTO}
      </Link>

      <header className="np-hero relative mb-8 overflow-hidden rounded-[18px] bg-[#251229]">
        {/* La foto todavía no existe. El hueco conserva la caja y el velo, así
            que cuando llegue se pone el <img> con la clase np-hero-foto y no
            cambia nada más. */}
        <div className="np-hero-velo" />
        <div
          className="pointer-events-none absolute inset-2 rounded-[14px] border border-dashed border-white/[0.10]"
          aria-hidden
        />
        <span className="pointer-events-none absolute bottom-3 right-4 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/30">
          CM-PRA-01 · 16:9 · 2000×1125 · espacio reservado
        </span>
        <div className="relative px-6 py-11 text-center sm:px-10 sm:py-14">
          <div className="np-hero-rotulo">
            <Headphones className="h-3.5 w-3.5" /> {CM_TITULO_CORTO} · Práctica
          </div>
          <h1 className="np-display mx-auto mt-4 max-w-[880px] text-[30px] font-semibold leading-[1.1] text-white sm:text-[40px]">
            Escucha, confirma y responde
          </h1>
          <p className="mx-auto mt-5 max-w-[720px] text-[15px] leading-[1.7] text-white/80 sm:text-[16px]">
            Transmisiones con ruido de radio, como en la cabina: di si te llaman a ti, copia la
            autorización, colaciona en voz alta, encuentra el error en la colación de otro y cierra
            con un vuelo entero. Cada ejercicio trae su explicación y su fuente.
          </p>
          <div className="np-hero-cifras">
            {CM_PRACTICA_GRUPOS.map((g, i) => (
              <span key={g.id} className="contents">
                {i > 0 && <span aria-hidden="true" className="np-hero-punto" />}
                <span>
                  <strong className="tabular">{g.tipos.reduce((n, t) => n + t.items.length, 0)}</strong>{" "}
                  {g.nombre.toLowerCase()}
                </span>
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* === CONTROLES === */}
      <section className="surface min-w-0 rounded-2xl p-5 sm:p-6">
        <div
          className="grid grid-cols-2 gap-2 rounded-xl p-1 sm:grid-cols-5"
          style={{ background: "color-mix(in oklab, var(--border) 35%, transparent)" }}
          role="group"
          aria-label="Qué practicas"
        >
          {CM_PRACTICA_GRUPOS.map((g) => {
            const on = g.id === grupo.id
            const cuantos = g.tipos.reduce((n, t) => n + t.items.length, 0)
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => cambiarGrupo(g.id)}
                aria-pressed={on}
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg px-3 text-center text-[13px] font-semibold transition-colors"
                style={{ background: on ? ACENTO : "transparent", color: on ? "white" : "var(--muted-foreground)" }}
              >
                <span className="truncate">
                  {g.nombre} ({cuantos})
                </span>
              </button>
            )
          })}
        </div>

        <p className="mb-0 mt-4 text-[14px] leading-[1.55] text-muted-foreground">{grupo.resumen}</p>

        {grupo.tipos.length > 1 && (
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Tipo de ejercicio">
            {grupo.tipos.map((t) => {
              const on = t.tipo === tipo.tipo
              return (
                <button
                  key={t.tipo}
                  type="button"
                  onClick={() => cambiarTipo(t.tipo)}
                  aria-pressed={on}
                  className="inline-flex min-h-[40px] items-center rounded-full border px-4 text-[13px] font-semibold transition-colors"
                  style={{
                    borderColor: on ? ACENTO : "var(--border)",
                    background: on ? `color-mix(in oklab, ${ACENTO} 12%, transparent)` : "transparent",
                    color: on ? accentText(ACENTO) : "var(--muted-foreground)",
                  }}
                >
                  {t.nombre} ({t.items.length})
                </button>
              )
            })}
          </div>
        )}

        <div className="mt-5">
          <div className="flex items-end justify-between gap-3">
            <div className="text-[13px] font-semibold text-foreground">
              {tipo.nombre}: <span className="tabular">{hechosAqui}</span> de <span className="tabular">{total}</span>{" "}
              resueltos
            </div>
            <div className="tabular text-[12px] text-muted-foreground">{pct}%</div>
          </div>
          <div
            className="mt-2 h-2 overflow-hidden rounded-full"
            style={{ background: "color-mix(in oklab, var(--border) 60%, transparent)" }}
            role="progressbar"
            aria-valuenow={hechosAqui}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label={`Progreso de ${tipo.nombre}`}
          >
            <div className="h-full rounded-full transition-[width]" style={{ width: `${pct}%`, background: ACENTO }} />
          </div>
          <p className="mb-0 mt-2 text-[12px] text-muted-foreground">{tipo.resumen}</p>
        </div>

        <div className="mt-5">
          <div className="np-rotulo mb-2">Salta al que quieras</div>
          <div className="flex flex-wrap gap-1">
            {claves.map((k, i) => {
              const on = i === iSeguro
              const hecho = hechos.includes(k)
              const color = hecho ? "var(--av-green-400)" : ACENTO
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={`Ir al ${i + 1} de ${total}${hecho ? ", ya resuelto" : ""}`}
                  aria-current={on ? "true" : undefined}
                  className="np-salto tabular relative inline-flex items-center justify-center rounded-[6px] border transition-colors"
                  style={{
                    color: on ? "white" : hecho ? accentText(color) : "var(--muted-foreground)",
                    background: on ? color : hecho ? `color-mix(in oklab, ${color} 12%, transparent)` : "transparent",
                    borderColor: on ? color : hecho ? `color-mix(in oklab, ${color} 40%, transparent)` : "var(--border)",
                  }}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
          <div className="mt-2 text-[11px] text-muted-foreground">
            En verde los que ya resolviste. En total llevas{" "}
            <span className="tabular">{Math.min(hechosTotal, CM_PRACTICA_TOTAL)}</span> de{" "}
            <span className="tabular">{CM_PRACTICA_TOTAL}</span>.
          </div>
        </div>

        {/* La radio: la del ejercicio o una fija para todo. En el vuelo completo
            la pone cada tramo, que es justamente lo que se practica ahí. */}
        <div className="mt-5">
          <div className="np-rotulo mb-2" id="cm-radio-rotulo">
            Calidad de la radio
          </div>
          {esVuelo ? (
            <p className="m-0 text-[12.5px] text-muted-foreground">
              En el vuelo completo la radio la pone cada tramo y empeora a medida que avanzas.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2" role="group" aria-labelledby="cm-radio-rotulo">
              {(["ejercicio", ...PERFILES_RADIO] as PerfilElegido[]).map((p) => {
                const on = perfil === p
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPerfil(p)}
                    aria-pressed={on}
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-3.5 text-[12.5px] font-semibold transition-colors"
                    style={{
                      borderColor: on ? ACENTO : "var(--border)",
                      background: on ? `color-mix(in oklab, ${ACENTO} 12%, transparent)` : "transparent",
                      color: on ? accentText(ACENTO) : "var(--muted-foreground)",
                    }}
                  >
                    <Radio className="h-3.5 w-3.5" aria-hidden="true" />
                    {p === "ejercicio" ? "La del ejercicio" : NOMBRE_PERFIL[p]}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* === AVISO DE AUDIO === */}
      {audioAqui && audioAqui.faltan > 0 && (
        <div
          className="mt-6 flex items-start gap-3 rounded-xl border px-4 py-3 text-[13.5px] leading-[1.55] text-foreground"
          style={{
            borderColor: `color-mix(in oklab, ${ACENTO} 35%, var(--border))`,
            background: `color-mix(in oklab, ${ACENTO} 6%, transparent)`,
          }}
          role="note"
        >
          <Info className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accentText(ACENTO) }} aria-hidden="true" />
          <span>
            {audioAqui.faltan === audioAqui.total
              ? "Este ejercicio todavía no tiene audio grabado"
              : `A este ejercicio le faltan ${audioAqui.faltan} de ${audioAqui.total} grabaciones`}
            : lo que falta suena con la voz sintética del navegador, en inglés, con el ruido y el squelch
            de la radio alrededor pero sin el filtro de banda. Sirve para practicar; no es cómo suena
            un controlador de verdad. Si tu navegador no tiene voz, la transmisión aparece escrita.
          </span>
        </div>
      )}

      {/* === EJERCICIO ACTIVO === */}
      <div className="mt-6">
        {item &&
          (esSimple(item) ? (
            <EjercicioCm key={clave} item={item} perfil={perfilForzado} onResultado={() => marcar(clave)} />
          ) : (
            <VueloCompleto key={clave} item={item} onResultado={() => marcar(clave)} />
          ))}
      </div>

      {/* === NAVEGACIÓN === */}
      <nav className="mt-6 flex items-center justify-between gap-3" aria-label="Navegación de ejercicios">
        <button
          type="button"
          onClick={() => setIdx(Math.max(0, iSeguro - 1))}
          disabled={iSeguro === 0}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-border px-4 text-[13px] font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" /> Anterior
        </button>
        <span className="tabular text-[13px] text-muted-foreground">
          {iSeguro + 1} de {total}
        </span>
        <button
          type="button"
          onClick={() => setIdx(Math.min(total - 1, iSeguro + 1))}
          disabled={iSeguro >= total - 1}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border-0 px-4 text-[13px] font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
          style={{ background: ACENTO }}
        >
          Siguiente <ChevronRight className="h-4 w-4" />
        </button>
      </nav>

      <p className="np-aviso mt-8">
        <Info className="h-3 w-3 shrink-0" aria-hidden="true" />
        <span>
          Cada ejercicio cita el documento OACI del que sale su fraseología; los distintivos y los
          lugares son de práctica, y lo que no es fraseología estándar va rotulado PLAIN LANGUAGE.
          Verifica siempre en la publicación de información aeronáutica de tu país.
        </span>
      </p>
    </div>
  )
}
