import { useEffect, useState } from "react"
import { ModuloShell } from "@/components/modulo/ModuloShell"
import { Seccion00 } from "@/components/modulo/mercancias/Seccion00"
import { Seccion01 } from "@/components/modulo/mercancias/Seccion01"
import { Seccion02 } from "@/components/modulo/mercancias/Seccion02"
import { Seccion03 } from "@/components/modulo/mercancias/Seccion03"
import { Seccion04 } from "@/components/modulo/mercancias/Seccion04"
import { Seccion05 } from "@/components/modulo/mercancias/Seccion05"
import { Seccion06 } from "@/components/modulo/mercancias/Seccion06"
import { Seccion07 } from "@/components/modulo/mercancias/Seccion07"
import { Seccion08 } from "@/components/modulo/mercancias/Seccion08"
import { Seccion09, type RespuestaCaso } from "@/components/modulo/mercancias/Seccion09"
import { Seccion10 } from "@/components/modulo/mercancias/Seccion10"
import {
  MP_FUENTES,
  MP_HUB,
  MP_SECCIONES,
  MP_TITULO,
  MP_VIGENCIA,
} from "@/lib/mercancias"
import { PREGUNTAS } from "@/lib/mercanciasPractica"
import {
  fetchMercanciasProgress,
  guardarChequeoMercancias,
  markMercanciasProgress,
  pushPendingMercancias,
  readMercanciasLocal,
} from "@/lib/mercanciasProgress"
import { registrarActividadDeEstudio, registrarEstudioDiario } from "@/lib/activity"
import { useSession } from "@/hooks/useSession"

/**
 * Lector del módulo Mercancías Peligrosas.
 *
 * Ruta: /app/aerolinea/mercancias/leccion
 *
 * Sale del layout de la app a propósito: mientras se estudia no hay rail ni
 * cabecera, solo el módulo. El cascarón, la barra y el índice son genéricos
 * (components/modulo) y los reusará cualquier módulo que venga.
 *
 * El paso vive en el estado, no en la URL: el lector es un flujo, no once
 * páginas. El botón de salir devuelve al hub del tema.
 *
 * Lo respondido en la práctica y en el chequeo también vive aquí, y no dentro
 * de cada sección: así se puede salir a releer una sección y volver sin perder
 * lo que llevabas, que es justo lo que invita a hacer el chequeo cuando dice de
 * qué sección sale cada pregunta.
 */
export function MercanciasLector() {
  const { user } = useSession()
  const [paso, setPaso] = useState(0)
  // La 00 entra ya marcada: el lector abre en ella, así que abrirlo es verla.
  const [leidas, setLeidas] = useState<number[]>(() =>
    Array.from(new Set([...readMercanciasLocal().lessonScreens, 0]))
  )

  // Práctica de clasificación (09)
  const [caso, setCaso] = useState(0)
  const [resp, setResp] = useState<Record<string, RespuestaCaso>>({})
  const [hechos, setHechos] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(readMercanciasLocal().practiceDone.map((id) => [id, true]))
  )

  // Chequeo final (10)
  const [quiz, setQuiz] = useState<Record<string, number>>({})
  const [calificado, setCalificado] = useState(false)

  // Hidrata desde la base y sube lo que se avanzó sin sesión. Arranca con el
  // respaldo local para no mostrar cero mientras carga.
  useEffect(() => {
    const uid = user?.id
    if (!uid) return
    let cancelado = false

    void (async () => {
      const traido = await fetchMercanciasProgress(uid)
      if (cancelado || !traido) return
      const remoto = await pushPendingMercancias(traido)
      if (cancelado) return
      setLeidas((prev) => Array.from(new Set([...prev, ...remoto.lessonScreens])))
      setHechos((prev) => ({
        ...prev,
        ...Object.fromEntries(remoto.practiceDone.map((id) => [id, true])),
      }))
    })()

    return () => {
      cancelado = true
    }
  }, [user?.id])

  // La 00 se persiste al abrir el lector, sin tocar el estado: ya entró marcada.
  useEffect(() => {
    void markMercanciasProgress({ lessonScreen: 0 })
    void registrarEstudioDiario("mercancias-leccion")
  }, [])

  /**
   * Ir a una sección, y darla por leída si es de lectura.
   *
   * En un lector la sección se abre para leerla: no hay un botón de "ya la leí"
   * ni lo va a haber, así que abrirla ES el acto. Lo que no se infla es la
   * actividad de estudio: `registrarEstudioDiario` tiene tope de una vez al día
   * por superficie, así que leer nueve secciones cuenta como un día, no nueve.
   */
  function irA(i: number): void {
    setPaso(i)
    const seccion = MP_SECCIONES[i]
    if (!seccion || seccion.grupo === "practica" || leidas.includes(i)) return
    setLeidas((prev) => (prev.includes(i) ? prev : [...prev, i]))
    void markMercanciasProgress({ lessonScreen: i })
    void registrarEstudioDiario("mercancias-leccion")
  }

  function irASeccion(n: string): void {
    const i = MP_SECCIONES.findIndex((s) => s.n === n)
    if (i >= 0) irA(i)
  }

  function resolverCaso(id: string): void {
    setHechos((p) => ({ ...p, [id]: true }))
    void markMercanciasProgress({ practiceId: id })
    void registrarEstudioDiario("mercancias-practica")
  }

  function calificarChequeo(): void {
    setCalificado(true)
    const aciertos = PREGUNTAS.filter((p) => quiz[p.id] === p.ok).length
    const total = PREGUNTAS.length
    const score = Math.round((aciertos / total) * 100)
    void guardarChequeoMercancias({ score, correct: aciertos, total })
    void registrarActividadDeEstudio({ questions: total, correct: aciertos })
  }

  return (
    <ModuloShell
      titulo={MP_TITULO}
      fuentes={MP_FUENTES}
      vigencia={MP_VIGENCIA}
      secciones={MP_SECCIONES}
      actual={paso}
      onIr={irA}
      hechas={leidas}
      salirA={MP_HUB}
    >
      {paso === 9 ? (
        <Seccion09
          caso={caso}
          onCaso={setCaso}
          resp={resp}
          onResp={(id, r) => setResp((p) => ({ ...p, [id]: r }))}
          hechos={hechos}
          onHecho={resolverCaso}
        />
      ) : paso === 10 ? (
        <Seccion10
          quiz={quiz}
          onQuiz={(id, i) => setQuiz((p) => ({ ...p, [id]: i }))}
          calificado={calificado}
          onCalificar={calificarChequeo}
          onReiniciar={() => {
            setQuiz({})
            setCalificado(false)
          }}
          onIrASeccion={irASeccion}
        />
      ) : (
        <Lectura paso={paso} />
      )}
    </ModuloShell>
  )
}

/** Las secciones de lectura, por número de paso. */
const LECTURA = [
  Seccion00,
  Seccion01,
  Seccion02,
  Seccion03,
  Seccion04,
  Seccion05,
  Seccion06,
  Seccion07,
  Seccion08,
]

function Lectura({ paso }: { paso: number }) {
  const Seccion = LECTURA[paso]
  return <Seccion />
}
