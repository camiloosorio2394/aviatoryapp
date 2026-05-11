import { Reveal } from "@/components/Reveal"
import { Quote } from "lucide-react"
import { LogoIsotype } from "@/components/Logo"

export function FounderStory() {
  return (
    <section className="relative py-24 sm:py-32 bg-background overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="relative rounded-3xl bg-gradient-to-br from-blue-50 via-card to-blue-100/40 dark:from-blue-950/40 dark:via-card dark:to-blue-950/30 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl shadow-blue-500/10 ring-1 ring-blue-500/10">
            <div
              aria-hidden
              className="absolute -top-12 -right-12 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"
            />

            <div className="relative grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
              <div className="flex md:flex-col gap-4">
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-xl shadow-blue-500/30 flex-shrink-0">
                  <LogoIsotype variant="color" className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl" />
                </div>
                <div className="md:hidden flex items-center gap-3">
                  <Avatar initials="NG" gradient="from-blue-500 to-blue-700" />
                  <Avatar initials="CO" gradient="from-indigo-500 to-blue-600" />
                </div>
              </div>

              <div>
                <Quote className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4 -ml-1" />
                <p className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight leading-snug text-balance">
                  Construimos Aviatory porque vimos a demasiados pilotos talentosos
                  estancados entre la licencia y la aerolínea, sin una hoja de ruta clara.
                  <span className="text-muted-foreground">
                    {" "}Queríamos que esa pared invisible dejara de existir.
                  </span>
                </p>

                <div className="mt-8 hidden md:flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <Avatar initials="NG" gradient="from-blue-500 to-blue-700" />
                    <Avatar initials="CO" gradient="from-indigo-500 to-blue-600" />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold">Nicolás & Camilo</div>
                    <div className="text-muted-foreground">
                      Fundadores · Aviación + Producto
                    </div>
                  </div>
                </div>

                <div className="mt-6 md:hidden text-sm">
                  <div className="font-semibold">Nicolás & Camilo</div>
                  <div className="text-muted-foreground">Fundadores · Aviación + Producto</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Avatar({ initials, gradient }: { initials: string; gradient: string }) {
  return (
    <div
      className={`h-11 w-11 rounded-full bg-gradient-to-br ${gradient} text-white flex items-center justify-center text-sm font-bold ring-4 ring-background shadow-md`}
    >
      {initials}
    </div>
  )
}
