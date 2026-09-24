import { useId, useState } from "react"
import { calificarCopia, type EjCopia, type ResultadoCampo } from "@/lib/comunicacionesPractica"
import { useRadio } from "@/hooks/useRadio"
import { Anuncio, ControlRadio, Explicacion, TarjetaEjercicio, Transcripcion, Veredicto } from "./piezas"
import { ACENTO, BOTON_PRIMARIO, BOTON_SECUNDARIO, ERROR, FOCO, OK, borde } from "./tokens"
import type { PropsEjercicio } from "./tipos"

/**
 * 1. Copia la autorización: suena una autorización y el piloto llena los
 * campos que define el guion. Se califica campo por campo, normalizando el
 * formato (FL240, «flight level 240» y 240 valen lo mismo).
 */
export function CopiaAutorizacion({ item, perfil, modoExamen = false, onResultado, reproductor }: PropsEjercicio<EjCopia>) {
  const radio = useRadio({ limiteRepeticiones: item.repeticiones ?? 2, modoExamen, perfil, reproductor })
  const [valores, setValores] = useState<Record<string, string>>({})
  const [resultado, setResultado] = useState<ResultadoCampo[] | null>(null)
  const base = useId()
  const perfilActivo = perfil ?? item.transmision.perfil

  function revisar() {
    const r = calificarCopia(item, valores)
    setResultado(r)
    onResultado?.({ aciertos: r.filter((c) => c.ok).length, total: r.length })
  }

  const aciertos = resultado?.filter((c) => c.ok).length ?? 0

  return (
    <TarjetaEjercicio rotulo="Copia la autorización" titulo="Escucha y copia lo que te autorizan" fuente={item.fuente}>
      <ControlRadio radio={radio} transmisiones={item.transmision} perfil={perfilActivo} />

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!resultado) revisar()
        }}
        className="grid gap-3 sm:grid-cols-2"
      >
        {item.campos.map((c) => {
          const r = resultado?.find((x) => x.id === c.id)
          const id = `${base}-${c.id}`
          const color = r ? (r.ok ? OK : ERROR) : "var(--border)"
          return (
            <div key={c.id} className="grid gap-1.5">
              <label htmlFor={id} className="text-[12.5px] font-semibold text-foreground">
                {c.etiqueta}
              </label>
              <input
                id={id}
                type="text"
                inputMode="text"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                placeholder={c.ayuda}
                value={valores[c.id] ?? ""}
                readOnly={!!resultado}
                aria-invalid={r ? !r.ok : undefined}
                aria-describedby={r ? `${id}-r` : undefined}
                onChange={(e) => setValores((v) => ({ ...v, [c.id]: e.target.value }))}
                className={`min-h-[44px] rounded-lg border bg-transparent px-3 text-[15px] uppercase tabular-nums text-foreground ${FOCO}`}
                style={{ borderColor: r ? borde(color, 60) : "var(--border)" }}
              />
              {r && (
                <span id={`${id}-r`} className="text-[12.5px]">
                  <Veredicto ok={r.ok} texto={r.ok ? "Bien" : `Era ${r.esperado}`} />
                </span>
              )}
            </div>
          )
        })}
        <div className="flex flex-wrap gap-2 sm:col-span-2">
          {!resultado ? (
            <button type="submit" className={BOTON_PRIMARIO} style={{ background: ACENTO }}>
              Revisar
            </button>
          ) : (
            !modoExamen && (
              <button
                type="button"
                className={BOTON_SECUNDARIO}
                onClick={() => {
                  setResultado(null)
                  setValores({})
                }}
              >
                Volver a intentarlo
              </button>
            )
          )}
        </div>
      </form>

      <Anuncio>
        {resultado && (
          <Explicacion puntaje={`${aciertos} de ${resultado.length} campos bien`}>{item.explicacion}</Explicacion>
        )}
      </Anuncio>
      <Transcripcion transmisiones={[item.transmision]} visible={!!resultado || radio.fuente === "texto"} />
    </TarjetaEjercicio>
  )
}
