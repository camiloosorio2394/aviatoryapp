import { Reveal } from "@/components/Reveal"
import { Quote } from "lucide-react"
import { LogoIsotype } from "@/components/Logo"

export function FounderStory() {
  return (
    <section className="relative py-20 sm:py-28 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="relative rounded-2xl border border-border bg-card p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--av-blue-500)" }}
              >
                <LogoIsotype variant="color" className="h-7 w-7 rounded-lg" />
              </div>
              <Quote className="h-6 w-6" style={{ color: "var(--av-blue-500)" }} />
            </div>

            <p className="text-xl sm:text-2xl lg:text-[28px] font-semibold tracking-[-0.02em] leading-snug">
              Construimos Aviatory porque vimos a demasiados pilotos talentosos estancados entre
              la licencia y la aerolínea, sin una hoja de ruta clara.
              <span className="text-muted-foreground">
                {" "}Queríamos que esa pared invisible dejara de existir.
              </span>
            </p>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2">
                <Avatar initials="NG" gradient="from-blue-500 to-blue-700" />
                <Avatar initials="CO" gradient="from-indigo-500 to-blue-600" />
              </div>
              <div className="text-[13px]">
                <div className="font-semibold">Nicolás & Camilo</div>
                <div className="text-muted-foreground">Fundadores · Aviación + Producto</div>
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
      className={`h-10 w-10 rounded-full bg-gradient-to-br ${gradient} text-white flex items-center justify-center text-[13px] font-bold ring-4 ring-card`}
    >
      {initials}
    </div>
  )
}
