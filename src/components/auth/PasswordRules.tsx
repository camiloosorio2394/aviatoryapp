import { Check } from "lucide-react"

/**
 * Las reglas de una contraseña válida, marcándose a medida que se cumplen.
 *
 * Vive aquí y no dentro de `Login` porque ahora hay dos sitios donde se elige
 * contraseña —al crear la cuenta y al recuperarla— y las dos tienen que pedir
 * lo mismo. Con una copia en cada pantalla, el día que se endurezca la regla en
 * una, la otra seguiría aceptando la contraseña vieja sin que nadie lo note.
 */
export function PasswordRules({ length, digit }: { length: boolean; digit: boolean }) {
  return (
    <ul className="space-y-1 mt-1 text-[12px]">
      <Rule met={length} text="Al menos 8 caracteres" />
      <Rule met={digit} text="Incluye un número" />
    </ul>
  )
}

/** Si una contraseña cumple lo que se le pide. La comprobación, en un sitio. */
export function comprobarClave(clave: string) {
  return { length: clave.length >= 8, digit: /\d/.test(clave) }
}

export function claveValida(clave: string) {
  const { length, digit } = comprobarClave(clave)
  return length && digit
}

function Rule({ met, text }: { met: boolean; text: string }) {
  return (
    <li
      className={`flex items-center gap-1.5 transition-colors ${
        met ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
      }`}
    >
      {met ? (
        <Check className="h-3 w-3" />
      ) : (
        <span className="h-3 w-3 inline-flex items-center justify-center">
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
        </span>
      )}
      {text}
    </li>
  )
}
