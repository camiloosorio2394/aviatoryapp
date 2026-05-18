import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Hash, MessageCircle, Users, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { AppLayout } from "@/components/layout/AppLayout"
import { Badge } from "@/components/ui/badge"

interface Channel {
  id: number
  slug: string
  name: string
  description: string | null
  type: "general" | "stage" | "subject" | "airline"
  emoji: string | null
  order_index: number
}

const groupLabels: Record<Channel["type"], { title: string; description: string }> = {
  general: {
    title: "General",
    description: "Conversación abierta, logros, dudas y oportunidades",
  },
  stage: {
    title: "Por etapa",
    description: "Encontrá pilotos en tu mismo momento de carrera",
  },
  subject: {
    title: "Por materia",
    description: "Dudas técnicas con foco en una materia",
  },
  airline: {
    title: "Por aerolínea",
    description: "Preparación específica para postular a una aerolínea",
  },
}

export function Community() {
  const [channels, setChannels] = useState<Channel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    supabase
      .from("community_channels")
      .select("*")
      .order("order_index")
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) {
          toast.error(error.message)
        } else {
          setChannels((data ?? []) as Channel[])
        }
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const groups: Channel["type"][] = ["general", "stage", "subject", "airline"]

  return (
    <AppLayout>
      <div className="px-4 sm:px-6 lg:px-10 py-8 max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Comunidad</h1>
          <p className="mt-2 text-muted-foreground">
            Conversaciones de pilotos LATAM organizadas por etapa, materia y aerolínea.
            Ningún piloto llega a la cabina solo.
          </p>
        </header>

        {loading ? (
          <div className="space-y-6 animate-pulse">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-6 w-40 bg-muted rounded" />
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="h-24 bg-muted rounded-2xl" />
                  <div className="h-24 bg-muted rounded-2xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {groups.map((g) => {
              const list = channels.filter((c) => c.type === g)
              if (list.length === 0) return null
              const meta = groupLabels[g]
              return (
                <section key={g}>
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold">{meta.title}</h2>
                      <p className="text-sm text-muted-foreground">{meta.description}</p>
                    </div>
                    <Badge variant="secondary" className="rounded-full text-xs">
                      {list.length} canales
                    </Badge>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {list.map((c) => (
                      <ChannelCard key={c.id} channel={c} />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/30 p-5">
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold">Normas de la comunidad</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Tono respetuoso y profesional. No compartas preguntas literales de exámenes
                ni contenido pirata. Si necesitás moderación, escribinos a
                <span className="font-medium"> hola@aviatory.app</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

function ChannelCard({ channel }: { channel: Channel }) {
  return (
    <Link
      to={`/app/comunidad/${channel.slug}`}
      className="group block rounded-2xl border border-border/60 bg-card card-apple p-5 hover:border-blue-500/30"
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl flex-shrink-0 transition-transform group-hover:scale-110">
          {channel.emoji ?? "#"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <Hash className="h-3.5 w-3.5 text-muted-foreground" />
            <h3 className="font-semibold text-sm truncate">{channel.name}</h3>
          </div>
          {channel.description && (
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {channel.description}
            </p>
          )}
          <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 group-hover:gap-1.5 transition-all">
            <MessageCircle className="h-3 w-3" />
            Entrar al canal <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </Link>
  )
}
