import { Link } from "react-router-dom"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { Button } from "@/components/ui/button"

/**
 * La ruta es path="*", así que acá también cae un usuario logueado que se
 * equivoca en /app/algo. Por eso va con la marca (header y footer de
 * PublicLayout) y con dos salidas: su dashboard y el inicio.
 */
export function NotFound() {
  return (
    <PublicLayout>
      <section className="min-h-[60vh] flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-md">
          <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
            Error 404
          </div>
          <h1 className="mt-2 text-5xl sm:text-6xl font-semibold tracking-tight">
            Esta ruta no está en el plan de vuelo
          </h1>
          <p className="mt-4 text-muted-foreground">
            La página que buscas no existe o cambió de dirección. Sigue desde tu panel o vuelve al
            inicio.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="btn-apple rounded-full h-12 px-6 text-base border-0">
              <Link to="/app">Ir a mi panel</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full h-12 px-6 text-base">
              <Link to="/">Ir al inicio</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
