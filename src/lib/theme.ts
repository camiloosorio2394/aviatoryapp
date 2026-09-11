/**
 * Tema día/noche con persistencia + modo automático (sistema).
 *
 * - Default: "system" → sigue el `prefers-color-scheme` del SO (día/noche auto).
 * - El usuario puede forzar "light" o "dark"; queda persistido en localStorage.
 * - La aplicación inicial (antes del primer paint) la hace un script inline en
 *   index.html para evitar el flash y que NO se pierda al recargar.
 */
import { CLAVE_TEMA } from "@/lib/preferenciasEquipo"

export type ThemePref = "light" | "dark" | "system"

export function getThemePref(): ThemePref {
  try {
    const v = localStorage.getItem(CLAVE_TEMA)
    if (v === "light" || v === "dark" || v === "system") return v
  } catch {
    /* sin almacenamiento (modo privado): se sigue al sistema */
  }
  return "system"
}

export function systemPrefersDark(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
}

export function resolveDark(pref: ThemePref): boolean {
  return pref === "dark" || (pref === "system" && systemPrefersDark())
}

/** Persiste la preferencia y aplica la clase `dark` al <html>. */
export function applyThemePref(pref: ThemePref): void {
  try {
    localStorage.setItem(CLAVE_TEMA, pref)
  } catch {
    /* sin almacenamiento: el tema se aplica igual, solo no se recuerda */
  }
  document.documentElement.classList.toggle("dark", resolveDark(pref))
}

export function isDark(): boolean {
  return document.documentElement.classList.contains("dark")
}

/**
 * Suscribe al cambio de día/noche del SO. Cuando la preferencia es "system",
 * actualiza la clase `dark` en vivo. Devuelve una función de limpieza.
 */
export function watchSystemTheme(onResolve?: (dark: boolean) => void): () => void {
  if (typeof window === "undefined") return () => {}
  const mq = window.matchMedia("(prefers-color-scheme: dark)")
  const handler = () => {
    if (getThemePref() === "system") {
      document.documentElement.classList.toggle("dark", mq.matches)
      onResolve?.(mq.matches)
    }
  }
  mq.addEventListener?.("change", handler)
  return () => mq.removeEventListener?.("change", handler)
}
