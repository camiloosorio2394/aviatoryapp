import { Link } from "react-router-dom"
import { PracticaQuiz } from "@/components/modulo/PracticaQuiz"
import { CB_APRENDE, CB_CAPITULO_ESCENARIOS, CB_HUB, CB_TITULO } from "@/lib/combustible"
import { CB_PRACTICA } from "@/lib/combustiblePractica"
import {
  fetchCombustibleProgress,
  markCombustibleProgress,
  pushPendingCombustible,
  readCombustibleLocal,
} from "@/lib/combustibleProgress"

/**
 * Práctica de Gestión del combustible (ruta /app/aerolinea/combustible/practica).
 *
 * Las 66 preguntas del quiz de cada capítulo, con corrección inmediata, la
 * explicación y la norma que respalda cada respuesta. Los diez escenarios
 * prácticos no están aquí: son situaciones para pensar sin opciones y viven en
 * el capítulo 23, donde también cuentan como práctica.
 */

async function hidratar(uid: string): Promise<string[] | null> {
  const traido = await fetchCombustibleProgress(uid)
  if (!traido) return null
  const remoto = await pushPendingCombustible(traido)
  return remoto.practiceDone
}

function marcar(clave: string): Promise<void> {
  return markCombustibleProgress({ practiceId: clave })
}

export function CombustiblePractice() {
  return (
    <PracticaQuiz
      titulo={CB_TITULO}
      hub={CB_HUB}
      aprende={CB_APRENDE}
      acento="var(--av-cb-700)"
      rotulo="Combustible · Práctica"
      heroTitulo="Planificar, vigilar y decidir"
      heroTexto="Tres preguntas por capítulo, casi todas de situación: componentes, reserva final, fuel check, combustible mínimo y MAYDAY. Cada respuesta trae su explicación y la norma que la respalda."
      unidad={{ singular: "capítulo", plural: "capítulos", articulo: "el" }}
      grupos={CB_PRACTICA}
      actividad="combustible-practica"
      leerHechas={() => readCombustibleLocal().practiceDone}
      hidratar={hidratar}
      marcar={marcar}
      nota={
        <>
          Los diez escenarios prácticos están en el{" "}
          <Link to={`${CB_APRENDE}?l=${CB_CAPITULO_ESCENARIOS}`} className="font-medium text-foreground underline">
            capítulo {CB_CAPITULO_ESCENARIOS}
          </Link>
          : se piensan sin opciones y cuentan como práctica al abrir su análisis.
        </>
      }
    />
  )
}
