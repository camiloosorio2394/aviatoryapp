import { useState, type FormEvent } from "react"
import { Mail, MessageCircle, Send, MapPin } from "lucide-react"
import { toast } from "sonner"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

const channels = [
  {
    icon: Mail,
    title: "Email",
    description: "Para consultas detalladas o de prensa.",
    action: "hola@aviatory.app",
    href: "mailto:hola@aviatory.app",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Para soporte rápido y dudas express.",
    action: "+57 300 000 0000",
    href: "https://wa.me/573000000000",
  },
  {
    icon: MapPin,
    title: "Estamos en",
    description: "Bogotá, Colombia. Atendemos todo LATAM.",
    action: "Ver en el mapa",
    href: "https://maps.google.com/?q=Bogota",
  },
]

export function Contact() {
  const [sending, setSending] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const topic = String(data.get("topic") ?? "").trim() || "Consulta desde aviatoryapp.com"
    const message = String(data.get("message") ?? "").trim()

    // Sin backend de email todavía: abrimos el cliente de correo del usuario
    // pre-rellenado hacia hola@aviatory.app. Honesto y funcional para el beta.
    const body = `${message}\n\n— ${name} (${email})`
    const mailto = `mailto:hola@aviatory.app?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(body)}`

    setSending(true)
    window.location.href = mailto
    setTimeout(() => {
      setSending(false)
      toast.success("Te abrimos tu correo con el mensaje listo para enviar 📩")
      form.reset()
    }, 600)
  }

  return (
    <PublicLayout>
      <Seo
        path="/contact"
        title="Contacto"
        description="Hablanos. Email, WhatsApp o el formulario. Te respondemos en menos de 24h."
      />
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="rounded-full px-4 py-1.5 text-xs">
            Estamos a un mensaje de distancia
          </Badge>
          <h1 className="mt-6 text-5xl sm:text-6xl font-bold tracking-tight text-balance">
            ¿Hablamos?
          </h1>
          <p className="mt-6 text-lg text-muted-foreground text-balance">
            Si eres piloto LATAM con feedback, idea o pregunta, escríbenos. Respondemos en menos de 24h.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold">Canales directos</h2>
              <p className="mt-2 text-muted-foreground">
                Elige el que te quede más cómodo.
              </p>
              <div className="mt-8 space-y-4">
                {channels.map((c) => (
                  <a
                    key={c.title}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-blue-500/30 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40">
                      <c.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{c.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{c.description}</p>
                      <p className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
                        {c.action}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-12 rounded-2xl bg-muted/40 p-6">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">¿Eres escuela de aviación?</span>{" "}
                  Tenemos un programa B2B para integrar Aviatory en tu academia.{" "}
                  Escríbenos a{" "}
                  <a href="mailto:partners@aviatory.app" className="text-blue-600 dark:text-blue-400 hover:underline">
                    partners@aviatory.app
                  </a>
                  .
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold">O mandanos un mensaje</h2>
              <p className="mt-2 text-muted-foreground">
                Te respondemos al email que dejes.
              </p>

              <form onSubmit={onSubmit} className="mt-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" name="name" required className="mt-2 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required className="mt-2 rounded-xl" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="topic">Asunto</Label>
                  <Input id="topic" name="topic" placeholder="¿Sobre qué nos escribes?" className="mt-2 rounded-xl" />
                </div>

                <div>
                  <Label htmlFor="message">Mensaje</Label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="mt-2 w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                    placeholder="Cuéntanos qué necesitas…"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={sending}
                  className="btn-apple shine-on-hover rounded-full h-12 text-base px-8 border-0"
                >
                  {sending ? (
                    "Enviando…"
                  ) : (
                    <>
                      Enviar mensaje
                      <Send className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
