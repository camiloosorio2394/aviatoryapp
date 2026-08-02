import { CLASES } from "@/lib/mercanciasClases"
import { CASOS } from "@/lib/mercanciasPractica"
import { Aviso, Entradilla, F, Titular } from "../piezas"
import { Rombo } from "./Rombo"

/**
 * 09 · Práctica de clasificación.
 *
 * Se da una mercancía y el piloto decide su clase y si le aplica grupo de
 * embalaje. Solo DESPUÉS de responder aparece la corrección: elegir primero es
 * lo que entrena; ver la respuesta antes solo produce la sensación de haberla
 * sabido, que es el mismo criterio de la práctica de NOTAM y METAR.
 *
 * El estado vive en el lector, no aquí: así se puede salir a repasar una
 * sección y volver sin perder lo respondido.
 */

export interface RespuestaCaso {
  clase: string
  ge: boolean | null
}

interface Seccion09Props {
  caso: number
  onCaso: (i: number) => void
  resp: Record<string, RespuestaCaso>
  onResp: (id: string, r: RespuestaCaso) => void
  hechos: Record<string, boolean>
  onHecho: (id: string) => void
}

export function Seccion09({ caso, onCaso, resp, onResp, hechos, onHecho }: Seccion09Props) {
  const item = CASOS[Math.min(caso, CASOS.length - 1)]
  const mia = resp[item.id] ?? { clase: "", ge: null }
  const corregido = hechos[item.id] === true
  const completos = CASOS.filter((c) => hechos[c.id]).length

  const claseOk = mia.clase === item.clase
  const geOk = mia.ge === item.ge
  const puedeCorregir = mia.clase !== "" && mia.ge !== null

  return (
    <>
      <Titular n="09">Práctica de clasificación</Titular>

      <Entradilla>
        Cuatro casos. Decide la clase y si le aplica grupo de embalaje, y solo después mira la
        corrección. Elegir primero es lo que entrena; leer la respuesta antes de intentarlo solo
        deja la sensación de haberla sabido.
      </Entradilla>

      {/* Navegación entre casos */}
      <div className="flex items-center gap-2 flex-wrap">
        {CASOS.map((c, i) => {
          const activo = i === caso
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onCaso(i)}
              aria-current={activo ? "step" : undefined}
              className="mono flex h-8 min-w-8 items-center justify-center gap-1 rounded-lg px-2 text-[12px] font-semibold transition-colors"
              style={
                activo
                  ? { background: "var(--mod-band)", color: "var(--mod-accent)" }
                  : {
                      background: "var(--mod-card)",
                      border: "1px solid var(--mod-line)",
                      color: hechos[c.id] ? "var(--mod-ok-fg)" : "var(--mod-muted)",
                    }
              }
            >
              {i + 1}
              {hechos[c.id] && !activo && <span aria-label="resuelto">·</span>}
            </button>
          )
        })}
        <span className="ml-auto text-[12.5px]" style={{ color: "var(--mod-muted)" }}>
          {completos} de {CASOS.length} resueltos
        </span>
      </div>

      {/* El caso */}
      <div
        className="rounded-xl p-4 sm:p-5"
        style={{ background: "var(--mod-panel)", border: "1px solid var(--mod-line)" }}
      >
        <div className="mod-eyebrow mb-2">Caso {caso + 1}</div>
        <p className="m-0 text-[15.5px] leading-[1.65]" style={{ color: "var(--mod-ink)" }}>
          {item.texto}
        </p>
      </div>

      {/* Elegir la clase */}
      <div>
        <div className="mod-eyebrow mb-2">¿Qué clase es?</div>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
          {CLASES.map((c) => {
            const elegida = mia.clase === c.n
            const esLaBuena = corregido && c.n === item.clase
            const falloAqui = corregido && elegida && !claseOk
            return (
              <button
                key={c.n}
                type="button"
                disabled={corregido}
                onClick={() => onResp(item.id, { ...mia, clase: c.n })}
                aria-pressed={elegida}
                className="flex flex-col items-center gap-1 rounded-xl px-1 py-2 transition-colors disabled:cursor-default"
                style={{
                  background: esLaBuena
                    ? "var(--mod-ok-bg)"
                    : falloAqui
                      ? "var(--mod-no-bg)"
                      : elegida
                        ? "var(--mod-panel-2)"
                        : "transparent",
                  border: `1px solid ${
                    esLaBuena
                      ? "var(--mod-ok-line)"
                      : falloAqui
                        ? "var(--mod-no-fg)"
                        : elegida
                          ? c.color
                          : "var(--mod-line)"
                  }`,
                }}
              >
                <Rombo id={c.rombos[0]} tam={36} etiqueta={`Clase ${c.n}, ${c.nombre}`} />
                <span
                  className="mono text-[11.5px] font-semibold leading-none"
                  style={{ color: elegida || esLaBuena ? "var(--mod-ink)" : "var(--mod-muted)" }}
                >
                  {c.n}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Grupo de embalaje */}
      <div>
        <div className="mod-eyebrow mb-2">¿Le aplica grupo de embalaje?</div>
        <div className="flex gap-2">
          {[
            { v: true, t: "Sí, lleva" },
            { v: false, t: "No lleva" },
          ].map(({ v, t }) => {
            const elegida = mia.ge === v
            const esLaBuena = corregido && v === item.ge
            const falloAqui = corregido && elegida && !geOk
            return (
              <button
                key={t}
                type="button"
                disabled={corregido}
                onClick={() => onResp(item.id, { ...mia, ge: v })}
                aria-pressed={elegida}
                className="flex-1 rounded-xl px-4 py-3 text-[14px] font-semibold transition-colors disabled:cursor-default"
                style={{
                  background: esLaBuena
                    ? "var(--mod-ok-bg)"
                    : falloAqui
                      ? "var(--mod-no-bg)"
                      : elegida
                        ? "var(--mod-panel-2)"
                        : "var(--mod-card)",
                  border: `1px solid ${
                    esLaBuena
                      ? "var(--mod-ok-line)"
                      : falloAqui
                        ? "var(--mod-no-fg)"
                        : elegida
                          ? "var(--mod-border-b)"
                          : "var(--mod-line)"
                  }`,
                  color: esLaBuena
                    ? "var(--mod-ok-fg)"
                    : falloAqui
                      ? "var(--mod-no-fg)"
                      : "var(--mod-ink)",
                }}
              >
                {t}
              </button>
            )
          })}
        </div>
      </div>

      {!corregido ? (
        <button
          type="button"
          disabled={!puedeCorregir}
          onClick={() => onHecho(item.id)}
          className="rounded-xl px-5 py-3 text-[14.5px] font-semibold transition-opacity disabled:opacity-45 disabled:cursor-not-allowed"
          style={{ background: "var(--mod-band)", color: "#FFFFFF" }}
        >
          {puedeCorregir ? "Comprobar" : "Elige clase y grupo de embalaje"}
        </button>
      ) : (
        <>
          <Aviso
            tono={claseOk && geOk ? "permitido" : "ojo"}
            titulo={
              claseOk && geOk
                ? "Correcto"
                : claseOk
                  ? "La clase sí, el grupo de embalaje no"
                  : "No es esa clase"
            }
          >
            <p className="m-0">
              <F>{item.respuesta}</F>
            </p>
            <p className="m-0 mt-2">{item.explicacion}</p>
            {item.embalaje && (
              <p className="m-0 mt-2" style={{ color: "var(--mod-muted)" }}>
                {item.embalaje}
              </p>
            )}
          </Aviso>

          {caso < CASOS.length - 1 && (
            <button
              type="button"
              onClick={() => onCaso(caso + 1)}
              className="self-start rounded-xl px-5 py-3 text-[14.5px] font-semibold"
              style={{ background: "var(--mod-band)", color: "#FFFFFF" }}
            >
              Siguiente caso
            </button>
          )}
        </>
      )}

      {completos === CASOS.length && (
        <Aviso tono="info" titulo="Resueltos los cuatro">
          Sigue al chequeo final para cerrar el módulo.
        </Aviso>
      )}
    </>
  )
}
