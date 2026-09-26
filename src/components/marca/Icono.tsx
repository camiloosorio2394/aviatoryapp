import { ICONOS, type NombreIcono } from "@/components/marca/iconos"
import { ICONOS_PANEL, type NombreIconoPanel } from "@/components/marca/iconosPanel"

/**
 * Un ícono de la hoja de Camilo. Es decorativo: el nombre de la opción o de la
 * tarjeta ya va escrito al lado.
 *
 * En modo oscuro va sobre una placa clara (`.icono-marca` en index.css): son
 * navy y dorado, y el navy sobre el navy del rail desaparece.
 */
export function IconoMarca({ nombre, className = "" }: { nombre: NombreIcono; className?: string }) {
  return (
    <img
      src={ICONOS[nombre]}
      alt=""
      aria-hidden
      draggable={false}
      decoding="async"
      className={`icono-marca select-none object-contain ${className}`}
    />
  )
}

/** El ícono en su tarjeta clara, como en la hoja (las secciones de Logros). */
export function PlacaIcono({ nombre, className = "" }: { nombre: NombreIcono; className?: string }) {
  return (
    <span className={`placa-icono grid shrink-0 place-items-center rounded-[14px] ${className}`}>
      <IconoMarca nombre={nombre} className="h-[82%] w-[82%]" />
    </span>
  )
}

/**
 * Un ícono de la portada del panel (la serie «premium» de Camilo): un objeto
 * fotográfico sobre su propia placa, así que no lleva `PlacaIcono`.
 */
export function IconoPanel({ nombre, className = "" }: { nombre: NombreIconoPanel; className?: string }) {
  return (
    <img
      src={ICONOS_PANEL[nombre]}
      alt=""
      aria-hidden
      draggable={false}
      decoding="async"
      className={`icono-panel shrink-0 select-none rounded-[22%] object-cover ${className}`}
    />
  )
}
