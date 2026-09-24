import { useMemo, useState } from "react"
import { accentText } from "@/lib/tileColors"
import {
  CATEGORIAS_DESARME,
  calificarDesarmala,
  type CategoriaDesarme,
  type EjDesarmala,
} from "@/lib/comunicacionesPractica"
import { useRadio } from "@/hooks/useRadio"
import { Anuncio, ControlRadio, Explicacion, TarjetaEjercicio, Transcripcion, Veredicto } from "./piezas"
import { ACENTO, BOTON_PRIMARIO, BOTON_SECUNDARIO, ERROR, FOCO, OK, borde, tinte } from "./tokens"
import type { PropsEjercicio } from "./tipos"

/**
 * 6. Desármala: escucha y reparte las piezas en CALL SIGN, ACCIÓN, VALOR,
 * CONDICIÓN y SIGUIENTE ACCIÓN. Es el orden en que hay que escuchar en una
 * frecuencia cargada.
 *
 * Se juega tocando (toca la pieza y luego la casilla), que funciona con
 * teclado y lector de pantalla; arrastrar es un atajo para ratón.
 */
export function Desarmala({ item, perfil, modoExamen = false, onResultado, reproductor }: PropsEjercicio<EjDesarmala>) {
  const radio = useRadio({ limiteRepeticiones: item.repeticiones ?? 2, modoExamen, perfil, reproductor })
  const [asignacion, setAsignacion] = useState<Record<string, CategoriaDesarme | undefined>>({})
  const [elegida, setElegida] = useState<string | null>(null)
  const [revisado, setRevisado] = useState(false)
  const perfilActivo = perfil ?? item.transmision.perfil

  // Orden alfabético: estable y sin delatar el orden en que se dijeron.
  const fichas = useMemo(() => [...item.fichas].sort((a, b) => a.texto.localeCompare(b.texto)), [item.fichas])
  const sueltas = fichas.filter((f) => !asignacion[f.id])
  const resultado = revisado ? calificarDesarmala(item, asignacion) : null
  const okDe = (id: string) => resultado?.find((r) => r.id === id)?.ok

  function colocar(fichaId: string, cat: CategoriaDesarme | undefined) {
    if (revisado) return
    setAsignacion((a) => ({ ...a, [fichaId]: cat }))
    setElegida(null)
  }

  function revisar() {
    const r = calificarDesarmala(item, asignacion)
    setRevisado(true)
    onResultado?.({ aciertos: r.filter((x) => x.ok).length, total: r.length })
  }

  const nombreFicha = (id: string) => fichas.find((f) => f.id === id)?.texto ?? ""

  return (
    <TarjetaEjercicio rotulo="Desármala" titulo="Escucha y separa la transmisión en sus piezas" fuente={item.fuente}>
      <ControlRadio radio={radio} transmisiones={item.transmision} perfil={perfilActivo} />

      <div>
        <div className="mb-2 text-[12.5px] text-muted-foreground" aria-live="polite">
          {elegida ? `Elegiste «${nombreFicha(elegida)}». Ahora toca la casilla.` : sueltas.length ? "Toca una pieza y luego su casilla." : "Todas las piezas están puestas."}
        </div>
        <div className="flex min-h-[44px] flex-wrap gap-2" role="group" aria-label="Piezas sin colocar">
          {sueltas.map((f) => (
            <FichaPieza key={f.id} texto={f.texto} on={elegida === f.id} ok={okDe(f.id)} revisado={revisado} onElegir={() => setElegida(elegida === f.id ? null : f.id)} fichaId={f.id} />
          ))}
        </div>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {CATEGORIAS_DESARME.map((cat) => {
          const dentro = fichas.filter((f) => asignacion[f.id] === cat.id)
          return (
            <div
              key={cat.id}
              onDragOver={(e) => !revisado && e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                const id = e.dataTransfer.getData("text/plain")
                if (id) colocar(id, cat.id)
              }}
              className="rounded-xl border border-dashed p-3"
              style={{ borderColor: borde(ACENTO, 35) }}
            >
              <button
                type="button"
                onClick={() => elegida && colocar(elegida, cat.id)}
                disabled={!elegida || revisado}
                className={`mb-2 w-full rounded-md py-1 text-left text-[11px] font-semibold uppercase tracking-[0.16em] disabled:cursor-default ${FOCO}`}
                style={{ color: accentText(ACENTO) }}
                aria-label={elegida ? `Poner «${nombreFicha(elegida)}» en ${cat.etiqueta}` : cat.etiqueta}
              >
                {cat.etiqueta}
              </button>
              <div className="flex min-h-[40px] flex-wrap gap-2">
                {dentro.map((f) => (
                  <span key={f.id} className="inline-flex items-center gap-1">
                    <FichaPieza texto={f.texto} on={elegida === f.id} ok={okDe(f.id)} revisado={revisado} onElegir={() => setElegida(elegida === f.id ? null : f.id)} fichaId={f.id} />
                    {!revisado && (
                      <button
                        type="button"
                        onClick={() => colocar(f.id, undefined)}
                        className={`min-h-[32px] rounded-md px-1.5 text-[12px] text-muted-foreground hover:text-foreground ${FOCO}`}
                        aria-label={`Quitar «${f.texto}» de ${cat.etiqueta}`}
                      >
                        Quitar
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        {!revisado ? (
          <button type="button" onClick={revisar} disabled={sueltas.length > 0} className={BOTON_PRIMARIO} style={{ background: ACENTO }}>
            Revisar
          </button>
        ) : (
          !modoExamen && (
            <button
              type="button"
              className={BOTON_SECUNDARIO}
              onClick={() => {
                setRevisado(false)
                setAsignacion({})
              }}
            >
              Volver a intentarlo
            </button>
          )
        )}
      </div>

      <Anuncio>
        {resultado && (
          <div className="grid gap-3">
            <ul className="m-0 grid list-none gap-1.5 p-0">
              {item.fichas.map((f) => {
                const ok = okDe(f.id) ?? false
                const donde = CATEGORIAS_DESARME.find((c) => c.id === f.categoria)?.etiqueta
                return (
                  <li key={f.id} className="flex flex-wrap items-center justify-between gap-2 text-[13.5px]">
                    <span className="font-mono" lang="en">
                      {f.texto}
                    </span>
                    <Veredicto ok={ok} texto={ok ? donde : `Va en ${donde}`} />
                  </li>
                )
              })}
            </ul>
            <Explicacion puntaje={`${resultado.filter((r) => r.ok).length} de ${resultado.length} piezas en su sitio`}>{item.explicacion}</Explicacion>
          </div>
        )}
      </Anuncio>
      <Transcripcion transmisiones={[item.transmision]} visible={revisado || radio.fuente === "texto"} />
    </TarjetaEjercicio>
  )
}

function FichaPieza({
  fichaId,
  texto,
  on,
  ok,
  revisado,
  onElegir,
}: {
  fichaId: string
  texto: string
  on: boolean
  ok: boolean | undefined
  revisado: boolean
  onElegir: () => void
}) {
  const color = ok === undefined ? ACENTO : ok ? OK : ERROR
  return (
    <button
      type="button"
      draggable={!revisado}
      onDragStart={(e) => e.dataTransfer.setData("text/plain", fichaId)}
      onClick={() => !revisado && onElegir()}
      aria-pressed={on}
      disabled={revisado}
      className={`min-h-[40px] rounded-lg border px-3 font-mono text-[13px] font-semibold tracking-wide disabled:cursor-default ${FOCO}`}
      style={{
        borderColor: borde(color, on ? 90 : 45),
        background: on ? tinte(color, 22) : tinte(color, 8),
        color: accentText(color),
      }}
      lang="en"
    >
      {texto}
    </button>
  )
}
