import { PracticaQuiz } from "@/components/modulo/PracticaQuiz"
import { RAC_APRENDE, RAC_HUB, RAC_TITULO } from "@/lib/rac"
import { RAC_PRACTICA } from "@/lib/racPractica"
import { fetchRacProgress, markRacProgress, pushPendingRac, readRacLocal } from "@/lib/racProgress"

/**
 * Práctica del módulo RAC (ruta /app/aerolinea/rac/practica).
 *
 * Las 54 preguntas del quiz de cada unidad, con corrección inmediata, la
 * explicación y el numeral que respalda cada respuesta. Son distintas de las
 * de la evaluación final, que vive en el servidor.
 */

/** Lo hecho en la base unido con lo local; se sube lo que se hizo sin sesión. */
async function hidratar(uid: string): Promise<string[] | null> {
  const traido = await fetchRacProgress(uid)
  if (!traido) return null
  const remoto = await pushPendingRac(traido)
  return remoto.practiceDone
}

function marcar(clave: string): Promise<void> {
  return markRacProgress({ practiceId: clave })
}

export function RacPractice() {
  return (
    <PracticaQuiz
      titulo={RAC_TITULO}
      hub={RAC_HUB}
      aprende={RAC_APRENDE}
      acento="var(--av-rac-700)"
      rotulo="RAC · Práctica"
      heroTitulo="Lo que te preguntan de cada reglamento"
      heroTexto="Preguntas de situación sobre las diecinueve unidades: licencia, médico, reglas de vuelo, aerolínea y sanciones. Cada respuesta trae su explicación y el numeral de la norma que la respalda."
      unidad={{ singular: "unidad", plural: "unidades", articulo: "la" }}
      grupos={RAC_PRACTICA}
      actividad="rac-practica"
      leerHechas={() => readRacLocal().practiceDone}
      hidratar={hidratar}
      marcar={marcar}
    />
  )
}
