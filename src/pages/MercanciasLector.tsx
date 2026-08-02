import { useState } from "react"
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
  const [paso, setPaso] = useState(0)

  // Práctica de clasificación (09)
  const [caso, setCaso] = useState(0)
  const [resp, setResp] = useState<Record<string, RespuestaCaso>>({})
  const [hechos, setHechos] = useState<Record<string, boolean>>({})

  // Chequeo final (10)
  const [quiz, setQuiz] = useState<Record<string, number>>({})
  const [calificado, setCalificado] = useState(false)

  function irASeccion(n: string): void {
    const i = MP_SECCIONES.findIndex((s) => s.n === n)
    if (i >= 0) setPaso(i)
  }

  return (
    <ModuloShell
      titulo={MP_TITULO}
      fuentes={MP_FUENTES}
      vigencia={MP_VIGENCIA}
      secciones={MP_SECCIONES}
      actual={paso}
      onIr={setPaso}
      salirA={MP_HUB}
    >
      {paso === 9 ? (
        <Seccion09
          caso={caso}
          onCaso={setCaso}
          resp={resp}
          onResp={(id, r) => setResp((p) => ({ ...p, [id]: r }))}
          hechos={hechos}
          onHecho={(id) => setHechos((p) => ({ ...p, [id]: true }))}
        />
      ) : paso === 10 ? (
        <Seccion10
          quiz={quiz}
          onQuiz={(id, i) => setQuiz((p) => ({ ...p, [id]: i }))}
          calificado={calificado}
          onCalificar={() => setCalificado(true)}
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
