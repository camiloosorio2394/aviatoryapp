import { Link } from "react-router-dom"
import { ArrowRight, Award, BookOpen, Flame, PlayCircle, Plane, Shield, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-36">
      {/* Background layers */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/70 via-background to-background dark:from-blue-950/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[700px] max-w-6xl bg-[radial-gradient(closest-side,_var(--tw-gradient-stops))] from-blue-400/25 via-transparent to-transparent dark:from-blue-500/15"
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <Badge
            variant="secondary"
            className="mb-7 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide"
          >
            <span className="mr-1.5">🛫</span>
            La plataforma de pilotos para Latinoamérica
          </Badge>
        </div>

        <h1 className="animate-fade-in-up [animation-delay:100ms] text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.03em] text-balance leading-[1]">
          De estudiante piloto
          <br />
          a{" "}
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent">
            candidato de aerolínea
          </span>
          .
        </h1>

        <p className="animate-fade-in-up [animation-delay:200ms] mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
          Prepara tus exámenes PPL y CPL de Aerocivil, mejora tu inglés ICAO
          y avanza paso a paso hasta tu primer empleo en aerolínea. Todo en
          una sola plataforma, en español.
        </p>

        <div className="animate-fade-in-up [animation-delay:300ms] mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="btn-apple shine-on-hover rounded-full text-base px-8 h-12 border-0 font-medium"
          >
            <Link to="/login?mode=signup">
              Comenzar 7 días gratis
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="btn-apple-ghost rounded-full text-base px-6 h-12 font-medium"
          >
            <a href="#como-funciona">
              <PlayCircle className="mr-2 h-5 w-5" />
              Ver cómo funciona
            </a>
          </Button>
        </div>

        <p className="animate-fade-in-up [animation-delay:400ms] mt-6 text-sm text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5" />
            Sin tarjeta de crédito
          </span>
          <span className="text-border">·</span>
          <span>Cancela cuando quieras</span>
          <span className="text-border">·</span>
          <span>Datos cifrados</span>
        </p>

        {/* Dashboard mockup */}
        <div className="animate-fade-in-up [animation-delay:500ms] mt-20 relative">
          <div className="relative mx-auto max-w-5xl">
            <div className="rounded-2xl border border-border/60 bg-card shadow-2xl shadow-blue-500/10 overflow-hidden text-left">
              {/* Browser chrome */}
              <div className="bg-muted/40 px-4 py-2.5 border-b border-border/60 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/70" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                  <div className="h-3 w-3 rounded-full bg-green-500/70" />
                </div>
                <div className="ml-4 text-xs text-muted-foreground font-mono">
                  aviatory.app/app
                </div>
              </div>

              <div className="bg-gradient-to-br from-background to-muted/30 p-6 sm:p-8 space-y-6">
                {/* Profile header row */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center font-bold text-base shadow-lg shadow-blue-500/30">
                      JM
                    </div>
                    <div>
                      <div className="text-sm font-semibold">
                        Hola, Juan Manuel ✈️
                      </div>
                      <div className="text-xs text-muted-foreground">
                        CPL en curso · 184 horas · Bogotá
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-full text-xs">
                      <Flame className="h-3 w-3 mr-1 text-orange-500" />
                      14 días
                    </Badge>
                    <Badge variant="secondary" className="rounded-full text-xs">
                      ICAO 3 → 4
                    </Badge>
                  </div>
                </div>

                {/* Big progress card */}
                <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-50 via-blue-50/50 to-transparent dark:from-blue-950/40 dark:via-blue-950/20 p-5 sm:p-6 relative overflow-hidden">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-blue-500/10 blur-2xl"
                  />
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <Plane className="h-3.5 w-3.5" /> Tu progreso a Avianca
                      </div>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-4xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
                          47%
                        </span>
                        <span className="inline-flex items-center text-xs text-green-600 dark:text-green-400 font-medium">
                          <TrendingUp className="h-3 w-3 mr-0.5" />
                          +12% este mes
                        </span>
                      </div>
                    </div>
                    <svg
                      viewBox="0 0 120 40"
                      className="h-12 w-32 text-blue-600 dark:text-blue-400 hidden sm:block"
                    >
                      <defs>
                        <linearGradient id="spark-hero" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 32 L15 30 L30 28 L45 26 L60 20 L75 18 L90 12 L105 10 L120 5 L120 40 L0 40 Z"
                        fill="url(#spark-hero)"
                      />
                      <path
                        d="M0 32 L15 30 L30 28 L45 26 L60 20 L75 18 L90 12 L105 10 L120 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-blue-100 dark:bg-blue-950/60 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-[0_0_12px_rgb(37_99_235_/_40%)]"
                      style={{ width: "47%" }}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
                  <MiniWidget
                    icon={<BookOpen className="h-4 w-4" />}
                    label="Próximo paso"
                    value="Meteorología"
                    sub="12 preguntas pendientes"
                  />
                  <MiniWidget
                    icon={<Award className="h-4 w-4" />}
                    label="Materias dominadas"
                    value="3 / 8"
                    sub="Reglamento · Motores · W&B"
                  />
                  <MiniWidget
                    icon={<Plane className="h-4 w-4" />}
                    label="Horas faltantes"
                    value="266h"
                    sub="para postular a Avianca"
                  />
                </div>
              </div>
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-blue-600/20 via-transparent to-blue-400/20 blur-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function MiniWidget({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub: string
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm p-4 transition-transform hover:-translate-y-0.5">
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <span className="text-blue-600 dark:text-blue-400">{icon}</span>
        {label}
      </div>
      <div className="mt-1.5 text-xl font-bold tracking-tight">{value}</div>
      <div className="mt-0.5 text-xs text-muted-foreground truncate">{sub}</div>
    </div>
  )
}
