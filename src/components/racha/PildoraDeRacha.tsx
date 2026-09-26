import { useEffect, useState } from "react"
import { Llama } from "./Llama"
import { NOMBRE_DEL_NIVEL, nivelDeRacha } from "./nivelDeRacha"

/**
 * La píldora de la racha de la barra superior, según la lámina de Camilo del
 * 26 de septiembre de 2026.
 *
 * Al montarse se abre desde el ícono: aparece el contorno, salta la chispa,
 * crece la llama y entra el texto (unos 850 ms, todo en CSS). Después la
 * llama queda viva: respira, se inclina y de vez en cuando suelta una brasa.
 * Cuántas brasas, qué color y qué tamaño tiene la llama lo decide el nivel
 * (`data-nivel`, ver nivelDeRacha.ts).
 *
 * Celebra cuando la racha subió desde la última vez que este navegador la
 * vio: la píldora late un segundo y, si además es la más larga que ha
 * tenido, avisa «¡Nueva mejor racha!». Lo que vio la última vez queda en
 * localStorage, porque la página que publica la racha se desmonta al
 * navegar y la píldora con ella: sin memoria no habría con qué comparar.
 */
const CLAVE_VISTA = "aviatory.racha.vista"
/** Lo que dura la entrada; la celebración espera a que termine. */
const ENTRADA_MS = 850
const CELEBRACION_MS = 1000
const AVISO_MS = 3200
/** Con uno o dos días todavía no hay récord que anunciar. */
const MINIMO_PARA_RECORD = 3

interface Vista {
  dias: number
  masLarga: number
}

function leerVista(): Vista | null {
  try {
    const crudo = localStorage.getItem(CLAVE_VISTA)
    if (!crudo) return null
    const v = JSON.parse(crudo) as Partial<Vista>
    if (typeof v.dias !== "number" || typeof v.masLarga !== "number") return null
    return { dias: v.dias, masLarga: v.masLarga }
  } catch {
    return null
  }
}

function guardarVista(vista: Vista) {
  try {
    localStorage.setItem(CLAVE_VISTA, JSON.stringify(vista))
  } catch {
    // Sin almacenamiento no hay celebración la próxima vez; nada más.
  }
}

export function PildoraDeRacha({
  dias,
  masLarga,
  className,
}: {
  dias: number
  /** La racha más larga que ha tenido; sin ella no se anuncia récord. */
  masLarga?: number
  className?: string
}) {
  const nivel = nivelDeRacha(dias)
  const unidad = dias === 1 ? "día" : "días"
  // Se lee una sola vez, al montar: contra esto se compara cada cambio.
  const [previa] = useState(leerVista)
  const [celebrando, setCelebrando] = useState(false)
  const [record, setRecord] = useState(false)

  useEffect(() => {
    const mejor = Math.max(masLarga ?? 0, dias)
    guardarVista({ dias, masLarga: mejor })
    if (!previa || dias <= previa.dias) return
    const esRecord = dias >= MINIMO_PARA_RECORD && mejor > previa.masLarga
    const temporizadores = [
      setTimeout(() => {
        setCelebrando(true)
        setRecord(esRecord)
      }, ENTRADA_MS),
      setTimeout(() => setCelebrando(false), ENTRADA_MS + CELEBRACION_MS),
      setTimeout(() => setRecord(false), ENTRADA_MS + AVISO_MS),
    ]
    return () => temporizadores.forEach(clearTimeout)
  }, [dias, masLarga, previa])

  return (
    <div className={`racha${celebrando ? " is-celebrando" : ""}${className ? ` ${className}` : ""}`}>
      <div
        className="racha-pildora tabular"
        data-nivel={nivel}
        role="img"
        aria-label={`Racha de ${dias} ${unidad}`}
        title={NOMBRE_DEL_NIVEL[nivel]}
      >
        <Llama className="racha-llama" />
        <span className="racha-cifra">
          {dias}
          {/* En móvil la píldora se comprime a llama y número. */}
          <span className="hidden sm:inline">&nbsp;{unidad}</span>
        </span>
      </div>
      {record && (
        <span className="racha-aviso" role="status">
          ¡Nueva mejor racha!
        </span>
      )}
    </div>
  )
}
