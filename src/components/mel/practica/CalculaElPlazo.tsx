import { useState } from "react"
import {
  calificarPlazo,
  cuentaTramos,
  diaDeDescubrimiento,
  diasContados,
  formatoFecha,
  formatoFechaHora,
  NINGUN_TRAMO,
  opcionesPlazo,
  respuestaPlazo,
  type EjCalculaElPlazo,
} from "@/lib/melPractica"
import { EntradaMel } from "./EntradaMel"
import { Anuncio, BotonReintentar, Explicacion, FichaCaso, Opcion, Pregunta, TarjetaEjercicio, Veredicto } from "./piezas"
import { MONO } from "./tokens"
import type { PropsEjercicio } from "./tipos"

/**
 * c) Calcula el plazo: categoría y registro (o tramos volados), y el piloto
 * elige cuándo vence. Al corregir se ve la cuenta día por día o tramo por
 * tramo, con el day of discovery fuera.
 */
export function CalculaElPlazo({ item, modoExamen = false, onResultado }: PropsEjercicio<EjCalculaElPlazo>) {
  const [elegida, setElegida] = useState<string | null>(null)
  const corregido = elegida !== null
  const buena = respuestaPlazo(item)
  const opciones = opcionesPlazo(item)
  const enTramos = item.plazo.unidad === "vuelosHoras"
  const idPregunta = `plazo-${item.id}`

  function elegir(o: string) {
    if (corregido) return
    setElegida(o)
    onResultado?.({ aciertos: calificarPlazo(item, o) ? 1 : 0, total: 1 })
  }

  function etiqueta(o: string): string {
    if (item.plazo.unidad !== "vuelosHoras") return formatoFechaHora(o)
    if (o === NINGUN_TRAMO) return "Ninguno: no puede volar más"
    const t = item.plazo.tramos.find((x) => x.id === o)
    return t ? `${t.ruta} (${t.horas.toLocaleString("es-CO")} h)` : o
  }

  const datos: string[] = [`Categoría ${item.categoria}.`]
  if (item.registro) {
    const r = item.registro
    const huso = r.huso === 0 ? "UTC" : `UTC${r.huso > 0 ? "+" : "−"}${Math.abs(r.huso)}`
    datos.push(`Anotado en el tech log: ${formatoFecha(r.fecha)}, ${r.hora} (${huso}).`)
    datos.push(`El operador cuenta en ${item.cuenta === "UTC" ? "UTC" : "hora local"}.`)
  }
  if (item.plazo.unidad === "vuelosHoras") {
    const p = item.plazo
    const limite = [p.vuelos !== undefined && `${p.vuelos} vuelos`, p.horas !== undefined && `${p.horas} horas de vuelo`].filter(Boolean).join(" o ")
    datos.push(`Límite: ${limite}${p.vuelos !== undefined && p.horas !== undefined ? ", lo que ocurra primero" : ""}.`)
  }

  const cuenta = corregido ? diasContados(item) : []
  const tramos = item.plazo.unidad === "vuelosHoras" ? cuentaTramos(item.plazo) : []

  return (
    <TarjetaEjercicio rotulo="Calcula el plazo" titulo={item.situacion} fuente={item.fuente}>
      {item.entrada && <EntradaMel entrada={item.entrada} resaltar={item.fila} />}
      <FichaCaso rotulo="Datos" lineas={datos} />

      {enTramos && (
        <div className="min-w-0">
          <div className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground" style={{ fontFamily: MONO }}>
            Programación desde el diferido
          </div>
          <ol className="m-0 grid list-none gap-1 p-0">
            {tramos.map((c, i) => (
              <li key={c.tramo.id} className="flex flex-wrap items-baseline gap-x-3 text-[14px]">
                <span className="w-5 text-right text-muted-foreground" style={{ fontFamily: MONO }}>
                  {i + 1}
                </span>
                <span className="font-semibold" style={{ fontFamily: MONO }}>
                  {c.tramo.ruta}
                </span>
                <span className="text-muted-foreground">{c.tramo.horas.toLocaleString("es-CO")} h</span>
                <span className="text-[12.5px] text-muted-foreground">{c.tramo.hecho ? "volado" : "programado"}</span>
                {corregido && (
                  <span className="text-[12.5px] text-muted-foreground">
                    · acumulado {c.vuelos} {c.vuelos === 1 ? "vuelo" : "vuelos"}, {c.horas.toLocaleString("es-CO")} h
                    {!c.permitido && " (pasa el límite)"}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="grid gap-2.5">
        <Pregunta id={idPregunta}>{enTramos ? "¿Cuál es el último tramo que puede volar con el diferido?" : "¿Cuándo vence el plazo?"}</Pregunta>
        <div role="group" aria-labelledby={idPregunta} className="grid gap-2 sm:grid-cols-2">
          {opciones.map((o, i) => {
            const marcada = elegida === o
            const esBuena = o === buena
            return (
              <Opcion
                key={o}
                texto={etiqueta(o)}
                indice={i}
                marcada={marcada}
                deshabilitada={corregido}
                estado={!corregido ? "neutra" : esBuena ? "correcta" : marcada ? "error" : "neutra"}
                onClick={() => elegir(o)}
              />
            )
          })}
        </div>
      </div>

      <Anuncio>
        {corregido && (
          <div className="grid gap-3">
            <Veredicto ok={calificarPlazo(item, elegida)} texto={calificarPlazo(item, elegida) ? "Correcto" : `No. Es ${buena ? etiqueta(buena) : "otra"}`} />
            {item.registro && cuenta.length > 0 && (
              <div className="text-[13.5px] leading-relaxed text-foreground">
                <span className="font-semibold">Day of discovery (no cuenta): </span>
                {formatoFecha(diaDeDescubrimiento(item.registro, item.cuenta))}.{" "}
                <span className="font-semibold">{item.plazo.unidad === "diasDeVuelo" ? "Flight-days que cuentan: " : "Días que cuentan: "}</span>
                {cuenta.length <= 12
                  ? cuenta.map((d, i) => `${i + 1}: ${formatoFecha(d)}`).join(" · ")
                  : `1: ${formatoFecha(cuenta[0])} … ${cuenta.length}: ${formatoFecha(cuenta[cuenta.length - 1])}`}
              </div>
            )}
            <Explicacion>{item.explicacion}</Explicacion>
            {!modoExamen && <BotonReintentar onClick={() => setElegida(null)} />}
          </div>
        )}
      </Anuncio>
    </TarjetaEjercicio>
  )
}
