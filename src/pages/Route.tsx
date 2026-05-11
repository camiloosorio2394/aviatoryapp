import { Map, Sparkles } from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"

export function Route() {
  return (
    <AppLayout>
      <div className="px-4 sm:px-6 lg:px-10 py-8 max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Mi ruta de carrera</h1>
          <p className="mt-2 text-muted-foreground">
            Tu plan de estudio personalizado, hito por hito, hasta la cabina.
          </p>
        </header>

        <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-50 via-blue-50/40 to-transparent dark:from-blue-950/40 p-12 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl shadow-blue-500/30 mb-6">
            <Map className="h-8 w-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Próximamente</h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto leading-relaxed">
            Estamos terminando el motor que genera tu checklist personalizada por etapa
            (PPL → CPL → IFR → hour building → aerolínea), con vencimientos, hitos y
            recordatorios.
          </p>
          <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 dark:text-blue-300">
            <Sparkles className="h-3.5 w-3.5" />
            Disponible para usuarios Pro en las próximas semanas
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
