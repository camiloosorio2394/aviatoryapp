import {
  AlertTriangle,
  BookOpen,
  Briefcase,
  CloudSun,
  FileText,
  Library as LibraryIcon,
  Radio,
} from "lucide-react"

/**
 * El icono de una categoría de la Biblioteca.
 *
 * Es un componente y no una función que devuelve el componente a propósito: si
 * el que llama hace `const Icono = buscar(nombre)` y lo renderiza, está creando
 * un componente durante el render, y React lo remonta entero en cada pasada.
 *
 * La base guarda el nombre del icono; si llega uno que no está en el mapa cae
 * en el genérico en vez de romper la pantalla.
 */
const ICONOS: Record<string, typeof LibraryIcon> = {
  BookOpen,
  Radio,
  FileText,
  CloudSun,
  AlertTriangle,
  Briefcase,
  Library: LibraryIcon,
}

export function IconoCategoria({
  nombre,
  className,
}: {
  nombre: string | null
  className?: string
}) {
  const Icono = (nombre && ICONOS[nombre]) || LibraryIcon
  return <Icono className={className} />
}
