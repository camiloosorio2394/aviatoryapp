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
import { Aviso, Titular } from "@/components/modulo/piezas"
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
 * El paso vive en el estado, no en la URL: el diseño lo tiene así y el lector
 * es un flujo, no once páginas. El botón de salir devuelve al hub del tema.
 */
export function MercanciasLector() {
  const [paso, setPaso] = useState(0)

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
      <Contenido paso={paso} />
    </ModuloShell>
  )
}

/** Las secciones escritas, por número de paso. */
const SECCIONES = [
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

function Contenido({ paso }: { paso: number }) {
  const Seccion = SECCIONES[paso]
  if (Seccion) return <Seccion />

  const seccion = MP_SECCIONES[paso]
  return (
    <>
      <Titular n={seccion.n}>{seccion.titulo}</Titular>
      <Aviso tono="info" titulo="Esta parte todavía no está montada">
        La lectura del módulo ya está completa; la práctica y el chequeo entran en la siguiente
        tanda. No hay nada que resolver aquí todavía: no es un error de carga.
      </Aviso>
    </>
  )
}
