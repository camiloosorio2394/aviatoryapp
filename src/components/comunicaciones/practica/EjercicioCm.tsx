import type { EjercicioSimple } from "@/lib/comunicacionesPractica"
import { CopiaAutorizacion } from "./CopiaAutorizacion"
import { Desarmala } from "./Desarmala"
import { EsParaMi } from "./EsParaMi"
import { EstandarOPlain } from "./EstandarOPlain"
import { Hearback } from "./Hearback"
import { PanelCabina } from "./PanelCabina"
import { QueRespondes } from "./QueRespondes"
import { RafagaNumeros } from "./RafagaNumeros"
import { ReadbackVoz } from "./ReadbackVoz"
import type { PropsEjercicio } from "./tipos"

/**
 * Pinta cualquier ejercicio simple según su `tipo`. Lo usa el vuelo completo y
 * lo puede usar la página de práctica para no repetir el switch.
 */
export function EjercicioCm(props: PropsEjercicio<EjercicioSimple>) {
  const { item, ...resto } = props
  switch (item.tipo) {
    case "copia":
      return <CopiaAutorizacion item={item} {...resto} />
    case "readback":
      return <ReadbackVoz item={item} {...resto} />
    case "esParaMi":
      return <EsParaMi item={item} {...resto} />
    case "hearback":
      return <Hearback item={item} {...resto} />
    case "queRespondes":
      return <QueRespondes item={item} {...resto} />
    case "desarmala":
      return <Desarmala item={item} {...resto} />
    case "panel":
      return <PanelCabina item={item} {...resto} />
    case "rafaga":
      return <RafagaNumeros item={item} {...resto} />
    case "estandarOPlain":
      return <EstandarOPlain item={item} {...resto} />
  }
}
