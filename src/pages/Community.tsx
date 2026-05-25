import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Hash, ArrowRight, Plus, Check } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"

interface Channel {
  id: number
  slug: string
  name: string
  description: string | null
  type: "general" | "stage" | "subject" | "airline"
  emoji: string | null
  order_index: number
}

const GROUP_LABELS: Record<Channel["type"], { title: string; description: string }> = {
  general: { title: "General", description: "Conversación abierta, logros, dudas y oportunidades" },
  stage: { title: "Por etapa", description: "Encontrá pilotos en tu mismo momento de carrera" },
  subject: { title: "Por materia", description: "Dudas técnicas con foco en una materia" },
  airline: { title: "Por aerolínea", description: "Preparación específica para postular a una aerolínea" },
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
        if (error) toast.error(error.message)
        else setChannels((data ?? []) as Channel[])
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const totalChannels = channels.length

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        <PageHeader
          eyebrow={`COMUNIDAD · ${totalChannels} CANALES`}
          title="Comunidad Aviatory"
          subtitle="Pilotos LATAM organizados por etapa, materia y aerolínea. Ningún piloto llega a la cabina solo."
          actions={
            <button
              className="av-shine inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-[13px] font-semibold text-white border-0 cursor-pointer"
              style={{
                background: "linear-gradient(180deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)",
                boxShadow:
                  "0 1px 0 rgb(255 255 255 / 18%) inset, 0 1px 2px rgb(15 22 41 / 18%), 0 8px 20px -6px oklch(0.55 0.22 264 / 45%)",
              }}
            >
              <Plus className="h-3.5 w-3.5" /> Nuevo post
            </button>
          }
        />

        {loading ? (
          <div className="space-y-6 animate-pulse">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-6 w-40 bg-muted rounded" />
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="h-24 bg-muted rounded-xl" />
                  <div className="h-24 bg-muted rounded-xl" />
                  <div className="h-24 bg-muted rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-9">
            {(["general", "stage", "subject", "airline"] as Channel["type"][]).map((g) => {
              const list = channels.filter((c) => c.type === g)
              if (list.length === 0) return null
              const meta = GROUP_LABELS[g]
              return (
                <section key={g}>
                  <div className="flex items-baseline justify-between mb-3.5">
                    <div>
                      <div
                        className="mono inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.14em] uppercase"
                        style={{ color: "var(--av-cyan-400)" }}
                      >
                        <Hash className="h-[11px] w-[11px]" /> {meta.title.toUpperCase()}
                      </div>
                      <h2 className="mt-0.5 text-[17px] font-bold text-foreground tracking-[-0.02em]">
                        {meta.title}
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">{meta.description}</p>
                    </div>
                    <span className="chip mono">{list.length} canales</span>
                  </div>
                  <div className="stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {list.map((c) => (
                      <ChannelCard key={c.id} channel={c} />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        )}

        <div className="mt-12 rounded-xl border border-border bg-muted/30 p-5 flex gap-3 items-start">
          <Check
            className="h-5 w-5 flex-shrink-0 mt-0.5"
            style={{ color: "var(--av-cyan-400)" }}
          />
          <div>
            <h3 className="text-sm font-bold text-foreground">Normas de la comunidad</h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Tono respetuoso y profesional. No compartas preguntas literales de exámenes ni contenido pirata.
              Si necesitás moderación, escribinos a <span className="font-semibold">hola@aviatory.app</span>.
            </p>
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
      className="group block rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "oklch(0.78 0.16 215 / 50%)"
        e.currentTarget.style.boxShadow = "var(--shadow-cyan)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)"
        e.currentTarget.style.boxShadow = "none"
      }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 text-2xl">{channel.emoji ?? "#"}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <Hash className="h-3.5 w-3.5 text-muted-foreground" />
            <h3 className="mono font-semibold text-sm truncate text-foreground">{channel.name}</h3>
          </div>
          {channel.description && (
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {channel.description}
            </p>
          )}
          <div
            className="mt-3 mono inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.08em]"
            style={{ color: "var(--av-cyan-400)" }}
          >
            Entrar al canal <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </Link>
  )
}
