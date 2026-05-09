import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function Landing() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Aviatory</h1>
        <p className="text-xl text-muted-foreground">
          De estudiante piloto a candidato de aerolínea. Exámenes PPL/CPL, inglés ICAO,
          tutor IA y comunidad — todo en un solo lugar.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/login">Empezar gratis</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/login">Ya tengo cuenta</Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">7 días de prueba. Sin tarjeta.</p>
      </div>
    </main>
  )
}
