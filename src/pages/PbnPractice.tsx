import { PracticaQuiz } from "@/components/modulo/PracticaQuiz"
import { PBN_APRENDE, PBN_HUB, PBN_TITULO } from "@/lib/pbn"
import { PB_PRACTICA } from "@/lib/pbnPractica"
import { fetchPbnProgress, markPbnProgress, pushPendingPbn, readPbnLocal } from "@/lib/pbnProgress"

/**
 * Práctica del módulo PBN (ruta /app/aerolinea/pbn/practica).
 *
 * Las 96 preguntas del quiz de cada capítulo, con corrección inmediata, la
 * explicación y la referencia que respalda cada respuesta. Son distintas de
 * las de la evaluación final, que vive en el servidor.
 */

/** Lo hecho en la base unido con lo local; se sube lo que se hizo sin sesión. */
async function hidratar(uid: string): Promise<string[] | null> {
  const traido = await fetchPbnProgress(uid)
  if (!traido) return null
  const remoto = await pushPendingPbn(traido)
  return remoto.practiceDone
}

function marcar(clave: string): Promise<void> {
  return markPbnProgress({ practiceId: clave })
}

export function PbnPractice() {
  return (
    <PracticaQuiz
      titulo={PBN_TITULO}
      hub={PBN_HUB}
      aprende={PBN_APRENDE}
      acento="var(--av-pbn-700)"
      rotulo="PBN · Práctica"
      heroTitulo="Lo que te preguntan de cada capítulo"
      heroTexto="Preguntas de situación sobre los treinta y dos capítulos: equipo, chequeos altimétricos, fraseología, contingencias y lo que cuesta perder la capacidad. Cada respuesta trae su explicación y la fuente que la respalda."
      unidad={{ singular: "capítulo", plural: "capítulos", articulo: "el" }}
      grupos={PB_PRACTICA}
      actividad="pbn-practica"
      leerHechas={() => readPbnLocal().practiceDone}
      hidratar={hidratar}
      marcar={marcar}
    />
  )
}
