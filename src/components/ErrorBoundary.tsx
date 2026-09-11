import { Component, type ErrorInfo, type ReactNode } from "react"
import { reportarError } from "@/lib/errores"

/**
 * La red debajo de toda la aplicación.
 *
 * React desmonta el árbol entero cuando un render lanza, así que sin esto
 * cualquier fallo —un `undefined` en una pantalla, un módulo que no cargó—
 * deja al piloto mirando una página en blanco, sin un botón, sin un mensaje y
 * sin manera de saber si el problema es suyo o nuestro.
 *
 * Dos decisiones que parecen detalles y no lo son:
 *
 * — **El error se reporta.** Queda en la consola y en la base (`reportarError`),
 *   con el árbol de componentes. Tragárselo para que la pantalla quede bonita es
 *   peor que el fallo: sin traza no hay diagnóstico.
 * — **Recargar es un `location.reload`, no un `setState`.** Volver a montar el
 *   mismo árbol con el mismo estado roto reproduce el mismo error al instante.
 *   Y como la aplicación es una PWA con service worker, se ofrece además
 *   volver al inicio, que es la salida cuando lo que quedó mal es la ruta.
 *
 * Va sin traducir a componente de función a propósito: capturar errores de
 * render sigue siendo cosa de `componentDidCatch`, que no tiene equivalente en
 * hooks ni en React 19.
 */

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    reportarError("pantalla caída", error, info.componentStack ?? undefined)
  }

  render() {
    const { error } = this.state
    if (!error) return this.props.children

    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <p className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
            Algo se rompió
          </p>
          <h1 className="mt-2 text-[32px] font-semibold leading-tight tracking-tight text-balance">
            Esta pantalla no se pudo abrir
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            No es cosa tuya: falló algo de nuestro lado al dibujar la página. Tu avance está
            guardado, no se perdió nada.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-apple inline-flex h-12 items-center gap-2 rounded-full border-0 px-6 text-[17px] font-semibold"
            >
              Recargar la página
            </button>
            <a
              href="/app"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-6 text-[17px] font-medium transition-colors hover:bg-muted"
            >
              Ir al panel
            </a>
          </div>

          {/* El detalle técnico, plegado: no se le pone delante a quien solo
              quiere seguir, pero está a un clic para quien va a reportarlo. */}
          <details className="surface mt-8 rounded-xl p-4">
            <summary className="cursor-pointer text-[13px] font-medium text-muted-foreground">
              Detalle técnico
            </summary>
            <pre className="mt-3 max-h-48 overflow-auto whitespace-pre-wrap break-words text-[12px] leading-relaxed text-muted-foreground">
              {error.name}: {error.message}
            </pre>
          </details>
        </div>
      </main>
    )
  }
}
