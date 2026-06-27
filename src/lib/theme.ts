/**
 * Tema día/noche con persistencia + modo automático (sistema).
 *
 * - Default: "system" → sigue el `prefers-color-scheme` del SO (día/noche auto).
 * - El usuario puede forzar "light" o "dark"; queda persistido en localStorage.
 * - La aplicación inicial (antes del primer paint) la hace un script inline en
 *   index.html para evitar el flash y que NO se pierda al recargar.
 */
export type ThemePref = "light" | "dark" | "system"

const KEY = "aviatory.theme"

export function getThemePref(): ThemePref {
  try {
    const v = localStorage.getItem(KEY)
    if (v === "light" || v === "dark" || v === "system") return v
  } catch { /* noop */ }
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
  try { localStorage.setItem(KEY, pref) } catch { /* noop */ }
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
