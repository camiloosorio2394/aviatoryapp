import { useState, type KeyboardEvent } from "react"
import { Minus, Plus } from "lucide-react"
import { accentText } from "@/lib/tileColors"
import {
  PERILLAS,
  calificarPanel,
  moverPerilla,
  textoAltitud,
  type ControlPanel,
  type EjPanel,
  type ValoresPanel,
} from "@/lib/comunicacionesPractica"
import { useRadio } from "@/hooks/useRadio"
import { Anuncio, ControlRadio, Explicacion, TarjetaEjercicio, Transcripcion, Veredicto } from "./piezas"
import { ACENTO, BOTON_PRIMARIO, BOTON_SECUNDARIO, ERROR, FOCO, OK, borde, tinte } from "./tokens"
import type { PropsEjercicio } from "./tipos"

/**
 * 7. Panel de cabina: escucha y ajusta un panel de piloto automático sencillo
 * (HDG, ALT, SPD y, si el ítem lo pide, V/S). No imita a ningún fabricante.
 *
 * Cada perilla es un `spinbutton`: flechas para el paso fino, RePág y AvPág
 * para el grueso, Inicio y Fin para los extremos. Los botones − y + hacen lo
 * mismo con el dedo.
 */
export function PanelCabina({ item, perfil, modoExamen = false, onResultado, reproductor }: PropsEjercicio<EjPanel>) {
  const radio = useRadio({ limiteRepeticiones: item.repeticiones ?? 2, modoExamen, perfil, reproductor })
  const [valores, setValores] = useState<ValoresPanel>(item.inicial)
  const [revisado, setRevisado] = useState(false)
  const perfilActivo = perfil ?? item.transmision.perfil
  const controles: ControlPanel[] = item.conVs ? ["hdg", "alt", "spd", "vs"] : ["hdg", "alt", "spd"]
  const resultado = revisado ? calificarPanel(item, valores) : null

  function mover(c: ControlPanel, delta: number) {
    if (revisado) return
    setValores((v) => ({ ...v, [c]: moverPerilla(c, v[c], delta) }))
  }

  function fijar(c: ControlPanel, valor: number) {
    if (revisado) return
    setValores((v) => ({ ...v, [c]: valor }))
  }

  function mostrar(c: ControlPanel, v: number): string {
    if (c === "hdg") return String(v).padStart(3, "0")
    if (c === "alt") return textoAltitud(v, !!item.altEnNivel)
    if (c === "vs") return v > 0 ? `+${v}` : String(v)
    return String(v)
  }

  function teclas(c: ControlPanel, e: KeyboardEvent) {
    const p = PERILLAS[c]
    const mapa: Record<string, () => void> = {
      ArrowUp: () => mover(c, p.paso),
      ArrowRight: () => mover(c, p.paso),
      ArrowDown: () => mover(c, -p.paso),
      ArrowLeft: () => mover(c, -p.paso),
      PageUp: () => mover(c, p.pasoGrande),
      PageDown: () => mover(c, -p.pasoGrande),
      Home: () => fijar(c, p.min),
      End: () => fijar(c, p.max),
    }
    const accion = mapa[e.key]
    if (accion) {
      e.preventDefault()
      accion()
    }
  }

  function revisar() {
    const r = calificarPanel(item, valores)
    setRevisado(true)
    onResultado?.({ aciertos: r.filter((x) => x.ok).length, total: r.length })
  }

  return (
    <TarjetaEjercicio rotulo="Panel de cabina" titulo="Escucha y ajusta el piloto automático" fuente={item.fuente}>
      <ControlRadio radio={radio} transmisiones={item.transmision} perfil={perfilActivo} />

      <div
        className="grid gap-3 rounded-2xl border p-3 sm:p-4"
        style={{ borderColor: "var(--border)", background: "color-mix(in oklab, var(--foreground) 4%, transparent)", gridTemplateColumns: `repeat(auto-fit, minmax(150px, 1fr))` }}
        role="group"
        aria-label="Panel del piloto automático"
      >
        {controles.map((c) => {
          const p = PERILLAS[c]
          const r = resultado?.find((x) => x.control === c)
          const color = r ? (r.ok ? OK : ERROR) : ACENTO
          const texto = mostrar(c, valores[c])
          return (
            <div key={c} className="grid gap-2 rounded-xl border p-3" style={{ borderColor: r ? borde(color, 55) : "var(--border)" }}>
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[12px] font-semibold tracking-[0.16em]" style={{ color: accentText(ACENTO) }}>
                  {p.etiqueta}
                </span>
                <span className="text-[11px] text-muted-foreground">{c === "alt" && item.altEnNivel ? "FL" : p.unidad}</span>
              </div>
              <div
                role="spinbutton"
                tabIndex={revisado ? -1 : 0}
                aria-label={p.etiqueta}
                aria-valuenow={valores[c]}
                aria-valuemin={p.min}
                aria-valuemax={p.max}
                aria-valuetext={texto}
                aria-readonly={revisado || undefined}
                onKeyDown={(e) => teclas(c, e)}
                className={`rounded-lg py-2 text-center font-mono text-[26px] font-semibold tabular-nums ${FOCO}`}
                style={{ background: tinte(color, 10), color: accentText(color, 80) }}
              >
                {texto}
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => mover(c, -p.pasoGrande)}
                  disabled={revisado}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="inline-flex min-h-[40px] items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-40"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => mover(c, p.pasoGrande)}
                  disabled={revisado}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="inline-flex min-h-[40px] items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => mover(c, -p.paso)}
                  disabled={revisado}
                  aria-label={`Bajar ${p.etiqueta} ${p.paso}`}
                  className={`min-h-[36px] rounded-lg border border-border text-[12px] text-muted-foreground hover:bg-muted disabled:opacity-40 ${FOCO}`}
                >
                  −{p.paso}
                </button>
                <button
                  type="button"
                  onClick={() => mover(c, p.paso)}
                  disabled={revisado}
                  aria-label={`Subir ${p.etiqueta} ${p.paso}`}
                  className={`min-h-[36px] rounded-lg border border-border text-[12px] text-muted-foreground hover:bg-muted disabled:opacity-40 ${FOCO}`}
                >
                  +{p.paso}
                </button>
              </div>
              {r && <Veredicto ok={r.ok} texto={r.ok ? "Bien" : `Era ${mostrar(c, r.esperado)}`} />}
            </div>
          )
        })}
      </div>
      <p className="m-0 text-[12px] text-muted-foreground">
        Con teclado: flechas para el paso fino, RePág y AvPág para el grueso. Los botones − y + mueven el paso grueso.
      </p>

      <div className="flex flex-wrap gap-2">
        {!revisado ? (
          <button type="button" onClick={revisar} className={BOTON_PRIMARIO} style={{ background: ACENTO }}>
            Verificar
          </button>
        ) : (
          !modoExamen && (
            <button
              type="button"
              className={BOTON_SECUNDARIO}
              onClick={() => {
                setRevisado(false)
                setValores(item.inicial)
              }}
            >
              Volver a intentarlo
            </button>
          )
        )}
      </div>

      <Anuncio>
        {resultado && (
          <Explicacion puntaje={`${resultado.filter((r) => r.ok).length} de ${resultado.length} bien puestos`}>{item.explicacion}</Explicacion>
        )}
      </Anuncio>
      <Transcripcion transmisiones={[item.transmision]} visible={revisado || radio.fuente === "texto"} />
    </TarjetaEjercicio>
  )
}
