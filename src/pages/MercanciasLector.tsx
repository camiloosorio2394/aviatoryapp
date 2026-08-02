import { useState } from "react"
import { ModuloShell } from "@/components/modulo/ModuloShell"
import { Seccion00 } from "@/components/modulo/mercancias/Seccion00"
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

function Contenido({ paso }: { paso: number }) {
  if (paso === 0) return <Seccion00 />

  const seccion = MP_SECCIONES[paso]
  return (
    <>
      <Titular n={seccion.n}>{seccion.titulo}</Titular>
      <Aviso tono="info" titulo="Esta sección todavía no está escrita">
        El cascarón del módulo ya está montado y esta sección entra en la siguiente tanda. No hay
        contenido que leer aquí todavía: no es un error de carga.
      </Aviso>
    </>
  )
}
