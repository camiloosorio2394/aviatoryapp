import type { ComponentProps } from "react"
import {
  appButtonClass,
  appButtonStyle,
  type ButtonSize,
  type ButtonVariant,
} from "@/lib/buttonStyles"

/**
 * Botón del sistema de Aviatory: tres variantes y dos tamaños.
 *
 * No reemplaza al Button de shadcn, que se regenera con `npx shadcn add` y
 * cuyas alturas van de 24 a 36px, pensadas para densidad de escritorio. La app
 * necesita objetivos táctiles: 36px para acciones secundarias y 44px para la
 * principal, que es el mínimo recomendado en móvil.
 *
 * Antes cada botón se armaba con clases sueltas y por eso convivían alturas de
 * 32, 36, 40 y 44px con radios distintos en la misma pantalla.
 *
 * Para un <Link> de react-router usa `appButtonClass()` de lib/buttonStyles.
 */
export function AppButton({
  variant = "primary",
  size = "md",
  className,
  style,
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <button
      className={appButtonClass({ variant, size }, className)}
      style={{ ...appButtonStyle(variant), ...style }}
      {...props}
    />
  )
}
