import { cn } from "@/lib/utils"

/**
 * Estilos del botón del sistema, aparte del componente para que Fast Refresh
 * siga funcionando: un archivo que exporta componentes no debe exportar además
 * constantes o funciones.
 *
 * Se usan directamente cuando el botón no es un <button> sino un <Link> de
 * react-router, que es el caso más común en la app.
 */

export type ButtonVariant = "primary" | "secondary" | "ghost"
export type ButtonSize = "md" | "lg"

const VARIANT: Record<ButtonVariant, string> = {
  primary: "text-white border-transparent hover:brightness-110",
  secondary: "surface text-foreground hover:bg-muted",
  ghost: "border-transparent text-foreground hover:bg-muted",
}

/** 36px para secundarias, 44px para la principal: el mínimo táctil en móvil. */
const SIZE: Record<ButtonSize, string> = {
  md: "h-9 px-4 text-[15px] gap-1.5",
  lg: "h-11 px-5 text-[15px] gap-2",
}

/**
 * `active:scale-[0.97]` no es adorno: un botón que no se hunde al pulsarlo no
 * confirma que la interfaz oyó. 150ms y 0.97 están dentro de lo que se nota sin
 * llamar la atención. `btn-apple` de la landing ya lo hacía; esto lo trae al
 * interior, que es donde el piloto pasa el rato.
 */
const BASE =
  "inline-flex items-center justify-center rounded-lg border font-medium whitespace-nowrap " +
  "transition-[color,background-color,border-color,transform] duration-150 ease-out " +
  "active:scale-[0.97] outline-none focus-visible:ring-2 focus-visible:ring-[var(--av-blue-500)] " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] " +
  "disabled:pointer-events-none disabled:opacity-50"

export function appButtonClass(
  { variant = "primary", size = "md" }: { variant?: ButtonVariant; size?: ButtonSize } = {},
  className?: string,
) {
  return cn(BASE, VARIANT[variant], SIZE[size], className)
}

/** El azul va por style porque es un token de marca, no una clase de Tailwind. */
export function appButtonStyle(variant: ButtonVariant = "primary") {
  return variant === "primary" ? { background: "var(--av-blue-500)" } : undefined
}
