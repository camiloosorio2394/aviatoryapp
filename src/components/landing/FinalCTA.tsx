import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LogoIsotype } from "@/components/Logo"

export function FinalCTA() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 px-8 py-20 sm:px-16 sm:py-28 text-center shadow-2xl shadow-blue-900/30">
          {/* Decorative glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-1/2 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-blue-300/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl"
          />

          <div className="relative">
            <LogoIsotype variant="color" className="h-16 w-16 mx-auto rounded-2xl shadow-xl" />

            <h2 className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance">
              Tu próximo vuelo
              <br />
              empieza con un click.
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto text-balance">
              7 días gratis. Sin tarjeta. Cancelás cuando quieras.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full text-base px-8 h-12 bg-white text-blue-700 hover:bg-blue-50"
              >
                <Link to="/login?mode=signup">
                  Empezar mi prueba gratis
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="rounded-full text-base px-6 h-12 text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/pricing">Ver planes</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
