import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function Dashboard() {
  const navigate = useNavigate()

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error(error.message)
      return
    }
    navigate("/", { replace: true })
  }

  return (
    <main className="min-h-screen p-6 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tu cabina</h1>
            <p className="text-sm text-muted-foreground">
              Bienvenido a Aviatory.
            </p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            Salir
          </Button>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardDescription>Progreso del programa</CardDescription>
              <CardTitle className="text-3xl">35%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                2 de 6 materias en marcha.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Días en racha</CardDescription>
              <CardTitle className="text-3xl">7</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Mantenelo. Mañana se renueva.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Próximo simulacro</CardDescription>
              <CardTitle className="text-2xl">Mañana 10:00</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Meteorología — 30 preguntas.
              </p>
            </CardContent>
          </Card>
        </section>

        <p className="text-xs text-muted-foreground">
          * Datos de muestra. Conectaremos con tu progreso real cuando abramos el
          banco de preguntas.
        </p>
      </div>
    </main>
  )
}
