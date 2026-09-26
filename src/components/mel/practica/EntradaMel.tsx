import type { CSSProperties, ReactNode } from "react"
import { accentText } from "@/lib/tileColors"
import { NOMBRE_PARTE, esEntradaReal, partirProvisos, type EntradaMel as DatosEntrada, type FilaMel, type ParteEntrada } from "@/lib/melPractica"
import { ACENTO, ERROR, FOCO, MONO, OK, borde, tinte } from "./tokens"

/**
 * Una entrada de MEL como se ve en la página: encabezado del documento,
 * capítulo, clave de columnas y filas (Item, 1 categoría, 2 instalados,
 * 3 requeridos, 4 Remarks or Exceptions).
 *
 * En el celular las tres columnas numéricas quedan junto al ítem y Remarks
 * baja a lo ancho; desde `sm` va como en papel, cinco columnas. Es una rejilla
 * con roles de tabla para que el lector de pantalla la recorra por celdas.
 *
 * Con `toca`, las partes de la fila resaltada (y el número e ítem) se vuelven
 * botones: así se juega «toca la categoría».
 */

export interface TocaEntrada {
  onTocar: (parte: ParteEntrada) => void
  /** Lo último que se tocó y si estuvo bien. */
  marca?: { parte: ParteEntrada; ok: boolean } | null
  /** Tras un error, dónde estaba. */
  correcta?: ParteEntrada | null
  deshabilitado?: boolean
}

const REJILLA =
  "grid grid-cols-[minmax(0,1fr)_2.1rem_2.1rem_2.1rem] sm:grid-cols-[minmax(0,12rem)_2.4rem_2.4rem_2.4rem_minmax(0,1fr)]"

function Proc({ lista }: { lista: FilaMel["procedimientos"] }) {
  if (!lista?.length) return null
  return (
    <span className="mr-1.5 font-semibold" style={{ fontFamily: MONO }}>
      {lista.map((p) => `(${p})`).join("")}
    </span>
  )
}

function Remarks({ fila }: { fila: FilaMel }) {
  if (!fila.observaciones) return null
  const [primero, ...resto] = partirProvisos(fila.observaciones)
  return (
    <>
      <span>{primero}</span>
      {resto.map((r, i) => (
        <span key={i} className="block pl-3">
          {r}
        </span>
      ))}
    </>
  )
}

export function EntradaMel({
  entrada,
  resaltar,
  toca,
  titulo,
}: {
  entrada: DatosEntrada
  /** Índice de la fila que se lee. */
  resaltar?: number
  toca?: TocaEntrada
  /** Encabezado extra, p. ej. «Ítem abierto 1 de 2». */
  titulo?: string
}) {
  const real = esEntradaReal(entrada)
  const primera = entrada.filas[0]
  const cabeceraAparte = !primera || !!primera.subitem || !!primera.secuencia
  const foco = resaltar !== undefined ? entrada.filas[resaltar] : undefined

  /** Pinta una parte; si se puede tocar, como botón. */
  function parte(p: ParteEntrada, contenido: ReactNode, activa: boolean, clase = "", valor?: string): ReactNode {
    if (!toca || !activa) return <span className={clase}>{contenido}</span>
    const marcada = toca.marca?.parte === p
    const esCorrecta = toca.correcta === p
    const color = marcada ? (toca.marca?.ok ? OK : ERROR) : esCorrecta ? OK : ACENTO
    const pintada = marcada || esCorrecta
    const estilo: CSSProperties = {
      outline: pintada ? `2px solid ${color}` : `1px dashed ${borde(ACENTO, 55)}`,
      outlineOffset: 1,
      background: pintada ? tinte(color, 14) : "transparent",
    }
    return (
      <button
        type="button"
        onClick={() => toca.onTocar(p)}
        disabled={toca.deshabilitado}
        aria-label={`${NOMBRE_PARTE[p]}${valor ? `: ${valor}` : ""}`}
        className={`rounded-[4px] px-0.5 text-left disabled:cursor-default ${FOCO} ${clase}`}
        style={estilo}
      >
        {contenido}
      </button>
    )
  }

  function celdaItem(fila: FilaMel, i: number): ReactNode {
    const esFoco = i === resaltar
    const conCabecera = i === 0 && !cabeceraAparte
    return (
      <div role="cell" className="min-w-0 py-2 pr-2 text-[12.5px] leading-[1.35]">
        {conCabecera && (
          <>
            {parte("codigo", <span className="font-semibold" style={{ fontFamily: MONO }}>{entrada.codigo}</span>, esFoco, "", entrada.codigo)}
            {entrada.tripleAsterisco && (
              <span className="ml-1 font-semibold" style={{ fontFamily: MONO }}>
                ***
              </span>
            )}{" "}
            {parte("item", <span className="font-semibold">{entrada.titulo}</span>, esFoco, "", entrada.titulo)}
          </>
        )}
        {fila.secuencia && (
          <div>{parte("codigo", <span className="font-semibold" style={{ fontFamily: MONO }}>{fila.secuencia}</span>, esFoco, "", fila.secuencia)}</div>
        )}
        {fila.subitem && <div className={fila.categoria ? "" : "font-semibold"}>{fila.subitem}</div>}
      </div>
    )
  }

  function celdaNum(p: "categoria" | "instalados" | "requeridos", valor: string | undefined, esFoco: boolean): ReactNode {
    return (
      <div role="cell" className="py-2 text-center text-[13px] font-semibold" style={{ fontFamily: MONO }}>
        {valor ? parte(p, valor, esFoco, "inline-block min-w-[1.4rem] text-center", valor) : null}
      </div>
    )
  }

  return (
    <figure
      className="m-0 min-w-0 overflow-hidden rounded-xl border"
      style={{ borderColor: borde("var(--foreground)", 22), background: "var(--ln-paper, var(--card))", color: "var(--ln-ink, var(--foreground))" }}
    >
      {titulo && (
        <div className="border-b px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ borderColor: "var(--border)", color: accentText(ACENTO), fontFamily: MONO }}>
          {titulo}
        </div>
      )}
      <div className="border-b px-3 py-2" style={{ borderColor: "var(--border)" }}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground" style={{ fontFamily: MONO }}>
            {real ? "Master Minimum Equipment List" : "Aeronave de ejemplo"}
          </span>
          <span className="text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground" style={{ fontFamily: MONO }}>
            1 Cat. · 2 Inst. · 3 Req. · 4 Remarks
          </span>
        </div>
        <div className="mt-1 text-[13px] font-semibold" style={{ fontFamily: MONO }}>
          {entrada.ata.numero}. {entrada.ata.titulo}
        </div>
      </div>

      <div role="table" aria-label={`Entrada ${entrada.codigo} ${entrada.titulo}`} className="px-3">
        <div role="row" className={`${REJILLA} border-b text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted-foreground`} style={{ borderColor: "var(--border)", fontFamily: MONO }}>
          <div role="columnheader" className="py-1.5">
            Item
          </div>
          <div role="columnheader" className="py-1.5 text-center">
            <span aria-hidden="true">1</span>
            <span className="sr-only">Categoría</span>
          </div>
          <div role="columnheader" className="py-1.5 text-center">
            <span aria-hidden="true">2</span>
            <span className="sr-only">Instalados</span>
          </div>
          <div role="columnheader" className="py-1.5 text-center">
            <span aria-hidden="true">3</span>
            <span className="sr-only">Requeridos</span>
          </div>
          <div role="columnheader" className="hidden py-1.5 sm:block">
            4 Remarks or Exceptions
          </div>
        </div>

        {cabeceraAparte && (
          <div role="row" className={`${REJILLA} border-b`} style={{ borderColor: "var(--border)" }}>
            <div role="cell" className="col-span-4 py-2 text-[12.5px] leading-[1.35] sm:col-span-5">
              {parte("codigo", <span className="font-semibold" style={{ fontFamily: MONO }}>{entrada.codigo}</span>, !foco?.secuencia, "", entrada.codigo)}
              {entrada.tripleAsterisco && (
                <span className="ml-1 font-semibold" style={{ fontFamily: MONO }}>
                  ***
                </span>
              )}{" "}
              {parte("item", <span className="font-semibold">{entrada.titulo}</span>, true, "", entrada.titulo)}
            </div>
          </div>
        )}

        {entrada.filas.map((fila, i) => {
          const esFoco = i === resaltar
          const tieneDatos = !!fila.categoria
          return (
            <div
              key={i}
              role="row"
              aria-current={esFoco ? "true" : undefined}
              className={`${REJILLA} -mx-3 border-b px-3 last:border-b-0`}
              style={{
                borderColor: "var(--border)",
                background: esFoco ? tinte(ACENTO, 9) : undefined,
                boxShadow: esFoco ? `inset 3px 0 0 ${ACENTO}` : undefined,
                opacity: resaltar !== undefined && !esFoco ? 0.8 : 1,
              }}
            >
              {celdaItem(fila, i)}
              {celdaNum("categoria", fila.categoria, esFoco)}
              {celdaNum("instalados", fila.instalados, esFoco)}
              {celdaNum("requeridos", fila.requeridos, esFoco)}
              <div role="cell" className="col-span-4 min-w-0 pb-2.5 text-[13px] leading-[1.45] sm:col-span-1 sm:py-2" lang="en">
                {tieneDatos && (
                  <>
                    {fila.procedimientos?.length
                      ? parte("procedimientos", <Proc lista={fila.procedimientos} />, esFoco, "", fila.procedimientos.map((p) => `(${p})`).join(""))
                      : null}
                    {parte("observaciones", <Remarks fila={fila} />, esFoco, "")}
                    {fila.notas?.map((n, j) => (
                      <div key={j} className="mt-1.5">
                        {parte(
                          "nota",
                          <span className="block text-[12.5px] text-muted-foreground">
                            <span className="font-semibold">NOTE{fila.notas && fila.notas.length > 1 ? ` ${j + 1}` : ""}:</span> {n}
                          </span>,
                          esFoco,
                          "block",
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {real && (
        <figcaption className="border-t px-3 py-1.5 text-[11px] leading-snug text-muted-foreground" style={{ borderColor: "var(--border)" }}>
          {entrada.fuente}
        </figcaption>
      )}
    </figure>
  )
}
