import { createContext, useContext } from "react"

/**
 * Cómo un bloque de la lección avisa de que se hizo un ejercicio.
 *
 * Existe porque Performance lleva su práctica DENTRO de la lección: los
 * dieciocho ejercicios de número están en el tema 40 y los diez escenarios en
 * el 38, junto al concepto que ponen a prueba. Los demás módulos tienen
 * pantalla de práctica aparte y allí cada ejercicio ya sabe marcarse solo.
 *
 * Va por contexto y no por prop porque entre el lector y el bloque hay tres
 * capas de `DocBlock` que no tienen por qué saber de progreso: un `bloques[]`
 * de detalle técnico puede contener otro detalle técnico.
 *
 * Por defecto no hace nada. Un bloque sin `clave` no llama, y un módulo que no
 * pone proveedor se comporta exactamente como antes.
 */
export const PracticaContexto = createContext<(clave: string) => void>(() => {})

export function useMarcarPractica(): (clave: string) => void {
  return useContext(PracticaContexto)
}
