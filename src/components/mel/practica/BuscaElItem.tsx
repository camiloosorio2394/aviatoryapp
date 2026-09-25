import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { calificarBusqueda, sumarPartes, type EjBuscaElItem } from "@/lib/melPractica"
import { accentText } from "@/lib/tileColors"
import { Anuncio, BotonReintentar, Explicacion, FichaCaso, TarjetaEjercicio, Veredicto } from "./piezas"
import { ACENTO, ERROR, FOCO, MONO, OK, borde, tinte } from "./tokens"
import type { PropsEjercicio } from "./tipos"

type Estado = "neutra" | "correcta" | "error"

function Fila({
  codigo,
  titulo,
  estado,
  onClick,
  deshabilitada,
}: {
  codigo: string
  titulo: string
  estado: Estado
  onClick: () => void
  deshabilitada: boolean
}) {
  const color = estado === "correcta" ? OK : ERROR
  const pintada = estado !== "neutra"
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        disabled={deshabilitada}
        className={`flex min-h-[48px] w-full items-center gap-3 border-b px-3 py-2 text-left transition-colors hover:bg-muted disabled:cursor-default disabled:hover:bg-transparent ${FOCO}`}
        style={{ borderColor: "var(--border)", background: pintada ? tinte(color, 12) : undefined, boxShadow: pintada ? `inset 3px 0 0 ${color}` : undefined }}
      >
        <span className="w-[4.6rem] shrink-0 text-[13px] font-semibold" style={{ fontFamily: MONO, color: accentText(ACENTO) }}>
          {codigo}
        </span>
        <span className="min-w-0 flex-1 text-[14px] leading-snug text-foreground" lang="en">
          {titulo}
        </span>
        {pintada ? (
          <span className="shrink-0 text-[11.5px] font-semibold" style={{ color: accentText(color) }}>
            {estado === "correcta" ? "Correcto" : "No"}
          </span>
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        )}
      </button>
    </li>
  )
}

/**
 * e) Busca el ítem: como en el EFB, primero el capítulo ATA y luego el ítem
 * de su índice. Si el capítulo es otro, se marca y se abre el bueno.
 */
export function BuscaElItem({ item, modoExamen = false, onResultado }: PropsEjercicio<EjBuscaElItem>) {
  const [capitulo, setCapitulo] = useState<string | null>(null)
  const [elegido, setElegido] = useState<string | null>(null)
  const capOk = capitulo === item.capitulo
  const terminado = elegido !== null
  const capBueno = item.capitulos.find((c) => c.numero === item.capitulo)

  function elegirCapitulo(n: string) {
    if (capitulo !== null) return
    setCapitulo(n)
  }

  function elegirItem(codigo: string) {
    if (terminado) return
    setElegido(codigo)
    onResultado?.(sumarPartes(calificarBusqueda(item, capitulo, codigo)))
  }

  function reiniciar() {
    setCapitulo(null)
    setElegido(null)
  }

  const partes = terminado ? calificarBusqueda(item, capitulo, elegido) : []

  return (
    <TarjetaEjercicio rotulo="Busca el ítem" titulo="¿Dónde lo buscas en la MEL?" fuente={item.fuente}>
      <FichaCaso rotulo="Síntoma" lineas={[item.sintoma]} />

      <div role="group" aria-label="Índice de la MEL" className="min-w-0 overflow-hidden rounded-xl border" style={{ borderColor: borde("var(--foreground)", 22) }}>
        <div className="flex items-center gap-1.5 border-b px-3 py-2 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground" style={{ borderColor: "var(--border)", fontFamily: MONO }}>
          <span>MEL</span>
          {capitulo !== null && capBueno && (
            <>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span style={{ color: accentText(ACENTO) }}>
                {capBueno.numero} {capBueno.titulo}
              </span>
            </>
          )}
        </div>

        {capitulo === null ? (
          <ul className="m-0 list-none p-0" aria-label="Capítulos ATA">
            {item.capitulos.map((c) => (
              <Fila key={c.numero} codigo={`ATA ${c.numero}`} titulo={c.titulo} estado="neutra" deshabilitada={false} onClick={() => elegirCapitulo(c.numero)} />
            ))}
          </ul>
        ) : (
          <ul className="m-0 list-none p-0" aria-label={`Ítems del capítulo ${item.capitulo}`}>
            {item.items.map((it) => {
              const estado: Estado = !terminado ? "neutra" : it.codigo === item.item ? "correcta" : it.codigo === elegido ? "error" : "neutra"
              return <Fila key={it.codigo} codigo={it.codigo} titulo={it.titulo} estado={estado} deshabilitada={terminado} onClick={() => elegirItem(it.codigo)} />
            })}
          </ul>
        )}
      </div>

      <Anuncio>
        {capitulo !== null && !terminado && (
          <Veredicto
            ok={capOk}
            texto={capOk ? `Capítulo correcto: ATA ${item.capitulo}. Ahora el ítem.` : `No es ese capítulo: está en ATA ${item.capitulo}. Ahora el ítem.`}
          />
        )}
        {terminado && (
          <div className="grid gap-3">
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <Veredicto ok={partes[0].ok} texto={partes[0].ok ? "Capítulo correcto" : "Capítulo equivocado"} />
              <Veredicto ok={partes[1].ok} texto={partes[1].ok ? "Ítem correcto" : `Ítem equivocado: es ${item.item}`} />
            </div>
            <Explicacion>{item.explicacion}</Explicacion>
            {!modoExamen && <BotonReintentar onClick={reiniciar} />}
          </div>
        )}
      </Anuncio>
    </TarjetaEjercicio>
  )
}
