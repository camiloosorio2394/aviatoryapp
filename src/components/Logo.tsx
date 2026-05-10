import type { ImgHTMLAttributes } from "react"
import logoHorizontalSrc from "@/assets/logos/aviatory-logo-horizontal.svg"
import isotypeColorSrc from "@/assets/logos/aviatory-isotype-app-icon.svg"
import isotypeMonoSrc from "@/assets/logos/aviatory-isotype-mono.svg"

type ImgProps = ImgHTMLAttributes<HTMLImageElement>

export function LogoHorizontal({ alt = "Aviatory", ...props }: ImgProps) {
  return <img src={logoHorizontalSrc} alt={alt} {...props} />
}

interface LogoIsotypeProps extends Omit<ImgProps, "src"> {
  variant?: "color" | "mono"
}

export function LogoIsotype({
  variant = "color",
  alt = "Aviatory",
  ...props
}: LogoIsotypeProps) {
  const src = variant === "mono" ? isotypeMonoSrc : isotypeColorSrc
  return <img src={src} alt={alt} {...props} />
}
