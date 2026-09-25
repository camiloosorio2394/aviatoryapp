import type { EjercicioMel as DatosEjercicio } from "@/lib/melPractica"
import { BuscaElItem } from "./BuscaElItem"
import { CalculaElPlazo } from "./CalculaElPlazo"
import { Combinados } from "./Combinados"
import { ImpactoOperacional } from "./ImpactoOperacional"
import { LeeLaEntrada } from "./LeeLaEntrada"
import { PodemosSalir } from "./PodemosSalir"
import type { PropsEjercicio } from "./tipos"

/** Pinta cualquier ejercicio de MEL según su `tipo`. */
export function EjercicioMel(props: PropsEjercicio<DatosEjercicio>) {
  const { item, ...resto } = props
  switch (item.tipo) {
    case "leeLaEntrada":
      return <LeeLaEntrada item={item} {...resto} />
    case "podemosSalir":
      return <PodemosSalir item={item} {...resto} />
    case "calculaElPlazo":
      return <CalculaElPlazo item={item} {...resto} />
    case "combinados":
      return <Combinados item={item} {...resto} />
    case "buscaElItem":
      return <BuscaElItem item={item} {...resto} />
    case "impactoOperacional":
      return <ImpactoOperacional item={item} {...resto} />
  }
}
