import { PracticaQuiz } from "@/components/modulo/PracticaQuiz"
import { RVSM_APRENDE, RVSM_HUB, RVSM_TITULO } from "@/lib/rvsm"
import { RV_PRACTICA } from "@/lib/rvsmPractica"
import { fetchRvsmProgress, markRvsmProgress, pushPendingRvsm, readRvsmLocal } from "@/lib/rvsmProgress"

/**
 * Práctica del módulo RVSM (ruta /app/aerolinea/rvsm/practica).
 *
 * Las 96 preguntas del quiz de cada capítulo, con corrección inmediata, la
 * explicación y la referencia que respalda cada respuesta. Son distintas de
 * las de la evaluación final, que vive en el servidor.
 */

/** Lo hecho en la base unido con lo local; se sube lo que se hizo sin sesión. */
async function hidratar(uid: string): Promise<string[] | null> {
  const traido = await fetchRvsmProgress(uid)
  if (!traido) return null
  const remoto = await pushPendingRvsm(traido)
  return remoto.practiceDone
}

function marcar(clave: string): Promise<void> {
  return markRvsmProgress({ practiceId: clave })
}

export function RvsmPractice() {
  return (
    <PracticaQuiz
      titulo={RVSM_TITULO}
      hub={RVSM_HUB}
      aprende={RVSM_APRENDE}
      acento="var(--av-rv-700)"
      rotulo="RVSM · Práctica"
      heroTitulo="Lo que te preguntan de cada capítulo"
      heroTexto="Preguntas de situación sobre los treinta y dos capítulos: equipo, chequeos altimétricos, fraseología, contingencias y lo que cuesta perder la capacidad. Cada respuesta trae su explicación y la fuente que la respalda."
      unidad={{ singular: "capítulo", plural: "capítulos", articulo: "el" }}
      grupos={RV_PRACTICA}
      actividad="rvsm-practica"
      leerHechas={() => readRvsmLocal().practiceDone}
      hidratar={hidratar}
      marcar={marcar}
    />
  )
}
